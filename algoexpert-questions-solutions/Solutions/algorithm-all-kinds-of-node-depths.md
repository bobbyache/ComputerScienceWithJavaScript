# All Kinds Of Node Depths
<div class="html">
<p>
  The distance between a node in a Binary Tree and the tree's root is called the
  node's depth.
</p>
<p>
  Write a function that takes in a Binary Tree and returns the sum of all of
  its subtrees' nodes' depths.
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
26
<span class="CodeEditor-promptComment">// The sum of the root tree's node depths is 16.</span>
<span class="CodeEditor-promptComment">// The sum of the tree rooted at 2's node depths is 6.</span>
<span class="CodeEditor-promptComment">// The sum of the tree rooted at 3's node depths is 2.</span>
<span class="CodeEditor-promptComment">// The sum of the tree rooted at 4's node depths is 2.</span>
<span class="CodeEditor-promptComment">// Summing all of these sums yields 26.</span>
</pre>
</div>

Hint 1
<p>
You can calculate the sum of a tree's node depths with a simple recursive function. Iterate through every node in the tree, call the simple recursive function on each node to caculate the sum of the node depths of the tree rooted at the node in question, and add up all of the sums to obtain the final sum.
</p>


Hint 2

<p>
You can solve this question in linear time by coming up with a relation between a tree's sum of node depths and the sums of node depths of the trees rooted at its left and right child nodes.
</p>


Hint 3

<p>
The depth of a node relative to a node X is 1 value smaller than its depth relative to node X's parent node Y. It follows that, if a subtree rooted at node X has a sum of node depths S, you can get the sum of those node depths relative to node Y by calculating: S + number-of-nodes-in-subtree-rooted-at-X, since this effectively increments all of the node depths relative to node X by 1.
</p>


Hint 4

<p>
From Hint #3, we can deduce the formula: nodeDepths(node) = nodeDepths(node.left) + numberOfNodesInLeftSubtree + nodeDepths(node.right) + numberOfNodesInRightSubtree. We can easily count the number of nodes in each subtree with a single pass in the input tree, and then we can apply this formula to calculate all of the node depths in linear time and finally sum them up.
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
      int actual = allKindsOfNodeDepths(root);
      assert(actual == 26);
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

int nodeDepths(BinaryTree *node, int depth = 0);

// Average case: when the tree is balanced
// O(nlog(n)) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
int allKindsOfNodeDepths(BinaryTree *root) {
  int sumOfAllDepths = 0;
  vector<BinaryTree *> stack = {root};
  while (stack.size() > 0) {
    BinaryTree *node = stack.back();
    stack.pop_back();
    if (node == nullptr)
      continue;
    sumOfAllDepths += nodeDepths(node);
    stack.push_back(node->left);
    stack.push_back(node->right);
  }
  return sumOfAllDepths;
}

int nodeDepths(BinaryTree *node, int depth) {
  if (node == nullptr)
    return 0;
  return depth + nodeDepths(node->left, depth + 1) +
         nodeDepths(node->right, depth + 1);
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

int nodeDepths(BinaryTree *node, int depth = 0);

// Average case: when the tree is balanced
// O(nlog(n)) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
int allKindsOfNodeDepths(BinaryTree *root) {
  if (root == nullptr)
    return 0;
  return allKindsOfNodeDepths(root->left) + allKindsOfNodeDepths(root->right) +
         nodeDepths(root);
}

int nodeDepths(BinaryTree *node, int depth) {
  if (node == nullptr)
    return 0;
  return depth + nodeDepths(node->left, depth + 1) +
         nodeDepths(node->right, depth + 1);
}

```
### Solution 3 (cpp)
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

int sumAllNodeDepths(BinaryTree *node,
                     unordered_map<BinaryTree *, int> &nodeDepths);
void addNodeDepths(BinaryTree *node,
                   unordered_map<BinaryTree *, int> &nodeDepths,
                   unordered_map<BinaryTree *, int> &nodeCounts);
void addNodeCounts(BinaryTree *node,
                   unordered_map<BinaryTree *, int> &nodeCounts);

// Average case: when the tree is balanced
// O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
int allKindsOfNodeDepths(BinaryTree *root) {
  unordered_map<BinaryTree *, int> nodeCounts = {};
  addNodeCounts(root, nodeCounts);
  unordered_map<BinaryTree *, int> nodeDepths = {};
  addNodeDepths(root, nodeDepths, nodeCounts);
  return sumAllNodeDepths(root, nodeDepths);
}

int sumAllNodeDepths(BinaryTree *node,
                     unordered_map<BinaryTree *, int> &nodeDepths) {
  if (node == nullptr)
    return 0;
  return sumAllNodeDepths(node->left, nodeDepths) +
         sumAllNodeDepths(node->right, nodeDepths) + nodeDepths[node];
}

void addNodeDepths(BinaryTree *node,
                   unordered_map<BinaryTree *, int> &nodeDepths,
                   unordered_map<BinaryTree *, int> &nodeCounts) {
  nodeDepths.insert({node, 0});
  if (node->left != nullptr) {
    addNodeDepths(node->left, nodeDepths, nodeCounts);
    nodeDepths[node] += nodeDepths[node->left] + nodeCounts[node->left];
  }
  if (node->right != nullptr) {
    addNodeDepths(node->right, nodeDepths, nodeCounts);
    nodeDepths[node] += nodeDepths[node->right] + nodeCounts[node->right];
  }
}

void addNodeCounts(BinaryTree *node,
                   unordered_map<BinaryTree *, int> &nodeCounts) {
  nodeCounts.insert({node, 1});
  if (node->left != nullptr) {
    addNodeCounts(node->left, nodeCounts);
    nodeCounts[node] += nodeCounts[node->left];
  }
  if (node->right != nullptr) {
    addNodeCounts(node->right, nodeCounts);
    nodeCounts[node] += nodeCounts[node->right];
  }
}

```
### Solution 4 (cpp)
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
  int numNodesInTree;
  int sumOfDepths;
  int sumOfAllDepths;
};

TreeInfo getTreeInfo(BinaryTree *tree);

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
int allKindsOfNodeDepths(BinaryTree *root) {
  return getTreeInfo(root).sumOfAllDepths;
}

TreeInfo getTreeInfo(BinaryTree *tree) {
  if (tree == nullptr) {
    return TreeInfo{0, 0, 0};
  }

  TreeInfo leftTreeInfo = getTreeInfo(tree->left);
  TreeInfo rightTreeInfo = getTreeInfo(tree->right);

  int sumOfLeftDepths = leftTreeInfo.sumOfDepths + leftTreeInfo.numNodesInTree;
  int sumOfRightDepths =
      rightTreeInfo.sumOfDepths + rightTreeInfo.numNodesInTree;

  int numNodesInTree =
      1 + leftTreeInfo.numNodesInTree + rightTreeInfo.numNodesInTree;
  int sumOfDepths = sumOfLeftDepths + sumOfRightDepths;
  int sumOfAllDepths =
      sumOfDepths + leftTreeInfo.sumOfAllDepths + rightTreeInfo.sumOfAllDepths;

  return TreeInfo{
      numNodesInTree,
      sumOfDepths,
      sumOfAllDepths,
  };
}

```
### Solution 5 (cpp)
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

int allKindsOfNodeDepthsHelper(BinaryTree *root, int depthSum, int depth);

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
int allKindsOfNodeDepths(BinaryTree *root) {
  return allKindsOfNodeDepthsHelper(root, 0, 0);
}

int allKindsOfNodeDepthsHelper(BinaryTree *root, int depthSum, int depth) {
  if (root == nullptr)
    return 0;

  depthSum += depth;
  return depthSum +
         allKindsOfNodeDepthsHelper(root->left, depthSum, depth + 1) +
         allKindsOfNodeDepthsHelper(root->right, depthSum, depth + 1);
}

```
### Solution 6 (cpp)
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

int allKindsOfNodeDepthsHelper(BinaryTree *root, int depth);

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
int allKindsOfNodeDepths(BinaryTree *root) {
  return allKindsOfNodeDepthsHelper(root, 0);
}

int allKindsOfNodeDepthsHelper(BinaryTree *root, int depth) {
  if (root == nullptr)
    return 0;

  // Formula to calculate 1 + 2 + 3 + ... + depth - 1 + depth
  auto depthSum = (depth * (depth + 1)) / 2;
  return depthSum + allKindsOfNodeDepthsHelper(root->left, depth + 1) +
         allKindsOfNodeDepthsHelper(root->right, depth + 1);
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
      int actual = allKindsOfNodeDepths(root);
      assert(actual == 26);
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
		int actual = Program.AllKindsOfNodeDepths(root);
		Utils.AssertEquals(26, actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// Average case: when the tree is balanced
	// O(nlog(n)) time | O(h) space - where n is the number of nodes in
	// the Binary Tree and h is the height of the Binary Tree
	public static int AllKindsOfNodeDepths(BinaryTree root) {
		int sumOfAllDepths = 0;
		Stack<BinaryTree> stack = new Stack<BinaryTree>();
		stack.Push(root);
		while (stack.Count > 0) {
			BinaryTree node = stack.Pop();
			if (node == null) continue;

			sumOfAllDepths += nodeDepths(node, 0);
			stack.Push(node.left);
			stack.Push(node.right);
		}
		return sumOfAllDepths;
	}

	public static int nodeDepths(BinaryTree node, int depth) {
		if (node == null) return 0;
		return depth + nodeDepths(node.left, depth + 1) + nodeDepths(node.right, depth + 1);
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
	// O(nlog(n)) time | O(h) space - where n is the number of nodes in
	// the Binary Tree and h is the height of the Binary Tree
	public static int AllKindsOfNodeDepths(BinaryTree root) {
		if (root == null) return 0;
		return AllKindsOfNodeDepths(root.left) + AllKindsOfNodeDepths(root.right) +
		       nodeDepths(root, 0);
	}

	public static int nodeDepths(BinaryTree node, int depth) {
		if (node == null) return 0;
		return depth + nodeDepths(node.left, depth + 1) + nodeDepths(node.right, depth + 1);
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
### Solution 3 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// Average case: when the tree is balanced
	// O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
	public static int AllKindsOfNodeDepths(BinaryTree root) {
		Dictionary<BinaryTree, int> nodeCounts = new Dictionary<BinaryTree, int>();
		Dictionary<BinaryTree, int> nodeDepths = new Dictionary<BinaryTree, int>();
		addNodeCounts(root, nodeCounts);
		addNodeDepths(root, nodeDepths, nodeCounts);
		return sumAllNodeDepths(root, nodeDepths);
	}

	public static int sumAllNodeDepths(BinaryTree node,
	  Dictionary<BinaryTree, int> nodeDepths) {
		if (node == null) return 0;
		return sumAllNodeDepths(node.left, nodeDepths) + sumAllNodeDepths(node.right,
		         nodeDepths) +
		       nodeDepths[node];
	}

	public static void addNodeDepths(BinaryTree node, Dictionary<BinaryTree, int> nodeDepths,
	  Dictionary<BinaryTree, int> nodeCounts) {
		nodeDepths[node] = 0;
		if (node.left != null) {
			addNodeDepths(node.left, nodeDepths, nodeCounts);
			nodeDepths[node] = nodeDepths[node] + nodeDepths[node.left] +
			  nodeCounts[node.left];
		}
		if (node.right != null) {
			addNodeDepths(node.right, nodeDepths, nodeCounts);
			nodeDepths[node] = nodeDepths[node] + nodeDepths[node.right] +
			  nodeCounts[node.right];
		}
	}

	public static void addNodeCounts(BinaryTree node, Dictionary<BinaryTree, int> nodeCounts) {
		nodeCounts[node] = 1;
		if (node.left != null) {
			addNodeCounts(node.left, nodeCounts);
			nodeCounts[node] = nodeCounts[node] + nodeCounts[node.left];
		}
		if (node.right != null) {
			addNodeCounts(node.right, nodeCounts);
			nodeCounts[node] = nodeCounts[node] + nodeCounts[node.right];
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
### Solution 4 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.


public class Program {
	// Average case: when the tree is balanced
	// O(n) time | O(h) space - where n is the number of nodes in
	// the Binary Tree and h is the height of the Binary Tree
	public static int AllKindsOfNodeDepths(BinaryTree root) {
		return getTreeInfo(root).sumOfAllDepths;
	}

	public static TreeInfo getTreeInfo(BinaryTree tree) {
		if (tree == null) {
			return new TreeInfo(0, 0, 0);
		}

		TreeInfo leftTreeInfo = getTreeInfo(tree.left);
		TreeInfo rightTreeInfo = getTreeInfo(tree.right);

		int sumOfLeftDepths = leftTreeInfo.sumOfDepths + leftTreeInfo.numNodesInTree;
		int sumOfRightDepths =
		  rightTreeInfo.sumOfDepths + rightTreeInfo.numNodesInTree;

		int numNodesInTree =
		  1 + leftTreeInfo.numNodesInTree + rightTreeInfo.numNodesInTree;
		int sumOfDepths = sumOfLeftDepths + sumOfRightDepths;
		int sumOfAllDepths =
		  sumOfDepths + leftTreeInfo.sumOfAllDepths + rightTreeInfo.sumOfAllDepths;

		return new TreeInfo(numNodesInTree, sumOfDepths, sumOfAllDepths);
	}

	public class TreeInfo {
		public int numNodesInTree;
		public int sumOfDepths;
		public int sumOfAllDepths;

		public TreeInfo(int numNodesInTree, int sumOfDepths, int sumOfAllDepths) {
			this.numNodesInTree = numNodesInTree;
			this.sumOfDepths = sumOfDepths;
			this.sumOfAllDepths = sumOfAllDepths;
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
### Solution 5 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.


public class Program {
	// Average case: when the tree is balanced
	// O(n) time | O(h) space - where n is the number of nodes in
	// the Binary Tree and h is the height of the Binary Tree
	public static int AllKindsOfNodeDepths(BinaryTree root) {
		return allKindsOfNodeDepthsHelper(root, 0, 0);
	}

	public static int allKindsOfNodeDepthsHelper(BinaryTree root, int depthSum, int depth) {
		if (root == null) return 0;

		depthSum += depth;
		return depthSum +
		       allKindsOfNodeDepthsHelper(root.left, depthSum,
		         depth+1) + allKindsOfNodeDepthsHelper(root.right, depthSum, depth+1);
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
### Solution 6 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.


public class Program {
	// Average case: when the tree is balanced
	// O(n) time | O(h) space - where n is the number of nodes in
	// the Binary Tree and h is the height of the Binary Tree
	public static int AllKindsOfNodeDepths(BinaryTree root) {
		return allKindsOfNodeDepthsHelper(root, 0);
	}

	public static int allKindsOfNodeDepthsHelper(BinaryTree root, int depth) {
		if (root == null) return 0;

		// Formula to calculate 1 + 2 + 3 + ... + depth - 1 + depth
		var depthSum = (depth * (depth + 1)) / 2;
		return depthSum +
		       allKindsOfNodeDepthsHelper(root.left, depth+1) + allKindsOfNodeDepthsHelper(
			root.right, depth+1);
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
		int actual = Program.AllKindsOfNodeDepths(root);
		Utils.AssertEquals(26, actual);
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
	actual := AllKindsOfNodeDepths(root)
	require.Equal(t, 26, actual)
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

// Average case: when the tree is balanced
// O(nlog(n)) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
func AllKindsOfNodeDepths(root *BinaryTree) int {
	sumOfDepths := 0
	stack := []*BinaryTree{root}
	var node *BinaryTree
	for len(stack) > 0 {
		node, stack = stack[len(stack)-1], stack[:len(stack)-1]
		if node == nil {
			continue
		}
		sumOfDepths += nodeDepths(node, 0)
		stack = append(stack, node.Left)
		stack = append(stack, node.Right)
	}
	return sumOfDepths
}

func nodeDepths(node *BinaryTree, depth int) int {
	if node == nil {
		return 0
	}
	return depth + nodeDepths(node.Left, depth+1) + nodeDepths(node.Right, depth+1)
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
// O(nlog(n)) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
func AllKindsOfNodeDepths(root *BinaryTree) int {
	if root == nil {
		return 0
	}
	return AllKindsOfNodeDepths(root.Left) + AllKindsOfNodeDepths(root.Right) + nodeDepths(root, 0)
}

func nodeDepths(node *BinaryTree, depth int) int {
	if node == nil {
		return 0
	}
	return depth + nodeDepths(node.Left, depth+1) + nodeDepths(node.Right, depth+1)
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type BinaryTree struct {
	Value       int
	Left, Right *BinaryTree
}

// Average case: when the tree is balanced
// O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
func AllKindsOfNodeDepths(root *BinaryTree) int {
	nodeCounts, nodeDepths := map[*BinaryTree]int{}, map[*BinaryTree]int{}
	addNodeCounts(root, nodeCounts)
	addNodeDepths(root, nodeDepths, nodeCounts)
	return sumAllNodeDepths(root, nodeDepths)
}

func sumAllNodeDepths(node *BinaryTree, nodeDepths map[*BinaryTree]int) int {
	if node == nil {
		return 0
	}
	return sumAllNodeDepths(node.Left, nodeDepths) + sumAllNodeDepths(node.Right, nodeDepths) + nodeDepths[node]
}

func addNodeDepths(node *BinaryTree, nodeDepths, nodeCounts map[*BinaryTree]int) {
	nodeDepths[node] = 0
	if node.Left != nil {
		addNodeDepths(node.Left, nodeDepths, nodeCounts)
		nodeDepths[node] = nodeDepths[node] + nodeDepths[node.Left] + nodeCounts[node.Left]
	}
	if node.Right != nil {
		addNodeDepths(node.Right, nodeDepths, nodeCounts)
		nodeDepths[node] = nodeDepths[node] + nodeDepths[node.Right] + nodeCounts[node.Right]
	}
}

func addNodeCounts(node *BinaryTree, nodeCounts map[*BinaryTree]int) {
	nodeCounts[node] = 1
	if node.Left != nil {
		addNodeCounts(node.Left, nodeCounts)
		nodeCounts[node] = nodeCounts[node] + nodeCounts[node.Left]
	}
	if node.Right != nil {
		addNodeCounts(node.Right, nodeCounts)
		nodeCounts[node] = nodeCounts[node] + nodeCounts[node.Right]
	}
}

```
### Solution 4 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type BinaryTree struct {
	Value       int
	Left, Right *BinaryTree
}

type TreeInfo struct {
	NumNodesInTree int
	SumOfDepths    int
	SumOfAllDepths int
}

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
func AllKindsOfNodeDepths(root *BinaryTree) int {
	return getTreeInfo(root).SumOfAllDepths
}

func getTreeInfo(tree *BinaryTree) TreeInfo {
	if tree == nil {
		return TreeInfo{}
	}

	leftInfo, rightInfo := getTreeInfo(tree.Left), getTreeInfo(tree.Right)

	sumOfLeftDepths := leftInfo.SumOfDepths + leftInfo.NumNodesInTree
	sumOfRightDepths := rightInfo.SumOfDepths + rightInfo.NumNodesInTree

	numNodesInTree := 1 + leftInfo.NumNodesInTree + rightInfo.NumNodesInTree
	sumOfDepths := sumOfLeftDepths + sumOfRightDepths
	sumOfAllDepths := sumOfDepths + leftInfo.SumOfAllDepths + rightInfo.SumOfAllDepths

	return TreeInfo{NumNodesInTree: numNodesInTree, SumOfDepths: sumOfDepths, SumOfAllDepths: sumOfAllDepths}
}

```
### Solution 5 (go)
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
func AllKindsOfNodeDepths(root *BinaryTree) int {
	return allKindsOfNodeDepthsHelper(root, 0, 0)
}

func allKindsOfNodeDepthsHelper(root *BinaryTree, depthSum, depth int) int {
	if root == nil {
		return 0
	}

	depthSum += depth
	return depthSum + allKindsOfNodeDepthsHelper(root.Left, depthSum, depth+1) + allKindsOfNodeDepthsHelper(root.Right, depthSum, depth+1)
}

```
### Solution 6 (go)
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
func AllKindsOfNodeDepths(root *BinaryTree) int {
	return allKindsOfNodeDepthsHelper(root, 0)
}

func allKindsOfNodeDepthsHelper(root *BinaryTree, depth int) int {
	if root == nil {
		return 0
	}

	// Formula to calculate 1 + 2 + 3 + ... + depth - 1 + depth
	depthSum := (depth * (depth + 1)) / 2
	return depthSum + allKindsOfNodeDepthsHelper(root.Left, depth+1) + allKindsOfNodeDepthsHelper(root.Right, depth+1)
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
	actual := AllKindsOfNodeDepths(root)
	require.Equal(t, 26, actual)
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
    int actual = Program.allKindsOfNodeDepths(root);
    Utils.assertEquals(26, actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // Average case: when the tree is balanced
  // O(nlog(n)) time | O(h) space - where n is the number of nodes in
  // the Binary Tree and h is the height of the Binary Tree
  public static int allKindsOfNodeDepths(BinaryTree root) {
    int sumOfAllDepths = 0;
    List<BinaryTree> stack = new ArrayList<BinaryTree>();
    stack.add(root);
    while (stack.size() > 0) {
      BinaryTree node = stack.remove(stack.size() - 1);
      if (node == null) continue;
      sumOfAllDepths += nodeDepths(node, 0);
      stack.add(node.left);
      stack.add(node.right);
    }
    return sumOfAllDepths;
  }

  public static int nodeDepths(BinaryTree node, int depth) {
    if (node == null) return 0;
    return depth + nodeDepths(node.left, depth + 1) + nodeDepths(node.right, depth + 1);
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
  // O(nlog(n)) time | O(h) space - where n is the number of nodes in
  // the Binary Tree and h is the height of the Binary Tree
  public static int allKindsOfNodeDepths(BinaryTree root) {
    if (root == null) return 0;
    return allKindsOfNodeDepths(root.left) + allKindsOfNodeDepths(root.right) + nodeDepths(root, 0);
  }

  public static int nodeDepths(BinaryTree node, int depth) {
    if (node == null) return 0;
    return depth + nodeDepths(node.left, depth + 1) + nodeDepths(node.right, depth + 1);
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
### Solution 3 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // Average case: when the tree is balanced
  // O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
  public static int allKindsOfNodeDepths(BinaryTree root) {
    Map<BinaryTree, Integer> nodeCounts = new HashMap<BinaryTree, Integer>();
    Map<BinaryTree, Integer> nodeDepths = new HashMap<BinaryTree, Integer>();
    addNodeCounts(root, nodeCounts);
    addNodeDepths(root, nodeDepths, nodeCounts);
    return sumAllNodeDepths(root, nodeDepths);
  }

  public static int sumAllNodeDepths(BinaryTree node, Map<BinaryTree, Integer> nodeDepths) {
    if (node == null) return 0;
    return sumAllNodeDepths(node.left, nodeDepths)
        + sumAllNodeDepths(node.right, nodeDepths)
        + nodeDepths.get(node);
  }

  public static void addNodeDepths(
      BinaryTree node, Map<BinaryTree, Integer> nodeDepths, Map<BinaryTree, Integer> nodeCounts) {
    nodeDepths.put(node, 0);
    if (node.left != null) {
      addNodeDepths(node.left, nodeDepths, nodeCounts);
      nodeDepths.put(
          node, nodeDepths.get(node) + nodeDepths.get(node.left) + nodeCounts.get(node.left));
    }
    if (node.right != null) {
      addNodeDepths(node.right, nodeDepths, nodeCounts);
      nodeDepths.put(
          node, nodeDepths.get(node) + nodeDepths.get(node.right) + nodeCounts.get(node.right));
    }
  }

  public static void addNodeCounts(BinaryTree node, Map<BinaryTree, Integer> nodeCounts) {
    nodeCounts.put(node, 1);
    if (node.left != null) {
      addNodeCounts(node.left, nodeCounts);
      nodeCounts.put(node, nodeCounts.get(node) + nodeCounts.get(node.left));
    }
    if (node.right != null) {
      addNodeCounts(node.right, nodeCounts);
      nodeCounts.put(node, nodeCounts.get(node) + nodeCounts.get(node.right));
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
### Solution 4 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // Average case: when the tree is balanced
  // O(n) time | O(h) space - where n is the number of nodes in
  // the Binary Tree and h is the height of the Binary Tree
  public static int allKindsOfNodeDepths(BinaryTree root) {
    return getTreeInfo(root).sumOfAllDepths;
  }

  public static TreeInfo getTreeInfo(BinaryTree tree) {
    if (tree == null) {
      return new TreeInfo(0, 0, 0);
    }

    TreeInfo leftTreeInfo = getTreeInfo(tree.left);
    TreeInfo rightTreeInfo = getTreeInfo(tree.right);

    int sumOfLeftDepths = leftTreeInfo.sumOfDepths + leftTreeInfo.numNodesInTree;
    int sumOfRightDepths = rightTreeInfo.sumOfDepths + rightTreeInfo.numNodesInTree;

    int numNodesInTree = 1 + leftTreeInfo.numNodesInTree + rightTreeInfo.numNodesInTree;
    int sumOfDepths = sumOfLeftDepths + sumOfRightDepths;
    int sumOfAllDepths = sumOfDepths + leftTreeInfo.sumOfAllDepths + rightTreeInfo.sumOfAllDepths;

    return new TreeInfo(numNodesInTree, sumOfDepths, sumOfAllDepths);
  }

  static class TreeInfo {
    public int numNodesInTree;
    public int sumOfDepths;
    public int sumOfAllDepths;

    public TreeInfo(int numNodesInTree, int sumOfDepths, int sumOfAllDepths) {
      this.numNodesInTree = numNodesInTree;
      this.sumOfDepths = sumOfDepths;
      this.sumOfAllDepths = sumOfAllDepths;
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
### Solution 5 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // Average case: when the tree is balanced
  // O(n) time | O(h) space - where n is the number of nodes in
  // the Binary Tree and h is the height of the Binary Tree
  public static int allKindsOfNodeDepths(BinaryTree root) {
    return allKindsOfNodeDepthsHelper(root, 0, 0);
  }

  public static int allKindsOfNodeDepthsHelper(BinaryTree node, int depthSum, int depth) {
    if (node == null) return 0;

    depthSum += depth;
    return depthSum
        + allKindsOfNodeDepthsHelper(node.left, depthSum, depth + 1)
        + allKindsOfNodeDepthsHelper(node.right, depthSum, depth + 1);
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
### Solution 6 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // Average case: when the tree is balanced
  // O(n) time | O(h) space - where n is the number of nodes in
  // the Binary Tree and h is the height of the Binary Tree
  public static int allKindsOfNodeDepths(BinaryTree root) {
    return allKindsOfNodeDepthsHelper(root, 0);
  }

  public static int allKindsOfNodeDepthsHelper(BinaryTree node, int depth) {
    if (node == null) return 0;

    // Formula to calculate 1 + 2 + 3 + ... + depth - 1 + depth
    var depthSum = (depth * (depth + 1)) / 2;
    return depthSum
        + allKindsOfNodeDepthsHelper(node.left, depth + 1)
        + allKindsOfNodeDepthsHelper(node.right, depth + 1);
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
    int actual = Program.allKindsOfNodeDepths(root);
    Utils.assertEquals(26, actual);
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
  const actual = program.allKindsOfNodeDepths(root);
  chai.expect(actual).to.deep.equal(26);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average case: when the tree is balanced
// O(nlog(n)) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
function allKindsOfNodeDepths(root) {
  let sumOfAllDepths = 0;
  let stack = [root];
  while (stack.length > 0) {
    const node = stack.pop();
    if (node === null) continue;
    sumOfAllDepths += nodeDepths(node);
    stack.push(node.left);
    stack.push(node.right);
  }
  return sumOfAllDepths;
}

function nodeDepths(node, depth = 0) {
  if (node === null) return 0;
  return depth + nodeDepths(node.left, depth + 1) + nodeDepths(node.right, depth + 1);
}

// This is the class of the input binary tree.
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

exports.allKindsOfNodeDepths = allKindsOfNodeDepths;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average case: when the tree is balanced
// O(nlog(n)) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
function allKindsOfNodeDepths(root) {
  if (root == null) return 0;
  return allKindsOfNodeDepths(root.left) + allKindsOfNodeDepths(root.right) + nodeDepths(root);
}

function nodeDepths(node, depth = 0) {
  if (node === null) return 0;
  return depth + nodeDepths(node.left, depth + 1) + nodeDepths(node.right, depth + 1);
}

// This is the class of the input binary tree.
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

exports.allKindsOfNodeDepths = allKindsOfNodeDepths;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average case: when the tree is balanced
// O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
function allKindsOfNodeDepths(root) {
  addNodeCounts(root);
  addNodeDepths(root);
  return sumAllNodeDepths(root);
}

function sumAllNodeDepths(node) {
  if (node == null) return 0;
  return sumAllNodeDepths(node.left) + sumAllNodeDepths(node.right) + node._sumOfDepths;
}

function addNodeDepths(node) {
  node._sumOfDepths = 0;
  if (node.left !== null) {
    addNodeDepths(node.left);
    node._sumOfDepths += node.left._sumOfDepths + node.left._numNodesInTree;
  }
  if (node.right !== null) {
    addNodeDepths(node.right);
    node._sumOfDepths += node.right._sumOfDepths + node.right._numNodesInTree;
  }
}

function addNodeCounts(node) {
  node._numNodesInTree = 1;
  if (node.left !== null) {
    addNodeCounts(node.left);
    node._numNodesInTree += node.left._numNodesInTree;
  }
  if (node.right !== null) {
    addNodeCounts(node.right);
    node._numNodesInTree += node.right._numNodesInTree;
  }
}

// This is the class of the input binary tree.
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

exports.allKindsOfNodeDepths = allKindsOfNodeDepths;

```
### Solution 4 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
function allKindsOfNodeDepths(root) {
  return getTreeInfo(root).sumOfAllDepths;
}

function getTreeInfo(tree) {
  if (tree === null) {
    return {
      numNodesInTree: 0,
      sumOfDepths: 0,
      sumOfAllDepths: 0,
    };
  }

  const leftTreeInfo = getTreeInfo(tree.left);
  const rightTreeInfo = getTreeInfo(tree.right);

  const sumOfLeftDepths = leftTreeInfo.sumOfDepths + leftTreeInfo.numNodesInTree;
  const sumOfRightDepths = rightTreeInfo.sumOfDepths + rightTreeInfo.numNodesInTree;

  const numNodesInTree = 1 + leftTreeInfo.numNodesInTree + rightTreeInfo.numNodesInTree;
  const sumOfDepths = sumOfLeftDepths + sumOfRightDepths;
  const sumOfAllDepths = sumOfDepths + leftTreeInfo.sumOfAllDepths + rightTreeInfo.sumOfAllDepths;

  return {
    numNodesInTree,
    sumOfDepths,
    sumOfAllDepths,
  };
}

// This is the class of the input binary tree.
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

exports.allKindsOfNodeDepths = allKindsOfNodeDepths;

```
### Solution 5 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
function allKindsOfNodeDepths(root, depthSum = 0, depth = 0) {
  if (!root) return 0;

  depthSum += depth;
  return (
    depthSum +
    allKindsOfNodeDepths(root.left, depthSum, depth + 1) +
    allKindsOfNodeDepths(root.right, depthSum, depth + 1)
  );
}

// This is the class of the input binary tree.
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

exports.allKindsOfNodeDepths = allKindsOfNodeDepths;

```
### Solution 6 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
function allKindsOfNodeDepths(root, depth = 0) {
  if (!root) return 0;

  // Formula to calculate 1 + 2 + 3 + ... + depth - 1 + depth
  const depthSum = (depth * (depth + 1)) / 2;
  return depthSum + allKindsOfNodeDepths(root.left, depth + 1) + allKindsOfNodeDepths(root.right, depth + 1);
}

// This is the class of the input binary tree.
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

exports.allKindsOfNodeDepths = allKindsOfNodeDepths;

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
  const actual = program.allKindsOfNodeDepths(root);
  chai.expect(actual).to.deep.equal(26);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.BinaryTree as BinaryTree
import com.algoexpert.program.allKindsOfNodeDepths as allKindsOfNodeDepths

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

        val result = allKindsOfNodeDepths(tree)

        assert(result == 26)
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

// Average case: when the tree is balanced
// O(nlog(n)) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
fun allKindsOfNodeDepths(root: BinaryTree): Int {
    var sumOfAllDepths = 0
    val stack = Stack<BinaryTree?>()
    stack.add(root)
    while (stack.size > 0) {
        val node = stack.pop()
        if (node == null) continue
        sumOfAllDepths += nodeDepths(node)
        stack.add(node.left)
        stack.add(node.right)
    }
    return sumOfAllDepths
}

fun nodeDepths(root: BinaryTree?, depth: Int = 0): Int {
    if (root == null) return 0
    return depth + nodeDepths(root.left, depth + 1) + nodeDepths(root.right, depth + 1)
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
// O(nlog(n)) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
fun allKindsOfNodeDepths(root: BinaryTree?): Int {
    if (root == null) return 0
    return allKindsOfNodeDepths(root.left) + allKindsOfNodeDepths(root.right) + nodeDepths(root)
}

fun nodeDepths(root: BinaryTree?, depth: Int = 0): Int {
    if (root == null) return 0
    return depth + nodeDepths(root.left, depth + 1) + nodeDepths(root.right, depth + 1)
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

open class BinaryTree(value: Int) {
    var value = value
    var left: BinaryTree? = null
    var right: BinaryTree? = null
}

// Average case: when the tree is balanced
// O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
fun allKindsOfNodeDepths(root: BinaryTree): Int {
    val nodeCounts = mutableMapOf<BinaryTree, Int>()
    val nodeDepths = mutableMapOf<BinaryTree, Int>()
    addNodeCounts(root, nodeCounts)
    addNodeDepths(root, nodeDepths, nodeCounts)
    return sumAllNodeDepths(root, nodeDepths)
}

fun sumAllNodeDepths(node: BinaryTree?, nodeDepths: MutableMap<BinaryTree, Int>): Int {
    if (node == null) return 0
    return sumAllNodeDepths(node.left, nodeDepths) + sumAllNodeDepths(node.right, nodeDepths) + nodeDepths[node]!!
}

fun addNodeDepths(node: BinaryTree, nodeDepths: MutableMap<BinaryTree, Int>, nodeCounts: MutableMap<BinaryTree, Int>) {
    nodeDepths[node] = 0
    if (node.left != null) {
        addNodeDepths(node.left!!, nodeDepths, nodeCounts)
        nodeDepths[node] = nodeDepths[node]!! + nodeDepths[node.left!!]!! + nodeCounts[node.left!!]!!
    }
    if (node.right != null) {
        addNodeDepths(node.right!!, nodeDepths, nodeCounts)
        nodeDepths[node] = nodeDepths[node]!! + nodeDepths[node.right!!]!! + nodeCounts[node.right!!]!!
    }
}

fun addNodeCounts(node: BinaryTree, nodeCounts: MutableMap<BinaryTree, Int>) {
    nodeCounts[node] = 1
    if (node.left != null) {
        addNodeCounts(node.left!!, nodeCounts)
        nodeCounts[node] = nodeCounts[node]!! + nodeCounts[node.left!!]!!
    }
    if (node.right != null) {
        addNodeCounts(node.right!!, nodeCounts)
        nodeCounts[node] = nodeCounts[node]!! + nodeCounts[node.right!!]!!
    }
}

```
### Solution 4 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

open class BinaryTree(value: Int) {
    var value = value
    var left: BinaryTree? = null
    var right: BinaryTree? = null
}

open class TreeInfo(numNodesInTree: Int, sumOfDepths: Int, sumOfAllDepths: Int) {
    val numNodesInTree = numNodesInTree
    val sumOfDepths = sumOfDepths
    val sumOfAllDepths = sumOfAllDepths
}

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
fun allKindsOfNodeDepths(root: BinaryTree): Int {
    return getTreeInfo(root).sumOfAllDepths
}

fun getTreeInfo(tree: BinaryTree?): TreeInfo {
    if (tree == null) return TreeInfo(0, 0, 0)

    val leftTreeInfo = getTreeInfo(tree.left)
    val rightTreeInfo = getTreeInfo(tree.right)

    val sumOfLeftDepths = leftTreeInfo.sumOfDepths + leftTreeInfo.numNodesInTree
    val sumOfRightDepths = rightTreeInfo.sumOfDepths + rightTreeInfo.numNodesInTree

    val numNodesInTree = 1 + leftTreeInfo.numNodesInTree + rightTreeInfo.numNodesInTree
    val sumOfDepths = sumOfLeftDepths + sumOfRightDepths
    val sumOfAllDepths = sumOfDepths + leftTreeInfo.sumOfAllDepths + rightTreeInfo.sumOfAllDepths

    return TreeInfo(numNodesInTree, sumOfDepths, sumOfAllDepths)
}

```
### Solution 5 (kotlin)
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
fun allKindsOfNodeDepths(root: BinaryTree?, depthSum: Int = 0, depth: Int = 0): Int {
    if (root == null) return 0

    val currentDepthSum = depthSum + depth
    return currentDepthSum + allKindsOfNodeDepths(root.left, currentDepthSum, depth + 1) + allKindsOfNodeDepths(root.right, currentDepthSum, depth + 1)
}

```
### Solution 6 (kotlin)
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
fun allKindsOfNodeDepths(root: BinaryTree?, depth: Int = 0): Int {
    if (root == null) return 0

    // Formula to calculate 1 + 2 + 3 + ... + depth - 1 + depth
    val depthSum = (depth * (depth + 1)) / 2
    return depthSum + allKindsOfNodeDepths(root.left, depth + 1) + allKindsOfNodeDepths(root.right, depth + 1)
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.BinaryTree as BinaryTree
import com.algoexpert.program.allKindsOfNodeDepths as allKindsOfNodeDepths

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

        val result = allKindsOfNodeDepths(tree)

        assert(result == 26)
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
      let actual = Program.allKindsOfNodeDepths(root)
      try assert(actual == 26)
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

  // Average case: when the tree is balanced
  // O(nlog(n)) time | O(h) space - where n is the number of nodes in
  // the Binary Tree and h is the height of the Binary Tree
  static func allKindsOfNodeDepths(_ root: BinaryTree?) -> Int {
    var sumOfDepths = 0
    var stack = [root]
    while stack.count > 0 {
      var node = stack[stack.count - 1]
      stack.removeLast()
      if node == nil {
        continue
      }

      sumOfDepths += nodeDepths(node, 0)
      stack.append(node?.left)
      stack.append(node?.right)
    }
    return sumOfDepths
  }

  static func nodeDepths(_ root: BinaryTree?, _ depth: Int = 0) -> Int {
    if let tree = root {
      return depth + nodeDepths(tree.left, depth + 1) + nodeDepths(tree.right, depth + 1)
    }
    return 0
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
  // O(nlog(n)) time | O(h) space - where n is the number of nodes in
  // the Binary Tree and h is the height of the Binary Tree
  static func allKindsOfNodeDepths(_ root: BinaryTree?) -> Int {
    if let node = root {
      return allKindsOfNodeDepths(node.left) + allKindsOfNodeDepths(node.right) + nodeDepths(root, 0)
    }
    return 0
  }

  static func nodeDepths(_ root: BinaryTree?, _ depth: Int = 0) -> Int {
    if let tree = root {
      return depth + nodeDepths(tree.left, depth + 1) + nodeDepths(tree.right, depth + 1)
    }
    return 0
  }
}

```
### Solution 3 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  class BinaryTree: Hashable {
    var value: Int
    var left: BinaryTree?
    var right: BinaryTree?

    init(value: Int) {
      self.value = value
    }

    static func == (lhs: BinaryTree, rhs: BinaryTree) -> Bool {
      return ObjectIdentifier(lhs) == ObjectIdentifier(rhs)
    }

    var hashValue: Int {
      return ObjectIdentifier(self).hashValue
    }
  }

  // Average case: when the tree is balanced
  // O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
  static func allKindsOfNodeDepths(_ root: BinaryTree?) -> Int {
    var nodeCounts = [BinaryTree: Int]()
    var nodeDepths = [BinaryTree: Int]()
    addNodeCounts(root, &nodeCounts)
    addNodeDepths(root, &nodeDepths, &nodeCounts)
    return sumAllNodeDepths(root, nodeDepths)
  }

  static func sumAllNodeDepths(_ node: BinaryTree?, _ nodeDepths: [BinaryTree: Int]) -> Int {
    if let n = node {
      return sumAllNodeDepths(n.left, nodeDepths) + sumAllNodeDepths(n.right, nodeDepths) + nodeDepths[n]!
    }
    return 0
  }

  static func addNodeDepths(_ tree: BinaryTree?, _ nodeDepths: inout [BinaryTree: Int], _ nodeCounts: inout [BinaryTree: Int]) {
    if let node = tree {
      nodeDepths[node] = 0

      if let left = node.left {
        addNodeDepths(left, &nodeDepths, &nodeCounts)
        nodeDepths[node] = nodeDepths[node]! + nodeDepths[left]! + nodeCounts[left]!
      }

      if let right = node.right {
        addNodeDepths(right, &nodeDepths, &nodeCounts)
        nodeDepths[node] = nodeDepths[node]! + nodeDepths[right]! + nodeCounts[right]!
      }
    }
  }

  static func addNodeCounts(_ tree: BinaryTree?, _ nodeCounts: inout [BinaryTree: Int]) {
    if let node = tree {
      nodeCounts[node] = 1

      if let left = node.left {
        addNodeCounts(left, &nodeCounts)
        nodeCounts[node] = nodeCounts[node]! + nodeCounts[left]!
      }

      if let right = node.right {
        addNodeCounts(right, &nodeCounts)
        nodeCounts[node] = nodeCounts[node]! + nodeCounts[right]!
      }
    }
  }
}

```
### Solution 4 (swift)
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

  struct TreeInfo {
    var numNodesInTree: Int = 0
    var sumOfDepths: Int = 0
    var sumOfAllDepths: Int = 0
  }

  // Average case: when the tree is balanced
  // O(n) time | O(h) space - where n is the number of nodes in
  // the Binary Tree and h is the height of the Binary Tree
  static func allKindsOfNodeDepths(_ root: BinaryTree?) -> Int {
    return getTreeInfo(root).sumOfAllDepths
  }

  static func getTreeInfo(_ tree: BinaryTree?) -> TreeInfo {
    if let node = tree {
      var leftInfo = getTreeInfo(node.left)
      var rightInfo = getTreeInfo(node.right)

      var sumOfLeftDepths = leftInfo.sumOfDepths + leftInfo.numNodesInTree
      var sumOfRightDepths = rightInfo.sumOfDepths + rightInfo.numNodesInTree

      var numNodesInTree = 1 + leftInfo.numNodesInTree + rightInfo.numNodesInTree
      var sumOfDepths = sumOfLeftDepths + sumOfRightDepths
      var sumOfAllDepths = sumOfDepths + leftInfo.sumOfAllDepths + rightInfo.sumOfAllDepths

      return TreeInfo(numNodesInTree: numNodesInTree, sumOfDepths: sumOfDepths, sumOfAllDepths: sumOfAllDepths)
    }
    return TreeInfo()
  }
}

```
### Solution 5 (swift)
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
  static func allKindsOfNodeDepths(_ root: BinaryTree?) -> Int {
    return allKindsOfNodeDepthsHelper(root, 0, 0)
  }

  static func allKindsOfNodeDepthsHelper(_ root: BinaryTree?, _ depthSum: Int, _ depth: Int) -> Int {
    if let node = root {
      let currentDepthSum = depthSum + depth
      return currentDepthSum + allKindsOfNodeDepthsHelper(node.left, currentDepthSum, depth + 1) + allKindsOfNodeDepthsHelper(node.right, currentDepthSum, depth + 1)
    }
    return 0
  }
}

```
### Solution 6 (swift)
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
  static func allKindsOfNodeDepths(_ root: BinaryTree?) -> Int {
    return allKindsOfNodeDepthsHelper(root, 0)
  }

  static func allKindsOfNodeDepthsHelper(_ root: BinaryTree?, _ depth: Int) -> Int {
    if let node = root {
      // Formula to calculate 1 + 2 + 3 + ... + depth - 1 + depth
      let depthSum = (depth * (depth + 1)) / 2
      return depthSum + allKindsOfNodeDepthsHelper(node.left, depth + 1) + allKindsOfNodeDepthsHelper(node.right, depth + 1)
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
      let actual = Program.allKindsOfNodeDepths(root)
      try assert(actual == 26)
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
        actual = program.allKindsOfNodeDepths(root)
        self.assertEqual(actual, 26)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Average case: when the tree is balanced
# O(nlog(n)) time | O(h) space - where n is the number of nodes in
# the Binary Tree and h is the height of the Binary Tree
def allKindsOfNodeDepths(root):
    sumOfAllDepths = 0
    stack = [root]
    while len(stack) > 0:
        node = stack.pop()
        if node is None:
            continue
        sumOfAllDepths += nodeDepths(node)
        stack.append(node.left)
        stack.append(node.right)
    return sumOfAllDepths


def nodeDepths(node, depth=0):
    if node is None:
        return 0
    return depth + nodeDepths(node.left, depth + 1) + nodeDepths(node.right, depth + 1)


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
# O(nlog(n)) time | O(h) space - where n is the number of nodes in
# the Binary Tree and h is the height of the Binary Tree
def allKindsOfNodeDepths(root):
    if root is None:
        return 0
    return allKindsOfNodeDepths(root.left) + allKindsOfNodeDepths(root.right) + nodeDepths(root)


def nodeDepths(node, depth=0):
    if node is None:
        return 0
    return depth + nodeDepths(node.left, depth + 1) + nodeDepths(node.right, depth + 1)


# This is the class of the input binary tree.
class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Average case: when the tree is balanced
# O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
def allKindsOfNodeDepths(root):
    nodeCounts = {}
    addNodeCounts(root, nodeCounts)
    nodeDepths = {}
    addNodeDepths(root, nodeDepths, nodeCounts)
    return sumAllNodeDepths(root, nodeDepths)


def sumAllNodeDepths(node, nodeDepths):
    if node is None:
        return 0
    return sumAllNodeDepths(node.left, nodeDepths) + sumAllNodeDepths(node.right, nodeDepths) + nodeDepths[node]


def addNodeDepths(node, nodeDepths, nodeCounts):
    nodeDepths[node] = 0
    if node.left is not None:
        addNodeDepths(node.left, nodeDepths, nodeCounts)
        nodeDepths[node] += nodeDepths[node.left] + nodeCounts[node.left]
    if node.right is not None:
        addNodeDepths(node.right, nodeDepths, nodeCounts)
        nodeDepths[node] += nodeDepths[node.right] + nodeCounts[node.right]


def addNodeCounts(node, nodeCounts):
    nodeCounts[node] = 1
    if node.left is not None:
        addNodeCounts(node.left, nodeCounts)
        nodeCounts[node] += nodeCounts[node.left]
    if node.right is not None:
        addNodeCounts(node.right, nodeCounts)
        nodeCounts[node] += nodeCounts[node.right]


# This is the class of the input binary tree.
class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

```
### Solution 4 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Average case: when the tree is balanced
# O(n) time | O(h) space - where n is the number of nodes in
# the Binary Tree and h is the height of the Binary Tree
def allKindsOfNodeDepths(root):
    return getTreeInfo(root).sumOfAllDepths


def getTreeInfo(tree):
    if tree is None:
        return TreeInfo(0, 0, 0)

    leftTreeInfo = getTreeInfo(tree.left)
    rightTreeInfo = getTreeInfo(tree.right)

    sumOfLeftDepths = leftTreeInfo.sumOfDepths + leftTreeInfo.numNodesInTree
    sumOfRightDepths = rightTreeInfo.sumOfDepths + rightTreeInfo.numNodesInTree

    numNodesInTree = 1 + leftTreeInfo.numNodesInTree + rightTreeInfo.numNodesInTree
    sumOfDepths = sumOfLeftDepths + sumOfRightDepths
    sumOfAllDepths = sumOfDepths + leftTreeInfo.sumOfAllDepths + rightTreeInfo.sumOfAllDepths

    return TreeInfo(numNodesInTree, sumOfDepths, sumOfAllDepths)


class TreeInfo:
    def __init__(self, numNodesInTree, sumOfDepths, sumOfAllDepths):
        self.numNodesInTree = numNodesInTree
        self.sumOfDepths = sumOfDepths
        self.sumOfAllDepths = sumOfAllDepths


# This is the class of the input binary tree.
class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

```
### Solution 5 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Average case: when the tree is balanced
# O(n) time | O(h) space - where n is the number of nodes in
# the Binary Tree and h is the height of the Binary Tree
def allKindsOfNodeDepths(root, depthSum=0, depth=0):
    if root is None:
        return 0

    depthSum += depth
    return (
        depthSum
        + allKindsOfNodeDepths(root.left, depthSum, depth + 1)
        + allKindsOfNodeDepths(root.right, depthSum, depth + 1)
    )


# This is the class of the input binary tree.
class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

```
### Solution 6 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Average case: when the tree is balanced
# O(n) time | O(h) space - where n is the number of nodes in
# the Binary Tree and h is the height of the Binary Tree
def allKindsOfNodeDepths(root, depth=0):
    if root is None:
        return 0

    # Formula to calculate 1 + 2 + 3 + ... + depth - 1 + depth
    depthSum = (depth * (depth + 1)) / 2
    return depthSum + allKindsOfNodeDepths(root.left, depth + 1) + allKindsOfNodeDepths(root.right, depth + 1)


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
        actual = program.allKindsOfNodeDepths(root)
        self.assertEqual(actual, 26)

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
  const actual = program.allKindsOfNodeDepths(root);
  chai.expect(actual).to.deep.equal(26);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average case: when the tree is balanced
// O(nlog(n)) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
export function allKindsOfNodeDepths(root: BinaryTree) {
  let sumOfAllDepths = 0;
  let stack: Array<BinaryTree | null> = [root];
  while (stack.length > 0) {
    const node = stack.pop() as BinaryTree | null;
    if (node === null) continue;
    sumOfAllDepths += nodeDepths(node);
    stack.push(node.left);
    stack.push(node.right);
  }
  return sumOfAllDepths;
}

function nodeDepths(node: BinaryTree | null, depth = 0): number {
  if (node === null) return 0;
  return depth + nodeDepths(node.left, depth + 1) + nodeDepths(node.right, depth + 1);
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
// O(nlog(n)) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
export function allKindsOfNodeDepths(root: BinaryTree | null): number {
  if (root === null) return 0;
  return allKindsOfNodeDepths(root.left) + allKindsOfNodeDepths(root.right) + nodeDepths(root);
}

function nodeDepths(node: BinaryTree | null, depth = 0): number {
  if (node === null) return 0;
  return depth + nodeDepths(node.left, depth + 1) + nodeDepths(node.right, depth + 1);
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
### Solution 3 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average case: when the tree is balanced
// O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
export function allKindsOfNodeDepths(root: BinaryTree) {
  addNodeCounts(root);
  addNodeDepths(root);
  return sumAllNodeDepths(root);
}

function sumAllNodeDepths(node: BinaryTree | null): number {
  if (node == null) return 0;
  return sumAllNodeDepths(node.left) + sumAllNodeDepths(node.right) + node._sumOfDepths!;
}

function addNodeDepths(node: BinaryTree) {
  node._sumOfDepths = 0;
  if (node.left !== null) {
    addNodeDepths(node.left);
    node._sumOfDepths += node.left._sumOfDepths! + node.left._numNodesInTree!;
  }
  if (node.right !== null) {
    addNodeDepths(node.right);
    node._sumOfDepths += node.right._sumOfDepths! + node.right._numNodesInTree!;
  }
}

function addNodeCounts(node: BinaryTree) {
  node._numNodesInTree = 1;
  if (node.left !== null) {
    addNodeCounts(node.left);
    node._numNodesInTree += node.left._numNodesInTree!;
  }
  if (node.right !== null) {
    addNodeCounts(node.right);
    node._numNodesInTree += node.right._numNodesInTree!;
  }
}

// This is the class of the input binary tree.
class BinaryTree {
  value: number;
  left: BinaryTree | null;
  right: BinaryTree | null;
  _sumOfDepths?: number;
  _numNodesInTree?: number;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

```
### Solution 4 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

interface TreeInfo {
  numNodesInTree: number;
  sumOfDepths: number;
  sumOfAllDepths: number;
}

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
export function allKindsOfNodeDepths(root: BinaryTree) {
  return getTreeInfo(root).sumOfAllDepths;
}

function getTreeInfo(tree: BinaryTree | null): TreeInfo {
  if (tree === null) {
    return {
      numNodesInTree: 0,
      sumOfDepths: 0,
      sumOfAllDepths: 0,
    };
  }

  const leftTreeInfo = getTreeInfo(tree.left);
  const rightTreeInfo = getTreeInfo(tree.right);

  const sumOfLeftDepths = leftTreeInfo.sumOfDepths + leftTreeInfo.numNodesInTree;
  const sumOfRightDepths = rightTreeInfo.sumOfDepths + rightTreeInfo.numNodesInTree;

  const numNodesInTree = 1 + leftTreeInfo.numNodesInTree + rightTreeInfo.numNodesInTree;
  const sumOfDepths = sumOfLeftDepths + sumOfRightDepths;
  const sumOfAllDepths = sumOfDepths + leftTreeInfo.sumOfAllDepths + rightTreeInfo.sumOfAllDepths;

  return {
    numNodesInTree,
    sumOfDepths,
    sumOfAllDepths,
  };
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
### Solution 5 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
export function allKindsOfNodeDepths(root: BinaryTree | null, depthSum = 0, depth = 0): number {
  if (!root) return 0;

  depthSum += depth;
  return (
    depthSum +
    allKindsOfNodeDepths(root.left, depthSum, depth + 1) +
    allKindsOfNodeDepths(root.right, depthSum, depth + 1)
  );
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
### Solution 6 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
export function allKindsOfNodeDepths(root: BinaryTree | null, depth = 0): number {
  if (!root) return 0;

  // Formula to calculate 1 + 2 + 3 + ... + depth - 1 + depth
  const depthSum = (depth * (depth + 1)) / 2;
  return depthSum + allKindsOfNodeDepths(root.left, depth + 1) + allKindsOfNodeDepths(root.right, depth + 1);
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
  const actual = program.allKindsOfNodeDepths(root);
  chai.expect(actual).to.deep.equal(26);
});

```

