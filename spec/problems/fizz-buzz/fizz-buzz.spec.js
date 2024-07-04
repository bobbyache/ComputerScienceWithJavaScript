/* *************************************************************************************************
Problem:            Is Prime
Main Formula:       
Approach:           
************************************************************************************************* */

describe("fizz buzz", () => {
    const { fizzBuzz } = require("./fizz-buzz.js");
    beforeEach(() => {});

    describe("fizzBuzz when called", () => {
        it("should...", () => {
            const result = fizzBuzz(7)
            expect(result[0]).toEqual("FizzBuzz");
            expect(result[1]).toEqual(1);
            expect(result[2]).toEqual(2);
            expect(result[3]).toEqual("Fizz");
            expect(result[4]).toEqual(4);
            expect(result[5]).toEqual("Buzz");
            expect(result[6]).toEqual("Fizz");
        })
    });
});

