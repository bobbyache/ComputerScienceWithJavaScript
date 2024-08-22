describe("uncompress", () => {
    const { uncompress } = require("./uncompress.js");
    beforeEach(() => {});

    describe("uncompress", () => {
        it(`should return the correct result`, () => {
            expect(uncompress("2c3a1t")).toEqual("ccaaat");
            expect(uncompress("4s2b")).toEqual("ssssbb");
            expect(uncompress("2p1o5p")).toEqual("ppoppppp");
            expect(uncompress("3n12e2z")).toEqual("nnneeeeeeeeeeeezz");
            expect(uncompress("127y")).toEqual("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
        });
    });
});