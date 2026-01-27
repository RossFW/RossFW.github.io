<script>
	import Controls from './Controls.svelte';
	import Chart from './Chart.svelte';
	import {
		runSIR,
		calculateR0,
		calculateHerdImmunity,
		findPeak,
		calculateTotalInfected,
		exportToCSV
	} from './simulation.js';

	// Parameters with defaults
	let N = $state(10000);
	let I0 = $state(10);
	let beta = $state(0.35);
	let gamma = $state(0.1);
	let days = $state(365);

	// Computed values
	let data = $derived(runSIR({ N, I0, beta, gamma, days }));
	let R0 = $derived(calculateR0(beta, gamma));
	let herdImmunity = $derived(calculateHerdImmunity(R0));
	let peakInfo = $derived(findPeak(data));
	let totalInfected = $derived(calculateTotalInfected(data, N));

	function handleExport() {
		const csv = exportToCSV(data);
		const blob = new Blob([csv], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'epidemic_simulation.csv';
		a.click();
		URL.revokeObjectURL(url);
	}
</script>

<section class="epidemic-model section" id="model">
	<div class="container">
		<h2 class="section-title">Interactive Epidemic Model</h2>

		<div class="model-intro">
			<p>
				Explore how epidemics spread through populations using this interactive SIR
				(Susceptible-Infected-Recovered) model. Adjust the parameters to see
				how transmission rate and recovery time affect disease dynamics.
			</p>
			<p class="model-note">
				This relates to my research on <strong>Epidemic Modeling with Generative Agents</strong>,
				which extends traditional compartmental models with LLM-powered agents that simulate
				realistic human behavior.
			</p>
		</div>

		<div class="model-grid">
			<div class="chart-section">
				<Chart {data} />

				<div class="metrics">
					<div class="metric">
						<span class="metric-label">R<sub>0</sub></span>
						<span class="metric-value" class:warning={R0 > 1}>
							{R0.toFixed(2)}
						</span>
						<span class="metric-hint">
							{R0 > 1 ? 'Epidemic grows' : 'Epidemic dies out'}
						</span>
					</div>

					<div class="metric">
						<span class="metric-label">Peak Infected</span>
						<span class="metric-value">
							{peakInfo.peakInfected.toLocaleString()}
						</span>
						<span class="metric-hint">Day {peakInfo.peakDay}</span>
					</div>

					<div class="metric">
						<span class="metric-label">Total Infected</span>
						<span class="metric-value">
							{totalInfected.toLocaleString()}
						</span>
						<span class="metric-hint">
							{((totalInfected / N) * 100).toFixed(1)}% of population
						</span>
					</div>

					<div class="metric">
						<span class="metric-label">Herd Immunity</span>
						<span class="metric-value">
							{R0 > 1 ? (herdImmunity * 100).toFixed(0) + '%' : 'N/A'}
						</span>
						<span class="metric-hint">Threshold for containment</span>
					</div>
				</div>
			</div>

			<div class="controls-section">
				<Controls
					bind:N
					bind:I0
					bind:beta
					bind:gamma
					bind:days
					onExport={handleExport}
				/>
			</div>
		</div>

		<div class="model-explanation">
			<h3>Understanding the Model</h3>
			<div class="explanation-grid">
				<div class="explanation-item">
					<span class="compartment" style="background: #3b82f6;">S</span>
					<div>
						<strong>Susceptible</strong>
						<p>People who can be infected. They move to Infected when they contact an infectious person.</p>
					</div>
				</div>
				<div class="explanation-item">
					<span class="compartment" style="background: #ef4444;">I</span>
					<div>
						<strong>Infected</strong>
						<p>Infectious individuals who can spread the disease to Susceptible people.</p>
					</div>
				</div>
				<div class="explanation-item">
					<span class="compartment" style="background: #22c55e;">R</span>
					<div>
						<strong>Recovered</strong>
						<p>People who have recovered and are now immune to the disease.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.epidemic-model {
		background: var(--bg-secondary);
	}

	.model-intro {
		max-width: 800px;
		margin-bottom: var(--space-2xl);
	}

	.model-intro p {
		color: var(--text-secondary);
		line-height: 1.7;
		margin-bottom: var(--space-md);
	}

	.model-note {
		background: var(--gradient-card);
		border-left: 3px solid var(--accent-primary);
		padding: var(--space-md);
		border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
	}

	.model-note strong {
		color: var(--accent-secondary);
	}

	.model-grid {
		display: grid;
		grid-template-columns: 1fr 350px;
		gap: var(--space-xl);
		margin-bottom: var(--space-2xl);
	}

	.chart-section {
		min-width: 0;
	}

	.metrics {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-md);
		margin-top: var(--space-lg);
	}

	.metric {
		background: var(--bg-card);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		text-align: center;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.metric-label {
		display: block;
		font-size: 0.8rem;
		color: var(--text-secondary);
		margin-bottom: var(--space-xs);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.metric-value {
		display: block;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--accent-secondary);
		font-family: var(--font-mono);
	}

	.metric-value.warning {
		color: var(--color-infected);
	}

	.metric-hint {
		display: block;
		font-size: 0.75rem;
		color: var(--text-muted);
		margin-top: var(--space-xs);
	}

	.model-explanation {
		background: var(--bg-card);
		border-radius: var(--radius-md);
		padding: var(--space-xl);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.model-explanation h3 {
		font-size: 1.1rem;
		margin-bottom: var(--space-lg);
		color: var(--text-primary);
	}

	.explanation-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-lg);
	}

	.explanation-item {
		display: flex;
		gap: var(--space-md);
	}

	.compartment {
		width: 36px;
		height: 36px;
		border-radius: var(--radius-sm);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		color: white;
		flex-shrink: 0;
	}

	.explanation-item strong {
		display: block;
		color: var(--text-primary);
		margin-bottom: var(--space-xs);
	}

	.explanation-item p {
		font-size: 0.85rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	@media (max-width: 1024px) {
		.model-grid {
			grid-template-columns: 1fr;
		}

		.controls-section {
			order: -1;
		}

		.metrics {
			grid-template-columns: repeat(2, 1fr);
		}

		.explanation-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		.metrics {
			grid-template-columns: 1fr;
		}
	}
</style>
