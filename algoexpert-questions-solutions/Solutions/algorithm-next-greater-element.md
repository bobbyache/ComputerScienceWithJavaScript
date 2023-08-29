# Next Greater Element
<div class="html">
<p>
  Write a function that takes in an array of integers and returns a new array
  containing, at each index, the next element in the input array that's greater
  than the element at that index in the input array.
</p>
<p>
  In other words, your function should return a new array where
  <span>outputArray[i]</span> is the next element in the input array that's
  greater than <span>inputArray[i]</span>. If there's no such next greater
  element for a particular index, the value at that index in the output array
  should be <span>-1</span>. For example, given <span>array = [1, 2]</span>,
  your function should return <span>[2, -1]</span>.
</p>
<p>
  Additionally, your function should treat the input array as a
  <b>circular</b> array. A circular array wraps around itself as if it were
  connected end-to-end. So the next index after the last index in a circular
  array is the first index. This means that, for our problem, given
  <span>array = [0, 0, 5, 0, 0, 3, 0, 0]</span>, the next greater element after
  <span>3</span> is <span>5</span>, since the array is circular.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [2, 5, -3, -4, 6, 7, 2]
</pre>
<h3>Sample Output</h3>
<pre>
[5, 6, 6, 6, 7, -1, 5]
</pre>
</div>

Hint 1
<p>
  Solving this problem in <span>O(n^2)</span> time, where <span>n</span> is the
  length of the array, is straightforward. Can you solve it with a better time
  complexity?
</p>


Hint 2

<p>
  How can a stack allow you to solve this problem in <span>O(n)</span> time?
</p>


Hint 3

<p>
  There are a couple of ways to solve this problem in linear time with a stack.
  One approach is to push onto the stack the indices of elements for which you
  haven't yet found the next greater element. If you go with this index
  approach, you need to loop through the array twice (since it's circular) and
  compare the value of the current element in the array to the one represented
  by the index on top of the stack. If the element on the top of the stack is
  smaller than the current element, then the current element is next greater
  element for the top-of-stack element, and you can pop the index off the top of
  the stack and use it to store the current element in the correct position in
  your result array. You then continue to pop elements off the top of the stack
  until the current element is no longer greater than the top-of-stack element.
  At this point, you add the index of the current element to the top of the
  stack, and you continue iterating through the array, repeating the same
  process.
</p>


Hint 4

<p>
  The approach discussed in Hint #3 assumes that you loop through the array from
  left to right. You could loop through the array backwards using a very similar
  approach, storing the actual values of elements on the stack rather than their
  indices. See the Conceptual Overview section of this question's video
  explanation for a more in-depth explanation.
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
      vector<int> input = {2, 5, -3, -4, 6, 7, 2};
      vector<int> expected = {5, 6, 6, 6, 7, -1, 5};
      auto actual = nextGreaterElement(input);
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

// O(n) time | O(n) space - where n is the length of the array
vector<int> nextGreaterElement(vector<int> array) {
  vector<int> result(array.size(), -1);
  vector<int> stack;

  for (int idx = 0; idx < 2 * array.size(); idx++) {
    int circularIdx = idx % array.size();

    while (stack.size() > 0 &&
           array[stack[stack.size() - 1]] < array[circularIdx]) {
      int top = stack.back();
      stack.pop_back();
      result[top] = array[circularIdx];
    }

    stack.push_back(circularIdx);
  }

  return result;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

// O(n) time | O(n) space - where n is the length of the array
vector<int> nextGreaterElement(vector<int> array) {
  vector<int> result(array.size(), -1);
  vector<int> stack;

  for (int idx = 2 * array.size() - 1; idx > -1; idx--) {
    int circularIdx = idx % array.size();

    while (stack.size() > 0) {
      if (stack[stack.size() - 1] <= array[circularIdx]) {
        stack.pop_back();
      } else {
        result[circularIdx] = stack[stack.size() - 1];
        break;
      }
    }

    stack.push_back(array[circularIdx]);
  }

  return result;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> input = {2, 5, -3, -4, 6, 7, 2};
      vector<int> expected = {5, 6, 6, 6, 7, -1, 5};
      auto actual = nextGreaterElement(input);
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
using System.Linq;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] input = new int[] { 2, 5, -3, -4, 6, 7, 2 };
		int[] expected = new int[] { 5, 6, 6, 6, 7, -1, 5 };
		int[] actual = new Program().NextGreaterElement(input);
		Utils.AssertTrue(expected.SequenceEqual(actual));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;


public class Program {
	// O(n) time | O(n) space - where n is the length of the array
	public int[] NextGreaterElement(int[] array) {
		int[] result = new int[array.Length];
		Array.Fill(result, -1);

		Stack<int> stack = new Stack<int>();

		for (int idx = 0; idx < 2 * array.Length; idx++) {
			int circularIdx = idx % array.Length;

			while (stack.Count > 0 && array[stack.Peek()] < array[circularIdx]) {
				int top = stack.Pop();
				result[top] = array[circularIdx];
			}

			stack.Push(circularIdx);
		}

		return result;
	}
}
```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;


public class Program {
	// O(n) time | O(n) space - where n is the length of the array
	public int[] NextGreaterElement(int[] array) {
		int[] result = new int[array.Length];
		Array.Fill(result, -1);

		Stack<int> stack = new Stack<int>();

		for (int idx = 2 * array.Length - 1; idx >= 0; idx--) {
			int circularIdx = idx % array.Length;

			while (stack.Count > 0) {
				if (stack.Peek() <= array[circularIdx]) {
					stack.Pop();
				} else {
					result[circularIdx] = stack.Peek();
					break;
				}

			}

			stack.Push(array[circularIdx]);
		}

		return result;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;
using System.Linq;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] input = new int[] { 2, 5, -3, -4, 6, 7, 2 };
		int[] expected = new int[] { 5, 6, 6, 6, 7, -1, 5 };
		int[] actual = new Program().NextGreaterElement(input);
		Utils.AssertTrue(expected.SequenceEqual(actual));
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
	input := []int{2, 5, -3, -4, 6, 7, 2}
	expected := []int{5, 6, 6, 6, 7, -1, 5}
	actual := NextGreaterElement(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space - where n is the length of the array
func NextGreaterElement(array []int) []int {
	result := make([]int, 0)
	for range array {
		result = append(result, -1)
	}
	stack := make([]int, 0)

	for idx := 0; idx < 2*len(array); idx++ {
		circularIdx := idx % len(array)

		for len(stack) > 0 && array[stack[len(stack)-1]] < array[circularIdx] {
			var top int
			top, stack = stack[len(stack)-1], stack[:len(stack)-1]
			result[top] = array[circularIdx]
		}

		stack = append(stack, circularIdx)
	}

	return result
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space - where n is the length of the array
func NextGreaterElement(array []int) []int {
	result := make([]int, 0)
	for range array {
		result = append(result, -1)
	}
	stack := make([]int, 0)

	for idx := 2*len(array) - 1; idx >= 0; idx-- {
		circularIdx := idx % len(array)

		for len(stack) > 0 {
			if stack[len(stack)-1] <= array[circularIdx] {
				stack = stack[:len(stack)-1]
			} else {
				result[circularIdx] = stack[len(stack)-1]
				break
			}
		}

		stack = append(stack, array[circularIdx])
	}

	return result
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []int{2, 5, -3, -4, 6, 7, 2}
	expected := []int{5, 6, 6, 6, 7, -1, 5}
	actual := NextGreaterElement(input)
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
    int[] input = new int[] {2, 5, -3, -4, 6, 7, 2};
    int[] expected = new int[] {5, 6, 6, 6, 7, -1, 5};
    int[] actual = new Program().nextGreaterElement(input);
    assert (expected.equals(actual));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(n) space - where n is the length of the array
  public int[] nextGreaterElement(int[] array) {
    int[] result = new int[array.length];
    Arrays.fill(result, -1);

    Stack<Integer> stack = new Stack<Integer>();

    for (int idx = 0; idx < 2 * array.length; idx++) {
      int circularIdx = idx % array.length;

      while (stack.size() > 0 && array[stack.peek()] < array[circularIdx]) {
        int top = stack.pop();
        result[top] = array[circularIdx];
      }

      stack.push(circularIdx);
    }

    return result;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(n) space - where n is the length of the array
  public int[] nextGreaterElement(int[] array) {
    int[] result = new int[array.length];
    Arrays.fill(result, -1);

    Stack<Integer> stack = new Stack<Integer>();

    for (int idx = 2 * array.length - 1; idx >= 0; idx--) {
      int circularIdx = idx % array.length;

      while (stack.size() > 0) {
        if (stack.peek() <= array[circularIdx]) {
          stack.pop();
        } else {
          result[circularIdx] = stack.peek();
          break;
        }
      }

      stack.push(array[circularIdx]);
    }

    return result;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[] input = new int[] {2, 5, -3, -4, 6, 7, 2};
    int[] expected = new int[] {5, 6, 6, 6, 7, -1, 5};
    int[] actual = new Program().nextGreaterElement(input);
    assert (expected.equals(actual));
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
  const input = [2, 5, -3, -4, 6, 7, 2];
  const expected = [5, 6, 6, 6, 7, -1, 5];
  const actual = program.nextGreaterElement(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the array
function nextGreaterElement(array) {
  const result = new Array(array.length).fill(-1);
  const stack = [];

  for (let idx = 0; idx < 2 * array.length; idx++) {
    const circularIdx = idx % array.length;

    while (stack.length > 0 && array[stack[stack.length - 1]] < array[circularIdx]) {
      const top = stack.pop();
      result[top] = array[circularIdx];
    }

    stack.push(circularIdx);
  }

  return result;
}

// Do not edit the line below.
exports.nextGreaterElement = nextGreaterElement;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the array
function nextGreaterElement(array) {
  const result = new Array(array.length).fill(-1);
  const stack = [];

  for (let idx = 2 * array.length - 1; idx > -1; idx--) {
    const circularIdx = idx % array.length;

    while (stack.length > 0) {
      if (stack[stack.length - 1] <= array[circularIdx]) {
        stack.pop();
      } else {
        result[circularIdx] = stack[stack.length - 1];
        break;
      }
    }

    stack.push(array[circularIdx]);
  }

  return result;
}

// Do not edit the line below.
exports.nextGreaterElement = nextGreaterElement;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [2, 5, -3, -4, 6, 7, 2];
  const expected = [5, 6, 6, 6, 7, -1, 5];
  const actual = program.nextGreaterElement(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.nextGreaterElement

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(2, 5, -3, -4, 6, 7, 2)
        val expected = listOf(5, 6, 6, 6, 7, -1, 5)
        val output = nextGreaterElement(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(n) space - where n is the length of the array
fun nextGreaterElement(array: List<Int>): List<Int> {
    val result = MutableList(array.size) { -1 }
    val stack = mutableListOf<Int>()

    for (idx in 0 until 2 * array.size) {
        val circularIdx = idx % array.size

        while (stack.size > 0 && array[stack[stack.size - 1]] < array[circularIdx]) {
            val top = stack.removeAt(stack.size - 1)
            result[top] = array[circularIdx]
        }

        stack.add(circularIdx)
    }

    return result
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(n) space - where n is the length of the array
fun nextGreaterElement(array: List<Int>): List<Int> {
    val result = MutableList(array.size) { -1 }
    val stack = mutableListOf<Int>()

    for (idx in 2 * array.size - 1 downTo 0) {
        val circularIdx = idx % array.size

        while (stack.size > 0) {
            if (stack[stack.size - 1] <= array[circularIdx]) {
                stack.removeAt(stack.size - 1)
            } else {
                result[circularIdx] = stack[stack.size - 1]
                break
            }
        }

        stack.add(array[circularIdx])
    }

    return result
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.nextGreaterElement

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(2, 5, -3, -4, 6, 7, 2)
        val expected = listOf(5, 6, 6, 6, 7, -1, 5)
        val output = nextGreaterElement(input)
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
      var input = [2, 5, -3, -4, 6, 7, 2]
      var expected = [5, 6, 6, 6, 7, -1, 5]
      var actual = Program().nextGreaterElement(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the length of the array
  func nextGreaterElement(_ array: [Int]) -> [Int] {
    var result = Array(repeating: -1, count: array.count)
    var stack = [Int]()

    for idx in stride(from: 0, to: 2 * array.count, by: 1) {
      let circularIdx = idx % array.count

      while stack.count > 0, array[stack[stack.count - 1]] < array[circularIdx] {
        let top = stack.popLast()!
        result[top] = array[circularIdx]
      }

      stack.append(circularIdx)
    }
    return result
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the length of the array
  func nextGreaterElement(_ array: [Int]) -> [Int] {
    var result = Array(repeating: -1, count: array.count)
    var stack = [Int]()

    for idx in stride(from: 2 * array.count - 1, through: 0, by: -1) {
      let circularIdx = idx % array.count

      while stack.count > 0 {
        if stack[stack.count - 1] <= array[circularIdx] {
          stack.popLast()
        } else {
          result[circularIdx] = stack[stack.count - 1]
          break
        }
      }

      stack.append(array[circularIdx])
    }
    return result
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = [2, 5, -3, -4, 6, 7, 2]
      var expected = [5, 6, 6, 6, 7, -1, 5]
      var actual = Program().nextGreaterElement(input)
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
        input = [2, 5, -3, -4, 6, 7, 2]
        expected = [5, 6, 6, 6, 7, -1, 5]
        actual = program.nextGreaterElement(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the length of the array
def nextGreaterElement(array):
    result = [-1] * len(array)
    stack = []

    for idx in range(2 * len(array)):
        circularIdx = idx % len(array)

        while len(stack) > 0 and array[stack[len(stack) - 1]] < array[circularIdx]:
            top = stack.pop()
            result[top] = array[circularIdx]

        stack.append(circularIdx)

    return result

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the length of the array
def nextGreaterElement(array):
    result = [-1] * len(array)
    stack = []

    for idx in range(2 * len(array) - 1, -1, -1):
        circularIdx = idx % len(array)

        while len(stack) > 0:
            if stack[len(stack) - 1] <= array[circularIdx]:
                stack.pop()
            else:
                result[circularIdx] = stack[len(stack) - 1]
                break

        stack.append(array[circularIdx])

    return result

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [2, 5, -3, -4, 6, 7, 2]
        expected = [5, 6, 6, 6, 7, -1, 5]
        actual = program.nextGreaterElement(input)
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
  const input = [2, 5, -3, -4, 6, 7, 2];
  const expected = [5, 6, 6, 6, 7, -1, 5];
  const actual = program.nextGreaterElement(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the array
export function nextGreaterElement(array: number[]) {
  const result = new Array(array.length).fill(-1);
  const stack: number[] = [];

  for (let idx = 0; idx < 2 * array.length; idx++) {
    const circularIdx = idx % array.length;

    while (stack.length > 0 && array[stack[stack.length - 1]] < array[circularIdx]) {
      const top = stack.pop()!;
      result[top] = array[circularIdx];
    }

    stack.push(circularIdx);
  }

  return result;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the array
export function nextGreaterElement(array: number[]) {
  const result = new Array(array.length).fill(-1);
  const stack = [];

  for (let idx = 2 * array.length - 1; idx > -1; idx--) {
    const circularIdx = idx % array.length;

    while (stack.length > 0) {
      if (stack[stack.length - 1] <= array[circularIdx]) {
        stack.pop();
      } else {
        result[circularIdx] = stack[stack.length - 1];
        break;
      }
    }

    stack.push(array[circularIdx]);
  }

  return result;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [2, 5, -3, -4, 6, 7, 2];
  const expected = [5, 6, 6, 6, 7, -1, 5];
  const actual = program.nextGreaterElement(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

