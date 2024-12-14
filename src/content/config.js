// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const postCollection = defineCollection({  
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    keywords: z.array(z.string()).optional(),
    minutesRead: z.string().optional(),
    twitterImage: z.string().optional(), 
    updatedDate: z.string().optional(), 
    excerpt: z.string().optional(), 
  }),
});


// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  'post': postCollection,
};