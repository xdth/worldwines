import React from 'react';
import { AppContextProvider } from './hooks/appContext';
import GlobalStyle from './styles/global';
import Navbar from './components/Navbar';
import SearchBox from './components/SearchBox';
import Footer from './components/Footer';

const App: React.FC = () => (
  <>
    <AppContextProvider>
      <Navbar />
      <SearchBox />
      <Footer />
    </AppContextProvider>
    <GlobalStyle />
  </>
);

export default App;