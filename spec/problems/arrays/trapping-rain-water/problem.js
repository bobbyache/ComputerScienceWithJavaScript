// Source: https://www.udemy.com/course/master-the-coding-interview-big-tech-faang-interviews/learn/lecture/19669662#overview
// and https://leetcode.com/problems/trapping-rain-water/ and https://www.notion.so/Trapping-Rainwater-9ce0b30db0c3412cab17272478f39439
// REPL Code here: https://replit.com/@ZhangMYihua/trapping-rainwater-brute-force-solution#main.js

/*
    Given an array of integers representing an elevation map where the width of each bar is 1,
    return how much rainwater can be trapped.
*/

// with for loops
// ------------------------------------------------------------------

//// Time Complexity: O(N^2), Space Complexity: O(1)

// const trapRainwater_1 = (nums) => {
//     let totalWater = 0;

//     for (let curPos = 0; curPos < nums.length; curPos++) {
//         const curHeight = nums[curPos];
//         let maxL = 0;
//         let maxR = 0;

//         for (let lPtr = curPos; lPtr >= 0; lPtr--) {
//             maxL = Math.max(nums[lPtr], maxL);
//         }
//         for (let rPtr = curPos; rPtr < nums.length; rPtr++) {
//             maxR = Math.max(nums[rPtr], maxR);
//         }

//         waterAtPoint = Math.min(maxL, maxR) - curHeight;
//         totalWater += waterAtPoint >= 0 ? waterAtPoint : 0;
//     }
//     return totalWater;
// };

// with while loops
// ------------------------------------------------------------------

// Time Complexity: O(N^2), Space Complexity: O(1)

const unOptimized = (nums) => {
    let totalWater = 0;

    for (let curPos = 0; curPos < nums.length; curPos++) {
        const curHeight = nums[curPos];
        let maxL = 0;
        let maxR = 0;
        let leftPos = curPos;
        let rightPos = curPos;

        while (leftPos >= 0) {
            maxL = Math.max(nums[leftPos], maxL);
            leftPos--;
        }

        while (rightPos < nums.length) {
            maxR = Math.max(nums[rightPos], maxR);
            rightPos++;
        }

        waterAtPoint = Math.min(maxL, maxR) - curHeight;
        totalWater += waterAtPoint >= 0 ? waterAtPoint : 0;
    }
    return totalWater;
};

//// Time Complexity: O(N), Space Complexity: O(N)
//// Your worked out solution (YAY !!!!)
//// You managed to work this out thinking about it based on the sliding window that you learned.
const yoursOptimized = (nums) => {
    /*
        for each element in the array
            get value directly before it and store it if it is the max left using index as key.

        for each element in the array
            get the value directly ahead of it and store it if it is the max right using index as key.

        for each element in the array
            at its index look up the left and right values
            apply the formula and calculate the running total
    */
    let totalWater = 0;

    let maxL = 0;
    const maxLefts = {};

    let maxR = 0;
    const maxRights = {};

    for (let i = 0; i < nums.length; i++) {
        if (i >= 1) {
            maxL = Math.max(maxL, nums[i - 1]);
            maxLefts[i] = maxL;
        } else {
            maxLefts[i] = 0;
        }
    }

    for (let i = nums.length -1; i >= 0; i--) {
        if (i < nums.length - 1) {
            maxR = Math.max(maxR, nums[i + 1]);
            maxRights[i] = maxR;
        } else {
            maxRights[i] = 0;
        }
    }

    for (let i = 0; i < nums.length; i++) {
        let currWater = Math.min(maxLefts[i], maxRights[i]) - nums[i];
        totalWater += ((currWater >= 0) ? currWater : 0);
        // console.log(`min(${maxLefts[i]}, ${maxRights[i]}) - ${nums[i]}`);
    }

    return totalWater;
};

//// Time Complexity: O(N), Space Complexity: O(1)
/*
1. Identify pointer with lesser value
2. Is this pointer value lesser than or equal to the pointer value on the other side.
    yes -> update max
    no -> get water and add to total
3. Move the pointer inwards
4. Repeat for other pointers until indeces meet.
*/
const theirsOptimized = (nums) => {
    let pLeft = 0;
    let pRight = nums.length - 1;
    let maxLeft = 0;
    let maxRight = 0;
    let totalWater = 0;

    while (pLeft < pRight) {
        if (nums[pLeft] <= nums[pRight]) {
            if (nums[pLeft] <= maxLeft) {
                totalWater += maxLeft - nums[pLeft]
            } else {
                maxLeft = nums[pLeft];
            }
            pLeft++;
        } else {
            if (nums[pRight] <= maxRight) {
                totalWater += maxRight - nums[pRight];
            } else {
                maxRight = nums[pRight];
            }
            pRight--;
        }
    }
    return totalWater;
};

module.exports = {
    unOptimized: unOptimized,
    yoursOptimized: yoursOptimized,
    theirsOptimized: theirsOptimized
};
