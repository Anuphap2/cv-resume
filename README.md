# 📄 CV Studio

> **เครื่องมือสร้าง Resume, CV และ Portfolio Website ระดับมืออาชีพ ปลอดภัย เป็นส่วนตัว 100% (Client-Side Only)**  
> *A modern, privacy-focused, client-side Resume, Curriculum Vitae (CV), and Portfolio website generator built with React 19, Material-UI, and Vite.*

---

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Material-UI](https://img.shields.io/badge/MUI-v9-007FFF?logo=mui&logoColor=white)](https://mui.com/)
[![React-PDF](https://img.shields.io/badge/@react--pdf/renderer-v4.5-E11D48)](https://react-pdf.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Anuphap2/cv-resume/pulls)

---

## 🌟 ภาพรวม / Overview

**CV Studio** เป็นเว็บแอปพลิเคชันที่ช่วยให้คุณสร้างเอกสารสมัครงานและนำเสนอผลงานระดับมืออาชีพได้อย่างง่ายดาย โดยไม่ต้องสมัครสมาชิกหรือส่งข้อมูลส่วนตัวขึ้นเซิร์ฟเวอร์ ข้อมูลทั้งหมดจะถูกบันทึกและประมวลผลอยู่บนเบราว์เซอร์ของคุณเท่านั้น (Local-first & Privacy-first)

**CV Studio** is an all-in-one, privacy-first web application designed to help job seekers, researchers, and creators craft beautiful, impactful Resumes, Academic CVs, and interactive Portfolio websites. No sign-up required, zero server storage, and 100% private.

---

## ✨ จุดเด่นและฟีเจอร์หลัก (Key Features)

### 1. 📄 สร้าง Resume (Resume Builder)
- ออกแบบมาสำหรับการสมัครงานบริษัทเอกชน สายเทคโนโลยี และงานทั่วไป (ความยาว 1–2 หน้า)
- กรอกข้อมูลง่ายเป็นขั้นตอน: ข้อมูลติดต่อ, สรุปประวัติ, ประสบการณ์ทำงาน, การศึกษา, ทักษะ, โครงการ, ใบรับรอง, และภาษา
- มี 2 เทมเพลตยอดนิยม:
  - **Classic:** สะอาด เรียบหรู ดูเป็นมืออาชีพ สไตล์สากล
  - **Modern:** โดดเด่น ทันสมัย เน้นการจัดวางที่สะดุดตา
- ส่งออกเป็นไฟล์ **Vector PDF** คมชัดระดับสิ่งพิมพ์ พร้อมพิมพ์หรือแนบสมัครงาน

### 2. 🎓 สร้าง Curriculum Vitae (Academic CV Builder)
- เหมาะสำหรับสายวิชาการ งานวิจัย แพทย์ อาจารย์มหาวิทยาลัย และการขอทุนการศึกษา
- รองรับหัวข้อเฉพาะทาง: งานวิจัย (Research), ผลงานตีพิมพ์ (Publications), วิทยานิพนธ์, อาจารย์ที่ปรึกษา, และรหัส ORCID
- มี 2 เทมเพลตเฉพาะทาง:
  - **Academic:** โครงสร้างมาตรฐานตามแบบแผนวิชาการสากล
  - **Professional:** จัดสัดส่วนชัดเจน อ่านง่าย เป็นระบบ
- แบ่งหน้าอัตโนมัติ (Pagination) รองรับเอกสารขนาดยาว 3+ หน้า

### 3. 🌐 สร้างเว็บไซต์ Portfolio ส่วนตัว (Portfolio Website Generator)
- สร้างหน้าเว็บ Showcase ผลงานและโปรไฟล์ส่วนตัวได้อย่างรวดเร็ว
- มาพร้อม 3 สไตล์ดีไซน์สุดล้ำ:
  - **Creative Glass:** หรูหราด้วยเอฟเฟกต์กระจกฝ้า (Glassmorphism) และแสงสี Gradient
  - **Cyber Neon:** โทนสีมืดสไตล์ Cyberpunk พร้อมแสงเรืองนีออน
  - **Minimal Retro:** มินิมอลสไตล์ขาว-ดำ ตัวอักษรคมชัด โดดเด่น
- **ดาวน์โหลดเป็นไฟล์ HTML แบบ Standalone 100%** (Single-file) นำไปเปิดใช้งานหรือโฮสต์บน GitHub Pages / Netlify / Vercel ได้ทันทีโดยไม่ต้องตั้งค่าใดๆ

### 4. 🔒 ปลอดภัยและเป็นส่วนตัว 100% (Privacy by Design)
- **Zero Server Uploads:** ไม่มีการส่งข้อมูลส่วนตัวของคุณไปยังเซิร์ฟเวอร์หรือฐานข้อมูลภายนอก
- **Local Auto-Save:** บันทึกแบบร่างอัตโนมัติลงใน `localStorage` ของเบราว์เซอร์ของคุณ ป้องกันข้อมูลสูญหายระหว่างทำ
- **No Sign-Up:** เปิดเว็บแล้วเริ่มสร้างได้ทันที ไม่ต้องลงทะเบียนหรือผูกอีเมล

### 5. 👁️ ตัวอย่างเอกสารแบบเรียลไทม์ (Live Paginated Preview)
- ดูตัวอย่างเอกสารแบบแยกหน้าจริง (Multi-Page Paginated Preview) ขณะพิมพ์
- ควบคุมการซูม (Zoom In / Zoom Out) ปรับขนาดตามหน้าจอ
- สลับดูตัวอย่างบนมือถือได้สะดวก

### 6. 🎨 ปรับแต่งธีมและสีสันได้อิสระ (Theme & Color Customization)
- เลือกชุดสีไฮไลต์ (Accent Colors) ได้หลากหลาย เช่น Navy, Teal, Indigo, Rose, Amber, Emerald
- รองรับการปรับแต่งสีเองผ่าน Color Picker

### 7. 🌍 รองรับ 2 ภาษา (Bilingual Support)
- สลับการใช้งานระหว่าง **ภาษาไทย** และ **English** ได้ทันทีทุกหน้า

### 8. ⚡ โหลดข้อมูลตัวอย่างได้ใน 1 คลิก (1-Click Sample Data)
- มีปุ่ม "ใช้ตัวอย่าง (Use Example)" เพื่อโหลดโปรไฟล์ตัวอย่างเต็มรูปแบบ ช่วยให้เห็นภาพรวมของแต่ละเทมเพลตได้ทันที

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

| Category | Technologies |
| :--- | :--- |
| **Frontend Core** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [JavaScript (ESM)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) (Fast HMR, Rolldown / Rollup bundler) |
| **UI Framework** | [Material-UI (MUI v9)](https://mui.com/), [@emotion/react](https://emotion.sh/) |
| **PDF Generation** | [@react-pdf/renderer](https://react-pdf.org/) (High-performance Client-side PDF Engine) |
| **Icons** | [@mui/icons-material](https://mui.com/material-ui/material-icons/), [react-icons](https://react-icons.github.io/react-icons/) |
| **Typography & Styling**| Modern Inter Typography, Pure CSS Variables, Responsive Design |

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
cv-resume/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── LandingScreen.jsx       # หน้าจอเริ่มต้นเลือกประเภทเอกสาร (Resume / CV / Portfolio)
│   │   ├── FormWizard.jsx          # ตัวควบคุมขั้นตอนการกรอกข้อมูล (Step-by-step Wizard)
│   │   ├── steps/                  # คอมโพเนนต์ฟอร์มแต่ละขั้นตอน
│   │   │   ├── PersonalInfoStep.jsx    # ข้อมูลส่วนตัว / รูปโปรไฟล์ / โซเชียล
│   │   │   ├── SummaryStep.jsx         # สรุปภาพรวมประวัติ
│   │   │   ├── ExperienceStep.jsx      # ประวัติการทำงาน
│   │   │   ├── EducationStep.jsx       # ประวัติการศึกษา
│   │   │   ├── SkillsStep.jsx          # ทักษะความเชี่ยวชาญ
│   │   │   ├── ProjectsStep.jsx        # ผลงานและโครงการ
│   │   │   ├── PublicationsStep.jsx    # ผลงานตีพิมพ์ทางวิชาการ
│   │   │   ├── CertificationsStep.jsx  # ประกาศนียบัตร / ใบรับรอง
│   │   │   └── LanguagesStep.jsx       # ภาษาและความชำนาญ
│   │   ├── templates/              # เทมเพลตสำหรับสร้างไฟล์ PDF (@react-pdf)
│   │   │   ├── ResumeClassic.jsx       # เทมเพลต Resume แบบ Classic
│   │   │   ├── ResumeModern.jsx        # เทมเพลต Resume แบบ Modern
│   │   │   ├── CVAcademic.jsx          # เทมเพลต CV สายวิชาการ
│   │   │   └── CVProfessional.jsx      # เทมเพลต CV แบบมืออาชีพ
│   │   ├── preview/                # คอมโพเนนต์แสดงตัวอย่างเอกสารแบบเรียลไทม์
│   │   │   ├── PaginatedPreview.jsx    # ตัวแสดงตัวอย่างแบบแบ่งหน้าจริง
│   │   │   ├── ResumePreview.jsx       # พรีวิว Resume
│   │   │   ├── CVPreview.jsx           # พรีวิว CV
│   │   │   └── PortfolioPreview.jsx    # พรีวิว Portfolio เว็บไซต์
│   │   └── ui/
│   │       └── ThemeSelector.jsx       # คอมโพเนนต์เลือกเทมเพลตและโทนสี
│   ├── data/
│   │   └── defaultData.js          # ข้อมูลเริ่มต้น, ชุดสี, ข้อมูลตัวอย่าง (Sample profiles)
│   ├── utils/
│   │   ├── exportPortfolio.js      # ฟังก์ชันสร้างไฟล์ Standalone HTML Portfolio
│   │   └── formatDate.js          # ฟังก์ชันจัดรูปแบบวันที่สากล
│   ├── i18n.js                     # ระบบจัดการ 2 ภาษา (TH / EN)
│   ├── App.jsx                     # คอมโพเนนต์หลัก จัดการธีมและสถานะแบบร่าง
│   ├── index.css                   # Global CSS และ Design System
│   └── main.jsx                    # Entry point ของแอปพลิเคชัน
├── package.json
└── vite.config.js / tsconfig.json
```

---

## 🚀 วิธีการติดตั้งและรันในเครื่อง (Getting Started)

### ความต้องการของระบบ (Prerequisites)
- [Node.js](https://nodejs.org/) (เวอร์ชัน 18.x ขึ้นไป)
- [npm](https://www.npmjs.com/) หรือ [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)

### ขั้นตอนการติดตั้ง (Installation)

1. **Clone Repository:**
   ```bash
   git clone https://github.com/Anuphap2/cv-resume.git
   cd cv-resume
   ```

2. **ติดตั้ง Dependencies:**
   ```bash
   npm install
   ```

3. **รัน Development Server:**
   ```bash
   npm run dev
   ```
   เปิดเบราว์เซอร์ไปที่ `http://localhost:5173/` เพื่อเริ่มใช้งาน

4. **สร้าง Production Build:**
   ```bash
   npm run build
   ```

5. **พรีวิว Production Build:**
   ```bash
   npm run preview
   ```

---

## 💡 วิธีการใช้งาน (Usage Guide)

1. **เลือกประเภทเอกสาร:** ที่หน้าแรก เลือกระหว่าง **Resume**, **CV**, หรือ **Portfolio**
2. **กรอกข้อมูล:** ดำเนินการกรอกข้อมูลตามขั้นตอนทางแถบซ้ายมือ หรือคลิก **"ใช้ตัวอย่าง"** เพื่อโหลดข้อมูลสาธิต
3. **ปรับแต่งสไตล์:** ในขั้นตอนสุดท้าย (Style & download) เลือกเทมเพลตและโทนสีที่ต้องการ
4. **ตรวจสอบผ่าน Live Preview:** ดูตัวอย่างที่แสดงผลทางขวามือแบบเรียลไทม์ ตรวจสอบการตัดหน้าและความเรียบร้อย
5. **ดาวน์โหลด:**
   - สำหรับ **Resume / CV**: กดปุ่ม **"ดาวน์โหลด PDF"** เพื่อรับไฟล์ PDF พร้อมนำไปใช้งาน
   - สำหรับ **Portfolio**: กดปุ่ม **"ดาวน์โหลดเว็บไซต์"** เพื่อรับไฟล์ `.html` ที่นำไปเปิดดูในเบราว์เซอร์หรือโฮสต์ได้ทันที

---

## 🤝 การมีส่วนร่วม (Contributing)

ยินดีต้อนรับการมีส่วนร่วมทุกรูปแบบ! หากคุณมีไอเดียเทมเพลตใหม่ หรือต้องการปรับปรุงฟีเจอร์:
1. Fork โปรเจกต์นี้
2. สร้าง Feature Branch (`git checkout -b feature/amazing-template`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'feat: add amazing new template'`)
4. Push ไปยัง Branch (`git push origin feature/amazing-template`)
5. เปิด Pull Request

---

## 📄 ใบอนุญาต (License)

โปรเจกต์นี้เผยแพร่ภายใต้ลิขสิทธิ์ [MIT License](LICENSE) — สามารถนำไปใช้งาน ปรับแต่ง และพัฒนาต่อได้อย่างอิสระ

---

<div align="center">
  <sub>สร้างด้วยความใส่ใจ เพื่อให้ทุกคนมีเอกสารสมัครงานและพอร์ตโฟลิโอที่โดดเด่น ✨</sub>
</div>
