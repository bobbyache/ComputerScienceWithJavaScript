# Two Sum on Sorted Array (0167)

| | |
| --- | --- |
| Difficulty | Easy |
| Approach | Two Pointer. Shifting Pointers |

## Problem

## Solution

### Naïve

```js


```

### Optimized

```js

var twoSum = function(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        if (numbers[left] + numbers[right] < target) {
            left++;
        } else if (numbers[left] + numbers[right] > target) {
            right--;
        } else {
            return [left+1, right+1];
        }
    }
    return null;
};

console.log(twoSum([2, 7, 11, 15], 9));

```

## Explanation

nope.

## Complexity

| Type | Naive | Optimized |
| --- | --- | --- |
| Time | O(N) | O(N) |
| Space | O(N) | O(1) |

# Reference(s):

- [Leet Problem no. 0167](https://leetcode.com/problems/maximum-subarray/) - Two Sum on Sorted Array
- [Hyperlink](https://msn.com)
- [Hyperlink](https://msn.com)

