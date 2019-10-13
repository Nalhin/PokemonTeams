import * as React from 'react';
import { AddTeamModalContainerProps } from './AddTeamModal.container';
import { NewTeam } from '../../../interfaces/newTeam';
import { Pokemon } from '../../../interfaces/pokemon';
import produce from 'immer';
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
  isOpen,
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

  const addPokemon = (pokemon: Pokemon) => {
    if (teamState.roster.length < 5)
      setTeamState(
        produce<NewTeam>(teamState, draftState => {
          draftState.roster.push(pokemon);
        }),
      );
  };

  const removeFromRoster = (position: number) => {
    setTeamState(
      produce<NewTeam>(teamState, draftState => {
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
    setTeamState(INITIAL_STATE);
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

export default AddTeamModal;
