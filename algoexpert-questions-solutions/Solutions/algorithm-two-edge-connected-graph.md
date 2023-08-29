# Two-Edge-Connected Graph
<div class="html">
<p>
  You're given a list of <span>edges</span> representing an unweighted and
  undirected graph. Write a function that returns a boolean representing whether
  the given graph is two-edge-connected.
</p>
<p>
  A graph is connected if, for every pair of vertices in the graph, there's a
  path of one or more edges connecting the given vertices. A graph that isn't
  connected is said to be disconnected.
</p>
<p>
  A graph is two-edge-connected if, for every one of its edges, the edge's
  removal from the graph doesn't cause the graph to become disconnected. If the
  removal of any single edge disconnects the graph, then it isn't
  two-edge-connected. If the given graph is already disconnected, then it also
  isn't two-edge-connected. An empty graph is considered two-edge-connected.
</p>
<p>
  The input list is what's called an adjacency list, and it represents a graph.
  The number of vertices in the graph is equal to the length of
  <span>edges</span>, where each index <span>i</span> in
  <span>edges</span> contains vertex <span>i</span>'s outbound edges, in no
  particular order. Each outbound edge is represented by a positive integer that
  denotes an index (a destination vertex) in the list that this vertex is
  connected to. Note that these edges are undirected, meaning that you can
  travel from a particular vertex to its destination and from the destination
  back to that vertex. Since these edges are undirected, if vertex
  <span>i</span> has an outbound edge to vertex <span>j</span>, then vertex
  <span>j</span> is guaranteed to have an outbound edge to vertex
  <span>i</span>. For example, an undirected graph with two vertices and one
  edge would be represented by the following adjacency list
  <span>edges = [[1], [0]]</span>.
</p>
<p>
  Note that the input graph will never contain parallel edges (edges that share
  the same source and destination vertices). In other words, there will never be
  more than one edge that connects the same two vertices to each other.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">edges</span> = [
  [1, 2, 5],
  [0, 2],
  [0, 1, 3],
  [2, 4, 5],
  [3, 5],
  [0, 3, 4],
]
</pre>
<h3>Sample Output</h3>
<pre>
true 
</pre>
</div>

Hint 1
<p>
  The brute-force approach to solving this problem is to simply remove one edge
  from the graph at a time and to then check if the resulting graph is
  disconnected. This approach works, but is isn't optimal. Can you think of a
  better approach?
</p>


Hint 2

<p>
  It's easy to see that, if there's only one edge that connects a vertex or a
  group of vertices to the rest of the graph, then this graph isn't
  two-edge-connected. This is because, after the removal of that particular
  edge, the graph would become disconnected. This type of edge is what's known
  as a bridge; if you discover a bridge in the graph, the graph isn't
  two-edge-connected.
</p>


Hint 3

<p>
  In order for a graph to be two-edge-connected, it must be connected before the
  removal of any edges, and it must not contain any bridges. To determine if a
  graph is connected, you can simply run a depth-first search from any vertex
  and see if you're able to visit every other vertex. To determine if a graph
  contains any bridges is a little bit more difficult, but it can be done with a
  modified depth-first search that considers the different types of edges in the
  graph.
</p>


Hint 4

<p>
  To confirm that no bridges exist in the graph, you need to see if there's an
  edge from every vertex in the graph to a vertex that is visited before it in a
  depth-first search (this is known as a back edge). A back edge indicates that
  there's a way to reach a vertex other than from the original edge that reached
  it. This means that if you remove the original edge that reached a vertex, it
  can still be visited, and the original edge you've just removed isn't a
  bridge. If every vertex in the graph (with the exception of the starting
  vertex in a given depth-first search) has a back edge, then the graph is
  two-edge-connected. See the Conceptual Overview section of this question's
  video explanation for a more in-depth explanation.
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
      vector<vector<int>> input = {{1, 2, 5}, {0, 2}, {0, 1, 3},
                                   {2, 4, 5}, {3, 5}, {0, 3, 5}};
      auto expected = true;
      auto actual = twoEdgeConnectedGraph(input);
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

bool areAllVerticesVisited(const vector<int> &arrivalTimes);
int getMinimumArrivalTimeOfAncestors(int currentVertex, int parent,
                                     int currentTime, vector<int> &arrivalTimes,
                                     const vector<vector<int>> &edges);

// O(v + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the graph
bool twoEdgeConnectedGraph(vector<vector<int>> edges) {
  if (edges.size() == 0)
    return true;

  vector<int> arrivalTimes(edges.size(), -1);
  int startVertex = 0;

  if (getMinimumArrivalTimeOfAncestors(startVertex, -1, 0, arrivalTimes,
                                       edges) == -1) {
    return false;
  }

  return areAllVerticesVisited(arrivalTimes);
}

bool areAllVerticesVisited(const vector<int> &arrivalTimes) {
  for (const auto &time : arrivalTimes) {
    if (time == -1)
      return false;
  }

  return true;
}

int getMinimumArrivalTimeOfAncestors(int currentVertex, int parent,
                                     int currentTime, vector<int> &arrivalTimes,
                                     const vector<vector<int>> &edges) {
  arrivalTimes[currentVertex] = currentTime;

  int minimumArrivalTime = currentTime;

  for (const auto &destination : edges[currentVertex]) {
    if (arrivalTimes[destination] == -1) {
      minimumArrivalTime =
          min(minimumArrivalTime, getMinimumArrivalTimeOfAncestors(
                                      destination, currentVertex,
                                      currentTime + 1, arrivalTimes, edges));
    } else if (destination != parent) {
      minimumArrivalTime = min(minimumArrivalTime, arrivalTimes[destination]);
    }
  }

  // A bridge was detected, which means the graph isn't two-edge-connected.
  if (minimumArrivalTime == currentTime && parent != -1)
    return -1;

  return minimumArrivalTime;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> input = {{1, 2, 5}, {0, 2}, {0, 1, 3},
                                   {2, 4, 5}, {3, 5}, {0, 3, 5}};
      auto expected = true;
      auto actual = twoEdgeConnectedGraph(input);
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
			new int[] { 1, 2, 5 },
			new int[] { 0, 2 },
			new int[] { 0, 1, 3 },
			new int[] { 2, 4, 5 },
			new int[] { 3, 5 },
			new int[] { 0, 3, 4 },
		};
		bool expected = true;
		var actual = new Program().TwoEdgeConnectedGraph(input);
		Utils.AssertTrue(expected == actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	// O(v + e) time | O(v) space - where v is the number of
	// vertices and e is the number of edges in the graph
	public bool TwoEdgeConnectedGraph(int[][] edges) {
		if (edges.Length == 0) return true;

		int[] arrivalTimes = new int[edges.Length];
		Array.Fill(arrivalTimes, -1);
		int startVertex = 0;

		if (getMinimumArrivalTimeOfAncestors(startVertex, -1, 0, arrivalTimes,
		  edges) == -1) {
			return false;
		}

		return areAllVerticesVisited(arrivalTimes);
	}

	public bool areAllVerticesVisited(int[] arrivalTimes) {
		foreach (var time in arrivalTimes) {
			if (time == -1) {
				return false;
			}
		}
		return true;
	}

	public int getMinimumArrivalTimeOfAncestors(int currentVertex, int parent, int currentTime,
	  int[] arrivalTimes, int[][] edges) {
		arrivalTimes[currentVertex] = currentTime;

		int minimumArrivalTime = currentTime;

		foreach (var destination in edges[currentVertex]) {
			if (arrivalTimes[destination] == -1) {
				minimumArrivalTime = Math.Min(minimumArrivalTime, getMinimumArrivalTimeOfAncestors(
					    destination, currentVertex, currentTime + 1,
					    arrivalTimes,
					    edges));
			} else if (destination != parent) {
				minimumArrivalTime =
				  Math.Min(minimumArrivalTime, arrivalTimes[destination]);
			}
		}

		// A bridge was detected, which means the graph isn't two-edge-connected.
		if (minimumArrivalTime == currentTime && parent != -1) {
			return -1;
		}

		return minimumArrivalTime;
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
			new int[] { 1, 2, 5 },
			new int[] { 0, 2 },
			new int[] { 0, 1, 3 },
			new int[] { 2, 4, 5 },
			new int[] { 3, 5 },
			new int[] { 0, 3, 4 },
		};
		bool expected = true;
		var actual = new Program().TwoEdgeConnectedGraph(input);
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
		{1, 2, 5},
		{0, 2},
		{0, 1, 3},
		{2, 4, 5},
		{3, 5},
		{0, 3, 4},
	}
	expected := true
	actual := TwoEdgeConnectedGraph(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(v + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the graph
func TwoEdgeConnectedGraph(edges [][]int) bool {
	if len(edges) == 0 {
		return true
	}

	arrivalTimes := make([]int, len(edges))
	for i := range edges {
		arrivalTimes[i] = -1
	}
	startVertex := 0

	if getMinimumArrivalTimeOfAncestors(startVertex, -1, 0, &arrivalTimes, edges) == -1 {
		return false
	}

	return areAllVerticesVisited(arrivalTimes)
}

func areAllVerticesVisited(arrivalTimes []int) bool {
	for _, time := range arrivalTimes {
		if time == -1 {
			return false
		}
	}
	return true
}

func getMinimumArrivalTimeOfAncestors(currentVertex, parent, currentTime int, arrivalTimes *[]int, edges [][]int) int {
	(*arrivalTimes)[currentVertex] = currentTime

	var minimumArrivalTime = currentTime

	for _, destination := range edges[currentVertex] {
		if (*arrivalTimes)[destination] == -1 {
			minimumArrivalTime = min(
				minimumArrivalTime,
				getMinimumArrivalTimeOfAncestors(destination, currentVertex, currentTime+1, arrivalTimes, edges),
			)
		} else if destination != parent {
			minimumArrivalTime = min(
				minimumArrivalTime,
				(*arrivalTimes)[destination],
			)
		}
	}

	// A bridge was detected, which means the graph isn't two-edge-connected.
	if minimumArrivalTime == currentTime && parent != -1 {
		return -1
	}

	return minimumArrivalTime
}

func min(a, b int) int {
	if a < b {
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
	input := [][]int{
		{1, 2, 5},
		{0, 2},
		{0, 1, 3},
		{2, 4, 5},
		{3, 5},
		{0, 3, 4},
	}
	expected := true
	actual := TwoEdgeConnectedGraph(input)
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
    int[][] input = new int[][] {{1, 2, 5}, {0, 2}, {0, 1, 3}, {2, 4, 5}, {3, 5}, {0, 3, 4}};
    boolean expected = true;
    var actual = new Program().twoEdgeConnectedGraph(input);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(v + e) time | O(v) space - where v is the number of
  // vertices and e is the number of edges in the graph
  public boolean twoEdgeConnectedGraph(int[][] edges) {
    if (edges.length == 0) return true;

    int[] arrivalTimes = new int[edges.length];
    Arrays.fill(arrivalTimes, -1);
    int startVertex = 0;

    if (getMinimumArrivalTimeOfAncestors(startVertex, -1, 0, arrivalTimes, edges) == -1) {
      return false;
    }

    return areAllVerticesVisited(arrivalTimes);
  }

  public boolean areAllVerticesVisited(int[] arrivalTimes) {
    for (int time : arrivalTimes) {
      if (time == -1) {
        return false;
      }
    }
    return true;
  }

  public int getMinimumArrivalTimeOfAncestors(
      int currentVertex, int parent, int currentTime, int[] arrivalTimes, int[][] edges) {
    arrivalTimes[currentVertex] = currentTime;

    int minimumArrivalTime = currentTime;

    for (int destination : edges[currentVertex]) {
      if (arrivalTimes[destination] == -1) {
        minimumArrivalTime =
            Math.min(
                minimumArrivalTime,
                getMinimumArrivalTimeOfAncestors(
                    destination, currentVertex, currentTime + 1, arrivalTimes, edges));
      } else if (destination != parent) {
        minimumArrivalTime = Math.min(minimumArrivalTime, arrivalTimes[destination]);
      }
    }

    // A bridge was detected, which means the graph isn't two-edge-connected.
    if (minimumArrivalTime == currentTime && parent != -1) {
      return -1;
    }

    return minimumArrivalTime;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[][] input = new int[][] {{1, 2, 5}, {0, 2}, {0, 1, 3}, {2, 4, 5}, {3, 5}, {0, 3, 4}};
    boolean expected = true;
    var actual = new Program().twoEdgeConnectedGraph(input);
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
    [1, 2, 5],
    [0, 2],
    [0, 1, 3],
    [2, 4, 5],
    [3, 5],
    [0, 3, 4],
  ];
  const expected = true;
  const actual = program.twoEdgeConnectedGraph(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(v + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the graph
function twoEdgeConnectedGraph(edges) {
  if (edges.length === 0) return true;

  const arrivalTimes = new Array(edges.length).fill(-1);
  const startVertex = 0;

  if (getMinimumArrivalTimeOfAncestors(startVertex, -1, 0, arrivalTimes, edges) === -1) {
    return false;
  }

  return areAllVerticesVisited(arrivalTimes);
}

function areAllVerticesVisited(arrivalTimes) {
  for (const time of arrivalTimes) {
    if (time === -1) return false;
  }

  return true;
}

function getMinimumArrivalTimeOfAncestors(currentVertex, parent, currentTime, arrivalTimes, edges) {
  arrivalTimes[currentVertex] = currentTime;

  let minimumArrivalTime = currentTime;

  for (const destination of edges[currentVertex]) {
    if (arrivalTimes[destination] === -1) {
      minimumArrivalTime = Math.min(
        minimumArrivalTime,
        getMinimumArrivalTimeOfAncestors(destination, currentVertex, currentTime + 1, arrivalTimes, edges),
      );
    } else if (destination !== parent) {
      minimumArrivalTime = Math.min(minimumArrivalTime, arrivalTimes[destination]);
    }
  }

  // A bridge was detected, which means the graph isn't two-edge-connected.
  if (minimumArrivalTime === currentTime && parent !== -1) return -1;

  return minimumArrivalTime;
}

// Do not edit the line below.
exports.twoEdgeConnectedGraph = twoEdgeConnectedGraph;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [
    [1, 2, 5],
    [0, 2],
    [0, 1, 3],
    [2, 4, 5],
    [3, 5],
    [0, 3, 4],
  ];
  const expected = true;
  const actual = program.twoEdgeConnectedGraph(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.twoEdgeConnectedGraph

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(
            listOf(1, 2, 5),
            listOf(0, 2),
            listOf(0, 1, 3),
            listOf(2, 4, 5),
            listOf(3, 5),
            listOf(0, 3, 4)
        )
        val expected = true
        val output = twoEdgeConnectedGraph(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.min

// O(v + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the graph
fun twoEdgeConnectedGraph(edges: List<List<Int>>): Boolean {
    if (edges.size == 0) return true

    val arrivalTimes = MutableList(edges.size) { -1 }
    val startVertex = 0

    if (
        getMinimumArrivalTimeOfAncestors(
                startVertex,
                -1,
                0,
                arrivalTimes,
                edges
            ) == -1
    ) {
        return false
    }

    return areAllVerticesVisited(arrivalTimes)
}

fun areAllVerticesVisited(arrivalTimes: List<Int>): Boolean {
    for (time in arrivalTimes) {
        if (time == -1) return false
    }

    return true
}

fun getMinimumArrivalTimeOfAncestors(
    currentVertex: Int,
    parent: Int,
    currentTime: Int,
    arrivalTimes: MutableList<Int>,
    edges: List<List<Int>>
): Int {
    arrivalTimes[currentVertex] = currentTime

    var minimumArrivalTime = currentTime

    for (destination in edges[currentVertex]) {
        if (arrivalTimes[destination] == -1) {
            minimumArrivalTime = min(
                minimumArrivalTime,
                getMinimumArrivalTimeOfAncestors(
                    destination,
                    currentVertex,
                    currentTime + 1,
                    arrivalTimes,
                    edges
                )
            )
        } else if (destination != parent) {
            minimumArrivalTime = min(
                minimumArrivalTime,
                arrivalTimes[destination]
            )
        }
    }

    // A bridge was detected, which means the graph isn't two-edge-connected.
    if (minimumArrivalTime == currentTime && parent != -1) return -1

    return minimumArrivalTime
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.twoEdgeConnectedGraph

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(
            listOf(1, 2, 5),
            listOf(0, 2),
            listOf(0, 1, 3),
            listOf(2, 4, 5),
            listOf(3, 5),
            listOf(0, 3, 4)
        )
        val expected = true
        val output = twoEdgeConnectedGraph(input)
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
        [1, 2, 5],
        [0, 2],
        [0, 1, 3],
        [2, 4, 5],
        [3, 5],
        [0, 3, 4],
      ]
      var expected = true
      var actual = Program().twoEdgeConnectedGraph(&input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(v + e) time | O(v) space - where v is the number of
  // vertices and e is the number of edges in the graph
  func twoEdgeConnectedGraph(_ edges: inout [[Int]]) -> Bool {
    if edges.count == 0 {
      return true
    }

    var arrivalTimes = Array(repeating: -1, count: edges.count)
    let startVertex = 0

    if getMinimumArrivalTimeOfAncestors(startVertex, -1, 0, &arrivalTimes, &edges) == -1 {
      return false
    }

    return areAllVerticesVisited(arrivalTimes)
  }

  func areAllVerticesVisited(_ arrivalTimes: [Int]) -> Bool {
    for time in arrivalTimes {
      if time == -1 {
        return false
      }
    }
    return true
  }

  func getMinimumArrivalTimeOfAncestors(_ currentVertex: Int, _ parent: Int, _ currentTime: Int,
                                        _ arrivalTimes: inout [Int], _ edges: inout [[Int]]) -> Int
  {
    arrivalTimes[currentVertex] = currentTime

    var minimumArrivalTime = currentTime

    for destination in edges[currentVertex] {
      if arrivalTimes[destination] == -1 {
        minimumArrivalTime = min(
          minimumArrivalTime,
          getMinimumArrivalTimeOfAncestors(destination, currentVertex, currentTime + 1, &arrivalTimes, &edges)
        )
      } else if destination != parent {
        minimumArrivalTime = min(
          minimumArrivalTime,
          arrivalTimes[destination]
        )
      }
    }

    // A bridge was detected, which means the graph isn't two-edge-connected.
    if minimumArrivalTime == currentTime, parent != -1 {
      return -1
    }

    return minimumArrivalTime
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = [
        [1, 2, 5],
        [0, 2],
        [0, 1, 3],
        [2, 4, 5],
        [3, 5],
        [0, 3, 4],
      ]
      var expected = true
      var actual = Program().twoEdgeConnectedGraph(&input)
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
        input = [[1, 2, 5], [0, 2], [0, 1, 3], [2, 4, 5], [3, 5], [0, 3, 4]]
        expected = True
        actual = program.twoEdgeConnectedGraph(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(v + e) time | O(v) space - where v is the number of
# vertices and e is the number of edges in the graph
def twoEdgeConnectedGraph(edges):
    if len(edges) == 0:
        return True

    arrivalTimes = [-1] * len(edges)
    startVertex = 0

    if getMinimumArrivalTimeOfAncestors(startVertex, -1, 0, arrivalTimes, edges) == -1:
        return False

    return areAllVerticesVisited(arrivalTimes)


def areAllVerticesVisited(arrivalTimes):
    for time in arrivalTimes:
        if time == -1:
            return False

    return True


def getMinimumArrivalTimeOfAncestors(currentVertex, parent, currentTime, arrivalTimes, edges):
    arrivalTimes[currentVertex] = currentTime

    minimumArrivalTime = currentTime

    for destination in edges[currentVertex]:
        if arrivalTimes[destination] == -1:
            minimumArrivalTime = min(
                minimumArrivalTime,
                getMinimumArrivalTimeOfAncestors(destination, currentVertex, currentTime + 1, arrivalTimes, edges),
            )
        elif destination != parent:
            minimumArrivalTime = min(minimumArrivalTime, arrivalTimes[destination])

    # A bridge was detected, which means the graph isn't two-edge-connected.
    if minimumArrivalTime == currentTime and parent != -1:
        return -1

    return minimumArrivalTime

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [[1, 2, 5], [0, 2], [0, 1, 3], [2, 4, 5], [3, 5], [0, 3, 4]]
        expected = True
        actual = program.twoEdgeConnectedGraph(input)
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
    [1, 2, 5],
    [0, 2],
    [0, 1, 3],
    [2, 4, 5],
    [3, 5],
    [0, 3, 4],
  ];
  const expected = true;
  const actual = program.twoEdgeConnectedGraph(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(v + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the graph
export function twoEdgeConnectedGraph(edges: number[][]) {
  if (edges.length === 0) return true;

  const arrivalTimes = new Array(edges.length).fill(-1);
  const startVertex = 0;

  if (getMinimumArrivalTimeOfAncestors(startVertex, -1, 0, arrivalTimes, edges) === -1) {
    return false;
  }

  return areAllVerticesVisited(arrivalTimes);
}

function areAllVerticesVisited(arrivalTimes: number[]) {
  for (const time of arrivalTimes) {
    if (time === -1) return false;
  }

  return true;
}

function getMinimumArrivalTimeOfAncestors(
  currentVertex: number,
  parent: number,
  currentTime: number,
  arrivalTimes: number[],
  edges: number[][],
) {
  arrivalTimes[currentVertex] = currentTime;

  let minimumArrivalTime = currentTime;

  for (const destination of edges[currentVertex]) {
    if (arrivalTimes[destination] === -1) {
      minimumArrivalTime = Math.min(
        minimumArrivalTime,
        getMinimumArrivalTimeOfAncestors(destination, currentVertex, currentTime + 1, arrivalTimes, edges),
      );
    } else if (destination !== parent) {
      minimumArrivalTime = Math.min(minimumArrivalTime, arrivalTimes[destination]);
    }
  }

  // A bridge was detected, which means the graph isn't two-edge-connected.
  if (minimumArrivalTime === currentTime && parent !== -1) return -1;

  return minimumArrivalTime;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [
    [1, 2, 5],
    [0, 2],
    [0, 1, 3],
    [2, 4, 5],
    [3, 5],
    [0, 3, 4],
  ];
  const expected = true;
  const actual = program.twoEdgeConnectedGraph(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

