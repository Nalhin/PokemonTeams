import * as request from 'supertest';
import app from '../app';
import PokemonModel from './pokemon.model';

const mockPokemon = {
  id: '1',
  tags: ['Bug', 'Flying'],
  name: 'Butterfree',
  total: 395,
  hp: 60,
  attack: 45,
  defense: 50,
  spellAttack: 90,
  spellDefense: 80,
  speed: 70,
};

describe('GET /pokemon', () => {
  beforeEach(async () => {
    await PokemonModel.deleteMany({});
    await new PokemonModel(mockPokemon).save();
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
