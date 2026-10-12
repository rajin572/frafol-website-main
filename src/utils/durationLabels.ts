// Slovak plural forms: 1 → "one", 2–4 → "few", 0 and 5+ → "many".
const pluralize = (n: number, one: string, few: string, many: string) =>
  n === 1 ? one : n >= 2 && n <= 4 ? few : many;

const UNITS: Record<string, [string, string, string]> = {
  hour: ["hodina", "hodiny", "hodín"],
  day: ["deň", "dni", "dní"],
  week: ["týždeň", "týždne", "týždňov"],
  month: ["mesiac", "mesiace", "mesiacov"],
};

// Package durations come from the API as an English string such as "3 Days" / "6 Hours".
// Anything that doesn't match is returned untouched.
export const formatDuration = (duration?: string | null): string => {
  if (!duration) return "";
  const match = duration.trim().match(/^(\d+)\s*(hour|day|week|month)s?$/i);
  if (!match) return duration;
  const n = Number(match[1]);
  const [one, few, many] = UNITS[match[2].toLowerCase()];
  return `${n} ${pluralize(n, one, few, many)}`;
};

// Delivery time is stored in days; the UI shows whole weeks ("2 týždne").
export const formatWeeks = (weeks?: number | null): string => {
  if (weeks === undefined || weeks === null || Number.isNaN(weeks)) return "";
  const [one, few, many] = UNITS.week;
  return `${weeks} ${pluralize(weeks, one, few, many)}`;
};
