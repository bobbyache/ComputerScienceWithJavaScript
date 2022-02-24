describe("Find the closest pair from two sorted arrays", () => {
    const { unOptimized, optimized } = require("./closest_pair.js");

    beforeEach(() => {});
    
    describe("Unoptimized", () => {
        it(`should return [1, 30] when given [1, 4, 5, 7] and [10, 20, 30, 40] with a target value of 32`, () => {
            expect(unOptimized([1, 4, 5, 7] , [10, 20, 30, 40], 32)).toEqual([1, 30]);
        });

        it(`should return [7, 40] when given [1, 4, 5, 7] and [10, 20, 30, 40] with a target value of 50`, () => {
            expect(unOptimized([1, 4, 5, 7] , [10, 20, 30, 40], 50)).toEqual([7, 40]);
        });
    });
    
    describe("Optimized", () => {
        it(`should return [1, 50] when given [1] and [50] with a target value of 32`, () => {
            expect(optimized([1] , [50], 32)).toEqual([1, 50]);
        });

        it(`should return [1, 20] when given [1] and [20]] with a target value of 32`, () => {
            expect(optimized([1] , [20], 32)).toEqual([1, 20]);
        });

        it(`should return [35, 50] when given [35] and [50] with a target value of 32`, () => {
            expect(optimized([35] , [50], 32)).toEqual([35, 50]);
        });

        it(`should return [1, 30] when given [1, 4, 5, 7] and [10, 20, 30, 40] with a target value of 32`, () => {
            expect(optimized([1, 4, 5, 7] , [10, 20, 30, 40], 32)).toEqual([1, 30]);
        })

        it(`should return [7, 40] when given [1, 4, 5, 7] and [10, 20, 30, 40] with a target value of 50`, () => {
            expect(optimized([1, 4, 5, 7] , [10, 20, 30, 40], 50)).toEqual([7, 40]);
        });

        it(`should return [3, 14] when given [1, 2, 3, 4] and [6, 7, 8, 9, 10, 11, 12, 13, 14] with a target value of 17`, () => {
            expect(optimized([1, 2, 3, 4] , [6, 7, 8, 9, 10, 11, 12, 13, 14], 17)).toEqual([3, 14]);
        });

        it(`should return [1, 6] when given [1, 2, 3, 4] and [6, 7, 8, 9, 10, 11, 12, 13, 14] with a target value of 7`, () => {
            expect(optimized([1, 2, 3, 4] , [6, 7, 8, 9, 10, 11, 12, 13, 14], 7)).toEqual([1, 6]);
        });

        it(`should return [2, 11] when given [1, 2, 3, 4] and [6, 7, 8, 9, 10, 11, 17, 19, 20] with a target value of 12`, () => {
            expect(optimized([1, 2, 3, 4] , [6, 7, 8, 9, 10, 11, 17, 19, 20], 13)).toEqual([2, 11]);
        })

        // Edge Case:
        it(`should return [50, 6] when given [50] and [6, 7, 8, 9, 10, 11, 17, 19, 20] with a target value of 30`, () => {
            expect(optimized([50] , [6, 7, 8, 9, 10, 11, 17, 19, 20], 30)).toEqual([50, 6]);
        });

        // Edge Case: Only two iterations occur here. When the left pointer gets to the end of the array
        // it will no longer be possible to calculate a smaller difference by looking at decrementing
        // the right pointer because the difference will only get greater by decrementing the right pointer.
        // Hence the while check: if any pointer reaches the end of its traversing, a smaller diff can no longer be attained.
        it(`should return [26, 20] when given [24, 26] and [6, 7, 8, 9, 10, 11, 17, 19, 20] with a target value of 100`, () => {
            expect(optimized([24, 26] , [6, 7, 8, 9, 10, 11, 17, 19, 20], 100)).toEqual([26, 20]);
        });

        // Edge Case: Only two iterations occur here. When the right pointer gets to the end of the array
        // it will no longer be possible to calculate a smaller difference by looking at incrementing
        // the left pointer because the difference will only get greater by incrementing the left pointer.
        // Hence the while check: if any pointer reaches the end of its traversing, a smaller diff can no longer be attained.
        it(`should return [5, 111] when given [5, 6, 7, 8, 9, 10, 11, 12] and  [111, 122] with a target value of 2`, () => {
            expect(optimized([5, 6, 7, 8, 9, 10, 11, 12] , [111, 122], 2)).toEqual([5, 111]);
        });

        it(`should return [undefined, undefined] when given [] and [] with a target value of 32`, () => {
            expect(optimized([] , [], 32)).toEqual([undefined, undefined]);
        });

        it(`should return [undefined, undefined] when given [2] and [] with a target value of 32`, () => {
            expect(optimized([2] , [], 32)).toEqual([undefined, undefined]);
        });

        it(`should return [undefined, undefined] when given [] and [60] with a target value of 32`, () => {
            expect(optimized([] , [60], 32)).toEqual([undefined, undefined]);
        });
    });
});
