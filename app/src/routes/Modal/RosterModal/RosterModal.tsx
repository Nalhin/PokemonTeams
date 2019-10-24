import * as React from 'react';
import Modal from '@material-ui/core/Modal';
import Loading from '../../../components/Loading/Loading';
import { RosterModalContainerProps } from './RosterModal.container';
import styled from '@emotion/styled';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { PADDING } from '../../../styles/padding';
import { ModalTypes } from '../../../store/modal/modal.types';
import Button from '../../../components/Button/Button';
import PickerPokemonList from './Picker/PickerPokemonList';
import ModalRoster from './Roster/ModalRoster';

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModalContainer = styled(Paper)`
  width: 80%;
  max-width: 300px;
  margin: auto;
`;

const StyledHeader = styled.div`
  text-align: center;
  padding: ${PADDING.X_BASE};
  position: sticky;
  z-index: 1000;
  background: #fff;
  top: 0;
`;

interface RosterModalProps extends RosterModalContainerProps {}

const RosterModal: React.FC<RosterModalProps> = ({
  pokemonData,
  isLoading,
  addToRosterModal,
  removeFromRosterModal,
  getAllPokemon,
  closeModal,
  roster,
}) => {
  React.useEffect(() => {
    getAllPokemon();
  }, [getAllPokemon]);

  const handleCloseModal = () => {
    closeModal(ModalTypes.roster);
  };

  return (
    <StyledModal open onClose={handleCloseModal}>
      <StyledModalContainer>
        <Loading isLoading={isLoading} isRelative>
          <StyledHeader>
            <Typography variant="h5" component="h3">
              Current Roster
            </Typography>
            <ModalRoster
              handleRemoveRoster={removeFromRosterModal}
              roster={roster}
            />
          </StyledHeader>
          <PickerPokemonList
            pokemonData={pokemonData}
            handleAddRoster={addToRosterModal}
          />
          <Button data-testid="roster-modal__save">Save</Button>
          <Button onClick={handleCloseModal} data-testid="roster-modal__close">
            Close
          </Button>
        </Loading>
      </StyledModalContainer>
    </StyledModal>
  );
};

export default RosterModal;
