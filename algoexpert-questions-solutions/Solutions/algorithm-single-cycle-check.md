# Single Cycle Check
<div class="html">
<p>
  You're given an array of integers where each integer represents a jump of its
  value in the array. For instance, the integer <span>2</span> represents a jump
  of two indices forward in the array; the integer <span>-3</span> represents a
  jump of three indices backward in the array.
</p>
<p>
  If a jump spills past the array's bounds, it wraps over to the other side. For
  instance, a jump of <span>-1</span> at index <span>0</span> brings us to the last index in
  the array. Similarly, a jump of <span>1</span> at the last index in the array brings us to
  index <span>0</span>.
</p>
<p>
  Write a function that returns a boolean representing whether the jumps in the
  array form a single cycle. A single cycle occurs if, starting at any index in
  the array and following the jumps, every element in the array is visited
  exactly once before landing back on the starting index.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [2, 3, 1, -4, -4, 2]
</pre>
<h3>Sample Output</h3>
<pre>
true
</pre>
</div>

Hint 1
<p>
In order to check if the input array has a single cycle, you have to jump through all of the elements in the array. Could you keep a counter, jump through elements in the array, and stop once you've jumped through as many elements as are contained in the array?
</p>


Hint 2

<p>
Assume the input array has length n. If you start at index 0 and jump through n elements, what are the simplest conditions that you can check to see if the array doesn't have a single cycle?
</p>


Hint 3

<p>
Given Hint #2, there are 2 conditions that need to be met for the input array to have a single cycle. First, the starting element (in this case, the element at index 0) cannot be jumped through more than once, at the very beginning, so long as you haven't jumped through all of the other elements in the array. Second, the (n + 1)th element you jump through, where n is the length of the array, must be the first element you visited: the element at index 0 in this case.
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
      assert(hasSingleCycle({2, 3, 1, -4, -4, 2}) == true);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

int getNextIdx(int currentIdx, vector<int> array);

// O(n) time | O(1) space - where n is the length of the input array
bool hasSingleCycle(vector<int> array) {
  int numElementsVisited = 0;
  int currentIdx = 0;
  while (numElementsVisited < array.size()) {
    if (numElementsVisited > 0 && currentIdx == 0)
      return false;
    numElementsVisited++;
    currentIdx = getNextIdx(currentIdx, array);
  }
  return currentIdx == 0;
}

int getNextIdx(int currentIdx, vector<int> array) {
  int jump = array[currentIdx];
  int nextIdx = (currentIdx + jump) % (int)array.size();
  return nextIdx >= 0 ? nextIdx : nextIdx + array.size();
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      assert(hasSingleCycle({2, 3, 1, -4, -4, 2}) == true);
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
		Utils.AssertTrue(Program.HasSingleCycle(new int[] {2, 3, 1, -4, -4, 2}));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(n) time | O(1) space - where n is the length of the input array
	public static bool HasSingleCycle(int[] array) {
		int numElementsVisited = 0;
		int currentIdx = 0;
		while (numElementsVisited < array.Length) {
			if (numElementsVisited > 0 && currentIdx == 0) return false;
			numElementsVisited++;
			currentIdx = getNextIdx(currentIdx, array);
		}
		return currentIdx == 0;
	}

	public static int getNextIdx(int currentIdx, int[] array) {
		int jump = array[currentIdx];
		int nextIdx = (currentIdx + jump) % array.Length;
		return nextIdx >= 0 ? nextIdx : nextIdx + array.Length;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		Utils.AssertTrue(Program.HasSingleCycle(new int[] {2, 3, 1, -4, -4, 2}));
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
	input := []int{2, 3, 1, -4, -4, 2}
	output := HasSingleCycle(input)
	expected := true
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space - where n is the length of the input array
func HasSingleCycle(array []int) bool {
	numElementsVisited := 0
	currentIdx := 0
	for numElementsVisited < len(array) {
		if numElementsVisited > 0 && currentIdx == 0 {
			return false
		}
		numElementsVisited++
		currentIdx = getNextIdx(currentIdx, array)
	}
	return currentIdx == 0
}

func getNextIdx(currentIdx int, array []int) int {
	jump := array[currentIdx]
	nextIdx := (currentIdx + jump) % len(array)
	if nextIdx >= 0 {
		return nextIdx
	}
	return nextIdx + len(array)
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []int{2, 3, 1, -4, -4, 2}
	output := HasSingleCycle(input)
	expected := true
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
    Utils.assertTrue(Program.hasSingleCycle(new int[] {2, 3, 1, -4, -4, 2}));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the length of the input array
  public static boolean hasSingleCycle(int[] array) {
    int numElementsVisited = 0;
    int currentIdx = 0;
    while (numElementsVisited < array.length) {
      if (numElementsVisited > 0 && currentIdx == 0) return false;
      numElementsVisited++;
      currentIdx = getNextIdx(currentIdx, array);
    }
    return currentIdx == 0;
  }

  public static int getNextIdx(int currentIdx, int[] array) {
    int jump = array[currentIdx];
    int nextIdx = (currentIdx + jump) % array.length;
    return nextIdx >= 0 ? nextIdx : nextIdx + array.length;
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    Utils.assertTrue(Program.hasSingleCycle(new int[] {2, 3, 1, -4, -4, 2}));
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
  chai.expect(program.hasSingleCycle([2, 3, 1, -4, -4, 2])).to.deep.equal(true);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the input array
function hasSingleCycle(array) {
  let numElementsVisited = 0;
  let currentIdx = 0;
  while (numElementsVisited < array.length) {
    if (numElementsVisited > 0 && currentIdx === 0) return false;
    numElementsVisited++;
    currentIdx = getNextIdx(currentIdx, array);
  }
  return currentIdx === 0;
}

function getNextIdx(currentIdx, array) {
  const jump = array[currentIdx];
  const nextIdx = (currentIdx + jump) % array.length;
  return nextIdx >= 0 ? nextIdx : nextIdx + array.length;
}

exports.hasSingleCycle = hasSingleCycle;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.hasSingleCycle([2, 3, 1, -4, -4, 2])).to.deep.equal(true);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.hasSingleCycle as hasSingleCycle

class ProgramTest {
    @Test
    fun TestCase1() {
        assert(hasSingleCycle(listOf(2, 3, 1, -4, -4, 2)))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(1) space - where n is the length of the input array
fun hasSingleCycle(array: List<Int>): Boolean {
    var numElementsVisited = 0
    var currentIdx = 0
    while (numElementsVisited < array.size) {
        if (numElementsVisited > 0 && currentIdx == 0) return false
        numElementsVisited++
        currentIdx = getNextIdx(currentIdx, array)
    }
    return currentIdx == 0
}

fun getNextIdx(currentIdx: Int, array: List<Int>): Int {
    val jump = array[currentIdx]
    val nextIdx = (currentIdx + jump) % array.size
    return if (nextIdx >= 0) nextIdx else nextIdx + array.size
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.hasSingleCycle as hasSingleCycle

class ProgramTest {
    @Test
    fun TestCase1() {
        assert(hasSingleCycle(listOf(2, 3, 1, -4, -4, 2)))
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
      try assertEqual(true, program.hasSingleCycle(array: [2, 3, 1, -4, -4, 2]))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space
  func hasSingleCycle(array: [Int]) -> Bool {
    var currentIndex = 0
    var numberOfElementsVisited = 0

    var innerArray = array
    while numberOfElementsVisited < array.count {
      if currentIndex == 0, numberOfElementsVisited > 0 {
        return false
      }

      numberOfElementsVisited += 1
      currentIndex = getNextIndex(&currentIndex, array: &innerArray)
    }

    return currentIndex == 0
  }

  func getNextIndex(_ currentIndex: inout Int, array: inout [Int]) -> Int {
    let jump = array[currentIndex]
    let nextIndex = (jump + currentIndex) % array.count

    if nextIndex >= 0 {
      return nextIndex
    } else {
      return nextIndex + array.count
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
      try assertEqual(true, program.hasSingleCycle(array: [2, 3, 1, -4, -4, 2]))
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
        self.assertEqual(program.hasSingleCycle([2, 3, 1, -4, -4, 2]), True)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space - where n is the length of the input array
def hasSingleCycle(array):
    numElementsVisited = 0
    currentIdx = 0
    while numElementsVisited < len(array):
        if numElementsVisited > 0 and currentIdx == 0:
            return False
        numElementsVisited += 1
        currentIdx = getNextIdx(currentIdx, array)
    return currentIdx == 0


def getNextIdx(currentIdx, array):
    jump = array[currentIdx]
    nextIdx = (currentIdx + jump) % len(array)
    return nextIdx if nextIdx >= 0 else nextIdx + len(array)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.hasSingleCycle([2, 3, 1, -4, -4, 2]), True)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.hasSingleCycle([2, 3, 1, -4, -4, 2])).to.deep.equal(true);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the input array
export function hasSingleCycle(array: number[]) {
  let numElementsVisited = 0;
  let currentIdx = 0;
  while (numElementsVisited < array.length) {
    if (numElementsVisited > 0 && currentIdx === 0) return false;
    numElementsVisited++;
    currentIdx = getNextIdx(currentIdx, array);
  }
  return currentIdx === 0;
}

function getNextIdx(currentIdx: number, array: number[]) {
  const jump = array[currentIdx];
  const nextIdx = (currentIdx + jump) % array.length;
  return nextIdx >= 0 ? nextIdx : nextIdx + array.length;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.hasSingleCycle([2, 3, 1, -4, -4, 2])).to.deep.equal(true);
});

```

