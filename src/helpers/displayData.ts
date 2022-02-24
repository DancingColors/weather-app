import dayjs from 'dayjs';

export function getDisplayDate(date: string) {
  const today = dayjs().format('YYYY-MM-DD');
  if (date === today) {
    return 'today';
  } else if (date === dayjs(today).add(1, 'day').format('YYYY-MM-DD')) {
    return 'tomorrow';
  }
  return dayjs(date).format('dd DD MMM');
}
