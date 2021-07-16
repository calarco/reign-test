import { useState, useEffect } from "react";
import styled from "styled-components";

import GlobalStyle from "./globalStyle";

const Main = styled.div`
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
`;

const Header = styled.div`
    position: sticky;
    top: 0;
    width: 100%;
    padding: 2.75rem 9.5rem;
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
    width: 100%;
    padding: 4.25rem 0;
    text-align: center;

    button:first-child {
        border-radius: 2px 0 0 2px;
        border-right: none;
    }

    button:last-child {
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

const Row = styled.div`
    will-change: opacity;
    position: relative;
    overflow: hidden;
    border-radius: 6px;
    border: solid 1px #979797;
    background-color: #ffffff;
    transition: 0.15s ease-in-out;
`;

const Box = styled.a`
    text-decoration: none;
    padding: 1rem 1.5rem;
    display: grid;
    gap: 0.5rem;

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }

    label {
        pointer-events: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

const Fav = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 1rem 1.5rem;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }

    img {
        height: 1.5rem;
    }
`;

function App() {
    const [posts, setPosts] = useState({
        hits: [
            {
                created_at: "2021-07-16T19:22:11.000Z",
                title: null,
                url: null,
                author: "WhompingWindows",
                points: null,
                story_text: null,
                comment_text:
                    "Consider the time period and the historical context. It\u0026#x27;s modern times, Cold War is occurring, and WW1 and WW2 left scars across Western Europe and caused major changes in the art world, including being a boon to abstraction and fragmenting styles into many eclectic directions.\u003cp\u003eChemistry has DRASTICALLY altered painting from the Renaissance to the World War era. New pigments have been constantly highlighted and displayed in artwork. Finally, an insanely blue blue has been invented, bluer than any other blue paint in the past.\u003cp\u003eThe artist highlighted above attempts to showcase the new technology in its purest form. Though, despite this strive for purity of blue, the application is inherently uneven. If you look into the painted canvas up close, you will see imperfections and patterns in \u0026quot;just a wall\u0026quot;. It\u0026#x27;s also a statement, it may cause reactions and cause viewers to question the boundary between art and not-art.\u003cp\u003eIt\u0026#x27;s not my cup of tea compared to masterworks of Van Gogh or Homer or any of the legendary painters, but art goes through many phases and is used to express many different ideas. What I do think is bonkers is that modern artists (who are well-connected) may be paid millions of dollars for these works, which to me don\u0026#x27;t showcase skill and talent, but which reward creative ideation and concepts.",
                num_comments: null,
                story_id: 27858630,
                story_title: "Why we're blind to the color blue",
                story_url: "https://calebkruse.com/10-projects/seeing-blue/",
                parent_id: 27860101,
                created_at_i: 1626463331,
                _tags: ["comment", "author_WhompingWindows", "story_27858630"],
                objectID: "27860157",
                _highlightResult: {
                    author: {
                        value: "WhompingWindows",
                        matchLevel: "none",
                        matchedWords: [],
                    },
                    comment_text: {
                        value: "Consider the time period and the historical context. It's modern times, Cold War is occurring, and WW1 and WW2 left scars across Western Europe and caused major changes in the art world, including being a boon to abstraction and fragmenting styles into many eclectic directions.\u003cp\u003eChemistry has DRASTICALLY altered painting from the Renaissance to the World War era. New pigments have been constantly highlighted and displayed in artwork. Finally, an insanely blue blue has been invented, bluer than any other blue paint in the past.\u003cp\u003eThe artist highlighted above attempts to showcase the new technology in its purest form. Though, despite this strive for purity of blue, the application is inherently uneven. If you look into the painted canvas up close, you will see imperfections and patterns in \u0026quot;just a wall\u0026quot;. It's also a statement, it may cause \u003cem\u003ereactio\u003c/em\u003ens and cause viewers to question the boundary between art and not-art.\u003cp\u003eIt's not my cup of tea compared to masterworks of Van Gogh or Homer or any of the legendary painters, but art goes through many phases and is used to express many different ideas. What I do think is bonkers is that modern artists (who are well-connected) may be paid millions of dollars for these works, which to me don't showcase skill and talent, but which reward creative ideation and concepts.",
                        matchLevel: "full",
                        fullyHighlighted: false,
                        matchedWords: ["reactjs"],
                    },
                    story_title: {
                        value: "Why we're blind to the color blue",
                        matchLevel: "none",
                        matchedWords: [],
                    },
                    story_url: {
                        value: "https://calebkruse.com/10-projects/seeing-blue/",
                        matchLevel: "none",
                        matchedWords: [],
                    },
                },
            },
        ],
        nbHits: 5055,
        page: 0,
        nbPages: 50,
        hitsPerPage: 20,
        exhaustiveNbHits: true,
        query: "reactjs",
        params: "advancedSyntax=true\u0026analytics=true\u0026analyticsTags=backend\u0026page=0\u0026query=reactjs",
        processingTimeMS: 8,
    });
    const useStateWithLocalStorage = (localStorageKey) => {
        const [value, setValue] = useState(
            localStorage.getItem(localStorageKey) || ""
        );

        useEffect(() => {
            localStorage.setItem(localStorageKey, JSON.stringify(value));
        }, [value]);

        return [value, setValue];
    };
    const [favorites, setFavorites] = useStateWithLocalStorage([
        {
            created_at: "2021-07-16T19:22:11.000Z",
            author: "WhompingWindows",
            story_id: 27858630,
            story_title: "Why we're blind to the color blue",
            story_url: "https://calebkruse.com/10-projects/seeing-blue/",
        },
    ]);

    const units: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
        { unit: "year", ms: 31536000000 },
        { unit: "month", ms: 2628000000 },
        { unit: "day", ms: 86400000 },
        { unit: "hour", ms: 3600000 },
        { unit: "minute", ms: 60000 },
        { unit: "second", ms: 1000 },
    ];
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    function relativeTimeFromElapsed(elapsed: number): string {
        for (const { unit, ms } of units) {
            if (Math.abs(elapsed) >= ms || unit === "second") {
                return rtf.format(Math.round(elapsed / ms), unit);
            }
        }
        return "";
    }

    function relativeTimeFromDates(
        relative: Date | null,
        pivot: Date = new Date()
    ): string {
        if (!relative) return "";
        const elapsed = relative.getTime() - pivot.getTime();
        return relativeTimeFromElapsed(elapsed);
    }

    useEffect(() => {
        fetch(
            "https://hn.algolia.com/api/v1/search_by_date?query=reactjs&page=0"
        )
            .then((response) => response.json())
            .then((json) => {
                setPosts(json);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        fetch(
            "https://hn.algolia.com/api/v1/search_by_date?query=reactjs&page=0"
        )
            .then((response) => response.json())
            .then((json) => {
                setPosts(json);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [favorites]);

    return (
        <>
            <GlobalStyle />
            <Main>
                <Header>HACKER NEWS</Header>
                <Views>
                    <button>All</button>
                    <button>My faves</button>
                </Views>
                <Rows>
                    {posts.hits.map((post) => (
                        <>
                            {post.story_id &&
                                post.created_at &&
                                post.author &&
                                post.story_title &&
                                post.story_url && (
                                    <Row key={post.story_id}>
                                        <Box href={post.story_url}>
                                            <label>
                                                <img
                                                    src="img/iconmonstr-time-2.svg"
                                                    alt=""
                                                />
                                                {relativeTimeFromDates(
                                                    new Date(post.created_at)
                                                )}{" "}
                                                by {post.author}
                                            </label>
                                            <p>
                                                <b>{post.story_title}</b>
                                            </p>
                                        </Box>
                                        <Fav
                                            onClick={() =>
                                                setFavorites([
                                                    ...favorites,
                                                    {
                                                        created_at:
                                                            post.created_at,
                                                        author: post.author,
                                                        story_id: post.story_id,
                                                        story_title:
                                                            post.story_title,
                                                        story_url:
                                                            post.story_url,
                                                    },
                                                ])
                                            }
                                        >
                                            <img
                                                src="img/iconmonstr-favorite-2.svg"
                                                alt="favorite"
                                            />
                                        </Fav>
                                    </Row>
                                )}
                        </>
                    ))}
                    {favorites.map((post) => (
                        <>
                            {post.story_id &&
                                post.created_at &&
                                post.author &&
                                post.story_title && (
                                    <Row key={post.story_id}>
                                        <Box>
                                            <label>
                                                <img
                                                    src="img/iconmonstr-time-2.svg"
                                                    alt=""
                                                />
                                                {relativeTimeFromDates(
                                                    new Date(post.created_at)
                                                )}{" "}
                                                by {post.author}
                                            </label>
                                            <p>
                                                <b>{post.story_title}</b>
                                            </p>
                                        </Box>
                                        <Fav
                                            onClick={() =>
                                                setFavorites([
                                                    {
                                                        created_at:
                                                            "2021-07-16T19:22:11.000Z",
                                                        author: "WhompingWindows",
                                                        story_id: 27858630,
                                                        story_title: "aoeu",
                                                        story_url:
                                                            "https://calebkruse.com/10-projects/seeing-blue/",
                                                    },
                                                ])
                                            }
                                        >
                                            <img
                                                src="img/iconmonstr-favorite-2.svg"
                                                alt="favorite"
                                            />
                                        </Fav>
                                    </Row>
                                )}
                        </>
                    ))}
                </Rows>
            </Main>
        </>
    );
}

export default App;
