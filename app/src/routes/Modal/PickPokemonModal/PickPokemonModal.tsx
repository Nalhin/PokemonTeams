import * as React from 'react';
import Modal from '@material-ui/core/Modal';
import Loading from '../../../components/Loading/Loading';
import { PickPokemonModalContainerProps } from './PickPokemonModal.container';
import styled from '@emotion/styled';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { PADDING } from '../../../styles/padding';
import { Pokemon } from '../../../interfaces/pokemon';
import { ModalTypes } from '../../../store/modal/modal.types';
import Button from '../../../components/Button/Button';
import PickPokemonModalPokemonList from './PickPokemonModalPokemonList';
import PickPokemonModalRoster from './PickPokemonModalRoster';

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

interface PickPokemonModalProps extends PickPokemonModalContainerProps {}

interface PickPokemonModalState {
  readonly roster: Pokemon[];
}

class PickPokemonModal extends React.PureComponent<PickPokemonModalProps> {
  state: PickPokemonModalState = { roster: [] };

  componentDidMount(): void {
    this.props.getAllPokemon();
  }

  handleAddRoster = (pokemon: Pokemon) => {
    if (this.state.roster.length < 5)
      this.setState({ roster: [...this.state.roster, pokemon] });
  };

  handleRemoveRoster = (index: number) => {
    this.setState({
      roster: [...this.state.roster.filter((pokemon, i) => i !== index)],
    });
  };

  handleCloseModal = () => {
    this.props.closeModal(ModalTypes.pickPokemon);
  };

  render() {
    const { pokemonData, isLoading } = this.props;

    return (
      <StyledModal open onClose={this.handleCloseModal}>
        <StyledModalContainer>
          <Loading isLoading={isLoading} isRelative>
            <StyledHeader>
              <Typography variant="h5" component="h3">
                Current Roster
              </Typography>
              <PickPokemonModalRoster
                handleRemoveRoster={this.handleRemoveRoster}
                roster={this.state.roster}
              />
            </StyledHeader>
            <PickPokemonModalPokemonList
              pokemonData={pokemonData}
              handleAddRoster={this.handleAddRoster}
            />
            <Button>Yes</Button>
            <Button onClick={this.handleCloseModal}>No</Button>
          </Loading>
        </StyledModalContainer>
      </StyledModal>
    );
  }
}

export default PickPokemonModal;
