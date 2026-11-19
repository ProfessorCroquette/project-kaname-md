<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Component } from 'svelte';
	import type { PageData } from './$types';

	const essayFiles = import.meta.glob<{ default: Component }>('/src/content/analyses/*.md', {
		eager: true
	});

	let { data }: { data: PageData } = $props();
	let Essay = $derived(getEssayComponent(data.analysis.id));

	function getEssayComponent(slug: string): Component {
		const essay = essayFiles[`/src/content/analyses/${slug}.md`];

		if (!essay) {
			throw new Error(`Markdown file for analysis "${slug}" was not found.`);
		}

		return essay.default;
	}
</script>

<svelte:head>
	<title>{data.analysis.title} | Project Kaname</title>
	<meta name="description" content={data.analysis.description} />
</svelte:head>

<section class="section">
	<article class="container analysis">
		<a class="back-link" href={`${resolve('/kaname/analyses')}/`}>← All Analyses</a>
		<header>
			<h1>{data.analysis.title}</h1>
			<p class="meta">
				{new Date(data.analysis.date).toLocaleDateString()} · {data.analysis.category}
			</p>
		</header>
		<div class="essay">
			<Essay />
		</div>
	</article>
</section>

<style>
	.analysis {
		max-width: 760px;
	}

	.back-link {
		display: inline-block;
		margin-bottom: var(--space-lg);
		font-family: var(--font-heading);
		font-size: 0.9rem;
	}

	header {
		margin-bottom: var(--space-xl);
		padding-bottom: var(--space-md);
		border-bottom: 1px solid var(--border);
	}

	h1 {
		margin-bottom: var(--space-md);
	}

	.meta {
		margin-bottom: 0;
		color: var(--text-soft);
		font-family: var(--font-heading);
		font-size: 0.9rem;
	}

	:global(.essay h2) {
		margin: var(--space-xl) 0 var(--space-md);
	}

	:global(.essay p) {
		margin-bottom: var(--space-lg);
	}
</style>
