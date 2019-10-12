import { combineReducers } from 'redux';
import pokemon from './pokemon/pokemon.reducer';
import team from './team/team.reducer';
import user from './user/user.reducer';
import modal from './modal/modal.reducer';

export const rootReducer = combineReducers({
  pokemon,
  team,
  user,
  modal,
});

export type AppState = ReturnType<typeof rootReducer>;
