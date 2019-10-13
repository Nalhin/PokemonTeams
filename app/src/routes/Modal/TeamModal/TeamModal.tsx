import * as React from 'react';
import { Pokemon } from '../../../interfaces/pokemon';
import Loading from '../../../components/Loading/Loading';
import TeamTypeRadioGroup from '../../../components/TeamTypeRadioGroup/TeamTypeRadioGroup';
import Input from '../../../components/Input/Input';
import { Typography } from '@material-ui/core';
import TeamRoster from '../../../components/TeamRoster/TeamRooster';
import Button from '../../../components/Button/Button';
import PickPokemonModal from '../PickPokemonModal/PickPokemonModal.container';
import { NewTeam } from '../../../interfaces/newTeam';
import styled from '@emotion/styled';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { PADDING } from '../../../styles/padding';
import AsyncSelect from 'react-select/async';
import { fetchGetAllPokemon } from '../../../store/pokemon/pokemon.api';

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledContainer = styled(Paper)`
  width: 80%;
  max-width: 450px;
  padding: ${PADDING.LARGE};
`;

const StyledLoading = styled(Loading)`
  display: flex;
  flex-direction: column;
`;

interface TeamModalProps {
  teamState: NewTeam;
  setType: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addPokemon: (pokemon: Pokemon) => void;
  handleTeamChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  closeModal: () => void;
  openPickPokemonModal: () => void;
  removeFromRoster: (position: number) => void;
  handleConfirm: () => void;
  isOpen: boolean;
}

const TeamModal: React.FC<TeamModalProps> = ({
  handleTeamChange,
  addPokemon,
  setType,
  teamState,
  handleConfirm,
  isOpen,
  isLoading,
  closeModal,
  openPickPokemonModal,
}) => {
  const { description, type, name, roster } = teamState;
  return (
    <StyledModal open={isOpen} onClose={closeModal}>
      <StyledContainer data-testid="teams">
        <StyledLoading isLoading={isLoading} isRelative>
          <TeamTypeRadioGroup value={type} onChange={setType} />
          <Input
            onChange={handleTeamChange}
            value={name}
            name="name"
            label="Team name"
          />
          <Input
            onChange={handleTeamChange}
            value={description}
            name="description"
            label="Team description"
          />
          <Typography variant="subtitle1" component="h2">
            Roster
          </Typography>
          <TeamRoster roster={roster} />
          <AsyncSelect
            isMulti
            cacheOptions
            defaultOptions
            loadOptions={fetchGetAllPokemon}
          />
          <Button onClick={openPickPokemonModal}>Change Roster</Button>
          <Button onClick={handleConfirm}>Save</Button>
          <PickPokemonModal addPokemon={addPokemon} roster={roster} />
        </StyledLoading>
      </StyledContainer>
    </StyledModal>
  );
};

export default TeamModal;
