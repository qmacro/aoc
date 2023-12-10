# Assumes data filenames are in the form <part>-<test|real>.dat
def part: input_filename | split("-") | first;

# Parses input string into separate records
def records: split("\n")[:-1];

# Reverses a string, e.g. "hello" -> "olleh"
def reverseString: split("") | reverse | join("");

# The classic
def rest: .[1:];

# Turns a list of whitespace separated nymbers into an
# array of numbers; will drop anything that isn't a number.
def nums: split("\\s+";"") | map(tonumber?);
