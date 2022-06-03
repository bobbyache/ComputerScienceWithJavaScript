// search-insert-position.spec.js

/* *************************************************************************************************
Problem:            Search Insert Position
Main Formula:       
Approach:           
************************************************************************************************* */

describe("search insert position", () => {
    const { searchInsert } = require("./search-insert-position.js");
    beforeEach(() => {});

    describe("searchInsert when called", () => {
        it(`should... `, () => {
            expect(searchInsert([1,3,5,6], 5)).toEqual(2);
            expect(searchInsert([1,3,5,6], 2)).toEqual(1);
        });
    });
});

