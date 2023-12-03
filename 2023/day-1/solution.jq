#!/usr/bin/env -S jq -s -R -f

# GENERAL FUNCTIONS

# Assumes data filenames are in the form <part>-<test|real>.dat
def part: input_filename | split("-") | first;

# Parses input string into separate records
def records: split("\n")[:-1];

# Reverses a string, e.g. "hello" -> "olleh"
def reverseString: split("") | reverse | join("");

# SOLUTION-SPECIFIC FUNCTIONS

# Include "zero" so index/1 returns the appropriate index as digit
def numbers: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

def digitMatch: "[0-9]";

# Match first digit from left hand side; also match spelled out digits if in part 2
def firstDigit($part):
    (if $part == "1" then "(\(digitMatch))" else "(\(digitMatch)|\(numbers | join("|")))" end) as $re
    | match($re).string as $n
    | (numbers | index($n)) // $n | tostring
;

# Match first digit from right hand side; also match spelled out digits if in part 2
def lastDigit($part):
    (numbers | map(reverseString)) as $numbersReversed
    | (if $part == "1" then "(\(digitMatch))" else "(\(digitMatch)|\($numbersReversed | join("|")))" end) as $re
    | reverseString
    | match($re).string as $n
    | ($numbersReversed | index($n)) // $n | tostring
;

records
    | map([firstDigit(part), lastDigit(part)]
    | join("")
    | tonumber)
    | add
