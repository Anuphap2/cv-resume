import { Box, Button, Divider, IconButton, TextField, Typography } from '@mui/material';
import {
  Add as AddIcon,
  ArrowDownward as MoveDownIcon,
  ArrowUpward as MoveUpIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useLanguage } from '../../i18n';

export default function CustomSectionsStep({ data = [], onChange }) {
  const { t } = useLanguage();

  const updateSection = (id, field, value) => {
    onChange(data.map((section) => section.id === id ? { ...section, [field]: value } : section));
  };

  const moveSection = (index, offset) => {
    const nextIndex = index + offset;
    if (nextIndex < 0 || nextIndex >= data.length) return;
    const next = [...data];
    [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
    onChange(next);
  };

  const addSection = () => {
    onChange([...data, { id: crypto.randomUUID(), title: '', content: '' }]);
  };

  return (
    <Box className="form-step-content">
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 0.5 }}>
          {t('customSections.title')}
        </Typography>
        <Typography color="text.secondary">{t('customSections.description')}</Typography>
      </Box>

      {data.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 2 }}>
          {t('customSections.empty')}
        </Typography>
      ) : (
        <Box sx={{ display: 'grid', gap: 2.5 }}>
          {data.map((section, index) => (
            <Box key={section.id}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box sx={{ minWidth: 0, flex: 1, display: 'grid', gap: 1.5 }}>
                  <TextField
                    label={t('customSections.heading')}
                    placeholder={t('customSections.headingPlaceholder')}
                    value={section.title || ''}
                    onChange={(event) => updateSection(section.id, 'title', event.target.value)}
                    inputProps={{ maxLength: 80 }}
                    fullWidth
                  />
                  <TextField
                    label={t('customSections.details')}
                    placeholder={t('customSections.detailsPlaceholder')}
                    value={section.content || ''}
                    onChange={(event) => updateSection(section.id, 'content', event.target.value)}
                    multiline
                    minRows={3}
                    maxRows={10}
                    fullWidth
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', mt: 0.25 }}>
                  <IconButton
                    aria-label={t('customSections.moveUp')}
                    title={t('customSections.moveUp')}
                    onClick={() => moveSection(index, -1)}
                    disabled={index === 0}
                    size="small"
                  >
                    <MoveUpIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label={t('customSections.moveDown')}
                    title={t('customSections.moveDown')}
                    onClick={() => moveSection(index, 1)}
                    disabled={index === data.length - 1}
                    size="small"
                  >
                    <MoveDownIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label={t('customSections.delete')}
                    title={t('customSections.delete')}
                    onClick={() => onChange(data.filter((item) => item.id !== section.id))}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              {index < data.length - 1 && <Divider sx={{ mt: 2.5 }} />}
            </Box>
          ))}
        </Box>
      )}

      <Button onClick={addSection} startIcon={<AddIcon />} variant="outlined" sx={{ mt: 2.5 }}>
        {t('customSections.add')}
      </Button>
    </Box>
  );
}
