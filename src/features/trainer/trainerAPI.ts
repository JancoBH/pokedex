import {Trainer} from '../../models';

export async function fetchTrainers(): Promise<Trainer[]> {
  const response = await fetch('/trainers.json');
  return await response.json();
}
