# Numbers In Pi
<div class="html">
<p>
  Given a string representation of the first n digits of Pi and a list of
  positive integers (all in string format), write a function that returns the
  smallest number of spaces that can be added to the n digits of Pi such that
  all resulting numbers are found in the list of integers.
</p>
<p>
  Note that a single number can appear multiple times in the resulting numbers.
  For example, if Pi is <span>"3141"</span> and the numbers are
  <span>["1", "3", "4"]</span>, the number <span>"1"</span> is allowed to appear
  twice in the list of resulting numbers after three spaces are added:
  <span>"3 | 1 | 4 | 1"</span>.
</p>
<p>
  If no number of spaces to be added exists such that all resulting numbers are
  found in the list of integers, the function should return
  <span>-1</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">pi</span> = "3141592653589793238462643383279",
<span class="CodeEditor-promptParameter">numbers</span> = ["314159265358979323846", "26433", "8", "3279", "314159265", "35897932384626433832", "79"]
</pre>
<h3>Sample Output</h3>
<pre>
2 <span class="CodeEditor-promptComment">// "314159265 | 35897932384626433832 | 79"</span>
</pre>
</div>

Hint 1
<p>
You'll need to look numbers up quickly; is the input array the best data structure for this?
</p>


Hint 2

<p>
Dump every favorite number in a hash table for fast lookup. Iterate through the digits of Pi, checking if every prefix of the n digits is a favorite number. What should you do if you find that a prefix of the n digits of Pi is a favorite number?
</p>


Hint 3

<p>
Going off of Hint #2, if you find a prefix of the n digits of Pi that is a favorite number, try adding 1 space after it and then recursively calculating the smallest number of spaces in the suffix that comes after it. Do this for every prefix, and you'll find the answer. Can this method be optimized with a cache?
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

string PI = "3141592653589793238462643383279";

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<string> numbers = {
          "314159265358979323846", "26433", "8", "3279", "314159265",
          "35897932384626433832",  "79"};
      assert(numbersInPi(PI, numbers) == 2);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <set>
#include <unordered_map>
#include <algorithm>
#include <climits>
#include <vector>
using namespace std;

int getMinSpaces(string pi, set<string> numbersTable,
                 unordered_map<int, int> *cache, int idx);

// O(n^3 + m) time | O(n + m) space - where n is the number of digits in Pi and
// m is the number of favorite numbers
int numbersInPi(string pi, vector<string> numbers) {
  set<string> numbersTable;
  for (string number : numbers) {
    numbersTable.insert(number);
  }
  unordered_map<int, int> cache;
  int minSpaces = getMinSpaces(pi, numbersTable, &cache, 0);
  return minSpaces == INT_MAX ? -1 : minSpaces;
}

int getMinSpaces(string pi, set<string> numbersTable,
                 unordered_map<int, int> *cache, int idx) {
  if (idx == pi.length())
    return -1;
  if (cache->find(idx) != cache->end())
    return cache->at(idx);
  int minSpaces = INT_MAX;
  for (int i = idx; i < pi.length(); i++) {
    string prefix = pi.substr(idx, i + 1 - idx);
    if (numbersTable.find(prefix) != numbersTable.end()) {
      int minSpacesInSuffix = getMinSpaces(pi, numbersTable, cache, i + 1);
      // Handle int overflow.
      if (minSpacesInSuffix == INT_MAX) {
        minSpaces = min(minSpaces, minSpacesInSuffix);
      } else {
        minSpaces = min(minSpaces, minSpacesInSuffix + 1);
      }
    }
  }
  cache->insert({idx, minSpaces});
  return cache->at(idx);
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <set>
#include <unordered_map>
#include <algorithm>
#include <climits>
#include <vector>
using namespace std;

int getMinSpaces(string pi, set<string> numbersTable,
                 unordered_map<int, int> *cache, int idx);

// O(n^3 + m) time | O(n + m) space - where n is the number of digits in Pi and
// m is the number of favorite numbers
int numbersInPi(string pi, vector<string> numbers) {
  set<string> numbersTable;
  for (string number : numbers) {
    numbersTable.insert(number);
  }
  unordered_map<int, int> cache;
  for (int i = pi.length() - 1; i >= 0; i--) {
    getMinSpaces(pi, numbersTable, &cache, i);
  }
  return cache.at(0) == INT_MAX ? -1 : cache.at(0);
}

int getMinSpaces(string pi, set<string> numbersTable,
                 unordered_map<int, int> *cache, int idx) {
  if (idx == pi.length())
    return -1;
  if (cache->find(idx) != cache->end())
    return cache->at(idx);
  int minSpaces = INT_MAX;
  for (int i = idx; i < pi.length(); i++) {
    string prefix = pi.substr(idx, i + 1 - idx);
    if (numbersTable.find(prefix) != numbersTable.end()) {
      int minSpacesInSuffix = getMinSpaces(pi, numbersTable, cache, i + 1);
      // Handle int overflow.
      if (minSpacesInSuffix == INT_MAX) {
        minSpaces = min(minSpaces, minSpacesInSuffix);
      } else {
        minSpaces = min(minSpaces, minSpacesInSuffix + 1);
      }
    }
  }
  cache->insert({idx, minSpaces});
  return cache->at(idx);
}

```
### Unit Tests 1 (cpp)
```cpp
string PI = "3141592653589793238462643383279";

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<string> numbers = {
          "314159265358979323846", "26433", "8", "3279", "314159265",
          "35897932384626433832",  "79"};
      assert(numbersInPi(PI, numbers) == 2);
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
	string PI = "3141592653589793238462643383279";

	[Test]
	public void TestCase1() {
		string[] numbers =
		  new string[] {"314159265358979323846", "26433", "8", "3279", "314159265",
			        "35897932384626433832", "79"};
		Utils.AssertTrue(Program.NumbersInPi(PI, numbers) == 2);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;

public class Program {
	// O(n^3 + m) time | O(n + m) space - where n is the number of digits in Pi and m is the number of favorite numbers
	public static int NumbersInPi(string pi, string[] numbers) {
		HashSet<string> numbersTable = new HashSet<string>();
		foreach (string number in numbers) {
			numbersTable.Add(number);
		}
		Dictionary<int, int> cache = new Dictionary<int, int>();
		int minSpaces = getMinSpaces(pi, numbersTable, cache, 0);
		return minSpaces == Int32.MaxValue ? -1 : minSpaces;
	}

	public static int getMinSpaces(
		string pi,
		HashSet<string> numbersTable,
		Dictionary<int, int> cache,
		int idx
		) {
		if (idx == pi.Length) return -1;
		if (cache.ContainsKey(idx)) return cache[idx];
		int minSpaces = Int32.MaxValue;
		for (int i = idx; i < pi.Length; i++) {
			string prefix = pi.Substring(idx, i + 1 - idx);
			if (numbersTable.Contains(prefix)) {
				int minSpacesInSuffix =
				  getMinSpaces(pi, numbersTable, cache, i + 1);
				// Handle int overflow.
				if (minSpacesInSuffix == Int32.MaxValue) {
					minSpaces = Math.Min(minSpaces, minSpacesInSuffix);
				} else {
					minSpaces = Math.Min(minSpaces, minSpacesInSuffix + 1);
				}
			}
		}
		cache[idx] = minSpaces;
		return cache[idx];
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;

public class Program {
	// O(n^3 + m) time | O(n + m) space - where n is the number of digits in Pi and m is the number of favorite numbers
	public static int NumbersInPi(string pi, string[] numbers) {
		HashSet<string> numbersTable = new HashSet<string>();
		foreach (string number in numbers) {
			numbersTable.Add(number);
		}
		Dictionary<int, int> cache = new Dictionary<int, int>();
		for (int i = pi.Length - 1; i >= 0; i--) {
			getMinSpaces(pi, numbersTable, cache, i);
		}
		return cache[0] == Int32.MaxValue ? -1 : cache[0];
	}

	public static int getMinSpaces(
		string pi,
		HashSet<string> numbersTable,
		Dictionary<int, int> cache,
		int idx
		) {
		if (idx == pi.Length) return -1;
		if (cache.ContainsKey(idx)) return cache[idx];
		int minSpaces = Int32.MaxValue;
		for (int i = idx; i < pi.Length; i++) {
			string prefix = pi.Substring(idx, i + 1 - idx);
			if (numbersTable.Contains(prefix)) {
				int minSpacesInSuffix =
				  getMinSpaces(pi, numbersTable, cache, i + 1);
				// Handle int overflow.
				if (minSpacesInSuffix == Int32.MaxValue) {
					minSpaces = Math.Min(minSpaces, minSpacesInSuffix);
				} else {
					minSpaces = Math.Min(minSpaces, minSpacesInSuffix + 1);
				}
			}
		}
		cache.Add(idx, minSpaces);
		return cache[idx];
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	string PI = "3141592653589793238462643383279";

	[Test]
	public void TestCase1() {
		string[] numbers =
		  new string[] {"314159265358979323846", "26433", "8", "3279", "314159265",
			        "35897932384626433832", "79"};
		Utils.AssertTrue(Program.NumbersInPi(PI, numbers) == 2);
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

const PI = "3141592653589793238462643383279"

func (s *TestSuite) TestCase1(t *TestCase) {
	numbers := []string{"314159265358979323846", "26433", "8", "3279", "314159265", "35897932384626433832", "79"}
	require.Equal(t, NumbersInPi(PI, numbers), 2)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "math"

// O(n^3 + m) time | O(n + m) space - where n is the number of digits
// in Pi and m is the number of favorite numbers.
func NumbersInPi(pi string, numbers []string) int {
	numbersTable := map[string]bool{}
	for _, number := range numbers {
		numbersTable[number] = true
	}
	minSpaces := getMinSpaces(pi, numbersTable, map[int]int{}, 0)
	if minSpaces == math.MaxInt32 {
		return -1
	}
	return minSpaces
}

func getMinSpaces(pi string, numbersTable map[string]bool,
	cache map[int]int, idx int) int {
	if idx == len(pi) {
		return -1
	} else if val, found := cache[idx]; found {
		return val
	}
	minSpaces := math.MaxInt32
	for i := idx; i < len(pi); i++ {
		prefix := pi[idx : i+1]
		if _, found := numbersTable[prefix]; found {
			minSpacesInSuffix := getMinSpaces(pi, numbersTable, cache, i+1)
			minSpaces = min(minSpaces, minSpacesInSuffix+1)
		}
	}
	cache[idx] = minSpaces
	return cache[idx]
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

import "math"

// O(n^3 + m) time | O(n + m) space - where n is the number of digits
// in Pi and m is the number of favorite numbers.
func NumbersInPi(pi string, numbers []string) int {
	numbersTable := map[string]bool{}
	for _, number := range numbers {
		numbersTable[number] = true
	}

	cache := map[int]int{}
	for i := len(pi) - 1; i >= 0; i-- {
		getMinSpaces(pi, numbersTable, cache, i)
	}

	if cache[0] == math.MaxInt32 {
		return -1
	}
	return cache[0]
}

func getMinSpaces(pi string, numbersTable map[string]bool,
	cache map[int]int, idx int) int {
	if idx == len(pi) {
		return -1
	} else if val, found := cache[idx]; found {
		return val
	}
	minSpaces := math.MaxInt32
	for i := idx; i < len(pi); i++ {
		prefix := pi[idx : i+1]
		if _, found := numbersTable[prefix]; found {
			minSpacesInSuffix := getMinSpaces(pi, numbersTable, cache, i+1)
			minSpaces = min(minSpaces, minSpacesInSuffix+1)
		}
	}
	cache[idx] = minSpaces
	return cache[idx]
}

func min(a, b int) int {
	if a < b {
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

const PI = "3141592653589793238462643383279"

func (s *TestSuite) TestCase1(t *TestCase) {
	numbers := []string{"314159265358979323846", "26433", "8", "3279", "314159265", "35897932384626433832", "79"}
	require.Equal(t, NumbersInPi(PI, numbers), 2)
}

```
### Sandbox Code (java)
```java
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

class ProgramTest {
  String PI = "3141592653589793238462643383279";

  @Test
  public void TestCase1() {
    String[] numbers =
        new String[] {
          "314159265358979323846", "26433", "8", "3279", "314159265", "35897932384626433832", "79"
        };
    Utils.assertTrue(Program.numbersInPi(PI, numbers) == 2);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n^3 + m) time | O(n + m) space - where n is the number of digits in Pi and m is the number of
  // favorite numbers
  public static int numbersInPi(String pi, String[] numbers) {
    Set<String> numbersTable = new HashSet<String>();
    for (String number : numbers) {
      numbersTable.add(number);
    }
    Map<Integer, Integer> cache = new HashMap<Integer, Integer>();
    int minSpaces = getMinSpaces(pi, numbersTable, cache, 0);
    return minSpaces == Integer.MAX_VALUE ? -1 : minSpaces;
  }

  public static int getMinSpaces(
      String pi, Set<String> numbersTable, Map<Integer, Integer> cache, int idx) {
    if (idx == pi.length()) return -1;
    if (cache.containsKey(idx)) return cache.get(idx);
    int minSpaces = Integer.MAX_VALUE;
    for (int i = idx; i < pi.length(); i++) {
      String prefix = pi.substring(idx, i + 1);
      if (numbersTable.contains(prefix)) {
        int minSpacesInSuffix = getMinSpaces(pi, numbersTable, cache, i + 1);
        // Handle int overflow.
        if (minSpacesInSuffix == Integer.MAX_VALUE) {
          minSpaces = Math.min(minSpaces, minSpacesInSuffix);
        } else {
          minSpaces = Math.min(minSpaces, minSpacesInSuffix + 1);
        }
      }
    }
    cache.put(idx, minSpaces);
    return cache.get(idx);
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n^3 + m) time | O(n + m) space - where n is the number of digits in Pi and m is the number of
  // favorite numbers
  public static int numbersInPi(String pi, String[] numbers) {
    Set<String> numbersTable = new HashSet<String>();
    for (String number : numbers) {
      numbersTable.add(number);
    }
    Map<Integer, Integer> cache = new HashMap<Integer, Integer>();
    for (int i = pi.length() - 1; i >= 0; i--) {
      getMinSpaces(pi, numbersTable, cache, i);
    }
    return cache.get(0) == Integer.MAX_VALUE ? -1 : cache.get(0);
  }

  public static int getMinSpaces(
      String pi, Set<String> numbersTable, Map<Integer, Integer> cache, int idx) {
    if (idx == pi.length()) return -1;
    if (cache.containsKey(idx)) return cache.get(idx);
    int minSpaces = Integer.MAX_VALUE;
    for (int i = idx; i < pi.length(); i++) {
      String prefix = pi.substring(idx, i + 1);
      if (numbersTable.contains(prefix)) {
        int minSpacesInSuffix = getMinSpaces(pi, numbersTable, cache, i + 1);
        // Handle int overflow.
        if (minSpacesInSuffix == Integer.MAX_VALUE) {
          minSpaces = Math.min(minSpaces, minSpacesInSuffix);
        } else {
          minSpaces = Math.min(minSpaces, minSpacesInSuffix + 1);
        }
      }
    }
    cache.put(idx, minSpaces);
    return cache.get(idx);
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  String PI = "3141592653589793238462643383279";

  @Test
  public void TestCase1() {
    String[] numbers =
        new String[] {
          "314159265358979323846", "26433", "8", "3279", "314159265", "35897932384626433832", "79"
        };
    Utils.assertTrue(Program.numbersInPi(PI, numbers) == 2);
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

const PI = '3141592653589793238462643383279';

it('Test Case #1', function () {
  const numbers = ['314159265358979323846', '26433', '8', '3279', '314159265', '35897932384626433832', '79'];
  chai.expect(program.numbersInPi(PI, numbers)).to.deep.equal(2);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^3 + m) time | O(n + m) space - where n is the number of digits in Pi and m is the number of favorite numbers
function numbersInPi(pi, numbers) {
  const numbersTable = {};
  for (const number of numbers) {
    numbersTable[number] = true;
  }
  const minSpaces = getMinSpaces(pi, numbersTable, {}, 0);
  return minSpaces === Infinity ? -1 : minSpaces;
}

function getMinSpaces(pi, numbersTable, cache, idx) {
  if (idx === pi.length) return -1;
  if (idx in cache) return cache[idx];
  let minSpaces = Infinity;
  for (let i = idx; i < pi.length; i++) {
    const prefix = pi.slice(idx, i + 1);
    if (prefix in numbersTable) {
      const minSpacesInSuffix = getMinSpaces(pi, numbersTable, cache, i + 1);
      minSpaces = Math.min(minSpaces, minSpacesInSuffix + 1);
    }
  }
  cache[idx] = minSpaces;
  return cache[idx];
}

exports.numbersInPi = numbersInPi;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^3 + m) time | O(n + m) space - where n is the number of digits in Pi and m is the number of favorite numbers
function numbersInPi(pi, numbers) {
  const numbersTable = {};
  for (const number of numbers) {
    numbersTable[number] = true;
  }
  const cache = {};
  for (let i = pi.length - 1; i >= 0; i--) {
    getMinSpaces(pi, numbersTable, cache, i);
  }
  return cache[0] === Infinity ? -1 : cache[0];
}

function getMinSpaces(pi, numbersTable, cache, idx) {
  if (idx === pi.length) return -1;
  if (idx in cache) return cache[idx];
  let minSpaces = Infinity;
  for (let i = idx; i < pi.length; i++) {
    const prefix = pi.slice(idx, i + 1);
    if (prefix in numbersTable) {
      const minSpacesInSuffix = getMinSpaces(pi, numbersTable, cache, i + 1);
      minSpaces = Math.min(minSpaces, minSpacesInSuffix + 1);
    }
  }
  cache[idx] = minSpaces;
  return cache[idx];
}

exports.numbersInPi = numbersInPi;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

const PI = '3141592653589793238462643383279';

it('Test Case #1', function () {
  const numbers = ['314159265358979323846', '26433', '8', '3279', '314159265', '35897932384626433832', '79'];
  chai.expect(program.numbersInPi(PI, numbers)).to.deep.equal(2);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.numbersInPi

val PI = "3141592653589793238462643383279"

class ProgramTest {
    @Test
    fun TestCase1() {
        val numbers = listOf("314159265358979323846", "26433", "8", "3279", "314159265", "35897932384626433832", "79")
        assert(numbersInPi(PI, numbers) == 2)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^3 + m) time | O(n + m) space - where n is the number of digits in Pi and m is the number of
// favorite numbers
fun numbersInPi(pi: String, numbers: List<String>): Int {
    val numbersTable = mutableSetOf<String>()
    for (number in numbers) {
        numbersTable.add(number)
    }
    val cache = mutableMapOf<Int, Int>()
    val minSpaces = getMinSpaces(pi, numbersTable, cache, 0)
    return if (minSpaces == Int.MAX_VALUE) -1 else minSpaces
}

fun getMinSpaces(pi: String, numbersTable: Set<String>, cache: MutableMap<Int, Int>, idx: Int): Int {
    if (idx == pi.length) return -1
    if (cache.containsKey(idx)) return cache[idx]!!
    var minSpaces = Int.MAX_VALUE

    for (i in idx until pi.length) {
        val prefix = pi.substring(idx, i + 1)
        if (numbersTable.contains(prefix)) {
            val minSpacesInSuffix = getMinSpaces(pi, numbersTable, cache, i + 1)
            // Handle int overflow.
            if (minSpacesInSuffix == Int.MAX_VALUE) {
                minSpaces = Math.min(minSpaces, minSpacesInSuffix)
            } else {
                minSpaces = Math.min(minSpaces, minSpacesInSuffix + 1)
            }
        }
    }
    cache[idx] = minSpaces
    return cache[idx]!!
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^3 + m) time | O(n + m) space - where n is the number of digits in Pi and m is the number of
// favorite numbers
fun numbersInPi(pi: String, numbers: List<String>): Int {
    val numbersTable = mutableSetOf<String>()
    for (number in numbers) {
        numbersTable.add(number)
    }
    val cache = mutableMapOf<Int, Int>()
    for (i in pi.length - 1 downTo 0) {
        getMinSpaces(pi, numbersTable, cache, i)
    }
    return if (cache[0] == Int.MAX_VALUE) -1 else cache[0]!!
}

fun getMinSpaces(pi: String, numbersTable: Set<String>, cache: MutableMap<Int, Int>, idx: Int): Int {
    if (idx == pi.length) return -1
    if (cache.containsKey(idx)) return cache[idx]!!
    var minSpaces = Int.MAX_VALUE

    for (i in idx until pi.length) {
        val prefix = pi.substring(idx, i + 1)
        if (numbersTable.contains(prefix)) {
            val minSpacesInSuffix = getMinSpaces(pi, numbersTable, cache, i + 1)
            // Handle int overflow.
            if (minSpacesInSuffix == Int.MAX_VALUE) {
                minSpaces = Math.min(minSpaces, minSpacesInSuffix)
            } else {
                minSpaces = Math.min(minSpaces, minSpacesInSuffix + 1)
            }
        }
    }
    cache[idx] = minSpaces
    return cache[idx]!!
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.numbersInPi

val PI = "3141592653589793238462643383279"

class ProgramTest {
    @Test
    fun TestCase1() {
        val numbers = listOf("314159265358979323846", "26433", "8", "3279", "314159265", "35897932384626433832", "79")
        assert(numbersInPi(PI, numbers) == 2)
    }
}

```
### Sandbox Code (swift)
```swift
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

class ProgramTest: TestSuite {
  let pi = "3141592653589793238462643383279"

  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let input = ["314159265358979323846", "26433", "8", "3279", "314159265", "35897932384626433832", "79"]
      try assertEqual(2, program.numbersInPi(pi, input))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^3 + m) time | O(n + m) space
  func numbersInPi(_ pi: String, _ favoriteNumbers: [String]) -> Int {
    var numbersDictionary = [String: Bool]()

    for number in favoriteNumbers {
      numbersDictionary[number] = true
    }

    var cache = [Int: Int]()

    let minimumNumberOfSpaces = getMinimumNumberOfSpaces(pi, numbersDictionary, &cache, 0)

    if minimumNumberOfSpaces == Int(Int32.max) {
      return -1
    } else {
      return minimumNumberOfSpaces
    }
  }

  func getMinimumNumberOfSpaces(_ pi: String, _ numbersDictionary: [String: Bool], _ cache: inout [Int: Int], _ index: Int) -> Int {
    if index == pi.count {
      return -1
    }

    if let minimumNumberOfSpaces = cache[index] {
      return minimumNumberOfSpaces
    }

    var minimumNumberOfSpaces = Int(Int32.max)

    for i in index ..< pi.count {
      let startingIndex = pi.index(pi.startIndex, offsetBy: index)

      let endingIndex = pi.index(pi.startIndex, offsetBy: i + 1)

      let prefix = String(pi[startingIndex ..< endingIndex])

      if numbersDictionary.keys.contains(prefix) {
        let minimumNumberOfSpacesInSuffix = getMinimumNumberOfSpaces(pi, numbersDictionary, &cache, i + 1)

        minimumNumberOfSpaces = min(minimumNumberOfSpaces, minimumNumberOfSpacesInSuffix + 1)
      }
    }

    cache[index] = minimumNumberOfSpaces

    return minimumNumberOfSpaces
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^3 + m) time | O(n + m) space
  func numbersInPi(_ pi: String, _ favoriteNumbers: [String]) -> Int {
    var numbersDictionary = [String: Bool]()

    for number in favoriteNumbers {
      numbersDictionary[number] = true
    }

    var cache = [Int: Int]()

    for i in stride(from: pi.count - 1, through: 0, by: -1) {
      getMinimumNumberOfSpaces(pi, numbersDictionary, &cache, i)
    }

    if cache[0] == Int(Int32.max) {
      return -1
    } else {
      return cache[0]!
    }
  }

  func getMinimumNumberOfSpaces(_ pi: String, _ numbersDictionary: [String: Bool], _ cache: inout [Int: Int], _ index: Int) -> Int {
    if index == pi.count {
      return -1
    }

    if let minimumNumberOfSpaces = cache[index] {
      return minimumNumberOfSpaces
    }

    var minimumNumberOfSpaces = Int(Int32.max)

    for i in index ..< pi.count {
      let startingIndex = pi.index(pi.startIndex, offsetBy: index)

      let endingIndex = pi.index(pi.startIndex, offsetBy: i + 1)

      let prefix = String(pi[startingIndex ..< endingIndex])

      if numbersDictionary.keys.contains(prefix) {
        let minimumNumberOfSpacesInSuffix = getMinimumNumberOfSpaces(pi, numbersDictionary, &cache, i + 1)

        minimumNumberOfSpaces = min(minimumNumberOfSpaces, minimumNumberOfSpacesInSuffix + 1)
      }
    }

    cache[index] = minimumNumberOfSpaces

    return minimumNumberOfSpaces
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  let pi = "3141592653589793238462643383279"

  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let input = ["314159265358979323846", "26433", "8", "3279", "314159265", "35897932384626433832", "79"]
      try assertEqual(2, program.numbersInPi(pi, input))
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


PI = "3141592653589793238462643383279"


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        numbers = ["314159265358979323846", "26433", "8", "3279", "314159265", "35897932384626433832", "79"]
        self.assertEqual(program.numbersInPi(PI, numbers), 2)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^3 + m) time | O(n + m) space - where n is the number of digits in Pi and m is the number of favorite numbers
def numbersInPi(pi, numbers):
    numbersTable = {number: True for number in numbers}
    minSpaces = getMinSpaces(pi, numbersTable, {}, 0)
    return -1 if minSpaces == float("inf") else minSpaces


def getMinSpaces(pi, numbersTable, cache, idx):
    if idx == len(pi):
        return -1
    if idx in cache:
        return cache[idx]
    minSpaces = float("inf")
    for i in range(idx, len(pi)):
        prefix = pi[idx : i + 1]
        if prefix in numbersTable:
            minSpacesInSuffix = getMinSpaces(pi, numbersTable, cache, i + 1)
            minSpaces = min(minSpaces, minSpacesInSuffix + 1)
    cache[idx] = minSpaces
    return cache[idx]

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^3 + m) time | O(n + m) space - where n is the number of digits in Pi and m is the number of favorite numbers
def numbersInPi(pi, numbers):
    numbersTable = {number: True for number in numbers}
    cache = {}
    for i in reversed(range(len(pi))):
        getMinSpaces(pi, numbersTable, cache, i)
    return -1 if cache[0] == float("inf") else cache[0]


def getMinSpaces(pi, numbersTable, cache, idx):
    if idx == len(pi):
        return -1
    if idx in cache:
        return cache[idx]
    minSpaces = float("inf")
    for i in range(idx, len(pi)):
        prefix = pi[idx : i + 1]
        if prefix in numbersTable:
            minSpacesInSuffix = getMinSpaces(pi, numbersTable, cache, i + 1)
            minSpaces = min(minSpaces, minSpacesInSuffix + 1)
    cache[idx] = minSpaces
    return cache[idx]

```
### Unit Tests 1 (python)
```python
import program
import unittest


PI = "3141592653589793238462643383279"


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        numbers = ["314159265358979323846", "26433", "8", "3279", "314159265", "35897932384626433832", "79"]
        self.assertEqual(program.numbersInPi(PI, numbers), 2)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

const PI = '3141592653589793238462643383279';

it('Test Case #1', function () {
  const numbers = ['314159265358979323846', '26433', '8', '3279', '314159265', '35897932384626433832', '79'];
  chai.expect(program.numbersInPi(PI, numbers)).to.deep.equal(2);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

interface NumbersTable {
  [key: string]: boolean;
}

interface Cache {
  [key: number]: number;
}

// O(n^3 + m) time | O(n + m) space - where n is the number of digits in Pi and m is the number of favorite numbers
export function numbersInPi(pi: string, numbers: string[]) {
  const numbersTable: NumbersTable = {};
  for (const number of numbers) {
    numbersTable[number] = true;
  }
  const minSpaces = getMinSpaces(pi, numbersTable, {}, 0);
  return minSpaces === Infinity ? -1 : minSpaces;
}

function getMinSpaces(pi: string, numbersTable: NumbersTable, cache: Cache, idx: number) {
  if (idx === pi.length) return -1;
  if (idx in cache) return cache[idx];
  let minSpaces = Infinity;
  for (let i = idx; i < pi.length; i++) {
    const prefix = pi.slice(idx, i + 1);
    if (prefix in numbersTable) {
      const minSpacesInSuffix = getMinSpaces(pi, numbersTable, cache, i + 1);
      minSpaces = Math.min(minSpaces, minSpacesInSuffix + 1);
    }
  }
  cache[idx] = minSpaces;
  return cache[idx];
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

interface NumbersTable {
  [key: string]: boolean;
}

interface Cache {
  [key: number]: number;
}

// O(n^3 + m) time | O(n + m) space - where n is the number of digits in Pi and m is the number of favorite numbers
export function numbersInPi(pi: string, numbers: string[]) {
  const numbersTable: NumbersTable = {};
  for (const number of numbers) {
    numbersTable[number] = true;
  }
  const cache: Cache = {};
  for (let i = pi.length - 1; i >= 0; i--) {
    getMinSpaces(pi, numbersTable, cache, i);
  }
  return cache[0] === Infinity ? -1 : cache[0];
}

function getMinSpaces(pi: string, numbersTable: NumbersTable, cache: Cache, idx: number) {
  if (idx === pi.length) return -1;
  if (idx in cache) return cache[idx];
  let minSpaces = Infinity;
  for (let i = idx; i < pi.length; i++) {
    const prefix = pi.slice(idx, i + 1);
    if (prefix in numbersTable) {
      const minSpacesInSuffix = getMinSpaces(pi, numbersTable, cache, i + 1);
      minSpaces = Math.min(minSpaces, minSpacesInSuffix + 1);
    }
  }
  cache[idx] = minSpaces;
  return cache[idx];
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

const PI = '3141592653589793238462643383279';

it('Test Case #1', function () {
  const numbers = ['314159265358979323846', '26433', '8', '3279', '314159265', '35897932384626433832', '79'];
  chai.expect(program.numbersInPi(PI, numbers)).to.deep.equal(2);
});

```

