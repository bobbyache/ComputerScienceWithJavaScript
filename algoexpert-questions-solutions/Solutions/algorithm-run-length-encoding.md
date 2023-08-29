# Run-Length Encoding
<div class="html">
<p>
  Write a function that takes in a non-empty string and returns its run-length
  encoding.
</p>
<p>
  From Wikipedia, "run-length encoding is a form of lossless data compression in
  which runs of data are stored as a single data value and count, rather than as
  the original run." For this problem, a run of data is any sequence of
  consecutive, identical characters. So the run <span>"AAA"</span> would be
  run-length-encoded as <span>"3A"</span>.
</p>
<p>
  To make things more complicated, however, the input string can contain all
  sorts of special characters, including numbers. And since encoded data must be
  decodable, this means that we can't naively run-length-encode long runs. For
  example, the run <span>"AAAAAAAAAAAA"</span> (12 <span>A</span>s), can't
  naively be encoded as <span>"12A"</span>, since this string can be decoded as
  either <span>"AAAAAAAAAAAA"</span> or <span>"1AA"</span>. Thus, long runs (runs
  of 10 or more characters) should be encoded in a split fashion; the
  aforementioned run should be encoded as <span>"9A3A"</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">string</span> = "AAAAAAAAAAAAABBCCCCDD"
</pre>
<h3>Sample Output</h3>
<pre>
"9A4A2B4C2D"
</pre>
</div>

Hint 1
<p>
Traverse the input string and count the length of each run. As you traverse the string, what should you do when you reach a run of length 9 or the end of a run?
</p>


Hint 2

<p>
When you reach a run of length 9 or the end of a run, store the computed count for the run as well as its character (you'll likely need a list for these computed counts and characters), and reset the count to 1 before continuing to traverse the string.
</p>


Hint 3

<p>
Make sure that your solution correctly handles the last run in the string.
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
      auto input = "AAAAAAAAAAAAABBCCCCDD";
      auto expected = "9A4A2B4C2D";
      auto actual = runLengthEncoding(input);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>

using namespace std;

// O(n) time | O(n) space - where n is the length of the input string
string runLengthEncoding(string str) {
  // The input string is guaranteed to be non-empty,
  // so our first run will be of at least length 1.
  vector<char> encodedStringCharacters;
  int currentRunLength = 1;

  for (int i = 1; i < str.size(); i++) {
    char currentCharacter = str[i];
    char previousCharacter = str[i - 1];

    if (currentCharacter != previousCharacter || currentRunLength == 9) {
      encodedStringCharacters.push_back(to_string(currentRunLength)[0]);
      encodedStringCharacters.push_back(previousCharacter);
      currentRunLength = 0;
    }

    currentRunLength++;
  }

  // Handle the last run.
  encodedStringCharacters.push_back(to_string(currentRunLength)[0]);
  encodedStringCharacters.push_back(str[str.size() - 1]);

  string encodedString(encodedStringCharacters.begin(),
                       encodedStringCharacters.end());
  return encodedString;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      auto input = "AAAAAAAAAAAAABBCCCCDD";
      auto expected = "9A4A2B4C2D";
      auto actual = runLengthEncoding(input);
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
		var input = "AAAAAAAAAAAAABBCCCCDD";
		var expected = "9A4A2B4C2D";
		var actual = new Program().RunLengthEncoding(input);
		Utils.AssertTrue(expected.Equals(actual));
	}
}
```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Text;


public class Program {
	// O(n) time | O(n) space - where n is the length of the input string
	public string RunLengthEncoding(string str) {
		// The input string is guaranteed to be non-empty,
		// so our first run will be of at least length 1.
		StringBuilder encodedStringChars = new StringBuilder();
		int currentRunLength = 1;

		for (int i=1; i<str.Length; i++) {
			char currentChar = str[i];
			char previousChar = str[i-1];

			if ((currentChar != previousChar) || (currentRunLength == 9)) {
				encodedStringChars.Append(currentRunLength.ToString());
				encodedStringChars.Append(previousChar);
				currentRunLength = 0;
			}

			currentRunLength += 1;
		}

		// Handle the last run.
		encodedStringChars.Append(currentRunLength.ToString());
		encodedStringChars.Append(str[str.Length - 1]);

		return encodedStringChars.ToString();
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		var input = "AAAAAAAAAAAAABBCCCCDD";
		var expected = "9A4A2B4C2D";
		var actual = new Program().RunLengthEncoding(input);
		Utils.AssertTrue(expected.Equals(actual));
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
	input := "AAAAAAAAAAAAABBCCCCDD"
	expected := "9A4A2B4C2D"
	actual := RunLengthEncoding(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"strconv"
)

// O(n) time | O(n) space - where n is the length of the input string
func RunLengthEncoding(str string) string {
	// The input string is guaranteed to be non-empty,
	// so our first run will be of at least length 1.
	encodedStringCharacters := []byte{}
	currentRunLength := 1

	for i := 1; i < len(str); i++ {
		currentCharacter := str[i]
		previousCharacter := str[i-1]

		if currentCharacter != previousCharacter || currentRunLength == 9 {
			encodedStringCharacters = append(encodedStringCharacters, strconv.Itoa(currentRunLength)[0])
			encodedStringCharacters = append(encodedStringCharacters, previousCharacter)
			currentRunLength = 0
		}

		currentRunLength++
	}

	// Handle the last run.
	encodedStringCharacters = append(encodedStringCharacters, strconv.Itoa(currentRunLength)[0])
	encodedStringCharacters = append(encodedStringCharacters, str[len(str)-1])
	return string(encodedStringCharacters)
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := "AAAAAAAAAAAAABBCCCCDD"
	expected := "9A4A2B4C2D"
	actual := RunLengthEncoding(input)
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
    var input = "AAAAAAAAAAAAABBCCCCDD";
    var expected = "9A4A2B4C2D";
    var actual = new Program().runLengthEncoding(input);
    Utils.assertTrue(expected.equals(actual));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(n) space - where n is the length of the input string
  public String runLengthEncoding(String string) {
    // The input string is guaranteed to be non-empty,
    // so our first run will be of at least length 1.
    StringBuilder encodedStringCharacters = new StringBuilder();
    int currentRunLength = 1;

    for (int i = 1; i < string.length(); i++) {
      char currentCharacter = string.charAt(i);
      char previousCharacter = string.charAt(i - 1);

      if ((currentCharacter != previousCharacter) || (currentRunLength == 9)) {
        encodedStringCharacters.append(Integer.toString(currentRunLength));
        encodedStringCharacters.append(previousCharacter);
        currentRunLength = 0;
      }

      currentRunLength += 1;
    }

    // Handle the last run.
    encodedStringCharacters.append(Integer.toString(currentRunLength));
    encodedStringCharacters.append(string.charAt(string.length() - 1));

    return encodedStringCharacters.toString();
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    var input = "AAAAAAAAAAAAABBCCCCDD";
    var expected = "9A4A2B4C2D";
    var actual = new Program().runLengthEncoding(input);
    Utils.assertTrue(expected.equals(actual));
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
  const string = 'AAAAAAAAAAAAABBCCCCDD';
  const expected = '9A4A2B4C2D';
  const actual = program.runLengthEncoding(string);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input string
function runLengthEncoding(string) {
  // The input string is guaranteed to be non-empty,
  // so our first run will be of at least length 1.
  const encodedStringCharacters = [];
  let currentRunLength = 1;

  for (let i = 1; i < string.length; i++) {
    const currentCharacter = string[i];
    const previousCharacter = string[i - 1];

    if (currentCharacter !== previousCharacter || currentRunLength === 9) {
      encodedStringCharacters.push(currentRunLength.toString());
      encodedStringCharacters.push(previousCharacter);
      currentRunLength = 0;
    }

    currentRunLength++;
  }

  // Handle the last run.
  encodedStringCharacters.push(currentRunLength.toString());
  encodedStringCharacters.push(string[string.length - 1]);

  return encodedStringCharacters.join('');
}

exports.runLengthEncoding = runLengthEncoding;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const string = 'AAAAAAAAAAAAABBCCCCDD';
  const expected = '9A4A2B4C2D';
  const actual = program.runLengthEncoding(string);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.runLengthEncoding

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = "AAAAAAAAAAAAABBCCCCDD"
        val expected = "9A4A2B4C2D"
        val output = runLengthEncoding(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(n) space - where n is the length of the input string
fun runLengthEncoding(string: String): String {
    // The input string is guaranteed to be non-empty,
    // so our first run will be of at least length 1.
    val encodedStringCharacters = mutableListOf<Char>()
    var currentRunLength = 1

    for (i in 1 until string.length) {
        val currentCharacter = string[i]
        val previousCharacter = string[i - 1]

        if (currentCharacter != previousCharacter || currentRunLength == 9) {
            encodedStringCharacters.add(currentRunLength.toString()[0])
            encodedStringCharacters.add(previousCharacter)
            currentRunLength = 0
        }

        currentRunLength++
    }

    // Handle the last run.
    encodedStringCharacters.add(currentRunLength.toString()[0])
    encodedStringCharacters.add(string[string.length - 1])

    return encodedStringCharacters.joinToString("")
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.runLengthEncoding

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = "AAAAAAAAAAAAABBCCCCDD"
        val expected = "9A4A2B4C2D"
        val output = runLengthEncoding(input)
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
      var input = "AAAAAAAAAAAAABBCCCCDD"
      var expected = "9A4A2B4C2D"
      var actual = Program().runLengthEncoding(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the length of the input string
  func runLengthEncoding(_ string: String) -> String {
    // The input string is guaranteed to be non-empty,
    // so our first run will be of at least length 1.
    var encodedStringCharacters = [Character]()
    var currentRunLength = 1

    let indexedString = Array(string)
    for i in stride(from: 1, to: string.count, by: 1) {
      let currentCharacter = indexedString[i]
      let previousCharacter = indexedString[i - 1]

      if currentCharacter != previousCharacter || currentRunLength == 9 {
        encodedStringCharacters.append(Array(String(currentRunLength))[0])
        encodedStringCharacters.append(previousCharacter)
        currentRunLength = 0
      }

      currentRunLength += 1
    }

    // Handle the last run.
    encodedStringCharacters.append(Array(String(currentRunLength))[0])
    encodedStringCharacters.append(indexedString[string.count - 1])
    return String(encodedStringCharacters)
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = "AAAAAAAAAAAAABBCCCCDD"
      var expected = "9A4A2B4C2D"
      var actual = Program().runLengthEncoding(input)
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
        string = "AAAAAAAAAAAAABBCCCCDD"
        expected = "9A4A2B4C2D"
        actual = program.runLengthEncoding(string)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the length of the input string
def runLengthEncoding(string):
    # The input string is guaranteed to be non-empty,
    # so our first run will be of at least length 1.
    encodedStringCharacters = []
    currentRunLength = 1

    for i in range(1, len(string)):
        currentCharacter = string[i]
        previousCharacter = string[i - 1]

        if currentCharacter != previousCharacter or currentRunLength == 9:
            encodedStringCharacters.append(str(currentRunLength))
            encodedStringCharacters.append(previousCharacter)
            currentRunLength = 0

        currentRunLength += 1

    # Handle the last run.
    encodedStringCharacters.append(str(currentRunLength))
    encodedStringCharacters.append(string[len(string) - 1])

    return "".join(encodedStringCharacters)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        string = "AAAAAAAAAAAAABBCCCCDD"
        expected = "9A4A2B4C2D"
        actual = program.runLengthEncoding(string)
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
  const string = 'AAAAAAAAAAAAABBCCCCDD';
  const expected = '9A4A2B4C2D';
  const actual = program.runLengthEncoding(string);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input string
export function runLengthEncoding(string: string) {
  // The input string is guaranteed to be non-empty,
  // so our first run will be of at least length 1.
  const encodedStringCharacters: string[] = [];
  let currentRunLength = 1;

  for (let i = 1; i < string.length; i++) {
    const currentCharacter = string[i];
    const previousCharacter = string[i - 1];

    if (currentCharacter !== previousCharacter || currentRunLength === 9) {
      encodedStringCharacters.push(currentRunLength.toString());
      encodedStringCharacters.push(previousCharacter);
      currentRunLength = 0;
    }

    currentRunLength++;
  }

  // Handle the last run.
  encodedStringCharacters.push(currentRunLength.toString());
  encodedStringCharacters.push(string[string.length - 1]);

  return encodedStringCharacters.join('');
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const string = 'AAAAAAAAAAAAABBCCCCDD';
  const expected = '9A4A2B4C2D';
  const actual = program.runLengthEncoding(string);
  chai.expect(actual).to.deep.equal(expected);
});

```

