// can-sum.spec.js

/* *************************************************************************************************
Problem:            Can Sum (with Memoization)
Main Formula:       
Approach:           
************************************************************************************************* */

describe("can sum", () => {
    const { naiveCanSum, memoizedCanSum } = require("./can-sum.js");
    beforeEach(() => {});

    describe("naiveCanSum when called", () => {
        it(`should return true when given 7, [2, 3] `, () => {
            expect(naiveCanSum(7, [2, 3])).toEqual(true);
        });
        it(`should return true when given 7, [5,3,4,7] `, () => {
            expect(naiveCanSum(7, [5,3,4,7])).toEqual(true);
        });
        it(`should return false when given 7, [2,4] `, () => {
            expect(naiveCanSum(7, [2,4])).toEqual(false);
        });
        it(`should return true when given 8, [2,3,5] `, () => {
            expect(naiveCanSum(8, [2,3,5])).toEqual(true);
        });
        // calling with 300 will be a very bad idea for unoptimized naive solution.
    });

    describe("memoizedCanSum when called", () => {
        it(`should return true when given 7, [2, 3] `, () => {
            expect(memoizedCanSum(7, [2, 3])).toEqual(true);
        });
        it(`should return true when given 7, [5,3,4,7] `, () => {
            expect(memoizedCanSum(7, [5,3,4,7])).toEqual(true);
        });
        it(`should return false when given 7, [2,4] `, () => {
            expect(memoizedCanSum(7, [2,4])).toEqual(false);
        });
        it(`should return true when given 8, [2,3,5] `, () => {
            expect(memoizedCanSum(8, [2,3,5])).toEqual(true);
        });
        it(`should return true when given 300, [7,14] `, () => {
            expect(memoizedCanSum(300, [7,14])).toEqual(false);
        });
    });
});

