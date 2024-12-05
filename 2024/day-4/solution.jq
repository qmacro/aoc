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

def x(rules):
  . as $pair
  | rules | map(select(. == $pair))
;

def numbers: split(",") | map(tonumber);

def middleNumber: numbers | .[length/2];

def patternPairs(x):
  to_entries |
  [
    (map(select(.key == x))|first.value), 
    "(\(map(select(.key != x).value)|join("|")))"
  ]
;

def patternLeft(x): patternPairs(x) | join("\\|"); 
def patternRight(x): patternPairs(x) | reverse | join("\\|"); 



def z(patterns; rules):

  patterns | map(. as $pattern | rules | map(select(test($pattern))))

;
  

records

| [
    map(select(test("\\|"))),
    map(select(test(",")))
  ] as [$rules, $updates]

  | $updates

  | if $part == "1" then

      # do all the pairs in the update follow all the rules?
    map(select(pairs|map(followsAllRules($rules))|all))

      # if so, take the middle numbers and add them
    | map(middleNumber)
    | add
  

  else 

    map(

      # Pick out the ones that fail the rules
      select(pairs|map(followsAllRules($rules))|all|not)

      # Ug. Ly. Don't look.
      | numbers
      | [., length] as [$xs, $l]
      | [range($l)]
      | map(. as $x | $xs | [patternLeft($x), patternRight($x)])
      | map(z(.;$rules))
      | map(select((first|length) == (second|length)))
      | map(first|first)
      | map(sub("\\|.+";"")|tonumber)
      | add

    )

    | add


  end
