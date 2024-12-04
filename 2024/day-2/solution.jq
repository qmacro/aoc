#!/usr/bin/env -S jq -s -R -f

# GENERAL FUNCTIONS

def second: .[1];
def diff: first - second;

# Parses input string into separate records
def records: split("\n")[:-1];

def aperture(n):
  . as $l
  | reduce range($l|length) as $i ([]; . + [$l[$i:$i+n]])
  | map(select(. | length == n))
;

# SOLUTION-SPECIFIC FUNCTIONS

def report: split("\\s+";null) | map(tonumber);
def allincdec: all(. >= 0) or all(. <= 0);
def diffinrange(a;b): all(.|abs >= a) and all(.|abs <= b);
def movements: aperture(2) | map(diff);
def safe: allincdec and diffinrange(1;3);
def removeitem(n): to_entries|map(select(.key != n)|.value);
def dampen: . as $l | reduce range($l|length) as $i ([$l];. + [$l | removeitem($i)]);

records

| if $part == "1" then

  map(
    report
    | movements
    | select(safe)
  ) 
  | length

else 

  map(
    report
    | dampen
    | map(movements)
    | map(safe)
    | select(any)
  )
  | length

end
