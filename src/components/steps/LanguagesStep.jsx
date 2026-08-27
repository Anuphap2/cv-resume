import { Box, Typography, Grid, TextField, Button, Paper, IconButton, Chip, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Language as GlobeIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { PROFICIENCY_LEVELS } from '../../data/defaultData';
import { useLanguage } from '../../i18n';

export default function LanguagesStep({ data, onChange }) {
  const { t } = useLanguage();
  const addEntry = () => {
    onChange([
      ...data,
      { id: crypto.randomUUID(), language: '', proficiency: 'Intermediate' },
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
        <GlobeIcon sx={{ color: 'var(--accent)' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
          {t('languages.title')}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'var(--text-muted)', mb: 4 }}>
        {t('languages.description')}
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
                label={t('languages.language')}
                variant="outlined"
                placeholder={t('languages.languagePlaceholder')}
                value={entry.language || ''}
                onChange={(e) => updateEntry(entry.id, 'language', e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel shrink id={`proficiency-label-${entry.id}`}>{t('languages.proficiency')}</InputLabel>
                <Select
                  labelId={`proficiency-label-${entry.id}`}
                  label={t('languages.proficiency')}
                  value={entry.proficiency || 'Intermediate'}
                  onChange={(e) => updateEntry(entry.id, 'proficiency', e.target.value)}
                  notched
                >
                  {PROFICIENCY_LEVELS.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
        {t('languages.add')}
      </Button>
    </Box>
  );
}
