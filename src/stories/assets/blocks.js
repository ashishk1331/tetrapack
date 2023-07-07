import { blocks } from "./pageBlocks.js";

export const wholePage = blocks

export const paragraphs = blocks.filter((i) => i.type === "paragraph");

export const headings = blocks.filter((i) => i.type === "heading_1" || i.type === "heading_2" || i.type === "heading_3" )

export const images = blocks.filter((i) => i.type === "image")

export const bulletLists = blocks.filter((i) => i.type === "bulleted_list_item")

export const numberLists = blocks.filter((i) => i.type === "numbered_list_item")

export const tables = blocks.filter((i) => i.type === "table")

export const quotes = blocks.filter((i) => i.type === "quote")

export const callouts = blocks.filter((i) => i.type === "callout")

export const dividers = blocks.filter((i) => i.type === "divider")

export const toDos = blocks.filter((i) => i.type === "to_do")

export const codes = blocks.filter((i) => i.type === "code")
