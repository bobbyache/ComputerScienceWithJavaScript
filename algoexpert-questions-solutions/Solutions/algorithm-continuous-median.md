# Continuous Median
<div class="html">
<p>Write a <span>ContinuousMedianHandler</span> class that supports:</p>
<ul>
  <li>
    The continuous insertion of numbers with the <span>insert</span> method.
  </li>
  <li>
    The instant (O(1) time) retrieval of the median of the numbers that have
    been inserted thus far with the <span>getMedian</span> method.
  </li>
</ul>
<p>
  The <span>getMedian</span> method has already been written for you. You simply
  have to write the <span>insert</span> method.
</p>
<p>
  The median of a set of numbers is the "middle" number when the numbers are
  ordered from smallest to greatest. If there's an odd number of numbers in the
  set, as in <span>{1, 3, 7}</span>, the median is the number in the middle
  (<span>3</span> in this case); if there's an even number of numbers in the
  set, as in <span>{1, 3, 7, 8}</span>, the median is the average of the two
  middle numbers (<span>(3 + 7) / 2 == 5</span> in this case).
</p>
<h3>Sample Usage</h3>
<pre>
<span class="CodeEditor-promptComment">// All operations below are performed sequentially.</span>
<span class="CodeEditor-promptParameter">ContinuousMedianHandler</span>(): - <span class="CodeEditor-promptComment">// instantiate a ContinuousMedianHandler</span>
<span class="CodeEditor-promptParameter">insert</span>(5): -
<span class="CodeEditor-promptParameter">insert</span>(10): -
<span class="CodeEditor-promptParameter">getMedian</span>(): 7.5
<span class="CodeEditor-promptParameter">insert</span>(100): -
<span class="CodeEditor-promptParameter">getMedian</span>(): 10
</pre>
</div>

Hint 1
<p>
The median of a set of numbers is often, by definition, one of the numbers in the set. Thus, you likely have to store all of the inserted numbers somewhere to be able to continuously compute their median.
</p>


Hint 2

<p>
The median of a set of numbers is either the middle number of that set (if the set has an odd amount of numbers) or the average of the middle numbers (if the set has an even amount of numbers). This means that if you could somehow keep track of the middle number(s) of the set of inserted numbers, you could easily compute the median by finding the indices of the middle numbers and doing some simple calculations. Perhaps storing all of the numbers in a sorted array could work, but what would be the runtime implication of inserting each new number into a sorted array?
</p>


Hint 3

<p>
Realizing that you only need to keep track of the middle numbers in the set of inserted numbers to compute the median, try keeping track of two subsets of the numbers: a max-heap of the lower half of the numbers and a min-heap of the greater half of the numbers. Any time you insert a number, pick the heap to place it in by comparing it to the max / min values of the heaps. Then, re-balance the heaps in an effort to keep their sizes apart by at most one. Doing so will allow you to access the middle number(s) of the set of inserted numbers very easily, which will make calculating the median a trivial computation. Re-balancing the heaps can be accomplished by simply removing a value from the larger heap and inserting it in the smaller one. What are the runtime implications of all these operations?
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
      ContinuousMedianHandler handler;
      handler.insert(5);
      handler.insert(10);
      assert(handler.getMedian() == 7.5);
      handler.insert(100);
      assert(handler.getMedian() == 10);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <functional>
using namespace std;

bool MAX_HEAP_FUNC(int a, int b);
bool MIN_HEAP_FUNC(int a, int b);

class Heap {
public:
  vector<int> heap;
  function<bool(int, int)> comparisonFunc;
  int length;

  Heap(function<bool(int, int)> func, vector<int> vector) {
    comparisonFunc = func;
    heap = buildHeap(&vector);
    length = heap.size();
  }

  vector<int> buildHeap(vector<int> *vector) {
    int firstParentIdx = (vector->size() - 2) / 2;
    for (int currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      siftDown(currentIdx, vector->size() - 1, vector);
    }
    return *vector;
  }

  void siftDown(int currentIdx, int endIdx, vector<int> *heap) {
    int childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      int childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      int idxToSwap;
      if (childTwoIdx != -1) {
        if (comparisonFunc(heap->at(childTwoIdx), heap->at(childOneIdx))) {
          idxToSwap = childTwoIdx;
        } else {
          idxToSwap = childOneIdx;
        }
      } else {
        idxToSwap = childOneIdx;
      }
      if (comparisonFunc(heap->at(idxToSwap), heap->at(currentIdx))) {
        swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  void siftUp(int currentIdx, vector<int> *heap) {
    int parentIdx = (currentIdx - 1) / 2;
    while (currentIdx > 0) {
      if (comparisonFunc(heap->at(currentIdx), heap->at(parentIdx))) {
        swap(currentIdx, parentIdx, heap);
        currentIdx = parentIdx;
        parentIdx = (currentIdx - 1) / 2;
      } else {
        return;
      }
    }
  }

  int peek() { return heap[0]; }

  int remove() {
    swap(0, heap.size() - 1, &heap);
    int valueToRemove = heap.back();
    heap.pop_back();
    length--;
    siftDown(0, heap.size() - 1, &heap);
    return valueToRemove;
  }

  void insert(int value) {
    heap.push_back(value);
    length++;
    siftUp(heap.size() - 1, &heap);
  }

  void swap(int i, int j, vector<int> *heap) {
    int temp = heap->at(j);
    heap->at(j) = heap->at(i);
    heap->at(i) = temp;
  }
};

class ContinuousMedianHandler {
public:
  Heap lowers;
  Heap greaters;
  double median;

  ContinuousMedianHandler()
      : lowers(MAX_HEAP_FUNC, {}), greaters(MIN_HEAP_FUNC, {}) {
    median = 0;
  }

  // O(log(n)) time | O(n) space
  void insert(int number) {
    if (!lowers.length || number < lowers.peek()) {
      lowers.insert(number);
    } else {
      greaters.insert(number);
    }
    rebalanceHeaps();
    updateMedian();
  }

  void rebalanceHeaps() {
    if (lowers.length - greaters.length == 2) {
      greaters.insert(lowers.remove());
    } else if (greaters.length - lowers.length == 2) {
      lowers.insert(greaters.remove());
    }
  }

  void updateMedian() {
    if (lowers.length == greaters.length) {
      median = ((double)lowers.peek() + (double)greaters.peek()) / 2;
    } else if (lowers.length > greaters.length) {
      median = lowers.peek();
    } else {
      median = greaters.peek();
    }
  }

  double getMedian() { return median; }
};

bool MAX_HEAP_FUNC(int a, int b) { return a > b; }

bool MIN_HEAP_FUNC(int a, int b) { return a < b; }

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      ContinuousMedianHandler handler;
      handler.insert(5);
      handler.insert(10);
      assert(handler.getMedian() == 7.5);
      handler.insert(100);
      assert(handler.getMedian() == 10);
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
		Program.ContinuousMedianHandler handler = new Program.ContinuousMedianHandler();
		handler.Insert(5);
		handler.Insert(10);
		Utils.AssertTrue(handler.GetMedian() == 7.5);
		handler.Insert(100);
		Utils.AssertTrue(handler.GetMedian() == 10);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;

public class Program {
	public class ContinuousMedianHandler {
		public Heap lowers;
		public Heap greaters;
		public double median = 0;

		public ContinuousMedianHandler() {
			this.lowers = new Heap(Heap.MAX_HEAP_FUNC, new List<int>());
			this.greaters = new Heap(Heap.MIN_HEAP_FUNC, new List<int>());
			this.median = 0;
		}

		// O(log(n)) time | O(n) space
		public void Insert(int number) {
			if (lowers.length == 0 || number < lowers.peek()) {
				this.lowers.Insert(number);
			} else {
				this.greaters.Insert(number);
			}
			this.rebalanceHeaps();
			this.updateMedian();
		}

		public void rebalanceHeaps() {
			if (lowers.length - greaters.length == 2) {
				this.greaters.Insert(this.lowers.remove());
			} else if (greaters.length - lowers.length == 2) {
				this.lowers.Insert(this.greaters.remove());
			}
		}

		public void updateMedian() {
			if (lowers.length == greaters.length) {
				median = ((double)lowers.peek() + (double)greaters.peek()) / 2;
			} else if (lowers.length > greaters.length) {
				median = lowers.peek();
			} else {
				median = greaters.peek();
			}
		}

		public double GetMedian() {
			return median;
		}

	}

	public class Heap {
		public List<int> heap = new List<int>();
		public Func<int, int, bool> comparisonFunc;
		public int length;

		public Heap(Func<int, int, bool> func, List<int> array) {
			this.comparisonFunc = func;
			this.heap = buildHeap(array);
			this.length = heap.Count;
		}

		public int peek() {
			return heap[0];
		}

		public int remove() {
			this.swap(0, heap.Count - 1);
			int valueToRemove = heap[heap.Count - 1];
			this.heap.RemoveAt(heap.Count - 1);
			this.length -= 1;
			this.siftDown(0, heap.Count - 1, heap);
			return valueToRemove;
		}

		public void Insert(int value) {
			this.heap.Add(value);
			this.length += 1;
			this.siftUp(heap.Count - 1, heap);
		}

		public List<int> buildHeap(List<int> array) {
			int firstParentIdx = (array.Count - 2) / 2;
			for (int currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
				this.siftDown(currentIdx, array.Count - 1, array);
			}
			return array;
		}

		public void siftDown(int currentIdx, int endIdx, List<int> heap) {
			int childOneIdx = currentIdx * 2 + 1;
			while (childOneIdx <= endIdx) {
				int childTwoIdx = currentIdx * 2 + 2 <=
				  endIdx ? currentIdx * 2 + 2 : -1;
				int idxToSwap;
				if (childTwoIdx != -1) {
					if (comparisonFunc(heap[childTwoIdx], heap[childOneIdx])) {
						idxToSwap = childTwoIdx;
					} else {
						idxToSwap = childOneIdx;
					}
				} else {
					idxToSwap = childOneIdx;
				}
				if (comparisonFunc(heap[idxToSwap], heap[currentIdx])) {
					swap(currentIdx, idxToSwap);
					currentIdx = idxToSwap;
					childOneIdx = currentIdx * 2 + 1;
				} else {
					return;
				}
			}
		}

		public void siftUp(int currentIdx, List<int> heap) {
			int parentIdx = (currentIdx - 1) / 2;
			while (currentIdx > 0) {
				if (comparisonFunc(heap[currentIdx], heap[parentIdx])) {
					swap(currentIdx, parentIdx);
					currentIdx = parentIdx;
					parentIdx = (currentIdx - 1) / 2;
				} else {
					return;
				}
			}
		}

		public void swap(int i, int j) {
			int temp = this.heap[j];
			this.heap[j] =  this.heap[i];
			this.heap[i] =  temp;
		}

		public static bool MAX_HEAP_FUNC(int a, int b) {
			return a > b;
		}

		public static bool MIN_HEAP_FUNC(int a, int b) {
			return a < b;
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
		Program.ContinuousMedianHandler handler = new Program.ContinuousMedianHandler();
		handler.Insert(5);
		handler.Insert(10);
		Utils.AssertTrue(handler.GetMedian() == 7.5);
		handler.Insert(100);
		Utils.AssertTrue(handler.GetMedian() == 10);
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
	var handler = NewContinuousMedianHandler()
	handler.Insert(5)
	handler.Insert(10)
	require.Equal(t, 7.5, handler.GetMedian())
	handler.Insert(100)
	require.Equal(t, 10.0, handler.GetMedian())
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type ContinuousMedianHandler struct {
	Median float64

	lowers   *Heap
	greaters *Heap
}

func NewContinuousMedianHandler() *ContinuousMedianHandler {
	return &ContinuousMedianHandler{
		Median:   0,
		lowers:   NewHeap(MaxHeapFunc),
		greaters: NewHeap(MinHeapFunc),
	}
}

func (handler *ContinuousMedianHandler) GetMedian() float64 {
	return handler.Median
}

// O(log(n)) time | O(n) space
func (handler *ContinuousMedianHandler) Insert(number int) {
	if handler.lowers.Length() == 0 || number < handler.lowers.Peek() {
		handler.lowers.Insert(number)
	} else {
		handler.greaters.Insert(number)
	}
	handler.rebalanceHeaps()
	handler.updateMedian()
}

func (handler *ContinuousMedianHandler) rebalanceHeaps() {
	if handler.lowers.Length()-handler.greaters.Length() == 2 {
		handler.greaters.Insert(handler.lowers.Remove())
	} else if handler.greaters.Length()-handler.lowers.Length() == 2 {
		handler.lowers.Insert(handler.greaters.Remove())
	}
}

func (handler *ContinuousMedianHandler) updateMedian() {
	if handler.lowers.Length() == handler.greaters.Length() {
		sum := (handler.lowers.Peek() + handler.greaters.Peek())
		handler.Median = float64(sum) / 2
	} else if handler.lowers.Length() > handler.greaters.Length() {
		handler.Median = float64(handler.lowers.Peek())
	} else {
		handler.Median = float64(handler.greaters.Peek())
	}
}

type Heap struct {
	comp   HeapFunc
	values []int
}

type HeapFunc func(int, int) bool

var MinHeapFunc = func(a, b int) bool { return a < b }
var MaxHeapFunc = func(a, b int) bool { return a > b }

func NewHeap(fn HeapFunc) *Heap {
	return &Heap{
		comp:   fn,
		values: []int{},
	}
}

func (h *Heap) Length() int {
	return len(h.values)
}

func (h *Heap) Peek() int {
	if len(h.values) == 0 {
		return -1
	}
	return h.values[0]
}

func (h *Heap) Insert(value int) {
	h.values = append(h.values, value)
	h.siftUp()
}

func (h *Heap) Remove() int {
	l := h.Length()
	h.swap(0, l-1)
	peeked := h.values[l-1]
	h.values = h.values[0 : l-1]
	h.siftDown()
	return peeked
}

func (h *Heap) siftUp() {
	currentIndex := h.Length() - 1
	parentIndex := (currentIndex - 1) / 2
	for currentIndex > 0 {
		current, parent := h.values[currentIndex], h.values[parentIndex]
		if h.comp(current, parent) {
			h.swap(currentIndex, parentIndex)
			currentIndex = parentIndex
			parentIndex = (currentIndex - 1) / 2
		} else {
			return
		}
	}
}

func (h *Heap) siftDown() {
	currentIndex := 0
	endIndex := h.Length() - 1
	childOneIdx := currentIndex*2 + 1
	for childOneIdx <= endIndex {
		childTwoIdx := -1
		if currentIndex*2+2 <= endIndex {
			childTwoIdx = currentIndex*2 + 2
		}
		indexToSwap := childOneIdx
		if childTwoIdx > -1 && h.comp(h.values[childTwoIdx], h.values[childOneIdx]) {
			indexToSwap = childTwoIdx
		}
		if h.comp(h.values[indexToSwap], h.values[currentIndex]) {
			h.swap(currentIndex, indexToSwap)
			currentIndex = indexToSwap
			childOneIdx = currentIndex*2 + 1
		} else {
			return
		}
	}
}

func (h *Heap) swap(i, j int) {
	h.values[i], h.values[j] = h.values[j], h.values[i]
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	var handler = NewContinuousMedianHandler()
	handler.Insert(5)
	handler.Insert(10)
	require.Equal(t, 7.5, handler.GetMedian())
	handler.Insert(100)
	require.Equal(t, 10.0, handler.GetMedian())
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
    Program.ContinuousMedianHandler handler = new Program.ContinuousMedianHandler();
    handler.insert(5);
    handler.insert(10);
    Utils.assertTrue(handler.getMedian() == 7.5);
    handler.insert(100);
    Utils.assertTrue(handler.getMedian() == 10);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;
import java.util.function.BiFunction;

class Program {
  static class ContinuousMedianHandler {
    Heap lowers = new Heap(Heap::MAX_HEAP_FUNC, new ArrayList<Integer>());
    Heap greaters = new Heap(Heap::MIN_HEAP_FUNC, new ArrayList<Integer>());
    double median = 0;

    // O(log(n)) time | O(n) space
    public void insert(int number) {
      if (lowers.length == 0 || number < lowers.peek()) {
        lowers.insert(number);
      } else {
        greaters.insert(number);
      }
      rebalanceHeaps();
      updateMedian();
    }

    public void rebalanceHeaps() {
      if (lowers.length - greaters.length == 2) {
        greaters.insert(lowers.remove());
      } else if (greaters.length - lowers.length == 2) {
        lowers.insert(greaters.remove());
      }
    }

    public void updateMedian() {
      if (lowers.length == greaters.length) {
        median = ((double) lowers.peek() + (double) greaters.peek()) / 2;
      } else if (lowers.length > greaters.length) {
        median = lowers.peek();
      } else {
        median = greaters.peek();
      }
    }

    public double getMedian() {
      return median;
    }
  }

  static class Heap {
    List<Integer> heap = new ArrayList<Integer>();
    BiFunction<Integer, Integer, Boolean> comparisonFunc;
    int length;

    public Heap(BiFunction<Integer, Integer, Boolean> func, List<Integer> array) {
      comparisonFunc = func;
      heap = buildHeap(array);
      length = heap.size();
    }

    public List<Integer> buildHeap(List<Integer> array) {
      int firstParentIdx = (array.size() - 2) / 2;
      for (int currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
        siftDown(currentIdx, array.size() - 1, array);
      }
      return array;
    }

    public void siftDown(int currentIdx, int endIdx, List<Integer> heap) {
      int childOneIdx = currentIdx * 2 + 1;
      while (childOneIdx <= endIdx) {
        int childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
        int idxToSwap;
        if (childTwoIdx != -1) {
          if (comparisonFunc.apply(heap.get(childTwoIdx), heap.get(childOneIdx))) {
            idxToSwap = childTwoIdx;
          } else {
            idxToSwap = childOneIdx;
          }
        } else {
          idxToSwap = childOneIdx;
        }
        if (comparisonFunc.apply(heap.get(idxToSwap), heap.get(currentIdx))) {
          swap(currentIdx, idxToSwap, heap);
          currentIdx = idxToSwap;
          childOneIdx = currentIdx * 2 + 1;
        } else {
          return;
        }
      }
    }

    public void siftUp(int currentIdx, List<Integer> heap) {
      int parentIdx = (currentIdx - 1) / 2;
      while (currentIdx > 0) {
        if (comparisonFunc.apply(heap.get(currentIdx), heap.get(parentIdx))) {
          swap(currentIdx, parentIdx, heap);
          currentIdx = parentIdx;
          parentIdx = (currentIdx - 1) / 2;
        } else {
          return;
        }
      }
    }

    public int peek() {
      return heap.get(0);
    }

    public int remove() {
      swap(0, heap.size() - 1, heap);
      int valueToRemove = heap.get(heap.size() - 1);
      heap.remove(heap.size() - 1);
      length--;
      siftDown(0, heap.size() - 1, heap);
      return valueToRemove;
    }

    public void insert(int value) {
      heap.add(value);
      length++;
      siftUp(heap.size() - 1, heap);
    }

    public void swap(int i, int j, List<Integer> heap) {
      Integer temp = heap.get(j);
      heap.set(j, heap.get(i));
      heap.set(i, temp);
    }

    public static Boolean MAX_HEAP_FUNC(Integer a, Integer b) {
      return a > b;
    }

    public static Boolean MIN_HEAP_FUNC(Integer a, Integer b) {
      return a < b;
    }
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    Program.ContinuousMedianHandler handler = new Program.ContinuousMedianHandler();
    handler.insert(5);
    handler.insert(10);
    Utils.assertTrue(handler.getMedian() == 7.5);
    handler.insert(100);
    Utils.assertTrue(handler.getMedian() == 10);
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
  const handler = new program.ContinuousMedianHandler();
  handler.insert(5);
  handler.insert(10);
  chai.expect(handler.getMedian()).to.deep.equal(7.5);
  handler.insert(100);
  chai.expect(handler.getMedian()).to.deep.equal(10);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class ContinuousMedianHandler {
  constructor() {
    this.lowers = new Heap(MAX_HEAP_FUNC, []);
    this.greaters = new Heap(MIN_HEAP_FUNC, []);
    this.median = null;
  }

  // O(log(n)) time | O(n) space
  insert(number) {
    if (!this.lowers.length || number < this.lowers.peek()) {
      this.lowers.insert(number);
    } else {
      this.greaters.insert(number);
    }
    this.rebalanceHeaps();
    this.updateMedian();
  }

  rebalanceHeaps() {
    if (this.lowers.length - this.greaters.length === 2) {
      this.greaters.insert(this.lowers.remove());
    } else if (this.greaters.length - this.lowers.length === 2) {
      this.lowers.insert(this.greaters.remove());
    }
  }

  updateMedian() {
    if (this.lowers.length === this.greaters.length) {
      this.median = (this.lowers.peek() + this.greaters.peek()) / 2;
    } else if (this.lowers.length > this.greaters.length) {
      this.median = this.lowers.peek();
    } else {
      this.median = this.greaters.peek();
    }
  }

  getMedian() {
    return this.median;
  }
}

class Heap {
  constructor(comparisonFunc, array) {
    this.comparisonFunc = comparisonFunc;
    this.heap = this.buildHeap(array);
    this.length = this.heap.length;
  }

  buildHeap(array) {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array.length - 1, array);
    }
    return array;
  }

  siftDown(currentIdx, endIdx, heap) {
    let childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let idxToSwap;
      if (childTwoIdx !== -1) {
        if (this.comparisonFunc(heap[childTwoIdx], heap[childOneIdx])) {
          idxToSwap = childTwoIdx;
        } else {
          idxToSwap = childOneIdx;
        }
      } else {
        idxToSwap = childOneIdx;
      }
      if (this.comparisonFunc(heap[idxToSwap], heap[currentIdx])) {
        this.swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  siftUp(currentIdx, heap) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (currentIdx > 0) {
      if (this.comparisonFunc(heap[currentIdx], heap[parentIdx])) {
        this.swap(currentIdx, parentIdx, heap);
        currentIdx = parentIdx;
        parentIdx = Math.floor((currentIdx - 1) / 2);
      } else {
        return;
      }
    }
  }

  peek() {
    return this.heap[0];
  }

  remove() {
    this.swap(0, this.length - 1, this.heap);
    const valueToRemove = this.heap.pop();
    this.length--;
    this.siftDown(0, this.length - 1, this.heap);
    return valueToRemove;
  }

  insert(value) {
    this.heap.push(value);
    this.length++;
    this.siftUp(this.length - 1, this.heap);
  }

  swap(i, j, heap) {
    const temp = heap[j];
    heap[j] = heap[i];
    heap[i] = temp;
  }
}

function MAX_HEAP_FUNC(a, b) {
  return a > b;
}

function MIN_HEAP_FUNC(a, b) {
  return a < b;
}

exports.ContinuousMedianHandler = ContinuousMedianHandler;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const handler = new program.ContinuousMedianHandler();
  handler.insert(5);
  handler.insert(10);
  chai.expect(handler.getMedian()).to.deep.equal(7.5);
  handler.insert(100);
  chai.expect(handler.getMedian()).to.deep.equal(10);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.ContinuousMedianHandler as ContinuousMedianHandler

class ProgramTest {
    @Test
    fun TestCase1() {
        val handler = ContinuousMedianHandler()
        handler.insert(5)
        handler.insert(10)
        assert(handler.getMedian() == 7.5)
        handler.insert(100)
        assert(handler.getMedian() == 10.toDouble())
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

open class ContinuousMedianHandler() {
    val lowers = Heap(::MAX_HEAP_FUNC, mutableListOf<Int>())
    val greaters = Heap(::MIN_HEAP_FUNC, mutableListOf<Int>())
    private var median: Double? = null

    // O(log(n)) time | O(n) space
    fun insert(number: Int) {
        if (this.lowers.length == 0 || number < this.lowers.peek()!!) {
            this.lowers.insert(number)
        } else {
            this.greaters.insert(number)
        }
        this.rebalanceHeaps()
        this.updateMedian()
    }

    fun rebalanceHeaps() {
        if (this.lowers.length - this.greaters.length == 2) {
            this.greaters.insert(this.lowers.remove()!!)
        } else if (this.greaters.length - this.lowers.length == 2) {
            this.lowers.insert(this.greaters.remove()!!)
        }
    }

    fun updateMedian() {
        if (this.lowers.length == this.greaters.length) {
            this.median = (this.lowers.peek()!! + this.greaters.peek()!!).toDouble() / 2
        } else if (this.lowers.length > this.greaters.length) {
            this.median = this.lowers.peek()!!.toDouble()
        } else {
            this.median = this.greaters.peek()!!.toDouble()
        }
    }

    fun getMedian(): Double? {
        return this.median
    }
}

open class Heap(comparisonFunc: (a: Int, b: Int) -> Boolean, array: MutableList<Int>) {
    val comparisonFunc = comparisonFunc
    val heap = this.buildHeap(array)
    var length = this.heap.size

    fun buildHeap(array: MutableList<Int>): MutableList<Int> {
        val firstParentIdx = (array.size - 2) / 2
        for (currentIdx in firstParentIdx downTo 0) {
            this.siftDown(currentIdx, array.size - 1, array)
        }
        return array
    }

    fun siftDown(currentIdx: Int, endIdx: Int, heap: MutableList<Int>) {
        var newCurrentIdx = currentIdx
        var childOneIdx = currentIdx * 2 + 1
        while (childOneIdx <= endIdx) {
            var childTwoIdx = if (newCurrentIdx * 2 + 2 <= endIdx) newCurrentIdx * 2 + 2 else -1
            var idxToSwap: Int
            if (childTwoIdx != -1 && this.comparisonFunc(heap[childTwoIdx], heap[childOneIdx])) {
                idxToSwap = childTwoIdx
            } else {
                idxToSwap = childOneIdx
            }
            if (this.comparisonFunc(heap[idxToSwap], heap[newCurrentIdx])) {
                this.swap(newCurrentIdx, idxToSwap, heap)
                newCurrentIdx = idxToSwap
                childOneIdx = newCurrentIdx * 2 + 1
            } else {
                return
            }
        }
    }

    fun siftUp(currentIdx: Int, heap: MutableList<Int>) {
        var newCurrentIdx = currentIdx
        var parentIdx = (currentIdx - 1) / 2
        while (newCurrentIdx > 0 && this.comparisonFunc(heap[newCurrentIdx], heap[parentIdx])) {
            this.swap(newCurrentIdx, parentIdx, heap)
            newCurrentIdx = parentIdx
            parentIdx = (newCurrentIdx - 1) / 2
        }
    }

    fun peek(): Int? {
        return this.heap[0]
    }

    fun remove(): Int? {
        this.swap(0, this.heap.size - 1, this.heap)
        val valueToRemove = this.heap.removeAt(this.heap.size - 1)
        this.length--
        this.siftDown(0, this.heap.size - 1, this.heap)
        return valueToRemove
    }

    fun insert(value: Int) {
        this.heap.add(value)
        this.length++
        this.siftUp(this.heap.size - 1, this.heap)
    }

    fun swap(i: Int, j: Int, heap: MutableList<Int>) {
        val temp = heap[j]
        heap[j] = heap[i]
        heap[i] = temp
    }
}

fun MAX_HEAP_FUNC(a: Int, b: Int): Boolean {
    return a > b
}

fun MIN_HEAP_FUNC(a: Int, b: Int): Boolean {
    return a < b
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.ContinuousMedianHandler as ContinuousMedianHandler

class ProgramTest {
    @Test
    fun TestCase1() {
        val handler = ContinuousMedianHandler()
        handler.insert(5)
        handler.insert(10)
        assert(handler.getMedian() == 7.5)
        handler.insert(100)
        assert(handler.getMedian() == 10.toDouble())
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
      var handler = Program.ContinuousMedianHandler()
      handler.insert(number: 5)
      handler.insert(number: 10)
      try assertEqual(7.5, handler.getMedian())
      handler.insert(number: 100)
      try assertEqual(10, handler.getMedian())
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  class ContinuousMedianHandler {
    var median: Double
    var lowers: Heap
    var greaters: Heap

    init() {
      median = 0.0

      lowers = Heap(array: [], comparisonFunction: maxHeapFunc(_:_:))
      greaters = Heap(array: [], comparisonFunction: minHeapFunc(_:_:))
    }

    func getMedian() -> Double {
      return median
    }

    // O(log(n)) time | O(n) space
    func insert(number: Int) {
      if lowers.length == 0 || number < Int(lowers.peek()) {
        lowers.insert(value: number)
      } else {
        greaters.insert(value: number)
      }

      rebalanceHeaps()
      updateMedian()
    }

    func rebalanceHeaps() {
      if lowers.length - greaters.length == 2 {
        greaters.insert(value: lowers.remove())
      } else if greaters.length - lowers.length == 2 {
        lowers.insert(value: greaters.remove())
      }
    }

    func updateMedian() {
      if lowers.length == greaters.length {
        median = Double((lowers.peek() + greaters.peek()) / 2)
      } else if lowers.length > greaters.length {
        median = Double(lowers.peek())
      } else {
        median = Double(greaters.peek())
      }
    }
  }

  class Heap {
    var length = 0
    var heap = [Int]()
    var comparisonFunction: (Int, Int) -> Bool
    typealias comparisonFuncTypeAlias = (Int, Int) -> Bool

    init(array: [Int], comparisonFunction: @escaping comparisonFuncTypeAlias) {
      self.comparisonFunction = comparisonFunction
      heap = buildHeap(array: array)
      length = heap.count
    }

    func buildHeap(array: [Int]) -> [Int] {
      var heapToReturn = array

      var firstParentIndex = Double((array.count - 2) / 2)
      firstParentIndex = firstParentIndex.rounded(.down)

      if array.count > 0 {
        for var currentIndex in (0 ... Int(firstParentIndex)).reversed() {
          var endIndex = array.count - 1

          siftDown(currentIndex: &currentIndex, endIndex: &endIndex, heap: &heapToReturn)
        }
      }

      return heapToReturn
    }

    func siftDown(currentIndex: inout Int, endIndex: inout Int, heap: inout [Int]) {
      var firstChildIndex = (2 * currentIndex) + 1

      while firstChildIndex <= endIndex {
        var secondChildIndex = -1

        let potentialSecondChild = (2 * currentIndex) + 2

        if potentialSecondChild <= endIndex {
          secondChildIndex = potentialSecondChild
        }

        var indexToSwap = -1

        if secondChildIndex != -1, comparisonFunction(heap[secondChildIndex], heap[firstChildIndex]) {
          indexToSwap = secondChildIndex
        } else {
          indexToSwap = firstChildIndex
        }

        if comparisonFunction(heap[indexToSwap], heap[currentIndex]) {
          swap(firstIndex: currentIndex, secondIndex: indexToSwap, heap: &heap)

          currentIndex = indexToSwap

          firstChildIndex = (2 * currentIndex) + 1
        } else {
          return
        }
      }
    }

    func siftUp(currentIndex: inout Int, heap: inout [Int]) {
      var parentIndex = Double((currentIndex - 1) / 2)
      parentIndex = parentIndex.rounded(.down)

      while currentIndex > 0 {
        if comparisonFunction(heap[currentIndex], heap[Int(parentIndex)]) {
          swap(firstIndex: currentIndex, secondIndex: Int(parentIndex), heap: &heap)

          currentIndex = Int(parentIndex)

          parentIndex = Double((currentIndex - 1) / 2)
        } else {
          return
        }
      }
    }

    func peek() -> Double {
      return Double(heap[0])
    }

    func remove() -> Int {
      swap(firstIndex: 0, secondIndex: heap.count - 1, heap: &heap)

      if let valuetoRemove = heap.popLast() {
        var currentIndex = 0
        var endIndex = heap.count - 1

        length -= 1
        siftDown(currentIndex: &currentIndex, endIndex: &endIndex, heap: &heap)

        return valuetoRemove
      }

      return -1
    }

    func insert(value: Int) {
      heap.append(value)
      length += 1

      var currentIndex = heap.count - 1
      siftUp(currentIndex: &currentIndex, heap: &heap)
    }

    func swap(firstIndex: Int, secondIndex: Int, heap: inout [Int]) {
      let temp = heap[firstIndex]

      heap[firstIndex] = heap[secondIndex]
      heap[secondIndex] = temp
    }
  }

  static func minHeapFunc(_ a: Int, _ b: Int) -> Bool {
    return a < b
  }

  static func maxHeapFunc(_ a: Int, _ b: Int) -> Bool {
    return a > b
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      var handler = Program.ContinuousMedianHandler()
      handler.insert(number: 5)
      handler.insert(number: 10)
      try assertEqual(7.5, handler.getMedian())
      handler.insert(number: 100)
      try assertEqual(10, handler.getMedian())
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
        handler = program.ContinuousMedianHandler()
        handler.insert(5)
        handler.insert(10)
        self.assertEqual(handler.getMedian(), 7.5)
        handler.insert(100)
        self.assertEqual(handler.getMedian(), 10)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class ContinuousMedianHandler:
    def __init__(self):
        self.lowers = Heap(MAX_HEAP_FUNC, [])
        self.greaters = Heap(MIN_HEAP_FUNC, [])
        self.median = None

    # O(log(n)) time | O(n) space
    def insert(self, number):
        if not self.lowers.length or number < self.lowers.peek():
            self.lowers.insert(number)
        else:
            self.greaters.insert(number)
        self.rebalanceHeaps()
        self.updateMedian()

    def rebalanceHeaps(self):
        if self.lowers.length - self.greaters.length == 2:
            self.greaters.insert(self.lowers.remove())
        elif self.greaters.length - self.lowers.length == 2:
            self.lowers.insert(self.greaters.remove())

    def updateMedian(self):
        if self.lowers.length == self.greaters.length:
            self.median = (self.lowers.peek() + self.greaters.peek()) / 2
        elif self.lowers.length > self.greaters.length:
            self.median = self.lowers.peek()
        else:
            self.median = self.greaters.peek()

    def getMedian(self):
        return self.median


class Heap:
    def __init__(self, comparisonFunc, array):
        self.comparisonFunc = comparisonFunc
        self.heap = self.buildHeap(array)
        self.length = len(self.heap)

    def buildHeap(self, array):
        firstParentIdx = (len(array) - 2) // 2
        for currentIdx in reversed(range(firstParentIdx + 1)):
            self.siftDown(currentIdx, len(array) - 1, array)
        return array

    def siftDown(self, currentIdx, endIdx, heap):
        childOneIdx = currentIdx * 2 + 1
        while childOneIdx <= endIdx:
            childTwoIdx = currentIdx * 2 + 2 if currentIdx * 2 + 2 <= endIdx else -1
            if childTwoIdx != -1:
                if self.comparisonFunc(heap[childTwoIdx], heap[childOneIdx]):
                    idxToSwap = childTwoIdx
                else:
                    idxToSwap = childOneIdx
            else:
                idxToSwap = childOneIdx
            if self.comparisonFunc(heap[idxToSwap], heap[currentIdx]):
                self.swap(currentIdx, idxToSwap, heap)
                currentIdx = idxToSwap
                childOneIdx = currentIdx * 2 + 1
            else:
                return

    def siftUp(self, currentIdx, heap):
        parentIdx = (currentIdx - 1) // 2
        while currentIdx > 0:
            if self.comparisonFunc(heap[currentIdx], heap[parentIdx]):
                self.swap(currentIdx, parentIdx, heap)
                currentIdx = parentIdx
                parentIdx = (currentIdx - 1) // 2
            else:
                return

    def peek(self):
        return self.heap[0]

    def remove(self):
        self.swap(0, self.length - 1, self.heap)
        valueToRemove = self.heap.pop()
        self.length -= 1
        self.siftDown(0, self.length - 1, self.heap)
        return valueToRemove

    def insert(self, value):
        self.heap.append(value)
        self.length += 1
        self.siftUp(self.length - 1, self.heap)

    def swap(self, i, j, array):
        array[i], array[j] = array[j], array[i]


def MAX_HEAP_FUNC(a, b):
    return a > b


def MIN_HEAP_FUNC(a, b):
    return a < b

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        handler = program.ContinuousMedianHandler()
        handler.insert(5)
        handler.insert(10)
        self.assertEqual(handler.getMedian(), 7.5)
        handler.insert(100)
        self.assertEqual(handler.getMedian(), 10)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const handler = new program.ContinuousMedianHandler();
  handler.insert(5);
  handler.insert(10);
  chai.expect(handler.getMedian()).to.deep.equal(7.5);
  handler.insert(100);
  chai.expect(handler.getMedian()).to.deep.equal(10);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

export class ContinuousMedianHandler {
  lowers: Heap;
  greaters: Heap;
  median: number | null;

  constructor() {
    this.lowers = new Heap(MAX_HEAP_FUNC, []);
    this.greaters = new Heap(MIN_HEAP_FUNC, []);
    this.median = null;
  }

  // O(log(n)) time | O(n) space
  insert(number: number) {
    if (!this.lowers.length || number < this.lowers.peek()) {
      this.lowers.insert(number);
    } else {
      this.greaters.insert(number);
    }
    this.rebalanceHeaps();
    this.updateMedian();
  }

  rebalanceHeaps() {
    if (this.lowers.length - this.greaters.length === 2) {
      this.greaters.insert(this.lowers.remove()!);
    } else if (this.greaters.length - this.lowers.length === 2) {
      this.lowers.insert(this.greaters.remove()!);
    }
  }

  updateMedian() {
    if (this.lowers.length === this.greaters.length) {
      this.median = (this.lowers.peek() + this.greaters.peek()) / 2;
    } else if (this.lowers.length > this.greaters.length) {
      this.median = this.lowers.peek();
    } else {
      this.median = this.greaters.peek();
    }
  }

  getMedian() {
    return this.median;
  }
}

class Heap {
  heap: number[];
  comparisonFunc: (a: number, b: number) => boolean;
  length: number;

  constructor(comparisonFunc: (a: number, b: number) => boolean, array: number[]) {
    this.comparisonFunc = comparisonFunc;
    this.heap = this.buildHeap(array);
    this.length = this.heap.length;
  }

  buildHeap(array: number[]) {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array.length - 1, array);
    }
    return array;
  }

  siftDown(currentIdx: number, endIdx: number, heap: number[]) {
    let childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let idxToSwap;
      if (childTwoIdx !== -1) {
        if (this.comparisonFunc(heap[childTwoIdx], heap[childOneIdx])) {
          idxToSwap = childTwoIdx;
        } else {
          idxToSwap = childOneIdx;
        }
      } else {
        idxToSwap = childOneIdx;
      }
      if (this.comparisonFunc(heap[idxToSwap], heap[currentIdx])) {
        this.swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  siftUp(currentIdx: number, heap: number[]) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (currentIdx > 0) {
      if (this.comparisonFunc(heap[currentIdx], heap[parentIdx])) {
        this.swap(currentIdx, parentIdx, heap);
        currentIdx = parentIdx;
        parentIdx = Math.floor((currentIdx - 1) / 2);
      } else {
        return;
      }
    }
  }

  peek() {
    return this.heap[0];
  }

  remove() {
    this.swap(0, this.length - 1, this.heap);
    const valueToRemove = this.heap.pop();
    this.length--;
    this.siftDown(0, this.length - 1, this.heap);
    return valueToRemove;
  }

  insert(value: number) {
    this.heap.push(value);
    this.length++;
    this.siftUp(this.length - 1, this.heap);
  }

  swap(i: number, j: number, heap: number[]) {
    const temp = heap[j];
    heap[j] = heap[i];
    heap[i] = temp;
  }
}

function MAX_HEAP_FUNC(a: number, b: number) {
  return a > b;
}

function MIN_HEAP_FUNC(a: number, b: number) {
  return a < b;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const handler = new program.ContinuousMedianHandler();
  handler.insert(5);
  handler.insert(10);
  chai.expect(handler.getMedian()).to.deep.equal(7.5);
  handler.insert(100);
  chai.expect(handler.getMedian()).to.deep.equal(10);
});

```

