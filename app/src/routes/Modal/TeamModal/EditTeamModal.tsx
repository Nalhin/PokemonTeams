import * as React from 'react';
import { Pokemon } from '../../../interfaces/pokemon';
import produce from 'immer';
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
      testId="edit-team-modal"
      teamState={teamState}
      isLoading={isLoading}
      closeModal={closeModal}
      setType={setType}
      addPokemon={addPokemon}
      handleTeamChange={handleTeamChange}
      removeFromRoster={removeFromRoster}
      handleConfirm={handleConfirm}
      openPickPokemonModal={openPickPokemonModal}
    />
  );
};

export default EditTeamModal;
