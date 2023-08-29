# Merge Sort
<div class="html">
<p>
  Write a function that takes in an array of integers and returns a sorted
  version of that array. Use the Merge Sort algorithm to sort the array.
</p>
<p>
  If you're unfamiliar with Merge Sort, we recommend watching the Conceptual
  Overview section of this question's video explanation before starting to code.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [8, 5, 2, 9, 5, 6, 3]
</pre>
<h3>Sample Output</h3>
<pre>
[2, 3, 5, 5, 6, 8, 9]
</pre>
</div>

Hint 1
<p>
Merge Sort works by cutting an array in two halves, respectively sorting those two halves by performing some special logic, and then merging the two newly-sorted halves into one sorted array. The respective sorting of the two halves is done by reapplying the Merge Sort algorithm / logic on each half until single-element halves are obtained; these single-element arrays are sorted by nature and can very easily be merged back together.
</p>


Hint 2

<p>
Divide the input array in two halves by finding the middle-most index in the array and slicing the two halves around that index. Then, recursively apply Merge Sort to each half, and finally merge them into one single, sorted array by iterating through their values and progressively adding them to the new array in ascending order.
</p>


Hint 3

<p>
Your implementation of Merge Sort almost certainly uses a lot of auxiliary space and likely does not sort the input array in place. What is the space complexity of your algorithm? Can you implement a version of the algorithm using only one additional array of the same length as the input array, and can this version sort the input array in place?
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
      vector<int> expected = {2, 3, 5, 5, 6, 8, 9};
      assert(mergeSort({8, 5, 2, 9, 5, 6, 3}) == expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

vector<int> mergeSortedArrays(vector<int> leftHalf, vector<int> rightHalf);

// Best: O(nlog(n)) time | O(nlog(n)) space
// Average: O(nlog(n)) time | O(nlog(n)) space
// Worst: O(nlog(n)) time | O(nlog(n)) space
vector<int> mergeSort(vector<int> array) {
  if (array.size() <= 1) {
    return array;
  }
  int middleIdx = array.size() / 2;
  vector<int> leftHalf(array.begin(), array.begin() + middleIdx);
  vector<int> rightHalf(array.begin() + middleIdx, array.end());
  return mergeSortedArrays(mergeSort(leftHalf), mergeSort(rightHalf));
}

vector<int> mergeSortedArrays(vector<int> leftHalf, vector<int> rightHalf) {
  vector<int> sortedArray(leftHalf.size() + rightHalf.size(), 0);
  int k = 0;
  int i = 0;
  int j = 0;
  while (i < leftHalf.size() && j < rightHalf.size()) {
    if (leftHalf[i] <= rightHalf[j]) {
      sortedArray[k++] = leftHalf[i++];
    } else {
      sortedArray[k++] = rightHalf[j++];
    }
  }
  while (i < leftHalf.size()) {
    sortedArray[k++] = leftHalf[i++];
  }
  while (j < rightHalf.size()) {
    sortedArray[k++] = rightHalf[j++];
  }
  return sortedArray;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

void mergeSortHelper(vector<int> *mainArray, int startIdx, int endIdx,
                     vector<int> *auxiliaryArray);
void doMerge(vector<int> *mainArray, int startIdx, int middleIdx, int endIdx,
             vector<int> *auxiliaryArray);

// Best: O(nlog(n)) time | O(n) space
// Average: O(nlog(n)) time | O(n) space
// Worst: O(nlog(n)) time | O(n) space
vector<int> mergeSort(vector<int> array) {
  if (array.size() <= 1) {
    return array;
  }
  vector<int> auxiliaryArray = array;
  mergeSortHelper(&array, 0, array.size() - 1, &auxiliaryArray);
  return array;
}

void mergeSortHelper(vector<int> *mainArray, int startIdx, int endIdx,
                     vector<int> *auxiliaryArray) {
  if (startIdx == endIdx) {
    return;
  }
  int middleIdx = (startIdx + endIdx) / 2;
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray);
}

void doMerge(vector<int> *mainArray, int startIdx, int middleIdx, int endIdx,
             vector<int> *auxiliaryArray) {
  int k = startIdx;
  int i = startIdx;
  int j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    if (auxiliaryArray->at(i) <= auxiliaryArray->at(j)) {
      mainArray->at(k++) = auxiliaryArray->at(i++);
    } else {
      mainArray->at(k++) = auxiliaryArray->at(j++);
    }
  }
  while (i <= middleIdx) {
    mainArray->at(k++) = auxiliaryArray->at(i++);
  }
  while (j <= endIdx) {
    mainArray->at(k++) = auxiliaryArray->at(j++);
  }
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> expected = {2, 3, 5, 5, 6, 8, 9};
      assert(mergeSort({8, 5, 2, 9, 5, 6, 3}) == expected);
    });
  }
};

```
### Sandbox Code (csharp)
```csharp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] expected = {2, 3, 5, 5, 6, 8, 9};
		int[] input = {8, 5, 2, 9, 5, 6, 3};
		Utils.AssertTrue(compare(Program.MergeSort(input), expected));
	}

	public bool compare(int[] arr1, int[] arr2) {
		if (arr1.Length != arr2.Length) {
			return false;
		}
		for (int i = 0; i < arr1.Length; i++) {
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

using System.Linq;

public class Program {
	// Best: O(nlog(n)) time | O(nlog(n)) space
	// Average: O(nlog(n)) time | O(nlog(n)) space
	// Worst: O(nlog(n)) time | O(nlog(n)) space
	public static int[] MergeSort(int[] array) {
		if (array.Length <= 1) {
			return array;
		}
		int middleIdx = array.Length / 2;
		int[] leftHalf = array.Take(middleIdx).ToArray();
		int[] rightHalf = array.Skip(middleIdx).ToArray();
		return mergeSortedArrays(MergeSort(leftHalf), MergeSort(rightHalf));
	}

	public static int[] mergeSortedArrays(int[] leftHalf, int[] rightHalf) {
		int[] sortedArray = new int[leftHalf.Length + rightHalf.Length];
		int k = 0;
		int i = 0;
		int j = 0;
		while (i < leftHalf.Length && j < rightHalf.Length) {
			if (leftHalf[i] <= rightHalf[j]) {
				sortedArray[k++] = leftHalf[i++];
			} else {
				sortedArray[k++] = rightHalf[j++];
			}
		}
		while (i < leftHalf.Length) {
			sortedArray[k++] = leftHalf[i++];
		}
		while (j < rightHalf.Length) {
			sortedArray[k++] = rightHalf[j++];
		}
		return sortedArray;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.


public class Program {
	// Best: O(nlog(n)) time | O(n) space
	// Average: O(nlog(n)) time | O(n) space
	// Worst: O(nlog(n)) time | O(n) space
	public static int[] MergeSort(int[] array) {
		if (array.Length <= 1) {
			return array;
		}
		int[] auxiliaryArray = (int[]) array.Clone();
		MergeSort(array, 0, array.Length - 1, auxiliaryArray);
		return array;
	}

	public static void MergeSort(int[] mainArray, int startIdx, int endIdx,
	  int[] auxiliaryArray) {
		if (startIdx == endIdx) {
			return;
		}
		int middleIdx = (startIdx + endIdx) / 2;
		MergeSort(auxiliaryArray, startIdx, middleIdx, mainArray);
		MergeSort(auxiliaryArray, middleIdx + 1, endIdx, mainArray);
		doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray);
	}

	public static void doMerge(int[] mainArray, int startIdx, int middleIdx, int endIdx,
	  int[] auxiliaryArray) {
		int k = startIdx;
		int i = startIdx;
		int j = middleIdx + 1;
		while (i <= middleIdx && j <= endIdx) {
			if (auxiliaryArray[i] <= auxiliaryArray[j]) {
				mainArray[k++] = auxiliaryArray[i++];
			} else {
				mainArray[k++] = auxiliaryArray[j++];
			}
		}
		while (i <= middleIdx) {
			mainArray[k++] = auxiliaryArray[i++];
		}
		while (j <= endIdx) {
			mainArray[k++] = auxiliaryArray[j++];
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] expected = {2, 3, 5, 5, 6, 8, 9};
		int[] input = {8, 5, 2, 9, 5, 6, 3};
		Utils.AssertTrue(compare(Program.MergeSort(input), expected));
	}

	public bool compare(int[] arr1, int[] arr2) {
		if (arr1.Length != arr2.Length) {
			return false;
		}
		for (int i = 0; i < arr1.Length; i++) {
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
	expected := []int{2, 3, 5, 5, 6, 8, 9}
	output := MergeSort([]int{8, 5, 2, 9, 5, 6, 3})
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// Best: O(nlog(n)) time | O(nlog(n)) space
// Average: O(nlog(n)) time | O(nlog(n)) space
// Worst: O(nlog(n)) time | O(nlog(n)) space
func MergeSort(array []int) []int {
	if len(array) <= 1 {
		return array
	}
	middleIndex := len(array) / 2
	leftHalf := MergeSort(array[:middleIndex])
	rightHalf := MergeSort(array[middleIndex:])
	return mergeSortedArrays(leftHalf, rightHalf)
}

func mergeSortedArrays(leftHalf, rightHalf []int) []int {
	sortedArray := make([]int, len(leftHalf)+len(rightHalf))
	k, i, j := 0, 0, 0
	for i < len(leftHalf) && j < len(rightHalf) {
		if leftHalf[i] <= rightHalf[j] {
			sortedArray[k] = leftHalf[i]
			i++
		} else {
			sortedArray[k] = rightHalf[j]
			j++
		}
		k++
	}
	for i < len(leftHalf) {
		sortedArray[k] = leftHalf[i]
		i++
		k++
	}
	for j < len(rightHalf) {
		sortedArray[k] = rightHalf[j]
		j++
		k++
	}
	return sortedArray
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// Best: O(nlog(n)) time | O(n) space
// Average: O(nlog(n)) time | O(n) space
// Worst: O(nlog(n)) time | O(n) space
func MergeSort(array []int) []int {
	if len(array) <= 1 {
		return array
	}
	auxiliaryArray := make([]int, len(array))
	copy(auxiliaryArray, array)
	mergeSortHelper(array, 0, len(array)-1, auxiliaryArray)
	return array
}

func mergeSortHelper(mainArray []int, startIdx, endIdx int, auxiliaryArray []int) {
	if startIdx == endIdx {
		return
	}
	middleIdx := (startIdx + endIdx) / 2
	mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray)
	mergeSortHelper(auxiliaryArray, middleIdx+1, endIdx, mainArray)
	doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray)
}

func doMerge(mainArray []int, startIdx, middleIdx, endIdx int, auxiliaryArray []int) {
	k := startIdx
	i := startIdx
	j := middleIdx + 1
	for i <= middleIdx && j <= endIdx {
		if auxiliaryArray[i] <= auxiliaryArray[j] {
			mainArray[k] = auxiliaryArray[i]
			i++
		} else {
			mainArray[k] = auxiliaryArray[j]
			j++
		}
		k++
	}
	for i <= middleIdx {
		mainArray[k] = auxiliaryArray[i]
		i++
		k++
	}
	for j <= endIdx {
		mainArray[k] = auxiliaryArray[j]
		j++
		k++
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
	expected := []int{2, 3, 5, 5, 6, 8, 9}
	output := MergeSort([]int{8, 5, 2, 9, 5, 6, 3})
	require.Equal(t, expected, output)
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
    int[] expected = {2, 3, 5, 5, 6, 8, 9};
    int[] input = {8, 5, 2, 9, 5, 6, 3};
    Utils.assertTrue(compare(Program.mergeSort(input), expected));
  }

  public boolean compare(int[] arr1, int[] arr2) {
    if (arr1.length != arr2.length) {
      return false;
    }
    for (int i = 0; i < arr1.length; i++) {
      if (arr1[i] != arr2[i]) {
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

import java.util.Arrays;

class Program {
  // Best: O(nlog(n)) time | O(nlog(n)) space
  // Average: O(nlog(n)) time | O(nlog(n)) space
  // Worst: O(nlog(n)) time | O(nlog(n)) space
  public static int[] mergeSort(int[] array) {
    if (array.length <= 1) {
      return array;
    }
    int middleIdx = array.length / 2;
    int[] leftHalf = Arrays.copyOfRange(array, 0, middleIdx);
    int[] rightHalf = Arrays.copyOfRange(array, middleIdx, array.length);
    return mergeSortedArrays(mergeSort(leftHalf), mergeSort(rightHalf));
  }

  public static int[] mergeSortedArrays(int[] leftHalf, int[] rightHalf) {
    int[] sortedArray = new int[leftHalf.length + rightHalf.length];
    int k = 0;
    int i = 0;
    int j = 0;
    while (i < leftHalf.length && j < rightHalf.length) {
      if (leftHalf[i] <= rightHalf[j]) {
        sortedArray[k++] = leftHalf[i++];
      } else {
        sortedArray[k++] = rightHalf[j++];
      }
    }
    while (i < leftHalf.length) {
      sortedArray[k++] = leftHalf[i++];
    }
    while (j < rightHalf.length) {
      sortedArray[k++] = rightHalf[j++];
    }
    return sortedArray;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // Best: O(nlog(n)) time | O(n) space
  // Average: O(nlog(n)) time | O(n) space
  // Worst: O(nlog(n)) time | O(n) space
  public static int[] mergeSort(int[] array) {
    if (array.length <= 1) {
      return array;
    }
    int[] auxiliaryArray = array.clone();
    mergeSort(array, 0, array.length - 1, auxiliaryArray);
    return array;
  }

  public static void mergeSort(int[] mainArray, int startIdx, int endIdx, int[] auxiliaryArray) {
    if (startIdx == endIdx) {
      return;
    }
    int middleIdx = (startIdx + endIdx) / 2;
    mergeSort(auxiliaryArray, startIdx, middleIdx, mainArray);
    mergeSort(auxiliaryArray, middleIdx + 1, endIdx, mainArray);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray);
  }

  public static void doMerge(
      int[] mainArray, int startIdx, int middleIdx, int endIdx, int[] auxiliaryArray) {
    int k = startIdx;
    int i = startIdx;
    int j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    int[] expected = {2, 3, 5, 5, 6, 8, 9};
    int[] input = {8, 5, 2, 9, 5, 6, 3};
    Utils.assertTrue(compare(Program.mergeSort(input), expected));
  }

  public boolean compare(int[] arr1, int[] arr2) {
    if (arr1.length != arr2.length) {
      return false;
    }
    for (int i = 0; i < arr1.length; i++) {
      if (arr1[i] != arr2[i]) {
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
  const input = [8, 5, 2, 9, 5, 6, 3];
  chai.expect(program.mergeSort(input)).to.deep.equal([2, 3, 5, 5, 6, 8, 9]);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Best: O(nlog(n)) time | O(nlog(n)) space
// Average: O(nlog(n)) time | O(nlog(n)) space
// Worst: O(nlog(n)) time | O(nlog(n)) space
function mergeSort(array) {
  if (array.length <= 1) return array;
  const middleIdx = Math.floor(array.length / 2);
  const leftHalf = array.slice(0, middleIdx);
  const rightHalf = array.slice(middleIdx);
  return mergeSortedArrays(mergeSort(leftHalf), mergeSort(rightHalf));
}

function mergeSortedArrays(leftHalf, rightHalf) {
  const sortedArray = new Array(leftHalf.length + rightHalf.length);
  let k = 0;
  let i = 0;
  let j = 0;
  while (i < leftHalf.length && j < rightHalf.length) {
    if (leftHalf[i] <= rightHalf[j]) {
      sortedArray[k++] = leftHalf[i++];
    } else {
      sortedArray[k++] = rightHalf[j++];
    }
  }
  while (i < leftHalf.length) {
    sortedArray[k++] = leftHalf[i++];
  }
  while (j < rightHalf.length) {
    sortedArray[k++] = rightHalf[j++];
  }
  return sortedArray;
}

exports.mergeSort = mergeSort;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Best: O(nlog(n)) time | O(n) space
// Average: O(nlog(n)) time | O(n) space
// Worst: O(nlog(n)) time | O(n) space
function mergeSort(array) {
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray);
  return array;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    mainArray[k++] = auxiliaryArray[j++];
  }
}

exports.mergeSort = mergeSort;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [8, 5, 2, 9, 5, 6, 3];
  chai.expect(program.mergeSort(input)).to.deep.equal([2, 3, 5, 5, 6, 8, 9]);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.mergeSort as mergeSort

class ProgramTest {
    @Test
    fun TestCase1() {
        val expected = mutableListOf(2, 3, 5, 5, 6, 8, 9)
        val input = mutableListOf(8, 5, 2, 9, 5, 6, 3)
        assert(mergeSort(input) == expected)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// Best: O(nlog(n)) time | O(nlog(n)) space
// Average: O(nlog(n)) time | O(nlog(n)) space
// Worst: O(nlog(n)) time | O(nlog(n)) space
fun mergeSort(array: MutableList<Int>): List<Int> {
    if (array.size <= 1) return array
    val middleIdx = array.size / 2
    val leftHalf = array.subList(0, middleIdx).toMutableList()
    val rightHalf = array.subList(middleIdx, array.size).toMutableList()
    return mergeSortedArrays(mergeSort(leftHalf), mergeSort(rightHalf))
}

fun mergeSortedArrays(leftHalf: List<Int>, rightHalf: List<Int>): List<Int> {
    val sortedArray = MutableList<Int>(leftHalf.size + rightHalf.size) { 0 }
    var k = 0
    var i = 0
    var j = 0
    while (i < leftHalf.size && j < rightHalf.size) {
        if (leftHalf[i] <= rightHalf[j]) {
            sortedArray[k++] = leftHalf[i++]
        } else {
            sortedArray[k++] = rightHalf[j++]
        }
    }
    while (i < leftHalf.size) {
        sortedArray[k++] = leftHalf[i++]
    }
    while (j < rightHalf.size) {
        sortedArray[k++] = rightHalf[j++]
    }
    return sortedArray
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// Best: O(nlog(n)) time | O(n) space
// Average: O(nlog(n)) time | O(n) space
// Worst: O(nlog(n)) time | O(n) space
fun mergeSort(array: MutableList<Int>): List<Int> {
    if (array.size <= 1) return array
    val auxiliaryArray = array.toMutableList()
    mergeSortHelper(array, 0, array.size - 1, auxiliaryArray)
    return array
}

fun mergeSortHelper(mainArray: MutableList<Int>, startIdx: Int, endIdx: Int, auxiliaryArray: MutableList<Int>) {
    if (startIdx == endIdx) return
    val middleIdx = (startIdx + endIdx) / 2
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray)
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray)
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray)
}

fun doMerge(mainArray: MutableList<Int>, startIdx: Int, middleIdx: Int, endIdx: Int, auxiliaryArray: List<Int>) {
    var k = startIdx
    var i = startIdx
    var j = middleIdx + 1
    while (i <= middleIdx && j <= endIdx) {
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            mainArray[k++] = auxiliaryArray[i++]
        } else {
            mainArray[k++] = auxiliaryArray[j++]
        }
    }
    while (i <= middleIdx) {
        mainArray[k++] = auxiliaryArray[i++]
    }
    while (j <= endIdx) {
        mainArray[k++] = auxiliaryArray[j++]
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.mergeSort as mergeSort

class ProgramTest {
    @Test
    fun TestCase1() {
        val expected = mutableListOf(2, 3, 5, 5, 6, 8, 9)
        val input = mutableListOf(8, 5, 2, 9, 5, 6, 3)
        assert(mergeSort(input) == expected)
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
      var arrayToSort = [8, 5, 2, 9, 5, 6, 3]
      try assertEqual([2, 3, 5, 5, 6, 8, 9], program.mergeSort(&arrayToSort))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // Best: O(nlog(n)) time | O(nlog(n)) space
  // Average: O(nlog(n)) time | O(nlog(n)) space
  // Worst: O(nlog(n)) time | O(nlog(n)) space
  func mergeSort(_ array: inout [Int]) -> [Int] {
    if array.count <= 1 {
      return array
    }

    let middleIndex = Int(Double(array.count / 2).rounded(.down))
    var leftHalf = Array(array[0 ..< middleIndex])
    var rightHalf = Array(array[middleIndex ..< array.count])

    return mergeSortedArrays(mergeSort(&leftHalf), mergeSort(&rightHalf))
  }

  func mergeSortedArrays(_ leftHalf: [Int], _ rightHalf: [Int]) -> [Int] {
    var sortedArray = Array(repeating: 0, count: leftHalf.count + rightHalf.count)

    var k = 0, i = 0, j = 0

    while i < leftHalf.count, j < rightHalf.count {
      if leftHalf[i] <= rightHalf[j] {
        sortedArray[k] = leftHalf[i]
        i += 1
      } else {
        sortedArray[k] = rightHalf[j]
        j += 1
      }

      k += 1
    }

    while i < leftHalf.count {
      sortedArray[k] = leftHalf[i]
      i += 1
      k += 1
    }

    while j < rightHalf.count {
      sortedArray[k] = rightHalf[j]
      j += 1
      k += 1
    }

    return sortedArray
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // Best: O(nlog(n) time | O(n) space
  // Average: O(nlog(n) time | O(n) space
  // Worst: O(nlog(n) time | O(n) space
  func mergeSort(_ array: inout [Int]) -> [Int] {
    if array.count <= 1 {
      return array
    }

    var auxiliaryArray = array
    mergeSortHelper(0, array.count - 1, &array, &auxiliaryArray)

    return array
  }

  func mergeSortHelper(_ startIndex: Int, _ endIndex: Int, _ firstArray: inout [Int], _ secondArray: inout [Int]) {
    if startIndex == endIndex {
      return
    }

    let middleIndex = Int(Double((startIndex + endIndex) / 2).rounded(.down))

    mergeSortHelper(startIndex, middleIndex, &secondArray, &firstArray)
    mergeSortHelper(middleIndex + 1, endIndex, &secondArray, &firstArray)
    doMerge(startIndex, middleIndex, endIndex, &firstArray, &secondArray)
  }

  func doMerge(_ startIndex: Int, _ middleIndex: Int, _ endIndex: Int, _ firstArray: inout [Int], _ secondArray: inout [Int]) {
    var k = startIndex, i = startIndex, j = middleIndex + 1

    while i <= middleIndex, j <= endIndex {
      if secondArray[i] <= secondArray[j] {
        firstArray[k] = secondArray[i]
        i += 1
      } else {
        firstArray[k] = secondArray[j]
        j += 1
      }

      k += 1
    }

    while i <= middleIndex {
      firstArray[k] = secondArray[i]
      i += 1
      k += 1
    }

    while j <= endIndex {
      firstArray[k] = secondArray[j]
      j += 1
      k += 1
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
      var arrayToSort = [8, 5, 2, 9, 5, 6, 3]
      try assertEqual([2, 3, 5, 5, 6, 8, 9], program.mergeSort(&arrayToSort))
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
        self.assertEqual(program.mergeSort([8, 5, 2, 9, 5, 6, 3]), [2, 3, 5, 5, 6, 8, 9])

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Best: O(nlog(n)) time | O(nlog(n)) space
# Average: O(nlog(n)) time | O(nlog(n)) space
# Worst: O(nlog(n)) time | O(nlog(n)) space
def mergeSort(array):
    if len(array) == 1:
        return array
    middleIdx = len(array) // 2
    leftHalf = array[:middleIdx]
    rightHalf = array[middleIdx:]
    return mergeSortedArrays(mergeSort(leftHalf), mergeSort(rightHalf))


def mergeSortedArrays(leftHalf, rightHalf):
    sortedArray = [None] * (len(leftHalf) + len(rightHalf))
    k = i = j = 0
    while i < len(leftHalf) and j < len(rightHalf):
        if leftHalf[i] <= rightHalf[j]:
            sortedArray[k] = leftHalf[i]
            i += 1
        else:
            sortedArray[k] = rightHalf[j]
            j += 1
        k += 1
    while i < len(leftHalf):
        sortedArray[k] = leftHalf[i]
        i += 1
        k += 1
    while j < len(rightHalf):
        sortedArray[k] = rightHalf[j]
        j += 1
        k += 1
    return sortedArray

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Best: O(nlog(n)) time | O(n) space
# Average: O(nlog(n)) time | O(n) space
# Worst: O(nlog(n)) time | O(n) space
def mergeSort(array):
    if len(array) <= 1:
        return array
    auxiliaryArray = array[:]
    mergeSortHelper(array, 0, len(array) - 1, auxiliaryArray)
    return array


def mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray):
    if startIdx == endIdx:
        return
    middleIdx = (startIdx + endIdx) // 2
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray)
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray)
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray)


def doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray):
    k = startIdx
    i = startIdx
    j = middleIdx + 1
    while i <= middleIdx and j <= endIdx:
        if auxiliaryArray[i] <= auxiliaryArray[j]:
            mainArray[k] = auxiliaryArray[i]
            i += 1
        else:
            mainArray[k] = auxiliaryArray[j]
            j += 1
        k += 1
    while i <= middleIdx:
        mainArray[k] = auxiliaryArray[i]
        i += 1
        k += 1
    while j <= endIdx:
        mainArray[k] = auxiliaryArray[j]
        j += 1
        k += 1

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.mergeSort([8, 5, 2, 9, 5, 6, 3]), [2, 3, 5, 5, 6, 8, 9])

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [8, 5, 2, 9, 5, 6, 3];
  chai.expect(program.mergeSort(input)).to.deep.equal([2, 3, 5, 5, 6, 8, 9]);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Best: O(nlog(n)) time | O(nlog(n)) space
// Average: O(nlog(n)) time | O(nlog(n)) space
// Worst: O(nlog(n)) time | O(nlog(n)) space
export function mergeSort(array: number[]): number[] {
  if (array.length <= 1) return array;
  const middleIdx = Math.floor(array.length / 2);
  const leftHalf = array.slice(0, middleIdx);
  const rightHalf = array.slice(middleIdx);
  return mergeSortedArrays(mergeSort(leftHalf), mergeSort(rightHalf));
}

function mergeSortedArrays(leftHalf: number[], rightHalf: number[]) {
  const sortedArray: number[] = new Array(leftHalf.length + rightHalf.length);
  let k = 0;
  let i = 0;
  let j = 0;
  while (i < leftHalf.length && j < rightHalf.length) {
    if (leftHalf[i] <= rightHalf[j]) {
      sortedArray[k++] = leftHalf[i++];
    } else {
      sortedArray[k++] = rightHalf[j++];
    }
  }
  while (i < leftHalf.length) {
    sortedArray[k++] = leftHalf[i++];
  }
  while (j < rightHalf.length) {
    sortedArray[k++] = rightHalf[j++];
  }
  return sortedArray;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Best: O(nlog(n)) time | O(n) space
// Average: O(nlog(n)) time | O(n) space
// Worst: O(nlog(n)) time | O(n) space
export function mergeSort(array: number[]) {
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray);
  return array;
}

function mergeSortHelper(mainArray: number[], startIdx: number, endIdx: number, auxiliaryArray: number[]) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray);
}

function doMerge(mainArray: number[], startIdx: number, middleIdx: number, endIdx: number, auxiliaryArray: number[]) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    mainArray[k++] = auxiliaryArray[j++];
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [8, 5, 2, 9, 5, 6, 3];
  chai.expect(program.mergeSort(input)).to.deep.equal([2, 3, 5, 5, 6, 8, 9]);
});

```

