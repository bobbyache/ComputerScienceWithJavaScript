#  Max Sub Array (0053)

| | |
| --- | --- |
| Difficulty | Easy |
| Approach | Dynamic Programming (Hadane's Algorithms) |

## Problem

- Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
- A subarray is a contiguous part of an array.

## Solution

### Optimized

```js

function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = maxSum;

    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(currentSum, maxSum);
    }

    return maxSum;
}

```

## Explanation

nope.

## Complexity

| Type | Naive | Optimized |
| --- | --- | --- |
| Time | O(N) | O(1) |
| Space | O(N) | O(N) |

# Reference(s):

- [Leet Problem no. 0053](https://leetcode.com/problems/maximum-subarray/) -  Max Sub Array

