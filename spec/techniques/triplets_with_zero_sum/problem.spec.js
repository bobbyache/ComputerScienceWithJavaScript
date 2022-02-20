describe("Find all triplets with zero sum", () => {
    const { unOptimized, optimized } = require("./problem.js");

    beforeEach(() => {});
    
    describe("Unoptimized", () => {
        it(`should return true when given [0, -1, 2, -3, 1]`, () => {
            expect(unOptimized([0, -1, 2, -3, 1])).toEqual(true);
        })
        it(`should return true when given [1, -2, 1, 0, 5]`, () => {
            expect(unOptimized([1, -2, 1, 0, 5])).toEqual(true);
        })
    });

    describe("Optimized", () => {
        it(`should return true when given [0, -1, 2, -3, 1]`, () => {
            expect(optimized([0, -1, 2, -3, 1])).toEqual(true);
        })
        it(`should return true when given [1, -2, 1, 0, 5]`, () => {
            expect(optimized([1, -2, 1, 0, 5])).toEqual(true);
        })
    });
});
