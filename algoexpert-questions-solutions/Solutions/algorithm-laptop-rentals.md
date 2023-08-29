# Laptop Rentals
<div class="html">
<p>
  You're given a list of time intervals during which students at a school need a
  laptop. These time intervals are represented by pairs of integers
  <span>[start, end]</span>, where <span>0 &lt;= start &lt; end</span>. However,
  <span>start</span> and <span>end</span> don't represent real times; therefore,
  they may be greater than <span>24</span>.
</p>
<p>
  No two students can use a laptop at the same time, but immediately after a
  student is done using a laptop, another student can use that same laptop. For
  example, if one student rents a laptop during the time interval
  <span>[0, 2]</span>, another student can rent the same laptop during any time
  interval starting with <span>2</span>.
</p>
<p>
  Write a function that returns the minimum number of laptops that the school
  needs to rent such that all students will always have access to a laptop when
  they need one.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">times</span> = 
[
  [0, 2],
  [1, 4],
  [4, 6],
  [0, 4],
  [7, 8],
  [9, 11],
  [3, 10],
]
</pre>
<h3>Sample Output</h3>
<pre>
3
</pre>
</div>

Hint 1
<p>
  There are many different ways to solve this problem, but only a few of them
  run in the optimal time. Can you come up with an algorithm that solves this
  problem in <span>O(nlog(n))</span> time?
</p>


Hint 2

<p>
  Suppose that you're given two time intervals: <span>[s1, e1]</span> and
  <span>[s2, e2]</span>, where <span>s1 &lt; s2</span>. If
  <span>e1 &lt;= s2</span>, then the second time interval can use the same
  laptop as the first time interval.
</p>
<p>
  One method to solve this problem with an optimal time complexity is to use a
  Min Heap. If you loop through time intervals that have been sorted by their
  start times and keep track of the smallest end time of time intervals for
  laptops that have already been rented out, you can determine how many laptops
  are required. Use the Min Heap to efficiency determine if any previous rental
  time intervals have ended as you loop through all the time intervals. If a
  rental time interval is done and another one starts after it, no extra laptop
  is required.
</p>


Hint 3

<p>
  Another way to efficiently solve this problem is to realize that we don't need
  to know what start time corresponds with what end time. So long as we know all
  start times and all end times, we can determine the number of laptops
  required.
</p>


Hint 4

<p>
  Start by creating two arrays—one for start times and one for end times—and
  sort them both in ascending order. We can simply loop through the start times
  and end times at the same time and compare the current start time to the
  current end time. If the current start time is greater than the current end
  time, then that means a laptop that was previously used is no longer being
  used and can be given to the student renting a laptop at this starting time.
  Thus, we can increment both our start-time and end-time pointers and continue
  without needing an additional laptop. If the current start time is smaller
  than the current end time, then another rental has started before a previous
  rental has ended, and we thus require another laptop, so we increment the
  start pointer and a variable keeping track of the number of laptops required.
  See the Conceptual Overview section of this question's video explanation for a
  more in-depth explanation.
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
      vector<vector<int>> input = {{0, 2}, {1, 4},  {4, 6}, {0, 4},
                                   {7, 8}, {9, 11}, {3, 10}};
      auto expected = 3;
      auto actual = laptopRentals(input);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

class MinHeap {
public:
  vector<vector<int>> *heap;

  MinHeap(vector<vector<int>> *vector) {
    heap = vector;
    buildHeap();
  }

  // O(n) time | O(1) space
  void buildHeap() {
    int firstParentIdx = (heap->size() - 2) / 2;
    for (int currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      siftDown(currentIdx, heap->size() - 1);
    }
  }

  // O(log(n)) time | O(1) space
  void siftDown(int currentIdx, int endIdx) {
    int childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      int childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      int idxToSwap;
      if (childTwoIdx != -1 &&
          heap->at(childTwoIdx)[1] < heap->at(childOneIdx)[1]) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }
      if (heap->at(idxToSwap)[1] < heap->at(currentIdx)[1]) {
        swap(heap->at(currentIdx), heap->at(idxToSwap));
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
    while (currentIdx > 0 && heap->at(currentIdx)[1] < heap->at(parentIdx)[1]) {
      swap(heap->at(currentIdx), heap->at(parentIdx));
      currentIdx = parentIdx;
      parentIdx = (currentIdx - 1) / 2;
    }
  }

  vector<int> peek() { return heap->at(0); }

  vector<int> remove() {
    swap(heap->at(0), heap->at(heap->size() - 1));
    vector<int> valueToRemove = heap->back();
    heap->pop_back();
    siftDown(0, heap->size() - 1);
    return valueToRemove;
  }

  void insert(vector<int> value) {
    heap->push_back(value);
    siftUp(heap->size() - 1);
  }
};

// O(nlog(n)) time | O(n) space - where n is the number of times
int laptopRentals(vector<vector<int>> times) {
  if (times.size() == 0)
    return 0;

  sort(times.begin(), times.end(),
       [](vector<int> a, vector<int> b) { return a[0] < b[0]; });

  vector<vector<int>> *timesWhenLaptopIsUsed =
      new vector<vector<int>>{times[0]};
  MinHeap *heap = new MinHeap(timesWhenLaptopIsUsed);

  for (int idx = 1; idx < times.size(); idx++) {
    vector<int> currentInterval = times[idx];
    if (heap->peek()[1] <= currentInterval[0])
      heap->remove();

    heap->insert(currentInterval);
  }

  return timesWhenLaptopIsUsed->size();
}
```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <algorithm>
using namespace std;

// O(nlog(n)) time | O(n) space - where n is the number of times
int laptopRentals(vector<vector<int>> times) {
  if (times.size() == 0)
    return 0;

  int usedLaptops = 0;
  vector<int> startTimes;
  vector<int> endTimes;

  for (auto interval : times) {
    startTimes.push_back(interval[0]);
    endTimes.push_back(interval[1]);
  }
  sort(startTimes.begin(), startTimes.end());
  sort(endTimes.begin(), endTimes.end());

  int startIterator = 0;
  int endIterator = 0;

  while (startIterator < times.size()) {
    if (startTimes[startIterator] >= endTimes[endIterator]) {
      usedLaptops--;
      endIterator++;
    }

    usedLaptops++;
    startIterator++;
  }

  return usedLaptops;
}
```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> input = {{0, 2}, {1, 4},  {4, 6}, {0, 4},
                                   {7, 8}, {9, 11}, {3, 10}};
      auto expected = 3;
      auto actual = laptopRentals(input);
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

using System.Collections.Generic;
using System.Linq;
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[][] times =
		  new int[][] {new int[] { 0, 2 }, new int[] { 1, 4 }, new int[] { 4, 6 },
			       new int[] { 0, 4 }, new int[] { 7, 8 }, new int[] { 9, 11 },
			       new int[] { 3, 10 } };
		List<List<int> > input = new List<List<int> >();
		foreach (var time in times) {
			input.Add(new List<int> {
				time[0], time[1]
			});
		}
		int expected = 3;
		var actual = new Program().LaptopRentals(input);
		Utils.AssertTrue(expected == actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System.Linq;
using System;


public class Program {

	// O(nlog(n)) time | O(n) space - where n is the number of times
	public int LaptopRentals(List<List<int> > times) {
		if (times.Count == 0) {
			return 0;
		}

		times.Sort((a, b) => a[0].CompareTo(b[0]));

		List<List<int> > timesWhenLaptopIsUsed = new List<List<int> >();
		timesWhenLaptopIsUsed.Add(times[0]);
		MinHeap heap = new MinHeap(timesWhenLaptopIsUsed);

		for (int idx = 1; idx < times.Count; idx++) {
			List<int> currentInterval = times[idx];
			if (heap.peek()[1] <= currentInterval[0]) {
				heap.remove();
			}
			heap.insert(currentInterval);
		}

		return timesWhenLaptopIsUsed.Count;
	}

	public class MinHeap {
		List<List<int> > heap = new List<List<int> >();

		public MinHeap(List<List<int> > array) {
			heap = buildHeap(array);
		}

		public List<List<int> > buildHeap(List<List<int> > array) {
			int firstParentIdx = (array.Count - 2) / 2;
			for (int currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
				siftDown(currentIdx, array.Count - 1, array);
			}
			return array;
		}

		public void siftDown(int currentIdx, int endIdx, List<List<int> > heap) {
			int newCurrentIdx = currentIdx;
			int childOneIdx = currentIdx * 2 + 1;
			while (childOneIdx <= endIdx) {
				int childTwoIdx =
				  (newCurrentIdx * 2 + 2 <= endIdx) ? newCurrentIdx * 2 + 2 : -1;
				int idxToSwap;
				if (childTwoIdx != -1 &&
				  heap[childTwoIdx][1] < heap[childOneIdx][1]) {
					idxToSwap = childTwoIdx;
				} else {
					idxToSwap = childOneIdx;
				}
				if (heap[idxToSwap][1] < heap[currentIdx][1]) {
					swap(newCurrentIdx, idxToSwap, heap);
					newCurrentIdx = idxToSwap;
					childOneIdx = newCurrentIdx * 2 + 1;
				} else {
					return;
				}
			}
		}

		public void siftUp(int currentIdx, List<List<int> > heap) {
			int newCurrentIdx = currentIdx;
			int parentIdx = (currentIdx - 1) / 2;
			while (newCurrentIdx > 0 && heap[newCurrentIdx][1] < heap[parentIdx][1]) {
				swap(newCurrentIdx, parentIdx, heap);
				newCurrentIdx = parentIdx;
				parentIdx = (newCurrentIdx - 1) / 2;
			}
		}

		public List<int> peek() {
			return heap[0];
		}

		public List<int> remove() {
			swap(0, heap.Count - 1, heap);
			List<int> valueToRemove = heap[heap.Count - 1];
			heap.RemoveAt(heap.Count - 1);
			siftDown(0, heap.Count - 1, heap);
			return valueToRemove;
		}

		public void insert(List<int> value) {
			heap.Add(value);
			siftUp(heap.Count - 1, heap);
		}

		public void swap(int i, int j, List<List<int> > heap) {
			List<int> temp = heap[j];
			heap[j] = heap[i];
			heap[i] = temp;
		}
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System.Linq;
using System;


public class Program {

	// O(nlog(n)) time | O(n) space - where n is the number of times
	public int LaptopRentals(List<List<int> > times) {
		if (times.Count == 0) {
			return 0;
		}

		int usedLaptops = 0;
		List<int> startTimes = new List<int>();
		List<int> endTimes = new List<int>();

		foreach (var interval in times) {
			startTimes.Add(interval[0]);
			endTimes.Add((interval[1]));
		}

		startTimes.Sort();
		endTimes.Sort();

		int startIterator = 0;
		int endIterator = 0;

		while (startIterator < times.Count) {
			if (startTimes[startIterator] >= endTimes[endIterator]) {
				usedLaptops -= 1;
				endIterator += 1;
			}

			usedLaptops += 1;
			startIterator += 1;
		}

		return usedLaptops;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;
using System.Linq;
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[][] times =
		  new int[][] {new int[] { 0, 2 }, new int[] { 1, 4 }, new int[] { 4, 6 },
			       new int[] { 0, 4 }, new int[] { 7, 8 }, new int[] { 9, 11 },
			       new int[] { 3, 10 } };
		List<List<int> > input = new List<List<int> >();
		foreach (var time in times) {
			input.Add(new List<int> {
				time[0], time[1]
			});
		}
		int expected = 3;
		var actual = new Program().LaptopRentals(input);
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
	input := [][]int{
		{0, 2},
		{1, 4},
		{4, 6},
		{0, 4},
		{7, 8},
		{9, 11},
		{3, 10},
	}
	expected := 3
	actual := LaptopRentals(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"sort"
)

// O(nlog(n)) time | O(n) space - where n is the number of times
func LaptopRentals(times [][]int) int {
	if len(times) == 0 {
		return 0
	}

	sort.Slice(times, func(i, j int) bool {
		return times[i][0] < times[j][0]
	})

	timesWhenLaptopIsUsed := [][]int{times[0]}
	heap := NewMinHeap(timesWhenLaptopIsUsed)

	for idx := 1; idx < len(times); idx++ {
		currentInterval := times[idx]
		if heap.Peek()[1] <= currentInterval[0] {
			heap.Remove()
		}

		heap.Insert(currentInterval)
	}
	return heap.Length()
}

type MinHeap [][]int

func NewMinHeap(array [][]int) *MinHeap {
	heap := MinHeap(array)
	ptr := &heap
	ptr.BuildHeap(array)
	return ptr
}

func (h *MinHeap) BuildHeap(array [][]int) {
	first := (len(array) - 2) / 2
	for currentIdx := first; currentIdx >= 0; currentIdx-- {
		h.siftDown(currentIdx, len(array)-1)
	}
}

func (h *MinHeap) siftDown(currentIdx, endIdx int) {
	childOneIdx := currentIdx*2 + 1
	for childOneIdx <= endIdx {
		childTwoIdx := -1
		if currentIdx*2+2 <= endIdx {
			childTwoIdx = currentIdx*2 + 2
		}
		indexToSwap := childOneIdx
		if childTwoIdx != -1 && (*h)[childTwoIdx][1] < (*h)[childOneIdx][1] {
			indexToSwap = childTwoIdx
		}
		if (*h)[indexToSwap][1] < (*h)[currentIdx][1] {
			h.swap(currentIdx, indexToSwap)
			currentIdx = indexToSwap
			childOneIdx = currentIdx*2 + 1
		} else {
			return
		}
	}
}

func (h *MinHeap) siftUp(currentIdx int) {
	parentIdx := (currentIdx - 1) / 2
	for currentIdx > 0 && (*h)[currentIdx][1] < (*h)[parentIdx][1] {
		h.swap(currentIdx, parentIdx)
		currentIdx = parentIdx
		parentIdx = (currentIdx - 1) / 2
	}
}

func (h *MinHeap) Peek() []int {
	return (*h)[0]
}

func (h *MinHeap) Remove() []int {
	h.swap(0, h.Length()-1)
	last := (*h)[h.Length()-1]
	*h = (*h)[:h.Length()-1]
	h.siftDown(0, h.Length()-1)
	return last
}

func (h *MinHeap) Insert(value []int) {
	*h = append(*h, value)
	h.siftUp(h.Length() - 1)
}

func (h *MinHeap) IsEmpty() bool {
	return len(*h) == 0
}

func (h *MinHeap) swap(i, j int) {
	(*h)[i], (*h)[j] = (*h)[j], (*h)[i]
}

func (h *MinHeap) Length() int {
	return len(*h)
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"sort"
)

// O(nlog(n)) time | O(n) space - where n is the number of times
func LaptopRentals(times [][]int) int {
	if len(times) == 0 {
		return 0
	}

	usedLaptops := 0
	startTimes, endTimes := []int{}, []int{}
	for _, time := range times {
		startTimes = append(startTimes, time[0])
		endTimes = append(endTimes, time[1])
	}
	sort.Ints(startTimes)
	sort.Ints(endTimes)

	startIterator := 0
	endIterator := 0

	for startIterator < len(times) {
		if startTimes[startIterator] >= endTimes[endIterator] {
			usedLaptops -= 1
			endIterator += 1
		}

		usedLaptops += 1
		startIterator += 1
	}
	return usedLaptops
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := [][]int{
		{0, 2},
		{1, 4},
		{4, 6},
		{0, 4},
		{7, 8},
		{9, 11},
		{3, 10},
	}
	expected := 3
	actual := LaptopRentals(input)
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
    int[][] times = new int[][] {{0, 2}, {1, 4}, {4, 6}, {0, 4}, {7, 8}, {9, 11}, {3, 10}};
    ArrayList<ArrayList<Integer>> input = new ArrayList<ArrayList<Integer>>();
    for (int[] time : times) {
      input.add(new ArrayList(Arrays.asList(time[0], time[1])));
    }
    int expected = 3;
    var actual = new Program().laptopRentals(input);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(nlog(n)) time | O(n) space - where n is the number of times
  public int laptopRentals(ArrayList<ArrayList<Integer>> times) {
    if (times.size() == 0) {
      return 0;
    }

    Collections.sort(times, (a, b) -> Integer.compare(a.get(0), b.get(0)));

    ArrayList<ArrayList<Integer>> timesWhenLaptopIsUsed = new ArrayList<ArrayList<Integer>>();
    timesWhenLaptopIsUsed.add(times.get(0));
    MinHeap heap = new MinHeap(timesWhenLaptopIsUsed);

    for (int idx = 1; idx < times.size(); idx++) {
      ArrayList<Integer> currentInterval = times.get(idx);
      if (heap.peek().get(1) <= currentInterval.get(0)) {
        heap.remove();
      }
      heap.insert(currentInterval);
    }

    return timesWhenLaptopIsUsed.size();
  }

  static class MinHeap {
    ArrayList<ArrayList<Integer>> heap = new ArrayList<ArrayList<Integer>>();

    public MinHeap(ArrayList<ArrayList<Integer>> array) {
      heap = buildHeap(array);
    }

    public ArrayList<ArrayList<Integer>> buildHeap(ArrayList<ArrayList<Integer>> array) {
      int firstParentIdx = (array.size() - 2) / 2;
      for (int currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
        siftDown(currentIdx, array.size() - 1, array);
      }
      return array;
    }

    public void siftDown(int currentIdx, int endIdx, ArrayList<ArrayList<Integer>> heap) {
      int newCurrentIdx = currentIdx;
      int childOneIdx = currentIdx * 2 + 1;
      while (childOneIdx <= endIdx) {
        int childTwoIdx = (newCurrentIdx * 2 + 2 <= endIdx) ? newCurrentIdx * 2 + 2 : -1;
        int idxToSwap;
        if (childTwoIdx != -1 && heap.get(childTwoIdx).get(1) < heap.get(childOneIdx).get(1)) {
          idxToSwap = childTwoIdx;
        } else {
          idxToSwap = childOneIdx;
        }
        if (heap.get(idxToSwap).get(1) < heap.get(currentIdx).get(1)) {
          swap(newCurrentIdx, idxToSwap, heap);
          newCurrentIdx = idxToSwap;
          childOneIdx = newCurrentIdx * 2 + 1;
        } else {
          return;
        }
      }
    }

    public void siftUp(int currentIdx, ArrayList<ArrayList<Integer>> heap) {
      int newCurrentIdx = currentIdx;
      int parentIdx = (currentIdx - 1) / 2;
      while (newCurrentIdx > 0 && heap.get(newCurrentIdx).get(1) < heap.get(parentIdx).get(1)) {
        swap(newCurrentIdx, parentIdx, heap);
        newCurrentIdx = parentIdx;
        parentIdx = (newCurrentIdx - 1) / 2;
      }
    }

    public ArrayList<Integer> peek() {
      return heap.get(0);
    }

    public ArrayList<Integer> remove() {
      swap(0, heap.size() - 1, heap);
      ArrayList<Integer> valueToRemove = heap.get(heap.size() - 1);
      heap.remove(heap.size() - 1);
      siftDown(0, heap.size() - 1, heap);
      return valueToRemove;
    }

    public void insert(ArrayList<Integer> value) {
      heap.add(value);
      siftUp(heap.size() - 1, heap);
    }

    public void swap(int i, int j, ArrayList<ArrayList<Integer>> heap) {
      ArrayList<Integer> temp = heap.get(j);
      heap.set(j, heap.get(i));
      heap.set(i, temp);
    }
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(nlog(n)) time | O(n) space - where n is the number of times
  public int laptopRentals(ArrayList<ArrayList<Integer>> times) {
    if (times.size() == 0) {
      return 0;
    }

    int usedLaptops = 0;
    ArrayList<Integer> startTimes = new ArrayList<Integer>();
    ArrayList<Integer> endTimes = new ArrayList<Integer>();

    for (ArrayList<Integer> interval : times) {
      startTimes.add(interval.get(0));
      endTimes.add((interval.get(1)));
    }

    Collections.sort(startTimes);
    Collections.sort(endTimes);

    int startIterator = 0;
    int endIterator = 0;

    while (startIterator < times.size()) {
      if (startTimes.get(startIterator) >= endTimes.get(endIterator)) {
        usedLaptops -= 1;
        endIterator += 1;
      }

      usedLaptops += 1;
      startIterator += 1;
    }

    return usedLaptops;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[][] times = new int[][] {{0, 2}, {1, 4}, {4, 6}, {0, 4}, {7, 8}, {9, 11}, {3, 10}};
    ArrayList<ArrayList<Integer>> input = new ArrayList<ArrayList<Integer>>();
    for (int[] time : times) {
      input.add(new ArrayList(Arrays.asList(time[0], time[1])));
    }
    int expected = 3;
    var actual = new Program().laptopRentals(input);
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
  const input = [
    [0, 2],
    [1, 4],
    [4, 6],
    [0, 4],
    [7, 8],
    [9, 11],
    [3, 10],
  ];
  const expected = 3;
  const actual = program.laptopRentals(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlog(n)) time | O(n) space - where n is the number of times
function laptopRentals(times) {
  if (times.length === 0) return 0;

  times.sort((a, b) => a[0] - b[0]);

  const timesWhenLaptopIsUsed = [times[0]];
  const heap = new MinHeap(timesWhenLaptopIsUsed);

  for (let idx = 1; idx < times.length; idx++) {
    const currentInterval = times[idx];
    if (heap.peek()[1] <= currentInterval[0]) heap.remove();

    heap.insert(currentInterval);
  }

  return timesWhenLaptopIsUsed.length;
}

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
      if (childTwoIdx !== -1 && heap[childTwoIdx][1] < heap[childOneIdx][1]) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }
      if (heap[idxToSwap][1] < heap[currentIdx][1]) {
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
    while (currentIdx > 0 && heap[currentIdx][1] < heap[parentIdx][1]) {
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

// Do not edit the lines below.
exports.laptopRentals = laptopRentals;
exports.MinHeap = MinHeap;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlog(n)) time | O(n) space - where n is the number of times
function laptopRentals(times) {
  if (times.length === 0) return 0;

  let usedLaptops = 0;
  const startTimes = times.map(a => a[0]).sort((a, b) => a - b);
  const endTimes = times.map(a => a[1]).sort((a, b) => a - b);

  let startIterator = 0;
  let endIterator = 0;

  while (startIterator < times.length) {
    if (startTimes[startIterator] >= endTimes[endIterator]) {
      usedLaptops--;
      endIterator++;
    }

    usedLaptops++;
    startIterator++;
  }

  return usedLaptops;
}

// Do not edit the line below.
exports.laptopRentals = laptopRentals;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [
    [0, 2],
    [1, 4],
    [4, 6],
    [0, 4],
    [7, 8],
    [9, 11],
    [3, 10],
  ];
  const expected = 3;
  const actual = program.laptopRentals(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.laptopRentals

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(
            listOf(0, 2),
            listOf(1, 4),
            listOf(4, 6),
            listOf(0, 4),
            listOf(7, 8),
            listOf(9, 11),
            listOf(3, 10)
        )
        val expected = 3
        val output = laptopRentals(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(nlog(n)) time | O(n) space - where n is the number of times
fun laptopRentals(times: List<List<Int>>): Int {
    if (times.size == 0) return 0

    val sortedTimes = times.toMutableList().sortedWith(Comparator<List<Int>> { a, b -> a[0].compareTo(b[0]) })

    val timesWhenLaptopIsUsed = mutableListOf(sortedTimes[0])
    val heap = MinHeap(timesWhenLaptopIsUsed)

    for (idx in 1 until sortedTimes.size) {
        val currentInterval = sortedTimes[idx]
        if (heap.peek()!![1] <= currentInterval[0]) heap.remove()

        heap.insert(currentInterval)
    }

    return timesWhenLaptopIsUsed.size
}

open class MinHeap(array: MutableList<List<Int>>) {
    val heap = this.buildHeap(array)

    fun isEmpty(): Boolean {
        return this.heap.size == 0
    }

    fun buildHeap(array: MutableList<List<Int>>): MutableList<List<Int>> {
        val firstParentIdx = (array.size - 2) / 2
        for (currentIdx in firstParentIdx downTo 0) {
            this.siftDown(currentIdx, array.size - 1, array)
        }
        return array
    }

    fun siftDown(currentIdx: Int, endIdx: Int, heap: MutableList<List<Int>>) {
        var newCurrentIdx = currentIdx
        var childOneIdx = currentIdx * 2 + 1
        while (childOneIdx <= endIdx) {
            var childTwoIdx = if (newCurrentIdx * 2 + 2 <= endIdx) newCurrentIdx * 2 + 2 else -1
            var idxToSwap: Int
            if (childTwoIdx != -1 && heap[childTwoIdx][1] < heap[childOneIdx][1]) {
                idxToSwap = childTwoIdx
            } else {
                idxToSwap = childOneIdx
            }
            if (heap[idxToSwap][1] < heap[newCurrentIdx][1]) {
                this.swap(newCurrentIdx, idxToSwap, heap)
                newCurrentIdx = idxToSwap
                childOneIdx = newCurrentIdx * 2 + 1
            } else {
                return
            }
        }
    }

    fun siftUp(currentIdx: Int, heap: MutableList<List<Int>>) {
        var newCurrentIdx = currentIdx
        var parentIdx = (currentIdx - 1) / 2
        while (newCurrentIdx > 0 && heap[newCurrentIdx][1] < heap[parentIdx][1]) {
            this.swap(newCurrentIdx, parentIdx, heap)
            newCurrentIdx = parentIdx
            parentIdx = (newCurrentIdx - 1) / 2
        }
    }

    fun peek(): List<Int>? {
        return this.heap[0]
    }

    fun remove(): List<Int>? {
        this.swap(0, this.heap.size - 1, this.heap)
        val valueToRemove = this.heap.removeAt(this.heap.size - 1)
        this.siftDown(0, this.heap.size - 1, this.heap)
        return valueToRemove
    }

    fun insert(value: List<Int>) {
        this.heap.add(value)
        this.siftUp(this.heap.size - 1, this.heap)
    }

    fun swap(i: Int, j: Int, heap: MutableList<List<Int>>) {
        val temp = heap[j]
        heap[j] = heap[i]
        heap[i] = temp
    }
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(nlog(n)) time | O(n) space - where n is the number of times
fun laptopRentals(times: List<List<Int>>): Int {
    if (times.size == 0) return 0

    var usedLaptops = 0
    val startTimes = times.map() { interval -> interval[0] }.toMutableList()
    startTimes.sort()
    val endTimes = times.map() { interval -> interval[1] }.toMutableList()
    endTimes.sort()

    var startIterator = 0
    var endIterator = 0

    while (startIterator < times.size) {
        if (startTimes[startIterator] >= endTimes[endIterator]) {
            usedLaptops -= 1
            endIterator += 1
        }

        usedLaptops += 1
        startIterator += 1
    }

    return usedLaptops
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.laptopRentals

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(
            listOf(0, 2),
            listOf(1, 4),
            listOf(4, 6),
            listOf(0, 4),
            listOf(7, 8),
            listOf(9, 11),
            listOf(3, 10)
        )
        val expected = 3
        val output = laptopRentals(input)
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
      let input = [
        [0, 2],
        [1, 4],
        [4, 6],
        [0, 4],
        [7, 8],
        [9, 11],
        [3, 10],
      ]
      var expected = 3
      var actual = Program().laptopRentals(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nlog(n)) time | O(n) space - where n is the number of times
  func laptopRentals(_ times: [[Int]]) -> Int {
    if times.count == 0 {
      return 0
    }

    let sortedTimes = times.sorted(by: { $0[0] < $1[0] })
    var timesWhenLaptopIsUsed = [sortedTimes[0]]

    var heap = MinHeap(timesWhenLaptopIsUsed)

    for idx in stride(from: 1, to: sortedTimes.count, by: 1) {
      let currentInterval = sortedTimes[idx]
      if heap.peek()[1] <= currentInterval[0] {
        heap.remove()
      }

      heap.insert(currentInterval)
    }
    return heap.length()
  }

  class MinHeap {
    var heap = [[Int]]()

    init(_ array: [[Int]]) {
      heap = array
      buildHeap(array: array)
    }

    func buildHeap(array: [[Int]]) {
      var firstParentIndex = Double((array.count - 2) / 2)
      firstParentIndex = firstParentIndex.rounded(.down)

      for var currentIndex in (0 ... Int(firstParentIndex)).reversed() {
        var endIndex = array.count - 1
        siftDown(currentIndex, endIndex)
      }
    }

    func siftDown(_ currentIndex: Int, _ endIndex: Int) {
      var childOneIdx = currentIndex * 2 + 1
      var current = currentIndex
      while childOneIdx <= endIndex {
        var childTwoIdx = -1
        if current * 2 + 2 <= endIndex {
          childTwoIdx = current * 2 + 2
        }
        var indexToSwap = childOneIdx
        if childTwoIdx != -1, heap[childTwoIdx][1] < heap[childOneIdx][1] {
          indexToSwap = childTwoIdx
        }

        if heap[indexToSwap][1] < heap[current][1] {
          swap(current, indexToSwap)
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

      while currentIndex > 0, heap[currentIndex][1] < heap[parentIndex][1] {
        swap(currentIndex, parentIndex)
        currentIndex = parentIndex
        parentIndex = (currentIndex - 1) / 2
      }
    }

    func peek() -> [Int] {
      return heap[0]
    }

    func remove() -> [Int] {
      var l = heap.count
      swap(0, l - 1)
      var peeked = heap[l - 1]
      heap.removeLast()
      siftDown(0, l - 2)
      return peeked
    }

    func insert(_ value: [Int]) {
      heap.append(value)
      siftUp()
    }

    func swap(_ firstIndex: Int, _ secondIndex: Int) {
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
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nlog(n)) time | O(n) space - where n is the number of times
  func laptopRentals(_ times: [[Int]]) -> Int {
    if times.count == 0 {
      return 0
    }

    var usedLaptops = 0
    var (startTimes, endTimes) = ([Int](), [Int]())
    for time in times {
      startTimes.append(time[0])
      endTimes.append(time[1])
    }
    startTimes.sort()
    endTimes.sort()

    var startIterator = 0
    var endIterator = 0

    while startIterator < times.count {
      if startTimes[startIterator] >= endTimes[endIterator] {
        usedLaptops -= 1
        endIterator += 1
      }

      usedLaptops += 1
      startIterator += 1
    }
    return usedLaptops
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let input = [
        [0, 2],
        [1, 4],
        [4, 6],
        [0, 4],
        [7, 8],
        [9, 11],
        [3, 10],
      ]
      var expected = 3
      var actual = Program().laptopRentals(input)
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
        input = [[0, 2], [1, 4], [4, 6], [0, 4], [7, 8], [9, 11], [3, 10]]
        expected = 3
        actual = program.laptopRentals(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nlog(n)) time | O(n) space - where n is the number of times
def laptopRentals(times):
    if len(times) == 0:
        return 0

    times.sort(key=lambda x: x[0])

    timesWhenLaptopIsUsed = [times[0]]
    heap = MinHeap(timesWhenLaptopIsUsed)

    for idx in range(1, len(times)):
        currentInterval = times[idx]
        if heap.peek()[1] <= currentInterval[0]:
            heap.remove()

        heap.insert(currentInterval)

    return len(timesWhenLaptopIsUsed)


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
            if childTwoIdx != -1 and heap[childTwoIdx][1] < heap[childOneIdx][1]:
                idxToSwap = childTwoIdx
            else:
                idxToSwap = childOneIdx
            if heap[idxToSwap][1] < heap[currentIdx][1]:
                self.swap(currentIdx, idxToSwap, heap)
                currentIdx = idxToSwap
                childOneIdx = currentIdx * 2 + 1
            else:
                return

    # O(log(n)) time | O(1) space
    def siftUp(self, currentIdx, heap):
        parentIdx = (currentIdx - 1) // 2
        while currentIdx > 0 and heap[currentIdx][1] < heap[parentIdx][1]:
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
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nlog(n)) time | O(n) space - where n is the number of times
def laptopRentals(times):
    if len(times) == 0:
        return 0

    usedLaptops = 0
    startTimes = sorted([interval[0] for interval in times])
    endTimes = sorted([interval[1] for interval in times])

    startIterator = 0
    endIterator = 0

    while startIterator < len(times):
        if startTimes[startIterator] >= endTimes[endIterator]:
            usedLaptops -= 1
            endIterator += 1

        usedLaptops += 1
        startIterator += 1

    return usedLaptops

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [[0, 2], [1, 4], [4, 6], [0, 4], [7, 8], [9, 11], [3, 10]]
        expected = 3
        actual = program.laptopRentals(input)
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
  const input = [
    [0, 2],
    [1, 4],
    [4, 6],
    [0, 4],
    [7, 8],
    [9, 11],
    [3, 10],
  ];
  const expected = 3;
  const actual = program.laptopRentals(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlog(n)) time | O(n) space - where n is the number of times
export function laptopRentals(times: number[][]) {
  if (times.length === 0) return 0;

  times.sort((a, b) => a[0] - b[0]);

  const timesWhenLaptopIsUsed = [times[0]];
  const heap = new MinHeap(timesWhenLaptopIsUsed);

  for (let idx = 1; idx < times.length; idx++) {
    const currentInterval = times[idx];
    if (heap.peek()[1] <= currentInterval[0]) heap.remove();

    heap.insert(currentInterval);
  }

  return timesWhenLaptopIsUsed.length;
}

class MinHeap {
  heap: number[][];

  constructor(array: number[][]) {
    this.heap = this.buildHeap(array);
  }

  // O(n) time | O(1) space
  buildHeap(array: number[][]) {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array.length - 1, array);
    }
    return array;
  }

  // O(log(n)) time | O(1) space
  siftDown(currentIdx: number, endIdx: number, heap: number[][]) {
    let childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let idxToSwap;
      if (childTwoIdx !== -1 && heap[childTwoIdx][1] < heap[childOneIdx][1]) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }
      if (heap[idxToSwap][1] < heap[currentIdx][1]) {
        this.swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  // O(log(n)) time | O(1) space
  siftUp(currentIdx: number, heap: number[][]) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (currentIdx > 0 && heap[currentIdx][1] < heap[parentIdx][1]) {
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
  insert(value: number[]) {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1, this.heap);
  }

  swap(i: number, j: number, heap: number[][]) {
    const temp = heap[j];
    heap[j] = heap[i];
    heap[i] = temp;
  }
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlog(n)) time | O(n) space - where n is the number of times
export function laptopRentals(times: number[][]) {
  if (times.length === 0) return 0;

  let usedLaptops = 0;
  const startTimes = times.map(a => a[0]).sort((a, b) => a - b);
  const endTimes = times.map(a => a[1]).sort((a, b) => a - b);

  let startIterator = 0;
  let endIterator = 0;

  while (startIterator < times.length) {
    if (startTimes[startIterator] >= endTimes[endIterator]) {
      usedLaptops--;
      endIterator++;
    }

    usedLaptops++;
    startIterator++;
  }

  return usedLaptops;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [
    [0, 2],
    [1, 4],
    [4, 6],
    [0, 4],
    [7, 8],
    [9, 11],
    [3, 10],
  ];
  const expected = 3;
  const actual = program.laptopRentals(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

