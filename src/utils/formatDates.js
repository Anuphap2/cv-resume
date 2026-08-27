const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatMonthYear(value) {
  if (!value) return '';

  const text = String(value).trim();
  if (!text) return '';
  if (/^(present|current|ปัจจุบัน)$/i.test(text)) return 'Present';

  const isoMatch = text.match(/^(\d{4})-(\d{1,2})$/);
  const slashMatch = text.match(/^(\d{1,2})\/(\d{4})$/);
  const year = isoMatch ? isoMatch[1] : slashMatch ? slashMatch[2] : '';
  const month = isoMatch ? Number(isoMatch[2]) : slashMatch ? Number(slashMatch[1]) : 0;

  if (year && month >= 1 && month <= 12) {
    return `${MONTH_NAMES[month - 1]} ${year}`;
  }

  return text;
}

export function formatDateRange(startDate, endDate, current = false) {
  const start = formatMonthYear(startDate);
  const end = current ? 'Present' : formatMonthYear(endDate);
  return [start, end].filter(Boolean).join(' – ');
}
