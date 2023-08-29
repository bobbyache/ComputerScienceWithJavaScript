# Validate Subsequence
<div class="html">
<p>
  Given two non-empty arrays of integers, write a function that determines
  whether the second array is a subsequence of the first one.
</p>
<p>
  A subsequence of an array is a set of numbers that aren't necessarily adjacent
  in the array but that are in the same order as they appear in the array. For
  instance, the numbers <span>[1, 3, 4]</span> form a subsequence of the array
  <span>[1, 2, 3, 4]</span>, and so do the numbers <span>[2, 4]</span>. Note
  that a single number in an array and the array itself are both valid
  subsequences of the array.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [5, 1, 22, 25, 6, -1, 8, 10]
<span class="CodeEditor-promptParameter">sequence</span> = [1, 6, -1, 10]
</pre>
<h3>Sample Output</h3>
<pre>
true
</pre>
</div>

Hint 1
<p>
You can solve this question by iterating through the main input array once.
</p>


Hint 2

<p>
Iterate through the main array, and look for the first integer in the potential subsequence. If you find that integer, keep on iterating through the main array, but now look for the second integer in the potential subsequence. Continue this process until you either find every integer in the potential subsequence or you reach the end of the main array.
</p>


Hint 3

<p>
To actually implement what Hint #2 describes, you'll have to declare a variable holding your position in the potential subsequence. At first, this position will be the 0th index in the sequence; as you find the sequence's integers in the main array, you'll increment the position variable until you reach the end of the sequence.
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
      vector<int> array = {5, 1, 22, 25, 6, -1, 8, 10};
      vector<int> sequence = {1, 6, -1, 10};
      assert(isValidSubsequence(array, sequence));
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// O(n) time | O(1) space - where n is the length of the array
bool isValidSubsequence(vector<int> array, vector<int> sequence) {
  int arrIdx = 0;
  int seqIdx = 0;
  while (arrIdx < array.size() && seqIdx < sequence.size()) {
    if (array[arrIdx] == sequence[seqIdx]) {
      seqIdx++;
    }
    arrIdx++;
  }
  return seqIdx == sequence.size();
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// O(n) time | O(1) space - where n is the length of the array
bool isValidSubsequence(vector<int> array, vector<int> sequence) {
  int seqIdx = 0;
  for (auto value : array) {
    if (seqIdx == sequence.size())
      break;
    if (sequence[seqIdx] == value)
      seqIdx++;
  }
  return seqIdx == sequence.size();
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> array = {5, 1, 22, 25, 6, -1, 8, 10};
      vector<int> sequence = {1, 6, -1, 10};
      assert(isValidSubsequence(array, sequence));
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

public class ProgramTest {
	[Test]
	public void TestCase1() {
		List<int> array = new List<int> {
			5, 1, 22, 25, 6, -1, 8, 10
		};
		List<int> sequence = new List<int> {
			1, 6, -1, 10
		};
		Utils.AssertTrue(Program.IsValidSubsequence(array, sequence));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n) time | O(1) space - where n is the length of the array
	public static bool IsValidSubsequence(List<int> array, List<int> sequence) {
		int arrIdx = 0;
		int seqIdx = 0;
		while (arrIdx < array.Count && seqIdx < sequence.Count) {
			if (array[arrIdx] == sequence[seqIdx]) {
				seqIdx++;
			}
			arrIdx++;
		}
		return seqIdx == sequence.Count;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n) time | O(1) space - where n is the length of the array
	public static bool IsValidSubsequence(List<int> array, List<int> sequence) {
		int seqIdx = 0;
		foreach (var val in array) {
			if (seqIdx == sequence.Count) {
				break;
			}
			if (sequence[seqIdx] == val) {
				seqIdx++;
			}
		}
		return seqIdx == sequence.Count;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		List<int> array = new List<int> {
			5, 1, 22, 25, 6, -1, 8, 10
		};
		List<int> sequence = new List<int> {
			1, 6, -1, 10
		};
		Utils.AssertTrue(Program.IsValidSubsequence(array, sequence));
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
	array := []int{5, 1, 22, 25, 6, -1, 8, 10}
	sequence := []int{1, 6, -1, 10}
	require.True(t, IsValidSubsequence(array, sequence))
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space
func IsValidSubsequence(array []int, sequence []int) bool {
	arrIdx := 0
	seqIdx := 0
	for arrIdx < len(array) && seqIdx < len(sequence) {
		if array[arrIdx] == sequence[seqIdx] {
			seqIdx += 1
		}
		arrIdx += 1
	}
	return seqIdx == len(sequence)
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space
func IsValidSubsequence(array []int, sequence []int) bool {
	seqIdx := 0
	for _, value := range array {
		if seqIdx == len(sequence) {
			break
		}
		if value == sequence[seqIdx] {
			seqIdx += 1
		}
	}
	return seqIdx == len(sequence)
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	array := []int{5, 1, 22, 25, 6, -1, 8, 10}
	sequence := []int{1, 6, -1, 10}
	require.True(t, IsValidSubsequence(array, sequence))
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
    var array = Arrays.asList(5, 1, 22, 25, 6, -1, 8, 10);
    var sequence = Arrays.asList(1, 6, -1, 10);
    Utils.assertEquals(true, Program.isValidSubsequence(array, sequence));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(1) space - where n is the length of the array
  public static boolean isValidSubsequence(List<Integer> array, List<Integer> sequence) {
    int arrIdx = 0;
    int seqIdx = 0;
    while (arrIdx < array.size() && seqIdx < sequence.size()) {
      if (array.get(arrIdx).equals(sequence.get(seqIdx))) {
        seqIdx++;
      }
      arrIdx++;
    }
    return seqIdx == sequence.size();
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(1) space - where n is the length of the array
  public static boolean isValidSubsequence(List<Integer> array, List<Integer> sequence) {
    int seqIdx = 0;
    for (var value : array) {
      if (seqIdx == sequence.size()) {
        break;
      }
      if (sequence.get(seqIdx).equals(value)) {
        seqIdx++;
      }
    }
    return seqIdx == sequence.size();
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    var array = Arrays.asList(5, 1, 22, 25, 6, -1, 8, 10);
    var sequence = Arrays.asList(1, 6, -1, 10);
    Utils.assertEquals(true, Program.isValidSubsequence(array, sequence));
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
  const array = [5, 1, 22, 25, 6, -1, 8, 10];
  const sequence = [1, 6, -1, 10];
  chai.expect(program.isValidSubsequence(array, sequence)).to.deep.equal(true);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the array
function isValidSubsequence(array, sequence) {
  let arrIdx = 0;
  let seqIdx = 0;
  while (arrIdx < array.length && seqIdx < sequence.length) {
    if (array[arrIdx] === sequence[seqIdx]) seqIdx++;
    arrIdx++;
  }
  return seqIdx === sequence.length;
}

exports.isValidSubsequence = isValidSubsequence;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the array
function isValidSubsequence(array, sequence) {
  let seqIdx = 0;
  for (const value of array) {
    if (seqIdx === sequence.length) break;
    if (sequence[seqIdx] === value) seqIdx++;
  }
  return seqIdx === sequence.length;
}

exports.isValidSubsequence = isValidSubsequence;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const array = [5, 1, 22, 25, 6, -1, 8, 10];
  const sequence = [1, 6, -1, 10];
  chai.expect(program.isValidSubsequence(array, sequence)).to.deep.equal(true);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.isValidSubsequence as isValidSubsequence

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = listOf(5, 1, 22, 25, 6, -1, 8, 10)
        val sequence = listOf(1, 6, -1, 10)
        assert(isValidSubsequence(array, sequence) == true)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(1) space - where n is the length of the array
fun isValidSubsequence(array: List<Int>, sequence: List<Int>): Boolean {
    var arrIdx = 0
    var seqIdx = 0
    while (arrIdx < array.size && seqIdx < sequence.size) {
        if (array[arrIdx] == sequence[seqIdx]) seqIdx++
        arrIdx++
    }
    return seqIdx == sequence.size
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(1) space - where n is the length of the array
fun isValidSubsequence(array: List<Int>, sequence: List<Int>): Boolean {
    var seqIdx = 0
    for (value in array) {
        if (seqIdx == sequence.size) break
        if (sequence[seqIdx] == value) seqIdx++
    }
    return seqIdx == sequence.size
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.isValidSubsequence as isValidSubsequence

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = listOf(5, 1, 22, 25, 6, -1, 8, 10)
        val sequence = listOf(1, 6, -1, 10)
        assert(isValidSubsequence(array, sequence) == true)
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
      let array = [5, 1, 22, 25, 6, -1, 8, 10]
      let sequence = [1, 6, -1, 10]
      try assert(Program.isValidSubsequence(array, sequence))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space
  static func isValidSubsequence(_ array: [Int], _ sequence: [Int]) -> Bool {
    var arrIdx = 0
    var seqIdx = 0
    while arrIdx < array.count, seqIdx < sequence.count {
      if array[arrIdx] == sequence[seqIdx] {
        seqIdx += 1
      }
      arrIdx += 1
    }
    return seqIdx == sequence.count
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space
  static func isValidSubsequence(_ array: [Int], _ sequence: [Int]) -> Bool {
    var seqIdx = 0
    for value in array {
      if seqIdx == sequence.count {
        break
      }
      if value == sequence[seqIdx] {
        seqIdx += 1
      }
    }
    return seqIdx == sequence.count
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let array = [5, 1, 22, 25, 6, -1, 8, 10]
      let sequence = [1, 6, -1, 10]
      try assert(Program.isValidSubsequence(array, sequence))
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
        array = [5, 1, 22, 25, 6, -1, 8, 10]
        sequence = [1, 6, -1, 10]
        self.assertTrue(program.isValidSubsequence(array, sequence))

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space - where n is the length of the array
def isValidSubsequence(array, sequence):
    arrIdx = 0
    seqIdx = 0
    while arrIdx < len(array) and seqIdx < len(sequence):
        if array[arrIdx] == sequence[seqIdx]:
            seqIdx += 1
        arrIdx += 1
    return seqIdx == len(sequence)

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space - where n is the length of the array
def isValidSubsequence(array, sequence):
    seqIdx = 0
    for value in array:
        if seqIdx == len(sequence):
            break
        if sequence[seqIdx] == value:
            seqIdx += 1
    return seqIdx == len(sequence)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        array = [5, 1, 22, 25, 6, -1, 8, 10]
        sequence = [1, 6, -1, 10]
        self.assertTrue(program.isValidSubsequence(array, sequence))

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const array = [5, 1, 22, 25, 6, -1, 8, 10];
  const sequence = [1, 6, -1, 10];
  chai.expect(program.isValidSubsequence(array, sequence)).to.deep.equal(true);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the array
export function isValidSubsequence(array: number[], sequence: number[]) {
  let arrIdx = 0;
  let seqIdx = 0;
  while (arrIdx < array.length && seqIdx < sequence.length) {
    if (array[arrIdx] === sequence[seqIdx]) seqIdx++;
    arrIdx++;
  }
  return seqIdx === sequence.length;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the array
export function isValidSubsequence(array: number[], sequence: number[]) {
  let seqIdx = 0;
  for (const value of array) {
    if (seqIdx === sequence.length) break;
    if (sequence[seqIdx] === value) seqIdx++;
  }
  return seqIdx === sequence.length;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const array = [5, 1, 22, 25, 6, -1, 8, 10];
  const sequence = [1, 6, -1, 10];
  chai.expect(program.isValidSubsequence(array, sequence)).to.deep.equal(true);
});

```

