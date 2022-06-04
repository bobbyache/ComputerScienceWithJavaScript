
// can-sum.js

/* *************************************************************************************************
Problem:            Can Sum (with Memoization)
Main Formula:       
Approach:           Dynamic Programming, Recursion, Memoization
************************************************************************************************* */

const naiveCanSum = (targetSum, numbers) => {
    if (targetSum === 0) return true;
    if (targetSum < 0 ) return false;

    for (let num of numbers) {
        const remainder = targetSum - num;

        if (naiveCanSum(remainder, numbers) === true) {
            return true;
        }
    }

    return false;
};

const memoizedCanSum = (targetSum, numbers, memo = {}) => {
    if (targetSum === 0) return true;
    if (targetSum < 0 ) return false;
    if (targetSum in memo) return memo[targetSum];

    for (let num of numbers) {
        const remainder = targetSum - num;

        if (memoizedCanSum(remainder, numbers, memo) === true) {
            memo[targetSum] = true;
            return true;
        }
    }

    memo[targetSum] = false;
    return false;
};

module.exports = {
    naiveCanSum: naiveCanSum,
    memoizedCanSum: memoizedCanSum,
};

