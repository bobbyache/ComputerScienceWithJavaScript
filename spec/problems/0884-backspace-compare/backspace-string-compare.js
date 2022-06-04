
// backspace-string-compare.js

/* *************************************************************************************************
Problem:            Backspace String Compare
Main Formula:       
Approach:           
************************************************************************************************* */

const backspaceCompare = (S, T) => {
    sPointer = S.length - 1;
    tPointer = T.length - 1;

    sSkips = 0;
    tSkips = 0;

    while (sPointer >= 0 || tPointer >= 0) {
        
        while (sPointer >= 0) {
            if (S.charAt(sPointer) === '#') {
                sSkips += 1;
                sPointer -= 1;
            } else if (sSkips > 0) {
                sSkips--;
                sPointer--;
            } else {
                break;
            }
        }

        while (tPointer >= 0) {
            if (T.charAt(tPointer) === '#') {
                tSkips += 1;
                tPointer -= 1;
            } else if (tSkips > 0) {
                tSkips--;
                tPointer--;
            } else {
                break;
            }
        }

        if (S.charAt(sPointer) !== T.charAt(tPointer)) {
            return false;
        }
        
        if ((sPointer >= 0) !== (tPointer >= 0)) {
            return false;
        }
    
        sPointer -= 1;
        tPointer -= 1;
    }

    return true;
};

module.exports = {
    backspaceCompare: backspaceCompare
};

/* *************************************************************************************************
Use debugger
    node inspect backspace-string-compare.js
************************************************************************************************* */
// backspaceCompare(S, T)

