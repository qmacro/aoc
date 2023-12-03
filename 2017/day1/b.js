// Advent of Code
// Day 1 Puzzle B

const
	R = require('ramda'),

	// Solution
	solve = x => {

		let l = R.map(x => x * 1, x.split('')),
			ll = R.concat(l, l),
			halflen = l.length / 2,
			validDigits = l.filter((x, i) => x == ll[i + halflen]);
		return validDigits.length ? R.sum(validDigits) : 0;

	},

	tests = [
		['1212', 6],
		['1221', 0],
		['123425', 4],
		['123123', 12],
		['12131415', 4]
	];

// Execute tests, all should return true
console.log(R.all(([i, o]) => solve(i) == o, tests));

// Invoke solution on input
require('fs').readFile(__dirname + '/input.dat', 'utf8', (err, data) => {
	console.log(solve(data));
});