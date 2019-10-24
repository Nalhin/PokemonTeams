import { AppState } from '../../store/rootReducer';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../store/rootAction';
import { getTeamByIdRequested } from '../../store/team/team.actions';
import { connect } from 'react-redux';
import TeamSingleView from './TeamSingleView';
import { openModal, setTeamModal } from '../../store/modal/modal.actions';

const mapStateToProps = (state: AppState) => {
  const isLoading = state.team.current.isLoading;
  const team = state.team.current.team;
  return {
    isLoading,
    team,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      getTeam: getTeamByIdRequested,
      openModal,
      setTeamModal,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeamSingleView);

export type TeamSingleViewContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
