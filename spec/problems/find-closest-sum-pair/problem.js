// Source:https://www.geeksforgeeks.org/given-sorted-array-number-x-find-pair-array-whose-sum-closest-x/

const calculateClosestPair_1 = (nums, value) => {
    let a, b;
    let diff = Number.MAX_VALUE;

    for (let i = 0; i < nums.length;  i++) {
        for (let j = i + 1; j < nums.length; j++) {
            temp = Math.abs((nums[i] + nums[j]) - value);
            if (temp < diff) {
                diff = temp;
                a = i;
                b = j;
            }
        }
    }
    return [nums[a], nums[b]];
};

const calculateClosestPair_2 = (nums, value) => {
    
    if (nums.length <= 1) return undefined;

    let diff = Number.MAX_VALUE;
    let leftIndex = 0;
    let rightIndex = nums.length - 1;
    let leftVal, rightVal = 0;

    while (leftIndex < rightIndex) {
        let calcValue = nums[leftIndex] + nums[rightIndex];
        let temp = Math.abs(calcValue - value);

        if (temp < diff) {
            diff = temp;
            leftVal = nums[leftIndex];
            rightVal = nums[rightIndex];
        }

        if (calcValue < value) {
            leftIndex++;
        } else {
            rightIndex--;
        }
    }

    return [leftVal, rightVal];
};

module.exports = {
    unOptimized: calculateClosestPair_1,
    optimized: calculateClosestPair_2,
};
