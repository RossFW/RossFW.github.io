<script>
	const skills = [
		'System Dynamics',
		'Agent-based Modeling',
		'Python',
		'MATLAB',
		'R',
		'Vensim'
	];
</script>

<section class="about section" id="about">
	<div class="container">
		<h2 class="section-title">About Me</h2>

		<div class="about-grid">
			<div class="about-image">
				<img src="/images/headshot.png" alt="Ross Williams" />
			</div>

			<div class="about-content">
				<p class="lead">
					I'm a PhD candidate in Industrial Systems Engineering at Virginia Tech,
					graduating in May 2026. My research sits at the intersection of
					<strong>complex systems</strong>, <strong>artificial intelligence</strong>,
					and <strong>computational modeling</strong>.
				</p>

				<p>
					I develop novel approaches that combine generative AI with traditional
					simulation methodologies. My work on epidemic modeling with generative agents
					was featured in <a href="https://www.thedailybeast.com/chatgpt-invented-this-fake-epidemic-can-it-help-prevent-the-next-one/" target="_blank" rel="noopener noreferrer">The Daily Beast</a>,
					demonstrating how LLM-powered agents can simulate realistic human behavior during disease outbreaks.
				</p>

				<p>
					Before my PhD, I earned a B.S. in Mechanical Engineering from Virginia Tech (2021)
					and was part of the RoboGrinder robotics team that achieved 2nd place at the
					RoboMaster international competition.
				</p>

				<div class="skills-section">
					<h3>Technical Skills</h3>
					<div class="skills-list">
						{#each skills as skill}
							<span class="skill-tag">{skill}</span>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.about {
		background: var(--bg-secondary);
	}

	.about-grid {
		display: grid;
		grid-template-columns: 280px 1fr;
		gap: var(--space-2xl);
		align-items: start;
	}

	.about-image {
		position: sticky;
		top: 100px;
	}

	.about-image img {
		width: 100%;
		border-radius: var(--radius-lg);
		border: 2px solid rgba(255, 255, 255, 0.1);
	}

	.about-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}

	.lead {
		font-size: 1.1rem;
		line-height: 1.8;
		color: var(--text-primary);
	}

	.about-content p {
		color: var(--text-secondary);
		line-height: 1.7;
	}

	.about-content strong {
		color: var(--accent-secondary);
	}

	.about-content a {
		color: var(--accent-tertiary);
		font-weight: 500;
	}

	.about-content a:hover {
		text-decoration: underline;
	}

	.skills-section {
		margin-top: var(--space-lg);
	}

	.skills-section h3 {
		font-size: 1.1rem;
		margin-bottom: var(--space-md);
		color: var(--text-primary);
	}

	.skills-list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}

	.skill-tag {
		background: rgba(99, 102, 241, 0.15);
		color: var(--accent-primary-hover);
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-sm);
		font-size: 0.9rem;
		font-weight: 500;
		border: 1px solid rgba(99, 102, 241, 0.3);
	}

	@media (max-width: 768px) {
		.about-grid {
			grid-template-columns: 1fr;
		}

		.about-image {
			position: static;
			max-width: 220px;
			margin: 0 auto;
		}
	}
</style>
