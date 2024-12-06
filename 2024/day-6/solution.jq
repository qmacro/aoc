#!/usr/bin/env -S jq -s -R -f

# GENERAL FUNCTIONS

def second: .[1];

# Parses input string into separate records
def records: split("\n")[:-1];

# SOLUTION-SPECIFIC FUNCTIONS

def x: first;
def y: second;

def U: "^";
def D: "v";
def L: "<";
def R: ">";

def up:    y |= .-1;
def down:  y |= .+1;
def left:  x |= .-1;
def right: x |= .+1;

def at(m): m[y][x]; # map is held in y,x structure

def oob(m): (x < 0 or x >= (m|first|length)) or (y < 0 or y >= (m|length));
def inbounds(m): oob(m) | not;

def z(m): true;

def guard: U;

def makemap: map(split(""));

def findpos(dir):
    to_entries 
    | map(select(.value | contains(dir)))
    | first
    | [(.value | index(dir)), .key] # col,row i.e. x,y
;

records | [findpos(guard), makemap] as [$pos, $map]

| if $part == "1" then

    $pos | while(inbounds($map); up)

else 

    "Not implemented yet"

end
