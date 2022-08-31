import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

const dev = process.env.NODE_ENV === 'development';
console.log(dev)
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {

		// trailingSlash: 'always',
		adapter: adapter({
			// default options are shown

			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false
		}),
		paths: {
			base: dev ? '' : '/character-generator',
		}
	}
};

export default config;
