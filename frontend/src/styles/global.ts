import { createGlobalStyle } from 'styled-components';
// import BackgroundImage from '../assets/background_2400_1599.jpg';
import BackgroundImage from '../assets/background.jpg';
// import BackgroundImage from '../assets/background2.jpg';
// import BackgroundImage from '../assets/background3.jpg';
// import BackgroundImage from '../assets/background4.jpg';
// import BackgroundImage from '../assets/background5.jpg';
// import BackgroundImage from '../assets/background6.jpg';

export default createGlobalStyle`


color: #ad12a0;
  :root {
    --purple: #A569BD;
    --white: #f4ebf5;
    --background: #F0F2F5;
    --green: #33cc95;
    --blue: #5429CC;
    --blue-light: #6933FF;
    --text-title: #363F5F;
    --text-body: #969CB3;
    --background: #F8F2F5;
    --shape: #FFF;
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
`;
