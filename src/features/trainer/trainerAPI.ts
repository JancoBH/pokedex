import {Trainer} from '../../models';

export async function fetchTrainers(): Promise<{ data: Trainer[] }> {
  const response = await fetch('/api/trainers');
  return await response.json();
}
