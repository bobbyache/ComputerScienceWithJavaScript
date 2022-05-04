// Source: https://www.geeksforgeeks.org/given-two-sorted-arrays-number-x-find-pair-whose-sum-closest-x/

// Simple solution is to run two loops. The outer loop considers every element int
// the first array and the inner loop considers every element in the second array.
// Keep track of the minimum difference between array1[i], array2[j].
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
    let leftIndex = 0; // array1
    let rightIndex = array2.length - 1;
    let leftVal, rightVal;

    while (leftIndex < array1.length && rightIndex >= 0) {
        let calcValue = array1[leftIndex] + array2[rightIndex];
        let temp = Math.abs(value - calcValue);

        // console.log(`(lptr[${leftIndex}]=${array1[leftIndex]}, rptr[${rightIndex}]=${array2[rightIndex]}) - Diff = ${value} - ${calcValue} = ${temp} - calcValue is ${calcValue < value ? "<" : ">="} than value`);

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
