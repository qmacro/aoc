// Advent of Code
// Day 9 Puzzle A

const
R = require('ramda'),

nor = R.compose(R.not, R.or),

// Solution
solve = x => {
    if (x.length === 0) return 0;
    var level = 0,
        score = 0,
        garbage = false;
    while (x.length > 0) {
        const c = x[0];
        switch (c) {
            case '{':
                if (!garbage) score += ++level;
                break;
            case '}':
                if (!garbage) level--;
                break;
            case '<':
                garbage = true;
                break;
            case '>':
                garbage = false;
                break;
            case '!':
                if (garbage) x = x.slice(1);
                break;
        }
        x = x.slice(1);
    }
    return score;
}

tests = [
    ["{}", 1],
    ["{{{}}}", 6],
    ["{{},{}}", 5],
    ["{{{},{},{{}}}}", 16],
    ["{<a>,<a>,<a>,<a>}", 1],
    ["{{<ab>},{<ab>},{<ab>},{<ab>}}", 9],
    ["{{<!!>},{<!!>},{<!!>},{<!!>}}", 9],
    ["{{<a!>},{<a!>},{<a!>},{<ab>}}", 3],
    ["{{<!!'!!!>},<>},{<o!>},<u!!i!!'!>,<!!!>,e{'e!!!>},<!i>}}", 5],
    //{{            },{                                     }}
    ["{<{o'i!a,<{i<a>}", 1]
];

// Execute tests, all should return true
console.log(R.all(([i, o]) => solve(i) == o, tests));
console.log(R.filter(test => solve(test[0]) !== test[1], tests));

// Invoke solution on input
require('fs').readFile(__dirname + '/input.dat', 'utf8', (err, data) => {
    console.log(solve(data));
});