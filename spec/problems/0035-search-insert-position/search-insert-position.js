/* *************************************************************************************************
Problem:             Search Insert Position
Difficulty:         Easy
Approach:           Shifting Pointers, Binary Search 
Leet No.:           0035
Leet Url:           https://leetcode.com/problems/search-insert-position/
Efficiency:
    Time (Optimized): O(N)
    Space (Optmized): O(N)


Given a sorted array of distinct integers and a target value, return the index if the target 
is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.
************************************************************************************************* */


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

module.exports = {
    searchInsert: searchInsert
};

/* *************************************************************************************************
Use debugger
    node inspect -search-insert-position.js

    Use "debugger" to debug. See main README.
************************************************************************************************* */

// naive(nums)
// searchInsert(nums)

