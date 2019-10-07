import { combineReducers } from 'redux';
import pokemon from './pokemon/pokemon.reducer';
import team from './team/team.reducer.js';

export const rootReducer = combineReducers({
  pokemon,
  team,
});

export type AppState = ReturnType<typeof rootReducer>;
