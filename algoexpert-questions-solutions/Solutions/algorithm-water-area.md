# Water Area
<div class="html">
<p>
  You're given an array of non-negative integers where each non-zero integer
  represents the height of a pillar of width <span>1</span>. Imagine water being
  poured over all of the pillars; write a function that returns the surface area
  of the water trapped between the pillars viewed from the front. Note that
  spilled water should be ignored.
</p>
<p>
  You can refer to the first three minutes of this question's video explanation
  for a visual example.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">heights</span> = [0, 8, 0, 0, 5, 0, 0, 10, 0, 0, 1, 1, 0, 3]
</pre>
<h3>Sample Output</h3>
<pre>
48

<span class="CodeEditor-promptComment">// Below is a visual representation of the sample input.</span>
<span class="CodeEditor-promptComment">// The dots and vertical lines represent trapped water and pillars, respectively.</span>
<span class="CodeEditor-promptComment">// Note that there are 48 dots.</span>
<span class="CodeEditor-promptComment">//        |</span>
<span class="CodeEditor-promptComment">//        |</span>
<span class="CodeEditor-promptComment">//  |.....|</span>
<span class="CodeEditor-promptComment">//  |.....|</span>
<span class="CodeEditor-promptComment">//  |.....|</span>
<span class="CodeEditor-promptComment">//  |..|..|</span>
<span class="CodeEditor-promptComment">//  |..|..|</span>
<span class="CodeEditor-promptComment">//  |..|..|.....|</span>
<span class="CodeEditor-promptComment">//  |..|..|.....|</span>
<span class="CodeEditor-promptComment">// _|..|..|..||.|</span>
</pre>
</div>

Hint 1
<p>
In order to calculate the amount of water above a single point in the input array, you must know the height of the tallest pillar to its left and the height of the tallest pillar to its right.
</p>


Hint 2

<p>
If a point can hold water above it, then the smallest of the two heights mentioned in Hint #1 minus the height at that respective point should lead you to the amount of water above it.
</p>


Hint 3

<p>
Try building an array of the left and right max heights for each point in the input array. You should be able to build this array and to compute the final amount of water above each point in just two loops over the input array.
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
      vector<int> input{0, 8, 0, 0, 5, 0, 0, 10, 0, 0, 1, 1, 0, 3};
      assert(waterArea(input) == 48);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

// O(n) time | O(n) space - where n is the length of the input array
int waterArea(vector<int> heights) {
  vector<int> maxes(heights.size(), 0);
  int leftMax = 0;
  for (int i = 0; i < heights.size(); i++) {
    int height = heights[i];
    maxes[i] = leftMax;
    leftMax = max(leftMax, height);
  }
  int rightMax = 0;
  for (int i = heights.size() - 1; i >= 0; i--) {
    int height = heights[i];
    int minHeight = min(rightMax, maxes[i]);
    if (height < minHeight) {
      maxes[i] = minHeight - height;
    } else {
      maxes[i] = 0;
    }
    rightMax = max(rightMax, height);
  }
  int total = 0;
  for (int i = 0; i < heights.size(); i++) {
    total += maxes[i];
  }
  return total;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

// O(n) time | O(1) space - where n is the length of the input array
int waterArea(vector<int> heights) {
  if (heights.size() == 0)
    return 0;

  auto leftIdx = 0;
  auto rightIdx = heights.size() - 1;
  auto leftMax = heights[leftIdx];
  auto rightMax = heights[rightIdx];
  auto surfaceArea = 0;

  while (leftIdx < rightIdx) {
    if (heights[leftIdx] < heights[rightIdx]) {
      leftIdx++;
      leftMax = max(leftMax, heights[leftIdx]);
      surfaceArea += leftMax - heights[leftIdx];
    } else {
      rightIdx--;
      rightMax = max(rightMax, heights[rightIdx]);
      surfaceArea += rightMax - heights[rightIdx];
    }
  }

  return surfaceArea;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> input{0, 8, 0, 0, 5, 0, 0, 10, 0, 0, 1, 1, 0, 3};
      assert(waterArea(input) == 48);
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
		int[] input = {0, 8, 0, 0, 5, 0, 0, 10, 0, 0, 1, 1, 0, 3};
		Utils.AssertTrue(Program.WaterArea(input) == 48);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// O(n) time | O(n) space - where n is the length of the input array
	public static int WaterArea(int[] heights) {
		int[] maxes = new int[heights.Length];
		int leftMax = 0;
		for (int i = 0; i < heights.Length; i++) {
			int height = heights[i];
			maxes[i] = leftMax;
			leftMax = Math.Max(leftMax, height);
		}
		int rightMax = 0;
		for (int i = heights.Length - 1; i >= 0; i--) {
			int height = heights[i];
			int minHeight = Math.Min(rightMax, maxes[i]);
			if (height < minHeight) {
				maxes[i] = minHeight - height;
			} else {
				maxes[i] = 0;
			}
			rightMax = Math.Max(rightMax, height);
		}
		int total = 0;
		for (int i = 0; i < heights.Length; i++) {
			total += maxes[i];
		}
		return total;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// O(n) time | O(1) space - where n is the length of the input array
	public static int WaterArea(int[] heights) {
		if (heights.Length == 0) return 0;

		var leftIdx = 0;
		var rightIdx = heights.Length - 1;
		var leftMax = heights[leftIdx];
		var rightMax = heights[rightIdx];
		var surfaceArea = 0;

		while (leftIdx < rightIdx) {
			if (heights[leftIdx] < heights[rightIdx]) {
				leftIdx++;
				leftMax = Math.Max(leftMax, heights[leftIdx]);
				surfaceArea += leftMax - heights[leftIdx];
			} else {
				rightIdx--;
				rightMax = Math.Max(rightMax, heights[rightIdx]);
				surfaceArea += rightMax - heights[rightIdx];
			}
		}

		return surfaceArea;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] input = {0, 8, 0, 0, 5, 0, 0, 10, 0, 0, 1, 1, 0, 3};
		Utils.AssertTrue(Program.WaterArea(input) == 48);
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
	expected := 48
	output := WaterArea([]int{0, 8, 0, 0, 5, 0, 0, 10, 0, 0, 1, 1, 0, 3})
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space - where n is the length of the input array
func WaterArea(heights []int) int {
	maxes := make([]int, len(heights))
	leftmax := 0
	for i, height := range heights {
		maxes[i] = leftmax
		leftmax = max(leftmax, height)
	}
	rightmax := 0
	for i := range heights {
		j := len(heights) - i - 1
		height := heights[j]
		minheight := min(rightmax, maxes[j])
		if height < minheight {
			maxes[j] = minheight - height
		} else {
			maxes[j] = 0
		}
		rightmax = max(rightmax, height)
	}
	return sum(maxes)
}

func min(arg1 int, rest ...int) int {
	curr := arg1
	for _, num := range rest {
		if num < curr {
			curr = num
		}
	}
	return curr
}

func max(arg1 int, rest ...int) int {
	curr := arg1
	for _, num := range rest {
		if num > curr {
			curr = num
		}
	}
	return curr
}

func sum(arr []int) int {
	acc := 0
	for _, num := range arr {
		acc += num
	}
	return acc
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space - where n is the length of the input array
func WaterArea(heights []int) int {
	if len(heights) == 0 {
		return 0
	}

	leftIdx := 0
	rightIdx := len(heights) - 1
	leftMax := heights[leftIdx]
	rightMax := heights[rightIdx]
	surfaceArea := 0

	for leftIdx < rightIdx {
		if heights[leftIdx] < heights[rightIdx] {
			leftIdx++
			leftMax = max(leftMax, heights[leftIdx])
			surfaceArea += leftMax - heights[leftIdx]
		} else {
			rightIdx--
			rightMax = max(rightMax, heights[rightIdx])
			surfaceArea += rightMax - heights[rightIdx]
		}
	}
	return surfaceArea
}

func max(arg1 int, rest ...int) int {
	curr := arg1
	for _, num := range rest {
		if num > curr {
			curr = num
		}
	}
	return curr
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := 48
	output := WaterArea([]int{0, 8, 0, 0, 5, 0, 0, 10, 0, 0, 1, 1, 0, 3})
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
    int[] input = {0, 8, 0, 0, 5, 0, 0, 10, 0, 0, 1, 1, 0, 3};
    Utils.assertTrue(Program.waterArea(input) == 48);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the length of the input array
  public static int waterArea(int[] heights) {
    int[] maxes = new int[heights.length];
    int leftMax = 0;
    for (int i = 0; i < heights.length; i++) {
      int height = heights[i];
      maxes[i] = leftMax;
      leftMax = Math.max(leftMax, height);
    }
    int rightMax = 0;
    for (int i = heights.length - 1; i >= 0; i--) {
      int height = heights[i];
      int minHeight = Math.min(rightMax, maxes[i]);
      if (height < minHeight) {
        maxes[i] = minHeight - height;
      } else {
        maxes[i] = 0;
      }
      rightMax = Math.max(rightMax, height);
    }
    int total = 0;
    for (int i = 0; i < heights.length; i++) {
      total += maxes[i];
    }
    return total;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the length of the input array
  public static int waterArea(int[] heights) {
    if (heights.length == 0) return 0;

    var leftIdx = 0;
    var rightIdx = heights.length - 1;
    var leftMax = heights[leftIdx];
    var rightMax = heights[rightIdx];
    var surfaceArea = 0;

    while (leftIdx < rightIdx) {
      if (heights[leftIdx] < heights[rightIdx]) {
        leftIdx++;
        leftMax = Math.max(leftMax, heights[leftIdx]);
        surfaceArea += leftMax - heights[leftIdx];
      } else {
        rightIdx--;
        rightMax = Math.max(rightMax, heights[rightIdx]);
        surfaceArea += rightMax - heights[rightIdx];
      }
    }

    return surfaceArea;
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    int[] input = {0, 8, 0, 0, 5, 0, 0, 10, 0, 0, 1, 1, 0, 3};
    Utils.assertTrue(Program.waterArea(input) == 48);
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
  chai.expect(program.waterArea([0, 8, 0, 0, 5, 0, 0, 10, 0, 0, 1, 1, 0, 3])).to.deep.equal(48);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input array
function waterArea(heights) {
  const maxes = new Array(heights.length).fill(0);
  let leftMax = 0;
  for (let i = 0; i < heights.length; i++) {
    const height = heights[i];
    maxes[i] = leftMax;
    leftMax = Math.max(leftMax, height);
  }
  let rightMax = 0;
  for (let i = heights.length - 1; i >= 0; i--) {
    const height = heights[i];
    const minHeight = Math.min(rightMax, maxes[i]);
    if (height < minHeight) {
      maxes[i] = minHeight - height;
    } else {
      maxes[i] = 0;
    }
    rightMax = Math.max(rightMax, height);
  }
  return maxes.reduce((a, b) => a + b, 0);
}

exports.waterArea = waterArea;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the input array
function waterArea(heights) {
  if (heights.length === 0) return 0;

  let leftIdx = 0;
  let rightIdx = heights.length - 1;
  let leftMax = heights[leftIdx];
  let rightMax = heights[rightIdx];
  let surfaceArea = 0;

  while (leftIdx < rightIdx) {
    if (heights[leftIdx] < heights[rightIdx]) {
      leftIdx++;
      leftMax = Math.max(leftMax, heights[leftIdx]);
      surfaceArea += leftMax - heights[leftIdx];
    } else {
      rightIdx--;
      rightMax = Math.max(rightMax, heights[rightIdx]);
      surfaceArea += rightMax - heights[rightIdx];
    }
  }

  return surfaceArea;
}

exports.waterArea = waterArea;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.waterArea([0, 8, 0, 0, 5, 0, 0, 10, 0, 0, 1, 1, 0, 3])).to.deep.equal(48);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.waterArea

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(0, 8, 0, 0, 5, 0, 0, 10, 0, 0, 1, 1, 0, 3)
        assert(waterArea(input) == 48)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max
import kotlin.math.min

// O(n) time | O(n) space - where n is the length of the input array
fun waterArea(heights: List<Int>): Int {
    val maxes = MutableList<Int>(heights.size) { 0 }
    var leftMax = 0
    for (i in 0 until heights.size) {
        val height = heights[i]
        maxes[i] = leftMax
        leftMax = max(leftMax, height)
    }

    var rightMax = 0
    for (i in heights.size - 1 downTo 0) {
        val height = heights[i]
        var minHeight = min(rightMax, maxes[i])
        if (height < minHeight) {
            maxes[i] = minHeight - height
        } else {
            maxes[i] = 0
        }
        rightMax = max(rightMax, height)
    }

    var total = 0
    for (i in 0 until heights.size) {
        total += maxes[i]
    }
    return total
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(n) time | O(1) space - where n is the length of the input array
fun waterArea(heights: List<Int>): Int {
    if (heights.size == 0) return 0

    var leftIdx = 0
    var rightIdx = heights.size - 1
    var leftMax = heights[leftIdx]
    var rightMax = heights[rightIdx]
    var surfaceArea = 0

    while (leftIdx < rightIdx) {
        if (heights[leftIdx] < heights[rightIdx]) {
            leftIdx++
            leftMax = max(leftMax, heights[leftIdx])
            surfaceArea += leftMax - heights[leftIdx]
        } else {
            rightIdx--
            rightMax = max(rightMax, heights[rightIdx])
            surfaceArea += rightMax - heights[rightIdx]
        }
    }

    return surfaceArea
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.waterArea

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(0, 8, 0, 0, 5, 0, 0, 10, 0, 0, 1, 1, 0, 3)
        assert(waterArea(input) == 48)
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
      try assertEqual(48, program.waterArea(heights: [0, 8, 0, 0, 5, 0, 0, 10, 0, 0, 1, 1, 0, 3]))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the length of the input array
  func waterArea(heights: [Int]) -> Int {
    var maxes = Array(repeating: 0, count: heights.count)
    var leftMax = 0

    for i in 0 ..< heights.count {
      let currentHeight = heights[i]

      maxes[i] = leftMax
      leftMax = max(leftMax, currentHeight)
    }

    var rightMax = 0

    for i in (0 ..< heights.count).reversed() {
      let currentHeight = heights[i]

      let minMax = min(rightMax, maxes[i])

      if currentHeight < minMax {
        maxes[i] = minMax - currentHeight
      } else {
        maxes[i] = 0
      }

      rightMax = max(rightMax, currentHeight)
    }

    return maxes.reduce(0) {
      x, y in

      x + y
    }
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the length of the input array
  func waterArea(heights: [Int]) -> Int {
    if heights.count == 0 {
      return 0
    }

    var leftIdx = 0
    var rightIdx = heights.count - 1
    var leftMax = heights[leftIdx]
    var rightMax = heights[rightIdx]
    var surfaceArea = 0

    while leftIdx < rightIdx {
      if heights[leftIdx] < heights[rightIdx] {
        leftIdx += 1
        leftMax = max(leftMax, heights[leftIdx])
        surfaceArea += leftMax - heights[leftIdx]
      } else {
        rightIdx -= 1
        rightMax = max(rightMax, heights[rightIdx])
        surfaceArea += rightMax - heights[rightIdx]
      }
    }
    return surfaceArea
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      try assertEqual(48, program.waterArea(heights: [0, 8, 0, 0, 5, 0, 0, 10, 0, 0, 1, 1, 0, 3]))
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
        self.assertEqual(program.waterArea([0, 8, 0, 0, 5, 0, 0, 10, 0, 0, 1, 1, 0, 3]), 48)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the length of the input array
def waterArea(heights):
    maxes = [0 for x in heights]
    leftMax = 0
    for i in range(len(heights)):
        height = heights[i]
        maxes[i] = leftMax
        leftMax = max(leftMax, height)
    rightMax = 0
    for i in reversed(range(len(heights))):
        height = heights[i]
        minHeight = min(rightMax, maxes[i])
        if height < minHeight:
            maxes[i] = minHeight - height
        else:
            maxes[i] = 0
        rightMax = max(rightMax, height)
    return sum(maxes)

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space - where n is the length of the input array
def waterArea(heights):
    if len(heights) == 0:
        return 0

    leftIdx = 0
    rightIdx = len(heights) - 1
    leftMax = heights[leftIdx]
    rightMax = heights[rightIdx]
    surfaceArea = 0

    while leftIdx < rightIdx:
        if heights[leftIdx] < heights[rightIdx]:
            leftIdx += 1
            leftMax = max(leftMax, heights[leftIdx])
            surfaceArea += leftMax - heights[leftIdx]
        else:
            rightIdx -= 1
            rightMax = max(rightMax, heights[rightIdx])
            surfaceArea += rightMax - heights[rightIdx]

    return surfaceArea

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.waterArea([0, 8, 0, 0, 5, 0, 0, 10, 0, 0, 1, 1, 0, 3]), 48)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.waterArea([0, 8, 0, 0, 5, 0, 0, 10, 0, 0, 1, 1, 0, 3])).to.deep.equal(48);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input array
export function waterArea(heights: number[]) {
  const maxes: number[] = new Array(heights.length).fill(0);
  let leftMax = 0;
  for (let i = 0; i < heights.length; i++) {
    const height = heights[i];
    maxes[i] = leftMax;
    leftMax = Math.max(leftMax, height);
  }
  let rightMax = 0;
  for (let i = heights.length - 1; i >= 0; i--) {
    const height = heights[i];
    const minHeight = Math.min(rightMax, maxes[i]);
    if (height < minHeight) {
      maxes[i] = minHeight - height;
    } else {
      maxes[i] = 0;
    }
    rightMax = Math.max(rightMax, height);
  }
  return maxes.reduce((a, b) => a + b, 0);
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the input array
export function waterArea(heights: number[]) {
  if (heights.length === 0) return 0;

  let leftIdx = 0;
  let rightIdx = heights.length - 1;
  let leftMax = heights[leftIdx];
  let rightMax = heights[rightIdx];
  let surfaceArea = 0;

  while (leftIdx < rightIdx) {
    if (heights[leftIdx] < heights[rightIdx]) {
      leftIdx++;
      leftMax = Math.max(leftMax, heights[leftIdx]);
      surfaceArea += leftMax - heights[leftIdx];
    } else {
      rightIdx--;
      rightMax = Math.max(rightMax, heights[rightIdx]);
      surfaceArea += rightMax - heights[rightIdx];
    }
  }

  return surfaceArea;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.waterArea([0, 8, 0, 0, 5, 0, 0, 10, 0, 0, 1, 1, 0, 3])).to.deep.equal(48);
});

```

