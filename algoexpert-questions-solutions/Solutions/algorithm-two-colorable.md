# Two-Colorable
<div class="html">
  <p>
    You're given a list of <span>edges</span> representing a connected,
    unweighted, undirected graph with at least one node. Write a function that
    returns a boolean representing whether the given graph is two-colorable.
  </p>

  <p>
    A graph is two-colorable (also called bipartite) if all of the nodes can
    be assigned one of two colors such that no nodes of the same color are
    connected by an edge.
  </p>

  <p>
    The given list is what's called an adjacency list, and it represents a graph.
    The number of vertices in the graph is equal to the length of
    <span>edges</span>, where each index <span>i</span> in
    <span>edges</span> contains vertex <span>i</span>'s siblings, in no
    particular order. Each individual edge is represented by a positive integer
    that denotes an index in the list that this vertex is connected to. Note that
    this graph is undirected, meaning that if a vertex appears in the edge list
    of another vertex, then the inverse will also be true.
  </p>
  <p>
    Also note that this graph may contain self-loops. A self-loop is an edge that
    has the same destination and origin; in other words, it's an edge that
    connects a vertex to itself. Any self-loop should make a graph not
    2-colorable.
  </p>
<h3>Sample Input</h3>
<pre><span class="CodeEditor-promptParameter">edges</span> = [
  [1, 2],
  [0, 2],
  [0, 1]
]
</pre>
<h3>Sample Output</h3>
<pre>
False <span class="CodeEditor-promptComment">// Nodes 1 and 2 must be different colors than node 0.
// However, nodes 1 and 2 are also connected, meaning they must also have different colors,
// which is impossible with only 2 available colors.
</span>
</pre>

Hint 1
<p>
  Try starting by choosing a random node and assigning it a color. From here,
  can you tell what colors any other nodes must have?
</p>


Hint 2

<p>
  From a given node, assign each sibling node the opposite color, then continue
  through the graph using BFS or DFS.
</p>


Hint 3

<p>
  If you ever encounter a sibling that is already marked as the wrong color, then
  there cannot be a solution.
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
      vector<vector<int>> input = {{1}, {0}};
      auto expected = true;
      auto actual = twoColorable(input);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <stack>
using namespace std;

// O(v + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the graph
bool twoColorable(vector<vector<int>> edges) {
  vector<int> colors(edges.size(), 0);
  colors[0] = 1;
  stack<int> stack;
  stack.push(0);

  while (stack.size() > 0) {
    int node = stack.top();
    stack.pop();
    for (int connection : edges[node]) {
      if (colors[connection] == 0) {
        colors[connection] = colors[node] == 1 ? 2 : 1;
        stack.push(connection);
      } else if (colors[connection] == colors[node]) {
        return false;
      }
    }
  }
  
  return true;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> input = {{1}, {0}};
      auto expected = true;
      auto actual = twoColorable(input);
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
		int[][] input =
		  new int[][] {
			new int[] {1},
			new int[] {0}
		};
		var expected = true;
		var actual = new Program().TwoColorable(input);
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

	public bool TwoColorable(int[][] edges) {
		int[] colors = new int[edges.Length];
		colors[0] = 1;
		Stack<int> stack = new Stack<int>();
		stack.Push(0);

		while (stack.Count > 0) {
			int node = stack.Pop();
			foreach (var connection in edges[node]) {
				if (colors[connection] == 0) {
					colors[connection] = colors[node] == 1 ? 2 : 1;
					stack.Push(connection);
				} else if (colors[connection] == colors[node]) {
					return false;
				}
			}
		}
		return true;
	}
}


```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[][] input =
		  new int[][] {
			new int[] {1},
			new int[] {0}
		};
		var expected = true;
		var actual = new Program().TwoColorable(input);
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
	input := [][]int{{1}, {0}}
	expected := true
	actual := TwoColorable(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(v + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the graph
func TwoColorable(edges [][]int) bool {
	colors := map[int]bool{
		0: true,
	}
	stack := []int{0}

	for len(stack) > 0 {
		var node int
		node, stack = stack[len(stack)-1], stack[:len(stack)-1]
		for _, connection := range edges[node] {
			if _, colorFound := colors[connection]; !colorFound {
				colors[connection] = !colors[node]
				stack = append(stack, connection)
			} else if colors[connection] == colors[node] {
				return false
			}
		}
	}
	return true
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := [][]int{{1}, {0}}
	expected := true
	actual := TwoColorable(input)
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
    int[][] input = new int[][] {{1}, {0}};
    var expected = true;
    var actual = new Program().twoColorable(input);
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
  public boolean twoColorable(int[][] edges) {
    int[] colors = new int[edges.length];
    colors[0] = 1;
    Stack<Integer> stack = new Stack<Integer>();
    stack.push(0);

    while (stack.size() > 0) {
      int node = stack.pop();
      for (int connection : edges[node]) {
        if (colors[connection] == 0) {
          colors[connection] = colors[node] == 1 ? 2 : 1;
          stack.push(connection);
        } else if (colors[connection] == colors[node]) {
          return false;
        }
      }
    }
    return true;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[][] input = new int[][] {{1}, {0}};
    var expected = true;
    var actual = new Program().twoColorable(input);
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
  const input = [[1], [0]];
  const expected = true;
  const actual = program.twoColorable(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(v + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the graph
function twoColorable(edges) {
  const colors = edges.map(_ => null);
  colors[0] = true;
  const stack = [0];

  while (stack.length > 0) {
    const node = stack.pop();
    for (const connection of edges[node]) {
      if (colors[connection] === null) {
        colors[connection] = !colors[node];
        stack.push(connection);
      } else if (colors[connection] === colors[node]) {
        return false;
      }
    }
  }

  return true;
}

// Do not edit the line below.
exports.twoColorable = twoColorable;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [[1], [0]];
  const expected = true;
  const actual = program.twoColorable(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.twoColorable

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(listOf(1), listOf(0))
        val expected = true
        val output = twoColorable(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import java.util.Stack

// O(v + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the graph
fun twoColorable(edges: List<List<Int>>): Boolean {
    val colors = MutableList<Boolean?>(edges.size) { null }
    colors[0] = true
    val stack = Stack<Int>()
    stack.add(0)

    while (stack.size > 0) {
        val node = stack.pop()
        for (connection in edges[node]) {
            if (colors[connection] == null) {
                colors[connection] = !colors[node]!!
                stack.add(connection)
            } else if (colors[connection] == colors[node]) {
                return false
            }
        }
    }

    return true
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.twoColorable

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(listOf(1), listOf(0))
        val expected = true
        val output = twoColorable(input)
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
      var input = [[1], [0]]
      var expected = true
      var actual = Program().twoColorable(input)
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
  func twoColorable(_ edges: [[Int]]) -> Bool {
    var colors: [Int: Bool] = [
      0: true,
    ]
    var stack = [0]

    while stack.count > 0 {
      let node = stack.popLast()!
      for connection in edges[node] {
        if colors[connection] == nil {
          colors[connection] = !colors[node]!
          stack.append(connection)
        } else if colors[connection] == colors[node] {
          return false
        }
      }
    }
    return true
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws in
      var input = [[1], [0]]
      var expected = true
      var actual = Program().twoColorable(input)
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
        input = [[1], [0]]
        expected = True
        actual = program.twoColorable(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(v + e) time | O(v) space - where v is the number of
# vertices and e is the number of edges in the graph
def twoColorable(edges):
    colors = [None for _ in edges]
    colors[0] = True
    stack = [0]

    while len(stack) > 0:
        node = stack.pop()
        for connection in edges[node]:
            if colors[connection] is None:
                colors[connection] = not colors[node]
                stack.append(connection)
            elif colors[connection] == colors[node]:
                return False

    return True

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [[1], [0]]
        expected = True
        actual = program.twoColorable(input)
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
  const input = [[1], [0]];
  const expected = true;
  const actual = program.twoColorable(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(v + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the graph
export function twoColorable(edges: number[][]) {
  const colors: Array<null | boolean> = edges.map(_ => null);
  colors[0] = true;
  const stack = [0];

  while (stack.length > 0) {
    const node = stack.pop()!;
    for (const connection of edges[node]) {
      if (colors[connection] === null) {
        colors[connection] = !colors[node];
        stack.push(connection);
      } else if (colors[connection] === colors[node]) {
        return false;
      }
    }
  }

  return true;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [[1], [0]];
  const expected = true;
  const actual = program.twoColorable(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

