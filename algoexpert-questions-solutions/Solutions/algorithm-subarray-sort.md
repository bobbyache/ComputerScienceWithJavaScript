# Subarray Sort
<div class="html">
<p>
  Write a function that takes in an array of at least two integers and that
  returns an array of the starting and ending indices of the smallest subarray
  in the input array that needs to be sorted in place in order for the entire
  input array to be sorted (in ascending order).
</p>
<p>
  If the input array is already sorted, the function should return
  <span>[-1, -1]</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19]
</pre>
<h3>Sample Output</h3>
<pre>
[3, 9]
</pre>
</div>

Hint 1
<p>
Realize that even a single out-of-order number in the input array can call for a large subarray to have to be sorted. This is because, depending on how out-of-place the number is, it might need to be moved very far away from its original position in order to be in its sorted position.
</p>


Hint 2

<p>
Find the smallest and largest numbers that are out of order in the input array. You should be able to do this in a single pass through the array.
</p>


Hint 3

<p>
Once you've found the smallest and largest out-of-order numbers mentioned in Hint #2, find their final sorted positions in the array. This should give you the extremities of the smallest subarray that needs to be sorted.
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
      vector<int> expected{3, 9};
      assert(subarraySort({1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19}) ==
             expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

bool isOutOfOrder(int i, int num, vector<int> array);

// O(n) time | O(1) space
vector<int> subarraySort(vector<int> array) {
  int minOutOfOrder = INT_MAX;
  int maxOutOfOrder = INT_MIN;
  for (int i = 0; i < array.size(); i++) {
    int num = array[i];
    if (isOutOfOrder(i, num, array)) {
      minOutOfOrder = min(minOutOfOrder, num);
      maxOutOfOrder = max(maxOutOfOrder, num);
    }
  }
  if (minOutOfOrder == INT_MAX) {
    return vector<int>{-1, -1};
  }
  int subarrayLeftIdx = 0;
  while (minOutOfOrder >= array[subarrayLeftIdx]) {
    subarrayLeftIdx++;
  }
  int subarrayRightIdx = array.size() - 1;
  while (maxOutOfOrder <= array[subarrayRightIdx]) {
    subarrayRightIdx--;
  }
  return vector<int>{subarrayLeftIdx, subarrayRightIdx};
}

bool isOutOfOrder(int i, int num, vector<int> array) {
  if (i == 0) {
    return num > array[i + 1];
  }
  if (i == array.size() - 1) {
    return num < array[i - 1];
  }
  return num > array[i + 1] || num < array[i - 1];
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> expected{3, 9};
      assert(subarraySort({1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19}) ==
             expected);
    });
  }
};

```
### Sandbox Code (csharp)
```csharp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

using System.Linq;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] expected = {3, 9};
		Utils.AssertTrue(Enumerable.SequenceEqual(Program.SubarraySort(new int[] {1, 2, 4,
		                                                                          7, 10, 11,
		                                                                          7, 12, 6,
		                                                                          7, 16, 18,
		                                                                          19}),
		  expected));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// O(n) time | O(1) space
	public static int[] SubarraySort(int[] array) {
		int minOutOfOrder = Int32.MaxValue;
		int maxOutOfOrder = Int32.MinValue;
		for (int i = 0; i < array.Length; i++) {
			int num = array[i];
			if (isOutOfOrder(i, num, array)) {
				minOutOfOrder = Math.Min(minOutOfOrder, num);
				maxOutOfOrder = Math.Max(maxOutOfOrder, num);
			}
		}
		if (minOutOfOrder == Int32.MaxValue) {
			return new int[] {-1, -1};
		}
		int subarrayLeftIdx = 0;
		while (minOutOfOrder >= array[subarrayLeftIdx]) {
			subarrayLeftIdx++;
		}
		int subarrayRightIdx = array.Length - 1;
		while (maxOutOfOrder <= array[subarrayRightIdx]) {
			subarrayRightIdx--;
		}
		return new int[] {subarrayLeftIdx, subarrayRightIdx};
	}

	public static bool isOutOfOrder(int i, int num, int[] array) {
		if (i == 0) {
			return num > array[i + 1];
		}
		if (i == array.Length - 1) {
			return num < array[i - 1];
		}
		return num > array[i + 1] || num < array[i - 1];
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Linq;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] expected = {3, 9};
		Utils.AssertTrue(Enumerable.SequenceEqual(Program.SubarraySort(new int[] {1, 2, 4,
		                                                                          7, 10, 11,
		                                                                          7, 12, 6,
		                                                                          7, 16, 18,
		                                                                          19}),
		  expected));
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
	expected := []int{3, 9}
	output := SubarraySort([]int{1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19})
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "math"

// O(n) time | O(1) space
func SubarraySort(array []int) []int {
	minOutOfOrder, maxOutOfOrder := math.MaxInt32, math.MinInt32
	for i, num := range array {
		if isOutOfOrder(i, num, array) {
			minOutOfOrder = min(minOutOfOrder, num)
			maxOutOfOrder = max(maxOutOfOrder, num)
		}
	}
	if minOutOfOrder == math.MaxInt32 {
		return []int{-1, -1}
	}
	subarrayLeft := 0
	for minOutOfOrder >= array[subarrayLeft] {
		subarrayLeft += 1
	}
	subarrayRight := len(array) - 1
	for maxOutOfOrder <= array[subarrayRight] {
		subarrayRight -= 1
	}
	return []int{subarrayLeft, subarrayRight}
}

func isOutOfOrder(i int, num int, array []int) bool {
	if i == 0 {
		return num > array[i+1]
	}
	if i == len(array)-1 {
		return num < array[i-1]
	}
	return num > array[i+1] || num < array[i-1]
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func max(a, b int) int {
	if a < b {
		return b
	}
	return a
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := []int{3, 9}
	output := SubarraySort([]int{1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19})
	require.Equal(t, expected, output)
}

```
### Sandbox Code (java)
```java
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import java.util.Arrays;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[] expected = {3, 9};
    Utils.assertTrue(
        Arrays.equals(
            Program.subarraySort(new int[] {1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19}),
            expected));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space
  public static int[] subarraySort(int[] array) {
    int minOutOfOrder = Integer.MAX_VALUE;
    int maxOutOfOrder = Integer.MIN_VALUE;
    for (int i = 0; i < array.length; i++) {
      int num = array[i];
      if (isOutOfOrder(i, num, array)) {
        minOutOfOrder = Math.min(minOutOfOrder, num);
        maxOutOfOrder = Math.max(maxOutOfOrder, num);
      }
    }
    if (minOutOfOrder == Integer.MAX_VALUE) {
      return new int[] {-1, -1};
    }
    int subarrayLeftIdx = 0;
    while (minOutOfOrder >= array[subarrayLeftIdx]) {
      subarrayLeftIdx++;
    }
    int subarrayRightIdx = array.length - 1;
    while (maxOutOfOrder <= array[subarrayRightIdx]) {
      subarrayRightIdx--;
    }
    return new int[] {subarrayLeftIdx, subarrayRightIdx};
  }

  public static boolean isOutOfOrder(int i, int num, int[] array) {
    if (i == 0) {
      return num > array[i + 1];
    }
    if (i == array.length - 1) {
      return num < array[i - 1];
    }
    return num > array[i + 1] || num < array[i - 1];
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.Arrays;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[] expected = {3, 9};
    Utils.assertTrue(
        Arrays.equals(
            Program.subarraySort(new int[] {1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19}),
            expected));
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
  chai.expect(program.subarraySort([1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19])).to.deep.equal([3, 9]);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space
function subarraySort(array) {
  let minOutOfOrder = Infinity;
  let maxOutOfOrder = -Infinity;
  for (let i = 0; i < array.length; i++) {
    const num = array[i];
    if (isOutOfOrder(i, num, array)) {
      minOutOfOrder = Math.min(minOutOfOrder, num);
      maxOutOfOrder = Math.max(maxOutOfOrder, num);
    }
  }
  if (minOutOfOrder === Infinity) {
    return [-1, -1];
  }
  let subarrayLeftIdx = 0;
  while (minOutOfOrder >= array[subarrayLeftIdx]) {
    subarrayLeftIdx++;
  }
  let subarrayRightIdx = array.length - 1;
  while (maxOutOfOrder <= array[subarrayRightIdx]) {
    subarrayRightIdx--;
  }
  return [subarrayLeftIdx, subarrayRightIdx];
}

function isOutOfOrder(i, num, array) {
  if (i === 0) return num > array[i + 1];
  if (i === array.length - 1) return num < array[i - 1];
  return num > array[i + 1] || num < array[i - 1];
}

exports.subarraySort = subarraySort;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.subarraySort([1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19])).to.deep.equal([3, 9]);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.subarraySort as subarraySort

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = listOf<Int>(1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19)
        val output = subarraySort(array)
        val expected = listOf<Int>(3, 9)
        assert(output.equals(expected))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max
import kotlin.math.min

// O(n) time | O(1) space
fun subarraySort(array: List<Int>): List<Int> {
    var minOutOfOrder = Int.MAX_VALUE
    var maxOutOfOrder = Int.MIN_VALUE
    for (i in 0 until array.size) {
        val num = array[i]
        if (isOutOfOrder(i, num, array)) {
            minOutOfOrder = min(minOutOfOrder, num)
            maxOutOfOrder = max(maxOutOfOrder, num)
        }
    }
    if (minOutOfOrder == Int.MAX_VALUE) {
        return listOf<Int>(-1, -1)
    }
    var subarrayLeftIdx = 0
    while (minOutOfOrder >= array[subarrayLeftIdx]) {
        subarrayLeftIdx++
    }
    var subarrayRightIdx = array.size - 1
    while (maxOutOfOrder <= array[subarrayRightIdx]) {
        subarrayRightIdx--
    }
    return listOf<Int>(subarrayLeftIdx, subarrayRightIdx)
}

fun isOutOfOrder(i: Int, num: Int, array: List<Int>): Boolean {
    if (i == 0) return num > array[i + 1]
    if (i == array.size - 1) return num < array[i - 1]
    return num > array[i + 1] || num < array[i - 1]
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.subarraySort as subarraySort

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = listOf<Int>(1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19)
        val output = subarraySort(array)
        val expected = listOf<Int>(3, 9)
        assert(output.equals(expected))
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
      try assertEqual([3, 9], program.subarraySort(array: [1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19]))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space
  func subarraySort(array: [Int]) -> [Int] {
    var minimumOutOfOrder = Int(Int16.max)
    var maximumOutOfOrder = -Int(Int16.max)

    for i in 0 ..< array.count {
      let currentNumber = array[i]

      if isOutOfOrder(i, array, currentNumber) {
        minimumOutOfOrder = min(currentNumber, minimumOutOfOrder)
        maximumOutOfOrder = max(currentNumber, maximumOutOfOrder)
      }
    }

    if minimumOutOfOrder == Int(Int16.max) {
      return [-1, -1]
    }

    var subarrayLeftIndex = 0
    while minimumOutOfOrder >= array[subarrayLeftIndex] {
      subarrayLeftIndex += 1
    }

    var subarrayRightIndex = array.count - 1
    while maximumOutOfOrder <= array[subarrayRightIndex] {
      subarrayRightIndex -= 1
    }

    return [subarrayLeftIndex, subarrayRightIndex]
  }

  func isOutOfOrder(_ i: Int, _ array: [Int], _ currentNumber: Int) -> Bool {
    if i == 0 {
      return currentNumber > array[i + 1]
    } else if i == array.count - 1 {
      return currentNumber < array[i - 1]
    } else {
      return currentNumber > array[i + 1] || currentNumber < array[i - 1]
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
      try assertEqual([3, 9], program.subarraySort(array: [1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19]))
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
        self.assertEqual(program.subarraySort([1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19]), [3, 9])

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space
def subarraySort(array):
    minOutOfOrder = float("inf")
    maxOutOfOrder = float("-inf")
    for i in range(len(array)):
        num = array[i]
        if isOutOfOrder(i, num, array):
            minOutOfOrder = min(minOutOfOrder, num)
            maxOutOfOrder = max(maxOutOfOrder, num)
    if minOutOfOrder == float("inf"):
        return [-1, -1]
    subarrayLeftIdx = 0
    while minOutOfOrder >= array[subarrayLeftIdx]:
        subarrayLeftIdx += 1
    subarrayRightIdx = len(array) - 1
    while maxOutOfOrder <= array[subarrayRightIdx]:
        subarrayRightIdx -= 1
    return [subarrayLeftIdx, subarrayRightIdx]


def isOutOfOrder(i, num, array):
    if i == 0:
        return num > array[i + 1]
    if i == len(array) - 1:
        return num < array[i - 1]
    return num > array[i + 1] or num < array[i - 1]

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.subarraySort([1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19]), [3, 9])

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.subarraySort([1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19])).to.deep.equal([3, 9]);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

type Range = [number, number];

// O(n) time | O(1) space
export function subarraySort(array: number[]): Range {
  let minOutOfOrder = Infinity;
  let maxOutOfOrder = -Infinity;
  for (let i = 0; i < array.length; i++) {
    const num = array[i];
    if (isOutOfOrder(i, num, array)) {
      minOutOfOrder = Math.min(minOutOfOrder, num);
      maxOutOfOrder = Math.max(maxOutOfOrder, num);
    }
  }
  if (minOutOfOrder === Infinity) {
    return [-1, -1];
  }
  let subarrayLeftIdx = 0;
  while (minOutOfOrder >= array[subarrayLeftIdx]) {
    subarrayLeftIdx++;
  }
  let subarrayRightIdx = array.length - 1;
  while (maxOutOfOrder <= array[subarrayRightIdx]) {
    subarrayRightIdx--;
  }
  return [subarrayLeftIdx, subarrayRightIdx];
}

function isOutOfOrder(i: number, num: number, array: number[]) {
  if (i === 0) return num > array[i + 1];
  if (i === array.length - 1) return num < array[i - 1];
  return num > array[i + 1] || num < array[i - 1];
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.subarraySort([1, 2, 4, 7, 10, 11, 7, 12, 6, 7, 16, 18, 19])).to.deep.equal([3, 9]);
});

```

