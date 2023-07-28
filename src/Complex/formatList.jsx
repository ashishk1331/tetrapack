import * as React from "react";

export function formatList(listBlocks, formatText, config) {
	switch (listBlocks[0].type) {
		case "bulleted_list_item":
		case "numbered_list_item":
			let listItems = listBlocks.map((item) =>
				config.blocks.list_item(
					item[item.type].rich_text.map((richText, index) =>
						formatText(richText, config, index + "_" + item.type)
					),
					item.id
				)
			);

			let compositeId = "";
			for (let i of block.blocks) {
				compositeId += i.id;
			}

			return config.blocks[block.type](listItems, compositeId);

		default:
			return null;
	}
}
