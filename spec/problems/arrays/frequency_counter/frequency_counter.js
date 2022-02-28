
const frequencyCounterPattern_1 = (array1, array2) => {
    // This was your first naive attempt. Note it is different to his....
    let counter = 0;
    
    if (array1.length !== array2.length) {
        return false;
    }
    
    for (let i = 0; i < array1.length; i++) {
        let number_to_find = array1[i] ** 2;
        
        for (let j = 0; j < array2.length; j++) {
            if (array2[j] === number_to_find) {
                counter += 1;
            }
        }
    }
    
    if (counter % array1.length === 0) {
        return true;
    }
    
    return false;
};

// The Frequency Counter Pattern
// Source: https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/lecture/9816152#overview

/*
The idea is to use an object to construct a profile of an array or string.
Allowss one to quickly compare that breakdown to how another object looks that was constructed from an array or string.
*/
// These arrays have to be the same length  so this will be (O(3N) which resolves to O(N))
// Much better than O(N^2) for the above example.

const frequencyCounterPattern_2 = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false;
    }

    let frequencyCounter1 = {};
    let frequencyCounter2 = {};

    // Store the value and the times it occurs
    for (let val of arr1) {
        frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
    }

    // Store the value and the times it occurs
    for (let val of arr2) {
        frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
    }

    // console.log(frequencyCounter1);
    // console.log(frequencyCounter2);

    // for each item in the first counter:
    //      if it's value does not exist in the second, return false
    //      if its count differs, return false
    // otherwise... return true
    for (let key in frequencyCounter1) {
        if (!(key ** 2 in frequencyCounter2)) {
            return false;
        }
        if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
            return false;
        }
    }
    return true;
};

/*
    Given two strings, write a function to determine if the second string is an anagram of the
    first. An anagram is a word, phrase, or name formed by rearranging the letters of another,
    such as cinema, formed from iceman.
*/

// Here is your solution...
const validAnagram_Yours = (text1, text2) => {
    const frequencyCounter1 = {};
    const frequencyCounter2 = {};

    if (text1.length !== text2.length) {
        return false;
    }

    for (let char of text1) {
        frequencyCounter1[char] = (frequencyCounter1[char] || 0) + 1;
    }

    for (let char of text2) {
        frequencyCounter2[char] = (frequencyCounter2[char] || 0) + 1;
    }

    for (let key in frequencyCounter1) {
        if (frequencyCounter2[key] < 0) {
            return false;
        }
        if (frequencyCounter2[key] !== frequencyCounter1[key]) {
            return false;
        }
    }

    return true;
};

const validAnagram_Theirs = (first, second) => {
    if (first.length !== second.length) {
        return false;
    }

    const lookup = {};

    for (let i = 0; i < first.length; i++) {
        let letter = first[i];
        // if letter exists, increment, otherwise set to 1
        lookup[letter] ? lookup[letter] += 1 : lookup[letter] = 1;
    }

    for (let i = 0; i < second.length; i++) {
        let letter = second[i];
        // can't find letter or letter is zero then it's not an anagram.
        // At 3:40 there is an explanation as to why this works...
        if (!lookup[letter]) {
            return false;
        } else {
            lookup[letter] -= 1;
        }
    }
    return true;
};


module.exports = {
    unOptimized: frequencyCounterPattern_1,
    optimized: frequencyCounterPattern_2,
    validAnagram1: validAnagram_Yours,
    validAnagram2: validAnagram_Theirs
};
