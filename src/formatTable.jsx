import React, { useState, useEffect } from "react";

export function formatTable(tableBlock, getBlocks, formatText, config) {
	const [blocks, setBlocks] = React.useState([]);

	let head, body;
	if (blocks.length > 0) {
		head = blocks[0];
		body = blocks.slice(1);
	}

	React.useEffect(() => {
		(async function () {
			let blocks = await getBlocks(tableBlock.id);
			setBlocks(blocks);
		})();
	}, []);

	return (
		blocks.length > 0 && (
			<table>
				{head && (
					<thead>
						<tr>
							{head[head.type].cells.map((row) => (
								<th>
									{row.map((cell) =>
										formatText(cell, config)
									)}
								</th>
							))}
						</tr>
					</thead>
				)}
				{body && (
					<tbody>
						{body.map((block) => {
							return (
								<tr>
									{block[block.type].cells.map((row) => (
										<td>
											{row.map((cell) =>
												formatText(cell, config)
											)}
										</td>
									))}
								</tr>
							);
						})}
					</tbody>
				)}
			</table>
		)
	);
}