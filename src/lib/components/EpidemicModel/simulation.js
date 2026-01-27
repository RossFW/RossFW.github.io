/**
 * SIR Epidemic Model Simulation
 *
 * Compartments:
 * S - Susceptible: Can be infected
 * I - Infected: Infectious
 * R - Recovered: Immune
 */

/**
 * Run SIR simulation with given parameters
 * @param {Object} params - Simulation parameters
 * @param {number} params.N - Total population
 * @param {number} params.I0 - Initial infected
 * @param {number} params.beta - Transmission rate
 * @param {number} params.gamma - Recovery rate (1/infectious period)
 * @param {number} params.days - Number of days to simulate
 * @returns {Array} Time series data
 */
export function runSIR(params) {
	const { N, I0, beta, gamma, days } = params;
	const dt = 0.1; // Time step for Euler integration

	let S = N - I0;
	let I = I0;
	let R = 0;

	const data = [];

	for (let t = 0; t <= days; t += dt) {
		// Store daily values (avoid floating point issues)
		if (Math.abs(t - Math.round(t)) < dt / 2) {
			data.push({
				day: Math.round(t),
				S: Math.round(S),
				I: Math.round(I),
				R: Math.round(R)
			});
		}

		// SIR differential equations
		const dS = -beta * S * I / N;
		const dI = beta * S * I / N - gamma * I;
		const dR = gamma * I;

		// Euler integration
		S += dS * dt;
		I += dI * dt;
		R += dR * dt;

		// Ensure non-negative values
		S = Math.max(0, S);
		I = Math.max(0, I);
		R = Math.max(0, R);
	}

	return data;
}

/**
 * Calculate basic reproduction number R0
 * @param {number} beta - Transmission rate
 * @param {number} gamma - Recovery rate
 * @returns {number} R0
 */
export function calculateR0(beta, gamma) {
	return beta / gamma;
}

/**
 * Calculate herd immunity threshold
 * @param {number} R0 - Basic reproduction number
 * @returns {number} Fraction of population that needs immunity
 */
export function calculateHerdImmunity(R0) {
	if (R0 <= 1) return 0;
	return 1 - 1 / R0;
}

/**
 * Find peak infection and its timing
 * @param {Array} data - Simulation time series
 * @returns {Object} Peak info
 */
export function findPeak(data) {
	let peakI = 0;
	let peakDay = 0;

	for (const point of data) {
		if (point.I > peakI) {
			peakI = point.I;
			peakDay = point.day;
		}
	}

	return { peakInfected: peakI, peakDay };
}

/**
 * Calculate total epidemic size (total ever infected)
 * @param {Array} data - Simulation time series
 * @param {number} N - Total population
 * @returns {number} Total infected
 */
export function calculateTotalInfected(data, N) {
	const finalR = data[data.length - 1].R;
	return finalR;
}

/**
 * Export simulation data as CSV
 * @param {Array} data - Simulation time series
 * @returns {string} CSV string
 */
export function exportToCSV(data) {
	const headers = ['Day', 'Susceptible', 'Infected', 'Recovered'];
	const rows = data.map(d => [d.day, d.S, d.I, d.R].join(','));
	return [headers.join(','), ...rows].join('\n');
}
