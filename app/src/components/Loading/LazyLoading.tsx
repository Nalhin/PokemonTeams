import * as React from 'react';
import { BounceLoader } from 'react-spinners';
import { COLORS } from '../../styles/colors';
import styled from '@emotion/styled';

const StyledLoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const LazyLoading = () => {
  return (
    <StyledLoaderContainer>
      <BounceLoader loading color={COLORS.LOADER} sizeUnit="px" size={150} />
    </StyledLoaderContainer>
  );
};

export default LazyLoading;
