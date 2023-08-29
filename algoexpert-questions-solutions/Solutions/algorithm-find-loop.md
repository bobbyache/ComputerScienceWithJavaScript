# Find Loop
<div class="html">
<p>
  Write a function that takes in the head of a Singly Linked List that contains
  a loop (in other words, the list's tail node points to some node in the list
  instead of <span>None</span> / <span>null</span>). The function should return
  the node (the actual node--not just its value) from which the loop originates
  in constant space.
</p>
<p>
  Each <span>LinkedList</span> node has an integer <span>value</span> as well as
  a <span>next</span> node pointing to the next node in the list.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">head</span> = 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 <span class="CodeEditor-promptComment">// the head node with value 0</span>
                           ^         v
                           9 <- 8 <- 7
</pre>
<h3>Sample Output</h3>
<pre>
4 -> 5 -> 6 <span class="CodeEditor-promptComment">// the node with value 4</span>
^         v
9 <- 8 <- 7
</pre>
</div>

Hint 1
<p>
Try traversing the linked list with two pointers, one iterating through every single node in the list and another iterating through every other node in the list (skipping a node every time). Eventually, both pointers will point to the same node since there is a loop in the list and since one pointer is moving faster than the other. Stop once the pointers overlap each other. How can you find the origin of the loop from here?
</p>


Hint 2

<p>
Can you come up with a mathematical relation between the respective distances traveled by each pointer? How far will the first pointer have traveled when the pointers overlap? What about the second pointer? How can this relation then help you find the actual origin of the loop in the list?
</p>


Hint 3

<p>
Let D be the distance between the start of the linked list and the origin of the loop in the list. Let P be distance between the origin of the loop and the node N where the first and second pointers overlap (going in the primary direction of the list). By the time the pointers reach N, the first pointer will have traveled a distance of length D + P, and the second pointer will have traveled a distance of length 2D + 2P, since it will have traveled twice as much as the first pointer. Thus, the distance between N and the origin of the loop (going in the primary direction of the list) can be arithmetically deduced to be 2D + 2P - D - 2P = D. With both pointers D length away from the origin of the loop, how can you find the origin?
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

LinkedList::LinkedList(int value) {
  this->value = value;
  this->next = nullptr;
}

void addMany(LinkedList *ll, vector<int> values) {
  LinkedList *current = ll;
  while (current->next != nullptr) {
    current = current->next;
  }
  for (int value : values) {
    current->next = new LinkedList(value);
    current = current->next;
  }
}

LinkedList *getNthNode(LinkedList *ll, int n) {
  int counter = 1;
  LinkedList *current = ll;
  while (counter < n) {
    current = current->next;
    counter++;
  }
  return current;
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      LinkedList test(0);
      addMany(&test, {1, 2, 3, 4, 5, 6, 7, 8, 9});
      getNthNode(&test, 10)->next = getNthNode(&test, 5);
      assert(findLoop(&test) == getNthNode(&test, 5));
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

class LinkedList {
public:
  int value;
  LinkedList *next;

  LinkedList(int value);
};

// O(n) time | O(1) space
LinkedList *findLoop(LinkedList *head) {
  LinkedList *first = head->next;
  LinkedList *second = head->next->next;
  while (first != second) {
    first = first->next;
    second = second->next->next;
  }
  first = head;
  while (first != second) {
    first = first->next;
    second = second->next;
  }
  return first;
}

```
### Unit Tests 1 (cpp)
```cpp
LinkedList::LinkedList(int value) {
  this->value = value;
  this->next = nullptr;
}

void addMany(LinkedList *ll, vector<int> values) {
  LinkedList *current = ll;
  while (current->next != nullptr) {
    current = current->next;
  }
  for (int value : values) {
    current->next = new LinkedList(value);
    current = current->next;
  }
}

LinkedList *getNthNode(LinkedList *ll, int n) {
  int counter = 1;
  LinkedList *current = ll;
  while (counter < n) {
    current = current->next;
    counter++;
  }
  return current;
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      LinkedList test(0);
      addMany(&test, {1, 2, 3, 4, 5, 6, 7, 8, 9});
      getNthNode(&test, 10)->next = getNthNode(&test, 5);
      assert(findLoop(&test) == getNthNode(&test, 5));
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
		TestLinkedList test = new TestLinkedList(0);
		test.addMany(new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9});
		test.getNthNode(10).next = test.getNthNode(5);
		Utils.AssertTrue(Program.FindLoop(test) == test.getNthNode(5));
	}

	public class TestLinkedList : Program.LinkedList {
		public TestLinkedList(int value) : base(value) {
		}

		public void addMany(int[] values) {
			Program.LinkedList current = this;
			while (current.next != null) {
				current = current.next;
			}
			foreach (int value in values) {
				current.next = new Program.LinkedList(value);
				current = current.next;
			}
		}

		public Program.LinkedList getNthNode(int n) {
			int counter = 1;
			Program.LinkedList current = this;
			while (counter < n) {
				current = current.next;
				counter++;
			}
			return current;
		}
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(n) time | O(1) space
	public static LinkedList FindLoop(LinkedList head) {
		LinkedList first = head.next;
		LinkedList second = head.next.next;
		while (first != second) {
			first = first.next;
			second = second.next.next;
		}
		first = head;
		while (first != second) {
			first = first.next;
			second = second.next;
		}
		return first;
	}

	public class LinkedList {
		public int value;
		public LinkedList next = null;

		public LinkedList(int value) {
			this.value = value;
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		TestLinkedList test = new TestLinkedList(0);
		test.addMany(new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9});
		test.getNthNode(10).next = test.getNthNode(5);
		Utils.AssertTrue(Program.FindLoop(test) == test.getNthNode(5));
	}

	public class TestLinkedList : Program.LinkedList {
		public TestLinkedList(int value) : base(value) {
		}

		public void addMany(int[] values) {
			Program.LinkedList current = this;
			while (current.next != null) {
				current = current.next;
			}
			foreach (int value in values) {
				current.next = new Program.LinkedList(value);
				current = current.next;
			}
		}

		public Program.LinkedList getNthNode(int n) {
			int counter = 1;
			Program.LinkedList current = this;
			while (counter < n) {
				current = current.next;
				counter++;
			}
			return current;
		}
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

func NewLinkedList(root int, children ...int) *LinkedList {
	ll := &LinkedList{root, nil}
	ll.Add(children...)
	return ll
}

func (ll *LinkedList) Add(values ...int) {
	current := ll
	for current.Next != nil {
		current = current.Next
	}
	for value := range values {
		current.Next = &LinkedList{value, nil}
		current = current.Next
	}
}

func (ll *LinkedList) GetNth(n int) *LinkedList {
	counter, current := 1, ll
	for counter < n {
		counter, current = counter+1, current.Next
	}
	return current
}

func (s *TestSuite) TestCase1(t *TestCase) {
	ll := NewLinkedList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
	ll.GetNth(10).Next = ll.GetNth(5)
	output, expected := FindLoop(ll), ll.GetNth(5)
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type LinkedList struct {
	Value int
	Next  *LinkedList
}

// O(n) time | O(1) space
func FindLoop(head *LinkedList) *LinkedList {
	first := head.Next
	second := first.Next
	for first != second {
		first, second = first.Next, second.Next.Next
	}
	first = head
	for first != second {
		first = first.Next
		second = second.Next
	}
	return first
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func NewLinkedList(root int, children ...int) *LinkedList {
	ll := &LinkedList{root, nil}
	ll.Add(children...)
	return ll
}

func (ll *LinkedList) Add(values ...int) {
	current := ll
	for current.Next != nil {
		current = current.Next
	}
	for value := range values {
		current.Next = &LinkedList{value, nil}
		current = current.Next
	}
}

func (ll *LinkedList) GetNth(n int) *LinkedList {
	counter, current := 1, ll
	for counter < n {
		counter, current = counter+1, current.Next
	}
	return current
}

func (s *TestSuite) TestCase1(t *TestCase) {
	ll := NewLinkedList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
	ll.GetNth(10).Next = ll.GetNth(5)
	output, expected := FindLoop(ll), ll.GetNth(5)
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
    TestLinkedList test = new TestLinkedList(0);
    test.addMany(new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9});
    test.getNthNode(10).next = test.getNthNode(5);
    Utils.assertTrue(Program.findLoop(test) == test.getNthNode(5));
  }

  class TestLinkedList extends Program.LinkedList {
    public TestLinkedList(int value) {
      super(value);
    }

    public void addMany(int[] values) {
      Program.LinkedList current = this;
      while (current.next != null) {
        current = current.next;
      }
      for (int value : values) {
        current.next = new Program.LinkedList(value);
        current = current.next;
      }
    }

    public Program.LinkedList getNthNode(int n) {
      int counter = 1;
      Program.LinkedList current = this;
      while (counter < n) {
        current = current.next;
        counter++;
      }
      return current;
    }
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space
  public static LinkedList findLoop(LinkedList head) {
    LinkedList first = head.next;
    LinkedList second = head.next.next;
    while (first != second) {
      first = first.next;
      second = second.next.next;
    }
    first = head;
    while (first != second) {
      first = first.next;
      second = second.next;
    }
    return first;
  }

  static class LinkedList {
    int value;
    LinkedList next = null;

    public LinkedList(int value) {
      this.value = value;
    }
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    TestLinkedList test = new TestLinkedList(0);
    test.addMany(new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9});
    test.getNthNode(10).next = test.getNthNode(5);
    Utils.assertTrue(Program.findLoop(test) == test.getNthNode(5));
  }

  class TestLinkedList extends Program.LinkedList {
    public TestLinkedList(int value) {
      super(value);
    }

    public void addMany(int[] values) {
      Program.LinkedList current = this;
      while (current.next != null) {
        current = current.next;
      }
      for (int value : values) {
        current.next = new Program.LinkedList(value);
        current = current.next;
      }
    }

    public Program.LinkedList getNthNode(int n) {
      int counter = 1;
      Program.LinkedList current = this;
      while (counter < n) {
        current = current.next;
        counter++;
      }
      return current;
    }
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

class LinkedList extends program.LinkedList {
  addMany(values) {
    let current = this;
    while (current.next !== null) {
      current = current.next;
    }
    for (const value of values) {
      current.next = new LinkedList(value);
      current = current.next;
    }
    return this;
  }

  getNthNode(n) {
    let counter = 1;
    let current = this;
    while (counter < n) {
      current = current.next;
      counter++;
    }
    return current;
  }
}

it('Test Case #1', function () {
  const test = new LinkedList(0).addMany([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  test.getNthNode(10).next = test.getNthNode(5);
  chai.expect(program.findLoop(test)).to.deep.equal(test.getNthNode(5));
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// O(n) time | O(1) space
function findLoop(head) {
  let first = head.next;
  let second = head.next.next;
  while (first !== second) {
    first = first.next;
    second = second.next.next;
  }
  first = head;
  while (first !== second) {
    first = first.next;
    second = second.next;
  }
  return first;
}

exports.LinkedList = LinkedList;
exports.findLoop = findLoop;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

class LinkedList extends program.LinkedList {
  addMany(values) {
    let current = this;
    while (current.next !== null) {
      current = current.next;
    }
    for (const value of values) {
      current.next = new LinkedList(value);
      current = current.next;
    }
    return this;
  }

  getNthNode(n) {
    let counter = 1;
    let current = this;
    while (counter < n) {
      current = current.next;
      counter++;
    }
    return current;
  }
}

it('Test Case #1', function () {
  const test = new LinkedList(0).addMany([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  test.getNthNode(10).next = test.getNthNode(5);
  chai.expect(program.findLoop(test)).to.deep.equal(test.getNthNode(5));
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.LinkedList as LinkedList
import com.algoexpert.program.findLoop as findLoop

class ProgramTest {
    @Test
    fun TestCase1() {
        var ll = LinkedList(0)
        var tail = addAll(ll, listOf<Int>(1, 2, 3, 4, 5, 6, 7, 8, 9))
        var fifth = ll.next!!.next!!.next!!.next!!.next!!
        tail.next = fifth
        var loop = findLoop(ll)
        assert(loop == fifth)
    }
}

fun addAll(ll: LinkedList, values: List<Int>): LinkedList {
    var current = ll
    for (value in values) {
        val newLL = LinkedList(value)
        current.next = newLL
        current = newLL
    }
    return current
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

open class LinkedList(value: Int) {
    var value = value
    var next: LinkedList? = null
}

// O(n) time | O(1) space - where n is the number of nodes in the Linked List
fun findLoop(head: LinkedList?): LinkedList? {
    var first = head?.next
    var second = first?.next
    while (first != second) {
        first = first?.next
        second = second?.next?.next
    }
    first = head
    while (first != second) {
        first = first?.next
        second = second?.next
    }
    return first
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.LinkedList as LinkedList
import com.algoexpert.program.findLoop as findLoop

class ProgramTest {
    @Test
    fun TestCase1() {
        var ll = LinkedList(0)
        var tail = addAll(ll, listOf<Int>(1, 2, 3, 4, 5, 6, 7, 8, 9))
        var fifth = ll.next!!.next!!.next!!.next!!.next!!
        tail.next = fifth
        var loop = findLoop(ll)
        assert(loop == fifth)
    }
}

fun addAll(ll: LinkedList, values: List<Int>): LinkedList {
    var current = ll
    for (value in values) {
        val newLL = LinkedList(value)
        current.next = newLL
        current = newLL
    }
    return current
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
      let test = TestLinkedList(value: 0).addMany(values: [1, 2, 3, 4, 5, 6, 7, 8, 9])
      test.getNthNode(n: 10).next = test.getNthNode(n: 5)
      try assert(program.findLoop(head: test) === test.getNthNode(n: 5))
    }
  }
}

class TestLinkedList: Program.LinkedList {
  func addMany(values: [Int]) -> TestLinkedList {
    var current = self as Program.LinkedList

    while current.next != nil {
      current = current.next!
    }

    for value in values {
      current.next = Program.LinkedList(value: value)
      current = current.next!
    }

    return self
  }

  func getNthNode(n: Int) -> Program.LinkedList {
    var counter = 1
    var current = self as Program.LinkedList

    while counter < n {
      counter += 1

      if let next = current.next {
        current = next
      }
    }

    return current
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  class LinkedList {
    var value: Int
    var next: LinkedList?

    init(value: Int) {
      self.value = value
      next = nil
    }
  }

  // O(n) time | O(1) space
  func findLoop(head: LinkedList) -> LinkedList? {
    var firstPointer = head.next
    var secondPointer = head.next?.next

    while firstPointer !== secondPointer {
      firstPointer = firstPointer?.next
      secondPointer = secondPointer?.next?.next
    }

    firstPointer = head

    while firstPointer !== secondPointer {
      firstPointer = firstPointer?.next
      secondPointer = secondPointer?.next
    }

    return firstPointer
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let test = TestLinkedList(value: 0).addMany(values: [1, 2, 3, 4, 5, 6, 7, 8, 9])
      test.getNthNode(n: 10).next = test.getNthNode(n: 5)
      try assert(program.findLoop(head: test) === test.getNthNode(n: 5))
    }
  }
}

class TestLinkedList: Program.LinkedList {
  func addMany(values: [Int]) -> TestLinkedList {
    var current = self as Program.LinkedList

    while current.next != nil {
      current = current.next!
    }

    for value in values {
      current.next = Program.LinkedList(value: value)
      current = current.next!
    }

    return self
  }

  func getNthNode(n: Int) -> Program.LinkedList {
    var counter = 1
    var current = self as Program.LinkedList

    while counter < n {
      counter += 1

      if let next = current.next {
        current = next
      }
    }

    return current
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


class StartLinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None


linkedListClass = StartLinkedList
if hasattr(program, "LinkedList"):
    linkedListClass = program.LinkedList


class LinkedList(linkedListClass):
    def addMany(self, values):
        current = self
        while current.next is not None:
            current = current.next
        for value in values:
            current.next = LinkedList(value)
            current = current.next
        return self

    def getNthNode(self, n):
        counter = 1
        current = self
        while counter < n:
            current = current.next
            counter += 1
        return current


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        test = LinkedList(0).addMany([1, 2, 3, 4, 5, 6, 7, 8, 9])
        test.getNthNode(10).next = test.getNthNode(5)
        self.assertEqual(program.findLoop(test), test.getNthNode(5))

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None


# O(n) time | O(1) space
def findLoop(head):
    first = head.next
    second = head.next.next
    while first != second:
        first = first.next
        second = second.next.next
    first = head
    while first != second:
        first = first.next
        second = second.next
    return first

```
### Unit Tests 1 (python)
```python
import program
import unittest


class StartLinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None


linkedListClass = StartLinkedList
if hasattr(program, "LinkedList"):
    linkedListClass = program.LinkedList


class LinkedList(linkedListClass):
    def addMany(self, values):
        current = self
        while current.next is not None:
            current = current.next
        for value in values:
            current.next = LinkedList(value)
            current = current.next
        return self

    def getNthNode(self, n):
        counter = 1
        current = self
        while counter < n:
            current = current.next
            counter += 1
        return current


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        test = LinkedList(0).addMany([1, 2, 3, 4, 5, 6, 7, 8, 9])
        test.getNthNode(10).next = test.getNthNode(5)
        self.assertEqual(program.findLoop(test), test.getNthNode(5))

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

type LinkedList = program.LinkedList;
const {LinkedList} = program;

it('Test Case #1', function () {
  const test = addMany(new LinkedList(0), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  getNthNode(test, 10).next = getNthNode(test, (5));
  chai.expect(program.findLoop(test)).to.deep.equal(getNthNode(test, 5));
});

function addMany(linkedList: LinkedList, values: number[]) {
  let current = linkedList;
  while (current.next !== null) {
    current = current.next;
  }
  for (const value of values) {
    current.next = new LinkedList(value);
    current = current.next;
  }
  return linkedList;
}

function getNthNode(linkedList: LinkedList, n: number) {
  let counter = 1;
  let current = linkedList;
  while (counter < n) {
    current = current!.next!;
    counter++;
  }
  return current;
}
```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

export class LinkedList {
  value: number;
  next: LinkedList | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

// O(n) time | O(1) space
export function findLoop(head: LinkedList) {
  let first: LinkedList = head.next!;
  let second: LinkedList = head.next!.next!;
  while (first !== second) {
    first = first.next!;
    second = second.next!.next!;
  }
  first = head;
  while (first !== second) {
    first = first.next!;
    second = second.next!;
  }
  return first;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

type LinkedList = program.LinkedList;
const {LinkedList} = program;

it('Test Case #1', function () {
  const test = addMany(new LinkedList(0), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  getNthNode(test, 10).next = getNthNode(test, (5));
  chai.expect(program.findLoop(test)).to.deep.equal(getNthNode(test, 5));
});

function addMany(linkedList: LinkedList, values: number[]) {
  let current = linkedList;
  while (current.next !== null) {
    current = current.next;
  }
  for (const value of values) {
    current.next = new LinkedList(value);
    current = current.next;
  }
  return linkedList;
}

function getNthNode(linkedList: LinkedList, n: number) {
  let counter = 1;
  let current = linkedList;
  while (counter < n) {
    current = current!.next!;
    counter++;
  }
  return current;
}
```

