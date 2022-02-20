const mostWater_1 = (chartBars) => {
    let maxArea = 0;
    for (a=0; a<chartBars.length-1; a++) {
      for (b=a+1; b<chartBars.length; b++) {
        const h = Math.min(chartBars[a], chartBars[b]);
        const w = b - a; // distance between indices (width of array... don't need abs())
        const area = w*h;
  
        maxArea = Math.max(maxArea, area);
      }
    }
    return maxArea;
};

const mostWater_2 = (heights) => {
    let p1 = 0, p2 = heights.length-1, maxArea = 0;

    while (p1 < p2) {
      const height = Math.min(heights[p1], heights[p2]);
      const width = p2 - p1;
      const area = height * width;
      maxArea = Math.max(maxArea, area);
  
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
