# Knapsack Problem
<div class="html">
<p>
  You're given an array of arrays where each subarray holds two integer values
  and represents an item; the first integer is the item's value, and the second
  integer is the item's weight. You're also given an integer representing the
  maximum capacity of a knapsack that you have.
</p>
<p>
  Your goal is to fit items in your knapsack without having the sum of their
  weights exceed the knapsack's capacity, all the while maximizing their
  combined value. Note that you only have one of each item at your disposal.
</p>
<p>
  Write a function that returns the maximized combined value of the items that
  you should pick as well as an array of the indices of each item picked.
</p>
<p>
  If there are multiple combinations of items that maximize the total value in
  the knapsack, your function can return any of them.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">items</span> = [[1, 2], [4, 3], [5, 6], [6, 7]]
<span class="CodeEditor-promptParameter">capacity</span> = 10
</pre>
<h3>Sample Output</h3>
<pre>
[10, [1, 3]] <span class="CodeEditor-promptComment"></span>// items [4, 3] and [6, 7]
</pre>
</div>

Hint 1
<p>
Try building a two-dimensional array of the maximum values that knapsacks of all capacities between 0 and c inclusive could hold, given one, two, three, etc., items. Let columns represent capacities and rows represent items.
</p>


Hint 2

<p>
Build up the array mentioned in Hint #1 one row at a time. In other words, find the maximum values that knapsacks of all capacities between 0 and c can hold with only one item, then with two, etc., until you use all items. Find a formula that relates the maximum value at any given point to previous values.
</p>


Hint 3

<p>
Backtrack your way through the two-dimensional array mentioned in Hint #1 to find which items are in your knapsack. Start at the final index in the array and check whether or not the value stored at that index is equal to the value located one row above. If it isn't, then the item represented by the current row is in the knapsack.
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
      vector<vector<int>> vector1{{1, 2}, {4, 3}, {5, 6}, {6, 7}};
      vector<vector<int>> vector1S{{10}, {1, 3}};
      assert(knapsackProblem(vector1, 10) == vector1S);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

vector<vector<int>> getKnapsackItems(vector<vector<int>> knapsackValues,
                                     vector<vector<int>> items, int weight);

// O(nc) time | O(nc) space
vector<vector<int>> knapsackProblem(vector<vector<int>> items, int capacity) {
  vector<vector<int>> knapsackValues(items.size() + 1,
                                     vector<int>(capacity + 1, 0));
  for (int i = 1; i < items.size() + 1; i++) {
    int currentWeight = items[i - 1][1];
    int currentValue = items[i - 1][0];
    for (int c = 0; c < capacity + 1; c++) {
      if (currentWeight > c) {
        knapsackValues[i][c] = knapsackValues[i - 1][c];
      } else {
        knapsackValues[i][c] =
            max(knapsackValues[i - 1][c],
                knapsackValues[i - 1][c - currentWeight] + currentValue);
      }
    }
  }
  return getKnapsackItems(knapsackValues, items,
                          knapsackValues[items.size()][capacity]);
}

vector<vector<int>> getKnapsackItems(vector<vector<int>> knapsackValues,
                                     vector<vector<int>> items, int weight) {
  vector<vector<int>> solution = {{}, {}};
  int i = knapsackValues.size() - 1;
  int c = knapsackValues[0].size() - 1;
  while (i > 0) {
    if (knapsackValues[i][c] == knapsackValues[i - 1][c]) {
      i--;
    } else {
      solution[1].insert(solution[1].begin(), i - 1);
      c -= items[i - 1][1];
      i--;
    }
    if (c == 0) {
      break;
    }
  }
  solution[0].push_back(weight);
  return solution;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> vector1{{1, 2}, {4, 3}, {5, 6}, {6, 7}};
      vector<vector<int>> vector1S{{10}, {1, 3}};
      assert(knapsackProblem(vector1, 10) == vector1S);
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
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[,] input = {{1, 2}, {4, 3}, {5, 6}, {6, 7}};
		Tuple<int, int[]> expected = Tuple.Create(10, new int[] {1, 3});
		Utils.AssertTrue(compare(Program.KnapsackProblem(input, 10), expected));
	}

	private static bool compare(List<List<int> > arr1, Tuple<int, int[]> arr2) {
		if (arr1[0][0] != arr2.Item1) {
			return false;
		}
		if (arr1[1].Count != arr2.Item2.Length) {
			return false;
		}
		for (int i = 0; i < arr1[1].Count; i++) {
			if (arr1[1][i] != arr2.Item2[i]) {
				return false;
			}
		}
		return true;
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;

public class Program {
	// O(nc) time | O(nc) space
	public static List<List<int> > KnapsackProblem(int[,] items, int capacity) {
		int[,] knapsackValues = new int[items.GetLength(0) + 1,capacity + 1];
		for (int i = 1; i < items.GetLength(0) + 1; i++) {
			int currentWeight = items[i - 1,1];
			int currentValue = items[i - 1,0];
			for (int c = 0; c < capacity + 1; c++) {
				if (currentWeight > c) {
					knapsackValues[i,c] = knapsackValues[i - 1,c];
				} else {
					knapsackValues[i,c] = Math.Max(knapsackValues[i - 1,c],
					    knapsackValues[i - 1,
					    c -
					    currentWeight] +
					    currentValue);
				}
			}
		}
		return getKnapsackItems(knapsackValues, items,
		         knapsackValues[items.GetLength(0),capacity]);
	}

	public static List<List<int> > getKnapsackItems(int[,] knapsackValues, int[,] items,
	  int weight) {
		List<List<int> > sequence = new List<List<int> >();
		List<int> totalWeight = new List<int>();
		totalWeight.Add(weight);
		sequence.Add(totalWeight);
		sequence.Add(new List<int>());
		int i = knapsackValues.GetLength(0) - 1;
		int c = knapsackValues.GetLength(1) - 1;
		while (i > 0) {
			if (knapsackValues[i,c] == knapsackValues[i - 1,c]) {
				i--;
			} else {
				sequence[1].Insert(0, i - 1);
				c -= items[i - 1,1];
				i--;
			}
			if (c == 0) {
				break;
			}
		}
		return sequence;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[,] input = {{1, 2}, {4, 3}, {5, 6}, {6, 7}};
		Tuple<int, int[]> expected = Tuple.Create(10, new int[] {1, 3});
		Utils.AssertTrue(compare(Program.KnapsackProblem(input, 10), expected));
	}

	private static bool compare(List<List<int> > arr1, Tuple<int, int[]> arr2) {
		if (arr1[0][0] != arr2.Item1) {
			return false;
		}
		if (arr1[1].Count != arr2.Item2.Length) {
			return false;
		}
		for (int i = 0; i < arr1[1].Count; i++) {
			if (arr1[1][i] != arr2.Item2[i]) {
				return false;
			}
		}
		return true;
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
	expected := []interface{}{10, []int{1, 3}}
	output := KnapsackProblem([][]int{{1, 2}, {4, 3}, {5, 6}, {6, 7}}, 10)
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

func KnapsackProblem(items [][]int, capacity int) []interface{} {
	values := make([][]int, len(items)+1)
	for i := range values {
		values[i] = make([]int, capacity+1)
	}
	for i := 1; i < len(items)+1; i++ {
		currentValue := items[i-1][0]
		currentWeight := items[i-1][1]
		for c := 0; c < capacity+1; c++ {
			if currentWeight > c {
				values[i][c] = values[i-1][c]
			} else {
				values[i][c] = max(values[i-1][c], values[i-1][c-currentWeight]+currentValue)
			}
		}
	}

	value := values[len(items)][capacity]
	sequence := getKnapsackItems(values, items)
	return []interface{}{value, sequence}
}

func getKnapsackItems(values [][]int, items [][]int) []int {
	sequence := []int{}
	i, c := len(values)-1, len(values[0])-1
	for i > 0 {
		if values[i][c] == values[i-1][c] {
			i--
		} else {
			sequence = append(sequence, i-1)
			c -= items[i-1][1]
			i--
		}
		if c == 0 {
			break
		}
	}
	reverse(sequence)
	return sequence
}

func reverse(numbers []int) {
	for i, j := 0, len(numbers)-1; i < j; i, j = i+1, j-1 {
		numbers[i], numbers[j] = numbers[j], numbers[i]
	}
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
	expected := []interface{}{10, []int{1, 3}}
	output := KnapsackProblem([][]int{{1, 2}, {4, 3}, {5, 6}, {6, 7}}, 10)
	require.Equal(t, expected, output)
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
    int[][] input = {{1, 2}, {4, 3}, {5, 6}, {6, 7}};
    int[][] expected = {{10}, {1, 3}};
    Utils.assertTrue(compare(Program.knapsackProblem(input, 10), expected));
  }

  private static boolean compare(List<List<Integer>> arr1, int[][] arr2) {
    if (arr1.get(0).get(0) != arr2[0][0]) {
      return false;
    }
    if (arr1.get(1).size() != arr2[1].length) {
      return false;
    }
    for (int i = 0; i < arr1.get(1).size(); i++) {
      if (arr1.get(1).get(i) != arr2[1][i]) {
        return false;
      }
    }
    return true;
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(nc) time | O(nc) space
  public static List<List<Integer>> knapsackProblem(int[][] items, int capacity) {
    int[][] knapsackValues = new int[items.length + 1][capacity + 1];
    for (int i = 1; i < items.length + 1; i++) {
      int currentWeight = items[i - 1][1];
      int currentValue = items[i - 1][0];
      for (int c = 0; c < capacity + 1; c++) {
        if (currentWeight > c) {
          knapsackValues[i][c] = knapsackValues[i - 1][c];
        } else {
          knapsackValues[i][c] =
              Math.max(
                  knapsackValues[i - 1][c],
                  knapsackValues[i - 1][c - currentWeight] + currentValue);
        }
      }
    }
    return getKnapsackItems(knapsackValues, items, knapsackValues[items.length][capacity]);
  }

  public static List<List<Integer>> getKnapsackItems(
      int[][] knapsackValues, int[][] items, int weight) {
    List<List<Integer>> sequence = new ArrayList<List<Integer>>();
    List<Integer> totalWeight = new ArrayList<Integer>();
    totalWeight.add(weight);
    sequence.add(totalWeight);
    sequence.add(new ArrayList<Integer>());
    int i = knapsackValues.length - 1;
    int c = knapsackValues[0].length - 1;
    while (i > 0) {
      if (knapsackValues[i][c] == knapsackValues[i - 1][c]) {
        i--;
      } else {
        sequence.get(1).add(0, i - 1);
        c -= items[i - 1][1];
        i--;
      }
      if (c == 0) {
        break;
      }
    }
    return sequence;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[][] input = {{1, 2}, {4, 3}, {5, 6}, {6, 7}};
    int[][] expected = {{10}, {1, 3}};
    Utils.assertTrue(compare(Program.knapsackProblem(input, 10), expected));
  }

  private static boolean compare(List<List<Integer>> arr1, int[][] arr2) {
    if (arr1.get(0).get(0) != arr2[0][0]) {
      return false;
    }
    if (arr1.get(1).size() != arr2[1].length) {
      return false;
    }
    for (int i = 0; i < arr1.get(1).size(); i++) {
      if (arr1.get(1).get(i) != arr2[1][i]) {
        return false;
      }
    }
    return true;
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
  chai
    .expect(
      program.knapsackProblem(
        [
          [1, 2],
          [4, 3],
          [5, 6],
          [6, 7],
        ],
        10,
      ),
    )
    .to.deep.equal([10, [1, 3]]);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nc) time | O(nc) space
function knapsackProblem(items, capacity) {
  const knapsackValues = [];
  for (let i = 0; i < items.length + 1; i++) {
    const row = new Array(capacity + 1).fill(0);
    knapsackValues.push(row);
  }
  for (let i = 1; i < items.length + 1; i++) {
    const currentWeight = items[i - 1][1];
    const currentValue = items[i - 1][0];
    for (let c = 0; c < capacity + 1; c++) {
      if (currentWeight > c) {
        knapsackValues[i][c] = knapsackValues[i - 1][c];
      } else {
        knapsackValues[i][c] = Math.max(
          knapsackValues[i - 1][c],
          knapsackValues[i - 1][c - currentWeight] + currentValue,
        );
      }
    }
  }
  return [knapsackValues[items.length][capacity], getKnapsackItems(knapsackValues, items)];
}

function getKnapsackItems(knapsackValues, items) {
  const sequence = [];
  let i = knapsackValues.length - 1;
  let c = knapsackValues[0].length - 1;
  while (i > 0) {
    if (knapsackValues[i][c] === knapsackValues[i - 1][c]) {
      i -= 1;
    } else {
      sequence.unshift(i - 1);
      c -= items[i - 1][1];
      i -= 1;
    }
    if (c === 0) break;
  }
  return sequence;
}

exports.knapsackProblem = knapsackProblem;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai
    .expect(
      program.knapsackProblem(
        [
          [1, 2],
          [4, 3],
          [5, 6],
          [6, 7],
        ],
        10,
      ),
    )
    .to.deep.equal([10, [1, 3]]);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.knapsackProblem

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(
            listOf(1, 2),
            listOf(4, 3),
            listOf(5, 6),
            listOf(6, 7)
        )
        val expected = Pair(10, listOf(1, 3))
        val output = knapsackProblem(input, 10)
        assert(expected.equals(output))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(nc) time | O(nc) space
fun knapsackProblem(items: List<List<Int>>, capacity: Int): Pair<Int, List<Int>> {
    val knapsackValues = List(items.size + 1) { MutableList(capacity + 1) { 0 } }
    for (i in 1 until items.size + 1) {
        val currentWeight = items[i - 1][1]
        val currentValue = items[i - 1][0]
        for (c in 0 until capacity + 1) {
            if (currentWeight > c) {
                knapsackValues[i][c] = knapsackValues[i - 1][c]
            } else {
                val potentialMax = knapsackValues[i - 1][c - currentWeight] + currentValue
                knapsackValues[i][c] = max(knapsackValues[i - 1][c], potentialMax)
            }
        }
    }
    return getKnapsackItems(knapsackValues, items, knapsackValues[items.size][capacity])
}

fun getKnapsackItems(knapsackValues: List<MutableList<Int>>, items: List<List<Int>>, weight: Int): Pair<Int, List<Int>> {
    val sequence = mutableListOf<Int>()
    val pair = Pair(weight, sequence)
    var i = knapsackValues.size - 1
    var c = knapsackValues[0].size - 1
    while (i > 0) {
        if (knapsackValues[i][c] == knapsackValues[i - 1][c]) {
            i--
        } else {
            sequence.add(0, i - 1)
            c -= items[i - 1][1]
            i--
        }
        if (c == 0) {
            break
        }
    }
    return pair
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.knapsackProblem

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(
            listOf(1, 2),
            listOf(4, 3),
            listOf(5, 6),
            listOf(6, 7)
        )
        val expected = Pair(10, listOf(1, 3))
        val output = knapsackProblem(input, 10)
        assert(expected.equals(output))
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
      let expected = (10, [1, 3])
      let output = program.knapsackProblem([[1, 2], [4, 3], [5, 6], [6, 7]], 10)
      try assert(expected == output)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nc) time | O(nc) space
  func knapsackProblem(_ items: [[Int]], _ capacity: Int) -> (Int, [Int]) {
    var knapsackValues = [[Int]]()

    for _ in 0 ..< items.count + 1 {
      let row = Array(repeating: 0, count: capacity + 1)
      knapsackValues.append(row)
    }

    for currentItemIndex in 1 ..< items.count + 1 {
      let currentValue = items[currentItemIndex - 1][0]
      let currentWeight = items[currentItemIndex - 1][1]

      for currentCapacity in 0 ..< capacity + 1 {
        if currentWeight <= currentCapacity {
          knapsackValues[currentItemIndex][currentCapacity] = max(knapsackValues[currentItemIndex - 1][currentCapacity], knapsackValues[currentItemIndex - 1][currentCapacity - currentWeight] + currentValue)
        } else {
          knapsackValues[currentItemIndex][currentCapacity] = knapsackValues[currentItemIndex - 1][currentCapacity]
        }
      }
    }

    return (knapsackValues[items.count][capacity], getKnapsackItems(items, knapsackValues))
  }

  func getKnapsackItems(_ items: [[Int]], _ knapsackValues: [[Int]]) -> [Int] {
    var sequence = [Int]()

    var currentItemIndex = knapsackValues.count - 1
    var currentCapacity = knapsackValues[0].count - 1

    while currentItemIndex > 0 {
      if knapsackValues[currentItemIndex][currentCapacity] == knapsackValues[currentItemIndex - 1][currentCapacity] {
        currentItemIndex -= 1
      } else {
        sequence.insert(currentItemIndex - 1, at: 0)

        currentCapacity -= items[currentItemIndex - 1][1]
        currentItemIndex -= 1
      }

      if currentCapacity == 0 {
        break
      }
    }

    return sequence
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let expected = (10, [1, 3])
      let output = program.knapsackProblem([[1, 2], [4, 3], [5, 6], [6, 7]], 10)
      try assert(expected == output)
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
        self.assertEqual(program.knapsackProblem([[1, 2], [4, 3], [5, 6], [6, 7]], 10), [10, [1, 3]])

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nc) time | O(nc) space
def knapsackProblem(items, capacity):
    knapsackValues = [[0 for x in range(0, capacity + 1)] for y in range(0, len(items) + 1)]
    for i in range(1, len(items) + 1):
        currentWeight = items[i - 1][1]
        currentValue = items[i - 1][0]
        for c in range(0, capacity + 1):
            if currentWeight > c:
                knapsackValues[i][c] = knapsackValues[i - 1][c]
            else:
                knapsackValues[i][c] = max(
                    knapsackValues[i - 1][c], knapsackValues[i - 1][c - currentWeight] + currentValue
                )
    return [knapsackValues[-1][-1], getKnapsackItems(knapsackValues, items)]


def getKnapsackItems(knapsackValues, items):
    sequence = []
    i = len(knapsackValues) - 1
    c = len(knapsackValues[0]) - 1
    while i > 0:
        if knapsackValues[i][c] == knapsackValues[i - 1][c]:
            i -= 1
        else:
            sequence.append(i - 1)
            c -= items[i - 1][1]
            i -= 1
        if c == 0:
            break
    return list(reversed(sequence))

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.knapsackProblem([[1, 2], [4, 3], [5, 6], [6, 7]], 10), [10, [1, 3]])

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai
    .expect(
      program.knapsackProblem(
        [
          [1, 2],
          [4, 3],
          [5, 6],
          [6, 7],
        ],
        10,
      ),
    )
    .to.deep.equal([10, [1, 3]]);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nc) time | O(nc) space
export function knapsackProblem(items: [number, number][], capacity: number): [number, number[]] {
  const knapsackValues: number[][] = [];
  for (let i = 0; i < items.length + 1; i++) {
    const row = new Array(capacity + 1).fill(0);
    knapsackValues.push(row);
  }
  for (let i = 1; i < items.length + 1; i++) {
    const currentWeight = items[i - 1][1];
    const currentValue = items[i - 1][0];
    for (let c = 0; c < capacity + 1; c++) {
      if (currentWeight > c) {
        knapsackValues[i][c] = knapsackValues[i - 1][c];
      } else {
        knapsackValues[i][c] = Math.max(
          knapsackValues[i - 1][c],
          knapsackValues[i - 1][c - currentWeight] + currentValue,
        );
      }
    }
  }
  return [knapsackValues[items.length][capacity], getKnapsackItems(knapsackValues, items)];
}

function getKnapsackItems(knapsackValues: number[][], items: [number, number][]) {
  const sequence: number[] = [];
  let i = knapsackValues.length - 1;
  let c = knapsackValues[0].length - 1;
  while (i > 0) {
    if (knapsackValues[i][c] === knapsackValues[i - 1][c]) {
      i -= 1;
    } else {
      sequence.unshift(i - 1);
      c -= items[i - 1][1];
      i -= 1;
    }
    if (c === 0) break;
  }
  return sequence;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai
    .expect(
      program.knapsackProblem(
        [
          [1, 2],
          [4, 3],
          [5, 6],
          [6, 7],
        ],
        10,
      ),
    )
    .to.deep.equal([10, [1, 3]]);
});

```

