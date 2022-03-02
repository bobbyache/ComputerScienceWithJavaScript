
/*
https://www.youtube.com/watch?v=qqXOZD4zKEg

This pattern involves creating a window which can either be an array or number from one
position to another.

Depending on a certain condition, the window either increases or closes (and a new window
    is created).

Very useful for keeping track of a subset of data in larger set of data such as an 
    array/string etc.

                                    [***---]
                                    [-***--]
                                    [--***-]
                                    [---***]
*/

/*
Write a function called maxSubArraySum which accepts an array of integers and a number called n.
The function should calculate the maximum sum of n consecutive elements in the array.
*/

// O(N^2)
const maxSubArraySum_naive = (arr, num) => {
    if (num > arr.length) {
        return null;
    }

    var max = -Infinity; // account for array with negative numbers?

    for (let i = 0; i < arr.length - num + 1; i++) {
        temp = 0;
        for (let j = 0; j < num; j++) {
            temp += arr[i + j];
        }
        if (temp > max) {
            max = temp;
        }
        console.log(temp, max);
    }
    return max;
};

// O(N)
const maxSubArraySum_optimized = (arr, num) => {
    let maxSum = 0;
    let tempSum = 0;

    if (arr.length < num) return null;

    // first sum together the first window
    for (let i = 0; i < num; i++) {
        maxSum += arr[i];
    }

    tempSum = maxSum;

    // slide the window by subtracting the first index from the last window
    // and then adding last index of the new window.
    for (let i = num; i < arr.length; i++) {
        // console.log(`${tempSum} = ${tempSum} - ${arr[i - num]} + ${arr[i]}`)
        tempSum = tempSum - arr[i - num] + arr[i];
        maxSum = Math.max(maxSum, tempSum);
    }

    return maxSum;
};


module.exports = {
    maxSubArraySum_naive: maxSubArraySum_naive,
    maxSubArraySum_optimized: maxSubArraySum_optimized
};
