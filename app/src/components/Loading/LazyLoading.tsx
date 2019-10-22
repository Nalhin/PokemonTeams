import * as React from 'react';
import { BounceLoader } from 'react-spinners';
import { COLORS } from '../../styles/colors';
import styled from '@emotion/styled';

const StyledLoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface LazyLoading {
  className?: string;
}

const LazyLoading: React.FC<LazyLoading> = ({ className }) => {
  return (
    <StyledLoaderContainer className={className}>
      <BounceLoader loading color={COLORS.LOADER} sizeUnit="px" size={150} />
    </StyledLoaderContainer>
  );
};

export default LazyLoading;
