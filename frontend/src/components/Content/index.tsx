import React from 'react';
import { Container, WineBoxReduced, WineBoxExpanded } from './styles';

const Content: React.FC = () => {
  return (
    <>
      <Container>
        <WineBoxReduced />
        <WineBoxExpanded />
      </Container>
    </>
  );
}

export default Content;