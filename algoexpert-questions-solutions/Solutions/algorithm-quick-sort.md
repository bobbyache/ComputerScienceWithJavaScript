# Quick Sort
<div class="html">
<p>
  Write a function that takes in an array of integers and returns a sorted
  version of that array. Use the Quick Sort algorithm to sort the array.
</p>
<p>
  If you're unfamiliar with Quick Sort, we recommend watching the Conceptual
  Overview section of this question's video explanation before starting to code.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [8, 5, 2, 9, 5, 6, 3]
</pre>
<h3>Sample Output</h3>
<pre>
[2, 3, 5, 5, 6, 8, 9]
</pre>
</div>

Hint 1
<p>
Quick Sort works by picking a "pivot" number from an array, positioning every other number in the array in sorted order with respect to the pivot (all smaller numbers to the pivot's left; all bigger numbers to the pivot's right), and then repeating the same two steps on both sides of the pivot until the entire array is sorted.
</p>


Hint 2

<p>
Pick a random number from the input array (the first number, for instance) and let that number be the pivot. Iterate through the rest of the array using two pointers, one starting at the left extremity of the array and progressively moving to the right, and the other one starting at the right extremity of the array and progressively moving to the left. As you iterate through the array, compare the left and right pointer numbers to the pivot. If the left number is greater than the pivot and the right number is less than the pivot, swap them; this will effectively sort these numbers with respect to the pivot at the end of the iteration. If the left number is ever less than or equal to the pivot, increment the left pointer; similarly, if the right number is ever greater than or equal to the pivot, decrement the right pointer. Do this until the pointers pass each other, at which point swapping the pivot with the right number should position the pivot in its final, sorted position, where every number to its left is smaller and every number to its right is greater.
</p>


Hint 3

<p>
Repeat the process mentioned in Hint #2 on the respective subarrays located to the left and right of your pivot, and keep on repeating the process thereafter until the input array is fully sorted.
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
      vector<int> expected = {2, 3, 5, 5, 6, 8, 9};
      assert(quickSort({8, 5, 2, 9, 5, 6, 3}) == expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

void quickSortHelper(vector<int> &array, int startIdx, int endIdx);

// Best: O(nlog(n)) time | O(log(n)) space
// Average: O(nlog(n)) time | O(log(n)) space
// Worst: O(n^2) time | O(log(n)) space
vector<int> quickSort(vector<int> array) {
  quickSortHelper(array, 0, array.size() - 1);
  return array;
}

void quickSortHelper(vector<int> &array, int startIdx, int endIdx) {
  if (startIdx >= endIdx) {
    return;
  }
  int pivotIdx = startIdx;
  int leftIdx = startIdx + 1;
  int rightIdx = endIdx;
  while (rightIdx >= leftIdx) {
    if (array.at(leftIdx) > array.at(pivotIdx) &&
        array.at(rightIdx) < array.at(pivotIdx)) {
      swap(array[leftIdx], array[rightIdx]);
    }
    if (array.at(leftIdx) <= array.at(pivotIdx)) {
      leftIdx += 1;
    }
    if (array.at(rightIdx) >= array.at(pivotIdx)) {
      rightIdx -= 1;
    }
  }
  swap(array[pivotIdx], array[rightIdx]);
  bool leftSubarrayIsSmaller =
      rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);
  if (leftSubarrayIsSmaller) {
    quickSortHelper(array, startIdx, rightIdx - 1);
    quickSortHelper(array, rightIdx + 1, endIdx);
  } else {
    quickSortHelper(array, rightIdx + 1, endIdx);
    quickSortHelper(array, startIdx, rightIdx - 1);
  }
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> expected = {2, 3, 5, 5, 6, 8, 9};
      assert(quickSort({8, 5, 2, 9, 5, 6, 3}) == expected);
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
		int[] expected = {2, 3, 5, 5, 6, 8, 9};
		int[] input = {8, 5, 2, 9, 5, 6, 3};
		Utils.AssertTrue(compare(Program.QuickSort(input), expected));
	}

	public bool compare(int[] arr1, int[] arr2) {
		if (arr1.Length != arr2.Length) {
			return false;
		}
		for (int i = 0; i < arr1.Length; i++) {
			if (arr1[i] != arr2[i]) {
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

public class Program {
	// Best: O(nlog(n)) time | O(log(n)) space
	// Average: O(nlog(n)) time | O(log(n)) space
	// Worst: O(n^2) time | O(log(n)) space
	public static int[] QuickSort(int[] array) {
		QuickSort(array, 0, array.Length - 1);
		return array;
	}

	public static void QuickSort(int[] array, int startIdx, int endIdx) {
		if (startIdx >= endIdx) {
			return;
		}
		int pivotIdx = startIdx;
		int leftIdx = startIdx + 1;
		int rightIdx = endIdx;
		while (rightIdx >= leftIdx) {
			if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
				swap(leftIdx, rightIdx, array);
			}
			if (array[leftIdx] <= array[pivotIdx]) {
				leftIdx += 1;
			}
			if (array[rightIdx] >= array[pivotIdx]) {
				rightIdx -= 1;
			}
		}
		swap(pivotIdx, rightIdx, array);
		bool leftSubarrayIsSmaller = rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);
		if (leftSubarrayIsSmaller) {
			QuickSort(array, startIdx, rightIdx - 1);
			QuickSort(array, rightIdx + 1, endIdx);
		} else {
			QuickSort(array, rightIdx + 1, endIdx);
			QuickSort(array, startIdx, rightIdx - 1);
		}
	}

	public static void swap(int i, int j, int[] array) {
		int temp  = array[j];
		array[j] = array[i];
		array[i] = temp;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] expected = {2, 3, 5, 5, 6, 8, 9};
		int[] input = {8, 5, 2, 9, 5, 6, 3};
		Utils.AssertTrue(compare(Program.QuickSort(input), expected));
	}

	public bool compare(int[] arr1, int[] arr2) {
		if (arr1.Length != arr2.Length) {
			return false;
		}
		for (int i = 0; i < arr1.Length; i++) {
			if (arr1[i] != arr2[i]) {
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
	expected := []int{2, 3, 5, 5, 6, 8, 9}
	output := QuickSort([]int{8, 5, 2, 9, 5, 6, 3})
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

func QuickSort(array []int) []int {
	return helper(array, 0, len(array)-1)
}

func helper(array []int, start, end int) []int {
	if start >= end {
		return array
	}

	pivot := start
	left := start + 1
	right := end
	for right >= left {
		if array[left] > array[pivot] && array[right] < array[pivot] {
			array[left], array[right] = array[right], array[left]
		}
		if array[left] <= array[pivot] {
			left += 1
		}
		if array[right] >= array[pivot] {
			right -= 1
		}
	}

	array[pivot], array[right] = array[right], array[pivot]

	if right-1-start < end-(right+1) {
		helper(array, start, right-1)
		helper(array, right+1, end)
	} else {
		helper(array, right+1, end)
		helper(array, start, right-1)
	}
	return array
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := []int{2, 3, 5, 5, 6, 8, 9}
	output := QuickSort([]int{8, 5, 2, 9, 5, 6, 3})
	require.Equal(t, expected, output)
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
    int[] expected = {2, 3, 5, 5, 6, 8, 9};
    int[] input = {8, 5, 2, 9, 5, 6, 3};
    Utils.assertTrue(compare(Program.quickSort(input), expected));
  }

  public boolean compare(int[] arr1, int[] arr2) {
    if (arr1.length != arr2.length) {
      return false;
    }
    for (int i = 0; i < arr1.length; i++) {
      if (arr1[i] != arr2[i]) {
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

class Program {
  // Best: O(nlog(n)) time | O(log(n)) space
  // Average: O(nlog(n)) time | O(log(n)) space
  // Worst: O(n^2) time | O(log(n)) space
  public static int[] quickSort(int[] array) {
    quickSort(array, 0, array.length - 1);
    return array;
  }

  public static void quickSort(int[] array, int startIdx, int endIdx) {
    if (startIdx >= endIdx) {
      return;
    }
    int pivotIdx = startIdx;
    int leftIdx = startIdx + 1;
    int rightIdx = endIdx;
    while (rightIdx >= leftIdx) {
      if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
        swap(leftIdx, rightIdx, array);
      }
      if (array[leftIdx] <= array[pivotIdx]) {
        leftIdx += 1;
      }
      if (array[rightIdx] >= array[pivotIdx]) {
        rightIdx -= 1;
      }
    }
    swap(pivotIdx, rightIdx, array);
    boolean leftSubarrayIsSmaller = rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);
    if (leftSubarrayIsSmaller) {
      quickSort(array, startIdx, rightIdx - 1);
      quickSort(array, rightIdx + 1, endIdx);
    } else {
      quickSort(array, rightIdx + 1, endIdx);
      quickSort(array, startIdx, rightIdx - 1);
    }
  }

  public static void swap(int i, int j, int[] array) {
    int temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    int[] expected = {2, 3, 5, 5, 6, 8, 9};
    int[] input = {8, 5, 2, 9, 5, 6, 3};
    Utils.assertTrue(compare(Program.quickSort(input), expected));
  }

  public boolean compare(int[] arr1, int[] arr2) {
    if (arr1.length != arr2.length) {
      return false;
    }
    for (int i = 0; i < arr1.length; i++) {
      if (arr1[i] != arr2[i]) {
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
  const input = [8, 5, 2, 9, 5, 6, 3];
  chai.expect(program.quickSort(input)).to.deep.equal([2, 3, 5, 5, 6, 8, 9]);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Best: O(nlog(n)) time | O(log(n)) space
// Average: O(nlog(n)) time | O(log(n)) space
// Worst: O(n^2) time | O(log(n)) space
function quickSort(array) {
  quickSortHelper(array, 0, array.length - 1);
  return array;
}

function quickSortHelper(array, startIdx, endIdx) {
  if (startIdx >= endIdx) return;
  const pivotIdx = startIdx;
  let leftIdx = startIdx + 1;
  let rightIdx = endIdx;
  while (rightIdx >= leftIdx) {
    if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
      swap(leftIdx, rightIdx, array);
    }
    if (array[leftIdx] <= array[pivotIdx]) leftIdx++;
    if (array[rightIdx] >= array[pivotIdx]) rightIdx--;
  }
  swap(pivotIdx, rightIdx, array);
  const leftSubarrayIsSmaller = rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);
  if (leftSubarrayIsSmaller) {
    quickSortHelper(array, startIdx, rightIdx - 1);
    quickSortHelper(array, rightIdx + 1, endIdx);
  } else {
    quickSortHelper(array, rightIdx + 1, endIdx);
    quickSortHelper(array, startIdx, rightIdx - 1);
  }
}

function swap(i, j, array) {
  let temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

exports.quickSort = quickSort;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [8, 5, 2, 9, 5, 6, 3];
  chai.expect(program.quickSort(input)).to.deep.equal([2, 3, 5, 5, 6, 8, 9]);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.quickSort as quickSort

class ProgramTest {
    @Test
    fun TestCase1() {
        val expected = mutableListOf(2, 3, 5, 5, 6, 8, 9)
        val input = mutableListOf(8, 5, 2, 9, 5, 6, 3)
        assert(quickSort(input) == expected)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// Best: O(nlog(n)) time | O(log(n)) space
// Average: O(nlog(n)) time | O(log(n)) space
// Worst: O(n^2) time | O(log(n)) space
fun quickSort(array: MutableList<Int>): List<Int> {
    quickSortHelper(array, 0, array.size - 1)
    return array
}

fun quickSortHelper(array: MutableList<Int>, startIdx: Int, endIdx: Int) {
    if (startIdx >= endIdx) return
    val pivotIdx = startIdx
    var leftIdx = startIdx + 1
    var rightIdx = endIdx
    while (rightIdx >= leftIdx) {
        if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
            swap(leftIdx, rightIdx, array)
        }
        if (array[leftIdx] <= array[pivotIdx]) leftIdx++
        if (array[rightIdx] >= array[pivotIdx]) rightIdx--
    }
    swap(pivotIdx, rightIdx, array)
    val leftSubarrayIsSmaller = rightIdx - 1 - startIdx < endIdx - (rightIdx + 1)
    if (leftSubarrayIsSmaller) {
        quickSortHelper(array, startIdx, rightIdx - 1)
        quickSortHelper(array, rightIdx + 1, endIdx)
    } else {
        quickSortHelper(array, rightIdx + 1, endIdx)
        quickSortHelper(array, startIdx, rightIdx - 1)
    }
}

fun swap(i: Int, j: Int, array: MutableList<Int>) {
    val temp = array[j]
    array[j] = array[i]
    array[i] = temp
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.quickSort as quickSort

class ProgramTest {
    @Test
    fun TestCase1() {
        val expected = mutableListOf(2, 3, 5, 5, 6, 8, 9)
        val input = mutableListOf(8, 5, 2, 9, 5, 6, 3)
        assert(quickSort(input) == expected)
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
      var arrayToSort = [8, 5, 2, 9, 5, 6, 3]
      try assertEqual([2, 3, 5, 5, 6, 8, 9], program.quickSort(&arrayToSort))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // Best: O(nlog(n)) time | O(log(n)) space
  // Average: O(nlog(n)) time | O(log(n)) space
  // Worst: O(n^2) time | O(log(n)) space
  func quickSort(_ array: inout [Int]) -> [Int] {
    quickSortHelper(&array, 0, array.count - 1)
    return array
  }

  func quickSortHelper(_ array: inout [Int], _ startIndex: Int, _ endIndex: Int) {
    if startIndex >= endIndex {
      return
    }

    let pivotIndex = startIndex
    var leftPointer = startIndex + 1
    var rightPointer = endIndex

    while leftPointer <= rightPointer {
      if array[leftPointer] > array[pivotIndex], array[rightPointer] < array[pivotIndex] {
        swap(&array, leftPointer, rightPointer)
      }

      if array[leftPointer] <= array[pivotIndex] {
        leftPointer += 1
      }

      if array[rightPointer] >= array[pivotIndex] {
        rightPointer -= 1
      }
    }

    swap(&array, pivotIndex, rightPointer)

    let leftLength = rightPointer - 1 - startIndex
    let rightLength = endIndex - rightPointer + 1

    let leftSubArrayIsSmaller = leftLength < rightLength

    if leftSubArrayIsSmaller {
      quickSortHelper(&array, startIndex, rightPointer - 1)
      quickSortHelper(&array, rightPointer + 1, endIndex)
    } else {
      quickSortHelper(&array, rightPointer + 1, endIndex)
      quickSortHelper(&array, startIndex, rightPointer - 1)
    }
  }

  func swap(_ array: inout [Int], _ leftPointer: Int, _ rightPointer: Int) {
    let temp = array[leftPointer]

    array[leftPointer] = array[rightPointer]
    array[rightPointer] = temp
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      var arrayToSort = [8, 5, 2, 9, 5, 6, 3]
      try assertEqual([2, 3, 5, 5, 6, 8, 9], program.quickSort(&arrayToSort))
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
        self.assertEqual(program.quickSort([8, 5, 2, 9, 5, 6, 3]), [2, 3, 5, 5, 6, 8, 9])

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Best: O(nlog(n)) time | O(log(n)) space
# Average: O(nlog(n)) time | O(log(n)) space
# Worst: O(n^2) time | O(log(n)) space
def quickSort(array):
    quickSortHelper(array, 0, len(array) - 1)
    return array


def quickSortHelper(array, startIdx, endIdx):
    if startIdx >= endIdx:
        return
    pivotIdx = startIdx
    leftIdx = startIdx + 1
    rightIdx = endIdx
    while rightIdx >= leftIdx:
        if array[leftIdx] > array[pivotIdx] and array[rightIdx] < array[pivotIdx]:
            swap(leftIdx, rightIdx, array)
        if array[leftIdx] <= array[pivotIdx]:
            leftIdx += 1
        if array[rightIdx] >= array[pivotIdx]:
            rightIdx -= 1
    swap(pivotIdx, rightIdx, array)
    leftSubarrayIsSmaller = rightIdx - 1 - startIdx < endIdx - (rightIdx + 1)
    if leftSubarrayIsSmaller:
        quickSortHelper(array, startIdx, rightIdx - 1)
        quickSortHelper(array, rightIdx + 1, endIdx)
    else:
        quickSortHelper(array, rightIdx + 1, endIdx)
        quickSortHelper(array, startIdx, rightIdx - 1)


def swap(i, j, array):
    array[i], array[j] = array[j], array[i]

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.quickSort([8, 5, 2, 9, 5, 6, 3]), [2, 3, 5, 5, 6, 8, 9])

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [8, 5, 2, 9, 5, 6, 3];
  chai.expect(program.quickSort(input)).to.deep.equal([2, 3, 5, 5, 6, 8, 9]);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Best: O(nlog(n)) time | O(log(n)) space
// Average: O(nlog(n)) time | O(log(n)) space
// Worst: O(n^2) time | O(log(n)) space
export function quickSort(array: number[]) {
  quickSortHelper(array, 0, array.length - 1);
  return array;
}

function quickSortHelper(array: number[], startIdx: number, endIdx: number) {
  if (startIdx >= endIdx) return;
  const pivotIdx = startIdx;
  let leftIdx = startIdx + 1;
  let rightIdx = endIdx;
  while (rightIdx >= leftIdx) {
    if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
      swap(leftIdx, rightIdx, array);
    }
    if (array[leftIdx] <= array[pivotIdx]) leftIdx++;
    if (array[rightIdx] >= array[pivotIdx]) rightIdx--;
  }
  swap(pivotIdx, rightIdx, array);
  const leftSubarrayIsSmaller = rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);
  if (leftSubarrayIsSmaller) {
    quickSortHelper(array, startIdx, rightIdx - 1);
    quickSortHelper(array, rightIdx + 1, endIdx);
  } else {
    quickSortHelper(array, rightIdx + 1, endIdx);
    quickSortHelper(array, startIdx, rightIdx - 1);
  }
}

function swap(i: number, j: number, array: number[]) {
  let temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [8, 5, 2, 9, 5, 6, 3];
  chai.expect(program.quickSort(input)).to.deep.equal([2, 3, 5, 5, 6, 8, 9]);
});

```

