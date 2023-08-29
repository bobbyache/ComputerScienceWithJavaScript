# Radix Sort
<div class="html">
<p>
  Write a function that takes in an array of non-negative integers and returns a
  sorted version of that array. Use the Radix Sort algorithm to sort the array.
</p>
<p>
  If you're unfamiliar with Radix Sort, we recommend watching the Conceptual
  Overview section of this question's video explanation before starting to code.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [8762, 654, 3008, 345, 87, 65, 234, 12, 2]
</pre>
<h3>Sample Output</h3>
<pre>
[2, 12, 65, 87, 234, 345, 654, 3008, 8762]
</pre>
</div>

Hint 1
<p>
  Radix Sort sorts numbers by looking only at one of their digits at a time. It
  first sorts all of the given numbers by their ones' column, then by their
  tens' column, then by their hundreds' column, and so on and so forth until
  they're fully sorted.
</p>


Hint 2

<p>
  Radix Sort uses an intermediary sorting algorithm to sort numbers one digits'
  column at a time. The goal of Radix Sort is to perform a more efficient sort
  than popular sorting algorithms like Merge Sort or Quick Sort for inputs that
  are well suited to be sorted by their individual digits' columns. With this in
  mind, what intermediary sorting algorithm should we use with Radix Sort? Keep
  in mind that this sorting algorithm will run multiple times, sorting one
  digits' column at a time.
</p>


Hint 3

<p>
  The most popular sorting algorithm to use with Radix Sort is Counting Sort.
  Counting Sort takes advantage of the fact that we know the range of possible
  values that we need to sort. When sorting numbers, we know that we only need
  to sort digits, which will always be in the range <span>0-9</span>. Therefore,
  we can count how many times these digits occur and use those counts to
  populate a new sorted array. We'll perform counting sort multiple times, once
  for each digits' column that we're sorting, starting with the ones' column. We
  need to ensure that our counting sort performs a stable sort, so that we don't
  lose information from previous iterations of sorting. Counting sort runs in
  <span>O(n)</span> time, which means that we might have a much more efficient
  sorting algorithm if the largest number in our input contains few digits. See
  the Conceptual Overview section of this question's video explanation for a
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
      vector<int> input = {8762, 654, 3008, 345, 87, 65, 234, 12, 2};
      vector<int> expected = {2, 12, 65, 87, 234, 345, 654, 3008, 8762};
      vector<int> actual = radixSort(input);
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

void countingSort(vector<int> &array, int digit);
int myPow(int base, int exponent);

// O(d * (n + b)) time | O(n + b) space - where n is the length of the input
// array, d is the max number of digits, and b is the base of the numbering
// system used
vector<int> radixSort(vector<int> array) {
  if (array.size() == 0)
    return array;

  int maxNumber = *max_element(array.begin(), array.end());

  int digit = 0;
  while (maxNumber / (myPow(10, digit)) > 0) {
    countingSort(array, digit);
    digit++;
  }

  return array;
}

void countingSort(vector<int> &array, int digit) {
  vector<int> sortedArray(array.size(), 0);
  vector<int> countArray(10, 0);

  int digitColumn = myPow(10, digit);
  for (auto num : array) {
    int countIndex = num / digitColumn % 10;
    countArray[countIndex]++;
  }

  for (int idx = 1; idx < 10; idx++) {
    countArray[idx] += countArray[idx - 1];
  }

  for (int idx = array.size() - 1; idx > -1; idx--) {
    int countIndex = array[idx] / digitColumn % 10;
    countArray[countIndex]--;
    int sortedIndex = countArray[countIndex];
    sortedArray[sortedIndex] = array[idx];
  }

  for (int idx = 0; idx < array.size(); idx++) {
    array[idx] = sortedArray[idx];
  }
}

int myPow(int base, int exponent) {
  int result = 1;
  for (int i = 1; i <= exponent; i++)
    result *= base;
  return result;
}
```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> input = {8762, 654, 3008, 345, 87, 65, 234, 12, 2};
      vector<int> expected = {2, 12, 65, 87, 234, 345, 654, 3008, 8762};
      vector<int> actual = radixSort(input);
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
		List<int> input = new List<int> {
			8762, 654, 3008, 345, 87, 65, 234, 12, 2
		};
		List<int> expected = new List<int> {
			2, 12, 65, 87, 234, 345, 654, 3008, 8762
		};
		var actual = new Program().RadixSort(input);
		Utils.AssertTrue(Enumerable.SequenceEqual(expected, actual));
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

	// O(d * (n + b)) time | O(n + b) space - where n is the length of the input array,
	// d is the max number of digits, and b is the base of the numbering system used
	public List<int> RadixSort(List<int> array) {
		if (array.Count == 0) {
			return array;
		}

		int maxNumber = array.Max();

		int digit = 0;
		while ((maxNumber / Math.Pow(10, digit)) > 0) {
			countingSort(array, digit);
			digit += 1;
		}

		return array;
	}

	public void countingSort(List<int> array, int digit) {
		int[] sortedArray = new int[array.Count];
		int[] countArray = new int[10];

		int digitColumn = (int) Math.Pow(10, digit);
		foreach (var num in array) {
			int countIndex = (num / digitColumn) % 10;
			countArray[countIndex] += 1;
		}

		for (int idx = 1; idx < 10; idx++) {
			countArray[idx] += countArray[idx - 1];
		}

		for (int idx = array.Count - 1; idx > -1; idx--) {
			int countIndex = (array[idx] / digitColumn) % 10;
			countArray[countIndex] -= 1;
			int sortedIndex = countArray[countIndex];
			sortedArray[sortedIndex] = array[idx];
		}

		for (int idx = 0; idx < array.Count; idx++) {
			array[idx] = sortedArray[idx];
		}
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
		List<int> input = new List<int> {
			8762, 654, 3008, 345, 87, 65, 234, 12, 2
		};
		List<int> expected = new List<int> {
			2, 12, 65, 87, 234, 345, 654, 3008, 8762
		};
		var actual = new Program().RadixSort(input);
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
	input := []int{8762, 654, 3008, 345, 87, 65, 234, 12, 2}
	expected := []int{2, 12, 65, 87, 234, 345, 654, 3008, 8762}
	actual := RadixSort(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(d * (n + b)) time | O(n + b) space - where n is the length of the input array,
// d is the max number of digits, and b is the base of the numbering system used
func RadixSort(array []int) []int {
	if len(array) == 0 {
		return array
	}

	maxNumber := max(array)

	digit := 0
	for maxNumber/pow(10, digit) > 0 {
		countingSort(array, digit)
		digit += 1
	}

	return array
}

func countingSort(array []int, digit int) {
	sortedArray := make([]int, len(array))
	countArray := []int{0, 0, 0, 0, 0, 0, 0, 0, 0, 0}

	digitColumn := pow(10, digit)
	for _, num := range array {
		countIndex := (num / digitColumn) % 10
		countArray[countIndex] += 1
	}

	for idx := 1; idx < 10; idx++ {
		countArray[idx] += countArray[idx-1]
	}

	for idx := len(array) - 1; idx >= 0; idx-- {
		countIndex := (array[idx] / digitColumn) % 10
		countArray[countIndex] -= 1
		sortedIndex := countArray[countIndex]
		sortedArray[sortedIndex] = array[idx]
	}

	for idx := range array {
		array[idx] = sortedArray[idx]
	}
}

func max(array []int) int {
	currentMax := array[0]
	for _, element := range array {
		if currentMax < element {
			currentMax = element
		}
	}
	return currentMax
}

func pow(a int, power int) int {
	var result = 1
	for i := 0; i < power; i++ {
		result *= a
	}
	return result
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []int{8762, 654, 3008, 345, 87, 65, 234, 12, 2}
	expected := []int{2, 12, 65, 87, 234, 345, 654, 3008, 8762}
	actual := RadixSort(input)
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
    ArrayList<Integer> input =
        new ArrayList(Arrays.asList(8762, 654, 3008, 345, 87, 65, 234, 12, 2));
    ArrayList<Integer> expected =
        new ArrayList(Arrays.asList(2, 12, 65, 87, 234, 345, 654, 3008, 8762));
    var actual = new Program().radixSort(input);
    Utils.assertTrue(expected.equals(actual));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(d * (n + b)) time | O(n + b) space - where n is the length of the input array,
  // d is the max number of digits, and b is the base of the numbering system used
  public ArrayList<Integer> radixSort(ArrayList<Integer> array) {
    if (array.size() == 0) {
      return array;
    }

    int maxNumber = Collections.max(array);

    int digit = 0;
    while ((maxNumber / Math.pow(10, digit)) > 0) {
      countingSort(array, digit);
      digit += 1;
    }

    return array;
  }

  public void countingSort(ArrayList<Integer> array, int digit) {
    int[] sortedArray = new int[array.size()];
    int[] countArray = new int[10];

    int digitColumn = (int) Math.pow(10, digit);
    for (int num : array) {
      int countIndex = (num / digitColumn) % 10;
      countArray[countIndex] += 1;
    }

    for (int idx = 1; idx < 10; idx++) {
      countArray[idx] += countArray[idx - 1];
    }

    for (int idx = array.size() - 1; idx > -1; idx--) {
      int countIndex = (array.get(idx) / digitColumn) % 10;
      countArray[countIndex] -= 1;
      int sortedIndex = countArray[countIndex];
      sortedArray[sortedIndex] = array.get(idx);
    }

    for (int idx = 0; idx < array.size(); idx++) {
      array.set(idx, sortedArray[idx]);
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
    ArrayList<Integer> input =
        new ArrayList(Arrays.asList(8762, 654, 3008, 345, 87, 65, 234, 12, 2));
    ArrayList<Integer> expected =
        new ArrayList(Arrays.asList(2, 12, 65, 87, 234, 345, 654, 3008, 8762));
    var actual = new Program().radixSort(input);
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
  const input = [8762, 654, 3008, 345, 87, 65, 234, 12, 2];
  const expected = [2, 12, 65, 87, 234, 345, 654, 3008, 8762];
  const actual = program.radixSort(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(d * (n + b)) time | O(n + b) space - where n is the length of the input array,
// d is the max number of digits, and b is the base of the numbering system used
function radixSort(array) {
  if (array.length === 0) return array;

  const maxNumber = Math.max(...array);

  let digit = 0;
  while (maxNumber / 10 ** digit > 0) {
    countingSort(array, digit);
    digit++;
  }

  return array;
}

function countingSort(array, digit) {
  const sortedArray = new Array(array.length).fill(0);
  const countArray = new Array(10).fill(0);

  const digitColumn = 10 ** digit;
  for (const num of array) {
    const countIndex = Math.floor(num / digitColumn) % 10;
    countArray[countIndex]++;
  }

  for (let idx = 1; idx < 10; idx++) {
    countArray[idx] += countArray[idx - 1];
  }

  for (let idx = array.length - 1; idx > -1; idx--) {
    const countIndex = Math.floor(array[idx] / digitColumn) % 10;
    countArray[countIndex]--;
    const sortedIndex = countArray[countIndex];
    sortedArray[sortedIndex] = array[idx];
  }

  for (let idx = 0; idx < array.length; idx++) {
    array[idx] = sortedArray[idx];
  }
}

// Do not edit the line below.
exports.radixSort = radixSort;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [8762, 654, 3008, 345, 87, 65, 234, 12, 2];
  const expected = [2, 12, 65, 87, 234, 345, 654, 3008, 8762];
  const actual = program.radixSort(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.radixSort

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(8762, 654, 3008, 345, 87, 65, 234, 12, 2)
        val expected = mutableListOf(2, 12, 65, 87, 234, 345, 654, 3008, 8762)
        val output = radixSort(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.pow

// O(d * (n + b)) time | O(n + b) space - where n is the length of the input array, 
// d is the max number of digits, and b is the base of the numbering system used
fun radixSort(array: MutableList<Int>): MutableList<Int> {
    if (array.size == 0) return array

    val maxNumber = array.max()!!

    var digit = 0
    while (maxNumber / 10.0.pow(digit).toInt() > 0) {
        countingSort(array, digit)
        digit += 1
    }

    return array
}

fun countingSort(array: MutableList<Int>, digit: Int) {
    val sortedArray = Array(array.size) { 0 }
    val countArray = Array(10) { 0 }

    val digitColumn = 10.0.pow(digit).toInt()
    for (num in array) {
        val countIndex = (num / digitColumn) % 10
        countArray[countIndex] += 1
    }

    for (idx in 1 until 10) {
        countArray[idx] += countArray[idx - 1]
    }

    for (idx in array.size - 1 downTo 0) {
        val countIndex = (array[idx] / digitColumn) % 10
        countArray[countIndex] -= 1
        val sortedIndex = countArray[countIndex]
        sortedArray[sortedIndex] = array[idx]
    }

    for (idx in 0 until array.size) {
        array[idx] = sortedArray[idx]
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.radixSort

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(8762, 654, 3008, 345, 87, 65, 234, 12, 2)
        val expected = mutableListOf(2, 12, 65, 87, 234, 345, 654, 3008, 8762)
        val output = radixSort(input)
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
      var input = [8762, 654, 3008, 345, 87, 65, 234, 12, 2]
      var expected = [2, 12, 65, 87, 234, 345, 654, 3008, 8762]
      var actual = Program().radixSort(&input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(d * (n + b)) time | O(n + b) space - where n is the length of the input array,
  // d is the max number of digits, and b is the base of the numbering system used
  func radixSort(_ array: inout [Int]) -> [Int] {
    if array.count == 0 {
      return array
    }

    let maxNumber = array.max()!

    var digit = 0
    while (maxNumber / pow(10, digit)) > 0 {
      countingSort(&array, digit)
      digit += 1
    }

    return array
  }

  func countingSort(_ array: inout [Int], _ digit: Int) {
    var sortedArray = Array(repeating: 0, count: array.count)
    var countArray = Array(repeating: 0, count: 10)

    let digitColumn = pow(10, digit)
    for num in array {
      let countIndex = (num / digitColumn) % 10
      countArray[countIndex] += 1
    }

    for idx in stride(from: 1, to: 10, by: 1) {
      countArray[idx] += countArray[idx - 1]
    }

    for idx in stride(from: array.count - 1, through: 0, by: -1) {
      let countIndex = (array[idx] / digitColumn) % 10
      countArray[countIndex] -= 1
      let sortedIndex = countArray[countIndex]
      sortedArray[sortedIndex] = array[idx]
    }

    for idx in 0 ..< array.count {
      array[idx] = sortedArray[idx]
    }
  }

  func pow(_ a: Int, _ power: Int) -> Int {
    var result = 1
    for i in 0 ..< power {
      result *= a
    }
    return result
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = [8762, 654, 3008, 345, 87, 65, 234, 12, 2]
      var expected = [2, 12, 65, 87, 234, 345, 654, 3008, 8762]
      var actual = Program().radixSort(&input)
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
        input = [8762, 654, 3008, 345, 87, 65, 234, 12, 2]
        expected = [2, 12, 65, 87, 234, 345, 654, 3008, 8762]
        actual = program.radixSort(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(d * (n + b)) time | O(n + b) space - where n is the length of the input array,
# d is the max number of digits, and b is the base of the numbering system used
def radixSort(array):
    if len(array) == 0:
        return array

    maxNumber = max(array)

    digit = 0
    while maxNumber / 10 ** digit > 0:
        countingSort(array, digit)
        digit += 1

    return array


def countingSort(array, digit):
    sortedArray = [0] * len(array)
    countArray = [0] * 10

    digitColumn = 10 ** digit
    for num in array:
        countIndex = (num // digitColumn) % 10
        countArray[countIndex] += 1

    for idx in range(1, 10):
        countArray[idx] += countArray[idx - 1]

    for idx in range(len(array) - 1, -1, -1):
        countIndex = (array[idx] // digitColumn) % 10
        countArray[countIndex] -= 1
        sortedIndex = countArray[countIndex]
        sortedArray[sortedIndex] = array[idx]

    for idx in range(len(array)):
        array[idx] = sortedArray[idx]

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [8762, 654, 3008, 345, 87, 65, 234, 12, 2]
        expected = [2, 12, 65, 87, 234, 345, 654, 3008, 8762]
        actual = program.radixSort(input)
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
  const input = [8762, 654, 3008, 345, 87, 65, 234, 12, 2];
  const expected = [2, 12, 65, 87, 234, 345, 654, 3008, 8762];
  const actual = program.radixSort(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(d * (n + b)) time | O(n + b) space - where n is the length of the input array,
// d is the max number of digits, and b is the base of the numbering system used
export function radixSort(array: number[]) {
  if (array.length === 0) return array;

  const maxNumber = Math.max(...array);

  let digit = 0;
  while (maxNumber / 10 ** digit > 0) {
    countingSort(array, digit);
    digit++;
  }

  return array;
}

function countingSort(array: number[], digit: number) {
  const sortedArray = new Array(array.length).fill(0);
  const countArray = new Array(10).fill(0);

  const digitColumn = 10 ** digit;
  for (const num of array) {
    const countIndex = Math.floor(num / digitColumn) % 10;
    countArray[countIndex]++;
  }

  for (let idx = 1; idx < 10; idx++) {
    countArray[idx] += countArray[idx - 1];
  }

  for (let idx = array.length - 1; idx > -1; idx--) {
    const countIndex = Math.floor(array[idx] / digitColumn) % 10;
    countArray[countIndex]--;
    const sortedIndex = countArray[countIndex];
    sortedArray[sortedIndex] = array[idx];
  }

  for (let idx = 0; idx < array.length; idx++) {
    array[idx] = sortedArray[idx];
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [8762, 654, 3008, 345, 87, 65, 234, 12, 2];
  const expected = [2, 12, 65, 87, 234, 345, 654, 3008, 8762];
  const actual = program.radixSort(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

