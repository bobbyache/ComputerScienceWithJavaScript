# Reverse Polish Notation
<div class="html">
  <p>
    You're given a list of string <span>tokens</span> representing a mathematical
    expression using Reverse Polish Notation. Reverse Polish Notation is a
    notation where operators come after operands, instead of between them. For
    example <span>2 4 +</span> would evaluate to <span>6</span>.
  </p>

  <p>
    Parenthesis are always implicit in Reverse Polish Notation, meaning an
    expression is evaluated from left to right. All of the operators for this
    problem take two operands, which will always be the two values immediately
    preceding the operator. For example, <span>18 4 - 7 /</span> would
    evaluate to <span>((18 - 4) / 7)</span> or <span>2</span>.
  </p>

  <p>
    Write a function that takes this list of <span>tokens</span> and returns
    the result. Your function should support four operators: <span>"+"</span>,
    <span>"-"</span>, <span>"*"</span>, and <span>"/"</span> for addition,
    subtraction, multiplication, and division respectively.
  </p>

  <p>
    Division should always be treated as integer division, rounding towards
    zero. For example, <span>3 / 2</span> evaluates to <span>1</span> and
    <span>-3 / 2</span> evaluates to <span>-1</span>. You can assume the
    input will always be valid Reverse Polish Notation, and it will always
    result in a valid number. Your code should not edit this input list.
  </p>
<h3>Sample Input</h3>
<pre><span class="CodeEditor-promptParameter">tokens</span> = ["50", "3", "17", "+", "2", "-", "/"]
</pre>
<h3>Sample Output</h3>
<pre>
2 <span class="CodeEditor-promptComment">// (50 / ((3 + 17) - 2)))</span>
</pre>
</div>

Hint 1
<p>
  Operators always operate on the two previous values. Is there a data
  structure that would assist in finding the two most recent values?
</p>


Hint 2

<p>
  It can be helpful to create a stack that contains all of the previously
  found or calculated values.
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
      vector<string> input = {"3", "2", "+", "7", "*"};
      int expected = 35;
      auto actual = reversePolishNotation(input);
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

// O(n) time | O(n) space - where n is the number of tokens
int reversePolishNotation(vector<string> tokens) {
  stack<int> stack;

  for (auto const &token : tokens) {
    if (token == "+") {
      int firstNum = stack.top();
      stack.pop();
      int secondNum = stack.top();
      stack.pop();
      stack.push(firstNum + secondNum);
    } else if (token == "-") {
      int firstNum = stack.top();
      stack.pop();
      int secondNum = stack.top();
      stack.pop();
      stack.push(secondNum - firstNum);
    } else if (token == "*") {
      int firstNum = stack.top();
      stack.pop();
      int secondNum = stack.top();
      stack.pop();
      stack.push(firstNum * secondNum);
    } else if (token == "/") {
      int firstNum = stack.top();
      stack.pop();
      int secondNum = stack.top();
      stack.pop();
      stack.push(secondNum / firstNum);
    } else {
      stack.push(stoi(token));
    }
  }

  return stack.top();
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<string> input = {"3", "2", "+", "7", "*"};
      int expected = 35;
      auto actual = reversePolishNotation(input);
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
		var input = new string[] {"3", "2", "+", "7", "*"};
		var expected = 35;
		var actual = new Program().ReversePolishNotation(input);
		Utils.AssertTrue(expected == actual);
	}
}


```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {

	// O(n) time | O(n) space - where n is the number of tokens
	public int ReversePolishNotation(string[] tokens) {
		Stack<int> stack = new Stack<int>();

		foreach (var token in tokens) {
			if (token.Equals("+")) {
				stack.Push(stack.Pop() + stack.Pop());
			} else if (token.Equals("-")) {
				int firstNum = stack.Pop();
				stack.Push(stack.Pop() - firstNum);
			} else if (token.Equals("*")) {
				stack.Push(stack.Pop() * stack.Pop());
			} else if (token.Equals("/")) {
				int firstNum = stack.Pop();
				stack.Push(stack.Pop() / firstNum);
			} else {
				stack.Push(Int32.Parse(token));
			}
		}
		return stack.Pop();
	}
}


```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		var input = new string[] {"3", "2", "+", "7", "*"};
		var expected = 35;
		var actual = new Program().ReversePolishNotation(input);
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
	input := []string{"3", "2", "+", "7", "*"}
	expected := 35
	actual := ReversePolishNotation(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "strconv"

// O(n) time | O(n) space - where n is the number of tokens
func ReversePolishNotation(tokens []string) int {
	stack := make([]int, 0)

	for _, token := range tokens {
		if token == "+" {
			result := popStack(&stack) + popStack(&stack)
			stack = append(stack, result)
		} else if token == "-" {
			firstNum := popStack(&stack)
			result := popStack(&stack) - firstNum
			stack = append(stack, result)
		} else if token == "*" {
			result := popStack(&stack) * popStack(&stack)
			stack = append(stack, result)
		} else if token == "/" {
			firstNum := popStack(&stack)
			result := popStack(&stack) / firstNum
			stack = append(stack, result)
		} else {
			n, _ := strconv.Atoi(token)
			stack = append(stack, n)
		}
	}
	return stack[len(stack)-1]
}

func popStack(stack *[]int) int {
	var n int
	n, *stack = (*stack)[len(*stack)-1], (*stack)[:len(*stack)-1]
	return n
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []string{"3", "2", "+", "7", "*"}
	expected := 35
	actual := ReversePolishNotation(input)
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
    var input = new String[] {"3", "2", "+", "7", "*"};
    var expected = 35;
    var actual = new Program().reversePolishNotation(input);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n) time | O(n) space - where n is the number of tokens
  public int reversePolishNotation(String[] tokens) {
    Stack<Integer> stack = new Stack<Integer>();

    for (String token : tokens) {
      if (token.equals("+")) {
        stack.add(stack.pop() + stack.pop());
      } else if (token.equals("-")) {
        int firstNum = (stack.pop());
        stack.add(stack.pop() - firstNum);
      } else if (token.equals("*")) {
        stack.add(stack.pop() * stack.pop());
      } else if (token.equals("/")) {
        int firstNum = stack.pop();
        stack.add(stack.pop() / firstNum);
      } else {
        stack.add(Integer.parseInt(token));
      }
    }
    return stack.pop();
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    var input = new String[] {"3", "2", "+", "7", "*"};
    var expected = 35;
    var actual = new Program().reversePolishNotation(input);
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
  const input = ['3', '2', '+', '7', '*'];
  const expected = 35;
  const actual = program.reversePolishNotation(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the number of tokens
function reversePolishNotation(tokens) {
  const stack = [];

  for (const token of tokens) {
    if (token === '+') {
      stack.push(stack.pop() + stack.pop());
    } else if (token === '-') {
      const firstNum = stack.pop();
      stack.push(stack.pop() - firstNum);
    } else if (token === '*') {
      stack.push(stack.pop() * stack.pop());
    } else if (token === '/') {
      const firstNum = stack.pop();
      stack.push(Math.trunc(stack.pop() / firstNum));
    } else {
      stack.push(parseInt(token));
    }
  }

  return stack.pop();
}

// Do not edit the line below.
exports.reversePolishNotation = reversePolishNotation;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = ['3', '2', '+', '7', '*'];
  const expected = 35;
  const actual = program.reversePolishNotation(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.reversePolishNotation

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf("3", "2", "+", "7", "*")
        val expected = 35
        val output = reversePolishNotation(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import java.util.Stack

// O(n) time | O(n) space - where n is the number of tokens
fun reversePolishNotation(tokens: MutableList<String>): Int {
    val stack = Stack<Int>()

    for (token in tokens) {
        if (token == "+") {
            stack.push(stack.pop()!! + stack.pop()!!)
        } else if (token == "-") {
            val firstNum = stack.pop()!!
            stack.push(stack.pop()!! - firstNum)
        } else if (token == "*") {
            stack.push(stack.pop()!! * stack.pop()!!)
        } else if (token == "/") {
            val firstNum = stack.pop()!!
            stack.push(stack.pop()!! / firstNum)
        } else {
            stack.push(token.toInt())
        }
    }

    return stack.pop()
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.reversePolishNotation

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf("3", "2", "+", "7", "*")
        val expected = 35
        val output = reversePolishNotation(input)
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
    runTest("Test Case 1") { () throws in
      var input = ["3", "2", "+", "7", "*"]
      var expected = 35
      var actual = Program().reversePolishNotation(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the number of tokens
  func reversePolishNotation(_ tokens: [String]) -> Int {
    var stack = [Int]()

    for token in tokens {
      if token == "+" {
        let result = stack.removeLast() + stack.removeLast()
        stack.append(result)
      } else if token == "-" {
        let firstNum = stack.removeLast()
        let result = stack.removeLast() - firstNum
        stack.append(result)
      } else if token == "*" {
        let result = stack.removeLast() * stack.removeLast()
        stack.append(result)
      } else if token == "/" {
        let firstNum = stack.removeLast()
        let result = stack.removeLast() / firstNum
        stack.append(result)
      } else {
        stack.append(Int(token)!)
      }
    }
    return stack.removeLast()
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws in
      var input = ["3", "2", "+", "7", "*"]
      var expected = 35
      var actual = Program().reversePolishNotation(input)
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
        input = ["3", "2", "+", "7", "*"]
        expected = 35
        actual = program.reversePolishNotation(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the number of tokens
def reversePolishNotation(tokens):
    stack = []

    for token in tokens:
        if token == "+":
            stack.append(stack.pop() + stack.pop())
        elif token == "-":
            firstNum = stack.pop()
            stack.append(stack.pop() - firstNum)
        elif token == "*":
            stack.append(stack.pop() * stack.pop())
        elif token == "/":
            firstNum = stack.pop()
            stack.append(int(stack.pop() / firstNum))
        else:
            stack.append(int(token))

    return stack.pop()

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = ["3", "2", "+", "7", "*"]
        expected = 35
        actual = program.reversePolishNotation(input)
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
  const input = ['3', '2', '+', '7', '*'];
  const expected = 35;
  const actual = program.reversePolishNotation(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the number of tokens
export function reversePolishNotation(tokens: string[]) {
  const stack: number[] = [];

  for (const token of tokens) {
    if (token === '+') {
      stack.push(stack.pop()! + stack.pop()!);
    } else if (token === '-') {
      const firstNum = stack.pop()!;
      stack.push(stack.pop()! - firstNum);
    } else if (token === '*') {
      stack.push(stack.pop()! * stack.pop()!);
    } else if (token === '/') {
      const firstNum = stack.pop()!;
      stack.push(Math.trunc(stack.pop()! / firstNum));
    } else {
      stack.push(parseInt(token));
    }
  }

  return stack.pop();
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = ['3', '2', '+', '7', '*'];
  const expected = 35;
  const actual = program.reversePolishNotation(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

