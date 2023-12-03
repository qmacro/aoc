// Advent of Code
// Day 8 Puzzle A

const
R = require('ramda'),

// Solution
solve = x => {

	"use strict";

	const
		operations = {
			"inc" : R.add,
			"dec" : R.compose(R.add, R.negate),
			">"   : R.gt,
			">="  : R.gte,
			"<"   : R.lt,
			"<="  : R.lte,
			"=="  : R.equals,
			"!="  : R.complement(R.equals)
		},
		parseStatement = x => {
			let matches = x.match(/^(\w+) (inc|dec) (-?\d+) if (\w+) ([!<>=]+) (-?\d+)$/);

			return {
				reg : matches[1],
				op : operations[matches[2]](matches[3] * 1),
				cond: {
					reg : matches[4],
					op : operations[matches[5]],
					val : matches[6] * 1
				}
			};

		};

	return R.pipe(
		R.split(/\n/),
		R.map(parseStatement),
		R.reduce((registers, s) => {
			registers[s.reg] = s.cond.op(registers[s.cond.reg] || 0, s.cond.val)
				? s.op(registers[s.reg] || 0)
				: registers[s.reg] || 0;
			return registers;
		}, {}),
		R.values,
		R.reduce(R.max, 0)
	)(x)

};

// Invoke solution on input
require('fs').readFile(__dirname + '/input.dat', 'utf8', (err, data) => {
	console.log(solve(data));
});
