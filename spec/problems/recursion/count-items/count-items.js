/*******************************************************************************
Problem
--------------------------------------------------------------------------------
Count the number of items in an array.

References
--------------------------------------------------------------------------------
- JavaScript Algorithms and Data Structures Masterclass (Udemy)
    Resursion Section

Analysis
--------------------------------------------------------------------------------
Simple recursion algorithm.

*******************************************************************************/

function countItems(nums) {
    if (nums.length === 0) return 0;
    nums.shift();
    return 1 + countItems(nums);
}

module.exports = {
    recursive: countItems
};
