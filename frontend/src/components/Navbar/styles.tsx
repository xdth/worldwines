import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-items: center;
  flex-direction: row;
  color: #F1F1F1;
  padding: 30px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    justify-content: center;
    padding: 15px;
    min-height: 0;
  }
`;

export const Logo = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  font-size: 2em;
  
  @media (max-width: 480px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const MenuItem = styled.div`
  margin-right: 30px;
  font-size: 1em;

  .nav-link {
    color: white;
    text-align: center;
    text-decoration: none;
    position: relative;
    display: inline-block;
    color: inherit;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: border-bottom-width 0.3s ease-out;
    overflow: hidden;
    font-weight: normal;
  }

  .nav-link.active {
    border-bottom: 2px solid white;
  }

  .nav-link::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 100%;
    width: 100%;
    height: 2px;
    background-color: white;
    transition: left 0.3s ease-out;
    z-index: -1;
  }

  .nav-link:hover::before {
    left: 0;
  } 

  @media (max-width: 480px) {
    margin-right: 0;
    margin-left: 20px;
  }
`;
