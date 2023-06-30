import { Client } from "@notionhq/client";
import { promises as fs } from 'fs';
import "dotenv/config";

let pageId = process.env.NOTION_DATABASE;

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
	// let resp = await getPageData(pageId);
	// await fs.writeFile("./src/dataFiles/pageData.json", JSON.stringify(resp, null, 4))

	// resp = await getBlocks(pageId);
	let resp = await getBlocks("7815587f-5b2c-4475-85db-1f3957134df3");
	await fs.writeFile("./src/dataFiles/pageBlocks.json", JSON.stringify(resp, null, 4))
})();
