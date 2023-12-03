// Advent of Code
// Day 6 Puzzle A

const
	R = require('ramda'),

	splitChar = "-",

	redistribute = xs => {
		let highestValue = R.reduce(R.max, 0, xs),
				candidateIndex = R.findIndex(R.equals(highestValue), xs),
				banks = R.length(xs),
				equalShare = Math.floor(R.divide(highestValue, banks)),
				remainderTotal = R.modulo(highestValue, banks),
				remainderDistribution = R.map(
					R.modulo(R.__, banks), 
					R.range(candidateIndex + 1, candidateIndex + 1 + remainderTotal)
				),
				remainderPerBank = R.divide(R.length(remainderDistribution), remainderTotal);

		return R.pipe(
				R.update(candidateIndex, 0),
				R.map(R.add(equalShare)),
				R.reduce((a,x) => R.adjust(R.add(remainderPerBank), x, a), R.__, remainderDistribution)
		)(xs)
	},

	// Solution
	solve = (x) => {

		return R.dec(R.length(R.until(
			xs => {
				console.log(xs);
				return R.indexOf(R.head(xs), R.tail(xs)) > -1;
			},
			xs => {
				const fromPattern = x => R.map(x => x * 1, R.split(splitChar, x)),
					toPattern = xs => R.join(splitChar, xs);
				return R.prepend(toPattern(redistribute(fromPattern(R.head(xs)))), xs);
			},
			[x]
		)))
	},

	tests = [
		["0-2-7-0", 5]
		//["0	2	7	0", 5]
	];

// Execute tests, all should return true
console.log(R.all(([i, o]) => solve(i) === o, tests));

return;

// Invoke solution on input
require('fs').readFile(__dirname + '/input.dat', 'utf8', (err, data) => {
	console.log(solve(data));
});
