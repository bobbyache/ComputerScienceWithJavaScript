/* *************************************************************************************************
snippet name: leet -  - valid-palindrome-recursive

Problem:            Valid Palindrome (Recursive)
Difficulty:         Easy
Approach:           Recursion
Url:                https://www.youtube.com/watch?v=IJDJ0kBx2LM&t=1379s
Efficiency:
    Time (Optimized): O(N)
    Space (Optmized): O(N)


** Note: Ensure the assert function (see readme) is globally available to your snippets.
    You may need to run it first.
************************************************************************************************* */

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

assert(isPalindrome(''), true);
assert(isPalindrome('y'), true);
assert(isPalindrome('kayak'), true);
assert(isPalindrome('racecar'), true);
assert(isPalindrome('artica'), true);

