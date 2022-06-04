// backspace-string-compare.spec.js

/* *************************************************************************************************
Problem:            Backspace String Compare
Main Formula:       
Approach:           
************************************************************************************************* */

describe("backspace string compare", () => {
    const { backspaceCompare } = require("./backspace-string-compare.js");
    beforeEach(() => {});

    describe("backspaceCompare when called", () => {
        it(`should return true when given S, T `, () => {
            expect(backspaceCompare('', '')).toEqual(true);
            expect(backspaceCompare('a', 'a')).toEqual(true);
            expect(backspaceCompare('a', 'c')).toEqual(false);
            expect(backspaceCompare('ab#z', 'az#z')).toEqual(true);
            expect(backspaceCompare('abc#d', 'abzz##d')).toEqual(true);

            expect(backspaceCompare('abc#d', 'acc#c')).toEqual(false);
            expect(backspaceCompare('x#y#z#', 'a#')).toEqual(true);
            expect(backspaceCompare('a###b', 'b')).toEqual(true);
            expect(backspaceCompare('Ab#z', 'ab#z')).toEqual(false);
            expect(backspaceCompare('xywrrmp', 'xywrrmu#p')).toEqual(true);
            expect(backspaceCompare('abc#d', 'abcc##z#zz##d')).toEqual(true);
        });
    });
});

