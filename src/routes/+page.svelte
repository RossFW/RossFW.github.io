<script>
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Research from '$lib/components/Research.svelte';
	import EpidemicModel from '$lib/components/EpidemicModel/EpidemicModel.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Media from '$lib/components/Media.svelte';
	import Contact from '$lib/components/Contact.svelte';
</script>

<svelte:head>
	<title>Ross Williams | Complex Systems & Computational Modeling</title>
	<meta name="description" content="PhD Candidate at Virginia Tech researching System Dynamics, Agent-based Modeling, and Generative AI. Explore interactive epidemic models and research publications." />
</svelte:head>

<Hero />
<About />
<Research />
<EpidemicModel />
<Experience />
<Media />
<Contact />
