
### Run your Tests

`npx jasmine` or `npm test` as this has been configured in your `package.json` file.

### Starter Snippets

problem.js
```
// Source: https://www.geeksforgeeks.org/two-pointers-technique/

const mostWater_1 = (nums, target) => {
    return null;
};

const mostWater_2 = (nums, target) => {
    return null;
};

module.exports = {
    unOptimized: mostWater_1,
    optimized: mostWater_2,
};
```

problem.spec.js
```
describe("Problem", () => {
    const { unOptimized, optimized } = require("./problem.js");

    beforeEach(() => {});

    // it(`test`, () => {
    //     expect(true).toBe(true);
    // })
    
    describe("Unoptimized", () => {
        it(`should return ? when given ?`, () => {
       
        })
    });

    describe("Optimized", () => {
        it(`should return ? when given ?`, () => {
       
        })
    });
});
```

### References

- [Creating a new solution with Jasmine](https://jasmine.github.io/setup/nodejs.html)
- [Writing your first test suite](https://jasmine.github.io/tutorials/your_first_suite.html)

### Solutions to this problem
- [Looking to debug Karma? Try This](https://www.youtube.com/watch?v=lgMuiFKq9M4)
- [Mark Heath's Github JavaScript Advent Stuff](https://github.com/markheath/advent-of-code-js) and here is his [YouTube introduction](https://www.youtube.com/watch?v=mC2LRZ23AFU)... here is [2018 C# Stuff](https://github.com/markheath/advent-of-code-2018) and here is [2020 in C#](https://github.com/markheath/AdventOfCode2020) and [2021 in C#](https://github.com/markheath/AdventOfCode2021)



