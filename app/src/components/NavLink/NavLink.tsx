import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from '@emotion/styled';

interface StyledNavLinkProps {
  isActive?: boolean;
}

const StyledNavLink = styled.a`
  ${(props: StyledNavLinkProps) =>
    props.isActive &&
    `
    color:red;
  `};
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

  const isActive = location.pathname === to;

  return (
    <StyledNavLink onClick={onClick} isActive={isActive} className={className}>
      {children}
    </StyledNavLink>
  );
};

export default withRouter(NavLink);
