import * as React from 'react';
import { Pokemon } from '../../../interfaces/pokemon';
import produce from 'immer';
import { fetchGetTeamById } from '../../../store/team/team.api.js';
import { Team } from '../../../interfaces/team';
import { EditTeamModalContainerProps } from './EditTeamModal.container';
import TeamModal from './TeamModal';

interface EditTeamModalProps extends EditTeamModalContainerProps {
  teamId: string;
}

const EditTeamModal: React.FC<EditTeamModalProps> = ({
  onConfirm,
  isLoading,
  closeModal,
  teamId,
  isOpen,
  openPickPokemonModal,
}) => {
  const [teamState, setTeamState] = React.useState<Team>({} as Team);

  React.useEffect(() => {
    fetchGetTeamById(teamId).then(team => setTeamState(team));
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

  const addPokemon = (pokemon: Pokemon) => {
    if (teamState.roster.length < 5)
      setTeamState(
        produce<Team>(teamState, draftState => {
          draftState.roster.push(pokemon);
        }),
      );
  };

  const removeFromRoster = (position: number) => {
    setTeamState(
      produce<Team>(teamState, draftState => {
        const { roster } = teamState;
        draftState.roster = [
          ...roster.slice(position - 1),
          ...roster.slice(position, roster.length),
        ];
      }),
    );
  };

  const handleConfirm = () => {
    onConfirm(teamState);
  };

  return (
    <TeamModal
      teamState={teamState}
      isLoading={isLoading}
      closeModal={closeModal}
      setType={setType}
      addPokemon={addPokemon}
      handleTeamChange={handleTeamChange}
      removeFromRoster={removeFromRoster}
      isOpen={isOpen}
      handleConfirm={handleConfirm}
      openPickPokemonModal={openPickPokemonModal}
    />
  );
};

export default EditTeamModal;
