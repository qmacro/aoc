// Advent of Code
// Day 2 Puzzle B

const
	R = require('ramda'),

	// Solution
	solve = x => {

		const
			/**
			 * isInt
			 * Predicate function that says if a number is an integer or not
			 * isInt(1.23) -> false
			 * isInt(1) -> true
			 */
			isInt = x => x === Math.floor(x),

			/**
			 * numList
			 * Turns a string of tab-separated number strings into a
			 * list of actual numbers.
			 * numList('1\t2\t3') -> [1,2,3]
			 */
			numList = R.compose(R.map(R.multiply(1)), R.split(/\s/)),

			/**
			 * numMatrix
			 * Turns a string of newline-separated tab-separated strings
			 * of number strings into a matrix of actual numbers.
			 * numMatrix('1\t2\n3\t4\n5\t6\t7') -> [[1,2], [3,4], [5,6,7]]
			 */
			numMatrix = R.compose(R.map(numList), R.split(/\n/)),

			/**
			 * rot
			 * A rotate function, that takes 2 parameters:
			 * - a list to be rotated
			 * - the number of positions to rotate
			 * The parameters are this way round so that we can 
			 * iterate and vary the rotate position (in divisors)
			 */
			rot = R.flip(R.compose(R.flatten, R.reverse, R.splitAt)),

			/**
			 * divisors
			 * Takes a list of numbers and produces all the possible
			 * numbers to apply a divide to (via a second list), which
			 * is all of them apart from the number in question.
			 * For example, given the input [1, 2, 3, 4] the divisors
			 * generated are [[2,3,4,1], [3,4,1,2], [4,1,3,2]]
			 */
			divisors = xs => R.map(rot(xs), R.range(1, R.length(xs))),

			/**
			 * evenDiv
			 * Returns the difference of the only two numbers in a list
			 * that can be divided evenly. 
			 * evenDiv([5,9,2,8]) -> 4 
			 */
			evenDiv = xs => R.head(
				R.filter(
					isInt,
					R.map(
						R.apply(R.divide),
						R.chain(R.zip(xs), divisors(xs))
					)
				)
			);

		/**
		 * OK, we're ready. Turn the input string into a number matrix,
		 * map the evenDiv function over each of the rows to get a value
		 * and then add them together.
		 */
		return R.sum(R.map(evenDiv, numMatrix(x)));

	},

	tests = [
		['5\t9\t2\t8\n9\t4\t7\t3\n3\t8\t6\t5', 9]
	];

// Execute tests, all should return true
console.log(R.all(([i, o]) => solve(i) == o, tests));

// Invoke solution on input
require('fs').readFile(__dirname + '/input.dat', 'utf8', (err, data) => {
	console.log(solve(data));
});