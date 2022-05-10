# Problem Solving Template

## Problem File

```javascript
/*******************************************************************************
Problem
--------------------------------------------------------------------------------


References
--------------------------------------------------------------------------------
- 

Analysis
--------------------------------------------------------------------------------

*******************************************************************************/
```

```javascript
function func1(input1, input2) {
    return undefined;
}

function func2(input1, input2) {
    return undefined;
}

module.exports = {
    func1: func1,
    func2: func2
};

```

## Problem Test File

```javascript
describe("problem-description", () => {
    const { func1, func2 } = require("./problem-description.js");
    beforeEach(() => {});

    describe("func1", () => {
        // Simple case
        it(`should return ??? when given ???`, () => {
            expect(func1(???)).toEqual(???);
        })
        // Edge case
        it(`should return ??? when given ???`, () => {
            expect(func1(???)).toEqual(???);
        })
    });

    describe("func2", () => {
        // Simple case
        it(`should return ??? when given ???`, () => {
            expect(func2(???)).toEqual(???);
        })
        // Edge case
        it(`should return ??? when given ???`, () => {
            expect(func2(???)).toEqual(???);
        })
    });
});
```
