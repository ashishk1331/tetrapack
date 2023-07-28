import * as React from "react";

export const config = function () {
	return {
		blocks: {
			paragraph: (text, key) => <p key={key}>{text}</p>,
			heading_1: (text, key) => <h1 key={key}>{text}</h1>,
			heading_2: (text, key) => <h2 key={key}>{text}</h2>,
			heading_3: (text, key) => <h3 key={key}>{text}</h3>,
			image: (text, url, key) => (
				<figure key={key}>
					<img src={url} alt="image found" />
					<figcaption>{text}</figcaption>
				</figure>
			),
			list_item: (text, key) => <li key={key}>{text}</li>,
			bulleted_list: (text, key) => <ul key={key}>{text}</ul>,
			numbered_list: (text, key) => <ol key={key}>{text}</ol>,
			quote: (text, key) => (
				<blockquote key={key}>
					<p>{text}</p>
				</blockquote>
			),
			callout: function (text, callout_image, key) {
				return (
					<span key={key}>
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
			divider: (key) => <hr key={key} />,
			to_do: (text, checked, key) => (
				<span key={key}>
					<input checked={checked} readOnly type="checkbox" />
					<p>{text}</p>
				</span>
			),
			code: (text, key) => (
				<pre key={key}>
					<code>{text}</code>
				</pre>
			),
			table: (text, key) => <table key={key}>{text}</table>,
			table_cell: (text, key) => <td key={key}>{text}</td>,
			table_row: (text, key) => <tr key={key}>{text}</tr>,
			table_header_cell: (text, key) => <th key={key}>{text}</th>,
			table_head: (text, key) => <thead key={key}>{text}</thead>,
			table_body: (text, key) => <tbody key={key}>{text}</tbody>,
			raw_table_row: null,
			raw_table_wrapper: null,
		},
		annotations: {
			bold: (text, key) => <strong key={key}>{text}</strong>,
			italic: (text, key) => <i key={key}>{text}</i>,
			strikethrough: (text, key) => <s key={key}>{text}</s>,
			underline: (text, key) => <u key={key}>{text}</u>,
			code: (text, key) => <code key={key}>{text}</code>,
			link: (text, href, key) => (
				<a href={href} key={key}>
					{text}
				</a>
			),
			mark: (text, style, key) => (
				<mark style={style} key={key}>
					{text}
				</mark>
			),
			color: {
				default: "",
				blue: "blue",
				brown: "brown",
				gray: "gray",
				green: "green",
				orange: "orange",
				pink: "pink",
				purple: "purple",
				red: "red",
				yellow: "yellow",
			},
			background: {
				default: "",
				blue: "blue",
				brown: "brown",
				gray: "gray",
				green: "green",
				orange: "orange",
				pink: "pink",
				purple: "purple",
				red: "red",
				yellow: "yellow",
			},
		},
		wrapper: (text) => text,
	};
};