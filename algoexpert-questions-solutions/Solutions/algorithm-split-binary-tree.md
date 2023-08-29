# Split Binary Tree
<div class="html">
<p>
  Write a function that takes in a Binary Tree with at least one node and
  checks if that Binary Tree can be split into two Binary Trees of equal sum by
  removing a single edge. If this split is possible, return the new sum of each
  Binary Tree, otherwise return 0. Note that you do not need to return the edge
  that was removed.
</p>
<p>
  The sum of a Binary Tree is the sum of all values in that Binary Tree.
</p>
<p>
  Each <span>BinaryTree</span> node has an integer <span>value</span>, a
  <span>left</span> child node, and a <span>right</span> child node. Children
  nodes can either be <span>BinaryTree</span> nodes themselves or
  <span>None</span> / <span>null</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">tree</span> =     1
        /     \
       3       -2
     /   \    /  \
    6    -5  5    2
  /
 2
</pre>
<h3>Sample Output</h3>
<pre>
6 <span class="CodeEditor-promptComment">// Remove the edge to the left of the root node,
// creating two trees, each with sums of 6</span>
</pre>
</div>

Hint 1
<p>
  Try first calculating the sum of the entire Binary Tree. What information does
  this give you towards solving the problem?
</p>


Hint 2

<p>
  If the sum of the entire Binary Tree is odd, then there is no possible
  solution, because the values are all integers. Otherwise, the solution could
  be that sum divided by two, or potentially there is still no solution. What
  does the scenario look like where the solution is the sum divided by two?
</p>


Hint 3

<p>
  There is a solution if there is a subtree that has a sum equal to the the
  total Binary Tree sum divided by two. In this case, removing the incoming
  edge to that node would have to create another Binary Tree of equal sum.
</p>


Hint 4

<p>
  To prevent recalculating the same subtree sums, try using a post-order
  traversal of the Binary Tree. This allows you to calculate the sums of the
  smallest subtrees first, then send that information back up to the parents to
  quickly calculate their sums.
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
      BinaryTree *tree = new BinaryTree(2);
      tree->left = new BinaryTree(4);
      tree->left->left = new BinaryTree(4);
      tree->left->right = new BinaryTree(6);
      tree->right = new BinaryTree(10);
      tree->right->left = new BinaryTree(3);
      tree->right->right = new BinaryTree(3);
      int expected = 16;
      auto actual = splitBinaryTree(tree);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// This is an input class. Do not edit.
class BinaryTree {
public:
  int value;
  BinaryTree *left = nullptr;
  BinaryTree *right = nullptr;

  BinaryTree(int value) { this->value = value; }
};

struct ResultPair {
  int currentTreeSum;
  bool canBeSplit;
};

ResultPair trySubtrees(BinaryTree *tree, int desiredSubtreeSum);
int getTreeSum(BinaryTree *tree);

// O(n) time | O(h) space - where n is the number of nodes in the tree and
// h is the height of the tree
int splitBinaryTree(BinaryTree *tree) {
  int treeSum = getTreeSum(tree);

  if (treeSum % 2 != 0) {
    return 0;
  }

  int desiredSubtreeSum = treeSum / 2;
  bool canBeSplit = trySubtrees(tree, desiredSubtreeSum).canBeSplit;
  return canBeSplit ? desiredSubtreeSum : 0;
}

ResultPair trySubtrees(BinaryTree *tree, int desiredSubtreeSum) {
  if (tree == nullptr) {
    return ResultPair{0, false};
  }

  ResultPair leftResultPair = trySubtrees(tree->left, desiredSubtreeSum);
  ResultPair rightResultPair = trySubtrees(tree->right, desiredSubtreeSum);

  int currentTreeSum = tree->value + leftResultPair.currentTreeSum +
                       rightResultPair.currentTreeSum;
  bool canBeSplit = leftResultPair.canBeSplit || rightResultPair.canBeSplit ||
                    currentTreeSum == desiredSubtreeSum;
  return ResultPair{currentTreeSum, canBeSplit};
}

int getTreeSum(BinaryTree *tree) {
  if (tree == nullptr) {
    return 0;
  }
  return tree->value + getTreeSum(tree->left) + getTreeSum(tree->right);
}
```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      BinaryTree *tree = new BinaryTree(2);
      tree->left = new BinaryTree(4);
      tree->left->left = new BinaryTree(4);
      tree->left->right = new BinaryTree(6);
      tree->right = new BinaryTree(10);
      tree->right->left = new BinaryTree(3);
      tree->right->right = new BinaryTree(3);
      int expected = 16;
      auto actual = splitBinaryTree(tree);
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
		Program.BinaryTree tree = new Program.BinaryTree(2);
		tree.left = new Program.BinaryTree(4);
		tree.left.left = new Program.BinaryTree(4);
		tree.left.right = new Program.BinaryTree(6);
		tree.right = new Program.BinaryTree(10);
		tree.right.left = new Program.BinaryTree(3);
		tree.right.right = new Program.BinaryTree(3);
		int expected = 16;
		int actual = new Program().SplitBinaryTree(tree);
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

	// O(n) time | O(h) space - where n is the number of nodes in the tree and
	// h is the height of the tree
	public int SplitBinaryTree(BinaryTree tree) {
		int treeSum = getTreeSum(tree);

		if (treeSum % 2 != 0) {
			return 0;
		}

		int desiredSubtreeSum = treeSum / 2;
		bool canBeSplit = trySubtrees(tree, desiredSubtreeSum).canBeSplit;
		return canBeSplit == true ? desiredSubtreeSum : 0;
	}

	public class ResultPair {
		public int currentTreeSum;
		public bool canBeSplit;

		public ResultPair(int currentTreeSum, bool canBeSplit) {
			this.currentTreeSum = currentTreeSum;
			this.canBeSplit = canBeSplit;
		}
	}

	ResultPair trySubtrees(BinaryTree tree, int desiredSubtreeSum) {
		if (tree == null) {
			return new ResultPair(0, false);
		}

		ResultPair leftResultPair = trySubtrees(tree.left, desiredSubtreeSum);
		ResultPair rightResultPair = trySubtrees(tree.right, desiredSubtreeSum);

		int currentTreeSum = tree.value + leftResultPair.currentTreeSum +
		  rightResultPair.currentTreeSum;
		bool canBeSplit = leftResultPair.canBeSplit || rightResultPair.canBeSplit ||
		  currentTreeSum == desiredSubtreeSum;
		return new ResultPair(currentTreeSum, canBeSplit);
	}

	int getTreeSum(BinaryTree tree) {
		if (tree == null) {
			return 0;
		}
		return tree.value + getTreeSum(tree.left) + getTreeSum(tree.right);
	}
}


```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		Program.BinaryTree tree = new Program.BinaryTree(2);
		tree.left = new Program.BinaryTree(4);
		tree.left.left = new Program.BinaryTree(4);
		tree.left.right = new Program.BinaryTree(6);
		tree.right = new Program.BinaryTree(10);
		tree.right.left = new Program.BinaryTree(3);
		tree.right.right = new Program.BinaryTree(3);
		int expected = 16;
		int actual = new Program().SplitBinaryTree(tree);
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
	tree := &BinaryTree{Value: 2}
	tree.Left = &BinaryTree{Value: 4}
	tree.Left.Left = &BinaryTree{Value: 4}
	tree.Left.Right = &BinaryTree{Value: 6}
	tree.Right = &BinaryTree{Value: 10}
	tree.Right.Left = &BinaryTree{Value: 3}
	tree.Right.Right = &BinaryTree{Value: 3}
	expected := 16
	actual := SplitBinaryTree(tree)
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

// O(n) time | O(h) space - where n is the number of nodes in the tree and
// h is the height of the tree
func SplitBinaryTree(tree *BinaryTree) int {
	treeSum := getTreeSum(tree)
	if treeSum%2 != 0 {
		return 0
	}

	desiredSubtreeSum := treeSum / 2
	_, canBeSplit := trySubtrees(tree, desiredSubtreeSum)
	if canBeSplit {
		return desiredSubtreeSum
	}
	return 0
}

func trySubtrees(tree *BinaryTree, desiredSubtreeSum int) (int, bool) {
	if tree == nil {
		return 0, false
	}

	leftSum, leftCanBeSplit := trySubtrees(tree.Left, desiredSubtreeSum)
	rightSum, rightCanBeSplit := trySubtrees(tree.Right, desiredSubtreeSum)

	currentTreeSum := tree.Value + leftSum + rightSum
	canBeSplit := leftCanBeSplit || rightCanBeSplit || currentTreeSum == desiredSubtreeSum
	return currentTreeSum, canBeSplit
}

func getTreeSum(tree *BinaryTree) int {
	if tree == nil {
		return 0
	}
	return tree.Value + getTreeSum(tree.Left) + getTreeSum(tree.Right)
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	tree := &BinaryTree{Value: 2}
	tree.Left = &BinaryTree{Value: 4}
	tree.Left.Left = &BinaryTree{Value: 4}
	tree.Left.Right = &BinaryTree{Value: 6}
	tree.Right = &BinaryTree{Value: 10}
	tree.Right.Left = &BinaryTree{Value: 3}
	tree.Right.Right = &BinaryTree{Value: 3}
	expected := 16
	actual := SplitBinaryTree(tree)
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
    Program.BinaryTree tree = new Program.BinaryTree(2);
    tree.left = new Program.BinaryTree(4);
    tree.left.left = new Program.BinaryTree(4);
    tree.left.right = new Program.BinaryTree(6);
    tree.right = new Program.BinaryTree(10);
    tree.right.left = new Program.BinaryTree(3);
    tree.right.right = new Program.BinaryTree(3);
    int expected = 16;
    int actual = new Program().splitBinaryTree(tree);
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

  // O(n) time | O(h) space - where n is the number of nodes in the tree and
  // h is the height of the tree
  public int splitBinaryTree(BinaryTree tree) {
    int treeSum = getTreeSum(tree);

    if (treeSum % 2 != 0) {
      return 0;
    }

    int desiredSubtreeSum = treeSum / 2;
    boolean canBeSplit = trySubtrees(tree, desiredSubtreeSum).canBeSplit;
    return canBeSplit == true ? desiredSubtreeSum : 0;
  }

  static class ResultPair {
    public int currentTreeSum;
    public boolean canBeSplit;

    public ResultPair(int currentTreeSum, boolean canBeSplit) {
      this.currentTreeSum = currentTreeSum;
      this.canBeSplit = canBeSplit;
    }
  }

  ResultPair trySubtrees(BinaryTree tree, int desiredSubtreeSum) {
    if (tree == null) {
      return new ResultPair(0, false);
    }

    ResultPair leftResultPair = trySubtrees(tree.left, desiredSubtreeSum);
    ResultPair rightResultPair = trySubtrees(tree.right, desiredSubtreeSum);

    int currentTreeSum =
        tree.value + leftResultPair.currentTreeSum + rightResultPair.currentTreeSum;
    boolean canBeSplit =
        leftResultPair.canBeSplit
            || rightResultPair.canBeSplit
            || currentTreeSum == desiredSubtreeSum;
    return new ResultPair(currentTreeSum, canBeSplit);
  }

  int getTreeSum(BinaryTree tree) {
    if (tree == null) {
      return 0;
    }
    return tree.value + getTreeSum(tree.left) + getTreeSum(tree.right);
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    Program.BinaryTree tree = new Program.BinaryTree(2);
    tree.left = new Program.BinaryTree(4);
    tree.left.left = new Program.BinaryTree(4);
    tree.left.right = new Program.BinaryTree(6);
    tree.right = new Program.BinaryTree(10);
    tree.right.left = new Program.BinaryTree(3);
    tree.right.right = new Program.BinaryTree(3);
    int expected = 16;
    int actual = new Program().splitBinaryTree(tree);
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
  const tree = new program.BinaryTree(2);
  tree.left = new program.BinaryTree(4);
  tree.left.left = new program.BinaryTree(4);
  tree.left.right = new program.BinaryTree(6);
  tree.right = new program.BinaryTree(10);
  tree.right.left = new program.BinaryTree(3);
  tree.right.right = new program.BinaryTree(3);
  const expected = 16;
  const actual = program.splitBinaryTree(tree);
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

// O(n) time | O(h) space - where n is the number of nodes in the tree and
// h is the height of the tree
function splitBinaryTree(tree) {
  const desiredSubtreeSum = getTreeSum(tree) / 2;
  const canBeSplit = trySubtrees(tree, desiredSubtreeSum)[1];
  return canBeSplit ? desiredSubtreeSum : 0;
}

function trySubtrees(tree, desiredSubtreeSum) {
  if (tree === null) return [0, false];

  const [leftSum, leftCanBeSplit] = trySubtrees(tree.left, desiredSubtreeSum);
  const [rightSum, rightCanBeSplit] = trySubtrees(tree.right, desiredSubtreeSum);

  const currentTreeSum = tree.value + leftSum + rightSum;
  const canBeSplit = leftCanBeSplit || rightCanBeSplit || currentTreeSum === desiredSubtreeSum;
  return [currentTreeSum, canBeSplit];
}

function getTreeSum(tree) {
  if (tree === null) return 0;
  return tree.value + getTreeSum(tree.left) + getTreeSum(tree.right);
}

// Do not edit the lines below.
exports.BinaryTree = BinaryTree;
exports.splitBinaryTree = splitBinaryTree;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const tree = new program.BinaryTree(2);
  tree.left = new program.BinaryTree(4);
  tree.left.left = new program.BinaryTree(4);
  tree.left.right = new program.BinaryTree(6);
  tree.right = new program.BinaryTree(10);
  tree.right.left = new program.BinaryTree(3);
  tree.right.right = new program.BinaryTree(3);
  const expected = 16;
  const actual = program.splitBinaryTree(tree);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.splitBinaryTree
import com.algoexpert.program.BinaryTree as BinaryTree

class ProgramTest {
    @Test
    fun TestCase1() {
        val tree = BinaryTree(2)
        tree.left = BinaryTree(4)
        tree.left!!.left = BinaryTree(4)
        tree.left!!.right = BinaryTree(6)
        tree.right = BinaryTree(10)
        tree.right!!.left = BinaryTree(3)
        tree.right!!.right = BinaryTree(3)
        val expected = 16
        val output = splitBinaryTree(tree)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// This is an input class. Do not edit.
open class BinaryTree(value: Int) {
    var value = value
    var left: BinaryTree? = null
    var right: BinaryTree? = null
}

// O(n) time | O(h) space - where n is the number of nodes in the tree and
// h is the height of the tree
fun splitBinaryTree(tree: BinaryTree): Int {
    val desiredSubtreeSum = getTreeSum(tree).toDouble() / 2
    val canBeSplit = trySubtrees(tree, desiredSubtreeSum).second
    return if (canBeSplit) desiredSubtreeSum.toInt() else 0
}

fun trySubtrees(tree: BinaryTree?, desiredSubtreeSum: Double): Pair<Int, Boolean> {
    if (tree == null) return Pair(0, false)

    val (leftSum, leftCanBeSplit) = trySubtrees(tree.left, desiredSubtreeSum)
    val (rightSum, rightCanBeSplit) = trySubtrees(tree.right, desiredSubtreeSum)

    val currentTreeSum = tree.value + leftSum + rightSum
    val canBeSplit = leftCanBeSplit || rightCanBeSplit || currentTreeSum.toDouble() == desiredSubtreeSum
    return Pair(currentTreeSum, canBeSplit)
}

fun getTreeSum(tree: BinaryTree?): Int {
    if (tree == null) return 0
    return tree.value + getTreeSum(tree.left) + getTreeSum(tree.right)
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.splitBinaryTree
import com.algoexpert.program.BinaryTree as BinaryTree

class ProgramTest {
    @Test
    fun TestCase1() {
        val tree = BinaryTree(2)
        tree.left = BinaryTree(4)
        tree.left!!.left = BinaryTree(4)
        tree.left!!.right = BinaryTree(6)
        tree.right = BinaryTree(10)
        tree.right!!.left = BinaryTree(3)
        tree.right!!.right = BinaryTree(3)
        val expected = 16
        val output = splitBinaryTree(tree)
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
      var tree = Program.BinaryTree(value: 2)
      tree.left = Program.BinaryTree(value: 4)
      tree.left!.left = Program.BinaryTree(value: 4)
      tree.left!.right = Program.BinaryTree(value: 6)
      tree.right = Program.BinaryTree(value: 10)
      tree.right!.left = Program.BinaryTree(value: 3)
      tree.right!.right = Program.BinaryTree(value: 3)
      var expected = 16
      var actual = Program().splitBinaryTree(tree)
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

  // O(n) time | O(h) space - where n is the number of nodes in the tree and
  // h is the height of the tree
  func splitBinaryTree(_ tree: BinaryTree) -> Int {
    let treeSum = getTreeSum(tree)
    if treeSum % 2 != 0 {
      return 0
    }

    let desiredSubtreeSum = treeSum / 2
    let (_, canBeSplit) = trySubtrees(tree, desiredSubtreeSum)
    if canBeSplit {
      return desiredSubtreeSum
    }
    return 0
  }

  func trySubtrees(_ tree: BinaryTree?, _ desiredSubtreeSum: Int) -> (Int, Bool) {
    if tree == nil {
      return (0, false)
    }

    let (leftSum, leftCanBeSplit) = trySubtrees(tree!.left, desiredSubtreeSum)
    let (rightSum, rightCanBeSplit) = trySubtrees(tree!.right, desiredSubtreeSum)

    let currentTreeSum = tree!.value + leftSum + rightSum
    let canBeSplit = leftCanBeSplit || rightCanBeSplit || currentTreeSum == desiredSubtreeSum
    return (currentTreeSum, canBeSplit)
  }

  func getTreeSum(_ tree: BinaryTree?) -> Int {
    if tree == nil {
      return 0
    }
    return tree!.value + getTreeSum(tree!.left) + getTreeSum(tree!.right)
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws in
      var tree = Program.BinaryTree(value: 2)
      tree.left = Program.BinaryTree(value: 4)
      tree.left!.left = Program.BinaryTree(value: 4)
      tree.left!.right = Program.BinaryTree(value: 6)
      tree.right = Program.BinaryTree(value: 10)
      tree.right!.left = Program.BinaryTree(value: 3)
      tree.right!.right = Program.BinaryTree(value: 3)
      var expected = 16
      var actual = Program().splitBinaryTree(tree)
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
        tree = program.BinaryTree(2)
        tree.left = program.BinaryTree(4)
        tree.left.left = program.BinaryTree(4)
        tree.left.right = program.BinaryTree(6)
        tree.right = program.BinaryTree(10)
        tree.right.left = program.BinaryTree(3)
        tree.right.right = program.BinaryTree(3)
        expected = 16
        actual = program.splitBinaryTree(tree)
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


# O(n) time | O(h) space - where n is the number of nodes in the tree and
# h is the height of the tree
def splitBinaryTree(tree):
    desiredSubtreeSum = getTreeSum(tree) / 2
    canBeSplit = trySubtrees(tree, desiredSubtreeSum)[1]
    return desiredSubtreeSum if canBeSplit else 0


def trySubtrees(tree, desiredSubtreeSum):
    if tree is None:
        return (0, False)

    leftSum, leftCanBeSplit = trySubtrees(tree.left, desiredSubtreeSum)
    rightSum, rightCanBeSplit = trySubtrees(tree.right, desiredSubtreeSum)

    currentTreeSum = tree.value + leftSum + rightSum
    canBeSplit = leftCanBeSplit or rightCanBeSplit or currentTreeSum == desiredSubtreeSum
    return (currentTreeSum, canBeSplit)


def getTreeSum(tree):
    if tree is None:
        return 0
    return tree.value + getTreeSum(tree.left) + getTreeSum(tree.right)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        tree = program.BinaryTree(2)
        tree.left = program.BinaryTree(4)
        tree.left.left = program.BinaryTree(4)
        tree.left.right = program.BinaryTree(6)
        tree.right = program.BinaryTree(10)
        tree.right.left = program.BinaryTree(3)
        tree.right.right = program.BinaryTree(3)
        expected = 16
        actual = program.splitBinaryTree(tree)
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
  const tree = new program.BinaryTree(2);
  tree.left = new program.BinaryTree(4);
  tree.left.left = new program.BinaryTree(4);
  tree.left.right = new program.BinaryTree(6);
  tree.right = new program.BinaryTree(10);
  tree.right.left = new program.BinaryTree(3);
  tree.right.right = new program.BinaryTree(3);
  const expected = 16;
  const actual = program.splitBinaryTree(tree);
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

// O(n) time | O(h) space - where n is the number of nodes in the tree and
// h is the height of the tree
export function splitBinaryTree(tree: BinaryTree) {
  const desiredSubtreeSum = getTreeSum(tree) / 2;
  const canBeSplit = trySubtrees(tree, desiredSubtreeSum)[1];
  return canBeSplit ? desiredSubtreeSum : 0;
}

function trySubtrees(tree: BinaryTree | null, desiredSubtreeSum: number): [number, boolean] {
  if (tree === null) return [0, false];

  const [leftSum, leftCanBeSplit] = trySubtrees(tree.left, desiredSubtreeSum);
  const [rightSum, rightCanBeSplit] = trySubtrees(tree.right, desiredSubtreeSum);

  const currentTreeSum = tree.value + leftSum + rightSum;
  const canBeSplit = leftCanBeSplit || rightCanBeSplit || currentTreeSum === desiredSubtreeSum;
  return [currentTreeSum, canBeSplit];
}

function getTreeSum(tree: BinaryTree | null): number {
  if (tree === null) return 0;
  return tree.value + getTreeSum(tree.left) + getTreeSum(tree.right);
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const tree = new program.BinaryTree(2);
  tree.left = new program.BinaryTree(4);
  tree.left.left = new program.BinaryTree(4);
  tree.left.right = new program.BinaryTree(6);
  tree.right = new program.BinaryTree(10);
  tree.right.left = new program.BinaryTree(3);
  tree.right.right = new program.BinaryTree(3);
  const expected = 16;
  const actual = program.splitBinaryTree(tree);
  chai.expect(actual).to.deep.equal(expected);
});

```

