# Merge Binary Trees
<div class="html">
<p>
  Given two binary trees, merge them and return the resulting tree.
  If two nodes overlap during the merger then sum the values, otherwise use the existing node.
</p>

<p>
  Note that your solution can either mutate the existing trees or return a
  new tree.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">tree1</span> =   1
        /   \
       3     2
     /   \
    7     4

<span class="CodeEditor-promptParameter">tree2</span> =   1
        /   \
       5     9
     /      / \
    2      7   6
</pre>
<h3>Sample Output</h3>
<pre>
<span class="CodeEditor-promptParameter">output</span> =  2
        /   \
      8      11
    /  \    /  \
  9     4  7    6
</pre>
</div>

Hint 1
<p>
If the function takes two tree nodes as parameters then what should be returned if either of the two nodes is null?
Remember, if two nodes overlap during the merger then sum the values, otherwise use the existing node. How can you sum
the tree node values when they overlap?
</p>


Hint 2

<p>
If two tree nodes overlap then sum the values into either one of the nodes. This node will be returned from the function.
Recursively call the function twice passing in both trees' left nodes as well as their right nodes.
</p>


Hint 3

<p>
The iterative approach to this problem uses a stack in replacement of the recusions stack space. What would you push onto
the stack in order to traverse and merge the binary trees?
</p>


Hint 4

<p>
You can either use a single stack and push associated pairs of nodes on the stack,
or you can maintain a stack for each tree.
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
      BinaryTree* tree1 = new BinaryTree(1);
      tree1->left = new BinaryTree(3);
      tree1->left->left = new BinaryTree(7);
      tree1->left->right = new BinaryTree(4);
      tree1->right = new BinaryTree(2);

      BinaryTree* tree2 = new BinaryTree(1);
      tree2->left = new BinaryTree(5);
      tree2->left->left = new BinaryTree(2);
      tree2->right = new BinaryTree(9);
      tree2->right->left = new BinaryTree(7);
      tree2->right->right = new BinaryTree(6);

      auto actual = mergeBinaryTrees(tree1, tree2);
      assert(actual->value == 2);
      assert(actual->left->value == 8);
      assert(actual->left->left->value == 9);
      assert(actual->left->right->value == 4);
      assert(actual->right->value == 11);
      assert(actual->right->left->value == 7);
      assert(actual->right->right->value == 6);
    });
  }
};


```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// This is an input class. Do not edit.
class BinaryTree {
public:
  int value;
  BinaryTree *left = nullptr;
  BinaryTree *right = nullptr;

  BinaryTree(int value) {
    this->value = value;
  }
};

// O(n) time | O(h) space - where n is the number of nodes in the smaller of the
// two trees and h is the height of the shorter tree.
BinaryTree* mergeBinaryTrees(BinaryTree* tree1, BinaryTree* tree2) {
  if (tree1 == nullptr) return tree2;
  if (tree2 == nullptr) return tree1;
  tree1->value += tree2->value;
  tree1->left = mergeBinaryTrees(tree1->left, tree2->left);
  tree1->right = mergeBinaryTrees(tree1->right, tree2->right);
  return tree1;
}


```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <stack>
using namespace std;

// This is an input class. Do not edit.
class BinaryTree {
public:
  int value;
  BinaryTree *left = nullptr;
  BinaryTree *right = nullptr;

  BinaryTree(int value) {
    this->value = value;
  }
};

// O(n) time | O(h) space - where n is the number of nodes in the smaller of the
// two trees and h is the height of the shorter tree.
BinaryTree* mergeBinaryTrees(BinaryTree* tree1, BinaryTree* tree2) {
  if (tree1 == nullptr) {
    return tree2;
  }

  stack<BinaryTree*> tree1Stack;
  tree1Stack.push(tree1);
  stack<BinaryTree*> tree2Stack;
  tree2Stack.push(tree2);

  while (!tree1Stack.empty()) {
    BinaryTree* tree1Node = tree1Stack.top();
    tree1Stack.pop();
    BinaryTree* tree2Node = tree2Stack.top(); 
    tree2Stack.pop();

    if (tree2Node == nullptr) {
      continue;
    }

    tree1Node->value += tree2Node->value;

    if (tree1Node->left == nullptr) {
      tree1Node->left = tree2Node->left;
    } else {
      tree1Stack.push(tree1Node->left);
      tree2Stack.push(tree2Node->left);
    }

    if (tree1Node->right == nullptr) {
      tree1Node->right = tree2Node->right;
    } else {
      tree1Stack.push(tree1Node->right);
      tree2Stack.push(tree2Node->right);
    }
  }

  return tree1;
}


```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      BinaryTree* tree1 = new BinaryTree(1);
      tree1->left = new BinaryTree(3);
      tree1->left->left = new BinaryTree(7);
      tree1->left->right = new BinaryTree(4);
      tree1->right = new BinaryTree(2);

      BinaryTree* tree2 = new BinaryTree(1);
      tree2->left = new BinaryTree(5);
      tree2->left->left = new BinaryTree(2);
      tree2->right = new BinaryTree(9);
      tree2->right->left = new BinaryTree(7);
      tree2->right->right = new BinaryTree(6);

      auto actual = mergeBinaryTrees(tree1, tree2);
      assert(actual->value == 2);
      assert(actual->left->value == 8);
      assert(actual->left->left->value == 9);
      assert(actual->left->right->value == 4);
      assert(actual->right->value == 11);
      assert(actual->right->left->value == 7);
      assert(actual->right->right->value == 6);
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
		tree1.left = new Program.BinaryTree(3);
		tree1.left.left = new Program.BinaryTree(7);
		tree1.left.right = new Program.BinaryTree(4);
		tree1.right = new Program.BinaryTree(2);

		Program.BinaryTree tree2 = new Program.BinaryTree(1);
		tree2.left = new Program.BinaryTree(5);
		tree2.left.left = new Program.BinaryTree(2);
		tree2.right = new Program.BinaryTree(9);
		tree2.right.left = new Program.BinaryTree(7);
		tree2.right.right = new Program.BinaryTree(6);

		Program.BinaryTree expected = new Program.BinaryTree(2);
		expected.left = new Program.BinaryTree(8);
		expected.left.left = new Program.BinaryTree(9);
		expected.left.right = new Program.BinaryTree(4);
		expected.right = new Program.BinaryTree(11);
		expected.right.left = new Program.BinaryTree(7);
		expected.right.right = new Program.BinaryTree(6);

		Program.BinaryTree actual = new Program().MergeBinaryTrees(tree1, tree2);

		Utils.AssertTrue(areTreesEqual(expected, actual));
	}

	public bool areTreesEqual(Program.BinaryTree tree1, Program.BinaryTree tree2) {
		if (tree1 == null && tree2 == null) return true;

		if (tree1 == null && tree2 != null) {
			return false;
		} else if (tree1 != null && tree2 == null) {
			return false;
		}

		if (tree1.value != tree2.value) return false;
		return areTreesEqual(tree1.left, tree2.left) && areTreesEqual(tree1.right,
		         tree2.right);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

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

	// O(n) time | O(h) space - where n is the number of nodes in the smaller of the
	// two trees and h is the height of the shorter tree.
	public BinaryTree MergeBinaryTrees(BinaryTree tree1, BinaryTree tree2) {
		if (tree1 == null) return tree2;
		if (tree2 == null) return tree1;
		tree1.value += tree2.value;
		tree1.left = MergeBinaryTrees(tree1.left, tree2.left);
		tree1.right = MergeBinaryTrees(tree1.right, tree2.right);
		return tree1;
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

	// O(n) time | O(h) space - where n is the number of nodes in the smaller of the
	// two trees and h is the height of the shorter tree.
	public BinaryTree MergeBinaryTrees(BinaryTree tree1, BinaryTree tree2) {
		if (tree1 == null) {
			return tree2;
		}

		Stack<BinaryTree> tree1Stack = new Stack<BinaryTree>();
		tree1Stack.Push(tree1);
		Stack<BinaryTree> tree2Stack = new Stack<BinaryTree>();
		tree2Stack.Push(tree2);

		while (tree1Stack.Count != 0) {
			BinaryTree tree1Node = tree1Stack.Pop();
			BinaryTree tree2Node = tree2Stack.Pop();

			if (tree2Node == null) {
				continue;
			}

			tree1Node.value += tree2Node.value;

			if (tree1Node.left == null) {
				tree1Node.left = tree2Node.left;
			} else {
				tree1Stack.Push(tree1Node.left);
				tree2Stack.Push(tree2Node.left);
			}

			if (tree1Node.right == null) {
				tree1Node.right = tree2Node.right;
			} else {
				tree1Stack.Push(tree1Node.right);
				tree2Stack.Push(tree2Node.right);
			}
		}

		return tree1;
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
		tree1.left = new Program.BinaryTree(3);
		tree1.left.left = new Program.BinaryTree(7);
		tree1.left.right = new Program.BinaryTree(4);
		tree1.right = new Program.BinaryTree(2);

		Program.BinaryTree tree2 = new Program.BinaryTree(1);
		tree2.left = new Program.BinaryTree(5);
		tree2.left.left = new Program.BinaryTree(2);
		tree2.right = new Program.BinaryTree(9);
		tree2.right.left = new Program.BinaryTree(7);
		tree2.right.right = new Program.BinaryTree(6);

		Program.BinaryTree expected = new Program.BinaryTree(2);
		expected.left = new Program.BinaryTree(8);
		expected.left.left = new Program.BinaryTree(9);
		expected.left.right = new Program.BinaryTree(4);
		expected.right = new Program.BinaryTree(11);
		expected.right.left = new Program.BinaryTree(7);
		expected.right.right = new Program.BinaryTree(6);

		Program.BinaryTree actual = new Program().MergeBinaryTrees(tree1, tree2);

		Utils.AssertTrue(areTreesEqual(expected, actual));
	}

	public bool areTreesEqual(Program.BinaryTree tree1, Program.BinaryTree tree2) {
		if (tree1 == null && tree2 == null) return true;

		if (tree1 == null && tree2 != null) {
			return false;
		} else if (tree1 != null && tree2 == null) {
			return false;
		}

		if (tree1.value != tree2.value) return false;
		return areTreesEqual(tree1.left, tree2.left) && areTreesEqual(tree1.right,
		         tree2.right);
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
	tree1.Left = &BinaryTree{Value: 3}
	tree1.Left.Left = &BinaryTree{Value: 7}
	tree1.Left.Right = &BinaryTree{Value: 4}
	tree1.Right = &BinaryTree{Value: 2}

	tree2 := &BinaryTree{Value: 1}
	tree2.Left = &BinaryTree{Value: 5}
	tree2.Left.Left = &BinaryTree{Value: 2}
	tree2.Right = &BinaryTree{Value: 9}
	tree2.Right.Left = &BinaryTree{Value: 7}
	tree2.Right.Right = &BinaryTree{Value: 6}

	expected := &BinaryTree{Value: 2}
	expected.Left = &BinaryTree{Value: 8}
	expected.Left.Left = &BinaryTree{Value: 9}
	expected.Left.Right = &BinaryTree{Value: 4}
	expected.Right = &BinaryTree{Value: 11}
	expected.Right.Left = &BinaryTree{Value: 7}
	expected.Right.Right = &BinaryTree{Value: 6}

	actual := MergeBinaryTrees(tree1, tree2)
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

// O(n) time | O(h) space - where n is the number of nodes in the smaller of the
// two trees and h is the height of the shorter tree.
func MergeBinaryTrees(tree1 *BinaryTree, tree2 *BinaryTree) *BinaryTree {
	if tree1 == nil {
		return tree2
	}
	if tree2 == nil {
		return tree1
	}

	tree1.Value += tree2.Value
	tree1.Left = MergeBinaryTrees(tree1.Left, tree2.Left)
	tree1.Right = MergeBinaryTrees(tree1.Right, tree2.Right)
	return tree1
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

// O(n) time | O(h) space - where n is the number of nodes in the smaller of the
// two trees and h is the height of the shorter tree.
func MergeBinaryTrees(tree1 *BinaryTree, tree2 *BinaryTree) *BinaryTree {
	if tree1 == nil {
		return tree2
	}

	tree1Stack := []*BinaryTree{tree1}
	tree2Stack := []*BinaryTree{tree2}

	for len(tree1Stack) > 0 {
		var tree1Node, tree2Node *BinaryTree
		tree1Node, tree1Stack = tree1Stack[len(tree1Stack)-1], tree1Stack[:len(tree1Stack)-1]
		tree2Node, tree2Stack = tree2Stack[len(tree2Stack)-1], tree2Stack[:len(tree2Stack)-1]

		if tree2Node == nil {
			continue
		}

		tree1Node.Value += tree2Node.Value

		if tree1Node.Left == nil {
			tree1Node.Left = tree2Node.Left
		} else {
			tree1Stack = append(tree1Stack, tree1Node.Left)
			tree2Stack = append(tree2Stack, tree2Node.Left)
		}

		if tree1Node.Right == nil {
			tree1Node.Right = tree2Node.Right
		} else {
			tree1Stack = append(tree1Stack, tree1Node.Right)
			tree2Stack = append(tree2Stack, tree2Node.Right)
		}
	}

	return tree1
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
	tree1.Left = &BinaryTree{Value: 3}
	tree1.Left.Left = &BinaryTree{Value: 7}
	tree1.Left.Right = &BinaryTree{Value: 4}
	tree1.Right = &BinaryTree{Value: 2}

	tree2 := &BinaryTree{Value: 1}
	tree2.Left = &BinaryTree{Value: 5}
	tree2.Left.Left = &BinaryTree{Value: 2}
	tree2.Right = &BinaryTree{Value: 9}
	tree2.Right.Left = &BinaryTree{Value: 7}
	tree2.Right.Right = &BinaryTree{Value: 6}

	expected := &BinaryTree{Value: 2}
	expected.Left = &BinaryTree{Value: 8}
	expected.Left.Left = &BinaryTree{Value: 9}
	expected.Left.Right = &BinaryTree{Value: 4}
	expected.Right = &BinaryTree{Value: 11}
	expected.Right.Left = &BinaryTree{Value: 7}
	expected.Right.Right = &BinaryTree{Value: 6}

	actual := MergeBinaryTrees(tree1, tree2)
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
    tree1.left = new Program.BinaryTree(3);
    tree1.left.left = new Program.BinaryTree(7);
    tree1.left.right = new Program.BinaryTree(4);
    tree1.right = new Program.BinaryTree(2);

    Program.BinaryTree tree2 = new Program.BinaryTree(1);
    tree2.left = new Program.BinaryTree(5);
    tree2.left.left = new Program.BinaryTree(2);
    tree2.right = new Program.BinaryTree(9);
    tree2.right.left = new Program.BinaryTree(7);
    tree2.right.right = new Program.BinaryTree(6);

    Program.BinaryTree actual = new Program().mergeBinaryTrees(tree1, tree2);

    Utils.assertTrue(actual.value == 2);
    Utils.assertTrue(actual.left.value == 8);
    Utils.assertTrue(actual.left.left.value == 9);
    Utils.assertTrue(actual.left.right.value == 4);
    Utils.assertTrue(actual.right.value == 11);
    Utils.assertTrue(actual.right.left.value == 7);
    Utils.assertTrue(actual.right.right.value == 6);
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

  // O(n) time | O(h) space - where n is the number of nodes in the smaller of the
  // two trees and h is the height of the shorter tree.
  public BinaryTree mergeBinaryTrees(BinaryTree tree1, BinaryTree tree2) {
    if (tree1 == null) return tree2;
    if (tree2 == null) return tree1;
    tree1.value += tree2.value;
    tree1.left = mergeBinaryTrees(tree1.left, tree2.left);
    tree1.right = mergeBinaryTrees(tree1.right, tree2.right);
    return tree1;
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

  // O(n) time | O(h) space - where n is the number of nodes in the smaller of the
  // two trees and h is the height of the shorter tree.
  public BinaryTree mergeBinaryTrees(BinaryTree tree1, BinaryTree tree2) {
    if (tree1 == null) {
      return tree2;
    }

    Stack<BinaryTree> tree1Stack = new Stack<BinaryTree>();
    tree1Stack.push(tree1);
    Stack<BinaryTree> tree2Stack = new Stack<BinaryTree>();
    tree2Stack.push(tree2);

    while (!tree1Stack.isEmpty()) {
      BinaryTree tree1Node = tree1Stack.pop();
      BinaryTree tree2Node = tree2Stack.pop();

      if (tree2Node == null) {
        continue;
      }

      tree1Node.value += tree2Node.value;

      if (tree1Node.left == null) {
        tree1Node.left = tree2Node.left;
      } else {
        tree1Stack.push(tree1Node.left);
        tree2Stack.push(tree2Node.left);
      }

      if (tree1Node.right == null) {
        tree1Node.right = tree2Node.right;
      } else {
        tree1Stack.push(tree1Node.right);
        tree2Stack.push(tree2Node.right);
      }
    }

    return tree1;
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
    tree1.left = new Program.BinaryTree(3);
    tree1.left.left = new Program.BinaryTree(7);
    tree1.left.right = new Program.BinaryTree(4);
    tree1.right = new Program.BinaryTree(2);

    Program.BinaryTree tree2 = new Program.BinaryTree(1);
    tree2.left = new Program.BinaryTree(5);
    tree2.left.left = new Program.BinaryTree(2);
    tree2.right = new Program.BinaryTree(9);
    tree2.right.left = new Program.BinaryTree(7);
    tree2.right.right = new Program.BinaryTree(6);

    Program.BinaryTree actual = new Program().mergeBinaryTrees(tree1, tree2);

    Utils.assertTrue(actual.value == 2);
    Utils.assertTrue(actual.left.value == 8);
    Utils.assertTrue(actual.left.left.value == 9);
    Utils.assertTrue(actual.left.right.value == 4);
    Utils.assertTrue(actual.right.value == 11);
    Utils.assertTrue(actual.right.left.value == 7);
    Utils.assertTrue(actual.right.right.value == 6);
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
  tree1.left = new program.BinaryTree(3);
  tree1.left.left = new program.BinaryTree(7);
  tree1.left.right = new program.BinaryTree(4);
  tree1.right = new program.BinaryTree(2);

  const tree2 = new program.BinaryTree(1);
  tree2.left = new program.BinaryTree(5);
  tree2.left.left = new program.BinaryTree(2);
  tree2.right = new program.BinaryTree(9);
  tree2.right.left = new program.BinaryTree(7);
  tree2.right.right = new program.BinaryTree(6);

  const actual = program.mergeBinaryTrees(tree1, tree2);
  chai.expect(actual.value).to.deep.equal(2);
  chai.expect(actual.left.value).to.deep.equal(8);
  chai.expect(actual.left.left.value).to.deep.equal(9);
  chai.expect(actual.left.right.value).to.deep.equal(4);
  chai.expect(actual.right.value).to.deep.equal(11);
  chai.expect(actual.right.left.value).to.deep.equal(7);
  chai.expect(actual.right.right.value).to.deep.equal(6);
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

// O(n) time | O(h) space - where n is the number of nodes in the smaller of the
// two trees and h is the height of the shorter tree.
function mergeBinaryTrees(tree1, tree2) {
  if (tree1 === null) return tree2;
  if (tree2 === null) return tree1;

  tree1.value += tree2.value;
  tree1.left = mergeBinaryTrees(tree1.left, tree2.left);
  tree1.right = mergeBinaryTrees(tree1.right, tree2.right);
  return tree1;
}

// Do not edit the lines below.
exports.BinaryTree = BinaryTree;
exports.mergeBinaryTrees = mergeBinaryTrees;

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

// O(n) time | O(h) space - where n is the number of nodes in the smaller of the
// two trees and h is the height of the shorter tree.
function mergeBinaryTrees(tree1, tree2) {
  if (tree1 === null) return tree2;

  const tree1Stack = [tree1];
  const tree2Stack = [tree2];

  while (tree1Stack.length > 0) {
    const tree1Node = tree1Stack.pop();
    const tree2Node = tree2Stack.pop();

    if (tree2Node === null) continue;

    tree1Node.value += tree2Node.value;

    if (tree1Node.left === null) {
      tree1Node.left = tree2Node.left;
    } else {
      tree1Stack.push(tree1Node.left);
      tree2Stack.push(tree2Node.left);
    }

    if (tree1Node.right === null) {
      tree1Node.right = tree2Node.right;
    } else {
      tree1Stack.push(tree1Node.right);
      tree2Stack.push(tree2Node.right);
    }
  }

  return tree1;
}

// Do not edit the lines below.
exports.BinaryTree = BinaryTree;
exports.mergeBinaryTrees = mergeBinaryTrees;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const tree1 = new program.BinaryTree(1);
  tree1.left = new program.BinaryTree(3);
  tree1.left.left = new program.BinaryTree(7);
  tree1.left.right = new program.BinaryTree(4);
  tree1.right = new program.BinaryTree(2);

  const tree2 = new program.BinaryTree(1);
  tree2.left = new program.BinaryTree(5);
  tree2.left.left = new program.BinaryTree(2);
  tree2.right = new program.BinaryTree(9);
  tree2.right.left = new program.BinaryTree(7);
  tree2.right.right = new program.BinaryTree(6);

  const actual = program.mergeBinaryTrees(tree1, tree2);
  chai.expect(actual.value).to.deep.equal(2);
  chai.expect(actual.left.value).to.deep.equal(8);
  chai.expect(actual.left.left.value).to.deep.equal(9);
  chai.expect(actual.left.right.value).to.deep.equal(4);
  chai.expect(actual.right.value).to.deep.equal(11);
  chai.expect(actual.right.left.value).to.deep.equal(7);
  chai.expect(actual.right.right.value).to.deep.equal(6);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.mergeBinaryTrees
import com.algoexpert.program.BinaryTree as BinaryTree

class ProgramTest {
    @Test
    fun TestCase1() {
        val tree1 = BinaryTree(1)
        tree1.left = BinaryTree(3)
        tree1.left!!.left = BinaryTree(7)
        tree1.left!!.right = BinaryTree(4)
        tree1.right = BinaryTree(2)

        val tree2 = BinaryTree(1)
        tree2.left = BinaryTree(5)
        tree2.left!!.left = BinaryTree(2)
        tree2.right = BinaryTree(9)
        tree2.right!!.left = BinaryTree(7)
        tree2.right!!.right = BinaryTree(6)

        val output = mergeBinaryTrees(tree1, tree2)!!
        assert(output.value == 2)
        assert(output.left!!.value == 8)
        assert(output.left!!.left!!.value == 9)
        assert(output.left!!.right!!.value == 4)
        assert(output.right!!.value == 11)
        assert(output.right!!.left!!.value == 7)
        assert(output.right!!.right!!.value == 6)
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

// O(n) time | O(h) space - where n is the number of nodes in the smaller of the
// two trees and h is the height of the shorter tree.
fun mergeBinaryTrees(tree1: BinaryTree?, tree2: BinaryTree?): BinaryTree? {
    if (tree1 == null) return tree2
    if (tree2 == null) return tree1

    tree1.value += tree2.value
    tree1.left = mergeBinaryTrees(tree1.left, tree2.left)
    tree1.right = mergeBinaryTrees(tree1.right, tree2.right)
    return tree1
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import java.util.Stack

// This is an input class. Do not edit.
open class BinaryTree(value: Int) {
    var value = value
    var left: BinaryTree? = null
    var right: BinaryTree? = null
}

// O(n) time | O(h) space - where n is the number of nodes in the smaller of the
// two trees and h is the height of the shorter tree.
fun mergeBinaryTrees(tree1: BinaryTree?, tree2: BinaryTree?): BinaryTree? {
    if (tree1 == null) return tree2

    val tree1Stack = Stack<BinaryTree>()
    val tree2Stack = Stack<BinaryTree?>()
    tree1Stack.add(tree1)
    tree2Stack.add(tree2)

    while (tree1Stack.size > 0) {
        val tree1Node = tree1Stack.pop()!!
        val tree2Node = tree2Stack.pop()

        if (tree2Node == null) continue

        tree1Node.value += tree2Node.value

        if (tree1Node.left == null) {
            tree1Node.left = tree2Node.left
        } else {
            tree1Stack.add(tree1Node.left)
            tree2Stack.add(tree2Node.left)
        }

        if (tree1Node.right == null) {
            tree1Node.right = tree2Node.right
        } else {
            tree1Stack.add(tree1Node.right)
            tree2Stack.add(tree2Node.right)
        }
    }

    return tree1
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.mergeBinaryTrees
import com.algoexpert.program.BinaryTree as BinaryTree

class ProgramTest {
    @Test
    fun TestCase1() {
        val tree1 = BinaryTree(1)
        tree1.left = BinaryTree(3)
        tree1.left!!.left = BinaryTree(7)
        tree1.left!!.right = BinaryTree(4)
        tree1.right = BinaryTree(2)

        val tree2 = BinaryTree(1)
        tree2.left = BinaryTree(5)
        tree2.left!!.left = BinaryTree(2)
        tree2.right = BinaryTree(9)
        tree2.right!!.left = BinaryTree(7)
        tree2.right!!.right = BinaryTree(6)

        val output = mergeBinaryTrees(tree1, tree2)!!
        assert(output.value == 2)
        assert(output.left!!.value == 8)
        assert(output.left!!.left!!.value == 9)
        assert(output.left!!.right!!.value == 4)
        assert(output.right!!.value == 11)
        assert(output.right!!.left!!.value == 7)
        assert(output.right!!.right!!.value == 6)
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
    runTest("Test Case 1") { () throws in
      var tree1 = Program.BinaryTree(value: 1)
      tree1.left = Program.BinaryTree(value: 3)
      tree1.left!.left = Program.BinaryTree(value: 7)
      tree1.left!.right = Program.BinaryTree(value: 4)
      tree1.right = Program.BinaryTree(value: 2)

      var tree2 = Program.BinaryTree(value: 1)
      tree2.left = Program.BinaryTree(value: 5)
      tree2.left!.left = Program.BinaryTree(value: 2)
      tree2.right = Program.BinaryTree(value: 9)
      tree2.right!.left = Program.BinaryTree(value: 7)
      tree2.right!.right = Program.BinaryTree(value: 6)

      var expected = Program.BinaryTree(value: 2)
      expected.left = Program.BinaryTree(value: 8)
      expected.left!.left = Program.BinaryTree(value: 9)
      expected.left!.right = Program.BinaryTree(value: 4)
      expected.right = Program.BinaryTree(value: 11)
      expected.right!.left = Program.BinaryTree(value: 7)
      expected.right!.right = Program.BinaryTree(value: 6)

      var actual = Program().mergeBinaryTrees(tree1, tree2)

      try assertEqual(true, areTreesEqual(expected, actual))
    }
  }

  func areTreesEqual(_ tree1: Program.BinaryTree?, _ tree2: Program.BinaryTree?) -> Bool {
    if tree1 == nil && tree2 == nil {
      return true
    } else if tree1 == nil || tree2 == nil {
      return false
    }

    if tree1!.value != tree2!.value {
      return false
    }
    return areTreesEqual(tree1!.left, tree2!.left) && areTreesEqual(tree1!.right, tree2!.right)
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

  // O(n) time | O(h) space - where n is the number of nodes in the smaller of the
  // two trees and h is the height of the shorter tree.
  func mergeBinaryTrees(_ tree1: BinaryTree?, _ tree2: BinaryTree?) -> BinaryTree? {
    if tree1 == nil {
      return tree2
    }
    if tree2 == nil {
      return tree1
    }

    tree1!.value += tree2!.value
    tree1!.left = mergeBinaryTrees(tree1!.left, tree2!.left)
    tree1!.right = mergeBinaryTrees(tree1!.right, tree2!.right)
    return tree1
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

  // O(n) time | O(h) space - where n is the number of nodes in the smaller of the
  // two trees and h is the height of the shorter tree.
  func mergeBinaryTrees(_ tree1: BinaryTree?, _ tree2: BinaryTree?) -> BinaryTree? {
    if tree1 == nil {
      return tree2
    }

    var tree1Stack = [tree1]
    var tree2Stack = [tree2]

    while tree1Stack.count > 0 {
      let tree1Node = tree1Stack.popLast()!
      let tree2Node = tree2Stack.popLast()!

      if tree2Node == nil {
        continue
      }

      tree1Node!.value += tree2Node!.value

      if tree1Node!.left == nil {
        tree1Node!.left = tree2Node!.left
      } else {
        tree1Stack.append(tree1Node!.left)
        tree2Stack.append(tree2Node!.left)
      }

      if tree1Node!.right == nil {
        tree1Node!.right = tree2Node!.right
      } else {
        tree1Stack.append(tree1Node!.right)
        tree2Stack.append(tree2Node!.right)
      }
    }
    return tree1
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws in
      var tree1 = Program.BinaryTree(value: 1)
      tree1.left = Program.BinaryTree(value: 3)
      tree1.left!.left = Program.BinaryTree(value: 7)
      tree1.left!.right = Program.BinaryTree(value: 4)
      tree1.right = Program.BinaryTree(value: 2)

      var tree2 = Program.BinaryTree(value: 1)
      tree2.left = Program.BinaryTree(value: 5)
      tree2.left!.left = Program.BinaryTree(value: 2)
      tree2.right = Program.BinaryTree(value: 9)
      tree2.right!.left = Program.BinaryTree(value: 7)
      tree2.right!.right = Program.BinaryTree(value: 6)

      var expected = Program.BinaryTree(value: 2)
      expected.left = Program.BinaryTree(value: 8)
      expected.left!.left = Program.BinaryTree(value: 9)
      expected.left!.right = Program.BinaryTree(value: 4)
      expected.right = Program.BinaryTree(value: 11)
      expected.right!.left = Program.BinaryTree(value: 7)
      expected.right!.right = Program.BinaryTree(value: 6)

      var actual = Program().mergeBinaryTrees(tree1, tree2)

      try assertEqual(true, areTreesEqual(expected, actual))
    }
  }

  func areTreesEqual(_ tree1: Program.BinaryTree?, _ tree2: Program.BinaryTree?) -> Bool {
    if tree1 == nil && tree2 == nil {
      return true
    } else if tree1 == nil || tree2 == nil {
      return false
    }

    if tree1!.value != tree2!.value {
      return false
    }
    return areTreesEqual(tree1!.left, tree2!.left) && areTreesEqual(tree1!.right, tree2!.right)
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
        tree1.left = program.BinaryTree(3)
        tree1.left.left = program.BinaryTree(7)
        tree1.left.right = program.BinaryTree(4)
        tree1.right = program.BinaryTree(2)

        tree2 = program.BinaryTree(1)
        tree2.left = program.BinaryTree(5)
        tree2.left.left = program.BinaryTree(2)
        tree2.right = program.BinaryTree(9)
        tree2.right.left = program.BinaryTree(7)
        tree2.right.right = program.BinaryTree(6)

        actual = program.mergeBinaryTrees(tree1, tree2)
        self.assertEqual(actual.value, 2)
        self.assertEqual(actual.left.value, 8)
        self.assertEqual(actual.left.left.value, 9)
        self.assertEqual(actual.left.right.value, 4)
        self.assertEqual(actual.right.value, 11)
        self.assertEqual(actual.right.left.value, 7)
        self.assertEqual(actual.right.right.value, 6)

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


# O(n) time | O(h) space - where n is the number of nodes in the smaller of the
# two trees and h is the height of the shorter tree.
def mergeBinaryTrees(tree1, tree2):
    if tree1 is None:
        return tree2
    if tree2 is None:
        return tree1

    tree1.value += tree2.value
    tree1.left = mergeBinaryTrees(tree1.left, tree2.left)
    tree1.right = mergeBinaryTrees(tree1.right, tree2.right)
    return tree1

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


# O(n) time | O(h) space - where n is the number of nodes in the smaller of the
# two trees and h is the height of the shorter tree.
def mergeBinaryTrees(tree1, tree2):
    if tree1 is None:
        return tree2

    tree1Stack = [tree1]
    tree2Stack = [tree2]

    while len(tree1Stack) > 0:
        tree1Node = tree1Stack.pop()
        tree2Node = tree2Stack.pop()

        if tree2Node is None:
            continue

        tree1Node.value += tree2Node.value

        if tree1Node.left is None:
            tree1Node.left = tree2Node.left
        else:
            tree1Stack.append(tree1Node.left)
            tree2Stack.append(tree2Node.left)

        if tree1Node.right is None:
            tree1Node.right = tree2Node.right
        else:
            tree1Stack.append(tree1Node.right)
            tree2Stack.append(tree2Node.right)

    return tree1

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        tree1 = program.BinaryTree(1)
        tree1.left = program.BinaryTree(3)
        tree1.left.left = program.BinaryTree(7)
        tree1.left.right = program.BinaryTree(4)
        tree1.right = program.BinaryTree(2)

        tree2 = program.BinaryTree(1)
        tree2.left = program.BinaryTree(5)
        tree2.left.left = program.BinaryTree(2)
        tree2.right = program.BinaryTree(9)
        tree2.right.left = program.BinaryTree(7)
        tree2.right.right = program.BinaryTree(6)

        actual = program.mergeBinaryTrees(tree1, tree2)
        self.assertEqual(actual.value, 2)
        self.assertEqual(actual.left.value, 8)
        self.assertEqual(actual.left.left.value, 9)
        self.assertEqual(actual.left.right.value, 4)
        self.assertEqual(actual.right.value, 11)
        self.assertEqual(actual.right.left.value, 7)
        self.assertEqual(actual.right.right.value, 6)

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
  tree1.left = new program.BinaryTree(3);
  tree1.left!.left = new program.BinaryTree(7);
  tree1.left!.right = new program.BinaryTree(4);
  tree1.right = new program.BinaryTree(2);

  const tree2 = new program.BinaryTree(1);
  tree2.left = new program.BinaryTree(5);
  tree2.left!.left = new program.BinaryTree(2);
  tree2.right = new program.BinaryTree(9);
  tree2.right!.left = new program.BinaryTree(7);
  tree2.right!.right = new program.BinaryTree(6);

  const actual = program.mergeBinaryTrees(tree1, tree2);
  chai.expect(actual!.value).to.deep.equal(2);
  chai.expect(actual!.left!.value).to.deep.equal(8);
  chai.expect(actual!.left!.left!.value).to.deep.equal(9);
  chai.expect(actual!.left!.right!.value).to.deep.equal(4);
  chai.expect(actual!.right!.value).to.deep.equal(11);
  chai.expect(actual!.right!.left!.value).to.deep.equal(7);
  chai.expect(actual!.right!.right!.value).to.deep.equal(6);
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

// O(n) time | O(h) space - where n is the number of nodes in the smaller of the
// two trees and h is the height of the shorter tree.
export function mergeBinaryTrees(tree1: BinaryTree | null, tree2: BinaryTree | null) {
  if (tree1 === null) return tree2;
  if (tree2 === null) return tree1;

  tree1.value += tree2.value;
  tree1.left = mergeBinaryTrees(tree1.left, tree2.left);
  tree1.right = mergeBinaryTrees(tree1.right, tree2.right);
  return tree1;
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

// O(n) time | O(h) space - where n is the number of nodes in the smaller of the
// two trees and h is the height of the shorter tree.
export function mergeBinaryTrees(tree1: BinaryTree | null, tree2: BinaryTree | null) {
  if (tree1 === null) return tree2;

  const tree1Stack = [tree1];
  const tree2Stack = [tree2];

  while (tree1Stack.length > 0) {
    const tree1Node = tree1Stack.pop()!;
    const tree2Node = tree2Stack.pop();

    if (tree2Node === null) continue;

    tree1Node.value += tree2Node!.value;

    if (tree1Node.left === null) {
      tree1Node.left = tree2Node!.left;
    } else {
      tree1Stack.push(tree1Node.left);
      tree2Stack.push(tree2Node!.left);
    }

    if (tree1Node.right === null) {
      tree1Node.right = tree2Node!.right;
    } else {
      tree1Stack.push(tree1Node.right);
      tree2Stack.push(tree2Node!.right);
    }
  }

  return tree1;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const tree1 = new program.BinaryTree(1);
  tree1.left = new program.BinaryTree(3);
  tree1.left!.left = new program.BinaryTree(7);
  tree1.left!.right = new program.BinaryTree(4);
  tree1.right = new program.BinaryTree(2);

  const tree2 = new program.BinaryTree(1);
  tree2.left = new program.BinaryTree(5);
  tree2.left!.left = new program.BinaryTree(2);
  tree2.right = new program.BinaryTree(9);
  tree2.right!.left = new program.BinaryTree(7);
  tree2.right!.right = new program.BinaryTree(6);

  const actual = program.mergeBinaryTrees(tree1, tree2);
  chai.expect(actual!.value).to.deep.equal(2);
  chai.expect(actual!.left!.value).to.deep.equal(8);
  chai.expect(actual!.left!.left!.value).to.deep.equal(9);
  chai.expect(actual!.left!.right!.value).to.deep.equal(4);
  chai.expect(actual!.right!.value).to.deep.equal(11);
  chai.expect(actual!.right!.left!.value).to.deep.equal(7);
  chai.expect(actual!.right!.right!.value).to.deep.equal(6);
});

```

