
// fibonacci.js

/* *************************************************************************************************
Problem:            Fibonnaci (with Memoization)
Main Formula:       
Approach:           
************************************************************************************************* */

const naiveFibonacci = (num) => {
    if (num <= 2) return 1;
    return naiveFibonacci(num - 1) + naiveFibonacci(num - 2);
};

const optimizedFibonacci = (num, memo = {}) => {
    if (num in memo) return memo[num];
    if (num <= 2) return 1;
    memo[num] = optimizedFibonacci(num - 1, memo) + optimizedFibonacci(num - 2, memo);
    return memo[num];
};

module.exports = {
    naiveFibonacci: naiveFibonacci,
    optimizedFibonacci: optimizedFibonacci,
};

