import 'dayjs/locale/pl';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);
dayjs.extend(calendar);
dayjs.locale('pl');
