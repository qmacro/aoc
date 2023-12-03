let { solve } = require("../days/02/solve")

describe("2018 day 2", function() {
    it ("solves the part 1 test case", function() {
        const testInput = "abcdef,bababc,abbcde,abcccd,aabcdd,abcdee,ababab".split(/,/)
        expect(solve(testInput, 1)).toEqual(12);
    })
});
