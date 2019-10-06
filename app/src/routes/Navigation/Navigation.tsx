import * as React from 'react';
import NavLink from '../../components/NavLink/NavLink';

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/pokemon">Pokemon</NavLink>
      <NavLink to="/teams">Teams</NavLink>
    </nav>
  );
};

export default Navigation;
