declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"10-reasons-why-you-are-not-a-great-programmer": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "10-reasons-why-you-are-not-a-great-programmer",
  data: any
},
},
"10-ways-to-render-a-webpage": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "10-ways-to-render-a-webpage",
  data: any
},
},
"a-short-intro-to-partytown": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "a-short-intro-to-partytown",
  data: any
},
},
"chatgpt-for-web-developers": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "chatgpt-for-web-developers",
  data: any
},
},
"covid-tracker": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "covid-tracker",
  data: any
},
},
"css-units": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "css-units",
  data: any
},
},
"cyberpunk-2077-glitch-effect": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "cyberpunk-2077-glitch-effect",
  data: any
},
},
"easy-sudoku-techniques": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "easy-sudoku-techniques",
  data: any
},
},
"eleventy-part-five": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "eleventy-part-five",
  data: any
},
},
"eleventy-part-four": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "eleventy-part-four",
  data: any
},
},
"eleventy-part-one": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "eleventy-part-one",
  data: any
},
},
"eleventy-part-three": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "eleventy-part-three",
  data: any
},
},
"eleventy-part-two": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "eleventy-part-two",
  data: any
},
},
"feedback-kits": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "feedback-kits",
  data: any
},
},
"five-easy-website-accessibility-tips": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "five-easy-website-accessibility-tips",
  data: any
},
},
"fixing-long-netlify-gatsby-builds": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "fixing-long-netlify-gatsby-builds",
  data: any
},
},
"functional-style-programming": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "functional-style-programming",
  data: any
},
},
"hello-world": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "hello-world",
  data: any
},
},
"how-i-made-this-site-with-gatsby-convertkit-and-netlify": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "how-i-made-this-site-with-gatsby-convertkit-and-netlify",
  data: any
},
},
"how-to-automate-twitter-card-images-for-your-blog": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "how-to-automate-twitter-card-images-for-your-blog",
  data: any
},
},
"how-to-contribute-to-open-source": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "how-to-contribute-to-open-source",
  data: any
},
},
"how-to-get-100-performance-score": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "how-to-get-100-performance-score",
  data: any
},
},
"how-to-handle-future-posts-in-gatsby": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "how-to-handle-future-posts-in-gatsby",
  data: any
},
},
"how-to-make-a-code-editor-with-codemirror6": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "how-to-make-a-code-editor-with-codemirror6",
  data: any
},
},
"how-to-make-an-npm-package": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "how-to-make-an-npm-package",
  data: any
},
},
"how-to-reduce-website-https-requests-for-images": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "how-to-reduce-website-https-requests-for-images",
  data: any
},
},
"html-basics-part-one": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "html-basics-part-one",
  data: any
},
},
"javascript-part-five": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "javascript-part-five",
  data: any
},
},
"javascript-part-four": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "javascript-part-four",
  data: any
},
},
"javascript-part-one": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "javascript-part-one",
  data: any
},
},
"javascript-part-six": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "javascript-part-six",
  data: any
},
},
"javascript-part-three": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "javascript-part-three",
  data: any
},
},
"javascript-part-two": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "javascript-part-two",
  data: any
},
},
"make-me-a-promise": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "make-me-a-promise",
  data: any
},
},
"make-the-code-efficient": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "make-the-code-efficient",
  data: any
},
},
"make-your-code-testable": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "make-your-code-testable",
  data: any
},
},
"migrate-to-gatsby-3": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "migrate-to-gatsby-3",
  data: any
},
},
"object-change-detection": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "object-change-detection",
  data: any
},
},
"on-software-design": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "on-software-design",
  data: any
},
},
"react-playground": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "react-playground",
  data: any
},
},
"react-server-components": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "react-server-components",
  data: any
},
},
"server-side-google-analytics": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "server-side-google-analytics",
  data: any
},
},
"short-introduction-to-xstate": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "short-introduction-to-xstate",
  data: any
},
},
"solidjs-building-blocks": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "solidjs-building-blocks",
  data: any
},
},
"sudoku-solver": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "sudoku-solver",
  data: any
},
},
"switch-to-astro": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "switch-to-astro",
  data: any
},
},
"the-future-of-code-is-no-code": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "the-future-of-code-is-no-code",
  data: any
},
},
"the-link-element": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "the-link-element",
  data: any
},
},
"the-picture-tag": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "the-picture-tag",
  data: any
},
},
"the-story-of-a-rec-button": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "the-story-of-a-rec-button",
  data: any
},
},
"two-styles-of-writing-code": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "two-styles-of-writing-code",
  data: any
},
},
"using-fetch": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "using-fetch",
  data: any
},
},
"web-monetization": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "web-monetization",
  data: any
},
},
"what-is-an-application-programming-interface": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "what-is-an-application-programming-interface",
  data: any
},
},
"what-makes-good-code-good": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "what-makes-good-code-good",
  data: any
},
},
"why-there-is-so-much-weak-software": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "why-there-is-so-much-weak-software",
  data: any
},
},
"xtate-and-react": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "xtate-and-react",
  data: any
},
},

	};

	type ContentConfig = never;
}
