import rss from '@astrojs/rss';
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from '../config';
import { slug } from "../lib/utils";

const postImportResult = import.meta.glob('../content/*/*.{md,mdx}', { eager: true });
const posts = Object
				.values(postImportResult)
				.map(post => {
					const rssPost = {
						link: SITE_URL+"/"+slug(post),
						title: post.frontmatter.title,
						pubDate: post.frontmatter.pubDate,	
						content: post.frontmatter.excerpt+'...'
					}
					return rssPost;
				}).sort((a, b) => new Date(b.pubDate).valueOf() - new Date(a.pubDate).valueOf());

export const get = () => {
	return rss({
		stylesheet: './styles.xsl',
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: import.meta.env.SITE,
		items: posts
	});
}	
