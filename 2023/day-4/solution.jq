#!/usr/bin/env -S jq -s -R -f

# GENERAL FUNCTIONS

# Assumes data filenames are in the form <part>-<test|real>.dat
def part: input_filename | split("-") | first;

# Parses input string into separate records
def records: split("\n")[:-1];

# Reverses a string, e.g. "hello" -> "olleh"
def reverseString: split("") | reverse | join("");

# SOLUTION-SPECIFIC FUNCTIONS

# Takes a string representing a row of whitespace separated numbers
# and turns it into a clean array of actual numbers. For example:
# " 41 48 93 96 17 " -> [41, 48, 93, 96, 17]
def rowToNumArray:
    
    split("\\s";"")
    | map(select(length > 0) | tonumber)

;

# Takes a card record and parses it into an object with a 'winning'
# property and a 'have' property, each of those being an array of numbers.
# E.g. turns "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53" into
# { "winning": [ 41, 48, 83, 86, 17 ], "have": [ 83, 86, 6, 31, 17, 9, 48, 53 ] }
def parseCard:

    split("[:\\|]";"")
    | {
        winning: .[1] | rowToNumArray,
        have: .[2] | rowToNumArray
    }

;

records

# Parse each card
| map(parseCard)

# Then take each card and work out how many winning numbers there are
| map((.have | length) - ((.have - .winning) | length))

# For those that have any (> 0) winning numbers, calculate the points
| map(select(. > 0) | pow(2;.-1))

# And sum the points for the answer
| add
