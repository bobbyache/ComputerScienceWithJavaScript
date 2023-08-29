# Best Digits
<div class="html">
<p>
  Write a function that takes a positive integer represented as a string
  <span>number</span> and an integer <span>numDigits</span>.
  Remove <span>numDigits</span> from the string so that the number represented
  by the string is as large as possible afterwards.
</p>
<p>
  Note that the order of the remaining digits cannot be changed. You can assume
  <span>numDigits</span> will always be less than the length of <span>number</span>
  and greater than or equal to 0.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">number</span> = "462839"
<span class="CodeEditor-promptParameter">numDigits</span> = 2
</pre>
<h3>Sample Output</h3>
<pre>
"6839" <span class="CodeEditor-promptComment">// remove digits 4 and 2</span>
</pre>
</div>

Hint 1
<p>
If we want the number to be as large as possible then which digits would we want to remove? Consider the importance
of place values. For example if we're given <span>number = "191"</span> and <span>numDigits = 1</span> then which 1
would we remove?
</p>


Hint 2

<p>
It's most important that the largest place values have the highest value digits. If you traverse the string from left to
right then you will be traversing the place values in order of importance. If you still have digits to remove then you
need to remove smaller digits in higher place values. The question then becomes how can you know what comes later on in
the string? If you want to solve this problem in linear time what data structure might help you in this situation?
</p>


Hint 3

<p>
Use a stack to push digits onto while traversing the string from left to right. That way top of the stack will always
have the digit in the last highest place value. Compare the top of the stack to the current digit and if the current
digit is greater than the top of the stack, then pop from the stack. Utilizing a stack allows you to replace small
digits with largest digits that come later in the string because you can pop off of the stack in order of importance.

You will need to build a string to return from the final stack.
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
      string number = "462839";
      int numDigits = 2;
      string expected = "6839";
      auto actual = bestDigits(number, numDigits);
      assert(expected == actual);
    });
  }
};


```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <stack>

using namespace std;

// O(n) time | O(n) space - where n is the length of the input string
string bestDigits(string number, int numDigits) {
  stack<char> stack;

  for (auto character: number) {
    while (numDigits > 0 && !stack.empty() && character > stack.top()) {
      numDigits--;
      stack.pop();
    }
    stack.push(character);
  }

  while (numDigits > 0) {
    numDigits--;
    stack.pop();
  }

  // build final string from stack
  string bestDigitString = "";
  while (!stack.empty()) {
    bestDigitString += stack.top();
    stack.pop();
  }

  reverse(bestDigitString.begin(), bestDigitString.end());

  return bestDigitString;
}


```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      string number = "462839";
      int numDigits = 2;
      string expected = "6839";
      auto actual = bestDigits(number, numDigits);
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
    string number = "462839";
    int numDigits = 2;
    string expected = "6839";
    var actual = new Program().BestDigits(number, numDigits);
    Utils.AssertTrue(expected.Equals(actual));
  }
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System.Text;
using System;


public class Program {

  // O(n) time | O(n) space - where n is the length of the input string
  public string BestDigits(string number, int numDigits) {
    Stack<char> stack = new Stack<char>();

    for (int idx = 0; idx < number.Length; idx++) {
      char character = number[idx];
      while (numDigits > 0 && stack.Count > 0 && character > stack.Peek()) {
        numDigits--;
        stack.Pop();
      }
      stack.Push(character);
    }

    while (numDigits > 0) {
      numDigits--;
      stack.Pop();
    }

    // build final string from stack
    StringBuilder bestDigitString = new StringBuilder();
    while (stack.Count > 0) {
      bestDigitString.Append(stack.Pop());
    }

    var charArray = bestDigitString.ToString().ToCharArray();
    Array.Reverse(charArray);
    return new string(charArray);
  }
}

```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
  [Test]
  public void TestCase1() {
    string number = "462839";
    int numDigits = 2;
    string expected = "6839";
    var actual = new Program().BestDigits(number, numDigits);
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
	number := "462839"
	numDigits := 2
	expected := "6839"
	actual := BestDigits(number, numDigits)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space - where n is the length of the input string
func BestDigits(number string, numDigits int) string {
	stack := make([]rune, 0)

	for _, digit := range number {
		for numDigits > 0 && len(stack) > 0 && digit > stack[len(stack)-1] {
			numDigits -= 1
			stack = stack[:len(stack)-1]
		}

		stack = append(stack, digit)
	}

	for numDigits > 0 {
		numDigits -= 1
		stack = stack[:len(stack)-1]
	}

	return string(stack)
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	number := "462839"
	numDigits := 2
	expected := "6839"
	actual := BestDigits(number, numDigits)
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
    String number = "462839";
    int numDigits = 2;
    String expected = "6839";
    var actual = new Program().bestDigits(number, numDigits);
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
  public String bestDigits(String number, int numDigits) {
    Stack<Character> stack = new Stack<Character>();

    for (int idx = 0; idx < number.length(); idx++) {
      char character = number.charAt(idx);
      while (numDigits > 0 && !stack.isEmpty() && character > stack.peek()) {
        numDigits--;
        stack.pop();
      }
      stack.push(character);
    }

    while (numDigits > 0) {
      numDigits--;
      stack.pop();
    }

    // build final string from stack
    StringBuilder bestDigitString = new StringBuilder();
    while (!stack.isEmpty()) {
      bestDigitString.append(stack.pop());
    }

    bestDigitString.reverse();

    return bestDigitString.toString();
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    String number = "462839";
    int numDigits = 2;
    String expected = "6839";
    var actual = new Program().bestDigits(number, numDigits);
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
  const number = "462839";
  const numDigits = 2;
  const expected = "6839";
  const actual = program.bestDigits(number, numDigits);
  chai.expect(actual).to.deep.equal(expected);
});


```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input string
function bestDigits(number, numDigits) {
  const stack = [];

  for (const digit of number) {
    while (numDigits > 0 && stack.length > 0 && digit > stack[stack.length - 1]) {
      numDigits--;
      stack.pop();
    }

    stack.push(digit)
  }

  while (numDigits > 0) {
    numDigits--;
    stack.pop();
  }

  return stack.join("");
}

// Do not edit the line below.
exports.bestDigits = bestDigits;


```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const number = "462839";
  const numDigits = 2;
  const expected = "6839";
  const actual = program.bestDigits(number, numDigits);
  chai.expect(actual).to.deep.equal(expected);
});


```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.bestDigits

class ProgramTest {
    @Test
    fun TestCase1() {
        val number = "462839"
        val numDigits = 2
        val expected = "6839"
        val output = bestDigits(number, numDigits)
        assert(expected == output)
    }
}


```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import java.util.Stack

// O(n) time | O(n) space - where n is the length of the input string
fun bestDigits(number: String, numDigits: Int): String {
  val stack = Stack<Char>()
  var numDigitsRemaining = numDigits

  for (digit in number) {
    while (numDigitsRemaining > 0 && stack.size > 0 && digit > stack[stack.size - 1]) {
      numDigitsRemaining--
      stack.pop()
    }

    stack.push(digit)
  }

  while (numDigitsRemaining > 0) {
    numDigitsRemaining--
    stack.pop()
  }

  return stack.joinToString("")
}


```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.bestDigits

class ProgramTest {
    @Test
    fun TestCase1() {
        val number = "462839"
        val numDigits = 2
        val expected = "6839"
        val output = bestDigits(number, numDigits)
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
      var number = "462839";
      var numDigits = 2;
      var expected = "6839"
      var actual = Program().bestDigits(number, numDigits)
      try assertEqual(expected, actual)
    }
  }
}


```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {

  func bestDigits(_ number: String, _ numDigits: Int) -> String {
    var numDigits = numDigits
    var stack = [Character]()

    for digit in number {
      while numDigits > 0 && stack.count > 0 && digit > stack[stack.count - 1] {
        numDigits -= 1
        stack.removeLast()
      }

      stack.append(digit)
    }

    while numDigits > 0 {
      numDigits -= 1
      stack.removeLast()
    }

    return String(stack)
  }
}


```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var number = "462839";
      var numDigits = 2;
      var expected = "6839"
      var actual = Program().bestDigits(number, numDigits)
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
        number = "462839"
        numDigits = 2
        expected = "6839"
        actual = program.bestDigits(number, numDigits)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the length of the input string
def bestDigits(number, numDigits):
    stack = []

    for digit in number:
        while numDigits > 0 and len(stack) > 0 and digit > stack[len(stack) - 1]:
            numDigits -= 1
            stack.pop()

        stack.append(digit)

    while numDigits > 0:
        numDigits -= 1
        stack.pop()

    return "".join(stack)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        number = "462839"
        numDigits = 2
        expected = "6839"
        actual = program.bestDigits(number, numDigits)
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
  const number = "462839";
  const numDigits = 2;
  const expected = "6839";
  const actual = program.bestDigits(number, numDigits);
  chai.expect(actual).to.deep.equal(expected);
});
```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input string
export function bestDigits(number: string, numDigits: number) {
  const stack: string[] = [];

  for (const digit of number) {
    while (numDigits > 0 && stack.length > 0 && digit > stack[stack.length - 1]) {
      numDigits--;
      stack.pop();
    }

    stack.push(digit)
  }

  while (numDigits > 0) {
    numDigits--;
    stack.pop();
  }

  return stack.join("");
}
```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const number = "462839";
  const numDigits = 2;
  const expected = "6839";
  const actual = program.bestDigits(number, numDigits);
  chai.expect(actual).to.deep.equal(expected);
});
```

