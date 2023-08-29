# Validate Three Nodes
<div class="html">
<p>
  You're given three nodes that are contained in the same Binary Search Tree:
  <span>nodeOne</span>, <span>nodeTwo</span>, and <span>nodeThree</span>. Write
  a function that returns a boolean representing whether one of
  <span>nodeOne</span> or <span>nodeThree</span> is an ancestor of
  <span>nodeTwo</span> and the other node is a descendant of
  <span>nodeTwo</span>. For example, if your function determines that
  <span>nodeOne</span> is an ancestor of <span>nodeTwo</span>, then it needs to
  see if <span>nodeThree</span> is a descendant of <span>nodeTwo</span>. If your
  function determines that <span>nodeThree</span> is an ancestor, then it needs
  to see if <span>nodeOne</span> is a descendant.
</p>
<p>
  A <b>descendant</b> of a node <span>N</span> is defined as a node contained in
  the tree rooted at <span>N</span>. A node <span>N</span> is an ancestor of
  another node <span>M</span> if <span>M</span> is a descendant of
  <span>N</span>.
</p>
<p>
  It isn't guaranteed that <span>nodeOne</span> or <span>nodeThree</span> will
  be ancestors or descendants of <span>nodeTwo</span>, but it is guaranteed that
  all three nodes will be unique and will never be <span>None</span> /
  <span>null</span>. In other words, you'll be given valid input nodes.
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
<span class="CodeEditor-promptParameter">tree</span> =    5
       /     \
      2       7
    /   \   /   \
   1     4 6     8
  /     /
 0     3  
<span class="CodeEditor-promptComment">// This tree won't actually be passed as an input; it's here to help you visualize the problem.</span>
<span class="CodeEditor-promptParameter">nodeOne</span> = 5 <span class="CodeEditor-promptComment">// The actual node with value 5.</span>
<span class="CodeEditor-promptParameter">nodeTwo</span> = 2 <span class="CodeEditor-promptComment">// The actual node with value 2.</span>
<span class="CodeEditor-promptParameter">nodeThree</span> = 3 <span class="CodeEditor-promptComment">// The actual node with value 3.</span>
</pre>
<h3>Sample Output</h3>
<pre>
true <span class="CodeEditor-promptComment">// nodeOne is an ancestor of nodeTwo, and nodeThree is a descendant of nodeTwo.</span>
</pre>
</div>

Hint 1
<p>
  Keep in mind that the nodes passed to you are contained in a Binary
  <b><i>Search</i></b>
  Tree—not just a normal Binary Tree. How might this help you traverse the tree
  faster?
</p>


Hint 2

<p>
  There are multiple ways to solve this problem, but the simplest is to just
  check the possible relationships between the nodes. Since you're looking for a
  descendant and an ancestor, simply check if <span>nodeOne</span> is a
  descendant of <span>nodeTwo</span>, and if it is, then check if
  <span>nodeThree</span> is an ancestor of <span>nodeTwo</span>. If the previous
  checks come out negative, check if <span>nodeThree</span> is a descendant of
  <span>nodeTwo</span>, and if it is, then check if <span>nodeOne</span> is an
  ancestor of <span>nodeTwo</span>.
</p>


Hint 3

<p>
  Although the approach mentioned in Hint #2 is fairly efficient (it runs in
  <span>O(h)</span> time, where h is the height of the tree), there's a way to
  solve this problem faster. It involves realizing that, when searching for
  <span>nodeTwo</span> from either <span>nodeOne</span> or
  <span>nodeThree</span>, if you ever reach <span>nodeThree</span> from
  <span>nodeOne</span> or <span>nodeOne</span> from
  <span>nodeThree</span> before reaching <span>nodeTwo</span>, then you can
  immediately stop the algorithm, because <span>nodeTwo</span> cannot be between
  these nodes. See the Conceptual Overview section of this question's video
  explanation for a more in-depth explanation.
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
      BST *root = new BST(5);
      root->left = new BST(2);
      root->right = new BST(7);
      root->left->left = new BST(1);
      root->left->right = new BST(4);
      root->right->left = new BST(6);
      root->right->right = new BST(8);
      root->left->left->left = new BST(0);
      root->left->right->left = new BST(3);
      BST *nodeOne = root;
      BST *nodeTwo = root->left;
      BST *nodeThree = root->left->right->left;
      bool expected = true;
      auto actual = validateThreeNodes(nodeOne, nodeTwo, nodeThree);
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
class BST {
public:
  int value;
  BST *left = nullptr;
  BST *right = nullptr;

  BST(int value) { this->value = value; }
};

bool isDescendant(BST *node, BST *target);

// O(h) time | O(h) space - where h is the height of the tree
bool validateThreeNodes(BST *nodeOne, BST *nodeTwo, BST *nodeThree) {
  if (isDescendant(nodeTwo, nodeOne))
    return isDescendant(nodeThree, nodeTwo);

  if (isDescendant(nodeTwo, nodeThree))
    return isDescendant(nodeOne, nodeTwo);

  return false;
}

// Whether the `target` is a descendant of the `node`.
bool isDescendant(BST *node, BST *target) {
  if (node == nullptr)
    return false;

  if (node == target)
    return true;

  return target->value < node->value ? isDescendant(node->left, target)
                                     : isDescendant(node->right, target);
}
```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// This is an input class. Do not edit.
class BST {
public:
  int value;
  BST *left = nullptr;
  BST *right = nullptr;

  BST(int value) { this->value = value; }
};

bool isDescendant(BST *node, BST *target);

// O(h) time | O(1) space - where h is the height of the tree
bool validateThreeNodes(BST *nodeOne, BST *nodeTwo, BST *nodeThree) {
  if (isDescendant(nodeTwo, nodeOne))
    return isDescendant(nodeThree, nodeTwo);

  if (isDescendant(nodeTwo, nodeThree))
    return isDescendant(nodeOne, nodeTwo);

  return false;
}

// Whether the `target` is a descendant of the `node`.
bool isDescendant(BST *node, BST *target) {
  BST *currentNode = node;
  while (currentNode != nullptr && currentNode != target) {
    currentNode = target->value < currentNode->value ? currentNode->left
                                                     : currentNode->right;
  }

  return currentNode == target;
}
```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// This is an input class. Do not edit.
class BST {
public:
  int value;
  BST *left = nullptr;
  BST *right = nullptr;

  BST(int value) { this->value = value; }
};

bool searchForTarget(BST *node, BST *target);

// O(d) time | O(1) space - where d is the distance between nodeOne and
// nodeThree
bool validateThreeNodes(BST *nodeOne, BST *nodeTwo, BST *nodeThree) {
  BST *searchOne = nodeOne;
  BST *searchTwo = nodeThree;

  while (true) {
    bool foundThreeFromOne = searchOne == nodeThree;
    bool foundOneFromThree = searchTwo == nodeOne;
    bool foundNodeTwo = searchOne == nodeTwo || searchTwo == nodeTwo;
    bool finishedSearching = searchOne == nullptr && searchTwo == nullptr;
    if (foundThreeFromOne || foundOneFromThree || foundNodeTwo ||
        finishedSearching) {
      break;
    }

    if (searchOne != nullptr) {
      searchOne = searchOne->value > nodeTwo->value ? searchOne->left
                                                    : searchOne->right;
    }

    if (searchTwo != nullptr) {
      searchTwo = searchTwo->value > nodeTwo->value ? searchTwo->left
                                                    : searchTwo->right;
    }
  }

  bool foundNodeFromOther = searchOne == nodeThree || searchTwo == nodeOne;
  bool foundNodeTwo = searchOne == nodeTwo || searchTwo == nodeTwo;
  if (!foundNodeTwo || foundNodeFromOther)
    return false;

  return searchForTarget(nodeTwo, searchOne == nodeTwo ? nodeThree : nodeOne);
}

bool searchForTarget(BST *node, BST *target) {
  BST *currentNode = node;
  while (currentNode != nullptr && currentNode != target) {
    currentNode = target->value < currentNode->value ? currentNode->left
                                                     : currentNode->right;
  }

  return currentNode == target;
}
```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      BST *root = new BST(5);
      root->left = new BST(2);
      root->right = new BST(7);
      root->left->left = new BST(1);
      root->left->right = new BST(4);
      root->right->left = new BST(6);
      root->right->right = new BST(8);
      root->left->left->left = new BST(0);
      root->left->right->left = new BST(3);
      BST *nodeOne = root;
      BST *nodeTwo = root->left;
      BST *nodeThree = root->left->right->left;
      bool expected = true;
      auto actual = validateThreeNodes(nodeOne, nodeTwo, nodeThree);
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
		var root = new Program.BST(5);
		root.left = new Program.BST(2);
		root.right = new Program.BST(7);
		root.left.left = new Program.BST(1);
		root.left.right = new Program.BST(4);
		root.right.left = new Program.BST(6);
		root.right.right = new Program.BST(8);
		root.left.left.left = new Program.BST(0);
		root.left.right.left = new Program.BST(3);

		var nodeOne = root;
		var nodeTwo = root.left;
		var nodeThree = root.left.right.left;
		bool expected = true;
		bool actual = new Program().ValidateThreeNodes(nodeOne, nodeTwo, nodeThree);
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
	public class BST {
		public int value;
		public BST left = null;
		public BST right = null;

		public BST(int value) {
			this.value = value;
		}
	}

	// O(h) time | O(h) space - where h is the height of the tree
	public bool ValidateThreeNodes(BST nodeOne, BST nodeTwo, BST nodeThree) {
		if (isDescendant(nodeTwo, nodeOne)) {
			return isDescendant(nodeThree, nodeTwo);
		}

		if (isDescendant(nodeTwo, nodeThree)) {
			return isDescendant(nodeOne, nodeTwo);
		}

		return false;
	}

	// Whether the `target` is a descendant of the `node`.
	public bool isDescendant(BST node, BST target) {
		if (node == null) {
			return false;
		}

		if (node == target) {
			return true;
		}

		return (target.value < node.value) ? isDescendant(node.left, target) : isDescendant(
			node.right, target);
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

	// O(h) time | O(1) space - where h is the height of the tree
	public bool ValidateThreeNodes(BST nodeOne, BST nodeTwo, BST nodeThree) {
		if (isDescendant(nodeTwo, nodeOne)) {
			return isDescendant(nodeThree, nodeTwo);
		}

		if (isDescendant(nodeTwo, nodeThree)) {
			return isDescendant(nodeOne, nodeTwo);
		}

		return false;
	}

	// Whether the `target` is a descendant of the `node`.
	public bool isDescendant(BST node, BST target) {
		while (node != null && node != target) {
			node = (target.value < node.value) ? node.left : node.right;
		}

		return node == target;
	}
}

```
### Solution 3 (csharp)
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

	// O(d) time | O(1) space - where d is the distance between nodeOne and nodeThree
	public bool ValidateThreeNodes(BST nodeOne, BST nodeTwo, BST nodeThree) {
		BST searchOne = nodeOne;
		BST searchTwo = nodeThree;

		while (true) {
			bool foundThreeFromOne = searchOne == nodeThree;
			bool foundOneFromThree = searchTwo == nodeOne;
			bool foundNodeTwo = (searchOne == nodeTwo) || (searchTwo == nodeTwo);
			bool finishedSearching = (searchOne == null) && (searchTwo == null);
			if (foundThreeFromOne || foundOneFromThree || foundNodeTwo ||
			  finishedSearching) {
				break;
			}

			if (searchOne != null) {
				searchOne =
				  (searchOne.value >
				  nodeTwo.value) ? searchOne.left : searchOne.right;
			}

			if (searchTwo != null) {
				searchTwo =
				  (searchTwo.value >
				  nodeTwo.value) ? searchTwo.left : searchTwo.right;
			}
		}

		bool foundNodeFromOther = (searchOne == nodeThree) || (searchTwo == nodeOne);
		bool foundNodeTwoFinal = (searchOne == nodeTwo) || (searchTwo == nodeTwo);
		if (!foundNodeTwoFinal || foundNodeFromOther) {
			return false;
		}

		return searchForTarget(nodeTwo, (searchOne == nodeTwo) ? nodeThree : nodeOne);
	}

	public bool searchForTarget(BST node, BST target) {
		while (node != null && node != target) {
			node = (target.value < node.value) ? node.left : node.right;
		}

		return node == target;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		var root = new Program.BST(5);
		root.left = new Program.BST(2);
		root.right = new Program.BST(7);
		root.left.left = new Program.BST(1);
		root.left.right = new Program.BST(4);
		root.right.left = new Program.BST(6);
		root.right.right = new Program.BST(8);
		root.left.left.left = new Program.BST(0);
		root.left.right.left = new Program.BST(3);

		var nodeOne = root;
		var nodeTwo = root.left;
		var nodeThree = root.left.right.left;
		bool expected = true;
		bool actual = new Program().ValidateThreeNodes(nodeOne, nodeTwo, nodeThree);
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
	root := &BST{Value: 5}
	root.Left = &BST{Value: 2}
	root.Right = &BST{Value: 7}
	root.Left.Left = &BST{Value: 1}
	root.Left.Right = &BST{Value: 4}
	root.Right.Left = &BST{Value: 6}
	root.Right.Right = &BST{Value: 8}
	root.Left.Left.Left = &BST{Value: 0}
	root.Left.Right.Left = &BST{Value: 3}

	nodeOne := root
	nodeTwo := root.Left
	nodeThree := root.Left.Right.Left
	expected := true
	actual := ValidateThreeNodes(nodeOne, nodeTwo, nodeThree)
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

// O(h) time | O(h) space - where h is the height of the tree
func ValidateThreeNodes(nodeOne *BST, nodeTwo *BST, nodeThree *BST) bool {
	if isDescendant(nodeTwo, nodeOne) {
		return isDescendant(nodeThree, nodeTwo)
	}

	if isDescendant(nodeTwo, nodeThree) {
		return isDescendant(nodeOne, nodeTwo)
	}

	return false
}

func isDescendant(node *BST, target *BST) bool {
	if node == nil {
		return false
	}

	if node == target {
		return true
	}

	if target.Value < node.Value {
		return isDescendant(node.Left, target)
	}
	return isDescendant(node.Right, target)
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

// O(h) time | O(1) space - where h is the height of the tree
func ValidateThreeNodes(nodeOne *BST, nodeTwo *BST, nodeThree *BST) bool {
	if isDescendant(nodeTwo, nodeOne) {
		return isDescendant(nodeThree, nodeTwo)
	}

	if isDescendant(nodeTwo, nodeThree) {
		return isDescendant(nodeOne, nodeTwo)
	}

	return false
}

// Whether the `target` is a descendant of the `node`.
func isDescendant(node *BST, target *BST) bool {
	currentNode := node
	for currentNode != nil && currentNode != target {
		if target.Value < currentNode.Value {
			currentNode = currentNode.Left
		} else {
			currentNode = currentNode.Right
		}
	}

	return currentNode == target
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// This is an input class. Do not edit.
type BST struct {
	Value int

	Left  *BST
	Right *BST
	value bool
}

// O(d) time | O(1) space - where d is the distance between nodeOne and nodeThree
func ValidateThreeNodes(nodeOne *BST, nodeTwo *BST, nodeThree *BST) bool {
	searchOne := nodeOne
	searchTwo := nodeThree

	for {
		foundThreeFromOne := searchOne == nodeThree
		foundOneFromThree := searchTwo == nodeOne
		foundNodeTwo := searchOne == nodeTwo || searchTwo == nodeTwo
		finishedSearching := searchOne == nil && searchTwo == nil
		if foundThreeFromOne || foundOneFromThree || foundNodeTwo || finishedSearching {
			break
		}

		if searchOne != nil {
			if searchOne.Value > nodeTwo.Value {
				searchOne = searchOne.Left
			} else {
				searchOne = searchOne.Right
			}
		}

		if searchTwo != nil {
			if searchTwo.Value > nodeTwo.Value {
				searchTwo = searchTwo.Left
			} else {
				searchTwo = searchTwo.Right
			}
		}
	}

	foundNodeFromOther := searchOne == nodeThree || searchTwo == nodeOne
	foundNodeTwo := searchOne == nodeTwo || searchTwo == nodeTwo
	if !foundNodeTwo || foundNodeFromOther {
		return false
	}

	if searchOne == nodeTwo {
		return searchForTarget(nodeTwo, nodeThree)
	}
	return searchForTarget(nodeTwo, nodeOne)
}

func searchForTarget(node *BST, target *BST) bool {
	currentNode := node
	for currentNode != nil && currentNode != target {
		if target.Value < currentNode.Value {
			currentNode = currentNode.Left
		} else {
			currentNode = currentNode.Right
		}
	}

	return currentNode == target
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	root := &BST{Value: 5}
	root.Left = &BST{Value: 2}
	root.Right = &BST{Value: 7}
	root.Left.Left = &BST{Value: 1}
	root.Left.Right = &BST{Value: 4}
	root.Right.Left = &BST{Value: 6}
	root.Right.Right = &BST{Value: 8}
	root.Left.Left.Left = &BST{Value: 0}
	root.Left.Right.Left = &BST{Value: 3}

	nodeOne := root
	nodeTwo := root.Left
	nodeThree := root.Left.Right.Left
	expected := true
	actual := ValidateThreeNodes(nodeOne, nodeTwo, nodeThree)
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
    var root = new Program.BST(5);
    root.left = new Program.BST(2);
    root.right = new Program.BST(7);
    root.left.left = new Program.BST(1);
    root.left.right = new Program.BST(4);
    root.right.left = new Program.BST(6);
    root.right.right = new Program.BST(8);
    root.left.left.left = new Program.BST(0);
    root.left.right.left = new Program.BST(3);

    var nodeOne = root;
    var nodeTwo = root.left;
    var nodeThree = root.left.right.left;
    boolean expected = true;
    boolean actual = new Program().validateThreeNodes(nodeOne, nodeTwo, nodeThree);
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

  // O(h) time | O(h) space - where h is the height of the tree
  public boolean validateThreeNodes(BST nodeOne, BST nodeTwo, BST nodeThree) {
    if (isDescendant(nodeTwo, nodeOne)) {
      return isDescendant(nodeThree, nodeTwo);
    }

    if (isDescendant(nodeTwo, nodeThree)) {
      return isDescendant(nodeOne, nodeTwo);
    }

    return false;
  }

  // Whether the `target` is a descendant of the `node`.
  public boolean isDescendant(BST node, BST target) {
    if (node == null) {
      return false;
    }

    if (node == target) {
      return true;
    }

    return (target.value < node.value)
        ? isDescendant(node.left, target)
        : isDescendant(node.right, target);
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

  // O(h) time | O(1) space - where h is the height of the tree
  public boolean validateThreeNodes(BST nodeOne, BST nodeTwo, BST nodeThree) {
    if (isDescendant(nodeTwo, nodeOne)) {
      return isDescendant(nodeThree, nodeTwo);
    }

    if (isDescendant(nodeTwo, nodeThree)) {
      return isDescendant(nodeOne, nodeTwo);
    }

    return false;
  }

  // Whether the `target` is a descendant of the `node`.
  public boolean isDescendant(BST node, BST target) {
    while (node != null && node != target) {
      node = (target.value < node.value) ? node.left : node.right;
    }

    return node == target;
  }
}

```
### Solution 3 (java)
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

  // O(d) time | O(1) space - where d is the distance between nodeOne and nodeThree
  public boolean validateThreeNodes(BST nodeOne, BST nodeTwo, BST nodeThree) {
    BST searchOne = nodeOne;
    BST searchTwo = nodeThree;

    while (true) {
      boolean foundThreeFromOne = searchOne == nodeThree;
      boolean foundOneFromThree = searchTwo == nodeOne;
      boolean foundNodeTwo = (searchOne == nodeTwo) || (searchTwo == nodeTwo);
      boolean finishedSearching = (searchOne == null) && (searchTwo == null);
      if (foundThreeFromOne || foundOneFromThree || foundNodeTwo || finishedSearching) {
        break;
      }

      if (searchOne != null) {
        searchOne = (searchOne.value > nodeTwo.value) ? searchOne.left : searchOne.right;
      }

      if (searchTwo != null) {
        searchTwo = (searchTwo.value > nodeTwo.value) ? searchTwo.left : searchTwo.right;
      }
    }

    boolean foundNodeFromOther = (searchOne == nodeThree) || (searchTwo == nodeOne);
    boolean foundNodeTwo = (searchOne == nodeTwo) || (searchTwo == nodeTwo);
    if (!foundNodeTwo || foundNodeFromOther) {
      return false;
    }

    return searchForTarget(nodeTwo, (searchOne == nodeTwo) ? nodeThree : nodeOne);
  }

  public boolean searchForTarget(BST node, BST target) {
    while (node != null && node != target) {
      node = (target.value < node.value) ? node.left : node.right;
    }

    return node == target;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    var root = new Program.BST(5);
    root.left = new Program.BST(2);
    root.right = new Program.BST(7);
    root.left.left = new Program.BST(1);
    root.left.right = new Program.BST(4);
    root.right.left = new Program.BST(6);
    root.right.right = new Program.BST(8);
    root.left.left.left = new Program.BST(0);
    root.left.right.left = new Program.BST(3);

    var nodeOne = root;
    var nodeTwo = root.left;
    var nodeThree = root.left.right.left;
    boolean expected = true;
    boolean actual = new Program().validateThreeNodes(nodeOne, nodeTwo, nodeThree);
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
  const root = new program.BST(5);
  root.left = new program.BST(2);
  root.right = new program.BST(7);
  root.left.left = new program.BST(1);
  root.left.right = new program.BST(4);
  root.right.left = new program.BST(6);
  root.right.right = new program.BST(8);
  root.left.left.left = new program.BST(0);
  root.left.right.left = new program.BST(3);

  const nodeOne = root;
  const nodeTwo = root.left;
  const nodeThree = root.left.right.left;
  const expected = true;
  const actual = program.validateThreeNodes(nodeOne, nodeTwo, nodeThree);
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

// O(h) time | O(h) space - where h is the height of the tree
function validateThreeNodes(nodeOne, nodeTwo, nodeThree) {
  if (isDescendant(nodeTwo, nodeOne)) return isDescendant(nodeThree, nodeTwo);

  if (isDescendant(nodeTwo, nodeThree)) return isDescendant(nodeOne, nodeTwo);

  return false;
}

// Whether the `target` is a descendant of the `node`.
function isDescendant(node, target) {
  if (node === null) return false;

  if (node === target) return true;

  return target.value < node.value ? isDescendant(node.left, target) : isDescendant(node.right, target);
}

// Do not edit the lines below.
exports.validateThreeNodes = validateThreeNodes;
exports.BST = BST;

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

// O(h) time | O(1) space - where h is the height of the tree
function validateThreeNodes(nodeOne, nodeTwo, nodeThree) {
  if (isDescendant(nodeTwo, nodeOne)) return isDescendant(nodeThree, nodeTwo);

  if (isDescendant(nodeTwo, nodeThree)) return isDescendant(nodeOne, nodeTwo);

  return false;
}

// Whether the `target` is a descendant of the `node`.
function isDescendant(node, target) {
  while (node !== null && node !== target) {
    node = target.value < node.value ? node.left : node.right;
  }

  return node === target;
}

// Do not edit the lines below.
exports.validateThreeNodes = validateThreeNodes;
exports.BST = BST;

```
### Solution 3 (javascript)
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

// O(d) time | O(1) space - where d is the distance between nodeOne and nodeThree
function validateThreeNodes(nodeOne, nodeTwo, nodeThree) {
  let searchOne = nodeOne;
  let searchTwo = nodeThree;

  while (true) {
    const foundThreeFromOne = searchOne === nodeThree;
    const foundOneFromThree = searchTwo === nodeOne;
    const foundNodeTwo = searchOne === nodeTwo || searchTwo === nodeTwo;
    const finishedSearching = searchOne === null && searchTwo === null;
    if (foundThreeFromOne || foundOneFromThree || foundNodeTwo || finishedSearching) {
      break;
    }

    if (searchOne !== null) {
      searchOne = searchOne.value > nodeTwo.value ? searchOne.left : searchOne.right;
    }

    if (searchTwo !== null) {
      searchTwo = searchTwo.value > nodeTwo.value ? searchTwo.left : searchTwo.right;
    }
  }

  const foundNodeFromOther = searchOne === nodeThree || searchTwo === nodeOne;
  const foundNodeTwo = searchOne === nodeTwo || searchTwo === nodeTwo;
  if (!foundNodeTwo || foundNodeFromOther) return false;

  return searchForTarget(nodeTwo, searchOne === nodeTwo ? nodeThree : nodeOne);
}

function searchForTarget(node, target) {
  while (node !== null && node !== target) {
    node = target.value < node.value ? node.left : node.right;
  }

  return node === target;
}

// Do not edit the lines below.
exports.validateThreeNodes = validateThreeNodes;
exports.BST = BST;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const root = new program.BST(5);
  root.left = new program.BST(2);
  root.right = new program.BST(7);
  root.left.left = new program.BST(1);
  root.left.right = new program.BST(4);
  root.right.left = new program.BST(6);
  root.right.right = new program.BST(8);
  root.left.left.left = new program.BST(0);
  root.left.right.left = new program.BST(3);

  const nodeOne = root;
  const nodeTwo = root.left;
  const nodeThree = root.left.right.left;
  const expected = true;
  const actual = program.validateThreeNodes(nodeOne, nodeTwo, nodeThree);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.BST
import com.algoexpert.program.validateThreeNodes

class ProgramTest {
    @Test
    fun TestCase1() {
        val root = BST(5)
        root.left = BST(2)
        root.right = BST(7)
        root.left!!.left = BST(1)
        root.left!!.right = BST(4)
        root.right!!.left = BST(6)
        root.right!!.right = BST(8)
        root.left!!.left!!.left = BST(0)
        root.left!!.right!!.left = BST(3)

        val nodeOne = root
        val nodeTwo = root.left!!
        val nodeThree = root.left!!.right!!.left!!
        val expected = true
        val output = validateThreeNodes(nodeOne, nodeTwo, nodeThree)
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

// O(h) time | O(h) space - where h is the height of the tree
fun validateThreeNodes(nodeOne: BST, nodeTwo: BST, nodeThree: BST): Boolean {
    if (isDescendant(nodeTwo, nodeOne)) return isDescendant(nodeThree, nodeTwo)

    if (isDescendant(nodeTwo, nodeThree)) return isDescendant(nodeOne, nodeTwo)

    return false
}

// Whether the `target` is a descendant of the `node`.
fun isDescendant(node: BST?, target: BST): Boolean {
    if (node == null) return false

    if (node == target) return true

    return if (target.value < node.value) isDescendant(node.left, target) else isDescendant(node.right, target)
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

// O(h) time | O(1) space - where h is the height of the tree
fun validateThreeNodes(nodeOne: BST, nodeTwo: BST, nodeThree: BST): Boolean {
    if (isDescendant(nodeTwo, nodeOne)) return isDescendant(nodeThree, nodeTwo)

    if (isDescendant(nodeTwo, nodeThree)) return isDescendant(nodeOne, nodeTwo)

    return false
}

// Whether the `target` is a descendant of the `node`.
fun isDescendant(node: BST, target: BST): Boolean {
    var currentNode: BST? = node
    while (currentNode != null && currentNode != target) {
        currentNode = if (target.value < currentNode.value) currentNode.left else currentNode.right
    }

    return currentNode == target
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// This is an input class. Do not edit.
open class BST(value: Int) {
    var value = value
    var left: BST? = null
    var right: BST? = null
}

// O(d) time | O(1) space - where d is the distance between nodeOne and nodeThree
fun validateThreeNodes(nodeOne: BST, nodeTwo: BST, nodeThree: BST): Boolean {
    var searchOne: BST? = nodeOne
    var searchTwo: BST? = nodeThree

    while (true) {
        val foundThreeFromOne = searchOne == nodeThree
        val foundOneFromThree = searchTwo == nodeOne
        val foundNodeTwo = searchOne == nodeTwo || searchTwo == nodeTwo
        val finishedSearching = searchOne == null && searchTwo == null
        if (foundThreeFromOne || foundOneFromThree || foundNodeTwo || finishedSearching) {
            break
        }

        if (searchOne != null) {
            searchOne = if (searchOne.value > nodeTwo.value) searchOne.left else searchOne.right
        }

        if (searchTwo != null) {
            searchTwo = if (searchTwo.value > nodeTwo.value) searchTwo.left else searchTwo.right
        }
    }

    val foundNodeFromOther = searchOne == nodeThree || searchTwo == nodeOne
    val foundNodeTwo = searchOne == nodeTwo || searchTwo == nodeTwo
    if (!foundNodeTwo || foundNodeFromOther) return false

    return searchForTarget(nodeTwo, if (searchOne == nodeTwo) nodeThree else nodeOne)
}

fun searchForTarget(node: BST, target: BST): Boolean {
    var currentNode: BST? = node
    while (currentNode != null && currentNode != target) {
        currentNode = if (target.value < currentNode.value) currentNode.left else currentNode.right
    }

    return currentNode == target
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.BST
import com.algoexpert.program.validateThreeNodes

class ProgramTest {
    @Test
    fun TestCase1() {
        val root = BST(5)
        root.left = BST(2)
        root.right = BST(7)
        root.left!!.left = BST(1)
        root.left!!.right = BST(4)
        root.right!!.left = BST(6)
        root.right!!.right = BST(8)
        root.left!!.left!!.left = BST(0)
        root.left!!.right!!.left = BST(3)

        val nodeOne = root
        val nodeTwo = root.left!!
        val nodeThree = root.left!!.right!!.left!!
        val expected = true
        val output = validateThreeNodes(nodeOne, nodeTwo, nodeThree)
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
      var root = Program.BST(value: 5)
      root.left = Program.BST(value: 2)
      root.right = Program.BST(value: 7)
      root.left!.left = Program.BST(value: 1)
      root.left!.right = Program.BST(value: 4)
      root.right!.left = Program.BST(value: 6)
      root.right!.right = Program.BST(value: 8)
      root.left!.left!.left = Program.BST(value: 0)
      root.left!.right!.left = Program.BST(value: 3)

      var nodeOne = root
      var nodeTwo = root.left!
      var nodeThree = root.left!.right!.left!
      var expected = true
      var actual = Program().validateThreeNodes(nodeOne, nodeTwo, nodeThree)
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

  // O(h) time | O(h) space - where h is the height of the tree
  func validateThreeNodes(_ nodeOne: BST, _ nodeTwo: BST, _ nodeThree: BST) -> Bool {
    if isDescendant(nodeTwo, nodeOne) {
      return isDescendant(nodeThree, nodeTwo)
    }

    if isDescendant(nodeTwo, nodeThree) {
      return isDescendant(nodeOne, nodeTwo)
    }

    return false
  }

  func isDescendant(_ node: BST?, _ target: BST) -> Bool {
    if node == nil {
      return false
    }

    if node === target {
      return true
    }

    if target.value < node!.value {
      return isDescendant(node!.left, target)
    }
    return isDescendant(node!.right, target)
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

  // O(h) time | O(1) space - where h is the height of the tree
  func validateThreeNodes(_ nodeOne: BST, _ nodeTwo: BST, _ nodeThree: BST) -> Bool {
    if isDescendant(nodeTwo, nodeOne) {
      return isDescendant(nodeThree, nodeTwo)
    }

    if isDescendant(nodeTwo, nodeThree) {
      return isDescendant(nodeOne, nodeTwo)
    }

    return false
  }

  func isDescendant(_ node: BST?, _ target: BST) -> Bool {
    var currentNode = node
    while currentNode != nil, currentNode !== target {
      if target.value < currentNode!.value {
        currentNode = currentNode!.left
      } else {
        currentNode = currentNode!.right
      }
    }

    return currentNode === target
  }
}

```
### Solution 3 (swift)
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

  // O(d) time | O(1) space - where d is the distance between nodeOne and nodeThree
  func validateThreeNodes(_ nodeOne: BST, _ nodeTwo: BST, _ nodeThree: BST) -> Bool {
    var searchOne: BST? = nodeOne
    var searchTwo: BST? = nodeThree

    while true {
      var foundThreeFromOne = searchOne === nodeThree
      var foundOneFromThree = searchTwo === nodeOne
      var foundNodeTwo = searchOne === nodeTwo || searchTwo === nodeTwo
      var finishedSearching = searchOne === nil && searchTwo === nil
      if foundThreeFromOne || foundOneFromThree || foundNodeTwo || finishedSearching {
        break
      }

      if searchOne != nil {
        if searchOne!.value > nodeTwo.value {
          searchOne = searchOne!.left
        } else {
          searchOne = searchOne!.right
        }
      }

      if searchTwo != nil {
        if searchTwo!.value > nodeTwo.value {
          searchTwo = searchTwo!.left
        } else {
          searchTwo = searchTwo!.right
        }
      }
    }

    var foundNodeFromOther = searchOne === nodeThree || searchTwo === nodeOne
    var foundNodeTwo = searchOne === nodeTwo || searchTwo === nodeTwo
    if !foundNodeTwo || foundNodeFromOther {
      return false
    }

    if searchOne === nodeTwo {
      return searchForTarget(nodeTwo, nodeThree)
    }
    return searchForTarget(nodeTwo, nodeOne)
  }

  func searchForTarget(_ node: BST?, _ target: BST) -> Bool {
    var currentNode = node
    while currentNode != nil, currentNode !== target {
      if target.value < currentNode!.value {
        currentNode = currentNode!.left
      } else {
        currentNode = currentNode!.right
      }
    }

    return currentNode === target
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var root = Program.BST(value: 5)
      root.left = Program.BST(value: 2)
      root.right = Program.BST(value: 7)
      root.left!.left = Program.BST(value: 1)
      root.left!.right = Program.BST(value: 4)
      root.right!.left = Program.BST(value: 6)
      root.right!.right = Program.BST(value: 8)
      root.left!.left!.left = Program.BST(value: 0)
      root.left!.right!.left = Program.BST(value: 3)

      var nodeOne = root
      var nodeTwo = root.left!
      var nodeThree = root.left!.right!.left!
      var expected = true
      var actual = Program().validateThreeNodes(nodeOne, nodeTwo, nodeThree)
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
        root = program.BST(5)
        root.left = program.BST(2)
        root.right = program.BST(7)
        root.left.left = program.BST(1)
        root.left.right = program.BST(4)
        root.right.left = program.BST(6)
        root.right.right = program.BST(8)
        root.left.left.left = program.BST(0)
        root.left.right.left = program.BST(3)

        nodeOne = root
        nodeTwo = root.left
        nodeThree = root.left.right.left
        expected = True
        actual = program.validateThreeNodes(nodeOne, nodeTwo, nodeThree)
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


# O(h) time | O(h) space - where h is the height of the tree
def validateThreeNodes(nodeOne, nodeTwo, nodeThree):
    if isDescendant(nodeTwo, nodeOne):
        return isDescendant(nodeThree, nodeTwo)

    if isDescendant(nodeTwo, nodeThree):
        return isDescendant(nodeOne, nodeTwo)

    return False


# Whether the `target` is a descendant of the `node`.
def isDescendant(node, target):
    if node is None:
        return False

    if node is target:
        return True

    return isDescendant(node.left, target) if target.value < node.value else isDescendant(node.right, target)

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


# O(h) time | O(1) space - where h is the height of the tree
def validateThreeNodes(nodeOne, nodeTwo, nodeThree):
    if isDescendant(nodeTwo, nodeOne):
        return isDescendant(nodeThree, nodeTwo)

    if isDescendant(nodeTwo, nodeThree):
        return isDescendant(nodeOne, nodeTwo)

    return False


# Whether the `target` is a descendant of the `node`.
def isDescendant(node, target):
    while node is not None and node is not target:
        node = node.left if target.value < node.value else node.right

    return node is target

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# This is an input class. Do not edit.
class BST:
    def __init__(self, value, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right


# O(d) time | O(1) space - where d is the distance between nodeOne and nodeThree
def validateThreeNodes(nodeOne, nodeTwo, nodeThree):
    searchOne = nodeOne
    searchTwo = nodeThree

    while True:
        foundThreeFromOne = searchOne is nodeThree
        foundOneFromThree = searchTwo is nodeOne
        foundNodeTwo = searchOne is nodeTwo or searchTwo is nodeTwo
        finishedSearching = searchOne is None and searchTwo is None
        if foundThreeFromOne or foundOneFromThree or foundNodeTwo or finishedSearching:
            break

        if searchOne is not None:
            searchOne = searchOne.left if searchOne.value > nodeTwo.value else searchOne.right

        if searchTwo is not None:
            searchTwo = searchTwo.left if searchTwo.value > nodeTwo.value else searchTwo.right

    foundNodeFromOther = searchOne is nodeThree or searchTwo is nodeOne
    foundNodeTwo = searchOne is nodeTwo or searchTwo is nodeTwo
    if not foundNodeTwo or foundNodeFromOther:
        return False

    return searchForTarget(nodeTwo, nodeThree if searchOne is nodeTwo else nodeOne)


def searchForTarget(node, target):
    while node is not None and node is not target:
        node = node.left if target.value < node.value else node.right

    return node is target

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        root = program.BST(5)
        root.left = program.BST(2)
        root.right = program.BST(7)
        root.left.left = program.BST(1)
        root.left.right = program.BST(4)
        root.right.left = program.BST(6)
        root.right.right = program.BST(8)
        root.left.left.left = program.BST(0)
        root.left.right.left = program.BST(3)

        nodeOne = root
        nodeTwo = root.left
        nodeThree = root.left.right.left
        expected = True
        actual = program.validateThreeNodes(nodeOne, nodeTwo, nodeThree)
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
  const root = new program.BST(5);
  root.left = new program.BST(2);
  root.right = new program.BST(7);
  root.left.left = new program.BST(1);
  root.left.right = new program.BST(4);
  root.right.left = new program.BST(6);
  root.right.right = new program.BST(8);
  root.left.left.left = new program.BST(0);
  root.left.right.left = new program.BST(3);

  const nodeOne = root;
  const nodeTwo = root.left;
  const nodeThree = root.left.right.left;
  const expected = true;
  const actual = program.validateThreeNodes(nodeOne, nodeTwo, nodeThree);
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

// O(h) time | O(h) space - where h is the height of the tree
export function validateThreeNodes(nodeOne: BST, nodeTwo: BST, nodeThree: BST) {
  if (isDescendant(nodeTwo, nodeOne)) return isDescendant(nodeThree, nodeTwo);

  if (isDescendant(nodeTwo, nodeThree)) return isDescendant(nodeOne, nodeTwo);

  return false;
}

// Whether the `target` is a descendant of the `node`.
function isDescendant(node: BST | null, target: BST): boolean {
  if (node === null) return false;

  if (node === target) return true;

  return target.value < node.value ? isDescendant(node.left, target) : isDescendant(node.right, target);
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

// O(h) time | O(1) space - where h is the height of the tree
export function validateThreeNodes(nodeOne: BST, nodeTwo: BST, nodeThree: BST) {
  if (isDescendant(nodeTwo, nodeOne)) return isDescendant(nodeThree, nodeTwo);

  if (isDescendant(nodeTwo, nodeThree)) return isDescendant(nodeOne, nodeTwo);

  return false;
}

// Whether the `target` is a descendant of the `node`.
function isDescendant(node: BST, target: BST) {
  let currentNode: BST | null = node;
  while (currentNode !== null && currentNode !== target) {
    currentNode = target.value < currentNode.value ? currentNode.left : currentNode.right;
  }

  return currentNode === target;
}

```
### Solution 3 (typescript)
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

// O(d) time | O(1) space - where d is the distance between nodeOne and nodeThree
export function validateThreeNodes(nodeOne: BST, nodeTwo: BST, nodeThree: BST) {
  let searchOne: BST | null = nodeOne;
  let searchTwo: BST | null = nodeThree;

  while (true) {
    const foundThreeFromOne = searchOne === nodeThree;
    const foundOneFromThree = searchTwo === nodeOne;
    const foundNodeTwo = searchOne === nodeTwo || searchTwo === nodeTwo;
    const finishedSearching = searchOne === null && searchTwo === null;
    if (foundThreeFromOne || foundOneFromThree || foundNodeTwo || finishedSearching) {
      break;
    }

    if (searchOne !== null) {
      searchOne = searchOne.value > nodeTwo.value ? searchOne.left : searchOne.right;
    }

    if (searchTwo !== null) {
      searchTwo = searchTwo.value > nodeTwo.value ? searchTwo.left : searchTwo.right;
    }
  }

  const foundNodeFromOther = searchOne === nodeThree || searchTwo === nodeOne;
  const foundNodeTwo = searchOne === nodeTwo || searchTwo === nodeTwo;
  if (!foundNodeTwo || foundNodeFromOther) return false;

  return searchForTarget(nodeTwo, searchOne === nodeTwo ? nodeThree : nodeOne);
}

function searchForTarget(node: BST, target: BST) {
  let currentNode: BST | null = node;
  while (currentNode !== null && currentNode !== target) {
    currentNode = target.value < currentNode.value ? currentNode.left : currentNode.right;
  }

  return currentNode === target;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const root = new program.BST(5);
  root.left = new program.BST(2);
  root.right = new program.BST(7);
  root.left.left = new program.BST(1);
  root.left.right = new program.BST(4);
  root.right.left = new program.BST(6);
  root.right.right = new program.BST(8);
  root.left.left.left = new program.BST(0);
  root.left.right.left = new program.BST(3);

  const nodeOne = root;
  const nodeTwo = root.left;
  const nodeThree = root.left.right.left;
  const expected = true;
  const actual = program.validateThreeNodes(nodeOne, nodeTwo, nodeThree);
  chai.expect(actual).to.deep.equal(expected);
});

```

