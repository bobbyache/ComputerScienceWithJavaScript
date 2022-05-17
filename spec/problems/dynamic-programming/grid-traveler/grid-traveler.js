
// grid-traveler.js

/* *************************************************************************************************
Problem:            The Grid Traveler
Main Formula:       
Approach:           
************************************************************************************************* */

const gridTraveler_1 = (m, n) => {
    if (m === 0 || n === 0) return 0;
    if (m === 1 && n === 1) return 1;
    
    return gridTraveler_1(m-1, n) + gridTraveler_1(m, n-1);
};

const gridTraveler_memoized = (m, n, memo = {}) => {
    const key = m + ',' + n;

    if (key in memo) return memo[key];
    if (m === 0 || n === 0) return 0;
    if (m === 1 && n === 1) return 1;
    
    memo[key] = gridTraveler_memoized(m-1, n, memo) + gridTraveler_memoized(m, n-1, memo);
    return memo[key];
};

module.exports = {
    naive: gridTraveler_1,
    memoized: gridTraveler_memoized,
};

