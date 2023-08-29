# Merge Sorted Arrays
<div class="html">
<p>
  Write a function that takes in a non-empty list of non-empty sorted arrays of
  integers and returns a merged list of all of those arrays.
</p>
<p>The integers in the merged list should be in sorted order.</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">arrays</span> = [
  [1, 5, 9, 21],
  [-1, 0],
  [-124, 81, 121],
  [3, 6, 12, 20, 150],
]
</pre>
<h3>Sample Output</h3>
<pre>
[-124, -1, 0, 1, 3, 5, 6, 9, 12, 20, 21, 81, 121, 150]
</pre>
</div>

Hint 1
<p>
If you were given just two sorted lists of numbers in real life, what steps would you take to merge them into a single sorted list? Apply the same process to k sorted lists.
</p>


Hint 2

<p>
The first element in each array is the smallest element in the respective array; to find the first element to add to the final sorted list, pick the smallest integer out of all of the smallest elements. Once you've found the smallest integer, move one position forward in the array that it came from and continue applying this logic until you run out of elements.
</p>


Hint 3

<p>
The approach described in Hint #2 involves repeatedly finding the smallest of k elements, since there are k arrays. Doing so can be naively implemented using a simple loop through the k relevant elements, which results in an O(k)-time operation. Can you speed up this operation by using a specific data structure that lends itself to quickly finding the minimum value in a set of values.
</p>


Hint 4

<p>
Follow the approach described in Hint #2, using a Min Heap to store the k smallest elements at any given point in your algorithm.
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
      vector<vector<int>> arrays = {
          {1, 5, 9, 21},
          {-1, 0},
          {-124, 81, 121},
          {3, 6, 12, 20, 150},
      };
      auto output = mergeSortedArrays(arrays);
      vector<int> expected{-124, -1, 0,  1,  3,  5,   6,
                           9,    12, 20, 21, 81, 121, 150};
      assert(output == expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

struct Item {
  int arrayIdx;
  int num;
};

Item getMinValue(vector<Item> items);

// O(nk) time | O(n + k) space - where n is the total
// number of array elements and k is the number of arrays
vector<int> mergeSortedArrays(vector<vector<int>> arrays) {
  vector<int> sortedList;
  vector<int> elementIdxs(arrays.size(), 0);

  while (true) {
    vector<Item> smallestItems;
    for (int arrayIdx = 0; arrayIdx < arrays.size(); arrayIdx++) {
      vector<int> relevantArray = arrays[arrayIdx];
      int elementIdx = elementIdxs[arrayIdx];
      if (elementIdx == relevantArray.size())
        continue;
      smallestItems.push_back(Item{arrayIdx, relevantArray[elementIdx]});
    }
    if (smallestItems.size() == 0)
      break;
    Item nextItem = getMinValue(smallestItems);
    sortedList.push_back(nextItem.num);
    elementIdxs[nextItem.arrayIdx]++;
  }

  return sortedList;
}

Item getMinValue(vector<Item> items) {
  int minValueIdx = 0;
  for (int i = 1; i < items.size(); i++) {
    if (items[i].num < items[minValueIdx].num)
      minValueIdx = i;
  }
  return items[minValueIdx];
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <algorithm>

using namespace std;

struct Item {
  int arrayIdx;
  int elementIdx;
  int num;
};

class MinHeap {
public:
  vector<Item> heap;

  MinHeap(vector<Item> array) { heap = buildHeap(array); }

  bool isEmpty() { return heap.size() == 0; }

  vector<Item> buildHeap(vector<Item> array) {
    int firstParentIdx = (array.size() - 2) / 2;
    for (int currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      siftDown(currentIdx, array.size() - 1, array);
    }
    return array;
  }

  void siftDown(int currentIdx, int endIdx, vector<Item> &heap) {
    int childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      int childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      int idxToSwap;
      if (childTwoIdx != -1 && heap[childTwoIdx].num < heap[childOneIdx].num) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }
      if (heap[idxToSwap].num < heap[currentIdx].num) {
        swap(heap[currentIdx], heap[idxToSwap]);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  void siftUp(int currentIdx, vector<Item> &heap) {
    int parentIdx = (currentIdx - 1) / 2;
    while (currentIdx > 0 && heap[currentIdx].num < heap[parentIdx].num) {
      swap(heap[currentIdx], heap[parentIdx]);
      currentIdx = parentIdx;
      parentIdx = (currentIdx - 1) / 2;
    }
  }

  Item remove() {
    swap(heap[0], heap[heap.size() - 1]);
    Item valueToRemove = heap.back();
    heap.pop_back();
    siftDown(0, heap.size() - 1, heap);
    return valueToRemove;
  }

  void insert(Item value) {
    heap.push_back(value);
    siftUp(heap.size() - 1, heap);
  }
};

// O(nlog(k) + k) time | O(n + k) space - where n is the total
// number of array elements and k is the number of arrays
vector<int> mergeSortedArrays(vector<vector<int>> arrays) {
  vector<int> sortedList;
  vector<Item> smallestItems;

  for (int arrayIdx = 0; arrayIdx < arrays.size(); arrayIdx++) {
    smallestItems.push_back(Item{
        arrayIdx,
        0,
        arrays[arrayIdx][0],
    });
  }

  MinHeap minHeap(smallestItems);
  while (!minHeap.isEmpty()) {
    Item smallestItem = minHeap.remove();
    sortedList.push_back(smallestItem.num);
    if (smallestItem.elementIdx == arrays[smallestItem.arrayIdx].size() - 1)
      continue;
    minHeap.insert(Item{
        smallestItem.arrayIdx,
        smallestItem.elementIdx + 1,
        arrays[smallestItem.arrayIdx][smallestItem.elementIdx + 1],
    });
  }

  return sortedList;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> arrays = {
          {1, 5, 9, 21},
          {-1, 0},
          {-124, 81, 121},
          {3, 6, 12, 20, 150},
      };
      auto output = mergeSortedArrays(arrays);
      vector<int> expected{-124, -1, 0,  1,  3,  5,   6,
                           9,    12, 20, 21, 81, 121, 150};
      assert(output == expected);
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
		var arrays = new List<List<int> > {
			new List<int> {
				1, 5, 9, 21
			},
			new List<int> {
				-1, 0
			},
			new List<int> {
				-124, 81, 121
			},
			new List<int> {
				3, 6, 12, 20, 150
			},
		};
		var actual = Program.MergeSortedArrays(arrays);
		var expected = new List<int> {
			-124, -1, 0, 1, 3, 5, 6, 9, 12, 20, 21, 81, 121, 150
		};
		Utils.AssertTrue(Enumerable.SequenceEqual(expected, actual));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Linq;
using System.Collections.Generic;

public class Program {
	// O(nk) time | O(n + k) space - where n is the total
	// number of array elements and k is the number of arrays
	public static List<int> MergeSortedArrays(List<List<int> > arrays) {
		List<int> sortedList = new List<int>();
		List<int> elementIdxs = Enumerable.Repeat(0, arrays.Count).ToList();
		while (true) {
			List<Item> smallestItems = new List<Item>();
			for (int arrayIdx = 0; arrayIdx < arrays.Count; arrayIdx++) {
				List<int> relevantArray = arrays[arrayIdx];
				int elementIdx= elementIdxs[arrayIdx];
				if (elementIdx== relevantArray.Count) continue;
				smallestItems.Add(new Item(arrayIdx, relevantArray[elementIdx]));
			}
			if (smallestItems.Count == 0) break;
			Item nextItem = getMinValue(smallestItems);
			sortedList.Add(nextItem.num);
			elementIdxs[nextItem.arrayIdx] =  elementIdxs[nextItem.arrayIdx] + 1;
		}

		return sortedList;
	}

	public static Item getMinValue(List<Item> items) {
		int minValueIdx = 0;
		for (int i = 1; i < items.Count; i++) {
			if (items[i].num < items[minValueIdx].num) minValueIdx = i;
		}
		return items[minValueIdx];
	}

	public class Item {
		public int arrayIdx;
		public int num;

		public Item(int arrayIdx, int num) {
			this.arrayIdx = arrayIdx;
			this.num = num;
		}
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(nlog(k) + k) time | O(n + k) space - where n is the total
	// number of array elements and k is the number of arrays
	public static List<int> MergeSortedArrays(List<List<int> > arrays) {
		List<int> sortedList = new List<int>();
		List<Item> smallestItems = new List<Item>();

		for (int arrayIdx = 0; arrayIdx < arrays.Count; arrayIdx++) {
			smallestItems.Add(new Item(arrayIdx, 0, arrays[arrayIdx][0]));
		}

		MinHeap minHeap = new MinHeap(smallestItems);
		while (!minHeap.isEmpty()) {
			Item smallestItem = minHeap.Remove();
			sortedList.Add(smallestItem.num);
			if (smallestItem.elementIdx ==
			  arrays[smallestItem.arrayIdx].Count - 1) continue;
			minHeap.Insert(new Item(
				  smallestItem.arrayIdx,
				  smallestItem.elementIdx + 1,
				  arrays[smallestItem.arrayIdx][smallestItem.elementIdx + 1]
				  ));
		}

		return sortedList;
	}

	public class Item {
		public int arrayIdx;
		public int elementIdx;
		public int num;

		public Item(int arrayIdx, int elementIdx, int num) {
			this.arrayIdx = arrayIdx;
			this.elementIdx = elementIdx;
			this.num = num;
		}
	}

	public class MinHeap {
		List<Item> heap = new List<Item>();

		public MinHeap(List<Item> array) {
			heap = buildHeap(array);
		}

		public bool isEmpty() {
			return heap.Count == 0;
		}

		public List<Item> buildHeap(List<Item> array) {
			int firstParentIdx = (array.Count - 2) / 2;
			for (int currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
				siftDown(currentIdx, array.Count - 1, array);
			}
			return array;
		}

		public void siftDown(int currentIdx, int endIdx, List<Item> heap) {
			int childOneIdx = currentIdx * 2 + 1;
			while (childOneIdx <= endIdx) {
				int childTwoIdx = currentIdx * 2 + 2 <=
				  endIdx ? currentIdx * 2 + 2 : -1;
				int idxToSwap;
				if (childTwoIdx != -1 &&
				  heap[childTwoIdx].num < heap[childOneIdx].num) {
					idxToSwap = childTwoIdx;
				} else {
					idxToSwap = childOneIdx;
				}
				if (heap[idxToSwap].num < heap[currentIdx].num) {
					swap(currentIdx, idxToSwap, heap);
					currentIdx = idxToSwap;
					childOneIdx = currentIdx * 2 + 1;
				} else {
					return;
				}
			}
		}

		public void siftUp(int currentIdx, List<Item> heap) {
			int parentIdx = (currentIdx - 1) / 2;
			while (currentIdx > 0 && heap[currentIdx].num < heap[parentIdx].num) {
				swap(currentIdx, parentIdx, heap);
				currentIdx = parentIdx;
				parentIdx = (currentIdx - 1) / 2;
			}
		}

		public Item Remove() {
			swap(0, heap.Count - 1, heap);
			Item valueToRemove = heap[heap.Count - 1];
			heap.RemoveAt(heap.Count - 1);
			siftDown(0, heap.Count - 1, heap);
			return valueToRemove;
		}

		public void Insert(Item value) {
			heap.Add(value);
			siftUp(heap.Count - 1, heap);
		}

		public void swap(int i, int j, List<Item> heap) {
			Item temp = heap[j];
			heap[j] =  heap[i];
			heap[i] =  temp;
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
		var arrays = new List<List<int> > {
			new List<int> {
				1, 5, 9, 21
			},
			new List<int> {
				-1, 0
			},
			new List<int> {
				-124, 81, 121
			},
			new List<int> {
				3, 6, 12, 20, 150
			},
		};
		var actual = Program.MergeSortedArrays(arrays);
		var expected = new List<int> {
			-124, -1, 0, 1, 3, 5, 6, 9, 12, 20, 21, 81, 121, 150
		};
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
	arrays := [][]int{
		{1, 5, 9, 21},
		{-1, 0},
		{-124, 81, 121},
		{3, 6, 12, 20, 150},
	}
	expected := []int{-124, -1, 0, 1, 3, 5, 6, 9, 12, 20, 21, 81, 121, 150}
	actual := MergeSortedArrays(arrays)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type Item struct {
	ArrayIdx int
	Num      int
}

// O(nk) time | O(n + k) space - where n is the total
// number of array elements and k is the number of arrays
func MergeSortedArrays(arrays [][]int) []int {
	sortedList := []int{}
	elementIdxs := make([]int, len(arrays))

	for {
		smallestItems := []Item{}
		for arrayIdx := 0; arrayIdx < len(arrays); arrayIdx++ {
			relevantArray := arrays[arrayIdx]
			elementIdx := elementIdxs[arrayIdx]
			if elementIdx == len(relevantArray) {
				continue
			}
			smallestItems = append(smallestItems, Item{
				ArrayIdx: arrayIdx,
				Num:      relevantArray[elementIdx],
			})
		}

		if len(smallestItems) == 0 {
			break
		}
		nextItem := getMinValue(smallestItems)
		sortedList = append(sortedList, nextItem.Num)
		elementIdxs[nextItem.ArrayIdx] += 1
	}
	return sortedList
}

func getMinValue(items []Item) Item {
	minValueItem := items[0]
	for i := 1; i < len(items); i++ {
		if items[i].Num < minValueItem.Num {
			minValueItem = items[i]
		}
	}
	return minValueItem
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type Item struct {
	ArrayIdx   int
	ElementIdx int
	Num        int
}

// O(nlog(k) + k) time | O(n + k) space - where n is the total
// number of array elements and k is the number of arrays
func MergeSortedArrays(arrays [][]int) []int {
	sortedList := []int{}
	smallestItems := []Item{}

	for arrayIdx := 0; arrayIdx < len(arrays); arrayIdx++ {
		smallestItems = append(smallestItems, Item{
			ArrayIdx:   arrayIdx,
			ElementIdx: 0,
			Num:        arrays[arrayIdx][0],
		})
	}

	mh := NewMinHeap(smallestItems)
	for mh.length() != 0 {
		smallestItem := mh.Remove()
		sortedList = append(sortedList, smallestItem.Num)
		if smallestItem.ElementIdx == len(arrays[smallestItem.ArrayIdx])-1 {
			continue
		}
		mh.Insert(Item{
			ArrayIdx:   smallestItem.ArrayIdx,
			ElementIdx: smallestItem.ElementIdx + 1,
			Num:        arrays[smallestItem.ArrayIdx][smallestItem.ElementIdx+1],
		})
	}
	return sortedList
}

type MinHeap []Item

func NewMinHeap(array []Item) *MinHeap {
	heap := MinHeap(array)
	ptr := &heap
	ptr.BuildHeap(array)
	return ptr
}

// O(n) time | O(1) space
func (h *MinHeap) BuildHeap(array []Item) {
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
		if childTwoIdx > -1 && (*h)[childTwoIdx].Num < (*h)[childOneIdx].Num {
			indexToSwap = childTwoIdx
		}
		if (*h)[indexToSwap].Num < (*h)[currentIndex].Num {
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
		current, parent := (*h)[currentIndex].Num, (*h)[parentIndex].Num
		if current < parent {
			h.swap(currentIndex, parentIndex)
			currentIndex = parentIndex
			parentIndex = (currentIndex - 1) / 2
		} else {
			return
		}
	}
}

// O(log(n)) time | O(1) space
func (h *MinHeap) Remove() Item {
	l := h.length()
	h.swap(0, l-1)
	peeked := (*h)[l-1]
	*h = (*h)[0 : l-1]
	h.siftDown(0, l-2)
	return peeked
}

// O(log(n)) time | O(1) space
func (h *MinHeap) Insert(value Item) {
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

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	arrays := [][]int{
		{1, 5, 9, 21},
		{-1, 0},
		{-124, 81, 121},
		{3, 6, 12, 20, 150},
	}
	expected := []int{-124, -1, 0, 1, 3, 5, 6, 9, 12, 20, 21, 81, 121, 150}
	actual := MergeSortedArrays(arrays)
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
    List<List<Integer>> arrays = new ArrayList<List<Integer>>();
    arrays.add(Arrays.asList(new Integer[] {1, 5, 9, 21}));
    arrays.add(Arrays.asList(new Integer[] {-1, 0}));
    arrays.add(Arrays.asList(new Integer[] {-124, 81, 121}));
    arrays.add(Arrays.asList(new Integer[] {3, 6, 12, 20, 150}));
    var actual = Program.mergeSortedArrays(arrays);
    var expected =
        Arrays.asList(new Integer[] {-124, -1, 0, 1, 3, 5, 6, 9, 12, 20, 21, 81, 121, 150});
    Utils.assertTrue(actual.equals(expected));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(nk) time | O(n + k) space - where n is the total
  // number of array elements and k is the number of arrays
  public static List<Integer> mergeSortedArrays(List<List<Integer>> arrays) {
    List<Integer> sortedList = new ArrayList<Integer>();
    List<Integer> elementIdxs = new ArrayList<Integer>(Collections.nCopies(arrays.size(), 0));
    while (true) {
      List<Item> smallestItems = new ArrayList<Item>();
      for (int arrayIdx = 0; arrayIdx < arrays.size(); arrayIdx++) {
        List<Integer> relevantArray = arrays.get(arrayIdx);
        int elementIdx = elementIdxs.get(arrayIdx);
        if (elementIdx == relevantArray.size()) continue;
        smallestItems.add(new Item(arrayIdx, relevantArray.get(elementIdx)));
      }
      if (smallestItems.size() == 0) break;
      Item nextItem = getMinValue(smallestItems);
      sortedList.add(nextItem.num);
      elementIdxs.set(nextItem.arrayIdx, elementIdxs.get(nextItem.arrayIdx) + 1);
    }

    return sortedList;
  }

  public static Item getMinValue(List<Item> items) {
    int minValueIdx = 0;
    for (int i = 1; i < items.size(); i++) {
      if (items.get(i).num < items.get(minValueIdx).num) minValueIdx = i;
    }
    return items.get(minValueIdx);
  }

  static class Item {
    public int arrayIdx;
    public int num;

    public Item(int arrayIdx, int num) {
      this.arrayIdx = arrayIdx;
      this.num = num;
    }
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(nlog(k) + k) time | O(n + k) space - where n is the total
  // number of array elements and k is the number of arrays
  public static List<Integer> mergeSortedArrays(List<List<Integer>> arrays) {
    List<Integer> sortedList = new ArrayList<Integer>();
    List<Item> smallestItems = new ArrayList<Item>();

    for (int arrayIdx = 0; arrayIdx < arrays.size(); arrayIdx++) {
      smallestItems.add(new Item(arrayIdx, 0, arrays.get(arrayIdx).get(0)));
    }

    MinHeap minHeap = new MinHeap(smallestItems);
    while (!minHeap.isEmpty()) {
      Item smallestItem = minHeap.remove();
      sortedList.add(smallestItem.num);
      if (smallestItem.elementIdx == arrays.get(smallestItem.arrayIdx).size() - 1) continue;
      minHeap.insert(
          new Item(
              smallestItem.arrayIdx,
              smallestItem.elementIdx + 1,
              arrays.get(smallestItem.arrayIdx).get(smallestItem.elementIdx + 1)));
    }

    return sortedList;
  }

  static class Item {
    public int arrayIdx;
    public int elementIdx;
    public int num;

    public Item(int arrayIdx, int elementIdx, int num) {
      this.arrayIdx = arrayIdx;
      this.elementIdx = elementIdx;
      this.num = num;
    }
  }

  static class MinHeap {
    List<Item> heap = new ArrayList<Item>();

    public MinHeap(List<Item> array) {
      heap = buildHeap(array);
    }

    public boolean isEmpty() {
      return heap.size() == 0;
    }

    public List<Item> buildHeap(List<Item> array) {
      int firstParentIdx = (array.size() - 2) / 2;
      for (int currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
        siftDown(currentIdx, array.size() - 1, array);
      }
      return array;
    }

    public void siftDown(int currentIdx, int endIdx, List<Item> heap) {
      int childOneIdx = currentIdx * 2 + 1;
      while (childOneIdx <= endIdx) {
        int childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
        int idxToSwap;
        if (childTwoIdx != -1 && heap.get(childTwoIdx).num < heap.get(childOneIdx).num) {
          idxToSwap = childTwoIdx;
        } else {
          idxToSwap = childOneIdx;
        }
        if (heap.get(idxToSwap).num < heap.get(currentIdx).num) {
          swap(currentIdx, idxToSwap, heap);
          currentIdx = idxToSwap;
          childOneIdx = currentIdx * 2 + 1;
        } else {
          return;
        }
      }
    }

    public void siftUp(int currentIdx, List<Item> heap) {
      int parentIdx = (currentIdx - 1) / 2;
      while (currentIdx > 0 && heap.get(currentIdx).num < heap.get(parentIdx).num) {
        swap(currentIdx, parentIdx, heap);
        currentIdx = parentIdx;
        parentIdx = (currentIdx - 1) / 2;
      }
    }

    public Item remove() {
      swap(0, heap.size() - 1, heap);
      Item valueToRemove = heap.get(heap.size() - 1);
      heap.remove(heap.size() - 1);
      siftDown(0, heap.size() - 1, heap);
      return valueToRemove;
    }

    public void insert(Item value) {
      heap.add(value);
      siftUp(heap.size() - 1, heap);
    }

    public void swap(int i, int j, List<Item> heap) {
      Item temp = heap.get(j);
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
    List<List<Integer>> arrays = new ArrayList<List<Integer>>();
    arrays.add(Arrays.asList(new Integer[] {1, 5, 9, 21}));
    arrays.add(Arrays.asList(new Integer[] {-1, 0}));
    arrays.add(Arrays.asList(new Integer[] {-124, 81, 121}));
    arrays.add(Arrays.asList(new Integer[] {3, 6, 12, 20, 150}));
    var actual = Program.mergeSortedArrays(arrays);
    var expected =
        Arrays.asList(new Integer[] {-124, -1, 0, 1, 3, 5, 6, 9, 12, 20, 21, 81, 121, 150});
    Utils.assertTrue(actual.equals(expected));
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
  const arrays = [
    [1, 5, 9, 21],
    [-1, 0],
    [-124, 81, 121],
    [3, 6, 12, 20, 150],
  ];
  const output = program.mergeSortedArrays(arrays);
  chai.expect(output).to.deep.equal([-124, -1, 0, 1, 3, 5, 6, 9, 12, 20, 21, 81, 121, 150]);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nk) time | O(n + k) space - where n is the total
// number of array elements and k is the number of arrays
function mergeSortedArrays(arrays) {
  const sortedList = [];
  const elementIdxs = arrays.map(() => 0);
  while (true) {
    const smallestItems = [];
    for (let arrayIdx = 0; arrayIdx < arrays.length; arrayIdx++) {
      const relevantArray = arrays[arrayIdx];
      const elementIdx = elementIdxs[arrayIdx];
      if (elementIdx === relevantArray.length) continue;
      smallestItems.push({
        arrayIdx,
        num: relevantArray[elementIdx],
      });
    }
    if (smallestItems.length === 0) break;
    const nextItem = getMinValue(smallestItems);
    sortedList.push(nextItem.num);
    elementIdxs[nextItem.arrayIdx]++;
  }
  return sortedList;
}

function getMinValue(items) {
  let minValueIdx = 0;
  for (let i = 1; i < items.length; i++) {
    if (items[i].num < items[minValueIdx].num) minValueIdx = i;
  }
  return items[minValueIdx];
}

exports.mergeSortedArrays = mergeSortedArrays;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlog(k) + k) time | O(n + k) space - where n is the total
// number of array elements and k is the number of arrays
function mergeSortedArrays(arrays) {
  const sortedList = [];
  const smallestItems = [];
  for (let arrayIdx = 0; arrayIdx < arrays.length; arrayIdx++) {
    smallestItems.push({
      arrayIdx,
      elementIdx: 0,
      num: arrays[arrayIdx][0],
    });
  }
  const minHeap = new MinHeap(smallestItems);
  while (!minHeap.isEmpty()) {
    const smallestItem = minHeap.remove();
    const {arrayIdx, elementIdx, num} = smallestItem;
    sortedList.push(num);
    if (elementIdx === arrays[arrayIdx].length - 1) continue;
    minHeap.insert({
      arrayIdx,
      elementIdx: elementIdx + 1,
      num: arrays[arrayIdx][elementIdx + 1],
    });
  }
  return sortedList;
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
      if (childTwoIdx !== -1 && heap[childTwoIdx].num < heap[childOneIdx].num) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }
      if (heap[idxToSwap].num < heap[currentIdx].num) {
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
    while (currentIdx > 0 && heap[currentIdx].num < heap[parentIdx].num) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
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

exports.mergeSortedArrays = mergeSortedArrays;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const arrays = [
    [1, 5, 9, 21],
    [-1, 0],
    [-124, 81, 121],
    [3, 6, 12, 20, 150],
  ];
  const output = program.mergeSortedArrays(arrays);
  chai.expect(output).to.deep.equal([-124, -1, 0, 1, 3, 5, 6, 9, 12, 20, 21, 81, 121, 150]);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.mergeSortedArrays as mergeSortedArrays

class ProgramTest {
    @Test
    fun TestCase1() {
        val arrays = listOf(
            listOf(1, 5, 9, 21),
            listOf(-1, 0),
            listOf(-124, 81, 121),
            listOf(3, 6, 12, 20, 150)
        )
        val output = mergeSortedArrays(arrays)
        assert(output == listOf(-124, -1, 0, 1, 3, 5, 6, 9, 12, 20, 21, 81, 121, 150))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

open class Item(arrayIdx: Int, num: Int) {
    val arrayIdx = arrayIdx
    val num = num
}

// O(nk) time | O(n + k) space - where n is the total
// number of array elements and k is the number of arrays
fun mergeSortedArrays(arrays: List<List<Int>>): List<Int> {
    val sortedList = mutableListOf<Int>()
    val elementIdxs = arrays.map() { 0 }.toMutableList()
    while (true) {
        val smallestItems = mutableListOf<Item>()
        for (arrayIdx in 0 until arrays.size) {
            val relevantArray = arrays[arrayIdx]
            val elementIdx = elementIdxs[arrayIdx]
            if (elementIdx == relevantArray.size) continue
            smallestItems.add(Item(arrayIdx, relevantArray[elementIdx]))
        }
        if (smallestItems.size == 0) break
        val nextItem = getMinValue(smallestItems)
        sortedList.add(nextItem.num)
        elementIdxs[nextItem.arrayIdx]++
    }
    return sortedList
}

fun getMinValue(items: List<Item>): Item {
    var minValueIdx = 0
    for (i in 1 until items.size) {
        if (items[i].num < items[minValueIdx].num) minValueIdx = i
    }
    return items[minValueIdx]
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

open class Item(arrayIdx: Int, elementIdx: Int, num: Int) {
    val arrayIdx = arrayIdx
    val elementIdx = elementIdx
    val num = num
}

// O(nlog(k) + k) time | O(n + k) space - where n is the total
// number of array elements and k is the number of arrays
fun mergeSortedArrays(arrays: List<List<Int>>): List<Int> {
    val sortedList = mutableListOf<Int>()
    val smallestItems = mutableListOf<Item>()
    for (arrayIdx in 0 until arrays.size) {
        smallestItems.add(Item(arrayIdx, 0, arrays[arrayIdx][0]))
    }
    val minHeap = MinHeap(smallestItems)
    while (!minHeap.isEmpty()) {
        val smallestItem = minHeap.remove()!!
        val arrayIdx = smallestItem.arrayIdx
        val elementIdx = smallestItem.elementIdx
        val num = smallestItem.num
        sortedList.add(num)
        if (elementIdx == arrays[arrayIdx].size - 1) continue
        minHeap.insert(Item(arrayIdx, elementIdx + 1, arrays[arrayIdx][elementIdx + 1]))
    }
    return sortedList
}

open class MinHeap(array: MutableList<Item>) {
    val heap = this.buildHeap(array)

    fun isEmpty(): Boolean {
        return this.heap.size == 0
    }

    fun buildHeap(array: MutableList<Item>): MutableList<Item> {
        val firstParentIdx = (array.size - 2) / 2
        for (currentIdx in firstParentIdx downTo 0) {
            this.siftDown(currentIdx, array.size - 1, array)
        }
        return array
    }

    fun siftDown(currentIdx: Int, endIdx: Int, heap: MutableList<Item>) {
        var newCurrentIdx = currentIdx
        var childOneIdx = currentIdx * 2 + 1
        while (childOneIdx <= endIdx) {
            var childTwoIdx = if (newCurrentIdx * 2 + 2 <= endIdx) newCurrentIdx * 2 + 2 else -1
            var idxToSwap: Int
            if (childTwoIdx != -1 && heap[childTwoIdx].num < heap[childOneIdx].num) {
                idxToSwap = childTwoIdx
            } else {
                idxToSwap = childOneIdx
            }
            if (heap[idxToSwap].num < heap[newCurrentIdx].num) {
                this.swap(newCurrentIdx, idxToSwap, heap)
                newCurrentIdx = idxToSwap
                childOneIdx = newCurrentIdx * 2 + 1
            } else {
                return
            }
        }
    }

    fun siftUp(currentIdx: Int, heap: MutableList<Item>) {
        var newCurrentIdx = currentIdx
        var parentIdx = (currentIdx - 1) / 2
        while (newCurrentIdx > 0 && heap[newCurrentIdx].num < heap[parentIdx].num) {
            this.swap(newCurrentIdx, parentIdx, heap)
            newCurrentIdx = parentIdx
            parentIdx = (newCurrentIdx - 1) / 2
        }
    }

    fun peek(): Item? {
        return this.heap[0]
    }

    fun remove(): Item? {
        this.swap(0, this.heap.size - 1, this.heap)
        val valueToRemove = this.heap.removeAt(this.heap.size - 1)
        this.siftDown(0, this.heap.size - 1, this.heap)
        return valueToRemove
    }

    fun insert(value: Item) {
        this.heap.add(value)
        this.siftUp(this.heap.size - 1, this.heap)
    }

    fun swap(i: Int, j: Int, heap: MutableList<Item>) {
        val temp = heap[j]
        heap[j] = heap[i]
        heap[i] = temp
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.mergeSortedArrays as mergeSortedArrays

class ProgramTest {
    @Test
    fun TestCase1() {
        val arrays = listOf(
            listOf(1, 5, 9, 21),
            listOf(-1, 0),
            listOf(-124, 81, 121),
            listOf(3, 6, 12, 20, 150)
        )
        val output = mergeSortedArrays(arrays)
        assert(output == listOf(-124, -1, 0, 1, 3, 5, 6, 9, 12, 20, 21, 81, 121, 150))
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
      var arrays = [
        [1, 5, 9, 21],
        [-1, 0],
        [-124, 81, 121],
        [3, 6, 12, 20, 150],
      ]
      var expected = [-124, -1, 0, 1, 3, 5, 6, 9, 12, 20, 21, 81, 121, 150]
      var actual = Program.mergeSortedArrays(arrays)
      try assert(expected == actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  struct Item {
    var arrayIdx: Int
    var num: Int
  }

  // O(nk) time | O(n + k) space - where n is the total
  // number of array elements and k is the number of arrays
  static func mergeSortedArrays(_ arrays: [[Int]]) -> [Int] {
    var sortedList = [Int]()
    var elementIdxs = [Int]()
    for el in arrays {
      elementIdxs.append(0)
    }

    while true {
      var smallestItems = [Item]()
      for arrayIdx in 0 ..< arrays.count {
        var relevantArray = arrays[arrayIdx]
        var elementIdx = elementIdxs[arrayIdx]
        if elementIdx == relevantArray.count {
          continue
        }
        smallestItems.append(Item(arrayIdx: arrayIdx, num: relevantArray[elementIdx]))
      }

      if smallestItems.count == 0 {
        break
      }
      var nextItem = getMinValue(&smallestItems)
      sortedList.append(nextItem.num)
      elementIdxs[nextItem.arrayIdx] += 1
    }
    return sortedList
  }

  static func getMinValue(_ items: inout [Item]) -> Item {
    var minValueItem = items[0]
    for i in 1 ..< items.count {
      if items[i].num < minValueItem.num {
        minValueItem = items[i]
      }
    }
    return minValueItem
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  struct Item {
    var arrayIdx: Int
    var elementIdx: Int
    var num: Int
  }

  // O(nlog(k) + k) time | O(n + k) space - where n is the total
  // number of array elements and k is the number of arrays
  static func mergeSortedArrays(_ arrays: [[Int]]) -> [Int] {
    var sortedList = [Int]()
    var smallestItems = [Item]()

    for arrayIdx in 0 ..< arrays.count {
      smallestItems.append(Item(arrayIdx: arrayIdx, elementIdx: 0, num: arrays[arrayIdx][0]))
    }

    var mh = MinHeap(array: smallestItems)
    while mh.length() != 0 {
      var smallestItem = mh.remove()
      sortedList.append(smallestItem.num)
      if smallestItem.elementIdx == arrays[smallestItem.arrayIdx].count - 1 {
        continue
      }
      mh.insert(Item(arrayIdx: smallestItem.arrayIdx, elementIdx: smallestItem.elementIdx + 1,
                     num: arrays[smallestItem.arrayIdx][smallestItem.elementIdx + 1]))
    }
    return sortedList
  }

  class MinHeap {
    var heap = [Item]()

    init(array: [Item]) {
      heap = array
      buildHeap(array: array)
    }

    // O(n) time | O(1) space
    func buildHeap(array: [Item]) {
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
        if childTwoIdx > -1, heap[childTwoIdx].num < heap[childOneIdx].num {
          indexToSwap = childTwoIdx
        }

        if heap[indexToSwap].num < heap[current].num {
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
        var current = heap[currentIndex].num
        var parent = heap[Int(parentIndex)].num
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
    func peek() -> Item {
      return heap[0]
    }

    // O(log(n)) time | O(1) space
    func remove() -> Item {
      var l = heap.count
      swap(firstIndex: 0, secondIndex: l - 1)
      var peeked = heap[l - 1]
      heap.removeLast()
      siftDown(currentIndex: 0, endIndex: l - 2)
      return peeked
    }

    // O(log(n)) time | O(1) space
    func insert(_ value: Item) {
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
    runTest("Test Case 1") { () throws -> Void in
      var arrays = [
        [1, 5, 9, 21],
        [-1, 0],
        [-124, 81, 121],
        [3, 6, 12, 20, 150],
      ]
      var expected = [-124, -1, 0, 1, 3, 5, 6, 9, 12, 20, 21, 81, 121, 150]
      var actual = Program.mergeSortedArrays(arrays)
      try assert(expected == actual)
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
        arrays = [
            [1, 5, 9, 21],
            [-1, 0],
            [-124, 81, 121],
            [3, 6, 12, 20, 150],
        ]
        output = program.mergeSortedArrays(arrays)
        self.assertEqual(output, [-124, -1, 0, 1, 3, 5, 6, 9, 12, 20, 21, 81, 121, 150])

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nk) time | O(n + k) space - where n is the total
# number of array elements and k is the number of arrays
def mergeSortedArrays(arrays):
    sortedList = []
    elementIdxs = [0 for array in arrays]
    while True:
        smallestItems = []
        for arrayIdx in range(len(arrays)):
            relevantArray = arrays[arrayIdx]
            elementIdx = elementIdxs[arrayIdx]
            if elementIdx == len(relevantArray):
                continue
            smallestItems.append({"arrayIdx": arrayIdx, "num": relevantArray[elementIdx]})
        if len(smallestItems) == 0:
            break
        nextItem = getMinValue(smallestItems)
        sortedList.append(nextItem["num"])
        elementIdxs[nextItem["arrayIdx"]] += 1
    return sortedList


def getMinValue(items):
    minValueIdx = 0
    for i in range(1, len(items)):
        if items[i]["num"] < items[minValueIdx]["num"]:
            minValueIdx = i
    return items[minValueIdx]

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nlog(k) + k) time | O(n + k) space - where n is the total
# number of array elements and k is the number of arrays
def mergeSortedArrays(arrays):
    sortedList = []
    smallestItems = []
    for arrayIdx in range(len(arrays)):
        smallestItems.append({"arrayIdx": arrayIdx, "elementIdx": 0, "num": arrays[arrayIdx][0]})
    minHeap = MinHeap(smallestItems)
    while not minHeap.isEmpty():
        smallestItem = minHeap.remove()
        arrayIdx, elementIdx, num = smallestItem["arrayIdx"], smallestItem["elementIdx"], smallestItem["num"]
        sortedList.append(num)
        if elementIdx == len(arrays[arrayIdx]) - 1:
            continue
        minHeap.insert({"arrayIdx": arrayIdx, "elementIdx": elementIdx + 1, "num": arrays[arrayIdx][elementIdx + 1]})
    return sortedList


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
            if childTwoIdx != -1 and heap[childTwoIdx]["num"] < heap[childOneIdx]["num"]:
                idxToSwap = childTwoIdx
            else:
                idxToSwap = childOneIdx
            if heap[idxToSwap]["num"] < heap[currentIdx]["num"]:
                self.swap(currentIdx, idxToSwap, heap)
                currentIdx = idxToSwap
                childOneIdx = currentIdx * 2 + 1
            else:
                return

    def siftUp(self, currentIdx, heap):
        parentIdx = (currentIdx - 1) // 2
        while currentIdx > 0 and heap[currentIdx]["num"] < heap[parentIdx]["num"]:
            self.swap(currentIdx, parentIdx, heap)
            currentIdx = parentIdx
            parentIdx = (currentIdx - 1) // 2

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
        arrays = [
            [1, 5, 9, 21],
            [-1, 0],
            [-124, 81, 121],
            [3, 6, 12, 20, 150],
        ]
        output = program.mergeSortedArrays(arrays)
        self.assertEqual(output, [-124, -1, 0, 1, 3, 5, 6, 9, 12, 20, 21, 81, 121, 150])

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const arrays = [
    [1, 5, 9, 21],
    [-1, 0],
    [-124, 81, 121],
    [3, 6, 12, 20, 150],
  ];
  const output = program.mergeSortedArrays(arrays);
  chai.expect(output).to.deep.equal([-124, -1, 0, 1, 3, 5, 6, 9, 12, 20, 21, 81, 121, 150]);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

interface Item {
  arrayIdx: number;
  num: number;
}

// O(nk) time | O(n + k) space - where n is the total
// number of array elements and k is the number of arrays
export function mergeSortedArrays(arrays: number[][]) {
  const sortedList: number[] = [];
  const elementIdxs = arrays.map(() => 0);
  while (true) {
    const smallestItems: Item[] = [];
    for (let arrayIdx = 0; arrayIdx < arrays.length; arrayIdx++) {
      const relevantArray = arrays[arrayIdx];
      const elementIdx = elementIdxs[arrayIdx];
      if (elementIdx === relevantArray.length) continue;
      smallestItems.push({
        arrayIdx,
        num: relevantArray[elementIdx],
      });
    }
    if (smallestItems.length === 0) break;
    const nextItem = getMinValue(smallestItems);
    sortedList.push(nextItem.num);
    elementIdxs[nextItem.arrayIdx]++;
  }
  return sortedList;
}

function getMinValue(items: Item[]) {
  let minValueIdx = 0;
  for (let i = 1; i < items.length; i++) {
    if (items[i].num < items[minValueIdx].num) minValueIdx = i;
  }
  return items[minValueIdx];
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

interface Item {
  arrayIdx: number;
  elementIdx: number;
  num: number;
}

// O(nlog(k) + k) time | O(n + k) space - where n is the total
// number of array elements and k is the number of arrays
export function mergeSortedArrays(arrays: number[][]) {
  const sortedList: number[] = [];
  const smallestItems: Item[] = [];
  for (let arrayIdx = 0; arrayIdx < arrays.length; arrayIdx++) {
    smallestItems.push({
      arrayIdx,
      elementIdx: 0,
      num: arrays[arrayIdx][0],
    });
  }
  const minHeap = new MinHeap(smallestItems);
  while (!minHeap.isEmpty()) {
    const smallestItem = minHeap.remove()!;
    const {arrayIdx, elementIdx, num} = smallestItem;
    sortedList.push(num);
    if (elementIdx === arrays[arrayIdx].length - 1) continue;
    minHeap.insert({
      arrayIdx,
      elementIdx: elementIdx + 1,
      num: arrays[arrayIdx][elementIdx + 1],
    });
  }
  return sortedList;
}

class MinHeap {
  heap: Item[];

  constructor(array: Item[]) {
    this.heap = this.buildHeap(array);
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  buildHeap(array: Item[]) {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array.length - 1, array);
    }
    return array;
  }

  siftDown(currentIdx: number, endIdx: number, heap: Item[]) {
    let childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let idxToSwap;
      if (childTwoIdx !== -1 && heap[childTwoIdx].num < heap[childOneIdx].num) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }
      if (heap[idxToSwap].num < heap[currentIdx].num) {
        this.swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  siftUp(currentIdx: number, heap: Item[]) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (currentIdx > 0 && heap[currentIdx].num < heap[parentIdx].num) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  remove() {
    this.swap(0, this.heap.length - 1, this.heap);
    const valueToRemove = this.heap.pop();
    this.siftDown(0, this.heap.length - 1, this.heap);
    return valueToRemove;
  }

  insert(value: Item) {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1, this.heap);
  }

  swap(i: number, j: number, heap: Item[]) {
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
  const arrays = [
    [1, 5, 9, 21],
    [-1, 0],
    [-124, 81, 121],
    [3, 6, 12, 20, 150],
  ];
  const output = program.mergeSortedArrays(arrays);
  chai.expect(output).to.deep.equal([-124, -1, 0, 1, 3, 5, 6, 9, 12, 20, 21, 81, 121, 150]);
});

```

