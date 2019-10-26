import mongoose from 'mongoose';

export interface Pokemon extends mongoose.Document {
  pokedexId: number;
  name: string;
  tags: string[];
  total: number;
  hp: number;
  attack: number;
  defense: number;
  spellAttack: number;
  spellDefense: number;
  speed: number;
}
