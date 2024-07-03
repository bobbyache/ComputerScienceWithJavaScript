/* *************************************************************************************************
Problem:            Is Prime
Main Formula:       
Approach:           
************************************************************************************************* */

describe("is prime", () => {
    const { isPrime } = require("./is-prime.js");
    beforeEach(() => {});

    describe("isPrime when called", () => {
        it("should...", () => {
            expect(isPrime(2)).toEqual(true);
            expect(isPrime(4)).toEqual(false);
            expect(isPrime(5)).toEqual(true);
            expect(isPrime(6)).toEqual(false);
            expect(isPrime(7)).toEqual(true);
            expect(isPrime(8)).toEqual(false);
            expect(isPrime(25)).toEqual(false);
            expect(isPrime(31)).toEqual(true);
            expect(isPrime(2017)).toEqual(true);
            expect(isPrime(2048)).toEqual(false);
            expect(isPrime(713)).toEqual(false);
        })
    });
});


