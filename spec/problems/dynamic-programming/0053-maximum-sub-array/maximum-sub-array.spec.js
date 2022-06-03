// maximum-sub-array.spec.js

/* *************************************************************************************************
Problem:            Maximum Sub Array
Main Formula:       N/A
Approach:           Kaldane's Algorithm (some similarity to Trapping Rainwater)
************************************************************************************************* */

describe("maximum sub array", () => {
    const { maxSubArray } = require("./maximum-sub-array.js");
    beforeEach(() => {});

    describe("maxSubArray when called", () => {
        it(`should... `, () => {
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

