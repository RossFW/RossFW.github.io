<script>
	const experiences = [
		{
			title: 'Lead Researcher',
			organization: 'Dataline Project, Virginia Tech',
			location: 'Falls Church, VA',
			period: 'Sept 2023 – June 2024',
			description: 'Led a $100,000 research project investigating how to leverage LLM agents for email marketing optimization and customer engagement strategies.',
			highlights: ['$100K project budget', 'LLM agent development', 'Email marketing optimization'],
			type: 'research'
		},
		{
			title: 'Team Lead / Sentry Sub-Team Lead',
			organization: 'RoboGrinder: Robotics Team',
			location: 'Virginia Tech',
			period: 'May 2019 – July 2021',
			description: 'Led Virginia Tech\'s largest robotics team (54 members) to 2nd place at the RoboMaster North American competition. Served as Sentry Sub-Team Lead for the international competition, where the team also achieved 2nd place.',
			highlights: [
				'2nd place RoboMaster North America (Team Lead)',
				'2nd place RoboMaster International',
				'54 team members',
				'$10,000+ raised annually',
				'Designed autonomous monorail vehicle with integrated vision systems'
			],
			type: 'leadership'
		},
		{
			title: 'Manufacturing Engineering Intern',
			organization: 'BMW',
			location: 'Spartanburg, SC',
			period: 'Jan 2019 – May 2019',
			description: 'Designed and optimized manufacturing processes for BMW\'s X series SUVs, addressing ergonomic and mechanical challenges on the assembly line.',
			highlights: [
				'X series SUV manufacturing',
				'Process optimization',
				'Cross-functional collaboration'
			],
			type: 'industry'
		},
		{
			title: 'Co-founder',
			organization: 'MSE Journal Club, Virginia Tech',
			location: 'Blacksburg, VA',
			period: 'Jan 2022 – Jan 2023',
			description: 'Founded and organized a platform for 15 Management Systems Engineering graduate students to present and discuss research papers.',
			highlights: ['15 active members', 'Paper presentations', 'Research community building'],
			type: 'leadership'
		},
		{
			title: 'Graduate Student Mentor',
			organization: 'ISE Department, Virginia Tech',
			location: 'Blacksburg, VA',
			period: 'Jan 2022 – 2023',
			description: 'Hosted orientation and welcome sessions for 60 new graduate students, helping them navigate academic and professional opportunities.',
			highlights: ['60+ students mentored', 'Orientation sessions', 'Advisory Board representative'],
			type: 'service'
		}
	];

	const typeColors = {
		research: 'var(--accent-primary)',
		leadership: 'var(--accent-secondary)',
		industry: 'var(--color-recovered)',
		service: 'var(--accent-tertiary)'
	};
</script>

<section class="experience section" id="experience">
	<div class="container">
		<h2 class="section-title">Experience & Leadership</h2>

		<div class="timeline">
			{#each experiences as exp, i}
				<div class="timeline-item">
					<div class="timeline-marker" style="background: {typeColors[exp.type]}"></div>
					<div class="timeline-content card">
						<div class="exp-header">
							<div>
								<h3>{exp.title}</h3>
								<p class="organization">{exp.organization}</p>
							</div>
							<div class="exp-meta">
								<span class="period">{exp.period}</span>
								<span class="location">{exp.location}</span>
							</div>
						</div>

						<p class="description">{exp.description}</p>

						<div class="highlights">
							{#each exp.highlights as highlight}
								<span class="highlight" style="border-color: {typeColors[exp.type]}">
									{highlight}
								</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.timeline {
		position: relative;
		padding-left: 30px;
	}

	.timeline::before {
		content: '';
		position: absolute;
		left: 6px;
		top: 0;
		bottom: 0;
		width: 2px;
		background: linear-gradient(
			to bottom,
			var(--accent-primary),
			var(--accent-secondary),
			var(--accent-tertiary)
		);
	}

	.timeline-item {
		position: relative;
		margin-bottom: var(--space-xl);
	}

	.timeline-item:last-child {
		margin-bottom: 0;
	}

	.timeline-marker {
		position: absolute;
		left: -30px;
		top: var(--space-lg);
		width: 14px;
		height: 14px;
		border-radius: 50%;
		border: 3px solid var(--bg-primary);
		z-index: 1;
	}

	.timeline-content {
		margin-left: var(--space-md);
	}

	.exp-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--space-md);
		margin-bottom: var(--space-md);
	}

	.exp-header h3 {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-xs);
	}

	.organization {
		color: var(--accent-secondary);
		font-size: 0.95rem;
	}

	.exp-meta {
		text-align: right;
		flex-shrink: 0;
	}

	.period {
		display: block;
		color: var(--text-primary);
		font-size: 0.9rem;
		font-weight: 500;
	}

	.location {
		display: block;
		color: var(--text-muted);
		font-size: 0.85rem;
	}

	.description {
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: var(--space-md);
	}

	.highlights {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}

	.highlight {
		font-size: 0.8rem;
		color: var(--text-secondary);
		padding: var(--space-xs) var(--space-sm);
		border: 1px solid;
		border-radius: var(--radius-full);
		background: rgba(255, 255, 255, 0.02);
	}

	@media (max-width: 640px) {
		.exp-header {
			flex-direction: column;
		}

		.exp-meta {
			text-align: left;
		}
	}
</style>
