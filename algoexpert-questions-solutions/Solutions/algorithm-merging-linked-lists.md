# Merging Linked Lists
<div class="html">
  <p>
    You're given two Linked Lists of potentially unequal length. These Linked
    Lists potentially merge at a shared intersection node. Write a function
    that returns the intersection node or returns <span>None</span> /
    <span>null</span> if there is no intersection.
  </p>
  <p>
    Each <span>LinkedList</span> node has an integer <span>value</span> as well as
    a <span>next</span> node pointing to the next node in the list or to
    <span>None</span> / <span>null</span> if it's the tail of the list.
  </p>
  <p>
    Note: Your function should return an existing node. It should not modify
    either Linked List, and it should not create any new Linked Lists.
  </p>
  <h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">linkedListOne</span> = 2 -> 3 -> 1 -> 4
<span class="CodeEditor-promptParameter">linkedListTwo</span> = 8 -> 7 -> 1 -> 4
</pre>
  <h3>Sample Output</h3>
<pre>
1 -> 4 <span class="CodeEditor-promptComment">// The lists intersect at the node with value 1</span>
</pre>
  </div>

Hint 1
<p>
  All of the nodes after the intersection point of two Linked Lists will be the
  same.
</p>


Hint 2

<p>
  If the two Linked Lists are of different lengths, then none of the extra nodes
  of the longer list at the beginning can be the intersection point, since the
  ends must be the same.
</p>


Hint 3

<p>
  The length of the first list + the distance of the second head from the
  intersection point will be equal to the length of the second list + the
  distance of the first head from the intersection point. This can be proven
  using the information from hints 1 and 2.
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
      LinkedList* l1 = new LinkedList(1);
      l1->next = new LinkedList(2);
      LinkedList* l2 = new LinkedList(3);
      l2->next = l1->next;
      LinkedList* expected = l1->next;
      auto actual = mergingLinkedLists(l1, l2);
      assert(expected == actual);
    });
  }
};


```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <unordered_set>
using namespace std;

// This is an input struct. Do not edit.
class LinkedList {
public:
  int value;
  LinkedList *next = nullptr;

  LinkedList(int value) {
    this->value = value;
  }
};

// O(n + m) time | O(n + m) space - where n is the length of the
// first Linked List and m is the length of the second Linked List
LinkedList* mergingLinkedLists(LinkedList* linkedListOne, LinkedList* linkedListTwo) {
  unordered_set<LinkedList*> listOneNodes;

  LinkedList* currentNodeOne = linkedListOne;
  while (currentNodeOne != nullptr) {
    listOneNodes.insert(currentNodeOne);
    currentNodeOne = currentNodeOne->next;
  }

  LinkedList* currentNodeTwo = linkedListTwo;
  while (currentNodeTwo != nullptr) {
    if (listOneNodes.find(currentNodeTwo) != listOneNodes.end()) {
      return currentNodeTwo;
    }
    currentNodeTwo = currentNodeTwo->next;
  }
  
  return nullptr;
}


```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <cmath>
using namespace std;

// This is an input struct. Do not edit.
class LinkedList {
public:
  int value;
  LinkedList *next = nullptr;

  LinkedList(int value) {
    this->value = value;
  }
};

// O(n + m) time | O(1) space - where n is the length of the
// first Linked List and m is the length of the second Linked List
LinkedList* mergingLinkedLists(LinkedList* linkedListOne, LinkedList* linkedListTwo) {
  LinkedList* currentNodeOne = linkedListOne;
  int countOne = 0;
  while (currentNodeOne != nullptr) {
    countOne++;
    currentNodeOne = currentNodeOne->next;
  }

  LinkedList* currentNodeTwo = linkedListTwo;
  int countTwo = 0;
  while (currentNodeTwo != nullptr) {
    countTwo++;
    currentNodeTwo = currentNodeTwo->next;
  }

  int difference = abs(countTwo - countOne);
  LinkedList* biggerCurrentNode = countOne > countTwo ? linkedListOne : linkedListTwo;
  LinkedList* smallerCurrentNode = countOne > countTwo ? linkedListTwo : linkedListOne;

  for (int i = 0; i < difference; i++) {
    biggerCurrentNode = biggerCurrentNode->next;
  }

  while (biggerCurrentNode != smallerCurrentNode) {
    biggerCurrentNode = biggerCurrentNode->next;
    smallerCurrentNode = smallerCurrentNode->next;
  }

  return biggerCurrentNode;
}


```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <unordered_set>
using namespace std;

// This is an input struct. Do not edit.
class LinkedList {
public:
  int value;
  LinkedList *next = nullptr;

  LinkedList(int value) {
    this->value = value;
  }
};

// O(n + m) time | O(1) space - where n is the length of the
// first Linked List and m is the length of the second Linked List
LinkedList* mergingLinkedLists(LinkedList* linkedListOne, LinkedList* linkedListTwo) {
  LinkedList* curr = linkedListOne;
  LinkedList* curr2 = linkedListTwo;
  while (curr != curr2) {
    if (curr == nullptr) {
      curr = linkedListTwo;
    } else {
      curr = curr->next;
    }

    if (curr2 == nullptr) {
      curr2 = linkedListOne;
    } else {
      curr2 = curr2->next;
    }
  }

  return curr;
}


```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      LinkedList* l1 = new LinkedList(1);
      l1->next = new LinkedList(2);
      LinkedList* l2 = new LinkedList(3);
      l2->next = l1->next;
      LinkedList* expected = l1->next;
      auto actual = mergingLinkedLists(l1, l2);
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
		var l1 = new Program.LinkedList(1);
		l1.next = new Program.LinkedList(2);
		var l2 = new Program.LinkedList(3);
		l2.next = l1.next;

		var expected = l1.next;
		var actual = new Program().MergingLinkedLists(l1, l2);
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
	// This is an input class. Do not edit.
	public class LinkedList {
		public int value;
		public LinkedList next;

		public LinkedList(int value) {
			this.value = value;
			this.next = null;
		}
	}

	// O(n + m) time | O(n + m) space - where n is the length of the
	// first Linked List and m is the length of the second Linked List
	public LinkedList MergingLinkedLists(LinkedList linkedListOne, LinkedList linkedListTwo) {
		HashSet<LinkedList> listOneNodes = new HashSet<LinkedList>();

		LinkedList currentNodeOne = linkedListOne;
		while (currentNodeOne != null) {
			listOneNodes.Add(currentNodeOne);
			currentNodeOne = currentNodeOne.next;
		}

		LinkedList currentNodeTwo = linkedListTwo;
		while (currentNodeTwo != null) {
			if (listOneNodes.Contains(currentNodeTwo)) {
				return currentNodeTwo;
			}
			currentNodeTwo = currentNodeTwo.next;
		}

		return null;
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

	// O(n + m) time | O(1) space - where n is the length of the
	// first Linked List and m is the length of the second Linked List
	public LinkedList MergingLinkedLists(LinkedList linkedListOne, LinkedList linkedListTwo) {
		LinkedList currentNodeOne = linkedListOne;
		int countOne = 0;
		while (currentNodeOne != null) {
			countOne++;
			currentNodeOne = currentNodeOne.next;
		}

		LinkedList currentNodeTwo = linkedListTwo;
		int countTwo = 0;
		while (currentNodeTwo != null) {
			countTwo++;
			currentNodeTwo = currentNodeTwo.next;
		}

		int difference = Math.Abs(countTwo - countOne);
		LinkedList biggerCurrentNode = countOne > countTwo ? linkedListOne : linkedListTwo;
		LinkedList smallerCurrentNode = countOne > countTwo ? linkedListTwo : linkedListOne;

		for (int i = 0; i < difference; i++) {
			biggerCurrentNode = biggerCurrentNode.next;
		}

		while (biggerCurrentNode != smallerCurrentNode) {
			biggerCurrentNode = biggerCurrentNode.next;
			smallerCurrentNode = smallerCurrentNode.next;
		}

		return biggerCurrentNode;
	}
}


```
### Solution 3 (csharp)
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

	// O(n + m) time | O(1) space - where n is the length of the
	// first Linked List and m is the length of the second Linked List
	public LinkedList MergingLinkedLists(LinkedList linkedListOne, LinkedList linkedListTwo) {
		LinkedList curr = linkedListOne;
		LinkedList curr2 = linkedListTwo;
		while (curr != curr2) {
			if (curr == null) {
				curr = linkedListTwo;
			} else {
				curr = curr.next;
			}

			if (curr2 == null) {
				curr2 = linkedListOne;
			} else {
				curr2 = curr2.next;
			}
		}

		return curr;
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
		var l1 = new Program.LinkedList(1);
		l1.next = new Program.LinkedList(2);
		var l2 = new Program.LinkedList(3);
		l2.next = l1.next;

		var expected = l1.next;
		var actual = new Program().MergingLinkedLists(l1, l2);
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
	l1 := &LinkedList{Value: 1}
	l1.Next = &LinkedList{Value: 2}
	l2 := &LinkedList{Value: 3}
	l2.Next = l1.Next

	expected := l1.Next
	actual := MergingLinkedLists(l1, l2)
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

// O(n + m) time | O(n + m) space - where n is the length of the
// first Linked List and m is the length of the second Linked List
func MergingLinkedLists(linkedListOne *LinkedList, linkedListTwo *LinkedList) *LinkedList {
	listOneNodes := map[*LinkedList]bool{}

	currentNodeOne := linkedListOne
	for currentNodeOne != nil {
		listOneNodes[currentNodeOne] = true
		currentNodeOne = currentNodeOne.Next
	}

	currentNodeTwo := linkedListTwo
	for currentNodeTwo != nil {
		if _, found := listOneNodes[currentNodeTwo]; found {
			return currentNodeTwo
		}
		currentNodeTwo = currentNodeTwo.Next
	}

	return nil
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

// O(n + m) time | O(1) space - where n is the length of the
// first Linked List and m is the length of the second Linked List
func MergingLinkedLists(linkedListOne *LinkedList, linkedListTwo *LinkedList) *LinkedList {
	currentNodeOne := linkedListOne
	countOne := 0
	for currentNodeOne != nil {
		countOne += 1
		currentNodeOne = currentNodeOne.Next
	}

	currentNodeTwo := linkedListTwo
	countTwo := 0
	for currentNodeTwo != nil {
		countTwo += 1
		currentNodeTwo = currentNodeTwo.Next
	}

	difference := abs(countTwo - countOne)
	var biggerCurrentNode, smallerCurrentNode *LinkedList
	if countOne > countTwo {
		biggerCurrentNode = linkedListOne
		smallerCurrentNode = linkedListTwo
	} else {
		biggerCurrentNode = linkedListTwo
		smallerCurrentNode = linkedListOne
	}

	for i := 0; i < difference; i++ {
		biggerCurrentNode = biggerCurrentNode.Next
	}

	for biggerCurrentNode != smallerCurrentNode {
		biggerCurrentNode = biggerCurrentNode.Next
		smallerCurrentNode = smallerCurrentNode.Next
	}
	return biggerCurrentNode
}

func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// This is an input struct. Do not edit.
type LinkedList struct {
	Value int
	Next  *LinkedList
}

// O(n + m) time | O(1) space - where n is the length of the
// first Linked List and m is the length of the second Linked List
func MergingLinkedLists(linkedListOne *LinkedList, linkedListTwo *LinkedList) *LinkedList {
	curr, curr2 := linkedListOne, linkedListTwo

	for curr != curr2 {
		if curr == nil {
			curr = linkedListTwo
		} else {
			curr = curr.Next
		}

		if curr2 == nil {
			curr2 = linkedListOne
		} else {
			curr2 = curr2.Next
		}
	}
	return curr
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	l1 := &LinkedList{Value: 1}
	l1.Next = &LinkedList{Value: 2}
	l2 := &LinkedList{Value: 3}
	l2.Next = l1.Next

	expected := l1.Next
	actual := MergingLinkedLists(l1, l2)
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
    var l1 = new Program.LinkedList(1);
    l1.next = new Program.LinkedList(2);
    var l2 = new Program.LinkedList(3);
    l2.next = l1.next;

    var expected = l1.next;
    var actual = new Program().mergingLinkedLists(l1, l2);
    Utils.assertTrue(expected == actual);
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

  // O(n + m) time | O(n + m) space - where n is the length of the
  // first Linked List and m is the length of the second Linked List
  public LinkedList mergingLinkedLists(LinkedList linkedListOne, LinkedList linkedListTwo) {
    Set<LinkedList> listOneNodes = new HashSet<LinkedList>();

    LinkedList currentNodeOne = linkedListOne;
    while (currentNodeOne != null) {
      listOneNodes.add(currentNodeOne);
      currentNodeOne = currentNodeOne.next;
    }

    LinkedList currentNodeTwo = linkedListTwo;
    while (currentNodeTwo != null) {
      if (listOneNodes.contains(currentNodeTwo)) {
        return currentNodeTwo;
      }
      currentNodeTwo = currentNodeTwo.next;
    }

    return null;
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

  // O(n + m) time | O(1) space - where n is the length of the
  // first Linked List and m is the length of the second Linked List
  public LinkedList mergingLinkedLists(LinkedList linkedListOne, LinkedList linkedListTwo) {
    LinkedList currentNodeOne = linkedListOne;
    int countOne = 0;
    while (currentNodeOne != null) {
      countOne++;
      currentNodeOne = currentNodeOne.next;
    }

    LinkedList currentNodeTwo = linkedListTwo;
    int countTwo = 0;
    while (currentNodeTwo != null) {
      countTwo++;
      currentNodeTwo = currentNodeTwo.next;
    }

    int difference = Math.abs(countTwo - countOne);
    LinkedList biggerCurrentNode = countOne > countTwo ? linkedListOne : linkedListTwo;
    LinkedList smallerCurrentNode = countOne > countTwo ? linkedListTwo : linkedListOne;

    for (int i = 0; i < difference; i++) {
      biggerCurrentNode = biggerCurrentNode.next;
    }

    while (biggerCurrentNode != smallerCurrentNode) {
      biggerCurrentNode = biggerCurrentNode.next;
      smallerCurrentNode = smallerCurrentNode.next;
    }

    return biggerCurrentNode;
  }
}

```
### Solution 3 (java)
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

  // O(n + m) time | O(1) space - where n is the length of the
  // first Linked List and m is the length of the second Linked List
  public LinkedList mergingLinkedLists(LinkedList linkedListOne, LinkedList linkedListTwo) {
    LinkedList curr = linkedListOne;
    LinkedList curr2 = linkedListTwo;
    while (curr != curr2) {
      if (curr == null) {
        curr = linkedListTwo;
      } else {
        curr = curr.next;
      }

      if (curr2 == null) {
        curr2 = linkedListOne;
      } else {
        curr2 = curr2.next;
      }
    }

    return curr;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    var l1 = new Program.LinkedList(1);
    l1.next = new Program.LinkedList(2);
    var l2 = new Program.LinkedList(3);
    l2.next = l1.next;

    var expected = l1.next;
    var actual = new Program().mergingLinkedLists(l1, l2);
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
  const l1 = new program.LinkedList(1);
  l1.next = new program.LinkedList(2);
  const l2 = new program.LinkedList(3);
  l2.next = l1.next;

  const expected = l1.next;
  const actual = program.mergingLinkedLists(l1, l2);
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

// O(n + m) time | O(n) space - where n is the length of the
// first Linked List, and m is the length of the second Linked List
function mergingLinkedLists(linkedListOne, linkedListTwo) {
  const listOneNodes = new Set();
  let currentNodeOne = linkedListOne;
  while (currentNodeOne !== null) {
    listOneNodes.add(currentNodeOne);
    currentNodeOne = currentNodeOne.next;
  }

  let currentNodeTwo = linkedListTwo;
  while (currentNodeTwo !== null) {
    if (listOneNodes.has(currentNodeTwo)) return currentNodeTwo;
    currentNodeTwo = currentNodeTwo.next;
  }

  return null;
}

// Do not edit the lines below.
exports.LinkedList = LinkedList;
exports.mergingLinkedLists = mergingLinkedLists;

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

// O(n + m) time | O(1) space - where n is the length of the
// first Linked List, and m is the length of the second Linked List
function mergingLinkedLists(linkedListOne, linkedListTwo) {
  let currentNodeOne = linkedListOne;
  let countOne = 0;
  while (currentNodeOne !== null) {
    countOne++;
    currentNodeOne = currentNodeOne.next;
  }

  let currentNodeTwo = linkedListTwo;
  let countTwo = 0;
  while (currentNodeTwo !== null) {
    countTwo++;
    currentNodeTwo = currentNodeTwo.next;
  }

  const difference = Math.abs(countTwo - countOne);
  let biggerCurrentNode = countOne > countTwo ? linkedListOne : linkedListTwo;
  let smallerCurrentNode = countOne > countTwo ? linkedListTwo : linkedListOne;

  for (let i = 0; i < difference; i++) {
    biggerCurrentNode = biggerCurrentNode.next;
  }

  while (biggerCurrentNode !== smallerCurrentNode) {
    biggerCurrentNode = biggerCurrentNode.next;
    smallerCurrentNode = smallerCurrentNode.next;
  }

  return biggerCurrentNode;
}

// Do not edit the lines below.
exports.LinkedList = LinkedList;
exports.mergingLinkedLists = mergingLinkedLists;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// This is an input class. Do not edit.
class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// O(n + m) time | O(1) space - where n is the length of the
// first Linked List, and m is the length of the second Linked List
function mergingLinkedLists(linkedListOne, linkedListTwo) {
  let currentNodeOne = linkedListOne;
  let currentNodeTwo = linkedListTwo;

  while (currentNodeOne !== currentNodeTwo) {
    if (currentNodeOne === null) {
      currentNodeOne = linkedListTwo;
    } else {
      currentNodeOne = currentNodeOne.next;
    }

    if (currentNodeTwo === null) {
      currentNodeTwo = linkedListOne;
    } else {
      currentNodeTwo = currentNodeTwo.next;
    }
  }

  return currentNodeOne;
}

// Do not edit the lines below.
exports.LinkedList = LinkedList;
exports.mergingLinkedLists = mergingLinkedLists;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const l1 = new program.LinkedList(1);
  l1.next = new program.LinkedList(2);
  const l2 = new program.LinkedList(3);
  l2.next = l1.next;

  const expected = l1.next;
  const actual = program.mergingLinkedLists(l1, l2);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.mergingLinkedLists
import com.algoexpert.program.LinkedList as LinkedList

class ProgramTest {
    @Test
    fun TestCase1() {
        val l1 = LinkedList(1)
        l1.next = LinkedList(2)
        val l2 = LinkedList(3)
        l2.next = l1.next

        val expected = l1.next
        val output = mergingLinkedLists(l1, l2)
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

// O(n + m) time | O(n) space - where n is the length of the
// first Linked List, and m is the length of the second Linked List
fun mergingLinkedLists(linkedListOne: LinkedList, linkedListTwo: LinkedList): LinkedList? {
    val listOneNodes = mutableSetOf<LinkedList>()
    var currentNodeOne: LinkedList? = linkedListOne
    while (currentNodeOne != null) {
        listOneNodes.add(currentNodeOne)
        currentNodeOne = currentNodeOne.next
    }

    var currentNodeTwo: LinkedList? = linkedListTwo
    while (currentNodeTwo != null) {
        if (listOneNodes.contains(currentNodeTwo)) return currentNodeTwo
        currentNodeTwo = currentNodeTwo.next
    }

    return null
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.abs

// This is an input class. Do not edit.
open class LinkedList(value: Int) {
    var value = value
    var next: LinkedList? = null
}

// O(n + m) time | O(1) space - where n is the length of the
// first Linked List, and m is the length of the second Linked List
fun mergingLinkedLists(linkedListOne: LinkedList, linkedListTwo: LinkedList): LinkedList? {
    var currentNodeOne: LinkedList? = linkedListOne
    var countOne = 0
    while (currentNodeOne != null) {
        countOne++
        currentNodeOne = currentNodeOne.next
    }

    var currentNodeTwo: LinkedList? = linkedListTwo
    var countTwo = 0
    while (currentNodeTwo != null) {
        countTwo++
        currentNodeTwo = currentNodeTwo.next
    }

    val difference = abs(countTwo - countOne)
    var biggerCurrentNode: LinkedList? = if (countOne > countTwo) linkedListOne else linkedListTwo
    var smallerCurrentNode: LinkedList? = if (countOne > countTwo) linkedListTwo else linkedListOne

    for (i in 0 until difference) {
        biggerCurrentNode = biggerCurrentNode!!.next
    }

    while (biggerCurrentNode != smallerCurrentNode) {
        biggerCurrentNode = biggerCurrentNode!!.next
        smallerCurrentNode = smallerCurrentNode!!.next
    }
    println("bar")

    return biggerCurrentNode
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// This is an input class. Do not edit.
open class LinkedList(value: Int) {
    var value = value
    var next: LinkedList? = null
}

// O(n + m) time | O(1) space - where n is the length of the
// first Linked List, and m is the length of the second Linked List
fun mergingLinkedLists(linkedListOne: LinkedList, linkedListTwo: LinkedList): LinkedList? {
    var currentNodeOne: LinkedList? = linkedListOne
    var currentNodeTwo: LinkedList? = linkedListTwo

    while (currentNodeOne != currentNodeTwo) {
        if (currentNodeOne == null) {
            currentNodeOne = linkedListTwo
        } else {
            currentNodeOne = currentNodeOne.next
        }

        if (currentNodeTwo == null) {
            currentNodeTwo = linkedListOne
        } else {
            currentNodeTwo = currentNodeTwo.next
        }
    }

    return currentNodeOne
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.mergingLinkedLists
import com.algoexpert.program.LinkedList as LinkedList

class ProgramTest {
    @Test
    fun TestCase1() {
        val l1 = LinkedList(1)
        l1.next = LinkedList(2)
        val l2 = LinkedList(3)
        l2.next = l1.next

        val expected = l1.next
        val output = mergingLinkedLists(l1, l2)
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
      var l1 = Program.LinkedList(value: 1)
      l1.next = Program.LinkedList(value: 2)
      var l2 = Program.LinkedList(value: 3)
      l2.next = l1.next

      var expected = l1.next
      var actual = Program().mergingLinkedLists(l1, l2)
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

  // O(n + m) time | O(n + m) space - where n is the length of the
  // first Linked List and m is the length of the second Linked List
  func mergingLinkedLists(_ linkedListOne: LinkedList, _ linkedListTwo: LinkedList) -> LinkedList? {
    var listOneNodes = Set<LinkedList>()

    var currentNodeOne: LinkedList? = linkedListOne
    while currentNodeOne != nil {
      listOneNodes.insert(currentNodeOne!)
      currentNodeOne = currentNodeOne!.next
    }

    var currentNodeTwo: LinkedList? = linkedListTwo
    while currentNodeTwo != nil {
      if listOneNodes.contains(currentNodeTwo!) {
        return currentNodeTwo
      }

      currentNodeTwo = currentNodeTwo!.next
    }
    return nil
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

  // O(n + m) time | O(1) space - where n is the length of the
  // first Linked List and m is the length of the second Linked List
  func mergingLinkedLists(_ linkedListOne: LinkedList, _ linkedListTwo: LinkedList) -> LinkedList? {
    var currentNodeOne: LinkedList? = linkedListOne
    var countOne = 0
    while currentNodeOne != nil {
      countOne += 1
      currentNodeOne = currentNodeOne!.next
    }

    var currentNodeTwo: LinkedList? = linkedListTwo
    var countTwo = 0
    while currentNodeTwo != nil {
      countTwo += 1
      currentNodeTwo = currentNodeTwo!.next
    }

    let difference = abs(countTwo - countOne)
    var biggerCurrentNode: LinkedList?
    var smallerCurrentNode: LinkedList?
    if countOne > countTwo {
      biggerCurrentNode = linkedListOne
      smallerCurrentNode = linkedListTwo
    } else {
      biggerCurrentNode = linkedListTwo
      smallerCurrentNode = linkedListOne
    }

    for i in 0 ..< difference {
      biggerCurrentNode = biggerCurrentNode!.next
    }

    while biggerCurrentNode !== smallerCurrentNode {
      biggerCurrentNode = biggerCurrentNode!.next
      smallerCurrentNode = smallerCurrentNode!.next
    }

    return biggerCurrentNode
  }
}

```
### Solution 3 (swift)
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

  // O(n + m) time | O(1) space - where n is the length of the
  // first Linked List and m is the length of the second Linked List
  func mergingLinkedLists(_ linkedListOne: LinkedList, _ linkedListTwo: LinkedList) -> LinkedList? {
    var curr: LinkedList? = linkedListOne
    var curr2: LinkedList? = linkedListTwo
    while curr !== curr2 {
      if curr == nil {
        curr = linkedListTwo
      } else {
        curr = curr!.next
      }

      if curr2 == nil {
        curr2 = linkedListOne
      } else {
        curr2 = curr2!.next
      }
    }
    return curr
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws in
      var l1 = Program.LinkedList(value: 1)
      l1.next = Program.LinkedList(value: 2)
      var l2 = Program.LinkedList(value: 3)
      l2.next = l1.next

      var expected = l1.next
      var actual = Program().mergingLinkedLists(l1, l2)
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
        l1 = program.LinkedList(1)
        l1.next = program.LinkedList(2)
        l2 = program.LinkedList(3)
        l2.next = l1.next

        expected = l1.next
        actual = program.mergingLinkedLists(l1, l2)
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


# O(n + m) time | O(n) space - where n is the length of the
# first Linked List, and m is the length of the second Linked List
def mergingLinkedLists(linkedListOne, linkedListTwo):
    listOneNodes = set()
    currentNodeOne = linkedListOne
    while currentNodeOne is not None:
        listOneNodes.add(currentNodeOne)
        currentNodeOne = currentNodeOne.next

    currentNodeTwo = linkedListTwo
    while currentNodeTwo is not None:
        if currentNodeTwo in listOneNodes:
            return currentNodeTwo
        currentNodeTwo = currentNodeTwo.next

    return None

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# This is an input class. Do not edit.
class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None


# O(n + m) time | O(1) space - where n is the length of the
# first Linked List, and m is the length of the second Linked List
def mergingLinkedLists(linkedListOne, linkedListTwo):
    currentNodeOne = linkedListOne
    countOne = 0
    while currentNodeOne is not None:
        countOne += 1
        currentNodeOne = currentNodeOne.next

    currentNodeTwo = linkedListTwo
    countTwo = 0
    while currentNodeTwo is not None:
        countTwo += 1
        currentNodeTwo = currentNodeTwo.next

    difference = abs(countTwo - countOne)
    biggerCurrentNode = linkedListOne if countOne > countTwo else linkedListTwo
    smallerCurrentNode = linkedListTwo if countOne > countTwo else linkedListOne

    for _ in range(difference):
        biggerCurrentNode = biggerCurrentNode.next

    while biggerCurrentNode is not smallerCurrentNode:
        biggerCurrentNode = biggerCurrentNode.next
        smallerCurrentNode = smallerCurrentNode.next

    return biggerCurrentNode

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# This is an input class. Do not edit.
class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None


# O(n + m) time | O(1) space - where n is the length of the
# first Linked List, and m is the length of the second Linked List
def mergingLinkedLists(linkedListOne, linkedListTwo):
    currentNodeOne = linkedListOne
    currentNodeTwo = linkedListTwo

    while currentNodeOne is not currentNodeTwo:
        if not currentNodeOne:
            currentNodeOne = linkedListTwo
        else:
            currentNodeOne = currentNodeOne.next

        if not currentNodeTwo:
            currentNodeTwo = linkedListOne
        else:
            currentNodeTwo = currentNodeTwo.next

    return currentNodeOne

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        l1 = program.LinkedList(1)
        l1.next = program.LinkedList(2)
        l2 = program.LinkedList(3)
        l2.next = l1.next

        expected = l1.next
        actual = program.mergingLinkedLists(l1, l2)
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
  const l1 = new program.LinkedList(1);
  l1.next = new program.LinkedList(2);
  const l2 = new program.LinkedList(3);
  l2.next = l1.next;

  const expected = l1.next;
  const actual = program.mergingLinkedLists(l1, l2);
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

// O(n + m) time | O(n) space - where n is the length of the
// first Linked List, and m is the length of the second Linked List
export function mergingLinkedLists(linkedListOne: LinkedList, linkedListTwo: LinkedList) {
  const listOneNodes = new Set<LinkedList>();
  let currentNodeOne: LinkedList | null = linkedListOne;
  while (currentNodeOne !== null) {
    listOneNodes.add(currentNodeOne);
    currentNodeOne = currentNodeOne.next;
  }

  let currentNodeTwo: LinkedList | null = linkedListTwo;
  while (currentNodeTwo !== null) {
    if (listOneNodes.has(currentNodeTwo)) return currentNodeTwo;
    currentNodeTwo = currentNodeTwo.next;
  }

  return null;
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

// O(n + m) time | O(1) space - where n is the length of the
// first Linked List, and m is the length of the second Linked List
export function mergingLinkedLists(linkedListOne: LinkedList, linkedListTwo: LinkedList) {
  let currentNodeOne: LinkedList | null = linkedListOne;
  let countOne = 0;
  while (currentNodeOne !== null) {
    countOne++;
    currentNodeOne = currentNodeOne.next;
  }

  let currentNodeTwo: LinkedList | null = linkedListTwo;
  let countTwo = 0;
  while (currentNodeTwo !== null) {
    countTwo++;
    currentNodeTwo = currentNodeTwo.next;
  }

  const difference = Math.abs(countTwo - countOne);
  let biggerCurrentNode: LinkedList | null = countOne > countTwo ? linkedListOne : linkedListTwo;
  let smallerCurrentNode: LinkedList | null = countOne > countTwo ? linkedListTwo : linkedListOne;

  for (let i = 0; i < difference; i++) {
    biggerCurrentNode = biggerCurrentNode!.next;
  }

  while (biggerCurrentNode !== smallerCurrentNode) {
    biggerCurrentNode = biggerCurrentNode!.next;
    smallerCurrentNode = smallerCurrentNode!.next;
  }

  return biggerCurrentNode;
}

```
### Solution 3 (typescript)
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

// O(n + m) time | O(1) space - where n is the length of the
// first Linked List, and m is the length of the second Linked List
export function mergingLinkedLists(linkedListOne: LinkedList, linkedListTwo: LinkedList) {
  let currentNodeOne: LinkedList | null = linkedListOne;
  let currentNodeTwo: LinkedList | null = linkedListTwo;

  while (currentNodeOne !== currentNodeTwo) {
    if (currentNodeOne === null) {
      currentNodeOne = linkedListTwo;
    } else {
      currentNodeOne = currentNodeOne.next;
    }

    if (currentNodeTwo === null) {
      currentNodeTwo = linkedListOne;
    } else {
      currentNodeTwo = currentNodeTwo.next;
    }
  }

  return currentNodeOne;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const l1 = new program.LinkedList(1);
  l1.next = new program.LinkedList(2);
  const l2 = new program.LinkedList(3);
  l2.next = l1.next;

  const expected = l1.next;
  const actual = program.mergingLinkedLists(l1, l2);
  chai.expect(actual).to.deep.equal(expected);
});

```

