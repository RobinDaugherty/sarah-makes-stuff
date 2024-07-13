import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';

const injectScss = `
@use "astro-breakpoints/use-breakpoints.scss" as * with (
$breakpoints: (
	"xs": "320px",
	"sm": "640px",
	"md": "768px",
	"lg": "1024px",
	"xl": "1281px",
	"xxl": "1920px",
	)
);
`;

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
						return `${injectScss}\n${source}`;
					},
				},
			},
		},
	},
});
