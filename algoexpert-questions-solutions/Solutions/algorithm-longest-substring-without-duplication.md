# Longest Substring Without Duplication
<div class="html">
<p>
  Write a function that takes in a string and returns its longest substring
  without duplicate characters.
</p>
<p>You can assume that there will only be one longest substring without duplication.</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">string</span> = "clementisacap"
</pre>
<h3>Sample Output</h3>
<pre>
"mentisac"
</pre>
</div>

Hint 1
<p>
Try traversing the input string and storing the last position at which you see each character in a hash table. How can this help you solve the given problem?
</p>


Hint 2

<p>
As you traverse the input string, keep track of a starting index variable. This variable, as its name suggests, should represent the most recent index from which you could start a substring with no duplicate characters, ending at your current index. Use the hash table mentioned in Hint #1 to update this variable correctly, and update the longest substring as you go.
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
      assert(longestSubstringWithoutDuplication("clementisacap") == "mentisac");
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <unordered_map>
#include <vector>
using namespace std;

// O(n) time | O(min(n, a)) space
string longestSubstringWithoutDuplication(string str) {
  unordered_map<char, int> lastSeen;
  vector<int> longest{0, 1};
  int startIdx = 0;
  for (int i = 0; i < str.length(); i++) {
    char character = str[i];
    if (lastSeen.find(character) != lastSeen.end()) {
      startIdx = max(startIdx, lastSeen[character] + 1);
    }
    if (longest[1] - longest[0] < i + 1 - startIdx) {
      longest = {startIdx, i + 1};
    }
    lastSeen[character] = i;
  }
  string result = str.substr(longest[0], longest[1] - longest[0]);
  return result;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      assert(longestSubstringWithoutDuplication("clementisacap") == "mentisac");
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
		Utils.AssertTrue(Program.LongestSubstringWithoutDuplication("clementisacap").Equals(
			  "mentisac"));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;

public class Program {
	// O(n) time | O(min(n, a)) space
	public static string LongestSubstringWithoutDuplication(string str) {
		Dictionary<char, int> lastSeen = new Dictionary<char, int>();
		int[] longest = {0, 1};
		int startIdx = 0;
		for (int i = 0; i < str.Length; i++) {
			char c = str[i];
			if (lastSeen.ContainsKey(c)) {
				startIdx = Math.Max(startIdx, lastSeen[c] + 1);
			}
			if (longest[1] - longest[0] < i + 1 - startIdx) {
				longest = new int[] {startIdx, i + 1};
			}
			lastSeen[c] = i;
		}
		string result = str.Substring(longest[0], longest[1] - longest[0]);
		return result;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		Utils.AssertTrue(Program.LongestSubstringWithoutDuplication("clementisacap").Equals(
			  "mentisac"));
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
	expected := "mentisac"
	output := LongestSubstringWithoutDuplication("clementisacap")
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type substring struct {
	left  int
	right int
}

func (ss substring) length() int { return ss.right - ss.left }

// O(n) time | O(min(n, a)) space
func LongestSubstringWithoutDuplication(str string) string {
	lastSeen := map[rune]int{}
	longest := substring{0, 1}
	startIndex := 0
	for i, char := range str {
		if seenIndex, found := lastSeen[char]; found &&
			startIndex < seenIndex+1 {
			startIndex = seenIndex + 1
		}
		if longest.length() < i+1-startIndex {
			longest = substring{startIndex, i + 1}
		}
		lastSeen[char] = i
	}
	return str[longest.left:longest.right]
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := "mentisac"
	output := LongestSubstringWithoutDuplication("clementisacap")
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
    Utils.assertTrue(
        Program.longestSubstringWithoutDuplication("clementisacap").equals("mentisac"));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(min(n, a)) space
  public static String longestSubstringWithoutDuplication(String str) {
    Map<Character, Integer> lastSeen = new HashMap<Character, Integer>();
    int[] longest = {0, 1};
    int startIdx = 0;
    for (int i = 0; i < str.length(); i++) {
      char c = str.charAt(i);
      if (lastSeen.containsKey(c)) {
        startIdx = Math.max(startIdx, lastSeen.get(c) + 1);
      }
      if (longest[1] - longest[0] < i + 1 - startIdx) {
        longest = new int[] {startIdx, i + 1};
      }
      lastSeen.put(c, i);
    }
    String result = str.substring(longest[0], longest[1]);
    return result;
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    Utils.assertTrue(
        Program.longestSubstringWithoutDuplication("clementisacap").equals("mentisac"));
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
  chai.expect(program.longestSubstringWithoutDuplication('clementisacap')).to.deep.equal('mentisac');
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(min(n, a)) space
function longestSubstringWithoutDuplication(string) {
  const lastSeen = {};
  let longest = [0, 1];
  let startIdx = 0;
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (char in lastSeen) {
      startIdx = Math.max(startIdx, lastSeen[char] + 1);
    }
    if (longest[1] - longest[0] < i + 1 - startIdx) {
      longest = [startIdx, i + 1];
    }
    lastSeen[char] = i;
  }
  return string.slice(longest[0], longest[1]);
}

exports.longestSubstringWithoutDuplication = longestSubstringWithoutDuplication;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.longestSubstringWithoutDuplication('clementisacap')).to.deep.equal('mentisac');
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.longestSubstringWithoutDuplication as longestSubstringWithoutDuplication

class ProgramTest {
    @Test
    fun TestCase1() {
        assert(longestSubstringWithoutDuplication("clementisacap") == "mentisac")
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(n) time | O(min(n, a)) space
fun longestSubstringWithoutDuplication(string: String): String {
    val lastSeen = mutableMapOf<Char, Int>()
    var longest = Pair(0, 1)
    var startIdx = 0
    for (i in 0 until string.length) {
        val char = string[i]
        if (char in lastSeen) {
            startIdx = max(startIdx, lastSeen[char]!! + 1)
        }
        if (longest.second - longest.first < i + 1 - startIdx) {
            longest = Pair(startIdx, i + 1)
        }
        lastSeen[char] = i
    }
    return string.substring(longest.first, longest.second)
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.longestSubstringWithoutDuplication as longestSubstringWithoutDuplication

class ProgramTest {
    @Test
    fun TestCase1() {
        assert(longestSubstringWithoutDuplication("clementisacap") == "mentisac")
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
      try assertEqual("mentisac", program.longestSubstringWithoutDuplication("clementisacap"))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(min(n, a)) space
  func longestSubstringWithoutDuplication(_ string: String) -> String {
    var startingPointer = 0
    var indicesOfLongestSubstring = [0, 1]
    var indicesDictionary = [Character: Int]()

    for (index, character) in string.enumerated() {
      if let index = indicesDictionary[character] {
        startingPointer = max(startingPointer, index + 1)
      }

      if indicesOfLongestSubstring[1] - indicesOfLongestSubstring[0] < index + 1 - startingPointer {
        indicesOfLongestSubstring = [startingPointer, index + 1]
      }

      indicesDictionary[character] = index
    }

    let start = indicesOfLongestSubstring[0]
    let startingIndex = string.index(string.startIndex, offsetBy: start)

    let end = indicesOfLongestSubstring[1]
    let endingIndex = string.index(string.startIndex, offsetBy: end)

    return String(string[startingIndex ..< endingIndex])
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      try assertEqual("mentisac", program.longestSubstringWithoutDuplication("clementisacap"))
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
        self.assertEqual(program.longestSubstringWithoutDuplication("clementisacap"), "mentisac")

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(min(n, a)) space
def longestSubstringWithoutDuplication(string):
    lastSeen = {}
    longest = [0, 1]
    startIdx = 0
    for i, char in enumerate(string):
        if char in lastSeen:
            startIdx = max(startIdx, lastSeen[char] + 1)
        if longest[1] - longest[0] < i + 1 - startIdx:
            longest = [startIdx, i + 1]
        lastSeen[char] = i
    return string[longest[0] : longest[1]]

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.longestSubstringWithoutDuplication("clementisacap"), "mentisac")

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.longestSubstringWithoutDuplication('clementisacap')).to.deep.equal('mentisac');
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(min(n, a)) space
export function longestSubstringWithoutDuplication(string: string) {
  const lastSeen: {[key: string]: number} = {};
  let longest = [0, 1];
  let startIdx = 0;
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (char in lastSeen) {
      startIdx = Math.max(startIdx, lastSeen[char] + 1);
    }
    if (longest[1] - longest[0] < i + 1 - startIdx) {
      longest = [startIdx, i + 1];
    }
    lastSeen[char] = i;
  }
  return string.slice(longest[0], longest[1]);
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.longestSubstringWithoutDuplication('clementisacap')).to.deep.equal('mentisac');
});

```

