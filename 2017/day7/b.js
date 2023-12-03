// Advent of Code
// Day 7 Puzzle B

const
	R = require('ramda'),

	// Regexp match results indices
	PROGRAM = 1,
	WEIGHT = 2,
	SUBPROGRAMS = 4,

	// Solution
	solve = x => {

		const totalWeight = R.curry((data, item) => {
				return data[item].weight + R.reduce((a, x) => a + totalWeight(data, x), 0, data[item].supports);
			}),
			
			supports = (data, item) => data[item].supports,

			lines = R.split(/\n/, x);

			rootProgram = "dgoocsw", // From 7A

			data = R.reduce(
				(a, x) => {
					let parsed = x.match(/^([a-z]+) \((\d+)\)( -> (.+)$)?/);
					a[parsed[PROGRAM]] = {
						program : parsed[PROGRAM],
						weight : parsed[WEIGHT] * 1,
						supports : parsed[SUBPROGRAMS] ? R.split(/, /, parsed[SUBPROGRAMS]) : []
					};
					return a;
				},
				{},
				lines
			);

			let node = rootProgram;
			console.log(
				supports(data, node),
				R.map(totalWeight(data), supports(data, node))
			);

		return data;

	},

	graphViz = x => R.map(y => `  "${x.program}" -> "${y}"\n`, x.supports);


// Invoke solution on input
require('fs').readFile(__dirname + '/input.dat', 'utf8', (err, data) => {
	let intermediate = solve(data);
});
