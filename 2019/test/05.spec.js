const day = require('../day/05')

const sample1 = ['3,0,4,0,99']
const sample2 = ['1002,4,3,4,33']

describe('Initial state parsing from parseFile\'d source', () => {
  it('Parses initial program state', () => {
    expect(day.parseInitialState(sample1)).toEqual([3,0,4,0,99])
    expect(day.parseInitialState(sample2)).toEqual([1002,4,3,4,33])
  })
})

describe('Opcode parsing', () => {
  it('Parses single digit opcodes', () => {
    expect(day.parseInstruction(1).opcode).toEqual(1)
    expect(day.parseInstruction(2).opcode).toEqual(2)
  })
  it('Parses double digit opcodes', () => {
    expect(day.parseInstruction(99).opcode).toEqual(99)
  })
  it('Parses opcodes with more than two digits', () => {
    expect(day.parseInstruction(1002).opcode).toEqual(02)
  })
})

describe('Param mode parsing', () => {
  it('Determines the explicit mode of a single param', () => {
    expect(day.parseInstruction(102).pmode(1)).toEqual(1)
    expect(day.parseInstruction(123).pmode(1)).toEqual(1)
    expect(day.parseInstruction(1023).pmode(1)).toEqual(0)
    expect(day.parseInstruction(1023).pmode(2)).toEqual(1)
  })
  it('Determines the implicit mode of a single param', () => {
    expect(day.parseInstruction(2).pmode(1)).toEqual(0)
    expect(day.parseInstruction(123).pmode(2)).toEqual(0)
    expect(day.parseInstruction(1).pmode(10)).toEqual(0)
  })
})

describe(`Param value determination ${sample2}`, () => {
  const pointer = 0
  it('Gets an indirect value (position mode)', () => {
    expect(day.getParam(day.parseInstruction(1002), [1002,4,3,4,33], pointer, 1).value).toEqual(33)
  })
  it('Gets a direct value (immediate mode)', () => {
    expect(day.getParam(day.parseInstruction(1002), [1002,4,3,4,33], pointer, 2).value).toEqual(3)
  })
  it('Gets a value via implicit mode', () => {
    expect(day.getParam(day.parseInstruction(1002), [1002,4,3,4,33], pointer, 3).value).toEqual(33)
  })
})

describe(`Param address determination ${sample2}`, () => {
  const pointer = 0
  it('Gets an address via indirect value (position mode)', () => {
    expect(day.getParam(day.parseInstruction(1002), [1002,4,3,4,33], pointer, 1).address).toEqual(4)
  })
})

describe(`Puzzle answers`, () => {
  it('Solves part 1', () => {
    expect(day.a()).toEqual(9961446)
  })
  it('Solves part 2', () => {
    expect(day.b()).toEqual(742621)
  })
})

