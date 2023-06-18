import React from 'react';
import { Container, Logo, Menu, MenuItem } from './styles';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <>
      <Container>
        <Logo>worldwines.app</Logo>
        <Menu>
          <MenuItem><Link to="/">Home</Link></MenuItem>
          <MenuItem><Link to="/wines">Wines</Link></MenuItem>
          <MenuItem><Link to="/countries">Countries</Link></MenuItem>
          <MenuItem><Link to="/varieties">Varieties</Link></MenuItem>
          <MenuItem><Link to="/wineries">Wineries</Link></MenuItem>
        </Menu>
      </Container>
    </>
  );
}

export default Navbar;