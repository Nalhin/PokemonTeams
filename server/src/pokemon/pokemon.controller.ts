import { Request, Response } from 'express';
import PokemonModel from './pokemon.model';
import { Pokemon } from './pokemon.interface';

export const getAllPokemon = async (req: Request, res: Response) => {
  try {
    const allPokemon: Pokemon[] = await PokemonModel.find({}).sort({
      pokedexId: 1,
    });
    res.send(allPokemon);
  } catch (e) {
    res.status(500).send(e);
  }
};

export const getPokemonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pokemon: Pokemon = await PokemonModel.findOne({ pokedexId: id });
    if (!pokemon) return res.status(404).send();
    return res.send(pokemon);
  } catch (e) {
    res.status(500).send(e);
  }
};
