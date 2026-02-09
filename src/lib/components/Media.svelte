<script>
	const videoId = 'dlOEqCMw1xI';
</script>

<section class="media section" id="media">
	<div class="container">
		<h2 class="section-title">Media & Press</h2>

		<div class="media-grid">
			<div class="video-section card">
				<h3>RoboGrinder: RoboMaster Competition</h3>
				<p class="video-description">
					During my time leading the RoboGrinder robotics team at Virginia Tech, we designed
					and built fully autonomous combat robots. This video showcases our robot in action
					at the RoboMaster competition, where we achieved 2nd place internationally.
				</p>

				<div class="video-wrapper">
					<iframe
						src="https://www.youtube.com/embed/{videoId}"
						title="RoboGrinder RoboMaster Competition"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
					></iframe>
				</div>

				<div class="video-highlights">
					<div class="highlight-item">
						<span class="highlight-number">2nd</span>
						<span class="highlight-label">Place International</span>
					</div>
					<div class="highlight-item">
						<span class="highlight-number">54</span>
						<span class="highlight-label">Team Members</span>
					</div>
					<div class="highlight-item">
						<span class="highlight-number">$10K+</span>
						<span class="highlight-label">Raised Annually</span>
					</div>
				</div>
			</div>

			<div class="media-mentions">
				<h3>Press & Media</h3>

				<div class="mention-card card">
					<span class="mention-outlet">The Daily Beast</span>
					<h4>
						<a
							href="https://www.thedailybeast.com/chatgpt-invented-this-fake-epidemic-can-it-help-prevent-the-next-one/"
							target="_blank"
							rel="noopener noreferrer"
						>
							"ChatGPT Invented This Fake Epidemic. Can It Help Prevent the Next One?"
						</a>
					</h4>
					<p>
						Coverage of our research on using generative AI agents to model
						epidemic spread and human behavior during outbreaks.
					</p>
				</div>

				<div class="research-link card">
					<h4>Explore the Research</h4>
					<p>
						Try the interactive epidemic model above to see compartmental
						dynamics in action, or read my papers on how generative agents
						can enhance these traditional approaches.
					</p>
					<a href="#model" class="btn btn-secondary">
						Try Interactive Model
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.media {
		background: var(--bg-primary);
	}

	.media-grid {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: var(--space-xl);
	}

	.video-section h3,
	.media-mentions h3 {
		font-size: 1.1rem;
		color: var(--text-primary);
		margin-bottom: var(--space-md);
	}

	.video-description {
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: var(--space-lg);
	}

	.video-wrapper {
		position: relative;
		padding-bottom: 56.25%;
		height: 0;
		overflow: hidden;
		border-radius: var(--radius-md);
		margin-bottom: var(--space-lg);
	}

	.video-wrapper iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.video-highlights {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-md);
	}

	.highlight-item {
		text-align: center;
		padding: var(--space-md);
		background: var(--bg-secondary);
		border-radius: var(--radius-sm);
	}

	.highlight-number {
		display: block;
		font-size: 1.75rem;
		font-weight: 700;
		color: var(--accent-secondary);
		font-family: var(--font-mono);
	}

	.highlight-label {
		font-size: 0.8rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.media-mentions {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.mention-card {
		border-left: 3px solid var(--accent-tertiary);
	}

	.mention-outlet {
		font-size: 0.8rem;
		color: var(--accent-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		font-weight: 600;
	}

	.mention-card h4 {
		margin: var(--space-sm) 0;
	}

	.mention-card h4 a {
		color: var(--text-primary);
		font-size: 1rem;
		line-height: 1.4;
	}

	.mention-card h4 a:hover {
		color: var(--accent-secondary);
	}

	.mention-card p {
		font-size: 0.9rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.research-link {
		border-left: 3px solid var(--accent-primary);
	}

	.research-link h4 {
		color: var(--text-primary);
		margin-bottom: var(--space-sm);
	}

	.research-link p {
		color: var(--text-secondary);
		font-size: 0.9rem;
		line-height: 1.5;
		margin-bottom: var(--space-md);
	}

	@media (max-width: 768px) {
		.media-grid {
			grid-template-columns: 1fr;
		}

		.video-highlights {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 480px) {
		.video-highlights {
			grid-template-columns: 1fr;
		}
	}
</style>
