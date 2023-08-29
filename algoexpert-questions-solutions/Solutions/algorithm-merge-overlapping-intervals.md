# Merge Overlapping Intervals
<div class="html">
<p>
  Write a function that takes in a non-empty array of arbitrary intervals,
  merges any overlapping intervals, and returns the new intervals in no
  particular order.
</p>
<p>
  Each interval <span>interval</span> is an array of two integers, with
  <span>interval[0]</span> as the start of the interval and
  <span>interval[1]</span> as the end of the interval.
</p>
<p>
  Note that back-to-back intervals aren't considered to be overlapping. For
  example, <span>[1, 5]</span> and <span>[6, 7]</span> aren't overlapping;
  however, <span>[1, 6]</span> and <span>[6, 7]</span> <i>are</i> indeed
  overlapping.
</p>
<p>
  Also note that the start of any particular interval will always be less than
  or equal to the end of that interval.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">intervals</span> = [[1, 2], [3, 5], [4, 7], [6, 8], [9, 10]]
</pre>
<h3>Sample Output</h3>
<pre>
[[1, 2], [3, 8], [9, 10]]
<span class="CodeEditor-promptComment">// Merge the intervals [3, 5], [4, 7], and [6, 8].</span>
<span class="CodeEditor-promptComment">// The intervals could be ordered differently.</span>
</pre>
</div>

Hint 1
<p>
  The problem asks you to merge overlapping intervals. How can you determine if
  two intervals are overlapping?
</p>


Hint 2

<p>
  Sort the intervals with respect to their starting values. This will allow you
  to merge all overlapping intervals in a single traversal through the sorted
  intervals.
</p>


Hint 3

<p>
  After sorting the intervals with respect to their starting values, traverse
  them, and at each iteration, compare the start of the next interval to the end
  of the current interval to look for an overlap. If you find an overlap, mutate
  the current interval so as to merge the next interval into it.
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
      vector<vector<int>> intervals = {{1, 2}, {3, 5}, {4, 7}, {6, 8}, {9, 10}};
      vector<vector<int>> expected = {{1, 2}, {3, 8}, {9, 10}};
      auto actual = mergeOverlappingIntervals(intervals);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <algorithm>
using namespace std;

// O(nlog(n)) time | O(n) space - where n is the length of the input array
vector<vector<int>> mergeOverlappingIntervals(vector<vector<int>> intervals) {
  vector<vector<int>> sortedIntervals = intervals;
  sort(sortedIntervals.begin(), sortedIntervals.end(),
       [](vector<int> a, vector<int> b) { return a[0] < b[0]; });

  vector<vector<int> *> mergedIntervals;
  vector<int> *currentInterval = &sortedIntervals[0];
  mergedIntervals.push_back(currentInterval);

  for (auto &nextInterval : sortedIntervals) {
    int currentIntervalEnd = currentInterval->at(1);
    int nextIntervalStart = nextInterval[0];
    int nextIntervalEnd = nextInterval[1];

    if (currentIntervalEnd >= nextIntervalStart) {
      currentInterval->at(1) = max(currentIntervalEnd, nextIntervalEnd);
    } else {
      currentInterval = &nextInterval;
      mergedIntervals.push_back(currentInterval);
    }
  }

  vector<vector<int>> mergedIntervalsCopy;
  for (auto interval : mergedIntervals) {
    mergedIntervalsCopy.push_back(*interval);
  }
  return mergedIntervalsCopy;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> intervals = {{1, 2}, {3, 5}, {4, 7}, {6, 8}, {9, 10}};
      vector<vector<int>> expected = {{1, 2}, {3, 8}, {9, 10}};
      auto actual = mergeOverlappingIntervals(intervals);
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
		int[][] intervals = new int[][] {
			new int[] {1,2},
			new int[] {3,5},
			new int[] {4,7},
			new int[] {6,8},
			new int[] {9,10},
		};
		int[][] expected = new int[][] {
			new int[] {1,2},
			new int[] {3,8},
			new int[] {9,10},
		};
		int[][] actual = new Program().MergeOverlappingIntervals(intervals);
		for (int i=0; i<actual.Length; i++) {
			for (int j=0; j<actual[i].Length; j++) {
				Utils.AssertTrue(expected[i][j] == actual[i][j]);
			}
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

	// O(nlog(n)) time | O(n) space - where n is the length of the input array
	public int[][] MergeOverlappingIntervals(int[][] intervals) {
		// Sort the intervals by starting value.
		int[][] sortedIntervals = intervals.Clone() as int[][];
		Array.Sort(sortedIntervals, (a, b) => a[0].CompareTo(b[0]));

		List<int[]> mergedIntervals = new List<int[]>();
		int[] currentInterval = sortedIntervals[0];
		mergedIntervals.Add(currentInterval);

		foreach (var nextInterval in sortedIntervals) {
			int currentIntervalEnd = currentInterval[1];
			int nextIntervalStart = nextInterval[0];
			int nextIntervalEnd = nextInterval[1];

			if (currentIntervalEnd >= nextIntervalStart) {
				currentInterval[1] = Math.Max(currentIntervalEnd, nextIntervalEnd);
			} else {
				currentInterval = nextInterval;
				mergedIntervals.Add(currentInterval);
			}
		}

		return mergedIntervals.ToArray();
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[][] intervals = new int[][] {
			new int[] {1,2},
			new int[] {3,5},
			new int[] {4,7},
			new int[] {6,8},
			new int[] {9,10},
		};
		int[][] expected = new int[][] {
			new int[] {1,2},
			new int[] {3,8},
			new int[] {9,10},
		};
		int[][] actual = new Program().MergeOverlappingIntervals(intervals);
		for (int i=0; i<actual.Length; i++) {
			for (int j=0; j<actual[i].Length; j++) {
				Utils.AssertTrue(expected[i][j] == actual[i][j]);
			}
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
	input := [][]int{
		{1, 2},
		{3, 5},
		{4, 7},
		{6, 8},
		{9, 10},
	}
	expected := [][]int{
		{1, 2},
		{3, 8},
		{9, 10},
	}
	actual := MergeOverlappingIntervals(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"sort"
)

// O(nlog(n)) time | O(n) space - where n is the length of the input array
func MergeOverlappingIntervals(intervals [][]int) [][]int {
	sortedIntervals := make([][]int, len(intervals))
	copy(sortedIntervals, intervals)
	sort.Slice(sortedIntervals, func(i, j int) bool {
		return sortedIntervals[i][0] < sortedIntervals[j][0]
	})

	mergedIntervals := make([][]int, 0)
	currentInterval := sortedIntervals[0]
	mergedIntervals = append(mergedIntervals, currentInterval)

	for _, nextInterval := range sortedIntervals {
		currentIntervalEnd := currentInterval[1]
		nextIntervalStart, nextIntervalEnd := nextInterval[0], nextInterval[1]

		if currentIntervalEnd >= nextIntervalStart {
			currentInterval[1] = max(currentIntervalEnd, nextIntervalEnd)
		} else {
			currentInterval = nextInterval
			mergedIntervals = append(mergedIntervals, currentInterval)
		}
	}

	return mergedIntervals
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := [][]int{
		{1, 2},
		{3, 5},
		{4, 7},
		{6, 8},
		{9, 10},
	}
	expected := [][]int{
		{1, 2},
		{3, 8},
		{9, 10},
	}
	actual := MergeOverlappingIntervals(input)
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
    int[][] intervals =
        new int[][] {
          {1, 2},
          {3, 5},
          {4, 7},
          {6, 8},
          {9, 10}
        };
    int[][] expected =
        new int[][] {
          {1, 2},
          {3, 8},
          {9, 10}
        };
    int[][] actual = new Program().mergeOverlappingIntervals(intervals);
    for (int i = 0; i < actual.length; i++) {
      for (int j = 0; j < actual[i].length; j++) {
        Utils.assertTrue(expected[i][j] == actual[i][j]);
      }
    }
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(nlog(n)) time | O(n) space - where n is the length of the input array
  public int[][] mergeOverlappingIntervals(int[][] intervals) {
    // Sort the intervals by starting value.
    int[][] sortedIntervals = intervals.clone();
    Arrays.sort(sortedIntervals, (a, b) -> Integer.compare(a[0], b[0]));

    List<int[]> mergedIntervals = new ArrayList<int[]>();
    int[] currentInterval = sortedIntervals[0];
    mergedIntervals.add(currentInterval);

    for (int[] nextInterval : sortedIntervals) {
      int currentIntervalEnd = currentInterval[1];
      int nextIntervalStart = nextInterval[0];
      int nextIntervalEnd = nextInterval[1];

      if (currentIntervalEnd >= nextIntervalStart) {
        currentInterval[1] = Math.max(currentIntervalEnd, nextIntervalEnd);
      } else {
        currentInterval = nextInterval;
        mergedIntervals.add(currentInterval);
      }
    }

    return mergedIntervals.toArray(new int[mergedIntervals.size()][]);
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[][] intervals =
        new int[][] {
          {1, 2},
          {3, 5},
          {4, 7},
          {6, 8},
          {9, 10}
        };
    int[][] expected =
        new int[][] {
          {1, 2},
          {3, 8},
          {9, 10}
        };
    int[][] actual = new Program().mergeOverlappingIntervals(intervals);
    for (int i = 0; i < actual.length; i++) {
      for (int j = 0; j < actual[i].length; j++) {
        Utils.assertTrue(expected[i][j] == actual[i][j]);
      }
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
  const intervals = [
    [1, 2],
    [3, 5],
    [4, 7],
    [6, 8],
    [9, 10],
  ];
  const expected = [
    [1, 2],
    [3, 8],
    [9, 10],
  ];
  const actual = program.mergeOverlappingIntervals(intervals);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlog(n)) time | O(n) space - where n is the length of the input array
function mergeOverlappingIntervals(intervals) {
  const sortedIntervals = intervals.sort((a, b) => a[0] - b[0]);

  const mergedIntervals = [];
  let currentInterval = sortedIntervals[0];
  mergedIntervals.push(currentInterval);

  for (const nextInterval of sortedIntervals) {
    const [_, currentIntervalEnd] = currentInterval;
    const [nextIntervalStart, nextIntervalEnd] = nextInterval;

    if (currentIntervalEnd >= nextIntervalStart) currentInterval[1] = Math.max(currentIntervalEnd, nextIntervalEnd);
    else {
      currentInterval = nextInterval;
      mergedIntervals.push(currentInterval);
    }
  }

  return mergedIntervals;
}

// Do not edit the line below.
exports.mergeOverlappingIntervals = mergeOverlappingIntervals;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const intervals = [
    [1, 2],
    [3, 5],
    [4, 7],
    [6, 8],
    [9, 10],
  ];
  const expected = [
    [1, 2],
    [3, 8],
    [9, 10],
  ];
  const actual = program.mergeOverlappingIntervals(intervals);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.mergeOverlappingIntervals

class ProgramTest {
    @Test
    fun TestCase1() {
        val intervals = listOf(listOf(1, 2), listOf(3, 5), listOf(4, 7), listOf(6, 8), listOf(9, 10))
        val expected = listOf(listOf(1, 2), listOf(3, 8), listOf(9, 10))
        val output = mergeOverlappingIntervals(intervals)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(nlog(n)) time | O(n) space - where n is the length of the input array
fun mergeOverlappingIntervals(intervals: List<List<Int>>): List<List<Int>> {
    // Sort the intervals by starting value.
    var sortedIntervals = intervals.toMutableList().sortedWith(Comparator<List<Int>> { a, b -> a[0].compareTo(b[0]) })
    sortedIntervals = sortedIntervals.map() { it -> it.toMutableList() }

    val mergedIntervals = mutableListOf<MutableList<Int>>()
    var currentInterval = sortedIntervals[0]
    mergedIntervals.add(currentInterval)

    for (nextInterval in sortedIntervals) {
        val (currentIntervalStart, currentIntervalEnd) = currentInterval
        val (nextIntervalStart, nextIntervalEnd) = nextInterval

        if (currentIntervalEnd >= nextIntervalStart) {
            currentInterval[1] = max(currentIntervalEnd, nextIntervalEnd)
        } else {
            currentInterval = nextInterval
            mergedIntervals.add(currentInterval)
        }
    }

    return mergedIntervals
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.mergeOverlappingIntervals

class ProgramTest {
    @Test
    fun TestCase1() {
        val intervals = listOf(listOf(1, 2), listOf(3, 5), listOf(4, 7), listOf(6, 8), listOf(9, 10))
        val expected = listOf(listOf(1, 2), listOf(3, 8), listOf(9, 10))
        val output = mergeOverlappingIntervals(intervals)
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
    runTest("Test Case 1") { () throws -> Void in
      var input = [
        [1, 2],
        [3, 5],
        [4, 7],
        [6, 8],
        [9, 10],
      ]
      var expected = [
        [1, 2],
        [3, 8],
        [9, 10],
      ]
      var actual = Program().mergeOverlappingIntervals(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nlog(n)) time | O(n) space - where n is the length of the input array
  func mergeOverlappingIntervals(_ intervals: [[Int]]) -> [[Int]] {
    let sortedIntervals = intervals.sorted(by: { $0[0] < $1[0] })

    var mergedIntervals = [[Int]]()
    var currentInterval = sortedIntervals[0]
    mergedIntervals.append(currentInterval)

    for nextInterval in sortedIntervals {
      let currentIntervalEnd = currentInterval[1]
      let (nextIntervalStart, nextIntervalEnd) = (nextInterval[0], nextInterval[1])

      if currentIntervalEnd >= nextIntervalStart {
        currentInterval[1] = max(currentIntervalEnd, nextIntervalEnd)
        mergedIntervals[mergedIntervals.count - 1][1] = currentInterval[1]
      } else {
        currentInterval = nextInterval
        mergedIntervals.append(currentInterval)
      }
    }

    return mergedIntervals
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = [
        [1, 2],
        [3, 5],
        [4, 7],
        [6, 8],
        [9, 10],
      ]
      var expected = [
        [1, 2],
        [3, 8],
        [9, 10],
      ]
      var actual = Program().mergeOverlappingIntervals(input)
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
        intervals = [[1, 2], [3, 5], [4, 7], [6, 8], [9, 10]]
        expected = [[1, 2], [3, 8], [9, 10]]
        actual = program.mergeOverlappingIntervals(intervals)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nlog(n)) time | O(n) space - where n is the length of the input array
def mergeOverlappingIntervals(intervals):
    # Sort the intervals by starting value.
    sortedIntervals = sorted(intervals, key=lambda x: x[0])

    mergedIntervals = []
    currentInterval = sortedIntervals[0]
    mergedIntervals.append(currentInterval)

    for nextInterval in sortedIntervals:
        _, currentIntervalEnd = currentInterval
        nextIntervalStart, nextIntervalEnd = nextInterval

        if currentIntervalEnd >= nextIntervalStart:
            currentInterval[1] = max(currentIntervalEnd, nextIntervalEnd)
        else:
            currentInterval = nextInterval
            mergedIntervals.append(currentInterval)

    return mergedIntervals

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        intervals = [[1, 2], [3, 5], [4, 7], [6, 8], [9, 10]]
        expected = [[1, 2], [3, 8], [9, 10]]
        actual = program.mergeOverlappingIntervals(intervals)
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
  const intervals = [
    [1, 2],
    [3, 5],
    [4, 7],
    [6, 8],
    [9, 10],
  ];
  const expected = [
    [1, 2],
    [3, 8],
    [9, 10],
  ];
  const actual = program.mergeOverlappingIntervals(intervals);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlog(n)) time | O(n) space - where n is the length of the input array
export function mergeOverlappingIntervals(intervals: number[][]) {
  const sortedIntervals = intervals.sort((a, b) => a[0] - b[0]);

  const mergedIntervals: number[][] = [];
  let currentInterval = sortedIntervals[0];
  mergedIntervals.push(currentInterval);

  for (const nextInterval of sortedIntervals) {
    const [_, currentIntervalEnd] = currentInterval;
    const [nextIntervalStart, nextIntervalEnd] = nextInterval;

    if (currentIntervalEnd >= nextIntervalStart) currentInterval[1] = Math.max(currentIntervalEnd, nextIntervalEnd);
    else {
      currentInterval = nextInterval;
      mergedIntervals.push(currentInterval);
    }
  }

  return mergedIntervals;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const intervals = [
    [1, 2],
    [3, 5],
    [4, 7],
    [6, 8],
    [9, 10],
  ];
  const expected = [
    [1, 2],
    [3, 8],
    [9, 10],
  ];
  const actual = program.mergeOverlappingIntervals(intervals);
  chai.expect(actual).to.deep.equal(expected);
});

```

