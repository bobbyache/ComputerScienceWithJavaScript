# Max Sum Increasing Subsequence
<div class="html">
<p>
  Write a function that takes in a non-empty array of integers and returns the
  greatest sum that can be generated from a strictly-increasing subsequence in
  the array as well as an array of the numbers in that subsequence.
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
  You can assume that there will only be one increasing subsequence with the
  greatest sum.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [10, 70, 20, 30, 50, 11, 30]
</pre>
<h3>Sample Output</h3>
<pre>
[110, [10, 20, 30, 50]] <span class="CodeEditor-promptComment">// The subsequence [10, 20, 30, 50] is strictly increasing and yields the greatest sum: 110.</span>
</pre>
</div>

Hint 1
<p>
Try building an array of the same length as the input array. At each index in this new array, store the maximum sum that can be generated from an increasing subsequence ending with the number found at that index in the input array.
</p>


Hint 2

<p>
Can you efficiently keep track of potential sequences in another array? Instead of storing entire sequences, try storing the indices of previous numbers. For example, at index 3 in this other array, store the index of the before-last number in the max-sum increasing subsequence ending with the number at index 3.
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
      vector<int> input{10, 70, 20, 30, 50, 11, 30};
      vector<vector<int>> expected{{110}, {10, 20, 30, 50}};
      assert(maxSumIncreasingSubsequence(input) == expected);
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

vector<vector<int>> buildSequence(vector<int> array, vector<int> sequences,
                                  int currentIdx, int sum);

// O(n^2) time | O(n) space
vector<vector<int>> maxSumIncreasingSubsequence(vector<int> array) {
  vector<int> sequences(array.size(), INT_MIN);
  vector<int> sums = array;
  int maxSumIdx = 0;
  for (int i = 0; i < array.size(); i++) {
    int currentNum = array[i];
    for (int j = 0; j < i; j++) {
      int otherNum = array[j];
      if (otherNum < currentNum && sums[j] + currentNum >= sums[i]) {
        sums[i] = sums[j] + currentNum;
        sequences[i] = j;
      }
    }
    if (sums[i] >= sums[maxSumIdx]) {
      maxSumIdx = i;
    }
  }
  return buildSequence(array, sequences, maxSumIdx, sums[maxSumIdx]);
}

vector<vector<int>> buildSequence(vector<int> array, vector<int> sequences,
                                  int currentIdx, int sum) {
  vector<vector<int>> sequence = {{}, {}};
  sequence[0].push_back(sum);
  while (currentIdx != INT_MIN) {
    sequence[1].insert(sequence[1].begin(), array[currentIdx]);
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
      vector<int> input{10, 70, 20, 30, 50, 11, 30};
      vector<vector<int>> expected{{110}, {10, 20, 30, 50}};
      assert(maxSumIncreasingSubsequence(input) == expected);
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
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] input = {10, 70, 20, 30, 50, 11, 30};
		Tuple<int, int[]> expected = Tuple.Create(110, new int[] {10, 20, 30, 50});
		Utils.AssertTrue(compare(Program.MaxSumIncreasingSubsequence(input), expected));
	}

	private static bool compare(List<List<int> > arr1, Tuple<int, int[]> arr2) {
		if (arr1[0][0] != arr2.Item1) {
			return false;
		}
		if (arr1[1].Count != arr2.Item2.Length) {
			return false;
		}
		for (int i = 0; i < arr1[1].Count; i++) {
			if (arr1[1][i] != arr2.Item2[i]) {
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
	public static List<List<int> > MaxSumIncreasingSubsequence(int[] array) {
		int[] sequences = new int[array.Length];
		Array.Fill(sequences, Int32.MinValue);
		int[] sums = (int[]) array.Clone();
		int maxSumIdx = 0;
		for (int i = 0; i < array.Length; i++) {
			int currentNum = array[i];
			for (int j = 0; j < i; j++) {
				int otherNum = array[j];
				if (otherNum < currentNum && sums[j] + currentNum >= sums[i]) {
					sums[i] = sums[j] + currentNum;
					sequences[i] = j;
				}
			}
			if (sums[i] >= sums[maxSumIdx]) {
				maxSumIdx = i;
			}
		}
		return buildSequence(array, sequences, maxSumIdx, sums[maxSumIdx]);
	}

	public static List<List<int> > buildSequence(int[] array, int[] sequences, int currentIdx,
	  int sums) {
		List<List<int> > sequence = new List<List<int> >();
		sequence.Add(new List<int>());
		sequence.Add(new List<int>());
		sequence[0].Add(sums);
		while (currentIdx != Int32.MinValue) {
			sequence[1].Insert(0, array[currentIdx]);
			currentIdx = sequences[currentIdx];
		}
		return sequence;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] input = {10, 70, 20, 30, 50, 11, 30};
		Tuple<int, int[]> expected = Tuple.Create(110, new int[] {10, 20, 30, 50});
		Utils.AssertTrue(compare(Program.MaxSumIncreasingSubsequence(input), expected));
	}

	private static bool compare(List<List<int> > arr1, Tuple<int, int[]> arr2) {
		if (arr1[0][0] != arr2.Item1) {
			return false;
		}
		if (arr1[1].Count != arr2.Item2.Length) {
			return false;
		}
		for (int i = 0; i < arr1[1].Count; i++) {
			if (arr1[1][i] != arr2.Item2[i]) {
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
	outputSum, outputSequence := MaxSumIncreasingSubsequence([]int{10, 70, 20, 30, 50, 11, 30})
	require.Equal(t, 110, outputSum)
	require.Equal(t, []int{10, 20, 30, 50}, outputSequence)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "math"

// O(n^2) time | O(n) space
func MaxSumIncreasingSubsequence(array []int) (int, []int) {
	sequences := make([]int, len(array))
	sums := make([]int, len(array))
	for i := range sequences {
		sequences[i] = math.MinInt32
		sums[i] = array[i]
	}
	maxSumIndex := 0
	for i, currentNum := range array {
		for j := 0; j < i; j++ {
			otherNum := array[j]
			if otherNum < currentNum && sums[j]+currentNum >= sums[i] {
				sums[i] = sums[j] + currentNum
				sequences[i] = j
			}
		}
		if sums[i] > sums[maxSumIndex] {
			maxSumIndex = i
		}
	}

	maxSum := sums[maxSumIndex]
	sequence := buildSequence(array, sequences, maxSumIndex)
	return maxSum, sequence
}

func buildSequence(array []int, sequences []int, index int) []int {
	sequence := []int{}
	for index != math.MinInt32 {
		sequence = append(sequence, array[index])
		index = sequences[index]
	}
	reverse(sequence)
	return sequence
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
	outputSum, outputSequence := MaxSumIncreasingSubsequence([]int{10, 70, 20, 30, 50, 11, 30})
	require.Equal(t, 110, outputSum)
	require.Equal(t, []int{10, 20, 30, 50}, outputSequence)
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
    int[] input = {10, 70, 20, 30, 50, 11, 30};
    int[][] expected = {{110}, {10, 20, 30, 50}};
    Utils.assertTrue(compare(Program.maxSumIncreasingSubsequence(input), expected));
  }

  public static boolean compare(List<List<Integer>> arr1, int[][] arr2) {
    if (arr1.get(0).get(0) != arr2[0][0]) {
      return false;
    }
    for (int i = 0; i < arr1.get(1).size(); i++) {
      if (arr1.get(1).get(i) != arr2[1][i]) {
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
  public static List<List<Integer>> maxSumIncreasingSubsequence(int[] array) {
    int[] sequences = new int[array.length];
    Arrays.fill(sequences, Integer.MIN_VALUE);
    int[] sums = array.clone();
    int maxSumIdx = 0;
    for (int i = 0; i < array.length; i++) {
      int currentNum = array[i];
      for (int j = 0; j < i; j++) {
        int otherNum = array[j];
        if (otherNum < currentNum && sums[j] + currentNum >= sums[i]) {
          sums[i] = sums[j] + currentNum;
          sequences[i] = j;
        }
      }
      if (sums[i] >= sums[maxSumIdx]) {
        maxSumIdx = i;
      }
    }
    return buildSequence(array, sequences, maxSumIdx, sums[maxSumIdx]);
  }

  public static List<List<Integer>> buildSequence(
      int[] array, int[] sequences, int currentIdx, int sums) {
    List<List<Integer>> sequence = new ArrayList<List<Integer>>();
    sequence.add(new ArrayList<Integer>());
    sequence.add(new ArrayList<Integer>());
    sequence.get(0).add(sums);
    while (currentIdx != Integer.MIN_VALUE) {
      sequence.get(1).add(0, array[currentIdx]);
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
    int[] input = {10, 70, 20, 30, 50, 11, 30};
    int[][] expected = {{110}, {10, 20, 30, 50}};
    Utils.assertTrue(compare(Program.maxSumIncreasingSubsequence(input), expected));
  }

  public static boolean compare(List<List<Integer>> arr1, int[][] arr2) {
    if (arr1.get(0).get(0) != arr2[0][0]) {
      return false;
    }
    for (int i = 0; i < arr1.get(1).size(); i++) {
      if (arr1.get(1).get(i) != arr2[1][i]) {
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
  chai.expect(program.maxSumIncreasingSubsequence([10, 70, 20, 30, 50, 11, 30])).to.deep.equal([110, [10, 20, 30, 50]]);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space
function maxSumIncreasingSubsequence(array) {
  const sequences = new Array(array.length);
  const sums = array.map(num => num);
  let maxSumIdx = 0;
  for (let i = 0; i < array.length; i++) {
    const currentNum = array[i];
    for (let j = 0; j < i; j++) {
      const otherNum = array[j];
      if (otherNum < currentNum && sums[j] + currentNum >= sums[i]) {
        sums[i] = sums[j] + currentNum;
        sequences[i] = j;
      }
    }
    if (sums[i] >= sums[maxSumIdx]) maxSumIdx = i;
  }
  return [sums[maxSumIdx], buildSequence(array, sequences, maxSumIdx)];
}

function buildSequence(array, sequences, currentIdx) {
  const sequence = [];
  while (currentIdx !== undefined) {
    sequence.unshift(array[currentIdx]);
    currentIdx = sequences[currentIdx];
  }
  return sequence;
}

exports.maxSumIncreasingSubsequence = maxSumIncreasingSubsequence;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.maxSumIncreasingSubsequence([10, 70, 20, 30, 50, 11, 30])).to.deep.equal([110, [10, 20, 30, 50]]);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.maxSumIncreasingSubsequence

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(10, 70, 20, 30, 50, 11, 30)
        val expected = Pair(110, listOf(10, 20, 30, 50))
        val output = maxSumIncreasingSubsequence(input)
        assert(expected.equals(output))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^2) time | O(n) space
fun maxSumIncreasingSubsequence(array: List<Int>): Pair<Int, List<Int>> {
    val sequences = MutableList<Int>(array.size) { Int.MIN_VALUE }
    val sums = array.toMutableList()
    var maxSumIdx = 0
    for (i in 0 until array.size) {
        val currentNum = array[i]
        for (j in 0 until i) {
            val otherNum = array[j]
            if (otherNum < currentNum && sums[j] + currentNum >= sums[i]) {
                sums[i] = sums[j] + currentNum
                sequences[i] = j
            }
        }
        if (sums[i] >= sums[maxSumIdx]) {
            maxSumIdx = i
        }
    }
    return buildSequence(array, sequences, maxSumIdx, sums[maxSumIdx])
}

fun buildSequence(array: List<Int>, sequences: List<Int>, startIdx: Int, sums: Int): Pair<Int, List<Int>> {
    var currentIdx = startIdx
    val sequence = mutableListOf<Int>()
    while (currentIdx != Int.MIN_VALUE) {
        sequence.add(0, array[currentIdx])
        currentIdx = sequences[currentIdx]
    }
    val pair = Pair<Int, List<Int>>(sums, sequence)
    return pair
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.maxSumIncreasingSubsequence

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(10, 70, 20, 30, 50, 11, 30)
        val expected = Pair(110, listOf(10, 20, 30, 50))
        val output = maxSumIncreasingSubsequence(input)
        assert(expected.equals(output))
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
      let output = program.maximumSumIncreasingSubsequence(array: [10, 70, 20, 30, 50, 11, 30])
      try assert(output == (110, [10, 20, 30, 50]))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(n) space
  func maximumSumIncreasingSubsequence(array: [Int]) -> (Int, [Int]) {
    var maxSumIndex = 0
    var sums = array.map { $0 }
    var previousIndices: [Int?] = Array(repeating: nil, count: array.count)

    for i in 0 ..< array.count {
      let currentNumber = array[i]
      for j in 0 ..< i {
        let previousNumber = array[j]
        if previousNumber < currentNumber, sums[j] + currentNumber > sums[i] {
          sums[i] = sums[j] + currentNumber
          previousIndices[i] = j
        }
      }

      if sums[i] > sums[maxSumIndex] {
        maxSumIndex = i
      }
    }

    return (sums[maxSumIndex], buildSequence(array, maxSumIndex, previousIndices))
  }

  func buildSequence(_ array: [Int], _ maxSumIndex: Int, _ previousIndices: [Int?]) -> [Int] {
    var sequence = [Int]()
    var currentIndex: Int? = maxSumIndex

    while currentIndex != nil {
      sequence.insert(array[currentIndex!], at: 0)
      currentIndex = previousIndices[currentIndex!]
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
      let output = program.maximumSumIncreasingSubsequence(array: [10, 70, 20, 30, 50, 11, 30])
      try assert(output == (110, [10, 20, 30, 50]))
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
        self.assertEqual(program.maxSumIncreasingSubsequence([10, 70, 20, 30, 50, 11, 30]), [110, [10, 20, 30, 50]])

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n) space
def maxSumIncreasingSubsequence(array):
    sequences = [None for x in array]
    sums = [num for num in array]
    maxSumIdx = 0
    for i in range(len(array)):
        currentNum = array[i]
        for j in range(0, i):
            otherNum = array[j]
            if otherNum < currentNum and sums[j] + currentNum >= sums[i]:
                sums[i] = sums[j] + currentNum
                sequences[i] = j
        if sums[i] >= sums[maxSumIdx]:
            maxSumIdx = i
    return [sums[maxSumIdx], buildSequence(array, sequences, maxSumIdx)]


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
        self.assertEqual(program.maxSumIncreasingSubsequence([10, 70, 20, 30, 50, 11, 30]), [110, [10, 20, 30, 50]])

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.maxSumIncreasingSubsequence([10, 70, 20, 30, 50, 11, 30])).to.deep.equal([110, [10, 20, 30, 50]]);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space
export function maxSumIncreasingSubsequence(array: number[]): [number, number[]] {
  const sequences: number[] = new Array(array.length);
  const sums: number[] = array.map(num => num);
  let maxSumIdx = 0;
  for (let i = 0; i < array.length; i++) {
    const currentNum = array[i];
    for (let j = 0; j < i; j++) {
      const otherNum = array[j];
      if (otherNum < currentNum && sums[j] + currentNum >= sums[i]) {
        sums[i] = sums[j] + currentNum;
        sequences[i] = j;
      }
    }
    if (sums[i] >= sums[maxSumIdx]) maxSumIdx = i;
  }
  return [sums[maxSumIdx], buildSequence(array, sequences, maxSumIdx)];
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
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.maxSumIncreasingSubsequence([10, 70, 20, 30, 50, 11, 30])).to.deep.equal([110, [10, 20, 30, 50]]);
});

```

