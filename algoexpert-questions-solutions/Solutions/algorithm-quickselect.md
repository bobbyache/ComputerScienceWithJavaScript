# Quickselect
<div class="html">
<p>
  Write a function that takes in an array of distinct integers as well as an
  integer <span>k</span> and that returns the kth smallest integer in that array.
</p>
<p>The function should do this in linear time, on average.</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [8, 5, 2, 9, 7, 6, 3]
<span class="CodeEditor-promptParameter">k</span> = 3
</pre>
<h3>Sample Output</h3>
<pre>
5
</pre>
</div>

Hint 1
<p>
The Quick Sort sorting algorithm works by picking a "pivot" number from an array, positioning every other number in the array in sorted order with respect to the pivot (all smaller numbers to the pivot's left; all bigger numbers to the pivot's right), and then repeating the same two steps on both sides of the pivot until the entire array is sorted. Apply the technique used in Quick Sort until the pivot element gets positioned in the kth place in the array, at which point you'll have found the answer to the problem.
</p>


Hint 2

<p>
Pick a random number from the input array (the first number, for instance) and let that number be the pivot. Iterate through the rest of the array using two pointers, one starting at the left extremity of the array and progressively moving to the right, and the other one starting at the right extremity of the array and progressively moving to the left. As you iterate through the array, compare the left and right pointer numbers to the pivot. If the left number is greater than the pivot and the right number is less than the pivot, swap them; this will effectively sort these numbers with respect to the pivot at the end of the iteration. If the left number is ever less than or equal to the pivot, increment the left pointer; similarly, if the right number is ever greater than or equal to the pivot, decrement the right pointer. Do this until the pointers pass each other, at which point swapping the pivot with the right number should position the pivot in its final, sorted position, where every number to its left is smaller and every number to its right is greater. If the pivot is in the kth position, you're done; if it isn't, figure out if the kth smallest number is located to the left or to the right of the pivot.
</p>


Hint 3

<p>
Repeat the process mentioned in Hint #2 on the side of the kth smallest number, and keep on repeating the process thereafter until you find the answer. What is the time complexity of this algorithm?
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
      assert(quickselect({8, 5, 2, 9, 7, 6, 3}, 3) == 5);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

int quickselectHelper(vector<int> array, int startIdx, int endIdx,
                      int position);

// Best: O(n) time | O(1) space
// Average: O(n) time | O(1) space
// Worst: O(n^2) time | O(1) space
int quickselect(vector<int> array, int k) {
  int position = k - 1;
  return quickselectHelper(array, 0, array.size() - 1, position);
}

int quickselectHelper(vector<int> array, int startIdx, int endIdx,
                      int position) {
  while (true) {
    if (startIdx > endIdx) {
      perror("Your Algorithm should never arrive here!");
      exit(1);
    }
    int pivotIdx = startIdx;
    int leftIdx = startIdx + 1;
    int rightIdx = endIdx;
    while (leftIdx <= rightIdx) {
      if (array[leftIdx] > array[pivotIdx] &&
          array[rightIdx] < array[pivotIdx]) {
        swap(array[leftIdx], array[rightIdx]);
      }
      if (array[leftIdx] <= array[pivotIdx]) {
        leftIdx++;
      }
      if (array[rightIdx] >= array[pivotIdx]) {
        rightIdx--;
      }
    }
    swap(array[pivotIdx], array[rightIdx]);
    if (rightIdx == position) {
      return array[rightIdx];
    } else if (rightIdx < position) {
      startIdx = rightIdx + 1;
    } else {
      endIdx = rightIdx - 1;
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
      assert(quickselect({8, 5, 2, 9, 7, 6, 3}, 3) == 5);
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
		Utils.AssertTrue(Program.Quickselect(new int[] {8, 5, 2, 9, 7, 6, 3}, 3) == 5);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// Best: O(n) time | O(1) space
	// Average: O(n) time | O(1) space
	// Worst: O(n^2) time | O(1) space
	public static int Quickselect(int[] array, int k) {
		int position = k - 1;
		return Quickselect(array, 0, array.Length - 1, position);
	}

	public static int Quickselect(int[] array, int startIdx, int endIdx, int position) {
		while (true) {
			if (startIdx > endIdx) {
				throw new Exception("Your Algorithm should never arrive here!");
			}
			int pivotIdx = startIdx;
			int leftIdx = startIdx + 1;
			int rightIdx = endIdx;
			while (leftIdx <= rightIdx) {
				if (array[leftIdx] > array[pivotIdx] &&
				  array[rightIdx] < array[pivotIdx]) {
					swap(leftIdx, rightIdx, array);
				}
				if (array[leftIdx] <= array[pivotIdx]) {
					leftIdx++;
				}
				if (array[rightIdx] >= array[pivotIdx]) {
					rightIdx--;
				}
			}
			swap(pivotIdx, rightIdx, array);
			if (rightIdx == position) {
				return array[rightIdx];
			} else if (rightIdx < position) {
				startIdx = rightIdx + 1;
			} else {
				endIdx = rightIdx - 1;
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
		Utils.AssertTrue(Program.Quickselect(new int[] {8, 5, 2, 9, 7, 6, 3}, 3) == 5);
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
	expected := 5
	output := Quickselect([]int{8, 5, 2, 9, 7, 6, 3}, 3)
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// Best: O(n) time | O(1) space
// Average: O(n) time | O(1) space
// Worst: O(n^2) time | O(1) space
func Quickselect(array []int, k int) int {
	return helper(array, 0, len(array)-1, k-1)
}

func helper(array []int, start, end int, position int) int {
	for {
		if start > end {
			panic("This should never happen!")
		}
		pivot, left, right := start, start+1, end
		for left <= right {
			if array[left] > array[right] && array[right] < array[pivot] {
				swap(left, right, array)
			}
			if array[left] <= array[pivot] {
				left += 1
			}
			if array[right] >= array[pivot] {
				right -= 1
			}
		}
		swap(pivot, right, array)
		if right == position {
			return array[right]
		} else if right < position {
			start = right + 1
		} else {
			end = right - 1
		}
	}
}

func swap(one, two int, array []int) {
	array[one], array[two] = array[two], array[one]
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := 5
	output := Quickselect([]int{8, 5, 2, 9, 7, 6, 3}, 3)
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
    Utils.assertTrue(Program.quickselect(new int[] {8, 5, 2, 9, 7, 6, 3}, 3) == 5);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // Best: O(n) time | O(1) space
  // Average: O(n) time | O(1) space
  // Worst: O(n^2) time | O(1) space
  public static int quickselect(int[] array, int k) {
    int position = k - 1;
    return quickselect(array, 0, array.length - 1, position);
  }

  public static int quickselect(int[] array, int startIdx, int endIdx, int position) {
    while (true) {
      if (startIdx > endIdx) {
        throw new RuntimeException("Your Algorithm should never arrive here!");
      }
      int pivotIdx = startIdx;
      int leftIdx = startIdx + 1;
      int rightIdx = endIdx;
      while (leftIdx <= rightIdx) {
        if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
          swap(leftIdx, rightIdx, array);
        }
        if (array[leftIdx] <= array[pivotIdx]) {
          leftIdx++;
        }
        if (array[rightIdx] >= array[pivotIdx]) {
          rightIdx--;
        }
      }
      swap(pivotIdx, rightIdx, array);
      if (rightIdx == position) {
        return array[rightIdx];
      } else if (rightIdx < position) {
        startIdx = rightIdx + 1;
      } else {
        endIdx = rightIdx - 1;
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
    Utils.assertTrue(Program.quickselect(new int[] {8, 5, 2, 9, 7, 6, 3}, 3) == 5);
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
  chai.expect(program.quickselect([8, 5, 2, 9, 7, 6, 3], 3)).to.deep.equal(5);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Best: O(n) time | O(1) space
// Average: O(n) time | O(1) space
// Worst: O(n^2) time | O(1) space
function quickselect(array, k) {
  const position = k - 1;
  return quickselectHelper(array, 0, array.length - 1, position);
}

function quickselectHelper(array, startIdx, endIdx, position) {
  while (true) {
    if (startIdx > endIdx) {
      throw new Error('Your algorithm should never arrive here!');
    }
    const pivotIdx = startIdx;
    let leftIdx = startIdx + 1;
    let rightIdx = endIdx;
    while (leftIdx <= rightIdx) {
      if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
        swap(leftIdx, rightIdx, array);
      }
      if (array[leftIdx] <= array[pivotIdx]) {
        leftIdx++;
      }
      if (array[rightIdx] >= array[pivotIdx]) {
        rightIdx--;
      }
    }
    swap(pivotIdx, rightIdx, array);
    if (rightIdx === position) {
      return array[rightIdx];
    } else if (rightIdx < position) {
      startIdx = rightIdx + 1;
    } else {
      endIdx = rightIdx - 1;
    }
  }
}

function swap(i, j, array) {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

exports.quickselect = quickselect;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.quickselect([8, 5, 2, 9, 7, 6, 3], 3)).to.deep.equal(5);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.quickselect as quickselect

class ProgramTest {
    @Test
    fun TestCase1() {
        assert(quickselect(mutableListOf(8, 5, 2, 9, 5, 6, 3), 3) == 5)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// Best: O(n) time | O(1) space
// Average: O(n) time | O(1) space
// Worst: O(n^2) time | O(1) space
fun quickselect(array: MutableList<Int>, k: Int): Int {
    val position = k - 1
    return quickselectHelper(array, 0, array.size - 1, position)
}

fun quickselectHelper(array: MutableList<Int>, startIdx: Int, endIdx: Int, position: Int): Int {
    var newStartIdx = startIdx
    var newEndIdx = endIdx
    while (true) {
        if (newStartIdx > newEndIdx) {
            throw Exception("Your algorithm should never arrive here!")
        }
        val pivotIdx = newStartIdx
        var leftIdx = newStartIdx + 1
        var rightIdx = newEndIdx
        while (leftIdx <= rightIdx) {
            if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
                swap(leftIdx, rightIdx, array)
            }
            if (array[leftIdx] <= array[pivotIdx]) {
                leftIdx++
            }
            if (array[rightIdx] >= array[pivotIdx]) {
                rightIdx--
            }
        }
        swap(pivotIdx, rightIdx, array)
        if (rightIdx === position) {
            return array[rightIdx]
        } else if (rightIdx < position) {
            newStartIdx = rightIdx + 1
        } else {
            newEndIdx = rightIdx - 1
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
import com.algoexpert.program.quickselect as quickselect

class ProgramTest {
    @Test
    fun TestCase1() {
        assert(quickselect(mutableListOf(8, 5, 2, 9, 5, 6, 3), 3) == 5)
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
      try assertEqual(5, program.quickSelect([8, 5, 2, 9, 7, 6, 3], 3))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // Best: O(n) time | O(1) space
  // Average: O(n) time | O(1) space
  // Worst: O(n^2) time | O(1) space
  func quickSelect(_ array: [Int], _ k: Int) -> Int? {
    let position = k - 1
    var startIndex = 0
    var endIndex = array.count - 1
    var variableArray = array

    return quickSelectHelper(&variableArray, &startIndex, &endIndex, position)
  }

  func quickSelectHelper(_ array: inout [Int], _ startIndex: inout Int, _ endIndex: inout Int, _ position: Int) -> Int {
    while true {
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

      if rightPointer == position {
        return array[rightPointer]
      } else if rightPointer < position {
        startIndex = rightPointer + 1
      } else {
        endIndex = rightPointer - 1
      }
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
      try assertEqual(5, program.quickSelect([8, 5, 2, 9, 7, 6, 3], 3))
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
        self.assertEqual(program.quickselect([8, 5, 2, 9, 7, 6, 3], 3), 5)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Best: O(n) time | O(1) space
# Average: O(n) time | O(1) space
# Worst: O(n^2) time | O(1) space
def quickselect(array, k):
    position = k - 1
    return quickselectHelper(array, 0, len(array) - 1, position)


def quickselectHelper(array, startIdx, endIdx, position):
    while True:
        if startIdx > endIdx:
            raise Exception("Your algorithm should never arrive here!")
        pivotIdx = startIdx
        leftIdx = startIdx + 1
        rightIdx = endIdx
        while leftIdx <= rightIdx:
            if array[leftIdx] > array[pivotIdx] and array[rightIdx] < array[pivotIdx]:
                swap(leftIdx, rightIdx, array)
            if array[leftIdx] <= array[pivotIdx]:
                leftIdx += 1
            if array[rightIdx] >= array[pivotIdx]:
                rightIdx -= 1
        swap(pivotIdx, rightIdx, array)
        if rightIdx == position:
            return array[rightIdx]
        elif rightIdx < position:
            startIdx = rightIdx + 1
        else:
            endIdx = rightIdx - 1


def swap(one, two, array):
    array[one], array[two] = array[two], array[one]

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.quickselect([8, 5, 2, 9, 7, 6, 3], 3), 5)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.quickselect([8, 5, 2, 9, 7, 6, 3], 3)).to.deep.equal(5);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Best: O(n) time | O(1) space
// Average: O(n) time | O(1) space
// Worst: O(n^2) time | O(1) space
export function quickselect(array: number[], k: number) {
  const position = k - 1;
  return quickselectHelper(array, 0, array.length - 1, position);
}

function quickselectHelper(array: number[], startIdx: number, endIdx: number, position: number) {
  while (true) {
    if (startIdx > endIdx) {
      throw new Error('Your algorithm should never arrive here!');
    }
    const pivotIdx = startIdx;
    let leftIdx = startIdx + 1;
    let rightIdx = endIdx;
    while (leftIdx <= rightIdx) {
      if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
        swap(leftIdx, rightIdx, array);
      }
      if (array[leftIdx] <= array[pivotIdx]) {
        leftIdx++;
      }
      if (array[rightIdx] >= array[pivotIdx]) {
        rightIdx--;
      }
    }
    swap(pivotIdx, rightIdx, array);
    if (rightIdx === position) {
      return array[rightIdx];
    } else if (rightIdx < position) {
      startIdx = rightIdx + 1;
    } else {
      endIdx = rightIdx - 1;
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
  chai.expect(program.quickselect([8, 5, 2, 9, 7, 6, 3], 3)).to.deep.equal(5);
});

```

