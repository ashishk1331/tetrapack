import React from "react";

export const config = function () {
	return {
		blocks: {
			paragraph: (text) => <p>{text}</p>,
			heading_1: (text) => <h1>{text}</h1>,
			heading_2: (text) => <h2>{text}</h2>,
			heading_3: (text) => <h3>{text}</h3>,
			image: (text, url) => (
				<figure>
					<img src={url} alt="image found" />
					<figcaption>{text}</figcaption>
				</figure>
			),
			list_item: (text) => <li>{text}</li>,
			bulleted_list: (text) => <ul>{text}</ul>,
			numbered_list: (text) => <ol>{text}</ol>,
			table: null,
			quote: (text) => (
				<blockquote>
					<p>{text}</p>
				</blockquote>
			),
			callout: function (text, callout_image) {
				return (
					<span>
						{this.callout_image()}
						<p>{text}</p>
					</span>
				);
			},
			callout_image: () => (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 256 256"
					width="32"
					height="32"
				>
					<path d="M240,128a15.79,15.79,0,0,1-10.5,15l-63.44,23.07L143,229.5a16,16,0,0,1-30,0L89.93,166,26.5,143a16,16,0,0,1,0-30L90,89.93,113,26.5a16,16,0,0,1,30,0L166.07,90,229.5,113A15.79,15.79,0,0,1,240,128Z"></path>
				</svg>
			),
			divider: () => <hr />,
			to_do: (text, checked) => (
				<span>
					<input checked={checked} readOnly type="checkbox" />
					<p>{text}</p>
				</span>
			),
			code: (text) => (
				<pre>
					<code>{text}</code>
				</pre>
			),
		},
		annotations: {
			bold: (text) => <strong>{text}</strong>,
			italic: (text) => <i>{text}</i>,
			strikethrough: (text) => <s>{text}</s>,
			underline: (text) => <u>{text}</u>,
			code: (text) => <code>{text}</code>,
			link: (text, href) => <a href={href}>{text}</a>,
		},
		wrapper: (text) => <article>{text}</article>,
	};
};

let annotationsConfig = {
	isBold: false,
	isItalic: false,
	isStriked: false,
	isUnderline: false,
	isCode: false,
};
