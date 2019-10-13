import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from '@emotion/styled';
import { PADDING } from '../../styles/padding';
import { COLORS } from '../../styles/colors';

interface StyledNavLinkProps {
  isActive?: boolean;
}

export const StyledNavLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 ${PADDING.BASE};
  background: ${COLORS.MAIN};
  color: #fff;

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    content: '';
    width: 100%;
    border-bottom: solid 3px #fff;
    transform: ${(props: StyledNavLinkProps) =>
      props.isActive ? 'scaleX(1)' : 'scaleX(0)'};
    transition: transform 250ms ease-in-out;
  }

  &:hover {
    cursor: pointer;
    color: #fff;
    &::after {
      transform: scaleX(1);
    }
  }
`;

interface NavLinkProps extends RouteComponentProps {
  to: string;
  children?: React.ReactNode;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  to,
  children,
  history,
  location,
  className,
}) => {
  const onClick = () => {
    history.push(to);
  };
  const isActive = '/' + location.pathname.split('/')[1] === to;

  return (
    <StyledNavLink onClick={onClick} isActive={isActive} className={className}>
      {children}
    </StyledNavLink>
  );
};

export default withRouter(NavLink);
