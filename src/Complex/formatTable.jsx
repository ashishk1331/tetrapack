import * as React from "react";

export function formatTable(tableBlock, formatText, config) {
	if (config.blocks.raw_table_row) {
		let tableRows = [];
		tableRows = tableBlock.children.map(function (
			{ table_row: { cells } },
			index
		) {
			let columns = cells.map((cell) => cell[0].plain_text);
			return config.blocks.raw_table_row(
				columns,
				tableBlock.id + "_" + index
			);
		});
		if (config.blocks.raw_table_wrapper) {
			return config.blocks.raw_table_wrapper(tableRows, tableBlock.id);
		}
		return tableRows;
	}

	let tableHeaderRow = null;
	if (tableBlock.table.has_column_header) {
		let head = tableBlock.children[0];
		tableHeaderRow = config.blocks["table_head"](
			config.blocks["table_row"](
				head[head.type].cells.map((row, index) =>
					config.blocks["table_header_cell"](
						row.map((cell) => formatText(cell, config, cell.id)),
						index + ""
					)
				),
				head.id
			),
			tableBlock.id + "_table_head"
		);
	}

	let restTableRows = null;
	if (tableBlock.children[1]) {
		let body = tableBlock.children.slice(1);
		restTableRows = config.blocks["table_body"](
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
			tableBlock.id + "_table_body"
		);
	}

	return config.blocks["table"](
		[tableHeaderRow, restTableRows],
		tableBlock.id
	);
}
