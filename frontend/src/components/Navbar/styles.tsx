import styled from 'styled-components';

export const Container = styled.nav`
  /* background: gray; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--white);
  /* padding: 0 10%;
  padding-top: 30px;
  padding-bottom: 30px; */
  padding: 30px 0%;
  width: 80vw;
  margin: auto;
  /* min-height: 70px; */
  
  @media (max-width: 890px) {
    flex-direction: column;
    justify-content: space-between;
    padding: 15px;
    min-height: 0;
    width: 100vw;
  }
`;

export const Logo = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  font-size: 2em;

  span {
    color: var(--purple);
  }
  
  @media (max-width: 890px) {
    margin-bottom: 20px;
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
    color: var(--purple);
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
    border-bottom: 2px solid var(--purple);
  }

  .nav-link::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 100%;
    width: 100%;
    height: 2px;
    background-color: var(--purple);
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
