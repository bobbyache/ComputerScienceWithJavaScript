// collect-odds.spec.js

/* *************************************************************************************************
Problem:            Collect Odds (Helper methods vs. Pure Recursion)
Main Formula:       
Approach:           
************************************************************************************************* */

describe("collect odds", () => {
    const { collectOdds1, collectOdds2 } = require("./collect-odds.js");
    beforeEach(() => {});

    describe("collectOdds1 when called", () => {
        it(`should return [1, 3, 5] when given [1,2,3,4,5] `, () => {
            expect(collectOdds1([1,2,3,4,5])).toEqual([1, 3, 5]);
        });
    });

    describe("collectOdds2 when called", () => {
        it(`should return [1, 3, 5] when given [1,2,3,4,5] `, () => {
            expect(collectOdds2([1,2,3,4,5])).toEqual([1, 3, 5]);
        });
    });
});

