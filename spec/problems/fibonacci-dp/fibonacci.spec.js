// fibonacci.spec.js

/* *************************************************************************************************
Problem:            Fibonnaci (with Memoization)
Main Formula:       
Approach:           Dynamic Programming, Recursion, Memoization
************************************************************************************************* */

describe("fibonacci", () => {
    const { naiveFibonacci, optimizedFibonacci } = require("./fibonacci.js");
    beforeEach(() => {});

    describe("naiveFibonacci when called", () => {
        it(`should return correctly when given 6 `, () => {
            expect(naiveFibonacci(6)).toEqual(8);
        });
        it(`should return correctly when given 7 `, () => {
            expect(naiveFibonacci(7)).toEqual(13);
        });
        it(`should return correctly when given 8 `, () => {
            expect(naiveFibonacci(8)).toEqual(21);
        });
        it(`should return correctly when given 30 `, () => {
            expect(naiveFibonacci(30)).toEqual(832040);
        });
    });

    describe("optimizedFibonacci when called", () => {
        it(`should return correctly when given 6 `, () => {
            expect(optimizedFibonacci(6)).toEqual(8);
        });
        it(`should return correctly when given 7 `, () => {
            expect(optimizedFibonacci(7)).toEqual(13);
        });
        it(`should return correctly when given 8 `, () => {
            expect(optimizedFibonacci(8)).toEqual(21);
        });
        it(`should return correctly when given 30 `, () => {
            expect(optimizedFibonacci(30)).toEqual(832040);
        });
        it(`should return correctly when given 40 `, () => {
            expect(optimizedFibonacci(40)).toEqual(102334155);
        });
        it(`should return correctly when given 50 `, () => {
            expect(optimizedFibonacci(50)).toEqual(12586269025);
        });
    });
});

