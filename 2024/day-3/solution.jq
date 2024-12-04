#!/usr/bin/env -S jq -s -R -f

# GENERAL FUNCTIONS

def second: .[1];
def mul: reduce .[] as $x (1; . * $x);

# Parses input string into separate records
def records: split("\n")[:-1];

# SOLUTION-SPECIFIC FUNCTIONS


def instructions: [match("(don't\\(\\)|do\\(\\)|mul\\((?<x>\\d{1,3}),(?<y>\\d{1,3})\\))";"g")];
def onlymul: select(.string | startswith("mul"));
def operands: map(select(.name == "x" or .name == "y") | .string // "0" | tonumber);


if $part == "1" then

  instructions
  | map(
    onlymul
    | .captures
    | operands
    | mul
  )
  | add

else

  instructions
  | map(
    {instruction: .string, operands: .captures | operands}
  )
  | reduce .[] as $x (
    [true, []];
    if $x.instruction | startswith("don't") then first |= false end |
    if $x.instruction | startswith("do(") then first |= true end |
    if first then second |= .+ [$x.operands] else . end
  )
  | second
  | map(mul)
  | add

end
