<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	let { data = [] } = $props();

	let chartContainer;
	let svg;
	let width;
	let height;
	const margin = { top: 20, right: 120, bottom: 50, left: 70 };

	const colors = {
		S: '#3b82f6', // Blue
		I: '#ef4444', // Red
		R: '#22c55e'  // Green
	};

	const labels = {
		S: 'Susceptible',
		I: 'Infected',
		R: 'Recovered'
	};

	function updateChart() {
		if (!chartContainer || !data.length) return;

		const containerRect = chartContainer.getBoundingClientRect();
		width = containerRect.width - margin.left - margin.right;
		height = Math.min(400, containerRect.width * 0.5) - margin.top - margin.bottom;

		// Clear previous chart
		d3.select(chartContainer).selectAll('*').remove();

		svg = d3.select(chartContainer)
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`);

		// Scales
		const xScale = d3.scaleLinear()
			.domain([0, d3.max(data, d => d.day)])
			.range([0, width]);

		const yScale = d3.scaleLinear()
			.domain([0, d3.max(data, d => Math.max(d.S, d.I, d.R))])
			.nice()
			.range([height, 0]);

		// Grid lines
		svg.append('g')
			.attr('class', 'grid')
			.attr('transform', `translate(0,${height})`)
			.call(d3.axisBottom(xScale)
				.tickSize(-height)
				.tickFormat('')
			)
			.style('stroke-opacity', 0.1);

		svg.append('g')
			.attr('class', 'grid')
			.call(d3.axisLeft(yScale)
				.tickSize(-width)
				.tickFormat('')
			)
			.style('stroke-opacity', 0.1);

		// Axes
		svg.append('g')
			.attr('transform', `translate(0,${height})`)
			.call(d3.axisBottom(xScale).ticks(10))
			.style('color', '#94a3b8')
			.selectAll('text')
			.style('fill', '#94a3b8');

		svg.append('g')
			.call(d3.axisLeft(yScale).ticks(8).tickFormat(d3.format('.2s')))
			.style('color', '#94a3b8')
			.selectAll('text')
			.style('fill', '#94a3b8');

		// Axis labels
		svg.append('text')
			.attr('x', width / 2)
			.attr('y', height + 40)
			.attr('text-anchor', 'middle')
			.style('fill', '#94a3b8')
			.style('font-size', '12px')
			.text('Days');

		svg.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('x', -height / 2)
			.attr('y', -50)
			.attr('text-anchor', 'middle')
			.style('fill', '#94a3b8')
			.style('font-size', '12px')
			.text('Population');

		// Line generators
		const lineGenerator = (key) => d3.line()
			.x(d => xScale(d.day))
			.y(d => yScale(d[key]))
			.curve(d3.curveMonotoneX);

		// Draw lines for each compartment
		['S', 'I', 'R'].forEach(key => {
			svg.append('path')
				.datum(data)
				.attr('fill', 'none')
				.attr('stroke', colors[key])
				.attr('stroke-width', 2.5)
				.attr('d', lineGenerator(key));
		});

		// Legend
		const legend = svg.append('g')
			.attr('transform', `translate(${width + 20}, 0)`);

		['S', 'I', 'R'].forEach((key, i) => {
			const g = legend.append('g')
				.attr('transform', `translate(0, ${i * 25})`);

			g.append('line')
				.attr('x1', 0)
				.attr('x2', 20)
				.attr('y1', 0)
				.attr('y2', 0)
				.attr('stroke', colors[key])
				.attr('stroke-width', 2.5);

			g.append('text')
				.attr('x', 28)
				.attr('y', 4)
				.style('fill', '#f8fafc')
				.style('font-size', '12px')
				.text(labels[key]);
		});

		// Tooltip
		const tooltip = d3.select(chartContainer)
			.append('div')
			.attr('class', 'tooltip')
			.style('opacity', 0)
			.style('position', 'absolute')
			.style('background', 'rgba(10, 10, 15, 0.95)')
			.style('border', '1px solid rgba(255, 255, 255, 0.2)')
			.style('border-radius', '8px')
			.style('padding', '12px')
			.style('pointer-events', 'none')
			.style('font-size', '12px')
			.style('z-index', '10');

		// Overlay for mouse tracking
		svg.append('rect')
			.attr('width', width)
			.attr('height', height)
			.attr('fill', 'transparent')
			.on('mousemove', function(event) {
				const [mouseX] = d3.pointer(event);
				const day = Math.round(xScale.invert(mouseX));
				const point = data.find(d => d.day === day);

				if (point) {
					tooltip
						.style('opacity', 1)
						.style('left', `${event.offsetX + 15}px`)
						.style('top', `${event.offsetY - 10}px`)
						.html(`
							<div style="font-weight: 600; margin-bottom: 8px; color: #f8fafc;">Day ${point.day}</div>
							<div style="color: ${colors.S};">S: ${point.S.toLocaleString()}</div>
							<div style="color: ${colors.I};">I: ${point.I.toLocaleString()}</div>
							<div style="color: ${colors.R};">R: ${point.R.toLocaleString()}</div>
						`);
				}
			})
			.on('mouseout', () => {
				tooltip.style('opacity', 0);
			});
	}

	$effect(() => {
		if (data) {
			updateChart();
		}
	});

	onMount(() => {
		updateChart();
		window.addEventListener('resize', updateChart);
		return () => window.removeEventListener('resize', updateChart);
	});
</script>

<div class="chart-container" bind:this={chartContainer}></div>

<style>
	.chart-container {
		width: 100%;
		min-height: 400px;
		position: relative;
	}

	:global(.chart-container svg) {
		overflow: visible;
	}

	:global(.chart-container .grid line) {
		stroke: #64748b;
	}

	:global(.chart-container .grid path) {
		stroke-width: 0;
	}
</style>
