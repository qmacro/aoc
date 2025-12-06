const fs = require('fs');
const path = require('path');

const getInput = (f) => {
  const ext = process.env.TEST ? '.tst' : '.dat'
  const inputPath = 'inputs/' + path.basename(f).replace('.js', ext);
  return fs.readFileSync(inputPath, 'utf8').trim();
}

const add = (a, b) => a + b

const range = ([start, end]) =>
  (new Array(end - start + 1))
    .fill(undefined)
    .map((_, i) => i + start)

const is = a => x => x == a

const stringify = d => d.map(r => r.join('')).join('')

const isInRange = (range, x) => x >= range[0] && x <= range[1]

module.exports = {
  getInput,
  add,
  range,
  is,
  stringify,
  isInRange,
}
