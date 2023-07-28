import { Client } from "@notionhq/client";
import { promises as fs } from 'fs';
import "dotenv/config";

let pageId = process.env.NOTION_DATABASE;

export async function usePreParser(blocks, getBlocks) {
	let res = [];
	for (let block of blocks) {
		if (block.has_children) {
			block.children = await getBlocks(block.id);
			usePreParser(block.children, getBlocks);
		}
		res.push(block);
	}
	return res;
}

async function getPageData(pageId) {
	const notion = new Client({
		auth: process.env.NOTION_TOKEN,
	});

	let map = {};

	const data = await notion.pages.retrieve({ page_id: pageId });

	map["id"] = data.id;
	map["created_time"] = data.created_time;
	map["title"] = data.properties.Name.title[0].plain_text;
	map["summary"] = data.properties.summary.rich_text[0].plain_text;
	map["tags"] = data.properties.Tags.multi_select.map((tag) => ({
		name: tag.name,
		color: tag.color,
	}));

	return map;
}

async function getBlocks(pageId) {
	const notion = new Client({
		auth: process.env.NOTION_TOKEN,
	});

	let data = await notion.blocks.children.list({
		block_id: pageId,
		page_size: 50,
	});

	return data.results;
}

(async function () {
	let blocks = await getBlocks(process.env.NOTION_DATABASE);
	blocks = await usePreParser(blocks, getBlocks);
	await fs.writeFile("./src/dataFiles/pageBlocks.json", JSON.stringify(blocks, null, 4))
})();
