# Number Of Binary Tree Topologies
<div class="html">
<p>
  Write a function that takes in a non-negative integer <span>n</span> and
  returns the number of possible Binary Tree topologies that can be created with
  exactly n nodes.
</p>
<p>
  A Binary Tree topology is defined as any Binary Tree configuration,
  irrespective of node values. For instance, there exist only two Binary Tree
  topologies when <span>n</span> is equal to <span>2</span>: a root node with a
  left node, and a root node with a right node.
</p>
<p>
  Note that when <span>n</span> is equal to <span>0</span>, there's one topology
  that can be created: the <span>None</span> / <span>null</span> node.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">n</span> = 3
</pre>
<h3>Sample Output</h3>
<pre>
5
</pre>
</div>

Hint 1
<p>
Every Binary Tree topology of n nodes where n is greater than 0 must have a root node and an amount of nodes on both of its sides totaling n - 1. For instance, one such topology could have a root node, n - 3 nodes in its left subtree, and 2 nodes in its right subtree. Another one could have a root node, 4 nodes in its left subtree, and n - 3 nodes in its right subtree. How many distinct Binary Tree topologies with a root node, a left subtree of x nodes, and a right subtree of n - 1 - x nodes are there?
</p>


Hint 2

<p>
Consider a Binary Tree topology of n nodes with a root node, x nodes in its left subtree, and n - 1 - x nodes in its right subtree, and call this topology T1. This is one of possibly many topologies of n nodes. Realize that for every distinct topology T-Lk of x nodes (i.e. for every distinct topology of T1's left subtree) there is a corresponding, distinct topology of as many nodes as T1. Similarly, for every distinct topology T-Rk of n - 1 - x nodes (i.e. for every distinct topology of T1's right subtree) there is a corresponding, distinct topology of as many nodes as T1. In fact, every unique combination of left and right topologies T-Lk and T-Rk forms a distinct topology of as many nodes as T1, and this is true for every x between 0 and n - 1. Realizing this, can you implement a recursive algorithm that solves this problem?
</p>


Hint 3

<p>
Iterate through every number x between 0 and n - 1 inclusive; at every number x, recursively calculate the number of distinct topologies of x nodes and multiply that by the number of distinct topologies of n - 1 - x nodes. Sum all of the products that you calculate to find the total number of distinct topologies of n nodes.
</p>


Hint 4

<p>
Can you improve the recursive algorithm mentioned in Hints #2 and #3 by using a caching system (memoization)? Can you implement the algorithm iteratively? Is there any advantage to doing so?
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
    RunTest("Test Case 1",
            []() { assert(numberOfBinaryTreeTopologies(3) == 5); });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// Upper Bound: O((n*(2n)!)/(n!(n+1)!)) time | O(n) space
int numberOfBinaryTreeTopologies(int n) {
  if (n == 0) {
    return 1;
  }
  int numberOfTrees = 0;
  for (int leftTreeSize = 0; leftTreeSize < n; leftTreeSize++) {
    int rightTreeSize = n - 1 - leftTreeSize;
    int numberOfLeftTrees = numberOfBinaryTreeTopologies(leftTreeSize);
    int numberOfRightTrees = numberOfBinaryTreeTopologies(rightTreeSize);
    numberOfTrees += numberOfLeftTrees * numberOfRightTrees;
  }
  return numberOfTrees;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <unordered_map>
using namespace std;

int helper(int n, unordered_map<int, int> *cache);

// O(n^2) time | O(n) space
int numberOfBinaryTreeTopologies(int n) {
  unordered_map<int, int> cache{{0, 1}};
  return helper(n, &cache);
}

int helper(int n, unordered_map<int, int> *cache) {
  if (cache->find(n) != cache->end()) {
    return cache->at(n);
  }
  int numberOfTrees = 0;
  for (int leftTreeSize = 0; leftTreeSize < n; leftTreeSize++) {
    int rightTreeSize = n - 1 - leftTreeSize;
    int numberOfLeftTrees = helper(leftTreeSize, cache);
    int numberOfRightTrees = helper(rightTreeSize, cache);
    numberOfTrees += numberOfLeftTrees * numberOfRightTrees;
  }
  cache->insert({n, numberOfTrees});
  return numberOfTrees;
}

```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// O(n^2) time | O(n) space
int numberOfBinaryTreeTopologies(int n) {
  vector<int> cache{1};
  for (int m = 1; m < n + 1; m++) {
    int numberOfTrees = 0;
    for (int leftTreeSize = 0; leftTreeSize < m; leftTreeSize++) {
      int rightTreeSize = m - 1 - leftTreeSize;
      int numberOfLeftTrees = cache[leftTreeSize];
      int numberOfRightTrees = cache[rightTreeSize];
      numberOfTrees += numberOfLeftTrees * numberOfRightTrees;
    }
    cache.push_back(numberOfTrees);
  }
  return cache[n];
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1",
            []() { assert(numberOfBinaryTreeTopologies(3) == 5); });
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
		Utils.AssertTrue(Program.NumberOfBinaryTreeTopologies(3) == 5);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// Upper Bound: O((n*(2n)!)/(n!(n+1)!)) time | O(n) space
	public static int NumberOfBinaryTreeTopologies(int n) {
		if (n == 0) {
			return 1;
		}
		int numberOfTrees = 0;
		for (int leftTreeSize = 0; leftTreeSize < n; leftTreeSize++) {
			int rightTreeSize = n - 1 - leftTreeSize;
			int numberOfLeftTrees = NumberOfBinaryTreeTopologies(leftTreeSize);
			int numberOfRightTrees = NumberOfBinaryTreeTopologies(rightTreeSize);
			numberOfTrees += numberOfLeftTrees * numberOfRightTrees;
		}
		return numberOfTrees;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n^2) time | O(n) space
	public static int NumberOfBinaryTreeTopologies(int n) {
		Dictionary<int, int> cache = new Dictionary<int, int>();
		cache.Add(0, 1);
		return NumberOfBinaryTreeTopologies(n, cache);
	}

	public static int NumberOfBinaryTreeTopologies(int n, Dictionary<int, int> cache) {
		if (cache.ContainsKey(n)) {
			return cache[n];
		}
		int numberOfTrees = 0;
		for (int leftTreeSize = 0; leftTreeSize < n; leftTreeSize++) {
			int rightTreeSize = n - 1 - leftTreeSize;
			int numberOfLeftTrees = NumberOfBinaryTreeTopologies(leftTreeSize, cache);
			int numberOfRightTrees = NumberOfBinaryTreeTopologies(rightTreeSize, cache);
			numberOfTrees += numberOfLeftTrees * numberOfRightTrees;
		}
		cache.Add(n, numberOfTrees);
		return numberOfTrees;
	}
}

```
### Solution 3 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n^2) time | O(n) space
	public static int NumberOfBinaryTreeTopologies(int n) {
		List<int> cache = new List<int>();
		cache.Add(1);
		for (int m = 1; m < n + 1; m++) {
			int numberOfTrees = 0;
			for (int leftTreeSize = 0; leftTreeSize < m; leftTreeSize++) {
				int rightTreeSize = m - 1 - leftTreeSize;
				int numberOfLeftTrees = cache[leftTreeSize];
				int numberOfRightTrees = cache[rightTreeSize];
				numberOfTrees += numberOfLeftTrees * numberOfRightTrees;
			}
			cache.Add(numberOfTrees);
		}
		return cache[n];
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		Utils.AssertTrue(Program.NumberOfBinaryTreeTopologies(3) == 5);
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
	output := NumberOfBinaryTreeTopologies(3)
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// Upper Bound: O((n*(2n)!)/(n!(n+1)!)) time | O(n) space
func NumberOfBinaryTreeTopologies(n int) int {
	if n == 0 {
		return 1
	}
	numberOfTrees := 0
	for leftTreeSize := 0; leftTreeSize < n; leftTreeSize++ {
		rightTreeSize := n - 1 - leftTreeSize
		numberOfLeftTrees := NumberOfBinaryTreeTopologies(leftTreeSize)
		numberOfRightTrees := NumberOfBinaryTreeTopologies(rightTreeSize)
		numberOfTrees += numberOfLeftTrees * numberOfRightTrees
	}
	return numberOfTrees
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n^2) time | O(n) space
func NumberOfBinaryTreeTopologies(n int) int {
	return helper(n, map[int]int{0: 1})
}

func helper(n int, cache map[int]int) int {
	if val, found := cache[n]; found {
		return val
	}
	numberOfTrees := 0
	for leftTreeSize := 0; leftTreeSize < n; leftTreeSize++ {
		rightTreeSize := n - 1 - leftTreeSize
		numberOfLeftTrees := helper(leftTreeSize, cache)
		numberOfRightTrees := helper(rightTreeSize, cache)
		numberOfTrees += numberOfLeftTrees * numberOfRightTrees
	}
	cache[n] = numberOfTrees
	return numberOfTrees
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n^2) time | O(n) space
func NumberOfBinaryTreeTopologies(n int) int {
	cache := []int{1}
	for m := 1; m < n+1; m++ {
		numberOfTrees := 0
		for leftTreeSize := 0; leftTreeSize < m; leftTreeSize++ {
			rightTreeSize := m - 1 - leftTreeSize
			numberOfLeftTrees := cache[leftTreeSize]
			numberOfRightTrees := cache[rightTreeSize]
			numberOfTrees += numberOfLeftTrees * numberOfRightTrees
		}
		cache = append(cache, numberOfTrees)
	}
	return cache[n]
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
	output := NumberOfBinaryTreeTopologies(3)
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
    Utils.assertTrue(Program.numberOfBinaryTreeTopologies(3) == 5);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // Upper Bound: O((n*(2n)!)/(n!(n+1)!)) time | O(n) space
  public static int numberOfBinaryTreeTopologies(int n) {
    if (n == 0) {
      return 1;
    }
    int numberOfTrees = 0;
    for (int leftTreeSize = 0; leftTreeSize < n; leftTreeSize++) {
      int rightTreeSize = n - 1 - leftTreeSize;
      int numberOfLeftTrees = numberOfBinaryTreeTopologies(leftTreeSize);
      int numberOfRightTrees = numberOfBinaryTreeTopologies(rightTreeSize);
      numberOfTrees += numberOfLeftTrees * numberOfRightTrees;
    }
    return numberOfTrees;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n^2) time | O(n) space
  public static int numberOfBinaryTreeTopologies(int n) {
    Map<Integer, Integer> cache = new HashMap<Integer, Integer>();
    cache.put(0, 1);
    return numberOfBinaryTreeTopologies(n, cache);
  }

  public static int numberOfBinaryTreeTopologies(int n, Map<Integer, Integer> cache) {
    if (cache.containsKey(n)) {
      return cache.get(n);
    }
    int numberOfTrees = 0;
    for (int leftTreeSize = 0; leftTreeSize < n; leftTreeSize++) {
      int rightTreeSize = n - 1 - leftTreeSize;
      int numberOfLeftTrees = numberOfBinaryTreeTopologies(leftTreeSize, cache);
      int numberOfRightTrees = numberOfBinaryTreeTopologies(rightTreeSize, cache);
      numberOfTrees += numberOfLeftTrees * numberOfRightTrees;
    }
    cache.put(n, numberOfTrees);
    return numberOfTrees;
  }
}

```
### Solution 3 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n^2) time | O(n) space
  public static int numberOfBinaryTreeTopologies(int n) {
    List<Integer> cache = new ArrayList<Integer>();
    cache.add(1);
    for (int m = 1; m < n + 1; m++) {
      int numberOfTrees = 0;
      for (int leftTreeSize = 0; leftTreeSize < m; leftTreeSize++) {
        int rightTreeSize = m - 1 - leftTreeSize;
        int numberOfLeftTrees = cache.get(leftTreeSize);
        int numberOfRightTrees = cache.get(rightTreeSize);
        numberOfTrees += numberOfLeftTrees * numberOfRightTrees;
      }
      cache.add(numberOfTrees);
    }
    return cache.get(n);
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    Utils.assertTrue(Program.numberOfBinaryTreeTopologies(3) == 5);
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
  chai.expect(program.numberOfBinaryTreeTopologies(3)).to.deep.equal(5);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Upper Bound: O((n*(2n)!)/(n!(n+1)!)) time | O(n) space
function numberOfBinaryTreeTopologies(n) {
  if (n === 0) return 1;
  let numberOfTrees = 0;
  for (let leftTreeSize = 0; leftTreeSize < n; leftTreeSize++) {
    const rightTreeSize = n - 1 - leftTreeSize;
    const numberOfLeftTrees = numberOfBinaryTreeTopologies(leftTreeSize);
    const numberOfRightTrees = numberOfBinaryTreeTopologies(rightTreeSize);
    numberOfTrees += numberOfLeftTrees * numberOfRightTrees;
  }
  return numberOfTrees;
}

exports.numberOfBinaryTreeTopologies = numberOfBinaryTreeTopologies;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space
function numberOfBinaryTreeTopologies(n, cache = {0: 1}) {
  if (n in cache) return cache[n];
  let numberOfTrees = 0;
  for (let leftTreeSize = 0; leftTreeSize < n; leftTreeSize++) {
    const rightTreeSize = n - 1 - leftTreeSize;
    const numberOfLeftTrees = numberOfBinaryTreeTopologies(leftTreeSize, cache);
    const numberOfRightTrees = numberOfBinaryTreeTopologies(rightTreeSize, cache);
    numberOfTrees += numberOfLeftTrees * numberOfRightTrees;
  }
  cache[n] = numberOfTrees;
  return numberOfTrees;
}

exports.numberOfBinaryTreeTopologies = numberOfBinaryTreeTopologies;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space
function numberOfBinaryTreeTopologies(n) {
  const cache = [1];
  for (let m = 1; m < n + 1; m++) {
    let numberOfTrees = 0;
    for (let leftTreeSize = 0; leftTreeSize < m; leftTreeSize++) {
      const rightTreeSize = m - 1 - leftTreeSize;
      const numberOfLeftTrees = cache[leftTreeSize];
      const numberOfRightTrees = cache[rightTreeSize];
      numberOfTrees += numberOfLeftTrees * numberOfRightTrees;
    }
    cache.push(numberOfTrees);
  }
  return cache[n];
}

exports.numberOfBinaryTreeTopologies = numberOfBinaryTreeTopologies;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.numberOfBinaryTreeTopologies(3)).to.deep.equal(5);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.numberOfBinaryTreeTopologies

class ProgramTest {
    @Test
    fun TestCase1() {
        val output = numberOfBinaryTreeTopologies(3)
        assert(output == 5)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// Upper Bound: O((n*(2n)!)/(n!(n+1)!)) time | O(n) space
fun numberOfBinaryTreeTopologies(n: Int): Int {
    if (n == 0) {
        return 1
    }
    var numberOfTrees = 0
    for (leftTreeSize in 0 until n) {
        val rightTreeSize = n - 1 - leftTreeSize
        val numberOfLeftTrees = numberOfBinaryTreeTopologies(leftTreeSize)
        val numberOfRightTrees = numberOfBinaryTreeTopologies(rightTreeSize)
        numberOfTrees += numberOfLeftTrees * numberOfRightTrees
    }
    return numberOfTrees
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^2) time | O(n) space
fun numberOfBinaryTreeTopologies(n: Int): Int {
    val cache = mutableMapOf<Int, Int>()
    cache[0] = 1
    return numberOfBinaryTreeTopologies(n, cache)
}

fun numberOfBinaryTreeTopologies(n: Int, cache: MutableMap<Int, Int>): Int {
    if (cache.contains(n)) {
        return cache[n]!!
    }

    var numberOfTrees = 0
    for (leftTreeSize in 0 until n) {
        val rightTreeSize = n - 1 - leftTreeSize
        val numberOfLeftTrees = numberOfBinaryTreeTopologies(leftTreeSize, cache)
        val numberOfRightTrees = numberOfBinaryTreeTopologies(rightTreeSize, cache)
        numberOfTrees += numberOfLeftTrees * numberOfRightTrees
    }
    cache[n] = numberOfTrees
    return numberOfTrees
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^2) time | O(n) space
fun numberOfBinaryTreeTopologies(n: Int): Int {
    val cache = mutableListOf<Int>(1)
    for (m in 1 until n + 1) {
        var numberOfTrees = 0
        for (leftTreeSize in 0 until m) {
            val rightTreeSize = m - 1 - leftTreeSize
            val numberOfLeftTrees = cache[leftTreeSize]
            val numberOfRightTrees = cache[rightTreeSize]
            numberOfTrees += numberOfLeftTrees * numberOfRightTrees
        }
        cache.add(numberOfTrees)
    }
    return cache[n]
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.numberOfBinaryTreeTopologies

class ProgramTest {
    @Test
    fun TestCase1() {
        val output = numberOfBinaryTreeTopologies(3)
        assert(output == 5)
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
      try assertEqual(5, program.numberOfBinaryTreeTopologies(3))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // Upper Bound: (O(n * (2n)!)/(n!(n + 1)!)) time | O(n) space
  func numberOfBinaryTreeTopologies(_ n: Int) -> Int {
    if n == 0 {
      return 1
    }

    var numberOfTopologies = 0

    for leftTreeSize in 0 ..< n {
      let rightTreeSize = n - 1 - leftTreeSize

      let leftNumberOfTopologies = numberOfBinaryTreeTopologies(leftTreeSize)
      let rightNumberOfTopologies = numberOfBinaryTreeTopologies(rightTreeSize)
      numberOfTopologies += leftNumberOfTopologies * rightNumberOfTopologies
    }

    return numberOfTopologies
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(1) space
  func numberOfBinaryTreeTopologies(_ n: Int) -> Int {
    var cache = [0: 1]
    return numberOfBinaryTreeTopologiesHelper(n, &cache)
  }

  func numberOfBinaryTreeTopologiesHelper(_ n: Int, _ cache: inout [Int: Int]) -> Int {
    if let cachedValue = cache[n] {
      return cachedValue
    }

    var numberOfTopologies = 0

    for leftTreeSize in 0 ..< n {
      let rightTreeSize = n - 1 - leftTreeSize

      let leftNumberOfTopologies = numberOfBinaryTreeTopologiesHelper(leftTreeSize, &cache)
      let rightNumberOfTopologies = numberOfBinaryTreeTopologiesHelper(rightTreeSize, &cache)
      numberOfTopologies += leftNumberOfTopologies * rightNumberOfTopologies
    }

    cache[n] = numberOfTopologies
    return numberOfTopologies
  }
}

```
### Solution 3 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(1) space
  func numberOfBinaryTreeTopologies(_ n: Int) -> Int {
    var cache = [1]

    for currentMax in stride(from: 1, through: n, by: 1) {
      var numberOfTopologies = 0

      for leftTreeSize in stride(from: 0, to: currentMax, by: 1) {
        let rightTreeSize = currentMax - 1 - leftTreeSize

        let leftNumberOfTopologies = cache[leftTreeSize]
        let rightNumberOfTopologies = cache[rightTreeSize]
        numberOfTopologies += leftNumberOfTopologies * rightNumberOfTopologies
      }

      cache.append(numberOfTopologies)
    }

    return cache[n]
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      try assertEqual(5, program.numberOfBinaryTreeTopologies(3))
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
        self.assertEqual(program.numberOfBinaryTreeTopologies(3), 5)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Upper Bound: O((n*(2n)!)/(n!(n+1)!)) time | O(n) space
def numberOfBinaryTreeTopologies(n):
    if n == 0:
        return 1
    numberOfTrees = 0
    for leftTreeSize in range(n):
        rightTreeSize = n - 1 - leftTreeSize
        numberOfLeftTrees = numberOfBinaryTreeTopologies(leftTreeSize)
        numberOfRightTrees = numberOfBinaryTreeTopologies(rightTreeSize)
        numberOfTrees += numberOfLeftTrees * numberOfRightTrees
    return numberOfTrees

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n) space
def numberOfBinaryTreeTopologies(n, cache={0: 1}):
    if n in cache:
        return cache[n]
    numberOfTrees = 0
    for leftTreeSize in range(n):
        rightTreeSize = n - 1 - leftTreeSize
        numberOfLeftTrees = numberOfBinaryTreeTopologies(leftTreeSize, cache)
        numberOfRightTrees = numberOfBinaryTreeTopologies(rightTreeSize, cache)
        numberOfTrees += numberOfLeftTrees * numberOfRightTrees
    cache[n] = numberOfTrees
    return numberOfTrees

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n) space
def numberOfBinaryTreeTopologies(n):
    cache = [1]
    for m in range(1, n + 1):
        numberOfTrees = 0
        for leftTreeSize in range(m):
            rightTreeSize = m - 1 - leftTreeSize
            numberOfLeftTrees = cache[leftTreeSize]
            numberOfRightTrees = cache[rightTreeSize]
            numberOfTrees += numberOfLeftTrees * numberOfRightTrees
        cache.append(numberOfTrees)
    return cache[n]

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.numberOfBinaryTreeTopologies(3), 5)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.numberOfBinaryTreeTopologies(3)).to.deep.equal(5);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Upper Bound: O((n*(2n)!)/(n!(n+1)!)) time | O(n) space
export function numberOfBinaryTreeTopologies(n: number) {
  if (n === 0) return 1;
  let numberOfTrees = 0;
  for (let leftTreeSize = 0; leftTreeSize < n; leftTreeSize++) {
    const rightTreeSize = n - 1 - leftTreeSize;
    const numberOfLeftTrees = numberOfBinaryTreeTopologies(leftTreeSize);
    const numberOfRightTrees = numberOfBinaryTreeTopologies(rightTreeSize);
    numberOfTrees += numberOfLeftTrees * numberOfRightTrees;
  }
  return numberOfTrees;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

interface Cache {
  [key: number]: number;
}

// O(n^2) time | O(n) space
export function numberOfBinaryTreeTopologies(n: number, cache: Cache = {0: 1}) {
  if (n in cache) return cache[n];
  let numberOfTrees = 0;
  for (let leftTreeSize = 0; leftTreeSize < n; leftTreeSize++) {
    const rightTreeSize = n - 1 - leftTreeSize;
    const numberOfLeftTrees = numberOfBinaryTreeTopologies(leftTreeSize, cache);
    const numberOfRightTrees = numberOfBinaryTreeTopologies(rightTreeSize, cache);
    numberOfTrees += numberOfLeftTrees * numberOfRightTrees;
  }
  cache[n] = numberOfTrees;
  return numberOfTrees;
}

```
### Solution 3 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space
export function numberOfBinaryTreeTopologies(n: number) {
  const cache = [1];
  for (let m = 1; m < n + 1; m++) {
    let numberOfTrees = 0;
    for (let leftTreeSize = 0; leftTreeSize < m; leftTreeSize++) {
      const rightTreeSize = m - 1 - leftTreeSize;
      const numberOfLeftTrees = cache[leftTreeSize];
      const numberOfRightTrees = cache[rightTreeSize];
      numberOfTrees += numberOfLeftTrees * numberOfRightTrees;
    }
    cache.push(numberOfTrees);
  }
  return cache[n];
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.numberOfBinaryTreeTopologies(3)).to.deep.equal(5);
});

```

