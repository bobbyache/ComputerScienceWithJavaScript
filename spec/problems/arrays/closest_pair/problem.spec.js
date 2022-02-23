describe("Given a sorted array and a number x, find the pair in array whose sum is closest to x", () => {
    const { unOptimized, optimized } = require("./problem.js");

    beforeEach(() => {});
    
    describe("Unoptimized", () => {
        it(`should return [22, 30] when given [10, 22, 28, 29, 30, 40] with a target value of 54`, () => {
            expect(unOptimized([10, 22, 28, 29, 30, 40], 54)).toEqual([22, 30]);
        })
        it(`should return [4, 10] when given [1, 3, 4, 7, 10] with a target value of 15`, () => {
            expect(unOptimized([1, 3, 4, 7, 10], 15)).toEqual([4, 10]);
        })
    });

    describe("Optimized", () => {
        it(`should return undefined when given [] with a target value of 54`, () => {
            expect(optimized([], 54)).toBeUndefined();
        })
        it(`should return undefined when given [54] with a target value of 54`, () => {
            expect(optimized([54], 54)).toBeUndefined();
        })
        it(`should return [22, 30] when given [10, 22, 28, 29, 30, 40] with a target value of 54`, () => {
            expect(optimized([10, 22, 28, 29, 30, 40], 54)).toEqual([22, 30]);
        })
        it(`should return [4, 10] when given [1, 3, 4, 7, 10] with a target value of 15`, () => {
            expect(optimized([1, 3, 4, 7, 10], 15)).toEqual([4, 10]);
        })
    });
});
