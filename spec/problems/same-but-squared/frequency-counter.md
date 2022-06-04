
# Definition

- This pattern uses objects or sets to collect values/frequencies of values.
- This can often avoid the need for nested loops or O(N^2) operations with arrays and strings.

Source: https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/9816152#overview

# General Approach: Frequency Counter

Usually involves a hash map or a dictionary and can often involve the following approach order of operations:

- Guard clauses to throw out input that can't possibly lead to a positive or viable result (return the applicable default failure, boolean, or null value).
- Create one or more hash maps or dictionaries to store sets of data we need to quickly look up.
- One or more non-nested loops that run through the input set (N) and lookup whether the value (or applicable operation on the value) matches the expected lookup value.
- Return a default or derived value based on the above operations.

## Same (but squared)

Write a function which accepts two arrays. The function should return true if every value
in the array has its corresponding value squared in the second array.

The frequency of values must be the same.
- Means that the array lengths must be the same as can't have two in the `array2` corresponding to only 1 in `array1`.

### Approach
- The idea is to use an object/dictionary/hashmap to construct a profile of an array or string.
- Allows one to quickly compare that breakdown to how another object looks that was constructed from an array or string.
- These arrays have to be the same length so this will be (O(3N) which resolves to O(N))
- Much better than O(N^2) for the above example.

```javascript
const sameYetSquared = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false;
    }

    let frequencyCounter1 = {};
    let frequencyCounter2 = {};

    for (let val of arr1) {
        frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
    }

    for (let val of arr2) {
        frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
    }

    for (let key in frequencyCounter1) {
        if (!(key ** 2 in frequencyCounter2)) {
            return false;
        }
        if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
            return false;
        }
    }
    return true;
};
```

## Valid Anagram

Given two strings, write a function to determine if the second string is an anagram of the
first. An anagram is a word, phrase, or name formed by rearranging the letters of another,
such as cinema, formed from iceman.

Ask Questions (don't assume):
- All inputs are simple words
- Not numbers
- all lower case

```javascript
const validAnagram_neater = (first, second) => {
    if (first.length !== second.length) {
        return false;
    }

    var lookup = {};

    for (let char of first) {
        lookup[char] = (lookup[char] || 0) + 1;
    }

    for (let char of second) {
        if (!lookup[char]) {
            return false;
        } else {
            lookup[char] -= 1;
        }
    }

    return true;
};
```

### Tons of anagram solvers online:

- https://www.thewordfinder.com/anagram-solver/
- https://wordfinders.com/
- https://en.wikipedia.org/wiki/Anagram
