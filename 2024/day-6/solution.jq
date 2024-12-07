#!/usr/bin/env -S jq -s -R -f

# GENERAL FUNCTIONS

def second: .[1];

# Parses input string into separate records
def records: split("\n")[:-1];

# SOLUTION-SPECIFIC FUNCTIONS

def x: .pos|first;
def y: .pos|second;

def U: "^";
def R: ">";
def D: "v";
def L: "<";

def up:    y |= .-1;
def down:  y |= .+1;
def left:  x |= .-1;
def right: x |= .+1;

def move:
    if .dir == U then up else . end
    | if .dir == D then down  else . end
    | if .dir == L then left  else . end
    | if .dir == R then right else . end
;

def at(m): m[y][x]; # map is held in y,x structure

def isblocked(m): move | at(m) == "#";

def rotateright:
    .dir as $dir
    | .dir |= ({ (U):R, (R):D, (D):L, (L):U }[$dir])
;

def oob(m): (x < 0 or x >= (m|first|length)) or (y < 0 or y >= (m|length));
def inbounds(m): oob(m) | not;

def makemap: map(split(""));

def findpos(dir):
    to_entries 
    | map(select(.value | contains(dir)))
    | first
    | [(.value | index(dir)), .key] # col,row i.e. x,y
;

records | [{ dir: U, pos: findpos(U)}, makemap] as [$guard, $map]

| if $part == "1" then

    $guard
    | [
        while(
            inbounds($map);
            if isblocked($map) then rotateright else . end
            | move
        )
      ]
      | map(.pos) | unique | length

else 

    "Not implemented yet"

end
