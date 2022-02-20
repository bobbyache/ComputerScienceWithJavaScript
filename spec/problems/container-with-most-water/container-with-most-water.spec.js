describe("TwoSum", () => {
    const { unOptimized, optimized } = require("./container-with-most-water.js");

    beforeEach(() => {});

    describe("Unoptimized", () => {
        it(`should return 7 * 4 = 28 when given [7, 1, 2, 3, 9]`, () => {
            expect(unOptimized([7, 1, 2, 3, 9])).toEqual(28);
        })
     
        it(`should return 8 * 4 = 32 when given [6, 9, 3, 4, 5, 8]`, () => {
            expect(unOptimized([6, 9, 3, 4, 5, 8])).toEqual(32);
         })
     
         it(`should return 0 when given []`, () => {
            expect(unOptimized([])).toEqual(0);
         })
     
         it(`should return 0 when given [6]`, () => {
            expect(unOptimized([6])).toEqual(0);
         })
    });

    describe("Optimized", () => {
        it(`should return 7 * 4 = 28 when given [7, 1, 2, 3, 9]`, () => {
            expect(unOptimized([7, 1, 2, 3, 9])).toEqual(28);
        })
     
        it(`should return 8 * 4 = 32 when given [6, 9, 3, 4, 5, 8]`, () => {
            expect(unOptimized([6, 9, 3, 4, 5, 8])).toEqual(32);
         })
     
         it(`should return 0 when given []`, () => {
            expect(unOptimized([])).toEqual(0);
         })
     
         it(`should return 0 when given [6]`, () => {
            expect(unOptimized([6])).toEqual(0);
         })
    });
});
