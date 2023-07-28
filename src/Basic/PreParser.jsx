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
