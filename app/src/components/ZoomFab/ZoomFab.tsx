import * as React from 'react';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import styled from '@emotion/styled';
import { COLORS } from '../../styles/colors';

const StyledFab = styled(Fab)`
  position: fixed;
  background: ${COLORS.MAIN};
  color: #fff;
  &:hover {
    background: ${COLORS.MAIN_SECONDARY};
  }
`;

interface ZoomFabProps {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const transitionDuration = 500;

const ZoomFab: React.FC<ZoomFabProps> = ({ icon, onClick, className }) => {
  return (
    <Zoom in unmountOnExit timeout={transitionDuration}>
      <StyledFab className={className} onClick={onClick}>
        {icon}
      </StyledFab>
    </Zoom>
  );
};

export default ZoomFab;
