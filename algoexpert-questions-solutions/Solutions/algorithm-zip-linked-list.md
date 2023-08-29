# Zip Linked List
<div class="html">
<p>
  You're given the head of a Singly Linked List of arbitrary length
  <span>k</span>. Write a function that zips the Linked List in place (i.e.,
  doesn't create a brand new list) and returns its head.
</p>
<p>
  A Linked List is zipped if its nodes are in the following order, where
  <span>k</span> is the length of the Linked List:
</p>
<pre>
1st node -> kth node -> 2nd node -> (k - 1)th node -> 3rd node -> (k - 2)th node -> ...
</pre>
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
<span class="CodeEditor-promptParameter">linkedList</span> = 1 -> 2 -> 3 -> 4 -> 5 -> 6 <span class="CodeEditor-promptComment">// the head node with value 1 </span>
</pre>
<h3>Sample Output</h3>
<pre>
1 -> 6 -> 2 -> 5 -> 3 -> 4 <span class="CodeEditor-promptComment">// the head node with value 1</span>
</pre>
</div>

Hint 1
<p>
  Try to imagine how you would solve this problem if you were given two distinct
  linked lists. For example, how would you zip the list
  <span>1 -> 2 -> 3</span> with the list <span>4 -> 5</span> to get
  <span>1 -> 5 -> 2 -> 4 -> 3</span>?
</p>


Hint 2

<p>
  One of the most straightforward ways to solve this problem is to split the
  original linked list into two linked lists and to reverse the second linked
  list before interweaving it with the first one. Ultimately, you want the first
  node, then the kth node, then the second node, etc., so reversing the second
  linked list before interweaving it with the first one makes things simple.
</p>


Hint 3

<p>
  After you split the linked list into two halves and reverse the second half,
  you'll have something like <span>1 -> 2 -> 3</span> and <span>5 -> 4</span>;
  at this point, you can simply add the first node of the reversed second half
  into the first half between <span>1</span> and <span>2</span> as in
  <span>1 -> 5 -> 2...</span>. Simply continue this process until you've
  inserted all of the nodes from the reversed second half into the first.
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
      LinkedList *head = addMany(new LinkedList(1), vector<int>{2, 3, 4, 5, 6});
      vector<int> expected = {1, 6, 2, 5, 3, 4};
      auto actual = getNodesInArray(zipLinkedList(head));
      assert(expected == actual);
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

LinkedList *splitLinkedList(LinkedList *linkedList);
LinkedList *interweaveLinkedLists(LinkedList *linkedList1,
                                  LinkedList *linkedList2);
LinkedList *reverseLinkedList(LinkedList *head);

// O(n) time | O(1) space - where n is the length of the Linked List
LinkedList *zipLinkedList(LinkedList *linkedList) {
  if (linkedList->next == nullptr || linkedList->next->next == nullptr)
    return linkedList;

  LinkedList *firstHalfHead = linkedList;
  LinkedList *secondHalfHead = splitLinkedList(linkedList);

  LinkedList *reversedSecondHalfHead = reverseLinkedList(secondHalfHead);

  return interweaveLinkedLists(firstHalfHead, reversedSecondHalfHead);
}

LinkedList *splitLinkedList(LinkedList *linkedList) {
  LinkedList *slowIterator = linkedList;
  LinkedList *fastIterator = linkedList;
  while (fastIterator != nullptr && fastIterator->next != nullptr) {
    slowIterator = slowIterator->next;
    fastIterator = fastIterator->next->next;
  }

  LinkedList *secondHalfHead = slowIterator->next;
  slowIterator->next = nullptr;
  return secondHalfHead;
}

LinkedList *interweaveLinkedLists(LinkedList *linkedList1,
                                  LinkedList *linkedList2) {
  LinkedList *linkedList1Iterator = linkedList1;
  LinkedList *linkedList2Iterator = linkedList2;
  while (linkedList1Iterator != nullptr && linkedList2Iterator != nullptr) {
    LinkedList *linkedList1IteratorNext = linkedList1Iterator->next;
    LinkedList *linkedList2IteratorNext = linkedList2Iterator->next;

    linkedList1Iterator->next = linkedList2Iterator;
    linkedList2Iterator->next = linkedList1IteratorNext;

    linkedList1Iterator = linkedList1IteratorNext;
    linkedList2Iterator = linkedList2IteratorNext;
  }

  return linkedList1;
}

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
LinkedList *addMany(LinkedList *linkedList, vector<int> values);
vector<int> getNodesInArray(LinkedList *linkedList);

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      LinkedList *head = addMany(new LinkedList(1), vector<int>{2, 3, 4, 5, 6});
      vector<int> expected = {1, 6, 2, 5, 3, 4};
      auto actual = getNodesInArray(zipLinkedList(head));
      assert(expected == actual);
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
	[Test]
	public void TestCase1() {
		var head = new Program.LinkedList(1);
		addMany(head, new int[] { 2, 3, 4, 5, 6 });
		List<int> expected = new List<int> {
			1, 6, 2, 5, 3, 4
		};
		var actual = getNodesInArray(new Program().ZipLinkedList(head));
		Utils.AssertTrue(Enumerable.SequenceEqual(expected, actual));
	}

	public List<int> getNodesInArray(Program.LinkedList linkedList) {
		var nodes = new List<int>();
		var current = linkedList;
		while (current != null) {
			nodes.Add(current.value);
			current = current.next;
		}
		return nodes;
	}

	public void addMany(Program.LinkedList head, int[] values) {
		Program.LinkedList current = head;
		while (current.next != null) {
			current = current.next;
		}
		foreach (var value in values) {
			current.next = new Program.LinkedList(value);
			current = current.next;
		}
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

	// O(n) time | O(1) space - where n is the length of the Linked List
	public LinkedList ZipLinkedList(LinkedList linkedList) {
		if (linkedList.next == null || linkedList.next.next == null) {
			return linkedList;
		}

		LinkedList firstHalfHead = linkedList;
		LinkedList secondHalfHead = splitLinkedList(linkedList);

		LinkedList reversedSecondHalfHead = reverseLinkedList(secondHalfHead);

		return interweaveLinkedLists(firstHalfHead, reversedSecondHalfHead);
	}

	public LinkedList splitLinkedList(LinkedList linkedList) {
		LinkedList slowIterator = linkedList;
		LinkedList fastIterator = linkedList;

		while (fastIterator != null && fastIterator.next != null) {
			slowIterator = slowIterator.next;
			fastIterator = fastIterator.next.next;
		}

		LinkedList secondHalfHead = slowIterator.next;
		slowIterator.next = null;
		return secondHalfHead;
	}

	public LinkedList interweaveLinkedLists(LinkedList linkedList1, LinkedList linkedList2) {
		LinkedList linkedList1Iterator = linkedList1;
		LinkedList linkedList2Iterator = linkedList2;

		while (linkedList1Iterator != null && linkedList2Iterator != null) {
			LinkedList firstHalfIteratorNext = linkedList1Iterator.next;
			LinkedList secondHalfIteratorNext = linkedList2Iterator.next;

			linkedList1Iterator.next = linkedList2Iterator;
			linkedList2Iterator.next = firstHalfIteratorNext;

			linkedList1Iterator = firstHalfIteratorNext;
			linkedList2Iterator = secondHalfIteratorNext;
		}

		return linkedList1;
	}

	public LinkedList reverseLinkedList(LinkedList linkedList) {
		LinkedList previousNode = null;
		LinkedList currentNode = linkedList;
		while (currentNode != null) {
			LinkedList nextNode = currentNode.next;
			currentNode.next = previousNode;
			previousNode = currentNode;
			currentNode = nextNode;
		}
		return previousNode;
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
		var head = new Program.LinkedList(1);
		addMany(head, new int[] { 2, 3, 4, 5, 6 });
		List<int> expected = new List<int> {
			1, 6, 2, 5, 3, 4
		};
		var actual = getNodesInArray(new Program().ZipLinkedList(head));
		Utils.AssertTrue(Enumerable.SequenceEqual(expected, actual));
	}

	public List<int> getNodesInArray(Program.LinkedList linkedList) {
		var nodes = new List<int>();
		var current = linkedList;
		while (current != null) {
			nodes.Add(current.value);
			current = current.next;
		}
		return nodes;
	}

	public void addMany(Program.LinkedList head, int[] values) {
		Program.LinkedList current = head;
		while (current.next != null) {
			current = current.next;
		}
		foreach (var value in values) {
			current.next = new Program.LinkedList(value);
			current = current.next;
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

func (s *TestSuite) TestCase1(t *TestCase) {
	input := addMany(&LinkedList{Value: 1}, []int{2, 3, 4, 5, 6})
	expected := []int{1, 6, 2, 5, 3, 4}
	actual := ZipLinkedList(input)
	result := getValues(actual)
	require.Equal(t, expected, result)
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

// O(n) time | O(1) space - where n is the length of the Linked List
func ZipLinkedList(linkedList *LinkedList) *LinkedList {
	if linkedList.Next == nil || linkedList.Next.Next == nil {
		return linkedList
	}

	firstHalfHead := linkedList
	secondHalfHead := splitLinkedList(linkedList)

	reversedSecondHalfHead := reverseLinkedList(secondHalfHead)

	return interweaveLinkedLists(firstHalfHead, reversedSecondHalfHead)
}

func splitLinkedList(linkedList *LinkedList) *LinkedList {
	slowIterator := linkedList
	fastIterator := linkedList
	for fastIterator != nil && fastIterator.Next != nil {
		slowIterator = slowIterator.Next
		fastIterator = fastIterator.Next.Next
	}

	secondHalfHead := slowIterator.Next
	slowIterator.Next = nil
	return secondHalfHead
}

func interweaveLinkedLists(linkedList1 *LinkedList, linkedList2 *LinkedList) *LinkedList {
	linkedList1Iterator := linkedList1
	linkedList2Iterator := linkedList2
	for linkedList1Iterator != nil && linkedList2Iterator != nil {
		linkedList1IteratorNext := linkedList1Iterator.Next
		linkedList2IteratorNext := linkedList2Iterator.Next

		linkedList1Iterator.Next = linkedList2Iterator
		linkedList2Iterator.Next = linkedList1IteratorNext

		linkedList1Iterator = linkedList1IteratorNext
		linkedList2Iterator = linkedList2IteratorNext
	}

	return linkedList1
}

func reverseLinkedList(head *LinkedList) *LinkedList {
	var previousNode *LinkedList
	currentNode := head
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

func (s *TestSuite) TestCase1(t *TestCase) {
	input := addMany(&LinkedList{Value: 1}, []int{2, 3, 4, 5, 6})
	expected := []int{1, 6, 2, 5, 3, 4}
	actual := ZipLinkedList(input)
	result := getValues(actual)
	require.Equal(t, expected, result)
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
  @Test
  public void TestCase1() {
    TestLinkedList head = new TestLinkedList(1);
    head.addMany(new int[] {2, 3, 4, 5, 6});
    List<Integer> expected = new ArrayList<Integer>(Arrays.asList(1, 6, 2, 5, 3, 4));
    var actual = getNodesInArray(new Program().zipLinkedList(head));
    Utils.assertTrue(expected.equals(actual));
  }

  public List<Integer> getNodesInArray(Program.LinkedList linkedList) {
    var nodes = new ArrayList<Integer>();
    var current = linkedList;
    while (current != null) {
      nodes.add(current.value);
      current = current.next;
    }
    return nodes;
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

  // O(n) time | O(1) space - where n is the length of the Linked List
  public LinkedList zipLinkedList(LinkedList linkedList) {
    if (linkedList.next == null || linkedList.next.next == null) {
      return linkedList;
    }

    LinkedList firstHalfHead = linkedList;
    LinkedList secondHalfHead = splitLinkedList(linkedList);

    LinkedList reversedSecondHalfHead = reverseLinkedList(secondHalfHead);

    return interweaveLinkedLists(firstHalfHead, reversedSecondHalfHead);
  }

  public LinkedList splitLinkedList(LinkedList linkedList) {
    LinkedList slowIterator = linkedList;
    LinkedList fastIterator = linkedList;

    while (fastIterator != null && fastIterator.next != null) {
      slowIterator = slowIterator.next;
      fastIterator = fastIterator.next.next;
    }

    LinkedList secondHalfHead = slowIterator.next;
    slowIterator.next = null;
    return secondHalfHead;
  }

  public LinkedList interweaveLinkedLists(LinkedList linkedList1, LinkedList linkedList2) {
    LinkedList linkedList1Iterator = linkedList1;
    LinkedList linkedList2Iterator = linkedList2;

    while (linkedList1Iterator != null && linkedList2Iterator != null) {
      LinkedList firstHalfIteratorNext = linkedList1Iterator.next;
      LinkedList secondHalfIteratorNext = linkedList2Iterator.next;

      linkedList1Iterator.next = linkedList2Iterator;
      linkedList2Iterator.next = firstHalfIteratorNext;

      linkedList1Iterator = firstHalfIteratorNext;
      linkedList2Iterator = secondHalfIteratorNext;
    }

    return linkedList1;
  }

  public LinkedList reverseLinkedList(LinkedList linkedList) {
    LinkedList previousNode = null;
    LinkedList currentNode = linkedList;
    while (currentNode != null) {
      LinkedList nextNode = currentNode.next;
      currentNode.next = previousNode;
      previousNode = currentNode;
      currentNode = nextNode;
    }
    return previousNode;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    TestLinkedList head = new TestLinkedList(1);
    head.addMany(new int[] {2, 3, 4, 5, 6});
    List<Integer> expected = new ArrayList<Integer>(Arrays.asList(1, 6, 2, 5, 3, 4));
    var actual = getNodesInArray(new Program().zipLinkedList(head));
    Utils.assertTrue(expected.equals(actual));
  }

  public List<Integer> getNodesInArray(Program.LinkedList linkedList) {
    var nodes = new ArrayList<Integer>();
    var current = linkedList;
    while (current != null) {
      nodes.add(current.value);
      current = current.next;
    }
    return nodes;
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
  const head = new LinkedList(1).addMany([2, 3, 4, 5, 6]);
  const expected = [1, 6, 2, 5, 3, 4];
  const actual = program.zipLinkedList(head).getNodesInArray();
  chai.expect(actual).to.deep.equal(expected);
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

// O(n) time | O(1) space - where n is the length of the Linked List
function zipLinkedList(linkedList) {
  if (linkedList.next === null || linkedList.next.next === null) return linkedList;

  const firstHalfHead = linkedList;
  const secondHalfHead = splitLinkedList(linkedList);

  const reversedSecondHalfHead = reverseLinkedList(secondHalfHead);

  return interweaveLinkedLists(firstHalfHead, reversedSecondHalfHead);
}

function splitLinkedList(linkedList) {
  let slowIterator = linkedList;
  let fastIterator = linkedList;
  while (fastIterator !== null && fastIterator.next !== null) {
    slowIterator = slowIterator.next;
    fastIterator = fastIterator.next.next;
  }

  const secondHalfHead = slowIterator.next;
  slowIterator.next = null;
  return secondHalfHead;
}

function interweaveLinkedLists(linkedList1, linkedList2) {
  let linkedList1Iterator = linkedList1;
  let linkedList2Iterator = linkedList2;
  while (linkedList1Iterator !== null && linkedList2Iterator !== null) {
    const linkedList1IteratorNext = linkedList1Iterator.next;
    const linkedList2IteratorNext = linkedList2Iterator.next;

    linkedList1Iterator.next = linkedList2Iterator;
    linkedList2Iterator.next = linkedList1IteratorNext;

    linkedList1Iterator = linkedList1IteratorNext;
    linkedList2Iterator = linkedList2IteratorNext;
  }

  return linkedList1;
}

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

// Do not edit the lines below.
exports.LinkedList = LinkedList;
exports.zipLinkedList = zipLinkedList;

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
  const head = new LinkedList(1).addMany([2, 3, 4, 5, 6]);
  const expected = [1, 6, 2, 5, 3, 4];
  const actual = program.zipLinkedList(head).getNodesInArray();
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.LinkedList
import com.algoexpert.program.zipLinkedList

class ProgramTest {
    @Test
    fun TestCase1() {
        val test = addMany(LinkedList(1), listOf(2, 3, 4, 5, 6))
        val result = getNodesInArray(zipLinkedList(test))
        val expected = listOf(1, 6, 2, 5, 3, 4)
        assert(result.equals(expected))
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

// O(n) time | O(1) space - where n is the length of the Linked List
fun zipLinkedList(linkedList: LinkedList): LinkedList {
    if (linkedList.next == null || linkedList.next!!.next == null) {
        return linkedList
    }

    val firstHalfHead = linkedList
    val secondHalfHead = splitLinkedList(linkedList)

    val reversedSecondHalfHead = reverseLinkedList(secondHalfHead)

    return interweaveLinkedLists(firstHalfHead, reversedSecondHalfHead)
}

fun splitLinkedList(linkedList: LinkedList): LinkedList {
    var slowIterator = linkedList
    var fastIterator: LinkedList? = linkedList
    while (fastIterator != null && fastIterator.next != null) {
        slowIterator = slowIterator.next!!
        fastIterator = fastIterator.next!!.next
    }

    val secondHalfHead = slowIterator.next!!
    slowIterator.next = null
    return secondHalfHead
}

fun interweaveLinkedLists(linkedList1: LinkedList, linkedList2: LinkedList): LinkedList {
    var linkedList1Iterator: LinkedList? = linkedList1
    var linkedList2Iterator: LinkedList? = linkedList2
    while (linkedList1Iterator != null && linkedList2Iterator != null) {
        val linkedList1IteratorNext = linkedList1Iterator.next
        val linkedList2IteratorNext = linkedList2Iterator.next

        linkedList1Iterator.next = linkedList2Iterator
        linkedList2Iterator.next = linkedList1IteratorNext

        linkedList1Iterator = linkedList1IteratorNext
        linkedList2Iterator = linkedList2IteratorNext
    }

    return linkedList1
}

fun reverseLinkedList(head: LinkedList): LinkedList {
    var previousNode: LinkedList? = null
    var currentNode: LinkedList? = head
    while (currentNode != null) {
        val nextNode: LinkedList? = currentNode.next
        currentNode.next = previousNode
        previousNode = currentNode
        currentNode = nextNode
    }
    return previousNode!!
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.LinkedList
import com.algoexpert.program.zipLinkedList

class ProgramTest {
    @Test
    fun TestCase1() {
        val test = addMany(LinkedList(1), listOf(2, 3, 4, 5, 6))
        val result = getNodesInArray(zipLinkedList(test))
        val expected = listOf(1, 6, 2, 5, 3, 4)
        assert(result.equals(expected))
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
      let input = addMany(Program.LinkedList(value: 1), [2, 3, 4, 5, 6])
      let expected = [1, 6, 2, 5, 3, 4]
      var actual = Program().zipLinkedList(input)
      let result = getValues(actual)
      try assertEqual(expected, result)
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

  // O(n) time | O(1) space - where n is the length of the Linked List
  func zipLinkedList(_ linkedList: LinkedList) -> LinkedList {
    if linkedList.next == nil || linkedList.next!.next == nil {
      return linkedList
    }

    let firstHalfHead = linkedList
    let secondHalfHead = splitLinkedList(linkedList)

    let reversedSecondHalfHead = reverseLinkedList(secondHalfHead)

    return interweaveLinkedLists(firstHalfHead, reversedSecondHalfHead)!
  }

  func splitLinkedList(_ linkedList: LinkedList?) -> LinkedList? {
    var slowIterator = linkedList
    var fastIterator = linkedList
    while fastIterator != nil, fastIterator!.next != nil {
      slowIterator = slowIterator!.next
      fastIterator = fastIterator!.next!.next
    }

    let secondHalfHead = slowIterator!.next
    slowIterator!.next = nil
    return secondHalfHead
  }

  func interweaveLinkedLists(_ linkedList1: LinkedList?, _ linkedList2: LinkedList?) -> LinkedList? {
    var linkedList1Iterator = linkedList1
    var linkedList2Iterator = linkedList2
    while linkedList1Iterator != nil, linkedList2Iterator != nil {
      let linkedList1IteratorNext = linkedList1Iterator!.next
      let linkedList2IteratorNext = linkedList2Iterator!.next

      linkedList1Iterator!.next = linkedList2Iterator
      linkedList2Iterator!.next = linkedList1IteratorNext

      linkedList1Iterator = linkedList1IteratorNext
      linkedList2Iterator = linkedList2IteratorNext
    }

    return linkedList1
  }

  func reverseLinkedList(_ head: LinkedList?) -> LinkedList? {
    var previousNode: LinkedList?
    var currentNode = head
    while currentNode != nil {
      let nextNode = currentNode!.next
      currentNode!.next = previousNode
      previousNode = currentNode
      currentNode = nextNode
    }
    return previousNode
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let input = addMany(Program.LinkedList(value: 1), [2, 3, 4, 5, 6])
      let expected = [1, 6, 2, 5, 3, 4]
      var actual = Program().zipLinkedList(input)
      let result = getValues(actual)
      try assertEqual(expected, result)
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
        head = LinkedList(1).addMany([2, 3, 4, 5, 6])
        expected = [1, 6, 2, 5, 3, 4]
        actual = program.zipLinkedList(head).getNodesInArray()
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# This is an input class. Do not edit.
class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None


# O(n) time | O(1) space - where n is the length of the Linked List
def zipLinkedList(linkedList):
    if linkedList.next is None or linkedList.next.next is None:
        return linkedList

    firstHalfHead = linkedList
    secondHalfHead = splitLinkedList(linkedList)

    reversedSecondHalfHead = reverseLinkedList(secondHalfHead)

    return interweaveLinkedLists(firstHalfHead, reversedSecondHalfHead)


def splitLinkedList(linkedList):
    slowIterator = linkedList
    fastIterator = linkedList
    while fastIterator is not None and fastIterator.next is not None:
        slowIterator = slowIterator.next
        fastIterator = fastIterator.next.next

    secondHalfHead = slowIterator.next
    slowIterator.next = None
    return secondHalfHead


def interweaveLinkedLists(linkedList1, linkedList2):
    linkedList1Iterator = linkedList1
    linkedList2Iterator = linkedList2
    while linkedList1Iterator is not None and linkedList2Iterator is not None:
        linkedList1IteratorNext = linkedList1Iterator.next
        linkedList2IteratorNext = linkedList2Iterator.next

        linkedList1Iterator.next = linkedList2Iterator
        linkedList2Iterator.next = linkedList1IteratorNext

        linkedList1Iterator = linkedList1IteratorNext
        linkedList2Iterator = linkedList2IteratorNext

    return linkedList1


def reverseLinkedList(linkedList):
    previousNode, currentNode = None, linkedList
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
        head = LinkedList(1).addMany([2, 3, 4, 5, 6])
        expected = [1, 6, 2, 5, 3, 4]
        actual = program.zipLinkedList(head).getNodesInArray()
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
  const head = addMany(new program.LinkedList(1), [2, 3, 4, 5, 6]);
  const expected = [1, 6, 2, 5, 3, 4];
  const actual = getNodesInArray(program.zipLinkedList(head));
  chai.expect(actual).to.deep.equal(expected);
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

// O(n) time | O(1) space - where n is the length of the Linked List
export function zipLinkedList(linkedList: LinkedList) {
  if (linkedList.next === null || linkedList.next.next === null) return linkedList;

  const firstHalfHead = linkedList;
  const secondHalfHead = splitLinkedList(linkedList);

  const reversedSecondHalfHead = reverseLinkedList(secondHalfHead);

  return interweaveLinkedLists(firstHalfHead, reversedSecondHalfHead);
}

function splitLinkedList(linkedList: LinkedList) {
  let slowIterator = linkedList;
  let fastIterator: LinkedList | null = linkedList;
  while (fastIterator !== null && fastIterator.next !== null) {
    slowIterator = slowIterator.next!;
    fastIterator = fastIterator.next.next;
  }

  const secondHalfHead = slowIterator.next!;
  slowIterator.next = null;
  return secondHalfHead;
}

function interweaveLinkedLists(linkedList1: LinkedList, linkedList2: LinkedList) {
  let linkedList1Iterator: LinkedList | null = linkedList1;
  let linkedList2Iterator: LinkedList | null = linkedList2;
  while (linkedList1Iterator !== null && linkedList2Iterator !== null) {
    const linkedList1IteratorNext: LinkedList | null = linkedList1Iterator.next;
    const linkedList2IteratorNext: LinkedList | null = linkedList2Iterator.next;

    linkedList1Iterator.next = linkedList2Iterator;
    linkedList2Iterator.next = linkedList1IteratorNext;

    linkedList1Iterator = linkedList1IteratorNext;
    linkedList2Iterator = linkedList2IteratorNext;
  }

  return linkedList1;
}

function reverseLinkedList(head: LinkedList) {
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

it('Test Case #1', function () {
  const head = addMany(new program.LinkedList(1), [2, 3, 4, 5, 6]);
  const expected = [1, 6, 2, 5, 3, 4];
  const actual = getNodesInArray(program.zipLinkedList(head));
  chai.expect(actual).to.deep.equal(expected);
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

