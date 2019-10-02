import * as mongoose from 'mongoose';
import { PokemonInterface } from "./pokemon.interface";

const PokemonSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
    },
    tags: [{type: String}],
    total: {
        type: Number
    },
    hp: {
        type: Number
    },
    attack: {
        type: Number
    },
    defense: {
        type: Number
    },
    spellAttack: {
        type: Number
    },
    spellDefense: {
        type: Number
    },
    speed: {
        type: Number
    }
});

const PokemonModel = mongoose.model<PokemonInterface>('pokemon', PokemonSchema);

export default PokemonModel;
