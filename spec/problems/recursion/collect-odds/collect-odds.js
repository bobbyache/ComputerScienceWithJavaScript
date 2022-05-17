
// collect-odds.js

/* *************************************************************************************************
Problem:            Collect Odds (Helper methods vs. Pure Recursion)
Main Formula:       
Approach:           
************************************************************************************************* */

const collectOdds1 = (arr) => {
    let result = [];

    function helper(helperInput) {
        if (helperInput.length === 0) {
            return;
        }

        if (helperInput[0] % 2 !== 0) {
            result.push(helperInput[0]);
        }

        helper(helperInput.slice(1));
    }

    helper(arr);

    return result;
};

const collectOdds2 = (arr) => {
    let newArr = [];

    if (arr.length === 0) {
        return newArr;
    }

    if (arr[0] % 2 !== 0) {
        newArr.push(arr[0]);
    }

    newArr = newArr.concat(collectOdds2(arr.slice(1)));

    return newArr;
};

module.exports = {
    collectOdds1: collectOdds1,
    collectOdds2: collectOdds2,
};
