import React from "react";
import { formatText } from "./formatText.jsx";
// import { formatTable } from "./formatTable.jsx";
import { config } from "./config.jsx";

export function Parser(props) {
	let _config = config();

	if (typeof props.children === "function") {
		let _userConfig = props.children();

		if ("wrapper" in _userConfig) {
			if (typeof _userConfig.wrapper !== "function") {
				throw new Error(
					"Warpper accepts 'function' as their value."
				);
			}

			_config.wrapper = _userConfig.wrapper;
		}

		if ("blocks" in _userConfig) {
			for (let block in _userConfig.blocks) {
				if (typeof _userConfig.blocks[block] !== "function") {
					throw new Error(
						"Block accepts 'function' as their value."
					);
				}
				if (block in _config.blocks) {
					_config.blocks[block] = _userConfig.blocks[block];
				} else {
					throw new Error(
						`The ${block} property specified is not accepted for blocks.`
					);
				}
			}
		}

		if ("annotations" in _userConfig) {
			for (let annotation in _userConfig.annotations) {
				if (typeof _userConfig.annotations[annotation] !== "function") {
					throw new Error(
						"Annotations accept 'functions' as there value."
					);
				}
				if (annotation in _config.annotations) {
					_config.annotations[annotation] =
						_userConfig.annotations[annotation];
				} else {
					throw new Error(
						`The ${annotation} property specified is not accepted for annotations.`
					);
				}
			}
		}
	}

	let list = {
		type: null,
		blocks: [],
	};
	let article = [];

	for (let i = 0; i < props.blocks.length; i++) {
		let block = props.blocks[i];

		if (
			block.type === "bulleted_list_item" ||
			block.type === "numbered_list_item"
		) {
			if (list.type && list.type + "_item" !== block.type) {
				article.push(parse(_config, list, props.getBlocks));
				list = {
					type: null,
					blocks: [],
				};
			}
			let type = block.type;
			type = type.substring(0, type.lastIndexOf("_"));
			list.type = type;
			list.blocks.push(block);
		} else {
			if (list.type) {
				article.push(parse(_config, list, props.getBlocks));
				list = {
					type: null,
					blocks: [],
				};
			}
			article.push(parse(_config, block, props.getBlocks));
		}
	}

	if (list.type) {
		article.push(parse(_config, list, props.getBlocks));
		list = {
			type: null,
			blocks: [],
		};
	}

	return _config.wrapper(article);
}

function parse(config, block, getBlocks) {
	let text = null;
	let textBasedBlocks = new Set([
		"divider",
		"table",
		"image",
		"bulleted_list",
		"numbered_list",
	]);
	if (!Array.isArray(block) && !textBasedBlocks.has(block.type)) {
		text = block[block.type].rich_text.map((richText) =>
			formatText(richText, config)
		);
	}

	switch (block.type) {
		case "numbered_list":
		case "bulleted_list":
			let listItems = block.blocks.map((item) =>
				config.blocks.list_item(
					item[item.type].rich_text.map((richText) =>
						formatText(richText, config)
					)
				)
			);
			return config.blocks[block.type](listItems);

		// case "table":
		// 	return formatTable(block, getBlocks, formatText, config);

		case "divider":
			return <hr />;

		case "to_do":
			return config.blocks[block.type](text, block[block.type].checked);

		case "image":
			let url = block[block.type];
			url = url[url.type].url;
			let caption = block[block.type].caption.map((richText) =>
				formatText(richText, config)
			);
			return config.blocks[block.type](caption, url);

		case "callout":
			return config.blocks[block.type](text, config.blocks.callout_image);

		case "heading_1":
		case "heading_2":
		case "heading_3":
		case "code":
		case "quote":
		case "paragraph":
			return config.blocks[block.type](text);

		default:
			console.log(block);
			return <p>{block.type} block not yet configured.</p>;
	}
}
