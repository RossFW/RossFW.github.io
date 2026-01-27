<script>
	import '../lib/styles/variables.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Header />
<main>
	<slot />
</main>
<Footer />

<style>
	main {
		min-height: 100vh;
	}
</style>
