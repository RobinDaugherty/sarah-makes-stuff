import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://sarahmakesstuff.com',
	output: 'server',
	adapter: vercel({
		webAnalytics: { enabled: true },
	}),
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
