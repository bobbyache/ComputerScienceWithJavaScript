const { same1, same2, validAnagram1, validAnagram2, validAnagram3 } = require("./frequency-counter.js");

describe("Find all triplets with zero sum", () => {

    beforeEach(() => {});
    
    describe("Frequency Counter Tests", () => {
        it(`[1, 2, 3], [4, 1, 9] should return true`, () => {
            expect(same1([1, 2, 3], [4, 1, 9])).toEqual(true);
            expect(same2([1, 2, 3], [4, 1, 9])).toEqual(true);
        })
        it(`[1, 2, 3], [1, 9] should return false`, () => {
            expect(same1([1, 2, 3], [1, 9])).toEqual(false);
            expect(same2([1, 2, 3], [1, 9])).toEqual(false);
        })

        it(`[1, 2, 1], [4, 4, 1] should return false`, () => {
            expect(same1([1, 2, 1], [4, 4, 1])).toEqual(false);
            expect(same2([1, 2, 1], [4, 4, 1])).toEqual(false);
        })
        it(`[1, 2, 3, 1, 2, 3], [4, 1, 9, 4, 1, 9] should return true`, () => {
            expect(same1([1, 2, 3, 1, 2, 3], [4, 1, 9, 4, 1, 9])).toEqual(true);
            expect(same2([1, 2, 3, 1, 2, 3], [4, 1, 9, 4, 1, 9])).toEqual(true);
        })
        it(`[2, 1, 3, 1, 2, 3], [9, 1, 4, 4, 1, 9] should return true`, () => {
            expect(same1([2, 1, 3, 1, 2, 3], [9, 1, 4, 4, 1, 9])).toEqual(true);
            expect(same2([2, 1, 3, 1, 2, 3], [9, 1, 4, 4, 1, 9])).toEqual(true);
        })
    });

    describe("Valid Anagram Tests", () => {
        it(`should return true`, () => {
            expect(validAnagram1('', '')).toEqual(true);
            expect(validAnagram2('', '')).toEqual(true);
            expect(validAnagram3('', '')).toEqual(true);
        });
        it(`should return true`, () => {
            expect(validAnagram1('aaz', 'zza')).toEqual(false);
            expect(validAnagram2('aaz', 'zza')).toEqual(false);
            expect(validAnagram3('aaz', 'zza')).toEqual(false);
        })
        it(`should return true`, () => {
            expect(validAnagram1('anagram', 'nagaram')).toEqual(true);
            expect(validAnagram2('anagram', 'nagaram')).toEqual(true);
            expect(validAnagram3('anagram', 'nagaram')).toEqual(true);
        })
        it(`should return true`, () => {
            expect(validAnagram1('rat', 'car')).toEqual(false);
            expect(validAnagram2('rat', 'car')).toEqual(false);
            expect(validAnagram3('rat', 'car')).toEqual(false);
        })
        it(`should return true`, () => {
            expect(validAnagram1('awesome', 'awesom')).toEqual(false);
            expect(validAnagram2('awesome', 'awesom')).toEqual(false);
            expect(validAnagram3('awesome', 'awesom')).toEqual(false);
        })
        it(`should return true`, () => {
            expect(validAnagram1('qwerty', 'qeywrt')).toEqual(true);
            expect(validAnagram2('qwerty', 'qeywrt')).toEqual(true);
            expect(validAnagram3('qwerty', 'qeywrt')).toEqual(true);
        })
        it(`should return true`, () => {
            expect(validAnagram1('texttwisttime', 'timetwisttext')).toEqual(true);
            expect(validAnagram2('texttwisttime', 'timetwisttext')).toEqual(true);
            expect(validAnagram3('texttwisttime', 'timetwisttext')).toEqual(true);
        })
    });
});
