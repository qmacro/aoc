#!/usr/bin/env node

const U = require('./util.js')

const input = U.getInput(__filename)
  .split(',')
  .map(x => x.split('-').map(Number))

const isInvalid = x => {
  const s = String(x),
    h = s.length / 2
  return s.slice(0, h) === s.slice(h)
}

console.log(
  input
    .map(U.range)
    .map(x => x.filter(isInvalid).reduce(U.add, 0))
    .reduce(U.add, 0)
)
