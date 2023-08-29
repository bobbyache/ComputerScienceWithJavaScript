# Binary Search
<div class="html">
<p>
  Write a function that takes in a sorted array of integers as well as a target
  integer. The function should use the Binary Search algorithm to determine if
  the target integer is contained in the array and should return its index if it
  is, otherwise <span>-1</span>.
</p>
<p>
  If you're unfamiliar with Binary Search, we recommend watching the Conceptual
  Overview section of this question's video explanation before starting to code.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [0, 1, 21, 33, 45, 45, 61, 71, 72, 73]
<span class="CodeEditor-promptParameter">target</span> = 33
</pre>
<h3>Sample Output</h3>
<pre>
3
</pre>
</div>

Hint 1
<p>
The Binary Search algorithm works by finding the number in the middle of the input array and comparing it to the target number. Given that the array is sorted, if this middle number is smaller than the target number, then the entire left part of the array is no longer worth exploring since the target number can no longer be in it; similarly, if the middle number is greater than the target number, then the entire right part of the array is no longer worth exploring. Applying this logic recursively eliminates half of the array until the number is found or until the array runs out of numbers.
</p>


Hint 2

<p>
Write a helper function that takes in two additional arguments: a left pointer and a right pointer representing the indices at the extremities of the array (or subarray) that you are applying Binary Search on. The first time this helper function is called, the left pointer should be zero and the right pointer should be the final index of the input array. To find the index of the middle number mentioned in Hint #1, simply round down the number obtained from: (left + right) / 2. Apply this logic recursively until you find the target number or until the left pointer becomes greater than the right pointer.
</p>


Hint 3

<p>
Can you implement this algorithm iteratively? Are there any advantages to doing so?
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
      assert(binarySearch({0, 1, 21, 33, 45, 45, 61, 71, 72, 73}, 33) == 3);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

int binarySearch(vector<int> array, int target);
int binarySearchHelper(vector<int> array, int target, int left, int right);

// O(log(n)) time | O(log(n)) space
int binarySearch(vector<int> array, int target) {
  return binarySearchHelper(array, target, 0, array.size() - 1);
}

int binarySearchHelper(vector<int> array, int target, int left, int right) {
  if (left > right) {
    return -1;
  }
  int middle = (left + right) / 2;
  int potentialMatch = array[middle];
  if (target == potentialMatch) {
    return middle;
  } else if (target < potentialMatch) {
    return binarySearchHelper(array, target, left, middle - 1);
  } else {
    return binarySearchHelper(array, target, middle + 1, right);
  }
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

int binarySearch(vector<int> array, int target);
int binarySearchHelper(vector<int> array, int target, int left, int right);

// O(log(n)) time | O(1) space
int binarySearch(vector<int> array, int target) {
  return binarySearchHelper(array, target, 0, array.size() - 1);
}

int binarySearchHelper(vector<int> array, int target, int left, int right) {
  while (left <= right) {
    int middle = (left + right) / 2;
    int potentialMatch = array[middle];
    if (target == potentialMatch) {
      return middle;
    } else if (target < potentialMatch) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }
  return -1;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      assert(binarySearch({0, 1, 21, 33, 45, 45, 61, 71, 72, 73}, 33) == 3);
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
		Utils.AssertTrue(Program.BinarySearch(new int[] {0, 1, 21, 33, 45, 45, 61, 71, 72,
		                                                 73}, 33) == 3);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(log(n)) time | O(log(n)) space
	public static int BinarySearch(int[] array, int target) {
		return BinarySearch(array, target, 0, array.Length - 1);
	}

	public static int BinarySearch(int[] array, int target, int left, int right) {
		if (left > right) {
			return -1;
		}
		int middle = (left + right) / 2;
		int potentialMatch = array[middle];
		if (target == potentialMatch) {
			return middle;
		} else if (target < potentialMatch) {
			return BinarySearch(array, target, left, middle - 1);
		} else {
			return BinarySearch(array, target, middle + 1, right);
		}
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(log(n)) time | O(1) space
	public static int BinarySearch(int[] array, int target) {
		return BinarySearch(array, target, 0, array.Length - 1);
	}

	public static int BinarySearch(int[] array, int target, int left, int right) {
		while (left <= right) {
			int middle = (left + right) / 2;
			int potentialMatch = array[middle];
			if (target == potentialMatch) {
				return middle;
			} else if (target < potentialMatch) {
				right = middle - 1;
			} else {
				left = middle + 1;
			}
		}
		return -1;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		Utils.AssertTrue(Program.BinarySearch(new int[] {0, 1, 21, 33, 45, 45, 61, 71, 72,
		                                                 73}, 33) == 3);
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
	expected := 3
	output := BinarySearch([]int{0, 1, 21, 33, 45, 45, 61, 71, 72, 73}, 33)
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(log(n)) time | O(log(n)) space
func BinarySearch(array []int, target int) int {
	return helper(array, target, 0, len(array)-1)
}

func helper(array []int, target, left, right int) int {
	if left > right {
		return -1
	}
	middle := (left + right) / 2
	potentialMatch := array[middle]
	if target == potentialMatch {
		return middle
	} else if target < potentialMatch {
		return helper(array, target, left, middle-1)
	}
	return helper(array, target, middle+1, right)
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(log(n)) time | O(1) space
func BinarySearch(array []int, target int) int {
	return helper(array, target, 0, len(array)-1)
}

func helper(array []int, target, left, right int) int {
	for left <= right {
		middle := (left + right) / 2
		potentialMatch := array[middle]
		if target == potentialMatch {
			return middle
		} else if target < potentialMatch {
			right = middle - 1
		} else {
			left = middle + 1
		}
	}
	return -1
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := 3
	output := BinarySearch([]int{0, 1, 21, 33, 45, 45, 61, 71, 72, 73}, 33)
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
    Utils.assertTrue(
        Program.binarySearch(new int[] {0, 1, 21, 33, 45, 45, 61, 71, 72, 73}, 33) == 3);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(log(n)) time | O(log(n)) space
  public static int binarySearch(int[] array, int target) {
    return binarySearch(array, target, 0, array.length - 1);
  }

  public static int binarySearch(int[] array, int target, int left, int right) {
    if (left > right) {
      return -1;
    }
    int middle = (left + right) / 2;
    int potentialMatch = array[middle];
    if (target == potentialMatch) {
      return middle;
    } else if (target < potentialMatch) {
      return binarySearch(array, target, left, middle - 1);
    } else {
      return binarySearch(array, target, middle + 1, right);
    }
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(log(n)) time | O(1) space
  public static int binarySearch(int[] array, int target) {
    return binarySearch(array, target, 0, array.length - 1);
  }

  public static int binarySearch(int[] array, int target, int left, int right) {
    while (left <= right) {
      int middle = (left + right) / 2;
      int potentialMatch = array[middle];
      if (target == potentialMatch) {
        return middle;
      } else if (target < potentialMatch) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    }
    return -1;
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    Utils.assertTrue(
        Program.binarySearch(new int[] {0, 1, 21, 33, 45, 45, 61, 71, 72, 73}, 33) == 3);
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
  chai.expect(program.binarySearch([0, 1, 21, 33, 45, 45, 61, 71, 72, 73], 33)).to.deep.equal(3);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(log(n)) time | O(log(n)) space
function binarySearch(array, target) {
  return binarySearchHelper(array, target, 0, array.length - 1);
}

function binarySearchHelper(array, target, left, right) {
  if (left > right) return -1;
  const middle = Math.floor((left + right) / 2);
  const potentialMatch = array[middle];
  if (target === potentialMatch) {
    return middle;
  } else if (target < potentialMatch) {
    return binarySearchHelper(array, target, left, middle - 1);
  } else {
    return binarySearchHelper(array, target, middle + 1, right);
  }
}

exports.binarySearch = binarySearch;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(log(n)) time | O(1) space
function binarySearch(array, target) {
  return binarySearchHelper(array, target, 0, array.length - 1);
}

function binarySearchHelper(array, target, left, right) {
  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const potentialMatch = array[middle];
    if (target === potentialMatch) {
      return middle;
    } else if (target < potentialMatch) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }
  return -1;
}

exports.binarySearch = binarySearch;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.binarySearch([0, 1, 21, 33, 45, 45, 61, 71, 72, 73], 33)).to.deep.equal(3);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.binarySearch

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = listOf(0, 1, 21, 33, 45, 45, 61, 71, 72, 73)
        val target = 33
        val expected = 3
        val output = binarySearch(array, target)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(log(n)) time | O(log(n)) space
fun binarySearch(array: List<Int>, target: Int): Int {
    return binarySearch(array, target, 0, array.size - 1)
}

fun binarySearch(array: List<Int>, target: Int, left: Int, right: Int): Int {
    if (left > right) {
        return -1
    }
    val middle = (left + right) / 2
    val potentialMatch = array[middle]
    if (target == potentialMatch) {
        return middle
    } else if (target < potentialMatch) {
        return binarySearch(array, target, left, middle - 1)
    } else {
        return binarySearch(array, target, middle + 1, right)
    }
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(log(n)) time | O(1) space
fun binarySearch(array: List<Int>, target: Int): Int {
    return binarySearch(array, target, 0, array.size - 1)
}

fun binarySearch(array: List<Int>, target: Int, leftIdx: Int, rightIdx: Int): Int {
    var left = leftIdx
    var right = rightIdx
    while (left <= right) {
        val middle = (left + right) / 2
        val potentialMatch = array[middle]
        if (target == potentialMatch) {
            return middle
        } else if (target < potentialMatch) {
            right = middle - 1
        } else {
            left = middle + 1
        }
    }
    return -1
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.binarySearch

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = listOf(0, 1, 21, 33, 45, 45, 61, 71, 72, 73)
        val target = 33
        val expected = 3
        val output = binarySearch(array, target)
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
    let program = Program()
    runTest("Test Case 4") { () throws -> Void in
      try assertEqual(3, program.binarySearch(array: [0, 1, 21, 33, 45, 45, 61, 71, 72, 73], target: 33))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(Log(n)) time | O(Log(n)) space
  func binarySearch(array: [Int], target: Int) -> Int {
    return binarySearchHelper(array: array, target: target, leftPointer: 0, rightPointer: array.count - 1)
  }

  func binarySearchHelper(array: [Int], target: Int, leftPointer: Int, rightPointer: Int) -> Int {
    if leftPointer > rightPointer {
      return -1
    }
    let middle = (leftPointer + rightPointer) / 2
    let potentialMatch = array[middle]
    if target == potentialMatch {
      return middle
    } else if target < potentialMatch {
      return binarySearchHelper(array: array, target: target, leftPointer: leftPointer, rightPointer: middle - 1)
    } else {
      return binarySearchHelper(array: array, target: target, leftPointer: middle + 1, rightPointer: rightPointer)
    }
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(Log(n)) time | O(1) space
  func binarySearch(array: [Int], target: Int) -> Int {
    var leftPointer = 0
    var rightPointer = array.count - 1
    return binarySearchHelper(array: array, target: target, leftPointer: &leftPointer, rightPointer: &rightPointer)
  }

  func binarySearchHelper(array: [Int], target: Int, leftPointer: inout Int, rightPointer: inout Int) -> Int {
    while leftPointer <= rightPointer {
      let middle = (leftPointer + rightPointer) / 2
      let potentialMatch = array[middle]
      if target == potentialMatch {
        return middle
      } else if target < potentialMatch {
        rightPointer = middle - 1
      } else {
        leftPointer = middle + 1
      }
    }

    return -1
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 4") { () throws -> Void in
      try assertEqual(3, program.binarySearch(array: [0, 1, 21, 33, 45, 45, 61, 71, 72, 73], target: 33))
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
        self.assertEqual(program.binarySearch([0, 1, 21, 33, 45, 45, 61, 71, 72, 73], 33), 3)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(log(n)) time | O(log(n)) space
def binarySearch(array, target):
    return binarySearchHelper(array, target, 0, len(array) - 1)


def binarySearchHelper(array, target, left, right):
    if left > right:
        return -1
    middle = (left + right) // 2
    potentialMatch = array[middle]
    if target == potentialMatch:
        return middle
    elif target < potentialMatch:
        return binarySearchHelper(array, target, left, middle - 1)
    else:
        return binarySearchHelper(array, target, middle + 1, right)

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(log(n)) time | O(1) space
def binarySearch(array, target):
    return binarySearchHelper(array, target, 0, len(array) - 1)


def binarySearchHelper(array, target, left, right):
    while left <= right:
        middle = (left + right) // 2
        potentialMatch = array[middle]
        if target == potentialMatch:
            return middle
        elif target < potentialMatch:
            right = middle - 1
        else:
            left = middle + 1
    return -1

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.binarySearch([0, 1, 21, 33, 45, 45, 61, 71, 72, 73], 33), 3)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.binarySearch([0, 1, 21, 33, 45, 45, 61, 71, 72, 73], 33)).to.deep.equal(3);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(log(n)) time | O(log(n)) space
export function binarySearch(array: number[], target: number) {
  return binarySearchHelper(array, target, 0, array.length - 1);
}

function binarySearchHelper(array: number[], target: number, left: number, right: number): number {
  if (left > right) return -1;
  const middle = Math.floor((left + right) / 2);
  const potentialMatch = array[middle];
  if (target === potentialMatch) {
    return middle;
  } else if (target < potentialMatch) {
    return binarySearchHelper(array, target, left, middle - 1);
  } else {
    return binarySearchHelper(array, target, middle + 1, right);
  }
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(log(n)) time | O(1) space
export function binarySearch(array: number[], target: number) {
  return binarySearchHelper(array, target, 0, array.length - 1);
}

function binarySearchHelper(array: number[], target: number, left: number, right: number) {
  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const potentialMatch = array[middle];
    if (target === potentialMatch) {
      return middle;
    } else if (target < potentialMatch) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }
  return -1;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.binarySearch([0, 1, 21, 33, 45, 45, 61, 71, 72, 73], 33)).to.deep.equal(3);
});

```

