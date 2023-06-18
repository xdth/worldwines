import React from 'react';
import { AppContextProvider } from './hooks/appContext';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/global';
import Navbar from './components/Navbar';
import SearchBox from './components/SearchBox';
import Footer from './components/Footer';
import AppRoutes from './routes';

const App: React.FC = () => (
  <>
    <AppContextProvider>
      <BrowserRouter>
        <Navbar />
        <SearchBox />
        <AppRoutes />
        <Footer />
      </BrowserRouter>      
    </AppContextProvider>
    <GlobalStyle />
  </>
);

export default App;