import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  
  :root {
    --black: #000000;
    --dark:#171616;
    --pink:#FF69B4;
    --green: #00FF7F; 
    --light:#FFFFFF;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *::selection {
    background: pink;
    color: black;
  }

  *::-webkit-scrollbar {
    overflow-y: scroll;
    width: 7px;
    background: black;
  }
  a{
    color: white;
    text-decoration: none;
  }
  *::-webkit-scrollbar-thumb {
    background: var(--dark);
    border-radius: 15px;
  }

  body {
    padding-top: 110px;
    background: #000000;
    color: white;
    font-family: sans-serif;
    overflow-x: hidden;
  }

  h1 {
    font-family: sans-serif;
    color: white;
  }
`;
export const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 47px;
  position: relative;
  @media (max-width: 505px) {
    padding: 0 23px;
  }
`;
// export const textAnimation = keyframes`
//   0% {
//     opacity: .5;
//     transform: translateY(2px) scale(0.99);
//   }
//   85%, 100% {
//     opacity: 1;
//     transform: translateY(0px) scale(1);
//   }
// `;
// export const imageAnimation = keyframes`
//   0% {
//     opacity: .5;
//   }
//   85%, 100% {
//     opacity: 1;
//   }
// `;
// export const rotate = keyframes`
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// `;
