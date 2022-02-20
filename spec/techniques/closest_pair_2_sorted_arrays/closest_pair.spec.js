describe("Find the closest pair from two sorted arrays", () => {
    const { unOptimized, optimized } = require("./closest_pair.js");

    beforeEach(() => {});
    
    describe("Unoptimized", () => {
        it(`should return [1, 30] when given [1, 4, 5, 7] and [10, 20, 30, 40] with a target value of 32`, () => {
            expect(unOptimized([1, 4, 5, 7] , [10, 20, 30, 40], 32)).toEqual([1, 30]);
        })
        it(`should return [7, 40] when given [1, 4, 5, 7] and [10, 20, 30, 40] with a target value of 50`, () => {
            expect(unOptimized([1, 4, 5, 7] , [10, 20, 30, 40], 50)).toEqual([7, 40]);
        })
    });

    describe("Optimized", () => {
        it(`should return [1, 30] when given [1, 4, 5, 7] and [10, 20, 30, 40] with a target value of 32`, () => {
            expect(optimized([1, 4, 5, 7] , [10, 20, 30, 40], 32)).toEqual([1, 30]);
        })
        it(`should return [7, 40] when given [1, 4, 5, 7] and [10, 20, 30, 40] with a target value of 50`, () => {
            expect(optimized([1, 4, 5, 7] , [10, 20, 30, 40], 50)).toEqual([7, 40]);
        })
    });
});
