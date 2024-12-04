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

records

| if $part == "1" then

  map(
    report                                    # produce report (list of nrs)
    | aperture(2)                             # classic fn
    | map(diff)                               # calc diffs between adjacents
    | select(allincdec and diffinrange(1;3))  # filter out
  ) 
  | length                                    # how many reports meet criteria

else 

  "Not implemented yet"

end
