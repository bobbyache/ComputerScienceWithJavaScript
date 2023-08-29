# Evaluate Expression Tree
<div class="html">
  <p>
    You're given a binary expression tree. Write a function to evaluate
    this tree mathematically and return a single resulting integer.
  </p>

  <p>
    All leaf nodes in the tree represent operands, which will always be positive
    integers. All of the other nodes represent operators. There are 4 operators
    supported, each of which is represented by a negative integer:
  </p>

  <ul>
    <li>
      <span>-1</span>: Addition operator, adding the left and right subtrees.
    </li>
    <li>
      <span>-2</span>: Subtraction operator, subtracting the right subtree from the left subtree.
    </li>
    <li>
      <span>-3</span>: Division operator, dividing the left subtree by the right subtree.
      If the result is a decimal, it should be rounded towards zero.
    </li>
    <li>
      <span>-4</span>: Multiplication operator, multiplying the left and right subtrees.
    </li>
  </ul>

  <p>
    You can assume the tree will always be a valid expression tree. Each
    operator also works as a grouping symbol, meaning the bottom of the tree is
    always evaluated first, regardless of the operator.
  </p>

<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">tree</span> =    -1
        /     \
      -2       -3
     /   \    /  \
   -4     2  8    3
  /   \
 2     3
</pre>
<h3>Sample Output</h3>
<pre>
6 <span class="CodeEditor-promptComment">// (((2 * 3) - 2) + (8 / 3))
</span>
</pre>

Hint 1
<p>
  This problem will be easiest to solve using recursion. Can you think of what
  the recursive subproblems would be? And what is the base case?
</p>


Hint 2

<p>
  For each operator, a recursive call can be made on its left and right values.
  The result of these recursive calls can then be combined using that operator.
  The base case to finish recursing will be when we reach an operand, which is
  any positive integer.
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
      BinaryTree *tree = new BinaryTree(-1);
      tree->left = new BinaryTree(2);
      tree->right = new BinaryTree(-2);
      tree->right->left = new BinaryTree(5);
      tree->right->right = new BinaryTree(1);
      int expected = 6;
      auto actual = evaluateExpressionTree(tree);
      assert(expected == actual);
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

  BinaryTree(int value) { this->value = value; }
};

// O(n) time | O(h) space - where n is the number of nodes in the Binary Tree,
// and h is the height of the Binary Tree
int evaluateExpressionTree(BinaryTree *tree) {
  if (tree->value >= 0) {
    return tree->value;
  }

  int leftValue = evaluateExpressionTree(tree->left);
  int rightValue = evaluateExpressionTree(tree->right);

  if (tree->value == -1) {
    return leftValue + rightValue;
  } else if (tree->value == -2) {
    return leftValue - rightValue;
  } else if (tree->value == -3) {
    return leftValue / rightValue;
  }
  return leftValue * rightValue;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      BinaryTree *tree = new BinaryTree(-1);
      tree->left = new BinaryTree(2);
      tree->right = new BinaryTree(-2);
      tree->right->left = new BinaryTree(5);
      tree->right->right = new BinaryTree(1);
      int expected = 6;
      auto actual = evaluateExpressionTree(tree);
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
		Program.BinaryTree tree = new Program.BinaryTree(-1);
		tree.left = new Program.BinaryTree(2);
		tree.right = new Program.BinaryTree(-2);
		tree.right.left = new Program.BinaryTree(5);
		tree.right.right = new Program.BinaryTree(1);
		var expected = 6;
		var actual = new Program().EvaluateExpressionTree(tree);
		Utils.AssertTrue(expected == actual);
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

	// O(n) time | O(h) space - where n is the number of nodes in the Binary Tree,
	// and h is the height of the Binary Tree
	public int EvaluateExpressionTree(BinaryTree tree) {
		if (tree.value >= 0) {
			return tree.value;
		}

		int leftValue = EvaluateExpressionTree(tree.left);
		int rightValue = EvaluateExpressionTree(tree.right);

		if (tree.value == -1) {
			return leftValue + rightValue;
		} else if (tree.value == -2) {
			return leftValue - rightValue;
		} else if (tree.value == -3) {
			return leftValue / rightValue;
		}
		return leftValue * rightValue;
	}
}


```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		Program.BinaryTree tree = new Program.BinaryTree(-1);
		tree.left = new Program.BinaryTree(2);
		tree.right = new Program.BinaryTree(-2);
		tree.right.left = new Program.BinaryTree(5);
		tree.right.right = new Program.BinaryTree(1);
		var expected = 6;
		var actual = new Program().EvaluateExpressionTree(tree);
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
	tree := &BinaryTree{Value: -1}
	tree.Left = &BinaryTree{Value: 2}
	tree.Right = &BinaryTree{Value: -2}
	tree.Right.Left = &BinaryTree{Value: 5}
	tree.Right.Right = &BinaryTree{Value: 1}
	expected := 6
	actual := EvaluateExpressionTree(tree)
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

// O(n) time | O(h) space - where n is the number of nodes in the Binary Tree,
// and h is the height of the Binary Tree
func EvaluateExpressionTree(tree *BinaryTree) int {
	if tree.Value >= 0 {
		return tree.Value
	}

	leftValue := EvaluateExpressionTree(tree.Left)
	rightValue := EvaluateExpressionTree(tree.Right)

	if tree.Value == -1 {
		return leftValue + rightValue
	}
	if tree.Value == -2 {
		return leftValue - rightValue
	}
	if tree.Value == -3 {
		return leftValue / rightValue
	}
	return leftValue * rightValue
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	tree := &BinaryTree{Value: -1}
	tree.Left = &BinaryTree{Value: 2}
	tree.Right = &BinaryTree{Value: -2}
	tree.Right.Left = &BinaryTree{Value: 5}
	tree.Right.Right = &BinaryTree{Value: 1}
	expected := 6
	actual := EvaluateExpressionTree(tree)
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
    Program.BinaryTree tree = new Program.BinaryTree(-1);
    tree.left = new Program.BinaryTree(2);
    tree.right = new Program.BinaryTree(-2);
    tree.right.left = new Program.BinaryTree(5);
    tree.right.right = new Program.BinaryTree(1);
    var expected = 6;
    var actual = new Program().evaluateExpressionTree(tree);
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
  static class BinaryTree {
    public int value;
    public BinaryTree left = null;
    public BinaryTree right = null;

    public BinaryTree(int value) {
      this.value = value;
    }
  }

  // O(n) time | O(h) space - where n is the number of nodes in the Binary Tree,
  // and h is the height of the Binary Tree
  public int evaluateExpressionTree(BinaryTree tree) {
    if (tree.value >= 0) {
      return tree.value;
    }

    int leftValue = evaluateExpressionTree(tree.left);
    int rightValue = evaluateExpressionTree(tree.right);

    if (tree.value == -1) {
      return leftValue + rightValue;
    } else if (tree.value == -2) {
      return leftValue - rightValue;
    } else if (tree.value == -3) {
      return leftValue / rightValue;
    }
    return leftValue * rightValue;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    Program.BinaryTree tree = new Program.BinaryTree(-1);
    tree.left = new Program.BinaryTree(2);
    tree.right = new Program.BinaryTree(-2);
    tree.right.left = new Program.BinaryTree(5);
    tree.right.right = new Program.BinaryTree(1);
    var expected = 6;
    var actual = new Program().evaluateExpressionTree(tree);
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

it('Test Case #1', function () {
  const tree = new program.BinaryTree(-1);
  tree.left = new program.BinaryTree(2);
  tree.right = new program.BinaryTree(-2);
  tree.right.left = new program.BinaryTree(5);
  tree.right.right = new program.BinaryTree(1);
  const expected = 6;
  const actual = program.evaluateExpressionTree(tree);
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

// O(n) time | O(h) space - where n is the number of nodes in the Binary Tree,
// and h is the height of the Binary Tree
function evaluateExpressionTree(tree) {
  if (tree.value >= 0) return tree.value;

  const leftValue = evaluateExpressionTree(tree.left);
  const rightValue = evaluateExpressionTree(tree.right);

  if (tree.value === -1) return leftValue + rightValue;
  if (tree.value === -2) return leftValue - rightValue;
  if (tree.value === -3) return Math.trunc(leftValue / rightValue);

  return leftValue * rightValue;
}

// Do not edit the lines below.
exports.BinaryTree = BinaryTree;
exports.evaluateExpressionTree = evaluateExpressionTree;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const tree = new program.BinaryTree(-1);
  tree.left = new program.BinaryTree(2);
  tree.right = new program.BinaryTree(-2);
  tree.right.left = new program.BinaryTree(5);
  tree.right.right = new program.BinaryTree(1);
  const expected = 6;
  const actual = program.evaluateExpressionTree(tree);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.evaluateExpressionTree
import com.algoexpert.program.BinaryTree as BinaryTree

class ProgramTest {
    @Test
    fun TestCase1() {
        val tree = BinaryTree(-1)
        tree.left = BinaryTree(2)
        tree.right = BinaryTree(-2)
        tree.right!!.left = BinaryTree(5)
        tree.right!!.right = BinaryTree(1)
        val expected = 6
        val output = evaluateExpressionTree(tree)
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

// O(n) time | O(h) space - where n is the number of nodes in the Binary Tree,
// and h is the height of the Binary Tree
fun evaluateExpressionTree(tree: BinaryTree): Int {
    if (tree.value >= 0) return tree.value

    val leftValue = evaluateExpressionTree(tree.left!!)
    val rightValue = evaluateExpressionTree(tree.right!!)

    if (tree.value == -1) return leftValue + rightValue
    if (tree.value == -2) return leftValue - rightValue
    if (tree.value == -3) return leftValue / rightValue

    return leftValue * rightValue
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.evaluateExpressionTree
import com.algoexpert.program.BinaryTree as BinaryTree

class ProgramTest {
    @Test
    fun TestCase1() {
        val tree = BinaryTree(-1)
        tree.left = BinaryTree(2)
        tree.right = BinaryTree(-2)
        tree.right!!.left = BinaryTree(5)
        tree.right!!.right = BinaryTree(1)
        val expected = 6
        val output = evaluateExpressionTree(tree)
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
    runTest("Test Case 1") { () throws in
      let tree = Program.BinaryTree(value: -1)
      tree.left = Program.BinaryTree(value: 2)
      tree.right = Program.BinaryTree(value: -2)
      tree.right!.left = Program.BinaryTree(value: 5)
      tree.right!.right = Program.BinaryTree(value: 1)
      let expected = 6
      var actual = Program().evaluateExpressionTree(tree)
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

  // O(n) time | O(h) space - where n is the number of nodes in the Binary Tree,
  // and h is the height of the Binary Tree
  func evaluateExpressionTree(_ tree: BinaryTree) -> Int {
    if tree.value >= 0 {
      return tree.value
    }

    let leftValue = evaluateExpressionTree(tree.left!)
    let rightValue = evaluateExpressionTree(tree.right!)

    if tree.value == -1 {
      return leftValue + rightValue
    }
    if tree.value == -2 {
      return leftValue - rightValue
    }
    if tree.value == -3 {
      return leftValue / rightValue
    }
    return leftValue * rightValue
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws in
      let tree = Program.BinaryTree(value: -1)
      tree.left = Program.BinaryTree(value: 2)
      tree.right = Program.BinaryTree(value: -2)
      tree.right!.left = Program.BinaryTree(value: 5)
      tree.right!.right = Program.BinaryTree(value: 1)
      let expected = 6
      var actual = Program().evaluateExpressionTree(tree)
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
        tree = program.BinaryTree(-1)
        tree.left = program.BinaryTree(2)
        tree.right = program.BinaryTree(-2)
        tree.right.left = program.BinaryTree(5)
        tree.right.right = program.BinaryTree(1)
        expected = 6
        actual = program.evaluateExpressionTree(tree)
        self.assertEqual(actual, expected)

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


# O(n) time | O(h) space - where n is the number of nodes in the Binary Tree,
# and h is the height of the Binary Tree
def evaluateExpressionTree(tree):
    if tree.value >= 0:
        return tree.value

    leftValue = evaluateExpressionTree(tree.left)
    rightValue = evaluateExpressionTree(tree.right)

    if tree.value == -1:
        return leftValue + rightValue
    if tree.value == -2:
        return leftValue - rightValue
    if tree.value == -3:
        return int(leftValue / rightValue)

    return leftValue * rightValue

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        tree = program.BinaryTree(-1)
        tree.left = program.BinaryTree(2)
        tree.right = program.BinaryTree(-2)
        tree.right.left = program.BinaryTree(5)
        tree.right.right = program.BinaryTree(1)
        expected = 6
        actual = program.evaluateExpressionTree(tree)
        self.assertEqual(actual, expected)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const tree = new program.BinaryTree(-1);
  tree.left = new program.BinaryTree(2);
  tree.right = new program.BinaryTree(-2);
  tree.right.left = new program.BinaryTree(5);
  tree.right.right = new program.BinaryTree(1);
  const expected = 6;
  const actual = program.evaluateExpressionTree(tree);
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

// O(n) time | O(h) space - where n is the number of nodes in the Binary Tree,
// and h is the height of the Binary Tree
export function evaluateExpressionTree(tree: BinaryTree): number {
  if (tree.value >= 0) return tree.value;

  const leftValue = evaluateExpressionTree(tree.left!);
  const rightValue = evaluateExpressionTree(tree.right!);

  if (tree.value === -1) return leftValue + rightValue;
  if (tree.value === -2) return leftValue - rightValue;
  if (tree.value === -3) return Math.trunc(leftValue / rightValue);

  return leftValue * rightValue;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const tree = new program.BinaryTree(-1);
  tree.left = new program.BinaryTree(2);
  tree.right = new program.BinaryTree(-2);
  tree.right.left = new program.BinaryTree(5);
  tree.right.right = new program.BinaryTree(1);
  const expected = 6;
  const actual = program.evaluateExpressionTree(tree);
  chai.expect(actual).to.deep.equal(expected);
});

```

