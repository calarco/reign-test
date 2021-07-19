import { useState, useEffect, useRef, useCallback } from "react";
import styled, { css } from "styled-components";

import { Device } from "./globalStyle";
import Row from "./Row";

type Props = {
    favView?: boolean;
};

const Container = styled.section<Props>`
    position: relative;
    padding: 1.25rem 5vw;
    display: grid;
    align-content: start;
    justify-content: center;
    gap: 2rem;
    transition: 0.15s ease-in-out;

    ${(props) =>
        props.favView &&
        css`
            padding: 5.5rem 5vw;
        `};

    @media ${Device.laptop} {
        grid-template-columns: auto auto;
    }
`;

const Filter = styled.div`
    width: 90vw;
    max-width: 40rem;
    padding-bottom: 0.5rem;

    @media ${Device.laptop} {
        grid-column-end: span 2;
        max-width: 70rem;
    }
`;

const Loading = styled.div`
    @keyframes loading {
        0% {
            opacity: 0.5;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0.5;
        }
    }

    padding: 2rem 0;
    text-align: center;
    animation-name: loading;
    animation-duration: 2s;
    animation-iteration-count: infinite;

    @media ${Device.laptop} {
        grid-column-end: span 2;
    }
`;

type PostsProps = {
    favView: boolean;
};

function Posts({ favView }: PostsProps) {
    const [query, setQuery] = useState(
        localStorage.getItem("query") || "reactjs"
    );
    const [page, setPage] = useState(0);

    const [posts, setPosts] = useState([
        {
            created_at: "",
            author: "",
            objectID: 0,
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
                        objectID: 0,
                        story_title: "",
                        story_url: "",
                    },
                ])
        )
    );

    const loader = useRef<HTMLDivElement | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.persist();
        setQuery(event.target.value);
    };

    const loadPosts = useCallback(() => {
        fetch(
            `https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=${page}`
        )
            .then((response) => response.json())
            .then((json) => {
                setPosts((posts) => [
                    ...posts,
                    //remove duplicates
                    ...json.hits.filter(
                        (post: { story_title: string }, index: number) => {
                            return (
                                json.hits.findIndex(
                                    (item: { story_title: string }) =>
                                        item.story_title === post.story_title
                                ) === index
                            );
                        }
                    ),
                ]);
                setPage((page) => page + 1);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [query, page]);

    const handleObserver = useCallback(
        (entries) => {
            const target = entries[0];
            if (target.isIntersecting) {
                loadPosts();
            }
        },
        [loadPosts]
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
        localStorage.setItem("query", query);
        setPosts([
            {
                created_at: "",
                author: "",
                objectID: 0,
                story_title: "",
                story_url: "",
            },
        ]);
        setPage(0);
    }, [query]);

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 0,
        };
        loader.current &&
            new IntersectionObserver(handleObserver, option).observe(
                loader.current
            );
    }, [handleObserver]);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    return (
        <Container favView={favView}>
            {!favView ? (
                <>
                    <Filter>
                        <select value={query} onChange={handleInputChange}>
                            <option value="angular">Angular</option>
                            <option value="reactjs">Reactjs</option>
                            <option value="vuejs">Vuejs</option>
                        </select>
                    </Filter>
                    {posts.map(
                        (
                            post: {
                                created_at: string;
                                author: string;
                                objectID: number;
                                story_title: string;
                                story_url: string;
                            },
                            index
                        ) => (
                            <Row
                                key={index}
                                data={post}
                                favorite={
                                    favorites.some(
                                        (i: { objectID: number }) =>
                                            i.objectID === post.objectID
                                    )
                                        ? true
                                        : false
                                }
                                onFav={() => handleFavorite(post)}
                            />
                        )
                    )}
                    <Loading ref={loader}>Loading...</Loading>
                </>
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
                                return b.created_at.localeCompare(a.created_at);
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
                                        onFav={() => handleFavorite(post)}
                                    />
                                )
                            )
                    )}
                </>
            )}
        </Container>
    );
}

export default Posts;
