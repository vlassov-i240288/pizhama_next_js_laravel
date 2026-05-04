export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function getStatus(): Promise<{ status: string; app?: string; env?: string; time?: string } | null> {
  try {
    const res = await fetch(`${API_URL}/api/status`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}
