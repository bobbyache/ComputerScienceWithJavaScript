# Find Kth Largest Value In BST
<div class="html">
<p>
  Write a function that takes in a Binary Search Tree (BST) and a positive
  integer <span>k</span> and returns the kth largest integer contained in the
  BST.
</p>
<p>
  You can assume that there will only be integer values in the BST and that
  <span>k</span> is less than or equal to the number of nodes in the tree.
</p>
<p>
  Also, for the purpose of this question, duplicate integers will be treated as
  distinct values. In other words, the second largest value in a BST containing
  values <span>{5, 7, 7}</span> will be <span>7</span>—not <span>5</span>.
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
<span class="CodeEditor-promptParameter">tree</span> =   15
       /     \
      5      20
    /   \   /   \
   2     5 17   22
 /   \         
1     3       
<span class="CodeEditor-promptParameter">k</span> = 3
</pre>
<h3>Sample Output</h3>
<pre>17</pre>
</div>

Hint 1
<p>
  Make sure to consider the fact that the given tree is a Binary Search Tree—not
  just a regular Binary Tree. How does this fact help you solve the problem in a
  more optimal time complexity?
</p>


Hint 2

<p>
  The brute-force approach to this problem is to simply perform an in-order
  traversal of this BST and to store all of its node' values in the order in
  which they're visited. Since an in-order traversal of a BST visits the nodes
  in ascending order, the <span>k</span>th value from the end of the traversal
  order will be the <span>k</span>th largest value.
</p>


Hint 3

<p>
  You can actually solve this problem in <span>O(h + k)</span> time, where
  <span>h</span> is the height of the tree. Rather than looking at the nodes in
  ascending order, you should look at them in descending order.
</p>


Hint 4

<p>
  To solve this problem in <span>O(h + k)</span> time as mentioned in Hint #3,
  you need to perform a <b>reverse</b> in-order traversal. Since you'll be
  looking at nodes in descending order, you can simply return the
  <span>k</span>th visited node in the reverse in-order traversal.
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
      auto root = new BST(15);
      root->left = new BST(5);
      root->left->left = new BST(2);
      root->left->left->left = new BST(1);
      root->left->left->right = new BST(3);
      root->left->right = new BST(5);
      root->right = new BST(20);
      root->right->left = new BST(17);
      root->right->right = new BST(22);
      int k = 3;
      int expected = 17;
      auto actual = findKthLargestValueInBst(root, k);
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
class BST {
public:
  int value;
  BST *left = nullptr;
  BST *right = nullptr;

  BST(int value) { this->value = value; }
};

void inOrderTraverse(BST *node, vector<int> &sortedNodeValues);

// O(n) time | O(n) space - where n is the number of nodes in the tree
int findKthLargestValueInBst(BST *tree, int k) {
  vector<int> sortedNodeValues;
  inOrderTraverse(tree, sortedNodeValues);
  return sortedNodeValues[sortedNodeValues.size() - k];
}

void inOrderTraverse(BST *node, vector<int> &sortedNodeValues) {
  if (node == nullptr)
    return;

  inOrderTraverse(node->left, sortedNodeValues);
  sortedNodeValues.push_back(node->value);
  inOrderTraverse(node->right, sortedNodeValues);
}

```
### Solution 2 (cpp)
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

struct TreeInfo {
  int numberOfNodesVisited;
  int latestVisitedNodeValue;
};

void reverseInOrderTraverse(BST *node, int k, TreeInfo &treeInfo);

// O(h + k) time | O(h) space - where h is the height of the tree and k is the
// input parameter
int findKthLargestValueInBst(BST *tree, int k) {
  auto treeInfo = TreeInfo{0, -1};
  reverseInOrderTraverse(tree, k, treeInfo);
  return treeInfo.latestVisitedNodeValue;
}

void reverseInOrderTraverse(BST *node, int k, TreeInfo &treeInfo) {
  if (node == nullptr || treeInfo.numberOfNodesVisited >= k)
    return;

  reverseInOrderTraverse(node->right, k, treeInfo);
  if (treeInfo.numberOfNodesVisited < k) {
    treeInfo.numberOfNodesVisited++;
    treeInfo.latestVisitedNodeValue = node->value;
    reverseInOrderTraverse(node->left, k, treeInfo);
  }
}
```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      auto root = new BST(15);
      root->left = new BST(5);
      root->left->left = new BST(2);
      root->left->left->left = new BST(1);
      root->left->left->right = new BST(3);
      root->left->right = new BST(5);
      root->right = new BST(20);
      root->right->left = new BST(17);
      root->right->right = new BST(22);
      int k = 3;
      int expected = 17;
      auto actual = findKthLargestValueInBst(root, k);
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
		Program.BST root = new Program.BST(15);
		root.left = new Program.BST(5);
		root.left.left = new Program.BST(2);
		root.left.left.left = new Program.BST(1);
		root.left.left.right = new Program.BST(3);
		root.left.right = new Program.BST(5);
		root.right = new Program.BST(20);
		root.right.left = new Program.BST(17);
		root.right.right = new Program.BST(22);
		int k = 3;
		int expected = 17;
		var actual = new Program().FindKthLargestValueInBst(root, k);
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
	public class BST {
		public int value;
		public BST left = null;
		public BST right = null;

		public BST(int value) {
			this.value = value;
		}
	}

	// O(n) time | O(n) space - where n is the number of nodes in the tree
	public int FindKthLargestValueInBst(BST tree, int k) {
		List<int> sortedNodeValues = new List<int>();
		inOrderTraverse(tree, sortedNodeValues);
		return sortedNodeValues[sortedNodeValues.Count - k];
	}

	public void inOrderTraverse(BST node, List<int> sortedNodeValues) {
		if (node == null)
			return;

		inOrderTraverse(node.left, sortedNodeValues);
		sortedNodeValues.Add(node.value);
		inOrderTraverse(node.right, sortedNodeValues);
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

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
		public int numberOfNodesVisited;
		public int latestVisitedNodeValue;

		public TreeInfo(int numberOfNodesVisited, int latestVisitedNodeValue) {
			this.numberOfNodesVisited = numberOfNodesVisited;
			this.latestVisitedNodeValue = latestVisitedNodeValue;
		}
	}

	// O(h + k) time | O(h) space - where h is the height of the tree and k is the
	// input parameter
	public int FindKthLargestValueInBst(BST tree, int k) {
		TreeInfo treeInfo = new TreeInfo(0, -1);
		reverseInOrderTraverse(tree, k, treeInfo);
		return treeInfo.latestVisitedNodeValue;
	}

	public void reverseInOrderTraverse(BST node, int k, TreeInfo treeInfo) {
		if (node == null || treeInfo.numberOfNodesVisited >= k)
			return;

		reverseInOrderTraverse(node.right, k, treeInfo);
		if (treeInfo.numberOfNodesVisited < k) {
			treeInfo.numberOfNodesVisited += 1;
			treeInfo.latestVisitedNodeValue = node.value;
			reverseInOrderTraverse(node.left, k, treeInfo);
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		Program.BST root = new Program.BST(15);
		root.left = new Program.BST(5);
		root.left.left = new Program.BST(2);
		root.left.left.left = new Program.BST(1);
		root.left.left.right = new Program.BST(3);
		root.left.right = new Program.BST(5);
		root.right = new Program.BST(20);
		root.right.left = new Program.BST(17);
		root.right.right = new Program.BST(22);
		int k = 3;
		int expected = 17;
		var actual = new Program().FindKthLargestValueInBst(root, k);
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
	root := &BST{Value: 15}
	root.Left = &BST{Value: 5}
	root.Left.Left = &BST{Value: 2}
	root.Left.Left.Left = &BST{Value: 1}
	root.Left.Left.Right = &BST{Value: 3}
	root.Left.Right = &BST{Value: 5}
	root.Right = &BST{Value: 20}
	root.Right.Left = &BST{Value: 17}
	root.Right.Right = &BST{Value: 22}
	k := 3
	expected := 17
	actual := FindKthLargestValueInBst(root, k)
	require.Equal(t, expected, actual)
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

// O(n) time | O(n) space - where n is the number of nodes in the tree
func FindKthLargestValueInBst(tree *BST, k int) int {
	sortedNodeValues := make([]int, 0)
	inOrderTraverse(tree, &sortedNodeValues)
	return sortedNodeValues[len(sortedNodeValues)-k]
}

func inOrderTraverse(node *BST, sortedNodeValues *[]int) {
	if node == nil {
		return
	}

	inOrderTraverse(node.Left, sortedNodeValues)
	*sortedNodeValues = append(*sortedNodeValues, node.Value)
	inOrderTraverse(node.Right, sortedNodeValues)
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// This is an input class. Do not edit.
type BST struct {
	Value int

	Left  *BST
	Right *BST
}

type treeInfo struct {
	numberOfNodesVisited   int
	latestVisitedNodeValue int
}

// O(h + k) time | O(h) space - where h is the height of the tree and k is the input parameter
func FindKthLargestValueInBst(tree *BST, k int) int {
	treeInfo := treeInfo{0, -1}
	reverseInOrderTraverse(tree, k, &treeInfo)
	return treeInfo.latestVisitedNodeValue
}

func reverseInOrderTraverse(node *BST, k int, treeInfo *treeInfo) {
	if node == nil || treeInfo.numberOfNodesVisited >= k {
		return
	}

	reverseInOrderTraverse(node.Right, k, treeInfo)
	if treeInfo.numberOfNodesVisited < k {
		treeInfo.numberOfNodesVisited += 1
		treeInfo.latestVisitedNodeValue = node.Value
		reverseInOrderTraverse(node.Left, k, treeInfo)
	}
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	root := &BST{Value: 15}
	root.Left = &BST{Value: 5}
	root.Left.Left = &BST{Value: 2}
	root.Left.Left.Left = &BST{Value: 1}
	root.Left.Left.Right = &BST{Value: 3}
	root.Left.Right = &BST{Value: 5}
	root.Right = &BST{Value: 20}
	root.Right.Left = &BST{Value: 17}
	root.Right.Right = &BST{Value: 22}
	k := 3
	expected := 17
	actual := FindKthLargestValueInBst(root, k)
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
    Program.BST root = new Program.BST(15);
    root.left = new Program.BST(5);
    root.left.left = new Program.BST(2);
    root.left.left.left = new Program.BST(1);
    root.left.left.right = new Program.BST(3);
    root.left.right = new Program.BST(5);
    root.right = new Program.BST(20);
    root.right.left = new Program.BST(17);
    root.right.right = new Program.BST(22);
    int k = 3;
    int expected = 17;
    var actual = new Program().findKthLargestValueInBst(root, k);
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
  static class BST {
    public int value;
    public BST left = null;
    public BST right = null;

    public BST(int value) {
      this.value = value;
    }
  }

  // O(n) time | O(n) space - where n is the number of nodes in the tree
  public int findKthLargestValueInBst(BST tree, int k) {
    ArrayList<Integer> sortedNodeValues = new ArrayList<Integer>();
    inOrderTraverse(tree, sortedNodeValues);
    return sortedNodeValues.get(sortedNodeValues.size() - k);
  }

  public void inOrderTraverse(BST node, ArrayList<Integer> sortedNodeValues) {
    if (node == null) return;

    inOrderTraverse(node.left, sortedNodeValues);
    sortedNodeValues.add(node.value);
    inOrderTraverse(node.right, sortedNodeValues);
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
    public int numberOfNodesVisited;
    public int latestVisitedNodeValue;

    public TreeInfo(int numberOfNodesVisited, int latestVisitedNodeValue) {
      this.numberOfNodesVisited = numberOfNodesVisited;
      this.latestVisitedNodeValue = latestVisitedNodeValue;
    }
  }

  // O(h + k) time | O(h) space - where h is the height of the tree and k is the
  // input parameter
  public int findKthLargestValueInBst(BST tree, int k) {
    TreeInfo treeInfo = new TreeInfo(0, -1);
    reverseInOrderTraverse(tree, k, treeInfo);
    return treeInfo.latestVisitedNodeValue;
  }

  public void reverseInOrderTraverse(BST node, int k, TreeInfo treeInfo) {
    if (node == null || treeInfo.numberOfNodesVisited >= k) return;

    reverseInOrderTraverse(node.right, k, treeInfo);
    if (treeInfo.numberOfNodesVisited < k) {
      treeInfo.numberOfNodesVisited += 1;
      treeInfo.latestVisitedNodeValue = node.value;
      reverseInOrderTraverse(node.left, k, treeInfo);
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
    Program.BST root = new Program.BST(15);
    root.left = new Program.BST(5);
    root.left.left = new Program.BST(2);
    root.left.left.left = new Program.BST(1);
    root.left.left.right = new Program.BST(3);
    root.left.right = new Program.BST(5);
    root.right = new Program.BST(20);
    root.right.left = new Program.BST(17);
    root.right.right = new Program.BST(22);
    int k = 3;
    int expected = 17;
    var actual = new Program().findKthLargestValueInBst(root, k);
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

const {BST} = program;

it('Test Case #1', function () {
  const root = new BST(15);
  root.left = new BST(5);
  root.left.left = new BST(2);
  root.left.left.left = new BST(1);
  root.left.left.right = new BST(3);
  root.left.right = new BST(5);
  root.right = new BST(20);
  root.right.left = new BST(17);
  root.right.right = new BST(22);
  const k = 3;
  const expected = 17;
  const actual = program.findKthLargestValueInBst(root, k);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// This is an input class. Do not edit.
class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// O(n) time | O(n) space - where n is the number of nodes in the tree
function findKthLargestValueInBst(tree, k) {
  const sortedNodeValues = [];
  inOrderTraverse(tree, sortedNodeValues);
  return sortedNodeValues[sortedNodeValues.length - k];
}

function inOrderTraverse(node, sortedNodeValues) {
  if (node === null) return;

  inOrderTraverse(node.left, sortedNodeValues);
  sortedNodeValues.push(node.value);
  inOrderTraverse(node.right, sortedNodeValues);
}

// Do not edit the lines below.
exports.BST = BST;
exports.findKthLargestValueInBst = findKthLargestValueInBst;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// This is an input class. Do not edit.
class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class TreeInfo {
  constructor(numberOfNodesVisited, latestVisitedNodeValue) {
    this.numberOfNodesVisited = numberOfNodesVisited;
    this.latestVisitedNodeValue = latestVisitedNodeValue;
  }
}

// O(h + k) time | O(h) space - where h is the height of the tree and k is the input parameter
function findKthLargestValueInBst(tree, k) {
  const treeInfo = new TreeInfo(0, -1);
  reverseInOrderTraverse(tree, k, treeInfo);
  return treeInfo.latestVisitedNodeValue;
}

function reverseInOrderTraverse(node, k, treeInfo) {
  if (node === null || treeInfo.numberOfNodesVisited >= k) return;

  reverseInOrderTraverse(node.right, k, treeInfo);
  if (treeInfo.numberOfNodesVisited < k) {
    treeInfo.numberOfNodesVisited++;
    treeInfo.latestVisitedNodeValue = node.value;
    reverseInOrderTraverse(node.left, k, treeInfo);
  }
}

// Do not edit the lines below.
exports.BST = BST;
exports.findKthLargestValueInBst = findKthLargestValueInBst;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

const {BST} = program;

it('Test Case #1', function () {
  const root = new BST(15);
  root.left = new BST(5);
  root.left.left = new BST(2);
  root.left.left.left = new BST(1);
  root.left.left.right = new BST(3);
  root.left.right = new BST(5);
  root.right = new BST(20);
  root.right.left = new BST(17);
  root.right.right = new BST(22);
  const k = 3;
  const expected = 17;
  const actual = program.findKthLargestValueInBst(root, k);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.BST
import com.algoexpert.program.findKthLargestValueInBst

class ProgramTest {
    @Test
    fun TestCase1() {
        val root = BST(15)
        root.left = BST(5)
        root.left!!.left = BST(2)
        root.left!!.left!!.left = BST(1)
        root.left!!.left!!.right = BST(3)
        root.left!!.right = BST(5)
        root.right = BST(20)
        root.right!!.left = BST(17)
        root.right!!.right = BST(22)
        val k = 3
        val expected = 17
        val output = findKthLargestValueInBst(root, k)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// This is an input class. Do not edit.
open class BST(value: Int) {
    var value = value
    var left: BST? = null
    var right: BST? = null
}

// O(n) time | O(n) space - where n is the number of nodes in the tree
fun findKthLargestValueInBst(tree: BST, k: Int): Int {
    val sortedNodeValues = mutableListOf<Int>()
    inOrderTraverse(tree, sortedNodeValues)
    return sortedNodeValues[sortedNodeValues.size - k]
}

fun inOrderTraverse(node: BST?, sortedNodeValues: MutableList<Int>) {
    if (node == null) return

    inOrderTraverse(node.left, sortedNodeValues)
    sortedNodeValues.add(node.value)
    inOrderTraverse(node.right, sortedNodeValues)
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// This is an input class. Do not edit.
open class BST(value: Int) {
    var value = value
    var left: BST? = null
    var right: BST? = null
}

open class TreeInfo(numberOfNodesVisited: Int, latestVisitedNodeValue: Int) {
    var numberOfNodesVisited = numberOfNodesVisited
    var latestVisitedNodeValue = latestVisitedNodeValue
}

// O(h + k) time | O(h) space - where h is the height of the tree and k is the input parameter
fun findKthLargestValueInBst(tree: BST, k: Int): Int {
    val treeInfo = TreeInfo(0, -1)
    reverseInOrderTraverse(tree, k, treeInfo)
    return treeInfo.latestVisitedNodeValue
}

fun reverseInOrderTraverse(node: BST?, k: Int, treeInfo: TreeInfo) {
    if (node == null || treeInfo.numberOfNodesVisited >= k) return

    reverseInOrderTraverse(node.right, k, treeInfo)
    if (treeInfo.numberOfNodesVisited < k) {
        treeInfo.numberOfNodesVisited += 1
        treeInfo.latestVisitedNodeValue = node.value
        reverseInOrderTraverse(node.left, k, treeInfo)
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.BST
import com.algoexpert.program.findKthLargestValueInBst

class ProgramTest {
    @Test
    fun TestCase1() {
        val root = BST(15)
        root.left = BST(5)
        root.left!!.left = BST(2)
        root.left!!.left!!.left = BST(1)
        root.left!!.left!!.right = BST(3)
        root.left!!.right = BST(5)
        root.right = BST(20)
        root.right!!.left = BST(17)
        root.right!!.right = BST(22)
        val k = 3
        val expected = 17
        val output = findKthLargestValueInBst(root, k)
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
      var root = Program.BST(value: 15)
      root.left = Program.BST(value: 5)
      root.left!.left = Program.BST(value: 2)
      root.left!.left!.left = Program.BST(value: 1)
      root.left!.left!.right = Program.BST(value: 3)
      root.left!.right = Program.BST(value: 5)
      root.right = Program.BST(value: 20)
      root.right!.left = Program.BST(value: 17)
      root.right!.right = Program.BST(value: 22)
      let k = 3
      let expected = 17
      var actual = Program().findKthLargestValueInBst(root, k)
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

  // O(n) time | O(n) space - where n is the number of nodes in the tree
  func findKthLargestValueInBst(_ tree: BST, _ k: Int) -> Int {
    var sortedNodeValues = [Int]()
    inOrderTraverse(tree, &sortedNodeValues)
    return sortedNodeValues[sortedNodeValues.count - k]
  }

  func inOrderTraverse(_ node: BST?, _ sortedNodeValues: inout [Int]) {
    if node == nil {
      return
    }

    inOrderTraverse(node!.left, &sortedNodeValues)
    sortedNodeValues.append(node!.value)
    inOrderTraverse(node!.right, &sortedNodeValues)
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

  struct treeInfo {
    var numberOfNodesVisited: Int
    var latestVisitedNodeValue: Int
  }

  // O(h + k) time | O(h) space - where h is the height of the tree and k is the input parameter
  func findKthLargestValueInBst(_ tree: BST, _ k: Int) -> Int {
    var info = treeInfo(numberOfNodesVisited: 0, latestVisitedNodeValue: -1)
    reverseInOrderTraverse(tree, k, &info)
    return info.latestVisitedNodeValue
  }

  func reverseInOrderTraverse(_ node: BST?, _ k: Int, _ treeInfo: inout treeInfo) {
    if node == nil || treeInfo.numberOfNodesVisited >= k {
      return
    }

    reverseInOrderTraverse(node!.right, k, &treeInfo)
    if treeInfo.numberOfNodesVisited < k {
      treeInfo.numberOfNodesVisited += 1
      treeInfo.latestVisitedNodeValue = node!.value
      reverseInOrderTraverse(node!.left, k, &treeInfo)
    }
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var root = Program.BST(value: 15)
      root.left = Program.BST(value: 5)
      root.left!.left = Program.BST(value: 2)
      root.left!.left!.left = Program.BST(value: 1)
      root.left!.left!.right = Program.BST(value: 3)
      root.left!.right = Program.BST(value: 5)
      root.right = Program.BST(value: 20)
      root.right!.left = Program.BST(value: 17)
      root.right!.right = Program.BST(value: 22)
      let k = 3
      let expected = 17
      var actual = Program().findKthLargestValueInBst(root, k)
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
        root = program.BST(15)
        root.left = program.BST(5)
        root.left.left = program.BST(2)
        root.left.left.left = program.BST(1)
        root.left.left.right = program.BST(3)
        root.left.right = program.BST(5)
        root.right = program.BST(20)
        root.right.left = program.BST(17)
        root.right.right = program.BST(22)
        k = 3
        expected = 17
        actual = program.findKthLargestValueInBst(root, k)
        self.assertEqual(actual, expected)

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


# O(n) time | O(n) space - where n is the number of nodes in the tree
def findKthLargestValueInBst(tree, k):
    sortedNodeValues = []
    inOrderTraverse(tree, sortedNodeValues)
    return sortedNodeValues[len(sortedNodeValues) - k]


def inOrderTraverse(node, sortedNodeValues):
    if node is None:
        return

    inOrderTraverse(node.left, sortedNodeValues)
    sortedNodeValues.append(node.value)
    inOrderTraverse(node.right, sortedNodeValues)

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
    def __init__(self, numberOfNodesVisited, latestVisitedNodeValue):
        self.numberOfNodesVisited = numberOfNodesVisited
        self.latestVisitedNodeValue = latestVisitedNodeValue


# O(h + k) time | O(h) space - where h is the height of the tree and k is the input parameter
def findKthLargestValueInBst(tree, k):
    treeInfo = TreeInfo(0, -1)
    reverseInOrderTraverse(tree, k, treeInfo)
    return treeInfo.latestVisitedNodeValue


def reverseInOrderTraverse(node, k, treeInfo):
    if node is None or treeInfo.numberOfNodesVisited >= k:
        return

    reverseInOrderTraverse(node.right, k, treeInfo)
    if treeInfo.numberOfNodesVisited < k:
        treeInfo.numberOfNodesVisited += 1
        treeInfo.latestVisitedNodeValue = node.value
        reverseInOrderTraverse(node.left, k, treeInfo)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        root = program.BST(15)
        root.left = program.BST(5)
        root.left.left = program.BST(2)
        root.left.left.left = program.BST(1)
        root.left.left.right = program.BST(3)
        root.left.right = program.BST(5)
        root.right = program.BST(20)
        root.right.left = program.BST(17)
        root.right.right = program.BST(22)
        k = 3
        expected = 17
        actual = program.findKthLargestValueInBst(root, k)
        self.assertEqual(actual, expected)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

const {BST} = program;

it('Test Case #1', function () {
  const root = new BST(15);
  root.left = new BST(5);
  root.left.left = new BST(2);
  root.left.left.left = new BST(1);
  root.left.left.right = new BST(3);
  root.left.right = new BST(5);
  root.right = new BST(20);
  root.right.left = new BST(17);
  root.right.right = new BST(22);
  const k = 3;
  const expected = 17;
  const actual = program.findKthLargestValueInBst(root, k);
  chai.expect(actual).to.deep.equal(expected);
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

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// O(n) time | O(n) space - where n is the number of nodes in the tree
export function findKthLargestValueInBst(tree: BST, k: number) {
  const sortedNodeValues: number[] = [];
  inOrderTraverse(tree, sortedNodeValues);
  return sortedNodeValues[sortedNodeValues.length - k];
}

function inOrderTraverse(node: BST | null, sortedNodeValues: number[]) {
  if (node === null) return;

  inOrderTraverse(node.left, sortedNodeValues);
  sortedNodeValues.push(node.value);
  inOrderTraverse(node.right, sortedNodeValues);
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

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class TreeInfo {
  numberOfNodesVisited: number;
  latestVisitedNodeValue: number;

  constructor(numberOfNodesVisited: number, latestVisitedNodeValue: number) {
    this.numberOfNodesVisited = numberOfNodesVisited;
    this.latestVisitedNodeValue = latestVisitedNodeValue;
  }
}

// O(h + k) time | O(h) space - where h is the height of the tree and k is the input parameter
export function findKthLargestValueInBst(tree: BST, k: number) {
  const treeInfo = new TreeInfo(0, -1);
  reverseInOrderTraverse(tree, k, treeInfo);
  return treeInfo.latestVisitedNodeValue;
}

function reverseInOrderTraverse(node: BST | null, k: number, treeInfo: TreeInfo) {
  if (node === null || treeInfo.numberOfNodesVisited >= k) return;

  reverseInOrderTraverse(node.right, k, treeInfo);
  if (treeInfo.numberOfNodesVisited < k) {
    treeInfo.numberOfNodesVisited++;
    treeInfo.latestVisitedNodeValue = node.value;
    reverseInOrderTraverse(node.left, k, treeInfo);
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

const {BST} = program;

it('Test Case #1', function () {
  const root = new BST(15);
  root.left = new BST(5);
  root.left.left = new BST(2);
  root.left.left.left = new BST(1);
  root.left.left.right = new BST(3);
  root.left.right = new BST(5);
  root.right = new BST(20);
  root.right.left = new BST(17);
  root.right.right = new BST(22);
  const k = 3;
  const expected = 17;
  const actual = program.findKthLargestValueInBst(root, k);
  chai.expect(actual).to.deep.equal(expected);
});

```

