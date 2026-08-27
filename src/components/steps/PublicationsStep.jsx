import { Box, Typography, Grid, TextField, Button, Paper, IconButton, Chip } from '@mui/material';
import { Book as BookIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useLanguage } from '../../i18n';

export default function PublicationsStep({ data, onChange }) {
  const { t } = useLanguage();
  const addEntry = () => {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        title: '',
        authors: '',
        journal: '',
        year: '',
        doi: '',
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
        <BookIcon sx={{ color: 'var(--accent)' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
          {t('publications.title')}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'var(--text-muted)', mb: 4 }}>
        {t('publications.description')}
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
                label={t('publications.titleLabel')}
                variant="outlined"
                placeholder={t('publications.titlePlaceholder')}
                value={entry.title || ''}
                onChange={(e) => updateEntry(entry.id, 'title', e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label={t('publications.authors')}
                variant="outlined"
                placeholder={t('publications.authorsPlaceholder')}
                value={entry.authors || ''}
                onChange={(e) => updateEntry(entry.id, 'authors', e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                label={t('publications.journal')}
                variant="outlined"
                placeholder={t('publications.journalPlaceholder')}
                value={entry.journal || ''}
                onChange={(e) => updateEntry(entry.id, 'journal', e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                type="text"
                inputMode="numeric"
                label={t('publications.year')}
                placeholder={t('publications.yearPlaceholder')}
                value={entry.year || ''}
                onChange={(e) => updateEntry(entry.id, 'year', e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                slotProps={{
                  inputLabel: { shrink: true },
                  htmlInput: { inputMode: 'numeric', pattern: '[0-9]*', maxLength: 4 },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label={t('publications.doi')}
                variant="outlined"
                placeholder={t('publications.doiPlaceholder')}
                value={entry.doi || ''}
                onChange={(e) => updateEntry(entry.id, 'doi', e.target.value)}
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
        {t('publications.add')}
      </Button>
    </Box>
  );
}
