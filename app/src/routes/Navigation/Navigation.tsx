import * as React from 'react';
import NavLink, { StyledNavLink } from '../../components/NavLink/NavLink';
import AppBar from '@material-ui/core/AppBar';
import { COLORS } from '../../styles/colors';
import styled from '@emotion/styled';
import { NavigationContainerProps } from './Navigation.container';
import { PADDING } from '../../styles/padding';

const StyledAppBar = styled(AppBar)`
  background: ${COLORS.MAIN};
  display: flex;
  flex-direction: row;
  padding: 0 5%;
  height: 54px;
`;

const StyledNavigationLink = styled(NavLink)`
  &:hover {
    &::after {
      transform: scaleX(1);
    }
  }
`;

const StyledButton = styled(StyledNavLink)`
  margin-left: auto;
  margin-right: ${PADDING.BASE};
  outline: none;
  &:hover {
    &::after {
      transform: scaleX(1);
    }
  }
`;

const StyledLoginNavLink = styled(StyledNavigationLink)`
  margin-left: auto;
  margin-right: ${PADDING.BASE};
`;

const StyledNavLinkButton = StyledButton.withComponent('a');

interface NavigationProps extends NavigationContainerProps {}

const Navigation: React.FC<NavigationProps> = ({
  isAuthenticated,
  logoutUser,
}) => {
  return (
    <StyledAppBar position="sticky">
      <StyledNavigationLink to="/pokemon">Pokemon</StyledNavigationLink>
      <StyledNavigationLink to="/teams">Teams</StyledNavigationLink>
      {isAuthenticated ? (
        <StyledNavLinkButton type="button" onClick={logoutUser}>
          Logout
        </StyledNavLinkButton>
      ) : (
        <React.Fragment>
          <StyledLoginNavLink to="/">Login</StyledLoginNavLink>
        </React.Fragment>
      )}
    </StyledAppBar>
  );
};

export default Navigation;
