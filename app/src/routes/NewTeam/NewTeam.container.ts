import { AppState } from '../../store/rootReducer';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../store/rootAction';
import { connect } from 'react-redux';
import { saveTeamRequested, setDraft } from '../../store/team/team.actions';
import NewTeam from './NewTeam';

const mapStateToProps = (state: AppState) => {
  const isLoading = state.team.newTeam.isLoading;
  const savedTeam = state.team.newTeam.savedTeam;
  return {
    isLoading,
    savedTeam,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators({ saveTeam: saveTeamRequested, setDraft }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewTeam);

export type NewTeamContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
