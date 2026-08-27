import { Box, Typography, Grid, TextField, Button, Paper, IconButton, Chip, Autocomplete } from '@mui/material';
import { School as SchoolIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useLanguage } from '../../i18n';

export default function EducationStep({ data, onChange, docType }) {
  const { t } = useLanguage();
  const addEntry = () => {
    const base = {
      id: crypto.randomUUID(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    if (docType === 'cv') {
      base.thesis = '';
      base.advisor = '';
    }
    onChange([...data, base]);
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
        <SchoolIcon sx={{ color: 'var(--accent)' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
          {t('education.title')}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'var(--text-muted)', mb: 4 }}>
        {docType === 'cv'
          ? t('education.cvDescription')
          : t('education.defaultDescription')}
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
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label={t('education.institution')}
                variant="outlined"
                placeholder={t('education.institutionPlaceholder')}
                value={entry.institution || ''}
                onChange={(e) => updateEntry(entry.id, 'institution', e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t('education.degree')}
                variant="outlined"
                placeholder={t('education.degreePlaceholder')}
                value={entry.degree || ''}
                onChange={(e) => updateEntry(entry.id, 'degree', e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label={t('education.field')}
                variant="outlined"
                placeholder={t('education.fieldPlaceholder')}
                value={entry.field || ''}
                onChange={(e) => updateEntry(entry.id, 'field', e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Autocomplete
                freeSolo
                options={Array.from({ length: new Date().getFullYear() - 1970 + 1 }, (_, i) => String(new Date().getFullYear() - i))}
                value={entry.startDate || ''}
                onInputChange={(event, newInputValue) => updateEntry(entry.id, 'startDate', newInputValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('education.startYear')}
                    placeholder="e.g. 2013"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Autocomplete
                freeSolo
                options={Array.from({ length: new Date().getFullYear() - 1970 + 1 }, (_, i) => String(new Date().getFullYear() - i))}
                value={entry.endDate || ''}
                onInputChange={(event, newInputValue) => updateEntry(entry.id, 'endDate', newInputValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('education.endYear')}
                    placeholder="e.g. 2017"
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label={t('education.gpa')}
                variant="outlined"
                placeholder={t('education.gpaPlaceholder')}
                value={entry.gpa || ''}
                onChange={(e) => updateEntry(entry.id, 'gpa', e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
            </Grid>

            {docType === 'cv' && (
              <>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label={t('education.thesis')}
                    variant="outlined"
                    placeholder={t('education.thesisPlaceholder')}
                    value={entry.thesis || ''}
                    onChange={(e) => updateEntry(entry.id, 'thesis', e.target.value)}
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label={t('education.advisor')}
                    variant="outlined"
                    placeholder={t('education.advisorPlaceholder')}
                    value={entry.advisor || ''}
                    onChange={(e) => updateEntry(entry.id, 'advisor', e.target.value)}
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  />
                </Grid>
              </>
            )}
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
        {t('education.add')}
      </Button>
    </Box>
  );
}
