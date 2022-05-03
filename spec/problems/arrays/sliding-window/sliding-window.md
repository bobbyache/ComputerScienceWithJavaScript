# Definition

- This pattern involves creating a window which can either be an array or number from one position to another.
- Depending on a certain condition, the window either increases or closes (and a new window is created).
- Very useful for keeping track of a subset of data in an array/string etc.

# Description

- Technique and the source of some of these problems can be found [here](https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/11183952#overview).

# Examples

## Find the max value of the sum of three consecutive numbers in an integer array.

- First check an return a value for any invalid input data.
- Initialize two variables
    - max sum
    - temp sum
- calculate the first sequence (one loop).
- set temp sum to the calculated max sum.
- start a new loop, set `i` to the num argument (effectively adjusting the window so that `i` is always the last index in the set), and iterate to the end.
    - subtract the min index and add the max index to the temp sum.
    - if the temp sum is larger than the max sum, replace it.

- finally return the max sum.

```javascript
const maxSubArraySum = (arr, num) => {
    let maxSum = 0;
    let tempSum = 0;

    if (arr.length < num) return null;

    for (let i = 0; i < num; i++) {
        maxSum += arr[i];
    }

    tempSum = maxSum;

    for (let i = num; i < arr.length; i++) {
        tempSum = tempSum - arr[i - num] + arr[i];
        maxSum = Math.max(maxSum, tempSum);
    }

    return maxSum;
};
```

> **Note:** Your original mistake trying to use the sliding window is that you tried to **skip** the first loop and try and inline the logic and therefore got it wrong. **Remember to explicitly write/code all steps... look for efficiency later**.

> **Note:** Seting the index to the *other* side of the window allows us to not have to deal with the off-by-n error. One doesn't always have to track the lower window index if the upper one is a better tactic.


