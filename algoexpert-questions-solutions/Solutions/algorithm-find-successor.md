# Find Successor
<div class="html">
<p>
  Write a function that takes in a Binary Tree (where nodes have an additional
  pointer to their parent node) as well as a node contained in that tree and
  returns the given node's successor.
</p>
<p>
  A node's successor is the next node to be visited (immediately after the given
  node) when traversing its tree using the in-order tree-traversal technique. A
  node has no successor if it's the last node to be visited in the in-order
  traversal.
</p>
<p>
  If a node has no successor, your function should return <span>None</span> /
  <span>null</span>.
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
<span class="CodeEditor-promptParameter">tree</span> = 
              1
            /   \
           2     3
         /   \ 
        4     5
       /       
      6  
<span class="CodeEditor-promptParameter">node</span> = 5   
</pre>
<h3>Sample Output</h3>
<pre>
1
<span class="CodeEditor-promptComment">// This tree's in-order traversal order is:</span>
<span class="CodeEditor-promptComment">// 6 -> 4 -> 2 -> 5 -> 1 -> 3 </span>
<span class="CodeEditor-promptComment">// 1 comes immediately after 5.</span>
</pre>
</div>

Hint 1
<p>
Start by performing an in-order traversal of the tree and storing the nodes in an array as you go. Then, traverse the nodes that you've stored; once you find the input node, return the node immediately after it in the array.
</p>


Hint 2

<p>
Can you think of a more time-efficient way to solve this problem without performing the entire in-order traversal?
</p>


Hint 3

<p>
Use the fact that each node has a pointer to its parent to solve this problem in O(h) time, where h is the height of the tree.
</p>


Hint 4

<p>
If the given node has a right subtree, then the next node in the in-order traversal is simply the leftmost node in that right subtree. If it doesn't have a right subtree, then we need to traverse up the tree looking for an ancestor of this node that contains the node in question in its left subtree. The first node that we find that contains the input node in its left subtree is the one that will be visited next in the in-order traversal. If we reach the root node, and the input node isn't in the root node's left subtree, then the input node has no successor, because it must be the rightmost node of entire tree.
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
      root->left->parent = root;
      root->right = new BinaryTree(3);
      root->right->parent = root;
      root->left->left = new BinaryTree(4);
      root->left->left->parent = root->left;
      root->left->right = new BinaryTree(5);
      root->left->right->parent = root->left;
      root->left->left->left = new BinaryTree(6);
      root->left->left->left->parent = root->left->left;
      auto node = root->left->right;
      auto expected = root;
      auto actual = findSuccessor(root, node);
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
  BinaryTree *parent = nullptr;

  BinaryTree(int value) { this->value = value; }
};

void getInOrderTraversalOrder(BinaryTree *node, vector<BinaryTree *> &order);

// O(n) time | O(n) space - where n is the number of nodes in the tree
BinaryTree *findSuccessor(BinaryTree *tree, BinaryTree *node) {
  vector<BinaryTree *> inOrderTraversalOrder;
  getInOrderTraversalOrder(tree, inOrderTraversalOrder);

  for (int i = 0; i < inOrderTraversalOrder.size(); i++) {
    auto currentNode = inOrderTraversalOrder[i];

    if (currentNode != node) {
      continue;
    }

    if (i == inOrderTraversalOrder.size() - 1) {
      return nullptr;
    }
    return inOrderTraversalOrder[i + 1];
  }
  return nullptr;
}

void getInOrderTraversalOrder(BinaryTree *node, vector<BinaryTree *> &order) {
  if (node == nullptr) {
    return;
  }

  getInOrderTraversalOrder(node->left, order);
  order.push_back(node);
  getInOrderTraversalOrder(node->right, order);
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// This is an input class. Do not edit.
class BinaryTree {
public:
  int value;
  BinaryTree *left = nullptr;
  BinaryTree *right = nullptr;
  BinaryTree *parent = nullptr;

  BinaryTree(int value) { this->value = value; }
};

BinaryTree *getLeftmostChild(BinaryTree *node);
BinaryTree *getRightmostParent(BinaryTree *node);

// O(h) time | O(1) space - where h is the height of the tree
BinaryTree *findSuccessor(BinaryTree *tree, BinaryTree *node) {
  if (node->right != nullptr) {
    return getLeftmostChild(node->right);
  }
  return getRightmostParent(node);
}

BinaryTree *getLeftmostChild(BinaryTree *node) {
  auto currentNode = node;
  while (currentNode->left != nullptr) {
    currentNode = currentNode->left;
  }

  return currentNode;
}

BinaryTree *getRightmostParent(BinaryTree *node) {
  auto currentNode = node;
  while (currentNode->parent != nullptr &&
         currentNode->parent->right == currentNode) {
    currentNode = currentNode->parent;
  }

  return currentNode->parent;
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
      root->left->parent = root;
      root->right = new BinaryTree(3);
      root->right->parent = root;
      root->left->left = new BinaryTree(4);
      root->left->left->parent = root->left;
      root->left->right = new BinaryTree(5);
      root->left->right->parent = root->left;
      root->left->left->left = new BinaryTree(6);
      root->left->left->left->parent = root->left->left;
      auto node = root->left->right;
      auto expected = root;
      auto actual = findSuccessor(root, node);
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
		root.left = new Program.BinaryTree(2);
		root.left.parent = root;
		root.right = new Program.BinaryTree(3);
		root.right.parent = root;
		root.left.left = new Program.BinaryTree(4);
		root.left.left.parent = root.left;
		root.left.right = new Program.BinaryTree(5);
		root.left.right.parent = root.left;
		root.left.left.left = new Program.BinaryTree(6);
		root.left.left.left.parent = root.left.left;
		Program.BinaryTree node = root.left.right;
		Program.BinaryTree expected = root;
		Program.BinaryTree actual = new Program().FindSuccessor(root, node);
		Utils.AssertEquals(expected, actual);
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
		public BinaryTree parent = null;

		public BinaryTree(int value) {
			this.value = value;
		}
	}

	// O(n) time | O(n) space - where n is the number of nodes in the tree
	public BinaryTree FindSuccessor(BinaryTree tree, BinaryTree node) {
		List<BinaryTree> inOrderTraversalOrder = new List<BinaryTree>();
		getInOrderTraversalOrder(tree, inOrderTraversalOrder);

		for (int i = 0; i < inOrderTraversalOrder.Count; i++) {
			BinaryTree currentNode = inOrderTraversalOrder[i];

			if (currentNode != node) {
				continue;
			}

			if (i == inOrderTraversalOrder.Count - 1) {
				return null;
			}
			return inOrderTraversalOrder[i + 1];
		}
		return null;
	}

	void getInOrderTraversalOrder(BinaryTree node, List<BinaryTree> order) {
		if (node == null) {
			return;
		}

		getInOrderTraversalOrder(node.left, order);
		order.Add(node);
		getInOrderTraversalOrder(node.right, order);
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
		public BinaryTree parent = null;

		public BinaryTree(int value) {
			this.value = value;
		}
	}

	// O(h) time | O(1) space - where h is the height of the tree
	public BinaryTree FindSuccessor(BinaryTree tree, BinaryTree node) {
		if (node.right != null) return getLeftmostChild(node.right);
		return getRightmostParent(node);
	}

	public BinaryTree getLeftmostChild(BinaryTree node) {
		BinaryTree currentNode = node;
		while (currentNode.left != null) {
			currentNode = currentNode.left;
		}

		return currentNode;
	}

	public BinaryTree getRightmostParent(BinaryTree node) {
		BinaryTree currentNode = node;
		while (currentNode.parent != null && currentNode.parent.right == currentNode) {
			currentNode = currentNode.parent;
		}

		return currentNode.parent;
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
		root.left = new Program.BinaryTree(2);
		root.left.parent = root;
		root.right = new Program.BinaryTree(3);
		root.right.parent = root;
		root.left.left = new Program.BinaryTree(4);
		root.left.left.parent = root.left;
		root.left.right = new Program.BinaryTree(5);
		root.left.right.parent = root.left;
		root.left.left.left = new Program.BinaryTree(6);
		root.left.left.left.parent = root.left.left;
		Program.BinaryTree node = root.left.right;
		Program.BinaryTree expected = root;
		Program.BinaryTree actual = new Program().FindSuccessor(root, node);
		Utils.AssertEquals(expected, actual);
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
	root.Left.Parent = root
	root.Right = &BinaryTree{Value: 3}
	root.Right.Parent = root
	root.Left.Left = &BinaryTree{Value: 4}
	root.Left.Left.Parent = root.Left
	root.Left.Right = &BinaryTree{Value: 5}
	root.Left.Right.Parent = root.Left
	root.Left.Left.Left = &BinaryTree{Value: 6}
	root.Left.Left.Left.Parent = root.Left.Left
	node := root.Left.Right
	expected := root
	actual := FindSuccessor(root, node)
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

	Left   *BinaryTree
	Right  *BinaryTree
	Parent *BinaryTree
}

// O(n) time | O(n) space - where n is the number of nodes in the tree
func FindSuccessor(tree *BinaryTree, node *BinaryTree) *BinaryTree {
	inOrderTraversalOrder := []*BinaryTree{}
	getInOrderTraversalOrder(tree, &inOrderTraversalOrder)

	for idx, currentNode := range inOrderTraversalOrder {
		if currentNode != node {
			continue
		}

		if idx == len(inOrderTraversalOrder)-1 {
			return nil
		}
		return inOrderTraversalOrder[idx+1]
	}
	return nil
}

func getInOrderTraversalOrder(node *BinaryTree, order *[]*BinaryTree) {
	if node == nil {
		return
	}

	getInOrderTraversalOrder(node.Left, order)
	*order = append(*order, node)
	getInOrderTraversalOrder(node.Right, order)
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// This is an input class. Do not edit.
type BinaryTree struct {
	Value int

	Left   *BinaryTree
	Right  *BinaryTree
	Parent *BinaryTree
}

// O(h) time | O(1) space - where h is the height of the tree
func FindSuccessor(tree *BinaryTree, node *BinaryTree) *BinaryTree {
	if node.Right != nil {
		return getLeftmostChild(node.Right)
	}
	return getRightmostParent(node)
}

func getLeftmostChild(node *BinaryTree) *BinaryTree {
	var currentNode = node
	for currentNode.Left != nil {
		currentNode = currentNode.Left
	}

	return currentNode
}

func getRightmostParent(node *BinaryTree) *BinaryTree {
	var currentNode = node
	for currentNode.Parent != nil && currentNode.Parent.Right == currentNode {
		currentNode = currentNode.Parent
	}

	return currentNode.Parent
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
	root.Left.Parent = root
	root.Right = &BinaryTree{Value: 3}
	root.Right.Parent = root
	root.Left.Left = &BinaryTree{Value: 4}
	root.Left.Left.Parent = root.Left
	root.Left.Right = &BinaryTree{Value: 5}
	root.Left.Right.Parent = root.Left
	root.Left.Left.Left = &BinaryTree{Value: 6}
	root.Left.Left.Left.Parent = root.Left.Left
	node := root.Left.Right
	expected := root
	actual := FindSuccessor(root, node)
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
    root.left = new Program.BinaryTree(2);
    root.left.parent = root;
    root.right = new Program.BinaryTree(3);
    root.right.parent = root;
    root.left.left = new Program.BinaryTree(4);
    root.left.left.parent = root.left;
    root.left.right = new Program.BinaryTree(5);
    root.left.right.parent = root.left;
    root.left.left.left = new Program.BinaryTree(6);
    root.left.left.left.parent = root.left.left;
    Program.BinaryTree node = root.left.right;
    Program.BinaryTree expected = root;
    Program.BinaryTree output = new Program().findSuccessor(root, node);
    assert (expected == output);
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
    public BinaryTree parent = null;

    public BinaryTree(int value) {
      this.value = value;
    }
  }

  // O(n) time | O(n) space - where n is the number of nodes in the tree
  public BinaryTree findSuccessor(BinaryTree tree, BinaryTree node) {
    ArrayList<BinaryTree> inOrderTraversalOrder = new ArrayList<BinaryTree>();
    getInOrderTraversalOrder(tree, inOrderTraversalOrder);

    for (int i = 0; i < inOrderTraversalOrder.size(); i++) {
      BinaryTree currentNode = inOrderTraversalOrder.get(i);

      if (currentNode != node) {
        continue;
      }

      if (i == inOrderTraversalOrder.size() - 1) {
        return null;
      }
      return inOrderTraversalOrder.get(i + 1);
    }
    return null;
  }

  void getInOrderTraversalOrder(BinaryTree node, ArrayList<BinaryTree> order) {
    if (node == null) {
      return;
    }

    getInOrderTraversalOrder(node.left, order);
    order.add(node);
    getInOrderTraversalOrder(node.right, order);
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
    public BinaryTree parent = null;

    public BinaryTree(int value) {
      this.value = value;
    }
  }

  // O(h) time | O(1) space - where h is the height of the tree
  public BinaryTree findSuccessor(BinaryTree tree, BinaryTree node) {
    if (node.right != null) return getLeftmostChild(node.right);
    return getRightmostParent(node);
  }

  public BinaryTree getLeftmostChild(BinaryTree node) {
    BinaryTree currentNode = node;
    while (currentNode.left != null) {
      currentNode = currentNode.left;
    }

    return currentNode;
  }

  public BinaryTree getRightmostParent(BinaryTree node) {
    BinaryTree currentNode = node;
    while (currentNode.parent != null && currentNode.parent.right == currentNode) {
      currentNode = currentNode.parent;
    }

    return currentNode.parent;
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
    root.left = new Program.BinaryTree(2);
    root.left.parent = root;
    root.right = new Program.BinaryTree(3);
    root.right.parent = root;
    root.left.left = new Program.BinaryTree(4);
    root.left.left.parent = root.left;
    root.left.right = new Program.BinaryTree(5);
    root.left.right.parent = root.left;
    root.left.left.left = new Program.BinaryTree(6);
    root.left.left.left.parent = root.left.left;
    Program.BinaryTree node = root.left.right;
    Program.BinaryTree expected = root;
    Program.BinaryTree output = new Program().findSuccessor(root, node);
    assert (expected == output);
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
  root.left = new program.BinaryTree(2);
  root.left.parent = root;
  root.right = new program.BinaryTree(3);
  root.right.parent = root;
  root.left.left = new program.BinaryTree(4);
  root.left.left.parent = root.left;
  root.left.right = new program.BinaryTree(5);
  root.left.right.parent = root.left;
  root.left.left.left = new program.BinaryTree(6);
  root.left.left.left.parent = root.left.left;
  const node = root.left.right;
  const expected = root;
  const actual = program.findSuccessor(root, node);
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
    this.parent = null;
  }
}

// O(n) time | O(n) space - where n is the number of nodes in the tree
function findSuccessor(tree, node) {
  const inOrderTraversalOrder = getInOrderTraversalOrder(tree);

  for (let idx = 0; idx < inOrderTraversalOrder.length; idx++) {
    const currentNode = inOrderTraversalOrder[idx];
    if (currentNode !== node) continue;

    if (idx === inOrderTraversalOrder.length - 1) return null;

    return inOrderTraversalOrder[idx + 1];
  }
}

function getInOrderTraversalOrder(node, order = []) {
  if (node === null) return order;

  getInOrderTraversalOrder(node.left, order);
  order.push(node);
  getInOrderTraversalOrder(node.right, order);

  return order;
}

// Do not edit the lines below.
exports.BinaryTree = BinaryTree;
exports.findSuccessor = findSuccessor;

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
    this.parent = null;
  }
}

// O(h) time | O(1) space - where h is the height of the tree
function findSuccessor(tree, node) {
  if (node.right != null) return getLeftmostChild(node.right);

  return getRightmostParent(node);
}

function getLeftmostChild(node) {
  let currentNode = node;
  while (currentNode.left !== null) {
    currentNode = currentNode.left;
  }

  return currentNode;
}

function getRightmostParent(node) {
  let currentNode = node;
  while (currentNode.parent !== null && currentNode.parent.right === currentNode) {
    currentNode = currentNode.parent;
  }

  return currentNode.parent;
}

// Do not edit the lines below.
exports.BinaryTree = BinaryTree;
exports.findSuccessor = findSuccessor;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const root = new program.BinaryTree(1);
  root.left = new program.BinaryTree(2);
  root.left.parent = root;
  root.right = new program.BinaryTree(3);
  root.right.parent = root;
  root.left.left = new program.BinaryTree(4);
  root.left.left.parent = root.left;
  root.left.right = new program.BinaryTree(5);
  root.left.right.parent = root.left;
  root.left.left.left = new program.BinaryTree(6);
  root.left.left.left.parent = root.left.left;
  const node = root.left.right;
  const expected = root;
  const actual = program.findSuccessor(root, node);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.BinaryTree
import com.algoexpert.program.findSuccessor

class ProgramTest {
    @Test
    fun TestCase1() {
        val root = BinaryTree(1)
        root.left = BinaryTree(2)
        root.left!!.parent = root
        root.right = BinaryTree(3)
        root.right!!.parent = root
        root.left!!.left = BinaryTree(4)
        root.left!!.left!!.parent = root.left!!
        root.left!!.right = BinaryTree(5)
        root.left!!.right!!.parent = root.left!!
        root.left!!.left!!.left = BinaryTree(6)
        root.left!!.left!!.left!!.parent = root.left!!.left!!
        val node = root.left!!.right!!
        val expected = root
        val output = findSuccessor(root, node)
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
    var parent: BinaryTree? = null
}

// O(n) time | O(n) space - where n is the number of nodes in the tree
fun findSuccessor(tree: BinaryTree, node: BinaryTree): BinaryTree? {
    val inOrderTraversalOrder = getInOrderTraversalOrder(tree)

    for (idx in 0 until inOrderTraversalOrder.size) {
        val currentNode = inOrderTraversalOrder[idx]
        if (currentNode != node) continue

        if (idx == inOrderTraversalOrder.size - 1) return null

        return inOrderTraversalOrder[idx + 1]
    }

    return null
}

fun getInOrderTraversalOrder(node: BinaryTree?, order: MutableList<BinaryTree> = mutableListOf<BinaryTree>()): List<BinaryTree> {
    if (node == null) return order

    getInOrderTraversalOrder(node.left, order)
    order.add(node)
    getInOrderTraversalOrder(node.right, order)

    return order
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
    var parent: BinaryTree? = null
}

// O(h) time | O(1) space - where h is the height of the tree
fun findSuccessor(tree: BinaryTree, node: BinaryTree): BinaryTree? {
    if (node.right != null) return getLeftmostChild(node.right!!)

    return getRightmostParent(node)
}

fun getLeftmostChild(node: BinaryTree): BinaryTree {
    var currentNode = node
    while (currentNode.left != null) {
        currentNode = currentNode.left!!
    }

    return currentNode
}

fun getRightmostParent(node: BinaryTree): BinaryTree? {
    var currentNode = node
    while (currentNode.parent != null && currentNode.parent!!.right == currentNode) {
        currentNode = currentNode.parent!!
    }

    return currentNode.parent
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.BinaryTree
import com.algoexpert.program.findSuccessor

class ProgramTest {
    @Test
    fun TestCase1() {
        val root = BinaryTree(1)
        root.left = BinaryTree(2)
        root.left!!.parent = root
        root.right = BinaryTree(3)
        root.right!!.parent = root
        root.left!!.left = BinaryTree(4)
        root.left!!.left!!.parent = root.left!!
        root.left!!.right = BinaryTree(5)
        root.left!!.right!!.parent = root.left!!
        root.left!!.left!!.left = BinaryTree(6)
        root.left!!.left!!.left!!.parent = root.left!!.left!!
        val node = root.left!!.right!!
        val expected = root
        val output = findSuccessor(root, node)
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
      root.left!.parent = root
      root.right = Program.BinaryTree(value: 3)
      root.right!.parent = root
      root.left!.left = Program.BinaryTree(value: 4)
      root.left!.left!.parent = root.left
      root.left!.right = Program.BinaryTree(value: 5)
      root.left!.right!.parent = root.left
      root.left!.left!.left = Program.BinaryTree(value: 6)
      root.left!.left!.left!.parent = root.left!.left
      var node = root.left!.right!
      var expected = root
      var actual = Program().findSuccessor(root, node)
      try assert(expected === actual)
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
    var parent: BinaryTree?

    init(value: Int) {
      self.value = value
      left = nil
      right = nil
      parent = nil
    }
  }

  // O(n) time | O(n) space - where n is the number of nodes in the tree
  func findSuccessor(_ tree: BinaryTree, _ node: BinaryTree) -> BinaryTree? {
    var inOrderTraversalOrder = [BinaryTree]()
    getInOrderTraversalOrder(tree, &inOrderTraversalOrder)

    for idx in stride(from: 0, to: inOrderTraversalOrder.count, by: 1) {
      var currentNode = inOrderTraversalOrder[idx]
      if currentNode !== node {
        continue
      }

      if idx == inOrderTraversalOrder.count - 1 {
        return nil
      }
      return inOrderTraversalOrder[idx + 1]
    }
    return nil
  }

  func getInOrderTraversalOrder(_ node: BinaryTree?, _ order: inout [BinaryTree]) {
    if node == nil {
      return
    }

    getInOrderTraversalOrder(node!.left, &order)
    order.append(node!)
    getInOrderTraversalOrder(node!.right, &order)
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
    var parent: BinaryTree?

    init(value: Int) {
      self.value = value
      left = nil
      right = nil
      parent = nil
    }
  }

  // O(h) time | O(1) space - where h is the height of the tree
  func findSuccessor(_ tree: BinaryTree, _ node: BinaryTree) -> BinaryTree? {
    if node.right != nil {
      return getLeftmostChild(node.right!)
    }
    return getRightmostParent(node)
  }

  func getLeftmostChild(_ node: BinaryTree) -> BinaryTree {
    var currentNode = node
    while currentNode.left != nil {
      currentNode = currentNode.left!
    }
    return currentNode
  }

  func getRightmostParent(_ node: BinaryTree) -> BinaryTree? {
    var currentNode = node
    while currentNode.parent != nil, currentNode.parent!.right === currentNode {
      currentNode = currentNode.parent!
    }
    return currentNode.parent
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
      root.left!.parent = root
      root.right = Program.BinaryTree(value: 3)
      root.right!.parent = root
      root.left!.left = Program.BinaryTree(value: 4)
      root.left!.left!.parent = root.left
      root.left!.right = Program.BinaryTree(value: 5)
      root.left!.right!.parent = root.left
      root.left!.left!.left = Program.BinaryTree(value: 6)
      root.left!.left!.left!.parent = root.left!.left
      var node = root.left!.right!
      var expected = root
      var actual = Program().findSuccessor(root, node)
      try assert(expected === actual)
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
        root.left.parent = root
        root.right = program.BinaryTree(3)
        root.right.parent = root
        root.left.left = program.BinaryTree(4)
        root.left.left.parent = root.left
        root.left.right = program.BinaryTree(5)
        root.left.right.parent = root.left
        root.left.left.left = program.BinaryTree(6)
        root.left.left.left.parent = root.left.left
        node = root.left.right
        expected = root
        actual = program.findSuccessor(root, node)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# This is an input class. Do not edit.
class BinaryTree:
    def __init__(self, value, left=None, right=None, parent=None):
        self.value = value
        self.left = left
        self.right = right
        self.parent = parent


# O(n) time | O(n) space - where n is the number of nodes in the tree
def findSuccessor(tree, node):
    inOrderTraversalOrder = getInOrderTraversalOrder(tree)

    for idx, currentNode in enumerate(inOrderTraversalOrder):
        if currentNode != node:
            continue

        if idx == len(inOrderTraversalOrder) - 1:
            return None

        return inOrderTraversalOrder[idx + 1]


def getInOrderTraversalOrder(node, order=[]):
    if node is None:
        return order

    getInOrderTraversalOrder(node.left, order)
    order.append(node)
    getInOrderTraversalOrder(node.right, order)

    return order

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# This is an input class. Do not edit.
class BinaryTree:
    def __init__(self, value, left=None, right=None, parent=None):
        self.value = value
        self.left = left
        self.right = right
        self.parent = parent


# O(h) time | O(1) space - where h is the height of the tree
def findSuccessor(tree, node):
    if node.right is not None:
        return getLeftmostChild(node.right)

    return getRightmostParent(node)


def getLeftmostChild(node):
    currentNode = node
    while currentNode.left is not None:
        currentNode = currentNode.left

    return currentNode


def getRightmostParent(node):
    currentNode = node
    while currentNode.parent is not None and currentNode.parent.right == currentNode:
        currentNode = currentNode.parent

    return currentNode.parent

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        root = program.BinaryTree(1)
        root.left = program.BinaryTree(2)
        root.left.parent = root
        root.right = program.BinaryTree(3)
        root.right.parent = root
        root.left.left = program.BinaryTree(4)
        root.left.left.parent = root.left
        root.left.right = program.BinaryTree(5)
        root.left.right.parent = root.left
        root.left.left.left = program.BinaryTree(6)
        root.left.left.left.parent = root.left.left
        node = root.left.right
        expected = root
        actual = program.findSuccessor(root, node)
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
  root.left = new program.BinaryTree(2);
  root.left.parent = root;
  root.right = new program.BinaryTree(3);
  root.right.parent = root;
  root.left.left = new program.BinaryTree(4);
  root.left.left.parent = root.left;
  root.left.right = new program.BinaryTree(5);
  root.left.right.parent = root.left;
  root.left.left.left = new program.BinaryTree(6);
  root.left.left.left.parent = root.left.left;
  const node = root.left.right;
  const expected = root;
  const actual = program.findSuccessor(root, node);
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
  parent: BinaryTree | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

// O(n) time | O(n) space - where n is the number of nodes in the tree
export function findSuccessor(tree: BinaryTree, node: BinaryTree) {
  const inOrderTraversalOrder = getInOrderTraversalOrder(tree);

  for (let idx = 0; idx < inOrderTraversalOrder.length; idx++) {
    const currentNode = inOrderTraversalOrder[idx];
    if (currentNode !== node) continue;

    if (idx === inOrderTraversalOrder.length - 1) return null;

    return inOrderTraversalOrder[idx + 1];
  }
}

function getInOrderTraversalOrder(node: BinaryTree | null, order: BinaryTree[] = []) {
  if (node === null) return order;

  getInOrderTraversalOrder(node.left, order);
  order.push(node);
  getInOrderTraversalOrder(node.right, order);

  return order;
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
  parent: BinaryTree | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

// O(h) time | O(1) space - where h is the height of the tree
export function findSuccessor(tree: BinaryTree, node: BinaryTree) {
  if (node.right != null) return getLeftmostChild(node.right);

  return getRightmostParent(node);
}

function getLeftmostChild(node: BinaryTree) {
  let currentNode = node;
  while (currentNode.left !== null) {
    currentNode = currentNode.left;
  }

  return currentNode;
}

function getRightmostParent(node: BinaryTree) {
  let currentNode = node;
  while (currentNode.parent !== null && currentNode.parent.right === currentNode) {
    currentNode = currentNode.parent;
  }

  return currentNode.parent;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const root = new program.BinaryTree(1);
  root.left = new program.BinaryTree(2);
  root.left.parent = root;
  root.right = new program.BinaryTree(3);
  root.right.parent = root;
  root.left.left = new program.BinaryTree(4);
  root.left.left.parent = root.left;
  root.left.right = new program.BinaryTree(5);
  root.left.right.parent = root.left;
  root.left.left.left = new program.BinaryTree(6);
  root.left.left.left.parent = root.left.left;
  const node = root.left.right;
  const expected = root;
  const actual = program.findSuccessor(root, node);
  chai.expect(actual).to.deep.equal(expected);
});

```

