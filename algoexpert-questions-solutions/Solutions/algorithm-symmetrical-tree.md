# Symmetrical Tree
<div class="html">
<p>
  Write a function that takes in a Binary Tree and returns if that tree is
  symmetrical. A tree is symmetrical if the left and right subtrees are
  mirror images of each other.
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
      2       2
    /   \   /   \
   3     4 4     3
 /   \          /  \
5     6        6    5
</pre>
<h3>Sample Output</h3>
<pre>True</pre>
</div>

Hint 1
<p>
  It's important to first think about what it means for a binary tree to be
  symmetrical. The left and right subtrees do not need to be the same, but
  rather they need to be mirror images of each other (i.e. the same if one
  is inverted).
</p>


Hint 2

<p>
  It can be helpful to think about this problem one step at a time. Looking at
  just the first node, how can you ensure its children are symmetrical? Then
  looking at those children, how can you make sure they are symmetrical of each
  other?
</p>


Hint 3

<p>
  This problem can be solved either recursively or iteratively. Either way, try
  traversing through the tree, uses a mirrored traversal on one side, and check
  that the values of each node are the same.
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
      BinaryTree* tree = new BinaryTree(10);
      tree->left = new BinaryTree(5);
      tree->right = new BinaryTree(5);
      tree->left->left = new BinaryTree(7);
      tree->left->right = new BinaryTree(9);
      tree->right->left = new BinaryTree(9);
      tree->right->right = new BinaryTree(7);
      auto expected = true;
      auto actual = symmetricalTree(tree);
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

// This is an input class. Do not edit.
class BinaryTree {
public:
  int value;
  BinaryTree *left = nullptr;
  BinaryTree *right = nullptr;

  BinaryTree(int value) {
    this->value = value;
  }
};

// O(n) time | O(h) space - where n is the number of nodes in the tree
// and h is the height of the tree.
bool symmetricalTree(BinaryTree* tree) {
  stack<BinaryTree *> stackLeft;
  stackLeft.push(tree->left);
  stack<BinaryTree *> stackRight;
  stackRight.push(tree->right);
  
  while (!stackLeft.empty() && !stackRight.empty()) {
    BinaryTree *left = stackLeft.top();
    stackLeft.pop();
    BinaryTree *right = stackRight.top();
    stackRight.pop();

    if (left == nullptr && right == nullptr) {
      continue;
    }

    if (left == nullptr || right == nullptr || left->value != right->value) {
      return false;
    }

    stackLeft.push(left->left);
    stackLeft.push(left->right);
    stackRight.push(right->right);
    stackRight.push(right->left);
  }

  return stackLeft.empty() && stackRight.empty();
}


```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <stack>
using namespace std;

// This is an input class. Do not edit.
class BinaryTree {
public:
  int value;
  BinaryTree *left = nullptr;
  BinaryTree *right = nullptr;

  BinaryTree(int value) {
    this->value = value;
  }
};

bool treesAreMirrored(BinaryTree* left, BinaryTree* right);

// O(n) time | O(h) space - where n is the number of nodes in the tree
// and h is the height of the tree.
bool symmetricalTree(BinaryTree* tree) {
  return treesAreMirrored(tree->left, tree->right);
}

bool treesAreMirrored(BinaryTree* left, BinaryTree* right) {
  if (left != nullptr && right != nullptr && left->value == right->value) {
    return treesAreMirrored(left->left, right->right) && treesAreMirrored(left->right, right->left);
  }

  return left == right;
}


```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      BinaryTree* tree = new BinaryTree(10);
      tree->left = new BinaryTree(5);
      tree->right = new BinaryTree(5);
      tree->left->left = new BinaryTree(7);
      tree->left->right = new BinaryTree(9);
      tree->right->left = new BinaryTree(9);
      tree->right->right = new BinaryTree(7);
      auto expected = true;
      auto actual = symmetricalTree(tree);
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
		Program.BinaryTree tree = new Program.BinaryTree(10);
		tree.left = new Program.BinaryTree(5);
		tree.right = new Program.BinaryTree(5);
		tree.left.left = new Program.BinaryTree(7);
		tree.left.right = new Program.BinaryTree(9);
		tree.right.left = new Program.BinaryTree(9);
		tree.right.right = new Program.BinaryTree(7);
		var expected = true;
		var actual = new Program().SymmetricalTree(tree);
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
	// This is an input class. Do not edit.
	public class BinaryTree {
		public int value;
		public BinaryTree left = null;
		public BinaryTree right = null;

		public BinaryTree(int value) {
			this.value = value;
		}
	}

	// O(n) time | O(h) space - where n is the number of nodes in the tree
	// and h is the height of the tree.
	public bool SymmetricalTree(BinaryTree tree) {
		Stack<BinaryTree> stackLeft = new Stack<BinaryTree>();
		stackLeft.Push(tree.left);
		Stack<BinaryTree> stackRight = new Stack<BinaryTree>();
		stackRight.Push(tree.right);

		while (stackLeft.Count != 0 && stackRight.Count != 0) {
			BinaryTree left = stackLeft.Pop();
			BinaryTree right = stackRight.Pop();

			if (left == null && right == null) {
				continue;
			}

			if (left == null || right == null || left.value != right.value) {
				return false;
			}

			stackLeft.Push(left.left);
			stackLeft.Push(left.right);
			stackRight.Push(right.right);
			stackRight.Push(right.left);
		}

		return stackLeft.Count == 0 && stackRight.Count == 0;
	}
}


```
### Solution 2 (csharp)
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

	// O(n) time | O(h) space - where n is the number of nodes in the tree
	// and h is the height of the tree.
	public bool SymmetricalTree(BinaryTree tree) {
		return treesAreMirrored(tree.left, tree.right);
	}

	private bool treesAreMirrored(BinaryTree left, BinaryTree right) {
		if (left != null && right != null && left.value == right.value) {
			return treesAreMirrored(left.left, right.right) && treesAreMirrored(
				left.right, right.left);
		}

		return left == right;
	}
}


```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		Program.BinaryTree tree = new Program.BinaryTree(10);
		tree.left = new Program.BinaryTree(5);
		tree.right = new Program.BinaryTree(5);
		tree.left.left = new Program.BinaryTree(7);
		tree.left.right = new Program.BinaryTree(9);
		tree.right.left = new Program.BinaryTree(9);
		tree.right.right = new Program.BinaryTree(7);
		var expected = true;
		var actual = new Program().SymmetricalTree(tree);
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
	tree := &BinaryTree{Value: 6}
	tree.Left = &BinaryTree{Value: (5)}
	tree.Right = &BinaryTree{Value: (5)}
	tree.Left.Left = &BinaryTree{Value: (7)}
	tree.Left.Right = &BinaryTree{Value: (9)}
	tree.Right.Left = &BinaryTree{Value: (9)}
	tree.Right.Right = &BinaryTree{Value: (7)}
	expected := true
	actual := SymmetricalTree(tree)
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

// O(n) time | O(h) space - where n is the number of nodes in the tree
// and h is the height of the tree.
func SymmetricalTree(tree *BinaryTree) bool {
	stackLeft := []*BinaryTree{tree.Left}
	stackRight := []*BinaryTree{tree.Right}

	for len(stackLeft) > 0 {
		var left, right *BinaryTree
		left, stackLeft = stackLeft[len(stackLeft)-1], stackLeft[:len(stackLeft)-1]
		right, stackRight = stackRight[len(stackRight)-1], stackRight[:len(stackRight)-1]

		if left == nil && right == nil {
			continue
		}

		if left == nil || right == nil || left.Value != right.Value {
			return false
		}

		stackLeft = append(stackLeft, left.Left, left.Right)
		stackRight = append(stackRight, right.Right, right.Left)
	}

	return true
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// This is an input class. Do not edit.
type BinaryTree struct {
	Value int

	Left  *BinaryTree
	Right *BinaryTree
}

// O(n) time | O(h) space - where n is the number of nodes in the tree
// and h is the height of the tree.
func SymmetricalTree(tree *BinaryTree) bool {
	return treesAreMirrored(tree.Left, tree.Right)
}

func treesAreMirrored(left, right *BinaryTree) bool {
	if left != nil && right != nil && left.Value == right.Value {
		return treesAreMirrored(left.Left, right.Right) && treesAreMirrored(left.Right, right.Left)
	}

	return left == right
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	tree := &BinaryTree{Value: 6}
	tree.Left = &BinaryTree{Value: (5)}
	tree.Right = &BinaryTree{Value: (5)}
	tree.Left.Left = &BinaryTree{Value: (7)}
	tree.Left.Right = &BinaryTree{Value: (9)}
	tree.Right.Left = &BinaryTree{Value: (9)}
	tree.Right.Right = &BinaryTree{Value: (7)}
	expected := true
	actual := SymmetricalTree(tree)
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
    Program.BinaryTree tree = new Program.BinaryTree(10);
    tree.left = new Program.BinaryTree(5);
    tree.right = new Program.BinaryTree(5);
    tree.left.left = new Program.BinaryTree(7);
    tree.left.right = new Program.BinaryTree(9);
    tree.right.left = new Program.BinaryTree(9);
    tree.right.right = new Program.BinaryTree(7);
    var expected = true;
    var actual = new Program().symmetricalTree(tree);
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

  // O(n) time | O(h) space - where n is the number of nodes in the tree
  // and h is the height of the tree.
  public boolean symmetricalTree(BinaryTree tree) {
    Stack<BinaryTree> stackLeft = new Stack<BinaryTree>();
    stackLeft.push(tree.left);
    Stack<BinaryTree> stackRight = new Stack<BinaryTree>();
    stackRight.push(tree.right);

    while (!stackLeft.isEmpty() && !stackRight.isEmpty()) {
      BinaryTree left = stackLeft.pop();
      BinaryTree right = stackRight.pop();

      if (left == null && right == null) {
        continue;
      }

      if (left == null || right == null || left.value != right.value) {
        return false;
      }

      stackLeft.push(left.left);
      stackLeft.push(left.right);
      stackRight.push(right.right);
      stackRight.push(right.left);
    }

    return stackLeft.isEmpty() && stackRight.isEmpty();
  }
}

```
### Solution 2 (java)
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

  // O(n) time | O(h) space - where n is the number of nodes in the tree
  // and h is the height of the tree.
  public boolean symmetricalTree(BinaryTree tree) {
    return treesAreMirrored(tree.left, tree.right);
  }

  private boolean treesAreMirrored(BinaryTree left, BinaryTree right) {
    if (left != null && right != null && left.value == right.value) {
      return treesAreMirrored(left.left, right.right) && treesAreMirrored(left.right, right.left);
    }

    return left == right;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    Program.BinaryTree tree = new Program.BinaryTree(10);
    tree.left = new Program.BinaryTree(5);
    tree.right = new Program.BinaryTree(5);
    tree.left.left = new Program.BinaryTree(7);
    tree.left.right = new Program.BinaryTree(9);
    tree.right.left = new Program.BinaryTree(9);
    tree.right.right = new Program.BinaryTree(7);
    var expected = true;
    var actual = new Program().symmetricalTree(tree);
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

class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

it('Test Case #1', function () {
  const tree = new BinaryTree(6);
  tree.left = new BinaryTree(5);
  tree.right = new BinaryTree(5);
  tree.left.left = new BinaryTree(7);
  tree.left.right = new BinaryTree(9);
  tree.right.left = new BinaryTree(9);
  tree.right.right = new BinaryTree(7);
  const expected = true;
  const actual = program.symmetricalTree(tree);
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

// O(n) time | O(h) space - where n is the number of nodes in the tree
// and h is the height of the tree.
function symmetricalTree(tree) {
  const stackLeft = [tree.left];
  const stackRight = [tree.right];

  while (stackLeft.length > 0) {
    const left = stackLeft.pop();
    const right = stackRight.pop();

    if (left === null && right === null) continue;

    if (left === null || right === null || left.value != right.value) {
      return false;
    }

    stackLeft.push(left.left);
    stackLeft.push(left.right);
    stackRight.push(right.right);
    stackRight.push(right.left);
  }

  return true;
}

// Do not edit the lines below.
exports.BinaryTree = BinaryTree;
exports.symmetricalTree = symmetricalTree;

```
### Solution 2 (javascript)
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

// O(n) time | O(h) space - where n is the number of nodes in the tree
// and h is the height of the tree.
function symmetricalTree(tree) {
  return treesAreMirrored(tree.left, tree.right);
}

function treesAreMirrored(left, right) {
  if (left !== null && right !== null && left.value === right.value) {
    return treesAreMirrored(left.left, right.right) && treesAreMirrored(left.right, right.left);
  }

  return left === right;
}

// Do not edit the lines below.
exports.BinaryTree = BinaryTree;
exports.symmetricalTree = symmetricalTree;

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
  const tree = new BinaryTree(6);
  tree.left = new BinaryTree(5);
  tree.right = new BinaryTree(5);
  tree.left.left = new BinaryTree(7);
  tree.left.right = new BinaryTree(9);
  tree.right.left = new BinaryTree(9);
  tree.right.right = new BinaryTree(7);
  const expected = true;
  const actual = program.symmetricalTree(tree);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.symmetricalTree
import com.algoexpert.program.BinaryTree as BinaryTree

class ProgramTest {
    @Test
    fun TestCase1() {
        val tree = BinaryTree(10)
        tree.left = BinaryTree(5)
        tree.right = BinaryTree(5)
        tree.left!!.left = BinaryTree(7)
        tree.left!!.right = BinaryTree(9)
        tree.right!!.left = BinaryTree(9)
        tree.right!!.right = BinaryTree(7)
        val expected = true
        val output = symmetricalTree(tree)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import java.util.Stack

// This is an input class. Do not edit.
open class BinaryTree(value: Int) {
    var value = value
    var left: BinaryTree? = null
    var right: BinaryTree? = null
}

// O(n) time | O(h) space - where n is the number of nodes in the tree
// and h is the height of the tree.
fun symmetricalTree(tree: BinaryTree): Boolean {
    val stackLeft = Stack<BinaryTree>()
    val stackRight = Stack<BinaryTree>()
    stackLeft.add(tree.left)
    stackRight.add(tree.right)

    while (stackLeft.size > 0) {
        val left = stackLeft.pop()
        val right = stackRight.pop()

        if (left == null && right == null) continue

        if (left == null || right == null || left.value != right.value) {
            return false
        }

        stackLeft.add(left.left)
        stackLeft.add(left.right)
        stackRight.add(right.right)
        stackRight.add(right.left)
    }

    return true
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// This is an input class. Do not edit.
open class BinaryTree(value: Int) {
    var value = value
    var left: BinaryTree? = null
    var right: BinaryTree? = null
}

// O(n) time | O(h) space - where n is the number of nodes in the tree
// and h is the height of the tree.
fun symmetricalTree(tree: BinaryTree): Boolean {
    return treesAreMirrored(tree.left, tree.right)
}

fun treesAreMirrored(left: BinaryTree?, right: BinaryTree?): Boolean {
    if (left !== null && right !== null && left.value == right.value) {
        return treesAreMirrored(left.left, right.right) && treesAreMirrored(left.right, right.left)
    }

    return left == right
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.symmetricalTree
import com.algoexpert.program.BinaryTree as BinaryTree

class ProgramTest {
    @Test
    fun TestCase1() {
        val tree = BinaryTree(10)
        tree.left = BinaryTree(5)
        tree.right = BinaryTree(5)
        tree.left!!.left = BinaryTree(7)
        tree.left!!.right = BinaryTree(9)
        tree.right!!.left = BinaryTree(9)
        tree.right!!.right = BinaryTree(7)
        val expected = true
        val output = symmetricalTree(tree)
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
      var tree = Program.BinaryTree(value: 6)
      tree.left = Program.BinaryTree(value: 5)
      tree.right = Program.BinaryTree(value: 5)
      tree.left!.left = Program.BinaryTree(value: 7)
      tree.left!.right = Program.BinaryTree(value: 9)
      tree.right!.left = Program.BinaryTree(value: 9)
      tree.right!.right = Program.BinaryTree(value: 7)
      var expected = true
      var actual = Program().symmetricalTree(tree)
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

  // O(n) time | O(h) space - where n is the number of nodes in the tree
  // and h is the height of the tree.
  func symmetricalTree(_ tree: BinaryTree) -> Bool {
    var stackLeft = [tree.left]
    var stackRight = [tree.right]

    while stackLeft.count > 0 {
      var left: BinaryTree? = stackLeft.popLast()!
      var right: BinaryTree? = stackRight.popLast()!

      if left == nil && right == nil {
        continue
      }

      if left == nil || right == nil || left!.value != right!.value {
        return false
      }

      stackLeft += [left!.left, left!.right]
      stackRight += [right!.right, right!.left]
    }

    return true
  }
}

```
### Solution 2 (swift)
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

  // O(n) time | O(h) space - where n is the number of nodes in the tree
  // and h is the height of the tree.
  func symmetricalTree(_ tree: BinaryTree) -> Bool {
    return treesAreMirrored(tree.left, tree.right)
  }

  func treesAreMirrored(_ left: BinaryTree?, _ right: BinaryTree?) -> Bool {
    if left != nil && right != nil && left!.value == right!.value {
      return treesAreMirrored(left!.left, right!.right) && treesAreMirrored(left!.right, right!.left)
    }

    return left == nil && right == nil
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws in
      var tree = Program.BinaryTree(value: 6)
      tree.left = Program.BinaryTree(value: 5)
      tree.right = Program.BinaryTree(value: 5)
      tree.left!.left = Program.BinaryTree(value: 7)
      tree.left!.right = Program.BinaryTree(value: 9)
      tree.right!.left = Program.BinaryTree(value: 9)
      tree.right!.right = Program.BinaryTree(value: 7)
      var expected = true
      var actual = Program().symmetricalTree(tree)
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


class BinaryTree:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        tree = BinaryTree(10)
        tree.left = BinaryTree(5)
        tree.right = BinaryTree(5)
        tree.left.left = BinaryTree(7)
        tree.left.right = BinaryTree(9)
        tree.right.left = BinaryTree(9)
        tree.right.right = BinaryTree(7)
        expected = True
        actual = program.symmetricalTree(tree)
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


# O(n) time | O(h) space - where n is the number of nodes in the tree
# and h is the height of the tree.
def symmetricalTree(tree):
    stackLeft = [tree.left]
    stackRight = [tree.right]

    while len(stackLeft) > 0:
        left = stackLeft.pop()
        right = stackRight.pop()

        if left is None and right is None:
            continue

        if left is None or right is None or left.value != right.value:
            return False

        stackLeft.append(left.left)
        stackLeft.append(left.right)
        stackRight.append(right.right)
        stackRight.append(right.left)

    return True

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# This is an input class. Do not edit.
class BinaryTree:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right


# O(n) time | O(h) space - where n is the number of nodes in the tree
# and h is the height of the tree.
def symmetricalTree(tree):
    return treesAreMirrored(tree.left, tree.right)


def treesAreMirrored(left, right):
    if left is not None and right is not None and left.value == right.value:
        return treesAreMirrored(left.left, right.right) and treesAreMirrored(left.right, right.left)

    return left == right

```
### Unit Tests 1 (python)
```python
import program
import unittest


class BinaryTree:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        tree = BinaryTree(10)
        tree.left = BinaryTree(5)
        tree.right = BinaryTree(5)
        tree.left.left = BinaryTree(7)
        tree.left.right = BinaryTree(9)
        tree.right.left = BinaryTree(9)
        tree.right.right = BinaryTree(7)
        expected = True
        actual = program.symmetricalTree(tree)
        self.assertEqual(actual, expected)

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
  const tree = new BinaryTree(6);
  tree.left = new BinaryTree(5);
  tree.right = new BinaryTree(5);
  tree.left.left = new BinaryTree(7);
  tree.left.right = new BinaryTree(9);
  tree.right.left = new BinaryTree(9);
  tree.right.right = new BinaryTree(7);
  const expected = true;
  const actual = program.symmetricalTree(tree);
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

// O(n) time | O(h) space - where n is the number of nodes in the tree
// and h is the height of the tree.
export function symmetricalTree(tree: BinaryTree) {
  const stackLeft = [tree.left];
  const stackRight = [tree.right];

  while (stackLeft.length > 0) {
    const left: BinaryTree | null = stackLeft.pop()!;
    const right: BinaryTree | null = stackRight.pop()!;

    if (left === null && right === null) continue;

    if (left === null || right === null || left.value != right.value) {
      return false;
    }

    stackLeft.push(left.left);
    stackLeft.push(left.right);
    stackRight.push(right.right);
    stackRight.push(right.left);
  }

  return true;
}

```
### Solution 2 (typescript)
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

// O(n) time | O(h) space - where n is the number of nodes in the tree
// and h is the height of the tree.
export function symmetricalTree(tree: BinaryTree) {
  return treesAreMirrored(tree.left, tree.right);
}

function treesAreMirrored(left: BinaryTree | null, right: BinaryTree | null): boolean {
  if (left !== null && right !== null && left.value === right.value) {
    return treesAreMirrored(left.left, right.right) && treesAreMirrored(left.right, right.left);
  }

  return left === right;
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
  const tree = new BinaryTree(6);
  tree.left = new BinaryTree(5);
  tree.right = new BinaryTree(5);
  tree.left.left = new BinaryTree(7);
  tree.left.right = new BinaryTree(9);
  tree.right.left = new BinaryTree(9);
  tree.right.right = new BinaryTree(7);
  const expected = true;
  const actual = program.symmetricalTree(tree);
  chai.expect(actual).to.deep.equal(expected);
});

```

