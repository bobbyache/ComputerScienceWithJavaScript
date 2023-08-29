# Heap Sort
<div class="html">
<p>
  Write a function that takes in an array of integers and returns a sorted
  version of that array. Use the Heap Sort algorithm to sort the array.
</p>
<p>
  If you're unfamiliar with Heap Sort, we recommend watching the Conceptual
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
Divide the input array into two subarrays in place. The second subarray should be sorted at all times and should start with a length of 0, while the first subarray should be transformed into a max (or min) heap and should satisfy the heap property at all times.
</p>


Hint 2

<p>
Note that the largest (or smallest) value of the heap should be at the very beginning of the newly-built heap. Start by swapping this value with the last value in the heap; the largest (or smallest) value in the array should now be in its correct position in the sorted subarray, which should now have a length of 1; the heap should now be one element smaller, with its first element out of place. Apply the "sift down" method of the heap to re-position this out-of-place value.
</p>


Hint 3

<p>
Repeat the step mentioned in Hint #2 until the heap is left with only one value, at which point the entire array should be sorted.
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
      assert(heapSort({8, 5, 2, 9, 5, 6, 3}) == expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

void buildMaxHeap(vector<int> &array);
void siftDown(int currentIdx, int endIdx, vector<int> &heap);

// Best: O(nlog(n)) time | O(1) space
// Average: O(nlog(n)) time | O(1) space
// Worst: O(nlog(n)) time | O(1) space
vector<int> heapSort(vector<int> array) {
  buildMaxHeap(array);
  for (int endIdx = array.size() - 1; endIdx > 0; endIdx--) {
    swap(array[0], array[endIdx]);
    siftDown(0, endIdx - 1, array);
  }
  return array;
}

void buildMaxHeap(vector<int> &array) {
  int firstParentIdx = (array.size() - 2) / 2;
  for (int currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
    siftDown(currentIdx, array.size() - 1, array);
  }
}

void siftDown(int currentIdx, int endIdx, vector<int> &heap) {
  int childOneIdx = currentIdx * 2 + 1;
  while (childOneIdx <= endIdx) {
    int childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
    int idxToSwap;
    if (childTwoIdx != -1 && heap.at(childTwoIdx) > heap.at(childOneIdx)) {
      idxToSwap = childTwoIdx;
    } else {
      idxToSwap = childOneIdx;
    }
    if (heap.at(idxToSwap) > heap.at(currentIdx)) {
      swap(heap[currentIdx], heap[idxToSwap]);
      currentIdx = idxToSwap;
      childOneIdx = currentIdx * 2 + 1;
    } else {
      return;
    }
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
      assert(heapSort({8, 5, 2, 9, 5, 6, 3}) == expected);
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
		Utils.AssertTrue(compare(Program.HeapSort(input), expected));
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
	// Best: O(nlog(n)) time | O(1) space
	// Average: O(nlog(n)) time | O(1) space
	// Worst: O(nlog(n)) time | O(1) space
	public static int[] HeapSort(int[] array) {
		buildMaxHeap(array);
		for (int endIdx = array.Length - 1; endIdx > 0; endIdx--) {
			swap(0, endIdx, array);
			siftDown(0, endIdx - 1, array);
		}
		return array;
	}

	public static void buildMaxHeap(int[] array) {
		int firstParentIdx = (array.Length - 2) / 2;
		for (int currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
			siftDown(currentIdx, array.Length - 1, array);
		}
	}

	public static void siftDown(int currentIdx, int endIdx, int[] heap) {
		int childOneIdx = currentIdx * 2 + 1;
		while (childOneIdx <= endIdx) {
			int childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
			int idxToSwap;
			if (childTwoIdx != -1 && heap[childTwoIdx] > heap[childOneIdx]) {
				idxToSwap = childTwoIdx;
			} else {
				idxToSwap = childOneIdx;
			}
			if (heap[idxToSwap] > heap[currentIdx]) {
				swap(currentIdx, idxToSwap, heap);
				currentIdx = idxToSwap;
				childOneIdx = currentIdx * 2 + 1;
			} else {
				return;
			}
		}
	}

	public static void swap(int i, int j, int[] array) {
		int temp = array[j];
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
		Utils.AssertTrue(compare(Program.HeapSort(input), expected));
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
	output := HeapSort([]int{8, 5, 2, 9, 5, 6, 3})
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// Best: O(nlog(n)) time | O(1) space
// Average: O(nlog(n)) time | O(1) space
// Worst: O(nlog(n)) time | O(1) space
func HeapSort(array []int) []int {
	buildMaxHeap(array)
	for endIndex := len(array) - 1; endIndex >= 1; endIndex-- {
		swap(0, endIndex, array)
		siftDown(0, endIndex-1, array)
	}
	return array
}

func buildMaxHeap(array []int) {
	first := (len(array) - 2) / 2
	for currentIndex := first + 1; currentIndex >= 0; currentIndex-- {
		siftDown(currentIndex, len(array)-1, array)
	}
}

func siftDown(currentIndex int, endIndex int, heap []int) {
	childOneIndex := currentIndex*2 + 1
	for childOneIndex <= endIndex {
		childTwoIndex := -1
		if currentIndex*2+2 <= endIndex {
			childTwoIndex = currentIndex*2 + 2
		}
		indexToSwap := childOneIndex
		if childTwoIndex > -1 && heap[childTwoIndex] > heap[childOneIndex] {
			indexToSwap = childTwoIndex
		}
		if heap[indexToSwap] > heap[currentIndex] {
			swap(currentIndex, indexToSwap, heap)
			currentIndex = indexToSwap
			childOneIndex = currentIndex*2 + 1
		} else {
			return
		}
	}
}

func swap(i, j int, array []int) {
	array[i], array[j] = array[j], array[i]
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
	output := HeapSort([]int{8, 5, 2, 9, 5, 6, 3})
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
    Utils.assertTrue(compare(Program.heapSort(input), expected));
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
  // Best: O(nlog(n)) time | O(1) space
  // Average: O(nlog(n)) time | O(1) space
  // Worst: O(nlog(n)) time | O(1) space
  public static int[] heapSort(int[] array) {
    buildMaxHeap(array);
    for (int endIdx = array.length - 1; endIdx > 0; endIdx--) {
      swap(0, endIdx, array);
      siftDown(0, endIdx - 1, array);
    }
    return array;
  }

  public static void buildMaxHeap(int[] array) {
    int firstParentIdx = (array.length - 2) / 2;
    for (int currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      siftDown(currentIdx, array.length - 1, array);
    }
  }

  public static void siftDown(int currentIdx, int endIdx, int[] heap) {
    int childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      int childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      int idxToSwap;
      if (childTwoIdx != -1 && heap[childTwoIdx] > heap[childOneIdx]) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }
      if (heap[idxToSwap] > heap[currentIdx]) {
        swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
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
    Utils.assertTrue(compare(Program.heapSort(input), expected));
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
  chai.expect(program.heapSort(input)).to.deep.equal([2, 3, 5, 5, 6, 8, 9]);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Best: O(nlog(n)) time | O(1) space
// Average: O(nlog(n)) time | O(1) space
// Worst: O(nlog(n)) time | O(1) space
function heapSort(array) {
  buildMaxHeap(array);
  for (let endIdx = array.length - 1; endIdx > 0; endIdx--) {
    swap(0, endIdx, array);
    siftDown(0, endIdx - 1, array);
  }
  return array;
}

function buildMaxHeap(array) {
  const firstParentIdx = Math.floor((array.length - 2) / 2);
  for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
    siftDown(currentIdx, array.length - 1, array);
  }
}

function siftDown(currentIdx, endIdx, heap) {
  let childOneIdx = currentIdx * 2 + 1;
  while (childOneIdx <= endIdx) {
    const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
    let idxToSwap;
    if (childTwoIdx !== -1 && heap[childTwoIdx] > heap[childOneIdx]) {
      idxToSwap = childTwoIdx;
    } else {
      idxToSwap = childOneIdx;
    }
    if (heap[idxToSwap] > heap[currentIdx]) {
      swap(currentIdx, idxToSwap, heap);
      currentIdx = idxToSwap;
      childOneIdx = currentIdx * 2 + 1;
    } else {
      return;
    }
  }
}

function swap(i, j, array) {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

exports.heapSort = heapSort;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [8, 5, 2, 9, 5, 6, 3];
  chai.expect(program.heapSort(input)).to.deep.equal([2, 3, 5, 5, 6, 8, 9]);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.heapSort as heapSort

class ProgramTest {
    @Test
    fun TestCase1() {
        val expected = mutableListOf(2, 3, 5, 5, 6, 8, 9)
        val input = mutableListOf(8, 5, 2, 9, 5, 6, 3)
        assert(heapSort(input) == expected)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// Best: O(nlog(n)) time | O(1) space
// Average: O(nlog(n)) time | O(1) space
// Worst: O(nlog(n)) time | O(1) space
fun heapSort(array: MutableList<Int>): List<Int> {
    buildMaxHeap(array)
    for (endIdx in array.size - 1 downTo 1) {
        swap(0, endIdx, array)
        siftDown(0, endIdx - 1, array)
    }
    return array
}

fun buildMaxHeap(array: MutableList<Int>) {
    val firstParentIdx = (array.size - 2) / 2
    for (currentIdx in firstParentIdx downTo 0) {
        siftDown(currentIdx, array.size - 1, array)
    }
}

fun siftDown(currentIdx: Int, endIdx: Int, heap: MutableList<Int>) {
    var newCurrentIdx = currentIdx
    var childOneIdx = currentIdx * 2 + 1
    while (childOneIdx <= endIdx) {
        val childTwoIdx = if (newCurrentIdx * 2 + 2 <= endIdx) newCurrentIdx * 2 + 2 else -1
        var idxToSwap: Int
        if (childTwoIdx != -1 && heap[childTwoIdx] > heap[childOneIdx]) {
            idxToSwap = childTwoIdx
        } else {
            idxToSwap = childOneIdx
        }
        if (heap[idxToSwap] > heap[newCurrentIdx]) {
            swap(newCurrentIdx, idxToSwap, heap)
            newCurrentIdx = idxToSwap
            childOneIdx = newCurrentIdx * 2 + 1
        } else {
            return
        }
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
import com.algoexpert.program.heapSort as heapSort

class ProgramTest {
    @Test
    fun TestCase1() {
        val expected = mutableListOf(2, 3, 5, 5, 6, 8, 9)
        val input = mutableListOf(8, 5, 2, 9, 5, 6, 3)
        assert(heapSort(input) == expected)
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
      try assertEqual([2, 3, 5, 5, 6, 8, 9], program.heapSort(arrayToSort))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // Best: O(nlog(n)) time : O(1) space
  // Average: O(nlog(n)) time : O(1) space
  // Worst: O(nlog(n)) time : O(1) space
  func heapSort(_ array: [Int]) -> [Int] {
    var mutableArray = array

    buildHeap(&mutableArray)

    for index in stride(from: array.count - 1, to: 0, by: -1) {
      swap(0, index, &mutableArray)

      var startIndex = 0
      var endIndex = index - 1

      siftDown(&startIndex, &endIndex, &mutableArray)
    }

    return mutableArray
  }

  func buildHeap(_ array: inout [Int]) {
    var firstParentIndex = Double((array.count - 2) / 2)
    firstParentIndex = firstParentIndex.rounded(.down)

    for var currentIndex in (0 ... Int(firstParentIndex)).reversed() {
      var endIndex = array.count - 1
      siftDown(&currentIndex, &endIndex, &array)
    }
  }

  func siftDown(_ currentIndex: inout Int, _ endIndex: inout Int, _ heap: inout [Int]) {
    var firstChildIndex = (currentIndex * 2) + 1

    while firstChildIndex <= endIndex {
      var secondChildIndex = -1

      let potentialSecondChildIndex = (currentIndex * 2) + 2

      if potentialSecondChildIndex <= endIndex {
        secondChildIndex = potentialSecondChildIndex
      }

      var indexToSwap = -1

      if secondChildIndex != -1, heap[secondChildIndex] > heap[firstChildIndex] {
        indexToSwap = secondChildIndex
      } else {
        indexToSwap = firstChildIndex
      }

      if heap[indexToSwap] > heap[currentIndex] {
        swap(currentIndex, indexToSwap, &heap)
        currentIndex = indexToSwap
        firstChildIndex = (currentIndex * 2) + 1
      } else {
        return
      }
    }
  }

  func swap(_ firstIndex: Int, _ secondIndex: Int, _ array: inout [Int]) {
    let temp = array[firstIndex]

    array[firstIndex] = array[secondIndex]
    array[secondIndex] = temp
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
      try assertEqual([2, 3, 5, 5, 6, 8, 9], program.heapSort(arrayToSort))
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
        self.assertEqual(program.heapSort([8, 5, 2, 9, 5, 6, 3]), [2, 3, 5, 5, 6, 8, 9])

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Best: O(nlog(n)) time | O(1) space
# Average: O(nlog(n)) time | O(1) space
# Worst: O(nlog(n)) time | O(1) space
def heapSort(array):
    buildMaxHeap(array)
    for endIdx in reversed(range(1, len(array))):
        swap(0, endIdx, array)
        siftDown(0, endIdx - 1, array)
    return array


def buildMaxHeap(array):
    firstParentIdx = (len(array) - 2) // 2
    for currentIdx in reversed(range(firstParentIdx + 1)):
        siftDown(currentIdx, len(array) - 1, array)


def siftDown(currentIdx, endIdx, heap):
    childOneIdx = currentIdx * 2 + 1
    while childOneIdx <= endIdx:
        childTwoIdx = currentIdx * 2 + 2 if currentIdx * 2 + 2 <= endIdx else -1
        if childTwoIdx > -1 and heap[childTwoIdx] > heap[childOneIdx]:
            idxToSwap = childTwoIdx
        else:
            idxToSwap = childOneIdx
        if heap[idxToSwap] > heap[currentIdx]:
            swap(currentIdx, idxToSwap, heap)
            currentIdx = idxToSwap
            childOneIdx = currentIdx * 2 + 1
        else:
            return


def swap(i, j, array):
    array[i], array[j] = array[j], array[i]

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.heapSort([8, 5, 2, 9, 5, 6, 3]), [2, 3, 5, 5, 6, 8, 9])

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
  chai.expect(program.heapSort(input)).to.deep.equal([2, 3, 5, 5, 6, 8, 9]);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Best: O(nlog(n)) time | O(1) space
// Average: O(nlog(n)) time | O(1) space
// Worst: O(nlog(n)) time | O(1) space
export function heapSort(array: number[]) {
  buildMaxHeap(array);
  for (let endIdx = array.length - 1; endIdx > 0; endIdx--) {
    swap(0, endIdx, array);
    siftDown(0, endIdx - 1, array);
  }
  return array;
}

function buildMaxHeap(array: number[]) {
  const firstParentIdx = Math.floor((array.length - 2) / 2);
  for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
    siftDown(currentIdx, array.length - 1, array);
  }
}

function siftDown(currentIdx: number, endIdx: number, heap: number[]) {
  let childOneIdx = currentIdx * 2 + 1;
  while (childOneIdx <= endIdx) {
    const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
    let idxToSwap;
    if (childTwoIdx !== -1 && heap[childTwoIdx] > heap[childOneIdx]) {
      idxToSwap = childTwoIdx;
    } else {
      idxToSwap = childOneIdx;
    }
    if (heap[idxToSwap] > heap[currentIdx]) {
      swap(currentIdx, idxToSwap, heap);
      currentIdx = idxToSwap;
      childOneIdx = currentIdx * 2 + 1;
    } else {
      return;
    }
  }
}

function swap(i: number, j: number, array: number[]) {
  const temp = array[j];
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
  chai.expect(program.heapSort(input)).to.deep.equal([2, 3, 5, 5, 6, 8, 9]);
});

```

