# Find Three Largest Numbers
<div class="html">
<p>
  Write a function that takes in an array of at least three integers and,
  without sorting the input array, returns a sorted array of the three largest
  integers in the input array.
</p>
<p>
  The function should return duplicate integers if necessary; for example, it
  should return <span>[10, 10, 12]</span> for an input array of
  <span>[10, 5, 9, 10, 12]</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7]
</pre>
<h3>Sample Output</h3>
<pre>
[18, 141, 541]
</pre>
</div>

Hint 1
<p>
Can you keep track of the three largest numbers in an array as you traverse the input array?
</p>


Hint 2

<p>
Following the suggestion in Hint #1, try traversing the input array and updating the three largest numbers if necessary by shifting them accordingly.
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
      vector<int> expected{18, 141, 541};
      assert(findThreeLargestNumbers(
                 {141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7}) == expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <climits>
using namespace std;

void updateLargest(vector<int> &threeLargest, int num);
void shiftAndUpdate(vector<int> &largest, int num, int idx);

// O(n) time | O(1) space
vector<int> findThreeLargestNumbers(vector<int> array) {
  vector<int> threeLargest{INT_MIN, INT_MIN, INT_MIN};
  for (int num : array) {
    updateLargest(threeLargest, num);
  }
  return threeLargest;
}

void updateLargest(vector<int> &threeLargest, int num) {
  if (num > threeLargest[2]) {
    shiftAndUpdate(threeLargest, num, 2);
  } else if (num > threeLargest[1]) {
    shiftAndUpdate(threeLargest, num, 1);
  } else if (num > threeLargest[0]) {
    shiftAndUpdate(threeLargest, num, 0);
  }
}

void shiftAndUpdate(vector<int> &array, int num, int idx) {
  for (int i = 0; i <= idx; i++) {
    if (i == idx) {
      array[i] = num;
    } else {
      array[i] = array[i + 1];
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
      vector<int> expected{18, 141, 541};
      assert(findThreeLargestNumbers(
                 {141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7}) == expected);
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
		int[] expected = {18, 141, 541};
		Utils.AssertTrue(compare(Program.FindThreeLargestNumbers(new int[] {141, 1, 17, -7,
		                                                                    -17, -27, 18,
		                                                                    541, 8, 7, 7}),
		  expected));
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

using System;

public class Program {
	// O(n) time | O(1) space
	public static int[] FindThreeLargestNumbers(int[] array) {
		int[] threeLargest = {Int32.MinValue, Int32.MinValue, Int32.MinValue};
		foreach (int num in array) {
			updateLargest(threeLargest, num);
		}
		return threeLargest;
	}

	public static void updateLargest(int[] threeLargest, int num) {
		if (num > threeLargest[2]) {
			shiftAndUpdate(threeLargest, num, 2);
		} else if (num > threeLargest[1]) {
			shiftAndUpdate(threeLargest, num, 1);
		} else if (num > threeLargest[0]) {
			shiftAndUpdate(threeLargest, num, 0);
		}
	}

	public static void shiftAndUpdate(int[] array, int num, int idx) {
		for (int i = 0; i <= idx; i++) {
			if (i == idx) {
				array[i] = num;
			} else {
				array[i] = array[i + 1];
			}
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] expected = {18, 141, 541};
		Utils.AssertTrue(compare(Program.FindThreeLargestNumbers(new int[] {141, 1, 17, -7,
		                                                                    -17, -27, 18,
		                                                                    541, 8, 7, 7}),
		  expected));
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
	expected := []int{18, 141, 541}
	output := FindThreeLargestNumbers([]int{141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7})
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "math"

// O(n) time | O(1) space
func FindThreeLargestNumbers(array []int) []int {
	three := []int{math.MinInt32, math.MinInt32, math.MinInt32}
	for _, num := range array {
		updateLargest(three, num)
	}
	return three
}

func updateLargest(three []int, num int) {
	if num > three[2] {
		shiftAndUpdate(three, num, 2)
	} else if num > three[1] {
		shiftAndUpdate(three, num, 1)
	} else if num > three[0] {
		shiftAndUpdate(three, num, 0)
	}
}

func shiftAndUpdate(array []int, num int, idx int) {
	for i := 0; i < idx+1; i++ {
		if i == idx {
			array[i] = num
		} else {
			array[i] = array[i+1]
		}
	}
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := []int{18, 141, 541}
	output := FindThreeLargestNumbers([]int{141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7})
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
    int[] expected = {18, 141, 541};
    Utils.assertTrue(
        compare(
            Program.findThreeLargestNumbers(new int[] {141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7}),
            expected));
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
  // O(n) time | O(1) space
  public static int[] findThreeLargestNumbers(int[] array) {
    int[] threeLargest = {Integer.MIN_VALUE, Integer.MIN_VALUE, Integer.MIN_VALUE};
    for (int num : array) {
      updateLargest(threeLargest, num);
    }
    return threeLargest;
  }

  public static void updateLargest(int[] threeLargest, int num) {
    if (num > threeLargest[2]) {
      shiftAndUpdate(threeLargest, num, 2);
    } else if (num > threeLargest[1]) {
      shiftAndUpdate(threeLargest, num, 1);
    } else if (num > threeLargest[0]) {
      shiftAndUpdate(threeLargest, num, 0);
    }
  }

  public static void shiftAndUpdate(int[] array, int num, int idx) {
    for (int i = 0; i <= idx; i++) {
      if (i == idx) {
        array[i] = num;
      } else {
        array[i] = array[i + 1];
      }
    }
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    int[] expected = {18, 141, 541};
    Utils.assertTrue(
        compare(
            Program.findThreeLargestNumbers(new int[] {141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7}),
            expected));
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
  chai
    .expect(program.findThreeLargestNumbers([141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7]))
    .to.deep.equal([18, 141, 541]);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space
function findThreeLargestNumbers(array) {
  const threeLargest = [null, null, null];
  for (const num of array) {
    updateLargest(threeLargest, num);
  }
  return threeLargest;
}

function updateLargest(threeLargest, num) {
  if (threeLargest[2] === null || num > threeLargest[2]) {
    shiftAndUpdate(threeLargest, num, 2);
  } else if (threeLargest[1] === null || num > threeLargest[1]) {
    shiftAndUpdate(threeLargest, num, 1);
  } else if (threeLargest[0] === null || num > threeLargest[0]) {
    shiftAndUpdate(threeLargest, num, 0);
  }
}

function shiftAndUpdate(array, num, idx) {
  for (let i = 0; i <= idx; i++) {
    if (i === idx) {
      array[i] = num;
    } else {
      array[i] = array[i + 1];
    }
  }
}

exports.findThreeLargestNumbers = findThreeLargestNumbers;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai
    .expect(program.findThreeLargestNumbers([141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7]))
    .to.deep.equal([18, 141, 541]);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.findThreeLargestNumbers

class ProgramTest {
    @Test
    fun TestCase1() {
        val expected = listOf(18, 141, 541)
        val input = listOf(141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7)
        val output = findThreeLargestNumbers(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(1) space
fun findThreeLargestNumbers(array: List<Int>): List<Int> {
    val threeLargest = mutableListOf(Int.MIN_VALUE, Int.MIN_VALUE, Int.MIN_VALUE)
    for (num in array) {
        updateLargest(threeLargest, num)
    }
    return threeLargest
}

fun updateLargest(threeLargest: MutableList<Int>, num: Int) {
    if (num > threeLargest[2]) {
        shiftAndUpdate(threeLargest, num, 2)
    } else if (num > threeLargest[1]) {
        shiftAndUpdate(threeLargest, num, 1)
    } else if (num > threeLargest[0]) {
        shiftAndUpdate(threeLargest, num, 0)
    }
}

fun shiftAndUpdate(array: MutableList<Int>, num: Int, idx: Int) {
    for (i in 0 until idx + 1) {
        if (i == idx) {
            array[i] = num
        } else {
            array[i] = array[i + 1]
        }
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.findThreeLargestNumbers

class ProgramTest {
    @Test
    fun TestCase1() {
        val expected = listOf(18, 141, 541)
        val input = listOf(141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7)
        val output = findThreeLargestNumbers(input)
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
    runTest("Test Case 1") { () throws -> Void in
      try assertEqual([18, 141, 541], program.findThreeLargestNumbers(array: [141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7]))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space
  func findThreeLargestNumbers(array: [Int]) -> [Int] {
    var threeLargest: [Int?] = [nil, nil, nil]

    for number in array {
      updateLargest(&threeLargest, number)
    }

    let threeLargestWithoutOptionals = threeLargest.compactMap { $0 }
    return threeLargestWithoutOptionals
  }

  func updateLargest(_ threeLargest: inout [Int?], _ number: Int) {
    if threeLargest[2] == nil {
      shiftAndupdate(&threeLargest, number, 2)
    } else if threeLargest[1] == nil {
      shiftAndupdate(&threeLargest, number, 1)
    } else if threeLargest[0] == nil {
      shiftAndupdate(&threeLargest, number, 0)
    }

    if let thirdNumber = threeLargest[2], number > thirdNumber {
      shiftAndupdate(&threeLargest, number, 2)
    } else if let secondNumber = threeLargest[1], number > secondNumber {
      shiftAndupdate(&threeLargest, number, 1)
    } else if let firstNumber = threeLargest[0], number > firstNumber {
      shiftAndupdate(&threeLargest, number, 0)
    }
  }

  func shiftAndupdate(_ threeLargest: inout [Int?], _ number: Int, _ index: Int) {
    for i in 0 ... index {
      if i == index {
        threeLargest[i] = number
      } else {
        threeLargest[i] = threeLargest[i + 1]
      }
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
      try assertEqual([18, 141, 541], program.findThreeLargestNumbers(array: [141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7]))
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
        self.assertEqual(program.findThreeLargestNumbers([141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7]), [18, 141, 541])

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space
def findThreeLargestNumbers(array):
    threeLargest = [None, None, None]
    for num in array:
        updateLargest(threeLargest, num)
    return threeLargest


def updateLargest(threeLargest, num):
    if threeLargest[2] is None or num > threeLargest[2]:
        shiftAndUpdate(threeLargest, num, 2)
    elif threeLargest[1] is None or num > threeLargest[1]:
        shiftAndUpdate(threeLargest, num, 1)
    elif threeLargest[0] is None or num > threeLargest[0]:
        shiftAndUpdate(threeLargest, num, 0)


def shiftAndUpdate(array, num, idx):
    for i in range(idx + 1):
        if i == idx:
            array[i] = num
        else:
            array[i] = array[i + 1]

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.findThreeLargestNumbers([141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7]), [18, 141, 541])

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai
    .expect(program.findThreeLargestNumbers([141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7]))
    .to.deep.equal([18, 141, 541]);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space
export function findThreeLargestNumbers(array: number[]) {
  const threeLargest: Array<number | null> = [null, null, null];
  for (const num of array) {
    updateLargest(threeLargest, num);
  }
  return threeLargest;
}

function updateLargest(threeLargest: Array<number | null>, num: number) {
  if (threeLargest[2] === null || num > threeLargest[2]) {
    shiftAndUpdate(threeLargest, num, 2);
  } else if (threeLargest[1] === null || num > threeLargest[1]) {
    shiftAndUpdate(threeLargest, num, 1);
  } else if (threeLargest[0] === null || num > threeLargest[0]) {
    shiftAndUpdate(threeLargest, num, 0);
  }
}

function shiftAndUpdate(array: Array<number | null>, num: number, idx: number) {
  for (let i = 0; i <= idx; i++) {
    if (i === idx) {
      array[i] = num;
    } else {
      array[i] = array[i + 1];
    }
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai
    .expect(program.findThreeLargestNumbers([141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7]))
    .to.deep.equal([18, 141, 541]);
});

```

