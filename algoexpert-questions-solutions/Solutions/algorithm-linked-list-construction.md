# Linked List Construction
<div class="html">
<p>
  Write a <span>DoublyLinkedList</span> class that has a <span>head</span> and a
  <span>tail</span>, both of which point to either a linked list
  <span>Node</span> or <span>None</span> / <span>null</span>. The class should
  support:
</p>
<ul>
  <li>
    Setting the head and tail of the linked list.
  </li>
  <li>
    Inserting nodes before and after other nodes as well as at given positions
    (the position of the head node is <span>1</span>).
  </li>
  <li>Removing given nodes and removing nodes with given values.</li>
  <li>Searching for nodes with given values.</li>
</ul>
<p>
  Note that the <span>setHead</span>, <span>setTail</span>,
  <span>insertBefore</span>, <span>insertAfter</span>,
  <span>insertAtPosition</span>, and <span>remove</span> methods all take in
  actual <span>Node</span>s as input parameters—not integers (except for
  <span>insertAtPosition</span>, which also takes in an integer representing the
  position); this means that you don't need to create any new <span>Node</span>s
  in these methods. The input nodes can be either stand-alone nodes or nodes
  that are already in the linked list. If they're nodes that are already in the
  linked list, the methods will effectively be <i>moving</i> the nodes within
  the linked list. You won't be told if the input nodes are already in the
  linked list, so your code will have to defensively handle this scenario.
</p>
<p>
  If you're doing this problem in an untyped language like Python or JavaScript,
  you may want to look at the various function signatures in a typed language
  like Java or TypeScript to get a better idea of what each input parameter is.
</p>
<p>
  Each <span>Node</span> has an integer <span>value</span> as well as a
  <span>prev</span> node and a <span>next</span> node, both of which can point
  to either another node or <span>None</span> / <span>null</span>.
</p>
<h3>Sample Usage</h3>
<pre>
<span class="CodeEditor-promptComment">// Assume the following linked list has already been created:</span>
1 <-> 2 <-> 3 <-> 4 <-> 5
<span class="CodeEditor-promptComment">// Assume that we also have the following stand-alone nodes:</span>
3, 3, 6
<span class="CodeEditor-promptParameter">setHead</span>(4): 4 <-> 1 <-> 2 <-> 3 <-> 5 <span class="CodeEditor-promptComment">// set the existing node with value 4 as the head</span>
<span class="CodeEditor-promptParameter">setTail</span>(6): 4 <-> 1 <-> 2 <-> 3 <-> 5 <-> 6 <span class="CodeEditor-promptComment">// set the stand-alone node with value 6 as the tail</span>
<span class="CodeEditor-promptParameter">insertBefore</span>(6, 3): 4 <-> 1 <-> 2 <-> 5 <-> 3 <-> 6 <span class="CodeEditor-promptComment">// move the existing node with value 3 before the existing node with value 6</span>
<span class="CodeEditor-promptParameter">insertAfter</span>(6, 3): 4 <-> 1 <-> 2 <-> 5 <-> 3 <-> 6 <-> 3 <span class="CodeEditor-promptComment">// insert a stand-alone node with value 3 after the existing node with value 6</span>
<span class="CodeEditor-promptParameter">insertAtPosition</span>(1, 3): 3 <-> 4 <-> 1 <-> 2 <-> 5 <-> 3 <-> 6 <-> 3 <span class="CodeEditor-promptComment">// insert a stand-alone node with value 3 in position 1</span>
<span class="CodeEditor-promptParameter">removeNodesWithValue</span>(3): 4 <-> 1 <-> 2 <-> 5 <-> 6 <span class="CodeEditor-promptComment">// remove all nodes with value 3</span>
<span class="CodeEditor-promptParameter">remove</span>(2): 4 <-> 1 <-> 5 <-> 6 <span class="CodeEditor-promptComment">// remove the existing node with value 2</span>
<span class="CodeEditor-promptParameter">containsNodeWithValue</span>(5): true
</pre>
</div>

Hint 1
<p>
When dealing with linked lists, it's very important to keep track of pointers on nodes (i.e., the "next" and "prev" properties on the nodes). For instance, if you're inserting a node in a linked list, but that node is already located somewhere else in the linked list (in other words, if you're moving a node), it's crucial to completely update the pointers of the adjacent nodes of the node being moved before updating the node's own pointers. The order in which you update nodes' pointers will make or break your algorithm.
</p>


Hint 2

<p>
Realize that the insertBefore() and insertAfter() methods can be used to implement the setHead(), setTail(), and insertAtPosition() methods; making the insertBefore() and insertAfter() methods as robust as possible will simplify your code for the other methods. Make sure to take care of edge cases involving inserting nodes before the head of the linked list or inserting nodes after the tail of the linked list.
</p>


Hint 3

<p>
Similar to Hint #2, realize that the remove() method can be used to implement the removeNodesWithValue() method as well as parts of the insertBefore() and insertAfter() methods; make sure that the remove() method handles edge cases regarding the head and the tail.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

#include <vector>

Node::Node(int value) {
  this->value = value;
  prev = nullptr;
  next = nullptr;
};

vector<int> getNodeValuesHeadToTail(DoublyLinkedList linkedList) {
  vector<int> values = {};
  Node *node = linkedList.head;
  while (node != nullptr) {
    values.push_back(node->value);
    node = node->next;
  }
  return values;
}

vector<int> getNodeValuesTailToHead(DoublyLinkedList linkedList) {
  vector<int> values = {};
  Node *node = linkedList.tail;
  while (node != nullptr) {
    values.push_back(node->value);
    node = node->prev;
  }
  return values;
}

void bindNodes(Node *nodeOne, Node *nodeTwo) {
  nodeOne->next = nodeTwo;
  nodeTwo->prev = nodeOne;
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      DoublyLinkedList linkedList;
      Node one(1);
      Node two(2);
      Node three(3);
      Node three2(3);
      Node three3(3);
      Node four(4);
      Node five(5);
      Node six(6);
      bindNodes(&one, &two);
      bindNodes(&two, &three);
      bindNodes(&three, &four);
      bindNodes(&four, &five);
      linkedList.head = &one;
      linkedList.tail = &five;

      linkedList.setHead(&four);
      assert(getNodeValuesHeadToTail(linkedList) ==
             (vector<int>{4, 1, 2, 3, 5}));
      assert(getNodeValuesTailToHead(linkedList) ==
             (vector<int>{5, 3, 2, 1, 4}));

      linkedList.setTail(&six);
      assert(getNodeValuesHeadToTail(linkedList) ==
             (vector<int>{4, 1, 2, 3, 5, 6}));
      assert(getNodeValuesTailToHead(linkedList) ==
             (vector<int>{6, 5, 3, 2, 1, 4}));

      linkedList.insertBefore(&six, &three);
      assert(getNodeValuesHeadToTail(linkedList) ==
             (vector<int>{4, 1, 2, 5, 3, 6}));
      assert(getNodeValuesTailToHead(linkedList) ==
             (vector<int>{6, 3, 5, 2, 1, 4}));

      linkedList.insertAfter(&six, &three2);
      assert(getNodeValuesHeadToTail(linkedList) ==
             (vector<int>{4, 1, 2, 5, 3, 6, 3}));
      assert(getNodeValuesTailToHead(linkedList) ==
             (vector<int>{3, 6, 3, 5, 2, 1, 4}));

      linkedList.insertAtPosition(1, &three3);
      assert(getNodeValuesHeadToTail(linkedList) ==
             (vector<int>{3, 4, 1, 2, 5, 3, 6, 3}));
      assert(getNodeValuesTailToHead(linkedList) ==
             (vector<int>{3, 6, 3, 5, 2, 1, 4, 3}));

      linkedList.removeNodesWithValue(3);
      assert(getNodeValuesHeadToTail(linkedList) ==
             (vector<int>{4, 1, 2, 5, 6}));
      assert(getNodeValuesTailToHead(linkedList) ==
             (vector<int>{6, 5, 2, 1, 4}));

      linkedList.remove(&two);
      assert(getNodeValuesHeadToTail(linkedList) == (vector<int>{4, 1, 5, 6}));
      assert(getNodeValuesTailToHead(linkedList) == (vector<int>{6, 5, 1, 4}));

      assert(linkedList.containsNodeWithValue(5) == true);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

class Node {
public:
  int value;
  Node *prev;
  Node *next;

  Node(int value);
};

class DoublyLinkedList {
public:
  Node *head;
  Node *tail;

  DoublyLinkedList() {
    head = nullptr;
    tail = nullptr;
  }

  // O(1) time | O(1) space
  void setHead(Node *node) {
    if (head == nullptr) {
      head = node;
      tail = node;
      return;
    }
    insertBefore(head, node);
  }

  // O(1) time | O(1) space
  void setTail(Node *node) {
    if (tail == nullptr) {
      setHead(node);
      return;
    }
    insertAfter(tail, node);
  }

  // O(1) time | O(1) space
  void insertBefore(Node *node, Node *nodeToInsert) {
    if (nodeToInsert == head && nodeToInsert == tail)
      return;
    remove(nodeToInsert);
    nodeToInsert->prev = node->prev;
    nodeToInsert->next = node;
    if (node->prev == nullptr) {
      head = nodeToInsert;
    } else {
      node->prev->next = nodeToInsert;
    }
    node->prev = nodeToInsert;
  }

  // O(1) time | O(1) space
  void insertAfter(Node *node, Node *nodeToInsert) {
    if (nodeToInsert == head && nodeToInsert == tail)
      return;
    remove(nodeToInsert);
    nodeToInsert->prev = node;
    nodeToInsert->next = node->next;
    if (node->next == nullptr) {
      tail = nodeToInsert;
    } else {
      node->next->prev = nodeToInsert;
    }
    node->next = nodeToInsert;
  }

  // O(p) time | O(1) space
  void insertAtPosition(int position, Node *nodeToInsert) {
    if (position == 1) {
      setHead(nodeToInsert);
      return;
    }
    Node *node = head;
    int currentPosition = 1;
    while (node != nullptr && currentPosition++ != position)
      node = node->next;
    if (node != nullptr) {
      insertBefore(node, nodeToInsert);
    } else {
      setTail(nodeToInsert);
    }
  }

  // O(n) time | O(1) space
  void removeNodesWithValue(int value) {
    Node *node = head;
    while (node != nullptr) {
      Node *nodeToRemove = node;
      node = node->next;
      if (nodeToRemove->value == value)
        remove(nodeToRemove);
    }
  }

  // O(1) time | O(1) space
  void remove(Node *node) {
    if (node == head)
      head = head->next;
    if (node == tail)
      tail = tail->prev;
    removeNodeBindings(node);
  }

  // O(n) time | O(1) space
  bool containsNodeWithValue(int value) {
    Node *node = head;
    while (node != nullptr && node->value != value)
      node = node->next;
    return node != nullptr;
  }

  void removeNodeBindings(Node *node) {
    if (node->prev != nullptr)
      node->prev->next = node->next;
    if (node->next != nullptr)
      node->next->prev = node->prev;
    node->prev = nullptr;
    node->next = nullptr;
  }
};

```
### Unit Tests 1 (cpp)
```cpp
#include <vector>

Node::Node(int value) {
  this->value = value;
  prev = nullptr;
  next = nullptr;
};

vector<int> getNodeValuesHeadToTail(DoublyLinkedList linkedList) {
  vector<int> values = {};
  Node *node = linkedList.head;
  while (node != nullptr) {
    values.push_back(node->value);
    node = node->next;
  }
  return values;
}

vector<int> getNodeValuesTailToHead(DoublyLinkedList linkedList) {
  vector<int> values = {};
  Node *node = linkedList.tail;
  while (node != nullptr) {
    values.push_back(node->value);
    node = node->prev;
  }
  return values;
}

void bindNodes(Node *nodeOne, Node *nodeTwo) {
  nodeOne->next = nodeTwo;
  nodeTwo->prev = nodeOne;
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      DoublyLinkedList linkedList;
      Node one(1);
      Node two(2);
      Node three(3);
      Node three2(3);
      Node three3(3);
      Node four(4);
      Node five(5);
      Node six(6);
      bindNodes(&one, &two);
      bindNodes(&two, &three);
      bindNodes(&three, &four);
      bindNodes(&four, &five);
      linkedList.head = &one;
      linkedList.tail = &five;

      linkedList.setHead(&four);
      assert(getNodeValuesHeadToTail(linkedList) ==
             (vector<int>{4, 1, 2, 3, 5}));
      assert(getNodeValuesTailToHead(linkedList) ==
             (vector<int>{5, 3, 2, 1, 4}));

      linkedList.setTail(&six);
      assert(getNodeValuesHeadToTail(linkedList) ==
             (vector<int>{4, 1, 2, 3, 5, 6}));
      assert(getNodeValuesTailToHead(linkedList) ==
             (vector<int>{6, 5, 3, 2, 1, 4}));

      linkedList.insertBefore(&six, &three);
      assert(getNodeValuesHeadToTail(linkedList) ==
             (vector<int>{4, 1, 2, 5, 3, 6}));
      assert(getNodeValuesTailToHead(linkedList) ==
             (vector<int>{6, 3, 5, 2, 1, 4}));

      linkedList.insertAfter(&six, &three2);
      assert(getNodeValuesHeadToTail(linkedList) ==
             (vector<int>{4, 1, 2, 5, 3, 6, 3}));
      assert(getNodeValuesTailToHead(linkedList) ==
             (vector<int>{3, 6, 3, 5, 2, 1, 4}));

      linkedList.insertAtPosition(1, &three3);
      assert(getNodeValuesHeadToTail(linkedList) ==
             (vector<int>{3, 4, 1, 2, 5, 3, 6, 3}));
      assert(getNodeValuesTailToHead(linkedList) ==
             (vector<int>{3, 6, 3, 5, 2, 1, 4, 3}));

      linkedList.removeNodesWithValue(3);
      assert(getNodeValuesHeadToTail(linkedList) ==
             (vector<int>{4, 1, 2, 5, 6}));
      assert(getNodeValuesTailToHead(linkedList) ==
             (vector<int>{6, 5, 2, 1, 4}));

      linkedList.remove(&two);
      assert(getNodeValuesHeadToTail(linkedList) == (vector<int>{4, 1, 5, 6}));
      assert(getNodeValuesTailToHead(linkedList) == (vector<int>{6, 5, 1, 4}));

      assert(linkedList.containsNodeWithValue(5) == true);
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
	private List<int> getNodeValuesHeadToTail(Program.DoublyLinkedList linkedList) {
		List<int> values = new List<int>();
		Program.Node node = linkedList.Head;
		while (node != null) {
			values.Add(node.Value);
			node = node.Next;
		}
		return values;
	}

	private List<int> getNodeValuesTailToHead(Program.DoublyLinkedList linkedList) {
		List<int> values = new List<int>();
		Program.Node node = linkedList.Tail;
		while (node != null) {
			values.Add(node.Value);
			node = node.Prev;
		}
		return values;
	}

	private void bindNodes(Program.Node nodeOne, Program.Node nodeTwo) {
		nodeOne.Next = nodeTwo;
		nodeTwo.Prev = nodeOne;
	}

	private bool compare(List<int> array1, int[] array2) {
		if (array1.Count != array2.Length) {
			return false;
		}
		for (int i = 0; i < array1.Count; i++) {
			if (array1[i] != array2[i]) {
				return false;
			}
		}
		return true;
	}

	[Test]
	public void TestCase1() {
		Program.DoublyLinkedList linkedList = new Program.DoublyLinkedList();
		Program.Node one = new Program.Node(1);
		Program.Node two = new Program.Node(2);
		Program.Node three = new Program.Node(3);
		Program.Node three2 = new Program.Node(3);
		Program.Node three3 = new Program.Node(3);
		Program.Node four = new Program.Node(4);
		Program.Node five = new Program.Node(5);
		Program.Node six = new Program.Node(6);
		bindNodes(one, two);
		bindNodes(two, three);
		bindNodes(three, four);
		bindNodes(four, five);
		linkedList.Head = one;
		linkedList.Tail = five;

		linkedList.SetHead(four);
		Utils.AssertTrue(compare(getNodeValuesHeadToTail(linkedList),
		  new int[] {4, 1, 2, 3, 5}));
		Utils.AssertTrue(compare(getNodeValuesTailToHead(linkedList),
		  new int[] {5, 3, 2, 1, 4}));

		linkedList.SetTail(six);
		Utils.AssertTrue(compare(getNodeValuesHeadToTail(linkedList),
		  new int[] {4, 1, 2, 3, 5, 6}));
		Utils.AssertTrue(compare(getNodeValuesTailToHead(linkedList),
		  new int[] {6, 5, 3, 2, 1, 4}));

		linkedList.InsertBefore(six, three);
		Utils.AssertTrue(compare(getNodeValuesHeadToTail(linkedList),
		  new int[] {4, 1, 2, 5, 3, 6}));
		Utils.AssertTrue(compare(getNodeValuesTailToHead(linkedList),
		  new int[] {6, 3, 5, 2, 1, 4}));

		linkedList.InsertAfter(six, three2);
		Utils.AssertTrue(compare(getNodeValuesHeadToTail(linkedList),
		  new int[] {4, 1, 2, 5, 3, 6, 3}));
		Utils.AssertTrue(compare(getNodeValuesTailToHead(linkedList),
		  new int[] {3, 6, 3, 5, 2, 1, 4}));

		linkedList.InsertAtPosition(1, three3);
		Utils.AssertTrue(compare(getNodeValuesHeadToTail(linkedList),
		  new int[] {3, 4, 1, 2, 5, 3, 6, 3}));
		Utils.AssertTrue(compare(getNodeValuesTailToHead(linkedList),
		  new int[] {3, 6, 3, 5, 2, 1, 4, 3}));

		linkedList.RemoveNodesWithValue(3);
		Utils.AssertTrue(compare(getNodeValuesHeadToTail(linkedList),
		  new int[] {4, 1, 2, 5, 6}));
		Utils.AssertTrue(compare(getNodeValuesTailToHead(linkedList),
		  new int[] {6, 5, 2, 1, 4}));

		linkedList.Remove(two);
		Utils.AssertTrue(compare(getNodeValuesHeadToTail(
			  linkedList), new int[] {4, 1, 5, 6}));
		Utils.AssertTrue(compare(getNodeValuesTailToHead(
			  linkedList), new int[] {6, 5, 1, 4}));

		Utils.AssertTrue(linkedList.ContainsNodeWithValue(5));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	public class DoublyLinkedList {
		public Node Head;
		public Node Tail;

		// O(1) time | O(1) space
		public void SetHead(Node node) {
			if (Head == null) {
				Head = node;
				Tail = node;
				return;
			}
			InsertBefore(Head, node);
		}

		// O(1) time | O(1) space
		public void SetTail(Node node) {
			if (Tail == null) {
				SetHead(node);
				return;
			}
			InsertAfter(Tail, node);
		}

		// O(1) time | O(1) space
		public void InsertBefore(Node node, Node nodeToInsert) {
			if (nodeToInsert == Head && nodeToInsert == Tail) return;
			Remove(nodeToInsert);
			nodeToInsert.Prev = node.Prev;
			nodeToInsert.Next = node;
			if (node.Prev == null) {
				Head = nodeToInsert;
			} else {
				node.Prev.Next = nodeToInsert;
			}
			node.Prev = nodeToInsert;
		}

		// O(1) time | O(1) space
		public void InsertAfter(Node node, Node nodeToInsert) {
			if (nodeToInsert == Head && nodeToInsert == Tail) return;
			Remove(nodeToInsert);
			nodeToInsert.Prev = node;
			nodeToInsert.Next = node.Next;
			if (node.Next == null) {
				Tail = nodeToInsert;
			} else {
				node.Next.Prev = nodeToInsert;
			}
			node.Next = nodeToInsert;
		}

		// O(p) time | O(1) space
		public void InsertAtPosition(int position, Node nodeToInsert) {
			if (position == 1) {
				SetHead(nodeToInsert);
				return;
			}
			Node node = Head;
			int currentPosition = 1;
			while (node != null && currentPosition++ != position) node = node.Next;
			if (node != null) {
				InsertBefore(node, nodeToInsert);
			} else {
				SetTail(nodeToInsert);
			}
		}

		// O(n) time | O(1) space
		public void RemoveNodesWithValue(int value) {
			Node node = Head;
			while (node != null) {
				Node nodeToRemove = node;
				node = node.Next;
				if (nodeToRemove.Value == value) Remove(nodeToRemove);
			}
		}

		// O(1) time | O(1) space
		public void Remove(Node node) {
			if (node == Head) Head = Head.Next;
			if (node == Tail) Tail = Tail.Prev;
			RemoveNodeBindings(node);
		}

		// O(n) time | O(1) space
		public bool ContainsNodeWithValue(int value) {
			Node node = Head;
			while (node != null && node.Value != value) node = node.Next;
			return node != null;
		}

		public void RemoveNodeBindings(Node node) {
			if (node.Prev != null) node.Prev.Next = node.Next;
			if (node.Next != null) node.Next.Prev = node.Prev;
			node.Prev = null;
			node.Next = null;
		}
	}

	public class Node {
		public int Value;
		public Node Prev;
		public Node Next;

		public Node(int value) {
			this.Value = value;
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;

public class ProgramTest {
	private List<int> getNodeValuesHeadToTail(Program.DoublyLinkedList linkedList) {
		List<int> values = new List<int>();
		Program.Node node = linkedList.Head;
		while (node != null) {
			values.Add(node.Value);
			node = node.Next;
		}
		return values;
	}

	private List<int> getNodeValuesTailToHead(Program.DoublyLinkedList linkedList) {
		List<int> values = new List<int>();
		Program.Node node = linkedList.Tail;
		while (node != null) {
			values.Add(node.Value);
			node = node.Prev;
		}
		return values;
	}

	private void bindNodes(Program.Node nodeOne, Program.Node nodeTwo) {
		nodeOne.Next = nodeTwo;
		nodeTwo.Prev = nodeOne;
	}

	private bool compare(List<int> array1, int[] array2) {
		if (array1.Count != array2.Length) {
			return false;
		}
		for (int i = 0; i < array1.Count; i++) {
			if (array1[i] != array2[i]) {
				return false;
			}
		}
		return true;
	}

	[Test]
	public void TestCase1() {
		Program.DoublyLinkedList linkedList = new Program.DoublyLinkedList();
		Program.Node one = new Program.Node(1);
		Program.Node two = new Program.Node(2);
		Program.Node three = new Program.Node(3);
		Program.Node three2 = new Program.Node(3);
		Program.Node three3 = new Program.Node(3);
		Program.Node four = new Program.Node(4);
		Program.Node five = new Program.Node(5);
		Program.Node six = new Program.Node(6);
		bindNodes(one, two);
		bindNodes(two, three);
		bindNodes(three, four);
		bindNodes(four, five);
		linkedList.Head = one;
		linkedList.Tail = five;

		linkedList.SetHead(four);
		Utils.AssertTrue(compare(getNodeValuesHeadToTail(linkedList),
		  new int[] {4, 1, 2, 3, 5}));
		Utils.AssertTrue(compare(getNodeValuesTailToHead(linkedList),
		  new int[] {5, 3, 2, 1, 4}));

		linkedList.SetTail(six);
		Utils.AssertTrue(compare(getNodeValuesHeadToTail(linkedList),
		  new int[] {4, 1, 2, 3, 5, 6}));
		Utils.AssertTrue(compare(getNodeValuesTailToHead(linkedList),
		  new int[] {6, 5, 3, 2, 1, 4}));

		linkedList.InsertBefore(six, three);
		Utils.AssertTrue(compare(getNodeValuesHeadToTail(linkedList),
		  new int[] {4, 1, 2, 5, 3, 6}));
		Utils.AssertTrue(compare(getNodeValuesTailToHead(linkedList),
		  new int[] {6, 3, 5, 2, 1, 4}));

		linkedList.InsertAfter(six, three2);
		Utils.AssertTrue(compare(getNodeValuesHeadToTail(linkedList),
		  new int[] {4, 1, 2, 5, 3, 6, 3}));
		Utils.AssertTrue(compare(getNodeValuesTailToHead(linkedList),
		  new int[] {3, 6, 3, 5, 2, 1, 4}));

		linkedList.InsertAtPosition(1, three3);
		Utils.AssertTrue(compare(getNodeValuesHeadToTail(linkedList),
		  new int[] {3, 4, 1, 2, 5, 3, 6, 3}));
		Utils.AssertTrue(compare(getNodeValuesTailToHead(linkedList),
		  new int[] {3, 6, 3, 5, 2, 1, 4, 3}));

		linkedList.RemoveNodesWithValue(3);
		Utils.AssertTrue(compare(getNodeValuesHeadToTail(linkedList),
		  new int[] {4, 1, 2, 5, 6}));
		Utils.AssertTrue(compare(getNodeValuesTailToHead(linkedList),
		  new int[] {6, 5, 2, 1, 4}));

		linkedList.Remove(two);
		Utils.AssertTrue(compare(getNodeValuesHeadToTail(
			  linkedList), new int[] {4, 1, 5, 6}));
		Utils.AssertTrue(compare(getNodeValuesTailToHead(
			  linkedList), new int[] {6, 5, 1, 4}));

		Utils.AssertTrue(linkedList.ContainsNodeWithValue(5));
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
	linkedList := NewDoublyLinkedList()
	one := NewNode(1)
	two := NewNode(2)
	three := NewNode(3)
	three2 := NewNode(3)
	three3 := NewNode(3)
	four := NewNode(4)
	five := NewNode(5)
	six := NewNode(6)
	bindNodes(one, two)
	bindNodes(two, three)
	bindNodes(three, four)
	bindNodes(four, five)
	linkedList.Head = one
	linkedList.Tail = five

	linkedList.SetHead(four)
	require.Equal(t, getNodeValuesHeadToTail(linkedList), []int{4, 1, 2, 3, 5})
	require.Equal(t, getNodeValuesTailToHead(linkedList), []int{5, 3, 2, 1, 4})

	linkedList.SetTail(six)
	require.Equal(t, getNodeValuesHeadToTail(linkedList), []int{4, 1, 2, 3, 5, 6})
	require.Equal(t, getNodeValuesTailToHead(linkedList), []int{6, 5, 3, 2, 1, 4})

	linkedList.InsertBefore(six, three)
	require.Equal(t, getNodeValuesHeadToTail(linkedList), []int{4, 1, 2, 5, 3, 6})
	require.Equal(t, getNodeValuesTailToHead(linkedList), []int{6, 3, 5, 2, 1, 4})

	linkedList.InsertAfter(six, three2)
	require.Equal(t, getNodeValuesHeadToTail(linkedList), []int{4, 1, 2, 5, 3, 6, 3})
	require.Equal(t, getNodeValuesTailToHead(linkedList), []int{3, 6, 3, 5, 2, 1, 4})

	linkedList.InsertAtPosition(1, three3)
	require.Equal(t, getNodeValuesHeadToTail(linkedList), []int{3, 4, 1, 2, 5, 3, 6, 3})
	require.Equal(t, getNodeValuesTailToHead(linkedList), []int{3, 6, 3, 5, 2, 1, 4, 3})

	linkedList.RemoveNodesWithValue(3)
	require.Equal(t, getNodeValuesHeadToTail(linkedList), []int{4, 1, 2, 5, 6})
	require.Equal(t, getNodeValuesTailToHead(linkedList), []int{6, 5, 2, 1, 4})

	linkedList.Remove(two)
	require.Equal(t, getNodeValuesHeadToTail(linkedList), []int{4, 1, 5, 6})
	require.Equal(t, getNodeValuesTailToHead(linkedList), []int{6, 5, 1, 4})

	require.Equal(t, linkedList.ContainsNodeWithValue(5), true)
}

func NewNode(value int) *Node { return &Node{Value: value} }

func getNodeValuesHeadToTail(ll *DoublyLinkedList) []int {
	values := []int{}
	node := ll.Head
	for node != nil {
		values = append(values, node.Value)
		node = node.Next
	}
	return values
}

func getNodeValuesTailToHead(ll *DoublyLinkedList) []int {
	values := []int{}
	node := ll.Tail
	for node != nil {
		values = append(values, node.Value)
		node = node.Prev
	}
	return values
}

func bindNodes(nodeOne *Node, nodeTwo *Node) {
	nodeOne.Next = nodeTwo
	nodeTwo.Prev = nodeOne
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type Node struct {
	Value      int
	Prev, Next *Node
}

type DoublyLinkedList struct {
	Head, Tail *Node
}

func NewDoublyLinkedList() *DoublyLinkedList {
	return &DoublyLinkedList{}
}

// O(1) time | O(1) space
func (ll *DoublyLinkedList) SetHead(node *Node) {
	if ll.Head == nil {
		ll.Head = node
		ll.Tail = node
		return
	}
	ll.InsertBefore(ll.Head, node)
}

// O(1) time | O(1) space
func (ll *DoublyLinkedList) SetTail(node *Node) {
	if ll.Tail == nil {
		ll.SetHead(node)
		return
	}
	ll.InsertAfter(ll.Tail, node)
}

// O(1) time | O(1) space
func (ll *DoublyLinkedList) InsertBefore(node, nodeToInsert *Node) {
	if nodeToInsert == ll.Head && nodeToInsert == ll.Tail {
		return
	}
	ll.Remove(nodeToInsert)
	nodeToInsert.Prev = node.Prev
	nodeToInsert.Next = node
	if node.Prev == nil {
		ll.Head = nodeToInsert
	} else {
		node.Prev.Next = nodeToInsert
	}
	node.Prev = nodeToInsert
}

// O(1) time | O(1) space
func (ll *DoublyLinkedList) InsertAfter(node, nodeToInsert *Node) {
	if nodeToInsert == ll.Head && nodeToInsert == ll.Tail {
		return
	}
	ll.Remove(nodeToInsert)
	nodeToInsert.Prev = node
	nodeToInsert.Next = node.Next
	if node.Next == nil {
		ll.Tail = nodeToInsert
	} else {
		node.Next.Prev = nodeToInsert
	}
	node.Next = nodeToInsert
}

// O(p) time | O(1) space
func (ll *DoublyLinkedList) InsertAtPosition(position int, nodeToInsert *Node) {
	if position == 1 {
		ll.SetHead(nodeToInsert)
		return
	}
	node := ll.Head
	currentPosition := 1
	for node != nil && currentPosition != position {
		node = node.Next
		currentPosition += 1
	}
	if node != nil {
		ll.InsertBefore(node, nodeToInsert)
	} else {
		ll.SetTail(nodeToInsert)
	}
}

// O(n) time | O(1) space
func (ll *DoublyLinkedList) RemoveNodesWithValue(value int) {
	node := ll.Head
	for node != nil {
		nodeToRemove := node
		node = node.Next
		if nodeToRemove.Value == value {
			ll.Remove(nodeToRemove)
		}
	}
}

// O(1) time | O(1) space
func (ll *DoublyLinkedList) Remove(node *Node) {
	if node == ll.Head {
		ll.Head = ll.Head.Next
	}
	if node == ll.Tail {
		ll.Tail = ll.Tail.Prev
	}
	ll.removeNodeBindings(node)
}

// O(n) time | O(1) space
func (ll *DoublyLinkedList) ContainsNodeWithValue(value int) bool {
	node := ll.Head
	for node != nil && node.Value != value {
		node = node.Next
	}
	return node != nil
}

func (ll *DoublyLinkedList) removeNodeBindings(node *Node) {
	if node.Prev != nil {
		node.Prev.Next = node.Next
	}
	if node.Next != nil {
		node.Next.Prev = node.Prev
	}
	node.Prev = nil
	node.Next = nil
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	linkedList := NewDoublyLinkedList()
	one := NewNode(1)
	two := NewNode(2)
	three := NewNode(3)
	three2 := NewNode(3)
	three3 := NewNode(3)
	four := NewNode(4)
	five := NewNode(5)
	six := NewNode(6)
	bindNodes(one, two)
	bindNodes(two, three)
	bindNodes(three, four)
	bindNodes(four, five)
	linkedList.Head = one
	linkedList.Tail = five

	linkedList.SetHead(four)
	require.Equal(t, getNodeValuesHeadToTail(linkedList), []int{4, 1, 2, 3, 5})
	require.Equal(t, getNodeValuesTailToHead(linkedList), []int{5, 3, 2, 1, 4})

	linkedList.SetTail(six)
	require.Equal(t, getNodeValuesHeadToTail(linkedList), []int{4, 1, 2, 3, 5, 6})
	require.Equal(t, getNodeValuesTailToHead(linkedList), []int{6, 5, 3, 2, 1, 4})

	linkedList.InsertBefore(six, three)
	require.Equal(t, getNodeValuesHeadToTail(linkedList), []int{4, 1, 2, 5, 3, 6})
	require.Equal(t, getNodeValuesTailToHead(linkedList), []int{6, 3, 5, 2, 1, 4})

	linkedList.InsertAfter(six, three2)
	require.Equal(t, getNodeValuesHeadToTail(linkedList), []int{4, 1, 2, 5, 3, 6, 3})
	require.Equal(t, getNodeValuesTailToHead(linkedList), []int{3, 6, 3, 5, 2, 1, 4})

	linkedList.InsertAtPosition(1, three3)
	require.Equal(t, getNodeValuesHeadToTail(linkedList), []int{3, 4, 1, 2, 5, 3, 6, 3})
	require.Equal(t, getNodeValuesTailToHead(linkedList), []int{3, 6, 3, 5, 2, 1, 4, 3})

	linkedList.RemoveNodesWithValue(3)
	require.Equal(t, getNodeValuesHeadToTail(linkedList), []int{4, 1, 2, 5, 6})
	require.Equal(t, getNodeValuesTailToHead(linkedList), []int{6, 5, 2, 1, 4})

	linkedList.Remove(two)
	require.Equal(t, getNodeValuesHeadToTail(linkedList), []int{4, 1, 5, 6})
	require.Equal(t, getNodeValuesTailToHead(linkedList), []int{6, 5, 1, 4})

	require.Equal(t, linkedList.ContainsNodeWithValue(5), true)
}

func NewNode(value int) *Node { return &Node{Value: value} }

func getNodeValuesHeadToTail(ll *DoublyLinkedList) []int {
	values := []int{}
	node := ll.Head
	for node != nil {
		values = append(values, node.Value)
		node = node.Next
	}
	return values
}

func getNodeValuesTailToHead(ll *DoublyLinkedList) []int {
	values := []int{}
	node := ll.Tail
	for node != nil {
		values = append(values, node.Value)
		node = node.Prev
	}
	return values
}

func bindNodes(nodeOne *Node, nodeTwo *Node) {
	nodeOne.Next = nodeTwo
	nodeTwo.Prev = nodeOne
}

```
### Sandbox Code (java)
```java
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import java.util.*;

class ProgramTest {
  private List<Integer> getNodeValuesHeadToTail(Program.DoublyLinkedList linkedList) {
    List<Integer> values = new ArrayList<Integer>();
    Program.Node node = linkedList.head;
    while (node != null) {
      values.add(node.value);
      node = node.next;
    }
    return values;
  }

  private List<Integer> getNodeValuesTailToHead(Program.DoublyLinkedList linkedList) {
    List<Integer> values = new ArrayList<Integer>();
    Program.Node node = linkedList.tail;
    while (node != null) {
      values.add(node.value);
      node = node.prev;
    }
    return values;
  }

  private void bindNodes(Program.Node nodeOne, Program.Node nodeTwo) {
    nodeOne.next = nodeTwo;
    nodeTwo.prev = nodeOne;
  }

  private boolean compare(List<Integer> array1, int[] array2) {
    if (array1.size() != array2.length) {
      return false;
    }
    for (int i = 0; i < array1.size(); i++) {
      if (array1.get(i) != array2[i]) {
        return false;
      }
    }
    return true;
  }

  @Test
  public void TestCase1() {
    Program.DoublyLinkedList linkedList = new Program.DoublyLinkedList();
    Program.Node one = new Program.Node(1);
    Program.Node two = new Program.Node(2);
    Program.Node three = new Program.Node(3);
    Program.Node three2 = new Program.Node(3);
    Program.Node three3 = new Program.Node(3);
    Program.Node four = new Program.Node(4);
    Program.Node five = new Program.Node(5);
    Program.Node six = new Program.Node(6);
    bindNodes(one, two);
    bindNodes(two, three);
    bindNodes(three, four);
    bindNodes(four, five);
    linkedList.head = one;
    linkedList.tail = five;

    linkedList.setHead(four);
    Utils.assertTrue(compare(getNodeValuesHeadToTail(linkedList), new int[] {4, 1, 2, 3, 5}));
    Utils.assertTrue(compare(getNodeValuesTailToHead(linkedList), new int[] {5, 3, 2, 1, 4}));

    linkedList.setTail(six);
    Utils.assertTrue(compare(getNodeValuesHeadToTail(linkedList), new int[] {4, 1, 2, 3, 5, 6}));
    Utils.assertTrue(compare(getNodeValuesTailToHead(linkedList), new int[] {6, 5, 3, 2, 1, 4}));

    linkedList.insertBefore(six, three);
    Utils.assertTrue(compare(getNodeValuesHeadToTail(linkedList), new int[] {4, 1, 2, 5, 3, 6}));
    Utils.assertTrue(compare(getNodeValuesTailToHead(linkedList), new int[] {6, 3, 5, 2, 1, 4}));

    linkedList.insertAfter(six, three2);
    Utils.assertTrue(compare(getNodeValuesHeadToTail(linkedList), new int[] {4, 1, 2, 5, 3, 6, 3}));
    Utils.assertTrue(compare(getNodeValuesTailToHead(linkedList), new int[] {3, 6, 3, 5, 2, 1, 4}));

    linkedList.insertAtPosition(1, three3);
    Utils.assertTrue(
        compare(getNodeValuesHeadToTail(linkedList), new int[] {3, 4, 1, 2, 5, 3, 6, 3}));
    Utils.assertTrue(
        compare(getNodeValuesTailToHead(linkedList), new int[] {3, 6, 3, 5, 2, 1, 4, 3}));

    linkedList.removeNodesWithValue(3);
    Utils.assertTrue(compare(getNodeValuesHeadToTail(linkedList), new int[] {4, 1, 2, 5, 6}));
    Utils.assertTrue(compare(getNodeValuesTailToHead(linkedList), new int[] {6, 5, 2, 1, 4}));

    linkedList.remove(two);
    Utils.assertTrue(compare(getNodeValuesHeadToTail(linkedList), new int[] {4, 1, 5, 6}));
    Utils.assertTrue(compare(getNodeValuesTailToHead(linkedList), new int[] {6, 5, 1, 4}));

    Utils.assertTrue(linkedList.containsNodeWithValue(5));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  static class DoublyLinkedList {
    public Node head;
    public Node tail;

    // O(1) time | O(1) space
    public void setHead(Node node) {
      if (head == null) {
        head = node;
        tail = node;
        return;
      }
      insertBefore(head, node);
    }

    // O(1) time | O(1) space
    public void setTail(Node node) {
      if (tail == null) {
        setHead(node);
        return;
      }
      insertAfter(tail, node);
    }

    // O(1) time | O(1) space
    public void insertBefore(Node node, Node nodeToInsert) {
      if (nodeToInsert == head && nodeToInsert == tail) return;
      remove(nodeToInsert);
      nodeToInsert.prev = node.prev;
      nodeToInsert.next = node;
      if (node.prev == null) {
        head = nodeToInsert;
      } else {
        node.prev.next = nodeToInsert;
      }
      node.prev = nodeToInsert;
    }

    // O(1) time | O(1) space
    public void insertAfter(Node node, Node nodeToInsert) {
      if (nodeToInsert == head && nodeToInsert == tail) return;
      remove(nodeToInsert);
      nodeToInsert.prev = node;
      nodeToInsert.next = node.next;
      if (node.next == null) {
        tail = nodeToInsert;
      } else {
        node.next.prev = nodeToInsert;
      }
      node.next = nodeToInsert;
    }

    // O(p) time | O(1) space
    public void insertAtPosition(int position, Node nodeToInsert) {
      if (position == 1) {
        setHead(nodeToInsert);
        return;
      }
      Node node = head;
      int currentPosition = 1;
      while (node != null && currentPosition++ != position) node = node.next;
      if (node != null) {
        insertBefore(node, nodeToInsert);
      } else {
        setTail(nodeToInsert);
      }
    }

    // O(n) time | O(1) space
    public void removeNodesWithValue(int value) {
      Node node = head;
      while (node != null) {
        Node nodeToRemove = node;
        node = node.next;
        if (nodeToRemove.value == value) remove(nodeToRemove);
      }
    }

    // O(1) time | O(1) space
    public void remove(Node node) {
      if (node == head) head = head.next;
      if (node == tail) tail = tail.prev;
      removeNodeBindings(node);
    }

    // O(n) time | O(1) space
    public boolean containsNodeWithValue(int value) {
      Node node = head;
      while (node != null && node.value != value) node = node.next;
      return node != null;
    }

    public void removeNodeBindings(Node node) {
      if (node.prev != null) node.prev.next = node.next;
      if (node.next != null) node.next.prev = node.prev;
      node.prev = null;
      node.next = null;
    }
  }

  static class Node {
    public int value;
    public Node prev;
    public Node next;

    public Node(int value) {
      this.value = value;
    }
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  private List<Integer> getNodeValuesHeadToTail(Program.DoublyLinkedList linkedList) {
    List<Integer> values = new ArrayList<Integer>();
    Program.Node node = linkedList.head;
    while (node != null) {
      values.add(node.value);
      node = node.next;
    }
    return values;
  }

  private List<Integer> getNodeValuesTailToHead(Program.DoublyLinkedList linkedList) {
    List<Integer> values = new ArrayList<Integer>();
    Program.Node node = linkedList.tail;
    while (node != null) {
      values.add(node.value);
      node = node.prev;
    }
    return values;
  }

  private void bindNodes(Program.Node nodeOne, Program.Node nodeTwo) {
    nodeOne.next = nodeTwo;
    nodeTwo.prev = nodeOne;
  }

  private boolean compare(List<Integer> array1, int[] array2) {
    if (array1.size() != array2.length) {
      return false;
    }
    for (int i = 0; i < array1.size(); i++) {
      if (array1.get(i) != array2[i]) {
        return false;
      }
    }
    return true;
  }

  @Test
  public void TestCase1() {
    Program.DoublyLinkedList linkedList = new Program.DoublyLinkedList();
    Program.Node one = new Program.Node(1);
    Program.Node two = new Program.Node(2);
    Program.Node three = new Program.Node(3);
    Program.Node three2 = new Program.Node(3);
    Program.Node three3 = new Program.Node(3);
    Program.Node four = new Program.Node(4);
    Program.Node five = new Program.Node(5);
    Program.Node six = new Program.Node(6);
    bindNodes(one, two);
    bindNodes(two, three);
    bindNodes(three, four);
    bindNodes(four, five);
    linkedList.head = one;
    linkedList.tail = five;

    linkedList.setHead(four);
    Utils.assertTrue(compare(getNodeValuesHeadToTail(linkedList), new int[] {4, 1, 2, 3, 5}));
    Utils.assertTrue(compare(getNodeValuesTailToHead(linkedList), new int[] {5, 3, 2, 1, 4}));

    linkedList.setTail(six);
    Utils.assertTrue(compare(getNodeValuesHeadToTail(linkedList), new int[] {4, 1, 2, 3, 5, 6}));
    Utils.assertTrue(compare(getNodeValuesTailToHead(linkedList), new int[] {6, 5, 3, 2, 1, 4}));

    linkedList.insertBefore(six, three);
    Utils.assertTrue(compare(getNodeValuesHeadToTail(linkedList), new int[] {4, 1, 2, 5, 3, 6}));
    Utils.assertTrue(compare(getNodeValuesTailToHead(linkedList), new int[] {6, 3, 5, 2, 1, 4}));

    linkedList.insertAfter(six, three2);
    Utils.assertTrue(compare(getNodeValuesHeadToTail(linkedList), new int[] {4, 1, 2, 5, 3, 6, 3}));
    Utils.assertTrue(compare(getNodeValuesTailToHead(linkedList), new int[] {3, 6, 3, 5, 2, 1, 4}));

    linkedList.insertAtPosition(1, three3);
    Utils.assertTrue(
        compare(getNodeValuesHeadToTail(linkedList), new int[] {3, 4, 1, 2, 5, 3, 6, 3}));
    Utils.assertTrue(
        compare(getNodeValuesTailToHead(linkedList), new int[] {3, 6, 3, 5, 2, 1, 4, 3}));

    linkedList.removeNodesWithValue(3);
    Utils.assertTrue(compare(getNodeValuesHeadToTail(linkedList), new int[] {4, 1, 2, 5, 6}));
    Utils.assertTrue(compare(getNodeValuesTailToHead(linkedList), new int[] {6, 5, 2, 1, 4}));

    linkedList.remove(two);
    Utils.assertTrue(compare(getNodeValuesHeadToTail(linkedList), new int[] {4, 1, 5, 6}));
    Utils.assertTrue(compare(getNodeValuesTailToHead(linkedList), new int[] {6, 5, 1, 4}));

    Utils.assertTrue(linkedList.containsNodeWithValue(5));
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

class TestNode {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

const Node = program.Node || TestNode;

function getNodeValuesHeadToTail(linkedList) {
  const values = [];
  let node = linkedList.head;
  while (node !== null) {
    values.push(node.value);
    node = node.next;
  }
  return values;
}

function getNodeValuesTailToHead(linkedList) {
  const values = [];
  let node = linkedList.tail;
  while (node !== null) {
    values.push(node.value);
    node = node.prev;
  }
  return values;
}

function bindNodes(nodeOne, nodeTwo) {
  nodeOne.next = nodeTwo;
  nodeTwo.prev = nodeOne;
}

it('Test Case #1', function () {
  const linkedList = new program.DoublyLinkedList();
  const one = new Node(1);
  const two = new Node(2);
  const three = new Node(3);
  const three2 = new Node(3);
  const three3 = new Node(3);
  const four = new Node(4);
  const five = new Node(5);
  const six = new Node(6);
  bindNodes(one, two);
  bindNodes(two, three);
  bindNodes(three, four);
  bindNodes(four, five);
  linkedList.head = one;
  linkedList.tail = five;

  linkedList.setHead(four);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 2, 3, 5]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([5, 3, 2, 1, 4]);

  linkedList.setTail(six);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 2, 3, 5, 6]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([6, 5, 3, 2, 1, 4]);

  linkedList.insertBefore(six, three);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 2, 5, 3, 6]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([6, 3, 5, 2, 1, 4]);

  linkedList.insertAfter(six, three2);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 2, 5, 3, 6, 3]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([3, 6, 3, 5, 2, 1, 4]);

  linkedList.insertAtPosition(1, three3);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([3, 4, 1, 2, 5, 3, 6, 3]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([3, 6, 3, 5, 2, 1, 4, 3]);

  linkedList.removeNodesWithValue(3);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 2, 5, 6]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([6, 5, 2, 1, 4]);

  linkedList.remove(two);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 5, 6]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([6, 5, 1, 4]);

  chai.expect(linkedList.containsNodeWithValue(5)).to.deep.equal(true);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // O(1) time | O(1) space
  setHead(node) {
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      return;
    }
    this.insertBefore(this.head, node);
  }

  // O(1) time | O(1) space
  setTail(node) {
    if (this.tail === null) {
      this.setHead(node);
      return;
    }
    this.insertAfter(this.tail, node);
  }

  // O(1) time | O(1) space
  insertBefore(node, nodeToInsert) {
    if (nodeToInsert === this.head && nodeToInsert === this.tail) return;
    this.remove(nodeToInsert);
    nodeToInsert.prev = node.prev;
    nodeToInsert.next = node;
    if (node.prev === null) {
      this.head = nodeToInsert;
    } else {
      node.prev.next = nodeToInsert;
    }
    node.prev = nodeToInsert;
  }

  // O(1) time | O(1) space
  insertAfter(node, nodeToInsert) {
    if (nodeToInsert === this.head && nodeToInsert === this.tail) return;
    this.remove(nodeToInsert);
    nodeToInsert.prev = node;
    nodeToInsert.next = node.next;
    if (node.next === null) {
      this.tail = nodeToInsert;
    } else {
      node.next.prev = nodeToInsert;
    }
    node.next = nodeToInsert;
  }

  // O(p) time | O(1) space
  insertAtPosition(position, nodeToInsert) {
    if (position === 1) {
      this.setHead(nodeToInsert);
      return;
    }
    let node = this.head;
    let currentPosition = 1;
    while (node !== null && currentPosition++ !== position) node = node.next;
    if (node !== null) {
      this.insertBefore(node, nodeToInsert);
    } else {
      this.setTail(nodeToInsert);
    }
  }

  // O(n) time | O(1) space
  removeNodesWithValue(value) {
    let node = this.head;
    while (node !== null) {
      const nodeToRemove = node;
      node = node.next;
      if (nodeToRemove.value === value) this.remove(nodeToRemove);
    }
  }

  // O(1) time | O(1) space
  remove(node) {
    if (node === this.head) this.head = this.head.next;
    if (node === this.tail) this.tail = this.tail.prev;
    this.removeNodeBindings(node);
  }

  // O(n) time | O(1) space
  containsNodeWithValue(value) {
    let node = this.head;
    while (node !== null && node.value !== value) node = node.next;
    return node !== null;
  }

  removeNodeBindings(node) {
    if (node.prev !== null) node.prev.next = node.next;
    if (node.next !== null) node.next.prev = node.prev;
    node.prev = null;
    node.next = null;
  }
}

exports.Node = Node;
exports.DoublyLinkedList = DoublyLinkedList;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

class TestNode {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

const Node = program.Node || TestNode;

function getNodeValuesHeadToTail(linkedList) {
  const values = [];
  let node = linkedList.head;
  while (node !== null) {
    values.push(node.value);
    node = node.next;
  }
  return values;
}

function getNodeValuesTailToHead(linkedList) {
  const values = [];
  let node = linkedList.tail;
  while (node !== null) {
    values.push(node.value);
    node = node.prev;
  }
  return values;
}

function bindNodes(nodeOne, nodeTwo) {
  nodeOne.next = nodeTwo;
  nodeTwo.prev = nodeOne;
}

it('Test Case #1', function () {
  const linkedList = new program.DoublyLinkedList();
  const one = new Node(1);
  const two = new Node(2);
  const three = new Node(3);
  const three2 = new Node(3);
  const three3 = new Node(3);
  const four = new Node(4);
  const five = new Node(5);
  const six = new Node(6);
  bindNodes(one, two);
  bindNodes(two, three);
  bindNodes(three, four);
  bindNodes(four, five);
  linkedList.head = one;
  linkedList.tail = five;

  linkedList.setHead(four);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 2, 3, 5]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([5, 3, 2, 1, 4]);

  linkedList.setTail(six);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 2, 3, 5, 6]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([6, 5, 3, 2, 1, 4]);

  linkedList.insertBefore(six, three);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 2, 5, 3, 6]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([6, 3, 5, 2, 1, 4]);

  linkedList.insertAfter(six, three2);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 2, 5, 3, 6, 3]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([3, 6, 3, 5, 2, 1, 4]);

  linkedList.insertAtPosition(1, three3);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([3, 4, 1, 2, 5, 3, 6, 3]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([3, 6, 3, 5, 2, 1, 4, 3]);

  linkedList.removeNodesWithValue(3);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 2, 5, 6]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([6, 5, 2, 1, 4]);

  linkedList.remove(two);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 5, 6]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([6, 5, 1, 4]);

  chai.expect(linkedList.containsNodeWithValue(5)).to.deep.equal(true);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.DoublyLinkedList
import com.algoexpert.program.Node

class ProgramTest {

    fun bindNodes(nodeOne: Node, nodeTwo: Node) {
        nodeOne.next = nodeTwo
        nodeTwo.prev = nodeOne
    }

    fun headToTail(dll: DoublyLinkedList): List<Int> {
        val values = mutableListOf<Int>()
        var current: Node? = dll.getHead()
        while (current != null) {
            values.add(current.value)
            current = current.next
        }
        return values
    }

    fun tailToHead(dll: DoublyLinkedList): List<Int> {
        val values = mutableListOf<Int>()
        var current: Node? = dll.getTail()
        while (current != null) {
            values.add(current.value)
            current = current.prev
        }
        return values
    }

    @Test
    fun TestCase1() {
        val linkedList = DoublyLinkedList()

        val one = Node(1)
        val two = Node(2)
        val three = Node(3)
        val three2 = Node(3)
        val three3 = Node(3)
        val four = Node(4)
        val five = Node(5)
        val six = Node(6)

        linkedList.setHead(one)
        linkedList.insertAfter(one, two)
        linkedList.insertAfter(two, three)
        linkedList.insertAfter(three, four)
        linkedList.insertAfter(four, five)

        linkedList.setHead(four)
        assert(headToTail(linkedList) == listOf(4, 1, 2, 3, 5))
        assert(tailToHead(linkedList) == listOf(5, 3, 2, 1, 4))

        linkedList.setTail(six)
        assert(headToTail(linkedList) == listOf(4, 1, 2, 3, 5, 6))
        assert(tailToHead(linkedList) == listOf(6, 5, 3, 2, 1, 4))

        linkedList.insertBefore(six, three)
        assert(headToTail(linkedList) == listOf(4, 1, 2, 5, 3, 6))
        assert(tailToHead(linkedList) == listOf(6, 3, 5, 2, 1, 4))

        linkedList.insertAfter(six, three2)
        assert(headToTail(linkedList) == listOf(4, 1, 2, 5, 3, 6, 3))
        assert(tailToHead(linkedList) == listOf(3, 6, 3, 5, 2, 1, 4))

        linkedList.insertAtPosition(1, three3)
        assert(headToTail(linkedList) == listOf(3, 4, 1, 2, 5, 3, 6, 3))
        assert(tailToHead(linkedList) == listOf(3, 6, 3, 5, 2, 1, 4, 3))

        linkedList.removeNodesWithValue(3)
        assert(headToTail(linkedList) == listOf(4, 1, 2, 5, 6))
        assert(tailToHead(linkedList) == listOf(6, 5, 2, 1, 4))

        linkedList.remove(two)
        assert(headToTail(linkedList) == listOf(4, 1, 5, 6))
        assert(tailToHead(linkedList) == listOf(6, 5, 1, 4))

        assert(linkedList.containsNodeWithValue(5))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

class Node(value: Int) {
    val value = value
    var prev: Node? = null
    var next: Node? = null
}

class DoublyLinkedList {
    private var head: Node? = null
    private var tail: Node? = null

    // O(1) time | O(1) space
    fun setHead(node: Node) {
        if (this.head == null) {
            this.head = node
            this.tail = node
            return
        }
        this.insertBefore(this.head!!, node)
    }

    // O(1) time | O(1) space
    fun setTail(node: Node) {
        if (this.tail == null) {
            setHead(node)
            return
        }
        insertAfter(this.tail!!, node)
    }

    // O(1) time | O(1) space
    fun insertBefore(node: Node, nodeToInsert: Node) {
        if (nodeToInsert == this.head && nodeToInsert == this.tail) return
        remove(nodeToInsert)
        nodeToInsert.prev = node.prev
        nodeToInsert.next = node
        if (node.prev == null) {
            this.head = nodeToInsert
        } else {
            node.prev!!.next = nodeToInsert
        }
        node.prev = nodeToInsert
    }

    // O(1) time | O(1) space
    fun insertAfter(node: Node, nodeToInsert: Node) {
        if (nodeToInsert == this.head && nodeToInsert == tail) return
        remove(nodeToInsert)
        nodeToInsert.prev = node
        nodeToInsert.next = node.next
        if (node.next == null) {
            this.tail = nodeToInsert
        } else {
            node.next!!.prev = nodeToInsert
        }
        node.next = nodeToInsert
    }

    // O(p) time | O(1) space
    fun insertAtPosition(position: Int, nodeToInsert: Node) {
        if (position == 1) {
            setHead(nodeToInsert)
            return
        }

        var node: Node? = this.head
        var currentPosition = 1
        while (node != null && currentPosition++ != position) {
            node = node.next
        }

        if (node != null) {
            insertBefore(node, nodeToInsert)
        } else {
            setTail(nodeToInsert)
        }
    }

    // O(n) time | O(1) space
    fun removeNodesWithValue(value: Int) {
        var node: Node? = head
        while (node != null) {
            var nextNode = node.next
            if (node.value == value) remove(node)
            node = nextNode
        }
    }

    // O(1) time | O(1) space
    fun remove(node: Node) {
        if (node == this.head) this.head = node.next
        if (node == this.tail) this.tail = node.prev
        removeNodeBindings(node)
    }

    // O(n) time | O(1) space
    fun containsNodeWithValue(value: Int): Boolean {
        var node: Node? = this.head
        while (node != null) {
            if (node.value == value) return true
            node = node.next
        }
        return false
    }

    fun removeNodeBindings(node: Node) {
        if (node.prev != null) node.prev!!.next = node.next
        if (node.next != null) node.next!!.prev = node.prev
        node.prev = null
        node.next = null
    }

    fun getHead(): Node? { return this.head }

    fun getTail(): Node? { return this.tail }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.DoublyLinkedList
import com.algoexpert.program.Node

class ProgramTest {

    fun bindNodes(nodeOne: Node, nodeTwo: Node) {
        nodeOne.next = nodeTwo
        nodeTwo.prev = nodeOne
    }

    fun headToTail(dll: DoublyLinkedList): List<Int> {
        val values = mutableListOf<Int>()
        var current: Node? = dll.getHead()
        while (current != null) {
            values.add(current.value)
            current = current.next
        }
        return values
    }

    fun tailToHead(dll: DoublyLinkedList): List<Int> {
        val values = mutableListOf<Int>()
        var current: Node? = dll.getTail()
        while (current != null) {
            values.add(current.value)
            current = current.prev
        }
        return values
    }

    @Test
    fun TestCase1() {
        val linkedList = DoublyLinkedList()

        val one = Node(1)
        val two = Node(2)
        val three = Node(3)
        val three2 = Node(3)
        val three3 = Node(3)
        val four = Node(4)
        val five = Node(5)
        val six = Node(6)

        linkedList.setHead(one)
        linkedList.insertAfter(one, two)
        linkedList.insertAfter(two, three)
        linkedList.insertAfter(three, four)
        linkedList.insertAfter(four, five)

        linkedList.setHead(four)
        assert(headToTail(linkedList) == listOf(4, 1, 2, 3, 5))
        assert(tailToHead(linkedList) == listOf(5, 3, 2, 1, 4))

        linkedList.setTail(six)
        assert(headToTail(linkedList) == listOf(4, 1, 2, 3, 5, 6))
        assert(tailToHead(linkedList) == listOf(6, 5, 3, 2, 1, 4))

        linkedList.insertBefore(six, three)
        assert(headToTail(linkedList) == listOf(4, 1, 2, 5, 3, 6))
        assert(tailToHead(linkedList) == listOf(6, 3, 5, 2, 1, 4))

        linkedList.insertAfter(six, three2)
        assert(headToTail(linkedList) == listOf(4, 1, 2, 5, 3, 6, 3))
        assert(tailToHead(linkedList) == listOf(3, 6, 3, 5, 2, 1, 4))

        linkedList.insertAtPosition(1, three3)
        assert(headToTail(linkedList) == listOf(3, 4, 1, 2, 5, 3, 6, 3))
        assert(tailToHead(linkedList) == listOf(3, 6, 3, 5, 2, 1, 4, 3))

        linkedList.removeNodesWithValue(3)
        assert(headToTail(linkedList) == listOf(4, 1, 2, 5, 6))
        assert(tailToHead(linkedList) == listOf(6, 5, 2, 1, 4))

        linkedList.remove(two)
        assert(headToTail(linkedList) == listOf(4, 1, 5, 6))
        assert(tailToHead(linkedList) == listOf(6, 5, 1, 4))

        assert(linkedList.containsNodeWithValue(5))
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
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let linkedList = Program.DoublyLinkedList()
      let one = Program.Node(value: 1)
      let two = Program.Node(value: 2)
      let three = Program.Node(value: 3)
      let three2 = Program.Node(value: 3)
      let three3 = Program.Node(value: 3)
      let four = Program.Node(value: 4)
      let five = Program.Node(value: 5)
      let six = Program.Node(value: 6)
      bindNodes(nodeOne: one, nodeTwo: two)
      bindNodes(nodeOne: two, nodeTwo: three)
      bindNodes(nodeOne: three, nodeTwo: four)
      bindNodes(nodeOne: four, nodeTwo: five)
      linkedList.head = one
      linkedList.tail = five

      linkedList.setHead(node: four)
      try assertEqual([4, 1, 2, 3, 5], getNodeValuesHeadToTail(linkedList: linkedList))
      try assertEqual([5, 3, 2, 1, 4], getNodeValuesTailToHead(linkedList: linkedList))

      linkedList.setTail(node: six)
      try assertEqual([4, 1, 2, 3, 5, 6], getNodeValuesHeadToTail(linkedList: linkedList))
      try assertEqual([6, 5, 3, 2, 1, 4], getNodeValuesTailToHead(linkedList: linkedList))

      linkedList.insertBefore(node: six, nodeToInsert: three)
      try assertEqual([4, 1, 2, 5, 3, 6], getNodeValuesHeadToTail(linkedList: linkedList))
      try assertEqual([6, 3, 5, 2, 1, 4], getNodeValuesTailToHead(linkedList: linkedList))

      linkedList.insertAfter(node: six, nodeToInsert: three2)
      try assertEqual([4, 1, 2, 5, 3, 6, 3], getNodeValuesHeadToTail(linkedList: linkedList))
      try assertEqual([3, 6, 3, 5, 2, 1, 4], getNodeValuesTailToHead(linkedList: linkedList))

      linkedList.insertAtPosition(position: 1, nodeToInsert: three3)
      try assertEqual([3, 4, 1, 2, 5, 3, 6, 3], getNodeValuesHeadToTail(linkedList: linkedList))
      try assertEqual([3, 6, 3, 5, 2, 1, 4, 3], getNodeValuesTailToHead(linkedList: linkedList))

      linkedList.removeNodesWithValue(value: 3)
      try assertEqual([4, 1, 2, 5, 6], getNodeValuesHeadToTail(linkedList: linkedList))
      try assertEqual([6, 5, 2, 1, 4], getNodeValuesTailToHead(linkedList: linkedList))

      linkedList.remove(node: two)
      try assertEqual([4, 1, 5, 6], getNodeValuesHeadToTail(linkedList: linkedList))
      try assertEqual([6, 5, 1, 4], getNodeValuesTailToHead(linkedList: linkedList))

      try assertEqual(true, linkedList.containsNodeWithValue(value: 5))
    }
  }

  func getNodeValuesHeadToTail(linkedList: Program.DoublyLinkedList) throws -> [Int] {
    var values = [Int]()

    var node = linkedList.head

    while node != nil {
      values.append(node!.value)
      node = node?.next
    }

    return values
  }

  func getNodeValuesTailToHead(linkedList: Program.DoublyLinkedList) throws -> [Int] {
    var values = [Int]()

    var node = linkedList.tail

    while node != nil {
      values.append(node!.value)
      node = node?.previous
    }

    return values
  }

  func bindNodes(nodeOne: Program.Node, nodeTwo: Program.Node) {
    nodeOne.next = nodeTwo
    nodeTwo.previous = nodeOne
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  class Node {
    var value: Int
    var previous: Node?
    var next: Node?

    init(value: Int) {
      self.value = value
      previous = nil
      next = nil
    }
  }

  class DoublyLinkedList {
    var head: Node?
    var tail: Node?

    init() {
      head = nil
      tail = nil
    }

    // O(N) time | O(1) space
    func containsNodeWithValue(value: Int) -> Bool {
      var node = head
      while node !== nil, node?.value != value {
        node = node?.next
      }

      return node !== nil
    }

    // O(1) time | O(1) space
    func remove(node: Node) {
      if node === head {
        head = head?.next
      }

      if node === tail {
        tail = tail?.previous
      }

      removeNodeBindings(node: node)
    }

    // O(N) time | O(1) space
    func removeNodesWithValue(value: Int) {
      var node = head

      while node !== nil {
        let nodeToRemove = node
        node = node?.next
        if nodeToRemove?.value == value {
          remove(node: nodeToRemove!)
        }
      }
    }

    // O(1) time | O(1) space
    func insertBefore(node: Node, nodeToInsert: Node) {
      if nodeToInsert === head, nodeToInsert === tail {
        return
      }

      remove(node: nodeToInsert)
      nodeToInsert.previous = node.previous
      nodeToInsert.next = node

      if node.previous == nil {
        head = nodeToInsert
      } else {
        node.previous?.next = nodeToInsert
      }

      node.previous = nodeToInsert
    }

    // O(1) time | O(1) space
    func insertAfter(node: Node, nodeToInsert: Node) {
      if nodeToInsert === head, nodeToInsert === tail {
        return
      }

      remove(node: nodeToInsert)
      nodeToInsert.previous = node
      nodeToInsert.next = node.next

      if node.next == nil {
        tail = nodeToInsert
      } else {
        node.next?.previous = nodeToInsert
      }

      node.next = nodeToInsert
    }

    // O(1) time | O(1) space
    func setHead(node: Node) {
      if head == nil {
        head = node
        tail = node
        return
      }

      insertBefore(node: head!, nodeToInsert: node)
    }

    // O(1) time | O(1) space
    func setTail(node: Node) {
      if tail == nil {
        setHead(node: node)
        return
      }

      insertAfter(node: tail!, nodeToInsert: node)
    }

    // O(P) time | O(1) space
    func insertAtPosition(position: Int, nodeToInsert: Node) {
      if position == 1 {
        setHead(node: nodeToInsert)
        return
      }

      var node = head
      var currentPosition = 1
      while node !== nil, currentPosition != position {
        node = node?.next
        currentPosition = currentPosition + 1
      }

      if node !== nil {
        insertBefore(node: node!, nodeToInsert: nodeToInsert)
      } else {
        setTail(node: nodeToInsert)
      }
    }

    func removeNodeBindings(node: Node) {
      if let previous = node.previous {
        previous.next = node.next
      }

      if let next = node.next {
        next.previous = node.previous
      }

      node.previous = nil
      node.next = nil
    }
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let linkedList = Program.DoublyLinkedList()
      let one = Program.Node(value: 1)
      let two = Program.Node(value: 2)
      let three = Program.Node(value: 3)
      let three2 = Program.Node(value: 3)
      let three3 = Program.Node(value: 3)
      let four = Program.Node(value: 4)
      let five = Program.Node(value: 5)
      let six = Program.Node(value: 6)
      bindNodes(nodeOne: one, nodeTwo: two)
      bindNodes(nodeOne: two, nodeTwo: three)
      bindNodes(nodeOne: three, nodeTwo: four)
      bindNodes(nodeOne: four, nodeTwo: five)
      linkedList.head = one
      linkedList.tail = five

      linkedList.setHead(node: four)
      try assertEqual([4, 1, 2, 3, 5], getNodeValuesHeadToTail(linkedList: linkedList))
      try assertEqual([5, 3, 2, 1, 4], getNodeValuesTailToHead(linkedList: linkedList))

      linkedList.setTail(node: six)
      try assertEqual([4, 1, 2, 3, 5, 6], getNodeValuesHeadToTail(linkedList: linkedList))
      try assertEqual([6, 5, 3, 2, 1, 4], getNodeValuesTailToHead(linkedList: linkedList))

      linkedList.insertBefore(node: six, nodeToInsert: three)
      try assertEqual([4, 1, 2, 5, 3, 6], getNodeValuesHeadToTail(linkedList: linkedList))
      try assertEqual([6, 3, 5, 2, 1, 4], getNodeValuesTailToHead(linkedList: linkedList))

      linkedList.insertAfter(node: six, nodeToInsert: three2)
      try assertEqual([4, 1, 2, 5, 3, 6, 3], getNodeValuesHeadToTail(linkedList: linkedList))
      try assertEqual([3, 6, 3, 5, 2, 1, 4], getNodeValuesTailToHead(linkedList: linkedList))

      linkedList.insertAtPosition(position: 1, nodeToInsert: three3)
      try assertEqual([3, 4, 1, 2, 5, 3, 6, 3], getNodeValuesHeadToTail(linkedList: linkedList))
      try assertEqual([3, 6, 3, 5, 2, 1, 4, 3], getNodeValuesTailToHead(linkedList: linkedList))

      linkedList.removeNodesWithValue(value: 3)
      try assertEqual([4, 1, 2, 5, 6], getNodeValuesHeadToTail(linkedList: linkedList))
      try assertEqual([6, 5, 2, 1, 4], getNodeValuesTailToHead(linkedList: linkedList))

      linkedList.remove(node: two)
      try assertEqual([4, 1, 5, 6], getNodeValuesHeadToTail(linkedList: linkedList))
      try assertEqual([6, 5, 1, 4], getNodeValuesTailToHead(linkedList: linkedList))

      try assertEqual(true, linkedList.containsNodeWithValue(value: 5))
    }
  }

  func getNodeValuesHeadToTail(linkedList: Program.DoublyLinkedList) throws -> [Int] {
    var values = [Int]()

    var node = linkedList.head

    while node != nil {
      values.append(node!.value)
      node = node?.next
    }

    return values
  }

  func getNodeValuesTailToHead(linkedList: Program.DoublyLinkedList) throws -> [Int] {
    var values = [Int]()

    var node = linkedList.tail

    while node != nil {
      values.append(node!.value)
      node = node?.previous
    }

    return values
  }

  func bindNodes(nodeOne: Program.Node, nodeTwo: Program.Node) {
    nodeOne.next = nodeTwo
    nodeTwo.previous = nodeOne
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


class TestNode:
    def __init__(self, value):
        self.value = value
        self.prev = None
        self.next = None


Node = TestNode
if hasattr(program, "Node"):
    Node = program.Node


def getNodeValuesHeadToTail(linkedList):
    values = []
    node = linkedList.head
    while node is not None:
        values.append(node.value)
        node = node.next
    return values


def getNodeValuesTailToHead(linkedList):
    values = []
    node = linkedList.tail
    while node is not None:
        values.append(node.value)
        node = node.prev
    return values


def bindNodes(nodeOne, nodeTwo):
    nodeOne.next = nodeTwo
    nodeTwo.prev = nodeOne


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        linkedList = program.DoublyLinkedList()
        one = Node(1)
        two = Node(2)
        three = Node(3)
        three2 = Node(3)
        three3 = Node(3)
        four = Node(4)
        five = Node(5)
        six = Node(6)
        bindNodes(one, two)
        bindNodes(two, three)
        bindNodes(three, four)
        bindNodes(four, five)
        linkedList.head = one
        linkedList.tail = five

        linkedList.setHead(four)
        self.assertEqual(getNodeValuesHeadToTail(linkedList), [4, 1, 2, 3, 5])
        self.assertEqual(getNodeValuesTailToHead(linkedList), [5, 3, 2, 1, 4])

        linkedList.setTail(six)
        self.assertEqual(getNodeValuesHeadToTail(linkedList), [4, 1, 2, 3, 5, 6])
        self.assertEqual(getNodeValuesTailToHead(linkedList), [6, 5, 3, 2, 1, 4])

        linkedList.insertBefore(six, three)
        self.assertEqual(getNodeValuesHeadToTail(linkedList), [4, 1, 2, 5, 3, 6])
        self.assertEqual(getNodeValuesTailToHead(linkedList), [6, 3, 5, 2, 1, 4])

        linkedList.insertAfter(six, three2)
        self.assertEqual(getNodeValuesHeadToTail(linkedList), [4, 1, 2, 5, 3, 6, 3])
        self.assertEqual(getNodeValuesTailToHead(linkedList), [3, 6, 3, 5, 2, 1, 4])

        linkedList.insertAtPosition(1, three3)
        self.assertEqual(getNodeValuesHeadToTail(linkedList), [3, 4, 1, 2, 5, 3, 6, 3])
        self.assertEqual(getNodeValuesTailToHead(linkedList), [3, 6, 3, 5, 2, 1, 4, 3])

        linkedList.removeNodesWithValue(3)
        self.assertEqual(getNodeValuesHeadToTail(linkedList), [4, 1, 2, 5, 6])
        self.assertEqual(getNodeValuesTailToHead(linkedList), [6, 5, 2, 1, 4])

        linkedList.remove(two)
        self.assertEqual(getNodeValuesHeadToTail(linkedList), [4, 1, 5, 6])
        self.assertEqual(getNodeValuesTailToHead(linkedList), [6, 5, 1, 4])

        self.assertEqual(linkedList.containsNodeWithValue(5), True)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Node:
    def __init__(self, value):
        self.value = value
        self.prev = None
        self.next = None


class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

    # O(1) time | O(1) space
    def setHead(self, node):
        if self.head is None:
            self.head = node
            self.tail = node
            return
        self.insertBefore(self.head, node)

    # O(1) time | O(1) space
    def setTail(self, node):
        if self.tail is None:
            self.setHead(node)
            return
        self.insertAfter(self.tail, node)

    # O(1) time | O(1) space
    def insertBefore(self, node, nodeToInsert):
        if nodeToInsert == self.head and nodeToInsert == self.tail:
            return
        self.remove(nodeToInsert)
        nodeToInsert.prev = node.prev
        nodeToInsert.next = node
        if node.prev is None:
            self.head = nodeToInsert
        else:
            node.prev.next = nodeToInsert
        node.prev = nodeToInsert

    # O(1) time | O(1) space
    def insertAfter(self, node, nodeToInsert):
        if nodeToInsert == self.head and nodeToInsert == self.tail:
            return
        self.remove(nodeToInsert)
        nodeToInsert.prev = node
        nodeToInsert.next = node.next
        if node.next is None:
            self.tail = nodeToInsert
        else:
            node.next.prev = nodeToInsert
        node.next = nodeToInsert

    # O(p) time | O(1) space
    def insertAtPosition(self, position, nodeToInsert):
        if position == 1:
            self.setHead(nodeToInsert)
            return
        node = self.head
        currentPosition = 1
        while node is not None and currentPosition != position:
            node = node.next
            currentPosition += 1
        if node is not None:
            self.insertBefore(node, nodeToInsert)
        else:
            self.setTail(nodeToInsert)

    # O(n) time | O(1) space
    def removeNodesWithValue(self, value):
        node = self.head
        while node is not None:
            nodeToRemove = node
            node = node.next
            if nodeToRemove.value == value:
                self.remove(nodeToRemove)

    # O(1) time | O(1) space
    def remove(self, node):
        if node == self.head:
            self.head = self.head.next
        if node == self.tail:
            self.tail = self.tail.prev
        self.removeNodeBindings(node)

    # O(n) time | O(1) space
    def containsNodeWithValue(self, value):
        node = self.head
        while node is not None and node.value != value:
            node = node.next
        return node is not None

    def removeNodeBindings(self, node):
        if node.prev is not None:
            node.prev.next = node.next
        if node.next is not None:
            node.next.prev = node.prev
        node.prev = None
        node.next = None

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestNode:
    def __init__(self, value):
        self.value = value
        self.prev = None
        self.next = None


Node = TestNode
if hasattr(program, "Node"):
    Node = program.Node


def getNodeValuesHeadToTail(linkedList):
    values = []
    node = linkedList.head
    while node is not None:
        values.append(node.value)
        node = node.next
    return values


def getNodeValuesTailToHead(linkedList):
    values = []
    node = linkedList.tail
    while node is not None:
        values.append(node.value)
        node = node.prev
    return values


def bindNodes(nodeOne, nodeTwo):
    nodeOne.next = nodeTwo
    nodeTwo.prev = nodeOne


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        linkedList = program.DoublyLinkedList()
        one = Node(1)
        two = Node(2)
        three = Node(3)
        three2 = Node(3)
        three3 = Node(3)
        four = Node(4)
        five = Node(5)
        six = Node(6)
        bindNodes(one, two)
        bindNodes(two, three)
        bindNodes(three, four)
        bindNodes(four, five)
        linkedList.head = one
        linkedList.tail = five

        linkedList.setHead(four)
        self.assertEqual(getNodeValuesHeadToTail(linkedList), [4, 1, 2, 3, 5])
        self.assertEqual(getNodeValuesTailToHead(linkedList), [5, 3, 2, 1, 4])

        linkedList.setTail(six)
        self.assertEqual(getNodeValuesHeadToTail(linkedList), [4, 1, 2, 3, 5, 6])
        self.assertEqual(getNodeValuesTailToHead(linkedList), [6, 5, 3, 2, 1, 4])

        linkedList.insertBefore(six, three)
        self.assertEqual(getNodeValuesHeadToTail(linkedList), [4, 1, 2, 5, 3, 6])
        self.assertEqual(getNodeValuesTailToHead(linkedList), [6, 3, 5, 2, 1, 4])

        linkedList.insertAfter(six, three2)
        self.assertEqual(getNodeValuesHeadToTail(linkedList), [4, 1, 2, 5, 3, 6, 3])
        self.assertEqual(getNodeValuesTailToHead(linkedList), [3, 6, 3, 5, 2, 1, 4])

        linkedList.insertAtPosition(1, three3)
        self.assertEqual(getNodeValuesHeadToTail(linkedList), [3, 4, 1, 2, 5, 3, 6, 3])
        self.assertEqual(getNodeValuesTailToHead(linkedList), [3, 6, 3, 5, 2, 1, 4, 3])

        linkedList.removeNodesWithValue(3)
        self.assertEqual(getNodeValuesHeadToTail(linkedList), [4, 1, 2, 5, 6])
        self.assertEqual(getNodeValuesTailToHead(linkedList), [6, 5, 2, 1, 4])

        linkedList.remove(two)
        self.assertEqual(getNodeValuesHeadToTail(linkedList), [4, 1, 5, 6])
        self.assertEqual(getNodeValuesTailToHead(linkedList), [6, 5, 1, 4])

        self.assertEqual(linkedList.containsNodeWithValue(5), True)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

class TestNode {
  value: number;
  prev: TestNode | null;
  next: TestNode | null;

  constructor(value: number) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

const Node = program.Node || TestNode;

function getNodeValuesHeadToTail(linkedList: program.DoublyLinkedList) {
  const values = [];
  let node = linkedList.head;
  while (node !== null) {
    values.push(node.value);
    node = node.next;
  }
  return values;
}

function getNodeValuesTailToHead(linkedList: program.DoublyLinkedList) {
  const values = [];
  let node = linkedList.tail;
  while (node !== null) {
    values.push(node.value);
    node = node.prev;
  }
  return values;
}

function bindNodes(nodeOne: TestNode, nodeTwo: TestNode) {
  nodeOne.next = nodeTwo;
  nodeTwo.prev = nodeOne;
}

it('Test Case #1', function () {
  const linkedList = new program.DoublyLinkedList();
  const one = new Node(1);
  const two = new Node(2);
  const three = new Node(3);
  const three2 = new Node(3);
  const three3 = new Node(3);
  const four = new Node(4);
  const five = new Node(5);
  const six = new Node(6);
  bindNodes(one, two);
  bindNodes(two, three);
  bindNodes(three, four);
  bindNodes(four, five);
  linkedList.head = one;
  linkedList.tail = five;

  linkedList.setHead(four);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 2, 3, 5]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([5, 3, 2, 1, 4]);

  linkedList.setTail(six);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 2, 3, 5, 6]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([6, 5, 3, 2, 1, 4]);

  linkedList.insertBefore(six, three);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 2, 5, 3, 6]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([6, 3, 5, 2, 1, 4]);

  linkedList.insertAfter(six, three2);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 2, 5, 3, 6, 3]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([3, 6, 3, 5, 2, 1, 4]);

  linkedList.insertAtPosition(1, three3);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([3, 4, 1, 2, 5, 3, 6, 3]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([3, 6, 3, 5, 2, 1, 4, 3]);

  linkedList.removeNodesWithValue(3);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 2, 5, 6]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([6, 5, 2, 1, 4]);

  linkedList.remove(two);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 5, 6]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([6, 5, 1, 4]);

  chai.expect(linkedList.containsNodeWithValue(5)).to.deep.equal(true);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

export class Node {
  value: number;
  prev: Node | null;
  next: Node | null;

  constructor(value: number) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

export class DoublyLinkedList {
  head: Node | null;
  tail: Node | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  // O(1) time | O(1) space
  setHead(node: Node) {
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      return;
    }
    this.insertBefore(this.head, node);
  }

  // O(1) time | O(1) space
  setTail(node: Node) {
    if (this.tail === null) {
      this.setHead(node);
      return;
    }
    this.insertAfter(this.tail, node);
  }

  // O(1) time | O(1) space
  insertBefore(node: Node, nodeToInsert: Node) {
    if (nodeToInsert === this.head && nodeToInsert === this.tail) return;
    this.remove(nodeToInsert);
    nodeToInsert.prev = node.prev;
    nodeToInsert.next = node;
    if (node.prev === null) {
      this.head = nodeToInsert;
    } else {
      node.prev.next = nodeToInsert;
    }
    node.prev = nodeToInsert;
  }

  // O(1) time | O(1) space
  insertAfter(node: Node, nodeToInsert: Node) {
    if (nodeToInsert === this.head && nodeToInsert === this.tail) return;
    this.remove(nodeToInsert);
    nodeToInsert.prev = node;
    nodeToInsert.next = node.next;
    if (node.next === null) {
      this.tail = nodeToInsert;
    } else {
      node.next.prev = nodeToInsert;
    }
    node.next = nodeToInsert;
  }

  // O(p) time | O(1) space
  insertAtPosition(position: number, nodeToInsert: Node) {
    if (position === 1) {
      this.setHead(nodeToInsert);
      return;
    }
    let node = this.head;
    let currentPosition = 1;
    while (node !== null && currentPosition++ !== position) node = node.next;
    if (node !== null) {
      this.insertBefore(node, nodeToInsert);
    } else {
      this.setTail(nodeToInsert);
    }
  }

  // O(n) time | O(1) space
  removeNodesWithValue(value: number) {
    let node = this.head;
    while (node !== null) {
      const nodeToRemove = node;
      node = node.next;
      if (nodeToRemove.value === value) this.remove(nodeToRemove);
    }
  }

  // O(1) time | O(1) space
  remove(node: Node) {
    if (node === this.head) this.head = this.head.next;
    if (node === this.tail) this.tail = this.tail.prev;
    this.removeNodeBindings(node);
  }

  // O(n) time | O(1) space
  containsNodeWithValue(value: number) {
    let node = this.head;
    while (node !== null && node.value !== value) node = node.next;
    return node !== null;
  }

  removeNodeBindings(node: Node) {
    if (node.prev !== null) node.prev.next = node.next;
    if (node.next !== null) node.next.prev = node.prev;
    node.prev = null;
    node.next = null;
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

class TestNode {
  value: number;
  prev: TestNode | null;
  next: TestNode | null;

  constructor(value: number) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

const Node = program.Node || TestNode;

function getNodeValuesHeadToTail(linkedList: program.DoublyLinkedList) {
  const values = [];
  let node = linkedList.head;
  while (node !== null) {
    values.push(node.value);
    node = node.next;
  }
  return values;
}

function getNodeValuesTailToHead(linkedList: program.DoublyLinkedList) {
  const values = [];
  let node = linkedList.tail;
  while (node !== null) {
    values.push(node.value);
    node = node.prev;
  }
  return values;
}

function bindNodes(nodeOne: TestNode, nodeTwo: TestNode) {
  nodeOne.next = nodeTwo;
  nodeTwo.prev = nodeOne;
}

it('Test Case #1', function () {
  const linkedList = new program.DoublyLinkedList();
  const one = new Node(1);
  const two = new Node(2);
  const three = new Node(3);
  const three2 = new Node(3);
  const three3 = new Node(3);
  const four = new Node(4);
  const five = new Node(5);
  const six = new Node(6);
  bindNodes(one, two);
  bindNodes(two, three);
  bindNodes(three, four);
  bindNodes(four, five);
  linkedList.head = one;
  linkedList.tail = five;

  linkedList.setHead(four);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 2, 3, 5]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([5, 3, 2, 1, 4]);

  linkedList.setTail(six);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 2, 3, 5, 6]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([6, 5, 3, 2, 1, 4]);

  linkedList.insertBefore(six, three);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 2, 5, 3, 6]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([6, 3, 5, 2, 1, 4]);

  linkedList.insertAfter(six, three2);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 2, 5, 3, 6, 3]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([3, 6, 3, 5, 2, 1, 4]);

  linkedList.insertAtPosition(1, three3);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([3, 4, 1, 2, 5, 3, 6, 3]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([3, 6, 3, 5, 2, 1, 4, 3]);

  linkedList.removeNodesWithValue(3);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 2, 5, 6]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([6, 5, 2, 1, 4]);

  linkedList.remove(two);
  chai.expect(getNodeValuesHeadToTail(linkedList)).to.deep.equal([4, 1, 5, 6]);
  chai.expect(getNodeValuesTailToHead(linkedList)).to.deep.equal([6, 5, 1, 4]);

  chai.expect(linkedList.containsNodeWithValue(5)).to.deep.equal(true);
});

```

