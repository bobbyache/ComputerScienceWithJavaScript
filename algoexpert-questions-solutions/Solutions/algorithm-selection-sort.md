# Selection Sort
<div class="html">
<p>
  Write a function that takes in an array of integers and returns a sorted
  version of that array. Use the Selection Sort algorithm to sort the array.
</p>
<p>
  If you're unfamiliar with Selection Sort, we recommend watching the Conceptual
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
Divide the input array into two subarrays in place. The first subarray should be sorted at all times and should start with a length of 0, while the second subarray should be unsorted. Find the smallest (or largest) element in the unsorted subarray and insert it into the sorted subarray with a swap. Repeat this process of finding the smallest (or largest) element in the unsorted subarray and inserting it in its correct position in the sorted subarray with a swap until the entire array is sorted.
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
      assert(selectionSort({8, 5, 2, 9, 5, 6, 3}) == expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

vector<int> selectionSort(vector<int> array);

// Best: O(n^2) time | O(1) space
// Average: O(n^2) time | O(1) space
// Worst: O(n^2) time | O(1) space
vector<int> selectionSort(vector<int> array) {
  if (array.empty()) {
    return {};
  }
  int startIdx = 0;
  while (startIdx < array.size() - 1) {
    int smallestIdx = startIdx;
    for (int i = startIdx + 1; i < array.size(); i++) {
      if (array[smallestIdx] > array[i]) {
        smallestIdx = i;
      }
    }
    swap(array[startIdx], array[smallestIdx]);
    startIdx++;
  }
  return array;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> expected = {2, 3, 5, 5, 6, 8, 9};
      assert(selectionSort({8, 5, 2, 9, 5, 6, 3}) == expected);
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
		Utils.AssertTrue(compare(Program.SelectionSort(input), expected));
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
	// Best: O(n^2) time | O(1) space
	// Average: O(n^2) time | O(1) space
	// Worst: O(n^2) time | O(1) space
	public static int[] SelectionSort(int[] array) {
		if (array.Length == 0) {
			return new int[] {};
		}
		int startIdx = 0;
		while (startIdx < array.Length - 1) {
			int smallestIdx = startIdx;
			for (int i = startIdx + 1; i < array.Length; i++) {
				if (array[smallestIdx] > array[i]) {
					smallestIdx = i;
				}
			}
			swap(startIdx, smallestIdx, array);
			startIdx++;
		}
		return array;
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
		Utils.AssertTrue(compare(Program.SelectionSort(input), expected));
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
	output := SelectionSort([]int{8, 5, 2, 9, 5, 6, 3})
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// Best: O(n^2) time | O(1) space
// Average: O(n^2) time | O(1) space
// Worst: O(n^2) time | O(1) space
func SelectionSort(array []int) []int {
	currentIndex := 0
	for currentIndex < len(array)-1 {
		smallestIndex := currentIndex
		for i := currentIndex + 1; i < len(array); i++ {
			if array[smallestIndex] > array[i] {
				smallestIndex = i
			}
		}
		array[currentIndex], array[smallestIndex] = array[smallestIndex], array[currentIndex]
		currentIndex += 1
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
	output := SelectionSort([]int{8, 5, 2, 9, 5, 6, 3})
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
    Utils.assertTrue(compare(Program.selectionSort(input), expected));
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
  // Best: O(n^2) time | O(1) space
  // Average: O(n^2) time | O(1) space
  // Worst: O(n^2) time | O(1) space
  public static int[] selectionSort(int[] array) {
    if (array.length == 0) {
      return new int[] {};
    }
    int startIdx = 0;
    while (startIdx < array.length - 1) {
      int smallestIdx = startIdx;
      for (int i = startIdx + 1; i < array.length; i++) {
        if (array[smallestIdx] > array[i]) {
          smallestIdx = i;
        }
      }
      swap(startIdx, smallestIdx, array);
      startIdx++;
    }
    return array;
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
    Utils.assertTrue(compare(Program.selectionSort(input), expected));
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
  chai.expect(program.selectionSort(input)).to.deep.equal([2, 3, 5, 5, 6, 8, 9]);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Best: O(n^2) time | O(1) space
// Average: O(n^2) time | O(1) space
// Worst: O(n^2) time | O(1) space
function selectionSort(array) {
  let startIdx = 0;
  while (startIdx < array.length - 1) {
    let smallestIdx = startIdx;
    for (let i = startIdx + 1; i < array.length; i++) {
      if (array[smallestIdx] > array[i]) smallestIdx = i;
    }
    swap(startIdx, smallestIdx, array);
    startIdx++;
  }
  return array;
}

function swap(i, j, array) {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

exports.selectionSort = selectionSort;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [8, 5, 2, 9, 5, 6, 3];
  chai.expect(program.selectionSort(input)).to.deep.equal([2, 3, 5, 5, 6, 8, 9]);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.selectionSort as selectionSort

class ProgramTest {
    @Test
    fun TestCase1() {
        val expected = mutableListOf(2, 3, 5, 5, 6, 8, 9)
        val input = mutableListOf(8, 5, 2, 9, 5, 6, 3)
        assert(selectionSort(input) == expected)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// Best: O(n^2) time | O(1) space
// Average: O(n^2) time | O(1) space
// Worst: O(n^2) time | O(1) space
fun selectionSort(array: MutableList<Int>): List<Int> {
    var startIdx = 0
    while (startIdx < array.size - 1) {
        var smallestIdx = startIdx
        for (i in startIdx + 1 until array.size) {
            if (array[smallestIdx] > array[i]) smallestIdx = i
        }
        swap(startIdx, smallestIdx, array)
        startIdx++
    }
    return array
}

fun swap(i: Int, j: Int, array: MutableList<Int>) {
    val temp = array[j]
    array[j] = array[i]
    array[i] = temp
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.selectionSort as selectionSort

class ProgramTest {
    @Test
    fun TestCase1() {
        val expected = mutableListOf(2, 3, 5, 5, 6, 8, 9)
        val input = mutableListOf(8, 5, 2, 9, 5, 6, 3)
        assert(selectionSort(input) == expected)
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
      try assertEqual([2, 3, 5, 5, 6, 8, 9], program.selectionSort(array: &arrayToSort))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // Best: O(n^2) time | O(1) space
  // Average: O(n^2) time | O(1) space
  // Worst: O(n^2) time | O(1) space
  func selectionSort(array: inout [Int]) -> [Int] {
    var currentIndex = 0

    while currentIndex < array.count - 1 {
      var indexOfSmallest = currentIndex

      for i in currentIndex + 1 ..< array.count {
        if array[indexOfSmallest] > array[i] {
          indexOfSmallest = i
        }
      }

      swapHelper(currentIndex, indexOfSmallest, &array)
      currentIndex = currentIndex + 1
    }

    return array
  }

  func swapHelper(_ firstIndex: Int, _ secondIndex: Int, _ array: inout [Int]) {
    let temp = array[secondIndex]

    array[secondIndex] = array[firstIndex]
    array[firstIndex] = temp
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
      try assertEqual([2, 3, 5, 5, 6, 8, 9], program.selectionSort(array: &arrayToSort))
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
        self.assertEqual(program.selectionSort([8, 5, 2, 9, 5, 6, 3]), [2, 3, 5, 5, 6, 8, 9])

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Best: O(n^2) time | O(1) space
# Average: O(n^2) time | O(1) space
# Worst: O(n^2) time | O(1) space
def selectionSort(array):
    currentIdx = 0
    while currentIdx < len(array) - 1:
        smallestIdx = currentIdx
        for i in range(currentIdx + 1, len(array)):
            if array[smallestIdx] > array[i]:
                smallestIdx = i
        swap(currentIdx, smallestIdx, array)
        currentIdx += 1
    return array


def swap(i, j, array):
    array[i], array[j] = array[j], array[i]

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.selectionSort([8, 5, 2, 9, 5, 6, 3]), [2, 3, 5, 5, 6, 8, 9])

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
  chai.expect(program.selectionSort(input)).to.deep.equal([2, 3, 5, 5, 6, 8, 9]);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Best: O(n^2) time | O(1) space
// Average: O(n^2) time | O(1) space
// Worst: O(n^2) time | O(1) space
export function selectionSort(array: number[]) {
  let startIdx = 0;
  while (startIdx < array.length - 1) {
    let smallestIdx = startIdx;
    for (let i = startIdx + 1; i < array.length; i++) {
      if (array[smallestIdx] > array[i]) smallestIdx = i;
    }
    swap(startIdx, smallestIdx, array);
    startIdx++;
  }
  return array;
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
  chai.expect(program.selectionSort(input)).to.deep.equal([2, 3, 5, 5, 6, 8, 9]);
});

```

