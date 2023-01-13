import { DateTime } from 'luxon';

export const second = (num: number) => num * 1000;

export const formateTime = (date: string) => {
  const time = DateTime.fromISO(date);
  return time.toFormat('yyyy-MM-dd hh:mm');
};

export const addZero = (num: number) => {
  if (num >= 10) return num;
  return `0${num}`;
};

export const formateTimeHours = (date: string) => {
  const time = DateTime.fromISO(date);
  return `${addZero(time.hour)}:${addZero(time.minute)}`;
};
