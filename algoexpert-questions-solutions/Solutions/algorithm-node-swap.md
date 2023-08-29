# Node Swap
<div class="html">
<p>
  Write a function that takes in the head of a Singly Linked List, swaps every
  pair of adjacent nodes in place (i.e., doesn't create a brand new list), and
  returns its new head.
</p>
<p>
  If the input Linked List has an odd number of nodes, its final node should
  remain the same.
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
</pre>
<h3>Sample Output</h3>
<pre>
1 -> 0 -> 3 -> 2 -> 5 -> 4 <span class="CodeEditor-promptComment">// the new head node with value 1</span>
</pre>
</div>

Hint 1
<p>
  Each node in the linked list points to the next node in the linked list. How
  would you modify the <span>next</span> pointers of two nodes in order to swap
  them?
</p>


Hint 2

<p>
  Can you apply what you come up with from Hint #1 in order to solve this
  problem recursively?
</p>


Hint 3

<p>
  To solve this problem recursively, have each recursive call swap a pair of
  nodes and then return the first node of the swapped pair (the node that was
  originally the second node in the pair). Also, have each recursive call make
  the second node of the swapped pair (the node that was originally the first
  node in the pair) point to the result of the next recursive call. The next
  recursive call should take in the first node of the next pair as its input
  parameter.
</p>


Hint 4

<p>
  Implementing this problem iteratively can improve the space complexity of the
  solution. Intuitively, you need swap nodes while traversing the entire linked
  list. To do this, you'll need to reference and change the pointers of three
  nodes at a time. You'll also need to create a placeholder node that points to
  the head of the linked list, so that at the end of the traversal, you can
  still reference the new head that you have to return.
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
      LinkedList *linkedList = addMany(new LinkedList(0), {1, 2, 3, 4, 5});
      vector<int> expectedNodes = {1, 0, 3, 2, 5, 4};
      auto output = nodeSwap(linkedList);
      assert(getNodesInArray(output) == expectedNodes);
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

// O(n) time | O(n) space - where n is the number of nodes in the Linked List
LinkedList *nodeSwap(LinkedList *head) {
  if (head == nullptr || head->next == nullptr) {
    return head;
  }

  LinkedList *nextNode = head->next;
  head->next = nodeSwap(head->next->next);
  nextNode->next = head;
  return nextNode;
}

```
### Solution 2 (cpp)
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
LinkedList *nodeSwap(LinkedList *head) {
  LinkedList *tempNode = new LinkedList(0);
  tempNode->next = head;

  LinkedList *prevNode = tempNode;
  while (prevNode->next != nullptr && prevNode->next->next != nullptr) {
    LinkedList *firstNode = prevNode->next;
    LinkedList *secondNode = prevNode->next->next;
    // prevNode -> firstNode -> secondNode -> x

    firstNode->next = secondNode->next;
    secondNode->next = firstNode;
    prevNode->next = secondNode;
    // prevNode -> secondNode -> firstNode -> x

    prevNode = firstNode;
  }

  return tempNode->next;
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
      LinkedList *linkedList = addMany(new LinkedList(0), {1, 2, 3, 4, 5});
      vector<int> expectedNodes = {1, 0, 3, 2, 5, 4};
      auto output = nodeSwap(linkedList);
      assert(getNodesInArray(output) == expectedNodes);
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
		Program.LinkedList linkedList = new Program.LinkedList(0);
		addMany(linkedList, new List<int> {
			1, 2, 3, 4, 5
		});
		List<int> expectedNodes = new List<int> {
			1, 0, 3, 2, 5, 4
		};
		var actual = new Program().NodeSwap(linkedList);
		Utils.AssertTrue(Enumerable.SequenceEqual(getNodesInArray(actual), expectedNodes));
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

	// O(n) time | O(n) space - where n is the number of nodes in the Linked List
	public LinkedList NodeSwap(LinkedList head) {
		if (head == null || head.next == null) {
			return head;
		}

		LinkedList nextNode = head.next;
		head.next = NodeSwap(head.next.next);
		nextNode.next = head;
		return nextNode;
	}
}

```
### Solution 2 (csharp)
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
	public LinkedList NodeSwap(LinkedList head) {
		LinkedList tempNode = new LinkedList(0);
		tempNode.next = head;

		LinkedList prevNode = tempNode;
		while (prevNode.next != null && prevNode.next.next != null) {
			LinkedList firstNode = prevNode.next;
			LinkedList secondNode = prevNode.next.next;
			// prevNode => firstNode => secondNode => x

			firstNode.next = secondNode.next;
			secondNode.next = firstNode;
			prevNode.next = secondNode;
			// prevNode => secondNode => firstNode => x

			prevNode = firstNode;
		}
		return tempNode.next;
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
		Program.LinkedList linkedList = new Program.LinkedList(0);
		addMany(linkedList, new List<int> {
			1, 2, 3, 4, 5
		});
		List<int> expectedNodes = new List<int> {
			1, 0, 3, 2, 5, 4
		};
		var actual = new Program().NodeSwap(linkedList);
		Utils.AssertTrue(Enumerable.SequenceEqual(getNodesInArray(actual), expectedNodes));
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
	head := addMany(&LinkedList{Value: 0}, []int{1, 2, 3, 4, 5})
	expected := []int{1, 0, 3, 2, 5, 4}
	actual := NodeSwap(head)
	require.Equal(t, expected, actual.Values())
}

func addMany(ll *LinkedList, values []int) *LinkedList {
	current := ll
	for _, val := range values {
		current.Next = &LinkedList{Value: val}
		current = current.Next
	}
	return ll
}

func (ll *LinkedList) Values() []int {
	values := []int{}
	current := ll
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

// O(n) time | O(n) space - where n is the number of nodes in the Linked List
func NodeSwap(head *LinkedList) *LinkedList {
	return recursiveNodeSwap(head)
}

func recursiveNodeSwap(head *LinkedList) *LinkedList {
	if head == nil || head.Next == nil {
		return head
	}

	nextNode := head.Next
	head.Next = recursiveNodeSwap(head.Next.Next)
	nextNode.Next = head
	return nextNode
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// This is an input struct. Do not edit.
type LinkedList struct {
	Value int
	Next  *LinkedList
}

// O(n) time | O(1) space - where n is the number of nodes in the Linked List
func NodeSwap(head *LinkedList) *LinkedList {
	tempNode := &LinkedList{Value: 0}
	tempNode.Next = head

	prevNode := tempNode
	for prevNode.Next != nil && prevNode.Next.Next != nil {
		firstNode := prevNode.Next
		secondNode := prevNode.Next.Next
		// prevNode -> firstNode -> secondNode -> x

		firstNode.Next = secondNode.Next
		secondNode.Next = firstNode
		prevNode.Next = secondNode
		// prevNode -> secondNode -> firstNode -> x

		prevNode = firstNode
	}

	return tempNode.Next
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	head := addMany(&LinkedList{Value: 0}, []int{1, 2, 3, 4, 5})
	expected := []int{1, 0, 3, 2, 5, 4}
	actual := NodeSwap(head)
	require.Equal(t, expected, actual.Values())
}

func addMany(ll *LinkedList, values []int) *LinkedList {
	current := ll
	for _, val := range values {
		current.Next = &LinkedList{Value: val}
		current = current.Next
	}
	return ll
}

func (ll *LinkedList) Values() []int {
	values := []int{}
	current := ll
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
    Program.LinkedList linkedList = new Program.LinkedList(0);
    addMany(linkedList, new ArrayList<Integer>(Arrays.asList(1, 2, 3, 4, 5)));
    List<Integer> expectedNodes = new ArrayList<Integer>(Arrays.asList(1, 0, 3, 2, 5, 4));
    var actual = new Program().nodeSwap(linkedList);
    Utils.assertTrue(getNodesInArray(actual).equals(expectedNodes));
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

  // O(n) time | O(n) space - where n is the number of nodes in the Linked List
  public LinkedList nodeSwap(LinkedList head) {
    if (head == null || head.next == null) {
      return head;
    }

    LinkedList nextNode = head.next;
    head.next = nodeSwap(head.next.next);
    nextNode.next = head;
    return nextNode;
  }
}

```
### Solution 2 (java)
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
  public LinkedList nodeSwap(LinkedList head) {
    LinkedList tempNode = new LinkedList(0);
    tempNode.next = head;

    LinkedList prevNode = tempNode;
    while (prevNode.next != null && prevNode.next.next != null) {
      LinkedList firstNode = prevNode.next;
      LinkedList secondNode = prevNode.next.next;
      // prevNode -> firstNode -> secondNode -> x

      firstNode.next = secondNode.next;
      secondNode.next = firstNode;
      prevNode.next = secondNode;
      // prevNode -> secondNode -> firstNode -> x

      prevNode = firstNode;
    }
    return tempNode.next;
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
    Program.LinkedList linkedList = new Program.LinkedList(0);
    addMany(linkedList, new ArrayList<Integer>(Arrays.asList(1, 2, 3, 4, 5)));
    List<Integer> expectedNodes = new ArrayList<Integer>(Arrays.asList(1, 0, 3, 2, 5, 4));
    var actual = new Program().nodeSwap(linkedList);
    Utils.assertTrue(getNodesInArray(actual).equals(expectedNodes));
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
}

function getNodesInArray(linkedList) {
  const nodes = [];
  let current = linkedList;
  while (current !== null) {
    nodes.push(current.value);
    current = current.next;
  }
  return nodes;
}

it('Test Case #1', function () {
  const linkedList = new LinkedList(0).addMany([1, 2, 3, 4, 5]);
  const expectedNodes = [1, 0, 3, 2, 5, 4];
  const actual = program.nodeSwap(linkedList);
  chai.expect(getNodesInArray(actual)).to.deep.equal(expectedNodes);
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

// O(n) time | O(n) space - where n is the number of nodes in the Linked List
function nodeSwap(head) {
  if (head === null || head.next === null) return head;

  const nextNode = head.next;
  head.next = nodeSwap(head.next.next);
  nextNode.next = head;
  return nextNode;
}

// Do not edit the lines below.
exports.nodeSwap = nodeSwap;
exports.LinkedList = LinkedList;

```
### Solution 2 (javascript)
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
function nodeSwap(head) {
  const tempNode = new LinkedList(0);
  tempNode.next = head;

  let prevNode = tempNode;
  while (prevNode.next !== null && prevNode.next.next !== null) {
    const firstNode = prevNode.next;
    const secondNode = prevNode.next.next;
    // prevNode -> firstNode -> secondNode -> x

    firstNode.next = secondNode.next;
    secondNode.next = firstNode;
    prevNode.next = secondNode;
    // prevNode -> secondNode -> firstNode -> x

    prevNode = firstNode;
  }

  return tempNode.next;
}

// Do not edit the lines below.
exports.nodeSwap = nodeSwap;
exports.LinkedList = LinkedList;

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
}

function getNodesInArray(linkedList) {
  const nodes = [];
  let current = linkedList;
  while (current !== null) {
    nodes.push(current.value);
    current = current.next;
  }
  return nodes;
}

it('Test Case #1', function () {
  const linkedList = new LinkedList(0).addMany([1, 2, 3, 4, 5]);
  const expectedNodes = [1, 0, 3, 2, 5, 4];
  const actual = program.nodeSwap(linkedList);
  chai.expect(getNodesInArray(actual)).to.deep.equal(expectedNodes);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.LinkedList
import com.algoexpert.program.nodeSwap

class ProgramTest {
    @Test
    fun TestCase1() {
        val head = addMany(LinkedList(0), listOf(1, 2, 3, 4, 5))
        val expectedNodes = listOf(1, 0, 3, 2, 5, 4)
        val output = nodeSwap(head)
        assert(expectedNodes == getNodesInArray(output))
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

// O(n) time | O(n) space - where n is the number of nodes in the Linked List
fun nodeSwap(head: LinkedList): LinkedList {
    return recursiveNodeSwap(head)!!
}

fun recursiveNodeSwap(head: LinkedList?): LinkedList? {
    if (head == null || head.next == null) return head

    val nextNode = head.next!!
    head.next = recursiveNodeSwap(head.next!!.next)
    nextNode.next = head
    return nextNode
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// This is an input class. Do not edit.
open class LinkedList(value: Int) {
    var value = value
    var next: LinkedList? = null
}

// O(n) time | O(1) space - where n is the number of nodes in the Linked List
fun nodeSwap(head: LinkedList): LinkedList {
    val tempNode = LinkedList(0)
    tempNode.next = head

    var prevNode = tempNode
    while (prevNode.next != null && prevNode.next!!.next != null) {
        val firstNode = prevNode.next!!
        val secondNode = prevNode.next!!.next!!
        // prevNode -> firstNode -> secondNode -> x

        firstNode.next = secondNode.next
        secondNode.next = firstNode
        prevNode.next = secondNode
        // prevNode -> secondNode -> firstNode -> x

        prevNode = firstNode
    }

    return tempNode.next!!
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.LinkedList
import com.algoexpert.program.nodeSwap

class ProgramTest {
    @Test
    fun TestCase1() {
        val head = addMany(LinkedList(0), listOf(1, 2, 3, 4, 5))
        val expectedNodes = listOf(1, 0, 3, 2, 5, 4)
        val output = nodeSwap(head)
        assert(expectedNodes == getNodesInArray(output))
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
      var head = addMany(Program.LinkedList(value: 0), [1, 2, 3, 4, 5])
      var expected = [1, 0, 3, 2, 5, 4]
      var actual = Program().nodeSwap(head)
      try assertEqual(expected, getNodesInArray(actual))
    }
  }

  func addMany(_ linkedList: Program.LinkedList, _ values: [Int]) -> Program.LinkedList {
    var current = linkedList
    while current.next != nil {
      current = current.next!
    }
    for value in values {
      current.next = Program.LinkedList(value: value)
      current = current.next!
    }
    return linkedList
  }

  func getNodesInArray(_ linkedList: Program.LinkedList?) -> [Int] {
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

  // O(n) time | O(n) space - where n is the number of nodes in the Linked List
  func nodeSwap(_ head: LinkedList) -> LinkedList {
    return recursiveNodeSwap(head)!
  }

  func recursiveNodeSwap(_ head: LinkedList?) -> LinkedList? {
    if head == nil || head!.next == nil {
      return head
    }

    let nextNode = head!.next
    head!.next = recursiveNodeSwap(head!.next!.next)
    nextNode!.next = head
    return nextNode
  }
}

```
### Solution 2 (swift)
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
  func nodeSwap(_ head: LinkedList) -> LinkedList {
    let tempNode = LinkedList(value: 0)
    tempNode.next = head

    var prevNode: LinkedList? = tempNode
    while prevNode!.next != nil, prevNode!.next!.next != nil {
      let firstNode = prevNode!.next
      let secondNode = prevNode!.next!.next
      // prevNode -> firstNode -> secondNode -> x

      firstNode!.next = secondNode!.next
      secondNode!.next = firstNode
      prevNode!.next = secondNode
      // prevNode -> secondNode -> firstNode -> x

      prevNode = firstNode
    }

    return tempNode.next!
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var head = addMany(Program.LinkedList(value: 0), [1, 2, 3, 4, 5])
      var expected = [1, 0, 3, 2, 5, 4]
      var actual = Program().nodeSwap(head)
      try assertEqual(expected, getNodesInArray(actual))
    }
  }

  func addMany(_ linkedList: Program.LinkedList, _ values: [Int]) -> Program.LinkedList {
    var current = linkedList
    while current.next != nil {
      current = current.next!
    }
    for value in values {
      current.next = Program.LinkedList(value: value)
      current = current.next!
    }
    return linkedList
  }

  func getNodesInArray(_ linkedList: Program.LinkedList?) -> [Int] {
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
        linkedList = LinkedList(0).addMany([1, 2, 3, 4, 5])
        expectedNodes = [1, 0, 3, 2, 5, 4]
        output = program.nodeSwap(linkedList)
        self.assertEqual(output.getNodesInArray(), expectedNodes)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# This is an input class. Do not edit.
class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None


# O(n) time | O(n) space - where n is the number of nodes in the Linked List
def nodeSwap(head):
    if head is None or head.next is None:
        return head

    nextNode = head.next
    head.next = nodeSwap(head.next.next)
    nextNode.next = head
    return nextNode

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# This is an input class. Do not edit.
class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None


# O(n) time | O(1) space - where n is the number of nodes in the Linked List
def nodeSwap(head):
    tempNode = LinkedList(0)
    tempNode.next = head

    prevNode = tempNode
    while prevNode.next is not None and prevNode.next.next is not None:
        firstNode = prevNode.next
        secondNode = prevNode.next.next
        # prevNode -> firstNode -> secondNode -> x

        firstNode.next = secondNode.next
        secondNode.next = firstNode
        prevNode.next = secondNode
        # prevNode -> secondNode -> firstNode -> x

        prevNode = firstNode

    return tempNode.next

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
        linkedList = LinkedList(0).addMany([1, 2, 3, 4, 5])
        expectedNodes = [1, 0, 3, 2, 5, 4]
        output = program.nodeSwap(linkedList)
        self.assertEqual(output.getNodesInArray(), expectedNodes)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const linkedList = addMany(new program.LinkedList(0), [1, 2, 3, 4, 5]);
  const expectedNodes = [1, 0, 3, 2, 5, 4];
  const actual = program.nodeSwap(linkedList);
  chai.expect(getNodesInArray(actual!)).to.deep.equal(expectedNodes);
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

// O(n) time | O(n) space - where n is the number of nodes in the Linked List
export function nodeSwap(head: LinkedList | null) {
  if (head === null || head.next === null) return head;

  const nextNode = head.next;
  head.next = nodeSwap(head.next.next);
  nextNode.next = head;
  return nextNode;
}

```
### Solution 2 (typescript)
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
export function nodeSwap(head: LinkedList) {
  const tempNode = new LinkedList(0);
  tempNode.next = head;

  let prevNode = tempNode;
  while (prevNode.next !== null && prevNode.next.next !== null) {
    const firstNode = prevNode.next;
    const secondNode = prevNode.next.next;
    // prevNode -> firstNode -> secondNode -> x

    firstNode.next = secondNode.next;
    secondNode.next = firstNode;
    prevNode.next = secondNode;
    // prevNode -> secondNode -> firstNode -> x

    prevNode = firstNode;
  }

  return tempNode.next;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const linkedList = addMany(new program.LinkedList(0), [1, 2, 3, 4, 5]);
  const expectedNodes = [1, 0, 3, 2, 5, 4];
  const actual = program.nodeSwap(linkedList);
  chai.expect(getNodesInArray(actual!)).to.deep.equal(expectedNodes);
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

