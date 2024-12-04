#!/usr/bin/env -S jq -s -R -f

# GENERAL FUNCTIONS

def second: .[1];
def mul: reduce .[] as $x (1; . * $x);

# Parses input string into separate records
def records: split("\n")[:-1];

# SOLUTION-SPECIFIC FUNCTIONS

def instructions: [match("mul\\((\\d{1,3}),(\\d{1,3})\\)";"g")];

if $part == "1" then

  instructions
  | map(
    .captures
    | map(.string|tonumber)
    | mul
  )
  | add


else 

  "Not implemented yet"

end
