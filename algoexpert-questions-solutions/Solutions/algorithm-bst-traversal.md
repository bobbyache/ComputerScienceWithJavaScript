# BST Traversal
<div class="html">
<p>
  Write three functions that take in a Binary Search Tree (BST) and an empty
  array, traverse the BST, add its nodes' values to the input array, and return
  that array. The three functions should traverse the BST using the in-order,
  pre-order, and post-order tree-traversal techniques, respectively.
</p>
<p>
  If you're unfamiliar with tree-traversal techniques, we recommend watching the
  Conceptual Overview section of this question's video explanation before
  starting to code.
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
<span class="CodeEditor-promptParameter">tree</span> =   10
       /     \
      5      15
    /   \       \
   2     5       22
 /
1
<span class="CodeEditor-promptParameter">array</span> = []
</pre>
<h3>Sample Output</h3>
<pre>
<span class="CodeEditor-promptParameter">inOrderTraverse</span>: [1, 2, 5, 5, 10, 15, 22] <span class="CodeEditor-promptComment">// where the array is the input array</span>
<span class="CodeEditor-promptParameter">preOrderTraverse</span>: [10, 5, 2, 1, 5, 15, 22] <span class="CodeEditor-promptComment">// where the array is the input array</span>
<span class="CodeEditor-promptParameter">postOrderTraverse</span>: [1, 2, 5, 5, 22, 15, 10] <span class="CodeEditor-promptComment">// where the array is the input array</span>
</pre>
</div>

Hint 1
<p>
Realize that in-order traversal simply means traversing left nodes before traversing current nodes before traversing right nodes. Try implementing this algorithm recursively by calling the inOrderTraverse method on a left node, then appending the current node's value to the input array, and then calling the inOrderTraverse method on a right node.
</p>


Hint 2

<p>
Apply the same logic described in Hint #1 for the two other traversal methods, but change the order in which you do things.
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
      root->right->right = new BST(22);

      vector<int> expectedInOrder{1, 2, 5, 5, 10, 15, 22};
      vector<int> expectedPreOrder{10, 5, 2, 1, 5, 15, 22};
      vector<int> expectedPostOrder{1, 2, 5, 5, 22, 15, 10};
      vector<int> actualInOrder;
      vector<int> actualPreOrder;
      vector<int> actualPostOrder;

      inOrderTraverse(root, actualInOrder);
      preOrderTraverse(root, actualPreOrder);
      postOrderTraverse(root, actualPostOrder);

      assert(actualInOrder == expectedInOrder);
      assert(actualPreOrder == expectedPreOrder);
      assert(actualPostOrder == expectedPostOrder);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

class BST {
public:
  int value;
  BST *left;
  BST *right;

  BST(int val);
};

// O(n) time | O(n) space
void inOrderTraverse(BST *tree, vector<int> &array) {
  if (tree != nullptr) {
    inOrderTraverse(tree->left, array);
    array.push_back(tree->value);
    inOrderTraverse(tree->right, array);
  }
}

// O(n) time | O(n) space
void preOrderTraverse(BST *tree, vector<int> &array) {
  if (tree != nullptr) {
    array.push_back(tree->value);
    preOrderTraverse(tree->left, array);
    preOrderTraverse(tree->right, array);
  }
}

// O(n) time | O(n) space
void postOrderTraverse(BST *tree, vector<int> &array) {
  if (tree != nullptr) {
    postOrderTraverse(tree->left, array);
    postOrderTraverse(tree->right, array);
    array.push_back(tree->value);
  }
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
      root->right->right = new BST(22);

      vector<int> expectedInOrder{1, 2, 5, 5, 10, 15, 22};
      vector<int> expectedPreOrder{10, 5, 2, 1, 5, 15, 22};
      vector<int> expectedPostOrder{1, 2, 5, 5, 22, 15, 10};
      vector<int> actualInOrder;
      vector<int> actualPreOrder;
      vector<int> actualPostOrder;

      inOrderTraverse(root, actualInOrder);
      preOrderTraverse(root, actualPreOrder);
      postOrderTraverse(root, actualPostOrder);

      assert(actualInOrder == expectedInOrder);
      assert(actualPreOrder == expectedPreOrder);
      assert(actualPostOrder == expectedPostOrder);
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

	[Test]
	public void TestCase1() {
		var root = new Program.BST(10);
		root.left = new Program.BST(5);
		root.left.left = new Program.BST(2);
		root.left.left.left = new Program.BST(1);
		root.left.right = new Program.BST(5);
		root.right = new Program.BST(15);
		root.right.right = new Program.BST(22);

		List<int> inOrder   = new List<int> {
			1, 2, 5, 5, 10, 15, 22
		};
		List<int> preOrder  = new List<int> {
			10, 5, 2, 1, 5, 15, 22
		};
		List<int> postOrder = new List<int> {
			1, 2, 5, 5, 22, 15, 10
		};

		Utils.AssertTrue(Enumerable.SequenceEqual(Program.InOrderTraverse(root,
		  new List<int>()), inOrder));
		Utils.AssertTrue(Enumerable.SequenceEqual(Program.PreOrderTraverse(root,
		  new List<int>()), preOrder));
		Utils.AssertTrue(Enumerable.SequenceEqual(Program.PostOrderTraverse(root,
		  new List<int>()), postOrder));
	}

}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n) time | O(n) space
	public static List<int> InOrderTraverse(BST tree, List<int> array) {
		if (tree.left != null) {
			InOrderTraverse(tree.left, array);
		}
		array.Add(tree.value);
		if (tree.right != null) {
			InOrderTraverse(tree.right, array);
		}
		return array;
	}

	// O(n) time | O(n) space
	public static List<int> PreOrderTraverse(BST tree, List<int> array) {
		array.Add(tree.value);
		if (tree.left != null) {
			PreOrderTraverse(tree.left, array);
		}
		if (tree.right != null) {
			PreOrderTraverse(tree.right, array);
		}
		return array;
	}

	// O(n) time | O(n) space
	public static List<int> PostOrderTraverse(BST tree, List<int> array) {
		if (tree.left != null) {
			PostOrderTraverse(tree.left, array);
		}
		if (tree.right != null) {
			PostOrderTraverse(tree.right, array);
		}
		array.Add(tree.value);
		return array;
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
using System.Linq;
using System.Collections.Generic;

public class ProgramTest {

	[Test]
	public void TestCase1() {
		var root = new Program.BST(10);
		root.left = new Program.BST(5);
		root.left.left = new Program.BST(2);
		root.left.left.left = new Program.BST(1);
		root.left.right = new Program.BST(5);
		root.right = new Program.BST(15);
		root.right.right = new Program.BST(22);

		List<int> inOrder   = new List<int> {
			1, 2, 5, 5, 10, 15, 22
		};
		List<int> preOrder  = new List<int> {
			10, 5, 2, 1, 5, 15, 22
		};
		List<int> postOrder = new List<int> {
			1, 2, 5, 5, 22, 15, 10
		};

		Utils.AssertTrue(Enumerable.SequenceEqual(Program.InOrderTraverse(root,
		  new List<int>()), inOrder));
		Utils.AssertTrue(Enumerable.SequenceEqual(Program.PreOrderTraverse(root,
		  new List<int>()), preOrder));
		Utils.AssertTrue(Enumerable.SequenceEqual(Program.PostOrderTraverse(root,
		  new List<int>()), postOrder));
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
	root.Right.Right = NewBST(22)

	inOrder := []int{1, 2, 5, 5, 10, 15, 22}
	preOrder := []int{10, 5, 2, 1, 5, 15, 22}
	postOrder := []int{1, 2, 5, 5, 22, 15, 10}

	require.Equal(t, inOrder, root.InOrderTraverse([]int{}))
	require.Equal(t, preOrder, root.PreOrderTraverse([]int{}))
	require.Equal(t, postOrder, root.PostOrderTraverse([]int{}))
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

// O(n) time | O(n) space
func (tree *BST) InOrderTraverse(array []int) []int {
	if tree.Left != nil {
		array = tree.Left.InOrderTraverse(array)
	}
	array = append(array, tree.Value)
	if tree.Right != nil {
		array = tree.Right.InOrderTraverse(array)
	}
	return array
}

// O(n) time | O(n) space
func (tree *BST) PreOrderTraverse(array []int) []int {
	array = append(array, tree.Value)
	if tree.Left != nil {
		array = tree.Left.PreOrderTraverse(array)
	}
	if tree.Right != nil {
		array = tree.Right.PreOrderTraverse(array)
	}
	return array
}

// O(n) time | O(n) space
func (tree *BST) PostOrderTraverse(array []int) []int {
	if tree.Left != nil {
		array = tree.Left.PostOrderTraverse(array)
	}
	if tree.Right != nil {
		array = tree.Right.PostOrderTraverse(array)
	}
	array = append(array, tree.Value)
	return array
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
	root.Right.Right = NewBST(22)

	inOrder := []int{1, 2, 5, 5, 10, 15, 22}
	preOrder := []int{10, 5, 2, 1, 5, 15, 22}
	postOrder := []int{1, 2, 5, 5, 22, 15, 10}

	require.Equal(t, inOrder, root.InOrderTraverse([]int{}))
	require.Equal(t, preOrder, root.PreOrderTraverse([]int{}))
	require.Equal(t, postOrder, root.PostOrderTraverse([]int{}))
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
    var root = new Program.BST(10);
    root.left = new Program.BST(5);
    root.left.left = new Program.BST(2);
    root.left.left.left = new Program.BST(1);
    root.left.right = new Program.BST(5);
    root.right = new Program.BST(15);
    root.right.right = new Program.BST(22);

    List<Integer> inOrder = Arrays.asList(new Integer[] {1, 2, 5, 5, 10, 15, 22});
    List<Integer> preOrder = Arrays.asList(new Integer[] {10, 5, 2, 1, 5, 15, 22});
    List<Integer> postOrder = Arrays.asList(new Integer[] {1, 2, 5, 5, 22, 15, 10});

    Utils.assertTrue(Program.inOrderTraverse(root, new ArrayList<Integer>()).equals(inOrder));
    Utils.assertTrue(Program.preOrderTraverse(root, new ArrayList<Integer>()).equals(preOrder));
    Utils.assertTrue(Program.postOrderTraverse(root, new ArrayList<Integer>()).equals(postOrder));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(n) space
  public static List<Integer> inOrderTraverse(BST tree, List<Integer> array) {
    if (tree.left != null) {
      inOrderTraverse(tree.left, array);
    }
    array.add(tree.value);
    if (tree.right != null) {
      inOrderTraverse(tree.right, array);
    }
    return array;
  }

  // O(n) time | O(n) space
  public static List<Integer> preOrderTraverse(BST tree, List<Integer> array) {
    array.add(tree.value);
    if (tree.left != null) {
      preOrderTraverse(tree.left, array);
    }
    if (tree.right != null) {
      preOrderTraverse(tree.right, array);
    }
    return array;
  }

  // O(n) time | O(n) space
  public static List<Integer> postOrderTraverse(BST tree, List<Integer> array) {
    if (tree.left != null) {
      postOrderTraverse(tree.left, array);
    }
    if (tree.right != null) {
      postOrderTraverse(tree.right, array);
    }
    array.add(tree.value);
    return array;
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
import java.util.*;

class ProgramTest {

  @Test
  public void TestCase1() {
    var root = new Program.BST(10);
    root.left = new Program.BST(5);
    root.left.left = new Program.BST(2);
    root.left.left.left = new Program.BST(1);
    root.left.right = new Program.BST(5);
    root.right = new Program.BST(15);
    root.right.right = new Program.BST(22);

    List<Integer> inOrder = Arrays.asList(new Integer[] {1, 2, 5, 5, 10, 15, 22});
    List<Integer> preOrder = Arrays.asList(new Integer[] {10, 5, 2, 1, 5, 15, 22});
    List<Integer> postOrder = Arrays.asList(new Integer[] {1, 2, 5, 5, 22, 15, 10});

    Utils.assertTrue(Program.inOrderTraverse(root, new ArrayList<Integer>()).equals(inOrder));
    Utils.assertTrue(Program.preOrderTraverse(root, new ArrayList<Integer>()).equals(preOrder));
    Utils.assertTrue(Program.postOrderTraverse(root, new ArrayList<Integer>()).equals(postOrder));
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
  root.right.right = new BST(22);
  chai.expect(program.inOrderTraverse(root, [])).to.deep.equal([1, 2, 5, 5, 10, 15, 22]);
  chai.expect(program.preOrderTraverse(root, [])).to.deep.equal([10, 5, 2, 1, 5, 15, 22]);
  chai.expect(program.postOrderTraverse(root, [])).to.deep.equal([1, 2, 5, 5, 22, 15, 10]);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space
function inOrderTraverse(tree, array) {
  if (tree !== null) {
    inOrderTraverse(tree.left, array);
    array.push(tree.value);
    inOrderTraverse(tree.right, array);
  }
  return array;
}

// O(n) time | O(n) space
function preOrderTraverse(tree, array) {
  if (tree !== null) {
    array.push(tree.value);
    preOrderTraverse(tree.left, array);
    preOrderTraverse(tree.right, array);
  }
  return array;
}

// O(n) time | O(n) space
function postOrderTraverse(tree, array) {
  if (tree !== null) {
    postOrderTraverse(tree.left, array);
    postOrderTraverse(tree.right, array);
    array.push(tree.value);
  }
  return array;
}

exports.inOrderTraverse = inOrderTraverse;
exports.preOrderTraverse = preOrderTraverse;
exports.postOrderTraverse = postOrderTraverse;

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
  root.right.right = new BST(22);
  chai.expect(program.inOrderTraverse(root, [])).to.deep.equal([1, 2, 5, 5, 10, 15, 22]);
  chai.expect(program.preOrderTraverse(root, [])).to.deep.equal([10, 5, 2, 1, 5, 15, 22]);
  chai.expect(program.postOrderTraverse(root, [])).to.deep.equal([1, 2, 5, 5, 22, 15, 10]);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.BST as BST
import com.algoexpert.program.inOrderTraverse as inOrderTraverse
import com.algoexpert.program.postOrderTraverse as postOrderTraverse
import com.algoexpert.program.preOrderTraverse as preOrderTraverse

class ProgramTest {
    @Test
    fun TestCase1() {
        val tree = BST(10)
        tree.left = BST(5)
        tree.left!!.left = BST(2)
        tree.left!!.left!!.left = BST(1)
        tree.left!!.right = BST(5)
        tree.right = BST(15)
        tree.right!!.right = BST(22)

        assert(inOrderTraverse(tree, mutableListOf<Int>()) == listOf(1, 2, 5, 5, 10, 15, 22))
        assert(preOrderTraverse(tree, mutableListOf<Int>()) == listOf(10, 5, 2, 1, 5, 15, 22))
        assert(postOrderTraverse(tree, mutableListOf<Int>()) == listOf(1, 2, 5, 5, 22, 15, 10))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

open class BST(value: Int) {
    var value = value
    var left: BST? = null
    var right: BST? = null
}

// O(n) time | O(n) space
fun inOrderTraverse(tree: BST?, array: MutableList<Int>): List<Int> {
    if (tree != null) {
        inOrderTraverse(tree.left, array)
        array.add(tree.value)
        inOrderTraverse(tree.right, array)
    }
    return array
}

// O(n) time | O(n) space
fun preOrderTraverse(tree: BST?, array: MutableList<Int>): List<Int> {
    if (tree != null) {
        array.add(tree.value)
        preOrderTraverse(tree.left, array)
        preOrderTraverse(tree.right, array)
    }
    return array
}

// O(n) time | O(n) space
fun postOrderTraverse(tree: BST?, array: MutableList<Int>): List<Int> {
    if (tree != null) {
        postOrderTraverse(tree.left, array)
        postOrderTraverse(tree.right, array)
        array.add(tree.value)
    }
    return array
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.BST as BST
import com.algoexpert.program.inOrderTraverse as inOrderTraverse
import com.algoexpert.program.postOrderTraverse as postOrderTraverse
import com.algoexpert.program.preOrderTraverse as preOrderTraverse

class ProgramTest {
    @Test
    fun TestCase1() {
        val tree = BST(10)
        tree.left = BST(5)
        tree.left!!.left = BST(2)
        tree.left!!.left!!.left = BST(1)
        tree.left!!.right = BST(5)
        tree.right = BST(15)
        tree.right!!.right = BST(22)

        assert(inOrderTraverse(tree, mutableListOf<Int>()) == listOf(1, 2, 5, 5, 10, 15, 22))
        assert(preOrderTraverse(tree, mutableListOf<Int>()) == listOf(10, 5, 2, 1, 5, 15, 22))
        assert(postOrderTraverse(tree, mutableListOf<Int>()) == listOf(1, 2, 5, 5, 22, 15, 10))
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
      root.right!.right = Program.BST(value: 22)

      let inOrder = [1, 2, 5, 5, 10, 15, 22]
      let preOrder = [10, 5, 2, 1, 5, 15, 22]
      let postOrder = [1, 2, 5, 5, 22, 15, 10]

      var output1 = [Int]()
      var output2 = [Int]()
      var output3 = [Int]()
      try assertEqual(inOrder, program.inOrderTraversal(tree: root, array: &output1))
      try assertEqual(preOrder, program.preOrderTraversal(tree: root, array: &output2))
      try assertEqual(postOrder, program.postOrderTraversal(tree: root, array: &output3))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  class BST {
    var value: Int?
    var left: BST?
    var right: BST?

    init(value: Int) {
      self.value = value
      left = nil
      right = nil
    }
  }

  // O(n) time | O(n) space
  func inOrderTraversal(tree: BST?, array: inout [Int]) -> [Int] {
    if tree !== nil {
      inOrderTraversal(tree: tree?.left, array: &array)

      if let value = tree?.value {
        array.append(value)
      }

      inOrderTraversal(tree: tree?.right, array: &array)
    }

    return array
  }

  // O(n) time | O(n) space
  func preOrderTraversal(tree: BST?, array: inout [Int]) -> [Int] {
    if tree !== nil {
      if let value = tree?.value {
        array.append(value)
      }

      preOrderTraversal(tree: tree?.left, array: &array)
      preOrderTraversal(tree: tree?.right, array: &array)
    }

    return array
  }

  // O(n) time | O(n) space
  func postOrderTraversal(tree: BST?, array: inout [Int]) -> [Int] {
    if tree !== nil {
      postOrderTraversal(tree: tree?.left, array: &array)
      postOrderTraversal(tree: tree?.right, array: &array)

      if let value = tree?.value {
        array.append(value)
      }
    }

    return array
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
      root.right!.right = Program.BST(value: 22)

      let inOrder = [1, 2, 5, 5, 10, 15, 22]
      let preOrder = [10, 5, 2, 1, 5, 15, 22]
      let postOrder = [1, 2, 5, 5, 22, 15, 10]

      var output1 = [Int]()
      var output2 = [Int]()
      var output3 = [Int]()
      try assertEqual(inOrder, program.inOrderTraversal(tree: root, array: &output1))
      try assertEqual(preOrder, program.preOrderTraversal(tree: root, array: &output2))
      try assertEqual(postOrder, program.postOrderTraversal(tree: root, array: &output3))
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
        root.right.right = BST(22)

        inOrder = [1, 2, 5, 5, 10, 15, 22]
        preOrder = [10, 5, 2, 1, 5, 15, 22]
        postOrder = [1, 2, 5, 5, 22, 15, 10]

        self.assertEqual(program.inOrderTraverse(root, []), inOrder)
        self.assertEqual(program.preOrderTraverse(root, []), preOrder)
        self.assertEqual(program.postOrderTraverse(root, []), postOrder)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space
def inOrderTraverse(tree, array):
    if tree is not None:
        inOrderTraverse(tree.left, array)
        array.append(tree.value)
        inOrderTraverse(tree.right, array)
    return array


# O(n) time | O(n) space
def preOrderTraverse(tree, array):
    if tree is not None:
        array.append(tree.value)
        preOrderTraverse(tree.left, array)
        preOrderTraverse(tree.right, array)
    return array


# O(n) time | O(n) space
def postOrderTraverse(tree, array):
    if tree is not None:
        postOrderTraverse(tree.left, array)
        postOrderTraverse(tree.right, array)
        array.append(tree.value)
    return array

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
        root.right.right = BST(22)

        inOrder = [1, 2, 5, 5, 10, 15, 22]
        preOrder = [10, 5, 2, 1, 5, 15, 22]
        postOrder = [1, 2, 5, 5, 22, 15, 10]

        self.assertEqual(program.inOrderTraverse(root, []), inOrder)
        self.assertEqual(program.preOrderTraverse(root, []), preOrder)
        self.assertEqual(program.postOrderTraverse(root, []), postOrder)

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
  root.right.right = new BST(22);
  chai.expect(program.inOrderTraverse(root, [])).to.deep.equal([1, 2, 5, 5, 10, 15, 22]);
  chai.expect(program.preOrderTraverse(root, [])).to.deep.equal([10, 5, 2, 1, 5, 15, 22]);
  chai.expect(program.postOrderTraverse(root, [])).to.deep.equal([1, 2, 5, 5, 22, 15, 10]);
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

// O(n) time | O(n) space
export function inOrderTraverse(tree: BST | null, array: number[]) {
  if (tree !== null) {
    inOrderTraverse(tree.left, array);
    array.push(tree.value);
    inOrderTraverse(tree.right, array);
  }
  return array;
}

// O(n) time | O(n) space
export function preOrderTraverse(tree: BST | null, array: number[]) {
  if (tree !== null) {
    array.push(tree.value);
    preOrderTraverse(tree.left, array);
    preOrderTraverse(tree.right, array);
  }
  return array;
}

// O(n) time | O(n) space
export function postOrderTraverse(tree: BST | null, array: number[]) {
  if (tree !== null) {
    postOrderTraverse(tree.left, array);
    postOrderTraverse(tree.right, array);
    array.push(tree.value);
  }
  return array;
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
  root.right.right = new BST(22);
  chai.expect(program.inOrderTraverse(root, [])).to.deep.equal([1, 2, 5, 5, 10, 15, 22]);
  chai.expect(program.preOrderTraverse(root, [])).to.deep.equal([10, 5, 2, 1, 5, 15, 22]);
  chai.expect(program.postOrderTraverse(root, [])).to.deep.equal([1, 2, 5, 5, 22, 15, 10]);
});

```

