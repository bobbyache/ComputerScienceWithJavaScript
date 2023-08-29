# Min Heap Construction
<div class="html">
<p>Implement a <span>MinHeap</span> class that supports:</p>
<ul>
  <li>Building a Min Heap from an input array of integers.</li>
  <li>Inserting integers in the heap.</li>
  <li>Removing the heap's minimum / root value.</li>
  <li>Peeking at the heap's minimum / root value.</li>
  <li>
    Sifting integers up and down the heap, which is to be used when inserting
    and removing values.
  </li>
</ul>
<p>Note that the heap should be represented in the form of an array.</p>
<p>
  If you're unfamiliar with Min Heaps, we recommend watching the
  Conceptual Overview section of this question's video explanation before
  starting to code.
</p>
<h3>Sample Usage</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41]

<span class="CodeEditor-promptComment">// All operations below are performed sequentially.</span>
<span class="CodeEditor-promptParameter">MinHeap</span>(array): - <span class="CodeEditor-promptComment">// instantiate a MinHeap (calls the buildHeap method and populates the heap)</span>
<span class="CodeEditor-promptParameter">buildHeap</span>(array): - <span class="CodeEditor-promptComment">[-5, 2, 6, 7, 8, 8, 24, 391, 24, 56, 12, 24, 48, 41]</span>
<span class="CodeEditor-promptParameter">insert</span>(76): - <span class="CodeEditor-promptComment">[-5, 2, 6, 7, 8, 8, 24, 391, 24, 56, 12, 24, 48, 41, 76]</span>
<span class="CodeEditor-promptParameter">peek</span>(): -5
<span class="CodeEditor-promptParameter">remove</span>(): -5 <span class="CodeEditor-promptComment">[2, 7, 6, 24, 8, 8, 24, 391, 76, 56, 12, 24, 48, 41]</span>
<span class="CodeEditor-promptParameter">peek</span>(): 2
<span class="CodeEditor-promptParameter">remove</span>(): 2 <span class="CodeEditor-promptComment">[6, 7, 8, 24, 8, 24, 24, 391, 76, 56, 12, 41, 48]</span>
<span class="CodeEditor-promptParameter">peek</span>(): 6
<span class="CodeEditor-promptParameter">insert</span>(87): - <span class="CodeEditor-promptComment">[6, 7, 8, 24, 8, 24, 24, 391, 76, 56, 12, 41, 48, 87]</span>
</pre>
</div>

Hint 1
<p>
For the buildHeap(), remove(), and insert() methods of the Heap, you will need to use the siftDown() and siftUp() methods. These two methods should essentially allow you to take any node in the heap and move it either down or up in the heap until it's in its final, appropriate position. This can be done by comparing the node in question to its child nodes in the case of siftDown() or to its parent node in the case of siftUp().
</p>


Hint 2

<p>
In an array-based Heap, you can easily access a node's children nodes and parent node by using the nodes' indices. If a node is located at index i, then its children nodes are located at indices 2 * i + 1 and 2 * i + 2, and its parent node is located at index Math.floor((i - 1) / 2).
</p>


Hint 3

<p>
To implement the buildHeap() method, you can either sift every node in the input array down to its final, correct position, or you can sift every node in the input array up to its final, correct position. What are the runtime implications of both approaches? Which methods (siftDown() or siftUp()) will insert() and remove() utilize? What about peek()?
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

#include <algorithm>

bool isMinHeapPropertySatisfied(vector<int> array) {
  for (int currentIdx = 1; currentIdx < array.size(); currentIdx++) {
    int parentIdx = (currentIdx - 1) / 2;
    if (parentIdx < 0) {
      return true;
    }
    if (array[parentIdx] > array[currentIdx]) {
      return false;
    }
  }
  return true;
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      MinHeap minHeap({48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41});
      minHeap.insert(76);
      assert(isMinHeapPropertySatisfied(minHeap.heap));
      assert(minHeap.peek() == -5);
      assert(minHeap.remove() == -5);
      assert(isMinHeapPropertySatisfied(minHeap.heap));
      assert(minHeap.peek() == 2);
      assert(minHeap.remove() == 2);
      assert(isMinHeapPropertySatisfied(minHeap.heap));
      assert(minHeap.peek() == 6);
      minHeap.insert(87);
      assert(isMinHeapPropertySatisfied(minHeap.heap));
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <algorithm>
using namespace std;

class MinHeap {
public:
  vector<int> heap;

  MinHeap(vector<int> vector) { heap = buildHeap(vector); }

  // O(n) time | O(1) space
  vector<int> buildHeap(vector<int> &vector) {
    int firstParentIdx = (vector.size() - 2) / 2;
    for (int currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      siftDown(currentIdx, vector.size() - 1, vector);
    }
    return vector;
  }

  // O(log(n)) time | O(1) space
  void siftDown(int currentIdx, int endIdx, vector<int> &heap) {
    int childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      int childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      int idxToSwap;
      if (childTwoIdx != -1 && heap[childTwoIdx] < heap[childOneIdx]) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }
      if (heap[idxToSwap] < heap[currentIdx]) {
        swap(heap[currentIdx], heap[idxToSwap]);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  // O(log(n)) time | O(1) space
  void siftUp(int currentIdx) {
    int parentIdx = (currentIdx - 1) / 2;
    while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
      swap(heap[currentIdx], heap[parentIdx]);
      currentIdx = parentIdx;
      parentIdx = (currentIdx - 1) / 2;
    }
  }

  int peek() { return heap[0]; }

  int remove() {
    swap(heap[0], heap[heap.size() - 1]);
    int valueToRemove = heap.back();
    heap.pop_back();
    siftDown(0, heap.size() - 1, heap);
    return valueToRemove;
  }

  void insert(int value) {
    heap.push_back(value);
    siftUp(heap.size() - 1);
  }
};

```
### Unit Tests 1 (cpp)
```cpp
#include <algorithm>

bool isMinHeapPropertySatisfied(vector<int> array) {
  for (int currentIdx = 1; currentIdx < array.size(); currentIdx++) {
    int parentIdx = (currentIdx - 1) / 2;
    if (parentIdx < 0) {
      return true;
    }
    if (array[parentIdx] > array[currentIdx]) {
      return false;
    }
  }
  return true;
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      MinHeap minHeap({48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41});
      minHeap.insert(76);
      assert(isMinHeapPropertySatisfied(minHeap.heap));
      assert(minHeap.peek() == -5);
      assert(minHeap.remove() == -5);
      assert(isMinHeapPropertySatisfied(minHeap.heap));
      assert(minHeap.peek() == 2);
      assert(minHeap.remove() == 2);
      assert(isMinHeapPropertySatisfied(minHeap.heap));
      assert(minHeap.peek() == 6);
      minHeap.insert(87);
      assert(isMinHeapPropertySatisfied(minHeap.heap));
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
		Program.MinHeap minHeap = new Program.MinHeap(new List<int>(){
			48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41
		});
		minHeap.Insert(76);
		Utils.AssertTrue(isMinHeapPropertySatisfied(minHeap.heap));
		Utils.AssertTrue(minHeap.Peek() == -5);
		Utils.AssertTrue(minHeap.Remove() == -5);
		Utils.AssertTrue(isMinHeapPropertySatisfied(minHeap.heap));
		Utils.AssertTrue(minHeap.Peek() == 2);
		Utils.AssertTrue(minHeap.Remove() == 2);
		Utils.AssertTrue(isMinHeapPropertySatisfied(minHeap.heap));
		Utils.AssertTrue(minHeap.Peek() == 6);
		minHeap.Insert(87);
		Utils.AssertTrue(isMinHeapPropertySatisfied(minHeap.heap));
	}

	bool isMinHeapPropertySatisfied(List<int> array) {
		for (int currentIdx = 1; currentIdx < array.Count; currentIdx++) {
			int parentIdx = (currentIdx -1) / 2;
			if (parentIdx < 0) {
				return true;
			}
			if (array[parentIdx] > array[currentIdx]) {
				return false;
			}
		}

		return true;
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	public class MinHeap {
		public List<int> heap = new List<int>();

		public MinHeap(List<int> array) {
			heap = buildHeap(array);
		}

		// O(n) time | O(1) space
		public List<int> buildHeap(List<int> array) {
			int firstParentIdx = (array.Count - 2) / 2;
			for (int currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
				siftDown(currentIdx, array.Count - 1, array);
			}
			return array;
		}

		// O(log(n)) time | O(1) space
		public void siftDown(int currentIdx, int endIdx, List<int> heap) {
			int childOneIdx = currentIdx * 2 + 1;
			while (childOneIdx <= endIdx) {
				int childTwoIdx = currentIdx * 2 + 2 <=
				  endIdx ? currentIdx * 2 + 2 : -1;
				int idxToSwap;
				if (childTwoIdx != -1 && heap[childTwoIdx] < heap[childOneIdx]) {
					idxToSwap = childTwoIdx;
				} else {
					idxToSwap = childOneIdx;
				}
				if (heap[idxToSwap] < heap[currentIdx]) {
					swap(currentIdx, idxToSwap, heap);
					currentIdx = idxToSwap;
					childOneIdx = currentIdx * 2 + 1;
				} else {
					return;
				}
			}
		}

		// O(log(n)) time | O(1) space
		public void siftUp(int currentIdx, List<int> heap) {
			int parentIdx = (currentIdx - 1) / 2;
			while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
				swap(currentIdx, parentIdx, heap);
				currentIdx = parentIdx;
				parentIdx = (currentIdx - 1) / 2;
			}
		}

		public int Peek() {
			return heap[0];
		}

		public int Remove() {
			swap(0, heap.Count - 1, heap);
			int valueToRemove = heap[heap.Count - 1];
			heap.RemoveAt(heap.Count - 1);
			siftDown(0, heap.Count - 1, heap);
			return valueToRemove;
		}

		public void Insert(int value) {
			heap.Add(value);
			siftUp(heap.Count - 1, heap);
		}

		public void swap(int i, int j, List<int> heap) {
			int temp = heap[j];
			heap[j] =  heap[i];
			heap[i] =  temp;
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
		Program.MinHeap minHeap = new Program.MinHeap(new List<int>(){
			48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41
		});
		minHeap.Insert(76);
		Utils.AssertTrue(isMinHeapPropertySatisfied(minHeap.heap));
		Utils.AssertTrue(minHeap.Peek() == -5);
		Utils.AssertTrue(minHeap.Remove() == -5);
		Utils.AssertTrue(isMinHeapPropertySatisfied(minHeap.heap));
		Utils.AssertTrue(minHeap.Peek() == 2);
		Utils.AssertTrue(minHeap.Remove() == 2);
		Utils.AssertTrue(isMinHeapPropertySatisfied(minHeap.heap));
		Utils.AssertTrue(minHeap.Peek() == 6);
		minHeap.Insert(87);
		Utils.AssertTrue(isMinHeapPropertySatisfied(minHeap.heap));
	}

	bool isMinHeapPropertySatisfied(List<int> array) {
		for (int currentIdx = 1; currentIdx < array.Count; currentIdx++) {
			int parentIdx = (currentIdx -1) / 2;
			if (parentIdx < 0) {
				return true;
			}
			if (array[parentIdx] > array[currentIdx]) {
				return false;
			}
		}

		return true;
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

func isMinHeapPropertySatisfied(heap MinHeap) bool {
	for i := 1; i < len(heap); i++ {
		parentIdx := (i - 1) / 2
		if parentIdx < 0 {
			return true
		}

		if heap[parentIdx] > heap[i] {
			return false
		}
	}
	return true
}

func (s *TestSuite) TestCase1(t *TestCase) {
	var minHeap = NewMinHeap([]int{48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41})
	minHeap.Insert(76)
	require.Equal(t, true, isMinHeapPropertySatisfied(*minHeap))
	require.Equal(t, -5, minHeap.Peek())
	require.Equal(t, -5, minHeap.Remove())
	require.Equal(t, true, isMinHeapPropertySatisfied(*minHeap))
	require.Equal(t, 2, minHeap.Peek())
	require.Equal(t, 2, minHeap.Remove())
	require.Equal(t, true, isMinHeapPropertySatisfied(*minHeap))
	require.Equal(t, 6, minHeap.Peek())
	minHeap.Insert(87)
	require.Equal(t, true, isMinHeapPropertySatisfied(*minHeap))
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type MinHeap []int

func NewMinHeap(array []int) *MinHeap {
	heap := MinHeap(array)
	ptr := &heap
	ptr.BuildHeap(array)
	return ptr
}

// O(n) time | O(1) space
func (h *MinHeap) BuildHeap(array []int) {
	first := (len(array) - 2) / 2
	for currentIndex := first + 1; currentIndex >= 0; currentIndex-- {
		h.siftDown(currentIndex, len(array)-1)
	}
}

// O(log(n)) time | O(1) space
func (h *MinHeap) siftDown(currentIndex, endIndex int) {
	childOneIdx := currentIndex*2 + 1
	for childOneIdx <= endIndex {
		childTwoIdx := -1
		if currentIndex*2+2 <= endIndex {
			childTwoIdx = currentIndex*2 + 2
		}
		indexToSwap := childOneIdx
		if childTwoIdx > -1 && (*h)[childTwoIdx] < (*h)[childOneIdx] {
			indexToSwap = childTwoIdx
		}
		if (*h)[indexToSwap] < (*h)[currentIndex] {
			h.swap(currentIndex, indexToSwap)
			currentIndex = indexToSwap
			childOneIdx = currentIndex*2 + 1
		} else {
			return
		}
	}
}

// O(log(n)) time | O(1) space
func (h *MinHeap) siftUp() {
	currentIndex := h.length() - 1
	parentIndex := (currentIndex - 1) / 2
	for currentIndex > 0 {
		current, parent := (*h)[currentIndex], (*h)[parentIndex]
		if current < parent {
			h.swap(currentIndex, parentIndex)
			currentIndex = parentIndex
			parentIndex = (currentIndex - 1) / 2
		} else {
			return
		}
	}
}

// O(1) time | O(1) space
func (h MinHeap) Peek() int {
	if len(h) == 0 {
		return -1
	}
	return h[0]
}

// O(log(n)) time | O(1) space
func (h *MinHeap) Remove() int {
	l := h.length()
	h.swap(0, l-1)
	peeked := (*h)[l-1]
	*h = (*h)[0 : l-1]
	h.siftDown(0, l-2)
	return peeked
}

// O(log(n)) time | O(1) space
func (h *MinHeap) Insert(value int) {
	*h = append(*h, value)
	h.siftUp()
}

func (h MinHeap) swap(i, j int) {
	h[i], h[j] = h[j], h[i]
}

func (h MinHeap) length() int {
	return len(h)
}

```
### Unit Tests 1 (go)
```go
package main

import "github.com/stretchr/testify/require"

func isMinHeapPropertySatisfied(heap MinHeap) bool {
	for i := 1; i < len(heap); i++ {
		parentIdx := (i - 1) / 2
		if parentIdx < 0 {
			return true
		}

		if heap[parentIdx] > heap[i] {
			return false
		}
	}
	return true
}

func (s *TestSuite) TestCase1(t *TestCase) {
	var minHeap = NewMinHeap([]int{48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41})
	minHeap.Insert(76)
	require.Equal(t, true, isMinHeapPropertySatisfied(*minHeap))
	require.Equal(t, -5, minHeap.Peek())
	require.Equal(t, -5, minHeap.Remove())
	require.Equal(t, true, isMinHeapPropertySatisfied(*minHeap))
	require.Equal(t, 2, minHeap.Peek())
	require.Equal(t, 2, minHeap.Remove())
	require.Equal(t, true, isMinHeapPropertySatisfied(*minHeap))
	require.Equal(t, 6, minHeap.Peek())
	minHeap.Insert(87)
	require.Equal(t, true, isMinHeapPropertySatisfied(*minHeap))
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
    Program.MinHeap minHeap =
        new Program.MinHeap(
            new ArrayList<Integer>(
                Arrays.asList(48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41)));
    minHeap.insert(76);
    Utils.assertTrue(isMinHeapPropertySatisfied(minHeap.heap));
    Utils.assertTrue(minHeap.peek() == -5);
    Utils.assertTrue(minHeap.remove() == -5);
    Utils.assertTrue(isMinHeapPropertySatisfied(minHeap.heap));
    Utils.assertTrue(minHeap.peek() == 2);
    Utils.assertTrue(minHeap.remove() == 2);
    Utils.assertTrue(isMinHeapPropertySatisfied(minHeap.heap));
    Utils.assertTrue(minHeap.peek() == 6);
    minHeap.insert(87);
    Utils.assertTrue(isMinHeapPropertySatisfied(minHeap.heap));
  }

  boolean isMinHeapPropertySatisfied(List<Integer> array) {
    for (int currentIdx = 1; currentIdx < array.size(); currentIdx++) {
      int parentIdx = (currentIdx - 1) / 2;
      if (parentIdx < 0) {
        return true;
      }
      if (array.get(parentIdx) > array.get(currentIdx)) {
        return false;
      }
    }

    return true;
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  static class MinHeap {
    List<Integer> heap = new ArrayList<Integer>();

    public MinHeap(List<Integer> array) {
      heap = buildHeap(array);
    }

    // O(n) time | O(1) space
    public List<Integer> buildHeap(List<Integer> array) {
      int firstParentIdx = (array.size() - 2) / 2;
      for (int currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
        siftDown(currentIdx, array.size() - 1, array);
      }
      return array;
    }

    // O(log(n)) time | O(1) space
    public void siftDown(int currentIdx, int endIdx, List<Integer> heap) {
      int childOneIdx = currentIdx * 2 + 1;
      while (childOneIdx <= endIdx) {
        int childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
        int idxToSwap;
        if (childTwoIdx != -1 && heap.get(childTwoIdx) < heap.get(childOneIdx)) {
          idxToSwap = childTwoIdx;
        } else {
          idxToSwap = childOneIdx;
        }
        if (heap.get(idxToSwap) < heap.get(currentIdx)) {
          swap(currentIdx, idxToSwap, heap);
          currentIdx = idxToSwap;
          childOneIdx = currentIdx * 2 + 1;
        } else {
          return;
        }
      }
    }

    // O(log(n)) time | O(1) space
    public void siftUp(int currentIdx, List<Integer> heap) {
      int parentIdx = (currentIdx - 1) / 2;
      while (currentIdx > 0 && heap.get(currentIdx) < heap.get(parentIdx)) {
        swap(currentIdx, parentIdx, heap);
        currentIdx = parentIdx;
        parentIdx = (currentIdx - 1) / 2;
      }
    }

    public int peek() {
      return heap.get(0);
    }

    public int remove() {
      swap(0, heap.size() - 1, heap);
      int valueToRemove = heap.get(heap.size() - 1);
      heap.remove(heap.size() - 1);
      siftDown(0, heap.size() - 1, heap);
      return valueToRemove;
    }

    public void insert(int value) {
      heap.add(value);
      siftUp(heap.size() - 1, heap);
    }

    public void swap(int i, int j, List<Integer> heap) {
      Integer temp = heap.get(j);
      heap.set(j, heap.get(i));
      heap.set(i, temp);
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
    Program.MinHeap minHeap =
        new Program.MinHeap(
            new ArrayList<Integer>(
                Arrays.asList(48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41)));
    minHeap.insert(76);
    Utils.assertTrue(isMinHeapPropertySatisfied(minHeap.heap));
    Utils.assertTrue(minHeap.peek() == -5);
    Utils.assertTrue(minHeap.remove() == -5);
    Utils.assertTrue(isMinHeapPropertySatisfied(minHeap.heap));
    Utils.assertTrue(minHeap.peek() == 2);
    Utils.assertTrue(minHeap.remove() == 2);
    Utils.assertTrue(isMinHeapPropertySatisfied(minHeap.heap));
    Utils.assertTrue(minHeap.peek() == 6);
    minHeap.insert(87);
    Utils.assertTrue(isMinHeapPropertySatisfied(minHeap.heap));
  }

  boolean isMinHeapPropertySatisfied(List<Integer> array) {
    for (int currentIdx = 1; currentIdx < array.size(); currentIdx++) {
      int parentIdx = (currentIdx - 1) / 2;
      if (parentIdx < 0) {
        return true;
      }
      if (array.get(parentIdx) > array.get(currentIdx)) {
        return false;
      }
    }

    return true;
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

const isMinHeapPropertySatisfied = array => {
  for (let currentIdx = 1; currentIdx < array.length; currentIdx++) {
    const parentIdx = Math.floor((currentIdx - 1) / 2);
    if (array[parentIdx] > array[currentIdx]) return false;
  }
  return true;
};

it('Test Case #1', function () {
  const minHeap = new program.MinHeap([48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41]);
  minHeap.insert(76);
  chai.expect(isMinHeapPropertySatisfied(minHeap.heap)).to.deep.equal(true);
  chai.expect(minHeap.peek()).to.deep.equal(-5);
  chai.expect(minHeap.remove()).to.deep.equal(-5);
  chai.expect(isMinHeapPropertySatisfied(minHeap.heap)).to.deep.equal(true);
  chai.expect(minHeap.peek()).to.deep.equal(2);
  chai.expect(minHeap.remove()).to.deep.equal(2);
  chai.expect(isMinHeapPropertySatisfied(minHeap.heap)).to.deep.equal(true);
  chai.expect(minHeap.peek()).to.deep.equal(6);
  minHeap.insert(87);
  chai.expect(isMinHeapPropertySatisfied(minHeap.heap)).to.deep.equal(true);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class MinHeap {
  constructor(array) {
    this.heap = this.buildHeap(array);
  }

  // O(n) time | O(1) space
  buildHeap(array) {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array.length - 1, array);
    }
    return array;
  }

  // O(log(n)) time | O(1) space
  siftDown(currentIdx, endIdx, heap) {
    let childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let idxToSwap;
      if (childTwoIdx !== -1 && heap[childTwoIdx] < heap[childOneIdx]) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }
      if (heap[idxToSwap] < heap[currentIdx]) {
        this.swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  // O(log(n)) time | O(1) space
  siftUp(currentIdx, heap) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  // O(1) time | O(1) space
  peek() {
    return this.heap[0];
  }

  // O(log(n)) time | O(1) space
  remove() {
    this.swap(0, this.heap.length - 1, this.heap);
    const valueToRemove = this.heap.pop();
    this.siftDown(0, this.heap.length - 1, this.heap);
    return valueToRemove;
  }

  // O(log(n)) time | O(1) space
  insert(value) {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1, this.heap);
  }

  swap(i, j, heap) {
    const temp = heap[j];
    heap[j] = heap[i];
    heap[i] = temp;
  }
}

// Do not edit the line below.
exports.MinHeap = MinHeap;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

const isMinHeapPropertySatisfied = array => {
  for (let currentIdx = 1; currentIdx < array.length; currentIdx++) {
    const parentIdx = Math.floor((currentIdx - 1) / 2);
    if (array[parentIdx] > array[currentIdx]) return false;
  }
  return true;
};

it('Test Case #1', function () {
  const minHeap = new program.MinHeap([48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41]);
  minHeap.insert(76);
  chai.expect(isMinHeapPropertySatisfied(minHeap.heap)).to.deep.equal(true);
  chai.expect(minHeap.peek()).to.deep.equal(-5);
  chai.expect(minHeap.remove()).to.deep.equal(-5);
  chai.expect(isMinHeapPropertySatisfied(minHeap.heap)).to.deep.equal(true);
  chai.expect(minHeap.peek()).to.deep.equal(2);
  chai.expect(minHeap.remove()).to.deep.equal(2);
  chai.expect(isMinHeapPropertySatisfied(minHeap.heap)).to.deep.equal(true);
  chai.expect(minHeap.peek()).to.deep.equal(6);
  minHeap.insert(87);
  chai.expect(isMinHeapPropertySatisfied(minHeap.heap)).to.deep.equal(true);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.MinHeap as MinHeap

fun isMinHeapPropertySatisfied(array: MutableList<Int>): Boolean {
    for (currentIdx in 1 until array.size) {
        val parentIdx = (currentIdx - 1) / 2
        if (array[parentIdx] > array[currentIdx]) return false
    }
    return true
}

class ProgramTest {
    @Test
    fun TestCase1() {
        val minHeap = MinHeap(mutableListOf(48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41))
        minHeap.insert(76)
        assert(isMinHeapPropertySatisfied(minHeap.heap))
        assert(minHeap.peek() == -5)
        assert(minHeap.remove() == -5)
        assert(isMinHeapPropertySatisfied(minHeap.heap))
        assert(minHeap.peek() == 2)
        assert(minHeap.remove() == 2)
        assert(isMinHeapPropertySatisfied(minHeap.heap))
        assert(minHeap.peek() == 6)
        minHeap.insert(87)
        assert(isMinHeapPropertySatisfied(minHeap.heap))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

open class MinHeap(array: MutableList<Int>) {
    val heap = this.buildHeap(array)

    // O(n) time | O(1) space
    fun buildHeap(array: MutableList<Int>): MutableList<Int> {
        val firstParentIdx = (array.size - 2) / 2
        for (currentIdx in firstParentIdx downTo 0) {
            this.siftDown(currentIdx, array.size - 1, array)
        }
        return array
    }

    // O(log(n)) time | O(1) space
    fun siftDown(currentIdx: Int, endIdx: Int, heap: MutableList<Int>) {
        var newCurrentIdx = currentIdx
        var childOneIdx = currentIdx * 2 + 1
        while (childOneIdx <= endIdx) {
            var childTwoIdx = if (newCurrentIdx * 2 + 2 <= endIdx) newCurrentIdx * 2 + 2 else -1
            var idxToSwap: Int
            if (childTwoIdx != -1 && heap[childTwoIdx] < heap[childOneIdx]) {
                idxToSwap = childTwoIdx
            } else {
                idxToSwap = childOneIdx
            }
            if (heap[idxToSwap] < heap[newCurrentIdx]) {
                this.swap(newCurrentIdx, idxToSwap, heap)
                newCurrentIdx = idxToSwap
                childOneIdx = newCurrentIdx * 2 + 1
            } else {
                return
            }
        }
    }

    // O(log(n)) time | O(1) space
    fun siftUp(currentIdx: Int, heap: MutableList<Int>) {
        var newCurrentIdx = currentIdx
        var parentIdx = (currentIdx - 1) / 2
        while (newCurrentIdx > 0 && heap[newCurrentIdx] < heap[parentIdx]) {
            this.swap(newCurrentIdx, parentIdx, heap)
            newCurrentIdx = parentIdx
            parentIdx = (newCurrentIdx - 1) / 2
        }
    }

    // O(1) time | O(1) space
    fun peek(): Int? {
        return this.heap[0]
    }

    // O(log(n)) time | O(1) space
    fun remove(): Int? {
        this.swap(0, this.heap.size - 1, this.heap)
        val valueToRemove = this.heap.removeAt(this.heap.size - 1)
        this.siftDown(0, this.heap.size - 1, this.heap)
        return valueToRemove
    }

    // O(log(n)) time | O(1) space
    fun insert(value: Int) {
        this.heap.add(value)
        this.siftUp(this.heap.size - 1, this.heap)
    }

    fun swap(i: Int, j: Int, heap: MutableList<Int>) {
        val temp = heap[j]
        heap[j] = heap[i]
        heap[i] = temp
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.MinHeap as MinHeap

fun isMinHeapPropertySatisfied(array: MutableList<Int>): Boolean {
    for (currentIdx in 1 until array.size) {
        val parentIdx = (currentIdx - 1) / 2
        if (array[parentIdx] > array[currentIdx]) return false
    }
    return true
}

class ProgramTest {
    @Test
    fun TestCase1() {
        val minHeap = MinHeap(mutableListOf(48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41))
        minHeap.insert(76)
        assert(isMinHeapPropertySatisfied(minHeap.heap))
        assert(minHeap.peek() == -5)
        assert(minHeap.remove() == -5)
        assert(isMinHeapPropertySatisfied(minHeap.heap))
        assert(minHeap.peek() == 2)
        assert(minHeap.remove() == 2)
        assert(isMinHeapPropertySatisfied(minHeap.heap))
        assert(minHeap.peek() == 6)
        minHeap.insert(87)
        assert(isMinHeapPropertySatisfied(minHeap.heap))
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
      let minHeap = Program.MinHeap(array: [48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41])
      minHeap.insert(value: 76)
      try assert(isMinHeapPropertySatisfied(array: minHeap.heap))
      try assertEqual(minHeap.peek(), -5)
      try assertEqual(minHeap.remove(), -5)
      try assert(isMinHeapPropertySatisfied(array: minHeap.heap))
      try assertEqual(minHeap.peek(), 2)
      try assertEqual(minHeap.remove(), 2)
      try assert(isMinHeapPropertySatisfied(array: minHeap.heap))
      try assertEqual(minHeap.peek(), 6)
      minHeap.insert(value: 87)
      try assert(isMinHeapPropertySatisfied(array: minHeap.heap))
    }
  }

  func isMinHeapPropertySatisfied(array: [Int]) -> Bool {
    for currentIndex in 0 ..< array.count - 1 {
      var parentIndex = Double((currentIndex - 1) / 2)
      parentIndex = parentIndex.rounded(.down)

      if parentIndex < 0 {
        break
      }

      if array[Int(parentIndex)] > array[currentIndex] {
        return false
      }
    }
    return true
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  class MinHeap {
    var heap = [Int]()

    init(array: [Int]) {
      heap = array
      buildHeap(array: array)
    }

    // O(n) time | O(1) space
    func buildHeap(array: [Int]) {
      var firstParentIndex = Double((array.count - 2) / 2)
      firstParentIndex = firstParentIndex.rounded(.down)

      for var currentIndex in (0 ... Int(firstParentIndex)).reversed() {
        var endIndex = array.count - 1
        siftDown(currentIndex: currentIndex, endIndex: endIndex)
      }
    }

    // O(log(n)) time | O(1) space
    func siftDown(currentIndex: Int, endIndex: Int) {
      var childOneIdx = currentIndex * 2 + 1
      var current = currentIndex
      while childOneIdx <= endIndex {
        var childTwoIdx = -1
        if current * 2 + 2 <= endIndex {
          childTwoIdx = current * 2 + 2
        }
        var indexToSwap = childOneIdx
        if childTwoIdx > -1, heap[childTwoIdx] < heap[childOneIdx] {
          indexToSwap = childTwoIdx
        }

        if heap[indexToSwap] < heap[current] {
          swap(firstIndex: current, secondIndex: indexToSwap)
          current = indexToSwap
          childOneIdx = current * 2 + 1
        } else {
          return
        }
      }
    }

    // O(log(n)) time | O(1) space
    func siftUp() {
      var currentIndex = heap.count - 1
      var parentIndex = (currentIndex - 1) / 2

      while currentIndex > 0 {
        var current = heap[currentIndex]
        var parent = heap[Int(parentIndex)]
        if current < parent {
          swap(firstIndex: currentIndex, secondIndex: parentIndex)
          currentIndex = parentIndex
          parentIndex = (currentIndex - 1) / 2
        } else {
          return
        }
      }
    }

    // O(1) time | O(1) space
    func peek() -> Int {
      return heap[0]
    }

    // O(log(n)) time | O(1) space
    func remove() -> Int {
      var l = heap.count
      swap(firstIndex: 0, secondIndex: l - 1)
      var peeked = heap[l - 1]
      heap.removeLast()
      siftDown(currentIndex: 0, endIndex: l - 2)
      return peeked
    }

    // O(log(n)) time | O(1) space
    func insert(value: Int) {
      heap.append(value)
      siftUp()
    }

    // Generic swap function
    func swap(firstIndex: Int, secondIndex: Int) {
      let temp = heap[firstIndex]
      heap[firstIndex] = heap[secondIndex]
      heap[secondIndex] = temp
    }

    func length() -> Int {
      return heap.count
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
      let minHeap = Program.MinHeap(array: [48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41])
      minHeap.insert(value: 76)
      try assert(isMinHeapPropertySatisfied(array: minHeap.heap))
      try assertEqual(minHeap.peek(), -5)
      try assertEqual(minHeap.remove(), -5)
      try assert(isMinHeapPropertySatisfied(array: minHeap.heap))
      try assertEqual(minHeap.peek(), 2)
      try assertEqual(minHeap.remove(), 2)
      try assert(isMinHeapPropertySatisfied(array: minHeap.heap))
      try assertEqual(minHeap.peek(), 6)
      minHeap.insert(value: 87)
      try assert(isMinHeapPropertySatisfied(array: minHeap.heap))
    }
  }

  func isMinHeapPropertySatisfied(array: [Int]) -> Bool {
    for currentIndex in 0 ..< array.count - 1 {
      var parentIndex = Double((currentIndex - 1) / 2)
      parentIndex = parentIndex.rounded(.down)

      if parentIndex < 0 {
        break
      }

      if array[Int(parentIndex)] > array[currentIndex] {
        return false
      }
    }
    return true
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


def isMinHeapPropertySatisfied(array):
    for currentIdx in range(1, len(array)):
        parentIdx = (currentIdx - 1) // 2
        if array[parentIdx] > array[currentIdx]:
            return False
    return True


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        minHeap = program.MinHeap([48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41])
        minHeap.insert(76)
        self.assertTrue(isMinHeapPropertySatisfied(minHeap.heap))
        self.assertEqual(minHeap.peek(), -5)
        self.assertEqual(minHeap.remove(), -5)
        self.assertTrue(isMinHeapPropertySatisfied(minHeap.heap))
        self.assertEqual(minHeap.peek(), 2)
        self.assertEqual(minHeap.remove(), 2)
        self.assertTrue(isMinHeapPropertySatisfied(minHeap.heap))
        self.assertEqual(minHeap.peek(), 6)
        minHeap.insert(87)
        self.assertTrue(isMinHeapPropertySatisfied(minHeap.heap))

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class MinHeap:
    def __init__(self, array):
        self.heap = self.buildHeap(array)

    # O(n) time | O(1) space
    def buildHeap(self, array):
        firstParentIdx = (len(array) - 2) // 2
        for currentIdx in reversed(range(firstParentIdx + 1)):
            self.siftDown(currentIdx, len(array) - 1, array)
        return array

    # O(log(n)) time | O(1) space
    def siftDown(self, currentIdx, endIdx, heap):
        childOneIdx = currentIdx * 2 + 1
        while childOneIdx <= endIdx:
            childTwoIdx = currentIdx * 2 + 2 if currentIdx * 2 + 2 <= endIdx else -1
            if childTwoIdx != -1 and heap[childTwoIdx] < heap[childOneIdx]:
                idxToSwap = childTwoIdx
            else:
                idxToSwap = childOneIdx
            if heap[idxToSwap] < heap[currentIdx]:
                self.swap(currentIdx, idxToSwap, heap)
                currentIdx = idxToSwap
                childOneIdx = currentIdx * 2 + 1
            else:
                return

    # O(log(n)) time | O(1) space
    def siftUp(self, currentIdx, heap):
        parentIdx = (currentIdx - 1) // 2
        while currentIdx > 0 and heap[currentIdx] < heap[parentIdx]:
            self.swap(currentIdx, parentIdx, heap)
            currentIdx = parentIdx
            parentIdx = (currentIdx - 1) // 2

    # O(1) time | O(1) space
    def peek(self):
        return self.heap[0]

    # O(log(n)) time | O(1) space
    def remove(self):
        self.swap(0, len(self.heap) - 1, self.heap)
        valueToRemove = self.heap.pop()
        self.siftDown(0, len(self.heap) - 1, self.heap)
        return valueToRemove

    # O(log(n)) time | O(1) space
    def insert(self, value):
        self.heap.append(value)
        self.siftUp(len(self.heap) - 1, self.heap)

    def swap(self, i, j, heap):
        heap[i], heap[j] = heap[j], heap[i]

```
### Unit Tests 1 (python)
```python
import program
import unittest


def isMinHeapPropertySatisfied(array):
    for currentIdx in range(1, len(array)):
        parentIdx = (currentIdx - 1) // 2
        if array[parentIdx] > array[currentIdx]:
            return False
    return True


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        minHeap = program.MinHeap([48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41])
        minHeap.insert(76)
        self.assertTrue(isMinHeapPropertySatisfied(minHeap.heap))
        self.assertEqual(minHeap.peek(), -5)
        self.assertEqual(minHeap.remove(), -5)
        self.assertTrue(isMinHeapPropertySatisfied(minHeap.heap))
        self.assertEqual(minHeap.peek(), 2)
        self.assertEqual(minHeap.remove(), 2)
        self.assertTrue(isMinHeapPropertySatisfied(minHeap.heap))
        self.assertEqual(minHeap.peek(), 6)
        minHeap.insert(87)
        self.assertTrue(isMinHeapPropertySatisfied(minHeap.heap))

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

const isMinHeapPropertySatisfied = (array: number[]) => {
  for (let currentIdx = 1; currentIdx < array.length; currentIdx++) {
    const parentIdx = Math.floor((currentIdx - 1) / 2);
    if (array[parentIdx] > array[currentIdx]) return false;
  }
  return true;
};

it('Test Case #1', function () {
  const minHeap = new program.MinHeap([48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41]);
  minHeap.insert(76);
  chai.expect(isMinHeapPropertySatisfied(minHeap.heap)).to.deep.equal(true);
  chai.expect(minHeap.peek()).to.deep.equal(-5);
  chai.expect(minHeap.remove()).to.deep.equal(-5);
  chai.expect(isMinHeapPropertySatisfied(minHeap.heap)).to.deep.equal(true);
  chai.expect(minHeap.peek()).to.deep.equal(2);
  chai.expect(minHeap.remove()).to.deep.equal(2);
  chai.expect(isMinHeapPropertySatisfied(minHeap.heap)).to.deep.equal(true);
  chai.expect(minHeap.peek()).to.deep.equal(6);
  minHeap.insert(87);
  chai.expect(isMinHeapPropertySatisfied(minHeap.heap)).to.deep.equal(true);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

export class MinHeap {
  heap: number[];

  constructor(array: number[]) {
    this.heap = this.buildHeap(array);
  }

  // O(n) time | O(1) space
  buildHeap(array: number[]) {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array.length - 1, array);
    }
    return array;
  }

  // O(log(n)) time | O(1) space
  siftDown(currentIdx: number, endIdx: number, heap: number[]) {
    let childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let idxToSwap;
      if (childTwoIdx !== -1 && heap[childTwoIdx] < heap[childOneIdx]) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }
      if (heap[idxToSwap] < heap[currentIdx]) {
        this.swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  // O(log(n)) time | O(1) space
  siftUp(currentIdx: number, heap: number[]) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  // O(1) time | O(1) space
  peek() {
    return this.heap[0];
  }

  // O(log(n)) time | O(1) space
  remove() {
    this.swap(0, this.heap.length - 1, this.heap);
    const valueToRemove = this.heap.pop();
    this.siftDown(0, this.heap.length - 1, this.heap);
    return valueToRemove;
  }

  // O(log(n)) time | O(1) space
  insert(value: number) {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1, this.heap);
  }

  swap(i: number, j: number, heap: number[]) {
    const temp = heap[j];
    heap[j] = heap[i];
    heap[i] = temp;
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

const isMinHeapPropertySatisfied = (array: number[]) => {
  for (let currentIdx = 1; currentIdx < array.length; currentIdx++) {
    const parentIdx = Math.floor((currentIdx - 1) / 2);
    if (array[parentIdx] > array[currentIdx]) return false;
  }
  return true;
};

it('Test Case #1', function () {
  const minHeap = new program.MinHeap([48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41]);
  minHeap.insert(76);
  chai.expect(isMinHeapPropertySatisfied(minHeap.heap)).to.deep.equal(true);
  chai.expect(minHeap.peek()).to.deep.equal(-5);
  chai.expect(minHeap.remove()).to.deep.equal(-5);
  chai.expect(isMinHeapPropertySatisfied(minHeap.heap)).to.deep.equal(true);
  chai.expect(minHeap.peek()).to.deep.equal(2);
  chai.expect(minHeap.remove()).to.deep.equal(2);
  chai.expect(isMinHeapPropertySatisfied(minHeap.heap)).to.deep.equal(true);
  chai.expect(minHeap.peek()).to.deep.equal(6);
  minHeap.insert(87);
  chai.expect(isMinHeapPropertySatisfied(minHeap.heap)).to.deep.equal(true);
});

```

