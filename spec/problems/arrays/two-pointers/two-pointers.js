


// Two Pointer Technique
// Source: https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/11183942#overview

/*
Write a function called sumZero which accepts a sorted array of integers. The function should find
the first pair where the sum is 0. Return an array that includes both values that sum to zero or
undefined if a pair does not exist.

...this technique will work because the array is sorted...
*/
const sumZero = (arr) => {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        let sum = arr[left] + arr[right];
        if (sum === 0) {
            return [arr[left], arr[right]];
        } else if (sum < 0) {
            left++;
        } else {
            right--;
        }
    }
    return undefined;
};

// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/11183944#overview
/*
Implement a function called countUniqueValues which accepts a sorted array and counts the unique values
in the array. There can be negative numbers in the array, but it will always be sorted.
*/
const countUniqueValues = (arr) => {
    let basePtr = 0;
    let scoutPtr = 0;
    let counter = arr.length > 0 ? 1 : 0;

    while(basePtr < arr.length -1) {
        if (arr[basePtr] === arr[scoutPtr]) {
            scoutPtr++;
        } else {
            counter++;
            basePtr = scoutPtr;
            scoutPtr++;
        }
    }

    return counter;
};

// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/11183948#overview
// Don't like his solution above because he's writing into the input array.
/*
    function countUniqueValues(arr) {
        var i = 0;
        for (var j = 1; j < arr.length; j++) {
            if (arr[i] !== arr[j]) {
                i++;
                arr[i] = arr[j];
            }
        }
        return i;
    }
*/
module.exports = {
    sumZero: sumZero,
    countUniqueValues: countUniqueValues
};
