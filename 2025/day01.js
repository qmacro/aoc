#!/usr/bin/env node

const U = require('./util.js')

const input = U.getInput(__filename)
  .split('\n')
  .slice(0, -1)

console.log(
  input
    .reduce(
      (a, [dir, ...digits]) => {
        const p = a.length ? a.slice(-1)[0] : 50
        const n = Number(digits.join(''))
        const d = dir == 'L' ? 100 - n : n
        const v = p + d
        a.push(v % 100)
        return a
      }, []
    )
    .filter(x => x == 0)
    .length
)
