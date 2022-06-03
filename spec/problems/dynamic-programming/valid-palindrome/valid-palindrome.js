// -valid-palindrome-(recursive)
// valid-palindrome-(recursive).js
// valid-palindrome-(recursive).spec.js
// valid-palindrome-(recursive).md

/* *************************************************************************************************
Problem:            Valid Palindrome (Recursive)
Difficulty:         Easy
Approach:           Recursion     
Url:                https://www.youtube.com/watch?v=IJDJ0kBx2LM&t=1379s
Efficiency:
    Time (Optimized): O(N)
    Space (Optmized): O(N)
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

module.exports = {
    isPalindrome: isPalindrome
};

/* *************************************************************************************************
Use debugger
    node inspect valid-palindrome-(recursive).js

    Use "debugger" to debug. See main README.
************************************************************************************************* */

// naive(nums)
// isPalindrome(nums)

