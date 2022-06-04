/* *************************************************************************************************
Problem:             Max Sub Array
Difficulty:         Easy
Approach:           Dynamic Programming (Hadane's Algorithms)
Leet No.:           0053
Leet Url:           https://leetcode.com/problems/maximum-subarray/
Efficiency:
    Time (Optimized): O(1)
    Space (Optmized): O(N) 

- Given an integer array nums, find the contiguous subarray (containing at least one number) 
    which has the largest sum and return its sum.
- A subarray is a contiguous part of an array.
************************************************************************************************* */

describe(" max sub array", () => {
    const { maxSubArray } = require("./max-sub-array.js");
    beforeEach(() => {});

    describe("maxSubArray when called", () => {
        it(`should...`, () => {
            expect(maxSubArray([1])).toEqual(1);
            expect(maxSubArray([2])).toEqual(2);
            expect(maxSubArray([5, -11])).toEqual(5);
            expect(maxSubArray([1,2-4,3,4,-2])).toEqual(7);
            expect(maxSubArray([-3,-2,-1, -5])).toEqual(-1);
            expect(maxSubArray([-10,-15,-1,-5])).toEqual(-1);
            expect(maxSubArray([-10,-15,-10,-15, -15, -15, -10, -10])).toEqual(-10);
            expect(maxSubArray([2,-1,1,80,1])).toEqual(83);
            expect(maxSubArray([2,-1,0,80,1])).toEqual(82);
            expect(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])).toEqual(6);
            expect(maxSubArray([5,4,-1,7,8])).toEqual(23);
            expect(maxSubArray([-2,2,5,-11,6])).toEqual(7);
            
        });
    });
});

/* *************************************************************************************************
NimbleText

expect(naive($0)).toEqual($1);


expect(maxSubArray($0)).toEqual($1);

************************************************************************************************* */

