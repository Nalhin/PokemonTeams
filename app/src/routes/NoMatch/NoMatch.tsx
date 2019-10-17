import * as React from 'react';
import { Typography } from '@material-ui/core';
import styled from '@emotion/styled';
import { PADDING } from '../../styles/padding';

const StyledTypography = styled(Typography)`
  padding-top: ${PADDING.BASE};
  text-align: center;
`;

const NoMatch: React.FC = () => {
  return (
    <div data-testid="no_match">
      <StyledTypography variant="h5" component="h2">
        No match for a given route
      </StyledTypography>
    </div>
  );
};

export default NoMatch;
