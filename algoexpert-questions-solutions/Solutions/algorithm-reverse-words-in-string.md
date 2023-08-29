# Reverse Words In String
<div class="html">
<p>
  Write a function that takes in a string of words separated by one or more
  whitespaces and returns a string that has these words in reverse order. For
  example, given the string <span>"tim is great"</span>, your function should
  return <span>"great is tim"</span>.
</p>
<p>
  For this problem, a word can contain special characters, punctuation, and
  numbers. The words in the string will be separated by one or more whitespaces,
  and the reversed string must contain the same whitespaces as the original
  string. For example, given the string
  <span>"whitespaces    4"</span> you would be expected to return
  <span>"4    whitespaces"</span>.
</p>
<p>
  Note that you're <b><i>not</i></b> allowed to to use any built-in
  <span>split</span> or <span>reverse</span> methods/functions. However, you
  <b><i>are</i></b> allowed to use a built-in <span>join</span> method/function.
</p>
<p>Also note that the input string isn't guaranteed to always contain words.</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">string</span> = "AlgoExpert is the best!"
</pre>
<h3>Sample Output</h3>
<pre>
"best! the is AlgoExpert"
</pre>
</div>

Hint 1
<p>
  There are at least two ways to solve this problem, and both require locating
  the words in the string. How can you find all of the words in the string?
</p>


Hint 2

<p>
  If you're able to locate all of the words in the string, the next step is to
  figure out how many spaces are between them. If you can create a list that
  contains all of the words in the string and all of the spaces between them,
  then all you need to do is reverse the list and recreate the string using the
  reversed list.
</p>


Hint 3

<p>
  A potentially easier approach to this problem is to start by reversing the
  entire string. Once the entire string has been reversed, the words will be in
  the correct order, but each word will also be reversed. From here, all you
  have to do is reverse all of the individual words in this new string. By doing
  this, you'll restore each reversed word back to its original order, and
  you'll have the desired output.
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
      string input = "AlgoExpert is the best!";
      ;
      string expected = "best! the is AlgoExpert";
      auto actual = reverseWordsInString(input);
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

void reverseList(vector<string> &list);

// O(n) time | O(n) space - where n is the length of the string
string reverseWordsInString(string str) {
  vector<string> words;
  int startOfWord = 0;
  for (int idx = 0; idx < str.size(); idx++) {
    char character = str[idx];

    if (character == ' ') {
      words.push_back(str.substr(startOfWord, idx - startOfWord));
      startOfWord = idx;
    } else if (str[startOfWord] == ' ') {
      words.push_back(" ");
      startOfWord = idx;
    }
  }

  words.push_back(str.substr(startOfWord));

  reverseList(words);
  string output;
  for (auto word : words) {
    output += word;
  }
  return output;
}

void reverseList(vector<string> &list) {
  int start = 0;
  int end = list.size() - 1;
  while (start < end) {
    string temp = list[start];
    list[start] = list[end];
    list[end] = temp;
    start++;
    end--;
  }
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

void reverseListRange(vector<char> &list, int start, int end);

// O(n) time | O(n) space - where n is the length of the string
string reverseWordsInString(string str) {
  vector<char> characters;
  for (auto character : str) {
    characters.push_back(character);
  }
  reverseListRange(characters, 0, characters.size() - 1);

  int startOfWord = 0;
  while (startOfWord < characters.size()) {
    int endOfWord = startOfWord;
    while (endOfWord < characters.size() && characters[endOfWord] != ' ') {
      endOfWord++;
    }

    reverseListRange(characters, startOfWord, endOfWord - 1);
    startOfWord = endOfWord + 1;
  }

  string output;
  for (auto character : characters) {
    output += character;
  }
  return output;
}

void reverseListRange(vector<char> &list, int start, int end) {
  while (start < end) {
    char temp = list[start];
    list[start] = list[end];
    list[end] = temp;
    start++;
    end--;
  }
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      string input = "AlgoExpert is the best!";
      ;
      string expected = "best! the is AlgoExpert";
      auto actual = reverseWordsInString(input);
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
		string input = "AlgoExpert is the best!";
		string expected = "best! the is AlgoExpert";
		string actual = new Program().ReverseWordsInString(input);
		Utils.AssertTrue(expected.Equals(actual));
	}
}
```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {

	// O(n) time | O(n) space - where n is the length of the string
	public string ReverseWordsInString(string str) {
		List<string> words = new List<string>();
		int startOfWord = 0;

		for (int idx = 0; idx < str.Length; idx++) {
			char character = str[idx];

			if (character == ' ') {
				words.Add(str.Substring(startOfWord, idx-startOfWord));
				startOfWord = idx;
			} else if (str[startOfWord] == ' ') {
				words.Add(" ");
				startOfWord = idx;
			}
		}

		words.Add(str.Substring(startOfWord));
		words.Reverse();
		return String.Join("", words);
	}
}


```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {

	// O(n) time | O(n) space - where n is the length of the string
	public string ReverseWordsInString(string str) {
		char[] characters = str.ToCharArray();
		reverseListRange(characters, 0, characters.Length - 1);

		int startOfWord = 0;
		while (startOfWord < characters.Length) {
			int endOfWord = startOfWord;
			while (endOfWord < characters.Length && characters[endOfWord] != ' ') {
				endOfWord += 1;
			}

			reverseListRange(characters, startOfWord, endOfWord - 1);
			startOfWord = endOfWord + 1;
		}

		return new string(characters);
	}

	public char[] reverseListRange(char[] list, int start, int end) {
		while (start < end) {
			char temp = list[start];
			list[start] = list[end];
			list[end] = temp;
			start += 1;
			end -= 1;
		}

		return list;
	}
}


```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		string input = "AlgoExpert is the best!";
		string expected = "best! the is AlgoExpert";
		string actual = new Program().ReverseWordsInString(input);
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
	input := "AlgoExpert is the best!"
	expected := "best! the is AlgoExpert"
	actual := ReverseWordsInString(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"strings"
)

// O(n) time | O(n) space - where n is the length of the string
func ReverseWordsInString(str string) string {
	words := make([]string, 0)
	startOfWord := 0
	for idx, character := range str {
		if character == ' ' {
			words = append(words, str[startOfWord:idx])
			startOfWord = idx
		} else if str[startOfWord] == ' ' {
			words = append(words, " ")
			startOfWord = idx
		}
	}

	words = append(words, str[startOfWord:])
	reverseList(words)
	return strings.Join(words, "")
}

func reverseList(list []string) {
	start := 0
	end := len(list) - 1
	for start < end {
		temp := list[start]
		list[start] = list[end]
		list[end] = temp
		start += 1
		end -= 1
	}
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space - where n is the length of the string
func ReverseWordsInString(str string) string {
	characters := make([]byte, 0)
	for _, char := range []byte(str) {
		characters = append(characters, char)
	}
	reverseListRange(characters, 0, len(characters)-1)

	startOfWord := 0
	for startOfWord < len(characters) {
		endOfWord := startOfWord
		for endOfWord < len(characters) && characters[endOfWord] != ' ' {
			endOfWord += 1
		}

		reverseListRange(characters, startOfWord, endOfWord-1)
		startOfWord = endOfWord + 1
	}

	return string(characters)
}

func reverseListRange(list []byte, rangeStart, rangeEnd int) {
	start := rangeStart
	end := rangeEnd
	for start < end {
		temp := list[start]
		list[start] = list[end]
		list[end] = temp
		start += 1
		end -= 1
	}
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := "AlgoExpert is the best!"
	expected := "best! the is AlgoExpert"
	actual := ReverseWordsInString(input)
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
    String input = "AlgoExpert is the best!";
    String expected = "best! the is AlgoExpert";
    String actual = new Program().reverseWordsInString(input);
    Utils.assertTrue(expected.equals(actual));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n) time | O(n) space - where n is the length of the string
  public String reverseWordsInString(String string) {
    ArrayList<String> words = new ArrayList<String>();
    int startOfWord = 0;

    for (int idx = 0; idx < string.length(); idx++) {
      char character = string.charAt(idx);

      if (character == ' ') {
        words.add(string.substring(startOfWord, idx));
        startOfWord = idx;
      } else if (string.charAt(startOfWord) == ' ') {
        words.add(" ");
        startOfWord = idx;
      }
    }

    words.add(string.substring(startOfWord));

    Collections.reverse(words);
    return String.join("", words);
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n) time | O(n) space - where n is the length of the string
  public String reverseWordsInString(String string) {
    char[] characters = string.toCharArray();
    reverseListRange(characters, 0, characters.length - 1);

    int startOfWord = 0;
    while (startOfWord < characters.length) {
      int endOfWord = startOfWord;
      while (endOfWord < characters.length && characters[endOfWord] != ' ') {
        endOfWord += 1;
      }

      reverseListRange(characters, startOfWord, endOfWord - 1);
      startOfWord = endOfWord + 1;
    }

    return new String(characters);
  }

  public char[] reverseListRange(char[] list, int start, int end) {
    while (start < end) {
      char temp = list[start];
      list[start] = list[end];
      list[end] = temp;
      start += 1;
      end -= 1;
    }

    return list;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    String input = "AlgoExpert is the best!";
    String expected = "best! the is AlgoExpert";
    String actual = new Program().reverseWordsInString(input);
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
  const input = 'AlgoExpert is the best!';
  const expected = 'best! the is AlgoExpert';
  const actual = program.reverseWordsInString(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the string
function reverseWordsInString(string) {
  const words = [];
  let startOfWord = 0;
  for (let idx = 0; idx < string.length; idx++) {
    const character = string[idx];

    if (character === ' ') {
      words.push(string.slice(startOfWord, idx));
      startOfWord = idx;
    } else if (string[startOfWord] === ' ') {
      words.push(' ');
      startOfWord = idx;
    }
  }

  words.push(string.slice(startOfWord));

  reverseList(words);
  return words.join('');
}

function reverseList(list) {
  let start = 0,
    end = list.length - 1;
  while (start < end) {
    const temp = list[start];
    list[start] = list[end];
    list[end] = temp;
    start++;
    end--;
  }
}

// Do not edit the line below.
exports.reverseWordsInString = reverseWordsInString;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the string
function reverseWordsInString(string) {
  const characters = [];
  for (const char of string) {
    characters.push(char);
  }
  reverseListRange(characters, 0, characters.length - 1);

  let startOfWord = 0;
  while (startOfWord < characters.length) {
    let endOfWord = startOfWord;
    while (endOfWord < characters.length && characters[endOfWord] != ' ') {
      endOfWord++;
    }

    reverseListRange(characters, startOfWord, endOfWord - 1);
    startOfWord = endOfWord + 1;
  }
  return characters.join('');
}

function reverseListRange(list, start, end) {
  while (start < end) {
    const temp = list[start];
    list[start] = list[end];
    list[end] = temp;
    start++;
    end--;
  }
}

// Do not edit the line below.
exports.reverseWordsInString = reverseWordsInString;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = 'AlgoExpert is the best!';
  const expected = 'best! the is AlgoExpert';
  const actual = program.reverseWordsInString(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.reverseWordsInString

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = "AlgoExpert is the best!"
        val expected = "best! the is AlgoExpert"
        val output = reverseWordsInString(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(n) space - where n is the length of the string
fun reverseWordsInString(string: String): String {
    val words = mutableListOf<String>()
    var startOfWord = 0
    for (idx in 0 until string.length) {
        val character = string[idx]

        if (character == ' ') {
            words.add(string.substring(startOfWord, idx))
            startOfWord = idx
        } else if (string[startOfWord] == ' ') {
            words.add(" ")
            startOfWord = idx
        }
    }

    words.add(string.substring(startOfWord))

    reverseList(words)
    return words.joinToString("")
}

fun reverseList(list: MutableList<String>) {
    var start = 0
    var end = list.size - 1
    while (start < end) {
        val temp = list[start]
        list[start] = list[end]
        list[end] = temp
        start += 1
        end -= 1
    }
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(n) space - where n is the length of the string
fun reverseWordsInString(string: String): String {
    val characters = mutableListOf<Char>()
    for (char in string) {
        characters.add(char)
    }
    reverseListRange(characters, 0, characters.size - 1)

    var startOfWord = 0
    while (startOfWord < characters.size) {
        var endOfWord = startOfWord
        while (endOfWord < characters.size && characters[endOfWord] != ' ') {
            endOfWord += 1
        }

        reverseListRange(characters, startOfWord, endOfWord - 1)
        startOfWord = endOfWord + 1
    }

    return characters.joinToString("")
}

fun reverseListRange(list: MutableList<Char>, rangeStart: Int, rangeEnd: Int) {
    var start = rangeStart
    var end = rangeEnd
    while (start < end) {
        val temp = list[start]
        list[start] = list[end]
        list[end] = temp
        start += 1
        end -= 1
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.reverseWordsInString

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = "AlgoExpert is the best!"
        val expected = "best! the is AlgoExpert"
        val output = reverseWordsInString(input)
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
      var input = "AlgoExpert is the best!"
      var expected = "best! the is AlgoExpert"
      var actual = Program().reverseWordsInString(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the length of the string
  func reverseWordsInString(_ string: String) -> String {
    var words = [String]()
    let indexedString = Array(string)
    var startOfWord = 0
    for (idx, character) in indexedString.enumerated() {
      if character == " " {
        words.append(String(indexedString[startOfWord ..< idx]))
        startOfWord = idx
      } else if indexedString[startOfWord] == " " {
        words.append(" ")
        startOfWord = idx
      }
    }

    words.append(String(indexedString[startOfWord...]))
    reverseList(&words)
    return words.joined(separator: "")
  }

  func reverseList(_ list: inout [String]) {
    var start = 0
    var end = list.count - 1
    while start < end {
      let temp = list[start]
      list[start] = list[end]
      list[end] = temp
      start += 1
      end -= 1
    }
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the length of the string
  func reverseWordsInString(_ string: String) -> String {
    var characters = Array(string)
    reverseListRange(&characters, 0, characters.count - 1)

    var startOfWord = 0
    while startOfWord < characters.count {
      var endOfWord = startOfWord
      while endOfWord < characters.count, characters[endOfWord] != " " {
        endOfWord += 1
      }

      reverseListRange(&characters, startOfWord, endOfWord - 1)
      startOfWord = endOfWord + 1
    }

    return String(characters)
  }

  func reverseListRange(_ list: inout [Character], _ rangeStart: Int, _ rangeEnd: Int) {
    var start = rangeStart
    var end = rangeEnd
    while start < end {
      let temp = list[start]
      list[start] = list[end]
      list[end] = temp
      start += 1
      end -= 1
    }
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = "AlgoExpert is the best!"
      var expected = "best! the is AlgoExpert"
      var actual = Program().reverseWordsInString(input)
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
        input = "AlgoExpert is the best!"
        expected = "best! the is AlgoExpert"
        actual = program.reverseWordsInString(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the length of the string
def reverseWordsInString(string):
    words = []
    startOfWord = 0
    for idx in range(len(string)):
        character = string[idx]

        if character == " ":
            words.append(string[startOfWord:idx])
            startOfWord = idx
        elif string[startOfWord] == " ":
            words.append(" ")
            startOfWord = idx

    words.append(string[startOfWord:])

    reverseList(words)
    return "".join(words)


def reverseList(list):
    start, end = 0, len(list) - 1
    while start < end:
        list[start], list[end] = list[end], list[start]
        start += 1
        end -= 1

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the length of the string
def reverseWordsInString(string):
    characters = [char for char in string]
    reverseListRange(characters, 0, len(characters) - 1)

    startOfWord = 0
    while startOfWord < len(characters):
        endOfWord = startOfWord
        while endOfWord < len(characters) and characters[endOfWord] != " ":
            endOfWord += 1

        reverseListRange(characters, startOfWord, endOfWord - 1)
        startOfWord = endOfWord + 1

    return "".join(characters)


def reverseListRange(list, start, end):
    while start < end:
        list[start], list[end] = list[end], list[start]
        start += 1
        end -= 1

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = "AlgoExpert is the best!"
        expected = "best! the is AlgoExpert"
        actual = program.reverseWordsInString(input)
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
  const input = 'AlgoExpert is the best!';
  const expected = 'best! the is AlgoExpert';
  const actual = program.reverseWordsInString(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the string
export function reverseWordsInString(string: string) {
  const words: string[] = [];
  let startOfWord = 0;
  for (let idx = 0; idx < string.length; idx++) {
    const character = string[idx];

    if (character === ' ') {
      words.push(string.slice(startOfWord, idx));
      startOfWord = idx;
    } else if (string[startOfWord] === ' ') {
      words.push(' ');
      startOfWord = idx;
    }
  }

  words.push(string.slice(startOfWord));

  reverseList(words);
  return words.join('');
}

function reverseList(list: string[]) {
  let start = 0,
    end = list.length - 1;
  while (start < end) {
    const temp = list[start];
    list[start] = list[end];
    list[end] = temp;
    start++;
    end--;
  }
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the string
export function reverseWordsInString(string: string) {
  const characters: string[] = [];
  for (const char of string) {
    characters.push(char);
  }
  reverseListRange(characters, 0, characters.length - 1);

  let startOfWord = 0;
  while (startOfWord < characters.length) {
    let endOfWord = startOfWord;
    while (endOfWord < characters.length && characters[endOfWord] != ' ') {
      endOfWord++;
    }

    reverseListRange(characters, startOfWord, endOfWord - 1);
    startOfWord = endOfWord + 1;
  }
  return characters.join('');
}

function reverseListRange(list: string[], start: number, end: number) {
  while (start < end) {
    const temp = list[start];
    list[start] = list[end];
    list[end] = temp;
    start++;
    end--;
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = 'AlgoExpert is the best!';
  const expected = 'best! the is AlgoExpert';
  const actual = program.reverseWordsInString(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

