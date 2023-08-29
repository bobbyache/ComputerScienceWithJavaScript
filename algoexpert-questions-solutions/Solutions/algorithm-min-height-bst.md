# Min Height BST
<div class="html">
<p>
  Write a function that takes in a non-empty sorted array of distinct integers,
  constructs a BST from the integers, and returns the root of the BST.
</p>
<p>
  The function should minimize the height of the BST.
</p>
<p>
  You've been provided with a <span>BST</span> class that you'll have to use to
  construct the BST.
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
<p>
  Note that the <span>BST</span> class already has an <span>insert</span> method
  which you can use if you want.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [1, 2, 5, 7, 10, 13, 14, 15, 22]
</pre>
<h3>Sample Output</h3>
<pre>
         10
       /     \
      2      14
    /   \   /   \
   1     5 13   15
          \       \
           7      22
<span class="CodeEditor-promptComment">// This is one example of a BST with min height</span>
<span class="CodeEditor-promptComment">// that you could create from the input array.</span>
<span class="CodeEditor-promptComment">// You could create other BSTs with min height</span>
<span class="CodeEditor-promptComment">// from the same array; for example:</span>
         10
       /     \
      5      15
    /   \   /   \
   2     7 13   22
 /           \
1            14
</pre>
</div>

Hint 1
<p>
In order for the BST to have the smallest height possible, it needs to be balanced; in other words, it needs to have roughly the same number of nodes in its left subtree as in its right subtree.
</p>


Hint 2

<p>
How can you use the sorted nature of the input array to construct a balanced BST?
</p>


Hint 3

<p>
Grab the middle element of the array, and make that element be the root node of the BST. Then, grab the middle element between the beginning of the array and the first middle element, and make that element be the root of the BST's left subtree; similarly, make the middle element between the end of the array and the first middle element be the root of the BST's right subtree. Continue this approach until you run out of elements in the array.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

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

vector<int> inOrderTraverse(BST *tree, vector<int> array) {
  if (tree->left != nullptr) {
    array = inOrderTraverse(tree->left, array);
  }
  array.push_back(tree->value);
  if (tree->right != nullptr) {
    array = inOrderTraverse(tree->right, array);
  }
  return array;
}

bool validateBst(BST *tree) {
  return validateBstHelper(tree, INT_MIN, INT_MAX);
}

template <class BST> int getTreeHeight(BST *tree, int height) {
  if (tree == nullptr)
    return height;
  int leftTreeHeight = getTreeHeight(tree->left, height + 1);
  int rightTreeHeight = getTreeHeight(tree->right, height + 1);
  return max(leftTreeHeight, rightTreeHeight);
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> array{1, 2, 5, 7, 10, 13, 14, 15, 22};
      auto tree = minHeightBst(array);

      assert(validateBst(tree));
      assert(getTreeHeight(tree, 0) == 4);

      auto inOrder = inOrderTraverse(tree, {});
      vector<int> expected{1, 2, 5, 7, 10, 13, 14, 15, 22};
      assert(inOrder == expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

class BST {
public:
  int value;
  BST *left;
  BST *right;

  BST(int value) {
    this->value = value;
    left = nullptr;
    right = nullptr;
  }

  void insert(int value) {
    if (value < this->value) {
      if (left == nullptr) {
        left = new BST(value);
      } else {
        left->insert(value);
      }
    } else {
      if (right == nullptr) {
        right = new BST(value);
      } else {
        right->insert(value);
      }
    }
  }
};

BST *constructMinHeightBst(vector<int> array, BST *bst, int startIdx,
                           int endIdx);

// O(nlog(n)) time | O(n) space - where n is the length of the array
BST *minHeightBst(vector<int> array) {
  return constructMinHeightBst(array, nullptr, 0, array.size() - 1);
}

BST *constructMinHeightBst(vector<int> array, BST *bst, int startIdx,
                           int endIdx) {
  if (endIdx < startIdx)
    return nullptr;
  int midIdx = (startIdx + endIdx) / 2;
  int valueToAdd = array[midIdx];
  if (bst == nullptr) {
    bst = new BST(valueToAdd);
  } else {
    bst->insert(valueToAdd);
  }
  constructMinHeightBst(array, bst, startIdx, midIdx - 1);
  constructMinHeightBst(array, bst, midIdx + 1, endIdx);
  return bst;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

class BST {
public:
  int value;
  BST *left;
  BST *right;

  BST(int value) {
    this->value = value;
    left = nullptr;
    right = nullptr;
  }

  // We don't use this method for this solution.
  void insert(int value) {
    if (value < this->value) {
      if (left == nullptr) {
        left = new BST(value);
      } else {
        left->insert(value);
      }
    } else {
      if (right == nullptr) {
        right = new BST(value);
      } else {
        right->insert(value);
      }
    }
  }
};

BST *constructMinHeightBst(vector<int> array, BST *bst, int startIdx,
                           int endIdx);

// O(n) time | O(n) space - where n is the length of the array
BST *minHeightBst(vector<int> array) {
  return constructMinHeightBst(array, nullptr, 0, array.size() - 1);
}

BST *constructMinHeightBst(vector<int> array, BST *bst, int startIdx,
                           int endIdx) {
  if (endIdx < startIdx)
    return nullptr;
  int midIdx = (startIdx + endIdx) / 2;
  BST *newBstNode = new BST(array[midIdx]);
  if (bst == nullptr) {
    bst = newBstNode;
  } else {
    if (array[midIdx] < bst->value) {
      bst->left = newBstNode;
      bst = bst->left;
    } else {
      bst->right = newBstNode;
      bst = bst->right;
    }
  }
  constructMinHeightBst(array, bst, startIdx, midIdx - 1);
  constructMinHeightBst(array, bst, midIdx + 1, endIdx);
  return bst;
}

```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

class BST {
public:
  int value;
  BST *left;
  BST *right;

  BST(int value) {
    this->value = value;
    left = nullptr;
    right = nullptr;
  }

  // We don't use this method for this solution.
  void insert(int value) {
    if (value < this->value) {
      if (left == nullptr) {
        left = new BST(value);
      } else {
        left->insert(value);
      }
    } else {
      if (right == nullptr) {
        right = new BST(value);
      } else {
        right->insert(value);
      }
    }
  }
};

BST *constructMinHeightBst(vector<int> array, int startIdx, int endIdx);

// O(n) time | O(n) space - where n is the length of the array
BST *minHeightBst(vector<int> array) {
  return constructMinHeightBst(array, 0, array.size() - 1);
}

BST *constructMinHeightBst(vector<int> array, int startIdx, int endIdx) {
  if (endIdx < startIdx)
    return nullptr;
  int midIdx = (startIdx + endIdx) / 2;
  BST *bst = new BST(array[midIdx]);
  bst->left = constructMinHeightBst(array, startIdx, midIdx - 1);
  bst->right = constructMinHeightBst(array, midIdx + 1, endIdx);
  return bst;
}

```
### Unit Tests 1 (cpp)
```cpp
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

vector<int> inOrderTraverse(BST *tree, vector<int> array) {
  if (tree->left != nullptr) {
    array = inOrderTraverse(tree->left, array);
  }
  array.push_back(tree->value);
  if (tree->right != nullptr) {
    array = inOrderTraverse(tree->right, array);
  }
  return array;
}

bool validateBst(BST *tree) {
  return validateBstHelper(tree, INT_MIN, INT_MAX);
}

template <class BST> int getTreeHeight(BST *tree, int height) {
  if (tree == nullptr)
    return height;
  int leftTreeHeight = getTreeHeight(tree->left, height + 1);
  int rightTreeHeight = getTreeHeight(tree->right, height + 1);
  return max(leftTreeHeight, rightTreeHeight);
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> array{1, 2, 5, 7, 10, 13, 14, 15, 22};
      auto tree = minHeightBst(array);

      assert(validateBst(tree));
      assert(getTreeHeight(tree, 0) == 4);

      auto inOrder = inOrderTraverse(tree, {});
      vector<int> expected{1, 2, 5, 7, 10, 13, 14, 15, 22};
      assert(inOrder == expected);
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
using System.Linq;
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		var array = new List<int> {
			1, 2, 5, 7, 10, 13, 14, 15, 22
		};
		var tree = Program.MinHeightBst(array);

		Utils.AssertTrue(validateBst(tree));
		Utils.AssertEquals(4, getTreeHeight(tree));

		var inOrder = inOrderTraverse(tree, new List<int> {
		});
		var expected = new List<int> {
			1, 2, 5, 7, 10, 13, 14, 15, 22
		};
		Utils.AssertTrue(Enumerable.SequenceEqual(inOrder, expected));
	}

	static bool validateBst(Program.BST tree) {
		return validateBst(tree, Int32.MinValue, Int32.MaxValue);
	}

	static bool validateBst(Program.BST tree, int minValue, int maxValue) {
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

	static List<int> inOrderTraverse(Program.BST tree, List<int> array) {
		if (tree.left != null) {
			inOrderTraverse(tree.left, array);
		}
		array.Add(tree.value);
		if (tree.right != null) {
			inOrderTraverse(tree.right, array);
		}
		return array;
	}

	static int getTreeHeight(Program.BST tree) {
		return getTreeHeight(tree, 0);
	}

	static int getTreeHeight(Program.BST tree, int height) {
		if (tree == null) return height;
		int leftTreeHeight = getTreeHeight(tree.left, height + 1);
		int rightTreeHeight = getTreeHeight(tree.right, height + 1);
		return Math.Max(leftTreeHeight, rightTreeHeight);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(nlog(n)) time | O(n) space - where n is the length of the array
	public static BST MinHeightBst(List<int> array) {
		return constructMinHeightBst(array, null, 0, array.Count - 1);
	}

	public static BST constructMinHeightBst(List<int> array, BST bst, int startIdx,
	  int endIdx) {
		if (endIdx < startIdx) return null;
		int midIdx = (startIdx + endIdx) / 2;
		int valueToAdd = array[midIdx];
		if (bst == null) {
			bst = new BST(valueToAdd);
		} else {
			bst.insert(valueToAdd);
		}
		constructMinHeightBst(array, bst, startIdx, midIdx - 1);
		constructMinHeightBst(array, bst, midIdx + 1, endIdx);
		return bst;
	}

	public class BST {
		public int value;
		public BST left;
		public BST right;

		public BST(int value) {
			this.value = value;
			left = null;
			right = null;
		}

		public void insert(int value) {
			if (value < this.value) {
				if (left == null) {
					left = new BST(value);
				} else {
					left.insert(value);
				}
			} else {
				if (right == null) {
					right = new BST(value);
				} else {
					right.insert(value);
				}
			}
		}
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n) time | O(n) space - where n is the length of the array
	public static BST MinHeightBst(List<int> array) {
		return constructMinHeightBst(array, null, 0, array.Count - 1);
	}

	public static BST constructMinHeightBst(List<int> array, BST bst, int startIdx,
	  int endIdx) {
		if (endIdx < startIdx) return null;
		int midIdx = (startIdx + endIdx) / 2;
		BST newBstNode = new BST(array[midIdx]);
		if (bst == null) {
			bst = newBstNode;
		} else {
			if (array[midIdx] < bst.value) {
				bst.left = newBstNode;
				bst = bst.left;
			} else {
				bst.right = newBstNode;
				bst = bst.right;
			}
		}
		constructMinHeightBst(array, bst, startIdx, midIdx - 1);
		constructMinHeightBst(array, bst, midIdx + 1, endIdx);
		return bst;
	}

	public class BST {
		public int value;
		public BST left;
		public BST right;

		public BST(int value) {
			this.value = value;
			left = null;
			right = null;
		}

		// We don't use this method for this solution.
		public void insert(int value) {
			if (value < this.value) {
				if (left == null) {
					left = new BST(value);
				} else {
					left.insert(value);
				}
			} else {
				if (right == null) {
					right = new BST(value);
				} else {
					right.insert(value);
				}
			}
		}
	}
}

```
### Solution 3 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n) time | O(n) space - where n is the length of the array
	public static BST MinHeightBst(List<int> array) {
		return constructMinHeightBst(array, 0, array.Count - 1);
	}

	public static BST constructMinHeightBst(List<int> array, int startIdx, int endIdx) {
		if (endIdx < startIdx) return null;
		int midIdx = (startIdx + endIdx) / 2;
		BST bst = new BST(array[midIdx]);
		bst.left = constructMinHeightBst(array, startIdx, midIdx - 1);
		bst.right = constructMinHeightBst(array, midIdx + 1, endIdx);
		return bst;
	}

	public class BST {
		public int value;
		public BST left;
		public BST right;

		public BST(int value) {
			this.value = value;
			left = null;
			right = null;
		}

		// We don't use this method for this solution.
		public void insert(int value) {
			if (value < this.value) {
				if (left == null) {
					left = new BST(value);
				} else {
					left.insert(value);
				}
			} else {
				if (right == null) {
					right = new BST(value);
				} else {
					right.insert(value);
				}
			}
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;
using System.Linq;
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		var array = new List<int> {
			1, 2, 5, 7, 10, 13, 14, 15, 22
		};
		var tree = Program.MinHeightBst(array);

		Utils.AssertTrue(validateBst(tree));
		Utils.AssertEquals(4, getTreeHeight(tree));

		var inOrder = inOrderTraverse(tree, new List<int> {
		});
		var expected = new List<int> {
			1, 2, 5, 7, 10, 13, 14, 15, 22
		};
		Utils.AssertTrue(Enumerable.SequenceEqual(inOrder, expected));
	}

	static bool validateBst(Program.BST tree) {
		return validateBst(tree, Int32.MinValue, Int32.MaxValue);
	}

	static bool validateBst(Program.BST tree, int minValue, int maxValue) {
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

	static List<int> inOrderTraverse(Program.BST tree, List<int> array) {
		if (tree.left != null) {
			inOrderTraverse(tree.left, array);
		}
		array.Add(tree.value);
		if (tree.right != null) {
			inOrderTraverse(tree.right, array);
		}
		return array;
	}

	static int getTreeHeight(Program.BST tree) {
		return getTreeHeight(tree, 0);
	}

	static int getTreeHeight(Program.BST tree, int height) {
		if (tree == null) return height;
		int leftTreeHeight = getTreeHeight(tree.left, height + 1);
		int rightTreeHeight = getTreeHeight(tree.right, height + 1);
		return Math.Max(leftTreeHeight, rightTreeHeight);
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
	"math"

	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	array := []int{1, 2, 5, 7, 10, 13, 14, 15, 22}
	tree := MinHeightBST(array)

	require.True(t, validateBST(tree, math.MinInt32, math.MaxInt32))
	require.Equal(t, 4, getTreeHeight(tree))

	inOrder := inOrderTraverse(tree, []int{})
	require.Equal(t, []int{1, 2, 5, 7, 10, 13, 14, 15, 22}, inOrder)
}

func validateBST(tree *BST, min, max int) bool {
	if tree.Value < min || tree.Value >= max {
		return false
	}
	if tree.Left != nil && !validateBST(tree.Left, min, tree.Value) {
		return false
	}
	if tree.Right != nil && !validateBST(tree.Right, tree.Value, max) {
		return false
	}
	return true
}

func inOrderTraverse(tree *BST, array []int) []int {
	if tree.Left != nil {
		array = inOrderTraverse(tree.Left, array)
	}
	array = append(array, tree.Value)
	if tree.Right != nil {
		array = inOrderTraverse(tree.Right, array)
	}
	return array
}

func getTreeHeight(tree *BST) int {
	if tree == nil {
		return 0
	}
	left := getTreeHeight(tree.Left)
	right := getTreeHeight(tree.Right)
	if left > right {
		return left + 1
	}
	return right + 1
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(nlog(n)) time | O(n) space - where n is the length of the array
func MinHeightBST(array []int) *BST {
	return constructMinHeightBst(array, nil, 0, len(array)-1)
}

func constructMinHeightBst(array []int, bst *BST, startIdx, endIdx int) *BST {
	if endIdx < startIdx {
		return nil
	}
	midIdx := (startIdx + endIdx) / 2
	valueToAdd := array[midIdx]
	if bst == nil {
		bst = &BST{Value: valueToAdd}
	} else {
		bst.Insert(valueToAdd)
	}
	constructMinHeightBst(array, bst, startIdx, midIdx-1)
	constructMinHeightBst(array, bst, midIdx+1, endIdx)
	return bst
}

type BST struct {
	Value int

	Left  *BST
	Right *BST
}

func (tree *BST) Insert(value int) *BST {
	if value < tree.Value {
		if tree.Left == nil {
			tree.Left = &BST{Value: value}
		} else {
			tree.Left.Insert(value)
		}
	} else {
		if tree.Right == nil {
			tree.Right = &BST{Value: value}
		} else {
			tree.Right.Insert(value)
		}
	}
	return tree
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space - where n is the length of the array
func MinHeightBST(array []int) *BST {
	return constructMinHeightBst(array, nil, 0, len(array)-1)
}

func constructMinHeightBst(array []int, bst *BST, startIdx, endIdx int) *BST {
	if endIdx < startIdx {
		return nil
	}
	midIdx := (startIdx + endIdx) / 2
	newBstNode := &BST{Value: array[midIdx]}
	if bst == nil {
		bst = newBstNode
	} else {
		if array[midIdx] < bst.Value {
			bst.Left = newBstNode
			bst = bst.Left
		} else {
			bst.Right = newBstNode
			bst = bst.Right
		}
	}
	constructMinHeightBst(array, bst, startIdx, midIdx-1)
	constructMinHeightBst(array, bst, midIdx+1, endIdx)
	return bst
}

type BST struct {
	Value int

	Left  *BST
	Right *BST
}

// We don't use this method for this solution.
func (tree *BST) Insert(value int) *BST {
	if value < tree.Value {
		if tree.Left == nil {
			tree.Left = &BST{Value: value}
		} else {
			tree.Left.Insert(value)
		}
	} else {
		if tree.Right == nil {
			tree.Right = &BST{Value: value}
		} else {
			tree.Right.Insert(value)
		}
	}
	return tree
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space - where n is the length of the array
func MinHeightBST(array []int) *BST {
	return constructMinHeightBst(array, 0, len(array)-1)
}

func constructMinHeightBst(array []int, startIdx, endIdx int) *BST {
	if endIdx < startIdx {
		return nil
	}
	midIdx := (startIdx + endIdx) / 2
	bst := &BST{Value: array[midIdx]}
	bst.Left = constructMinHeightBst(array, startIdx, midIdx-1)
	bst.Right = constructMinHeightBst(array, midIdx+1, endIdx)
	return bst
}

type BST struct {
	Value int

	Left  *BST
	Right *BST
}

// We don't use this method for this solution.
func (tree *BST) Insert(value int) *BST {
	if value < tree.Value {
		if tree.Left == nil {
			tree.Left = &BST{Value: value}
		} else {
			tree.Left.Insert(value)
		}
	} else {
		if tree.Right == nil {
			tree.Right = &BST{Value: value}
		} else {
			tree.Right.Insert(value)
		}
	}
	return tree
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"math"

	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	array := []int{1, 2, 5, 7, 10, 13, 14, 15, 22}
	tree := MinHeightBST(array)

	require.True(t, validateBST(tree, math.MinInt32, math.MaxInt32))
	require.Equal(t, 4, getTreeHeight(tree))

	inOrder := inOrderTraverse(tree, []int{})
	require.Equal(t, []int{1, 2, 5, 7, 10, 13, 14, 15, 22}, inOrder)
}

func validateBST(tree *BST, min, max int) bool {
	if tree.Value < min || tree.Value >= max {
		return false
	}
	if tree.Left != nil && !validateBST(tree.Left, min, tree.Value) {
		return false
	}
	if tree.Right != nil && !validateBST(tree.Right, tree.Value, max) {
		return false
	}
	return true
}

func inOrderTraverse(tree *BST, array []int) []int {
	if tree.Left != nil {
		array = inOrderTraverse(tree.Left, array)
	}
	array = append(array, tree.Value)
	if tree.Right != nil {
		array = inOrderTraverse(tree.Right, array)
	}
	return array
}

func getTreeHeight(tree *BST) int {
	if tree == nil {
		return 0
	}
	left := getTreeHeight(tree.Left)
	right := getTreeHeight(tree.Right)
	if left > right {
		return left + 1
	}
	return right + 1
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
    List<Integer> array = Arrays.asList(1, 2, 5, 7, 10, 13, 14, 15, 22);
    var tree = Program.minHeightBst(array);

    Utils.assertTrue(validateBst(tree));
    Utils.assertEquals(4, getTreeHeight(tree));

    var inOrder = inOrderTraverse(tree, new ArrayList<Integer>());
    List<Integer> expected = Arrays.asList(1, 2, 5, 7, 10, 13, 14, 15, 22);
    Utils.assertTrue(expected.equals(inOrder));
  }

  static boolean validateBst(Program.BST tree) {
    return validateBst(tree, Integer.MIN_VALUE, Integer.MAX_VALUE);
  }

  static boolean validateBst(Program.BST tree, int minValue, int maxValue) {
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

  static List<Integer> inOrderTraverse(Program.BST tree, List<Integer> array) {
    if (tree.left != null) {
      inOrderTraverse(tree.left, array);
    }
    array.add(tree.value);
    if (tree.right != null) {
      inOrderTraverse(tree.right, array);
    }
    return array;
  }

  static int getTreeHeight(Program.BST tree) {
    return getTreeHeight(tree, 0);
  }

  static int getTreeHeight(Program.BST tree, int height) {
    if (tree == null) return height;
    int leftTreeHeight = getTreeHeight(tree.left, height + 1);
    int rightTreeHeight = getTreeHeight(tree.right, height + 1);
    return Math.max(leftTreeHeight, rightTreeHeight);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(nlog(n)) time | O(n) space - where n is the length of the array
  public static BST minHeightBst(List<Integer> array) {
    return constructMinHeightBst(array, null, 0, array.size() - 1);
  }

  public static BST constructMinHeightBst(List<Integer> array, BST bst, int startIdx, int endIdx) {
    if (endIdx < startIdx) return null;
    int midIdx = (startIdx + endIdx) / 2;
    int valueToAdd = array.get(midIdx);
    if (bst == null) {
      bst = new BST(valueToAdd);
    } else {
      bst.insert(valueToAdd);
    }
    constructMinHeightBst(array, bst, startIdx, midIdx - 1);
    constructMinHeightBst(array, bst, midIdx + 1, endIdx);
    return bst;
  }

  static class BST {
    public int value;
    public BST left;
    public BST right;

    public BST(int value) {
      this.value = value;
      left = null;
      right = null;
    }

    public void insert(int value) {
      if (value < this.value) {
        if (left == null) {
          left = new BST(value);
        } else {
          left.insert(value);
        }
      } else {
        if (right == null) {
          right = new BST(value);
        } else {
          right.insert(value);
        }
      }
    }
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(n) space - where n is the length of the array
  public static BST minHeightBst(List<Integer> array) {
    return constructMinHeightBst(array, null, 0, array.size() - 1);
  }

  public static BST constructMinHeightBst(List<Integer> array, BST bst, int startIdx, int endIdx) {
    if (endIdx < startIdx) return null;
    int midIdx = (startIdx + endIdx) / 2;
    BST newBstNode = new BST(array.get(midIdx));
    if (bst == null) {
      bst = newBstNode;
    } else {
      if (array.get(midIdx) < bst.value) {
        bst.left = newBstNode;
        bst = bst.left;
      } else {
        bst.right = newBstNode;
        bst = bst.right;
      }
    }
    constructMinHeightBst(array, bst, startIdx, midIdx - 1);
    constructMinHeightBst(array, bst, midIdx + 1, endIdx);
    return bst;
  }

  static class BST {
    public int value;
    public BST left;
    public BST right;

    public BST(int value) {
      this.value = value;
      left = null;
      right = null;
    }

    // We don't use this method for this solution.
    public void insert(int value) {
      if (value < this.value) {
        if (left == null) {
          left = new BST(value);
        } else {
          left.insert(value);
        }
      } else {
        if (right == null) {
          right = new BST(value);
        } else {
          right.insert(value);
        }
      }
    }
  }
}

```
### Solution 3 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(n) space - where n is the length of the array
  public static BST minHeightBst(List<Integer> array) {
    return constructMinHeightBst(array, 0, array.size() - 1);
  }

  public static BST constructMinHeightBst(List<Integer> array, int startIdx, int endIdx) {
    if (endIdx < startIdx) return null;
    int midIdx = (startIdx + endIdx) / 2;
    BST bst = new BST(array.get(midIdx));
    bst.left = constructMinHeightBst(array, startIdx, midIdx - 1);
    bst.right = constructMinHeightBst(array, midIdx + 1, endIdx);
    return bst;
  }

  static class BST {
    public int value;
    public BST left;
    public BST right;

    public BST(int value) {
      this.value = value;
      left = null;
      right = null;
    }

    // We don't use this method for this solution.
    public void insert(int value) {
      if (value < this.value) {
        if (left == null) {
          left = new BST(value);
        } else {
          left.insert(value);
        }
      } else {
        if (right == null) {
          right = new BST(value);
        } else {
          right.insert(value);
        }
      }
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
    List<Integer> array = Arrays.asList(1, 2, 5, 7, 10, 13, 14, 15, 22);
    var tree = Program.minHeightBst(array);

    Utils.assertTrue(validateBst(tree));
    Utils.assertEquals(4, getTreeHeight(tree));

    var inOrder = inOrderTraverse(tree, new ArrayList<Integer>());
    List<Integer> expected = Arrays.asList(1, 2, 5, 7, 10, 13, 14, 15, 22);
    Utils.assertTrue(expected.equals(inOrder));
  }

  static boolean validateBst(Program.BST tree) {
    return validateBst(tree, Integer.MIN_VALUE, Integer.MAX_VALUE);
  }

  static boolean validateBst(Program.BST tree, int minValue, int maxValue) {
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

  static List<Integer> inOrderTraverse(Program.BST tree, List<Integer> array) {
    if (tree.left != null) {
      inOrderTraverse(tree.left, array);
    }
    array.add(tree.value);
    if (tree.right != null) {
      inOrderTraverse(tree.right, array);
    }
    return array;
  }

  static int getTreeHeight(Program.BST tree) {
    return getTreeHeight(tree, 0);
  }

  static int getTreeHeight(Program.BST tree, int height) {
    if (tree == null) return height;
    int leftTreeHeight = getTreeHeight(tree.left, height + 1);
    int rightTreeHeight = getTreeHeight(tree.right, height + 1);
    return Math.max(leftTreeHeight, rightTreeHeight);
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
  const array = [1, 2, 5, 7, 10, 13, 14, 15, 22];
  const tree = program.minHeightBst(array);

  chai.expect(validateBst(tree)).to.deep.equal(true);
  chai.expect(getTreeHeight(tree)).to.deep.equal(4);

  const inOrder = inOrderTraverse(tree, []);
  const expected = [1, 2, 5, 7, 10, 13, 14, 15, 22];

  chai.expect(inOrder).to.deep.equal(expected);
});

function validateBst(tree) {
  return validateBstHelper(tree, -Infinity, Infinity);
}

function validateBstHelper(tree, minValue, maxValue) {
  if (tree === null) return true;
  if (tree.value < minValue || tree.value >= maxValue) return false;
  const leftIsValid = validateBstHelper(tree.left, minValue, tree.value);
  return leftIsValid && validateBstHelper(tree.right, tree.value, maxValue);
}

function inOrderTraverse(tree, array) {
  if (tree !== null) {
    inOrderTraverse(tree.left, array);
    array.push(tree.value);
    inOrderTraverse(tree.right, array);
  }
  return array;
}

function getTreeHeight(tree, height = 0) {
  if (tree === null) return height;
  const leftTreeHeight = getTreeHeight(tree.left, height + 1);
  const rightTreeHeight = getTreeHeight(tree.right, height + 1);
  return Math.max(leftTreeHeight, rightTreeHeight);
}

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlog(n)) time | O(n) space - where n is the length of the array
function minHeightBst(array) {
  return constructMinHeightBst(array, null, 0, array.length - 1);
}

function constructMinHeightBst(array, bst, startIdx, endIdx) {
  if (endIdx < startIdx) return;
  const midIdx = Math.floor((startIdx + endIdx) / 2);
  const valueToAdd = array[midIdx];
  if (bst === null) {
    bst = new BST(valueToAdd);
  } else {
    bst.insert(valueToAdd);
  }
  constructMinHeightBst(array, bst, startIdx, midIdx - 1);
  constructMinHeightBst(array, bst, midIdx + 1, endIdx);
  return bst;
}

class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(value) {
    if (value < this.value) {
      if (this.left === null) {
        this.left = new BST(value);
      } else {
        this.left.insert(value);
      }
    } else {
      if (this.right === null) {
        this.right = new BST(value);
      } else {
        this.right.insert(value);
      }
    }
  }
}

exports.minHeightBst = minHeightBst;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the array
function minHeightBst(array) {
  return constructMinHeightBst(array, null, 0, array.length - 1);
}

function constructMinHeightBst(array, bst, startIdx, endIdx) {
  if (endIdx < startIdx) return;
  const midIdx = Math.floor((startIdx + endIdx) / 2);
  const newBstNode = new BST(array[midIdx]);
  if (bst === null) {
    bst = newBstNode;
  } else {
    if (array[midIdx] < bst.value) {
      bst.left = newBstNode;
      bst = bst.left;
    } else {
      bst.right = newBstNode;
      bst = bst.right;
    }
  }
  constructMinHeightBst(array, bst, startIdx, midIdx - 1);
  constructMinHeightBst(array, bst, midIdx + 1, endIdx);
  return bst;
}

class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  // We don't use this method for this solution.
  insert(value) {
    if (value < this.value) {
      if (this.left === null) {
        this.left = new BST(value);
      } else {
        this.left.insert(value);
      }
    } else {
      if (this.right === null) {
        this.right = new BST(value);
      } else {
        this.right.insert(value);
      }
    }
  }
}

exports.minHeightBst = minHeightBst;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the array
function minHeightBst(array) {
  return constructMinHeightBst(array, 0, array.length - 1);
}

function constructMinHeightBst(array, startIdx, endIdx) {
  if (endIdx < startIdx) return null;
  const midIdx = Math.floor((startIdx + endIdx) / 2);
  const bst = new BST(array[midIdx]);
  bst.left = constructMinHeightBst(array, startIdx, midIdx - 1);
  bst.right = constructMinHeightBst(array, midIdx + 1, endIdx);
  return bst;
}

class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  // We don't use this method for this solution.
  insert(value) {
    if (value < this.value) {
      if (this.left === null) {
        this.left = new BST(value);
      } else {
        this.left.insert(value);
      }
    } else {
      if (this.right === null) {
        this.right = new BST(value);
      } else {
        this.right.insert(value);
      }
    }
  }
}

exports.minHeightBst = minHeightBst;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const array = [1, 2, 5, 7, 10, 13, 14, 15, 22];
  const tree = program.minHeightBst(array);

  chai.expect(validateBst(tree)).to.deep.equal(true);
  chai.expect(getTreeHeight(tree)).to.deep.equal(4);

  const inOrder = inOrderTraverse(tree, []);
  const expected = [1, 2, 5, 7, 10, 13, 14, 15, 22];

  chai.expect(inOrder).to.deep.equal(expected);
});

function validateBst(tree) {
  return validateBstHelper(tree, -Infinity, Infinity);
}

function validateBstHelper(tree, minValue, maxValue) {
  if (tree === null) return true;
  if (tree.value < minValue || tree.value >= maxValue) return false;
  const leftIsValid = validateBstHelper(tree.left, minValue, tree.value);
  return leftIsValid && validateBstHelper(tree.right, tree.value, maxValue);
}

function inOrderTraverse(tree, array) {
  if (tree !== null) {
    inOrderTraverse(tree.left, array);
    array.push(tree.value);
    inOrderTraverse(tree.right, array);
  }
  return array;
}

function getTreeHeight(tree, height = 0) {
  if (tree === null) return height;
  const leftTreeHeight = getTreeHeight(tree.left, height + 1);
  const rightTreeHeight = getTreeHeight(tree.right, height + 1);
  return Math.max(leftTreeHeight, rightTreeHeight);
}

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import kotlin.math.max
import com.algoexpert.program.BST as BST
import com.algoexpert.program.minHeightBst as minHeightBst

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = listOf(1, 2, 5, 7, 10, 13, 14, 15, 22)
        val tree = minHeightBst(array)!!

        assert(validateBst(tree))
        assert(getTreeHeight(tree) == 4)

        val inOrder = inOrderTraverse(tree, mutableListOf<Int>())
        val expected = listOf(1, 2, 5, 7, 10, 13, 14, 15, 22)

        assert(inOrder == expected)
    }
}

fun validateBst(tree: BST): Boolean {
    return validateBstHelper(tree, Int.MIN_VALUE, Int.MAX_VALUE)
}

fun validateBstHelper(tree: BST?, minValue: Int, maxValue: Int): Boolean {
    if (tree == null) return true
    if (tree.value < minValue || tree.value >= maxValue) return false
    val leftIsValid = validateBstHelper(tree.left, minValue, tree.value)
    return leftIsValid && validateBstHelper(tree.right, tree.value, maxValue)
}

fun inOrderTraverse(tree: BST?, array: MutableList<Int>): List<Int> {
    if (tree != null) {
        inOrderTraverse(tree.left, array)
        array.add(tree.value)
        inOrderTraverse(tree.right, array)
    }
    return array
}

fun getTreeHeight(tree: BST?): Int {
    return getTreeHeight(tree, 0)
}

fun getTreeHeight(tree: BST?, height: Int): Int {
    if (tree == null) return height
    val leftTreeHeight = getTreeHeight(tree.left, height + 1)
    val rightTreeHeight = getTreeHeight(tree.right, height + 1)
    return max(leftTreeHeight, rightTreeHeight)
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

    fun insert(value: Int) {
        if (value < this.value) {
            if (this.left == null) {
                this.left = BST(value)
            } else {
                this.left!!.insert(value)
            }
        } else {
            if (this.right == null) {
                this.right = BST(value)
            } else {
                this.right!!.insert(value)
            }
        }
    }
}

// O(nlog(n)) time | O(n) space - where n is the length of the array
fun minHeightBst(array: List<Int>): BST {
    return constructMinHeightBst(array, null, 0, array.size - 1)!!
}

fun constructMinHeightBst(array: List<Int>, bst: BST?, startIdx: Int, endIdx: Int): BST? {
    if (endIdx < startIdx) return null
    var rootBst: BST? = bst
    val midIdx = (startIdx + endIdx) / 2
    val valueToAdd = array[midIdx]
    if (rootBst == null) {
        rootBst = BST(valueToAdd)
    } else {
        rootBst.insert(valueToAdd)
    }

    constructMinHeightBst(array, rootBst, startIdx, midIdx - 1)
    constructMinHeightBst(array, rootBst, midIdx + 1, endIdx)
    return rootBst
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

open class BST(value: Int) {
    var value = value
    var left: BST? = null
    var right: BST? = null

    // We don't use this method for this solution.
    fun insert(value: Int) {
        if (value < this.value) {
            if (this.left == null) {
                this.left = BST(value)
            } else {
                this.left!!.insert(value)
            }
        } else {
            if (this.right == null) {
                this.right = BST(value)
            } else {
                this.right!!.insert(value)
            }
        }
    }
}

// O(n) time | O(n) space - where n is the length of the array
fun minHeightBst(array: List<Int>): BST {
    return constructMinHeightBst(array, null, 0, array.size - 1)!!
}

fun constructMinHeightBst(array: List<Int>, bst: BST?, startIdx: Int, endIdx: Int): BST? {
    if (endIdx < startIdx) return null
    var nextBst: BST? = null
    val midIdx = (startIdx + endIdx) / 2
    val newBstNode = BST(array[midIdx])
    if (bst == null) {
        nextBst = newBstNode
    } else {
        if (array[midIdx] < bst.value) {
            bst.left = newBstNode
            nextBst = bst.left
        } else {
            bst.right = newBstNode
            nextBst = bst.right
        }
    }
    constructMinHeightBst(array, nextBst, startIdx, midIdx - 1)
    constructMinHeightBst(array, nextBst, midIdx + 1, endIdx)
    return nextBst
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

open class BST(value: Int) {
    var value = value
    var left: BST? = null
    var right: BST? = null

    // We don't use this method for this solution.
    fun insert(value: Int) {
        if (value < this.value) {
            if (this.left == null) {
                this.left = BST(value)
            } else {
                this.left!!.insert(value)
            }
        } else {
            if (this.right == null) {
                this.right = BST(value)
            } else {
                this.right!!.insert(value)
            }
        }
    }
}

// O(n) time | O(n) space - where n is the length of the array
fun minHeightBst(array: List<Int>): BST {
    return constructMinHeightBst(array, 0, array.size - 1)!!
}

fun constructMinHeightBst(array: List<Int>, startIdx: Int, endIdx: Int): BST? {
    if (endIdx < startIdx) return null
    val midIdx = (startIdx + endIdx) / 2
    val bst = BST(array[midIdx])
    bst.left = constructMinHeightBst(array, startIdx, midIdx - 1)
    bst.right = constructMinHeightBst(array, midIdx + 1, endIdx)
    return bst
}

```
### Unit Tests 1 (kotlin)
```kotlin
import kotlin.math.max
import com.algoexpert.program.BST as BST
import com.algoexpert.program.minHeightBst as minHeightBst

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = listOf(1, 2, 5, 7, 10, 13, 14, 15, 22)
        val tree = minHeightBst(array)!!

        assert(validateBst(tree))
        assert(getTreeHeight(tree) == 4)

        val inOrder = inOrderTraverse(tree, mutableListOf<Int>())
        val expected = listOf(1, 2, 5, 7, 10, 13, 14, 15, 22)

        assert(inOrder == expected)
    }
}

fun validateBst(tree: BST): Boolean {
    return validateBstHelper(tree, Int.MIN_VALUE, Int.MAX_VALUE)
}

fun validateBstHelper(tree: BST?, minValue: Int, maxValue: Int): Boolean {
    if (tree == null) return true
    if (tree.value < minValue || tree.value >= maxValue) return false
    val leftIsValid = validateBstHelper(tree.left, minValue, tree.value)
    return leftIsValid && validateBstHelper(tree.right, tree.value, maxValue)
}

fun inOrderTraverse(tree: BST?, array: MutableList<Int>): List<Int> {
    if (tree != null) {
        inOrderTraverse(tree.left, array)
        array.add(tree.value)
        inOrderTraverse(tree.right, array)
    }
    return array
}

fun getTreeHeight(tree: BST?): Int {
    return getTreeHeight(tree, 0)
}

fun getTreeHeight(tree: BST?, height: Int): Int {
    if (tree == null) return height
    val leftTreeHeight = getTreeHeight(tree.left, height + 1)
    val rightTreeHeight = getTreeHeight(tree.right, height + 1)
    return max(leftTreeHeight, rightTreeHeight)
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
      let array = [1, 2, 5, 7, 10, 13, 14, 15, 22]
      let tree = Program.minHeightBST(array)

      try assert(validateBST(tree: tree!))
      try assertEqual(4, getTreeHeight(tree))

      var inOrder = [Int]()
      inOrderTraverse(tree!, &inOrder)
      try assertEqual([1, 2, 5, 7, 10, 13, 14, 15, 22], inOrder)
    }
  }

  func validateBST(tree: Program.BST) -> Bool {
    var minimum = Int(Int32.min)
    var maximum = Int(Int32.max)
    return validateBSTHelper(tree: tree, minimum: &minimum, maximum: &maximum)
  }

  func validateBSTHelper(tree: Program.BST?, minimum: inout Int, maximum: inout Int) -> Bool {
    if tree === nil {
      return true
    }

    if let tree = tree, tree.value < minimum || tree.value >= maximum {
      return false
    }

    if var treeValue = tree?.value {
      let leftIsValid = validateBSTHelper(tree: tree?.left, minimum: &minimum, maximum: &treeValue)
      let rightIsValid = validateBSTHelper(tree: tree?.right, minimum: &treeValue, maximum: &maximum)

      return leftIsValid && rightIsValid
    } else {
      return false
    }
  }

  func getTreeHeight(_ tree: Program.BST?) -> Int {
    if let t = tree {
      let left = getTreeHeight(t.left)
      let right = getTreeHeight(t.right)
      if left > right {
        return left + 1
      }
      return right + 1
    }
    return 0
  }

  func inOrderTraverse(_ tree: Program.BST, _ array: inout [Int]) -> [Int] {
    if let left = tree.left {
      inOrderTraverse(left, &array)
    }
    array.append(tree.value)
    if let right = tree.right {
      inOrderTraverse(right, &array)
    }
    return array
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nlog(n)) time | O(n) space - where n is the length of the array
  static func minHeightBST(_ array: [Int]) -> BST? {
    return constructMinHeightBst(array, nil, 0, array.count - 1)
  }

  static func constructMinHeightBst(_ array: [Int], _ bst: BST?, _ startIdx: Int, _ endIdx: Int) -> BST? {
    if endIdx < startIdx {
      return nil
    }

    var tree = bst
    var midIdx = (startIdx + endIdx) / 2
    var valueToAdd = array[midIdx]
    if let t = tree {
      t.insert(value: valueToAdd)
    } else {
      tree = BST(value: valueToAdd)
    }

    constructMinHeightBst(array, tree, startIdx, midIdx - 1)
    constructMinHeightBst(array, tree, midIdx + 1, endIdx)
    return tree
  }

  class BST {
    var value: Int
    var left: BST?
    var right: BST?

    init(value: Int) {
      self.value = value
    }

    func insert(value: Int) {
      if value < self.value {
        if let left = self.left {
          left.insert(value: value)
        } else {
          left = BST(value: value)
        }
      } else {
        if let right = self.right {
          right.insert(value: value)
        } else {
          right = BST(value: value)
        }
      }
    }
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the length of the array
  static func minHeightBST(_ array: [Int]) -> BST? {
    return constructMinHeightBst(array, nil, 0, array.count - 1)
  }

  static func constructMinHeightBst(_ array: [Int], _ bst: BST?, _ startIdx: Int, _ endIdx: Int) -> BST? {
    if endIdx < startIdx {
      return nil
    }

    var tree = bst
    var midIdx = (startIdx + endIdx) / 2
    var newBstNode = BST(value: array[midIdx])
    if let t = tree {
      if array[midIdx] < t.value {
        t.left = newBstNode
      } else {
        t.right = newBstNode
      }
    }

    tree = newBstNode
    constructMinHeightBst(array, tree, startIdx, midIdx - 1)
    constructMinHeightBst(array, tree, midIdx + 1, endIdx)
    return tree
  }

  class BST {
    var value: Int
    var left: BST?
    var right: BST?

    init(value: Int) {
      self.value = value
    }

    // We don't use this method for this solution.
    func insert(value: Int) {
      if value < self.value {
        if let left = self.left {
          left.insert(value: value)
        } else {
          left = BST(value: value)
        }
      } else {
        if let right = self.right {
          right.insert(value: value)
        } else {
          right = BST(value: value)
        }
      }
    }
  }
}

```
### Solution 3 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the length of the array
  static func minHeightBST(_ array: [Int]) -> BST? {
    return constructMinHeightBst(array, 0, array.count - 1)
  }

  static func constructMinHeightBst(_ array: [Int], _ startIdx: Int, _ endIdx: Int) -> BST? {
    if endIdx < startIdx {
      return nil
    }

    var midIdx = (startIdx + endIdx) / 2
    var bst = BST(value: array[midIdx])
    bst.left = constructMinHeightBst(array, startIdx, midIdx - 1)
    bst.right = constructMinHeightBst(array, midIdx + 1, endIdx)
    return bst
  }

  class BST {
    var value: Int
    var left: BST?
    var right: BST?

    init(value: Int) {
      self.value = value
    }

    // We don't use this method for this solution.
    func insert(value: Int) {
      if value < self.value {
        if let left = self.left {
          left.insert(value: value)
        } else {
          left = BST(value: value)
        }
      } else {
        if let right = self.right {
          right.insert(value: value)
        } else {
          right = BST(value: value)
        }
      }
    }
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let array = [1, 2, 5, 7, 10, 13, 14, 15, 22]
      let tree = Program.minHeightBST(array)

      try assert(validateBST(tree: tree!))
      try assertEqual(4, getTreeHeight(tree))

      var inOrder = [Int]()
      inOrderTraverse(tree!, &inOrder)
      try assertEqual([1, 2, 5, 7, 10, 13, 14, 15, 22], inOrder)
    }
  }

  func validateBST(tree: Program.BST) -> Bool {
    var minimum = Int(Int32.min)
    var maximum = Int(Int32.max)
    return validateBSTHelper(tree: tree, minimum: &minimum, maximum: &maximum)
  }

  func validateBSTHelper(tree: Program.BST?, minimum: inout Int, maximum: inout Int) -> Bool {
    if tree === nil {
      return true
    }

    if let tree = tree, tree.value < minimum || tree.value >= maximum {
      return false
    }

    if var treeValue = tree?.value {
      let leftIsValid = validateBSTHelper(tree: tree?.left, minimum: &minimum, maximum: &treeValue)
      let rightIsValid = validateBSTHelper(tree: tree?.right, minimum: &treeValue, maximum: &maximum)

      return leftIsValid && rightIsValid
    } else {
      return false
    }
  }

  func getTreeHeight(_ tree: Program.BST?) -> Int {
    if let t = tree {
      let left = getTreeHeight(t.left)
      let right = getTreeHeight(t.right)
      if left > right {
        return left + 1
      }
      return right + 1
    }
    return 0
  }

  func inOrderTraverse(_ tree: Program.BST, _ array: inout [Int]) -> [Int] {
    if let left = tree.left {
      inOrderTraverse(left, &array)
    }
    array.append(tree.value)
    if let right = tree.right {
      inOrderTraverse(right, &array)
    }
    return array
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


def inOrderTraverse(tree, array):
    if tree is not None:
        inOrderTraverse(tree.left, array)
        array.append(tree.value)
        inOrderTraverse(tree.right, array)
    return array


def validateBst(tree):
    return validateBstHelper(tree, float("-inf"), float("inf"))


def validateBstHelper(tree, minValue, maxValue):
    if tree is None:
        return True
    if tree.value < minValue or tree.value >= maxValue:
        return False
    leftIsValid = validateBstHelper(tree.left, minValue, tree.value)
    return leftIsValid and validateBstHelper(tree.right, tree.value, maxValue)


def getTreeHeight(tree, height=0):
    if tree is None:
        return height
    leftTreeHeight = getTreeHeight(tree.left, height + 1)
    rightTreeHeight = getTreeHeight(tree.right, height + 1)
    return max(leftTreeHeight, rightTreeHeight)


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        array = [1, 2, 5, 7, 10, 13, 14, 15, 22]
        tree = program.minHeightBst(array)

        self.assertTrue(validateBst(tree))
        self.assertEqual(getTreeHeight(tree), 4)

        inOrder = inOrderTraverse(tree, [])

        self.assertEqual(inOrder, [1, 2, 5, 7, 10, 13, 14, 15, 22])

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nlog(n)) time | O(n) space - where n is the length of the array
def minHeightBst(array):
    return constructMinHeightBst(array, None, 0, len(array) - 1)


def constructMinHeightBst(array, bst, startIdx, endIdx):
    if endIdx < startIdx:
        return
    midIdx = (startIdx + endIdx) // 2
    valueToAdd = array[midIdx]
    if bst is None:
        bst = BST(valueToAdd)
    else:
        bst.insert(valueToAdd)
    constructMinHeightBst(array, bst, startIdx, midIdx - 1)
    constructMinHeightBst(array, bst, midIdx + 1, endIdx)
    return bst


class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

    def insert(self, value):
        if value < self.value:
            if self.left is None:
                self.left = BST(value)
            else:
                self.left.insert(value)
        else:
            if self.right is None:
                self.right = BST(value)
            else:
                self.right.insert(value)

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the length of the array
def minHeightBst(array):
    return constructMinHeightBst(array, None, 0, len(array) - 1)


def constructMinHeightBst(array, bst, startIdx, endIdx):
    if endIdx < startIdx:
        return
    midIdx = (startIdx + endIdx) // 2
    newBstNode = BST(array[midIdx])
    if bst is None:
        bst = newBstNode
    else:
        if array[midIdx] < bst.value:
            bst.left = newBstNode
            bst = bst.left
        else:
            bst.right = newBstNode
            bst = bst.right
    constructMinHeightBst(array, bst, startIdx, midIdx - 1)
    constructMinHeightBst(array, bst, midIdx + 1, endIdx)
    return bst


class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

    # We don't use this method for this solution.
    def insert(self, value):
        if value < self.value:
            if self.left is None:
                self.left = BST(value)
            else:
                self.left.insert(value)
        else:
            if self.right is None:
                self.right = BST(value)
            else:
                self.right.insert(value)

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the length of the array
def minHeightBst(array):
    return constructMinHeightBst(array, 0, len(array) - 1)


def constructMinHeightBst(array, startIdx, endIdx):
    if endIdx < startIdx:
        return None
    midIdx = (startIdx + endIdx) // 2
    bst = BST(array[midIdx])
    bst.left = constructMinHeightBst(array, startIdx, midIdx - 1)
    bst.right = constructMinHeightBst(array, midIdx + 1, endIdx)
    return bst


class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

    # We don't use this method for this solution.
    def insert(self, value):
        if value < self.value:
            if self.left is None:
                self.left = BST(value)
            else:
                self.left.insert(value)
        else:
            if self.right is None:
                self.right = BST(value)
            else:
                self.right.insert(value)

```
### Unit Tests 1 (python)
```python
import program
import unittest


def inOrderTraverse(tree, array):
    if tree is not None:
        inOrderTraverse(tree.left, array)
        array.append(tree.value)
        inOrderTraverse(tree.right, array)
    return array


def validateBst(tree):
    return validateBstHelper(tree, float("-inf"), float("inf"))


def validateBstHelper(tree, minValue, maxValue):
    if tree is None:
        return True
    if tree.value < minValue or tree.value >= maxValue:
        return False
    leftIsValid = validateBstHelper(tree.left, minValue, tree.value)
    return leftIsValid and validateBstHelper(tree.right, tree.value, maxValue)


def getTreeHeight(tree, height=0):
    if tree is None:
        return height
    leftTreeHeight = getTreeHeight(tree.left, height + 1)
    rightTreeHeight = getTreeHeight(tree.right, height + 1)
    return max(leftTreeHeight, rightTreeHeight)


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        array = [1, 2, 5, 7, 10, 13, 14, 15, 22]
        tree = program.minHeightBst(array)

        self.assertTrue(validateBst(tree))
        self.assertEqual(getTreeHeight(tree), 4)

        inOrder = inOrderTraverse(tree, [])

        self.assertEqual(inOrder, [1, 2, 5, 7, 10, 13, 14, 15, 22])

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const array = [1, 2, 5, 7, 10, 13, 14, 15, 22];
  const tree = program.minHeightBst(array)!;

  chai.expect(validateBst(tree)).to.deep.equal(true);
  chai.expect(getTreeHeight(tree)).to.deep.equal(4);

  const inOrder = inOrderTraverse(tree, []);
  const expected = [1, 2, 5, 7, 10, 13, 14, 15, 22];

  chai.expect(inOrder).to.deep.equal(expected);
});

function validateBst(tree: program.BST) {
  return validateBstHelper(tree, -Infinity, Infinity);
}

function validateBstHelper(tree: program.BST | null, minValue: number, maxValue: number): boolean {
  if (tree === null) return true;
  if (tree.value < minValue || tree.value >= maxValue) return false;
  const leftIsValid = validateBstHelper(tree.left, minValue, tree.value);
  return leftIsValid && validateBstHelper(tree.right, tree.value, maxValue);
}

function inOrderTraverse(tree: program.BST | null, array: number[]) {
  if (tree !== null) {
    inOrderTraverse(tree.left, array);
    array.push(tree.value);
    inOrderTraverse(tree.right, array);
  }
  return array;
}

function getTreeHeight(tree: program.BST | null, height = 0): number {
  if (tree === null) return height;
  const leftTreeHeight = getTreeHeight(tree.left, height + 1);
  const rightTreeHeight = getTreeHeight(tree.right, height + 1);
  return Math.max(leftTreeHeight, rightTreeHeight);
}

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlog(n)) time | O(n) space - where n is the length of the array
export function minHeightBst(array: number[]) {
  return constructMinHeightBst(array, null, 0, array.length - 1);
}

function constructMinHeightBst(array: number[], bst: BST | null, startIdx: number, endIdx: number) {
  if (endIdx < startIdx) return;
  const midIdx = Math.floor((startIdx + endIdx) / 2);
  const valueToAdd = array[midIdx];
  if (bst === null) {
    bst = new BST(valueToAdd);
  } else {
    bst.insert(valueToAdd);
  }
  constructMinHeightBst(array, bst, startIdx, midIdx - 1);
  constructMinHeightBst(array, bst, midIdx + 1, endIdx);
  return bst;
}

export class BST {
  value: number;
  left: BST | null;
  right: BST | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(value: number) {
    if (value < this.value) {
      if (this.left === null) {
        this.left = new BST(value);
      } else {
        this.left.insert(value);
      }
    } else {
      if (this.right === null) {
        this.right = new BST(value);
      } else {
        this.right.insert(value);
      }
    }
  }
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the array
export function minHeightBst(array: number[]) {
  return constructMinHeightBst(array, null, 0, array.length - 1);
}

function constructMinHeightBst(array: number[], bst: BST | null, startIdx: number, endIdx: number) {
  if (endIdx < startIdx) return;
  const midIdx = Math.floor((startIdx + endIdx) / 2);
  const newBstNode = new BST(array[midIdx]);
  if (bst === null) {
    bst = newBstNode;
  } else {
    if (array[midIdx] < bst.value) {
      bst.left = newBstNode;
      bst = bst.left;
    } else {
      bst.right = newBstNode;
      bst = bst.right;
    }
  }
  constructMinHeightBst(array, bst, startIdx, midIdx - 1);
  constructMinHeightBst(array, bst, midIdx + 1, endIdx);
  return bst;
}

export class BST {
  value: number;
  left: BST | null;
  right: BST | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  // We don't use this method for this solution.
  insert(value: number) {
    if (value < this.value) {
      if (this.left === null) {
        this.left = new BST(value);
      } else {
        this.left.insert(value);
      }
    } else {
      if (this.right === null) {
        this.right = new BST(value);
      } else {
        this.right.insert(value);
      }
    }
  }
}

```
### Solution 3 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the array
export function minHeightBst(array: number[]) {
  return constructMinHeightBst(array, 0, array.length - 1);
}

function constructMinHeightBst(array: number[], startIdx: number, endIdx: number) {
  if (endIdx < startIdx) return null;
  const midIdx = Math.floor((startIdx + endIdx) / 2);
  const bst = new BST(array[midIdx]);
  bst.left = constructMinHeightBst(array, startIdx, midIdx - 1);
  bst.right = constructMinHeightBst(array, midIdx + 1, endIdx);
  return bst;
}

export class BST {
  value: number;
  left: BST | null;
  right: BST | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  // We don't use this method for this solution.
  insert(value: number) {
    if (value < this.value) {
      if (this.left === null) {
        this.left = new BST(value);
      } else {
        this.left.insert(value);
      }
    } else {
      if (this.right === null) {
        this.right = new BST(value);
      } else {
        this.right.insert(value);
      }
    }
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const array = [1, 2, 5, 7, 10, 13, 14, 15, 22];
  const tree = program.minHeightBst(array)!;

  chai.expect(validateBst(tree)).to.deep.equal(true);
  chai.expect(getTreeHeight(tree)).to.deep.equal(4);

  const inOrder = inOrderTraverse(tree, []);
  const expected = [1, 2, 5, 7, 10, 13, 14, 15, 22];

  chai.expect(inOrder).to.deep.equal(expected);
});

function validateBst(tree: program.BST) {
  return validateBstHelper(tree, -Infinity, Infinity);
}

function validateBstHelper(tree: program.BST | null, minValue: number, maxValue: number): boolean {
  if (tree === null) return true;
  if (tree.value < minValue || tree.value >= maxValue) return false;
  const leftIsValid = validateBstHelper(tree.left, minValue, tree.value);
  return leftIsValid && validateBstHelper(tree.right, tree.value, maxValue);
}

function inOrderTraverse(tree: program.BST | null, array: number[]) {
  if (tree !== null) {
    inOrderTraverse(tree.left, array);
    array.push(tree.value);
    inOrderTraverse(tree.right, array);
  }
  return array;
}

function getTreeHeight(tree: program.BST | null, height = 0): number {
  if (tree === null) return height;
  const leftTreeHeight = getTreeHeight(tree.left, height + 1);
  const rightTreeHeight = getTreeHeight(tree.right, height + 1);
  return Math.max(leftTreeHeight, rightTreeHeight);
}

```

