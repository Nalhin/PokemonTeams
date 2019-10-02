import * as mongoose from "mongoose";

export interface PokemonInterface extends mongoose.Document {
    id: string;
    name: string;
    tags: string[];
    hp: number;
    attack: number;
    defense: number;
    spellAttack: number;
    spellDefense: number;
    speed: number;
}