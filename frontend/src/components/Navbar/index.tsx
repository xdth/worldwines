import React from 'react';
import { Container, Logo, Menu, MenuItem } from './styles';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <Container>
      <Logo>world<span>wines</span>.app</Logo>
      <Menu>
        <MenuItem>
          <NavLink to="/" end className={`nav-link ${isActive('/') && 'active'}`}>Home</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/wines" className={`nav-link ${isActive('/wines') && 'active'}`}>Wines</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/countries" className={`nav-link ${isActive('/countries') && 'active'}`}>Countries</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/varieties" className={`nav-link ${isActive('/varieties') && 'active'}`}>Varieties</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/wineries" className={`nav-link ${isActive('/wineries') && 'active'}`}>Wineries</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/wine" className={`nav-link ${isActive('/wine') && 'active'}`}>Wine</NavLink>
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default Navbar;
