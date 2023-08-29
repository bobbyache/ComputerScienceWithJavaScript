# Height Balanced Binary Tree
<div class="html">
<p>
  You're given the root node of a Binary Tree. Write a function that returns
  <span>true</span> if this Binary Tree is height balanced and
  <span>false</span> if it isn't.
</p>
<p>
  A Binary Tree is height balanced if for each node in the tree, the difference
  between the height of its left subtree and the height of its right subtree is
  at most <span>1</span>.
</p>
<p>
  Each <span>BinaryTree</span> node has an integer <span>value</span>, a
  <span>left</span> child node, and a <span>right</span> child node. Children
  nodes can either be <span>BinaryTree</span> nodes themselves or
  <span>None</span> / <span>null</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">tree</span> = 1
     /   \
    2     3
  /   \     \
 4     5     6
     /   \
    7     8
</pre>
<h3>Sample Output</h3>
<pre>
true
</pre>
</div>

Hint 1
<p>
  To solve this problem, you'll have to determine if <b>every</b> subtree in the
  Binary Tree is balanced. Which subtrees do you know will always be balanced?
</p>


Hint 2

<p>
  To determine if a subtree is balanced, you need to know the height of its left
  and right subtrees. The only exception to this is if a subtree has no left and
  right subtrees (i.e., it's just a leaf node); in that case, the subtree must
  be balanced.
</p>


Hint 3

<p>
  Recursively calculate the left and right subtree heights from each node. Once
  you know the heights of a particular node's left and right subtrees, you can
  determine if the subtree rooted at that node is balanced. If a subtree ever
  isn't balanced, you can immediately conclude that the entire tree isn't
  balanced. If you make it through the entire tree without finding any
  unbalanced subtrees, and if you determine that the heights of the main two
  subtrees aren't more than <span>1</span> apart, then the entire tree is
  balanced.
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
      auto root = new BinaryTree(1);
      root->left = new BinaryTree(2);
      root->right = new BinaryTree(3);
      root->left->left = new BinaryTree(4);
      root->left->right = new BinaryTree(5);
      root->right->right = new BinaryTree(6);
      root->left->right->left = new BinaryTree(7);
      root->left->right->right = new BinaryTree(8);
      bool expected = true;
      auto actual = heightBalancedBinaryTree(root);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <cmath>
#include <algorithm>
using namespace std;

// This is an input class. Do not edit.
class BinaryTree {
public:
  int value;
  BinaryTree *left = nullptr;
  BinaryTree *right = nullptr;

  BinaryTree(int value) { this->value = value; }
};

struct TreeInfo {
  bool isBalanced;
  int height;
};

TreeInfo getTreeInfo(BinaryTree *node);

// O(n) time | O(h) space - where n is the number of nodes in the binary tree
bool heightBalancedBinaryTree(BinaryTree *tree) {
  auto treeInfo = getTreeInfo(tree);
  return treeInfo.isBalanced;
}

TreeInfo getTreeInfo(BinaryTree *node) {
  if (node == nullptr)
    return TreeInfo{true, -1};

  auto leftSubtreeInfo = getTreeInfo(node->left);
  auto rightSubtreeInfo = getTreeInfo(node->right);

  bool isBalanced = leftSubtreeInfo.isBalanced && rightSubtreeInfo.isBalanced &&
                    abs(leftSubtreeInfo.height - rightSubtreeInfo.height) <= 1;
  int height = max(leftSubtreeInfo.height, rightSubtreeInfo.height) + 1;
  return TreeInfo{isBalanced, height};
}
```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      auto root = new BinaryTree(1);
      root->left = new BinaryTree(2);
      root->right = new BinaryTree(3);
      root->left->left = new BinaryTree(4);
      root->left->right = new BinaryTree(5);
      root->right->right = new BinaryTree(6);
      root->left->right->left = new BinaryTree(7);
      root->left->right->right = new BinaryTree(8);
      bool expected = true;
      auto actual = heightBalancedBinaryTree(root);
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
		Program.BinaryTree root = new Program.BinaryTree(1);
		root = new Program.BinaryTree(1);
		root.left = new Program.BinaryTree(2);
		root.right = new Program.BinaryTree(3);
		root.left.left = new Program.BinaryTree(4);
		root.left.right = new Program.BinaryTree(5);
		root.right.right = new Program.BinaryTree(6);
		root.left.right.left = new Program.BinaryTree(7);
		root.left.right.right = new Program.BinaryTree(8);
		bool expected = true;
		var actual = new Program().HeightBalancedBinaryTree(root);
		Utils.AssertTrue(expected == actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {
	// This is an input class. Do not edit.
	public class BinaryTree {
		public int value;
		public BinaryTree left = null;
		public BinaryTree right = null;

		public BinaryTree(int value) {
			this.value = value;
		}
	}

	public class TreeInfo {
		public bool isBalanced;
		public int height;

		public TreeInfo(bool isBalanced, int height) {
			this.isBalanced = isBalanced;
			this.height = height;
		}
	}

	// O(n) time | O(h) space - where n is the number of nodes in the binary tree
	public bool HeightBalancedBinaryTree(BinaryTree tree) {
		TreeInfo treeInfo = getTreeInfo(tree);
		return treeInfo.isBalanced;
	}

	public TreeInfo getTreeInfo(BinaryTree node) {
		if (node == null) {
			return new TreeInfo(true, -1);
		}

		TreeInfo leftSubtreeInfo = getTreeInfo(node.left);
		TreeInfo rightSubtreeInfo = getTreeInfo(node.right);

		bool isBalanced = leftSubtreeInfo.isBalanced && rightSubtreeInfo.isBalanced
		  && Math.Abs(leftSubtreeInfo.height - rightSubtreeInfo.height) <= 1;

		int height = Math.Max(leftSubtreeInfo.height, rightSubtreeInfo.height) + 1;
		return new TreeInfo(isBalanced, height);
	}

}

```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		Program.BinaryTree root = new Program.BinaryTree(1);
		root = new Program.BinaryTree(1);
		root.left = new Program.BinaryTree(2);
		root.right = new Program.BinaryTree(3);
		root.left.left = new Program.BinaryTree(4);
		root.left.right = new Program.BinaryTree(5);
		root.right.right = new Program.BinaryTree(6);
		root.left.right.left = new Program.BinaryTree(7);
		root.left.right.right = new Program.BinaryTree(8);
		bool expected = true;
		var actual = new Program().HeightBalancedBinaryTree(root);
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
	root.Left = &BinaryTree{Value: 2}
	root.Right = &BinaryTree{Value: 3}
	root.Left.Left = &BinaryTree{Value: 4}
	root.Left.Right = &BinaryTree{Value: 5}
	root.Right.Right = &BinaryTree{Value: 6}
	root.Left.Right.Left = &BinaryTree{Value: 7}
	root.Left.Right.Right = &BinaryTree{Value: 8}
	expected := true
	actual := HeightBalancedBinaryTree(root)
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

type treeInfo struct {
	isBalanced bool
	height     int
}

// O(n) time | O(h) space - where n is the number of nodes in the binary tree
func HeightBalancedBinaryTree(tree *BinaryTree) bool {
	treeInfo := getTreeInfo(tree)
	return treeInfo.isBalanced
}

func getTreeInfo(node *BinaryTree) treeInfo {
	if node == nil {
		return treeInfo{isBalanced: true, height: -1}
	}

	leftSubtreeInfo := getTreeInfo(node.Left)
	rightSubtreeInfo := getTreeInfo(node.Right)

	isBalanced := leftSubtreeInfo.isBalanced && rightSubtreeInfo.isBalanced && abs(
		leftSubtreeInfo.height-rightSubtreeInfo.height) <= 1
	height := max(leftSubtreeInfo.height, rightSubtreeInfo.height) + 1

	return treeInfo{
		isBalanced: isBalanced,
		height:     height,
	}
}

func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}

func max(a, b int) int {
	if a < b {
		return b
	}
	return a
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
	root.Right = &BinaryTree{Value: 3}
	root.Left.Left = &BinaryTree{Value: 4}
	root.Left.Right = &BinaryTree{Value: 5}
	root.Right.Right = &BinaryTree{Value: 6}
	root.Left.Right.Left = &BinaryTree{Value: 7}
	root.Left.Right.Right = &BinaryTree{Value: 8}
	expected := true
	actual := HeightBalancedBinaryTree(root)
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
    Program.BinaryTree root = new Program.BinaryTree(1);
    root = new Program.BinaryTree(1);
    root.left = new Program.BinaryTree(2);
    root.right = new Program.BinaryTree(3);
    root.left.left = new Program.BinaryTree(4);
    root.left.right = new Program.BinaryTree(5);
    root.right.right = new Program.BinaryTree(6);
    root.left.right.left = new Program.BinaryTree(7);
    root.left.right.right = new Program.BinaryTree(8);
    boolean expected = true;
    var actual = new Program().heightBalancedBinaryTree(root);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // This is an input class. Do not edit.
  static class BinaryTree {
    public int value;
    public BinaryTree left = null;
    public BinaryTree right = null;

    public BinaryTree(int value) {
      this.value = value;
    }
  }

  static class TreeInfo {
    public boolean isBalanced;
    public int height;

    public TreeInfo(boolean isBalanced, int height) {
      this.isBalanced = isBalanced;
      this.height = height;
    }
  }

  // O(n) time | O(h) space - where n is the number of nodes in the binary tree
  public boolean heightBalancedBinaryTree(BinaryTree tree) {
    TreeInfo treeInfo = getTreeInfo(tree);
    return treeInfo.isBalanced;
  }

  public TreeInfo getTreeInfo(BinaryTree node) {
    if (node == null) {
      return new TreeInfo(true, -1);
    }

    TreeInfo leftSubtreeInfo = getTreeInfo(node.left);
    TreeInfo rightSubtreeInfo = getTreeInfo(node.right);

    boolean isBalanced =
        leftSubtreeInfo.isBalanced
            && rightSubtreeInfo.isBalanced
            && Math.abs(leftSubtreeInfo.height - rightSubtreeInfo.height) <= 1;

    int height = Math.max(leftSubtreeInfo.height, rightSubtreeInfo.height) + 1;
    return new TreeInfo(isBalanced, height);
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    Program.BinaryTree root = new Program.BinaryTree(1);
    root = new Program.BinaryTree(1);
    root.left = new Program.BinaryTree(2);
    root.right = new Program.BinaryTree(3);
    root.left.left = new Program.BinaryTree(4);
    root.left.right = new Program.BinaryTree(5);
    root.right.right = new Program.BinaryTree(6);
    root.left.right.left = new Program.BinaryTree(7);
    root.left.right.right = new Program.BinaryTree(8);
    boolean expected = true;
    var actual = new Program().heightBalancedBinaryTree(root);
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

const {BinaryTree} = program;

it('Test Case #1', function () {
  const root = new BinaryTree(1);
  root.left = new BinaryTree(2);
  root.right = new BinaryTree(3);
  root.left.left = new BinaryTree(4);
  root.left.right = new BinaryTree(5);
  root.right.right = new BinaryTree(6);
  root.left.right.left = new BinaryTree(7);
  root.left.right.right = new BinaryTree(8);
  const expected = true;
  const actual = program.heightBalancedBinaryTree(root);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// This is an input class. Do not edit.
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class TreeInfo {
  constructor(isBalanced, height) {
    this.isBalanced = isBalanced;
    this.height = height;
  }
}

// O(n) time | O(h) space - where n is the number of nodes in the binary tree
function heightBalancedBinaryTree(tree) {
  const treeInfo = getTreeInfo(tree);
  return treeInfo.isBalanced;
}

function getTreeInfo(node) {
  if (node === null) return new TreeInfo(true, -1);

  const leftSubtreeInfo = getTreeInfo(node.left);
  const rightSubtreeInfo = getTreeInfo(node.right);

  const isBalanced =
    leftSubtreeInfo.isBalanced &&
    rightSubtreeInfo.isBalanced &&
    Math.abs(leftSubtreeInfo.height - rightSubtreeInfo.height) <= 1;
  const height = Math.max(leftSubtreeInfo.height, rightSubtreeInfo.height) + 1;
  return new TreeInfo(isBalanced, height);
}

// Do not edit the lines below.
exports.BinaryTree = BinaryTree;
exports.heightBalancedBinaryTree = heightBalancedBinaryTree;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

const {BinaryTree} = program;

it('Test Case #1', function () {
  const root = new BinaryTree(1);
  root.left = new BinaryTree(2);
  root.right = new BinaryTree(3);
  root.left.left = new BinaryTree(4);
  root.left.right = new BinaryTree(5);
  root.right.right = new BinaryTree(6);
  root.left.right.left = new BinaryTree(7);
  root.left.right.right = new BinaryTree(8);
  const expected = true;
  const actual = program.heightBalancedBinaryTree(root);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.BinaryTree
import com.algoexpert.program.heightBalancedBinaryTree

class ProgramTest {
    @Test
    fun TestCase1() {
        val root = BinaryTree(1)
        root.left = BinaryTree(2)
        root.right = BinaryTree(3)
        root.left!!.left = BinaryTree(4)
        root.left!!.right = BinaryTree(5)
        root.right!!.right = BinaryTree(6)
        root.left!!.right!!.left = BinaryTree(7)
        root.left!!.right!!.right = BinaryTree(8)
        val expected = true
        val output = heightBalancedBinaryTree(root)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.abs
import kotlin.math.max

// This is an input class. Do not edit.
open class BinaryTree(value: Int) {
    var value = value
    var left: BinaryTree? = null
    var right: BinaryTree? = null
}

open class TreeInfo(isBalanced: Boolean, height: Int) {
    val isBalanced = isBalanced
    val height = height
}

// O(n) time | O(h) space - where n is the number of nodes in the binary tree
fun heightBalancedBinaryTree(tree: BinaryTree): Boolean {
    val treeInfo = getTreeInfo(tree)
    return treeInfo.isBalanced
}

fun getTreeInfo(node: BinaryTree?): TreeInfo {
    if (node == null) return TreeInfo(true, -1)

    val leftSubtreeInfo = getTreeInfo(node.left)
    val rightSubtreeInfo = getTreeInfo(node.right)

    val isBalanced = leftSubtreeInfo.isBalanced && rightSubtreeInfo.isBalanced && abs(
        leftSubtreeInfo.height - rightSubtreeInfo.height
    ) <= 1
    val height = max(leftSubtreeInfo.height, rightSubtreeInfo.height) + 1
    return TreeInfo(isBalanced, height)
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.BinaryTree
import com.algoexpert.program.heightBalancedBinaryTree

class ProgramTest {
    @Test
    fun TestCase1() {
        val root = BinaryTree(1)
        root.left = BinaryTree(2)
        root.right = BinaryTree(3)
        root.left!!.left = BinaryTree(4)
        root.left!!.right = BinaryTree(5)
        root.right!!.right = BinaryTree(6)
        root.left!!.right!!.left = BinaryTree(7)
        root.left!!.right!!.right = BinaryTree(8)
        val expected = true
        val output = heightBalancedBinaryTree(root)
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
      var root = Program.BinaryTree(value: 1)
      root.left = Program.BinaryTree(value: 2)
      root.right = Program.BinaryTree(value: 3)
      root.left!.left = Program.BinaryTree(value: 4)
      root.left!.right = Program.BinaryTree(value: 5)
      root.right!.right = Program.BinaryTree(value: 6)
      root.left!.right!.left = Program.BinaryTree(value: 7)
      root.left!.right!.right = Program.BinaryTree(value: 8)
      let expected = true
      var actual = Program().heightBalancedBinaryTree(root)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // This is an input class. Do not edit.
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

  struct treeInfo {
    var isBalanced: Bool
    var height: Int
  }

  // O(n) time | O(h) space - where n is the number of nodes in the binary tree
  func heightBalancedBinaryTree(_ tree: BinaryTree) -> Bool {
    let treeInfo = getTreeInfo(tree)
    return treeInfo.isBalanced
  }

  func getTreeInfo(_ node: BinaryTree?) -> treeInfo {
    if node == nil {
      return treeInfo(isBalanced: true, height: -1)
    }

    let leftSubtreeInfo = getTreeInfo(node!.left)
    let rightSubtreeInfo = getTreeInfo(node!.right)

    let isBalanced = leftSubtreeInfo.isBalanced && rightSubtreeInfo.isBalanced && abs(
      leftSubtreeInfo.height - rightSubtreeInfo.height) <= 1
    let height = max(leftSubtreeInfo.height, rightSubtreeInfo.height) + 1

    return treeInfo(isBalanced: isBalanced, height: height)
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var root = Program.BinaryTree(value: 1)
      root.left = Program.BinaryTree(value: 2)
      root.right = Program.BinaryTree(value: 3)
      root.left!.left = Program.BinaryTree(value: 4)
      root.left!.right = Program.BinaryTree(value: 5)
      root.right!.right = Program.BinaryTree(value: 6)
      root.left!.right!.left = Program.BinaryTree(value: 7)
      root.left!.right!.right = Program.BinaryTree(value: 8)
      let expected = true
      var actual = Program().heightBalancedBinaryTree(root)
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

BinaryTree = program.BinaryTree


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        root = BinaryTree(1)
        root.left = BinaryTree(2)
        root.right = BinaryTree(3)
        root.left.left = BinaryTree(4)
        root.left.right = BinaryTree(5)
        root.right.right = BinaryTree(6)
        root.left.right.left = BinaryTree(7)
        root.left.right.right = BinaryTree(8)
        expected = True
        actual = program.heightBalancedBinaryTree(root)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# This is an input class. Do not edit.
class BinaryTree:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right


class TreeInfo:
    def __init__(self, isBalanced, height):
        self.isBalanced = isBalanced
        self.height = height


# O(n) time | O(h) space - where n is the number of nodes in the binary tree
def heightBalancedBinaryTree(tree):
    treeInfo = getTreeInfo(tree)
    return treeInfo.isBalanced


def getTreeInfo(node):
    if node is None:
        return TreeInfo(True, -1)

    leftSubtreeInfo = getTreeInfo(node.left)
    rightSubtreeInfo = getTreeInfo(node.right)

    isBalanced = (
        leftSubtreeInfo.isBalanced
        and rightSubtreeInfo.isBalanced
        and abs(leftSubtreeInfo.height - rightSubtreeInfo.height) <= 1
    )
    height = max(leftSubtreeInfo.height, rightSubtreeInfo.height) + 1
    return TreeInfo(isBalanced, height)

```
### Unit Tests 1 (python)
```python
import program
import unittest

BinaryTree = program.BinaryTree


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        root = BinaryTree(1)
        root.left = BinaryTree(2)
        root.right = BinaryTree(3)
        root.left.left = BinaryTree(4)
        root.left.right = BinaryTree(5)
        root.right.right = BinaryTree(6)
        root.left.right.left = BinaryTree(7)
        root.left.right.right = BinaryTree(8)
        expected = True
        actual = program.heightBalancedBinaryTree(root)
        self.assertEqual(actual, expected)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

const {BinaryTree} = program;

it('Test Case #1', function () {
  const root = new BinaryTree(1);
  root.left = new BinaryTree(2);
  root.right = new BinaryTree(3);
  root.left.left = new BinaryTree(4);
  root.left.right = new BinaryTree(5);
  root.right.right = new BinaryTree(6);
  root.left.right.left = new BinaryTree(7);
  root.left.right.right = new BinaryTree(8);
  const expected = true;
  const actual = program.heightBalancedBinaryTree(root);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// This is an input class. Do not edit.
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

class TreeInfo {
  isBalanced: boolean;
  height: number;

  constructor(isBalanced: boolean, height: number) {
    this.isBalanced = isBalanced;
    this.height = height;
  }
}

// O(n) time | O(h) space - where n is the number of nodes in the binary tree
export function heightBalancedBinaryTree(tree: BinaryTree) {
  const treeInfo = getTreeInfo(tree);
  return treeInfo.isBalanced;
}

function getTreeInfo(node: BinaryTree | null): TreeInfo {
  if (node === null) return new TreeInfo(true, -1);

  const leftSubtreeInfo = getTreeInfo(node.left);
  const rightSubtreeInfo = getTreeInfo(node.right);

  const isBalanced =
    leftSubtreeInfo.isBalanced &&
    rightSubtreeInfo.isBalanced &&
    Math.abs(leftSubtreeInfo.height - rightSubtreeInfo.height) <= 1;
  const height = Math.max(leftSubtreeInfo.height, rightSubtreeInfo.height) + 1;
  return new TreeInfo(isBalanced, height);
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

const {BinaryTree} = program;

it('Test Case #1', function () {
  const root = new BinaryTree(1);
  root.left = new BinaryTree(2);
  root.right = new BinaryTree(3);
  root.left.left = new BinaryTree(4);
  root.left.right = new BinaryTree(5);
  root.right.right = new BinaryTree(6);
  root.left.right.left = new BinaryTree(7);
  root.left.right.right = new BinaryTree(8);
  const expected = true;
  const actual = program.heightBalancedBinaryTree(root);
  chai.expect(actual).to.deep.equal(expected);
});

```

