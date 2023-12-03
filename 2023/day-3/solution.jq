#!/usr/bin/env -S jq -s -R -f

# GENERAL FUNCTIONS

# Assumes data filenames are in the form <part>-<test|real>.dat
def part: input_filename | split("-") | first;

# Parses input string into separate records
def records: split("\n")[:-1];

# Reverses a string, e.g. "hello" -> "olleh"
def reverseString: split("") | reverse | join("");

# SOLUTION-SPECIFIC FUNCTIONS

# Given data for a row, represented by an object in a structure like this:
# [
#   { ... },
#   {
#     "key": 1,
#     "value": "...*......"
#   },
#   { ... }
# ]
# (that is this row, indicated with the arrow, from the test input)
# 467..114..
# ...*...... <--
# ..35..633.
# then return a list of coordinates for any symbols
# found on that row. For the above indicated row, this function
# would return [[1,3]] (for the * symbol).
def findSymbolCoordsInRow:
    .key as $row
    | .value
    | [match("[^\\.\\d]";"g")]
    | map([$row, .offset])
;

def findPartNumbersInRow:
    .key as $row
    | .value
    | [match("[\\d]+";"g")]
    | map({row: $row, col: .offset, len: .length, num: .string | tonumber})
;


if part == "1" then

    records
    | to_entries
    | ( map(findSymbolCoordsInRow) | add) as $symbolcoords
    | ( map(findPartNumbersInRow) | add) as $partnumbers
    | .

else

    null

end
