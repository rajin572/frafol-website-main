/* eslint-disable @typescript-eslint/no-explicit-any */

// Reads a fetch Response as JSON without throwing when the body is empty or not JSON (a backend
// error page, a 204, a dropped connection). `res.json()` throws "Unexpected end of JSON input" in
// that case, which crashes the whole server page ("Ups! Niečo sa pokazilo"). This returns null
// instead and logs the status and URL in the server console, so the backend answer can be checked.
export const readJson = async <T = any>(res: Response, label?: string): Promise<T | null> => {
  const text = await res.text();
  const where = label ?? res.url;

  if (!text) {
    console.error(`[readJson] empty response body (status ${res.status}) from ${where}`);
    return null;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    console.error(`[readJson] response is not JSON (status ${res.status}) from ${where}: ${text.slice(0, 200)}`);
    return null;
  }
};
