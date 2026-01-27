<script>
	let scrolled = $state(false);
	let mobileMenuOpen = $state(false);

	const navItems = [
		{ label: 'About', href: '#about' },
		{ label: 'Research', href: '#research' },
		{ label: 'Interactive Model', href: '#model' },
		{ label: 'Experience', href: '#experience' },
		{ label: 'Media', href: '#media' },
		{ label: 'Contact', href: '#contact' }
	];

	function handleScroll() {
		scrolled = window.scrollY > 50;
	}

	function toggleMobile() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobile() {
		mobileMenuOpen = false;
	}
</script>

<svelte:window onscroll={handleScroll} />

<header class:scrolled>
	<div class="header-container">
		<a href="#hero" class="logo">Ross Williams</a>

		<nav class="desktop-nav">
			{#each navItems as item}
				<a href={item.href}>{item.label}</a>
			{/each}
		</nav>

		<button class="mobile-toggle" onclick={toggleMobile} aria-label="Toggle menu">
			<span class:open={mobileMenuOpen}></span>
		</button>
	</div>

	{#if mobileMenuOpen}
		<nav class="mobile-nav">
			{#each navItems as item}
				<a href={item.href} onclick={closeMobile}>{item.label}</a>
			{/each}
		</nav>
	{/if}
</header>

<style>
	header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		padding: var(--space-md) 0;
		transition: all var(--transition-normal);
	}

	header.scrolled {
		background: rgba(10, 10, 15, 0.9);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.header-container {
		max-width: var(--container-xl);
		margin: 0 auto;
		padding: 0 var(--space-lg);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.logo:hover {
		color: var(--accent-secondary);
	}

	.desktop-nav {
		display: flex;
		gap: var(--space-lg);
	}

	.desktop-nav a {
		color: var(--text-secondary);
		font-size: 0.9rem;
		font-weight: 500;
		transition: color var(--transition-fast);
	}

	.desktop-nav a:hover {
		color: var(--accent-secondary);
	}

	.mobile-toggle {
		display: none;
		background: none;
		border: none;
		width: 30px;
		height: 24px;
		position: relative;
	}

	.mobile-toggle span,
	.mobile-toggle span::before,
	.mobile-toggle span::after {
		display: block;
		position: absolute;
		width: 100%;
		height: 2px;
		background: var(--text-primary);
		transition: all var(--transition-fast);
	}

	.mobile-toggle span {
		top: 50%;
		transform: translateY(-50%);
	}

	.mobile-toggle span::before {
		content: '';
		top: -8px;
	}

	.mobile-toggle span::after {
		content: '';
		top: 8px;
	}

	.mobile-toggle span.open {
		background: transparent;
	}

	.mobile-toggle span.open::before {
		top: 0;
		transform: rotate(45deg);
	}

	.mobile-toggle span.open::after {
		top: 0;
		transform: rotate(-45deg);
	}

	.mobile-nav {
		display: none;
		flex-direction: column;
		padding: var(--space-lg);
		background: rgba(10, 10, 15, 0.95);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.mobile-nav a {
		color: var(--text-secondary);
		padding: var(--space-sm) 0;
		font-size: 1rem;
	}

	@media (max-width: 768px) {
		.desktop-nav {
			display: none;
		}

		.mobile-toggle {
			display: block;
		}

		.mobile-nav {
			display: flex;
		}
	}
</style>
