# Generate Div Tags
<div class="html">
  <p>
    Write a function that takes in a positive integer
    <span>numberOfTags</span> and returns a list of all the valid strings that
    you can generate with that number of matched
    <span>&lt;div&gt;&lt;/div&gt;</span> tags.
  </p>
  <p>
    A string is valid and contains matched
    <span>&lt;div&gt;&lt;/div&gt;</span> tags if for every opening tag
    <span>&lt;div&gt;</span>, there's a closing tag <span>&lt;/div&gt;</span>
    that comes after the opening tag and that isn't used as a closing tag for
    another opening tag. Each output string should contain exactly
    <span>numberOfTags</span> opening tags and <span>numberOfTags</span> closing
    tags.
  </p>
  <p>
    For example, given <span>numberOfTags = 2</span>, the valid strings to
    return would be: <span>["&lt;div&gt;&lt;/div&gt;&lt;div&gt;&lt;/div&gt;", "&lt;div&gt;&lt;div&gt;&lt;/div&gt;&lt;/div&gt;"]</span>.
  </p>
  <p>Note that the output strings don't need to be in any particular order.</p>
  <h3>Sample Input</h3>
  <pre>
<span class="CodeEditor-promptParameter">numberOfTags</span> = 3
</pre>
  <h3>Sample Output</h3>
  <pre>
  [
    "&lt;div&gt;&lt;div&gt;&lt;div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;",
    "&lt;div&gt;&lt;div&gt;&lt;/div&gt;&lt;div&gt;&lt;/div&gt;&lt;/div&gt;",
    "&lt;div&gt;&lt;div&gt;&lt;/div&gt;&lt;/div&gt;&lt;div&gt;&lt;/div&gt;",
    "&lt;div&gt;&lt;/div&gt;&lt;div&gt;&lt;div&gt;&lt;/div&gt;&lt;/div&gt;",
    "&lt;div&gt;&lt;/div&gt;&lt;div&gt;&lt;/div&gt;&lt;div&gt;&lt;/div&gt;",
  ] <span class="CodeEditor-promptComment">// The strings could be ordered differently.</span>
</pre>
</div>

Hint 1
<p>
  The brute-force approach to solve this problem is to generate every single
  possible string that contains <span>numberOfTags</span> tags and to then check
  all of those strings to see if they're valid. Can you think of a better way to
  do this?
</p>


Hint 2

<p>
  To solve this problem optimally, you'll have to incrementally build valid
  strings by adding <span>&lt;div&gt;</span> and <span>&lt;/div&gt;</span> tags
  to already valid partial strings. While doing this, you can avoid creating
  strings that will never lead to a valid final string by following two rules:
</p>
<ol>
  <li>
    If a string has fewer opening tags than
    <span>numberOfTags</span>, it's valid to add an opening tag to the end of
    it.
  </li>
  <li>
    If a string has fewer closing tags than opening tags, it's valid to add a
    closing tag to the end of it.
  </li>
</ol>


Hint 3

<p>
  Using the rules defined in Hint #2, write a recursive algorithm that generates
  all possible valid strings. You'll need to keep track of how many opening and
  closing tags each partial string has available (at each recursive call), and
  you'll simply follow the rules outlined in Hint #2. Once a string has no more
  opening and closing tags available, you can add it to your final list of
  strings. Your first call to the function will start with an empty string as
  the partial string and with <span>numberOfTags</span> as the number of opening
  and closing tags available. For example, after you add an opening tag to a
  partial string, you'll recursively call the function like this:
  <span
    >recursiveFunction(partialStringWithExtraOpeningTag, openingTags - 1,
    closingTags)</span
  >
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
      int input = 3;
      vector<string> expected = {"<div><div><div></div></div></div>",
                                 "<div><div></div><div></div></div>",
                                 "<div><div></div></div><div></div>",
                                 "<div></div><div><div></div></div>",
                                 "<div></div><div></div><div></div>"};
      auto actual = generateDivTags(input);
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

void generateDivTagsFromPrefix(int openingTagsNeeded, int closingTagsNeeded,
                               string prefix, vector<string> &result);

// O((2n)!/((n!((n + 1)!)))) time | O((2n)!/((n!((n + 1)!)))) space -
// where n is the input number
vector<string> generateDivTags(int numberOfTags) {
  vector<string> matchedDivTags;
  generateDivTagsFromPrefix(numberOfTags, numberOfTags, "", matchedDivTags);
  return matchedDivTags;
}

void generateDivTagsFromPrefix(int openingTagsNeeded, int closingTagsNeeded,
                               string prefix, vector<string> &result) {
  if (openingTagsNeeded > 0) {
    string newPrefix = prefix + "<div>";
    generateDivTagsFromPrefix(openingTagsNeeded - 1, closingTagsNeeded,
                              newPrefix, result);
  }

  if (openingTagsNeeded < closingTagsNeeded) {
    string newPrefix = prefix + "</div>";
    generateDivTagsFromPrefix(openingTagsNeeded, closingTagsNeeded - 1,
                              newPrefix, result);
  }

  if (closingTagsNeeded == 0)
    result.push_back(prefix);
}
```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      int input = 3;
      vector<string> expected = {"<div><div><div></div></div></div>",
                                 "<div><div></div><div></div></div>",
                                 "<div><div></div></div><div></div>",
                                 "<div></div><div><div></div></div>",
                                 "<div></div><div></div><div></div>"};
      auto actual = generateDivTags(input);
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

using System.Collections.Generic;
using System.Linq;
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int input = 3;
		List<string> expected = new List<string> {
			"<div><div><div></div></div></div>",
			"<div><div></div><div></div></div>", "<div><div></div></div><div></div>",
			"<div></div><div><div></div></div>",
			"<div></div><div></div><div></div>"
		};
		var actual = new Program().GenerateDivTags(input);
		Utils.AssertTrue(Enumerable.SequenceEqual(expected, actual));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {
	// O((2n)!/((n!((n + 1)!)))) time | O((2n)!/((n!((n + 1)!)))) space -
	// where n is the input number
	public List<string> GenerateDivTags(int numberOfTags) {
		List<string> matchedDivTags = new List<string>();
		GenerateDivTagsFromPrefix(numberOfTags, numberOfTags, "", matchedDivTags);
		return matchedDivTags;
	}

	public void GenerateDivTagsFromPrefix(int openingTagsNeeded, int closingTagsNeeded,
	  string prefix,
	  List<string> result) {
		if (openingTagsNeeded > 0) {
			string newPrefix = prefix + "<div>";
			GenerateDivTagsFromPrefix(openingTagsNeeded - 1, closingTagsNeeded,
			  newPrefix, result);
		}

		if (openingTagsNeeded < closingTagsNeeded) {
			string newPrefix = prefix + "</div>";
			GenerateDivTagsFromPrefix(openingTagsNeeded, closingTagsNeeded - 1,
			  newPrefix, result);
		}

		if (closingTagsNeeded == 0) {
			result.Add(prefix);
		}
	}
}
```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;
using System.Linq;
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int input = 3;
		List<string> expected = new List<string> {
			"<div><div><div></div></div></div>",
			"<div><div></div><div></div></div>", "<div><div></div></div><div></div>",
			"<div></div><div><div></div></div>",
			"<div></div><div></div><div></div>"
		};
		var actual = new Program().GenerateDivTags(input);
		Utils.AssertTrue(Enumerable.SequenceEqual(expected, actual));
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
	input := 3
	expected := []string{
		"<div><div><div></div></div></div>",
		"<div><div></div><div></div></div>",
		"<div><div></div></div><div></div>",
		"<div></div><div><div></div></div>",
		"<div></div><div></div><div></div>",
	}
	actual := GenerateDivTags(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O((2n)!/((n!((n + 1)!)))) time | O((2n)!/((n!((n + 1)!)))) space -
// where n is the input number
func GenerateDivTags(numberOfTags int) []string {
	matchedDivTags := []string{}
	generateDivTagsFromPrefix(numberOfTags, numberOfTags, "", &matchedDivTags)
	return matchedDivTags
}

func generateDivTagsFromPrefix(openingTagsNeeded int, closingTagsNeeded int, prefix string, result *[]string) {
	if openingTagsNeeded > 0 {
		newPrefix := prefix + "<div>"
		generateDivTagsFromPrefix(openingTagsNeeded-1, closingTagsNeeded, newPrefix, result)
	}

	if openingTagsNeeded < closingTagsNeeded {
		newPrefix := prefix + "</div>"
		generateDivTagsFromPrefix(openingTagsNeeded, closingTagsNeeded-1, newPrefix, result)
	}

	if closingTagsNeeded == 0 {
		*result = append(*result, prefix)
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
	input := 3
	expected := []string{
		"<div><div><div></div></div></div>",
		"<div><div></div><div></div></div>",
		"<div><div></div></div><div></div>",
		"<div></div><div><div></div></div>",
		"<div></div><div></div><div></div>",
	}
	actual := GenerateDivTags(input)
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
    int input = 3;
    ArrayList<String> expected =
        new ArrayList<String>(
            Arrays.asList(
                "<div><div><div></div></div></div>",
                "<div><div></div><div></div></div>",
                "<div><div></div></div><div></div>",
                "<div></div><div><div></div></div>",
                "<div></div><div></div><div></div>"));
    var actual = new Program().generateDivTags(input);
    Utils.assertTrue(expected.equals(actual));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O((2n)!/((n!((n + 1)!)))) time | O((2n)!/((n!((n + 1)!)))) space -
  // where n is the input number
  public ArrayList<String> generateDivTags(int numberOfTags) {
    ArrayList<String> matchedDivTags = new ArrayList<String>();
    generateDivTagsFromPrefix(numberOfTags, numberOfTags, "", matchedDivTags);
    return matchedDivTags;
  }

  public void generateDivTagsFromPrefix(
      int openingTagsNeeded, int closingTagsNeeded, String prefix, ArrayList<String> result) {
    if (openingTagsNeeded > 0) {
      String newPrefix = prefix + "<div>";
      generateDivTagsFromPrefix(openingTagsNeeded - 1, closingTagsNeeded, newPrefix, result);
    }

    if (openingTagsNeeded < closingTagsNeeded) {
      String newPrefix = prefix + "</div>";
      generateDivTagsFromPrefix(openingTagsNeeded, closingTagsNeeded - 1, newPrefix, result);
    }

    if (closingTagsNeeded == 0) {
      result.add(prefix);
    }
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int input = 3;
    ArrayList<String> expected =
        new ArrayList<String>(
            Arrays.asList(
                "<div><div><div></div></div></div>",
                "<div><div></div><div></div></div>",
                "<div><div></div></div><div></div>",
                "<div></div><div><div></div></div>",
                "<div></div><div></div><div></div>"));
    var actual = new Program().generateDivTags(input);
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
  const input = 3;
  const expected = [
    '<div><div><div></div></div></div>',
    '<div><div></div><div></div></div>',
    '<div><div></div></div><div></div>',
    '<div></div><div><div></div></div>',
    '<div></div><div></div><div></div>',
  ];
  const actual = program.generateDivTags(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O((2n)!/((n!((n + 1)!)))) time | O((2n)!/((n!((n + 1)!)))) space -
// where n is the input number
function generateDivTags(numberOfTags) {
  const matchedDivTags = [];
  generateDivTagsFromPrefix(numberOfTags, numberOfTags, '', matchedDivTags);
  return matchedDivTags;
}

function generateDivTagsFromPrefix(openingTagsNeeded, closingTagsNeeded, prefix, result) {
  if (openingTagsNeeded > 0) {
    const newPrefix = prefix + '<div>';
    generateDivTagsFromPrefix(openingTagsNeeded - 1, closingTagsNeeded, newPrefix, result);
  }

  if (openingTagsNeeded < closingTagsNeeded) {
    const newPrefix = prefix + '</div>';
    generateDivTagsFromPrefix(openingTagsNeeded, closingTagsNeeded - 1, newPrefix, result);
  }

  if (closingTagsNeeded === 0) result.push(prefix);
}

// Do not edit the line below.
exports.generateDivTags = generateDivTags;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = 3;
  const expected = [
    '<div><div><div></div></div></div>',
    '<div><div></div><div></div></div>',
    '<div><div></div></div><div></div>',
    '<div></div><div><div></div></div>',
    '<div></div><div></div><div></div>',
  ];
  const actual = program.generateDivTags(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.generateDivTags

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = 3
        val expected = listOf(
            "<div><div><div></div></div></div>",
            "<div><div></div><div></div></div>",
            "<div><div></div></div><div></div>",
            "<div></div><div><div></div></div>",
            "<div></div><div></div><div></div>"
        )
        val output = generateDivTags(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O((2n)!/((n!((n + 1)!)))) time | O((2n)!/((n!((n + 1)!)))) space -
// where n is the input number
fun generateDivTags(numberOfTags: Int): List<String> {
    val matchedDivTags = mutableListOf<String>()
    generateDivTagsFromPrefix(numberOfTags, numberOfTags, "", matchedDivTags)
    return matchedDivTags
}

fun generateDivTagsFromPrefix(openingTagsNeeded: Int, closingTagsNeeded: Int, prefix: String, result: MutableList<String>) {
    if (openingTagsNeeded > 0) {
        val newPrefix = prefix + "<div>"
        generateDivTagsFromPrefix(openingTagsNeeded - 1, closingTagsNeeded, newPrefix, result)
    }

    if (openingTagsNeeded < closingTagsNeeded) {
        val newPrefix = prefix + "</div>"
        generateDivTagsFromPrefix(openingTagsNeeded, closingTagsNeeded - 1, newPrefix, result)
    }

    if (closingTagsNeeded == 0) result.add(prefix)
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.generateDivTags

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = 3
        val expected = listOf(
            "<div><div><div></div></div></div>",
            "<div><div></div><div></div></div>",
            "<div><div></div></div><div></div>",
            "<div></div><div><div></div></div>",
            "<div></div><div></div><div></div>"
        )
        val output = generateDivTags(input)
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
      let input = 3
      let expected = [
        "<div><div><div></div></div></div>",
        "<div><div></div><div></div></div>",
        "<div><div></div></div><div></div>",
        "<div></div><div><div></div></div>",
        "<div></div><div></div><div></div>",
      ]
      var actual = Program().generateDivTags(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O((2n)!/((n!((n + 1)!)))) time | O((2n)!/((n!((n + 1)!)))) space -
  // where n is the input number
  func generateDivTags(_ numberOfTags: Int) -> [String] {
    var matchedDivTags = [String]()
    generateDivTagsFromPrefix(numberOfTags, numberOfTags, "", &matchedDivTags)
    return matchedDivTags
  }

  func generateDivTagsFromPrefix(_ openingTagsNeeded: Int, _ closingTagsNeeded: Int, _ prefix: String, _ result: inout [String]) {
    if openingTagsNeeded > 0 {
      let newPrefix = prefix + "<div>"
      generateDivTagsFromPrefix(openingTagsNeeded - 1, closingTagsNeeded, newPrefix, &result)
    }

    if openingTagsNeeded < closingTagsNeeded {
      let newPrefix = prefix + "</div>"
      generateDivTagsFromPrefix(openingTagsNeeded, closingTagsNeeded - 1, newPrefix, &result)
    }

    if closingTagsNeeded == 0 {
      result.append(prefix)
    }
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let input = 3
      let expected = [
        "<div><div><div></div></div></div>",
        "<div><div></div><div></div></div>",
        "<div><div></div></div><div></div>",
        "<div></div><div><div></div></div>",
        "<div></div><div></div><div></div>",
      ]
      var actual = Program().generateDivTags(input)
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
        input = 3
        expected = [
            "<div><div><div></div></div></div>",
            "<div><div></div><div></div></div>",
            "<div><div></div></div><div></div>",
            "<div></div><div><div></div></div>",
            "<div></div><div></div><div></div>",
        ]
        actual = program.generateDivTags(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O((2n)!/((n!((n + 1)!)))) time | O((2n)!/((n!((n + 1)!)))) space -
# where n is the input number
def generateDivTags(numberOfTags):
    matchedDivTags = []
    generateDivTagsFromPrefix(numberOfTags, numberOfTags, "", matchedDivTags)
    return matchedDivTags


def generateDivTagsFromPrefix(openingTagsNeeded, closingTagsNeeded, prefix, result):
    if openingTagsNeeded > 0:
        newPrefix = prefix + "<div>"
        generateDivTagsFromPrefix(openingTagsNeeded - 1, closingTagsNeeded, newPrefix, result)

    if openingTagsNeeded < closingTagsNeeded:
        newPrefix = prefix + "</div>"
        generateDivTagsFromPrefix(openingTagsNeeded, closingTagsNeeded - 1, newPrefix, result)

    if closingTagsNeeded == 0:
        result.append(prefix)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = 3
        expected = [
            "<div><div><div></div></div></div>",
            "<div><div></div><div></div></div>",
            "<div><div></div></div><div></div>",
            "<div></div><div><div></div></div>",
            "<div></div><div></div><div></div>",
        ]
        actual = program.generateDivTags(input)
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
  const input = 3;
  const expected = [
    '<div><div><div></div></div></div>',
    '<div><div></div><div></div></div>',
    '<div><div></div></div><div></div>',
    '<div></div><div><div></div></div>',
    '<div></div><div></div><div></div>',
  ];
  const actual = program.generateDivTags(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O((2n)!/((n!((n + 1)!)))) time | O((2n)!/((n!((n + 1)!)))) space -
// where n is the input number
export function generateDivTags(numberOfTags: number) {
  const matchedDivTags: string[] = [];
  generateDivTagsFromPrefix(numberOfTags, numberOfTags, '', matchedDivTags);
  return matchedDivTags;
}

function generateDivTagsFromPrefix(
  openingTagsNeeded: number,
  closingTagsNeeded: number,
  prefix: string,
  result: string[],
) {
  if (openingTagsNeeded > 0) {
    const newPrefix = prefix + '<div>';
    generateDivTagsFromPrefix(openingTagsNeeded - 1, closingTagsNeeded, newPrefix, result);
  }

  if (openingTagsNeeded < closingTagsNeeded) {
    const newPrefix = prefix + '</div>';
    generateDivTagsFromPrefix(openingTagsNeeded, closingTagsNeeded - 1, newPrefix, result);
  }

  if (closingTagsNeeded === 0) result.push(prefix);
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = 3;
  const expected = [
    '<div><div><div></div></div></div>',
    '<div><div></div><div></div></div>',
    '<div><div></div></div><div></div>',
    '<div></div><div><div></div></div>',
    '<div></div><div></div><div></div>',
  ];
  const actual = program.generateDivTags(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

