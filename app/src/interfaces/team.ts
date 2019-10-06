import { Pokemon } from './pokemon';

export interface Team {
  _id: string;
  ownerId: string;
  name: string;
  description: string;
  roster: Pokemon[];
}
