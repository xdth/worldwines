import GlobalStyle from './styles/global';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Navbar />
    <Footer />
  </>
);

export default App;