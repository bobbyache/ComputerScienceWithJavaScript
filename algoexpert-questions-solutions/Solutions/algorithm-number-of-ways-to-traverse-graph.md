# Number Of Ways To Traverse Graph
<div class="html">
<p>
  You're given two positive integers representing the width and height of a
  grid-shaped, rectangular graph. Write a function that returns the number of
  ways to reach the bottom right corner of the graph when starting at the top
  left corner. Each move you take must either go down or right. In other words,
  you can never move up or left in the graph.
</p>
<p>
  For example, given the graph illustrated below, with
  <span>width = 2</span> and <span>height = 3</span>, there are three ways to
  reach the bottom right corner when starting at the top left corner:
</p>
<pre>
 _ _
|_|_|
|_|_|
|_|_|
</pre>
<ol>
  <li>Down, Down, Right</li>
  <li>Right, Down, Down</li>
  <li>Down, Right, Down</li>
</ol>
<p>
  Note: you may assume that <span>width * height >= 2</span>. In other words,
  the graph will never be a 1x1 grid.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">width</span> = 4
<span class="CodeEditor-promptParameter">height</span> = 3
</pre>
<h3>Sample Output</h3>
<pre>
10
</pre>
</div>

Hint 1
<p>
  Think recursively. How many positions in the graph can access the bottom right
  corner of the graph? In other words, what positions do you need to reach
  before you can reach the bottom right corner?
</p>


Hint 2

<p>
  The number of ways to reach any position in the graph is equal to the number
  of ways to reach the position directly above it plus the number of ways to
  reach the position directly to its left. This is because you can only travel
  down and right.
</p>


Hint 3

<p>
  Using the information in Hints #1 and #2, can you come up with an efficient
  way to solve this problem that doesn't repeatedly perform the same work? What
  does a dynamic-programming implementation look like?
</p>


Hint 4

<p>
  To efficiency solve this problem, simply loop through the entire graph, column
  by column, row by row, and calculate the number of ways to reach each
  position. If you're on the top or left edge of the graph, there's only one way
  to reach your position. If you're anywhere else in the graph, the number of
  ways to reach your position is the number of ways to reach the position
  directly above it plus the number of ways to reach the position directly to
  its left (which you've already calculated and should be storing). Every time
  you calculate the number of ways to reach a position, store the answer so that
  you can use it later in the calculation of other positions.
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
      auto width = 4;
      auto height = 3;
      auto expected = 10;
      auto actual = numberOfWaysToTraverseGraph(width, height);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// O(2^(n + m)) time | O(n + m) space - where n
// is the width of the graph and m is the height
int numberOfWaysToTraverseGraph(int width, int height) {
  if (width == 1 || height == 1)
    return 1;

  return numberOfWaysToTraverseGraph(width - 1, height) +
         numberOfWaysToTraverseGraph(width, height - 1);
}
```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

// O(n * m) time | O(n * m) space - where n
// is the width of the graph and m is the height
int numberOfWaysToTraverseGraph(int width, int height) {
  vector<vector<int>> numberOfWays;
  for (int i = 0; i < height + 1; i++) {
    numberOfWays.push_back(vector<int>{});
    for (int j = 0; j < width + 1; j++) {
      numberOfWays[i].push_back(0);
    }
  }

  for (int widthIdx = 1; widthIdx < width + 1; widthIdx++) {
    for (int heightIdx = 1; heightIdx < height + 1; heightIdx++) {
      if (widthIdx == 1 || heightIdx == 1) {
        numberOfWays[heightIdx][widthIdx] = 1;
      } else {
        int waysLeft = numberOfWays[heightIdx][widthIdx - 1];
        int waysUp = numberOfWays[heightIdx - 1][widthIdx];
        numberOfWays[heightIdx][widthIdx] = waysLeft + waysUp;
      }
    }
  }

  return numberOfWays[height][width];
}
```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

int factorial(int num);

// O(n + m) time | O(1) space - where n is
// the width of the graph and m is the height
int numberOfWaysToTraverseGraph(int width, int height) {
  int xDistanceToCorner = width - 1;
  int yDistanceToCorner = height - 1;

  // The number of permutations of right and down movements
  // is the number of ways to reach the bottom right corner.
  int numerator = factorial(xDistanceToCorner + yDistanceToCorner);
  int denominator = factorial(xDistanceToCorner) * factorial(yDistanceToCorner);
  return int(numerator / denominator);
}

int factorial(int num) {
  int result = 1;

  for (int n = 2; n < num + 1; n++) {
    result *= n;
  }

  return result;
}
```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      auto width = 4;
      auto height = 3;
      auto expected = 10;
      auto actual = numberOfWaysToTraverseGraph(width, height);
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
		int width = 4;
		int height = 3;
		int expected = 10;
		var actual = new Program().NumberOfWaysToTraverseGraph(width, height);
		Utils.AssertTrue(expected == actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	// O(2^(n + m)) time | O(n + m) space - where n
	// is the width of the graph and m is the height
	public int NumberOfWaysToTraverseGraph(int width, int height) {
		if (width == 1 || height == 1) {
			return 1;
		}

		return NumberOfWaysToTraverseGraph(width - 1, height) + NumberOfWaysToTraverseGraph(
			width, height - 1);
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	// O(n * m) time | O(n * m) space - where n
	// is the width of the graph and m is the height
	public int NumberOfWaysToTraverseGraph(int width, int height) {

		int[,] numberOfWays = new int[height + 1,width + 1];

		for (int widthIdx = 1; widthIdx < width + 1; widthIdx++) {
			for (int heightIdx = 1; heightIdx < height + 1; heightIdx++) {
				if (widthIdx == 1 || heightIdx == 1) {
					numberOfWays[heightIdx,widthIdx] = 1;
				} else {
					int waysLeft = numberOfWays[heightIdx,widthIdx - 1];
					int waysUp = numberOfWays[heightIdx - 1,widthIdx];
					numberOfWays[heightIdx,widthIdx] = waysLeft + waysUp;
				}
			}
		}

		return numberOfWays[height,width];
	}
}
```
### Solution 3 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	// O(n + m) time | O(1) space - where n is
	// the width of the graph and m is the height
	public int NumberOfWaysToTraverseGraph(int width, int height) {
		int xDistanceToCorner = width - 1;
		int yDistanceToCorner = height - 1;

		// The number of permutations of right and down movements
		// is the number of ways to reach the bottom right corner.
		int numerator = factorial(xDistanceToCorner + yDistanceToCorner);
		int denominator = factorial(xDistanceToCorner) * factorial(yDistanceToCorner);
		return numerator / denominator;
	}

	public int factorial(int num) {
		int result = 1;

		for (int n = 2; n < num + 1; n++) {
			result *= n;
		}

		return result;
	}
}
```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int width = 4;
		int height = 3;
		int expected = 10;
		var actual = new Program().NumberOfWaysToTraverseGraph(width, height);
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
	width := 4
	height := 3
	expected := 10
	actual := NumberOfWaysToTraverseGraph(width, height)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(2^(n + m)) time | O(n + m) space - where n
// is the width of the graph and m is the height
func NumberOfWaysToTraverseGraph(width int, height int) int {
	if width == 1 || height == 1 {
		return 1
	}

	return NumberOfWaysToTraverseGraph(width-1, height) + NumberOfWaysToTraverseGraph(width, height-1)
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n * m) time | O(n * m) space - where n
// is the width of the graph and m is the height
func NumberOfWaysToTraverseGraph(width int, height int) int {
	numberOfWays := make([][]int, height+1)
	for i := range numberOfWays {
		numberOfWays[i] = make([]int, width+1)
	}

	for widthIdx := 1; widthIdx < width+1; widthIdx++ {
		for heightIdx := 1; heightIdx < height+1; heightIdx++ {
			if widthIdx == 1 || heightIdx == 1 {
				numberOfWays[heightIdx][widthIdx] = 1
			} else {
				waysLeft := numberOfWays[heightIdx][widthIdx-1]
				waysUp := numberOfWays[heightIdx-1][widthIdx]
				numberOfWays[heightIdx][widthIdx] = waysLeft + waysUp
			}
		}
	}

	return numberOfWays[height][width]
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n + m) time | O(1) space - where n is
// the width of the graph and m is the height
func NumberOfWaysToTraverseGraph(width int, height int) int {
	xDistanceToCorner := width - 1
	yDistanceToCorner := height - 1

	// The number of permutations of right and down movements
	// is the number of ways to reach the bottom right corner.
	numerator := factorial(xDistanceToCorner + yDistanceToCorner)
	denominator := factorial(xDistanceToCorner) * factorial(yDistanceToCorner)
	return numerator / denominator
}

func factorial(num int) int {
	result := 1
	for n := 2; n < num+1; n++ {
		result *= n
	}
	return result
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	width := 4
	height := 3
	expected := 10
	actual := NumberOfWaysToTraverseGraph(width, height)
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
    int width = 4;
    int height = 3;
    int expected = 10;
    var actual = new Program().numberOfWaysToTraverseGraph(width, height);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(2^(n + m)) time | O(n + m) space - where n
  // is the width of the graph and m is the height
  public int numberOfWaysToTraverseGraph(int width, int height) {
    if (width == 1 || height == 1) {
      return 1;
    }

    return numberOfWaysToTraverseGraph(width - 1, height)
        + numberOfWaysToTraverseGraph(width, height - 1);
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n * m) time | O(n * m) space - where n
  // is the width of the graph and m is the height
  public int numberOfWaysToTraverseGraph(int width, int height) {

    int[][] numberOfWays = new int[height + 1][width + 1];

    for (int widthIdx = 1; widthIdx < width + 1; widthIdx++) {
      for (int heightIdx = 1; heightIdx < height + 1; heightIdx++) {
        if (widthIdx == 1 || heightIdx == 1) {
          numberOfWays[heightIdx][widthIdx] = 1;
        } else {
          int waysLeft = numberOfWays[heightIdx][widthIdx - 1];
          int waysUp = numberOfWays[heightIdx - 1][widthIdx];
          numberOfWays[heightIdx][widthIdx] = waysLeft + waysUp;
        }
      }
    }

    return numberOfWays[height][width];
  }
}

```
### Solution 3 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n + m) time | O(1) space - where n is
  // the width of the graph and m is the height
  public int numberOfWaysToTraverseGraph(int width, int height) {
    int xDistanceToCorner = width - 1;
    int yDistanceToCorner = height - 1;

    // The number of permutations of right and down movements
    // is the number of ways to reach the bottom right corner.
    int numerator = factorial(xDistanceToCorner + yDistanceToCorner);
    int denominator = factorial(xDistanceToCorner) * factorial(yDistanceToCorner);
    return numerator / denominator;
  }

  public int factorial(int num) {
    int result = 1;

    for (int n = 2; n < num + 1; n++) {
      result *= n;
    }

    return result;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int width = 4;
    int height = 3;
    int expected = 10;
    var actual = new Program().numberOfWaysToTraverseGraph(width, height);
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
  const width = 4;
  const height = 3;
  const expected = 10;
  const actual = program.numberOfWaysToTraverseGraph(width, height);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(2^(n + m)) time | O(n + m) space - where n
// is the width of the graph and m is the height
function numberOfWaysToTraverseGraph(width, height) {
  if (width === 1 || height === 1) return 1;

  return numberOfWaysToTraverseGraph(width - 1, height) + numberOfWaysToTraverseGraph(width, height - 1);
}

// Do not edit the line below.
exports.numberOfWaysToTraverseGraph = numberOfWaysToTraverseGraph;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n * m) time | O(n * m) space - where n
// is the width of the graph and m is the height
function numberOfWaysToTraverseGraph(width, height) {
  const numberOfWays = [];
  for (let i = 0; i < height + 1; i++) {
    numberOfWays.push([]);
    for (let j = 0; j < width + 1; j++) {
      numberOfWays[i].push(0);
    }
  }

  for (let widthIdx = 1; widthIdx < width + 1; widthIdx++) {
    for (let heightIdx = 1; heightIdx < height + 1; heightIdx++) {
      if (widthIdx === 1 || heightIdx === 1) {
        numberOfWays[heightIdx][widthIdx] = 1;
      } else {
        const waysLeft = numberOfWays[heightIdx][widthIdx - 1];
        const waysUp = numberOfWays[heightIdx - 1][widthIdx];
        numberOfWays[heightIdx][widthIdx] = waysLeft + waysUp;
      }
    }
  }

  return numberOfWays[height][width];
}

// Do not edit the line below.
exports.numberOfWaysToTraverseGraph = numberOfWaysToTraverseGraph;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n + m) time | O(1) space - where n is
// the width of the graph and m is the height
function numberOfWaysToTraverseGraph(width, height) {
  const xDistanceToCorner = width - 1;
  const yDistanceToCorner = height - 1;

  // The number of permutations of right and down movements
  // is the number of ways to reach the bottom right corner.
  const numerator = factorial(xDistanceToCorner + yDistanceToCorner);
  const denominator = factorial(xDistanceToCorner) * factorial(yDistanceToCorner);
  return Math.floor(numerator / denominator);
}

function factorial(num) {
  let result = 1;

  for (let n = 2; n < num + 1; n++) {
    result *= n;
  }

  return result;
}

// Do not edit the line below.
exports.numberOfWaysToTraverseGraph = numberOfWaysToTraverseGraph;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const width = 4;
  const height = 3;
  const expected = 10;
  const actual = program.numberOfWaysToTraverseGraph(width, height);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.numberOfWaysToTraverseGraph

class ProgramTest {
    @Test
    fun TestCase1() {
        val width = 4
        val height = 3
        val expected = 10
        val output = numberOfWaysToTraverseGraph(width, height)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(2^(n + m)) time | O(n + m) space - where n
// is the width of the graph and m is the height
fun numberOfWaysToTraverseGraph(width: Int, height: Int): Int {
    if (width == 1 || height == 1) return 1

    return numberOfWaysToTraverseGraph(width - 1, height) + numberOfWaysToTraverseGraph(width, height - 1)
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n * m) time | O(n * m) space - where n
// is the width of the graph and m is the height
fun numberOfWaysToTraverseGraph(width: Int, height: Int): Int {
    val numberOfWays = MutableList(height + 1) { MutableList(width + 1) { 0 } }

    for (widthIdx in 1 until width + 1) {
        for (heightIdx in 1 until height + 1) {
            if (widthIdx == 1 || heightIdx == 1) {
                numberOfWays[heightIdx][widthIdx] = 1
            } else {
                val waysLeft = numberOfWays[heightIdx][widthIdx - 1]
                val waysUp = numberOfWays[heightIdx - 1][widthIdx]
                numberOfWays[heightIdx][widthIdx] = waysLeft + waysUp
            }
        }
    }

    return numberOfWays[height][width]
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n + m) time | O(1) space - where n is
// the width of the graph and m is the height
fun numberOfWaysToTraverseGraph(width: Int, height: Int): Int {
    val xDistanceToCorner = width - 1
    val yDistanceToCorner = height - 1

    // The number of permutations of right and down movements
    // is the number of ways to reach the bottom right corner.
    val numerator = factorial(xDistanceToCorner + yDistanceToCorner)
    val denominator = factorial(xDistanceToCorner) * factorial(yDistanceToCorner)
    return numerator / denominator
}

fun factorial(num: Int): Int {
    var result = 1

    for (n in 2 until num + 1) {
        result *= n
    }

    return result
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.numberOfWaysToTraverseGraph

class ProgramTest {
    @Test
    fun TestCase1() {
        val width = 4
        val height = 3
        val expected = 10
        val output = numberOfWaysToTraverseGraph(width, height)
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
      let width = 4
      let height = 3
      let expected = 10
      var actual = Program().numberOfWaysToTraverseGraph(width, height)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(2^(n + m)) time | O(n + m) space - where n
  // is the width of the graph and m is the height
  func numberOfWaysToTraverseGraph(_ width: Int, _ height: Int) -> Int {
    if width == 1 || height == 1 {
      return 1
    }

    return numberOfWaysToTraverseGraph(width - 1, height) + numberOfWaysToTraverseGraph(width, height - 1)
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n * m) time | O(n * m) space - where n
  // is the width of the graph and m is the height
  func numberOfWaysToTraverseGraph(_ width: Int, _ height: Int) -> Int {
    var numberOfWays = Array(repeating: [Int](), count: height + 1)
    for i in 0 ..< numberOfWays.count {
      numberOfWays[i] = Array(repeating: 0, count: width + 1)
    }

    for widthIdx in stride(from: 1, to: width + 1, by: 1) {
      for heightIdx in stride(from: 1, to: height + 1, by: 1) {
        if widthIdx == 1 || heightIdx == 1 {
          numberOfWays[heightIdx][widthIdx] = 1
        } else {
          let waysLeft = numberOfWays[heightIdx][widthIdx - 1]
          let waysUp = numberOfWays[heightIdx - 1][widthIdx]
          numberOfWays[heightIdx][widthIdx] = waysLeft + waysUp
        }
      }
    }

    return numberOfWays[height][width]
  }
}

```
### Solution 3 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n + m) time | O(1) space - where n is
  // the width of the graph and m is the height
  func numberOfWaysToTraverseGraph(_ width: Int, _ height: Int) -> Int {
    let xDistanceToCorner = width - 1
    let yDistanceToCorner = height - 1

    // The number of permutations of right and down movements
    // is the number of ways to reach the bottom right corner.
    let numerator = factorial(xDistanceToCorner + yDistanceToCorner)
    let denominator = factorial(xDistanceToCorner) * factorial(yDistanceToCorner)
    return numerator / denominator
  }

  func factorial(_ num: Int) -> Int {
    var result = 1
    for n in stride(from: 2, to: num + 1, by: 1) {
      result *= n
    }
    return result
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let width = 4
      let height = 3
      let expected = 10
      var actual = Program().numberOfWaysToTraverseGraph(width, height)
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
        width = 4
        height = 3
        expected = 10
        actual = program.numberOfWaysToTraverseGraph(width, height)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(2^(n + m)) time | O(n + m) space - where n
# is the width of the graph and m is the height
def numberOfWaysToTraverseGraph(width, height):
    if width == 1 or height == 1:
        return 1

    return numberOfWaysToTraverseGraph(width - 1, height) + numberOfWaysToTraverseGraph(width, height - 1)

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n * m) time | O(n * m) space - where n
# is the width of the graph and m is the height
def numberOfWaysToTraverseGraph(width, height):
    numberOfWays = [[0 for _ in range(width + 1)] for _ in range(height + 1)]

    for widthIdx in range(1, width + 1):
        for heightIdx in range(1, height + 1):
            if widthIdx == 1 or heightIdx == 1:
                numberOfWays[heightIdx][widthIdx] = 1
            else:
                waysLeft = numberOfWays[heightIdx][widthIdx - 1]
                waysUp = numberOfWays[heightIdx - 1][widthIdx]
                numberOfWays[heightIdx][widthIdx] = waysLeft + waysUp

    return numberOfWays[height][width]

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n + m) time | O(1) space - where n is
# the width of the graph and m is the height
def numberOfWaysToTraverseGraph(width, height):
    xDistanceToCorner = width - 1
    yDistanceToCorner = height - 1

    # The number of permutations of right and down movements
    # is the number of ways to reach the bottom right corner.
    numerator = factorial(xDistanceToCorner + yDistanceToCorner)
    denominator = factorial(xDistanceToCorner) * factorial(yDistanceToCorner)
    return numerator // denominator


def factorial(num):
    result = 1

    for n in range(2, num + 1):
        result *= n

    return result

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        width = 4
        height = 3
        expected = 10
        actual = program.numberOfWaysToTraverseGraph(width, height)
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
  const width = 4;
  const height = 3;
  const expected = 10;
  const actual = program.numberOfWaysToTraverseGraph(width, height);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(2^(n + m)) time | O(n + m) space - where n
// is the width of the graph and m is the height
export function numberOfWaysToTraverseGraph(width: number, height: number): number {
  if (width === 1 || height === 1) return 1;

  return numberOfWaysToTraverseGraph(width - 1, height) + numberOfWaysToTraverseGraph(width, height - 1);
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n * m) time | O(n * m) space - where n
// is the width of the graph and m is the height
export function numberOfWaysToTraverseGraph(width: number, height: number) {
  const numberOfWays: number[][] = [];
  for (let i = 0; i < height + 1; i++) {
    numberOfWays.push([]);
    for (let j = 0; j < width + 1; j++) {
      numberOfWays[i].push(0);
    }
  }

  for (let widthIdx = 1; widthIdx < width + 1; widthIdx++) {
    for (let heightIdx = 1; heightIdx < height + 1; heightIdx++) {
      if (widthIdx === 1 || heightIdx === 1) {
        numberOfWays[heightIdx][widthIdx] = 1;
      } else {
        const waysLeft = numberOfWays[heightIdx][widthIdx - 1];
        const waysUp = numberOfWays[heightIdx - 1][widthIdx];
        numberOfWays[heightIdx][widthIdx] = waysLeft + waysUp;
      }
    }
  }

  return numberOfWays[height][width];
}

```
### Solution 3 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n + m) time | O(1) space - where n is
// the width of the graph and m is the height
export function numberOfWaysToTraverseGraph(width: number, height: number) {
  const xDistanceToCorner = width - 1;
  const yDistanceToCorner = height - 1;

  // The number of permutations of right and down movements
  // is the number of ways to reach the bottom right corner.
  const numerator = factorial(xDistanceToCorner + yDistanceToCorner);
  const denominator = factorial(xDistanceToCorner) * factorial(yDistanceToCorner);
  return Math.floor(numerator / denominator);
}

function factorial(num: number) {
  let result = 1;

  for (let n = 2; n < num + 1; n++) {
    result *= n;
  }

  return result;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const width = 4;
  const height = 3;
  const expected = 10;
  const actual = program.numberOfWaysToTraverseGraph(width, height);
  chai.expect(actual).to.deep.equal(expected);
});

```

