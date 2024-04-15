declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]];

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

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

	export type SchemaContext = { image: ImageFunction };

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S | ((context: SchemaContext) => S);
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

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	const entryMap: {
		"10-reasons-why-you-are-not-a-great-programmer": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "10-reasons-why-you-are-not-a-great-programmer",
  data: any
} & { render(): Render[".md"] },
},
"10-ways-to-render-a-webpage": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "10-ways-to-render-a-webpage",
  data: any
} & { render(): Render[".mdx"] },
},
"a-short-intro-to-partytown": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "a-short-intro-to-partytown",
  data: any
} & { render(): Render[".mdx"] },
},
"chatgpt-for-web-developers": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "chatgpt-for-web-developers",
  data: any
} & { render(): Render[".md"] },
},
"covid-tracker": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "covid-tracker",
  data: any
} & { render(): Render[".md"] },
},
"css-units": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "css-units",
  data: any
} & { render(): Render[".md"] },
},
"cyberpunk-2077-glitch-effect": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "cyberpunk-2077-glitch-effect",
  data: any
} & { render(): Render[".mdx"] },
},
"easy-sudoku-techniques": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "easy-sudoku-techniques",
  data: any
} & { render(): Render[".mdx"] },
},
"eleventy-part-five": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "eleventy-part-five",
  data: any
} & { render(): Render[".md"] },
},
"eleventy-part-four": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "eleventy-part-four",
  data: any
} & { render(): Render[".mdx"] },
},
"eleventy-part-one": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "eleventy-part-one",
  data: any
} & { render(): Render[".md"] },
},
"eleventy-part-three": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "eleventy-part-three",
  data: any
} & { render(): Render[".md"] },
},
"eleventy-part-two": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "eleventy-part-two",
  data: any
} & { render(): Render[".md"] },
},
"feedback-kits": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "feedback-kits",
  data: any
} & { render(): Render[".md"] },
},
"five-easy-website-accessibility-tips": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "five-easy-website-accessibility-tips",
  data: any
} & { render(): Render[".md"] },
},
"fixing-long-netlify-gatsby-builds": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "fixing-long-netlify-gatsby-builds",
  data: any
} & { render(): Render[".mdx"] },
},
"functional-style-programming": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "functional-style-programming",
  data: any
} & { render(): Render[".md"] },
},
"hello-world": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "hello-world",
  data: any
} & { render(): Render[".md"] },
},
"how-i-made-this-site-with-gatsby-convertkit-and-netlify": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "how-i-made-this-site-with-gatsby-convertkit-and-netlify",
  data: any
} & { render(): Render[".md"] },
},
"how-to-automate-twitter-card-images-for-your-blog": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "how-to-automate-twitter-card-images-for-your-blog",
  data: any
} & { render(): Render[".mdx"] },
},
"how-to-contribute-to-open-source": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "how-to-contribute-to-open-source",
  data: any
} & { render(): Render[".md"] },
},
"how-to-get-100-performance-score": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "how-to-get-100-performance-score",
  data: any
} & { render(): Render[".mdx"] },
},
"how-to-handle-future-posts-in-gatsby": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "how-to-handle-future-posts-in-gatsby",
  data: any
} & { render(): Render[".mdx"] },
},
"how-to-make-a-code-editor-with-codemirror6": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "how-to-make-a-code-editor-with-codemirror6",
  data: any
} & { render(): Render[".mdx"] },
},
"how-to-make-an-npm-package": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "how-to-make-an-npm-package",
  data: any
} & { render(): Render[".mdx"] },
},
"how-to-reduce-website-https-requests-for-images": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "how-to-reduce-website-https-requests-for-images",
  data: any
} & { render(): Render[".mdx"] },
},
"html-basics-part-one": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "html-basics-part-one",
  data: any
} & { render(): Render[".md"] },
},
"javascript-part-five": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "javascript-part-five",
  data: any
} & { render(): Render[".md"] },
},
"javascript-part-four": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "javascript-part-four",
  data: any
} & { render(): Render[".md"] },
},
"javascript-part-one": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "javascript-part-one",
  data: any
} & { render(): Render[".mdx"] },
},
"javascript-part-six": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "javascript-part-six",
  data: any
} & { render(): Render[".md"] },
},
"javascript-part-three": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "javascript-part-three",
  data: any
} & { render(): Render[".md"] },
},
"javascript-part-two": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "javascript-part-two",
  data: any
} & { render(): Render[".mdx"] },
},
"make-me-a-promise": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "make-me-a-promise",
  data: any
} & { render(): Render[".md"] },
},
"make-the-code-efficient": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "make-the-code-efficient",
  data: any
} & { render(): Render[".md"] },
},
"make-your-code-testable": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "make-your-code-testable",
  data: any
} & { render(): Render[".md"] },
},
"midjourney": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "midjourney",
  data: any
} & { render(): Render[".mdx"] },
},
"migrate-to-gatsby-3": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "migrate-to-gatsby-3",
  data: any
} & { render(): Render[".md"] },
},
"object-change-detection": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "object-change-detection",
  data: any
} & { render(): Render[".md"] },
},
"on-software-design": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "on-software-design",
  data: any
} & { render(): Render[".md"] },
},
"react-playground": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "react-playground",
  data: any
} & { render(): Render[".mdx"] },
},
"react-server-components": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "react-server-components",
  data: any
} & { render(): Render[".mdx"] },
},
"server-side-google-analytics": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "server-side-google-analytics",
  data: any
} & { render(): Render[".md"] },
},
"short-introduction-to-xstate": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "short-introduction-to-xstate",
  data: any
} & { render(): Render[".mdx"] },
},
"solidjs-building-blocks": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "solidjs-building-blocks",
  data: any
} & { render(): Render[".md"] },
},
"sudoku-solver": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "sudoku-solver",
  data: any
} & { render(): Render[".md"] },
},
"switch-to-astro": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "switch-to-astro",
  data: any
} & { render(): Render[".md"] },
},
"the-future-of-code-is-no-code": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "the-future-of-code-is-no-code",
  data: any
} & { render(): Render[".mdx"] },
},
"the-link-element": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "the-link-element",
  data: any
} & { render(): Render[".md"] },
},
"the-picture-tag": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "the-picture-tag",
  data: any
} & { render(): Render[".mdx"] },
},
"the-story-of-a-rec-button": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "the-story-of-a-rec-button",
  data: any
} & { render(): Render[".mdx"] },
},
"two-styles-of-writing-code": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "two-styles-of-writing-code",
  data: any
} & { render(): Render[".md"] },
},
"using-fetch": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "using-fetch",
  data: any
} & { render(): Render[".md"] },
},
"variable-fonts": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "variable-fonts",
  data: any
} & { render(): Render[".mdx"] },
},
"web-monetization": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "web-monetization",
  data: any
} & { render(): Render[".md"] },
},
"what-is-an-application-programming-interface": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "what-is-an-application-programming-interface",
  data: any
} & { render(): Render[".md"] },
},
"what-makes-good-code-good": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "what-makes-good-code-good",
  data: any
} & { render(): Render[".md"] },
},
"why-there-is-so-much-weak-software": {
"index.md": {
  id: "index.md",
  slug: "index",
  body: string,
  collection: "why-there-is-so-much-weak-software",
  data: any
} & { render(): Render[".md"] },
},
"xtate-and-react": {
"index.mdx": {
  id: "index.mdx",
  slug: "index",
  body: string,
  collection: "xtate-and-react",
  data: any
} & { render(): Render[".mdx"] },
},

	};

	type ContentConfig = never;
}
