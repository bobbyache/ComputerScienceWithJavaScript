# Sorted Squared Array
<div class="html">
<p>
  Write a function that takes in a non-empty array of integers that are sorted
  in ascending order and returns a new array of the same length with the squares
  of the original integers also sorted in ascending order.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [1, 2, 3, 5, 6, 8, 9]
</pre>
<h3>Sample Output</h3>
<pre>
[1, 4, 9, 25, 36, 64, 81]
</pre>
</div>

Hint 1
<p>
  While the integers in the input array are sorted in increasing order, their
  squares won't necessarily be as well, because of the possible presence of
  negative numbers.
</p>


Hint 2

<p>
  Traverse the array value by value, square each value, and insert the squares
  into an output array. Then, sort the output array before returning it. Is this
  the optimal solution?
</p>


Hint 3

<p>
  To reduce the time complexity of the algorithm mentioned in Hint #2, you need
  to avoid sorting the ouput array. To do this, as you square the values of the
  input array, try to directly insert them into their correct position in the
  output array.
</p>


Hint 4

<p>
  Use two pointers to keep track of the smallest and largest values in the input
  array. Compare the absolute values of these smallest and largest values,
  square the larger absolute value, and place the square at the end of the
  output array, filling it up from right to left. Move the pointers accordingly,
  and repeat this process until the output array is filled.
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
      vector<int> input = {1, 2, 3, 5, 6, 8, 9};
      vector<int> expected = {1, 4, 9, 25, 36, 64, 81};
      auto actual = sortedSquaredArray(input);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <algorithm>
using namespace std;

// O(nlogn) time | O(n) space - where n is the length of the input array
vector<int> sortedSquaredArray(vector<int> array) {
  vector<int> sortedSquares(array.size(), 0);

  for (int idx = 0; idx < array.size(); idx++) {
    int value = array[idx];
    sortedSquares[idx] = value * value;
  }

  sort(sortedSquares.begin(), sortedSquares.end());
  return sortedSquares;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

// O(n) time | O(n) space - where n is the length of the input array
vector<int> sortedSquaredArray(vector<int> array) {
  vector<int> sortedSquares(array.size(), 0);
  int smallerValueIdx = 0;
  int largerValueIdx = array.size() - 1;

  for (int idx = array.size() - 1; idx >= 0; idx--) {
    int smallerValue = array[smallerValueIdx];
    int largerValue = array[largerValueIdx];

    if (abs(smallerValue) > abs(largerValue)) {
      sortedSquares[idx] = smallerValue * smallerValue;
      smallerValueIdx++;
    } else {
      sortedSquares[idx] = largerValue * largerValue;
      largerValueIdx--;
    }
  }

  return sortedSquares;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> input = {1, 2, 3, 5, 6, 8, 9};
      vector<int> expected = {1, 4, 9, 25, 36, 64, 81};
      auto actual = sortedSquaredArray(input);
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
		var input = new int[] {1, 2, 3, 5, 6, 8, 9};
		var expected = new int[] {1, 4, 9, 25, 36, 64, 81};
		var actual = new Program().SortedSquaredArray(input);
		for (int i=0; i<expected.Length; i++) {
			Utils.AssertTrue(expected[i] == actual[i]);
		}
	}
}


```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	// O(nlogn) time | O(n) space - where n is the length of the input array
	public int[] SortedSquaredArray(int[] array) {
		int[] sortedSquares = new int[array.Length];
		for (int idx = 0; idx < array.Length; idx++) {
			int value = array[idx];
			sortedSquares[idx] = value * value;
		}
		Array.Sort(sortedSquares);
		return sortedSquares;
	}
}


```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	// O(n) time | O(n) space - where n is the length of the input array
	public int[] SortedSquaredArray(int[] array) {
		int[] sortedSquares = new int[array.Length];
		int smallerValueIdx = 0;
		int largerValueIdx = array.Length - 1;
		for (int idx = array.Length - 1; idx >= 0; idx--) {
			int smallerValue = array[smallerValueIdx];
			int largerValue = array[largerValueIdx];
			if (Math.Abs(smallerValue) > Math.Abs(largerValue)) {
				sortedSquares[idx] = smallerValue * smallerValue;
				smallerValueIdx++;
			} else {
				sortedSquares[idx] = largerValue * largerValue;
				largerValueIdx--;
			}
		}
		return sortedSquares;
	}
}
```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		var input = new int[] {1, 2, 3, 5, 6, 8, 9};
		var expected = new int[] {1, 4, 9, 25, 36, 64, 81};
		var actual = new Program().SortedSquaredArray(input);
		for (int i=0; i<expected.Length; i++) {
			Utils.AssertTrue(expected[i] == actual[i]);
		}
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
	input := []int{1, 2, 3, 5, 6, 8, 9}
	expected := []int{1, 4, 9, 25, 36, 64, 81}
	actual := SortedSquaredArray(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"sort"
)

// O(nlogn) time | O(n) space - where n is the length of the input array
func SortedSquaredArray(array []int) []int {
	sortedSquares := make([]int, len(array))

	for idx, value := range array {
		sortedSquares[idx] = value * value
	}

	sort.Ints(sortedSquares)
	return sortedSquares
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space - where n is the length of the input array
func SortedSquaredArray(array []int) []int {
	sortedSquares := make([]int, len(array))

	smallerValueIdx := 0
	largerValueIdx := len(array) - 1

	for idx := len(array) - 1; idx >= 0; idx-- {
		smallerValue := array[smallerValueIdx]
		largerValue := array[largerValueIdx]

		if abs(smallerValue) > abs(largerValue) {
			sortedSquares[idx] = smallerValue * smallerValue
			smallerValueIdx += 1
		} else {
			sortedSquares[idx] = largerValue * largerValue
			largerValueIdx -= 1
		}
	}

	return sortedSquares
}

func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []int{1, 2, 3, 5, 6, 8, 9}
	expected := []int{1, 4, 9, 25, 36, 64, 81}
	actual := SortedSquaredArray(input)
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
    var input = new int[] {1, 2, 3, 5, 6, 8, 9};
    var expected = new int[] {1, 4, 9, 25, 36, 64, 81};
    var actual = new Program().sortedSquaredArray(input);
    for (int i = 0; i < expected.length; i++) {
      Utils.assertTrue(expected[i] == actual[i]);
    }
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(nlogn) time | O(n) space - where n is the length of the input array
  public int[] sortedSquaredArray(int[] array) {
    int[] sortedSquares = new int[array.length];
    for (int idx = 0; idx < array.length; idx++) {
      int value = array[idx];
      sortedSquares[idx] = value * value;
    }
    Arrays.sort(sortedSquares);
    return sortedSquares;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n) time | O(n) space - where n is the length of the input array
  public int[] sortedSquaredArray(int[] array) {
    int[] sortedSquares = new int[array.length];
    int smallerValueIdx = 0;
    int largerValueIdx = array.length - 1;
    for (int idx = array.length - 1; idx >= 0; idx--) {
      int smallerValue = array[smallerValueIdx];
      int largerValue = array[largerValueIdx];
      if (Math.abs(smallerValue) > Math.abs(largerValue)) {
        sortedSquares[idx] = smallerValue * smallerValue;
        smallerValueIdx++;
      } else {
        sortedSquares[idx] = largerValue * largerValue;
        largerValueIdx--;
      }
    }
    return sortedSquares;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    var input = new int[] {1, 2, 3, 5, 6, 8, 9};
    var expected = new int[] {1, 4, 9, 25, 36, 64, 81};
    var actual = new Program().sortedSquaredArray(input);
    for (int i = 0; i < expected.length; i++) {
      Utils.assertTrue(expected[i] == actual[i]);
    }
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
  const input = [1, 2, 3, 5, 6, 8, 9];
  const expected = [1, 4, 9, 25, 36, 64, 81];
  const actual = program.sortedSquaredArray(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlogn) time | O(n) space - where n is the length of the input array
function sortedSquaredArray(array) {
  const sortedSquares = new Array(array.length).fill(0);

  for (let idx = 0; idx < array.length; idx++) {
    const value = array[idx];
    sortedSquares[idx] = value * value;
  }

  sortedSquares.sort((a, b) => a - b);
  return sortedSquares;
}

// Do not edit the line below.
exports.sortedSquaredArray = sortedSquaredArray;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input array
function sortedSquaredArray(array) {
  const sortedSquares = new Array(array.length).fill(0);
  let smallerValueIdx = 0;
  let largerValueIdx = array.length - 1;

  for (let idx = array.length - 1; idx >= 0; idx--) {
    const smallerValue = array[smallerValueIdx];
    const largerValue = array[largerValueIdx];

    if (Math.abs(smallerValue) > Math.abs(largerValue)) {
      sortedSquares[idx] = smallerValue * smallerValue;
      smallerValueIdx++;
    } else {
      sortedSquares[idx] = largerValue * largerValue;
      largerValueIdx--;
    }
  }

  return sortedSquares;
}

// Do not edit the line below.
exports.sortedSquaredArray = sortedSquaredArray;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [1, 2, 3, 5, 6, 8, 9];
  const expected = [1, 4, 9, 25, 36, 64, 81];
  const actual = program.sortedSquaredArray(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.sortedSquaredArray

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(1, 2, 3, 5, 6, 8, 9)
        val expected = listOf(1, 4, 9, 25, 36, 64, 81)
        val output = sortedSquaredArray(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(nlogn) time | O(n) space - where n is the length of the input array
fun sortedSquaredArray(array: List<Int>): List<Int> {
    val sortedSquares = array.map() { _ -> 0 }.toMutableList()

    for (idx in 0 until array.size) {
        val value = array[idx]
        sortedSquares[idx] = value * value
    }

    sortedSquares.sort()
    return sortedSquares
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.abs

// O(n) time | O(n) space - where n is the length of the input array
fun sortedSquaredArray(array: List<Int>): List<Int> {
    val sortedSquares = array.map() { _ -> 0 }.toMutableList()
    var smallerValueIdx = 0
    var largerValueIdx = array.size - 1

    for (idx in array.size - 1 downTo 0) {
        val smallerValue = array[smallerValueIdx]
        val largerValue = array[largerValueIdx]

        if (abs(smallerValue) > abs(largerValue)) {
            sortedSquares[idx] = smallerValue * smallerValue
            smallerValueIdx += 1
        } else {
            sortedSquares[idx] = largerValue * largerValue
            largerValueIdx -= 1
        }
    }

    return sortedSquares
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.sortedSquaredArray

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(1, 2, 3, 5, 6, 8, 9)
        val expected = listOf(1, 4, 9, 25, 36, 64, 81)
        val output = sortedSquaredArray(input)
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
      var input = [1, 2, 3, 5, 6, 8, 9]
      var expected = [1, 4, 9, 25, 36, 64, 81]
      var actual = Program().sortedSquaredArray(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nlogn) time | O(n) space - where n is the length of the input array
  func sortedSquaredArray(_ array: [Int]) -> [Int] {
    var sortedSquares = Array(repeating: 0, count: array.count)

    for idx in stride(from: 0, to: array.count, by: 1) {
      let value = array[idx]
      sortedSquares[idx] = value * value
    }

    sortedSquares.sort()
    return sortedSquares
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the length of the input array
  func sortedSquaredArray(_ array: [Int]) -> [Int] {
    var sortedSquares = Array(repeating: 0, count: array.count)

    var smallerValueIdx = 0
    var largerValueIdx = array.count - 1

    for idx in stride(from: array.count - 1, through: 0, by: -1) {
      let smallerValue = array[smallerValueIdx]
      let largerValue = array[largerValueIdx]

      if abs(smallerValue) > abs(largerValue) {
        sortedSquares[idx] = smallerValue * smallerValue
        smallerValueIdx += 1
      } else {
        sortedSquares[idx] = largerValue * largerValue
        largerValueIdx -= 1
      }
    }

    return sortedSquares
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = [1, 2, 3, 5, 6, 8, 9]
      var expected = [1, 4, 9, 25, 36, 64, 81]
      var actual = Program().sortedSquaredArray(input)
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
        input = [1, 2, 3, 5, 6, 8, 9]
        expected = [1, 4, 9, 25, 36, 64, 81]
        actual = program.sortedSquaredArray(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nlogn) time | O(n) space - where n is the length of the input array
def sortedSquaredArray(array):
    sortedSquares = [0 for _ in array]

    for idx in range(len(array)):
        value = array[idx]
        sortedSquares[idx] = value * value

    sortedSquares.sort()
    return sortedSquares

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the length of the input array
def sortedSquaredArray(array):
    sortedSquares = [0 for _ in array]
    smallerValueIdx = 0
    largerValueIdx = len(array) - 1

    for idx in reversed(range(len(array))):
        smallerValue = array[smallerValueIdx]
        largerValue = array[largerValueIdx]

        if abs(smallerValue) > abs(largerValue):
            sortedSquares[idx] = smallerValue * smallerValue
            smallerValueIdx += 1
        else:
            sortedSquares[idx] = largerValue * largerValue
            largerValueIdx -= 1

    return sortedSquares

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [1, 2, 3, 5, 6, 8, 9]
        expected = [1, 4, 9, 25, 36, 64, 81]
        actual = program.sortedSquaredArray(input)
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
  const input = [1, 2, 3, 5, 6, 8, 9];
  const expected = [1, 4, 9, 25, 36, 64, 81];
  const actual = program.sortedSquaredArray(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlogn) time | O(n) space - where n is the length of the input array
export function sortedSquaredArray(array: number[]) {
  const sortedSquares = new Array(array.length).fill(0);

  for (let idx = 0; idx < array.length; idx++) {
    const value = array[idx];
    sortedSquares[idx] = value * value;
  }

  sortedSquares.sort((a, b) => a - b);
  return sortedSquares;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input array
export function sortedSquaredArray(array: number[]) {
  const sortedSquares = new Array(array.length).fill(0);
  let smallerValueIdx = 0;
  let largerValueIdx = array.length - 1;

  for (let idx = array.length - 1; idx >= 0; idx--) {
    const smallerValue = array[smallerValueIdx];
    const largerValue = array[largerValueIdx];

    if (Math.abs(smallerValue) > Math.abs(largerValue)) {
      sortedSquares[idx] = smallerValue * smallerValue;
      smallerValueIdx++;
    } else {
      sortedSquares[idx] = largerValue * largerValue;
      largerValueIdx--;
    }
  }

  return sortedSquares;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [1, 2, 3, 5, 6, 8, 9];
  const expected = [1, 4, 9, 25, 36, 64, 81];
  const actual = program.sortedSquaredArray(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

