# Line Through Points
<div class="html">
<p>
  You're given an array of points plotted on a 2D graph (the xy-plane). Write a
  function that returns the maximum number of points that a single line (or
  potentially multiple lines) on the graph passes through.
</p>
<p>
  The input array will contain points represented by an array of two integers
  <span>[x, y]</span>. The input array will never contain duplicate points and
  will always contain at least one point.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">points</span> = [
  [1, 1],
  [2, 2],
  [3, 3],
  [0, 4],
  [-2, 6],
  [4, 0],
  [2, 1],
]
</pre>
<h3>Sample Output</h3>
<pre>
4 <span class="CodeEditor-promptComment">// A line passes through points: [-2, 6], [0, 4], [2, 2], [4, 0].</span>
</pre>
</div>

Hint 1
<p>
  The brute-force approach to solve this problem is to consider every single
  pair of points and to form a line using them. Then, for each line, you
  determine how many points lie on that line by using the equation of the line
  you formed and checking if each point's coordinates solve the equation. This
  solution runs in <span>O(n^3)</span> time; can you come up with a better
  approach?
</p>


Hint 2

<p>What does it mean if two lines have the same slope and share a point?</p>


Hint 3

<p>
  If two lines have the same slope and share a point, they're the same line. Try
  using a hash table to store the slopes of lines that pass through certain
  points. How does this help you write an algorithm that runs in
  <span>O(n^2)</span> time?
</p>


Hint 4

<p>
  Loop through every single pair of points, picking a <span>p2</span> for every
  <span>p1</span> in order to form a line. For every pair <span>(p1, p2)</span>,
  store the slope of the formed line in a hash table, and map it to the number
  of points on that line. If you ever find two identical slopes for lines that
  both use the same point <span>p1</span>, you can consider these lines to be
  one and the same, meaning that points <span>p1, p2a, and p2b</span> are all on
  the same line; in those cases, update the number of points on the slope (the
  line) in the hash table accordingly. You'll need to reset the hash table at
  each change of <span>p1</span>. See the Conceptual Overview section of this
  question's video explanation for a more in-depth explanation.
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
      vector<vector<int>> input = {{1, 1},  {2, 2}, {3, 3}, {0, 4},
                                   {-2, 6}, {4, 0}, {2, 1}};
      auto expected = 4;
      auto actual = lineThroughPoints(input);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <unordered_map>
#include <cmath>
#include <algorithm>
using namespace std;

vector<int> getSlopeOfLineBetweenPoints(vector<int> p1, vector<int> p2);
string createHashableKeyForRational(int numerator, int denominator);
int getGreatestCommonDivisor(int num1, int num2);

// O(n^2) time | O(n) space - where n is the number of points
int lineThroughPoints(vector<vector<int>> points) {
  int maxNumberOfPointsOnLine = 1;

  for (int idx1 = 0; idx1 < points.size(); idx1++) {
    auto p1 = points[idx1];
    unordered_map<string, int> slopes;
    for (int idx2 = idx1 + 1; idx2 < points.size(); idx2++) {
      auto p2 = points[idx2];
      auto slope = getSlopeOfLineBetweenPoints(p1, p2);
      int rise = slope[0];
      int run = slope[1];
      string slopeKey = createHashableKeyForRational(rise, run);
      if (slopes.find(slopeKey) == slopes.end())
        slopes[slopeKey] = 1;

      slopes[slopeKey]++;
    }

    int currentMaxNumberOfPointsOnLine = 0;
    for (auto it : slopes) {
      if (it.second > currentMaxNumberOfPointsOnLine) {
        currentMaxNumberOfPointsOnLine = it.second;
      }
    }

    maxNumberOfPointsOnLine =
        max(maxNumberOfPointsOnLine, currentMaxNumberOfPointsOnLine);
  }

  return maxNumberOfPointsOnLine;
}

vector<int> getSlopeOfLineBetweenPoints(vector<int> p1, vector<int> p2) {
  int p1x = p1[0];
  int p1y = p1[1];
  int p2x = p2[0];
  int p2y = p2[1];
  vector<int> slope = {1, 0}; // slope of a vertical lines

  if (p1x != p2x) {
    // if line is not vertical
    int xDiff = p1x - p2x;
    int yDiff = p1y - p2y;
    int gcd = getGreatestCommonDivisor(abs(xDiff), abs(yDiff));
    xDiff = xDiff / gcd;
    yDiff = yDiff / gcd;
    if (xDiff < 0) {
      xDiff *= -1;
      yDiff *= -1;
    }

    slope = {yDiff, xDiff};
  }

  return slope;
}

string createHashableKeyForRational(int numerator, int denominator) {
  return to_string(numerator) + ":" + to_string(denominator);
}

int getGreatestCommonDivisor(int num1, int num2) {
  int a = num1;
  int b = num2;
  while (true) {
    if (a == 0)
      return b;
    if (b == 0)
      return a;

    int tempA = a;
    a = b;
    b = tempA % b;
  }
}
```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> input = {{1, 1},  {2, 2}, {3, 3}, {0, 4},
                                   {-2, 6}, {4, 0}, {2, 1}};
      auto expected = 4;
      auto actual = lineThroughPoints(input);
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
		int[][] input = new int[][] {
			new int[] { 1, 1 },
			new int[] { 2, 2 },
			new int[] { 3, 3 },
			new int[] { 0, 4 },
			new int[] { -2, 6 },
			new int[] { 4, 0 },
			new int[] { 2, 1 },
		};
		int expected = 4;
		int actual = new Program().LineThroughPoints(input);
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

	// O(n^2) time | O(n) space - where n is the number of points
	public int LineThroughPoints(int[][] points) {
		int maxNumberOfPointsOnLine = 1;

		for (int idx1 = 0; idx1 < points.Length; idx1++) {
			int[] p1 = points[idx1];
			Dictionary<string, int> slopes = new Dictionary<string, int>();

			for (int idx2 = idx1 + 1; idx2 < points.Length; idx2++) {
				int[] p2 = points[idx2];
				int[] slopeOfLineBetweenPoints =
				  getSlopeOfLineBetweenPoints(p1, p2);
				int rise = slopeOfLineBetweenPoints[0];
				int run = slopeOfLineBetweenPoints[1];

				string slopeKey = createHashableKeyForRational(rise, run);
				if (!slopes.ContainsKey(slopeKey)) {
					slopes[slopeKey] = 1;
				}
				slopes[slopeKey] = slopes[slopeKey] + 1;
			}

			int currentMaxNumberOfPointsOnLine = maxSlope(slopes);
			maxNumberOfPointsOnLine = Math.Max(maxNumberOfPointsOnLine,
			    currentMaxNumberOfPointsOnLine);
		}

		return maxNumberOfPointsOnLine;
	}

	public int[] getSlopeOfLineBetweenPoints(int[] p1, int[] p2) {
		int p1x = p1[0];
		int p1y = p1[1];
		int p2x = p2[0];
		int p2y = p2[1];

		int[] slope = new int[] { 1, 0 }; // slope of a vertical line

		if (p1x != p2x) { // if line is not vertical
			int xDiff = p1x - p2x;
			int yDiff = p1y - p2y;
			int gcd = getGreatestCommonDivisor(Math.Abs(xDiff), Math.Abs(yDiff));
			xDiff = xDiff / gcd;
			yDiff = yDiff / gcd;
			if (xDiff < 0) {
				xDiff *= -1;
				yDiff *= -1;
			}

			slope = new int[] { yDiff, xDiff };
		}

		return slope;
	}

	public string createHashableKeyForRational(int numerator, int denominator) {
		return numerator.ToString() + ":" + denominator.ToString();
	}

	public int maxSlope(Dictionary<string, int> slopes) {
		int currentMax = 0;
		foreach (var slope in slopes) {
			currentMax = Math.Max(slope.Value, currentMax);
		}
		return currentMax;
	}

	public int getGreatestCommonDivisor(int num1, int num2) {
		int a = num1;
		int b = num2;
		while (true) {
			if (a == 0) {
				return b;
			}
			if (b == 0) {
				return a;
			}
			int temp = a;
			a = b;
			b = temp % b;
		}
	}

}

```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[][] input = new int[][] {
			new int[] { 1, 1 },
			new int[] { 2, 2 },
			new int[] { 3, 3 },
			new int[] { 0, 4 },
			new int[] { -2, 6 },
			new int[] { 4, 0 },
			new int[] { 2, 1 },
		};
		int expected = 4;
		int actual = new Program().LineThroughPoints(input);
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
	input := [][]int{
		{1, 1},
		{2, 2},
		{3, 3},
		{0, 4},
		{-2, 6},
		{4, 0},
		{2, 1},
	}
	expected := 4
	actual := LineThroughPoints(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"fmt"
)

// O(n^2) time | O(n) space - where n is the number of points
func LineThroughPoints(points [][]int) int {
	maxNumberOfPointsOnLine := 1

	for idx1, p1 := range points {
		slopes := map[string]int{}
		for idx2 := idx1 + 1; idx2 < len(points); idx2++ {
			p2 := points[idx2]
			rise, run := getSlopeOfLineBetweenPoints(p1, p2)
			slopeKey := createHashtableKeyForRational(rise, run)
			if slopes[slopeKey] == 0 {
				slopes[slopeKey] = 1
			}
			slopes[slopeKey] += 1
		}

		currentMaxNumberOfPointsOnLine := maxSlope(slopes)
		maxNumberOfPointsOnLine = max(maxNumberOfPointsOnLine, currentMaxNumberOfPointsOnLine)
	}
	return maxNumberOfPointsOnLine
}

func getSlopeOfLineBetweenPoints(p1, p2 []int) (int, int) {
	p1x, p1y := p1[0], p1[1]
	p2x, p2y := p2[0], p2[1]

	if p1x == p2x {
		return 1, 0
	}

	var xDiff = p1x - p2x
	var yDiff = p1y - p2y
	gcd := getGreatestCommonDivisor(abs(xDiff), abs(yDiff))
	xDiff = xDiff / gcd
	yDiff = yDiff / gcd
	if xDiff < 0 {
		xDiff *= -1
		yDiff *= -1
	}

	return yDiff, xDiff
}

func getGreatestCommonDivisor(num1, num2 int) int {
	a := num1
	b := num2
	for {
		if a == 0 {
			return b
		}
		if b == 0 {
			return a
		}
		a, b = b, a%b
	}
}

func createHashtableKeyForRational(numerator int, denominator int) string {
	return fmt.Sprintf("%d:%d", numerator, denominator)
}

func maxSlope(slopes map[string]int) int {
	currentMax := 0
	for _, slope := range slopes {
		currentMax = max(slope, currentMax)
	}
	return currentMax
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
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
	input := [][]int{
		{1, 1},
		{2, 2},
		{3, 3},
		{0, 4},
		{-2, 6},
		{4, 0},
		{2, 1},
	}
	expected := 4
	actual := LineThroughPoints(input)
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
    int[][] input = new int[][] {{1, 1}, {2, 2}, {3, 3}, {0, 4}, {-2, 6}, {4, 0}, {2, 1}};
    int expected = 4;
    int actual = new Program().lineThroughPoints(input);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n^2) time | O(n) space - where n is the number of points
  public int lineThroughPoints(int[][] points) {
    int maxNumberOfPointsOnLine = 1;

    for (int idx1 = 0; idx1 < points.length; idx1++) {
      int[] p1 = points[idx1];
      HashMap<String, Integer> slopes = new HashMap<String, Integer>();

      for (int idx2 = idx1 + 1; idx2 < points.length; idx2++) {
        int[] p2 = points[idx2];
        int[] slopeOfLineBetweenPoints = getSlopeOfLineBetweenPoints(p1, p2);
        int rise = slopeOfLineBetweenPoints[0];
        int run = slopeOfLineBetweenPoints[1];

        String slopeKey = createHashableKeyForRational(rise, run);
        if (!slopes.containsKey(slopeKey)) {
          slopes.put(slopeKey, 1);
        }
        slopes.put(slopeKey, slopes.get(slopeKey) + 1);
      }

      int currentMaxNumberOfPointsOnLine = maxSlope(slopes);
      maxNumberOfPointsOnLine = Math.max(maxNumberOfPointsOnLine, currentMaxNumberOfPointsOnLine);
    }

    return maxNumberOfPointsOnLine;
  }

  public int[] getSlopeOfLineBetweenPoints(int[] p1, int[] p2) {
    int p1x = p1[0];
    int p1y = p1[1];
    int p2x = p2[0];
    int p2y = p2[1];

    int[] slope = new int[] {1, 0}; // slope of a vertical line

    if (p1x != p2x) { // if line is not vertical
      int xDiff = p1x - p2x;
      int yDiff = p1y - p2y;
      int gcd = getGreatestCommonDivisor(Math.abs(xDiff), Math.abs(yDiff));
      xDiff = xDiff / gcd;
      yDiff = yDiff / gcd;
      if (xDiff < 0) {
        xDiff *= -1;
        yDiff *= -1;
      }

      slope = new int[] {yDiff, xDiff};
    }

    return slope;
  }

  public String createHashableKeyForRational(int numerator, int denominator) {
    return String.valueOf(numerator) + ":" + String.valueOf(denominator);
  }

  public int maxSlope(HashMap<String, Integer> slopes) {
    int currentMax = 0;
    for (Map.Entry<String, Integer> slope : slopes.entrySet()) {
      currentMax = Math.max(slope.getValue(), currentMax);
    }
    return currentMax;
  }

  public int getGreatestCommonDivisor(int num1, int num2) {
    int a = num1;
    int b = num2;
    while (true) {
      if (a == 0) {
        return b;
      }
      if (b == 0) {
        return a;
      }
      int temp = a;
      a = b;
      b = temp % b;
    }
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[][] input = new int[][] {{1, 1}, {2, 2}, {3, 3}, {0, 4}, {-2, 6}, {4, 0}, {2, 1}};
    int expected = 4;
    int actual = new Program().lineThroughPoints(input);
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
  const input = [
    [1, 1],
    [2, 2],
    [3, 3],
    [0, 4],
    [-2, 6],
    [4, 0],
    [2, 1],
  ];
  const expected = 4;
  const actual = program.lineThroughPoints(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space - where n is the number of points
function lineThroughPoints(points) {
  let maxNumberOfPointsOnLine = 1;

  for (let idx1 = 0; idx1 < points.length; idx1++) {
    const p1 = points[idx1];
    const slopes = {};
    for (let idx2 = idx1 + 1; idx2 < points.length; idx2++) {
      const p2 = points[idx2];
      const [rise, run] = getSlopeOfLineBetweenPoints(p1, p2);
      const slopeKey = createHashableKeyForRational(rise, run);
      if (!(slopeKey in slopes)) slopes[slopeKey] = 1;

      slopes[slopeKey]++;
    }

    const currentMaxNumberOfPointsOnLine = Object.values(slopes).reduce((a, b) => Math.max(a, b), 0);
    maxNumberOfPointsOnLine = Math.max(maxNumberOfPointsOnLine, currentMaxNumberOfPointsOnLine);
  }

  return maxNumberOfPointsOnLine;
}

function getSlopeOfLineBetweenPoints(p1, p2) {
  const [p1x, p1y] = p1;
  const [p2x, p2y] = p2;
  let slope = [1, 0]; // slope of a vertical lines

  if (p1x !== p2x) {
    // if line is not vertical
    let xDiff = p1x - p2x;
    let yDiff = p1y - p2y;
    let gcd = getGreatestCommonDivisor(Math.abs(xDiff), Math.abs(yDiff));
    xDiff = Math.floor(xDiff / gcd);
    yDiff = Math.floor(yDiff / gcd);
    if (xDiff < 0) {
      xDiff *= -1;
      yDiff *= -1;
    }

    slope = [yDiff, xDiff];
  }

  return slope;
}

function createHashableKeyForRational(numerator, denominator) {
  return numerator.toString() + ':' + denominator.toString();
}

function getGreatestCommonDivisor(num1, num2) {
  let a = num1;
  let b = num2;
  while (true) {
    if (a === 0) return b;
    if (b === 0) return a;

    const tempA = a;
    a = b;
    b = tempA % b;
  }
}

// Do not edit the line below.
exports.lineThroughPoints = lineThroughPoints;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [
    [1, 1],
    [2, 2],
    [3, 3],
    [0, 4],
    [-2, 6],
    [4, 0],
    [2, 1],
  ];
  const expected = 4;
  const actual = program.lineThroughPoints(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.lineThroughPoints

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(
            listOf(1, 1),
            listOf(2, 2),
            listOf(3, 3),
            listOf(0, 4),
            listOf(-2, 6),
            listOf(4, 0),
            listOf(2, 1)
        )
        val expected = 4
        val output = lineThroughPoints(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.abs
import kotlin.math.max

// O(n^2) time | O(n) space - where n is the number of points
fun lineThroughPoints(points: List<List<Int>>): Int {
    var maxNumberOfPointsOnLine = 1

    for (idx1 in 0 until points.size) {
        val p1 = points[idx1]
        val slopes = mutableMapOf<String, Int>()
        for (idx2 in idx1 + 1 until points.size) {
            val p2 = points[idx2]
            val (rise, run) = getSlopeOfLineBetweenPoints(p1, p2)
            val slopeKey = createHashableKeyForRational(rise, run)
            if (!(slopeKey in slopes)) slopes[slopeKey] = 1

            slopes[slopeKey] = slopes[slopeKey]!! + 1
        }

        var currentMaxNumberOfPointsOnLine = slopes.values.toList().max()
        if (currentMaxNumberOfPointsOnLine == null) currentMaxNumberOfPointsOnLine = 0
        maxNumberOfPointsOnLine = max(maxNumberOfPointsOnLine, currentMaxNumberOfPointsOnLine)
    }

    return maxNumberOfPointsOnLine
}

fun getSlopeOfLineBetweenPoints(p1: List<Int>, p2: List<Int>): Pair<Int, Int> {
    val (p1x, p1y) = p1
    val (p2x, p2y) = p2
    var slope = Pair(1, 0) // slope of a vertical line

    if (p1x != p2x) { // if line is not vertical
        var xDiff = p1x - p2x
        var yDiff = p1y - p2y
        val gcd = getGreatestCommonDivisor(abs(xDiff), abs(yDiff))
        xDiff = xDiff / gcd
        yDiff = yDiff / gcd
        if (xDiff < 0) {
            xDiff *= -1
            yDiff *= -1
        }

        slope = Pair(yDiff, xDiff)
    }

    return slope
}

fun createHashableKeyForRational(numerator: Int, denominator: Int): String {
    return numerator.toString() + ":" + denominator.toString()
}

fun getGreatestCommonDivisor(num1: Int, num2: Int): Int {
    var a = num1
    var b = num2
    while (true) {
        if (a == 0) return b
        if (b == 0) return a

        val tempA = a
        a = b
        b = tempA % b
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.lineThroughPoints

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(
            listOf(1, 1),
            listOf(2, 2),
            listOf(3, 3),
            listOf(0, 4),
            listOf(-2, 6),
            listOf(4, 0),
            listOf(2, 1)
        )
        val expected = 4
        val output = lineThroughPoints(input)
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
      let input = [
        [1, 1],
        [2, 2],
        [3, 3],
        [0, 4],
        [-2, 6],
        [4, 0],
        [2, 1],
      ]
      let expected = 4
      var actual = Program().lineThroughPoints(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(n) space - where n is the number of points
  func lineThroughPoints(_ points: [[Int]]) -> Int {
    var maxNumberOfPointsOnLine = 1

    for (idx1, p1) in points.enumerated() {
      var slopes = [String: Int]()
      for idx2 in stride(from: idx1 + 1, to: points.count, by: 1) {
        let p2 = points[idx2]
        let (rise, run) = getSlopeOfLineBetweenPoints(p1, p2)
        let slopeKey = createHashtableKeyForRational(rise, run)
        if slopes[slopeKey] == nil {
          slopes[slopeKey] = 1
        }
        slopes[slopeKey]! += 1
      }

      let currentMaxNumberOfPointsOnLine = maxSlope(slopes)
      maxNumberOfPointsOnLine = max(maxNumberOfPointsOnLine, currentMaxNumberOfPointsOnLine)
    }
    return maxNumberOfPointsOnLine
  }

  func getSlopeOfLineBetweenPoints(_ p1: [Int], _ p2: [Int]) -> (Int, Int) {
    let (p1x, p1y) = (p1[0], p1[1])
    let (p2x, p2y) = (p2[0], p2[1])

    if p1x == p2x {
      return (1, 0)
    }

    var xDiff = p1x - p2x
    var yDiff = p1y - p2y
    let gcd = getGreatestCommonDivisor(abs(xDiff), abs(yDiff))
    xDiff = xDiff / gcd
    yDiff = yDiff / gcd
    if xDiff < 0 {
      xDiff *= -1
      yDiff *= -1
    }

    return (yDiff, xDiff)
  }

  func getGreatestCommonDivisor(_ num1: Int, _ num2: Int) -> Int {
    var a = num1
    var b = num2
    while true {
      if a == 0 {
        return b
      }
      if b == 0 {
        return a
      }
      (a, b) = (b, a % b)
    }
  }

  func createHashtableKeyForRational(_ numerator: Int, _ denominator: Int) -> String {
    return String(numerator) + ":" + String(denominator)
  }

  func maxSlope(_ slopes: [String: Int]) -> Int {
    var currentMax = 0
    for (_, slope) in slopes {
      currentMax = max(slope, currentMax)
    }
    return currentMax
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let input = [
        [1, 1],
        [2, 2],
        [3, 3],
        [0, 4],
        [-2, 6],
        [4, 0],
        [2, 1],
      ]
      let expected = 4
      var actual = Program().lineThroughPoints(input)
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
        input = [[1, 1], [2, 2], [3, 3], [0, 4], [-2, 6], [4, 0], [2, 1]]
        expected = 4
        actual = program.lineThroughPoints(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n) space - where n is the number of points
def lineThroughPoints(points):
    maxNumberOfPointsOnLine = 1

    for idx1, p1 in enumerate(points):
        slopes = {}
        for idx2 in range(idx1 + 1, len(points)):
            p2 = points[idx2]
            rise, run = getSlopeOfLineBetweenPoints(p1, p2)
            slopeKey = createHashableKeyForRational(rise, run)
            if slopeKey not in slopes:
                slopes[slopeKey] = 1

            slopes[slopeKey] += 1

        maxNumberOfPointsOnLine = max(maxNumberOfPointsOnLine, max(slopes.values(), default=0))

    return maxNumberOfPointsOnLine


def getSlopeOfLineBetweenPoints(p1, p2):
    p1x, p1y = p1
    p2x, p2y = p2
    slope = [1, 0]  # slope of a vertical line

    if p1x != p2x:  # if line is not vertical
        xDiff = p1x - p2x
        yDiff = p1y - p2y
        gcd = getGreatestCommonDivisor(abs(xDiff), abs(yDiff))
        xDiff = xDiff // gcd
        yDiff = yDiff // gcd
        if xDiff < 0:
            xDiff *= -1
            yDiff *= -1

        slope = [yDiff, xDiff]

    return slope


def createHashableKeyForRational(numerator, denominator):
    return str(numerator) + ":" + str(denominator)


def getGreatestCommonDivisor(num1, num2):
    a = num1
    b = num2
    while True:
        if a == 0:
            return b
        if b == 0:
            return a

        a, b = b, a % b

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [[1, 1], [2, 2], [3, 3], [0, 4], [-2, 6], [4, 0], [2, 1]]
        expected = 4
        actual = program.lineThroughPoints(input)
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
  const input = [
    [1, 1],
    [2, 2],
    [3, 3],
    [0, 4],
    [-2, 6],
    [4, 0],
    [2, 1],
  ];
  const expected = 4;
  const actual = program.lineThroughPoints(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space - where n is the number of points
export function lineThroughPoints(points: number[][]) {
  let maxNumberOfPointsOnLine = 1;

  for (let idx1 = 0; idx1 < points.length; idx1++) {
    const p1 = points[idx1];
    const slopes: {[slope: string]: number} = {};
    for (let idx2 = idx1 + 1; idx2 < points.length; idx2++) {
      const p2 = points[idx2];
      const [rise, run] = getSlopeOfLineBetweenPoints(p1, p2);
      const slopeKey = createHashableKeyForRational(rise, run);
      if (!(slopeKey in slopes)) slopes[slopeKey] = 1;

      slopes[slopeKey]++;
    }

    const currentMaxNumberOfPointsOnLine = Object.values(slopes).reduce((a, b) => Math.max(a, b), 0);
    maxNumberOfPointsOnLine = Math.max(maxNumberOfPointsOnLine, currentMaxNumberOfPointsOnLine);
  }

  return maxNumberOfPointsOnLine;
}

function getSlopeOfLineBetweenPoints(p1: number[], p2: number[]) {
  const [p1x, p1y] = p1;
  const [p2x, p2y] = p2;
  let slope = [1, 0]; // slope of a vertical lines

  if (p1x !== p2x) {
    // if line is not vertical
    let xDiff = p1x - p2x;
    let yDiff = p1y - p2y;
    let gcd = getGreatestCommonDivisor(Math.abs(xDiff), Math.abs(yDiff));
    xDiff = Math.floor(xDiff / gcd);
    yDiff = Math.floor(yDiff / gcd);
    if (xDiff < 0) {
      xDiff *= -1;
      yDiff *= -1;
    }

    slope = [yDiff, xDiff];
  }

  return slope;
}

function createHashableKeyForRational(numerator: number, denominator: number) {
  return numerator.toString() + ':' + denominator.toString();
}

function getGreatestCommonDivisor(num1: number, num2: number) {
  let a = num1;
  let b = num2;
  while (true) {
    if (a === 0) return b;
    if (b === 0) return a;

    const tempA = a;
    a = b;
    b = tempA % b;
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [
    [1, 1],
    [2, 2],
    [3, 3],
    [0, 4],
    [-2, 6],
    [4, 0],
    [2, 1],
  ];
  const expected = 4;
  const actual = program.lineThroughPoints(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

