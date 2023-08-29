# Right Smaller Than
<div class="html">
<p>
  Write a function that takes in an array of integers and returns an array of
  the same length, where each element in the output array corresponds to the
  number of integers in the input array that are to the right of the relevant
  index and that are strictly smaller than the integer at that index.
</p>
<p>
  In other words, the value at <span>output[i]</span> represents the number of
  integers that are to the right of <span>i</span> and that are strictly smaller
  than <span>input[i]</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [8, 5, 11, -1, 3, 4, 2]
</pre>
<h3>Sample Output</h3>
<pre>
[5, 4, 4, 0, 1, 1, 0]
<span class="CodeEditor-promptComment">// There are 5 integers smaller than 8 to the right of it.</span>
<span class="CodeEditor-promptComment">// There are 4 integers smaller than 5 to the right of it.</span>
<span class="CodeEditor-promptComment">// There are 4 integers smaller than 11 to the right of it.</span>
<span class="CodeEditor-promptComment">// Etc..</span>
</pre>
</div>

Hint 1
<p>
The naive solution to this problem involves a simple pair of nested for loops and runs in O(n^2) time, where n is the length of the input array. This problem doesn't seem like it can be solved in linear time, so what time complexity could we realistically achieve if we somehow optimized our algorithm?
</p>


Hint 2

<p>
The only better time complexity than the O(n^2) one of our naive solution that we could realistically achieve would be an O(nlog(n)) complexity. What data structure has log(n) operations, and how could it help for this problem?
</p>


Hint 3

<p>
A Binary Search Tree supports log(n) insertions and has the relevant property of every left-subtree-node having a smaller value than a given node's value; can we construct a BST from the input array in such a way that it leads us to the result array that we're looking for?
</p>


Hint 4

<p>
Construct a BST by inserting the input array's integers one by one, in reverse order (from right to left). At each insertion, once a new BST node is positioned in the BST, the number of nodes in its parent node's left subtree (plus the parent node itself, if its value is smaller than the inserted node's value) is the number of "right-smaller-than" elements for the element being inserted.
</p>


Hint 5

<p>
Going off of Hint #4, you can construct a special type of BST that stores the size of every node's left subtree. This value can then be used to obtain the right-smaller-than numbers for every element in the array.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

#include "program.cpp"

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> array = {8, 5, 11, -1, 3, 4, 2};
      vector<int> expected{5, 4, 4, 0, 1, 1, 0};
      auto actual = rightSmallerThan(array);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// O(n^2) time | O(n) space - where n is the length of the array
vector<int> rightSmallerThan(vector<int> array) {
  vector<int> rightSmallerCounts = {};
  for (int i = 0; i < array.size(); i++) {
    int rightSmallerCount = 0;
    for (int j = i + 1; j < array.size(); j++) {
      if (array[j] < array[i])
        rightSmallerCount++;
    }
    rightSmallerCounts.push_back(rightSmallerCount);
  }
  return rightSmallerCounts;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

class SpecialBST {
public:
  int value;
  int idx;
  int numSmallerAtInsertTime;
  int leftSubtreeSize;
  SpecialBST *left;
  SpecialBST *right;

  SpecialBST(int value, int idx, int numSmallerAtInsertTime) {
    this->value = value;
    this->idx = idx;
    this->numSmallerAtInsertTime = numSmallerAtInsertTime;
    leftSubtreeSize = 0;
    left = nullptr;
    right = nullptr;
  }

  void insert(int value, int idx, int numSmallerAtInsertTime = 0) {
    if (value < this->value) {
      leftSubtreeSize++;
      if (left == nullptr) {
        left = new SpecialBST(value, idx, numSmallerAtInsertTime);
      } else {
        left->insert(value, idx, numSmallerAtInsertTime);
      }
    } else {
      numSmallerAtInsertTime += leftSubtreeSize;
      if (value > this->value)
        numSmallerAtInsertTime++;
      if (right == nullptr) {
        right = new SpecialBST(value, idx, numSmallerAtInsertTime);
      } else {
        right->insert(value, idx, numSmallerAtInsertTime);
      }
    }
  }
};

void getRightSmallerCounts(SpecialBST *bst, vector<int> &rightSmallerCounts);

// Average case: when the created BST is balanced
// O(nlog(n)) time | O(n) space - where n is the length of the array
// ---
// Worst case: when the created BST is like a linked list
// O(n^2) time | O(n) space
vector<int> rightSmallerThan(vector<int> array) {
  if (array.size() == 0)
    return {};

  int lastIdx = array.size() - 1;
  SpecialBST *bst = new SpecialBST(array[lastIdx], lastIdx, 0);
  for (int i = array.size() - 2; i >= 0; i--) {
    bst->insert(array[i], i);
  }

  vector<int> rightSmallerCounts = array;
  getRightSmallerCounts(bst, rightSmallerCounts);
  return rightSmallerCounts;
}

void getRightSmallerCounts(SpecialBST *bst, vector<int> &rightSmallerCounts) {
  if (bst == nullptr)
    return;
  rightSmallerCounts[bst->idx] = bst->numSmallerAtInsertTime;
  getRightSmallerCounts(bst->left, rightSmallerCounts);
  getRightSmallerCounts(bst->right, rightSmallerCounts);
}

```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

class SpecialBST {
public:
  int value;
  int leftSubtreeSize;
  SpecialBST *left;
  SpecialBST *right;

  SpecialBST(int value) {
    this->value = value;
    leftSubtreeSize = 0;
    left = nullptr;
    right = nullptr;
  }

  void insert(int value, int idx, vector<int> &rightSmallerCounts,
              int numSmallerAtInsertTime = 0) {
    if (value < this->value) {
      leftSubtreeSize++;
      if (left == nullptr) {
        left = new SpecialBST(value);
        rightSmallerCounts[idx] = numSmallerAtInsertTime;
      } else {
        left->insert(value, idx, rightSmallerCounts, numSmallerAtInsertTime);
      }
    } else {
      numSmallerAtInsertTime += leftSubtreeSize;
      if (value > this->value)
        numSmallerAtInsertTime++;
      if (right == nullptr) {
        right = new SpecialBST(value);
        rightSmallerCounts[idx] = numSmallerAtInsertTime;
      } else {
        right->insert(value, idx, rightSmallerCounts, numSmallerAtInsertTime);
      }
    }
  }
};

// Average case: when the created BST is balanced
// O(nlog(n)) time | O(n) space - where n is the length of the array
// ---
// Worst case: when the created BST is like a linked list
// O(n^2) time | O(n) space
vector<int> rightSmallerThan(vector<int> array) {
  if (array.size() == 0)
    return {};

  vector<int> rightSmallerCounts = array;
  int lastIdx = array.size() - 1;
  SpecialBST *bst = new SpecialBST(array[lastIdx]);
  rightSmallerCounts[lastIdx] = 0;
  for (int i = array.size() - 2; i >= 0; i--) {
    bst->insert(array[i], i, rightSmallerCounts);
  }

  return rightSmallerCounts;
}

```
### Unit Tests 1 (cpp)
```cpp
#include "program.cpp"

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> array = {8, 5, 11, -1, 3, 4, 2};
      vector<int> expected{5, 4, 4, 0, 1, 1, 0};
      auto actual = rightSmallerThan(array);
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
using System.Linq;
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		List<int> array = new List<int> {
			8, 5, 11, -1, 3, 4, 2
		};
		List<int> expected = new List<int> {
			5, 4, 4, 0, 1, 1, 0
		};
		var actual = Program.RightSmallerThan(array);
		Utils.AssertTrue(Enumerable.SequenceEqual(expected, actual));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n^2) time | O(n) space - where n is the length of the array
	public static List<int> RightSmallerThan(List<int> array) {
		List<int> rightSmallerCounts = new List<int>();
		for (int i = 0; i < array.Count; i++) {
			int rightSmallerCount = 0;
			for (int j = i + 1; j < array.Count; j++) {
				if (array[j] < array[i]) {
					rightSmallerCount++;
				}
			}
			rightSmallerCounts.Add(rightSmallerCount);
		}
		return rightSmallerCounts;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// Average case: when the created BST is balanced
	// O(nlog(n)) time | O(n) space - where n is the length of the array
	// ---
	// Worst case: when the created BST is like a linked list
	// O(n^2) time | O(n) space
	public static List<int> RightSmallerThan(List<int> array) {
		if (array.Count == 0) return new List<int>();

		int lastIdx = array.Count - 1;
		SpecialBST bst = new SpecialBST(array[lastIdx], lastIdx, 0);
		for (int i = array.Count - 2; i >= 0; i--) {
			bst.insert(array[i], i);
		}

		List<int> rightSmallerCounts = new List<int>(array);
		getRightSmallerCounts(bst, rightSmallerCounts);
		return rightSmallerCounts;
	}

	public static void getRightSmallerCounts(SpecialBST bst, List<int> rightSmallerCounts) {
		if (bst == null) return;
		rightSmallerCounts[bst.idx] =  bst.numSmallerAtInsertTime;
		getRightSmallerCounts(bst.left, rightSmallerCounts);
		getRightSmallerCounts(bst.right, rightSmallerCounts);
	}

	public class SpecialBST {
		public int value;
		public int idx;
		public int numSmallerAtInsertTime;
		public int leftSubtreeSize;
		public SpecialBST left;
		public SpecialBST right;

		public SpecialBST(int value, int idx, int numSmallerAtInsertTime) {
			this.value = value;
			this.idx = idx;
			this.numSmallerAtInsertTime = numSmallerAtInsertTime;
			leftSubtreeSize = 0;
			left = null;
			right = null;
		}

		public void insert(int value, int idx) {
			insertHelper(value, idx, 0);
		}

		public void insertHelper(int value, int idx, int numSmallerAtInsertTime) {
			if (value < this.value) {
				leftSubtreeSize++;
				if (left == null) {
					left = new SpecialBST(value, idx, numSmallerAtInsertTime);
				} else {
					left.insertHelper(value, idx, numSmallerAtInsertTime);
				}
			} else {
				numSmallerAtInsertTime += leftSubtreeSize;
				if (value > this.value)
					numSmallerAtInsertTime++;
				if (right == null) {
					right = new SpecialBST(value, idx, numSmallerAtInsertTime);
				} else {
					right.insertHelper(value, idx, numSmallerAtInsertTime);
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
	// Average case: when the created BST is balanced
	// O(nlog(n)) time | O(n) space - where n is the length of the array
	// ---
	// Worst case: when the created BST is like a linked list
	// O(n^2) time | O(n) space
	public static List<int> RightSmallerThan(List<int> array) {
		if (array.Count == 0) return new List<int>();

		List<int> rightSmallerCounts = new List<int>(array);
		int lastIdx = array.Count - 1;
		SpecialBST bst = new SpecialBST(array[lastIdx]);
		rightSmallerCounts[lastIdx] =  0;
		for (int i = array.Count - 2; i >= 0; i--) {
			bst.insert(array[i], i, rightSmallerCounts);
		}
		return rightSmallerCounts;
	}

	public class SpecialBST {
		public int value;
		public int leftSubtreeSize;
		public SpecialBST left;
		public SpecialBST right;

		public SpecialBST(int value) {
			this.value = value;
			leftSubtreeSize = 0;
			left = null;
			right = null;
		}

		public void insert(int value, int idx, List<int> rightSmallerCounts) {
			insertHelper(value, idx, rightSmallerCounts, 0);
		}

		public void insertHelper(int value, int idx, List<int> rightSmallerCounts,
		  int numSmallerAtInsertTime) {
			if (value < this.value) {
				leftSubtreeSize++;
				if (left == null) {
					left = new SpecialBST(value);
					rightSmallerCounts[idx] =  numSmallerAtInsertTime;
				} else {
					left.insertHelper(value, idx, rightSmallerCounts,
					  numSmallerAtInsertTime);
				}
			} else {
				numSmallerAtInsertTime += leftSubtreeSize;
				if (value > this.value)
					numSmallerAtInsertTime++;
				if (right == null) {
					right = new SpecialBST(value);
					rightSmallerCounts[idx] =  numSmallerAtInsertTime;
				} else {
					right.insertHelper(value, idx, rightSmallerCounts,
					  numSmallerAtInsertTime);
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
		List<int> array = new List<int> {
			8, 5, 11, -1, 3, 4, 2
		};
		List<int> expected = new List<int> {
			5, 4, 4, 0, 1, 1, 0
		};
		var actual = Program.RightSmallerThan(array);
		Utils.AssertTrue(Enumerable.SequenceEqual(expected, actual));
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
	array := []int{8, 5, 11, -1, 3, 4, 2}
	expected := []int{5, 4, 4, 0, 1, 1, 0}
	actual := RightSmallerThan(array)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n^2) time | O(n) space - where n is the length of the array
func RightSmallerThan(array []int) []int {
	rightSmallerCounts := []int{}
	for i := 0; i < len(array); i++ {
		rightSmallerCount := 0
		for j := i + 1; j < len(array); j++ {
			if array[j] < array[i] {
				rightSmallerCount += 1
			}
		}
		rightSmallerCounts = append(rightSmallerCounts, rightSmallerCount)
	}
	return rightSmallerCounts
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// Average case: when the created BST is balanced
// O(nlog(n)) time | O(n) space - where n is the length of the array
// ---
// Worst case: when the created BST is like a linked list
// O(n^2) time | O(n) space
func RightSmallerThan(array []int) []int {
	if len(array) == 0 {
		return []int{}
	}

	lastIdx := len(array) - 1
	bst := NewSpecialBST(array[lastIdx], lastIdx, 0)
	for i := lastIdx - 1; i >= 0; i-- {
		bst.Insert(array[i], i)
	}

	rightSmallerCounts := make([]int, 0, len(array))
	for _, i := range array {
		rightSmallerCounts = append(rightSmallerCounts, i)
	}
	getRightSmallerCounts(bst, rightSmallerCounts)
	return rightSmallerCounts
}

func getRightSmallerCounts(bst *SpecialBST, rightSmallerCounts []int) {
	if bst == nil {
		return
	}
	rightSmallerCounts[bst.Idx] = bst.NumSmallerAtInsertTime
	getRightSmallerCounts(bst.Left, rightSmallerCounts)
	getRightSmallerCounts(bst.Right, rightSmallerCounts)
}

type SpecialBST struct {
	Value                  int
	Idx                    int
	NumSmallerAtInsertTime int
	LeftSubtreeSize        int

	Left  *SpecialBST
	Right *SpecialBST
}

func NewSpecialBST(value int, idx int, numSmallerAtInsertTime int) *SpecialBST {
	return &SpecialBST{
		Value:                  value,
		Idx:                    idx,
		NumSmallerAtInsertTime: numSmallerAtInsertTime,
		LeftSubtreeSize:        0,
		Left:                   nil,
		Right:                  nil,
	}
}

func (bst *SpecialBST) Insert(value, idx int) {
	bst.insert(value, idx, 0)
}

func (bst *SpecialBST) insert(value, idx, numSmallerAtInsertTime int) {
	if value < bst.Value {
		bst.LeftSubtreeSize += 1
		if bst.Left == nil {
			bst.Left = NewSpecialBST(value, idx, numSmallerAtInsertTime)
		} else {
			bst.Left.insert(value, idx, numSmallerAtInsertTime)
		}
		return
	}
	numSmallerAtInsertTime += bst.LeftSubtreeSize
	if value > bst.Value {
		numSmallerAtInsertTime += 1
	}

	if bst.Right == nil {
		bst.Right = NewSpecialBST(value, idx, numSmallerAtInsertTime)
	} else {
		bst.Right.insert(value, idx, numSmallerAtInsertTime)
	}
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// Average case: when the created BST is balanced
// O(nlog(n)) time | O(n) space - where n is the length of the array
// ---
// Worst case: when the created BST is like a linked list
// O(n^2) time | O(n) space
func RightSmallerThan(array []int) []int {
	if len(array) == 0 {
		return []int{}
	}

	rightSmallerCounts := make([]int, 0, len(array))
	for _, i := range array {
		rightSmallerCounts = append(rightSmallerCounts, i)
	}
	lastIdx := len(array) - 1
	bst := NewSpecialBST(array[lastIdx])
	rightSmallerCounts[lastIdx] = 0
	for i := lastIdx - 1; i >= 0; i-- {
		bst.Insert(array[i], i, rightSmallerCounts)
	}
	return rightSmallerCounts
}

type SpecialBST struct {
	Value           int
	LeftSubtreeSize int

	Left  *SpecialBST
	Right *SpecialBST
}

func NewSpecialBST(value int) *SpecialBST {
	return &SpecialBST{
		Value:           value,
		LeftSubtreeSize: 0,
		Left:            nil,
		Right:           nil,
	}
}

func (bst *SpecialBST) Insert(value, idx int, rightSmallerCounts []int) {
	bst.insert(value, idx, rightSmallerCounts, 0)
}

func (bst *SpecialBST) insert(value, idx int, rightSmallerCounts []int, numSmallerAtInsertTime int) {
	if value < bst.Value {
		bst.LeftSubtreeSize += 1
		if bst.Left == nil {
			bst.Left = NewSpecialBST(value)
			rightSmallerCounts[idx] = numSmallerAtInsertTime
		} else {
			bst.Left.insert(value, idx, rightSmallerCounts, numSmallerAtInsertTime)
		}
		return
	}

	numSmallerAtInsertTime += bst.LeftSubtreeSize
	if value > bst.Value {
		numSmallerAtInsertTime += 1
	}

	if bst.Right == nil {
		bst.Right = NewSpecialBST(value)
		rightSmallerCounts[idx] = numSmallerAtInsertTime
	} else {
		bst.Right.insert(value, idx, rightSmallerCounts, numSmallerAtInsertTime)
	}
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	array := []int{8, 5, 11, -1, 3, 4, 2}
	expected := []int{5, 4, 4, 0, 1, 1, 0}
	actual := RightSmallerThan(array)
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
    var array = Arrays.asList(8, 5, 11, -1, 3, 4, 2);
    var expected = Arrays.asList(5, 4, 4, 0, 1, 1, 0);
    var actual = Program.rightSmallerThan(array);
    Utils.assertTrue(expected.equals(actual));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n^2) time | O(n) space - where n is the length of the array
  public static List<Integer> rightSmallerThan(List<Integer> array) {
    List<Integer> rightSmallerCounts = new ArrayList<Integer>();
    for (int i = 0; i < array.size(); i++) {
      int rightSmallerCount = 0;
      for (int j = i + 1; j < array.size(); j++) {
        if (array.get(j) < array.get(i)) {
          rightSmallerCount++;
        }
      }
      rightSmallerCounts.add(rightSmallerCount);
    }
    return rightSmallerCounts;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // Average case: when the created BST is balanced
  // O(nlog(n)) time | O(n) space - where n is the length of the array
  // ---
  // Worst case: when the created BST is like a linked list
  // O(n^2) time | O(n) space
  public static List<Integer> rightSmallerThan(List<Integer> array) {
    if (array.size() == 0) return new ArrayList<Integer>();

    int lastIdx = array.size() - 1;
    SpecialBST bst = new SpecialBST(array.get(lastIdx), lastIdx, 0);
    for (int i = array.size() - 2; i >= 0; i--) {
      bst.insert(array.get(i), i);
    }

    List<Integer> rightSmallerCounts = new ArrayList<Integer>(array);
    getRightSmallerCounts(bst, rightSmallerCounts);
    return rightSmallerCounts;
  }

  public static void getRightSmallerCounts(SpecialBST bst, List<Integer> rightSmallerCounts) {
    if (bst == null) return;
    rightSmallerCounts.set(bst.idx, bst.numSmallerAtInsertTime);
    getRightSmallerCounts(bst.left, rightSmallerCounts);
    getRightSmallerCounts(bst.right, rightSmallerCounts);
  }

  static class SpecialBST {
    public int value;
    public int idx;
    public int numSmallerAtInsertTime;
    public int leftSubtreeSize;
    public SpecialBST left;
    public SpecialBST right;

    public SpecialBST(int value, int idx, int numSmallerAtInsertTime) {
      this.value = value;
      this.idx = idx;
      this.numSmallerAtInsertTime = numSmallerAtInsertTime;
      leftSubtreeSize = 0;
      left = null;
      right = null;
    }

    public void insert(int value, int idx) {
      insertHelper(value, idx, 0);
    }

    public void insertHelper(int value, int idx, int numSmallerAtInsertTime) {
      if (value < this.value) {
        leftSubtreeSize++;
        if (left == null) {
          left = new SpecialBST(value, idx, numSmallerAtInsertTime);
        } else {
          left.insertHelper(value, idx, numSmallerAtInsertTime);
        }
      } else {
        numSmallerAtInsertTime += leftSubtreeSize;
        if (value > this.value) numSmallerAtInsertTime++;
        if (right == null) {
          right = new SpecialBST(value, idx, numSmallerAtInsertTime);
        } else {
          right.insertHelper(value, idx, numSmallerAtInsertTime);
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
  // Average case: when the created BST is balanced
  // O(nlog(n)) time | O(n) space - where n is the length of the array
  // ---
  // Worst case: when the created BST is like a linked list
  // O(n^2) time | O(n) space
  public static List<Integer> rightSmallerThan(List<Integer> array) {
    if (array.size() == 0) return new ArrayList<Integer>();

    List<Integer> rightSmallerCounts = new ArrayList<Integer>(array);
    int lastIdx = array.size() - 1;
    SpecialBST bst = new SpecialBST(array.get(lastIdx));
    rightSmallerCounts.set(lastIdx, 0);
    for (int i = array.size() - 2; i >= 0; i--) {
      bst.insert(array.get(i), i, rightSmallerCounts);
    }
    return rightSmallerCounts;
  }

  static class SpecialBST {
    public int value;
    public int leftSubtreeSize;
    public SpecialBST left;
    public SpecialBST right;

    public SpecialBST(int value) {
      this.value = value;
      leftSubtreeSize = 0;
      left = null;
      right = null;
    }

    public void insert(int value, int idx, List<Integer> rightSmallerCounts) {
      insertHelper(value, idx, rightSmallerCounts, 0);
    }

    public void insertHelper(
        int value, int idx, List<Integer> rightSmallerCounts, int numSmallerAtInsertTime) {
      if (value < this.value) {
        leftSubtreeSize++;
        if (left == null) {
          left = new SpecialBST(value);
          rightSmallerCounts.set(idx, numSmallerAtInsertTime);
        } else {
          left.insertHelper(value, idx, rightSmallerCounts, numSmallerAtInsertTime);
        }
      } else {
        numSmallerAtInsertTime += leftSubtreeSize;
        if (value > this.value) numSmallerAtInsertTime++;
        if (right == null) {
          right = new SpecialBST(value);
          rightSmallerCounts.set(idx, numSmallerAtInsertTime);
        } else {
          right.insertHelper(value, idx, rightSmallerCounts, numSmallerAtInsertTime);
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
    var array = Arrays.asList(8, 5, 11, -1, 3, 4, 2);
    var expected = Arrays.asList(5, 4, 4, 0, 1, 1, 0);
    var actual = Program.rightSmallerThan(array);
    Utils.assertTrue(expected.equals(actual));
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
  const array = [8, 5, 11, -1, 3, 4, 2];
  const expected = [5, 4, 4, 0, 1, 1, 0];
  const actual = program.rightSmallerThan(array);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space - where n is the length of the array
function rightSmallerThan(array) {
  const rightSmallerCounts = [];
  for (let i = 0; i < array.length; i++) {
    let rightSmallerCount = 0;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[i]) rightSmallerCount++;
    }
    rightSmallerCounts.push(rightSmallerCount);
  }
  return rightSmallerCounts;
}

exports.rightSmallerThan = rightSmallerThan;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average case: when the created BST is balanced
// O(nlog(n)) time | O(n) space - where n is the length of the array
// ---
// Worst case: when the created BST is like a linked list
// O(n^2) time | O(n) space
function rightSmallerThan(array) {
  if (array.length === 0) return [];

  const lastIdx = array.length - 1;
  const bst = new SpecialBST(array[lastIdx], lastIdx, 0);
  for (let i = array.length - 2; i >= 0; i--) {
    bst.insert(array[i], i);
  }

  const rightSmallerCounts = array.slice();
  getRightSmallerCounts(bst, rightSmallerCounts);
  return rightSmallerCounts;
}

function getRightSmallerCounts(bst, rightSmallerCounts) {
  if (bst === null) return;
  rightSmallerCounts[bst.idx] = bst.numSmallerAtInsertTime;
  getRightSmallerCounts(bst.left, rightSmallerCounts);
  getRightSmallerCounts(bst.right, rightSmallerCounts);
}

class SpecialBST {
  constructor(value, idx, numSmallerAtInsertTime) {
    this.value = value;
    this.idx = idx;
    this.numSmallerAtInsertTime = numSmallerAtInsertTime;
    this.leftSubtreeSize = 0;
    this.left = null;
    this.right = null;
  }

  insert(value, idx, numSmallerAtInsertTime = 0) {
    if (value < this.value) {
      this.leftSubtreeSize++;
      if (this.left === null) {
        this.left = new SpecialBST(value, idx, numSmallerAtInsertTime);
      } else {
        this.left.insert(value, idx, numSmallerAtInsertTime);
      }
    } else {
      numSmallerAtInsertTime += this.leftSubtreeSize;
      if (value > this.value) numSmallerAtInsertTime++;
      if (this.right === null) {
        this.right = new SpecialBST(value, idx, numSmallerAtInsertTime);
      } else {
        this.right.insert(value, idx, numSmallerAtInsertTime);
      }
    }
  }
}

exports.rightSmallerThan = rightSmallerThan;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average case: when the created BST is balanced
// O(nlog(n)) time | O(n) space - where n is the length of the array
// ---
// Worst case: when the created BST is like a linked list
// O(n^2) time | O(n) space
function rightSmallerThan(array) {
  if (array.length === 0) return [];

  const rightSmallerCounts = array.slice();
  const lastIdx = array.length - 1;
  const bst = new SpecialBST(array[lastIdx]);
  rightSmallerCounts[lastIdx] = 0;
  for (let i = array.length - 2; i >= 0; i--) {
    bst.insert(array[i], i, rightSmallerCounts);
  }

  return rightSmallerCounts;
}

class SpecialBST {
  constructor(value) {
    this.value = value;
    this.leftSubTreeSize = 0;
    this.left = null;
    this.right = null;
  }

  insert(value, idx, rightSmallerCounts, numSmallerAtInsertTime = 0) {
    if (value < this.value) {
      this.leftSubTreeSize++;
      if (this.left === null) {
        this.left = new SpecialBST(value);
        rightSmallerCounts[idx] = numSmallerAtInsertTime;
      } else {
        this.left.insert(value, idx, rightSmallerCounts, numSmallerAtInsertTime);
      }
    } else {
      numSmallerAtInsertTime += this.leftSubTreeSize;
      if (value > this.value) numSmallerAtInsertTime++;
      if (this.right === null) {
        this.right = new SpecialBST(value);
        rightSmallerCounts[idx] = numSmallerAtInsertTime;
      } else {
        this.right.insert(value, idx, rightSmallerCounts, numSmallerAtInsertTime);
      }
    }
  }
}

exports.rightSmallerThan = rightSmallerThan;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const array = [8, 5, 11, -1, 3, 4, 2];
  const expected = [5, 4, 4, 0, 1, 1, 0];
  const actual = program.rightSmallerThan(array);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.rightSmallerThan as rightSmallerThan

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = listOf(8, 5, 11, -1, 3, 4, 2)
        val expected = listOf(5, 4, 4, 0, 1, 1, 0)
        val actual = rightSmallerThan(array)
        assert(actual == expected)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^2) time | O(n) space - where n is the length of the array
fun rightSmallerThan(array: List<Int>): List<Int> {
    val rightSmallerCounts = mutableListOf<Int>()
    for (i in 0 until array.size) {
        var rightSmallerCount = 0
        for (j in i + 1 until array.size) {
            if (array[j] < array[i]) rightSmallerCount++
        }
        rightSmallerCounts.add(rightSmallerCount)
    }
    return rightSmallerCounts
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// Average case: when the created BST is balanced
// O(nlog(n)) time | O(n) space - where n is the size of the array
// ---
// Worst case: when the created BST is like a linked list
// O(n^2) time | O(n) space
fun rightSmallerThan(array: List<Int>): List<Int> {
    if (array.size == 0) return listOf()

    val lastIdx = array.size - 1
    val bst = SpecialBST(array[lastIdx], lastIdx, 0)
    for (i in array.size - 2 downTo 0) {
        bst.insert(array[i], i)
    }

    val rightSmallerCounts = array.toMutableList()
    getRightSmallerCounts(bst, rightSmallerCounts)
    return rightSmallerCounts
}

fun getRightSmallerCounts(bst: SpecialBST?, rightSmallerCounts: MutableList<Int>) {
    if (bst == null) return
    rightSmallerCounts[bst.idx] = bst.numSmallerAtInsertTime
    getRightSmallerCounts(bst.left, rightSmallerCounts)
    getRightSmallerCounts(bst.right, rightSmallerCounts)
}

open class SpecialBST(value: Int, idx: Int, numSmallerAtInsertTime: Int) {
    var value = value
    var idx = idx
    var numSmallerAtInsertTime = numSmallerAtInsertTime
    var leftSubtreeSize = 0
    var left: SpecialBST? = null
    var right: SpecialBST? = null

    fun insert(value: Int, idx: Int, numSmallerAtInsertTime: Int = 0) {
        if (value < this.value) {
            this.leftSubtreeSize++
            if (this.left == null) {
                this.left = SpecialBST(value, idx, numSmallerAtInsertTime)
            } else {
                this.left!!.insert(value, idx, numSmallerAtInsertTime)
            }
        } else {
            var newNumSmallerAtInsertTime = numSmallerAtInsertTime + this.leftSubtreeSize
            if (value > this.value) newNumSmallerAtInsertTime++
            if (this.right == null) {
                this.right = SpecialBST(value, idx, newNumSmallerAtInsertTime)
            } else {
                this.right!!.insert(value, idx, newNumSmallerAtInsertTime)
            }
        }
    }
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// Average case: when the created BST is balanced
// O(nlog(n)) time | O(n) space - where n is the size of the array
// ---
// Worst case: when the created BST is like a linked list
// O(n^2) time | O(n) space
fun rightSmallerThan(array: List<Int>): List<Int> {
    if (array.size == 0) return listOf()

    val rightSmallerCounts = array.toMutableList()
    val lastIdx = array.size - 1
    val bst = SpecialBST(array[lastIdx])
    rightSmallerCounts[lastIdx] = 0
    for (i in array.size - 2 downTo 0) {
        bst.insert(array[i], i, rightSmallerCounts)
    }

    return rightSmallerCounts
}

open class SpecialBST(value: Int) {
    var value = value
    var leftSubtreeSize = 0
    var left: SpecialBST? = null
    var right: SpecialBST? = null

    fun insert(value: Int, idx: Int, rightSmallerCounts: MutableList<Int>, numSmallerAtInsertTime: Int = 0) {
        if (value < this.value) {
            this.leftSubtreeSize++
            if (this.left == null) {
                this.left = SpecialBST(value)
                rightSmallerCounts[idx] = numSmallerAtInsertTime
            } else {
                this.left!!.insert(value, idx, rightSmallerCounts, numSmallerAtInsertTime)
            }
        } else {
            var newNumSmallerAtInsertTime = numSmallerAtInsertTime + this.leftSubtreeSize
            if (value > this.value) newNumSmallerAtInsertTime++
            if (this.right == null) {
                this.right = SpecialBST(value)
                rightSmallerCounts[idx] = newNumSmallerAtInsertTime
            } else {
                this.right!!.insert(value, idx, rightSmallerCounts, newNumSmallerAtInsertTime)
            }
        }
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.rightSmallerThan as rightSmallerThan

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = listOf(8, 5, 11, -1, 3, 4, 2)
        val expected = listOf(5, 4, 4, 0, 1, 1, 0)
        val actual = rightSmallerThan(array)
        assert(actual == expected)
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
      let array = [8, 5, 11, -1, 3, 4, 2]
      let expected = [5, 4, 4, 0, 1, 1, 0]
      let actual = Program.rightSmallerThan(array)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(n) space - where n is the length of the array
  static func rightSmallerThan(_ array: [Int]) -> [Int] {
    var rightSmallerCounts = [Int]()
    for i in 0 ..< array.count {
      var rightSmallerCount = 0
      for j in i + 1 ..< array.count {
        if array[j] < array[i] {
          rightSmallerCount += 1
        }
      }
      rightSmallerCounts.append(rightSmallerCount)
    }
    return rightSmallerCounts
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // Average case: when the created BST is balanced
  // O(nlog(n)) time | O(n) space - where n is the length of the array
  // ---
  // Worst case: when the created BST is like a linked list
  // O(n^2) time | O(n) space
  static func rightSmallerThan(_ array: [Int]) -> [Int] {
    if array.count == 0 {
      return [Int]()
    }

    let lastIdx = array.count - 1
    var bst = SpecialBST(array[lastIdx], lastIdx, 0)
    for i in (0 ..< lastIdx).reversed() {
      bst.insert(array[i], i)
    }

    var rightSmallerCounts = [Int]()
    for i in array {
      rightSmallerCounts.append(i)
    }
    getRightSmallerCounts(bst, &rightSmallerCounts)
    return rightSmallerCounts
  }

  static func getRightSmallerCounts(_ bst: SpecialBST?, _ rightSmallerCounts: inout [Int]) {
    if let tree = bst {
      rightSmallerCounts[tree.idx] = tree.numSmallerAtInsertTime
      getRightSmallerCounts(tree.left, &rightSmallerCounts)
      getRightSmallerCounts(tree.right, &rightSmallerCounts)
    }
  }

  class SpecialBST {
    var value: Int
    var idx: Int
    var numSmallerAtInsertTime: Int

    var leftSubtreeSize: Int = 0
    var left: SpecialBST?
    var right: SpecialBST?

    init(_ value: Int, _ idx: Int, _ numSmallerAtInsertTime: Int) {
      self.value = value
      self.idx = idx
      self.numSmallerAtInsertTime = numSmallerAtInsertTime
    }

    func insert(_ value: Int, _ idx: Int, _ numSmallerAtInsertTime: Int = 0) {
      if value < self.value {
        leftSubtreeSize += 1
        if let left = self.left {
          left.insert(value, idx, numSmallerAtInsertTime)
        } else {
          left = SpecialBST(value, idx, numSmallerAtInsertTime)
        }
        return
      }

      var numSmaller = numSmallerAtInsertTime + leftSubtreeSize
      if value > self.value {
        numSmaller += 1
      }

      if let right = self.right {
        right.insert(value, idx, numSmaller)
      } else {
        right = SpecialBST(value, idx, numSmaller)
      }
    }
  }
}

```
### Solution 3 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // Average case: when the created BST is balanced
  // O(nlog(n)) time | O(n) space - where n is the length of the array
  // ---
  // Worst case: when the created BST is like a linked list
  // O(n^2) time | O(n) space
  static func rightSmallerThan(_ array: [Int]) -> [Int] {
    if array.count == 0 {
      return [Int]()
    }

    var rightSmallerCounts = [Int]()
    for i in array {
      rightSmallerCounts.append(i)
    }
    let lastIdx = array.count - 1
    var bst = SpecialBST(array[lastIdx])
    rightSmallerCounts[lastIdx] = 0
    for i in (0 ..< lastIdx).reversed() {
      bst.insert(array[i], i, &rightSmallerCounts)
    }
    return rightSmallerCounts
  }

  class SpecialBST {
    var value: Int

    var leftSubtreeSize: Int = 0
    var left: SpecialBST?
    var right: SpecialBST?

    init(_ value: Int) {
      self.value = value
    }

    func insert(_ value: Int, _ idx: Int, _ rightSmallerCounts: inout [Int], _ numSmallerAtInsertTime: Int = 0) {
      if value < self.value {
        leftSubtreeSize += 1
        if let left = self.left {
          left.insert(value, idx, &rightSmallerCounts, numSmallerAtInsertTime)
        } else {
          left = SpecialBST(value)
          rightSmallerCounts[idx] = numSmallerAtInsertTime
        }
        return
      }

      var numSmaller = numSmallerAtInsertTime + leftSubtreeSize
      if value > self.value {
        numSmaller += 1
      }

      if let right = self.right {
        right.insert(value, idx, &rightSmallerCounts, numSmaller)
      } else {
        right = SpecialBST(value)
        rightSmallerCounts[idx] = numSmaller
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
      let array = [8, 5, 11, -1, 3, 4, 2]
      let expected = [5, 4, 4, 0, 1, 1, 0]
      let actual = Program.rightSmallerThan(array)
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
        array = [8, 5, 11, -1, 3, 4, 2]
        expected = [5, 4, 4, 0, 1, 1, 0]
        actual = program.rightSmallerThan(array)
        self.assertEqual(expected, actual)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n) space - where n is the length of the array
def rightSmallerThan(array):
    rightSmallerCounts = []
    for i in range(len(array)):
        rightSmallerCount = 0
        for j in range(i + 1, len(array)):
            if array[j] < array[i]:
                rightSmallerCount += 1
        rightSmallerCounts.append(rightSmallerCount)
    return rightSmallerCounts

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Average case: when the created BST is balanced
# O(nlog(n)) time | O(n) space - where n is the length of the array
# ---
# Worst case: when the created BST is like a linked list
# O(n^2) time | O(n) space
def rightSmallerThan(array):
    if len(array) == 0:
        return []

    lastIdx = len(array) - 1
    bst = SpecialBST(array[lastIdx], lastIdx, 0)
    for i in reversed(range(len(array) - 1)):
        bst.insert(array[i], i)

    rightSmallerCounts = array[:]
    getRightSmallerCounts(bst, rightSmallerCounts)
    return rightSmallerCounts


def getRightSmallerCounts(bst, rightSmallerCounts):
    if bst is None:
        return
    rightSmallerCounts[bst.idx] = bst.numSmallerAtInsertTime
    getRightSmallerCounts(bst.left, rightSmallerCounts)
    getRightSmallerCounts(bst.right, rightSmallerCounts)


class SpecialBST:
    def __init__(self, value, idx, numSmallerAtInsertTime):
        self.value = value
        self.idx = idx
        self.numSmallerAtInsertTime = numSmallerAtInsertTime
        self.leftSubtreeSize = 0
        self.left = None
        self.right = None

    def insert(self, value, idx, numSmallerAtInsertTime=0):
        if value < self.value:
            self.leftSubtreeSize += 1
            if self.left is None:
                self.left = SpecialBST(value, idx, numSmallerAtInsertTime)
            else:
                self.left.insert(value, idx, numSmallerAtInsertTime)
        else:
            numSmallerAtInsertTime += self.leftSubtreeSize
            if value > self.value:
                numSmallerAtInsertTime += 1
            if self.right is None:
                self.right = SpecialBST(value, idx, numSmallerAtInsertTime)
            else:
                self.right.insert(value, idx, numSmallerAtInsertTime)

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Average case: when the created BST is balanced
# O(nlog(n)) time | O(n) space - where n is the length of the array
# ---
# Worst case: when the created BST is like a linked list
# O(n^2) time | O(n) space
def rightSmallerThan(array):
    if len(array) == 0:
        return []

    rightSmallerCounts = array[:]
    lastIdx = len(array) - 1
    bst = SpecialBST(array[lastIdx])
    rightSmallerCounts[lastIdx] = 0
    for i in reversed(range(len(array) - 1)):
        bst.insert(array[i], i, rightSmallerCounts)

    return rightSmallerCounts


class SpecialBST:
    def __init__(self, value):
        self.value = value
        self.leftSubtreeSize = 0
        self.left = None
        self.right = None

    def insert(self, value, idx, rightSmallerCounts, numSmallerAtInsertTime=0):
        if value < self.value:
            self.leftSubtreeSize += 1
            if self.left is None:
                self.left = SpecialBST(value)
                rightSmallerCounts[idx] = numSmallerAtInsertTime
            else:
                self.left.insert(value, idx, rightSmallerCounts, numSmallerAtInsertTime)
        else:
            numSmallerAtInsertTime += self.leftSubtreeSize
            if value > self.value:
                numSmallerAtInsertTime += 1
            if self.right is None:
                self.right = SpecialBST(value)
                rightSmallerCounts[idx] = numSmallerAtInsertTime
            else:
                self.right.insert(value, idx, rightSmallerCounts, numSmallerAtInsertTime)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        array = [8, 5, 11, -1, 3, 4, 2]
        expected = [5, 4, 4, 0, 1, 1, 0]
        actual = program.rightSmallerThan(array)
        self.assertEqual(expected, actual)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const array = [8, 5, 11, -1, 3, 4, 2];
  const expected = [5, 4, 4, 0, 1, 1, 0];
  const actual = program.rightSmallerThan(array);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space - where n is the length of the array
export function rightSmallerThan(array: number[]) {
  const rightSmallerCounts: number[] = [];
  for (let i = 0; i < array.length; i++) {
    let rightSmallerCount = 0;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[i]) rightSmallerCount++;
    }
    rightSmallerCounts.push(rightSmallerCount);
  }
  return rightSmallerCounts;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average case: when the created BST is balanced
// O(nlog(n)) time | O(n) space - where n is the length of the array
// ---
// Worst case: when the created BST is like a linked list
// O(n^2) time | O(n) space
export function rightSmallerThan(array: number[]) {
  if (array.length === 0) return [];

  const lastIdx = array.length - 1;
  const bst = new SpecialBST(array[lastIdx], lastIdx, 0);
  for (let i = array.length - 2; i >= 0; i--) {
    bst.insert(array[i], i);
  }

  const rightSmallerCounts = array.slice();
  getRightSmallerCounts(bst, rightSmallerCounts);
  return rightSmallerCounts;
}

function getRightSmallerCounts(bst: SpecialBST | null, rightSmallerCounts: number[]) {
  if (bst === null) return;
  rightSmallerCounts[bst.idx] = bst.numSmallerAtInsertTime;
  getRightSmallerCounts(bst.left, rightSmallerCounts);
  getRightSmallerCounts(bst.right, rightSmallerCounts);
}

class SpecialBST {
  value: number;
  idx: number;
  numSmallerAtInsertTime: number;
  leftSubtreeSize: number;
  left: SpecialBST | null;
  right: SpecialBST | null;

  constructor(value: number, idx: number, numSmallerAtInsertTime: number) {
    this.value = value;
    this.idx = idx;
    this.numSmallerAtInsertTime = numSmallerAtInsertTime;
    this.leftSubtreeSize = 0;
    this.left = null;
    this.right = null;
  }

  insert(value: number, idx: number, numSmallerAtInsertTime = 0) {
    if (value < this.value) {
      this.leftSubtreeSize++;
      if (this.left === null) {
        this.left = new SpecialBST(value, idx, numSmallerAtInsertTime);
      } else {
        this.left.insert(value, idx, numSmallerAtInsertTime);
      }
    } else {
      numSmallerAtInsertTime += this.leftSubtreeSize;
      if (value > this.value) numSmallerAtInsertTime++;
      if (this.right === null) {
        this.right = new SpecialBST(value, idx, numSmallerAtInsertTime);
      } else {
        this.right.insert(value, idx, numSmallerAtInsertTime);
      }
    }
  }
}

```
### Solution 3 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average case: when the created BST is balanced
// O(nlog(n)) time | O(n) space - where n is the length of the array
// ---
// Worst case: when the created BST is like a linked list
// O(n^2) time | O(n) space
export function rightSmallerThan(array: number[]) {
  if (array.length === 0) return [];

  const rightSmallerCounts = array.slice();
  const lastIdx = array.length - 1;
  const bst = new SpecialBST(array[lastIdx]);
  rightSmallerCounts[lastIdx] = 0;
  for (let i = array.length - 2; i >= 0; i--) {
    bst.insert(array[i], i, rightSmallerCounts);
  }

  return rightSmallerCounts;
}

class SpecialBST {
  value: number;
  leftSubTreeSize: number;
  left: SpecialBST | null;
  right: SpecialBST | null;

  constructor(value: number) {
    this.value = value;
    this.leftSubTreeSize = 0;
    this.left = null;
    this.right = null;
  }

  insert(value: number, idx: number, rightSmallerCounts: number[], numSmallerAtInsertTime = 0) {
    if (value < this.value) {
      this.leftSubTreeSize++;
      if (this.left === null) {
        this.left = new SpecialBST(value);
        rightSmallerCounts[idx] = numSmallerAtInsertTime;
      } else {
        this.left.insert(value, idx, rightSmallerCounts, numSmallerAtInsertTime);
      }
    } else {
      numSmallerAtInsertTime += this.leftSubTreeSize;
      if (value > this.value) numSmallerAtInsertTime++;
      if (this.right === null) {
        this.right = new SpecialBST(value);
        rightSmallerCounts[idx] = numSmallerAtInsertTime;
      } else {
        this.right.insert(value, idx, rightSmallerCounts, numSmallerAtInsertTime);
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
  const array = [8, 5, 11, -1, 3, 4, 2];
  const expected = [5, 4, 4, 0, 1, 1, 0];
  const actual = program.rightSmallerThan(array);
  chai.expect(actual).to.deep.equal(expected);
});

```

