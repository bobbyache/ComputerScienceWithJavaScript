# Binary Tree Diameter
<div class="html">
<p>
  Write a function that takes in a Binary Tree and returns its diameter. The
  diameter of a binary tree is defined as the length of its longest path, even
  if that path doesn't pass through the root of the tree.
</p>
<p>
  A path is a collection of connected nodes in a tree, where no node is
  connected to more than two other nodes. The length of a path is the number of
  edges between the path's first node and its last node.
</p>
<p>
  Each <span>BinaryTree</span> node has an integer <span>value</span>, a
  <span>left</span> child node, and a <span>right</span> child node. Children
  nodes can either be <span>BinaryTree</span> nodes themselves or
  <span>None</span> / <span>null</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">tree</span> =        1
            /   \
           3     2
         /   \ 
        7     4
       /       \
      8         5
     /           \
    9             6
</pre>
<h3>Sample Output</h3>
<pre>
6 <span class="CodeEditor-promptComment">// 9 -> 8 -> 7 -> 3 -> 4 -> 5 -> 6</span>
<span class="CodeEditor-promptComment">// There are 6 edges between the</span>
<span class="CodeEditor-promptComment">// first node and the last node</span>
<span class="CodeEditor-promptComment">// of this tree's longest path.</span>
</pre>
</div>

Hint 1
<p>
How can you use the height of a binary tree and the heights of its subtrees to calculate its diameter?
</p>


Hint 2

<p>
The length of the longest path that goes through the root of a binary tree is the sum of the heights of its left and right subtrees (left subtree height + right subtree height). The diameter of a binary tree can be calculated by taking the maximum of: 1) the maximum subtree diameter (max(left subtree diameter, right subtree diameter)); and 2) the length of the longest path that goes through the root (left subtree height + right subtree height).
</p>


Hint 3

<p>
Implement a variation of depth-first search that recursively keeps track of both the diameter and the height of a each subtree in the input binary tree. Follow Hint #2 to continuously compute these diameters.
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
      root->left = new BinaryTree(3);
      root->left->left = new BinaryTree(7);
      root->left->left->left = new BinaryTree(8);
      root->left->left->left->left = new BinaryTree(9);
      root->left->right = new BinaryTree(4);
      root->left->right->right = new BinaryTree(5);
      root->left->right->right->right = new BinaryTree(6);
      root->right = new BinaryTree(2);
      int expected = 6;
      int actual = binaryTreeDiameter(root);
      assert(expected == actual);
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

struct TreeInfo {
  int diameter;
  int height;
};

TreeInfo getTreeInfo(BinaryTree *tree);

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
int binaryTreeDiameter(BinaryTree *tree) { return getTreeInfo(tree).diameter; }

TreeInfo getTreeInfo(BinaryTree *tree) {
  if (tree == nullptr) {
    return TreeInfo{0, 0};
  }

  TreeInfo leftTreeInfo = getTreeInfo(tree->left);
  TreeInfo rightTreeInfo = getTreeInfo(tree->right);

  int longestPathThroughRoot = leftTreeInfo.height + rightTreeInfo.height;
  int maxDiameterSoFar = max(leftTreeInfo.diameter, rightTreeInfo.diameter);
  int currentDiameter = max(longestPathThroughRoot, maxDiameterSoFar);
  int currentHeight = 1 + max(leftTreeInfo.height, rightTreeInfo.height);

  return TreeInfo{currentDiameter, currentHeight};
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      BinaryTree *root = new BinaryTree(1);
      root->left = new BinaryTree(3);
      root->left->left = new BinaryTree(7);
      root->left->left->left = new BinaryTree(8);
      root->left->left->left->left = new BinaryTree(9);
      root->left->right = new BinaryTree(4);
      root->left->right->right = new BinaryTree(5);
      root->left->right->right->right = new BinaryTree(6);
      root->right = new BinaryTree(2);
      int expected = 6;
      int actual = binaryTreeDiameter(root);
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
		var root = new Program.BinaryTree(1);
		root.left = new Program.BinaryTree(3);
		root.left.left = new Program.BinaryTree(7);
		root.left.left.left = new Program.BinaryTree(8);
		root.left.left.left.left = new Program.BinaryTree(9);
		root.left.right = new Program.BinaryTree(4);
		root.left.right.right = new Program.BinaryTree(5);
		root.left.right.right.right = new Program.BinaryTree(6);
		root.right = new Program.BinaryTree(2);
		var expected = 6;
		var actual = new Program().BinaryTreeDiameter(root);
		Utils.AssertTrue(expected == actual);
	}
}


```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	// Average case: when the tree is balanced
	// O(n) time | O(h) space - where n is the number of nodes in
	// the Binary Tree and h is the height of the Binary Tree
	public int BinaryTreeDiameter(BinaryTree tree) {
		return getTreeInfo(tree).diameter;
	}

	public TreeInfo getTreeInfo(BinaryTree tree) {
		if (tree == null) {
			return new TreeInfo(0, 0);
		}

		TreeInfo leftTreeInfo = getTreeInfo(tree.left);
		TreeInfo rightTreeInfo = getTreeInfo(tree.right);

		int longestPathThroughRoot = leftTreeInfo.height + rightTreeInfo.height;
		int maxDiameterSoFar = Math.Max(leftTreeInfo.diameter, rightTreeInfo.diameter);
		int currentDiameter = Math.Max(longestPathThroughRoot, maxDiameterSoFar);
		int currentHeight = 1 + Math.Max(leftTreeInfo.height, rightTreeInfo.height);

		return new TreeInfo(currentDiameter, currentHeight);
	}

	public class TreeInfo {
		public int diameter;
		public int height;
		public TreeInfo(int diameter, int height) {
			this.diameter = diameter;
			this.height = height;
		}
	}

	public class BinaryTree {
		public int value;
		public BinaryTree left;
		public BinaryTree right;

		public BinaryTree(int value) {
			this.value = value;
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
		var root = new Program.BinaryTree(1);
		root.left = new Program.BinaryTree(3);
		root.left.left = new Program.BinaryTree(7);
		root.left.left.left = new Program.BinaryTree(8);
		root.left.left.left.left = new Program.BinaryTree(9);
		root.left.right = new Program.BinaryTree(4);
		root.left.right.right = new Program.BinaryTree(5);
		root.left.right.right.right = new Program.BinaryTree(6);
		root.right = new Program.BinaryTree(2);
		var expected = 6;
		var actual = new Program().BinaryTreeDiameter(root);
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
	root := &BinaryTree{Value: 1}
	root.Left = &BinaryTree{Value: 3}
	root.Left.Left = &BinaryTree{Value: 7}
	root.Left.Left.Left = &BinaryTree{Value: 8}
	root.Left.Left.Left.Left = &BinaryTree{Value: 9}
	root.Left.Right = &BinaryTree{Value: 4}
	root.Left.Right.Right = &BinaryTree{Value: 5}
	root.Left.Right.Right.Right = &BinaryTree{Value: 6}
	root.Right = &BinaryTree{Value: 2}
	expected := 6
	actual := BinaryTreeDiameter(root)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// This is an input class. Do not edit.
type BinaryTree struct {
	Value int

	Left  *BinaryTree
	Right *BinaryTree
}

type TreeInfo struct {
	diameter int
	height   int
}

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
func BinaryTreeDiameter(tree *BinaryTree) int {
	return getTreeInfo(tree).diameter
}

func getTreeInfo(tree *BinaryTree) TreeInfo {
	if tree == nil {
		return TreeInfo{0, 0}
	}

	leftTreeInfo := getTreeInfo(tree.Left)
	rightTreeInfo := getTreeInfo(tree.Right)

	longestPathThroughRoot := leftTreeInfo.height + rightTreeInfo.height
	maxDiameterSoFar := max(leftTreeInfo.diameter, rightTreeInfo.diameter)
	currentDiameter := max(longestPathThroughRoot, maxDiameterSoFar)
	currentHeight := 1 + max(leftTreeInfo.height, rightTreeInfo.height)

	return TreeInfo{currentDiameter, currentHeight}
}

func max(a, b int) int {
	if a > b {
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
	root := &BinaryTree{Value: 1}
	root.Left = &BinaryTree{Value: 3}
	root.Left.Left = &BinaryTree{Value: 7}
	root.Left.Left.Left = &BinaryTree{Value: 8}
	root.Left.Left.Left.Left = &BinaryTree{Value: 9}
	root.Left.Right = &BinaryTree{Value: 4}
	root.Left.Right.Right = &BinaryTree{Value: 5}
	root.Left.Right.Right.Right = &BinaryTree{Value: 6}
	root.Right = &BinaryTree{Value: 2}
	expected := 6
	actual := BinaryTreeDiameter(root)
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
    TestBinaryTree input = new TestBinaryTree(1);
    input.insert(new int[] {2, 3, 4, 5, 6, 7}, 0);
    var expected = 4;
    var actual = new Program().binaryTreeDiameter(input);
    Utils.assertTrue(expected == actual);
  }

  class TestBinaryTree extends Program.BinaryTree {
    public TestBinaryTree(int value) {
      super(value);
    }

    public void insert(int[] values, int i) {
      if (i >= values.length) {
        return;
      }
      ArrayDeque<Program.BinaryTree> queue = new ArrayDeque<Program.BinaryTree>();
      queue.addLast(this);
      while (queue.size() > 0) {
        Program.BinaryTree current = queue.pollFirst();
        if (current.left == null) {
          current.left = new Program.BinaryTree(values[i]);
          break;
        }
        queue.addLast(current.left);
        if (current.right == null) {
          current.right = new Program.BinaryTree(values[i]);
          break;
        }
        queue.addLast(current.right);
      }
      insert(values, i + 1);
    }
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
  public int binaryTreeDiameter(BinaryTree tree) {
    return getTreeInfo(tree).diameter;
  }

  public TreeInfo getTreeInfo(BinaryTree tree) {
    if (tree == null) {
      return new TreeInfo(0, 0);
    }

    TreeInfo leftTreeInfo = getTreeInfo(tree.left);
    TreeInfo rightTreeInfo = getTreeInfo(tree.right);

    int longestPathThroughRoot = leftTreeInfo.height + rightTreeInfo.height;
    int maxDiameterSoFar = Math.max(leftTreeInfo.diameter, rightTreeInfo.diameter);
    int currentDiameter = Math.max(longestPathThroughRoot, maxDiameterSoFar);
    int currentHeight = 1 + Math.max(leftTreeInfo.height, rightTreeInfo.height);

    return new TreeInfo(currentDiameter, currentHeight);
  }

  static class TreeInfo {
    public int diameter;
    public int height;

    public TreeInfo(int diameter, int height) {
      this.diameter = diameter;
      this.height = height;
    }
  }

  static class BinaryTree {
    public int value;
    public BinaryTree left;
    public BinaryTree right;

    public BinaryTree(int value) {
      this.value = value;
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
    TestBinaryTree input = new TestBinaryTree(1);
    input.insert(new int[] {2, 3, 4, 5, 6, 7}, 0);
    var expected = 4;
    var actual = new Program().binaryTreeDiameter(input);
    Utils.assertTrue(expected == actual);
  }

  class TestBinaryTree extends Program.BinaryTree {
    public TestBinaryTree(int value) {
      super(value);
    }

    public void insert(int[] values, int i) {
      if (i >= values.length) {
        return;
      }
      ArrayDeque<Program.BinaryTree> queue = new ArrayDeque<Program.BinaryTree>();
      queue.addLast(this);
      while (queue.size() > 0) {
        Program.BinaryTree current = queue.pollFirst();
        if (current.left == null) {
          current.left = new Program.BinaryTree(values[i]);
          break;
        }
        queue.addLast(current.left);
        if (current.right == null) {
          current.right = new Program.BinaryTree(values[i]);
          break;
        }
        queue.addLast(current.right);
      }
      insert(values, i + 1);
    }
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
  const root = new program.BinaryTree(1);
  root.left = new program.BinaryTree(3);
  root.left.left = new program.BinaryTree(7);
  root.left.left.left = new program.BinaryTree(8);
  root.left.left.left.left = new program.BinaryTree(9);
  root.left.right = new program.BinaryTree(4);
  root.left.right.right = new program.BinaryTree(5);
  root.left.right.right.right = new program.BinaryTree(6);
  root.right = new program.BinaryTree(2);
  const expected = 6;
  const actual = program.binaryTreeDiameter(root);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
function binaryTreeDiameter(tree) {
  return getTreeInfo(tree).diameter;
}

function getTreeInfo(tree) {
  if (tree === null) {
    return new TreeInfo(0, 0);
  }

  const leftTreeInfo = getTreeInfo(tree.left);
  const rightTreeInfo = getTreeInfo(tree.right);

  const longestPathThroughRoot = leftTreeInfo.height + rightTreeInfo.height;
  const maxDiameterSoFar = Math.max(leftTreeInfo.diameter, rightTreeInfo.diameter);
  const currentDiameter = Math.max(longestPathThroughRoot, maxDiameterSoFar);
  const currentHeight = 1 + Math.max(leftTreeInfo.height, rightTreeInfo.height);

  return new TreeInfo(currentDiameter, currentHeight);
}

class TreeInfo {
  constructor(diameter, height) {
    this.diameter = diameter;
    this.height = height;
  }
}

// Do not edit the line below.
exports.binaryTreeDiameter = binaryTreeDiameter;
exports.BinaryTree = BinaryTree;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const root = new program.BinaryTree(1);
  root.left = new program.BinaryTree(3);
  root.left.left = new program.BinaryTree(7);
  root.left.left.left = new program.BinaryTree(8);
  root.left.left.left.left = new program.BinaryTree(9);
  root.left.right = new program.BinaryTree(4);
  root.left.right.right = new program.BinaryTree(5);
  root.left.right.right.right = new program.BinaryTree(6);
  root.right = new program.BinaryTree(2);
  const expected = 6;
  const actual = program.binaryTreeDiameter(root);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.BinaryTree
import com.algoexpert.program.binaryTreeDiameter

class ProgramTest {
    @Test
    fun TestCase1() {
        val root = BinaryTree(1)
        root.left = BinaryTree(3)
        root.left!!.left = BinaryTree(7)
        root.left!!.left!!.left = BinaryTree(8)
        root.left!!.left!!.left!!.left = BinaryTree(9)
        root.left!!.right = BinaryTree(4)
        root.left!!.right!!.right = BinaryTree(5)
        root.left!!.right!!.right!!.right = BinaryTree(6)
        root.right = BinaryTree(2)
        val expected = 6
        var output = binaryTreeDiameter(root)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

open class BinaryTree(value: Int) {
    var value = value
    var left: BinaryTree? = null
    var right: BinaryTree? = null
}

open class TreeInfo(diameter: Int, height: Int) {
    val diameter = diameter
    val height = height
}

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
fun binaryTreeDiameter(tree: BinaryTree): Int {
    return getTreeInfo(tree).diameter
}

fun getTreeInfo(tree: BinaryTree?): TreeInfo {
    if (tree == null) return TreeInfo(0, 0)

    val leftTreeInfo = getTreeInfo(tree.left)
    val rightTreeInfo = getTreeInfo(tree.right)

    val longestPathThroughRoot = leftTreeInfo.height + rightTreeInfo.height
    val maxDiameterSoFar = max(leftTreeInfo.diameter, rightTreeInfo.diameter)
    val currentDiameter = max(longestPathThroughRoot, maxDiameterSoFar)
    val currentHeight = 1 + max(leftTreeInfo.height, rightTreeInfo.height)

    return TreeInfo(currentDiameter, currentHeight)
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.BinaryTree
import com.algoexpert.program.binaryTreeDiameter

class ProgramTest {
    @Test
    fun TestCase1() {
        val root = BinaryTree(1)
        root.left = BinaryTree(3)
        root.left!!.left = BinaryTree(7)
        root.left!!.left!!.left = BinaryTree(8)
        root.left!!.left!!.left!!.left = BinaryTree(9)
        root.left!!.right = BinaryTree(4)
        root.left!!.right!!.right = BinaryTree(5)
        root.left!!.right!!.right!!.right = BinaryTree(6)
        root.right = BinaryTree(2)
        val expected = 6
        var output = binaryTreeDiameter(root)
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
      let root = Program.BinaryTree(value: 1)
      root.left = Program.BinaryTree(value: 3)
      root.left!.left = Program.BinaryTree(value: 7)
      root.left!.left!.left = Program.BinaryTree(value: 8)
      root.left!.left!.left!.left = Program.BinaryTree(value: 9)
      root.left!.right = Program.BinaryTree(value: 4)
      root.left!.right!.right = Program.BinaryTree(value: 5)
      root.left!.right!.right!.right = Program.BinaryTree(value: 6)
      root.right = Program.BinaryTree(value: 2)
      let expected = 6
      var actual = Program().binaryTreeDiameter(root)
      try assertEqual(expected, actual)
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
      left = nil
      right = nil
    }
  }

  class TreeInfo {
    var diameter: Int
    var height: Int

    init(_ diameter: Int, _ height: Int) {
      self.diameter = diameter
      self.height = height
    }
  }

  // Average case: when the tree is balanced
  // O(n) time | O(h) space - where n is the number of nodes in
  // the Binary Tree and h is the height of the Binary Tree
  func binaryTreeDiameter(_ tree: BinaryTree) -> Int {
    return getTreeInfo(tree).diameter
  }

  func getTreeInfo(_ tree: BinaryTree?) -> TreeInfo {
    if tree == nil {
      return TreeInfo(0, 0)
    }

    let leftTreeInfo = getTreeInfo(tree!.left)
    let rightTreeInfo = getTreeInfo(tree!.right)

    let longestPathThroughRoot = leftTreeInfo.height + rightTreeInfo.height
    let maxDiameterSoFar = max(leftTreeInfo.diameter, rightTreeInfo.diameter)
    let currentDiameter = max(longestPathThroughRoot, maxDiameterSoFar)
    let currentHeight = 1 + max(leftTreeInfo.height, rightTreeInfo.height)

    return TreeInfo(currentDiameter, currentHeight)
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let root = Program.BinaryTree(value: 1)
      root.left = Program.BinaryTree(value: 3)
      root.left!.left = Program.BinaryTree(value: 7)
      root.left!.left!.left = Program.BinaryTree(value: 8)
      root.left!.left!.left!.left = Program.BinaryTree(value: 9)
      root.left!.right = Program.BinaryTree(value: 4)
      root.left!.right!.right = Program.BinaryTree(value: 5)
      root.left!.right!.right!.right = Program.BinaryTree(value: 6)
      root.right = Program.BinaryTree(value: 2)
      let expected = 6
      var actual = Program().binaryTreeDiameter(root)
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
        root = program.BinaryTree(1)
        root.left = program.BinaryTree(3)
        root.left.left = program.BinaryTree(7)
        root.left.left.left = program.BinaryTree(8)
        root.left.left.left.left = program.BinaryTree(9)
        root.left.right = program.BinaryTree(4)
        root.left.right.right = program.BinaryTree(5)
        root.left.right.right.right = program.BinaryTree(6)
        root.right = program.BinaryTree(2)
        expected = 6
        actual = program.binaryTreeDiameter(root)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class BinaryTree:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right


# Average case: when the tree is balanced
# O(n) time | O(h) space - where n is the number of nodes in
# the Binary Tree and h is the height of the Binary Tree
def binaryTreeDiameter(tree):
    return getTreeInfo(tree).diameter


def getTreeInfo(tree):
    if tree is None:
        return TreeInfo(0, 0)

    leftTreeInfo = getTreeInfo(tree.left)
    rightTreeInfo = getTreeInfo(tree.right)

    longestPathThroughRoot = leftTreeInfo.height + rightTreeInfo.height
    maxDiameterSoFar = max(leftTreeInfo.diameter, rightTreeInfo.diameter)
    currentDiameter = max(longestPathThroughRoot, maxDiameterSoFar)
    currentHeight = 1 + max(leftTreeInfo.height, rightTreeInfo.height)

    return TreeInfo(currentDiameter, currentHeight)


class TreeInfo:
    def __init__(self, diameter, height):
        self.diameter = diameter
        self.height = height

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        root = program.BinaryTree(1)
        root.left = program.BinaryTree(3)
        root.left.left = program.BinaryTree(7)
        root.left.left.left = program.BinaryTree(8)
        root.left.left.left.left = program.BinaryTree(9)
        root.left.right = program.BinaryTree(4)
        root.left.right.right = program.BinaryTree(5)
        root.left.right.right.right = program.BinaryTree(6)
        root.right = program.BinaryTree(2)
        expected = 6
        actual = program.binaryTreeDiameter(root)
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
  const root = new program.BinaryTree(1);
  root.left = new program.BinaryTree(3);
  root.left.left = new program.BinaryTree(7);
  root.left.left.left = new program.BinaryTree(8);
  root.left.left.left.left = new program.BinaryTree(9);
  root.left.right = new program.BinaryTree(4);
  root.left.right.right = new program.BinaryTree(5);
  root.left.right.right.right = new program.BinaryTree(6);
  root.right = new program.BinaryTree(2);
  const expected = 6;
  const actual = program.binaryTreeDiameter(root);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

export class BinaryTree {
  value: number;
  left: BinaryTree | null;
  right: BinaryTree | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
export function binaryTreeDiameter(tree: BinaryTree) {
  return getTreeInfo(tree).diameter;
}

function getTreeInfo(tree: BinaryTree | null): TreeInfo {
  if (tree === null) {
    return new TreeInfo(0, 0);
  }

  const leftTreeInfo = getTreeInfo(tree.left);
  const rightTreeInfo = getTreeInfo(tree.right);

  const longestPathThroughRoot = leftTreeInfo.height + rightTreeInfo.height;
  const maxDiameterSoFar = Math.max(leftTreeInfo.diameter, rightTreeInfo.diameter);
  const currentDiameter = Math.max(longestPathThroughRoot, maxDiameterSoFar);
  const currentHeight = 1 + Math.max(leftTreeInfo.height, rightTreeInfo.height);

  return new TreeInfo(currentDiameter, currentHeight);
}

class TreeInfo {
  diameter: number;
  height: number;

  constructor(diameter: number, height: number) {
    this.diameter = diameter;
    this.height = height;
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const root = new program.BinaryTree(1);
  root.left = new program.BinaryTree(3);
  root.left.left = new program.BinaryTree(7);
  root.left.left.left = new program.BinaryTree(8);
  root.left.left.left.left = new program.BinaryTree(9);
  root.left.right = new program.BinaryTree(4);
  root.left.right.right = new program.BinaryTree(5);
  root.left.right.right.right = new program.BinaryTree(6);
  root.right = new program.BinaryTree(2);
  const expected = 6;
  const actual = program.binaryTreeDiameter(root);
  chai.expect(actual).to.deep.equal(expected);
});

```

