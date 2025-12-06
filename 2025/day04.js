#!/usr/bin/env node

const U = require('./util.js')

const input = U.getInput(__filename)
  .split(/\n/)
  .map(x => x.split(''))

const range = ([start, end]) =>
  (new Array(end - start + 1))
    .fill(undefined)
    .map((_, i) => i + start)

const neighbours = (d, r, c) => {
  const rows = d.length - 1
  const cols = d[0].length - 1
  return range([-1, 1]).map(x => {
    return range([-1, 1]).map(y => {
      const a = r + x, b = c + y
      if (x == 0 && y == 0) return ' '     // self
      if (a < 0 || b < 0) return ' '       // out of bounds
      if (a > rows || b > cols) return ' ' // out of bounds
      return d[a][b]
    })
  })
}

String.prototype.matcha = function(regexp) {
  return this.match(regexp) || []
}

const count = (char, d) => U.stringify(d)
  .matcha(new RegExp(char, 'g'))
  .length

console.log(
  input
    .flatMap((r, ri) => {
      return r.map((c, ci) => {
        return [ri, ci, c, count('@', neighbours(input, ri, ci))]
      })
    })
    .filter(x => x[2] == '@' && x[3] < 4)
    .length
)
