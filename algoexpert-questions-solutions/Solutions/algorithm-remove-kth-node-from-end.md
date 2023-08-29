# Remove Kth Node From End
<div class="html">
<p>
  Write a function that takes in the head of a Singly Linked List and an integer
  <span>k</span> and removes the kth node from the end of the list.
</p>
<p>
  The removal should be done in place, meaning that the original data structure
  should be mutated (no new structure should be created).
</p>
<p>
  Furthermore, the input head of the linked list should remain the head of the
  linked list after the removal is done, even if the head is the node that's
  supposed to be removed. In other words, if the head is the node that's
  supposed to be removed, your function should simply mutate its
  <span>value</span> and <span>next</span> pointer.
</p>
<p>Note that your function doesn't need to return anything.</p>
<p>
  You can assume that the input Linked List will always have at least two nodes
  and, more specifically, at least k nodes.
</p>
<p>
  Each <span>LinkedList</span> node has an integer <span>value</span> as well as
  a <span>next</span> node pointing to the next node in the list or to
  <span>None</span> / <span>null</span> if it's the tail of the list.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">head</span> = 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 <span class="CodeEditor-promptComment">// the head node with value 0</span>
<span class="CodeEditor-promptParameter">k</span> = 4
</pre>
<h3>Sample Output</h3>
<pre>
<span class="CodeEditor-promptComment">// No output required.</span>
<span class="CodeEditor-promptComment">// The 4th node from the end of the list (the node with value 6) is removed.</span>
0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 7 -> 8 -> 9
</pre>
</div>

Hint 1
<p>
Since you are given a Singly Linked List, you do not have access to any of the list's nodes' previous nodes. Thus, traversing the entire list and then counting k nodes back isn't an option. Is there a way for you to traverse the entire list and to know which node is the kth node from the end by the time you reach the final node in the list?
</p>


Hint 2

<p>
Can you accomplish the task mentioned in Hint #1 by traversing the list all the while keeping track of two nodes at a time. How could this work?
</p>


Hint 3

<p>
Initialize two variables pointing to the first node in the list. Traverse k nodes in the list, updating the second variable at every node (that is, take k steps with the second variable). Then, traverse the remainder of the list, this time updating both the second and the first variables (that is take as many steps with the first variable as the number of steps between the kth node from the start and the end of the list). Once you reach the end of the list, the first variable should point to the kth node from the end.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

class TestLinkedList : public LinkedList {
public:
  TestLinkedList(int value);
  void addMany(vector<int> values);
  vector<int> getNodesInArray();
};

LinkedList::LinkedList(int value) {
  this->value = value;
  this->next = nullptr;
}

TestLinkedList::TestLinkedList(int value) : LinkedList(value) {
  this->value = value;
  this->next = nullptr;
}

void TestLinkedList::addMany(vector<int> values) {
  LinkedList *current = this;
  while (current->next != nullptr) {
    current = current->next;
  }
  for (int value : values) {
    current->next = new LinkedList(value);
    current = current->next;
  }
}

vector<int> TestLinkedList::getNodesInArray() {
  vector<int> nodes{};
  LinkedList *current = this;
  while (current != nullptr) {
    nodes.push_back(current->value);
    current = current->next;
  }
  return nodes;
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      TestLinkedList test(0);
      test.addMany({1, 2, 3, 4, 5, 6, 7, 8, 9});
      TestLinkedList expected(0);
      expected.addMany({1, 2, 3, 4, 5, 7, 8, 9});
      removeKthNodeFromEnd(&test, 4);
      assert(test.getNodesInArray() == expected.getNodesInArray());
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
void removeKthNodeFromEnd(LinkedList *head, int k) {
  int counter = 1;
  LinkedList *first = head;
  LinkedList *second = head;
  while (counter <= k) {
    second = second->next;
    counter++;
  }
  if (second == nullptr) {
    head->value = head->next->value;
    head->next = head->next->next;
    return;
  }
  while (second->next != nullptr) {
    second = second->next;
    first = first->next;
  }
  first->next = first->next->next;
}

```
### Unit Tests 1 (cpp)
```cpp
class TestLinkedList : public LinkedList {
public:
  TestLinkedList(int value);
  void addMany(vector<int> values);
  vector<int> getNodesInArray();
};

LinkedList::LinkedList(int value) {
  this->value = value;
  this->next = nullptr;
}

TestLinkedList::TestLinkedList(int value) : LinkedList(value) {
  this->value = value;
  this->next = nullptr;
}

void TestLinkedList::addMany(vector<int> values) {
  LinkedList *current = this;
  while (current->next != nullptr) {
    current = current->next;
  }
  for (int value : values) {
    current->next = new LinkedList(value);
    current = current->next;
  }
}

vector<int> TestLinkedList::getNodesInArray() {
  vector<int> nodes{};
  LinkedList *current = this;
  while (current != nullptr) {
    nodes.push_back(current->value);
    current = current->next;
  }
  return nodes;
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      TestLinkedList test(0);
      test.addMany({1, 2, 3, 4, 5, 6, 7, 8, 9});
      TestLinkedList expected(0);
      expected.addMany({1, 2, 3, 4, 5, 7, 8, 9});
      removeKthNodeFromEnd(&test, 4);
      assert(test.getNodesInArray() == expected.getNodesInArray());
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

public class ProgramTest {
	[Test]
	public void TestCase1() {
		TestLinkedList test = new TestLinkedList(0);
		test.addMany(new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9});
		int[] expected = {0, 1, 2, 3, 4, 5, 7, 8, 9};
		Program.RemoveKthNodeFromEnd(test, 4);
		Utils.AssertTrue(compare(test.getNodesInArray(), expected));
	}

	public bool compare(List<int> arr1, int[] arr2) {
		if (arr1.Count != arr2.Length) {
			return false;
		}
		for (int i = 0; i < arr1.Count; i++) {
			if (arr1[i] != arr2[i]) {
				return false;
			}
		}
		return true;
	}

	public class TestLinkedList : Program.LinkedList {

		public TestLinkedList(int value) : base(value) {
		}

		public void addMany(int[] values) {
			Program.LinkedList current = this;
			while (current.Next != null) {
				current = current.Next;
			}
			foreach (int value in values) {
				current.Next = new Program.LinkedList(value);
				current = current.Next;
			}
		}

		public List<int> getNodesInArray() {
			List<int> nodes = new List<int>();
			Program.LinkedList current = this;
			while (current != null) {
				nodes.Add(current.Value);
				current = current.Next;
			}
			return nodes;
		}
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.


public class Program {
	// O(n) time | O(1) space
	public static void RemoveKthNodeFromEnd(LinkedList head, int k) {
		int counter = 1;
		LinkedList first = head;
		LinkedList second = head;
		while (counter <= k) {
			second = second.Next;
			counter++;
		}
		if (second == null) {
			head.Value = head.Next.Value;
			head.Next = head.Next.Next;
			return;
		}
		while (second.Next != null) {
			second = second.Next;
			first = first.Next;
		}
		first.Next = first.Next.Next;
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
		TestLinkedList test = new TestLinkedList(0);
		test.addMany(new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9});
		int[] expected = {0, 1, 2, 3, 4, 5, 7, 8, 9};
		Program.RemoveKthNodeFromEnd(test, 4);
		Utils.AssertTrue(compare(test.getNodesInArray(), expected));
	}

	public bool compare(List<int> arr1, int[] arr2) {
		if (arr1.Count != arr2.Length) {
			return false;
		}
		for (int i = 0; i < arr1.Count; i++) {
			if (arr1[i] != arr2[i]) {
				return false;
			}
		}
		return true;
	}

	public class TestLinkedList : Program.LinkedList {

		public TestLinkedList(int value) : base(value) {
		}

		public void addMany(int[] values) {
			Program.LinkedList current = this;
			while (current.Next != null) {
				current = current.Next;
			}
			foreach (int value in values) {
				current.Next = new Program.LinkedList(value);
				current = current.Next;
			}
		}

		public List<int> getNodesInArray() {
			List<int> nodes = new List<int>();
			Program.LinkedList current = this;
			while (current != null) {
				nodes.Add(current.Value);
				current = current.Next;
			}
			return nodes;
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
	for _, value := range values {
		current.Next = &LinkedList{value, nil}
		current = current.Next
	}
}

func (ll *LinkedList) ToArray() []int {
	output, current := []int{ll.Value}, ll
	for current.Next != nil {
		current = current.Next
		output = append(output, current.Value)
	}
	return output
}

func (s *TestSuite) TestCase1(t *TestCase) {
	ll := NewLinkedList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
	RemoveKthNodeFromEnd(ll, 4)
	output, expected := ll.ToArray(), []int{0, 1, 2, 3, 4, 5, 7, 8, 9}
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
func RemoveKthNodeFromEnd(head *LinkedList, k int) {
	counter, first, second := 1, head, head
	for counter <= k {
		second = second.Next
		counter += 1
	}
	if second == nil {
		head.Value = head.Next.Value
		head.Next = head.Next.Next
		return
	}
	for second.Next != nil {
		second = second.Next
		first = first.Next
	}
	first.Next = first.Next.Next
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
	for _, value := range values {
		current.Next = &LinkedList{value, nil}
		current = current.Next
	}
}

func (ll *LinkedList) ToArray() []int {
	output, current := []int{ll.Value}, ll
	for current.Next != nil {
		current = current.Next
		output = append(output, current.Value)
	}
	return output
}

func (s *TestSuite) TestCase1(t *TestCase) {
	ll := NewLinkedList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
	RemoveKthNodeFromEnd(ll, 4)
	output, expected := ll.ToArray(), []int{0, 1, 2, 3, 4, 5, 7, 8, 9}
	require.Equal(t, expected, output)
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
    TestLinkedList test = new TestLinkedList(0);
    test.addMany(new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9});
    int[] expected = {0, 1, 2, 3, 4, 5, 7, 8, 9};
    Program.removeKthNodeFromEnd(test, 4);
    Utils.assertTrue(compare(test.getNodesInArray(), expected));
  }

  public boolean compare(List<Integer> arr1, int[] arr2) {
    if (arr1.size() != arr2.length) {
      return false;
    }
    for (int i = 0; i < arr1.size(); i++) {
      if (arr1.get(i) != arr2[i]) {
        return false;
      }
    }
    return true;
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

    public List<Integer> getNodesInArray() {
      List<Integer> nodes = new ArrayList<Integer>();
      Program.LinkedList current = this;
      while (current != null) {
        nodes.add(current.value);
        current = current.next;
      }
      return nodes;
    }
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space
  public static void removeKthNodeFromEnd(LinkedList head, int k) {
    int counter = 1;
    LinkedList first = head;
    LinkedList second = head;
    while (counter <= k) {
      second = second.next;
      counter++;
    }
    if (second == null) {
      head.value = head.next.value;
      head.next = head.next.next;
      return;
    }
    while (second.next != null) {
      second = second.next;
      first = first.next;
    }
    first.next = first.next.next;
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
    TestLinkedList test = new TestLinkedList(0);
    test.addMany(new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9});
    int[] expected = {0, 1, 2, 3, 4, 5, 7, 8, 9};
    Program.removeKthNodeFromEnd(test, 4);
    Utils.assertTrue(compare(test.getNodesInArray(), expected));
  }

  public boolean compare(List<Integer> arr1, int[] arr2) {
    if (arr1.size() != arr2.length) {
      return false;
    }
    for (int i = 0; i < arr1.size(); i++) {
      if (arr1.get(i) != arr2[i]) {
        return false;
      }
    }
    return true;
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

    public List<Integer> getNodesInArray() {
      List<Integer> nodes = new ArrayList<Integer>();
      Program.LinkedList current = this;
      while (current != null) {
        nodes.add(current.value);
        current = current.next;
      }
      return nodes;
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
  const test = new LinkedList(0).addMany([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const expected = new LinkedList(0).addMany([1, 2, 3, 4, 5, 7, 8, 9]);
  program.removeKthNodeFromEnd(test, 4);
  chai.expect(test.getNodesInArray()).to.deep.equal(expected.getNodesInArray());
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
function removeKthNodeFromEnd(head, k) {
  let counter = 1;
  let first = head;
  let second = head;
  while (counter <= k) {
    second = second.next;
    counter++;
  }
  if (second === null) {
    head.value = head.next.value;
    head.next = head.next.next;
    return;
  }
  while (second.next !== null) {
    second = second.next;
    first = first.next;
  }
  first.next = first.next.next;
}

exports.LinkedList = LinkedList;
exports.removeKthNodeFromEnd = removeKthNodeFromEnd;

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
  const test = new LinkedList(0).addMany([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const expected = new LinkedList(0).addMany([1, 2, 3, 4, 5, 7, 8, 9]);
  program.removeKthNodeFromEnd(test, 4);
  chai.expect(test.getNodesInArray()).to.deep.equal(expected.getNodesInArray());
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.LinkedList as LinkedList
import com.algoexpert.program.removeKthNodeFromEnd as removeKthNodeFromEnd

class ProgramTest {
    @Test
    fun TestCase1() {
        var linkedList = LinkedList(0)
        addAll(linkedList, listOf(1, 2, 3, 4, 5, 6, 7, 8, 9))

        removeKthNodeFromEnd(linkedList, 4)
        var result = getNodeValuesInArray(linkedList)
        var expected = listOf(0, 1, 2, 3, 4, 5, 7, 8, 9)

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
fun removeKthNodeFromEnd(head: LinkedList, k: Int) {
    var counter = 1
    var first = head
    var second: LinkedList? = head
    while (counter <= k) {
        second = second!!.next
        counter++
    }
    if (second == null) {
        head.value = head.next!!.value
        head.next = head.next!!.next
        return
    }
    while (second!!.next != null) {
        second = second.next
        first = first.next!!
    }
    first.next = first.next!!.next
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.LinkedList as LinkedList
import com.algoexpert.program.removeKthNodeFromEnd as removeKthNodeFromEnd

class ProgramTest {
    @Test
    fun TestCase1() {
        var linkedList = LinkedList(0)
        addAll(linkedList, listOf(1, 2, 3, 4, 5, 6, 7, 8, 9))

        removeKthNodeFromEnd(linkedList, 4)
        var result = getNodeValuesInArray(linkedList)
        var expected = listOf(0, 1, 2, 3, 4, 5, 7, 8, 9)

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
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      var test = TestLinkedList(value: 0).addMany(values: [1, 2, 3, 4, 5, 6, 7, 8, 9])
      var expected = TestLinkedList(value: 0).addMany(values: [1, 2, 3, 4, 5, 7, 8, 9])
      program.removeKthNodeFromEnd(head: test as Program.LinkedList, k: 4)
      try assertEqual(expected.getNodesInArray(), test.getNodesInArray())
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

  func getNodesInArray() -> [Int] {
    var nodes = [Int]()

    var current: Program.LinkedList? = self as Program.LinkedList?

    while current != nil {
      nodes.append(current!.value!)
      current = current!.next
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
    var value: Int?
    var next: LinkedList?

    init(value: Int) {
      self.value = value
      next = nil
    }
  }

  // O(n) time | O(1) space
  func removeKthNodeFromEnd(head: LinkedList, k: Int) {
    var counter = 1

    var firstPointer: LinkedList? = head
    var secondPointer: LinkedList? = head

    while counter <= k {
      secondPointer = secondPointer?.next
      counter += 1
    }

    if secondPointer == nil {
      head.value = head.next?.value
      head.next = head.next?.next

      return
    }

    while secondPointer?.next != nil {
      firstPointer = firstPointer?.next
      secondPointer = secondPointer?.next
    }

    firstPointer?.next = firstPointer?.next?.next
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      var test = TestLinkedList(value: 0).addMany(values: [1, 2, 3, 4, 5, 6, 7, 8, 9])
      var expected = TestLinkedList(value: 0).addMany(values: [1, 2, 3, 4, 5, 7, 8, 9])
      program.removeKthNodeFromEnd(head: test as Program.LinkedList, k: 4)
      try assertEqual(expected.getNodesInArray(), test.getNodesInArray())
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

  func getNodesInArray() -> [Int] {
    var nodes = [Int]()

    var current: Program.LinkedList? = self as Program.LinkedList?

    while current != nil {
      nodes.append(current!.value!)
      current = current!.next
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

    def getNodesInArray(self):
        nodes = []
        current = self
        while current is not None:
            nodes.append(current.value)
            current = current.next
        return nodes


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        test = LinkedList(0).addMany([1, 2, 3, 4, 5, 6, 7, 8, 9])
        expected = LinkedList(0).addMany([1, 2, 3, 4, 5, 7, 8, 9])
        program.removeKthNodeFromEnd(test, 4)
        self.assertEqual(test.getNodesInArray(), expected.getNodesInArray())

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None


# O(n) time | O(1) space
def removeKthNodeFromEnd(head, k):
    counter = 1
    first = head
    second = head
    while counter <= k:
        second = second.next
        counter += 1
    if second is None:
        head.value = head.next.value
        head.next = head.next.next
        return
    while second.next is not None:
        second = second.next
        first = first.next
    first.next = first.next.next

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

    def getNodesInArray(self):
        nodes = []
        current = self
        while current is not None:
            nodes.append(current.value)
            current = current.next
        return nodes


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        test = LinkedList(0).addMany([1, 2, 3, 4, 5, 6, 7, 8, 9])
        expected = LinkedList(0).addMany([1, 2, 3, 4, 5, 7, 8, 9])
        program.removeKthNodeFromEnd(test, 4)
        self.assertEqual(test.getNodesInArray(), expected.getNodesInArray())

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

class LinkedList {
  value: number;
  next: LinkedList | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }

  addMany(values: number[]): LinkedList {
    let current: LinkedList = this;
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
    const nodes: number[] = [];
    let current: LinkedList | null = this;
    while (current !== null) {
      nodes.push(current.value);
      current = current.next;
    }
    return nodes;
  }
}

it('Test Case #1', function () {
  const test = new LinkedList(0).addMany([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const expected = new LinkedList(0).addMany([1, 2, 3, 4, 5, 7, 8, 9]);
  program.removeKthNodeFromEnd(test, 4);
  chai.expect(test.getNodesInArray()).to.deep.equal(expected.getNodesInArray());
});

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
export function removeKthNodeFromEnd(head: LinkedList, k: number) {
  let counter = 1;
  let first: LinkedList = head;
  let second: LinkedList | null = head;
  while (counter <= k) {
    second = second!.next;
    counter++;
  }
  if (second === null) {
    head.value = head.next!.value;
    head.next = head.next!.next;
    return;
  }
  while (second.next !== null) {
    second = second.next;
    first = first.next!;
  }
  first.next = first.next!.next;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

class LinkedList {
  value: number;
  next: LinkedList | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }

  addMany(values: number[]): LinkedList {
    let current: LinkedList = this;
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
    const nodes: number[] = [];
    let current: LinkedList | null = this;
    while (current !== null) {
      nodes.push(current.value);
      current = current.next;
    }
    return nodes;
  }
}

it('Test Case #1', function () {
  const test = new LinkedList(0).addMany([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const expected = new LinkedList(0).addMany([1, 2, 3, 4, 5, 7, 8, 9]);
  program.removeKthNodeFromEnd(test, 4);
  chai.expect(test.getNodesInArray()).to.deep.equal(expected.getNodesInArray());
});

```

