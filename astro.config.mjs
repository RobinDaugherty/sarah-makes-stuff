import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
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
	trailingSlash: 'never',
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
	redirects: {
		// Note: these are not currently implemented when deployed. Currently these must be
		// included in the nginx config.
		'/dessert?format=rss': '/rss.xml',
	},
});
