const { max, reduce, length } = require('ramda')
const input = require('./lib/utils').parseFileAsNumbers('01')

const calcFuelA = mass => Math.floor(mass / 3) - 2
const calcFuelB = mass => {
  const req = max(calcFuelA(mass), 0)
  return req ? req + calcFuelB(req) : req
}

module.exports = {
  a: _ => reduce((a, x) => a + calcFuelA(x), 0, input),
  b: _ => reduce((a, x) => a + calcFuelB(x), 0, input)
}