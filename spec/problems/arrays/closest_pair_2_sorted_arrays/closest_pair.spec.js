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

        it(`should return [3, 14] when given [1, 2, 3, 4] and [6, 7, 8, 9, 10, 11, 12, 13, 14] with a target value of 17`, () => {
            expect(optimized([1, 2, 3, 4] , [6, 7, 8, 9, 10, 11, 12, 13, 14], 17)).toEqual([3, 14]);
        })

        it(`should return [1, 6] when given [1, 2, 3, 4] and [6, 7, 8, 9, 10, 11, 12, 13, 14] with a target value of 7`, () => {
            expect(optimized([1, 2, 3, 4] , [6, 7, 8, 9, 10, 11, 12, 13, 14], 7)).toEqual([1, 6]);
        })

        it(`should return [2, 11] when given [1, 2, 3, 4] and [6, 7, 8, 9, 10, 11, 17, 19, 20] with a target value of 12`, () => {
            expect(optimized([1, 2, 3, 4] , [6, 7, 8, 9, 10, 11, 17, 19, 20], 13)).toEqual([2, 11]);
        })

        // Edge Case:
        it(`should return ? when given ? and ? with a target value of ?`, () => {
            expect(optimized([50] , [6, 7, 8, 9, 10, 11, 17, 19, 20], 30)).toEqual([50, 6]);
        })

        fit(`should return ? when given ? and ? with a target value of ?`, () => {
            expect(optimized([24, 26] , [6, 7, 8, 9, 10, 11, 17, 19, 20], 100)).toEqual([50, 26]);
        })
    });
});
