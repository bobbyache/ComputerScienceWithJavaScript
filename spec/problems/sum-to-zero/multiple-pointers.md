# Definition

- Creating pointers or values that correspond to an index or position and move toward the beginning end or middle based on a certain condition.
- Very efficient for solving problems with minimal space complexity.

# Description

- Usually involving some sort of linear structure like an array or string, or a double/single linked list.
- Usually a search for a pair of values that match a condition.
- Often using two index (pointer) references in various directions.
- Also see two pointer technique and the source of some of these problems can be found [here](https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/11183942#overview).

# Examples

## Find first pair where sum is zero

Source: https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/11183942#overview

Write a function called sumZero which accepts a sorted array of integers. The function should find the first pair where the sum is 0. Return an array that includes both values that sum to zero or undefined if a pair does not exist.

> ...this technique will work because the array is sorted...

```javascript
const sumZero = (arr) => {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        let sum = arr[left] + arr[right];
        if (sum === 0) {
            return [arr[left], arr[right]];
        } else if (sum < 0) {
            left++;
        } else {
            right--;
        }
    }
    return undefined;
};
```

The solution is O(n) time complexity.

### Count unique values

Implement a function called `countUniqueValues` which accepts a sorted array and counts the unique values in the array. There can be negative numbers in the array, but it will always be sorted.

Source: https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/11183944#overview

> ...this technique will work because the array is sorted...

```javascript
const countUniqueValues = (arr) => {
    let basePtr = 0;
    let scoutPtr = 0;
    let counter = 0;

    while(basePtr < arr.length) {
        if (arr[basePtr] == arr[scoutPtr]) {
            scoutPtr++;
        } else {
            counter++;
            basePtr = scoutPtr;
            scoutPtr++;
        }
    }

    return counter;
};
```

The solution is O(n) time complexity.
