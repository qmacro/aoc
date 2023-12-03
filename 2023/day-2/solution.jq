#!/usr/bin/env -S jq -s -R -f

# GENERAL FUNCTIONS

# Assumes data filenames are in the form <part>-<test|real>.dat
def part: input_filename | split("-") | first;

# Parses input string into separate records
def records: split("\n")[:-1];

# Reverses a string, e.g. "hello" -> "olleh"
def reverseString: split("") | reverse | join("");

# SOLUTION-SPECIFIC FUNCTIONS

# Return set info for a game, structured like this
# [
#   { "blue": "3", "red": "4" },
#   { "red": "1", "green": "2", "blue": "6" },
#   { "green": "2" }
# ]
def gameSets: 
    map(split(",") | map(ltrimstr(" ") | split(" ") | { (last): first }) | add)
;

records
| map(
    split(":")
    | .[1] | split(";")
)
| map(gameSets)





















