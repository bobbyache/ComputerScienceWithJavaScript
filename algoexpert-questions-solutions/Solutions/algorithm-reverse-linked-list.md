# Reverse Linked List
<div class="html">
<p>
  Write a function that takes in the head of a Singly Linked List, reverses the
  list in place (i.e., doesn't create a brand new list), and returns its new head.
</p>
<p>
  Each <span>LinkedList</span> node has an integer <span>value</span> as well as
  a <span>next</span> node pointing to the next node in the list or to
  <span>None</span> / <span>null</span> if it's the tail of the list.
</p>
<p>
  You can assume that the input Linked List will always have at least one node; in other
  words, the head will never be <span>None</span> / <span>null</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">head</span> = 0 -> 1 -> 2 -> 3 -> 4 -> 5 <span class="CodeEditor-promptComment">// the head node with value 0</span>
</pre>
<h3>Sample Output</h3>
<pre>
5 -> 4 -> 3 -> 2 -> 1 -> 0 <span class="CodeEditor-promptComment">// the new head node with value 5</span>
</pre>
</div>

Hint 1
<p>
You can iterate through the Linked List from head to tail and reverse it in place along the way.
</p>


Hint 2

<p>
You'll need to manipulate three nodes at once at every step.
</p>


Hint 3

<p>
Imagine you have three variables pointing to three consecutive nodes in a Linked List. Start by setting the "next" property of the second node to the first node. Then, set the first variable to the second node, and set the second variable to the third node. Finally, set the third variable to the second variable's "next" property (at this point, the second variable is the original third node). Repeat this process until you're at the tail of the Linked List.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

#include <vector>

LinkedList *newLinkedList(vector<int> values);
vector<int> toArray(LinkedList *ll);
bool arraysEqual(vector<int> arr1, vector<int> arr2);

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      LinkedList *test = newLinkedList({0, 1, 2, 3, 4, 5});
      vector<int> result = toArray(reverseLinkedList(test));
      vector<int> expected = {5, 4, 3, 2, 1, 0};
      assert(arraysEqual(result, expected));
    });
  }
};

LinkedList *newLinkedList(vector<int> values) {
  LinkedList *ll = new LinkedList(values[0]);
  LinkedList *current = ll;
  for (int i = 1; i < values.size(); i++) {
    current->next = new LinkedList(values[i]);
    current = current->next;
  }
  return ll;
}

vector<int> toArray(LinkedList *ll) {
  vector<int> arr = {};
  LinkedList *current = ll;
  while (current != nullptr) {
    arr.push_back(current->value);
    current = current->next;
  }
  return arr;
}

bool arraysEqual(vector<int> arr1, vector<int> arr2) {
  if (arr1.size() != arr2.size())
    return false;
  for (int i = 0; i < arr1.size(); i++) {
    if (arr1[i] != arr2[i])
      return false;
  }
  return true;
}

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
    this->next = nullptr;
  }
};

// O(n) time | O(1) space - where n is the number of nodes in the Linked List
LinkedList *reverseLinkedList(LinkedList *head) {
  LinkedList *previousNode = nullptr;
  LinkedList *currentNode = head;
  while (currentNode != nullptr) {
    LinkedList *nextNode = currentNode->next;
    currentNode->next = previousNode;
    previousNode = currentNode;
    currentNode = nextNode;
  }
  return previousNode;
}

```
### Unit Tests 1 (cpp)
```cpp
#include <vector>

LinkedList *newLinkedList(vector<int> values);
vector<int> toArray(LinkedList *ll);
bool arraysEqual(vector<int> arr1, vector<int> arr2);

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      LinkedList *test = newLinkedList({0, 1, 2, 3, 4, 5});
      vector<int> result = toArray(reverseLinkedList(test));
      vector<int> expected = {5, 4, 3, 2, 1, 0};
      assert(arraysEqual(result, expected));
    });
  }
};

LinkedList *newLinkedList(vector<int> values) {
  LinkedList *ll = new LinkedList(values[0]);
  LinkedList *current = ll;
  for (int i = 1; i < values.size(); i++) {
    current->next = new LinkedList(values[i]);
    current = current->next;
  }
  return ll;
}

vector<int> toArray(LinkedList *ll) {
  vector<int> arr = {};
  LinkedList *current = ll;
  while (current != nullptr) {
    arr.push_back(current->value);
    current = current->next;
  }
  return arr;
}

bool arraysEqual(vector<int> arr1, vector<int> arr2) {
  if (arr1.size() != arr2.size())
    return false;
  for (int i = 0; i < arr1.size(); i++) {
    if (arr1[i] != arr2[i])
      return false;
  }
  return true;
}

```
### Sandbox Code (csharp)
```csharp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		Program.LinkedList test = newLinkedList(new int[] {0, 1, 2, 3, 4, 5});
		List<int> result = toList(Program.ReverseLinkedList(test));
		int[] expected = new int[] {5, 4, 3, 2, 1, 0};
		Utils.AssertTrue(arraysEqual(result, expected));
	}

	public Program.LinkedList newLinkedList(int[] values) {
		Program.LinkedList ll = new Program.LinkedList(values[0]);
		Program.LinkedList current = ll;
		for (int i = 1; i < values.Length; i++) {
			current.Next = new Program.LinkedList(values[i]);
			current = current.Next;
		}
		return ll;
	}

	public List<int> toList(Program.LinkedList ll) {
		List<int> arr = new List<int>();
		Program.LinkedList current = ll;
		while (current != null) {
			arr.Add(current.Value);
			current = current.Next;
		}
		return arr;
	}

	public bool arraysEqual(List<int> arr1, int[] arr2) {
		if (arr1.Count != arr2.Length) return false;
		for (int i = 0; i < arr1.Count; i++) {
			if (arr1[i] != arr2[i]) return false;
		}
		return true;
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(n) time | O(1) space - where n is the number of nodes in the Linked List
	public static LinkedList ReverseLinkedList(LinkedList head) {
		LinkedList previousNode = null;
		LinkedList currentNode = head;
		while (currentNode != null) {
			LinkedList nextNode = currentNode.Next;
			currentNode.Next = previousNode;
			previousNode = currentNode;
			currentNode = nextNode;
		}
		return previousNode;
	}

	public class LinkedList {
		public int Value;
		public LinkedList Next = null;

		public LinkedList(int value) {
			this.Value = value;
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		Program.LinkedList test = newLinkedList(new int[] {0, 1, 2, 3, 4, 5});
		List<int> result = toList(Program.ReverseLinkedList(test));
		int[] expected = new int[] {5, 4, 3, 2, 1, 0};
		Utils.AssertTrue(arraysEqual(result, expected));
	}

	public Program.LinkedList newLinkedList(int[] values) {
		Program.LinkedList ll = new Program.LinkedList(values[0]);
		Program.LinkedList current = ll;
		for (int i = 1; i < values.Length; i++) {
			current.Next = new Program.LinkedList(values[i]);
			current = current.Next;
		}
		return ll;
	}

	public List<int> toList(Program.LinkedList ll) {
		List<int> arr = new List<int>();
		Program.LinkedList current = ll;
		while (current != null) {
			arr.Add(current.Value);
			current = current.Next;
		}
		return arr;
	}

	public bool arraysEqual(List<int> arr1, int[] arr2) {
		if (arr1.Count != arr2.Length) return false;
		for (int i = 0; i < arr1.Count; i++) {
			if (arr1[i] != arr2[i]) return false;
		}
		return true;
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

func NewLinkedList(val int, others ...int) *LinkedList {
	ll := &LinkedList{Value: val}
	current := ll
	for _, other := range others {
		current.Next = &LinkedList{Value: other}
		current = current.Next
	}
	return ll
}

func (ll *LinkedList) ToArray() []int {
	vals := []int{}
	current := ll
	for current != nil {
		vals = append(vals, current.Value)
		current = current.Next
	}
	return vals
}

func (s *TestSuite) TestCase1(t *TestCase) {
	input := NewLinkedList(0, 1, 2, 3, 4, 5)
	output := ReverseLinkedList(input)
	expected := []int{5, 4, 3, 2, 1, 0}
	require.NotNil(t, output)
	require.Equal(t, expected, output.ToArray())
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
func ReverseLinkedList(head *LinkedList) *LinkedList {
	var previousNode, currentNode *LinkedList = nil, head
	for currentNode != nil {
		nextNode := currentNode.Next
		currentNode.Next = previousNode
		previousNode = currentNode
		currentNode = nextNode
	}
	return previousNode
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func NewLinkedList(val int, others ...int) *LinkedList {
	ll := &LinkedList{Value: val}
	current := ll
	for _, other := range others {
		current.Next = &LinkedList{Value: other}
		current = current.Next
	}
	return ll
}

func (ll *LinkedList) ToArray() []int {
	vals := []int{}
	current := ll
	for current != nil {
		vals = append(vals, current.Value)
		current = current.Next
	}
	return vals
}

func (s *TestSuite) TestCase1(t *TestCase) {
	input := NewLinkedList(0, 1, 2, 3, 4, 5)
	output := ReverseLinkedList(input)
	expected := []int{5, 4, 3, 2, 1, 0}
	require.NotNil(t, output)
	require.Equal(t, expected, output.ToArray())
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
    Program.LinkedList test = newLinkedList(new int[] {0, 1, 2, 3, 4, 5});
    List<Integer> result = toArrayList(Program.reverseLinkedList(test));
    int[] expected = new int[] {5, 4, 3, 2, 1, 0};
    Utils.assertTrue(arraysEqual(result, expected));
  }

  public Program.LinkedList newLinkedList(int[] values) {
    Program.LinkedList ll = new Program.LinkedList(values[0]);
    Program.LinkedList current = ll;
    for (int i = 1; i < values.length; i++) {
      current.next = new Program.LinkedList(values[i]);
      current = current.next;
    }
    return ll;
  }

  public List<Integer> toArrayList(Program.LinkedList ll) {
    List<Integer> arr = new ArrayList<Integer>();
    Program.LinkedList current = ll;
    while (current != null) {
      arr.add(current.value);
      current = current.next;
    }
    return arr;
  }

  public boolean arraysEqual(List<Integer> arr1, int[] arr2) {
    if (arr1.size() != arr2.length) return false;
    for (int i = 0; i < arr1.size(); i++) {
      if (arr1.get(i) != arr2[i]) return false;
    }
    return true;
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the number of nodes in the Linked List
  public static LinkedList reverseLinkedList(LinkedList head) {
    LinkedList previousNode = null;
    LinkedList currentNode = head;
    while (currentNode != null) {
      LinkedList nextNode = currentNode.next;
      currentNode.next = previousNode;
      previousNode = currentNode;
      currentNode = nextNode;
    }
    return previousNode;
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
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    Program.LinkedList test = newLinkedList(new int[] {0, 1, 2, 3, 4, 5});
    List<Integer> result = toArrayList(Program.reverseLinkedList(test));
    int[] expected = new int[] {5, 4, 3, 2, 1, 0};
    Utils.assertTrue(arraysEqual(result, expected));
  }

  public Program.LinkedList newLinkedList(int[] values) {
    Program.LinkedList ll = new Program.LinkedList(values[0]);
    Program.LinkedList current = ll;
    for (int i = 1; i < values.length; i++) {
      current.next = new Program.LinkedList(values[i]);
      current = current.next;
    }
    return ll;
  }

  public List<Integer> toArrayList(Program.LinkedList ll) {
    List<Integer> arr = new ArrayList<Integer>();
    Program.LinkedList current = ll;
    while (current != null) {
      arr.add(current.value);
      current = current.next;
    }
    return arr;
  }

  public boolean arraysEqual(List<Integer> arr1, int[] arr2) {
    if (arr1.size() != arr2.length) return false;
    for (int i = 0; i < arr1.size(); i++) {
      if (arr1.get(i) != arr2[i]) return false;
    }
    return true;
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

  getNodesInArray() {
    const nodes = [];
    let current = this;
    while (current !== null) {
      nodes.push(current.value);
      current = current.next;
    }
    return nodes;
  }
}

it('Test Case #1', function () {
  const test = new LinkedList(0).addMany([1, 2, 3, 4, 5]);
  const result = program.reverseLinkedList(test).getNodesInArray();
  const expected = new LinkedList(5).addMany([4, 3, 2, 1, 0]).getNodesInArray();
  chai.expect(result).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// This is an input class. Do not edit.
class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// O(n) time | O(1) space - where n is the number of nodes in the Linked List
function reverseLinkedList(head) {
  let previousNode = null;
  let currentNode = head;
  while (currentNode !== null) {
    const nextNode = currentNode.next;
    currentNode.next = previousNode;
    previousNode = currentNode;
    currentNode = nextNode;
  }
  return previousNode;
}

exports.LinkedList = LinkedList;
exports.reverseLinkedList = reverseLinkedList;

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

  getNodesInArray() {
    const nodes = [];
    let current = this;
    while (current !== null) {
      nodes.push(current.value);
      current = current.next;
    }
    return nodes;
  }
}

it('Test Case #1', function () {
  const test = new LinkedList(0).addMany([1, 2, 3, 4, 5]);
  const result = program.reverseLinkedList(test).getNodesInArray();
  const expected = new LinkedList(5).addMany([4, 3, 2, 1, 0]).getNodesInArray();
  chai.expect(result).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.LinkedList as LinkedList
import com.algoexpert.program.reverseLinkedList as reverseLinkedList

class ProgramTest {
    @Test
    fun TestCase1() {
        var linkedList = LinkedList(0)
        addAll(linkedList, listOf(1, 2, 3, 4, 5))
        var reversedLinkedList = LinkedList(5)
        addAll(reversedLinkedList, listOf(4, 3, 2, 1, 0))

        var result = getNodeValuesInArray(reverseLinkedList(linkedList))
        var expected = getNodeValuesInArray(reversedLinkedList)

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

open class LinkedList(value: Int) {
    var value = value
    var next: LinkedList? = null
}

// O(n) time | O(1) space - where n is the number of nodes in the Linked List
fun reverseLinkedList(head: LinkedList): LinkedList {
    var previousNode: LinkedList? = null
    var currentNode: LinkedList? = head
    while (currentNode != null) {
        val nextNode = currentNode.next
        currentNode.next = previousNode
        previousNode = currentNode
        currentNode = nextNode
    }
    return previousNode!!
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.LinkedList as LinkedList
import com.algoexpert.program.reverseLinkedList as reverseLinkedList

class ProgramTest {
    @Test
    fun TestCase1() {
        var linkedList = LinkedList(0)
        addAll(linkedList, listOf(1, 2, 3, 4, 5))
        var reversedLinkedList = LinkedList(5)
        addAll(reversedLinkedList, listOf(4, 3, 2, 1, 0))

        var result = getNodeValuesInArray(reverseLinkedList(linkedList))
        var expected = getNodeValuesInArray(reversedLinkedList)

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

class ProgramTest: TestSuite {
  let program = Program()
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      try testReverseLinkedList(initialValue: 0, values: [1, 2, 3, 4, 5], reversedInitialValue: 5, reversedValues: [4, 3, 2, 1, 0])
    }
  }

  func testReverseLinkedList(initialValue: Int, values: [Int], reversedInitialValue: Int, reversedValues: [Int]) throws {
    let test = TestLinkedList(value: initialValue).addMany(values: values)
    let result = program.reverseLinkedList(test) as! TestLinkedList
    let expected = TestLinkedList(value: reversedInitialValue).addMany(values: reversedValues)
    try assertEqual(expected.getNodesInArray(), result.getNodesInArray())
  }
}

class TestLinkedList: Program.LinkedList {
  func addMany(values: [Int]) -> TestLinkedList {
    var current: Program.LinkedList? = self

    while current?.next != nil {
      current = current?.next
    }

    for value in values {
      current?.next = TestLinkedList(value: value)
      current = current?.next
    }
    return self
  }

  func getNodesInArray() -> [Int] {
    var nodes = [Int]()
    var current: Program.LinkedList? = self

    while current != nil {
      if let value = current?.value {
        nodes.append(value)
      }
      current = current?.next
    }

    return nodes
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
    }
  }

  // O(n) time | O(1) space
  func reverseLinkedList(_ head: LinkedList) -> LinkedList {
    var previousNode: LinkedList?
    var currentNode: LinkedList? = head

    while currentNode != nil {
      let nextPointer = currentNode?.next
      currentNode?.next = previousNode
      previousNode = currentNode
      currentNode = nextPointer
    }

    return previousNode!
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  let program = Program()
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      try testReverseLinkedList(initialValue: 0, values: [1, 2, 3, 4, 5], reversedInitialValue: 5, reversedValues: [4, 3, 2, 1, 0])
    }
  }

  func testReverseLinkedList(initialValue: Int, values: [Int], reversedInitialValue: Int, reversedValues: [Int]) throws {
    let test = TestLinkedList(value: initialValue).addMany(values: values)
    let result = program.reverseLinkedList(test) as! TestLinkedList
    let expected = TestLinkedList(value: reversedInitialValue).addMany(values: reversedValues)
    try assertEqual(expected.getNodesInArray(), result.getNodesInArray())
  }
}

class TestLinkedList: Program.LinkedList {
  func addMany(values: [Int]) -> TestLinkedList {
    var current: Program.LinkedList? = self

    while current?.next != nil {
      current = current?.next
    }

    for value in values {
      current?.next = TestLinkedList(value: value)
      current = current?.next
    }
    return self
  }

  func getNodesInArray() -> [Int] {
    var nodes = [Int]()
    var current: Program.LinkedList? = self

    while current != nil {
      if let value = current?.value {
        nodes.append(value)
      }
      current = current?.next
    }

    return nodes
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


class LinkedList(program.LinkedList):
    def addMany(self, values):
        current = self
        while current.next is not None:
            current = current.next
        for value in values:
            current.next = LinkedList(value)
            current = current.next
        return self

    def getNodesInArray(self):
        nodes = []
        current = self
        while current is not None:
            nodes.append(current.value)
            current = current.next
        return nodes


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        test = LinkedList(0).addMany([1, 2, 3, 4, 5])
        result = program.reverseLinkedList(test).getNodesInArray()
        expected = LinkedList(5).addMany([4, 3, 2, 1, 0]).getNodesInArray()
        self.assertEqual(result, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# This is an input class. Do not edit.
class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None


# O(n) time | O(1) space - where n is the number of nodes in the Linked List
def reverseLinkedList(head):
    previousNode, currentNode = None, head
    while currentNode is not None:
        nextNode = currentNode.next
        currentNode.next = previousNode
        previousNode = currentNode
        currentNode = nextNode
    return previousNode

```
### Unit Tests 1 (python)
```python
import program
import unittest


class LinkedList(program.LinkedList):
    def addMany(self, values):
        current = self
        while current.next is not None:
            current = current.next
        for value in values:
            current.next = LinkedList(value)
            current = current.next
        return self

    def getNodesInArray(self):
        nodes = []
        current = self
        while current is not None:
            nodes.append(current.value)
            current = current.next
        return nodes


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        test = LinkedList(0).addMany([1, 2, 3, 4, 5])
        result = program.reverseLinkedList(test).getNodesInArray()
        expected = LinkedList(5).addMany([4, 3, 2, 1, 0]).getNodesInArray()
        self.assertEqual(result, expected)

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
  const test = addMany(new LinkedList(0), [1, 2, 3, 4, 5]);
  const result = getNodesInArray(program.reverseLinkedList(test));
  const expected = getNodesInArray(addMany(new LinkedList(5), [4, 3, 2, 1, 0]));
  chai.expect(result).to.deep.equal(expected);
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

function getNodesInArray(linkedList: LinkedList) {
  const nodes: number[] = [];
  let current: LinkedList | null = linkedList;
  while (current !== null) {
    nodes.push(current.value);
    current = current.next;
  }
  return nodes;
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

// O(n) time | O(1) space - where n is the number of nodes in the Linked List
export function reverseLinkedList(head: LinkedList) {
  let previousNode: LinkedList | null = null;
  let currentNode: LinkedList | null = head;
  while (currentNode !== null) {
    const nextNode: LinkedList | null = currentNode.next;
    currentNode.next = previousNode;
    previousNode = currentNode;
    currentNode = nextNode;
  }
  return previousNode!;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

type LinkedList = program.LinkedList;
const {LinkedList} = program;

it('Test Case #1', function () {
  const test = addMany(new LinkedList(0), [1, 2, 3, 4, 5]);
  const result = getNodesInArray(program.reverseLinkedList(test));
  const expected = getNodesInArray(addMany(new LinkedList(5), [4, 3, 2, 1, 0]));
  chai.expect(result).to.deep.equal(expected);
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

function getNodesInArray(linkedList: LinkedList) {
  const nodes: number[] = [];
  let current: LinkedList | null = linkedList;
  while (current !== null) {
    nodes.push(current.value);
    current = current.next;
  }
  return nodes;
}

```

