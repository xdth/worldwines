import styled from 'styled-components';

export const WineBoxReducedContainer = styled.div`
  background-color: var(--background);
  /* border: 1px solid var(--white); */
  margin: auto;
  margin-bottom: 20px;
  width: 90%;
  max-width: 1000px;
  padding: 20px;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateX(10px);
  }
  
  h2 {
    font-size: 20px;
    border-bottom: 2px solid var(--purple);
    grid-column: 1 / span 2; /* Span across two columns */
  }

  a {
    color: var(--white);
    text-decoration: none;

    /* &:hover {
      color: var(--purple);
    } */
  }
  .wine-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;

    p {
      margin: 0;
      line-height: 1.5;

      span {
        font-weight: bold;
      }
    }
  }

  .read-more {
    font-size: 0.8em;
    /* color: var(--purple); */
  }

  p:last-child {
    grid-column: 1 / span 2; /* Span across two columns */
  }


  @media (max-width: 480px) {
    width: 90%;
    margin: 10px auto;
  }
`;