import { useState } from 'react';
import { Box, Typography, Grid, TextField, InputAdornment, Button, IconButton } from '@mui/material';
import { Person as UserIcon, UploadFile as UploadFileIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useLanguage } from '../../i18n';

export default function PersonalInfoStep({ data, onChange, docType }) {
  const { t } = useLanguage();
  const [photoError, setPhotoError] = useState('');

  const update = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const getLabel = () => {
    if (docType === 'resume') return t('personal.jobTitle');
    if (docType === 'portfolio') return t('personal.tagline');
    return t('personal.professionalTitle');
  };

  const getPlaceholder = () => {
    if (docType === 'resume') return t('personal.jobTitlePlaceholder');
    if (docType === 'portfolio') return t('personal.taglinePlaceholder');
    return t('personal.professionalTitlePlaceholder');
  };

  const getValueKey = () => {
    if (docType === 'resume') return 'jobTitle';
    if (docType === 'portfolio') return 'tagline';
    return 'title';
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setPhotoError(t('personal.invalidImage'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const maxSize = 1200;
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        onChange({ ...data, photoUrl: canvas.toDataURL('image/jpeg', 0.82) });
        setPhotoError('');
      };
      image.onerror = () => setPhotoError(t('personal.unreadableImage'));
      image.src = reader.result;
    };
    reader.onerror = () => setPhotoError(t('personal.unreadableImage'));
    reader.readAsDataURL(file);
  };

  const removePhoto = () => onChange({ ...data, photoUrl: '' });

  return (
    <Box sx={{ animation: 'fadeIn 0.3s ease-out' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <UserIcon sx={{ color: 'var(--accent)' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
          {t('personal.title')}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'var(--text-muted)', mb: 4 }}>
        {t('personal.description')}
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, border: '1px dashed var(--border-light)', borderRadius: 2, backgroundColor: 'var(--bg-glass)' }}>
            {data.photoUrl ? (
              <Box component="img" src={data.photoUrl} alt="Profile preview" sx={{ width: 72, height: 90, objectFit: 'cover', borderRadius: 1.5 }} />
            ) : (
              <Box sx={{ width: 72, height: 90, borderRadius: 1.5, display: 'grid', placeItems: 'center', backgroundColor: 'var(--accent-bg)', color: 'var(--accent-light)', fontSize: '0.7rem', textAlign: 'center' }}>
                {t('personal.noPhoto')}
              </Box>
            )}
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{t('personal.photoTitle')}</Typography>
              <Typography variant="caption" sx={{ display: 'block', color: 'var(--text-muted)', mb: 1 }}>
                {t('personal.photoNote')}
              </Typography>
              <Button component="label" size="small" variant="outlined" startIcon={<UploadFileIcon />} sx={{ textTransform: 'none' }}>
                {data.photoUrl ? t('personal.replace') : t('personal.upload')}
                <input hidden type="file" accept="image/png,image/jpeg,image/webp" onChange={handlePhotoUpload} />
              </Button>
              {data.photoUrl && <IconButton size="small" onClick={removePhoto} aria-label={t('personal.remove')} sx={{ ml: 1, color: 'var(--text-muted)' }}><DeleteIcon fontSize="small" /></IconButton>}
              {photoError && <Typography variant="caption" sx={{ display: 'block', color: 'var(--danger)', mt: 0.5 }}>{photoError}</Typography>}
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            required
            label={t('personal.fullName')}
            variant="outlined"
            placeholder={t('personal.fullNamePlaceholder')}
            value={data.fullName || ''}
            onChange={(e) => update('fullName', e.target.value)}
            slotProps={{
              inputLabel: { shrink: true }
            }}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label={getLabel()}
            variant="outlined"
            placeholder={getPlaceholder()}
            value={data[getValueKey()] || ''}
            onChange={(e) => update(getValueKey(), e.target.value)}
            slotProps={{
              inputLabel: { shrink: true }
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            required
            type="email"
            label={t('personal.email')}
            variant="outlined"
            placeholder={t('personal.emailPlaceholder')}
            value={data.email || ''}
            onChange={(e) => update('email', e.target.value)}
            slotProps={{
              inputLabel: { shrink: true }
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            type="tel"
            label={t('personal.phone')}
            variant="outlined"
            placeholder={t('personal.phonePlaceholder')}
            value={data.phone || ''}
            onChange={(e) => update('phone', e.target.value)}
            slotProps={{
              inputLabel: { shrink: true }
            }}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label={t('personal.location')}
            variant="outlined"
            placeholder={t('personal.locationPlaceholder')}
            value={data.location || ''}
            onChange={(e) => update('location', e.target.value)}
            slotProps={{
              inputLabel: { shrink: true }
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label={t('personal.linkedin')}
            variant="outlined"
            placeholder={t('personal.linkedinPlaceholder')}
            value={data.linkedin ? data.linkedin.replace('linkedin.com/in/', '') : ''}
            onChange={(e) => update('linkedin', e.target.value ? `linkedin.com/in/${e.target.value.replace('linkedin.com/in/', '')}` : '')}
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                startAdornment: <InputAdornment position="start">linkedin.com/in/</InputAdornment>,
              }
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label={docType === 'cv' ? t('personal.orcid') : t('personal.website')}
            variant="outlined"
            placeholder={docType === 'cv' ? t('personal.orcidPlaceholder') : t('personal.websitePlaceholder')}
            value={docType === 'cv' 
              ? (data.orcid || '') 
              : (data.website ? data.website.replace('https://', '') : '')}
            onChange={(e) => update(
              docType === 'cv' ? 'orcid' : 'website', 
              docType === 'cv' ? e.target.value : (e.target.value ? `https://${e.target.value.replace('https://', '')}` : '')
            )}
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                startAdornment: docType === 'cv' ? null : <InputAdornment position="start">https://</InputAdornment>,
              }
            }}
          />
        </Grid>

        {docType === 'cv' && (
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label={t('personal.website')}
              variant="outlined"
              placeholder={t('personal.websitePlaceholder')}
              value={data.website ? data.website.replace('https://', '') : ''}
              onChange={(e) => update('website', e.target.value ? `https://${e.target.value.replace('https://', '')}` : '')}
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  startAdornment: <InputAdornment position="start">https://</InputAdornment>,
                }
              }}
            />
          </Grid>
        )}

        {docType === 'portfolio' && (
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label={t('personal.github')}
              variant="outlined"
              placeholder={t('personal.githubPlaceholder')}
              value={data.github ? data.github.replace('github.com/', '') : ''}
              onChange={(e) => update('github', e.target.value ? `github.com/${e.target.value.replace('github.com/', '')}` : '')}
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  startAdornment: <InputAdornment position="start">github.com/</InputAdornment>,
                }
              }}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
