# Two Number Sum
<div class="html">
<p>
  Write a function that takes in a non-empty array of distinct integers and an
  integer representing a target sum. If any two numbers in the input array sum
  up to the target sum, the function should return them in an array, in any
  order. If no two numbers sum up to the target sum, the function should return
  an empty array.
</p>
<p>
  Note that the target sum has to be obtained by summing two different integers
  in the array; you can't add a single integer to itself in order to obtain the
  target sum.
</p>
<p>
  You can assume that there will be at most one pair of numbers summing up to
  the target sum.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [3, 5, -4, 8, 11, 1, -1, 6]
<span class="CodeEditor-promptParameter">targetSum</span> = 10
</pre>
<h3>Sample Output</h3>
<pre>
[-1, 11] <span class="CodeEditor-promptComment">// the numbers could be in reverse order</span>
</pre>
</div>

Hint 1
<p>
Try using two for loops to sum all possible pairs of numbers in the input array. What are the time and space implications of this approach?
</p>


Hint 2

<p>
Realize that for every number X in the input array, you are essentially trying to find a corresponding number Y such that X + Y = targetSum. With two variables in this equation known to you, it shouldn't be hard to solve for Y.
</p>


Hint 3

<p>
Try storing every number in a hash table, solving the equation mentioned in Hint #2 for every number, and checking if the Y that you find is stored in the hash table. What are the time and space implications of this approach?
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

using namespace std;

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> output = twoNumberSum({3, 5, -4, 8, 11, 1, -1, 6}, 10);
      assert(output.size() == 2);
      assert(count(output.begin(), output.end(), -1));
      assert(count(output.begin(), output.end(), 11));
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

// O(n^2) time | O(1) space
vector<int> twoNumberSum(vector<int> array, int targetSum) {
  for (int i = 0; i < array.size() - 1; i++) {
    int firstNum = array[i];
    for (int j = i + 1; j < array.size(); j++) {
      int secondNum = array[j];
      if (firstNum + secondNum == targetSum) {
        return vector<int>{firstNum, secondNum};
      }
    }
  }
  return {};
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <unordered_set>
using namespace std;

// O(n) time | O(n) space
vector<int> twoNumberSum(vector<int> array, int targetSum) {
  unordered_set<int> nums;
  for (int num : array) {
    int potentialMatch = targetSum - num;
    if (nums.find(potentialMatch) != nums.end()) {
      return vector<int>{potentialMatch, num};
    } else {
      nums.insert(num);
    }
  }
  return {};
}

```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <algorithm>
using namespace std;

// O(nlog(n)) | O(1) space
vector<int> twoNumberSum(vector<int> array, int targetSum) {
  sort(array.begin(), array.end());
  int left = 0;
  int right = array.size() - 1;
  while (left < right) {
    int currentSum = array[left] + array[right];
    if (currentSum == targetSum) {
      return {array[left], array[right]};
    } else if (currentSum < targetSum) {
      left++;
    } else if (currentSum > targetSum) {
      right--;
    }
  }
  return {};
}

```
### Unit Tests 1 (cpp)
```cpp
using namespace std;

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> output = twoNumberSum({3, 5, -4, 8, 11, 1, -1, 6}, 10);
      assert(output.size() == 2);
      assert(count(output.begin(), output.end(), -1));
      assert(count(output.begin(), output.end(), 11));
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
using System.Linq;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] output = Program.TwoNumberSum(new int[] {3, 5, -4, 8, 11, 1, -1, 6}, 10);
		Utils.AssertTrue(output.Length == 2);
		Utils.AssertTrue(Array.Exists(output, e => e == -1));
		Utils.AssertTrue(Array.Exists(output, e => e == 11));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(n^2) time | O(1) space
	public static int[] TwoNumberSum(int[] array, int targetSum) {
		for (int i = 0; i < array.Length - 1; i++) {
			int firstNum = array[i];
			for (int j = i + 1; j < array.Length; j++) {
				int secondNum = array[j];
				if (firstNum + secondNum == targetSum) {
					return new int[] {firstNum, secondNum};
				}
			}
		}
		return new int[0];
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n) time | O(n) space
	public static int[] TwoNumberSum(int[] array, int targetSum) {
		HashSet<int> nums = new HashSet<int>();
		foreach (int num in array) {
			int potentialMatch = targetSum - num;
			if (nums.Contains(potentialMatch)) {
				return new int[] {potentialMatch, num};
			} else {
				nums.Add(num);
			}
		}
		return new int[0];
	}
}

```
### Solution 3 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// O(nlog(n)) | O(1) space
	public static int[] TwoNumberSum(int[] array, int targetSum) {
		Array.Sort(array);
		int left = 0;
		int right = array.Length - 1;
		while (left < right) {
			int currentSum = array[left] + array[right];
			if (currentSum == targetSum) {
				return new int[] {array[left], array[right]};
			} else if (currentSum < targetSum) {
				left++;
			} else if (currentSum > targetSum) {
				right--;
			}
		}
		return new int[0];
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;
using System.Linq;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] output = Program.TwoNumberSum(new int[] {3, 5, -4, 8, 11, 1, -1, 6}, 10);
		Utils.AssertTrue(output.Length == 2);
		Utils.AssertTrue(Array.Exists(output, e => e == -1));
		Utils.AssertTrue(Array.Exists(output, e => e == 11));
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
	expected := []int{-1, 11}
	output := TwoNumberSum([]int{3, 5, -4, 8, 11, 1, -1, 6}, 10)
	require.ElementsMatch(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n^2) time | O(1) space
func TwoNumberSum(array []int, target int) []int {
	for i := 0; i < len(array)-1; i++ {
		firstNum := array[i]
		for j := i + 1; j < len(array); j++ {
			secondNum := array[j]
			if firstNum+secondNum == target {
				return []int{firstNum, secondNum}
			}
		}
	}
	return []int{}
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space
func TwoNumberSum(array []int, target int) []int {
	nums := map[int]bool{}
	for _, num := range array {
		potentialMatch := target - num
		if _, found := nums[potentialMatch]; found {
			return []int{potentialMatch, num}
		}
		nums[num] = true
	}
	return []int{}
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "sort"

// O(nlog(n)) time | O(1) space
func TwoNumberSum(array []int, target int) []int {
	sort.Ints(array)
	left, right := 0, len(array)-1
	for left < right {
		currentSum := array[left] + array[right]
		if currentSum == target {
			return []int{array[left], array[right]}
		} else if currentSum < target {
			left += 1
		} else {
			right -= 1
		}
	}
	return []int{}
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := []int{-1, 11}
	output := TwoNumberSum([]int{3, 5, -4, 8, 11, 1, -1, 6}, 10)
	require.ElementsMatch(t, expected, output)
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
    int[] output = Program.twoNumberSum(new int[] {3, 5, -4, 8, 11, 1, -1, 6}, 10);
    Utils.assertTrue(output.length == 2);
    Utils.assertTrue(contains(output, -1));
    Utils.assertTrue(contains(output, 11));
  }

  public boolean contains(int[] output, int val) {
    for (var el : output) {
      if (el == val) return true;
    }
    return false;
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(1) space
  public static int[] twoNumberSum(int[] array, int targetSum) {
    for (int i = 0; i < array.length - 1; i++) {
      int firstNum = array[i];
      for (int j = i + 1; j < array.length; j++) {
        int secondNum = array[j];
        if (firstNum + secondNum == targetSum) {
          return new int[] {firstNum, secondNum};
        }
      }
    }
    return new int[0];
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(n) space
  public static int[] twoNumberSum(int[] array, int targetSum) {
    Set<Integer> nums = new HashSet<>();
    for (int num : array) {
      int potentialMatch = targetSum - num;
      if (nums.contains(potentialMatch)) {
        return new int[] {potentialMatch, num};
      } else {
        nums.add(num);
      }
    }
    return new int[0];
  }
}

```
### Solution 3 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.Arrays;

class Program {
  // O(nlog(n)) | O(1) space
  public static int[] twoNumberSum(int[] array, int targetSum) {
    Arrays.sort(array);
    int left = 0;
    int right = array.length - 1;
    while (left < right) {
      int currentSum = array[left] + array[right];
      if (currentSum == targetSum) {
        return new int[] {array[left], array[right]};
      } else if (currentSum < targetSum) {
        left++;
      } else if (currentSum > targetSum) {
        right--;
      }
    }
    return new int[0];
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[] output = Program.twoNumberSum(new int[] {3, 5, -4, 8, 11, 1, -1, 6}, 10);
    Utils.assertTrue(output.length == 2);
    Utils.assertTrue(contains(output, -1));
    Utils.assertTrue(contains(output, 11));
  }

  public boolean contains(int[] output, int val) {
    for (var el : output) {
      if (el == val) return true;
    }
    return false;
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
  const output = program.twoNumberSum([3, 5, -4, 8, 11, 1, -1, 6], 10);
  chai.expect(output.length === 2).to.deep.equal(true);
  chai.expect(output.includes(11)).to.deep.equal(true);
  chai.expect(output.includes(-1)).to.deep.equal(true);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(1) space
function twoNumberSum(array, targetSum) {
  for (let i = 0; i < array.length - 1; i++) {
    const firstNum = array[i];
    for (let j = i + 1; j < array.length; j++) {
      const secondNum = array[j];
      if (firstNum + secondNum === targetSum) {
        return [firstNum, secondNum];
      }
    }
  }
  return [];
}

exports.twoNumberSum = twoNumberSum;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space
function twoNumberSum(array, targetSum) {
  const nums = {};
  for (const num of array) {
    const potentialMatch = targetSum - num;
    if (potentialMatch in nums) {
      return [potentialMatch, num];
    } else {
      nums[num] = true;
    }
  }
  return [];
}

exports.twoNumberSum = twoNumberSum;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlog(n)) | O(1) space
function twoNumberSum(array, targetSum) {
  array.sort((a, b) => a - b);
  let left = 0;
  let right = array.length - 1;
  while (left < right) {
    const currentSum = array[left] + array[right];
    if (currentSum === targetSum) {
      return [array[left], array[right]];
    } else if (currentSum < targetSum) {
      left++;
    } else if (currentSum > targetSum) {
      right--;
    }
  }
  return [];
}

exports.twoNumberSum = twoNumberSum;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const output = program.twoNumberSum([3, 5, -4, 8, 11, 1, -1, 6], 10);
  chai.expect(output.length === 2).to.deep.equal(true);
  chai.expect(output.includes(11)).to.deep.equal(true);
  chai.expect(output.includes(-1)).to.deep.equal(true);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.twoNumberSum as twoNumberSum

class ProgramTest {
    @Test
    fun TestCase1() {
        val output = twoNumberSum(mutableListOf<Int>(3, 5, -4, 8, 11, 1, -1, 6), 10)
        assert(output.size == 2)
        assert(output.contains(11))
        assert(output.contains(-1))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^2) time | O(1) space
fun twoNumberSum(array: MutableList<Int>, targetSum: Int): List<Int> {
    for (i in 0 until array.size - 1) {
        val firstNum = array[i]
        for (j in i + 1 until array.size) {
            val secondNum = array[j]
            if (firstNum + secondNum == targetSum) {
                return listOf<Int>(firstNum, secondNum)
            }
        }
    }
    return listOf<Int>()
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(n) space
fun twoNumberSum(array: MutableList<Int>, targetSum: Int): List<Int> {
    val nums = mutableMapOf<Int, Boolean>()
    for (num in array) {
        val potentialMatch = targetSum - num
        if (nums.containsKey(potentialMatch)) {
            return listOf<Int>(potentialMatch, num)
        } else {
            nums[num] = true
        }
    }
    return listOf<Int>()
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(nlog(n)) | O(1) space
fun twoNumberSum(array: MutableList<Int>, targetSum: Int): List<Int> {
    array.sort()
    var left = 0
    var right = array.size - 1
    while (left < right) {
        val currentSum = array[left] + array[right]
        if (currentSum == targetSum) {
            return listOf<Int>(array[left], array[right])
        } else if (currentSum < targetSum) {
            left++
        } else if (currentSum > targetSum) {
            right--
        }
    }
    return listOf<Int>()
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.twoNumberSum as twoNumberSum

class ProgramTest {
    @Test
    fun TestCase1() {
        val output = twoNumberSum(mutableListOf<Int>(3, 5, -4, 8, 11, 1, -1, 6), 10)
        assert(output.size == 2)
        assert(output.contains(11))
        assert(output.contains(-1))
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
      var array = [3, 5, -4, 8, 11, 1, -1, 6]
      var actual = program.twoNumberSum(&array, 10)
      try assert(actual.count == 2)
      try assert(actual.contains(-1))
      try assert(actual.contains(11))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(1) space
  func twoNumberSum(_ array: inout [Int], _ targetSum: Int) -> [Int] {
    for i in 0 ..< array.count - 1 {
      let firstNumber = array[i]

      for j in i + 1 ..< array.count {
        let secondNumber = array[j]

        if firstNumber + secondNumber == targetSum {
          return [firstNumber, secondNumber]
        }
      }
    }

    return []
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space
  func twoNumberSum(_ array: inout [Int], _ targetSum: Int) -> [Int] {
    var numbersHashMap = [Int: Bool]()

    for number in array {
      let potentialMatch = targetSum - number

      if let exists = numbersHashMap[potentialMatch], exists {
        return [potentialMatch, number]
      } else {
        numbersHashMap[number] = true
      }
    }

    return []
  }
}

```
### Solution 3 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nlog(n)) time | O(1) space
  func twoNumberSum(_ array: inout [Int], _ targetSum: Int) -> [Int] {
    array.sort()

    var leftPointer = 0
    var rightPointer = array.count - 1

    while leftPointer < rightPointer {
      let leftMost = array[leftPointer]
      let rightMost = array[rightPointer]

      let currentSum = leftMost + rightMost

      if currentSum == targetSum {
        return [leftMost, rightMost]
      } else if currentSum < targetSum {
        leftPointer = leftPointer + 1
      } else if currentSum > targetSum {
        rightPointer = rightPointer - 1
      }
    }

    return []
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      var array = [3, 5, -4, 8, 11, 1, -1, 6]
      var actual = program.twoNumberSum(&array, 10)
      try assert(actual.count == 2)
      try assert(actual.contains(-1))
      try assert(actual.contains(11))
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
        output = program.twoNumberSum([3, 5, -4, 8, 11, 1, -1, 6], 10)
        self.assertTrue(len(output) == 2)
        self.assertTrue(11 in output)
        self.assertTrue(-1 in output)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(1) space
def twoNumberSum(array, targetSum):
    for i in range(len(array) - 1):
        firstNum = array[i]
        for j in range(i + 1, len(array)):
            secondNum = array[j]
            if firstNum + secondNum == targetSum:
                return [firstNum, secondNum]
    return []

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space
def twoNumberSum(array, targetSum):
    nums = {}
    for num in array:
        potentialMatch = targetSum - num
        if potentialMatch in nums:
            return [potentialMatch, num]
        else:
            nums[num] = True
    return []

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nlog(n)) | O(1) space
def twoNumberSum(array, targetSum):
    array.sort()
    left = 0
    right = len(array) - 1
    while left < right:
        currentSum = array[left] + array[right]
        if currentSum == targetSum:
            return [array[left], array[right]]
        elif currentSum < targetSum:
            left += 1
        elif currentSum > targetSum:
            right -= 1
    return []

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        output = program.twoNumberSum([3, 5, -4, 8, 11, 1, -1, 6], 10)
        self.assertTrue(len(output) == 2)
        self.assertTrue(11 in output)
        self.assertTrue(-1 in output)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const output = program.twoNumberSum([3, 5, -4, 8, 11, 1, -1, 6], 10);
  chai.expect(output.length === 2).to.deep.equal(true);
  chai.expect(output.includes(11)).to.deep.equal(true);
  chai.expect(output.includes(-1)).to.deep.equal(true);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(1) space
export function twoNumberSum(array: number[], targetSum: number) {
  for (let i = 0; i < array.length - 1; i++) {
    const firstNum = array[i];
    for (let j = i + 1; j < array.length; j++) {
      const secondNum = array[j];
      if (firstNum + secondNum === targetSum) {
        return [firstNum, secondNum];
      }
    }
  }
  return [];
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space
export function twoNumberSum(array: number[], targetSum: number) {
  const nums: {[key: number]: boolean} = {};
  for (const num of array) {
    const potentialMatch = targetSum - num;
    if (potentialMatch in nums) {
      return [potentialMatch, num];
    } else {
      nums[num] = true;
    }
  }
  return [];
}

```
### Solution 3 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlog(n)) | O(1) space
export function twoNumberSum(array: number[], targetSum: number) {
  array.sort((a, b) => a - b);
  let left = 0;
  let right = array.length - 1;
  while (left < right) {
    const currentSum = array[left] + array[right];
    if (currentSum === targetSum) {
      return [array[left], array[right]];
    } else if (currentSum < targetSum) {
      left++;
    } else if (currentSum > targetSum) {
      right--;
    }
  }
  return [];
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const output = program.twoNumberSum([3, 5, -4, 8, 11, 1, -1, 6], 10);
  chai.expect(output.length === 2).to.deep.equal(true);
  chai.expect(output.includes(11)).to.deep.equal(true);
  chai.expect(output.includes(-1)).to.deep.equal(true);
});

```

