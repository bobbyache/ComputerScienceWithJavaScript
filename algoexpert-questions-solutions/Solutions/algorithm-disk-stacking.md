# Disk Stacking
<div class="html">
<p>
  You're given a non-empty array of arrays where each subarray holds three
  integers and represents a disk. These integers denote each disk's width,
  depth, and height, respectively. Your goal is to stack up the disks and to
  maximize the total height of the stack. A disk must have a strictly smaller
  width, depth, and height than any other disk below it.
</p>
<p>
  Write a function that returns an array of the disks in the final stack,
  starting with the top disk and ending with the bottom disk. Note that you
  can't rotate disks; in other words, the integers in each subarray must
  represent <span>[width, depth, height]</span> at all times.
</p>
<p>
  You can assume that there will only be one stack with the greatest total
  height.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">disks</span> = [[2, 1, 2], [3, 2, 3], [2, 2, 8], [2, 3, 4], [1, 3, 1], [4, 4, 5]]
</pre>
<h3>Sample Output</h3>
<pre>
[[2, 1, 2], [3, 2, 3], [4, 4, 5]]
<span class="CodeEditor-promptComment">// 10 (2 + 3 + 5) is the tallest height we can get by</span>
<span class="CodeEditor-promptComment">// stacking disks following the rules laid out above.</span>
</pre>
</div>

Hint 1
<p>
Try building an array of the same length as the array of disks. At each index i in this new array, store the height of the tallest tower that can be created with the disk located at index i at the bottom.
</p>


Hint 2

<p>
Consider sorting the disks by width, depth, or height for a slight optimization.
</p>


Hint 3

<p>
Can you efficiently keep track of potential towers in another array? Instead of storing entire sequences of disks, try storing the indices of previous disks. For example, at index 3 in this other array, store the index of the before-last disk in the tallest tower whose base is the disk at index 3.
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
      vector<vector<int>> input{{2, 1, 2}, {3, 2, 3}, {2, 2, 8},
                                {2, 3, 4}, {2, 2, 1}, {4, 4, 5}};
      vector<vector<int>> expected{{2, 1, 2}, {3, 2, 3}, {4, 4, 5}};
      assert(diskStacking(input) == expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

bool areValidDimensions(vector<int> o, vector<int> c);
vector<vector<int>> buildSequence(vector<vector<int>> array,
                                  vector<int> sequences, int currentIdx);

// O(n^2) time | O(n) space
vector<vector<int>> diskStacking(vector<vector<int>> disks) {
  sort(disks.begin(), disks.end(),
       [](vector<int> &a, vector<int> &b) { return a[2] < b[2]; });
  vector<int> heights;
  for (int i = 0; i < disks.size(); i++) {
    heights.push_back(disks[i][2]);
  }
  vector<int> sequences;
  for (int i = 0; i < disks.size(); i++) {
    sequences.push_back(INT_MIN);
  }
  int maxHeightIdx = 0;
  for (int i = 1; i < disks.size(); i++) {
    vector<int> currentDisk = disks[i];
    for (int j = 0; j < i; j++) {
      vector<int> otherDisk = disks[j];
      if (areValidDimensions(otherDisk, currentDisk)) {
        if (heights[i] <= currentDisk[2] + heights[j]) {
          heights[i] = currentDisk[2] + heights[j];
          sequences[i] = j;
        }
      }
    }
    if (heights[i] >= heights[maxHeightIdx]) {
      maxHeightIdx = i;
    }
  }
  return buildSequence(disks, sequences, maxHeightIdx);
}

bool areValidDimensions(vector<int> o, vector<int> c) {
  return o[0] < c[0] && o[1] < c[1] && o[2] < c[2];
}

vector<vector<int>> buildSequence(vector<vector<int>> array,
                                  vector<int> sequences, int currentIdx) {
  vector<vector<int>> sequence;
  while (currentIdx != INT_MIN) {
    sequence.insert(sequence.begin(), array[currentIdx]);
    currentIdx = sequences[currentIdx];
  }
  return sequence;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> input{{2, 1, 2}, {3, 2, 3}, {2, 2, 8},
                                {2, 3, 4}, {2, 2, 1}, {4, 4, 5}};
      vector<vector<int>> expected{{2, 1, 2}, {3, 2, 3}, {4, 4, 5}};
      assert(diskStacking(input) == expected);
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
		List<int[]> input = new List<int[]>();
		input.Add(new int[] {2, 1, 2});
		input.Add(new int[] {3, 2, 3});
		input.Add(new int[] {2, 2, 8});
		input.Add(new int[] {2, 3, 4});
		input.Add(new int[] {2, 2, 1});
		input.Add(new int[] {4, 4, 5});
		List<int[]> expected = new List<int[]>();
		expected.Add(new int[] {2, 1, 2});
		expected.Add(new int[] {3, 2, 3});
		expected.Add(new int[] {4, 4, 5});
		Utils.AssertTrue(compare(Program.DiskStacking(input), expected));
	}

	private static bool compare(List<int[]> arr1, List<int[]> arr2) {
		if (arr1.Count != arr2.Count) {
			return false;
		}
		for (int i = 0; i < arr1.Count; i++) {
			for (int j = 0; j < arr1[i].Length; j++) {
				if (!arr1[i][j].Equals(arr2[i][j])) {
					return false;
				}
			}
		}
		return true;
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;

public class Program {
	// O(n^2) time | O(n) space
	public static List<int[]> DiskStacking(List<int[]> disks) {
		disks.Sort((disk1, disk2) => disk1[2].CompareTo(disk2[2]));
		int[] heights = new int[disks.Count];
		for (int i = 0; i < disks.Count; i++) {
			heights[i] = disks[i][2];
		}
		int[] sequences = new int[disks.Count];
		for (int i = 0; i < disks.Count; i++) {
			sequences[i] = Int32.MinValue;
		}
		int maxHeightIdx = 0;
		for (int i = 1; i < disks.Count; i++) {
			int[] currentDisk = disks[i];
			for (int j = 0; j < i; j++) {
				int[] otherDisk = disks[j];
				if (areValidDimensions(otherDisk, currentDisk)) {
					if (heights[i] <= currentDisk[2] + heights[j]) {
						heights[i] = currentDisk[2] + heights[j];
						sequences[i] = j;
					}
				}
			}
			if (heights[i] >= heights[maxHeightIdx]) {
				maxHeightIdx = i;
			}
		}
		return buildSequence(disks, sequences, maxHeightIdx);
	}

	public static bool areValidDimensions(int[] o, int[] c) {
		return o[0] < c[0] && o[1] < c[1] && o[2] < c[2];
	}

	public static List<int[]> buildSequence(List<int[]> array, int[] sequences,
	  int currentIdx) {
		List<int[]> sequence = new List<int[]>();
		while (currentIdx != Int32.MinValue) {
			sequence.Insert(0, array[currentIdx]);
			currentIdx = sequences[currentIdx];
		}
		return sequence;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		List<int[]> input = new List<int[]>();
		input.Add(new int[] {2, 1, 2});
		input.Add(new int[] {3, 2, 3});
		input.Add(new int[] {2, 2, 8});
		input.Add(new int[] {2, 3, 4});
		input.Add(new int[] {2, 2, 1});
		input.Add(new int[] {4, 4, 5});
		List<int[]> expected = new List<int[]>();
		expected.Add(new int[] {2, 1, 2});
		expected.Add(new int[] {3, 2, 3});
		expected.Add(new int[] {4, 4, 5});
		Utils.AssertTrue(compare(Program.DiskStacking(input), expected));
	}

	private static bool compare(List<int[]> arr1, List<int[]> arr2) {
		if (arr1.Count != arr2.Count) {
			return false;
		}
		for (int i = 0; i < arr1.Count; i++) {
			for (int j = 0; j < arr1[i].Length; j++) {
				if (!arr1[i][j].Equals(arr2[i][j])) {
					return false;
				}
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

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := [][]int{{2, 1, 2}, {3, 2, 3}, {4, 4, 5}}
	input := [][]int{{2, 1, 2}, {3, 2, 3}, {2, 2, 8}, {2, 3, 4}, {2, 2, 1}, {4, 4, 5}}
	output := DiskStacking(input)
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "sort"

type Disk []int
type Disks []Disk

func (disks Disks) Len() int           { return len(disks) }
func (disks Disks) Swap(i, j int)      { disks[i], disks[j] = disks[j], disks[i] }
func (disks Disks) Less(i, j int) bool { return disks[i][2] < disks[j][2] }

// O(n^2) time | O(n) space
func DiskStacking(input [][]int) [][]int {
	disks := make(Disks, len(input))
	for i, disk := range input {
		disks[i] = disk
	}
	sort.Sort(disks)
	heights := make([]int, len(disks))
	sequences := make([]int, len(disks))
	for i := range disks {
		heights[i] = disks[i][2]
		sequences[i] = -1
	}
	for i := 1; i < len(disks); i++ {
		disk := disks[i]
		for j := 0; j < i; j++ {
			other := disks[j]
			// If the conditions of disk stacking are met
			if areValidDimensions(other, disk) {
				// If it's an increase in size
				if heights[i] <= disk[2]+heights[j] {
					heights[i] = disk[2] + heights[j]
					sequences[i] = j
				}
			}
		}
	}
	maxIndex := 0
	for i, height := range heights {
		if height >= heights[maxIndex] {
			maxIndex = i
		}
	}
	sequence := buildSequence(disks, sequences, maxIndex)
	return sequence
}

func areValidDimensions(o Disk, c Disk) bool {
	return o[0] < c[0] && o[1] < c[1] && o[2] < c[2]
}

func buildSequence(array []Disk, sequences []int, index int) [][]int {
	out := [][]int{}
	for index != -1 {
		out = append(out, array[index])
		index = sequences[index]
	}
	reverse(out)
	return out
}

func reverse(numbers [][]int) {
	for i, j := 0, len(numbers)-1; i < j; i, j = i+1, j-1 {
		numbers[i], numbers[j] = numbers[j], numbers[i]
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
	expected := [][]int{{2, 1, 2}, {3, 2, 3}, {4, 4, 5}}
	input := [][]int{{2, 1, 2}, {3, 2, 3}, {2, 2, 8}, {2, 3, 4}, {2, 2, 1}, {4, 4, 5}}
	output := DiskStacking(input)
	require.Equal(t, expected, output)
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
    List<Integer[]> input = new ArrayList<Integer[]>();
    input.add(new Integer[] {2, 1, 2});
    input.add(new Integer[] {3, 2, 3});
    input.add(new Integer[] {2, 2, 8});
    input.add(new Integer[] {2, 3, 4});
    input.add(new Integer[] {2, 2, 1});
    input.add(new Integer[] {4, 4, 5});
    List<Integer[]> expected = new ArrayList<Integer[]>();
    expected.add(new Integer[] {2, 1, 2});
    expected.add(new Integer[] {3, 2, 3});
    expected.add(new Integer[] {4, 4, 5});
    Utils.assertTrue(compare(Program.diskStacking(input), expected));
  }

  private static boolean compare(List<Integer[]> arr1, List<Integer[]> arr2) {
    if (arr1.size() != arr2.size()) {
      return false;
    }
    for (int i = 0; i < arr1.size(); i++) {
      for (int j = 0; j < arr1.get(i).length; j++) {
        if (!arr1.get(i)[j].equals(arr2.get(i)[j])) {
          return false;
        }
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
  // O(n^2) time | O(n) space
  public static List<Integer[]> diskStacking(List<Integer[]> disks) {
    disks.sort((disk1, disk2) -> disk1[2].compareTo(disk2[2]));
    int[] heights = new int[disks.size()];
    for (int i = 0; i < disks.size(); i++) {
      heights[i] = disks.get(i)[2];
    }
    int[] sequences = new int[disks.size()];
    for (int i = 0; i < disks.size(); i++) {
      sequences[i] = Integer.MIN_VALUE;
    }
    int maxHeightIdx = 0;
    for (int i = 1; i < disks.size(); i++) {
      Integer[] currentDisk = disks.get(i);
      for (int j = 0; j < i; j++) {
        Integer[] otherDisk = disks.get(j);
        if (areValidDimensions(otherDisk, currentDisk)) {
          if (heights[i] <= currentDisk[2] + heights[j]) {
            heights[i] = currentDisk[2] + heights[j];
            sequences[i] = j;
          }
        }
      }
      if (heights[i] >= heights[maxHeightIdx]) {
        maxHeightIdx = i;
      }
    }
    return buildSequence(disks, sequences, maxHeightIdx);
  }

  public static boolean areValidDimensions(Integer[] o, Integer[] c) {
    return o[0] < c[0] && o[1] < c[1] && o[2] < c[2];
  }

  public static List<Integer[]> buildSequence(
      List<Integer[]> array, int[] sequences, int currentIdx) {
    List<Integer[]> sequence = new ArrayList<Integer[]>();
    while (currentIdx != Integer.MIN_VALUE) {
      sequence.add(0, array.get(currentIdx));
      currentIdx = sequences[currentIdx];
    }
    return sequence;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    List<Integer[]> input = new ArrayList<Integer[]>();
    input.add(new Integer[] {2, 1, 2});
    input.add(new Integer[] {3, 2, 3});
    input.add(new Integer[] {2, 2, 8});
    input.add(new Integer[] {2, 3, 4});
    input.add(new Integer[] {2, 2, 1});
    input.add(new Integer[] {4, 4, 5});
    List<Integer[]> expected = new ArrayList<Integer[]>();
    expected.add(new Integer[] {2, 1, 2});
    expected.add(new Integer[] {3, 2, 3});
    expected.add(new Integer[] {4, 4, 5});
    Utils.assertTrue(compare(Program.diskStacking(input), expected));
  }

  private static boolean compare(List<Integer[]> arr1, List<Integer[]> arr2) {
    if (arr1.size() != arr2.size()) {
      return false;
    }
    for (int i = 0; i < arr1.size(); i++) {
      for (int j = 0; j < arr1.get(i).length; j++) {
        if (!arr1.get(i)[j].equals(arr2.get(i)[j])) {
          return false;
        }
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

it('Test Case #1', function () {
  chai
    .expect(
      program.diskStacking([
        [2, 1, 2],
        [3, 2, 3],
        [2, 2, 8],
        [2, 3, 4],
        [2, 2, 1],
        [4, 4, 5],
      ]),
    )
    .to.deep.equal([
      [2, 1, 2],
      [3, 2, 3],
      [4, 4, 5],
    ]);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space
function diskStacking(disks) {
  disks.sort((a, b) => a[2] - b[2]);
  const heights = disks.map(disk => disk[2]);
  const sequences = new Array(disks.length);
  let maxHeightIdx = 0;
  for (let i = 1; i < disks.length; i++) {
    const currentDisk = disks[i];
    for (let j = 0; j < i; j++) {
      const otherDisk = disks[j];
      if (areValidDimensions(otherDisk, currentDisk)) {
        if (heights[i] <= currentDisk[2] + heights[j]) {
          heights[i] = currentDisk[2] + heights[j];
          sequences[i] = j;
        }
      }
    }
    if (heights[i] >= heights[maxHeightIdx]) maxHeightIdx = i;
  }
  return buildSequence(disks, sequences, maxHeightIdx);
}

function areValidDimensions(o, c) {
  return o[0] < c[0] && o[1] < c[1] && o[2] < c[2];
}

function buildSequence(array, sequences, currentIdx) {
  const sequence = [];
  while (currentIdx !== undefined) {
    sequence.unshift(array[currentIdx]);
    currentIdx = sequences[currentIdx];
  }
  return sequence;
}

exports.diskStacking = diskStacking;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai
    .expect(
      program.diskStacking([
        [2, 1, 2],
        [3, 2, 3],
        [2, 2, 8],
        [2, 3, 4],
        [2, 2, 1],
        [4, 4, 5],
      ]),
    )
    .to.deep.equal([
      [2, 1, 2],
      [3, 2, 3],
      [4, 4, 5],
    ]);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.diskStacking

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(
            listOf(2, 1, 2),
            listOf(3, 2, 3),
            listOf(2, 2, 8),
            listOf(2, 3, 4),
            listOf(2, 2, 1),
            listOf(4, 4, 5)
        )
        val expected = listOf(
            listOf(2, 1, 2),
            listOf(3, 2, 3),
            listOf(4, 4, 5)
        )
        val output = diskStacking(input)
        assert(compare(expected, output))
    }

    fun compare(arr1: List<List<Int>>, arr2: List<List<Int>>): Boolean {
        if (arr1.size != arr2.size) return false

        for (i in 0 until arr1.size) {
            if (!arr1[i].equals(arr2[i])) return false
        }
        return true
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^2) time | O(n) space
fun diskStacking(inputDisks: List<List<Int>>): List<List<Int>> {
    val disks = inputDisks.toMutableList().sortedWith(Comparator<List<Int>> { a, b -> a[2].compareTo(b[2]) })

    val heights = MutableList(disks.size) { -1 }
    for (i in 0 until disks.size) {
        heights[i] = disks[i][2]
    }

    val sequences = MutableList(disks.size) { Int.MIN_VALUE }
    var maxHeightIdx = 0
    for (i in 1 until disks.size) {
        val currentDisk = disks[i]
        for (j in 0 until i) {
            val otherDisk = disks[j]
            if (areValidDimensions(otherDisk, currentDisk)) {
                if (heights[i] <= currentDisk[2] + heights[j]) {
                    heights[i] = currentDisk[2] + heights[j]
                    sequences[i] = j
                }
            }
        }
        if (heights[i] >= heights[maxHeightIdx]) {
            maxHeightIdx = i
        }
    }
    return buildSequence(disks, sequences, maxHeightIdx)
}

fun areValidDimensions(o: List<Int>, c: List<Int>): Boolean {
    return o[0] < c[0] && o[1] < c[1] && o[2] < c[2]
}

fun buildSequence(array: List<List<Int>>, sequences: List<Int>, startIdx: Int): List<List<Int>> {
    val sequence = mutableListOf<List<Int>>()
    var currentIdx = startIdx
    while (currentIdx != Int.MIN_VALUE) {
        sequence.add(0, array[currentIdx])
        currentIdx = sequences[currentIdx]
    }
    return sequence
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.diskStacking

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(
            listOf(2, 1, 2),
            listOf(3, 2, 3),
            listOf(2, 2, 8),
            listOf(2, 3, 4),
            listOf(2, 2, 1),
            listOf(4, 4, 5)
        )
        val expected = listOf(
            listOf(2, 1, 2),
            listOf(3, 2, 3),
            listOf(4, 4, 5)
        )
        val output = diskStacking(input)
        assert(compare(expected, output))
    }

    fun compare(arr1: List<List<Int>>, arr2: List<List<Int>>): Boolean {
        if (arr1.size != arr2.size) return false

        for (i in 0 until arr1.size) {
            if (!arr1[i].equals(arr2[i])) return false
        }
        return true
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
      var fifthTest = [[2, 1, 2], [3, 2, 3], [2, 2, 8], [2, 3, 4], [2, 2, 1], [4, 4, 5]]
      let fifthExpectedResults = [[2, 1, 2], [3, 2, 3], [4, 4, 5]]
      try assertEqual(fifthExpectedResults, program.diskStacking(disks: &fifthTest))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(n) space
  func diskStacking(disks: inout [[Int]]) -> [[Int]] {
    disks.sort(by: { $0[2] < $1[2] })

    var heights = disks.map { $0[2] }
    var previousIndices = Array(repeating: -1, count: disks.count)
    var maximumHeightIndex = 0

    for i in 1 ..< disks.count {
      let currentDisk = disks[i]

      for j in 0 ..< i {
        let previousDisk = disks[j]

        if areValidDimensions(previousDisk, currentDisk) {
          if heights[i] <= heights[j] + currentDisk[2] {
            heights[i] = heights[j] + currentDisk[2]
            previousIndices[i] = j
          }
        }
      }

      if heights[i] >= heights[maximumHeightIndex] {
        maximumHeightIndex = i
      }
    }

    return buildSequence(disks, previousIndices, &maximumHeightIndex)
  }

  func areValidDimensions(_ previousDisk: [Int], _ currentDisk: [Int]) -> Bool {
    return previousDisk[0] < currentDisk[0] && previousDisk[1] < currentDisk[1] && previousDisk[2] < currentDisk[2]
  }

  func buildSequence(_ disks: [[Int]], _ previousIndices: [Int], _ currentIndex: inout Int) -> [[Int]] {
    var sequence = [[Int]]()

    while currentIndex != -1 {
      sequence.insert(disks[currentIndex], at: 0)
      currentIndex = previousIndices[currentIndex]
    }

    return sequence
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      var fifthTest = [[2, 1, 2], [3, 2, 3], [2, 2, 8], [2, 3, 4], [2, 2, 1], [4, 4, 5]]
      let fifthExpectedResults = [[2, 1, 2], [3, 2, 3], [4, 4, 5]]
      try assertEqual(fifthExpectedResults, program.diskStacking(disks: &fifthTest))
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
        self.assertEqual(
            program.diskStacking([[2, 1, 2], [3, 2, 3], [2, 2, 8], [2, 3, 4], [2, 2, 1], [4, 4, 5]]),
            [[2, 1, 2], [3, 2, 3], [4, 4, 5]],
        )

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n) space
def diskStacking(disks):
    disks.sort(key=lambda disk: disk[2])
    heights = [disk[2] for disk in disks]
    sequences = [None for disk in disks]
    maxHeightIdx = 0
    for i in range(1, len(disks)):
        currentDisk = disks[i]
        for j in range(0, i):
            otherDisk = disks[j]
            if areValidDimensions(otherDisk, currentDisk):
                if heights[i] <= currentDisk[2] + heights[j]:
                    heights[i] = currentDisk[2] + heights[j]
                    sequences[i] = j
        if heights[i] >= heights[maxHeightIdx]:
            maxHeightIdx = i
    return buildSequence(disks, sequences, maxHeightIdx)


def areValidDimensions(o, c):
    return o[0] < c[0] and o[1] < c[1] and o[2] < c[2]


def buildSequence(array, sequences, currentIdx):
    sequence = []
    while currentIdx is not None:
        sequence.append(array[currentIdx])
        currentIdx = sequences[currentIdx]
    return list(reversed(sequence))

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(
            program.diskStacking([[2, 1, 2], [3, 2, 3], [2, 2, 8], [2, 3, 4], [2, 2, 1], [4, 4, 5]]),
            [[2, 1, 2], [3, 2, 3], [4, 4, 5]],
        )

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai
    .expect(
      program.diskStacking([
        [2, 1, 2],
        [3, 2, 3],
        [2, 2, 8],
        [2, 3, 4],
        [2, 2, 1],
        [4, 4, 5],
      ]),
    )
    .to.deep.equal([
      [2, 1, 2],
      [3, 2, 3],
      [4, 4, 5],
    ]);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

type Disk = [number, number, number];

// O(n^2) time | O(n) space
export function diskStacking(disks: Disk[]) {
  disks.sort((a, b) => a[2] - b[2]);
  const heights = disks.map(disk => disk[2]);
  const sequences: number[] = new Array(disks.length);
  let maxHeightIdx = 0;
  for (let i = 1; i < disks.length; i++) {
    const currentDisk = disks[i];
    for (let j = 0; j < i; j++) {
      const otherDisk = disks[j];
      if (areValidDimensions(otherDisk, currentDisk)) {
        if (heights[i] <= currentDisk[2] + heights[j]) {
          heights[i] = currentDisk[2] + heights[j];
          sequences[i] = j;
        }
      }
    }
    if (heights[i] >= heights[maxHeightIdx]) maxHeightIdx = i;
  }
  return buildSequence(disks, sequences, maxHeightIdx);
}

function areValidDimensions(o: Disk, c: Disk) {
  return o[0] < c[0] && o[1] < c[1] && o[2] < c[2];
}

function buildSequence(array: Disk[], sequences: number[], currentIdx: number) {
  const sequence: Disk[] = [];
  while (currentIdx !== undefined) {
    sequence.unshift(array[currentIdx]);
    currentIdx = sequences[currentIdx];
  }
  return sequence;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai
    .expect(
      program.diskStacking([
        [2, 1, 2],
        [3, 2, 3],
        [2, 2, 8],
        [2, 3, 4],
        [2, 2, 1],
        [4, 4, 5],
      ]),
    )
    .to.deep.equal([
      [2, 1, 2],
      [3, 2, 3],
      [4, 4, 5],
    ]);
});

```

