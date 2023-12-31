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
# Also adds a 'card' property with the value being the card number.
# E.g. turns "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53" into
# { "card": 1, "winning": [ 41, 48, 83, 86, 17 ], "have": [ 83, 86, 6, 31, 17, 9, 48, 53 ] }
def parseCard:

    split("[:\\|]";"")
    | {
        card: .[0] | sub("^Card ";"") | tonumber,
        winning: .[1] | rowToNumArray,
        have: .[2] | rowToNumArray
    }

;

# Takes a card object (as produced by parseCard) and calculates how many winning
# numbers it has, by subtracting the 'winning' from the 'have' array, and counting.
def countWinningNumbers:
    (.have | length) - ((.have - .winning) | length)
;


records

# Parse each card
| map(parseCard)

| if part == "1" then

    # Then take each card and work out how many winning numbers there are
    map(countWinningNumbers)

    # For those that have any (> 0) winning numbers, calculate the points
    # And sum the points for the answer
    | map(select(. > 0) | pow(2;.-1)) | add

else
    
    # Horribly inefficient but I don't care, I created a generator. Go me!

    # Generate streams of cards recursively, because streams and recursion.
    # And generators.
    def copies($wn):
        map(
            ., ([range(. + 1; . + $wn[.] + 1)] | copies($wn))
        )
    ;

    # Create an array of winning numbers, where the array index is the card number
    (reduce .[] as $card ([0]; . + [$card | countWinningNumbers])) as $winningNumbers

    # Go through the cards, and generate all copies (passing the winning numbers
    # array for reference).
    | map(.card) | copies($winningNumbers)

    # Flatten the recursively generated stream of card values, arrange by card number
    # and then count up how many of each, totalling at the end.
    | flatten | group_by(.) | map(length) | add

end

