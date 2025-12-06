#!/usr/bin/env node

const U = require('./util.js')

const input = U.getInput(__filename)
  .split(/\n\n/)

const freshRanges = input[0]
  .split(/\n/)
  .map(x => x.split(/-/).map(Number))

const ingredients = input[1]
  .split(/\n/).map(Number)

const isFresh = (freshRanges, x) =>
  freshRanges.some(r => U.isInRange(r, x))

console.log(
  ingredients
    .filter(x => isFresh(freshRanges, x))
    .length
)
