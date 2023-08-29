# Kruskal's Algorithm
<div class="html">
  <p>
    You're given a list of <span>edges</span> representing a weighted,
    undirected graph with at least one node.
  </p>

  <p>
    The given list is what's called an adjacency list, and it represents a graph.
    The number of vertices in the graph is equal to the length of
    <span>edges</span>, where each index <span>i</span> in
    <span>edges</span> contains vertex <span>i</span>'s siblings, in no
    particular order. Each of these siblings is an array of length two, with
    the first value denoting the index in the list that this vertex is connected
    to, and and the second value denoting the weight of the edge. Note that
    this graph is undirected, meaning that if a vertex appears in the edge list
    of another vertex, then the inverse will also be true (along with the same
    weight).
  </p>

  <p>
    Write a function implementing Kruskal's Algorithm to return a new
    <span>edges</span> array that represents a minimum spanning tree. A
    minimum spanning tree is a tree containing all of the vertices of the original
    graph and a subset of the edges. These edges should connect all of the vertices
    with the minimum total edge weight and without generating any cycles.
  </p>

  <p>
    If the graph is not connected, your function should return the minimum spanning
    forest (i.e. all of the nodes should be able to reach the same nodes as they
    could in the initial edge list).
  </p>

  <p>
    Note that the graph represented by <span>edges</span> won't contain any
    self-loops (vertices that have an outbound edge to themselves) and will only
    have positively weighted edges (i.e., no negative distances).
  </p>

  <p>
    If you're unfamiliar with Kruskal's algorithm, we recommend watching the
    Conceptual Overview section of this question's video explanation before
    starting to code. If you're unfamiliar with the Union Find data structure,
    we recommend completing that problem before attempting this one.
  </p>
  <h3>Sample Input</h3>
  <pre><span class="CodeEditor-promptParameter">edges</span> = [
  [[1, 3], [2, 5]],
  [[0, 3], [2, 10], [3, 12]],
  [[0, 5], [1, 10]],
  [[1, 12]]
]</pre>
  <h3>Sample Output</h3>
  <pre>[
  [[1, 3], [2, 5]],
  [[0, 3], [3, 12]],
  [[0, 5]],
  [[1, 12]]
]</pre>
</div>

Hint 1
<p>
  A good place to start is to transform the adjacency list into a list of
  all of the edges, sorted by weight.
</p>


Hint 2

<p>
  To check if adding a given edge creates a cycle, try using a disjoint set.
  Start by thinking of each node as its own set. Then with each added edge,
  combine the sets of the connected nodes.
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
      vector<vector<vector<int>>> input = {{{1, 1}}, {{0, 1}}};
      vector<vector<vector<int>>> expected = {{{1, 1}}, {{0, 1}}};
      auto actual = kruskalsAlgorithm(input);
      assert(expected == actual);
    });
  }
};


```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <algorithm>
using namespace std;

int find(int vertex, vector<int>& parents);
void createUnion(int vertex1Root, int vertex2Root, vector<int>& parents, vector<int>& ranks);

// O(e * log(e)) time | O(e + v) space - where e is the number
// of edges in the input edges and v is the number of vertices
vector<vector<vector<int>>> kruskalsAlgorithm(vector<vector<vector<int>>> edges) {
  vector<vector<int>> sortedEdges;
  for (int sourceIndex = 0; sourceIndex < edges.size(); sourceIndex++) {
    vector<vector<int>> vertex = edges[sourceIndex];
    for (vector<int> edge : vertex) {
      if (edge[0] > sourceIndex) {
        sortedEdges.push_back({sourceIndex, edge[0], edge[1]});
      }
    }
  }

  sort(
    sortedEdges.begin(), 
    sortedEdges.end(), 
    [](vector<int> edge1, vector<int> edge2) -> bool {
      return edge1[2] < edge2[2];
    }
  );
  
  vector<int> parents;
  vector<int> ranks;
  vector<vector<vector<int>>> mst;

  for (int i = 0; i < edges.size(); i++) {
    parents.push_back(i);
    ranks.push_back(0);
    mst.push_back({});
  }

  for (vector<int> edge: sortedEdges) {
    int vertex1Root = find(edge[0], parents);
    int vertex2Root = find(edge[1], parents);
    if (vertex1Root != vertex2Root) {
      mst[edge[0]].push_back({edge[1], edge[2]});
      mst[edge[1]].push_back({edge[0], edge[2]});
      createUnion(vertex1Root, vertex2Root, parents, ranks);
    }
  }

  return mst;
}

int find(int vertex, vector<int>& parents) {
  if (vertex != parents[vertex]) {
    parents[vertex] = find(parents[vertex], parents);
  }

  return parents[vertex];
}

void createUnion(int vertex1Root, int vertex2Root, vector<int>& parents, vector<int>& ranks) {
  if (ranks[vertex1Root] < ranks[vertex2Root]) {
    parents[vertex1Root] = vertex2Root;
  } else if (ranks[vertex1Root] > ranks[vertex2Root]) {
    parents[vertex2Root] = vertex1Root;
  } else {
    parents[vertex2Root] = vertex1Root;
    ranks[vertex1Root]++;
  }
}
```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<vector<int>>> input = {{{1, 1}}, {{0, 1}}};
      vector<vector<vector<int>>> expected = {{{1, 1}}, {{0, 1}}};
      auto actual = kruskalsAlgorithm(input);
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
		var input =
		  new int[][][] {new int[][] {new int[] {1, 1}}, new int[][] {new int[] {0, 1}}};
		var expected =
		  new int[][][] {new int[][] {new int[] {1, 1}}, new int[][] {new int[] {0, 1}}};
		var actual = new Program().KruskalsAlgorithm(input);
		Utils.AssertTrue(jaggedArrayDeepEqual(expected, actual));
	}

	public bool jaggedArrayDeepEqual(dynamic a, dynamic b) {
		if (ReferenceEquals(a, b)) {
			return true;
		}

		if (ReferenceEquals(a, null) || ReferenceEquals(b, null)) {
			return false;
		}

		if (!a.GetType().IsArray || !b.GetType().IsArray) {
			return Equals(a, b);
		}

		if (a.Length == b.Length) {
			for (int i = 0; i < a.Length; i++) {
				if (!jaggedArrayDeepEqual(a[i], b[i])) {
					return false;
				}
			}
			return true;
		}
		return false;
	}
}


```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {
	// O(e * log(e)) time | O(e + v) space - where e is the number
	// of edges in the input edges and v is the number of vertices
	public int[][][] KruskalsAlgorithm(int[][][] edges) {
		List<List<int> > sortedEdges = new List<List<int> >();
		for (int sourceIndex = 0; sourceIndex < edges.Length; sourceIndex++) {
			foreach (var edge in edges[sourceIndex]) {
				if (edge[0] > sourceIndex) {
					sortedEdges.Add(new List<int> {
						sourceIndex, edge[0], edge[1]
					});
				}
			}
		}

		sortedEdges.Sort((edge1, edge2) => edge1[2] - edge2[2]);

		int[] parents = new int[edges.Length];
		int[] ranks = new int[edges.Length];
		List<List<int[]> > mst = new List<List<int[]> >();

		for (int i = 0; i < edges.Length; i++) {
			parents[i] = i;
			ranks[i] = 0;
			mst.Insert(i, new List<int[]>());
		}

		foreach (var edge in sortedEdges) {
			int vertex1Root = find(edge[0], parents);
			int vertex2Root = find(edge[1], parents);
			if (vertex1Root != vertex2Root) {
				mst[edge[0]].Add(new int[] {edge[1], edge[2]});
				mst[edge[1]].Add(new int[] {edge[0], edge[2]});
				union(vertex1Root, vertex2Root, parents, ranks);
			}
		}

		int[][][] arrayMst = new int[edges.Length][][];
		for (int i = 0; i < mst.Count; i++) {
			arrayMst[i] = new int[mst[i].Count][];
			for (int j = 0; j < mst[i].Count; j++) {
				arrayMst[i][j] = mst[i][j];
			}
		}

		return arrayMst;
	}

	private int find(int vertex, int[] parents) {
		if (vertex != parents[vertex]) {
			parents[vertex] = find(parents[vertex], parents);
		}
		return parents[vertex];
	}

	private void union(int vertex1Root, int vertex2Root, int[] parents, int[] ranks) {
		if (ranks[vertex1Root] < ranks[vertex2Root]) {
			parents[vertex1Root] = vertex2Root;
		} else if (ranks[vertex1Root] > ranks[vertex2Root]) {
			parents[vertex2Root] = vertex1Root;
		} else {
			parents[vertex2Root] = vertex1Root;
			ranks[vertex1Root]++;
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
		var input =
		  new int[][][] {new int[][] {new int[] {1, 1}}, new int[][] {new int[] {0, 1}}};
		var expected =
		  new int[][][] {new int[][] {new int[] {1, 1}}, new int[][] {new int[] {0, 1}}};
		var actual = new Program().KruskalsAlgorithm(input);
		Utils.AssertTrue(jaggedArrayDeepEqual(expected, actual));
	}

	public bool jaggedArrayDeepEqual(dynamic a, dynamic b) {
		if (ReferenceEquals(a, b)) {
			return true;
		}

		if (ReferenceEquals(a, null) || ReferenceEquals(b, null)) {
			return false;
		}

		if (!a.GetType().IsArray || !b.GetType().IsArray) {
			return Equals(a, b);
		}

		if (a.Length == b.Length) {
			for (int i = 0; i < a.Length; i++) {
				if (!jaggedArrayDeepEqual(a[i], b[i])) {
					return false;
				}
			}
			return true;
		}
		return false;
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
	input := [][][]int{{{1, 1}}, {{0, 1}}}
	expected := [][][]int{{{1, 1}}, {{0, 1}}}
	actual := KruskalsAlgorithm(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"sort"
)

// O(e * log(e)) time | O(e + v) space - where e is the number
// of edges in the input edges and v is the number of vertices
func KruskalsAlgorithm(edges [][][]int) [][][]int {
	sortedEdges := [][]int{}
	for sourceIndex, vertex := range edges {
		for _, edge := range vertex {
			if edge[0] > sourceIndex {
				sortedEdges = append(sortedEdges, []int{sourceIndex, edge[0], edge[1]})
			}
		}
	}

	sort.Slice(sortedEdges, func(i, j int) bool {
		edge1, edge2 := sortedEdges[i], sortedEdges[j]
		return edge1[2] < edge2[2]
	})

	parents := make([]int, len(edges))
	ranks := make([]int, len(edges))
	mst := [][][]int{}

	for i := range edges {
		parents[i] = i
		ranks[i] = 0
		mst = append(mst, [][]int{})
	}

	for _, edge := range sortedEdges {
		vertex1Root := find(edge[0], parents)
		vertex2Root := find(edge[1], parents)
		if vertex1Root != vertex2Root {
			mst[edge[0]] = append(mst[edge[0]], []int{edge[1], edge[2]})
			mst[edge[1]] = append(mst[edge[1]], []int{edge[0], edge[2]})
			union(vertex1Root, vertex2Root, parents, ranks)
		}
	}

	return mst
}

func find(vertex int, parents []int) int {
	if vertex != parents[vertex] {
		parents[vertex] = find(parents[vertex], parents)
	}
	return parents[vertex]
}

func union(vertex1Root, vertex2Root int, parents, ranks []int) {
	if ranks[vertex1Root] < ranks[vertex2Root] {
		parents[vertex1Root] = vertex2Root
	} else if ranks[vertex1Root] > ranks[vertex2Root] {
		parents[vertex2Root] = vertex1Root
	} else {
		parents[vertex2Root] = vertex1Root
		ranks[vertex1Root]++
	}
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := [][][]int{{{1, 1}}, {{0, 1}}}
	expected := [][][]int{{{1, 1}}, {{0, 1}}}
	actual := KruskalsAlgorithm(input)
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
    var input = new int[][][] {{{1, 1}}, {{0, 1}}};
    var expected = new int[][][] {{{1, 1}}, {{0, 1}}};
    var actual = new Program().kruskalsAlgorithm(input);
    Utils.assertTrue(Arrays.deepEquals(expected, actual));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(e * log(e)) time | O(e + v) space - where e is the number
  // of edges in the input edges and v is the number of vertices
  public int[][][] kruskalsAlgorithm(int[][][] edges) {
    ArrayList<List<Integer>> sortedEdges = new ArrayList<List<Integer>>();
    for (int sourceIndex = 0; sourceIndex < edges.length; sourceIndex++) {
      for (int[] edge : edges[sourceIndex]) {
        if (edge[0] > sourceIndex) {
          sortedEdges.add(Arrays.asList(sourceIndex, edge[0], edge[1]));
        }
      }
    }

    Collections.sort(sortedEdges, (edge1, edge2) -> edge1.get(2) - edge2.get(2));

    int[] parents = new int[edges.length];
    int[] ranks = new int[edges.length];
    ArrayList<ArrayList<int[]>> mst = new ArrayList<ArrayList<int[]>>();

    for (int i = 0; i < edges.length; i++) {
      parents[i] = i;
      ranks[i] = 0;
      mst.add(i, new ArrayList<int[]>());
    }

    for (List<Integer> edge : sortedEdges) {
      int vertex1Root = find(edge.get(0), parents);
      int vertex2Root = find(edge.get(1), parents);
      if (vertex1Root != vertex2Root) {
        mst.get(edge.get(0)).add(new int[] {edge.get(1), edge.get(2)});
        mst.get(edge.get(1)).add(new int[] {edge.get(0), edge.get(2)});
        union(vertex1Root, vertex2Root, parents, ranks);
      }
    }

    int[][][] arrayMst = new int[edges.length][][];
    for (int i = 0; i < mst.size(); i++) {
      arrayMst[i] = new int[mst.get(i).size()][];
      for (int j = 0; j < mst.get(i).size(); j++) {
        arrayMst[i][j] = mst.get(i).get(j);
      }
    }

    return arrayMst;
  }

  private int find(int vertex, int[] parents) {
    if (vertex != parents[vertex]) {
      parents[vertex] = find(parents[vertex], parents);
    }
    return parents[vertex];
  }

  private void union(int vertex1Root, int vertex2Root, int[] parents, int[] ranks) {
    if (ranks[vertex1Root] < ranks[vertex2Root]) {
      parents[vertex1Root] = vertex2Root;
    } else if (ranks[vertex1Root] > ranks[vertex2Root]) {
      parents[vertex2Root] = vertex1Root;
    } else {
      parents[vertex2Root] = vertex1Root;
      ranks[vertex1Root]++;
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
    var input = new int[][][] {{{1, 1}}, {{0, 1}}};
    var expected = new int[][][] {{{1, 1}}, {{0, 1}}};
    var actual = new Program().kruskalsAlgorithm(input);
    Utils.assertTrue(Arrays.deepEquals(expected, actual));
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
  const input = [[[1, 1]], [[0, 1]]];
  const expected = [[[1, 1]], [[0, 1]]];
  const actual = program.kruskalsAlgorithm(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(e * log(e)) time | O(e + v) space - where e is the number
// of edges in the input edges and v is the number of vertices
function kruskalsAlgorithm(edges) {
  const edgeList = [];
  for (let sourceIndex = 0; sourceIndex < edges.length; sourceIndex++) {
    const vertex = edges[sourceIndex];
    for (const edge of vertex) {
      if (edge[0] > sourceIndex) {
        edgeList.push([sourceIndex, edge[0], edge[1]]);
      }
    }
  }
  const sortedEdges = edgeList.sort((edgeA, edgeB) => {
    if (edgeA[2] > edgeB[2]) return 1;
    if (edgeA[2] < edgeB[2]) return -1;
    return 0;
  });

  const parents = edges.map((_, i) => i);
  const ranks = edges.map(_ => 0);
  const mst = edges.map(_ => []);
  for (const edge of sortedEdges) {
    const vertex1Root = find(edge[0], parents);
    const vertex2Root = find(edge[1], parents);
    if (vertex1Root !== vertex2Root) {
      mst[edge[0]].push([edge[1], edge[2]]);
      mst[edge[1]].push([edge[0], edge[2]]);
      union(vertex1Root, vertex2Root, parents, ranks);
    }
  }

  return mst;
}

function find(vertex, parents) {
  if (vertex !== parents[vertex]) {
    parents[vertex] = find(parents[vertex], parents);
  }

  return parents[vertex];
}

function union(vertex1Root, vertex2Root, parents, ranks) {
  if (ranks[vertex1Root] < ranks[vertex2Root]) {
    parents[vertex1Root] = vertex2Root;
  } else if (ranks[vertex1Root] > ranks[vertex2Root]) {
    parents[vertex2Root] = vertex1Root;
  } else {
    parents[vertex2Root] = vertex1Root;
    ranks[vertex1Root] += 1;
  }
}

// Do not edit the line below.
exports.kruskalsAlgorithm = kruskalsAlgorithm;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [[[1, 1]], [[0, 1]]];
  const expected = [[[1, 1]], [[0, 1]]];
  const actual = program.kruskalsAlgorithm(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.kruskalsAlgorithm

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(listOf(listOf(1, 1)), listOf(listOf(0, 1)))
        val expected = listOf(listOf(listOf(1, 1)), listOf(listOf(0, 1)))
        val output = kruskalsAlgorithm(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(e * log(e)) time | O(e + v) space - where e is the number
// of edges in the input edges and v is the number of vertices
fun kruskalsAlgorithm(edges: List<List<List<Int>>>): List<List<List<Int>>> {
    val edgeList = mutableListOf<List<Int>>()
    for (sourceIndex in 0 until edges.size) {
        val vertex = edges[sourceIndex]
        for (edge in vertex) {
            if (edge[0] > sourceIndex) {
                edgeList.add(listOf(sourceIndex, edge[0], edge[1]))
            }
        }
    }
    val sortedEdges = edgeList.sortedWith(
        Comparator<List<Int>> { edgeA, edgeB ->
            edgeA[2] - edgeB[2]
        }
    )

    val parents = MutableList(edges.size) { it }
    val ranks = MutableList(edges.size) { 0 }
    val mst = MutableList(edges.size) { mutableListOf<List<Int>>() }
    for (edge in sortedEdges) {
        val vertex1Root = find(edge[0], parents)
        val vertex2Root = find(edge[1], parents)
        if (vertex1Root != vertex2Root) {
            mst[edge[0]].add(listOf(edge[1], edge[2]))
            mst[edge[1]].add(listOf(edge[0], edge[2]))
            union(vertex1Root, vertex2Root, parents, ranks)
        }
    }

    return mst
}

fun find(vertex: Int, parents: MutableList<Int>): Int {
    if (vertex != parents[vertex]) {
        parents[vertex] = find(parents[vertex], parents)
    }

    return parents[vertex]
}

fun union(vertex1Root: Int, vertex2Root: Int, parents: MutableList<Int>, ranks: MutableList<Int>) {
    if (ranks[vertex1Root] < ranks[vertex2Root]) {
        parents[vertex1Root] = vertex2Root
    } else if (ranks[vertex1Root] > ranks[vertex2Root]) {
        parents[vertex2Root] = vertex1Root
    } else {
        parents[vertex2Root] = vertex1Root
        ranks[vertex1Root] += 1
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.kruskalsAlgorithm

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(listOf(listOf(1, 1)), listOf(listOf(0, 1)))
        val expected = listOf(listOf(listOf(1, 1)), listOf(listOf(0, 1)))
        val output = kruskalsAlgorithm(input)
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
      var input = [[[1, 1]], [[0, 1]]]
      var expected = [[[1, 1]], [[0, 1]]]
      var actual = Program().kruskalsAlgorithm(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(e * log(e)) time | O(e + v) space - where e is the number
  // of edges in the input edges and v is the number of vertices
  func kruskalsAlgorithm(_ edges: [[[Int]]]) -> [[[Int]]] {
    var sortedEdges = [[Int]]()
    for (sourceIndex, vertex) in edges.enumerated() {
      for edge in vertex {
        if edge[0] > sourceIndex {
          sortedEdges.append([sourceIndex, edge[0], edge[1]])
        }
      }
    }

    sortedEdges.sort(by: { $0[2] < $1[2] })

    var parents = [Int](repeating: 0, count: edges.count)
    var ranks = [Int](repeating: 0, count: edges.count)
    var mst = [[[Int]]]()

    for i in 0 ..< edges.count {
      parents[i] = i
      ranks[i] = 0
      mst.append([[Int]]())
    }

    for edge in sortedEdges {
      let vertex1Root = find(edge[0], &parents)
      let vertex2Root = find(edge[1], &parents)
      if vertex1Root != vertex2Root {
        mst[edge[0]].append([edge[1], edge[2]])
        mst[edge[1]].append([edge[0], edge[2]])
        union(vertex1Root, vertex2Root, &parents, &ranks)
      }
    }
    return mst
  }

  func find(_ vertex: Int, _ parents: inout [Int]) -> Int {
    if vertex != parents[vertex] {
      parents[vertex] = find(parents[vertex], &parents)
    }
    return parents[vertex]
  }

  func union(_ vertex1Root: Int, _ vertex2Root: Int, _ parents: inout [Int], _ ranks: inout [Int]) {
    if ranks[vertex1Root] < ranks[vertex2Root] {
      parents[vertex1Root] = vertex2Root
    } else if ranks[vertex1Root] > ranks[vertex2Root] {
      parents[vertex2Root] = vertex1Root
    } else {
      parents[vertex2Root] = vertex1Root
      ranks[vertex1Root] += 1
    }
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws in
      var input = [[[1, 1]], [[0, 1]]]
      var expected = [[[1, 1]], [[0, 1]]]
      var actual = Program().kruskalsAlgorithm(input)
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
        input = [[[1, 1]], [[0, 1]]]
        expected = [[[1, 1]], [[0, 1]]]
        actual = program.kruskalsAlgorithm(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(e * log(e)) time | O(e + v) space - where e is the number
# of edges in the input edges and v is the number of vertices
def kruskalsAlgorithm(edges):
    edgeList = []
    for sourceIndex, vertex in enumerate(edges):
        for edge in vertex:
            if edge[0] > sourceIndex:
                edgeList.append([sourceIndex, edge[0], edge[1]])
    sortedEdges = sorted(edgeList, key=lambda edge: edge[2])

    parents = [vertex for vertex in range(len(edges))]
    ranks = [0 for _ in range(len(edges))]
    mst = [[] for _ in range(len(edges))]
    for edge in sortedEdges:
        vertex1Root = find(edge[0], parents)
        vertex2Root = find(edge[1], parents)
        if vertex1Root != vertex2Root:
            mst[edge[0]].append([edge[1], edge[2]])
            mst[edge[1]].append([edge[0], edge[2]])
            union(vertex1Root, vertex2Root, parents, ranks)

    return mst


def find(vertex, parents):
    if vertex != parents[vertex]:
        parents[vertex] = find(parents[vertex], parents)

    return parents[vertex]


def union(vertex1Root, vertex2Root, parents, ranks):
    if ranks[vertex1Root] < ranks[vertex2Root]:
        parents[vertex1Root] = vertex2Root
    elif ranks[vertex1Root] > ranks[vertex2Root]:
        parents[vertex2Root] = vertex1Root
    else:
        parents[vertex2Root] = vertex1Root
        ranks[vertex1Root] += 1

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [[[1, 1]], [[0, 1]]]
        expected = [[[1, 1]], [[0, 1]]]
        actual = program.kruskalsAlgorithm(input)
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
  const input: [number, number][][] = [[[1, 1]], [[0, 1]]];
  const expected = [[[1, 1]], [[0, 1]]];
  const actual = program.kruskalsAlgorithm(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(e * log(e)) time | O(e + v) space - where e is the number
// of edges in the input edges and v is the number of vertices
export function kruskalsAlgorithm(edges: [number, number][][]) {
  const edgeList: [number, number, number][] = [];
  for (let sourceIndex = 0; sourceIndex < edges.length; sourceIndex++) {
    const vertex = edges[sourceIndex];
    for (const edge of vertex) {
      if (edge[0] > sourceIndex) {
        edgeList.push([sourceIndex, edge[0], edge[1]]);
      }
    }
  }
  const sortedEdges = edgeList.sort((edgeA, edgeB) => {
    if (edgeA[2] > edgeB[2]) return 1;
    if (edgeA[2] < edgeB[2]) return -1;
    return 0;
  });

  const parents = edges.map((_, i) => i);
  const ranks = edges.map(_ => 0);
  const mst: [number, number][][] = edges.map(_ => []);
  for (const edge of sortedEdges) {
    const vertex1Root = find(edge[0], parents);
    const vertex2Root = find(edge[1], parents);
    if (vertex1Root !== vertex2Root) {
      mst[edge[0]].push([edge[1], edge[2]]);
      mst[edge[1]].push([edge[0], edge[2]]);
      union(vertex1Root, vertex2Root, parents, ranks);
    }
  }

  return mst;
}

function find(vertex: number, parents: number[]) {
  if (vertex !== parents[vertex]) {
    parents[vertex] = find(parents[vertex], parents);
  }

  return parents[vertex];
}

function union(vertex1Root: number, vertex2Root: number, parents: number[], ranks: number[]) {
  if (ranks[vertex1Root] < ranks[vertex2Root]) {
    parents[vertex1Root] = vertex2Root;
  } else if (ranks[vertex1Root] > ranks[vertex2Root]) {
    parents[vertex2Root] = vertex1Root;
  } else {
    parents[vertex2Root] = vertex1Root;
    ranks[vertex1Root] += 1;
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input: [number, number][][] = [[[1, 1]], [[0, 1]]];
  const expected = [[[1, 1]], [[0, 1]]];
  const actual = program.kruskalsAlgorithm(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

