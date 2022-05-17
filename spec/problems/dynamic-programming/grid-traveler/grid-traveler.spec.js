// grid-traveler.spec.js

/* *************************************************************************************************
Problem:            The Grid Traveler
Main Formula:       
Approach:           
************************************************************************************************* */

describe("grid-traveler", () => {
    const { naive, memoized } = require("./grid-traveler.js");
    beforeEach(() => {});

    describe("naive when called", () => {
        it(`should return correctly when given 1, 1 `, () => {
            expect(naive(1, 1)).toEqual(1);
        });
        it(`should return correctly when given 2, 3 `, () => {
            expect(naive(2, 3)).toEqual(3);
        });
        it(`should return correctly when given 3, 2 `, () => {
            expect(naive(3, 2)).toEqual(3);
        });
        it(`should return correctly when given 3, 3 `, () => {
            expect(naive(3, 3)).toEqual(6);
        });
        // calling (18, 18) here would be REALLY slow
    });

    describe("memoized when called", () => {
        it(`should return correctly when given 1, 1 `, () => {
            expect(memoized(1, 1)).toEqual(1);
        });
        it(`should return correctly when given 2, 3 `, () => {
            expect(memoized(2, 3)).toEqual(3);
        });
        it(`should return correctly when given 3, 2 `, () => {
            expect(memoized(3, 2)).toEqual(3);
        });
        it(`should return correctly when given 3, 3 `, () => {
            expect(memoized(3, 3)).toEqual(6);
        });
        it(`should return correctly when given 18, 18 `, () => {
            expect(memoized(18, 18)).toEqual(2333606220);
        });
    });
});

