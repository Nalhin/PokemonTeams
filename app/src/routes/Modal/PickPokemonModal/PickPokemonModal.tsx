import * as React from 'react';
import Modal from '@material-ui/core/Modal';
import Loading from '../../../components/Loading/Loading';
import { PickPokemonModalContainerProps } from './PickPokemonModal.container';
import styled from '@emotion/styled';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { PADDING } from '../../../styles/padding';
import { Pokemon } from '../../../interfaces/pokemon';
import PickPokemonModalPokemon from './PickPokemonModalPokemon';
import TeamRoster from '../../../components/TeamRoster/TeamRoster';
import * as InfiniteScroll from 'react-infinite-scroller';
import LazyLoading from '../../../components/Loading/LazyLoading';

interface PickPokemonModalProps extends PickPokemonModalContainerProps {
  addPokemon: (pokemon: Pokemon) => void;
  roster: Pokemon[];
}

const StyledTeamRoster = styled(TeamRoster)`
  max-width: 300px;
  margin: 0 auto;
`;

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModalContainer = styled(Paper)`
  width: 80%;
  max-width: 300px;
  height: 300px;
  overflow: auto;
  margin: auto;
`;

const StyledHeader = styled.div`
  text-align: center;
  padding: ${PADDING.BASE};
  position: sticky;
  z-index: 1000;
  background: #fff;
  top: 0;
`;

const StyledWrapper = styled(InfiniteScroll)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const LOAD_AMOUNT = 100;
const INITIAL_LOAD = 50;

const PickPokemonModal: React.FC<PickPokemonModalProps> = ({
  pokemonData,
  isLoading,
  getAllPokemon,
  isOpen,
  closeModal,
  addPokemon,
  roster,
}) => {
  const [loaded, setLoaded] = React.useState(INITIAL_LOAD);

  React.useEffect(() => {
    if (isOpen) getAllPokemon();
  }, [getAllPokemon, isOpen]);

  const handleLoadedChange = () => {
    setLoaded(loaded + LOAD_AMOUNT);
  };

  const hasMore = loaded < pokemonData.length;

  const items = pokemonData
    .slice(0, loaded)
    .map(pokemon => (
      <PickPokemonModalPokemon
        pokemon={pokemon}
        addPokemon={addPokemon}
        roster={roster}
        key={pokemon._id}
      />
    ));
  return (
    <StyledModal open={isOpen} onClose={closeModal}>
      <Loading isLoading={isLoading} isRelative>
        <StyledModalContainer>
          <StyledHeader>
            <Typography variant="h5" component="h3">
              Current Roster
            </Typography>
            <StyledTeamRoster roster={roster} />
          </StyledHeader>
          <StyledWrapper
            loadMore={handleLoadedChange}
            hasMore={hasMore}
            useWindow={false}
            loader={<LazyLoading key={loaded} />}
          >
            {items}
          </StyledWrapper>
        </StyledModalContainer>
      </Loading>
    </StyledModal>
  );
};

export default PickPokemonModal;
