# Reconstruct BST
<div class="html">
<p>
  The pre-order traversal of a Binary Tree is a traversal technique that starts
  at the tree's root node and visits nodes in the following order:
</p>
<ol>
  <li>Current node</li>
  <li>Left subtree</li>
  <li>Right subtree</li>
</ol>
<p>
  Given a non-empty array of integers representing the pre-order traversal of a
  Binary Search Tree (BST), write a function that creates the relevant BST and
  returns its root node.
</p>
<p>
  The input array will contain the values of BST nodes in the order in which
  these nodes would be visited with a pre-order traversal.
</p>
<p>
  Each <span>BST</span> node has an integer <span>value</span>, a
  <span>left</span> child node, and a <span>right</span> child node. A node is
  said to be a valid <span>BST</span> node if and only if it satisfies the BST
  property: its <span>value</span> is strictly greater than the values of every
  node to its left; its <span>value</span> is less than or equal to the values
  of every node to its right; and its children nodes are either valid
  <span>BST</span> nodes themselves or <span>None</span> / <span>null</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">preOrderTraversalValues</span> = [10, 4, 2, 1, 5, 17, 19, 18]
</pre>
<h3>Sample Output</h3>
<pre>
        10 
      /    \
     4      17
   /   \      \
  2     5     19
 /           /
1           18 
</pre>
</div>

Hint 1
<p>
  Think about the properties of a BST. Looking at the pre-order-traversal nodes
  (values), how can you determine the right child of a particular node?
</p>


Hint 2

<p>
  The right child of any BST node is simply the first node in the pre-order
  traversal whose value is larger than or equal to the particular node's value.
  From this, we know that the nodes in the pre-order traversal that come before
  the right child of a node must be in the left subtree of that node.
</p>


Hint 3

<p>
  Once you determine the right child of any given node, you're able to generate
  the entire left and right subtrees of that node. You can do so by recursively
  creating the left and right child nodes of each subsequent node using the fact
  stated in Hint #2. A node that has no left and right children is naturally a
  leaf node.
</p>


Hint 4

<p>
  To solve this problem with an optimal time complexity, you need to realize
  that it's unnecessary to locate the right child of every node. You can simply
  keep track of the pre-order-traversal position of the current node that needs
  to be created and try to insert that node as the left or right child of the
  relevant previously visited node. Since this tree is a BST, every node must
  satisfy the BST property; by somehow keeping track of lower and upper bounds
  for node values, you should be able to determine if a node can be inserted as
  the left or right child of another node. With this approach, you can solve
  this problem in linear time. See this question's video explanation for a more
  detailed explanation of this approach.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

vector<int> getDfsOrder(BST *node, vector<int> &values) {
  values.push_back(node->value);
  if (node->left != nullptr) {
    getDfsOrder(node->left, values);
  }
  if (node->right != nullptr) {
    getDfsOrder(node->right, values);
  }
  return values;
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> preOrderTraversalValues = {10, 4, 2, 1, 3, 17, 19, 18};

      auto tree = new BST(10);
      tree->left = new BST(4);
      tree->left->left = new BST(2);
      tree->left->left->left = new BST(1);
      tree->left->right = new BST(3);
      tree->right = new BST(17);
      tree->right->right = new BST(19);
      tree->right->right->left = new BST(18);

      vector<int> v1;
      auto expected = getDfsOrder(tree, v1);

      auto actual = reconstructBst(preOrderTraversalValues);

      vector<int> v2;
      auto actualDfsOrder = getDfsOrder(actual, v2);

      assert(expected == actualDfsOrder);
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
class BST {
public:
  int value;
  BST *left = nullptr;
  BST *right = nullptr;

  BST(int value) { this->value = value; }
};

// O(n^2) time | O(n) space - where n is the length of the input array
BST *reconstructBst(vector<int> preOrderTraversalValues) {
  if (preOrderTraversalValues.size() == 0)
    return nullptr;

  int currentValue = preOrderTraversalValues[0];
  int rightSubtreeRootIdx = preOrderTraversalValues.size();

  for (int idx = 1; idx < preOrderTraversalValues.size(); idx++) {
    int value = preOrderTraversalValues[idx];
    if (value >= currentValue) {
      rightSubtreeRootIdx = idx;
      break;
    }
  }

  auto leftSubtree = reconstructBst(
      vector<int>(preOrderTraversalValues.begin() + 1,
                  preOrderTraversalValues.begin() + rightSubtreeRootIdx));
  auto rightSubtree = reconstructBst(
      vector<int>(preOrderTraversalValues.begin() + rightSubtreeRootIdx,
                  preOrderTraversalValues.end()));

  auto bst = new BST(currentValue);
  bst->left = leftSubtree;
  bst->right = rightSubtree;
  return bst;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <limits>
using namespace std;

// This is an input class. Do not edit.
class BST {
public:
  int value;
  BST *left = nullptr;
  BST *right = nullptr;

  BST(int value) { this->value = value; }
};

struct TreeInfo {
  int rootIdx;
};

BST *reconstructBstFromRange(int lowerBound, int upperBound,
                             vector<int> &preOrderTraversalValues,
                             TreeInfo &currentSubtreeInfo);

// O(n) time | O(n) space - where n is the length of the input array
BST *reconstructBst(vector<int> preOrderTraversalValues) {
  auto treeInfo = TreeInfo{0};
  return reconstructBstFromRange(numeric_limits<int>::min(),
                                 numeric_limits<int>::max(),
                                 preOrderTraversalValues, treeInfo);
}

BST *reconstructBstFromRange(int lowerBound, int upperBound,
                             vector<int> &preOrderTraversalValues,
                             TreeInfo &currentSubtreeInfo) {
  if (currentSubtreeInfo.rootIdx == preOrderTraversalValues.size())
    return nullptr;

  int rootValue = preOrderTraversalValues[currentSubtreeInfo.rootIdx];
  if (rootValue < lowerBound || rootValue >= upperBound)
    return nullptr;

  currentSubtreeInfo.rootIdx++;
  auto leftSubtree = reconstructBstFromRange(
      lowerBound, rootValue, preOrderTraversalValues, currentSubtreeInfo);
  auto rightSubtree = reconstructBstFromRange(
      rootValue, upperBound, preOrderTraversalValues, currentSubtreeInfo);
  auto bst = new BST(rootValue);
  bst->left = leftSubtree;
  bst->right = rightSubtree;
  return bst;
}

```
### Unit Tests 1 (cpp)
```cpp
vector<int> getDfsOrder(BST *node, vector<int> &values) {
  values.push_back(node->value);
  if (node->left != nullptr) {
    getDfsOrder(node->left, values);
  }
  if (node->right != nullptr) {
    getDfsOrder(node->right, values);
  }
  return values;
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> preOrderTraversalValues = {10, 4, 2, 1, 3, 17, 19, 18};

      auto tree = new BST(10);
      tree->left = new BST(4);
      tree->left->left = new BST(2);
      tree->left->left->left = new BST(1);
      tree->left->right = new BST(3);
      tree->right = new BST(17);
      tree->right->right = new BST(19);
      tree->right->right->left = new BST(18);

      vector<int> v1;
      auto expected = getDfsOrder(tree, v1);

      auto actual = reconstructBst(preOrderTraversalValues);

      vector<int> v2;
      auto actualDfsOrder = getDfsOrder(actual, v2);

      assert(expected == actualDfsOrder);
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

	public List<int> getDfsOrder(Program.BST node, List<int> values) {
		values.Add(node.value);
		if (node.left != null) {
			getDfsOrder(node.left, values);
		}
		if (node.right != null) {
			getDfsOrder(node.right, values);
		}
		return values;
	}

	[Test]
	public void TestCase1() {
		List<int> preOrderTraversalValues = new List<int> {
			10, 4, 2, 1, 3, 17, 19, 18
		};
		Program.BST tree = new Program.BST(10);
		tree.left = new Program.BST(4);
		tree.left.left = new Program.BST(2);
		tree.left.left.left = new Program.BST(1);
		tree.left.right = new Program.BST(3);
		tree.right = new Program.BST(17);
		tree.right.right = new Program.BST(19);
		tree.right.right.left = new Program.BST(18);
		List<int> expected = getDfsOrder(tree, new List<int>());
		var actual = new Program().ReconstructBst(preOrderTraversalValues);
		List<int> actualValues = getDfsOrder(actual, new List<int>());
		Utils.AssertTrue(Enumerable.SequenceEqual(expected, actualValues));
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
	public class BST {
		public int value;
		public BST left = null;
		public BST right = null;

		public BST(int value) {
			this.value = value;
		}
	}

	// O(n^2) time | O(n) space - where n is the length of the input array
	public BST ReconstructBst(List<int> preOrderTraversalValues) {

		if (preOrderTraversalValues.Count == 0) {
			return null;
		}

		int currentValue = preOrderTraversalValues[0];
		int rightSubtreeRootIdx = preOrderTraversalValues.Count;

		for (int idx = 1; idx < preOrderTraversalValues.Count; idx++) {
			int value = preOrderTraversalValues[idx];
			if (value >= currentValue) {
				rightSubtreeRootIdx = idx;
				break;
			}
		}

		BST leftSubtree =
		  ReconstructBst(preOrderTraversalValues.GetRange(1, rightSubtreeRootIdx-1));
		BST rightSubtree = ReconstructBst(
			preOrderTraversalValues.GetRange(rightSubtreeRootIdx,
			preOrderTraversalValues.Count-rightSubtreeRootIdx));

		BST bst = new BST(currentValue);
		bst.left = leftSubtree;
		bst.right = rightSubtree;

		return bst;
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
	public class BST {
		public int value;
		public BST left = null;
		public BST right = null;

		public BST(int value) {
			this.value = value;
		}
	}

	public class TreeInfo {
		public int rootIdx;

		public TreeInfo(int rootIdx) {
			this.rootIdx = rootIdx;
		}
	}

	// O(n) time | O(n) space - where n is the length of the input array
	public BST ReconstructBst(List<int> preOrderTraversalValues) {
		TreeInfo treeInfo = new TreeInfo(0);
		return ReconstructBstFromRange(Int32.MinValue, Int32.MaxValue,
		         preOrderTraversalValues, treeInfo);
	}

	public BST ReconstructBstFromRange(int lowerBound, int upperBound,
	  List<int> preOrderTraversalValues,
	  TreeInfo currentSubtreeInfo) {
		if (currentSubtreeInfo.rootIdx == preOrderTraversalValues.Count) {
			return null;
		}

		int rootValue = preOrderTraversalValues[currentSubtreeInfo.rootIdx];
		if (rootValue < lowerBound || rootValue >= upperBound) {
			return null;
		}

		currentSubtreeInfo.rootIdx += 1;
		BST leftSubtree = ReconstructBstFromRange(lowerBound, rootValue,
		    preOrderTraversalValues,
		    currentSubtreeInfo);
		BST rightSubtree = ReconstructBstFromRange(rootValue, upperBound,
		    preOrderTraversalValues,
		    currentSubtreeInfo);

		BST bst = new BST(rootValue);
		bst.left = leftSubtree;
		bst.right = rightSubtree;
		return bst;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;
using System.Linq;
using System;


public class ProgramTest {

	public List<int> getDfsOrder(Program.BST node, List<int> values) {
		values.Add(node.value);
		if (node.left != null) {
			getDfsOrder(node.left, values);
		}
		if (node.right != null) {
			getDfsOrder(node.right, values);
		}
		return values;
	}

	[Test]
	public void TestCase1() {
		List<int> preOrderTraversalValues = new List<int> {
			10, 4, 2, 1, 3, 17, 19, 18
		};
		Program.BST tree = new Program.BST(10);
		tree.left = new Program.BST(4);
		tree.left.left = new Program.BST(2);
		tree.left.left.left = new Program.BST(1);
		tree.left.right = new Program.BST(3);
		tree.right = new Program.BST(17);
		tree.right.right = new Program.BST(19);
		tree.right.right.left = new Program.BST(18);
		List<int> expected = getDfsOrder(tree, new List<int>());
		var actual = new Program().ReconstructBst(preOrderTraversalValues);
		List<int> actualValues = getDfsOrder(actual, new List<int>());
		Utils.AssertTrue(Enumerable.SequenceEqual(expected, actualValues));
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

func getDfsOrder(node *BST, values []int) []int {
	if node == nil {
		return nil
	}
	values = append(values, node.Value)
	getDfsOrder(node.Left, values)
	getDfsOrder(node.Right, values)
	return values
}

func (s *TestSuite) TestCase1(t *TestCase) {
	preOrderTraversalValues := []int{10, 4, 2, 1, 3, 17, 19, 18}
	tree := &BST{Value: 10}
	tree.Left = &BST{Value: 4}
	tree.Left.Left = &BST{Value: 2}
	tree.Left.Left.Left = &BST{Value: 1}
	tree.Left.Right = &BST{Value: 3}
	tree.Right = &BST{Value: 17}
	tree.Right.Right = &BST{Value: 19}
	tree.Right.Right.Left = &BST{Value: 18}
	expected := getDfsOrder(tree, nil)
	actual := ReconstructBst(preOrderTraversalValues)
	actualOrder := getDfsOrder(actual, nil)
	require.Equal(t, expected, actualOrder)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// This is an input class. Do not edit.
type BST struct {
	Value int

	Left  *BST
	Right *BST
}

// O(n^2) time | O(n) space - where n is the length of the input array
func ReconstructBst(preOrderTraversalValues []int) *BST {
	if len(preOrderTraversalValues) == 0 {
		return nil
	}

	currentValue := preOrderTraversalValues[0]
	rightSubtreeRootIdx := len(preOrderTraversalValues)

	for idx := 1; idx < len(preOrderTraversalValues); idx++ {
		value := preOrderTraversalValues[idx]
		if value >= currentValue {
			rightSubtreeRootIdx = idx
			break
		}
	}

	leftSubtree := ReconstructBst(preOrderTraversalValues[1:rightSubtreeRootIdx])
	rightSubtree := ReconstructBst(preOrderTraversalValues[rightSubtreeRootIdx:])
	return &BST{Value: currentValue, Left: leftSubtree, Right: rightSubtree}
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"math"
)

// This is an input class. Do not edit.
type BST struct {
	Value int

	Left  *BST
	Right *BST
}

type treeInfo struct {
	rootIdx int
}

// O(n) time | O(n) space - where n is the length of the input array
func ReconstructBst(preOrderTraversalValues []int) *BST {
	treeInfo := &treeInfo{rootIdx: 0}
	return reconstructBstFromRange(
		math.MinInt32,
		math.MaxInt32,
		preOrderTraversalValues,
		treeInfo,
	)
}

func reconstructBstFromRange(lowerBound, upperBound int, preOrderTraversalValues []int, currentSubtreeInfo *treeInfo) *BST {
	if currentSubtreeInfo.rootIdx == len(preOrderTraversalValues) {
		return nil
	}

	rootValue := preOrderTraversalValues[currentSubtreeInfo.rootIdx]
	if rootValue < lowerBound || rootValue >= upperBound {
		return nil
	}

	currentSubtreeInfo.rootIdx += 1
	leftSubtree := reconstructBstFromRange(
		lowerBound,
		rootValue,
		preOrderTraversalValues,
		currentSubtreeInfo,
	)
	rightSubtree := reconstructBstFromRange(
		rootValue,
		upperBound,
		preOrderTraversalValues,
		currentSubtreeInfo,
	)
	return &BST{Value: rootValue, Left: leftSubtree, Right: rightSubtree}
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func getDfsOrder(node *BST, values []int) []int {
	if node == nil {
		return nil
	}
	values = append(values, node.Value)
	getDfsOrder(node.Left, values)
	getDfsOrder(node.Right, values)
	return values
}

func (s *TestSuite) TestCase1(t *TestCase) {
	preOrderTraversalValues := []int{10, 4, 2, 1, 3, 17, 19, 18}
	tree := &BST{Value: 10}
	tree.Left = &BST{Value: 4}
	tree.Left.Left = &BST{Value: 2}
	tree.Left.Left.Left = &BST{Value: 1}
	tree.Left.Right = &BST{Value: 3}
	tree.Right = &BST{Value: 17}
	tree.Right.Right = &BST{Value: 19}
	tree.Right.Right.Left = &BST{Value: 18}
	expected := getDfsOrder(tree, nil)
	actual := ReconstructBst(preOrderTraversalValues)
	actualOrder := getDfsOrder(actual, nil)
	require.Equal(t, expected, actualOrder)
}

```
### Sandbox Code (java)
```java
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import java.util.*;

class ProgramTest {

  public List<Integer> getDfsOrder(Program.BST node, List<Integer> values) {
    values.add(node.value);
    if (node.left != null) {
      getDfsOrder(node.left, values);
    }
    if (node.right != null) {
      getDfsOrder(node.right, values);
    }
    return values;
  }

  @Test
  public void TestCase1() {
    List<Integer> preOrderTraversalValues =
        new ArrayList<Integer>(Arrays.asList(10, 4, 2, 1, 3, 17, 19, 18));
    Program.BST tree = new Program.BST(10);
    tree.left = new Program.BST(4);
    tree.left.left = new Program.BST(2);
    tree.left.left.left = new Program.BST(1);
    tree.left.right = new Program.BST(3);
    tree.right = new Program.BST(17);
    tree.right.right = new Program.BST(19);
    tree.right.right.left = new Program.BST(18);
    List<Integer> expected = getDfsOrder(tree, new ArrayList<Integer>());
    var actual = new Program().reconstructBst(preOrderTraversalValues);
    List<Integer> actualValues = getDfsOrder(actual, new ArrayList<Integer>());
    Utils.assertTrue(expected.equals(actualValues));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // This is an input class. Do not edit.
  static class BST {
    public int value;
    public BST left = null;
    public BST right = null;

    public BST(int value) {
      this.value = value;
    }
  }

  // O(n^2) time | O(n) space - where n is the length of the input array
  public BST reconstructBst(List<Integer> preOrderTraversalValues) {

    if (preOrderTraversalValues.size() == 0) {
      return null;
    }

    int currentValue = preOrderTraversalValues.get(0);
    int rightSubtreeRootIdx = preOrderTraversalValues.size();

    for (int idx = 1; idx < preOrderTraversalValues.size(); idx++) {
      int value = preOrderTraversalValues.get(idx);
      if (value >= currentValue) {
        rightSubtreeRootIdx = idx;
        break;
      }
    }

    BST leftSubtree = reconstructBst(preOrderTraversalValues.subList(1, rightSubtreeRootIdx));
    BST rightSubtree =
        reconstructBst(
            preOrderTraversalValues.subList(rightSubtreeRootIdx, preOrderTraversalValues.size()));

    BST bst = new BST(currentValue);
    bst.left = leftSubtree;
    bst.right = rightSubtree;

    return bst;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // This is an input class. Do not edit.
  static class BST {
    public int value;
    public BST left = null;
    public BST right = null;

    public BST(int value) {
      this.value = value;
    }
  }

  static class TreeInfo {
    public int rootIdx;

    public TreeInfo(int rootIdx) {
      this.rootIdx = rootIdx;
    }
  }

  // O(n) time | O(n) space - where n is the length of the input array
  public BST reconstructBst(List<Integer> preOrderTraversalValues) {
    TreeInfo treeInfo = new TreeInfo(0);
    return reconstructBstFromRange(
        Integer.MIN_VALUE, Integer.MAX_VALUE, preOrderTraversalValues, treeInfo);
  }

  public BST reconstructBstFromRange(
      int lowerBound,
      int upperBound,
      List<Integer> preOrderTraversalValues,
      TreeInfo currentSubtreeInfo) {
    if (currentSubtreeInfo.rootIdx == preOrderTraversalValues.size()) {
      return null;
    }

    int rootValue = preOrderTraversalValues.get(currentSubtreeInfo.rootIdx);
    if (rootValue < lowerBound || rootValue >= upperBound) {
      return null;
    }

    currentSubtreeInfo.rootIdx += 1;
    BST leftSubtree =
        reconstructBstFromRange(lowerBound, rootValue, preOrderTraversalValues, currentSubtreeInfo);
    BST rightSubtree =
        reconstructBstFromRange(rootValue, upperBound, preOrderTraversalValues, currentSubtreeInfo);

    BST bst = new BST(rootValue);
    bst.left = leftSubtree;
    bst.right = rightSubtree;
    return bst;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {

  public List<Integer> getDfsOrder(Program.BST node, List<Integer> values) {
    values.add(node.value);
    if (node.left != null) {
      getDfsOrder(node.left, values);
    }
    if (node.right != null) {
      getDfsOrder(node.right, values);
    }
    return values;
  }

  @Test
  public void TestCase1() {
    List<Integer> preOrderTraversalValues =
        new ArrayList<Integer>(Arrays.asList(10, 4, 2, 1, 3, 17, 19, 18));
    Program.BST tree = new Program.BST(10);
    tree.left = new Program.BST(4);
    tree.left.left = new Program.BST(2);
    tree.left.left.left = new Program.BST(1);
    tree.left.right = new Program.BST(3);
    tree.right = new Program.BST(17);
    tree.right.right = new Program.BST(19);
    tree.right.right.left = new Program.BST(18);
    List<Integer> expected = getDfsOrder(tree, new ArrayList<Integer>());
    var actual = new Program().reconstructBst(preOrderTraversalValues);
    List<Integer> actualValues = getDfsOrder(actual, new ArrayList<Integer>());
    Utils.assertTrue(expected.equals(actualValues));
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

const {BST} = program;

function getDfsOrder(node, values) {
  if (node === null) return;
  values.push(node.value);
  getDfsOrder(node.left, values);
  getDfsOrder(node.right, values);
  return values;
}

it('Test Case #1', function () {
  const preOrderTraversalValues = [10, 4, 2, 1, 3, 17, 19, 18];
  const tree = new BST(10);
  tree.left = new BST(4);
  tree.left.left = new BST(2);
  tree.left.left.left = new BST(1);
  tree.left.right = new BST(3);
  tree.right = new BST(17);
  tree.right.right = new BST(19);
  tree.right.right.left = new BST(18);
  const expected = getDfsOrder(tree, []);
  const actual = program.reconstructBst(preOrderTraversalValues);
  const actualDfsOrder = getDfsOrder(actual, []);
  chai.expect(actualDfsOrder).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// This is an input class. Do not edit.
class BST {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

// O(n^2) time | O(n) space - where n is the length of the input array
function reconstructBst(preOrderTraversalValues) {
  if (preOrderTraversalValues.length === 0) return null;

  const currentValue = preOrderTraversalValues[0];
  let rightSubtreeRootIdx = preOrderTraversalValues.length;

  for (let idx = 1; idx < preOrderTraversalValues.length; idx++) {
    const value = preOrderTraversalValues[idx];
    if (value >= currentValue) {
      rightSubtreeRootIdx = idx;
      break;
    }
  }

  const leftSubtree = reconstructBst(preOrderTraversalValues.slice(1, rightSubtreeRootIdx));
  const rightSubtree = reconstructBst(preOrderTraversalValues.slice(rightSubtreeRootIdx));
  return new BST(currentValue, leftSubtree, rightSubtree);
}

// Do not edit the lines below.
exports.BST = BST;
exports.reconstructBst = reconstructBst;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// This is an input class. Do not edit.
class BST {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class TreeInfo {
  constructor(rootIdx) {
    this.rootIdx = rootIdx;
  }
}

// O(n) time | O(n) space - where n is the length of the input array
function reconstructBst(preOrderTraversalValues) {
  const treeInfo = new TreeInfo(0);
  return reconstructBstFromRange(-Infinity, Infinity, preOrderTraversalValues, treeInfo);
}

function reconstructBstFromRange(lowerBound, upperBound, preOrderTraversalValues, currentSubtreeInfo) {
  if (currentSubtreeInfo.rootIdx === preOrderTraversalValues.length) return null;

  const rootValue = preOrderTraversalValues[currentSubtreeInfo.rootIdx];
  if (rootValue < lowerBound || rootValue >= upperBound) return null;

  currentSubtreeInfo.rootIdx++;
  const leftSubtree = reconstructBstFromRange(lowerBound, rootValue, preOrderTraversalValues, currentSubtreeInfo);
  const rightSubtree = reconstructBstFromRange(rootValue, upperBound, preOrderTraversalValues, currentSubtreeInfo);
  return new BST(rootValue, leftSubtree, rightSubtree);
}

// Do not edit the lines below.
exports.BST = BST;
exports.reconstructBst = reconstructBst;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

const {BST} = program;

function getDfsOrder(node, values) {
  if (node === null) return;
  values.push(node.value);
  getDfsOrder(node.left, values);
  getDfsOrder(node.right, values);
  return values;
}

it('Test Case #1', function () {
  const preOrderTraversalValues = [10, 4, 2, 1, 3, 17, 19, 18];
  const tree = new BST(10);
  tree.left = new BST(4);
  tree.left.left = new BST(2);
  tree.left.left.left = new BST(1);
  tree.left.right = new BST(3);
  tree.right = new BST(17);
  tree.right.right = new BST(19);
  tree.right.right.left = new BST(18);
  const expected = getDfsOrder(tree, []);
  const actual = program.reconstructBst(preOrderTraversalValues);
  const actualDfsOrder = getDfsOrder(actual, []);
  chai.expect(actualDfsOrder).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.BST
import com.algoexpert.program.reconstructBst

fun getDfsOrder(node: BST?, values: MutableList<Int>): List<Int> {
    if (node == null) return listOf()
    values.add(node.value)
    getDfsOrder(node.left, values)
    getDfsOrder(node.right, values)
    return values
}

class ProgramTest {
    @Test
    fun TestCase1() {
        val preOrderTraversalValues = listOf(10, 4, 2, 1, 3, 17, 19, 18)
        val tree = BST(10)
        tree.left = BST(4)
        tree.left!!.left = BST(2)
        tree.left!!.left!!.left = BST(1)
        tree.left!!.right = BST(3)
        tree.right = BST(17)
        tree.right!!.right = BST(19)
        tree.right!!.right!!.left = BST(18)
        val expected = getDfsOrder(tree, mutableListOf<Int>())
        val output = reconstructBst(preOrderTraversalValues)
        val outputDfsOrder = getDfsOrder(output, mutableListOf<Int>())
        assert(expected == outputDfsOrder)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// This is an input class. Do not edit.
open class BST(value: Int, left: BST? = null, right: BST? = null) {
    var value = value
    var left = left
    var right = right
}

// O(n^2) time | O(n) space - where n is the length of the input array
fun reconstructBst(preOrderTraversalValues: List<Int>): BST? {
    if (preOrderTraversalValues.size == 0) return null

    val currentValue = preOrderTraversalValues[0]
    var rightSubtreeRootIdx = preOrderTraversalValues.size

    for (idx in 1 until preOrderTraversalValues.size) {
        val value = preOrderTraversalValues[idx]
        if (value >= currentValue) {
            rightSubtreeRootIdx = idx
            break
        }
    }

    val leftSubtree = reconstructBst(
        preOrderTraversalValues.subList(1, rightSubtreeRootIdx)
    )
    val rightSubtree = reconstructBst(
        preOrderTraversalValues.subList(rightSubtreeRootIdx, preOrderTraversalValues.size)
    )
    return BST(currentValue, leftSubtree, rightSubtree)
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// This is an input class. Do not edit.
open class BST(value: Int, left: BST? = null, right: BST? = null) {
    var value = value
    var left = left
    var right = right
}

open class TreeInfo(rootIdx: Int) {
    var rootIdx = rootIdx
}

// O(n) time | O(n) space - where n is the length of the input array
fun reconstructBst(preOrderTraversalValues: List<Int>): BST? {
    val treeInfo = TreeInfo(0)
    return reconstructBstFromRange(
        Int.MIN_VALUE,
        Int.MAX_VALUE,
        preOrderTraversalValues,
        treeInfo
    )
}

fun reconstructBstFromRange(
    lowerBound: Int,
    upperBound: Int,
    preOrderTraversalValues: List<Int>,
    currentSubtreeInfo: TreeInfo
): BST? {
    if (currentSubtreeInfo.rootIdx == preOrderTraversalValues.size) return null

    val rootValue = preOrderTraversalValues[currentSubtreeInfo.rootIdx]
    if (rootValue < lowerBound || rootValue >= upperBound) return null

    currentSubtreeInfo.rootIdx += 1
    val leftSubtree = reconstructBstFromRange(
        lowerBound,
        rootValue,
        preOrderTraversalValues,
        currentSubtreeInfo
    )
    val rightSubtree = reconstructBstFromRange(
        rootValue,
        upperBound,
        preOrderTraversalValues,
        currentSubtreeInfo
    )
    return BST(rootValue, leftSubtree, rightSubtree)
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.BST
import com.algoexpert.program.reconstructBst

fun getDfsOrder(node: BST?, values: MutableList<Int>): List<Int> {
    if (node == null) return listOf()
    values.add(node.value)
    getDfsOrder(node.left, values)
    getDfsOrder(node.right, values)
    return values
}

class ProgramTest {
    @Test
    fun TestCase1() {
        val preOrderTraversalValues = listOf(10, 4, 2, 1, 3, 17, 19, 18)
        val tree = BST(10)
        tree.left = BST(4)
        tree.left!!.left = BST(2)
        tree.left!!.left!!.left = BST(1)
        tree.left!!.right = BST(3)
        tree.right = BST(17)
        tree.right!!.right = BST(19)
        tree.right!!.right!!.left = BST(18)
        val expected = getDfsOrder(tree, mutableListOf<Int>())
        val output = reconstructBst(preOrderTraversalValues)
        val outputDfsOrder = getDfsOrder(output, mutableListOf<Int>())
        assert(expected == outputDfsOrder)
    }
}

```
### Sandbox Code (swift)
```swift
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!


func getDfsOrder(_ node: Program.BST?, _ values: inout [Int]) -> [Int] {
  if node == nil {
    return [Int]()
  }
  values.append(node!.value)
  getDfsOrder(node!.left, &values)
  getDfsOrder(node!.right, &values)
  return values
}

class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let preOrderTraversalValues = [10, 4, 2, 1, 3, 17, 19, 18]
      var tree = Program.BST(value: 10)
      tree.left = Program.BST(value: 4)
      tree.left!.left = Program.BST(value: 2)
      tree.left!.left!.left = Program.BST(value: 1)
      tree.left!.right = Program.BST(value: 3)
      tree.right = Program.BST(value: 17)
      tree.right!.right = Program.BST(value: 19)
      tree.right!.right!.left = Program.BST(value: 18)
      var valuesExpected = [Int]()
      let expected = getDfsOrder(tree, &valuesExpected)
      let output = Program().reconstructBst(preOrderTraversalValues)
      var valuesOutput = [Int]()
      let outputDfsOrder = getDfsOrder(output, &valuesOutput)
      try assertEqual(expected, outputDfsOrder)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // This is an input class. Do not edit.
  class BST {
    var value: Int
    var left: BST?
    var right: BST?

    init(value: Int) {
      self.value = value
      left = nil
      right = nil
    }
  }

  // O(n^2) time | O(n) space - where n is the length of the input array
  func reconstructBst(_ preOrderTraversalValues: [Int]) -> BST? {
    if preOrderTraversalValues.count == 0 {
      return nil
    }

    let currentValue = preOrderTraversalValues[0]
    var rightSubtreeRootIdx = preOrderTraversalValues.count

    for idx in stride(from: 1, to: preOrderTraversalValues.count, by: 1) {
      let value = preOrderTraversalValues[idx]
      if value >= currentValue {
        rightSubtreeRootIdx = idx
        break
      }
    }

    let leftSubtree = reconstructBst(Array(preOrderTraversalValues[1 ..< rightSubtreeRootIdx]))
    let rightSubtree = reconstructBst(Array(preOrderTraversalValues[rightSubtreeRootIdx...]))
    var bst = BST(value: currentValue)
    bst.left = leftSubtree
    bst.right = rightSubtree
    return bst
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // This is an input class. Do not edit.
  class BST {
    var value: Int
    var left: BST?
    var right: BST?

    init(value: Int) {
      self.value = value
      left = nil
      right = nil
    }
  }

  // O(n) time | O(n) space - where n is the length of the input array
  func reconstructBst(_ preOrderTraversalValues: [Int]) -> BST? {
    var rootIdx = 0
    return reconstructBstFromRange(
      Int.min,
      Int.max,
      preOrderTraversalValues,
      &rootIdx
    )
  }

  func reconstructBstFromRange(_ lowerBound: Int, _ upperBound: Int, _ preOrderTraversalValues: [Int], _ currentRootIdx: inout Int) -> BST? {
    if currentRootIdx == preOrderTraversalValues.count {
      return nil
    }

    let rootValue = preOrderTraversalValues[currentRootIdx]
    if rootValue < lowerBound || rootValue >= upperBound {
      return nil
    }

    currentRootIdx += 1
    let leftSubtree = reconstructBstFromRange(
      lowerBound,
      rootValue,
      preOrderTraversalValues,
      &currentRootIdx
    )
    let rightSubtree = reconstructBstFromRange(
      rootValue,
      upperBound,
      preOrderTraversalValues,
      &currentRootIdx
    )
    var bst = BST(value: rootValue)
    bst.left = leftSubtree
    bst.right = rightSubtree
    return bst
  }
}

```
### Unit Tests 1 (swift)
```swift

func getDfsOrder(_ node: Program.BST?, _ values: inout [Int]) -> [Int] {
  if node == nil {
    return [Int]()
  }
  values.append(node!.value)
  getDfsOrder(node!.left, &values)
  getDfsOrder(node!.right, &values)
  return values
}

class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let preOrderTraversalValues = [10, 4, 2, 1, 3, 17, 19, 18]
      var tree = Program.BST(value: 10)
      tree.left = Program.BST(value: 4)
      tree.left!.left = Program.BST(value: 2)
      tree.left!.left!.left = Program.BST(value: 1)
      tree.left!.right = Program.BST(value: 3)
      tree.right = Program.BST(value: 17)
      tree.right!.right = Program.BST(value: 19)
      tree.right!.right!.left = Program.BST(value: 18)
      var valuesExpected = [Int]()
      let expected = getDfsOrder(tree, &valuesExpected)
      let output = Program().reconstructBst(preOrderTraversalValues)
      var valuesOutput = [Int]()
      let outputDfsOrder = getDfsOrder(output, &valuesOutput)
      try assertEqual(expected, outputDfsOrder)
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


BST = program.BST


def getDfsOrder(node, values):
    if node is None:
        return
    values.append(node.value)
    getDfsOrder(node.left, values)
    getDfsOrder(node.right, values)
    return values


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        preOrderTraversalValues = [10, 4, 2, 1, 3, 17, 19, 18]
        tree = BST(10)
        tree.left = BST(4)
        tree.left.left = BST(2)
        tree.left.left.left = BST(1)
        tree.left.right = BST(3)
        tree.right = BST(17)
        tree.right.right = BST(19)
        tree.right.right.left = BST(18)
        expected = getDfsOrder(tree, [])
        actual = program.reconstructBst(preOrderTraversalValues)
        actualDfsOrder = getDfsOrder(actual, [])
        self.assertEqual(actualDfsOrder, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# This is an input class. Do not edit.
class BST:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right


# O(n^2) time | O(n) space - where n is the length of the input array
def reconstructBst(preOrderTraversalValues):
    if len(preOrderTraversalValues) == 0:
        return None

    currentValue = preOrderTraversalValues[0]
    rightSubtreeRootIdx = len(preOrderTraversalValues)

    for idx in range(1, len(preOrderTraversalValues)):
        value = preOrderTraversalValues[idx]
        if value >= currentValue:
            rightSubtreeRootIdx = idx
            break

    leftSubtree = reconstructBst(preOrderTraversalValues[1:rightSubtreeRootIdx])
    rightSubtree = reconstructBst(preOrderTraversalValues[rightSubtreeRootIdx:])
    return BST(currentValue, leftSubtree, rightSubtree)

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# This is an input class. Do not edit.
class BST:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right


class TreeInfo:
    def __init__(self, rootIdx):
        self.rootIdx = rootIdx


# O(n) time | O(n) space - where n is the length of the input array
def reconstructBst(preOrderTraversalValues):
    treeInfo = TreeInfo(0)
    return reconstructBstFromRange(float("-inf"), float("inf"), preOrderTraversalValues, treeInfo)


def reconstructBstFromRange(lowerBound, upperBound, preOrderTraversalValues, currentSubtreeInfo):
    if currentSubtreeInfo.rootIdx == len(preOrderTraversalValues):
        return None

    rootValue = preOrderTraversalValues[currentSubtreeInfo.rootIdx]
    if rootValue < lowerBound or rootValue >= upperBound:
        return None

    currentSubtreeInfo.rootIdx += 1
    leftSubtree = reconstructBstFromRange(lowerBound, rootValue, preOrderTraversalValues, currentSubtreeInfo)
    rightSubtree = reconstructBstFromRange(rootValue, upperBound, preOrderTraversalValues, currentSubtreeInfo)
    return BST(rootValue, leftSubtree, rightSubtree)

```
### Unit Tests 1 (python)
```python
import program
import unittest


BST = program.BST


def getDfsOrder(node, values):
    if node is None:
        return
    values.append(node.value)
    getDfsOrder(node.left, values)
    getDfsOrder(node.right, values)
    return values


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        preOrderTraversalValues = [10, 4, 2, 1, 3, 17, 19, 18]
        tree = BST(10)
        tree.left = BST(4)
        tree.left.left = BST(2)
        tree.left.left.left = BST(1)
        tree.left.right = BST(3)
        tree.right = BST(17)
        tree.right.right = BST(19)
        tree.right.right.left = BST(18)
        expected = getDfsOrder(tree, [])
        actual = program.reconstructBst(preOrderTraversalValues)
        actualDfsOrder = getDfsOrder(actual, [])
        self.assertEqual(actualDfsOrder, expected)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

const {BST} = program;

function getDfsOrder(node: program.BST | null, values: number[]) {
  if (node === null) return;
  values.push(node.value);
  getDfsOrder(node.left, values);
  getDfsOrder(node.right, values);
  return values;
}

it('Test Case #1', function () {
  const preOrderTraversalValues = [10, 4, 2, 1, 3, 17, 19, 18];
  const tree = new BST(10);
  tree.left = new BST(4);
  tree.left.left = new BST(2);
  tree.left.left.left = new BST(1);
  tree.left.right = new BST(3);
  tree.right = new BST(17);
  tree.right.right = new BST(19);
  tree.right.right.left = new BST(18);
  const expected = getDfsOrder(tree, []);
  const actual = program.reconstructBst(preOrderTraversalValues);
  const actualDfsOrder = getDfsOrder(actual, []);
  chai.expect(actualDfsOrder).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// This is an input class. Do not edit.
export class BST {
  value: number;
  left: BST | null;
  right: BST | null;

  constructor(value: number, left: BST | null = null, right: BST | null = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

// O(n^2) time | O(n) space - where n is the length of the input array
export function reconstructBst(preOrderTraversalValues: number[]): BST | null {
  if (preOrderTraversalValues.length === 0) return null;

  const currentValue = preOrderTraversalValues[0];
  let rightSubtreeRootIdx = preOrderTraversalValues.length;

  for (let idx = 1; idx < preOrderTraversalValues.length; idx++) {
    const value = preOrderTraversalValues[idx];
    if (value >= currentValue) {
      rightSubtreeRootIdx = idx;
      break;
    }
  }

  const leftSubtree = reconstructBst(preOrderTraversalValues.slice(1, rightSubtreeRootIdx));
  const rightSubtree = reconstructBst(preOrderTraversalValues.slice(rightSubtreeRootIdx));
  return new BST(currentValue, leftSubtree, rightSubtree);
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// This is an input class. Do not edit.
export class BST {
  value: number;
  left: BST | null;
  right: BST | null;

  constructor(value: number, left: BST | null = null, right: BST | null = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class TreeInfo {
  rootIdx: number;

  constructor(rootIdx: number) {
    this.rootIdx = rootIdx;
  }
}

// O(n) time | O(n) space - where n is the length of the input array
export function reconstructBst(preOrderTraversalValues: number[]) {
  const treeInfo = new TreeInfo(0);
  return reconstructBstFromRange(-Infinity, Infinity, preOrderTraversalValues, treeInfo);
}

function reconstructBstFromRange(
  lowerBound: number,
  upperBound: number,
  preOrderTraversalValues: number[],
  currentSubtreeInfo: TreeInfo,
): BST | null {
  if (currentSubtreeInfo.rootIdx === preOrderTraversalValues.length) return null;

  const rootValue = preOrderTraversalValues[currentSubtreeInfo.rootIdx];
  if (rootValue < lowerBound || rootValue >= upperBound) return null;

  currentSubtreeInfo.rootIdx++;
  const leftSubtree = reconstructBstFromRange(lowerBound, rootValue, preOrderTraversalValues, currentSubtreeInfo);
  const rightSubtree = reconstructBstFromRange(rootValue, upperBound, preOrderTraversalValues, currentSubtreeInfo);
  return new BST(rootValue, leftSubtree, rightSubtree);
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

const {BST} = program;

function getDfsOrder(node: program.BST | null, values: number[]) {
  if (node === null) return;
  values.push(node.value);
  getDfsOrder(node.left, values);
  getDfsOrder(node.right, values);
  return values;
}

it('Test Case #1', function () {
  const preOrderTraversalValues = [10, 4, 2, 1, 3, 17, 19, 18];
  const tree = new BST(10);
  tree.left = new BST(4);
  tree.left.left = new BST(2);
  tree.left.left.left = new BST(1);
  tree.left.right = new BST(3);
  tree.right = new BST(17);
  tree.right.right = new BST(19);
  tree.right.right.left = new BST(18);
  const expected = getDfsOrder(tree, []);
  const actual = program.reconstructBst(preOrderTraversalValues);
  const actualDfsOrder = getDfsOrder(actual, []);
  chai.expect(actualDfsOrder).to.deep.equal(expected);
});

```

