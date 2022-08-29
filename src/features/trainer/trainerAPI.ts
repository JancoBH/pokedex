export async function fetchTrainers(): Promise<{ data: any[] }> {
  const response = await fetch('/api/trainers');
  return await response.json();
}
