export const GENERIC_ERROR_MESSAGE =
  "Ups! Niečo sa pokazilo. Skúste obnoviť stránku alebo to skúste znova neskôr.";

// Technical errors that mean nothing to a visitor: Next.js hides the real error of a failed server
// render / server action behind its own English text, and a dropped connection reads
// "fetch failed" / "Failed to fetch".
const TECHNICAL_ERROR = /server components render|digest property|fetch failed|failed to fetch|networkerror|load failed/i;

// The text to show a visitor for a caught error: the message of the backend (a real reason such as
// "email already exists") when there is one, otherwise the generic Slovak message.
export const getFriendlyErrorMessage = (
  message?: string | null,
  fallback: string = GENERIC_ERROR_MESSAGE
): string => {
  const text = message?.trim();
  if (!text || TECHNICAL_ERROR.test(text)) return fallback;
  return text;
};
