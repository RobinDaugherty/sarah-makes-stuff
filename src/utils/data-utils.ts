import { getCollection } from 'astro:content';
import { type CollectionEntry } from 'astro:content';
import { slugify } from './common-utils';

export type Tag = {
	name: string;
	slug: string;
};

export async function getAllPosts() {
	const diyPosts = await getCollection('diy');
	const recipePosts = await getCollection('dessert');
	return [...diyPosts, ...recipePosts].sort(sortItemsByDateDesc);
}

export function sortItemsByDateDesc(
	itemA: CollectionEntry<'diy' | 'dessert'>,
	itemB: CollectionEntry<'diy' | 'dessert'>,
) {
	return (
		new Date(itemB.data.publishedDate).getTime() -
		new Date(itemA.data.publishedDate).getTime()
	);
}

export function getAllTags(posts: CollectionEntry<'diy' | 'dessert'>[]) {
	const tags: string[] = [
		...new Set(posts.flatMap((post) => post.data.tags || []).filter(Boolean)),
	];
	return tags
		.map((tag) => {
			return {
				name: tag,
				slug: slugify(tag),
			} as Tag;
		})
		.filter((obj, pos, arr) => {
			return arr.map((mapObj) => mapObj.slug).indexOf(obj.slug) === pos;
		});
}

export function getPostsByTag(
	posts: CollectionEntry<'diy' | 'dessert'>[],
	tagSlug: string,
) {
	const filteredPosts: CollectionEntry<'diy' | 'dessert'>[] = posts.filter(
		(post) =>
			(post.data.tags || []).map((tag) => slugify(tag)).includes(tagSlug),
	);
	return filteredPosts;
}
