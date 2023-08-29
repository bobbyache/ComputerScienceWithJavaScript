# Compare Leaf Traversal
<div class="html">
<p>
  Write a function that takes in the root nodes of two Binary Trees and returns
  a boolean representing whether their leaf traversals are the same.
</p>
<p>
  The leaf traversal of a Binary Tree traverses only its leaf nodes from left to
  right. A leaf node is any node that has no <span>left</span> or
  <span>right</span> children.
</p>
<p>
  For example, the leaf traversal of the following Binary Tree is
  <span>1, 3, 2</span>.
</p>
<pre>
   4
 /   \
1     5
    /   \
   3     2
</pre>
<p>
  Each <span>BinaryTree</span> node has an integer <span>value</span>, a
  <span>left</span> child node, and a <span>right</span> child node. Children
  nodes can either be <span>BinaryTree</span> nodes themselves or
  <span>None</span> / <span>null</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">tree1</span> = 1
      /   \
     2     3
   /   \     \
  4     5     6
      /   \
     7     8
<span class="CodeEditor-promptParameter">tree2</span> = 1
      /   \
     2     3
   /   \    \
  4     7    5
            /  \
           8    6
</pre>
<h3>Sample Output</h3>
<pre>
true
</pre>
</div>

Hint 1
<p>
  To traverse the leaf nodes of a tree from left to right, you'll need to use a
  pre-order traversal.
</p>


Hint 2

<p>
  The simplest approach to solving this problem is to perform a pre-order
  traversal on both trees, to store their leaf nodes in arrays in the order in
  which they're visited, and to then compare the two resulting arrays. This
  solutions works, but it's not optimal from a space-complexity perspective. Can
  you think of a way to solve this problem using less extra space? It's possible
  to solve this with <span>O(h1 + h2)</span> space or better, where
  <span>h1</span> is the height of <span>tree1</span> and <span>h2</span> is the
  height of <span>tree2</span>.
</p>


Hint 3

<p>
  To solve this problem with a more optimal space complexity, you can perform
  pre-order traversals on both trees at the same time. As you traverse the
  trees, you need to look for the next leaf node in each tree and pause the
  traversal as soon as you find it. Once you've found the next leaf node in both
  trees, you can compare their values and see if they match; if they do,
  continue the traversal , and repeat the process. If they don't match, the leaf
  traversals aren't the same, and you can return <span>false</span>.
</p>


Hint 4

<p>
  Another unique way to solve this problem is to connect all of the leaf nodes
  in each individual tree so as to form two linked lists. Since the leaf nodes
  don't have any children, you can use their <span>right</span> pointers to
  store the next leaf nodes in the leaf traversals. And since you're reusing the
  input trees to store the leaf traversals, the only extra space you'll be using
  comes from the recursion used in the traversal of the trees. Once both trees
  have their leaf nodes connected, you can iterate through the linked lists and
  check if they're the same. To compare the linked lists, you'll need to keep
  track of their heads (the first leaf node in each tree).
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
      BinaryTree *tree1 = new BinaryTree(1);
      tree1->left = new BinaryTree(2);
      tree1->right = new BinaryTree(3);
      tree1->left->left = new BinaryTree(4);
      tree1->left->right = new BinaryTree(5);
      tree1->right->right = new BinaryTree(6);
      tree1->left->right->left = new BinaryTree(7);
      tree1->left->right->right = new BinaryTree(8);

      BinaryTree *tree2 = new BinaryTree(1);
      tree2->left = new BinaryTree(2);
      tree2->right = new BinaryTree(3);
      tree2->left->left = new BinaryTree(4);
      tree2->left->right = new BinaryTree(7);
      tree2->right->right = new BinaryTree(5);
      tree2->right->right->left = new BinaryTree(8);
      tree2->right->right->right = new BinaryTree(6);

      auto expected = true;
      auto actual = compareLeafTraversal(tree1, tree2);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

// This is an input class. Do not edit.
class BinaryTree {
public:
  int value;
  BinaryTree *left = nullptr;
  BinaryTree *right = nullptr;

  BinaryTree(int value) { this->value = value; }
};

BinaryTree *getNextLeafNode(vector<BinaryTree *> &traversalStack);
bool isLeafNode(const BinaryTree *node);

// O(n + m) time | O(h1 + h2) space - where n is the number of nodes in the
// first Binary Tree, m is the number in the second, h1 is the height of the
// first Binary Tree, and h2 is the height of the second
bool compareLeafTraversal(BinaryTree *tree1, BinaryTree *tree2) {
  vector<BinaryTree *> tree1TraversalStack = {tree1};
  vector<BinaryTree *> tree2TraversalStack = {tree2};

  while (tree1TraversalStack.size() > 0 && tree2TraversalStack.size() > 0) {
    BinaryTree *tree1Leaf = getNextLeafNode(tree1TraversalStack);
    BinaryTree *tree2Leaf = getNextLeafNode(tree2TraversalStack);

    if (tree1Leaf->value != tree2Leaf->value)
      return false;
  }

  return tree1TraversalStack.size() == 0 && tree2TraversalStack.size() == 0;
}

BinaryTree *getNextLeafNode(vector<BinaryTree *> &traversalStack) {
  BinaryTree *currentNode = traversalStack.back();
  traversalStack.pop_back();

  while (!isLeafNode(currentNode)) {
    if (currentNode->right != nullptr)
      traversalStack.push_back(currentNode->right);

    // We purposely add the left node to the stack after the
    // right node so that it gets popped off the stack first.
    if (currentNode->left != nullptr)
      traversalStack.push_back(currentNode->left);

    currentNode = traversalStack.back();
    traversalStack.pop_back();
  }

  return currentNode;
}

bool isLeafNode(const BinaryTree *node) {
  return node->left == nullptr && node->right == nullptr;
}
```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <utility>
using namespace std;

// This is an input class. Do not edit.
class BinaryTree {
public:
  int value;
  BinaryTree *left = nullptr;
  BinaryTree *right = nullptr;

  BinaryTree(int value) { this->value = value; }
};

pair<BinaryTree *, BinaryTree *>
connectLeafNodes(BinaryTree *currentNode, BinaryTree *head = nullptr,
                 BinaryTree *previousNode = nullptr);
bool isLeafNode(const BinaryTree *node);

// O(n + m) time | O(max(h1, h2)) space - where n is the number of nodes in the
// first Binary Tree, m is the number in the second, h1 is the height of the
// first Binary Tree, and h2 is the height of the second
bool compareLeafTraversal(BinaryTree *tree1, BinaryTree *tree2) {
  BinaryTree *tree1LeafNodesLinkedList = connectLeafNodes(tree1).first;
  BinaryTree *tree2LeafNodesLinkedList = connectLeafNodes(tree2).first;

  BinaryTree *list1CurrentNode = tree1LeafNodesLinkedList;
  BinaryTree *list2CurrentNode = tree2LeafNodesLinkedList;
  while (list1CurrentNode != nullptr && list2CurrentNode != nullptr) {
    if (list1CurrentNode->value != list2CurrentNode->value)
      return false;

    list1CurrentNode = list1CurrentNode->right;
    list2CurrentNode = list2CurrentNode->right;
  }

  return list1CurrentNode == nullptr && list2CurrentNode == nullptr;
}

pair<BinaryTree *, BinaryTree *> connectLeafNodes(BinaryTree *currentNode,
                                                  BinaryTree *head,
                                                  BinaryTree *previousNode) {
  if (currentNode == nullptr)
    return make_pair(head, previousNode);

  if (isLeafNode(currentNode)) {
    if (previousNode == nullptr) {
      head = currentNode;
    } else {
      previousNode->right = currentNode;
    }

    previousNode = currentNode;
  }

  BinaryTree *leftHead;
  BinaryTree *leftPreviousNode;
  tie(leftHead, leftPreviousNode) =
      connectLeafNodes(currentNode->left, head, previousNode);
  return connectLeafNodes(currentNode->right, leftHead, leftPreviousNode);
}

bool isLeafNode(const BinaryTree *node) {
  return node->left == nullptr && node->right == nullptr;
}
```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      BinaryTree *tree1 = new BinaryTree(1);
      tree1->left = new BinaryTree(2);
      tree1->right = new BinaryTree(3);
      tree1->left->left = new BinaryTree(4);
      tree1->left->right = new BinaryTree(5);
      tree1->right->right = new BinaryTree(6);
      tree1->left->right->left = new BinaryTree(7);
      tree1->left->right->right = new BinaryTree(8);

      BinaryTree *tree2 = new BinaryTree(1);
      tree2->left = new BinaryTree(2);
      tree2->right = new BinaryTree(3);
      tree2->left->left = new BinaryTree(4);
      tree2->left->right = new BinaryTree(7);
      tree2->right->right = new BinaryTree(5);
      tree2->right->right->left = new BinaryTree(8);
      tree2->right->right->right = new BinaryTree(6);

      auto expected = true;
      auto actual = compareLeafTraversal(tree1, tree2);
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
		Program.BinaryTree tree1 = new Program.BinaryTree(1);
		tree1.left = new Program.BinaryTree(2);
		tree1.right = new Program.BinaryTree(3);
		tree1.left.left = new Program.BinaryTree(4);
		tree1.left.right = new Program.BinaryTree(5);
		tree1.right.right = new Program.BinaryTree(6);
		tree1.left.right.left = new Program.BinaryTree(7);
		tree1.left.right.right = new Program.BinaryTree(8);

		Program.BinaryTree tree2 = new Program.BinaryTree(1);
		tree2.left = new Program.BinaryTree(2);
		tree2.right = new Program.BinaryTree(3);
		tree2.left.left = new Program.BinaryTree(4);
		tree2.left.right = new Program.BinaryTree(7);
		tree2.right.right = new Program.BinaryTree(5);
		tree2.right.right.left = new Program.BinaryTree(8);
		tree2.right.right.right = new Program.BinaryTree(6);

		var expected = true;
		var actual = new Program().CompareLeafTraversal(tree1, tree2);
		Utils.AssertTrue(expected == actual);
	}
}


```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;


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

	// O(n + m) time | O(h1 + h2) space - where n is the number of nodes in the first
	// Binary Tree, m is the number in the second, h1 is the height of the first Binary
	// Tree, and h2 is the height of the second
	public bool CompareLeafTraversal(BinaryTree tree1, BinaryTree tree2) {
		Stack<BinaryTree> tree1TraversalStack = new Stack<BinaryTree>();
		tree1TraversalStack.Push(tree1);
		Stack<BinaryTree> tree2TraversalStack = new Stack<BinaryTree>();
		tree2TraversalStack.Push(tree2);

		while (tree1TraversalStack.Count > 0 && tree2TraversalStack.Count > 0) {
			BinaryTree tree1Leaf = getNextLeafNode(tree1TraversalStack);
			BinaryTree tree2Leaf = getNextLeafNode(tree2TraversalStack);

			if (tree1Leaf.value != tree2Leaf.value) {
				return false;
			}
		}

		return (tree1TraversalStack.Count == 0) && (tree2TraversalStack.Count == 0);
	}

	public BinaryTree getNextLeafNode(Stack<BinaryTree> traversalStack) {
		BinaryTree currentNode = traversalStack.Pop();

		while (!isLeafNode(currentNode)) {
			if (currentNode.right != null) {
				traversalStack.Push(currentNode.right);
			}

			// We purposely add the left node to the stack after the
			// right node so that it gets popped off the stack first.
			if (currentNode.left != null) {
				traversalStack.Push(currentNode.left);
			}

			currentNode = traversalStack.Pop();
		}

		return currentNode;
	}

	public bool isLeafNode(BinaryTree node) {
		return (node.left == null) && (node.right == null);
	}
}

```
### Solution 2 (csharp)
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

	// O(n + m) time | O(max(h1, h2)) space - where n is the number of nodes in the first
	// Binary Tree, m is the number in the second, h1 is the height of the first Binary
	// Tree, and h2 is the height of the second
	public bool CompareLeafTraversal(BinaryTree tree1, BinaryTree tree2) {
		BinaryTree tree1LeafNodesLinkedList = connectLeafNodes(tree1, null, null)[0];
		BinaryTree tree2LeafNodesLinkedList = connectLeafNodes(tree2, null, null)[0];

		BinaryTree list1CurrentNode = tree1LeafNodesLinkedList;
		BinaryTree list2CurrentNode = tree2LeafNodesLinkedList;
		while (list1CurrentNode != null && list2CurrentNode != null) {
			if (list1CurrentNode.value != list2CurrentNode.value) return false;

			list1CurrentNode = list1CurrentNode.right;
			list2CurrentNode = list2CurrentNode.right;
		}

		return list1CurrentNode == null && list2CurrentNode == null;
	}

	BinaryTree[] connectLeafNodes(BinaryTree currentNode, BinaryTree head,
	  BinaryTree previousNode) {
		if (currentNode == null) return new BinaryTree[] {head, previousNode};

		if (isLeafNode(currentNode)) {
			if (previousNode == null) {
				head = currentNode;
			} else {
				previousNode.right = currentNode;
			}

			previousNode = currentNode;
		}

		BinaryTree[] nodes = connectLeafNodes(
			currentNode.left,
			head,
			previousNode
			);
		BinaryTree leftHead = nodes[0];
		BinaryTree leftPreviousNode = nodes[1];

		return connectLeafNodes(currentNode.right, leftHead, leftPreviousNode);
	}

	public bool isLeafNode(BinaryTree node) {
		return (node.left == null) && (node.right == null);
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		Program.BinaryTree tree1 = new Program.BinaryTree(1);
		tree1.left = new Program.BinaryTree(2);
		tree1.right = new Program.BinaryTree(3);
		tree1.left.left = new Program.BinaryTree(4);
		tree1.left.right = new Program.BinaryTree(5);
		tree1.right.right = new Program.BinaryTree(6);
		tree1.left.right.left = new Program.BinaryTree(7);
		tree1.left.right.right = new Program.BinaryTree(8);

		Program.BinaryTree tree2 = new Program.BinaryTree(1);
		tree2.left = new Program.BinaryTree(2);
		tree2.right = new Program.BinaryTree(3);
		tree2.left.left = new Program.BinaryTree(4);
		tree2.left.right = new Program.BinaryTree(7);
		tree2.right.right = new Program.BinaryTree(5);
		tree2.right.right.left = new Program.BinaryTree(8);
		tree2.right.right.right = new Program.BinaryTree(6);

		var expected = true;
		var actual = new Program().CompareLeafTraversal(tree1, tree2);
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
	tree1 := &BinaryTree{Value: 1}
	tree1.Left = &BinaryTree{Value: 2}
	tree1.Right = &BinaryTree{Value: 3}
	tree1.Left.Left = &BinaryTree{Value: 4}
	tree1.Left.Right = &BinaryTree{Value: 5}
	tree1.Right.Right = &BinaryTree{Value: 6}
	tree1.Left.Right.Left = &BinaryTree{Value: 7}
	tree1.Left.Right.Right = &BinaryTree{Value: 8}

	tree2 := &BinaryTree{Value: 1}
	tree2.Left = &BinaryTree{Value: 2}
	tree2.Right = &BinaryTree{Value: 3}
	tree2.Left.Left = &BinaryTree{Value: 4}
	tree2.Left.Right = &BinaryTree{Value: 7}
	tree2.Right.Right = &BinaryTree{Value: 5}
	tree2.Right.Right.Left = &BinaryTree{Value: 8}
	tree2.Right.Right.Right = &BinaryTree{Value: 6}

	expected := true
	actual := CompareLeafTraversal(tree1, tree2)
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

// O(n + m) time | O(h1 + h2) space - where n is the number of nodes in the first
// Binary Tree, m is the number in the second, h1 is the height of the first Binary
// Tree, and h2 is the height of the second
func CompareLeafTraversal(tree1 *BinaryTree, tree2 *BinaryTree) bool {
	tree1TraversalStack := []*BinaryTree{tree1}
	tree2TraversalStack := []*BinaryTree{tree2}

	for len(tree1TraversalStack) > 0 && len(tree2TraversalStack) > 0 {
		tree1Leaf := getNextLeafNode(&tree1TraversalStack)
		tree2Leaf := getNextLeafNode(&tree2TraversalStack)

		if tree1Leaf.Value != tree2Leaf.Value {
			return false
		}
	}

	return len(tree1TraversalStack) == 0 && len(tree2TraversalStack) == 0
}

func getNextLeafNode(traversalStack *[]*BinaryTree) *BinaryTree {
	var currentNode *BinaryTree
	currentNode, *traversalStack = (*traversalStack)[len(*traversalStack)-1], (*traversalStack)[:len(*traversalStack)-1]

	for !isLeafNode(currentNode) {
		if currentNode.Right != nil {
			*traversalStack = append(*traversalStack, currentNode.Right)
		}

		// We purposely add the left node to the stack after the
		// right node so that it gets popped off the stack first.
		if currentNode.Left != nil {
			*traversalStack = append(*traversalStack, currentNode.Left)
		}
		currentNode, *traversalStack = (*traversalStack)[len(*traversalStack)-1], (*traversalStack)[:len(*traversalStack)-1]
	}

	return currentNode
}

func isLeafNode(node *BinaryTree) bool {
	return node.Left == nil && node.Right == nil
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

type TreePair struct {
	First  *BinaryTree
	Second *BinaryTree
}

// O(n + m) time | O(max(h1, h2)) space - where n is the number of nodes in the first
// Binary Tree, m is the number in the second, h1 is the height of the first Binary
// Tree, and h2 is the height of the second
func CompareLeafTraversal(tree1 *BinaryTree, tree2 *BinaryTree) bool {
	tree1LeafNodesLinkedList := connectLeafNodes(tree1, nil, nil).First
	tree2LeafNodesLinkedList := connectLeafNodes(tree2, nil, nil).First

	list1CurrentNode := tree1LeafNodesLinkedList
	list2CurrentNode := tree2LeafNodesLinkedList
	for list1CurrentNode != nil && list2CurrentNode != nil {
		if list1CurrentNode.Value != list2CurrentNode.Value {
			return false
		}

		list1CurrentNode = list1CurrentNode.Right
		list2CurrentNode = list2CurrentNode.Right
	}

	return list1CurrentNode == nil && list2CurrentNode == nil
}

func connectLeafNodes(currentNode *BinaryTree, head *BinaryTree, previousNode *BinaryTree) TreePair {
	if currentNode == nil {
		return TreePair{head, previousNode}
	}

	newHead := head
	newPreviousNode := previousNode

	if isLeafNode(currentNode) {
		if previousNode == nil {
			newHead = currentNode
		} else {
			previousNode.Right = currentNode
		}

		newPreviousNode = currentNode
	}

	leftPair := connectLeafNodes(currentNode.Left, newHead, newPreviousNode)
	leftHead, leftPreviousNode := leftPair.First, leftPair.Second
	return connectLeafNodes(currentNode.Right, leftHead, leftPreviousNode)
}

func isLeafNode(node *BinaryTree) bool {
	return node.Left == nil && node.Right == nil
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	tree1 := &BinaryTree{Value: 1}
	tree1.Left = &BinaryTree{Value: 2}
	tree1.Right = &BinaryTree{Value: 3}
	tree1.Left.Left = &BinaryTree{Value: 4}
	tree1.Left.Right = &BinaryTree{Value: 5}
	tree1.Right.Right = &BinaryTree{Value: 6}
	tree1.Left.Right.Left = &BinaryTree{Value: 7}
	tree1.Left.Right.Right = &BinaryTree{Value: 8}

	tree2 := &BinaryTree{Value: 1}
	tree2.Left = &BinaryTree{Value: 2}
	tree2.Right = &BinaryTree{Value: 3}
	tree2.Left.Left = &BinaryTree{Value: 4}
	tree2.Left.Right = &BinaryTree{Value: 7}
	tree2.Right.Right = &BinaryTree{Value: 5}
	tree2.Right.Right.Left = &BinaryTree{Value: 8}
	tree2.Right.Right.Right = &BinaryTree{Value: 6}

	expected := true
	actual := CompareLeafTraversal(tree1, tree2)
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
    Program.BinaryTree tree1 = new Program.BinaryTree(1);
    tree1.left = new Program.BinaryTree(2);
    tree1.right = new Program.BinaryTree(3);
    tree1.left.left = new Program.BinaryTree(4);
    tree1.left.right = new Program.BinaryTree(5);
    tree1.right.right = new Program.BinaryTree(6);
    tree1.left.right.left = new Program.BinaryTree(7);
    tree1.left.right.right = new Program.BinaryTree(8);

    Program.BinaryTree tree2 = new Program.BinaryTree(1);
    tree2.left = new Program.BinaryTree(2);
    tree2.right = new Program.BinaryTree(3);
    tree2.left.left = new Program.BinaryTree(4);
    tree2.left.right = new Program.BinaryTree(7);
    tree2.right.right = new Program.BinaryTree(5);
    tree2.right.right.left = new Program.BinaryTree(8);
    tree2.right.right.right = new Program.BinaryTree(6);

    var expected = true;
    var actual = new Program().compareLeafTraversal(tree1, tree2);
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

  // O(n + m) time | O(h1 + h2) space - where n is the number of nodes in the first
  // Binary Tree, m is the number in the second, h1 is the height of the first Binary
  // Tree, and h2 is the height of the second
  public boolean compareLeafTraversal(BinaryTree tree1, BinaryTree tree2) {
    Stack<BinaryTree> tree1TraversalStack = new Stack<BinaryTree>();
    tree1TraversalStack.push(tree1);
    Stack<BinaryTree> tree2TraversalStack = new Stack<BinaryTree>();
    tree2TraversalStack.push(tree2);

    while (tree1TraversalStack.size() > 0 && tree2TraversalStack.size() > 0) {
      BinaryTree tree1Leaf = getNextLeafNode(tree1TraversalStack);
      BinaryTree tree2Leaf = getNextLeafNode(tree2TraversalStack);

      if (tree1Leaf.value != tree2Leaf.value) {
        return false;
      }
    }

    return (tree1TraversalStack.size() == 0) && (tree2TraversalStack.size() == 0);
  }

  public BinaryTree getNextLeafNode(Stack<BinaryTree> traversalStack) {
    BinaryTree currentNode = traversalStack.pop();

    while (!isLeafNode(currentNode)) {
      if (currentNode.right != null) {
        traversalStack.push(currentNode.right);
      }

      // We purposely add the left node to the stack after the
      // right node so that it gets popped off the stack first.
      if (currentNode.left != null) {
        traversalStack.push(currentNode.left);
      }

      currentNode = traversalStack.pop();
    }

    return currentNode;
  }

  public boolean isLeafNode(BinaryTree node) {
    return (node.left == null) && (node.right == null);
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

  // O(n + m) time | O(max(h1, h2)) space - where n is the number of nodes in the first
  // Binary Tree, m is the number in the second, h1 is the height of the first Binary
  // Tree, and h2 is the height of the second
  public boolean compareLeafTraversal(BinaryTree tree1, BinaryTree tree2) {
    BinaryTree tree1LeafNodesLinkedList = connectLeafNodes(tree1, null, null)[0];
    BinaryTree tree2LeafNodesLinkedList = connectLeafNodes(tree2, null, null)[0];

    BinaryTree list1CurrentNode = tree1LeafNodesLinkedList;
    BinaryTree list2CurrentNode = tree2LeafNodesLinkedList;
    while (list1CurrentNode != null && list2CurrentNode != null) {
      if (list1CurrentNode.value != list2CurrentNode.value) return false;

      list1CurrentNode = list1CurrentNode.right;
      list2CurrentNode = list2CurrentNode.right;
    }

    return list1CurrentNode == null && list2CurrentNode == null;
  }

  BinaryTree[] connectLeafNodes(BinaryTree currentNode, BinaryTree head, BinaryTree previousNode) {
    if (currentNode == null) return new BinaryTree[] {head, previousNode};

    if (isLeafNode(currentNode)) {
      if (previousNode == null) {
        head = currentNode;
      } else {
        previousNode.right = currentNode;
      }

      previousNode = currentNode;
    }

    BinaryTree[] nodes = connectLeafNodes(currentNode.left, head, previousNode);
    BinaryTree leftHead = nodes[0];
    BinaryTree leftPreviousNode = nodes[1];

    return connectLeafNodes(currentNode.right, leftHead, leftPreviousNode);
  }

  public boolean isLeafNode(BinaryTree node) {
    return (node.left == null) && (node.right == null);
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    Program.BinaryTree tree1 = new Program.BinaryTree(1);
    tree1.left = new Program.BinaryTree(2);
    tree1.right = new Program.BinaryTree(3);
    tree1.left.left = new Program.BinaryTree(4);
    tree1.left.right = new Program.BinaryTree(5);
    tree1.right.right = new Program.BinaryTree(6);
    tree1.left.right.left = new Program.BinaryTree(7);
    tree1.left.right.right = new Program.BinaryTree(8);

    Program.BinaryTree tree2 = new Program.BinaryTree(1);
    tree2.left = new Program.BinaryTree(2);
    tree2.right = new Program.BinaryTree(3);
    tree2.left.left = new Program.BinaryTree(4);
    tree2.left.right = new Program.BinaryTree(7);
    tree2.right.right = new Program.BinaryTree(5);
    tree2.right.right.left = new Program.BinaryTree(8);
    tree2.right.right.right = new Program.BinaryTree(6);

    var expected = true;
    var actual = new Program().compareLeafTraversal(tree1, tree2);
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
  const tree1 = new program.BinaryTree(1);
  tree1.left = new program.BinaryTree(2);
  tree1.right = new program.BinaryTree(3);
  tree1.left.left = new program.BinaryTree(4);
  tree1.left.right = new program.BinaryTree(5);
  tree1.right.right = new program.BinaryTree(6);
  tree1.left.right.left = new program.BinaryTree(7);
  tree1.left.right.right = new program.BinaryTree(8);

  const tree2 = new program.BinaryTree(1);
  tree2.left = new program.BinaryTree(2);
  tree2.right = new program.BinaryTree(3);
  tree2.left.left = new program.BinaryTree(4);
  tree2.left.right = new program.BinaryTree(7);
  tree2.right.right = new program.BinaryTree(5);
  tree2.right.right.left = new program.BinaryTree(8);
  tree2.right.right.right = new program.BinaryTree(6);

  const expected = true;
  const actual = program.compareLeafTraversal(tree1, tree2);

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

// O(n + m) time | O(h1 + h2) space - where n is the number of nodes in the first
// Binary Tree, m is the number in the second, h1 is the height of the first Binary
// Tree, and h2 is the height of the second
function compareLeafTraversal(tree1, tree2) {
  const tree1TraversalStack = [tree1];
  const tree2TraversalStack = [tree2];

  while (tree1TraversalStack.length > 0 && tree2TraversalStack.length > 0) {
    const tree1Leaf = getNextLeafNode(tree1TraversalStack);
    const tree2Leaf = getNextLeafNode(tree2TraversalStack);

    if (tree1Leaf.value !== tree2Leaf.value) return false;
  }

  return tree1TraversalStack.length === 0 && tree2TraversalStack.length === 0;
}

function getNextLeafNode(traversalStack) {
  let currentNode = traversalStack.pop();

  while (!isLeafNode(currentNode)) {
    if (currentNode.right !== null) traversalStack.push(currentNode.right);

    // We purposely add the left node to the stack after the
    // right node so that it gets popped off the stack first.
    if (currentNode.left !== null) traversalStack.push(currentNode.left);

    currentNode = traversalStack.pop();
  }

  return currentNode;
}

function isLeafNode(node) {
  return node.left === null && node.right === null;
}

// Do not edit the lines below.
exports.BinaryTree = BinaryTree;
exports.compareLeafTraversal = compareLeafTraversal;

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

// O(n + m) time | O(max(h1, h2)) space - where n is the number of nodes in the first
// Binary Tree, m is the number in the second, h1 is the height of the first Binary
// Tree, and h2 is the height of the second
function compareLeafTraversal(tree1, tree2) {
  const [tree1LeafNodesLinkedList, _1] = connectLeafNodes(tree1);
  const [tree2LeafNodesLinkedList, _2] = connectLeafNodes(tree2);

  let list1CurrentNode = tree1LeafNodesLinkedList;
  let list2CurrentNode = tree2LeafNodesLinkedList;
  while (list1CurrentNode !== null && list2CurrentNode !== null) {
    if (list1CurrentNode.value !== list2CurrentNode.value) return false;

    list1CurrentNode = list1CurrentNode.right;
    list2CurrentNode = list2CurrentNode.right;
  }

  return list1CurrentNode === null && list2CurrentNode === null;
}

function connectLeafNodes(currentNode, head = null, previousNode = null) {
  if (currentNode === null) return [head, previousNode];

  if (isLeafNode(currentNode)) {
    if (previousNode === null) {
      head = currentNode;
    } else {
      previousNode.right = currentNode;
    }

    previousNode = currentNode;
  }

  const [leftHead, leftPreviousNode] = connectLeafNodes(currentNode.left, head, previousNode);
  return connectLeafNodes(currentNode.right, leftHead, leftPreviousNode);
}

function isLeafNode(node) {
  return node.left === null && node.right === null;
}

// Do not edit the lines below.
exports.BinaryTree = BinaryTree;
exports.compareLeafTraversal = compareLeafTraversal;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const tree1 = new program.BinaryTree(1);
  tree1.left = new program.BinaryTree(2);
  tree1.right = new program.BinaryTree(3);
  tree1.left.left = new program.BinaryTree(4);
  tree1.left.right = new program.BinaryTree(5);
  tree1.right.right = new program.BinaryTree(6);
  tree1.left.right.left = new program.BinaryTree(7);
  tree1.left.right.right = new program.BinaryTree(8);

  const tree2 = new program.BinaryTree(1);
  tree2.left = new program.BinaryTree(2);
  tree2.right = new program.BinaryTree(3);
  tree2.left.left = new program.BinaryTree(4);
  tree2.left.right = new program.BinaryTree(7);
  tree2.right.right = new program.BinaryTree(5);
  tree2.right.right.left = new program.BinaryTree(8);
  tree2.right.right.right = new program.BinaryTree(6);

  const expected = true;
  const actual = program.compareLeafTraversal(tree1, tree2);

  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.BinaryTree
import com.algoexpert.program.compareLeafTraversal

class ProgramTest {
    @Test
    fun TestCase1() {
        val tree1 = BinaryTree(1)
        tree1.left = BinaryTree(2)
        tree1.right = BinaryTree(3)
        tree1.left!!.left = BinaryTree(4)
        tree1.left!!.right = BinaryTree(5)
        tree1.right!!.right = BinaryTree(6)
        tree1.left!!.right!!.left = BinaryTree(7)
        tree1.left!!.right!!.right = BinaryTree(8)

        val tree2 = BinaryTree(1)
        tree2.left = BinaryTree(2)
        tree2.right = BinaryTree(3)
        tree2.left!!.left = BinaryTree(4)
        tree2.left!!.right = BinaryTree(7)
        tree2.right!!.right = BinaryTree(5)
        tree2.right!!.right!!.left = BinaryTree(8)
        tree2.right!!.right!!.right = BinaryTree(6)

        val expected = true
        val output = compareLeafTraversal(tree1, tree2)

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

// O(n + m) time | O(h1 + h2) space - where n is the number of nodes in the first 
// Binary Tree, m is the number in the second, h1 is the height of the first Binary 
// Tree, and h2 is the height of the second
fun compareLeafTraversal(tree1: BinaryTree, tree2: BinaryTree): Boolean {
    val tree1TraversalStack = mutableListOf(tree1)
    val tree2TraversalStack = mutableListOf(tree2)

    while (tree1TraversalStack.size > 0 && tree2TraversalStack.size > 0) {
        val tree1Leaf = getNextLeafNode(tree1TraversalStack)
        val tree2Leaf = getNextLeafNode(tree2TraversalStack)

        if (tree1Leaf.value != tree2Leaf.value) return false
    }

    return tree1TraversalStack.size == 0 && tree2TraversalStack.size == 0
}

fun getNextLeafNode(traversalStack: MutableList<BinaryTree>): BinaryTree {
    var currentNode = traversalStack.removeAt(traversalStack.size - 1)

    while (!isLeafNode(currentNode)) {
        if (currentNode.right != null) traversalStack.add(currentNode.right!!)

        // We purposely add the left node to the stack after the
        // right node so that it gets popped off the stack first.
        if (currentNode.left != null) traversalStack.add(currentNode.left!!)

        currentNode = traversalStack.removeAt(traversalStack.size - 1)
    }

    return currentNode
}

fun isLeafNode(node: BinaryTree): Boolean {
    return node.left == null && node.right == null
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

// O(n + m) time | O(max(h1, h2)) space - where n is the number of nodes in the first
// Binary Tree, m is the number in the second, h1 is the height of the first Binary
// Tree, and h2 is the height of the second
fun compareLeafTraversal(tree1: BinaryTree, tree2: BinaryTree): Boolean {
    val (tree1LeafNodesLinkedList, _) = connectLeafNodes(tree1)
    val (tree2LeafNodesLinkedList, _) = connectLeafNodes(tree2)

    var list1CurrentNode: BinaryTree? = tree1LeafNodesLinkedList
    var list2CurrentNode: BinaryTree? = tree2LeafNodesLinkedList
    while (list1CurrentNode != null && list2CurrentNode != null) {
        if (list1CurrentNode.value != list2CurrentNode.value) return false

        list1CurrentNode = list1CurrentNode.right
        list2CurrentNode = list2CurrentNode.right
    }

    return list1CurrentNode == null && list2CurrentNode == null
}

fun connectLeafNodes(currentNode: BinaryTree?, head: BinaryTree? = null, previousNode: BinaryTree? = null): Pair<BinaryTree?, BinaryTree?> {
    if (currentNode == null) return Pair(head, previousNode)

    var newHead = head
    var newPreviousNode = previousNode

    if (isLeafNode(currentNode)) {
        if (previousNode == null) {
            newHead = currentNode
        } else {
            previousNode.right = currentNode
        }

        newPreviousNode = currentNode
    }

    val (leftHead, leftPreviousNode) = connectLeafNodes(
        currentNode.left,
        newHead,
        newPreviousNode
    )
    return connectLeafNodes(currentNode.right, leftHead, leftPreviousNode)
}

fun isLeafNode(node: BinaryTree): Boolean {
    return node.left == null && node.right == null
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.BinaryTree
import com.algoexpert.program.compareLeafTraversal

class ProgramTest {
    @Test
    fun TestCase1() {
        val tree1 = BinaryTree(1)
        tree1.left = BinaryTree(2)
        tree1.right = BinaryTree(3)
        tree1.left!!.left = BinaryTree(4)
        tree1.left!!.right = BinaryTree(5)
        tree1.right!!.right = BinaryTree(6)
        tree1.left!!.right!!.left = BinaryTree(7)
        tree1.left!!.right!!.right = BinaryTree(8)

        val tree2 = BinaryTree(1)
        tree2.left = BinaryTree(2)
        tree2.right = BinaryTree(3)
        tree2.left!!.left = BinaryTree(4)
        tree2.left!!.right = BinaryTree(7)
        tree2.right!!.right = BinaryTree(5)
        tree2.right!!.right!!.left = BinaryTree(8)
        tree2.right!!.right!!.right = BinaryTree(6)

        val expected = true
        val output = compareLeafTraversal(tree1, tree2)

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
      var tree1 = Program.BinaryTree(value: 1)
      tree1.left = Program.BinaryTree(value: 2)
      tree1.right = Program.BinaryTree(value: 3)
      tree1.left!.left = Program.BinaryTree(value: 4)
      tree1.left!.right = Program.BinaryTree(value: 5)
      tree1.right!.right = Program.BinaryTree(value: 6)
      tree1.left!.right!.left = Program.BinaryTree(value: 7)
      tree1.left!.right!.right = Program.BinaryTree(value: 8)

      var tree2 = Program.BinaryTree(value: 1)
      tree2.left = Program.BinaryTree(value: 2)
      tree2.right = Program.BinaryTree(value: 3)
      tree2.left!.left = Program.BinaryTree(value: 4)
      tree2.left!.right = Program.BinaryTree(value: 7)
      tree2.right!.right = Program.BinaryTree(value: 5)
      tree2.right!.right!.left = Program.BinaryTree(value: 8)
      tree2.right!.right!.right = Program.BinaryTree(value: 6)

      var expected = true
      var actual = Program().compareLeafTraversal(tree1, tree2)
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

  // O(n + m) time | O(h1 + h2) space - where n is the number of nodes in the first
  // Binary Tree, m is the number in the second, h1 is the height of the first Binary
  // Tree, and h2 is the height of the second
  func compareLeafTraversal(_ tree1: BinaryTree, _ tree2: BinaryTree) -> Bool {
    var tree1TraversalStack = [tree1]
    var tree2TraversalStack = [tree2]

    while tree1TraversalStack.count > 0, tree2TraversalStack.count > 0 {
      let tree1Leaf = getNextLeafNode(&tree1TraversalStack)
      let tree2Leaf = getNextLeafNode(&tree2TraversalStack)

      if tree1Leaf.value != tree2Leaf.value {
        return false
      }
    }
    return tree1TraversalStack.count == 0 && tree2TraversalStack.count == 0
  }

  func getNextLeafNode(_ traversalStack: inout [BinaryTree]) -> BinaryTree {
    var currentNode = traversalStack.popLast()!

    while !isLeafNode(currentNode) {
      if currentNode.right != nil {
        traversalStack.append(currentNode.right!)
      }

      // We purposely add the left node to the stack after the
      // right node so that it gets popped off the stack first.
      if currentNode.left != nil {
        traversalStack.append(currentNode.left!)
      }

      currentNode = traversalStack.popLast()!
    }
    return currentNode
  }

  func isLeafNode(_ node: BinaryTree) -> Bool {
    return node.left == nil && node.right == nil
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

  // O(n + m) time | O(max(h1, h2)) space - where n is the number of nodes in the first
  // Binary Tree, m is the number in the second, h1 is the height of the first Binary
  // Tree, and h2 is the height of the second
  func compareLeafTraversal(_ tree1: BinaryTree, _ tree2: BinaryTree) -> Bool {
    var tree1LeafNodesLinkedList = connectLeafNodes(tree1, nil, nil).0
    var tree2LeafNodesLinkedList = connectLeafNodes(tree2, nil, nil).0

    var list1CurrentNode: BinaryTree? = tree1LeafNodesLinkedList
    var list2CurrentNode: BinaryTree? = tree2LeafNodesLinkedList
    while list1CurrentNode != nil, list2CurrentNode != nil {
      if list1CurrentNode!.value != list2CurrentNode!.value {
        return false
      }

      list1CurrentNode = list1CurrentNode!.right
      list2CurrentNode = list2CurrentNode!.right
    }

    return list1CurrentNode == nil && list2CurrentNode == nil
  }

  func connectLeafNodes(_ currentNode: BinaryTree?, _ head: BinaryTree?, _ previousNode: BinaryTree?) -> (BinaryTree?, BinaryTree?) {
    if currentNode == nil {
      return (head, previousNode)
    }

    var newHead = head
    var newPreviousNode = previousNode

    if isLeafNode(currentNode!) {
      if previousNode == nil {
        newHead = currentNode
      } else {
        previousNode!.right = currentNode
      }

      newPreviousNode = currentNode
    }

    let (leftHead, leftPreviousNode) = connectLeafNodes(currentNode!.left, newHead, newPreviousNode)
    return connectLeafNodes(currentNode!.right, leftHead, leftPreviousNode)
  }

  func isLeafNode(_ node: BinaryTree) -> Bool {
    return node.left == nil && node.right == nil
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var tree1 = Program.BinaryTree(value: 1)
      tree1.left = Program.BinaryTree(value: 2)
      tree1.right = Program.BinaryTree(value: 3)
      tree1.left!.left = Program.BinaryTree(value: 4)
      tree1.left!.right = Program.BinaryTree(value: 5)
      tree1.right!.right = Program.BinaryTree(value: 6)
      tree1.left!.right!.left = Program.BinaryTree(value: 7)
      tree1.left!.right!.right = Program.BinaryTree(value: 8)

      var tree2 = Program.BinaryTree(value: 1)
      tree2.left = Program.BinaryTree(value: 2)
      tree2.right = Program.BinaryTree(value: 3)
      tree2.left!.left = Program.BinaryTree(value: 4)
      tree2.left!.right = Program.BinaryTree(value: 7)
      tree2.right!.right = Program.BinaryTree(value: 5)
      tree2.right!.right!.left = Program.BinaryTree(value: 8)
      tree2.right!.right!.right = Program.BinaryTree(value: 6)

      var expected = true
      var actual = Program().compareLeafTraversal(tree1, tree2)
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
        tree1 = program.BinaryTree(1)
        tree1.left = program.BinaryTree(2)
        tree1.right = program.BinaryTree(3)
        tree1.left.left = program.BinaryTree(4)
        tree1.left.right = program.BinaryTree(5)
        tree1.right.right = program.BinaryTree(6)
        tree1.left.right.left = program.BinaryTree(7)
        tree1.left.right.right = program.BinaryTree(8)

        tree2 = program.BinaryTree(1)
        tree2.left = program.BinaryTree(2)
        tree2.right = program.BinaryTree(3)
        tree2.left.left = program.BinaryTree(4)
        tree2.left.right = program.BinaryTree(7)
        tree2.right.right = program.BinaryTree(5)
        tree2.right.right.left = program.BinaryTree(8)
        tree2.right.right.right = program.BinaryTree(6)

        expected = True
        actual = program.compareLeafTraversal(tree1, tree2)

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


# O(n + m) time | O(h1 + h2) space - where n is the number of nodes in the first
# Binary Tree, m is the number in the second, h1 is the height of the first Binary
# Tree, and h2 is the height of the second
def compareLeafTraversal(tree1, tree2):
    tree1TraversalStack = [tree1]
    tree2TraversalStack = [tree2]

    while len(tree1TraversalStack) > 0 and len(tree2TraversalStack) > 0:
        tree1Leaf = getNextLeafNode(tree1TraversalStack)
        tree2Leaf = getNextLeafNode(tree2TraversalStack)

        if tree1Leaf.value != tree2Leaf.value:
            return False

    return len(tree1TraversalStack) == 0 and len(tree2TraversalStack) == 0


def getNextLeafNode(traversalStack):
    currentNode = traversalStack.pop()

    while not isLeafNode(currentNode):
        if currentNode.right is not None:
            traversalStack.append(currentNode.right)

        # We purposely add the left node to the stack after the
        # right node so that it gets popped off the stack first.
        if currentNode.left is not None:
            traversalStack.append(currentNode.left)

        currentNode = traversalStack.pop()

    return currentNode


def isLeafNode(node):
    return node.left is None and node.right is None

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


# O(n + m) time | O(max(h1, h2)) space - where n is the number of nodes in the first
# Binary Tree, m is the number in the second, h1 is the height of the first Binary
# Tree, and h2 is the height of the second
def compareLeafTraversal(tree1, tree2):
    tree1LeafNodesLinkedList, _ = connectLeafNodes(tree1)
    tree2LeafNodesLinkedList, _ = connectLeafNodes(tree2)

    list1CurrentNode = tree1LeafNodesLinkedList
    list2CurrentNode = tree2LeafNodesLinkedList
    while list1CurrentNode is not None and list2CurrentNode is not None:
        if list1CurrentNode.value != list2CurrentNode.value:
            return False

        list1CurrentNode = list1CurrentNode.right
        list2CurrentNode = list2CurrentNode.right

    return list1CurrentNode is None and list2CurrentNode is None


def connectLeafNodes(currentNode, head=None, previousNode=None):
    if currentNode is None:
        return head, previousNode

    if isLeafNode(currentNode):
        if previousNode is None:
            head = currentNode
        else:
            previousNode.right = currentNode

        previousNode = currentNode

    leftHead, leftPreviousNode = connectLeafNodes(currentNode.left, head, previousNode)
    return connectLeafNodes(currentNode.right, leftHead, leftPreviousNode)


def isLeafNode(node):
    return node.left is None and node.right is None

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        tree1 = program.BinaryTree(1)
        tree1.left = program.BinaryTree(2)
        tree1.right = program.BinaryTree(3)
        tree1.left.left = program.BinaryTree(4)
        tree1.left.right = program.BinaryTree(5)
        tree1.right.right = program.BinaryTree(6)
        tree1.left.right.left = program.BinaryTree(7)
        tree1.left.right.right = program.BinaryTree(8)

        tree2 = program.BinaryTree(1)
        tree2.left = program.BinaryTree(2)
        tree2.right = program.BinaryTree(3)
        tree2.left.left = program.BinaryTree(4)
        tree2.left.right = program.BinaryTree(7)
        tree2.right.right = program.BinaryTree(5)
        tree2.right.right.left = program.BinaryTree(8)
        tree2.right.right.right = program.BinaryTree(6)

        expected = True
        actual = program.compareLeafTraversal(tree1, tree2)

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
  const tree1 = new program.BinaryTree(1);
  tree1.left = new program.BinaryTree(2);
  tree1.right = new program.BinaryTree(3);
  tree1.left.left = new program.BinaryTree(4);
  tree1.left.right = new program.BinaryTree(5);
  tree1.right.right = new program.BinaryTree(6);
  tree1.left.right.left = new program.BinaryTree(7);
  tree1.left.right.right = new program.BinaryTree(8);

  const tree2 = new program.BinaryTree(1);
  tree2.left = new program.BinaryTree(2);
  tree2.right = new program.BinaryTree(3);
  tree2.left.left = new program.BinaryTree(4);
  tree2.left.right = new program.BinaryTree(7);
  tree2.right.right = new program.BinaryTree(5);
  tree2.right.right.left = new program.BinaryTree(8);
  tree2.right.right.right = new program.BinaryTree(6);

  const expected = true;
  const actual = program.compareLeafTraversal(tree1, tree2);

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

// O(n + m) time | O(h1 + h2) space - where n is the number of nodes in the first
// Binary Tree, m is the number in the second, h1 is the height of the first Binary
// Tree, and h2 is the height of the second
export function compareLeafTraversal(tree1: BinaryTree, tree2: BinaryTree) {
  const tree1TraversalStack = [tree1];
  const tree2TraversalStack = [tree2];

  while (tree1TraversalStack.length > 0 && tree2TraversalStack.length > 0) {
    const tree1Leaf = getNextLeafNode(tree1TraversalStack);
    const tree2Leaf = getNextLeafNode(tree2TraversalStack);

    if (tree1Leaf.value !== tree2Leaf.value) return false;
  }

  return tree1TraversalStack.length === 0 && tree2TraversalStack.length === 0;
}

function getNextLeafNode(traversalStack: BinaryTree[]) {
  let currentNode = traversalStack.pop()!;

  while (!isLeafNode(currentNode)) {
    if (currentNode.right !== null) traversalStack.push(currentNode.right);

    // We purposely add the left node to the stack after the
    // right node so that it gets popped off the stack first.
    if (currentNode.left !== null) traversalStack.push(currentNode.left);

    currentNode = traversalStack.pop()!;
  }

  return currentNode;
}

function isLeafNode(node: BinaryTree) {
  return node.left === null && node.right === null;
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

// O(n + m) time | O(max(h1, h2)) space - where n is the number of nodes in the first
// Binary Tree, m is the number in the second, h1 is the height of the first Binary
// Tree, and h2 is the height of the second
export function compareLeafTraversal(tree1: BinaryTree, tree2: BinaryTree) {
  const [tree1LeafNodesLinkedList, _1] = connectLeafNodes(tree1);
  const [tree2LeafNodesLinkedList, _2] = connectLeafNodes(tree2);

  let list1CurrentNode: BinaryTree | null = tree1LeafNodesLinkedList;
  let list2CurrentNode: BinaryTree | null = tree2LeafNodesLinkedList;
  while (list1CurrentNode !== null && list2CurrentNode !== null) {
    if (list1CurrentNode.value !== list2CurrentNode.value) return false;

    list1CurrentNode = list1CurrentNode.right;
    list2CurrentNode = list2CurrentNode.right;
  }

  return list1CurrentNode === null && list2CurrentNode === null;
}

function connectLeafNodes(
  currentNode: BinaryTree | null,
  head: BinaryTree | null = null,
  previousNode: BinaryTree | null = null,
): [BinaryTree | null, BinaryTree | null] {
  if (currentNode === null) return [head, previousNode];

  if (isLeafNode(currentNode)) {
    if (previousNode === null) {
      head = currentNode;
    } else {
      previousNode.right = currentNode;
    }

    previousNode = currentNode;
  }

  const [leftHead, leftPreviousNode] = connectLeafNodes(currentNode.left, head, previousNode);
  return connectLeafNodes(currentNode.right, leftHead, leftPreviousNode);
}

function isLeafNode(node: BinaryTree) {
  return node.left === null && node.right === null;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const tree1 = new program.BinaryTree(1);
  tree1.left = new program.BinaryTree(2);
  tree1.right = new program.BinaryTree(3);
  tree1.left.left = new program.BinaryTree(4);
  tree1.left.right = new program.BinaryTree(5);
  tree1.right.right = new program.BinaryTree(6);
  tree1.left.right.left = new program.BinaryTree(7);
  tree1.left.right.right = new program.BinaryTree(8);

  const tree2 = new program.BinaryTree(1);
  tree2.left = new program.BinaryTree(2);
  tree2.right = new program.BinaryTree(3);
  tree2.left.left = new program.BinaryTree(4);
  tree2.left.right = new program.BinaryTree(7);
  tree2.right.right = new program.BinaryTree(5);
  tree2.right.right.left = new program.BinaryTree(8);
  tree2.right.right.right = new program.BinaryTree(6);

  const expected = true;
  const actual = program.compareLeafTraversal(tree1, tree2);

  chai.expect(actual).to.deep.equal(expected);
});

```

