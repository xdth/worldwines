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
    border-bottom: 1px solid var(--white);
    grid-column: 1 / span 2; /* Span across two columns */
  }

  a {
    color: var(--white);
    text-decoration: none;
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
  }

  p:last-child {
    grid-column: 1 / span 2; /* Span across two columns */
  }
`;