const { 
    binarySearch
} = require("./binary-search.js");

describe("Binary Search", () => {
    it(`should be realized`, () => {
        expect(binarySearch([1,2,5,8,15,20,22], 2)).toEqual(1);
    })
});
