# Sort K-Sorted Array
<div class="html">
<p>
  Write a function that takes in a non-negative integer k and a k-sorted array
  of integers and returns the sorted version of the array. Your function can
  either sort the array in place or create an entirely new array.
</p>
<p>
  A k-sorted array is a partially sorted array in which all elements are at most
  k positions away from their sorted position. For example, the array
  <span>[3, 1, 2, 2]</span> is k-sorted with <span>k = 3</span>, because each
  element in the array is at most 3 positions away from its sorted position.
</p>
<p>
  Note that you're expected to come up with an algorithm that can sort the
  k-sorted array faster than in O(nlog(n)) time.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [3, 2, 1, 5, 4, 7, 6, 5]
<span class="CodeEditor-promptParameter">k</span> = 3
</pre>
<h3>Sample Output</h3>
<pre>
[1, 2, 3, 4, 5, 5, 6, 7]
</pre>
</div>

Hint 1
<p>
What does the k parameter tell you? How can you use it to come up with an algorithm that runs in O(nlog(k))?
</p>


Hint 2

<p>
Since the input array is k-sorted, try repeatedly sorting k elements at a time and inserting the minimum element of all those k elements into its final sorted position in the array.
</p>


Hint 3

<p>
What auxiliary data structure would be helpful to quickly determine the minimum element of k elements?
</p>


Hint 4

<p>
As you iterate through the array, use a min-heap to keep track of the most recent k elements. At each iteration, remove the minimum value from the heap, insert it into its final sorted position in the array, and add the current element in the array to the heap. Continue this process until the heap is empty.
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
      vector<int> input = {3, 2, 1, 5, 4, 7, 6, 5};
      int k = 3;
      vector<int> expected = {1, 2, 3, 4, 5, 5, 6, 7};
      auto actual = sortKSortedArray(input, k);
      assert(expected == actual);
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

  MinHeap(vector<int> array) { heap = buildHeap(array); }

  bool isEmpty() { return heap.size() == 0; }

  vector<int> buildHeap(vector<int> array) {
    int firstParentIdx = (array.size() - 2) / 2;
    for (int currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      siftDown(currentIdx, array.size() - 1, array);
    }
    return array;
  }

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
        swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  void siftUp(int currentIdx, vector<int> &heap) {
    int parentIdx = (currentIdx - 1) / 2;
    while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
      swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = (currentIdx - 1) / 2;
    }
  }

  int peek() { return heap[0]; }

  int remove() {
    swap(0, heap.size() - 1, heap);
    int valueToRemove = heap.back();
    heap.pop_back();
    siftDown(0, heap.size() - 1, heap);
    return valueToRemove;
  }

  void insert(int value) {
    heap.push_back(value);
    siftUp(heap.size() - 1, heap);
  }

  void swap(int i, int j, vector<int> &heap) {
    int temp = heap[j];
    heap[j] = heap[i];
    heap[i] = temp;
  }
};

// O(nlog(k)) time | O(k) space - where n is the number
// of elements in the array and k is how far away elements
// are from their sorted position
vector<int> sortKSortedArray(vector<int> array, int k) {
  vector<int> minHeapInputArray(array.begin(),
                                array.begin() + min(k + 1, (int)array.size()));
  auto minHeapWithKElements = new MinHeap(minHeapInputArray);

  int nextIndexToInsertElement = 0;
  for (int idx = k + 1; idx < array.size(); idx++) {
    auto minElement = minHeapWithKElements->remove();
    array[nextIndexToInsertElement] = minElement;
    nextIndexToInsertElement++;

    auto currentElement = array[idx];
    minHeapWithKElements->insert(currentElement);
  }

  while (!minHeapWithKElements->isEmpty()) {
    auto minElement = minHeapWithKElements->remove();
    array[nextIndexToInsertElement] = minElement;
    nextIndexToInsertElement++;
  }

  return array;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> input = {3, 2, 1, 5, 4, 7, 6, 5};
      int k = 3;
      vector<int> expected = {1, 2, 3, 4, 5, 5, 6, 7};
      auto actual = sortKSortedArray(input, k);
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
		int[] input = new int[] {3, 2, 1, 5, 4, 7, 6, 5};
		int k = 3;
		int[] expected = new int[] {1, 2, 3, 4, 5, 5, 6, 7};
		var actual = new Program().SortKSortedArray(input, k);
		for (int i=0; i<expected.Length; i++) {
			Utils.AssertTrue(expected[i] == actual[i]);
		}
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {

	// O(nlog(k)) time | O(k) space - where n is the number
	// of elements in the array and k is how far away elements
	// are from their sorted position
	public int[] SortKSortedArray(int[] array, int k) {
		List<int> heapValues = new List<int>();
		for (int i = 0; i < Math.Min(k + 1, array.Length); i++) heapValues.Add(array[i]);

		MinHeap minHeapWithKElements = new MinHeap(heapValues);

		int nextIndexToInsertElement = 0;
		for (int idx = k + 1; idx < array.Length; idx++) {
			int minElement = minHeapWithKElements.remove();
			array[nextIndexToInsertElement] = minElement;
			nextIndexToInsertElement += 1;

			int currentElement = array[idx];
			minHeapWithKElements.insert(currentElement);
		}

		while (!minHeapWithKElements.isEmpty()) {
			int minElement = minHeapWithKElements.remove();
			array[nextIndexToInsertElement] = minElement;
			nextIndexToInsertElement += 1;
		}

		return array;
	}

	public class MinHeap {
		List<int> heap = new List<int>();

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

		public int peek() {
			return heap[0];
		}

		public int remove() {
			swap(0, heap.Count - 1, heap);
			int valueToRemove = heap[heap.Count - 1];
			heap.RemoveAt(heap.Count - 1);
			siftDown(0, heap.Count - 1, heap);
			return valueToRemove;
		}

		public void insert(int value) {
			heap.Add(value);
			siftUp(heap.Count - 1, heap);
		}

		public void swap(int i, int j, List<int> heap) {
			int temp = heap[j];
			heap[j] = heap[i];
			heap[i] = temp;
		}

		public bool isEmpty() {
			return heap.Count == 0;
		}
	}
}
```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] input = new int[] {3, 2, 1, 5, 4, 7, 6, 5};
		int k = 3;
		int[] expected = new int[] {1, 2, 3, 4, 5, 5, 6, 7};
		var actual = new Program().SortKSortedArray(input, k);
		for (int i=0; i<expected.Length; i++) {
			Utils.AssertTrue(expected[i] == actual[i]);
		}
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
	input := []int{3, 2, 1, 5, 4, 7, 6, 5}
	k := 3
	expected := []int{1, 2, 3, 4, 5, 5, 6, 7}
	actual := SortKSortedArray(input, k)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(nlog(k)) time | O(k) space - where n is the number
// of elements in the array and k is how far away elements
// are from their sorted position
func SortKSortedArray(array []int, k int) []int {
	if len(array) == 0 || k == 0 {
		return array
	}
	heapArray := make([]int, min(k+1, len(array)))
	copy(heapArray, array[0:min(k+1, len(array))])
	minHeapWithKElements := NewMinHeap(heapArray)

	nextIndexToInsertElement := 0
	for idx := k + 1; idx < len(array); idx++ {
		minElement := minHeapWithKElements.Remove()
		array[nextIndexToInsertElement] = minElement
		nextIndexToInsertElement += 1

		currentElement := array[idx]
		minHeapWithKElements.Insert(currentElement)
	}

	for !minHeapWithKElements.IsEmpty() {
		minElement := minHeapWithKElements.Remove()
		array[nextIndexToInsertElement] = minElement
		nextIndexToInsertElement += 1
	}
	return array
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

type MinHeap []int

func NewMinHeap(array []int) *MinHeap {
	heap := MinHeap(array)
	ptr := &heap
	ptr.BuildHeap(array)
	return ptr
}

func (h *MinHeap) BuildHeap(array []int) {
	first := (len(array) - 2) / 2
	for currentIndex := first + 1; currentIndex >= 0; currentIndex-- {
		h.siftDown(currentIndex, len(array)-1)
	}
}

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

func (h *MinHeap) siftUp() {
	currentIndex := len(*h) - 1
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

func (h MinHeap) Peek() int {
	if len(h) == 0 {
		return -1
	}
	return h[0]
}

func (h *MinHeap) Remove() int {
	l := len(*h)
	h.swap(0, l-1)
	peeked := (*h)[l-1]
	*h = (*h)[0 : l-1]
	h.siftDown(0, l-2)
	return peeked
}

func (h *MinHeap) Insert(value int) {
	*h = append(*h, value)
	h.siftUp()
}

func (h *MinHeap) IsEmpty() bool {
	return len(*h) == 0
}

func (h MinHeap) swap(i, j int) {
	h[i], h[j] = h[j], h[i]
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []int{3, 2, 1, 5, 4, 7, 6, 5}
	k := 3
	expected := []int{1, 2, 3, 4, 5, 5, 6, 7}
	actual := SortKSortedArray(input, k)
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
    int[] input = new int[] {3, 2, 1, 5, 4, 7, 6, 5};
    int k = 3;
    int[] expected = new int[] {1, 2, 3, 4, 5, 5, 6, 7};
    var actual = new Program().sortKSortedArray(input, k);
    for (int i = 0; i < expected.length; i++) {
      Utils.assertTrue(expected[i] == actual[i]);
    }
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(nlog(k)) time | O(k) space - where n is the number
  // of elements in the array and k is how far away elements
  // are from their sorted position
  public int[] sortKSortedArray(int[] array, int k) {
    List<Integer> heapValues = new ArrayList<Integer>();
    for (int i = 0; i < Math.min(k + 1, array.length); i++) heapValues.add(array[i]);

    MinHeap minHeapWithKElements = new MinHeap(heapValues);

    int nextIndexToInsertElement = 0;
    for (int idx = k + 1; idx < array.length; idx++) {
      int minElement = minHeapWithKElements.remove();
      array[nextIndexToInsertElement] = minElement;
      nextIndexToInsertElement += 1;

      int currentElement = array[idx];
      minHeapWithKElements.insert(currentElement);
    }

    while (!minHeapWithKElements.isEmpty()) {
      int minElement = minHeapWithKElements.remove();
      array[nextIndexToInsertElement] = minElement;
      nextIndexToInsertElement += 1;
    }

    return array;
  }

  class MinHeap {
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

    public boolean isEmpty() {
      return heap.size() == 0;
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
    int[] input = new int[] {3, 2, 1, 5, 4, 7, 6, 5};
    int k = 3;
    int[] expected = new int[] {1, 2, 3, 4, 5, 5, 6, 7};
    var actual = new Program().sortKSortedArray(input, k);
    for (int i = 0; i < expected.length; i++) {
      Utils.assertTrue(expected[i] == actual[i]);
    }
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
  const input = [3, 2, 1, 5, 4, 7, 6, 5];
  const k = 3;
  const expected = [1, 2, 3, 4, 5, 5, 6, 7];
  const actual = program.sortKSortedArray(input, k);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlog(k)) time | O(k) space - where n is the number
// of elements in the array and k is how far away elements
// are from their sorted position
function sortKSortedArray(array, k) {
  const minHeapWithKElements = new MinHeap(array.slice(0, Math.min(k + 1, array.length)));

  let nextIndexToInsertElement = 0;
  for (let idx = k + 1; idx < array.length; idx++) {
    const minElement = minHeapWithKElements.remove();
    array[nextIndexToInsertElement] = minElement;
    nextIndexToInsertElement++;

    const currentElement = array[idx];
    minHeapWithKElements.insert(currentElement);
  }

  while (!minHeapWithKElements.isEmpty()) {
    const minElement = minHeapWithKElements.remove();
    array[nextIndexToInsertElement] = minElement;
    nextIndexToInsertElement++;
  }

  return array;
}

class MinHeap {
  constructor(array) {
    this.heap = this.buildHeap(array);
  }

  isEmpty() {
    return this.heap.length === 0;
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

  siftUp(currentIdx, heap) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  peek() {
    return this.heap[0];
  }

  remove() {
    this.swap(0, this.heap.length - 1, this.heap);
    const valueToRemove = this.heap.pop();
    this.siftDown(0, this.heap.length - 1, this.heap);
    return valueToRemove;
  }

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
exports.sortKSortedArray = sortKSortedArray;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [3, 2, 1, 5, 4, 7, 6, 5];
  const k = 3;
  const expected = [1, 2, 3, 4, 5, 5, 6, 7];
  const actual = program.sortKSortedArray(input, k);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.sortKSortedArray

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(3, 2, 1, 5, 4, 7, 6, 5)
        val k = 3
        val expected = mutableListOf(1, 2, 3, 4, 5, 5, 6, 7)
        val output = sortKSortedArray(input, k)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.min

// O(nlog(k)) time | O(k) space - where n is the number
// of elements in the array and k is how far away elements 
// are from their sorted position
fun sortKSortedArray(array: MutableList<Int>, k: Int): MutableList<Int> {
    val minHeapWithKElements = MinHeap(array.slice(0..min(k, array.size - 1)).toMutableList())

    var nextIndexToInsertElement = 0
    for (idx in k + 1 until array.size) {
        val minElement = minHeapWithKElements.remove()!!
        array[nextIndexToInsertElement] = minElement
        nextIndexToInsertElement += 1

        val currentElement = array[idx]
        minHeapWithKElements.insert(currentElement)
    }

    while (!minHeapWithKElements.isEmpty()) {
        val minElement = minHeapWithKElements.remove()!!
        array[nextIndexToInsertElement] = minElement
        nextIndexToInsertElement += 1
    }

    return array
}

open class MinHeap(array: MutableList<Int>) {
    val heap = this.buildHeap(array)

    fun isEmpty(): Boolean {
        return this.heap.size == 0
    }

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

    fun siftUp(currentIdx: Int, heap: MutableList<Int>) {
        var newCurrentIdx = currentIdx
        var parentIdx = (currentIdx - 1) / 2
        while (newCurrentIdx > 0 && heap[newCurrentIdx] < heap[parentIdx]) {
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
        this.siftDown(0, this.heap.size - 1, this.heap)
        return valueToRemove
    }

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
import com.algoexpert.program.sortKSortedArray

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(3, 2, 1, 5, 4, 7, 6, 5)
        val k = 3
        val expected = mutableListOf(1, 2, 3, 4, 5, 5, 6, 7)
        val output = sortKSortedArray(input, k)
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
      var input = [3, 2, 1, 5, 4, 7, 6, 5]
      var k = 3
      var expected = [1, 2, 3, 4, 5, 5, 6, 7]
      var actual = Program().sortKSortedArray(&input, k)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nlog(k)) time | O(k) space - where n is the number
  // of elements in the array and k is how far away elements
  // are from their sorted position
  func sortKSortedArray(_ array: inout [Int], _ k: Int) -> [Int] {
    if array.count == 0 || k == 0 {
      return array
    }

    var minHeapWithKElements = MinHeap(Array(array[0 ... min(k, array.count - 1)]))

    var nextIndexToInsertElement = 0
    for idx in stride(from: k + 1, to: array.count, by: 1) {
      let minElement = minHeapWithKElements.remove()
      array[nextIndexToInsertElement] = minElement
      nextIndexToInsertElement += 1

      let currentElement = array[idx]
      minHeapWithKElements.insert(currentElement)
    }

    while !minHeapWithKElements.isEmpty() {
      let minElement = minHeapWithKElements.remove()
      array[nextIndexToInsertElement] = minElement
      nextIndexToInsertElement += 1
    }
    return array
  }

  class MinHeap {
    var heap = [Int]()

    init(_ array: [Int]) {
      heap = array
      buildHeap(array: array)
    }

    func buildHeap(array: [Int]) {
      var firstParentIndex = Double((array.count - 2) / 2)
      firstParentIndex = firstParentIndex.rounded(.down)

      for var currentIndex in (0 ... Int(firstParentIndex)).reversed() {
        var endIndex = array.count - 1
        siftDown(currentIndex: currentIndex, endIndex: endIndex)
      }
    }

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

    func peek() -> Int {
      return heap[0]
    }

    func remove() -> Int {
      var l = heap.count
      swap(firstIndex: 0, secondIndex: l - 1)
      var peeked = heap[l - 1]
      heap.removeLast()
      siftDown(currentIndex: 0, endIndex: l - 2)
      return peeked
    }

    func insert(_ value: Int) {
      heap.append(value)
      siftUp()
    }

    func swap(firstIndex: Int, secondIndex: Int) {
      let temp = heap[firstIndex]
      heap[firstIndex] = heap[secondIndex]
      heap[secondIndex] = temp
    }

    func length() -> Int {
      return heap.count
    }

    func isEmpty() -> Bool {
      return length() == 0
    }
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = [3, 2, 1, 5, 4, 7, 6, 5]
      var k = 3
      var expected = [1, 2, 3, 4, 5, 5, 6, 7]
      var actual = Program().sortKSortedArray(&input, k)
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
        input = [3, 2, 1, 5, 4, 7, 6, 5]
        k = 3
        expected = [1, 2, 3, 4, 5, 5, 6, 7]
        actual = program.sortKSortedArray(input, k)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nlog(k)) time | O(k) space - where n is the number
# of elements in the array and k is how far away elements
# are from their sorted position
def sortKSortedArray(array, k):
    minHeapWithKElements = MinHeap(array[: min(k + 1, len(array))])

    nextIndexToInsertElement = 0
    for idx in range(k + 1, len(array)):
        minElement = minHeapWithKElements.remove()
        array[nextIndexToInsertElement] = minElement
        nextIndexToInsertElement += 1

        currentElement = array[idx]
        minHeapWithKElements.insert(currentElement)

    while not minHeapWithKElements.isEmpty():
        minElement = minHeapWithKElements.remove()
        array[nextIndexToInsertElement] = minElement
        nextIndexToInsertElement += 1

    return array


class MinHeap:
    def __init__(self, array):
        self.heap = self.buildHeap(array)

    def isEmpty(self):
        return len(self.heap) == 0

    def buildHeap(self, array):
        firstParentIdx = (len(array) - 2) // 2
        for currentIdx in reversed(range(firstParentIdx + 1)):
            self.siftDown(currentIdx, len(array) - 1, array)
        return array

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

    def siftUp(self, currentIdx, heap):
        parentIdx = (currentIdx - 1) // 2
        while currentIdx > 0 and heap[currentIdx] < heap[parentIdx]:
            self.swap(currentIdx, parentIdx, heap)
            currentIdx = parentIdx
            parentIdx = (currentIdx - 1) // 2

    def peek(self):
        return self.heap[0]

    def remove(self):
        self.swap(0, len(self.heap) - 1, self.heap)
        valueToRemove = self.heap.pop()
        self.siftDown(0, len(self.heap) - 1, self.heap)
        return valueToRemove

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


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [3, 2, 1, 5, 4, 7, 6, 5]
        k = 3
        expected = [1, 2, 3, 4, 5, 5, 6, 7]
        actual = program.sortKSortedArray(input, k)
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
  const input = [3, 2, 1, 5, 4, 7, 6, 5];
  const k = 3;
  const expected = [1, 2, 3, 4, 5, 5, 6, 7];
  const actual = program.sortKSortedArray(input, k);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlog(k)) time | O(k) space - where n is the number
// of elements in the array and k is how far away elements
// are from their sorted position
export function sortKSortedArray(array: number[], k: number) {
  const minHeapWithKElements = new MinHeap(array.slice(0, Math.min(k + 1, array.length)));

  let nextIndexToInsertElement = 0;
  for (let idx = k + 1; idx < array.length; idx++) {
    const minElement = minHeapWithKElements.remove()!;
    array[nextIndexToInsertElement] = minElement;
    nextIndexToInsertElement++;

    const currentElement = array[idx];
    minHeapWithKElements.insert(currentElement);
  }

  while (!minHeapWithKElements.isEmpty()) {
    const minElement = minHeapWithKElements.remove()!;
    array[nextIndexToInsertElement] = minElement;
    nextIndexToInsertElement++;
  }

  return array;
}

export class MinHeap {
  heap: number[];

  constructor(array: number[]) {
    this.heap = this.buildHeap(array);
  }

  isEmpty() {
    return this.heap.length === 0;
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

  siftUp(currentIdx: number, heap: number[]) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  peek() {
    return this.heap[0];
  }

  remove() {
    this.swap(0, this.heap.length - 1, this.heap);
    const valueToRemove = this.heap.pop();
    this.siftDown(0, this.heap.length - 1, this.heap);
    return valueToRemove;
  }

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

it('Test Case #1', function () {
  const input = [3, 2, 1, 5, 4, 7, 6, 5];
  const k = 3;
  const expected = [1, 2, 3, 4, 5, 5, 6, 7];
  const actual = program.sortKSortedArray(input, k);
  chai.expect(actual).to.deep.equal(expected);
});

```

