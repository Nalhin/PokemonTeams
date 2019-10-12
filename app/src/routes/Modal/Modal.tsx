import * as React from 'react';
import AddTeamModal from './TeamModal/AddTeamModal.container';
import EditTeamModal from './TeamModal/EditTeamModal.container';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ModalContainerProps } from './Modal.container';

interface ModalProps extends ModalContainerProps, RouteComponentProps {}

const Modal: React.FC<ModalProps> = ({
  history,
  isModalOpen,
  closeAllModal,
}) => {
  React.useEffect(() => {
    const unlisted = history.listen((location, action) => {
      if (action === 'POP' && isModalOpen) closeAllModal();
    });
    return () => {
      unlisted();
    };
  }, [history, isModalOpen]);

  return (
    <React.Fragment>
      <AddTeamModal />
      <EditTeamModal />
    </React.Fragment>
  );
};

export default withRouter(Modal);
