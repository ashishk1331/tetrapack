import { formatTable } from "./formatTable.jsx";

export function complexParser(block, formatText, config) {
	switch (block.type) {
		case "table":
			return formatTable(block, formatText, config);

		default:
			return null;
	}
}
