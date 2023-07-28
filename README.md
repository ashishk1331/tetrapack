![Banner Image](/images/banner.png)

# Tetra Pack
A simple and configurable notion API parser for react projects.

## Features -
- Robust and granular Parser
- Keyed Approach
- Configurable blocks and annotations
- Loose Type Checking

## Installation -
To install the package run the following command.
```bash
npm install tetrapack
```

## Usage -
Import the Parser component in your file,
You can use alias while importing to change name of the component.
```js
import { Parser } from "tetrapack";
```
<br />
Pass the array of blocks of the page to render them,

```jsx

export default function(){
	// rest of the body

	return (
		<Parser blocks={blocks} />
	);
}
```

## Customization of Blocks -
You can pass custom components or different tags for all the blocks( that parser supports).
```jsx
	// Just the parser component
	return (
		<Parser blocks={paragraphs} getBlocks={tableBlocks}>
            {() => ({
                blocks: {
                    paragraph: (text) => (
                        <div
                            style={{
                                margin: "10px",
                            }}
                        >
                            DIE-WILL-WHEATON-DIE
                        </div>
                    ),
                },
                wrapper: (text) => (<div>{text}</div>)
            })}
        </Parser>
	);
```
+ Every block should be a function that must return a JSX component.
+ Every block gets a parsed text as a parameter which is the innerHTML text for the component.
+ There are three options available: Blocks(like headings, images and to+do), Annotations(like bold and italic) and the Wrapper(which wraps all the blocks).

### Return Object
```js
{
	blocks: {...},
	annotations: {...},
	wrapper: ...
}
```

### Wrapper
+ [x] wrapper

### Blocks
+ [x] heading_1
+ [x] heading_2
+ [x] heading_3
+ [x] paragraph
+ [x] list_item
+ [x] bulleted_list
+ [x] numbered_list
+ [x] quote
+ [x] callout_image
+ [x] callout
+ [x] divider
+ [x] to_do
+ [x] code
+ [ ] table
+ [ ] page

### Annotations
+ [x] bold
+ [x] italic
+ [x] strikethrough
+ [x] underline
+ [x] code
+ [x] link 

eg- all special blocks that need extra parameter are made like this.
`(text, href) => <a href={href}>{text}</a>`