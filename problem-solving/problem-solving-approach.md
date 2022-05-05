# Problem Solving approach

> **Note:** many of these strategies are adapted from George Polya, whose book How To Solve It is a great resource.

## Problem Solving Strategies

- Understand the problem
- Explore concrete examples
- Break it down
- Solve/Simplify
- Look back and refactor

## Undertand the problem

- Can I restate the problem in my own words?
- What are the inputs that go into the problem?
- What are the outputs that should come from the solution to the problem?
- Can the outputs be determined by the inputs? In other words, do I have enough information to solve the problem? (You may not be able to answer this question until you set about solving the problem. That's ok; it's still worth considering the question at this early stage).

## Explore Concrete Examples

- Start with simple examples.
- Progress to more complex examples.
- Explore examples with empty and invalid inputs.

## Break it Down

- Explicitly write out the steps you need to take.
- This forces you to think about the code before you write it.
- Helps catch any lingering conceptual issues or misunderstandings before you dive in to the details.
- Don't get strung up on language syntax.

## Solve/Simplify

- Solve the problem... or if you can't... **solve a simpler problem**.
- Find the core difficulty and temporarily ignore it.
- Write a simplified solution.
- Incorporate the difficulty in later.

## Look Back and Refactor

- Congrats on solving it, but you're not done!
- Can you check the result?
- Can you derive the result differently?
- Can you understand it at a glance?
- Can you use the result or method for some other problem?
- Can you improve the performance of your solution?
- Can you think of other ways to refactor?
- How have other people solved this problem?

# A Practical Example

[Source of this approach](https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/11172596#overview) is given in the Udemy course JavaScript Algorithms and Data Structures Masterclass.

1. Can I restate the problem in my own words (to help me understand)?

2. What are the inputs that go into the problem?
    data types? what about edge case values?

3. What are the outputs that should come from the solution to the problem?
    data types? what about edge case values?

4. Can the outputs be determined by the inputs? Do I have enough information to solve the problem?

5. How should I label the important pieces of data that are part of the problem?

> Write a function which takes in a string and returns counts of each character in the string.

## Start with Plain Text

Write out the skeleton and write down what you expect to do.

```
charCount("You pin number is 1234") {
    // do something
    // return something
}
```
Ask some questions, the interviewer makes something clearer.
```
charCount("You pin number is 1234") {
    // do something
    // return an object with keys that are lower case 
    //  alphanumeric characters in the string (case doesn't matter)
    // values should be the counts.
}
```
## Move to Pseudo-code

Embelish on the solution once you learn more about it.

```
charCount(str) {
    // make object to return
    // loop over string
        // lower case the character.
    // if the char is a key in object add one to count, otherwise
    // return object at end
}
```

## Basic Solution - Convert to Code
You may start with a basic coding solution

```javascript
const charCount = (str) => {
    var obj = {};
    for (var i = 0; i < str.length; i++) {
        var char = str[i].toLowerCase();

        if (/[a-z0-9]/.test(char)) {
            if (obj[char] > 0) {
                obj[char++];
            } else {
                obj[char] = 1;
            }
        }
    }
    return obj;
}
```
Decide that you can simplify the loop

```javascript
const charCount = (str) => {
    var obj = {};
    for (var char of str) {
        var char = char.toLowerCase();

        if (/[a-z0-9]/.test(char)) {
            if (obj[char] > 0) {
                obj[char++];
            } else {
                obj[char] = 1;
            }
        }
    }
    return obj;
}
```

Refactor the logic within the loop

```javascript
const charCount = (str) => {
    const obj = {};
    for (let char of str) {
        char = char.toLowerCase();

        if (/[a-z0-9]/.test(char)) {
            obj[char] = ++obj[char] || 1;
        }
    }
    return obj;
}
```

```javascript
const charCount = (str) => {
    const obj = {};
    for (let char of str) {
        if (isAlphaNumeric(char)) {
            char = char.toLowerCase();
            obj[char] = ++obj[char] || 1;
        }
    }
    return obj;
};

const isAlphaNumeric = (char) => {
    var code = char.charCodeAt(0);

    if (!(code > 47 && code < 58) &&    // numeric (0-9)
        !(code > 64 && code < 91) &&    // upper alpha (A-Z)
        !(code > 96 && code < 123)) {   // lower alpha (a-z)
        return false;
    }
    return true;
};
```
