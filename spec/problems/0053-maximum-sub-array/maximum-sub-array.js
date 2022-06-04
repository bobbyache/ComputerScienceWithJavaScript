
/* *************************************************************************************************
Problem:            Maximum Sub Array
Main Formula:       
Approach:           Dynamic Programming
************************************************************************************************* */

const maxSubArray = (nums) => {
    let maxSum = nums[0];
    let currentSum = maxSum;

    for (let i = 1; i < nums.length; i++) {
        // Grow the window, or slide the window? 
        currentSum = Math.max(nums[i] + currentSum, nums[i]);
        maxSum = Math.max(currentSum, maxSum);
    }
    return maxSum;
};

module.exports = {
    maxSubArray: maxSubArray
};

/* *************************************************************************************************
Use debugger
    node inspect maximum-sub-array.js
************************************************************************************************* */
// maxSubArray(nums)

