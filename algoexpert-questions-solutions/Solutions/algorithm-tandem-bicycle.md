# Tandem Bicycle
<div class="html">
<p>
  A tandem bicycle is a bicycle that's operated by two people: person A and
  person B. Both people pedal the bicycle, but the person that pedals faster
  dictates the speed of the bicycle. So if person A pedals at a speed of
  <span>5</span>, and person B pedals at a speed of <span>4</span>, the tandem
  bicycle moves at a speed of <span>5</span> (i.e.,
  <span>tandemSpeed = max(speedA, speedB)</span>).
</p>
<p>
  You're given two lists of positive integers: one that contains the speeds of
  riders wearing red shirts and one that contains the speeds of riders wearing
  blue shirts. Each rider is represented by a single positive integer, which is
  the speed that they pedal a tandem bicycle at. Both lists have the same
  length, meaning that there are as many red-shirt riders as there are
  blue-shirt riders. Your goal is to pair every rider wearing a red shirt with a
  rider wearing a blue shirt to operate a tandem bicycle.
</p>
<p>
  Write a function that returns the maximum possible total speed or the minimum
  possible total speed of all of the tandem bicycles being ridden based on an
  input parameter, <span>fastest</span>. If <span>fastest = true</span>, your
  function should return the maximum possible total speed; otherwise it should
  return the minimum total speed.
</p>
<p>
  "Total speed" is defined as the sum of the speeds of all the tandem bicycles
  being ridden. For example, if there are 4 riders (2 red-shirt riders and 2
  blue-shirt riders) who have speeds of <span>1, 3, 4, 5</span>, and if they're
  paired on tandem bicycles as follows: <span>[1, 4], [5, 3]</span>, then the
  total speed of these tandem bicycles is <span>4 + 5 = 9</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">redShirtSpeeds</span> = [5, 5, 3, 9, 2]
<span class="CodeEditor-promptParameter">blueShirtSpeeds</span> = [3, 6, 7, 2, 1] 
<span class="CodeEditor-promptParameter">fastest</span> = true
</pre>
<h3>Sample Output</h3>
<pre>
32
</pre>
</div>

Hint 1
<p>
  The brute-force approach to solve this problem is to generate every possible
  set of pairs of riders and to determine the total speed that each of these
  sets generates. This solution does work but, it isn't optimal. Can you think
  of a better way to solve this problem?
</p>


Hint 2

<p>
  Try looking at the input arrays in sorted order. How might this help you solve
  the problem?
</p>


Hint 3

<p>
  When generating the maximum total speed, you want to pair the slowest
  red-shirt riders with the fastest blue-shirt riders and vice versa, so as to
  always take advantage of the largest speeds. When generating the minimum total
  speed, you want to pair the fastest red-shirt riders with the fastest
  blue-shirt riders, so as to "eliminate" a large speed by pairing it with a
  another large (larger) speed.
</p>


Hint 4

<p>
  Sort the input arrays in place, and follow the strategy discussed in Hint #3.
  With the inputs sorted, you can find the slowest and largest speeds from each
  shirt color in constant time.
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
      auto redShirtSpeeds = {5, 5, 3, 9, 2};
      auto blueShirtSpeeds = {3, 6, 7, 2, 1};
      auto fastest = true;
      auto expected = 32;
      auto actual = tandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest);
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

void reverseArrayInPlace(vector<int> &array);

// O(nlog(n)) time | O(1) space - where n is the number of tandem bicycles
int tandemBicycle(vector<int> redShirtSpeeds, vector<int> blueShirtSpeeds,
                  bool fastest) {
  sort(redShirtSpeeds.begin(), redShirtSpeeds.end());
  sort(blueShirtSpeeds.begin(), blueShirtSpeeds.end());

  if (!fastest)
    reverseArrayInPlace(redShirtSpeeds);

  int totalSpeed = 0;
  for (int idx = 0; idx < redShirtSpeeds.size(); idx++) {
    int rider1 = redShirtSpeeds[idx];
    int rider2 = blueShirtSpeeds[blueShirtSpeeds.size() - idx - 1];
    totalSpeed += max(rider1, rider2);
  }

  return totalSpeed;
}

void reverseArrayInPlace(vector<int> &array) {
  int start = 0;
  int end = array.size() - 1;
  while (start < end) {
    int temp = array[start];
    array[start] = array[end];
    array[end] = temp;
    start++;
    end--;
  }
}
```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      auto redShirtSpeeds = {5, 5, 3, 9, 2};
      auto blueShirtSpeeds = {3, 6, 7, 2, 1};
      auto fastest = true;
      auto expected = 32;
      auto actual = tandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest);
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
		int[] redShirtSpeeds = new int[] { 5, 5, 3, 9, 2 };
		int[] blueShirtSpeeds = new int[] { 3, 6, 7, 2, 1 };
		bool fastest = true;
		int expected = 32;
		var actual = new Program().TandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest);
		Utils.AssertTrue(expected == actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	// O(nlog(n)) time | O(1) space - where n is the number of tandem bicycles
	public int TandemBicycle(int[] redShirtSpeeds, int[] blueShirtSpeeds, bool fastest) {
		Array.Sort(redShirtSpeeds);
		Array.Sort(blueShirtSpeeds);

		if (!fastest) {
			reverseArrayInPlace(redShirtSpeeds);
		}

		int totalSpeed = 0;
		for (int idx = 0; idx < redShirtSpeeds.Length; idx++) {
			int rider1 = redShirtSpeeds[idx];
			int rider2 = blueShirtSpeeds[blueShirtSpeeds.Length - idx - 1];
			totalSpeed += Math.Max(rider1, rider2);
		}

		return totalSpeed;
	}

	public void reverseArrayInPlace(int[] array) {
		int start = 0;
		int end = array.Length - 1;
		while (start < end) {
			int temp = array[start];
			array[start] = array[end];
			array[end] = temp;
			start += 1;
			end -= 1;
		}
	}
}
```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] redShirtSpeeds = new int[] { 5, 5, 3, 9, 2 };
		int[] blueShirtSpeeds = new int[] { 3, 6, 7, 2, 1 };
		bool fastest = true;
		int expected = 32;
		var actual = new Program().TandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest);
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
	redShirtSpeeds := []int{5, 5, 3, 9, 2}
	blueShirtSpeeds := []int{3, 6, 7, 2, 1}
	fastest := true
	expected := 32
	actual := TandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest)
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

// O(nlog(n)) time | O(1) space - where n is the number of tandem bicycles
func TandemBicycle(redShirtSpeeds []int, blueShirtSpeeds []int, fastest bool) int {
	sort.Ints(redShirtSpeeds)
	sort.Ints(blueShirtSpeeds)

	if !fastest {
		reverseArrayInPlace(redShirtSpeeds)
	}

	totalSpeed := 0
	for idx := range redShirtSpeeds {
		rider1 := redShirtSpeeds[idx]
		rider2 := blueShirtSpeeds[len(blueShirtSpeeds)-idx-1]
		totalSpeed += max(rider1, rider2)
	}
	return totalSpeed
}

func reverseArrayInPlace(array []int) {
	var start = 0
	var end = len(array) - 1
	for start < end {
		temp := array[start]
		array[start] = array[end]
		array[end] = temp
		start += 1
		end -= 1
	}
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
	redShirtSpeeds := []int{5, 5, 3, 9, 2}
	blueShirtSpeeds := []int{3, 6, 7, 2, 1}
	fastest := true
	expected := 32
	actual := TandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest)
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
    int[] redShirtSpeeds = new int[] {5, 5, 3, 9, 2};
    int[] blueShirtSpeeds = new int[] {3, 6, 7, 2, 1};
    boolean fastest = true;
    int expected = 32;
    var actual = new Program().tandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(nlog(n)) time | O(1) space - where n is the number of tandem bicycles
  public int tandemBicycle(int[] redShirtSpeeds, int[] blueShirtSpeeds, boolean fastest) {
    Arrays.sort(redShirtSpeeds);
    Arrays.sort(blueShirtSpeeds);

    if (!fastest) {
      reverseArrayInPlace(redShirtSpeeds);
    }

    int totalSpeed = 0;
    for (int idx = 0; idx < redShirtSpeeds.length; idx++) {
      int rider1 = redShirtSpeeds[idx];
      int rider2 = blueShirtSpeeds[blueShirtSpeeds.length - idx - 1];
      totalSpeed += Math.max(rider1, rider2);
    }

    return totalSpeed;
  }

  public void reverseArrayInPlace(int[] array) {
    int start = 0;
    int end = array.length - 1;
    while (start < end) {
      int temp = array[start];
      array[start] = array[end];
      array[end] = temp;
      start += 1;
      end -= 1;
    }
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[] redShirtSpeeds = new int[] {5, 5, 3, 9, 2};
    int[] blueShirtSpeeds = new int[] {3, 6, 7, 2, 1};
    boolean fastest = true;
    int expected = 32;
    var actual = new Program().tandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest);
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
  const redShirtSpeeds = [5, 5, 3, 9, 2];
  const blueShirtSpeeds = [3, 6, 7, 2, 1];
  const fastest = true;
  const expected = 32;
  const actual = program.tandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlog(n)) time | O(1) space - where n is the number of tandem bicycles
function tandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest) {
  redShirtSpeeds.sort((a, b) => a - b);
  blueShirtSpeeds.sort((a, b) => a - b);

  if (!fastest) reverseArrayInPlace(redShirtSpeeds);

  let totalSpeed = 0;
  for (let idx = 0; idx < redShirtSpeeds.length; idx++) {
    const rider1 = redShirtSpeeds[idx];
    const rider2 = blueShirtSpeeds[blueShirtSpeeds.length - idx - 1];
    totalSpeed += Math.max(rider1, rider2);
  }

  return totalSpeed;
}

function reverseArrayInPlace(array) {
  let start = 0;
  let end = array.length - 1;
  while (start < end) {
    const temp = array[start];
    array[start] = array[end];
    array[end] = temp;
    start++;
    end--;
  }
}

// Do not edit the line below.
exports.tandemBicycle = tandemBicycle;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const redShirtSpeeds = [5, 5, 3, 9, 2];
  const blueShirtSpeeds = [3, 6, 7, 2, 1];
  const fastest = true;
  const expected = 32;
  const actual = program.tandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.tandemBicycle

class ProgramTest {
    @Test
    fun TestCase1() {
        val redShirtSpeeds = mutableListOf(5, 5, 3, 9, 2)
        val blueShirtSpeeds = mutableListOf(3, 6, 7, 2, 1)
        val fastest = true
        val expected = 32
        val output = tandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(nlog(n)) time | O(1) space - where n is the number of tandem bicycles
fun tandemBicycle(redShirtSpeeds: MutableList<Int>, blueShirtSpeeds: MutableList<Int>, fastest: Boolean): Int {
    redShirtSpeeds.sort()
    blueShirtSpeeds.sort()

    if (!fastest) reverseArrayInPlace(redShirtSpeeds)

    var totalSpeed = 0
    for (idx in 0 until redShirtSpeeds.size) {
        val rider1 = redShirtSpeeds[idx]
        val rider2 = blueShirtSpeeds[blueShirtSpeeds.size - idx - 1]
        totalSpeed += max(rider1, rider2)
    }

    return totalSpeed
}

fun reverseArrayInPlace(array: MutableList<Int>) {
    var start = 0
    var end = array.size - 1
    while (start < end) {
        val temp = array[start]
        array[start] = array[end]
        array[end] = temp
        start += 1
        end -= 1
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.tandemBicycle

class ProgramTest {
    @Test
    fun TestCase1() {
        val redShirtSpeeds = mutableListOf(5, 5, 3, 9, 2)
        val blueShirtSpeeds = mutableListOf(3, 6, 7, 2, 1)
        val fastest = true
        val expected = 32
        val output = tandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest)
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
      var redShirtSpeeds = [5, 5, 3, 9, 2]
      var blueShirtSpeeds = [3, 6, 7, 2, 1]
      var fastest = true
      var expected = 32
      var actual = Program().tandemBicycle(&redShirtSpeeds, &blueShirtSpeeds, fastest)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nlog(n)) time | O(1) space - where n is the number of tandem bicycles
  func tandemBicycle(_ redShirtSpeeds: inout [Int], _ blueShirtSpeeds: inout [Int], _ fastest: Bool) -> Int {
    redShirtSpeeds.sort()
    blueShirtSpeeds.sort()

    if !fastest {
      reverseArrayInPlace(&redShirtSpeeds)
    }

    var totalSpeed = 0
    for idx in 0 ..< redShirtSpeeds.count {
      let rider1 = redShirtSpeeds[idx]
      let rider2 = blueShirtSpeeds[blueShirtSpeeds.count - idx - 1]
      totalSpeed += max(rider1, rider2)
    }
    return totalSpeed
  }

  func reverseArrayInPlace(_ array: inout [Int]) {
    var start = 0
    var end = array.count - 1
    while start < end {
      let temp = array[start]
      array[start] = array[end]
      array[end] = temp
      start += 1
      end -= 1
    }
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var redShirtSpeeds = [5, 5, 3, 9, 2]
      var blueShirtSpeeds = [3, 6, 7, 2, 1]
      var fastest = true
      var expected = 32
      var actual = Program().tandemBicycle(&redShirtSpeeds, &blueShirtSpeeds, fastest)
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
        redShirtSpeeds = [5, 5, 3, 9, 2]
        blueShirtSpeeds = [3, 6, 7, 2, 1]
        fastest = True
        expected = 32
        actual = program.tandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nlog(n)) time | O(1) space - where n is the number of tandem bicycles
def tandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest):
    redShirtSpeeds.sort()
    blueShirtSpeeds.sort()

    if not fastest:
        reverseArrayInPlace(redShirtSpeeds)

    totalSpeed = 0
    for idx in range(len(redShirtSpeeds)):
        rider1 = redShirtSpeeds[idx]
        rider2 = blueShirtSpeeds[len(blueShirtSpeeds) - idx - 1]
        totalSpeed += max(rider1, rider2)

    return totalSpeed


def reverseArrayInPlace(array):
    start = 0
    end = len(array) - 1
    while start < end:
        array[start], array[end] = array[end], array[start]
        start += 1
        end -= 1

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        redShirtSpeeds = [5, 5, 3, 9, 2]
        blueShirtSpeeds = [3, 6, 7, 2, 1]
        fastest = True
        expected = 32
        actual = program.tandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest)
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
  const redShirtSpeeds = [5, 5, 3, 9, 2];
  const blueShirtSpeeds = [3, 6, 7, 2, 1];
  const fastest = true;
  const expected = 32;
  const actual = program.tandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlog(n)) time | O(1) space - where n is the number of tandem bicycles
export function tandemBicycle(redShirtSpeeds: number[], blueShirtSpeeds: number[], fastest: boolean) {
  redShirtSpeeds.sort((a, b) => a - b);
  blueShirtSpeeds.sort((a, b) => a - b);

  if (!fastest) reverseArrayInPlace(redShirtSpeeds);

  let totalSpeed = 0;
  for (let idx = 0; idx < redShirtSpeeds.length; idx++) {
    const rider1 = redShirtSpeeds[idx];
    const rider2 = blueShirtSpeeds[blueShirtSpeeds.length - idx - 1];
    totalSpeed += Math.max(rider1, rider2);
  }

  return totalSpeed;
}

function reverseArrayInPlace(array: number[]) {
  let start = 0;
  let end = array.length - 1;
  while (start < end) {
    const temp = array[start];
    array[start] = array[end];
    array[end] = temp;
    start++;
    end--;
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const redShirtSpeeds = [5, 5, 3, 9, 2];
  const blueShirtSpeeds = [3, 6, 7, 2, 1];
  const fastest = true;
  const expected = 32;
  const actual = program.tandemBicycle(redShirtSpeeds, blueShirtSpeeds, fastest);
  chai.expect(actual).to.deep.equal(expected);
});

```

