# Nth Fibonacci
<div class="html">
<p>
  The Fibonacci sequence is defined as follows: the first number of the sequence
  is <span>0</span>, the second number is <span>1</span>, and the nth number is the sum of the (n - 1)th
  and (n - 2)th numbers. Write a function that takes in an integer
  <span>n</span> and returns the nth Fibonacci number.
</p>
<p>
  Important note: the Fibonacci sequence is often defined with its first two
  numbers as <span>F0 = 0</span> and <span>F1 = 1</span>. For the purpose of
  this question, the first Fibonacci number is <span>F0</span>; therefore,
  <span>getNthFib(1)</span> is equal to <span>F0</span>, <span>getNthFib(2)</span>
  is equal to <span>F1</span>, etc..
</p>
<h3>Sample Input #1</h3>
<pre>
<span class="CodeEditor-promptParameter">n</span> = 2
</pre>
<h3>Sample Output #1</h3>
<pre>
1 <span class="CodeEditor-promptComment">// 0, 1</span>
</pre>
<h3>Sample Input #2</h3>
<pre>
<span class="CodeEditor-promptParameter">n</span> = 6
</pre>
<h3>Sample Output #2</h3>
<pre>
5 <span class="CodeEditor-promptComment">// 0, 1, 1, 2, 3, 5</span>
</pre>
</div>

Hint 1
<p>
The formula to generate the nth Fibonacci number can be written as follows: F(n) = F(n - 1) + F(n - 2). Think of the case(s) for which this formula doesn't apply (the base case(s)) and try to implement a simple recursive algorithm to find the nth Fibonacci number with this formula.
</p>


Hint 2

<p>
What are the runtime implications of solving this problem as is described in Hint #1? Can you use memoization (caching) to improve the performance of your algorithm?
</p>


Hint 3

<p>
Realize that to calculate any single Fibonacci number you only need to have the two previous Fibonacci numbers. Knowing this, can you implement an iterative algorithm to solve this question, storing only the last two Fibonacci numbers at any given time?
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
    RunTest("Test Case 1", []() { assert(getNthFib(6) == 5); });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// O(2^n) time | O(n) space
int getNthFib(int n) {
  if (n == 2) {
    return 1;
  } else if (n == 1) {
    return 0;
  } else {
    return getNthFib(n - 1) + getNthFib(n - 2);
  }
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <unordered_map>
using namespace std;

int getNthFib(int n);
int helper(int n, unordered_map<int, int> &memoize);

// O(n) time | O(n) space
int getNthFib(int n) {
  unordered_map<int, int> memoize({{1, 0}, {2, 1}});
  return helper(n, memoize);
}

int helper(int n, unordered_map<int, int> &memoize) {
  if (memoize.find(n) != memoize.end()) {
    return memoize[n];
  } else {
    memoize[n] = helper(n - 1, memoize) + helper(n - 2, memoize);
    return memoize[n];
  }
}

```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// O(n) time | O(1) space
int getNthFib(int n) {
  int lastTwo[] = {0, 1};
  int counter = 3;
  while (counter <= n) {
    int nextFib = lastTwo[0] + lastTwo[1];
    lastTwo[0] = lastTwo[1];
    lastTwo[1] = nextFib;
    counter++;
  }
  return n > 1 ? lastTwo[1] : lastTwo[0];
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() { assert(getNthFib(6) == 5); });
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
		Utils.AssertEquals(5, Program.GetNthFib(6) );
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(2^n) time | O(n) space
	public static int GetNthFib(int n) {
		if (n == 2) {
			return 1;
		} else if (n == 1) {
			return 0;
		} else {
			return GetNthFib(n - 1) + GetNthFib(n - 2);
		}
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n) time | O(n) space
	public static int GetNthFib(int n) {
		Dictionary<int, int> memoize = new Dictionary<int, int>();
		memoize.Add(1, 0);
		memoize.Add(2, 1);
		return GetNthFib(n, memoize);
	}

	public static int GetNthFib(int n, Dictionary<int, int> memoize) {
		if (memoize.ContainsKey(n)) {
			return memoize[n];
		} else {
			memoize.Add(n, GetNthFib(n - 1, memoize) + GetNthFib(n - 2, memoize));
			return memoize[n];
		}
	}
}

```
### Solution 3 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(n) time | O(1) space
	public static int GetNthFib(int n) {
		int[] lastTwo = {0, 1};
		int counter = 3;
		while (counter <= n) {
			int nextFib = lastTwo[0] + lastTwo[1];
			lastTwo[0] = lastTwo[1];
			lastTwo[1] = nextFib;
			counter++;
		}
		return n > 1 ? lastTwo[1] : lastTwo[0];
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		Utils.AssertEquals(5, Program.GetNthFib(6) );
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
	expected := 5
	output := GetNthFib(6)
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(2^n) time | O(n) space
func GetNthFib(n int) int {
	if n == 2 {
		return 1
	} else if n == 1 {
		return 0
	}
	return GetNthFib(n-1) + GetNthFib(n-2)
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space
func GetNthFib(n int) int {
	return helper(n, map[int]int{
		1: 0,
		2: 1,
	})
}

func helper(n int, memoize map[int]int) int {
	if val, found := memoize[n]; found {
		return val
	}
	memoize[n] = helper(n-1, memoize) + helper(n-2, memoize)
	return memoize[n]
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space
func GetNthFib(n int) int {
	lastTwo := []int{0, 1}
	counter := 3
	for counter <= n {
		nextFib := lastTwo[0] + lastTwo[1]
		lastTwo = []int{lastTwo[1], nextFib}
		counter += 1
	}
	if n > 1 {
		return lastTwo[1]
	}
	return lastTwo[0]
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := 5
	output := GetNthFib(6)
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
    Utils.assertTrue(Program.getNthFib(6) == 5);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(2^n) time | O(n) space
  public static int getNthFib(int n) {
    if (n == 2) {
      return 1;
    } else if (n == 1) {
      return 0;
    } else {
      return getNthFib(n - 1) + getNthFib(n - 2);
    }
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(n) space
  public static int getNthFib(int n) {
    Map<Integer, Integer> memoize = new HashMap<Integer, Integer>();
    memoize.put(1, 0);
    memoize.put(2, 1);
    return getNthFib(n, memoize);
  }

  public static int getNthFib(int n, Map<Integer, Integer> memoize) {
    if (memoize.containsKey(n)) {
      return memoize.get(n);
    } else {
      memoize.put(n, getNthFib(n - 1, memoize) + getNthFib(n - 2, memoize));
      return memoize.get(n);
    }
  }
}

```
### Solution 3 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space
  public static int getNthFib(int n) {
    int[] lastTwo = {0, 1};
    int counter = 3;
    while (counter <= n) {
      int nextFib = lastTwo[0] + lastTwo[1];
      lastTwo[0] = lastTwo[1];
      lastTwo[1] = nextFib;
      counter++;
    }
    return n > 1 ? lastTwo[1] : lastTwo[0];
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    Utils.assertTrue(Program.getNthFib(6) == 5);
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
  chai.expect(program.getNthFib(6)).to.deep.equal(5);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(2^n) time | O(n) space
function getNthFib(n) {
  if (n === 2) {
    return 1;
  } else if (n === 1) {
    return 0;
  } else {
    return getNthFib(n - 1) + getNthFib(n - 2);
  }
}

exports.getNthFib = getNthFib;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space
function getNthFib(n, memoize = {1: 0, 2: 1}) {
  if (n in memoize) {
    return memoize[n];
  } else {
    memoize[n] = getNthFib(n - 1, memoize) + getNthFib(n - 2, memoize);
    return memoize[n];
  }
}

exports.getNthFib = getNthFib;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space
function getNthFib(n) {
  const lastTwo = [0, 1];
  let counter = 3;
  while (counter <= n) {
    const nextFib = lastTwo[0] + lastTwo[1];
    lastTwo[0] = lastTwo[1];
    lastTwo[1] = nextFib;
    counter++;
  }
  return n > 1 ? lastTwo[1] : lastTwo[0];
}

exports.getNthFib = getNthFib;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.getNthFib(6)).to.deep.equal(5);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.getNthFib as getNthFib

class ProgramTest {
    @Test
    fun TestCase1() {
        assert(getNthFib(6) == 5)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(2^n) time | O(n) space
fun getNthFib(n: Int): Int {
    if (n == 2) {
        return 1
    } else if (n == 1) {
        return 0
    }
    return getNthFib(n - 1) + getNthFib(n - 2)
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(n) space
fun getNthFib(n: Int): Int {
    val cache = mutableMapOf<Int, Int>(1 to 0, 2 to 1)
    return getNthFib(n, cache)
}

fun getNthFib(n: Int, cache: MutableMap<Int, Int>): Int {
    if (cache.containsKey(n)) return cache[n]!!
    cache[n] = getNthFib(n - 1, cache) + getNthFib(n - 2, cache)
    return cache[n]!!
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(1) space
fun getNthFib(n: Int): Int {
    var lastTwo = Pair(0, 1)
    var counter = 3
    while (counter <= n) {
        val nextFib = lastTwo.first + lastTwo.second
        lastTwo = Pair(lastTwo.second, nextFib)
        counter++
    }
    return if (n > 1) lastTwo.second else lastTwo.first
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.getNthFib as getNthFib

class ProgramTest {
    @Test
    fun TestCase1() {
        assert(getNthFib(6) == 5)
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
      try assertEqual(5, program.getNthFib(n: 6))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(2^n) time | O(n) space
  func getNthFib(n: Int) -> Int {
    if n == 2 {
      return 1
    } else if n == 1 {
      return 0
    } else {
      return getNthFib(n: n - 1) + getNthFib(n: n - 2)
    }
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space
  func getNthFib(n: Int) -> Int {
    var memoize = [1: 0, 2: 1]
    return helper(n: n, memoize: &memoize)
  }

  func helper(n: Int, memoize: inout [Int: Int]) -> Int {
    if memoize.keys.contains(n) {
      return memoize[n]!
    }
    memoize[n] = helper(n: n - 1, memoize: &memoize) + helper(n: n - 2, memoize: &memoize)
    return memoize[n]!
  }
}

```
### Solution 3 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space
  func getNthFib(n: Int) -> Int {
    var lastTwo = [0, 1]
    var counter = 3
    while counter <= n {
      let nextFib = lastTwo[0] + lastTwo[1]
      lastTwo[0] = lastTwo[1]
      lastTwo[1] = nextFib

      counter = counter + 1
    }
    return n > 1 ? lastTwo[1] : lastTwo[0]
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      try assertEqual(5, program.getNthFib(n: 6))
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
        self.assertEqual(program.getNthFib(6), 5)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(2^n) time | O(n) space
def getNthFib(n):
    if n == 2:
        return 1
    elif n == 1:
        return 0
    else:
        return getNthFib(n - 1) + getNthFib(n - 2)

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space
def getNthFib(n, memoize={1: 0, 2: 1}):
    if n in memoize:
        return memoize[n]
    else:
        memoize[n] = getNthFib(n - 1, memoize) + getNthFib(n - 2, memoize)
        return memoize[n]

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space
def getNthFib(n):
    lastTwo = [0, 1]
    counter = 3
    while counter <= n:
        nextFib = lastTwo[0] + lastTwo[1]
        lastTwo[0] = lastTwo[1]
        lastTwo[1] = nextFib
        counter += 1
    return lastTwo[1] if n > 1 else lastTwo[0]

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.getNthFib(6), 5)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.getNthFib(6)).to.deep.equal(5);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(2^n) time | O(n) space
export function getNthFib(n: number): number {
  if (n === 2) {
    return 1;
  } else if (n === 1) {
    return 0;
  } else {
    return getNthFib(n - 1) + getNthFib(n - 2);
  }
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

interface Cache {
  [key: number]: number;
}

// O(n) time | O(n) space
export function getNthFib(n: number, memoize: Cache = {1: 0, 2: 1}) {
  if (n in memoize) {
    return memoize[n];
  } else {
    memoize[n] = getNthFib(n - 1, memoize) + getNthFib(n - 2, memoize);
    return memoize[n];
  }
}

```
### Solution 3 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space
export function getNthFib(n: number) {
  const lastTwo: [number, number] = [0, 1];
  let counter = 3;
  while (counter <= n) {
    const nextFib = lastTwo[0] + lastTwo[1];
    lastTwo[0] = lastTwo[1];
    lastTwo[1] = nextFib;
    counter++;
  }
  return n > 1 ? lastTwo[1] : lastTwo[0];
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.getNthFib(6)).to.deep.equal(5);
});

```

