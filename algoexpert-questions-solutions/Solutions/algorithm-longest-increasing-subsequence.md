# Longest Increasing Subsequence
<div class="html">
<p>
  Given a non-empty array of integers, write a function that returns the longest
  strictly-increasing subsequence in the array.
</p>
<p>
  A subsequence of an array is a set of numbers that aren't necessarily adjacent
  in the array but that are in the same order as they appear in the array. For
  instance, the numbers <span>[1, 3, 4]</span> form a subsequence of the array
  <span>[1, 2, 3, 4]</span>, and so do the numbers <span>[2, 4]</span>. Note
  that a single number in an array and the array itself are both valid
  subsequences of the array.
</p>
<p>
  You can assume that there will only be one longest increasing subsequence.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35]
</pre>
<h3>Sample Output</h3>
<pre>
[-24, 2, 3, 5, 6, 35]
</pre>
</div>

Hint 1
<p>
Try building an array of the same length as the input array. At each index in this new array, store the length of the longest increasing subsequence ending with the number found at that index in the input array.
</p>


Hint 2

<p>
Can you efficiently keep track of potential sequences in another array? Instead of storing entire sequences, try storing the indices of previous numbers. For example, at index 3 in this other array, store the index of the before-last number in the longest increasing subsequence ending with the number at index 3.
</p>


Hint 3

<p>
You can optimize your algorithm by taking a slightly different approach. Instead of building the array mentioned in Hint #1, try building an array whose indices represent lengths of subsequences and whose values represent the smallest numbers in the input array that can end a subsequence of a given length. Traverse the input array, and for each number determine what the length L of the longest increasing subsequence ending with that number is; store the position of that number at index L in the new array that you're building. Find a way to use binary search to build this array.
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
      vector<int> expected{-24, 2, 3, 5, 6, 35};
      vector<int> input{5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35};
      assert(longestIncreasingSubsequence(input) == expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <climits>
using namespace std;

vector<int> buildSequence(vector<int> array, vector<int> sequences,
                          int currentIdx);

// O(n^2) time | O(n) space
vector<int> longestIncreasingSubsequence(vector<int> array) {
  vector<int> sequences(array.size(), INT_MIN);
  vector<int> lengths(array.size(), 1);
  int maxLengthIdx = 0;
  for (int i = 0; i < array.size(); i++) {
    int currentNum = array[i];
    for (int j = 0; j < i; j++) {
      int otherNum = array[j];
      if (otherNum < currentNum && lengths[j] + 1 >= lengths[i]) {
        lengths[i] = lengths[j] + 1;
        sequences[i] = j;
      }
    }
    if (lengths[i] >= lengths[maxLengthIdx]) {
      maxLengthIdx = i;
    }
  }
  return buildSequence(array, sequences, maxLengthIdx);
}

vector<int> buildSequence(vector<int> array, vector<int> sequences,
                          int currentIdx) {
  vector<int> sequence;
  while (currentIdx != INT_MIN) {
    sequence.insert(sequence.begin(), array[currentIdx]);
    currentIdx = sequences[currentIdx];
  }
  return sequence;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <climits>
using namespace std;

int binarySearch(int startIdx, int endIdx, vector<int> &indices,
                 vector<int> &array, int num);
vector<int> buildSequence(vector<int> array, vector<int> sequences,
                          int currentIdx);

// O(nlogn) time | O(n) space
vector<int> longestIncreasingSubsequence(vector<int> array) {
  vector<int> sequences(array.size(), 0);
  vector<int> indices(array.size() + 1, INT_MIN);
  int length = 0;
  for (int i = 0; i < array.size(); i++) {
    int num = array[i];
    int newLength = binarySearch(1, length, indices, array, num);
    sequences[i] = indices[newLength - 1];
    indices[newLength] = i;
    length = max(length, newLength);
  }
  return buildSequence(array, sequences, indices[length]);
}

int binarySearch(int startIdx, int endIdx, vector<int> &indices,
                 vector<int> &array, int num) {
  if (startIdx > endIdx) {
    return startIdx;
  }
  int middleIdx = (startIdx + endIdx) / 2;
  if (array[indices[middleIdx]] < num) {
    startIdx = middleIdx + 1;
  } else {
    endIdx = middleIdx - 1;
  }
  return binarySearch(startIdx, endIdx, indices, array, num);
}

vector<int> buildSequence(vector<int> array, vector<int> sequences,
                          int currentIdx) {
  vector<int> sequence;
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
      vector<int> expected{-24, 2, 3, 5, 6, 35};
      vector<int> input{5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35};
      assert(longestIncreasingSubsequence(input) == expected);
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
		int[] expected = {-24, 2, 3, 5, 6, 35};
		Utils.AssertTrue(compare(Program.LongestIncreasingSubsequence(new int[] {5, 7, -24,
		                                                                         12, 10, 2,
		                                                                         3, 12, 5,
		                                                                         6, 35}),
		  expected));
	}

	public static bool compare(List<int> arr1, int[] arr2) {
		if (arr1.Count != arr2.Length) {
			return false;
		}
		for (int i = 0; i < arr1.Count; i++) {
			if (arr1[i] != arr2[i]) {
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

using System;
using System.Collections.Generic;

public class Program {
	// O(n^2) time | O(n) space
	public static List<int> LongestIncreasingSubsequence(int[] array) {
		int[] sequences = new int[array.Length];
		Array.Fill(sequences, Int32.MinValue);
		int[] lengths = new int[array.Length];
		Array.Fill(lengths, 1);
		int maxLengthIdx = 0;
		for (int i = 0; i < array.Length; i++) {
			int currentNum = array[i];
			for (int j = 0; j < i; j++) {
				int otherNum = array[j];
				if (otherNum < currentNum && lengths[j] + 1 >= lengths[i]) {
					lengths[i] = lengths[j] + 1;
					sequences[i] = j;
				}
			}
			if (lengths[i] >= lengths[maxLengthIdx]) {
				maxLengthIdx = i;
			}
		}
		return buildSequence(array, sequences, maxLengthIdx);
	}

	public static List<int> buildSequence(int[] array, int[] sequences, int currentIdx) {
		List<int> sequence = new List<int>();
		while (currentIdx != Int32.MinValue) {
			sequence.Insert(0, array[currentIdx]);
			currentIdx = sequences[currentIdx];
		}
		return sequence;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;

public class Program {
	// O(nlogn) time | O(n) space
	public static List<int> LongestIncreasingSubsequence(int[] array) {
		int[] sequences = new int[array.Length];
		int[] indices = new int[array.Length + 1];
		Array.Fill(indices, Int32.MinValue);
		int length = 0;
		for (int i = 0; i < array.Length; i++) {
			int num = array[i];
			int newLength = BinarySearch(1, length, indices, array, num);
			sequences[i] = indices[newLength - 1];
			indices[newLength] = i;
			length = Math.Max(length, newLength);
		}
		return buildSequence(array, sequences, indices[length]);
	}

	public static int BinarySearch(int startIdx, int endIdx, int[] indices, int[] array,
	  int num) {
		if (startIdx > endIdx) {
			return startIdx;
		}
		int middleIdx = (startIdx + endIdx) / 2;
		if (array[indices[middleIdx]] < num) {
			startIdx = middleIdx + 1;
		} else {
			endIdx = middleIdx - 1;
		}
		return BinarySearch(startIdx, endIdx, indices, array, num);
	}

	public static List<int> buildSequence(int[] array, int[] sequences, int currentIdx) {
		List<int> sequence = new List<int>();
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
		int[] expected = {-24, 2, 3, 5, 6, 35};
		Utils.AssertTrue(compare(Program.LongestIncreasingSubsequence(new int[] {5, 7, -24,
		                                                                         12, 10, 2,
		                                                                         3, 12, 5,
		                                                                         6, 35}),
		  expected));
	}

	public static bool compare(List<int> arr1, int[] arr2) {
		if (arr1.Count != arr2.Length) {
			return false;
		}
		for (int i = 0; i < arr1.Count; i++) {
			if (arr1[i] != arr2[i]) {
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

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := []int{-24, 2, 3, 5, 6, 35}
	input := []int{5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35}
	output := LongestIncreasingSubsequence(input)
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n^2) time | O(n) space
func LongestIncreasingSubsequence(array []int) []int {
	sequences := make([]int, len(array))
	lengths := make([]int, len(array))
	for i := range array {
		sequences[i] = -1
		lengths[i] = 1
	}
	for i := range array {
		currentNum := array[i]
		for j := 0; j < i; j++ {
			otherNum := array[j]
			if otherNum < currentNum && lengths[j]+1 >= lengths[i] {
				lengths[i] = lengths[j] + 1
				sequences[i] = j
			}
		}
	}
	maxLengthIndex := 0
	for i := range array {
		if lengths[i] > lengths[maxLengthIndex] {
			maxLengthIndex = i
		}
	}
	return buildSequence(array, sequences, maxLengthIndex)
}

func buildSequence(array, sequences []int, index int) []int {
	out := []int{}
	for index != -1 {
		out = append(out, array[index])
		index = sequences[index]
	}
	reverse(out)
	return out
}

func reverse(numbers []int) {
	for i, j := 0, len(numbers)-1; i < j; i, j = i+1, j-1 {
		numbers[i], numbers[j] = numbers[j], numbers[i]
	}
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(nlogn) time | O(n) space
func LongestIncreasingSubsequence(array []int) []int {
	sequences := make([]int, len(array))
	indices := make([]int, len(array)+1)
	for i := range array {
		sequences[i] = -1
		indices[i] = -1
	}
	length := 0
	for i, num := range array {
		newLength := binarySearch(1, length, indices, array, num)
		sequences[i] = indices[newLength-1]
		indices[newLength] = i
		length = max(length, newLength)
	}
	return buildSequence(array, sequences, indices[length])
}

func binarySearch(startIndex, endIndex int, indices, array []int, num int) int {
	if startIndex > endIndex {
		return startIndex
	}
	middleIndex := (startIndex + endIndex) / 2
	if array[indices[middleIndex]] < num {
		startIndex = middleIndex + 1
	} else {
		endIndex = middleIndex - 1
	}
	return binarySearch(startIndex, endIndex, indices, array, num)
}

func buildSequence(array, sequences []int, index int) []int {
	out := []int{}
	for index != -1 {
		out = append(out, array[index])
		index = sequences[index]
	}
	reverse(out)
	return out
}

func max(arg int, rest ...int) int {
	for _, num := range rest {
		if num > arg {
			arg = num
		}
	}
	return arg
}

func reverse(numbers []int) {
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
	expected := []int{-24, 2, 3, 5, 6, 35}
	input := []int{5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35}
	output := LongestIncreasingSubsequence(input)
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
    int[] expected = {-24, 2, 3, 5, 6, 35};
    Utils.assertTrue(
        compare(
            Program.longestIncreasingSubsequence(new int[] {5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35}),
            expected));
  }

  public static boolean compare(List<Integer> arr1, int[] arr2) {
    if (arr1.size() != arr2.length) {
      return false;
    }
    for (int i = 0; i < arr1.size(); i++) {
      if (arr1.get(i) != arr2[i]) {
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
  // O(n^2) time | O(n) space
  public static List<Integer> longestIncreasingSubsequence(int[] array) {
    int[] sequences = new int[array.length];
    Arrays.fill(sequences, Integer.MIN_VALUE);
    int[] lengths = new int[array.length];
    Arrays.fill(lengths, 1);
    int maxLengthIdx = 0;
    for (int i = 0; i < array.length; i++) {
      int currentNum = array[i];
      for (int j = 0; j < i; j++) {
        int otherNum = array[j];
        if (otherNum < currentNum && lengths[j] + 1 >= lengths[i]) {
          lengths[i] = lengths[j] + 1;
          sequences[i] = j;
        }
      }
      if (lengths[i] >= lengths[maxLengthIdx]) {
        maxLengthIdx = i;
      }
    }
    return buildSequence(array, sequences, maxLengthIdx);
  }

  public static List<Integer> buildSequence(int[] array, int[] sequences, int currentIdx) {
    List<Integer> sequence = new ArrayList<Integer>();
    while (currentIdx != Integer.MIN_VALUE) {
      sequence.add(0, array[currentIdx]);
      currentIdx = sequences[currentIdx];
    }
    return sequence;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(nlogn) time | O(n) space
  public static List<Integer> longestIncreasingSubsequence(int[] array) {
    int[] sequences = new int[array.length];
    int[] indices = new int[array.length + 1];
    Arrays.fill(indices, Integer.MIN_VALUE);
    int length = 0;
    for (int i = 0; i < array.length; i++) {
      int num = array[i];
      int newLength = binarySearch(1, length, indices, array, num);
      sequences[i] = indices[newLength - 1];
      indices[newLength] = i;
      length = Math.max(length, newLength);
    }
    return buildSequence(array, sequences, indices[length]);
  }

  public static int binarySearch(int startIdx, int endIdx, int[] indices, int[] array, int num) {
    if (startIdx > endIdx) {
      return startIdx;
    }
    int middleIdx = (startIdx + endIdx) / 2;
    if (array[indices[middleIdx]] < num) {
      startIdx = middleIdx + 1;
    } else {
      endIdx = middleIdx - 1;
    }
    return binarySearch(startIdx, endIdx, indices, array, num);
  }

  public static List<Integer> buildSequence(int[] array, int[] sequences, int currentIdx) {
    List<Integer> sequence = new ArrayList<Integer>();
    while (currentIdx != Integer.MIN_VALUE) {
      sequence.add(0, array[currentIdx]);
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
    int[] expected = {-24, 2, 3, 5, 6, 35};
    Utils.assertTrue(
        compare(
            Program.longestIncreasingSubsequence(new int[] {5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35}),
            expected));
  }

  public static boolean compare(List<Integer> arr1, int[] arr2) {
    if (arr1.size() != arr2.length) {
      return false;
    }
    for (int i = 0; i < arr1.size(); i++) {
      if (arr1.get(i) != arr2[i]) {
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

it('Test Case #1', function () {
  chai
    .expect(program.longestIncreasingSubsequence([5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35]))
    .to.deep.equal([-24, 2, 3, 5, 6, 35]);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space
function longestIncreasingSubsequence(array) {
  const sequences = new Array(array.length);
  const lengths = array.map(num => 1);
  let maxLengthIdx = 0;
  for (let i = 0; i < array.length; i++) {
    const currentNum = array[i];
    for (let j = 0; j < i; j++) {
      const otherNum = array[j];
      if (otherNum < currentNum && lengths[j] + 1 >= lengths[i]) {
        lengths[i] = lengths[j] + 1;
        sequences[i] = j;
      }
    }
    if (lengths[i] >= lengths[maxLengthIdx]) maxLengthIdx = i;
  }
  return buildSequence(array, sequences, maxLengthIdx);
}

function buildSequence(array, sequences, currentIdx) {
  const sequence = [];
  while (currentIdx !== undefined) {
    sequence.unshift(array[currentIdx]);
    currentIdx = sequences[currentIdx];
  }
  return sequence;
}

exports.longestIncreasingSubsequence = longestIncreasingSubsequence;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlogn) time | O(n) space
function longestIncreasingSubsequence(array) {
  const sequences = new Array(array.length);
  const indices = new Array(array.length + 1);
  let length = 0;
  for (let i = 0; i < array.length; i++) {
    const num = array[i];
    const newLength = binarySearch(1, length, indices, array, num);
    sequences[i] = indices[newLength - 1];
    indices[newLength] = i;
    length = Math.max(length, newLength);
  }
  return buildSequence(array, sequences, indices[length]);
}

function binarySearch(startIdx, endIdx, indices, array, num) {
  if (startIdx > endIdx) return startIdx;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  if (array[indices[middleIdx]] < num) {
    startIdx = middleIdx + 1;
  } else {
    endIdx = middleIdx - 1;
  }
  return binarySearch(startIdx, endIdx, indices, array, num);
}

function buildSequence(array, sequences, currentIdx) {
  const sequence = [];
  while (currentIdx !== undefined) {
    sequence.unshift(array[currentIdx]);
    currentIdx = sequences[currentIdx];
  }
  return sequence;
}

exports.longestIncreasingSubsequence = longestIncreasingSubsequence;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai
    .expect(program.longestIncreasingSubsequence([5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35]))
    .to.deep.equal([-24, 2, 3, 5, 6, 35]);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.longestIncreasingSubsequence

class ProgramTest {
    @Test
    fun TestCase1() {
        val expected = listOf(-24, 2, 3, 5, 6, 35)
        val input = listOf(5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35)
        val output = longestIncreasingSubsequence(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^2) time | O(n) space
fun longestIncreasingSubsequence(array: List<Int>): List<Int> {
    var sequences = MutableList(array.size) { Int.MIN_VALUE }
    var lengths = MutableList(array.size) { 1 }
    var maxLengthIdx = 0
    for (i in 0 until array.size) {
        var currentNum = array[i]
        for (j in 0 until i) {
            var otherNum = array[j]
            if (otherNum < currentNum && lengths[j] + 1 >= lengths[i]) {
                lengths[i] = lengths[j] + 1
                sequences[i] = j
            }
        }
        if (lengths[i] >= lengths[maxLengthIdx]) {
            maxLengthIdx = i
        }
    }
    return buildSequence(array, sequences, maxLengthIdx)
}

fun buildSequence(array: List<Int>, sequences: List<Int>, currentIdx: Int): List<Int> {
    var sequence = mutableListOf<Int>()
    var curr = currentIdx
    while (curr != Int.MIN_VALUE) {
        sequence.add(0, array[curr])
        curr = sequences[curr]
    }
    return sequence
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(nlogn) time | O(n) space
fun longestIncreasingSubsequence(array: List<Int>): List<Int> {
    var sequences = MutableList(array.size) { 0 }
    var indices = MutableList(array.size + 1) { Int.MIN_VALUE }
    var length = 0
    for (i in 0 until array.size) {
        val num = array[i]
        val newLength = binarySearch(1, length, indices, array, num)
        sequences[i] = indices[newLength - 1]
        indices[newLength] = i
        length = max(length, newLength)
    }
    return buildSequence(array, sequences, indices[length])
}

fun binarySearch(startIdx: Int, endIdx: Int, indices: List<Int>, array: List<Int>, num: Int): Int {
    var start = startIdx
    var end = endIdx
    if (start > end) {
        return start
    }
    val middleIdx = (startIdx + endIdx) / 2
    if (array[indices[middleIdx]] < num) {
        start = middleIdx + 1
    } else {
        end = middleIdx - 1
    }
    return binarySearch(start, end, indices, array, num)
}

fun buildSequence(array: List<Int>, sequences: List<Int>, currentIdx: Int): List<Int> {
    var sequence = mutableListOf<Int>()
    var curr = currentIdx
    while (curr != Int.MIN_VALUE) {
        sequence.add(0, array[curr])
        curr = sequences[curr]
    }
    return sequence
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.longestIncreasingSubsequence

class ProgramTest {
    @Test
    fun TestCase1() {
        val expected = listOf(-24, 2, 3, 5, 6, 35)
        val input = listOf(5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35)
        val output = longestIncreasingSubsequence(input)
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
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      try assertEqual([-24, 2, 3, 5, 6, 35], program.longestIncreasingSubsequence([5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35]))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(n) space
  func longestIncreasingSubsequence(_ array: [Int]) -> [Int] {
    var indexOfMaxLength: Int? = 0
    var lengths = Array(repeating: 1, count: array.count)
    var sequences: [Int?] = Array(repeating: nil, count: array.count)

    for i in 0 ..< array.count {
      let currentNumber = array[i]

      for j in 0 ..< i {
        let otherNumber = array[j]

        if otherNumber < currentNumber, lengths[i] <= lengths[j] + 1 {
          lengths[i] = lengths[j] + 1
          sequences[i] = j
        }
      }

      if lengths[i] > lengths[indexOfMaxLength!] {
        indexOfMaxLength = i
      }
    }

    return buildSequence(array, sequences, &indexOfMaxLength)
  }

  func buildSequence(_ array: [Int], _ sequences: [Int?], _ currentIndex: inout Int?) -> [Int] {
    var sequence = [Int]()

    while currentIndex != nil {
      sequence.insert(array[currentIndex!], at: 0)
      currentIndex = sequences[currentIndex!]
    }

    return sequence
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nlogn) time | O(n) space
  func longestIncreasingSubsequence(_ array: [Int]) -> [Int] {
    var length = 0
    var indices: [Int?] = Array(repeating: nil, count: array.count + 1)
    var sequences: [Int?] = Array(repeating: nil, count: array.count)

    for i in 0 ..< array.count {
      var startIndex = 1
      var endIndex = length
      let number = array[i]
      let newLength = binarySearch(&startIndex, &endIndex, indices, array, number)

      indices[newLength] = i
      sequences[i] = indices[newLength - 1]
      length = max(length, newLength)
    }

    return buildSequence(array, sequences, &indices[length])
  }

  func binarySearch(_ startIndex: inout Int, _ endIndex: inout Int, _ indices: [Int?], _ array: [Int], _ number: Int) -> Int {
    if startIndex > endIndex {
      return startIndex
    }

    var middleIndex = Double(startIndex + endIndex) / 2
    middleIndex = middleIndex.rounded(.down)
    let intMiddle = Int(middleIndex)

    if let index = indices[intMiddle] {
      let numberToCompare = array[index]

      if numberToCompare < number {
        startIndex = intMiddle + 1
      } else {
        endIndex = intMiddle - 1
      }
    }

    return binarySearch(&startIndex, &endIndex, indices, array, number)
  }

  func buildSequence(_ array: [Int], _ sequences: [Int?], _ currentIndex: inout Int?) -> [Int] {
    var sequence = [Int]()

    while currentIndex != nil {
      sequence.insert(array[currentIndex!], at: 0)
      currentIndex = sequences[currentIndex!]
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
      try assertEqual([-24, 2, 3, 5, 6, 35], program.longestIncreasingSubsequence([5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35]))
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
            program.longestIncreasingSubsequence([5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35]), [-24, 2, 3, 5, 6, 35]
        )

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n) space
def longestIncreasingSubsequence(array):
    sequences = [None for x in array]
    lengths = [1 for x in array]
    maxLengthIdx = 0
    for i in range(len(array)):
        currentNum = array[i]
        for j in range(0, i):
            otherNum = array[j]
            if otherNum < currentNum and lengths[j] + 1 >= lengths[i]:
                lengths[i] = lengths[j] + 1
                sequences[i] = j
        if lengths[i] >= lengths[maxLengthIdx]:
            maxLengthIdx = i
    return buildSequence(array, sequences, maxLengthIdx)


def buildSequence(array, sequences, currentIdx):
    sequence = []
    while currentIdx is not None:
        sequence.append(array[currentIdx])
        currentIdx = sequences[currentIdx]
    return list(reversed(sequence))

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nlogn) time | O(n) space
def longestIncreasingSubsequence(array):
    sequences = [None for x in array]
    indices = [None for x in range(len(array) + 1)]
    length = 0
    for i, num in enumerate(array):
        newLength = binarySearch(1, length, indices, array, num)
        sequences[i] = indices[newLength - 1]
        indices[newLength] = i
        length = max(length, newLength)
    return buildSequence(array, sequences, indices[length])


def binarySearch(startIdx, endIdx, indices, array, num):
    if startIdx > endIdx:
        return startIdx
    middleIdx = (startIdx + endIdx) // 2
    if array[indices[middleIdx]] < num:
        startIdx = middleIdx + 1
    else:
        endIdx = middleIdx - 1
    return binarySearch(startIdx, endIdx, indices, array, num)


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
            program.longestIncreasingSubsequence([5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35]), [-24, 2, 3, 5, 6, 35]
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
    .expect(program.longestIncreasingSubsequence([5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35]))
    .to.deep.equal([-24, 2, 3, 5, 6, 35]);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space
export function longestIncreasingSubsequence(array: number[]) {
  const sequences: number[] = new Array(array.length);
  const lengths = array.map(num => 1);
  let maxLengthIdx = 0;
  for (let i = 0; i < array.length; i++) {
    const currentNum = array[i];
    for (let j = 0; j < i; j++) {
      const otherNum = array[j];
      if (otherNum < currentNum && lengths[j] + 1 >= lengths[i]) {
        lengths[i] = lengths[j] + 1;
        sequences[i] = j;
      }
    }
    if (lengths[i] >= lengths[maxLengthIdx]) maxLengthIdx = i;
  }
  return buildSequence(array, sequences, maxLengthIdx);
}

function buildSequence(array: number[], sequences: number[], currentIdx: number) {
  const sequence: number[] = [];
  while (currentIdx !== undefined) {
    sequence.unshift(array[currentIdx]);
    currentIdx = sequences[currentIdx];
  }
  return sequence;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlogn) time | O(n) space
export function longestIncreasingSubsequence(array: number[]) {
  const sequences: number[] = new Array(array.length);
  const indices: number[] = new Array(array.length + 1);
  let length = 0;
  for (let i = 0; i < array.length; i++) {
    const num = array[i];
    const newLength = binarySearch(1, length, indices, array, num);
    sequences[i] = indices[newLength - 1];
    indices[newLength] = i;
    length = Math.max(length, newLength);
  }
  return buildSequence(array, sequences, indices[length]);
}

function binarySearch(startIdx: number, endIdx: number, indices: number[], array: number[], num: number): number {
  if (startIdx > endIdx) return startIdx;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  if (array[indices[middleIdx]] < num) {
    startIdx = middleIdx + 1;
  } else {
    endIdx = middleIdx - 1;
  }
  return binarySearch(startIdx, endIdx, indices, array, num);
}

function buildSequence(array: number[], sequences: number[], currentIdx: number) {
  const sequence = [];
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
    .expect(program.longestIncreasingSubsequence([5, 7, -24, 12, 10, 2, 3, 12, 5, 6, 35]))
    .to.deep.equal([-24, 2, 3, 5, 6, 35]);
});

```

