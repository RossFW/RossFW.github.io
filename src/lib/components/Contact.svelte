<script>
	let formState = $state('idle'); // idle, submitting, success, error
	let formData = $state({
		name: '',
		email: '',
		affiliation: '',
		subject: 'general',
		message: ''
	});

	const subjects = [
		{ value: 'general', label: 'General Inquiry' },
		{ value: 'job', label: 'Job Opportunity' },
		{ value: 'collaboration', label: 'Research Collaboration' },
		{ value: 'speaking', label: 'Speaking Invitation' },
		{ value: 'media', label: 'Media Inquiry' }
	];

	async function handleSubmit(e) {
		e.preventDefault();
		formState = 'submitting';

		try {
			const response = await fetch('https://formspree.io/f/xwvorpwa', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				formState = 'success';
				formData = {
					name: '',
					email: '',
					affiliation: '',
					subject: 'general',
					message: ''
				};
			} else {
				formState = 'error';
			}
		} catch {
			formState = 'error';
		}
	}

	function resetForm() {
		formState = 'idle';
	}
</script>

<section class="contact section" id="contact">
	<div class="container">
		<h2 class="section-title">Get in Touch</h2>

		<div class="contact-grid">
			<div class="contact-info">
				<p class="contact-intro">
					I'm always interested in discussing research collaborations,
					speaking opportunities, or just chatting about complex systems
					and AI. Feel free to reach out!
				</p>

				<div class="contact-methods">
					<div class="contact-method">
						<span class="method-icon">
							<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
								<polyline points="22,6 12,13 2,6"></polyline>
							</svg>
						</span>
						<div>
							<span class="method-label">Email</span>
							<a href="mailto:rossfw@vt.edu">rossfw@vt.edu</a>
						</div>
					</div>

					<div class="contact-method">
						<span class="method-icon">
							<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
								<circle cx="12" cy="10" r="3"></circle>
							</svg>
						</span>
						<div>
							<span class="method-label">Location</span>
							<span>Atlanta, GA</span>
						</div>
					</div>

					<div class="contact-method">
						<span class="method-icon">
							<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
								<polyline points="22 4 12 14.01 9 11.01"></polyline>
							</svg>
						</span>
						<div>
							<span class="method-label">Status</span>
							<span>PhD Candidate, Virginia Tech (2026)</span>
						</div>
					</div>
				</div>
			</div>

			<div class="contact-form-wrapper">
				{#if formState === 'success'}
					<div class="form-success card">
						<span class="success-icon">&#10003;</span>
						<h3>Message Sent!</h3>
						<p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
						<button class="btn btn-secondary" onclick={resetForm}>
							Send Another Message
						</button>
					</div>
				{:else}
					<form class="contact-form card" onsubmit={handleSubmit}>
						<div class="form-row">
							<div class="form-group">
								<label for="name">Name *</label>
								<input
									type="text"
									id="name"
									bind:value={formData.name}
									required
									placeholder="Your name"
								/>
							</div>

							<div class="form-group">
								<label for="email">Email *</label>
								<input
									type="email"
									id="email"
									bind:value={formData.email}
									required
									placeholder="your@email.com"
								/>
							</div>
						</div>

						<div class="form-row">
							<div class="form-group">
								<label for="affiliation">Affiliation</label>
								<input
									type="text"
									id="affiliation"
									bind:value={formData.affiliation}
									placeholder="University, Company, etc."
								/>
							</div>

							<div class="form-group">
								<label for="subject">Subject *</label>
								<select id="subject" bind:value={formData.subject} required>
									{#each subjects as subj}
										<option value={subj.value}>{subj.label}</option>
									{/each}
								</select>
							</div>
						</div>

						<div class="form-group">
							<label for="message">Message *</label>
							<textarea
								id="message"
								bind:value={formData.message}
								required
								rows="5"
								placeholder="Your message..."
							></textarea>
						</div>

						{#if formState === 'error'}
							<div class="form-error">
								Something went wrong. Please try again or email me directly.
							</div>
						{/if}

						<button
							type="submit"
							class="btn btn-primary submit-btn"
							disabled={formState === 'submitting'}
						>
							{formState === 'submitting' ? 'Sending...' : 'Send Message'}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 1.5fr;
		gap: var(--space-2xl);
	}

	.contact-intro {
		color: var(--text-secondary);
		line-height: 1.7;
		margin-bottom: var(--space-xl);
	}

	.contact-methods {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}

	.contact-method {
		display: flex;
		gap: var(--space-md);
		align-items: flex-start;
	}

	.method-icon {
		color: var(--accent-secondary);
		flex-shrink: 0;
	}

	.method-label {
		display: block;
		font-size: 0.8rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-bottom: var(--space-xs);
	}

	.contact-method a,
	.contact-method span:not(.method-label):not(.method-icon) {
		color: var(--text-primary);
		font-size: 0.95rem;
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-md);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.form-group label {
		font-size: 0.9rem;
		color: var(--text-secondary);
	}

	.form-group input,
	.form-group select,
	.form-group textarea {
		background: var(--bg-secondary);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: var(--radius-sm);
		padding: var(--space-sm) var(--space-md);
		color: var(--text-primary);
		font-family: inherit;
		font-size: 0.95rem;
		transition: border-color var(--transition-fast);
	}

	.form-group input:focus,
	.form-group select:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: var(--accent-primary);
	}

	.form-group input::placeholder,
	.form-group textarea::placeholder {
		color: var(--text-muted);
	}

	.form-group select {
		cursor: pointer;
	}

	.form-group textarea {
		resize: vertical;
		min-height: 120px;
	}

	.form-error {
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid var(--color-infected);
		border-radius: var(--radius-sm);
		padding: var(--space-sm) var(--space-md);
		color: var(--color-infected);
		font-size: 0.9rem;
	}

	.submit-btn {
		align-self: flex-start;
		padding: var(--space-md) var(--space-2xl);
	}

	.submit-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.form-success {
		text-align: center;
		padding: var(--space-2xl);
	}

	.success-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 60px;
		height: 60px;
		background: var(--color-recovered);
		border-radius: 50%;
		font-size: 2rem;
		color: white;
		margin-bottom: var(--space-lg);
	}

	.form-success h3 {
		color: var(--text-primary);
		margin-bottom: var(--space-sm);
	}

	.form-success p {
		color: var(--text-secondary);
		margin-bottom: var(--space-lg);
	}

	@media (max-width: 768px) {
		.contact-grid {
			grid-template-columns: 1fr;
		}

		.form-row {
			grid-template-columns: 1fr;
		}
	}
</style>
