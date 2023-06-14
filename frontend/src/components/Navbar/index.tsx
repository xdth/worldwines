import React from 'react';
import { Container, Logo, Menu, MenuItem } from './styles';

const Navbar: React.FC = () => {
  return (
    <>
      <Container>
        <Logo>worldwines.app</Logo>
        <Menu>
          <MenuItem>Wines</MenuItem>
          <MenuItem>Countries</MenuItem>
          <MenuItem>Varieties</MenuItem>
          <MenuItem>Wineries</MenuItem>
        </Menu>
      </Container>
    </>
  );
}

export default Navbar;