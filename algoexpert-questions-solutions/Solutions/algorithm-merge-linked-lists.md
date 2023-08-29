# Merge Linked Lists
<div class="html">
<p>
  Write a function that takes in the heads of two Singly Linked Lists that are
  in sorted order, respectively. The function should merge the lists in place
  (i.e., it shouldn't create a brand new list) and return the head of the merged
  list; the merged list should be in sorted order.
</p>
<p>
  Each <span>LinkedList</span> node has an integer <span>value</span> as well as
  a <span>next</span> node pointing to the next node in the list or to
  <span>None</span> / <span>null</span> if it's the tail of the list.
</p>
<p>
  You can assume that the input linked lists will always have at least one node; in other
  words, the heads will never be <span>None</span> / <span>null</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">headOne</span> = 2 -> 6 -> 7 -> 8 <span class="CodeEditor-promptComment">// the head node with value 2</span>
<span class="CodeEditor-promptParameter">headTwo</span> = 1 -> 3 -> 4 -> 5 -> 9 -> 10 <span class="CodeEditor-promptComment">// the head node with value 1</span>
</pre>
<h3>Sample Output</h3>
<pre>
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 <span class="CodeEditor-promptComment">// the new head node with value 1</span>
</pre>
</div>

Hint 1
<p>
You can iterate through the Linked Lists from head to tail and merge them along the way by inserting nodes from the second Linked List into the first Linked List.
</p>


Hint 2

<p>
You'll need to manipulate three nodes at once at every step.
</p>


Hint 3

<p>
At every step, you'll need to have three variables (p1, p2, and p1Prev) pointing to the current node in the first Linked List (p1), the current node in the second Linked List (p2), and the previous node in the first Linked List (p1Prev). If the value of p1 is smaller than the value of p2, then you can just "move forward" in the first Linked List by moving p1 and p1Prev forward by one position (p1Prev becomes p1 and p1 becomes p1.next). If the value of p1 is greater than the value of p2, then you need to insert p2 before p1. You'll have to first make p1Prev point to p2, then make p2 point to p1, all the while not losing track of p2's "next" node, which you'll need to move to right after. You'll also have to handle edge cases when you're dealing with head nodes or tail nodes.
</p>


Hint 4

<p>
You can implement this algorithm both iteratively and recursively following nearly identical logic.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

LinkedList *addMany(LinkedList *ll, vector<int> values) {
  LinkedList *current = ll;
  while (current->next != nullptr) {
    current = current->next;
  }
  for (auto value : values) {
    current->next = new LinkedList(value);
    current = current->next;
  }
  return ll;
}

vector<int> getNodesInArray(LinkedList *ll) {
  vector<int> nodes;
  LinkedList *current = ll;
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
      LinkedList *list1 = new LinkedList(2);
      addMany(list1, {6, 7, 8});
      LinkedList *list2 = new LinkedList(1);
      addMany(list2, {3, 4, 5, 9, 10});
      LinkedList *output = mergeLinkedLists(list1, list2);
      vector<int> expectedNodes = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
      assert(getNodesInArray(output) == expectedNodes);
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

  LinkedList(int value) {
    this->value = value;
    this->next = nullptr;
  }
};

// O(n + m) time | O(1) space - where n is the number of nodes in the first
// Linked List and m is the number of nodes in the second Linked List
LinkedList *mergeLinkedLists(LinkedList *headOne, LinkedList *headTwo) {
  LinkedList *p1 = headOne;
  LinkedList *p1Prev = nullptr;
  LinkedList *p2 = headTwo;
  while (p1 != nullptr && p2 != nullptr) {
    if (p1->value < p2->value) {
      p1Prev = p1;
      p1 = p1->next;
    } else {
      if (p1Prev != nullptr)
        p1Prev->next = p2;
      p1Prev = p2;
      p2 = p2->next;
      p1Prev->next = p1;
    }
  }
  if (p1 == nullptr)
    p1Prev->next = p2;
  return headOne->value < headTwo->value ? headOne : headTwo;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>

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

void recursiveMerge(LinkedList *p1, LinkedList *p2, LinkedList *p1Prev);

// O(n + m) time | O(n + m) space - where n is the number of nodes in the first
// Linked List and m is the number of nodes in the second Linked List
LinkedList *mergeLinkedLists(LinkedList *headOne, LinkedList *headTwo) {
  recursiveMerge(headOne, headTwo, nullptr);
  return headOne->value < headTwo->value ? headOne : headTwo;
}

void recursiveMerge(LinkedList *p1, LinkedList *p2, LinkedList *p1Prev) {
  if (p1 == nullptr) {
    p1Prev->next = p2;
    return;
  }
  if (p2 == nullptr)
    return;

  if (p1->value < p2->value) {
    recursiveMerge(p1->next, p2, p1);
  } else {
    if (p1Prev != nullptr)
      p1Prev->next = p2;
    LinkedList *newP2 = p2->next;
    p2->next = p1;
    recursiveMerge(p1, newP2, p2);
  }
}

```
### Unit Tests 1 (cpp)
```cpp
LinkedList *addMany(LinkedList *ll, vector<int> values) {
  LinkedList *current = ll;
  while (current->next != nullptr) {
    current = current->next;
  }
  for (auto value : values) {
    current->next = new LinkedList(value);
    current = current->next;
  }
  return ll;
}

vector<int> getNodesInArray(LinkedList *ll) {
  vector<int> nodes;
  LinkedList *current = ll;
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
      LinkedList *list1 = new LinkedList(2);
      addMany(list1, {6, 7, 8});
      LinkedList *list2 = new LinkedList(1);
      addMany(list2, {3, 4, 5, 9, 10});
      LinkedList *output = mergeLinkedLists(list1, list2);
      vector<int> expectedNodes = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
      assert(getNodesInArray(output) == expectedNodes);
    });
  }
};

```
### Sandbox Code (csharp)
```csharp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

using System.Linq;
using System.Collections.Generic;

public class ProgramTest {
	public class TestLinkedList : Program.LinkedList {
		public TestLinkedList(int val) : base(val) {
		}

		public TestLinkedList addMany(List<int> values) {
			TestLinkedList current = this;
			while (current.next != null) {
				current = (TestLinkedList) current.next;
			}
			foreach (int value in values) {
				current.next = new TestLinkedList(value);
				current = (TestLinkedList) current.next;
			}
			return this;
		}

		public List<int> getNodesInArray() {
			List<int> nodes = new List<int>();
			TestLinkedList current = this;
			while (current != null) {
				nodes.Add(current.value);
				current = (TestLinkedList) current.next;
			}
			return nodes;
		}
	}

	[Test]
	public void TestCase1() {
		TestLinkedList list1 = new TestLinkedList(2);
		list1.addMany(new List<int>(){
			6, 7, 8
		});
		TestLinkedList list2 = new TestLinkedList(1);
		list2.addMany(new List<int>(){
			3, 4, 5, 9, 10
		});
		TestLinkedList output = (TestLinkedList) Program.mergeLinkedLists(list1, list2);
		List<int> expectedNodes = new List<int>(){
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10
		};
		Utils.AssertTrue(output.getNodesInArray().SequenceEqual(expectedNodes));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	public class LinkedList {
		public int value;
		public LinkedList next;

		public LinkedList(int value) {
			this.value = value;
			this.next = null;
		}
	}

	// O(n + m) time | O(1) space - where n is the number of nodes in the first
	// Linked List and m is the number of nodes in the second Linked List
	public static LinkedList mergeLinkedLists(LinkedList headOne, LinkedList headTwo) {
		LinkedList p1 = headOne;
		LinkedList p1Prev = null;
		LinkedList p2 = headTwo;
		while (p1 != null && p2 != null) {
			if (p1.value < p2.value) {
				p1Prev = p1;
				p1 = p1.next;
			} else {
				if (p1Prev != null)
					p1Prev.next = p2;
				p1Prev = p2;
				p2 = p2.next;
				p1Prev.next = p1;
			}
		}
		if (p1 == null)
			p1Prev.next = p2;
		return headOne.value < headTwo.value ? headOne : headTwo;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	public class LinkedList {
		public int value;
		public LinkedList next;

		public LinkedList(int value) {
			this.value = value;
			this.next = null;
		}
	}

	// O(n + m) time | O(n + m) space - where n is the number of nodes in the first
	// Linked List and m is the number of nodes in the second Linked List
	public static LinkedList mergeLinkedLists(LinkedList headOne, LinkedList headTwo) {
		recursiveMerge(headOne, headTwo, null);
		return headOne.value < headTwo.value ? headOne : headTwo;
	}

	public static void recursiveMerge(LinkedList p1, LinkedList p2, LinkedList p1Prev) {
		if (p1 == null) {
			p1Prev.next = p2;
			return;
		}
		if (p2 == null)
			return;

		if (p1.value < p2.value) {
			recursiveMerge(p1.next, p2, p1);
		} else {
			if (p1Prev != null)
				p1Prev.next = p2;
			LinkedList newP2 = p2.next;
			p2.next = p1;
			recursiveMerge(p1, newP2, p2);
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Linq;
using System.Collections.Generic;

public class ProgramTest {
	public class TestLinkedList : Program.LinkedList {
		public TestLinkedList(int val) : base(val) {
		}

		public TestLinkedList addMany(List<int> values) {
			TestLinkedList current = this;
			while (current.next != null) {
				current = (TestLinkedList) current.next;
			}
			foreach (int value in values) {
				current.next = new TestLinkedList(value);
				current = (TestLinkedList) current.next;
			}
			return this;
		}

		public List<int> getNodesInArray() {
			List<int> nodes = new List<int>();
			TestLinkedList current = this;
			while (current != null) {
				nodes.Add(current.value);
				current = (TestLinkedList) current.next;
			}
			return nodes;
		}
	}

	[Test]
	public void TestCase1() {
		TestLinkedList list1 = new TestLinkedList(2);
		list1.addMany(new List<int>(){
			6, 7, 8
		});
		TestLinkedList list2 = new TestLinkedList(1);
		list2.addMany(new List<int>(){
			3, 4, 5, 9, 10
		});
		TestLinkedList output = (TestLinkedList) Program.mergeLinkedLists(list1, list2);
		List<int> expectedNodes = new List<int>(){
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10
		};
		Utils.AssertTrue(output.getNodesInArray().SequenceEqual(expectedNodes));
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
	list1 := NewLinkedList(2, 6, 7, 8)
	list2 := NewLinkedList(1, 3, 4, 5, 9, 10)
	output := MergeLinkedLists(list1, list2)
	expectedNodes := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	require.Equal(t, output.ToArray(), expectedNodes)
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

// O(n + m) time | O(1) space - where n is the number of nodes in the first
// Linked List and m is the number of nodes in the second Linked List
func MergeLinkedLists(headOne *LinkedList, headTwo *LinkedList) *LinkedList {
	p1 := headOne
	var p1Prev *LinkedList
	p2 := headTwo
	for p1 != nil && p2 != nil {
		if p1.Value < p2.Value {
			p1Prev = p1
			p1 = p1.Next
		} else {
			if p1Prev != nil {
				p1Prev.Next = p2
			}
			p1Prev = p2
			p2 = p2.Next
			p1Prev.Next = p1
		}
	}

	if p1 == nil {
		p1Prev.Next = p2
	}

	if headOne.Value < headTwo.Value {
		return headOne
	}
	return headTwo
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

// O(n + m) time | O(n + m) space - where n is the number of nodes in the first
// Linked List and m is the number of nodes in the second Linked List
func MergeLinkedLists(headOne *LinkedList, headTwo *LinkedList) *LinkedList {
	recursiveMerge(headOne, headTwo, nil)
	if headOne.Value < headTwo.Value {
		return headOne
	}
	return headTwo
}

func recursiveMerge(p1, p2, p1Prev *LinkedList) {
	if p1 == nil {
		p1Prev.Next = p2
		return
	}
	if p2 == nil {
		return
	}

	if p1.Value < p2.Value {
		recursiveMerge(p1.Next, p2, p1)
		return
	}

	if p1Prev != nil {
		p1Prev.Next = p2
	}
	newP2 := p2.Next
	p2.Next = p1
	recursiveMerge(p1, newP2, p2)
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
	list1 := NewLinkedList(2, 6, 7, 8)
	list2 := NewLinkedList(1, 3, 4, 5, 9, 10)
	output := MergeLinkedLists(list1, list2)
	expectedNodes := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	require.Equal(t, output.ToArray(), expectedNodes)
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
    Program.LinkedList list1 = new Program.LinkedList(2);
    addMany(list1, new ArrayList<Integer>(Arrays.asList(6, 7, 8)));
    Program.LinkedList list2 = new Program.LinkedList(1);
    addMany(list2, new ArrayList<Integer>(Arrays.asList(3, 4, 5, 9, 10)));
    Program.LinkedList output = Program.mergeLinkedLists(list1, list2);
    List<Integer> expectedNodes =
        new ArrayList<Integer>(Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
    Utils.assertTrue(getNodesInArray(output).equals(expectedNodes));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  public static class LinkedList {
    int value;
    LinkedList next;

    LinkedList(int value) {
      this.value = value;
      this.next = null;
    }
  }

  // O(n + m) time | O(1) space - where n is the number of nodes in the first
  // Linked List and m is the number of nodes in the second Linked List
  public static LinkedList mergeLinkedLists(LinkedList headOne, LinkedList headTwo) {
    LinkedList p1 = headOne;
    LinkedList p1Prev = null;
    LinkedList p2 = headTwo;
    while (p1 != null && p2 != null) {
      if (p1.value < p2.value) {
        p1Prev = p1;
        p1 = p1.next;
      } else {
        if (p1Prev != null) p1Prev.next = p2;
        p1Prev = p2;
        p2 = p2.next;
        p1Prev.next = p1;
      }
    }
    if (p1 == null) p1Prev.next = p2;
    return headOne.value < headTwo.value ? headOne : headTwo;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  public static class LinkedList {
    int value;
    LinkedList next;

    LinkedList(int value) {
      this.value = value;
      this.next = null;
    }
  }

  // O(n + m) time | O(n + m) space - where n is the number of nodes in the first
  // Linked List and m is the number of nodes in the second Linked List
  public static LinkedList mergeLinkedLists(LinkedList headOne, LinkedList headTwo) {
    recursiveMerge(headOne, headTwo, null);
    return headOne.value < headTwo.value ? headOne : headTwo;
  }

  public static void recursiveMerge(LinkedList p1, LinkedList p2, LinkedList p1Prev) {
    if (p1 == null) {
      p1Prev.next = p2;
      return;
    }
    if (p2 == null) return;

    if (p1.value < p2.value) {
      recursiveMerge(p1.next, p2, p1);
    } else {
      if (p1Prev != null) p1Prev.next = p2;
      LinkedList newP2 = p2.next;
      p2.next = p1;
      recursiveMerge(p1, newP2, p2);
    }
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
    Program.LinkedList list1 = new Program.LinkedList(2);
    addMany(list1, new ArrayList<Integer>(Arrays.asList(6, 7, 8)));
    Program.LinkedList list2 = new Program.LinkedList(1);
    addMany(list2, new ArrayList<Integer>(Arrays.asList(3, 4, 5, 9, 10)));
    Program.LinkedList output = Program.mergeLinkedLists(list1, list2);
    List<Integer> expectedNodes =
        new ArrayList<Integer>(Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
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
  const list1 = new LinkedList(2).addMany([6, 7, 8]);
  const list2 = new LinkedList(1).addMany([3, 4, 5, 9, 10]);
  const output = program.mergeLinkedLists(list1, list2);
  const expectedNodes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  chai.expect(output.getNodesInArray()).to.deep.equal(expectedNodes);
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

// O(n + m) time | O(1) space - where n is the number of nodes in the first
// Linked List and m is the number of nodes in the second Linked List
function mergeLinkedLists(headOne, headTwo) {
  let p1 = headOne;
  let p1Prev = null;
  let p2 = headTwo;
  while (p1 !== null && p2 !== null) {
    if (p1.value < p2.value) {
      p1Prev = p1;
      p1 = p1.next;
    } else {
      if (p1Prev !== null) p1Prev.next = p2;
      p1Prev = p2;
      p2 = p2.next;
      p1Prev.next = p1;
    }
  }
  if (p1 === null) p1Prev.next = p2;
  return headOne.value < headTwo.value ? headOne : headTwo;
}

exports.LinkedList = LinkedList;
exports.mergeLinkedLists = mergeLinkedLists;

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

// O(n + m) time | O(n + m) space - where n is the number of nodes in the first
// Linked List and m is the number of nodes in the second Linked List
function mergeLinkedLists(headOne, headTwo) {
  recursiveMerge(headOne, headTwo, null);
  return headOne.value < headTwo.value ? headOne : headTwo;
}

function recursiveMerge(p1, p2, p1Prev) {
  if (p1 === null) {
    p1Prev.next = p2;
    return;
  }
  if (p2 === null) return;

  if (p1.value < p2.value) {
    recursiveMerge(p1.next, p2, p1);
  } else {
    if (p1Prev !== null) p1Prev.next = p2;
    const newP2 = p2.next;
    p2.next = p1;
    recursiveMerge(p1, newP2, p2);
  }
}

exports.LinkedList = LinkedList;
exports.mergeLinkedLists = mergeLinkedLists;

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
  const list1 = new LinkedList(2).addMany([6, 7, 8]);
  const list2 = new LinkedList(1).addMany([3, 4, 5, 9, 10]);
  const output = program.mergeLinkedLists(list1, list2);
  const expectedNodes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  chai.expect(output.getNodesInArray()).to.deep.equal(expectedNodes);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.LinkedList as LinkedList
import com.algoexpert.program.mergeLinkedLists as mergeLinkedLists

class ProgramTest {
    @Test
    fun TestCase1() {
        var linkedList1 = LinkedList(2)
        addAll(linkedList1, listOf(6, 7, 8))
        var linkedList2 = LinkedList(1)
        addAll(linkedList2, listOf(3, 4, 5, 9, 10))

        var result = getNodeValuesInArray(mergeLinkedLists(linkedList1, linkedList2))
        var expected = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

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

// O(n + m) time | O(1) space - where n is the number of nodes in the first
// Linked List and m is the number of nodes in the second Linked List
fun mergeLinkedLists(headOne: LinkedList, headTwo: LinkedList): LinkedList {
    var p1: LinkedList? = headOne
    var p1Prev: LinkedList? = null
    var p2: LinkedList? = headTwo
    while (p1 != null && p2 != null) {
        if (p1.value < p2.value) {
            p1Prev = p1
            p1 = p1.next
        } else {
            if (p1Prev != null) p1Prev.next = p2
            p1Prev = p2
            p2 = p2.next
            p1Prev.next = p1
        }
    }
    if (p1 == null) p1Prev?.next = p2
    return if (headOne.value < headTwo.value) headOne else headTwo
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

// O(n + m) time | O(n + m) space - where n is the number of nodes in the first
// Linked List and m is the number of nodes in the second Linked List
fun mergeLinkedLists(headOne: LinkedList, headTwo: LinkedList): LinkedList {
    recursiveMerge(headOne, headTwo, null)
    return if (headOne.value < headTwo.value) headOne else headTwo
}

fun recursiveMerge(p1: LinkedList?, p2: LinkedList?, p1Prev: LinkedList?) {
    if (p1 == null) {
        p1Prev?.next = p2
        return
    }
    if (p2 == null) return

    if (p1.value < p2.value) {
        recursiveMerge(p1.next, p2, p1)
    } else {
        if (p1Prev != null) p1Prev.next = p2
        val newP2: LinkedList? = p2.next
        p2.next = p1
        recursiveMerge(p1, newP2, p2)
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.LinkedList as LinkedList
import com.algoexpert.program.mergeLinkedLists as mergeLinkedLists

class ProgramTest {
    @Test
    fun TestCase1() {
        var linkedList1 = LinkedList(2)
        addAll(linkedList1, listOf(6, 7, 8))
        var linkedList2 = LinkedList(1)
        addAll(linkedList2, listOf(3, 4, 5, 9, 10))

        var result = getNodeValuesInArray(mergeLinkedLists(linkedList1, linkedList2))
        var expected = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

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
      let list1 = newLinkedList(2, 6, 7, 8)
      let list2 = newLinkedList(1, 3, 4, 5, 9, 10)
      var output = toArray(program.mergeLinkedLists(list1, list2))
      let expectedNodes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      try assertEqual(expectedNodes, output)
    }
  }
}

func newLinkedList(_ val: Int, _ others: Int...) -> Program.LinkedList {
  let ll = Program.LinkedList(value: val)
  var current = ll
  for other in others {
    let next = Program.LinkedList(value: other)
    current.next = next
    current = next
  }
  return ll
}

func toArray(_ ll: Program.LinkedList) -> [Int] {
  var vals = [Int]()
  var current = ll as Program.LinkedList?
  while current != nil {
    vals.append(current!.value)
    current = current!.next
  }
  return vals
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

  // O(n + m) time | O(1) space - where n is the number of nodes in the first
  // Linked List and m is the number of nodes in the second Linked List
  func mergeLinkedLists(_ headOne: LinkedList, _ headTwo: LinkedList) -> LinkedList {
    var p1 = headOne as LinkedList?
    var p2 = headTwo as LinkedList?
    var p1Prev: LinkedList?

    while p1 != nil, p2 != nil {
      if p1!.value < p2!.value {
        p1Prev = p1
        p1 = p1!.next
      } else {
        if p1Prev != nil {
          p1Prev!.next = p2
        }
        p1Prev = p2
        p2 = p2!.next
        p1Prev!.next = p1
      }
    }

    if p1 == nil, p1Prev != nil {
      p1Prev!.next = p2
    }

    if headOne.value < headTwo.value {
      return headOne
    }
    return headTwo
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

  // O(n + m) time | O(1) space - where n is the number of nodes in the first
  // Linked List and m is the number of nodes in the second Linked List
  func mergeLinkedLists(_ headOne: LinkedList, _ headTwo: LinkedList) -> LinkedList {
    recursiveMerge(headOne, headTwo, nil)
    if headOne.value < headTwo.value {
      return headOne
    }
    return headTwo
  }

  func recursiveMerge(_ p1: LinkedList?, _ p2: LinkedList?, _ p1Prev: LinkedList?) {
    if p1 == nil {
      p1Prev!.next = p2
      return
    }

    if p2 == nil {
      return
    }

    if p1!.value < p2!.value {
      recursiveMerge(p1!.next, p2, p1)
      return
    }

    if p1Prev != nil {
      p1Prev!.next = p2
    }

    let newP2 = p2!.next
    p2!.next = p1
    recursiveMerge(p1, newP2, p2)
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let list1 = newLinkedList(2, 6, 7, 8)
      let list2 = newLinkedList(1, 3, 4, 5, 9, 10)
      var output = toArray(program.mergeLinkedLists(list1, list2))
      let expectedNodes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      try assertEqual(expectedNodes, output)
    }
  }
}

func newLinkedList(_ val: Int, _ others: Int...) -> Program.LinkedList {
  let ll = Program.LinkedList(value: val)
  var current = ll
  for other in others {
    let next = Program.LinkedList(value: other)
    current.next = next
    current = next
  }
  return ll
}

func toArray(_ ll: Program.LinkedList) -> [Int] {
  var vals = [Int]()
  var current = ll as Program.LinkedList?
  while current != nil {
    vals.append(current!.value)
    current = current!.next
  }
  return vals
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
        list1 = LinkedList(2).addMany([6, 7, 8])
        list2 = LinkedList(1).addMany([3, 4, 5, 9, 10])
        output = program.mergeLinkedLists(list1, list2)
        expectedNodes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        self.assertEqual(output.getNodesInArray(), expectedNodes)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None


# O(n + m) time | O(1) space - where n is the number of nodes in the first
# Linked List and m is the number of nodes in the second Linked List
def mergeLinkedLists(headOne, headTwo):
    p1 = headOne
    p1Prev = None
    p2 = headTwo
    while p1 is not None and p2 is not None:
        if p1.value < p2.value:
            p1Prev = p1
            p1 = p1.next
        else:
            if p1Prev is not None:
                p1Prev.next = p2
            p1Prev = p2
            p2 = p2.next
            p1Prev.next = p1
    if p1 is None:
        p1Prev.next = p2
    return headOne if headOne.value < headTwo.value else headTwo

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None


# O(n + m) time | O(n + m) space - where n is the number of nodes in the first
# Linked List and m is the number of nodes in the second Linked List
def mergeLinkedLists(headOne, headTwo):
    recursiveMerge(headOne, headTwo, None)
    return headOne if headOne.value < headTwo.value else headTwo


def recursiveMerge(p1, p2, p1Prev):
    if p1 is None:
        p1Prev.next = p2
        return
    if p2 is None:
        return

    if p1.value < p2.value:
        recursiveMerge(p1.next, p2, p1)
    else:
        if p1Prev is not None:
            p1Prev.next = p2
        newP2 = p2.next
        p2.next = p1
        recursiveMerge(p1, newP2, p2)

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
        list1 = LinkedList(2).addMany([6, 7, 8])
        list2 = LinkedList(1).addMany([3, 4, 5, 9, 10])
        output = program.mergeLinkedLists(list1, list2)
        expectedNodes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        self.assertEqual(output.getNodesInArray(), expectedNodes)

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
  const list1 = addMany(new LinkedList(2), [6, 7, 8]);
  const list2 = addMany(new LinkedList(1), [3, 4, 5, 9, 10]);
  const output = program.mergeLinkedLists(list1, list2);
  const expectedNodes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  chai.expect(getNodesInArray(output)).to.deep.equal(expectedNodes);
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

// O(n + m) time | O(1) space - where n is the number of nodes in the first
// Linked List and m is the number of nodes in the second Linked List
export function mergeLinkedLists(headOne: LinkedList, headTwo: LinkedList) {
  let p1: LinkedList | null = headOne;
  let p1Prev: LinkedList | null = null;
  let p2: LinkedList | null = headTwo;
  while (p1 !== null && p2 !== null) {
    if (p1.value < p2.value) {
      p1Prev = p1;
      p1 = p1.next;
    } else {
      if (p1Prev !== null) p1Prev.next = p2;
      p1Prev = p2;
      p2 = p2.next;
      p1Prev.next = p1;
    }
  }
  if (p1 === null) p1Prev!.next = p2;
  return headOne.value < headTwo.value ? headOne : headTwo;
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

// O(n + m) time | O(n + m) space - where n is the number of nodes in the first
// Linked List and m is the number of nodes in the second Linked List
export function mergeLinkedLists(headOne: LinkedList, headTwo: LinkedList) {
  recursiveMerge(headOne, headTwo, null);
  return headOne.value < headTwo.value ? headOne : headTwo;
}

function recursiveMerge(p1: LinkedList | null, p2: LinkedList | null, p1Prev: LinkedList | null) {
  if (p1 === null) {
    p1Prev!.next = p2;
    return;
  }
  if (p2 === null) return;

  if (p1.value < p2.value) {
    recursiveMerge(p1.next, p2, p1);
  } else {
    if (p1Prev !== null) p1Prev.next = p2;
    const newP2 = p2.next;
    p2.next = p1;
    recursiveMerge(p1, newP2, p2);
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

type LinkedList = program.LinkedList;
const {LinkedList} = program;

it('Test Case #1', function () {
  const list1 = addMany(new LinkedList(2), [6, 7, 8]);
  const list2 = addMany(new LinkedList(1), [3, 4, 5, 9, 10]);
  const output = program.mergeLinkedLists(list1, list2);
  const expectedNodes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  chai.expect(getNodesInArray(output)).to.deep.equal(expectedNodes);
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

