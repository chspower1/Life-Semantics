import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyled = createGlobalStyle`
${reset}
:focus {
        outline: none;
        border: none;
    }
::-webkit-scrollbar {
        display: none;
    }
    *{
    
        font-family: sebang;
    }
html{
        font-size: 16px;
        -webkit-text-size-adjust: none;
        font-family: sebang;
        font-display: fallback;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
  body{
    box-sizing: border-box;
  }
    button {
        background: none;
        padding: 0;
        border: none;
        cursor: pointer;
        &:disabled {
            cursor: default;
            fill: #f2f3f4;
        }
    }
    a{
        text-decoration: none;
    }
`;

export default GlobalStyled;
