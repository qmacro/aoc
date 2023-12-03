// Advent of Code
// Day 4 Puzzle A

const
	R = require('ramda'),

	isValid = phrase => {
		let words = R.split(/\s/, phrase);
		return R.equals(R.length(words), R.length(R.uniq(words)));
	},

	// Solution
	solve = R.pipe(
		R.split(/\n/),
		R.filter(isValid),
		R.length
	),

	tests = [
		['aa bb cc dd ee', true],
		['aa bb cc dd aa', false],
		['aa bb cc dd aaa', true]
	];

// Execute tests, all should return true
// console.log(R.all(([i, o]) => isValid(i) === o, tests));

// Invoke solution on input
require('fs').readFile(__dirname + '/input.dat', 'utf8', (err, data) => {
	console.log(solve(data));
});