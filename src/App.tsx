import { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import GlobalStyle, { Device } from "./globalStyle";
import All from "./All";
import Row from "./Row";

const Main = styled.div`
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
`;

const Header = styled.div`
    position: sticky;
    top: 0;
    z-index: 100;
    width: 100%;
    padding: 2.75rem 4.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);
    background-image: linear-gradient(to bottom, #ececec -32%, #ffffff 124%);
    font-family: Baskerville;
    font-size: 28px;
    line-height: 1;
    color: #3b3b3b;

    @media ${Device.laptop} {
        padding: 2.75rem 7.5rem;
    }

    @media ${Device.desktop} {
        padding: 2.75rem 9.5rem;
    }
`;

const Views = styled.div`
    position: sticky;
    top: 0;
    z-index: 110;
    width: 100%;
    padding: 2.75rem 0;
    text-align: center;
`;

type Props = {
    active?: boolean;
};

const Button = styled.button<Props>`
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

const Rows = styled.div`
    position: relative;
    width: 100%;
    padding: 4.25rem 4.5rem;
    display: grid;
    align-content: start;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media ${Device.laptop} {
        grid-template-columns: 1fr 1fr;
        padding: 4.25rem 7.5rem;
    }

    @media ${Device.desktop} {
        padding: 4.25rem 9.5rem;
    }
`;

function App() {
    const [favs, setFavs] = useState(false);
    const [favorites, setFavorites] = useState(
        JSON.parse(
            localStorage.getItem("favorites") ||
                JSON.stringify([
                    {
                        created_at: "",
                        author: "",
                        objectID: 1,
                        story_title: "",
                        story_url: "",
                    },
                ])
        )
    );

    const handleFavorite = (post: {
        created_at: string;
        author: string;
        objectID: number;
        story_title: string;
        story_url: string;
    }) => {
        favorites.some(
            (item: { objectID: number }) => item.objectID === post.objectID
        )
            ? setFavorites(
                  favorites.filter(
                      (item: { objectID: number }) =>
                          item.objectID !== post.objectID
                  )
              )
            : setFavorites([...favorites, post]);
    };

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    return (
        <>
            <GlobalStyle />
            <Main>
                <Header>HACKER NEWS</Header>
                <Views>
                    <Button active={!favs} onClick={() => setFavs(false)}>
                        All
                    </Button>
                    <Button active={favs} onClick={() => setFavs(true)}>
                        My faves
                    </Button>
                </Views>
                <Rows key={0}>
                    {!favs ? (
                        <All
                            favorites={favorites}
                            handleFavorite={handleFavorite}
                        />
                    ) : (
                        favorites.map(
                            (post: {
                                created_at: string;
                                author: string;
                                objectID: number;
                                story_title: string;
                                story_url: string;
                            }) => (
                                <Row
                                    key={post.objectID}
                                    data={post}
                                    favorite={true}
                                    onClick={() => handleFavorite(post)}
                                />
                            )
                        )
                    )}
                </Rows>
            </Main>
        </>
    );
}

export default App;
