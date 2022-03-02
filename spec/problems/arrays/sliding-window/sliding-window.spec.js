const { 
    maxSubArraySum_naive, 
    maxSubArraySum_optimized 
} = require("./sliding-window.js");

describe("maxSubArraySum", () => {
    it(`should be realized`, () => {
        expect(maxSubArraySum_naive([1,2,5,2,8,1,5], 2)).toEqual(10);
    })
    it(`should be realized`, () => {
        expect(maxSubArraySum_naive([1,2,5,2,8,1,5], 4)).toEqual(17);
    })
    it(`should be realized`, () => {
        expect(maxSubArraySum_naive([4,2,1,6], 1)).toEqual(6);
    })
    it(`should be realized`, () => {
        expect(maxSubArraySum_naive([4,2,1,6,2], 4)).toEqual(13);
    })
    it(`should be realized`, () => {
        expect(maxSubArraySum_naive([], 4)).toEqual(null);
    })
});

describe("maxSubArraySum", () => {
    it(`should be realized`, () => {
        expect(maxSubArraySum_optimized([1,2,5,2,8,1,5], 2)).toEqual(10);
    })
    it(`should be realized`, () => {
        expect(maxSubArraySum_optimized([1,2,5,2,8,1,5], 4)).toEqual(17);
    })
    it(`should be realized`, () => {
        expect(maxSubArraySum_optimized([4,2,1,6], 1)).toEqual(6);
    })
    it(`should be realized`, () => {
        expect(maxSubArraySum_optimized([4,2,1,6,2], 4)).toEqual(13);
    })
    it(`should be realized`, () => {
        expect(maxSubArraySum_optimized([], 4)).toEqual(null);
    })
});


