#!/usr/bin/env -S jq -s -R -f

# GENERAL FUNCTIONS

def second: .[1];
def mul: reduce .[] as $x (1; . * $x);

# Parses input string into separate records
def records: split("\n")[:-1];

# SOLUTION-SPECIFIC FUNCTIONS


def instructions: [match("(don't\\(\\)|do\\(\\)|mul\\((?<x>\\d{1,3}),(?<y>\\d{1,3})\\))";"g")];
def onlymul: select(.string | startswith("mul"));


if $part == "1" then

  instructions
  | map(
    onlymul
    | .captures
    | map(select(.name == "x" or .name == "y") | .string | tonumber)
    | mul
  )
  | add


else 

  instructions

end
