const { zip, apply, equals, length, prepend, drop, takeWhile, curry, sum, keys, compose, reduce, assoc, reverse, map, split, pipe } = require('ramda')
const { parseFile } = require('./lib/utils')

// Transforms input into map of orbiter:orbitee pairs
// COM)B
// B)C
// C)D
// ...
// -> { "B": "COM", "C": "B", "D": "C", ... }
const input = pipe(
  parseFile,
  map(compose(reverse, split(')'))),
  reduce((a, x) => assoc(...x, a), {})
)('06')

// Count direct and indirect orbitees for a given orbiter x
// (<input>, "D") -> 3
const countOrbits = curry((orbitMap, x) => {
  const orbitee = orbitMap[x]
  if (orbitee === undefined) return 0
  return 1 + countOrbits(orbitMap, orbitee)
})

// Part 1: Calculate sum of all the orbitees for all orbiters
const part1 = sum(map(countOrbits(input), keys(input)))

// Determine the complete orbit path, i.e.:
// orbiter -> direct orbitee -> indirect orbitee -> indirect orbitee -> ...
// for a given orbiter
const orbitPath = curry((orbitMap, x) => {
  const orbitee = orbitMap[x]
  if (orbitee === undefined) return []
  return prepend(orbitee, orbitPath(orbitMap, orbitee))
})

// This lovely function is from Joseph. It takes two lists and strips
// off all the matching pairs until the pairs diverge.
// e.g. [[1,2,3,4,5], [1,2,3,6,7,8]] -> [[4,5],[6,7,8]] (1,2 and 3 are stripped)
const removeLongestCommonPrefix = ([x, y]) =>
  map(drop(length(takeWhile(apply(equals), zip(x, y)))), [x, y])

// Part 2: Calculate the number of transfers left after the two orbit
// paths have converged.
const part2 = pipe(
  map(compose(reverse, orbitPath(input))),
  removeLongestCommonPrefix,
  map(length),
  sum
)(["YOU", "SAN"])


a = _ => part1
b = _ => part2

module.exports = {a, b}
