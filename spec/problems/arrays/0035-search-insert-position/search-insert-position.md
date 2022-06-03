#  Search Insert Position (0035)

| | |
| --- | --- |
| Difficulty | Easy |
| Approach | Shifting Pointers |

## Problem

Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.

## Solution

### Optimized

```js

const searchInsert = (nums, target) => {
    
    if (!nums.length) return 0;

    var mid = 0;
    var left = 0;
    var right = nums.length - 1;

    while (left <= right) {
        mid = Math.floor((left + right) / 2);
        
        if (target < nums[mid]) {
            right = mid - 1;
        } else  if (target > nums[mid]) {
            left = mid + 1;
        } else {
            return mid;
        }
    }
    
    return (nums[mid] > target) ? mid : mid + 1;
};

```

## Explanation

nope.

## Complexity

| Type | Naive | Optimized |
| --- | --- | --- |
| Time | O(N) | O(N) |
| Space | O(N) | O(N) |

# Reference(s):

- [Leet Problem no. 0035](https://leetcode.com/problems/search-insert-position/) -  Search Insert Position
- [Hyperlink](https://msn.com)
- [Hyperlink](https://msn.com)

