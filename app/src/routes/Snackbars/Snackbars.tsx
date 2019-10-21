import * as React from 'react';
import { SnackbarsContainerProps } from './Snackbars.container';
import Snackbar from '../../components/Snackbar/Snackbar';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  pointer-events: none;
  z-index: 2002;
`;

interface Snackbars extends SnackbarsContainerProps {}

const Snackbars: React.FC<Snackbars> = ({ snackbarData, removeSnackbar }) => {
  return (
    <StyledContainer>
      {snackbarData.map(snackbar => (
        <Snackbar
          onClose={removeSnackbar}
          message={snackbar.message}
          id={snackbar.id}
          key={snackbar.id}
          type={snackbar.type}
        />
      ))}
    </StyledContainer>
  );
};

export default Snackbars;
