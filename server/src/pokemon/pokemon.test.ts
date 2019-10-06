import * as request from 'supertest';
import app from '../app';
import PokemonModel from './pokemon.model';
import * as mongoose from 'mongoose';
import { fakePokemon } from '../../test/fixtures/pokemon';

const fakePokemonId = new mongoose.Types.ObjectId();
const fakePokemonWithId = { ...fakePokemon, _id: fakePokemonId };

describe('GET /pokemon', () => {
  beforeEach(async () => {
    await PokemonModel.deleteMany({});
    await new PokemonModel(fakePokemonWithId).save();
  });

  it('Should respond with one pokemon', async () => {
    const response = await request(app)
      .get('/pokemon')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    const { body } = response;
    expect(body.length).toEqual(1);
  });
});

describe('GET /pokemon/:id', () => {
  beforeEach(async () => {
    await PokemonModel.deleteMany({});
    await new PokemonModel(fakePokemonWithId).save();
  });

  it('Should respond with correct pokemon', async () => {
    const response = await request(app)
      .get(`/pokemon/${fakePokemon.pokedexId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    const { body } = response;
    expect(body).toMatchObject(fakePokemon);
  });

  it('Should respond with 404, if pokemon is not found', async () => {
    await request(app)
      .get('/pokemon/4')
      .expect(404);
  });
});
