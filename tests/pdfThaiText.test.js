import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { registerHooks } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { transformWithOxc } from 'vite';
import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (
      (specifier.startsWith('./') || specifier.startsWith('../')) &&
      !path.extname(specifier)
    ) {
      const parentPath = context.parentURL ? path.dirname(fileURLToPath(context.parentURL)) : process.cwd();
      for (const ext of ['.js', '.jsx']) {
        const candidate = path.resolve(parentPath, `${specifier}${ext}`);
        if (fs.existsSync(candidate)) {
          return nextResolve(pathToFileURL(candidate).href, context);
        }
      }
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.endsWith('.ttf') || url.endsWith('.woff') || url.endsWith('.woff2')) {
      const filePath = fileURLToPath(url);
      return {
        format: 'module',
        shortCircuit: true,
        source: `export default ${JSON.stringify(filePath)};`,
      };
    }
    return nextLoad(url, context);
  },
});

async function importJsx(relPath) {
  const absPath = path.resolve(relPath);
  const source = fs.readFileSync(absPath, 'utf8');
  const transformed = await transformWithOxc(source, absPath);
  const tempPath = `${absPath}.test-tmp.mjs`;
  fs.writeFileSync(tempPath, transformed.code, 'utf8');
  try {
    return await import(pathToFileURL(tempPath).href);
  } finally {
    fs.rmSync(tempPath, { force: true });
  }
}

// Also pre-transform CustomSectionsPDF.jsx so relative imports from templates work seamlessly
const customSectionsAbs = path.resolve('src/components/templates/CustomSectionsPDF.jsx');
const customSectionsTransformed = await transformWithOxc(
  fs.readFileSync(customSectionsAbs, 'utf8'),
  customSectionsAbs
);
const customSectionsTmp = path.resolve('src/components/templates/CustomSectionsPDF.js');
fs.writeFileSync(customSectionsTmp, customSectionsTransformed.code, 'utf8');
process.on('exit', () => fs.rmSync(customSectionsTmp, { force: true }));

const { getDocumentLabels } = await import('../src/utils/documentLabels.js');
const { normalizeThaiPdfText } = await import('../src/utils/pdfFonts.js');
const { default: ResumeClassicPDF } = await importJsx('src/components/templates/ResumeClassic.jsx');
const { default: ResumeModernPDF } = await importJsx('src/components/templates/ResumeModern.jsx');
const { default: CVAcademicPDF } = await importJsx('src/components/templates/CVAcademic.jsx');
const { default: CVProfessionalPDF } = await importJsx('src/components/templates/CVProfessional.jsx');
const { default: StudentInternshipDocument } = await importJsx('src/components/StudentInternshipDocument.jsx');

function extractRenderedTextFromPdfBuffer(buf) {
  const pdfStr = buf.toString('latin1');
  const objRegex = /(\d+)\s+0\s+obj\r?\n([\s\S]*?)endobj/g;
  const objects = new Map();
  let match;

  while ((match = objRegex.exec(pdfStr)) !== null) {
    const objId = match[1];
    const body = match[2];
    const streamMatch = body.match(/stream\r?\n([\s\S]*?)\r?\nendstream/);
    let decompressed = null;
    if (streamMatch) {
      try {
        decompressed = zlib.inflateSync(Buffer.from(streamMatch[1], 'latin1')).toString('utf8');
      } catch {
        // Non-deflate stream
      }
    }
    objects.set(objId, { body, decompressed });
  }

  // Map font resource name (/F1, /F2, ...) -> ToUnicode CMap
  const fontCmaps = {};
  for (const [, { body }] of objects) {
    if (body.includes('/Font <<')) {
      const fontBlock = body.match(/\/Font\s*<<([\s\S]*?)>>/)?.[1] || '';
      for (const fm of fontBlock.matchAll(/\/(F\d+)\s+(\d+)\s+0\s+R/g)) {
        const fontName = fm[1];
        const fontObjId = fm[2];
        const fontObj = objects.get(fontObjId);
        const toUnicodeId = fontObj?.body.match(/\/ToUnicode\s+(\d+)\s+0\s+R/)?.[1];
        const cmapStream = toUnicodeId ? objects.get(toUnicodeId)?.decompressed : null;
        if (cmapStream && cmapStream.includes('beginbfchar')) {
          const map = {};
          for (const cm of cmapStream.matchAll(/<([0-9a-f]{4})><([0-9a-f\s]{4,})>/gi)) {
            const cid = cm[1].toLowerCase();
            const hex = cm[2].replace(/\s+/g, '');
            let chars = '';
            for (let i = 0; i < hex.length; i += 4) {
              chars += String.fromCodePoint(parseInt(hex.slice(i, i + 4), 16));
            }
            map[cid] = chars;
          }
          fontCmaps[fontName] = map;
        }
      }
    }
  }

  const lines = [];
  for (const [, { decompressed }] of objects) {
    if (!decompressed || !decompressed.includes('BT')) continue;
    let activeFont = 'F1';
    for (const block of decompressed.matchAll(/BT([\s\S]*?)ET/g)) {
      const content = block[1];
      const fontMatch = content.match(/\/(F\d+)\s+[\d.]+\s+Tf/);
      if (fontMatch) {
        activeFont = fontMatch[1];
      }
      const cmap = fontCmaps[activeFont] || {};
      let blockText = '';
      for (const m of content.matchAll(/<([0-9a-f]+)>/gi)) {
        const hex = m[1];
        for (let i = 0; i < hex.length; i += 4) {
          const cid = hex.slice(i, i + 4).toLowerCase();
          blockText += cmap[cid] || '';
        }
      }
      lines.push(blockText);
    }
  }

  return lines
    .join('\n')
    .replaceAll('\u0E33\u0E32', '\u0E33')
    .replaceAll('\u0E4D\u0E32', '\u0E33');
}

const sampleAccent = { name: 'Navy', value: '#1e3a5f', light: '#e8eef5' };

const sampleThaiResumeData = {
  personalInfo: {
    fullName: 'อนุภาพ สอนเทียน',
    jobTitle: 'นักพัฒนาซอฟต์แวร์',
    email: 'anuphap@example.com',
    phone: '085-0352548',
    location: 'Chiang Mai, Thailand',
    linkedin: '',
    website: 'https://anuphap.vercel.app/',
    github: 'github.com/Anuphap2/',
    photoUrl: '',
  },
  summary: 'ออกแบบ API ไปจนถึงทำให้คนใช้งานได้จริง',
  experience: [
    {
      id: 'exp-1',
      company: 'โรงพยาบาลแม่สอด',
      position: 'โปรแกรมเมอร์ ( ฝึกงาน )',
      startDate: '2023-10',
      endDate: '2024-02',
      current: false,
      description: '- ดูแลระบบภายใน แก้ไขการทำงานของระบบหลังบ้าน และจัดการฐานข้อมูลที่ใช้ในองค์กร',
    },
  ],
  education: [],
  skills: [],
  certifications: [],
  languages: [],
  projects: [],
  customSections: [],
};

const sampleThaiCVData = {
  personalInfo: {
    fullName: 'อนุภาพ สอนเทียน',
    title: 'นักวิจัยและนักพัฒนา',
    email: 'anuphap@example.com',
    phone: '085-0352548',
    location: 'Chiang Mai, Thailand',
    linkedin: '',
    website: '',
    orcid: '',
    photoUrl: '',
  },
  profile: 'ทำงานวิจัยด้านวิศวกรรมซอฟต์แวร์และการประมวลผลภาษาธรรมชาติ',
  education: [],
  experience: [
    {
      id: 'cv-exp-1',
      organization: 'มหาวิทยาลัยแม่โจ้',
      position: 'ผู้ช่วยวิจัย',
      startDate: '2024-01',
      endDate: '',
      current: true,
      description: 'ดำเนินงานวิจัยและนำเสนอผลงานวิชาการอย่างสม่ำเสมอ',
    },
  ],
  publications: [],
  research: [],
  teaching: [],
  certifications: [],
  languages: [],
  customSections: [],
};

test('normalizeThaiPdfText decomposes Thai Sara Am (U+0E33) into Nikhahit + Sara Aa (U+0E4D U+0E32)', () => {
  assert.equal(normalizeThaiPdfText('ประสบการณ์ทำงาน'), 'ประสบการณ์ท\u0E4D\u0E32งาน');
  assert.equal(normalizeThaiPdfText('น้ำ ค่ำ ล้ำ'), 'น้\u0E4D\u0E32 ค่\u0E4D\u0E32 ล้\u0E4D\u0E32');
});

test('Thai PDF export preserves full heading "ประสบการณ์ทำงาน" and trailing characters after Sara Am (ำ)', async () => {
  const thaiLabels = getDocumentLabels('th');
  assert.equal(thaiLabels.experience, 'ประสบการณ์ทำงาน');

  for (const [name, Component] of [
    ['ResumeClassicPDF', ResumeClassicPDF],
    ['ResumeModernPDF', ResumeModernPDF],
  ]) {
    const buffer = await renderToBuffer(
      React.createElement(Component, {
        data: sampleThaiResumeData,
        accentColor: sampleAccent,
        contentLanguage: 'th',
      })
    );
    const renderedText = extractRenderedTextFromPdfBuffer(buffer);

    assert.match(renderedText, /ประสบการณ์ทำงาน/, `${name} must render full heading "ประสบการณ์ทำงาน" without dropping "น"`);
    assert.match(renderedText, /ทำให้คนใช้งานได้จริง/, `${name} must not drop "ง" at the end of summary containing "ทำ"`);
    assert.match(renderedText, /ฐานข้อมูลที่ใช้ในองค์กร/, `${name} must not drop "ร" at the end of description containing "ทำ"`);
  }

  for (const [name, Component] of [
    ['CVAcademicPDF', CVAcademicPDF],
    ['CVProfessionalPDF', CVProfessionalPDF],
  ]) {
    const buffer = await renderToBuffer(
      React.createElement(Component, {
        data: sampleThaiCVData,
        accentColor: sampleAccent,
        contentLanguage: 'th',
      })
    );
    const renderedText = extractRenderedTextFromPdfBuffer(buffer);

    assert.match(renderedText, /ประวัติและความเชี่ยวชาญ/, `${name} must render profile heading`);
    assert.match(renderedText, /การประมวลผลภาษาธรรมชาติ/, `${name} must not truncate text after "ทำ" in profile`);
    assert.match(renderedText, /อย่างสม่ำเสมอ/, `${name} must not truncate text containing multiple "ำ" in experience`);
  }

  const studentBuffer = await renderToBuffer(
    React.createElement(StudentInternshipDocument, {
      data: {
        personal: {
          fullName: 'กานต์ตัวอย่าง นักศึกษาฝึกงาน',
          permanentAddress: '123/45 หมู่ 2 ตำบลตัวอย่าง อำเภอเมือง จังหวัดเชียงใหม่ 50000',
        },
        education: {},
        activities: [
          {
            id: 'a1',
            title: 'อบรมความปลอดภัยไซเบอร์',
            year: '2568',
            details: 'ทำแบบฝึกหัดประเมินความเสี่ยงเว็บแอป',
          },
        ],
        skills: [],
        references: [],
      },
    })
  );
  const studentRenderedText = extractRenderedTextFromPdfBuffer(studentBuffer);
  assert.match(studentRenderedText, /ทำแบบฝึกหัดประเมินความเสี่ยงเว็บแอป/, 'StudentInternshipDocument must not drop "ป" at the end of detail containing "ทำ"');
});
