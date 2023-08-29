# Max Profit With K Transactions
<div class="html">
<p>
  You're given an array of positive integers representing the prices of a single stock on
  various days (each index in the array represents a different day). You're also
  given an integer <span>k</span>, which represents the number of transactions
  you're allowed to make. One transaction consists of buying the stock on a
  given day and selling it on another, later day.
</p>
<p>
  Write a function that returns the maximum profit that you can make by buying
  and selling the stock, given k transactions.
</p>
<p>
  Note that you can only hold one share of the stock at a time; in other words,
  you can't buy more than one share of the stock on any given day, and you can't
  buy a share of the stock if you're still holding another share. Also, you
  don't need to use all k transactions that you're allowed.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">prices</span> = [5, 11, 3, 50, 60, 90]
<span class="CodeEditor-promptParameter">k</span> = 2
</pre>
<h3>Sample Output</h3>
<pre>
93 <span class="CodeEditor-promptComment">// Buy: 5, Sell: 11; Buy: 3, Sell: 90</span>
</pre>
</div>

Hint 1
<p>
Try building a two-dimensional array of the maximum profits you can make on each day with zero, one, two, etc., k transactions. Let columns represent days and rows represent the number of transactions.
</p>


Hint 2

<p>
Build up the array mentioned in Hint #1 one row at a time. In other words, find the maximum profits that you can make on each day with zero transactions first, then with one transaction, etc., until you reach k transactions. Find a formula that relates the maximum profit at any given point to previous profits. Once you find that formula, identify certain values that you repeatedly need and that you can temporarily store to optimize your algorithm.
</p>


Hint 3

<p>
Do you really need to store the entire two-dimensional array mentioned in Hint #1? Identify what stored values you actually use throughout the process of building the array and come up with a way of storing only what you need and nothing more.
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
      vector<int> input{5, 11, 3, 50, 60, 90};
      assert(maxProfitWithKTransactions(input, 2) == 93);
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

// O(nk) time | O(nk) space
int maxProfitWithKTransactions(vector<int> prices, int k) {
  if (prices.size() == 0) {
    return 0;
  }
  vector<vector<int>> profits(k + 1, vector<int>(prices.size(), 0));
  for (int t = 1; t < k + 1; t++) {
    int maxThusFar = INT_MIN;
    for (int d = 1; d < prices.size(); d++) {
      maxThusFar = max(maxThusFar, profits[t - 1][d - 1] - prices[d - 1]);
      profits[t][d] = max(profits[t][d - 1], maxThusFar + prices[d]);
    }
  }
  return profits[k][prices.size() - 1];
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <climits>
using namespace std;

// O(nk) time | O(n) space
int maxProfitWithKTransactions(vector<int> prices, int k) {
  if (prices.size() == 0) {
    return 0;
  }
  vector<int> evenProfits(prices.size());
  vector<int> oddProfits(prices.size());
  for (int t = 1; t < k + 1; t++) {
    int maxThusFar = INT_MIN;
    vector<int> *currentProfits;
    vector<int> *previousProfits;
    if (t % 2 == 1) {
      currentProfits = &oddProfits;
      previousProfits = &evenProfits;
    } else {
      currentProfits = &evenProfits;
      previousProfits = &oddProfits;
    }
    for (int d = 1; d < prices.size(); d++) {
      maxThusFar = max(maxThusFar, previousProfits->at(d - 1) - prices[d - 1]);
      currentProfits->at(d) =
          max(currentProfits->at(d - 1), maxThusFar + prices[d]);
    }
  }
  return k % 2 == 0 ? evenProfits[prices.size() - 1]
                    : oddProfits[prices.size() - 1];
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> input{5, 11, 3, 50, 60, 90};
      assert(maxProfitWithKTransactions(input, 2) == 93);
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
		int[] input = {5, 11, 3, 50, 60, 90};
		Utils.AssertEquals(93, Program.MaxProfitWithKTransactions(input, 2) );
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// O(nk) time | O(nk) space
	public static int MaxProfitWithKTransactions(int[] prices, int k) {
		if (prices.Length == 0) {
			return 0;
		}
		int[,] profits = new int[k + 1,prices.Length];
		for (int t = 1; t < k + 1; t++) {
			int maxThusFar = Int32.MinValue;
			for (int d = 1; d <prices.Length; d++) {
				maxThusFar =
				  Math.Max(maxThusFar, profits[t - 1,d - 1] - prices[d - 1]);
				profits[t,d] = Math.Max(profits[t,d - 1], maxThusFar + prices[d]);
			}
		}
		return profits[k,prices.Length - 1];
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// O(nk) time | O(n) space
	public static int MaxProfitWithKTransactions(int[] prices, int k) {
		if (prices.Length == 0) {
			return 0;
		}
		int[] evenProfits = new int[prices.Length];
		int[] oddProfits = new int[prices.Length];
		for (int i = 0; i < prices.Length; i++) {
			evenProfits[i] = 0;
			oddProfits[i] = 0;
		}
		for (int t = 1; t < k + 1; t++) {
			int maxThusFar = Int32.MinValue;
			int[] currentProfits = new int[prices.Length];
			int[] previousProfits = new int[prices.Length];
			if (t % 2 == 1) {
				currentProfits = oddProfits;
				previousProfits = evenProfits;
			} else {
				currentProfits = evenProfits;
				previousProfits = oddProfits;
			}
			for (int d = 1; d < prices.Length; d++) {
				maxThusFar =
				  Math.Max(maxThusFar,
				    previousProfits[d - 1] - prices[d - 1]);
				currentProfits[d] = Math.Max(currentProfits[d - 1],
				    maxThusFar + prices[d]);
			}
		}
		return k % 2 == 0 ? evenProfits[prices.Length - 1] : oddProfits[prices.Length - 1];
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] input = {5, 11, 3, 50, 60, 90};
		Utils.AssertEquals(93, Program.MaxProfitWithKTransactions(input, 2) );
	}
}

```
### Sandbox Code (go)
```go
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	require.Equal(t, 93, MaxProfitWithKTransactions([]int{5, 11, 3, 50, 60, 90}, 2))
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "math"

// O(nk) time | O(nk) space
func MaxProfitWithKTransactions(prices []int, k int) int {
	if len(prices) == 0 {
		return 0
	}
	profits := make([][]int, k+1)
	for i := range profits {
		profits[i] = make([]int, len(prices))
	}
	for t := 1; t < k+1; t++ {
		maxThusFar := math.MinInt32
		for d := 1; d < len(prices); d++ {
			maxThusFar = max(maxThusFar, profits[t-1][d-1]-prices[d-1])
			profits[t][d] = max(profits[t][d-1], maxThusFar+prices[d])
		}
	}
	return profits[k][len(prices)-1]
}

func max(arg int, rest ...int) int {
	curr := arg
	for _, num := range rest {
		if curr < num {
			curr = num
		}
	}
	return curr
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "math"

// # O(nk) time | O(n) space
func MaxProfitWithKTransactions(prices []int, k int) int {
	if len(prices) == 0 {
		return 0
	}
	evenProfits := make([]int, len(prices))
	oddProfits := make([]int, len(prices))
	var currentProfits, previousProfits []int
	for t := 1; t < k+1; t++ {
		maxThusFar := math.MinInt32
		if t%2 == 1 {
			currentProfits, previousProfits = oddProfits, evenProfits
		} else {
			currentProfits, previousProfits = evenProfits, oddProfits
		}
		for d := 1; d < len(prices); d++ {
			maxThusFar = max(maxThusFar, previousProfits[d-1]-prices[d-1])
			currentProfits[d] = max(currentProfits[d-1], maxThusFar+prices[d])
		}
	}
	if k%2 == 0 {
		return evenProfits[len(prices)-1]
	}
	return oddProfits[len(prices)-1]
}

func max(arg int, rest ...int) int {
	curr := arg
	for _, num := range rest {
		if curr < num {
			curr = num
		}
	}
	return curr
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	require.Equal(t, 93, MaxProfitWithKTransactions([]int{5, 11, 3, 50, 60, 90}, 2))
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
    int[] input = {5, 11, 3, 50, 60, 90};
    Utils.assertTrue(Program.maxProfitWithKTransactions(input, 2) == 93);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nk) time | O(nk) space
  public static int maxProfitWithKTransactions(int[] prices, int k) {
    if (prices.length == 0) {
      return 0;
    }
    int[][] profits = new int[k + 1][prices.length];
    for (int t = 1; t < k + 1; t++) {
      int maxThusFar = Integer.MIN_VALUE;
      for (int d = 1; d < prices.length; d++) {
        maxThusFar = Math.max(maxThusFar, profits[t - 1][d - 1] - prices[d - 1]);
        profits[t][d] = Math.max(profits[t][d - 1], maxThusFar + prices[d]);
      }
    }
    return profits[k][prices.length - 1];
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nk) time | O(n) space
  public static int maxProfitWithKTransactions(int[] prices, int k) {
    if (prices.length == 0) {
      return 0;
    }
    int[] evenProfits = new int[prices.length];
    int[] oddProfits = new int[prices.length];

    int[] currentProfits;
    int[] previousProfits;
    for (int t = 1; t < k + 1; t++) {
      int maxThusFar = Integer.MIN_VALUE;
      if (t % 2 == 1) {
        currentProfits = oddProfits;
        previousProfits = evenProfits;
      } else {
        currentProfits = evenProfits;
        previousProfits = oddProfits;
      }
      for (int d = 1; d < prices.length; d++) {
        maxThusFar = Math.max(maxThusFar, previousProfits[d - 1] - prices[d - 1]);
        currentProfits[d] = Math.max(currentProfits[d - 1], maxThusFar + prices[d]);
      }
    }
    return k % 2 == 0 ? evenProfits[prices.length - 1] : oddProfits[prices.length - 1];
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    int[] input = {5, 11, 3, 50, 60, 90};
    Utils.assertTrue(Program.maxProfitWithKTransactions(input, 2) == 93);
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
  chai.expect(program.maxProfitWithKTransactions([5, 11, 3, 50, 60, 90], 2)).to.deep.equal(93);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nk) time | O(nk) space
function maxProfitWithKTransactions(prices, k) {
  if (!prices.length) return 0;
  const profits = [];
  for (let t = 0; t < k + 1; t++) {
    const row = new Array(prices.length).fill(0);
    profits.push(row);
  }
  for (let t = 1; t < k + 1; t++) {
    let maxThusFar = -Infinity;
    for (let d = 1; d < prices.length; d++) {
      maxThusFar = Math.max(maxThusFar, profits[t - 1][d - 1] - prices[d - 1]);
      profits[t][d] = Math.max(profits[t][d - 1], maxThusFar + prices[d]);
    }
  }
  return profits[k][prices.length - 1];
}

exports.maxProfitWithKTransactions = maxProfitWithKTransactions;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nk) time | O(n) space
function maxProfitWithKTransactions(prices, k) {
  if (!prices.length) return 0;
  const evenProfits = new Array(prices.length).fill(0);
  const oddProfits = new Array(prices.length).fill(0);
  for (let t = 1; t < k + 1; t++) {
    let maxThusFar = -Infinity;
    let currentProfits, previousProfits;
    if (t % 2 === 1) {
      currentProfits = oddProfits;
      previousProfits = evenProfits;
    } else {
      currentProfits = evenProfits;
      previousProfits = oddProfits;
    }
    for (let d = 1; d < prices.length; d++) {
      maxThusFar = Math.max(maxThusFar, previousProfits[d - 1] - prices[d - 1]);
      currentProfits[d] = Math.max(currentProfits[d - 1], maxThusFar + prices[d]);
    }
  }
  return k % 2 === 0 ? evenProfits[prices.length - 1] : oddProfits[prices.length - 1];
}

exports.maxProfitWithKTransactions = maxProfitWithKTransactions;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.maxProfitWithKTransactions([5, 11, 3, 50, 60, 90], 2)).to.deep.equal(93);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.maxProfitWithKTransactions

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(5, 11, 3, 50, 60, 90)
        val output = maxProfitWithKTransactions(input, 2)
        val expected = 93
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(nk) time | O(nk) space
fun maxProfitWithKTransactions(prices: List<Int>, k: Int): Int {
    if (prices.size == 0) return 0

    val profits = List(k + 1) { MutableList(prices.size) { 0 } }
    for (t in 1 until k + 1) {
        var maxThusFar = Int.MIN_VALUE
        for (d in 1 until prices.size) {
            maxThusFar = max(maxThusFar, profits[t - 1][d - 1] - prices[d - 1])
            profits[t][d] = max(profits[t][d - 1], maxThusFar + prices[d])
        }
    }
    return profits[k][prices.size - 1]
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(nk) time | O(n) space
fun maxProfitWithKTransactions(prices: List<Int>, k: Int): Int {
    if (prices.size == 0) return 0
    var evenProfits = MutableList(prices.size) { 0 }
    var oddProfits = MutableList(prices.size) { 0 }
    for (t in 1 until k + 1) {
        var maxThusFar = Int.MIN_VALUE
        var currentProfits: MutableList<Int>
        var previousProfits: MutableList<Int>
        if (t % 2 == 1) {
            currentProfits = oddProfits
            previousProfits = evenProfits
        } else {
            currentProfits = evenProfits
            previousProfits = oddProfits
        }
        for (d in 1 until prices.size) {
            maxThusFar = max(maxThusFar, previousProfits[d - 1] - prices[d - 1])
            currentProfits[d] = max(currentProfits[d - 1], maxThusFar + prices[d])
        }
    }
    return if (k % 2 == 0) evenProfits[prices.size - 1] else oddProfits[prices.size - 1]
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.maxProfitWithKTransactions

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(5, 11, 3, 50, 60, 90)
        val output = maxProfitWithKTransactions(input, 2)
        val expected = 93
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
      try assertEqual(93, program.maxProfitWithKTransactions([5, 11, 3, 50, 60, 90], 2))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nk) time | O(nk) space
  func maxProfitWithKTransactions(_ prices: [Int], _ k: Int) -> Int {
    if prices.count == 0 {
      return 0
    }

    var profits = [[Int]]()

    for _ in stride(from: 0, through: k, by: 1) {
      let row = Array(repeating: 0, count: prices.count)
      profits.append(row)
    }

    for transaction in stride(from: 1, through: k, by: 1) {
      var maxProfitThusFar = Int.min

      for day in stride(from: 1, to: prices.count, by: 1) {
        maxProfitThusFar = max(maxProfitThusFar, profits[transaction - 1][day - 1] - prices[day - 1])
        profits[transaction][day] = max(profits[transaction][day - 1], maxProfitThusFar + prices[day])
      }
    }

    return profits[k][prices.count - 1]
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nk) time | O(n) space
  func maxProfitWithKTransactions(_ prices: [Int], _ k: Int) -> Int {
    if prices.count == 0 {
      return 0
    }

    var evenProfits = Array(repeating: 0, count: prices.count)
    var oddProfits = Array(repeating: 0, count: prices.count)

    for transaction in stride(from: 1, through: k, by: 1) {
      var maxProfitThusFar = Int.min

      if transaction % 2 == 0 {
        secondSolutionHelper(&evenProfits, &oddProfits, &maxProfitThusFar, prices)
      } else {
        secondSolutionHelper(&oddProfits, &evenProfits, &maxProfitThusFar, prices)
      }
    }

    if k % 2 == 0 {
      return evenProfits[prices.count - 1]
    } else {
      return oddProfits[prices.count - 1]
    }
  }

  func secondSolutionHelper(_ currentProfits: inout [Int], _ previousProfits: inout [Int], _ maxProfitThusFar: inout Int, _ prices: [Int]) {
    for day in stride(from: 1, to: prices.count, by: 1) {
      maxProfitThusFar = max(maxProfitThusFar, previousProfits[day - 1] - prices[day - 1])
      currentProfits[day] = max(currentProfits[day - 1], maxProfitThusFar + prices[day])
    }
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      try assertEqual(93, program.maxProfitWithKTransactions([5, 11, 3, 50, 60, 90], 2))
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
        self.assertEqual(program.maxProfitWithKTransactions([5, 11, 3, 50, 60, 90], 2), 93)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nk) time | O(nk) space
def maxProfitWithKTransactions(prices, k):
    if not len(prices):
        return 0
    profits = [[0 for d in prices] for t in range(k + 1)]
    for t in range(1, k + 1):
        maxThusFar = float("-inf")
        for d in range(1, len(prices)):
            maxThusFar = max(maxThusFar, profits[t - 1][d - 1] - prices[d - 1])
            profits[t][d] = max(profits[t][d - 1], maxThusFar + prices[d])
    return profits[-1][-1]

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nk) time | O(n) space
def maxProfitWithKTransactions(prices, k):
    if not len(prices):
        return 0
    evenProfits = [0 for d in prices]
    oddProfits = [0 for d in prices]
    for t in range(1, k + 1):
        maxThusFar = float("-inf")
        if t % 2 == 1:
            currentProfits = oddProfits
            previousProfits = evenProfits
        else:
            currentProfits = evenProfits
            previousProfits = oddProfits
        for d in range(1, len(prices)):
            maxThusFar = max(maxThusFar, previousProfits[d - 1] - prices[d - 1])
            currentProfits[d] = max(currentProfits[d - 1], maxThusFar + prices[d])
    return evenProfits[-1] if k % 2 == 0 else oddProfits[-1]

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.maxProfitWithKTransactions([5, 11, 3, 50, 60, 90], 2), 93)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.maxProfitWithKTransactions([5, 11, 3, 50, 60, 90], 2)).to.deep.equal(93);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nk) time | O(nk) space
export function maxProfitWithKTransactions(prices: number[], k: number) {
  if (!prices.length) return 0;
  const profits: number[][] = [];
  for (let t = 0; t < k + 1; t++) {
    const row: number[] = new Array(prices.length).fill(0);
    profits.push(row);
  }
  for (let t = 1; t < k + 1; t++) {
    let maxThusFar = -Infinity;
    for (let d = 1; d < prices.length; d++) {
      maxThusFar = Math.max(maxThusFar, profits[t - 1][d - 1] - prices[d - 1]);
      profits[t][d] = Math.max(profits[t][d - 1], maxThusFar + prices[d]);
    }
  }
  return profits[k][prices.length - 1];
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nk) time | O(n) space
export function maxProfitWithKTransactions(prices: number[], k: number) {
  if (!prices.length) return 0;
  const evenProfits: number[] = new Array(prices.length).fill(0);
  const oddProfits: number[] = new Array(prices.length).fill(0);
  for (let t = 1; t < k + 1; t++) {
    let maxThusFar = -Infinity;
    let currentProfits, previousProfits;
    if (t % 2 === 1) {
      currentProfits = oddProfits;
      previousProfits = evenProfits;
    } else {
      currentProfits = evenProfits;
      previousProfits = oddProfits;
    }
    for (let d = 1; d < prices.length; d++) {
      maxThusFar = Math.max(maxThusFar, previousProfits[d - 1] - prices[d - 1]);
      currentProfits[d] = Math.max(currentProfits[d - 1], maxThusFar + prices[d]);
    }
  }
  return k % 2 === 0 ? evenProfits[prices.length - 1] : oddProfits[prices.length - 1];
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.maxProfitWithKTransactions([5, 11, 3, 50, 60, 90], 2)).to.deep.equal(93);
});

```

