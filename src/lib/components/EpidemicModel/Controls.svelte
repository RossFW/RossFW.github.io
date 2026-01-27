<script>
	let {
		N = $bindable(10000),
		I0 = $bindable(10),
		beta = $bindable(0.35),
		gamma = $bindable(0.1),
		days = $bindable(365),
		onExport = () => {}
	} = $props();
</script>

<div class="controls">
	<div class="parameters">
		<h4>Parameters</h4>

		<div class="param-group">
			<label for="population">
				Population Size (N)
				<span class="param-value">{N.toLocaleString()}</span>
			</label>
			<input
				type="range"
				id="population"
				bind:value={N}
				min="1000"
				max="100000"
				step="1000"
			/>
		</div>

		<div class="param-group">
			<label for="initial">
				Initial Infected (I0)
				<span class="param-value">{I0}</span>
			</label>
			<input
				type="range"
				id="initial"
				bind:value={I0}
				min="1"
				max="1000"
				step="1"
			/>
		</div>

		<div class="param-group">
			<label for="beta">
				Transmission Rate (&beta;)
				<span class="param-value">{beta.toFixed(2)}</span>
			</label>
			<input
				type="range"
				id="beta"
				bind:value={beta}
				min="0.05"
				max="1"
				step="0.01"
			/>
			<span class="param-hint">Higher = more contagious</span>
		</div>

		<div class="param-group">
			<label for="gamma">
				Recovery Rate (&gamma;)
				<span class="param-value">{gamma.toFixed(2)} ({(1/gamma).toFixed(1)} days infectious)</span>
			</label>
			<input
				type="range"
				id="gamma"
				bind:value={gamma}
				min="0.05"
				max="0.5"
				step="0.01"
			/>
			<span class="param-hint">Duration of infectiousness</span>
		</div>

		<div class="param-group">
			<label for="days">
				Simulation Duration
				<span class="param-value">{days} days</span>
			</label>
			<input
				type="range"
				id="days"
				bind:value={days}
				min="30"
				max="730"
				step="1"
			/>
		</div>
	</div>

	<button class="export-btn" onclick={onExport}>
		Export Data (CSV)
	</button>
</div>

<style>
	.controls {
		background: var(--bg-card);
		border-radius: var(--radius-md);
		padding: var(--space-lg);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	h4 {
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: var(--text-secondary);
		margin-bottom: var(--space-md);
	}

	.parameters {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		margin-bottom: var(--space-xl);
	}

	.param-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.param-group label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.9rem;
		color: var(--text-primary);
	}

	.param-value {
		color: var(--accent-secondary);
		font-family: var(--font-mono);
		font-size: 0.85rem;
	}

	.param-hint {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	input[type="range"] {
		-webkit-appearance: none;
		width: 100%;
		height: 6px;
		background: var(--bg-secondary);
		border-radius: var(--radius-full);
		outline: none;
	}

	input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 18px;
		height: 18px;
		background: var(--accent-primary);
		border-radius: 50%;
		cursor: pointer;
		transition: transform var(--transition-fast);
	}

	input[type="range"]::-webkit-slider-thumb:hover {
		transform: scale(1.1);
	}

	input[type="range"]::-moz-range-thumb {
		width: 18px;
		height: 18px;
		background: var(--accent-primary);
		border-radius: 50%;
		cursor: pointer;
		border: none;
	}

	.export-btn {
		width: 100%;
		padding: var(--space-md);
		background: transparent;
		border: 1px solid var(--accent-secondary);
		border-radius: var(--radius-sm);
		color: var(--accent-secondary);
		font-weight: 500;
		transition: all var(--transition-fast);
	}

	.export-btn:hover {
		background: rgba(34, 211, 238, 0.1);
	}
</style>
