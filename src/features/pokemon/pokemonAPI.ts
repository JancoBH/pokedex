import {Pokemon} from '../../models';

export async function fetchPokedex(): Promise<{ data: Pokemon[] }> {
  const response = await fetch('/api/trainers');
  return await response.json();
}
