# Smallest Difference
<div class="html">
<p>
  Write a function that takes in two non-empty arrays of integers, finds the
  pair of numbers (one from each array) whose absolute difference is closest to
  zero, and returns an array containing these two numbers, with the number from
  the first array in the first position.
</p>
<p>
  Note that the absolute difference of two integers is the distance between
  them on the real number line. For example, the absolute difference of -5 and 5
  is 10, and the absolute difference of -5 and -4 is 1.
</p>
<p>
  You can assume that there will only be one pair of numbers with the smallest
  difference.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">arrayOne</span> = [-1, 5, 10, 20, 28, 3]
<span class="CodeEditor-promptParameter">arrayTwo</span> = [26, 134, 135, 15, 17]
</pre>
<h3>Sample Output</h3>
<pre>[28, 26]</pre>
</div>

Hint 1
<p>
Instead of generating all possible pairs of numbers, try somehow only looking at pairs that you know could actually have the smallest difference. How can you accomplish this?
</p>


Hint 2

<p>
Would it help if the two arrays were sorted? If the arrays were sorted and you were looking at a given pair of numbers, could you efficiently find the next pair of numbers to look at? What are the runtime implications of sorting the arrays?
</p>


Hint 3

<p>
Start by sorting both arrays, as per Hint #2. Put a pointer at the beginning of both arrays and evaluate the absolute difference of the pointer-numbers. If the difference is equal to zero, then you've found the closest pair; otherwise, increment the pointer of the smaller of the two numbers to find a potentially better pair. Continue until you get a pair with a difference of zero or until one of the pointers gets out of range of its array.
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
      vector<int> expected{28, 26};
      assert(smallestDifference({-1, 5, 10, 20, 28, 3},
                                {26, 134, 135, 15, 17}) == expected);
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

// O(nlog(n) + mlog(m)) time | O(1) space
vector<int> smallestDifference(vector<int> arrayOne, vector<int> arrayTwo) {
  sort(arrayOne.begin(), arrayOne.end());
  sort(arrayTwo.begin(), arrayTwo.end());
  int idxOne = 0;
  int idxTwo = 0;
  int smallest = INT_MAX;
  int current = INT_MAX;
  vector<int> smallestPair;
  while (idxOne < arrayOne.size() && idxTwo < arrayTwo.size()) {
    int firstNum = arrayOne[idxOne];
    int secondNum = arrayTwo[idxTwo];
    if (firstNum < secondNum) {
      current = secondNum - firstNum;
      idxOne++;
    } else if (secondNum < firstNum) {
      current = firstNum - secondNum;
      idxTwo++;
    } else {
      return vector<int>{firstNum, secondNum};
    }
    if (smallest > current) {
      smallest = current;
      smallestPair = {firstNum, secondNum};
    }
  }
  return smallestPair;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> expected{28, 26};
      assert(smallestDifference({-1, 5, 10, 20, 28, 3},
                                {26, 134, 135, 15, 17}) == expected);
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

public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] expected = {28, 26};
		Utils.AssertTrue(Enumerable.SequenceEqual(Program.SmallestDifference(new int[] {-1,
		                                                                                5,
		                                                                                10,
		                                                                                20,
		                                                                                28,
		                                                                                3},
		  new int[] {26,
		             134,
		             135,
		             15,
		             17}),
		  expected));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// O(nlog(n) + mlog(m)) time | O(1) space
	public static int[] SmallestDifference(int[] arrayOne, int[] arrayTwo) {
		Array.Sort(arrayOne);
		Array.Sort(arrayTwo);
		int idxOne = 0;
		int idxTwo = 0;
		int smallest = Int32.MaxValue;
		int current = Int32.MaxValue;
		int[] smallestPair = new int[2];
		while (idxOne < arrayOne.Length && idxTwo < arrayTwo.Length) {
			int firstNum = arrayOne[idxOne];
			int secondNum = arrayTwo[idxTwo];
			if (firstNum < secondNum) {
				current = secondNum - firstNum;
				idxOne++;
			} else if (secondNum < firstNum) {
				current = firstNum - secondNum;
				idxTwo++;
			} else {
				return new int[] {firstNum, secondNum};
			}
			if (smallest > current) {
				smallest = current;
				smallestPair = new int[] {firstNum, secondNum};
			}
		}
		return smallestPair;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Linq;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] expected = {28, 26};
		Utils.AssertTrue(Enumerable.SequenceEqual(Program.SmallestDifference(new int[] {-1,
		                                                                                5,
		                                                                                10,
		                                                                                20,
		                                                                                28,
		                                                                                3},
		  new int[] {26,
		             134,
		             135,
		             15,
		             17}),
		  expected));
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
	expected := []int{28, 26}
	output := SmallestDifference([]int{-1, 5, 10, 20, 28, 3}, []int{26, 134, 135, 15, 17})
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"math"
	"sort"
)

// O(nlog(n) + mlog(m)) time | O(1) space
func SmallestDifference(array1, array2 []int) []int {
	sort.Ints(array1)
	sort.Ints(array2)
	idxOne, idxTwo := 0, 0
	smallest, current := math.MaxInt32, math.MaxInt32
	smallestPair := []int{}
	for idxOne < len(array1) && idxTwo < len(array2) {
		first, second := array1[idxOne], array2[idxTwo]
		if first < second {
			current = second - first
			idxOne += 1
		} else if second < first {
			current = first - second
			idxTwo += 1
		} else {
			return []int{first, second}
		}
		if smallest > current {
			smallest = current
			smallestPair = []int{first, second}
		}
	}
	return smallestPair
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := []int{28, 26}
	output := SmallestDifference([]int{-1, 5, 10, 20, 28, 3}, []int{26, 134, 135, 15, 17})
	require.Equal(t, expected, output)
}

```
### Sandbox Code (java)
```java
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import java.util.Arrays;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[] expected = {28, 26};
    Utils.assertTrue(
        Arrays.equals(
            Program.smallestDifference(
                new int[] {-1, 5, 10, 20, 28, 3}, new int[] {26, 134, 135, 15, 17}),
            expected));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.Arrays;

class Program {
  // O(nlog(n) + mlog(m)) time | O(1) space
  public static int[] smallestDifference(int[] arrayOne, int[] arrayTwo) {
    Arrays.sort(arrayOne);
    Arrays.sort(arrayTwo);
    int idxOne = 0;
    int idxTwo = 0;
    int smallest = Integer.MAX_VALUE;
    int current = Integer.MAX_VALUE;
    int[] smallestPair = new int[2];
    while (idxOne < arrayOne.length && idxTwo < arrayTwo.length) {
      int firstNum = arrayOne[idxOne];
      int secondNum = arrayTwo[idxTwo];
      if (firstNum < secondNum) {
        current = secondNum - firstNum;
        idxOne++;
      } else if (secondNum < firstNum) {
        current = firstNum - secondNum;
        idxTwo++;
      } else {
        return new int[] {firstNum, secondNum};
      }
      if (smallest > current) {
        smallest = current;
        smallestPair = new int[] {firstNum, secondNum};
      }
    }
    return smallestPair;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.Arrays;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[] expected = {28, 26};
    Utils.assertTrue(
        Arrays.equals(
            Program.smallestDifference(
                new int[] {-1, 5, 10, 20, 28, 3}, new int[] {26, 134, 135, 15, 17}),
            expected));
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
  chai.expect(program.smallestDifference([-1, 5, 10, 20, 28, 3], [26, 134, 135, 15, 17])).to.deep.equal([28, 26]);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlog(n) + mlog(m)) time | O(1) space
function smallestDifference(arrayOne, arrayTwo) {
  arrayOne.sort((a, b) => a - b);
  arrayTwo.sort((a, b) => a - b);
  let idxOne = 0;
  let idxTwo = 0;
  let smallest = Infinity;
  let current = Infinity;
  let smallestPair = [];
  while (idxOne < arrayOne.length && idxTwo < arrayTwo.length) {
    let firstNum = arrayOne[idxOne];
    let secondNum = arrayTwo[idxTwo];
    if (firstNum < secondNum) {
      current = secondNum - firstNum;
      idxOne++;
    } else if (secondNum < firstNum) {
      current = firstNum - secondNum;
      idxTwo++;
    } else {
      return [firstNum, secondNum];
    }
    if (smallest > current) {
      smallest = current;
      smallestPair = [firstNum, secondNum];
    }
  }
  return smallestPair;
}

exports.smallestDifference = smallestDifference;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.smallestDifference([-1, 5, 10, 20, 28, 3], [26, 134, 135, 15, 17])).to.deep.equal([28, 26]);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.smallestDifference as smallestDifference

class ProgramTest {
    @Test
    fun TestCase1() {
        val arrayOne = mutableListOf<Int>(-1, 5, 10, 20, 28, 3)
        val arrayTwo = mutableListOf<Int>(26, 134, 135, 15, 17)
        val output = smallestDifference(arrayOne, arrayTwo)
        val expected = listOf<Int>(28, 26)
        assert(output.equals(expected))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(nlog(n) + mlog(m)) time | O(1) space
fun smallestDifference(arrayOne: MutableList<Int>, arrayTwo: MutableList<Int>): List<Int> {
    arrayOne.sort()
    arrayTwo.sort()
    var idxOne = 0
    var idxTwo = 0
    var smallest = Int.MAX_VALUE
    var current: Int
    var smallestPair = listOf<Int>()
    while (idxOne < arrayOne.size && idxTwo < arrayTwo.size) {
        var firstNum = arrayOne[idxOne]
        var secondNum = arrayTwo[idxTwo]
        if (firstNum < secondNum) {
            current = secondNum - firstNum
            idxOne++
        } else if (secondNum < firstNum) {
            current = firstNum - secondNum
            idxTwo++
        } else {
            return listOf<Int>(firstNum, secondNum)
        }
        if (smallest > current) {
            smallest = current
            smallestPair = listOf<Int>(firstNum, secondNum)
        }
    }
    return smallestPair
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.smallestDifference as smallestDifference

class ProgramTest {
    @Test
    fun TestCase1() {
        val arrayOne = mutableListOf<Int>(-1, 5, 10, 20, 28, 3)
        val arrayTwo = mutableListOf<Int>(26, 134, 135, 15, 17)
        val output = smallestDifference(arrayOne, arrayTwo)
        val expected = listOf<Int>(28, 26)
        assert(output.equals(expected))
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
      var firstArray = [-1, 5, 10, 20, 28, 3]
      var secondArray = [26, 134, 135, 15, 17]
      let difference = program.smallestDifference(arrayOne: &firstArray, arrayTwo: &secondArray)
      try assertEqual([28, 26], difference)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  func smallestDifference(arrayOne: inout [Int], arrayTwo: inout [Int]) -> [Int] {
    arrayOne.sort()
    arrayTwo.sort()

    var idxOne = 0
    var idxTwo = 0

    var current = Int.max
    var smallest = Int.max

    var smallestPair: [Int] = []

    while idxOne < arrayOne.count, idxTwo < arrayTwo.count {
      let firstNum = arrayOne[idxOne]
      let secondNum = arrayTwo[idxTwo]

      if firstNum < secondNum {
        current = secondNum - firstNum
        idxOne = idxOne + 1
      } else if firstNum > secondNum {
        current = firstNum - secondNum
        idxTwo = idxTwo + 1
      } else {
        return [firstNum, secondNum]
      }

      if smallest > current {
        smallest = current
        smallestPair = [firstNum, secondNum]
      }
    }

    return smallestPair
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      var firstArray = [-1, 5, 10, 20, 28, 3]
      var secondArray = [26, 134, 135, 15, 17]
      let difference = program.smallestDifference(arrayOne: &firstArray, arrayTwo: &secondArray)
      try assertEqual([28, 26], difference)
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
        self.assertEqual(program.smallestDifference([-1, 5, 10, 20, 28, 3], [26, 134, 135, 15, 17]), [28, 26])

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nlog(n) + mlog(m)) time | O(1) space
def smallestDifference(arrayOne, arrayTwo):
    arrayOne.sort()
    arrayTwo.sort()
    idxOne = 0
    idxTwo = 0
    smallest = float("inf")
    current = float("inf")
    smallestPair = []
    while idxOne < len(arrayOne) and idxTwo < len(arrayTwo):
        firstNum = arrayOne[idxOne]
        secondNum = arrayTwo[idxTwo]
        if firstNum < secondNum:
            current = secondNum - firstNum
            idxOne += 1
        elif secondNum < firstNum:
            current = firstNum - secondNum
            idxTwo += 1
        else:
            return [firstNum, secondNum]
        if smallest > current:
            smallest = current
            smallestPair = [firstNum, secondNum]
    return smallestPair

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.smallestDifference([-1, 5, 10, 20, 28, 3], [26, 134, 135, 15, 17]), [28, 26])

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.smallestDifference([-1, 5, 10, 20, 28, 3], [26, 134, 135, 15, 17])).to.deep.equal([28, 26]);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlog(n) + mlog(m)) time | O(1) space
export function smallestDifference(arrayOne: number[], arrayTwo: number[]) {
  arrayOne.sort((a, b) => a - b);
  arrayTwo.sort((a, b) => a - b);
  let idxOne = 0;
  let idxTwo = 0;
  let smallest = Infinity;
  let current = Infinity;
  let smallestPair: number[] = [];
  while (idxOne < arrayOne.length && idxTwo < arrayTwo.length) {
    let firstNum = arrayOne[idxOne];
    let secondNum = arrayTwo[idxTwo];
    if (firstNum < secondNum) {
      current = secondNum - firstNum;
      idxOne++;
    } else if (secondNum < firstNum) {
      current = firstNum - secondNum;
      idxTwo++;
    } else {
      return [firstNum, secondNum];
    }
    if (smallest > current) {
      smallest = current;
      smallestPair = [firstNum, secondNum];
    }
  }
  return smallestPair;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.smallestDifference([-1, 5, 10, 20, 28, 3], [26, 134, 135, 15, 17])).to.deep.equal([28, 26]);
});

```

