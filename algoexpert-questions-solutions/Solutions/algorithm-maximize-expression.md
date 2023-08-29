# Maximize Expression
<div class="html">
<p>
  Write a function that takes in an array of integers and returns the largest
  possible value for the expression
  <span>array[a] - array[b] + array[c] - array[d]</span>, where <span>a</span>,
  <span>b</span>, <span>c</span>, and <span>d</span> are indices of the array
  and <span>a &lt; b &lt; c &lt; d</span>.
</p>
<p>
  If the input array has fewer than <span>4</span> elements, your function
  should return <span>0</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [3, 6, 1, -3, 2, 7]
</pre>
<h3>Sample Output</h3>
<pre>
4
<span class="CodeEditor-promptComment">// Choose a = 1, b = 3, c = 4, and d = 5</span>
<span class="CodeEditor-promptComment">// -> 6 - (-3) + 2 - 7 = 4</span>
</pre>
</div>

Hint 1
<p>
  The brute-force approach to solving this problem is to simply iterate through
  every valid choice of <span>a</span>, <span>b</span>, <span>c</span>, and
  <span>d</span> and to evaluate the expression at each iteration. While doing
  this, you can keep track of the maximum value that you find and return it
  after considering all possibilities. This solution runs in
  <span>O(n^4)</span> time; can you think of a way to solve this faster?
</p>


Hint 2

<p>
  You can solve this problem using dynamic programming with a time complexity of
  <span>O(n)</span>; however, you'll need to use external space.
</p>


Hint 3

<p>
  If you know what the maximum possible value of <span>a</span> is at each index
  in the array, you can find the maximum possible value of <span>a - b</span> at
  each individual index in the array in <span>O(1)</span> time (or in
  <span>O(n)</span> time for all indices). The same thing holds for finding the
  maximum possible value of <span>a - b + c</span> if you know the maximum
  possible value of <span>a - b</span> at each index. How does this fact help
  you solve the entire problem in <span>O(n)</span> time?
</p>


Hint 4

<p>
  Start by finding the maximum possible value of <span>a</span> at each index in
  the array, meaning the maximum value of <span>a</span> that you can obtain at
  each index <span>i</span> if <span>a</span> is chosen from an index between
  <span>0</span> and <span>i</span>, inclusive. Store all of these values in an
  array, and use them to help you determine the maximum possible value of
  <span>a - b</span> at each index. Do the same for
  <span>a - b + c</span> (using the results from <span>a - b</span>) and
  <span>a - b + c - d</span> (using the results from <span>a - b + c</span>).
  Once you make it to <span>a - b + c - d</span>, you'll be able to determine
  the maximum value of the expression.
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
      vector<int> input = {3, 6, 1, -3, 2, 7};
      auto expected = 4;
      auto actual = maximizeExpression(input);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <limits>
#include <algorithm>
using namespace std;

int evaluateExpression(int a, int b, int c, int d);

// O(n^4) time | O(1) space - where n is the length of the array
int maximizeExpression(vector<int> array) {
  if (array.size() < 4) {
    return 0;
  }

  int maximumValueFound = numeric_limits<int>::min();

  for (int a = 0; a < array.size(); a++) {
    int aValue = array[a];
    for (int b = a + 1; b < array.size(); b++) {
      int bValue = array[b];
      for (int c = b + 1; c < array.size(); c++) {
        int cValue = array[c];
        for (int d = c + 1; d < array.size(); d++) {
          int dValue = array[d];
          int expressionValue =
              evaluateExpression(aValue, bValue, cValue, dValue);
          maximumValueFound = max(expressionValue, maximumValueFound);
        }
      }
    }
  }

  return maximumValueFound;
}

int evaluateExpression(int a, int b, int c, int d) { return a - b + c - d; }

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <limits>
#include <algorithm>
using namespace std;

// O(n) time | O(n) space - where n is the length of the array
int maximizeExpression(vector<int> array) {
  if (array.size() < 4) {
    return 0;
  }

  vector<int> maxOfA = {array[0]};
  vector<int> maxOfAMinusB = {numeric_limits<int>::min()};
  vector<int> maxOfAMinusBPlusC(2, numeric_limits<int>::min());
  vector<int> maxOfAMinusBPlusCMinusD(3, numeric_limits<int>::min());

  for (int idx = 1; idx < array.size(); idx++) {
    int currentMax = max(maxOfA[idx - 1], array[idx]);
    maxOfA.push_back(currentMax);
  }

  for (int idx = 1; idx < array.size(); idx++) {
    int currentMax = max(maxOfAMinusB[idx - 1], maxOfA[idx - 1] - array[idx]);
    maxOfAMinusB.push_back(currentMax);
  }

  for (int idx = 2; idx < array.size(); idx++) {
    int currentMax =
        max(maxOfAMinusBPlusC[idx - 1], maxOfAMinusB[idx - 1] + array[idx]);
    maxOfAMinusBPlusC.push_back(currentMax);
  }

  for (int idx = 3; idx < array.size(); idx++) {
    int currentMax = max(maxOfAMinusBPlusCMinusD[idx - 1],
                         maxOfAMinusBPlusC[idx - 1] - array[idx]);
    maxOfAMinusBPlusCMinusD.push_back(currentMax);
  }

  return maxOfAMinusBPlusCMinusD[maxOfAMinusBPlusCMinusD.size() - 1];
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> input = {3, 6, 1, -3, 2, 7};
      auto expected = 4;
      auto actual = maximizeExpression(input);
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
		int[] input = new int[] { 3, 6, 1, -3, 2, 7 };
		int expected = 4;
		var actual = new Program().MaximizeExpression(input);
		Utils.AssertTrue(expected == actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	// O(n^4) time | O(1) space - where n is the length of the array
	public int MaximizeExpression(int[] array) {
		if (array.Length < 4) {
			return 0;
		}

		int maximumValueFound = Int32.MinValue;

		for (int a = 0; a < array.Length; a++) {
			int aValue = array[a];
			for (int b = a + 1; b < array.Length; b++) {
				int bValue = array[b];
				for (int c = b + 1; c < array.Length; c++) {
					int cValue = array[c];
					for (int d = c + 1; d < array.Length; d++) {
						int dValue = array[d];
						int expressionValue = evaluateExpression(aValue,
						    bValue,
						    cValue,
						    dValue);
						maximumValueFound = Math.Max(expressionValue,
						    maximumValueFound);
					}
				}
			}
		}

		return maximumValueFound;
	}

	public int evaluateExpression(int a, int b, int c, int d) {
		return a - b + c - d;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {

	// O(n) time | O(n) space - where n is the length of the array
	public int MaximizeExpression(int[] array) {
		if (array.Length < 4) {
			return 0;
		}

		List<int> maxOfA = new List<int> {
			array[0]
		};
		List<int> maxOfAMinusB = new List<int> {
			Int32.MinValue
		};
		List<int> maxOfAMinusBPlusC = new List<int> {
			Int32.MinValue, Int32.MinValue
		};
		List<int> maxOfAMinusBPlusCMinusD = new List<int> {
			Int32.MinValue, Int32.MinValue, Int32.MinValue
		};

		for (int idx = 1; idx < array.Length; idx++) {
			int currentMax = Math.Max(maxOfA[idx - 1], array[idx]);
			maxOfA.Add(currentMax);
		}

		for (int idx = 1; idx < array.Length; idx++) {
			int currentMax = Math.Max(maxOfAMinusB[idx - 1],
			    maxOfA[idx - 1] - array[idx]);
			maxOfAMinusB.Add(currentMax);
		}

		for (int idx = 2; idx < array.Length; idx++) {
			int currentMax = Math.Max(maxOfAMinusBPlusC[idx - 1],
			    maxOfAMinusB[idx - 1] + array[idx]);
			maxOfAMinusBPlusC.Add(currentMax);
		}

		for (int idx = 3; idx < array.Length; idx++) {
			int currentMax = Math.Max(maxOfAMinusBPlusCMinusD[idx - 1],
			    maxOfAMinusBPlusC[idx - 1] - array[idx]);
			maxOfAMinusBPlusCMinusD.Add(currentMax);
		}

		return maxOfAMinusBPlusCMinusD[maxOfAMinusBPlusCMinusD.Count - 1];
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] input = new int[] { 3, 6, 1, -3, 2, 7 };
		int expected = 4;
		var actual = new Program().MaximizeExpression(input);
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
	input := []int{3, 6, 1, -3, 2, 7}
	expected := 4
	actual := MaximizeExpression(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"math"
)

// O(n^4) time | O(1) space - where n is the length of the array
func MaximizeExpression(array []int) int {
	if len(array) < 4 {
		return 0
	}

	var maximumValueFound = math.MinInt32

	for a := range array {
		aValue := array[a]
		for b := a + 1; b < len(array); b++ {
			bValue := array[b]
			for c := b + 1; c < len(array); c++ {
				cValue := array[c]
				for d := c + 1; d < len(array); d++ {
					dValue := array[d]
					expressionValue := evaluateExpression(aValue, bValue, cValue, dValue)
					maximumValueFound = max(expressionValue, maximumValueFound)
				}
			}
		}
	}

	return maximumValueFound
}

func evaluateExpression(a, b, c, d int) int {
	return a - b + c - d
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"math"
)

// O(n) time | O(n) space - where n is the length of the array
func MaximizeExpression(array []int) int {
	if len(array) < 4 {
		return 0
	}

	maxOfA := []int{array[0]}
	maxOfAMinusB := []int{math.MinInt32}
	maxOfAMinusBPlusC := []int{math.MinInt32, math.MinInt32}
	maxOfAMinusBPlusCMinusD := []int{math.MinInt32, math.MinInt32, math.MinInt32}

	for idx := 1; idx < len(array); idx++ {
		currentMax := max(maxOfA[idx-1], array[idx])
		maxOfA = append(maxOfA, currentMax)
	}

	for idx := 1; idx < len(array); idx++ {
		currentMax := max(maxOfAMinusB[idx-1], maxOfA[idx-1]-array[idx])
		maxOfAMinusB = append(maxOfAMinusB, currentMax)
	}

	for idx := 2; idx < len(array); idx++ {
		currentMax := max(
			maxOfAMinusBPlusC[idx-1], maxOfAMinusB[idx-1]+array[idx])
		maxOfAMinusBPlusC = append(maxOfAMinusBPlusC, currentMax)
	}

	for idx := 3; idx < len(array); idx++ {
		currentMax := max(
			maxOfAMinusBPlusCMinusD[idx-1], maxOfAMinusBPlusC[idx-1]-array[idx])
		maxOfAMinusBPlusCMinusD = append(maxOfAMinusBPlusCMinusD, currentMax)
	}

	return maxOfAMinusBPlusCMinusD[len(maxOfAMinusBPlusCMinusD)-1]
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []int{3, 6, 1, -3, 2, 7}
	expected := 4
	actual := MaximizeExpression(input)
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
    int[] input = new int[] {3, 6, 1, -3, 2, 7};
    int expected = 4;
    var actual = new Program().maximizeExpression(input);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n^4) time | O(1) space - where n is the length of the array
  public int maximizeExpression(int[] array) {
    if (array.length < 4) {
      return 0;
    }

    int maximumValueFound = Integer.MIN_VALUE;

    for (int a = 0; a < array.length; a++) {
      int aValue = array[a];
      for (int b = a + 1; b < array.length; b++) {
        int bValue = array[b];
        for (int c = b + 1; c < array.length; c++) {
          int cValue = array[c];
          for (int d = c + 1; d < array.length; d++) {
            int dValue = array[d];
            int expressionValue = evaluateExpression(aValue, bValue, cValue, dValue);
            maximumValueFound = Math.max(expressionValue, maximumValueFound);
          }
        }
      }
    }

    return maximumValueFound;
  }

  public int evaluateExpression(int a, int b, int c, int d) {
    return a - b + c - d;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n) time | O(n) space - where n is the length of the array
  public int maximizeExpression(int[] array) {
    if (array.length < 4) {
      return 0;
    }

    ArrayList<Integer> maxOfA = new ArrayList<Integer>(Arrays.asList(array[0]));
    ArrayList<Integer> maxOfAMinusB = new ArrayList<Integer>(Arrays.asList(Integer.MIN_VALUE));
    ArrayList<Integer> maxOfAMinusBPlusC =
        new ArrayList<Integer>(Arrays.asList(Integer.MIN_VALUE, Integer.MIN_VALUE));
    ArrayList<Integer> maxOfAMinusBPlusCMinusD =
        new ArrayList<Integer>(
            Arrays.asList(Integer.MIN_VALUE, Integer.MIN_VALUE, Integer.MIN_VALUE));

    for (int idx = 1; idx < array.length; idx++) {
      int currentMax = Math.max(maxOfA.get(idx - 1), array[idx]);
      maxOfA.add(currentMax);
    }

    for (int idx = 1; idx < array.length; idx++) {
      int currentMax = Math.max(maxOfAMinusB.get(idx - 1), maxOfA.get(idx - 1) - array[idx]);
      maxOfAMinusB.add(currentMax);
    }

    for (int idx = 2; idx < array.length; idx++) {
      int currentMax =
          Math.max(maxOfAMinusBPlusC.get(idx - 1), maxOfAMinusB.get(idx - 1) + array[idx]);
      maxOfAMinusBPlusC.add(currentMax);
    }

    for (int idx = 3; idx < array.length; idx++) {
      int currentMax =
          Math.max(
              maxOfAMinusBPlusCMinusD.get(idx - 1), maxOfAMinusBPlusC.get(idx - 1) - array[idx]);
      maxOfAMinusBPlusCMinusD.add(currentMax);
    }

    return maxOfAMinusBPlusCMinusD.get(maxOfAMinusBPlusCMinusD.size() - 1);
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[] input = new int[] {3, 6, 1, -3, 2, 7};
    int expected = 4;
    var actual = new Program().maximizeExpression(input);
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
  const input = [3, 6, 1, -3, 2, 7];
  const expected = 4;
  const actual = program.maximizeExpression(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^4) time | O(1) space - where n is the length of the array
function maximizeExpression(array) {
  if (array.length < 4) return 0;

  let maximumValueFound = -Infinity;

  for (let a = 0; a < array.length; a++) {
    const aValue = array[a];
    for (let b = a + 1; b < array.length; b++) {
      const bValue = array[b];
      for (let c = b + 1; c < array.length; c++) {
        const cValue = array[c];
        for (let d = c + 1; d < array.length; d++) {
          const dValue = array[d];
          const expressionValue = evaluateExpression(aValue, bValue, cValue, dValue);
          maximumValueFound = Math.max(expressionValue, maximumValueFound);
        }
      }
    }
  }

  return maximumValueFound;
}

function evaluateExpression(a, b, c, d) {
  return a - b + c - d;
}

// Do not edit the line below.
exports.maximizeExpression = maximizeExpression;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the array
function maximizeExpression(array) {
  if (array.length < 4) return 0;

  const maxOfA = new Array(1).fill(array[0]);
  const maxOfAMinusB = new Array(1).fill(-Infinity);
  const maxOfAMinusBPlusC = new Array(2).fill(-Infinity);
  const maxOfAMinusBPlusCMinusD = new Array(3).fill(-Infinity);

  for (let idx = 1; idx < array.length; idx++) {
    const currentMax = Math.max(maxOfA[idx - 1], array[idx]);
    maxOfA.push(currentMax);
  }

  for (let idx = 1; idx < array.length; idx++) {
    const currentMax = Math.max(maxOfAMinusB[idx - 1], maxOfA[idx - 1] - array[idx]);
    maxOfAMinusB.push(currentMax);
  }

  for (let idx = 2; idx < array.length; idx++) {
    const currentMax = Math.max(maxOfAMinusBPlusC[idx - 1], maxOfAMinusB[idx - 1] + array[idx]);
    maxOfAMinusBPlusC.push(currentMax);
  }

  for (let idx = 3; idx < array.length; idx++) {
    const currentMax = Math.max(maxOfAMinusBPlusCMinusD[idx - 1], maxOfAMinusBPlusC[idx - 1] - array[idx]);
    maxOfAMinusBPlusCMinusD.push(currentMax);
  }

  return maxOfAMinusBPlusCMinusD[maxOfAMinusBPlusCMinusD.length - 1];
}

// Do not edit the line below.
exports.maximizeExpression = maximizeExpression;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [3, 6, 1, -3, 2, 7];
  const expected = 4;
  const actual = program.maximizeExpression(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.maximizeExpression

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(3, 6, 1, -3, 2, 7)
        val expected = 4
        val output = maximizeExpression(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(n^4) time | O(1) space - where n is the length of the array
fun maximizeExpression(array: List<Int>): Int {
    if (array.size < 4) return 0

    var maximumValueFound = Int.MIN_VALUE

    for (a in 0 until array.size) {
        val aValue = array[a]
        for (b in a + 1 until array.size) {
            val bValue = array[b]
            for (c in b + 1 until array.size) {
                val cValue = array[c]
                for (d in c + 1 until array.size) {
                    val dValue = array[d]
                    val expressionValue = evaluateExpression(aValue, bValue, cValue, dValue)
                    maximumValueFound = max(expressionValue, maximumValueFound)
                }
            }
        }
    }

    return maximumValueFound
}

fun evaluateExpression(a: Int, b: Int, c: Int, d: Int): Int {
    return a - b + c - d
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(n) time | O(n) space - where n is the length of the array
fun maximizeExpression(array: List<Int>): Int {
    if (array.size < 4) return 0

    val maxOfA = MutableList(1) { array[0] }
    val maxOfAMinusB = MutableList(1) { Int.MIN_VALUE }
    val maxOfAMinusBPlusC = MutableList(2) { Int.MIN_VALUE }
    val maxOfAMinusBPlusCMinusD = MutableList(3) { Int.MIN_VALUE }

    for (idx in 1 until array.size) {
        val currentMax = max(maxOfA[idx - 1], array[idx])
        maxOfA.add(currentMax)
    }

    for (idx in 1 until array.size) {
        val currentMax = max(maxOfAMinusB[idx - 1], maxOfA[idx - 1] - array[idx])
        maxOfAMinusB.add(currentMax)
    }

    for (idx in 2 until array.size) {
        val currentMax = max(
            maxOfAMinusBPlusC[idx - 1], maxOfAMinusB[idx - 1] + array[idx]
        )
        maxOfAMinusBPlusC.add(currentMax)
    }

    for (idx in 3 until array.size) {
        val currentMax = max(
            maxOfAMinusBPlusCMinusD[idx - 1], maxOfAMinusBPlusC[idx - 1] - array[idx]
        )
        maxOfAMinusBPlusCMinusD.add(currentMax)
    }

    return maxOfAMinusBPlusCMinusD[maxOfAMinusBPlusCMinusD.size - 1]
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.maximizeExpression

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(3, 6, 1, -3, 2, 7)
        val expected = 4
        val output = maximizeExpression(input)
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
      var input = [3, 6, 1, -3, 2, 7]
      var expected = 4
      var actual = Program().maximizeExpression(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^4) time | O(1) space - where n is the length of the array
  func maximizeExpression(_ array: [Int]) -> Int {
    if array.count < 4 {
      return 0
    }

    var maximumValueFound = Int.min

    for a in stride(from: 0, to: array.count, by: 1) {
      let aValue = array[a]
      for b in stride(from: a + 1, to: array.count, by: 1) {
        let bValue = array[b]
        for c in stride(from: b + 1, to: array.count, by: 1) {
          let cValue = array[c]
          for d in stride(from: c + 1, to: array.count, by: 1) {
            let dValue = array[d]
            let expressionValue = evaluateExpression(aValue, bValue, cValue, dValue)
            maximumValueFound = max(expressionValue, maximumValueFound)
          }
        }
      }
    }

    return maximumValueFound
  }

  func evaluateExpression(_ a: Int, _ b: Int, _ c: Int, _ d: Int) -> Int {
    return a - b + c - d
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the length of the array
  func maximizeExpression(_ array: [Int]) -> Int {
    if array.count < 4 {
      return 0
    }

    var maxOfA = [array[0]]
    var maxOfAMinusB = Array(repeating: Int.min, count: 1)
    var maxOfAMinusBPlusC = Array(repeating: Int.min, count: 2)
    var maxOfAMinusBPlusCMinusD = Array(repeating: Int.min, count: 3)

    for idx in stride(from: 1, to: array.count, by: 1) {
      let currentMax = max(maxOfA[idx - 1], array[idx])
      maxOfA.append(currentMax)
    }

    for idx in stride(from: 1, to: array.count, by: 1) {
      let currentMax = max(maxOfAMinusB[idx - 1], maxOfA[idx - 1] - array[idx])
      maxOfAMinusB.append(currentMax)
    }

    for idx in stride(from: 2, to: array.count, by: 1) {
      let currentMax = max(
        maxOfAMinusBPlusC[idx - 1], maxOfAMinusB[idx - 1] + array[idx]
      )
      maxOfAMinusBPlusC.append(currentMax)
    }

    for idx in stride(from: 3, to: array.count, by: 1) {
      let currentMax = max(
        maxOfAMinusBPlusCMinusD[idx - 1], maxOfAMinusBPlusC[idx - 1] - array[idx]
      )
      maxOfAMinusBPlusCMinusD.append(currentMax)
    }

    return maxOfAMinusBPlusCMinusD[maxOfAMinusBPlusCMinusD.count - 1]
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = [3, 6, 1, -3, 2, 7]
      var expected = 4
      var actual = Program().maximizeExpression(input)
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
        input = [3, 6, 1, -3, 2, 7]
        expected = 4
        actual = program.maximizeExpression(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^4) time | O(1) space - where n is the length of the array
def maximizeExpression(array):
    if len(array) < 4:
        return 0

    maximumValueFound = float("-inf")

    for a in range(len(array)):
        aValue = array[a]
        for b in range(a + 1, len(array)):
            bValue = array[b]
            for c in range(b + 1, len(array)):
                cValue = array[c]
                for d in range(c + 1, len(array)):
                    dValue = array[d]
                    expressionValue = evaluateExpression(aValue, bValue, cValue, dValue)
                    maximumValueFound = max(expressionValue, maximumValueFound)

    return maximumValueFound


def evaluateExpression(a, b, c, d):
    return a - b + c - d

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the length of the array
def maximizeExpression(array):
    if len(array) < 4:
        return 0

    maxOfA = [array[0]]
    maxOfAMinusB = [float("-inf")]
    maxOfAMinusBPlusC = [float("-inf")] * 2
    maxOfAMinusBPlusCMinusD = [float("-inf")] * 3

    for idx in range(1, len(array)):
        currentMax = max(maxOfA[idx - 1], array[idx])
        maxOfA.append(currentMax)

    for idx in range(1, len(array)):
        currentMax = max(maxOfAMinusB[idx - 1], maxOfA[idx - 1] - array[idx])
        maxOfAMinusB.append(currentMax)

    for idx in range(2, len(array)):
        currentMax = max(maxOfAMinusBPlusC[idx - 1], maxOfAMinusB[idx - 1] + array[idx])
        maxOfAMinusBPlusC.append(currentMax)

    for idx in range(3, len(array)):
        currentMax = max(maxOfAMinusBPlusCMinusD[idx - 1], maxOfAMinusBPlusC[idx - 1] - array[idx])
        maxOfAMinusBPlusCMinusD.append(currentMax)

    return maxOfAMinusBPlusCMinusD[len(maxOfAMinusBPlusCMinusD) - 1]

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [3, 6, 1, -3, 2, 7]
        expected = 4
        actual = program.maximizeExpression(input)
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
  const input = [3, 6, 1, -3, 2, 7];
  const expected = 4;
  const actual = program.maximizeExpression(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^4) time | O(1) space - where n is the length of the array
export function maximizeExpression(array: number[]) {
  if (array.length < 4) return 0;

  let maximumValueFound = -Infinity;

  for (let a = 0; a < array.length; a++) {
    const aValue = array[a];
    for (let b = a + 1; b < array.length; b++) {
      const bValue = array[b];
      for (let c = b + 1; c < array.length; c++) {
        const cValue = array[c];
        for (let d = c + 1; d < array.length; d++) {
          const dValue = array[d];
          const expressionValue = evaluateExpression(aValue, bValue, cValue, dValue);
          maximumValueFound = Math.max(expressionValue, maximumValueFound);
        }
      }
    }
  }

  return maximumValueFound;
}

function evaluateExpression(a: number, b: number, c: number, d: number) {
  return a - b + c - d;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the array
export function maximizeExpression(array: number[]) {
  if (array.length < 4) return 0;

  const maxOfA = new Array(1).fill(array[0]);
  const maxOfAMinusB = new Array(1).fill(-Infinity);
  const maxOfAMinusBPlusC = new Array(2).fill(-Infinity);
  const maxOfAMinusBPlusCMinusD = new Array(3).fill(-Infinity);

  for (let idx = 1; idx < array.length; idx++) {
    const currentMax = Math.max(maxOfA[idx - 1], array[idx]);
    maxOfA.push(currentMax);
  }

  for (let idx = 1; idx < array.length; idx++) {
    const currentMax = Math.max(maxOfAMinusB[idx - 1], maxOfA[idx - 1] - array[idx]);
    maxOfAMinusB.push(currentMax);
  }

  for (let idx = 2; idx < array.length; idx++) {
    const currentMax = Math.max(maxOfAMinusBPlusC[idx - 1], maxOfAMinusB[idx - 1] + array[idx]);
    maxOfAMinusBPlusC.push(currentMax);
  }

  for (let idx = 3; idx < array.length; idx++) {
    const currentMax = Math.max(maxOfAMinusBPlusCMinusD[idx - 1], maxOfAMinusBPlusC[idx - 1] - array[idx]);
    maxOfAMinusBPlusCMinusD.push(currentMax);
  }

  return maxOfAMinusBPlusCMinusD[maxOfAMinusBPlusCMinusD.length - 1];
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [3, 6, 1, -3, 2, 7];
  const expected = 4;
  const actual = program.maximizeExpression(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

