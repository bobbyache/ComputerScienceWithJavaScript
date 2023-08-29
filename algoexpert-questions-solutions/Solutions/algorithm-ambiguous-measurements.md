# Ambiguous Measurements
<div class="html">
<p>
  This problem deals with measuring cups that are missing important measuring
  labels. Specifically, a measuring cup only has two measuring lines, a Low (L)
  line and a High (H) line. This means that these cups can't precisely measure
  and can only guarantee that the substance poured into them will be between the
  L and H line. For example, you might have a measuring cup that has a Low line
  at <span>400ml</span> and a high line at <span>435ml</span>. This means that
  when you use this measuring cup, you can only be sure that what you're
  measuring is between <span>400ml</span> and <span>435ml</span>.
</p>
<p>
  You're given a list of measuring cups containing their low and high lines as
  well as one <span>low</span> integer and one <span>high</span> integer
  representing a range for a target measurement. Write a function that returns a
  boolean representing whether you can use the cups to accurately measure a
  volume in the specified <span>[low, high]</span> range (the range is
  inclusive).
</p>
<p>Note that:</p>
<ul>
  <li>
    Each measuring cup will be represented by a pair of positive integers
    <span>[L, H]</span>, where <span>0 &lt;= L &lt;= H</span>.
  </li>
  <li>
    You'll always be given at least one measuring cup, and the
    <span>low</span> and <span>high</span> input parameters will always satisfy
    the following constraint: <span>0 &lt;= low &lt;= high</span>.
  </li>
  <li>
    Once you've measured some liquid, it will immediately be transferred to a
    larger bowl that will eventually (possibly) contain the target measurement.
  </li>
  <li>You can't pour the contents of one measuring cup into another cup.</li>
</ul>
<p></p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">measuringCups</span> = [
  [200, 210],
  [450, 465],
  [800, 850],
] 
<span class="CodeEditor-promptParameter">low</span> = 2100
<span class="CodeEditor-promptParameter">high</span> = 2300
</pre>
<h3>Sample Output</h3>
<pre>
true
<span class="CodeEditor-promptComment">// We use cup [450, 465] to measure four volumes:</span>
<span class="CodeEditor-promptComment">// First measurement: Low = 450, High = 465</span>
<span class="CodeEditor-promptComment">// Second measurement: Low = 450 + 450 = 900, High = 465 + 465 = 930</span>
<span class="CodeEditor-promptComment">// Third measurement: Low = 900 + 450 = 1350, High = 930 + 465 = 1395</span>
<span class="CodeEditor-promptComment">// Fourth measurement: Low = 1350 + 450 = 1800, High = 1395 + 465 = 1860</span>

<span class="CodeEditor-promptComment">// Then we use cup [200, 210] to measure two volumes:</span>
<span class="CodeEditor-promptComment">// Fifth measurement: Low = 1800 + 200 = 2000, High = 1860 + 210 = 2070</span>
<span class="CodeEditor-promptComment">// Sixth measurement: Low = 2000 + 200 = 2200, High = 2070 + 210 = 2280</span>

<span class="CodeEditor-promptComment">// We've measured a volume in the range [2200, 2280].</span>
<span class="CodeEditor-promptComment">// This is within our target range, so we return `true`.</span>

<span class="CodeEditor-promptComment">// Note: there are other ways to measure a volume in the target range.</span>
</pre>
</div>

Hint 1
<p>
  Start by considering the last cup that you'll use in your sequence of
  measurements. If it isn't possible to use any of the cups as the last cup,
  then you can't measure the desired volume.
</p>


Hint 2

<p>
  If the cup that you're going to use last has a measuring range of
  <span>[100, 110]</span> and you want to measure in the range of
  <span>[500, 550]</span>, then after you pick this cup as the last cup, you
  need to measure a range of <span>[400, 440]</span>. Now, you can simply pick
  the last cup you'll use to measure this new range. If you continue these
  steps, you'll eventually know if you're able to measure the entire range or
  not.
</p>


Hint 3

<p>
  Hint #2 should give you an idea of how to solve this problem recursively. Try
  every cup as the last cup for the starting range, then recursively try to
  measure the new ranges created after using the selected last cups. If you ever
  reach a point where one cup can measure the entire range, then you're finished
  and you can measure the target range. Try to think of a way to optimize this
  recursive approach, since it might involve a lot of repeated calculations.
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
      vector<vector<int>> cups = {{200, 210}, {450, 465}, {800, 850}};
      int low = 2100;
      int high = 2300;
      auto expected = true;
      auto actual = ambiguousMeasurements(cups, low, high);
      assert(expected == actual);
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

bool canMeasureInRange(vector<vector<int>> &measuringCups, int low, int high,
                       unordered_map<string, bool> &memoization);
string createHashableKey(int low, int high);

// O(low * high * n) time | O(low * high) space - where n is the number of
// measuring cups
bool ambiguousMeasurements(vector<vector<int>> measuringCups, int low,
                           int high) {
  unordered_map<string, bool> memoization;
  return canMeasureInRange(measuringCups, low, high, memoization);
}

bool canMeasureInRange(vector<vector<int>> &measuringCups, int low, int high,
                       unordered_map<string, bool> &memoization) {
  string memoizeKey = createHashableKey(low, high);
  if (memoization.find(memoizeKey) != memoization.end()) {
    return memoization[memoizeKey];
  }

  if (low <= 0 && high <= 0) {
    return false;
  }

  bool canMeasure = false;
  for (auto cup : measuringCups) {
    int cupLow = cup[0];
    int cupHigh = cup[1];
    if (low <= cupLow && cupHigh <= high) {
      canMeasure = true;
      break;
    }

    int newLow = max(0, low - cupLow);
    int newHigh = max(0, high - cupHigh);
    canMeasure = canMeasureInRange(measuringCups, newLow, newHigh, memoization);
    if (canMeasure)
      break;
  }

  memoization[memoizeKey] = canMeasure;
  return canMeasure;
}

string createHashableKey(int low, int high) {
  return to_string(low) + ":" + to_string(high);
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> cups = {{200, 210}, {450, 465}, {800, 850}};
      int low = 2100;
      int high = 2300;
      auto expected = true;
      auto actual = ambiguousMeasurements(cups, low, high);
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
		int[][] cups = new int[][] {
			new int[] { 200, 210 }, new int[] { 450, 465 }, new int[] { 800, 850 }
		};
		int low = 2100;
		int high = 2300;
		bool expected = true;
		var actual = new Program().AmbiguousMeasurements(cups, low, high);
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

	// O(low * high * n) time | O(low * high) space - where n is the number of measuring cups
	public bool AmbiguousMeasurements(int[][] measuringCups, int low, int high) {
		Dictionary<string, bool> memoization = new Dictionary<string, bool>();
		return canMeasureInRange(measuringCups, low, high, memoization);
	}

	public bool canMeasureInRange(int[][] measuringCups, int low, int high, Dictionary<string,
	  bool> memoization) {
		string memoizeKey = createHashableKey(low, high);
		if (memoization.ContainsKey(memoizeKey)) {
			return memoization[memoizeKey];
		}

		if (low <= 0 && high <= 0) {
			return false;
		}

		bool canMeasure = false;
		foreach (var cup in measuringCups) {
			int cupLow = cup[0];
			int cupHigh = cup[1];
			if (low <= cupLow && cupHigh <= high) {
				canMeasure = true;
				break;
			}

			int newLow = Math.Max(0, low - cupLow);
			int newHigh = Math.Max(0, high - cupHigh);
			canMeasure = canMeasureInRange(measuringCups, newLow, newHigh,
			    memoization);
			if (canMeasure) break;
		}

		memoization[memoizeKey] = canMeasure;
		return canMeasure;
	}

	public string createHashableKey(int low, int high) {
		return low.ToString() + ":" + high.ToString();
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[][] cups = new int[][] {
			new int[] { 200, 210 }, new int[] { 450, 465 }, new int[] { 800, 850 }
		};
		int low = 2100;
		int high = 2300;
		bool expected = true;
		var actual = new Program().AmbiguousMeasurements(cups, low, high);
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
	cups := [][]int{
		{200, 210},
		{450, 465},
		{800, 850},
	}
	low := 2100
	high := 2300
	expected := true
	actual := AmbiguousMeasurements(cups, low, high)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"fmt"
)

// O(low * high * n) time | O(low * high) space - where n is the number of measuring cups
func AmbiguousMeasurements(measuringCups [][]int, low int, high int) bool {
	memoization := map[string]bool{}
	return canMeasureInRange(measuringCups, low, high, memoization)
}

func canMeasureInRange(measuringCups [][]int, low, high int, memoization map[string]bool) bool {
	memoizeKey := createHashtableKey(low, high)
	if val, found := memoization[memoizeKey]; found {
		return val
	}

	if low <= 0 && high <= 0 {
		return false
	}

	canMeasure := false
	for _, cup := range measuringCups {
		cupLow, cupHigh := cup[0], cup[1]
		if low <= cupLow && cupHigh <= high {
			canMeasure = true
			break
		}

		newLow := max(0, low-cupLow)
		newHigh := max(0, high-cupHigh)
		canMeasure = canMeasureInRange(measuringCups, newLow, newHigh, memoization)
		if canMeasure {
			break
		}
	}

	memoization[memoizeKey] = canMeasure
	return canMeasure
}

func createHashtableKey(low, high int) string {
	return fmt.Sprintf("%d:%d", low, high)
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
	cups := [][]int{
		{200, 210},
		{450, 465},
		{800, 850},
	}
	low := 2100
	high := 2300
	expected := true
	actual := AmbiguousMeasurements(cups, low, high)
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
    int[][] cups = new int[][] {{200, 210}, {450, 465}, {800, 850}};
    int low = 2100;
    int high = 2300;
    boolean expected = true;
    var actual = new Program().ambiguousMeasurements(cups, low, high);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(low * high * n) time | O(low * high) space - where n is the number of measuring cups
  public boolean ambiguousMeasurements(int[][] measuringCups, int low, int high) {
    HashMap<String, Boolean> memoization = new HashMap<String, Boolean>();
    return canMeasureInRange(measuringCups, low, high, memoization);
  }

  public boolean canMeasureInRange(
      int[][] measuringCups, int low, int high, HashMap<String, Boolean> memoization) {
    String memoizeKey = createHashableKey(low, high);
    if (memoization.containsKey(memoizeKey)) {
      return memoization.get(memoizeKey);
    }

    if (low <= 0 && high <= 0) {
      return false;
    }

    boolean canMeasure = false;
    for (int[] cup : measuringCups) {
      int cupLow = cup[0];
      int cupHigh = cup[1];
      if (low <= cupLow && cupHigh <= high) {
        canMeasure = true;
        break;
      }

      int newLow = Math.max(0, low - cupLow);
      int newHigh = Math.max(0, high - cupHigh);
      canMeasure = canMeasureInRange(measuringCups, newLow, newHigh, memoization);
      if (canMeasure) break;
    }

    memoization.put(memoizeKey, canMeasure);
    return canMeasure;
  }

  public String createHashableKey(int low, int high) {
    return String.valueOf(low) + ":" + String.valueOf(high);
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[][] cups = new int[][] {{200, 210}, {450, 465}, {800, 850}};
    int low = 2100;
    int high = 2300;
    boolean expected = true;
    var actual = new Program().ambiguousMeasurements(cups, low, high);
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
  const cups = [
    [200, 210],
    [450, 465],
    [800, 850],
  ];
  const low = 2100;
  const high = 2300;
  const expected = true;
  const actual = program.ambiguousMeasurements(cups, low, high);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(low * high * n) time | O(low * high) space - where n is
// the number of measuring cups
function ambiguousMeasurements(measuringCups, low, high) {
  const memoization = {};
  return canMeasureInRange(measuringCups, low, high, memoization);
}

function canMeasureInRange(measuringCups, low, high, memoization) {
  const memoizeKey = createHashableKey(low, high);
  if (memoizeKey in memoization) return memoization[memoizeKey];

  if (low <= 0 && high <= 0) return false;

  let canMeasure = false;
  for (const cup of measuringCups) {
    const [cupLow, cupHigh] = cup;
    if (low <= cupLow && cupHigh <= high) {
      canMeasure = true;
      break;
    }

    const newLow = Math.max(0, low - cupLow);
    const newHigh = Math.max(0, high - cupHigh);
    canMeasure = canMeasureInRange(measuringCups, newLow, newHigh, memoization);
    if (canMeasure) break;
  }

  memoization[memoizeKey] = canMeasure;
  return canMeasure;
}

function createHashableKey(low, high) {
  return low.toString() + ':' + high.toString();
}

// Do not edit the line below.
exports.ambiguousMeasurements = ambiguousMeasurements;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const cups = [
    [200, 210],
    [450, 465],
    [800, 850],
  ];
  const low = 2100;
  const high = 2300;
  const expected = true;
  const actual = program.ambiguousMeasurements(cups, low, high);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.ambiguousMeasurements

class ProgramTest {
    @Test
    fun TestCase1() {
        val cups = listOf(
            listOf(200, 210),
            listOf(450, 465),
            listOf(800, 850)
        )
        val low = 2100
        val high = 2300
        val expected = true
        val output = ambiguousMeasurements(cups, low, high)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(low * high * n) time | O(low * high) space - where n is the number of measuring cups
fun ambiguousMeasurements(measuringCups: List<List<Int>>, low: Int, high: Int): Boolean {
    val memoization = mutableMapOf<String, Boolean>()
    return canMeasureInRange(measuringCups, low, high, memoization)
}

fun canMeasureInRange(measuringCups: List<List<Int>>, low: Int, high: Int, memoization: MutableMap<String, Boolean>): Boolean {
    val memoizeKey = createHashableKey(low, high)
    if (memoizeKey in memoization) return memoization[memoizeKey]!!

    if (low <= 0 && high <= 0) return false

    var canMeasure = false
    for (cup in measuringCups) {
        val (cupLow, cupHigh) = cup
        if (low <= cupLow && cupHigh <= high) {
            canMeasure = true
            break
        }

        val newLow = Math.max(0, low - cupLow)
        val newHigh = Math.max(0, high - cupHigh)
        canMeasure = canMeasureInRange(measuringCups, newLow, newHigh, memoization)
        if (canMeasure) break
    }

    memoization[memoizeKey] = canMeasure
    return canMeasure
}

fun createHashableKey(low: Int, high: Int): String {
    return low.toString() + ":" + high.toString()
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.ambiguousMeasurements

class ProgramTest {
    @Test
    fun TestCase1() {
        val cups = listOf(
            listOf(200, 210),
            listOf(450, 465),
            listOf(800, 850)
        )
        val low = 2100
        val high = 2300
        val expected = true
        val output = ambiguousMeasurements(cups, low, high)
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
      let cups = [
        [200, 210],
        [450, 465],
        [800, 850],
      ]
      let low = 2100
      let high = 2300
      let expected = true
      var actual = Program().ambiguousMeasurements(cups, low, high)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(low * high * n) time | O(low * high) space - where n is the number of measuring cups
  func ambiguousMeasurements(_ measuringCups: [[Int]], _ low: Int, _ high: Int) -> Bool {
    var memoization = [String: Bool]()
    return canMeasureInRange(measuringCups, low, high, &memoization)
  }

  func canMeasureInRange(_ measuringCups: [[Int]], _ low: Int, _ high: Int, _ memoization: inout [String: Bool]) -> Bool {
    let memoizeKey = createHashtableKey(low, high)
    if memoization[memoizeKey] != nil {
      return memoization[memoizeKey]!
    }

    if low <= 0, high <= 0 {
      return false
    }

    var canMeasure = false
    for cup in measuringCups {
      let (cupLow, cupHigh) = (cup[0], cup[1])
      if low <= cupLow, cupHigh <= high {
        canMeasure = true
        break
      }

      let newLow = max(0, low - cupLow)
      let newHigh = max(0, high - cupHigh)
      canMeasure = canMeasureInRange(measuringCups, newLow, newHigh, &memoization)
      if canMeasure {
        break
      }
    }

    memoization[memoizeKey] = canMeasure
    return canMeasure
  }

  func createHashtableKey(_ low: Int, _ high: Int) -> String {
    return String(low) + ":" + String(high)
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let cups = [
        [200, 210],
        [450, 465],
        [800, 850],
      ]
      let low = 2100
      let high = 2300
      let expected = true
      var actual = Program().ambiguousMeasurements(cups, low, high)
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
        cups = [[200, 210], [450, 465], [800, 850]]
        low = 2100
        high = 2300
        expected = True
        actual = program.ambiguousMeasurements(cups, low, high)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(low * high * n) time | O(low * high) space - where n is the number of measuring cups
def ambiguousMeasurements(measuringCups, low, high):
    memoization = {}
    return canMeasureInRange(measuringCups, low, high, memoization)


def canMeasureInRange(measuringCups, low, high, memoization):
    memoizeKey = createHashableKey(low, high)
    if memoizeKey in memoization:
        return memoization[memoizeKey]

    if low <= 0 and high <= 0:
        return False

    canMeasure = False
    for cup in measuringCups:
        cupLow, cupHigh = cup
        if low <= cupLow and cupHigh <= high:
            canMeasure = True
            break

        newLow = max(0, low - cupLow)
        newHigh = max(0, high - cupHigh)
        canMeasure = canMeasureInRange(measuringCups, newLow, newHigh, memoization)
        if canMeasure:
            break

    memoization[memoizeKey] = canMeasure
    return canMeasure


def createHashableKey(low, high):
    return str(low) + ":" + str(high)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        cups = [[200, 210], [450, 465], [800, 850]]
        low = 2100
        high = 2300
        expected = True
        actual = program.ambiguousMeasurements(cups, low, high)
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
  const cups = [
    [200, 210],
    [450, 465],
    [800, 850],
  ];
  const low = 2100;
  const high = 2300;
  const expected = true;
  const actual = program.ambiguousMeasurements(cups, low, high);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(low * high * n) time | O(low * high) space - where n is
// the number of measuring cups
export function ambiguousMeasurements(measuringCups: number[][], low: number, high: number) {
  const memoization: {[key: string]: boolean} = {};
  return canMeasureInRange(measuringCups, low, high, memoization);
}

function canMeasureInRange(
  measuringCups: number[][],
  low: number,
  high: number,
  memoization: {[key: string]: boolean},
): boolean {
  const memoizeKey = createHashableKey(low, high);
  if (memoizeKey in memoization) return memoization[memoizeKey];

  if (low <= 0 && high <= 0) return false;

  let canMeasure = false;
  for (const cup of measuringCups) {
    const [cupLow, cupHigh] = cup;
    if (low <= cupLow && cupHigh <= high) {
      canMeasure = true;
      break;
    }

    const newLow = Math.max(0, low - cupLow);
    const newHigh = Math.max(0, high - cupHigh);
    canMeasure = canMeasureInRange(measuringCups, newLow, newHigh, memoization);
    if (canMeasure) break;
  }

  memoization[memoizeKey] = canMeasure;
  return canMeasure;
}

function createHashableKey(low: number, high: number) {
  return low.toString() + ':' + high.toString();
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const cups = [
    [200, 210],
    [450, 465],
    [800, 850],
  ];
  const low = 2100;
  const high = 2300;
  const expected = true;
  const actual = program.ambiguousMeasurements(cups, low, high);
  chai.expect(actual).to.deep.equal(expected);
});

```

