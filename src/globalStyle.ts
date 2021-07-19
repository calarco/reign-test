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

        font-family: Roboto;
        font-size: 14px;
        line-height: 1.57;
        color: rgba(0, 0, 0, 0.65);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        font-feature-settings: "kern" 1;
        font-kerning: normal;
    }

    p {
        line-height: 1.43;
        letter-spacing: 0.25px;
        color: #6b6b6b;
    }

    b {
        font-weight: 500;
    }

    label {
        font-size: 11px;
        color: #767676;
    }

    select {
        min-width: 15rem;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        border: solid 1px #2e2e2e;
        background-color: #ffffff;
        color: #343434;
    }

    button {
        padding: 3px 39px 0 40px;
        background: #fcfcfc;
        border: solid 1px #d6d6d6;
        font-size: 16px;
        font-weight: 500;
        line-height: 1.75;
        text-align: center;
        color: #6a6a6a;
        will-change: opacity;
        transition: 0.15s ease-in-out;
    }

    button:hover {
        cursor: pointer;
    }
`;

export default GlobalStyle;
