import { useMemo, useState } from 'react';
import { Alert, Box, Button, Chip, Paper, Stack, TextField, Typography } from '@mui/material';
import { ContentCopy as CopyIcon, Tune as TuneIcon } from '@mui/icons-material';
import { useLanguage } from '../../i18n';

const STOP_WORDS = new Set(`about above after again against all also among an and any are as at be because been before being below between both but by can could did do does doing down during each few for from further had has have having he her here hers herself him himself his how i if in into is it its itself just me more most my myself no nor not of off on once only or other our ours ourselves out over own same she should so some such than that the their theirs them themselves then there these they this those through to too under until up very was we were what when where which while who whom why will with would you your yours yourself yourselves experience summary skills education achievements responsibilities qualifications preferred required desirable candidate role work team using use`.split(/\s+/));

function extractKeywords(text) {
  const counts = new Map();
  // Keep useful short terms such as AI and C#, while matching whole tokens
  // instead of finding accidental substrings in unrelated words.
  const tokens = text.toLocaleLowerCase().match(/[\p{L}\p{N}][\p{L}\p{N}+#.]{1,}/gu) || [];
  tokens.forEach((token) => {
    if (!STOP_WORDS.has(token) && !/^\d+$/.test(token)) counts.set(token, (counts.get(token) || 0) + 1);
  });
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 28).map(([word]) => word);
}

export default function ResumeTargetingStep({ data, onChange, template }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const resumeText = useMemo(() => [
    data.personalInfo?.jobTitle,
    data.summary,
    ...(data.skills || []).map((item) => `${item.category || ''}: ${item.items || ''}`),
    ...(data.experience || []).map((item) => `${item.position || ''} at ${item.company || ''}\n${item.description || ''}`),
    ...(data.projects || []).map((item) => `${item.name || ''}\n${item.description || ''}\n${item.technologies || ''}`),
    ...(data.education || []).map((item) => `${item.degree || ''} ${item.field || ''} ${item.institution || ''}`),
    ...(data.certifications || []).map((item) => `${item.name || ''} ${item.issuer || ''}`),
  ].filter(Boolean).join('\n'), [data]);
  const { matched, missing } = useMemo(() => {
    const keywords = extractKeywords(data.jobDescription || '');
    const resumeWords = new Set(resumeText.toLocaleLowerCase().match(/[\p{L}\p{N}][\p{L}\p{N}+#.]{1,}/gu) || []);
    return {
      matched: keywords.filter((word) => resumeWords.has(word)),
      missing: keywords.filter((word) => !resumeWords.has(word)),
    };
  }, [data.jobDescription, resumeText]);

  const copyPrompt = async () => {
    const prompt = t('resumeTargeting.promptTemplate', {
      role: data.targetRole || data.personalInfo?.jobTitle || '',
      jobDescription: data.jobDescription || '',
      resume: resumeText || t('resumeTargeting.emptyResume'),
    });
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const update = (field) => (event) => onChange({ ...data, [field]: event.target.value });
  const hasMetrics = /\d/.test((data.experience || []).map((item) => item.description || '').join(' '));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, animation: 'fadeIn 0.3s ease-out' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <TuneIcon sx={{ color: 'var(--accent)' }} />
        <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
          {t('resumeTargeting.title')}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'var(--text-muted)', mt: -2 }}>
        {t('resumeTargeting.description')}
      </Typography>

      <TextField fullWidth label={t('resumeTargeting.role')} value={data.targetRole || ''} onChange={update('targetRole')} />
      <TextField
        fullWidth multiline minRows={7} label={t('resumeTargeting.jobDescription')}
        placeholder={t('resumeTargeting.jobDescriptionPlaceholder')}
        value={data.jobDescription || ''} onChange={update('jobDescription')}
        helperText={t('resumeTargeting.jobDescriptionHelp')}
      />

      {data.jobDescription?.trim() ? (
        <Paper variant="outlined" sx={{ p: 2.5, borderColor: 'var(--border)', bgcolor: 'var(--bg-glass)' }}>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>{t('resumeTargeting.keywordTitle')}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{t('resumeTargeting.keywordDescription')}</Typography>
          <Typography variant="caption" fontWeight={700}>{t('resumeTargeting.found')}</Typography>
          <Stack direction="row" useFlexGap flexWrap="wrap" gap={0.75} sx={{ my: 1 }}>
            {matched.length ? matched.map((word) => <Chip key={word} size="small" color="success" variant="outlined" label={word} />) : <Typography variant="body2" color="text.secondary">{t('resumeTargeting.noneYet')}</Typography>}
          </Stack>
          <Typography variant="caption" fontWeight={700}>{t('resumeTargeting.review')}</Typography>
          <Stack direction="row" useFlexGap flexWrap="wrap" gap={0.75} sx={{ mt: 1 }}>
            {missing.length ? missing.map((word) => <Chip key={word} size="small" variant="outlined" label={word} />) : <Typography variant="body2" color="text.secondary">{t('resumeTargeting.allCovered')}</Typography>}
          </Stack>
        </Paper>
      ) : null}

      <Paper variant="outlined" sx={{ p: 2.5, borderColor: 'var(--border)', bgcolor: 'var(--bg-glass)' }}>
        <Typography variant="subtitle1" fontWeight={700} gutterBottom>{t('resumeTargeting.checkTitle')}</Typography>
        <Stack spacing={1}>
          <Typography variant="body2">{template === 'classic' ? '✓' : '○'} {t('resumeTargeting.layoutCheck')}</Typography>
          <Typography variant="body2">{data.summary?.trim() ? '✓' : '○'} {t('resumeTargeting.summaryCheck')}</Typography>
          <Typography variant="body2">{hasMetrics ? '✓' : '○'} {t('resumeTargeting.impactCheck')}</Typography>
        </Stack>
        <Alert severity="info" sx={{ mt: 2 }}>{t('resumeTargeting.atsNote')}</Alert>
      </Paper>

      <Box>
        <Button variant="contained" startIcon={<CopyIcon />} onClick={copyPrompt} disabled={!data.jobDescription?.trim()}>
          {copied ? t('resumeTargeting.copied') : t('resumeTargeting.copyPrompt')}
        </Button>
        <Typography variant="caption" display="block" sx={{ mt: 1, color: 'var(--text-muted)' }}>
          {t('resumeTargeting.privacyNote')}
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 0.5, color: 'var(--text-muted)' }}>
          {t('resumeTargeting.keywordLanguageNote')}
        </Typography>
      </Box>
    </Box>
  );
}
