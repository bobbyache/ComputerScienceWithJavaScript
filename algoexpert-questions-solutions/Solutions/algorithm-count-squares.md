# Count Squares
<div class="html">
<p>
  Write a function that takes in a list of Cartesian coordinates (i.e., (x, y)
  coordinates) and returns the number of squares that can be formed by these
  coordinates.
</p>
<p>
  A square must have its four corners amongst the coordinates in order to be
  counted. A single coordinate can be used as a corner for multiple different
  squares.
</p>
<p>
  You can also assume that no coordinate will be farther than 100 units from the
  origin.
</p>

<h3>Sample Input</h3>
<pre><span class="CodeEditor-promptParameter">points</span> = [
  [1, 1],
  [0, 0],
  [-4, 2],
  [-2, -1],
  [0, 1],
  [1, 0],
  [-1, 4]
]</pre>
<h3>Sample Output</h3>
<pre>2 <span class="CodeEditor-promptComment"> // [1, 1], [0, 0], [0, 1], and [1, 0] makes a square,
// as does [1, 1], [-4, 2], [-2, -1], and [-1, 4]</span></pre>

Hint 1
<p>
  Given any two points, there are exactly three pairs of points that would make
  a square.
</p>


Hint 2

<p>
  If two points are assumed to be diagonally across from each other in a square,
  there is only one pair of points that would complete the square.
</p>


Hint 3

<p>
  All four points of a square will always be equidistant from the midpoint.
</p>


Hint 4

<p>
  The slopes of the two diagonals of a square are always negative reciprocals of
  each other.
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
      vector<vector<int>> input = {{1, 1}, {0, 0}, {0, 1}, {1, 0}};
      auto expected = 1;
      auto actual = countSquares(input);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <unordered_set>

using namespace std;

string pointToString(vector<int> const &point);
string dbPointToString(vector<double> const &point);

// O(n^2) time | O(n) space - where n is the number of points
int countSquares(vector<vector<int>> &points) {
  unordered_set<string> pointsSet;
  for (auto const &point : points) {
    pointsSet.insert(pointToString(point));
  }

  int count = 0;
  for (auto const &pointA : points) {
    for (auto const &pointB : points) {
      if (pointA == pointB) {
        continue;
      }

      vector<double> midpoint = {(pointA[0] + pointB[0]) / 2.0,
                                 (pointA[1] + pointB[1]) / 2.0};
      double xDistanceFromMid = pointA[0] - midpoint[0];
      double yDistanceFromMid = pointA[1] - midpoint[1];

      vector<double> pointC = {midpoint[0] + yDistanceFromMid,
                               midpoint[1] - xDistanceFromMid};
      vector<double> pointD = {midpoint[0] - yDistanceFromMid,
                               midpoint[1] + xDistanceFromMid};

      if (pointsSet.count(dbPointToString(pointC)) &&
          pointsSet.count(dbPointToString(pointD))) {
        count++;
      }
    }
  }
  return count / 4;
}

string pointToString(vector<int> const &point) {
  return to_string(point[0]) + "," + to_string(point[1]);
}

string dbPointToString(vector<double> const &point) {
  if (fmod(point[0], 1) == 0 && fmod(point[1], 1) == 0) {
    return to_string((int)point[0]) + "," + to_string((int)point[1]);
  }
  return to_string(point[0]) + "," + to_string(point[1]);
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> input = {{1, 1}, {0, 0}, {0, 1}, {1, 0}};
      auto expected = 1;
      auto actual = countSquares(input);
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
		var input = new int[][] {
			new int[] {1, 1},
			new int[] {0, 0},
			new int[] {0, 1},
			new int[] {1, 0}
		};
		var expected = 1;
		var actual = new Program().CountSquares(input);
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
	public int CountSquares(int[][] points) {
		HashSet<string> pointsSet = new HashSet<string>();
		foreach (var point in points) {
			pointsSet.Add(pointTostring(point));
		}

		int count = 0;
		foreach (var pointA in points) {
			foreach (var pointB in points) {
				if (pointA == pointB) {
					continue;
				}

				double[] midpoint =
				  new double[] {(pointA[0] + pointB[0]) / 2.0,
					        (pointA[1] + pointB[1]) / 2.0};
				double xDistanceFromMid = pointA[0] - midpoint[0];
				double yDistanceFromMid = pointA[1] - midpoint[1];

				double[] pointC =
				  new double[] {midpoint[0] + yDistanceFromMid,
					        midpoint[1] - xDistanceFromMid};
				double[] pointD =
				  new double[] {midpoint[0] - yDistanceFromMid,
					        midpoint[1] + xDistanceFromMid};

				if (pointsSet.Contains(dbPointTostring(pointC)) &&
				  pointsSet.Contains(dbPointTostring(pointD))) {
					count++;
				}
			}
		}
		return count / 4;
	}

	private string pointTostring(int[] point) {
		return point[0] + "," + point[1];
	}

	private string dbPointTostring(double[] point) {
		if (point[0] % 1 == 0 && point[1] % 1 == 0) {
			return (int) point[0] + "," + (int) point[1];
		}
		return point[0] + "," + point[1];
	}
}


```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		var input = new int[][] {
			new int[] {1, 1},
			new int[] {0, 0},
			new int[] {0, 1},
			new int[] {1, 0}
		};
		var expected = 1;
		var actual = new Program().CountSquares(input);
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
	input := [][]int{{1, 1}, {0, 0}, {0, 1}, {1, 0}}
	expected := 1
	actual := CountSquares(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"fmt"
	"math"
)

// O(n^2) time | O(n) space - where n is the number of points
func CountSquares(points [][]int) int {
	pointsSet := map[string]bool{}
	for _, point := range points {
		pointsSet[pointToString(point)] = true
	}

	count := 0
	for i, pointA := range points {
		for j, pointB := range points {
			if i == j {
				continue
			}

			midpoint := []float64{float64(pointA[0]+pointB[0]) / 2.0, float64(pointA[1]+pointB[1]) / 2.0}
			xDistanceFromMid := float64(pointA[0]) - midpoint[0]
			yDistanceFromMid := float64(pointA[1]) - midpoint[1]

			pointC := []float64{midpoint[0] + yDistanceFromMid, midpoint[1] - xDistanceFromMid}
			pointD := []float64{midpoint[0] - yDistanceFromMid, midpoint[1] + xDistanceFromMid}

			if pointsSet[floatPointToString(pointC)] && pointsSet[floatPointToString(pointD)] {
				count += 1
			}
		}
	}

	return count / 4
}

func pointToString(point []int) string {
	return fmt.Sprintf("%d,%d", point[0], point[1])
}

func floatPointToString(point []float64) string {
	if point[0] == math.Trunc(point[0]) && point[1] == math.Trunc(point[1]) {
		return fmt.Sprintf("%d,%d", int(point[0]), int(point[1]))
	}
	return fmt.Sprintf("%f,%f", point[0], point[1])
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := [][]int{{1, 1}, {0, 0}, {0, 1}, {1, 0}}
	expected := 1
	actual := CountSquares(input)
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
    var input =
        new int[][] {
          new int[] {1, 1},
          new int[] {0, 0},
          new int[] {0, 1},
          new int[] {1, 0}
        };
    var expected = 1;
    var actual = new Program().countSquares(input);
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
  public int countSquares(int[][] points) {
    HashSet<String> pointsSet = new HashSet<String>();
    for (int[] point : points) {
      pointsSet.add(pointToString(point));
    }

    int count = 0;
    for (int[] pointA : points) {
      for (int[] pointB : points) {
        if (pointA == pointB) {
          continue;
        }

        double[] midpoint =
            new double[] {(pointA[0] + pointB[0]) / 2.0, (pointA[1] + pointB[1]) / 2.0};
        double xDistanceFromMid = pointA[0] - midpoint[0];
        double yDistanceFromMid = pointA[1] - midpoint[1];

        double[] pointC =
            new double[] {midpoint[0] + yDistanceFromMid, midpoint[1] - xDistanceFromMid};
        double[] pointD =
            new double[] {midpoint[0] - yDistanceFromMid, midpoint[1] + xDistanceFromMid};

        if (pointsSet.contains(dbPointToString(pointC))
            && pointsSet.contains(dbPointToString(pointD))) {
          count++;
        }
      }
    }
    return count / 4;
  }

  private String pointToString(int[] point) {
    return point[0] + "," + point[1];
  }

  private String dbPointToString(double[] point) {
    if (point[0] % 1 == 0 && point[1] % 1 == 0) {
      return (int) point[0] + "," + (int) point[1];
    }
    return point[0] + "," + point[1];
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    var input =
        new int[][] {
          new int[] {1, 1},
          new int[] {0, 0},
          new int[] {0, 1},
          new int[] {1, 0}
        };
    var expected = 1;
    var actual = new Program().countSquares(input);
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
    [0, 0],
    [0, 1],
    [1, 0],
  ];
  const expected = 1;
  const actual = program.countSquares(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space - where n is the number of points
function countSquares(points) {
  const pointsSet = new Set();
  for (const point of points) {
    pointsSet.add(pointToString(point));
  }

  let count = 0;
  for (const pointA of points) {
    for (const pointB of points) {
      if (pointA === pointB) continue;

      const midpoint = [(pointA[0] + pointB[0]) / 2, (pointA[1] + pointB[1]) / 2];
      const xDistanceFromMid = pointA[0] - midpoint[0];
      const yDistanceFromMid = pointA[1] - midpoint[1];

      const pointC = [midpoint[0] + yDistanceFromMid, midpoint[1] - xDistanceFromMid];
      const pointD = [midpoint[0] - yDistanceFromMid, midpoint[1] + xDistanceFromMid];

      if (pointsSet.has(pointToString(pointC)) && pointsSet.has(pointToString(pointD))) {
        count++;
      }
    }
  }

  return count / 4;
}

function pointToString(point) {
  return point.join(',');
}

// Do not edit the line below.
exports.countSquares = countSquares;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [
    [1, 1],
    [0, 0],
    [0, 1],
    [1, 0],
  ];
  const expected = 1;
  const actual = program.countSquares(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.countSquares

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(
            mutableListOf(1, 1),
            mutableListOf(0, 0),
            mutableListOf(0, 1),
            mutableListOf(1, 0)
        )
        val expected = 1
        val output = countSquares(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^2) time | O(n) space - where n is the number of points
fun countSquares(points: MutableList<MutableList<Int>>): Int {
    val pointsSet = mutableSetOf<String>()
    for (point in points) {
        pointsSet.add(pointToString(listOf(point[0].toDouble(), point[1].toDouble())))
    }

    var count = 0
    for (pointA in points) {
        for (pointB in points) {
            if (pointA == pointB) continue

            val midpoint = listOf((pointA[0] + pointB[0]).toDouble() / 2, (pointA[1] + pointB[1]).toDouble() / 2)
            val xDistanceFromMid = pointA[0] - midpoint[0]
            val yDistanceFromMid = pointA[1] - midpoint[1]

            val pointC = listOf(midpoint[0] + yDistanceFromMid, midpoint[1] - xDistanceFromMid)
            val pointD = listOf(midpoint[0] - yDistanceFromMid, midpoint[1] + xDistanceFromMid)

            if (pointsSet.contains(pointToString(pointC)) && pointsSet.contains(pointToString(pointD))) {
                count++
            }
        }
    }

    return count / 4
}

fun pointToString(point: List<Double>): String {
    return point.joinToString(",")
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.countSquares

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(
            mutableListOf(1, 1),
            mutableListOf(0, 0),
            mutableListOf(0, 1),
            mutableListOf(1, 0)
        )
        val expected = 1
        val output = countSquares(input)
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
    runTest("Test Case 1") { () throws in
      let input = [[1, 1], [0, 0], [0, 1], [1, 0]]
      let expected = 1
      var actual = Program().countSquares(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import Foundation

class Program {
  // O(n^2) time | O(n) space - where n is the number of points
  func countSquares(_ points: [[Int]]) -> Int {
    var pointsSet: Set<String> = Set()
    for point in points {
      pointsSet.insert(pointToString(point))
    }

    var count = 0
    for (i, pointA) in points.enumerated() {
      for (j, pointB) in points.enumerated() {
        if pointA == pointB {
          continue
        }

        let midpoint: [Float] = [Float(pointA[0] + pointB[0]) / 2.0, Float(pointA[1] + pointB[1]) / 2.0]
        let xDistanceFromMid = Float(pointA[0]) - midpoint[0]
        let yDistanceFromMid = Float(pointA[1]) - midpoint[1]

        let pointC: [Float] = [midpoint[0] + yDistanceFromMid, midpoint[1] - xDistanceFromMid]
        let pointD: [Float] = [midpoint[0] - yDistanceFromMid, midpoint[1] + xDistanceFromMid]

        if pointsSet.contains(floatPointToString(pointC)) && pointsSet.contains(floatPointToString(pointD)) {
          count += 1
        }
      }
    }
    return count / 4
  }

  func pointToString(_ point: [Int]) -> String {
    return "\(point[0]),\(point[1])"
  }

  func floatPointToString(_ point: [Float]) -> String {
    if point[0] == floor(point[0]) && point[1] == floor(point[1]) {
      return "\(Int(point[0])),\(Int(point[1]))"
    }
    return "\(point[0]),\(point[1])"
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws in
      let input = [[1, 1], [0, 0], [0, 1], [1, 0]]
      let expected = 1
      var actual = Program().countSquares(input)
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
        input = [[1, 1], [0, 0], [0, 1], [1, 0]]
        expected = 1
        actual = program.countSquares(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n) space - where n is the number of points
def countSquares(points):
    pointsSet = set()
    for point in points:
        pointsSet.add(pointToString(point))

    count = 0
    for pointA in points:
        for pointB in points:
            if pointA == pointB:
                continue

            midpoint = [(pointA[0] + pointB[0]) / 2, (pointA[1] + pointB[1]) / 2]
            xDistanceFromMid = pointA[0] - midpoint[0]
            yDistanceFromMid = pointA[1] - midpoint[1]

            pointC = [midpoint[0] + yDistanceFromMid, midpoint[1] - xDistanceFromMid]
            pointD = [midpoint[0] - yDistanceFromMid, midpoint[1] + xDistanceFromMid]

            if pointToString(pointC) in pointsSet and pointToString(pointD) in pointsSet:
                count += 1

    return count / 4


def pointToString(point):
    if point[0] % 1 == 0 and point[1] % 1 == 0:
        point = [int(coordinate) for coordinate in point]
    return ",".join([str(coordinate) for coordinate in point])

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [[1, 1], [0, 0], [0, 1], [1, 0]]
        expected = 1
        actual = program.countSquares(input)
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
    [0, 0],
    [0, 1],
    [1, 0],
  ];
  const expected = 1;
  const actual = program.countSquares(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space - where n is the number of points
export function countSquares(points: number[][]) {
  const pointsSet = new Set();
  for (const point of points) {
    pointsSet.add(pointToString(point));
  }

  let count = 0;
  for (const pointA of points) {
    for (const pointB of points) {
      if (pointA === pointB) continue;

      const midpoint = [(pointA[0] + pointB[0]) / 2, (pointA[1] + pointB[1]) / 2];
      const xDistanceFromMid = pointA[0] - midpoint[0];
      const yDistanceFromMid = pointA[1] - midpoint[1];

      const pointC = [midpoint[0] + yDistanceFromMid, midpoint[1] - xDistanceFromMid];
      const pointD = [midpoint[0] - yDistanceFromMid, midpoint[1] + xDistanceFromMid];

      if (pointsSet.has(pointToString(pointC)) && pointsSet.has(pointToString(pointD))) {
        count++;
      }
    }
  }

  return count / 4;
}

function pointToString(point: number[]) {
  return point.join(',');
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [
    [1, 1],
    [0, 0],
    [0, 1],
    [1, 0],
  ];
  const expected = 1;
  const actual = program.countSquares(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

