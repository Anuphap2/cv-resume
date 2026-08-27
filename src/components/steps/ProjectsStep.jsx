import { Box, Typography, Grid, TextField, Button, Paper, IconButton, Chip, InputAdornment } from '@mui/material';
import { Folder as FolderIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useLanguage } from '../../i18n';

export default function ProjectsStep({ data, onChange }) {
  const { t } = useLanguage();
  const addEntry = () => {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        name: '',
        description: '',
        technologies: '',
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
        <FolderIcon sx={{ color: 'var(--accent)' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
          {t('projects.title')}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'var(--text-muted)', mb: 4 }}>
        {t('projects.description')}
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
              label={t('projects.name')}
                variant="outlined"
              placeholder={t('projects.namePlaceholder')}
                value={entry.name || ''}
                onChange={(e) => updateEntry(entry.id, 'name', e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={2}
              label={t('projects.descriptionLabel')}
                variant="outlined"
              placeholder={t('projects.descriptionPlaceholder')}
                value={entry.description || ''}
                onChange={(e) => updateEntry(entry.id, 'description', e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
              label={t('projects.technologies')}
                variant="outlined"
              placeholder={t('projects.technologiesPlaceholder')}
                value={entry.technologies || ''}
                onChange={(e) => updateEntry(entry.id, 'technologies', e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
              label={t('projects.url')}
                variant="outlined"
              placeholder={t('projects.urlPlaceholder')}
                value={entry.url ? entry.url.replace('https://', '') : ''}
                onChange={(e) => updateEntry(entry.id, 'url', e.target.value ? `https://${e.target.value.replace('https://', '')}` : '')}
                slotProps={{
                  inputLabel: { shrink: true },
                  input: {
                    startAdornment: <InputAdornment position="start">https://</InputAdornment>,
                  }
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
        {t('projects.add')}
      </Button>
    </Box>
  );
}
