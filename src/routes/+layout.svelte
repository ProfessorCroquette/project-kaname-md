<script lang="ts">
	import '@fontsource/lora/400.css';
	import '@fontsource/lora/700.css';
	import '@fontsource-variable/inter';
	import '../app.css';
	import { asset, resolve } from '$app/paths';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
	let menuOpen = $state(false);
</script>

<header>
	<a href={resolve('/')} class="logo-link">
		<img id="logo" src={asset('logo1.png')} alt="Project Kaname" />
	</a>
	<button
		class="menu-toggle"
		type="button"
		aria-label={menuOpen ? 'Close menu' : 'Open menu'}
		aria-expanded={menuOpen}
		aria-controls="main-navigation"
		onclick={() => (menuOpen = !menuOpen)}
	>
		<span></span>
		<span></span>
		<span></span>
	</button>
	<nav id="main-navigation" class:open={menuOpen} aria-label="Main">
		<ul>
			<li><a href={resolve('/#home')} onclick={() => (menuOpen = false)}>Home</a></li>
			<li><a href={resolve('/#about')} onclick={() => (menuOpen = false)}>About</a></li>
			<li><a href={resolve('/#contact')} onclick={() => (menuOpen = false)}>Contact</a></li>
			<li>
				<a href={`${resolve('/kaname/analyses')}/`} onclick={() => (menuOpen = false)}>Analyses</a>
			</li>
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>

<footer>
	<p>&copy; 2026 Project Kaname. All rights reserved.</p>
</footer>

<style>
	:global(body) {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1;
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: sticky;
		top: 0;
		z-index: 100;
		background-color: var(--bg);
		padding: var(--space-md) var(--space-lg);
		border-bottom: 1px solid var(--border);
	}

	#logo {
		height: 28px;
		width: auto;
		filter: brightness(0) invert(1);
	}

	.menu-toggle {
		display: none;
	}

	nav ul {
		display: flex;
		align-items: center;
		gap: var(--space-lg);
		list-style: none;
	}
	nav a {
		font-family: var(--font-heading);
		font-size: 0.78rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text);
		text-decoration: none;
		transition: color 0.2s ease;
	}
	nav a:hover {
		color: var(--accent-hover);
	}

	@media (max-width: 600px) {
		header {
			padding: var(--space-sm) var(--space-md);
		}

		.menu-toggle {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 5px;
			width: 44px;
			height: 44px;
			padding: 0;
			background: transparent;
			border: 1px solid var(--border);
			border-radius: var(--radius);
			cursor: pointer;
		}

		.menu-toggle span {
			width: 20px;
			height: 2px;
			background: var(--text);
		}

		.menu-toggle:hover {
			border-color: var(--accent);
		}

		nav {
			display: none;
			position: absolute;
			top: 100%;
			left: 0;
			width: 100%;
			padding: var(--space-sm) var(--space-md);
			background: var(--bg);
			border-bottom: 1px solid var(--border);
		}

		nav.open {
			display: block;
		}

		nav ul {
			flex-direction: column;
			align-items: stretch;
			gap: 0;
		}

		nav li + li {
			border-top: 1px solid var(--border);
		}

		nav a {
			display: block;
			padding: var(--space-sm) 0;
		}
	}

	footer {
		padding: var(--space-lg);
		text-align: center;
		border-top: 1px solid var(--border);
	}
	footer p {
		font-family: var(--font-heading);
		font-size: 0.8rem;
		color: var(--text-soft);
		margin: 0 auto;
	}
</style>
