import * as express from 'express';
import { getAllPokemon } from './pokemon.controller';

const router = express.Router();

router.get('/pokemon', getAllPokemon);

export default router;
