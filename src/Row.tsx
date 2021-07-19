import { ForwardedRef } from "react";
import styled from "styled-components";

import { Device } from "./globalStyle";

const Container = styled.article`
    overflow: hidden;
    min-height: 6.5rem;
    max-width: 40rem;
    border-radius: 6px;
    border: solid 1px #979797;
    background-color: #ffffff;
    text-align: left;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr auto;
    transition: 0.15s ease-in-out;
    will-change: opacity;

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }

    @media ${Device.laptop} {
        max-width: 35rem;
    }
`;

const Box = styled.a`
    text-decoration: none;
    padding: 1rem 1.5rem;
    display: grid;
    gap: 0.5rem;

    label {
        pointer-events: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

const Fav = styled.div`
    height: 100%;
    padding: 1rem 1.5rem;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;

    img {
        height: 1.5rem;
        transition: 0.15s ease-in-out;
    }

    &:hover {
        cursor: pointer;

        img {
            transform: scale(1.1);
        }
    }
`;

type RowProps = {
    ref?: ForwardedRef<HTMLDivElement> | null;
    data: {
        created_at: string;
        author: string;
        objectID: number;
        story_title: string;
        story_url: string;
    };
    favorite: boolean;
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

function Row({ ref, data, favorite, onClick }: RowProps) {
    const units: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
        { unit: "year", ms: 31536000000 },
        { unit: "month", ms: 2628000000 },
        { unit: "day", ms: 86400000 },
        { unit: "hour", ms: 3600000 },
        { unit: "minute", ms: 60000 },
        { unit: "second", ms: 1000 },
    ];

    function relativeTimeFromElapsed(elapsed: number): string {
        for (const { unit, ms } of units) {
            if (Math.abs(elapsed) >= ms || unit === "second") {
                return new Intl.RelativeTimeFormat("en", {
                    numeric: "auto",
                }).format(Math.round(elapsed / ms), unit);
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

    return (
        <>
            {data.created_at &&
                data.author &&
                data.story_title &&
                data.story_url && (
                    <Container ref={ref}>
                        <Box href={data.story_url} target="_blank">
                            <label>
                                <img src="img/iconmonstr-time-2.svg" alt="" />
                                {relativeTimeFromDates(
                                    new Date(data.created_at)
                                )}{" "}
                                by {data.author}
                            </label>
                            <p>
                                <b>{data.story_title}</b>
                            </p>
                        </Box>
                        <Fav onClick={onClick}>
                            <img
                                src={
                                    favorite
                                        ? "img/iconmonstr-favorite-3.svg"
                                        : "img/iconmonstr-favorite-2.svg"
                                }
                                alt="favorite"
                            />
                        </Fav>
                    </Container>
                )}
        </>
    );
}

export default Row;
