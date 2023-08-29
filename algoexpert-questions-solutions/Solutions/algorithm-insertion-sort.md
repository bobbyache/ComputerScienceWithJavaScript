# Insertion Sort
<div class="html">
<p>
  Write a function that takes in an array of integers and returns a sorted
  version of that array. Use the Insertion Sort algorithm to sort the array.
</p>
<p>
  If you're unfamiliar with Insertion Sort, we recommend watching the Conceptual
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
Divide the input array into two subarrays in place. The first subarray should be sorted at all times and should start with a length of 1, while the second subarray should be unsorted. Iterate through the unsorted subarray, inserting all of its elements into the sorted subarray in the correct position by swapping them into place. Eventually, the entire array will be sorted.
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
      assert(insertionSort({8, 5, 2, 9, 5, 6, 3}) == expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

vector<int> insertionSort(vector<int> array);

// Best: O(n) time | O(1) space
// Average: O(n^2) time | O(1) space
// Worst: O(n^2) time | O(1) space
vector<int> insertionSort(vector<int> array) {
  if (array.empty()) {
    return {};
  }
  for (int i = 1; i < array.size(); i++) {
    int j = i;
    while (j > 0 && array[j] < array[j - 1]) {
      swap(array[j], array[j - 1]);
      j -= 1;
    }
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
      assert(insertionSort({8, 5, 2, 9, 5, 6, 3}) == expected);
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
		Utils.AssertTrue(compare(Program.InsertionSort(input), expected));
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
	// Best: O(n) time | O(1) space
	// Average: O(n^2) time | O(1) space
	// Worst: O(n^2) time | O(1) space
	public static int[] InsertionSort(int[] array) {
		if (array.Length == 0) {
			return new int[] {};
		}
		for (int i = 1; i < array.Length; i++) {
			int j = i;
			while (j > 0 && array[j] < array[j - 1]) {
				swap(j, j - 1, array);
				j -= 1;
			}
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
		Utils.AssertTrue(compare(Program.InsertionSort(input), expected));
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
	output := InsertionSort([]int{8, 5, 2, 9, 5, 6, 3})
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// Best: O(n) time | O(1) space
// Average: O(n^2) time | O(1) space
// Worst: O(n^2) time | O(1) space
func InsertionSort(array []int) []int {
	for i := range array {
		for j := i; j > 0 && array[j] < array[j-1]; j-- {
			array[j], array[j-1] = array[j-1], array[j]
		}
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
	output := InsertionSort([]int{8, 5, 2, 9, 5, 6, 3})
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
    Utils.assertTrue(compare(Program.insertionSort(input), expected));
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
  // Best: O(n) time | O(1) space
  // Average: O(n^2) time | O(1) space
  // Worst: O(n^2) time | O(1) space
  public static int[] insertionSort(int[] array) {
    if (array.length == 0) {
      return new int[] {};
    }
    for (int i = 1; i < array.length; i++) {
      int j = i;
      while (j > 0 && array[j] < array[j - 1]) {
        swap(j, j - 1, array);
        j -= 1;
      }
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
    Utils.assertTrue(compare(Program.insertionSort(input), expected));
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
  chai.expect(program.insertionSort(input)).to.deep.equal([2, 3, 5, 5, 6, 8, 9]);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Best: O(n) time | O(1) space
// Average: O(n^2) time | O(1) space
// Worst: O(n^2) time | O(1) space
function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let j = i;
    while (j > 0 && array[j] < array[j - 1]) {
      swap(j, j - 1, array);
      j -= 1;
    }
  }
  return array;
}

function swap(i, j, array) {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

exports.insertionSort = insertionSort;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [8, 5, 2, 9, 5, 6, 3];
  chai.expect(program.insertionSort(input)).to.deep.equal([2, 3, 5, 5, 6, 8, 9]);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.insertionSort as insertionSort

class ProgramTest {
    @Test
    fun TestCase1() {
        val expected = mutableListOf(2, 3, 5, 5, 6, 8, 9)
        val input = mutableListOf(8, 5, 2, 9, 5, 6, 3)
        assert(insertionSort(input) == expected)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// Best: O(n) time | O(1) space
// Average: O(n^2) time | O(1) space
// Worst: O(n^2) time | O(1) space
fun insertionSort(array: MutableList<Int>): List<Int> {
    if (array.size == 0) return array
    for (i in 0 until array.size) {
        var j = i
        while (j > 0 && array[j] < array[j - 1]) {
            swap(j, j - 1, array)
            j--
        }
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
import com.algoexpert.program.insertionSort as insertionSort

class ProgramTest {
    @Test
    fun TestCase1() {
        val expected = mutableListOf(2, 3, 5, 5, 6, 8, 9)
        val input = mutableListOf(8, 5, 2, 9, 5, 6, 3)
        assert(insertionSort(input) == expected)
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
      try assertEqual([2, 3, 5, 5, 6, 8, 9], program.insertionSort(array: &arrayToSort))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // Best: O(n) time | O(1) space
  // Average: O(n^2) time | O(1) space
  // Worst: O(n^2) time | O(1) space
  func insertionSort(array: inout [Int]) -> [Int] {
    for i in 1 ..< array.count {
      var j = i

      while j > 0, array[j] < array[j - 1] {
        swapHelper(j, j - 1, &array)
        j = j - 1
      }
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
      try assertEqual([2, 3, 5, 5, 6, 8, 9], program.insertionSort(array: &arrayToSort))
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
        self.assertEqual(program.insertionSort([8, 5, 2, 9, 5, 6, 3]), [2, 3, 5, 5, 6, 8, 9])

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Best: O(n) time | O(1) space
# Average: O(n^2) time | O(1) space
# Worst: O(n^2) time | O(1) space
def insertionSort(array):
    for i in range(1, len(array)):
        j = i
        while j > 0 and array[j] < array[j - 1]:
            swap(j, j - 1, array)
            j -= 1
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
        self.assertEqual(program.insertionSort([8, 5, 2, 9, 5, 6, 3]), [2, 3, 5, 5, 6, 8, 9])

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
  chai.expect(program.insertionSort(input)).to.deep.equal([2, 3, 5, 5, 6, 8, 9]);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Best: O(n) time | O(1) space
// Average: O(n^2) time | O(1) space
// Worst: O(n^2) time | O(1) space
export function insertionSort(array: number[]) {
  for (let i = 1; i < array.length; i++) {
    let j = i;
    while (j > 0 && array[j] < array[j - 1]) {
      swap(j, j - 1, array);
      j -= 1;
    }
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
  chai.expect(program.insertionSort(input)).to.deep.equal([2, 3, 5, 5, 6, 8, 9]);
});

```

