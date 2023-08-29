# Iterative In-order Traversal
<div class="html">
<p>
  Write a function that takes in a Binary Tree (where nodes have an additional
  pointer to their parent node) and traverses it iteratively using the in-order
  tree-traversal technique; the traversal should specifically <i>not</i> use
  recursion. As the tree is being traversed, a callback function passed in as an
  argument to the main function should be called on each node (i.e.,
  <span>callback(currentNode)</span>).
</p>
<p>
  Each <span>BinaryTree</span> node has an integer <span>value</span>, a
  <span>parent</span> node, a <span>left</span> child node, and a
  <span>right</span> child node. Children nodes can either be
  <span>BinaryTree</span> nodes themselves or <span>None</span> /
  <span>null</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">tree</span> =    1
       /     \
      2       3
    /       /   \
   4       6     7
     \
      9
<span class="CodeEditor-promptParameter">callback</span> = someCallback
</pre>
<h3>Sample Output</h3>
<pre>
<span class="CodeEditor-promptComment">// The input callback will have been called in the following order:</span>
callback(4)
callback(9)
callback(2)
callback(1)
callback(6)
callback(3)
callback(7)
</pre>
</div>

Hint 1
<p>
Start by realizing that in-order traversal always traverses left child nodes before parent nodes before right child nodes. In other words, you will somehow have to traverse the entire left side of the input Binary Tree before calling the input callback on the root node and before traversing the entire right side.
</p>


Hint 2

<p>
While each node in the input Binary Tree does have a "parent" property, allowing you to traverse your way back up the tree if need be, the difficulty arises when you must choose which node to actually call the input callback on. For instance, on your way back up the left side of the input tree, how do you know whether to traverse the right side of a node or to keep going up? Is there something that you can keep track of in order to know which node to call the input callback back on next at any time during the life of your algorithm?
</p>


Hint 3

<p>
Try keeping track of three nodes at all times: a current node (the node currently being traversed), a previous node (the node traversed just before the current one), and a next node (the next node to be traversed). Determine which node to traverse next and when to call the input callback on the current node by analyzing the previous node. For instance, if the previous node is actually the current node's left child node, then you know that you must call the callback on the current node and that you must then explore the right side of the current node before going back up. Figure out all of the possible scenarios, and develop an algorithm to handle all of these scenarios.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

#include <deque>

BinaryTree::BinaryTree(int value, BinaryTree *parent) {
  this->value = value;
  this->left = nullptr;
  this->right = nullptr;
  this->parent = parent;
}

vector<int> testArray = {};

void testCallback(BinaryTree *tree) {
  if (tree == nullptr) {
    return;
  }
  testArray.push_back(tree->value);
}

class ProgramTest : public TestSuite {
public:
  void Run() {

    RunTest("Test Case 1", []() {
      BinaryTree *root = new BinaryTree(1, nullptr);
      root->left = new BinaryTree(2, root);
      root->left->left = new BinaryTree(4, root->left);
      root->left->left->right = new BinaryTree(9, root->left->left);
      root->right = new BinaryTree(3, root);
      root->right->left = new BinaryTree(6, root->right);
      root->right->right = new BinaryTree(7, root->right);

      testArray = {};
      iterativeInOrderTraversal(root, &testCallback);
      vector<int> expected{4, 9, 2, 1, 6, 3, 7};
      assert(testArray == expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

class BinaryTree {
public:
  int value;
  BinaryTree *left;
  BinaryTree *right;
  BinaryTree *parent;

  BinaryTree(int value, BinaryTree *parent = nullptr);
  void insert(vector<int> values, int i = 0);
};

// O(n) time | O(1) space
void iterativeInOrderTraversal(BinaryTree *tree,
                               void (*callback)(BinaryTree *tree)) {
  BinaryTree *previousNode = nullptr;
  BinaryTree *currentNode = tree;
  while (currentNode != nullptr) {
    BinaryTree *nextNode;
    if (previousNode == nullptr || previousNode == currentNode->parent) {
      if (currentNode->left != nullptr) {
        nextNode = currentNode->left;
      } else {
        (*callback)(currentNode);
        nextNode = currentNode->right != nullptr ? currentNode->right
                                                 : currentNode->parent;
      }
    } else if (previousNode == currentNode->left) {
      (*callback)(currentNode);
      nextNode = currentNode->right != nullptr ? currentNode->right
                                               : currentNode->parent;
    } else {
      nextNode = currentNode->parent;
    }
    previousNode = currentNode;
    currentNode = nextNode;
  }
}

```
### Unit Tests 1 (cpp)
```cpp
#include <deque>

BinaryTree::BinaryTree(int value, BinaryTree *parent) {
  this->value = value;
  this->left = nullptr;
  this->right = nullptr;
  this->parent = parent;
}

vector<int> testArray = {};

void testCallback(BinaryTree *tree) {
  if (tree == nullptr) {
    return;
  }
  testArray.push_back(tree->value);
}

class ProgramTest : public TestSuite {
public:
  void Run() {

    RunTest("Test Case 1", []() {
      BinaryTree *root = new BinaryTree(1, nullptr);
      root->left = new BinaryTree(2, root);
      root->left->left = new BinaryTree(4, root->left);
      root->left->left->right = new BinaryTree(9, root->left->left);
      root->right = new BinaryTree(3, root);
      root->right->left = new BinaryTree(6, root->right);
      root->right->right = new BinaryTree(7, root->right);

      testArray = {};
      iterativeInOrderTraversal(root, &testCallback);
      vector<int> expected{4, 9, 2, 1, 6, 3, 7};
      assert(testArray == expected);
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
using System.Linq;
using System.Collections.Generic;

public class ProgramTest {
	public List<int> testArray = new List<int>();

	void testCallback(Program.BinaryTree tree) {
		if (tree == null) {
			return;
		}
		testArray.Add(tree.value);
		return;
	}

	[Test]
	public void TestCase1() {
		var root = new Program.BinaryTree(1);
		root.left = new Program.BinaryTree(2, root);
		root.left.left = new Program.BinaryTree(4, root.left);
		root.left.left.right = new Program.BinaryTree(9, root.left.left);
		root.right = new Program.BinaryTree(3, root);
		root.right.left = new Program.BinaryTree(6, root.right);
		root.right.right = new Program.BinaryTree(7, root.right);

		testArray.Clear();
		Program.IterativeInOrderTraversal(root, testCallback);
		Utils.AssertTrue(Enumerable.SequenceEqual(testArray, new List<int> {
			4, 9, 2, 1, 6, 3, 7
		}));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// O(n) time | O(1) space
	public static void IterativeInOrderTraversal(BinaryTree tree, Action<BinaryTree> callback) {
		BinaryTree previousNode = null;
		BinaryTree currentNode = tree;
		while (currentNode != null) {
			BinaryTree nextNode;
			if (previousNode == null || previousNode == currentNode.parent) {
				if (currentNode.left != null) {
					nextNode = currentNode.left;
				} else {
					callback(currentNode);
					nextNode = currentNode.right !=
					  null ? currentNode.right : currentNode.parent;
				}
			} else if (previousNode == currentNode.left) {
				callback(currentNode);
				nextNode = currentNode.right !=
				  null ? currentNode.right : currentNode.parent;
			} else {
				nextNode = currentNode.parent;
			}
			previousNode = currentNode;
			currentNode = nextNode;
		}
	}

	public class BinaryTree {
		public int value;
		public BinaryTree left;
		public BinaryTree right;
		public BinaryTree parent;

		public BinaryTree(int value) {
			this.value = value;
		}

		public BinaryTree(int value, BinaryTree parent) {
			this.value = value;
			this.parent = parent;
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;
using System.Linq;
using System.Collections.Generic;

public class ProgramTest {
	public List<int> testArray = new List<int>();

	void testCallback(Program.BinaryTree tree) {
		if (tree == null) {
			return;
		}
		testArray.Add(tree.value);
		return;
	}

	[Test]
	public void TestCase1() {
		var root = new Program.BinaryTree(1);
		root.left = new Program.BinaryTree(2, root);
		root.left.left = new Program.BinaryTree(4, root.left);
		root.left.left.right = new Program.BinaryTree(9, root.left.left);
		root.right = new Program.BinaryTree(3, root);
		root.right.left = new Program.BinaryTree(6, root.right);
		root.right.right = new Program.BinaryTree(7, root.right);

		testArray.Clear();
		Program.IterativeInOrderTraversal(root, testCallback);
		Utils.AssertTrue(Enumerable.SequenceEqual(testArray, new List<int> {
			4, 9, 2, 1, 6, 3, 7
		}));
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

func NewBinaryTree(root int, parent *BinaryTree) *BinaryTree {
	return &BinaryTree{Value: root, Parent: parent}
}

func (s *TestSuite) TestCase1(t *TestCase) {
	root := NewBinaryTree(1, nil)
	root.Left = NewBinaryTree(2, root)
	root.Left.Left = NewBinaryTree(4, root.Left)
	root.Left.Left.Right = NewBinaryTree(9, root.Left.Left)
	root.Right = NewBinaryTree(3, root)
	root.Right.Left = NewBinaryTree(6, root.Right)
	root.Right.Right = NewBinaryTree(7, root.Right)

	output := []int{}
	root.IterativeInOrderTraversal(func(i int) {
		output = append(output, i)
	})
	expected := []int{4, 9, 2, 1, 6, 3, 7}
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type BinaryTree struct {
	Value int

	Left   *BinaryTree
	Right  *BinaryTree
	Parent *BinaryTree
}

// O(n) time | O(1) space
func (tree *BinaryTree) IterativeInOrderTraversal(callback func(int)) {
	var previous, next *BinaryTree
	current := tree
	for current != nil {
		if previous == nil || previous == current.Parent {
			if current.Left != nil {
				next = current.Left
			} else {
				callback(current.Value)
				if current.Right != nil {
					next = current.Right
				} else {
					next = current.Parent
				}
			}
		} else if previous == current.Left {
			callback(current.Value)
			if current.Right != nil {
				next = current.Right
			} else {
				next = current.Parent
			}
		} else {
			next = current.Parent
		}
		previous, current = current, next
	}
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func NewBinaryTree(root int, parent *BinaryTree) *BinaryTree {
	return &BinaryTree{Value: root, Parent: parent}
}

func (s *TestSuite) TestCase1(t *TestCase) {
	root := NewBinaryTree(1, nil)
	root.Left = NewBinaryTree(2, root)
	root.Left.Left = NewBinaryTree(4, root.Left)
	root.Left.Left.Right = NewBinaryTree(9, root.Left.Left)
	root.Right = NewBinaryTree(3, root)
	root.Right.Left = NewBinaryTree(6, root.Right)
	root.Right.Right = NewBinaryTree(7, root.Right)

	output := []int{}
	root.IterativeInOrderTraversal(func(i int) {
		output = append(output, i)
	})
	expected := []int{4, 9, 2, 1, 6, 3, 7}
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
  public List<Integer> testArray = new ArrayList<Integer>();

  public Void testCallback(Program.BinaryTree tree) {
    if (tree == null) {
      return null;
    }
    testArray.add(tree.value);
    return null;
  }

  @Test
  public void TestCase1() {
    var root = new Program.BinaryTree(1);
    root.left = new Program.BinaryTree(2, root);
    root.left.left = new Program.BinaryTree(4, root.left);
    root.left.left.right = new Program.BinaryTree(9, root.left.left);
    root.right = new Program.BinaryTree(3, root);
    root.right.left = new Program.BinaryTree(6, root.right);
    root.right.right = new Program.BinaryTree(7, root.right);

    this.testArray.clear();
    Program.iterativeInOrderTraversal(root, this::testCallback);
    List<Integer> expected = Arrays.asList(new Integer[] {4, 9, 2, 1, 6, 3, 7});
    Utils.assertTrue(expected.equals(this.testArray));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.function.Function;

class Program {
  // O(n) time | O(1) space
  public static void iterativeInOrderTraversal(
      BinaryTree tree, Function<BinaryTree, Void> callback) {
    BinaryTree previousNode = null;
    BinaryTree currentNode = tree;
    while (currentNode != null) {
      BinaryTree nextNode;
      if (previousNode == null || previousNode == currentNode.parent) {
        if (currentNode.left != null) {
          nextNode = currentNode.left;
        } else {
          callback.apply(currentNode);
          nextNode = currentNode.right != null ? currentNode.right : currentNode.parent;
        }
      } else if (previousNode == currentNode.left) {
        callback.apply(currentNode);
        nextNode = currentNode.right != null ? currentNode.right : currentNode.parent;
      } else {
        nextNode = currentNode.parent;
      }
      previousNode = currentNode;
      currentNode = nextNode;
    }
  }

  static class BinaryTree {
    public int value;
    public BinaryTree left;
    public BinaryTree right;
    public BinaryTree parent;

    public BinaryTree(int value) {
      this.value = value;
    }

    public BinaryTree(int value, BinaryTree parent) {
      this.value = value;
      this.parent = parent;
    }
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  public List<Integer> testArray = new ArrayList<Integer>();

  public Void testCallback(Program.BinaryTree tree) {
    if (tree == null) {
      return null;
    }
    testArray.add(tree.value);
    return null;
  }

  @Test
  public void TestCase1() {
    var root = new Program.BinaryTree(1);
    root.left = new Program.BinaryTree(2, root);
    root.left.left = new Program.BinaryTree(4, root.left);
    root.left.left.right = new Program.BinaryTree(9, root.left.left);
    root.right = new Program.BinaryTree(3, root);
    root.right.left = new Program.BinaryTree(6, root.right);
    root.right.right = new Program.BinaryTree(7, root.right);

    this.testArray.clear();
    Program.iterativeInOrderTraversal(root, this::testCallback);
    List<Integer> expected = Arrays.asList(new Integer[] {4, 9, 2, 1, 6, 3, 7});
    Utils.assertTrue(expected.equals(this.testArray));
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
  constructor(value, parent = null) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = parent;
  }
}

it('Test Case #1', function () {
  const root = new BinaryTree(1);
  root.left = new BinaryTree(2, root);
  root.left.left = new BinaryTree(4, root.left);
  root.left.left.right = new BinaryTree(9, root.left.left);
  root.right = new BinaryTree(3, root);
  root.right.left = new BinaryTree(6, root.right);
  root.right.right = new BinaryTree(7, root.right);

  const array = [];
  function testCallback(tree) {
    if (tree === null) return;
    array.push(tree.value);
  }

  program.iterativeInOrderTraversal(root, testCallback);

  chai.expect(array).to.deep.equal([4, 9, 2, 1, 6, 3, 7]);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space
function iterativeInOrderTraversal(tree, callback) {
  let previousNode = null;
  let currentNode = tree;
  while (currentNode !== null) {
    let nextNode;
    if (previousNode === null || previousNode === currentNode.parent) {
      if (currentNode.left !== null) {
        nextNode = currentNode.left;
      } else {
        callback(currentNode);
        nextNode = currentNode.right !== null ? currentNode.right : currentNode.parent;
      }
    } else if (previousNode === currentNode.left) {
      callback(currentNode);
      nextNode = currentNode.right !== null ? currentNode.right : currentNode.parent;
    } else {
      nextNode = currentNode.parent;
    }
    previousNode = currentNode;
    currentNode = nextNode;
  }
}

exports.iterativeInOrderTraversal = iterativeInOrderTraversal;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

class BinaryTree {
  constructor(value, parent = null) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = parent;
  }
}

it('Test Case #1', function () {
  const root = new BinaryTree(1);
  root.left = new BinaryTree(2, root);
  root.left.left = new BinaryTree(4, root.left);
  root.left.left.right = new BinaryTree(9, root.left.left);
  root.right = new BinaryTree(3, root);
  root.right.left = new BinaryTree(6, root.right);
  root.right.right = new BinaryTree(7, root.right);

  const array = [];
  function testCallback(tree) {
    if (tree === null) return;
    array.push(tree.value);
  }

  program.iterativeInOrderTraversal(root, testCallback);

  chai.expect(array).to.deep.equal([4, 9, 2, 1, 6, 3, 7]);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.BinaryTree as BinaryTree
import com.algoexpert.program.iterativeInOrderTraversal as iterativeInOrderTraversal

class ProgramTest {
    @Test
    fun TestCase1() {
        val tree = BinaryTree(1, null)
        tree.left = BinaryTree(2, tree)
        tree.left!!.left = BinaryTree(4, tree.left)
        tree.left!!.left!!.right = BinaryTree(9, tree.left!!.left)
        tree.right = BinaryTree(3, tree)
        tree.right!!.left = BinaryTree(6, tree.right)
        tree.right!!.right = BinaryTree(7, tree.right)

        val array = mutableListOf<Int>()
        fun(tree: BinaryTree?) {
            if (tree == null) return
            array.add(tree.value)
        }

        iterativeInOrderTraversal(
            tree,
            fun(tree: BinaryTree?) {
                if (tree == null) return
                array.add(tree.value)
            }
        )

        assert(array == listOf(4, 9, 2, 1, 6, 3, 7))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

open class BinaryTree(value: Int, parent: BinaryTree?) {
    var value = value
    var left: BinaryTree? = null
    var right: BinaryTree? = null
    var parent: BinaryTree? = parent
}

// O(n) time | O(1) space
fun iterativeInOrderTraversal(tree: BinaryTree?, callback: (BinaryTree?) -> Unit) {
    var previousNode: BinaryTree? = null
    var currentNode: BinaryTree? = tree
    while (currentNode != null) {
        var nextNode: BinaryTree?
        if (previousNode == null || previousNode == currentNode.parent) {
            if (currentNode.left != null) {
                nextNode = currentNode.left
            } else {
                callback(currentNode)
                nextNode = if (currentNode.right != null) currentNode.right else currentNode.parent
            }
        } else if (previousNode == currentNode.left) {
            callback(currentNode)
            nextNode = if (currentNode.right != null) currentNode.right else currentNode.parent
        } else {
            nextNode = currentNode.parent
        }
        previousNode = currentNode
        currentNode = nextNode
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.BinaryTree as BinaryTree
import com.algoexpert.program.iterativeInOrderTraversal as iterativeInOrderTraversal

class ProgramTest {
    @Test
    fun TestCase1() {
        val tree = BinaryTree(1, null)
        tree.left = BinaryTree(2, tree)
        tree.left!!.left = BinaryTree(4, tree.left)
        tree.left!!.left!!.right = BinaryTree(9, tree.left!!.left)
        tree.right = BinaryTree(3, tree)
        tree.right!!.left = BinaryTree(6, tree.right)
        tree.right!!.right = BinaryTree(7, tree.right)

        val array = mutableListOf<Int>()
        fun(tree: BinaryTree?) {
            if (tree == null) return
            array.add(tree.value)
        }

        iterativeInOrderTraversal(
            tree,
            fun(tree: BinaryTree?) {
                if (tree == null) return
                array.add(tree.value)
            }
        )

        assert(array == listOf(4, 9, 2, 1, 6, 3, 7))
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

    var testArray = [Int]()
    func testCallback(_ tree: Program.BinaryTree) {
      testArray.append(tree.value)
    }

    runTest("Test Case 1") { () throws -> Void in
      let root = Program.BinaryTree(value: 1, parent: nil)
      root.left = Program.BinaryTree(value: 2, parent: root)
      root.left!.left = Program.BinaryTree(value: 4, parent: root.left)
      root.left!.left!.right = Program.BinaryTree(value: 9, parent: root.left!.left)
      root.right = Program.BinaryTree(value: 3, parent: root)
      root.right!.left = Program.BinaryTree(value: 6, parent: root.right)
      root.right!.right = Program.BinaryTree(value: 7, parent: root.right)

      testArray = []
      program.iterativeInOrderTraversal(root, testCallback(_:))
      try assertEqual(testArray, [4, 9, 2, 1, 6, 3, 7])
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
    var parent: BinaryTree?
    var left: BinaryTree?
    var right: BinaryTree?

    init(value: Int, parent: BinaryTree?) {
      self.value = value
      self.parent = parent
    }
  }

  // O(n) time | O(1) space
  func iterativeInOrderTraversal(_ tree: BinaryTree, _ callback: (BinaryTree) -> Void) {
    var previousNode: BinaryTree?
    var currentNode: BinaryTree? = tree

    while currentNode !== nil {
      let nextNode: BinaryTree?
      if previousNode === nil || previousNode === currentNode?.parent {
        if currentNode?.left !== nil {
          nextNode = currentNode?.left
        } else {
          callback(currentNode!)
          nextNode = currentNode?.right !== nil ? currentNode?.right : currentNode?.parent
        }
      } else if previousNode === currentNode?.left {
        callback(currentNode!)
        nextNode = currentNode?.right !== nil ? currentNode?.right : currentNode?.parent
      } else {
        nextNode = currentNode?.parent
      }

      previousNode = currentNode
      currentNode = nextNode
    }
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()

    var testArray = [Int]()
    func testCallback(_ tree: Program.BinaryTree) {
      testArray.append(tree.value)
    }

    runTest("Test Case 1") { () throws -> Void in
      let root = Program.BinaryTree(value: 1, parent: nil)
      root.left = Program.BinaryTree(value: 2, parent: root)
      root.left!.left = Program.BinaryTree(value: 4, parent: root.left)
      root.left!.left!.right = Program.BinaryTree(value: 9, parent: root.left!.left)
      root.right = Program.BinaryTree(value: 3, parent: root)
      root.right!.left = Program.BinaryTree(value: 6, parent: root.right)
      root.right!.right = Program.BinaryTree(value: 7, parent: root.right)

      testArray = []
      program.iterativeInOrderTraversal(root, testCallback(_:))
      try assertEqual(testArray, [4, 9, 2, 1, 6, 3, 7])
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
    def __init__(self, value, parent=None):
        self.value = value
        self.left = None
        self.right = None
        self.parent = parent


def testCallback(testArray, tree):
    if tree is None:
        return
    testArray.append(tree.value)


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        root = BinaryTree(1)
        root.left = BinaryTree(2, parent=root)
        root.left.left = BinaryTree(4, parent=root.left)
        root.left.left.right = BinaryTree(9, parent=root.left.left)
        root.right = BinaryTree(3, parent=root)
        root.right.left = BinaryTree(6, parent=root.right)
        root.right.right = BinaryTree(7, parent=root.right)

        testArray = []
        actualTestCallback = lambda x: testCallback(testArray, x)
        program.iterativeInOrderTraversal(root, actualTestCallback)
        self.assertEqual(testArray, [4, 9, 2, 1, 6, 3, 7])

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space
def iterativeInOrderTraversal(tree, callback):
    previousNode = None
    currentNode = tree
    while currentNode is not None:
        if previousNode is None or previousNode == currentNode.parent:
            if currentNode.left is not None:
                nextNode = currentNode.left
            else:
                callback(currentNode)
                nextNode = currentNode.right if currentNode.right is not None else currentNode.parent
        elif previousNode == currentNode.left:
            callback(currentNode)
            nextNode = currentNode.right if currentNode.right is not None else currentNode.parent
        else:
            nextNode = currentNode.parent
        previousNode = currentNode
        currentNode = nextNode

```
### Unit Tests 1 (python)
```python
import program
import unittest


class BinaryTree:
    def __init__(self, value, parent=None):
        self.value = value
        self.left = None
        self.right = None
        self.parent = parent


def testCallback(testArray, tree):
    if tree is None:
        return
    testArray.append(tree.value)


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        root = BinaryTree(1)
        root.left = BinaryTree(2, parent=root)
        root.left.left = BinaryTree(4, parent=root.left)
        root.left.left.right = BinaryTree(9, parent=root.left.left)
        root.right = BinaryTree(3, parent=root)
        root.right.left = BinaryTree(6, parent=root.right)
        root.right.right = BinaryTree(7, parent=root.right)

        testArray = []
        actualTestCallback = lambda x: testCallback(testArray, x)
        program.iterativeInOrderTraversal(root, actualTestCallback)
        self.assertEqual(testArray, [4, 9, 2, 1, 6, 3, 7])

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
  parent: BinaryTree | null;

  constructor(value: number, parent: BinaryTree | null = null) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = parent;
  }
}

it('Test Case #1', function () {
  const root = new BinaryTree(1);
  root.left = new BinaryTree(2, root);
  root.left.left = new BinaryTree(4, root.left);
  root.left.left.right = new BinaryTree(9, root.left.left);
  root.right = new BinaryTree(3, root);
  root.right.left = new BinaryTree(6, root.right);
  root.right.right = new BinaryTree(7, root.right);

  const array: number[] = [];
  function testCallback(tree: BinaryTree | null) {
    if (tree === null) return;
    array.push(tree.value);
  }

  program.iterativeInOrderTraversal(root, testCallback);

  chai.expect(array).to.deep.equal([4, 9, 2, 1, 6, 3, 7]);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class BinaryTree {
  value: number;
  left: BinaryTree | null;
  right: BinaryTree | null;
  parent: BinaryTree | null;

  constructor(value: number, parent: BinaryTree | null = null) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = parent;
  }
}

// O(n) time | O(1) space
export function iterativeInOrderTraversal(tree: BinaryTree, callback: (node: BinaryTree) => void) {
  let previousNode: BinaryTree | null = null;
  let currentNode: BinaryTree | null = tree;
  while (currentNode !== null) {
    let nextNode;
    if (previousNode === null || previousNode === currentNode.parent) {
      if (currentNode.left !== null) {
        nextNode = currentNode.left;
      } else {
        callback(currentNode);
        nextNode = currentNode.right !== null ? currentNode.right : currentNode.parent;
      }
    } else if (previousNode === currentNode.left) {
      callback(currentNode);
      nextNode = currentNode.right !== null ? currentNode.right : currentNode.parent;
    } else {
      nextNode = currentNode.parent;
    }
    previousNode = currentNode;
    currentNode = nextNode;
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
  parent: BinaryTree | null;

  constructor(value: number, parent: BinaryTree | null = null) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = parent;
  }
}

it('Test Case #1', function () {
  const root = new BinaryTree(1);
  root.left = new BinaryTree(2, root);
  root.left.left = new BinaryTree(4, root.left);
  root.left.left.right = new BinaryTree(9, root.left.left);
  root.right = new BinaryTree(3, root);
  root.right.left = new BinaryTree(6, root.right);
  root.right.right = new BinaryTree(7, root.right);

  const array: number[] = [];
  function testCallback(tree: BinaryTree | null) {
    if (tree === null) return;
    array.push(tree.value);
  }

  program.iterativeInOrderTraversal(root, testCallback);

  chai.expect(array).to.deep.equal([4, 9, 2, 1, 6, 3, 7]);
});

```

