# Number Of Ways To Make Change
<div class="html">
<p>
  Given an array of distinct positive integers representing coin denominations and a
  single non-negative integer <span>n</span> representing a target amount of
  money, write a function that returns the number of ways to make change for
  that target amount using the given coin denominations.
</p>
<p>Note that an unlimited amount of coins is at your disposal.</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">n</span> = 6
<span class="CodeEditor-promptParameter">denoms</span> = [1, 5]
</pre>
<h3>Sample Output</h3>
<pre>
2 <span class="CodeEditor-promptComment">// 1x1 + 1x5 and 6x1</span>
</pre>
</div>

Hint 1
<p>
Try building an array of the number of ways to make change for all amounts between 0 and n inclusive. Note that there is only one way to make change for 0: that is to not use any coins.
</p>


Hint 2

<p>
Build up the array mentioned in Hint #1 one coin denomination at a time. In other words, find the number of ways to make change for all amounts between 0 and n with only one denomination, then with two, etc., until you use all denominations.
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
      assert(numberOfWaysToMakeChange(6, {1, 5}) == 2);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

// O(nd) time | O(n) space
int numberOfWaysToMakeChange(int n, vector<int> denoms) {
  vector<int> ways(n + 1, 0);
  ways[0] = 1;
  for (int denom : denoms) {
    for (int amount = 1; amount < n + 1; amount++) {
      if (denom <= amount) {
        ways[amount] += ways[amount - denom];
      }
    }
  }
  return ways[n];
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      assert(numberOfWaysToMakeChange(6, {1, 5}) == 2);
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
		int[] input = {1, 5};
		Utils.AssertTrue(Program.NumberOfWaysToMakeChange(6, input) == 2);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(nd) time | O(n) space
	public static int NumberOfWaysToMakeChange(int n, int[] denoms) {
		int[] ways = new int[n + 1];
		ways[0] = 1;
		foreach (int denom in denoms) {
			for (int amount = 1; amount < n + 1; amount++) {
				if (denom <= amount) {
					ways[amount] += ways[amount - denom];
				}
			}
		}
		return ways[n];
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] input = {1, 5};
		Utils.AssertTrue(Program.NumberOfWaysToMakeChange(6, input) == 2);
	}
}

```
### Sandbox Code (go)
```go
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

package main

import "github.com/stretchr/testify/require"

func (s *TestSuite) TestCase1(t *TestCase) {
	output := NumberOfWaysToMakeChange(6, []int{1, 5})
	require.Equal(t, 2, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(nd) time | O(n) space
func NumberOfWaysToMakeChange(n int, denoms []int) int {
	ways := make([]int, n+1)
	ways[0] = 1
	for _, denom := range denoms {
		for amount := 1; amount < n+1; amount++ {
			if denom <= amount {
				ways[amount] += ways[amount-denom]
			}
		}
	}
	return ways[n]
}

```
### Unit Tests 1 (go)
```go
package main

import "github.com/stretchr/testify/require"

func (s *TestSuite) TestCase1(t *TestCase) {
	output := NumberOfWaysToMakeChange(6, []int{1, 5})
	require.Equal(t, 2, output)
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
    int[] input = {1, 5};
    Utils.assertTrue(Program.numberOfWaysToMakeChange(6, input) == 2);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nd) time | O(n) space
  public static int numberOfWaysToMakeChange(int n, int[] denoms) {
    int[] ways = new int[n + 1];
    ways[0] = 1;
    for (int denom : denoms) {
      for (int amount = 1; amount < n + 1; amount++) {
        if (denom <= amount) {
          ways[amount] += ways[amount - denom];
        }
      }
    }
    return ways[n];
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    int[] input = {1, 5};
    Utils.assertTrue(Program.numberOfWaysToMakeChange(6, input) == 2);
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
  chai.expect(program.numberOfWaysToMakeChange(6, [1, 5])).to.deep.equal(2);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nd) time | O(n) space
function numberOfWaysToMakeChange(n, denoms) {
  const ways = new Array(n + 1).fill(0);
  ways[0] = 1;
  for (let denom of denoms) {
    for (let amount = 1; amount < n + 1; amount++) {
      if (denom <= amount) {
        ways[amount] += ways[amount - denom];
      }
    }
  }
  return ways[n];
}

exports.numberOfWaysToMakeChange = numberOfWaysToMakeChange;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.numberOfWaysToMakeChange(6, [1, 5])).to.deep.equal(2);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.numberOfWaysToMakeChange

class ProgramTest {
    @Test
    fun TestCase1() {
        val denoms = listOf(1, 5)
        val output = numberOfWaysToMakeChange(6, denoms)
        val expected = 2
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(nd) time | O(n) space
fun numberOfWaysToMakeChange(n: Int, denoms: List<Int>): Int {
    val ways = MutableList(n + 1) { 0 }
    ways[0] = 1
    for (denom in denoms) {
        for (amount in 1 until n + 1) {
            if (denom <= amount) {
                ways[amount] += ways[amount - denom]
            }
        }
    }
    return ways[n]
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.numberOfWaysToMakeChange

class ProgramTest {
    @Test
    fun TestCase1() {
        val denoms = listOf(1, 5)
        val output = numberOfWaysToMakeChange(6, denoms)
        val expected = 2
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
    runTest("Test Case 1") { () throws -> Void in
      let output = program.numberOfWaysToMakeChange(target: 6, denominations: [1, 5])
      try assertEqual(2, output)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nd) time | O(n) space
  func numberOfWaysToMakeChange(target: Int, denominations: [Int]) -> Int {
    var ways = Array(repeating: 0, count: target + 1)
    ways[0] = 1

    for denomination in denominations {
      for amount in 1 ..< target + 1 {
        if denomination <= amount {
          ways[amount] = ways[amount] + ways[amount - denomination]
        }
      }
    }

    return ways[target]
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let output = program.numberOfWaysToMakeChange(target: 6, denominations: [1, 5])
      try assertEqual(2, output)
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
        self.assertEqual(program.numberOfWaysToMakeChange(6, [1, 5]), 2)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nd) time | O(n) space
def numberOfWaysToMakeChange(n, denoms):
    ways = [0 for amount in range(n + 1)]
    ways[0] = 1
    for denom in denoms:
        for amount in range(1, n + 1):
            if denom <= amount:
                ways[amount] += ways[amount - denom]
    return ways[n]

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.numberOfWaysToMakeChange(6, [1, 5]), 2)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.numberOfWaysToMakeChange(6, [1, 5])).to.deep.equal(2);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nd) time | O(n) space
export function numberOfWaysToMakeChange(n: number, denoms: number[]) {
  const ways: number[] = new Array(n + 1).fill(0);
  ways[0] = 1;
  for (let denom of denoms) {
    for (let amount = 1; amount < n + 1; amount++) {
      if (denom <= amount) {
        ways[amount] += ways[amount - denom];
      }
    }
  }
  return ways[n];
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.numberOfWaysToMakeChange(6, [1, 5])).to.deep.equal(2);
});

```

