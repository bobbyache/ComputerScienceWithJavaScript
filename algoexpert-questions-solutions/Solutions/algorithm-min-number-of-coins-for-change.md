# Min Number Of Coins For Change
<div class="html">
<p>
  Given an array of positive integers representing coin denominations and a
  single non-negative integer <span>n</span> representing a target amount of
  money, write a function that returns the smallest number of coins needed to
  make change for (to sum up to) that target amount using the given coin
  denominations.
</p>
<p>
  Note that you have access to an unlimited amount of coins. In other words, if
  the denominations are <span>[1, 5, 10]</span>, you have access to an unlimited
  amount of <span>1</span>s, <span>5</span>s, and <span>10</span>s.
</p>
<p>
  If it's impossible to make change for the target amount, return
  <span>-1</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">n</span> = 7
<span class="CodeEditor-promptParameter">denoms</span> = [1, 5, 10]
</pre>
<h3>Sample Output</h3>
<pre>
3 <span class="CodeEditor-promptComment">// 2x1 + 1x5</span>
</pre>
</div>

Hint 1
<p>
Try building an array of the minimum number of coins needed to make change for all amounts between 0 and n inclusive. Note that no coins are needed to make change for 0: in order to make change for 0, you do not need to use any coins.
</p>


Hint 2

<p>
Build up the array mentioned in Hint #1 one coin denomination at a time. In other words, find the minimum number of coins needed to make change for all amounts between 0 and n with only one denomination, then with two, etc., until you use all denominations.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

class ProgramTest : public TestSuite {
public:
  void Run() {

    RunTest("Test Case 1", []() {
      vector<int> input{1, 5, 10};
      assert(minNumberOfCoinsForChange(7, input) == 3);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <climits>
using namespace std;

// O(nd) time | O(n) space
int minNumberOfCoinsForChange(int n, vector<int> denoms) {
  vector<int> numOfCoins(n + 1, INT_MAX);
  numOfCoins[0] = 0;
  int toCompare = 0;
  for (int denom : denoms) {
    for (int amount = 0; amount < numOfCoins.size(); amount++) {
      if (denom <= amount) {
        if (numOfCoins[amount - denom] == INT_MAX) {
          toCompare = numOfCoins[amount - denom];
        } else {
          toCompare = numOfCoins[amount - denom] + 1;
        }
        numOfCoins[amount] = min(numOfCoins[amount], toCompare);
      }
    }
  }
  return numOfCoins[n] != INT_MAX ? numOfCoins[n] : -1;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {

    RunTest("Test Case 1", []() {
      vector<int> input{1, 5, 10};
      assert(minNumberOfCoinsForChange(7, input) == 3);
    });
  }
};

```
### Sandbox Code (csharp)
```csharp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] input = {1, 5, 10};
		Utils.AssertTrue(Program.MinNumberOfCoinsForChange(7, input) == 3);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// O(nd) time | O(n) space
	public static int MinNumberOfCoinsForChange(int n, int[] denoms) {
		int[] numOfCoins = new int[n + 1];
		Array.Fill(numOfCoins, Int32.MaxValue);
		numOfCoins[0] = 0;
		int toCompare = 0;
		foreach (int denom in denoms) {
			for (int amount = 0; amount < numOfCoins.Length; amount++) {
				if (denom <= amount) {
					if (numOfCoins[amount - denom] == Int32.MaxValue) {
						toCompare = numOfCoins[amount - denom];
					} else {
						toCompare = numOfCoins[amount - denom] + 1;
					}
					numOfCoins[amount] =
					  Math.Min(numOfCoins[amount], toCompare);
				}
			}
		}
		return numOfCoins[n] != Int32.MaxValue ? numOfCoins[n] : -1;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] input = {1, 5, 10};
		Utils.AssertTrue(Program.MinNumberOfCoinsForChange(7, input) == 3);
	}
}

```
### Sandbox Code (go)
```go
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

package main

import "github.com/stretchr/testify/require"

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []int{1, 5, 10}
	actual := MinNumberOfCoinsForChange(7, input)
	require.Equal(t, 3, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "math"

func MinNumberOfCoinsForChange(n int, denoms []int) int {
	numOfCoins := make([]int, n+1)
	for i := range numOfCoins {
		numOfCoins[i] = math.MaxInt32
	}
	numOfCoins[0] = 0
	for _, denom := range denoms {
		for amount := range numOfCoins {
			if denom <= amount {
				numOfCoins[amount] = min(numOfCoins[amount], numOfCoins[amount-denom]+1)
			}
		}
	}
	if numOfCoins[n] != math.MaxInt32 {
		return numOfCoins[n]
	}
	return -1
}

func min(arg1 int, rest ...int) int {
	curr := arg1
	for _, num := range rest {
		if num < curr {
			curr = num
		}
	}
	return curr
}

```
### Unit Tests 1 (go)
```go
package main

import "github.com/stretchr/testify/require"

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []int{1, 5, 10}
	actual := MinNumberOfCoinsForChange(7, input)
	require.Equal(t, 3, actual)
}

```
### Sandbox Code (java)
```java
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

class ProgramTest {

  @Test
  public void TestCase1() {
    int[] input = {1, 5, 10};
    Utils.assertTrue(Program.minNumberOfCoinsForChange(7, input) == 3);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.Arrays;

class Program {
  // O(nd) time | O(n) space
  public static int minNumberOfCoinsForChange(int n, int[] denoms) {
    int[] numOfCoins = new int[n + 1];
    Arrays.fill(numOfCoins, Integer.MAX_VALUE);
    numOfCoins[0] = 0;
    int toCompare = 0;
    for (int denom : denoms) {
      for (int amount = 0; amount < numOfCoins.length; amount++) {
        if (denom <= amount) {
          if (numOfCoins[amount - denom] == Integer.MAX_VALUE) {
            toCompare = numOfCoins[amount - denom];
          } else {
            toCompare = numOfCoins[amount - denom] + 1;
          }
          numOfCoins[amount] = Math.min(numOfCoins[amount], toCompare);
        }
      }
    }
    return numOfCoins[n] != Integer.MAX_VALUE ? numOfCoins[n] : -1;
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {

  @Test
  public void TestCase1() {
    int[] input = {1, 5, 10};
    Utils.assertTrue(Program.minNumberOfCoinsForChange(7, input) == 3);
  }
}

```
### Sandbox Code (javascript)
```javascript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.minNumberOfCoinsForChange(7, [1, 5, 10])).to.deep.equal(3);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nd) time | O(n) space
function minNumberOfCoinsForChange(n, denoms) {
  const numOfCoins = new Array(n + 1).fill(Infinity);
  numOfCoins[0] = 0;
  for (const denom of denoms) {
    for (let amount = 0; amount < numOfCoins.length; amount++) {
      if (denom <= amount) {
        numOfCoins[amount] = Math.min(numOfCoins[amount], numOfCoins[amount - denom] + 1);
      }
    }
  }
  return numOfCoins[n] !== Infinity ? numOfCoins[n] : -1;
}

exports.minNumberOfCoinsForChange = minNumberOfCoinsForChange;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.minNumberOfCoinsForChange(7, [1, 5, 10])).to.deep.equal(3);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.minNumberOfCoinsForChange

class ProgramTest {
    @Test
    fun TestCase1() {
        val denoms = listOf(1, 5, 10)
        val output = minNumberOfCoinsForChange(7, denoms)
        val expected = 3
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.min

// O(nd) time | O(n) space
fun minNumberOfCoinsForChange(n: Int, denoms: List<Int>): Int {
    val numOfCoins = MutableList(n + 1) { Int.MAX_VALUE }
    numOfCoins[0] = 0
    var toCompare: Int
    for (denom in denoms) {
        for (amount in 0 until numOfCoins.size) {
            if (denom <= amount) {
                if (numOfCoins[amount - denom] == Int.MAX_VALUE) {
                    toCompare = numOfCoins[amount - denom]
                } else {
                    toCompare = numOfCoins[amount - denom] + 1
                }
                numOfCoins[amount] = min(numOfCoins[amount], toCompare)
            }
        }
    }
    return if (numOfCoins[n] != Int.MAX_VALUE) numOfCoins[n] else -1
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.minNumberOfCoinsForChange

class ProgramTest {
    @Test
    fun TestCase1() {
        val denoms = listOf(1, 5, 10)
        val output = minNumberOfCoinsForChange(7, denoms)
        val expected = 3
        assert(expected == output)
    }
}

```
### Sandbox Code (swift)
```swift
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      try assertEqual(3, program.minimumNumberOfCoinsForChange(target: 7, denominations: [1, 5, 10]))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nd) time | O(n) space
  func minimumNumberOfCoinsForChange(target: Int, denominations: [Int]) -> Int {
    var numberOfCoins = Array(repeating: Int(Int16.max), count: target + 1)
    numberOfCoins[0] = 0

    for denomination in denominations {
      for amount in 0 ..< numberOfCoins.count {
        if denomination <= amount {
          numberOfCoins[amount] = min(numberOfCoins[amount], 1 + numberOfCoins[amount - denomination])
        }
      }
    }

    return numberOfCoins[target] != Int(Int16.max) ? numberOfCoins[target] : -1
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      try assertEqual(3, program.minimumNumberOfCoinsForChange(target: 7, denominations: [1, 5, 10]))
    }
  }
}

```
### Sandbox Code (python)
```python
# This file is initialized with a code version of this
# question's sample test case. Feel free to add, edit,
# or remove test cases in this file as you see fit!

import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.minNumberOfCoinsForChange(7, [1, 5, 10]), 3)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nd) time | O(n) space
def minNumberOfCoinsForChange(n, denoms):
    numOfCoins = [float("inf") for amount in range(n + 1)]
    numOfCoins[0] = 0
    for denom in denoms:
        for amount in range(len(numOfCoins)):
            if denom <= amount:
                numOfCoins[amount] = min(numOfCoins[amount], numOfCoins[amount - denom] + 1)
    return numOfCoins[n] if numOfCoins[n] != float("inf") else -1

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.minNumberOfCoinsForChange(7, [1, 5, 10]), 3)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.minNumberOfCoinsForChange(7, [1, 5, 10])).to.deep.equal(3);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nd) time | O(n) space
export function minNumberOfCoinsForChange(n: number, denoms: number[]) {
  const numOfCoins: number[] = new Array(n + 1).fill(Infinity);
  numOfCoins[0] = 0;
  for (const denom of denoms) {
    for (let amount = 0; amount < numOfCoins.length; amount++) {
      if (denom <= amount) {
        numOfCoins[amount] = Math.min(numOfCoins[amount], numOfCoins[amount - denom] + 1);
      }
    }
  }
  return numOfCoins[n] !== Infinity ? numOfCoins[n] : -1;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.minNumberOfCoinsForChange(7, [1, 5, 10])).to.deep.equal(3);
});

```

