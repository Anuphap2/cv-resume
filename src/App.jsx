import { lazy, Suspense, useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LandingScreen from './components/LandingScreen';
import { defaultResumeData, defaultCVData, defaultPortfolioData } from './data/defaultData';
import { removeStudentAttachment } from './utils/studentCvAttachments';

const appTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f5f5f7',
      paper: '#ffffff',
    },
    primary: {
      main: '#0066cc',
    },
    text: {
      primary: '#1d1d1f',
      secondary: '#6e6e73',
    },
  },
  typography: {
    fontFamily: "'Anuphan Variable', 'Anuphan', sans-serif",
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#ffffff',
            '&:hover fieldset': {
              borderColor: '#b8b8bd',
            },
          },
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '999px',
          textTransform: 'none',
        },
      },
    },
  },
});

const FormWizard = lazy(() => import('./components/FormWizard'));
const StudentInternshipWizard = lazy(() => import('./components/StudentInternshipWizard'));

const DRAFT_STORAGE_KEY = 'cv-resume-local-draft-v1';
const STUDENT_DRAFT_STORAGE_KEY = 'cv-resume-student-internship-draft-v1';

const defaultStudentInternshipData = () => ({
  personal: {
    fullName: '', studentId: '', age: '', nickname: '', nationality: '', religion: '',
    permanentAddress: '', currentAddress: '', phone: '', email: '', lineId: '',
    hobbies: '', photoUrl: '',
  },
  education: {
    highSchool: '', highSchoolYear: '', highSchoolDistrict: '', highSchoolProvince: '', highSchoolPlan: '', university: '', faculty: '', major: '',
    yearLevel: '', gpa: '',
  },
  activities: [{ id: crypto.randomUUID(), title: '', details: '', year: '' }],
  skills: [{ id: crypto.randomUUID(), name: '', evidence: '' }],
  references: [
    { id: 'advisor', name: '', relationship: '', phone: '', address: '' },
    { id: 'guardian', name: '', relationship: '', phone: '', address: '' },
  ],
  attachments: { thaiTranscript: null, englishTranscript: null, certificates: [] },
});

const readStudentDraft = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STUDENT_DRAFT_STORAGE_KEY) || 'null');
    return saved && typeof saved === 'object' ? { ...defaultStudentInternshipData(), ...saved } : defaultStudentInternshipData();
  } catch {
    return defaultStudentInternshipData();
  }
};

const createDocumentDraft = (data, activeVersion = 'th') => ({
  versions: { th: structuredClone(data), en: structuredClone(data) },
  activeVersion,
});

const readVersionedDraft = (type, fallback) => {
  try {
    const saved = JSON.parse(localStorage.getItem(DRAFT_STORAGE_KEY) || 'null');
    if (saved?.type !== type) return createDocumentDraft(fallback);

    const thaiData = saved.versions?.th || saved.data || fallback;
    const englishData = saved.versions?.en || saved.data || thaiData;
    return {
      versions: {
        th: structuredClone(thaiData),
        en: structuredClone(englishData),
      },
      activeVersion: saved.activeVersion === 'en' ? 'en' : 'th',
    };
  } catch {
    return createDocumentDraft(fallback);
  }
};

const readDraft = (type, fallback) => {
  try {
    const saved = JSON.parse(localStorage.getItem(DRAFT_STORAGE_KEY) || 'null');
    return saved?.type === type && saved.data ? saved.data : structuredClone(fallback);
  } catch {
    return structuredClone(fallback);
  }
};

export default function App() {
  const [docType, setDocType] = useState(null); // Existing document modes and the isolated student internship workflow.
  const [resumeDraft, setResumeDraft] = useState(() => readVersionedDraft('resume', defaultResumeData));
  const [cvDraft, setCVDraft] = useState(() => readVersionedDraft('cv', defaultCVData));
  const [portfolioData, setPortfolioData] = useState(() => readDraft('portfolio', defaultPortfolioData));
  const [studentData, setStudentData] = useState(readStudentDraft);

  const updateActiveVersion = (setDraft) => (nextData) => {
    setDraft((previous) => {
      const currentVersion = previous.activeVersion;
      const currentData = previous.versions[currentVersion];
      const value = typeof nextData === 'function' ? nextData(currentData) : nextData;
      return { ...previous, versions: { ...previous.versions, [currentVersion]: value } };
    });
  };

  const setResumeData = updateActiveVersion(setResumeDraft);
  const setCVData = updateActiveVersion(setCVDraft);

  const handleSelect = (type) => {
    setDocType(type);
  };

  const handleBack = () => {
    setDocType(null);
  };

  // Drafts stay in this browser only while the user is working. They are never sent to a server.
  useEffect(() => {
    if (!docType) return;
    try {
      if (docType === 'studentInternship') {
        localStorage.setItem(STUDENT_DRAFT_STORAGE_KEY, JSON.stringify(studentData));
      } else if (docType === 'resume') {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ type: docType, ...resumeDraft }));
      } else if (docType === 'cv') {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ type: docType, ...cvDraft }));
      } else {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ type: docType, data: getData() }));
      }
    } catch (error) {
      console.warn('Local draft could not be saved:', error);
    }
  }, [docType, resumeDraft, cvDraft, portfolioData, studentData]);

  const handleGenerated = () => {
    // Keep the current draft and stay in the builder after download so users can
    // make another version without entering the same information again.
  };

  const handleReset = () => {
    if (docType === 'studentInternship') {
      const attachments = studentData.attachments || {};
      const ids = [attachments.thaiTranscript?.id, attachments.englishTranscript?.id, ...(attachments.certificates || []).map((item) => item.id)].filter(Boolean);
      Promise.all(ids.map(removeStudentAttachment)).catch((error) => console.warn('Student attachment cleanup failed:', error));
      try { localStorage.removeItem(STUDENT_DRAFT_STORAGE_KEY); } catch { /* Keep in-memory reset available. */ }
      setStudentData(defaultStudentInternshipData());
      setDocType(null);
      return;
    }
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // Ignore storage errors and still reset the in-memory form.
    }
    if (docType === 'resume') setResumeDraft(createDocumentDraft(defaultResumeData));
    if (docType === 'cv') setCVDraft(createDocumentDraft(defaultCVData));
    if (docType === 'portfolio') setPortfolioData(structuredClone(defaultPortfolioData));
    setDocType(null);
  };

  const getData = () => {
    if (docType === 'resume') return resumeDraft.versions[resumeDraft.activeVersion];
    if (docType === 'portfolio') return portfolioData;
    if (docType === 'studentInternship') return studentData;
    return cvDraft.versions[cvDraft.activeVersion];
  };

  const getDataSetter = () => {
    if (docType === 'resume') return setResumeData;
    if (docType === 'portfolio') return setPortfolioData;
    if (docType === 'studentInternship') return setStudentData;
    return setCVData;
  };

  const getDocumentVersion = () => docType === 'resume' ? resumeDraft.activeVersion : cvDraft.activeVersion;
  const setDocumentVersion = (version) => {
    if (docType === 'resume') setResumeDraft((previous) => ({ ...previous, activeVersion: version }));
    if (docType === 'cv') setCVDraft((previous) => ({ ...previous, activeVersion: version }));
  };
  const copyDocumentVersion = (targetVersion, sourceData) => {
    if (targetVersion !== 'th' && targetVersion !== 'en') return;
    const setDraft = docType === 'resume' ? setResumeDraft : setCVDraft;
    setDraft((previous) => ({
      ...previous,
      versions: { ...previous.versions, [targetVersion]: structuredClone(sourceData) },
    }));
  };

  const content = !docType ? (
    <LandingScreen onSelect={handleSelect} />
  ) : (
      docType === 'studentInternship' ? (
        <Suspense fallback={<div className="editor-loading" role="status">Loading editor…</div>}>
          <StudentInternshipWizard data={studentData} setData={setStudentData} onBack={handleBack} onReset={handleReset} />
        </Suspense>
      ) : <Suspense fallback={<div className="editor-loading" role="status">Loading editor…</div>}><FormWizard
        docType={docType}
        data={getData()}
        setData={getDataSetter()}
        onBack={handleBack}
        onGenerated={handleGenerated}
        onReset={handleReset}
        contentVersion={docType === 'resume' || docType === 'cv' ? getDocumentVersion() : null}
        onContentVersionChange={setDocumentVersion}
        onCopyContentVersion={copyDocumentVersion}
      /></Suspense>
  );

  return (
      <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {content}
    </ThemeProvider>
  );
}
