import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    background-color: ${(props) => (props.theme === "dark" ? "#333" : "#fff")};
    color: ${(props) => (props.theme === "dark" ? "#fff" : "#333")};
    transition: all 0.3s ease;
  }
`;
