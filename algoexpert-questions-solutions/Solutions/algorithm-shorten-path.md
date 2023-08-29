# Shorten Path
<div class="html">
<p>
  Write a function that takes in a non-empty string representing a valid
  Unix-shell path and returns a shortened version of that path.
</p>
<p>
  A path is a notation that represents the location of a file or directory in a
  file system.
</p>
<p>
  A path can be an absolute path, meaning that it starts at the root directory
  in a file system, or a relative path, meaning that it starts at the current
  directory in a file system.
</p>
<p>In a Unix-like operating system, a path is bound by the following rules:</p>
<ul>
  <li>
    The root directory is represented by a <span>/</span>. This means that if
    a path <i>starts</i> with <span>/</span>, it's an absolute path; if it
    doesn't, it's a relative path.
  </li>
  <li>
    The symbol <span>/</span> otherwise represents the directory separator.
    This means that the path <span>/foo/bar</span> is the location of the
    directory <span>bar</span> inside the directory <span>foo</span>, which is
    itself located inside the root directory.
  </li>
  <li>
    The symbol <span>..</span> represents the parent directory. This means
    that accessing files or directories in <span>/foo/bar/..</span> is
    equivalent to accessing files or directories in <span>/foo</span>.
  </li>
  <li>
    The symbol <span>.</span> represents the current directory. This means
    that accessing files or directories in <span>/foo/bar/.</span> is equivalent
    to accessing files or directories in <span>/foo/bar</span>.
  </li>
  <li>
    The symbols <span>/</span> and <span>.</span> can be repeated sequentially
    without consequence; the symbol <span>..</span> cannot, however, because
    repeating it sequentially means going further up in parent directories. For
    example, <span>/foo/bar/baz/././.</span> and <span>/foo/bar/baz</span> are
    equivalent paths, but <span>/foo/bar/baz/../../../</span> and
    <span>/foo/bar/baz</span> definitely aren't. The only exception is with the
    root directory: <span>/../../..</span> and <span>/</span> are equivalent,
    because the root directory has no parent directory, which means that
    repeatedly accessing parent directories does nothing.
  </li>
</ul>
<p>
  Note that the shortened version of the path must be equivalent to the original
  path. In other words, it must point to the same file or directory as the
  original path.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">path</span> = "/foo/../test/../test/../foo//bar/./baz"
</pre>
<h3>Sample Output</h3>
<pre>
"/foo/bar/baz" <span class="CodeEditor-promptComment">// This path is equivalent to the input path.</span>
</pre>
</div>

Hint 1
<p>
A path effectively consists of meaningful "tokens" (like directory names and symbols) that have been put together. Try transforming the string version of the path into a list of meaningful tokens that you can then analyze as you see fit.
</p>


Hint 2

<p>
Split the input path around the directory separator "/" using a native "split" function and try eliminating meaningless tokens from the resulting list of tokens. Meaningless tokens will include the empty string and the "." symbol, since the emptry string will represent sequential "/"s, which are effectively useless, and the "." symbol is also effectively useless.
</p>


Hint 3

<p>
The ".." symbol essentially requires you to remove the previous token in the list of tokens; try using a stack to implement the logic of parsing out ".." symbols and the relevant parent directories.
</p>


Hint 4

<p>
You'll need to handle two edge cases: the case where the path is an absolute one (for this, you'll have to identify if the path starts with a "/" at the beginning of your algorithm and then tweak other logic accordingly) and the case where the path is a relative one that starts with one or multiple ".." symbols (in this case, you'll want to keep these symbols, since they're meaningful to the path).
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

#include "program.cpp"

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      string expected = "/foo/bar/baz";
      string actual = shortenPath("/foo/../test/../test/../foo//bar/./baz");
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <sstream>
using namespace std;

bool isImportantToken(string token);

// O(n) time | O(n) space - where n is the length of the path
string shortenPath(string path) {
  bool startsWithSlash = path[0] == '/';
  istringstream iss(path);
  string token;

  vector<string> tokens;
  vector<string> filteredTokens;
  while (getline(iss, token, '/')) {
    tokens.push_back(token);
  }
  copy_if(tokens.begin(), tokens.end(), back_inserter(filteredTokens),
          isImportantToken);

  vector<string> stack;
  if (startsWithSlash)
    stack.push_back("");
  for (string token : filteredTokens) {
    if (token == "..") {
      if (stack.size() == 0 || stack[stack.size() - 1] == "..") {
        stack.push_back(token);
      } else if (stack[stack.size() - 1] != "") {
        stack.pop_back();
      }
    } else {
      stack.push_back(token);
    }
  }

  if (stack.size() == 1 && stack[0] == "")
    return "/";

  ostringstream oss;
  for (auto i = 0; i < stack.size(); i++) {
    if (i != 0)
      oss << "/";
    oss << stack[i];
  }

  return oss.str();
}

bool isImportantToken(string token) { return token.length() && token != "."; }

```
### Unit Tests 1 (cpp)
```cpp
#include "program.cpp"

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      string expected = "/foo/bar/baz";
      string actual = shortenPath("/foo/../test/../test/../foo//bar/./baz");
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

public class ProgramTest {
	[Test]
	public void TestCase1() {
		var expected = "/foo/bar/baz";
		var actual = Program.ShortenPath("/foo/../test/../test/../foo//bar/./baz");
		Utils.AssertEquals(expected, actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Linq;
using System.Collections.Generic;

public class Program {
	// O(n) time | O(n) space - where n is the length of the path
	public static string ShortenPath(string path) {
		bool startsWithPath = path[0] == '/';
		string[] tokensArr = path.Split("/");
		List<string> tokensList = new List<string>(tokensArr);
		List<string> filteredTokens = tokensList.FindAll(token => isImportantToken(token));
		Stack<string> stack = new Stack<string>();
		if (startsWithPath) stack.Push("");
		foreach (string token in filteredTokens) {
			if (token.Equals("..")) {
				if (stack.Count == 0 || stack.Peek().Equals("..")) {
					stack.Push(token);
				} else if (!stack.Peek().Equals("")) {
					stack.Pop();
				}
			} else {
				stack.Push(token);
			}
		}

		if (stack.Count == 1 && stack.Peek().Equals("")) return "/";
		var arr = stack.ToArray();
		Array.Reverse(arr);
		return String.Join("/", arr);
	}

	public static bool isImportantToken(string token) {
		return token.Length > 0 && !token.Equals(".");
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		var expected = "/foo/bar/baz";
		var actual = Program.ShortenPath("/foo/../test/../test/../foo//bar/./baz");
		Utils.AssertEquals(expected, actual);
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
	expected := "/foo/bar/baz"
	output := ShortenPath("/foo/../test/../test/../foo//bar/./baz")
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "strings"

// O(n) time | O(n) space - where n is the length of the path
func ShortenPath(path string) string {
	startsWithSlash := path[0] == '/'
	splits := strings.Split(path, "/")
	tokens := []string{}
	for _, token := range splits {
		if isImportantToken(token) {
			tokens = append(tokens, token)
		}
	}

	stack := []string{}
	if startsWithSlash {
		stack = append(stack, "")
	}
	for _, token := range tokens {
		if token == ".." {
			if len(stack) == 0 || stack[len(stack)-1] == ".." {
				stack = append(stack, token)
			} else if stack[len(stack)-1] != "" {
				stack = stack[:len(stack)-1]
			}
		} else {
			stack = append(stack, token)
		}
	}

	if len(stack) == 1 && stack[0] == "" {
		return "/"
	}
	return strings.Join(stack, "/")
}

func isImportantToken(token string) bool {
	return len(token) > 0 && token != "."
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := "/foo/bar/baz"
	output := ShortenPath("/foo/../test/../test/../foo//bar/./baz")
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
    var expected = "/foo/bar/baz";
    var actual = Program.shortenPath("/foo/../test/../test/../foo//bar/./baz");
    Utils.assertEquals(expected, actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;
import java.util.stream.Collectors;

class Program {
  // O(n) time | O(n) space - where n is the length of the path
  public static String shortenPath(String path) {
    boolean startsWithPath = path.charAt(0) == '/';
    String[] tokensArr = path.split("/");
    List<String> tokensList = Arrays.asList(tokensArr);
    List<String> filteredTokens =
        tokensList.stream().filter(token -> isImportantToken(token)).collect(Collectors.toList());
    List<String> stack = new ArrayList<String>();
    if (startsWithPath) stack.add("");
    for (String token : filteredTokens) {
      if (token.equals("..")) {
        if (stack.size() == 0 || stack.get(stack.size() - 1).equals("..")) {
          stack.add(token);
        } else if (!stack.get(stack.size() - 1).equals("")) {
          stack.remove(stack.size() - 1);
        }
      } else {
        stack.add(token);
      }
    }

    if (stack.size() == 1 && stack.get(0).equals("")) return "/";
    return String.join("/", stack);
  }

  public static boolean isImportantToken(String token) {
    return token.length() > 0 && !token.equals(".");
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    var expected = "/foo/bar/baz";
    var actual = Program.shortenPath("/foo/../test/../test/../foo//bar/./baz");
    Utils.assertEquals(expected, actual);
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
  const input = '/foo/../test/../test/../foo//bar/./baz';
  chai.expect(program.shortenPath(input)).to.deep.equal('/foo/bar/baz');
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the path
function shortenPath(path) {
  const startsWithSlash = path[0] === '/';
  const tokens = path.split('/').filter(isImportantToken);
  const stack = [];
  if (startsWithSlash) stack.push('');
  for (const token of tokens) {
    if (token === '..') {
      if (stack.length === 0 || stack[stack.length - 1] === '..') {
        stack.push(token);
      } else if (stack[stack.length - 1] !== '') {
        stack.pop();
      }
    } else {
      stack.push(token);
    }
  }

  if (stack.length === 1 && stack[0] === '') return '/';
  return stack.join('/');
}

function isImportantToken(token) {
  return token.length > 0 && token !== '.';
}

exports.shortenPath = shortenPath;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = '/foo/../test/../test/../foo//bar/./baz';
  chai.expect(program.shortenPath(input)).to.deep.equal('/foo/bar/baz');
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.shortenPath

class ProgramTest {
    @Test
    fun TestCase1() {
        val expected = "/foo/bar/baz"
        val output = shortenPath("/foo/../test/../test/../foo//bar/./baz")
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import java.util.Stack

// O(n) time | O(n) space - where n is the length of the path
fun shortenPath(path: String): String {
    val startsWithPath = path[0] == '/'
    val tokensList = path.split("/")
    val filteredTokens = tokensList.filter({ token -> isImportantToken(token) })
    val stack = Stack<String>()
    if (startsWithPath) stack.push("")
    for (token in filteredTokens) {
        if (token == "..") {
            if (stack.size == 0 || stack.peek() == "..") {
                stack.add(token)
            } else if (stack.peek() != "") {
                stack.pop()
            }
        } else {
            stack.add(token)
        }
    }
    if (stack.size == 1 && stack.peek() == "") return "/"
    return stack.toList().joinToString("/")
}

fun isImportantToken(token: String): Boolean {
    return token.length > 0 && token != "."
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.shortenPath

class ProgramTest {
    @Test
    fun TestCase1() {
        val expected = "/foo/bar/baz"
        val output = shortenPath("/foo/../test/../test/../foo//bar/./baz")
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
      let expected = "/foo/bar/baz"
      try assert(Program.shortenPath("/foo/../test/../test/../foo//bar/./baz") == expected)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the length of the path
  static func shortenPath(_ path: String) -> String {
    let startsWithSlash = path.first == "/"
    let splits = path.components(separatedBy: "/")
    var tokens = [String]()
    for token in splits {
      if isImportantToken(token) {
        tokens.append(token)
      }
    }

    var stack = [String]()
    if startsWithSlash {
      stack.append("")
    }
    for token in tokens {
      if token == ".." {
        if stack.count == 0 || stack[stack.count - 1] == ".." {
          stack.append(token)
        } else if stack[stack.count - 1] != "" {
          stack.removeLast()
        }
      } else {
        stack.append(token)
      }
    }

    if stack.count == 1, stack[0] == "" {
      return "/"
    }
    return stack.joined(separator: "/")
  }

  static func isImportantToken(_ token: String) -> Bool {
    return token.length > 0 && token != "."
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let expected = "/foo/bar/baz"
      try assert(Program.shortenPath("/foo/../test/../test/../foo//bar/./baz") == expected)
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
        expected = "/foo/bar/baz"
        output = program.shortenPath("/foo/../test/../test/../foo//bar/./baz")
        self.assertEqual(output, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the length of the path
def shortenPath(path):
    startsWithSlash = path[0] == "/"
    tokens = filter(isImportantToken, path.split("/"))
    stack = []
    if startsWithSlash:
        stack.append("")
    for token in tokens:
        if token == "..":
            if len(stack) == 0 or stack[-1] == "..":
                stack.append(token)
            elif stack[-1] != "":
                stack.pop()
        else:
            stack.append(token)

    if len(stack) == 1 and stack[0] == "":
        return "/"
    return "/".join(stack)


def isImportantToken(token):
    return len(token) > 0 and token != "."

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        expected = "/foo/bar/baz"
        output = program.shortenPath("/foo/../test/../test/../foo//bar/./baz")
        self.assertEqual(output, expected)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = '/foo/../test/../test/../foo//bar/./baz';
  chai.expect(program.shortenPath(input)).to.deep.equal('/foo/bar/baz');
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the path
export function shortenPath(path: string) {
  const startsWithSlash = path[0] === '/';
  const tokens = path.split('/').filter(isImportantToken);
  const stack: string[] = [];
  if (startsWithSlash) stack.push('');
  for (const token of tokens) {
    if (token === '..') {
      if (stack.length === 0 || stack[stack.length - 1] === '..') {
        stack.push(token);
      } else if (stack[stack.length - 1] !== '') {
        stack.pop();
      }
    } else {
      stack.push(token);
    }
  }

  if (stack.length === 1 && stack[0] === '') return '/';
  return stack.join('/');
}

function isImportantToken(token: string) {
  return token.length > 0 && token !== '.';
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = '/foo/../test/../test/../foo//bar/./baz';
  chai.expect(program.shortenPath(input)).to.deep.equal('/foo/bar/baz');
});

```

