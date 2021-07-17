import { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import GlobalStyle from "./globalStyle";
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
    padding: 2.75rem 9.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);
    background-image: linear-gradient(to bottom, #ececec -32%, #ffffff 124%);
    font-family: Baskerville;
    font-size: 28px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    color: #3b3b3b;
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
    width: 100%;
    padding: 4rem 9.5rem;
    display: grid;
    align-content: start;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
`;

function App() {
    const [page, setPage] = useState(0);
    const [favs, setFavs] = useState(false);
    const [posts, setPosts] = useState([
        {
            created_at: "",
            author: "",
            story_id: 0,
            story_title: "",
            story_url: "",
        },
        {
            created_at: "",
            author: "",
            story_id: 0,
            story_title: "",
            story_url: "",
        },
    ]);
    const [favorites, setFavorites] = useState(
        JSON.parse(
            localStorage.getItem("favorites") ||
                JSON.stringify([
                    {
                        created_at: "",
                        author: "",
                        story_id: 1,
                        story_title: "",
                        story_url: "",
                    },
                ])
        )
    );

    const loadMore = () => {
        fetch(
            `https://hn.algolia.com/api/v1/search_by_date?query=reactjs&page=${
                page + 1
            }`
        )
            .then((response) => response.json())
            .then((json) => {
                setPosts((posts) => [...posts, ...json.hits]);
                setPage((page) => page + 1);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleFavorite = (post: {
        created_at: string;
        author: string;
        story_id: number;
        story_title: string;
        story_url: string;
    }) => {
        favorites.some(
            (item: { story_id: number }) => item.story_id === post.story_id
        )
            ? setFavorites(
                  favorites.filter(
                      (item: { story_id: number }) =>
                          item.story_id !== post.story_id
                  )
              )
            : setFavorites([...favorites, post]);
    };

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        fetch(
            "https://hn.algolia.com/api/v1/search_by_date?query=reactjs&page=0"
        )
            .then((response) => response.json())
            .then((json) => {
                setPosts(json.hits);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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
                {!favs ? (
                    <Rows key={0}>
                        {posts.map(
                            (post: {
                                created_at: string;
                                author: string;
                                story_id: number;
                                story_title: string;
                                story_url: string;
                            }) => (
                                <Row
                                    key={post.story_id}
                                    data={post}
                                    favorite={
                                        favorites.some(
                                            (i: { story_id: number }) =>
                                                i.story_id === post.story_id
                                        )
                                            ? true
                                            : false
                                    }
                                    onClick={() => handleFavorite(post)}
                                />
                            )
                        )}
                        <button onClick={() => loadMore()}>more</button>
                    </Rows>
                ) : (
                    <Rows key={1}>
                        {favorites.map(
                            (post: {
                                created_at: string;
                                author: string;
                                story_id: number;
                                story_title: string;
                                story_url: string;
                            }) => (
                                <Row
                                    key={post.story_id}
                                    data={post}
                                    favorite={true}
                                    onClick={() => handleFavorite(post)}
                                />
                            )
                        )}
                    </Rows>
                )}
            </Main>
        </>
    );
}

export default App;
