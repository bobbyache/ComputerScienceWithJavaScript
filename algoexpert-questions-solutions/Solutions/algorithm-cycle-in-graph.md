# Cycle In Graph
<div class="html">
<p>
  You're given a list of <span>edges</span> representing an unweighted, directed
  graph with at least one node. Write a function that returns a boolean
  representing whether the given graph contains a cycle.
</p>
<p>
  For the purpose of this question, a cycle is defined as any number of
  vertices, including just one vertex, that are connected in a closed chain. A
  cycle can also be defined as a chain of at least one vertex in which the first
  vertex is the same as the last.
</p>
<p>
  The given list is what's called an adjacency list, and it represents a graph.
  The number of vertices in the graph is equal to the length of
  <span>edges</span>, where each index <span>i</span> in
  <span>edges</span> contains vertex <span>i</span>'s outbound edges, in no
  particular order. Each individual edge is represented by a positive integer
  that denotes an index (a destination vertex) in the list that this vertex is
  connected to. Note that these edges are directed, meaning that you can only
  travel from a particular vertex to its destination, not the other way around
  (unless the destination vertex itself has an outbound edge to the original
  vertex).
</p>
<p>
  Also note that this graph may contain self-loops. A self-loop is an edge that
  has the same destination and origin; in other words, it's an edge that
  connects a vertex to itself. For the purpose of this question, a self-loop is
  considered a cycle.
</p>
<p>
  For a more detailed explanation, please refer to the Conceptual Overview
  section of this question's video explanation.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">edges</span> = [
  [1, 3],
  [2, 3, 4],
  [0],
  [],
  [2, 5],
  [],
]
</pre>
<h3>Sample Output</h3>
<pre>
true 
<span class="CodeEditor-promptComment">// There are multiple cycles in this graph: </span>
<span class="CodeEditor-promptComment">// 1) 0 -> 1 -> 2 -> 0</span>
<span class="CodeEditor-promptComment">// 2) 0 -> 1 -> 4 -> 2 -> 0</span>
<span class="CodeEditor-promptComment">// 3) 1 -> 2 -> 0 -> 1</span>
<span class="CodeEditor-promptComment">// These are just 3 examples; there are more.</span>
</pre>
</div>

Hint 1
<p>
There are multiple ways to solve this problem, and they all make use of a depth-first-search traversal.
</p>


Hint 2

<p>
When traversing a graph using depth-first search, a back edge is an edge from a node to one of its ancestors in the depth-first-search tree, and a back edge denotes the presence of a cycle. How can you determine if a graph has any back edges?
</p>


Hint 3

<p>
To find back edges, you'll need to keep track of which nodes you've already visited and which nodes are ancestors of the current node in the depth-first-search tree. There are a few ways to do this, but one approach is to recursively traverse the graph and to keep track of which nodes have been visited in general and which nodes have been visited in the current recursion stack; you can do so with two separate data structures. If you reach a node that has an edge to a node that's already in the recursion stack, then you've detected a back edge, and there's a cycle in the graph.
</p>


Hint 4

<p>
Similar to the previous hint, you can also detect a back edge by performing a 3-color depth-first search. Each node is colored white to start; recursively traverse through the graph, coloring the current node grey and then calling the recursive traversal function on all of its neighbors. After traversing all the neighbors, color the current node black to signify that it's "done." If you ever find an edge to a node that's grey, you've found a back edge, and there's a cycle in the graph.
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
      vector<vector<int>> input = {{1, 3}, {2, 3, 4}, {0}, {}, {2, 5}, {}};
      auto expected = true;
      auto actual = cycleInGraph(input);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

bool isNodeInCycle(int node, vector<vector<int>> &edges, vector<bool> &visited,
                   vector<bool> &currentlyInStack);

// O(v + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the graph
bool cycleInGraph(vector<vector<int>> edges) {
  int numberOfNodes = edges.size();
  vector<bool> visited(numberOfNodes, false);
  vector<bool> currentlyInStack(numberOfNodes, false);

  for (int node = 0; node < numberOfNodes; node++) {
    if (visited[node])
      continue;

    bool containsCycle = isNodeInCycle(node, edges, visited, currentlyInStack);
    if (containsCycle)
      return true;
  }

  return false;
}

bool isNodeInCycle(int node, vector<vector<int>> &edges, vector<bool> &visited,
                   vector<bool> &currentlyInStack) {
  visited[node] = true;
  currentlyInStack[node] = true;

  auto neighbors = edges[node];
  for (auto neighbor : neighbors) {
    if (!visited[neighbor]) {
      bool containsCycle =
          isNodeInCycle(neighbor, edges, visited, currentlyInStack);
      if (containsCycle)
        return true;
    } else if (currentlyInStack[neighbor]) {
      return true;
    }
  }

  currentlyInStack[node] = false;
  return false;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

bool traverseAndColorNodes(int node, vector<vector<int>> &edges,
                           vector<int> &colors);
int WHITE = 0;
int GREY = 1;
int BLACK = 2;

// O(v + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the graph
bool cycleInGraph(vector<vector<int>> edges) {
  int numberOfNodes = edges.size();
  vector<int> colors(numberOfNodes, WHITE);

  for (int node = 0; node < numberOfNodes; node++) {
    if (colors[node] != WHITE)
      continue;

    bool containsCycle = traverseAndColorNodes(node, edges, colors);
    if (containsCycle)
      return true;
  }

  return false;
}

bool traverseAndColorNodes(int node, vector<vector<int>> &edges,
                           vector<int> &colors) {
  colors[node] = GREY;

  auto neighbors = edges[node];
  for (auto neighbor : neighbors) {
    int neighborColor = colors[neighbor];

    if (neighborColor == GREY)
      return true;

    if (neighborColor == BLACK)
      continue;

    bool containsCycle = traverseAndColorNodes(neighbor, edges, colors);
    if (containsCycle)
      return true;
  }

  colors[node] = BLACK;
  return false;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> input = {{1, 3}, {2, 3, 4}, {0}, {}, {2, 5}, {}};
      auto expected = true;
      auto actual = cycleInGraph(input);
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
			new int[] {1, 3},
			new int[] {2, 3, 4},
			new int[] {0},
			new int[] {},
			new int[] {2, 5},
			new int[] {}
		};
		bool expected = true;
		var actual = new Program().CycleInGraph(input);
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
	public bool CycleInGraph(int[][] edges) {
		int numberOfNodes = edges.Length;
		bool[] visited = new bool[numberOfNodes];
		bool[] currentlyInStack = new bool[numberOfNodes];
		Array.Fill(visited, false);
		Array.Fill(currentlyInStack, false);

		for (int node = 0; node < numberOfNodes; node++) {
			if (visited[node]) {
				continue;
			}

			bool containsCycle = isNodeInCycle(node, edges, visited, currentlyInStack);
			if (containsCycle) {
				return true;
			}
		}

		return false;
	}

	public bool isNodeInCycle(int node, int[][] edges, bool[] visited,
	  bool[] currentlyInStack) {
		visited[node] = true;
		currentlyInStack[node] = true;

		bool containsCycle = false;
		int[] neighbors = edges[node];
		foreach (var neighbor in neighbors) {
			if (!visited[neighbor]) {
				containsCycle = isNodeInCycle(neighbor, edges, visited,
				    currentlyInStack);
			}
			if (containsCycle) {
				return true;
			} else if (currentlyInStack[neighbor]) {
				return true;
			}
		}

		currentlyInStack[node] = false;
		return false;
	}
}



```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	int WHITE = 0;
	int GREY = 1;
	int BLACK = 3;

	// O(v + e) time | O(v) space - where v is the number of
	// vertices and e is the number of edges in the graph
	public bool CycleInGraph(int[][] edges) {
		int numberOfNodes = edges.Length;
		int[] colors = new int[numberOfNodes];
		Array.Fill(colors, WHITE);

		for (int node = 0; node < numberOfNodes; node++) {
			if (colors[node] != WHITE) continue;

			bool containsCycle = traverseAndColorNodes(node, edges, colors);
			if (containsCycle) return true;
		}

		return false;
	}

	public bool traverseAndColorNodes(int node, int[][] edges, int[] colors) {
		colors[node] = GREY;

		int[] neighbors = edges[node];
		foreach (var neighbor in neighbors) {
			int neighborColor = colors[neighbor];

			if (neighborColor == GREY) {
				return true;
			}

			if (neighborColor == BLACK) {
				continue;
			}

			bool containsCycle = traverseAndColorNodes(neighbor, edges, colors);
			if (containsCycle) {
				return true;
			}
		}

		colors[node] = BLACK;
		return false;
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
			new int[] {1, 3},
			new int[] {2, 3, 4},
			new int[] {0},
			new int[] {},
			new int[] {2, 5},
			new int[] {}
		};
		bool expected = true;
		var actual = new Program().CycleInGraph(input);
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
		{1, 3},
		{2, 3, 4},
		{0},
		{},
		{2, 5},
		{},
	}
	expected := true
	actual := CycleInGraph(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(v + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the graph
func CycleInGraph(edges [][]int) bool {
	numberOfNodes := len(edges)
	visited := make([]bool, len(edges))
	currentlyInStack := make([]bool, len(edges))

	for node := 0; node < numberOfNodes; node++ {
		if visited[node] {
			continue
		}

		containsCycle := isNodeInCycle(node, edges, visited, currentlyInStack)
		if containsCycle {
			return true
		}
	}
	return false
}

func isNodeInCycle(node int, edges [][]int, visited []bool, currentlyInStack []bool) bool {
	visited[node] = true
	currentlyInStack[node] = true

	neighbors := edges[node]
	for _, neighbor := range neighbors {
		if !visited[neighbor] {
			containsCycle := isNodeInCycle(neighbor, edges, visited, currentlyInStack)
			if containsCycle {
				return true
			}
		} else if currentlyInStack[neighbor] {
			return true
		}
	}

	currentlyInStack[node] = false
	return false
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type Color int

const (
	White Color = 0
	Grey  Color = 1
	Black Color = 2
)

// O(v + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the graph
func CycleInGraph(edges [][]int) bool {
	numberOfNodes := len(edges)
	colors := make([]Color, len(edges))

	for node := 0; node < numberOfNodes; node++ {
		if colors[node] != White {
			continue
		}

		containsCycle := traverseAndColorNodes(node, edges, colors)
		if containsCycle {
			return true
		}
	}
	return false
}

func traverseAndColorNodes(node int, edges [][]int, colors []Color) bool {
	colors[node] = Grey

	neighbors := edges[node]
	for _, neighbor := range neighbors {
		neighborColor := colors[neighbor]

		if neighborColor == Grey {
			return true
		}

		if neighborColor == Black {
			continue
		}

		containsCycle := traverseAndColorNodes(neighbor, edges, colors)
		if containsCycle {
			return true
		}
	}

	colors[node] = Black
	return false
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
		{1, 3},
		{2, 3, 4},
		{0},
		{},
		{2, 5},
		{},
	}
	expected := true
	actual := CycleInGraph(input)
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
          {1, 3},
          {2, 3, 4},
          {0},
          {},
          {2, 5},
          {}
        };
    boolean expected = true;
    var actual = new Program().cycleInGraph(input);
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
  public boolean cycleInGraph(int[][] edges) {
    int numberOfNodes = edges.length;
    boolean[] visited = new boolean[numberOfNodes];
    boolean[] currentlyInStack = new boolean[numberOfNodes];
    Arrays.fill(visited, false);
    Arrays.fill(currentlyInStack, false);

    for (int node = 0; node < numberOfNodes; node++) {
      if (visited[node]) {
        continue;
      }

      boolean containsCycle = isNodeInCycle(node, edges, visited, currentlyInStack);
      if (containsCycle) {
        return true;
      }
    }

    return false;
  }

  public boolean isNodeInCycle(
      int node, int[][] edges, boolean[] visited, boolean[] currentlyInStack) {
    visited[node] = true;
    currentlyInStack[node] = true;

    boolean containsCycle = false;
    int[] neighbors = edges[node];
    for (int neighbor : neighbors) {
      if (!visited[neighbor]) {
        containsCycle = isNodeInCycle(neighbor, edges, visited, currentlyInStack);
      }
      if (containsCycle) {
        return true;
      } else if (currentlyInStack[neighbor]) {
        return true;
      }
    }

    currentlyInStack[node] = false;
    return false;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  public int WHITE = 0;
  public int GREY = 1;
  public int BLACK = 3;

  // O(v + e) time | O(v) space - where v is the number of
  // vertices and e is the number of edges in the graph
  public boolean cycleInGraph(int[][] edges) {
    int numberOfNodes = edges.length;
    int[] colors = new int[numberOfNodes];
    Arrays.fill(colors, WHITE);

    for (int node = 0; node < numberOfNodes; node++) {
      if (colors[node] != WHITE) continue;

      boolean containsCycle = traverseAndColorNodes(node, edges, colors);
      if (containsCycle) return true;
    }

    return false;
  }

  public boolean traverseAndColorNodes(int node, int[][] edges, int[] colors) {
    colors[node] = GREY;

    int[] neighbors = edges[node];
    for (int neighbor : neighbors) {
      int neighborColor = colors[neighbor];

      if (neighborColor == GREY) {
        return true;
      }

      if (neighborColor == BLACK) {
        continue;
      }

      boolean containsCycle = traverseAndColorNodes(neighbor, edges, colors);
      if (containsCycle) {
        return true;
      }
    }

    colors[node] = BLACK;
    return false;
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
          {1, 3},
          {2, 3, 4},
          {0},
          {},
          {2, 5},
          {}
        };
    boolean expected = true;
    var actual = new Program().cycleInGraph(input);
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
  const input = [[1, 3], [2, 3, 4], [0], [], [2, 5], []];
  const expected = true;
  const actual = program.cycleInGraph(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(v + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the graph
function cycleInGraph(edges) {
  const numberOfNodes = edges.length;
  const visited = new Array(numberOfNodes).fill(false);
  const currentlyInStack = new Array(numberOfNodes).fill(false);

  for (let node = 0; node < numberOfNodes; node++) {
    if (visited[node]) continue;

    const containsCycle = isNodeInCycle(node, edges, visited, currentlyInStack);
    if (containsCycle) return true;
  }

  return false;
}

function isNodeInCycle(node, edges, visited, currentlyInStack) {
  visited[node] = true;
  currentlyInStack[node] = true;

  const neighbors = edges[node];
  for (const neighbor of neighbors) {
    if (!visited[neighbor]) {
      const containsCycle = isNodeInCycle(neighbor, edges, visited, currentlyInStack);
      if (containsCycle) return true;
    } else if (currentlyInStack[neighbor]) {
      return true;
    }
  }

  currentlyInStack[node] = false;
  return false;
}

// Do not edit the line below.
exports.cycleInGraph = cycleInGraph;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

const [WHITE, GREY, BLACK] = [0, 1, 2];

// O(v + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the graph
function cycleInGraph(edges) {
  const numberOfNodes = edges.length;
  const colors = new Array(numberOfNodes).fill(WHITE);

  for (let node = 0; node < numberOfNodes; node++) {
    if (colors[node] != WHITE) continue;

    const containsCycle = traverseAndColorNodes(node, edges, colors);
    if (containsCycle) return true;
  }

  return false;
}

function traverseAndColorNodes(node, edges, colors) {
  colors[node] = GREY;

  const neighbors = edges[node];
  for (const neighbor of neighbors) {
    const neighborColor = colors[neighbor];

    if (neighborColor === GREY) return true;

    if (neighborColor === BLACK) continue;

    const containsCycle = traverseAndColorNodes(neighbor, edges, colors);
    if (containsCycle) return true;
  }

  colors[node] = BLACK;
  return false;
}

// Do not edit the line below.
exports.cycleInGraph = cycleInGraph;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [[1, 3], [2, 3, 4], [0], [], [2, 5], []];
  const expected = true;
  const actual = program.cycleInGraph(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.cycleInGraph

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(
            listOf(1, 3),
            listOf(2, 3, 4),
            listOf(0),
            listOf(),
            listOf(2, 5),
            listOf()
        )
        val expected = true
        val output = cycleInGraph(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(v + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the graph
fun cycleInGraph(edges: List<List<Int>>): Boolean {
    val numberOfNodes = edges.size
    val visited = edges.map() { _ -> false }.toMutableList()
    val currentlyInStack = edges.map() { _ -> false }.toMutableList()

    for (node in 0 until numberOfNodes) {
        if (visited[node]) continue

        val containsCycle = isNodeInCycle(node, edges, visited, currentlyInStack)
        if (containsCycle) return true
    }

    return false
}

fun isNodeInCycle(node: Int, edges: List<List<Int>>, visited: MutableList<Boolean>, currentlyInStack: MutableList<Boolean>): Boolean {
    visited[node] = true
    currentlyInStack[node] = true

    val neighbors = edges[node]
    for (neighbor in neighbors) {
        if (!visited[neighbor]) {
            val containsCycle = isNodeInCycle(neighbor, edges, visited, currentlyInStack)
            if (containsCycle) return true
        } else if (currentlyInStack[neighbor]) {
            return true
        }
    }

    currentlyInStack[node] = false
    return false
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

val WHITE = 0; val GREY = 1; val BLACK = 2

// O(v + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the graph
fun cycleInGraph(edges: List<List<Int>>): Boolean {
    val numberOfNodes = edges.size
    val colors = edges.map() { _ -> WHITE }.toMutableList()

    for (node in 0 until numberOfNodes) {
        if (colors[node] != WHITE) continue

        val containsCycle = traverseAndColorNodes(node, edges, colors)
        if (containsCycle) return true
    }

    return false
}

fun traverseAndColorNodes(node: Int, edges: List<List<Int>>, colors: MutableList<Int>): Boolean {
    colors[node] = GREY

    val neighbors = edges[node]
    for (neighbor in neighbors) {
        val neighborColor = colors[neighbor]

        if (neighborColor == GREY) return true

        if (neighborColor == BLACK) continue

        val containsCycle = traverseAndColorNodes(neighbor, edges, colors)
        if (containsCycle) return true
    }

    colors[node] = BLACK
    return false
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.cycleInGraph

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(
            listOf(1, 3),
            listOf(2, 3, 4),
            listOf(0),
            listOf(),
            listOf(2, 5),
            listOf()
        )
        val expected = true
        val output = cycleInGraph(input)
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
        [1, 3],
        [2, 3, 4],
        [0],
        [],
        [2, 5],
        [],
      ]
      var expected = true
      var actual = Program().cycleInGraph(input)
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
  func cycleInGraph(_ edges: [[Int]]) -> Bool {
    let numberOfNodes = edges.count
    var visited = Array(repeating: false, count: numberOfNodes)
    var currentlyInStack = Array(repeating: false, count: numberOfNodes)

    for node in stride(from: 0, to: numberOfNodes, by: 1) {
      if visited[node] {
        continue
      }

      let containsCycle = isNodeInCycle(node, edges, &visited, &currentlyInStack)
      if containsCycle {
        return true
      }
    }
    return false
  }

  func isNodeInCycle(_ node: Int, _ edges: [[Int]], _ visited: inout [Bool], _ currentlyInStack: inout [Bool]) -> Bool {
    visited[node] = true
    currentlyInStack[node] = true

    let neighbors = edges[node]
    for neighbor in neighbors {
      if !visited[neighbor] {
        let containsCycle = isNodeInCycle(neighbor, edges, &visited, &currentlyInStack)
        if containsCycle {
          return true
        }
      } else if currentlyInStack[neighbor] {
        return true
      }
    }

    currentlyInStack[node] = false
    return false
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  let WHITE = 0
  let GREY = 1
  let BLACK = 2

  // O(v + e) time | O(v) space - where v is the number of
  // vertices and e is the number of edges in the graph
  func cycleInGraph(_ edges: [[Int]]) -> Bool {
    let numberOfNodes = edges.count
    var colors = Array(repeating: 0, count: numberOfNodes)

    for node in stride(from: 0, to: numberOfNodes, by: 1) {
      if colors[node] != WHITE {
        continue
      }

      let containsCycle = traverseAndColorNodes(node, edges, &colors)
      if containsCycle {
        return true
      }
    }
    return false
  }

  func traverseAndColorNodes(_ node: Int, _ edges: [[Int]], _ colors: inout [Int]) -> Bool {
    colors[node] = GREY

    let neighbors = edges[node]
    for neighbor in neighbors {
      let neighborColor = colors[neighbor]

      if neighborColor == GREY {
        return true
      }

      if neighborColor == BLACK {
        continue
      }
      let containsCycle = traverseAndColorNodes(neighbor, edges, &colors)
      if containsCycle {
        return true
      }
    }

    colors[node] = BLACK
    return false
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = [
        [1, 3],
        [2, 3, 4],
        [0],
        [],
        [2, 5],
        [],
      ]
      var expected = true
      var actual = Program().cycleInGraph(input)
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
        input = [[1, 3], [2, 3, 4], [0], [], [2, 5], []]
        expected = True
        actual = program.cycleInGraph(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(v + e) time | O(v) space - where v is the number of
# vertices and e is the number of edges in the graph
def cycleInGraph(edges):
    numberOfNodes = len(edges)
    visited = [False for _ in range(numberOfNodes)]
    currentlyInStack = [False for _ in range(numberOfNodes)]

    for node in range(numberOfNodes):
        if visited[node]:
            continue

        containsCycle = isNodeInCycle(node, edges, visited, currentlyInStack)
        if containsCycle:
            return True

    return False


def isNodeInCycle(node, edges, visited, currentlyInStack):
    visited[node] = True
    currentlyInStack[node] = True

    neighbors = edges[node]
    for neighbor in neighbors:
        if not visited[neighbor]:
            containsCycle = isNodeInCycle(neighbor, edges, visited, currentlyInStack)
            if containsCycle:
                return True
        elif currentlyInStack[neighbor]:
            return True

    currentlyInStack[node] = False
    return False

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

WHITE, GREY, BLACK = 0, 1, 2

# O(v + e) time | O(v) space - where v is the number of
# vertices and e is the number of edges in the graph
def cycleInGraph(edges):
    numberOfNodes = len(edges)
    colors = [WHITE for _ in range(numberOfNodes)]

    for node in range(numberOfNodes):
        if colors[node] != WHITE:
            continue

        containsCycle = traverseAndColorNodes(node, edges, colors)
        if containsCycle:
            return True

    return False


def traverseAndColorNodes(node, edges, colors):
    colors[node] = GREY

    neighbors = edges[node]
    for neighbor in neighbors:
        neighborColor = colors[neighbor]

        if neighborColor == GREY:
            return True

        if neighborColor == BLACK:
            continue

        containsCycle = traverseAndColorNodes(neighbor, edges, colors)
        if containsCycle:
            return True

    colors[node] = BLACK
    return False

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [[1, 3], [2, 3, 4], [0], [], [2, 5], []]
        expected = True
        actual = program.cycleInGraph(input)
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
  const input = [[1, 3], [2, 3, 4], [0], [], [2, 5], []];
  const expected = true;
  const actual = program.cycleInGraph(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(v + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the graph
export function cycleInGraph(edges: number[][]) {
  const numberOfNodes = edges.length;
  const visited = new Array(numberOfNodes).fill(false);
  const currentlyInStack = new Array(numberOfNodes).fill(false);

  for (let node = 0; node < numberOfNodes; node++) {
    if (visited[node]) continue;

    const containsCycle = isNodeInCycle(node, edges, visited, currentlyInStack);
    if (containsCycle) return true;
  }

  return false;
}

function isNodeInCycle(node: number, edges: number[][], visited: boolean[], currentlyInStack: boolean[]) {
  visited[node] = true;
  currentlyInStack[node] = true;

  const neighbors = edges[node];
  for (const neighbor of neighbors) {
    if (!visited[neighbor]) {
      const containsCycle = isNodeInCycle(neighbor, edges, visited, currentlyInStack);
      if (containsCycle) return true;
    } else if (currentlyInStack[neighbor]) {
      return true;
    }
  }

  currentlyInStack[node] = false;
  return false;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

const [WHITE, GREY, BLACK] = [0, 1, 2];

// O(v + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the graph
export function cycleInGraph(edges: number[][]) {
  const numberOfNodes = edges.length;
  const colors = new Array(numberOfNodes).fill(WHITE);

  for (let node = 0; node < numberOfNodes; node++) {
    if (colors[node] != WHITE) continue;

    const containsCycle = traverseAndColorNodes(node, edges, colors);
    if (containsCycle) return true;
  }

  return false;
}

function traverseAndColorNodes(node: number, edges: number[][], colors: number[]) {
  colors[node] = GREY;

  const neighbors = edges[node];
  for (const neighbor of neighbors) {
    const neighborColor = colors[neighbor];

    if (neighborColor === GREY) return true;

    if (neighborColor === BLACK) continue;

    const containsCycle = traverseAndColorNodes(neighbor, edges, colors);
    if (containsCycle) return true;
  }

  colors[node] = BLACK;
  return false;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [[1, 3], [2, 3, 4], [0], [], [2, 5], []];
  const expected = true;
  const actual = program.cycleInGraph(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

