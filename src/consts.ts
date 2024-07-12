// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export type SiteConfig = {
	title: string;
	email: string;
	description: string;
	postsPerPage: number;
};

const siteConfig: SiteConfig = {
	title: 'Sarah Makes Stuff',
	email: 'sarah@sarahdaugherty.net',
	description:
		'I mostly bake but some times I try my hand at craftinesses too.',
	postsPerPage: 12,
};

export default siteConfig;
