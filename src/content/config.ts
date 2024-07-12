import { defineCollection, z } from 'astro:content';

const post = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		publishedDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		isFeatured: z.boolean().default(false),
		tags: z.array(z.string()).default([]),
	}),
});

export const collections = { diy: post, dessert: post };
