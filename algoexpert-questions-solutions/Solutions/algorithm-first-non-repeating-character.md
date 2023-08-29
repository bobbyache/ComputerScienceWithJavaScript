# First Non-Repeating Character
<div class="html">
<p>
  Write a function that takes in a string of lowercase English-alphabet letters
  and returns the index of the string's first non-repeating character.
</p>
<p>
  The first non-repeating character is the first character in a string that
  occurs only once.
</p>
<p>
  If the input string doesn't have any non-repeating characters, your function
  should return <span>-1</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">string</span> = "abcdcaf"
</pre>
<h3>Sample Output</h3>
<pre>
1 <span class="CodeEditor-promptComment">// The first non-repeating character is "b" and is found at index 1.</span>
</pre>
</div>

Hint 1
<p>
  How can you determine if a character only appears once in the entire input
  string? What would be the brute-force approach to solve this problem?
</p>


Hint 2

<p>
  One way to solve this problem is with nested traversals of the string: you
  start by traversing the string, and for each character that you traverse, you
  traverse through the entire string again to see if the character appears
  anywhere else. The first index at which you find a character that doesn't
  appear anywhere else in the string is the index that you return. This approach
  works, but it's not optimal. Are there any data structures that you can use to
  improve the time complexity of this approach?
</p>


Hint 3

<p>
  Hash tables are very commonly used to keep track of frequencies. Build a hash
  table, where every key is a character in the string and every value is the
  corresponding character's frequency in the input string. You can traverse the
  entire string once to fill the hash table, and then with a second traversal
  through the string (not a nested traversal), you can use the hash table's
  constant-time lookups to find the first character with a frequency of
  <span>1</span>.
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
      auto input = "abcdcaf";
      auto expected = 1;
      auto actual = firstNonRepeatingCharacter(input);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// O(n^2) time | O(1) space - where n is the length of the input string
int firstNonRepeatingCharacter(string string) {
  for (int idx = 0; idx < string.size(); idx++) {
    int foundDuplicate = false;
    for (int idx2 = 0; idx2 < string.size(); idx2++) {
      if (string[idx] == string[idx2] && idx != idx2)
        foundDuplicate = true;
    }

    if (!foundDuplicate)
      return idx;
  }

  return -1;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <unordered_map>
using namespace std;

// O(n) time | O(1) space - where n is the length of the input string
// The constant space is because the input string only has lowercase
// English-alphabet letters; thus, our hash table will never have more
// than 26 character frequencies.
int firstNonRepeatingCharacter(string string) {
  unordered_map<char, int> characterFrequencies;

  for (auto character : string) {
    if (characterFrequencies.find(character) == characterFrequencies.end())
      characterFrequencies[character] = 0;
    characterFrequencies[character]++;
  }

  for (int idx = 0; idx < string.size(); idx++) {
    char character = string[idx];
    if (characterFrequencies[character] == 1)
      return idx;
  }

  return -1;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      auto input = "abcdcaf";
      auto expected = 1;
      auto actual = firstNonRepeatingCharacter(input);
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
		string input = "abcdcaf";
		int expected = 1;
		var actual = new Program().FirstNonRepeatingCharacter(input);
		Utils.AssertTrue(expected == actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {

	// O(n^2) time | O(1) space - where n is the length of the input string
	public int FirstNonRepeatingCharacter(string str) {
		for (int idx = 0; idx < str.Length; idx++) {
			bool foundDuplicate = false;
			for (int idx2 = 0; idx2 < str.Length; idx2++) {
				if (str[idx] == str[idx2] && idx != idx2) {
					foundDuplicate = true;
				}
			}

			if (!foundDuplicate)
				return idx;
		}

		return -1;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System.Linq;
using System;


public class Program {

	// O(n) time | O(1) space - where n is the length of the input string
// The constant space is because the input string only has lowercase
// English-alphabet letters; thus, our hash table will never have more
// than 26 character frequencies.
	public int FirstNonRepeatingCharacter(string str) {
		Dictionary<char, int> characterFrequencies = new Dictionary<char, int>();

		for (int idx = 0; idx < str.Length; idx++) {
			char character = str[idx];
			characterFrequencies[character] = characterFrequencies.GetValueOrDefault(
				character, 0) + 1;
		}

		for (int idx = 0; idx < str.Length; idx++) {
			char character = str[idx];
			if (characterFrequencies[character] == 1) {
				return idx;
			}
		}

		return -1;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		string input = "abcdcaf";
		int expected = 1;
		var actual = new Program().FirstNonRepeatingCharacter(input);
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
	input := "abcdcaf"
	expected := 1
	actual := FirstNonRepeatingCharacter(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n^2) time | O(1) space - where n is the length of the input string
func FirstNonRepeatingCharacter(str string) int {
	for idx := range str {
		var foundDuplicate = false
		for idx2 := range str {
			if str[idx] == str[idx2] && idx != idx2 {
				foundDuplicate = true
			}
		}

		if !foundDuplicate {
			return idx
		}
	}

	return -1
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space - where n is the length of the input string
// The constant space is because the input string only has lowercase
// English-alphabet letters; thus, our hash table will never have more
// than 26 character frequencies.
func FirstNonRepeatingCharacter(str string) int {
	characterFrequencies := map[rune]int{}

	for _, char := range str {
		characterFrequencies[char] += 1
	}

	for idx, char := range str {
		if characterFrequencies[char] == 1 {
			return idx
		}
	}

	return -1
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := "abcdcaf"
	expected := 1
	actual := FirstNonRepeatingCharacter(input)
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
    String input = "abcdcaf";
    int expected = 1;
    var actual = new Program().firstNonRepeatingCharacter(input);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n^2) time | O(1) space - where n is the length of the input string
  public int firstNonRepeatingCharacter(String string) {
    for (int idx = 0; idx < string.length(); idx++) {
      boolean foundDuplicate = false;
      for (int idx2 = 0; idx2 < string.length(); idx2++) {
        if (string.charAt(idx) == string.charAt(idx2) && idx != idx2) {
          foundDuplicate = true;
        }
      }

      if (!foundDuplicate) return idx;
    }

    return -1;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n) time | O(1) space - where n is the length of the input string
// The constant space is because the input string only has lowercase
// English-alphabet letters; thus, our hash table will never have more
// than 26 character frequencies.
  public int firstNonRepeatingCharacter(String string) {
    HashMap<Character, Integer> characterFrequencies = new HashMap<Character, Integer>();

    for (int idx = 0; idx < string.length(); idx++) {
      char character = string.charAt(idx);
      characterFrequencies.put(character, characterFrequencies.getOrDefault(character, 0) + 1);
    }

    for (int idx = 0; idx < string.length(); idx++) {
      char character = string.charAt(idx);
      if (characterFrequencies.get(character) == 1) {
        return idx;
      }
    }

    return -1;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    String input = "abcdcaf";
    int expected = 1;
    var actual = new Program().firstNonRepeatingCharacter(input);
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
  const input = 'abcdcaf';
  const expected = 1;
  const actual = program.firstNonRepeatingCharacter(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(1) space - where n is the length of the input string
function firstNonRepeatingCharacter(string) {
  for (let idx = 0; idx < string.length; idx++) {
    let foundDuplicate = false;
    for (let idx2 = 0; idx2 < string.length; idx2++) {
      if (string[idx] === string[idx2] && idx !== idx2) foundDuplicate = true;
    }

    if (!foundDuplicate) return idx;
  }

  return -1;
}

// Do not edit the line below.
exports.firstNonRepeatingCharacter = firstNonRepeatingCharacter;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the input string
// The constant space is because the input string only has lowercase
// English-alphabet letters; thus, our hash table will never have more
// than 26 character frequencies.
function firstNonRepeatingCharacter(string) {
  const characterFrequencies = {};

  for (const character of string) {
    if (!(character in characterFrequencies)) characterFrequencies[character] = 0;
    characterFrequencies[character]++;
  }

  for (let idx = 0; idx < string.length; idx++) {
    const character = string[idx];
    if (characterFrequencies[character] === 1) return idx;
  }

  return -1;
}

// Do not edit the line below.
exports.firstNonRepeatingCharacter = firstNonRepeatingCharacter;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = 'abcdcaf';
  const expected = 1;
  const actual = program.firstNonRepeatingCharacter(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.firstNonRepeatingCharacter

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = "abcdcaf"
        val expected = 1
        val output = firstNonRepeatingCharacter(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^2) time | O(1) space - where n is the length of the input string
fun firstNonRepeatingCharacter(string: String): Int {
    for (idx in 0 until string.length) {
        var foundDuplicate = false
        for (idx2 in 0 until string.length) {
            if (string[idx] == string[idx2] && idx != idx2) {
                foundDuplicate = true
            }
        }

        if (!foundDuplicate) return idx
    }

    return -1
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(1) space - where n is the length of the input string
// The constant space is because the input string only has lowercase
// English-alphabet letters; thus, our hash table will never have more
// than 26 character frequencies.
fun firstNonRepeatingCharacter(string: String): Int {
    val characterFrequencies = mutableMapOf<Char, Int>()

    for (character in string) {
        characterFrequencies[character] = characterFrequencies.getOrDefault(character, 0) + 1
    }

    for (idx in 0 until string.length) {
        val character = string[idx]
        if (characterFrequencies[character] == 1) return idx
    }

    return -1
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.firstNonRepeatingCharacter

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = "abcdcaf"
        val expected = 1
        val output = firstNonRepeatingCharacter(input)
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
      var input = "abcdcaf"
      var expected = 1
      var actual = Program().firstNonRepeatingCharacter(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(1) space - where n is the length of the input string
  func firstNonRepeatingCharacter(_ string: String) -> Int {
    for (idx1, char1) in string.enumerated() {
      var foundDuplicate = false
      for (idx2, char2) in string.enumerated() {
        if char1 == char2, idx1 != idx2 {
          foundDuplicate = true
        }
      }

      if !foundDuplicate {
        return idx1
      }
    }

    return -1
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the length of the input string
// The constant space is because the input string only has lowercase
// English-alphabet letters; thus, our hash table will never have more
// than 26 character frequencies.
  func firstNonRepeatingCharacter(_ string: String) -> Int {
    var characterFrequencies = [Character: Int]()

    for (_, char) in string.enumerated() {
      if characterFrequencies[char] == nil {
        characterFrequencies[char] = 0
      }
      characterFrequencies[char]! += 1
    }

    for (idx, char) in string.enumerated() {
      if characterFrequencies[char] == 1 {
        return idx
      }
    }

    return -1
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = "abcdcaf"
      var expected = 1
      var actual = Program().firstNonRepeatingCharacter(input)
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
        input = "abcdcaf"
        expected = 1
        actual = program.firstNonRepeatingCharacter(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(1) space - where n is the length of the input string
def firstNonRepeatingCharacter(string):
    for idx in range(len(string)):
        foundDuplicate = False
        for idx2 in range(len(string)):
            if string[idx] == string[idx2] and idx != idx2:
                foundDuplicate = True

        if not foundDuplicate:
            return idx

    return -1

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space - where n is the length of the input string
# The constant space is because the input string only has lowercase
# English-alphabet letters; thus, our hash table will never have more
# than 26 character frequencies.
def firstNonRepeatingCharacter(string):
    characterFrequencies = {}

    for character in string:
        characterFrequencies[character] = characterFrequencies.get(character, 0) + 1

    for idx in range(len(string)):
        character = string[idx]
        if characterFrequencies[character] == 1:
            return idx

    return -1

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = "abcdcaf"
        expected = 1
        actual = program.firstNonRepeatingCharacter(input)
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
  const input = 'abcdcaf';
  const expected = 1;
  const actual = program.firstNonRepeatingCharacter(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(1) space - where n is the length of the input string
export function firstNonRepeatingCharacter(string: string) {
  for (let idx = 0; idx < string.length; idx++) {
    let foundDuplicate = false;
    for (let idx2 = 0; idx2 < string.length; idx2++) {
      if (string[idx] === string[idx2] && idx !== idx2) foundDuplicate = true;
    }

    if (!foundDuplicate) return idx;
  }

  return -1;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the input string
// The constant space is because the input string only has lowercase
// English-alphabet letters; thus, our hash table will never have more
// than 26 character frequencies.
export function firstNonRepeatingCharacter(string: string) {
  const characterFrequencies: {[character: string]: number} = {};

  for (const character of string) {
    if (!(character in characterFrequencies)) characterFrequencies[character] = 0;
    characterFrequencies[character]++;
  }

  for (let idx = 0; idx < string.length; idx++) {
    const character = string[idx];
    if (characterFrequencies[character] === 1) return idx;
  }

  return -1;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = 'abcdcaf';
  const expected = 1;
  const actual = program.firstNonRepeatingCharacter(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

