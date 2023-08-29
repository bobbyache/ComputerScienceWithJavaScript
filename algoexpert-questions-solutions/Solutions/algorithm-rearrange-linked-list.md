# Rearrange Linked List
<div class="html">
<p>
  Write a function that takes in the head of a Singly Linked List and an integer
  <span>k</span>, rearranges the list in place (i.e., doesn't create a brand new
  list) around nodes with value <span>k</span>, and returns its new head.
</p>
<p>
  Rearranging a Linked List around nodes with value <span>k</span> means moving
  all nodes with a value smaller than <span>k</span> before all nodes with value
  <span>k</span> and moving all nodes with a value greater than
  <span>k</span> after all nodes with value <span>k</span>.
</p>
<p>
  All moved nodes should maintain their original relative ordering if possible.
</p>
<p>
  Note that the linked list should be rearranged even if it doesn't have any
  nodes with value <span>k</span>.
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
<span class="CodeEditor-promptParameter">head</span> = 3 -> 0 -> 5 -> 2 -> 1 -> 4 <span class="CodeEditor-promptComment">// the head node with value 3</span>
<span class="CodeEditor-promptParameter">k</span> = 3
</pre>
<h3>Sample Output</h3>
<pre>
0 -> 2 -> 1 -> 3 -> 5 -> 4 <span class="CodeEditor-promptComment">// the new head node with value 0</span>
<span class="CodeEditor-promptComment">// Note that the nodes with values 0, 2, and 1 have</span>
<span class="CodeEditor-promptComment">// maintained their original relative ordering, and</span>
<span class="CodeEditor-promptComment">// so have the nodes with values 5 and 4.</span>
</pre>
</div>

Hint 1
<p>
The final linked list that you have to return essentially consists of three linked lists attached to one another: one with nodes whose values are smaller than k, one with nodes whose values are equal to k, and one with nodes whose values are greater than k.
</p>


Hint 2

<p>
Iterate through the linked list once, build the three linked lists mentioned in Hint #1 as you go, and finally connect these three linked lists to form the rearranged list.
</p>


Hint 3

<p>
To build the three linked lists mentioned in Hints #1 and #2, you'll have to keep track of their heads and tails and update the appropriate linked list's tail with each node that you traverse as you iterate through the main linked list. You can determine which linked list is the relevant one by simply comparing the value of the node that you're traversing to k.
</p>


Hint 4

<p>
Connecting the three linked lists mentioned in the previous Hint won't be as simple as it sounds, mainly because one or two of the linked lists might actually be empty, depending on the various nodes' values and the value of k.
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
      auto head = new LinkedList(3);
      head->next = new LinkedList(0);
      head->next->next = new LinkedList(5);
      head->next->next->next = new LinkedList(2);
      head->next->next->next->next = new LinkedList(1);
      head->next->next->next->next->next = new LinkedList(4);
      auto result = rearrangeLinkedList(head, 3);
      auto array = linkedListToArray(result);

      vector<int> expected{0, 2, 1, 3, 5, 4};
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

struct LinkedListPair {
  LinkedList *head;
  LinkedList *tail;
};

LinkedListPair growLinkedList(LinkedList *head, LinkedList *tail,
                              LinkedList *node);
LinkedListPair connectLinkedLists(LinkedList *headOne, LinkedList *tailOne,
                                  LinkedList *headTwo, LinkedList *tailTwo);

// O(n) time | O(1) space - where n is the number of nodes in the Linked List
LinkedList *rearrangeLinkedList(LinkedList *head, int k) {
  LinkedList *smallerListHead = nullptr;
  LinkedList *smallerListTail = nullptr;
  LinkedList *equalListHead = nullptr;
  LinkedList *equalListTail = nullptr;
  LinkedList *greaterListHead = nullptr;
  LinkedList *greaterListTail = nullptr;

  LinkedList *node = head;
  while (node != nullptr) {
    if (node->value < k) {
      LinkedListPair smallerList =
          growLinkedList(smallerListHead, smallerListTail, node);
      smallerListHead = smallerList.head;
      smallerListTail = smallerList.tail;
    } else if (node->value > k) {
      LinkedListPair greaterList =
          growLinkedList(greaterListHead, greaterListTail, node);
      greaterListHead = greaterList.head;
      greaterListTail = greaterList.tail;
    } else {
      LinkedListPair equalList =
          growLinkedList(equalListHead, equalListTail, node);
      equalListHead = equalList.head;
      equalListTail = equalList.tail;
    }

    LinkedList *prevNode = node;
    node = node->next;
    prevNode->next = nullptr;
  }

  LinkedListPair first = connectLinkedLists(smallerListHead, smallerListTail,
                                            equalListHead, equalListTail);
  LinkedListPair final = connectLinkedLists(first.head, first.tail,
                                            greaterListHead, greaterListTail);
  return final.head;
}

LinkedListPair growLinkedList(LinkedList *head, LinkedList *tail,
                              LinkedList *node) {
  LinkedList *newHead = head;
  LinkedList *newTail = node;

  if (newHead == nullptr)
    newHead = node;
  if (tail != nullptr)
    tail->next = node;

  return LinkedListPair{newHead, newTail};
}

LinkedListPair connectLinkedLists(LinkedList *headOne, LinkedList *tailOne,
                                  LinkedList *headTwo, LinkedList *tailTwo) {
  LinkedList *newHead = headOne == nullptr ? headTwo : headOne;
  LinkedList *newTail = tailTwo == nullptr ? tailOne : tailTwo;

  if (tailOne != nullptr)
    tailOne->next = headTwo;

  return LinkedListPair{newHead, newTail};
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
      auto head = new LinkedList(3);
      head->next = new LinkedList(0);
      head->next->next = new LinkedList(5);
      head->next->next->next = new LinkedList(2);
      head->next->next->next->next = new LinkedList(1);
      head->next->next->next->next->next = new LinkedList(4);
      auto result = rearrangeLinkedList(head, 3);
      auto array = linkedListToArray(result);

      vector<int> expected{0, 2, 1, 3, 5, 4};
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
		var head = new Program.LinkedList(3);
		head.next = new Program.LinkedList(0);
		head.next.next = new Program.LinkedList(5);
		head.next.next.next = new Program.LinkedList(2);
		head.next.next.next.next = new Program.LinkedList(1);
		head.next.next.next.next.next = new Program.LinkedList(4);
		var result = Program.RearrangeLinkedList(head, 3);
		var array = this.linkedListToArray(result);

		var expected = new List<int> {
			0, 2, 1, 3, 5, 4
		};
		Utils.AssertTrue(Enumerable.SequenceEqual(expected, array));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(n) time | O(1) space - where n is the number of nodes in the Linked List
	public static LinkedList RearrangeLinkedList(LinkedList head, int k) {
		LinkedList smallerListHead = null;
		LinkedList smallerListTail = null;
		LinkedList equalListHead = null;
		LinkedList equalListTail = null;
		LinkedList greaterListHead = null;
		LinkedList greaterListTail = null;

		LinkedList node = head;
		while (node != null) {
			if (node.value < k) {
				LinkedListPair smallerList =
				  growLinkedList(smallerListHead, smallerListTail, node);
				smallerListHead = smallerList.head;
				smallerListTail = smallerList.tail;
			} else if (node.value > k) {
				LinkedListPair greaterList =
				  growLinkedList(greaterListHead, greaterListTail, node);
				greaterListHead = greaterList.head;
				greaterListTail = greaterList.tail;
			} else {
				LinkedListPair equalList =
				  growLinkedList(equalListHead, equalListTail, node);
				equalListHead = equalList.head;
				equalListTail = equalList.tail;
			}

			LinkedList prevNode = node;
			node = node.next;
			prevNode.next = null;
		}

		LinkedListPair firstPair = connectLinkedLists(smallerListHead, smallerListTail,
		    equalListHead, equalListTail);
		LinkedListPair finalPair = connectLinkedLists(firstPair.head, firstPair.tail,
		    greaterListHead, greaterListTail);
		return finalPair.head;
	}

	public static LinkedListPair growLinkedList(LinkedList head, LinkedList tail,
	  LinkedList node) {
		LinkedList newHead = head;
		LinkedList newTail = node;

		if (newHead == null) newHead = node;
		if (tail != null) tail.next = node;

		return new LinkedListPair(newHead, newTail);
	}

	public static LinkedListPair connectLinkedLists(LinkedList headOne, LinkedList tailOne,
	  LinkedList headTwo, LinkedList tailTwo) {
		LinkedList newHead = headOne == null ? headTwo : headOne;
		LinkedList newTail = tailTwo == null ? tailOne : tailTwo;

		if (tailOne != null) tailOne.next = headTwo;

		return new LinkedListPair(newHead, newTail);
	}

	public class LinkedListPair {
		public LinkedList head;
		public LinkedList tail;

		public LinkedListPair(LinkedList head, LinkedList tail) {
			this.head = head;
			this.tail = tail;
		}
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
		var head = new Program.LinkedList(3);
		head.next = new Program.LinkedList(0);
		head.next.next = new Program.LinkedList(5);
		head.next.next.next = new Program.LinkedList(2);
		head.next.next.next.next = new Program.LinkedList(1);
		head.next.next.next.next.next = new Program.LinkedList(4);
		var result = Program.RearrangeLinkedList(head, 3);
		var array = this.linkedListToArray(result);

		var expected = new List<int> {
			0, 2, 1, 3, 5, 4
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
	head := newLinkedList(3)
	head.Next = newLinkedList(0)
	head.Next.Next = newLinkedList(5)
	head.Next.Next.Next = newLinkedList(2)
	head.Next.Next.Next.Next = newLinkedList(1)
	head.Next.Next.Next.Next.Next = newLinkedList(4)
	result := RearrangeLinkedList(head, 3)
	array := linkedListToArray(result)

	expected := []int{0, 2, 1, 3, 5, 4}
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
func RearrangeLinkedList(head *LinkedList, k int) *LinkedList {
	var smallerListHead, smallerListTail *LinkedList
	var equalListHead, equalListTail *LinkedList
	var greaterListHead, greaterListTail *LinkedList

	node := head
	for node != nil {
		if node.Value < k {
			smallerListHead, smallerListTail = growLinkedList(smallerListHead, smallerListTail, node)
		} else if node.Value > k {
			greaterListHead, greaterListTail = growLinkedList(greaterListHead, greaterListTail, node)
		} else {
			equalListHead, equalListTail = growLinkedList(equalListHead, equalListTail, node)
		}

		prevNode := node
		node = node.Next
		prevNode.Next = nil
	}

	firstHead, firstTail := connectLinkedLists(smallerListHead, smallerListTail, equalListHead, equalListTail)
	finalHead, _ := connectLinkedLists(firstHead, firstTail, greaterListHead, greaterListTail)
	return finalHead
}

func growLinkedList(head, tail, node *LinkedList) (*LinkedList, *LinkedList) {
	newHead, newTail := head, node
	if newHead == nil {
		newHead = node
	}
	if tail != nil {
		tail.Next = node
	}
	return newHead, newTail
}

func connectLinkedLists(headOne, tailOne, headTwo, tailTwo *LinkedList) (*LinkedList, *LinkedList) {
	newHead, newTail := headOne, tailTwo
	if newHead == nil {
		newHead = headTwo
	}
	if newTail == nil {
		newTail = tailOne
	}

	if tailOne != nil {
		tailOne.Next = headTwo
	}

	return newHead, newTail
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
	head := newLinkedList(3)
	head.Next = newLinkedList(0)
	head.Next.Next = newLinkedList(5)
	head.Next.Next.Next = newLinkedList(2)
	head.Next.Next.Next.Next = newLinkedList(1)
	head.Next.Next.Next.Next.Next = newLinkedList(4)
	result := RearrangeLinkedList(head, 3)
	array := linkedListToArray(result)

	expected := []int{0, 2, 1, 3, 5, 4}
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
    var head = new Program.LinkedList(3);
    head.next = new Program.LinkedList(0);
    head.next.next = new Program.LinkedList(5);
    head.next.next.next = new Program.LinkedList(2);
    head.next.next.next.next = new Program.LinkedList(1);
    head.next.next.next.next.next = new Program.LinkedList(4);
    var result = Program.rearrangeLinkedList(head, 3);
    var array = this.linkedListToArray(result);

    var expected = Arrays.asList(new Integer[] {0, 2, 1, 3, 5, 4});
    Utils.assertTrue(expected.equals(array));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the number of nodes in the Linked List
  public static LinkedList rearrangeLinkedList(LinkedList head, int k) {
    LinkedList smallerListHead = null;
    LinkedList smallerListTail = null;
    LinkedList equalListHead = null;
    LinkedList equalListTail = null;
    LinkedList greaterListHead = null;
    LinkedList greaterListTail = null;

    LinkedList node = head;
    while (node != null) {
      if (node.value < k) {
        LinkedListPair smallerList = growLinkedList(smallerListHead, smallerListTail, node);
        smallerListHead = smallerList.head;
        smallerListTail = smallerList.tail;
      } else if (node.value > k) {
        LinkedListPair greaterList = growLinkedList(greaterListHead, greaterListTail, node);
        greaterListHead = greaterList.head;
        greaterListTail = greaterList.tail;
      } else {
        LinkedListPair equalList = growLinkedList(equalListHead, equalListTail, node);
        equalListHead = equalList.head;
        equalListTail = equalList.tail;
      }

      LinkedList prevNode = node;
      node = node.next;
      prevNode.next = null;
    }

    LinkedListPair firstPair =
        connectLinkedLists(smallerListHead, smallerListTail, equalListHead, equalListTail);
    LinkedListPair finalPair =
        connectLinkedLists(firstPair.head, firstPair.tail, greaterListHead, greaterListTail);
    return finalPair.head;
  }

  public static LinkedListPair growLinkedList(LinkedList head, LinkedList tail, LinkedList node) {
    LinkedList newHead = head;
    LinkedList newTail = node;

    if (newHead == null) newHead = node;
    if (tail != null) tail.next = node;

    return new LinkedListPair(newHead, newTail);
  }

  public static LinkedListPair connectLinkedLists(
      LinkedList headOne, LinkedList tailOne, LinkedList headTwo, LinkedList tailTwo) {
    LinkedList newHead = headOne == null ? headTwo : headOne;
    LinkedList newTail = tailTwo == null ? tailOne : tailTwo;

    if (tailOne != null) tailOne.next = headTwo;

    return new LinkedListPair(newHead, newTail);
  }

  static class LinkedListPair {
    public LinkedList head;
    public LinkedList tail;

    public LinkedListPair(LinkedList head, LinkedList tail) {
      this.head = head;
      this.tail = tail;
    }
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
    var head = new Program.LinkedList(3);
    head.next = new Program.LinkedList(0);
    head.next.next = new Program.LinkedList(5);
    head.next.next.next = new Program.LinkedList(2);
    head.next.next.next.next = new Program.LinkedList(1);
    head.next.next.next.next.next = new Program.LinkedList(4);
    var result = Program.rearrangeLinkedList(head, 3);
    var array = this.linkedListToArray(result);

    var expected = Arrays.asList(new Integer[] {0, 2, 1, 3, 5, 4});
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
  const head = new LinkedList(3);
  head.next = new LinkedList(0);
  head.next.next = new LinkedList(5);
  head.next.next.next = new LinkedList(2);
  head.next.next.next.next = new LinkedList(1);
  head.next.next.next.next.next = new LinkedList(4);
  const result = program.rearrangeLinkedList(head, 3);
  const array = linkedListToArray(result);

  var expected = [0, 2, 1, 3, 5, 4];
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
function rearrangeLinkedList(head, k) {
  let smallerListHead = null;
  let smallerListTail = null;
  let equalListHead = null;
  let equalListTail = null;
  let greaterListHead = null;
  let greaterListTail = null;

  let node = head;
  while (node !== null) {
    if (node.value < k) {
      [smallerListHead, smallerListTail] = growLinkedList(smallerListHead, smallerListTail, node);
    } else if (node.value > k) {
      [greaterListHead, greaterListTail] = growLinkedList(greaterListHead, greaterListTail, node);
    } else {
      [equalListHead, equalListTail] = growLinkedList(equalListHead, equalListTail, node);
    }

    const prevNode = node;
    node = node.next;
    prevNode.next = null;
  }

  const [firstHead, firstTail] = connectLinkedLists(smallerListHead, smallerListTail, equalListHead, equalListTail);
  const [finalHead, _] = connectLinkedLists(firstHead, firstTail, greaterListHead, greaterListTail);
  return finalHead;
}

function growLinkedList(head, tail, node) {
  let newHead = head;
  let newTail = node;

  if (newHead === null) newHead = node;
  if (tail !== null) tail.next = node;

  return [newHead, newTail];
}

function connectLinkedLists(headOne, tailOne, headTwo, tailTwo) {
  const newHead = headOne === null ? headTwo : headOne;
  const newTail = tailTwo === null ? tailOne : tailTwo;

  if (tailOne !== null) tailOne.next = headTwo;

  return [newHead, newTail];
}

exports.LinkedList = LinkedList;
exports.rearrangeLinkedList = rearrangeLinkedList;

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
  const head = new LinkedList(3);
  head.next = new LinkedList(0);
  head.next.next = new LinkedList(5);
  head.next.next.next = new LinkedList(2);
  head.next.next.next.next = new LinkedList(1);
  head.next.next.next.next.next = new LinkedList(4);
  const result = program.rearrangeLinkedList(head, 3);
  const array = linkedListToArray(result);

  var expected = [0, 2, 1, 3, 5, 4];
  chai.expect(array).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.LinkedList as LinkedList
import com.algoexpert.program.rearrangeLinkedList as rearrangeLinkedList

class ProgramTest {
    @Test
    fun TestCase1() {
        var linkedList = LinkedList(3)
        addAll(linkedList, listOf(0, 5, 2, 1, 4))

        var result = getNodeValuesInArray(rearrangeLinkedList(linkedList, 3))
        var expected = listOf(0, 2, 1, 3, 5, 4)

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

open class LinkedListPair(head: LinkedList?, tail: LinkedList?) {
    var head = head
    var tail = tail
}

// O(n) time | O(1) space - where n is the number of nodes in the Linked List
fun rearrangeLinkedList(head: LinkedList, k: Int): LinkedList {
    var smallerListHead: LinkedList? = null
    var smallerListTail: LinkedList? = null
    var equalListHead: LinkedList? = null
    var equalListTail: LinkedList? = null
    var greaterListHead: LinkedList? = null
    var greaterListTail: LinkedList? = null

    var node: LinkedList? = head
    while (node != null) {
        if (node.value < k) {
            val smallerList = growLinkedList(smallerListHead, smallerListTail, node)
            smallerListHead = smallerList.head
            smallerListTail = smallerList.tail
        } else if (node.value > k) {
            val greaterList = growLinkedList(greaterListHead, greaterListTail, node)
            greaterListHead = greaterList.head
            greaterListTail = greaterList.tail
        } else {
            val equalList = growLinkedList(equalListHead, equalListTail, node)
            equalListHead = equalList.head
            equalListTail = equalList.tail
        }

        val prevNode = node
        node = node.next
        prevNode.next = null
    }

    val firstPair = connectLinkedLists(smallerListHead, smallerListTail, equalListHead, equalListTail)
    val finalPair = connectLinkedLists(firstPair.head, firstPair.tail, greaterListHead, greaterListTail)
    return finalPair.head!!
}

fun growLinkedList(head: LinkedList?, tail: LinkedList?, node: LinkedList): LinkedListPair {
    var newHead = head
    val newTail = node

    if (newHead == null) newHead = node
    if (tail != null) tail.next = node

    return LinkedListPair(newHead, newTail)
}

fun connectLinkedLists(headOne: LinkedList?, tailOne: LinkedList?, headTwo: LinkedList?, tailTwo: LinkedList?): LinkedListPair {
    val newHead = if (headOne == null) headTwo else headOne
    val newTail = if (tailTwo == null) tailOne else tailTwo

    if (tailOne != null) tailOne.next = headTwo

    return LinkedListPair(newHead, newTail)
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.LinkedList as LinkedList
import com.algoexpert.program.rearrangeLinkedList as rearrangeLinkedList

class ProgramTest {
    @Test
    fun TestCase1() {
        var linkedList = LinkedList(3)
        addAll(linkedList, listOf(0, 5, 2, 1, 4))

        var result = getNodeValuesInArray(rearrangeLinkedList(linkedList, 3))
        var expected = listOf(0, 2, 1, 3, 5, 4)

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
      let head = Program.LinkedList(value: 3)
      head.next = Program.LinkedList(value: 0)
      head.next!.next = Program.LinkedList(value: 5)
      head.next!.next!.next = Program.LinkedList(value: 2)
      head.next!.next!.next!.next = Program.LinkedList(value: 1)
      head.next!.next!.next!.next!.next = Program.LinkedList(value: 4)
      let result = Program.rearrangeLinkedList(head, 3)
      let array = linkedListToArray(result)

      let expected = [0, 2, 1, 3, 5, 4]
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
  static func rearrangeLinkedList(_ head: LinkedList, _ k: Int) -> LinkedList? {
    var smallerListHead: LinkedList?
    var smallerListTail: LinkedList?
    var equalListHead: LinkedList?
    var equalListTail: LinkedList?
    var greaterListHead: LinkedList?
    var greaterListTail: LinkedList?

    var node: LinkedList? = head
    while let n = node {
      if n.value < k {
        (smallerListHead, smallerListTail) = growLinkedList(smallerListHead, smallerListTail, node)
      } else if n.value > k {
        (greaterListHead, greaterListTail) = growLinkedList(greaterListHead, greaterListTail, node)
      } else {
        (equalListHead, equalListTail) = growLinkedList(equalListHead, equalListTail, node)
      }

      var prevNode = n
      node = n.next
      prevNode.next = nil
    }
    var (firstHead, firstTail) = connectLinkedLists(smallerListHead, smallerListTail, equalListHead, equalListTail)
    var (finalHead, _) = connectLinkedLists(firstHead, firstTail, greaterListHead, greaterListTail)
    return finalHead
  }

  static func growLinkedList(_ head: LinkedList?, _ tail: LinkedList?, _ node: LinkedList?) -> (LinkedList?, LinkedList?) {
    var newHead = head
    var newTail = node
    if newHead == nil {
      newHead = node
    }
    if let t = tail {
      t.next = node
    }
    return (newHead, newTail)
  }

  static func connectLinkedLists(_ headOne: LinkedList?, _ tailOne: LinkedList?,
                                 _ headTwo: LinkedList?, _ tailTwo: LinkedList?) -> (LinkedList?, LinkedList?)
  {
    var newHead = headOne
    var newTail = tailTwo
    if newHead == nil {
      newHead = headTwo
    }
    if newTail == nil {
      newTail = tailOne
    }

    if let t = tailOne {
      t.next = headTwo
    }
    return (newHead, newTail)
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
      let head = Program.LinkedList(value: 3)
      head.next = Program.LinkedList(value: 0)
      head.next!.next = Program.LinkedList(value: 5)
      head.next!.next!.next = Program.LinkedList(value: 2)
      head.next!.next!.next!.next = Program.LinkedList(value: 1)
      head.next!.next!.next!.next!.next = Program.LinkedList(value: 4)
      let result = Program.rearrangeLinkedList(head, 3)
      let array = linkedListToArray(result)

      let expected = [0, 2, 1, 3, 5, 4]
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
        head = program.LinkedList(3)
        head.next = program.LinkedList(0)
        head.next.next = program.LinkedList(5)
        head.next.next.next = program.LinkedList(2)
        head.next.next.next.next = program.LinkedList(1)
        head.next.next.next.next.next = program.LinkedList(4)
        result = program.rearrangeLinkedList(head, 3)
        array = linkedListToArray(result)

        expected = [0, 2, 1, 3, 5, 4]
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
def rearrangeLinkedList(head, k):
    smallerListHead = None
    smallerListTail = None
    equalListHead = None
    equalListTail = None
    greaterListHead = None
    greaterListTail = None

    node = head
    while node is not None:
        if node.value < k:
            smallerListHead, smallerListTail = growLinkedList(smallerListHead, smallerListTail, node)
        elif node.value > k:
            greaterListHead, greaterListTail = growLinkedList(greaterListHead, greaterListTail, node)
        else:
            equalListHead, equalListTail = growLinkedList(equalListHead, equalListTail, node)

        prevNode = node
        node = node.next
        prevNode.next = None

    firstHead, firstTail = connectLinkedLists(smallerListHead, smallerListTail, equalListHead, equalListTail)
    finalHead, _ = connectLinkedLists(firstHead, firstTail, greaterListHead, greaterListTail)
    return finalHead


def growLinkedList(head, tail, node):
    newHead = head
    newTail = node

    if newHead is None:
        newHead = node
    if tail is not None:
        tail.next = node

    return (newHead, newTail)


def connectLinkedLists(headOne, tailOne, headTwo, tailTwo):
    newHead = headTwo if headOne is None else headOne
    newTail = tailOne if tailTwo is None else tailTwo

    if tailOne is not None:
        tailOne.next = headTwo

    return (newHead, newTail)

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
        head = program.LinkedList(3)
        head.next = program.LinkedList(0)
        head.next.next = program.LinkedList(5)
        head.next.next.next = program.LinkedList(2)
        head.next.next.next.next = program.LinkedList(1)
        head.next.next.next.next.next = program.LinkedList(4)
        result = program.rearrangeLinkedList(head, 3)
        array = linkedListToArray(result)

        expected = [0, 2, 1, 3, 5, 4]
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
  const head = new LinkedList(3);
  head.next = new LinkedList(0);
  head.next.next = new LinkedList(5);
  head.next.next.next = new LinkedList(2);
  head.next.next.next.next = new LinkedList(1);
  head.next.next.next.next.next = new LinkedList(4);
  const result = program.rearrangeLinkedList(head, 3);
  const array = linkedListToArray(result);

  var expected = [0, 2, 1, 3, 5, 4];
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
export function rearrangeLinkedList(head: LinkedList, k: number) {
  let smallerListHead: LinkedList | null = null;
  let smallerListTail: LinkedList | null = null;
  let equalListHead: LinkedList | null = null;
  let equalListTail: LinkedList | null = null;
  let greaterListHead: LinkedList | null = null;
  let greaterListTail: LinkedList | null = null;

  let node: LinkedList | null = head;
  while (node !== null) {
    if (node.value < k) {
      [smallerListHead, smallerListTail] = growLinkedList(smallerListHead, smallerListTail, node);
    } else if (node.value > k) {
      [greaterListHead, greaterListTail] = growLinkedList(greaterListHead, greaterListTail, node);
    } else {
      [equalListHead, equalListTail] = growLinkedList(equalListHead, equalListTail, node);
    }

    const prevNode = node;
    node = node.next;
    prevNode.next = null;
  }

  const [firstHead, firstTail] = connectLinkedLists(smallerListHead, smallerListTail, equalListHead, equalListTail);
  const [finalHead, _] = connectLinkedLists(firstHead, firstTail, greaterListHead, greaterListTail);
  return finalHead;
}

function growLinkedList(head: LinkedList | null, tail: LinkedList | null, node: LinkedList | null) {
  let newHead = head;
  let newTail = node;

  if (newHead === null) newHead = node;
  if (tail !== null) tail.next = node;

  return [newHead, newTail];
}

function connectLinkedLists(
  headOne: LinkedList | null,
  tailOne: LinkedList | null,
  headTwo: LinkedList | null,
  tailTwo: LinkedList | null,
) {
  const newHead = headOne === null ? headTwo : headOne;
  const newTail = tailTwo === null ? tailOne : tailTwo;

  if (tailOne !== null) tailOne.next = headTwo;

  return [newHead, newTail];
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
  const head = new LinkedList(3);
  head.next = new LinkedList(0);
  head.next.next = new LinkedList(5);
  head.next.next.next = new LinkedList(2);
  head.next.next.next.next = new LinkedList(1);
  head.next.next.next.next.next = new LinkedList(4);
  const result = program.rearrangeLinkedList(head, 3);
  const array = linkedListToArray(result);

  var expected = [0, 2, 1, 3, 5, 4];
  chai.expect(array).to.deep.equal(expected);
});

```

