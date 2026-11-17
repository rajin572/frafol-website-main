// True when a detail page's record does not exist, so the page should call notFound() and answer
// with a real 404 instead of an empty page with status 200 (a "soft 404" for search engines).
// 404 = no such record, 400 = malformed id, or a successful answer without data. Server errors
// (5xx) and auth answers are NOT treated as missing: the record may exist and the API is just down.
export const isMissingRecord = (status: number, record: unknown) =>
  status === 404 || status === 400 || (status >= 200 && status < 300 && !record);
