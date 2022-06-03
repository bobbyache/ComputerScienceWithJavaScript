/* *************************************************************************************************
Problem:             Max Sub Array
Difficulty:         Easy
Approach:           Dynamic Programming (Hadane's Algorithms)
Leet No.:           0053
Leet Url:           https://leetcode.com/problems/maximum-subarray/
Efficiency:
    Time (Optimized): O(1)
    Space (Optmized): O(N)


** Note: Ensure the assert function (see readme) is globally available to your snippets.
    You may need to run it first.


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

// assert(naive($0), $1);

// assert(maxSubArray($0), $1);

