import { combineReducers } from 'redux';
import pokemon from './pokemon/pokemon.reducer';

export const rootReducer = combineReducers({
  pokemon
});

export type AppState = ReturnType<typeof rootReducer>;
