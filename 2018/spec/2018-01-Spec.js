let { solve } = require("../days/01/solve")

describe("2018 day 1", function() {
    it ("solves the part 1 test case", function() {
        const part1TestInput = "+1, -2, +3, +1".split(/, /);
        let solution = solve(part1TestInput, 1);
        expect(solution).toEqual(3);
    })
    it ("solves the part 2 test case", function() {
        const part2TestInput = "+1, -2, +3, +1".split(/, /);
        let solution = solve(part2TestInput, 2);
        expect(solution).toEqual(2);
    })
});