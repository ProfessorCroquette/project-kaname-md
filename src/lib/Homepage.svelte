<script lang="ts">
	import { asset, resolve } from '$app/paths';
	import { analyses } from './analyses';

	const latestAnalyses = analyses.slice(0, 3);
	const analysisDetailPath = `${resolve('/kaname/analyses')}/`;
</script>

<section id="home" class="hero" style={`--hero-image: url("${asset('madoka.gif')}")`}>
	<h1>There is always a thought that leads to more questions.</h1>
	<p>
		Project Kaname is a personal site where I share my philosophical analysis of pieces of media.
	</p>
</section>

<section id="latest-analyses" class="section">
	<div class="container">
		<h2>Latest Analyses</h2>
		{#if latestAnalyses.length > 0}
			<div class="latest-grid">
				{#each latestAnalyses as analysis (analysis.id)}
					<article class="home-card">
						<h3>
							<a href={`${analysisDetailPath}${analysis.id}/`}>{analysis.title}</a>
						</h3>
						<p class="meta">
							{new Date(analysis.date).toLocaleDateString()} · {analysis.category}
						</p>
						<p>{analysis.description}</p>
					</article>
				{/each}
			</div>
			<a class="latest-link" href={`${resolve('/kaname/analyses')}/`}>View all analyses</a>
		{:else}
			<p>No analyses have been published yet.</p>
		{/if}
	</div>
</section>

<section id="about" class="section">
	<div class="container">
		<h2>About</h2>
		<p>
			My name is Professor Croquette, I am an amateur philosopher, programmer, and currently
			studying in informatics engineering. This site is made for me to post some essays, interesting
			thoughts and reflections on pieces of media like musics, videos, lyrics and many more.
		</p>
	</div>
</section>

<section id="contact" class="section">
	<div class="container">
		<h2>Contact</h2>
		<p>
			If you are interested in sharing media that I would like to analyze, feel free to reach me on
			the contacts below.
		</p>

		<div class="button-group">
			<a class="btn" href="mailto:shiro.argentum@gmail.com">Email</a>
			<a
				class="btn"
				href="https://github.com/ProfessorCroquette"
				target="_blank"
				rel="noopener noreferrer"
			>
				GitHub
			</a>
		</div>
	</div>
</section>

<style>
	.hero {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		min-height: 80vh;
		padding: var(--space-xl) var(--space-lg);
		background-color: #0f0c1d;
		background-image:
			linear-gradient(rgba(15, 12, 29, 0.7), rgba(15, 12, 29, 0.9)), var(--hero-image);
		background-size: cover;
		background-position: center;
		border-bottom: 1px solid var(--border);
	}
	.hero h1 {
		max-width: 20ch;
		margin-bottom: var(--space-md);
		text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
	}
	.hero p {
		max-width: 55ch;
		font-size: 1.1rem;
		color: #cfcaf0;
		margin-bottom: 0;
	}
	.latest-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-lg);
	}
	.home-card {
		background-color: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: var(--space-lg);
		transition:
			transform 0.2s ease,
			border-color 0.2s ease;
	}
	.home-card:hover {
		transform: translateY(-2px);
		border-color: var(--accent);
	}
	.home-card h3 {
		margin-bottom: var(--space-sm);
	}
	.home-card a {
		color: var(--text);
		text-decoration: none;
	}
	.home-card a:hover {
		color: var(--accent-hover);
	}
	.meta {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--text-soft);
		margin-bottom: var(--space-sm);
	}
	.home-card p:last-child {
		margin-bottom: 0;
	}
	.latest-link {
		display: inline-block;
		margin-top: var(--space-lg);
		font-family: var(--font-heading);
		font-weight: 600;
	}
	.button-group {
		display: flex;
		gap: var(--space-md);
		margin-top: var(--space-lg);
	}
	.btn {
		display: inline-block;
		padding: var(--space-sm) var(--space-lg);
		font-family: var(--font-heading);
		font-size: 0.85rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--accent);
		background-color: transparent;
		border: 1px solid var(--accent);
		border-radius: var(--radius);
		transition: all 0.2s ease;
	}
	.btn:hover {
		background-color: var(--accent);
		color: var(--on-accent);
		transform: translateY(-2px);
	}

	@media (max-width: 900px) {
		.latest-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 600px) {
		.latest-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
