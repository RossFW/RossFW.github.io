<script>
	import { onMount } from 'svelte';
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

	let N = $state(10000);
	let I0 = $state(10);
	let beta = $state(0.35);
	let gamma = $state(0.1);
	let days = $state(365);

	let data = $derived(runSIR({ N, I0, beta, gamma, days }));
	let R0 = $derived(calculateR0(beta, gamma));
	let peakInfo = $derived(findPeak(data));
	let totalInfected = $derived(calculateTotalInfected(data, N));

	// ── Dashboard iframe auto-sizing ──────────────────────────
	let iframeHeight = $state(2100);

	onMount(() => {
		function onMsg(e) {
			if (e.data?.type === 'town-dashboard-height' && typeof e.data.height === 'number') {
				iframeHeight = Math.min(Math.max(e.data.height + 16, 1600), 2800);
			}
		}
		window.addEventListener('message', onMsg);
		return () => window.removeEventListener('message', onMsg);
	});

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
		<h2 class="section-title">Modeling Complex Systems</h2>
		<p class="section-lead">
			Epidemics aren't just biology — they're <strong>nonlinear socio-technical systems</strong>
			driven by human behavior. People don't move through compartments like marbles through a
			machine. They notice rising risk, weigh trade-offs, change their minds, and act on
			incomplete information. Most classical models can't capture any of that.
		</p>

		<!-- ── SIR Baseline ──────────────────────────────────── -->
		<div class="panel sir-panel">
			<div class="panel-header">
				<div>
					<h3>Classical Baseline — SIR Model</h3>
					<p class="panel-desc">
						The compartmental model that's powered epidemic forecasting since 1927:
						populations divided into Susceptible, Infected, and Recovered, governed by
						transmission rate β and recovery rate γ. Adjust the parameters to see how
						a homogeneous population responds.
					</p>
				</div>
			</div>

			<div class="sir-metrics">
				<div class="sir-metric">
					<span class="sir-metric-val" class:warn={R0 > 1}>{R0.toFixed(2)}</span>
					<span class="sir-metric-lbl">R<sub>0</sub></span>
				</div>
				<div class="sir-metric">
					<span class="sir-metric-val">{peakInfo.peakInfected.toLocaleString()}</span>
					<span class="sir-metric-lbl">Peak infected</span>
				</div>
				<div class="sir-metric">
					<span class="sir-metric-val">{((totalInfected / N) * 100).toFixed(0)}%</span>
					<span class="sir-metric-lbl">Total attack rate</span>
				</div>
				<div class="sir-metric">
					<span class="sir-metric-val">Day {peakInfo.peakDay}</span>
					<span class="sir-metric-lbl">Peak timing</span>
				</div>
			</div>

			<div class="sir-grid">
				<div class="sir-chart-wrap">
					<Chart {data} />
				</div>
				<div class="sir-controls-wrap">
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
		</div>

		<!-- ── Bridge ────────────────────────────────────────── -->
		<div class="bridge">
			<div class="bridge-line"></div>
			<p>
				But humans aren't compartments. They don't transition between states based on a fixed
				probability — they <em>decide</em>. An extrovert with kids and a service job behaves
				nothing like a risk-averse retiree, even at identical infection levels. Capturing that
				heterogeneity is exactly where mechanistic models break down.
			</p>
			<p class="bridge-question">
				So what happens if we replace the compartments with <strong>100 LLM-powered agents</strong>,
				each with a unique persona, deciding day-by-day whether to shelter as risk rises?
			</p>
		</div>

		<!-- ── GABM Experiment ─────────────────────────────────── -->
		<div class="panel gabm-panel">
			<div class="panel-header">
				<div>
					<h3>The Experiment — Dewberry Hollow GABM</h3>
					<p class="panel-desc">
						100 generative agents with distinct personalities probe the same question across
						40 infection levels: <em>"Will you stay home today?"</em> Each agent was asked
						<strong>5 times per level</strong> to measure consistency — that's why the agent
						decisions chart shows confidence as 5/5 (unanimous) down to 3/5 (split). Scrub
						through the levels to watch the town empty out, or click any agent to see their
						reasoning.
					</p>
				</div>
				<a
					href="https://rossfw.github.io/GABM-Mobility-Curve/town.html"
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-secondary panel-link"
				>
					All 21 Models ↗
				</a>
			</div>

			<div class="iframe-wrapper" style="height: {iframeHeight}px;">
				<iframe
					src="/town/town.html"
					title="Dewberry Hollow — Generative Agent-Based Model"
					loading="lazy"
				></iframe>
			</div>
		</div>
	</div>
</section>

<style>
	.epidemic-model {
		background: var(--bg-secondary);
	}

	.section-lead {
		max-width: 820px;
		color: var(--text-secondary);
		line-height: 1.75;
		font-size: 1.02rem;
		margin-bottom: var(--space-2xl);
	}

	.section-lead strong {
		color: var(--text-primary);
		font-weight: 600;
	}

	/* ── Shared panel ────────────────────────────────────────── */
	.panel {
		background: var(--bg-card);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: var(--radius-md);
		padding: var(--space-xl);
		margin-bottom: var(--space-xl);
	}

	.panel h3 {
		font-size: 1.05rem;
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-xs);
	}

	.panel-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--space-lg);
		margin-bottom: var(--space-lg);
	}

	.panel-desc {
		font-size: 0.9rem;
		color: var(--text-secondary);
		line-height: 1.65;
		max-width: 760px;
	}

	.panel-link {
		white-space: nowrap;
		flex-shrink: 0;
		font-size: 0.85rem;
		padding: var(--space-sm) var(--space-md);
	}

	/* ── SIR panel ────────────────────────────────────────────── */
	.sir-metrics {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-md);
		margin-bottom: var(--space-lg);
	}

	.sir-metric {
		background: var(--bg-secondary);
		border-radius: var(--radius-sm);
		padding: var(--space-md);
		text-align: center;
		border: 1px solid rgba(255, 255, 255, 0.06);
	}

	.sir-metric-val {
		display: block;
		font-size: 1.4rem;
		font-weight: 700;
		color: var(--accent-secondary);
		font-family: var(--font-mono);
	}

	.sir-metric-val.warn {
		color: #ef4444;
	}

	.sir-metric-lbl {
		display: block;
		font-size: 0.7rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-top: 4px;
	}

	.sir-grid {
		display: grid;
		grid-template-columns: 1fr 320px;
		gap: var(--space-lg);
		align-items: start;
	}

	.sir-chart-wrap {
		min-width: 0;
		border-radius: var(--radius-sm);
		overflow: hidden;
	}

	/* ── Bridge ──────────────────────────────────────────────── */
	.bridge {
		max-width: 820px;
		margin: 0 auto var(--space-xl);
		padding: var(--space-xl) var(--space-lg);
		position: relative;
	}

	.bridge-line {
		position: absolute;
		left: 50%;
		top: 0;
		width: 1px;
		height: 32px;
		background: linear-gradient(to bottom, transparent, var(--accent-secondary));
		transform: translateX(-50%);
	}

	.bridge p {
		color: var(--text-secondary);
		line-height: 1.75;
		font-size: 1rem;
		margin-bottom: var(--space-md);
	}

	.bridge p em {
		color: var(--accent-secondary);
		font-style: italic;
	}

	.bridge-question {
		color: var(--text-primary) !important;
		font-size: 1.08rem !important;
		font-weight: 500;
		padding-top: var(--space-sm);
	}

	.bridge-question strong {
		color: var(--accent-primary);
		font-weight: 600;
	}

	/* ── GABM iframe ────────────────────────────────────────── */
	.iframe-wrapper {
		position: relative;
		width: 100%;
		border-radius: var(--radius-sm);
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: #0f0f15;
		transition: height 0.4s ease;
	}

	.iframe-wrapper iframe {
		width: 100%;
		height: 100%;
		border: none;
		display: block;
	}

	/* ── Responsive ─────────────────────────────────────────── */
	@media (max-width: 1024px) {
		.sir-grid {
			grid-template-columns: 1fr;
		}

		.sir-metrics {
			grid-template-columns: repeat(2, 1fr);
		}

	}

	@media (max-width: 768px) {
		.panel-header {
			flex-direction: column;
		}
	}
</style>
