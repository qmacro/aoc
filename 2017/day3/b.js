// Advent of Code
// Day 3 Puzzle B

const
	R = require('ramda'),

	// Solution
	solve = x => {
		'use strict';

		/**
		 * The X,Y coordinates of cells in the spiral are predictable, following a
		 * pattern like this:
		 * 
		 * n    x   y    xdiff ydiff
		 * 1    0   0      0     0
		 * 2    1   0      1     0
		 * 3    1   1      0     1
		 * 4    0   1     -1     0
		 * 5   -1   1     -1     0
		 * 6   -1   0      0    -1
		 * 7   -1  -1      0    -1
		 * 8    0  -1      1     0
		 * 9    1  -1      1     0
		 * 10   2  -1      1     0
		 * ...
		 * 
		 * So we'll build a 'relativeStep' generator to generate those values.
		 */
		function* relativeStep() {

			const
				flip = x => x === 0 ? 1 : 0;

			let n = 0,
				size = 1,
				sign = 1,
				loop;

			while(true) {

				/**
				 * Have to do this twice like this as you can only
				 * yield from generator functions, not just any
				 * (e.g. callback) functions.
				 */

				// Pass 1
				loop = size;
				n = flip(n);
				while (loop--) yield [n * sign, flip(n) * sign];

				// Pass 2
				loop = size;
				n = flip(n);
				while (loop--) yield [n * sign, flip(n) * sign];

				// Flip sign around too, and increment the size to 
				// reflect the next-biggest concentric square
				sign = sign * -1;
				size++;

			}

		}
		
		const

			// A function to work out whether two X,Y cells are adjacent
			isAdjacentCell = R.curry((cell1, cell2) => {
				let x = Math.abs(cell1.x - cell2.x),
					y = Math.abs(cell1.y - cell2.y);
				return x <= 1 && y <= 1;
			}),

			// Instantiate the generator
			gen = relativeStep();


		/**
		 * OK, we're ready. The idea is to keep generating X,Y coordinate
		 * cells. On each one, check the previous cells and sum the values
		 * of those cells that are adjacent to the new one. Do this until
		 * the sum is greater than the value passed to this solve function.
		 */
		let result = R.until(
			cells => { return R.last(cells).sum > x; },
			cells => {
				let newcell = R.clone(R.last(cells)),
					relCoords = gen.next().value;

				// Give the new cell the right X,Y coordinates
				newcell.x = newcell.x + relCoords[0];
				newcell.y = newcell.y + relCoords[1];

				// Work out the list of adjacent cells
				let adjacentCells = R.filter(isAdjacentCell(newcell), cells);
				newcell.sum = R.reduce((a, x) => a + x.sum, 0, adjacentCells);
				cells.push(newcell);
				return cells;
			}
		)([ { x : 0, y : 0, sum : 1 } ]);

		return R.last(result).sum;

	};

// Invoke solution on input
require('fs').readFile(__dirname + '/input.dat', 'utf8', (err, data) => {
	console.log(solve(data));
});