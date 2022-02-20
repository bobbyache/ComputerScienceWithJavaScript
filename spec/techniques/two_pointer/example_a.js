// Source: https://www.geeksforgeeks.org/two-pointers-technique/
// The following problem only checks to see if a pair exists...

const two_pointer_a_unoptimized = (nums, value) => {
    for (var i = 0; i < N-1; i++) {
        for (var j = 0; j < N; j++) {
            if (i == j) {
                continue;
            }

            if (nums[i] + nums[j] === value) {
                return 1;
            }

            if (nums[i] + nums[j] > value) {
                break;
            }
        }
    }
    return 0;
};

const two_pointer_a_optimized = (nums, value) => {
    i = 0;
    j = nums.length - 1;

    while (a < j) {
        if (nums[a] + nums[j] === value) {
            return 1;
        }
        else if (nums[a] + nums[j] < value) {
            a++;
        }
        else {
            j--;
        }
    }
    return 0;
};

module.exports = {
    unOptimized: two_pointer_a_unoptimized,
    optimized: two_pointer_a_optimized,
};
