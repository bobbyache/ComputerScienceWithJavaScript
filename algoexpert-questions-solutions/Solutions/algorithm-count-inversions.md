# Count Inversions
<div class="html">
<p>
  Write a function that takes in an array of integers and returns the number of
  inversions in the array. An inversion occurs if for any valid indices
  <span>i</span> and <span>j</span>, <span>i &lt; j</span> and
  <span>array[i] > array[j]</span>.
</p>
<p>
  For example, given <span>array = [3, 4, 1, 2]</span>, there are
  <span>4</span> inversions. The following pairs of indices represent
  inversions: <span>[0, 2], [0, 3], [1, 2], [1, 3]</span>.
</p>
<p>
  Intuitively, the number of inversions is a measure of how unsorted the array
  is.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [2, 3, 3, 1, 9, 5, 6]
</pre>
<h3>Sample Output</h3>
<pre>
5
<span class="CodeEditor-promptComment">// The following pairs of indices represent inversions:</span>
<span class="CodeEditor-promptComment">// [0, 3], [1, 3], [2, 3], [4, 5], [4, 6]</span>
</pre>
</div>

Hint 1
<p>
  The brute-force approach to solve this problem is to simply compare every pair
  of indices in the array and to determine how many of them represent
  inversions. This approach takes <span>O(n^2)</span> time, where n is the
  length of the array. Can you do better than this?
</p>


Hint 2

<p>
  If the number of inversions is the degree to which the array is unsorted, and
  it if it takes <span>O(nlog(n))</span> time to sort an array using an optimal
  sorting algorithm, can you determine how unsorted the array is with a solution
  that runs in that time complexity?
</p>


Hint 3

<p>
  Try thinking about how you would solve this problem if, instead of being given
  one array, you were given two separate arrays representing the main array's
  two halves. You would need to determine the number of inversions in the array
  created by merging the left array and the right array. The number of
  inversions in this example is actually equal to the number of inversions in
  the left array, the number of inversions in the right array, <b>and</b> the
  number of inversions when you merge the <b>sorted</b> left array and the
  <b>sorted</b> right array. Recall how Merge Sort works for a hint about how
  you can solve this problem.
</p>


Hint 4

<p>
  Once you understand the information stated in Hint #3, you can use an
  algorithm that's very similar to Merge Sort to determine the number of
  inversions in any array. You'll recursively determine the number of inversions
  in the left and right halves of an array while sorting both the left and right
  halves, just like you do in Merge Sort. Once your two halves are sorted,
  you'll merge them together and count the number of inversions in the merged
  array. Take the example of these two sorted arrays:
  <span>a1 = [1, 3, 4]</span> and <span>a2 = [2, 2, 5]</span>. When you merge
  these two sorted arrays, you insert elements from the left and right array
  into one larger array. Whenever you insert an element from the right array
  before inserting an element from the left array, that means an inversion or
  multiple inversions have occurred. This is because elements in the right array
  are positioned after all elements in the left array (if these two arrays were
  originally left and right halves of another array). The remaining elements to
  be inserted from the left array when we insert an element from the right array
  are all inverted with this right-array element. See the Conceptual Overview
  section of this question's video explanation for a more in-depth explanation.
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
      auto input = {2, 3, 3, 1, 9, 5, 6};
      auto expected = 5;
      auto actual = countInversions(input);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

int countSubArrayInversions(vector<int> &array, int start, int end);
int mergeSortAndCountInversions(vector<int> &array, int start, int middle,
                                int end);

// O(nlogn) time | O(n) space - where n is the length of the array
int countInversions(vector<int> array) {
  return countSubArrayInversions(array, 0, array.size());
}

int countSubArrayInversions(vector<int> &array, int start, int end) {
  if (end - start <= 1)
    return 0;

  int middle = start + ((end - start) / 2);
  int leftInversions = countSubArrayInversions(array, start, middle);
  int rightInversions = countSubArrayInversions(array, middle, end);
  int mergedArrayInversions =
      mergeSortAndCountInversions(array, start, middle, end);
  return leftInversions + rightInversions + mergedArrayInversions;
}

int mergeSortAndCountInversions(vector<int> &array, int start, int middle,
                                int end) {
  vector<int> sortedArray;
  int left = start;
  int right = middle;
  int inversions = 0;

  while (left < middle && right < end) {
    if (array[left] <= array[right]) {
      sortedArray.push_back(array[left]);
      left++;
    } else {
      inversions += middle - left;
      sortedArray.push_back(array[right]);
      right++;
    }
  }

  for (int idx = left; idx < middle; idx++) {
    sortedArray.push_back(array[idx]);
  }

  for (int idx = right; idx < end; idx++) {
    sortedArray.push_back(array[idx]);
  }

  for (int idx = 0; idx < sortedArray.size(); idx++) {
    int num = sortedArray[idx];
    array[start + idx] = num;
  }

  return inversions;
}
```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      auto input = {2, 3, 3, 1, 9, 5, 6};
      auto expected = 5;
      auto actual = countInversions(input);
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
		int[] input = new int[] { 2, 3, 3, 1, 9, 5, 6 };
		var expected = 5;
		var actual = new Program().CountInversions(input);
		Utils.AssertTrue(expected == actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {

	// O(nlogn) time | O(n) space - where n is the length of the array
	public int CountInversions(int[] array) {
		return countSubArrayInversions(array, 0, array.Length);
	}

	public int countSubArrayInversions(int[] array, int start, int end) {
		if (end - start <= 1) {
			return 0;
		}

		int middle = start + (end - start) / 2;
		int leftInversions = countSubArrayInversions(array, start, middle);
		int rightInversions = countSubArrayInversions(array, middle, end);
		int mergedArrayInversions = mergeSortAndCountInversions(array, start, middle, end);
		return leftInversions + rightInversions + mergedArrayInversions;
	}

	public int mergeSortAndCountInversions(int[] array, int start, int middle, int end) {
		List<int> sortedArray = new List<int>();
		int left = start;
		int right = middle;
		int inversions = 0;

		while (left < middle && right < end) {
			if (array[left] <= array[right]) {
				sortedArray.Add(array[left]);
				left += 1;
			} else {
				inversions += middle - left;
				sortedArray.Add(array[right]);
				right += 1;
			}
		}

		for (int idx = left; idx < middle; idx++) {
			sortedArray.Add(array[idx]);
		}

		for (int idx = right; idx < end; idx++) {
			sortedArray.Add(array[idx]);
		}

		for (int idx = 0; idx < sortedArray.Count; idx++) {
			int num = sortedArray[idx];
			array[start + idx] = num;
		}

		return inversions;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] input = new int[] { 2, 3, 3, 1, 9, 5, 6 };
		var expected = 5;
		var actual = new Program().CountInversions(input);
		Utils.AssertTrue(expected == actual);
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
	input := []int{2, 3, 3, 1, 9, 5, 6}
	expected := 5
	actual := CountInversions(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(nlogn) time | O(n) space - where n is the length of the array
func CountInversions(array []int) int {
	return countSubArrayInversions(array, 0, len(array))
}

func countSubArrayInversions(array []int, start, end int) int {
	if end-start <= 1 {
		return 0
	}

	middle := start + (end-start)/2
	leftInversions := countSubArrayInversions(array, start, middle)
	rightInversions := countSubArrayInversions(array, middle, end)
	mergedArrayInversions := mergeSortAndCountInversions(array, start, middle, end)
	return leftInversions + rightInversions + mergedArrayInversions
}

func mergeSortAndCountInversions(array []int, start, middle, end int) int {
	sortedArray := make([]int, 0)
	left := start
	right := middle
	inversions := 0

	for left < middle && right < end {
		if array[left] <= array[right] {
			sortedArray = append(sortedArray, array[left])
			left += 1
		} else {
			inversions += middle - left
			sortedArray = append(sortedArray, array[right])
			right += 1
		}
	}

	sortedArray = append(sortedArray, array[left:middle]...)
	sortedArray = append(sortedArray, array[right:end]...)
	for idx := range sortedArray {
		num := sortedArray[idx]
		array[start+idx] = num
	}

	return inversions
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []int{2, 3, 3, 1, 9, 5, 6}
	expected := 5
	actual := CountInversions(input)
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
    int[] input = new int[] {2, 3, 3, 1, 9, 5, 6};
    var expected = 5;
    var actual = new Program().countInversions(input);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(nlogn) time | O(n) space - where n is the length of the array
  public int countInversions(int[] array) {
    return countSubArrayInversions(array, 0, array.length);
  }

  public int countSubArrayInversions(int[] array, int start, int end) {
    if (end - start <= 1) {
      return 0;
    }

    int middle = start + (end - start) / 2;
    int leftInversions = countSubArrayInversions(array, start, middle);
    int rightInversions = countSubArrayInversions(array, middle, end);
    int mergedArrayInversions = mergeSortAndCountInversions(array, start, middle, end);
    return leftInversions + rightInversions + mergedArrayInversions;
  }

  public int mergeSortAndCountInversions(int[] array, int start, int middle, int end) {
    List<Integer> sortedArray = new ArrayList<Integer>();
    int left = start;
    int right = middle;
    int inversions = 0;

    while (left < middle && right < end) {
      if (array[left] <= array[right]) {
        sortedArray.add(array[left]);
        left += 1;
      } else {
        inversions += middle - left;
        sortedArray.add(array[right]);
        right += 1;
      }
    }

    for (int idx = left; idx < middle; idx++) {
      sortedArray.add(array[idx]);
    }

    for (int idx = right; idx < end; idx++) {
      sortedArray.add(array[idx]);
    }

    for (int idx = 0; idx < sortedArray.size(); idx++) {
      int num = sortedArray.get(idx);
      array[start + idx] = num;
    }

    return inversions;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[] input = new int[] {2, 3, 3, 1, 9, 5, 6};
    var expected = 5;
    var actual = new Program().countInversions(input);
    Utils.assertTrue(expected == actual);
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
  const input = [2, 3, 3, 1, 9, 5, 6];
  const expected = 5;
  const actual = program.countInversions(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlogn) time | O(n) space - where n is the length of the array
function countInversions(array) {
  return countSubArrayInversions(array, 0, array.length);
}

function countSubArrayInversions(array, start, end) {
  if (end - start <= 1) return 0;

  const middle = start + Math.floor((end - start) / 2);
  const leftInversions = countSubArrayInversions(array, start, middle);
  const rightInversions = countSubArrayInversions(array, middle, end);
  const mergedArrayInversions = mergeSortAndCountInversions(array, start, middle, end);
  return leftInversions + rightInversions + mergedArrayInversions;
}

function mergeSortAndCountInversions(array, start, middle, end) {
  const sortedArray = [];
  let left = start;
  let right = middle;
  let inversions = 0;

  while (left < middle && right < end) {
    if (array[left] <= array[right]) {
      sortedArray.push(array[left]);
      left++;
    } else {
      inversions += middle - left;
      sortedArray.push(array[right]);
      right++;
    }
  }

  sortedArray.push(...array.slice(left, middle), ...array.slice(right, end));
  for (let idx = 0; idx < sortedArray.length; idx++) {
    const num = sortedArray[idx];
    array[start + idx] = num;
  }

  return inversions;
}

// Do not edit the line below.
exports.countInversions = countInversions;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [2, 3, 3, 1, 9, 5, 6];
  const expected = 5;
  const actual = program.countInversions(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.countInversions

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(2, 3, 3, 1, 9, 5, 6)
        val expected = 5
        val output = countInversions(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(nlogn) time | O(n) space - where n is the length of the array
fun countInversions(array: MutableList<Int>): Int {
    return countSubArrayInversions(array, 0, array.size)
}

fun countSubArrayInversions(array: MutableList<Int>, start: Int, end: Int): Int {
    if (end - start <= 1) return 0

    val middle = start + (end - start) / 2
    val leftInversions = countSubArrayInversions(array, start, middle)
    val rightInversions = countSubArrayInversions(array, middle, end)
    val mergedArrayInversions = mergeSortAndCountInversions(array, start, middle, end)
    return leftInversions + rightInversions + mergedArrayInversions
}

fun mergeSortAndCountInversions(array: MutableList<Int>, start: Int, middle: Int, end: Int): Int {
    val sortedArray = mutableListOf<Int>()
    var left = start
    var right = middle
    var inversions = 0

    while (left < middle && right < end) {
        if (array[left] <= array[right]) {
            sortedArray.add(array[left])
            left += 1
        } else {
            inversions += middle - left
            sortedArray.add(array[right])
            right += 1
        }
    }

    sortedArray += array.subList(left, middle) + array.subList(right, end)
    for (idx in 0 until sortedArray.size) {
        val num = sortedArray[idx]
        array[start + idx] = num
    }

    return inversions
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.countInversions

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(2, 3, 3, 1, 9, 5, 6)
        val expected = 5
        val output = countInversions(input)
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
      var input = [2, 3, 3, 1, 9, 5, 6]
      var expected = 5
      var actual = Program().countInversions(&input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nlogn) time | O(n) space - where n is the length of the array
  func countInversions(_ array: inout [Int]) -> Int {
    return countSubArrayInversions(&array, 0, array.count)
  }

  func countSubArrayInversions(_ array: inout [Int], _ start: Int, _ end: Int) -> Int {
    if end - start <= 1 {
      return 0
    }

    let middle = start + (end - start) / 2
    let leftInversions = countSubArrayInversions(&array, start, middle)
    let rightInversions = countSubArrayInversions(&array, middle, end)
    let mergedArrayInversions = mergeSortAndCountInversions(&array, start, middle, end)
    return leftInversions + rightInversions + mergedArrayInversions
  }

  func mergeSortAndCountInversions(_ array: inout [Int], _ start: Int, _ middle: Int, _ end: Int) -> Int {
    var sortedArray = [Int]()
    var left = start
    var right = middle
    var inversions = 0

    while left < middle, right < end {
      if array[left] <= array[right] {
        sortedArray.append(array[left])
        left += 1
      } else {
        inversions += middle - left
        sortedArray.append(array[right])
        right += 1
      }
    }

    sortedArray += array[left ..< middle] + array[right ..< end]
    for idx in 0 ..< sortedArray.count {
      let num = sortedArray[idx]
      array[start + idx] = num
    }

    return inversions
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = [2, 3, 3, 1, 9, 5, 6]
      var expected = 5
      var actual = Program().countInversions(&input)
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
        input = [2, 3, 3, 1, 9, 5, 6]
        expected = 5
        actual = program.countInversions(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nlogn) time | O(n) space - where n is the length of the array
def countInversions(array):
    return countSubArrayInversions(array, 0, len(array))


def countSubArrayInversions(array, start, end):
    if end - start <= 1:
        return 0

    middle = start + (end - start) // 2
    leftInversions = countSubArrayInversions(array, start, middle)
    rightInversions = countSubArrayInversions(array, middle, end)
    mergedArrayInversions = mergeSortAndCountInversions(array, start, middle, end)
    return leftInversions + rightInversions + mergedArrayInversions


def mergeSortAndCountInversions(array, start, middle, end):
    sortedArray = []
    left = start
    right = middle
    inversions = 0

    while left < middle and right < end:
        if array[left] <= array[right]:
            sortedArray.append(array[left])
            left += 1
        else:
            inversions += middle - left
            sortedArray.append(array[right])
            right += 1

    sortedArray += array[left:middle] + array[right:end]
    for idx, num in enumerate(sortedArray):
        array[start + idx] = num

    return inversions

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [2, 3, 3, 1, 9, 5, 6]
        expected = 5
        actual = program.countInversions(input)
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
  const input = [2, 3, 3, 1, 9, 5, 6];
  const expected = 5;
  const actual = program.countInversions(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlogn) time | O(n) space - where n is the length of the array
export function countInversions(array: number[]) {
  return countSubArrayInversions(array, 0, array.length);
}

function countSubArrayInversions(array: number[], start: number, end: number): number {
  if (end - start <= 1) return 0;

  const middle = start + Math.floor((end - start) / 2);
  const leftInversions = countSubArrayInversions(array, start, middle);
  const rightInversions = countSubArrayInversions(array, middle, end);
  const mergedArrayInversions = mergeSortAndCountInversions(array, start, middle, end);
  return leftInversions + rightInversions + mergedArrayInversions;
}

function mergeSortAndCountInversions(array: number[], start: number, middle: number, end: number) {
  const sortedArray: number[] = [];
  let left = start;
  let right = middle;
  let inversions = 0;

  while (left < middle && right < end) {
    if (array[left] <= array[right]) {
      sortedArray.push(array[left]);
      left++;
    } else {
      inversions += middle - left;
      sortedArray.push(array[right]);
      right++;
    }
  }

  sortedArray.push(...array.slice(left, middle), ...array.slice(right, end));
  for (let idx = 0; idx < sortedArray.length; idx++) {
    const num = sortedArray[idx];
    array[start + idx] = num;
  }

  return inversions;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [2, 3, 3, 1, 9, 5, 6];
  const expected = 5;
  const actual = program.countInversions(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

