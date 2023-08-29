# Longest Peak
<div class="html">
<p>
  Write a function that takes in an array of integers and returns the length of
  the longest peak in the array.
</p>
<p>
  A peak is defined as adjacent integers in the array that are <b>strictly</b>
  increasing until they reach a tip (the highest value in the peak), at which
  point they become <b>strictly</b> decreasing. At least three integers are required to
  form a peak.
</p>
<p>
  For example, the integers <span>1, 4, 10, 2</span> form a peak, but the
  integers <span>4, 0, 10</span> don't and neither do the integers
  <span>1, 2, 2, 0</span>. Similarly, the integers <span>1, 2, 3</span> don't
  form a peak because there aren't any strictly decreasing integers after the
  <span>3</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3]
</pre>
<h3>Sample Output</h3>
<pre>
6 <span class="CodeEditor-promptComment">// 0, 10, 6, 5, -1, -3</span>
</pre>
</div>

Hint 1
<p>
You can solve this question by iterating through the array from left to right once.
</p>


Hint 2

<p>
Iterate through the array from left to right, and treat every integer as the potential tip of a peak. To be the tip of a peak, an integer has to be strictly greater than its adjacent integers. What can you do when you find an actual tip?
</p>


Hint 3

<p>
As you iterate through the array from left to right, whenever you find a tip of a peak, expand outwards from the tip until you no longer have a peak. Given what peaks look like and how many peaks can therefore fit in an array, realize that this process results in a linear-time algorithm. Make sure to keep track of the longest peak you find as you iterate through the array.
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
      vector<int> input = {1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3};
      int expected = 6;
      int actual = longestPeak(input);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// O(n) time | O(1) space - where n is the length of the input array
int longestPeak(vector<int> array) {
  int longestPeakLength = 0;
  int i = 1;
  while (i < int(array.size() - 1)) {
    bool isPeak = array[i - 1] < array[i] && array[i] > array[i + 1];
    if (!isPeak) {
      i += 1;
      continue;
    }

    int leftIdx = i - 2;
    while (leftIdx >= 0 && array[leftIdx] < array[leftIdx + 1]) {
      leftIdx -= 1;
    }

    int rightIdx = i + 2;
    while (rightIdx < array.size() && array[rightIdx] < array[rightIdx - 1]) {
      rightIdx += 1;
    }
    int currentPeakLength = rightIdx - leftIdx - 1;
    longestPeakLength = max(longestPeakLength, currentPeakLength);
    i = rightIdx;
  }
  return longestPeakLength;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> input = {1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3};
      int expected = 6;
      int actual = longestPeak(input);
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

public class ProgramTest {
	[Test]
	public void TestCase1() {
		var input = new int[] {1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3};
		var expected = 6;
		var actual = Program.LongestPeak(input);
		Utils.AssertTrue(expected == actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(n) time | O(1) space - where n is the length of the input array
	public static int LongestPeak(int[] array) {
		int longestPeakLength = 0;
		int i = 1;
		while (i < array.Length - 1) {
			bool isPeak = array[i - 1] < array[i] && array[i] > array[i + 1];
			if (!isPeak) {
				i += 1;
				continue;
			}

			int leftIdx = i - 2;
			while (leftIdx >= 0 && array[leftIdx] < array[leftIdx + 1]) {
				leftIdx -= 1;
			}

			int rightIdx = i + 2;
			while (rightIdx < array.Length && array[rightIdx] < array[rightIdx - 1]) {
				rightIdx += 1;
			}
			int currentPeakLength = rightIdx - leftIdx - 1;
			if (currentPeakLength > longestPeakLength) {
				longestPeakLength = currentPeakLength;
			}
			i = rightIdx;
		}
		return longestPeakLength;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		var input = new int[] {1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3};
		var expected = 6;
		var actual = Program.LongestPeak(input);
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
	array := []int{1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3}
	actual := LongestPeak(array)
	require.Equal(t, 6, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space - where n is the length of the input array
func LongestPeak(array []int) int {
	longestPeakLength := 0
	i := 1
	for i < len(array)-1 {
		isPeak := array[i-1] < array[i] && array[i] > array[i+1]
		if !isPeak {
			i += 1
			continue
		}

		leftIdx := i - 2
		for leftIdx >= 0 && array[leftIdx] < array[leftIdx+1] {
			leftIdx -= 1
		}

		rightIdx := i + 2
		for rightIdx < len(array) && array[rightIdx] < array[rightIdx-1] {
			rightIdx += 1
		}
		currentPeakLength := rightIdx - leftIdx - 1
		if currentPeakLength > longestPeakLength {
			longestPeakLength = currentPeakLength
		}
		i = rightIdx
	}
	return longestPeakLength
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	array := []int{1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3}
	actual := LongestPeak(array)
	require.Equal(t, 6, actual)
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
    var input = new int[] {1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3};
    var expected = 6;
    var actual = Program.longestPeak(input);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the length of the input array
  public static int longestPeak(int[] array) {
    int longestPeakLength = 0;
    int i = 1;
    while (i < array.length - 1) {
      boolean isPeak = array[i - 1] < array[i] && array[i] > array[i + 1];
      if (!isPeak) {
        i += 1;
        continue;
      }

      int leftIdx = i - 2;
      while (leftIdx >= 0 && array[leftIdx] < array[leftIdx + 1]) {
        leftIdx -= 1;
      }

      int rightIdx = i + 2;
      while (rightIdx < array.length && array[rightIdx] < array[rightIdx - 1]) {
        rightIdx += 1;
      }
      int currentPeakLength = rightIdx - leftIdx - 1;
      if (currentPeakLength > longestPeakLength) {
        longestPeakLength = currentPeakLength;
      }
      i = rightIdx;
    }
    return longestPeakLength;
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    var input = new int[] {1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3};
    var expected = 6;
    var actual = Program.longestPeak(input);
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
  const array = [1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3];
  const expected = 6;
  chai.expect(program.longestPeak(array)).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the input array
function longestPeak(array) {
  let longestPeakLength = 0;
  let i = 1;
  while (i < array.length - 1) {
    const isPeak = array[i - 1] < array[i] && array[i + 1] < array[i];
    if (!isPeak) {
      i++;
      continue;
    }

    let leftIdx = i - 2;
    while (leftIdx >= 0 && array[leftIdx] < array[leftIdx + 1]) {
      leftIdx--;
    }
    let rightIdx = i + 2;
    while (rightIdx < array.length && array[rightIdx] < array[rightIdx - 1]) {
      rightIdx++;
    }

    const currentPeakLength = rightIdx - leftIdx - 1;
    longestPeakLength = Math.max(longestPeakLength, currentPeakLength);
    i = rightIdx;
  }
  return longestPeakLength;
}

exports.longestPeak = longestPeak;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const array = [1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3];
  const expected = 6;
  chai.expect(program.longestPeak(array)).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.longestPeak as longestPeak

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = listOf<Int>(1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3)
        val expected = 6
        val output = longestPeak(array)
        assert(output == expected)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(n) time | O(1) space - where n is the length of the input array
fun longestPeak(array: List<Int>): Int {
    var longestPeakLength: Int = 0
    var i = 1
    while (i < array.size - 1) {
        val isPeak = array[i - 1] < array[i] && array[i + 1] < array[i]
        if (!isPeak) {
            i++
            continue
        }

        var leftIdx = i - 2
        while (leftIdx >= 0 && array[leftIdx] < array[leftIdx + 1]) {
            leftIdx--
        }
        var rightIdx = i + 2
        while (rightIdx < array.size && array[rightIdx] < array[rightIdx - 1]) {
            rightIdx++
        }

        val currentPeakLength = rightIdx - leftIdx - 1
        longestPeakLength = max(longestPeakLength, currentPeakLength)
        i = rightIdx
    }
    return longestPeakLength
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.longestPeak as longestPeak

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = listOf<Int>(1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3)
        val expected = 6
        val output = longestPeak(array)
        assert(output == expected)
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
      let array = [1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3]
      let expected = 6
      let actual = program.longestPeak(array: array)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the length of the input array
  func longestPeak(array: [Int]) -> Int {
    var longestPeakLength = 0
    var i = 1
    while i < array.count - 1 {
      let isPeak = array[i - 1] < array[i] && array[i] > array[i + 1]
      if !isPeak {
        i += 1
        continue
      }

      var leftIdx = i - 2
      while leftIdx >= 0, array[leftIdx] < array[leftIdx + 1] {
        leftIdx -= 1
      }

      var rightIdx = i + 2
      while rightIdx < array.count, array[rightIdx] < array[rightIdx - 1] {
        rightIdx += 1
      }

      let currentPeakLength = rightIdx - leftIdx - 1
      if currentPeakLength > longestPeakLength {
        longestPeakLength = currentPeakLength
      }
      i = rightIdx
    }
    return longestPeakLength
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let array = [1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3]
      let expected = 6
      let actual = program.longestPeak(array: array)
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
        array = [1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3]
        expected = 6
        self.assertEqual(program.longestPeak(array), expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space - where n is the length of the input array
def longestPeak(array):
    longestPeakLength = 0
    i = 1
    while i < len(array) - 1:
        isPeak = array[i - 1] < array[i] and array[i] > array[i + 1]
        if not isPeak:
            i += 1
            continue

        leftIdx = i - 2
        while leftIdx >= 0 and array[leftIdx] < array[leftIdx + 1]:
            leftIdx -= 1
        rightIdx = i + 2
        while rightIdx < len(array) and array[rightIdx] < array[rightIdx - 1]:
            rightIdx += 1

        currentPeakLength = rightIdx - leftIdx - 1
        longestPeakLength = max(longestPeakLength, currentPeakLength)
        i = rightIdx
    return longestPeakLength

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        array = [1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3]
        expected = 6
        self.assertEqual(program.longestPeak(array), expected)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const array = [1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3];
  const expected = 6;
  chai.expect(program.longestPeak(array)).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the input array
export function longestPeak(array: number[]) {
  let longestPeakLength = 0;
  let i = 1;
  while (i < array.length - 1) {
    const isPeak = array[i - 1] < array[i] && array[i + 1] < array[i];
    if (!isPeak) {
      i++;
      continue;
    }

    let leftIdx = i - 2;
    while (leftIdx >= 0 && array[leftIdx] < array[leftIdx + 1]) {
      leftIdx--;
    }
    let rightIdx = i + 2;
    while (rightIdx < array.length && array[rightIdx] < array[rightIdx - 1]) {
      rightIdx++;
    }

    const currentPeakLength = rightIdx - leftIdx - 1;
    longestPeakLength = Math.max(longestPeakLength, currentPeakLength);
    i = rightIdx;
  }
  return longestPeakLength;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const array = [1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3];
  const expected = 6;
  chai.expect(program.longestPeak(array)).to.deep.equal(expected);
});

```

