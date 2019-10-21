import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { DeleteTeamModalContainerProps } from './DeleteTeamModal.container';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import styled from '@emotion/styled';
import { PADDING } from '../../../styles/padding';
import Button from '../../../components/Button/Button';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface DeleteTeamModalProps
  extends DeleteTeamModalContainerProps,
    RouteComponentProps {}

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPaper = styled(Paper)`
  padding: ${PADDING.LARGE};
  max-width: 90%;
`;

const StyledTypography = styled(Typography)`
  text-align: center;
  padding-bottom: ${PADDING.BASE};
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled(Button)`
  margin-left: ${PADDING.BASE};
`;
const DeleteTeamModal: React.FC<DeleteTeamModalProps> = ({
  closeModal,
  deleteTeam,
  history,
  teamId,
}) => {
  const handleDeleteTeam = () => {
    deleteTeam(teamId, history);
    closeModal();
  };

  return (
    <StyledModal open onClose={closeModal} data-testid="delete-team-modal">
      <StyledPaper>
        <StyledTypography variant="h5" component="h3">
          Are u sure u want to remove this team?
        </StyledTypography>
        <StyledButtonContainer>
          <StyledButton
            onClick={handleDeleteTeam}
            data-testid="delete-team-modal__confirm"
          >
            Yes
          </StyledButton>
          <StyledButton
            onClick={closeModal}
            data-testid="delete-team-modal__close"
          >
            No
          </StyledButton>
        </StyledButtonContainer>
      </StyledPaper>
    </StyledModal>
  );
};

export default withRouter(DeleteTeamModal);
