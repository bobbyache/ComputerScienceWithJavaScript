# Node Depths
<div class="html">
<p>
  The distance between a node in a Binary Tree and the tree's root is called the
  node's depth.
</p>
<p>
  Write a function that takes in a Binary Tree and returns the sum of its nodes'
  depths.
</p>
<p>
  Each <span>BinaryTree</span> node has an integer <span>value</span>, a
  <span>left</span> child node, and a <span>right</span> child node. Children
  nodes can either be <span>BinaryTree</span> nodes themselves or
  <span>None</span> / <span>null</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">tree</span> =    1
       /     \
      2       3
    /   \   /   \
   4     5 6     7
 /   \
8     9
</pre>
<h3>Sample Output</h3>
<pre>
16
<span class="CodeEditor-promptComment">// The depth of the node with value 2 is 1.</span>
<span class="CodeEditor-promptComment">// The depth of the node with value 3 is 1.</span>
<span class="CodeEditor-promptComment">// The depth of the node with value 4 is 2.</span>
<span class="CodeEditor-promptComment">// The depth of the node with value 5 is 2.</span>
<span class="CodeEditor-promptComment">// Etc..</span>
<span class="CodeEditor-promptComment">// Summing all of these depths yields 16.</span>
</pre>
</div>

Hint 1
<p>
As obvious as it may seem, to solve this question, you'll have to figure out how to compute the depth of any given node; once you know how to do that, you can compute all of the depths and add them up to obtain the desired output.
</p>


Hint 2

<p>
To compute the depth of a given node, you need information about its position in the tree. Can you pass this information down from the node's parent?
</p>


Hint 3

<p>
The depth of any node in the tree is equal to the depth of its parent node plus 1. By starting at the root node whose depth is 0, you can pass down to every node in the tree its respective depth, and you can implement the algorithm that does this and that sums up all of the depths either recursively or iteratively.
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
      BinaryTree *root = new BinaryTree(1);
      root->left = new BinaryTree(2);
      root->left->left = new BinaryTree(4);
      root->left->left->left = new BinaryTree(8);
      root->left->left->right = new BinaryTree(9);
      root->left->right = new BinaryTree(5);
      root->right = new BinaryTree(3);
      root->right->left = new BinaryTree(6);
      root->right->right = new BinaryTree(7);
      int actual = nodeDepths(root);
      assert(actual == 16);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

class BinaryTree {
public:
  int value;
  BinaryTree *left;
  BinaryTree *right;

  BinaryTree(int value) {
    this->value = value;
    left = nullptr;
    right = nullptr;
  }
};

struct Level {
  BinaryTree *root;
  int depth;
};

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
int nodeDepths(BinaryTree *root) {
  int sumOfDepths = 0;
  vector<Level> stack = {{root, 0}};
  while (stack.size() > 0) {
    BinaryTree *node = stack.back().root;
    int depth = stack.back().depth;
    stack.pop_back();
    if (node == nullptr)
      continue;
    sumOfDepths += depth;
    stack.push_back(Level{node->left, depth + 1});
    stack.push_back(Level{node->right, depth + 1});
  }
  return sumOfDepths;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

class BinaryTree {
public:
  int value;
  BinaryTree *left;
  BinaryTree *right;

  BinaryTree(int value) {
    this->value = value;
    left = nullptr;
    right = nullptr;
  }
};

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
int nodeDepths(BinaryTree *root, int depth = 0) {
  if (root == nullptr)
    return 0;
  return depth + nodeDepths(root->left, depth + 1) +
         nodeDepths(root->right, depth + 1);
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      BinaryTree *root = new BinaryTree(1);
      root->left = new BinaryTree(2);
      root->left->left = new BinaryTree(4);
      root->left->left->left = new BinaryTree(8);
      root->left->left->right = new BinaryTree(9);
      root->left->right = new BinaryTree(5);
      root->right = new BinaryTree(3);
      root->right->left = new BinaryTree(6);
      root->right->right = new BinaryTree(7);
      int actual = nodeDepths(root);
      assert(actual == 16);
    });
  }
};

```
### Sandbox Code (csharp)
```csharp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

public class ProgramTest {
	[Test]
	public void TestCase1() {
		var root = new Program.BinaryTree(1);
		root.left = new Program.BinaryTree(2);
		root.left.left = new Program.BinaryTree(4);
		root.left.left.left = new Program.BinaryTree(8);
		root.left.left.right = new Program.BinaryTree(9);
		root.left.right = new Program.BinaryTree(5);
		root.right = new Program.BinaryTree(3);
		root.right.left = new Program.BinaryTree(6);
		root.right.right = new Program.BinaryTree(7);
		int actual = Program.NodeDepths(root);
		Utils.AssertEquals(16, actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// Average case: when the tree is balanced
	// O(n) time | O(h) space - where n is the number of nodes in
	// the Binary Tree and h is the height of the Binary Tree
	public static int NodeDepths(BinaryTree root) {
		int sumOfDepths = 0;
		Stack<Level> stack = new Stack<Level>();
		stack.Push(new Level(root, 0));
		while (stack.Count > 0) {
			Level top = stack.Pop();

			BinaryTree node = top.root;
			int depth = top.depth;
			if (node == null) continue;

			sumOfDepths += depth;
			stack.Push(new Level(node.left, depth + 1));
			stack.Push(new Level(node.right, depth + 1));
		}
		return sumOfDepths;
	}

	public class Level {
		public BinaryTree root;
		public int depth;

		public Level(BinaryTree root, int depth) {
			this.root = root;
			this.depth = depth;
		}
	}

	public class BinaryTree {
		public int value;
		public BinaryTree left;
		public BinaryTree right;

		public BinaryTree(int value) {
			this.value = value;
			left = null;
			right = null;
		}
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// Average case: when the tree is balanced
	// O(n) time | O(h) space - where n is the number of nodes in
	// the Binary Tree and h is the height of the Binary Tree
	public static int NodeDepths(BinaryTree root) {
		return nodeDepthsHelper(root, 0);
	}

	public static int nodeDepthsHelper(BinaryTree root, int depth) {
		if (root == null) return 0;
		return depth + nodeDepthsHelper(root.left, depth + 1) + nodeDepthsHelper(root.right,
		         depth + 1);
	}

	public class BinaryTree {
		public int value;
		public BinaryTree left;
		public BinaryTree right;

		public BinaryTree(int value) {
			this.value = value;
			left = null;
			right = null;
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		var root = new Program.BinaryTree(1);
		root.left = new Program.BinaryTree(2);
		root.left.left = new Program.BinaryTree(4);
		root.left.left.left = new Program.BinaryTree(8);
		root.left.left.right = new Program.BinaryTree(9);
		root.left.right = new Program.BinaryTree(5);
		root.right = new Program.BinaryTree(3);
		root.right.left = new Program.BinaryTree(6);
		root.right.right = new Program.BinaryTree(7);
		int actual = Program.NodeDepths(root);
		Utils.AssertEquals(16, actual);
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
	root := &BinaryTree{Value: 1}
	root.Left = &BinaryTree{Value: 2}
	root.Left.Left = &BinaryTree{Value: 4}
	root.Left.Left.Left = &BinaryTree{Value: 8}
	root.Left.Left.Right = &BinaryTree{Value: 9}
	root.Left.Right = &BinaryTree{Value: 5}
	root.Right = &BinaryTree{Value: 3}
	root.Right.Left = &BinaryTree{Value: 6}
	root.Right.Right = &BinaryTree{Value: 7}
	actual := NodeDepths(root)
	require.Equal(t, 16, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type BinaryTree struct {
	Value       int
	Left, Right *BinaryTree
}

type Level struct {
	Root  *BinaryTree
	Depth int
}

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
func NodeDepths(root *BinaryTree) int {
	sumOfDepths := 0
	stack := []Level{{Root: root, Depth: 0}}
	var top Level
	for len(stack) > 0 {
		top, stack = stack[len(stack)-1], stack[:len(stack)-1]
		node, depth := top.Root, top.Depth
		if node == nil {
			continue
		}
		sumOfDepths += depth
		stack = append(stack, Level{Root: node.Left, Depth: depth + 1})
		stack = append(stack, Level{Root: node.Right, Depth: depth + 1})
	}
	return sumOfDepths
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type BinaryTree struct {
	Value       int
	Left, Right *BinaryTree
}

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
func NodeDepths(root *BinaryTree) int {
	return nodeDepthsHelper(root, 0)
}

func nodeDepthsHelper(root *BinaryTree, depth int) int {
	if root == nil {
		return 0
	}
	return depth + nodeDepthsHelper(root.Left, depth+1) + nodeDepthsHelper(root.Right, depth+1)
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	root := &BinaryTree{Value: 1}
	root.Left = &BinaryTree{Value: 2}
	root.Left.Left = &BinaryTree{Value: 4}
	root.Left.Left.Left = &BinaryTree{Value: 8}
	root.Left.Left.Right = &BinaryTree{Value: 9}
	root.Left.Right = &BinaryTree{Value: 5}
	root.Right = &BinaryTree{Value: 3}
	root.Right.Left = &BinaryTree{Value: 6}
	root.Right.Right = &BinaryTree{Value: 7}
	actual := NodeDepths(root)
	require.Equal(t, 16, actual)
}

```
### Sandbox Code (java)
```java
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

class ProgramTest {
  @Test
  public void TestCase1() {
    var root = new Program.BinaryTree(1);
    root.left = new Program.BinaryTree(2);
    root.left.left = new Program.BinaryTree(4);
    root.left.left.left = new Program.BinaryTree(8);
    root.left.left.right = new Program.BinaryTree(9);
    root.left.right = new Program.BinaryTree(5);
    root.right = new Program.BinaryTree(3);
    root.right.left = new Program.BinaryTree(6);
    root.right.right = new Program.BinaryTree(7);
    int actual = Program.nodeDepths(root);
    Utils.assertEquals(16, actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // Average case: when the tree is balanced
  // O(n) time | O(h) space - where n is the number of nodes in
  // the Binary Tree and h is the height of the Binary Tree
  public static int nodeDepths(BinaryTree root) {
    int sumOfDepths = 0;
    List<Level> stack = new ArrayList<Level>();
    stack.add(new Level(root, 0));
    while (stack.size() > 0) {
      Level top = stack.remove(stack.size() - 1);
      BinaryTree node = top.root;
      int depth = top.depth;
      if (node == null) continue;
      sumOfDepths += depth;
      stack.add(new Level(node.left, depth + 1));
      stack.add(new Level(node.right, depth + 1));
    }
    return sumOfDepths;
  }

  static class Level {
    public BinaryTree root;
    int depth;

    public Level(BinaryTree root, int depth) {
      this.root = root;
      this.depth = depth;
    }
  }

  static class BinaryTree {
    int value;
    BinaryTree left;
    BinaryTree right;

    public BinaryTree(int value) {
      this.value = value;
      left = null;
      right = null;
    }
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // Average case: when the tree is balanced
  // O(n) time | O(h) space - where n is the number of nodes in
  // the Binary Tree and h is the height of the Binary Tree
  public static int nodeDepths(BinaryTree root) {
    return nodeDepthsHelper(root, 0);
  }

  public static int nodeDepthsHelper(BinaryTree root, int depth) {
    if (root == null) return 0;
    return depth + nodeDepthsHelper(root.left, depth + 1) + nodeDepthsHelper(root.right, depth + 1);
  }

  static class BinaryTree {
    int value;
    BinaryTree left;
    BinaryTree right;

    public BinaryTree(int value) {
      this.value = value;
      left = null;
      right = null;
    }
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    var root = new Program.BinaryTree(1);
    root.left = new Program.BinaryTree(2);
    root.left.left = new Program.BinaryTree(4);
    root.left.left.left = new Program.BinaryTree(8);
    root.left.left.right = new Program.BinaryTree(9);
    root.left.right = new Program.BinaryTree(5);
    root.right = new Program.BinaryTree(3);
    root.right.left = new Program.BinaryTree(6);
    root.right.right = new Program.BinaryTree(7);
    int actual = Program.nodeDepths(root);
    Utils.assertEquals(16, actual);
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

class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

it('Test Case #1', function () {
  const root = new BinaryTree(1);
  root.left = new BinaryTree(2);
  root.left.left = new BinaryTree(4);
  root.left.left.left = new BinaryTree(8);
  root.left.left.right = new BinaryTree(9);
  root.left.right = new BinaryTree(5);
  root.right = new BinaryTree(3);
  root.right.left = new BinaryTree(6);
  root.right.right = new BinaryTree(7);
  const actual = program.nodeDepths(root);
  chai.expect(actual).to.deep.equal(16);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
function nodeDepths(root) {
  let sumOfDepths = 0;
  const stack = [{node: root, depth: 0}];
  while (stack.length > 0) {
    const {node, depth} = stack.pop();
    if (node === null) continue;
    sumOfDepths += depth;
    stack.push({node: node.left, depth: depth + 1});
    stack.push({node: node.right, depth: depth + 1});
  }
  return sumOfDepths;
}

// This is the class of the input binary tree.
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

exports.nodeDepths = nodeDepths;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
function nodeDepths(root, depth = 0) {
  if (root === null) return 0;
  return depth + nodeDepths(root.left, depth + 1) + nodeDepths(root.right, depth + 1);
}

// This is the class of the input binary tree.
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

exports.nodeDepths = nodeDepths;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

it('Test Case #1', function () {
  const root = new BinaryTree(1);
  root.left = new BinaryTree(2);
  root.left.left = new BinaryTree(4);
  root.left.left.left = new BinaryTree(8);
  root.left.left.right = new BinaryTree(9);
  root.left.right = new BinaryTree(5);
  root.right = new BinaryTree(3);
  root.right.left = new BinaryTree(6);
  root.right.right = new BinaryTree(7);
  const actual = program.nodeDepths(root);
  chai.expect(actual).to.deep.equal(16);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.BinaryTree as BinaryTree
import com.algoexpert.program.nodeDepths as nodeDepths

class ProgramTest {
    @Test
    fun TestCase1() {
        val tree = BinaryTree(1)
        tree.left = BinaryTree(2)
        tree.right = BinaryTree(3)
        tree.left!!.left = BinaryTree(4)
        tree.left!!.right = BinaryTree(5)
        tree.right!!.left = BinaryTree(6)
        tree.right!!.right = BinaryTree(7)
        tree.left!!.left!!.left = BinaryTree(8)
        tree.left!!.left!!.right = BinaryTree(9)

        val result = nodeDepths(tree)

        assert(result == 16)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import java.util.Stack

open class BinaryTree(value: Int) {
    var value = value
    var left: BinaryTree? = null
    var right: BinaryTree? = null
}

open class Level(root: BinaryTree?, depth: Int) {
    val root = root
    val depth = depth
}

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
fun nodeDepths(root: BinaryTree): Int {
    var sumOfDepths = 0
    val stack = Stack<Level>()
    stack.add(Level(root, 0))
    while (stack.size > 0) {
        val top = stack.pop()
        val node = top.root
        val depth = top.depth
        if (node == null) continue
        sumOfDepths += depth
        stack.add(Level(node.left, depth + 1))
        stack.add(Level(node.right, depth + 1))
    }
    return sumOfDepths
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

open class BinaryTree(value: Int) {
    var value = value
    var left: BinaryTree? = null
    var right: BinaryTree? = null
}

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
fun nodeDepths(root: BinaryTree?, depth: Int = 0): Int {
    if (root == null) return 0
    return depth + nodeDepths(root.left, depth + 1) + nodeDepths(root.right, depth + 1)
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.BinaryTree as BinaryTree
import com.algoexpert.program.nodeDepths as nodeDepths

class ProgramTest {
    @Test
    fun TestCase1() {
        val tree = BinaryTree(1)
        tree.left = BinaryTree(2)
        tree.right = BinaryTree(3)
        tree.left!!.left = BinaryTree(4)
        tree.left!!.right = BinaryTree(5)
        tree.right!!.left = BinaryTree(6)
        tree.right!!.right = BinaryTree(7)
        tree.left!!.left!!.left = BinaryTree(8)
        tree.left!!.left!!.right = BinaryTree(9)

        val result = nodeDepths(tree)

        assert(result == 16)
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
      var root = Program.BinaryTree(value: 1)
      root.left = Program.BinaryTree(value: 2)
      root.left!.left = Program.BinaryTree(value: 4)
      root.left!.left!.left = Program.BinaryTree(value: 8)
      root.left!.left!.right = Program.BinaryTree(value: 9)
      root.left!.right = Program.BinaryTree(value: 5)
      root.right = Program.BinaryTree(value: 3)
      root.right!.left = Program.BinaryTree(value: 6)
      root.right!.right = Program.BinaryTree(value: 7)
      let actual = Program.nodeDepths(root)
      try assert(actual == 16)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  class BinaryTree {
    var value: Int
    var left: BinaryTree?
    var right: BinaryTree?

    init(value: Int) {
      self.value = value
    }
  }

  struct Level {
    var root: BinaryTree?
    var depth: Int
  }

  // Average case: when the tree is balanced
  // O(n) time | O(h) space - where n is the number of nodes in
  // the Binary Tree and h is the height of the Binary Tree
  static func nodeDepths(_ root: BinaryTree?) -> Int {
    var sumOfDepths = 0
    var stack: [Level] = [Level(root: root, depth: 0)]
    while stack.count > 0 {
      var top = stack[stack.count - 1]
      stack.removeLast()

      var depth = top.depth
      if let node = top.root {
        sumOfDepths += depth
        stack.append(Level(root: node.left, depth: depth + 1))
        stack.append(Level(root: node.right, depth: depth + 1))
      }
    }
    return sumOfDepths
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  class BinaryTree {
    var value: Int
    var left: BinaryTree?
    var right: BinaryTree?

    init(value: Int) {
      self.value = value
    }
  }

  // Average case: when the tree is balanced
  // O(n) time | O(h) space - where n is the number of nodes in
  // the Binary Tree and h is the height of the Binary Tree
  static func nodeDepths(_ root: BinaryTree?, _ depth: Int = 0) -> Int {
    if let tree = root {
      return depth + nodeDepths(tree.left, depth + 1) + nodeDepths(tree.right, depth + 1)
    }
    return 0
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      var root = Program.BinaryTree(value: 1)
      root.left = Program.BinaryTree(value: 2)
      root.left!.left = Program.BinaryTree(value: 4)
      root.left!.left!.left = Program.BinaryTree(value: 8)
      root.left!.left!.right = Program.BinaryTree(value: 9)
      root.left!.right = Program.BinaryTree(value: 5)
      root.right = Program.BinaryTree(value: 3)
      root.right!.left = Program.BinaryTree(value: 6)
      root.right!.right = Program.BinaryTree(value: 7)
      let actual = Program.nodeDepths(root)
      try assert(actual == 16)
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
        root = program.BinaryTree(1)
        root.left = program.BinaryTree(2)
        root.left.left = program.BinaryTree(4)
        root.left.left.left = program.BinaryTree(8)
        root.left.left.right = program.BinaryTree(9)
        root.left.right = program.BinaryTree(5)
        root.right = program.BinaryTree(3)
        root.right.left = program.BinaryTree(6)
        root.right.right = program.BinaryTree(7)
        actual = program.nodeDepths(root)
        self.assertEqual(actual, 16)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Average case: when the tree is balanced
# O(n) time | O(h) space - where n is the number of nodes in
# the Binary Tree and h is the height of the Binary Tree
def nodeDepths(root):
    sumOfDepths = 0
    stack = [{"node": root, "depth": 0}]
    while len(stack) > 0:
        nodeInfo = stack.pop()
        node, depth = nodeInfo["node"], nodeInfo["depth"]
        if node is None:
            continue
        sumOfDepths += depth
        stack.append({"node": node.left, "depth": depth + 1})
        stack.append({"node": node.right, "depth": depth + 1})
    return sumOfDepths


# This is the class of the input binary tree.
class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Average case: when the tree is balanced
# O(n) time | O(h) space - where n is the number of nodes in
# the Binary Tree and h is the height of the Binary Tree
def nodeDepths(root, depth=0):
    if root is None:
        return 0
    return depth + nodeDepths(root.left, depth + 1) + nodeDepths(root.right, depth + 1)


# This is the class of the input binary tree.
class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        root = program.BinaryTree(1)
        root.left = program.BinaryTree(2)
        root.left.left = program.BinaryTree(4)
        root.left.left.left = program.BinaryTree(8)
        root.left.left.right = program.BinaryTree(9)
        root.left.right = program.BinaryTree(5)
        root.right = program.BinaryTree(3)
        root.right.left = program.BinaryTree(6)
        root.right.right = program.BinaryTree(7)
        actual = program.nodeDepths(root)
        self.assertEqual(actual, 16)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

class BinaryTree {
  value: number;
  left: BinaryTree | null;
  right: BinaryTree | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

it('Test Case #1', function () {
  const root = new BinaryTree(1);
  root.left = new BinaryTree(2);
  root.left.left = new BinaryTree(4);
  root.left.left.left = new BinaryTree(8);
  root.left.left.right = new BinaryTree(9);
  root.left.right = new BinaryTree(5);
  root.right = new BinaryTree(3);
  root.right.left = new BinaryTree(6);
  root.right.right = new BinaryTree(7);
  const actual = program.nodeDepths(root);
  chai.expect(actual).to.deep.equal(16);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
export function nodeDepths(root: BinaryTree) {
  let sumOfDepths = 0;
  const stack: {node: BinaryTree | null; depth: number}[] = [{node: root, depth: 0}];
  while (stack.length > 0) {
    const {node, depth} = stack.pop()!;
    if (node === null) continue;
    sumOfDepths += depth;
    stack.push({node: node.left, depth: depth + 1});
    stack.push({node: node.right, depth: depth + 1});
  }
  return sumOfDepths;
}

// This is the class of the input binary tree.
class BinaryTree {
  value: number;
  left: BinaryTree | null;
  right: BinaryTree | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
export function nodeDepths(root: BinaryTree | null, depth = 0): number {
  if (root === null) return 0;
  return depth + nodeDepths(root.left, depth + 1) + nodeDepths(root.right, depth + 1);
}

// This is the class of the input binary tree.
class BinaryTree {
  value: number;
  left: BinaryTree | null;
  right: BinaryTree | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

class BinaryTree {
  value: number;
  left: BinaryTree | null;
  right: BinaryTree | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

it('Test Case #1', function () {
  const root = new BinaryTree(1);
  root.left = new BinaryTree(2);
  root.left.left = new BinaryTree(4);
  root.left.left.left = new BinaryTree(8);
  root.left.left.right = new BinaryTree(9);
  root.left.right = new BinaryTree(5);
  root.right = new BinaryTree(3);
  root.right.left = new BinaryTree(6);
  root.right.right = new BinaryTree(7);
  const actual = program.nodeDepths(root);
  chai.expect(actual).to.deep.equal(16);
});

```

