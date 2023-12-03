const adjust_x = {
    0 : 0,
   90 : 1,
  180 : 0,
  270 : -1
};

const adjust_y = {
    0 : 1,
   90 : 0,
  180 : -1,
  270 : 0
};

/**
 * Calculates the new orientation, given an L or R direction
 * Orientation is in degrees, either 0, 90, 180 or 270 which
 * represent N, E, S or W respectively.
 * @param {int} deg current orientation (in degrees)
 * @param {string} dir direction (L or R)
 */
const orientation = (deg, dir) => {
  let change = dir[0] === "L" ? -90 : 90,
      newdeg = deg + change;
  return (newdeg < 0 ? 360 + newdeg : newdeg) % 360;
};

/**
 * Processes an instruction "step", such as "R3".
 * Calculates the new state, in the form of direction (in
 * degrees) and * x,y coordinates, from the current state.
 * @param {array} cur Current state (direction, x, y)
 * @param {string} s Instruction step
 */
const process_step = ([d, x, y], s) => {
  let dist = s.slice(1),
      degr = orientation(d, s.slice(0, 1));
  return [
    degr,
    x + (adjust_x[degr] * dist),
    y + (adjust_y[degr] * dist)
  ];
};

/**
 * Calculates the distance from 0,0 as the sum of the
 * absolute values of x and y.
 * @param {int} x value of x
 * @param {int} y value of y
 */
const distance = ([x, y]) => [x, y]
  .map(x => Math.abs(x))
  .reduce((a, x) => a + x);

// Testing based on samples given
// distance("R2, R2, R2".split(/, /).reduce(step, [0, 0, 0]).slice(1))
// distance("R5, L5, R5, R3".split(/, /).reduce(step, [0, 0, 0]).slice(1))

let steps = "L2, L3, L3, L4, R1, R2, L3, R3, R3, L1, L3, R2, R3, L3, R4, R3, R3, L1, L4, R4, L2, R5, R1, L5, R1, R3, L5, R2, L2, R2, R1, L1, L3, L3, R4, R5, R4, L1, L189, L2, R2, L5, R5, R45, L3, R4, R77, L1, R1, R194, R2, L5, L3, L2, L1, R5, L3, L3, L5, L5, L5, R2, L1, L2, L3, R2, R5, R4, L2, R3, R5, L2, L2, R3, L3, L2, L1, L3, R5, R4, R3, R2, L1, R2, L5, R4, L5, L4, R4, L2, R5, L3, L2, R4, L1, L2, R2, R3, L2, L5, R1, R1, R3, R4, R1, R2, R4, R5, L3, L5, L3, L3, R5, R4, R1, L3, R1, L3, R3, R3, R3, L1, R3, R4, L5, L3, L1, L5, L4, R4, R1, L4, R3, R3, R5, R4, R3, R3, L1, L2, R1, L4, L4, L3, L4, L3, L5, R2, R4, L2";

console.log(
  distance(
    steps
      .split(/, /)
      .reduce(process_step, [0, 0, 0])
      .slice(1)
  )
);
