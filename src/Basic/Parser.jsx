import * as React from "react";
import PropTypes from "prop-types";
import { formatText } from "./formatText.jsx";
import { config } from "./config.jsx";
import { complexParser } from "../Complex/complexParser.jsx";

export function Parser(props) {
	let _config = config();

	if (typeof props.children === "function") {
		let _userConfig = props.children();

		if ("wrapper" in _userConfig) {
			if (typeof _userConfig.wrapper !== "function") {
				throw new Error("Warpper accepts 'function' as their value.");
			}

			_config.wrapper = _userConfig.wrapper;
		}

		if ("blocks" in _userConfig) {
			for (let block in _userConfig.blocks) {
				if (typeof _userConfig.blocks[block] !== "function") {
					throw new Error("Block accepts 'function' as their value.");
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

	let list = [];
	let list_types = new Set(["bulleted_list_item", "numbered_list_item"]);
	let article = [];

	for (let i = 0; i < props.blocks.length; i++) {
		let block = props.blocks[i];

		if (list_types.has(block.type)) {
			if (list.length > 0 && list[0].type !== block.type) {
				article.push(
					parse(_config, {
						type: list[0].type,
						blocks: list,
					})
				);
				list = [];
			}
			list.push(block);
			continue;
		} else if (list.length > 0) {
			article.push(
				parse(_config, {
					type: list[0].type,
					blocks: list,
				})
			);
			list = [];
		}

		article.push(parse(_config, block));
	}

	if (list.length > 0) {
		article.push(
			parse(_config, {
				type: list[0].type,
				blocks: list,
			})
		);
	}

	return _config.wrapper(article);
}

Parser.propTypes = {
	blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function parse(config, block) {
	let text = [];
	let textBasedBlocks = new Set([
		"divider",
		"image",
		"bulleted_list_item",
		"numbered_list_item",
		"table",
	]);
	let restBlocks = new Set([
		"heading_1",
		"heading_2",
		"heading_3",
		"code",
		"quote",
		"paragraph",
		"callout",
		"to_do",
	]);
	if (
		!Array.isArray(block) &&
		!textBasedBlocks.has(block.type) &&
		restBlocks.has(block.type)
	) {
		let arrayOfText = block[block.type].rich_text;
		for (let index = 0; index < arrayOfText.length; index++) {
			text.push(
				formatText(arrayOfText[index], config, index + "_" + block.type)
			);
		}
	}

	switch (block.type) {
		case "table":
			return complexParser(block, formatText, config);

		case "numbered_list_item":
		case "bulleted_list_item":
			let listItems = block.blocks.map((item) => {
				let nested_list = null;
				if (item.has_children && item.children) {
					nested_list = parse(config, {
						type: item.children[0].type,
						blocks: item.children,
					});
				}
				return config.blocks.list_item(
					[
						item[item.type].rich_text.map((richText, index) =>
							formatText(
								richText,
								config,
								index + "_" + item.type
							)
						),
						nested_list,
					],
					item.id
				);
			});

			let compositeId = "";
			for (let i of block.blocks) {
				if (compositeId.length > 25) {
					break;
				}
				compositeId += i.id;
			}

			return config.blocks[
				block.type.substring(0, block.type.lastIndexOf("_"))
			](listItems, compositeId);

		case "divider":
			return config.blocks[block.type](block.id);

		case "to_do":
			return config.blocks[block.type](
				text,
				block[block.type].checked,
				block.id
			);

		case "image":
			let url = block[block.type];
			url = url[url.type].url;
			let caption = block[block.type].caption.map((richText) =>
				formatText(richText, config)
			);
			return config.blocks[block.type](caption, url, block.id);

		case "callout":
			return config.blocks[block.type](
				text,
				config.blocks.callout_image,
				block.id
			);

		case "heading_1":
		case "heading_2":
		case "heading_3":
		case "code":
		case "quote":
		case "paragraph":
			return config.blocks[block.type](text, block.id);

		default:
			return null;
	}
}

parse.propTypes = {
	config: PropTypes.object.isRequired,
	block: PropTypes.object.isRequired,
};
