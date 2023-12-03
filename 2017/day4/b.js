// Advent of Code
// Day 4 Puzzle B

const
	R = require('ramda'),

	words = R.split(/\s/),

	/**
	 * Determines whether two words are anagrams, by sorting the
	 * letters of each into alphabetical order and comparing.
	 */
	isAnagram = R.curry((a, b) => {
		const lettersInOrder = R.compose(R.sort(R.ascend(R.identity)), R.split(''));
		return R.apply(R.equals, R.map(lettersInOrder, [a, b]));
	}),

	/**
	 * Produces a list of combos (pairs) of elements from a given
	 * list. For example [1,2,3,4] would produce [[1,2], [1,3], [1,4],
	 * [2,3], [2,4], [3,4]].
	 */
	allCombos = xs => {
		const intCombo = xs => {
			let a = R.head(xs), b = R.tail(xs);
			if (b.length) {
				return R.flatten([intCombo(b), R.map(x => [a, x], b)]);
			}
		};
		return R.splitEvery(2, R.filter(R.identity, intCombo(xs)));
	},

	/**
	 * Given a phrase, returns true if there are no anagrams
	 * amongst the words.
	 */
	hasNoAnagrams = phrase => {
		let w = words(phrase);
		return R.none(
			R.identity,
			R.map(R.apply(isAnagram), allCombos(w))
		);
	},

	// Solution
	solve = R.pipe(
		R.split(/\n/),
		R.filter(hasNoAnagrams),
		R.length
	),

	tests = [
		['abcde fghij', true],
		['abcde xyz ecdab', false],
		['a ab abc abd abf abj', true],
		['iiii oiii ooii oooi', true],
		['oiii ioii iioi iiio', false]
	];

// Execute tests, all should return true
console.log(R.all(([i, o]) => hasNoAnagrams(i) === o, tests));

// Invoke solution on input
require('fs').readFile(__dirname + '/input.dat', 'utf8', (err, data) => {
	console.log(solve(data));
});