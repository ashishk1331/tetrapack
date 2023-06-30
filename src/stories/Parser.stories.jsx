import { Client } from "@notionhq/client";
import { Parser } from "../index";
import {
    wholePage,
    paragraphs,
    headings,
    images,
    bulletLists,
    numberLists,
    tables,
    quotes,
    callouts,
    dividers,
    toDos,
    codes,
} from "./assets/blocks.js";
import { tableBlocks } from "./assets/tableData.js";

export default {
    title: "Parser Story Test",
    component: Parser,
};

export const WholePage = {
    render: () => <Parser blocks={wholePage} getBlocks={tableBlocks} />,
};

export const Paragraphs = {
    render: () => <Parser blocks={paragraphs} getBlocks={tableBlocks} />,
};

export const CustomParagraphs = {
    render: () => (
        <Parser blocks={paragraphs} getBlocks={tableBlocks}>
            {() => ({
                blocks: {
                    paragraph: (text) => (
                        <div
                            style={{
                                margin: "10px",
                            }}
                        >
                            DIE-WILL-WHEATON-DIE
                        </div>
                    ),
                },
            })}
        </Parser>
    ),
};

export const Headings = {
    render: () => <Parser blocks={headings} getBlocks={tableBlocks} />,
};

export const Images = {
    render: () => <Parser blocks={images} getBlocks={tableBlocks} />,
};

export const BulletLists = {
    render: () => <Parser blocks={bulletLists} getBlocks={tableBlocks} />,
};

export const NumberLists = {
    render: () => <Parser blocks={numberLists} getBlocks={tableBlocks} />,
};

export const Quotes = {
    render: () => <Parser blocks={quotes} getBlocks={tableBlocks} />,
};

export const Callouts = {
    render: () => <Parser blocks={callouts} getBlocks={tableBlocks} />,
};

export const Dividers = {
    render: () => <Parser blocks={dividers} getBlocks={tableBlocks} />,
};

export const ToDos = {
    render: () => <Parser blocks={toDos} getBlocks={tableBlocks} />,
};

export const Codes = {
    render: () => <Parser blocks={codes} getBlocks={tableBlocks} />,
};

export const Tables = {
    render: () => <Parser blocks={tables} getBlocks={tableBlocks} />,
};
