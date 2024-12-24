import * as utc from 'dayjs/plugin/utc';
import * as dayjs from 'dayjs';

export const dayjsUtc = (): typeof dayjs => {
  dayjs.extend(utc);

  return dayjs;
};
