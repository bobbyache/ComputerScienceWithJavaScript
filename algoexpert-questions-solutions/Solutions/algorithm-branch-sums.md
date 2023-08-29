# Branch Sums
<div class="html">
<p>
  Write a function that takes in a Binary Tree and returns a list of its branch
  sums ordered from leftmost branch sum to rightmost branch sum.
</p>
<p>
  A branch sum is the sum of all values in a Binary Tree branch. A Binary Tree
  branch is a path of nodes in a tree that starts at the root node and ends at
  any leaf node.
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
        /     \
       2       3
     /   \    /  \
    4     5  6    7
  /   \  /
 8    9 10
</pre>
<h3>Sample Output</h3>
<pre>
[15, 16, 18, 10, 11]
<span class="CodeEditor-promptComment">// 15 == 1 + 2 + 4 + 8</span>
<span class="CodeEditor-promptComment">// 16 == 1 + 2 + 4 + 9</span>
<span class="CodeEditor-promptComment">// 18 == 1 + 2 + 5 + 10</span>
<span class="CodeEditor-promptComment">// 10 == 1 + 3 + 6</span>
<span class="CodeEditor-promptComment">// 11 == 1 + 3 + 7</span>
</pre>
</div>

Hint 1
<p>
Try traversing the Binary Tree in a depth-first-search-like fashion.
</p>


Hint 2

<p>
Recursively traverse the Binary Tree in a depth-first-search-like fashion, and pass a running sum of the values of every previously-visited node to each node that you're traversing.
</p>


Hint 3

<p>
As you recursively traverse the tree, if you reach a leaf node (a node with no "left" or "right" Binary Tree nodes), add the relevant running sum that you've calculated to a list of sums (which you'll also have to pass to the recursive function). If you reach a node that isn't a leaf node, keep recursively traversing its children nodes, passing the correctly updated running sum to them.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

class TestBinaryTree : public BinaryTree {
public:
  TestBinaryTree(int value) : BinaryTree(value){};

  BinaryTree *insert(vector<int> values, int i = 0) {
    if (i >= values.size())
      return nullptr;
    vector<BinaryTree *> queue = {this};
    while (queue.size() > 0) {
      BinaryTree *current = queue[0];
      queue.erase(queue.begin());
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
    insert(values, i + 1);
    return this;
  }
};

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      TestBinaryTree *tree = new TestBinaryTree(1);
      tree->insert({2, 3, 4, 5, 6, 7, 8, 9, 10});
      vector<int> expected = {15, 16, 18, 10, 11};
      assert(branchSums(tree) == expected);
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

  BinaryTree(int value) {
    this->value = value;
    left = nullptr;
    right = nullptr;
  }
};

void calculateBranchSums(BinaryTree *node, int runningSum, vector<int> &sums);

// O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
vector<int> branchSums(BinaryTree *root) {
  vector<int> sums;
  calculateBranchSums(root, 0, sums);
  return sums;
}

void calculateBranchSums(BinaryTree *node, int runningSum, vector<int> &sums) {
  if (node == nullptr)
    return;

  int newRunningSum = runningSum + node->value;
  if (node->left == nullptr && node->right == nullptr) {
    sums.push_back(newRunningSum);
    return;
  }

  calculateBranchSums(node->left, newRunningSum, sums);
  calculateBranchSums(node->right, newRunningSum, sums);
}

```
### Unit Tests 1 (cpp)
```cpp
class TestBinaryTree : public BinaryTree {
public:
  TestBinaryTree(int value) : BinaryTree(value){};

  BinaryTree *insert(vector<int> values, int i = 0) {
    if (i >= values.size())
      return nullptr;
    vector<BinaryTree *> queue = {this};
    while (queue.size() > 0) {
      BinaryTree *current = queue[0];
      queue.erase(queue.begin());
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
    insert(values, i + 1);
    return this;
  }
};

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      TestBinaryTree *tree = new TestBinaryTree(1);
      tree->insert({2, 3, 4, 5, 6, 7, 8, 9, 10});
      vector<int> expected = {15, 16, 18, 10, 11};
      assert(branchSums(tree) == expected);
    });
  }
};

```
### Sandbox Code (csharp)
```csharp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

using System.Linq;
using System.Collections.Generic;

public class ProgramTest {

	public class TestBinaryTree : Program.BinaryTree {
		public TestBinaryTree(int value) : base(value) {
		}

		public TestBinaryTree Insert(List<int> values) {
			return Insert(values, 0);
		}

		public TestBinaryTree Insert(List<int> values, int i) {
			if (i >= values.Count) return null;

			List<TestBinaryTree> queue = new List<TestBinaryTree>();
			queue.Add(this);
			while (queue.Count > 0) {
				TestBinaryTree current = queue[0];
				queue.RemoveAt(0);
				if (current.left == null) {
					current.left = new TestBinaryTree(values[i]);
					break;
				}
				queue.Add((TestBinaryTree) current.left);
				if (current.right == null) {
					current.right = new TestBinaryTree(values[i]);
					break;
				}
				queue.Add((TestBinaryTree) current.right);
			}
			Insert(values, i + 1);
			return this;
		}
	}

	[Test]
	public void TestCase1() {
		TestBinaryTree tree = new TestBinaryTree(1).Insert(new List<int>(){
			2, 3, 4, 5, 6, 7, 8, 9, 10
		});
		List<int> expected = new List<int>(){
			15, 16, 18, 10, 11
		};
		Utils.AssertTrue(Program.BranchSums(tree).SequenceEqual(expected));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	public class BinaryTree {
		public int value;
		public BinaryTree left;
		public BinaryTree right;

		public BinaryTree(int value) {
			this.value = value;
			this.left = null;
			this.right = null;
		}
	}

	// O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
	public static List<int> BranchSums(BinaryTree root) {
		List<int> sums = new List<int>();
		calculateBranchSums(root, 0, sums);
		return sums;
	}

	public static void calculateBranchSums(BinaryTree node, int runningSum, List<int> sums) {
		if (node == null) return;

		int newRunningSum = runningSum + node.value;
		if (node.left == null && node.right == null) {
			sums.Add(newRunningSum);
			return;
		}

		calculateBranchSums(node.left, newRunningSum, sums);
		calculateBranchSums(node.right, newRunningSum, sums);
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Linq;
using System.Collections.Generic;

public class ProgramTest {

	public class TestBinaryTree : Program.BinaryTree {
		public TestBinaryTree(int value) : base(value) {
		}

		public TestBinaryTree Insert(List<int> values) {
			return Insert(values, 0);
		}

		public TestBinaryTree Insert(List<int> values, int i) {
			if (i >= values.Count) return null;

			List<TestBinaryTree> queue = new List<TestBinaryTree>();
			queue.Add(this);
			while (queue.Count > 0) {
				TestBinaryTree current = queue[0];
				queue.RemoveAt(0);
				if (current.left == null) {
					current.left = new TestBinaryTree(values[i]);
					break;
				}
				queue.Add((TestBinaryTree) current.left);
				if (current.right == null) {
					current.right = new TestBinaryTree(values[i]);
					break;
				}
				queue.Add((TestBinaryTree) current.right);
			}
			Insert(values, i + 1);
			return this;
		}
	}

	[Test]
	public void TestCase1() {
		TestBinaryTree tree = new TestBinaryTree(1).Insert(new List<int>(){
			2, 3, 4, 5, 6, 7, 8, 9, 10
		});
		List<int> expected = new List<int>(){
			15, 16, 18, 10, 11
		};
		Utils.AssertTrue(Program.BranchSums(tree).SequenceEqual(expected));
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
	tree := NewBinaryTree(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
	expected := []int{15, 16, 18, 10, 11}
	output := BranchSums(tree)
	require.Equal(t, expected, output)
}

func NewBinaryTree(root int, values ...int) *BinaryTree {
	tree := &BinaryTree{Value: root}
	tree.Insert(values, 0)
	return tree
}

func (tree *BinaryTree) Insert(values []int, i int) *BinaryTree {
	if i >= len(values) {
		return tree
	}
	val := values[i]

	queue := []*BinaryTree{tree}
	for len(queue) > 0 {
		var current *BinaryTree
		current, queue = queue[0], queue[1:]
		if current.Left == nil {
			current.Left = &BinaryTree{Value: val}
			break
		}
		queue = append(queue, current.Left)

		if current.Right == nil {
			current.Right = &BinaryTree{Value: val}
			break
		}
		queue = append(queue, current.Right)
	}

	tree.Insert(values, i+1)
	return tree
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

// O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
func BranchSums(root *BinaryTree) []int {
	sums := []int{}
	calculateBranchSums(root, 0, &sums)
	return sums
}

func calculateBranchSums(node *BinaryTree,
	runningSum int, sums *[]int) {
	if node == nil {
		return
	}

	runningSum += node.Value
	if node.Left == nil && node.Right == nil {
		*sums = append(*sums, runningSum)
		return
	}

	calculateBranchSums(node.Left, runningSum, sums)
	calculateBranchSums(node.Right, runningSum, sums)
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	tree := NewBinaryTree(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
	expected := []int{15, 16, 18, 10, 11}
	output := BranchSums(tree)
	require.Equal(t, expected, output)
}

func NewBinaryTree(root int, values ...int) *BinaryTree {
	tree := &BinaryTree{Value: root}
	tree.Insert(values, 0)
	return tree
}

func (tree *BinaryTree) Insert(values []int, i int) *BinaryTree {
	if i >= len(values) {
		return tree
	}
	val := values[i]

	queue := []*BinaryTree{tree}
	for len(queue) > 0 {
		var current *BinaryTree
		current, queue = queue[0], queue[1:]
		if current.Left == nil {
			current.Left = &BinaryTree{Value: val}
			break
		}
		queue = append(queue, current.Left)

		if current.Right == nil {
			current.Right = &BinaryTree{Value: val}
			break
		}
		queue = append(queue, current.Right)
	}

	tree.Insert(values, i+1)
	return tree
}

```
### Sandbox Code (java)
```java
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import java.util.*;

class ProgramTest {

  public class TestBinaryTree extends Program.BinaryTree {
    TestBinaryTree(int value) {
      super(value);
    }

    TestBinaryTree insert(List<Integer> values) {
      return insert(values, 0);
    }

    TestBinaryTree insert(List<Integer> values, int i) {
      if (i >= values.size()) return null;

      List<TestBinaryTree> queue = new ArrayList<TestBinaryTree>();
      queue.add(this);
      while (queue.size() > 0) {
        TestBinaryTree current = queue.get(0);
        queue.remove(0);
        if (current.left == null) {
          current.left = new TestBinaryTree(values.get(i));
          break;
        }
        queue.add((TestBinaryTree) current.left);
        if (current.right == null) {
          current.right = new TestBinaryTree(values.get(i));
          break;
        }
        queue.add((TestBinaryTree) current.right);
      }
      insert(values, i + 1);
      return this;
    }
  }

  @Test
  public void TestCase1() {
    TestBinaryTree tree = new TestBinaryTree(1).insert(Arrays.asList(2, 3, 4, 5, 6, 7, 8, 9, 10));
    List<Integer> expected = new ArrayList<Integer>(Arrays.asList(15, 16, 18, 10, 11));
    Utils.assertTrue(Program.branchSums(tree).equals(expected));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  public static class BinaryTree {
    int value;
    BinaryTree left;
    BinaryTree right;

    BinaryTree(int value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  // O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
  public static List<Integer> branchSums(BinaryTree root) {
    List<Integer> sums = new ArrayList<Integer>();
    calculateBranchSums(root, 0, sums);
    return sums;
  }

  public static void calculateBranchSums(BinaryTree node, int runningSum, List<Integer> sums) {
    if (node == null) return;

    int newRunningSum = runningSum + node.value;
    if (node.left == null && node.right == null) {
      sums.add(newRunningSum);
      return;
    }

    calculateBranchSums(node.left, newRunningSum, sums);
    calculateBranchSums(node.right, newRunningSum, sums);
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {

  public class TestBinaryTree extends Program.BinaryTree {
    TestBinaryTree(int value) {
      super(value);
    }

    TestBinaryTree insert(List<Integer> values) {
      return insert(values, 0);
    }

    TestBinaryTree insert(List<Integer> values, int i) {
      if (i >= values.size()) return null;

      List<TestBinaryTree> queue = new ArrayList<TestBinaryTree>();
      queue.add(this);
      while (queue.size() > 0) {
        TestBinaryTree current = queue.get(0);
        queue.remove(0);
        if (current.left == null) {
          current.left = new TestBinaryTree(values.get(i));
          break;
        }
        queue.add((TestBinaryTree) current.left);
        if (current.right == null) {
          current.right = new TestBinaryTree(values.get(i));
          break;
        }
        queue.add((TestBinaryTree) current.right);
      }
      insert(values, i + 1);
      return this;
    }
  }

  @Test
  public void TestCase1() {
    TestBinaryTree tree = new TestBinaryTree(1).insert(Arrays.asList(2, 3, 4, 5, 6, 7, 8, 9, 10));
    List<Integer> expected = new ArrayList<Integer>(Arrays.asList(15, 16, 18, 10, 11));
    Utils.assertTrue(Program.branchSums(tree).equals(expected));
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
  const tree = new BinaryTree(1).insert([2, 3, 4, 5, 6, 7, 8, 9, 10]);
  chai.expect(program.branchSums(tree)).to.deep.equal([15, 16, 18, 10, 11]);
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
function branchSums(root) {
  const sums = [];
  calculateBranchSums(root, 0, sums);
  return sums;
}

function calculateBranchSums(node, runningSum, sums) {
  if (!node) return;

  const newRunningSum = runningSum + node.value;
  if (!node.left && !node.right) {
    sums.push(newRunningSum);
    return;
  }

  calculateBranchSums(node.left, newRunningSum, sums);
  calculateBranchSums(node.right, newRunningSum, sums);
}

exports.BinaryTree = BinaryTree;
exports.branchSums = branchSums;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const tree = new BinaryTree(1).insert([2, 3, 4, 5, 6, 7, 8, 9, 10]);
  chai.expect(program.branchSums(tree)).to.deep.equal([15, 16, 18, 10, 11]);
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
}

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.BinaryTree as BinaryTree
import com.algoexpert.program.branchSums as branchSums

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
        tree.left!!.right!!.left = BinaryTree(10)

        val result = branchSums(tree)
        val expected = listOf(15, 16, 18, 10, 11)

        assert(result == expected)
    }
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
fun branchSums(root: BinaryTree): List<Int> {
    val sums = mutableListOf<Int>()
    calculateBranchSums(root, 0, sums)
    return sums
}

fun calculateBranchSums(node: BinaryTree?, runningSum: Int, sums: MutableList<Int>) {
    if (node == null) return

    val newRunningSum = runningSum + node.value
    if (node.left == null && node.right == null) {
        sums.add(newRunningSum)
        return
    }

    calculateBranchSums(node.left, newRunningSum, sums)
    calculateBranchSums(node.right, newRunningSum, sums)
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.BinaryTree as BinaryTree
import com.algoexpert.program.branchSums as branchSums

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
        tree.left!!.right!!.left = BinaryTree(10)

        val result = branchSums(tree)
        val expected = listOf(15, 16, 18, 10, 11)

        assert(result == expected)
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
      var tree = Program.BST(value: 1)
      tree.left = Program.BST(value: 2)
      tree.right = Program.BST(value: 3)
      tree.left!.left = Program.BST(value: 4)
      tree.left!.right = Program.BST(value: 5)
      tree.right!.left = Program.BST(value: 6)
      tree.right!.right = Program.BST(value: 7)
      tree.left!.left!.left = Program.BST(value: 8)
      tree.left!.left!.right = Program.BST(value: 9)
      tree.left!.right!.left = Program.BST(value: 10)
      var expected: [Int] = [15, 16, 18, 10, 11]
      var output = program.branchSums(root: tree)
      try assertEqual(expected, output)
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
    }
  }

  // O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
  func branchSums(root: BST) -> [Int] {
    var sums = [Int]()
    calculateBranchSums(node: root, runningSum: 0, sums: &sums)
    return sums
  }

  func calculateBranchSums(node: BST?, runningSum: Int, sums: inout [Int]) {
    if let n = node {
      let newRunningSum = runningSum + n.value
      if n.left == nil, n.right == nil {
        sums.append(newRunningSum)
        return
      }
      calculateBranchSums(node: n.left, runningSum: newRunningSum, sums: &sums)
      calculateBranchSums(node: n.right, runningSum: newRunningSum, sums: &sums)
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
      var tree = Program.BST(value: 1)
      tree.left = Program.BST(value: 2)
      tree.right = Program.BST(value: 3)
      tree.left!.left = Program.BST(value: 4)
      tree.left!.right = Program.BST(value: 5)
      tree.right!.left = Program.BST(value: 6)
      tree.right!.right = Program.BST(value: 7)
      tree.left!.left!.left = Program.BST(value: 8)
      tree.left!.left!.right = Program.BST(value: 9)
      tree.left!.right!.left = Program.BST(value: 10)
      var expected: [Int] = [15, 16, 18, 10, 11]
      var output = program.branchSums(root: tree)
      try assertEqual(expected, output)
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
        tree = BinaryTree(1).insert([2, 3, 4, 5, 6, 7, 8, 9, 10])
        self.assertEqual(program.branchSums(tree), [15, 16, 18, 10, 11])


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

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


# O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
def branchSums(root):
    sums = []
    calculateBranchSums(root, 0, sums)
    return sums


def calculateBranchSums(node, runningSum, sums):
    if node is None:
        return

    newRunningSum = runningSum + node.value
    if node.left is None and node.right is None:
        sums.append(newRunningSum)
        return

    calculateBranchSums(node.left, newRunningSum, sums)
    calculateBranchSums(node.right, newRunningSum, sums)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        tree = BinaryTree(1).insert([2, 3, 4, 5, 6, 7, 8, 9, 10])
        self.assertEqual(program.branchSums(tree), [15, 16, 18, 10, 11])


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

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const tree = new BinaryTree(1).insert([2, 3, 4, 5, 6, 7, 8, 9, 10]);
  chai.expect(program.branchSums(tree!)).to.deep.equal([15, 16, 18, 10, 11]);
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

  insert(values: number[], i = 0) {
    if (i >= values.length) return;
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

// O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
export function branchSums(root: BinaryTree) {
  const sums: number[] = [];
  calculateBranchSums(root, 0, sums);
  return sums;
}

function calculateBranchSums(node: BinaryTree | null, runningSum: number, sums: number[]) {
  if (!node) return;

  const newRunningSum = runningSum + node.value;
  if (!node.left && !node.right) {
    sums.push(newRunningSum);
    return;
  }

  calculateBranchSums(node.left, newRunningSum, sums);
  calculateBranchSums(node.right, newRunningSum, sums);
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const tree = new BinaryTree(1).insert([2, 3, 4, 5, 6, 7, 8, 9, 10]);
  chai.expect(program.branchSums(tree!)).to.deep.equal([15, 16, 18, 10, 11]);
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

  insert(values: number[], i = 0) {
    if (i >= values.length) return;
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

