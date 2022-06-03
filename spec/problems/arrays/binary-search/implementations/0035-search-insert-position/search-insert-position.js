
/* *************************************************************************************************
Problem:            Search Insert Position
Main Formula:       
Approach:           
************************************************************************************************* */

const searchInsert = (nums, target) => {
    
    if (!nums.length) return 0;

    var mid = 0;
    var left = 0;
    var right = nums.length - 1;

    while (left <= right) {
        mid = Math.floor((left + right) / 2);

        if (target > nums[mid]) {
            left = mid + 1;
        }
        else if (target < nums[mid]) {
            right = mid - 1;
        } else {
            // equal, so return the index
            return mid;
        }
    }

    // wasn't found, so find index it should be inserted into.
    return (target < nums[mid]) ? mid : mid + 1;
}

module.exports = {
    searchInsert: searchInsert
};

/* *************************************************************************************************
Use debugger
    node inspect search-insert-position.js
************************************************************************************************* */
// searchInsert(nums, target)

