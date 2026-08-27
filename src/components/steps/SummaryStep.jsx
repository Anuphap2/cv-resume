import { Box, Typography, TextField } from '@mui/material';
import { Notes as AlignLeftIcon } from '@mui/icons-material';
import { useLanguage } from '../../i18n';

export default function SummaryStep({ data, onChange, docType }) {
  const { t } = useLanguage();
  const getHeaderTitle = () => {
    if (docType === 'resume') return t('summary.resumeTitle');
    if (docType === 'portfolio') return t('summary.portfolioTitle');
    return t('summary.cvTitle');
  };

  const getDescription = () => {
    if (docType === 'resume') {
      return t('summary.resumeDescription');
    }
    if (docType === 'portfolio') {
      return t('summary.portfolioDescription');
    }
    return t('summary.cvDescription');
  };

  const getLabel = () => {
    if (docType === 'resume') return t('summary.resumeLabel');
    if (docType === 'portfolio') return t('summary.portfolioLabel');
    return t('summary.cvLabel');
  };

  const getPlaceholder = () => {
    if (docType === 'resume') {
      return t('summary.resumePlaceholder');
    }
    if (docType === 'portfolio') {
      return t('summary.portfolioPlaceholder');
    }
    return t('summary.cvPlaceholder');
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.3s ease-out' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <AlignLeftIcon sx={{ color: 'var(--accent)' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
          {getHeaderTitle()}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'var(--text-muted)', mb: 4 }}>
        {getDescription()}
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={6}
        label={getLabel()}
        variant="outlined"
        placeholder={getPlaceholder()}
        value={data || ''}
        onChange={(e) => onChange(e.target.value)}
        slotProps={{
          inputLabel: { shrink: true }
        }}
      />
    </Box>
  );
}
