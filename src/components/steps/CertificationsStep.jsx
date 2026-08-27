import { Box, Typography, Grid, TextField, Button, Paper, IconButton, Chip, Autocomplete } from '@mui/material';
import { WorkspacePremium as AwardIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useLanguage } from '../../i18n';

export default function CertificationsStep({ data, onChange }) {
  const { t } = useLanguage();
  const addEntry = () => {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        name: '',
        issuer: '',
        date: '',
        url: '',
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
        <AwardIcon sx={{ color: 'var(--accent)' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
          {t('certifications.title')}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'var(--text-muted)', mb: 4 }}>
        {t('certifications.description')}
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
                label={t('certifications.name')}
                variant="outlined"
                placeholder={t('certifications.namePlaceholder')}
                value={entry.name || ''}
                onChange={(e) => updateEntry(entry.id, 'name', e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                label={t('certifications.issuer')}
                variant="outlined"
                placeholder={t('certifications.issuerPlaceholder')}
                value={entry.issuer || ''}
                onChange={(e) => updateEntry(entry.id, 'issuer', e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Autocomplete
                freeSolo
                options={Array.from({ length: new Date().getFullYear() - 1970 + 1 }, (_, i) => String(new Date().getFullYear() - i))}
                value={entry.date || ''}
                onInputChange={(event, newInputValue) => updateEntry(entry.id, 'date', newInputValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('certifications.date')}
                    placeholder={t('certifications.datePlaceholder')}
                    slotProps={{
                      inputLabel: { shrink: true }
                    }}
                  />
                )}
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
        {t('certifications.add')}
      </Button>
    </Box>
  );
}
