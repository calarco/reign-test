import { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import GlobalStyle, { Device } from "./globalStyle";
import Posts from "./Posts";
import Row from "./Row";

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
        font-family: Baskerville;
        font-size: 28px;
        font-weight: normal;
        line-height: 1;
        color: #3b3b3b;

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

const Rows = styled.section`
    position: relative;
    padding: 1.25rem 5vw;
    display: grid;
    align-content: start;
    justify-content: center;
    gap: 2rem;

    @media ${Device.laptop} {
        grid-template-columns: auto auto;
    }
`;

function App() {
    const [favView, setFavView] = useState(false);
    const [favorites, setFavorites] = useState(
        JSON.parse(
            localStorage.getItem("favorites") ||
                JSON.stringify([
                    {
                        created_at: "",
                        author: "",
                        objectID: 0,
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
                <Rows>
                    {!favView ? (
                        <Posts
                            favorites={favorites}
                            handleFavorite={handleFavorite}
                        />
                    ) : (
                        <>
                            {!favorites[0] ? (
                                <div>No faves yet.</div>
                            ) : (
                                favorites
                                    .sort(function (
                                        a: {
                                            created_at: string;
                                        },
                                        b: {
                                            created_at: string;
                                        }
                                    ) {
                                        return b.created_at.localeCompare(
                                            a.created_at
                                        );
                                    })
                                    .map(
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
                                                onClick={() =>
                                                    handleFavorite(post)
                                                }
                                            />
                                        )
                                    )
                            )}
                        </>
                    )}
                </Rows>
            </Main>
        </>
    );
}

export default App;
