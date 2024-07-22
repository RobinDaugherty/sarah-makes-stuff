import rss from '@astrojs/rss';
import siteConfig from '../consts';
import { getAllPosts } from '../utils/data-utils';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
	const posts = await getAllPosts();

	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: context.site!,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishedDate,
			link: `/${post.collection}/${post.slug}/`,
		})),
	});
}
