<script>
	import TownBackground from '$lib/components/TownBackground.svelte';
</script>

<section class="hero" id="hero">
	<TownBackground />

	<div class="hero-content">
		<h1>Engineer. Researcher. Builder.</h1>
		<p class="name">Ross F. Williams</p>
		<p class="subtitle">
			Computational Modeling · Generative AI · Full-Stack Projects
		</p>
		<p class="description">
			Building AI systems that model the real world: simulations,
			real-time analytics pipelines, interactive tools.
		</p>
		<div class="hero-buttons">
			<a href="#research" class="btn btn-primary">Explore Research</a>
			<a href="#projects" class="btn btn-secondary">See Projects</a>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--gradient-hero);
		overflow: hidden;
	}

.hero-content {
		position: relative;
		z-index: 1;
		text-align: center;
		max-width: 800px;
		padding: var(--space-lg);
	}

	h1 {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 700;
		line-height: 1.1;
		margin-bottom: var(--space-sm);
		background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-secondary) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.name {
		font-size: clamp(1.25rem, 2.5vw, 1.75rem);
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-md);
	}

	.subtitle {
		font-size: clamp(1rem, 2vw, 1.25rem);
		color: var(--accent-secondary);
		font-weight: 500;
		margin-bottom: var(--space-lg);
	}

	.description {
		font-size: clamp(0.95rem, 1.5vw, 1.1rem);
		color: var(--text-secondary);
		line-height: 1.7;
		margin-bottom: var(--space-xl);
	}

	.hero-buttons {
		display: flex;
		gap: var(--space-md);
		justify-content: center;
		flex-wrap: wrap;
	}

	.hero-buttons .btn {
		padding: var(--space-md) var(--space-xl);
		font-size: 1rem;
	}
</style>
