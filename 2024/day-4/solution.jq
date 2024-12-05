#!/usr/bin/env -S jq -s -R -f

# GENERAL FUNCTIONS

def second: .[1];

# Parses input string into separate records
def records: split("\n")[:-1];

# SOLUTION-SPECIFIC FUNCTIONS

def pairs:
  [
  split(",")
    | [., length] as [$list, $l] 
    | range($l-1) 
    | reduce . as $i ([]; . + [$list[$i+1:$l][]|[$list[$i],.]])
    | .[] 
    | join("|")
  ]
;

def followsAllRules(rules):
  . as $pair
  | rules | any(select(. == $pair))
;

def middleNumber:
  split(",")
  | map(tonumber)
  | .[length/2]
;

records

| if $part == "1" then

  [
    map(select(test("\\|"))),
    map(select(test(",")))
  ] as [$rules, $updates]

  | $updates

    # do all the pairs in the update follow all the rules?
  | map(select(pairs|map(followsAllRules($rules))|all))

    # if so, take the middle numbers and add them
  | map(middleNumber)
  | add
  

else 

  "Not implemented yet"

end
