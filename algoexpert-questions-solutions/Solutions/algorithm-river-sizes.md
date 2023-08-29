# River Sizes
<div class="html">
<p>
  You're given a two-dimensional array (a matrix) of potentially unequal height
  and width containing only <span>0</span>s and <span>1</span>s. Each
  <span>0</span> represents land, and each <span>1</span> represents part of a
  river. A river consists of any number of <span>1</span>s that are either
  horizontally or vertically adjacent (but not diagonally adjacent). The number
  of adjacent <span>1</span>s forming a river determine its size.
</p>
<p>
  Note that a river can twist. In other words, it doesn't have to be a straight
  vertical line or a straight horizontal line; it can be L-shaped, for example.
</p>
<p>
  Write a function that returns an array of the sizes of all rivers represented
  in the input matrix. The sizes don't need to be in any particular order.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">matrix</span> = [
  [1, 0, 0, 1, 0],
  [1, 0, 1, 0, 0],
  [0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 1, 0],
]
</pre>
<h3>Sample Output</h3>
<pre>
[1, 2, 2, 2, 5] <span class="CodeEditor-promptComment">// The numbers could be ordered differently.</span>

<span class="CodeEditor-promptComment">// The rivers can be clearly seen here:</span>
<span class="CodeEditor-promptComment">// [</span>
<span class="CodeEditor-promptComment">//   [1,  ,  , 1,  ],</span>
<span class="CodeEditor-promptComment">//   [1,  , 1,  ,  ],</span>
<span class="CodeEditor-promptComment">//   [ ,  , 1,  , 1],</span>
<span class="CodeEditor-promptComment">//   [1,  , 1,  , 1],</span>
<span class="CodeEditor-promptComment">//   [1,  , 1, 1,  ],</span>
<span class="CodeEditor-promptComment">// ]</span>
</pre>
</div>

Hint 1
<p>
Since you must return the sizes of rivers, which consist of horizontally and vertically adjacent 1s in the input matrix, you must somehow keep track of groups of neighboring 1s as you traverse the matrix. Try treating the matrix as a graph, where each element in the matrix is a node in the graph with up to 4 neighboring nodes (above, below, to the left, and to the right), and traverse it using a popular graph-traversal algorithm like Depth-first Search or Breadth-first Search.
</p>


Hint 2

<p>
By traversing the matrix using DFS or BFS as mentioned in Hint #1, any time that you encounter a 1 you can traverse the entire river that this 1 is a part of (and keep track of its size) by simply iterating through the given node's neighboring nodes and their own neighboring nodes so long as the nodes are 1s.
</p>


Hint 3

<p>
Naturally, many nodes in the graph mentioned in Hint #1 will have overlapping neighboring nodes, and as you traverse the matrix, you will undoubtedly encounter nodes that you have previously visited. In order to prevent mistakenly calculating the same river's size multiple times and to avoid doing needless computational work, try keeping track of every node that you visit in an auxiliary data structure and only performing important computations on unvisited nodes. What data structure would be ideal here?
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

#include <algorithm>

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> testInput{
          {1, 0, 0, 1, 0}, {1, 0, 1, 0, 0}, {0, 0, 1, 0, 1},
          {1, 0, 1, 0, 1}, {1, 0, 1, 1, 0},
      };
      vector<int> expected{1, 2, 2, 2, 5};
      vector<int> output = riverSizes(testInput);
      sort(output.begin(), output.end());
      assert(output == expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

void traverseNode(int i, int j, vector<vector<int>> &matrix,
                  vector<vector<int>> &visited, vector<int> &sizes);
vector<vector<int>> getUnvisitedNeighbors(int i, int j,
                                          vector<vector<int>> &matrix,
                                          vector<vector<int>> &visited);

// O(wh) time | O(wh) space
vector<int> riverSizes(vector<vector<int>> matrix) {
  vector<int> sizes = {};
  vector<vector<int>> visited(matrix.size(),
                              vector<int>(matrix[0].size(), false));
  for (int i = 0; i < matrix.size(); i++) {
    for (int j = 0; j < matrix[i].size(); j++) {
      if (visited[i][j]) {
        continue;
      }
      traverseNode(i, j, matrix, visited, sizes);
    }
  }
  return sizes;
}

void traverseNode(int i, int j, vector<vector<int>> &matrix,
                  vector<vector<int>> &visited, vector<int> &sizes) {
  int currentRiverSize = 0;
  vector<vector<int>> nodesToExplore{{i, j}};
  while (nodesToExplore.size() != 0) {
    vector<int> currentNode = nodesToExplore.back();
    nodesToExplore.pop_back();
    i = currentNode[0];
    j = currentNode[1];
    if (visited[i][j]) {
      continue;
    }
    visited[i][j] = true;
    if (matrix[i][j] == 0) {
      continue;
    }
    currentRiverSize++;
    vector<vector<int>> unvisitedNeighbors =
        getUnvisitedNeighbors(i, j, matrix, visited);
    for (vector<int> neighbor : unvisitedNeighbors) {
      nodesToExplore.push_back(neighbor);
    }
  }
  if (currentRiverSize > 0) {
    sizes.push_back(currentRiverSize);
  }
}

vector<vector<int>> getUnvisitedNeighbors(int i, int j,
                                          vector<vector<int>> &matrix,
                                          vector<vector<int>> &visited) {
  vector<vector<int>> unvisitedNeighbors{};
  if (i > 0 && !visited[i - 1][j]) {
    unvisitedNeighbors.push_back({i - 1, j});
  }
  if (i < matrix.size() - 1 && !visited[i + 1][j]) {
    unvisitedNeighbors.push_back({i + 1, j});
  }
  if (j > 0 && !visited[i][j - 1]) {
    unvisitedNeighbors.push_back({i, j - 1});
  }
  if (j < matrix[0].size() - 1 && !visited[i][j + 1]) {
    unvisitedNeighbors.push_back({i, j + 1});
  }
  return unvisitedNeighbors;
}

```
### Unit Tests 1 (cpp)
```cpp
#include <algorithm>

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> testInput{
          {1, 0, 0, 1, 0}, {1, 0, 1, 0, 0}, {0, 0, 1, 0, 1},
          {1, 0, 1, 0, 1}, {1, 0, 1, 1, 0},
      };
      vector<int> expected{1, 2, 2, 2, 5};
      vector<int> output = riverSizes(testInput);
      sort(output.begin(), output.end());
      assert(output == expected);
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

public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[,] input = {
			{1, 0, 0, 1, 0},
			{1, 0, 1, 0, 0},
			{0, 0, 1, 0, 1},
			{1, 0, 1, 0, 1},
			{1, 0, 1, 1, 0},
		};
		int[] expected = {1, 2, 2, 2, 5};
		List<int> output = Program.RiverSizes(input);
		output.Sort();
		Utils.AssertTrue(compare(output, expected));
	}

	public static bool compare(List<int> arr1, int[] arr2) {
		if (arr1.Count != arr2.Length) {
			return false;
		}
		for (int i = 0; i < arr1.Count; i++) {
			if (arr1[i] != arr2[i]) {
				return false;
			}
		}
		return true;
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(wh) time | O(wh) space
	public static List<int> RiverSizes(int[,] matrix) {
		List<int> sizes = new List<int>();
		bool[,] visited = new bool[matrix.GetLength(0),matrix.GetLength(1)];
		for (int i = 0; i < matrix.GetLength(0); i++) {
			for (int j = 0; j < matrix.GetLength(1); j++) {
				if (visited[i,j]) {
					continue;
				}
				traverseNode(i, j, matrix, visited, sizes);
			}
		}
		return sizes;
	}

	public static void traverseNode(int i, int j, int[,] matrix, bool[,] visited,
	  List<int> sizes) {
		int currentRiverSize = 0;
		Stack<int[]> nodesToExplore = new Stack<int[]>();
		nodesToExplore.Push(new int[] {i, j});
		while (nodesToExplore.Count != 0) {
			int[] currentNode = nodesToExplore.Pop();
			i = currentNode[0];
			j = currentNode[1];
			if (visited[i,j]) {
				continue;
			}
			visited[i,j] = true;
			if (matrix[i,j] == 0) {
				continue;
			}
			currentRiverSize++;
			List<int[]> unvisitedNeighbors =
			  getUnvisitedNeighbors(i, j, matrix, visited);
			foreach (var neighbor in unvisitedNeighbors) {
				nodesToExplore.Push(neighbor);
			}
		}
		if (currentRiverSize > 0) {
			sizes.Add(currentRiverSize);
		}
	}

	public static List<int[]> getUnvisitedNeighbors(int i, int j, int[,] matrix, bool[,
	  ] visited) {
		List<int[]> unvisitedNeighbors = new List<int[]>();
		if (i > 0 && !visited[i - 1,j]) {
			unvisitedNeighbors.Add(new int[] {i - 1, j});
		}
		if (i < matrix.GetLength(0) - 1 && !visited[i + 1,j]) {
			unvisitedNeighbors.Add(new int[] {i + 1, j});
		}
		if (j > 0 && !visited[i,j - 1]) {
			unvisitedNeighbors.Add(new int[] {i, j - 1});
		}
		if (j < matrix.GetLength(1) - 1 && !visited[i,j + 1]) {
			unvisitedNeighbors.Add(new int[] {i, j + 1});
		}
		return unvisitedNeighbors;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[,] input = {
			{1, 0, 0, 1, 0},
			{1, 0, 1, 0, 0},
			{0, 0, 1, 0, 1},
			{1, 0, 1, 0, 1},
			{1, 0, 1, 1, 0},
		};
		int[] expected = {1, 2, 2, 2, 5};
		List<int> output = Program.RiverSizes(input);
		output.Sort();
		Utils.AssertTrue(compare(output, expected));
	}

	public static bool compare(List<int> arr1, int[] arr2) {
		if (arr1.Count != arr2.Length) {
			return false;
		}
		for (int i = 0; i < arr1.Count; i++) {
			if (arr1[i] != arr2[i]) {
				return false;
			}
		}
		return true;
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
	"reflect"
	"sort"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := []int{1, 2, 2, 2, 5}
	input := [][]int{
		{1, 0, 0, 1, 0},
		{1, 0, 1, 0, 0},
		{0, 0, 1, 0, 1},
		{1, 0, 1, 0, 1},
		{1, 0, 1, 1, 0},
	}
	output := RiverSizes(input)
	sort.Ints(output)
	if !reflect.DeepEqual(expected, output) {
		t.Fail()
	}
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(wh) time | O(wh) space
func RiverSizes(matrix [][]int) []int {
	sizes := []int{}
	visited := make([][]bool, len(matrix))
	for i := range visited {
		visited[i] = make([]bool, len(matrix[i]))
	}
	for i := range matrix {
		for j := range matrix[i] {
			if visited[i][j] {
				continue
			}
			sizes = traverseNode(i, j, matrix, visited, sizes)
		}
	}
	return sizes
}

func traverseNode(i, j int, matrix [][]int, visited [][]bool, sizes []int) []int {
	currentRiverSize := 0
	nodesToExplore := [][]int{{i, j}}
	for len(nodesToExplore) > 0 {
		currentNode := nodesToExplore[0]
		nodesToExplore = nodesToExplore[1:]
		i, j := currentNode[0], currentNode[1]
		if visited[i][j] {
			continue
		}
		visited[i][j] = true
		if matrix[i][j] == 0 {
			continue
		}
		currentRiverSize += 1
		unvisitedNeighbors := getUnvisitedNeighbors(i, j, matrix, visited)
		for _, neighbor := range unvisitedNeighbors {
			nodesToExplore = append(nodesToExplore, neighbor)
		}
	}
	if currentRiverSize > 0 {
		sizes = append(sizes, currentRiverSize)
	}
	return sizes
}

func getUnvisitedNeighbors(i, j int, matrix [][]int, visited [][]bool) [][]int {
	unvisitedNeighbors := [][]int{}
	if i > 0 && !visited[i-1][j] {
		unvisitedNeighbors = append(unvisitedNeighbors, []int{i - 1, j})
	}
	if i < len(matrix)-1 && !visited[i+1][j] {
		unvisitedNeighbors = append(unvisitedNeighbors, []int{i + 1, j})
	}
	if j > 0 && !visited[i][j-1] {
		unvisitedNeighbors = append(unvisitedNeighbors, []int{i, j - 1})
	}
	if j < len(matrix[0])-1 && !visited[i][j+1] {
		unvisitedNeighbors = append(unvisitedNeighbors, []int{i, j + 1})
	}
	return unvisitedNeighbors
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"reflect"
	"sort"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := []int{1, 2, 2, 2, 5}
	input := [][]int{
		{1, 0, 0, 1, 0},
		{1, 0, 1, 0, 0},
		{0, 0, 1, 0, 1},
		{1, 0, 1, 0, 1},
		{1, 0, 1, 1, 0},
	}
	output := RiverSizes(input)
	sort.Ints(output)
	if !reflect.DeepEqual(expected, output) {
		t.Fail()
	}
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
    int[][] input = {
      {1, 0, 0, 1, 0},
      {1, 0, 1, 0, 0},
      {0, 0, 1, 0, 1},
      {1, 0, 1, 0, 1},
      {1, 0, 1, 1, 0},
    };
    int[] expected = {1, 2, 2, 2, 5};
    List<Integer> output = Program.riverSizes(input);
    Collections.sort(output);
    Utils.assertTrue(compare(output, expected));
  }

  public static boolean compare(List<Integer> arr1, int[] arr2) {
    if (arr1.size() != arr2.length) {
      return false;
    }
    for (int i = 0; i < arr1.size(); i++) {
      if (arr1.get(i) != arr2[i]) {
        return false;
      }
    }
    return true;
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(wh) time | O(wh) space
  public static List<Integer> riverSizes(int[][] matrix) {
    List<Integer> sizes = new ArrayList<Integer>();
    boolean[][] visited = new boolean[matrix.length][matrix[0].length];
    for (int i = 0; i < matrix.length; i++) {
      for (int j = 0; j < matrix[0].length; j++) {
        if (visited[i][j]) {
          continue;
        }
        traverseNode(i, j, matrix, visited, sizes);
      }
    }
    return sizes;
  }

  public static void traverseNode(
      int i, int j, int[][] matrix, boolean[][] visited, List<Integer> sizes) {
    int currentRiverSize = 0;
    Stack<Integer[]> nodesToExplore = new Stack<Integer[]>();
    nodesToExplore.push(new Integer[] {i, j});
    while (!nodesToExplore.empty()) {
      Integer[] currentNode = nodesToExplore.pop();
      i = currentNode[0];
      j = currentNode[1];
      if (visited[i][j]) {
        continue;
      }
      visited[i][j] = true;
      if (matrix[i][j] == 0) {
        continue;
      }
      currentRiverSize++;
      List<Integer[]> unvisitedNeighbors = getUnvisitedNeighbors(i, j, matrix, visited);
      for (Integer[] neighbor : unvisitedNeighbors) {
        nodesToExplore.add(neighbor);
      }
    }
    if (currentRiverSize > 0) {
      sizes.add(currentRiverSize);
    }
  }

  public static List<Integer[]> getUnvisitedNeighbors(
      int i, int j, int[][] matrix, boolean[][] visited) {
    List<Integer[]> unvisitedNeighbors = new ArrayList<Integer[]>();
    if (i > 0 && !visited[i - 1][j]) {
      unvisitedNeighbors.add(new Integer[] {i - 1, j});
    }
    if (i < matrix.length - 1 && !visited[i + 1][j]) {
      unvisitedNeighbors.add(new Integer[] {i + 1, j});
    }
    if (j > 0 && !visited[i][j - 1]) {
      unvisitedNeighbors.add(new Integer[] {i, j - 1});
    }
    if (j < matrix[0].length - 1 && !visited[i][j + 1]) {
      unvisitedNeighbors.add(new Integer[] {i, j + 1});
    }
    return unvisitedNeighbors;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[][] input = {
      {1, 0, 0, 1, 0},
      {1, 0, 1, 0, 0},
      {0, 0, 1, 0, 1},
      {1, 0, 1, 0, 1},
      {1, 0, 1, 1, 0},
    };
    int[] expected = {1, 2, 2, 2, 5};
    List<Integer> output = Program.riverSizes(input);
    Collections.sort(output);
    Utils.assertTrue(compare(output, expected));
  }

  public static boolean compare(List<Integer> arr1, int[] arr2) {
    if (arr1.size() != arr2.length) {
      return false;
    }
    for (int i = 0; i < arr1.size(); i++) {
      if (arr1.get(i) != arr2[i]) {
        return false;
      }
    }
    return true;
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
  const testInput = [
    [1, 0, 0, 1, 0],
    [1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0],
  ];
  const expected = [1, 2, 2, 2, 5];
  chai.expect(program.riverSizes(testInput).sort((a, b) => a - b)).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(wh) time | O(wh) space
function riverSizes(matrix) {
  const sizes = [];
  const visited = matrix.map(row => row.map(value => false));
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (visited[i][j]) continue;
      traverseNode(i, j, matrix, visited, sizes);
    }
  }
  return sizes;
}

function traverseNode(i, j, matrix, visited, sizes) {
  let currentRiverSize = 0;
  const nodesToExplore = [[i, j]];
  while (nodesToExplore.length) {
    const currentNode = nodesToExplore.pop();
    i = currentNode[0];
    j = currentNode[1];
    if (visited[i][j]) continue;
    visited[i][j] = true;
    if (matrix[i][j] === 0) continue;
    currentRiverSize++;
    const unvisitedNeighbors = getUnvisitedNeighbors(i, j, matrix, visited);
    for (const neighbor of unvisitedNeighbors) {
      nodesToExplore.push(neighbor);
    }
  }
  if (currentRiverSize > 0) sizes.push(currentRiverSize);
}

function getUnvisitedNeighbors(i, j, matrix, visited) {
  const unvisitedNeighbors = [];
  if (i > 0 && !visited[i - 1][j]) unvisitedNeighbors.push([i - 1, j]);
  if (i < matrix.length - 1 && !visited[i + 1][j]) unvisitedNeighbors.push([i + 1, j]);
  if (j > 0 && !visited[i][j - 1]) unvisitedNeighbors.push([i, j - 1]);
  if (j < matrix[0].length - 1 && !visited[i][j + 1]) unvisitedNeighbors.push([i, j + 1]);
  return unvisitedNeighbors;
}

exports.riverSizes = riverSizes;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const testInput = [
    [1, 0, 0, 1, 0],
    [1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0],
  ];
  const expected = [1, 2, 2, 2, 5];
  chai.expect(program.riverSizes(testInput).sort((a, b) => a - b)).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.riverSizes

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(
            listOf(1, 0, 0, 1, 0),
            listOf(1, 0, 1, 0, 0),
            listOf(0, 0, 1, 0, 1),
            listOf(1, 0, 1, 0, 1),
            listOf(1, 0, 1, 1, 0)
        )
        val expected = listOf(1, 2, 2, 2, 5)
        val output = riverSizes(input).sorted()
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import java.util.Stack

// O(wh) time | O(wh) space
fun riverSizes(matrix: List<List<Int>>): List<Int> {
    val sizes = mutableListOf<Int>()
    val visited = List(matrix.size) { MutableList(matrix[0].size) { false } }
    for (i in 0 until matrix.size) {
        for (j in 0 until matrix[0].size) {
            if (visited[i][j]) {
                continue
            }
            traverseNode(i, j, matrix, visited, sizes)
        }
    }
    return sizes
}

fun traverseNode(iStart: Int, jStart: Int, matrix: List<List<Int>>, visited: List<MutableList<Boolean>>, sizes: MutableList<Int>) {
    var i = iStart
    var j = jStart

    var currentRiverSize = 0
    val nodesToExplore = Stack<Pair<Int, Int>>()
    nodesToExplore.push(Pair(i, j))
    while (!nodesToExplore.empty()) {
        val currentNode = nodesToExplore.pop()
        i = currentNode.first
        j = currentNode.second
        if (visited[i][j]) {
            continue
        }
        visited[i][j] = true
        if (matrix[i][j] == 0) {
            continue
        }
        currentRiverSize++
        val unvisitedNeighbors = getUnvisitedNeighbors(i, j, matrix, visited)
        for (neighbor in unvisitedNeighbors) {
            nodesToExplore.add(neighbor)
        }
    }
    if (currentRiverSize > 0) {
        sizes.add(currentRiverSize)
    }
}

fun getUnvisitedNeighbors(i: Int, j: Int, matrix: List<List<Int>>, visited: List<List<Boolean>>): List<Pair<Int, Int>> {
    val unvisitedNeighbors = mutableListOf<Pair<Int, Int>>()
    if (i > 0 && !visited[i - 1][j]) {
        unvisitedNeighbors.add(Pair(i - 1, j))
    }
    if (i < matrix.size - 1 && !visited[i + 1][j]) {
        unvisitedNeighbors.add(Pair(i + 1, j))
    }
    if (j > 0 && !visited[i][j - 1]) {
        unvisitedNeighbors.add(Pair(i, j - 1))
    }
    if (j < matrix[0].size - 1 && !visited[i][j + 1]) {
        unvisitedNeighbors.add(Pair(i, j + 1))
    }
    return unvisitedNeighbors
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.riverSizes

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(
            listOf(1, 0, 0, 1, 0),
            listOf(1, 0, 1, 0, 0),
            listOf(0, 0, 1, 0, 1),
            listOf(1, 0, 1, 0, 1),
            listOf(1, 0, 1, 1, 0)
        )
        val expected = listOf(1, 2, 2, 2, 5)
        val output = riverSizes(input).sorted()
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
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let Matrix = [
        [1, 0, 0, 1, 0],
        [1, 0, 1, 0, 0],
        [0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 1, 0],
      ]
      let Expected = [1, 2, 2, 2, 5]
      let RiverSizes = program.riverSizes(Matrix).sorted()
      try assertEqual(Expected, RiverSizes)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(wh) time | O(wh) space
  func riverSizes(_ matrix: [[Int]]) -> [Int] {
    var sizes: [Int] = []
    var visited: [[Bool]] = matrix.map { $0.map { $0 == 2 } }
    for var i in 0 ..< matrix.count {
      for var j in 0 ..< matrix[i].count {
        if visited[i][j] { continue }
        traverseNode(i, j, matrix, &visited, &sizes)
      }
    }
    return sizes
  }

  func traverseNode(_ k: Int, _ l: Int, _ matrix: [[Int]], _ visited: inout [[Bool]], _ sizes: inout [Int]) {
    var i = k
    var j = l
    var currentRiverSize = 0
    var nodesToExplore = [[i, j]]
    while nodesToExplore.count > 0 {
      let currentNode = nodesToExplore.popLast()!

      i = currentNode[0]
      j = currentNode[1]
      if visited[i][j] { continue }
      visited[i][j] = true

      if matrix[i][j] == 0 { continue }
      currentRiverSize += 1

      let unvisitedNeighbors = getUnvisitedNeighbors(i, j, matrix, visited)
      for node in unvisitedNeighbors {
        nodesToExplore.append(node)
      }
    }
    if currentRiverSize > 0 { sizes.append(currentRiverSize) }
  }

  func getUnvisitedNeighbors(_ i: Int, _ j: Int, _ matrix: [[Int]], _ visited: [[Bool]]) -> [[Int]] {
    var unvisitedNeighbors: [[Int]] = []

    if i > 0, !visited[i - 1][j] {
      unvisitedNeighbors.append([i - 1, j])
    }
    if i < matrix.count - 1, !visited[i + 1][j] {
      unvisitedNeighbors.append([i + 1, j])
    }
    if j > 0, !visited[i][j - 1] {
      unvisitedNeighbors.append([i, j - 1])
    }
    if j < matrix[i].count - 1, !visited[i][j + 1] {
      unvisitedNeighbors.append([i, j + 1])
    }
    return unvisitedNeighbors
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let Matrix = [
        [1, 0, 0, 1, 0],
        [1, 0, 1, 0, 0],
        [0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 1, 0],
      ]
      let Expected = [1, 2, 2, 2, 5]
      let RiverSizes = program.riverSizes(Matrix).sorted()
      try assertEqual(Expected, RiverSizes)
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
        testInput = [[1, 0, 0, 1, 0], [1, 0, 1, 0, 0], [0, 0, 1, 0, 1], [1, 0, 1, 0, 1], [1, 0, 1, 1, 0]]
        expected = [1, 2, 2, 2, 5]
        self.assertEqual(sorted(program.riverSizes(testInput)), expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(wh) time | O(wh) space
def riverSizes(matrix):
    sizes = []
    visited = [[False for value in row] for row in matrix]
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            if visited[i][j]:
                continue
            traverseNode(i, j, matrix, visited, sizes)
    return sizes


def traverseNode(i, j, matrix, visited, sizes):
    currentRiverSize = 0
    nodesToExplore = [[i, j]]
    while len(nodesToExplore):
        currentNode = nodesToExplore.pop()
        i = currentNode[0]
        j = currentNode[1]
        if visited[i][j]:
            continue
        visited[i][j] = True
        if matrix[i][j] == 0:
            continue
        currentRiverSize += 1
        unvisitedNeighbors = getUnvisitedNeighbors(i, j, matrix, visited)
        for neighbor in unvisitedNeighbors:
            nodesToExplore.append(neighbor)
    if currentRiverSize > 0:
        sizes.append(currentRiverSize)


def getUnvisitedNeighbors(i, j, matrix, visited):
    unvisitedNeighbors = []
    if i > 0 and not visited[i - 1][j]:
        unvisitedNeighbors.append([i - 1, j])
    if i < len(matrix) - 1 and not visited[i + 1][j]:
        unvisitedNeighbors.append([i + 1, j])
    if j > 0 and not visited[i][j - 1]:
        unvisitedNeighbors.append([i, j - 1])
    if j < len(matrix[0]) - 1 and not visited[i][j + 1]:
        unvisitedNeighbors.append([i, j + 1])
    return unvisitedNeighbors

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        testInput = [[1, 0, 0, 1, 0], [1, 0, 1, 0, 0], [0, 0, 1, 0, 1], [1, 0, 1, 0, 1], [1, 0, 1, 1, 0]]
        expected = [1, 2, 2, 2, 5]
        self.assertEqual(sorted(program.riverSizes(testInput)), expected)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const testInput = [
    [1, 0, 0, 1, 0],
    [1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0],
  ];
  const expected = [1, 2, 2, 2, 5];
  chai.expect(program.riverSizes(testInput).sort((a, b) => a - b)).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(wh) time | O(wh) space
export function riverSizes(matrix: number[][]) {
  const sizes: number[] = [];
  const visited: boolean[][] = matrix.map(row => row.map(value => false));
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (visited[i][j]) continue;
      traverseNode(i, j, matrix, visited, sizes);
    }
  }
  return sizes;
}

function traverseNode(i: number, j: number, matrix: number[][], visited: boolean[][], sizes: number[]) {
  let currentRiverSize = 0;
  const nodesToExplore = [[i, j]];
  while (nodesToExplore.length) {
    const currentNode = nodesToExplore.pop()!;
    i = currentNode[0];
    j = currentNode[1];
    if (visited[i][j]) continue;
    visited[i][j] = true;
    if (matrix[i][j] === 0) continue;
    currentRiverSize++;
    const unvisitedNeighbors = getUnvisitedNeighbors(i, j, matrix, visited);
    for (const neighbor of unvisitedNeighbors) {
      nodesToExplore.push(neighbor);
    }
  }
  if (currentRiverSize > 0) sizes.push(currentRiverSize);
}

function getUnvisitedNeighbors(i: number, j: number, matrix: number[][], visited: boolean[][]) {
  const unvisitedNeighbors: [number, number][] = [];
  if (i > 0 && !visited[i - 1][j]) unvisitedNeighbors.push([i - 1, j]);
  if (i < matrix.length - 1 && !visited[i + 1][j]) unvisitedNeighbors.push([i + 1, j]);
  if (j > 0 && !visited[i][j - 1]) unvisitedNeighbors.push([i, j - 1]);
  if (j < matrix[0].length - 1 && !visited[i][j + 1]) unvisitedNeighbors.push([i, j + 1]);
  return unvisitedNeighbors;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const testInput = [
    [1, 0, 0, 1, 0],
    [1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0],
  ];
  const expected = [1, 2, 2, 2, 5];
  chai.expect(program.riverSizes(testInput).sort((a, b) => a - b)).to.deep.equal(expected);
});

```

