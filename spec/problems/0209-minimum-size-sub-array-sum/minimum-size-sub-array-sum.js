
// 0209-minimum-size-sub-array-sum
// minimum-size-sub-array-sum.js
// minimum-size-sub-array-sum.spec.js
// minimum-size-sub-array-sum.md

/* *************************************************************************************************
Problem:            Minimum Size Sub-array Sum
Main Formula:       
Approach:           

https://www.youtube.com/watch?v=jKF9AcyBZ6E
https://leetcode.com/problems/minimum-size-subarray-sum/
************************************************************************************************* */

const minSubArrayLen = (target, nums) => {
    let result = Number.MAX_SAFE_INTEGER;
    let left = 0;
    let val_sum = 0;

    for (let i = 0; i < nums.length; i++) {
        val_sum += nums[i];

        while(val_sum >= target) {
            result = Math.min(result, i + 1 - left);
            val_sum -= nums[left];
            left++;
        }
    }

    return (result != Number.MAX_SAFE_INTEGER) ? result : 0;
};

module.exports = {
    minSubArrayLen: minSubArrayLen
};

/* *************************************************************************************************
Use debugger
    node inspect minimum-size-sub-array-sum.js
************************************************************************************************* */
// naive(nums, target)
// minSubArrayLen(nums, target)

