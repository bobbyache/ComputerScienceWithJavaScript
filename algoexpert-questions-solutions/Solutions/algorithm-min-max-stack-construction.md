# Min Max Stack Construction
<div class="html">
<p>
  Write a <span>MinMaxStack</span> class for a Min Max Stack. The class should
  support:
</p>
<ul>
  <li>Pushing and popping values on and off the stack.</li>
  <li>Peeking at the value at the top of the stack.</li>
  <li>
    Getting both the minimum and the maximum values in the stack at any given
    point in time.
  </li>
</ul>
<p>
  All class methods, when considered independently, should run in constant time
  and with constant space.
</p>
<h3>Sample Usage</h3>
<pre>
<span class="CodeEditor-promptComment">// All operations below are performed sequentially.</span>
<span class="CodeEditor-promptParameter">MinMaxStack</span>(): - <span class="CodeEditor-promptComment">// instantiate a MinMaxStack</span>
<span class="CodeEditor-promptParameter">push</span>(5): -
<span class="CodeEditor-promptParameter">getMin</span>(): 5
<span class="CodeEditor-promptParameter">getMax</span>(): 5
<span class="CodeEditor-promptParameter">peek</span>(): 5
<span class="CodeEditor-promptParameter">push</span>(7): -
<span class="CodeEditor-promptParameter">getMin</span>(): 5
<span class="CodeEditor-promptParameter">getMax</span>(): 7
<span class="CodeEditor-promptParameter">peek</span>(): 7
<span class="CodeEditor-promptParameter">push</span>(2): -
<span class="CodeEditor-promptParameter">getMin</span>(): 2
<span class="CodeEditor-promptParameter">getMax</span>(): 7
<span class="CodeEditor-promptParameter">peek</span>(): 2
<span class="CodeEditor-promptParameter">pop</span>(): 2
<span class="CodeEditor-promptParameter">pop</span>(): 7
<span class="CodeEditor-promptParameter">getMin</span>(): 5
<span class="CodeEditor-promptParameter">getMax</span>(): 5
<span class="CodeEditor-promptParameter">peek</span>(): 5
</pre>
</div>

Hint 1
<p>
You should be able to push values on, pop values off, and peek at values on top of the stack at any time and in constant time, using constant space. What data structure maintains order and would allow you to do this?
</p>


Hint 2

<p>
You should be able to get the minimum and maximum values in the stack at any time and in constant time, using constant space. What data structure would allow you to do this?
</p>


Hint 3

<p>
Since the minimum and maximum values in the stack can change with every push and pop, you will likely need to keep track of all the mins and maxes at every value in the stack.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

#define testMinMaxPeek(min, max, peekValue, stack)                             \
  {                                                                            \
    assert(stack.getMin() == min);                                             \
    assert(stack.getMax() == max);                                             \
    assert(stack.peek() == peekValue);                                         \
  }

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      MinMaxStack stack;
      stack.push(5);
      testMinMaxPeek(5, 5, 5, stack);
      stack.push(7);
      testMinMaxPeek(5, 7, 7, stack);
      stack.push(2);
      testMinMaxPeek(2, 7, 2, stack);
      assert(stack.pop() == 2);
      assert(stack.pop() == 7);
      testMinMaxPeek(5, 5, 5, stack);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <unordered_map>
using namespace std;

class MinMaxStack {
public:
  vector<unordered_map<string, int>> minMaxStack = {};
  vector<int> stack = {};

  // O(1) time | O(1) space
  int peek() { return stack[stack.size() - 1]; }

  // O(1) time | O(1) space
  int pop() {
    minMaxStack.pop_back();
    int result = stack[stack.size() - 1];
    stack.pop_back();
    return result;
  }

  // O(1) time | O(1) space
  void push(int number) {
    unordered_map<string, int> newMinMax = {{"min", number}, {"max", number}};
    if (minMaxStack.size()) {
      unordered_map<string, int> lastMinMax =
          minMaxStack[minMaxStack.size() - 1];
      newMinMax["min"] = min(lastMinMax["min"], number);
      newMinMax["max"] = max(lastMinMax["max"], number);
    }
    minMaxStack.push_back(newMinMax);
    stack.push_back(number);
  }

  // O(1) time | O(1) space
  int getMin() { return minMaxStack[minMaxStack.size() - 1]["min"]; }

  // O(1) time | O(1) space
  int getMax() { return minMaxStack[minMaxStack.size() - 1]["max"]; }
};

```
### Unit Tests 1 (cpp)
```cpp
#define testMinMaxPeek(min, max, peekValue, stack)                             \
  {                                                                            \
    assert(stack.getMin() == min);                                             \
    assert(stack.getMax() == max);                                             \
    assert(stack.peek() == peekValue);                                         \
  }

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      MinMaxStack stack;
      stack.push(5);
      testMinMaxPeek(5, 5, 5, stack);
      stack.push(7);
      testMinMaxPeek(5, 7, 7, stack);
      stack.push(2);
      testMinMaxPeek(2, 7, 2, stack);
      assert(stack.pop() == 2);
      assert(stack.pop() == 7);
      testMinMaxPeek(5, 5, 5, stack);
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
	public void testMinMaxPeek(
		int min,
		int max,
		int Peek,
		Program.MinMaxStack stack
		) {
		Utils.AssertTrue(stack.GetMin() == min);
		Utils.AssertTrue(stack.GetMax() == max);
		Utils.AssertTrue(stack.Peek() == Peek);
	}

	[Test]
	public void TestCase1() {
		Program.MinMaxStack stack = new Program.MinMaxStack();
		stack.Push(5);
		testMinMaxPeek(5, 5, 5, stack);
		stack.Push(7);
		testMinMaxPeek(5, 7, 7, stack);
		stack.Push(2);
		testMinMaxPeek(2, 7, 2, stack);
		Utils.AssertTrue(stack.Pop() == 2);
		Utils.AssertTrue(stack.Pop() == 7);
		testMinMaxPeek(5, 5, 5, stack);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;

public class Program {
	public class MinMaxStack {
		List<Dictionary<string, int> > minMaxStack = new List<Dictionary<string, int> >();
		List<int> stack = new List<int>();

		// O(1) time | O(1) space
		public int Peek() {
			return stack[stack.Count - 1];
		}

		// O(1) time | O(1) space
		public int Pop() {
			minMaxStack.RemoveAt(minMaxStack.Count - 1);
			var val = stack[stack.Count - 1];
			stack.RemoveAt(stack.Count - 1);
			return val;
		}

		// O(1) time | O(1) space
		public void Push(int number) {
			Dictionary<string, int> newMinMax = new Dictionary<string, int>();
			newMinMax.Add("min", number);
			newMinMax.Add("max", number);
			if (minMaxStack.Count > 0) {
				Dictionary<string, int> lastMinMax = new Dictionary<string, int>(
					minMaxStack[minMaxStack.Count - 1]
					);
				newMinMax["min"] = Math.Min(lastMinMax["min"], number);
				newMinMax["max"] = Math.Max(lastMinMax["max"], number);
			}
			minMaxStack.Add(newMinMax);
			stack.Add(number);
		}

		// O(1) time | O(1) space
		public int GetMin() {
			return minMaxStack[minMaxStack.Count - 1]["min"];
		}

		// O(1) time | O(1) space
		public int GetMax() {
			return minMaxStack[minMaxStack.Count - 1]["max"];
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	public void testMinMaxPeek(
		int min,
		int max,
		int Peek,
		Program.MinMaxStack stack
		) {
		Utils.AssertTrue(stack.GetMin() == min);
		Utils.AssertTrue(stack.GetMax() == max);
		Utils.AssertTrue(stack.Peek() == Peek);
	}

	[Test]
	public void TestCase1() {
		Program.MinMaxStack stack = new Program.MinMaxStack();
		stack.Push(5);
		testMinMaxPeek(5, 5, 5, stack);
		stack.Push(7);
		testMinMaxPeek(5, 7, 7, stack);
		stack.Push(2);
		testMinMaxPeek(2, 7, 2, stack);
		Utils.AssertTrue(stack.Pop() == 2);
		Utils.AssertTrue(stack.Pop() == 7);
		testMinMaxPeek(5, 5, 5, stack);
	}
}

```
### Sandbox Code (go)
```go
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

package main

func testMinMaxPeek(t *TestCase, min, max, peek int, stack *MinMaxStack) {
	if min != stack.GetMin() {
		t.Fail()
	}
	if max != stack.GetMax() {
		t.Fail()
	}
	if peek != stack.Peek() {
		t.Fail()
	}
}

func assertEqual(t *TestCase, a, b int) {
	if a != b {
		t.Fail()
	}
}

func (s *TestSuite) TestCase1(t *TestCase) {
	stack := NewMinMaxStack()
	stack.Push(5)
	testMinMaxPeek(t, 5, 5, 5, stack)
	stack.Push(7)
	testMinMaxPeek(t, 5, 7, 7, stack)
	stack.Push(2)
	testMinMaxPeek(t, 2, 7, 2, stack)
	assertEqual(t, stack.Pop(), 2)
	assertEqual(t, stack.Pop(), 7)
	testMinMaxPeek(t, 5, 5, 5, stack)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type MinMaxStack struct {
	stack       []int
	minMaxStack []entry
}

type entry struct {
	min int
	max int
}

func NewMinMaxStack() *MinMaxStack {
	return &MinMaxStack{}
}

// O(1) time | O(1) space
func (stack *MinMaxStack) Peek() int {
	return stack.stack[len(stack.stack)-1]
}

// O(1) time | O(1) space
func (stack *MinMaxStack) Pop() int {
	stack.minMaxStack = stack.minMaxStack[:len(stack.minMaxStack)-1]
	out := stack.stack[len(stack.stack)-1]
	stack.stack = stack.stack[:len(stack.stack)-1]
	return out
}

// O(1) time | O(1) space
func (stack *MinMaxStack) Push(number int) {
	newMinMax := entry{min: number, max: number}
	if len(stack.minMaxStack) > 0 {
		lastMinMax := stack.minMaxStack[len(stack.minMaxStack)-1]
		newMinMax.min = min(lastMinMax.min, number)
		newMinMax.max = max(lastMinMax.max, number)
	}
	stack.minMaxStack = append(stack.minMaxStack, newMinMax)
	stack.stack = append(stack.stack, number)
}

// O(1) time | O(1) space
func (stack *MinMaxStack) GetMin() int {
	return stack.minMaxStack[len(stack.minMaxStack)-1].min
}

// O(1) time | O(1) space
func (stack *MinMaxStack) GetMax() int {
	return stack.minMaxStack[len(stack.minMaxStack)-1].max
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func max(a, b int) int {
	if a < b {
		return b
	}
	return a
}

```
### Unit Tests 1 (go)
```go
package main

func testMinMaxPeek(t *TestCase, min, max, peek int, stack *MinMaxStack) {
	if min != stack.GetMin() {
		t.Fail()
	}
	if max != stack.GetMax() {
		t.Fail()
	}
	if peek != stack.Peek() {
		t.Fail()
	}
}

func assertEqual(t *TestCase, a, b int) {
	if a != b {
		t.Fail()
	}
}

func (s *TestSuite) TestCase1(t *TestCase) {
	stack := NewMinMaxStack()
	stack.Push(5)
	testMinMaxPeek(t, 5, 5, 5, stack)
	stack.Push(7)
	testMinMaxPeek(t, 5, 7, 7, stack)
	stack.Push(2)
	testMinMaxPeek(t, 2, 7, 2, stack)
	assertEqual(t, stack.Pop(), 2)
	assertEqual(t, stack.Pop(), 7)
	testMinMaxPeek(t, 5, 5, 5, stack)
}

```
### Sandbox Code (java)
```java
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

class ProgramTest {
  public void testMinMaxPeek(int min, int max, int peek, Program.MinMaxStack stack) {
    Utils.assertTrue(stack.getMin() == min);
    Utils.assertTrue(stack.getMax() == max);
    Utils.assertTrue(stack.peek() == peek);
  }

  @Test
  public void TestCase1() {
    Program.MinMaxStack stack = new Program.MinMaxStack();
    stack.push(5);
    testMinMaxPeek(5, 5, 5, stack);
    stack.push(7);
    testMinMaxPeek(5, 7, 7, stack);
    stack.push(2);
    testMinMaxPeek(2, 7, 2, stack);
    Utils.assertTrue(stack.pop() == 2);
    Utils.assertTrue(stack.pop() == 7);
    testMinMaxPeek(5, 5, 5, stack);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  static class MinMaxStack {
    List<Map<String, Integer>> minMaxStack = new ArrayList<Map<String, Integer>>();
    List<Integer> stack = new ArrayList<Integer>();

    // O(1) time | O(1) space
    public int peek() {
      return stack.get(stack.size() - 1);
    }

    // O(1) time | O(1) space
    public int pop() {
      minMaxStack.remove(minMaxStack.size() - 1);
      return stack.remove(stack.size() - 1);
    }

    // O(1) time | O(1) space
    public void push(int number) {
      Map<String, Integer> newMinMax = new HashMap<String, Integer>();
      newMinMax.put("min", number);
      newMinMax.put("max", number);
      if (minMaxStack.size() > 0) {
        Map<String, Integer> lastMinMax =
            new HashMap<String, Integer>(minMaxStack.get(minMaxStack.size() - 1));
        newMinMax.replace("min", Math.min(lastMinMax.get("min"), number));
        newMinMax.replace("max", Math.max(lastMinMax.get("max"), number));
      }
      minMaxStack.add(newMinMax);
      stack.add(number);
    }

    // O(1) time | O(1) space
    public int getMin() {
      return minMaxStack.get(minMaxStack.size() - 1).get("min");
    }

    // O(1) time | O(1) space
    public int getMax() {
      return minMaxStack.get(minMaxStack.size() - 1).get("max");
    }
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  public void testMinMaxPeek(int min, int max, int peek, Program.MinMaxStack stack) {
    Utils.assertTrue(stack.getMin() == min);
    Utils.assertTrue(stack.getMax() == max);
    Utils.assertTrue(stack.peek() == peek);
  }

  @Test
  public void TestCase1() {
    Program.MinMaxStack stack = new Program.MinMaxStack();
    stack.push(5);
    testMinMaxPeek(5, 5, 5, stack);
    stack.push(7);
    testMinMaxPeek(5, 7, 7, stack);
    stack.push(2);
    testMinMaxPeek(2, 7, 2, stack);
    Utils.assertTrue(stack.pop() == 2);
    Utils.assertTrue(stack.pop() == 7);
    testMinMaxPeek(5, 5, 5, stack);
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

function testMinMaxPeek(min, max, peek, stack) {
  chai.expect(stack.getMin()).to.deep.equal(min);
  chai.expect(stack.getMax()).to.deep.equal(max);
  chai.expect(stack.peek()).to.deep.equal(peek);
}

it('Test Case #1', function () {
  const stack = new program.MinMaxStack();
  stack.push(5);
  testMinMaxPeek(5, 5, 5, stack);
  stack.push(7);
  testMinMaxPeek(5, 7, 7, stack);
  stack.push(2);
  testMinMaxPeek(2, 7, 2, stack);
  chai.expect(stack.pop()).to.deep.equal(2);
  chai.expect(stack.pop()).to.deep.equal(7);
  testMinMaxPeek(5, 5, 5, stack);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class MinMaxStack {
  constructor() {
    this.minMaxStack = [];
    this.stack = [];
  }

  // O(1) time | O(1) space
  peek() {
    return this.stack[this.stack.length - 1];
  }

  // O(1) time | O(1) space
  pop() {
    this.minMaxStack.pop();
    return this.stack.pop();
  }

  // O(1) time | O(1) space
  push(number) {
    const newMinMax = {min: number, max: number};
    if (this.minMaxStack.length) {
      const lastMinMax = this.minMaxStack[this.minMaxStack.length - 1];
      newMinMax.min = Math.min(lastMinMax.min, number);
      newMinMax.max = Math.max(lastMinMax.max, number);
    }
    this.minMaxStack.push(newMinMax);
    this.stack.push(number);
  }

  // O(1) time | O(1) space
  getMin() {
    return this.minMaxStack[this.minMaxStack.length - 1].min;
  }

  // O(1) time | O(1) space
  getMax() {
    return this.minMaxStack[this.minMaxStack.length - 1].max;
  }
}

// Do not edit the line below.
exports.MinMaxStack = MinMaxStack;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

function testMinMaxPeek(min, max, peek, stack) {
  chai.expect(stack.getMin()).to.deep.equal(min);
  chai.expect(stack.getMax()).to.deep.equal(max);
  chai.expect(stack.peek()).to.deep.equal(peek);
}

it('Test Case #1', function () {
  const stack = new program.MinMaxStack();
  stack.push(5);
  testMinMaxPeek(5, 5, 5, stack);
  stack.push(7);
  testMinMaxPeek(5, 7, 7, stack);
  stack.push(2);
  testMinMaxPeek(2, 7, 2, stack);
  chai.expect(stack.pop()).to.deep.equal(2);
  chai.expect(stack.pop()).to.deep.equal(7);
  testMinMaxPeek(5, 5, 5, stack);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.MinMaxStack as MinMaxStack

fun testMinMaxPeek(min: Int, max: Int, peek: Int, stack: MinMaxStack) {
    assert(stack.getMin() == min)
    assert(stack.getMax() == max)
    assert(stack.peek() == peek)
}

class ProgramTest {
    @Test
    fun TestCase1() {
        val stack = MinMaxStack()
        stack.push(5)
        testMinMaxPeek(5, 5, 5, stack)
        stack.push(7)
        testMinMaxPeek(5, 7, 7, stack)
        stack.push(2)
        testMinMaxPeek(2, 7, 2, stack)
        assert(stack.pop() == 2)
        assert(stack.pop() == 7)
        testMinMaxPeek(5, 5, 5, stack)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max
import kotlin.math.min

open class MinMaxStack() {
    val minMaxStack = mutableListOf<Map<String, Int>>()
    val stack = mutableListOf<Int>()

    // O(1) time | O(1) space
    fun peek(): Int? {
        return this.stack[this.stack.size - 1]
    }

    // O(1) time | O(1) space
    fun pop(): Int? {
        this.minMaxStack.removeAt(this.stack.size - 1)
        return this.stack.removeAt(this.stack.size - 1)
    }

    // O(1) time | O(1) space
    fun push(number: Int) {
        val newMinMax = mutableMapOf<String, Int>("min" to number, "max" to number)
        if (this.minMaxStack.size > 0) {
            val lastMinMax = this.minMaxStack[this.minMaxStack.size - 1]
            newMinMax["min"] = min(lastMinMax["min"]!!, number)
            newMinMax["max"] = max(lastMinMax["max"]!!, number)
        }
        this.minMaxStack.add(newMinMax)
        this.stack.add(number)
    }

    // O(1) time | O(1) space
    fun getMin(): Int? {
        return this.minMaxStack[this.minMaxStack.size - 1]["min"]
    }

    // O(1) time | O(1) space
    fun getMax(): Int? {
        return this.minMaxStack[this.minMaxStack.size - 1]["max"]
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.MinMaxStack as MinMaxStack

fun testMinMaxPeek(min: Int, max: Int, peek: Int, stack: MinMaxStack) {
    assert(stack.getMin() == min)
    assert(stack.getMax() == max)
    assert(stack.peek() == peek)
}

class ProgramTest {
    @Test
    fun TestCase1() {
        val stack = MinMaxStack()
        stack.push(5)
        testMinMaxPeek(5, 5, 5, stack)
        stack.push(7)
        testMinMaxPeek(5, 7, 7, stack)
        stack.push(2)
        testMinMaxPeek(2, 7, 2, stack)
        assert(stack.pop() == 2)
        assert(stack.pop() == 7)
        testMinMaxPeek(5, 5, 5, stack)
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
      let stack = Program.MinMaxStack()
      stack.push(number: 5)
      try testMinMaxPeek(stack: stack, min: 5, max: 5, peek: 5)
      stack.push(number: 7)
      try testMinMaxPeek(stack: stack, min: 5, max: 7, peek: 7)
      stack.push(number: 2)
      try testMinMaxPeek(stack: stack, min: 2, max: 7, peek: 2)
      try assertEqual(2, stack.pop())
      try assertEqual(7, stack.pop())
      try testMinMaxPeek(stack: stack, min: 5, max: 5, peek: 5)
    }
  }

  func testMinMaxPeek(stack: Program.MinMaxStack, min: Int, max: Int, peek: Int) throws {
    if let stackMin = stack.getMin() {
      try assertEqual(min, stackMin)
    }

    if let stackMax = stack.getMax() {
      try assertEqual(max, stackMax)
    }

    if let stackPeek = stack.peek() {
      try assertEqual(peek, stackPeek)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  class MinMaxStack {
    var minMaxStack = [[String: Int]]()
    var stack = [Int]()

    // O(1) time | O(1) space
    func peek() -> Int? {
      return stack.last
    }

    // O(1) time | O(1) space
    func pop() -> Int? {
      minMaxStack.popLast()

      return stack.popLast()
    }

    // O(1) time | O(1) space
    func push(number: Int) {
      var newMinMax = ["min": number, "max": number]

      if let lastMinMax = minMaxStack.last {
        newMinMax["min"] = min(lastMinMax["min"]!, newMinMax["min"]!)
        newMinMax["max"] = max(lastMinMax["max"]!, newMinMax["max"]!)
      }

      minMaxStack.append(newMinMax)
      stack.append(number)
    }

    // O(1) time | O(1) space
    func getMin() -> Int? {
      return minMaxStack.last?["min"]
    }

    // O(1) | O(1) space
    func getMax() -> Int? {
      return minMaxStack.last?["max"]
    }
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let stack = Program.MinMaxStack()
      stack.push(number: 5)
      try testMinMaxPeek(stack: stack, min: 5, max: 5, peek: 5)
      stack.push(number: 7)
      try testMinMaxPeek(stack: stack, min: 5, max: 7, peek: 7)
      stack.push(number: 2)
      try testMinMaxPeek(stack: stack, min: 2, max: 7, peek: 2)
      try assertEqual(2, stack.pop())
      try assertEqual(7, stack.pop())
      try testMinMaxPeek(stack: stack, min: 5, max: 5, peek: 5)
    }
  }

  func testMinMaxPeek(stack: Program.MinMaxStack, min: Int, max: Int, peek: Int) throws {
    if let stackMin = stack.getMin() {
      try assertEqual(min, stackMin)
    }

    if let stackMax = stack.getMax() {
      try assertEqual(max, stackMax)
    }

    if let stackPeek = stack.peek() {
      try assertEqual(peek, stackPeek)
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


def testMinMaxPeek(self, min, max, peek, stack):
    self.assertEqual(stack.getMin(), min)
    self.assertEqual(stack.getMax(), max)
    self.assertEqual(stack.peek(), peek)


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        stack = program.MinMaxStack()
        stack.push(5)
        testMinMaxPeek(self, 5, 5, 5, stack)
        stack.push(7)
        testMinMaxPeek(self, 5, 7, 7, stack)
        stack.push(2)
        testMinMaxPeek(self, 2, 7, 2, stack)
        self.assertEqual(stack.pop(), 2)
        self.assertEqual(stack.pop(), 7)
        testMinMaxPeek(self, 5, 5, 5, stack)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class MinMaxStack:
    def __init__(self):
        self.minMaxStack = []
        self.stack = []

    # O(1) time | O(1) space
    def peek(self):
        return self.stack[len(self.stack) - 1]

    # O(1) time | O(1) space
    def pop(self):
        self.minMaxStack.pop()
        return self.stack.pop()

    # O(1) time | O(1) space
    def push(self, number):
        newMinMax = {"min": number, "max": number}
        if len(self.minMaxStack):
            lastMinMax = self.minMaxStack[len(self.minMaxStack) - 1]
            newMinMax["min"] = min(lastMinMax["min"], number)
            newMinMax["max"] = max(lastMinMax["max"], number)
        self.minMaxStack.append(newMinMax)
        self.stack.append(number)

    # O(1) time | O(1) space
    def getMin(self):
        return self.minMaxStack[len(self.minMaxStack) - 1]["min"]

    # O(1) time | O(1) space
    def getMax(self):
        return self.minMaxStack[len(self.minMaxStack) - 1]["max"]

```
### Unit Tests 1 (python)
```python
import program
import unittest


def testMinMaxPeek(self, min, max, peek, stack):
    self.assertEqual(stack.getMin(), min)
    self.assertEqual(stack.getMax(), max)
    self.assertEqual(stack.peek(), peek)


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        stack = program.MinMaxStack()
        stack.push(5)
        testMinMaxPeek(self, 5, 5, 5, stack)
        stack.push(7)
        testMinMaxPeek(self, 5, 7, 7, stack)
        stack.push(2)
        testMinMaxPeek(self, 2, 7, 2, stack)
        self.assertEqual(stack.pop(), 2)
        self.assertEqual(stack.pop(), 7)
        testMinMaxPeek(self, 5, 5, 5, stack)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

function testMinMaxPeek(min: number, max: number, peek: number, stack: program.MinMaxStack) {
  chai.expect(stack.getMin()).to.deep.equal(min);
  chai.expect(stack.getMax()).to.deep.equal(max);
  chai.expect(stack.peek()).to.deep.equal(peek);
}

it('Test Case #1', function () {
  const stack = new program.MinMaxStack();
  stack.push(5);
  testMinMaxPeek(5, 5, 5, stack);
  stack.push(7);
  testMinMaxPeek(5, 7, 7, stack);
  stack.push(2);
  testMinMaxPeek(2, 7, 2, stack);
  chai.expect(stack.pop()).to.deep.equal(2);
  chai.expect(stack.pop()).to.deep.equal(7);
  testMinMaxPeek(5, 5, 5, stack);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

interface MinMaxItem {
  min: number;
  max: number;
}

export class MinMaxStack {
  minMaxStack: MinMaxItem[];
  stack: number[];

  constructor() {
    this.minMaxStack = [];
    this.stack = [];
  }

  // O(1) time | O(1) space
  peek() {
    return this.stack[this.stack.length - 1];
  }

  // O(1) time | O(1) space
  pop() {
    this.minMaxStack.pop();
    return this.stack.pop();
  }

  // O(1) time | O(1) space
  push(number: number) {
    const newMinMax = {min: number, max: number};
    if (this.minMaxStack.length) {
      const lastMinMax = this.minMaxStack[this.minMaxStack.length - 1];
      newMinMax.min = Math.min(lastMinMax.min, number);
      newMinMax.max = Math.max(lastMinMax.max, number);
    }
    this.minMaxStack.push(newMinMax);
    this.stack.push(number);
  }

  // O(1) time | O(1) space
  getMin() {
    return this.minMaxStack[this.minMaxStack.length - 1].min;
  }

  // O(1) time | O(1) space
  getMax() {
    return this.minMaxStack[this.minMaxStack.length - 1].max;
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

function testMinMaxPeek(min: number, max: number, peek: number, stack: program.MinMaxStack) {
  chai.expect(stack.getMin()).to.deep.equal(min);
  chai.expect(stack.getMax()).to.deep.equal(max);
  chai.expect(stack.peek()).to.deep.equal(peek);
}

it('Test Case #1', function () {
  const stack = new program.MinMaxStack();
  stack.push(5);
  testMinMaxPeek(5, 5, 5, stack);
  stack.push(7);
  testMinMaxPeek(5, 7, 7, stack);
  stack.push(2);
  testMinMaxPeek(2, 7, 2, stack);
  chai.expect(stack.pop()).to.deep.equal(2);
  chai.expect(stack.pop()).to.deep.equal(7);
  testMinMaxPeek(5, 5, 5, stack);
});

```

