function solve(input, part) {
	return (part === 1) ? part1(input) : undefined
}

Array.prototype._lastElement = function() {
	return this[this.length - 1]
}

const partitionWhen = (fn, xs) => {
  const elements = Array.from(xs)
  return elements.reduce((a, x) => {

    // Get the most recent partition or start with a new one
    // if there aren't any
    const mostRecent = a._lastElement() || []

    // If the partition is new, or the condition is not met
    // then add the new element to that partition
    if (mostRecent.length === 0 || !fn(mostRecent._lastElement(), x)) {
      mostRecent.push(x)
      a.pop()
      a.push(mostRecent)
    }

    // Otherwise the condition has been met, so time to
    // create a new partition and add the element to that one
    else {
      a.push([x])
    }
    return a
  }, [])
}


const notSame = (a, b) => a != b
const sortedElements = x => Array.from(x).sort()
const hasPairs = x => x.find(x => x.length === 2) !== undefined
const hasTriples = x => x.find(x => x.length === 3) !== undefined
	
const part1 = input => {

	// input elements look like this: ubkfmdjxyzlbgkrotcepvswaqx
	const [pairs, triples] = input.reduce((a, x) => {

		const groups = partitionWhen(notSame, sortedElements(x))
		hasPairs(groups) && a[0]++;
		hasTriples(groups) && a[1]++;

		return a

	}, [0, 0])

	return pairs * triples;
}

const expected = part => part === 1 ? 5727 : 0

module.exports = {solve, expected}
