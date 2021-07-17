import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const Device = {
    tablet: `(min-width: 768px)`,
    laptop: `(min-width: 1024px)`,
    desktop: `(min-width: 1440px)`,
};

const GlobalStyle = createGlobalStyle`
    ${normalize}

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    #root, html, body {
        height: 100vh;
    }

    html {
        font-size: 16px;
	    scroll-behavior: smooth;
    }

    pre,
    p,
    h6,
    h5,
    h4,
    h3,
    h2,
    h1,
    label {
        display: inline-block;
        margin: 0;
    }
    
    body {
        background: #fcfcfc;

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        font-feature-settings: "kern" 1;
        font-kerning: normal;
    }

    p {
        font-family: Roboto;
        font-size: 14px;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.43;
        letter-spacing: 0.25px;
        color: #6b6b6b;
    }

    b {
        font-weight: 500;
    }

    label {
        font-family: Roboto;
        font-size: 11px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #767676;
    }

    button {
        padding: 3px 39px 0 40px;
        background: #fcfcfc;
        border: solid 1px #d6d6d6;
        font-family: Roboto;
        font-size: 16px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.75;
        letter-spacing: normal;
        text-align: center;
        color: #6a6a6a;
        will-change: opacity;
        transition: 0.15s ease-in-out;
    }

    button:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

export default GlobalStyle;
