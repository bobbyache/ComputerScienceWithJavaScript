# Interweaving Strings
<div class="html">
<p>
  Write a function that takes in three strings and returns a boolean
  representing whether the third string can be formed by interweaving the first
  two strings.
</p>
<p>
  To interweave strings means to merge them by alternating their letters without
  any specific pattern. For instance, the strings <span>"abc"</span> and
  <span>"123"</span> can be interwoven as <span>"a1b2c3"</span>, as
  <span>"abc123"</span>, and as <span>"ab1c23"</span> (this list is
  nonexhaustive).
</p>
<p>
  Letters within a string must maintain their relative ordering in the
  interwoven string.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">one</span> = "algoexpert"
<span class="CodeEditor-promptParameter">two</span> = "your-dream-job"
<span class="CodeEditor-promptParameter">three</span> = "your-algodream-expertjob"
</pre>
<h3>Sample Output</h3>
<pre>
true
</pre>
</div>

Hint 1
<p>
Try traversing the three strings with three different pointers to solve this problem.
</p>


Hint 2

<p>
Declare three variables (i, j, and k, for instance) pointing to indices in the three strings, respectively, and starting at 0. At any given combination of indices, if neither the character at i in the first string nor the character at j in the second string is equal to the character at k in the third string, then the first two strings can't interweave to form the third one (at least not in whatever way led to the values of i, j, and k in question).
</p>


Hint 3

<p>
If at any given combination of the indices i, j, and k mentioned in Hint #2, the character at i in the first string or the character at j in the second string is equal to the character at k in the third string, then you can potentially interweave the first two strings to get the third one. In such a case, try incrementing the two relevant indices (i and k or j and k) and repeating this process until you confirm whether or not the first two strings can be interwoven to form the third one. Try using recursion to implement this algorithm.
</p>


Hint 4

<p>
By following Hint #3, you'll perform, in some cases, many computations multiple times. How can you use caching to improve the time complexity of this algorithm?
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
      string one = "algoexpert";
      string two = "your-dream-job";
      string three = "your-algodream-expertjob";
      assert(interweavingStrings(one, two, three) == true);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

bool areInterwoven(string one, string two, string three, int i, int j);

// O(2^(n + m)) time | O(n + m) space - where n is the length
// of the first string and m is the length of the second string
bool interweavingStrings(string one, string two, string three) {
  if (three.size() != one.size() + two.size()) {
    return false;
  }

  return areInterwoven(one, two, three, 0, 0);
}

bool areInterwoven(string one, string two, string three, int i, int j) {
  int k = i + j;
  if (k == three.size())
    return true;

  if (i < one.size() && one[i] == three[k]) {
    if (areInterwoven(one, two, three, i + 1, j))
      return true;
  }

  if (j < two.size() && two[j] == three[k]) {
    return areInterwoven(one, two, three, i, j + 1);
  }

  return false;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

bool areInterwoven(string one, string two, string three, int i, int j,
                   vector<vector<int>> &cache);

// O(nm) time | O(nm) space - where n is the length of the
// first string and m is the length of the second string
bool interweavingStrings(string one, string two, string three) {
  if (three.size() != one.size() + two.size()) {
    return false;
  }

  vector<vector<int>> cache;
  for (int i = 0; i < one.size() + 1; i++) {
    cache.push_back(vector<int>{});
    for (int j = 0; j < two.size() + 1; j++) {
      cache[i].push_back(-1);
    }
  }

  return areInterwoven(one, two, three, 0, 0, cache);
}

bool areInterwoven(string one, string two, string three, int i, int j,
                   vector<vector<int>> &cache) {
  if (cache[i][j] != -1)
    return cache[i][j];

  int k = i + j;
  if (k == three.size())
    return true;

  if (i < one.size() && one[i] == three[k]) {
    cache[i][j] = areInterwoven(one, two, three, i + 1, j, cache);
    if (cache[i][j] == true)
      return true;
  }

  if (j < two.size() && two[j] == three[k]) {
    cache[i][j] = areInterwoven(one, two, three, i, j + 1, cache);
    return cache[i][j];
  }

  cache[i][j] = false;
  return false;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      string one = "algoexpert";
      string two = "your-dream-job";
      string three = "your-algodream-expertjob";
      assert(interweavingStrings(one, two, three) == true);
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
		string one = "algoexpert";
		string two = "your-dream-job";
		string three = "your-algodream-expertjob";
		Utils.AssertTrue(Program.Interweavingstrings(one, two, three) == true);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(2^(n + m)) time | O(n + m) space - where n is the length
	// of the first string and m is the length of the second string
	public static bool Interweavingstrings(string one, string two, string three) {
		if (three.Length != one.Length + two.Length) {
			return false;
		}

		return areInterwoven(one, two, three, 0, 0);
	}

	public static bool areInterwoven(string one, string two, string three, int i, int j) {
		int k = i + j;
		if (k == three.Length) return true;

		if (i < one.Length && one[i] == three[k]) {
			if (areInterwoven(one, two, three, i + 1, j)) return true;
		}

		if (j < two.Length && two[j] == three[k]) {
			return areInterwoven(one, two, three, i, j + 1);
		}

		return false;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(nm) time | O(nm) space - where n is the length of the
	// first string and m is the length of the second string
	public static bool Interweavingstrings(string one, string two, string three) {
		if (three.Length != one.Length + two.Length) {
			return false;
		}

		bool?[,] cache = new bool?[one.Length+1, two.Length+1];
		return areInterwoven(one, two, three, 0, 0, cache);
	}

	public static bool areInterwoven(string one, string two, string three, int i, int j,
	  bool?[,] cache) {
		if (cache[i,j].HasValue) {
			return cache[i,j].Value;
		}

		int k = i + j;
		if (k == three.Length) {
			return true;
		}

		if (i < one.Length && one[i] == three[k]) {
			cache[i,j] = areInterwoven(one, two, three, i + 1, j, cache);
			if (cache[i,j].HasValue && cache[i,j].Value) {
				return true;
			}
		}

		if (j < two.Length && two[j] == three[k]) {
			cache[i,j] = areInterwoven(one, two, three, i, j + 1, cache);
			return cache[i,j].Value;
		}

		cache[i,j] = false;
		return false;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		string one = "algoexpert";
		string two = "your-dream-job";
		string three = "your-algodream-expertjob";
		Utils.AssertTrue(Program.Interweavingstrings(one, two, three) == true);
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
	one := "algoexpert"
	two := "your-dream-job"
	three := "your-algodream-expertjob"
	require.Equal(t, InterweavingStrings(one, two, three), true)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(2^(n + m)) time | O(n + m) space - where n is the length
// of the first string and m is the length of the second string
func InterweavingStrings(one, two, three string) bool {
	if len(three) != len(one)+len(two) {
		return false
	}
	return areInterwoven(one, two, three, 0, 0)
}

func areInterwoven(one, two, three string, i, j int) bool {
	k := i + j
	if k == len(three) {
		return true
	}

	if i < len(one) && one[i] == three[k] {
		if areInterwoven(one, two, three, i+1, j) {
			return true
		}
	}

	if j < len(two) && two[j] == three[k] {
		return areInterwoven(one, two, three, i, j+1)
	}
	return false
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(nm) time | O(nm) space - where n is the length of the
// first string and m is the length of the second string
func InterweavingStrings(one, two, three string) bool {
	if len(three) != len(one)+len(two) {
		return false
	}
	cache := make([][]*bool, len(one)+1)
	for i := 0; i < len(one)+1; i++ {
		cache[i] = make([]*bool, len(two)+1)
	}
	return areInterwoven(one, two, three, 0, 0, cache)
}

func areInterwoven(one, two, three string, i, j int, cache [][]*bool) bool {
	if cache[i][j] != nil {
		return *cache[i][j]
	}

	k := i + j
	if k == len(three) {
		return true
	}

	if i < len(one) && one[i] == three[k] {
		result := areInterwoven(one, two, three, i+1, j, cache)
		cache[i][j] = &result
		if result {
			return true
		}
	}

	if j < len(two) && two[j] == three[k] {
		result := areInterwoven(one, two, three, i, j+1, cache)
		cache[i][j] = &result
		return result
	}

	result := false
	cache[i][j] = &result
	return result
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	one := "algoexpert"
	two := "your-dream-job"
	three := "your-algodream-expertjob"
	require.Equal(t, InterweavingStrings(one, two, three), true)
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
    String one = "algoexpert";
    String two = "your-dream-job";
    String three = "your-algodream-expertjob";
    Utils.assertTrue(Program.interweavingStrings(one, two, three) == true);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(2^(n + m)) time | O(n + m) space - where n is the length
  // of the first string and m is the length of the second string
  public static boolean interweavingStrings(String one, String two, String three) {
    if (three.length() != one.length() + two.length()) {
      return false;
    }

    return areInterwoven(one, two, three, 0, 0);
  }

  public static boolean areInterwoven(String one, String two, String three, int i, int j) {
    int k = i + j;
    if (k == three.length()) return true;

    if (i < one.length() && one.charAt(i) == three.charAt(k)) {
      if (areInterwoven(one, two, three, i + 1, j)) return true;
    }

    if (j < two.length() && two.charAt(j) == three.charAt(k)) {
      return areInterwoven(one, two, three, i, j + 1);
    }

    return false;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(nm) time | O(nm) space - where n is the length of the
  // first string and m is the length of the second string
  public static boolean interweavingStrings(String one, String two, String three) {
    if (three.length() != one.length() + two.length()) {
      return false;
    }

    Boolean[][] cache = new Boolean[one.length() + 1][two.length() + 1];
    return areInterwoven(one, two, three, 0, 0, cache);
  }

  public static boolean areInterwoven(
      String one, String two, String three, int i, int j, Boolean[][] cache) {
    if (cache[i][j] != null) return cache[i][j];

    int k = i + j;
    if (k == three.length()) {
      return true;
    }

    if (i < one.length() && one.charAt(i) == three.charAt(k)) {
      cache[i][j] = areInterwoven(one, two, three, i + 1, j, cache);
      if (cache[i][j]) return true;
    }

    if (j < two.length() && two.charAt(j) == three.charAt(k)) {
      var result = areInterwoven(one, two, three, i, j + 1, cache);
      cache[i][j] = result;
      return result;
    }

    cache[i][j] = false;
    return false;
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    String one = "algoexpert";
    String two = "your-dream-job";
    String three = "your-algodream-expertjob";
    Utils.assertTrue(Program.interweavingStrings(one, two, three) == true);
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
  const one = 'algoexpert';
  const two = 'your-dream-job';
  const three = 'your-algodream-expertjob';
  chai.expect(program.interweavingStrings(one, two, three)).to.deep.equal(true);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(2^(n + m)) time | O(n + m) space - where n is the length
// of the first string and m is the length of the second string
function interweavingStrings(one, two, three) {
  if (three.length !== one.length + two.length) {
    return false;
  }

  return areInterwoven(one, two, three, 0, 0);
}

function areInterwoven(one, two, three, i, j) {
  const k = i + j;
  if (k === three.length) return true;

  if (i < one.length && one[i] === three[k]) {
    if (areInterwoven(one, two, three, i + 1, j)) return true;
  }

  if (j < two.length && two[j] === three[k]) {
    return areInterwoven(one, two, three, i, j + 1);
  }

  return false;
}

exports.interweavingStrings = interweavingStrings;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nm) time | O(nm) space - where n is the length of the
// first string and m is the length of the second string
function interweavingStrings(one, two, three) {
  if (three.length !== one.length + two.length) {
    return false;
  }

  const cache = new Array(one.length + 1).fill(0).map(_ => new Array(two.length + 1).fill(null));
  return areInterwoven(one, two, three, 0, 0, cache);
}

function areInterwoven(one, two, three, i, j, cache) {
  if (cache[i][j] !== null) return cache[i][j];

  const k = i + j;
  if (k === three.length) return true;

  if (i < one.length && one[i] === three[k]) {
    cache[i][j] = areInterwoven(one, two, three, i + 1, j, cache);
    if (cache[i][j]) return true;
  }

  if (j < two.length && two[j] === three[k]) {
    cache[i][j] = areInterwoven(one, two, three, i, j + 1, cache);
    return cache[i][j];
  }

  cache[i][j] = false;
  return false;
}

exports.interweavingStrings = interweavingStrings;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const one = 'algoexpert';
  const two = 'your-dream-job';
  const three = 'your-algodream-expertjob';
  chai.expect(program.interweavingStrings(one, two, three)).to.deep.equal(true);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.interweavingStrings as interweavingStrings

class ProgramTest {
    @Test
    fun TestCase1() {
        val one = "algoexpert"
        val two = "your-dream-job"
        val three = "your-algodream-expertjob"
        assert(interweavingStrings(one, two, three))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(2^(n + m)) time | O(n + m) space - where n is the length
// of the first string and m is the length of the second string
fun interweavingStrings(one: String, two: String, three: String): Boolean {
    if (three.length != one.length + two.length) {
        return false
    }

    return areInterwoven(one, two, three, 0, 0)
}

fun areInterwoven(one: String, two: String, three: String, i: Int, j: Int): Boolean {
    val k = i + j
    if (k == three.length) return true

    if (i < one.length && one[i] == three[k]) {
        if (areInterwoven(one, two, three, i + 1, j)) return true
    }

    if (j < two.length && two[j] == three[k]) {
        return areInterwoven(one, two, three, i, j + 1)
    }

    return false
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(nm) time | O(nm) space - where n is the length of the
// first string and m is the length of the second string
fun interweavingStrings(one: String, two: String, three: String): Boolean {
    if (three.length !== one.length + two.length) {
        return false
    }

    val cache = List(one.length + 1, { MutableList<Boolean?>(two.length + 1, { null }) })
    return areInterwoven(one, two, three, 0, 0, cache)
}

fun areInterwoven(one: String, two: String, three: String, i: Int, j: Int, cache: List<MutableList<Boolean?>>): Boolean {
    if (cache[i][j] !== null) return cache[i][j]!!

    val k = i + j
    if (k == three.length) return true

    if (i < one.length && one[i] == three[k]) {
        cache[i][j] = areInterwoven(one, two, three, i + 1, j, cache)
        if (cache[i][j]!!) return true
    }

    if (j < two.length && two[j] == three[k]) {
        cache[i][j] = areInterwoven(one, two, three, i, j + 1, cache)
        return cache[i][j]!!
    }

    cache[i][j] = false
    return false
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.interweavingStrings as interweavingStrings

class ProgramTest {
    @Test
    fun TestCase1() {
        val one = "algoexpert"
        val two = "your-dream-job"
        val three = "your-algodream-expertjob"
        assert(interweavingStrings(one, two, three))
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
      let one = "algoexpert"
      let two = "your-dream-job"
      let three = "your-algodream-expertjob"
      let result = program.interweavingStrings(one, two, three)
      try assertEqual(true, result)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(2^(n + m)) time | O(n + m) space - where n is the length
  // of the first string and m is the length of the second string
  func interweavingStrings(_ one: String, _ two: String, _ three: String) -> Bool {
    if three.length != one.length + two.length {
      return false
    }
    return areInterwoven(one, two, three, 0, 0)
  }

  func areInterwoven(_ one: String, _ two: String, _ three: String, _ i: Int, _ j: Int) -> Bool {
    let k = i + j
    if k == three.length {
      return true
    }

    let oneI = one.index(one.startIndex, offsetBy: i)
    let twoJ = two.index(two.startIndex, offsetBy: j)
    let threeK = three.index(three.startIndex, offsetBy: k)
    if i < one.length, one[oneI] == three[threeK] {
      if areInterwoven(one, two, three, i + 1, j) {
        return true
      }
    }

    if j < two.length, two[twoJ] == three[threeK] {
      return areInterwoven(one, two, three, i, j + 1)
    }

    return false
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nm) time | O(nm) space - where n is the length of the
  // first string and m is the length of the second string
  func interweavingStrings(_ one: String, _ two: String, _ three: String) -> Bool {
    if three.length != one.length + two.length {
      return false
    }
    var cache: [[Bool?]] = Array(repeating: Array(repeating: nil, count: two.length + 1), count: one.length + 1)
    return areInterwoven(one, two, three, 0, 0, &cache)
  }

  func areInterwoven(_ one: String, _ two: String, _ three: String, _ i: Int, _ j: Int, _ cache: inout [[Bool?]]) -> Bool {
    if let result = cache[i][j] {
      return result
    }

    let k = i + j
    if k == three.length {
      return true
    }

    let oneI = one.index(one.startIndex, offsetBy: i)
    let twoJ = two.index(two.startIndex, offsetBy: j)
    let threeK = three.index(three.startIndex, offsetBy: k)
    if i < one.length, one[oneI] == three[threeK] {
      let result = areInterwoven(one, two, three, i + 1, j, &cache)
      cache[i][j] = result
      if result {
        return true
      }
    }

    if j < two.length, two[twoJ] == three[threeK] {
      let result = areInterwoven(one, two, three, i, j + 1, &cache)
      cache[i][j] = result
      return result
    }

    cache[i][j] = false
    return false
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let one = "algoexpert"
      let two = "your-dream-job"
      let three = "your-algodream-expertjob"
      let result = program.interweavingStrings(one, two, three)
      try assertEqual(true, result)
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
        one = "algoexpert"
        two = "your-dream-job"
        three = "your-algodream-expertjob"
        self.assertEqual(program.interweavingStrings(one, two, three), True)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(2^(n + m)) time | O(n + m) space - where n is the length
# of the first string and m is the length of the second string
def interweavingStrings(one, two, three):
    if len(three) != len(one) + len(two):
        return False

    return areInterwoven(one, two, three, 0, 0)


def areInterwoven(one, two, three, i, j):
    k = i + j
    if k == len(three):
        return True

    if i < len(one) and one[i] == three[k]:
        if areInterwoven(one, two, three, i + 1, j):
            return True

    if j < len(two) and two[j] == three[k]:
        return areInterwoven(one, two, three, i, j + 1)

    return False

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nm) time | O(nm) space - where n is the length of the
# first string and m is the length of the second string
def interweavingStrings(one, two, three):
    if len(three) != len(one) + len(two):
        return False

    cache = [[None for j in range(len(two) + 1)] for i in range(len(one) + 1)]
    return areInterwoven(one, two, three, 0, 0, cache)


def areInterwoven(one, two, three, i, j, cache):
    if cache[i][j] is not None:
        return cache[i][j]

    k = i + j
    if k == len(three):
        return True

    if i < len(one) and one[i] == three[k]:
        cache[i][j] = areInterwoven(one, two, three, i + 1, j, cache)
        if cache[i][j]:
            return True

    if j < len(two) and two[j] == three[k]:
        cache[i][j] = areInterwoven(one, two, three, i, j + 1, cache)
        return cache[i][j]

    cache[i][j] = False
    return False

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        one = "algoexpert"
        two = "your-dream-job"
        three = "your-algodream-expertjob"
        self.assertEqual(program.interweavingStrings(one, two, three), True)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const one = 'algoexpert';
  const two = 'your-dream-job';
  const three = 'your-algodream-expertjob';
  chai.expect(program.interweavingStrings(one, two, three)).to.deep.equal(true);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(2^(n + m)) time | O(n + m) space - where n is the length
// of the first string and m is the length of the second string
export function interweavingStrings(one: string, two: string, three: string) {
  if (three.length !== one.length + two.length) {
    return false;
  }

  return areInterwoven(one, two, three, 0, 0);
}

function areInterwoven(one: string, two: string, three: string, i: number, j: number): boolean {
  const k = i + j;
  if (k === three.length) return true;

  if (i < one.length && one[i] === three[k]) {
    if (areInterwoven(one, two, three, i + 1, j)) return true;
  }

  if (j < two.length && two[j] === three[k]) {
    return areInterwoven(one, two, three, i, j + 1);
  }

  return false;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nm) time | O(nm) space - where n is the length of the
// first string and m is the length of the second string
export function interweavingStrings(one: string, two: string, three: string) {
  if (three.length !== one.length + two.length) {
    return false;
  }

  const cache: Array<boolean | null>[] = new Array(one.length + 1)
    .fill(0)
    .map(_ => new Array(two.length + 1).fill(null));
  return areInterwoven(one, two, three, 0, 0, cache);
}

function areInterwoven(one: string, two: string, three: string, i: number, j: number, cache: Array<boolean | null>[]) {
  if (cache[i][j] !== null) return cache[i][j];

  const k = i + j;
  if (k === three.length) return true;

  if (i < one.length && one[i] === three[k]) {
    cache[i][j] = areInterwoven(one, two, three, i + 1, j, cache);
    if (cache[i][j]) return true;
  }

  if (j < two.length && two[j] === three[k]) {
    cache[i][j] = areInterwoven(one, two, three, i, j + 1, cache);
    return cache[i][j];
  }

  cache[i][j] = false;
  return false;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const one = 'algoexpert';
  const two = 'your-dream-job';
  const three = 'your-algodream-expertjob';
  chai.expect(program.interweavingStrings(one, two, three)).to.deep.equal(true);
});

```

