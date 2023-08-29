# Knuth—Morris—Pratt Algorithm
<div class="html">
<p>
  Write a function that takes in two strings and checks if the first string
  contains the second one using the Knuth—Morris—Pratt algorithm. The function
  should return a boolean.
</p>
<p>
  If you're unfamiliar with the Knuth—Morris—Pratt Algorithm, we recommend
  watching the Conceptual Overview section of this question's video explanation
  before starting to code.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">string</span> = "aefoaefcdaefcdaed"
<span class="CodeEditor-promptParameter">substring</span> = "aefcdaed"
</pre>
<h3>Sample Output</h3>
<pre>
true
</pre>
</div>

Hint 1
<p>
The Knuth—Morris—Pratt algorithm works by identifying patterns in the potential substring and exploiting them to avoid doing needless character comparisons when searching for the substring in the main string. For instance, take the string "ababac" and the substring "abac"; comparing these strings will fail at the fourth character, where "b" is not equal to "c". Instead of having to restart our comparisons at the second character of the main string, however, we notice that the substring "ab", which is at the beginning of our potential substring, just appeared near our point of failure in the main string. How can we use this to our advantage?
</p>


Hint 2

<p>
Start by traversing the potential substring and building out a pattern table. This 1-dimensional array should store, for every position in the substring, the last index at which a matching pattern has been seen; more specifically, this index should be the ending index of a prefix in the substring that is also a suffix at the given position. For example, the string "abcababcd" should yield the following pattern table: [-1, -1, -1, 0, 1, 0, 1, 2, -1].
</p>


Hint 3

<p>
After the pattern table mentioned in Hint #2 has been built, traverse the main string and the potential substring with two separate pointers. When characters match, move the pointers forward. When characters don't match, check if the pointer in the substring is at the very beginning of the substring; if it is, then there is no match and you can move the pointer of the main string forward until there is a match; if it isn't, then move it to the position that comes right after the last seen pattern stored at the previous index in the pattern table.
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
      assert(knuthMorrisPrattAlgorithm("aefoaefcdaefcdaed", "aefcdaed") ==
             true);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

vector<int> buildPattern(string substr);
bool doesMatch(string str, string substr, vector<int> pattern);

// O(n + m) time | O(m) space
bool knuthMorrisPrattAlgorithm(string str, string substr) {
  vector<int> pattern = buildPattern(substr);
  return doesMatch(str, substr, pattern);
}

vector<int> buildPattern(string substr) {
  vector<int> pattern(substr.size(), -1);
  int j = 0;
  int i = 1;
  while (i < substr.size()) {
    if (substr[i] == substr[j]) {
      pattern[i] = j;
      i++;
      j++;
    } else if (j > 0) {
      j = pattern[j - 1] + 1;
    } else {
      i++;
    }
  }
  return pattern;
}

bool doesMatch(string str, string substr, vector<int> pattern) {
  int i = 0;
  int j = 0;
  while (i + substr.size() - j <= str.size()) {
    if (str[i] == substr[j]) {
      if (j == substr.size() - 1)
        return true;
      i++;
      j++;
    } else if (j > 0) {
      j = pattern[j - 1] + 1;
    } else {
      i++;
    }
  }
  return false;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      assert(knuthMorrisPrattAlgorithm("aefoaefcdaefcdaed", "aefcdaed") ==
             true);
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
		Utils.AssertTrue(Program.KnuthMorrisPrattAlgorithm("aefoaefcdaefcdaed",
		  "aefcdaed") == true);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// O(n + m) time | O(m) space
	public static bool KnuthMorrisPrattAlgorithm(string str, string substring) {
		int[] pattern = buildPattern(substring);
		return doesMatch(str, substring, pattern);
	}

	public static int[] buildPattern(string substring) {
		int[] pattern = new int[substring.Length];
		Array.Fill(pattern, -1);
		int j = 0;
		int i = 1;
		while (i < substring.Length) {
			if (substring[i] == substring[j]) {
				pattern[i] = j;
				i++;
				j++;
			} else if (j > 0) {
				j = pattern[j - 1] + 1;
			} else {
				i++;
			}
		}
		return pattern;
	}

	public static bool doesMatch(string str, string substring, int[] pattern) {
		int i = 0;
		int j = 0;
		while (i + substring.Length - j <= str.Length) {
			if (str[i] == substring[j]) {
				if (j == substring.Length - 1) return true;
				i++;
				j++;
			} else if (j > 0) {
				j = pattern[j - 1] + 1;
			} else {
				i++;
			}
		}
		return false;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		Utils.AssertTrue(Program.KnuthMorrisPrattAlgorithm("aefoaefcdaefcdaed",
		  "aefcdaed") == true);
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
	expected := true
	output := KnuthMorrisPrattAlgorithm("aefoaefcdaefcdaed", "aefcdaed")
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n + m) time | O(m) space
func KnuthMorrisPrattAlgorithm(str, substr string) bool {
	pattern := buildPattern(substr)
	return doesMatch(str, substr, pattern)
}

func buildPattern(substr string) []int {
	pattern := make([]int, len(substr))
	for i := range substr {
		pattern[i] = -1
	}
	i, j := 1, 0
	for i < len(substr) {
		if substr[i] == substr[j] {
			pattern[i] = j
			i, j = i+1, j+1
		} else if j > 0 {
			j = pattern[j-1] + 1
		} else {
			i += 1
		}
	}
	return pattern
}

func doesMatch(str, substr string, pattern []int) bool {
	i, j := 0, 0
	for i+len(substr)-j <= len(str) {
		if str[i] == substr[j] {
			if j == len(substr)-1 {
				return true
			}
			i, j = i+1, j+1
		} else if j > 0 {
			j = pattern[j-1] + 1
		} else {
			i += 1
		}
	}
	return false
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := true
	output := KnuthMorrisPrattAlgorithm("aefoaefcdaefcdaed", "aefcdaed")
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
    Utils.assertTrue(Program.knuthMorrisPrattAlgorithm("aefoaefcdaefcdaed", "aefcdaed") == true);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.Arrays;

class Program {
  // O(n + m) time | O(m) space
  public static boolean knuthMorrisPrattAlgorithm(String string, String substring) {
    int[] pattern = buildPattern(substring);
    return doesMatch(string, substring, pattern);
  }

  public static int[] buildPattern(String substring) {
    int[] pattern = new int[substring.length()];
    Arrays.fill(pattern, -1);
    int j = 0;
    int i = 1;
    while (i < substring.length()) {
      if (substring.charAt(i) == substring.charAt(j)) {
        pattern[i] = j;
        i++;
        j++;
      } else if (j > 0) {
        j = pattern[j - 1] + 1;
      } else {
        i++;
      }
    }
    return pattern;
  }

  public static boolean doesMatch(String string, String substring, int[] pattern) {
    int i = 0;
    int j = 0;
    while (i + substring.length() - j <= string.length()) {
      if (string.charAt(i) == substring.charAt(j)) {
        if (j == substring.length() - 1) return true;
        i++;
        j++;
      } else if (j > 0) {
        j = pattern[j - 1] + 1;
      } else {
        i++;
      }
    }
    return false;
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    Utils.assertTrue(Program.knuthMorrisPrattAlgorithm("aefoaefcdaefcdaed", "aefcdaed") == true);
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
  chai.expect(program.knuthMorrisPrattAlgorithm('aefoaefcdaefcdaed', 'aefcdaed')).to.deep.equal(true);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n + m) time | O(m) space
function knuthMorrisPrattAlgorithm(string, substring) {
  let pattern = buildPattern(substring);
  return doesMatch(string, substring, pattern);
}

function buildPattern(substring) {
  let pattern = new Array(substring.length).fill(-1);
  let j = 0;
  let i = 1;
  while (i < substring.length) {
    if (substring[i] === substring[j]) {
      pattern[i] = j;
      i++;
      j++;
    } else if (j > 0) {
      j = pattern[j - 1] + 1;
    } else {
      i++;
    }
  }
  return pattern;
}

function doesMatch(string, substring, pattern) {
  let i = 0;
  let j = 0;
  while (i + substring.length - j <= string.length) {
    if (string[i] === substring[j]) {
      if (j === substring.length - 1) return true;
      i++;
      j++;
    } else if (j > 0) {
      j = pattern[j - 1] + 1;
    } else {
      i++;
    }
  }
  return false;
}

exports.knuthMorrisPrattAlgorithm = knuthMorrisPrattAlgorithm;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.knuthMorrisPrattAlgorithm('aefoaefcdaefcdaed', 'aefcdaed')).to.deep.equal(true);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.knuthMorrisPrattAlgorithm

class ProgramTest {
    @Test
    fun TestCase1() {
        val output = knuthMorrisPrattAlgorithm("aefoaefcdaefcdaed", "aefcdaed")
        assert(output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n + m) time | O(m) space
fun knuthMorrisPrattAlgorithm(string: String, substring: String): Boolean {
    val pattern = buildPattern(substring)
    return doesMatch(string, substring, pattern)
}

fun buildPattern(substring: String): List<Int> {
    val pattern = MutableList(substring.length) { -1 }
    var j = 0
    var i = 1
    while (i < substring.length) {
        if (substring[i] == substring[j]) {
            pattern[i] = j
            i++
            j++
        } else if (j > 0) {
            j = pattern[j - 1] + 1
        } else {
            i++
        }
    }
    return pattern
}

fun doesMatch(string: String, substring: String, pattern: List<Int>): Boolean {
    var i = 0
    var j = 0
    while (i + substring.length - j <= string.length) {
        if (string[i] == substring[j]) {
            if (j == substring.length - 1) return true
            i++
            j++
        } else if (j > 0) {
            j = pattern[j - 1] + 1
        } else {
            i++
        }
    }
    return false
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.knuthMorrisPrattAlgorithm

class ProgramTest {
    @Test
    fun TestCase1() {
        val output = knuthMorrisPrattAlgorithm("aefoaefcdaefcdaed", "aefcdaed")
        assert(output)
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
      try assertEqual(true, program.knuthMorrisPrattAlgorithm("aefoaefcdaefcdaed", subString: "aefcdaed"))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n + m) time | O(m) space
  func knuthMorrisPrattAlgorithm(_ string: String, subString: String) -> Bool {
    let pattern = buildPattern(subString)
    return doesMatch(string, subString, pattern)
  }

  func buildPattern(_ subString: String) -> [Int] {
    var pattern = Array(repeating: -1, count: subString.count)

    var i = 1
    var j = 0

    while i < subString.count {
      let iStringIndex = subString.index(subString.startIndex, offsetBy: i)
      let jStringIndex = subString.index(subString.startIndex, offsetBy: j)

      if subString[iStringIndex] == subString[jStringIndex] {
        pattern[i] = j

        i += 1
        j += 1
      } else if j > 0 {
        j = pattern[j - 1] + 1
      } else {
        i += 1
      }
    }

    return pattern
  }

  func doesMatch(_ string: String, _ subString: String, _ pattern: [Int]) -> Bool {
    var i = 0
    var j = 0

    while i + (subString.count - j) <= string.count {
      let iStringIndex = string.index(string.startIndex, offsetBy: i)
      let jStringIndex = subString.index(subString.startIndex, offsetBy: j)

      if string[iStringIndex] == subString[jStringIndex] {
        if j == subString.count - 1 {
          return true
        }

        i += 1
        j += 1
      } else if j > 0 {
        j = pattern[j - 1] + 1
      } else {
        i += 1
      }
    }

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
      try assertEqual(true, program.knuthMorrisPrattAlgorithm("aefoaefcdaefcdaed", subString: "aefcdaed"))
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
        self.assertEqual(program.knuthMorrisPrattAlgorithm("aefoaefcdaefcdaed", "aefcdaed"), True)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n + m) time | O(m) space
def knuthMorrisPrattAlgorithm(string, substring):
    pattern = buildPattern(substring)
    return doesMatch(string, substring, pattern)


def buildPattern(substring):
    pattern = [-1 for i in substring]
    j = 0
    i = 1
    while i < len(substring):
        if substring[i] == substring[j]:
            pattern[i] = j
            i += 1
            j += 1
        elif j > 0:
            j = pattern[j - 1] + 1
        else:
            i += 1
    return pattern


def doesMatch(string, substring, pattern):
    i = 0
    j = 0
    while i + len(substring) - j <= len(string):
        if string[i] == substring[j]:
            if j == len(substring) - 1:
                return True
            i += 1
            j += 1
        elif j > 0:
            j = pattern[j - 1] + 1
        else:
            i += 1
    return False

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.knuthMorrisPrattAlgorithm("aefoaefcdaefcdaed", "aefcdaed"), True)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.knuthMorrisPrattAlgorithm('aefoaefcdaefcdaed', 'aefcdaed')).to.deep.equal(true);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n + m) time | O(m) space
export function knuthMorrisPrattAlgorithm(string: string, substring: string) {
  let pattern = buildPattern(substring);
  return doesMatch(string, substring, pattern);
}

function buildPattern(substring: string) {
  let pattern: number[] = new Array(substring.length).fill(-1);
  let j = 0;
  let i = 1;
  while (i < substring.length) {
    if (substring[i] === substring[j]) {
      pattern[i] = j;
      i++;
      j++;
    } else if (j > 0) {
      j = pattern[j - 1] + 1;
    } else {
      i++;
    }
  }
  return pattern;
}

function doesMatch(string: string, substring: string, pattern: number[]) {
  let i = 0;
  let j = 0;
  while (i + substring.length - j <= string.length) {
    if (string[i] === substring[j]) {
      if (j === substring.length - 1) return true;
      i++;
      j++;
    } else if (j > 0) {
      j = pattern[j - 1] + 1;
    } else {
      i++;
    }
  }
  return false;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.knuthMorrisPrattAlgorithm('aefoaefcdaefcdaed', 'aefcdaed')).to.deep.equal(true);
});

```

