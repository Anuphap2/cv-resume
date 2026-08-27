import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Stepper, 
  Step, 
  StepButton, 
  MobileStepper, 
  AppBar, 
  Toolbar, 
  Chip,
  Paper,
  LinearProgress,
} from '@mui/material';
import { 
  ArrowBack as ArrowLeftIcon, 
  ArrowForward as ArrowRightIcon, 
  ChevronLeft as ChevronLeftIcon, 
  Download as DownloadIcon, 
  Visibility as EyeIcon, 
  VisibilityOff as EyeOffIcon, 
  Star as StarIcon 
} from '@mui/icons-material';
import { pdf } from '@react-pdf/renderer';

import ThemeSelector from './ui/ThemeSelector';
import { useLanguage } from '../i18n';

import PersonalInfoStep from './steps/PersonalInfoStep';
import SummaryStep from './steps/SummaryStep';
import ExperienceStep from './steps/ExperienceStep';
import EducationStep from './steps/EducationStep';
import SkillsStep from './steps/SkillsStep';
import ProjectsStep from './steps/ProjectsStep';
import PublicationsStep from './steps/PublicationsStep';
import CertificationsStep from './steps/CertificationsStep';
import LanguagesStep from './steps/LanguagesStep';

import ResumePreview from './preview/ResumePreview';
import CVPreview from './preview/CVPreview';
import PortfolioPreview from './preview/PortfolioPreview';
import PaginatedPreview from './preview/PaginatedPreview';

import ResumeClassicPDF from './templates/ResumeClassic';
import ResumeModernPDF from './templates/ResumeModern';
import CVAcademicPDF from './templates/CVAcademic';
import CVProfessionalPDF from './templates/CVProfessional';

import { ACCENT_COLORS, SAMPLE_RESUME_DATA, SAMPLE_PORTFOLIO_DATA } from '../data/defaultData';
import { generatePortfolioHTML } from '../utils/exportPortfolio';

const RESUME_STEPS = [
  { id: 'personal', label: 'Basics', hint: 'Your name, contact details, and profile photo.' },
  { id: 'summary', label: 'About you', hint: 'A concise introduction tailored to the role you want.' },
  { id: 'experience', label: 'Work history', hint: 'Show the work you have done and the results you achieved.' },
  { id: 'education', label: 'Education', hint: 'Add the education that supports this application.' },
  { id: 'skills', label: 'Skills', hint: 'List the skills you want employers to notice first.' },
  { id: 'projects', label: 'Projects', hint: 'Add projects that prove what you can build or deliver.' },
  { id: 'certifications', label: 'Credentials', hint: 'Include certifications, awards, or professional training.' },
  { id: 'languages', label: 'Languages', hint: 'Tell people which languages you can use at work.' },
  { id: 'theme', label: 'Style & download', hint: 'Choose a look, then download your finished Resume.' },
];

const CV_STEPS = [
  { id: 'personal', label: 'Basics', hint: 'Your name, contact details, and profile photo.' },
  { id: 'profile', label: 'Academic profile', hint: 'Summarise your expertise, research interests, and direction.' },
  { id: 'education', label: 'Education', hint: 'Add degrees, institutions, thesis titles, and advisors.' },
  { id: 'experience', label: 'Work history', hint: 'Add teaching, research, and professional experience.' },
  { id: 'publications', label: 'Publications', hint: 'List your published work in a clear, readable format.' },
  { id: 'research', label: 'Research', hint: 'Show active or completed research projects.' },
  { id: 'certifications', label: 'Credentials', hint: 'Include certifications, awards, or professional training.' },
  { id: 'languages', label: 'Languages', hint: 'Tell people which languages you can use at work.' },
  { id: 'theme', label: 'Style & download', hint: 'Choose a look, then download your finished CV.' },
];

const PORTFOLIO_STEPS = [
  { id: 'personal', label: 'Basics', hint: 'Your name, contact details, links, and profile photo.' },
  { id: 'summary', label: 'About you', hint: 'Explain what you do and what kind of work you enjoy.' },
  { id: 'skills', label: 'Skills', hint: 'Group the tools and skills you want to showcase.' },
  { id: 'projects', label: 'Projects', hint: 'Show your best work with links and a short description.' },
  { id: 'experience', label: 'Experience', hint: 'Add roles that help visitors understand your journey.' },
  { id: 'theme', label: 'Style & download', hint: 'Choose a visual style, then download your portfolio site.' },
];

export default function FormWizard({ docType, data, setData, onBack, onGenerated, onReset }) {
  const { language, setLanguage, t, get } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [template, setTemplate] = useState(docType === 'resume' ? 'classic' : docType === 'portfolio' ? 'glassmorphism' : 'academic');
  const [accentColor, setAccentColor] = useState(ACCENT_COLORS[0]);
  const [mobilePreview, setMobilePreview] = useState(false);
  const [exporting, setExporting] = useState(false);

  const stepSource = docType === 'resume' ? RESUME_STEPS : docType === 'portfolio' ? PORTFOLIO_STEPS : CV_STEPS;
  const stepTranslationKey = docType === 'resume' ? 'builder.resumeSteps' : docType === 'portfolio' ? 'builder.portfolioSteps' : 'builder.cvSteps';
  const steps = get(stepTranslationKey).map(([label, hint], index) => ({ ...stepSource[index], label, hint }));
  const currentStepInfo = steps[currentStep];

  const goNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const goPrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const loadSampleData = () => {
    if (docType === 'resume') {
      setData(SAMPLE_RESUME_DATA);
    } else if (docType === 'portfolio') {
      setData(SAMPLE_PORTFOLIO_DATA);
    }
  };

  const handleExportHTML = () => {
    try {
      const htmlContent = generatePortfolioHTML(data, accentColor, template);
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const name = data.personalInfo.fullName || 'portfolio';
      link.download = `${name.replace(/\s+/g, '_')}_portfolio.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      onGenerated?.();
    } catch (err) {
      console.error('HTML export failed:', err);
      alert('Failed to export HTML. Please try again.');
    }
  };

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const blob = await pdf(pdfDocument).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const name = data.personalInfo.fullName || 'document';
      link.download = `${name.replace(/\s+/g, '_')}_${docType}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      onGenerated?.();
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const updateField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    const stepId = steps[currentStep].id;

    switch (stepId) {
      case 'personal':
        return (
          <PersonalInfoStep
            data={data.personalInfo}
            onChange={(val) => updateField('personalInfo', val)}
            docType={docType}
          />
        );
      case 'summary':
      case 'profile':
        return (
          <SummaryStep
            data={docType === 'resume' ? data.summary : docType === 'portfolio' ? data.personalInfo.bio : data.profile}
            onChange={(val) => {
              if (docType === 'portfolio') {
                updateField('personalInfo', { ...data.personalInfo, bio: val });
              } else {
                updateField(docType === 'resume' ? 'summary' : 'profile', val);
              }
            }}
            docType={docType}
          />
        );
      case 'experience':
        return (
          <ExperienceStep
            data={data.experience}
            onChange={(val) => updateField('experience', val)}
            docType={docType}
          />
        );
      case 'education':
        return (
          <EducationStep
            data={data.education}
            onChange={(val) => updateField('education', val)}
            docType={docType}
          />
        );
      case 'skills':
        return (
          <SkillsStep
            data={data.skills}
            onChange={(val) => updateField('skills', val)}
          />
        );
      case 'projects':
        return (
          <ProjectsStep
            data={data.projects}
            onChange={(val) => updateField('projects', val)}
          />
        );
      case 'publications':
        return (
          <PublicationsStep
            data={data.publications}
            onChange={(val) => updateField('publications', val)}
          />
        );
      case 'research':
        return (
          <ProjectsStep
            data={data.research}
            onChange={(val) => updateField('research', val)}
          />
        );
      case 'certifications':
        return (
          <CertificationsStep
            data={data.certifications}
            onChange={(val) => updateField('certifications', val)}
          />
        );
      case 'languages':
        return (
          <LanguagesStep
            data={data.languages}
            onChange={(val) => updateField('languages', val)}
          />
        );
      case 'theme':
        return (
          <ThemeSelector
            docType={docType}
            template={template}
            accentColor={accentColor}
            onTemplateChange={setTemplate}
            onColorChange={setAccentColor}
          />
        );
      default:
        return null;
    }
  };

  const PreviewComponent = docType === 'resume' ? ResumePreview : docType === 'portfolio' ? PortfolioPreview : CVPreview;
  const pdfDocument = docType === 'resume'
    ? (template === 'modern'
      ? <ResumeModernPDF data={data} accentColor={accentColor} />
      : <ResumeClassicPDF data={data} accentColor={accentColor} />)
    : (template === 'professional'
      ? <CVProfessionalPDF data={data} accentColor={accentColor} />
      : <CVAcademicPDF data={data} accentColor={accentColor} />);

  const getDocTypeLabel = () => {
    if (docType === 'resume') return 'Resume';
    if (docType === 'portfolio') return 'Portfolio Website';
    return language === 'th' ? 'CV (Curriculum Vitae)' : 'Curriculum Vitae';
  };

  const exportButton = docType === 'portfolio' ? (
    <Button className="builder-primary-action" startIcon={<DownloadIcon />} onClick={handleExportHTML}>
      {t('common.downloadSite')}
    </Button>
  ) : (
    <Button className="builder-primary-action" startIcon={<DownloadIcon />} onClick={handleExportPDF} disabled={exporting}>
      {exporting ? t('common.preparingPdf') : t('common.downloadPdf')}
    </Button>
  );

  return (
    <Box className="builder-shell">
      <Box className="builder-topbar">
        <Box className="builder-brand-group">
          <IconButton aria-label={t('common.backToTypes')} onClick={onBack} className="builder-back-button">
            <ChevronLeftIcon />
          </IconButton>
          <Box>
            <Typography className="builder-brand">{t('common.appName')}</Typography>
            <Typography className="builder-document-name">{getDocTypeLabel()}</Typography>
          </Box>
        </Box>
        <Box className="builder-top-actions">
          <Chip label={t('common.saved')} size="small" className="local-save-chip" />
          <Button onClick={onReset} className="builder-quiet-action">{t('common.startOver')}</Button>
          {(docType === 'resume' || docType === 'portfolio') && (
            <Button variant="outlined" startIcon={<StarIcon />} onClick={loadSampleData} className="example-action">
              {t('common.useExample')}
            </Button>
          )}
          <Button className="language-switcher builder-language-switcher" onClick={() => setLanguage(language === 'en' ? 'th' : 'en')}>
            {language === 'en' ? 'ไทย' : 'English'}
          </Button>
          {exportButton}
        </Box>
      </Box>

      <Box className="builder-grid">
        <Box component="aside" className="builder-rail">
          <Typography className="builder-rail-eyebrow">{language === 'th' ? 'ความคืบหน้า' : 'YOUR PROGRESS'}</Typography>
          <Typography className="builder-rail-title">
            {docType === 'portfolio' ? t('builder.finishPortfolio') : docType === 'cv' ? t('builder.finishCv') : t('builder.finishResume')}
          </Typography>
          <LinearProgress variant="determinate" value={((currentStep + 1) / steps.length) * 100} className="builder-progress" />
          <Typography className="builder-progress-label">{t('common.step')} {currentStep + 1} {t('common.of')} {steps.length} {t('common.steps')}</Typography>
          <Box className="builder-step-list">
            {steps.map((step, index) => (
              <Box
                key={step.id}
                component="button"
                type="button"
                className={`builder-step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'done' : ''}`}
                onClick={() => setCurrentStep(index)}
              >
                <span className="builder-step-number">{index < currentStep ? '✓' : index + 1}</span>
                <span className="builder-step-copy">
                  <span className="builder-step-label">{step.label}</span>
                  <span className="builder-step-hint">{step.hint}</span>
                </span>
              </Box>
            ))}
          </Box>
          <Box className="builder-privacy-note">
            <Typography className="builder-privacy-title">{t('common.privateByDesign')}</Typography>
            <Typography className="builder-privacy-copy">{t('common.draftStorage')}</Typography>
          </Box>
        </Box>

        <Box component="main" className="builder-editor">
          <Box className="builder-mobile-progress">
            <Typography>{t('common.step')} {currentStep + 1} {t('common.of')} {steps.length}</Typography>
            <Typography>{currentStepInfo.label}</Typography>
          </Box>
          <Box className="builder-editor-surface">
            <Box className="builder-editor-heading">
              <Typography className="builder-editor-kicker">{currentStepInfo.label}</Typography>
              <Typography variant="h4" className="builder-editor-title">{currentStepInfo.hint}</Typography>
            </Box>
            <Box className="builder-form-content">
              {renderStep()}
              <Box className="builder-navigation">
                <Button variant="outlined" startIcon={<ArrowLeftIcon />} onClick={goPrev} disabled={currentStep === 0} className="builder-back-action">
                  {t('common.back')}
                </Button>
                {currentStep < steps.length - 1 ? (
                  <Button variant="contained" endIcon={<ArrowRightIcon />} onClick={goNext} className="builder-continue-action">
                    {t('common.continue')}
                  </Button>
                ) : exportButton}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className={`builder-preview ${mobilePreview ? 'mobile-visible' : ''}`}>
          <Box className="builder-preview-topbar">
            <Box>
              <Typography className="builder-preview-kicker">{t('common.livePreview')}</Typography>
              <Typography className="builder-preview-title">{t('common.previewDescription')}</Typography>
            </Box>
            <IconButton aria-label={t('common.closePreview')} onClick={() => setMobilePreview(false)} className="builder-preview-close">
              <EyeOffIcon />
            </IconButton>
          </Box>
          <Box className="builder-preview-stage">
            <Paper elevation={0} className={`builder-preview-paper ${docType === 'portfolio' ? 'portfolio-preview-paper' : 'document-preview-paper'}`}>
              {docType === 'portfolio' ? (
                <PreviewComponent data={data} accentColor={accentColor} template={template} />
              ) : (
                <PaginatedPreview>
                  <PreviewComponent data={data} accentColor={accentColor} template={template} />
                </PaginatedPreview>
              )}
            </Paper>
          </Box>
        </Box>
      </Box>

      <Box className="builder-mobile-preview-button">
        <Button startIcon={mobilePreview ? <EyeOffIcon /> : <EyeIcon />} onClick={() => setMobilePreview(!mobilePreview)}>
          {mobilePreview ? t('common.closePreview') : t('common.preview')}
        </Button>
      </Box>
    </Box>
  );
}
