import { Pokemon } from '../pokemon/pokemon.interface';

enum TeamType {
  Valor,
  Instinct,
  Mystic,
}

export interface Team {
  _id: string;
  type: TeamType;
  owner: string;
  name: string;
  description: string;
  roster: Pokemon[];
}
