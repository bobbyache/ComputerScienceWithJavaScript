# Best Seat
<div class="html">
<p>
  You walk into a theatre you're about to see a show in. The usher within the
  theatre walks you to your row and mentions you're allowed to sit anywhere
  within the given row. Naturally you'd like to sit in the seat that gives you
  the most space. You also would prefer this space to be evenly distributed on
  either side of you (e.g. if there are three empty seats in a row, you would
  prefer to sit in the middle of those three seats).
</p>
<p>
  Given the theatre row represented as an integer array, return
  the seat index of where you should sit. Ones represent occupied seats and zeroes
  represent empty seats.
</p>
<p>
  You may assume that someone is always sitting in the
  first and last seat of the row. Whenever there are two equally good seats,
  you should sit in the seat with the lower index. If there is no seat to sit
  in, return -1. The given array will always have a length of at least one
  and contain only ones and zeroes.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">seats</span> = [1, 0, 1, 0, 0, 0, 1]
</pre>
<h3>Sample Output</h3>
<pre>
4
</pre>
</div>

Hint 1
<p>
  Try thinking about this problem in real life. How would you determine what
  seat has the most space?
</p>


Hint 2

<p>
  The best seat will always be within the longest contiguous subarray of all
  zeros.
</p>


Hint 3

<p>Once you find the longest contiguous subarray of empty seats, how can
you choose where to sit within that subarray?</p>


Hint 4

<p>How can you find the midpoint between two people?</p>

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
      vector<int> input = {1, 0, 1, 0, 0, 0, 1};
      auto expected = 4;
      auto actual = bestSeat(input);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// O(n) time | O(1) space - where n is the number of seats
int bestSeat(vector<int> seats) {
  int bestSeat = -1;
  int maxSpace = 0;

  int left = 0;
  while (left < seats.size()) {
    int right = left + 1;
    while (right < seats.size() && seats[right] == 0) {
      right++;
    }

    int availableSpace = right - left - 1;
    if (availableSpace > maxSpace) {
      bestSeat = (left + right) / 2;
      maxSpace = availableSpace;
    }
    left = right;
  }

  return bestSeat;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> input = {1, 0, 1, 0, 0, 0, 1};
      auto expected = 4;
      auto actual = bestSeat(input);
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
		var input = new int[] {1, 0, 1, 0, 0, 0, 1};
		var expected = 4;
		var actual = new Program().BestSeat(input);
		Utils.AssertTrue(expected == actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {
	// O(n) time | O(1) space - where n is the number of seats
	public int BestSeat(int[] seats) {
		int bestSeat = -1;
		int maxSpace = 0;

		int left = 0;
		while (left < seats.Length) {
			int right = left + 1;
			while (right < seats.Length && seats[right] == 0) {
				right++;
			}

			int availableSpace = right - left - 1;
			if (availableSpace > maxSpace) {
				bestSeat = (left + right) / 2;
				maxSpace = availableSpace;
			}
			left = right;
		}

		return bestSeat;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		var input = new int[] {1, 0, 1, 0, 0, 0, 1};
		var expected = 4;
		var actual = new Program().BestSeat(input);
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
	input := []int{1, 0, 1, 0, 0, 0, 1}
	expected := 4
	actual := BestSeat(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space - where n is the number of seats
func BestSeat(seats []int) int {
	bestSeat := -1
	maxSpace := 0

	left := 0
	for left < len(seats) {
		right := left + 1
		for right < len(seats) && seats[right] == 0 {
			right += 1
		}

		availableSpace := right - left - 1
		if availableSpace > maxSpace {
			bestSeat = (left + right) / 2
			maxSpace = availableSpace
		}
		left = right
	}
	return bestSeat
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []int{1, 0, 1, 0, 0, 0, 1}
	expected := 4
	actual := BestSeat(input)
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
    var input = new int[] {1, 0, 1, 0, 0, 0, 1};
    var expected = 4;
    var actual = new Program().bestSeat(input);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(1) space - where n is the number of seats
  public int bestSeat(int[] seats) {
    int bestSeat = -1;
    int maxSpace = 0;

    int left = 0;
    while (left < seats.length) {
      int right = left + 1;
      while (right < seats.length && seats[right] == 0) {
        right++;
      }

      int availableSpace = right - left - 1;
      if (availableSpace > maxSpace) {
        bestSeat = (left + right) / 2;
        maxSpace = availableSpace;
      }
      left = right;
    }

    return bestSeat;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    var input = new int[] {1, 0, 1, 0, 0, 0, 1};
    var expected = 4;
    var actual = new Program().bestSeat(input);
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
  const input = [1, 0, 1, 0, 0, 0, 1];
  const expected = 4;
  const actual = program.bestSeat(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the number of seats
function bestSeat(seats) {
  let bestSeat = -1;
  let maxSpace = 0;

  let left = 0;
  while (left < seats.length) {
    let right = left + 1;
    while (right < seats.length && seats[right] === 0) {
      right += 1;
    }

    const availableSpace = right - left - 1;
    if (availableSpace > maxSpace) {
      bestSeat = Math.floor((left + right) / 2);
      maxSpace = availableSpace;
    }
    left = right;
  }

  return bestSeat;
}

// Do not edit the line below.
exports.bestSeat = bestSeat;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [1, 0, 1, 0, 0, 0, 1];
  const expected = 4;
  const actual = program.bestSeat(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.bestSeat

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(1, 0, 1, 0, 0, 0, 1)
        val expected = 4
        val output = bestSeat(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(1) space - where n is the number of seats
fun bestSeat(seats: MutableList<Int>): Int {
    var bestSeat = -1
    var maxSpace = 0

    var left = 0
    while (left < seats.size) {
        var right = left + 1
        while (right < seats.size && seats[right] == 0) {
            right += 1
        }

        val availableSpace = right - left - 1
        if (availableSpace > maxSpace) {
            bestSeat = (left + right) / 2
            maxSpace = availableSpace
        }
        left = right
    }

    return bestSeat
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.bestSeat

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(1, 0, 1, 0, 0, 0, 1)
        val expected = 4
        val output = bestSeat(input)
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
      var input = [1, 0, 1, 0, 0, 0, 1]
      var expected = 4
      var actual = Program().bestSeat(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the number of seats
  func bestSeat(_ seats: [Int]) -> Int {
    var bestSeat = -1
    var maxSpace = 0

    var left = 0
    while left < seats.count {
      var right = left + 1
      while right < seats.count && seats[right] == 0 {
        right += 1
      }

      let availableSpace = right - left - 1
      if availableSpace > maxSpace {
        bestSeat = (left + right) / 2
        maxSpace = availableSpace
      }
      left = right
    }
    return bestSeat
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws in
      var input = [1, 0, 1, 0, 0, 0, 1]
      var expected = 4
      var actual = Program().bestSeat(input)
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
        input = [1, 0, 1, 0, 0, 0, 1]
        expected = 4
        actual = program.bestSeat(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space - where n is the number of seats
def bestSeat(seats):
    bestSeat = -1
    maxSpace = 0

    left = 0
    while left < len(seats):
        right = left + 1
        while right < len(seats) and seats[right] == 0:
            right += 1

        availableSpace = right - left - 1
        if availableSpace > maxSpace:
            bestSeat = (left + right) // 2
            maxSpace = availableSpace
        left = right

    return bestSeat

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [1, 0, 1, 0, 0, 0, 1]
        expected = 4
        actual = program.bestSeat(input)
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
  const input = [1, 0, 1, 0, 0, 0, 1];
  const expected = 4;
  const actual = program.bestSeat(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the number of seats
export function bestSeat(seats: number[]) {
  let bestSeat = -1;
  let maxSpace = 0;

  let left = 0;
  while (left < seats.length) {
    let right = left + 1;
    while (right < seats.length && seats[right] === 0) {
      right += 1;
    }

    const availableSpace = right - left - 1;
    if (availableSpace > maxSpace) {
      bestSeat = Math.floor((left + right) / 2);
      maxSpace = availableSpace;
    }
    left = right;
  }

  return bestSeat;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [1, 0, 1, 0, 0, 0, 1];
  const expected = 4;
  const actual = program.bestSeat(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

