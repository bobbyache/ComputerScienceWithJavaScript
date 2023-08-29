# Zero Sum Subarray
<div class="html">
  <p>
    You're given a list of integers <span>nums</span>. Write a function that
    returns a boolean representing whether there exists a zero-sum subarray of
    <span>nums</span>.
  </p>

  <p>
    A zero-sum subarray is any subarray where all of the values add up to zero.
    A subarray is any contiguous section of the array. For the purposes of this
    problem, a subarray can be as small as one element and as long as the
    original array.
  </p>
<h3>Sample Input</h3>
<pre><span class="CodeEditor-promptParameter">nums</span> = [-5, -5, 2, 3, -2]</pre>
<h3>Sample Output</h3>
<pre>
True <span class="CodeEditor-promptComment">// The subarray [-5, 2, 3] has a sum of 0
</span>
</pre>

Hint 1
<p>
  A good way to approach this problem is to first think of a simpler version.
  How would you check if the entire array sum is zero?
</p>


Hint 2

<p>
  If the entire array does not sum to zero, then you need to check if there are
  any smaller subarrays that sum to zero. For this, it can be helpful to keep
  track of all of the sums from [0, i], where i is every index in the array.
</p>


Hint 3

<p>
  After recording all sums from [0, i], what would it mean if a sum is repeated?
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
      auto input = {4, 2, -1, -1, 3};
      auto expected = true;
      auto actual = zeroSumSubarray(input);
      assert(expected == actual);
    });
  }
};


```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <unordered_set>
using namespace std;

// O(n) time | O(n) space - where n is the length of nums
bool zeroSumSubarray(vector<int> nums) {
  unordered_set<int> sums = {0};
  int currentSum = 0;

  for (int num : nums) {
    currentSum += num;
    if (sums.find(currentSum) != sums.end()) {
      return true;
    }
    sums.insert(currentSum);
  } 

  return false;
}


```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      auto input = {4, 2, -1, -1, 3};
      auto expected = true;
      auto actual = zeroSumSubarray(input);
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
		var input = new int[] {4, 2, -1, -1, 3};
		var expected = true;
		var actual = new Program().ZeroSumSubarray(input);
		Utils.AssertTrue(expected == actual);
	}
}


```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {
	// O(n) time | O(n) space - where n is the length of nums
	public bool ZeroSumSubarray(int[] nums) {
		HashSet<int> sums = new HashSet<int>();
		sums.Add(0);
		int currentSum = 0;
		foreach (var num in nums) {
			currentSum += num;
			if (sums.Contains(currentSum)) {
				return true;
			}
			sums.Add(currentSum);
		}
		return false;
	}
}
```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		var input = new int[] {4, 2, -1, -1, 3};
		var expected = true;
		var actual = new Program().ZeroSumSubarray(input);
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
	input := []int{4, 2, -1, -1, 3}
	expected := true
	actual := ZeroSumSubarray(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space - where n is the length of nums
func ZeroSumSubarray(nums []int) bool {
	sums := map[int]bool{0: true}
	currentSum := 0
	for _, num := range nums {
		currentSum += num
		if _, sumIsInSet := sums[currentSum]; sumIsInSet {
			return true
		}
		sums[currentSum] = true
	}
	return false
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []int{4, 2, -1, -1, 3}
	expected := true
	actual := ZeroSumSubarray(input)
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
    var input = new int[] {4, 2, -1, -1, 3};
    var expected = true;
    var actual = new Program().zeroSumSubarray(input);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(n) space - where n is the length of nums
  public boolean zeroSumSubarray(int[] nums) {
    HashSet<Integer> sums = new HashSet<Integer>();
    sums.add(0);
    int currentSum = 0;
    for (int num : nums) {
      currentSum += num;
      if (sums.contains(currentSum)) {
        return true;
      }
      sums.add(currentSum);
    }
    return false;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    var input = new int[] {4, 2, -1, -1, 3};
    var expected = true;
    var actual = new Program().zeroSumSubarray(input);
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
  const input = [4, 2, -1, -1, 3];
  const expected = true;
  const actual = program.zeroSumSubarray(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of nums
function zeroSumSubarray(nums) {
  const sums = new Set([0]);
  let currentSum = 0;
  for (const num of nums) {
    currentSum += num;
    if (sums.has(currentSum)) return true;
    sums.add(currentSum);
  }

  return false;
}

// Do not edit the line below.
exports.zeroSumSubarray = zeroSumSubarray;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [4, 2, -1, -1, 3];
  const expected = true;
  const actual = program.zeroSumSubarray(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.zeroSumSubarray

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(4, 2, -1, -1, 3)
        val expected = true
        val output = zeroSumSubarray(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(n) space - where n is the length of nums
fun zeroSumSubarray(nums: List<Int>): Boolean {
    val sums = mutableSetOf(0)
    var currentSum = 0
    for (num in nums) {
        currentSum += num
        if (currentSum in sums) return true
        sums.add(currentSum)
    }

    return false
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.zeroSumSubarray

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(4, 2, -1, -1, 3)
        val expected = true
        val output = zeroSumSubarray(input)
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
    runTest("Test Case 1") { () throws in
      var input = [4, 2, -1, -1, 3]
      var expected = true
      var actual = Program().zeroSumSubarray(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the length of nums
  func zeroSumSubarray(_ nums: [Int]) -> Bool {
    var sums: Set = [0]
    var currentSum = 0
    for num in nums {
      currentSum += num
      if sums.contains(currentSum) {
        return true
      }
      sums.insert(currentSum)
    }
    return false
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws in
      var input = [4, 2, -1, -1, 3]
      var expected = true
      var actual = Program().zeroSumSubarray(input)
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
        input = [4, 2, -1, -1, 3]
        expected = True
        actual = program.zeroSumSubarray(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the length of nums
def zeroSumSubarray(nums):
    sums = set([0])
    currentSum = 0
    for num in nums:
        currentSum += num
        if currentSum in sums:
            return True
        sums.add(currentSum)

    return False

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [4, 2, -1, -1, 3]
        expected = True
        actual = program.zeroSumSubarray(input)
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
  const input = [4, 2, -1, -1, 3];
  const expected = true;
  const actual = program.zeroSumSubarray(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of nums
export function zeroSumSubarray(nums: number[]) {
  const sums = new Set([0]);
  let currentSum = 0;
  for (const num of nums) {
    currentSum += num;
    if (sums.has(currentSum)) return true;
    sums.add(currentSum);
  }

  return false;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [4, 2, -1, -1, 3];
  const expected = true;
  const actual = program.zeroSumSubarray(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

