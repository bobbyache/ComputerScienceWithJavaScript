# Min Number Of Jumps
<div class="html">
<p>
  You're given a non-empty array of positive integers where each integer represents the
  maximum number of steps you can take forward in the array. For example, if the
  element at index <span>1</span> is <span>3</span>, you can go from index
  <span>1</span> to index <span>2</span>, <span>3</span>, or <span>4</span>.
</p>
<p>
  Write a function that returns the minimum number of jumps needed to reach the
  final index.
</p>
<p>
  Note that jumping from index <span>i</span> to index <span>i + x</span> always
  constitutes one jump, no matter how large <span>x</span> is.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3]
</pre>
<h3>Sample Output</h3>
<pre>
4 <span class="CodeEditor-promptComment">// 3 --> (4 or 2) --> (2 or 3) --> 7 --> 3</span>
</pre>
</div>

Hint 1
<p>
Try building an array of the minimum number of jumps needed to go from index 0 to all indices. Start at index 0 and progressively build up the array, using previously calculated values to find next ones.
</p>


Hint 2

<p>
Building the array mentioned in Hint #1 should be feasible using two for loops. In an effort to optimize your algorithm, realize that at any point in the array you know the farthest index that you can reach as well as the number of steps that you have left until you must "consume" a jump.
</p>


Hint 3

<p>
After initializing your maximum reach as well as your current number of steps to the value stored at index 0, you can easily update your maximum reach as you traverse the input array by simply comparing it to the value stored at each index. You can also remove one step from your current number of steps at each index, since moving from one index to the next uses up one step. When your steps reach zero, find a way to calculate how many steps you actually have left using the maximum reach and the index that you're at.
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
      vector<int> input{3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3};
      assert(minNumberOfJumps(input) == 4);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <climits>
using namespace std;

// O(n^2) time | O(n) space
int minNumberOfJumps(vector<int> array) {
  vector<int> jumps(array.size(), INT_MAX);
  jumps[0] = 0;
  for (int i = 1; i < array.size(); i++) {
    for (int j = 0; j < i; j++) {
      if (array[j] >= i - j) {
        jumps[i] = min(jumps[j] + 1, jumps[i]);
      }
    }
  }
  return jumps[jumps.size() - 1];
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

// O(n) time | O(1) space
int minNumberOfJumps(vector<int> array) {
  if (array.size() == 1) {
    return 0;
  }
  int jumps = 0;
  int maxReach = array[0];
  int steps = array[0];
  for (int i = 1; i < array.size() - 1; i++) {
    maxReach = max(maxReach, i + array[i]);
    steps--;
    if (steps == 0) {
      jumps++;
      steps = maxReach - i;
    }
  }
  return jumps + 1;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> input{3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3};
      assert(minNumberOfJumps(input) == 4);
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
		int[] input = {3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3};
		Utils.AssertTrue(Program.MinNumberOfJumps(input) == 4);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// O(n^2) time | O(n) space
	public static int MinNumberOfJumps(int[] array) {
		int[] jumps = new int[array.Length];
		Array.Fill(jumps, Int32.MaxValue);
		jumps[0] = 0;
		for (int i = 1; i < array.Length; i++) {
			for (int j = 0; j < i; j++) {
				if (array[j] >= i -j) {
					jumps[i] = Math.Min(jumps[j] + 1, jumps[i]);
				}
			}
		}
		return jumps[jumps.Length - 1];
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// O(n) time | O(1) space
	public static int MinNumberOfJumps(int[] array) {
		if (array.Length == 1) {
			return 0;
		}
		int jumps = 0;
		int maxReach = array[0];
		int steps = array[0];
		for (int i = 1; i < array.Length - 1; i++) {
			maxReach = Math.Max(maxReach, i + array[i]);
			steps--;
			if (steps == 0) {
				jumps++;
				steps = maxReach - i;
			}
		}
		return jumps + 1;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] input = {3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3};
		Utils.AssertTrue(Program.MinNumberOfJumps(input) == 4);
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
	expected := 4
	output := MinNumberOfJumps([]int{3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3})
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n^2) time | O(n) space
func MinNumberOfJumps(array []int) int {
	jumps := make([]int, len(array))
	for i := range jumps {
		jumps[i] = -1
	}
	jumps[0] = 0
	for i := 1; i < len(array); i++ {
		for j := 0; j < i; j++ {
			if array[j] >= i-j && (jumps[i] == -1 || jumps[j]+1 < jumps[i]) {
				jumps[i] = jumps[j] + 1
			}
		}
	}
	return jumps[len(array)-1]
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space
func MinNumberOfJumps(array []int) int {
	if len(array) == 1 {
		return 0
	}
	jumps := 0
	maxReach := array[0]
	steps := array[0]
	for i := 1; i < len(array)-1; i++ {
		if i+array[i] > maxReach {
			maxReach = i + array[i]
		}
		steps -= 1
		if steps == 0 {
			jumps += 1
			steps = maxReach - i
		}
	}
	return jumps + 1
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := 4
	output := MinNumberOfJumps([]int{3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3})
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
    int[] input = {3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3};
    Utils.assertTrue(Program.minNumberOfJumps(input) == 4);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.Arrays;

class Program {
  // O(n^2) time | O(n) space
  public static int minNumberOfJumps(int[] array) {
    int[] jumps = new int[array.length];
    Arrays.fill(jumps, Integer.MAX_VALUE);
    jumps[0] = 0;
    for (int i = 1; i < array.length; i++) {
      for (int j = 0; j < i; j++) {
        if (array[j] >= i - j) {
          jumps[i] = Math.min(jumps[j] + 1, jumps[i]);
        }
      }
    }
    return jumps[jumps.length - 1];
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space
  public static int minNumberOfJumps(int[] array) {
    if (array.length == 1) {
      return 0;
    }
    int jumps = 0;
    int maxReach = array[0];
    int steps = array[0];
    for (int i = 1; i < array.length - 1; i++) {
      maxReach = Math.max(maxReach, i + array[i]);
      steps--;
      if (steps == 0) {
        jumps++;
        steps = maxReach - i;
      }
    }
    return jumps + 1;
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    int[] input = {3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3};
    Utils.assertTrue(Program.minNumberOfJumps(input) == 4);
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
  chai.expect(program.minNumberOfJumps([3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3])).to.deep.equal(4);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space
function minNumberOfJumps(array) {
  const jumps = new Array(array.length).fill(Infinity);
  jumps[0] = 0;
  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < i; j++) {
      if (array[j] >= i - j) {
        jumps[i] = Math.min(jumps[j] + 1, jumps[i]);
      }
    }
  }
  return jumps[jumps.length - 1];
}

exports.minNumberOfJumps = minNumberOfJumps;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space
function minNumberOfJumps(array) {
  if (array.length === 1) return 0;
  let jumps = 0;
  let maxReach = array[0];
  let steps = array[0];
  for (let i = 1; i < array.length - 1; i++) {
    maxReach = Math.max(maxReach, i + array[i]);
    steps--;
    if (steps === 0) {
      jumps++;
      steps = maxReach - i;
    }
  }
  return jumps + 1;
}

exports.minNumberOfJumps = minNumberOfJumps;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.minNumberOfJumps([3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3])).to.deep.equal(4);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.minNumberOfJumps

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3)
        val output = minNumberOfJumps(input)
        val expected = 4
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.min

fun minNumberOfJumps(array: List<Int>): Int {
    val jumps = MutableList(array.size) { Int.MAX_VALUE }
    jumps[0] = 0
    for (i in 1 until array.size) {
        for (j in 0 until i) {
            if (array[j] >= i - j) {
                jumps[i] = min(jumps[j] + 1, jumps[i])
            }
        }
    }
    return jumps[jumps.size - 1]
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

fun minNumberOfJumps(array: List<Int>): Int {
    if (array.size == 1) {
        return 0
    }
    var jumps = 0
    var maxReach = array[0]
    var steps = array[0]
    for (i in 1 until array.size - 1) {
        maxReach = max(maxReach, i + array[i])
        steps--
        if (steps == 0) {
            jumps++
            steps = maxReach - i
        }
    }
    return jumps + 1
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.minNumberOfJumps

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3)
        val output = minNumberOfJumps(input)
        val expected = 4
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
    let program = Program()
    runTest("Test Case 9") { () throws -> Void in
      let output = program.minNumberOfJumps(array: [3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3])
      try assertEqual(4, output)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(n) space
  func minNumberOfJumps(array: [Int]) -> Int {
    var jumps = Array(repeating: Int.max, count: array.count)

    jumps[0] = 0

    for i in 0 ..< array.count {
      for j in 0 ..< i {
        if array[j] + j >= i {
          jumps[i] = min(jumps[i], jumps[j] + 1)
        }
      }
    }

    return jumps[jumps.count - 1]
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space
  func minNumberOfJumps(array: [Int]) -> Int {
    if array.count == 1 {
      return 0
    }

    var jumps = 0
    var steps = array[0]
    var maximumReach = array[0]

    for i in 1 ..< array.count - 1 {
      maximumReach = max(maximumReach, array[i] + i)

      steps -= 1

      if steps == 0 {
        jumps += 1

        steps = maximumReach - i
      }
    }

    return jumps + 1
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 9") { () throws -> Void in
      let output = program.minNumberOfJumps(array: [3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3])
      try assertEqual(4, output)
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
        self.assertEqual(program.minNumberOfJumps([3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3]), 4)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n) space
def minNumberOfJumps(array):
    jumps = [float("inf") for x in array]
    jumps[0] = 0
    for i in range(1, len(array)):
        for j in range(0, i):
            if array[j] >= i - j:
                jumps[i] = min(jumps[j] + 1, jumps[i])
    return jumps[-1]

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space
def minNumberOfJumps(array):
    if len(array) == 1:
        return 0
    jumps = 0
    maxReach = array[0]
    steps = array[0]
    for i in range(1, len(array) - 1):
        maxReach = max(maxReach, i + array[i])
        steps -= 1
        if steps == 0:
            jumps += 1
            steps = maxReach - i
    return jumps + 1

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.minNumberOfJumps([3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3]), 4)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.minNumberOfJumps([3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3])).to.deep.equal(4);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space
export function minNumberOfJumps(array: number[]) {
  const jumps: number[] = new Array(array.length).fill(Infinity);
  jumps[0] = 0;
  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < i; j++) {
      if (array[j] >= i - j) {
        jumps[i] = Math.min(jumps[j] + 1, jumps[i]);
      }
    }
  }
  return jumps[jumps.length - 1];
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space
export function minNumberOfJumps(array: number[]) {
  if (array.length === 1) return 0;
  let jumps = 0;
  let maxReach = array[0];
  let steps = array[0];
  for (let i = 1; i < array.length - 1; i++) {
    maxReach = Math.max(maxReach, i + array[i]);
    steps--;
    if (steps === 0) {
      jumps++;
      steps = maxReach - i;
    }
  }
  return jumps + 1;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.minNumberOfJumps([3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3])).to.deep.equal(4);
});

```

