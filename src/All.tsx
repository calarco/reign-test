import { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

import { Device } from "./globalStyle";
import Row from "./Row";

const Filter = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    padding: 0 4.5rem;

    select {
        min-width: 15rem;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        border: solid 1px #2e2e2e;
        background-color: #ffffff;
        font-family: Roboto;
        font-size: 14px;
        line-height: 1.57;
        color: #343434;
    }

    @media ${Device.laptop} {
        padding: 0 7.5rem;
    }

    @media ${Device.desktop} {
        padding: 0 9.5rem;
    }
`;

const Loading = styled.div`
    grid-column-end: span 2;
    padding: 2rem 0;
    font-family: Roboto;
    font-size: 14px;
    line-height: 1.57;
    text-align: center;
    color: rgba(0, 0, 0, 0.65);
`;

type AllProps = {
    favorites: [
        {
            created_at: string;
            author: string;
            objectID: number;
            story_title: string;
            story_url: string;
        }
    ];
    handleFavorite: (post: {
        created_at: string;
        author: string;
        objectID: number;
        story_title: string;
        story_url: string;
    }) => void;
};

function All({ favorites, handleFavorite }: AllProps) {
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
    const loader = useRef<HTMLDivElement | null>(null);

    const loadPosts = useCallback(() => {
        fetch(
            `https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=${page}`
        )
            .then((response) => response.json())
            .then((json) => {
                setPosts((posts) => [
                    ...posts,
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

    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.persist();
        setQuery(event.target.value);
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

    return (
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
                        onClick={() => handleFavorite(post)}
                    />
                )
            )}
            <Loading ref={loader}>Loading...</Loading>
        </>
    );
}

export default All;
