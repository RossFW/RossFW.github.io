<script>
	const publications = [
		{
			title: 'From text to map: A system dynamics bot for constructing causal loop diagrams',
			authors: 'N. Hosseinichimeh, A. Majumdar, R. Williams, and N. Ghaffarzadegan',
			venue: 'System Dynamics Review',
			year: 2024,
			doi: 'https://doi.org/10.1002/sdr.1782',
			abstract: 'We present a system dynamics bot that can automatically construct causal loop diagrams from textual descriptions, leveraging large language models to bridge the gap between natural language and formal system dynamics representations.',
			tags: ['System Dynamics', 'LLM', 'Causal Loop Diagrams']
		},
		{
			title: 'Generative agent-based modeling: An introduction and tutorial',
			authors: 'N. Ghaffarzadegan, R. Williams, and N. Hosseinichimeh',
			venue: 'System Dynamics Review',
			year: 2024,
			doi: 'https://doi.org/10.1002/sdr.1761',
			abstract: 'This tutorial introduces generative agent-based modeling, a new paradigm that combines the flexibility of large language models with the rigor of agent-based simulation to model complex social systems.',
			tags: ['Agent-based Modeling', 'Generative AI', 'Tutorial']
		},
		{
			title: 'Epidemic Modeling with Generative Agents',
			authors: 'R. Williams, N. Hosseinichimeh, A. Majumdar, and N. Ghaffarzadegan',
			venue: 'arXiv preprint',
			year: 2023,
			doi: 'https://arxiv.org/abs/2307.04986',
			abstract: 'We demonstrate how LLM-powered generative agents can simulate realistic human behavior during disease outbreaks, capturing complex social dynamics that traditional compartmental models miss.',
			tags: ['Epidemic Modeling', 'Generative Agents', 'LLM'],
			featured: true,
			media: {
				outlet: 'The Daily Beast',
				url: 'https://www.thedailybeast.com/chatgpt-invented-this-fake-epidemic-can-it-help-prevent-the-next-one/',
				title: 'ChatGPT Invented This Fake Epidemic. Can It Help Prevent the Next One?'
			}
		}
	];
</script>

<section class="research section" id="research">
	<div class="container">
		<h2 class="section-title">Research & Publications</h2>

		<div class="research-intro">
			<p>
				My research focuses on developing computational methods that help us understand
				and predict the behavior of complex systems. I'm particularly interested
				in how generative AI can enhance traditional simulation approaches.
			</p>
		</div>

		<div class="publications-list">
			{#each publications as pub}
				<article class="publication card" class:featured={pub.featured}>
					{#if pub.featured}
						<div class="featured-badge">Featured Research</div>
					{/if}

					<h3 class="pub-title">
						<a href={pub.doi} target="_blank" rel="noopener noreferrer">
							{pub.title}
						</a>
					</h3>

					<p class="pub-authors">{pub.authors}</p>

					<p class="pub-venue">
						<em>{pub.venue}</em>, {pub.year}
					</p>

					<p class="pub-abstract">{pub.abstract}</p>

					<div class="pub-tags">
						{#each pub.tags as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>

					{#if pub.media}
						<div class="media-mention">
							<span class="media-label">Featured in:</span>
							<a href={pub.media.url} target="_blank" rel="noopener noreferrer">
								{pub.media.outlet} - "{pub.media.title}"
							</a>
						</div>
					{/if}

					<a href={pub.doi} target="_blank" rel="noopener noreferrer" class="pub-link">
						Read Paper &rarr;
					</a>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.research-intro {
		max-width: 800px;
		margin-bottom: var(--space-2xl);
	}

	.research-intro p {
		font-size: 1.1rem;
		color: var(--text-secondary);
		line-height: 1.7;
	}

	.publications-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}

	.publication {
		position: relative;
	}

	.publication.featured {
		border-color: var(--accent-primary);
		background: var(--gradient-card);
	}

	.featured-badge {
		position: absolute;
		top: var(--space-md);
		right: var(--space-md);
		background: var(--accent-primary);
		color: white;
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.pub-title {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: var(--space-sm);
		padding-right: 120px;
	}

	.pub-title a {
		color: var(--text-primary);
	}

	.pub-title a:hover {
		color: var(--accent-secondary);
	}

	.pub-authors {
		font-size: 0.9rem;
		color: var(--text-secondary);
		margin-bottom: var(--space-xs);
	}

	.pub-venue {
		font-size: 0.9rem;
		color: var(--accent-secondary);
		margin-bottom: var(--space-md);
	}

	.pub-abstract {
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: var(--space-md);
	}

	.pub-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		margin-bottom: var(--space-md);
	}

	.tag {
		background: rgba(99, 102, 241, 0.2);
		color: var(--accent-primary-hover);
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-full);
		font-size: 0.8rem;
		font-weight: 500;
	}

	.media-mention {
		background: rgba(244, 114, 182, 0.1);
		border-left: 3px solid var(--accent-tertiary);
		padding: var(--space-sm) var(--space-md);
		margin-bottom: var(--space-md);
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
	}

	.media-label {
		font-size: 0.85rem;
		color: var(--accent-tertiary);
		font-weight: 600;
		display: block;
		margin-bottom: var(--space-xs);
	}

	.media-mention a {
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	.media-mention a:hover {
		color: var(--accent-tertiary);
	}

	.pub-link {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		font-weight: 500;
		font-size: 0.95rem;
	}

	@media (max-width: 640px) {
		.pub-title {
			padding-right: 0;
		}

		.featured-badge {
			position: static;
			display: inline-block;
			margin-bottom: var(--space-sm);
		}
	}
</style>
