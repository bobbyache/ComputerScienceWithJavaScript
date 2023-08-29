# Validate BST
<div class="html">
<p>
  Write a function that takes in a potentially invalid Binary Search Tree (BST)
  and returns a boolean representing whether the BST is valid.
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
<p>
  A BST is valid if and only if all of its nodes are valid
  <span>BST</span> nodes.
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
</pre>
<h3>Sample Output</h3>
<pre>true</pre>
</div>

Hint 1
<p>
Every node in the BST has a maximum possible value and a minimum possible value. In other words, the value of any given node in the BST must be strictly smaller than some value (the value of its closest right parent) and must be greater than or equal to some other value (the value of its closest left parent).
</p>


Hint 2

<p>
Validate the BST by recursively calling the validateBst function on every node, passing in the correct maximum and minimum possible values to each. Initialize those values to be -Infinity and +Infinity.
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
      assert(validateBst(root) == true);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <climits>
using namespace std;

class BST {
public:
  int value;
  BST *left;
  BST *right;

  BST(int val);
  BST &insert(int val);
};

bool validateBst(BST *tree);
bool validateBstHelper(BST *tree, int minValue, int maxValue);

// O(n) time | O(d) space
bool validateBst(BST *tree) {
  return validateBstHelper(tree, INT_MIN, INT_MAX);
}

bool validateBstHelper(BST *tree, int minValue, int maxValue) {
  if (tree->value < minValue || tree->value >= maxValue) {
    return false;
  }
  if (tree->left != nullptr &&
      !validateBstHelper(tree->left, minValue, tree->value)) {
    return false;
  }
  if (tree->right != nullptr &&
      !validateBstHelper(tree->right, tree->value, maxValue)) {
    return false;
  }
  return true;
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
      assert(validateBst(root) == true);
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

		Utils.AssertTrue(Program.ValidateBst(root));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// O(n) time | O(d) space
	public static bool ValidateBst(BST tree) {
		return ValidateBst(tree, Int32.MinValue, Int32.MaxValue);
	}

	public static bool ValidateBst(BST tree, int minValue, int maxValue) {
		if (tree.value < minValue || tree.value >= maxValue) {
			return false;
		}
		if (tree.left != null && !ValidateBst(tree.left, minValue, tree.value)) {
			return false;
		}
		if (tree.right != null && !ValidateBst(tree.right, tree.value, maxValue)) {
			return false;
		}
		return true;
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

		Utils.AssertTrue(Program.ValidateBst(root));
	}
}

```
### Sandbox Code (go)
```go
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

package main

import "github.com/stretchr/testify/require"

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

	output := root.ValidateBst()
	require.True(t, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "math"

type BST struct {
	Value int

	Left  *BST
	Right *BST
}

// O(n) time | O(d) space
func (tree *BST) ValidateBst() bool {
	return tree.validateBst(math.MinInt32, math.MaxInt32)
}

func (tree *BST) validateBst(min, max int) bool {
	if tree.Value < min || tree.Value >= max {
		return false
	}
	if tree.Left != nil && !tree.Left.validateBst(min, tree.Value) {
		return false
	}
	if tree.Right != nil && !tree.Right.validateBst(tree.Value, max) {
		return false
	}
	return true
}

```
### Unit Tests 1 (go)
```go
package main

import "github.com/stretchr/testify/require"

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

	output := root.ValidateBst()
	require.True(t, output)
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

    Utils.assertTrue(Program.validateBst(root));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(d) space
  public static boolean validateBst(BST tree) {
    return validateBst(tree, Integer.MIN_VALUE, Integer.MAX_VALUE);
  }

  public static boolean validateBst(BST tree, int minValue, int maxValue) {
    if (tree.value < minValue || tree.value >= maxValue) {
      return false;
    }
    if (tree.left != null && !validateBst(tree.left, minValue, tree.value)) {
      return false;
    }
    if (tree.right != null && !validateBst(tree.right, tree.value, maxValue)) {
      return false;
    }
    return true;
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

    Utils.assertTrue(Program.validateBst(root));
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

  chai.expect(program.validateBst(root)).to.deep.equal(true);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// O(n) time | O(d) space
function validateBst(tree) {
  return validateBstHelper(tree, -Infinity, Infinity);
}

function validateBstHelper(tree, minValue, maxValue) {
  if (tree === null) return true;
  if (tree.value < minValue || tree.value >= maxValue) return false;
  const leftIsValid = validateBstHelper(tree.left, minValue, tree.value);
  return leftIsValid && validateBstHelper(tree.right, tree.value, maxValue);
}

exports.BST = BST;
exports.validateBst = validateBst;

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

  chai.expect(program.validateBst(root)).to.deep.equal(true);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.BST as BST
import com.algoexpert.program.validateBst as validateBst

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

        assert(validateBst(tree))
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

// O(n) time | O(d) space
fun validateBst(tree: BST): Boolean {
    return validateBstHelper(tree, Int.MIN_VALUE, Int.MAX_VALUE)
}

fun validateBstHelper(tree: BST?, minValue: Int, maxValue: Int): Boolean {
    if (tree == null) return true
    if (tree.value < minValue || tree.value >= maxValue) return false
    val leftIsValid = validateBstHelper(tree.left, minValue, tree.value)
    return leftIsValid && validateBstHelper(tree.right, tree.value, maxValue)
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.BST as BST
import com.algoexpert.program.validateBst as validateBst

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

        assert(validateBst(tree))
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

      try assertEqual(true, program.validateBst(tree: root))
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

  // O(n) time | O(d) space
  func validateBst(tree: BST) -> Bool {
    var minimum = Int(Int32.min)
    var maximum = Int(Int32.max)
    return validateBstHelper(tree: tree, minimum: &minimum, maximum: &maximum)
  }

  func validateBstHelper(tree: BST?, minimum: inout Int, maximum: inout Int) -> Bool {
    if tree === nil {
      return true
    }

    if let tree = tree, let value = tree.value, value < minimum || value >= maximum {
      return false
    }

    if var treeValue = tree?.value {
      let leftIsValid = validateBstHelper(tree: tree?.left, minimum: &minimum, maximum: &treeValue)
      let rightIsValid = validateBstHelper(tree: tree?.right, minimum: &treeValue, maximum: &maximum)

      return leftIsValid && rightIsValid
    } else {
      return false
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
      let root = Program.BST(value: 10)
      root.left = Program.BST(value: 5)
      root.left!.left = Program.BST(value: 2)
      root.left!.left!.left = Program.BST(value: 1)
      root.left!.right = Program.BST(value: 5)
      root.right = Program.BST(value: 15)
      root.right!.left = Program.BST(value: 13)
      root.right!.left!.right = Program.BST(value: 14)
      root.right!.right = Program.BST(value: 22)

      try assertEqual(true, program.validateBst(tree: root))
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
        self.assertEqual(program.validateBst(root), True)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


# O(n) time | O(d) space
def validateBst(tree):
    return validateBstHelper(tree, float("-inf"), float("inf"))


def validateBstHelper(tree, minValue, maxValue):
    if tree is None:
        return True
    if tree.value < minValue or tree.value >= maxValue:
        return False
    leftIsValid = validateBstHelper(tree.left, minValue, tree.value)
    return leftIsValid and validateBstHelper(tree.right, tree.value, maxValue)

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
        self.assertEqual(program.validateBst(root), True)

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

  chai.expect(program.validateBst(root)).to.deep.equal(true);
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

// O(n) time | O(d) space
export function validateBst(tree: BST) {
  return validateBstHelper(tree, -Infinity, Infinity);
}

function validateBstHelper(tree: BST | null, minValue: number, maxValue: number): boolean {
  if (tree === null) return true;
  if (tree.value < minValue || tree.value >= maxValue) return false;
  const leftIsValid = validateBstHelper(tree.left, minValue, tree.value);
  return leftIsValid && validateBstHelper(tree.right, tree.value, maxValue);
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

  chai.expect(program.validateBst(root)).to.deep.equal(true);
});

```

