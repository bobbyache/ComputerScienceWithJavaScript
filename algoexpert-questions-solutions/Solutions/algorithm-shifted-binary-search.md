# Shifted Binary Search
<div class="html">
<p>
  Write a function that takes in a sorted array of distinct integers as well as a target
  integer. The caveat is that the integers in the array have been shifted by
  some amount; in other words, they've been moved to the left or to the right by
  one or more positions. For example, <span>[1, 2, 3, 4]</span> might have
  turned into <span>[3, 4, 1, 2]</span>.
</p>
<p>
  The function should use a variation of the Binary Search algorithm to
  determine if the target integer is contained in the array and should return
  its index if it is, otherwise <span>-1</span>.
</p>
<p>
  If you're unfamiliar with Binary Search, we recommend watching the Conceptual
  Overview section of the Binary Search question's video explanation before
  starting to code.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [45, 61, 71, 72, 73, 0, 1, 21, 33, 37]
<span class="CodeEditor-promptParameter">target</span> = 33
</pre>
<h3>Sample Output</h3>
<pre>8</pre>
</div>

Hint 1
<p>
The Binary Search algorithm involves a left pointer and a right pointer and using those pointers to find the middle number in an array. Unlike with a normal sorted array however, you cannot simply find the middle number of the array and compare it to the target here, because the shift could lead you in the wrong direction. Instead, realize that whenever you find the middle number in the array, the following two scenarios are possible (assuming the middle number is not equal to the target number, in which case you're done): either the left-pointer number is smaller than or equal to the middle number, or it is bigger. Figure out a way to eliminate half of the array depending on the scenario.
</p>


Hint 2

<p>
In the scenario where the left-pointer number is smaller than or equal to the middle number, two other scenarios can arise: either the target number is smaller than the middle number and greater than or equal to the left-pointer number, or it's not. In the first scenario, the right half of the array can be eliminated; in the second scenario, the left half can be eliminated. Figure out the scenarios that can arise if the left-pointer number is greater than the middle number and apply whatever logic you come up with recursively until you find the target number or until you run out of numbers in the array.
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
      assert(shiftedBinarySearch({45, 61, 71, 72, 73, 0, 1, 21, 33, 37}, 33) ==
             8);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

int shiftedBinarySearch(vector<int> array, int target);
int shiftedBinarySearchHelper(vector<int> array, int target, int left,
                              int right);

// O(log(n)) time | O(log(n)) space
int shiftedBinarySearch(vector<int> array, int target) {
  return shiftedBinarySearchHelper(array, target, 0, array.size() - 1);
}

int shiftedBinarySearchHelper(vector<int> array, int target, int left,
                              int right) {
  if (left > right) {
    return -1;
  }
  int middle = (left + right) / 2;
  int potentialMatch = array[middle];
  int leftNum = array[left];
  int rightNum = array[right];
  if (target == potentialMatch) {
    return middle;
  } else if (leftNum <= potentialMatch) {
    if (target < potentialMatch && target >= leftNum) {
      return shiftedBinarySearchHelper(array, target, left, middle - 1);
    } else {
      return shiftedBinarySearchHelper(array, target, middle + 1, right);
    }
  } else {
    if (target > potentialMatch && target <= rightNum) {
      return shiftedBinarySearchHelper(array, target, middle + 1, right);
    } else {
      return shiftedBinarySearchHelper(array, target, left, middle - 1);
    }
  }
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

int shiftedBinarySearch(vector<int> array, int target);
int shiftedBinarySearchHelper(vector<int> array, int target, int left,
                              int right);

// O(log(n)) time | O(1) space
int shiftedBinarySearch(vector<int> array, int target) {
  return shiftedBinarySearchHelper(array, target, 0, array.size() - 1);
}

int shiftedBinarySearchHelper(vector<int> array, int target, int left,
                              int right) {
  while (left <= right) {
    int middle = (left + right) / 2;
    int potentialMatch = array[middle];
    int leftNum = array[left];
    int rightNum = array[right];
    if (target == potentialMatch) {
      return middle;
    } else if (leftNum <= potentialMatch) {
      if (target < potentialMatch && target >= leftNum) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    } else {
      if (target > potentialMatch && target <= rightNum) {
        left = middle + 1;
      } else {
        right = middle - 1;
      }
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
      assert(shiftedBinarySearch({45, 61, 71, 72, 73, 0, 1, 21, 33, 37}, 33) ==
             8);
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
		Utils.AssertTrue(Program.ShiftedBinarySearch(new int[] {45, 61, 71, 72, 73, 0, 1,
		                                                        21, 33, 37}, 33) == 8);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(log(n)) time | O(log(n)) space
	public static int ShiftedBinarySearch(int[] array, int target) {
		return ShiftedBinarySearch(array, target, 0, array.Length - 1);
	}

	public static int ShiftedBinarySearch(int[] array, int target, int left, int right) {
		if (left > right) {
			return -1;
		}
		int middle = (left + right) / 2;
		int potentialMatch = array[middle];
		int leftNum = array[left];
		int rightNum = array[right];
		if (target == potentialMatch) {
			return middle;
		} else if (leftNum <= potentialMatch) {
			if (target < potentialMatch && target >= leftNum) {
				return ShiftedBinarySearch(array, target, left, middle - 1);
			} else {
				return ShiftedBinarySearch(array, target, middle + 1, right);
			}
		} else {
			if (target > potentialMatch && target <= rightNum) {
				return ShiftedBinarySearch(array, target, middle + 1, right);
			} else {
				return ShiftedBinarySearch(array, target, left, middle - 1);
			}
		}
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(log(n)) time | O(1) space
	public static int ShiftedBinarySearch(int[] array, int target) {
		return ShiftedBinarySearch(array, target, 0, array.Length - 1);
	}

	public static int ShiftedBinarySearch(int[] array, int target, int left, int right) {
		while (left <= right) {
			int middle = (left + right) / 2;
			int potentialMatch = array[middle];
			int leftNum = array[left];
			int rightNum = array[right];
			if (target == potentialMatch) {
				return middle;
			} else if (leftNum <= potentialMatch) {
				if (target < potentialMatch && target >= leftNum) {
					right = middle - 1;
				} else {
					left = middle + 1;
				}
			} else {
				if (target > potentialMatch && target <= rightNum) {
					left = middle + 1;
				} else {
					right = middle - 1;
				}
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
		Utils.AssertTrue(Program.ShiftedBinarySearch(new int[] {45, 61, 71, 72, 73, 0, 1,
		                                                        21, 33, 37}, 33) == 8);
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
	expected := 8
	output := ShiftedBinarySearch([]int{45, 61, 71, 72, 73, 0, 1, 21, 33, 37}, 33)
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(log(n)) time | O(log(n)) space
func ShiftedBinarySearch(array []int, target int) int {
	return helper(array, target, 0, len(array)-1)
}

func helper(array []int, target int, left int, right int) int {
	if left > right {
		return -1
	}
	middle := (left + right) / 2
	potentialMatch := array[middle]
	leftNum, rightNum := array[left], array[right]
	newleft, newright := middle+1, right
	if target == potentialMatch {
		return middle
	} else if leftNum <= potentialMatch {
		if target < potentialMatch && target >= leftNum {
			newleft, newright = left, middle-1
		}
	} else {
		if !(target > potentialMatch && target <= rightNum) {
			newleft, newright = left, middle-1
		}
	}
	return helper(array, target, newleft, newright)
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(log(n)) time | O(1) space
func ShiftedBinarySearch(array []int, target int) int {
	return helper(array, target, 0, len(array)-1)
}

func helper(array []int, target int, left int, right int) int {
	for left <= right {
		middle := (left + right) / 2
		potentialMatch := array[middle]
		leftnum, rightnum := array[left], array[right]
		if target == potentialMatch {
			return middle
		} else if leftnum <= potentialMatch {
			if target < potentialMatch && target >= leftnum {
				right = middle - 1
			} else {
				left = middle + 1
			}
		} else {
			if target > potentialMatch && target <= rightnum {
				left = middle + 1
			} else {
				right = middle - 1
			}
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
	expected := 8
	output := ShiftedBinarySearch([]int{45, 61, 71, 72, 73, 0, 1, 21, 33, 37}, 33)
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
        Program.shiftedBinarySearch(new int[] {45, 61, 71, 72, 73, 0, 1, 21, 33, 37}, 33) == 8);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(log(n)) time | O(log(n)) space
  public static int shiftedBinarySearch(int[] array, int target) {
    return shiftedBinarySearch(array, target, 0, array.length - 1);
  }

  public static int shiftedBinarySearch(int[] array, int target, int left, int right) {
    if (left > right) {
      return -1;
    }
    int middle = (left + right) / 2;
    int potentialMatch = array[middle];
    int leftNum = array[left];
    int rightNum = array[right];
    if (target == potentialMatch) {
      return middle;
    } else if (leftNum <= potentialMatch) {
      if (target < potentialMatch && target >= leftNum) {
        return shiftedBinarySearch(array, target, left, middle - 1);
      } else {
        return shiftedBinarySearch(array, target, middle + 1, right);
      }
    } else {
      if (target > potentialMatch && target <= rightNum) {
        return shiftedBinarySearch(array, target, middle + 1, right);
      } else {
        return shiftedBinarySearch(array, target, left, middle - 1);
      }
    }
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(log(n)) time | O(1) space
  public static int shiftedBinarySearch(int[] array, int target) {
    return shiftedBinarySearch(array, target, 0, array.length - 1);
  }

  public static int shiftedBinarySearch(int[] array, int target, int left, int right) {
    while (left <= right) {
      int middle = (left + right) / 2;
      int potentialMatch = array[middle];
      int leftNum = array[left];
      int rightNum = array[right];
      if (target == potentialMatch) {
        return middle;
      } else if (leftNum <= potentialMatch) {
        if (target < potentialMatch && target >= leftNum) {
          right = middle - 1;
        } else {
          left = middle + 1;
        }
      } else {
        if (target > potentialMatch && target <= rightNum) {
          left = middle + 1;
        } else {
          right = middle - 1;
        }
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
        Program.shiftedBinarySearch(new int[] {45, 61, 71, 72, 73, 0, 1, 21, 33, 37}, 33) == 8);
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
  chai.expect(program.shiftedBinarySearch([45, 61, 71, 72, 73, 0, 1, 21, 33, 37], 33)).to.deep.equal(8);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(log(n)) time | O(log(n)) space
function shiftedBinarySearch(array, target) {
  return shiftedBinarySearchHelper(array, target, 0, array.length - 1);
}

function shiftedBinarySearchHelper(array, target, left, right) {
  if (left > right) return -1;
  const middle = Math.floor((left + right) / 2);
  const potentialMatch = array[middle];
  const leftNum = array[left];
  const rightNum = array[right];
  if (target === potentialMatch) {
    return middle;
  } else if (leftNum <= potentialMatch) {
    if (target < potentialMatch && target >= leftNum) {
      return shiftedBinarySearchHelper(array, target, left, middle - 1);
    } else {
      return shiftedBinarySearchHelper(array, target, middle + 1, right);
    }
  } else {
    if (target > potentialMatch && target <= rightNum) {
      return shiftedBinarySearchHelper(array, target, middle + 1, right);
    } else {
      return shiftedBinarySearchHelper(array, target, left, middle - 1);
    }
  }
}

exports.shiftedBinarySearch = shiftedBinarySearch;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(log(n)) time | O(1) space
function shiftedBinarySearch(array, target) {
  return shiftedBinarySearchHelper(array, target, 0, array.length - 1);
}

function shiftedBinarySearchHelper(array, target, left, right) {
  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const potentialMatch = array[middle];
    const leftNum = array[left];
    const rightNum = array[right];
    if (target === potentialMatch) {
      return middle;
    } else if (leftNum <= potentialMatch) {
      if (target < potentialMatch && target >= leftNum) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    } else {
      if (target > potentialMatch && target <= rightNum) {
        left = middle + 1;
      } else {
        right = middle - 1;
      }
    }
  }
  return -1;
}

exports.shiftedBinarySearch = shiftedBinarySearch;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.shiftedBinarySearch([45, 61, 71, 72, 73, 0, 1, 21, 33, 37], 33)).to.deep.equal(8);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.shiftedBinarySearch

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(45, 61, 71, 72, 73, 0, 1, 21, 33, 37)
        assert(shiftedBinarySearch(input, 33) == 8)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(log(n)) time | O(log(n)) space
fun shiftedBinarySearch(array: List<Int>, target: Int): Int {
    return shiftedBinarySearch(array, target, 0, array.size - 1)
}

fun shiftedBinarySearch(array: List<Int>, target: Int, left: Int, right: Int): Int {
    if (left > right) {
        return -1
    }
    val middle = (left + right) / 2
    val potentialMatch = array[middle]
    val leftNum = array[left]
    val rightNum = array[right]
    if (target == potentialMatch) {
        return middle
    } else if (leftNum <= potentialMatch) {
        if (target < potentialMatch && target >= leftNum) {
            return shiftedBinarySearch(array, target, left, middle - 1)
        } else {
            return shiftedBinarySearch(array, target, middle + 1, right)
        }
    } else {
        if (target > potentialMatch && target <= rightNum) {
            return shiftedBinarySearch(array, target, middle + 1, right)
        } else {
            return shiftedBinarySearch(array, target, left, middle - 1)
        }
    }
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(log(n)) time | O(1) space
fun shiftedBinarySearch(array: List<Int>, target: Int): Int {
    return shiftedBinarySearch(array, target, 0, array.size - 1)
}

fun shiftedBinarySearch(array: List<Int>, target: Int, leftStart: Int, rightStart: Int): Int {
    var left = leftStart
    var right = rightStart
    while (left <= right) {
        val middle = (left + right) / 2
        val potentialMatch = array[middle]
        val leftNum = array[left]
        val rightNum = array[right]
        if (target == potentialMatch) {
            return middle
        } else if (leftNum <= potentialMatch) {
            if (target < potentialMatch && target >= leftNum) {
                right = middle - 1
            } else {
                left = middle + 1
            }
        } else {
            if (target > potentialMatch && target <= rightNum) {
                left = middle + 1
            } else {
                right = middle - 1
            }
        }
    }
    return -1
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.shiftedBinarySearch

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(45, 61, 71, 72, 73, 0, 1, 21, 33, 37)
        assert(shiftedBinarySearch(input, 33) == 8)
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
      try assertEqual(8, program.shiftedBinarySearch([45, 61, 71, 72, 73, 0, 1, 21, 33, 37], 33))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(log(n)) time | O(log(n)) space
  func shiftedBinarySearch(_ array: [Int], _ target: Int) -> Int {
    return shiftedBinarySearchHelper(array, target, 0, array.count - 1)
  }

  func shiftedBinarySearchHelper(_ array: [Int], _ target: Int, _ leftPointer: Int, _ rightPointer: Int) -> Int {
    if leftPointer > rightPointer {
      return -1
    }

    let middle = (leftPointer + rightPointer) / 2
    let potentialMatch = array[middle]
    let leftNumber = array[leftPointer]
    let rightNumber = array[rightPointer]

    if target == potentialMatch {
      return middle
    } else if leftNumber < potentialMatch {
      if target < potentialMatch, target >= leftNumber {
        return shiftedBinarySearchHelper(array, target, leftPointer, middle - 1)
      } else {
        return shiftedBinarySearchHelper(array, target, middle + 1, rightPointer)
      }
    } else {
      if target <= rightNumber, target > potentialMatch {
        return shiftedBinarySearchHelper(array, target, middle + 1, rightPointer)
      } else {
        return shiftedBinarySearchHelper(array, target, leftPointer, middle - 1)
      }
    }
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(log(n)) time | O(1) space
  func shiftedBinarySearch(_ array: [Int], _ target: Int) -> Int {
    var leftPointer = 0
    var rightPointer = array.count - 1

    return shiftedBinarySearchHelper(array, target, &leftPointer, &rightPointer)
  }

  func shiftedBinarySearchHelper(_ array: [Int], _ target: Int, _ leftPointer: inout Int, _ rightPointer: inout Int) -> Int {
    while leftPointer <= rightPointer {
      let middle = (leftPointer + rightPointer) / 2
      let potentialMatch = array[middle]
      let leftNumber = array[leftPointer]
      let rightNumber = array[rightPointer]

      if target == potentialMatch {
        return middle
      } else if leftNumber < potentialMatch {
        if target < potentialMatch, target >= leftNumber {
          rightPointer = middle - 1
        } else {
          leftPointer = middle + 1
        }
      } else {
        if target <= rightNumber, target > potentialMatch {
          leftPointer = middle + 1
        } else {
          rightPointer = middle - 1
        }
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
    runTest("Test Case 1") { () throws -> Void in
      try assertEqual(8, program.shiftedBinarySearch([45, 61, 71, 72, 73, 0, 1, 21, 33, 37], 33))
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
        self.assertEqual(program.shiftedBinarySearch([45, 61, 71, 72, 73, 0, 1, 21, 33, 37], 33), 8)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(log(n)) time | O(log(n)) space
def shiftedBinarySearch(array, target):
    return shiftedBinarySearchHelper(array, target, 0, len(array) - 1)


def shiftedBinarySearchHelper(array, target, left, right):
    if left > right:
        return -1
    middle = (left + right) // 2
    potentialMatch = array[middle]
    leftNum = array[left]
    rightNum = array[right]
    if target == potentialMatch:
        return middle
    elif leftNum <= potentialMatch:
        if target < potentialMatch and target >= leftNum:
            return shiftedBinarySearchHelper(array, target, left, middle - 1)
        else:
            return shiftedBinarySearchHelper(array, target, middle + 1, right)
    else:
        if target > potentialMatch and target <= rightNum:
            return shiftedBinarySearchHelper(array, target, middle + 1, right)
        else:
            return shiftedBinarySearchHelper(array, target, left, middle - 1)

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(log(n)) time | O(1) space
def shiftedBinarySearch(array, target):
    return shiftedBinarySearchHelper(array, target, 0, len(array) - 1)


def shiftedBinarySearchHelper(array, target, left, right):
    while left <= right:
        middle = (left + right) // 2
        potentialMatch = array[middle]
        leftNum = array[left]
        rightNum = array[right]
        if target == potentialMatch:
            return middle
        elif leftNum <= potentialMatch:
            if target < potentialMatch and target >= leftNum:
                right = middle - 1
            else:
                left = middle + 1
        else:
            if target > potentialMatch and target <= rightNum:
                left = middle + 1
            else:
                right = middle - 1
    return -1

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.shiftedBinarySearch([45, 61, 71, 72, 73, 0, 1, 21, 33, 37], 33), 8)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.shiftedBinarySearch([45, 61, 71, 72, 73, 0, 1, 21, 33, 37], 33)).to.deep.equal(8);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(log(n)) time | O(log(n)) space
export function shiftedBinarySearch(array: number[], target: number) {
  return shiftedBinarySearchHelper(array, target, 0, array.length - 1);
}

function shiftedBinarySearchHelper(array: number[], target: number, left: number, right: number): number {
  if (left > right) return -1;
  const middle = Math.floor((left + right) / 2);
  const potentialMatch = array[middle];
  const leftNum = array[left];
  const rightNum = array[right];
  if (target === potentialMatch) {
    return middle;
  } else if (leftNum <= potentialMatch) {
    if (target < potentialMatch && target >= leftNum) {
      return shiftedBinarySearchHelper(array, target, left, middle - 1);
    } else {
      return shiftedBinarySearchHelper(array, target, middle + 1, right);
    }
  } else {
    if (target > potentialMatch && target <= rightNum) {
      return shiftedBinarySearchHelper(array, target, middle + 1, right);
    } else {
      return shiftedBinarySearchHelper(array, target, left, middle - 1);
    }
  }
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(log(n)) time | O(1) space
export function shiftedBinarySearch(array: number[], target: number) {
  return shiftedBinarySearchHelper(array, target, 0, array.length - 1);
}

function shiftedBinarySearchHelper(array: number[], target: number, left: number, right: number) {
  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const potentialMatch = array[middle];
    const leftNum = array[left];
    const rightNum = array[right];
    if (target === potentialMatch) {
      return middle;
    } else if (leftNum <= potentialMatch) {
      if (target < potentialMatch && target >= leftNum) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    } else {
      if (target > potentialMatch && target <= rightNum) {
        left = middle + 1;
      } else {
        right = middle - 1;
      }
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
  chai.expect(program.shiftedBinarySearch([45, 61, 71, 72, 73, 0, 1, 21, 33, 37], 33)).to.deep.equal(8);
});

```

