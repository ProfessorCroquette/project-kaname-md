<script lang="ts">
	import { resolve } from '$app/paths';
	import { analyses } from '../../../lib/analyses';

	const sortedAnalyses = analyses;
	const analysisDetailPath = `${resolve('/kaname/analyses')}/`;
</script>

<svelte:head>
	<title>All Analyses | Project Kaname</title>
	<meta
		name="description"
		content="Browse philosophical analyses of music, videos, lyrics, and other media."
	/>
</svelte:head>

<section class="section">
	<div class="container">
		<h1>All Analyses</h1>

		{#if sortedAnalyses.length > 0}
			<div class="masonry-grid">
				{#each sortedAnalyses as analysis (analysis.id)}
					<article class="grid-card">
						<h2>
							<a href={`${analysisDetailPath}${analysis.id}/`}>{analysis.title}</a>
						</h2>
						<p class="meta">
							{new Date(analysis.date).toLocaleDateString()} · {analysis.category}
						</p>
						<p>{analysis.description}</p>
					</article>
				{/each}
			</div>
		{:else}
			<p class="empty-state">No analyses have been published yet.</p>
		{/if}
	</div>
</section>

<style>
	h1 {
		margin-bottom: var(--space-lg);
		padding-bottom: var(--space-sm);
		border-bottom: 1px solid var(--border);
	}

	.masonry-grid {
		column-count: 3;
		column-gap: var(--space-lg);
	}

	.grid-card {
		display: inline-block;
		width: 100%;
		margin-bottom: var(--space-lg);
		break-inside: avoid;
		background-color: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: var(--space-lg);
		transition:
			transform 0.2s ease,
			border-color 0.2s ease;
	}

	.grid-card:hover {
		transform: translateY(-2px);
		border-color: var(--accent);
	}

	.grid-card h2 {
		font-size: 1.5rem;
		margin: 0 0 var(--space-sm);
	}

	.grid-card a {
		color: var(--text);
		text-decoration: none;
	}

	.grid-card a:hover {
		color: var(--accent-hover);
	}

	.meta {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--text-soft);
		margin-bottom: var(--space-sm);
	}

	.grid-card p:last-child {
		color: var(--text-soft);
		margin-bottom: 0;
		max-width: 100%;
		line-height: 1.6;
	}

	.empty-state {
		color: var(--text-soft);
	}

	@media (max-width: 900px) {
		.masonry-grid {
			column-count: 2;
		}
	}

	@media (max-width: 600px) {
		.masonry-grid {
			column-count: 1;
		}
	}
</style>
