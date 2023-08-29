# First Duplicate Value
<div class="html">
<p>
  Given an array of integers between <span>1</span> and <span>n</span>,
  inclusive, where <span>n</span> is the length of the array, write a function
  that returns the first integer that appears more than once (when the array is
  read from left to right).
</p>
<p>
  In other words, out of all the integers that might occur more than once in the
  input array, your function should return the one whose first duplicate value
  has the minimum index.
</p>
<p>
  If no integer appears more than once, your function should return
  <span>-1</span>.
</p>
<p>Note that you're allowed to mutate the input array.</p>
<h3>Sample Input #1</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [2, 1, 5, 2, 3, 3, 4]
</pre>
<h3>Sample Output #1</h3>
<pre>
2 <span class="CodeEditor-promptComment">// 2 is the first integer that appears more than once.</span>
<span class="CodeEditor-promptComment">// 3 also appears more than once, but the second 3 appears after the second 2.</span>
</pre>
<h3>Sample Input #2</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [2, 1, 5, 3, 3, 2, 4]
</pre>
<h3>Sample Output #2</h3>
<pre>
3 <span class="CodeEditor-promptComment">// 3 is the first integer that appears more than once.</span>
<span class="CodeEditor-promptComment">// 2 also appears more than once, but the second 2 appears after the second 3.</span>
</pre>
</div>

Hint 1
<p>
The brute-force solution can be done in O(n^2) time. Think about how you can determine if a value appears twice in an array.
</p>


Hint 2

<p>
You can use a data structure that has constant-time lookups to keep track of integers that you've seen already. This leads the way to a linear-time solution.
</p>


Hint 3

<p>
You should always pay close attention to the details of a question's prompt. In this question, the integers in the array are between 1 and n, inclusive, where n is the length of the input array. The prompt also explicitly allows us to mutate the array. How can these details help us find a better solution, either time-complexity-wise or space-complexity-wise? 
</p>


Hint 4

<p>
Since the integers are between 1 and the length of the input array, you can map them to indices in the array itself by subtracting 1 from them. Once you've mapped an integer to an index in the array, you can mutate the value in the array at that index and make it negative (by multiplying it by -1). Since the integers normally aren't negative, the first time that you encounter a negative value at the index that an integer maps to, you'll know that you'll have already seen that integer.
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
      vector<int> input = {2, 1, 5, 2, 3, 3, 4};
      int expected = 2;
      int actual = firstDuplicateValue(input);
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

// O(n^2) time | O(1) space - where n is the length of the input array
int firstDuplicateValue(vector<int> array) {
  int minimumSecondIndex = array.size();
  for (int i = 0; i < array.size(); i++) {
    int value = array[i];
    for (int j = i + 1; j < array.size(); j++) {
      int valueToCompare = array[j];
      if (value == valueToCompare) {
        minimumSecondIndex = min(minimumSecondIndex, j);
      }
    }
  }
  if (minimumSecondIndex == array.size()) {
    return -1;
  }

  return array[minimumSecondIndex];
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <unordered_map>
using namespace std;

// O(n) time | O(n) space - where n is the length of the input array
int firstDuplicateValue(vector<int> array) {
  unordered_map<int, bool> seen;
  for (int value : array) {
    if (seen.find(value) != seen.end()) {
      return value;
    }
    seen[value] = true;
  }
  return -1;
}

```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <algorithm>
using namespace std;

// O(n) time | O(1) space - where n is the length of the input array
int firstDuplicateValue(vector<int> array) {
  for (int value : array) {
    int absValue = abs(value);
    if (array[absValue - 1] < 0) {
      return absValue;
    }
    array[absValue - 1] *= -1;
  }
  return -1;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> input = {2, 1, 5, 2, 3, 3, 4};
      int expected = 2;
      int actual = firstDuplicateValue(input);
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
		var input = new int[] {2, 1, 5, 2, 3, 3, 4};
		var expected = 2;
		var actual = new Program().FirstDuplicateValue(input);
		Utils.AssertTrue(expected == actual);
	}
}


```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	// O(n^2) time | O(1) space - where n is the length of the input array
	public int FirstDuplicateValue(int[] array) {
		int minimumSecondIndex = array.Length;
		for (int i=0; i<array.Length; i++) {
			int value = array[i];
			for (int j=i + 1; j<array.Length; j++) {
				int valueToCompare = array[j];
				if (value == valueToCompare) {
					minimumSecondIndex = Math.Min(minimumSecondIndex, j);
				}
			}
		}

		if (minimumSecondIndex == array.Length) {
			return -1;
		}

		return array[minimumSecondIndex];
	}
}


```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {

	// O(n) time | O(n) space - where n is the length of the input array
	public int FirstDuplicateValue(int[] array) {
		HashSet<int> seen = new HashSet<int>();
		foreach (var value in array) {
			if (seen.Contains(value)) return value;
			seen.Add(value);
		}
		return -1;
	}
}


```
### Solution 3 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	// O(n) time | O(1) space - where n is the length of the input array
	public int FirstDuplicateValue(int[] array) {
		foreach (var value in array) {
			int absValue = Math.Abs(value);
			if (array[absValue - 1] < 0) return absValue;
			array[absValue - 1] *= -1;
		}
		return -1;
	}
}


```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		var input = new int[] {2, 1, 5, 2, 3, 3, 4};
		var expected = 2;
		var actual = new Program().FirstDuplicateValue(input);
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
	input := []int{2, 1, 5, 2, 3, 3, 4}
	expected := 2
	actual := FirstDuplicateValue(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n^2) time | O(1) space - where n is the length of the input array
func FirstDuplicateValue(array []int) int {
	minimumSecondIndex := len(array)
	for i := 0; i < len(array); i++ {
		value := array[i]
		for j := i + 1; j < len(array); j++ {
			valueToCompare := array[j]
			if value == valueToCompare {
				minimumSecondIndex = min(minimumSecondIndex, j)
			}
		}
	}
	if minimumSecondIndex == len(array) {
		return -1
	}

	return array[minimumSecondIndex]
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space - where n is the length of the input array
func FirstDuplicateValue(array []int) int {
	seen := map[int]bool{}
	for _, value := range array {
		if seen[value] {
			return value
		}
		seen[value] = true
	}
	return -1
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space - where n is the length of the input array
func FirstDuplicateValue(array []int) int {
	for _, value := range array {
		absValue := abs(value)
		if array[absValue-1] < 0 {
			return absValue
		}
		array[absValue-1] *= -1
	}
	return -1
}

func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []int{2, 1, 5, 2, 3, 3, 4}
	expected := 2
	actual := FirstDuplicateValue(input)
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
    var input = new int[] {2, 1, 5, 2, 3, 3, 4};
    var expected = 2;
    var actual = new Program().firstDuplicateValue(input);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n^2) time | O(1) space - where n is the length of the input array
  public int firstDuplicateValue(int[] array) {
    int minimumSecondIndex = array.length;
    for (int i = 0; i < array.length; i++) {
      int value = array[i];
      for (int j = i + 1; j < array.length; j++) {
        int valueToCompare = array[j];
        if (value == valueToCompare) {
          minimumSecondIndex = Math.min(minimumSecondIndex, j);
        }
      }
    }

    if (minimumSecondIndex == array.length) {
      return -1;
    }

    return array[minimumSecondIndex];
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n) time | O(n) space - where n is the length of the input array
  public int firstDuplicateValue(int[] array) {
    HashSet<Integer> seen = new HashSet<Integer>();
    for (int value : array) {
      if (seen.contains(value)) return value;
      seen.add(value);
    }
    return -1;
  }
}

```
### Solution 3 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n) time | O(1) space - where n is the length of the input array
  public int firstDuplicateValue(int[] array) {
    for (int value : array) {
      int absValue = Math.abs(value);
      if (array[absValue - 1] < 0) return absValue;
      array[absValue - 1] *= -1;
    }
    return -1;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    var input = new int[] {2, 1, 5, 2, 3, 3, 4};
    var expected = 2;
    var actual = new Program().firstDuplicateValue(input);
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
  const input = [2, 1, 5, 2, 3, 3, 4];
  const expected = 2;
  const actual = program.firstDuplicateValue(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(1) space - where n is the length of the input array
function firstDuplicateValue(array) {
  let minimumSecondIndex = array.length;
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    for (let j = i + 1; j < array.length; j++) {
      const valueToCompare = array[j];
      if (value === valueToCompare) {
        minimumSecondIndex = Math.min(minimumSecondIndex, j);
      }
    }
  }

  if (minimumSecondIndex === array.length) return -1;

  return array[minimumSecondIndex];
}

// Do not edit the line below.
exports.firstDuplicateValue = firstDuplicateValue;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input array
function firstDuplicateValue(array) {
  const seen = new Set();
  for (const value of array) {
    if (seen.has(value)) return value;
    seen.add(value);
  }
  return -1;
}

// Do not edit the line below.
exports.firstDuplicateValue = firstDuplicateValue;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the input array
function firstDuplicateValue(array) {
  for (const value of array) {
    const absValue = Math.abs(value);
    if (array[absValue - 1] < 0) return absValue;
    array[absValue - 1] *= -1;
  }
  return -1;
}

// Do not edit the line below.
exports.firstDuplicateValue = firstDuplicateValue;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [2, 1, 5, 2, 3, 3, 4];
  const expected = 2;
  const actual = program.firstDuplicateValue(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.firstDuplicateValue

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(2, 1, 5, 2, 3, 3, 4)
        val expected = 2
        val output = firstDuplicateValue(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.min

// O(n^2) time | O(1) space - where n is the length of the input array
fun firstDuplicateValue(array: MutableList<Int>): Int {
    var minimumSecondIndex = array.size
    for (i in 0 until array.size) {
        val value = array[i]
        for (j in i + 1 until array.size) {
            val valueToCompare = array[j]
            if (value == valueToCompare) {
                minimumSecondIndex = min(minimumSecondIndex, j)
            }
        }
    }

    if (minimumSecondIndex == array.size) return -1

    return array[minimumSecondIndex]
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(n) space - where n is the length of the input array
fun firstDuplicateValue(array: MutableList<Int>): Int {
    val seen = mutableSetOf<Int>()
    for (value in array) {
        if (value in seen) return value
        seen.add(value)
    }
    return -1
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.abs

// O(n) time | O(1) space - where n is the length of the input array
fun firstDuplicateValue(array: MutableList<Int>): Int {
    for (value in array) {
        val absValue = abs(value)
        if (array[absValue - 1] < 0) return absValue
        array[absValue - 1] *= -1
    }
    return -1
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.firstDuplicateValue

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(2, 1, 5, 2, 3, 3, 4)
        val expected = 2
        val output = firstDuplicateValue(input)
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
      var input = [2, 1, 5, 2, 3, 3, 4]
      var expected = 2
      var actual = Program().firstDuplicateValue(&input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(1) space - where n is the length of the input array
  func firstDuplicateValue(_ array: inout [Int]) -> Int {
    var minimumSecondIndex = array.count
    for i in 0 ..< array.count {
      let value = array[i]
      for j in i + 1 ..< array.count {
        let valueToCompare = array[j]
        if value == valueToCompare {
          minimumSecondIndex = min(minimumSecondIndex, j)
        }
      }
    }
    if minimumSecondIndex == array.count {
      return -1
    }
    return array[minimumSecondIndex]
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the length of the input array
  func firstDuplicateValue(_ array: inout [Int]) -> Int {
    var seen = Set<Int>()
    for value in array {
      if seen.contains(value) {
        return value
      }
      seen.insert(value)
    }
    return -1
  }
}

```
### Solution 3 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the length of the input array
  func firstDuplicateValue(_ array: inout [Int]) -> Int {
    for value in array {
      let absValue = abs(value)
      if array[absValue - 1] < 0 {
        return absValue
      }
      array[absValue - 1] = -array[absValue - 1]
    }
    return -1
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = [2, 1, 5, 2, 3, 3, 4]
      var expected = 2
      var actual = Program().firstDuplicateValue(&input)
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
        input = [2, 1, 5, 2, 3, 3, 4]
        expected = 2
        actual = program.firstDuplicateValue(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(1) space - where n is the length of the input array
def firstDuplicateValue(array):
    minimumSecondIndex = len(array)
    for i in range(len(array)):
        value = array[i]
        for j in range(i + 1, len(array)):
            valueToCompare = array[j]
            if value == valueToCompare:
                minimumSecondIndex = min(minimumSecondIndex, j)

    if minimumSecondIndex == len(array):
        return -1

    return array[minimumSecondIndex]

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the length of the input array
def firstDuplicateValue(array):
    seen = set()
    for value in array:
        if value in seen:
            return value
        seen.add(value)
    return -1

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space - where n is the length of the input array
def firstDuplicateValue(array):
    for value in array:
        absValue = abs(value)
        if array[absValue - 1] < 0:
            return absValue
        array[absValue - 1] *= -1
    return -1

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [2, 1, 5, 2, 3, 3, 4]
        expected = 2
        actual = program.firstDuplicateValue(input)
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
  const input = [2, 1, 5, 2, 3, 3, 4];
  const expected = 2;
  const actual = program.firstDuplicateValue(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(1) space - where n is the length of the input array
export function firstDuplicateValue(array: number[]) {
  let minimumSecondIndex = array.length;
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    for (let j = i + 1; j < array.length; j++) {
      const valueToCompare = array[j];
      if (value === valueToCompare) {
        minimumSecondIndex = Math.min(minimumSecondIndex, j);
      }
    }
  }

  if (minimumSecondIndex === array.length) return -1;

  return array[minimumSecondIndex];
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input array
export function firstDuplicateValue(array: number[]) {
  const seen = new Set();
  for (const value of array) {
    if (seen.has(value)) return value;
    seen.add(value);
  }
  return -1;
}

```
### Solution 3 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the input array
export function firstDuplicateValue(array: number[]) {
  for (const value of array) {
    const absValue = Math.abs(value);
    if (array[absValue - 1] < 0) return absValue;
    array[absValue - 1] *= -1;
  }
  return -1;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [2, 1, 5, 2, 3, 3, 4];
  const expected = 2;
  const actual = program.firstDuplicateValue(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

