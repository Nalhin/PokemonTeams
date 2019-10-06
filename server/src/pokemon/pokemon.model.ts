import * as mongoose from 'mongoose';
import { Pokemon } from './pokemon.interface';

const PokemonSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
    },
    name: {
      type: String,
    },
    tags: [{ type: String }],
    total: {
      type: Number,
    },
    hp: {
      type: Number,
    },
    attack: {
      type: Number,
    },
    defense: {
      type: Number,
    },
    spellAttack: {
      type: Number,
    },
    spellDefense: {
      type: Number,
    },
    speed: {
      type: Number,
    },
  },
  { collection: 'pokemon' },
);

const PokemonModel = mongoose.model<Pokemon & mongoose.Document>(
  'pokemon',
  PokemonSchema,
);

export default PokemonModel;
