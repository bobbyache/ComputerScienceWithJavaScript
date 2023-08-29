# Middle Node
<div class="html">
  <p>
    You're given a Linked List with at least one node. Write a function
    that returns the middle node of the Linked List. If there are two middle
    nodes (i.e. an even length list), your function should return the second
    of these nodes.
  </p>

  <p>
    Each <span>LinkedList</span> node has an integer <span>value</span> as well as
    a <span>next</span> node pointing to the next node in the list or to
    <span>None</span> / <span>null</span> if it's the tail of the list.
  </p>

  <h3>Sample Input</h3>
<pre><span class="CodeEditor-promptParameter">linkedList</span> = 2 -> 7 -> 3 -> 5</pre>
  <h3>Sample Output</h3>
<pre>3 -> 5 <span class="CodeEditor-promptComment">// The middle could be 7 or 3,
// we return the second middle node</span></pre>
</div>

Hint 1
<p>
  The middle node of a Linked List will always be at index <span>length / 2</span>.
</p>


Hint 2

<p>
  While the LinkedList class has no length, you can calculate it by simply
  iterating through the entire list.
</p>


Hint 3

<p>
  If you create a slow and a fast pointer, with the fast one iterating at twice
  the speed, the slow one will be in the middle when the fast one reaches the
  end.
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
      LinkedList *linkedList = new LinkedList(0);
      linkedList->next = new LinkedList(1);
      LinkedList *expected = new LinkedList(2);
      linkedList->next->next = expected;
      expected->next = new LinkedList(3);
      auto actual = middleNode(linkedList);
      assert(expected == actual);
    });
  }
};
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

// O(n) time | O(1) space - where n is the number of nodes in the linked list
LinkedList *middleNode(LinkedList *linkedList) {
  int count = 0;
  LinkedList *currentNode = linkedList;
  while (currentNode != nullptr) {
    count++;
    currentNode = currentNode->next;
  }

  LinkedList *middleNode = linkedList;
  for (int i = 0; i < count / 2; i++) {
    middleNode = middleNode->next;
  }
  return middleNode;
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

// O(n) time | O(1) space - where n is the number of nodes in the linked list
LinkedList *middleNode(LinkedList *linkedList) {
  LinkedList *slowNode = linkedList;
  LinkedList *fastNode = linkedList;
  while (fastNode != nullptr && fastNode->next != nullptr) {
    slowNode = slowNode->next;
    fastNode = fastNode->next->next;
  }

  return slowNode;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      LinkedList *linkedList = new LinkedList(0);
      linkedList->next = new LinkedList(1);
      LinkedList *expected = new LinkedList(2);
      linkedList->next->next = expected;
      expected->next = new LinkedList(3);
      auto actual = middleNode(linkedList);
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
using System.Linq;
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		Program.LinkedList linkedList = new Program.LinkedList(1);
		Program.LinkedList curr = linkedList;
		for (int i = 1; i < 4; i++) {
			curr.next = new Program.LinkedList(i);
			curr = curr.next;
		}

		List<int> expected = new List<int> {
			2, 3
		};
		var actual = new Program().MiddleNode(linkedList);
		Utils.AssertTrue(Enumerable.SequenceEqual(expected, toList(actual)));
	}

	private List<int> toList(Program.LinkedList linkedList) {
		List<int> list = new List<int>();
		Program.LinkedList curr = linkedList;
		while (curr != null) {
			list.Add(curr.value);
			curr = curr.next;
		}
		return list;
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

	// O(n) time | O(1) space - where n is the number of nodes in the linked list
	public LinkedList MiddleNode(LinkedList linkedList) {
		int count = 0;
		LinkedList currentNode = linkedList;
		while (currentNode != null) {
			count++;
			currentNode = currentNode.next;
		}

		LinkedList MiddleNode = linkedList;
		for (int i = 0; i < count / 2; i++) {
			MiddleNode = MiddleNode.next;
		}
		return MiddleNode;
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

	// O(n) time | O(1) space - where n is the number of nodes in the linked list
	public LinkedList MiddleNode(LinkedList linkedList) {
		LinkedList slowNode = linkedList;
		LinkedList fastNode = linkedList;
		while (fastNode != null && fastNode.next != null) {
			slowNode = slowNode.next;
			fastNode = fastNode.next.next;
		}

		return slowNode;
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
		Program.LinkedList linkedList = new Program.LinkedList(1);
		Program.LinkedList curr = linkedList;
		for (int i = 1; i < 4; i++) {
			curr.next = new Program.LinkedList(i);
			curr = curr.next;
		}

		List<int> expected = new List<int> {
			2, 3
		};
		var actual = new Program().MiddleNode(linkedList);
		Utils.AssertTrue(Enumerable.SequenceEqual(expected, toList(actual)));
	}

	private List<int> toList(Program.LinkedList linkedList) {
		List<int> list = new List<int>();
		Program.LinkedList curr = linkedList;
		while (curr != null) {
			list.Add(curr.value);
			curr = curr.next;
		}
		return list;
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
	linkedList := &LinkedList{Value: 0}
	linkedList.Next = &LinkedList{Value: 1}
	expected := &LinkedList{Value: 2}
	linkedList.Next.Next = expected
	expected.Next = &LinkedList{Value: 3}
	actual := MiddleNode(linkedList)
	require.Equal(t, expected, actual)
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

// O(n) time | O(1) space - where n is the number of nodes in the linked list
func MiddleNode(linkedList *LinkedList) *LinkedList {
	count := 0
	currentNode := linkedList

	for currentNode != nil {
		count += 1
		currentNode = currentNode.Next
	}

	middleNode := linkedList
	for i := 0; i < count/2; i++ {
		middleNode = middleNode.Next
	}
	return middleNode
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

// O(n) time | O(1) space - where n is the number of nodes in the linked list
func MiddleNode(linkedList *LinkedList) *LinkedList {
	slowNode := linkedList
	fastNode := linkedList
	for fastNode != nil && fastNode.Next != nil {
		slowNode = slowNode.Next
		fastNode = fastNode.Next.Next
	}

	return slowNode
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	linkedList := &LinkedList{Value: 0}
	linkedList.Next = &LinkedList{Value: 1}
	expected := &LinkedList{Value: 2}
	linkedList.Next.Next = expected
	expected.Next = &LinkedList{Value: 3}
	actual := MiddleNode(linkedList)
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
    Program.LinkedList linkedList = new Program.LinkedList(0);
    linkedList.next = new Program.LinkedList(1);
    Program.LinkedList expected = new Program.LinkedList(2);
    linkedList.next.next = expected;
    expected.next = new Program.LinkedList(3);
    var actual = new Program().middleNode(linkedList);
    Utils.assertTrue(expected.equals(actual));
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

  // O(n) time | O(1) space - where n is the number of nodes in the linked list
  public LinkedList middleNode(LinkedList linkedList) {
    int count = 0;
    LinkedList currentNode = linkedList;
    while (currentNode != null) {
      count++;
      currentNode = currentNode.next;
    }

    LinkedList middleNode = linkedList;
    for (int i = 0; i < count / 2; i++) {
      middleNode = middleNode.next;
    }
    return middleNode;
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

  // O(n) time | O(1) space - where n is the number of nodes in the linked list
  public LinkedList middleNode(LinkedList linkedList) {
    LinkedList slowNode = linkedList;
    LinkedList fastNode = linkedList;
    while (fastNode != null && fastNode.next != null) {
      slowNode = slowNode.next;
      fastNode = fastNode.next.next;
    }

    return slowNode;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    Program.LinkedList linkedList = new Program.LinkedList(0);
    linkedList.next = new Program.LinkedList(1);
    Program.LinkedList expected = new Program.LinkedList(2);
    linkedList.next.next = expected;
    expected.next = new Program.LinkedList(3);
    var actual = new Program().middleNode(linkedList);
    Utils.assertTrue(expected.equals(actual));
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
  const linkedList = new program.LinkedList(0);
  linkedList.next = new program.LinkedList(1);
  const expected = new program.LinkedList(2);
  linkedList.next.next = expected;
  expected.next = new program.LinkedList(3);
  const actual = program.middleNode(linkedList);
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

// O(n) time | O(1) space - where n is the number of nodes in the linked list
function middleNode(linkedList) {
  let count = 0;
  let currentNode = linkedList;
  while (currentNode !== null) {
    count++;
    currentNode = currentNode.next;
  }

  let middleNode = linkedList;
  for (let i = 0; i < Math.floor(count / 2); i++) {
    middleNode = middleNode.next;
  }
  return middleNode;
}

// Do not edit the lines below.
exports.LinkedList = LinkedList;
exports.middleNode = middleNode;

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

// O(n) time | O(1) space - where n is the number of nodes in the linked list
function middleNode(linkedList) {
  let slowNode = linkedList;
  let fastNode = linkedList;
  while (fastNode !== null && fastNode.next !== null) {
    slowNode = slowNode.next;
    fastNode = fastNode.next.next;
  }

  return slowNode;
}

// Do not edit the lines below.
exports.LinkedList = LinkedList;
exports.middleNode = middleNode;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const linkedList = new program.LinkedList(0);
  linkedList.next = new program.LinkedList(1);
  const expected = new program.LinkedList(2);
  linkedList.next.next = expected;
  expected.next = new program.LinkedList(3);
  const actual = program.middleNode(linkedList);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.middleNode
import com.algoexpert.program.LinkedList as LinkedList

class ProgramTest {
    @Test
    fun TestCase1() {
        val linkedList = LinkedList(0)
        linkedList.next = LinkedList(1)
        val expected = LinkedList(2)
        linkedList.next!!.next = expected
        expected.next = LinkedList(3)
        val output = middleNode(linkedList)
        assert(expected == output)
    }
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

// O(n) time | O(1) space - where n is the number of nodes in the linked list
fun middleNode(linkedList: LinkedList): LinkedList {
    var count = 0
    var currentNode: LinkedList? = linkedList
    while (currentNode != null) {
        count++
        currentNode = currentNode.next
    }

    var middleNode = linkedList
    for (i in 0 until count / 2) {
        middleNode = middleNode.next!!
    }
    return middleNode
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

// O(n) time | O(1) space - where n is the number of nodes in the linked list
fun middleNode(linkedList: LinkedList): LinkedList {
    var slowNode = linkedList
    var fastNode: LinkedList? = linkedList
    while (fastNode != null && fastNode.next != null) {
        slowNode = slowNode.next!!
        fastNode = fastNode.next!!.next
    }

    return slowNode
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.middleNode
import com.algoexpert.program.LinkedList as LinkedList

class ProgramTest {
    @Test
    fun TestCase1() {
        val linkedList = LinkedList(0)
        linkedList.next = LinkedList(1)
        val expected = LinkedList(2)
        linkedList.next!!.next = expected
        expected.next = LinkedList(3)
        val output = middleNode(linkedList)
        assert(expected == output)
    }
}

```
### Sandbox Code (swift)
```swift
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws in
      var linkedList = Program.LinkedList(value: 0)
      linkedList.next = Program.LinkedList(value: 1)
      var expected = Program.LinkedList(value: 2)
      linkedList.next!.next = expected
      expected.next = Program.LinkedList(value: 3)
      var actual = Program().middleNode(linkedList)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // This is an input class. Do not edit.
  class LinkedList: Hashable {
    var value: Int
    var next: LinkedList?

    init(value: Int) {
      self.value = value
    }

    func hash(into hasher: inout Hasher) {
      hasher.combine(ObjectIdentifier(self).hashValue)
    }

    static func == (left: LinkedList, right: LinkedList) -> Bool {
      return left === right
    }
  }

  // O(n) time | O(1) space - where n is the number of nodes in the linked list
  func middleNode(_ linkedList: LinkedList) -> LinkedList? {
    var count = 0
    var currentNode: LinkedList? = linkedList

    while currentNode != nil {
      count += 1
      currentNode = currentNode!.next
    }

    var middleNode: LinkedList? = linkedList
    for i in 0 ..< (count / 2) {
      middleNode = middleNode!.next
    }
    return middleNode
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // This is an input class. Do not edit.
  class LinkedList: Hashable {
    var value: Int
    var next: LinkedList?

    init(value: Int) {
      self.value = value
    }

    func hash(into hasher: inout Hasher) {
      hasher.combine(ObjectIdentifier(self).hashValue)
    }

    static func == (left: LinkedList, right: LinkedList) -> Bool {
      return left === right
    }
  }

  // O(n) time | O(1) space - where n is the number of nodes in the linked list
  func middleNode(_ linkedList: LinkedList) -> LinkedList? {
    var slowNode: LinkedList? = linkedList
    var fastNode: LinkedList? = linkedList
    while fastNode != nil && fastNode!.next != nil {
      slowNode = slowNode!.next
      fastNode = fastNode!.next!.next
    }
    return slowNode
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws in
      var linkedList = Program.LinkedList(value: 0)
      linkedList.next = Program.LinkedList(value: 1)
      var expected = Program.LinkedList(value: 2)
      linkedList.next!.next = expected
      expected.next = Program.LinkedList(value: 3)
      var actual = Program().middleNode(linkedList)
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
        linkedList = program.LinkedList(0)
        linkedList.next = program.LinkedList(1)
        expected = program.LinkedList(2)
        linkedList.next.next = expected
        expected.next = program.LinkedList(3)
        actual = program.middleNode(linkedList)
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


# O(n) time | O(1) space - where n is the number of nodes in the linked list
def middleNode(linkedList):
    count = 0
    currentNode = linkedList
    while currentNode is not None:
        count += 1
        currentNode = currentNode.next

    middleNode = linkedList
    for _ in range(count // 2):
        middleNode = middleNode.next
    return middleNode

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# This is an input class. Do not edit.
class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None


# O(n) time | O(1) space - where n is the number of nodes in the linked list
def middleNode(linkedList):
    slowNode = linkedList
    fastNode = linkedList
    while fastNode and fastNode.next:
        slowNode = slowNode.next
        fastNode = fastNode.next.next

    return slowNode

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        linkedList = program.LinkedList(0)
        linkedList.next = program.LinkedList(1)
        expected = program.LinkedList(2)
        linkedList.next.next = expected
        expected.next = program.LinkedList(3)
        actual = program.middleNode(linkedList)
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
  const linkedList = new program.LinkedList(0);
  linkedList.next = new program.LinkedList(1);
  const expected = new program.LinkedList(2);
  linkedList.next.next = expected;
  expected.next = new program.LinkedList(3);
  const actual = program.middleNode(linkedList);
  chai.expect(actual).to.deep.equal(expected);
});

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

// O(n) time | O(1) space - where n is the number of nodes in the linked list
export function middleNode(linkedList: LinkedList) {
  let count = 0;
  let currentNode: LinkedList | null = linkedList;
  while (currentNode !== null) {
    count++;
    currentNode = currentNode.next;
  }

  let middleNode = linkedList;
  for (let i = 0; i < Math.floor(count / 2); i++) {
    middleNode = middleNode.next!;
  }
  return middleNode;
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

// O(n) time | O(1) space - where n is the number of nodes in the linked list
export function middleNode(linkedList: LinkedList) {
  let slowNode = linkedList;
  let fastNode: LinkedList | null = linkedList;
  while (fastNode !== null && fastNode.next !== null) {
    slowNode = slowNode.next!;
    fastNode = fastNode.next.next;
  }

  return slowNode;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const linkedList = new program.LinkedList(0);
  linkedList.next = new program.LinkedList(1);
  const expected = new program.LinkedList(2);
  linkedList.next.next = expected;
  expected.next = new program.LinkedList(3);
  const actual = program.middleNode(linkedList);
  chai.expect(actual).to.deep.equal(expected);
});

```

