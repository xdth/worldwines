import { createGlobalStyle } from 'styled-components';
// import BackgroundImage from '../assets/background_2400_1599.jpg';

import BackgroundImage from '../assets/background3.jpg';
// import BackgroundImage from '../assets/background6.jpg';
// import BackgroundImage from '../assets/background.jpg';
// import BackgroundImage from '../assets/background5.jpg';

// import BackgroundImage from '../assets/background2.jpg';
// import BackgroundImage from '../assets/background4.jpg';

export default createGlobalStyle`


color: #ad12a0;
  :root {
    --purple: #A569BD;
    /* --white: #f4ebf5; */
    --white: #FFFFFF;
    --background: rgba(0, 0, 0, 0.4);
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  #root {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  html {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    background: url(${BackgroundImage}) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    color: white;
  }

  h1 {
    // background-color: var(--background);
    text-align: center;
    margin-bottom: 30px;
    font-size: 2em;
    color: var(--white);
  }
`;
