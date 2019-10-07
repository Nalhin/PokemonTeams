import { bindActionCreators, Dispatch } from 'redux';

import { connect } from 'react-redux';

import Teams from './Teams';
import { Team } from '../../interfaces/team';
import { AppState } from '../../store/rootReducer';
import { getTeamsRequested } from '../../store/team/team.actions';

export interface AppStateProps {
  teams: Team[];
  isLoading: boolean;
}

function mapStateToDispatch(state: AppState): AppStateProps {
  const teams = state.team.teams.data;
  const isLoading = state.team.teams.isLoading;
  return {
    teams,
    isLoading,
  };
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ getTeams: getTeamsRequested }, dispatch);

export default connect(
  mapStateToDispatch,
  mapDispatchToProps,
)(Teams);
