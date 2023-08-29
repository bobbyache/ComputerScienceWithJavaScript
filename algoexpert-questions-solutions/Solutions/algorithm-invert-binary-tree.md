# Invert Binary Tree
<div class="html">
<p>
  Write a function that takes in a Binary Tree and inverts it. In other words,
  the function should swap every left node in the tree for its corresponding
  right node.
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
       1
    /     \
   3       2
 /   \   /   \
7     6 5     4
            /   \
           9     8
</pre>
</div>

Hint 1
<p>
Start by inverting the root node of the Binary Tree. Inverting this root node simply consists of swapping its left and right child nodes, which can be done the same way as swapping two variables.
</p>


Hint 2

<p>
Once the first swap mentioned in Hint #1 is done, you must invert the root node's left child node and its right child node. You can do so just as you did for the root node. Then, you will have to continue inverting child nodes' nodes until you reach the bottom of the tree.
</p>


Hint 3

<p>
How can you accomplish the process described in Hint #2? While recursion seems appropriate, would an iterative approach work? What would be the time and space complexity implications of both approaches?
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

void BinaryTree::invertedInsert(vector<int> values, int i) {
  if (i >= values.size()) {
    return;
  }
  deque<BinaryTree *> queue;
  queue.push_back(this);
  while (queue.size() > 0) {
    BinaryTree *current = queue.front();
    queue.pop_front();
    if (current->right == nullptr) {
      current->right = new BinaryTree(values[i]);
      break;
    }
    queue.push_back(current->right);
    if (current->left == nullptr) {
      current->left = new BinaryTree(values[i]);
      break;
    }
    queue.push_back(current->left);
  }
  this->invertedInsert(values, i + 1);
}

bool compareBT(BinaryTree *a, BinaryTree *b) {
  if (a == nullptr && b == nullptr) {
    return true;
  }
  if (a != nullptr && b != nullptr) {
    return a->value == b->value && compareBT(a->left, b->left) &&
           compareBT(a->right, b->right);
  }
  return false;
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      BinaryTree tree(1);
      tree.insert({2, 3, 4, 5, 6, 7, 8, 9});
      invertBinaryTree(&tree);
      BinaryTree invertedTree(1);
      invertedTree.invertedInsert({2, 3, 4, 5, 6, 7, 8, 9});
      assert(compareBT(&tree, &invertedTree) == 1);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <deque>
using namespace std;

class BinaryTree {
public:
  int value;
  BinaryTree *left;
  BinaryTree *right;

  BinaryTree(int value);
  void insert(vector<int> values, int i = 0);
  void invertedInsert(vector<int> values, int i = 0);
};

// O(n) time | O(n) space
void invertBinaryTree(BinaryTree *tree) {
  deque<BinaryTree *> queue;
  queue.push_back(tree);
  while (queue.size() > 0) {
    BinaryTree *current = queue.front();
    queue.pop_front();
    if (current == nullptr) {
      continue;
    }
    swap(current->left, current->right);
    queue.push_back(current->left);
    queue.push_back(current->right);
  }
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
  BinaryTree *left;
  BinaryTree *right;

  BinaryTree(int value);
  void insert(vector<int> values, int i = 0);
  void invertedInsert(vector<int> values, int i = 0);
};

// O(n) time | O(d) space
void invertBinaryTree(BinaryTree *tree) {
  if (tree == nullptr) {
    return;
  }
  swap(tree->left, tree->right);
  invertBinaryTree(tree->left);
  invertBinaryTree(tree->right);
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

void BinaryTree::invertedInsert(vector<int> values, int i) {
  if (i >= values.size()) {
    return;
  }
  deque<BinaryTree *> queue;
  queue.push_back(this);
  while (queue.size() > 0) {
    BinaryTree *current = queue.front();
    queue.pop_front();
    if (current->right == nullptr) {
      current->right = new BinaryTree(values[i]);
      break;
    }
    queue.push_back(current->right);
    if (current->left == nullptr) {
      current->left = new BinaryTree(values[i]);
      break;
    }
    queue.push_back(current->left);
  }
  this->invertedInsert(values, i + 1);
}

bool compareBT(BinaryTree *a, BinaryTree *b) {
  if (a == nullptr && b == nullptr) {
    return true;
  }
  if (a != nullptr && b != nullptr) {
    return a->value == b->value && compareBT(a->left, b->left) &&
           compareBT(a->right, b->right);
  }
  return false;
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      BinaryTree tree(1);
      tree.insert({2, 3, 4, 5, 6, 7, 8, 9});
      invertBinaryTree(&tree);
      BinaryTree invertedTree(1);
      invertedTree.invertedInsert({2, 3, 4, 5, 6, 7, 8, 9});
      assert(compareBT(&tree, &invertedTree) == 1);
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
		TestBinaryTree tree = new TestBinaryTree(1);
		tree.insert(new int[] {2, 3, 4, 5, 6, 7, 8, 9}, 0);
		Program.InvertBinaryTree(tree);
		InvertedBinaryTree invertedTree = new InvertedBinaryTree(1);
		invertedTree.insert(new int[] {2, 3, 4, 5, 6, 7, 8, 9}, 0);
		Utils.AssertTrue(compareBT(tree, invertedTree));
	}

	private bool compareBT(Program.BinaryTree tree1, InvertedBinaryTree tree2) {
		if (tree1 == null && tree2 == null) {
			return true;
		}
		if (tree1 != null && tree2 != null) {
			return tree1.value == tree2.value &&
			       compareBT(tree1.left, tree2.left) && compareBT(tree1.right,
			         tree2.right);
		}
		return false;
	}

	class InvertedBinaryTree {
		public int value;
		public InvertedBinaryTree left;
		public InvertedBinaryTree right;

		public InvertedBinaryTree(int value) {
			this.value = value;
		}

		public void insert(int[] values, int i) {
			if (i >= values.Length) {
				return;
			}
			List<InvertedBinaryTree> queue = new List<InvertedBinaryTree>();
			queue.Add(this);
			var index = 0;
			while (index < queue.Count) {
				InvertedBinaryTree current = queue[index];
				index += 1;
				if (current.right == null) {
					current.right = new InvertedBinaryTree(values[i]);
					break;
				}
				queue.Add(current.right);
				if (current.left == null) {
					current.left = new InvertedBinaryTree(values[i]);
					break;
				}
				queue.Add(current.left);
			}
			insert(values, i + 1);
		}
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

using System.Collections.Generic;

public class Program {
	// O(n) time | O(n) space
	public static void InvertBinaryTree(BinaryTree tree) {
		List<BinaryTree> queue = new List<BinaryTree>();
		queue.Add(tree);
		var index = 0;
		while (index < queue.Count) {
			BinaryTree current = queue[index];
			index += 1;
			if (current == null) {
				continue;
			}
			swapLeftAndRight(current);
			if (current.left != null) {
				queue.Add(current.left);
			}
			if (current.right != null) {
				queue.Add(current.right);
			}
		}
	}

	private static void swapLeftAndRight(BinaryTree tree) {
		BinaryTree left = tree.left;
		tree.left = tree.right;
		tree.right = left;
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
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.


public class Program {
	// O(n) time | O(d) space
	public static void InvertBinaryTree(BinaryTree tree) {
		if (tree == null) {
			return;
		}
		swapLeftAndRight(tree);
		InvertBinaryTree(tree.left);
		InvertBinaryTree(tree.right);
	}

	private static void swapLeftAndRight(BinaryTree tree) {
		BinaryTree left = tree.left;
		tree.left = tree.right;
		tree.right = left;
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
		TestBinaryTree tree = new TestBinaryTree(1);
		tree.insert(new int[] {2, 3, 4, 5, 6, 7, 8, 9}, 0);
		Program.InvertBinaryTree(tree);
		InvertedBinaryTree invertedTree = new InvertedBinaryTree(1);
		invertedTree.insert(new int[] {2, 3, 4, 5, 6, 7, 8, 9}, 0);
		Utils.AssertTrue(compareBT(tree, invertedTree));
	}

	private bool compareBT(Program.BinaryTree tree1, InvertedBinaryTree tree2) {
		if (tree1 == null && tree2 == null) {
			return true;
		}
		if (tree1 != null && tree2 != null) {
			return tree1.value == tree2.value &&
			       compareBT(tree1.left, tree2.left) && compareBT(tree1.right,
			         tree2.right);
		}
		return false;
	}

	class InvertedBinaryTree {
		public int value;
		public InvertedBinaryTree left;
		public InvertedBinaryTree right;

		public InvertedBinaryTree(int value) {
			this.value = value;
		}

		public void insert(int[] values, int i) {
			if (i >= values.Length) {
				return;
			}
			List<InvertedBinaryTree> queue = new List<InvertedBinaryTree>();
			queue.Add(this);
			var index = 0;
			while (index < queue.Count) {
				InvertedBinaryTree current = queue[index];
				index += 1;
				if (current.right == null) {
					current.right = new InvertedBinaryTree(values[i]);
					break;
				}
				queue.Add(current.right);
				if (current.left == null) {
					current.left = new InvertedBinaryTree(values[i]);
					break;
				}
				queue.Add(current.left);
			}
			insert(values, i + 1);
		}
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

func NewBinaryTree(root int, values ...int) *BinaryTree {
	tree := &BinaryTree{Value: root}
	for _, value := range values {
		tree.Insert(value)
	}
	return tree
}

func (tree *BinaryTree) Insert(value int) *BinaryTree {
	queue := []*BinaryTree{tree}
	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]
		if current.Left == nil {
			current.Left = NewBinaryTree(value)
			break
		} else if current.Right == nil {
			current.Right = NewBinaryTree(value)
			break
		}
		queue = append(queue, current.Left, current.Right)
	}
	return tree
}

func (tree *BinaryTree) InvertedInsert(value int) *BinaryTree {
	queue := []*BinaryTree{tree}
	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]
		if current.Right == nil {
			current.Right = NewBinaryTree(value)
			break
		} else if current.Left == nil {
			current.Left = NewBinaryTree(value)
			break
		}
		queue = append(queue, current.Right, current.Left)
	}
	return tree
}

func (tree *BinaryTree) Equals(other *BinaryTree) bool {
	if other == nil || tree.Value != other.Value {
		return false
	}
	if tree.Left != nil && !tree.Left.Equals(other.Left) {
		return false
	}
	if tree.Right != nil && !tree.Right.Equals(other.Right) {
		return false
	}
	return true
}

func (tree *BinaryTree) InsertAll(values ...int) *BinaryTree {
	for _, value := range values {
		tree.Insert(value)
	}
	return tree
}

func (tree *BinaryTree) InvertedInsertAll(values ...int) *BinaryTree {
	for _, value := range values {
		tree.InvertedInsert(value)
	}
	return tree
}

func (s *TestSuite) TestCase1(t *TestCase) {
	output := NewBinaryTree(1).InsertAll(2, 3, 4, 5, 6, 7, 8, 9)
	output.InvertBinaryTree()
	expected := NewBinaryTree(1).InvertedInsertAll(2, 3, 4, 5, 6, 7, 8, 9)
	require.True(t, output.Equals(expected))
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

// O(n) time | O(n) space
func (tree *BinaryTree) InvertBinaryTree() {
	queue := []*BinaryTree{tree}
	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]
		if current == nil {
			continue
		}
		current.Left, current.Right = current.Right, current.Left
		queue = append(queue, current.Left, current.Right)
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

// O(n) time | O(d) space
func (tree *BinaryTree) InvertBinaryTree() {
	tree.Left, tree.Right = tree.Right, tree.Left
	if tree.Left != nil {
		tree.Left.InvertBinaryTree()
	}
	if tree.Right != nil {
		tree.Right.InvertBinaryTree()
	}
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func NewBinaryTree(root int, values ...int) *BinaryTree {
	tree := &BinaryTree{Value: root}
	for _, value := range values {
		tree.Insert(value)
	}
	return tree
}

func (tree *BinaryTree) Insert(value int) *BinaryTree {
	queue := []*BinaryTree{tree}
	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]
		if current.Left == nil {
			current.Left = NewBinaryTree(value)
			break
		} else if current.Right == nil {
			current.Right = NewBinaryTree(value)
			break
		}
		queue = append(queue, current.Left, current.Right)
	}
	return tree
}

func (tree *BinaryTree) InvertedInsert(value int) *BinaryTree {
	queue := []*BinaryTree{tree}
	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]
		if current.Right == nil {
			current.Right = NewBinaryTree(value)
			break
		} else if current.Left == nil {
			current.Left = NewBinaryTree(value)
			break
		}
		queue = append(queue, current.Right, current.Left)
	}
	return tree
}

func (tree *BinaryTree) Equals(other *BinaryTree) bool {
	if other == nil || tree.Value != other.Value {
		return false
	}
	if tree.Left != nil && !tree.Left.Equals(other.Left) {
		return false
	}
	if tree.Right != nil && !tree.Right.Equals(other.Right) {
		return false
	}
	return true
}

func (tree *BinaryTree) InsertAll(values ...int) *BinaryTree {
	for _, value := range values {
		tree.Insert(value)
	}
	return tree
}

func (tree *BinaryTree) InvertedInsertAll(values ...int) *BinaryTree {
	for _, value := range values {
		tree.InvertedInsert(value)
	}
	return tree
}

func (s *TestSuite) TestCase1(t *TestCase) {
	output := NewBinaryTree(1).InsertAll(2, 3, 4, 5, 6, 7, 8, 9)
	output.InvertBinaryTree()
	expected := NewBinaryTree(1).InvertedInsertAll(2, 3, 4, 5, 6, 7, 8, 9)
	require.True(t, output.Equals(expected))
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
    TestBinaryTree tree = new TestBinaryTree(1);
    tree.insert(new int[] {2, 3, 4, 5, 6, 7, 8, 9}, 0);
    Program.invertBinaryTree(tree);
    InvertedBinaryTree invertedTree = new InvertedBinaryTree(1);
    invertedTree.insert(new int[] {2, 3, 4, 5, 6, 7, 8, 9}, 0);
    Utils.assertTrue(compareBT(tree, invertedTree));
  }

  private boolean compareBT(Program.BinaryTree tree1, InvertedBinaryTree tree2) {
    if (tree1 == null && tree2 == null) {
      return true;
    }
    if (tree1 != null && tree2 != null) {
      return tree1.value == tree2.value
          && compareBT(tree1.left, tree2.left)
          && compareBT(tree1.right, tree2.right);
    }
    return false;
  }

  class InvertedBinaryTree {
    public int value;
    public InvertedBinaryTree left;
    public InvertedBinaryTree right;

    public InvertedBinaryTree(int value) {
      this.value = value;
    }

    public void insert(int[] values, int i) {
      if (i >= values.length) {
        return;
      }
      ArrayDeque<InvertedBinaryTree> queue = new ArrayDeque<InvertedBinaryTree>();
      queue.addLast(this);
      while (queue.size() > 0) {
        InvertedBinaryTree current = queue.pollFirst();
        if (current.right == null) {
          current.right = new InvertedBinaryTree(values[i]);
          break;
        }
        queue.addLast(current.right);
        if (current.left == null) {
          current.left = new InvertedBinaryTree(values[i]);
          break;
        }
        queue.addLast(current.left);
      }
      insert(values, i + 1);
    }
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

import java.util.ArrayDeque;

class Program {
  // O(n) time | O(n) space
  public static void invertBinaryTree(BinaryTree tree) {
    ArrayDeque<BinaryTree> queue = new ArrayDeque<BinaryTree>();
    queue.addLast(tree);
    while (queue.size() > 0) {
      BinaryTree current = queue.pollFirst();
      swapLeftAndRight(current);
      if (current.left != null) {
        queue.addLast(current.left);
      }
      if (current.right != null) {
        queue.addLast(current.right);
      }
    }
  }

  private static void swapLeftAndRight(BinaryTree tree) {
    BinaryTree left = tree.left;
    tree.left = tree.right;
    tree.right = left;
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
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(d) space
  public static void invertBinaryTree(BinaryTree tree) {
    if (tree == null) {
      return;
    }
    swapLeftAndRight(tree);
    invertBinaryTree(tree.left);
    invertBinaryTree(tree.right);
  }

  private static void swapLeftAndRight(BinaryTree tree) {
    BinaryTree left = tree.left;
    tree.left = tree.right;
    tree.right = left;
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
    TestBinaryTree tree = new TestBinaryTree(1);
    tree.insert(new int[] {2, 3, 4, 5, 6, 7, 8, 9}, 0);
    Program.invertBinaryTree(tree);
    InvertedBinaryTree invertedTree = new InvertedBinaryTree(1);
    invertedTree.insert(new int[] {2, 3, 4, 5, 6, 7, 8, 9}, 0);
    Utils.assertTrue(compareBT(tree, invertedTree));
  }

  private boolean compareBT(Program.BinaryTree tree1, InvertedBinaryTree tree2) {
    if (tree1 == null && tree2 == null) {
      return true;
    }
    if (tree1 != null && tree2 != null) {
      return tree1.value == tree2.value
          && compareBT(tree1.left, tree2.left)
          && compareBT(tree1.right, tree2.right);
    }
    return false;
  }

  class InvertedBinaryTree {
    public int value;
    public InvertedBinaryTree left;
    public InvertedBinaryTree right;

    public InvertedBinaryTree(int value) {
      this.value = value;
    }

    public void insert(int[] values, int i) {
      if (i >= values.length) {
        return;
      }
      ArrayDeque<InvertedBinaryTree> queue = new ArrayDeque<InvertedBinaryTree>();
      queue.addLast(this);
      while (queue.size() > 0) {
        InvertedBinaryTree current = queue.pollFirst();
        if (current.right == null) {
          current.right = new InvertedBinaryTree(values[i]);
          break;
        }
        queue.addLast(current.right);
        if (current.left == null) {
          current.left = new InvertedBinaryTree(values[i]);
          break;
        }
        queue.addLast(current.left);
      }
      insert(values, i + 1);
    }
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

  invertedInsert(values, i = 0) {
    if (i >= values.length) return;
    const queue = [this];
    while (queue.length > 0) {
      let current = queue.shift();
      if (current.right === null) {
        current.right = new BinaryTree(values[i]);
        break;
      }
      queue.push(current.right);
      if (current.left === null) {
        current.left = new BinaryTree(values[i]);
        break;
      }
      queue.push(current.left);
    }
    this.invertedInsert(values, i + 1);
    return this;
  }
}

it('Test Case #1', function () {
  const tree = new BinaryTree(1).insert([2, 3, 4, 5, 6, 7, 8, 9]);
  const invertedTree = new BinaryTree(1).invertedInsert([2, 3, 4, 5, 6, 7, 8, 9]);
  program.invertBinaryTree(tree);
  chai.expect(tree).to.deep.equal(invertedTree);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space
function invertBinaryTree(tree) {
  const queue = [tree];
  while (queue.length) {
    const current = queue.shift();
    if (current === null) continue;
    swapLeftAndRight(current);
    queue.push(current.left);
    queue.push(current.right);
  }
}

function swapLeftAndRight(tree) {
  const left = tree.left;
  tree.left = tree.right;
  tree.right = left;
}

// This is the class of the input binary tree.
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

exports.invertBinaryTree = invertBinaryTree;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(d) space
function invertBinaryTree(tree) {
  if (tree === null) return;
  swapLeftAndRight(tree);
  invertBinaryTree(tree.left);
  invertBinaryTree(tree.right);
}

function swapLeftAndRight(tree) {
  const left = tree.left;
  tree.left = tree.right;
  tree.right = left;
}

// This is the class of the input binary tree.
class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

exports.invertBinaryTree = invertBinaryTree;

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

  invertedInsert(values, i = 0) {
    if (i >= values.length) return;
    const queue = [this];
    while (queue.length > 0) {
      let current = queue.shift();
      if (current.right === null) {
        current.right = new BinaryTree(values[i]);
        break;
      }
      queue.push(current.right);
      if (current.left === null) {
        current.left = new BinaryTree(values[i]);
        break;
      }
      queue.push(current.left);
    }
    this.invertedInsert(values, i + 1);
    return this;
  }
}

it('Test Case #1', function () {
  const tree = new BinaryTree(1).insert([2, 3, 4, 5, 6, 7, 8, 9]);
  const invertedTree = new BinaryTree(1).invertedInsert([2, 3, 4, 5, 6, 7, 8, 9]);
  program.invertBinaryTree(tree);
  chai.expect(tree).to.deep.equal(invertedTree);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.BinaryTree as BinaryTree
import com.algoexpert.program.invertBinaryTree as invertBinaryTree

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

        val invertedTree = BinaryTree(1)
        invertedTree.left = BinaryTree(3)
        invertedTree.right = BinaryTree(2)
        invertedTree.left!!.left = BinaryTree(7)
        invertedTree.left!!.right = BinaryTree(6)
        invertedTree.right!!.left = BinaryTree(5)
        invertedTree.right!!.right = BinaryTree(4)
        invertedTree.right!!.right!!.left = BinaryTree(9)
        invertedTree.right!!.right!!.right = BinaryTree(8)

        invertBinaryTree(tree)

        assert(treesAreEqual(tree, invertedTree))
    }
}

fun treesAreEqual(treeOne: BinaryTree?, treeTwo: BinaryTree?): Boolean {
    if (treeOne == null && treeTwo == null) return true
    if (treeOne != null && treeTwo == null) return false
    if (treeOne == null && treeTwo != null) return false
    if (treeOne!!.value != treeTwo!!.value) return false
    return treesAreEqual(treeOne.left, treeTwo.left) && treesAreEqual(treeOne.right, treeTwo.right)
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import java.util.ArrayDeque

open class BinaryTree(value: Int) {
    var value = value
    var left: BinaryTree? = null
    var right: BinaryTree? = null
}

// O(n) time | O(n) space - where n is the number of nodes in the Binary Tree
fun invertBinaryTree(tree: BinaryTree) {
    val queue = ArrayDeque<BinaryTree>()
    queue.addLast(tree)
    while (queue.size > 0) {
        val current = queue.pollFirst()
        swapLeftAndRight(current)
        if (current.left != null) queue.addLast(current.left)
        if (current.right != null) queue.addLast(current.right)
    }
}

fun swapLeftAndRight(tree: BinaryTree) {
    val left = tree.left
    tree.left = tree.right
    tree.right = left
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

// O(n) time | O(d) space - where n is the number of nodes in the 
// Binary Tree and d is the depth (height) of the Binary Tree
fun invertBinaryTree(tree: BinaryTree?) {
    if (tree == null) return
    swapLeftAndRight(tree)
    invertBinaryTree(tree.left)
    invertBinaryTree(tree.right)
}

fun swapLeftAndRight(tree: BinaryTree) {
    val left = tree.left
    tree.left = tree.right
    tree.right = left
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.BinaryTree as BinaryTree
import com.algoexpert.program.invertBinaryTree as invertBinaryTree

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

        val invertedTree = BinaryTree(1)
        invertedTree.left = BinaryTree(3)
        invertedTree.right = BinaryTree(2)
        invertedTree.left!!.left = BinaryTree(7)
        invertedTree.left!!.right = BinaryTree(6)
        invertedTree.right!!.left = BinaryTree(5)
        invertedTree.right!!.right = BinaryTree(4)
        invertedTree.right!!.right!!.left = BinaryTree(9)
        invertedTree.right!!.right!!.right = BinaryTree(8)

        invertBinaryTree(tree)

        assert(treesAreEqual(tree, invertedTree))
    }
}

fun treesAreEqual(treeOne: BinaryTree?, treeTwo: BinaryTree?): Boolean {
    if (treeOne == null && treeTwo == null) return true
    if (treeOne != null && treeTwo == null) return false
    if (treeOne == null && treeTwo != null) return false
    if (treeOne!!.value != treeTwo!!.value) return false
    return treesAreEqual(treeOne.left, treeTwo.left) && treesAreEqual(treeOne.right, treeTwo.right)
}

```
### Sandbox Code (swift)
```swift
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

class ProgramTest: TestSuite {
  func compareBT(firstTree: BinaryTree?, secondTree: BinaryTree?) -> Bool {
    if firstTree === nil, secondTree === nil {
      return true
    }

    if firstTree !== nil, secondTree !== nil {
      return firstTree!.value == secondTree!.value && compareBT(firstTree: firstTree?.left, secondTree: secondTree?.left) && compareBT(firstTree: firstTree?.right, secondTree: secondTree?.right)
    }

    return false
  }

  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let tree = BinaryTree(value: 1).insert(values: [2, 3, 4, 5, 6, 7, 8, 9], index: 0)
      let invertedTree = BinaryTree(value: 1).invertedInsert(values: [2, 3, 4, 5, 6, 7, 8, 9], index: 0)
      program.invertBinaryTree(tree: tree)
      try assert(compareBT(firstTree: tree, secondTree: invertedTree))
    }
  }
}

class BinaryTree {
  var value: Int?
  var left: BinaryTree?
  var right: BinaryTree?

  init(value: Int) {
    self.value = value
    left = nil
    right = nil
  }

  func insert(values: [Int], index: Int) -> BinaryTree? {
    if index >= values.count { return nil }

    var queue: [BinaryTree?] = [self]

    while queue.count > 0 {
      let current = queue.removeFirst()

      if current?.left === nil {
        current?.left = BinaryTree(value: values[index])
        break
      }

      queue.append(current?.left)

      if current?.right === nil {
        current?.right = BinaryTree(value: values[index])
        break
      }

      queue.append(current?.right)
    }

    insert(values: values, index: index + 1)

    return self
  }

  func invertedInsert(values: [Int], index: Int) -> BinaryTree? {
    if index >= values.count { return nil }

    var queue: [BinaryTree?] = [self]

    while queue.count > 0 {
      let current = queue.removeFirst()

      if current?.right === nil {
        current?.right = BinaryTree(value: values[index])
        break
      }

      queue.append(current?.right)

      if current?.left === nil {
        current?.left = BinaryTree(value: values[index])
        break
      }

      queue.append(current?.left)
    }

    invertedInsert(values: values, index: index + 1)

    return self
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space
  func invertBinaryTree(tree: BinaryTree?) {
    var queue: [BinaryTree?] = [tree]

    while queue.count > 0 {
      let current = queue.removeFirst()

      if current === nil {
        continue
      }

      swapLeftAndright(tree: current!)
      queue.append(current?.left)
      queue.append(current?.right)
    }
  }

  func swapLeftAndright(tree: BinaryTree) {
    let left = tree.left
    tree.left = tree.right
    tree.right = left
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(d) space
  func invertBinaryTree(tree: BinaryTree?) {
    if let tree = tree {
      swapLeftAndright(tree: tree)
      invertBinaryTree(tree: tree.left)
      invertBinaryTree(tree: tree.right)
    }
  }

  func swapLeftAndright(tree: BinaryTree) {
    let left = tree.left
    tree.left = tree.right
    tree.right = left
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func compareBT(firstTree: BinaryTree?, secondTree: BinaryTree?) -> Bool {
    if firstTree === nil, secondTree === nil {
      return true
    }

    if firstTree !== nil, secondTree !== nil {
      return firstTree!.value == secondTree!.value && compareBT(firstTree: firstTree?.left, secondTree: secondTree?.left) && compareBT(firstTree: firstTree?.right, secondTree: secondTree?.right)
    }

    return false
  }

  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let tree = BinaryTree(value: 1).insert(values: [2, 3, 4, 5, 6, 7, 8, 9], index: 0)
      let invertedTree = BinaryTree(value: 1).invertedInsert(values: [2, 3, 4, 5, 6, 7, 8, 9], index: 0)
      program.invertBinaryTree(tree: tree)
      try assert(compareBT(firstTree: tree, secondTree: invertedTree))
    }
  }
}

class BinaryTree {
  var value: Int?
  var left: BinaryTree?
  var right: BinaryTree?

  init(value: Int) {
    self.value = value
    left = nil
    right = nil
  }

  func insert(values: [Int], index: Int) -> BinaryTree? {
    if index >= values.count { return nil }

    var queue: [BinaryTree?] = [self]

    while queue.count > 0 {
      let current = queue.removeFirst()

      if current?.left === nil {
        current?.left = BinaryTree(value: values[index])
        break
      }

      queue.append(current?.left)

      if current?.right === nil {
        current?.right = BinaryTree(value: values[index])
        break
      }

      queue.append(current?.right)
    }

    insert(values: values, index: index + 1)

    return self
  }

  func invertedInsert(values: [Int], index: Int) -> BinaryTree? {
    if index >= values.count { return nil }

    var queue: [BinaryTree?] = [self]

    while queue.count > 0 {
      let current = queue.removeFirst()

      if current?.right === nil {
        current?.right = BinaryTree(value: values[index])
        break
      }

      queue.append(current?.right)

      if current?.left === nil {
        current?.left = BinaryTree(value: values[index])
        break
      }

      queue.append(current?.left)
    }

    invertedInsert(values: values, index: index + 1)

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


class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

    def __eq__(self, other):
        return isinstance(other, type(self)) and self.__dict__ == other.__dict__

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

    def invertedInsert(self, values, i=0):
        if i >= len(values):
            return
        queue = [self]
        while len(queue) > 0:
            current = queue.pop(0)
            if current.right is None:
                current.right = BinaryTree(values[i])
                break
            queue.append(current.right)
            if current.left is None:
                current.left = BinaryTree(values[i])
                break
            queue.append(current.left)
        self.invertedInsert(values, i + 1)
        return self


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        tree = BinaryTree(1).insert([2, 3, 4, 5, 6, 7, 8, 9])
        invertedTree = BinaryTree(1).invertedInsert([2, 3, 4, 5, 6, 7, 8, 9])
        program.invertBinaryTree(tree)
        self.assertTrue(tree.__eq__(invertedTree))

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space
def invertBinaryTree(tree):
    queue = [tree]
    while len(queue):
        current = queue.pop(0)
        if current is None:
            continue
        swapLeftAndRight(current)
        queue.append(current.left)
        queue.append(current.right)


def swapLeftAndRight(tree):
    tree.left, tree.right = tree.right, tree.left


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

# O(n) time | O(d) space
def invertBinaryTree(tree):
    if tree is None:
        return
    swapLeftAndRight(tree)
    invertBinaryTree(tree.left)
    invertBinaryTree(tree.right)


def swapLeftAndRight(tree):
    tree.left, tree.right = tree.right, tree.left


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


class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

    def __eq__(self, other):
        return isinstance(other, type(self)) and self.__dict__ == other.__dict__

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

    def invertedInsert(self, values, i=0):
        if i >= len(values):
            return
        queue = [self]
        while len(queue) > 0:
            current = queue.pop(0)
            if current.right is None:
                current.right = BinaryTree(values[i])
                break
            queue.append(current.right)
            if current.left is None:
                current.left = BinaryTree(values[i])
                break
            queue.append(current.left)
        self.invertedInsert(values, i + 1)
        return self


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        tree = BinaryTree(1).insert([2, 3, 4, 5, 6, 7, 8, 9])
        invertedTree = BinaryTree(1).invertedInsert([2, 3, 4, 5, 6, 7, 8, 9])
        program.invertBinaryTree(tree)
        self.assertTrue(tree.__eq__(invertedTree))

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

  invertedInsert(values: number[], i = 0): BinaryTree {
    if (i >= values.length) return this;
    const queue: BinaryTree[] = [this];
    while (queue.length > 0) {
      let current = queue.shift()!;
      if (current.right === null) {
        current.right = new BinaryTree(values[i]);
        break;
      }
      queue.push(current.right);
      if (current.left === null) {
        current.left = new BinaryTree(values[i]);
        break;
      }
      queue.push(current.left);
    }
    this.invertedInsert(values, i + 1);
    return this;
  }
}

it('Test Case #1', function () {
  const tree = new BinaryTree(1).insert([2, 3, 4, 5, 6, 7, 8, 9]);
  const invertedTree = new BinaryTree(1).invertedInsert([2, 3, 4, 5, 6, 7, 8, 9]);
  program.invertBinaryTree(tree);
  chai.expect(tree).to.deep.equal(invertedTree);
});

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

// O(n) time | O(n) space
export function invertBinaryTree(tree: BinaryTree | null) {
  const queue: Array<BinaryTree | null> = [tree];
  while (queue.length) {
    const current = queue.shift()!;
    if (current === null) continue;
    swapLeftAndRight(current);
    queue.push(current.left);
    queue.push(current.right);
  }
}

function swapLeftAndRight(tree: BinaryTree) {
  const left = tree.left;
  tree.left = tree.right;
  tree.right = left;
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

// O(n) time | O(d) space
export function invertBinaryTree(tree: BinaryTree | null) {
  if (tree === null) return;
  swapLeftAndRight(tree);
  invertBinaryTree(tree.left);
  invertBinaryTree(tree.right);
}

function swapLeftAndRight(tree: BinaryTree) {
  const left = tree.left;
  tree.left = tree.right;
  tree.right = left;
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

  invertedInsert(values: number[], i = 0): BinaryTree {
    if (i >= values.length) return this;
    const queue: BinaryTree[] = [this];
    while (queue.length > 0) {
      let current = queue.shift()!;
      if (current.right === null) {
        current.right = new BinaryTree(values[i]);
        break;
      }
      queue.push(current.right);
      if (current.left === null) {
        current.left = new BinaryTree(values[i]);
        break;
      }
      queue.push(current.left);
    }
    this.invertedInsert(values, i + 1);
    return this;
  }
}

it('Test Case #1', function () {
  const tree = new BinaryTree(1).insert([2, 3, 4, 5, 6, 7, 8, 9]);
  const invertedTree = new BinaryTree(1).invertedInsert([2, 3, 4, 5, 6, 7, 8, 9]);
  program.invertBinaryTree(tree);
  chai.expect(tree).to.deep.equal(invertedTree);
});

```

