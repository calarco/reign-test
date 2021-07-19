import { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

import { Device } from "./globalStyle";
import Row from "./Row";

const Filter = styled.div`
    width: 90vw;
    max-width: 40rem;
    padding: 0.5rem 0;

    @media ${Device.laptop} {
        grid-column-end: span 2;
        max-width: 70rem;
    }
`;

const Loading = styled.div`
    padding: 2rem 0;
    text-align: center;

    @media ${Device.laptop} {
        grid-column-end: span 2;
    }
`;

type PostsProps = {
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

function Posts({ favorites, handleFavorite }: PostsProps) {
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

export default Posts;
