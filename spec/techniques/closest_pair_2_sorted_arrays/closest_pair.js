// Source: https://www.geeksforgeeks.org/given-two-sorted-arrays-number-x-find-pair-whose-sum-closest-x/

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
    let leftIndex = 0;
    let rightIndex = array2.length - 1;
    let leftVal, rightVal;

    while (leftIndex < array1.length && rightIndex >= 0) {
        let calcValue = array1[leftIndex] + array2[rightIndex];
        let temp = Math.abs(value - calcValue);
        if (temp < diff) {
            diff = temp;
            leftVal = array1[leftIndex];
            rightVal = array2[rightIndex];
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
    unOptimized: closest_pair_unoptimized,
    optimized: closest_pair_optimized,
};
