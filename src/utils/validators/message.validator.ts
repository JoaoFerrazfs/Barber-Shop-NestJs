import { DaysOfTheWeek } from '../../schedule/enums/daysOfTheWeek.enum';
import { SpendTimeService } from '../../schedule/enums/spendTimeService.enum';

export const getMessage = (
  enumType: typeof DaysOfTheWeek | typeof SpendTimeService,
): string => {
  return `Allowed options: ${Object.keys(enumType)
    .filter((k) => isNaN(Number(k)))
    .join(', ')}`;
};
