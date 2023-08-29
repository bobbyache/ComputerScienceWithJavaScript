# Max Path Sum In Binary Tree
<div class="html">
<p>
  Write a function that takes in a Binary Tree and returns its max path sum.
</p>
<p>
  A path is a collection of connected nodes in a tree, where no node is
  connected to more than two other nodes; a path sum is the sum of the values of
  the nodes in a particular path.
</p>
<p>
  Each <span>BinaryTree</span> node has an integer <span>value</span>, a
  <span>left</span> child node, and a <span>right</span> child node. Children
  nodes can either be <span>BinaryTree</span> nodes themselves or
  <span>None</span> / <span>null</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">tree</span> = 1
    /     \
   2       3
 /   \   /   \
4     5 6     7
</pre>
<h3>Sample Output</h3>
<pre>
18 <span class="CodeEditor-promptComment">// 5 + 2 + 1 + 3 + 7</span>
</pre>
</div>

Hint 1
<p>
If you were to imagine each node in a Binary Tree as the root of the Binary Tree, temporarily eliminating all of the nodes that come above it, how would you find the max path sum for each of these newly imagined Binary Trees? In simpler terms, how can you find the max path sum for each subtree in the Binary Tree?
</p>


Hint 2

<p>
For every node in a Binary Tree, there are four options for the max path sum that includes its value: the node's value alone, the node's value plus the max path sum of its left subtree, the node's value plus the max path sum of its right subtree, or the node's value plus the max path sum of both its subtrees.
</p>


Hint 3

<p>
A recursive algorithm that computes each node's max path sum and uses it to compute its parents' nodes' max path sums seems appropriate, but realize that you cannot have a path going through a node and both its subtrees as well as that node's parent node. In other words, the fourth option mentioned in Hint #2 poses a challenge to implementing a recursive algorithm that solves this problem. How can you get around it?
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

#include <deque>

BinaryTree::BinaryTree(int value) {
  this->value = value;
  this->left = nullptr;
  this->right = nullptr;
}

void BinaryTree::insert(vector<int> values, int i) {
  if (i >= values.size()) {
    return;
  }
  deque<BinaryTree *> queue;
  queue.push_back(this);
  while (queue.size() > 0) {
    BinaryTree *current = queue.front();
    queue.pop_front();
    if (current->left == nullptr) {
      current->left = new BinaryTree(values[i]);
      break;
    }
    queue.push_back(current->left);
    if (current->right == nullptr) {
      current->right = new BinaryTree(values[i]);
      break;
    }
    queue.push_back(current->right);
  }
  this->insert(values, i + 1);
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      BinaryTree test(1);
      test.insert({2, 3, 4, 5, 6, 7});
      assert(maxPathSum(test) == 18);
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

  BinaryTree(int value);
  void insert(vector<int> values, int i = 0);
};

vector<int> findMaxSum(BinaryTree *tree);

// O(n) time | O(log(n)) space
int maxPathSum(BinaryTree tree) {
  vector<int> maxSumArray = findMaxSum(&tree);
  return maxSumArray[1];
}

vector<int> findMaxSum(BinaryTree *tree) {
  if (tree == nullptr) {
    return vector<int>{0, INT_MIN};
  }

  vector<int> leftMaxSumArray = findMaxSum(tree->left);
  int leftMaxSumAsBranch = leftMaxSumArray[0];
  int leftMaxPathSum = leftMaxSumArray[1];

  vector<int> rightMaxSumArray = findMaxSum(tree->right);
  int rightMaxSumAsBranch = rightMaxSumArray[0];
  int rightMaxPathSum = rightMaxSumArray[1];

  int maxChildSumAsBranch = max(leftMaxSumAsBranch, rightMaxSumAsBranch);
  int maxSumAsBranch = max(maxChildSumAsBranch + tree->value, tree->value);
  int maxSumAsRootNode = max(
      leftMaxSumAsBranch + tree->value + rightMaxSumAsBranch, maxSumAsBranch);
  int maxPathSum = max(leftMaxPathSum, max(rightMaxPathSum, maxSumAsRootNode));

  return vector<int>{maxSumAsBranch, maxPathSum};
}

```
### Unit Tests 1 (cpp)
```cpp
#include <deque>

BinaryTree::BinaryTree(int value) {
  this->value = value;
  this->left = nullptr;
  this->right = nullptr;
}

void BinaryTree::insert(vector<int> values, int i) {
  if (i >= values.size()) {
    return;
  }
  deque<BinaryTree *> queue;
  queue.push_back(this);
  while (queue.size() > 0) {
    BinaryTree *current = queue.front();
    queue.pop_front();
    if (current->left == nullptr) {
      current->left = new BinaryTree(values[i]);
      break;
    }
    queue.push_back(current->left);
    if (current->right == nullptr) {
      current->right = new BinaryTree(values[i]);
      break;
    }
    queue.push_back(current->right);
  }
  this->insert(values, i + 1);
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      BinaryTree test(1);
      test.insert({2, 3, 4, 5, 6, 7});
      assert(maxPathSum(test) == 18);
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

public class ProgramTest {
	[Test]
	public void TestCase1() {
		TestBinaryTree test = new TestBinaryTree(1);
		test.insert(new int[] {2, 3, 4, 5, 6, 7}, 0);
		Utils.AssertTrue(Program.MaxPathSum(test) == 18);
	}

	public class TestBinaryTree : Program.BinaryTree {
		public TestBinaryTree(int value) : base(value) {
		}

		public void insert(int[] values, int i) {
			if (i >= values.Length) {
				return;
			}
			List<Program.BinaryTree> queue = new List<Program.BinaryTree>();
			queue.Add(this);
			var index = 0;
			while (index < queue.Count) {
				Program.BinaryTree current = queue[index];
				index += 1;
				if (current.left == null) {
					current.left = new Program.BinaryTree(values[i]);
					break;
				}
				queue.Add(current.left);
				if (current.right == null) {
					current.right = new Program.BinaryTree(values[i]);
					break;
				}
				queue.Add(current.right);
			}
			insert(values, i + 1);
		}
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;

public class Program {
	// O(n) time | O(log(n)) space
	public static int MaxPathSum(BinaryTree tree) {
		List<int> maxSumArray = findMaxSum(tree);
		return maxSumArray[1];
	}

	public static List<int> findMaxSum(BinaryTree tree) {
		if (tree == null) {
			return new List<int>(){
				       0, Int32.MinValue
			};
		}
		List<int> leftMaxSumArray = findMaxSum(tree.left);
		int leftMaxSumAsBranch = leftMaxSumArray[0];
		int leftMaxPathSum = leftMaxSumArray[1];

		List<int> rightMaxSumArray = findMaxSum(tree.right);
		int rightMaxSumAsBranch = rightMaxSumArray[0];
		int rightMaxPathSum = rightMaxSumArray[1];

		int maxChildSumAsBranch = Math.Max(leftMaxSumAsBranch, rightMaxSumAsBranch);
		int maxSumAsBranch = Math.Max(maxChildSumAsBranch + tree.value, tree.value);
		int maxSumAsRootNode = Math.Max(
			leftMaxSumAsBranch + tree.value + rightMaxSumAsBranch,
			maxSumAsBranch
			);
		int maxPathSum = Math.Max(leftMaxPathSum, Math.Max(rightMaxPathSum,
		    maxSumAsRootNode));

		return new List<int>(){
			       maxSumAsBranch, maxPathSum
		};
	}

	public class BinaryTree {
		public int value;
		public BinaryTree left;
		public BinaryTree right;

		public BinaryTree(int value) {
			this.value = value;
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		TestBinaryTree test = new TestBinaryTree(1);
		test.insert(new int[] {2, 3, 4, 5, 6, 7}, 0);
		Utils.AssertTrue(Program.MaxPathSum(test) == 18);
	}

	public class TestBinaryTree : Program.BinaryTree {
		public TestBinaryTree(int value) : base(value) {
		}

		public void insert(int[] values, int i) {
			if (i >= values.Length) {
				return;
			}
			List<Program.BinaryTree> queue = new List<Program.BinaryTree>();
			queue.Add(this);
			var index = 0;
			while (index < queue.Count) {
				Program.BinaryTree current = queue[index];
				index += 1;
				if (current.left == null) {
					current.left = new Program.BinaryTree(values[i]);
					break;
				}
				queue.Add(current.left);
				if (current.right == null) {
					current.right = new Program.BinaryTree(values[i]);
					break;
				}
				queue.Add(current.right);
			}
			insert(values, i + 1);
		}
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
	test := NewBinaryTree(1).insertAll([]int{2, 3, 4, 5, 6, 7})
	require.Equal(t, MaxPathSum(test), 18)
}

func NewBinaryTree(value int) *BinaryTree {
	return &BinaryTree{Value: value}
}

func (tree *BinaryTree) insertAll(values []int) *BinaryTree {
	for _, value := range values {
		tree.insert(value)
	}
	return tree
}

func (tree *BinaryTree) insert(value int) {
	queue := []*BinaryTree{tree}
	var current *BinaryTree
	for len(queue) > 0 {
		current, queue = queue[0], queue[1:]
		if current.Left == nil {
			current.Left = NewBinaryTree(value)
			break
		}
		queue = append(queue, current.Left)
		if current.Right == nil {
			current.Right = NewBinaryTree(value)
			break
		}
		queue = append(queue, current.Right)
	}
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "math"

type BinaryTree struct {
	Value       int
	Left, Right *BinaryTree
}

// O(n) time | O(log(n)) space
func MaxPathSum(tree *BinaryTree) int {
	_, maxSum := findMaxSum(tree)
	return maxSum
}

func findMaxSum(tree *BinaryTree) (int, int) {
	if tree == nil {
		return 0, math.MinInt32
	}
	leftMaxSumAsBranch, leftMaxPathSum := findMaxSum(tree.Left)
	rightMaxSumAsBranch, rightMaxPathSum := findMaxSum(tree.Right)
	maxChildSumAsBranch := max(leftMaxSumAsBranch, rightMaxSumAsBranch)

	value := tree.Value
	maxSumAsBranch := max(maxChildSumAsBranch+value, value)
	maxSumAsRootNode := max(leftMaxSumAsBranch+value+rightMaxSumAsBranch, maxSumAsBranch)
	maxPathSum := max(leftMaxPathSum, rightMaxPathSum, maxSumAsRootNode)

	return maxSumAsBranch, maxPathSum
}

func max(first int, vals ...int) int {
	for _, val := range vals {
		if val > first {
			first = val
		}
	}
	return first
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	test := NewBinaryTree(1).insertAll([]int{2, 3, 4, 5, 6, 7})
	require.Equal(t, MaxPathSum(test), 18)
}

func NewBinaryTree(value int) *BinaryTree {
	return &BinaryTree{Value: value}
}

func (tree *BinaryTree) insertAll(values []int) *BinaryTree {
	for _, value := range values {
		tree.insert(value)
	}
	return tree
}

func (tree *BinaryTree) insert(value int) {
	queue := []*BinaryTree{tree}
	var current *BinaryTree
	for len(queue) > 0 {
		current, queue = queue[0], queue[1:]
		if current.Left == nil {
			current.Left = NewBinaryTree(value)
			break
		}
		queue = append(queue, current.Left)
		if current.Right == nil {
			current.Right = NewBinaryTree(value)
			break
		}
		queue = append(queue, current.Right)
	}
}

```
### Sandbox Code (java)
```java
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import java.util.ArrayDeque;

class ProgramTest {
  @Test
  public void TestCase1() {
    TestBinaryTree test = new TestBinaryTree(1);
    test.insert(new int[] {2, 3, 4, 5, 6, 7}, 0);
    Utils.assertTrue(Program.maxPathSum(test) == 18);
  }

  class TestBinaryTree extends Program.BinaryTree {
    public TestBinaryTree(int value) {
      super(value);
    }

    public void insert(int[] values, int i) {
      if (i >= values.length) {
        return;
      }
      ArrayDeque<Program.BinaryTree> queue = new ArrayDeque<Program.BinaryTree>();
      queue.addLast(this);
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
      insert(values, i + 1);
    }
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(log(n)) space
  public static int maxPathSum(BinaryTree tree) {
    List<Integer> maxSumArray = findMaxSum(tree);
    return maxSumArray.get(1);
  }

  public static List<Integer> findMaxSum(BinaryTree tree) {
    if (tree == null) {
      return new ArrayList<Integer>(Arrays.asList(0, Integer.MIN_VALUE));
    }
    List<Integer> leftMaxSumArray = findMaxSum(tree.left);
    Integer leftMaxSumAsBranch = leftMaxSumArray.get(0);
    Integer leftMaxPathSum = leftMaxSumArray.get(1);

    List<Integer> rightMaxSumArray = findMaxSum(tree.right);
    Integer rightMaxSumAsBranch = rightMaxSumArray.get(0);
    Integer rightMaxPathSum = rightMaxSumArray.get(1);

    Integer maxChildSumAsBranch = Math.max(leftMaxSumAsBranch, rightMaxSumAsBranch);
    Integer maxSumAsBranch = Math.max(maxChildSumAsBranch + tree.value, tree.value);
    Integer maxSumAsRootNode =
        Math.max(leftMaxSumAsBranch + tree.value + rightMaxSumAsBranch, maxSumAsBranch);
    int maxPathSum = Math.max(leftMaxPathSum, Math.max(rightMaxPathSum, maxSumAsRootNode));

    return new ArrayList<Integer>(Arrays.asList(maxSumAsBranch, maxPathSum));
  }

  static class BinaryTree {
    public int value;
    public BinaryTree left;
    public BinaryTree right;

    public BinaryTree(int value) {
      this.value = value;
    }
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.ArrayDeque;

class ProgramTest {
  @Test
  public void TestCase1() {
    TestBinaryTree test = new TestBinaryTree(1);
    test.insert(new int[] {2, 3, 4, 5, 6, 7}, 0);
    Utils.assertTrue(Program.maxPathSum(test) == 18);
  }

  class TestBinaryTree extends Program.BinaryTree {
    public TestBinaryTree(int value) {
      super(value);
    }

    public void insert(int[] values, int i) {
      if (i >= values.length) {
        return;
      }
      ArrayDeque<Program.BinaryTree> queue = new ArrayDeque<Program.BinaryTree>();
      queue.addLast(this);
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
      insert(values, i + 1);
    }
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
  const test = new BinaryTree(1).insert([2, 3, 4, 5, 6, 7]);
  chai.expect(program.maxPathSum(test)).to.deep.equal(18);
});

class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
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
}

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(log(n)) space
function maxPathSum(tree) {
  const [_, maxSum] = findMaxSum(tree);
  return maxSum;
}

function findMaxSum(tree) {
  if (tree === null) return [0, -Infinity];

  const [leftMaxSumAsBranch, leftMaxPathSum] = findMaxSum(tree.left);
  const [rightMaxSumAsBranch, rightMaxPathSum] = findMaxSum(tree.right);
  const maxChildSumAsBranch = Math.max(leftMaxSumAsBranch, rightMaxSumAsBranch);

  const {value} = tree;
  const maxSumAsBranch = Math.max(maxChildSumAsBranch + value, value);
  const maxSumAsRootNode = Math.max(leftMaxSumAsBranch + value + rightMaxSumAsBranch, maxSumAsBranch);
  const maxPathSum = Math.max(leftMaxPathSum, rightMaxPathSum, maxSumAsRootNode);

  return [maxSumAsBranch, maxPathSum];
}

exports.maxPathSum = maxPathSum;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const test = new BinaryTree(1).insert([2, 3, 4, 5, 6, 7]);
  chai.expect(program.maxPathSum(test)).to.deep.equal(18);
});

class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
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
}

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.BinaryTree as BinaryTree
import com.algoexpert.program.maxPathSum as maxPathSum

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

        val result = maxPathSum(tree)

        assert(result == 18)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

open class BinaryTree(value: Int) {
    var value = value
    var left: BinaryTree? = null
    var right: BinaryTree? = null
}

// O(n) time | O(log(n)) space
fun maxPathSum(tree: BinaryTree): Int {
    val (_, maxSumArray) = findMaxSum(tree)
    return maxSumArray
}

fun findMaxSum(tree: BinaryTree?): List<Int> {
    if (tree == null) return listOf(0, Int.MIN_VALUE)

    val (leftMaxSumAsBranch, leftMaxPathSum) = findMaxSum(tree.left)
    val (rightMaxSumAsBranch, rightMaxPathSum) = findMaxSum(tree.right)
    val maxChildSumAsBranch = max(leftMaxSumAsBranch, rightMaxSumAsBranch)

    val value = tree.value
    val maxSumAsBranch = max(maxChildSumAsBranch + value, value)
    val maxSumAsRootNode = max(leftMaxSumAsBranch + value + rightMaxSumAsBranch, maxSumAsBranch)
    val maxPathSum = listOf(leftMaxPathSum, rightMaxPathSum, maxSumAsRootNode).max()!!

    return listOf(maxSumAsBranch, maxPathSum)
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.BinaryTree as BinaryTree
import com.algoexpert.program.maxPathSum as maxPathSum

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

        val result = maxPathSum(tree)

        assert(result == 18)
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
      let fourthTest = TestBinaryTree(value: 1).insert(values: [2, 3, 4, 5, 6, 7], index: 0)
      try assertEqual(18, program.maxPathSum(tree: fourthTest))
    }
  }
}

class TestBinaryTree: Program.BinaryTree {
  func insert(values: [Int], index: Int) -> Program.BinaryTree? {
    if index >= values.count { return nil }

    var queue: [Program.BinaryTree?] = [self]

    while queue.count > 0 {
      let current = queue.removeFirst()

      if current?.left === nil {
        current?.left = TestBinaryTree(value: values[index])
        break
      }

      queue.append(current?.left)

      if current?.right === nil {
        current?.right = TestBinaryTree(value: values[index])
        break
      }

      queue.append(current?.right)
    }

    insert(values: values, index: index + 1)
    return self
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
      left = nil
      right = nil
    }
  }

  // O(n) time | O(log(n)) space
  func maxPathSum(tree: BinaryTree?) -> Int {
    let rootMaxSumTuple = findMaxSum(tree: tree)
    return rootMaxSumTuple.1
  }

  func findMaxSum(tree: BinaryTree?) -> (Int, Int) {
    if tree === nil {
      return (0, Int.min)
    }

    let leftMaxSumTuple = findMaxSum(tree: tree?.left)
    let rightMaxSumTuple = findMaxSum(tree: tree?.right)
    let childStraightMaxSum = max(leftMaxSumTuple.0, rightMaxSumTuple.0)

    let value = tree!.value

    let currentStraightMaxSum = max(value + childStraightMaxSum, value)
    let currentTriangleMaxSum = max(leftMaxSumTuple.0 + value + rightMaxSumTuple.0, currentStraightMaxSum)
    let currentMaxSum = max(max(leftMaxSumTuple.1, rightMaxSumTuple.1), currentTriangleMaxSum)

    return (currentStraightMaxSum, currentMaxSum)
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let fourthTest = TestBinaryTree(value: 1).insert(values: [2, 3, 4, 5, 6, 7], index: 0)
      try assertEqual(18, program.maxPathSum(tree: fourthTest))
    }
  }
}

class TestBinaryTree: Program.BinaryTree {
  func insert(values: [Int], index: Int) -> Program.BinaryTree? {
    if index >= values.count { return nil }

    var queue: [Program.BinaryTree?] = [self]

    while queue.count > 0 {
      let current = queue.removeFirst()

      if current?.left === nil {
        current?.left = TestBinaryTree(value: values[index])
        break
      }

      queue.append(current?.left)

      if current?.right === nil {
        current?.right = TestBinaryTree(value: values[index])
        break
      }

      queue.append(current?.right)
    }

    insert(values: values, index: index + 1)
    return self
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
        test = BinaryTree(1).insert([2, 3, 4, 5, 6, 7])
        self.assertEqual(program.maxPathSum(test), 18)


class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

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

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(log(n)) space
def maxPathSum(tree):
    _, maxSum = findMaxSum(tree)
    return maxSum


def findMaxSum(tree):
    if tree is None:
        return (0, float("-inf"))

    leftMaxSumAsBranch, leftMaxPathSum = findMaxSum(tree.left)
    rightMaxSumAsBranch, rightMaxPathSum = findMaxSum(tree.right)
    maxChildSumAsBranch = max(leftMaxSumAsBranch, rightMaxSumAsBranch)

    value = tree.value
    maxSumAsBranch = max(maxChildSumAsBranch + value, value)
    maxSumAsRootNode = max(leftMaxSumAsBranch + value + rightMaxSumAsBranch, maxSumAsBranch)
    maxPathSum = max(leftMaxPathSum, rightMaxPathSum, maxSumAsRootNode)

    return (maxSumAsBranch, maxPathSum)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        test = BinaryTree(1).insert([2, 3, 4, 5, 6, 7])
        self.assertEqual(program.maxPathSum(test), 18)


class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

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

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const test = new BinaryTree(1).insert([2, 3, 4, 5, 6, 7]);
  chai.expect(program.maxPathSum(test)).to.deep.equal(18);
});

class BinaryTree {
  value: number;
  left: BinaryTree | null;
  right: BinaryTree | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(values: number[], i = 0): BinaryTree {
    if (i >= values.length) return this;
    const queue: BinaryTree[] = [this];
    while (queue.length > 0) {
      let current = queue.shift()!;
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

// O(n) time | O(log(n)) space
export function maxPathSum(tree: BinaryTree) {
  const [_, maxSum] = findMaxSum(tree);
  return maxSum;
}

function findMaxSum(tree: BinaryTree | null) {
  if (tree === null) return [0, -Infinity];

  const [leftMaxSumAsBranch, leftMaxPathSum] = findMaxSum(tree.left);
  const [rightMaxSumAsBranch, rightMaxPathSum] = findMaxSum(tree.right);
  const maxChildSumAsBranch = Math.max(leftMaxSumAsBranch, rightMaxSumAsBranch);

  const {value} = tree;
  const maxSumAsBranch = Math.max(maxChildSumAsBranch + value, value);
  const maxSumAsRootNode = Math.max(leftMaxSumAsBranch + value + rightMaxSumAsBranch, maxSumAsBranch);
  const maxPathSum = Math.max(leftMaxPathSum, rightMaxPathSum, maxSumAsRootNode);

  return [maxSumAsBranch, maxPathSum];
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const test = new BinaryTree(1).insert([2, 3, 4, 5, 6, 7]);
  chai.expect(program.maxPathSum(test)).to.deep.equal(18);
});

class BinaryTree {
  value: number;
  left: BinaryTree | null;
  right: BinaryTree | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(values: number[], i = 0): BinaryTree {
    if (i >= values.length) return this;
    const queue: BinaryTree[] = [this];
    while (queue.length > 0) {
      let current = queue.shift()!;
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
}

```

