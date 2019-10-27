import * as React from 'react';
import { AddTeamModalContainerProps } from './AddTeamModal.container';
import TeamTypeRadioGroup from '../../../components/TeamTypeRadioGroup/TeamTypeRadioGroup';
import Input from '../../../components/Input/Input';
import { Typography } from '@material-ui/core';
import TeamRoster from '../../../components/TeamRoster/TeamRoster';
import Button from '../../../components/Button/Button';
import Loading from '../../../components/Loading/Loading';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import styled from '@emotion/styled';
import { PADDING } from '../../../styles/padding';
import { EditTeamModalContainerProps } from './EditTeamModal.container';
import { ModalTypes, TeamCombined } from '../../../store/modal/modal.types';
import debounce from 'lodash/debounce';
import { Z_INDEX } from '../../../styles/zIndex';

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${Z_INDEX.MODAL} !important;
`;

const StyledContainer = styled(Paper)`
  width: 90%;
  max-width: 450px;
  padding: ${PADDING.LARGE};
`;

const StyledLoading = styled(Loading)`
  display: flex;
  flex-direction: column;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled(Button)`
  margin-left: ${PADDING.BASE};
`;

type TeamModalProps = AddTeamModalContainerProps | EditTeamModalContainerProps;

const debounceTimer = 500;

const TeamModal: React.FC<TeamModalProps> = ({
  onConfirm,
  isLoading,
  closeModal,
  openModal,
  teamState,
  setTeamModal,
  setRosterModal,
}) => {
  const [inputState, setInputState] = React.useState({
    name: teamState.name,
    description: teamState.description,
  });

  const delayedSetTeamModal = React.useRef(
    debounce((team: TeamCombined) => setTeamModal(team), debounceTimer),
  ).current;

  const handleTeamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputState({
      ...teamState,
      [event.target.name]: event.target.value,
    });
    delayedSetTeamModal({
      ...teamState,
      [event.target.name]: event.target.value,
    });
  };

  const setType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamModal({ ...teamState, type: Number(event.target.value) });
  };

  const onBlur = () => {
    setTeamModal({ ...teamState, ...inputState });
    delayedSetTeamModal.cancel();
  };

  const handleConfirm = () => {
    // @ts-ignore
    onConfirm(teamState);
  };

  const handleOpenRosterModal = () => {
    setRosterModal(teamState.roster);
    openModal(ModalTypes.roster);
  };

  const { type, roster } = teamState;
  const { name, description } = inputState;
  return (
    <StyledModal open onClose={closeModal}>
      <StyledContainer data-testid="team-modal">
        <StyledLoading isLoading={isLoading} isRelative>
          <TeamTypeRadioGroup value={type} onChange={setType} />
          <Input
            onChange={handleTeamChange}
            onBlur={onBlur}
            value={name}
            name="name"
            label="Team name"
          />
          <Input
            onChange={handleTeamChange}
            onBlur={onBlur}
            value={description}
            name="description"
            label="Team description"
          />
          <Typography variant="subtitle1" component="h2">
            Roster
          </Typography>
          <TeamRoster roster={roster} />
          <Button
            onClick={handleOpenRosterModal}
            data-testid="team-modal__change-roster"
          >
            Change Roster
          </Button>
          <StyledButtonContainer>
            <StyledButton
              onClick={handleConfirm}
              data-testid="team-modal__save"
            >
              Save
            </StyledButton>
            <StyledButton onClick={closeModal} data-testid="team-modal__close">
              Close
            </StyledButton>
          </StyledButtonContainer>
        </StyledLoading>
      </StyledContainer>
    </StyledModal>
  );
};

export default TeamModal;
