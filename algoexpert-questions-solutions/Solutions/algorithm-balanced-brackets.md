# Balanced Brackets
<div class="html">
<p>
  Write a function that takes in a string made up of brackets (<span>(</span>,
  <span>[</span>, <span>{</span>, <span>)</span>, <span>]</span>, and
  <span>}</span>) and other optional characters. The function should return a
  boolean representing whether the string is balanced with regards to brackets.
</p>
<p>
  A string is said to be balanced if it has as many opening brackets of a
  certain type as it has closing brackets of that type and if no bracket is
  unmatched. Note that an opening bracket can't match a corresponding closing
  bracket that comes before it, and similarly, a closing bracket can't match a
  corresponding opening bracket that comes after it. Also, brackets can't
  overlap each other as in
  <span>[(])</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">string</span> = "([])(){}(())()()"
</pre>
<h3>Sample Output</h3>
<pre>
true <span class="CodeEditor-promptComment">// it's balanced</span>
</pre>
</div>

Hint 1
<p>
If you iterate through the input string one character at a time, there are two scenarios in which the string will be unbalanced: either you run into a closing bracket with no prior matching opening bracket or you get to the end of the string with some opening brackets that haven't been matched. Can you use an auxiliary data structure to keep track of all the brackets and efficiently check if you run into a unbalanced scenario at every iteration?
</p>


Hint 2

<p>
Consider using a stack to store opening brackets as you traverse the string. The Last-In-First-Out property of the stack should allow you to match any closing brackets that you run into against the most recent opening bracket, if one exists, in which case you can simply pop it out of the stack. How can you check that there are no unmatched opening bracket once you've finished traversing through the string?
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
            []() { assert(balancedBrackets("([])(){}(())()()") == true); });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <unordered_map>
#include <stack>

using namespace std;

// O(n) time | O(n) space
bool balancedBrackets(string str) {
  string openingBrackets = "([{";
  string closingBrackets = ")]}";
  unordered_map<char, char> matchingBrackets{
      {')', '('}, {']', '['}, {'}', '{'}};
  stack<char> stack;
  for (char character : str) {
    if (openingBrackets.find(character) != string::npos) {
      stack.push(character);
    } else if (closingBrackets.find(character) != string::npos) {
      if (stack.size() == 0) {
        return false;
      }
      if (stack.top() == matchingBrackets[character]) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.size() == 0;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1",
            []() { assert(balancedBrackets("([])(){}(())()()") == true); });
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
		string input = "([])(){}(())()()";
		Utils.AssertTrue(Program.BalancedBrackets(input));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n) time | O(n) space
	public static bool BalancedBrackets(string str) {
		string openingBrackets = "([{";
		string closingBrackets = ")]}";
		Dictionary<char, char> matchingBrackets = new Dictionary<char, char>();
		matchingBrackets.Add(')', '(');
		matchingBrackets.Add(']', '[');
		matchingBrackets.Add('}', '{');
		List<char> stack = new List<char>();
		for (int i = 0; i < str.Length; i++) {
			char letter = str[i];
			if (openingBrackets.IndexOf(letter) != -1) {
				stack.Add(letter);
			} else if (closingBrackets.IndexOf(letter) != -1) {
				if (stack.Count == 0) {
					return false;
				}
				if (stack[stack.Count - 1] == matchingBrackets[letter]) {
					stack.RemoveAt(stack.Count - 1);
				} else {
					return false;
				}
			}
		}
		return stack.Count == 0;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		string input = "([])(){}(())()()";
		Utils.AssertTrue(Program.BalancedBrackets(input));
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
	output := BalancedBrackets("([])(){}(())()()")
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

var opening = map[rune]bool{
	'(': true,
	'[': true,
	'{': true,
}

var closing = map[rune]bool{
	')': true,
	']': true,
	'}': true,
}

var matching = map[rune]rune{
	')': '(',
	']': '[',
	'}': '{',
}

// O(n) time | O(n) space
func BalancedBrackets(s string) bool {
	stack := []rune{}
	for _, char := range s {
		if _, found := opening[char]; found {
			stack = append(stack, char)
			continue
		}
		if _, found := closing[char]; found {
			if len(stack) == 0 {
				return false
			}
			if stack[len(stack)-1] == matching[char] {
				stack = stack[0 : len(stack)-1]
			} else {
				return false
			}
		}
	}
	return len(stack) == 0
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
	output := BalancedBrackets("([])(){}(())()()")
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
    String input = "([])(){}(())()()";
    Utils.assertTrue(Program.balancedBrackets(input));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(n) space
  public static boolean balancedBrackets(String str) {
    String openingBrackets = "([{";
    String closingBrackets = ")]}";
    Map<Character, Character> matchingBrackets = new HashMap<Character, Character>();
    matchingBrackets.put(')', '(');
    matchingBrackets.put(']', '[');
    matchingBrackets.put('}', '{');
    List<Character> stack = new ArrayList<Character>();
    for (int i = 0; i < str.length(); i++) {
      char letter = str.charAt(i);
      if (openingBrackets.indexOf(letter) != -1) {
        stack.add(letter);
      } else if (closingBrackets.indexOf(letter) != -1) {
        if (stack.size() == 0) {
          return false;
        }
        if (stack.get(stack.size() - 1) == matchingBrackets.get(letter)) {
          stack.remove(stack.size() - 1);
        } else {
          return false;
        }
      }
    }
    return stack.size() == 0;
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    String input = "([])(){}(())()()";
    Utils.assertTrue(Program.balancedBrackets(input));
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
  chai.expect(program.balancedBrackets('([])(){}(())()()')).to.deep.equal(true);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space
function balancedBrackets(string) {
  const openingBrackets = '([{';
  const closingBrackets = ')]}';
  const matchingBrackets = {')': '(', ']': '[', '}': '{'};
  const stack = [];
  for (const char of string) {
    if (openingBrackets.includes(char)) {
      stack.push(char);
    } else if (closingBrackets.includes(char)) {
      if (stack.length == 0) {
        return false;
      }
      if (stack[stack.length - 1] === matchingBrackets[char]) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}

exports.balancedBrackets = balancedBrackets;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.balancedBrackets('([])(){}(())()()')).to.deep.equal(true);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.balancedBrackets

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = "([])(){}(())()()"
        assert(balancedBrackets(input))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import java.util.Stack

// O(n) time | O(n) space
fun balancedBrackets(string: String): Boolean {
    val openingBrackets = "([{"
    val closingBrackets = ")]}"
    val matchingBrackets = mapOf(')' to '(', ']' to '[', '}' to '{')
    val stack = Stack<Char>()
    for (char in string) {
        if (openingBrackets.contains(char)) {
            stack.add(char)
        } else if (closingBrackets.contains(char)) {
            if (stack.size == 0) {
                return false
            }
            if (stack.peek() == matchingBrackets[char]) {
                stack.pop()
            } else {
                return false
            }
        }
    }
    return stack.size == 0
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.balancedBrackets

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = "([])(){}(())()()"
        assert(balancedBrackets(input))
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
      try assertEqual(true, program.balancedBrackets(string: "([])(){}(())()()"))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space
  func balancedBrackets(string: String) -> Bool {
    let openingBrackets = "([{"
    let closingBrackets = ")]}"
    let matchingBrackets: [Character: Character] = [")": "(", "]": "[", "}": "{"]

    var stack = [Character]()

    for character in string {
      if openingBrackets.contains(character) {
        stack.append(character)
      } else if closingBrackets.contains(character) {
        if stack.count == 0 {
          return false
        } else {
          if let lastCharacter = stack.last, lastCharacter == matchingBrackets[character] {
            stack.popLast()
          } else {
            return false
          }
        }
      }
    }

    return stack.count == 0
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      try assertEqual(true, program.balancedBrackets(string: "([])(){}(())()()"))
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
        self.assertEqual(program.balancedBrackets("([])(){}(())()()"), True)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space
def balancedBrackets(string):
    openingBrackets = "([{"
    closingBrackets = ")]}"
    matchingBrackets = {")": "(", "]": "[", "}": "{"}
    stack = []
    for char in string:
        if char in openingBrackets:
            stack.append(char)
        elif char in closingBrackets:
            if len(stack) == 0:
                return False
            if stack[-1] == matchingBrackets[char]:
                stack.pop()
            else:
                return False
    return len(stack) == 0

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.balancedBrackets("([])(){}(())()()"), True)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.balancedBrackets('([])(){}(())()()')).to.deep.equal(true);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space
export function balancedBrackets(string: string) {
  const openingBrackets = '([{';
  const closingBrackets = ')]}';
  const matchingBrackets: {[key: string]: string} = {')': '(', ']': '[', '}': '{'};
  const stack: string[] = [];
  for (const char of string) {
    if (openingBrackets.includes(char)) {
      stack.push(char);
    } else if (closingBrackets.includes(char)) {
      if (stack.length == 0) {
        return false;
      }
      if (stack[stack.length - 1] === matchingBrackets[char]) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.balancedBrackets('([])(){}(())()()')).to.deep.equal(true);
});

```

