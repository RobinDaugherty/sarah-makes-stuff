import { defineCollection, z } from 'astro:content';

const post = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			category: z.string(),
			description: z.string().optional(),
			publishedDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			isFeatured: z.boolean().default(false),
			heroImage: image().refine((img: ImageMetadata) => img.width >= 1080, {
				message: 'Hero image must be at least 1080 pixels wide!',
			}),
			tags: z.array(z.string()).default([]),
		}),
});

export const collections = { diy: post, dessert: post };
