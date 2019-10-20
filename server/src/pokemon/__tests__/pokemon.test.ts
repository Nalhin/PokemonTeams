import * as request from 'supertest';
import app from '../../app';
import PokemonModel from '../pokemon.model';
import * as mongoose from 'mongoose';
import { fakePokemon } from '../../../test/fixtures/pokemon';

describe('GET /pokemon', () => {
  beforeEach(async () => {
    await PokemonModel.deleteMany({});
  });

  it('Should respond with one pokemon', async () => {
    await new PokemonModel(fakePokemon).save();
    const expectedResponseStatus = 200;

    const response = await request(app).get('/pokemon');

    expect(response.status).toBe(expectedResponseStatus);
    expect(response.body.length).toEqual(1);
    expect(response.body).toMatchObject([fakePokemon]);
  });
});

describe('GET /pokemon/:id', () => {
  beforeEach(async () => {
    await PokemonModel.deleteMany({});
  });

  it('Should respond with correct pokemon', async () => {
    const fakePokemonId = new mongoose.Types.ObjectId();
    const fakePokemonWithId = { ...fakePokemon, _id: fakePokemonId };
    await new PokemonModel(fakePokemonWithId).save();
    const expectedResponseStatus = 200;

    const response = await request(app).get(
      `/pokemon/${fakePokemon.pokedexId}`,
    );

    expect(response.status).toBe(expectedResponseStatus);
    expect(response.body).toMatchObject(fakePokemon);
  });

  it('Should respond with 404, if pokemon is not found', async () => {
    const expectedResponseStatus = 404;

    const response = await request(app).get('/pokemon/4');

    expect(response.status).toBe(expectedResponseStatus);
  });
});
