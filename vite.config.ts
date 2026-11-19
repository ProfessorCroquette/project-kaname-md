import { link_check } from '@mdsvex/plugin-link-check';
import { page_data } from '@mdsvex/plugin-page-data';
import { citations } from '@mdsvex/plugin-citations';
import { references } from '@mdsvex/plugin-references';
import { external_links } from '@mdsvex/plugin-external-links';
import { toc } from '@mdsvex/plugin-toc';
import { anchors } from '@mdsvex/plugin-anchors';
import { figures } from '@mdsvex/plugin-figures';
import { code_blocks } from '@mdsvex/plugin-code-blocks';
import { tabs } from '@mdsvex/plugin-tabs';
import { elements } from '@mdsvex/plugin-elements';
import { callouts } from '@mdsvex/plugin-callouts';
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		mdsvex({
			heading_ids: true,
			unwrap_images: true,
			plugins: [
				callouts(),
				elements(),
				tabs(),
				code_blocks(),
				figures(),
				anchors(),
				toc(),
				external_links(),
				references(),
				citations(),
				page_data(),
				link_check()
			]
		}),

		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter()
		})
	]
});
