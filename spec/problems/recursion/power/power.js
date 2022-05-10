/*******************************************************************************
Problem
--------------------------------------------------------------------------------
Write a function called power which accepts a base and an exponent.
The function should return the power of the base of the exponent.

This function should mimic the functionality of Math.pow()
    - do not worry about negative bases and exponents.

References
--------------------------------------------------------------------------------
- https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/quiz/425998#overview

Analysis
--------------------------------------------------------------------------------
Basic recursion example.

*******************************************************************************/

function iterative_Power(base, exponent) {
    let result = base;

    if (exponent === 0) {
        return 1;
    }
    if (exponent === 1) {
        return base;
    }

    for (let i = 2; i <= exponent; i++) {
        result =  result * base;
    }
    return result;
}

function power(base, exponent) {
    if (exponent === 0) return 1;
    if (exponent === 1) return base;
    return base * power(base, exponent - 1);
}

module.exports = {
    iterative: iterative_Power,
    recursive: power
};
