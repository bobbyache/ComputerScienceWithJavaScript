# Valid Palindrome (Recursive) ()

| | |
| --- | --- |
| Difficulty | Easy |
| Approach | Recursive |

## Problem
Is the input string a valid palindrome?

## Solution

### Naïve

```js

function isPalindrome(input) {
    // Define a base cases or stopping position
    if (input.length == 0 || input.length == 1) {
        return true;
    }

    if (input.charAt(0) == input.charAt(input.length - 1)) {
        return isPalindrome(input.substring(1, input.length - 1));
    }

    // Additional base case to handle non-palindromes
    return false;
}

```

### Optimized

```js

function isPalindrome(input) {
    // Define a base cases or stopping position
    if (input.length == 0 || input.length == 1) {
        return true;
    }

    if (input.charAt(0) == input.charAt(input.length - 1)) {
        return isPalindrome(input.substring(1, input.length - 1));
    }

    // Additional base case to handle non-palindromes
    return false;
}

```

## Explanation

Each time we recurse, we shrink the string on both sides by 1 and then look at the letters on both sides of the string.

## Complexity

| Type | Naive | Optimized |
| --- | --- | --- |
| Time | O(N) | O(N) |
| Space | O(N) | O(N) |

# Reference(s):

- [Orginal Source Link - YouTube](https://www.youtube.com/watch?v=IJDJ0kBx2LM&t=1379s) - Recursion in Programming - Full Course

