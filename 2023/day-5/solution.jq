#!/usr/bin/env -S jq -s -R -f

import "aoc" as lib;

def SOURCE: 1; def DESTINATION: 0; def LENGTH: 2;

# Turns a map string like this: "seed-to-soil map:\n50 98 2\n52 50 48"
# into a usable map structure like this: { "soil": [[50, 98, 2], [52, 50, 48]] }
def parseMap:
    split("(-to-| map:\n)";"") as [$from, $to, $ranges]
    | { $to: $ranges | rtrimstr("\n") | split("\n") | map(lib::nums) }
;

# Takes an array of map structures, an input value, and the stage (e.g. "soil")
# and determines the outcome value from testing that input against the stage's ranges.
def lookup($maps; $value; $stage):
    $maps[$stage] | reduce .[] as $r (
        $value;
        ($value - $r[SOURCE]) as $diff
        | if ($diff >= 0 and $diff < $r[LENGTH])
          then $diff + $r[DESTINATION]
          else .
          end
    )
;

def main:

    # Split up into seeds and maps
    split("\n\n")

    # The first in the resulting array is the list of seeds,
    # so get the nums (the seed values). The rest of the list is
    # the array of maps.
    | [(first | lib::nums) ,(lib::rest | map(parseMap) | add )] as [$seeds, $maps]

    # Work out the process flow, i.e. "soil" -> "fertilizer" -> "..." etc.
    | ($maps | keys_unsorted) as $process

    # Work out the final values for each of the seeds by sending each through
    # the entire process flow.
    | $seeds
    | map(
        . as $seed 
        | $process | reduce .[] as $stage ($seed; lookup($maps; .; $stage))
    )

    # The lowest final value is the answer to part 1.
    | min

;

main
