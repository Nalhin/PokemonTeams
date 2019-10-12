import { TeamType } from './team';
import { Pokemon } from './pokemon';

export interface NewTeam {
  name: string;
  description: string;
  type: TeamType;
  roster: Pokemon[];
}
