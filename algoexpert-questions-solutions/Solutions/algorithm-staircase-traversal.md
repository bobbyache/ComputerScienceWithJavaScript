# Staircase Traversal
<div class="html">
<p>
  You're given two positive integers representing the height of a staircase and
  the maximum number of steps that you can advance up the staircase at a time.
  Write a function that returns the number of ways in which you can climb the
  staircase.
</p>
<p>
  For example, if you were given a staircase of <span>height = 3</span> and
  <span>maxSteps = 2</span> you could climb the staircase in 3 ways. You could
  take <b>1 step, 1 step, then 1 step</b>, you could also take
  <b>1 step, then 2 steps</b>, and you could take <b>2 steps, then 1 step</b>.
</p>
<p>Note that <span>maxSteps &lt;= height</span> will always be true.</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">height</span> = 4
<span class="CodeEditor-promptParameter">maxSteps</span> = 2
</pre>
<h3>Sample Output</h3>
<pre>
5
<span class="CodeEditor-promptComment">// You can climb the staircase in the following ways: </span>
<span class="CodeEditor-promptComment">// 1, 1, 1, 1</span>
<span class="CodeEditor-promptComment">// 1, 1, 2</span>
<span class="CodeEditor-promptComment">// 1, 2, 1</span>
<span class="CodeEditor-promptComment">// 2, 1, 1</span>
<span class="CodeEditor-promptComment">// 2, 2</span>
</pre>
</div>

Hint 1
<p>
  If you can advance <span>2</span> steps at a time, how many ways can you reach
  a staircase of height <span>1</span> and of height <span>2</span>? Think
  recursively.
</p>


Hint 2

<p>
  Continuing from Hint #1, if you know the number of ways to climb a staircase
  of height <span>1</span> and of height <span>2</span>, how many ways are there
  to climb a staircase of height <span>3</span> (assuming the same max steps of
  <span>2</span>)?
</p>


Hint 3

<p>
  The number of ways to climb a staircase of height <span>k</span> with a max
  number of steps <span>s</span> is:
  <span>numWays[k - 1] + numWays[k - 2] + ... + numWays[k - s]</span>. This is
  because if you can advance between <span>1</span> and <span>s</span> steps,
  then from each step <span>k - 1, k - 2, ..., k - s</span>, you can directly
  advance to the top of a staircase of height <span>k</span>. By adding the
  number of ways to reach all steps that you can directly advance to the top
  step from, you determine how many ways there are to reach the top step.
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
      auto stairs = 4;
      auto maxSteps = 2;
      auto expected = 5;
      auto actual = staircaseTraversal(stairs, maxSteps);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <algorithm>
using namespace std;

int numberOfWaysToTop(int height, int maxSteps);

// O(k^n) time | O(n) space - where n is the height of the staircase and k is
// the number of allowed steps
int staircaseTraversal(int height, int maxSteps) {
  return numberOfWaysToTop(height, maxSteps);
}

int numberOfWaysToTop(int height, int maxSteps) {
  if (height <= 1)
    return 1;

  int numberOfWays = 0;
  for (int step = 1; step < min(maxSteps, height) + 1; step++) {
    numberOfWays += numberOfWaysToTop(height - step, maxSteps);
  }

  return numberOfWays;
}
```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <unordered_map>
#include <algorithm>
using namespace std;

int numberOfWaysToTop(int height, int maxSteps,
                      unordered_map<int, int> &memoize);

// O(n * k) time | O(n) space - where n is the height of the staircase and k is
// the number of allowed steps
int staircaseTraversal(int height, int maxSteps) {
  unordered_map<int, int> memoize = {{0, 1}, {1, 1}};
  return numberOfWaysToTop(height, maxSteps, memoize);
}

int numberOfWaysToTop(int height, int maxSteps,
                      unordered_map<int, int> &memoize) {
  if (memoize.find(height) != memoize.end())
    return memoize[height];

  int numberOfWays = 0;
  for (int step = 1; step < min(maxSteps, height) + 1; step++) {
    numberOfWays += numberOfWaysToTop(height - step, maxSteps, memoize);
  }

  memoize[height] = numberOfWays;

  return numberOfWays;
}
```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

// O(n * k) time | O(n) space - where n is the height of the staircase and k is
// the number of allowed steps
int staircaseTraversal(int height, int maxSteps) {
  vector<int> waysToTop(height + 1, 0);
  waysToTop[0] = 1;
  waysToTop[1] = 1;

  for (int currentHeight = 2; currentHeight < height + 1; currentHeight++) {
    int step = 1;
    while (step <= maxSteps && step <= currentHeight) {
      waysToTop[currentHeight] =
          waysToTop[currentHeight] + waysToTop[currentHeight - step];
      step++;
    }
  }

  return waysToTop[height];
}
```
### Solution 4 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

// O(n) time | O(n) space - where n is the height of the staircase
int staircaseTraversal(int height, int maxSteps) {
  int currentNumberOfWays = 0;
  vector<int> waysToTop = {1};

  for (int currentHeight = 1; currentHeight < height + 1; currentHeight++) {
    int startOfWindow = currentHeight - maxSteps - 1;
    int endOfWindow = currentHeight - 1;
    if (startOfWindow >= 0)
      currentNumberOfWays -= waysToTop[startOfWindow];

    currentNumberOfWays += waysToTop[endOfWindow];
    waysToTop.push_back(currentNumberOfWays);
  }

  return waysToTop[height];
}
```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      auto stairs = 4;
      auto maxSteps = 2;
      auto expected = 5;
      auto actual = staircaseTraversal(stairs, maxSteps);
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
		int stairs = 4;
		int maxSteps = 2;
		int expected = 5;
		int actual = new Program().StaircaseTraversal(stairs, maxSteps);
		Utils.AssertTrue(expected == actual);
	}
}
```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	// O(k^n) time | O(n) space - where n is the height of the staircase and k is the number of allowed steps
	public int StaircaseTraversal(int height, int maxSteps) {
		return numberOfWaysToTop(height, maxSteps);
	}

	public int numberOfWaysToTop(int height, int maxSteps) {
		if (height <= 1) {
			return 1;
		}

		int numberOfWays = 0;
		for (int step = 1; step < Math.Min(maxSteps, height) + 1; step++) {
			numberOfWays += numberOfWaysToTop(height - step, maxSteps);
		}

		return numberOfWays;
	}
}


```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {

	// O(n * k) time | O(n) space - where n is the height of the staircase and k is the number of allowed steps
	public int StaircaseTraversal(int height, int maxSteps) {
		Dictionary<int, int> memoize = new Dictionary<int, int>();
		memoize[0] = 1;
		memoize[1] = 1;
		return numberOfWaysToTop(height, maxSteps, memoize);
	}

	public int numberOfWaysToTop(int height, int maxSteps, Dictionary<int, int> memoize) {
		if (memoize.ContainsKey(height)) {
			return memoize[height];
		}

		int numberOfWays = 0;
		for (int step = 1; step < Math.Min(maxSteps, height) + 1; step++) {
			numberOfWays += numberOfWaysToTop(height - step, maxSteps, memoize);
		}

		memoize[height] = numberOfWays;

		return numberOfWays;
	}
}


```
### Solution 3 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	// O(n * k) time | O(n) space - where n is the height of the staircase and k is the number of allowed steps
	public int StaircaseTraversal(int height, int maxSteps) {
		int[] waysToTop = new int[height + 1];
		waysToTop[0] = 1;
		waysToTop[1] = 1;

		for (int currentHeight = 2; currentHeight < height + 1; currentHeight++) {
			int step = 1;
			while (step <= maxSteps && step <= currentHeight) {
				waysToTop[currentHeight] = waysToTop[currentHeight] +
				  waysToTop[currentHeight - step];
				step += 1;
			}
		}

		return waysToTop[height];
	}
}

```
### Solution 4 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {

	// O(n) time | O(n) space - where n is the height of the staircase
	public int StaircaseTraversal(int height, int maxSteps) {
		int currentNumberOfWays = 0;
		List<int> waysToTop = new List<int>();
		waysToTop.Add(1);

		for (int currentHeight = 1; currentHeight < height + 1; currentHeight++) {
			int startOfWindow = currentHeight - maxSteps - 1;
			int endOfWindow = currentHeight - 1;

			if (startOfWindow >= 0) {
				currentNumberOfWays -= waysToTop[startOfWindow];
			}

			currentNumberOfWays += waysToTop[endOfWindow];
			waysToTop.Add(currentNumberOfWays);
		}

		return waysToTop[height];
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int stairs = 4;
		int maxSteps = 2;
		int expected = 5;
		int actual = new Program().StaircaseTraversal(stairs, maxSteps);
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
	stairs := 4
	maxSteps := 2
	expected := 5
	actual := StaircaseTraversal(stairs, maxSteps)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(k^n) time | O(n) space - where n is the height of the staircase and k is the number of allowed steps
func StaircaseTraversal(height int, maxSteps int) int {
	return numberOfWaysToTop(height, maxSteps)
}

func numberOfWaysToTop(height int, maxSteps int) int {
	if height <= 1 {
		return 1
	}

	var numberOfWays = 0
	for step := 1; step < min(maxSteps, height)+1; step++ {
		numberOfWays += numberOfWaysToTop(height-step, maxSteps)
	}

	return numberOfWays
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

// O(n * k) time | O(n) space - where n is the height of the staircase and k is the number of allowed steps
func StaircaseTraversal(height int, maxSteps int) int {
	return numberOfWaysToTop(height, maxSteps, map[int]int{0: 1, 1: 1})
}

func numberOfWaysToTop(height int, maxSteps int, memoize map[int]int) int {
	if ways, found := memoize[height]; found {
		return ways
	}

	var numberOfWays = 0
	for step := 1; step < min(maxSteps, height)+1; step++ {
		numberOfWays += numberOfWaysToTop(height-step, maxSteps, memoize)
	}
	memoize[height] = numberOfWays

	return numberOfWays
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n * k) time | O(n) space - where n is the height of the staircase and k is the number of allowed steps
func StaircaseTraversal(height int, maxSteps int) int {
	waysToTop := make([]int, height+1)
	waysToTop[0] = 1
	waysToTop[1] = 1

	for currentHeight := 2; currentHeight < height+1; currentHeight++ {
		var step = 1
		for step <= maxSteps && step <= currentHeight {
			waysToTop[currentHeight] = waysToTop[currentHeight] + waysToTop[currentHeight-step]
			step += 1
		}
	}

	return waysToTop[height]
}

```
### Solution 4 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space - where n is the height of the staircase
func StaircaseTraversal(height int, maxSteps int) int {
	currentNumberOfWays := 0
	waysToTop := []int{1}

	for currentHeight := 1; currentHeight < height+1; currentHeight++ {
		startOfWindow := currentHeight - maxSteps - 1
		endOfWindow := currentHeight - 1
		if startOfWindow >= 0 {
			currentNumberOfWays -= waysToTop[startOfWindow]
		}

		currentNumberOfWays += waysToTop[endOfWindow]
		waysToTop = append(waysToTop, currentNumberOfWays)
	}

	return waysToTop[height]
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	stairs := 4
	maxSteps := 2
	expected := 5
	actual := StaircaseTraversal(stairs, maxSteps)
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
    int stairs = 4;
    int maxSteps = 2;
    int expected = 5;
    int actual = new Program().staircaseTraversal(stairs, maxSteps);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(k^n) time | O(n) space - where n is the height of the staircase and k is the number of
  // allowed steps
  public int staircaseTraversal(int height, int maxSteps) {
    return numberOfWaysToTop(height, maxSteps);
  }

  public int numberOfWaysToTop(int height, int maxSteps) {
    if (height <= 1) {
      return 1;
    }

    int numberOfWays = 0;
    for (int step = 1; step < Math.min(maxSteps, height) + 1; step++) {
      numberOfWays += numberOfWaysToTop(height - step, maxSteps);
    }

    return numberOfWays;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n * k) time | O(n) space - where n is the height of the staircase and k is the number of
  // allowed steps
  public int staircaseTraversal(int height, int maxSteps) {
    HashMap<Integer, Integer> memoize = new HashMap<Integer, Integer>();
    memoize.put(0, 1);
    memoize.put(1, 1);
    return numberOfWaysToTop(height, maxSteps, memoize);
  }

  public int numberOfWaysToTop(int height, int maxSteps, HashMap<Integer, Integer> memoize) {
    if (memoize.containsKey(height)) {
      return memoize.get(height);
    }

    int numberOfWays = 0;
    for (int step = 1; step < Math.min(maxSteps, height) + 1; step++) {
      numberOfWays += numberOfWaysToTop(height - step, maxSteps, memoize);
    }

    memoize.put(height, numberOfWays);

    return numberOfWays;
  }
}

```
### Solution 3 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n * k) time | O(n) space - where n is the height of the staircase and k is the number of
  // allowed steps
  public int staircaseTraversal(int height, int maxSteps) {
    int[] waysToTop = new int[height + 1];
    waysToTop[0] = 1;
    waysToTop[1] = 1;

    for (int currentHeight = 2; currentHeight < height + 1; currentHeight++) {
      int step = 1;
      while (step <= maxSteps && step <= currentHeight) {
        waysToTop[currentHeight] = waysToTop[currentHeight] + waysToTop[currentHeight - step];
        step += 1;
      }
    }

    return waysToTop[height];
  }
}

```
### Solution 4 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n) time | O(n) space - where n is the height of the staircase
  public int staircaseTraversal(int height, int maxSteps) {
    int currentNumberOfWays = 0;
    ArrayList<Integer> waysToTop = new ArrayList<Integer>();
    waysToTop.add(1);

    for (int currentHeight = 1; currentHeight < height + 1; currentHeight++) {
      int startOfWindow = currentHeight - maxSteps - 1;
      int endOfWindow = currentHeight - 1;

      if (startOfWindow >= 0) {
        currentNumberOfWays -= waysToTop.get(startOfWindow);
      }

      currentNumberOfWays += waysToTop.get(endOfWindow);
      waysToTop.add(currentNumberOfWays);
    }

    return waysToTop.get(height);
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int stairs = 4;
    int maxSteps = 2;
    int expected = 5;
    int actual = new Program().staircaseTraversal(stairs, maxSteps);
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
  const stairs = 4;
  const maxSteps = 2;
  const expected = 5;
  const actual = program.staircaseTraversal(stairs, maxSteps);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(k^n) time | O(n) space - where n is the height of the staircase and k is the number of allowed steps
function staircaseTraversal(height, maxSteps) {
  return numberOfWaysToTop(height, maxSteps);
}

function numberOfWaysToTop(height, maxSteps) {
  if (height <= 1) return 1;

  let numberOfWays = 0;
  for (let step = 1; step < Math.min(maxSteps, height) + 1; step++) {
    numberOfWays += numberOfWaysToTop(height - step, maxSteps);
  }

  return numberOfWays;
}

// Do not edit the line below.
exports.staircaseTraversal = staircaseTraversal;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n * k) time | O(n) space - where n is the height of the staircase and k is the number of allowed steps
function staircaseTraversal(height, maxSteps) {
  return numberOfWaysToTop(height, maxSteps, {0: 1, 1: 1});
}

function numberOfWaysToTop(height, maxSteps, memoize) {
  if (height in memoize) return memoize[height];

  let numberOfWays = 0;
  for (let step = 1; step < Math.min(maxSteps, height) + 1; step++) {
    numberOfWays += numberOfWaysToTop(height - step, maxSteps, memoize);
  }

  memoize[height] = numberOfWays;

  return numberOfWays;
}

// Do not edit the line below.
exports.staircaseTraversal = staircaseTraversal;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n * k) time | O(n) space - where n is the height of the staircase and k is the number of allowed steps
function staircaseTraversal(height, maxSteps) {
  const waysToTop = new Array(height + 1).fill(0);
  waysToTop[0] = 1;
  waysToTop[1] = 1;

  for (let currentHeight = 2; currentHeight < height + 1; currentHeight++) {
    let step = 1;
    while (step <= maxSteps && step <= currentHeight) {
      waysToTop[currentHeight] = waysToTop[currentHeight] + waysToTop[currentHeight - step];
      step++;
    }
  }

  return waysToTop[height];
}

// Do not edit the line below.
exports.staircaseTraversal = staircaseTraversal;

```
### Solution 4 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the height of the staircase
function staircaseTraversal(height, maxSteps) {
  let currentNumberOfWays = 0;
  const waysToTop = [1];

  for (let currentHeight = 1; currentHeight < height + 1; currentHeight++) {
    const startOfWindow = currentHeight - maxSteps - 1;
    const endOfWindow = currentHeight - 1;
    if (startOfWindow >= 0) currentNumberOfWays -= waysToTop[startOfWindow];

    currentNumberOfWays += waysToTop[endOfWindow];
    waysToTop.push(currentNumberOfWays);
  }

  return waysToTop[height];
}

// Do not edit the line below.
exports.staircaseTraversal = staircaseTraversal;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const stairs = 4;
  const maxSteps = 2;
  const expected = 5;
  const actual = program.staircaseTraversal(stairs, maxSteps);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.staircaseTraversal

class ProgramTest {
    @Test
    fun TestCase1() {
        val stairs = 4
        val maxSteps = 2
        val expected = 5
        val output = staircaseTraversal(stairs, maxSteps)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.min

// O(k^n) time | O(n) space - where n is the height of the staircase and k is the number of allowed steps
fun staircaseTraversal(height: Int, maxSteps: Int): Int {
    return numberOfWaysToTop(height, maxSteps)
}

fun numberOfWaysToTop(height: Int, maxSteps: Int): Int {
    if (height <= 1) return 1

    var numberOfWays = 0
    for (step in 1 until min(maxSteps, height) + 1) {
        numberOfWays += numberOfWaysToTop(height - step, maxSteps)
    }

    return numberOfWays
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.min

// O(n * k) time | O(n) space - where n is the height of the staircase and k is the number of allowed steps
fun staircaseTraversal(height: Int, maxSteps: Int): Int {
    return numberOfWaysToTop(height, maxSteps, mutableMapOf(0 to 1, 1 to 1))
}

fun numberOfWaysToTop(height: Int, maxSteps: Int, memoize: MutableMap<Int, Int>): Int {
    if (height in memoize) return memoize[height]!!

    var numberOfWays = 0
    for (step in 1 until min(maxSteps, height) + 1) {
        numberOfWays += numberOfWaysToTop(height - step, maxSteps, memoize)
    }

    memoize[height] = numberOfWays

    return numberOfWays
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n * k) time | O(n) space - where n is the height of the staircase and k is the number of allowed steps
fun staircaseTraversal(height: Int, maxSteps: Int): Int {
    val waysToTop = MutableList(height + 1) { 0 }
    waysToTop[0] = 1
    waysToTop[1] = 1

    for (currentHeight in 2 until height + 1) {
        var step = 1
        while (step <= maxSteps && step <= currentHeight) {
            waysToTop[currentHeight] = waysToTop[currentHeight] + waysToTop[currentHeight - step]
            step += 1
        }
    }

    return waysToTop[height]
}

```
### Solution 4 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(n) space - where n is the height of the staircase
fun staircaseTraversal(height: Int, maxSteps: Int): Int {
    var currentNumberOfWays = 0
    val waysToTop = mutableListOf(1)

    for (currentHeight in 1 until height + 1) {
        val startOfWindow = currentHeight - maxSteps - 1
        val endOfWindow = currentHeight - 1
        if (startOfWindow >= 0) currentNumberOfWays -= waysToTop[startOfWindow]

        currentNumberOfWays += waysToTop[endOfWindow]
        waysToTop.add(currentNumberOfWays)
    }

    return waysToTop[height]
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.staircaseTraversal

class ProgramTest {
    @Test
    fun TestCase1() {
        val stairs = 4
        val maxSteps = 2
        val expected = 5
        val output = staircaseTraversal(stairs, maxSteps)
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
      let stairs = 4
      let maxSteps = 2
      let expected = 5
      var actual = Program().staircaseTraversal(stairs, maxSteps)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(k^n) time | O(n) space - where n is the height of the staircase and k is the number of allowed steps
  func staircaseTraversal(_ height: Int, _ maxSteps: Int) -> Int {
    return numberOfWaysToTop(height, maxSteps)
  }

  func numberOfWaysToTop(_ height: Int, _ maxSteps: Int) -> Int {
    if height <= 1 {
      return 1
    }

    var numberOfWays = 0
    for step in stride(from: 1, to: min(maxSteps, height) + 1, by: 1) {
      numberOfWays += numberOfWaysToTop(height - step, maxSteps)
    }

    return numberOfWays
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n * k) time | O(n) space - where n is the height of the staircase and k is the number of allowed steps
  func staircaseTraversal(_ height: Int, _ maxSteps: Int) -> Int {
    var memoize = [0: 1, 1: 1]
    return numberOfWaysToTop(height, maxSteps, &memoize)
  }

  func numberOfWaysToTop(_ height: Int, _ maxSteps: Int, _ memoize: inout [Int: Int]) -> Int {
    if memoize[height] != nil {
      return memoize[height]!
    }

    var numberOfWays = 0
    for step in stride(from: 1, to: min(maxSteps, height) + 1, by: 1) {
      numberOfWays += numberOfWaysToTop(height - step, maxSteps, &memoize)
    }
    memoize[height] = numberOfWays

    return numberOfWays
  }
}

```
### Solution 3 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n * k) time | O(n) space - where n is the height of the staircase and k is the number of allowed steps
  func staircaseTraversal(_ height: Int, _ maxSteps: Int) -> Int {
    var waysToTop = Array(repeating: 0, count: height + 1)
    waysToTop[0] = 1
    waysToTop[1] = 1

    for currentHeight in stride(from: 2, to: height + 1, by: 1) {
      var step = 1
      while step <= maxSteps, step <= currentHeight {
        waysToTop[currentHeight] = waysToTop[currentHeight] + waysToTop[currentHeight - step]
        step += 1
      }
    }

    return waysToTop[height]
  }
}

```
### Solution 4 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the height of the staircase
  func staircaseTraversal(_ height: Int, _ maxSteps: Int) -> Int {
    var currentNumberOfWays = 0
    var waysToTop = [1]

    for currentHeight in stride(from: 1, to: height + 1, by: 1) {
      let startOfWindow = currentHeight - maxSteps - 1
      let endOfWindow = currentHeight - 1
      if startOfWindow >= 0 {
        currentNumberOfWays -= waysToTop[startOfWindow]
      }

      currentNumberOfWays += waysToTop[endOfWindow]
      waysToTop.append(currentNumberOfWays)
    }

    return waysToTop[height]
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let stairs = 4
      let maxSteps = 2
      let expected = 5
      var actual = Program().staircaseTraversal(stairs, maxSteps)
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
        stairs = 4
        maxSteps = 2
        expected = 5
        actual = program.staircaseTraversal(stairs, maxSteps)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(k^n) time | O(n) space - where n is the height of the staircase and k is the number of allowed steps
def staircaseTraversal(height, maxSteps):
    return numberOfWaysToTop(height, maxSteps)


def numberOfWaysToTop(height, maxSteps):
    if height <= 1:
        return 1

    numberOfWays = 0
    for step in range(1, min(maxSteps, height) + 1):
        numberOfWays += numberOfWaysToTop(height - step, maxSteps)

    return numberOfWays

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n * k) time | O(n) space - where n is the height of the staircase and k is the number of allowed steps
def staircaseTraversal(height, maxSteps):
    return numberOfWaysToTop(height, maxSteps, {0: 1, 1: 1})


def numberOfWaysToTop(height, maxSteps, memoize):
    if height in memoize:
        return memoize[height]

    numberOfWays = 0
    for step in range(1, min(maxSteps, height) + 1):
        numberOfWays += numberOfWaysToTop(height - step, maxSteps, memoize)

    memoize[height] = numberOfWays

    return numberOfWays

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n * k) time | O(n) space - where n is the height of the staircase and k is the number of allowed steps
def staircaseTraversal(height, maxSteps):
    waysToTop = [0 for _ in range(height + 1)]
    waysToTop[0] = 1
    waysToTop[1] = 1

    for currentHeight in range(2, height + 1):
        step = 1
        while step <= maxSteps and step <= currentHeight:
            waysToTop[currentHeight] = waysToTop[currentHeight] + waysToTop[currentHeight - step]
            step += 1

    return waysToTop[height]

```
### Solution 4 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the height of the staircase
def staircaseTraversal(height, maxSteps):
    currentNumberOfWays = 0
    waysToTop = [1]

    for currentHeight in range(1, height + 1):
        startOfWindow = currentHeight - maxSteps - 1
        endOfWindow = currentHeight - 1
        if startOfWindow >= 0:
            currentNumberOfWays -= waysToTop[startOfWindow]

        currentNumberOfWays += waysToTop[endOfWindow]
        waysToTop.append(currentNumberOfWays)

    return waysToTop[height]

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        stairs = 4
        maxSteps = 2
        expected = 5
        actual = program.staircaseTraversal(stairs, maxSteps)
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
  const stairs = 4;
  const maxSteps = 2;
  const expected = 5;
  const actual = program.staircaseTraversal(stairs, maxSteps);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(k^n) time | O(n) space - where n is the height of the staircase and k is the number of allowed steps
export function staircaseTraversal(height: number, maxSteps: number) {
  return numberOfWaysToTop(height, maxSteps);
}

function numberOfWaysToTop(height: number, maxSteps: number) {
  if (height <= 1) return 1;

  let numberOfWays = 0;
  for (let step = 1; step < Math.min(maxSteps, height) + 1; step++) {
    numberOfWays += numberOfWaysToTop(height - step, maxSteps);
  }

  return numberOfWays;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n * k) time | O(n) space - where n is the height of the staircase and k is the number of allowed steps
export function staircaseTraversal(height: number, maxSteps: number) {
  return numberOfWaysToTop(height, maxSteps, {0: 1, 1: 1});
}

function numberOfWaysToTop(height: number, maxSteps: number, memoize: {[height: number]: number}) {
  if (height in memoize) return memoize[height];

  let numberOfWays = 0;
  for (let step = 1; step < Math.min(maxSteps, height) + 1; step++) {
    numberOfWays += numberOfWaysToTop(height - step, maxSteps, memoize);
  }

  memoize[height] = numberOfWays;

  return numberOfWays;
}

```
### Solution 3 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n * k) time | O(n) space - where n is the height of the staircase and k is the number of allowed steps
export function staircaseTraversal(height: number, maxSteps: number) {
  const waysToTop = new Array(height + 1).fill(0);
  waysToTop[0] = 1;
  waysToTop[1] = 1;

  for (let currentHeight = 2; currentHeight < height + 1; currentHeight++) {
    let step = 1;
    while (step <= maxSteps && step <= currentHeight) {
      waysToTop[currentHeight] = waysToTop[currentHeight] + waysToTop[currentHeight - step];
      step++;
    }
  }

  return waysToTop[height];
}

```
### Solution 4 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the height of the staircase
export function staircaseTraversal(height: number, maxSteps: number) {
  let currentNumberOfWays = 0;
  const waysToTop = [1];

  for (let currentHeight = 1; currentHeight < height + 1; currentHeight++) {
    const startOfWindow = currentHeight - maxSteps - 1;
    const endOfWindow = currentHeight - 1;
    if (startOfWindow >= 0) currentNumberOfWays -= waysToTop[startOfWindow];

    currentNumberOfWays += waysToTop[endOfWindow];
    waysToTop.push(currentNumberOfWays);
  }

  return waysToTop[height];
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const stairs = 4;
  const maxSteps = 2;
  const expected = 5;
  const actual = program.staircaseTraversal(stairs, maxSteps);
  chai.expect(actual).to.deep.equal(expected);
});

```

