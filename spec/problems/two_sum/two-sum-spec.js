describe("TwoSum", () => {
    const { unOptimized, optimized } = require("./two-sum.js");

    beforeEach(() => {});

    describe("Unoptimized", () => {
        it("should calculate [1,3,7,9,2] with 11 correctly", () => {
            expect(unOptimized([1, 3, 7, 9, 2], 11)).toEqual([3, 4]);
        });

        it("should calculate [1,3,7,9,2] with 25 correctly", () => {
            expect(unOptimized([1, 3, 7, 9, 2], 25)).toEqual(null);
        });

        it("should calculate [] correctly with 1", () => {
            expect(unOptimized([], 1)).toEqual(null);
        });

        it("should calculate [5] correctly with 5", () => {
            expect(unOptimized([5], 5)).toEqual(null);
        });

        it("should calculate [1, 6] correctly with 7", () => {
            expect(unOptimized([1, 6], 7)).toEqual([0, 1]);
        });
    });

    describe("Optimized", () => {
        it("should calculate [1,3,7,9,2] with 11 correctly", () => {
            expect(optimized([1, 3, 7, 9, 2], 11)).toEqual([3, 4]);
        });

        it("should calculate [1,3,7,9,2] with 25 correctly", () => {
            expect(optimized([1, 3, 7, 9, 2], 25)).toEqual(null);
        });

        it("should calculate [] correctly with 1", () => {
            expect(optimized([], 1)).toEqual(null);
        });

        it("should calculate [5] correctly with 5", () => {
            expect(optimized([5], 5)).toEqual(null);
        });

        it("should calculate [1, 6] correctly with 7", () => {
            expect(optimized([1, 6], 7)).toEqual([0, 1]);
        });
    });
});
