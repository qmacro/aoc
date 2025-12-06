#!/usr/bin/env node

const U = require('./util.js')

const input = U.getInput(__filename)
  .split(/\n/)
  .map(x => x
    .trim()
    .replace(/\s+/g, ' ')
    .split(/\s/)
  )
  .reverse()

const column = (array, i) => array.map(x => x[i])

const calc = ([op, ...nums]) => {
  const [fn, initial] = {
    '*': [(a, x) => a * x, 1],
    '+': [(a, x) => a + x, 0]
  }[op]
  return nums
    .map(Number)
    .reduce(fn, initial)
}

console.log(
  input[0]
    .map((_, i) => calc(column(input, i)))
    .reduce(U.add)
)
