import { AppState } from '../../../store/rootReducer';
import { ModalTypes } from '../../../store/modal/modal.types';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../../store/rootAction';
import { closeModal } from '../../../store/modal/modal.actions';
import { connect } from 'react-redux';
import { deleteTeamRequested } from '../../../store/team/team.actions';
import DeleteTeamModal from './DeleteTeamModal';

const mapStateToProps = (state: AppState) => {
  const teamId = state.team.current.team._id;
  return {
    teamId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
  return bindActionCreators(
    {
      deleteTeam: deleteTeamRequested,
      closeModal: () => closeModal(ModalTypes.deleteTeam),
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteTeamModal);

export type DeleteTeamModalContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
