# Minimum Waiting Time
<div class="html">
<p>
  You're given a non-empty array of positive integers representing the amounts
  of time that specific queries take to execute. Only one query can be executed
  at a time, but the queries can be executed in any order.
</p>
<p>
  A query's <b>waiting time</b> is defined as the amount of time that it must
  wait before its execution starts. In other words, if a query is executed
  second, then its waiting time is the duration of the first query; if a query
  is executed third, then its waiting time is the sum of the durations of the
  first two queries.
</p>
<p>
  Write a function that returns the minimum amount of total waiting time for all
  of the queries. For example, if you're given the queries of durations
  <span>[1, 4, 5]</span>, then the total waiting time if the queries were
  executed in the order of <span>[5, 1, 4]</span> would be
  <span>(0) + (5) + (5 + 1) = 11</span>. The first query of duration
  <span>5</span> would be executed immediately, so its waiting time would be
  <span>0</span>, the second query of duration <span>1</span> would have to wait
  <span>5</span> seconds (the duration of the first query) to be executed, and
  the last query would have to wait the duration of the first two queries before
  being executed.
</p>
<p>Note: you're allowed to mutate the input array.</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">queries</span> = [3, 2, 1, 2, 6]
</pre>
<h3>Sample Output</h3>
<pre>
17
</pre>
</div>

Hint 1
<p>
Even though you don't need to return the actual order in which the queries will be executed to minimize the total waiting time, it's important to determine what this order should be. Start by doing so.
</p>


Hint 2

<p>
Can you solve this problem with constant space? What advantage does being able to mutate the input array provide?
</p>


Hint 3

<p>
Sort the input array in place, and execute the shortest queries in their sorted order. This should allow you to calculate the minimum waiting time. 
</p>


Hint 4

<p>
Create a variable to store the total waiting time, and iterate through the sorted input array. At each iteration, multiply the number of queries left by the duration of the current query, and add that to the total waiting time.
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
      vector<int> queries = {3, 2, 1, 2, 6};
      int expected = 17;
      auto actual = minimumWaitingTime(queries);
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

// O(nlogn) time | O(1) space - where n is the number of queries
int minimumWaitingTime(vector<int> queries) {
  sort(queries.begin(), queries.end());

  int totalWaitingTime = 0;
  for (int idx = 0; idx < queries.size(); idx++) {
    int duration = queries[idx];
    int queriesLeft = queries.size() - (idx + 1);
    totalWaitingTime += duration * queriesLeft;
  }

  return totalWaitingTime;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> queries = {3, 2, 1, 2, 6};
      int expected = 17;
      auto actual = minimumWaitingTime(queries);
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
		int[] queries = new int[] {3, 2, 1, 2, 6};
		int expected = 17;
		var actual = new Program().MinimumWaitingTime(queries);
		Utils.AssertTrue(actual == expected);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Linq;


public class Program {

	// O(nlogn) time | O(1) space - where n is the number of queries
	public int MinimumWaitingTime(int[] queries) {
		Array.Sort(queries);

		int totalWaitingTime = 0;
		for (int idx = 0; idx < queries.Length; idx++) {
			int duration = queries[idx];
			int queriesLeft = queries.Length - (idx + 1);
			totalWaitingTime += duration * queriesLeft;
		}

		return totalWaitingTime;
	}
}


```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] queries = new int[] {3, 2, 1, 2, 6};
		int expected = 17;
		var actual = new Program().MinimumWaitingTime(queries);
		Utils.AssertTrue(actual == expected);
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
	queries := []int{3, 2, 1, 2, 6}
	expected := 17
	actual := MinimumWaitingTime(queries)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"sort"
)

// O(nlogn) time | O(1) space - where n is the number of queries
func MinimumWaitingTime(queries []int) int {
	sort.Ints(queries)

	totalWaitingTime := 0
	for idx, duration := range queries {
		queriesLeft := len(queries) - (idx + 1)
		totalWaitingTime += duration * queriesLeft
	}

	return totalWaitingTime
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	queries := []int{3, 2, 1, 2, 6}
	expected := 17
	actual := MinimumWaitingTime(queries)
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
    int[] queries = new int[] {3, 2, 1, 2, 6};
    int expected = 17;
    var actual = new Program().minimumWaitingTime(queries);
    Utils.assertTrue(actual == expected);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(nlogn) time | O(1) space - where n is the number of queries
  public int minimumWaitingTime(int[] queries) {
    Arrays.sort(queries);

    int totalWaitingTime = 0;
    for (int idx = 0; idx < queries.length; idx++) {
      int duration = queries[idx];
      int queriesLeft = queries.length - (idx + 1);
      totalWaitingTime += duration * queriesLeft;
    }

    return totalWaitingTime;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[] queries = new int[] {3, 2, 1, 2, 6};
    int expected = 17;
    var actual = new Program().minimumWaitingTime(queries);
    Utils.assertTrue(actual == expected);
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
  const queries = [3, 2, 1, 2, 6];
  const expected = 17;
  const actual = program.minimumWaitingTime(queries);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlogn) time | O(1) space - where n is the number of queries
function minimumWaitingTime(queries) {
  queries.sort((a, b) => a - b);

  let totalWaitingTime = 0;
  for (let idx = 0; idx < queries.length; idx++) {
    const duration = queries[idx];
    const queriesLeft = queries.length - (idx + 1);
    totalWaitingTime += duration * queriesLeft;
  }

  return totalWaitingTime;
}

// Do not edit the line below.
exports.minimumWaitingTime = minimumWaitingTime;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const queries = [3, 2, 1, 2, 6];
  const expected = 17;
  const actual = program.minimumWaitingTime(queries);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.minimumWaitingTime

class ProgramTest {
    @Test
    fun TestCase1() {
        val queries = mutableListOf(3, 2, 1, 2, 6)
        val expected = 17
        val output = minimumWaitingTime(queries)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(nlogn) time | O(1) space - where n is the number of queries
fun minimumWaitingTime(queries: MutableList<Int>): Int {
    queries.sort()

    var totalWaitingTime = 0
    for (idx in 0 until queries.size) {
        val duration = queries[idx]
        val queriesLeft = queries.size - (idx + 1)
        totalWaitingTime += duration * queriesLeft
    }

    return totalWaitingTime
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.minimumWaitingTime

class ProgramTest {
    @Test
    fun TestCase1() {
        val queries = mutableListOf(3, 2, 1, 2, 6)
        val expected = 17
        val output = minimumWaitingTime(queries)
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
      var queries = [3, 2, 1, 2, 6]
      var expected = 17
      var actual = Program().minimumWaitingTime(&queries)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nlogn) time | O(1) space - where n is the number of queries
  func minimumWaitingTime(_ queries: inout [Int]) -> Int {
    queries.sort()

    var totalWaitingTime = 0
    for (idx, duration) in queries.enumerated() {
      let queriesLeft = queries.count - (idx + 1)
      totalWaitingTime += duration * queriesLeft
    }

    return totalWaitingTime
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var queries = [3, 2, 1, 2, 6]
      var expected = 17
      var actual = Program().minimumWaitingTime(&queries)
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
        queries = [3, 2, 1, 2, 6]
        expected = 17
        actual = program.minimumWaitingTime(queries)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nlogn) time | O(1) space - where n is the number of queries
def minimumWaitingTime(queries):
    queries.sort()

    totalWaitingTime = 0
    for idx, duration in enumerate(queries):
        queriesLeft = len(queries) - (idx + 1)
        totalWaitingTime += duration * queriesLeft

    return totalWaitingTime

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        queries = [3, 2, 1, 2, 6]
        expected = 17
        actual = program.minimumWaitingTime(queries)
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
  const queries = [3, 2, 1, 2, 6];
  const expected = 17;
  const actual = program.minimumWaitingTime(queries);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlogn) time | O(1) space - where n is the number of queries
export function minimumWaitingTime(queries: number[]) {
  queries.sort((a, b) => a - b);

  let totalWaitingTime = 0;
  for (let idx = 0; idx < queries.length; idx++) {
    const duration = queries[idx];
    const queriesLeft = queries.length - (idx + 1);
    totalWaitingTime += duration * queriesLeft;
  }

  return totalWaitingTime;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const queries = [3, 2, 1, 2, 6];
  const expected = 17;
  const actual = program.minimumWaitingTime(queries);
  chai.expect(actual).to.deep.equal(expected);
});

```

