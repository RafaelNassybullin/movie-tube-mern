import styled, { createGlobalStyle, GlobalStyleComponent } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --plyr-color-main: crimson;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #__next{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  *::-webkit-scrollbar {
    width: 5px;
  }
  
  *::-webkit-scrollbar-thumb {
    background-color: crimson;

    &:hover {
      background-color: #FFCC8F;
    }
  }

  body {
    font-family: sans-serif;
    background: #fff;
    color: black;
    padding-top: 80px;
  }

  #player {
    width: 100%;
    height: 100vh;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  #nprogress .bar {
    background: linear-gradient(to right, orange , yellow, green, cyan, blue, violet) !important;
    height:6px;
  }

  #nprogress .spinner-icon {
    width: 30px;
    height: 30px;
    border-width: 5px;
    border-top-color: transparent;
    border-left-color: transparent;
    border-right-color: hotpink;
    border-bottom-color: hotpink;
  }
`;

export const Container = styled.div`
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;
  padding: 0 47px;
  position: relative;
  @media (max-width: 530px) {
    max-width: unset;
    width: 100%;
    padding: 0;
  }
`;

export const CardWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 20px;
  margin-bottom: 80px;

  @media (min-width: 650px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 920px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

`;
export const Footer = styled.footer`
width: 100%;
    margin-top: auto;
    height: 250px;
    background: crimson;
`
export const Button = styled.p`
  position: absolute;
  outline: none;
  font-family: sans-serif;
  background: white;
  color: black;
  border-radius: 5px;
  border: 1px solid black;
  padding: 10px 25px;
  bottom: -91px;
  left: 50%;
  margin: 30px 0;
  transform: translateX(-50%);
  cursor: pointer;
  &:hover {
    background: white;
    color: gray;
    border: 1px solid gray;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 18;
  background: #00000034;
`;

export const Elipsis = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MainTitle = styled.h1`
  margin-bottom: 20px;
  text-transform: capitalize;
  @media (max-width: 540px) {
    padding: 0 23px;
    font-size: 21px;
  }
`;
