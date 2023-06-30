import React from "react";

export function formatText(richText, config) {
	let { strikethrough, underline, bold, italic, code } = richText.annotations;
	let { href } = richText;
	let text = richText.plain_text;

	if (strikethrough) {
		text = config.annotations.strikethrough(text);
	}
	if (underline) {
		text = config.annotations.underline(text);
	}
	if (italic) {
		text = config.annotations.italic(text);
	}
	if (bold) {
		text = config.annotations.bold(text);
	}
	if (code) {
		text = config.annotations.code(text);
	}
	if (href) {
		text = config.annotations.link(text, href);
	}
	return text;
}
