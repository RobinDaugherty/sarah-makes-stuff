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
			...post.data,
			link: `/blog/${post.slug}/`,
		})),
	});
}
