# Largest Rectangle Under Skyline
<div class="html">
<p>
  Write a function that takes in an array of positive integers representing the
  heights of adjacent buildings and returns the area of the largest rectangle
  that can be created by any number of adjacent buildings, including just one
  building. Note that all buildings have the same width of <span>1</span> unit.
</p>
<p>
  For example, given <span>buildings = [2, 1, 2]</span>, the area of the largest
  rectangle that can be created is <span>3</span>, using all three buildings.
  Since the minimum height of the three buildings is <span>1</span>, you can
  create a rectangle that has a height of <span>1</span> and a width of
  <span>3</span> (the number of buildings). You could also create rectangles of
  area <span>2</span> by using only the first building or the last building, but
  these clearly wouldn't be the largest rectangles. Similarly, you could create
  rectangles of area <span>2</span> by using the first and second building or
  the second and third building.
</p>
<p>
  To clarify, the width of a created rectangle is the number of buildings used
  to create the rectangle, and its height is the height of the smallest building
  used to create it.
</p>
<p>
  Note that if no rectangles can be created, your function should return
  <span>0</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">buildings</span> = [1, 3, 3, 2, 4, 1, 5, 3, 2]
</pre>
<h3>Sample Output</h3>
<pre>
9

<span class="CodeEditor-promptComment">// Below is a visual representation of the sample input.</span>
<span class="CodeEditor-promptComment">//              _</span>
<span class="CodeEditor-promptComment">//          _  | |</span>
<span class="CodeEditor-promptComment">//    _ _  | | | |_</span>
<span class="CodeEditor-promptComment">//   | | |_| | | | |_</span>
<span class="CodeEditor-promptComment">//  _| | | | |_| | | |</span>
<span class="CodeEditor-promptComment">// |_|_|_|_|_|_|_|_|_|</span>
</pre>
</div>

Hint 1
<p>
  Try treating every building as a pillar of a rectangle that can be created
  with the height of the building in question.
</p>


Hint 2

<p>
  The brute-force approach to solve this problem involves treating every
  building as a part of a potential rectangle to be created. As you loop through
  all the buildings, simply expand to the left and right of the current
  building, and determine the width of the longest rectangle that you can create
  that has a height of the current building. Calculate the area of this longest
  rectangle, and update a variable to store the area of the largest rectangle
  that you've found so far. This approach has a time complexity of
  <span>O(n^2)</span>; can you do better?
</p>


Hint 3

<p>
  There's a way to solve this problem in linear (<span>O(n)</span>) time by
  using a stack. When should you push and pop buildings on and off the stack if
  you were to loop through the buildings from left to right? Try to think of
  each building on the stack as a pillar of a potential rectangle.
</p>


Hint 4

<p>
  The stack mentioned in Hint #3 will be used to determine the length of a
  rectangle that has the height of a building that is currently on top of the
  stack. Loop through all the buildings, and at each building, compare its
  height to the height of the building on top of the stack. If the current
  building's height is smaller than or the same as the height of the building on
  top of the stack, pop the building off the stack. When you pop the building
  off the stack, you've determined the rightmost position (your current
  position) of a rectangle of that height (the height of the building you
  popped) that uses that building. Then, to determine the leftmost position of
  that rectangle, you look at the next building on top of the stack. This is the
  index of the closest building to the left that has a smaller height than that
  of the building that was just popped off. Now, you can calculate the area of
  the rectangle that uses this building and update a variable to store the max
  area. Continue popping buildings off the stack at each iteration until the
  current building is taller than the one on top of the stack, and don't forget
  to push each building on top of the stack at each iteration. See the
  Conceptual Overview section of this question's video explanation for a more
  in-depth explanation.
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
      vector<int> input = {1, 3, 3, 2, 4, 1, 5, 3, 2};
      auto expected = 9;
      auto actual = largestRectangleUnderSkyline(input);
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

// O(n^2) time | O(1) space - where n is the number of buildings
int largestRectangleUnderSkyline(vector<int> buildings) {
  int maxArea = 0;
  for (int pillarIdx = 0; pillarIdx < buildings.size(); pillarIdx++) {
    int currentHeight = buildings[pillarIdx];

    int furthestLeft = pillarIdx;
    while (furthestLeft > 0 && buildings[furthestLeft - 1] >= currentHeight) {
      furthestLeft--;
    }

    int furthestRight = pillarIdx;
    while (furthestRight < buildings.size() - 1 &&
           buildings[furthestRight + 1] >= currentHeight) {
      furthestRight++;
    }

    int areaWithCurrentBuilding =
        (furthestRight - furthestLeft + 1) * currentHeight;
    maxArea = max(areaWithCurrentBuilding, maxArea);
  }

  return maxArea;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <algorithm>
using namespace std;

// O(n) time | O(n) space - where n is the number of buildings
int largestRectangleUnderSkyline(vector<int> buildings) {
  vector<int> pillarIndices;
  int maxArea = 0;

  vector<int> extendedBuildings(buildings);
  extendedBuildings.push_back(0);

  for (int idx = 0; idx < extendedBuildings.size(); idx++) {
    int height = extendedBuildings[idx];
    while (pillarIndices.size() != 0 &&
           extendedBuildings[pillarIndices[pillarIndices.size() - 1]] >=
               height) {
      int pillarHeight =
          extendedBuildings[pillarIndices[pillarIndices.size() - 1]];
      pillarIndices.pop_back();
      int width = pillarIndices.size() == 0
                      ? idx
                      : idx - pillarIndices[pillarIndices.size() - 1] - 1;
      maxArea = max(width * pillarHeight, maxArea);
    }
    pillarIndices.push_back(idx);
  }

  return maxArea;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> input = {1, 3, 3, 2, 4, 1, 5, 3, 2};
      auto expected = 9;
      auto actual = largestRectangleUnderSkyline(input);
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

using System.Collections.Generic;
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		List<int> input = new List<int> {
			1, 3, 3, 2, 4, 1, 5, 3, 2
		};
		int expected = 9;
		var actual = new Program().LargestRectangleUnderSkyline(input);
		Utils.AssertTrue(expected == actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {

	// O(n^2) time | O(1) space - where n is the number of buildings
	public int LargestRectangleUnderSkyline(List<int> buildings) {
		int maxArea = 0;
		for (int pillarIdx = 0; pillarIdx < buildings.Count; pillarIdx++) {
			int currentHeight = buildings[pillarIdx];

			int furthestLeft = pillarIdx;
			while (furthestLeft > 0 && buildings[furthestLeft - 1] >= currentHeight) {
				furthestLeft -= 1;
			}

			int furthestRight = pillarIdx;
			while (furthestRight < buildings.Count - 1 &&
			  buildings[furthestRight + 1] >= currentHeight) {
				furthestRight += 1;
			}

			int areaWithCurrentBuilding = (furthestRight - furthestLeft + 1) *
			  currentHeight;
			maxArea = Math.Max(areaWithCurrentBuilding, maxArea);
		}

		return maxArea;
	}
}
```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {

	// O(n) time | O(n) space - where n is the number of buildings
	public int LargestRectangleUnderSkyline(List<int> buildings) {
		Stack<int> pillarIndices = new Stack<int>();
		int maxArea = 0;

		List<int> extendedBuildings = new List<int>(buildings);
		extendedBuildings.Add(0);
		for (int idx = 0; idx < extendedBuildings.Count; idx++) {
			int height = extendedBuildings[idx];
			while (pillarIndices.Count != 0 &&
			  extendedBuildings[pillarIndices.Peek()] >= height) {
				int pillarHeight = extendedBuildings[pillarIndices.Pop()];
				int width =
				  (pillarIndices.Count == 0) ? idx : idx - pillarIndices.Peek() - 1;
				maxArea = Math.Max(width * pillarHeight, maxArea);
			}

			pillarIndices.Push(idx);
		}

		return maxArea;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		List<int> input = new List<int> {
			1, 3, 3, 2, 4, 1, 5, 3, 2
		};
		int expected = 9;
		var actual = new Program().LargestRectangleUnderSkyline(input);
		Utils.AssertTrue(expected == actual);
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
	input := []int{1, 3, 3, 2, 4, 1, 5, 3, 2}
	expected := 9
	actual := LargestRectangleUnderSkyline(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n^2) time | O(1) space - where n is the number of buildings
func LargestRectangleUnderSkyline(buildings []int) int {
	maxArea := 0
	for pillarIdx := range buildings {
		currentHeight := buildings[pillarIdx]

		var furthestLeft = pillarIdx
		for furthestLeft > 0 && buildings[furthestLeft-1] >= currentHeight {
			furthestLeft -= 1
		}

		var furthestRight = pillarIdx
		for furthestRight < len(buildings)-1 && buildings[furthestRight+1] >= currentHeight {
			furthestRight += 1
		}

		areaWithCurrentBuilding := (furthestRight - furthestLeft + 1) * currentHeight
		maxArea = max(areaWithCurrentBuilding, maxArea)
	}

	return maxArea
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space - where n is the number of buildings
func LargestRectangleUnderSkyline(buildings []int) int {
	pillarIndices := []int{}
	var maxArea = 0

	extendedBuildings := append(buildings, 0)
	for idx := range extendedBuildings {
		height := extendedBuildings[idx]
		for len(pillarIndices) != 0 && buildings[pillarIndices[len(pillarIndices)-1]] >= height {
			var pillarIndex int
			pillarIndex, pillarIndices = pillarIndices[len(pillarIndices)-1], pillarIndices[:len(pillarIndices)-1]
			pillarHeight := buildings[pillarIndex]
			width := idx
			if len(pillarIndices) != 0 {
				width = idx - pillarIndices[len(pillarIndices)-1] - 1
			}
			maxArea = max(width*pillarHeight, maxArea)
		}

		pillarIndices = append(pillarIndices, idx)
	}

	return maxArea
}

func max(a, b int) int {
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
	input := []int{1, 3, 3, 2, 4, 1, 5, 3, 2}
	expected := 9
	actual := LargestRectangleUnderSkyline(input)
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
    ArrayList<Integer> input = new ArrayList<Integer>(Arrays.asList(1, 3, 3, 2, 4, 1, 5, 3, 2));
    int expected = 9;
    var actual = new Program().largestRectangleUnderSkyline(input);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n^2) time | O(1) space - where n is the number of buildings
  public int largestRectangleUnderSkyline(ArrayList<Integer> buildings) {
    int maxArea = 0;
    for (int pillarIdx = 0; pillarIdx < buildings.size(); pillarIdx++) {
      int currentHeight = buildings.get(pillarIdx);

      int furthestLeft = pillarIdx;
      while (furthestLeft > 0 && buildings.get(furthestLeft - 1) >= currentHeight) {
        furthestLeft -= 1;
      }

      int furthestRight = pillarIdx;
      while (furthestRight < buildings.size() - 1
          && buildings.get(furthestRight + 1) >= currentHeight) {
        furthestRight += 1;
      }

      int areaWithCurrentBuilding = (furthestRight - furthestLeft + 1) * currentHeight;
      maxArea = Math.max(areaWithCurrentBuilding, maxArea);
    }

    return maxArea;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n) time | O(n) space - where n is the number of buildings
  public int largestRectangleUnderSkyline(ArrayList<Integer> buildings) {
    Stack<Integer> pillarIndices = new Stack<Integer>();
    int maxArea = 0;

    ArrayList<Integer> extendedBuildings = new ArrayList<Integer>(buildings);
    extendedBuildings.add(0);
    for (int idx = 0; idx < extendedBuildings.size(); idx++) {
      int height = extendedBuildings.get(idx);
      while (!pillarIndices.isEmpty() && extendedBuildings.get(pillarIndices.peek()) >= height) {
        int pillarHeight = extendedBuildings.get(pillarIndices.pop());
        int width = (pillarIndices.isEmpty()) ? idx : idx - pillarIndices.peek() - 1;
        maxArea = Math.max(width * pillarHeight, maxArea);
      }

      pillarIndices.push(idx);
    }

    return maxArea;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    ArrayList<Integer> input = new ArrayList<Integer>(Arrays.asList(1, 3, 3, 2, 4, 1, 5, 3, 2));
    int expected = 9;
    var actual = new Program().largestRectangleUnderSkyline(input);
    Utils.assertTrue(expected == actual);
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
  const input = [1, 3, 3, 2, 4, 1, 5, 3, 2];
  const expected = 9;
  const actual = program.largestRectangleUnderSkyline(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(1) space - where n is the number of buildings
function largestRectangleUnderSkyline(buildings) {
  let maxArea = 0;
  for (let pillarIdx = 0; pillarIdx < buildings.length; pillarIdx++) {
    const currentHeight = buildings[pillarIdx];

    let furthestLeft = pillarIdx;
    while (furthestLeft > 0 && buildings[furthestLeft - 1] >= currentHeight) {
      furthestLeft--;
    }

    let furthestRight = pillarIdx;
    while (furthestLeft < buildings.length - 1 && buildings[furthestRight + 1] >= currentHeight) {
      furthestRight++;
    }

    const areaWithCurrentBuilding = (furthestRight - furthestLeft + 1) * currentHeight;
    maxArea = Math.max(areaWithCurrentBuilding, maxArea);
  }

  return maxArea;
}

// Do not edit the line below.
exports.largestRectangleUnderSkyline = largestRectangleUnderSkyline;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the number of buildings
function largestRectangleUnderSkyline(buildings) {
  const pillarIndices = [];
  let maxArea = 0;

  const extendedBuildings = buildings.concat([0]);
  for (let idx = 0; idx < extendedBuildings.length; idx++) {
    const height = extendedBuildings[idx];
    while (pillarIndices.length !== 0 && extendedBuildings[pillarIndices[pillarIndices.length - 1]] >= height) {
      const pillarHeight = extendedBuildings[pillarIndices.pop()];
      const width = pillarIndices.length === 0 ? idx : idx - pillarIndices[pillarIndices.length - 1] - 1;
      maxArea = Math.max(width * pillarHeight, maxArea);
    }
    pillarIndices.push(idx);
  }

  return maxArea;
}

// Do not edit the line below.
exports.largestRectangleUnderSkyline = largestRectangleUnderSkyline;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [1, 3, 3, 2, 4, 1, 5, 3, 2];
  const expected = 9;
  const actual = program.largestRectangleUnderSkyline(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.largestRectangleUnderSkyline

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(1, 3, 3, 2, 4, 1, 5, 3, 2)
        val expected = 9
        val output = largestRectangleUnderSkyline(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(n^2) time | O(1) space - where n is the number of buildings
fun largestRectangleUnderSkyline(buildings: List<Int>): Int {
    var maxArea = 0
    for (pillarIdx in 0 until buildings.size) {
        val currentHeight = buildings[pillarIdx]

        var furthestLeft = pillarIdx
        while (furthestLeft > 0 && buildings[furthestLeft - 1] >= currentHeight) {
            furthestLeft -= 1
        }

        var furthestRight = pillarIdx
        while (furthestRight < buildings.size - 1 && buildings[furthestRight + 1] >= currentHeight) {
            furthestRight += 1
        }

        val areaWithCurrentBuilding = (furthestRight - furthestLeft + 1) * currentHeight
        maxArea = max(areaWithCurrentBuilding, maxArea)
    }

    return maxArea
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(n) time | O(n) space - where n is the number of buildings
fun largestRectangleUnderSkyline(buildings: List<Int>): Int {
    val pillarIndices = mutableListOf<Int>()
    var maxArea = 0

    val extendedBuildings = buildings.plus(listOf(0))
    for (idx in 0 until extendedBuildings.size) {
        val height = extendedBuildings[idx]
        while (pillarIndices.size != 0 && buildings[pillarIndices[pillarIndices.size - 1]] >= height) {
            val pillarHeight = buildings[pillarIndices.removeAt(pillarIndices.size - 1)]
            val width = if (pillarIndices.size == 0) idx else idx - pillarIndices[pillarIndices.size - 1] - 1
            maxArea = max(width * pillarHeight, maxArea)
        }

        pillarIndices.add(idx)
    }

    return maxArea
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.largestRectangleUnderSkyline

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(1, 3, 3, 2, 4, 1, 5, 3, 2)
        val expected = 9
        val output = largestRectangleUnderSkyline(input)
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
      let input = [1, 3, 3, 2, 4, 1, 5, 3, 2]
      let expected = 9
      var actual = Program().largestRectangleUnderSkyline(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(1) space - where n is the number of buildings
  func largestRectangleUnderSkyline(_ buildings: [Int]) -> Int {
    var maxArea = 0
    for pillarIdx in stride(from: 0, to: buildings.count, by: 1) {
      let currentHeight = buildings[pillarIdx]

      var furthestLeft = pillarIdx
      while furthestLeft > 0, buildings[furthestLeft - 1] >= currentHeight {
        furthestLeft -= 1
      }

      var furthestRight = pillarIdx
      while furthestRight < buildings.count - 1, buildings[furthestRight + 1] >= currentHeight {
        furthestRight += 1
      }

      let areaWithCurrentBuilding = (furthestRight - furthestLeft + 1) * currentHeight
      maxArea = max(areaWithCurrentBuilding, maxArea)
    }

    return maxArea
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the number of buildings
  func largestRectangleUnderSkyline(_ buildings: [Int]) -> Int {
    var pillarIndices = [Int]()
    var maxArea = 0

    var extendedBuildings = buildings
    extendedBuildings.append(0)
    for (idx, height) in extendedBuildings.enumerated() {
      while pillarIndices.count != 0, buildings[pillarIndices[pillarIndices.count - 1]] >= height {
        let pillarHeight = buildings[pillarIndices.removeLast()]
        var width = idx
        if pillarIndices.count != 0 {
          width = idx - pillarIndices[pillarIndices.count - 1] - 1
        }
        maxArea = max(width * pillarHeight, maxArea)
      }

      pillarIndices.append(idx)
    }

    return maxArea
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let input = [1, 3, 3, 2, 4, 1, 5, 3, 2]
      let expected = 9
      var actual = Program().largestRectangleUnderSkyline(input)
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
        input = [1, 3, 3, 2, 4, 1, 5, 3, 2]
        expected = 9
        actual = program.largestRectangleUnderSkyline(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(1) space - where n is the number of buildings
def largestRectangleUnderSkyline(buildings):
    maxArea = 0
    for pillarIdx in range(len(buildings)):
        currentHeight = buildings[pillarIdx]

        furthestLeft = pillarIdx
        while furthestLeft > 0 and buildings[furthestLeft - 1] >= currentHeight:
            furthestLeft -= 1

        furthestRight = pillarIdx
        while furthestRight < len(buildings) - 1 and buildings[furthestRight + 1] >= currentHeight:
            furthestRight += 1

        areaWithCurrentBuilding = (furthestRight - furthestLeft + 1) * currentHeight
        maxArea = max(areaWithCurrentBuilding, maxArea)

    return maxArea

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the number of buildings
def largestRectangleUnderSkyline(buildings):
    pillarIndices = []
    maxArea = 0

    for idx, height in enumerate(buildings + [0]):
        while len(pillarIndices) != 0 and buildings[pillarIndices[len(pillarIndices) - 1]] >= height:
            pillarHeight = buildings[pillarIndices.pop()]
            width = idx if len(pillarIndices) == 0 else idx - pillarIndices[len(pillarIndices) - 1] - 1
            maxArea = max(width * pillarHeight, maxArea)

        pillarIndices.append(idx)

    return maxArea

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [1, 3, 3, 2, 4, 1, 5, 3, 2]
        expected = 9
        actual = program.largestRectangleUnderSkyline(input)
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
  const input = [1, 3, 3, 2, 4, 1, 5, 3, 2];
  const expected = 9;
  const actual = program.largestRectangleUnderSkyline(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(1) space - where n is the number of buildings
export function largestRectangleUnderSkyline(buildings: number[]) {
  let maxArea = 0;
  for (let pillarIdx = 0; pillarIdx < buildings.length; pillarIdx++) {
    const currentHeight = buildings[pillarIdx];

    let furthestLeft = pillarIdx;
    while (furthestLeft > 0 && buildings[furthestLeft - 1] >= currentHeight) {
      furthestLeft--;
    }

    let furthestRight = pillarIdx;
    while (furthestLeft < buildings.length - 1 && buildings[furthestRight + 1] >= currentHeight) {
      furthestRight++;
    }

    const areaWithCurrentBuilding = (furthestRight - furthestLeft + 1) * currentHeight;
    maxArea = Math.max(areaWithCurrentBuilding, maxArea);
  }

  return maxArea;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the number of buildings
export function largestRectangleUnderSkyline(buildings: number[]) {
  const pillarIndices: number[] = [];
  let maxArea = 0;

  const extendedBuildings = buildings.concat([0]);
  for (let idx = 0; idx < extendedBuildings.length; idx++) {
    const height = extendedBuildings[idx];
    while (pillarIndices.length !== 0 && extendedBuildings[pillarIndices[pillarIndices.length - 1]] >= height) {
      const pillarHeight = extendedBuildings[pillarIndices.pop()!];
      const width = pillarIndices.length === 0 ? idx : idx - pillarIndices[pillarIndices.length - 1] - 1;
      maxArea = Math.max(width * pillarHeight, maxArea);
    }
    pillarIndices.push(idx);
  }

  return maxArea;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [1, 3, 3, 2, 4, 1, 5, 3, 2];
  const expected = 9;
  const actual = program.largestRectangleUnderSkyline(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

