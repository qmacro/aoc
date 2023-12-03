#!/usr/bin/env -S jq -s -R -f

# GENERAL FUNCTIONS

# Assumes data filenames are in the form <part>-<test|real>.dat
def part: input_filename | split("-") | first;

# Parses input string into separate records
def records: split("\n")[:-1];

# Reverses a string, e.g. "hello" -> "olleh"
def reverseString: split("") | reverse | join("");

# SOLUTION-SPECIFIC FUNCTIONS

# Return set info for a game, turning this:
# [
#   " 3 blue, 4 red",
#   " 1 red, 2 green, 6 blue",
#   " 2 green"
# ]
# 
# into this:
# [
#   { "blue": 3, "red": 4 },
#   { "red": 1, "green": 2, "blue": 6 },
#   { "green": 2 }
# ]
def gameSets: 
    map(split(",") | map(ltrimstr(" ") | split(" ") | { (last): first | tonumber }) | add)
;

def takeHigher($set;$colour):
    (if .[$colour] < $set.[$colour] then $set.[$colour] else .[$colour] end)
;

# ------------------------

# The main constraints 
12 as $RED | 13 as $GREEN | 14 as $BLUE

# Start processing the game records
| records

# For each game
| map(
    # split off the game number from the game's set list
    split(":")
    # and separate out that set list (.[1]) (they're joined by semicolons)
    # into individual sets
    | .[1] | split(";")
)

# Then take each set list
| map(

    # produce a workable game set structure
    gameSets

    # and then work out the highest number of each cube colour
    | reduce .[] as $set ({}; {
        red: takeHigher($set; "red"),
        green: takeHigher($set; "green"),
        blue: takeHigher($set; "blue")
    })
)

# This produces (for the part 1 sample data) something like this:
# [
#   {
#     "red": 4,
#     "green": 2,
#     "blue": 6
#   },
#   {
#     "red": 1,
#     "green": 3,
#     "blue": 4
#   },
#   {
#     "red": 20,
#     "green": 13,
#     "blue": 6
#   },
#   {
#     "red": 14,
#     "green": 3,
#     "blue": 15
#   },
#   {
#     "red": 6,
#     "green": 3,
#     "blue": 2
#   }
# ]

# Use to_entries to capture the game number and increment the key value to
# represent the game number
| to_entries
| map(.key += 1)

# Now filter out any games where the sets cannot have been possible
| map(select(

    .value.red <= $RED and .value.green <= $GREEN and .value.blue <= $BLUE

))

# The result should be the sum of the IDs of the games that are possible
| map(.key) | add
