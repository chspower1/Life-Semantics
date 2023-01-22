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
html{
        font-size: 16px;
        -webkit-text-size-adjust: none;
        font-family: sebang;
        font-weight:400;
        font-display: fallback;
        -ms-overflow-style: none;
        scrollbar-width: none;
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
