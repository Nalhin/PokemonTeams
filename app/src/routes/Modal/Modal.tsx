import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ModalContainerProps } from './Modal.container';
import { ModalTypes } from '../../store/modal/modal.types';
import Loading from '../../components/Loading/Loading';

const AddTeamModal = React.lazy(() =>
  import('./TeamModal/AddTeamModal.container'),
);
const EditTeamModal = React.lazy(() =>
  import('./TeamModal/EditTeamModal.container'),
);
const DeleteTeamModal = React.lazy(() =>
  import('./DeleteTeamModal/DeleteTeamModal.container'),
);

const PickPokemonModal = React.lazy(() =>
  import('./RosterModal/RosterModal.container'),
);

interface ModalProps extends ModalContainerProps, RouteComponentProps {}

const Modal: React.FC<ModalProps> = ({
  history,
  isModalOpen,
  closeAllModal,
  openedModals,
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
    <React.Suspense fallback={<Loading isLoading />}>
      {openedModals.map(modal => {
        switch (modal) {
          case ModalTypes.addTeam:
            return <AddTeamModal key={modal} />;
          case ModalTypes.editTeam:
            return <EditTeamModal key={modal} />;
          case ModalTypes.deleteTeam:
            return <DeleteTeamModal key={modal} />;
          case ModalTypes.roster:
            return <PickPokemonModal key={modal} />;
        }
      })}
    </React.Suspense>
  );
};

export default withRouter(Modal);
