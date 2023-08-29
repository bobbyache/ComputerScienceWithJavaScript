# Sort Stack
<div class="html">
<p>
  Write a function that takes in an array of integers representing a stack,
  recursively sorts the stack in place (i.e., doesn't create a brand new array),
  and returns it.
</p>
<p>
  The array must be treated as a stack, with the end of the array as the top of
  the stack. Therefore, you're only allowed to
</p>
<ul>
  <li>
    Pop elements from the top of the stack by removing elements from the end of
    the array using the built-in <span>.pop()</span> method in your programming
    language of choice.
  </li>
  <li>
    Push elements to the top of the stack by appending elements to the end of
    the array using the built-in <span>.append()</span> method in your
    programming language of choice.
  </li>
  <li>
    Peek at the element on top of the stack by accessing the last element in the
    array.
  </li>
</ul>
<p>
  You're not allowed to perform any other operations on the input array,
  including accessing elements (except for the last element), moving elements,
  etc.. You're also not allowed to use any other data structures, and your
  solution must be recursive.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">stack</span> = [-5, 2, -2, 4, 3, 1]
</pre>
<h3>Sample Output</h3>
<pre>
[-5, -2, 1, 2, 3, 4]
</pre>
</div>

Hint 1
<p>
  If you had to insert a single item into an already sorted stack, all the while
  abiding by the constraints of this problem, how would you do that?
</p>


Hint 2

<p>
  Inserting a single item in an already sorted stack is fairly simple: you can
  pop elements off of the stack until you find an element that's smaller than or
  equal to the value that you want to add. Then, you can push that value on top
  of the stack and reinsert all the previously popped items back on top of the
  stack in the reverse order in which you popped them off. The resulting stack
  will still be sorted.
</p>


Hint 3

<p>
  You can easily insert multiple items in an already sorted stack by just
  repeatedly performing what's described in Hint #2. However, you'll need to
  have an already sorted stack. To get an already sorted stack, you'll need to
  pop all of the elements off the <i>unsorted</i> stack until it's eventually
  empty, and then you'll need to push all of the items back on the stack,
  inserting them in their sorted order one at a time.
</p>


Hint 4

<p>
  If you're thinking about Hint #3 recursively, the steps are the following:
</p>
<ol>
  <li>Pop an item from the top of the stack, and hold onto it in memory.</li>
  <li>
    Sort the rest of the stack. To do so, repeat step #1 until the stack is
    empty, at which point you've reached the base case since an empty stack is
    always sorted.
  </li>
  <li>
    Insert the most recently popped off item from step #1 back into the now
    sorted stack but in its proper sorted position. The first time that you
    reinsert an item, it'll be inserted in an empty stack.
  </li>
</ol>

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
      vector<int> input = {-5, 2, -2, 4, 3, 1};
      vector<int> expected = {-5, -2, 1, 2, 3, 4};
      auto actual = sortStack(input);
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

void insertInSortedStackOrder(vector<int> &stack, int value);

// O(n^2) time | O(n) space - where n is the length of the stack
vector<int> sortStack(vector<int> &stack) {
  if (stack.size() == 0) {
    return stack;
  }

  int top = stack.back();
  stack.pop_back();

  sortStack(stack);

  insertInSortedStackOrder(stack, top);

  return stack;
}

void insertInSortedStackOrder(vector<int> &stack, int value) {
  if (stack.size() == 0 || stack.back() <= value) {
    stack.push_back(value);
    return;
  }

  int top = stack.back();
  stack.pop_back();

  insertInSortedStackOrder(stack, value);

  stack.push_back(top);
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> input = {-5, 2, -2, 4, 3, 1};
      vector<int> expected = {-5, -2, 1, 2, 3, 4};
      auto actual = sortStack(input);
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
		List<int> stack = new List<int> {
			-5, 2, -2, 4, 3, 1
		};
		List<int> expected = new List<int> {
			-5, -2, 1, 2, 3, 4
		};
		var actual = new Program().SortStack(stack);
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

	// O(n^2) time | O(n) space - where n is the length of the stack
	public List<int> SortStack(List<int> stack) {
		if (stack.Count == 0) {
			return stack;
		}

		int top = stack[stack.Count - 1];
		stack.RemoveAt(stack.Count - 1);

		SortStack(stack);

		insertInSortedOrder(stack, top);

		return stack;
	}

	public void insertInSortedOrder(List<int> stack, int value) {
		if (stack.Count == 0 || (stack[stack.Count - 1] <= value)) {
			stack.Add(value);
			return;
		}

		int top = stack[stack.Count - 1];
		stack.RemoveAt(stack.Count - 1);

		insertInSortedOrder(stack, value);

		stack.Add(top);
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
		List<int> stack = new List<int> {
			-5, 2, -2, 4, 3, 1
		};
		List<int> expected = new List<int> {
			-5, -2, 1, 2, 3, 4
		};
		var actual = new Program().SortStack(stack);
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
	input := []int{-5, 2, -2, 4, 3, 1}
	expected := []int{-5, -2, 1, 2, 3, 4}
	actual := SortStack(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n^2) time | O(n) space - where n is the length of the stack
func SortStack(stack []int) []int {
	if len(stack) == 0 {
		return stack
	}

	top := stack[len(stack)-1]
	stack = stack[:len(stack)-1]
	SortStack(stack)

	insertInSortedOrder(&stack, top)
	return stack
}

func insertInSortedOrder(stack *[]int, value int) {
	if len(*stack) == 0 || (*stack)[len(*stack)-1] <= value {
		*stack = append(*stack, value)
		return
	}

	top := (*stack)[len(*stack)-1]
	*stack = (*stack)[:len(*stack)-1]
	insertInSortedOrder(stack, value)
	*stack = append(*stack, top)
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []int{-5, 2, -2, 4, 3, 1}
	expected := []int{-5, -2, 1, 2, 3, 4}
	actual := SortStack(input)
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
    ArrayList<Integer> stack = new ArrayList<Integer>(Arrays.asList(-5, 2, -2, 4, 3, 1));
    ArrayList<Integer> expected = new ArrayList<Integer>(Arrays.asList(-5, -2, 1, 2, 3, 4));
    var actual = new Program().sortStack(stack);
    Utils.assertTrue(expected.equals(actual));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n^2) time | O(n) space - where n is the length of the stack
  public ArrayList<Integer> sortStack(ArrayList<Integer> stack) {
    if (stack.size() == 0) {
      return stack;
    }

    int top = stack.remove(stack.size() - 1);

    sortStack(stack);

    insertInSortedOrder(stack, top);

    return stack;
  }

  public void insertInSortedOrder(ArrayList<Integer> stack, int value) {
    if (stack.size() == 0 || (stack.get(stack.size() - 1) <= value)) {
      stack.add(value);
      return;
    }

    int top = stack.remove(stack.size() - 1);

    insertInSortedOrder(stack, value);

    stack.add(top);
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    ArrayList<Integer> stack = new ArrayList<Integer>(Arrays.asList(-5, 2, -2, 4, 3, 1));
    ArrayList<Integer> expected = new ArrayList<Integer>(Arrays.asList(-5, -2, 1, 2, 3, 4));
    var actual = new Program().sortStack(stack);
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
  const input = [-5, 2, -2, 4, 3, 1];
  const expected = [-5, -2, 1, 2, 3, 4];
  const actual = program.sortStack(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space - where n is the length of the stack
function sortStack(stack) {
  if (stack.length === 0) return stack;

  const top = stack.pop();

  sortStack(stack);

  insertInSortedOrder(stack, top);

  return stack;
}

function insertInSortedOrder(stack, value) {
  if (stack.length === 0 || stack[stack.length - 1] <= value) {
    stack.push(value);
    return;
  }

  const top = stack.pop();

  insertInSortedOrder(stack, value);

  stack.push(top);
}

// Do not edit the line below.
exports.sortStack = sortStack;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [-5, 2, -2, 4, 3, 1];
  const expected = [-5, -2, 1, 2, 3, 4];
  const actual = program.sortStack(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.sortStack

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(-5, 2, -2, 4, 3, 1)
        val expected = mutableListOf(-5, -2, 1, 2, 3, 4)
        val output = sortStack(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^2) time | O(n) space - where n is the length of the stack
fun sortStack(stack: MutableList<Int>): MutableList<Int> {
    if (stack.size == 0) return stack

    val top = stack.removeAt(stack.size - 1)

    sortStack(stack)

    insertInSortedOrder(stack, top)

    return stack
}

fun insertInSortedOrder(stack: MutableList<Int>, value: Int) {
    if (stack.size == 0 || stack[stack.size - 1] <= value) {
        stack.add(value)
        return
    }

    val top = stack.removeAt(stack.size - 1)

    insertInSortedOrder(stack, value)

    stack.add(top)
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.sortStack

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(-5, 2, -2, 4, 3, 1)
        val expected = mutableListOf(-5, -2, 1, 2, 3, 4)
        val output = sortStack(input)
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
      var input = [-5, 2, -2, 4, 3, 1]
      var expected = [-5, -2, 1, 2, 3, 4]
      var actual = Program().sortStack(&input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(n) space - where n is the length of the stack
  func sortStack(_ stack: inout [Int]) -> [Int] {
    if stack.count == 0 {
      return stack
    }

    let top = stack.removeLast()
    sortStack(&stack)

    insertInSortedOrder(&stack, top)
    return stack
  }

  func insertInSortedOrder(_ stack: inout [Int], _ value: Int) {
    if stack.count == 0 || stack[stack.count - 1] <= value {
      stack.append(value)
      return
    }

    let top = stack.removeLast()
    insertInSortedOrder(&stack, value)
    stack.append(top)
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = [-5, 2, -2, 4, 3, 1]
      var expected = [-5, -2, 1, 2, 3, 4]
      var actual = Program().sortStack(&input)
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
        input = [-5, 2, -2, 4, 3, 1]
        expected = [-5, -2, 1, 2, 3, 4]
        actual = program.sortStack(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n) space - where n is the length of the stack
def sortStack(stack):
    if len(stack) == 0:
        return stack

    top = stack.pop()

    sortStack(stack)

    insertInSortedOrder(stack, top)

    return stack


def insertInSortedOrder(stack, value):
    if len(stack) == 0 or stack[len(stack) - 1] <= value:
        stack.append(value)
        return

    top = stack.pop()

    insertInSortedOrder(stack, value)

    stack.append(top)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [-5, 2, -2, 4, 3, 1]
        expected = [-5, -2, 1, 2, 3, 4]
        actual = program.sortStack(input)
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
  const input = [-5, 2, -2, 4, 3, 1];
  const expected = [-5, -2, 1, 2, 3, 4];
  const actual = program.sortStack(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space - where n is the length of the stack
export function sortStack(stack: number[]) {
  if (stack.length === 0) return stack;

  const top = stack.pop()!;

  sortStack(stack);

  insertInSortedOrder(stack, top);

  return stack;
}

function insertInSortedOrder(stack: number[], value: number) {
  if (stack.length === 0 || stack[stack.length - 1] <= value) {
    stack.push(value);
    return;
  }

  const top = stack.pop()!;

  insertInSortedOrder(stack, value);

  stack.push(top);
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [-5, 2, -2, 4, 3, 1];
  const expected = [-5, -2, 1, 2, 3, 4];
  const actual = program.sortStack(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

