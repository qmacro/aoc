const { indexOf, length, curry, apply, add, min, minBy, divide, __, lift, pluck, max, intersection, reduce, inc, dec, last, range, concat, equals, juxt, compose, head, tail, map, split } = require('ramda')
const { fasterIntersection, parseFile } = require('./lib/utils')
const input = parseFile('03')

const DIRECTION = 0, DISTANCE = 1

// Parses a single segment into direction and distance
// R75 -> ['R', 75]
const parseSegment = juxt([head, compose(Number, tail)])

// Parses an entire path trace into a set of parsed segments
// 'R75,D30,U83,...' -> [['R', 75], ['D', 30], ['U', 83], ...]
const parseTrace = compose(map(parseSegment), split(/,/))

// Direction functions, modifies a given coord appropriately
// (origin 0,0 is in bottom left corner)
const dir = {
  'L': ([x, y]) => ([dec(x), y]),
  'R': ([x, y]) => ([inc(x), y]),
  'U': ([x, y]) => ([x, inc(y)]),
  'D': ([x, y]) => ([x, dec(y)])
}

// Calculates all the coords for a single segment (incl origin)
// ([0,0], ['R', 2]) -> [[0,0], [1,0], [2,0]]
const segmentCoords = (start, segment) => reduce(
  (a, x) => concat(a, [dir[segment[DIRECTION]](last(a))]),
  [start],
  range(0, segment[DISTANCE])
)

// Returns coords for an entire path of segments
// ([0,0], [['R',2], ['U',3]]) -> [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [2, 3]]
const pathCoords = (start, path) => reduce(
  (a, x) => concat(a, tail(segmentCoords(last(a), x))),
  [start],
  path
)

const determineCrossovers = ([trace1, trace2]) => {
  const path1 = pathCoords([0,0], parseTrace(trace1))
  const path2 = pathCoords([0,0], parseTrace(trace2))
  return fasterIntersection(path1, path2)
}

const part1 = ([trace1, trace2]) => {

  // Calculates the sum of absolute values of x and y in a coord
  // [1,2] -> 3, [4,-5] -> 9
  const sumAbsCoords = compose(apply(add), lift(Math.abs))

  const crossovers = determineCrossovers([trace1, trace2])
  const nearest = reduce(minBy(sumAbsCoords), [Infinity,Infinity], tail(crossovers))
  return sumAbsCoords(nearest)
}

const part2 = (traces) => {
  const [path1, path2] = map(t => pathCoords([0,0], parseTrace(t)), traces)
  const crossovers = tail(fasterIntersection(path1, path2))
  const closest = compose(reduce(min, Infinity), map(apply(add)))
  return closest(map(crossover => map(indexOf(crossover), [path1, path2]), crossovers))
}


const testsets = [

  // -> First part - distance
  {
    fn: part1,
    data: [
      [['R8,U5,L5,D3','U7,R6,D4,L4'], 6],
      [['R75,D30,R83,U83,L12,D49,R71,U7,L72','U62,R66,U55,R34,D71,R55,D58,R83'], 159],
      [['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51','U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'], 135],
      [input, 1211]
    ],
  },

  // -> Second part - steps
  {
    fn: part2,
    data: [
      [['R8,U5,L5,D3','U7,R6,D4,L4'], 30],
      [['R75,D30,R83,U83,L12,D49,R71,U7,L72','U62,R66,U55,R34,D71,R55,D58,R83'], 610],
      [['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51','U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'], 410],
      [input, 101386]
    ]
  }
]

const runTest = (fn, [input, res]) => ([equals(fn(input), res) ? '✔' :  '❌', res])
console.log(map(testset => map(data => runTest(testset['fn'], data), testset['data']), testsets))


const a = _ => part1(input)
const b = _ => part2(input)


module.exports = { a, b }


