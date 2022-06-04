/* *************************************************************************************************
Problem:            Two Sum on Sorted Array
Difficulty:         Easy
Approach:           Two Pointer. Shifting Pointers
Leet No.:           0167
Leet Url:           https://leetcode.com/problems/maximum-subarray/
Efficiency:
    Time (Optimized): O(N)
    Space (Optmized): O(1) 
************************************************************************************************* */

describe("two sum on sorted array", () => {
    const { twoSum } = require("./two-sum-on-sorted-array.js");
    beforeEach(() => {});

    describe("twoSum when called", () => {
        it(`should...`, () => {
            expect(twoSum([2, 7, 11, 15], 9)).toEqual([1,2]);
        });
    });
});

