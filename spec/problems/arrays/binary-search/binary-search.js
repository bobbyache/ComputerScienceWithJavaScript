

// return the index of the found val with a binary search
const binarySearch = (array, val) => {
    let min = 0;
    let max = array.length - 1;

    while (min <= max) {
        let middle = Math.floor((min + max) / 2);
        let currentValue = array[middle];

        if (currentValue < val) {
            min = middle + 1;
        } else if (currentValue > val) {
            max = middle - 1;
        } else {
            return middle;
        }
    }

    return -1;
};


module.exports = {
    binarySearch: binarySearch
};
