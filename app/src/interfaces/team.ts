import { Pokemon } from './pokemon';

export enum TeamType {
  Valor,
  Instinct,
  Mystic,
}

export interface Team {
  _id: string;
  type: TeamType;
  owner: {
    _id: string;
    login: string;
  };
  name: string;
  description: string;
  roster: Pokemon[];
}
