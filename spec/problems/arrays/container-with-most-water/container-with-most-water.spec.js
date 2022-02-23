describe("TwoSum", () => {
    const { unOptimized, optimized } = require("./container-with-most-water.js");

    beforeEach(() => {});

    describe("Unoptimized", () => {
        // Best test case
        it(`should return 7 * 4 = 28 when given [7, 1, 2, 3, 9]`, () => {
            expect(unOptimized([7, 1, 2, 3, 9])).toEqual(28);
        })

        it(`should return 8 * 3 = 24 when given [1, 8, 6, 2, 9, 4]`, () => {
            expect(unOptimized([1, 8, 6, 2, 9, 4])).toEqual(24);
        })
     
        it(`should return 8 * 4 = 32 when given [6, 9, 3, 4, 5, 8]`, () => {
            expect(unOptimized([6, 9, 3, 4, 5, 8])).toEqual(32);
         })
     
        // Edge cases
         it(`should return 0 when given []`, () => {
            expect(unOptimized([])).toEqual(0);
         })
     
         it(`should return 0 when given [6]`, () => {
            expect(unOptimized([6])).toEqual(0);
         })
    });

    describe("Optimized", () => {
        // Best test case
        it(`should return 7 * 4 = 28 when given [7, 1, 2, 3, 9]`, () => {
            expect(optimized([7, 1, 2, 3, 9])).toEqual(28);
        })

        it(`should return 8 * 3 = 24 when given [1, 8, 6, 2, 9, 4]`, () => {
            expect(optimized([1, 8, 6, 2, 9, 4])).toEqual(24);
        })
     
        it(`should return 8 * 4 = 32 when given [6, 9, 3, 4, 5, 8]`, () => {
            expect(optimized([6, 9, 3, 4, 5, 8])).toEqual(32);
         })
     
         // Edge cases
         it(`should return 0 when given []`, () => {
            expect(optimized([])).toEqual(0);
         })
     
         it(`should return 0 when given [6]`, () => {
            expect(optimized([6])).toEqual(0);
         })
    });
});
