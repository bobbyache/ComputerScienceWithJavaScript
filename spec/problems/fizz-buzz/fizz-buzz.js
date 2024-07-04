/* *************************************************************************************************
Problem:            Fizz Buzz
Main Formula:       
Approach:           
************************************************************************************************* */

const fizzBuzz = (nums) => {
    const arr = [];
    
    for (i = 0; i < nums; i++) {
        const num = i;
        const divBy3 = i % 3 === 0;
        const divBy5 = i % 5 === 0;

        if (divBy3 && divBy5) {
            arr.push("FizzBuzz");
        } else if (divBy3) {
            arr.push("Fizz");
        } else if (divBy5) {
            arr.push("Buzz");
        } else {
            arr.push(num);
        }
    }
    
    return arr;
};

module.exports = {
    fizzBuzz: fizzBuzz
};

/* *************************************************************************************************
Use debugger
    cd spec\problems\fizz-buzz

    node inspect fizz-buzz.js
************************************************************************************************* */
// backspaceCompare(S, T)

