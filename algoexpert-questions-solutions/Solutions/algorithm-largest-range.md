# Largest Range
<div class="html">
<p>
  Write a function that takes in an array of integers and returns an array of
  length 2 representing the largest range of integers contained in that array.
</p>
<p>
  The first number in the output array should be the first number in the range,
  while the second number should be the last number in the range.
</p>
<p>
  A range of numbers is defined as a set of numbers that come right after each
  other in the set of real integers. For instance, the output array
  <span>[2, 6]</span> represents the range <span>{2, 3, 4, 5, 6}</span>, which
  is a range of length 5. Note that numbers don't need to be sorted or adjacent
  in the input array in order to form a range.
</p>
<p>You can assume that there will only be one largest range.</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6]
</pre>
<h3>Sample Output</h3>
<pre>
[0, 7]
</pre>
</div>

Hint 1
<p>
How can you use a hash table to solve this problem with an algorithm that runs in linear time?
</p>


Hint 2

<p>
Iterate through the input array once, storing every unique number in a hash table and mapping every number to a falsy value. This hash table will not only provide for fast access of the numbers in the input array, but it will also allow you to keep track of "visited" and "unvisited" numbers, so as not to unnecessarily repeat work.
</p>


Hint 3

<p>
Iterate through the input array once more, this time stopping at every number to check if the number is marked as "visited" in the hash table. If it is, skip it; if it isn't, start expanding outwards from that number with a left number and a right number, continuously checking if those left and right numbers are in the hash table (and thus in the input array), and marking them as "visited" in the hash table if they are. This should allow you to quickly find the largest range in which the current number is contained, all the while setting you up not to perform unnecessary work later.
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
      vector<int> expected{0, 7};
      assert(largestRange({1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6}) ==
             expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <unordered_map>
using namespace std;

// O(n) time | O(n) space
vector<int> largestRange(vector<int> array) {
  vector<int> bestRange = {};
  int longestLength = 0;
  unordered_map<int, bool> nums = {};
  for (int num : array) {
    nums[num] = true;
  }
  for (int num : array) {
    if (!nums[num]) {
      continue;
    }
    nums[num] = false;
    int currentLength = 1;
    int left = num - 1;
    int right = num + 1;
    while (nums.find(left) != nums.end()) {
      nums[left] = false;
      currentLength++;
      left--;
    }
    while (nums.find(right) != nums.end()) {
      nums[right] = false;
      currentLength++;
      right++;
    }
    if (currentLength > longestLength) {
      longestLength = currentLength;
      bestRange = {left + 1, right - 1};
    }
  }
  return bestRange;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> expected{0, 7};
      assert(largestRange({1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6}) ==
             expected);
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
	public void TestCase6() {
		int[] expected = {0, 7};
		Utils.AssertTrue(Enumerable.SequenceEqual(Program.LargestRange(new int[] {1, 11, 3,
		                                                                          0, 15, 5,
		                                                                          2, 4, 10,
		                                                                          7, 12,
		                                                                          6}),
		  expected));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n) time | O(n) space
	public static int[] LargestRange(int[] array) {
		int[] bestRange = new int[2];
		int longestLength = 0;
		HashSet<int> nums = new HashSet<int>();
		foreach (int num in array) {
			nums.Add(num);
		}
		foreach (int num in array) {
			if (!nums.Contains(num)) {
				continue;
			}
			nums.Remove(num);
			int currentLength = 1;
			int left = num - 1;
			int right = num + 1;
			while (nums.Contains(left)) {
				nums.Remove(left);
				currentLength++;
				left--;
			}
			while (nums.Contains(right)) {
				nums.Remove(right);
				currentLength++;
				right++;
			}
			if (currentLength > longestLength) {
				longestLength = currentLength;
				bestRange = new int[] {left + 1, right - 1};
			}
		}
		return bestRange;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Linq;

public class ProgramTest {
	[Test]
	public void TestCase6() {
		int[] expected = {0, 7};
		Utils.AssertTrue(Enumerable.SequenceEqual(Program.LargestRange(new int[] {1, 11, 3,
		                                                                          0, 15, 5,
		                                                                          2, 4, 10,
		                                                                          7, 12,
		                                                                          6}),
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
	expected := []int{0, 7}
	output := LargestRange([]int{1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6})
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space
func LargestRange(array []int) []int {
	best := []int{}
	longestLength := 0
	nums := map[int]bool{}
	for _, num := range array {
		nums[num] = true
	}
	for _, num := range array {
		if !nums[num] {
			continue
		}
		nums[num] = false
		currentLength, left, right := 1, num-1, num+1
		for nums[left] {
			nums[left] = false
			currentLength += 1
			left -= 1
		}
		for nums[right] {
			nums[right] = false
			currentLength += 1
			right += 1
		}
		if currentLength > longestLength {
			longestLength = currentLength
			best = []int{left + 1, right - 1}
		}
	}
	return best
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := []int{0, 7}
	output := LargestRange([]int{1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6})
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
    int[] expected = {0, 7};
    Utils.assertTrue(
        Arrays.equals(
            Program.largestRange(new int[] {1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6}), expected));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(n) space
  public static int[] largestRange(int[] array) {
    int[] bestRange = new int[2];
    int longestLength = 0;
    Map<Integer, Boolean> nums = new HashMap<Integer, Boolean>();
    for (int num : array) {
      nums.put(num, true);
    }
    for (int num : array) {
      if (!nums.get(num)) {
        continue;
      }
      nums.put(num, false);
      int currentLength = 1;
      int left = num - 1;
      int right = num + 1;
      while (nums.containsKey(left)) {
        nums.put(left, false);
        currentLength++;
        left--;
      }
      while (nums.containsKey(right)) {
        nums.put(right, false);
        currentLength++;
        right++;
      }
      if (currentLength > longestLength) {
        longestLength = currentLength;
        bestRange = new int[] {left + 1, right - 1};
      }
    }
    return bestRange;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.Arrays;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[] expected = {0, 7};
    Utils.assertTrue(
        Arrays.equals(
            Program.largestRange(new int[] {1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6}), expected));
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
  chai.expect(program.largestRange([1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6])).to.deep.equal([0, 7]);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space
function largestRange(array) {
  let bestRange = [];
  let longestLength = 0;
  const nums = {};
  for (const num of array) {
    nums[num] = true;
  }
  for (const num of array) {
    if (!nums[num]) continue;
    nums[num] = false;
    let currentLength = 1;
    let left = num - 1;
    let right = num + 1;
    while (left in nums) {
      nums[left] = false;
      currentLength++;
      left--;
    }
    while (right in nums) {
      nums[right] = false;
      currentLength++;
      right++;
    }
    if (currentLength > longestLength) {
      longestLength = currentLength;
      bestRange = [left + 1, right - 1];
    }
  }
  return bestRange;
}

exports.largestRange = largestRange;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.largestRange([1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6])).to.deep.equal([0, 7]);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.largestRange as largestRange

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = listOf(1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6)
        val output = largestRange(array)
        val expected = Pair(0, 7)
        assert(output == expected)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(n) space
fun largestRange(array: List<Int>): Pair<Int, Int> {
    var bestRange = Pair(array[0], array[0])
    var longestLength = 0
    val nums = mutableMapOf<Int, Boolean>()
    for (num in array) {
        nums[num] = true
    }
    for (num in array) {
        if (nums[num] == false) continue
        nums[num] = false
        var currentLength = 1
        var left = num - 1
        var right = num + 1
        while (nums.containsKey(left)) {
            nums[left] = false
            currentLength++
            left--
        }
        while (nums.containsKey(right)) {
            nums[right] = false
            currentLength++
            right++
        }
        if (currentLength > longestLength) {
            longestLength = currentLength
            bestRange = Pair(left + 1, right - 1)
        }
    }
    return bestRange
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.largestRange as largestRange

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = listOf(1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6)
        val output = largestRange(array)
        val expected = Pair(0, 7)
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
      try assertEqual([0, 7], program.largestRange(array: [1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6]))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space
  func largestRange(array: [Int]) -> [Int] {
    var longestLength = 0
    var bestRange = [Int]()
    var hash = [Int: Bool]()

    for number in array {
      hash[number] = true
    }

    for number in array {
      if let hashAtNumber = hash[number], !hashAtNumber {
        continue
      }

      var currentLength = 1
      var left = number - 1
      var right = number + 1

      while hash.keys.contains(left) {
        hash[left] = false
        currentLength += 1
        left -= 1
      }

      while hash.keys.contains(right) {
        hash[right] = false
        currentLength += 1
        right += 1
      }

      if currentLength > longestLength {
        bestRange = [left + 1, right - 1]
        longestLength = currentLength
      }
    }

    return bestRange
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      try assertEqual([0, 7], program.largestRange(array: [1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6]))
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
        self.assertEqual(program.largestRange([1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6]), [0, 7])

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space
def largestRange(array):
    bestRange = []
    longestLength = 0
    nums = {}
    for num in array:
        nums[num] = True
    for num in array:
        if not nums[num]:
            continue
        nums[num] = False
        currentLength = 1
        left = num - 1
        right = num + 1
        while left in nums:
            nums[left] = False
            currentLength += 1
            left -= 1
        while right in nums:
            nums[right] = False
            currentLength += 1
            right += 1
        if currentLength > longestLength:
            longestLength = currentLength
            bestRange = [left + 1, right - 1]
    return bestRange

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.largestRange([1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6]), [0, 7])

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.largestRange([1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6])).to.deep.equal([0, 7]);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space
export function largestRange(array: number[]) {
  let bestRange: [number, number] = [-1, -1];
  let longestLength = 0;
  const nums: {[key: number]: boolean} = {};
  for (const num of array) {
    nums[num] = true;
  }
  for (const num of array) {
    if (!nums[num]) continue;
    nums[num] = false;
    let currentLength = 1;
    let left = num - 1;
    let right = num + 1;
    while (left in nums) {
      nums[left] = false;
      currentLength++;
      left--;
    }
    while (right in nums) {
      nums[right] = false;
      currentLength++;
      right++;
    }
    if (currentLength > longestLength) {
      longestLength = currentLength;
      bestRange = [left + 1, right - 1];
    }
  }
  return bestRange;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.largestRange([1, 11, 3, 0, 15, 5, 2, 4, 10, 7, 12, 6])).to.deep.equal([0, 7]);
});

```

