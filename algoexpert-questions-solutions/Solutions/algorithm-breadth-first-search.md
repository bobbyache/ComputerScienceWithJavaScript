# Breadth-first Search
<div class="html">
<p>
  You're given a <span>Node</span> class that has a <span>name</span> and an
  array of optional <span>children</span> nodes. When put together, nodes form
  an acyclic tree-like structure.
</p>
<p>
  Implement the <span>breadthFirstSearch</span> method on the
  <span>Node</span> class, which takes in an empty array, traverses the tree
  using the Breadth-first Search approach (specifically navigating the tree from
  left to right), stores all of the nodes' names in the input array, and returns
  it.
</p>
<p>
  If you're unfamiliar with Breadth-first Search, we recommend watching the
  Conceptual Overview section of this question's video explanation before
  starting to code.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">graph</span> = A
     /  |  \
    B   C   D
   / \     / \
  E   F   G   H
     / \   \
    I   J   K
</pre>
<h3>Sample Output</h3>
<pre>
["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"]
</pre>
</div>

Hint 1
<p>
The Breadth-first Search algorithm works by traversing a graph level by level. In other words, before traversing any Node's children Nodes, its sibling nodes must be traversed. How can you simply and effectively keep track of Nodes' children Nodes as you traverse them, all the while retaining the order in which you must traverse them?
</p>


Hint 2

<p>
Try using a queue to store all of the future Nodes that you will need to explore as your traverse the graph. By adding Nodes' children Nodes to the queue every time you explore them and by using the First-In-First-Out property of the queue, you can traverse the graph in a Breadth-first Search way. Don't forget to add every Node's name to the input array as you traverse the graph.
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
      Node graph("A");
      graph.addChild("B")->addChild("C")->addChild("D");
      graph.children[0]->addChild("E")->addChild("F");
      graph.children[2]->addChild("G")->addChild("H");
      graph.children[0]->children[1]->addChild("I")->addChild("J");
      graph.children[2]->children[0]->addChild("K");

      vector<string> expected{"A", "B", "C", "D", "E", "F",
                              "G", "H", "I", "J", "K"};
      vector<string> inputArray{};
      assert(graph.breadthFirstSearch(&inputArray) == expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <deque>
using namespace std;

class Node {
public:
  string name;
  vector<Node *> children;

  Node(string name) { this->name = name; }

  // O(v + e) time | O(v) space
  vector<string> breadthFirstSearch(vector<string> *array) {
    deque<Node *> queue{this};
    while (!queue.empty()) {
      Node current = *queue.front();
      queue.pop_front();
      array->push_back(current.name);
      for (int i = 0; i < current.children.size(); i++) {
        queue.push_back(current.children[i]);
      }
    }
    return *array;
  }

  Node *addChild(string name) {
    Node *child = new Node(name);
    children.push_back(child);
    return this;
  }
};

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      Node graph("A");
      graph.addChild("B")->addChild("C")->addChild("D");
      graph.children[0]->addChild("E")->addChild("F");
      graph.children[2]->addChild("G")->addChild("H");
      graph.children[0]->children[1]->addChild("I")->addChild("J");
      graph.children[2]->children[0]->addChild("K");

      vector<string> expected{"A", "B", "C", "D", "E", "F",
                              "G", "H", "I", "J", "K"};
      vector<string> inputArray{};
      assert(graph.breadthFirstSearch(&inputArray) == expected);
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
		Program.Node graph = new Program.Node("A");
		graph.AddChild("B").AddChild("C").AddChild("D");
		graph.children[0].AddChild("E").AddChild("F");
		graph.children[2].AddChild("G").AddChild("H");
		graph.children[0].children[1].AddChild("I").AddChild("J");
		graph.children[2].children[0].AddChild("K");
		string[] expected = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"};
		List<string> inputArray = new List<string>();
		Utils.AssertTrue(compare(graph.BreadthFirstSearch(inputArray), expected));
	}

	public static bool compare(List<string> arr1, string[] arr2) {
		if (arr1.Count != arr2.Length) {
			return false;
		}
		for (int i = 0; i < arr1.Count; i++) {
			if (!arr1[i].Equals(arr2[i])) {
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
	public class Node {
		public string name;
		public List<Node> children = new List<Node>();

		public Node(string name) {
			this.name = name;
		}

		// O(v + e) time | O(v) space
		public List<string> BreadthFirstSearch(List<string> array) {
			Queue<Node> queue = new Queue<Node>();
			queue.Enqueue(this);
			while (queue.Count > 0) {
				Node current = queue.Dequeue();
				array.Add(current.name);
				current.children.ForEach(o => queue.Enqueue(o));
			}
			return array;
		}

		public Node AddChild(string name) {
			Node child = new Node(name);
			children.Add(child);
			return this;
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		Program.Node graph = new Program.Node("A");
		graph.AddChild("B").AddChild("C").AddChild("D");
		graph.children[0].AddChild("E").AddChild("F");
		graph.children[2].AddChild("G").AddChild("H");
		graph.children[0].children[1].AddChild("I").AddChild("J");
		graph.children[2].children[0].AddChild("K");
		string[] expected = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"};
		List<string> inputArray = new List<string>();
		Utils.AssertTrue(compare(graph.BreadthFirstSearch(inputArray), expected));
	}

	public static bool compare(List<string> arr1, string[] arr2) {
		if (arr1.Count != arr2.Length) {
			return false;
		}
		for (int i = 0; i < arr1.Count; i++) {
			if (!arr1[i].Equals(arr2[i])) {
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
	"github.com/stretchr/testify/require"
)

func NewNode(name string) *Node {
	return &Node{
		Name:     name,
		Children: []*Node{},
	}
}

func (n *Node) AddChildren(names ...string) *Node {
	for _, name := range names {
		child := Node{Name: name}
		n.Children = append(n.Children, &child)
	}
	return n
}

func (s *TestSuite) TestCase1(t *TestCase) {
	var graph = NewNode("A").AddChildren("B", "C", "D")
	graph.Children[0].AddChildren("E").AddChildren("F")
	graph.Children[2].AddChildren("G").AddChildren("H")
	graph.Children[0].Children[1].AddChildren("I").AddChildren("J")
	graph.Children[2].Children[0].AddChildren("K")
	output := graph.BreadthFirstSearch([]string{})
	expected := []string{"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"}
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type Node struct {
	Name     string
	Children []*Node
}

// O(v + e) time | O(v) space
func (n *Node) BreadthFirstSearch(array []string) []string {
	queue := []*Node{n}
	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]
		array = append(array, current.Name)
		for _, child := range current.Children {
			queue = append(queue, child)
		}
	}
	return array
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func NewNode(name string) *Node {
	return &Node{
		Name:     name,
		Children: []*Node{},
	}
}

func (n *Node) AddChildren(names ...string) *Node {
	for _, name := range names {
		child := Node{Name: name}
		n.Children = append(n.Children, &child)
	}
	return n
}

func (s *TestSuite) TestCase1(t *TestCase) {
	var graph = NewNode("A").AddChildren("B", "C", "D")
	graph.Children[0].AddChildren("E").AddChildren("F")
	graph.Children[2].AddChildren("G").AddChildren("H")
	graph.Children[0].Children[1].AddChildren("I").AddChildren("J")
	graph.Children[2].Children[0].AddChildren("K")
	output := graph.BreadthFirstSearch([]string{})
	expected := []string{"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"}
	require.Equal(t, expected, output)
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
    Program.Node graph = new Program.Node("A");
    graph.addChild("B").addChild("C").addChild("D");
    graph.children.get(0).addChild("E").addChild("F");
    graph.children.get(2).addChild("G").addChild("H");
    graph.children.get(0).children.get(1).addChild("I").addChild("J");
    graph.children.get(2).children.get(0).addChild("K");
    String[] expected = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"};
    List<String> inputArray = new ArrayList<String>();
    Utils.assertTrue(compare(graph.breadthFirstSearch(inputArray), expected));
  }

  public static boolean compare(List<String> arr1, String[] arr2) {
    if (arr1.size() != arr2.length) {
      return false;
    }
    for (int i = 0; i < arr1.size(); i++) {
      if (!arr1.get(i).equals(arr2[i])) {
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
  static class Node {
    String name;
    List<Node> children = new ArrayList<Node>();

    public Node(String name) {
      this.name = name;
    }

    // O(v + e) time | O(v) space
    public List<String> breadthFirstSearch(List<String> array) {
      Queue<Node> queue = new LinkedList<Node>();
      queue.add(this);
      while (!queue.isEmpty()) {
        Node current = queue.poll();
        array.add(current.name);
        queue.addAll(current.children);
      }
      return array;
    }

    public Node addChild(String name) {
      Node child = new Node(name);
      children.add(child);
      return this;
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
    Program.Node graph = new Program.Node("A");
    graph.addChild("B").addChild("C").addChild("D");
    graph.children.get(0).addChild("E").addChild("F");
    graph.children.get(2).addChild("G").addChild("H");
    graph.children.get(0).children.get(1).addChild("I").addChild("J");
    graph.children.get(2).children.get(0).addChild("K");
    String[] expected = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"};
    List<String> inputArray = new ArrayList<String>();
    Utils.assertTrue(compare(graph.breadthFirstSearch(inputArray), expected));
  }

  public static boolean compare(List<String> arr1, String[] arr2) {
    if (arr1.size() != arr2.length) {
      return false;
    }
    for (int i = 0; i < arr1.size(); i++) {
      if (!arr1.get(i).equals(arr2[i])) {
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
  const graph = new program.Node('A');
  graph.addChild('B').addChild('C').addChild('D');
  graph.children[0].addChild('E').addChild('F');
  graph.children[2].addChild('G').addChild('H');
  graph.children[0].children[1].addChild('I').addChild('J');
  graph.children[2].children[0].addChild('K');
  chai.expect(graph.breadthFirstSearch([])).to.deep.equal(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Node {
  constructor(name) {
    this.name = name;
    this.children = [];
  }

  addChild(name) {
    this.children.push(new Node(name));
    return this;
  }

  // O(v + e) time | O(v) space
  breadthFirstSearch(array) {
    const queue = [this];
    while (queue.length > 0) {
      const current = queue.shift();
      array.push(current.name);
      for (const child of current.children) {
        queue.push(child);
      }
    }
    return array;
  }
}

exports.Node = Node;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const graph = new program.Node('A');
  graph.addChild('B').addChild('C').addChild('D');
  graph.children[0].addChild('E').addChild('F');
  graph.children[2].addChild('G').addChild('H');
  graph.children[0].children[1].addChild('I').addChild('J');
  graph.children[2].children[0].addChild('K');
  chai.expect(graph.breadthFirstSearch([])).to.deep.equal(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.Node

class ProgramTest {
    @Test
    fun TestCase1() {
        val i = Node("I")
        val j = Node("J")
        val k = Node("K")

        val e = Node("E")
        val f = Node("F")
        f.children.addAll(listOf(i, j))

        val g = Node("G")
        g.children.add(k)

        val h = Node("H")

        val b = Node("B")
        b.children.add(e)
        b.children.add(f)

        val c = Node("C")

        val d = Node("D")
        d.children.add(g)
        d.children.add(h)

        val graph = Node("A")
        graph.children.add(b)
        graph.children.add(c)
        graph.children.add(d)

        val expected = listOf("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K")
        val output = graph.breadthFirstSearch()
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import java.util.LinkedList
import java.util.Queue

class Node(name: String) {
    val name: String = name
    val children = mutableListOf<Node>()

    // O(v + e) time | O(v) space
    fun breadthFirstSearch(): List<String> {
        val array = mutableListOf<String>()
        val queue: Queue<Node> = LinkedList<Node>()
        queue.add(this)
        while (queue.size != 0) {
            val current = queue.poll()
            array.add(current.name)
            queue.addAll(current.children)
        }
        return array
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.Node

class ProgramTest {
    @Test
    fun TestCase1() {
        val i = Node("I")
        val j = Node("J")
        val k = Node("K")

        val e = Node("E")
        val f = Node("F")
        f.children.addAll(listOf(i, j))

        val g = Node("G")
        g.children.add(k)

        val h = Node("H")

        val b = Node("B")
        b.children.add(e)
        b.children.add(f)

        val c = Node("C")

        val d = Node("D")
        d.children.add(g)
        d.children.add(h)

        val graph = Node("A")
        graph.children.add(b)
        graph.children.add(c)
        graph.children.add(d)

        val expected = listOf("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K")
        val output = graph.breadthFirstSearch()
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
      let graph = Program.Node(name: "A")
      graph.addChild(name: "B").addChild(name: "C").addChild(name: "D")
      graph.children[0].addChild(name: "E").addChild(name: "F")
      graph.children[2].addChild(name: "G").addChild(name: "H")
      graph.children[0].children[1].addChild(name: "I").addChild(name: "J")
      graph.children[2].children[0].addChild(name: "K")

      var arrayToReturn = [String]()
      try assertEqual(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"], graph.breadthFirstSearch(array: &arrayToReturn))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  class Node {
    var name: String
    var children: [Node]

    init(name: String) {
      self.name = name
      children = []
    }

    func addChild(name: String) -> Node {
      let childNode = Node(name: name)
      children.append(childNode)

      return self
    }

    // O(v + e) time | O(v) space
    func breadthFirstSearch(array: inout [String]) -> [String] {
      var queue = [self]

      while queue.count > 0 {
        let currentNode = queue.removeFirst()
        array.append(currentNode.name)

        for child in currentNode.children {
          queue.append(child)
        }
      }

      return array
    }
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let graph = Program.Node(name: "A")
      graph.addChild(name: "B").addChild(name: "C").addChild(name: "D")
      graph.children[0].addChild(name: "E").addChild(name: "F")
      graph.children[2].addChild(name: "G").addChild(name: "H")
      graph.children[0].children[1].addChild(name: "I").addChild(name: "J")
      graph.children[2].children[0].addChild(name: "K")

      var arrayToReturn = [String]()
      try assertEqual(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"], graph.breadthFirstSearch(array: &arrayToReturn))
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
        graph = program.Node("A")
        graph.addChild("B").addChild("C").addChild("D")
        graph.children[0].addChild("E").addChild("F")
        graph.children[2].addChild("G").addChild("H")
        graph.children[0].children[1].addChild("I").addChild("J")
        graph.children[2].children[0].addChild("K")
        self.assertEqual(graph.breadthFirstSearch([]), ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"])

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Node:
    def __init__(self, name):
        self.name = name
        self.children = []

    def addChild(self, name):
        self.children.append(Node(name))
        return self

    # O(v + e) time | O(v) space
    def breadthFirstSearch(self, array):
        queue = [self]
        while len(queue) > 0:
            current = queue.pop(0)
            array.append(current.name)
            for child in current.children:
                queue.append(child)
        return array

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        graph = program.Node("A")
        graph.addChild("B").addChild("C").addChild("D")
        graph.children[0].addChild("E").addChild("F")
        graph.children[2].addChild("G").addChild("H")
        graph.children[0].children[1].addChild("I").addChild("J")
        graph.children[2].children[0].addChild("K")
        self.assertEqual(graph.breadthFirstSearch([]), ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"])

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const graph = new program.Node('A');
  graph.addChild('B').addChild('C').addChild('D');
  graph.children[0].addChild('E').addChild('F');
  graph.children[2].addChild('G').addChild('H');
  graph.children[0].children[1].addChild('I').addChild('J');
  graph.children[2].children[0].addChild('K');
  chai.expect(graph.breadthFirstSearch([])).to.deep.equal(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

export class Node {
  name: string;
  children: Node[];

  constructor(name: string) {
    this.name = name;
    this.children = [];
  }

  addChild(name: string): Node {
    this.children.push(new Node(name));
    return this;
  }

  // O(v + e) time | O(v) space
  breadthFirstSearch(array: string[]) {
    const queue: Node[] = [this];
    while (queue.length > 0) {
      const current = queue.shift()!;
      array.push(current.name);
      for (const child of current.children) {
        queue.push(child);
      }
    }
    return array;
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const graph = new program.Node('A');
  graph.addChild('B').addChild('C').addChild('D');
  graph.children[0].addChild('E').addChild('F');
  graph.children[2].addChild('G').addChild('H');
  graph.children[0].children[1].addChild('I').addChild('J');
  graph.children[2].children[0].addChild('K');
  chai.expect(graph.breadthFirstSearch([])).to.deep.equal(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']);
});

```

