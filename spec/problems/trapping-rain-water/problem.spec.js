describe("Trapping rainwater", () => {
    const { unOptimized, optimized } = require("./problem.js");

    beforeEach(() => {});

    describe("Unoptimized", () => {
        it("should return 8 when given [0,1,0,2,1,0,3,1,0,1,2]", () => {
            expect(unOptimized([0,1,0,2,1,0,3,1,0,1,2])).toEqual(8);
        });
        it("should return 0 when given []", () => {
            expect(unOptimized([])).toEqual(0);
        });
        it("should return 0 when given [3]", () => {
            expect(unOptimized([3])).toEqual(0);
        });
        it("should return 0 when given [3, 4, 3]", () => {
            expect(unOptimized([3, 4, 3])).toEqual(0);
        });
    });

    // describe("Optimized", () => {
    // });
});
