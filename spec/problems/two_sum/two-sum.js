const twoSum_1 = (nums, target) => {
    for (let p1 = 0; p1 < nums.length; p1++) {
        let num_to_find = target - nums[p1];

        for (let p2 = p1 + 1; p2 < nums.length; p2++) {
            if (num_to_find === nums[p2]) {
                return [p1, p2];
            }
        }
    }
    return null;
};

const twoSum_2 = (nums, target) => {
    const numsMap = {};

    for (let p = 0; p < nums.length; p++) {
        const foundAtIndex = numsMap[nums[p]];

        if (foundAtIndex >= 0) {
            return [foundAtIndex, p];
        } else {
            const numberToFind = target - nums[p];
            numsMap[numberToFind] = p;
        }
    }
    return null;
};

module.exports = {
    unOptimized: twoSum_1,
    optimized: twoSum_2,
};
