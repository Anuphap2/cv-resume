import { Box, Typography, Button } from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  Description as FileTextIcon,
  MenuBook as BookOpenIcon,
  Language as GlobeIcon,
  LockOutlined as LockIcon,
} from '@mui/icons-material';
import { useLanguage } from '../i18n';

const OPTIONS = [
  { id: 'resume', number: '01', icon: FileTextIcon },
  { id: 'cv', number: '02', icon: BookOpenIcon },
  { id: 'portfolio', number: '03', icon: GlobeIcon },
];

export default function LandingScreen({ onSelect }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <Box className="home-shell">
      <Box component="nav" className="home-nav">
        <Typography className="home-wordmark">{t('common.appName')}</Typography>
        <Box className="home-nav-meta">
          <LockIcon sx={{ fontSize: 16 }} />
          <span>{t('common.privateInBrowser')}</span>
          <Button className="language-switcher" onClick={() => setLanguage(language === 'en' ? 'th' : 'en')}>
            {language === 'en' ? 'ไทย' : 'English'}
          </Button>
        </Box>
      </Box>

      <Box component="main" className="home-main">
        <Box className="home-hero">
          <Typography className="home-kicker">{t('landing.kicker')}</Typography>
          <Typography component="h1" className="home-title">
            {t('landing.titleLine1')}<br />
            <span>{t('landing.titleLine2')}</span>
          </Typography>
          <Typography className="home-lead">{t('landing.lead')}</Typography>
        </Box>

        <Box className="home-section-heading">
          <Typography component="h2">{t('landing.chooseTitle')}</Typography>
          <Typography>{t('landing.chooseLead')}</Typography>
        </Box>

        <Box className="home-options">
          {OPTIONS.map(({ id, number, icon: Icon }) => {
            const title = id === 'resume' ? 'Resume' : id === 'cv' ? 'CV' : 'Portfolio';
            return (
              <Box component="article" key={id} className="home-option">
                <Box className="home-option-number">{number}</Box>
                <Box className="home-option-icon"><Icon /></Box>
                <Box className="home-option-content">
                  <Typography className="home-option-eyebrow">{t(`landing.${id}.eyebrow`)}</Typography>
                  <Typography component="h3" className="home-option-title">{title}</Typography>
                  <Typography className="home-option-description">{t(`landing.${id}.description`)}</Typography>
                  <Typography className="home-option-note">{t(`landing.${id}.note`)}</Typography>
                </Box>
                <Button className="home-option-action" onClick={() => onSelect(id)} endIcon={<ArrowForwardIcon />}>
                  {t('landing.startWith')} {title}
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box component="footer" className="home-footer">
        <Typography>{t('landing.footer')}</Typography>
        <Typography>© CV Studio</Typography>
      </Box>
    </Box>
  );
}
