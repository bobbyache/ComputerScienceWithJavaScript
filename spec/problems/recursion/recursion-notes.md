

### Sum range

```javascript
function sumRange(num) {
    // console.log(num);
    if (num === 1) return 1;
    return num + sumRange(num -1);
}

sumRange(4);
```
### Recursive count down

```javascript
function countDown(num) {
    if (num <= 0) {
        console.log("All done!");
        return;
    }
    console.log(num);
    num--;
    countDown(num);
}

countDown(5);
```
### Calculate factorial iteratively and recursively

```javascript
// 4 Factorial 4! = 4 * 3 * 1

function factorialIterative(num) {
    let total = 1;
    for (let i = num; i > 1; i--) {
        total *= i;
    }
    return total;
}
factorialIterative(3);

function factorialRecursive(num) {
    if (num === 1) return 1;
    return num * factorialRecursive(num - 1);
}

factorialRecursive(3);
```
