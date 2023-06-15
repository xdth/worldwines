import React from 'react';
import GlobalStyle from './styles/global';
import Navbar from './components/Navbar';
import SearchBox from './components/SearchBox';
import Footer from './components/Footer';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Navbar />
    <SearchBox />
    <Footer />
  </>
);

export default App;