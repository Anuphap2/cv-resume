import { useEffect, useMemo, useState } from 'react';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { Add, ArrowBack, ArrowForward, Close, Download, Visibility, VisibilityOff } from '@mui/icons-material';
import { getStudentPdf, removeStudentAttachment, saveStudentPdf } from '../utils/studentCvAttachments';
import { useLanguage } from '../i18n';

const copy = {
  th: {
    title: 'ประวัติย่อสมัครฝึกงาน', intro: 'กรอกข้อมูลตามแบบมหาวิทยาลัย แล้วรวมเอกสารเป็น PDF เดียว',
    steps: ['ข้อมูลนักศึกษา', 'การศึกษา', 'กิจกรรมและทักษะ', 'เอกสารและตรวจทาน'],
    names: ['ข้อมูลนักศึกษา', 'ประวัติการศึกษา', 'กิจกรรมและการฝึกอบรม', 'ทักษะ', 'บุคคลอ้างอิง', 'เอกสารแนบ', 'ตรวจทานและดาวน์โหลด'],
    fullName: 'ชื่อ-นามสกุล', studentId: 'รหัสนักศึกษา', age: 'อายุ', nickname: 'ชื่อเล่น', nationality: 'สัญชาติ', religion: 'ศาสนา',
    phone: 'เบอร์โทรศัพท์', email: 'อีเมล', lineId: 'Line ID', permanentAddress: 'ภูมิลำเนา', currentAddress: 'ที่อยู่ปัจจุบัน', hobbies: 'งานอดิเรก/สิ่งที่สนใจ', photo: 'รูปถ่ายนักศึกษา',
    highSchool: 'โรงเรียนเดิม', highSchoolYear: 'ปีที่จบ', highSchoolDistrict: 'อำเภอ', highSchoolProvince: 'จังหวัด', highSchoolPlan: 'แผนการเรียน', university: 'มหาวิทยาลัย', faculty: 'คณะ', major: 'สาขาวิชา', yearLevel: 'ชั้นปี', gpa: 'เกรดเฉลี่ยสะสม',
    activity: 'ชื่อกิจกรรม/การอบรม', details: 'รายละเอียดหรือบทบาท', year: 'ปี', skill: 'ทักษะ', evidence: 'ตัวอย่างที่เคยใช้ (ไม่บังคับ)', evidencePlaceholder: 'เช่น ใช้ในโครงงานรายวิชา / กิจกรรม', skillHelp: 'ไม่ต้องเลือกระดับทักษะ ระบุเฉพาะทักษะที่มีตัวอย่างอธิบายได้',
    advisor: 'อาจารย์ที่ปรึกษา', guardian: 'ผู้ปกครอง', referenceName: 'ชื่อ-นามสกุล', relationship: 'ความเกี่ยวข้อง', referencePhone: 'เบอร์โทรศัพท์', referenceAddress: 'ที่อยู่',
    thaiTranscript: 'Transcript ภาษาไทย (จำเป็น)', englishTranscript: 'Transcript ภาษาอังกฤษ (ไม่บังคับ)', certificates: 'ใบประกาศ/เกียรติบัตร (ไม่บังคับ)',
    upload: 'เลือก PDF', add: 'เพิ่มรายการ', remove: 'ลบ', required: 'ต้องแนบ Transcript ภาษาไทยก่อนดาวน์โหลด', badFile: 'อ่านไฟล์ PDF ไม่ได้ กรุณาเลือกไฟล์ที่ไม่เสียหายและไม่ล็อกรหัสผ่าน', tooLarge: 'ไฟล์ต้องมีขนาดไม่เกิน 15 MB', storageError: 'บันทึกไฟล์ในเบราว์เซอร์ไม่สำเร็จ ตรวจสอบพื้นที่ว่างแล้วลองอีกครั้ง', saved: 'บันทึกไว้ในอุปกรณ์นี้', privacy: 'ข้อมูลและเอกสารอยู่ในเบราว์เซอร์นี้ ไม่มีการอัปโหลดขึ้นเซิร์ฟเวอร์',
    back: 'ย้อนกลับ', next: 'ถัดไป', preview: 'ดูตัวอย่าง', closePreview: 'ปิดตัวอย่าง', export: 'รวมและดาวน์โหลด PDF', exporting: 'กำลังรวมเอกสาร…', reset: 'เริ่มใหม่', backHome: 'กลับหน้าแรก',
    exportError: 'รวม PDF ไม่สำเร็จ ตรวจสอบไฟล์แนบแล้วลองอีกครั้ง', confirmReset: 'ล้างข้อมูลสมัครฝึกงานและไฟล์แนบทั้งหมดหรือไม่? ข้อมูล CV/Resume เดิมจะยังอยู่', noPhoto: 'รูปถ่าย',
  },
  en: {
    title: 'Student internship CV', intro: 'Complete the university form and combine your documents into one PDF.',
    steps: ['Student details', 'Education', 'Activities & skills', 'Documents & review'],
    names: ['Student details', 'Education', 'Activities and training', 'Skills', 'References', 'Attachments', 'Review and download'],
    fullName: 'Full name', studentId: 'Student ID', age: 'Age', nickname: 'Nickname', nationality: 'Nationality', religion: 'Religion',
    phone: 'Phone', email: 'Email', lineId: 'Line ID', permanentAddress: 'Permanent address', currentAddress: 'Current address', hobbies: 'Hobbies', photo: 'Student photo',
    highSchool: 'Previous school', highSchoolYear: 'Graduation year', highSchoolDistrict: 'District', highSchoolProvince: 'Province', highSchoolPlan: 'Study plan', university: 'University', faculty: 'Faculty', major: 'Major', yearLevel: 'Year level', gpa: 'Cumulative GPA',
    activity: 'Activity/training name', details: 'Details or role', year: 'Year', skill: 'Skill', evidence: 'Example of use (optional)', evidencePlaceholder: 'e.g. Used in a course project or activity', skillHelp: 'No level rating is needed. List skills you can explain with an example.',
    advisor: 'Academic advisor', guardian: 'Guardian', referenceName: 'Full name', relationship: 'Relationship', referencePhone: 'Phone', referenceAddress: 'Address',
    thaiTranscript: 'Thai transcript (required)', englishTranscript: 'English transcript (optional)', certificates: 'Certificates (optional)',
    upload: 'Choose PDF', add: 'Add item', remove: 'Remove', required: 'Attach a Thai transcript before downloading.', badFile: 'Could not read this PDF. Choose a valid, unlocked file.', tooLarge: 'Each file must be 15 MB or smaller.', storageError: 'Could not save this file in browser storage. Check available space and try again.', saved: 'Saved on this device', privacy: 'Your information and documents stay in this browser. Nothing is uploaded.',
    back: 'Back', next: 'Continue', preview: 'Preview', closePreview: 'Close preview', export: 'Combine and download PDF', exporting: 'Combining documents…', reset: 'Start over', backHome: 'Back to home',
    exportError: 'Could not combine the PDFs. Check the attachments and try again.', confirmReset: 'Clear this internship CV and its attachments? Your existing CV/Resume data will stay intact.', noPhoto: 'Photo',
  },
};

const inputProps = { fullWidth: true, size: 'small', className: 'student-field' };

export default function StudentInternshipWizard({ data, setData, onBack, onReset }) {
  const { language, setLanguage } = useLanguage();
  const text = copy[language] || copy.en;
  const [step, setStep] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');
  const steps = useMemo(() => text.steps, [text]);
  const p = data.personal || {};
  const e = data.education || {};

  useEffect(() => { window.scrollTo(0, 0); }, [step]);

  const setGroup = (group, key, value) => setData((current) => ({ ...current, [group]: { ...(current[group] || {}), [key]: value } }));
  const updateList = (name, id, key, value) => setData((current) => ({ ...current, [name]: current[name].map((item) => item.id === id ? { ...item, [key]: value } : item) }));
  const addList = (name, initial) => setData((current) => ({ ...current, [name]: [...current[name], { id: crypto.randomUUID(), ...initial }] }));
  const removeList = (name, id) => setData((current) => ({ ...current, [name]: current[name].filter((item) => item.id !== id) }));
  const setPhoto = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError(language === 'th' ? 'กรุณาเลือกไฟล์รูปภาพ' : 'Choose an image file.'); return; }
    const reader = new FileReader();
    reader.onload = () => setGroup('personal', 'photoUrl', reader.result);
    reader.onerror = () => setError(language === 'th' ? 'อ่านรูปภาพไม่สำเร็จ' : 'Could not read this image.');
    reader.readAsDataURL(file);
  };
  const uploadOne = async (file, key, append = false) => {
    if (!file) return;
    setError('');
    try {
      const metadata = await saveStudentPdf(file);
      const prior = data.attachments?.[key];
      if (append) setData((current) => ({ ...current, attachments: { ...current.attachments, [key]: [...(current.attachments?.[key] || []), metadata] } }));
      else {
        if (prior?.id) await removeStudentAttachment(prior.id);
        setData((current) => ({ ...current, attachments: { ...current.attachments, [key]: metadata } }));
      }
    } catch (cause) {
      const message = cause?.message || '';
      const storageFailure = /IndexedDB|local attachment storage|quota/i.test(message);
      setError(message.includes('15 MB') ? text.tooLarge : storageFailure ? text.storageError : text.badFile);
    }
  };
  const removeFile = async (key, item, index) => {
    await removeStudentAttachment(item.id);
    setData((current) => ({ ...current, attachments: { ...current.attachments, [key]: Array.isArray(current.attachments?.[key]) ? current.attachments[key].filter((_, i) => i !== index) : null } }));
  };
  const handleExport = async () => {
    const attachments = data.attachments || {};
    if (!attachments.thaiTranscript?.id) { setError(text.required); setStep(3); return; }
    setError(''); setExporting(true);
    try {
      const [{ PDFDocument }, { pdf }, { default: StudentInternshipDocument }] = await Promise.all([
        import('pdf-lib'),
        import('@react-pdf/renderer'),
        import('./StudentInternshipDocument'),
      ]);
      const coverBlob = await pdf(<StudentInternshipDocument data={data} />).toBlob();
      const merged = await PDFDocument.load(await coverBlob.arrayBuffer());
      const ordered = [attachments.thaiTranscript, attachments.englishTranscript, ...(attachments.certificates || [])].filter(Boolean);
      for (const meta of ordered) {
        const record = await getStudentPdf(meta.id);
        if (!record?.blob) throw new Error('An attachment is missing from local storage.');
        const source = await PDFDocument.load(await record.blob.arrayBuffer());
        const pages = await merged.copyPages(source, source.getPageIndices());
        pages.forEach((page) => merged.addPage(page));
      }
      const bytes = await merged.save();
      const output = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(output);
      const link = document.createElement('a');
      link.href = url;
      const safeName = (p.fullName || 'student-internship-cv').trim().replace(/[<>:"/\\|?*\u0000-\u001f]/g, '').replace(/\s+/g, '_');
      link.download = `${safeName}_internship.pdf`;
      document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
    } catch (cause) {
      console.error('Student CV export failed:', cause);
      setError(text.exportError);
    } finally { setExporting(false); }
  };

  const renderField = (group, name, props = {}) => (
    <TextField {...inputProps} label={text[name]} value={data[group]?.[name] || ''} onChange={(event) => setGroup(group, name, event.target.value)} {...props} />
  );
  const FileSlot = ({ labelKey, slotKey, multiple = false }) => {
    const values = multiple ? (data.attachments?.[slotKey] || []) : (data.attachments?.[slotKey] ? [data.attachments[slotKey]] : []);
    return <section className="student-upload-slot">
      <div className="student-upload-head"><Typography component="h3">{text[labelKey]}</Typography><Button component="label" size="small" variant="outlined">{text.upload}<input hidden type="file" accept="application/pdf,.pdf" multiple={multiple} onChange={(event) => { [...event.target.files].forEach((file) => uploadOne(file, slotKey, multiple)); event.target.value = ''; }} /></Button></div>
      {values.map((item, index) => <div className="student-file-row" key={item.id}><span title={item.name}>{item.name} · {item.pages} p.</span><IconButton aria-label={text.remove} size="small" onClick={() => removeFile(slotKey, item, index)}><Close fontSize="small" /></IconButton></div>)}
    </section>;
  };

  const activityBlock = <div className="student-stack">
    {(data.activities || []).map((item) => <div className="student-repeater" key={item.id}>
      <div className="student-repeater-fields"><TextField {...inputProps} label={text.activity} value={item.title} onChange={(event) => updateList('activities', item.id, 'title', event.target.value)} /><TextField {...inputProps} label={text.year} value={item.year} onChange={(event) => updateList('activities', item.id, 'year', event.target.value)} /><TextField {...inputProps} label={text.details} value={item.details} multiline minRows={2} onChange={(event) => updateList('activities', item.id, 'details', event.target.value)} /></div>
      {data.activities.length > 1 && <Button size="small" color="inherit" onClick={() => removeList('activities', item.id)}>{text.remove}</Button>}
    </div>)}
    <Button startIcon={<Add />} className="student-add" onClick={() => addList('activities', { title: '', details: '', year: '' })}>{text.add}</Button>
  </div>;
  const skillBlock = <div className="student-stack student-skill-stack">
    <Typography className="student-skill-help">{text.skillHelp}</Typography>
    {(data.skills || []).map((item) => <div className="student-skill-item" key={item.id}>
      <div className="student-repeater-fields student-skill-row">
        <TextField {...inputProps} label={text.skill} value={item.name || ''} onChange={(event) => updateList('skills', item.id, 'name', event.target.value)} />
        <TextField {...inputProps} label={text.evidence} placeholder={text.evidencePlaceholder} value={item.evidence || ''} onChange={(event) => updateList('skills', item.id, 'evidence', event.target.value)} />
        {data.skills.length > 1 && <IconButton aria-label={text.remove} onClick={() => removeList('skills', item.id)}><Close /></IconButton>}
      </div>
    </div>)}
    <Button startIcon={<Add />} className="student-add" onClick={() => addList('skills', { name: '', evidence: '' })}>{text.add}</Button>
  </div>;

  const formStep = [
    <>
      <div className="student-photo-control"><div><Typography component="h3">{text.photo}</Typography><Button component="label" size="small" variant="outlined">{language === 'th' ? 'เลือกรูป' : 'Choose image'}<input hidden type="file" accept="image/*" onChange={(event) => { setPhoto(event.target.files?.[0]); event.target.value = ''; }} /></Button></div><div className="student-photo-preview">{p.photoUrl ? <img src={p.photoUrl} alt="" /> : <span>{text.noPhoto}</span>}</div></div>
      <div className="student-form-grid">
        {renderField('personal', 'fullName', { required: true })} {renderField('personal', 'studentId')}
        {renderField('personal', 'age')} {renderField('personal', 'nickname')}
        {renderField('personal', 'nationality')} {renderField('personal', 'religion')}
        <div className="student-field-wide">{renderField('personal', 'permanentAddress', { multiline: true })}</div>
        <div className="student-field-wide">{renderField('personal', 'currentAddress', { multiline: true })}</div>
        {renderField('personal', 'phone')} {renderField('personal', 'lineId')}
        <div className="student-field-wide">{renderField('personal', 'email', { type: 'email' })}</div>
        <div className="student-field-wide">{renderField('personal', 'hobbies')}</div>
      </div>
    </>,
    <div className="student-form-grid">
      {renderField('education', 'highSchool')} {renderField('education', 'highSchoolYear')}
      {renderField('education', 'highSchoolDistrict')} {renderField('education', 'highSchoolProvince')}
      <div className="student-field-wide">{renderField('education', 'highSchoolPlan')}</div>
      {renderField('education', 'university')} {renderField('education', 'faculty')}
      {renderField('education', 'major')} {renderField('education', 'yearLevel')} {renderField('education', 'gpa')}
    </div>,
    <>
      <div className="student-section-block"><Typography component="h3">{text.names[2]}</Typography>{activityBlock}</div>
      <div className="student-section-block"><Typography component="h3">{text.names[3]}</Typography>{skillBlock}</div>
      <div className="student-section-block"><Typography component="h3">{text.names[4]}</Typography><div className="student-reference-grid">
        {(data.references || []).map((person, index) => <div className="student-reference" key={person.id}><Typography component="h4">{text[person.id] || (index === 0 ? text.advisor : text.guardian)}</Typography>
          {['name', 'relationship', 'phone', 'address'].map((key) => <TextField key={key} {...inputProps} label={text[{ name: 'referenceName', relationship: 'relationship', phone: 'referencePhone', address: 'referenceAddress' }[key]]} value={person[key]} onChange={(event) => updateList('references', person.id, key, event.target.value)} />)}
        </div>)}
      </div></div>
    </>,
    <>
      <div className="student-privacy-note">{text.privacy}</div>
      <div className="student-uploads"><FileSlot labelKey="thaiTranscript" slotKey="thaiTranscript" /><FileSlot labelKey="englishTranscript" slotKey="englishTranscript" /><FileSlot labelKey="certificates" slotKey="certificates" multiple /></div>
      <div className="student-section-block"><Typography component="h3">{text.names[5]}</Typography><div className="student-review-grid">
        <div><strong>{p.fullName || '—'}</strong><span>{p.studentId || '—'}</span><span>{p.phone || '—'}</span><span>{p.email || '—'}</span></div>
        <div><strong>{e.university || '—'}</strong><span>{e.faculty || '—'} · {e.major || '—'}</span><span>{e.yearLevel || '—'} · GPA {e.gpa || '—'}</span><span>{(data.activities || []).filter((item) => item.title).length} {language === 'th' ? 'กิจกรรม' : 'activities'} · {(data.skills || []).filter((item) => item.name).length} {language === 'th' ? 'ทักษะ' : 'skills'}</span></div>
      </div></div>
      <Button variant="contained" startIcon={<Download />} onClick={handleExport} disabled={exporting || !data.attachments?.thaiTranscript?.id} className="student-export">{exporting ? text.exporting : text.export}</Button>
      <Button className="student-reset-review" onClick={() => { if (window.confirm(text.confirmReset)) onReset(); }}>{text.reset}</Button>
      {!data.attachments?.thaiTranscript?.id && <Typography className="student-required-note">{text.required}</Typography>}
    </>,
  ][step];
  const headingIndex = [0, 1, 2, 6][step];

  const personalRows = [
    [{ label: text.fullName, value: p.fullName }, { label: text.studentId, value: p.studentId }],
    [{ label: text.age, value: p.age }, { label: text.nickname, value: p.nickname }, { label: text.nationality, value: p.nationality }, { label: text.religion, value: p.religion }],
    [{ label: text.permanentAddress, value: p.permanentAddress, wide: true }],
    [{ label: text.currentAddress, value: p.currentAddress, wide: true }],
    [{ label: text.phone, value: p.phone }, { label: text.lineId, value: p.lineId }],
    [{ label: text.email, value: p.email, wide: true }],
    [{ label: text.hobbies, value: p.hobbies, wide: true }],
  ].filter((fields) => fields.some((field) => field.value));
  const educationRows = [
    [{ label: text.highSchool, value: e.highSchool, long: true }, { label: text.highSchoolYear, value: e.highSchoolYear }],
    [{ label: text.highSchoolDistrict, value: e.highSchoolDistrict }, { label: text.highSchoolProvince, value: e.highSchoolProvince }, { label: text.highSchoolPlan, value: e.highSchoolPlan }],
    [{ label: text.yearLevel, value: e.yearLevel }, { label: text.university, value: e.university }],
    [{ label: text.faculty, value: e.faculty }, { label: text.major, value: e.major }, { label: text.gpa, value: e.gpa }],
  ].filter((fields) => fields.some((field) => field.value));
  const activities = (data.activities || []).filter((item) => item.title || item.details).slice(0, 4);
  const skills = (data.skills || []).filter((item) => item.name).slice(0, 6);
  const references = (data.references || []).filter((item) => [item.name, item.relationship, item.phone, item.address].some(Boolean)).slice(0, 2);
  const preview = <div className="student-paper">
    <header className="student-paper-header"><span aria-hidden="true" /><h1>ประวัติส่วนตัว</h1><div className="student-paper-photo">{p.photoUrl ? <img src={p.photoUrl} alt="" /> : <span>{text.photo}</span>}</div></header>
    <StudentPreviewSection title="ข้อมูลส่วนตัว" rows={personalRows} />
    <StudentPreviewSection title="ประวัติการศึกษา" rows={educationRows} />
    <StudentPreviewSection title="ประวัติการฝึกอบรมหรือการเข้าร่วมกิจกรรม" rows={activities.map((item) => ({ fields: [{ value: item.title, strong: true }, { label: text.year, value: item.year }], detail: item.details }))} />
    <StudentPreviewSection title="ทักษะและความสามารถพิเศษอื่น ๆ" rows={skills.map((item) => ({ fields: [{ value: item.name, strong: true }], detail: item.evidence }))} />
    <StudentPreviewReferences title={text.names[4]} people={references} labels={text} major={e.major} />
  </div>;

  return <Box className="builder-shell student-builder">
    <Box component="header" className="builder-topbar"><Box className="builder-brand-group"><Button className="builder-back-button" onClick={onBack} aria-label={text.backHome}><ArrowBack /></Button><Box><Typography className="builder-brand">CV STUDIO</Typography><Typography className="builder-document-name">{text.title}</Typography></Box></Box><Box className="builder-top-actions"><Typography className="student-saved">{text.saved}</Typography><Button className="builder-quiet-action student-language-action" onClick={() => setLanguage(language === 'th' ? 'en' : 'th')}>{language === 'th' ? 'English' : 'ไทย'}</Button><Button className="builder-quiet-action student-reset-action" onClick={() => { if (window.confirm(text.confirmReset)) onReset(); }}>{text.reset}</Button></Box></Box>
    <div className="student-mobile-step"><span>{language === 'th' ? `ขั้นตอน ${step + 1} จาก ${steps.length}` : `Step ${step + 1} of ${steps.length}`}</span><strong>{steps[step]}</strong><Button startIcon={previewOpen ? <VisibilityOff /> : <Visibility />} onClick={() => setPreviewOpen(!previewOpen)}>{previewOpen ? text.closePreview : text.preview}</Button></div>
    <div className="student-layout"><aside className="student-rail"><span>{text.title}</span><strong>{text.intro}</strong>{steps.map((label, index) => <button type="button" onClick={() => setStep(index)} className={step === index ? 'active' : ''} key={label}><i>{index + 1}</i>{label}</button>)}<p>{text.privacy}</p></aside>
      <main className="student-editor"><div className="student-editor-heading"><span>{language === 'th' ? `ขั้นตอน ${step + 1} จาก ${steps.length}` : `Step ${step + 1} of ${steps.length}`}</span><h1>{text.names[headingIndex]}</h1><p>{text.intro}</p></div><div className="student-form-card">{formStep}{error && <Typography role="alert" className="student-error">{error}</Typography>}<div className="student-navigation"><Button disabled={step === 0} onClick={() => setStep((value) => value - 1)}>{text.back}</Button>{step < steps.length - 1 && <Button variant="contained" endIcon={<ArrowForward />} onClick={() => { setError(''); setStep((value) => value + 1); }}>{text.next}</Button>}</div></div></main>
      <aside className={`student-preview ${previewOpen ? 'open' : ''}`}><div className="student-preview-head"><div><span>{language === 'th' ? 'ตัวอย่างหน้าแรก' : 'FIRST PAGE PREVIEW'}</span><p>{language === 'th' ? 'Transcript และใบประกาศจะต่อท้าย PDF ที่ดาวน์โหลด' : 'Transcripts and certificates follow this page in the downloaded PDF.'}</p></div><IconButton onClick={() => setPreviewOpen(false)} aria-label={text.closePreview}><Close /></IconButton></div>{preview}</aside>
    </div>
  </Box>;
}

function StudentPreviewSection({ title, rows }) {
  const visible = rows.map((row) => Array.isArray(row) ? { fields: row } : row).filter((row) => row.fields.some((field) => field.value));
  if (!visible.length) return null;
  return <section className="student-paper-section"><h2>{title}</h2>{visible.map((row, index) => <div className="student-paper-row" key={`${title}-${index}`}><span className="student-paper-number">{index + 1}.</span><div className="student-paper-row-content">{row.fields.filter((field) => field.value).map((field, fieldIndex) => <span className={`student-paper-field ${field.wide ? 'wide' : ''} ${field.long ? 'long' : ''}`} key={`${field.label || 'value'}-${fieldIndex}`}>{field.label && <strong>{field.label} </strong>}{field.strong ? <strong>{field.value}</strong> : field.value}</span>)}</div>{row.detail && <p className="student-paper-detail">{row.detail}</p>}</div>)}</section>;
}

function StudentPreviewReferences({ title, people, labels, major }) {
  if (!people.length) return null;
  return <section className="student-paper-section"><h2>{title}</h2><div className="student-paper-references">{people.map((person, index) => <div key={person.id || index}><strong>{index + 1}. {labels[person.id] || labels.referenceName}</strong><p><b>{labels.referenceName} </b>{person.name}</p><p><b>{labels.relationship} </b>{person.relationship}</p>{person.id === 'advisor' && <p><b>{labels.major} </b>{major}</p>}<p><b>{labels.referencePhone} </b>{person.phone}</p><p><b>{labels.referenceAddress} </b>{person.address}</p></div>)}</div></section>;
}
