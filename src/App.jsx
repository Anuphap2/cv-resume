import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LandingScreen from './components/LandingScreen';
import FormWizard from './components/FormWizard';
import { defaultResumeData, defaultCVData, defaultPortfolioData } from './data/defaultData';

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
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
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

const DRAFT_STORAGE_KEY = 'cv-resume-local-draft-v1';

const readDraft = (type, fallback) => {
  try {
    const saved = JSON.parse(localStorage.getItem(DRAFT_STORAGE_KEY) || 'null');
    return saved?.type === type && saved.data ? saved.data : structuredClone(fallback);
  } catch {
    return structuredClone(fallback);
  }
};

export default function App() {
  const [docType, setDocType] = useState(null); // 'resume' | 'cv' | 'portfolio' | null
  const [resumeData, setResumeData] = useState(() => readDraft('resume', defaultResumeData));
  const [cvData, setCVData] = useState(() => readDraft('cv', defaultCVData));
  const [portfolioData, setPortfolioData] = useState(() => readDraft('portfolio', defaultPortfolioData));

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
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ type: docType, data: getData() }));
    } catch (error) {
      console.warn('Local draft could not be saved:', error);
    }
  }, [docType, resumeData, cvData, portfolioData]);

  const handleGenerated = () => {
    // Keep the current draft and stay in the builder after download so users can
    // make another version without entering the same information again.
  };

  const handleReset = () => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // Ignore storage errors and still reset the in-memory form.
    }
    if (docType === 'resume') setResumeData(structuredClone(defaultResumeData));
    if (docType === 'cv') setCVData(structuredClone(defaultCVData));
    if (docType === 'portfolio') setPortfolioData(structuredClone(defaultPortfolioData));
    setDocType(null);
  };

  const getData = () => {
    if (docType === 'resume') return resumeData;
    if (docType === 'portfolio') return portfolioData;
    return cvData;
  };

  const getDataSetter = () => {
    if (docType === 'resume') return setResumeData;
    if (docType === 'portfolio') return setPortfolioData;
    return setCVData;
  };

  const content = !docType ? (
    <LandingScreen onSelect={handleSelect} />
  ) : (
      <FormWizard
        docType={docType}
        data={getData()}
        setData={getDataSetter()}
        onBack={handleBack}
        onGenerated={handleGenerated}
        onReset={handleReset}
      />
  );

  return (
      <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {content}
    </ThemeProvider>
  );
}
