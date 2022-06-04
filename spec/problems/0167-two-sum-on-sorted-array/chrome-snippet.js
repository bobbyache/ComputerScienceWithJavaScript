/* *************************************************************************************************
Problem:            Two Sum on Sorted Array
Difficulty:         Easy
Approach:           Two Pointer. Shifting Pointers
Leet No.:           0167
Leet Url:           https://leetcode.com/problems/maximum-subarray/
Efficiency:
    Time (Optimized): O(N)
    Space (Optmized): O(1)


** Note: Ensure the assert function (see readme) is globally available to your snippets.
    You may need to run it first.
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

// assert(naive($0, $1), $2);

// assert(twoSum($0, $1), $2);

