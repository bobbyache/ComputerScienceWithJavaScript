const { sumZero, countUniqueValues } = require("./two-pointers.js");

describe("first pair where the sum is 0", () => {
    it(`should be realized`, () => {
        expect(sumZero([-3, -2, -1, 0, 1, 2, 3])).toEqual([-3, 3]);
    })
    it(`should be realized`, () => {
        expect(sumZero([-2, 0, 1, 3])).toEqual(undefined);
    })
    it(`should be realized`, () => {
        expect(sumZero([1, 2, 3])).toEqual(undefined);
    })
    it(`should be realized`, () => {
        expect(sumZero([-4, -3, -2, -1, 0, 1, 2, 3, 10])).toEqual([-3, 3]);
    })
});

describe("count unique values", () => {
    it(`should be realized`, () => {
        expect(countUniqueValues([1, 1, 1, 1, 1, 2])).toEqual(2);
    })
    it(`should be realized`, () => {
        expect(countUniqueValues([1,2,3,4,4,4,5,5,12,12,13])).toEqual(7);
    })
    it(`should be realized`, () => {
        expect(countUniqueValues([])).toEqual(0);
    })
    it(`should be realized`, () => {
        expect(countUniqueValues([1])).toEqual(1);
    })
    it(`should be realized`, () => {
        expect(countUniqueValues([-2,-1,-1,0,1])).toEqual(4);
    })
});
