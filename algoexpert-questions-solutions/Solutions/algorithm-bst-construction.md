# BST Construction
<div class="html">
<p>
  Write a <span>BST</span> class for a Binary Search Tree. The class should
  support:
</p>
<ul>
  <li>Inserting values with the <span>insert</span> method.</li>
  <li>
    Removing values with the <span>remove</span> method; this method should
    only remove the first instance of a given value.
  </li>
  <li>Searching for values with the <span>contains</span> method.</li>
</ul>
<p>
  Note that you can't remove values from a single-node tree. In other words,
  calling the <span>remove</span> method on a single-node tree should simply not
  do anything.
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
<h3>Sample Usage</h3>
<pre>
<span class="CodeEditor-promptComment">// Assume the following BST has already been created:</span>
         10
       /     \
      5      15
    /   \   /   \
   2     5 13   22
 /           \
1            14

<span class="CodeEditor-promptComment">// All operations below are performed sequentially.</span>
<span class="CodeEditor-promptParameter">insert</span>(12):   10
            /     \
           5      15
         /   \   /   \
        2     5 13   22
      /        /  \
     1        12  14

<span class="CodeEditor-promptParameter">remove</span>(10):   12
            /     \
           5      15
         /   \   /   \
        2     5 13   22
      /           \
     1            14

<span class="CodeEditor-promptParameter">contains</span>(15): true
</pre>
</div>

Hint 1
<p>
As you try to insert, find, or a remove a value into, in, or from a BST, you will have to traverse the tree's nodes. The BST property allows you to eliminate half of the remaining tree at each node that you traverse: if the target value is strictly smaller than a node's value, then it must be (or can only be) located to the left of the node, otherwise it must be (or can only be) to the right of that node.
</p>


Hint 2

<p>
Traverse the BST all the while applying the logic described in Hint #1. For insertion, add the target value to the BST once you reach a leaf (None / null) node. For searching, if you reach a leaf node without having found the target value that means the value isn't in the BST. For removal, consider the various cases that you might encounter: the node you need to remove might have two children nodes, one, or none; it might also be the root node; make sure to account for all of these cases.
</p>


Hint 3

<p>
What are the advantages and disadvantages of implementing these methods iteratively as opposed to recursively?
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
      BST *root = new BST(10);
      root->left = new BST(5);
      root->left->left = new BST(2);
      root->left->left->left = new BST(1);
      root->left->right = new BST(5);
      root->right = new BST(15);
      root->right->left = new BST(13);
      root->right->left->right = new BST(14);
      root->right->right = new BST(22);

      root->insert(12);
      assert(root->right->left->left->value == 12);

      root->remove(10);
      assert(root->contains(10) == false);
      assert(root->value == 12);

      assert(root->contains(15));
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

  BST(int val) {
    value = val;
    left = nullptr;
    right = nullptr;
  }

  // Average: O(log(n)) time | O(log(n)) space
  // Worst: O(n) time | O(n) space
  BST &insert(int val) {
    if (val < value) {
      if (left == nullptr) {
        BST *newBST = new BST(val);
        left = newBST;
      } else {
        left->insert(val);
      }
    } else {
      if (right == nullptr) {
        BST *newBST = new BST(val);
        right = newBST;
      } else {
        right->insert(val);
      }
    }
    return *this;
  }

  // Average: O(log(n)) time | O(log(n)) space
  // Worst: O(n) time | O(n) space
  bool contains(int val) {
    if (val < value) {
      if (left == nullptr) {
        return false;
      } else {
        return left->contains(val);
      }
    } else if (val > value) {
      if (right == nullptr) {
        return false;
      } else {
        return right->contains(val);
      }
    } else {
      return true;
    }
  }

  // Average: O(log(n)) time | O(log(n)) space
  // Worst: O(n) time | O(n) space
  BST &remove(int val, BST *parent = nullptr) {
    if (val < value) {
      if (left != nullptr) {
        left->remove(val, this);
      }
    } else if (val > value) {
      if (right != nullptr) {
        right->remove(val, this);
      }
    } else {
      if (left != nullptr && right != nullptr) {
        value = right->getMinValue();
        right->remove(value, this);
      } else if (parent == nullptr) {
        if (left != nullptr) {
          value = left->value;
          right = left->right;
          left = left->left;
        } else if (right != nullptr) {
          value = right->value;
          left = right->left;
          right = right->right;
        } else {
          // This is a single-node tree; do nothing.
        }
      } else if (parent->left == this) {
        parent->left = left != nullptr ? left : right;
      } else if (parent->right == this) {
        parent->right = left != nullptr ? left : right;
      }
    }
    return *this;
  }

  int getMinValue() {
    if (left == nullptr) {
      return value;
    } else {
      return left->getMinValue();
    }
  }
};

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

class BST {
public:
  int value;
  BST *left;
  BST *right;

  BST(int val) {
    value = val;
    left = nullptr;
    right = nullptr;
  }

  // Average: O(log(n)) time | O(1) space
  // Worst: O(n) time | O(1) space
  BST &insert(int val) {
    BST *currentNode = this;
    while (true) {
      if (val < currentNode->value) {
        if (currentNode->left == nullptr) {
          BST *newNode = new BST(val);
          currentNode->left = newNode;
          break;
        } else {
          currentNode = currentNode->left;
        }
      } else {
        if (currentNode->right == nullptr) {
          BST *newNode = new BST(val);
          currentNode->right = newNode;
          break;
        } else {
          currentNode = currentNode->right;
        }
      }
    }
    return *this;
  }

  // Average: O(log(n)) time | O(1) space
  // Worst: O(n) time | O(1) space
  bool contains(int val) {
    BST *currentNode = this;
    while (currentNode != nullptr) {
      if (val < currentNode->value) {
        currentNode = currentNode->left;
      } else if (val > currentNode->value) {
        currentNode = currentNode->right;
      } else {
        return true;
      }
    }
    return false;
  }

  // Average: O(log(n)) time | O(1) space
  // Worst: O(n) time | O(1) space
  BST &remove(int val, BST *parentNode = nullptr) {
    BST *currentNode = this;
    while (currentNode != nullptr) {
      if (val < currentNode->value) {
        parentNode = currentNode;
        currentNode = currentNode->left;
      } else if (val > currentNode->value) {
        parentNode = currentNode;
        currentNode = currentNode->right;
      } else {
        if (currentNode->left != nullptr && currentNode->right != nullptr) {
          currentNode->value = currentNode->right->getMinValue();
          currentNode->right->remove(currentNode->value, currentNode);
        } else if (parentNode == nullptr) {
          if (currentNode->left != nullptr) {
            currentNode->value = currentNode->left->value;
            currentNode->right = currentNode->left->right;
            currentNode->left = currentNode->left->left;
          } else if (currentNode->right != nullptr) {
            currentNode->value = currentNode->right->value;
            currentNode->left = currentNode->right->left;
            currentNode->right = currentNode->right->right;
          } else {
            // This is a single-node tree; do nothing.
          }
        } else if (parentNode->left == currentNode) {
          parentNode->left = currentNode->left != nullptr ? currentNode->left
                                                          : currentNode->right;
        } else if (parentNode->right == currentNode) {
          parentNode->right = currentNode->left != nullptr ? currentNode->left
                                                           : currentNode->right;
        }
        break;
      }
    }
    return *this;
  }

  int getMinValue() {
    if (left == nullptr) {
      return value;
    } else {
      return left->getMinValue();
    }
  }
};

```
### Unit Tests 1 (cpp)
```cpp
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

      root->insert(12);
      assert(root->right->left->left->value == 12);

      root->remove(10);
      assert(root->contains(10) == false);
      assert(root->value == 12);

      assert(root->contains(15));
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
		var root = new Program.BST(10);
		root.left = new Program.BST(5);
		root.left.left = new Program.BST(2);
		root.left.left.left = new Program.BST(1);
		root.left.right = new Program.BST(5);
		root.right = new Program.BST(15);
		root.right.left = new Program.BST(13);
		root.right.left.right = new Program.BST(14);
		root.right.right = new Program.BST(22);

		root.Insert(12);
		Utils.AssertTrue(root.right.left.left.value == 12);

		root.Remove(10);
		Utils.AssertTrue(root.Contains(10) == false);
		Utils.AssertTrue(root.value == 12);

		Utils.AssertTrue(root.Contains(15));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	public class BST {
		public int value;
		public BST left;
		public BST right;

		public BST(int value) {
			this.value = value;
		}

		// Average: O(log(n)) time | O(log(n)) space
		// Worst: O(n) time | O(n) space
		public BST Insert(int value) {
			if (value < this.value) {
				if (left == null) {
					BST newBST = new BST(value);
					left = newBST;
				} else {
					left.Insert(value);
				}
			} else {
				if (right == null) {
					BST newBST = new BST(value);
					right = newBST;
				} else {
					right.Insert(value);
				}
			}
			return this;
		}

		// Average: O(log(n)) time | O(log(n)) space
		// Worst: O(n) time | O(n) space
		public bool Contains(int value) {
			if (value < this.value) {
				if (left == null) {
					return false;
				} else {
					return left.Contains(value);
				}
			} else if (value > this.value) {
				if (right == null) {
					return false;
				} else {
					return right.Contains(value);
				}
			} else {
				return true;
			}
		}

		// Average: O(log(n)) time | O(log(n)) space
		// Worst: O(n) time | O(n) space
		public BST Remove(int value) {
			Remove(value, null);
			return this;
		}

		public void Remove(int value, BST parent) {
			if (value < this.value) {
				if (left != null) {
					left.Remove(value, this);
				}
			} else if (value > this.value) {
				if (right != null) {
					right.Remove(value, this);
				}
			} else {
				if (left != null && right != null) {
					this.value = right.getMinValue();
					right.Remove(this.value, this);
				} else if (parent == null) {
					if (left != null) {
						this.value = left.value;
						right = left.right;
						left = left.left;
					} else if (right != null) {
						this.value = right.value;
						left = right.left;
						right = right.right;
					} else {
						// This is a single-node tree; do nothing.
					}
				} else if (parent.left == this) {
					parent.left = left != null ? left : right;
				} else if (parent.right == this) {
					parent.right = left != null ? left : right;
				}
			}
		}

		public int getMinValue() {
			if (left == null) {
				return this.value;
			} else {
				return left.getMinValue();
			}
		}
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	public class BST {
		public int value;
		public BST left;
		public BST right;

		public BST(int value) {
			this.value = value;
		}

		// Average: O(log(n)) time | O(1) space
		// Worst: O(n) time | O(1) space
		public BST Insert(int value) {
			BST currentNode = this;
			while (true) {
				if (value < currentNode.value) {
					if (currentNode.left == null) {
						BST newNode = new BST(value);
						currentNode.left = newNode;
						break;
					} else {
						currentNode = currentNode.left;
					}
				} else {
					if (currentNode.right == null) {
						BST newNode = new BST(value);
						currentNode.right = newNode;
						break;
					} else {
						currentNode = currentNode.right;
					}
				}
			}
			return this;
		}

		// Average: O(log(n)) time | O(1) space
		// Worst: O(n) time | O(1) space
		public bool Contains(int value) {
			BST currentNode = this;
			while (currentNode != null) {
				if (value < currentNode.value) {
					currentNode = currentNode.left;
				} else if (value > currentNode.value) {
					currentNode = currentNode.right;
				} else {
					return true;
				}
			}
			return false;
		}

		// Average: O(log(n)) time | O(1) space
		// Worst: O(n) time | O(1) space
		public BST Remove(int value) {
			Remove(value, null);
			return this;
		}

		public void Remove(int value, BST parentNode) {
			BST currentNode = this;
			while (currentNode != null) {
				if (value < currentNode.value) {
					parentNode = currentNode;
					currentNode = currentNode.left;
				} else if (value > currentNode.value) {
					parentNode = currentNode;
					currentNode = currentNode.right;
				} else {
					if (currentNode.left != null && currentNode.right != null) {
						currentNode.value = currentNode.right.getMinValue();
						currentNode.right.Remove(currentNode.value,
						  currentNode);
					} else if (parentNode == null) {
						if (currentNode.left != null) {
							currentNode.value = currentNode.left.value;
							currentNode.right = currentNode.left.right;
							currentNode.left = currentNode.left.left;
						} else if (currentNode.right != null) {
							currentNode.value = currentNode.right.value;
							currentNode.left = currentNode.right.left;
							currentNode.right = currentNode.right.right;
						} else {
							// This is a single-node tree; do nothing.
						}
					} else if (parentNode.left == currentNode) {
						parentNode.left = currentNode.left !=
						  null ? currentNode.left :
						  currentNode.right;
					} else if (parentNode.right == currentNode) {
						parentNode.right = currentNode.left !=
						  null ? currentNode.left :
						  currentNode.right;
					}
					break;
				}
			}
		}

		public int getMinValue() {
			if (left == null) {
				return value;
			} else {
				return left.getMinValue();
			}
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
		var root = new Program.BST(10);
		root.left = new Program.BST(5);
		root.left.left = new Program.BST(2);
		root.left.left.left = new Program.BST(1);
		root.left.right = new Program.BST(5);
		root.right = new Program.BST(15);
		root.right.left = new Program.BST(13);
		root.right.left.right = new Program.BST(14);
		root.right.right = new Program.BST(22);

		root.Insert(12);
		Utils.AssertTrue(root.right.left.left.value == 12);

		root.Remove(10);
		Utils.AssertTrue(root.Contains(10) == false);
		Utils.AssertTrue(root.value == 12);

		Utils.AssertTrue(root.Contains(15));
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

	root.Insert(12)
	require.True(t, root.Right.Left.Left.Value == 12)

	root.Remove(10)
	require.True(t, root.Contains(10) == false)
	require.True(t, root.Value == 12)

	require.True(t, root.Contains(15))
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

// Average: O(log(n)) time | O(log(n)) space
// Worst: O(n) time | O(n) space
func (tree *BST) Contains(value int) bool {
	if value < tree.Value {
		if tree.Left == nil {
			return false
		} else {
			return tree.Left.Contains(value)
		}
	} else if value > tree.Value {
		if tree.Right == nil {
			return false
		} else {
			return tree.Right.Contains(value)
		}
	}
	return true
}

// Average: O(log(n)) time | O(log(n)) space
// Worst: O(n) time | O(n) space
func (tree *BST) Remove(value int) *BST {
	tree.remove(value, nil)
	return tree
}

func (tree *BST) remove(value int, parent *BST) {
	if value < tree.Value {
		if tree.Left != nil {
			tree.Left.remove(value, tree)
		}
	} else if value > tree.Value {
		if tree.Right != nil {
			tree.Right.remove(value, tree)
		}
	} else {
		if tree.Left != nil && tree.Right != nil {
			tree.Value = tree.Right.getMinValue()
			tree.Right.remove(tree.Value, tree)
		} else if parent == nil {
			if tree.Left != nil {
				tree.Value = tree.Left.Value
				tree.Right = tree.Left.Right
				tree.Left = tree.Left.Left
			} else if tree.Right != nil {
				tree.Value = tree.Right.Value
				tree.Left = tree.Right.Left
				tree.Right = tree.Right.Right
			} else {
				// This is a single-node tree; do nothing.
			}
		} else if parent.Left == tree {
			if tree.Left != nil {
				parent.Left = tree.Left
			} else {
				parent.Left = tree.Right
			}
		} else if parent.Right == tree {
			if tree.Left != nil {
				parent.Right = tree.Left
			} else {
				parent.Right = tree.Right
			}
		}
	}
}

func (tree *BST) getMinValue() int {
	if tree.Left == nil {
		return tree.Value
	}
	return tree.Left.getMinValue()
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
func (tree *BST) Insert(value int) *BST {
	current := tree
	for {
		if value < current.Value {
			if current.Left == nil {
				current.Left = &BST{Value: value}
				break
			} else {
				current = current.Left
			}
		} else {
			if current.Right == nil {
				current.Right = &BST{Value: value}
				break
			} else {
				current = current.Right
			}
		}
	}
	return tree
}

// Average: O(log(n)) time | O(1) space
// Worst: O(n) time | O(1) space
func (tree *BST) Contains(value int) bool {
	current := tree
	for current != nil {
		if value < current.Value {
			current = current.Left
		} else if value > current.Value {
			current = current.Right
		} else {
			return true
		}
	}
	return false
}

// Average: O(log(n)) time | O(1) space
// Worst: O(n) time | O(1) space
func (tree *BST) Remove(value int) *BST {
	tree.remove(value, nil)
	return tree
}

func (tree *BST) remove(value int, parent *BST) {
	current := tree
	for current != nil {
		if value < current.Value {
			parent = current
			current = current.Left
		} else if value > current.Value {
			parent = current
			current = current.Right
		} else {
			if current.Left != nil && current.Right != nil {
				current.Value = current.Right.getMinValue()
				current.Right.remove(current.Value, current)
			} else if parent == nil {
				if current.Left != nil {
					current.Value = current.Left.Value
					current.Right = current.Left.Right
					current.Left = current.Left.Left
				} else if current.Right != nil {
					current.Value = current.Right.Value
					current.Left = current.Right.Left
					current.Right = current.Right.Right
				} else {
					// This is a single-node tree; do nothing.
				}
			} else if parent.Left == current {
				if current.Left != nil {
					parent.Left = current.Left
				} else {
					parent.Left = current.Right
				}
			} else if parent.Right == current {
				if current.Left != nil {
					parent.Right = current.Left
				} else {
					parent.Right = current.Right
				}
			}
			break
		}
	}
}

func (tree *BST) getMinValue() int {
	if tree.Left == nil {
		return tree.Value
	}
	return tree.Left.getMinValue()
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

	root.Insert(12)
	require.True(t, root.Right.Left.Left.Value == 12)

	root.Remove(10)
	require.True(t, root.Contains(10) == false)
	require.True(t, root.Value == 12)

	require.True(t, root.Contains(15))
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
    root.right.left = new Program.BST(13);
    root.right.left.right = new Program.BST(14);
    root.right.right = new Program.BST(22);

    root.insert(12);
    Utils.assertTrue(root.right.left.left.value == 12);

    root.remove(10);
    Utils.assertTrue(root.contains(10) == false);
    Utils.assertTrue(root.value == 12);

    Utils.assertTrue(root.contains(15));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  static class BST {
    public int value;
    public BST left;
    public BST right;

    public BST(int value) {
      this.value = value;
    }

    // Average: O(log(n)) time | O(log(n)) space
    // Worst: O(n) time | O(n) space
    public BST insert(int value) {
      if (value < this.value) {
        if (left == null) {
          BST newBST = new BST(value);
          left = newBST;
        } else {
          left.insert(value);
        }
      } else {
        if (right == null) {
          BST newBST = new BST(value);
          right = newBST;
        } else {
          right.insert(value);
        }
      }
      return this;
    }

    // Average: O(log(n)) time | O(log(n)) space
    // Worst: O(n) time | O(n) space
    public boolean contains(int value) {
      if (value < this.value) {
        if (left == null) {
          return false;
        } else {
          return left.contains(value);
        }
      } else if (value > this.value) {
        if (right == null) {
          return false;
        } else {
          return right.contains(value);
        }
      } else {
        return true;
      }
    }

    // Average: O(log(n)) time | O(log(n)) space
    // Worst: O(n) time | O(n) space
    public BST remove(int value) {
      remove(value, null);
      return this;
    }

    public void remove(int value, BST parent) {
      if (value < this.value) {
        if (left != null) {
          left.remove(value, this);
        }
      } else if (value > this.value) {
        if (right != null) {
          right.remove(value, this);
        }
      } else {
        if (left != null && right != null) {
          this.value = right.getMinValue();
          right.remove(this.value, this);
        } else if (parent == null) {
          if (left != null) {
            this.value = left.value;
            right = left.right;
            left = left.left;
          } else if (right != null) {
            this.value = right.value;
            left = right.left;
            right = right.right;
          } else {
            // This is a single-node tree; do nothing.
          }
        } else if (parent.left == this) {
          parent.left = left != null ? left : right;
        } else if (parent.right == this) {
          parent.right = left != null ? left : right;
        }
      }
    }

    public int getMinValue() {
      if (left == null) {
        return this.value;
      } else {
        return left.getMinValue();
      }
    }
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  static class BST {
    public int value;
    public BST left;
    public BST right;

    public BST(int value) {
      this.value = value;
    }

    // Average: O(log(n)) time | O(1) space
    // Worst: O(n) time | O(1) space
    public BST insert(int value) {
      BST currentNode = this;
      while (true) {
        if (value < currentNode.value) {
          if (currentNode.left == null) {
            BST newNode = new BST(value);
            currentNode.left = newNode;
            break;
          } else {
            currentNode = currentNode.left;
          }
        } else {
          if (currentNode.right == null) {
            BST newNode = new BST(value);
            currentNode.right = newNode;
            break;
          } else {
            currentNode = currentNode.right;
          }
        }
      }
      return this;
    }

    // Average: O(log(n)) time | O(1) space
    // Worst: O(n) time | O(1) space
    public boolean contains(int value) {
      BST currentNode = this;
      while (currentNode != null) {
        if (value < currentNode.value) {
          currentNode = currentNode.left;
        } else if (value > currentNode.value) {
          currentNode = currentNode.right;
        } else {
          return true;
        }
      }
      return false;
    }

    // Average: O(log(n)) time | O(1) space
    // Worst: O(n) time | O(1) space
    public BST remove(int value) {
      remove(value, null);
      return this;
    }

    public void remove(int value, BST parentNode) {
      BST currentNode = this;
      while (currentNode != null) {
        if (value < currentNode.value) {
          parentNode = currentNode;
          currentNode = currentNode.left;
        } else if (value > currentNode.value) {
          parentNode = currentNode;
          currentNode = currentNode.right;
        } else {
          if (currentNode.left != null && currentNode.right != null) {
            currentNode.value = currentNode.right.getMinValue();
            currentNode.right.remove(currentNode.value, currentNode);
          } else if (parentNode == null) {
            if (currentNode.left != null) {
              currentNode.value = currentNode.left.value;
              currentNode.right = currentNode.left.right;
              currentNode.left = currentNode.left.left;
            } else if (currentNode.right != null) {
              currentNode.value = currentNode.right.value;
              currentNode.left = currentNode.right.left;
              currentNode.right = currentNode.right.right;
            } else {
              // This is a single-node tree; do nothing.
            }
          } else if (parentNode.left == currentNode) {
            parentNode.left = currentNode.left != null ? currentNode.left : currentNode.right;
          } else if (parentNode.right == currentNode) {
            parentNode.right = currentNode.left != null ? currentNode.left : currentNode.right;
          }
          break;
        }
      }
    }

    public int getMinValue() {
      if (left == null) {
        return value;
      } else {
        return left.getMinValue();
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
    var root = new Program.BST(10);
    root.left = new Program.BST(5);
    root.left.left = new Program.BST(2);
    root.left.left.left = new Program.BST(1);
    root.left.right = new Program.BST(5);
    root.right = new Program.BST(15);
    root.right.left = new Program.BST(13);
    root.right.left.right = new Program.BST(14);
    root.right.right = new Program.BST(22);

    root.insert(12);
    Utils.assertTrue(root.right.left.left.value == 12);

    root.remove(10);
    Utils.assertTrue(root.contains(10) == false);
    Utils.assertTrue(root.value == 12);

    Utils.assertTrue(root.contains(15));
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

const {BST} = program;

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

  root.insert(12);
  chai.expect(root.right.left.left.value).to.deep.equal(12);

  root.remove(10);
  chai.expect(root.contains(10)).to.deep.equal(false);
  chai.expect(root.value).to.deep.equal(12);

  chai.expect(root.contains(15)).to.deep.equal(true);
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

  // Average: O(log(n)) time | O(log(n)) space
  // Worst: O(n) time | O(n) space
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
    return this;
  }

  // Average: O(log(n)) time | O(log(n)) space
  // Worst: O(n) time | O(n) space
  contains(value) {
    if (value < this.value) {
      if (this.left === null) {
        return false;
      } else {
        return this.left.contains(value);
      }
    } else if (value > this.value) {
      if (this.right === null) {
        return false;
      } else {
        return this.right.contains(value);
      }
    } else {
      return true;
    }
  }

  // Average: O(log(n)) time | O(log(n)) space
  // Worst: O(n) time | O(n) space
  remove(value, parent = null) {
    if (value < this.value) {
      if (this.left !== null) {
        this.left.remove(value, this);
      }
    } else if (value > this.value) {
      if (this.right !== null) {
        this.right.remove(value, this);
      }
    } else {
      if (this.left !== null && this.right !== null) {
        this.value = this.right.getMinValue();
        this.right.remove(this.value, this);
      } else if (parent === null) {
        if (this.left !== null) {
          this.value = this.left.value;
          this.right = this.left.right;
          this.left = this.left.left;
        } else if (this.right !== null) {
          this.value = this.right.value;
          this.left = this.right.left;
          this.right = this.right.right;
        } else {
          // This is a single-node tree; do nothing.
        }
      } else if (parent.left === this) {
        parent.left = this.left !== null ? this.left : this.right;
      } else if (parent.right === this) {
        parent.right = this.left !== null ? this.left : this.right;
      }
    }
    return this;
  }

  getMinValue() {
    if (this.left === null) {
      return this.value;
    } else {
      return this.left.getMinValue();
    }
  }
}

exports.BST = BST;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  // Average: O(log(n)) time | O(1) space
  // Worst: O(n) time | O(1) space
  insert(value) {
    let currentNode = this;
    while (true) {
      if (value < currentNode.value) {
        if (currentNode.left === null) {
          currentNode.left = new BST(value);
          break;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (currentNode.right === null) {
          currentNode.right = new BST(value);
          break;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
    return this;
  }

  // Average: O(log(n)) time | O(1) space
  // Worst: O(n) time | O(1) space
  contains(value) {
    let currentNode = this;
    while (currentNode !== null) {
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else {
        return true;
      }
    }
    return false;
  }

  // Average: O(log(n)) time | O(1) space
  // Worst: O(n) time | O(1) space
  remove(value, parentNode = null) {
    let currentNode = this;
    while (currentNode !== null) {
      if (value < currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else {
        if (currentNode.left !== null && currentNode.right !== null) {
          currentNode.value = currentNode.right.getMinValue();
          currentNode.right.remove(currentNode.value, currentNode);
        } else if (parentNode === null) {
          if (currentNode.left !== null) {
            currentNode.value = currentNode.left.value;
            currentNode.right = currentNode.left.right;
            currentNode.left = currentNode.left.left;
          } else if (currentNode.right !== null) {
            currentNode.value = currentNode.right.value;
            currentNode.left = currentNode.right.left;
            currentNode.right = currentNode.right.right;
          } else {
            // This is a single-node tree; do nothing.
          }
        } else if (parentNode.left === currentNode) {
          parentNode.left = currentNode.left !== null ? currentNode.left : currentNode.right;
        } else if (parentNode.right === currentNode) {
          parentNode.right = currentNode.left !== null ? currentNode.left : currentNode.right;
        }
        break;
      }
    }
    return this;
  }

  getMinValue() {
    let currentNode = this;
    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode.value;
  }
}

exports.BST = BST;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

const {BST} = program;

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

  root.insert(12);
  chai.expect(root.right.left.left.value).to.deep.equal(12);

  root.remove(10);
  chai.expect(root.contains(10)).to.deep.equal(false);
  chai.expect(root.value).to.deep.equal(12);

  chai.expect(root.contains(15)).to.deep.equal(true);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.BST as BST

class ProgramTest {
    @Test
    fun TestCase1() {
        val root = BST(10)
        root.left = BST(5)
        root.left!!.left = BST(2)
        root.left!!.left!!.left = BST(1)
        root.left!!.right = BST(5)
        root.right = BST(15)
        root.right!!.left = BST(13)
        root.right!!.left!!.right = BST(14)
        root.right!!.right = BST(22)

        root.insert(12)
        assert(root.right!!.left!!.left != null)
        assert(root.right!!.left!!.left!!.value == 12)

        root.remove(10)
        assert(!root.contains(10))
        assert(root.value == 12)

        assert(root.contains(15))
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

    // Average: O(log(n)) time | O(log(n)) space
    // Worst: O(n) time | O(n) space
    fun insert(value: Int): BST {
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
        return this
    }

    // Average: O(log(n)) time | O(log(n)) space
    // Worst: O(n) time | O(n) space
    fun contains(value: Int): Boolean {
        if (value < this.value) {
            if (this.left == null) {
                return false
            } else {
                return this.left!!.contains(value)
            }
        } else if (value > this.value) {
            if (this.right == null) {
                return false
            } else {
                return this.right!!.contains(value)
            }
        } else {
            return true
        }
    }

    // Average: O(log(n)) time | O(log(n)) space
    // Worst: O(n) time | O(n) space
    fun remove(value: Int, parent: BST? = null): BST {
        if (value < this.value) {
            if (this.left != null) {
                this.left!!.remove(value, this)
            }
        } else if (value > this.value) {
            if (this.right != null) {
                this.right!!.remove(value, this)
            }
        } else {
            if (this.left != null && this.right != null) {
                this.value = this.right!!.getMinValue()
                this.right!!.remove(this.value, this)
            } else if (parent == null) {
                if (this.left != null) {
                    this.value = this.left!!.value
                    this.right = this.left!!.right
                    this.left = this.left!!.left
                } else if (this.right != null) {
                    this.value = this.right!!.value
                    this.left = this.right!!.left
                    this.right = this.right!!.right
                } else {
                    // This is a single-node tree; do nothing.
                }
            } else if (parent.left == this) {
                parent.left = if (this.left != null) this.left else this.right
            } else if (parent.right == this) {
                parent.right = if (this.left != null) this.left else this.right
            }
        }
        return this
    }

    fun getMinValue(): Int {
        if (this.left == null) {
            return this.value
        } else {
            return this.left!!.getMinValue()
        }
    }
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

    // Average: O(log(n)) time | O(1) space
    // Worst: O(n) time | O(1) space
    fun insert(value: Int): BST {
        var currentNode: BST? = this
        while (true) {
            if (value < currentNode!!.value) {
                if (currentNode.left == null) {
                    currentNode.left = BST(value)
                    break
                } else {
                    currentNode = currentNode.left
                }
            } else {
                if (currentNode.right == null) {
                    currentNode.right = BST(value)
                    break
                } else {
                    currentNode = currentNode.right
                }
            }
        }
        return this
    }

    // Average: O(log(n)) time | O(1) space
    // Worst: O(n) time | O(1) space
    fun contains(value: Int): Boolean {
        var currentNode: BST? = this
        while (currentNode !== null) {
            if (value < currentNode.value) {
                currentNode = currentNode.left
            } else if (value > currentNode.value) {
                currentNode = currentNode.right
            } else {
                return true
            }
        }
        return false
    }

    // Average: O(log(n)) time | O(1) space
    // Worst: O(n) time | O(1) space
    fun remove(value: Int, parent: BST? = null): BST {
        var parentNode = parent
        var currentNode: BST? = this
        while (currentNode !== null) {
            if (value < currentNode.value) {
                parentNode = currentNode
                currentNode = currentNode.left
            } else if (value > currentNode.value) {
                parentNode = currentNode
                currentNode = currentNode.right
            } else {
                if (currentNode.left !== null && currentNode.right !== null) {
                    currentNode.value = currentNode.right!!.getMinValue()
                    currentNode.right!!.remove(currentNode.value, currentNode)
                } else if (parentNode == null) {
                    if (currentNode.left !== null) {
                        currentNode.value = currentNode.left!!.value
                        currentNode.right = currentNode.left!!.right
                        currentNode.left = currentNode.left!!.left
                    } else if (currentNode.right !== null) {
                        currentNode.value = currentNode.right!!.value
                        currentNode.left = currentNode.right!!.left
                        currentNode.right = currentNode.right!!.right
                    } else {
                        // This is a single-node tree; do nothing.
                    }
                } else if (parentNode.left == currentNode) {
                    parentNode.left = if (currentNode.left !== null) currentNode.left else currentNode.right
                } else if (parentNode.right == currentNode) {
                    parentNode.right = if (currentNode.left !== null) currentNode.left else currentNode.right
                }
                break
            }
        }
        return this
    }

    fun getMinValue(): Int {
        if (this.left == null) {
            return this.value
        } else {
            return this.left!!.getMinValue()
        }
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.BST as BST

class ProgramTest {
    @Test
    fun TestCase1() {
        val root = BST(10)
        root.left = BST(5)
        root.left!!.left = BST(2)
        root.left!!.left!!.left = BST(1)
        root.left!!.right = BST(5)
        root.right = BST(15)
        root.right!!.left = BST(13)
        root.right!!.left!!.right = BST(14)
        root.right!!.right = BST(22)

        root.insert(12)
        assert(root.right!!.left!!.left != null)
        assert(root.right!!.left!!.left!!.value == 12)

        root.remove(10)
        assert(!root.contains(10))
        assert(root.value == 12)

        assert(root.contains(15))
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

      root.insert(value: 12)
      try assertEqual(12, root.right?.left?.left?.value)

      root.remove(value: 10, parentNode: nil)
      try assertEqual(false, root.contains(value: 10))
      try assertEqual(12, root.value)

      try assertEqual(true, root.contains(value: 15))
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

    // Average: O(log(n)) time | O(log(n)) space
    // Worst: O(n) time | O(n) space
    func insert(value: Int) -> BST {
      if value < self.value {
        if let left = left {
          left.insert(value: value)
        } else {
          left = BST(value: value)
        }
      } else {
        if let right = right {
          right.insert(value: value)
        } else {
          right = BST(value: value)
        }
      }

      return self
    }

    // Average: O(log(n)) time | O(log(n)) space
    // Worst: O(n) time | O(n) space
    func contains(value: Int) -> Bool {
      if value < self.value {
        if let left = left {
          return left.contains(value: value)
        } else {
          return false
        }
      } else if value > self.value {
        if let right = right {
          return right.contains(value: value)
        } else {
          return false
        }
      } else {
        return true
      }
    }

    // Average: O(log(n)) time | O(log(n)) space
    // Worst: O(n) time | O(n) space
    func remove(value: Int?, parentNode: BST?) -> BST {
      if let valueToRemove = value, valueToRemove < self.value {
        if let left = left {
          left.remove(value: value, parentNode: self)
        }
      } else if let valueToRemove = value, valueToRemove > self.value {
        if let right = right {
          right.remove(value: value, parentNode: self)
        }
      } else {
        if let _ = left, let right = right {
          self.value = right.getMinValue()

          right.remove(value: self.value, parentNode: self)
        } else if parentNode === nil {
          if let left = left {
            self.value = left.value

            right = left.right

            self.left = left.left
          } else if let right = right {
            self.value = right.value

            left = right.left

            self.right = right.right
          } else {
            // This is a single-node tree; do nothing.
          }
        } else if let parent = parentNode, let parentLeft = parent.left, parentLeft === self {
          if let left = left {
            parent.left = left
          } else {
            parent.left = right
          }
        } else if let parent = parentNode, let parentRight = parentNode?.right, parentRight === self {
          if let left = left {
            parent.right = left
          } else {
            parent.right = right
          }
        }
      }

      return self
    }

    func getMinValue() -> Int {
      if let left = left {
        return left.getMinValue()
      } else {
        return value
      }
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

    // Average: O(log(n)) time | O(1) space
    // Worst: O(n) time | O(1) space
    func insert(value: Int) -> BST {
      var currentNode: BST? = self

      while true {
        if let node = currentNode, value < node.value {
          if node.left === nil {
            node.left = BST(value: value)
            break
          } else {
            currentNode = node.left
          }
        } else if let node = currentNode {
          if node.right === nil {
            node.right = BST(value: value)
            break
          } else {
            currentNode = node.right
          }
        }
      }

      return self
    }

    // Average: O(log(n)) time | O(1) space
    // Worst: O(n) time | O(1) space
    func contains(value: Int) -> Bool {
      var currentNode: BST? = self

      while currentNode !== nil {
        if let node = currentNode, value < node.value {
          currentNode = node.left
        } else if let node = currentNode, value > node.value {
          currentNode = node.right
        } else {
          return true
        }
      }

      return false
    }

    // Average: O(log(n)) time | O(1) space
    // Worst: O(n) time | O(1) space
    func remove(value: Int, parentNode: BST?) -> BST {
      var currentNode: BST? = self
      var parentNode: BST? = parentNode
      while let node = currentNode {
        if value < node.value {
          parentNode = node
          currentNode = node.left
        } else if value > node.value {
          parentNode = node
          currentNode = node.right
        } else {
          if let left = node.left, let right = node.right {
            node.value = right.getMinValue()
            right.remove(value: node.value, parentNode: node)
          } else if parentNode === nil {
            if let left = node.left {
              node.value = left.value
              node.right = left.right
              node.left = left.left
            } else if let right = node.right {
              node.value = right.value
              node.left = right.left
              node.right = right.right
            } else {
              // This is a single-node tree; do nothing.
            }
          } else if let parent = parentNode {
            if let parentLeft = parent.left, parentLeft === node {
              if let left = node.left {
                parent.left = left
              } else {
                parent.left = node.right
              }
            } else if let parentRight = parent.right, parentRight === node {
              if let left = node.left {
                parent.right = left
              } else {
                parent.right = node.right
              }
            }
          }
          break
        }
      }

      return self
    }

    func getMinValue() -> Int {
      var currentNode = self

      while currentNode.left !== nil {
        if let left = currentNode.left {
          currentNode = left
        }
      }

      return currentNode.value
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

      root.insert(value: 12)
      try assertEqual(12, root.right?.left?.left?.value)

      root.remove(value: 10, parentNode: nil)
      try assertEqual(false, root.contains(value: 10))
      try assertEqual(12, root.value)

      try assertEqual(true, root.contains(value: 15))
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


BST = program.BST


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

        root.insert(12)
        self.assertTrue(root.right.left.left.value == 12)

        root.remove(10)
        self.assertTrue(not root.contains(10))
        self.assertTrue(root.value == 12)

        self.assertTrue(root.contains(15))

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

    # Average: O(log(n)) time | O(log(n)) space
    # Worst: O(n) time | O(n) space
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
        return self

    # Average: O(log(n)) time | O(log(n)) space
    # Worst: O(n) time | O(n) space
    def contains(self, value):
        if value < self.value:
            if self.left is None:
                return False
            else:
                return self.left.contains(value)
        elif value > self.value:
            if self.right is None:
                return False
            else:
                return self.right.contains(value)
        else:
            return True

    # Average: O(log(n)) time | O(log(n)) space
    # Worst: O(n) time | O(n) space
    def remove(self, value, parent=None):
        if value < self.value:
            if self.left is not None:
                self.left.remove(value, self)
        elif value > self.value:
            if self.right is not None:
                self.right.remove(value, self)
        else:
            if self.left is not None and self.right is not None:
                self.value = self.right.getMinValue()
                self.right.remove(self.value, self)
            elif parent is None:
                if self.left is not None:
                    self.value = self.left.value
                    self.right = self.left.right
                    self.left = self.left.left
                elif self.right is not None:
                    self.value = self.right.value
                    self.left = self.right.left
                    self.right = self.right.right
                else:
                    # This is a single-node tree; do nothing.
                    pass
            elif parent.left == self:
                parent.left = self.left if self.left is not None else self.right
            elif parent.right == self:
                parent.right = self.left if self.left is not None else self.right
        return self

    def getMinValue(self):
        if self.left is None:
            return self.value
        else:
            return self.left.getMinValue()

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

    # Average: O(log(n)) time | O(1) space
    # Worst: O(n) time | O(1) space
    def insert(self, value):
        currentNode = self
        while True:
            if value < currentNode.value:
                if currentNode.left is None:
                    currentNode.left = BST(value)
                    break
                else:
                    currentNode = currentNode.left
            else:
                if currentNode.right is None:
                    currentNode.right = BST(value)
                    break
                else:
                    currentNode = currentNode.right
        return self

    # Average: O(log(n)) time | O(1) space
    # Worst: O(n) time | O(1) space
    def contains(self, value):
        currentNode = self
        while currentNode is not None:
            if value < currentNode.value:
                currentNode = currentNode.left
            elif value > currentNode.value:
                currentNode = currentNode.right
            else:
                return True
        return False

    # Average: O(log(n)) time | O(1) space
    # Worst: O(n) time | O(1) space
    def remove(self, value, parentNode=None):
        currentNode = self
        while currentNode is not None:
            if value < currentNode.value:
                parentNode = currentNode
                currentNode = currentNode.left
            elif value > currentNode.value:
                parentNode = currentNode
                currentNode = currentNode.right
            else:
                if currentNode.left is not None and currentNode.right is not None:
                    currentNode.value = currentNode.right.getMinValue()
                    currentNode.right.remove(currentNode.value, currentNode)
                elif parentNode is None:
                    if currentNode.left is not None:
                        currentNode.value = currentNode.left.value
                        currentNode.right = currentNode.left.right
                        currentNode.left = currentNode.left.left
                    elif currentNode.right is not None:
                        currentNode.value = currentNode.right.value
                        currentNode.left = currentNode.right.left
                        currentNode.right = currentNode.right.right
                    else:
                        # This is a single-node tree; do nothing.
                        pass
                elif parentNode.left == currentNode:
                    parentNode.left = currentNode.left if currentNode.left is not None else currentNode.right
                elif parentNode.right == currentNode:
                    parentNode.right = currentNode.left if currentNode.left is not None else currentNode.right
                break
        return self

    def getMinValue(self):
        currentNode = self
        while currentNode.left is not None:
            currentNode = currentNode.left
        return currentNode.value

```
### Unit Tests 1 (python)
```python
import program
import unittest


BST = program.BST


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

        root.insert(12)
        self.assertTrue(root.right.left.left.value == 12)

        root.remove(10)
        self.assertTrue(not root.contains(10))
        self.assertTrue(root.value == 12)

        self.assertTrue(root.contains(15))

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

const {BST} = program;

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

  root.insert(12);
  chai.expect(root.right.left.left).to.not.be.null;
  chai.expect(root.right.left.left!.value).to.deep.equal(12);

  root.remove(10);
  chai.expect(root.contains(10)).to.deep.equal(false);
  chai.expect(root.value).to.deep.equal(12);

  chai.expect(root.contains(15)).to.deep.equal(true);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

export class BST {
  value: number;
  left: BST | null;
  right: BST | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  // Average: O(log(n)) time | O(log(n)) space
  // Worst: O(n) time | O(n) space
  insert(value: number): BST {
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
    return this;
  }

  // Average: O(log(n)) time | O(log(n)) space
  // Worst: O(n) time | O(n) space
  contains(value: number): boolean {
    if (value < this.value) {
      if (this.left === null) {
        return false;
      } else {
        return this.left.contains(value);
      }
    } else if (value > this.value) {
      if (this.right === null) {
        return false;
      } else {
        return this.right.contains(value);
      }
    } else {
      return true;
    }
  }

  // Average: O(log(n)) time | O(log(n)) space
  // Worst: O(n) time | O(n) space
  remove(value: number, parent: BST | null = null) {
    if (value < this.value) {
      if (this.left !== null) {
        this.left.remove(value, this);
      }
    } else if (value > this.value) {
      if (this.right !== null) {
        this.right.remove(value, this);
      }
    } else {
      if (this.left !== null && this.right !== null) {
        this.value = this.right.getMinValue();
        this.right.remove(this.value, this);
      } else if (parent === null) {
        if (this.left !== null) {
          this.value = this.left.value;
          this.right = this.left.right;
          this.left = this.left.left;
        } else if (this.right !== null) {
          this.value = this.right.value;
          this.left = this.right.left;
          this.right = this.right.right;
        } else {
          // This is a single-node tree; do nothing.
        }
      } else if (parent.left === this) {
        parent.left = this.left !== null ? this.left : this.right;
      } else if (parent.right === this) {
        parent.right = this.left !== null ? this.left : this.right;
      }
    }
    return this;
  }

  getMinValue(): number {
    if (this.left === null) {
      return this.value;
    } else {
      return this.left.getMinValue();
    }
  }
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

export class BST {
  value: number;
  left: BST | null;
  right: BST | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  // Average: O(log(n)) time | O(1) space
  // Worst: O(n) time | O(1) space
  insert(value: number) {
    let currentNode: BST = this;
    while (true) {
      if (value < currentNode.value) {
        if (currentNode.left === null) {
          currentNode.left = new BST(value);
          break;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (currentNode.right === null) {
          currentNode.right = new BST(value);
          break;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
    return this;
  }

  // Average: O(log(n)) time | O(1) space
  // Worst: O(n) time | O(1) space
  contains(value: number) {
    let currentNode: BST | null = this;
    while (currentNode !== null) {
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else {
        return true;
      }
    }
    return false;
  }

  // Average: O(log(n)) time | O(1) space
  // Worst: O(n) time | O(1) space
  remove(value: number, parentNode: BST | null = null) {
    let currentNode: BST | null = this;
    while (currentNode !== null) {
      if (value < currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else {
        if (currentNode.left !== null && currentNode.right !== null) {
          currentNode.value = currentNode.right.getMinValue();
          currentNode.right.remove(currentNode.value, currentNode);
        } else if (parentNode === null) {
          if (currentNode.left !== null) {
            currentNode.value = currentNode.left.value;
            currentNode.right = currentNode.left.right;
            currentNode.left = currentNode.left.left;
          } else if (currentNode.right !== null) {
            currentNode.value = currentNode.right.value;
            currentNode.left = currentNode.right.left;
            currentNode.right = currentNode.right.right;
          } else {
            // This is a single-node tree; do nothing.
          }
        } else if (parentNode.left === currentNode) {
          parentNode.left = currentNode.left !== null ? currentNode.left : currentNode.right;
        } else if (parentNode.right === currentNode) {
          parentNode.right = currentNode.left !== null ? currentNode.left : currentNode.right;
        }
        break;
      }
    }
    return this;
  }

  getMinValue(): number {
    let currentNode: BST = this;
    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode.value;
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

const {BST} = program;

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

  root.insert(12);
  chai.expect(root.right.left.left).to.not.be.null;
  chai.expect(root.right.left.left!.value).to.deep.equal(12);

  root.remove(10);
  chai.expect(root.contains(10)).to.deep.equal(false);
  chai.expect(root.value).to.deep.equal(12);

  chai.expect(root.contains(15)).to.deep.equal(true);
});

```

