# Minimum Area Rectangle
<div class="html">
<p>
  You're given an array of points plotted on a 2D graph (the xy-plane). Write a
  function that returns the minimum area of any rectangle that can be formed
  using any 4 of these points such that the rectangle's sides are parallel to
  the x and y axes (i.e., only rectangles with horizontal and vertical sides
  should be considered--no rectangles with diagonal sides). If no rectangle can
  be formed, your function should return <span>0</span>.
</p>
<p>
  The input array will contain points represented by arrays of two integers
  <span>[x, y]</span>. The input array will never contain duplicate points.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">points</span> = 
[
  [1, 5],
  [5, 1],
  [4, 2],
  [2, 4],
  [2, 2],
  [1, 2],
  [4, 5],
  [2, 5],
  [-1, -2],
]
</pre>
<h3>Sample Output</h3>
<pre>
3
<span class="CodeEditor-promptComment">// The rectangle with corners [1, 5], [2, 5], [1, 2], and [2, 2]</span>
<span class="CodeEditor-promptComment">// has the minimum area: 3.</span>
</pre>
</div>

Hint 1
<p>
  The brute-force approach to this problem is to simply generate all possible
  combinations of 4 points and to see if they form a rectangle. You can
  calculate the area of all of these rectangles and then return the minimum area
  that you find. Is there a better approach than this?
</p>


Hint 2

<p>
  A more optimal approach is to find vertical or horizontal edges that are
  parallel to the y or x axes, respectively. If you find two parallel edges (two
  vertical edges, for example) that share a vertical or horizontal coordinate (y
  values in the case of vertical edges), then those edges form a rectangle.
</p>


Hint 3

<p>
  Another approach is to pick any two points that don't have the same x or y
  values (i.e., points that could be at opposite ends of a rectangle diagonal)
  and to see if you can create a rectangle with them and two other points. Given
  two points where <span>p1 = (x1, y1)</span> and <span>p2 = (x2, y2)</span>, if
  points <span>p3 = (x1, y2)</span> and <span>p4 = (x2, y1)</span> exist, then
  these 4 points form a rectangle.
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
      vector<vector<int>> input = {{1, 5}, {5, 1}, {4, 2}, {2, 4},  {2, 2},
                                   {1, 2}, {4, 5}, {2, 5}, {-1, -2}};
      auto expected = 3;
      auto actual = minimumAreaRectangle(input);
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
#include <limits>
#include <algorithm>
using namespace std;

unordered_map<int, vector<int>> initializeColumns(vector<vector<int>> points);

// O(n^2) time | O(n) space - where n is the number of points
int minimumAreaRectangle(vector<vector<int>> points) {
  auto columns = initializeColumns(points);
  int minimumAreaFound = numeric_limits<int>::max();
  unordered_map<string, int> edgesParallelToYAxis;

  vector<int> sortedColumns;
  for (auto it : columns) {
    sortedColumns.push_back(it.first);
  }
  sort(sortedColumns.begin(), sortedColumns.end());

  for (auto x : sortedColumns) {
    vector<int> yValuesInCurrentColumn = columns[x];
    sort(yValuesInCurrentColumn.begin(), yValuesInCurrentColumn.end());
    for (int currentIdx = 0; currentIdx < yValuesInCurrentColumn.size();
         currentIdx++) {
      int y2 = yValuesInCurrentColumn[currentIdx];
      for (int previousIdx = 0; previousIdx < currentIdx; previousIdx++) {
        int y1 = yValuesInCurrentColumn[previousIdx];
        string pointString = to_string(y1) + ":" + to_string(y2);

        if (edgesParallelToYAxis.find(pointString) !=
            edgesParallelToYAxis.end()) {
          int currentArea = (x - edgesParallelToYAxis[pointString]) * (y2 - y1);
          minimumAreaFound = min(minimumAreaFound, currentArea);
        }

        edgesParallelToYAxis[pointString] = x;
      }
    }
  }

  return minimumAreaFound != numeric_limits<int>::max() ? minimumAreaFound : 0;
}

unordered_map<int, vector<int>> initializeColumns(vector<vector<int>> points) {
  unordered_map<int, vector<int>> columns;

  for (auto point : points) {
    int x = point[0];
    int y = point[1];
    if (columns.find(x) == columns.end()) {
      columns[x] = {};
    }
    columns[x].push_back(y);
  }

  return columns;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <limits>
#include <algorithm>
#include <set>
#include <cmath>

using namespace std;

set<string> createPointSet(vector<vector<int>> points);
string convertPointToString(int x, int y);

// O(n^2) time | O(n) space - where n is the number of points
int minimumAreaRectangle(vector<vector<int>> points) {
  set<string> pointSet = createPointSet(points);
  int minimumAreaFound = numeric_limits<int>::max();

  for (int currentIdx = 0; currentIdx < points.size(); currentIdx++) {
    int p2x = points[currentIdx][0];
    int p2y = points[currentIdx][1];
    for (int previousIdx = 0; previousIdx < currentIdx; previousIdx++) {
      int p1x = points[previousIdx][0];
      int p1y = points[previousIdx][1];
      bool pointsShareValue = p1x == p2x || p1y == p2y;

      if (pointsShareValue)
        continue;

      // If (p1x, p2y) and (p2x, p1y), exist we've found a rectangle.
      bool point1OnOppositeDiagonalExists =
          pointSet.find((convertPointToString(p1x, p2y))) != pointSet.end();
      bool point2OnOppositeDiagonalExists =
          pointSet.find((convertPointToString(p2x, p1y))) != pointSet.end();
      bool oppositeDiagonalExists =
          point1OnOppositeDiagonalExists && point2OnOppositeDiagonalExists;

      if (oppositeDiagonalExists) {
        int currentArea = abs(p2x - p1x) * abs(p2y - p1y);
        minimumAreaFound = min(minimumAreaFound, currentArea);
      }
    }
  }

  return minimumAreaFound != numeric_limits<int>::max() ? minimumAreaFound : 0;
}

set<string> createPointSet(vector<vector<int>> points) {
  set<string> pointSet;

  for (auto point : points) {
    int x = point[0];
    int y = point[1];
    string pointString = convertPointToString(x, y);
    pointSet.insert(pointString);
  }

  return pointSet;
}

string convertPointToString(int x, int y) {
  return to_string(x) + ":" + to_string(y);
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> input = {{1, 5}, {5, 1}, {4, 2}, {2, 4},  {2, 2},
                                   {1, 2}, {4, 5}, {2, 5}, {-1, -2}};
      auto expected = 3;
      auto actual = minimumAreaRectangle(input);
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
			new int[] {1, 5},
			new int[] {5, 1},
			new int[] {4, 2},
			new int[] {2, 4},
			new int[] {2, 2},
			new int[] {1, 2},
			new int[] {4, 5},
			new int[] {2, 5},
			new int[] {-1, -2}
		};
		int expected = 3;
		var actual = new Program().MinimumAreaRectangle(input);
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
	public int MinimumAreaRectangle(int[][] points) {
		Dictionary<int, int[]> columns = initializeColumns(points);
		int minimumAreaFound = Int32.MaxValue;
		Dictionary<string, int> edgesParallelToYAxis = new Dictionary<string, int>();

		List<int> sortedColumns = new List<int>(columns.Keys);
		sortedColumns.Sort();

		foreach (var x in sortedColumns) {
			int[] yValuesInCurrentColumn = columns[x];
			Array.Sort(yValuesInCurrentColumn);

			for (int currentIdx = 0; currentIdx < yValuesInCurrentColumn.Length;
			  currentIdx++) {
				int y2 = yValuesInCurrentColumn[currentIdx];
				for (int previousIdx = 0; previousIdx < currentIdx; previousIdx++) {
					int y1 = yValuesInCurrentColumn[previousIdx];
					string pointstring = y1.ToString() + ":" + y2.ToString();

					if (edgesParallelToYAxis.ContainsKey(pointstring)) {
						int currentArea =
						  (x - edgesParallelToYAxis[pointstring]) *
						  (y2 - y1);
						minimumAreaFound = Math.Min(minimumAreaFound,
						    currentArea);
					}

					edgesParallelToYAxis[pointstring] = x;
				}
			}
		}

		return (minimumAreaFound != Int32.MaxValue) ? minimumAreaFound : 0;
	}

	public Dictionary<int, int[]> initializeColumns(int[][] points) {

		Dictionary<int, int[]> columns = new Dictionary<int, int[]>();

		foreach (var point in points) {
			int x = point[0];
			int y = point[1];

			if (!columns.ContainsKey(x)) {
				columns[x] = new int[] {};
			}

			int[] column = columns[x];
			int[] newColumn = new int[column.Length + 1];
			for (int i=0; i<column.Length; i++) {
				newColumn[i] = column[i];
			}
			newColumn[column.Length] = y;
			columns[x] = newColumn;
		}

		return columns;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;


public class Program {

	// O(n^2) time | O(n) space - where n is the number of points
	public int MinimumAreaRectangle(int[][] points) {
		HashSet<string> pointSet = createPointSet(points);
		int minimumAreaFound = Int32.MaxValue;

		for (int currentIdx = 0; currentIdx < points.Length; currentIdx++) {
			int p2x = points[currentIdx][0];
			int p2y = points[currentIdx][1];

			for (int previousIdx = 0; previousIdx < currentIdx; previousIdx++) {
				int p1x = points[previousIdx][0];
				int p1y =  points[previousIdx][1];
				bool pointsShareValue = p1x == p2x || p1y == p2y;

				if (pointsShareValue) continue;

				// If (p1x, p2y) and (p2x, p1y), exist we've found a rectangle.
				bool point1OnOppositeDiagonalExists = pointSet.Contains(convertPointTostring(
					    p1x,
					    p2y));
				bool point2OnOppositeDiagonalExists = pointSet.Contains(convertPointTostring(
					    p2x,
					    p1y));
				bool oppositeDiagonalExists = point1OnOppositeDiagonalExists &&
				  point2OnOppositeDiagonalExists;

				if (oppositeDiagonalExists) {
					int currentArea = Math.Abs(p2x - p1x) * Math.Abs(p2y - p1y);
					minimumAreaFound = Math.Min(minimumAreaFound, currentArea);
				}
			}
		}

		return (minimumAreaFound != Int32.MaxValue) ? minimumAreaFound : 0;
	}

	public string convertPointTostring(int x, int y) {
		return x.ToString() + ":" + y.ToString();
	}

	public HashSet<string> createPointSet(int[][] points) {
		HashSet<string> pointSet = new HashSet<string>();
		foreach (var point in points) {
			int x = point[0];
			int y = point[1];
			string pointstring = convertPointTostring(x, y);
			pointSet.Add(pointstring);
		}

		return pointSet;
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
			new int[] {1, 5},
			new int[] {5, 1},
			new int[] {4, 2},
			new int[] {2, 4},
			new int[] {2, 2},
			new int[] {1, 2},
			new int[] {4, 5},
			new int[] {2, 5},
			new int[] {-1, -2}
		};
		int expected = 3;
		var actual = new Program().MinimumAreaRectangle(input);
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
		{1, 5},
		{5, 1},
		{4, 2},
		{2, 4},
		{2, 2},
		{1, 2},
		{4, 5},
		{2, 5},
		{-1, -2},
	}
	expected := 3
	actual := MinimumAreaRectangle(input)
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
	"sort"
)

// O(n^2) time | O(n) space - where n is the number of points
func MinimumAreaRectangle(points [][]int) int {
	columns := initializeColumns(points)
	var minimumAreaFound = math.MaxInt32
	edgesParallelToYAxis := map[string]int{}

	sortedColumns := make([]int, 0)
	for k := range columns {
		sortedColumns = append(sortedColumns, k)
	}
	sort.Ints(sortedColumns)

	for _, x := range sortedColumns {
		yValuesInCurrentColumn := columns[x]
		sort.Ints(yValuesInCurrentColumn)

		for currentIdx := range yValuesInCurrentColumn {
			y2 := yValuesInCurrentColumn[currentIdx]
			for previousIdx := 0; previousIdx < currentIdx; previousIdx++ {
				y1 := yValuesInCurrentColumn[previousIdx]
				pointString := fmt.Sprintf("%d:%d", y1, y2)

				if _, found := edgesParallelToYAxis[pointString]; found {
					currentArea := (x - edgesParallelToYAxis[pointString]) * (y2 - y1)
					minimumAreaFound = min(minimumAreaFound, currentArea)
				}

				edgesParallelToYAxis[pointString] = x
			}
		}
	}

	if minimumAreaFound != math.MaxInt32 {
		return minimumAreaFound
	}
	return 0
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func initializeColumns(points [][]int) map[int][]int {
	columns := map[int][]int{}

	for _, point := range points {
		x, y := point[0], point[1]
		columns[x] = append(columns[x], y)
	}

	return columns
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"fmt"
	"math"
)

// O(n^2) time | O(n) space - where n is the number of points
func MinimumAreaRectangle(points [][]int) int {
	pointSet := createPointSet(points)
	var minimumAreaFound = math.MaxInt32

	for currentIdx := range points {
		p2x, p2y := points[currentIdx][0], points[currentIdx][1]
		for previousIdx := 0; previousIdx < currentIdx; previousIdx++ {
			p1x, p1y := points[previousIdx][0], points[previousIdx][1]
			pointsShareValue := p1x == p2x || p1y == p2y

			if pointsShareValue {
				continue
			}

			// If (p1x, p2y) and (p2x, p1y), exist we've found a rectangle.
			point1OnOppositeDiagonalExists := pointSet[convertPointToString(p1x, p2y)]
			point2OnOppositeDiagonalExists := pointSet[convertPointToString(p2x, p1y)]
			oppositeDiagonalExists := point1OnOppositeDiagonalExists && point2OnOppositeDiagonalExists

			if oppositeDiagonalExists {
				currentArea := abs(p2x-p1x) * abs(p2y-p1y)
				minimumAreaFound = min(minimumAreaFound, currentArea)
			}
		}
	}
	if minimumAreaFound != math.MaxInt32 {
		return minimumAreaFound
	}
	return 0
}

func min(a, b int) int {
	if a < b {
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

func createPointSet(points [][]int) map[string]bool {
	pointSet := map[string]bool{}

	for _, point := range points {
		x, y := point[0], point[1]
		pointString := convertPointToString(x, y)
		pointSet[pointString] = true
	}
	return pointSet
}

func convertPointToString(x, y int) string {
	return fmt.Sprintf("%d:%d", x, y)
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
		{1, 5},
		{5, 1},
		{4, 2},
		{2, 4},
		{2, 2},
		{1, 2},
		{4, 5},
		{2, 5},
		{-1, -2},
	}
	expected := 3
	actual := MinimumAreaRectangle(input)
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
    int[][] input =
        new int[][] {
          {1, 5},
          {5, 1},
          {4, 2},
          {2, 4},
          {2, 2},
          {1, 2},
          {4, 5},
          {2, 5},
          {-1, -2}
        };
    int expected = 3;
    var actual = new Program().minimumAreaRectangle(input);
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
  public int minimumAreaRectangle(int[][] points) {
    HashMap<Integer, int[]> columns = initializeColumns(points);
    int minimumAreaFound = Integer.MAX_VALUE;
    HashMap<String, Integer> edgesParallelToYAxis = new HashMap<String, Integer>();

    ArrayList<Integer> sortedColumns = new ArrayList<Integer>(columns.keySet());
    Collections.sort(sortedColumns);

    for (Integer x : sortedColumns) {
      int[] yValuesInCurrentColumn = columns.get(x);
      Arrays.sort(yValuesInCurrentColumn);

      for (int currentIdx = 0; currentIdx < yValuesInCurrentColumn.length; currentIdx++) {
        int y2 = yValuesInCurrentColumn[currentIdx];
        for (int previousIdx = 0; previousIdx < currentIdx; previousIdx++) {
          int y1 = yValuesInCurrentColumn[previousIdx];
          String pointString = String.valueOf(y1) + ":" + String.valueOf(y2);

          if (edgesParallelToYAxis.containsKey(pointString)) {
            int currentArea = (x - edgesParallelToYAxis.get(pointString)) * (y2 - y1);
            minimumAreaFound = Math.min(minimumAreaFound, currentArea);
          }

          edgesParallelToYAxis.put(pointString, x);
        }
      }
    }

    return (minimumAreaFound != Integer.MAX_VALUE) ? minimumAreaFound : 0;
  }

  public HashMap<Integer, int[]> initializeColumns(int[][] points) {

    HashMap<Integer, int[]> columns = new HashMap<Integer, int[]>();

    for (int[] point : points) {
      int x = point[0];
      int y = point[1];

      if (!columns.containsKey(x)) {
        columns.put(x, new int[] {});
      }

      int[] column = columns.get(x);
      int[] newColumn = new int[column.length + 1];
      for (int i = 0; i < column.length; i++) {
        newColumn[i] = column[i];
      }
      newColumn[column.length] = y;
      columns.put(x, newColumn);
    }

    return columns;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n^2) time | O(n) space - where n is the number of points
  public int minimumAreaRectangle(int[][] points) {
    HashSet<String> pointSet = createPointSet(points);
    int minimumAreaFound = Integer.MAX_VALUE;

    for (int currentIdx = 0; currentIdx < points.length; currentIdx++) {
      int p2x = points[currentIdx][0];
      int p2y = points[currentIdx][1];

      for (int previousIdx = 0; previousIdx < currentIdx; previousIdx++) {
        int p1x = points[previousIdx][0];
        int p1y = points[previousIdx][1];
        boolean pointsShareValue = p1x == p2x || p1y == p2y;

        if (pointsShareValue) continue;

        // If (p1x, p2y) and (p2x, p1y), exist we've found a rectangle.
        boolean point1OnOppositeDiagonalExists = pointSet.contains(convertPointToString(p1x, p2y));
        boolean point2OnOppositeDiagonalExists = pointSet.contains(convertPointToString(p2x, p1y));
        boolean oppositeDiagonalExists =
            point1OnOppositeDiagonalExists && point2OnOppositeDiagonalExists;

        if (oppositeDiagonalExists) {
          int currentArea = Math.abs(p2x - p1x) * Math.abs(p2y - p1y);
          minimumAreaFound = Math.min(minimumAreaFound, currentArea);
        }
      }
    }

    return (minimumAreaFound != Integer.MAX_VALUE) ? minimumAreaFound : 0;
  }

  public String convertPointToString(int x, int y) {
    return String.valueOf(x) + ":" + String.valueOf(y);
  }

  public HashSet<String> createPointSet(int[][] points) {
    HashSet<String> pointSet = new HashSet<String>();
    for (int[] point : points) {
      int x = point[0];
      int y = point[1];
      String pointString = convertPointToString(x, y);
      pointSet.add(pointString);
    }

    return pointSet;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[][] input =
        new int[][] {
          {1, 5},
          {5, 1},
          {4, 2},
          {2, 4},
          {2, 2},
          {1, 2},
          {4, 5},
          {2, 5},
          {-1, -2}
        };
    int expected = 3;
    var actual = new Program().minimumAreaRectangle(input);
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
    [1, 5],
    [5, 1],
    [4, 2],
    [2, 4],
    [2, 2],
    [1, 2],
    [4, 5],
    [2, 5],
    [-1, -2],
  ];
  const expected = 3;
  const actual = program.minimumAreaRectangle(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space - where n is the number of points
function minimumAreaRectangle(points) {
  const columns = initializeColumns(points);
  let minimumAreaFound = Infinity;
  const edgesParallelToYAxis = {};

  const sortedColumns = Object.keys(columns)
    .map(col => parseInt(col))
    .sort((a, b) => a - b);
  for (const x of sortedColumns) {
    const yValuesInCurrentColumn = columns[x].sort((a, b) => a - b);

    for (let currentIdx = 0; currentIdx < yValuesInCurrentColumn.length; currentIdx++) {
      const y2 = yValuesInCurrentColumn[currentIdx];
      for (let previousIdx = 0; previousIdx < currentIdx; previousIdx++) {
        const y1 = yValuesInCurrentColumn[previousIdx];
        const pointString = y1.toString() + ':' + y2.toString();

        if (pointString in edgesParallelToYAxis) {
          const currentArea = (x - edgesParallelToYAxis[pointString]) * (y2 - y1);
          minimumAreaFound = Math.min(minimumAreaFound, currentArea);
        }

        edgesParallelToYAxis[pointString] = x;
      }
    }
  }

  return minimumAreaFound !== Infinity ? minimumAreaFound : 0;
}

function initializeColumns(points) {
  const columns = {};

  for (const point of points) {
    const [x, y] = point;
    if (!columns[x]) {
      columns[x] = [];
    }
    columns[x].push(y);
  }

  return columns;
}

// Do not edit the line below.
exports.minimumAreaRectangle = minimumAreaRectangle;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space - where n is the number of points
function minimumAreaRectangle(points) {
  const pointSet = createPointSet(points);
  let minimumAreaFound = Infinity;

  for (let currentIdx = 0; currentIdx < points.length; currentIdx++) {
    const [p2x, p2y] = points[currentIdx];
    for (let previousIdx = 0; previousIdx < currentIdx; previousIdx++) {
      const [p1x, p1y] = points[previousIdx];
      const pointsShareValue = p1x === p2x || p1y === p2y;

      if (pointsShareValue) continue;

      // If (p1x, p2y) and (p2x, p1y), exist we've found a rectangle.
      const point1OnOppositeDiagonalExists = pointSet.has(convertPointToString(p1x, p2y));
      const point2OnOppositeDiagonalExists = pointSet.has(convertPointToString(p2x, p1y));
      const oppositeDiagonalExists = point1OnOppositeDiagonalExists && point2OnOppositeDiagonalExists;

      if (oppositeDiagonalExists) {
        const currentArea = Math.abs(p2x - p1x) * Math.abs(p2y - p1y);
        minimumAreaFound = Math.min(minimumAreaFound, currentArea);
      }
    }
  }

  return minimumAreaFound !== Infinity ? minimumAreaFound : 0;
}

function createPointSet(points) {
  const pointSet = new Set();

  for (const point of points) {
    const [x, y] = point;
    const pointString = convertPointToString(x, y);
    pointSet.add(pointString);
  }

  return pointSet;
}

function convertPointToString(x, y) {
  return x.toString() + ':' + y.toString();
}

// Do not edit the line below.
exports.minimumAreaRectangle = minimumAreaRectangle;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [
    [1, 5],
    [5, 1],
    [4, 2],
    [2, 4],
    [2, 2],
    [1, 2],
    [4, 5],
    [2, 5],
    [-1, -2],
  ];
  const expected = 3;
  const actual = program.minimumAreaRectangle(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.minimumAreaRectangle

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(
            listOf(1, 5),
            listOf(5, 1),
            listOf(4, 2),
            listOf(2, 4),
            listOf(2, 2),
            listOf(1, 2),
            listOf(4, 5),
            listOf(2, 5),
            listOf(-1, -2)
        )
        val expected = 3
        val output = minimumAreaRectangle(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.min

// O(n^2) time | O(n) space - where n is the number of points
fun minimumAreaRectangle(points: List<List<Int>>): Int {
    val columns = initializeColumns(points)
    var minimumAreaFound = Int.MAX_VALUE
    val edgesParallelToYAxis = mutableMapOf<String, Int>()

    val sortedColumns = columns.keys.toMutableList()
    sortedColumns.sort()
    for (x in sortedColumns) {
        val yValuesInCurrentColumn = columns[x]!!
        yValuesInCurrentColumn.sort()

        for (currentIdx in 0 until yValuesInCurrentColumn.size) {
            val y2 = yValuesInCurrentColumn[currentIdx]
            for (previousIdx in 0 until currentIdx) {
                val y1 = yValuesInCurrentColumn[previousIdx]
                val pointString = y1.toString() + ":" + y2.toString()

                if (pointString in edgesParallelToYAxis) {
                    val currentArea = (x - edgesParallelToYAxis[pointString]!!) * (y2 - y1)
                    minimumAreaFound = min(minimumAreaFound, currentArea)
                }

                edgesParallelToYAxis[pointString] = x
            }
        }
    }

    return if (minimumAreaFound != Int.MAX_VALUE) minimumAreaFound else 0
}

fun initializeColumns(points: List<List<Int>>): Map<Int, MutableList<Int>> {
    val columns = mutableMapOf<Int, MutableList<Int>>()

    for (point in points) {
        val (x, y) = point
        if (!(x in columns)) columns[x] = mutableListOf<Int>()

        columns[x]!!.add(y)
    }

    return columns
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.abs
import kotlin.math.min

// O(n^2) time | O(n) space - where n is the number of points
fun minimumAreaRectangle(points: List<List<Int>>): Int {
    val pointSet = createPointSet(points)
    var minimumAreaFound = Int.MAX_VALUE

    for (currentIdx in 0 until points.size) {
        val (p2x, p2y) = points[currentIdx]
        for (previousIdx in 0 until currentIdx) {
            val (p1x, p1y) = points[previousIdx]
            val pointsShareValue = p1x == p2x || p1y == p2y

            if (pointsShareValue) continue

            // If (p1x, p2y) and (p2x, p1y), exist we've found a rectangle.
            val point1OnOppositeDiagonalExists = convertPointToString(p1x, p2y) in pointSet
            val point2OnOppositeDiagonalExists = convertPointToString(p2x, p1y) in pointSet
            val oppositeDiagonalExists = point1OnOppositeDiagonalExists && point2OnOppositeDiagonalExists

            if (oppositeDiagonalExists) {
                val currentArea = abs(p2x - p1x) * abs(p2y - p1y)
                minimumAreaFound = min(minimumAreaFound, currentArea)
            }
        }
    }

    return if (minimumAreaFound != Int.MAX_VALUE) minimumAreaFound else 0
}

fun createPointSet(points: List<List<Int>>): Set<String> {
    val pointSet = mutableSetOf<String>()

    for (point in points) {
        val (x, y) = point
        val pointString = convertPointToString(x, y)
        pointSet.add(pointString)
    }

    return pointSet
}

fun convertPointToString(x: Int, y: Int): String {
    return x.toString() + ":" + y.toString()
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.minimumAreaRectangle

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(
            listOf(1, 5),
            listOf(5, 1),
            listOf(4, 2),
            listOf(2, 4),
            listOf(2, 2),
            listOf(1, 2),
            listOf(4, 5),
            listOf(2, 5),
            listOf(-1, -2)
        )
        val expected = 3
        val output = minimumAreaRectangle(input)
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
      var input = [
        [1, 5],
        [5, 1],
        [4, 2],
        [2, 4],
        [2, 2],
        [1, 2],
        [4, 5],
        [2, 5],
        [-1, -2],
      ]
      var expected = 3
      var actual = Program().minimumAreaRectangle(input)
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
  func minimumAreaRectangle(_ points: [[Int]]) -> Int {
    var columns = initializeColumns(points)
    var minimumAreaFound = Int.max
    var edgesParallelToYAxis = [String: Int]()

    var sortedColumns = Array(columns.keys).sorted()

    for x in sortedColumns {
      var yValuesInCurrentColumn = columns[x]!.sorted()

      for currentIdx in 0 ..< yValuesInCurrentColumn.count {
        let y2 = yValuesInCurrentColumn[currentIdx]
        for previousIdx in 0 ..< currentIdx {
          let y1 = yValuesInCurrentColumn[previousIdx]
          let pointString = String(y1) + ":" + String(y2)

          if edgesParallelToYAxis[pointString] != nil {
            let currentArea = (x - edgesParallelToYAxis[pointString]!) * (y2 - y1)
            minimumAreaFound = min(minimumAreaFound, currentArea)
          }

          edgesParallelToYAxis[pointString] = x
        }
      }
    }

    if minimumAreaFound != Int.max {
      return minimumAreaFound
    }
    return 0
  }

  func initializeColumns(_ points: [[Int]]) -> [Int: [Int]] {
    var columns = [Int: [Int]]()
    for point in points {
      let x = point[0]
      let y = point[1]
      if columns[x] == nil {
        columns[x] = [Int]()
      }
      columns[x]!.append(y)
    }
    return columns
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(n) space - where n is the number of points
  func minimumAreaRectangle(_ points: [[Int]]) -> Int {
    let pointSet = createPointSet(points)
    var minimumAreaFound = Int.max

    for currentIdx in 0 ..< points.count {
      let p2x = points[currentIdx][0]
      let p2y = points[currentIdx][1]
      for previousIdx in 0 ..< currentIdx {
        let p1x = points[previousIdx][0]
        let p1y = points[previousIdx][1]

        let pointsShareValue = p1x == p2x || p1y == p2y
        if pointsShareValue {
          continue
        }

        // If (p1x, p2y) and (p2x, p1y), exist we've found a rectangle.
        let point1OnOppositeDiagonalExists = pointSet.contains(convertPointToString(p1x, p2y))
        let point2OnOppositeDiagonalExists = pointSet.contains(convertPointToString(p2x, p1y))
        let oppositeDiagonalExists = point1OnOppositeDiagonalExists && point2OnOppositeDiagonalExists

        if oppositeDiagonalExists {
          let currentArea = abs(p2x - p1x) * abs(p2y - p1y)
          minimumAreaFound = min(minimumAreaFound, currentArea)
        }
      }
    }
    if minimumAreaFound != Int.max {
      return minimumAreaFound
    }
    return 0
  }

  func createPointSet(_ points: [[Int]]) -> Set<String> {
    var pointSet: Set<String> = []
    for point in points {
      let x = point[0]
      let y = point[1]
      let pointString = convertPointToString(x, y)
      pointSet.insert(pointString)
    }
    return pointSet
  }

  func convertPointToString(_ x: Int, _ y: Int) -> String {
    return String(x) + ":" + String(y)
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = [
        [1, 5],
        [5, 1],
        [4, 2],
        [2, 4],
        [2, 2],
        [1, 2],
        [4, 5],
        [2, 5],
        [-1, -2],
      ]
      var expected = 3
      var actual = Program().minimumAreaRectangle(input)
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
        input = [[1, 5], [5, 1], [4, 2], [2, 4], [2, 2], [1, 2], [4, 5], [2, 5], [-1, -2]]
        expected = 3
        actual = program.minimumAreaRectangle(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n) space - where n is the number of points
def minimumAreaRectangle(points):
    columns = initializeColumns(points)
    minimumAreaFound = float("inf")
    edgesParallelToYAxis = {}

    sortedColumns = sorted(columns.keys())
    for x in sortedColumns:
        yValuesInCurrentColumn = columns[x]
        yValuesInCurrentColumn.sort()

        for currentIdx, y2 in enumerate(yValuesInCurrentColumn):
            for previousIdx in range(currentIdx):
                y1 = yValuesInCurrentColumn[previousIdx]
                pointString = str(y1) + ":" + str(y2)

                if pointString in edgesParallelToYAxis:
                    currentArea = (x - edgesParallelToYAxis[pointString]) * (y2 - y1)
                    minimumAreaFound = min(minimumAreaFound, currentArea)

                edgesParallelToYAxis[pointString] = x

    return minimumAreaFound if minimumAreaFound != float("inf") else 0


def initializeColumns(points):
    columns = {}

    for point in points:
        x, y = point
        if x not in columns:
            columns[x] = []

        columns[x].append(y)

    return columns

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n) space - where n is the number of points
def minimumAreaRectangle(points):
    pointSet = createPointSet(points)
    minimumAreaFound = float("inf")

    for currentIdx, p2 in enumerate(points):
        p2x, p2y = p2
        for previousIdx in range(currentIdx):
            p1x, p1y = points[previousIdx]
            pointsShareValue = p1x == p2x or p1y == p2y

            if pointsShareValue:
                continue

            # If (p1x, p2y) and (p2x, p1y), exist we've found a rectangle.
            point1OnOppositeDiagonalExists = convertPointToString(p1x, p2y) in pointSet
            point2OnOppositeDiagonalExists = convertPointToString(p2x, p1y) in pointSet
            oppositeDiagonalExists = point1OnOppositeDiagonalExists and point2OnOppositeDiagonalExists

            if oppositeDiagonalExists:
                currentArea = abs(p2x - p1x) * abs(p2y - p1y)
                minimumAreaFound = min(minimumAreaFound, currentArea)

    return minimumAreaFound if minimumAreaFound != float("inf") else 0


def createPointSet(points):
    pointSet = set()

    for point in points:
        x, y = point
        pointString = convertPointToString(x, y)
        pointSet.add(pointString)

    return pointSet


def convertPointToString(x, y):
    return str(x) + ":" + str(y)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [[1, 5], [5, 1], [4, 2], [2, 4], [2, 2], [1, 2], [4, 5], [2, 5], [-1, -2]]
        expected = 3
        actual = program.minimumAreaRectangle(input)
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
    [1, 5],
    [5, 1],
    [4, 2],
    [2, 4],
    [2, 2],
    [1, 2],
    [4, 5],
    [2, 5],
    [-1, -2],
  ];
  const expected = 3;
  const actual = program.minimumAreaRectangle(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space - where n is the number of points
export function minimumAreaRectangle(points: number[][]) {
  const columns = initializeColumns(points);
  let minimumAreaFound = Infinity;
  const edgesParallelToYAxis: {[edge: string]: number} = {};

  const sortedColumns = Object.keys(columns)
    .map(col => parseInt(col))
    .sort((a, b) => a - b);
  for (const x of sortedColumns) {
    const yValuesInCurrentColumn = columns[x].sort((a, b) => a - b);

    for (let currentIdx = 0; currentIdx < yValuesInCurrentColumn.length; currentIdx++) {
      const y2 = yValuesInCurrentColumn[currentIdx];
      for (let previousIdx = 0; previousIdx < currentIdx; previousIdx++) {
        const y1 = yValuesInCurrentColumn[previousIdx];
        const pointString = y1.toString() + ':' + y2.toString();

        if (pointString in edgesParallelToYAxis) {
          const currentArea = (x - edgesParallelToYAxis[pointString]) * (y2 - y1);
          minimumAreaFound = Math.min(minimumAreaFound, currentArea);
        }

        edgesParallelToYAxis[pointString] = x;
      }
    }
  }

  return minimumAreaFound !== Infinity ? minimumAreaFound : 0;
}

function initializeColumns(points: number[][]) {
  const columns: {[x: number]: number[]} = {};

  for (const point of points) {
    const [x, y] = point;
    if (!columns[x]) {
      columns[x] = [];
    }
    columns[x].push(y);
  }

  return columns;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space - where n is the number of points
export function minimumAreaRectangle(points: number[][]) {
  const pointSet = createPointSet(points);
  let minimumAreaFound = Infinity;

  for (let currentIdx = 0; currentIdx < points.length; currentIdx++) {
    const [p2x, p2y] = points[currentIdx];
    for (let previousIdx = 0; previousIdx < currentIdx; previousIdx++) {
      const [p1x, p1y] = points[previousIdx];
      const pointsShareValue = p1x === p2x || p1y === p2y;

      if (pointsShareValue) continue;

      // If (p1x, p2y) and (p2x, p1y), exist we've found a rectangle.
      const point1OnOppositeDiagonalExists = pointSet.has(convertPointToString(p1x, p2y));
      const point2OnOppositeDiagonalExists = pointSet.has(convertPointToString(p2x, p1y));
      const oppositeDiagonalExists = point1OnOppositeDiagonalExists && point2OnOppositeDiagonalExists;

      if (oppositeDiagonalExists) {
        const currentArea = Math.abs(p2x - p1x) * Math.abs(p2y - p1y);
        minimumAreaFound = Math.min(minimumAreaFound, currentArea);
      }
    }
  }

  return minimumAreaFound !== Infinity ? minimumAreaFound : 0;
}

function createPointSet(points: number[][]) {
  const pointSet: Set<String> = new Set();

  for (const point of points) {
    const [x, y] = point;
    const pointString = convertPointToString(x, y);
    pointSet.add(pointString);
  }

  return pointSet;
}

function convertPointToString(x: number, y: number) {
  return x.toString() + ':' + y.toString();
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [
    [1, 5],
    [5, 1],
    [4, 2],
    [2, 4],
    [2, 2],
    [1, 2],
    [4, 5],
    [2, 5],
    [-1, -2],
  ];
  const expected = 3;
  const actual = program.minimumAreaRectangle(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

