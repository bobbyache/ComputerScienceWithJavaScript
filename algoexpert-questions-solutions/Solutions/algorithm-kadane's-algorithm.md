# Kadane's Algorithm
<div class="html">
<p>
  Write a function that takes in a non-empty array of integers and returns the
  maximum sum that can be obtained by summing up all of the integers in a
  non-empty subarray of the input array. A subarray must only contain adjacent
  numbers (numbers next to each other in the input array).
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4]
</pre>
<h3>Sample Output</h3>
<pre>
19 <span class="CodeEditor-promptComment">// [1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1]</span>
</pre>
</div>

Hint 1
<p>
This problem seems fairly simple until you run into negative numbers, some of which are so big in absolute value that they essentially break an otherwise good subarray into two subarrays, and some of which are small enough that there exists a subarray containing them whose numbers sum to maximum sum that you're looking for. How can you determine which group a negative number belongs to?
</p>


Hint 2

<p>
Realize that at any given index in the input array, the maximum sum for a subarray ending at that index is either the maximum sum for a subarray ending at the previous index plus the number at that index, or just the number at that index. Thus, for each index in the array, you can calculate the maximum sum of a subarray ending at that index, and this can be done in one simple pass through the input array.
</p>


Hint 3

<p>
How can you alter the pass through the input array mentioned in Hint #2 so as to obtain the actual answer to the problem, that is the maximum sum of any subarray in the input array? You should be able to accomplish everything in one loop through the input array.
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
      assert(kadanesAlgorithm(
                 {3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4}) == 19);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

// O(n) time | O(1) space
int kadanesAlgorithm(vector<int> array) {
  int maxEndingHere = array[0];
  int maxSoFar = array[0];
  for (int i = 1; i < array.size(); i++) {
    int num = array[i];
    maxEndingHere = max(num, maxEndingHere + num);
    maxSoFar = max(maxSoFar, maxEndingHere);
  }
  return maxSoFar;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      assert(kadanesAlgorithm(
                 {3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4}) == 19);
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
		int[] input = {3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4};
		Utils.AssertTrue(Program.KadanesAlgorithm(input) == 19);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// O(n) time | O(1) space
	public static int KadanesAlgorithm(int[] array) {
		int maxEndingHere = array[0];
		int maxSoFar = array[0];
		for (int i = 1; i < array.Length; i++) {
			int num = array[i];
			maxEndingHere = Math.Max(num, maxEndingHere + num);
			maxSoFar = Math.Max(maxSoFar, maxEndingHere);
		}
		return maxSoFar;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] input = {3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4};
		Utils.AssertTrue(Program.KadanesAlgorithm(input) == 19);
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
	expected := 19
	output := KadanesAlgorithm([]int{3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4})
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space
func KadanesAlgorithm(array []int) int {
	maxEndingHere := array[0]
	maxSoFar := array[0]
	for i := 1; i < len(array); i++ {
		num := array[i]
		maxEndingHere = max(num, maxEndingHere+num)
		maxSoFar = max(maxSoFar, maxEndingHere)
	}
	return maxSoFar
}

func max(a int, b int) int {
	if a > b {
		return a
	}
	return b
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := 19
	output := KadanesAlgorithm([]int{3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4})
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
    int[] input = {3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4};
    Utils.assertTrue(Program.kadanesAlgorithm(input) == 19);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space
  public static int kadanesAlgorithm(int[] array) {
    int maxEndingHere = array[0];
    int maxSoFar = array[0];
    for (int i = 1; i < array.length; i++) {
      int num = array[i];
      maxEndingHere = Math.max(num, maxEndingHere + num);
      maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    return maxSoFar;
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    int[] input = {3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4};
    Utils.assertTrue(Program.kadanesAlgorithm(input) == 19);
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
  chai.expect(program.kadanesAlgorithm([3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4])).to.deep.equal(19);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the input array
function kadanesAlgorithm(array) {
  let maxEndingHere = array[0];
  let maxSoFar = array[0];
  for (let i = 1; i < array.length; i++) {
    const num = array[i];
    maxEndingHere = Math.max(num, maxEndingHere + num);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  return maxSoFar;
}

exports.kadanesAlgorithm = kadanesAlgorithm;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.kadanesAlgorithm([3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4])).to.deep.equal(19);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.kadanesAlgorithm

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4)
        val output = kadanesAlgorithm(input)
        assert(output == 19)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(n) time | O(1) space
fun kadanesAlgorithm(array: List<Int>): Int {
    var maxEndingHere = array[0]
    var maxSoFar = array[0]
    for (i in 1 until array.size) {
        val num = array[i]
        maxEndingHere = max(num, maxEndingHere + num)
        maxSoFar = max(maxSoFar, maxEndingHere)
    }
    return maxSoFar
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.kadanesAlgorithm

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4)
        val output = kadanesAlgorithm(input)
        assert(output == 19)
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
      try assertEqual(19, program.kadanesAlgorithm(array: [3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4]))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space)
  func kadanesAlgorithm(array: [Int]) -> Int {
    if array.count > 0 {
      var maxEndingHere = array.first
      var maxSoFar = array.first

      for i in 1 ..< array.count {
        let currentNumber = array[i]

        maxEndingHere = max(currentNumber, currentNumber + maxEndingHere!)
        maxSoFar = max(maxSoFar!, maxEndingHere!)
      }

      return maxSoFar!
    } else {
      return -1
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
      try assertEqual(19, program.kadanesAlgorithm(array: [3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4]))
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
        self.assertEqual(program.kadanesAlgorithm([3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4]), 19)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space - where n is the length of the input array
def kadanesAlgorithm(array):
    maxEndingHere = array[0]
    maxSoFar = array[0]
    for i in range(1, len(array)):
        num = array[i]
        maxEndingHere = max(num, maxEndingHere + num)
        maxSoFar = max(maxSoFar, maxEndingHere)
    return maxSoFar

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.kadanesAlgorithm([3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4]), 19)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.kadanesAlgorithm([3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4])).to.deep.equal(19);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the input array
export function kadanesAlgorithm(array: number[]) {
  let maxEndingHere = array[0];
  let maxSoFar = array[0];
  for (let i = 1; i < array.length; i++) {
    const num = array[i];
    maxEndingHere = Math.max(num, maxEndingHere + num);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  return maxSoFar;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.kadanesAlgorithm([3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4])).to.deep.equal(19);
});

```

