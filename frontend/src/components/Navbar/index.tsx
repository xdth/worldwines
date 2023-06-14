import React from 'react';
import { Container, Logo, Menu, MenuItem } from './styles';
import SearchBox from '../SearchBox';

const Navbar: React.FC = () => {
  return (
    <>
      <Container>
        <Logo>worldwines.app</Logo>
        <SearchBox />
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