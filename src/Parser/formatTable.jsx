import React, { useState, useEffect } from "react";

export function formatTable(tableBlock, getBlocks, formatText, config, key) {
	const [blocks, setBlocks] = useState([]);

	let head, body;
	if (blocks.length > 0) {
		head = blocks[0];
		body = blocks.slice(1);
	}

	useEffect(() => {
		getBlocks(tableBlock.id).then(function (b) {
			setBlocks(b)
		});
	}, []);

	return (
		blocks.length > 0 &&
		config.blocks["table"](
			[
				head &&
					config.blocks["table_head"](
						config.blocks["table_row"](
							head[head.type].cells.map((row, index) =>
								config.blocks["table_header_cell"](
									row.map((cell) =>
										formatText(cell, config, cell.id)
									),
									index + ""
								)
							),
							head.id
						),
						key + "_table_head"
					),
				body &&
					config.blocks["table_body"](
						body.map((block) =>
							config.blocks["table_row"](
								block[block.type].cells.map((row, index) =>
									config.blocks["table_cell"](
										row.map((cell) =>
											formatText(cell, config, cell.id)
										),
										index + ""
									)
								),
								block.id
							)
						),
						key + "_table_body"
					),
			],
			key
		)
	);
}
