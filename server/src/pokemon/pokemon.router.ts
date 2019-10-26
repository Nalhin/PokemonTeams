import * as express from 'express';
import { getAllPokemon, getPokemonById } from './pokemon.controller';

const router = express.Router();

router.get('/pokemon', getAllPokemon);
router.get('/pokemon/:id', getPokemonById);

export default router;
