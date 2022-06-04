/* *************************************************************************************************
Problem:             Max Sub Array
Difficulty:         Easy
Approach:           Dynamic Programming (Hadane's Algorithms)
Leet No.:           0053
Leet Url:           https://leetcode.com/problems/maximum-subarray/
Efficiency:
    Time (Optimized): O(1)
    Space (Optmized): O(N)

- Given an integer array nums, find the contiguous subarray (containing at least one number)
    which has the largest sum and return its sum.
- A subarray is a contiguous part of an array.
************************************************************************************************* */


function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = maxSum;

    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(currentSum, maxSum);
    }

    return maxSum;
}

module.exports = {
    maxSubArray: maxSubArray
};

/* *************************************************************************************************
Use debugger
    node inspect -max-sub-array.js

    Use "debugger" to debug. See main README.
************************************************************************************************* */

// naive(nums)
// maxSubArray(nums)

