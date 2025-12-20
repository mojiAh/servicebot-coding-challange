const BASE_URL = "http://localhost:3000";

const simpleCache = new Map<string, any>();

export async function fetchJson<T>(url: string): Promise<T> {
  if (simpleCache.has(url)) return simpleCache.get(url);

  const result = await fetch(`${BASE_URL + url}`);
  if (!result.ok) throw new Error(`Response status: ${result.status}`);
  const data = await result.json();

  simpleCache.set(url, data);

  return data;
}
