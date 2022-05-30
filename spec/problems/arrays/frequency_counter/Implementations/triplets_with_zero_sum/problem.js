// Source: https://www.geeksforgeeks.org/find-triplets-array-whose-sum-equal-zero/

// Not sure where you first got this from, but the hyperlink above points to a
// different link. The problem is slightly different and harder because you have to
// find all triplets summing to zero in the array and pass them back.

const findTriplets_1 = (nums) => {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            for (let k = j + 1; j < nums.length; j++) {
              if (nums[i] + nums[j] + nums[k] === 0)
                return true;   
            }
        }
    }

    return false;
};

const findTriplets_2 = (nums) => {
    for (let i = 0; i < nums.length - 1; i++) {

        var valuesSet = new Set();

        for (let j = i + 1; j < nums.length; j++) {
            // lookup opposite sign of the sum of these two numbers in the set.
            // once found, you'll have found a triplet.
            var temp = -(nums[i] + nums[j]);
            if (valuesSet.has(temp)) {
                return true;
            } else {
                valuesSet.add(nums[j]);
            }
        }
    }
    return false;
};

module.exports = {
    unOptimized: findTriplets_1,
    optimized: findTriplets_2,
};
