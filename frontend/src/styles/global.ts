import { createGlobalStyle } from 'styled-components';
// import BackgroundImage from '../assets/background_2400_1599.jpg';

// import BackgroundImage from '../assets/background3.jpg';
// import BackgroundImage from '../assets/background6.jpg';
import BackgroundImage from '../assets/background.jpg';
// import BackgroundImage from '../assets/background5.jpg';

// import BackgroundImage from '../assets/background2.jpg';
// import BackgroundImage from '../assets/background4.jpg';

export default createGlobalStyle`


color: #ad12a0;
  :root {
    --purple: #800080;
    /* --white: #f4ebf5; */
    --white: #FFFFFF;
    --background: rgba(0, 0, 0, 0.3);
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

  section {
    background: gray;

    width: 50%;
    min-width: 700px;
    margin: auto;
    display: flex;
    flex-direction: column;
    transition: height .8s ease-out;

    &.expanded {
    /* justify-content: center;
    align-items: center;
    height: 600px; */
    background: purple;
    }

    &.reduced {
      background: green;
      display: hidden;
    }

    @media (max-width: 480px) {
      width: 90%;
      min-width: 0;
      margin: auto;
    }
  }

  h1 {
    // background-color: var(--background);
    text-align: left;
    margin: 60px 0;
    font-size: 2em;
    color: var(--white);

    @media (max-width: 480px) {
      width: 90%;
      margin: 10px auto;
      padding: 20px;
    }
  }
`;
