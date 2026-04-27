<script>
	import { onMount, onDestroy } from 'svelte';

	let loaded = false;
	let failed = false;

	function loadScript(src) {
		return new Promise((resolve, reject) => {
			// Skip if already loaded
			if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
			const s = document.createElement('script');
			s.src = src;
			s.onload = resolve;
			s.onerror = () => reject(new Error(`Failed: ${src}`));
			document.head.appendChild(s);
		});
	}

	onMount(async () => {
		// Bail on mobile — too heavy
		if (window.innerWidth < 768) return;

		try {
			await loadScript('/town/papaparse.min.js');
			await loadScript('/town/config.js');
			await loadScript('/town/phaser.min.js');
			await loadScript('/town/map-layout.js');
			await loadScript('/town/agent-schedule.js');
			await loadScript('/town/town-render.js');
			await loadScript('/town/town-pathfinding.js');
			await loadScript('/town/town-agents.js');
			await loadScript('/town/town-ui.js');
			await loadScript('/town/town-bg.js');
			loaded = true;
		} catch (e) {
			console.warn('Town background failed to load:', e);
			failed = true;
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined' && window.__townBgGame) {
			window.__townBgGame.destroy(true);
			window.__townBgGame = null;
		}
	});
</script>

<div class="town-bg-wrapper" aria-hidden="true">
	<div id="town-bg-container"></div>
	<div class="town-overlay"></div>
</div>

<style>
	.town-bg-wrapper {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		z-index: 0;
	}

	#town-bg-container {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(2.2);
		transform-origin: center center;
	}

	/* Scale up the pixel-art canvas to fill the hero */
	:global(#town-bg-container canvas) {
		display: block;
		image-rendering: pixelated;
		image-rendering: crisp-edges;
	}

	/* Dark gradient overlay so text stays readable */
	.town-overlay {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(ellipse at center, rgba(10,10,15,0.55) 0%, rgba(10,10,15,0.80) 100%),
			linear-gradient(135deg, rgba(10,10,15,0.2) 0%, rgba(10,10,15,0.1) 50%, rgba(10,10,15,0.2) 100%);
	}
</style>
