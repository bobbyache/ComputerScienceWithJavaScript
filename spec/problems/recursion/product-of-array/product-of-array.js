/*******************************************************************************
Problem
--------------------------------------------------------------------------------
Write a recursive function called productOfArray which takes an array of numbers
and returns the product of them.

References
--------------------------------------------------------------------------------
- https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/quiz/425990#overview

Analysis
--------------------------------------------------------------------------------
Use a helper function for the base case and recursion to allow for the retention
of externally calculated data.
*******************************************************************************/

function iterative_productOfArray(nums) {
    let result = 1;
    for (let num of nums) {
        result *= num;
    }
    return result;
}

function recursive_productOfArray(nums) {
    let product = 1;

    function helper(numsInput) {
        if (numsInput.length === 0) {
            return;
        }
        product = product *= numsInput[0];
        helper(numsInput.slice(1))
    };
        
    helper(nums);

    return product;
}

module.exports = {
    iterative: iterative_productOfArray,
    recursive: recursive_productOfArray
};
