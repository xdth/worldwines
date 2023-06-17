import React from 'react';
import { AppContextProvider } from './hooks/appContext';
import GlobalStyle from './styles/global';
import Navbar from './components/Navbar';
import SearchBox from './components/SearchBox';
import SearchResult from './components/SearchResult';
import WineList from './WineList';
import Footer from './components/Footer';

const App: React.FC = () => (
  <>
    <AppContextProvider>
      <Navbar />
      <SearchBox />
      <SearchResult />
      <WineList />
      <Footer />
    </AppContextProvider>
    <GlobalStyle />
  </>
);

export default App;