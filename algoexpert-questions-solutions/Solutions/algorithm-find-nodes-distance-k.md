# Find Nodes Distance K
<div class="html">
<p>
  You're given the root node of a Binary Tree, a <span>target</span> value of a
  node that's contained in the tree, and a positive integer <span>k</span>.
  Write a function that returns the values of all the nodes that are exactly
  distance <span>k</span> from the node with <span>target</span> value.
</p>
<p>
  The distance between two nodes is defined as the number of edges that must be
  traversed to go from one node to the other. For example, the distance between
  a node and its immediate left or right child is <span>1</span>. The same holds
  in reverse: the distance between a node and its parent is <span>1</span>. In a
  tree of three nodes where the root node has a left and right child, the left
  and right children are distance <span>2</span> from each other.
</p>
<p>
  Each <span>BinaryTree</span> node has an integer <span>value</span>, a
  <span>left</span> child node, and a <span>right</span> child node. Children
  nodes can either be <span>BinaryTree</span> nodes themselves or
  <span>None</span> / <span>null</span>.
</p>
<p>
  Note that all <span>BinaryTree</span> node values will be unique, and your
  function can return the output values in any order.
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
<span class="CodeEditor-promptParameter">target</span> = 3
<span class="CodeEditor-promptParameter">k</span> = 2
</pre>
<h3>Sample Output</h3>
<pre>
[2, 7, 8] <span class="CodeEditor-promptComment">// These values could be ordered differently.</span>
</pre>
</div>

Hint 1
<p>
  Would it be easier to solve this problem if you had information about every
  node's parent node?
</p>


Hint 2

<p>
  One approach to this problem is to find the parent nodes of all nodes in the
  tree. With this information you can perform a breadth-first search starting at
  the target node and traverse through each neighbor (left, right, and parent
  node) of every node, keeping track of your distance from the target node at
  each iteration. Once you reach a node that is distance <span>k</span> from the
  target node, you can add it to your output array. You'll have to also keep
  track of which nodes you've visited so as to avoid visiting the same nodes
  over and over again.
</p>


Hint 3

<p>
  Another approach is to use a recursive depth-first-search algorithm as
  follows:
</p>
<ul>
  <li>
    <b>Case #1</b>: when <span>currentNode == target</span>, search the subtree
    rooted at <span>currentNode</span> for all nodes that are
    <span>k</span> distance from <span>currentNode</span>.
  </li>
  <li>
    <b>Case #2</b>: when <span>target</span> is in the left subtree of
    <span>currentNode</span> at distance <span>L + 1</span>, look for nodes that
    are distance <span>k - L - 1</span> in the right subtree of
    <span>currentNode</span>.
  </li>
  <li>
    <b>Case #3</b>: when <span>target</span> is in the right subtree of
    <span>currentNode</span> at distance <span>L + 1</span>, do the same thing
    as in case #2 but in the opposite subtree.
  </li>
  <li>
    <b>Case #4</b>: when <span>target</span> is neither in the left nor in right
    subtree of <span>currentNode</span>, stop recursing.
  </li>
</ul>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

#include <algorithm>

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      BinaryTree *root = new BinaryTree(1);
      root->left = new BinaryTree(2);
      root->right = new BinaryTree(3);
      root->left->left = new BinaryTree(4);
      root->left->right = new BinaryTree(5);
      root->right->right = new BinaryTree(6);
      root->right->right->left = new BinaryTree(7);
      root->right->right->right = new BinaryTree(8);
      int target = 3;
      int k = 2;
      vector<int> expected = {2, 7, 8};
      auto actual = findNodesDistanceK(root, target, k);
      sort(actual.begin(), actual.end());
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <utility>
#include <unordered_map>
#include <deque>
#include <unordered_set>
using namespace std;

// This is an input class. Do not edit.
class BinaryTree {
public:
  int value;
  BinaryTree *left = nullptr;
  BinaryTree *right = nullptr;

  BinaryTree(int value) { this->value = value; }
};

vector<int> breadthFirstSearchForNodesDistanceK(
    BinaryTree *targetNode, unordered_map<int, BinaryTree *> &nodesToParent,
    int k);
BinaryTree *getNodeFromValue(int value, BinaryTree *tree,
                             unordered_map<int, BinaryTree *> &nodesToParents);
void populateNodesToParents(BinaryTree *node,
                            unordered_map<int, BinaryTree *> &nodesToParents,
                            BinaryTree *parent);

// O(n) time | O(n) space - where n is the number of nodes in the tree
vector<int> findNodesDistanceK(BinaryTree *tree, int target, int k) {
  unordered_map<int, BinaryTree *> nodesToParents;
  populateNodesToParents(tree, nodesToParents, nullptr);
  auto targetNode = getNodeFromValue(target, tree, nodesToParents);

  return breadthFirstSearchForNodesDistanceK(targetNode, nodesToParents, k);
}

vector<int> breadthFirstSearchForNodesDistanceK(
    BinaryTree *targetNode, unordered_map<int, BinaryTree *> &nodesToParents,
    int k) {
  deque<pair<BinaryTree *, int>> queue = {
      pair<BinaryTree *, int>(targetNode, 0)};
  unordered_set<int> seen = {targetNode->value};
  while (queue.size() > 0) {
    auto currentNode = queue.front().first;
    auto distanceFromTarget = queue.front().second;
    queue.pop_front();

    if (distanceFromTarget == k) {
      vector<int> nodesDistanceK;
      for (auto item : queue) {
        nodesDistanceK.push_back(item.first->value);
      }
      nodesDistanceK.push_back(currentNode->value);
      return nodesDistanceK;
    }

    vector<BinaryTree *> connectedNodes = {
        currentNode->left,
        currentNode->right,
        nodesToParents[currentNode->value],
    };
    for (auto node : connectedNodes) {
      if (node == nullptr)
        continue;

      if (seen.find(node->value) != seen.end())
        continue;

      seen.insert(node->value);
      queue.push_back(pair<BinaryTree *, int>(node, distanceFromTarget + 1));
    }
  }

  return {};
}

BinaryTree *getNodeFromValue(int value, BinaryTree *tree,
                             unordered_map<int, BinaryTree *> &nodesToParents) {
  if (tree->value == value)
    return tree;

  auto nodeParent = nodesToParents[value];
  if (nodeParent->left != nullptr && nodeParent->left->value == value)
    return nodeParent->left;

  return nodeParent->right;
}

void populateNodesToParents(BinaryTree *node,
                            unordered_map<int, BinaryTree *> &nodesToParents,
                            BinaryTree *parent) {
  if (node != nullptr) {
    nodesToParents[node->value] = parent;
    populateNodesToParents(node->left, nodesToParents, node);
    populateNodesToParents(node->right, nodesToParents, node);
  }
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

// This is an input class. Do not edit.
class BinaryTree {
public:
  int value;
  BinaryTree *left = NULL;
  BinaryTree *right = NULL;

  BinaryTree(int value) { this->value = value; }
};

int findDistanceFromNodeToTarget(BinaryTree *node, int target, int k,
                                 vector<int> &nodesDistanceK);
void addSubtreeNodeAtDistanceK(BinaryTree *node, int distance, int k,
                               vector<int> &nodesDistanceK);

// O(n) time | O(n) space - where n is the number of nodes in the tree
vector<int> findNodesDistanceK(BinaryTree *tree, int target, int k) {
  vector<int> nodesDistanceK;
  findDistanceFromNodeToTarget(tree, target, k, nodesDistanceK);
  return nodesDistanceK;
}

int findDistanceFromNodeToTarget(BinaryTree *node, int target, int k,
                                 vector<int> &nodesDistanceK) {
  if (node == nullptr)
    return -1;

  if (node->value == target) {
    addSubtreeNodeAtDistanceK(node, 0, k, nodesDistanceK);
    return 1;
  }

  int leftDistance =
      findDistanceFromNodeToTarget(node->left, target, k, nodesDistanceK);
  int rightDistance =
      findDistanceFromNodeToTarget(node->right, target, k, nodesDistanceK);

  if (leftDistance == k || rightDistance == k)
    nodesDistanceK.push_back(node->value);

  if (leftDistance != -1) {
    addSubtreeNodeAtDistanceK(node->right, leftDistance + 1, k, nodesDistanceK);
    return leftDistance + 1;
  }

  if (rightDistance != -1) {
    addSubtreeNodeAtDistanceK(node->left, rightDistance + 1, k, nodesDistanceK);
    return rightDistance + 1;
  }

  return -1;
}

void addSubtreeNodeAtDistanceK(BinaryTree *node, int distance, int k,
                               vector<int> &nodesDistanceK) {
  if (node == nullptr)
    return;

  if (distance == k)
    nodesDistanceK.push_back(node->value);
  else {
    addSubtreeNodeAtDistanceK(node->left, distance + 1, k, nodesDistanceK);
    addSubtreeNodeAtDistanceK(node->right, distance + 1, k, nodesDistanceK);
  }
}
```
### Unit Tests 1 (cpp)
```cpp
#include <algorithm>

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      BinaryTree *root = new BinaryTree(1);
      root->left = new BinaryTree(2);
      root->right = new BinaryTree(3);
      root->left->left = new BinaryTree(4);
      root->left->right = new BinaryTree(5);
      root->right->right = new BinaryTree(6);
      root->right->right->left = new BinaryTree(7);
      root->right->right->right = new BinaryTree(8);
      int target = 3;
      int k = 2;
      vector<int> expected = {2, 7, 8};
      auto actual = findNodesDistanceK(root, target, k);
      sort(actual.begin(), actual.end());
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

using System.Collections.Generic;
using System.Linq;
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		Program.BinaryTree root = new Program.BinaryTree(1);
		root.left = new Program.BinaryTree(2);
		root.right = new Program.BinaryTree(3);
		root.left.left = new Program.BinaryTree(4);
		root.left.right = new Program.BinaryTree(5);
		root.right.right = new Program.BinaryTree(6);
		root.right.right.left = new Program.BinaryTree(7);
		root.right.right.right = new Program.BinaryTree(8);
		int target = 3;
		int k = 2;
		var expected = new List<int> {
			2, 7, 8
		};
		var actual = new Program().FindNodesDistanceK(root, target, k);
		actual.Sort();
		Utils.AssertTrue(Enumerable.SequenceEqual(expected, actual));
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

	// O(n) time | O(n) space - where n is the number of nodes in the tree
	public List<int> FindNodesDistanceK(BinaryTree tree, int target, int k) {
		Dictionary<int, BinaryTree> nodesToParents = new Dictionary<int, BinaryTree>();
		populateNodesToParents(tree, nodesToParents, null);
		BinaryTree targetNode = getNodeFromValue(target, tree, nodesToParents);
		return breadthFirstSearchForNodesDistanceK(targetNode, nodesToParents, k);
	}

	public List<int> breadthFirstSearchForNodesDistanceK(BinaryTree targetNode, Dictionary<int,
	  BinaryTree> nodesToParents, int k) {
		Queue<Tuple <BinaryTree, int> > queue = new Queue<Tuple<BinaryTree, int> >();
		queue.Enqueue(new Tuple<BinaryTree, int> (targetNode, 0));

		HashSet<int> seen = new HashSet<int>(targetNode.value);
		seen.Add(targetNode.value);

		while (queue.Count > 0) {
			Tuple <BinaryTree, int> vals = queue.Dequeue();
			BinaryTree currentNode = vals.Item1;
			int distanceFromTarget = vals.Item2;

			if (distanceFromTarget == k) {
				List<int> nodeDistanceK = new List<int>();
				foreach (var pair in queue) {
					nodeDistanceK.Add(pair.Item1.value);
				}
				nodeDistanceK.Add(currentNode.value);
				return nodeDistanceK;
			}

			List<BinaryTree> connectedNodes = new List<BinaryTree>();
			connectedNodes.Add(currentNode.left);
			connectedNodes.Add(currentNode.right);
			connectedNodes.Add(nodesToParents[currentNode.value]);

			foreach (var node in connectedNodes) {
				if (node == null) continue;

				if (seen.Contains(node.value)) continue;

				seen.Add(node.value);
				queue.Enqueue(new Tuple<BinaryTree, int>(node,
				  distanceFromTarget + 1));
			}
		}

		return new List<int>();
	}

	public BinaryTree getNodeFromValue(int value, BinaryTree tree, Dictionary<int,
	  BinaryTree> nodesToParents) {
		if (tree.value == value) return tree;

		BinaryTree nodeParent = nodesToParents[value];
		if (nodeParent.left != null &&
		  nodeParent.left.value == value) return nodeParent.left;

		return nodeParent.right;
	}

	public void populateNodesToParents(BinaryTree node, Dictionary<int,
	  BinaryTree> nodesToParents, BinaryTree parent) {
		if (node != null) {
			nodesToParents[node.value] = parent;
			populateNodesToParents(node.left, nodesToParents, node);
			populateNodesToParents(node.right, nodesToParents, node);
		}
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

	// O(n) time | O(n) space - where n is the number of nodes in the tree
	public List<int> FindNodesDistanceK(BinaryTree tree, int target, int k) {
		List<int> nodesDistanceK = new List<int>();
		findDistanceFromNodeToTarget(tree, target, k, nodesDistanceK);
		return nodesDistanceK;
	}

	public int findDistanceFromNodeToTarget(BinaryTree node, int target, int k,
	  List<int> nodesDistanceK) {
		if (node == null) return -1;

		if (node.value == target) {
			addSubtreeNodeAtDistanceK(node, 0, k, nodesDistanceK);
			return 1;
		}

		int leftDistance =
		  findDistanceFromNodeToTarget(node.left, target, k, nodesDistanceK);
		int rightDistance = findDistanceFromNodeToTarget(node.right, target, k,
		    nodesDistanceK);

		if (leftDistance == k || rightDistance == k) nodesDistanceK.Add(node.value);

		if (leftDistance != -1) {
			addSubtreeNodeAtDistanceK(node.right, leftDistance + 1, k, nodesDistanceK);
			return leftDistance + 1;
		}

		if (rightDistance != -1) {
			addSubtreeNodeAtDistanceK(node.left, rightDistance + 1, k, nodesDistanceK);
			return rightDistance + 1;
		}

		return -1;
	}

	void addSubtreeNodeAtDistanceK(BinaryTree node, int distance, int k,
	  List<int> nodesDistanceK) {
		if (node == null) return;

		if (distance == k) {
			nodesDistanceK.Add(node.value);
		} else {
			addSubtreeNodeAtDistanceK(node.left, distance + 1, k, nodesDistanceK);
			addSubtreeNodeAtDistanceK(node.right, distance + 1, k, nodesDistanceK);
		}
	}
}



```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;
using System.Linq;
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		Program.BinaryTree root = new Program.BinaryTree(1);
		root.left = new Program.BinaryTree(2);
		root.right = new Program.BinaryTree(3);
		root.left.left = new Program.BinaryTree(4);
		root.left.right = new Program.BinaryTree(5);
		root.right.right = new Program.BinaryTree(6);
		root.right.right.left = new Program.BinaryTree(7);
		root.right.right.right = new Program.BinaryTree(8);
		int target = 3;
		int k = 2;
		var expected = new List<int> {
			2, 7, 8
		};
		var actual = new Program().FindNodesDistanceK(root, target, k);
		actual.Sort();
		Utils.AssertTrue(Enumerable.SequenceEqual(expected, actual));
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
	"sort"

	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	root := &BinaryTree{Value: 1}
	root.Left = &BinaryTree{Value: 2}
	root.Right = &BinaryTree{Value: 3}
	root.Left.Left = &BinaryTree{Value: 4}
	root.Left.Right = &BinaryTree{Value: 5}
	root.Right.Right = &BinaryTree{Value: 6}
	root.Right.Right.Left = &BinaryTree{Value: 7}
	root.Right.Right.Right = &BinaryTree{Value: 8}
	target := 3
	k := 2
	expected := []int{2, 7, 8}
	actual := FindNodesDistanceK(root, target, k)
	sort.Ints(actual)
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

// O(n) time | O(n) space - where n is the number of nodes in the tree
func FindNodesDistanceK(tree *BinaryTree, target int, k int) []int {
	nodesToParents := map[int]*BinaryTree{}
	populateNodesToParents(tree, nodesToParents, nil)
	targetNode := getNodeFromValue(target, tree, nodesToParents)

	return breadthFirstSearchForNodesDistanceK(targetNode, nodesToParents, k)
}

func breadthFirstSearchForNodesDistanceK(targetNode *BinaryTree, nodesToParents map[int]*BinaryTree, k int) []int {
	type item struct {
		node     *BinaryTree
		distance int
	}
	// We could use a more legitimate queue structure instead of a standard
	// list if we wanted to optimize our `.removeAt(0) operations.`
	queue := []item{{node: targetNode, distance: 0}}
	seen := map[int]bool{targetNode.Value: true}
	var currentItem item
	for len(queue) > 0 {
		currentItem, queue = queue[0], queue[1:]
		currentNode, distanceFromTarget := currentItem.node, currentItem.distance

		if distanceFromTarget == k {
			nodesDistanceK := make([]int, 0)
			for _, i := range queue {
				nodesDistanceK = append(nodesDistanceK, i.node.Value)
			}
			nodesDistanceK = append(nodesDistanceK, currentNode.Value)
			return nodesDistanceK
		}

		connectedNodes := []*BinaryTree{currentNode.Left, currentNode.Right, nodesToParents[currentNode.Value]}
		for _, node := range connectedNodes {
			if node == nil {
				continue
			}

			if seen[node.Value] {
				continue
			}

			seen[node.Value] = true
			queue = append(queue, item{node: node, distance: distanceFromTarget + 1})
		}
	}

	return []int{}
}

func getNodeFromValue(value int, tree *BinaryTree, nodesToParents map[int]*BinaryTree) *BinaryTree {
	if tree.Value == value {
		return tree
	}

	nodeParent := nodesToParents[value]
	if nodeParent.Left != nil && nodeParent.Left.Value == value {
		return nodeParent.Left
	}

	return nodeParent.Right
}

func populateNodesToParents(node *BinaryTree, nodesToParents map[int]*BinaryTree, parent *BinaryTree) {
	if node != nil {
		nodesToParents[node.Value] = parent
		populateNodesToParents(node.Left, nodesToParents, node)
		populateNodesToParents(node.Right, nodesToParents, node)
	}
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

// O(n) time | O(n) space - where n is the number of nodes in the tree
func FindNodesDistanceK(tree *BinaryTree, target int, k int) []int {
	nodesDistanceK := []int{}
	findDistanceFromNodeToTarget(tree, target, k, &nodesDistanceK)
	return nodesDistanceK
}

func findDistanceFromNodeToTarget(node *BinaryTree, target int, k int, nodesDistanceK *[]int) int {
	if node == nil {
		return -1
	}

	if node.Value == target {
		addSubtreeNodesAtDistanceK(node, 0, k, nodesDistanceK)
		return 1
	}

	leftDistance := findDistanceFromNodeToTarget(node.Left, target, k, nodesDistanceK)
	rightDistance := findDistanceFromNodeToTarget(node.Right, target, k, nodesDistanceK)

	if leftDistance == k || rightDistance == k {
		*nodesDistanceK = append(*nodesDistanceK, node.Value)
	}

	if leftDistance != -1 {
		addSubtreeNodesAtDistanceK(node.Right, leftDistance+1, k, nodesDistanceK)
		return leftDistance + 1
	}

	if rightDistance != -1 {
		addSubtreeNodesAtDistanceK(node.Left, rightDistance+1, k, nodesDistanceK)
		return rightDistance + 1
	}

	return -1
}

func addSubtreeNodesAtDistanceK(node *BinaryTree, distance int, k int, nodesDistanceK *[]int) {
	if node == nil {
		return
	}

	if distance == k {
		*nodesDistanceK = append(*nodesDistanceK, node.Value)
	} else {
		addSubtreeNodesAtDistanceK(node.Left, distance+1, k, nodesDistanceK)
		addSubtreeNodesAtDistanceK(node.Right, distance+1, k, nodesDistanceK)
	}
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"sort"

	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	root := &BinaryTree{Value: 1}
	root.Left = &BinaryTree{Value: 2}
	root.Right = &BinaryTree{Value: 3}
	root.Left.Left = &BinaryTree{Value: 4}
	root.Left.Right = &BinaryTree{Value: 5}
	root.Right.Right = &BinaryTree{Value: 6}
	root.Right.Right.Left = &BinaryTree{Value: 7}
	root.Right.Right.Right = &BinaryTree{Value: 8}
	target := 3
	k := 2
	expected := []int{2, 7, 8}
	actual := FindNodesDistanceK(root, target, k)
	sort.Ints(actual)
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
    root.right = new Program.BinaryTree(3);
    root.left.left = new Program.BinaryTree(4);
    root.left.right = new Program.BinaryTree(5);
    root.right.right = new Program.BinaryTree(6);
    root.right.right.left = new Program.BinaryTree(7);
    root.right.right.right = new Program.BinaryTree(8);
    int target = 3;
    int k = 2;
    var expected = new ArrayList<Integer>(Arrays.asList(2, 7, 8));
    var actual = new Program().findNodesDistanceK(root, target, k);
    Collections.sort(actual);
    Utils.assertTrue(expected.equals(actual));
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

  static class Pair<U, V> {
    public final U first;
    public final V second;

    private Pair(U first, V second) {
      this.first = first;
      this.second = second;
    }
  }

  // O(n) time | O(n) space - where n is the number of nodes in the tree
  public ArrayList<Integer> findNodesDistanceK(BinaryTree tree, int target, int k) {
    HashMap<Integer, BinaryTree> nodesToParents = new HashMap<Integer, BinaryTree>();
    populateNodesToParents(tree, nodesToParents, null);
    BinaryTree targetNode = getNodeFromValue(target, tree, nodesToParents);
    return breadthFirstSearchForNodesDistanceK(targetNode, nodesToParents, k);
  }

  public ArrayList<Integer> breadthFirstSearchForNodesDistanceK(
      BinaryTree targetNode, HashMap<Integer, BinaryTree> nodesToParents, int k) {
    Queue<Pair<BinaryTree, Integer>> queue = new LinkedList<Pair<BinaryTree, Integer>>();
    queue.offer(new Pair<BinaryTree, Integer>(targetNode, 0));

    HashSet<Integer> seen = new HashSet<Integer>(targetNode.value);
    seen.add(targetNode.value);

    while (queue.size() > 0) {
      Pair<BinaryTree, Integer> vals = queue.poll();
      BinaryTree currentNode = vals.first;
      int distanceFromTarget = vals.second;

      if (distanceFromTarget == k) {
        ArrayList<Integer> nodeDistanceK = new ArrayList<Integer>();
        for (Pair<BinaryTree, Integer> pair : queue) {
          nodeDistanceK.add(pair.first.value);
        }
        nodeDistanceK.add(currentNode.value);
        return nodeDistanceK;
      }

      List<BinaryTree> connectedNodes = new ArrayList<BinaryTree>();
      connectedNodes.add(currentNode.left);
      connectedNodes.add(currentNode.right);
      connectedNodes.add(nodesToParents.get(currentNode.value));

      for (BinaryTree node : connectedNodes) {
        if (node == null) continue;

        if (seen.contains(node.value)) continue;

        seen.add(node.value);
        queue.add(new Pair<BinaryTree, Integer>(node, distanceFromTarget + 1));
      }
    }

    return new ArrayList<Integer>();
  }

  public BinaryTree getNodeFromValue(
      int value, BinaryTree tree, HashMap<Integer, BinaryTree> nodesToParents) {
    if (tree.value == value) return tree;

    BinaryTree nodeParent = nodesToParents.get(value);
    if (nodeParent.left != null && nodeParent.left.value == value) return nodeParent.left;

    return nodeParent.right;
  }

  public void populateNodesToParents(
      BinaryTree node, Map<Integer, BinaryTree> nodesToParents, BinaryTree parent) {
    if (node != null) {
      nodesToParents.put(node.value, parent);
      populateNodesToParents(node.left, nodesToParents, node);
      populateNodesToParents(node.right, nodesToParents, node);
    }
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

  // O(n) time | O(n) space - where n is the number of nodes in the tree
  public ArrayList<Integer> findNodesDistanceK(BinaryTree tree, int target, int k) {
    ArrayList<Integer> nodesDistanceK = new ArrayList<Integer>();
    findDistanceFromNodeToTarget(tree, target, k, nodesDistanceK);
    return nodesDistanceK;
  }

  public int findDistanceFromNodeToTarget(
      BinaryTree node, int target, int k, ArrayList<Integer> nodesDistanceK) {
    if (node == null) return -1;

    if (node.value == target) {
      addSubtreeNodeAtDistanceK(node, 0, k, nodesDistanceK);
      return 1;
    }

    int leftDistance = findDistanceFromNodeToTarget(node.left, target, k, nodesDistanceK);
    int rightDistance = findDistanceFromNodeToTarget(node.right, target, k, nodesDistanceK);

    if (leftDistance == k || rightDistance == k) nodesDistanceK.add(node.value);

    if (leftDistance != -1) {
      addSubtreeNodeAtDistanceK(node.right, leftDistance + 1, k, nodesDistanceK);
      return leftDistance + 1;
    }

    if (rightDistance != -1) {
      addSubtreeNodeAtDistanceK(node.left, rightDistance + 1, k, nodesDistanceK);
      return rightDistance + 1;
    }

    return -1;
  }

  void addSubtreeNodeAtDistanceK(
      BinaryTree node, int distance, int k, ArrayList<Integer> nodesDistanceK) {
    if (node == null) return;

    if (distance == k) {
      nodesDistanceK.add(node.value);
    } else {
      addSubtreeNodeAtDistanceK(node.left, distance + 1, k, nodesDistanceK);
      addSubtreeNodeAtDistanceK(node.right, distance + 1, k, nodesDistanceK);
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
    root.left = new Program.BinaryTree(2);
    root.right = new Program.BinaryTree(3);
    root.left.left = new Program.BinaryTree(4);
    root.left.right = new Program.BinaryTree(5);
    root.right.right = new Program.BinaryTree(6);
    root.right.right.left = new Program.BinaryTree(7);
    root.right.right.right = new Program.BinaryTree(8);
    int target = 3;
    int k = 2;
    var expected = new ArrayList<Integer>(Arrays.asList(2, 7, 8));
    var actual = new Program().findNodesDistanceK(root, target, k);
    Collections.sort(actual);
    Utils.assertTrue(expected.equals(actual));
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
  root.right = new program.BinaryTree(3);
  root.left.left = new program.BinaryTree(4);
  root.left.right = new program.BinaryTree(5);
  root.right.right = new program.BinaryTree(6);
  root.right.right.left = new program.BinaryTree(7);
  root.right.right.right = new program.BinaryTree(8);
  const target = 3;
  const k = 2;
  const expected = [2, 7, 8];
  const actual = program.findNodesDistanceK(root, target, k);
  actual.sort();
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

// O(n) time | O(n) space - where n is the number of nodes in the tree
function findNodesDistanceK(tree, target, k) {
  const nodesToParents = {};
  populateNodesToParents(tree, nodesToParents);
  const targetNode = getNodeFromValue(target, tree, nodesToParents);

  return breadthFirstSearchForNodesDistanceK(targetNode, nodesToParents, k);
}

function breadthFirstSearchForNodesDistanceK(targetNode, nodesToParents, k) {
  // We could use a more legitimate queue structure instead of a standard
  // array if we wanted to optimize our `.shift() operations.`
  const queue = [[targetNode, 0]];
  const seen = new Set([targetNode.value]);
  while (queue.length > 0) {
    const [currentNode, distanceFromTarget] = queue.shift();

    if (distanceFromTarget === k) {
      const nodesDistanceK = queue.map(pair => pair[0].value);
      nodesDistanceK.push(currentNode.value);
      return nodesDistanceK;
    }

    const connectedNodes = [currentNode.left, currentNode.right, nodesToParents[currentNode.value]];
    for (const node of connectedNodes) {
      if (node === null) continue;

      if (seen.has(node.value)) continue;

      seen.add(node.value);
      queue.push([node, distanceFromTarget + 1]);
    }
  }

  return [];
}

function getNodeFromValue(value, tree, nodesToParents) {
  if (tree.value === value) return tree;

  const nodeParent = nodesToParents[value];
  if (nodeParent.left !== null && nodeParent.left.value === value) return nodeParent.left;

  return nodeParent.right;
}

function populateNodesToParents(node, nodesToParents, parent = null) {
  if (node !== null) {
    nodesToParents[node.value] = parent;
    populateNodesToParents(node.left, nodesToParents, node);
    populateNodesToParents(node.right, nodesToParents, node);
  }
}

// Do not edit the lines below.
exports.BinaryTree = BinaryTree;
exports.findNodesDistanceK = findNodesDistanceK;

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

// O(n) time | O(n) space - where n is the number of nodes in the tree
function findNodesDistanceK(tree, target, k) {
  const nodesDistanceK = [];
  findDistanceFromNodeToTarget(tree, target, k, nodesDistanceK);
  return nodesDistanceK;
}

function findDistanceFromNodeToTarget(node, target, k, nodesDistanceK) {
  if (node === null) return -1;

  if (node.value === target) {
    addSubtreeNodeAtDistanceK(node, 0, k, nodesDistanceK);
    return 1;
  }

  const leftDistance = findDistanceFromNodeToTarget(node.left, target, k, nodesDistanceK);
  const rightDistance = findDistanceFromNodeToTarget(node.right, target, k, nodesDistanceK);

  if (leftDistance === k || rightDistance === k) nodesDistanceK.push(node.value);

  if (leftDistance !== -1) {
    addSubtreeNodeAtDistanceK(node.right, leftDistance + 1, k, nodesDistanceK);
    return leftDistance + 1;
  }

  if (rightDistance !== -1) {
    addSubtreeNodeAtDistanceK(node.left, rightDistance + 1, k, nodesDistanceK);
    return rightDistance + 1;
  }

  return -1;
}

function addSubtreeNodeAtDistanceK(node, distance, k, nodesDistanceK) {
  if (node === null) return;

  if (distance === k) nodesDistanceK.push(node.value);
  else {
    addSubtreeNodeAtDistanceK(node.left, distance + 1, k, nodesDistanceK);
    addSubtreeNodeAtDistanceK(node.right, distance + 1, k, nodesDistanceK);
  }
}

// Do not edit the lines below.
exports.BinaryTree = BinaryTree;
exports.findNodesDistanceK = findNodesDistanceK;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const root = new program.BinaryTree(1);
  root.left = new program.BinaryTree(2);
  root.right = new program.BinaryTree(3);
  root.left.left = new program.BinaryTree(4);
  root.left.right = new program.BinaryTree(5);
  root.right.right = new program.BinaryTree(6);
  root.right.right.left = new program.BinaryTree(7);
  root.right.right.right = new program.BinaryTree(8);
  const target = 3;
  const k = 2;
  const expected = [2, 7, 8];
  const actual = program.findNodesDistanceK(root, target, k);
  actual.sort();
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.BinaryTree
import com.algoexpert.program.findNodesDistanceK

class ProgramTest {
    @Test
    fun TestCase1() {
        val root = BinaryTree(1)
        root.left = BinaryTree(2)
        root.right = BinaryTree(3)
        root.left!!.left = BinaryTree(4)
        root.left!!.right = BinaryTree(5)
        root.right!!.right = BinaryTree(6)
        root.right!!.right!!.left = BinaryTree(7)
        root.right!!.right!!.right = BinaryTree(8)
        val target = 3
        val k = 2
        val expected = listOf(2, 7, 8)
        val output = findNodesDistanceK(root, target, k).toMutableList()
        output.sort()
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

// O(n) time | O(n) space - where n is the number of nodes in the tree
fun findNodesDistanceK(tree: BinaryTree, target: Int, k: Int): List<Int> {
    val nodesToParents = mutableMapOf<Int, BinaryTree?>()
    populateNodesToParents(tree, nodesToParents)
    val targetNode = getNodeFromValue(target, tree, nodesToParents)

    return breadthFirstSearchForNodesDistanceK(targetNode, nodesToParents, k)
}

fun breadthFirstSearchForNodesDistanceK(targetNode: BinaryTree, nodesToParents: Map<Int, BinaryTree?>, k: Int): List<Int> {
    // We could use a more legitimate queue structure instead of a standard
    // list if we wanted to optimize our `.removeAt(0) operations.`
    val queue = mutableListOf(Pair(targetNode, 0))
    val seen = mutableSetOf(targetNode.value)
    while (queue.size > 0) {
        val (currentNode, distanceFromTarget) = queue.removeAt(0)

        if (distanceFromTarget == k) {
            val nodesDistanceK = queue.map() { it -> it.first.value }.toMutableList()
            nodesDistanceK.add(currentNode.value)
            return nodesDistanceK
        }

        val connectedNodes = listOf(currentNode.left, currentNode.right, nodesToParents[currentNode.value])
        for (node in connectedNodes) {
            if (node == null) continue

            if (node.value in seen) continue

            seen.add(node.value)
            queue.add(Pair(node, distanceFromTarget + 1))
        }
    }

    return listOf()
}

fun getNodeFromValue(value: Int, tree: BinaryTree, nodesToParents: Map<Int, BinaryTree?>): BinaryTree {
    if (tree.value == value) return tree

    val nodeParent = nodesToParents[value]!!
    if (nodeParent.left != null && nodeParent.left!!.value == value) return nodeParent.left!!

    return nodeParent.right!!
}

fun populateNodesToParents(node: BinaryTree?, nodesToParents: MutableMap<Int, BinaryTree?>, parent: BinaryTree? = null) {
    if (node != null) {
        nodesToParents[node.value] = parent
        populateNodesToParents(node.left, nodesToParents, node)
        populateNodesToParents(node.right, nodesToParents, node)
    }
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

// O(n) time | O(n) space - where n is the number of nodes in the tree
fun findNodesDistanceK(tree: BinaryTree, target: Int, k: Int): List<Int> {
    val nodesDistanceK = mutableListOf<Int>()
    findDistanceFromNodeToTarget(tree, target, k, nodesDistanceK)
    return nodesDistanceK
}

fun findDistanceFromNodeToTarget(node: BinaryTree?, target: Int, k: Int, nodesDistanceK: MutableList<Int>): Int {
    if (node == null) return -1

    if (node.value == target) {
        addSubtreeNodesAtDistanceK(node, 0, k, nodesDistanceK)
        return 1
    }

    val leftDistance = findDistanceFromNodeToTarget(node.left, target, k, nodesDistanceK)
    val rightDistance = findDistanceFromNodeToTarget(node.right, target, k, nodesDistanceK)

    if (leftDistance == k || rightDistance == k) nodesDistanceK.add(node.value)

    if (leftDistance != -1) {
        addSubtreeNodesAtDistanceK(node.right, leftDistance + 1, k, nodesDistanceK)
        return leftDistance + 1
    }

    if (rightDistance != -1) {
        addSubtreeNodesAtDistanceK(node.left, rightDistance + 1, k, nodesDistanceK)
        return rightDistance + 1
    }

    return -1
}

fun addSubtreeNodesAtDistanceK(node: BinaryTree?, distance: Int, k: Int, nodesDistanceK: MutableList<Int>) {
    if (node == null) return

    if (distance == k) {
        nodesDistanceK.add(node.value)
    } else {
        addSubtreeNodesAtDistanceK(node.left, distance + 1, k, nodesDistanceK)
        addSubtreeNodesAtDistanceK(node.right, distance + 1, k, nodesDistanceK)
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.BinaryTree
import com.algoexpert.program.findNodesDistanceK

class ProgramTest {
    @Test
    fun TestCase1() {
        val root = BinaryTree(1)
        root.left = BinaryTree(2)
        root.right = BinaryTree(3)
        root.left!!.left = BinaryTree(4)
        root.left!!.right = BinaryTree(5)
        root.right!!.right = BinaryTree(6)
        root.right!!.right!!.left = BinaryTree(7)
        root.right!!.right!!.right = BinaryTree(8)
        val target = 3
        val k = 2
        val expected = listOf(2, 7, 8)
        val output = findNodesDistanceK(root, target, k).toMutableList()
        output.sort()
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
      root.left = Program.BinaryTree(value: 2)
      root.right = Program.BinaryTree(value: 3)
      root.left!.left = Program.BinaryTree(value: 4)
      root.left!.right = Program.BinaryTree(value: 5)
      root.right!.right = Program.BinaryTree(value: 6)
      root.right!.right!.left = Program.BinaryTree(value: 7)
      root.right!.right!.right = Program.BinaryTree(value: 8)
      let target = 3
      let k = 2
      let expected = [2, 7, 8]
      var actual = Program().findNodesDistanceK(root, target, k)
      actual.sort()
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

  // O(n) time | O(n) space - where n is the number of nodes in the tree
  func findNodesDistanceK(_ tree: BinaryTree, _ target: Int, _ k: Int) -> [Int] {
    var nodesToParents = [Int: BinaryTree?]()
    populateNodesToParents(tree, &nodesToParents, nil)
    let targetNode = getNodeFromValue(target, tree, &nodesToParents)

    return breadthFirstSearchForNodesDistanceK(targetNode, nodesToParents, k)
  }

  func breadthFirstSearchForNodesDistanceK(_ targetNode: BinaryTree, _ nodesToParents: [Int: BinaryTree?], _ k: Int) -> [Int] {
    // We could use a more legitimate queue structure instead of a standard
    // list if we wanted to optimize our `.removeAt(0) operations.`
    var queue: [(BinaryTree, Int)] = [(targetNode, 0)]
    var seen: Set<Int> = [targetNode.value]
    while queue.count > 0 {
      let currentItem = queue[0]
      queue.remove(at: 0)
      let currentNode = currentItem.0
      let distanceFromTarget = currentItem.1

      if distanceFromTarget == k {
        var nodesDistanceK = [Int]()
        for item in queue {
          nodesDistanceK.append(item.0.value)
        }
        nodesDistanceK.append(currentNode.value)
        return nodesDistanceK
      }

      let connectedNodes = [currentNode.left, currentNode.right, nodesToParents[currentNode.value]!]
      for node in connectedNodes {
        if node == nil {
          continue
        }

        if seen.contains(node!.value) {
          continue
        }

        seen.insert(node!.value)
        queue.append((node!, distanceFromTarget + 1))
      }
    }

    return [Int]()
  }

  func getNodeFromValue(_ value: Int, _ tree: BinaryTree, _ nodesToParents: inout [Int: BinaryTree?]) -> BinaryTree {
    if tree.value == value {
      return tree
    }

    let nodeParent = nodesToParents[value]!
    if nodeParent!.left != nil, nodeParent!.left!.value == value {
      return nodeParent!.left!
    }

    return nodeParent!.right!
  }

  func populateNodesToParents(_ node: BinaryTree?, _ nodesToParents: inout [Int: BinaryTree?], _ parent: BinaryTree?) {
    if node != nil {
      nodesToParents[node!.value] = parent
      populateNodesToParents(node!.left, &nodesToParents, node)
      populateNodesToParents(node!.right, &nodesToParents, node)
    }
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

  // O(n) time | O(n) space - where n is the number of nodes in the tree
  func findNodesDistanceK(_ tree: BinaryTree, _ target: Int, _ k: Int) -> [Int] {
    var nodesDistanceK = [Int]()
    findDistanceFromNodeToTarget(tree, target, k, &nodesDistanceK)
    return nodesDistanceK
  }

  func findDistanceFromNodeToTarget(_ node: BinaryTree?, _ target: Int, _ k: Int, _ nodesDistanceK: inout [Int]) -> Int {
    if node == nil {
      return -1
    }

    if node!.value == target {
      addSubtreeNodesAtDistanceK(node, 0, k, &nodesDistanceK)
      return 1
    }

    let leftDistance = findDistanceFromNodeToTarget(node!.left, target, k, &nodesDistanceK)
    let rightDistance = findDistanceFromNodeToTarget(node!.right, target, k, &nodesDistanceK)

    if leftDistance == k || rightDistance == k {
      nodesDistanceK.append(node!.value)
    }

    if leftDistance != -1 {
      addSubtreeNodesAtDistanceK(node!.right, leftDistance + 1, k, &nodesDistanceK)
      return leftDistance + 1
    }

    if rightDistance != -1 {
      addSubtreeNodesAtDistanceK(node!.left, rightDistance + 1, k, &nodesDistanceK)
      return rightDistance + 1
    }
    return -1
  }

  func addSubtreeNodesAtDistanceK(_ node: BinaryTree?, _ distance: Int, _ k: Int, _ nodesDistanceK: inout [Int]) {
    if node == nil {
      return
    }

    if distance == k {
      nodesDistanceK.append(node!.value)
    } else {
      addSubtreeNodesAtDistanceK(node!.left, distance + 1, k, &nodesDistanceK)
      addSubtreeNodesAtDistanceK(node!.right, distance + 1, k, &nodesDistanceK)
    }
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let root = Program.BinaryTree(value: 1)
      root.left = Program.BinaryTree(value: 2)
      root.right = Program.BinaryTree(value: 3)
      root.left!.left = Program.BinaryTree(value: 4)
      root.left!.right = Program.BinaryTree(value: 5)
      root.right!.right = Program.BinaryTree(value: 6)
      root.right!.right!.left = Program.BinaryTree(value: 7)
      root.right!.right!.right = Program.BinaryTree(value: 8)
      let target = 3
      let k = 2
      let expected = [2, 7, 8]
      var actual = Program().findNodesDistanceK(root, target, k)
      actual.sort()
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
        root.left = program.BinaryTree(2)
        root.right = program.BinaryTree(3)
        root.left.left = program.BinaryTree(4)
        root.left.right = program.BinaryTree(5)
        root.right.right = program.BinaryTree(6)
        root.right.right.left = program.BinaryTree(7)
        root.right.right.right = program.BinaryTree(8)
        target = 3
        k = 2
        expected = [2, 7, 8]
        actual = program.findNodesDistanceK(root, target, k)
        actual.sort()
        self.assertCountEqual(actual, expected)

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


# O(n) time | O(n) space - where n is the number of nodes in the tree
def findNodesDistanceK(tree, target, k):
    nodesToParents = {}
    populateNodesToParents(tree, nodesToParents)
    targetNode = getNodeFromValue(target, tree, nodesToParents)

    return breadthFirstSearchForNodesDistanceK(targetNode, nodesToParents, k)


def breadthFirstSearchForNodesDistanceK(targetNode, nodesToParents, k):
    # We could use the `deque` object instead of a standard Python
    # list if we wanted to optimize our `.pop(0) operations.`
    queue = [(targetNode, 0)]
    seen = {targetNode.value}
    while len(queue) > 0:
        currentNode, distanceFromTarget = queue.pop(0)

        if distanceFromTarget == k:
            nodesDistanceK = [node.value for node, _ in queue]
            nodesDistanceK.append(currentNode.value)
            return nodesDistanceK

        connectedNodes = [currentNode.left, currentNode.right, nodesToParents[currentNode.value]]
        for node in connectedNodes:
            if node is None:
                continue

            if node.value in seen:
                continue

            seen.add(node.value)
            queue.append((node, distanceFromTarget + 1))

    return []


def getNodeFromValue(value, tree, nodesToParents):
    if tree.value == value:
        return tree

    nodeParent = nodesToParents[value]
    if nodeParent.left is not None and nodeParent.left.value == value:
        return nodeParent.left

    return nodeParent.right


def populateNodesToParents(node, nodesToParents, parent=None):
    if node is not None:
        nodesToParents[node.value] = parent
        populateNodesToParents(node.left, nodesToParents, node)
        populateNodesToParents(node.right, nodesToParents, node)

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


# O(n) time | O(n) space - where n is the number of nodes in the tree
def findNodesDistanceK(tree, target, k):
    nodesDistanceK = []
    findDistanceFromNodeToTarget(tree, target, k, nodesDistanceK)
    return nodesDistanceK


def findDistanceFromNodeToTarget(node, target, k, nodesDistanceK):
    if node is None:
        return -1

    if node.value == target:
        addSubtreeNodesAtDistanceK(node, 0, k, nodesDistanceK)
        return 1

    leftDistance = findDistanceFromNodeToTarget(node.left, target, k, nodesDistanceK)
    rightDistance = findDistanceFromNodeToTarget(node.right, target, k, nodesDistanceK)

    if leftDistance == k or rightDistance == k:
        nodesDistanceK.append(node.value)

    if leftDistance != -1:
        addSubtreeNodesAtDistanceK(node.right, leftDistance + 1, k, nodesDistanceK)
        return leftDistance + 1

    if rightDistance != -1:
        addSubtreeNodesAtDistanceK(node.left, rightDistance + 1, k, nodesDistanceK)
        return rightDistance + 1

    return -1


def addSubtreeNodesAtDistanceK(node, distance, k, nodesDistanceK):
    if node is None:
        return

    if distance == k:
        nodesDistanceK.append(node.value)
    else:
        addSubtreeNodesAtDistanceK(node.left, distance + 1, k, nodesDistanceK)
        addSubtreeNodesAtDistanceK(node.right, distance + 1, k, nodesDistanceK)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        root = program.BinaryTree(1)
        root.left = program.BinaryTree(2)
        root.right = program.BinaryTree(3)
        root.left.left = program.BinaryTree(4)
        root.left.right = program.BinaryTree(5)
        root.right.right = program.BinaryTree(6)
        root.right.right.left = program.BinaryTree(7)
        root.right.right.right = program.BinaryTree(8)
        target = 3
        k = 2
        expected = [2, 7, 8]
        actual = program.findNodesDistanceK(root, target, k)
        actual.sort()
        self.assertCountEqual(actual, expected)

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
  root.right = new program.BinaryTree(3);
  root.left.left = new program.BinaryTree(4);
  root.left.right = new program.BinaryTree(5);
  root.right.right = new program.BinaryTree(6);
  root.right.right.left = new program.BinaryTree(7);
  root.right.right.right = new program.BinaryTree(8);
  const target = 3;
  const k = 2;
  const expected = [2, 7, 8];
  const actual = program.findNodesDistanceK(root, target, k);
  actual.sort();
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

interface NodesToParents {
  [node: number]: BinaryTree | null;
}

// O(n) time | O(n) space - where n is the number of nodes in the tree
export function findNodesDistanceK(tree: BinaryTree, target: number, k: number) {
  const nodesToParents: NodesToParents = {};
  populateNodesToParents(tree, nodesToParents);
  const targetNode = getNodeFromValue(target, tree, nodesToParents);

  return breadthFirstSearchForNodesDistanceK(targetNode, nodesToParents, k);
}

function breadthFirstSearchForNodesDistanceK(targetNode: BinaryTree, nodesToParents: NodesToParents, k: number) {
  // We could use a more legitimate queue structure instead of a standard
  // array if we wanted to optimize our `.shift() operations.`
  const queue: Array<[BinaryTree, number]> = [[targetNode, 0]];
  const seen = new Set([targetNode.value]);
  while (queue.length > 0) {
    const [currentNode, distanceFromTarget] = queue.shift()!;

    if (distanceFromTarget === k) {
      const nodesDistanceK = queue.map(pair => pair[0].value);
      nodesDistanceK.push(currentNode.value);
      return nodesDistanceK;
    }

    const connectedNodes = [currentNode.left, currentNode.right, nodesToParents[currentNode.value]];
    for (const node of connectedNodes) {
      if (node === null) continue;

      if (seen.has(node.value)) continue;

      seen.add(node.value);
      queue.push([node, distanceFromTarget + 1]);
    }
  }

  return [];
}

function getNodeFromValue(value: number, tree: BinaryTree, nodesToParents: NodesToParents) {
  if (tree.value === value) return tree;

  const nodeParent = nodesToParents[value]!;
  if (nodeParent.left !== null && nodeParent.left.value === value) return nodeParent.left;

  return nodeParent.right!;
}

function populateNodesToParents(
  node: BinaryTree | null,
  nodesToParents: NodesToParents,
  parent: BinaryTree | null = null,
) {
  if (node !== null) {
    nodesToParents[node.value] = parent;
    populateNodesToParents(node.left, nodesToParents, node);
    populateNodesToParents(node.right, nodesToParents, node);
  }
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

// O(n) time | O(n) space - where n is the number of nodes in the tree
export function findNodesDistanceK(tree: BinaryTree, target: number, k: number) {
  const nodesDistanceK: number[] = [];
  findDistanceFromNodeToTarget(tree, target, k, nodesDistanceK);
  return nodesDistanceK;
}

function findDistanceFromNodeToTarget(
  node: BinaryTree | null,
  target: number,
  k: number,
  nodesDistanceK: number[],
): number {
  if (node === null) return -1;

  if (node.value === target) {
    addSubtreeNodeAtDistanceK(node, 0, k, nodesDistanceK);
    return 1;
  }

  const leftDistance = findDistanceFromNodeToTarget(node.left, target, k, nodesDistanceK);
  const rightDistance = findDistanceFromNodeToTarget(node.right, target, k, nodesDistanceK);

  if (leftDistance === k || rightDistance === k) nodesDistanceK.push(node.value);

  if (leftDistance !== -1) {
    addSubtreeNodeAtDistanceK(node.right, leftDistance + 1, k, nodesDistanceK);
    return leftDistance + 1;
  }

  if (rightDistance !== -1) {
    addSubtreeNodeAtDistanceK(node.left, rightDistance + 1, k, nodesDistanceK);
    return rightDistance + 1;
  }

  return -1;
}

function addSubtreeNodeAtDistanceK(node: BinaryTree | null, distance: number, k: number, nodesDistanceK: number[]) {
  if (node === null) return;

  if (distance === k) nodesDistanceK.push(node.value);
  else {
    addSubtreeNodeAtDistanceK(node.left, distance + 1, k, nodesDistanceK);
    addSubtreeNodeAtDistanceK(node.right, distance + 1, k, nodesDistanceK);
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const root = new program.BinaryTree(1);
  root.left = new program.BinaryTree(2);
  root.right = new program.BinaryTree(3);
  root.left.left = new program.BinaryTree(4);
  root.left.right = new program.BinaryTree(5);
  root.right.right = new program.BinaryTree(6);
  root.right.right.left = new program.BinaryTree(7);
  root.right.right.right = new program.BinaryTree(8);
  const target = 3;
  const k = 2;
  const expected = [2, 7, 8];
  const actual = program.findNodesDistanceK(root, target, k);
  actual.sort();
  chai.expect(actual).to.deep.equal(expected);
});

```

