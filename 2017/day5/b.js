// Advent of Code
// Day 5 Puzzle B

const
R = require('ramda'),

	jump = ([pos, maze]) => [pos + maze[pos], R.adjust(x => x >= 3 ? x - 1 : x + 1, pos, maze)],

	// Solution
	solve = ([pos, maze]) => {

		let c = 0; // some shame here

		R.until(
			([pos, maze]) => { c++; return pos >= maze.length },
			jump,
			[pos, maze]);

		return --c;

	},

	tests = [
		[[0, [0, 3, 0, 1, -3]], 10]
	];

// Execute tests, all should return true
//console.log(R.all(([i, o]) => solve(i) === o, tests));

// Invoke solution on input
require('fs').readFile(__dirname + '/input.dat', 'utf8', (err, data) => {
	const start = R.map(x => x * 1, R.split(/\n/, data));
	console.log(solve([0, R.take(start.length - 1, start)]));
});

