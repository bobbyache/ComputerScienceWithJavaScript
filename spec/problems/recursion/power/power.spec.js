describe("Return power of", () => {
    const { iterative, recursive } = require("./power.js");
    beforeEach(() => {});

    describe("Iterative Function", () => {
        // Simple case
        it(`should return 2 when given (2, 1)`, () => {
            expect(iterative(2, 1)).toEqual(2);
        })
        it(`should return 4 when given (2, 2)`, () => {
            expect(iterative(2, 2)).toEqual(4);
        })
        it(`should return 16 when given (2, 4)`, () => {
            expect(iterative(2, 4)).toEqual(16);
        })

        // Edge case
        it(`should return 1 when given (2, 0)`, () => {
            expect(iterative(2, 0)).toEqual(1);
        })
    });

    describe("Recursive Function", () => {
        // Simple case
        it(`should return 2 when given (2, 1)`, () => {
            expect(recursive(2, 1)).toEqual(2);
        })
        it(`should return 4 when given (2, 2)`, () => {
            expect(recursive(2, 2)).toEqual(4);
        })
        it(`should return 16 when given (2, 4)`, () => {
            expect(recursive(2, 4)).toEqual(16);
        })

        // Edge case
        it(`should return 1 when given (2, 0)`, () => {
            expect(recursive(2, 0)).toEqual(1);
        })
    });
});
