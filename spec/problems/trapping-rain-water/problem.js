// Source: https://www.udemy.com/course/master-the-coding-interview-big-tech-faang-interviews/learn/lecture/19669662#overview
// and https://leetcode.com/problems/trapping-rain-water/ and https://www.notion.so/Trapping-Rainwater-9ce0b30db0c3412cab17272478f39439
// REPL Code here: https://replit.com/@ZhangMYihua/trapping-rainwater-brute-force-solution#main.js

const trappingRainwater_1 = (nums) => {
    let totalWater = 0;
    
    for (let curPos = 0; curPos < nums.length; curPos++) {
        const curHeight = nums[curPos];
        let maxL = 0;
        let maxR = 0;

        for (let lPtr = curPos - 1; lPtr >= 0; lPtr--) {
            maxL = Math.max(maxL, nums[lPtr]);
        }
        for (let rPtr = curPos + 1; rPtr < nums.length; rPtr++) {
            maxR = Math.max(maxR, nums[rPtr]);
        }
        wallHeight = Math.min(maxL, maxR);
        water = wallHeight - curHeight;

        if (water > 0) totalWater += water;
    }

    return totalWater;
};

const trappingRainwater_2 = (nums) => {
    return undefined;
};

module.exports = {
    unOptimized: trappingRainwater_1,
    optimized: trappingRainwater_2,
};
