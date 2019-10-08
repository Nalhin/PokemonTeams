import { TeamType } from './team';

export interface NewTeam {
  name: string;
  description: string;
  type: TeamType;
}
