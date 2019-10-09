import * as React from 'react';
import styled from '@emotion/styled';
import MdButton from '@material-ui/core/Button';

import { PADDING } from '../../styles/padding';
import { COLORS } from '../../styles/colors';

const StyledButton = styled(MdButton)`
  margin: ${PADDING.BASE} 0;
  background: ${COLORS.MAIN};
  color: #fff;
  &:hover {
    cursor: pointer;
    background: ${COLORS.MAIN_SECONDARY};
  }
`;

interface ButtonProps {
  children?: string;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <StyledButton variant="contained" {...rest}>
      {children}{' '}
    </StyledButton>
  );
};

export default Button;
