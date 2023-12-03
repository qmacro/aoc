// Advent of Code
// Day 1 Puzzle A

const
	R = require('ramda'),

	// Solution
	solve = x => {

		// Make input into a circular list by adding the first element to the end
		const elements = x.split(''),
			list = R.concat(elements, R.take(1, elements));

		return R.pipe(
			R.groupWith(R.equals),  // split list into same-element sublists
			R.chain(R.aperture(2)), // split those into 2-element sized sublists
			R.map(R.head),          // take 1st element from each
			R.sum                   // add the values together
		)(list);

	},

	tests = [
		['1122', 3],
		['1111', 4],
		['1234', 0],
		['91212129', 9]
	];

// Execute tests, all should return true
console.log(R.all(([i, o]) => solve(i) == o, tests));

// Invoke solution on input
require('fs').readFile(__dirname + '/input.dat', 'utf8', (err, data) => {
	console.log(solve(data));
});