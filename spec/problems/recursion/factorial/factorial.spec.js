describe("Return factorial of", () => {
    const { iterative, recursive } = require("./factorial.js");
    beforeEach(() => {});

    describe("Iterative Function", () => {
        it(`should return 1 when given (0)`, () => {
            expect(iterative(0)).toEqual(1);
        })
        it(`should return 1 when given (1)`, () => {
            expect(iterative(1)).toEqual(1);
        })
        it(`should return 2 when given (2)`, () => {
            expect(iterative(2)).toEqual(2);
        })
        it(`should return 24 when given (4)`, () => {
            expect(iterative(4)).toEqual(24);
        })
        it(`should return 5040 when given (7)`, () => {
            expect(iterative(7)).toEqual(5040);
        })
    });

    describe("Recursive Function", () => {
        it(`should return 1 when given (0)`, () => {
            expect(recursive(0)).toEqual(1);
        })
        it(`should return 1 when given (1)`, () => {
            expect(recursive(1)).toEqual(1);
        })
        it(`should return 2 when given (2)`, () => {
            expect(recursive(2)).toEqual(2);
        })
        it(`should return 24 when given (4)`, () => {
            expect(recursive(4)).toEqual(24);
        })
        it(`should return 5040 when given (7)`, () => {
            expect(recursive(7)).toEqual(5040);
        })
    });
});
