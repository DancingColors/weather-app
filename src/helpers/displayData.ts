import dayjs from 'dayjs';

export function getDisplayDate(date: string, format: string = 'dd DD MMM') {
  const today = dayjs().format('YYYY-MM-DD');
  if (date === today) {
    return 'today';
  } else if (date === dayjs(today).add(1, 'day').format('YYYY-MM-DD')) {
    return 'tomorrow';
  } else if (date === dayjs(today).subtract(1, 'day').format('YYYY-MM-DD')) {
    return 'yesterday';
  }
  return dayjs(date).format(format);
}

export function getDisplayTemp(temp: number) {
  return ~~temp;
}

export function getDisplayKnotsFromMiles(mph: number) {
  return (mph % 1.15078).toFixed(2);
}
