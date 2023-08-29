# Shift Linked List
<div class="html">
<p>
  Write a function that takes in the head of a Singly Linked List and an integer
  <span>k</span>, shifts the list in place (i.e., doesn't create a brand new
  list) by k positions, and returns its new head.
</p>
<p>
  Shifting a Linked List means moving its nodes forward or backward and wrapping
  them around the list where appropriate. For example, shifting a Linked List
  forward by one position would make its tail become the new head of the linked
  list.
</p>
<p>
  Whether nodes are moved forward or backward is determined by whether
  <span>k</span> is positive or negative.
</p>
<p>
  Each <span>LinkedList</span> node has an integer <span>value</span> as well as
  a <span>next</span> node pointing to the next node in the list or to
  <span>None</span> / <span>null</span> if it's the tail of the list.
</p>
<p>
  You can assume that the input Linked List will always have at least one node;
  in other words, the head will never be <span>None</span> / <span>null</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">head</span> = 0 -> 1 -> 2 -> 3 -> 4 -> 5 <span class="CodeEditor-promptComment">// the head node with value 0</span>
<span class="CodeEditor-promptParameter">k</span> = 2
</pre>
<h3>Sample Output</h3>
<pre>
4 -> 5 -> 0 -> 1 -> 2 -> 3 <span class="CodeEditor-promptComment">// the new head node with value 4</span>
</pre>
</div>

Hint 1
<p>
Putting aside the cases where k is a negative integer, where k is 0, or where k is larger than the length of the linked list, what does shifting the linked list by k positions entail exactly?
</p>


Hint 2

<p>
Putting aside the cases mentioned in Hint #1, shifting the linked list by k positions means moving the last k nodes in the linked list to the front of the linked list. What nodes in the linked list will you actually need to mutate?
</p>


Hint 3

<p>
There are four nodes that really matter in this entire process: the original tail of the linked list, which will point to the original head of the linked list, the original head of the linked list, which will be pointed to by the original tail of the linked list, the new tail of the linked list, and the new head of the linked list. Note that the new head is the node that the new tail points to in the original, unshifted linked list.
</p>


Hint 4

<p>
You can find the original tail of the linked list by simply traversing the linked list, starting at the original head of the linked list that you're given. You can find the new tail of the linked list by moving k positions from the original tail if k is positive (which means moving to the (lengthOfList - k)th position in the list, and you can easily count the length of the list as you traverse it to find its original tail). You can access the new head of the linked list once you've found its new tail, since it's the new tail's original next node. How will you handle the trickier values of k?
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

vector<int> linkedListToArray(LinkedList *head) {
  vector<int> array{};
  auto current = head;
  while (current != nullptr) {
    array.push_back(current->value);
    current = current->next;
  }
  return array;
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      auto head = new LinkedList(0);
      head->next = new LinkedList(1);
      head->next->next = new LinkedList(2);
      head->next->next->next = new LinkedList(3);
      head->next->next->next->next = new LinkedList(4);
      head->next->next->next->next->next = new LinkedList(5);
      auto result = shiftLinkedList(head, 2);
      auto array = linkedListToArray(result);

      vector<int> expected{4, 5, 0, 1, 2, 3};
      assert(expected == array);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

class LinkedList {
public:
  int value;
  LinkedList *next;

  LinkedList(int value) {
    this->value = value;
    next = nullptr;
  }
};

// O(n) time | O(1) space - where n is the number of nodes in the Linked List
LinkedList *shiftLinkedList(LinkedList *head, int k) {
  int listLength = 1;
  LinkedList *listTail = head;
  while (listTail->next != nullptr) {
    listTail = listTail->next;
    listLength++;
  }

  int offset = abs(k) % listLength;
  if (offset == 0)
    return head;
  int newTailPosition = k > 0 ? listLength - offset : offset;
  LinkedList *newTail = head;
  for (int i = 1; i < newTailPosition; i++) {
    newTail = newTail->next;
  }

  LinkedList *newHead = newTail->next;
  newTail->next = nullptr;
  listTail->next = head;
  return newHead;
}

```
### Unit Tests 1 (cpp)
```cpp
vector<int> linkedListToArray(LinkedList *head) {
  vector<int> array{};
  auto current = head;
  while (current != nullptr) {
    array.push_back(current->value);
    current = current->next;
  }
  return array;
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      auto head = new LinkedList(0);
      head->next = new LinkedList(1);
      head->next->next = new LinkedList(2);
      head->next->next->next = new LinkedList(3);
      head->next->next->next->next = new LinkedList(4);
      head->next->next->next->next->next = new LinkedList(5);
      auto result = shiftLinkedList(head, 2);
      auto array = linkedListToArray(result);

      vector<int> expected{4, 5, 0, 1, 2, 3};
      assert(expected == array);
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
using System.Collections.Generic;

public class ProgramTest {
	public List<int> linkedListToArray(Program.LinkedList head) {
		var array = new List<int>();
		var current = head;
		while (current != null) {
			array.Add(current.value);
			current = current.next;
		}
		return array;
	}

	[Test]
	public void TestCase1() {
		var head = new Program.LinkedList(0);
		head.next = new Program.LinkedList(1);
		head.next.next = new Program.LinkedList(2);
		head.next.next.next = new Program.LinkedList(3);
		head.next.next.next.next = new Program.LinkedList(4);
		head.next.next.next.next.next = new Program.LinkedList(5);
		var result = Program.ShiftLinkedList(head, 2);
		var array = this.linkedListToArray(result);

		var expected = new List<int> {
			4, 5, 0, 1, 2, 3
		};
		Utils.AssertTrue(Enumerable.SequenceEqual(expected, array));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// O(n) time | O(1) space - where n is the number of nodes in the Linked List
	public static LinkedList ShiftLinkedList(LinkedList head, int k) {
		int listLength = 1;
		LinkedList listTail = head;
		while (listTail.next != null) {
			listTail = listTail.next;
			listLength++;
		}

		int offset = Math.Abs(k) % listLength;
		if (offset == 0) return head;
		int newTailPosition = k > 0 ? listLength - offset : offset;
		LinkedList newTail = head;
		for (int i = 1; i < newTailPosition; i++) {
			newTail = newTail.next;
		}

		LinkedList newHead = newTail.next;
		newTail.next = null;
		listTail.next = head;
		return newHead;
	}

	public class LinkedList {
		public int value;
		public LinkedList next;

		public LinkedList(int value) {
			this.value = value;
			next = null;
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;
using System.Linq;
using System.Collections.Generic;

public class ProgramTest {
	public List<int> linkedListToArray(Program.LinkedList head) {
		var array = new List<int>();
		var current = head;
		while (current != null) {
			array.Add(current.value);
			current = current.next;
		}
		return array;
	}

	[Test]
	public void TestCase1() {
		var head = new Program.LinkedList(0);
		head.next = new Program.LinkedList(1);
		head.next.next = new Program.LinkedList(2);
		head.next.next.next = new Program.LinkedList(3);
		head.next.next.next.next = new Program.LinkedList(4);
		head.next.next.next.next.next = new Program.LinkedList(5);
		var result = Program.ShiftLinkedList(head, 2);
		var array = this.linkedListToArray(result);

		var expected = new List<int> {
			4, 5, 0, 1, 2, 3
		};
		Utils.AssertTrue(Enumerable.SequenceEqual(expected, array));
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

func newLinkedList(n int) *LinkedList { return &LinkedList{Value: n} }

func linkedListToArray(head *LinkedList) []int {
	array := []int{}
	current := head
	for current != nil {
		array = append(array, current.Value)
		current = current.Next
	}
	return array
}

func (s *TestSuite) TestCase1(t *TestCase) {
	head := newLinkedList(0)
	head.Next = newLinkedList(1)
	head.Next.Next = newLinkedList(2)
	head.Next.Next.Next = newLinkedList(3)
	head.Next.Next.Next.Next = newLinkedList(4)
	head.Next.Next.Next.Next.Next = newLinkedList(5)
	result := ShiftLinkedList(head, 2)
	array := linkedListToArray(result)

	expected := []int{4, 5, 0, 1, 2, 3}
	require.Equal(t, expected, array)
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

// O(n) time | O(1) space - where n is the number of nodes in the Linked List
func ShiftLinkedList(head *LinkedList, k int) *LinkedList {
	listLength := 1
	listTail := head
	for listTail.Next != nil {
		listTail = listTail.Next
		listLength += 1
	}

	offset := abs(k) % listLength
	if offset == 0 {
		return head
	}

	newTailPosition := listLength - offset
	if k <= 0 {
		newTailPosition = offset
	}

	newTail := head
	for i := 1; i < newTailPosition; i++ {
		newTail = newTail.Next
	}

	newHead := newTail.Next
	newTail.Next = nil
	listTail.Next = head
	return newHead
}

func abs(k int) int {
	if k > 0 {
		return k
	}
	return -k
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func newLinkedList(n int) *LinkedList { return &LinkedList{Value: n} }

func linkedListToArray(head *LinkedList) []int {
	array := []int{}
	current := head
	for current != nil {
		array = append(array, current.Value)
		current = current.Next
	}
	return array
}

func (s *TestSuite) TestCase1(t *TestCase) {
	head := newLinkedList(0)
	head.Next = newLinkedList(1)
	head.Next.Next = newLinkedList(2)
	head.Next.Next.Next = newLinkedList(3)
	head.Next.Next.Next.Next = newLinkedList(4)
	head.Next.Next.Next.Next.Next = newLinkedList(5)
	result := ShiftLinkedList(head, 2)
	array := linkedListToArray(result)

	expected := []int{4, 5, 0, 1, 2, 3}
	require.Equal(t, expected, array)
}

```
### Sandbox Code (java)
```java
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import java.util.*;

class ProgramTest {
  public List<Integer> linkedListToArray(Program.LinkedList head) {
    var array = new ArrayList<Integer>();
    var current = head;
    while (current != null) {
      array.add(current.value);
      current = current.next;
    }
    return array;
  }

  @Test
  public void TestCase1() {
    var head = new Program.LinkedList(0);
    head.next = new Program.LinkedList(1);
    head.next.next = new Program.LinkedList(2);
    head.next.next.next = new Program.LinkedList(3);
    head.next.next.next.next = new Program.LinkedList(4);
    head.next.next.next.next.next = new Program.LinkedList(5);
    var result = Program.shiftLinkedList(head, 2);
    var array = this.linkedListToArray(result);

    var expected = Arrays.asList(new Integer[] {4, 5, 0, 1, 2, 3});
    Utils.assertTrue(expected.equals(array));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the number of nodes in the Linked List
  public static LinkedList shiftLinkedList(LinkedList head, int k) {
    int listLength = 1;
    LinkedList listTail = head;
    while (listTail.next != null) {
      listTail = listTail.next;
      listLength++;
    }

    int offset = Math.abs(k) % listLength;
    if (offset == 0) return head;
    int newTailPosition = k > 0 ? listLength - offset : offset;
    LinkedList newTail = head;
    for (int i = 1; i < newTailPosition; i++) {
      newTail = newTail.next;
    }

    LinkedList newHead = newTail.next;
    newTail.next = null;
    listTail.next = head;
    return newHead;
  }

  static class LinkedList {
    public int value;
    public LinkedList next;

    public LinkedList(int value) {
      this.value = value;
      next = null;
    }
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  public List<Integer> linkedListToArray(Program.LinkedList head) {
    var array = new ArrayList<Integer>();
    var current = head;
    while (current != null) {
      array.add(current.value);
      current = current.next;
    }
    return array;
  }

  @Test
  public void TestCase1() {
    var head = new Program.LinkedList(0);
    head.next = new Program.LinkedList(1);
    head.next.next = new Program.LinkedList(2);
    head.next.next.next = new Program.LinkedList(3);
    head.next.next.next.next = new Program.LinkedList(4);
    head.next.next.next.next.next = new Program.LinkedList(5);
    var result = Program.shiftLinkedList(head, 2);
    var array = this.linkedListToArray(result);

    var expected = Arrays.asList(new Integer[] {4, 5, 0, 1, 2, 3});
    Utils.assertTrue(expected.equals(array));
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

const {LinkedList} = program;

function linkedListToArray(head) {
  const array = [];
  let current = head;
  while (current) {
    array.push(current.value);
    current = current.next;
  }
  return array;
}

it('Test Case #1', function () {
  const head = new LinkedList(0);
  head.next = new LinkedList(1);
  head.next.next = new LinkedList(2);
  head.next.next.next = new LinkedList(3);
  head.next.next.next.next = new LinkedList(4);
  head.next.next.next.next.next = new LinkedList(5);
  const result = program.shiftLinkedList(head, 2);
  const array = linkedListToArray(result);

  var expected = [4, 5, 0, 1, 2, 3];
  chai.expect(array).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// This is the class of the input linked list.
class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// O(n) time | O(1) space - where n is the number of nodes in the Linked List
function shiftLinkedList(head, k) {
  let listLength = 1;
  let listTail = head;
  while (listTail.next !== null) {
    listTail = listTail.next;
    listLength++;
  }

  const offset = Math.abs(k) % listLength;
  if (offset === 0) return head;

  const newTailPosition = k > 0 ? listLength - offset : offset;
  let newTail = head;
  for (let i = 1; i < newTailPosition; i++) {
    newTail = newTail.next;
  }

  const newHead = newTail.next;
  newTail.next = null;
  listTail.next = head;
  return newHead;
}

exports.LinkedList = LinkedList;
exports.shiftLinkedList = shiftLinkedList;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

const {LinkedList} = program;

function linkedListToArray(head) {
  const array = [];
  let current = head;
  while (current) {
    array.push(current.value);
    current = current.next;
  }
  return array;
}

it('Test Case #1', function () {
  const head = new LinkedList(0);
  head.next = new LinkedList(1);
  head.next.next = new LinkedList(2);
  head.next.next.next = new LinkedList(3);
  head.next.next.next.next = new LinkedList(4);
  head.next.next.next.next.next = new LinkedList(5);
  const result = program.shiftLinkedList(head, 2);
  const array = linkedListToArray(result);

  var expected = [4, 5, 0, 1, 2, 3];
  chai.expect(array).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.LinkedList as LinkedList
import com.algoexpert.program.shiftLinkedList as shiftLinkedList

class ProgramTest {
    @Test
    fun TestCase1() {
        var linkedList = LinkedList(0)
        addAll(linkedList, listOf(1, 2, 3, 4, 5))

        var result = getNodeValuesInArray(shiftLinkedList(linkedList, 2))
        var expected = listOf(4, 5, 0, 1, 2, 3)

        assert(result == expected)
    }
}

fun addAll(ll: LinkedList, values: List<Int>) {
    var current = ll
    for (value in values) {
        val newLL = LinkedList(value)
        current.next = newLL
        current = newLL
    }
}

fun getNodeValuesInArray(linkedList: LinkedList): List<Int> {
    var values = mutableListOf<Int>()
    var current: LinkedList? = linkedList
    while (current != null) {
        values.add(current.value)
        current = current.next
    }
    return values
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.abs

open class LinkedList(value: Int) {
    var value = value
    var next: LinkedList? = null
}

// O(n) time | O(1) space - where n is the number of nodes in the Linked List
fun shiftLinkedList(head: LinkedList, k: Int): LinkedList {
    var listLength = 1
    var listTail = head
    while (listTail.next != null) {
        listTail = listTail.next!!
        listLength++
    }

    val offset = abs(k) % listLength
    if (offset == 0) return head
    val newTailPosition = if (k > 0) listLength - offset else offset
    var newTail = head
    for (i in 1 until newTailPosition) {
        newTail = newTail.next!!
    }

    val newHead = newTail.next!!
    newTail.next = null
    listTail.next = head
    return newHead
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.LinkedList as LinkedList
import com.algoexpert.program.shiftLinkedList as shiftLinkedList

class ProgramTest {
    @Test
    fun TestCase1() {
        var linkedList = LinkedList(0)
        addAll(linkedList, listOf(1, 2, 3, 4, 5))

        var result = getNodeValuesInArray(shiftLinkedList(linkedList, 2))
        var expected = listOf(4, 5, 0, 1, 2, 3)

        assert(result == expected)
    }
}

fun addAll(ll: LinkedList, values: List<Int>) {
    var current = ll
    for (value in values) {
        val newLL = LinkedList(value)
        current.next = newLL
        current = newLL
    }
}

fun getNodeValuesInArray(linkedList: LinkedList): List<Int> {
    var values = mutableListOf<Int>()
    var current: LinkedList? = linkedList
    while (current != null) {
        values.add(current.value)
        current = current.next
    }
    return values
}

```
### Sandbox Code (swift)
```swift
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

func linkedListToArray(_ head: Program.LinkedList?) -> [Int] {
  var array = [Int]()
  var current = head
  while let c = current {
    array.append(c.value)
    current = c.next
  }
  return array
}

class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let head = Program.LinkedList(value: 0)
      head.next = Program.LinkedList(value: 1)
      head.next!.next = Program.LinkedList(value: 2)
      head.next!.next!.next = Program.LinkedList(value: 3)
      head.next!.next!.next!.next = Program.LinkedList(value: 4)
      head.next!.next!.next!.next!.next = Program.LinkedList(value: 5)
      let result = Program.shiftLinkedList(head, 2)
      let array = linkedListToArray(result)

      let expected = [4, 5, 0, 1, 2, 3]
      try assertEqual(expected, array)
    }
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

  // O(n) time | O(1) space - where n is the number of nodes in the Linked List
  static func shiftLinkedList(_ head: LinkedList, _ k: Int) -> LinkedList? {
    var listLength = 1
    var listTail = head

    while let next = listTail.next {
      listTail = next
      listLength += 1
    }

    var offset = abs(k) % listLength
    if offset == 0 {
      return head
    }

    var newTailPosition = listLength - offset
    if k <= 0 {
      newTailPosition = offset
    }

    var newTail: LinkedList = head
    for i in 1 ..< newTailPosition {
      newTail = newTail.next!
    }

    var newHead = newTail.next
    newTail.next = nil
    listTail.next = head
    return newHead
  }
}

```
### Unit Tests 1 (swift)
```swift
func linkedListToArray(_ head: Program.LinkedList?) -> [Int] {
  var array = [Int]()
  var current = head
  while let c = current {
    array.append(c.value)
    current = c.next
  }
  return array
}

class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let head = Program.LinkedList(value: 0)
      head.next = Program.LinkedList(value: 1)
      head.next!.next = Program.LinkedList(value: 2)
      head.next!.next!.next = Program.LinkedList(value: 3)
      head.next!.next!.next!.next = Program.LinkedList(value: 4)
      head.next!.next!.next!.next!.next = Program.LinkedList(value: 5)
      let result = Program.shiftLinkedList(head, 2)
      let array = linkedListToArray(result)

      let expected = [4, 5, 0, 1, 2, 3]
      try assertEqual(expected, array)
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


def linkedListToArray(head):
    array = []
    current = head
    while current is not None:
        array.append(current.value)
        current = current.next
    return array


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        head = program.LinkedList(0)
        head.next = program.LinkedList(1)
        head.next.next = program.LinkedList(2)
        head.next.next.next = program.LinkedList(3)
        head.next.next.next.next = program.LinkedList(4)
        head.next.next.next.next.next = program.LinkedList(5)
        result = program.shiftLinkedList(head, 2)
        array = linkedListToArray(result)

        expected = [4, 5, 0, 1, 2, 3]
        self.assertEqual(expected, array)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# This is the class of the input linked list.
class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None


# O(n) time | O(1) space - where n is the number of nodes in the Linked List
def shiftLinkedList(head, k):
    listLength = 1
    listTail = head
    while listTail.next is not None:
        listTail = listTail.next
        listLength += 1

    offset = abs(k) % listLength
    if offset == 0:
        return head

    newTailPosition = listLength - offset if k > 0 else offset
    newTail = head
    for i in range(1, newTailPosition):
        newTail = newTail.next

    newHead = newTail.next
    newTail.next = None
    listTail.next = head
    return newHead
```
### Unit Tests 1 (python)
```python
import program
import unittest


def linkedListToArray(head):
    array = []
    current = head
    while current is not None:
        array.append(current.value)
        current = current.next
    return array


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        head = program.LinkedList(0)
        head.next = program.LinkedList(1)
        head.next.next = program.LinkedList(2)
        head.next.next.next = program.LinkedList(3)
        head.next.next.next.next = program.LinkedList(4)
        head.next.next.next.next.next = program.LinkedList(5)
        result = program.shiftLinkedList(head, 2)
        array = linkedListToArray(result)

        expected = [4, 5, 0, 1, 2, 3]
        self.assertEqual(expected, array)

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

function linkedListToArray(head: LinkedList | null) {
  const array: number[] = [];
  let current: LinkedList | null = head;
  while (current) {
    array.push(current.value);
    current = current.next;
  }
  return array;
}

it('Test Case #1', function () {
  const head = new LinkedList(0);
  head.next = new LinkedList(1);
  head.next.next = new LinkedList(2);
  head.next.next.next = new LinkedList(3);
  head.next.next.next.next = new LinkedList(4);
  head.next.next.next.next.next = new LinkedList(5);
  const result = program.shiftLinkedList(head, 2);
  const array = linkedListToArray(result);

  var expected = [4, 5, 0, 1, 2, 3];
  chai.expect(array).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// This is the class of the input linked list.
export class LinkedList {
  value: number;
  next: LinkedList | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

// O(n) time | O(1) space - where n is the number of nodes in the Linked List
export function shiftLinkedList(head: LinkedList, k: number) {
  let listLength = 1;
  let listTail: LinkedList = head;
  while (listTail.next !== null) {
    listTail = listTail.next;
    listLength++;
  }

  const offset = Math.abs(k) % listLength;
  if (offset === 0) return head;

  const newTailPosition = k > 0 ? listLength - offset : offset;
  let newTail: LinkedList | null = head;
  for (let i = 1; i < newTailPosition; i++) {
    newTail = newTail!.next;
  }

  const newHead = newTail!.next;
  newTail!.next = null;
  listTail.next = head;
  return newHead;
}
```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

type LinkedList = program.LinkedList;
const {LinkedList} = program;

function linkedListToArray(head: LinkedList | null) {
  const array: number[] = [];
  let current: LinkedList | null = head;
  while (current) {
    array.push(current.value);
    current = current.next;
  }
  return array;
}

it('Test Case #1', function () {
  const head = new LinkedList(0);
  head.next = new LinkedList(1);
  head.next.next = new LinkedList(2);
  head.next.next.next = new LinkedList(3);
  head.next.next.next.next = new LinkedList(4);
  head.next.next.next.next.next = new LinkedList(5);
  const result = program.shiftLinkedList(head, 2);
  const array = linkedListToArray(result);

  var expected = [4, 5, 0, 1, 2, 3];
  chai.expect(array).to.deep.equal(expected);
});

```

