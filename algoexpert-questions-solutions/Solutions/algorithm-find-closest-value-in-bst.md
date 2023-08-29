# Find Closest Value In BST
<div class="html">
<p>
  Write a function that takes in a Binary Search Tree (BST) and a target integer
  value and returns the closest value to that target value contained in the BST.
</p>
<p>You can assume that there will only be one closest value.</p>
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
<span class="CodeEditor-promptParameter">tree</span> =   10
       /     \
      5      15
    /   \   /   \
   2     5 13   22
 /           \
1            14
<span class="CodeEditor-promptParameter">target</span> = 12
</pre>
<h3>Sample Output</h3>
<pre>13</pre>
</div>

Hint 1
<p>
Try traversing the BST node by node, all the while keeping track of the node with the value closest to the target value. Calculating the absolute value of the difference between a node's value and the target value should allow you to check if that node is closer than the current closest one.
</p>


Hint 2

<p>
Make use of the BST property to determine what side of any given node has values close to the target value and is therefore worth exploring.
</p>


Hint 3

<p>
What are the advantages and disadvantages of solving this problem iteratively as opposed to recursively?
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

BST::BST(int val) {
  value = val;
  left = nullptr;
  right = nullptr;
}

class ProgramTest : public TestSuite {
public:
  void Run() {

    RunTest("Test Case 1", []() {
      BST *root = new BST(10);
      root->left = new BST(5);
      root->left->left = new BST(2);
      root->left->left->left = new BST(1);
      root->left->right = new BST(5);
      root->right = new BST(15);
      root->right->left = new BST(13);
      root->right->left->right = new BST(14);
      root->right->right = new BST(22);
      int expected = 13;
      int actual = findClosestValueInBst(root, 12);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <cmath>
#include <float.h>
using namespace std;

class BST {
public:
  int value;
  BST *left;
  BST *right;

  BST(int val);
  BST &insert(int val);
};

int findClosestValueInBst(BST *tree, int target);
int findClosestValueInBstHelper(BST *tree, int target, int closest);

// Average: O(log(n)) time | O(log(n)) space
// Worst: O(n) time | O(n) space
int findClosestValueInBst(BST *tree, int target) {
  return findClosestValueInBstHelper(tree, target, tree->value);
}

int findClosestValueInBstHelper(BST *tree, int target, int closest) {
  if (abs(target - closest) > abs(target - tree->value)) {
    closest = tree->value;
  }
  if (target < tree->value && tree->left != nullptr) {
    return findClosestValueInBstHelper(tree->left, target, closest);
  } else if (target > tree->value && tree->right != nullptr) {
    return findClosestValueInBstHelper(tree->right, target, closest);
  } else {
    return closest;
  }
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <cmath>
#include <float.h>
using namespace std;

class BST {
public:
  int value;
  BST *left;
  BST *right;

  BST(int val);
  BST &insert(int val);
};

int findClosestValueInBst(BST *tree, int target);
int findClosestValueInBstHelper(BST *tree, int target, int closest);

// Average: O(log(n)) time | O(1) space
// Worst: O(n) time | O(1) space
int findClosestValueInBst(BST *tree, int target) {
  return findClosestValueInBstHelper(tree, target, tree->value);
}

int findClosestValueInBstHelper(BST *tree, int target, int closest) {
  BST *currentNode = tree;
  while (currentNode != nullptr) {
    if (abs(target - closest) > abs(target - currentNode->value)) {
      closest = currentNode->value;
    }
    if (target < currentNode->value) {
      currentNode = currentNode->left;
    } else if (target > currentNode->value) {
      currentNode = currentNode->right;
    } else {
      break;
    }
  }
  return (int)closest;
}

```
### Unit Tests 1 (cpp)
```cpp
BST::BST(int val) {
  value = val;
  left = nullptr;
  right = nullptr;
}

class ProgramTest : public TestSuite {
public:
  void Run() {

    RunTest("Test Case 1", []() {
      BST *root = new BST(10);
      root->left = new BST(5);
      root->left->left = new BST(2);
      root->left->left->left = new BST(1);
      root->left->right = new BST(5);
      root->right = new BST(15);
      root->right->left = new BST(13);
      root->right->left->right = new BST(14);
      root->right->right = new BST(22);
      int expected = 13;
      int actual = findClosestValueInBst(root, 12);
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

public class ProgramTest {
	[Test]
	public void TestCase1() {
		var root = new Program.BST(10);
		root.left = new Program.BST(5);
		root.left.left = new Program.BST(2);
		root.left.left.left = new Program.BST(1);
		root.left.right = new Program.BST(5);
		root.right = new Program.BST(15);
		root.right.left = new Program.BST(13);
		root.right.left.right = new Program.BST(14);
		root.right.right = new Program.BST(22);

		var expected = 13;
		var actual = Program.FindClosestValueInBst(root, 12);
		Utils.AssertEquals(expected, actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// Average: O(log(n)) time | O(log(n)) space
	// Worst: O(n) time | O(n) space
	public static int FindClosestValueInBst(BST tree, int target) {
		return FindClosestValueInBst(tree, target, tree.value);
	}

	public static int FindClosestValueInBst(BST tree, int target, int closest) {
		if (Math.Abs(target - closest) > Math.Abs(target - tree.value)) {
			closest = tree.value;
		}
		if (target < tree.value && tree.left != null) {
			return FindClosestValueInBst(tree.left, target, closest);
		} else if (target > tree.value && tree.right != null) {
			return FindClosestValueInBst(tree.right, target, closest);
		} else {
			return closest;
		}
	}

	public class BST {
		public int value;
		public BST left;
		public BST right;

		public BST(int value) {
			this.value = value;
		}
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// Average: O(log(n)) time | O(1) space
	// Worst: O(n) time | O(1) space
	public static int FindClosestValueInBst(BST tree, int target) {
		return FindClosestValueInBst(tree, target, tree.value);
	}

	public static int FindClosestValueInBst(BST tree, int target, int closest) {
		BST currentNode = tree;
		while (currentNode != null) {
			if (Math.Abs(target - closest) > Math.Abs(target - currentNode.value)) {
				closest = currentNode.value;
			}
			if (target < currentNode.value) {
				currentNode = currentNode.left;
			} else if (target > currentNode.value) {
				currentNode = currentNode.right;
			} else {
				break;
			}
		}
		return closest;
	}

	public class BST {
		public int value;
		public BST left;
		public BST right;

		public BST(int value) {
			this.value = value;
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		var root = new Program.BST(10);
		root.left = new Program.BST(5);
		root.left.left = new Program.BST(2);
		root.left.left.left = new Program.BST(1);
		root.left.right = new Program.BST(5);
		root.right = new Program.BST(15);
		root.right.left = new Program.BST(13);
		root.right.left.right = new Program.BST(14);
		root.right.right = new Program.BST(22);

		var expected = 13;
		var actual = Program.FindClosestValueInBst(root, 12);
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

func NewBST(value int) *BST {
	return &BST{Value: value}
}

func (s *TestSuite) TestCase1(t *TestCase) {
	root := NewBST(10)
	root.Left = NewBST(5)
	root.Left.Left = NewBST(2)
	root.Left.Left.Left = NewBST(1)
	root.Left.Right = NewBST(5)
	root.Right = NewBST(15)
	root.Right.Left = NewBST(13)
	root.Right.Left.Right = NewBST(14)
	root.Right.Right = NewBST(22)

	expected := 13
	actual := root.FindClosestValue(12)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type BST struct {
	Value int

	Left  *BST
	Right *BST
}

// Average: O(log(n)) time | O(log(n)) space
// Worst: O(n) time | O(n) space
func (tree *BST) FindClosestValue(target int) int {
	return tree.findClosestValue(target, tree.Value)
}

func (tree *BST) findClosestValue(target, closest int) int {
	if absdiff(target, closest) > absdiff(target, tree.Value) {
		closest = tree.Value
	}
	if target < tree.Value && tree.Left != nil {
		return tree.Left.findClosestValue(target, closest)
	} else if target > tree.Value && tree.Right != nil {
		return tree.Right.findClosestValue(target, closest)
	}
	return closest
}

func absdiff(a, b int) int {
	if a > b {
		return a - b
	}
	return b - a
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type BST struct {
	Value int

	Left  *BST
	Right *BST
}

// Average: O(log(n)) time | O(1) space
// Worst: O(n) time | O(1) space
func (tree *BST) FindClosestValue(target int) int {
	return tree.findClosestValue(target, tree.Value)
}

func (tree *BST) findClosestValue(target, closest int) int {
	currentnode := tree
	for currentnode != nil {
		if absdiff(target, closest) > absdiff(target, currentnode.Value) {
			closest = currentnode.Value
		}
		if target < currentnode.Value {
			currentnode = currentnode.Left
		} else if target > currentnode.Value {
			currentnode = currentnode.Right
		} else {
			break
		}
	}
	return closest
}

func absdiff(a, b int) int {
	if a > b {
		return a - b
	}
	return b - a
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func NewBST(value int) *BST {
	return &BST{Value: value}
}

func (s *TestSuite) TestCase1(t *TestCase) {
	root := NewBST(10)
	root.Left = NewBST(5)
	root.Left.Left = NewBST(2)
	root.Left.Left.Left = NewBST(1)
	root.Left.Right = NewBST(5)
	root.Right = NewBST(15)
	root.Right.Left = NewBST(13)
	root.Right.Left.Right = NewBST(14)
	root.Right.Right = NewBST(22)

	expected := 13
	actual := root.FindClosestValue(12)
	require.Equal(t, expected, actual)
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
    var root = new Program.BST(10);
    root.left = new Program.BST(5);
    root.left.left = new Program.BST(2);
    root.left.left.left = new Program.BST(1);
    root.left.right = new Program.BST(5);
    root.right = new Program.BST(15);
    root.right.left = new Program.BST(13);
    root.right.left.right = new Program.BST(14);
    root.right.right = new Program.BST(22);

    var expected = 13;
    var actual = Program.findClosestValueInBst(root, 12);
    Utils.assertEquals(expected, actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // Average: O(log(n)) time | O(log(n)) space
  // Worst: O(n) time | O(n) space
  public static int findClosestValueInBst(BST tree, int target) {
    return findClosestValueInBst(tree, target, tree.value);
  }

  public static int findClosestValueInBst(BST tree, int target, int closest) {
    if (Math.abs(target - closest) > Math.abs(target - tree.value)) {
      closest = tree.value;
    }
    if (target < tree.value && tree.left != null) {
      return findClosestValueInBst(tree.left, target, closest);
    } else if (target > tree.value && tree.right != null) {
      return findClosestValueInBst(tree.right, target, closest);
    } else {
      return closest;
    }
  }

  static class BST {
    public int value;
    public BST left;
    public BST right;

    public BST(int value) {
      this.value = value;
    }
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // Average: O(log(n)) time | O(1) space
  // Worst: O(n) time | O(1) space
  public static int findClosestValueInBst(BST tree, int target) {
    return findClosestValueInBst(tree, target, tree.value);
  }

  public static int findClosestValueInBst(BST tree, int target, int closest) {
    BST currentNode = tree;
    while (currentNode != null) {
      if (Math.abs(target - closest) > Math.abs(target - currentNode.value)) {
        closest = currentNode.value;
      }
      if (target < currentNode.value) {
        currentNode = currentNode.left;
      } else if (target > currentNode.value) {
        currentNode = currentNode.right;
      } else {
        break;
      }
    }
    return closest;
  }

  static class BST {
    public int value;
    public BST left;
    public BST right;

    public BST(int value) {
      this.value = value;
    }
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {

  @Test
  public void TestCase1() {
    var root = new Program.BST(10);
    root.left = new Program.BST(5);
    root.left.left = new Program.BST(2);
    root.left.left.left = new Program.BST(1);
    root.left.right = new Program.BST(5);
    root.right = new Program.BST(15);
    root.right.left = new Program.BST(13);
    root.right.left.right = new Program.BST(14);
    root.right.right = new Program.BST(22);

    var expected = 13;
    var actual = Program.findClosestValueInBst(root, 12);
    Utils.assertEquals(expected, actual);
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

class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

it('Test Case #1', function () {
  const root = new BST(10);
  root.left = new BST(5);
  root.left.left = new BST(2);
  root.left.left.left = new BST(1);
  root.left.right = new BST(5);
  root.right = new BST(15);
  root.right.left = new BST(13);
  root.right.left.right = new BST(14);
  root.right.right = new BST(22);
  const expected = 13;
  const actual = program.findClosestValueInBst(root, 12);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average: O(log(n)) time | O(log(n)) space
// Worst: O(n) time | O(n) space
function findClosestValueInBst(tree, target) {
  return findClosestValueInBstHelper(tree, target, tree.value);
}

function findClosestValueInBstHelper(tree, target, closest) {
  if (tree === null) return closest;
  if (Math.abs(target - closest) > Math.abs(target - tree.value)) {
    closest = tree.value;
  }
  if (target < tree.value) {
    return findClosestValueInBstHelper(tree.left, target, closest);
  } else if (target > tree.value) {
    return findClosestValueInBstHelper(tree.right, target, closest);
  } else {
    return closest;
  }
}

// This is the class of the input tree.
class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

exports.findClosestValueInBst = findClosestValueInBst;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average: O(log(n)) time | O(1) space
// Worst: O(n) time | O(1) space
function findClosestValueInBst(tree, target) {
  return findClosestValueInBstHelper(tree, target, tree.value);
}

function findClosestValueInBstHelper(tree, target, closest) {
  let currentNode = tree;
  while (currentNode !== null) {
    if (Math.abs(target - closest) > Math.abs(target - currentNode.value)) {
      closest = currentNode.value;
    }
    if (target < currentNode.value) {
      currentNode = currentNode.left;
    } else if (target > currentNode.value) {
      currentNode = currentNode.right;
    } else {
      break;
    }
  }
  return closest;
}

// This is the class of the input tree.
class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

exports.findClosestValueInBst = findClosestValueInBst;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

it('Test Case #1', function () {
  const root = new BST(10);
  root.left = new BST(5);
  root.left.left = new BST(2);
  root.left.left.left = new BST(1);
  root.left.right = new BST(5);
  root.right = new BST(15);
  root.right.left = new BST(13);
  root.right.left.right = new BST(14);
  root.right.right = new BST(22);
  const expected = 13;
  const actual = program.findClosestValueInBst(root, 12);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.BST as BST
import com.algoexpert.program.findClosestValueInBst as findClosestValueInBst

class ProgramTest {
    @Test
    fun TestCase1() {
        val tree = BST(10)
        tree.left = BST(5)
        tree.left!!.left = BST(2)
        tree.left!!.left!!.left = BST(1)
        tree.left!!.right = BST(5)
        tree.right = BST(15)
        tree.right!!.left = BST(13)
        tree.right!!.left!!.right = BST(14)
        tree.right!!.right = BST(22)

        val result = findClosestValueInBst(tree, 12)

        assert(result == 13)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.abs

open class BST(value: Int) {
    var value = value
    var left: BST? = null
    var right: BST? = null
}

// Average: O(log(n)) time | O(log(n)) space
// Worst: O(n) time | O(n) space
fun findClosestValueInBst(tree: BST, target: Int): Int {
    return findClosestValueInBstHelper(tree, target, tree.value)
}

fun findClosestValueInBstHelper(tree: BST, target: Int, closest: Int): Int {
    var newClosest = closest

    if (abs(target - closest) > abs(target - tree.value)) {
        newClosest = tree.value
    }
    if (target < tree.value && tree.left != null) {
        return findClosestValueInBstHelper(tree.left!!, target, newClosest)
    } else if (target > tree.value && tree.right != null) {
        return findClosestValueInBstHelper(tree.right!!, target, newClosest)
    } else {
        return newClosest
    }
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.abs

open class BST(value: Int) {
    var value = value
    var left: BST? = null
    var right: BST? = null
}

// Average: O(log(n)) time | O(1) space
// Worst: O(n) time | O(1) space
fun findClosestValueInBst(tree: BST, target: Int): Int {
    return findClosestValueInBstHelper(tree, target, tree.value)
}

fun findClosestValueInBstHelper(tree: BST?, target: Int, closest: Int): Int {
    var newClosest = closest
    var currentNode = tree
    while (currentNode != null) {
        if (abs(target - newClosest) > abs(target - currentNode.value)) {
            newClosest = currentNode.value
        }
        if (target < currentNode.value) {
            currentNode = currentNode.left
        } else if (target > currentNode.value) {
            currentNode = currentNode.right
        } else {
            break
        }
    }
    return newClosest
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.BST as BST
import com.algoexpert.program.findClosestValueInBst as findClosestValueInBst

class ProgramTest {
    @Test
    fun TestCase1() {
        val tree = BST(10)
        tree.left = BST(5)
        tree.left!!.left = BST(2)
        tree.left!!.left!!.left = BST(1)
        tree.left!!.right = BST(5)
        tree.right = BST(15)
        tree.right!!.left = BST(13)
        tree.right!!.left!!.right = BST(14)
        tree.right!!.right = BST(22)

        val result = findClosestValueInBst(tree, 12)

        assert(result == 13)
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
      let root = Program.BST(value: 10)
      root.left = Program.BST(value: 5)
      root.left!.left = Program.BST(value: 2)
      root.left!.left!.left = Program.BST(value: 1)
      root.left!.right = Program.BST(value: 5)
      root.right = Program.BST(value: 15)
      root.right!.left = Program.BST(value: 13)
      root.right!.left!.right = Program.BST(value: 14)
      root.right!.right = Program.BST(value: 22)
      let expected = 13
      let actual = program.findClosestValueInBST(tree: root, target: 12)

      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
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

  // Average: O(log(n)) time | O(log(n)) space
  // Worst: O(n) time | O(n) space
  func findClosestValueInBST(tree: BST?, target: Int) -> Int {
    var closest = tree!.value
    return findClosestValueInBSTHelper(tree: tree,
                                       target: target, closest: &closest)
  }

  func findClosestValueInBSTHelper(tree: BST?,
                                   target: Int, closest: inout Int) -> Int
  {
    if tree === nil {
      return closest
    }

    if let tree = tree {
      let closestDifference = target - closest
      let currentDifference = target - tree.value

      if closestDifference.magnitude > currentDifference.magnitude {
        closest = tree.value
      }
    }

    if let tree = tree, target < tree.value {
      if let left = tree.left {
        return findClosestValueInBSTHelper(
          tree: left, target: target, closest: &closest
        )
      } else {
        return closest
      }
    } else if let tree = tree, target > tree.value {
      if let right = tree.right {
        return findClosestValueInBSTHelper(
          tree: right, target: target, closest: &closest
        )
      } else {
        return closest
      }
    } else {
      return closest
    }
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
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

  // Average: O(log(n)) time | O(1) space
  // Worst: O(n) time | O(1) space
  func findClosestValueInBST(tree: BST?, target: Int) -> Int {
    var closest = tree!.value
    return findClosestValueInBSTHelper(tree: tree, target: target, closest: &closest)
  }

  func findClosestValueInBSTHelper(tree: BST?, target: Int,
                                   closest: inout Int) -> Int
  {
    var currentNode = tree

    while currentNode !== nil {
      if let node = currentNode {
        let closestDifference = target - closest
        let currentDifference = target - node.value

        if closestDifference.magnitude > currentDifference.magnitude {
          closest = node.value
        }
      }

      if let node = currentNode, target < node.value {
        currentNode = node.left
      } else if let node = currentNode, target > node.value {
        currentNode = node.right
      } else {
        break
      }
    }

    return closest
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let root = Program.BST(value: 10)
      root.left = Program.BST(value: 5)
      root.left!.left = Program.BST(value: 2)
      root.left!.left!.left = Program.BST(value: 1)
      root.left!.right = Program.BST(value: 5)
      root.right = Program.BST(value: 15)
      root.right!.left = Program.BST(value: 13)
      root.right!.left!.right = Program.BST(value: 14)
      root.right!.right = Program.BST(value: 22)
      let expected = 13
      let actual = program.findClosestValueInBST(tree: root, target: 12)

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


class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        root = BST(10)
        root.left = BST(5)
        root.left.left = BST(2)
        root.left.left.left = BST(1)
        root.left.right = BST(5)
        root.right = BST(15)
        root.right.left = BST(13)
        root.right.left.right = BST(14)
        root.right.right = BST(22)
        expected = 13
        actual = program.findClosestValueInBst(root, 12)
        self.assertEqual(expected, actual)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Average: O(log(n)) time | O(log(n)) space
# Worst: O(n) time | O(n) space
def findClosestValueInBst(tree, target):
    return findClosestValueInBstHelper(tree, target, tree.value)


def findClosestValueInBstHelper(tree, target, closest):
    if tree is None:
        return closest
    if abs(target - closest) > abs(target - tree.value):
        closest = tree.value
    if target < tree.value:
        return findClosestValueInBstHelper(tree.left, target, closest)
    elif target > tree.value:
        return findClosestValueInBstHelper(tree.right, target, closest)
    else:
        return closest


# This is the class of the input tree.
class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Average: O(log(n)) time | O(1) space
# Worst: O(n) time | O(1) space
def findClosestValueInBst(tree, target):
    return findClosestValueInBstHelper(tree, target, tree.value)


def findClosestValueInBstHelper(tree, target, closest):
    currentNode = tree
    while currentNode is not None:
        if abs(target - closest) > abs(target - currentNode.value):
            closest = currentNode.value
        if target < currentNode.value:
            currentNode = currentNode.left
        elif target > currentNode.value:
            currentNode = currentNode.right
        else:
            break
    return closest


# This is the class of the input tree.
class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

```
### Unit Tests 1 (python)
```python
import program
import unittest


class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        root = BST(10)
        root.left = BST(5)
        root.left.left = BST(2)
        root.left.left.left = BST(1)
        root.left.right = BST(5)
        root.right = BST(15)
        root.right.left = BST(13)
        root.right.left.right = BST(14)
        root.right.right = BST(22)
        expected = 13
        actual = program.findClosestValueInBst(root, 12)
        self.assertEqual(expected, actual)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

class BST {
  value: number;
  left: BST | null;
  right: BST | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

it('Test Case #1', function () {
  const root = new BST(10);
  root.left = new BST(5);
  root.left.left = new BST(2);
  root.left.left.left = new BST(1);
  root.left.right = new BST(5);
  root.right = new BST(15);
  root.right.left = new BST(13);
  root.right.left.right = new BST(14);
  root.right.right = new BST(22);
  const expected = 13;
  const actual = program.findClosestValueInBst(root, 12);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class BST {
  value: number;
  left: BST | null;
  right: BST | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Average: O(log(n)) time | O(log(n)) space
// Worst: O(n) time | O(n) space
export function findClosestValueInBst(tree: BST, target: number) {
  return findClosestValueInBstHelper(tree, target, tree.value);
}

function findClosestValueInBstHelper(tree: BST | null, target: number, closest: number): number {
  if (tree === null) return closest;
  if (Math.abs(target - closest) > Math.abs(target - tree.value)) {
    closest = tree.value;
  }
  if (target < tree.value) {
    return findClosestValueInBstHelper(tree.left, target, closest);
  } else if (target > tree.value) {
    return findClosestValueInBstHelper(tree.right, target, closest);
  } else {
    return closest;
  }
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class BST {
  value: number;
  left: BST | null;
  right: BST | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Average: O(log(n)) time | O(1) space
// Worst: O(n) time | O(1) space
export function findClosestValueInBst(tree: BST, target: number) {
  return findClosestValueInBstHelper(tree, target, tree.value);
}

function findClosestValueInBstHelper(tree: BST | null, target: number, closest: number) {
  let currentNode = tree;
  while (currentNode !== null) {
    if (Math.abs(target - closest) > Math.abs(target - currentNode.value)) {
      closest = currentNode.value;
    }
    if (target < currentNode.value) {
      currentNode = currentNode.left;
    } else if (target > currentNode.value) {
      currentNode = currentNode.right;
    } else {
      break;
    }
  }
  return closest;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

class BST {
  value: number;
  left: BST | null;
  right: BST | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

it('Test Case #1', function () {
  const root = new BST(10);
  root.left = new BST(5);
  root.left.left = new BST(2);
  root.left.left.left = new BST(1);
  root.left.right = new BST(5);
  root.right = new BST(15);
  root.right.left = new BST(13);
  root.right.left.right = new BST(14);
  root.right.right = new BST(22);
  const expected = 13;
  const actual = program.findClosestValueInBst(root, 12);
  chai.expect(actual).to.deep.equal(expected);
});

```

