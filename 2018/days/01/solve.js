function solve(input, part) {
    return (part === 1) ? part1(input) : part2(input);
}

const numbers = xs => xs.map(Number);

const part1 = input => numbers(input).reduce((a, x) => a + x, 0);

const part2 = input => {
    const cleanInput = numbers(input);
    const seen = (() => {
        const freqs = [];
        return x => {
            if (freqs.indexOf(x) > -1) {
                return true;
            } else {
                freqs.push(x);
                return false;
            }
        }
    })();
    let freq = idx = 0;

    while (!seen(freq)) {
        freq += cleanInput[idx];
        idx = (idx + 1) % cleanInput.length;
    }

    return freq;

}

const expected = part => part === 1 ? 406 : 312;

module.exports = {solve, expected};