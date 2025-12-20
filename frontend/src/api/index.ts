const BASE_URL = "http://localhost:3000";

export async function fetchJson<T>(url: string): Promise<T> {
  const result = await fetch(`${BASE_URL + url}`);
  if (!result.ok) throw new Error(`Response status: ${result.status}`);
  const data = await result.json();
  return data;
}
