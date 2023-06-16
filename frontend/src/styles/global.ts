import { createGlobalStyle } from 'styled-components';
import BackgroundImage from '../assets/background_2400_1599.jpg';

export default createGlobalStyle`
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
