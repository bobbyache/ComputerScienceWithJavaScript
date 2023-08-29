# Remove Duplicates From Linked List
<div class="html">
<p>
  You're given the head of a Singly Linked List whose nodes are in sorted order
  with respect to their values. Write a function that returns a modified version
  of the Linked List that doesn't contain any nodes with duplicate values. The
  Linked List should be modified in place (i.e., you shouldn't create a brand
  new list), and the modified Linked List should still have its nodes sorted
  with respect to their values.
</p>
<p>
  Each <span>LinkedList</span> node has an integer <span>value</span> as well as
  a <span>next</span> node pointing to the next node in the list or to
  <span>None</span> / <span>null</span> if it's the tail of the list.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">linkedList</span> = 1 -> 1 -> 3 -> 4 -> 4 -> 4 -> 5 -> 6 -> 6 <span class="CodeEditor-promptComment">// the head node with value 1</span>
</pre>
<h3>Sample Output</h3>
<pre>
1 -> 3 -> 4 -> 5 -> 6 <span class="CodeEditor-promptComment">// the head node with value 1</span>
</pre>
</div>

Hint 1
<p>
  The brute-force approach to this problem is to use a hash table or a set to
  keep track of all node values that exist while traversing the linked list and
  to simply remove nodes that have a value that already exists. This approach
  works, but can you solve this problem without using an auxiliary data
  structure?
</p>


Hint 2

<p>
  What does the fact that the nodes are sorted tell you about the location of
  all duplicate nodes? How can you use this fact to solve this problem with
  constant space?
</p>


Hint 3

<p>
  Since the linked list's nodes are sorted, you can loop through them and, at
  each iteration, simply remove all successive nodes that have the same value as
  the current node. For each node, change its next pointer to the next node in
  the linked list that has a different value. This will remove all
  duplicate-value nodes.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

LinkedList *addMany(LinkedList *linkedList, vector<int> values);
vector<int> getNodesInArray(LinkedList *linkedList);

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      auto input =
          addMany(new LinkedList(1), vector<int>{1, 3, 4, 4, 4, 5, 6, 6});
      auto expected = addMany(new LinkedList(1), vector<int>{3, 4, 5, 6});
      auto actual = removeDuplicatesFromLinkedList(input);
      assert(getNodesInArray(actual) == getNodesInArray(expected));
    });
  }
};

LinkedList *addMany(LinkedList *linkedList, vector<int> values) {
  LinkedList *current = linkedList;
  while (current->next != nullptr) {
    current = current->next;
  }
  for (auto value : values) {
    current->next = new LinkedList(value);
    current = current->next;
  }
  return linkedList;
}

vector<int> getNodesInArray(LinkedList *linkedList) {
  vector<int> nodes;
  LinkedList *current = linkedList;
  while (current != nullptr) {
    nodes.push_back(current->value);
    current = current->next;
  }
  return nodes;
}
```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// This is an input struct. Do not edit.
class LinkedList {
public:
  int value;
  LinkedList *next = nullptr;

  LinkedList(int value) { this->value = value; }
};

// O(n) time | O(1) space - where n is the number of nodes in the Linked List
LinkedList *removeDuplicatesFromLinkedList(LinkedList *linkedList) {
  LinkedList *currentNode = linkedList;
  while (currentNode != nullptr) {
    LinkedList *nextDistinctNode = currentNode->next;
    while (nextDistinctNode != nullptr &&
           nextDistinctNode->value == currentNode->value) {
      nextDistinctNode = nextDistinctNode->next;
    }

    currentNode->next = nextDistinctNode;
    currentNode = nextDistinctNode;
  }

  return linkedList;
}

```
### Unit Tests 1 (cpp)
```cpp
LinkedList *addMany(LinkedList *linkedList, vector<int> values);
vector<int> getNodesInArray(LinkedList *linkedList);

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      auto input =
          addMany(new LinkedList(1), vector<int>{1, 3, 4, 4, 4, 5, 6, 6});
      auto expected = addMany(new LinkedList(1), vector<int>{3, 4, 5, 6});
      auto actual = removeDuplicatesFromLinkedList(input);
      assert(getNodesInArray(actual) == getNodesInArray(expected));
    });
  }
};

LinkedList *addMany(LinkedList *linkedList, vector<int> values) {
  LinkedList *current = linkedList;
  while (current->next != nullptr) {
    current = current->next;
  }
  for (auto value : values) {
    current->next = new LinkedList(value);
    current = current->next;
  }
  return linkedList;
}

vector<int> getNodesInArray(LinkedList *linkedList) {
  vector<int> nodes;
  LinkedList *current = linkedList;
  while (current != nullptr) {
    nodes.push_back(current->value);
    current = current->next;
  }
  return nodes;
}
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
	public Program.LinkedList addMany(Program.LinkedList ll, List<int> values) {
		Program.LinkedList current = ll;
		while (current.next != null) {
			current = current.next;
		}
		foreach (var value in values) {
			current.next = new Program.LinkedList(value);
			current = current.next;
		}
		return ll;
	}

	public List<int> getNodesInArray(Program.LinkedList ll) {
		List<int> nodes = new List<int>();
		Program.LinkedList current = ll;
		while (current != null) {
			nodes.Add(current.value);
			current = current.next;
		}
		return nodes;
	}

	[Test]
	public void TestCase1() {
		Program.LinkedList input = new Program.LinkedList(1);
		addMany(input, new List<int> {
			1, 3, 4, 4, 4, 5, 6, 6
		});
		List<int> expectedNodes = new List<int> {
			1, 3, 4, 5, 6
		};
		Program.LinkedList output = new Program().RemoveDuplicatesFromLinkedList(input);
		Utils.AssertTrue(Enumerable.SequenceEqual(getNodesInArray(output), expectedNodes));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {
	// This is an input class. Do not edit.
	public class LinkedList {
		public int value;
		public LinkedList next;

		public LinkedList(int value) {
			this.value = value;
			this.next = null;
		}
	}

	// O(n) time | O(1) space - where n is the number of nodes in the Linked List
	public LinkedList RemoveDuplicatesFromLinkedList(LinkedList linkedList) {
		LinkedList currentNode = linkedList;
		while (currentNode != null) {
			LinkedList nextDistinctNode = currentNode.next;
			while (nextDistinctNode != null &&
			  nextDistinctNode.value == currentNode.value) {
				nextDistinctNode = nextDistinctNode.next;
			}

			currentNode.next = nextDistinctNode;
			currentNode = nextDistinctNode;
		}

		return linkedList;
	}
}


```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;
using System.Linq;
using System;


public class ProgramTest {
	public Program.LinkedList addMany(Program.LinkedList ll, List<int> values) {
		Program.LinkedList current = ll;
		while (current.next != null) {
			current = current.next;
		}
		foreach (var value in values) {
			current.next = new Program.LinkedList(value);
			current = current.next;
		}
		return ll;
	}

	public List<int> getNodesInArray(Program.LinkedList ll) {
		List<int> nodes = new List<int>();
		Program.LinkedList current = ll;
		while (current != null) {
			nodes.Add(current.value);
			current = current.next;
		}
		return nodes;
	}

	[Test]
	public void TestCase1() {
		Program.LinkedList input = new Program.LinkedList(1);
		addMany(input, new List<int> {
			1, 3, 4, 4, 4, 5, 6, 6
		});
		List<int> expectedNodes = new List<int> {
			1, 3, 4, 5, 6
		};
		Program.LinkedList output = new Program().RemoveDuplicatesFromLinkedList(input);
		Utils.AssertTrue(Enumerable.SequenceEqual(getNodesInArray(output), expectedNodes));
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
	input := addMany(&LinkedList{Value: 1}, []int{1, 3, 4, 4, 4, 5, 6, 6})
	expected := addMany(&LinkedList{Value: 1}, []int{3, 4, 5, 6})
	actual := RemoveDuplicatesFromLinkedList(input)
	require.Equal(t, getValues(expected), getValues(actual))
}

func addMany(linkedList *LinkedList, values []int) *LinkedList {
	current := linkedList
	for current.Next != nil {
		current = current.Next
	}
	for _, value := range values {
		current.Next = &LinkedList{Value: value}
		current = current.Next
	}
	return linkedList
}

func getValues(linkedList *LinkedList) []int {
	values := []int{}
	current := linkedList
	for current != nil {
		values = append(values, current.Value)
		current = current.Next
	}
	return values
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// This is an input struct. Do not edit.
type LinkedList struct {
	Value int
	Next  *LinkedList
}

// O(n) time | O(1) space - where n is the number of nodes in the Linked List
func RemoveDuplicatesFromLinkedList(linkedList *LinkedList) *LinkedList {
	currentNode := linkedList
	for currentNode != nil {
		nextDistinctNode := currentNode.Next
		for nextDistinctNode != nil && nextDistinctNode.Value == currentNode.Value {
			nextDistinctNode = nextDistinctNode.Next
		}
		currentNode.Next = nextDistinctNode
		currentNode = nextDistinctNode
	}
	return linkedList
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := addMany(&LinkedList{Value: 1}, []int{1, 3, 4, 4, 4, 5, 6, 6})
	expected := addMany(&LinkedList{Value: 1}, []int{3, 4, 5, 6})
	actual := RemoveDuplicatesFromLinkedList(input)
	require.Equal(t, getValues(expected), getValues(actual))
}

func addMany(linkedList *LinkedList, values []int) *LinkedList {
	current := linkedList
	for current.Next != nil {
		current = current.Next
	}
	for _, value := range values {
		current.Next = &LinkedList{Value: value}
		current = current.Next
	}
	return linkedList
}

func getValues(linkedList *LinkedList) []int {
	values := []int{}
	current := linkedList
	for current != nil {
		values = append(values, current.Value)
		current = current.Next
	}
	return values
}

```
### Sandbox Code (java)
```java
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import java.util.*;

class ProgramTest {
  public Program.LinkedList addMany(Program.LinkedList ll, List<Integer> values) {
    Program.LinkedList current = ll;
    while (current.next != null) {
      current = current.next;
    }
    for (int value : values) {
      current.next = new Program.LinkedList(value);
      current = current.next;
    }
    return ll;
  }

  public List<Integer> getNodesInArray(Program.LinkedList ll) {
    List<Integer> nodes = new ArrayList<Integer>();
    Program.LinkedList current = ll;
    while (current != null) {
      nodes.add(current.value);
      current = current.next;
    }
    return nodes;
  }

  @Test
  public void TestCase1() {
    Program.LinkedList input = new Program.LinkedList(1);
    addMany(input, new ArrayList<Integer>(Arrays.asList(1, 3, 4, 4, 4, 5, 6, 6)));
    List<Integer> expectedNodes = new ArrayList<Integer>(Arrays.asList(1, 3, 4, 5, 6));
    Program.LinkedList output = new Program().removeDuplicatesFromLinkedList(input);
    Utils.assertTrue(getNodesInArray(output).equals(expectedNodes));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // This is an input class. Do not edit.
  public static class LinkedList {
    public int value;
    public LinkedList next;

    public LinkedList(int value) {
      this.value = value;
      this.next = null;
    }
  }

  // O(n) time | O(1) space - where n is the number of nodes in the Linked List
  public LinkedList removeDuplicatesFromLinkedList(LinkedList linkedList) {
    LinkedList currentNode = linkedList;
    while (currentNode != null) {
      LinkedList nextDistinctNode = currentNode.next;
      while (nextDistinctNode != null && nextDistinctNode.value == currentNode.value) {
        nextDistinctNode = nextDistinctNode.next;
      }

      currentNode.next = nextDistinctNode;
      currentNode = nextDistinctNode;
    }

    return linkedList;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  public Program.LinkedList addMany(Program.LinkedList ll, List<Integer> values) {
    Program.LinkedList current = ll;
    while (current.next != null) {
      current = current.next;
    }
    for (int value : values) {
      current.next = new Program.LinkedList(value);
      current = current.next;
    }
    return ll;
  }

  public List<Integer> getNodesInArray(Program.LinkedList ll) {
    List<Integer> nodes = new ArrayList<Integer>();
    Program.LinkedList current = ll;
    while (current != null) {
      nodes.add(current.value);
      current = current.next;
    }
    return nodes;
  }

  @Test
  public void TestCase1() {
    Program.LinkedList input = new Program.LinkedList(1);
    addMany(input, new ArrayList<Integer>(Arrays.asList(1, 3, 4, 4, 4, 5, 6, 6)));
    List<Integer> expectedNodes = new ArrayList<Integer>(Arrays.asList(1, 3, 4, 5, 6));
    Program.LinkedList output = new Program().removeDuplicatesFromLinkedList(input);
    Utils.assertTrue(getNodesInArray(output).equals(expectedNodes));
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
  const input = new LinkedList(1).addMany([1, 3, 4, 4, 4, 5, 6, 6]);
  const expected = new LinkedList(1).addMany([3, 4, 5, 6]);
  const actual = program.removeDuplicatesFromLinkedList(input);
  chai.expect(actual.getNodesInArray()).to.deep.equal(expected.getNodesInArray());
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
function removeDuplicatesFromLinkedList(linkedList) {
  let currentNode = linkedList;
  while (currentNode !== null) {
    let nextDistinctNode = currentNode.next;
    while (nextDistinctNode !== null && nextDistinctNode.value === currentNode.value) {
      nextDistinctNode = nextDistinctNode.next;
    }

    currentNode.next = nextDistinctNode;
    currentNode = nextDistinctNode;
  }

  return linkedList;
}

// Do not edit the lines below.
exports.LinkedList = LinkedList;
exports.removeDuplicatesFromLinkedList = removeDuplicatesFromLinkedList;

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
  const input = new LinkedList(1).addMany([1, 3, 4, 4, 4, 5, 6, 6]);
  const expected = new LinkedList(1).addMany([3, 4, 5, 6]);
  const actual = program.removeDuplicatesFromLinkedList(input);
  chai.expect(actual.getNodesInArray()).to.deep.equal(expected.getNodesInArray());
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.LinkedList
import com.algoexpert.program.removeDuplicatesFromLinkedList

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = addMany(LinkedList(1), listOf(1, 3, 4, 4, 4, 5, 6, 6))
        val expected = addMany(LinkedList(1), listOf(3, 4, 5, 6))
        val output = removeDuplicatesFromLinkedList(input)
        assert(getNodesInArray(expected) == getNodesInArray(output))
    }
}

fun addMany(linkedList: LinkedList, values: List<Int>): LinkedList {
    var current = linkedList
    while (current.next != null) {
        current = current.next!!
    }
    for (value in values) {
        current.next = LinkedList(value)
        current = current.next!!
    }
    return linkedList
}

fun getNodesInArray(linkedList: LinkedList?): List<Int> {
    val nodes = mutableListOf<Int>()
    var current: LinkedList? = linkedList
    while (current != null) {
        nodes.add(current.value)
        current = current.next
    }
    return nodes
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// This is an input class. Do not edit.
open class LinkedList(value: Int) {
    var value = value
    var next: LinkedList? = null
}

// O(n) time | O(1) space - where n is the number of nodes in the Linked List
fun removeDuplicatesFromLinkedList(linkedList: LinkedList): LinkedList {
    var currentNode: LinkedList? = linkedList
    while (currentNode != null) {
        var nextDistinctNode = currentNode.next
        while (nextDistinctNode != null && nextDistinctNode.value == currentNode.value) {
            nextDistinctNode = nextDistinctNode.next
        }

        currentNode.next = nextDistinctNode
        currentNode = nextDistinctNode
    }

    return linkedList
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.LinkedList
import com.algoexpert.program.removeDuplicatesFromLinkedList

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = addMany(LinkedList(1), listOf(1, 3, 4, 4, 4, 5, 6, 6))
        val expected = addMany(LinkedList(1), listOf(3, 4, 5, 6))
        val output = removeDuplicatesFromLinkedList(input)
        assert(getNodesInArray(expected) == getNodesInArray(output))
    }
}

fun addMany(linkedList: LinkedList, values: List<Int>): LinkedList {
    var current = linkedList
    while (current.next != null) {
        current = current.next!!
    }
    for (value in values) {
        current.next = LinkedList(value)
        current = current.next!!
    }
    return linkedList
}

fun getNodesInArray(linkedList: LinkedList?): List<Int> {
    val nodes = mutableListOf<Int>()
    var current: LinkedList? = linkedList
    while (current != null) {
        nodes.add(current.value)
        current = current.next
    }
    return nodes
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
      var input = addMany(Program.LinkedList(value: 1), [1, 3, 4, 4, 4, 5, 6, 6])
      var expected = addMany(Program.LinkedList(value: 1), [3, 4, 5, 6])
      var actual = Program().removeDuplicatesFromLinkedList(input)
      try assertEqual(getValues(expected), getValues(actual))
    }
  }

  func addMany(_ linkedList: Program.LinkedList, _ values: [Int]) -> Program.LinkedList {
    var current: Program.LinkedList = linkedList
    while current.next != nil {
      current = current.next!
    }
    for value in values {
      current.next = Program.LinkedList(value: value)
      current = current.next!
    }
    return linkedList
  }

  func getValues(_ linkedList: Program.LinkedList) -> [Int] {
    var values = [Int]()
    var current: Program.LinkedList? = linkedList
    while current != nil {
      values.append(current!.value)
      current = current!.next
    }
    return values
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // This is an input class. Do not edit.
  class LinkedList {
    var value: Int
    var next: LinkedList?

    init(value: Int) {
      self.value = value
    }
  }

  // O(n) time | O(1) space - where n is the number of nodes in the Linked List
  func removeDuplicatesFromLinkedList(_ linkedList: LinkedList) -> LinkedList {
    var currentNode: LinkedList? = linkedList
    while currentNode != nil {
      var nextDistinctNode = currentNode!.next
      while nextDistinctNode != nil, nextDistinctNode!.value == currentNode!.value {
        nextDistinctNode = nextDistinctNode!.next
      }
      currentNode!.next = nextDistinctNode
      currentNode = nextDistinctNode
    }
    return linkedList
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = addMany(Program.LinkedList(value: 1), [1, 3, 4, 4, 4, 5, 6, 6])
      var expected = addMany(Program.LinkedList(value: 1), [3, 4, 5, 6])
      var actual = Program().removeDuplicatesFromLinkedList(input)
      try assertEqual(getValues(expected), getValues(actual))
    }
  }

  func addMany(_ linkedList: Program.LinkedList, _ values: [Int]) -> Program.LinkedList {
    var current: Program.LinkedList = linkedList
    while current.next != nil {
      current = current.next!
    }
    for value in values {
      current.next = Program.LinkedList(value: value)
      current = current.next!
    }
    return linkedList
  }

  func getValues(_ linkedList: Program.LinkedList) -> [Int] {
    var values = [Int]()
    var current: Program.LinkedList? = linkedList
    while current != nil {
      values.append(current!.value)
      current = current!.next
    }
    return values
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
        test = LinkedList(1).addMany([1, 3, 4, 4, 4, 5, 6, 6])
        expected = LinkedList(1).addMany([3, 4, 5, 6])
        actual = program.removeDuplicatesFromLinkedList(test)
        self.assertEqual(actual.getNodesInArray(), expected.getNodesInArray())

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
def removeDuplicatesFromLinkedList(linkedList):
    currentNode = linkedList
    while currentNode is not None:
        nextDistinctNode = currentNode.next
        while nextDistinctNode is not None and nextDistinctNode.value == currentNode.value:
            nextDistinctNode = nextDistinctNode.next

        currentNode.next = nextDistinctNode
        currentNode = nextDistinctNode

    return linkedList

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
        test = LinkedList(1).addMany([1, 3, 4, 4, 4, 5, 6, 6])
        expected = LinkedList(1).addMany([3, 4, 5, 6])
        actual = program.removeDuplicatesFromLinkedList(test)
        self.assertEqual(actual.getNodesInArray(), expected.getNodesInArray())

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = addMany(new program.LinkedList(1), [1, 3, 4, 4, 4, 5, 6, 6]);
  const expected = addMany(new program.LinkedList(1), [3, 4, 5, 6]);
  const actual = program.removeDuplicatesFromLinkedList(input);
  chai.expect(getNodesInArray(actual)).to.deep.equal(getNodesInArray(expected));
});

function addMany(linkedList: program.LinkedList, values: number[]) {
  let current = linkedList;
  while (current.next !== null) {
    current = current.next;
  }
  for (const value of values) {
    current.next = new program.LinkedList(value);
    current = current.next;
  }
  return linkedList;
}

function getNodesInArray(linkedList: program.LinkedList) {
  const nodes: number[] = [];
  let current: program.LinkedList | null = linkedList;
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

// This is an input class. Do not edit.
export class LinkedList {
  value: number;
  next: LinkedList | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

// O(n) time | O(1) space - where n is the number of nodes in the Linked List
export function removeDuplicatesFromLinkedList(linkedList: LinkedList) {
  let currentNode: LinkedList | null = linkedList;
  while (currentNode !== null) {
    let nextDistinctNode: LinkedList | null = currentNode.next;
    while (nextDistinctNode !== null && nextDistinctNode.value === currentNode.value) {
      nextDistinctNode = nextDistinctNode.next;
    }

    currentNode.next = nextDistinctNode;
    currentNode = nextDistinctNode;
  }

  return linkedList;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = addMany(new program.LinkedList(1), [1, 3, 4, 4, 4, 5, 6, 6]);
  const expected = addMany(new program.LinkedList(1), [3, 4, 5, 6]);
  const actual = program.removeDuplicatesFromLinkedList(input);
  chai.expect(getNodesInArray(actual)).to.deep.equal(getNodesInArray(expected));
});

function addMany(linkedList: program.LinkedList, values: number[]) {
  let current = linkedList;
  while (current.next !== null) {
    current = current.next;
  }
  for (const value of values) {
    current.next = new program.LinkedList(value);
    current = current.next;
  }
  return linkedList;
}

function getNodesInArray(linkedList: program.LinkedList) {
  const nodes: number[] = [];
  let current: program.LinkedList | null = linkedList;
  while (current !== null) {
    nodes.push(current.value);
    current = current.next;
  }
  return nodes;
}

```

