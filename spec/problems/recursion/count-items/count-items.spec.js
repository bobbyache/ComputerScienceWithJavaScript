describe("Count items of", () => {
    const { recursive } = require("./count-items.js");
    beforeEach(() => {});

    describe("Recursive Function", () => {
        it(`should return 10 when given [1,2,3,4]`, () => {
            expect(recursive([1,2,3,4])).toEqual(4);
        })
    });
});
