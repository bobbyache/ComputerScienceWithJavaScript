// Source: https://www.geeksforgeeks.org/given-two-sorted-arrays-number-x-find-pair-whose-sum-closest-x/
// The following problem only checks to see if a pair exists...

const closest_pair_unoptimized = (array1, array2, value) => {

    let current = -1;
    let pair = [0, array2.length - 1]

    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
            let temp = Math.abs(value - (array1[i] + array2[j]));

            if (current === -1) {
                current = temp;
            }
            else if (temp < current) {
                current = Math.min(current, temp);
                pair = [array1[i], array2[j]];
            }
        }
    }
    return pair;
};

const closest_pair_optimized = (array1, array2, value) => {
    let diff = Number.MAX_VALUE;
    let l =  0;
    let r = array2.length - 1;
    let l_result, r_result;

    while (l < array1.length && r >= 0) {
        let temp = Math.abs(value - (array1[l] + array2[r]));
        if (temp < diff) {
            diff = temp;
            l_result = array1[l];
            r_result = array2[r]
        }

        if (array1[l] + array2[r] < value) {
            l++;
        } else {
            r--;
        }
    }
    return [l_result, r_result];
};


module.exports = {
    unOptimized: closest_pair_unoptimized,
    optimized: closest_pair_optimized,
};
