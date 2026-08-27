import { Box, Typography, Grid, Card, CardActionArea, TextField } from '@mui/material';
import { ACCENT_COLORS, RESUME_TEMPLATES, CV_TEMPLATES, PORTFOLIO_TEMPLATES } from '../../data/defaultData';
import { useLanguage } from '../../i18n';

export default function ThemeSelector({ docType, template, accentColor, onTemplateChange, onColorChange }) {
  const { t } = useLanguage();
  const templates = docType === 'resume' ? RESUME_TEMPLATES : docType === 'portfolio' ? PORTFOLIO_TEMPLATES : CV_TEMPLATES;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, animation: 'fadeIn 0.3s ease-out' }}>
      {/* Template Selection */}
      <Box>
        <Typography variant="h6" sx={{ color: 'var(--text-primary)', mb: 0.5, fontWeight: 800 }}>
          {t('theme.title')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--text-muted)', mb: 2.5 }}>
          {t('theme.description')}
        </Typography>
        <Grid container spacing={2}>
          {templates.map((t) => (
            <Grid key={t.id} size={{ xs: 12, sm: 6 }}>
              <Card
                variant="outlined"
                sx={{
                  backgroundColor: template === t.id ? 'var(--accent-bg)' : 'var(--bg-glass)',
                  borderColor: template === t.id ? 'var(--accent)' : 'var(--border)',
                  borderWidth: template === t.id ? '2px' : '1px',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all var(--transition-fast)',
                  '&:hover': {
                    borderColor: template === t.id ? 'var(--accent)' : 'var(--border-light)',
                  }
                }}
              >
                <CardActionArea onClick={() => onTemplateChange(t.id)} sx={{ p: 2.5, textAlign: 'center' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: template === t.id ? 'var(--accent-light)' : 'var(--text-primary)' }}>
                    {t.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>
                    {t.description}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Accent Color Selection */}
      <Box>
        <Typography variant="h6" sx={{ color: 'var(--text-primary)', mb: 0.5, fontWeight: 800 }}>
          {t('theme.colorTitle')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'var(--text-muted)', mb: 2.5 }}>
          {t('theme.colorDescription')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
          <Box className="color-swatches" sx={{ display: 'flex', gap: 1.5 }}>
            {ACCENT_COLORS.map((c) => (
              <Box
                key={c.name}
                component="button"
                className={`color-swatch ${accentColor.name === c.name ? 'active' : ''}`}
                style={{ backgroundColor: c.value }}
                onClick={() => onColorChange(c)}
                title={c.name}
                type="button"
                aria-label={`Color ${c.name}`}
                sx={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: accentColor.name === c.name ? '2px solid white' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  boxShadow: accentColor.name === c.name ? `0 0 0 2px var(--accent), var(--shadow-glow)` : 'none',
                  '&:hover': {
                    transform: 'scale(1.15)',
                  }
                }}
              />
            ))}
          </Box>

          {/* Custom Hex Color Picker */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              background: 'var(--bg-glass)',
              border: '1px solid var(--border)',
              px: 2,
              py: 0.5,
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>{t('theme.custom')}</Typography>
            <Box
              component="input"
              type="color"
              value={accentColor.value.startsWith('#') && accentColor.value.length === 7 ? accentColor.value : '#0d9488'}
              onChange={(e) => onColorChange({ name: 'Custom', value: e.target.value, light: e.target.value + '22' })}
              sx={{
                width: '28px',
                height: '28px',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                background: 'none',
                p: 0,
                outline: 'none'
              }}
            />
            <TextField
              variant="standard"
              value={accentColor.value}
              onChange={(e) => onColorChange({ name: 'Custom', value: e.target.value, light: e.target.value + '22' })}
              placeholder="#000000"
              slotProps={{
                input: {
                  disableUnderline: true,
                  style: {
                    width: '75px',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    fontFamily: 'monospace'
                  }
                }
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
