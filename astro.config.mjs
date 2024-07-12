import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://sarahmakesstuff.com',
	integrations: [mdx(), sitemap()],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData(source, filePath) {
						if (filePath.includes('use-')) return source;
						return `
							@use "astro-breakpoints/use-breakpoints.scss" as *;
							${source}
						`;
					},
				},
			},
		},
	},
});
