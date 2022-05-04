/* *************************************************************************************************
Problem Description
----------------------------------------------------------------------------------------------------
You are given an array of positive Integers where each integer represents the height of a vertical
line on a chart. Find two lines which together with the x-axis forms a container that would hold
the greatest amount of water.

Return the area of water it would hold.

References
----------------------------------------------------------------------------------------------------
https://www.udemy.com/course/master-the-coding-interview-big-tech-faang-interviews/learn/lecture/19669632

Leet Code:
    https://leetcode.com/problems/container-with-most-water/

Main Formula
----------------------------------------------------------------------------------------------------
area = lowest side - width
area = min(left side, right side) * (p2 index - p1 index)

************************************************************************************************* */

// getMaxWaterContainer()
const mostWater_1 = (chartBars) => {
    let maxArea = 0;

    for (let p1 = 0; p1 < chartBars.length - 1; p1++) {
        for (let p2 = p1 + 1; p2 < chartBars.length; p2++) {
            const h = Math.min(chartBars[p1], chartBars[p2]);
            const w = p2 - p1; // distance between indices (width of array... don't need abs())
            const area = w * h;

            maxArea = Math.max(maxArea, area);
        }
    }
    return maxArea;
};

// getMaxWaterContainer()
const mostWater_2 = (heights) => {
    let p1 = 0,
        p2 = heights.length - 1,
        maxArea = 0;

    while (p1 < p2) {
        const height = Math.min(heights[p1], heights[p2]);
        const width = p2 - p1;
        const area = height * width;
        maxArea = Math.max(maxArea, area);

        // Larger distance between indeces is no guarantee that area will
        // be larger...
        // Outcome of the area is impacted by the lesser of the two values.
        // The only value that has impact on the outcome of the area is the
        // smaller value - if the larger value gets larger it doesn't matter
        //
        // Always move the smaller value inwards to see if that gets us a 
        // larger area...
        // 
        // https://www.udemy.com/course/master-the-coding-interview-big-tech-faang-interviews/learn/lecture/19669646#overview
        // Time: 5:25

        if (heights[p1] <= heights[p2]) {
            p1++;
        } else {
            p2--;
        }
    }

    return maxArea;
};

module.exports = {
    unOptimized: mostWater_1,
    optimized: mostWater_2,
};
