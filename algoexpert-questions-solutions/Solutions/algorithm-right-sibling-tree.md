# Right Sibling Tree
<div class="html">
<p>
  Write a function that takes in a Binary Tree, transforms it into a Right
  Sibling Tree, and returns its root.
</p>
<p>
  A Right Sibling Tree is obtained by making every node in a Binary Tree have
  its <span>right</span> property point to its right sibling instead of its
  right child. A node's right sibling is the node immediately to its right on
  the same level or <span>None</span> / <span>null</span> if there is no node
  immediately to its right.
</p>
<p>
  Note that once the transformation is complete, some nodes might no longer have
  a node pointing to them. For example, in the sample output below, the node
  with value <span>10</span> no longer has any inbound pointers and is
  effectively unreachable.
</p>
<p>
  The transformation should be done in place, meaning that the original data
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
<span class="CodeEditor-promptParameter">tree</span> =     1
      /         \
     2           3
   /   \       /   \
  4     5     6     7
 / \     \   /     / \
8   9    10 11    12 13
           /
          14
</pre>
<h3>Sample Output</h3>
<pre>
           1 <span class="CodeEditor-promptComment">// the root node with value 1</span>
      /
     2-----------3
   /           /
  4-----5-----6-----7
 /           /     /
8---9    10-11    12-13 <span class="CodeEditor-promptComment">// the node with value 10 no longer has a node pointing to it</span>
           /
          14
</pre>
</div>

Hint 1
<p>
Try to identify a pattern or formula that determines how to reach a given node's right sibling.
</p>


Hint 2

<p>
There are two patterns: if a node is the left child of another node, its right sibling is its parent's right child; if a node is the right child of another node, its right sibling is its parent's right sibling's left child.
</p>


Hint 3

<p>
You'll need to a find a way to quickly access a node's parent's right child and a node's parent's right sibling; this won't be trivial because the second one implies that the parent node's original right pointer has been overwritten.
</p>


Hint 4

<p>
Recursively traverse the binary tree and sequence the transformation operations as follows: at any given node, recursively transform its left subtree into a right sibling tree, then edit the given node's right pointer to point to its right sibling, and then finally recursively transform its right subtree into a right sibling tree. This sequencing of operations will allow left child nodes to always access their parent's right child (before their parent's right pointer gets overwritten to point to the parent's right sibling) and will allow right child nodes to always access their parent's right sibling (after their parent's right pointer has gotten overwritten to point to the parent's right sibling).
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
vector<int> getDfsOrder(BinaryTree *tree);

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      BinaryTree *root = new BinaryTree(1);
      insertBinaryTree(root, {2, 3, 4, 5, 6, 7, 8, 9});
      root->left->right->right = new BinaryTree(10);
      root->right->left->left = new BinaryTree(11);
      root->right->right->left = new BinaryTree(12);
      root->right->right->right = new BinaryTree(13);
      root->right->left->left->left = new BinaryTree(14);
      BinaryTree *mutatedRoot = rightSiblingTree(root);
      vector<int> actual = getDfsOrder(mutatedRoot);
      vector<int> expected = {1,  2,  4, 8, 9,  5,  6, 11, 14, 7,
                              12, 13, 3, 6, 11, 14, 7, 12, 13};
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

vector<int> getDfsOrder(BinaryTree *tree) {
  vector<int> values = {tree->value};
  if (tree->left != nullptr) {
    auto sub = getDfsOrder(tree->left);
    values.insert(values.end(), sub.begin(), sub.end());
  }
  if (tree->right != nullptr) {
    auto sub = getDfsOrder(tree->right);
    values.insert(values.end(), sub.begin(), sub.end());
  }
  return values;
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

void mutate(BinaryTree *node, BinaryTree *parent, bool isLeftChild);

// O(n) time | O(d) space - where n is the number of nodes in the Binary Tree
// and d is the depth (height) of the Binary Tree
BinaryTree *rightSiblingTree(BinaryTree *root) {
  mutate(root, nullptr, false);
  return root;
}

void mutate(BinaryTree *node, BinaryTree *parent, bool isLeftChild) {
  if (node == nullptr)
    return;

  auto left = node->left;
  auto right = node->right;
  mutate(left, node, true);
  if (parent == nullptr) {
    node->right = nullptr;
  } else if (isLeftChild) {
    node->right = parent->right;
  } else {
    if (parent->right == nullptr) {
      node->right = nullptr;
    } else {
      node->right = parent->right->left;
    }
  }
  mutate(right, node, false);
}

```
### Unit Tests 1 (cpp)
```cpp
#include <queue>

BinaryTree::BinaryTree(int value) { this->value = value; }

BinaryTree *insertBinaryTree(BinaryTree *tree, vector<int> values);
vector<int> getDfsOrder(BinaryTree *tree);

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      BinaryTree *root = new BinaryTree(1);
      insertBinaryTree(root, {2, 3, 4, 5, 6, 7, 8, 9});
      root->left->right->right = new BinaryTree(10);
      root->right->left->left = new BinaryTree(11);
      root->right->right->left = new BinaryTree(12);
      root->right->right->right = new BinaryTree(13);
      root->right->left->left->left = new BinaryTree(14);
      BinaryTree *mutatedRoot = rightSiblingTree(root);
      vector<int> actual = getDfsOrder(mutatedRoot);
      vector<int> expected = {1,  2,  4, 8, 9,  5,  6, 11, 14, 7,
                              12, 13, 3, 6, 11, 14, 7, 12, 13};
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

vector<int> getDfsOrder(BinaryTree *tree) {
  vector<int> values = {tree->value};
  if (tree->left != nullptr) {
    auto sub = getDfsOrder(tree->left);
    values.insert(values.end(), sub.begin(), sub.end());
  }
  if (tree->right != nullptr) {
    auto sub = getDfsOrder(tree->right);
    values.insert(values.end(), sub.begin(), sub.end());
  }
  return values;
}

```
### Sandbox Code (csharp)
```csharp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

using System.Linq;
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		Program.BinaryTree root = new Program.BinaryTree(1);
		insert(root, new int[] {2, 3, 4, 5, 6, 7, 8, 9});
		root.left.right.right = new Program.BinaryTree(10);
		root.right.left.left = new Program.BinaryTree(11);
		root.right.right.left = new Program.BinaryTree(12);
		root.right.right.right = new Program.BinaryTree(13);
		root.right.left.left.left = new Program.BinaryTree(14);
		Program.BinaryTree mutatedRoot = Program.RightSiblingTree(root);
		List<int> actual = getDfsOrder(mutatedRoot);
		var expected = new List<int> {
			1, 2, 4, 8, 9, 5, 6, 11, 14, 7, 12, 13, 3, 6, 11, 14, 7, 12, 13
		};
		Utils.AssertTrue(expected.SequenceEqual(actual));
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

	public List<int> getDfsOrder(Program.BinaryTree tree) {
		List<int> values = new List<int>();
		values.Add(tree.value);
		if (tree.left != null) {
			values.AddRange(getDfsOrder(tree.left));
		}
		if (tree.right != null) {
			values.AddRange(getDfsOrder(tree.right));
		}
		return values;
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(n) time | O(d) space - where n is the number of nodes in
	// the Binary Tree and d is the depth (height) of the Binary Tree
	public static BinaryTree RightSiblingTree(BinaryTree root) {
		mutate(root, null, false);
		return root;
	}

	public static void mutate(BinaryTree node, BinaryTree parent, bool isLeftChild) {
		if (node == null) return;

		var left = node.left;
		var right = node.right;
		mutate(left, node, true);
		if (parent == null) {
			node.right = null;
		} else if (isLeftChild) {
			node.right = parent.right;
		} else{
			if (parent.right == null) {
				node.right = null;
			} else {
				node.right = parent.right.left;
			}
		}
		mutate(right, node, false);
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
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		Program.BinaryTree root = new Program.BinaryTree(1);
		insert(root, new int[] {2, 3, 4, 5, 6, 7, 8, 9});
		root.left.right.right = new Program.BinaryTree(10);
		root.right.left.left = new Program.BinaryTree(11);
		root.right.right.left = new Program.BinaryTree(12);
		root.right.right.right = new Program.BinaryTree(13);
		root.right.left.left.left = new Program.BinaryTree(14);
		Program.BinaryTree mutatedRoot = Program.RightSiblingTree(root);
		List<int> actual = getDfsOrder(mutatedRoot);
		var expected = new List<int> {
			1, 2, 4, 8, 9, 5, 6, 11, 14, 7, 12, 13, 3, 6, 11, 14, 7, 12, 13
		};
		Utils.AssertTrue(expected.SequenceEqual(actual));
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

	public List<int> getDfsOrder(Program.BinaryTree tree) {
		List<int> values = new List<int>();
		values.Add(tree.value);
		if (tree.left != null) {
			values.AddRange(getDfsOrder(tree.left));
		}
		if (tree.right != null) {
			values.AddRange(getDfsOrder(tree.right));
		}
		return values;
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

func (tree *BinaryTree) getDfsOrder() []int {
	vals := []int{tree.Value}
	if tree.Left != nil {
		vals = append(vals, tree.Left.getDfsOrder()...)
	}
	if tree.Right != nil {
		vals = append(vals, tree.Right.getDfsOrder()...)
	}
	return vals
}

func TestCase1(t *TestCase) {
	root := NewBinaryTree(1).insertAll(2, 3, 4, 5, 6, 7, 8, 9)
	root.Left.Right.Right = NewBinaryTree(10)
	root.Right.Left.Left = NewBinaryTree(11)
	root.Right.Right.Left = NewBinaryTree(12)
	root.Right.Right.Right = NewBinaryTree(13)
	root.Right.Left.Left.Left = NewBinaryTree(14)
	mutatedRoot := RightSiblingTree(root)
	actual := mutatedRoot.getDfsOrder()
	expected := []int{1, 2, 4, 8, 9, 5, 6, 11, 14, 7, 12, 13, 3, 6, 11, 14, 7, 12, 13}
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

// O(n) time | O(d) space - where n is the number of nodes in
// the Binary Tree and d is the depth (height) of the Binary Tree
func RightSiblingTree(root *BinaryTree) *BinaryTree {
	mutate(root, nil, false)
	return root
}

func mutate(node, parent *BinaryTree, isLeftChild bool) {
	if node == nil {
		return
	}

	left, right := node.Left, node.Right
	mutate(left, node, true)
	if parent == nil {
		node.Right = nil
	} else if isLeftChild {
		node.Right = parent.Right
	} else {
		if parent.Right == nil {
			node.Right = nil
		} else {
			node.Right = parent.Right.Left
		}
	}
	mutate(right, node, false)
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

func (tree *BinaryTree) getDfsOrder() []int {
	vals := []int{tree.Value}
	if tree.Left != nil {
		vals = append(vals, tree.Left.getDfsOrder()...)
	}
	if tree.Right != nil {
		vals = append(vals, tree.Right.getDfsOrder()...)
	}
	return vals
}

func TestCase1(t *TestCase) {
	root := NewBinaryTree(1).insertAll(2, 3, 4, 5, 6, 7, 8, 9)
	root.Left.Right.Right = NewBinaryTree(10)
	root.Right.Left.Left = NewBinaryTree(11)
	root.Right.Right.Left = NewBinaryTree(12)
	root.Right.Right.Right = NewBinaryTree(13)
	root.Right.Left.Left.Left = NewBinaryTree(14)
	mutatedRoot := RightSiblingTree(root)
	actual := mutatedRoot.getDfsOrder()
	expected := []int{1, 2, 4, 8, 9, 5, 6, 11, 14, 7, 12, 13, 3, 6, 11, 14, 7, 12, 13}
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
    insert(root, new int[] {2, 3, 4, 5, 6, 7, 8, 9});
    root.left.right.right = new Program.BinaryTree(10);
    root.right.left.left = new Program.BinaryTree(11);
    root.right.right.left = new Program.BinaryTree(12);
    root.right.right.right = new Program.BinaryTree(13);
    root.right.left.left.left = new Program.BinaryTree(14);
    Program.BinaryTree mutatedRoot = Program.rightSiblingTree(root);
    List<Integer> actual = getDfsOrder(mutatedRoot);
    var expected = Arrays.asList(1, 2, 4, 8, 9, 5, 6, 11, 14, 7, 12, 13, 3, 6, 11, 14, 7, 12, 13);
    Utils.assertTrue(expected.equals(actual));
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

  public List<Integer> getDfsOrder(Program.BinaryTree tree) {
    List<Integer> values = new ArrayList<Integer>();
    values.add(tree.value);
    if (tree.left != null) {
      values.addAll(getDfsOrder(tree.left));
    }
    if (tree.right != null) {
      values.addAll(getDfsOrder(tree.right));
    }
    return values;
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(d) space - where n is the number of nodes in
  // the Binary Tree and d is the depth (height) of the Binary Tree
  public static BinaryTree rightSiblingTree(BinaryTree root) {
    mutate(root, null, false);
    return root;
  }

  public static void mutate(BinaryTree node, BinaryTree parent, boolean isLeftChild) {
    if (node == null) return;

    var left = node.left;
    var right = node.right;
    mutate(left, node, true);
    if (parent == null) {
      node.right = null;
    } else if (isLeftChild) {
      node.right = parent.right;
    } else {
      if (parent.right == null) {
        node.right = null;
      } else {
        node.right = parent.right.left;
      }
    }
    mutate(right, node, false);
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
    insert(root, new int[] {2, 3, 4, 5, 6, 7, 8, 9});
    root.left.right.right = new Program.BinaryTree(10);
    root.right.left.left = new Program.BinaryTree(11);
    root.right.right.left = new Program.BinaryTree(12);
    root.right.right.right = new Program.BinaryTree(13);
    root.right.left.left.left = new Program.BinaryTree(14);
    Program.BinaryTree mutatedRoot = Program.rightSiblingTree(root);
    List<Integer> actual = getDfsOrder(mutatedRoot);
    var expected = Arrays.asList(1, 2, 4, 8, 9, 5, 6, 11, 14, 7, 12, 13, 3, 6, 11, 14, 7, 12, 13);
    Utils.assertTrue(expected.equals(actual));
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

  public List<Integer> getDfsOrder(Program.BinaryTree tree) {
    List<Integer> values = new ArrayList<Integer>();
    values.add(tree.value);
    if (tree.left != null) {
      values.addAll(getDfsOrder(tree.left));
    }
    if (tree.right != null) {
      values.addAll(getDfsOrder(tree.right));
    }
    return values;
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
  const root = new BinaryTree(1).insert([2, 3, 4, 5, 6, 7, 8, 9]);
  root.left.right.right = new BinaryTree(10);
  root.right.left.left = new BinaryTree(11);
  root.right.right.left = new BinaryTree(12);
  root.right.right.right = new BinaryTree(13);
  root.right.left.left.left = new BinaryTree(14);
  const mutatedRoot = program.rightSiblingTree(root);
  const dfsOrder = mutatedRoot.getDfsOrder([]);
  const expected = [1, 2, 4, 8, 9, 5, 6, 11, 14, 7, 12, 13, 3, 6, 11, 14, 7, 12, 13];
  chai.expect(dfsOrder).to.deep.equal(expected);
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

  getDfsOrder(values) {
    values.push(this.value);
    if (this.left !== null) {
      this.left.getDfsOrder(values);
    }
    if (this.right !== null) {
      this.right.getDfsOrder(values);
    }
    return values;
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

// O(n) time | O(d) space - where n is the number of nodes in the Binary Tree and d is the depth (height) of the Binary Tree
function rightSiblingTree(root) {
  mutate(root, null, null);
  return root;
}

function mutate(node, parent, isLeftChild) {
  if (node === null) return;
  const {left, right} = node;
  mutate(left, node, true);
  if (parent === null) {
    node.right = null;
  } else if (isLeftChild) {
    node.right = parent.right;
  } else {
    if (parent.right === null) {
      node.right = null;
    } else {
      node.right = parent.right.left;
    }
  }
  mutate(right, node, false);
}

exports.BinaryTree = BinaryTree;
exports.rightSiblingTree = rightSiblingTree;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const root = new BinaryTree(1).insert([2, 3, 4, 5, 6, 7, 8, 9]);
  root.left.right.right = new BinaryTree(10);
  root.right.left.left = new BinaryTree(11);
  root.right.right.left = new BinaryTree(12);
  root.right.right.right = new BinaryTree(13);
  root.right.left.left.left = new BinaryTree(14);
  const mutatedRoot = program.rightSiblingTree(root);
  const dfsOrder = mutatedRoot.getDfsOrder([]);
  const expected = [1, 2, 4, 8, 9, 5, 6, 11, 14, 7, 12, 13, 3, 6, 11, 14, 7, 12, 13];
  chai.expect(dfsOrder).to.deep.equal(expected);
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

  getDfsOrder(values) {
    values.push(this.value);
    if (this.left !== null) {
      this.left.getDfsOrder(values);
    }
    if (this.right !== null) {
      this.right.getDfsOrder(values);
    }
    return values;
  }
}

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.BinaryTree as BinaryTree
import com.algoexpert.program.rightSiblingTree as rightSiblingTree

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
        tree.left!!.right!!.right = BinaryTree(10)
        tree.right!!.left!!.left = BinaryTree(11)
        tree.right!!.right!!.left = BinaryTree(12)
        tree.right!!.right!!.right = BinaryTree(13)
        tree.right!!.left!!.left!!.left = BinaryTree(14)

        val mutatedRoot = rightSiblingTree(tree)
        val dfsOrder = getDfsOrder(mutatedRoot, mutableListOf())
        val expected = listOf(1, 2, 4, 8, 9, 5, 6, 11, 14, 7, 12, 13, 3, 6, 11, 14, 7, 12, 13)

        assert(dfsOrder == expected)
    }
}

fun getDfsOrder(tree: BinaryTree, values: MutableList<Int>): MutableList<Int> {
    values.add(tree.value)
    if (tree.left != null) getDfsOrder(tree.left!!, values)
    if (tree.right != null) getDfsOrder(tree.right!!, values)
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

// O(n) time | O(d) space - where n is the number of nodes in
// the Binary Tree and d is the depth (height) of the Binary Tree
fun rightSiblingTree(root: BinaryTree): BinaryTree {
    mutate(root, null, false)
    return root
}

fun mutate(node: BinaryTree?, parent: BinaryTree?, isLeftChild: Boolean) {
    if (node == null) return

    val left = node.left
    val right = node.right
    mutate(left, node, true)
    if (parent == null) {
        node.right = null
    } else if (isLeftChild) {
        node.right = parent.right
    } else {
        if (parent.right == null) {
            node.right = null
        } else {
            node.right = parent.right!!.left
        }
    }
    mutate(right, node, false)
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.BinaryTree as BinaryTree
import com.algoexpert.program.rightSiblingTree as rightSiblingTree

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
        tree.left!!.right!!.right = BinaryTree(10)
        tree.right!!.left!!.left = BinaryTree(11)
        tree.right!!.right!!.left = BinaryTree(12)
        tree.right!!.right!!.right = BinaryTree(13)
        tree.right!!.left!!.left!!.left = BinaryTree(14)

        val mutatedRoot = rightSiblingTree(tree)
        val dfsOrder = getDfsOrder(mutatedRoot, mutableListOf())
        val expected = listOf(1, 2, 4, 8, 9, 5, 6, 11, 14, 7, 12, 13, 3, 6, 11, 14, 7, 12, 13)

        assert(dfsOrder == expected)
    }
}

fun getDfsOrder(tree: BinaryTree, values: MutableList<Int>): MutableList<Int> {
    values.add(tree.value)
    if (tree.left != null) getDfsOrder(tree.left!!, values)
    if (tree.right != null) getDfsOrder(tree.right!!, values)
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
      var root = TestBinaryTree(value: 1).insertAll(values: [2, 3, 4, 5, 6, 7, 8, 9])
      root.left?.right?.right = TestBinaryTree(value: 10)
      root.right?.left?.left = TestBinaryTree(value: 11)
      root.right?.right?.left = TestBinaryTree(value: 12)
      root.right?.right?.right = TestBinaryTree(value: 13)
      root.right?.left?.left?.left = TestBinaryTree(value: 14)
      var mutatedRoot = program.rightSiblingTree(root: root)
      var actual = getDfsOrder(tree: mutatedRoot)
      var expected = [1, 2, 4, 8, 9, 5, 6, 11, 14, 7, 12, 13, 3, 6, 11, 14, 7, 12, 13]
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

func getDfsOrder(tree: Program.BinaryTree) -> [Int] {
  var result = [tree.value]
  if let left = tree.left {
    var sub = getDfsOrder(tree: left)
    result.append(contentsOf: sub)
  }
  if let right = tree.right {
    var sub = getDfsOrder(tree: right)
    result.append(contentsOf: sub)
  }
  return result
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

  // O(n) time | O(d) space - where n is the number of nodes in
  // the Binary Tree and d is the depth (height) of the Binary Tree
  func rightSiblingTree(root: BinaryTree) -> BinaryTree {
    mutate(node: root, parent: nil, isLeftChild: false)
    return root
  }

  func mutate(node: BinaryTree?, parent: BinaryTree?, isLeftChild: Bool) {
    if let tree = node {
      var left = tree.left
      var right = tree.right
      mutate(node: left, parent: tree, isLeftChild: true)
      if let p = parent {
        if isLeftChild {
          tree.right = p.right
        } else {
          if let right = p.right {
            tree.right = right.left
          } else {
            tree.right = nil
          }
        }
      } else {
        tree.right = nil
      }

      mutate(node: right, parent: tree, isLeftChild: false)
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
      var root = TestBinaryTree(value: 1).insertAll(values: [2, 3, 4, 5, 6, 7, 8, 9])
      root.left?.right?.right = TestBinaryTree(value: 10)
      root.right?.left?.left = TestBinaryTree(value: 11)
      root.right?.right?.left = TestBinaryTree(value: 12)
      root.right?.right?.right = TestBinaryTree(value: 13)
      root.right?.left?.left?.left = TestBinaryTree(value: 14)
      var mutatedRoot = program.rightSiblingTree(root: root)
      var actual = getDfsOrder(tree: mutatedRoot)
      var expected = [1, 2, 4, 8, 9, 5, 6, 11, 14, 7, 12, 13, 3, 6, 11, 14, 7, 12, 13]
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

func getDfsOrder(tree: Program.BinaryTree) -> [Int] {
  var result = [tree.value]
  if let left = tree.left {
    var sub = getDfsOrder(tree: left)
    result.append(contentsOf: sub)
  }
  if let right = tree.right {
    var sub = getDfsOrder(tree: right)
    result.append(contentsOf: sub)
  }
  return result
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
        root = BinaryTree(1).insert([2, 3, 4, 5, 6, 7, 8, 9])
        root.left.right.right = BinaryTree(10)
        root.right.left.left = BinaryTree(11)
        root.right.right.left = BinaryTree(12)
        root.right.right.right = BinaryTree(13)
        root.right.left.left.left = BinaryTree(14)
        mutatedRoot = program.rightSiblingTree(root)
        dfsOrder = mutatedRoot.getDfsOrder([])
        expected = [1, 2, 4, 8, 9, 5, 6, 11, 14, 7, 12, 13, 3, 6, 11, 14, 7, 12, 13]
        self.assertEqual(dfsOrder, expected)


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

    def getDfsOrder(self, values):
        values.append(self.value)
        if self.left is not None:
            self.left.getDfsOrder(values)
        if self.right is not None:
            self.right.getDfsOrder(values)
        return values

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class BinaryTree:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right


# O(n) time | O(d) space - where n is the number of nodes in the Binary Tree and d is the depth (height) of the Binary Tree
def rightSiblingTree(root):
    mutate(root, None, None)
    return root


def mutate(node, parent, isLeftChild):
    if node is None:
        return
    left, right = node.left, node.right
    mutate(left, node, True)
    if parent is None:
        node.right = None
    elif isLeftChild:
        node.right = parent.right
    else:
        if parent.right is None:
            node.right = None
        else:
            node.right = parent.right.left
    mutate(right, node, False)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        root = BinaryTree(1).insert([2, 3, 4, 5, 6, 7, 8, 9])
        root.left.right.right = BinaryTree(10)
        root.right.left.left = BinaryTree(11)
        root.right.right.left = BinaryTree(12)
        root.right.right.right = BinaryTree(13)
        root.right.left.left.left = BinaryTree(14)
        mutatedRoot = program.rightSiblingTree(root)
        dfsOrder = mutatedRoot.getDfsOrder([])
        expected = [1, 2, 4, 8, 9, 5, 6, 11, 14, 7, 12, 13, 3, 6, 11, 14, 7, 12, 13]
        self.assertEqual(dfsOrder, expected)


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

    def getDfsOrder(self, values):
        values.append(self.value)
        if self.left is not None:
            self.left.getDfsOrder(values)
        if self.right is not None:
            self.right.getDfsOrder(values)
        return values

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
  root.right.right = new BinaryTree(7);
  root.left.left.left = new BinaryTree(8);
  root.left.left.right = new BinaryTree(9);
  root.left.right.right = new BinaryTree(10);
  root.right.left.left = new BinaryTree(11);
  root.right.right.left = new BinaryTree(12);
  root.right.right.right = new BinaryTree(13);
  root.right.left.left.left = new BinaryTree(14);

  const mutatedRoot = program.rightSiblingTree(root);
  const dfsOrder = getDfsOrder(mutatedRoot, []);
  const expected = [1, 2, 4, 8, 9, 5, 6, 11, 14, 7, 12, 13, 3, 6, 11, 14, 7, 12, 13];
  chai.expect(dfsOrder).to.deep.equal(expected);
});

function getDfsOrder(tree: BinaryTree, values: number[]) {
  values.push(tree.value);
  if (tree.left !== null) {
    getDfsOrder(tree.left, values);
  }
  if (tree.right !== null) {
    getDfsOrder(tree.right, values);
  }
  return values;
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

// O(n) time | O(d) space - where n is the number of nodes in the Binary Tree and d is the depth (height) of the Binary Tree
export function rightSiblingTree(root: BinaryTree) {
  mutate(root, null, null);
  return root;
}

function mutate(node: BinaryTree | null, parent: BinaryTree | null, isLeftChild: boolean | null) {
  if (node === null) return;
  const {left, right} = node;
  mutate(left, node, true);
  if (parent === null) {
    node.right = null;
  } else if (isLeftChild) {
    node.right = parent.right;
  } else {
    if (parent.right === null) {
      node.right = null;
    } else {
      node.right = parent.right.left;
    }
  }
  mutate(right, node, false);
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
  root.right.right = new BinaryTree(7);
  root.left.left.left = new BinaryTree(8);
  root.left.left.right = new BinaryTree(9);
  root.left.right.right = new BinaryTree(10);
  root.right.left.left = new BinaryTree(11);
  root.right.right.left = new BinaryTree(12);
  root.right.right.right = new BinaryTree(13);
  root.right.left.left.left = new BinaryTree(14);

  const mutatedRoot = program.rightSiblingTree(root);
  const dfsOrder = getDfsOrder(mutatedRoot, []);
  const expected = [1, 2, 4, 8, 9, 5, 6, 11, 14, 7, 12, 13, 3, 6, 11, 14, 7, 12, 13];
  chai.expect(dfsOrder).to.deep.equal(expected);
});

function getDfsOrder(tree: BinaryTree, values: number[]) {
  values.push(tree.value);
  if (tree.left !== null) {
    getDfsOrder(tree.left, values);
  }
  if (tree.right !== null) {
    getDfsOrder(tree.right, values);
  }
  return values;
}

```

