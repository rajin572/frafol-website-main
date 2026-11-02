import dayjs from "dayjs";
import "dayjs/locale/sk";
import skDatePicker from "antd/es/date-picker/locale/sk_SK";
import skTimePicker from "antd/es/time-picker/locale/sk_SK";
import skCalendar from "antd/es/calendar/locale/sk_SK";

// The date picker takes its month and weekday names from dayjs, not from the antd locale. The
// "sk" locale is registered with the capitalised names the client asked for (Jan Feb Mar Apr Máj
// Jún Júl Aug Sep Okt Nov Dec, and Po Ut St Št Pi So Ne) and with Monday as the first day of the
// week. The third argument registers it without making Slovak dayjs' global locale, so every
// other date the app formats stays as it was.
dayjs.locale(
  {
    ...dayjs.Ls.sk,
    monthsShort: "Jan_Feb_Mar_Apr_Máj_Jún_Júl_Aug_Sep_Okt_Nov_Dec".split("_"),
    weekdaysMin: "Ne_Po_Ut_St_Št_Pi_So".split("_"),
  },
  undefined,
  true
);

export const pickerLocale = skDatePicker;
export const timePickerLocale = skTimePicker;
export const calendarLocale = skCalendar;
