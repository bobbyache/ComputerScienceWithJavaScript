describe("Product of Array", () => {
    const { iterative, recursive } = require("./product-of-array.js");
    beforeEach(() => {});

    describe("Iterative Function", () => {
        // Simple case
        it(`should return 6 when given [1,2,3]`, () => {
            expect(iterative([1,2,3])).toEqual(6);
        })
        // Edge case
        it(`should return 0 when given [0, 1, 2, 3]`, () => {
            expect(iterative([0, 1, 2, 3])).toEqual(0);
        })
    });

    describe("Recursive Function", () => {
        // Simple case
        it(`should return 6 when given [1,2,3]`, () => {
            expect(recursive([1,2,3])).toEqual(6);
        })
        // Edge case
        it(`should return 0 when given [0, 1, 2, 3]`, () => {
            expect(recursive([0, 1, 2, 3])).toEqual(0);
        })
    });
});

