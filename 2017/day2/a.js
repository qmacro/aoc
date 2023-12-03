// Advent of Code
// Day 2 Puzzle A

const
	R = require('ramda'),

	// Solution
	solve = x => {

		const
			largest = R.reduce(R.max, -Infinity),
			smallest = R.reduce(R.min, Infinity),
			diff = x => largest(x) - smallest(x),
			toNum = x => x * 1,

			// Make single input string that's newline and tab separated into
			// a matrix of numbers
			matrix = R.pipe(
				R.split(/\n/),
				R.map(R.split(/\t/)),
				R.map(R.map(toNum))
			)(x);

		return R.sum(R.map(diff, matrix));

	},

	tests = [
		['5\t1\t9\t3\n7\t5\t3\n2\t4\t6\t8', 18]
	];

// Execute tests, all should return true
console.log(R.all(([i, o]) => solve(i) == o, tests));

// Invoke solution on input
require('fs').readFile(__dirname + '/input.dat', 'utf8', (err, data) => {
	console.log(solve(data));
});