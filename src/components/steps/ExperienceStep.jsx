import { Box, Typography, Grid, TextField, Button, Paper, IconButton, FormControlLabel, Checkbox, Chip } from '@mui/material';
import { Work as WorkIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useLanguage } from '../../i18n';

export default function ExperienceStep({ data, onChange, docType }) {
  const { t } = useLanguage();
  const addEntry = () => {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        [docType === 'cv' ? 'organization' : 'company']: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      },
    ]);
  };

  const removeEntry = (id) => {
    if (data.length <= 1) return;
    onChange(data.filter((e) => e.id !== id));
  };

  const updateEntry = (id, field, value) => {
    onChange(data.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.3s ease-out' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <WorkIcon sx={{ color: 'var(--accent)' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
          {docType === 'cv' ? t('experience.cvTitle') : t('experience.defaultTitle')}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'var(--text-muted)', mb: 4 }}>
        {docType === 'resume'
          ? t('experience.resumeDescription')
          : t('experience.defaultDescription')}
      </Typography>

      {data.map((entry, index) => (
        <Paper
          key={entry.id}
          variant="outlined"
          sx={{
            p: 3,
            mb: 3,
            backgroundColor: 'var(--bg-glass)',
            borderColor: 'var(--border)',
            position: 'relative',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Chip 
              label={`#${index + 1}`} 
              size="small" 
              sx={{ 
                backgroundColor: 'var(--accent-bg)', 
                color: 'var(--accent-light)', 
                fontWeight: 600,
                border: '1px solid var(--border-accent)' 
              }} 
            />
            {data.length > 1 && (
              <IconButton 
                onClick={() => removeEntry(entry.id)} 
                sx={{ 
                  color: 'var(--text-muted)',
                  '&:hover': { color: 'var(--danger)', backgroundColor: 'var(--danger-bg)' } 
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={docType === 'cv' ? t('experience.organization') : t('experience.company')}
                variant="outlined"
                placeholder={docType === 'cv' ? t('experience.organizationPlaceholder') : t('experience.companyPlaceholder')}
                value={entry.company || entry.organization || ''}
                onChange={(e) =>
                  updateEntry(entry.id, docType === 'cv' ? 'organization' : 'company', e.target.value)
                }
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t('experience.position')}
                variant="outlined"
                placeholder={t('experience.positionPlaceholder')}
                value={entry.position || ''}
                onChange={(e) => updateEntry(entry.id, 'position', e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="month"
                label={t('experience.startDate')}
                variant="outlined"
                value={entry.startDate || ''}
                onChange={(e) => updateEntry(entry.id, 'startDate', e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type={entry.current ? 'text' : 'month'}
                label={t('experience.endDate')}
                variant="outlined"
                value={entry.current ? 'Present' : (entry.endDate || '')}
                disabled={entry.current}
                onChange={(e) => updateEntry(entry.id, 'endDate', e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={entry.current || false}
                    onChange={(e) => updateEntry(entry.id, 'current', e.target.checked)}
                    sx={{ color: 'var(--border-light)', '&.Mui-checked': { color: 'var(--accent)' } }}
                  />
                }
                label={<span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t('experience.current')}</span>}
                sx={{ mt: 1 }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label={t('experience.description')}
                variant="outlined"
                placeholder={t('experience.descriptionPlaceholder')}
                value={entry.description || ''}
                onChange={(e) => updateEntry(entry.id, 'description', e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Button
        fullWidth
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={addEntry}
        sx={{
          py: 1.5,
          borderStyle: 'dashed',
          borderColor: 'var(--border-light)',
          color: 'var(--text-secondary)',
          textTransform: 'none',
          '&:hover': {
            borderColor: 'var(--accent)',
            color: 'var(--accent-light)',
            backgroundColor: 'var(--accent-bg)',
          }
        }}
      >
        {t('experience.add')}
      </Button>
    </Box>
  );
}
