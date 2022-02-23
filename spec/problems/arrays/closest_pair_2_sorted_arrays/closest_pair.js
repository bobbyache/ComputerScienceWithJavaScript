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

/*
The idea is to start from left side of one array and right side of another array,
and use the following algorithm:

    1) Initialize a variable diff as infinite (Diff is used to store the 
    difference between pair and value).  We need to find the minimum diff.
    2) Initialize two index variables l and r in the given sorted array.
        (a) Initialize first to the leftmost index in ar1:  l = 0
        (b) Initialize second  the rightmost index in ar2:  r = n-1
    3) Loop while  l = 0
        (a) If  abs(ar1[l] + ar2[r] - sum) < diff  then 
            update diff and result 
        (b) If (ar1[l] + ar2[r] <  sum )  then l++
        (c) Else r--    
    4) Print the result. 
*/
const closest_pair_optimized = (array1, array2, value) => {
    let diff = Number.MAX_VALUE;
    let leftIndex = 0; // array1
    let rightIndex = array2.length - 1;
    let leftVal, rightVal;

    console.log('---');

    while (leftIndex < array1.length && rightIndex >= 0) {
        
        console.log(leftIndex, rightIndex);

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
