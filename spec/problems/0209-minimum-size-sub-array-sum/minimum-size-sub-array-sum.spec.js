// minimum-size-sub-array-sum.spec.js

/* *************************************************************************************************
Problem:            Minimum Size Sub-array Sum
Main Formula:       
Approach:           

https://www.youtube.com/watch?v=jKF9AcyBZ6E
https://leetcode.com/problems/minimum-size-subarray-sum/
************************************************************************************************* */

describe("minimum size sub-array sum", () => {
    const { minSubArrayLen } = require("./minimum-size-sub-array-sum.js");
    beforeEach(() => {});

    describe("minSubArrayLen when called", () => {
        it(`should return 0 when given nums, target `, () => {
            expect(minSubArrayLen(7, [2,3,1,2,4,3])).toEqual(2);
            expect(minSubArrayLen(4, [1,4,4])).toEqual(1);
            expect(minSubArrayLen(11, [1,1,1,1,1,1,1,1])).toEqual(0);
        });
    });
});


