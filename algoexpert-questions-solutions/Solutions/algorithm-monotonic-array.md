# Monotonic Array
<div class="html">
<p>
  Write a function that takes in an array of integers and returns a boolean
  representing whether the array is monotonic.
</p>
<p>
  An array is said to be monotonic if its elements, from left to right, are
  entirely non-increasing or entirely non-decreasing.
</p>
<p>
  Non-increasing elements aren't necessarily exclusively decreasing; they simply
  don't increase. Similarly, non-decreasing elements aren't necessarily
  exclusively increasing; they simply don't decrease.
</p>
<p>Note that empty arrays and arrays of one element are monotonic.</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [-1, -5, -10, -1100, -1100, -1101, -1102, -9001]
</pre>
<h3>Sample Output</h3>
<pre>
true
</pre>
</div>

Hint 1
<p>
You can solve this question by iterating through the input array from left to right once.
</p>


Hint 2

<p>
Try iterating through the input array from left to right, in search of two adjacent integers that can indicate whether the array is trending upward or downward. Once you've found the tentative trend of the array, at each element thereafter, compare the element to the previous one; if this comparison breaks the previously identified trend, the array isn't monotonic.
</p>


Hint 3

<p>
Alternatively, you can start by assuming that the array is both entirely non-decreasing and entirely non-increasing. As you iterate through each element, perform a check to see if you can invalidate one or both of your assumptions.
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
      vector<int> input = {-1, -5, -10, -1100, -1100, -1101, -1102, -9001};
      bool expected = true;
      bool actual = isMonotonic(input);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

bool breaksDirection(int direction, int previousInt, int currentInt) {
  int difference = currentInt - previousInt;
  if (direction > 0)
    return difference < 0;
  return difference > 0;
}

// O(n) time | O(1) space - where n is the length of the array
bool isMonotonic(vector<int> array) {
  if (array.size() <= 2)
    return true;

  int direction = array[1] - array[0];
  for (int i = 2; i < array.size(); i++) {
    if (direction == 0) {
      direction = array[i] - array[i - 1];
      continue;
    }

    if (breaksDirection(direction, array[i - 1], array[i]))
      return false;
  }

  return true;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// O(n) time | O(1) space - where n is the length of the array
bool isMonotonic(vector<int> array) {
  bool is_non_decreasing = true;
  bool is_non_increasing = true;
  for (int i = 1; i < array.size(); i++) {
    if (array[i] < array[i - 1]) {
      is_non_decreasing = false;
    }
    if (array[i] > array[i - 1]) {
      is_non_increasing = false;
    }
  }
  return is_non_decreasing || is_non_increasing;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> input = {-1, -5, -10, -1100, -1100, -1101, -1102, -9001};
      bool expected = true;
      bool actual = isMonotonic(input);
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

public class ProgramTest {
	[Test]
	public void TestCase1() {
		var array = new int[] {-1, -5, -10, -1100, -1100, -1101, -1102, -9001};
		var expected = true;
		var actual = Program.IsMonotonic(array);
		Utils.AssertEquals(expected, actual);
	}
}
```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(n) time | O(1) space - where n is the length of the array
	public static bool IsMonotonic(int[] array) {
		if (array.Length <= 2) return true;

		var direction = array[1] - array[0];
		for (int i = 2; i < array.Length; i++) {
			if (direction == 0) {
				direction = array[i] - array[i - 1];
				continue;
			}

			if (breaksDirection(direction, array[i - 1], array[i])) {
				return false;
			}
		}
		return true;
	}

	public static bool breaksDirection(int direction, int previous, int current) {
		var difference = current - previous;
		if (direction > 0) return difference < 0;
		return difference > 0;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(n) time | O(1) space - where n is the length of the array
	public static bool IsMonotonic(int[] array) {
		var isNonDecreasing = true;
		var isNonIncreasing = true;
		for (int i = 1; i < array.Length; i++) {
			if (array[i] < array[i - 1]) {
				isNonDecreasing = false;
			}
			if (array[i] > array[i - 1]) {
				isNonIncreasing = false;
			}
		}

		return isNonDecreasing || isNonIncreasing;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		var array = new int[] {-1, -5, -10, -1100, -1100, -1101, -1102, -9001};
		var expected = true;
		var actual = Program.IsMonotonic(array);
		Utils.AssertEquals(expected, actual);
	}
}
```
### Sandbox Code (go)
```go
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

package main

import "github.com/stretchr/testify/require"

func (s *TestSuite) TestCase1(t *TestCase) {
	array := []int{-1, -5, -10, -1100, -1100, -1101, -1102, -9001}
	actual := IsMonotonic(array)
	require.True(t, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space - where n is the length of the array
func IsMonotonic(array []int) bool {
	if len(array) <= 2 {
		return true
	}

	direction := array[1] - array[0]
	for i := 2; i < len(array); i++ {
		if direction == 0 {
			direction = array[i] - array[i-1]
			continue
		}

		if breaksDirection(direction, array[i-1], array[i]) {
			return false
		}
	}

	return true
}

func breaksDirection(direction, previousInt, currentInt int) bool {
	difference := currentInt - previousInt
	if direction > 0 {
		return difference < 0
	}
	return difference > 0
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space - where n is the length of the array
func IsMonotonic(array []int) bool {
	isNonDecreasing := true
	isNonIncreasing := true
	for i := 1; i < len(array); i++ {
		if array[i] < array[i-1] {
			isNonDecreasing = false
		}
		if array[i] > array[i-1] {
			isNonIncreasing = false
		}
	}

	return isNonDecreasing || isNonIncreasing
}

```
### Unit Tests 1 (go)
```go
package main

import "github.com/stretchr/testify/require"

func (s *TestSuite) TestCase1(t *TestCase) {
	array := []int{-1, -5, -10, -1100, -1100, -1101, -1102, -9001}
	actual := IsMonotonic(array)
	require.True(t, actual)
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
    var array = new int[] {-1, -5, -10, -1100, -1100, -1101, -1102, -9001};
    var expected = true;
    var actual = Program.isMonotonic(array);
    Utils.assertEquals(expected, actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the length of the array
  public static boolean isMonotonic(int[] array) {
    if (array.length <= 2) return true;

    var direction = array[1] - array[0];
    for (int i = 2; i < array.length; i++) {
      if (direction == 0) {
        direction = array[i] - array[i - 1];
        continue;
      }

      if (breaksDirection(direction, array[i - 1], array[i])) {
        return false;
      }
    }
    return true;
  }

  public static boolean breaksDirection(int direction, int previous, int current) {
    var difference = current - previous;
    if (direction > 0) return difference < 0;
    return difference > 0;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the length of the array
  public static boolean isMonotonic(int[] array) {
    var isNonDecreasing = true;
    var isNonIncreasing = true;
    for (int i = 1; i < array.length; i++) {
      if (array[i] < array[i - 1]) {
        isNonDecreasing = false;
      }
      if (array[i] > array[i - 1]) {
        isNonIncreasing = false;
      }
    }

    return isNonDecreasing || isNonIncreasing;
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    var array = new int[] {-1, -5, -10, -1100, -1100, -1101, -1102, -9001};
    var expected = true;
    var actual = Program.isMonotonic(array);
    Utils.assertEquals(expected, actual);
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
  const array = [-1, -5, -10, -1100, -1100, -1101, -1102, -9001];
  const expected = true;
  const actual = program.isMonotonic(array);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the array
function isMonotonic(array) {
  if (array.length <= 2) return true;

  let direction = array[1] - array[0];
  for (let i = 2; i < array.length; i++) {
    if (direction === 0) {
      direction = array[i] - array[i - 1];
      continue;
    }
    if (breaksDirection(direction, array[i - 1], array[i])) {
      return false;
    }
  }

  return true;
}

function breaksDirection(direction, previousInt, currentInt) {
  const difference = currentInt - previousInt;
  if (direction > 0) return difference < 0;
  return difference > 0;
}

exports.isMonotonic = isMonotonic;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the array
function isMonotonic(array) {
  let isNonDecreasing = true;
  let isNonIncreasing = true;
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) isNonDecreasing = false;
    if (array[i] > array[i - 1]) isNonIncreasing = false;
  }

  return isNonDecreasing || isNonIncreasing;
}

exports.isMonotonic = isMonotonic;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const array = [-1, -5, -10, -1100, -1100, -1101, -1102, -9001];
  const expected = true;
  const actual = program.isMonotonic(array);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.isMonotonic as isMonotonic

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = listOf<Int>(-1, -5, -10, -1100, -1100, -1101, -1102, -9001)
        val expected = true
        val actual = isMonotonic(array)
        assert(actual == expected)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(1) space - where n is the length of the array
fun isMonotonic(array: List<Int>): Boolean {
    if (array.size <= 2) return true

    var direction = array[1] - array[0]
    for (i in 2 until array.size) {
        if (direction == 0) {
            direction = array[i] - array[i - 1]
            continue
        }
        if (breaksDirection(direction, array[i - 1], array[i])) {
            return false
        }
    }

    return true
}

fun breaksDirection(direction: Int, previousInt: Int, currentInt: Int): Boolean {
    val difference = currentInt - previousInt
    if (direction > 0) return difference < 0
    return difference > 0
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(1) space - where n is the length of the array
fun isMonotonic(array: List<Int>): Boolean {
    var isNonDecreasing = true
    var isNonIncreasing = true
    for (i in 1 until array.size) {
        if (array[i] < array[i - 1]) isNonDecreasing = false
        if (array[i] > array[i - 1]) isNonIncreasing = false
    }

    return isNonDecreasing || isNonIncreasing
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.isMonotonic as isMonotonic

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = listOf<Int>(-1, -5, -10, -1100, -1100, -1101, -1102, -9001)
        val expected = true
        val actual = isMonotonic(array)
        assert(actual == expected)
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
      let array = [-1, -5, -10, -1100, -1100, -1101, -1102, -9001]
      let expected = true
      let actual = program.isMonotonic(array: array)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the length of the array
  func isMonotonic(array: [Int]) -> Bool {
    if array.count <= 2 {
      return true
    }

    var direction = array[1] - array[0]
    for i in 2 ..< array.count {
      if direction == 0 {
        direction = array[i] - array[i - 1]
        continue
      }

      if breaksDirection(direction: direction, previousInt: array[i - 1], currentInt: array[i]) {
        return false
      }
    }

    return true
  }

  func breaksDirection(direction: Int, previousInt: Int, currentInt: Int) -> Bool {
    let difference = currentInt - previousInt
    if direction > 0 {
      return difference < 0
    }
    return difference > 0
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the length of the array
  func isMonotonic(array: [Int]) -> Bool {
    if array.count <= 2 {
      return true
    }

    var isNonDecreasing = true
    var isNonIncreasing = true
    for i in 1 ..< array.count {
      if array[i] < array[i - 1] {
        isNonDecreasing = false
      }
      if array[i] > array[i - 1] {
        isNonIncreasing = false
      }
    }

    return isNonDecreasing || isNonIncreasing
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let array = [-1, -5, -10, -1100, -1100, -1101, -1102, -9001]
      let expected = true
      let actual = program.isMonotonic(array: array)
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
        array = [-1, -5, -10, -1100, -1100, -1101, -1102, -9001]
        expected = True
        actual = program.isMonotonic(array)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space - where n is the length of the array
def isMonotonic(array):
    if len(array) <= 2:
        return True

    direction = array[1] - array[0]
    for i in range(2, len(array)):
        if direction == 0:
            direction = array[i] - array[i - 1]
            continue
        if breaksDirection(direction, array[i - 1], array[i]):
            return False

    return True


def breaksDirection(direction, previousInt, currentInt):
    difference = currentInt - previousInt
    if direction > 0:
        return difference < 0
    return difference > 0

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space - where n is the length of the array
def isMonotonic(array):
    isNonDecreasing = True
    isNonIncreasing = True
    for i in range(1, len(array)):
        if array[i] < array[i - 1]:
            isNonDecreasing = False
        if array[i] > array[i - 1]:
            isNonIncreasing = False

    return isNonDecreasing or isNonIncreasing

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        array = [-1, -5, -10, -1100, -1100, -1101, -1102, -9001]
        expected = True
        actual = program.isMonotonic(array)
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
  const array = [-1, -5, -10, -1100, -1100, -1101, -1102, -9001];
  const expected = true;
  const actual = program.isMonotonic(array);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the array
export function isMonotonic(array: number[]) {
  if (array.length <= 2) return true;

  let direction = array[1] - array[0];
  for (let i = 2; i < array.length; i++) {
    if (direction === 0) {
      direction = array[i] - array[i - 1];
      continue;
    }
    if (breaksDirection(direction, array[i - 1], array[i])) {
      return false;
    }
  }

  return true;
}

function breaksDirection(direction: number, previousInt: number, currentInt: number) {
  const difference = currentInt - previousInt;
  if (direction > 0) return difference < 0;
  return difference > 0;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the array
export function isMonotonic(array: number[]) {
  let isNonDecreasing = true;
  let isNonIncreasing = true;
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) isNonDecreasing = false;
    if (array[i] > array[i - 1]) isNonIncreasing = false;
  }

  return isNonDecreasing || isNonIncreasing;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const array = [-1, -5, -10, -1100, -1100, -1101, -1102, -9001];
  const expected = true;
  const actual = program.isMonotonic(array);
  chai.expect(actual).to.deep.equal(expected);
});

```

