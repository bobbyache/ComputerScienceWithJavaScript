var maxArea = (nums) => {
    let left = 0;
    let right = nums.length - 1;
    let maxArea = 0;

    while (left < right) {
        let currentArea = (right - left) * Math.min(nums[left], nums[right]);
        maxArea = Math.max(currentArea, maxArea);

        if (nums[left] <= nums[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxArea;
};

console.log(maxArea([7, 1, 2, 3, 9]))
