
/* *************************************************************************************************
Problem:            Two Sum on Sorted Array
Difficulty:         Easy
Approach:           Two Pointer. Shifting Pointers
Leet No.:           0167
Leet Url:           https://leetcode.com/problems/maximum-subarray/
Efficiency:
    Time (Optimized): O(N)
    Space (Optmized): O(1)
************************************************************************************************* */


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

module.exports = {
    twoSum: twoSum
};

/* *************************************************************************************************
Use debugger
    node inspect two-sum-on-sorted-array.js

    Use "debugger" to debug. See main README.
************************************************************************************************* */

// twoSum(nums, target)

