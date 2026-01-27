<script>
	import { onMount } from 'svelte';

	let canvas;
	let ctx;
	let particles = [];
	let animationId;

	const PARTICLE_COUNT = 80;
	const CONNECTION_DISTANCE = 150;
	const PARTICLE_SPEED = 0.3;

	class Particle {
		constructor(width, height) {
			this.x = Math.random() * width;
			this.y = Math.random() * height;
			this.vx = (Math.random() - 0.5) * PARTICLE_SPEED;
			this.vy = (Math.random() - 0.5) * PARTICLE_SPEED;
			this.radius = Math.random() * 2 + 1;
		}

		update(width, height) {
			this.x += this.vx;
			this.y += this.vy;

			if (this.x < 0 || this.x > width) this.vx *= -1;
			if (this.y < 0 || this.y > height) this.vy *= -1;
		}

		draw(ctx) {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
			ctx.fillStyle = 'rgba(99, 102, 241, 0.5)';
			ctx.fill();
		}
	}

	function init() {
		if (!canvas) return;
		ctx = canvas.getContext('2d');
		resizeCanvas();
		createParticles();
		animate();
	}

	function resizeCanvas() {
		if (!canvas) return;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	function createParticles() {
		particles = [];
		for (let i = 0; i < PARTICLE_COUNT; i++) {
			particles.push(new Particle(canvas.width, canvas.height));
		}
	}

	function drawConnections() {
		for (let i = 0; i < particles.length; i++) {
			for (let j = i + 1; j < particles.length; j++) {
				const dx = particles[i].x - particles[j].x;
				const dy = particles[i].y - particles[j].y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < CONNECTION_DISTANCE) {
					const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.3;
					ctx.beginPath();
					ctx.moveTo(particles[i].x, particles[i].y);
					ctx.lineTo(particles[j].x, particles[j].y);
					ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
					ctx.lineWidth = 1;
					ctx.stroke();
				}
			}
		}
	}

	function animate() {
		if (!ctx) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		particles.forEach(p => {
			p.update(canvas.width, canvas.height);
			p.draw(ctx);
		});

		drawConnections();
		animationId = requestAnimationFrame(animate);
	}

	function handleResize() {
		resizeCanvas();
		createParticles();
	}

	onMount(() => {
		init();
		window.addEventListener('resize', handleResize);

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<section class="hero" id="hero">
	<canvas bind:this={canvas} class="particle-canvas"></canvas>

	<div class="hero-content">
		<h1>Modeling Complex Systems with Generative AI</h1>
		<p class="name">Ross F. Williams</p>
		<p class="subtitle">
			PhD Candidate | Virginia Tech | System Dynamics + Generative AI
		</p>
		<p class="description">
			Researching how generative AI can help us understand and predict
			the behavior of complex systems, from epidemic spread to social dynamics.
		</p>
		<div class="hero-buttons">
			<a href="#research" class="btn btn-primary">Explore Research</a>
			<a href="#model" class="btn btn-secondary">Interactive Demo</a>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--gradient-hero);
		overflow: hidden;
	}

	.particle-canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.hero-content {
		position: relative;
		z-index: 1;
		text-align: center;
		max-width: 800px;
		padding: var(--space-lg);
	}

	h1 {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 700;
		line-height: 1.1;
		margin-bottom: var(--space-sm);
		background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent-secondary) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.name {
		font-size: clamp(1.25rem, 2.5vw, 1.75rem);
		font-weight: 600;
		color: var(--text-primary);
		margin-bottom: var(--space-md);
	}

	.subtitle {
		font-size: clamp(1rem, 2vw, 1.25rem);
		color: var(--accent-secondary);
		font-weight: 500;
		margin-bottom: var(--space-lg);
	}

	.description {
		font-size: clamp(0.95rem, 1.5vw, 1.1rem);
		color: var(--text-secondary);
		line-height: 1.7;
		margin-bottom: var(--space-xl);
	}

	.hero-buttons {
		display: flex;
		gap: var(--space-md);
		justify-content: center;
		flex-wrap: wrap;
	}

	.hero-buttons .btn {
		padding: var(--space-md) var(--space-xl);
		font-size: 1rem;
	}
</style>
