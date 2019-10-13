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
  height: 54px;
`;

const StyledButton = styled(StyledNavLink)`
  margin-left: auto;
  margin-right: ${PADDING.BASE};
  outline: none;
`;

const StyledLoginNavLink = styled(NavLink)`
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
      <NavLink to="/pokemon">Pokemon</NavLink>
      <NavLink to="/teams">Teams</NavLink>
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
