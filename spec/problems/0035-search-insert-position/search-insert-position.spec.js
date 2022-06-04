/* *************************************************************************************************
Problem:             Search Insert Position
Difficulty:         Easy
Approach:           Shifting Pointers, Binary Search 
Leet No.:           0035
Leet Url:           https://leetcode.com/problems/search-insert-position/
Efficiency:
    Time (Optimized): O(N)
    Space (Optmized): O(N) 

Given a sorted array of distinct integers and a target value, return the index if the target 
is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.
************************************************************************************************* */

describe(" search insert position", () => {
    const { searchInsert } = require("./search-insert-position.js");
    beforeEach(() => {});

    describe("searchInsert when called", () => {
        it(`should...`, () => {
            expect(searchInsert([1,3,4,6,7,9], 2)).toEqual(1);
        });
    });
});

/* *************************************************************************************************
NimbleText

expect(naive($0)).toEqual($1);

expect(searchInsert($0)).toEqual($1);

************************************************************************************************* */

