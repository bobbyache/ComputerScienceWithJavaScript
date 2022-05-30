
# Important Information

Here is some information on how to do a [Jasmine and Node.js Setup](https://jasmine.github.io/setup/nodejs.html)

### To Do
- [ ] Add generated files to `.gitignore`.
- [ ] [Read and understand](http://karma-runner.github.io/6.3/intro/how-it-works.html) how Karma might aid in debugging your tests (without Angular).
  - [ ] Also see [Running and Debugging Tests in Karma](https://www.webagesolutions.com/blog/running-and-debugging-tests-in-karma)

Debugging tests with Mocha
- [ ] https://mochajs.org/
- [ ] See [Debugging Mocha Tests in  VS Code](https://dev.to/wakeupmh/debugging-mocha-tests-in-vscode-468a)

# Execution

## Run your Tests

- `npx jasmine` or `npm test` as this has been configured in your `package.json` file.
- To target specific tests use `fdescribe` or `fit`.

## Debugging your tests

- You'll have to use Node to debug your tests. Here are a couple of steps you should take in order to debug your tests in this environment.
- In order for this to work you will haev to:
  - Navigate to the `*.js` file that contains your function.
  - Make sure you add `debugger` statements where you want to debug your code.
  - Actually call the function from within your code.
  - Following the steps below to do the actual debugging.

Ask node to inspect the file.

```
node inspect sliding-window.js
```

It'll tell you the debugger is attached, note the [URL](https://nodejs.org/en/docs/guides/debugging-getting-started/) where you can get extra help. You'll see that there is a `>` where the debugger has stopped on the first line.

```
< Debugger listening on ws://127.0.0.1:9229/190b0fde-b7e2-4b7b-b3af-b2f160e9f9e8
< For help, see: https://nodejs.org/en/docs/inspector
<
connecting to 127.0.0.1:9229 ... ok
< Debugger attached.
<
Break on start in sliding-window.js:25
 23
 24 // O(N^2)
>25 const maxSubArraySum_naive = (arr, num) => {
 26     if (num > arr.length) {
 27         return null;
debug>
```

If you want to continue to the next debugger statement you can by entering `c` in the terminal.

```
debug> c
break in sliding-window.js:30
 28     }
 29
>30     debugger;
```

Now you can enter variables or logical solutions and see what the output is.

```
debug> repl
Press Ctrl+C to leave debug repl
> num
2
> temp > max
false
>
```

When you're done you can press `Ctrl + C` to exit the repl terminal. From here you can continue to the next `debugger` statement or you can  press `Ctrl + C` one more time to exit the debugger... you'll be asked to confirm, press `Ctrl + C` and you will exit the debugger.


> Alternatively, you can just cut n paste your code into Chrome's browser snippet pane and run and debug inside the browser.


# Starter Snippets

- There is a Qik file that you can use to generate problems and the root folder. Simply type `generate-new-problem.sh` in a bash terminal.
- Alternatively you can use `PowerShell` terminal and execute the following command: `QikConsole gen simple -f ./qik/qik-project.json`.

### problem.js
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

### problem.spec.js
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

# Reusuable PlantUML

#### for loop
```
@startuml

title Given a sorted array find the pair closes to a number
start
    :Move Pointer 1 to index 0;
    
    while (End of List?) is (false)

        :Move Pointer 2 to\nposition after Pointer 1;
        
        while (End of List?) is (false)
            :Calculate formula;
            :Move Pointer 2 forward;
        endwhile

        :Move Pointer 1 forward;
    endwhile

    :Return calculated value;
end
@enduml
```

