# Flatten Binary Tree
<div class="html">
<p>
  Write a function that takes in a Binary Tree, flattens it, and returns its
  leftmost node.
</p>
<p>
  A flattened Binary Tree is a structure that's nearly identical to a Doubly
  Linked List (except that nodes have <span>left</span> and
  <span>right</span> pointers instead of <span>prev</span> and
  <span>next</span> pointers), where nodes follow the original tree's
  left-to-right order.
</p>
<p>
  Note that if the input Binary Tree happens to be a valid Binary Search Tree,
  the nodes in the flattened tree will be sorted.
</p>
<p>
  The flattening should be done in place, meaning that the original data
  structure should be mutated (no new structure should be created).
</p>
<p>
  Each <span>BinaryTree</span> node has an integer <span>value</span>, a
  <span>left</span> child node, and a <span>right</span> child node. Children
  nodes can either be <span>BinaryTree</span> nodes themselves or
  <span>None</span> / <span>null</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">tree</span> =      1
         /     \
        2       3
      /   \   /
     4     5 6
          / \
         7   8
</pre>
<h3>Sample Output</h3>
<pre>
4 <-> 2 <-> 7 <-> 5 <-> 8 <-> 1 <-> 6 <-> 3 <span class="CodeEditor-promptComment">// the leftmost node with value 4</span>
</pre>
</div>

Hint 1
<p>
You can solve this problem pretty easily by traversing the tree using the in-order tree-traversal technique, gathering all of the nodes in an array, and then iterating through them from left to right and connecting them accordingly. Can you solve this problem without storing an entire array of the tree's nodes?
</p>


Hint 2

<p>
Try to figure out what the relation between two adjacent nodes in the in-order-traversal order is, as far as positioning in the tree is concerned.
</p>


Hint 3

<p>
At any given node in the in-order-traversal order, the node immediately to its left is the rightmost node of its left subtree, and the node immediately the its right is the leftmost node of its right subtree.
</p>


Hint 4

<p>
Write a function that recursively gets the leftmost and rightmost nodes of a given node's left subtree and right subtree and that connects the left subtree's rightmost node to the given node and the right subtree's leftmost node to the given node.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

#include <queue>

BinaryTree::BinaryTree(int value) { this->value = value; }

BinaryTree *insertBinaryTree(BinaryTree *tree, vector<int> values);
vector<int> leftToRightToLeft(BinaryTree *tree);

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      BinaryTree *root = new BinaryTree(1);
      insertBinaryTree(root, {2, 3, 4, 5, 6});
      root->left->right->left = new BinaryTree(7);
      root->left->right->right = new BinaryTree(8);
      BinaryTree *leftMostNode = flattenBinaryTree(root);
      vector<int> actual = leftToRightToLeft(leftMostNode);
      vector<int> expected = {4, 2, 7, 5, 8, 1, 6, 3, 3, 6, 1, 8, 5, 7, 2, 4};
      assert(expected == actual);
    });
  }
};

BinaryTree *insertBinaryTree(BinaryTree *tree, vector<int> values) {
  if (values.size() == 0)
    return tree;

  queue<BinaryTree *> nodesQueue({tree});
  while (nodesQueue.size() > 0) {
    BinaryTree *current = nodesQueue.front();
    nodesQueue.pop();
    if (current->left == nullptr) {
      current->left = new BinaryTree(values[0]);
      break;
    }
    nodesQueue.push(current->left);
    if (current->right == nullptr) {
      current->right = new BinaryTree(values[0]);
      break;
    }
    nodesQueue.push(current->right);
  }

  values.erase(values.begin());
  return insertBinaryTree(tree, values);
}

vector<int> leftToRightToLeft(BinaryTree *tree) {
  vector<int> nodes = {};
  BinaryTree *current = tree;
  while (current->right != nullptr) {
    nodes.push_back(current->value);
    current = current->right;
  }
  nodes.push_back(current->value);
  while (current != nullptr) {
    nodes.push_back(current->value);
    current = current->left;
  }
  return nodes;
}

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

class BinaryTree {
public:
  int value;
  BinaryTree *left = nullptr;
  BinaryTree *right = nullptr;

  BinaryTree(int value);
};

vector<BinaryTree *> getNodesInOrder(BinaryTree *tree,
                                     vector<BinaryTree *> *array);

// O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
BinaryTree *flattenBinaryTree(BinaryTree *root) {
  vector<BinaryTree *> inOrderNodes =
      getNodesInOrder(root, new vector<BinaryTree *>{});
  for (int i = 0; i < inOrderNodes.size() - 1; i++) {
    BinaryTree *leftNode = inOrderNodes[i];
    BinaryTree *rightNode = inOrderNodes[i + 1];
    leftNode->right = rightNode;
    rightNode->left = leftNode;
  }
  return inOrderNodes[0];
}

vector<BinaryTree *> getNodesInOrder(BinaryTree *tree,
                                     vector<BinaryTree *> *array) {
  if (tree != nullptr) {
    getNodesInOrder(tree->left, array);
    array->push_back(tree);
    getNodesInOrder(tree->right, array);
  }
  return *array;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

class BinaryTree {
public:
  int value;
  BinaryTree *left = nullptr;
  BinaryTree *right = nullptr;

  BinaryTree(int value);
};

vector<BinaryTree *> flattenTree(BinaryTree *node);
void connectNodes(BinaryTree *one, BinaryTree *two);

// O(n) time | O(d) space - where n is the number of nodes in the Binary Tree
// and d is the depth (height) of the Binary Tree
BinaryTree *flattenBinaryTree(BinaryTree *root) {
  BinaryTree *leftMost = flattenTree(root)[0];
  return leftMost;
}

vector<BinaryTree *> flattenTree(BinaryTree *node) {
  BinaryTree *leftMost;
  BinaryTree *rightMost;

  if (node->left == nullptr) {
    leftMost = node;
  } else {
    vector<BinaryTree *> leftAndRightMostNodes = flattenTree(node->left);
    connectNodes(leftAndRightMostNodes[1], node);
    leftMost = leftAndRightMostNodes[0];
  }

  if (node->right == nullptr) {
    rightMost = node;
  } else {
    vector<BinaryTree *> leftAndRightMostNodes = flattenTree(node->right);
    connectNodes(node, leftAndRightMostNodes[0]);
    rightMost = leftAndRightMostNodes[1];
  }

  return {leftMost, rightMost};
}

void connectNodes(BinaryTree *left, BinaryTree *right) {
  left->right = right;
  right->left = left;
}

```
### Unit Tests 1 (cpp)
```cpp
#include <queue>

BinaryTree::BinaryTree(int value) { this->value = value; }

BinaryTree *insertBinaryTree(BinaryTree *tree, vector<int> values);
vector<int> leftToRightToLeft(BinaryTree *tree);

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      BinaryTree *root = new BinaryTree(1);
      insertBinaryTree(root, {2, 3, 4, 5, 6});
      root->left->right->left = new BinaryTree(7);
      root->left->right->right = new BinaryTree(8);
      BinaryTree *leftMostNode = flattenBinaryTree(root);
      vector<int> actual = leftToRightToLeft(leftMostNode);
      vector<int> expected = {4, 2, 7, 5, 8, 1, 6, 3, 3, 6, 1, 8, 5, 7, 2, 4};
      assert(expected == actual);
    });
  }
};

BinaryTree *insertBinaryTree(BinaryTree *tree, vector<int> values) {
  if (values.size() == 0)
    return tree;

  queue<BinaryTree *> nodesQueue({tree});
  while (nodesQueue.size() > 0) {
    BinaryTree *current = nodesQueue.front();
    nodesQueue.pop();
    if (current->left == nullptr) {
      current->left = new BinaryTree(values[0]);
      break;
    }
    nodesQueue.push(current->left);
    if (current->right == nullptr) {
      current->right = new BinaryTree(values[0]);
      break;
    }
    nodesQueue.push(current->right);
  }

  values.erase(values.begin());
  return insertBinaryTree(tree, values);
}

vector<int> leftToRightToLeft(BinaryTree *tree) {
  vector<int> nodes = {};
  BinaryTree *current = tree;
  while (current->right != nullptr) {
    nodes.push_back(current->value);
    current = current->right;
  }
  nodes.push_back(current->value);
  while (current != nullptr) {
    nodes.push_back(current->value);
    current = current->left;
  }
  return nodes;
}

```
### Sandbox Code (csharp)
```csharp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

using System.Linq;
using System.Collections;
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		Program.BinaryTree root = new Program.BinaryTree(1);
		insert(root, new int[] {2, 3, 4, 5, 6});
		root.left.right.left = new Program.BinaryTree(7);
		root.left.right.right = new Program.BinaryTree(8);
		Program.BinaryTree leftMostNode = Program.FlattenBinaryTree(root);
		List<int> leftToRightToLeft = this.leftToRightToLeft(leftMostNode);
		List<int> expected = new List<int>(){
			4, 2, 7, 5, 8, 1, 6, 3, 3, 6, 1, 8, 5, 7, 2, 4
		};
		Utils.AssertTrue(expected.SequenceEqual(leftToRightToLeft));
	}

	public void insert(Program.BinaryTree root, int[] values) {
		insert(root, values, 0);
	}

	public void insert(Program.BinaryTree root, int[] values, int i) {
		if (i >= values.Length) {
			return;
		}
		Queue<Program.BinaryTree> queue = new Queue<Program.BinaryTree>();
		queue.Enqueue(root);
		while (queue.Count > 0) {
			Program.BinaryTree current = queue.Dequeue();
			if (current.left == null) {
				current.left = new Program.BinaryTree(values[i]);
				break;
			}
			queue.Enqueue(current.left);
			if (current.right == null) {
				current.right = new Program.BinaryTree(values[i]);
				break;
			}
			queue.Enqueue(current.right);
		}
		insert(root, values, i + 1);
	}

	public List<int> leftToRightToLeft(Program.BinaryTree leftMost) {
		List<int> nodes = new List<int>();
		Program.BinaryTree current = leftMost;
		while (current.right != null) {
			nodes.Add(current.value);
			current = current.right;
		}
		nodes.Add(current.value);
		while (current != null) {
			nodes.Add(current.value);
			current = current.left;
		}
		return nodes;
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
	public static BinaryTree FlattenBinaryTree(BinaryTree root) {
		List<BinaryTree> inOrderNodes = getNodesInOrder(root, new List<BinaryTree>());
		for (int i = 0; i < inOrderNodes.Count - 1; i++) {
			BinaryTree leftNode = inOrderNodes[i];
			BinaryTree rightNode = inOrderNodes[i + 1];
			leftNode.right = rightNode;
			rightNode.left = leftNode;
		}
		return inOrderNodes[0];
	}

	public static List<BinaryTree> getNodesInOrder(BinaryTree tree, List<BinaryTree> array) {
		if (tree != null) {
			getNodesInOrder(tree.left, array);
			array.Add(tree);
			getNodesInOrder(tree.right, array);
		}
		return array;
	}

	public class BinaryTree {
		public int value;
		public BinaryTree left = null;
		public BinaryTree right = null;

		public BinaryTree(int value) {
			this.value = value;
		}
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(n) time | O(d) space - where n is the number of nodes in the Binary
	// Tree and d is the depth (height) of the Binary Tree
	public static BinaryTree FlattenBinaryTree(BinaryTree root) {
		BinaryTree leftMost = flattenTree(root)[0];
		return leftMost;
	}

	public static BinaryTree[] flattenTree(BinaryTree node) {
		BinaryTree leftMost;
		BinaryTree rightMost;

		if (node.left == null) {
			leftMost = node;
		} else {
			BinaryTree[] leftAndRightMostNodes = flattenTree(node.left);
			connectNodes(leftAndRightMostNodes[1], node);
			leftMost = leftAndRightMostNodes[0];
		}

		if (node.right == null) {
			rightMost = node;
		} else {
			BinaryTree[] leftAndRightMostNodes = flattenTree(node.right);
			connectNodes(node, leftAndRightMostNodes[0]);
			rightMost = leftAndRightMostNodes[1];
		}

		return new BinaryTree[] {leftMost, rightMost};
	}

	public static void connectNodes(BinaryTree left, BinaryTree right) {
		left.right = right;
		right.left = left;
	}

	public class BinaryTree {
		public int value;
		public BinaryTree left = null;
		public BinaryTree right = null;

		public BinaryTree(int value) {
			this.value = value;
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Linq;
using System.Collections;
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		Program.BinaryTree root = new Program.BinaryTree(1);
		insert(root, new int[] {2, 3, 4, 5, 6});
		root.left.right.left = new Program.BinaryTree(7);
		root.left.right.right = new Program.BinaryTree(8);
		Program.BinaryTree leftMostNode = Program.FlattenBinaryTree(root);
		List<int> leftToRightToLeft = this.leftToRightToLeft(leftMostNode);
		List<int> expected = new List<int>(){
			4, 2, 7, 5, 8, 1, 6, 3, 3, 6, 1, 8, 5, 7, 2, 4
		};
		Utils.AssertTrue(expected.SequenceEqual(leftToRightToLeft));
	}

	public void insert(Program.BinaryTree root, int[] values) {
		insert(root, values, 0);
	}

	public void insert(Program.BinaryTree root, int[] values, int i) {
		if (i >= values.Length) {
			return;
		}
		Queue<Program.BinaryTree> queue = new Queue<Program.BinaryTree>();
		queue.Enqueue(root);
		while (queue.Count > 0) {
			Program.BinaryTree current = queue.Dequeue();
			if (current.left == null) {
				current.left = new Program.BinaryTree(values[i]);
				break;
			}
			queue.Enqueue(current.left);
			if (current.right == null) {
				current.right = new Program.BinaryTree(values[i]);
				break;
			}
			queue.Enqueue(current.right);
		}
		insert(root, values, i + 1);
	}

	public List<int> leftToRightToLeft(Program.BinaryTree leftMost) {
		List<int> nodes = new List<int>();
		Program.BinaryTree current = leftMost;
		while (current.right != null) {
			nodes.Add(current.value);
			current = current.right;
		}
		nodes.Add(current.value);
		while (current != null) {
			nodes.Add(current.value);
			current = current.left;
		}
		return nodes;
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

func NewBinaryTree(value int) *BinaryTree {
	return &BinaryTree{Value: value}
}

func (tree *BinaryTree) insert(value int) *BinaryTree {
	queue := []*BinaryTree{tree}
	for len(queue) > 0 {
		var current *BinaryTree
		queue, current = queue[1:], queue[0]
		if current.Left == nil {
			current.Left = NewBinaryTree(value)
			return tree
		}
		queue = append(queue, current.Left)

		if current.Right == nil {
			current.Right = NewBinaryTree(value)
			return tree
		}
		queue = append(queue, current.Right)
	}
	return tree
}

func (tree *BinaryTree) insertAll(values ...int) *BinaryTree {
	for _, value := range values {
		tree.insert(value)
	}
	return tree
}

func (tree *BinaryTree) leftToRightToLeft() []int {
	if tree == nil {
		return nil
	}

	subResult := append(tree.Right.leftToRightToLeft(), tree.Value)
	return append([]int{tree.Value}, subResult...)
}

func TestCase1(t *TestCase) {
	root := NewBinaryTree(1).insertAll(2, 3, 4, 5, 6)
	root.Left.Right.Left = NewBinaryTree(7)
	root.Left.Right.Right = NewBinaryTree(8)
	leftMostNode := FlattenBinaryTree(root)
	actual := leftMostNode.leftToRightToLeft()
	expected := []int{4, 2, 7, 5, 8, 1, 6, 3, 3, 6, 1, 8, 5, 7, 2, 4}
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type BinaryTree struct {
	Value int

	Left  *BinaryTree
	Right *BinaryTree
}

// O(n) time | O(n) space - where n is the number of nodes
// in the Binary Tree
func FlattenBinaryTree(root *BinaryTree) *BinaryTree {
	inOrderNodes := []*BinaryTree{}
	getNodesInOrder(root, &inOrderNodes)
	for i := 0; i < len(inOrderNodes)-1; i++ {
		leftNode := inOrderNodes[i]
		rightNode := inOrderNodes[i+1]
		leftNode.Right = rightNode
		rightNode.Left = leftNode
	}
	return inOrderNodes[0]
}

func getNodesInOrder(tree *BinaryTree, array *[]*BinaryTree) {
	if tree != nil {
		getNodesInOrder(tree.Left, array)
		*array = append(*array, tree)
		getNodesInOrder(tree.Right, array)
	}
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type BinaryTree struct {
	Value int

	Left  *BinaryTree
	Right *BinaryTree
}

// O(n) time | O(d) space - where n is the number of nodes in the Binary Tree
// and d is the depth (height) of the Binary Tree
func FlattenBinaryTree(root *BinaryTree) *BinaryTree {
	leftMost, _ := flattenTree(root)
	return leftMost
}

func flattenTree(node *BinaryTree) (leftMost, rightMost *BinaryTree) {
	leftMost = node
	if node.Left != nil {
		leftSubtreeLeftMost, leftSubtreeRightMost := flattenTree(node.Left)
		connectNodes(leftSubtreeRightMost, node)
		leftMost = leftSubtreeLeftMost
	}

	rightMost = node
	if node.Right != nil {
		rightSubtreeLeftMost, rightSubtreeRightMost := flattenTree(node.Right)
		connectNodes(node, rightSubtreeLeftMost)
		rightMost = rightSubtreeRightMost
	}
	return leftMost, rightMost
}

func connectNodes(left, right *BinaryTree) {
	left.Right = right
	right.Left = left
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func NewBinaryTree(value int) *BinaryTree {
	return &BinaryTree{Value: value}
}

func (tree *BinaryTree) insert(value int) *BinaryTree {
	queue := []*BinaryTree{tree}
	for len(queue) > 0 {
		var current *BinaryTree
		queue, current = queue[1:], queue[0]
		if current.Left == nil {
			current.Left = NewBinaryTree(value)
			return tree
		}
		queue = append(queue, current.Left)

		if current.Right == nil {
			current.Right = NewBinaryTree(value)
			return tree
		}
		queue = append(queue, current.Right)
	}
	return tree
}

func (tree *BinaryTree) insertAll(values ...int) *BinaryTree {
	for _, value := range values {
		tree.insert(value)
	}
	return tree
}

func (tree *BinaryTree) leftToRightToLeft() []int {
	if tree == nil {
		return nil
	}

	subResult := append(tree.Right.leftToRightToLeft(), tree.Value)
	return append([]int{tree.Value}, subResult...)
}

func TestCase1(t *TestCase) {
	root := NewBinaryTree(1).insertAll(2, 3, 4, 5, 6)
	root.Left.Right.Left = NewBinaryTree(7)
	root.Left.Right.Right = NewBinaryTree(8)
	leftMostNode := FlattenBinaryTree(root)
	actual := leftMostNode.leftToRightToLeft()
	expected := []int{4, 2, 7, 5, 8, 1, 6, 3, 3, 6, 1, 8, 5, 7, 2, 4}
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
    insert(root, new int[] {2, 3, 4, 5, 6});
    root.left.right.left = new Program.BinaryTree(7);
    root.left.right.right = new Program.BinaryTree(8);
    Program.BinaryTree leftMostNode = Program.flattenBinaryTree(root);
    List<Integer> leftToRightToLeft = leftToRightToLeft(leftMostNode);
    List<Integer> expected =
        new ArrayList<Integer>(Arrays.asList(4, 2, 7, 5, 8, 1, 6, 3, 3, 6, 1, 8, 5, 7, 2, 4));
    Utils.assertTrue(expected.equals(leftToRightToLeft));
  }

  public void insert(Program.BinaryTree root, int[] values) {
    insert(root, values, 0);
  }

  public void insert(Program.BinaryTree root, int[] values, int i) {
    if (i >= values.length) {
      return;
    }
    Deque<Program.BinaryTree> queue = new ArrayDeque<Program.BinaryTree>();
    queue.addLast(root);
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
    insert(root, values, i + 1);
  }

  public List<Integer> leftToRightToLeft(Program.BinaryTree leftMost) {
    List<Integer> nodes = new ArrayList<Integer>();
    Program.BinaryTree current = leftMost;
    while (current.right != null) {
      nodes.add(current.value);
      current = current.right;
    }
    nodes.add(current.value);
    while (current != null) {
      nodes.add(current.value);
      current = current.left;
    }
    return nodes;
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
  public static BinaryTree flattenBinaryTree(BinaryTree root) {
    List<BinaryTree> inOrderNodes = getNodesInOrder(root, new ArrayList<BinaryTree>());
    for (int i = 0; i < inOrderNodes.size() - 1; i++) {
      BinaryTree leftNode = inOrderNodes.get(i);
      BinaryTree rightNode = inOrderNodes.get(i + 1);
      leftNode.right = rightNode;
      rightNode.left = leftNode;
    }
    return inOrderNodes.get(0);
  }

  public static List<BinaryTree> getNodesInOrder(BinaryTree tree, List<BinaryTree> array) {
    if (tree != null) {
      getNodesInOrder(tree.left, array);
      array.add(tree);
      getNodesInOrder(tree.right, array);
    }
    return array;
  }

  static class BinaryTree {
    int value;
    BinaryTree left = null;
    BinaryTree right = null;

    public BinaryTree(int value) {
      this.value = value;
    }
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(d) space - where n is the number of nodes in the Binary Tree
  // and d is the depth (height) of the Binary Tree
  public static BinaryTree flattenBinaryTree(BinaryTree root) {
    BinaryTree leftMost = flattenTree(root)[0];
    return leftMost;
  }

  public static BinaryTree[] flattenTree(BinaryTree node) {
    BinaryTree leftMost;
    BinaryTree rightMost;

    if (node.left == null) {
      leftMost = node;
    } else {
      BinaryTree[] leftAndRightMostNodes = flattenTree(node.left);
      connectNodes(leftAndRightMostNodes[1], node);
      leftMost = leftAndRightMostNodes[0];
    }

    if (node.right == null) {
      rightMost = node;
    } else {
      BinaryTree[] leftAndRightMostNodes = flattenTree(node.right);
      connectNodes(node, leftAndRightMostNodes[0]);
      rightMost = leftAndRightMostNodes[1];
    }

    return new BinaryTree[] {leftMost, rightMost};
  }

  public static void connectNodes(BinaryTree left, BinaryTree right) {
    left.right = right;
    right.left = left;
  }

  static class BinaryTree {
    int value;
    BinaryTree left = null;
    BinaryTree right = null;

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
    Program.BinaryTree root = new Program.BinaryTree(1);
    insert(root, new int[] {2, 3, 4, 5, 6});
    root.left.right.left = new Program.BinaryTree(7);
    root.left.right.right = new Program.BinaryTree(8);
    Program.BinaryTree leftMostNode = Program.flattenBinaryTree(root);
    List<Integer> leftToRightToLeft = leftToRightToLeft(leftMostNode);
    List<Integer> expected =
        new ArrayList<Integer>(Arrays.asList(4, 2, 7, 5, 8, 1, 6, 3, 3, 6, 1, 8, 5, 7, 2, 4));
    Utils.assertTrue(expected.equals(leftToRightToLeft));
  }

  public void insert(Program.BinaryTree root, int[] values) {
    insert(root, values, 0);
  }

  public void insert(Program.BinaryTree root, int[] values, int i) {
    if (i >= values.length) {
      return;
    }
    Deque<Program.BinaryTree> queue = new ArrayDeque<Program.BinaryTree>();
    queue.addLast(root);
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
    insert(root, values, i + 1);
  }

  public List<Integer> leftToRightToLeft(Program.BinaryTree leftMost) {
    List<Integer> nodes = new ArrayList<Integer>();
    Program.BinaryTree current = leftMost;
    while (current.right != null) {
      nodes.add(current.value);
      current = current.right;
    }
    nodes.add(current.value);
    while (current != null) {
      nodes.add(current.value);
      current = current.left;
    }
    return nodes;
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
  const root = new BinaryTree(1).insert([2, 3, 4, 5, 6]);
  root.left.right.left = new BinaryTree(7);
  root.left.right.right = new BinaryTree(8);
  const leftMostNode = program.flattenBinaryTree(root);
  const leftToRightToLeft = leftMostNode.leftToRightToLeft();
  const expected = [4, 2, 7, 5, 8, 1, 6, 3, 3, 6, 1, 8, 5, 7, 2, 4];
  chai.expect(leftToRightToLeft).to.deep.equal(expected);
});

class BinaryTree extends program.BinaryTree {
  constructor(value) {
    super(value);
  }

  insert(values, i = 0) {
    if (i >= values.length) return;
    const queue = [this];
    while (queue.length > 0) {
      let current = queue.shift();
      if (current.left === null) {
        current.left = new BinaryTree(values[i]);
        break;
      }
      queue.push(current.left);
      if (current.right === null) {
        current.right = new BinaryTree(values[i]);
        break;
      }
      queue.push(current.right);
    }
    this.insert(values, i + 1);
    return this;
  }

  leftToRightToLeft() {
    const nodes = [];
    let current = this;
    while (current.right !== null) {
      nodes.push(current.value);
      current = current.right;
    }
    nodes.push(current.value);
    while (current !== null) {
      nodes.push(current.value);
      current = current.left;
    }
    return nodes;
  }
}

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

// O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
function flattenBinaryTree(root) {
  const inOrderNodes = getNodesInOrder(root, []);
  for (let i = 0; i < inOrderNodes.length - 1; i++) {
    const leftNode = inOrderNodes[i];
    const rightNode = inOrderNodes[i + 1];
    leftNode.right = rightNode;
    rightNode.left = leftNode;
  }
  return inOrderNodes[0];
}

function getNodesInOrder(tree, array) {
  if (tree !== null) {
    getNodesInOrder(tree.left, array);
    array.push(tree);
    getNodesInOrder(tree.right, array);
  }
  return array;
}

exports.BinaryTree = BinaryTree;
exports.flattenBinaryTree = flattenBinaryTree;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// O(n) time | O(d) space - where n is the number of nodes in the Binary Tree and d is the depth (height) of the Binary Tree
function flattenBinaryTree(root) {
  const [leftMost, _] = flattenTree(root);
  return leftMost;
}

function flattenTree(node) {
  let leftMost, rightMost;

  if (node.left === null) {
    leftMost = node;
  } else {
    const [leftSubtreeLeftMost, leftSubtreeRightMost] = flattenTree(node.left);
    connectNodes(leftSubtreeRightMost, node);
    leftMost = leftSubtreeLeftMost;
  }

  if (node.right === null) {
    rightMost = node;
  } else {
    const [rightSubtreeLeftMost, rightSubtreeRightMost] = flattenTree(node.right);
    connectNodes(node, rightSubtreeLeftMost);
    rightMost = rightSubtreeRightMost;
  }

  return [leftMost, rightMost];
}

function connectNodes(left, right) {
  left.right = right;
  right.left = left;
}

exports.BinaryTree = BinaryTree;
exports.flattenBinaryTree = flattenBinaryTree;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const root = new BinaryTree(1).insert([2, 3, 4, 5, 6]);
  root.left.right.left = new BinaryTree(7);
  root.left.right.right = new BinaryTree(8);
  const leftMostNode = program.flattenBinaryTree(root);
  const leftToRightToLeft = leftMostNode.leftToRightToLeft();
  const expected = [4, 2, 7, 5, 8, 1, 6, 3, 3, 6, 1, 8, 5, 7, 2, 4];
  chai.expect(leftToRightToLeft).to.deep.equal(expected);
});

class BinaryTree extends program.BinaryTree {
  constructor(value) {
    super(value);
  }

  insert(values, i = 0) {
    if (i >= values.length) return;
    const queue = [this];
    while (queue.length > 0) {
      let current = queue.shift();
      if (current.left === null) {
        current.left = new BinaryTree(values[i]);
        break;
      }
      queue.push(current.left);
      if (current.right === null) {
        current.right = new BinaryTree(values[i]);
        break;
      }
      queue.push(current.right);
    }
    this.insert(values, i + 1);
    return this;
  }

  leftToRightToLeft() {
    const nodes = [];
    let current = this;
    while (current.right !== null) {
      nodes.push(current.value);
      current = current.right;
    }
    nodes.push(current.value);
    while (current !== null) {
      nodes.push(current.value);
      current = current.left;
    }
    return nodes;
  }
}

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.BinaryTree as BinaryTree
import com.algoexpert.program.flattenBinaryTree as flattenBinaryTree

class ProgramTest {
    @Test
    fun TestCase1() {
        val tree = BinaryTree(1)
        tree.left = BinaryTree(2)
        tree.right = BinaryTree(3)
        tree.left!!.left = BinaryTree(4)
        tree.left!!.right = BinaryTree(5)
        tree.right!!.left = BinaryTree(6)
        tree.left!!.right!!.left = BinaryTree(7)
        tree.left!!.right!!.right = BinaryTree(8)

        val leftMostNode = flattenBinaryTree(tree)
        val leftToRightToLeft = getLeftToRightToLeft(leftMostNode)
        val expected = listOf(4, 2, 7, 5, 8, 1, 6, 3, 3, 6, 1, 8, 5, 7, 2, 4)

        assert(leftToRightToLeft == expected)
    }
}

fun getLeftToRightToLeft(tree: BinaryTree): MutableList<Int> {
    val values = mutableListOf<Int>()
    var current: BinaryTree? = tree
    while (current!!.right != null) {
        values.add(current.value)
        current = current.right
    }
    values.add(current.value)
    while (current != null) {
        values.add(current.value)
        current = current.left
    }
    return values
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

open class BinaryTree(value: Int) {
    var value = value
    var left: BinaryTree? = null
    var right: BinaryTree? = null
}

// O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
fun flattenBinaryTree(root: BinaryTree): BinaryTree {
    val inOrderNodes = getNodesInOrder(root, mutableListOf<BinaryTree>())
    for (i in 0 until inOrderNodes.size - 1) {
        val leftNode = inOrderNodes[i]
        val rightNode = inOrderNodes[i + 1]
        leftNode.right = rightNode
        rightNode.left = leftNode
    }
    return inOrderNodes[0]
}

fun getNodesInOrder(tree: BinaryTree?, array: MutableList<BinaryTree>): List<BinaryTree> {
    if (tree != null) {
        getNodesInOrder(tree.left, array)
        array.add(tree)
        getNodesInOrder(tree.right, array)
    }
    return array
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

// O(n) time | O(d) space - where n is the number of nodes in the Binary Tree
// and d is the depth (height) of the Binary Tree
fun flattenBinaryTree(root: BinaryTree): BinaryTree {
    val (leftMost, _) = flattenTree(root)
    return leftMost
}

fun flattenTree(node: BinaryTree): Pair<BinaryTree, BinaryTree> {
    var leftMost: BinaryTree
    var rightMost: BinaryTree

    if (node.left == null) {
        leftMost = node
    } else {
        val (leftSubtreeLeftMost, leftSubtreeRightMost) = flattenTree(node.left!!)
        connectNodes(leftSubtreeRightMost, node)
        leftMost = leftSubtreeLeftMost
    }

    if (node.right == null) {
        rightMost = node
    } else {
        val (rightSubtreeLeftMost, rightSubtreeRightMost) = flattenTree(node.right!!)
        connectNodes(node, rightSubtreeLeftMost)
        rightMost = rightSubtreeRightMost
    }

    return Pair(leftMost, rightMost)
}

fun connectNodes(left: BinaryTree, right: BinaryTree) {
    left.right = right
    right.left = left
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.BinaryTree as BinaryTree
import com.algoexpert.program.flattenBinaryTree as flattenBinaryTree

class ProgramTest {
    @Test
    fun TestCase1() {
        val tree = BinaryTree(1)
        tree.left = BinaryTree(2)
        tree.right = BinaryTree(3)
        tree.left!!.left = BinaryTree(4)
        tree.left!!.right = BinaryTree(5)
        tree.right!!.left = BinaryTree(6)
        tree.left!!.right!!.left = BinaryTree(7)
        tree.left!!.right!!.right = BinaryTree(8)

        val leftMostNode = flattenBinaryTree(tree)
        val leftToRightToLeft = getLeftToRightToLeft(leftMostNode)
        val expected = listOf(4, 2, 7, 5, 8, 1, 6, 3, 3, 6, 1, 8, 5, 7, 2, 4)

        assert(leftToRightToLeft == expected)
    }
}

fun getLeftToRightToLeft(tree: BinaryTree): MutableList<Int> {
    val values = mutableListOf<Int>()
    var current: BinaryTree? = tree
    while (current!!.right != null) {
        values.add(current.value)
        current = current.right
    }
    values.add(current.value)
    while (current != null) {
        values.add(current.value)
        current = current.left
    }
    return values
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
      var root = TestBinaryTree(value: 1).insertAll(values: [2, 3, 4, 5, 6])
      root.left?.right?.left = TestBinaryTree(value: 7)
      root.left?.right?.right = TestBinaryTree(value: 8)
      var leftMostNode = program.flattenBinaryTree(root: root)
      var actual = leftToRightToLeft(tree: leftMostNode)
      var expected = [4, 2, 7, 5, 8, 1, 6, 3, 3, 6, 1, 8, 5, 7, 2, 4]
      try assertEqual(expected, actual)
    }
  }
}

class TestBinaryTree: Program.BinaryTree {
  func insert(value: Int) -> TestBinaryTree {
    var queue = [self as Program.BinaryTree]
    while queue.count > 0 {
      var current = queue[0]
      queue.removeFirst()
      if let left = current.left {
        queue.append(left)
      } else {
        current.left = TestBinaryTree(value: value)
        return self
      }

      if let right = current.right {
        queue.append(right)
      } else {
        current.right = TestBinaryTree(value: value)
        return self
      }
    }
    return self
  }

  func insertAll(values: [Int]) -> TestBinaryTree {
    for v in values {
      insert(value: v)
    }
    return self
  }
}

func leftToRightToLeft(tree: Program.BinaryTree) -> [Int] {
  var result = [tree.value]
  if let right = tree.right {
    result = result + leftToRightToLeft(tree: right)
  }
  return result + [tree.value]
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

  // O(n) time | O(n) space - where n is the number of nodes
  // in the Binary Tree
  func flattenBinaryTree(root: BinaryTree) -> BinaryTree {
    var inOrderNodes = [BinaryTree]()
    getNodesInOrder(root: root, array: &inOrderNodes)
    for i in 0 ..< inOrderNodes.count - 1 {
      var leftNode = inOrderNodes[i]
      var rightNode = inOrderNodes[i + 1]
      leftNode.right = rightNode
      rightNode.left = leftNode
    }
    return inOrderNodes[0]
  }

  func getNodesInOrder(root: BinaryTree?, array: inout [BinaryTree]) {
    if let tree = root {
      getNodesInOrder(root: tree.left, array: &array)
      array.append(tree)
      getNodesInOrder(root: tree.right, array: &array)
    }
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
      left = nil
      right = nil
    }
  }

  // O(n) time | O(d) space - where n is the number of nodes in the Binary Tree
  // and d is the depth (height) of the Binary Tree
  func flattenBinaryTree(root: BinaryTree) -> BinaryTree {
    var result = flattenTree(node: root)
    return result.leftMost
  }

  func flattenTree(node: BinaryTree) -> (leftMost: BinaryTree, rightMost: BinaryTree) {
    var leftMost = node
    if let left = node.left {
      var result = flattenTree(node: left)
      connectNodes(left: result.rightMost, right: node)
      leftMost = result.leftMost
    }

    var rightMost = node
    if let right = node.right {
      var result = flattenTree(node: right)
      connectNodes(left: node, right: result.leftMost)
      rightMost = result.rightMost
    }
    return (leftMost, rightMost)
  }

  func connectNodes(left: BinaryTree, right: BinaryTree) {
    left.right = right
    right.left = left
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      var root = TestBinaryTree(value: 1).insertAll(values: [2, 3, 4, 5, 6])
      root.left?.right?.left = TestBinaryTree(value: 7)
      root.left?.right?.right = TestBinaryTree(value: 8)
      var leftMostNode = program.flattenBinaryTree(root: root)
      var actual = leftToRightToLeft(tree: leftMostNode)
      var expected = [4, 2, 7, 5, 8, 1, 6, 3, 3, 6, 1, 8, 5, 7, 2, 4]
      try assertEqual(expected, actual)
    }
  }
}

class TestBinaryTree: Program.BinaryTree {
  func insert(value: Int) -> TestBinaryTree {
    var queue = [self as Program.BinaryTree]
    while queue.count > 0 {
      var current = queue[0]
      queue.removeFirst()
      if let left = current.left {
        queue.append(left)
      } else {
        current.left = TestBinaryTree(value: value)
        return self
      }

      if let right = current.right {
        queue.append(right)
      } else {
        current.right = TestBinaryTree(value: value)
        return self
      }
    }
    return self
  }

  func insertAll(values: [Int]) -> TestBinaryTree {
    for v in values {
      insert(value: v)
    }
    return self
  }
}

func leftToRightToLeft(tree: Program.BinaryTree) -> [Int] {
  var result = [tree.value]
  if let right = tree.right {
    result = result + leftToRightToLeft(tree: right)
  }
  return result + [tree.value]
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
        root = BinaryTree(1).insert([2, 3, 4, 5, 6])
        root.left.right.left = BinaryTree(7)
        root.left.right.right = BinaryTree(8)
        leftMostNode = program.flattenBinaryTree(root)
        leftToRightToLeft = leftMostNode.leftToRightToLeft()
        expected = [4, 2, 7, 5, 8, 1, 6, 3, 3, 6, 1, 8, 5, 7, 2, 4]
        self.assertEqual(leftToRightToLeft, expected)


class BinaryTree(program.BinaryTree):
    def insert(self, values, i=0):
        if i >= len(values):
            return
        queue = [self]
        while len(queue) > 0:
            current = queue.pop(0)
            if current.left is None:
                current.left = BinaryTree(values[i])
                break
            queue.append(current.left)
            if current.right is None:
                current.right = BinaryTree(values[i])
                break
            queue.append(current.right)
        self.insert(values, i + 1)
        return self

    def leftToRightToLeft(self):
        nodes = []
        current = self
        while current.right is not None:
            nodes.append(current.value)
            current = current.right
        nodes.append(current.value)
        while current is not None:
            nodes.append(current.value)
            current = current.left
        return nodes

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class BinaryTree:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right


# O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
def flattenBinaryTree(root):
    inOrderNodes = getNodesInOrder(root, [])
    for i in range(0, len(inOrderNodes) - 1):
        leftNode = inOrderNodes[i]
        rightNode = inOrderNodes[i + 1]
        leftNode.right = rightNode
        rightNode.left = leftNode
    return inOrderNodes[0]


def getNodesInOrder(tree, array):
    if tree is not None:
        getNodesInOrder(tree.left, array)
        array.append(tree)
        getNodesInOrder(tree.right, array)
    return array

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class BinaryTree:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right


# O(n) time | O(d) space - where n is the number of nodes in the Binary Tree
# and d is the depth (height) of the Binary Tree
def flattenBinaryTree(root):
    leftMost, _ = flattenTree(root)
    return leftMost


def flattenTree(node):
    if node.left is None:
        leftMost = node
    else:
        leftSubtreeLeftMost, leftSubtreeRightMost = flattenTree(node.left)
        connectNodes(leftSubtreeRightMost, node)
        leftMost = leftSubtreeLeftMost

    if node.right is None:
        rightMost = node
    else:
        rightSubtreeLeftMost, rightSubtreeRightMost = flattenTree(node.right)
        connectNodes(node, rightSubtreeLeftMost)
        rightMost = rightSubtreeRightMost

    return [leftMost, rightMost]


def connectNodes(left, right):
    left.right = right
    right.left = left

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        root = BinaryTree(1).insert([2, 3, 4, 5, 6])
        root.left.right.left = BinaryTree(7)
        root.left.right.right = BinaryTree(8)
        leftMostNode = program.flattenBinaryTree(root)
        leftToRightToLeft = leftMostNode.leftToRightToLeft()
        expected = [4, 2, 7, 5, 8, 1, 6, 3, 3, 6, 1, 8, 5, 7, 2, 4]
        self.assertEqual(leftToRightToLeft, expected)


class BinaryTree(program.BinaryTree):
    def insert(self, values, i=0):
        if i >= len(values):
            return
        queue = [self]
        while len(queue) > 0:
            current = queue.pop(0)
            if current.left is None:
                current.left = BinaryTree(values[i])
                break
            queue.append(current.left)
            if current.right is None:
                current.right = BinaryTree(values[i])
                break
            queue.append(current.right)
        self.insert(values, i + 1)
        return self

    def leftToRightToLeft(self):
        nodes = []
        current = self
        while current.right is not None:
            nodes.append(current.value)
            current = current.right
        nodes.append(current.value)
        while current is not None:
            nodes.append(current.value)
            current = current.left
        return nodes

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

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

it('Test Case #1', function () {
  const root = new BinaryTree(1);
  root.left = new BinaryTree(2);
  root.right = new BinaryTree(3);
  root.left.left = new BinaryTree(4);
  root.left.right = new BinaryTree(5);
  root.right.left = new BinaryTree(6);
  root.left.right.left = new BinaryTree(7);
  root.left.right.right = new BinaryTree(8);

  const leftMostNode = program.flattenBinaryTree(root) as BinaryTree;
  const leftToRightToLeft = getLeftToRightToLeft(leftMostNode);
  const expected = [4, 2, 7, 5, 8, 1, 6, 3, 3, 6, 1, 8, 5, 7, 2, 4];
  chai.expect(leftToRightToLeft).to.deep.equal(expected);
});

function getLeftToRightToLeft(tree: BinaryTree) {
  const nodes: number[] = [];
  let current: BinaryTree = tree;
  while (current.right !== null) {
    nodes.push(current.value);
    current = current.right!;
  }
  nodes.push(current.value);
  while (current !== null) {
    nodes.push(current.value);
    current = current.left!;
  }
  return nodes;
}

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

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

// O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
export function flattenBinaryTree(root: BinaryTree) {
  const inOrderNodes = getNodesInOrder(root, []);
  for (let i = 0; i < inOrderNodes.length - 1; i++) {
    const leftNode = inOrderNodes[i];
    const rightNode = inOrderNodes[i + 1];
    leftNode.right = rightNode;
    rightNode.left = leftNode;
  }
  return inOrderNodes[0];
}

function getNodesInOrder(tree: BinaryTree | null, array: BinaryTree[]) {
  if (tree !== null) {
    getNodesInOrder(tree.left, array);
    array.push(tree);
    getNodesInOrder(tree.right, array);
  }
  return array;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

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

// O(n) time | O(d) space - where n is the number of nodes in the Binary Tree and d is the depth (height) of the Binary Tree
export function flattenBinaryTree(root: BinaryTree) {
  const [leftMost, _] = flattenTree(root);
  return leftMost;
}

function flattenTree(node: BinaryTree): [BinaryTree, BinaryTree] {
  let leftMost, rightMost;

  if (node.left === null) {
    leftMost = node;
  } else {
    const [leftSubtreeLeftMost, leftSubtreeRightMost] = flattenTree(node.left);
    connectNodes(leftSubtreeRightMost, node);
    leftMost = leftSubtreeLeftMost;
  }

  if (node.right === null) {
    rightMost = node;
  } else {
    const [rightSubtreeLeftMost, rightSubtreeRightMost] = flattenTree(node.right);
    connectNodes(node, rightSubtreeLeftMost);
    rightMost = rightSubtreeRightMost;
  }

  return [leftMost, rightMost];
}

function connectNodes(left: BinaryTree, right: BinaryTree) {
  left.right = right;
  right.left = left;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

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

it('Test Case #1', function () {
  const root = new BinaryTree(1);
  root.left = new BinaryTree(2);
  root.right = new BinaryTree(3);
  root.left.left = new BinaryTree(4);
  root.left.right = new BinaryTree(5);
  root.right.left = new BinaryTree(6);
  root.left.right.left = new BinaryTree(7);
  root.left.right.right = new BinaryTree(8);

  const leftMostNode = program.flattenBinaryTree(root) as BinaryTree;
  const leftToRightToLeft = getLeftToRightToLeft(leftMostNode);
  const expected = [4, 2, 7, 5, 8, 1, 6, 3, 3, 6, 1, 8, 5, 7, 2, 4];
  chai.expect(leftToRightToLeft).to.deep.equal(expected);
});

function getLeftToRightToLeft(tree: BinaryTree) {
  const nodes: number[] = [];
  let current: BinaryTree = tree;
  while (current.right !== null) {
    nodes.push(current.value);
    current = current.right!;
  }
  nodes.push(current.value);
  while (current !== null) {
    nodes.push(current.value);
    current = current.left!;
  }
  return nodes;
}

```

