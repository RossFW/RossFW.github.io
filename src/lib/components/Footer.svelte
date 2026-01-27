<script>
	const socialLinks = [
		{
			label: 'Google Scholar',
			href: 'https://scholar.google.com/citations?user=DVnGcrUAAAAJ&hl=en',
			icon: 'M12 14.5l-7 4 2-7.5L1 6h7.5L12 0l3.5 6H23l-6 5 2 7.5z'
		},
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/rossfantuswilliams/',
			icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
		},
		{
			label: 'GitHub',
			href: 'https://github.com/RossFW',
			icon: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'
		}
	];
</script>

<footer>
	<div class="footer-container">
		<div class="footer-content">
			<div class="footer-info">
				<h3>Ross F. Williams</h3>
				<p>PhD Candidate, Virginia Tech</p>
				<p>System Dynamics | Agent-based Modeling | Generative AI</p>
			</div>

			<div class="footer-links">
				<h4>Connect</h4>
				<div class="social-links">
					{#each socialLinks as link}
						<a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
							<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
								<path d={link.icon}></path>
							</svg>
						</a>
					{/each}
				</div>
				<a href="mailto:rossfw@vt.edu" class="email">rossfw@vt.edu</a>
			</div>
		</div>

		<div class="footer-bottom">
			<p>&copy; {new Date().getFullYear()} Ross Williams. Built with SvelteKit.</p>
		</div>
	</div>
</footer>

<style>
	footer {
		background: var(--bg-secondary);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding: var(--space-2xl) 0 var(--space-lg);
	}

	.footer-container {
		max-width: var(--container-xl);
		margin: 0 auto;
		padding: 0 var(--space-lg);
	}

	.footer-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-2xl);
		padding-bottom: var(--space-xl);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.footer-info h3 {
		font-size: 1.25rem;
		margin-bottom: var(--space-sm);
		color: var(--text-primary);
	}

	.footer-info p {
		color: var(--text-secondary);
		font-size: 0.9rem;
		margin-bottom: var(--space-xs);
	}

	.footer-links h4 {
		font-size: 1rem;
		margin-bottom: var(--space-md);
		color: var(--text-primary);
	}

	.social-links {
		display: flex;
		gap: var(--space-md);
		margin-bottom: var(--space-md);
	}

	.social-links a {
		color: var(--text-secondary);
		transition: color var(--transition-fast);
	}

	.social-links a:hover {
		color: var(--accent-secondary);
	}

	.email {
		color: var(--accent-secondary);
		font-size: 0.9rem;
	}

	.footer-bottom {
		padding-top: var(--space-lg);
		text-align: center;
	}

	.footer-bottom p {
		color: var(--text-muted);
		font-size: 0.85rem;
	}

	@media (max-width: 640px) {
		.footer-content {
			grid-template-columns: 1fr;
			gap: var(--space-xl);
		}
	}
</style>
