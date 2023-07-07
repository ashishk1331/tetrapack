import * as React from "react";

export function formatText(richText, config, key) {
	let { strikethrough, underline, bold, italic, code } = richText.annotations;
	let { href } = richText;
	let text = richText.plain_text;

	if (strikethrough) {
		text = config.annotations.strikethrough(text, key + "_strikethrough");
	}
	if (underline) {
		text = config.annotations.underline(text, key + "_underline");
	}
	if (italic) {
		text = config.annotations.italic(text, key + "_italic");
	}
	if (bold) {
		text = config.annotations.bold(text, key + "_bold");
	}
	if (code) {
		text = config.annotations.code(text, key + "_code");
	}
	if (href) {
		text = config.annotations.link(text, href, key + "_href");
	}
	return text;
}
