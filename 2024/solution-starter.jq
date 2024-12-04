#!/usr/bin/env -S jq -s -R -f

# GENERAL FUNCTIONS

def second: .[1];

# Parses input string into separate records
def records: split("\n")[:-1];

# SOLUTION-SPECIFIC FUNCTIONS

records

| if $part == "1" then

  .

else 

  "Not implemented yet"

end
