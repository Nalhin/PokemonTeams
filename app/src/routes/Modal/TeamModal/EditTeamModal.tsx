import * as React from 'react';
import { Team } from '../../../interfaces/team';
import { EditTeamModalContainerProps } from './EditTeamModal.container';
import TeamModal from './TeamModal';

interface EditTeamModalProps extends EditTeamModalContainerProps {}

const EditTeamModal: React.FC<EditTeamModalProps> = ({
  onConfirm,
  team,
  closeModal,
  isLoading,
  openPickPokemonModal,
}) => {
  const [teamState, setTeamState] = React.useState<Team>({} as Team);

  React.useEffect(() => {
    setTeamState(team);
  }, [team]);

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
  };

  return (
    <TeamModal
      testId="edit-team-modal"
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

export default EditTeamModal;
