import { Box, Typography, TextField, Button, IconButton, Divider } from '@mui/material';
import { Settings as SettingsIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useLanguage } from '../../i18n';

export default function SkillsStep({ data, onChange }) {
  const { t } = useLanguage();
  const addCategory = () => {
    onChange([
      ...data,
      { id: crypto.randomUUID(), category: '', items: '', evidence: '' },
    ]);
  };

  const removeCategory = (id) => {
    if (data.length <= 1) return;
    onChange(data.filter((s) => s.id !== id));
  };

  const updateCategory = (id, field, value) => {
    onChange(data.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.3s ease-out' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <SettingsIcon sx={{ color: 'var(--accent)' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
          {t('skills.title')}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'var(--text-muted)', mb: 4 }}>
        {t('skills.description')}
      </Typography>

      {data.map((skill, index) => (
        <Box key={skill.id} sx={{ py: 2.5, borderTop: index ? '1px solid var(--border)' : 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'var(--text-muted)', fontWeight: 700 }}>
              {skill.category || `${t('skills.group')} ${index + 1}`}
            </Typography>
            {data.length > 1 && (
              <IconButton 
                onClick={() => removeCategory(skill.id)} 
                aria-label={t('skills.remove')}
                sx={{ 
                  color: 'var(--text-muted)',
                  '&:hover': { color: 'var(--danger)', backgroundColor: 'var(--danger-bg)' } 
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label={t('skills.category')}
              variant="outlined"
              placeholder={t('skills.categoryPlaceholder')}
              value={skill.category || ''}
              onChange={(e) => updateCategory(skill.id, 'category', e.target.value)}
              slotProps={{
                inputLabel: { shrink: true }
              }}
            />

            <TextField
              fullWidth
              label={t('skills.skills')}
              placeholder={t('skills.skillPlaceholder')}
              value={skill.items || ''}
              onChange={(e) => updateCategory(skill.id, 'items', e.target.value)}
              helperText={t('skills.skillHelp')}
              multiline
              minRows={2}
              slotProps={{
                inputLabel: { shrink: true }
              }}
            />
            <TextField
              fullWidth
              label={t('skills.evidence')}
              placeholder={t('skills.evidencePlaceholder')}
              value={skill.evidence || ''}
              onChange={(e) => updateCategory(skill.id, 'evidence', e.target.value)}
              helperText={t('skills.evidenceHelp')}
              multiline
              minRows={2}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>
        </Box>
      ))}

      <Divider sx={{ mb: 2, borderColor: 'var(--border)' }} />

      <Button
        fullWidth
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={addCategory}
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
        {t('skills.add')}
      </Button>
    </Box>
  );
}
