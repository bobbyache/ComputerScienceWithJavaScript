/* *************************************************************************************************
Problem:            Valid Palindrome (Recursive)
Difficulty:         Easy
Approach:           Recursive
Url:                https://www.youtube.com/watch?v=IJDJ0kBx2LM&t=1379s
Efficiency:
    Time (Optimized): O(N)
    Space (Optmized): O(N) 
************************************************************************************************* */

describe("valid palindrome (recursive)", () => {
    const { isPalindrome } = require("./valid-palindrome.js");
    beforeEach(() => {});

    describe("isPalindrome when called", () => {
        it(`should... `, () => {
            expect(isPalindrome('')).toEqual(true);
            expect(isPalindrome('y')).toEqual(true);
            expect(isPalindrome('kayak')).toEqual(true);
            expect(isPalindrome('racecar')).toEqual(true);
            expect(isPalindrome('artica')).toEqual(false);
        });
    });
});

/* *************************************************************************************************
NimbleText

expect(naive($0)).toEqual($1);


expect(isPalindrome($0)).toEqual($1);

************************************************************************************************* */

