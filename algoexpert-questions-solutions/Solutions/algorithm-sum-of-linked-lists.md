# Sum of Linked Lists
<div class="html">
<p>
  You're given two Linked Lists of potentially unequal length. Each Linked List
  represents a non-negative integer, where each node in the Linked List is a
  digit of that integer, and the first node in each Linked List always
  represents the least significant digit of the integer. Write a function that
  returns the head of a new Linked List that represents the sum of the integers
  represented by the two input Linked Lists.
</p>
<p>
  Each <span>LinkedList</span> node has an integer <span>value</span> as well as
  a <span>next</span> node pointing to the next node in the list or to
  <span>None</span> / <span>null</span> if it's the tail of the list. The
  <span>value</span> of each <span>LinkedList</span> node is always in the range
  of <span>0 - 9</span>.
</p>
<p>
  Note: your function must create and return a new Linked List, and you're not
  allowed to modify either of the input Linked Lists.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">linkedListOne</span> = 2 -> 4 -> 7 -> 1
<span class="CodeEditor-promptParameter">linkedListTwo</span> = 9 -> 4 -> 5
</pre>
<h3>Sample Output</h3>
<pre>
1 -> 9 -> 2 -> 2
<span class="CodeEditor-promptComment">// linkedListOne represents 1742</span>
<span class="CodeEditor-promptComment">// linkedListTwo represents 549</span>
<span class="CodeEditor-promptComment">// 1742 + 549 = 2291</span>
</pre>
</div>

Hint 1
<p>
  If you can determine the integers that each individual Linked List represents,
  then all you need to do is add these integers and create a new Linked List
  that represents the summed value.
</p>


Hint 2

<p>
  If you go with the approach mentioned in Hint #1, you'll need to break down
  the sum of the two Linked Lists' numbers into its individual digits. Once you
  know these digits, you can create a new Linked List using them. This approach
  is <i>fine</i>, but you can solve this problem more elegantly, with a single
  iteration through the Linked Lists.
</p>


Hint 3

<p>
  Is it necessary to know the entire numbers represented by both Linked Lists in
  order to calculate their sum? Think back to your elementary-school math class;
  how did you add two numbers together?
</p>


Hint 4

<p>
  Since each Linked List's digits are ordered from least significant digit to
  most significant digit, you can simply loop through both Linked Lists,
  consider the digits with the same significance, and add these digits together
  while keeping track of any <i>carry</i> that comes out of the addition. At
  each iteration, when you add the two Linked List digits, also add the carry
  from the previous iteration. Create a new Linked List node that stores the
  calculated value, and add that to your new Linked List. Keep iterating until
  you reach the end of both Linked Lists and have no remaining carry.
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
      auto ll1 = addMany(new LinkedList(2), {4, 7, 1});
      auto ll2 = addMany(new LinkedList(9), {4, 5});
      auto expected = addMany(new LinkedList(1), {9, 2, 2});
      auto actual = sumOfLinkedLists(ll1, ll2);
      assert(getNodesInArray(actual) == getNodesInArray(expected));
    });
  }
};

LinkedList *addMany(LinkedList *linkedList, vector<int> values) {
  auto current = linkedList;
  while (current->next != nullptr) {
    current = current->next;
  }
  for (int value : values) {
    current->next = new LinkedList(value);
    current = current->next;
  }
  return linkedList;
}

vector<int> getNodesInArray(LinkedList *linkedList) {
  vector<int> nodes;
  auto current = linkedList;
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

// O(max(n, m)) time | O(max(n, m)) space - where n is the length of the
// first Linked List and m is the length of the second Linked List
LinkedList *sumOfLinkedLists(LinkedList *linkedListOne,
                             LinkedList *linkedListTwo) {
  // This variable will store a dummy node whose .next
  // attribute will point to the head of our new LL.
  auto newLinkedListHeadPointer = new LinkedList(0);
  auto currentNode = newLinkedListHeadPointer;
  int carry = 0;

  auto nodeOne = linkedListOne;
  auto nodeTwo = linkedListTwo;
  while (nodeOne != nullptr || nodeTwo != nullptr || carry != 0) {
    int valueOne = nodeOne != nullptr ? nodeOne->value : 0;
    int valueTwo = nodeTwo != nullptr ? nodeTwo->value : 0;
    int sumOfValues = valueOne + valueTwo + carry;

    int newValue = sumOfValues % 10;
    auto newNode = new LinkedList(newValue);
    currentNode->next = newNode;
    currentNode = newNode;

    carry = sumOfValues / 10;
    nodeOne = nodeOne != nullptr ? nodeOne->next : nullptr;
    nodeTwo = nodeTwo != nullptr ? nodeTwo->next : nullptr;
  }

  return newLinkedListHeadPointer->next;
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
      auto ll1 = addMany(new LinkedList(2), {4, 7, 1});
      auto ll2 = addMany(new LinkedList(9), {4, 5});
      auto expected = addMany(new LinkedList(1), {9, 2, 2});
      auto actual = sumOfLinkedLists(ll1, ll2);
      assert(getNodesInArray(actual) == getNodesInArray(expected));
    });
  }
};

LinkedList *addMany(LinkedList *linkedList, vector<int> values) {
  auto current = linkedList;
  while (current->next != nullptr) {
    current = current->next;
  }
  for (int value : values) {
    current->next = new LinkedList(value);
    current = current->next;
  }
  return linkedList;
}

vector<int> getNodesInArray(LinkedList *linkedList) {
  vector<int> nodes;
  auto current = linkedList;
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

// AE_WRAPPER_V2


public class ProgramTest {
	[Test]
	public void TestCase1() {
		Program.LinkedList ll1 = addMany(new Program.LinkedList(2), new int[] {4, 7, 1});
		Program.LinkedList ll2 = addMany(new Program.LinkedList(9), new int[] {4, 5});
		Program.LinkedList expected =
		  addMany(new Program.LinkedList(1), new int[] {9, 2, 2});
		var actual = new Program().SumOfLinkedLists(ll1, ll2);
		Utils.AssertTrue(Enumerable.SequenceEqual(getNodesInArray(expected),
		  getNodesInArray(actual)));
	}

	public Program.LinkedList addMany(Program.LinkedList linkedList, int[] values) {
		var current = linkedList;
		while (current.next != null) {
			current = current.next;
		}
		foreach (var value in values) {
			current.next = new Program.LinkedList(value);
			current = current.next;
		}
		return linkedList;
	}

	public List<int> getNodesInArray(Program.LinkedList linkedList) {
		List<int> nodeValues = new List<int>();
		Program.LinkedList current = linkedList;
		while (current != null) {
			nodeValues.Add(current.value);
			current = current.next;
		}
		return nodeValues;
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
	// O(max(n, m)) time | O(max(n, m)) space - where n is the length of the
	// first Linked List and m is the length of the second Linked List
	public LinkedList SumOfLinkedLists(LinkedList linkedListOne, LinkedList linkedListTwo) {
		// This variable will store a dummy node whose .next
		// attribute will point to the head of our new LL.
		LinkedList newLinkedListHeadPointer = new LinkedList(0);
		LinkedList currentNode = newLinkedListHeadPointer;
		int carry = 0;

		LinkedList nodeOne = linkedListOne;
		LinkedList nodeTwo = linkedListTwo;

		while (nodeOne != null || nodeTwo != null || carry != 0) {
			int valueOne = (nodeOne != null) ? nodeOne.value : 0;
			int valueTwo = (nodeTwo != null) ? nodeTwo.value : 0;
			int sumOfValues = valueOne + valueTwo + carry;

			int newValue = sumOfValues % 10;
			LinkedList newNode = new LinkedList(newValue);
			currentNode.next = newNode;
			currentNode = newNode;

			carry = sumOfValues / 10;
			nodeOne = (nodeOne != null) ? nodeOne.next : null;
			nodeTwo = (nodeTwo != null) ? nodeTwo.next : null;
		}

		return newLinkedListHeadPointer.next;
	}
}


```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;
using System.Linq;
using System;

// AE_WRAPPER_V2


public class ProgramTest {
	[Test]
	public void TestCase1() {
		Program.LinkedList ll1 = addMany(new Program.LinkedList(2), new int[] {4, 7, 1});
		Program.LinkedList ll2 = addMany(new Program.LinkedList(9), new int[] {4, 5});
		Program.LinkedList expected =
		  addMany(new Program.LinkedList(1), new int[] {9, 2, 2});
		var actual = new Program().SumOfLinkedLists(ll1, ll2);
		Utils.AssertTrue(Enumerable.SequenceEqual(getNodesInArray(expected),
		  getNodesInArray(actual)));
	}

	public Program.LinkedList addMany(Program.LinkedList linkedList, int[] values) {
		var current = linkedList;
		while (current.next != null) {
			current = current.next;
		}
		foreach (var value in values) {
			current.next = new Program.LinkedList(value);
			current = current.next;
		}
		return linkedList;
	}

	public List<int> getNodesInArray(Program.LinkedList linkedList) {
		List<int> nodeValues = new List<int>();
		Program.LinkedList current = linkedList;
		while (current != null) {
			nodeValues.Add(current.value);
			current = current.next;
		}
		return nodeValues;
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
	ll1 := addMany(&LinkedList{Value: 2}, []int{4, 7, 1})
	ll2 := addMany(&LinkedList{Value: 9}, []int{4, 5})
	expected := addMany(&LinkedList{Value: 1}, []int{9, 2, 2})
	actual := SumOfLinkedLists(ll1, ll2)
	require.Equal(t, expected, actual)
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

// O(max(n, m)) time | O(max(n, m)) space - where n is the length of the
// first Linked List and m is the length of the second Linked List
func SumOfLinkedLists(linkedListOne *LinkedList, linkedListTwo *LinkedList) *LinkedList {
	// This variable will store a dummy node whose .next
	// attribute will point to the head of our new LL.
	newLinkedListHeadPointer := &LinkedList{Value: 0}
	currentNode := newLinkedListHeadPointer
	carry := 0

	nodeOne := linkedListOne
	nodeTwo := linkedListTwo
	for nodeOne != nil || nodeTwo != nil || carry != 0 {
		var valueOne, valueTwo int
		if nodeOne != nil {
			valueOne = nodeOne.Value
		}
		if nodeTwo != nil {
			valueTwo = nodeTwo.Value
		}
		sumOfValues := valueOne + valueTwo + carry

		newValue := sumOfValues % 10
		newNode := &LinkedList{Value: newValue}
		currentNode.Next = newNode
		currentNode = newNode

		carry = sumOfValues / 10
		if nodeOne != nil {
			nodeOne = nodeOne.Next
		}
		if nodeTwo != nil {
			nodeTwo = nodeTwo.Next
		}
	}

	return newLinkedListHeadPointer.Next
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	ll1 := addMany(&LinkedList{Value: 2}, []int{4, 7, 1})
	ll2 := addMany(&LinkedList{Value: 9}, []int{4, 5})
	expected := addMany(&LinkedList{Value: 1}, []int{9, 2, 2})
	actual := SumOfLinkedLists(ll1, ll2)
	require.Equal(t, expected, actual)
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

// AE_WRAPPER_V2

import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    Program.LinkedList ll1 = addMany(new Program.LinkedList(2), new int[] {4, 7, 1});
    Program.LinkedList ll2 = addMany(new Program.LinkedList(9), new int[] {4, 5});
    Program.LinkedList expected = addMany(new Program.LinkedList(1), new int[] {9, 2, 2});
    var actual = new Program().sumOfLinkedLists(ll1, ll2);
    Utils.assertTrue(getNodesInArray(expected).equals(getNodesInArray(actual)));
  }

  public Program.LinkedList addMany(Program.LinkedList linkedList, int[] values) {
    var current = linkedList;
    while (current.next != null) {
      current = current.next;
    }
    for (var value : values) {
      current.next = new Program.LinkedList(value);
      current = current.next;
    }
    return linkedList;
  }

  public ArrayList<Integer> getNodesInArray(Program.LinkedList linkedList) {
    ArrayList<Integer> nodeValues = new ArrayList<Integer>();
    Program.LinkedList current = linkedList;
    while (current != null) {
      nodeValues.add(current.value);
      current = current.next;
    }
    return nodeValues;
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
  // O(max(n, m)) time | O(max(n, m)) space - where n is the length of the
  // first Linked List and m is the length of the second Linked List
  public LinkedList sumOfLinkedLists(LinkedList linkedListOne, LinkedList linkedListTwo) {
    // This variable will store a dummy node whose .next
    // attribute will point to the head of our new LL.
    LinkedList newLinkedListHeadPointer = new LinkedList(0);
    LinkedList currentNode = newLinkedListHeadPointer;
    int carry = 0;

    LinkedList nodeOne = linkedListOne;
    LinkedList nodeTwo = linkedListTwo;

    while (nodeOne != null || nodeTwo != null || carry != 0) {
      int valueOne = (nodeOne != null) ? nodeOne.value : 0;
      int valueTwo = (nodeTwo != null) ? nodeTwo.value : 0;
      int sumOfValues = valueOne + valueTwo + carry;

      int newValue = sumOfValues % 10;
      LinkedList newNode = new LinkedList(newValue);
      currentNode.next = newNode;
      currentNode = newNode;

      carry = sumOfValues / 10;
      nodeOne = (nodeOne != null) ? nodeOne.next : null;
      nodeTwo = (nodeTwo != null) ? nodeTwo.next : null;
    }

    return newLinkedListHeadPointer.next;
  }
}

```
### Unit Tests 1 (java)
```java
// AE_WRAPPER_V2

import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    Program.LinkedList ll1 = addMany(new Program.LinkedList(2), new int[] {4, 7, 1});
    Program.LinkedList ll2 = addMany(new Program.LinkedList(9), new int[] {4, 5});
    Program.LinkedList expected = addMany(new Program.LinkedList(1), new int[] {9, 2, 2});
    var actual = new Program().sumOfLinkedLists(ll1, ll2);
    Utils.assertTrue(getNodesInArray(expected).equals(getNodesInArray(actual)));
  }

  public Program.LinkedList addMany(Program.LinkedList linkedList, int[] values) {
    var current = linkedList;
    while (current.next != null) {
      current = current.next;
    }
    for (var value : values) {
      current.next = new Program.LinkedList(value);
      current = current.next;
    }
    return linkedList;
  }

  public ArrayList<Integer> getNodesInArray(Program.LinkedList linkedList) {
    ArrayList<Integer> nodeValues = new ArrayList<Integer>();
    Program.LinkedList current = linkedList;
    while (current != null) {
      nodeValues.add(current.value);
      current = current.next;
    }
    return nodeValues;
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
  const ll1 = new LinkedList(2).addMany([4, 7, 1]);
  const ll2 = new LinkedList(9).addMany([4, 5]);
  const expected = new LinkedList(1).addMany([9, 2, 2]);
  const actual = program.sumOfLinkedLists(ll1, ll2);
  chai.expect(getNodesInArray(actual)).to.deep.equal(getNodesInArray(expected));
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

// O(max(n, m)) time | O(max(n, m)) space - where n is the length of the
// first Linked List and m is the length of the second Linked List
function sumOfLinkedLists(linkedListOne, linkedListTwo) {
  // This variable will store a dummy node whose .next
  // attribute will point to the head of our new LL.
  const newLinkedListHeadPointer = new LinkedList(0);
  let currentNode = newLinkedListHeadPointer;
  let carry = 0;

  let nodeOne = linkedListOne;
  let nodeTwo = linkedListTwo;
  while (nodeOne !== null || nodeTwo !== null || carry !== 0) {
    const valueOne = nodeOne !== null ? nodeOne.value : 0;
    const valueTwo = nodeTwo !== null ? nodeTwo.value : 0;
    const sumOfValues = valueOne + valueTwo + carry;

    const newValue = sumOfValues % 10;
    const newNode = new LinkedList(newValue);
    currentNode.next = newNode;
    currentNode = newNode;

    carry = Math.floor(sumOfValues / 10);
    nodeOne = nodeOne !== null ? nodeOne.next : null;
    nodeTwo = nodeTwo !== null ? nodeTwo.next : null;
  }

  return newLinkedListHeadPointer.next;
}

// Do not edit the lines below.
exports.LinkedList = LinkedList;
exports.sumOfLinkedLists = sumOfLinkedLists;

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
  const ll1 = new LinkedList(2).addMany([4, 7, 1]);
  const ll2 = new LinkedList(9).addMany([4, 5]);
  const expected = new LinkedList(1).addMany([9, 2, 2]);
  const actual = program.sumOfLinkedLists(ll1, ll2);
  chai.expect(getNodesInArray(actual)).to.deep.equal(getNodesInArray(expected));
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.LinkedList
import com.algoexpert.program.sumOfLinkedLists

class ProgramTest {
    @Test
    fun TestCase1() {
        val ll1 = addMany(LinkedList(2), listOf(4, 7, 1))
        val ll2 = addMany(LinkedList(9), listOf(4, 5))
        val expected = addMany(LinkedList(1), listOf(9, 2, 2))
        val output = sumOfLinkedLists(ll1, ll2)
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

// O(max(n, m)) time | O(max(n, m)) space - where n is the length of the 
// first Linked List and m is the length of the second Linked List
fun sumOfLinkedLists(linkedListOne: LinkedList, linkedListTwo: LinkedList): LinkedList {
    // This variable will store a dummy node whose .next 
    // attribute will point to the head of our new LL.
    val newLinkedListHeadPointer = LinkedList(0)
    var currentNode = newLinkedListHeadPointer
    var carry = 0

    var nodeOne: LinkedList? = linkedListOne
    var nodeTwo: LinkedList? = linkedListTwo
    while (nodeOne != null || nodeTwo != null || carry != 0) {
        val valueOne = if (nodeOne != null) nodeOne.value else 0
        val valueTwo = if (nodeTwo != null) nodeTwo.value else 0
        val sumOfValues = valueOne + valueTwo + carry

        val newValue = sumOfValues % 10
        val newNode = LinkedList(newValue)
        currentNode.next = newNode
        currentNode = newNode

        carry = sumOfValues / 10
        nodeOne = if (nodeOne != null) nodeOne.next else null
        nodeTwo = if (nodeTwo != null) nodeTwo.next else null
    }

    return newLinkedListHeadPointer.next!!
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.LinkedList
import com.algoexpert.program.sumOfLinkedLists

class ProgramTest {
    @Test
    fun TestCase1() {
        val ll1 = addMany(LinkedList(2), listOf(4, 7, 1))
        val ll2 = addMany(LinkedList(9), listOf(4, 5))
        val expected = addMany(LinkedList(1), listOf(9, 2, 2))
        val output = sumOfLinkedLists(ll1, ll2)
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
      var ll1 = addMany(Program.LinkedList(value: 2), [4, 7, 1])
      var ll2 = addMany(Program.LinkedList(value: 9), [4, 5])
      var expected = addMany(Program.LinkedList(value: 1), [9, 2, 2])
      var actual = Program().sumOfLinkedLists(ll1, ll2)
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

  // O(max(n, m)) time | O(max(n, m)) space - where n is the length of the
  // first Linked List and m is the length of the second Linked List
  func sumOfLinkedLists(_ linkedListOne: LinkedList, _ linkedListTwo: LinkedList) -> LinkedList {
    // This variable will store a dummy node whose .next
    // attribute will point to the head of our new LL.
    var newLinkedListHeadPointer = LinkedList(value: 0)
    var currentNode = newLinkedListHeadPointer
    var carry = 0

    var nodeOne: LinkedList? = linkedListOne
    var nodeTwo: LinkedList? = linkedListTwo
    while nodeOne != nil || nodeTwo != nil || carry != 0 {
      var valueOne = 0
      var valueTwo = 0
      if nodeOne != nil {
        valueOne = nodeOne!.value
      }
      if nodeTwo != nil {
        valueTwo = nodeTwo!.value
      }
      let sumOfValues = valueOne + valueTwo + carry

      let newValue = sumOfValues % 10
      let newNode = LinkedList(value: newValue)
      currentNode.next = newNode
      currentNode = newNode

      carry = sumOfValues / 10
      if nodeOne != nil {
        nodeOne = nodeOne!.next
      }
      if nodeTwo != nil {
        nodeTwo = nodeTwo!.next
      }
    }

    return newLinkedListHeadPointer.next!
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var ll1 = addMany(Program.LinkedList(value: 2), [4, 7, 1])
      var ll2 = addMany(Program.LinkedList(value: 9), [4, 5])
      var expected = addMany(Program.LinkedList(value: 1), [9, 2, 2])
      var actual = Program().sumOfLinkedLists(ll1, ll2)
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


def getNodesInArray(output):
    nodes = []
    current = output
    while current is not None:
        nodes.append(current.value)
        current = current.next
    return nodes


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        ll1 = LinkedList(2).addMany([4, 7, 1])
        ll2 = LinkedList(9).addMany([4, 5])
        expected = LinkedList(1).addMany([9, 2, 2])
        actual = program.sumOfLinkedLists(ll1, ll2)
        self.assertEqual(getNodesInArray(actual), getNodesInArray(expected))

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# This is an input class. Do not edit.
class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None


# O(max(n, m)) time | O(max(n, m)) space - where n is the length of the
# first Linked List and m is the length of the second Linked List
def sumOfLinkedLists(linkedListOne, linkedListTwo):
    # This variable will store a dummy node whose .next
    # attribute will point to the head of our new LL.
    newLinkedListHeadPointer = LinkedList(0)
    currentNode = newLinkedListHeadPointer
    carry = 0

    nodeOne = linkedListOne
    nodeTwo = linkedListTwo
    while nodeOne is not None or nodeTwo is not None or carry != 0:
        valueOne = nodeOne.value if nodeOne is not None else 0
        valueTwo = nodeTwo.value if nodeTwo is not None else 0
        sumOfValues = valueOne + valueTwo + carry

        newValue = sumOfValues % 10
        newNode = LinkedList(newValue)
        currentNode.next = newNode
        currentNode = newNode

        carry = sumOfValues // 10
        nodeOne = nodeOne.next if nodeOne is not None else None
        nodeTwo = nodeTwo.next if nodeTwo is not None else None

    return newLinkedListHeadPointer.next

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


def getNodesInArray(output):
    nodes = []
    current = output
    while current is not None:
        nodes.append(current.value)
        current = current.next
    return nodes


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        ll1 = LinkedList(2).addMany([4, 7, 1])
        ll2 = LinkedList(9).addMany([4, 5])
        expected = LinkedList(1).addMany([9, 2, 2])
        actual = program.sumOfLinkedLists(ll1, ll2)
        self.assertEqual(getNodesInArray(actual), getNodesInArray(expected))

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const ll1 = addMany(new program.LinkedList(2), [4, 7, 1]);
  const ll2 = addMany(new program.LinkedList(9), [4, 5]);
  const expected = addMany(new program.LinkedList(1), [9, 2, 2]);
  const actual = program.sumOfLinkedLists(ll1, ll2);
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

function getNodesInArray(linkedList: program.LinkedList | null) {
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

// O(max(n, m)) time | O(max(n, m)) space - where n is the length of the
// first Linked List and m is the length of the second Linked List
export function sumOfLinkedLists(linkedListOne: LinkedList, linkedListTwo: LinkedList) {
  // This variable will store a dummy node whose .next
  // attribute will point to the head of our new LL.
  const newLinkedListHeadPointer = new LinkedList(0);
  let currentNode = newLinkedListHeadPointer;
  let carry = 0;

  let nodeOne: LinkedList | null = linkedListOne;
  let nodeTwo: LinkedList | null = linkedListTwo;
  while (nodeOne !== null || nodeTwo !== null || carry !== 0) {
    const valueOne = nodeOne !== null ? nodeOne.value : 0;
    const valueTwo = nodeTwo !== null ? nodeTwo.value : 0;
    const sumOfValues = valueOne + valueTwo + carry;

    const newValue = sumOfValues % 10;
    const newNode = new LinkedList(newValue);
    currentNode.next = newNode;
    currentNode = newNode;

    carry = Math.floor(sumOfValues / 10);
    nodeOne = nodeOne !== null ? nodeOne.next : null;
    nodeTwo = nodeTwo !== null ? nodeTwo.next : null;
  }

  return newLinkedListHeadPointer.next;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const ll1 = addMany(new program.LinkedList(2), [4, 7, 1]);
  const ll2 = addMany(new program.LinkedList(9), [4, 5]);
  const expected = addMany(new program.LinkedList(1), [9, 2, 2]);
  const actual = program.sumOfLinkedLists(ll1, ll2);
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

function getNodesInArray(linkedList: program.LinkedList | null) {
  const nodes: number[] = [];
  let current: program.LinkedList | null = linkedList;
  while (current !== null) {
    nodes.push(current.value);
    current = current.next;
  }
  return nodes;
}

```

