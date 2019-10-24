import * as React from 'react';
import { AddTeamModalContainerProps } from './AddTeamModal.container';
import { NewTeam } from '../../../interfaces/newTeam';
import TeamModal from './TeamModal';

interface AddTeamModalProps extends AddTeamModalContainerProps {}

const INITIAL_STATE: NewTeam = {
  description: '',
  name: '',
  type: 0,
  roster: [],
};

const AddTeamModal: React.FC<AddTeamModalProps> = ({
  onConfirm,
  isLoading,
  closeModal,
  openPickPokemonModal,
}) => {
  const [teamState, setTeamState] = React.useState<NewTeam>({
    ...INITIAL_STATE,
  });

  const handleTeamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamState({
      ...teamState,
      [event.target.name]: event.target.value,
    });
  };

  const setType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamState({ ...teamState, type: Number(event.target.value) });
  };

  const handleConfirm = () => {
    onConfirm(teamState);
    setTeamState(INITIAL_STATE);
  };

  return (
    <TeamModal
      testId="add-team-modal"
      teamState={teamState}
      isLoading={isLoading}
      closeModal={closeModal}
      setType={setType}
      handleTeamChange={handleTeamChange}
      handleConfirm={handleConfirm}
      openPickPokemonModal={openPickPokemonModal}
    />
  );
};

export default AddTeamModal;
