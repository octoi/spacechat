import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';

dayjs.extend(relativeTime);
dayjs.extend(calendar);

export default {
  fromNow: (date: Date) => dayjs(date).fromNow(),
  calendar: (date: Date) =>
    dayjs(date).calendar(null, {
      sameDay: 'h:mm A',
      lastDay: '[Yesterday]',
      lastWeek: 'dddd',
      sameElse: 'DD/MM/YYYY',
    }),
};
