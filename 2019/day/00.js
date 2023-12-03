const { } = require('ramda')
const input = require('./lib/utils').parseFile('00')

a = _ => 'a'
b = _ => 'b'

/**
 * TESTS
 */
all(equals(true), [
  equals(a('testdata'), 42)
]) || console.log("ERROR in part 1 tests")

module.exports = {a, b}
