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

# Produce an array of objects representing part numbers, each with
# row, column, length and actual value information.
def findPartNumbersInRow:
    .key as $row
    | .value
    | [match("[\\d]+";"g")]
    | map({row: $row, col: .offset, len: .length, num: .string | tonumber})
;

# Given a part number object (as produced by findPartNumbersInRow), calculate
# generously all the cells around it, i.e. every single cell marked X in this
# example for the part number 42 (actually the row/col coords for 4 and 2 are
# also included, as are any "out of bounds cells on rows or columns that are 
# just outside the bounds of the schematic, this is to keep things simple):
# ..XXXX.....
# ..X42X.....
# ..XXXX.....
def calcAdjacentCells:
    . as $p
    | [range($p.row - 1; $p.row + 2) | reduce . as $r ([]; 
        . + [range($p.col - 1; $p.col + $p.len + 1) | reduce . as $c ([]; 
        . + [$r, $c]
        )]
    )] | add
;

# Given a part number object, work out whether it has a symbol adjacent to it.
# Do this by comparing the array of all the adjacent cells with the array of
# all the symbol cells. The (amazing) magic of jq's array subtraction gives us
# the 'remainder' and if the length of that remainder is not the original length
# of the symbol cells array, we know there's a match i.e. at least one symbol
# cell that's adjacent. 
def hasAdjacentSymbol($s):
    ($s | length) as $totalSymbols
    | ($s - calcAdjacentCells | length) as $remainingSymbols
    | $totalSymbols != $remainingSymbols
;

if part == "1" then

    records
    | to_entries
    | ( map(findSymbolCoordsInRow) | add) as $symbolCoords

    | map(findPartNumbersInRow) | add
    | map(select(hasAdjacentSymbol($symbolCoords)).num) | add

else

    null

end
