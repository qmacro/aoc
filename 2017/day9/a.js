// Advent of Code
// Day 9 Puzzle A

const
	R = require('ramda'),

	nor = R.compose(R.not, R.or),

	// Solution
	solve = x => {

		"use strict";

		let result = R.reduce((a, x) => {
			if (a.skipNext) {
				a.skipNext = false;
				return a;
			}

			switch (x) {
				case "!":
					a.skipNext = true;
					break;
				case "<":
					a.garbage = R.not(a.negation);
					break;
				case ">":
					a.garbage = a.negation ? a.garbage : false;
					break;
				case "{":
					if (nor(a.negation, a.garbage)) {
						a.level++;
						a.score += a.level;
					}
					break;
				case "}":
					if (nor(a.negation, a.garbage)) {
						a.level--;
					}
					break;
				default:
					// NOP
			};

			return a;

		}, {
			level : 0,
			score : 0,
			garbage : false,
			skipNext : false
		}, x);

		 return result.score;

	},

	tests = [
		["{}", 1],
		["{{{}}}", 6],
		["{{},{}}", 5],
		["{{{},{},{{}}}}", 16],
		["{<a>,<a>,<a>,<a>}", 1],
		["{{<ab>},{<ab>},{<ab>},{<ab>}}", 9],
		["{{<!!>},{<!!>},{<!!>},{<!!>}}", 9],
		["{{<a!>},{<a!>},{<a!>},{<ab>}}", 3],
    ["{{<!!'!!!>},<>},{<o!>},<u!!i!!'!>,<!!!>,e{'e!!!>},<!i>}}", 5]
	];

// Execute tests, all should return true
console.log(R.all(([i, o]) => solve(i) == o, tests));
console.log(R.filter(test => solve(test[0]) !== test[1], tests));

// Invoke solution on input
require('fs').readFile(__dirname + '/input.dat', 'utf8', (err, data) => {
	console.log(solve(data));
});
