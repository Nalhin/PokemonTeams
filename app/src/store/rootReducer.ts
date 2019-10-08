import { combineReducers } from 'redux';
import pokemon from './pokemon/pokemon.reducer';
import team from './team/team.reducer';
import user from './user/user.reducer';

export const rootReducer = combineReducers({
  pokemon,
  team,
  user,
});

export type AppState = ReturnType<typeof rootReducer>;
