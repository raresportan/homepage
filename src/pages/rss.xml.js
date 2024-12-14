import { getCollection } from 'astro:content';
import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from '../config';
import { slug } from "../lib/utils";


// const posts = await Promise.all(sortedPosts.map(async p => {
// 	const { remarkPluginFrontmatter } = await render(p);
// 	const { minutesRead, excerpt } = remarkPluginFrontmatter;
// 	return ({
// 		...p,
// 		data: {
// 			...p.data,
// 			minutesRead,
// 			excerpt
// 		}
// 	})
// }));

export async function GET(context) {
	const sortedPosts = (await getCollection('post')).sort(
		(a, b) =>
			new Date(b.data.pubDate).valueOf() -
			new Date(a.data.pubDate).valueOf()
	)
	
  return rss({
	stylesheet: './styles.xsl',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: sortedPosts.map((post) => ({
		title: post.data.title,
		pubDate: post.data.pubDate,
		description: post.data.description,
		link: SITE_URL+"/"+slug(post),
	  })),
    customData: `<language>en-us</language>`,
  });
}