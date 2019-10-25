import * as React from 'react';
import styled from '@emotion/styled';
import { BounceLoader } from 'react-spinners';
import { Z_INDEX } from '../../styles/zIndex';

interface WrapperProps {
  isRelative: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  ${props => props.isRelative && 'position: relative;'}
`;

interface SpinnerWrapperProps {
  isFixed: boolean;
}

const SpinnerWrapper = styled.div`
  position: ${(props: SpinnerWrapperProps) =>
    props.isFixed ? 'fixed' : 'absolute'};
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.5);
  z-index: ${Z_INDEX.LOADING};
`;

interface LoadingProps {
  isLoading: boolean;
  children?: React.ReactNode;
  isRelative?: boolean;
  isFixed?: boolean;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  isLoading,
  children,
  isRelative,
  className,
  isFixed,
}) => {
  return (
    <Wrapper
      isRelative={isRelative}
      className={className}
      data-testid="loading_wrapper"
    >
      {isLoading && (
        <SpinnerWrapper isFixed={isFixed} data-testid="loading-spinner">
          <BounceLoader
            loading={isLoading}
            color={'#36D7B7'}
            sizeUnit="px"
            size={150}
          />
        </SpinnerWrapper>
      )}
      {children}
    </Wrapper>
  );
};

Loading.defaultProps = {
  isLoading: false,
  isRelative: false,
};

export default Loading;
