import styled from 'styled-components';

// export const Container = styled.article`
//   background-color: gray;
//   height: 70px;
//   width: 100%;
//   background-color: var(--background);
//   padding: 20px;
//   color: var(--white);
//   display: flex;

//   @media (max-width: 480px) {
//   }
// `;


export const Container = styled.section`
  h1 {
    margin: 15px 0 60px;

    @media (max-width: 480px) {
      width: 90%;
      margin: 10px auto;
      padding: 20px;
    }
  }
`;