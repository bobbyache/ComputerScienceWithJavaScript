/* *************************************************************************************************
Problem:            Search Insert Position
Difficulty:         Easy
Approach:           Shifting Pointers, Binary Search 
Leet No.:           0035
Leet Url:           https://leetcode.com/problems/search-insert-position/
Efficiency:
    Time (Optimized): O(N)
    Space (Optmized): O(N)


** Note: Ensure the assert function (see readme) is globally available to your snippets.
    You may need to run it first.
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

assert(searchInsert([1,3,4,6,7,9], 2), 1);
