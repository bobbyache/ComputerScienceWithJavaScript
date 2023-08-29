# Linked List Palindrome
<div class="html">
<p>
  Write a function that takes in the head of a Singly Linked List and returns a
  boolean representing whether the linked list's nodes form a palindrome. Your
  function shouldn't make use of any auxiliary data structure.
</p>
<p>
  A palindrome is usually defined as a string that's written the same forward
  and backward. For a linked list's nodes to form a palindrome, their values
  must be the same when read from left to right and from right to left. Note
  that single-character strings are palindromes, which means that single-node
  linked lists form palindromes.
</p>
<p>
  Each <span>LinkedList</span> node has an integer <span>value</span> as well as
  a <span>next</span> node pointing to the next node in the list or to
  <span>None</span> / <span>null</span> if it's the tail of the list.
</p>
<p>
  You can assume that the input linked list will always have at least one node;
  in other words, the head will never be <span>None</span> / <span>null</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">head</span> = 0 -> 1 -> 2 -> 2 -> 1 -> 0 <span class="CodeEditor-promptComment">// the head node with value 0</span>
</pre>
<h3>Sample Output</h3>
<pre>
true
</pre>
</div>

Hint 1
<p>
Think about comparing two nodes at a time. To determine if the linked list's nodes form a palindrome, which two nodes should we compare?
</p>


Hint 2

<p>
Following Hint #1, to determine if the linked list's nodes form a palindrome, we'll want to compare the first and last node, the second and second-to-last node, the third and third-to-last node, etc.. How can we compare all of these nodes recursively?
</p>


Hint 3

<p>
Putting aside the recursive solution hinted at in Hint #2, we can solve this problem iteratively and with no auxiliary space if we know how to reverse a linked list. How can reversing the linked list (or part of it) help us solve this problem?
</p>


Hint 4

<p>
Try reversing the second half of the linked list and then comparing nodes in the first half and in the reversed second half by simply iterating through both halves at the same time. You'll have to figure out where the second half of the linked list begins in order to reverse it.
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
      LinkedList *head = new LinkedList(0);
      head->next = new LinkedList(1);
      head->next->next = new LinkedList(2);
      head->next->next->next = new LinkedList(2);
      head->next->next->next->next = new LinkedList(1);
      head->next->next->next->next->next = new LinkedList(0);
      bool expected = true;
      bool actual = linkedListPalindrome(head);
      assert(expected == actual);
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
    this->next = nullptr;
  }
};

struct LinkedListInfo {
  bool outerNodesAreEqual;
  LinkedList *leftNodeToCompare;
};

LinkedListInfo isPalindrome(LinkedList *leftNode, LinkedList *rightNode);

// O(n) time | O(n) space - where n is the number of nodes in the Linked List
bool linkedListPalindrome(LinkedList *head) {
  LinkedListInfo isPalindromeResults = isPalindrome(head, head);
  return isPalindromeResults.outerNodesAreEqual;
}

LinkedListInfo isPalindrome(LinkedList *leftNode, LinkedList *rightNode) {
  if (rightNode == nullptr) {
    return LinkedListInfo{true, leftNode};
  }

  LinkedListInfo recursiveCallResults = isPalindrome(leftNode, rightNode->next);
  LinkedList *leftNodeToCompare = recursiveCallResults.leftNodeToCompare;
  bool outerNodesAreEqual = recursiveCallResults.outerNodesAreEqual;

  bool recursiveIsEqual =
      outerNodesAreEqual && leftNodeToCompare->value == rightNode->value;
  LinkedList *nextLeftNodeToCompare = leftNodeToCompare->next;

  return LinkedListInfo{recursiveIsEqual, nextLeftNodeToCompare};
}

```
### Solution 2 (cpp)
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

LinkedList *reverseLinkedList(LinkedList *head);

// O(n) time | O(1) space - where n is the number of nodes in the Linked List
bool linkedListPalindrome(LinkedList *head) {
  LinkedList *slowNode = head;
  LinkedList *fastNode = head;
  while (fastNode != nullptr && fastNode->next != nullptr) {
    slowNode = slowNode->next;
    fastNode = fastNode->next->next;
  }

  LinkedList *reversedSecondHalfNode = reverseLinkedList(slowNode);
  LinkedList *firstHalfNode = head;

  while (reversedSecondHalfNode != nullptr) {
    if (reversedSecondHalfNode->value != firstHalfNode->value) {
      return false;
    }
    reversedSecondHalfNode = reversedSecondHalfNode->next;
    firstHalfNode = firstHalfNode->next;
  }

  return true;
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
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      LinkedList *head = new LinkedList(0);
      head->next = new LinkedList(1);
      head->next->next = new LinkedList(2);
      head->next->next->next = new LinkedList(2);
      head->next->next->next->next = new LinkedList(1);
      head->next->next->next->next->next = new LinkedList(0);
      bool expected = true;
      bool actual = linkedListPalindrome(head);
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

using System.Collections.Generic;
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		var head = new Program.LinkedList(0);
		head.next = new Program.LinkedList(1);
		head.next.next = new Program.LinkedList(2);
		head.next.next.next = new Program.LinkedList(2);
		head.next.next.next.next = new Program.LinkedList(1);
		head.next.next.next.next.next = new Program.LinkedList(0);
		var expected = true;
		var actual = new Program().LinkedListPalindrome(head);
		Utils.AssertTrue(expected == actual);
	}
}


```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {

	// O(n) time | O(n) space - where n is the number of nodes in the Linked List
	public bool LinkedListPalindrome(LinkedList head) {
		LinkedListInfo isPalindromeResults = isPalindrome(head, head);
		return isPalindromeResults.outerNodesAreEqual;
	}

	public LinkedListInfo isPalindrome(LinkedList leftNode, LinkedList rightNode) {
		if (rightNode == null) return new LinkedListInfo(true, leftNode);

		LinkedListInfo recursiveCallResults = isPalindrome(leftNode, rightNode.next);
		LinkedList leftNodeToCompare = recursiveCallResults.leftNodeToCompare;
		bool outerNodesAreEqual = recursiveCallResults.outerNodesAreEqual;

		bool recursiveIsEqual = outerNodesAreEqual &&
		  (leftNodeToCompare.value == rightNode.value);
		LinkedList nextLeftNodeToCompare = leftNodeToCompare.next;

		return new LinkedListInfo(recursiveIsEqual, nextLeftNodeToCompare);
	}

	public class LinkedListInfo {
		public bool outerNodesAreEqual;
		public LinkedList leftNodeToCompare;
		public LinkedListInfo(bool outerNodesAreEqual, LinkedList leftNodeToCompare) {
			this.outerNodesAreEqual = outerNodesAreEqual;
			this.leftNodeToCompare = leftNodeToCompare;
		}
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
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {

	// O(n) time | O(1) space - where n is the number of nodes in the Linked List
	public bool LinkedListPalindrome(LinkedList head) {
		LinkedList slowNode = head;
		LinkedList fastNode = head;

		while (fastNode != null && fastNode.next != null) {
			slowNode = slowNode.next;
			fastNode = fastNode.next.next;
		}

		LinkedList reversedSecondHalfNode = reverseLinkedList(slowNode);
		LinkedList firstHalfNode = head;

		while (reversedSecondHalfNode != null) {
			if (reversedSecondHalfNode.value != firstHalfNode.value) return false;
			reversedSecondHalfNode = reversedSecondHalfNode.next;
			firstHalfNode = firstHalfNode.next;
		}

		return true;
	}

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
using System.Collections.Generic;
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		var head = new Program.LinkedList(0);
		head.next = new Program.LinkedList(1);
		head.next.next = new Program.LinkedList(2);
		head.next.next.next = new Program.LinkedList(2);
		head.next.next.next.next = new Program.LinkedList(1);
		head.next.next.next.next.next = new Program.LinkedList(0);
		var expected = true;
		var actual = new Program().LinkedListPalindrome(head);
		Utils.AssertTrue(expected == actual);
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
	head := &LinkedList{Value: 0}
	head.Next = &LinkedList{Value: 1}
	head.Next.Next = &LinkedList{Value: 2}
	head.Next.Next.Next = &LinkedList{Value: 2}
	head.Next.Next.Next.Next = &LinkedList{Value: 1}
	head.Next.Next.Next.Next.Next = &LinkedList{Value: 0}
	expected := true
	actual := LinkedListPalindrome(head)
	require.Equal(t, expected, actual)
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

type LinkedListInfo struct {
	outerNodesAreEqual bool
	leftNodeToCompare  *LinkedList
}

// O(n) time | O(n) space - where n is the number of nodes in the Linked List
func LinkedListPalindrome(head *LinkedList) bool {
	isPalindromeResults := isPalindrome(head, head)
	return isPalindromeResults.outerNodesAreEqual
}

func isPalindrome(leftNode *LinkedList, rightNode *LinkedList) LinkedListInfo {
	if rightNode == nil {
		return LinkedListInfo{true, leftNode}
	}

	recursiveCallResults := isPalindrome(leftNode, rightNode.Next)
	leftNodeToCompare := recursiveCallResults.leftNodeToCompare
	outerNodesAreEqual := recursiveCallResults.outerNodesAreEqual

	recursiveIsEqual := outerNodesAreEqual && leftNodeToCompare.Value == rightNode.Value
	nextLeftNodeToCompare := leftNodeToCompare.Next

	return LinkedListInfo{recursiveIsEqual, nextLeftNodeToCompare}
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type LinkedList struct {
	Value int
	Next  *LinkedList
}

type LinkedListInfo struct {
	outerNodesAreEqual bool
	leftNodeToCompare  *LinkedList
}

// O(n) time | O(1) space - where n is the number of nodes in the Linked List
func LinkedListPalindrome(head *LinkedList) bool {
	slowNode := head
	fastNode := head
	for fastNode != nil && fastNode.Next != nil {
		slowNode = slowNode.Next
		fastNode = fastNode.Next.Next
	}

	reversedSecondHalfNode := reverseLinkedList(slowNode)
	firstHalfNode := head

	for reversedSecondHalfNode != nil {
		if reversedSecondHalfNode.Value != firstHalfNode.Value {
			return false
		}
		reversedSecondHalfNode = reversedSecondHalfNode.Next
		firstHalfNode = firstHalfNode.Next
	}

	return true
}

func reverseLinkedList(head *LinkedList) *LinkedList {
	var previousNode *LinkedList = nil
	var currentNode = head
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
	head := &LinkedList{Value: 0}
	head.Next = &LinkedList{Value: 1}
	head.Next.Next = &LinkedList{Value: 2}
	head.Next.Next.Next = &LinkedList{Value: 2}
	head.Next.Next.Next.Next = &LinkedList{Value: 1}
	head.Next.Next.Next.Next.Next = &LinkedList{Value: 0}
	expected := true
	actual := LinkedListPalindrome(head)
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
    var head = new Program.LinkedList(0);
    head.next = new Program.LinkedList(1);
    head.next.next = new Program.LinkedList(2);
    head.next.next.next = new Program.LinkedList(2);
    head.next.next.next.next = new Program.LinkedList(1);
    head.next.next.next.next.next = new Program.LinkedList(0);
    var expected = true;
    var actual = new Program().linkedListPalindrome(head);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n) time | O(n) space - where n is the number of nodes in the Linked List
  public boolean linkedListPalindrome(LinkedList head) {
    LinkedListInfo isPalindromeResults = isPalindrome(head, head);
    return isPalindromeResults.outerNodesAreEqual;
  }

  public LinkedListInfo isPalindrome(LinkedList leftNode, LinkedList rightNode) {
    if (rightNode == null) return new LinkedListInfo(true, leftNode);

    LinkedListInfo recursiveCallResults = isPalindrome(leftNode, rightNode.next);
    LinkedList leftNodeToCompare = recursiveCallResults.leftNodeToCompare;
    boolean outerNodesAreEqual = recursiveCallResults.outerNodesAreEqual;

    boolean recursiveIsEqual = outerNodesAreEqual && (leftNodeToCompare.value == rightNode.value);
    LinkedList nextLeftNodeToCompare = leftNodeToCompare.next;

    return new LinkedListInfo(recursiveIsEqual, nextLeftNodeToCompare);
  }

  static class LinkedListInfo {
    public boolean outerNodesAreEqual;
    public LinkedList leftNodeToCompare;

    public LinkedListInfo(boolean outerNodesAreEqual, LinkedList leftNodeToCompare) {
      this.outerNodesAreEqual = outerNodesAreEqual;
      this.leftNodeToCompare = leftNodeToCompare;
    }
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
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n) time | O(1) space - where n is the number of nodes in the Linked List
  public boolean linkedListPalindrome(LinkedList head) {
    LinkedList slowNode = head;
    LinkedList fastNode = head;

    while (fastNode != null && fastNode.next != null) {
      slowNode = slowNode.next;
      fastNode = fastNode.next.next;
    }

    LinkedList reversedSecondHalfNode = reverseLinkedList(slowNode);
    LinkedList firstHalfNode = head;

    while (reversedSecondHalfNode != null) {
      if (reversedSecondHalfNode.value != firstHalfNode.value) return false;
      reversedSecondHalfNode = reversedSecondHalfNode.next;
      firstHalfNode = firstHalfNode.next;
    }

    return true;
  }

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
    var head = new Program.LinkedList(0);
    head.next = new Program.LinkedList(1);
    head.next.next = new Program.LinkedList(2);
    head.next.next.next = new Program.LinkedList(2);
    head.next.next.next.next = new Program.LinkedList(1);
    head.next.next.next.next.next = new Program.LinkedList(0);
    var expected = true;
    var actual = new Program().linkedListPalindrome(head);
    Utils.assertTrue(expected == actual);
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
  const head = new program.LinkedList(0);
  head.next = new program.LinkedList(1);
  head.next.next = new program.LinkedList(2);
  head.next.next.next = new program.LinkedList(2);
  head.next.next.next.next = new program.LinkedList(1);
  head.next.next.next.next.next = new program.LinkedList(0);
  const expected = true;
  const actual = program.linkedListPalindrome(head);
  chai.expect(actual).to.deep.equal(expected);
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

// O(n) time | O(n) space - where n is the number of nodes in the Linked List
function linkedListPalindrome(head) {
  const isPalindromeResults = isPalindrome(head, head);
  return isPalindromeResults.outerNodesAreEqual;
}

function isPalindrome(leftNode, rightNode) {
  if (rightNode === null) {
    return new LinkedListInfo(true, leftNode);
  }

  const recursiveCallResults = isPalindrome(leftNode, rightNode.next);
  const {leftNodeToCompare, outerNodesAreEqual} = recursiveCallResults;

  const recursiveIsEqual = outerNodesAreEqual && leftNodeToCompare.value === rightNode.value;
  const nextLeftNodeToCompare = leftNodeToCompare.next;

  return new LinkedListInfo(recursiveIsEqual, nextLeftNodeToCompare);
}

class LinkedListInfo {
  constructor(outerNodesAreEqual, leftNodeToCompare) {
    this.outerNodesAreEqual = outerNodesAreEqual;
    this.leftNodeToCompare = leftNodeToCompare;
  }
}

// Do not edit the line below.
exports.linkedListPalindrome = linkedListPalindrome;
exports.LinkedList = LinkedList;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// O(n) time | O(1) space - where n is the number of nodes in the Linked List
function linkedListPalindrome(head) {
  let slowNode = head;
  let fastNode = head;
  while (fastNode !== null && fastNode.next !== null) {
    slowNode = slowNode.next;
    fastNode = fastNode.next.next;
  }

  let reversedSecondHalfNode = reverseLinkedList(slowNode);
  let firstHalfNode = head;

  while (reversedSecondHalfNode !== null) {
    if (reversedSecondHalfNode.value !== firstHalfNode.value) {
      return false;
    }
    reversedSecondHalfNode = reversedSecondHalfNode.next;
    firstHalfNode = firstHalfNode.next;
  }

  return true;
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

exports.linkedListPalindrome = linkedListPalindrome;
exports.LinkedList = LinkedList;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const head = new program.LinkedList(0);
  head.next = new program.LinkedList(1);
  head.next.next = new program.LinkedList(2);
  head.next.next.next = new program.LinkedList(2);
  head.next.next.next.next = new program.LinkedList(1);
  head.next.next.next.next.next = new program.LinkedList(0);
  const expected = true;
  const actual = program.linkedListPalindrome(head);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.LinkedList
import com.algoexpert.program.linkedListPalindrome

class ProgramTest {
    @Test
    fun TestCase1() {
        val head = addMany(LinkedList(0), listOf(1, 2, 2, 1, 0))
        val expected = true
        val output = linkedListPalindrome(head)
        assert(expected == output)
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

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

open class LinkedList(value: Int) {
    var value = value
    var next: LinkedList? = null
}

open class LinkedListInfo(outerNodesAreEqual: Boolean, leftNodeToCompare: LinkedList?) {
    val outerNodesAreEqual = outerNodesAreEqual
    val leftNodeToCompare = leftNodeToCompare
}

// O(n) time | O(n) space - where n is the number of nodes in the Linked List
fun linkedListPalindrome(head: LinkedList): Boolean {
    val isPalindromeResults = isPalindrome(head, head)
    return isPalindromeResults.outerNodesAreEqual
}

fun isPalindrome(leftNode: LinkedList, rightNode: LinkedList?): LinkedListInfo {
    if (rightNode == null) return LinkedListInfo(true, leftNode)

    val recursiveCallResults = isPalindrome(leftNode, rightNode.next)
    val leftNodeToCompare = recursiveCallResults.leftNodeToCompare!!
    val outerNodesAreEqual = recursiveCallResults.outerNodesAreEqual

    val recursiveIsEqual = outerNodesAreEqual && leftNodeToCompare.value == rightNode.value
    val nextLeftNodeToCompare = leftNodeToCompare.next

    return LinkedListInfo(recursiveIsEqual, nextLeftNodeToCompare)
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

open class LinkedList(value: Int) {
    var value = value
    var next: LinkedList? = null
}

// O(n) time | O(1) space - where n is the number of nodes in the Linked List
fun linkedListPalindrome(head: LinkedList): Boolean {
    var slowNode = head
    var fastNode: LinkedList? = head
    while (fastNode != null && fastNode.next != null) {
        slowNode = slowNode.next!!
        fastNode = fastNode.next!!.next
    }

    var reversedSecondHalfNode: LinkedList? = reverseLinkedList(slowNode)
    var firstHalfNode: LinkedList? = head

    while (reversedSecondHalfNode != null) {
        if (reversedSecondHalfNode.value != firstHalfNode!!.value) return false
        reversedSecondHalfNode = reversedSecondHalfNode.next
        firstHalfNode = firstHalfNode!!.next
    }

    return true
}

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
import com.algoexpert.program.LinkedList
import com.algoexpert.program.linkedListPalindrome

class ProgramTest {
    @Test
    fun TestCase1() {
        val head = addMany(LinkedList(0), listOf(1, 2, 2, 1, 0))
        val expected = true
        val output = linkedListPalindrome(head)
        assert(expected == output)
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

```
### Sandbox Code (swift)
```swift
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var head = Program.LinkedList(value: 0)
      head.next = Program.LinkedList(value: 1)
      head.next!.next = Program.LinkedList(value: 2)
      head.next!.next!.next = Program.LinkedList(value: 2)
      head.next!.next!.next!.next = Program.LinkedList(value: 1)
      head.next!.next!.next!.next!.next = Program.LinkedList(value: 0)
      let expected = true
      var actual = Program().linkedListPalindrome(head)
      try assertEqual(expected, actual)
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
    }
  }

  class LinkedListInfo {
    var outerNodesAreEqual: Bool
    var leftNodeToCompare: LinkedList?

    init(_ outerNodesAreEqual: Bool, _ leftNodeToCompare: LinkedList?) {
      self.outerNodesAreEqual = outerNodesAreEqual
      self.leftNodeToCompare = leftNodeToCompare
    }
  }

  // O(n) time | O(n) space - where n is the number of nodes in the Linked List
  func linkedListPalindrome(_ head: LinkedList) -> Bool {
    let isPalindromeResults = isPalindrome(head, head)
    return isPalindromeResults.outerNodesAreEqual
  }

  func isPalindrome(_ leftNode: LinkedList?, _ rightNode: LinkedList?) -> LinkedListInfo {
    if rightNode == nil {
      return LinkedListInfo(true, leftNode)
    }

    let recursiveCallResults = isPalindrome(leftNode, rightNode!.next)
    let leftNodeToCompare = recursiveCallResults.leftNodeToCompare
    let outerNodesAreEqual = recursiveCallResults.outerNodesAreEqual

    let recursiveIsEqual = outerNodesAreEqual && leftNodeToCompare!.value == rightNode!.value
    let nextLeftNodeToCompare = leftNodeToCompare!.next
    return LinkedListInfo(recursiveIsEqual, nextLeftNodeToCompare)
  }
}

```
### Solution 2 (swift)
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

  // O(n) time | O(1) space - where n is the number of nodes in the Linked List
  func linkedListPalindrome(_ head: LinkedList) -> Bool {
    var slowNode: LinkedList? = head
    var fastNode: LinkedList? = head
    while fastNode != nil, fastNode!.next != nil {
      slowNode = slowNode!.next
      fastNode = fastNode!.next!.next
    }

    var reversedSecondHalfNode: LinkedList? = reverseLinkedList(slowNode)
    var firstHalfNode: LinkedList? = head

    while reversedSecondHalfNode != nil {
      if reversedSecondHalfNode!.value != firstHalfNode!.value {
        return false
      }
      reversedSecondHalfNode = reversedSecondHalfNode!.next
      firstHalfNode = firstHalfNode!.next
    }

    return true
  }

  func reverseLinkedList(_ head: LinkedList?) -> LinkedList? {
    var previousNode: LinkedList?
    var currentNode: LinkedList? = head
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
      var head = Program.LinkedList(value: 0)
      head.next = Program.LinkedList(value: 1)
      head.next!.next = Program.LinkedList(value: 2)
      head.next!.next!.next = Program.LinkedList(value: 2)
      head.next!.next!.next!.next = Program.LinkedList(value: 1)
      head.next!.next!.next!.next!.next = Program.LinkedList(value: 0)
      let expected = true
      var actual = Program().linkedListPalindrome(head)
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
        head = program.LinkedList(0)
        head.next = program.LinkedList(1)
        head.next.next = program.LinkedList(2)
        head.next.next.next = program.LinkedList(2)
        head.next.next.next.next = program.LinkedList(1)
        head.next.next.next.next.next = program.LinkedList(0)
        expected = True
        actual = program.linkedListPalindrome(head)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None


# O(n) time | O(n) space - where n is the number of nodes in the Linked List
def linkedListPalindrome(head):
    isPalindromeResults = isPalindrome(head, head)
    return isPalindromeResults.outerNodesAreEqual


def isPalindrome(leftNode, rightNode):
    if rightNode is None:
        return LinkedListInfo(True, leftNode)

    recursiveCallResults = isPalindrome(leftNode, rightNode.next)
    leftNodeToCompare = recursiveCallResults.leftNodeToCompare
    outerNodesAreEqual = recursiveCallResults.outerNodesAreEqual

    recursiveIsEqual = outerNodesAreEqual and leftNodeToCompare.value == rightNode.value
    nextLeftNodeToCompare = leftNodeToCompare.next

    return LinkedListInfo(recursiveIsEqual, nextLeftNodeToCompare)


class LinkedListInfo:
    def __init__(self, outerNodesAreEqual, leftNodeToCompare):
        self.outerNodesAreEqual = outerNodesAreEqual
        self.leftNodeToCompare = leftNodeToCompare

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None


# O(n) time | O(1) space - where n is the number of nodes in the Linked List
def linkedListPalindrome(head):
    slowNode = head
    fastNode = head
    while fastNode is not None and fastNode.next is not None:
        slowNode = slowNode.next
        fastNode = fastNode.next.next

    reversedSecondHalfNode = reverseLinkedList(slowNode)
    firstHalfNode = head

    while reversedSecondHalfNode is not None:
        if reversedSecondHalfNode.value != firstHalfNode.value:
            return False
        reversedSecondHalfNode = reversedSecondHalfNode.next
        firstHalfNode = firstHalfNode.next

    return True


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


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        head = program.LinkedList(0)
        head.next = program.LinkedList(1)
        head.next.next = program.LinkedList(2)
        head.next.next.next = program.LinkedList(2)
        head.next.next.next.next = program.LinkedList(1)
        head.next.next.next.next.next = program.LinkedList(0)
        expected = True
        actual = program.linkedListPalindrome(head)
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
  const head = new program.LinkedList(0);
  head.next = new program.LinkedList(1);
  head.next.next = new program.LinkedList(2);
  head.next.next.next = new program.LinkedList(2);
  head.next.next.next.next = new program.LinkedList(1);
  head.next.next.next.next.next = new program.LinkedList(0);
  const expected = true;
  const actual = program.linkedListPalindrome(head);
  chai.expect(actual).to.deep.equal(expected);
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

// O(n) time | O(n) space - where n is the number of nodes in the Linked List
export function linkedListPalindrome(head: LinkedList) {
  const isPalindromeResults = isPalindrome(head, head);
  return isPalindromeResults.outerNodesAreEqual;
}

function isPalindrome(leftNode: LinkedList, rightNode: LinkedList | null): LinkedListInfo {
  if (rightNode === null) {
    return new LinkedListInfo(true, leftNode);
  }

  const recursiveCallResults = isPalindrome(leftNode, rightNode.next);
  const leftNodeToCompare = recursiveCallResults.leftNodeToCompare!;
  const {outerNodesAreEqual} = recursiveCallResults;

  const recursiveIsEqual = outerNodesAreEqual && leftNodeToCompare.value === rightNode.value;
  const nextLeftNodeToCompare = leftNodeToCompare.next;

  return new LinkedListInfo(recursiveIsEqual, nextLeftNodeToCompare);
}

class LinkedListInfo {
  outerNodesAreEqual: boolean;
  leftNodeToCompare: LinkedList | null;

  constructor(outerNodesAreEqual: boolean, leftNodeToCompare: LinkedList | null) {
    this.outerNodesAreEqual = outerNodesAreEqual;
    this.leftNodeToCompare = leftNodeToCompare;
  }
}

```
### Solution 2 (typescript)
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
export function linkedListPalindrome(head: LinkedList) {
  let slowNode = head;
  let fastNode: LinkedList | null = head;
  while (fastNode !== null && fastNode.next !== null) {
    slowNode = slowNode.next!;
    fastNode = fastNode.next!.next;
  }

  let reversedSecondHalfNode: LinkedList | null = reverseLinkedList(slowNode);
  let firstHalfNode: LinkedList | null = head;

  while (reversedSecondHalfNode !== null) {
    if (reversedSecondHalfNode.value !== firstHalfNode!.value) {
      return false;
    }
    reversedSecondHalfNode = reversedSecondHalfNode.next;
    firstHalfNode = firstHalfNode!.next;
  }

  return true;
}

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

it('Test Case #1', function () {
  const head = new program.LinkedList(0);
  head.next = new program.LinkedList(1);
  head.next.next = new program.LinkedList(2);
  head.next.next.next = new program.LinkedList(2);
  head.next.next.next.next = new program.LinkedList(1);
  head.next.next.next.next.next = new program.LinkedList(0);
  const expected = true;
  const actual = program.linkedListPalindrome(head);
  chai.expect(actual).to.deep.equal(expected);
});

```

