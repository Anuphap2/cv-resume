import { useEffect, useRef, useState } from 'react';
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
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { 
  ArrowBack as ArrowLeftIcon, 
  ArrowForward as ArrowRightIcon, 
  ChevronLeft as ChevronLeftIcon, 
  Download as DownloadIcon, 
  Visibility as EyeIcon, 
  VisibilityOff as EyeOffIcon, 
  Star as StarIcon,
  ContentCopy as ContentCopyIcon,
} from '@mui/icons-material';

import ThemeSelector from './ui/ThemeSelector';
import { useLanguage } from '../i18n';

import PersonalInfoStep from './steps/PersonalInfoStep';
import SummaryStep from './steps/SummaryStep';
import ResumeTargetingStep from './steps/ResumeTargetingStep';
import ExperienceStep from './steps/ExperienceStep';
import EducationStep from './steps/EducationStep';
import SkillsStep from './steps/SkillsStep';
import ProjectsStep from './steps/ProjectsStep';
import PublicationsStep from './steps/PublicationsStep';
import CertificationsStep from './steps/CertificationsStep';
import LanguagesStep from './steps/LanguagesStep';
import CustomSectionsStep from './steps/CustomSectionsStep';

import ResumePreview from './preview/ResumePreview';
import CVPreview from './preview/CVPreview';
import PortfolioPreview from './preview/PortfolioPreview';
import PaginatedPreview from './preview/PaginatedPreview';


import { ACCENT_COLORS, SAMPLE_RESUME_DATA, SAMPLE_PORTFOLIO_DATA } from '../data/defaultData';
import { generatePortfolioHTML } from '../utils/exportPortfolio';

const RESUME_STEPS = [
  { id: 'personal', label: 'Basics', hint: 'Your name, contact details, and profile photo.' },
  { id: 'summary', label: 'About you', hint: 'A concise introduction tailored to the role you want.' },
  { id: 'targeting', label: 'Target & review', hint: 'Match your real experience to one job and check the wording.' },
  { id: 'experience', label: 'Work history', hint: 'Show the work you have done and the results you achieved.' },
  { id: 'education', label: 'Education', hint: 'Add the education that supports this application.' },
  { id: 'skills', label: 'Skills', hint: 'List the skills you want employers to notice first.' },
  { id: 'projects', label: 'Projects', hint: 'Add projects that prove what you can build or deliver.' },
  { id: 'certifications', label: 'Credentials', hint: 'Include certifications, awards, or professional training.' },
  { id: 'languages', label: 'Languages', hint: 'Tell people which languages you can use at work.' },
  { id: 'customSections', label: 'Your sections', hint: 'Add and arrange extra sections for this resume.' },
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
  { id: 'customSections', label: 'Your sections', hint: 'Add and arrange extra sections for this CV.' },
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

const PDF_TEMPLATE_LOADERS = {
  'resume-classic': () => import('./templates/ResumeClassic'),
  'resume-modern': () => import('./templates/ResumeModern'),
  'cv-academic': () => import('./templates/CVAcademic'),
  'cv-professional': () => import('./templates/CVProfessional'),
};

export default function FormWizard({ docType, data, setData, onBack, onGenerated, onReset, contentVersion = 'th', onContentVersionChange, onCopyContentVersion }) {
  const { language, setLanguage, t, get } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [template, setTemplate] = useState(docType === 'resume' ? 'classic' : docType === 'portfolio' ? 'glassmorphism' : 'academic');
  const [accentColor, setAccentColor] = useState(ACCENT_COLORS[0]);
  const [mobilePreview, setMobilePreview] = useState(false);
  const [exporting, setExporting] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(max-width: 720px)').matches) {
      window.scrollTo(0, 0);
      return;
    }
    editorRef.current?.scrollTo(0, 0);
  }, [currentStep]);

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
      const templateKey = docType === 'resume'
        ? `resume-${template === 'modern' ? 'modern' : 'classic'}`
        : `cv-${template === 'professional' ? 'professional' : 'academic'}`;
      const [{ pdf }, { default: PDFTemplate }] = await Promise.all([
        import('@react-pdf/renderer'),
        PDF_TEMPLATE_LOADERS[templateKey](),
      ]);
      const blob = await pdf(<PDFTemplate data={data} accentColor={accentColor} contentLanguage={contentVersion} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const name = data.personalInfo.fullName || 'document';
      link.download = `${name.replace(/\s+/g, '_')}_${docType}_${contentVersion}.pdf`;
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
      case 'targeting':
        return (
          <ResumeTargetingStep
            data={data}
            onChange={setData}
            template={template}
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
      case 'customSections':
        return (
          <CustomSectionsStep
            data={Array.isArray(data.customSections) ? data.customSections : []}
            onChange={(val) => updateField('customSections', val)}
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
  const copyTargetVersion = contentVersion === 'th' ? 'en' : 'th';
  const copyVersion = () => {
    const confirmationKey = copyTargetVersion === 'en' ? 'common.confirmCopyToEnglish' : 'common.confirmCopyToThai';
    if (window.confirm(t(confirmationKey))) onCopyContentVersion?.(copyTargetVersion, data);
  };

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

        <Box component="main" className="builder-editor" ref={editorRef}>
          <Box className="builder-mobile-progress">
            <Box className="builder-mobile-progress-copy">
              <Typography>{t('common.step')} {currentStep + 1} {t('common.of')} {steps.length}</Typography>
              <Typography>{currentStepInfo.label}</Typography>
            </Box>
            <Button
              className="builder-mobile-preview-toggle"
              startIcon={mobilePreview ? <EyeOffIcon /> : <EyeIcon />}
              onClick={() => setMobilePreview(!mobilePreview)}
            >
              {mobilePreview ? t('common.closePreview') : t('common.preview')}
            </Button>
          </Box>
          <Box className="builder-editor-surface">
            {(docType === 'resume' || docType === 'cv') && (
              <Box className="document-version-control">
                <Box className="document-version-copy">
                  <Typography className="document-version-title">{t('common.documentLanguage')}</Typography>
                  <Typography className="document-version-hint">{t('common.documentLanguageHint')}</Typography>
                </Box>
                <Box className="document-version-actions">
                  <ToggleButtonGroup
                    exclusive
                    size="small"
                    value={contentVersion}
                    onChange={(_, value) => value && onContentVersionChange?.(value)}
                    aria-label={t('common.documentLanguage')}
                    className="document-version-options"
                  >
                    <ToggleButton value="th">ไทย</ToggleButton>
                    <ToggleButton value="en">English</ToggleButton>
                  </ToggleButtonGroup>
                  <Button
                    size="small"
                    startIcon={<ContentCopyIcon />}
                    onClick={copyVersion}
                    className="document-version-copy-action"
                  >
                    {t(copyTargetVersion === 'en' ? 'common.copyToEnglish' : 'common.copyToThai')}
                  </Button>
                </Box>
              </Box>
            )}
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
                  <PreviewComponent data={data} accentColor={accentColor} template={template} contentLanguage={contentVersion} />
                ) : (
                  <PaginatedPreview>
                    <PreviewComponent data={data} accentColor={accentColor} template={template} contentLanguage={contentVersion} />
                </PaginatedPreview>
              )}
            </Paper>
          </Box>
        </Box>
      </Box>

    </Box>
  );
}
