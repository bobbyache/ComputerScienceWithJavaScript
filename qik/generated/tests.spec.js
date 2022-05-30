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
        it(`should return true when given 300, [7,14] `, () => {
            expect(naiveCanSum(300, [7,14])).toEqual(true);
        });
    });

    describe("memoizedCanSum when called", () => {
        it(`should return true when given 300, [7,14] `, () => {
            expect(memoizedCanSum(300, [7,14])).toEqual(true);
        });
    });
});

