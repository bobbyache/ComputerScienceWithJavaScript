describe("Two Pointers Technique", () => {
    const { unOptimized, optimized } = require("./example_a.js");

    beforeEach(() => {});
    
    describe("Unoptimized", () => {
        it(`should return 1 when given [10, 20, 35, 50, 75, 80] with a target value of 70`, () => {
            expect(unOptimized([10, 20, 35, 50, 75, 80], 5, 70)).toEqual(1);
        })
        it(`should return 1 when given [2, 3, 5, 8, 9, 10, 11] with a target value of 17`, () => {
            expect(unOptimized([2, 3, 5, 8, 9, 10, 11 ], 5, 17)).toEqual(1);
        })
    });

    describe("Optimized", () => {
        it(`should return 1 when given [10, 20, 35, 50, 75, 80] with a target value of 70`, () => {
            expect(optimized([10, 20, 35, 50, 75, 80], 5, 70)).toEqual(1);
        })
        it(`should return 1 when given [2, 3, 5, 8, 9, 10, 11] with a target value of 17`, () => {
            expect(optimized([2, 3, 5, 8, 9, 10, 11], 5, 17)).toEqual(1);
        })
    });
});
