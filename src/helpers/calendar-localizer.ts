import {
  dateFnsLocalizer,
  DateLocalizer,
} from 'react-big-calendar';

import { format, parse, startOfWeek, getDay } from 'date-fns';

import esES from 'date-fns/locale/es';

const locales = {
  es: esES,
};

export const localizer: DateLocalizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
