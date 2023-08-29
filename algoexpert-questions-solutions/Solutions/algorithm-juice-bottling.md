# Juice Bottling
<div class="html">
  <p>
    You're given an array of integers <span>prices</span> of length
    <span>n</span> with the retail prices of various quantities of juice. Each
    index in this array corresponds to the price of that amount of juice. For
    example, <span>prices[2]</span> would be the retail price of 2 units of
    juice.
  </p>

  <p>
    You have <span>n - 1</span> total units of juice. For example, if the length
    of <span>prices</span> is 5, then you would have 4 total units of juice.
    Write a function to determine the optimal way to bottle the juice such that
    it maximizes revenue. This function should return a list of all of the
    juice quantities required in ascending order.
  </p>

  <p>
    Note that the first value in the <span>prices</span> array will always be 0,
    because there is no value in no juice. All other values will be positive
    integers. Additionally, a larger quantity of juice will not always be more
    expensive than a smaller quantity. For simplicity, all of the test cases
    only have one possible solution.
  </p>

  <h3>Sample Input</h3>
  <pre><span class="CodeEditor-promptParameter">prices</span> = [0, 1, 3, 2]</pre>
  <h3>Sample Output</h3>
  <pre>[1, 2] <span class="CodeEditor-promptComment">// We have 3 total units of juice,
// because the length of prices is 4.
// To maximize revenue, we split the juice into
// quantities of 1 and 2, giving a revenue of 1 + 3 = 4
</span>
</pre>
</div>

Hint 1
<p>
  If there were only 2 units of juice, how would you decide if it needs to be
  broken up?
</p>


Hint 2

<p>
  If we add a third unit of juice, can you use the price of that entire unit and
  the solution for only 2 units to find the new solution?
</p>


Hint 3

<p>
  The maximum profit at n can be modeled as the greater value of
  <span>prices[n]</span> and <span>profit[size - m] + size[m]</span> for
  every value m.
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
      vector<int> input = {0, 2, 5, 6};
      vector<int> expected = {1, 2};
      auto actual = juiceBottling(input);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <algorithm>

using namespace std;

// O(n^3) time | O(n^2) space - where n is the length of prices
vector<int> juiceBottling(vector<int> prices) {
  int numSizes = prices.size();
  vector<int> maxProfit(numSizes);
  vector<vector<int>> solutions;
  for (int size = 0; size < numSizes; size++) {
    solutions.push_back({});
  }

  for (int size = 0; size < numSizes; size++) {
    for (int dividingPoint = 0; dividingPoint <= size; dividingPoint++) {
      int possibleProfit =
          maxProfit[size - dividingPoint] + prices[dividingPoint];

      if (possibleProfit > maxProfit[size]) {
        maxProfit[size] = possibleProfit;
        vector<int> newSolution;
        newSolution.push_back(dividingPoint);
        newSolution.insert(newSolution.end(),
                           solutions[size - dividingPoint].begin(),
                           solutions[size - dividingPoint].end());
        solutions[size] = newSolution;
      }
    }
  }
  return solutions[numSizes - 1];
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// O(n^2) time | O(n) space - where n is the length of prices
vector<int> juiceBottling(vector<int> prices) {
  int numSizes = prices.size();
  vector<int> maxProfit(numSizes);
  vector<int> dividingPoints(numSizes);

  for (int size = 0; size < numSizes; size++) {
    for (int dividingPoint = 0; dividingPoint <= size; dividingPoint++) {
      int possibleProfit =
          maxProfit[size - dividingPoint] + prices[dividingPoint];

      if (possibleProfit > maxProfit[size]) {
        maxProfit[size] = possibleProfit;
        dividingPoints[size] = dividingPoint;
      }
    }
  }

  vector<int> solution;
  int currentDividingPoint = numSizes - 1;
  while (currentDividingPoint > 0) {
    solution.push_back(dividingPoints[currentDividingPoint]);
    currentDividingPoint -= dividingPoints[currentDividingPoint];
  }

  return solution;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> input = {0, 2, 5, 6};
      vector<int> expected = {1, 2};
      auto actual = juiceBottling(input);
      assert(expected == actual);
    });
  }
};

```
### Sandbox Code (csharp)
```csharp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		var input = new int[] {0, 2, 5, 6};
		var expected = new int[] {1, 2};
		var actual = new Program().JuiceBottling(input);
		Utils.AssertTrue(expected.Length == actual.Count);
		for (int i = 0; i < actual.Count; i++) {
			Utils.AssertTrue(expected[i] == actual[i]);
		}
	}
}


```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {
	// O(n^3) time | O(n^2) space - where n is the length of prices
	public List<int> JuiceBottling(int[] prices) {
		int numSizes = prices.Length;
		int[] maxProfit = new int[numSizes];
		List<List<int> > solutions = new List<List<int> >();
		for (int size = 0; size < numSizes; size++) {
			solutions.Add(new List<int>());
		}

		for (int size = 0; size < numSizes; size++) {
			for (int dividingPoint = 0; dividingPoint <= size; dividingPoint++) {
				int possibleProfit = maxProfit[size - dividingPoint] +
				  prices[dividingPoint];

				if (possibleProfit > maxProfit[size]) {
					maxProfit[size] = possibleProfit;
					List<int> newSolution = new List<int>();
					newSolution.Add(dividingPoint);
					newSolution.AddRange(solutions[size - dividingPoint]);
					solutions[size] = newSolution;
				}
			}
		}
		return solutions[numSizes - 1];
	}
}


```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {
	// O(n^2) time | O(n) space - where n is the length of prices
	public List<int> JuiceBottling(int[] prices) {
		int numSizes = prices.Length;
		int[] maxProfit = new int[numSizes];
		int[] dividingPoints = new int[numSizes];

		for (int size = 0; size < numSizes; size++) {
			for (int dividingPoint = 0; dividingPoint <= size; dividingPoint++) {
				int possibleProfit = maxProfit[size - dividingPoint] +
				  prices[dividingPoint];

				if (possibleProfit > maxProfit[size]) {
					maxProfit[size] = possibleProfit;
					dividingPoints[size] = dividingPoint;
				}
			}
		}

		List<int> solution = new List<int>();
		int currentDividingPoint = numSizes - 1;
		while (currentDividingPoint > 0) {
			solution.Add(dividingPoints[currentDividingPoint]);
			currentDividingPoint -= dividingPoints[currentDividingPoint];
		}

		return solution;
	}
}


```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		var input = new int[] {0, 2, 5, 6};
		var expected = new int[] {1, 2};
		var actual = new Program().JuiceBottling(input);
		Utils.AssertTrue(expected.Length == actual.Count);
		for (int i = 0; i < actual.Count; i++) {
			Utils.AssertTrue(expected[i] == actual[i]);
		}
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
	input := []int{0, 2, 5, 6}
	expected := []int{1, 2}
	actual := JuiceBottling(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n^3) time | O(n^2) space - where n is the length of prices
func JuiceBottling(prices []int) []int {
	numSizes := len(prices)
	maxProfit := make([]int, numSizes)
	solutions := make([][]int, numSizes)

	for size := 0; size < numSizes; size++ {
		for dividingPoint := 0; dividingPoint < size+1; dividingPoint++ {
			possibleProfit := maxProfit[size-dividingPoint] + prices[dividingPoint]

			if possibleProfit > maxProfit[size] {
				maxProfit[size] = possibleProfit
				solutions[size] = append([]int{dividingPoint}, solutions[size-dividingPoint]...)
			}
		}
	}
	return solutions[numSizes-1]
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n^2) time | O(n) space - where n is the length of prices
func JuiceBottling(prices []int) []int {
	numSizes := len(prices)
	maxProfit := make([]int, numSizes)
	dividingPoints := make([]int, numSizes)

	for size := 0; size < numSizes; size++ {
		for dividingPoint := 0; dividingPoint < size+1; dividingPoint++ {
			possibleProfit := maxProfit[size-dividingPoint] + prices[dividingPoint]

			if possibleProfit > maxProfit[size] {
				maxProfit[size] = possibleProfit
				dividingPoints[size] = dividingPoint
			}
		}
	}

	solution := make([]int, 0)
	currentDividingPoint := numSizes - 1
	for currentDividingPoint > 0 {
		solution = append(solution, dividingPoints[currentDividingPoint])
		currentDividingPoint -= dividingPoints[currentDividingPoint]
	}
	return solution
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []int{0, 2, 5, 6}
	expected := []int{1, 2}
	actual := JuiceBottling(input)
	require.Equal(t, expected, actual)
}

```
### Sandbox Code (java)
```java
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    var input = new int[] {0, 2, 5, 6};
    var expected = new int[] {1, 2};
    var actual = new Program().juiceBottling(input);
    Utils.assertTrue(expected.length == actual.size());
    for (int i = 0; i < actual.size(); i++) {
      Utils.assertTrue(expected[i] == actual.get(i));
    }
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n^3) time | O(n^2) space - where n is the length of prices
  public ArrayList<Integer> juiceBottling(int[] prices) {
    int numSizes = prices.length;
    int[] maxProfit = new int[numSizes];
    ArrayList<ArrayList<Integer>> solutions = new ArrayList<ArrayList<Integer>>();
    for (int size = 0; size < numSizes; size++) {
      solutions.add(new ArrayList<Integer>());
    }

    for (int size = 0; size < numSizes; size++) {
      for (int dividingPoint = 0; dividingPoint <= size; dividingPoint++) {
        int possibleProfit = maxProfit[size - dividingPoint] + prices[dividingPoint];

        if (possibleProfit > maxProfit[size]) {
          maxProfit[size] = possibleProfit;
          ArrayList<Integer> newSolution = new ArrayList<Integer>();
          newSolution.add(dividingPoint);
          newSolution.addAll(solutions.get(size - dividingPoint));
          solutions.set(size, newSolution);
        }
      }
    }
    return solutions.get(numSizes - 1);
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n^2) time | O(n) space - where n is the length of prices
  public ArrayList<Integer> juiceBottling(int[] prices) {
    int numSizes = prices.length;
    int[] maxProfit = new int[numSizes];
    int[] dividingPoints = new int[numSizes];

    for (int size = 0; size < numSizes; size++) {
      for (int dividingPoint = 0; dividingPoint <= size; dividingPoint++) {
        int possibleProfit = maxProfit[size - dividingPoint] + prices[dividingPoint];

        if (possibleProfit > maxProfit[size]) {
          maxProfit[size] = possibleProfit;
          dividingPoints[size] = dividingPoint;
        }
      }
    }

    ArrayList<Integer> solution = new ArrayList<Integer>();
    int currentDividingPoint = numSizes - 1;
    while (currentDividingPoint > 0) {
      solution.add(dividingPoints[currentDividingPoint]);
      currentDividingPoint -= dividingPoints[currentDividingPoint];
    }

    return solution;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    var input = new int[] {0, 2, 5, 6};
    var expected = new int[] {1, 2};
    var actual = new Program().juiceBottling(input);
    Utils.assertTrue(expected.length == actual.size());
    for (int i = 0; i < actual.size(); i++) {
      Utils.assertTrue(expected[i] == actual.get(i));
    }
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
  const input = [0, 2, 5, 6];
  const expected = [1, 2];
  const actual = program.juiceBottling(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^3) time | O(n^2) space - where n is the length of prices
function juiceBottling(prices) {
  const numSizes = prices.length;
  const maxProfit = new Array(numSizes).fill(0);
  const solutions = new Array(numSizes).fill(undefined).map(_ => []);

  for (let size = 0; size < numSizes; size++) {
    for (let dividingPoint = 0; dividingPoint < size + 1; dividingPoint++) {
      const possibleProfit = maxProfit[size - dividingPoint] + prices[dividingPoint];

      if (possibleProfit > maxProfit[size]) {
        maxProfit[size] = possibleProfit;
        solutions[size] = [dividingPoint].concat(solutions[size - dividingPoint]);
      }
    }
  }

  return solutions[numSizes - 1];
}

// Do not edit the line below.
exports.juiceBottling = juiceBottling;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space - where n is the length of prices
function juiceBottling(prices) {
  const numSizes = prices.length;
  const maxProfit = new Array(numSizes).fill(0);
  const dividingPoints = new Array(numSizes).fill(0);

  for (let size = 0; size < numSizes; size++) {
    for (let dividingPoint = 0; dividingPoint < size + 1; dividingPoint++) {
      const possibleProfit = maxProfit[size - dividingPoint] + prices[dividingPoint];

      if (possibleProfit > maxProfit[size]) {
        maxProfit[size] = possibleProfit;
        dividingPoints[size] = dividingPoint;
      }
    }
  }

  const solution = [];
  let currentDividingPoint = numSizes - 1;
  while (currentDividingPoint > 0) {
    solution.push(dividingPoints[currentDividingPoint]);
    currentDividingPoint -= dividingPoints[currentDividingPoint];
  }

  return solution;
}

// Do not edit the line below.
exports.juiceBottling = juiceBottling;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [0, 2, 5, 6];
  const expected = [1, 2];
  const actual = program.juiceBottling(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.juiceBottling

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(0, 2, 5, 6)
        val expected = mutableListOf(1, 2)
        val output = juiceBottling(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^3) time | O(n^2) space - where n is the length of prices
fun juiceBottling(prices: MutableList<Int>): MutableList<Int> {
    val numSizes = prices.size
    val maxProfit = MutableList(numSizes) { 0 }
    val solutions = MutableList(numSizes) { mutableListOf<Int>() }

    for (size in 0 until numSizes) {
        for (dividingPoint in 0 until size + 1) {
            val possibleProfit = maxProfit[size - dividingPoint] + prices[dividingPoint]

            if (possibleProfit > maxProfit[size]) {
                maxProfit[size] = possibleProfit
                solutions[size] = (listOf(dividingPoint) + solutions[size - dividingPoint]).toMutableList()
            }
        }
    }

    return solutions[numSizes - 1]
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^2) time | O(n) space - where n is the length of prices
fun juiceBottling(prices: MutableList<Int>): MutableList<Int> {
    val numSizes = prices.size
    val maxProfit = MutableList(numSizes) { 0 }
    val dividingPoints = MutableList(numSizes) { 0 }

    for (size in 0 until numSizes) {
        for (dividingPoint in 0 until size + 1) {
            val possibleProfit = maxProfit[size - dividingPoint] + prices[dividingPoint]

            if (possibleProfit > maxProfit[size]) {
                maxProfit[size] = possibleProfit
                dividingPoints[size] = dividingPoint
            }
        }
    }

    val solution = mutableListOf<Int>()
    var currentDividingPoint = numSizes - 1
    while (currentDividingPoint > 0) {
        solution.add(dividingPoints[currentDividingPoint])
        currentDividingPoint -= dividingPoints[currentDividingPoint]
    }

    return solution
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.juiceBottling

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(0, 2, 5, 6)
        val expected = mutableListOf(1, 2)
        val output = juiceBottling(input)
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
    runTest("Test Case 1") { () throws in
      let input = [0, 2, 5, 6]
      let expected = [1, 2]
      var actual = Program().juiceBottling(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^3) time | O(n^2) space - where n is the length of prices
  func juiceBottling(_ prices: [Int]) -> [Int] {
    let numSizes = prices.count
    var maxProfit = Array(repeating: 0, count: numSizes)
    var solutions = Array(repeating: [Int](), count: numSizes)

    for size in 0 ..< numSizes {
      for dividingPoint in 0 ..< (size + 1) {
        let possibleProfit = maxProfit[size - dividingPoint] + prices[dividingPoint]

        if possibleProfit > maxProfit[size] {
          maxProfit[size] = possibleProfit
          solutions[size] = [dividingPoint] + solutions[size - dividingPoint]
        }
      }
    }
    return solutions[numSizes - 1]
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(n) space - where n is the length of prices
  func juiceBottling(_ prices: [Int]) -> [Int] {
    let numSizes = prices.count
    var maxProfit = Array(repeating: 0, count: numSizes)
    var dividingPoints = Array(repeating: 0, count: numSizes)

    for size in 0 ..< numSizes {
      for dividingPoint in 0 ..< (size + 1) {
        let possibleProfit = maxProfit[size - dividingPoint] + prices[dividingPoint]

        if possibleProfit > maxProfit[size] {
          maxProfit[size] = possibleProfit
          dividingPoints[size] = dividingPoint
        }
      }
    }

    var solution = [Int]()
    var currentDividingPoint = numSizes - 1
    while currentDividingPoint > 0 {
      solution.append(dividingPoints[currentDividingPoint])
      currentDividingPoint -= dividingPoints[currentDividingPoint]
    }
    return solution
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws in
      let input = [0, 2, 5, 6]
      let expected = [1, 2]
      var actual = Program().juiceBottling(input)
      try assertEqual(expected, actual)
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
        input = [0, 2, 5, 6]
        expected = [1, 2]
        actual = program.juiceBottling(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^3) time | O(n^2) space - where n is the length of prices
def juiceBottling(prices):
    numSizes = len(prices)
    maxProfit = [0] * numSizes
    solutions = [[]] * numSizes

    for size in range(numSizes):
        for dividingPoint in range(size + 1):
            possibleProfit = maxProfit[size - dividingPoint] + prices[dividingPoint]

            if possibleProfit > maxProfit[size]:
                maxProfit[size] = possibleProfit
                solutions[size] = [dividingPoint] + solutions[size - dividingPoint]

    return solutions[numSizes - 1]

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n) space - where n is the length of prices
def juiceBottling(prices):
    numSizes = len(prices)
    maxProfit = [0] * numSizes
    dividingPoints = [0] * numSizes

    for size in range(numSizes):
        for dividingPoint in range(size + 1):
            possibleProfit = maxProfit[size - dividingPoint] + prices[dividingPoint]

            if possibleProfit > maxProfit[size]:
                maxProfit[size] = possibleProfit
                dividingPoints[size] = dividingPoint

    solution = []
    currentDividingPoint = numSizes - 1
    while currentDividingPoint > 0:
        solution.append(dividingPoints[currentDividingPoint])
        currentDividingPoint -= dividingPoints[currentDividingPoint]

    return solution

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [0, 2, 5, 6]
        expected = [1, 2]
        actual = program.juiceBottling(input)
        self.assertEqual(actual, expected)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [0, 2, 5, 6];
  const expected = [1, 2];
  const actual = program.juiceBottling(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^3) time | O(n^2) space - where n is the length of prices
export function juiceBottling(prices: number[]) {
  const numSizes = prices.length;
  const maxProfit = new Array(numSizes).fill(0);
  const solutions: number[][] = new Array(numSizes).fill(undefined).map(_ => []);

  for (let size = 0; size < numSizes; size++) {
    for (let dividingPoint = 0; dividingPoint < size + 1; dividingPoint++) {
      const possibleProfit = maxProfit[size - dividingPoint] + prices[dividingPoint];

      if (possibleProfit > maxProfit[size]) {
        maxProfit[size] = possibleProfit;
        solutions[size] = [dividingPoint].concat(solutions[size - dividingPoint]);
      }
    }
  }

  return solutions[numSizes - 1];
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space - where n is the length of prices
export function juiceBottling(prices: number[]) {
  const numSizes = prices.length;
  const maxProfit = new Array(numSizes).fill(0);
  const dividingPoints = new Array(numSizes).fill(0);

  for (let size = 0; size < numSizes; size++) {
    for (let dividingPoint = 0; dividingPoint < size + 1; dividingPoint++) {
      const possibleProfit = maxProfit[size - dividingPoint] + prices[dividingPoint];

      if (possibleProfit > maxProfit[size]) {
        maxProfit[size] = possibleProfit;
        dividingPoints[size] = dividingPoint;
      }
    }
  }

  const solution: number[] = [];
  let currentDividingPoint = numSizes - 1;
  while (currentDividingPoint > 0) {
    solution.push(dividingPoints[currentDividingPoint]);
    currentDividingPoint -= dividingPoints[currentDividingPoint];
  }

  return solution;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [0, 2, 5, 6];
  const expected = [1, 2];
  const actual = program.juiceBottling(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

