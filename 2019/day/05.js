/**
 * IMPORTS
 */

const { last, concat, append, apply, slice, prop, add, curry, reverse, match, find, liftN, all, not, sum, product, equals, update, __, nth, range, head, compose, map, split } = require('ramda')
const { permutations, parseFile } = require('./lib/utils')


/**
 * FUNCTIONS
 */

// Parses into initial program state
// e.g. ['1002,4,3,4,33'] -> [1002,4,3,4,33]
const parseInitialState = compose(map(Number), split(/,/), head)

// Parses out the opcode and any parameter modes from an instruction,
// returning an object that can be used to get the opcode and also the
// parameter mode for a given parameter position (1-indexed)
const parseInstruction = n => {
  const results = match(/^(\d*?)(\d{1,2})$/, String(n))
  const parsed = map(Number, [results[2]].concat(compose(split(''), reverse)(results[1])))
  return {
    opcode: nth(0, parsed),
    pmode: p => nth(p, parsed) || 0
  }
}

// Returns a parameter object with address and value, given the following:
// parsed instruction, current program state, current pointer, which parameter (1-indexed)
const getParam = curry((parsedInstruction, programState, pointer, nthParam) => {
  const address = nth(pointer + nthParam, programState)
  return {
    address,
    value: parsedInstruction.pmode(nthParam) === 0 ? programState[address] : address
  }
})

// <- pointer, program state, current output
// -> new pointer, new program state, new output, halt?
const step = (pointer, programState, currentOutput, valIn) => {

  const i = parseInstruction(nth(pointer, programState))
  const p = getParam(i, programState, pointer)
  let stepOutput = []

  // Helper function that will perform 'operator(operand1, operand2)' evaluations
  const twoOperandFunction = (i, programState, pointer, fn) => {
    const values = map(prop('value'), map(p, [1,2]))
    const result = fn(values)
    return [
      update(p(3).address, result, programState),
      add(4, pointer)
    ]
  }

  let newProgramState, newPointer
  let res
  switch (i.opcode) {

    case 1: // ADD
      //console.log("ADD:", slice(pointer, pointer + 4, programState))
      res = [newProgramState, newPointer] = twoOperandFunction(i, programState, pointer, sum)
      newProgramState = res[0]
      newPointer = res[1]
      break

    case 2: // MULTIPLY
      //console.log("MUL:", slice(pointer, pointer + 4, programState))
      res = twoOperandFunction(i, programState, pointer, product)
      newProgramState = res[0]
      newPointer = res[1]
      break

    case 3: // INPUT
      //console.log("INP:", slice(pointer, pointer + 2, programState))
      newProgramState = update(p(1).address, valIn, programState)
      newPointer = add(2, pointer)
      break

    case 4: // OUTPUT
      //console.log("OUT:", slice(pointer, pointer + 2, programState))
      stepOutput = append(programState[programState[pointer+1]], stepOutput)
      newProgramState = programState
      newPointer = add(2, pointer)
      break

    case 5: // JUMP-IF-TRUE
      newProgramState = programState
      if(getParam(i, programState, pointer, 1).value != 0) {
        newPointer = getParam(i, programState, pointer, 2).value
      } else {
        newPointer = add(3, pointer)
      }
      break

    case 6: // JUMP-IF-FALSE
      newProgramState = programState
      if(p(1).value == 0) {
        newPointer = p(2).value
      } else {
        newPointer = add(3, pointer)
      }
      break

    case 7: // LESS THAN
      newProgramState = update(p(3).address, p(1).value < p(2).value ? 1 : 0, programState)
      newPointer = add(4, pointer)
      break

    case 8: // EQUALS
      newProgramState = update(p(3).address, p(1).value == p(2).value ? 1 : 0, programState)
      newPointer = add(4, pointer)
      break
  }

  return [
    newPointer,
    newProgramState,
    concat(currentOutput, stepOutput),
    equals(nth(newPointer, newProgramState), 99) // halt?
  ]

}

const restore = (noun, verb) => compose(update(1,noun), update(2,verb))

// -> pos, state
// <- final value from pos 0
const run = (pos, program, output, valIn) => {
  switch (nth(pos, program)) {
    case 99:
      //return [nth(0, program), output]
      return last(output)
    default:
      return run(...step(pos, program, output, valIn))
  }

}

/**
* MAIN
*/

const initialState = compose(parseInitialState, parseFile)('05')

a = _ => run(0, initialState, [], 1)
b = _ => run(0, initialState, [], 5)

/**
 * EXPORTS
 */

module.exports = {
  parseInitialState,
  parseInstruction,
  getParam,
  a,
  b
}

