# Max Subset Sum No Adjacent
<div class="html">
<p>
  Write a function that takes in an array of positive integers and returns the
  maximum sum of non-adjacent elements in the array.
</p>
<p>If the input array is empty, the function should return <span>0</span>.</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [75, 105, 120, 75, 90, 135]
</pre>
<h3>Sample Output</h3>
<pre>
330 <span class="CodeEditor-promptComment">// 75 + 120 + 135</span>
</pre>
</div>

Hint 1
<p>
Try building an array of the same length as the input array. At each index in this new array, store the maximum sum that can be generated using no adjacent numbers located between index 0 and the current index.
</p>


Hint 2

<p>
Can you come up with a formula that relates the max sum at index i to the max sums at indices i - 1 and i - 2?
</p>


Hint 3

<p>
Do you really need to store the entire array mentioned in Hint #1, or can you somehow store just the max sums that you need at any point in time?
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
      vector<int> vector{75, 105, 120, 75, 90, 135};
      assert(maxSubsetSumNoAdjacent(vector) == 330);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

// O(n) time | O(n) space
int maxSubsetSumNoAdjacent(vector<int> array) {
  if (array.size() == 0) {
    return 0;
  } else if (array.size() == 1) {
    return array[0];
  }
  vector<int> maxSums = array;
  maxSums[1] = max(array[0], array[1]);
  for (int i = 2; i < array.size(); i++) {
    maxSums[i] = max(maxSums[i - 1], maxSums[i - 2] + array[i]);
  }
  return maxSums[array.size() - 1];
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

// O(n) time | O(1) space
int maxSubsetSumNoAdjacent(vector<int> array) {
  if (array.size() == 0) {
    return 0;
  } else if (array.size() == 1) {
    return array[0];
  }
  int second = array[0];
  int first = max(array[0], array[1]);
  for (int i = 2; i < array.size(); i++) {
    int current = max(first, second + array[i]);
    second = first;
    first = current;
  }
  return first;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> vector{75, 105, 120, 75, 90, 135};
      assert(maxSubsetSumNoAdjacent(vector) == 330);
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
		int[] input = {75, 105, 120, 75, 90, 135};
		Utils.AssertTrue(Program.MaxSubsetSumNoAdjacent(input) == 330);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// O(n) time | O(n) space
	public static int MaxSubsetSumNoAdjacent(int[] array) {
		if (array.Length == 0) {
			return 0;
		} else if (array.Length == 1) {
			return array[0];
		}
		int[] maxSums = (int[]) array.Clone();
		maxSums[1] = Math.Max(array[0], array[1]);
		for (int i = 2; i < array.Length; i++) {
			maxSums[i] = Math.Max(maxSums[i - 1], maxSums[i - 2] + array[i]);
		}
		return maxSums[array.Length - 1];
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// O(n) time | O(1) space
	public static int MaxSubsetSumNoAdjacent(int[] array) {
		if (array.Length == 0) {
			return 0;
		} else if (array.Length == 1) {
			return array[0];
		}
		int second = array[0];
		int first = Math.Max(array[0], array[1]);
		for (int i = 2; i < array.Length; i++) {
			int current = Math.Max(first, second + array[i]);
			second = first;
			first = current;
		}
		return first;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] input = {75, 105, 120, 75, 90, 135};
		Utils.AssertTrue(Program.MaxSubsetSumNoAdjacent(input) == 330);
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
	res := MaxSubsetSumNoAdjacent([]int{75, 105, 120, 75, 90, 135})
	require.Equal(t, res, 330)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space
func MaxSubsetSumNoAdjacent(array []int) int {
	if len(array) == 0 {
		return 0
	} else if len(array) == 1 {
		return array[0]
	}
	maxSums := make([]int, len(array))
	maxSums[0], maxSums[1] = array[0], max(array[0], array[1])
	for i := 2; i < len(array); i++ {
		maxSums[i] = max(maxSums[i-1], maxSums[i-2]+array[i])
	}
	return maxSums[len(array)-1]
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

// O(n) time | O(1) space
func MaxSubsetSumNoAdjacent(array []int) int {
	if len(array) == 0 {
		return 0
	} else if len(array) == 1 {
		return array[0]
	}
	first := max(array[0], array[1])
	second := array[0]
	for i := 2; i < len(array); i++ {
		current := max(first, second+array[i])
		second = first
		first = current
	}
	return first
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
	res := MaxSubsetSumNoAdjacent([]int{75, 105, 120, 75, 90, 135})
	require.Equal(t, res, 330)
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
    int[] input = {75, 105, 120, 75, 90, 135};
    Utils.assertTrue(Program.maxSubsetSumNoAdjacent(input) == 330);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space
  public static int maxSubsetSumNoAdjacent(int[] array) {
    if (array.length == 0) {
      return 0;
    } else if (array.length == 1) {
      return array[0];
    }
    int[] maxSums = array.clone();
    maxSums[1] = Math.max(array[0], array[1]);
    for (int i = 2; i < array.length; i++) {
      maxSums[i] = Math.max(maxSums[i - 1], maxSums[i - 2] + array[i]);
    }
    return maxSums[array.length - 1];
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space
  public static int maxSubsetSumNoAdjacent(int[] array) {
    if (array.length == 0) {
      return 0;
    } else if (array.length == 1) {
      return array[0];
    }
    int second = array[0];
    int first = Math.max(array[0], array[1]);
    for (int i = 2; i < array.length; i++) {
      int current = Math.max(first, second + array[i]);
      second = first;
      first = current;
    }
    return first;
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    int[] input = {75, 105, 120, 75, 90, 135};
    Utils.assertTrue(Program.maxSubsetSumNoAdjacent(input) == 330);
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
  chai.expect(program.maxSubsetSumNoAdjacent([75, 105, 120, 75, 90, 135])).to.deep.equal(330);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space
function maxSubsetSumNoAdjacent(array) {
  if (!array.length) return 0;
  if (array.length === 1) return array[0];
  const maxSums = array.slice();
  maxSums[1] = Math.max(array[0], array[1]);
  for (let i = 2; i < array.length; i++) {
    maxSums[i] = Math.max(maxSums[i - 1], maxSums[i - 2] + array[i]);
  }
  return maxSums[maxSums.length - 1];
}

exports.maxSubsetSumNoAdjacent = maxSubsetSumNoAdjacent;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space
function maxSubsetSumNoAdjacent(array) {
  if (!array.length) return 0;
  if (array.length === 1) return array[0];
  let second = array[0];
  let first = Math.max(array[0], array[1]);
  for (let i = 2; i < array.length; i++) {
    const current = Math.max(first, second + array[i]);
    second = first;
    first = current;
  }
  return first;
}

exports.maxSubsetSumNoAdjacent = maxSubsetSumNoAdjacent;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.maxSubsetSumNoAdjacent([75, 105, 120, 75, 90, 135])).to.deep.equal(330);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.maxSubsetSumNoAdjacent as maxSubsetSumNoAdjacent

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(75, 105, 120, 75, 90, 135)
        val output = maxSubsetSumNoAdjacent(input)
        val expected = 330
        assert(output == expected)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

fun maxSubsetSumNoAdjacent(array: List<Int>): Int {
    if (array.size == 0) {
        return 0
    } else if (array.size == 1) {
        return array[0]
    }
    var maxSums = array.toMutableList()
    maxSums[1] = max(array[0], array[1])
    for (i in 2 until array.size) {
        maxSums[i] = max(maxSums[i - 1], maxSums[i - 2] + array[i])
    }
    return maxSums[array.size - 1]
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

fun maxSubsetSumNoAdjacent(array: List<Int>): Int {
    if (array.size == 0) {
        return 0
    } else if (array.size == 1) {
        return array[0]
    }
    var second = array[0]
    var first = max(array[0], array[1])
    for (i in 2 until array.size) {
        val current = max(first, second + array[i])
        second = first
        first = current
    }
    return first
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.maxSubsetSumNoAdjacent as maxSubsetSumNoAdjacent

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(75, 105, 120, 75, 90, 135)
        val output = maxSubsetSumNoAdjacent(input)
        val expected = 330
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
      try assertEqual(330, program.maximumSubsetSum(array: [75, 105, 120, 75, 90, 135]))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space
  func maximumSubsetSum(array: [Int]) -> Int {
    if array.count == 0 {
      return 0
    }

    if array.count == 1 {
      return array.first!
    }

    var maxSums = array
    maxSums[1] = max(maxSums[0], maxSums[1])

    for i in 2 ..< array.count {
      maxSums[i] = max(maxSums[i - 1], maxSums[i - 2] + array[i])
    }

    return maxSums[maxSums.count - 1]
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space
  func maximumSubsetSum(array: [Int]) -> Int {
    if array.count == 0 {
      return 0
    }

    if array.count == 1 {
      return array[0]
    }

    var second = array[0]
    var first = max(array[0], array[1])

    for i in 2 ..< array.count {
      var current = max(first, second + array[i])
      second = first
      first = current
    }

    return first
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      try assertEqual(330, program.maximumSubsetSum(array: [75, 105, 120, 75, 90, 135]))
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
        self.assertEqual(program.maxSubsetSumNoAdjacent([75, 105, 120, 75, 90, 135]), 330)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space
def maxSubsetSumNoAdjacent(array):
    if not len(array):
        return 0
    elif len(array) == 1:
        return array[0]
    maxSums = array[:]
    maxSums[1] = max(array[0], array[1])
    for i in range(2, len(array)):
        maxSums[i] = max(maxSums[i - 1], maxSums[i - 2] + array[i])
    return maxSums[-1]

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space
def maxSubsetSumNoAdjacent(array):
    if not len(array):
        return 0
    elif len(array) == 1:
        return array[0]
    second = array[0]
    first = max(array[0], array[1])
    for i in range(2, len(array)):
        current = max(first, second + array[i])
        second = first
        first = current
    return first

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.maxSubsetSumNoAdjacent([75, 105, 120, 75, 90, 135]), 330)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.maxSubsetSumNoAdjacent([75, 105, 120, 75, 90, 135])).to.deep.equal(330);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space
export function maxSubsetSumNoAdjacent(array: number[]) {
  if (!array.length) return 0;
  if (array.length === 1) return array[0];
  const maxSums = array.slice();
  maxSums[1] = Math.max(array[0], array[1]);
  for (let i = 2; i < array.length; i++) {
    maxSums[i] = Math.max(maxSums[i - 1], maxSums[i - 2] + array[i]);
  }
  return maxSums[maxSums.length - 1];
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space
export function maxSubsetSumNoAdjacent(array: number[]) {
  if (!array.length) return 0;
  if (array.length === 1) return array[0];
  let second = array[0];
  let first = Math.max(array[0], array[1]);
  for (let i = 2; i < array.length; i++) {
    const current = Math.max(first, second + array[i]);
    second = first;
    first = current;
  }
  return first;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.maxSubsetSumNoAdjacent([75, 105, 120, 75, 90, 135])).to.deep.equal(330);
});

```

