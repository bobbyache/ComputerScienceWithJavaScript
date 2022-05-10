/*******************************************************************************
Problem
--------------------------------------------------------------------------------
Write a function factorial which accepts a number and returns the factorial
    of that number.

A factorial is the product of an integer and all the integers below it.

eg. factorial(4) is equal to 24, because 4 * 3 * 2 * 1 equals 24.Factorial(0!)
    is always 1.

References
--------------------------------------------------------------------------------
- https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/quiz/425978#overview

Analysis
--------------------------------------------------------------------------------
Simple recursive routine

*******************************************************************************/
function iterative_Factorial(num) {
    let total = 1;

    for (let i = num; i > 1; i--) {
        total *= i;
    }
    return total;
}

function factorial(num) {
    if (num <= 1) return 1;
    return num *= factorial(num - 1);
}

module.exports = {
    iterative: iterative_Factorial,
    recursive: factorial
};
