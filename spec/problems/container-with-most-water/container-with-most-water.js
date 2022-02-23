const mostWater_1 = (chartBars) => {
    let maxArea = 0;
    for (a = 0; a < chartBars.length - 1; a++) {
        for (b = a + 1; b < chartBars.length; b++) {
            const h = Math.min(chartBars[a], chartBars[b]);
            const w = b - a; // distance between indices (width of array... don't need abs())
            const area = w * h;

            maxArea = Math.max(maxArea, area);
        }
    }
    return maxArea;
};

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
