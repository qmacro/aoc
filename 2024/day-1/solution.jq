#!/usr/bin/env -S jq -s -R -f

# GENERAL FUNCTIONS

def second: .[1];

# Parses input string into separate records
def records: split("\n")[:-1];

# SOLUTION-SPECIFIC FUNCTIONS

def sortedList(which): map(which) | sort;

def occurrences(l): . as $n | l | map(select(. == $n)) | length;

records

# Create pairs of numbers, one from each column
| map(split("\\s+";null)|map(tonumber))

| if $part == "1" then

  # Turn into keyed list of values
  [sortedList(first),sortedList(second)] | map(to_entries) | add

  # Calc diff between paired values
  | group_by(.key)
  | map(first.value - second.value | abs)
  | add

else 

  sortedList(second) as $right
  | sortedList(first) | map(occurrences($right) * .) | add

end
