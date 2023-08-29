# Sunset Views
<div class="html">
<p>
  Given an array of buildings and a direction that all of the buildings face,
  return an array of the indices of the buildings that can see the sunset.
</p>
<p>
  A building can see the sunset if it's strictly taller than all of the
  buildings that come after it in the direction that it faces.
</p>
<p>
  The input array named <span>buildings</span> contains positive, non-zero
  integers representing the heights of the buildings. A building at index
  <span>i</span> thus has a height denoted by <span>buildings[i]</span>. All of
  the buildings face the same direction, and this direction is either east or
  west, denoted by the input string named <span>direction</span>, which will
  always be equal to either <span>"EAST"</span> or <span>"WEST"</span>. In
  relation to the input array, you can interpret these directions as right for
  east and left for west.
</p>
<p>
  Important note: the indices in the ouput array should be sorted in ascending
  order.
</p>
<h3>Sample Input #1</h3>
<pre>
<span class="CodeEditor-promptParameter">buildings</span> = [3, 5, 4, 4, 3, 1, 3, 2]
<span class="CodeEditor-promptParameter">direction</span> = "EAST"
</pre>
<h3>Sample Output #1</h3>
<pre>
[1, 3, 6, 7]

<span class="CodeEditor-promptComment">// Below is a visual representation of the sample input.</span>
<span class="CodeEditor-promptComment">//    _</span>
<span class="CodeEditor-promptComment">//   | |_ _</span>
<span class="CodeEditor-promptComment">//  _| | | |_   _</span>
<span class="CodeEditor-promptComment">// | | | | | | | |_</span>
<span class="CodeEditor-promptComment">// | | | | | |_| | |</span>
<span class="CodeEditor-promptComment">// |_|_|_|_|_|_|_|_|</span>
</pre>
<h3>Sample Input #2</h3>
<pre>
<span class="CodeEditor-promptParameter">buildings</span> = [3, 5, 4, 4, 3, 1, 3, 2]
<span class="CodeEditor-promptParameter">direction</span> = "WEST"
</pre>
<h3>Sample Output #2</h3>
<pre>
[0, 1]

<span class="CodeEditor-promptComment">// The buildings are the same as in the first sample</span>
<span class="CodeEditor-promptComment">// input, but their direction is reversed.</span>
</pre>
</div>

Hint 1
<p>
Is there a way to solve this problem in one loop?
</p>


Hint 2

<p>
How does your solution change based on the direction that the buildings are facing? You can use the same approach for each direction by simply changing the direction in which you traverse the array of buildings.
</p>


Hint 3

<p>
There are multiple ways to solve this problem, but one is to maintain a running maximum of building heights. Loop in the opposite direction that the buildings are facing, and keep track of the maximum building height that you've seen. At each iteration, compare the height of the current building to the running maximum; if the current building is taller, then it can see the sunset; otherwise, it can't. Finally, at each iteration, update the running maximum.
</p>


Hint 4

<p>
Another way to solve this problem is to use a stack. Loop in the direction that the buildings are facing, and add the index of the current building to the stack at the end of each iteration. Before adding elements to the stack, compare the current building height to buildings at the top of the stack. Pop off the top of the stack until the current building height is shorter than the height of the building at the top of the stack. This will remove all buildings that are blocked from seeing the sunset by the current building. At the end of the algorithm, the stack will only contain elements that can see the sunset.
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
      vector<int> buildings = {3, 5, 4, 4, 3, 1, 3, 2};
      string direction = "EAST";
      vector<int> expected = {1, 3, 6, 7};
      vector<int> actual = sunsetViews(buildings, direction);
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

// O(n) time | O(n) space - where n is the length of the input array
vector<int> sunsetViews(vector<int> buildings, string direction) {
  vector<int> buildingsWithSunsetViews;

  int startIdx = buildings.size() - 1;
  int step = -1;

  if (direction == "WEST") {
    startIdx = 0;
    step = 1;
  }

  int idx = startIdx;
  int runningMaxHeight = 0;

  while (idx >= 0 && idx < buildings.size()) {
    int buildingHeight = buildings[idx];

    if (buildingHeight > runningMaxHeight) {
      buildingsWithSunsetViews.push_back(idx);
    }

    runningMaxHeight = max(runningMaxHeight, buildingHeight);

    idx += step;
  }

  if (direction == "EAST") {
    reverse(buildingsWithSunsetViews.begin(), buildingsWithSunsetViews.end());
  }

  return buildingsWithSunsetViews;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <algorithm>
using namespace std;

// O(n) time | O(n) space - where n is the length of the input array
vector<int> sunsetViews(vector<int> buildings, string direction) {
  vector<int> candidateBuildings;

  int startIdx = buildings.size() - 1;
  int step = -1;

  if (direction == "EAST") {
    startIdx = 0;
    step = 1;
  }

  int idx = startIdx;
  while (idx >= 0 && idx < buildings.size()) {
    int buildingHeight = buildings[idx];

    while (candidateBuildings.size() > 0 &&
           buildings[candidateBuildings[candidateBuildings.size() - 1]] <=
               buildingHeight) {
      candidateBuildings.pop_back();
    }

    candidateBuildings.push_back(idx);

    idx += step;
  }

  if (direction == "WEST") {
    reverse(candidateBuildings.begin(), candidateBuildings.end());
  }

  return candidateBuildings;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> buildings = {3, 5, 4, 4, 3, 1, 3, 2};
      string direction = "EAST";
      vector<int> expected = {1, 3, 6, 7};
      vector<int> actual = sunsetViews(buildings, direction);
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
using System.Linq;
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] buildings = new int[] {3, 5, 4, 4, 3, 1, 3, 2};
		string direction = "EAST";
		List<int> expected = new List<int>();
		expected.Add(1);
		expected.Add(3);
		expected.Add(6);
		expected.Add(7);
		var actual = new Program().SunsetViews(buildings, direction);
		Utils.AssertTrue(Enumerable.SequenceEqual(expected, actual));
	}
}


```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {

	// O(n) time | O(n) space - where n is the length of the input array
	public List<int> SunsetViews(int[] buildings, string direction) {
		List<int> buildingsWithSunsetViews = new List<int>();

		int startIdx = buildings.Length - 1;
		int step = -1;

		if (direction.Equals("WEST")) {
			startIdx = 0;
			step = 1;
		}

		int idx = startIdx;
		int runningMaxHeight = 0;

		while (idx >= 0 && idx < buildings.Length) {
			int buildingHeight = buildings[idx];

			if (buildingHeight  > runningMaxHeight) {
				buildingsWithSunsetViews.Add(idx);
			}

			runningMaxHeight = Math.Max(runningMaxHeight, buildingHeight);

			idx += step;
		}

		if (direction.Equals("EAST")) {
			buildingsWithSunsetViews.Reverse();
		}

		return buildingsWithSunsetViews;
	}
}


```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {

	// O(n) time | O(n) space - where n is the length of the input array
	public List<int> SunsetViews(int[] buildings, string direction) {
		List<int> candidateBuildings = new List<int>();

		int startIdx = buildings.Length - 1;
		int step = -1;

		if (direction.Equals("EAST")) {
			startIdx = 0;
			step = 1;
		}

		int idx = startIdx;
		while (idx >= 0 && idx < buildings.Length) {
			int buildingHeight = buildings[idx];

			while (candidateBuildings.Count > 0 &&
			  buildings[candidateBuildings[candidateBuildings.Count - 1]] <=
			  buildingHeight) {
				candidateBuildings.RemoveAt(candidateBuildings.Count - 1);
			}

			candidateBuildings.Add(idx);

			idx += step;
		}

		if (direction.Equals("WEST")) {
			candidateBuildings.Reverse();
		}

		return candidateBuildings;
	}
}


```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;
using System.Linq;
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] buildings = new int[] {3, 5, 4, 4, 3, 1, 3, 2};
		string direction = "EAST";
		List<int> expected = new List<int>();
		expected.Add(1);
		expected.Add(3);
		expected.Add(6);
		expected.Add(7);
		var actual = new Program().SunsetViews(buildings, direction);
		Utils.AssertTrue(Enumerable.SequenceEqual(expected, actual));
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
	buildings := []int{3, 5, 4, 4, 3, 1, 3, 2}
	direction := "EAST"
	expected := []int{1, 3, 6, 7}
	actual := SunsetViews(buildings, direction)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space - where n is the length of the input array
func SunsetViews(buildings []int, direction string) []int {
	buildingsWithSunsetViews := make([]int, 0)

	startIdx := len(buildings) - 1
	step := -1
	if direction == "WEST" {
		startIdx = 0
		step = 1
	}

	idx := startIdx
	runningMaxHeight := 0
	for idx >= 0 && idx < len(buildings) {
		buildingHeight := buildings[idx]

		if buildingHeight > runningMaxHeight {
			buildingsWithSunsetViews = append(buildingsWithSunsetViews, idx)
		}

		runningMaxHeight = max(runningMaxHeight, buildingHeight)

		idx += step
	}

	if direction == "EAST" {
		reverse(buildingsWithSunsetViews)
	}

	return buildingsWithSunsetViews
}

func reverse(array []int) {
	l := len(array) - 1
	for i := 0; i < len(array)/2; i++ {
		array[i], array[l-i] = array[l-i], array[i]
	}
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

// O(n) time | O(n) space - where n is the length of the input array
func SunsetViews(buildings []int, direction string) []int {
	candidateBuildings := make([]int, 0)

	startIdx := len(buildings) - 1
	step := -1
	if direction == "EAST" {
		startIdx = 0
		step = 1
	}

	var idx = startIdx
	for idx >= 0 && idx < len(buildings) {
		buildingHeight := buildings[idx]

		for len(candidateBuildings) > 0 && buildings[candidateBuildings[len(candidateBuildings)-1]] <= buildingHeight {
			candidateBuildings = candidateBuildings[:len(candidateBuildings)-1]
		}

		candidateBuildings = append(candidateBuildings, idx)
		idx += step
	}

	if direction == "WEST" {
		reverse(candidateBuildings)
	}

	return candidateBuildings
}

func reverse(array []int) {
	l := len(array) - 1
	for i := 0; i < len(array)/2; i++ {
		array[i], array[l-i] = array[l-i], array[i]
	}
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
	buildings := []int{3, 5, 4, 4, 3, 1, 3, 2}
	direction := "EAST"
	expected := []int{1, 3, 6, 7}
	actual := SunsetViews(buildings, direction)
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
    int[] buildings = new int[] {3, 5, 4, 4, 3, 1, 3, 2};
    String direction = "EAST";
    ArrayList<Integer> expected = new ArrayList<Integer>();
    expected.add(1);
    expected.add(3);
    expected.add(6);
    expected.add(7);
    var actual = new Program().sunsetViews(buildings, direction);
    Utils.assertTrue(expected.equals(actual));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n) time | O(n) space - where n is the length of the input array
  public ArrayList<Integer> sunsetViews(int[] buildings, String direction) {
    ArrayList<Integer> buildingsWithSunsetViews = new ArrayList<Integer>();

    int startIdx = buildings.length - 1;
    int step = -1;

    if (direction.equals("WEST")) {
      startIdx = 0;
      step = 1;
    }

    int idx = startIdx;
    int runningMaxHeight = 0;

    while (idx >= 0 && idx < buildings.length) {
      int buildingHeight = buildings[idx];

      if (buildingHeight > runningMaxHeight) {
        buildingsWithSunsetViews.add(idx);
      }

      runningMaxHeight = Math.max(runningMaxHeight, buildingHeight);

      idx += step;
    }

    if (direction.equals("EAST")) {
      Collections.reverse(buildingsWithSunsetViews);
    }

    return buildingsWithSunsetViews;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n) time | O(n) space - where n is the length of the input array
  public ArrayList<Integer> sunsetViews(int[] buildings, String direction) {
    ArrayList<Integer> candidateBuildings = new ArrayList<Integer>();

    int startIdx = buildings.length - 1;
    int step = -1;

    if (direction.equals("EAST")) {
      startIdx = 0;
      step = 1;
    }

    int idx = startIdx;
    while (idx >= 0 && idx < buildings.length) {
      int buildingHeight = buildings[idx];

      while (candidateBuildings.size() > 0
          && buildings[candidateBuildings.get(candidateBuildings.size() - 1)] <= buildingHeight) {
        candidateBuildings.remove(candidateBuildings.size() - 1);
      }

      candidateBuildings.add(idx);

      idx += step;
    }

    if (direction.equals("WEST")) {
      Collections.reverse(candidateBuildings);
    }

    return candidateBuildings;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[] buildings = new int[] {3, 5, 4, 4, 3, 1, 3, 2};
    String direction = "EAST";
    ArrayList<Integer> expected = new ArrayList<Integer>();
    expected.add(1);
    expected.add(3);
    expected.add(6);
    expected.add(7);
    var actual = new Program().sunsetViews(buildings, direction);
    Utils.assertTrue(expected.equals(actual));
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
  const buildings = [3, 5, 4, 4, 3, 1, 3, 2];
  const direction = 'EAST';
  const expected = [1, 3, 6, 7];
  const actual = program.sunsetViews(buildings, direction);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input array
function sunsetViews(buildings, direction) {
  const buildingsWithSunsetViews = [];

  const startIdx = direction === 'WEST' ? 0 : buildings.length - 1;
  const step = direction === 'WEST' ? 1 : -1;

  let idx = startIdx;
  let runningMaxHeight = 0;
  while (idx >= 0 && idx < buildings.length) {
    const buildingHeight = buildings[idx];

    if (buildingHeight > runningMaxHeight) buildingsWithSunsetViews.push(idx);

    runningMaxHeight = Math.max(runningMaxHeight, buildingHeight);

    idx = idx + step;
  }

  if (direction === 'EAST') buildingsWithSunsetViews.reverse();

  return buildingsWithSunsetViews;
}

// Do not edit the line below.
exports.sunsetViews = sunsetViews;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input array
function sunsetViews(buildings, direction) {
  const candidateBuildings = [];

  const startIdx = direction === 'EAST' ? 0 : buildings.length - 1;
  const step = direction === 'EAST' ? 1 : -1;

  let idx = startIdx;
  while (idx >= 0 && idx < buildings.length) {
    const buildingHeight = buildings[idx];

    while (
      candidateBuildings.length > 0 &&
      buildings[candidateBuildings[candidateBuildings.length - 1]] <= buildingHeight
    ) {
      candidateBuildings.pop();
    }

    candidateBuildings.push(idx);

    idx = idx + step;
  }

  if (direction === 'WEST') candidateBuildings.reverse();

  return candidateBuildings;
}

// Do not edit the line below.
exports.sunsetViews = sunsetViews;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const buildings = [3, 5, 4, 4, 3, 1, 3, 2];
  const direction = 'EAST';
  const expected = [1, 3, 6, 7];
  const actual = program.sunsetViews(buildings, direction);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.sunsetViews

class ProgramTest {
    @Test
    fun TestCase1() {
        val buildings = listOf(3, 5, 4, 4, 3, 1, 3, 2)
        val direction = "EAST"
        val expected = listOf(1, 3, 6, 7)
        val actual = sunsetViews(buildings, direction)
        assert(expected == actual)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(n) time | O(n) space - where n is the length of the input array
fun sunsetViews(buildings: List<Int>, direction: String): List<Int> {
    val buildingsWithSunsetViews = mutableListOf<Int>()

    val startIdx = if (direction == "WEST") 0 else buildings.size - 1
    val step = if (direction == "WEST") 1 else -1

    var idx = startIdx
    var runningMaxHeight = 0
    while (idx >= 0 && idx < buildings.size) {
        val buildingHeight = buildings[idx]

        if (buildingHeight > runningMaxHeight) buildingsWithSunsetViews.add(idx)

        runningMaxHeight = max(runningMaxHeight, buildingHeight)

        idx += step
    }

    if (direction == "EAST") buildingsWithSunsetViews.reverse()

    return buildingsWithSunsetViews
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(n) space - where n is the length of the input array
fun sunsetViews(buildings: List<Int>, direction: String): List<Int> {
    val candidateBuildings = mutableListOf<Int>()

    val startIdx = if (direction == "EAST") 0 else buildings.size - 1
    val step = if (direction == "EAST") 1 else -1

    var idx = startIdx
    while (idx >= 0 && idx < buildings.size) {
        val buildingHeight = buildings[idx]

        while (candidateBuildings.size > 0 && buildings[candidateBuildings[candidateBuildings.size - 1]] <= buildingHeight) {
            candidateBuildings.removeAt(candidateBuildings.size - 1)
        }

        candidateBuildings.add(idx)

        idx += step
    }

    if (direction == "WEST") candidateBuildings.reverse()

    return candidateBuildings
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.sunsetViews

class ProgramTest {
    @Test
    fun TestCase1() {
        val buildings = listOf(3, 5, 4, 4, 3, 1, 3, 2)
        val direction = "EAST"
        val expected = listOf(1, 3, 6, 7)
        val actual = sunsetViews(buildings, direction)
        assert(expected == actual)
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
      let buildings = [3, 5, 4, 4, 3, 1, 3, 2]
      let direction = "EAST"
      let expected = [1, 3, 6, 7]
      var actual = Program().sunsetViews(buildings, direction)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the length of the input array
  func sunsetViews(_ buildings: [Int], _ direction: String) -> [Int] {
    var buildingsWithSunsetViews = [Int]()

    var startIdx = buildings.count - 1
    var step = -1
    if direction == "WEST" {
      startIdx = 0
      step = 1
    }

    var idx = startIdx
    var runningMaxHeight = 0
    while idx >= 0, idx < buildings.count {
      let buildingHeight = buildings[idx]

      if buildingHeight > runningMaxHeight {
        buildingsWithSunsetViews.append(idx)
      }

      runningMaxHeight = max(runningMaxHeight, buildingHeight)

      idx += step
    }

    if direction == "EAST" {
      buildingsWithSunsetViews.reverse()
    }

    return buildingsWithSunsetViews
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the length of the input array
  func sunsetViews(_ buildings: [Int], _ direction: String) -> [Int] {
    var candidateBuildings = [Int]()

    var startIdx = buildings.count - 1
    var step = -1
    if direction == "EAST" {
      startIdx = 0
      step = 1
    }

    var idx = startIdx
    while idx >= 0, idx < buildings.count {
      let buildingHeight = buildings[idx]

      while candidateBuildings.count > 0, buildings[candidateBuildings[candidateBuildings.count - 1]] <= buildingHeight {
        candidateBuildings.removeLast()
      }

      candidateBuildings.append(idx)
      idx += step
    }

    if direction == "WEST" {
      candidateBuildings.reverse()
    }

    return candidateBuildings
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let buildings = [3, 5, 4, 4, 3, 1, 3, 2]
      let direction = "EAST"
      let expected = [1, 3, 6, 7]
      var actual = Program().sunsetViews(buildings, direction)
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
        buildings = [3, 5, 4, 4, 3, 1, 3, 2]
        direction = "EAST"
        expected = [1, 3, 6, 7]
        actual = program.sunsetViews(buildings, direction)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the length of the input array
def sunsetViews(buildings, direction):
    buildingsWithSunsetViews = []

    startIdx = 0 if direction == "WEST" else len(buildings) - 1
    step = 1 if direction == "WEST" else -1

    idx = startIdx
    runningMaxHeight = 0
    while idx >= 0 and idx < len(buildings):
        buildingHeight = buildings[idx]

        if buildingHeight > runningMaxHeight:
            buildingsWithSunsetViews.append(idx)

        runningMaxHeight = max(runningMaxHeight, buildingHeight)

        idx += step

    if direction == "EAST":
        return buildingsWithSunsetViews[::-1]

    return buildingsWithSunsetViews

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the length of the input array
def sunsetViews(buildings, direction):
    candidateBuildings = []

    startIdx = 0 if direction == "EAST" else len(buildings) - 1
    step = 1 if direction == "EAST" else -1

    idx = startIdx
    while idx >= 0 and idx < len(buildings):
        buildingHeight = buildings[idx]

        while len(candidateBuildings) > 0 and buildings[candidateBuildings[-1]] <= buildingHeight:
            candidateBuildings.pop()

        candidateBuildings.append(idx)

        idx += step

    if direction == "WEST":
        return candidateBuildings[::-1]

    return candidateBuildings

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        buildings = [3, 5, 4, 4, 3, 1, 3, 2]
        direction = "EAST"
        expected = [1, 3, 6, 7]
        actual = program.sunsetViews(buildings, direction)
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
  const buildings = [3, 5, 4, 4, 3, 1, 3, 2];
  const direction = program.Direction.East;
  const expected = [1, 3, 6, 7];
  const actual = program.sunsetViews(buildings, direction);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

export enum Direction {
  East = 'EAST',
  West = 'WEST',
}

// O(n) time | O(n) space - where n is the length of the input array
export function sunsetViews(buildings: number[], direction: Direction) {
  const buildingsWithSunsetViews: number[] = [];

  const startIdx = direction === Direction.West ? 0 : buildings.length - 1;
  const step = direction === Direction.West ? 1 : -1;

  let idx = startIdx;
  let runningMaxHeight = 0;
  while (idx >= 0 && idx < buildings.length) {
    const buildingHeight = buildings[idx];

    if (buildingHeight > runningMaxHeight) buildingsWithSunsetViews.push(idx);

    runningMaxHeight = Math.max(runningMaxHeight, buildingHeight);

    idx = idx + step;
  }

  if (direction === Direction.East) buildingsWithSunsetViews.reverse();

  return buildingsWithSunsetViews;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

export enum Direction {
  East = 'EAST',
  West = 'WEST',
}

// O(n) time | O(n) space - where n is the length of the input array
export function sunsetViews(buildings: number[], direction: Direction) {
  const candidateBuildings: number[] = [];

  const startIdx = direction === Direction.East ? 0 : buildings.length - 1;
  const step = direction === Direction.East ? 1 : -1;

  let idx = startIdx;
  while (idx >= 0 && idx < buildings.length) {
    const buildingHeight = buildings[idx];

    while (
      candidateBuildings.length > 0 &&
      buildings[candidateBuildings[candidateBuildings.length - 1]] <= buildingHeight
    ) {
      candidateBuildings.pop();
    }

    candidateBuildings.push(idx);

    idx = idx + step;
  }

  if (direction === Direction.West) candidateBuildings.reverse();

  return candidateBuildings;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const buildings = [3, 5, 4, 4, 3, 1, 3, 2];
  const direction = program.Direction.East;
  const expected = [1, 3, 6, 7];
  const actual = program.sunsetViews(buildings, direction);
  chai.expect(actual).to.deep.equal(expected);
});

```

