import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './src/lib/remark-reading-time.mjs';
import { remarkSocialImage } from './src/lib/remark-social-image.mjs';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  site: 'https://raresportan.com',
  markdown: {
    extendDefaultPlugins: true,
    syntaxHighlight: 'prism',
    remarkPlugins: [remarkSocialImage],
    rehypePlugins: [remarkReadingTime, rehypeSlug, [rehypeAutolinkHeadings, {behavior:'append' }]],    
  },
  integrations: [
    mdx({
      remarkPlugins: [remarkSocialImage],
      rehypePlugins: [remarkReadingTime, rehypeSlug, rehypeAutolinkHeadings, [rehypeAutolinkHeadings, {behavior:'append'}]],
    }), 
    sitemap()    
  ]  
});