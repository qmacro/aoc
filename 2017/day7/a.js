// Advent of Code
// Day 7 Puzzle A

const
	R = require('ramda'),

	// Solution
	solve = x => {

		let [all, supported] = R.reduce((a, x) => {
			let programs = x.match(/([a-z]+)+/g);
			return [
				R.append(R.head(programs), a[0]),
				R.concat(R.tail(programs), a[1])
			];
		}, [[], []], R.split(/\n/, x));

		return R.head(R.difference(all, supported));

	};

// Invoke solution on input
require('fs').readFile(__dirname + '/input.dat', 'utf8', (err, data) => {
	console.log(solve(data));
});
