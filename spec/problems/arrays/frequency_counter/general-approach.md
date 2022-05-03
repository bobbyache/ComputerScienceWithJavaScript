
# Definition

- This pattern uses objects or sets to collect values/frequencies of values.
- This can often avoid the need for nested loops or O(N^2) operations with arrays and strings.

# General Approach: Frequency Counter

Usually involves a hash map or a dictionary and can often involve the following approach order of operations:

- Guard clauses to throw out input that can't possibly lead to a positive or viable result (return the applicable default failure, boolean, or null value).
- Create one or more hash maps or dictionaries to store sets of data we need to quickly look up.
- One or more non-nested loops that run through the input set (N) and lookup whether the value (or applicable operation on the value) matches the expected lookup value.
- Return a default or derived value based on the above operations.
