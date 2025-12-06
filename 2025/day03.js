#!/usr/bin/env node

const U = require('./util.js')

const input = U.getInput(__filename)
  .split(/\n/)
  .map(x => x.split(''))

console.log(
  input
    .map(x => {
      const first = Math.max(...x.slice(0, -1))
      const second = Math.max(...x.slice(1 + x.findIndex(U.is(first))))
      return Number([first, second].join(''))
    })
    .reduce(U.add, 0)
)
