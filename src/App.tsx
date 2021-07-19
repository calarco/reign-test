import { useState } from "react";
import styled, { css } from "styled-components";

import GlobalStyle, { Device } from "./globalStyle";
import Posts from "./Posts";

const Main = styled.main`
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
`;

const Header = styled.nav`
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
    padding: 2.75rem 5vw;
    margin-bottom: 1.5rem;
    box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);
    background-image: linear-gradient(to bottom, #ececec -32%, #ffffff 124%);
    text-align: center;

    h1 {
        text-align: left;
        width: 100%;
        max-width: 40rem;

        @media ${Device.laptop} {
            max-width: 72rem;
        }
    }
`;

const Switcher = styled.div`
    position: sticky;
    top: 6rem;
    z-index: 110;
    width: 100%;
    padding: 2.75rem 0;
    text-align: center;

    @media ${Device.laptop} {
        top: 0;
    }
`;

type ButtonProps = {
    active?: boolean;
};

const Button = styled.button<ButtonProps>`
    ${(props) =>
        props.active &&
        css`
            border: solid 1px #1797ff;
            color: #1797ff;
        `};

    &:first-child {
        border-radius: 2px 0 0 2px;
        border-right: none;
    }

    &:last-child {
        border-radius: 0 2px 2px 0;
    }
`;

function App() {
    const [favView, setFavView] = useState(false);

    return (
        <>
            <GlobalStyle />
            <Main>
                <Header>
                    <h1>HACKER NEWS</h1>
                </Header>
                <Switcher>
                    <Button
                        type="button"
                        active={!favView}
                        onClick={() => setFavView(false)}
                    >
                        All
                    </Button>
                    <Button
                        type="button"
                        active={favView}
                        onClick={() => setFavView(true)}
                    >
                        My faves
                    </Button>
                </Switcher>
                <Posts favView={favView} />
            </Main>
        </>
    );
}

export default App;
