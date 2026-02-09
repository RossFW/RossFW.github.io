<script>
	const projects = [
		{
			title: 'Blood on the Clocktower Elo Tracker',
			date: 'January 2026',
			description: 'A player rating and statistics tracking system for the social deduction board game Blood on the Clocktower. Tracks Elo ratings, win percentages, and game statistics with analytics dashboards and leaderboards.',
			techStack: ['JavaScript', 'HTML/CSS', 'Chart.js', 'Supabase', 'Python', 'Tkinter'],
			features: [
				'Elo rating system (K=32)',
				'Game entry with role/alignment tracking',
				'Analytics dashboards with Chart.js',
				'Sortable leaderboard',
				'Storyteller and script filtering',
				'40+ character roles across multiple scripts'
			],
			highlights: [
				{ label: 'Roles', value: '40+' },
				{ label: 'Platform', value: 'Web + Desktop' },
				{ label: 'Database', value: 'Supabase' }
			],
			accent: '#6366f1',
			githubUrl: 'https://github.com/RossFW/botc',
			liveUrl: 'https://rossfw.github.io/botc/botc-web/'
		},
		{
			title: 'Among Us IRL',
			date: 'February 2026',
			description: 'A Progressive Web App that transforms Among Us game mechanics into a real-world phone-based multiplayer experience. Players join via codes, receive roles on their phones, and play in physical space.',
			techStack: ['FastAPI', 'Python', 'JavaScript', 'WebSockets', 'SQLite', 'Service Worker'],
			features: [
				'22 unique roles across Crew, Impostor, and Neutral factions',
				'Real-time WebSocket synchronization',
				'Kill cooldowns and meeting/voting system',
				'Reconnection support',
				'Cloudflare Tunnel integration',
				'Mobile-first PWA design'
			],
			highlights: [
				{ label: 'Roles', value: '22' },
				{ label: 'Sync', value: 'Real-time' },
				{ label: 'Platform', value: 'PWA' }
			],
			accent: '#22d3ee',
			githubUrl: 'https://github.com/RossFW/Among-Us-IRL'
		}
	];
</script>

<section class="projects section" id="projects">
	<div class="container">
		<h2 class="section-title">Projects</h2>

		<div class="projects-grid">
			{#each projects as project}
				<article class="project-card card" style="--project-accent: {project.accent};">
					<div class="project-header">
						<h3>{project.title}</h3>
						<span class="project-date">{project.date}</span>
					</div>

					<p class="project-description">{project.description}</p>

					<div class="tech-stack">
						{#each project.techStack as tech}
							<span class="tech-tag">{tech}</span>
						{/each}
					</div>

					<div class="features">
						<h4>Key Features</h4>
						<ul>
							{#each project.features as feature}
								<li>{feature}</li>
							{/each}
						</ul>
					</div>

					<div class="project-highlights">
						{#each project.highlights as hl}
							<div class="highlight-stat">
								<span class="stat-value">{hl.value}</span>
								<span class="stat-label">{hl.label}</span>
							</div>
						{/each}
					</div>

					<div class="project-links">
						<a href={project.githubUrl} target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
							GitHub
						</a>
						{#if project.liveUrl}
							<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" class="btn btn-primary">
								Live Site
							</a>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.projects {
		background: var(--bg-secondary);
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-xl);
	}

	.project-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.project-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--space-md);
	}

	.project-header h3 {
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.project-date {
		font-size: 0.85rem;
		font-weight: 500;
		font-family: var(--font-mono);
		white-space: nowrap;
		flex-shrink: 0;
		color: var(--project-accent);
	}

	.project-description {
		color: var(--text-secondary);
		line-height: 1.6;
		font-size: 0.95rem;
	}

	.tech-stack {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}

	.tech-tag {
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-full);
		font-size: 0.8rem;
		font-weight: 500;
		background: color-mix(in srgb, var(--project-accent) 20%, transparent);
		color: var(--project-accent);
		border: 1px solid color-mix(in srgb, var(--project-accent) 35%, transparent);
	}

	.features h4 {
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-sm);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		font-size: 0.8rem;
	}

	.features ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.features li {
		color: var(--text-secondary);
		font-size: 0.9rem;
		line-height: 1.5;
		padding-left: var(--space-md);
		position: relative;
	}

	.features li::before {
		content: '>';
		position: absolute;
		left: 0;
		color: var(--text-muted);
		font-family: var(--font-mono);
	}

	.project-highlights {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-sm);
		margin-top: auto;
		padding-top: var(--space-md);
		border-top: 1px solid rgba(255, 255, 255, 0.05);
	}

	.highlight-stat {
		text-align: center;
		padding: var(--space-sm);
	}

	.stat-value {
		display: block;
		font-size: 1.1rem;
		font-weight: 700;
		font-family: var(--font-mono);
		color: var(--project-accent);
	}

	.stat-label {
		font-size: 0.75rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.project-links {
		display: flex;
		gap: var(--space-sm);
	}

	@media (max-width: 768px) {
		.projects-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		.project-header {
			flex-direction: column;
		}
	}
</style>
