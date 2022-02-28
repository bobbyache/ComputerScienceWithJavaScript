const { validAnagram1 } = require("./frequency_counter.js");

describe("Find all triplets with zero sum", () => {
    const { unOptimized, optimized, validAnagram1, validAnagram2 } = require("./frequency_counter.js");

    beforeEach(() => {});
    
    describe("Frequency Counter Tests", () => {
        it(`[1, 2, 3], [4, 1, 9] should return true`, () => {
            expect(unOptimized([1, 2, 3], [4, 1, 9])).toEqual(true);
            expect(optimized([1, 2, 3], [4, 1, 9])).toEqual(true);
        })
        it(`[1, 2, 3], [1, 9] should return false`, () => {
            expect(unOptimized([1, 2, 3], [1, 9])).toEqual(false);
            expect(optimized([1, 2, 3], [1, 9])).toEqual(false);
        })

        it(`[1, 2, 1], [4, 4, 1] should return false`, () => {
            expect(unOptimized([1, 2, 1], [4, 4, 1])).toEqual(false);
            expect(optimized([1, 2, 1], [4, 4, 1])).toEqual(false);
        })
        it(`[1, 2, 3, 1, 2, 3], [4, 1, 9, 4, 1, 9] should return true`, () => {
            expect(unOptimized([1, 2, 3, 1, 2, 3], [4, 1, 9, 4, 1, 9])).toEqual(true);
            expect(optimized([1, 2, 3, 1, 2, 3], [4, 1, 9, 4, 1, 9])).toEqual(true);
        })
        it(`[2, 1, 3, 1, 2, 3], [9, 1, 4, 4, 1, 9] should return true`, () => {
            expect(unOptimized([2, 1, 3, 1, 2, 3], [9, 1, 4, 4, 1, 9])).toEqual(true);
            expect(optimized([2, 1, 3, 1, 2, 3], [9, 1, 4, 4, 1, 9])).toEqual(true);
        })
    });

    describe("Valid Anagram Tests", () => {
        it(`should return true`, () => {
            expect(validAnagram1('', '')).toEqual(true);
            expect(validAnagram2('', '')).toEqual(true);
        });
        it(`should return true`, () => {
            expect(validAnagram1('aaz', 'zza')).toEqual(false);
            expect(validAnagram2('aaz', 'zza')).toEqual(false);
        })
        it(`should return true`, () => {
            expect(validAnagram1('anagram', 'nagaram')).toEqual(true);
            expect(validAnagram2('anagram', 'nagaram')).toEqual(true);
        })
        it(`should return true`, () => {
            expect(validAnagram1('rat', 'car')).toEqual(false);
            expect(validAnagram2('rat', 'car')).toEqual(false);
        })
        it(`should return true`, () => {
            expect(validAnagram1('awesome', 'awesom')).toEqual(false);
            expect(validAnagram2('awesome', 'awesom')).toEqual(false);
        })
        it(`should return true`, () => {
            expect(validAnagram1('qwerty', 'qeywrt')).toEqual(true);
            expect(validAnagram2('qwerty', 'qeywrt')).toEqual(true);
        })
        it(`should return true`, () => {
            expect(validAnagram1('texttwisttime', 'timetwisttext')).toEqual(true);
            expect(validAnagram2('texttwisttime', 'timetwisttext')).toEqual(true);
        })
    });
});
