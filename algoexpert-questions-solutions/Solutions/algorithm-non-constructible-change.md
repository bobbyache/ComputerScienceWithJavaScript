# Non-Constructible Change
<div class="html">
<p>
  Given an array of positive integers representing the values of coins in your
  possession, write a function that returns the minimum amount of change (the
  minimum sum of money) that you <b>cannot</b> create. The given coins can have
  any positive integer value and aren't necessarily unique (i.e., you can have
  multiple coins of the same value).
</p>
<p>
  For example, if you're given <span>coins = [1, 2, 5]</span>, the minimum
  amount of change that you can't create is <span>4</span>. If you're given no
  coins, the minimum amount of change that you can't create is <span>1</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">coins</span> = [5, 7, 1, 1, 2, 3, 22]
</pre>
<h3>Sample Output</h3>
<pre>
20
</pre>
</div>

Hint 1
<p>
  One approach to solve this problem is to attempt to create every single amount
  of change, starting at 1 and going up until you eventually can't create an
  amount. While this approach works, there <i>is</i> a better one.
</p>


Hint 2

<p>
  Start by sorting the input array. Since you're trying to find the
  <b>minimum</b> amount of change that you can't create, it makes sense to
  consider the smallest coins first.
</p>


Hint 3

<p>
  To understand the trick to this problem, consider the following example:
  <span>coins = [1, 2, 4]</span>. With this set of coins, we can create
  <span>1, 2, 3, 4, 5, 6, 7</span> cents worth of change. Now, if we were to add
  a coin of value <span>9</span> to this set, we <b>would not</b> be able to
  create <span>8</span> cents. However, if we were to add a coin of value
  <span>7</span>, we <b>would</b> be able to create <span>8</span> cents, and we
  would also be able to create all values of change from <span>1</span> to
  <span>15</span>. Why is this the case?
</p>


Hint 4

<p>
  Create a variable to store the amount of change that you can currently create
  up to. Sort all of your coins, and loop through them in ascending order. At
  every iteration, compare the current coin to the amount of change that you can
  currently create up to. Here are the two scenarios that you'll encounter:
</p>
<ul>
  <li>
    The coin value is <b>greater</b> than the amount of change that you can
    currently create plus 1.
  </li>
  <li>
    The coin value is <b>smaller than or equal to</b> the amount of change that
    you can currently create plus 1.
  </li>
</ul>
<p>
  In the first scenario, you simply return the current amount of change that you
  can create plus 1, because you can't create that amount of change. In the
  second scenario, you add the value of the coin to the amount of change that
  you can currently create up to, and you continue iterating through the coins.
</p>
<p>
  The reason for this is that, if you're in the second scenario, you can create
  all of the values of change that you can currently create plus the value of
  the coin that you just considered. If you're given coins <span>[1, 2]</span>,
  then you can make <span>1, 2, 3</span> cents. So if you add a coin of value
  <span>4</span>, then you can make <span>4 + 1</span> cents,
  <span>4 + 2</span> cents, and <span>4 + 3</span> cents. Thus, you can make up
  to <span>7</span> cents.
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
      vector<int> input = {5, 7, 1, 1, 2, 3, 22};
      int expected = 20;
      auto actual = nonConstructibleChange(input);
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

// O(nlogn) time | O(1) space - where n is the number of coins
int nonConstructibleChange(vector<int> coins) {
  sort(coins.begin(), coins.end());

  int currentChangeCreated = 0;
  for (int coin : coins) {
    if (coin > currentChangeCreated + 1)
      return currentChangeCreated + 1;

    currentChangeCreated += coin;
  }

  return currentChangeCreated + 1;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> input = {5, 7, 1, 1, 2, 3, 22};
      int expected = 20;
      auto actual = nonConstructibleChange(input);
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
		int[] input = new int[] {5, 7, 1, 1, 2, 3, 22};
		int expected = 20;
		var actual = new Program().NonConstructibleChange(input);
		Utils.AssertTrue(expected == actual);
	}
}


```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	// O(nlogn) time | O(1) space - where n is the number of coins
	public int NonConstructibleChange(int[] coins) {
		Array.Sort(coins);

		int currentChangeCreated = 0;
		foreach (var coin in coins) {
			if (coin > currentChangeCreated + 1) {
				return currentChangeCreated + 1;
			}

			currentChangeCreated += coin;
		}

		return currentChangeCreated + 1;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] input = new int[] {5, 7, 1, 1, 2, 3, 22};
		int expected = 20;
		var actual = new Program().NonConstructibleChange(input);
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
	input := []int{5, 7, 1, 1, 2, 3, 22}
	expected := 20
	actual := NonConstructibleChange(input)
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

// O(nlogn) time | O(1) space - where n is the number of coins
func NonConstructibleChange(coins []int) int {
	sort.Ints(coins)

	var currentChangeCreated = 0
	for _, coin := range coins {
		if coin > currentChangeCreated+1 {
			return currentChangeCreated + 1
		}
		currentChangeCreated += coin
	}

	return currentChangeCreated + 1
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []int{5, 7, 1, 1, 2, 3, 22}
	expected := 20
	actual := NonConstructibleChange(input)
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
    int[] input = new int[] {5, 7, 1, 1, 2, 3, 22};
    int expected = 20;
    var actual = new Program().nonConstructibleChange(input);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(nlogn) time | O(1) space - where n is the number of coins
  public int nonConstructibleChange(int[] coins) {
    Arrays.sort(coins);

    int currentChangeCreated = 0;
    for (int coin : coins) {
      if (coin > currentChangeCreated + 1) {
        return currentChangeCreated + 1;
      }

      currentChangeCreated += coin;
    }

    return currentChangeCreated + 1;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[] input = new int[] {5, 7, 1, 1, 2, 3, 22};
    int expected = 20;
    var actual = new Program().nonConstructibleChange(input);
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
  const input = [5, 7, 1, 1, 2, 3, 22];
  const expected = 20;
  const actual = program.nonConstructibleChange(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlogn) time | O(1) space - where n is the number of coins
function nonConstructibleChange(coins) {
  coins.sort((a, b) => a - b);

  let currentChangeCreated = 0;
  for (const coin of coins) {
    if (coin > currentChangeCreated + 1) return currentChangeCreated + 1;

    currentChangeCreated += coin;
  }

  return currentChangeCreated + 1;
}

// Do not edit the line below.
exports.nonConstructibleChange = nonConstructibleChange;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [5, 7, 1, 1, 2, 3, 22];
  const expected = 20;
  const actual = program.nonConstructibleChange(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.nonConstructibleChange

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(5, 7, 1, 1, 2, 3, 22)
        val expected = 20
        val output = nonConstructibleChange(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(nlogn) time | O(1) space - where n is the number of coins
fun nonConstructibleChange(coins: MutableList<Int>): Int {
    coins.sort()

    var currentChangeCreated = 0
    for (coin in coins) {
        if (coin > currentChangeCreated + 1) return currentChangeCreated + 1

        currentChangeCreated += coin
    }

    return currentChangeCreated + 1
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.nonConstructibleChange

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(5, 7, 1, 1, 2, 3, 22)
        val expected = 20
        val output = nonConstructibleChange(input)
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
      var input = [5, 7, 1, 1, 2, 3, 22]
      var expected = 20
      var actual = Program().nonConstructibleChange(&input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nlogn) time | O(1) space - where n is the number of coins
  func nonConstructibleChange(_ coins: inout [Int]) -> Int {
    coins.sort()

    var currentChangeCreated = 0
    for coin in coins {
      if coin > currentChangeCreated + 1 {
        return currentChangeCreated + 1
      }
      currentChangeCreated += coin
    }

    return currentChangeCreated + 1
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = [5, 7, 1, 1, 2, 3, 22]
      var expected = 20
      var actual = Program().nonConstructibleChange(&input)
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
        input = [5, 7, 1, 1, 2, 3, 22]
        expected = 20
        actual = program.nonConstructibleChange(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nlogn) time | O(1) space - where n is the number of coins
def nonConstructibleChange(coins):
    coins.sort()

    currentChangeCreated = 0
    for coin in coins:
        if coin > currentChangeCreated + 1:
            return currentChangeCreated + 1

        currentChangeCreated += coin

    return currentChangeCreated + 1

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [5, 7, 1, 1, 2, 3, 22]
        expected = 20
        actual = program.nonConstructibleChange(input)
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
  const input = [5, 7, 1, 1, 2, 3, 22];
  const expected = 20;
  const actual = program.nonConstructibleChange(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlogn) time | O(1) space - where n is the number of coins
export function nonConstructibleChange(coins: number[]) {
  coins.sort((a, b) => a - b);

  let currentChangeCreated = 0;
  for (const coin of coins) {
    if (coin > currentChangeCreated + 1) return currentChangeCreated + 1;

    currentChangeCreated += coin;
  }

  return currentChangeCreated + 1;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [5, 7, 1, 1, 2, 3, 22];
  const expected = 20;
  const actual = program.nonConstructibleChange(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

