# Suffix Trie Construction
<div class="html">
<p>
  Write a <span>SuffixTrie</span> class for a Suffix-Trie-like data structure.
  The class should have a <span>root</span> property set to be the root node of
  the trie and should support:
</p>
<ul>
  <li>
    Creating the trie from a string; this will be done by calling the
    <span>populateSuffixTrieFrom</span> method upon class instantiation, which
    should populate the <span>root</span> of the class.
  </li>
  <li>Searching for strings in the trie.</li>
</ul>
<p>
  Note that every string added to the trie should end with the special
  <span>endSymbol</span> character: <span>"*"</span>.
</p>
<p>
  If you're unfamiliar with Suffix Tries, we recommend watching the
  Conceptual Overview section of this question's video explanation before
  starting to code.
</p>
<h3>Sample Input (for creation)</h3>
<pre>
<span class="CodeEditor-promptParameter">string</span> = "babc"
</pre>
<h3>Sample Output (for creation)</h3>
<pre>
<span class="CodeEditor-promptComment">The structure below is the root of the trie.</span>
{
  "c": {"*": true},
  "b": {
    "c": {"*": true},
    "a": {"b": {"c": {"*": true}}},
  },
  "a": {"b": {"c": {"*": true}}},
}
</pre>
<h3>
  Sample Input (for searching in the suffix trie above)
</h3>
<pre>
<span class="CodeEditor-promptParameter">string</span> = "abc"
</pre>
<h3>
  Sample Output (for searching in the suffix trie above)
</h3>
<pre>
true
</pre>
</div>

Hint 1
<p>
Building a suffix-trie-like data structure consists of essentially storing every suffix of a given string in a trie. To do so, iterate through the input string one character at a time and insert every substring starting at each character and ending at the end of the string into the trie.
</p>


Hint 2

<p>
To insert a string into the trie, start by adding the first character of the string into the root node of the trie and mapping it to an empty hash table if it isn't already there. Then, iterate through the rest of the string inserting each of the remaining characters into the previous character's corresponding node (or hash table) in the trie, making sure to add an endSymbol "*" at the end.
</p>


Hint 3

<p>
Searching the trie for a specific string should follow a nearly identical logic to the one used to add a string in the trie.
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
      string word1 = "babc";
      SuffixTrie actual(word1);
      assert(actual.contains("abc") == true);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <unordered_map>
using namespace std;

class TrieNode {
public:
  unordered_map<char, TrieNode *> children;
};

class SuffixTrie {
public:
  TrieNode *root;
  char endSymbol;

  SuffixTrie(string str) {
    this->root = new TrieNode();
    this->endSymbol = '*';
    this->populateSuffixTrieFrom(str);
  }

  // O(n^2) time | O(n^2) space
  void populateSuffixTrieFrom(string str) {
    for (int i = 0; i < str.length(); i++) {
      this->insertSubstringStartingAt(i, str);
    }
  }

  void insertSubstringStartingAt(int i, string str) {
    TrieNode *node = this->root;
    for (int j = i; j < str.length(); j++) {
      char letter = str[j];
      if (node->children.find(letter) == node->children.end()) {
        TrieNode *newNode = new TrieNode();
        node->children.insert({letter, newNode});
      }
      node = node->children[letter];
    }
    node->children.insert({this->endSymbol, nullptr});
  }

  // O(m) time | O(1) space
  bool contains(string str) {
    TrieNode *node = this->root;
    for (char letter : str) {
      if (node->children.find(letter) == node->children.end()) {
        return false;
      }
      node = node->children[letter];
    }
    return node->children.find(this->endSymbol) != node->children.end();
  }
};

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      string word1 = "babc";
      SuffixTrie actual(word1);
      assert(actual.contains("abc") == true);
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
	[Test]
	public void TestCase1() {
		Program.SuffixTrie trie = new Program.SuffixTrie("babc");
		Utils.AssertTrue(trie.Contains("abc"));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	public class TrieNode {
		public Dictionary<char, TrieNode> Children = new Dictionary<char, TrieNode>();
	}

	public class SuffixTrie {
		public TrieNode root = new TrieNode();
		public char endSymbol = '*';

		public SuffixTrie(string str) {
			PopulateSuffixTrieFrom(str);
		}

		// O(n^2) time | O(n^2) space
		public void PopulateSuffixTrieFrom(string str) {
			for (int i = 0; i < str.Length; i++) {
				insertSubstringStartingAt(i, str);
			}
		}

		public void insertSubstringStartingAt(int i, string str) {
			TrieNode node = root;
			for (int j = i; j < str.Length; j++) {
				char letter = str[j];
				if (!node.Children.ContainsKey(letter)) {
					TrieNode newNode = new TrieNode();
					node.Children.Add(letter, newNode);
				}
				node = node.Children[letter];
			}
			node.Children[endSymbol] = null;
		}

		// O(m) time | O(1) space
		public bool Contains(string str) {
			TrieNode node  = root;
			for (int i = 0; i < str.Length; i++) {
				char letter = str[i];
				if (!node.Children.ContainsKey(letter)) {
					return false;
				}
				node = node.Children[letter];
			}
			return node.Children.ContainsKey(endSymbol);
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Linq;
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		Program.SuffixTrie trie = new Program.SuffixTrie("babc");
		Utils.AssertTrue(trie.Contains("abc"));
	}
}

```
### Sandbox Code (go)
```go
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

package main

import "github.com/stretchr/testify/require"

func (trie SuffixTrie) Equals(other SuffixTrie) bool {
	if len(trie) != len(other) {
		return false
	}
	for key, child := range trie {
		otherchild, found := other[key]
		if !found {
			return false
		} else if child != nil && !child.Equals(otherchild) {
			return false
		}
	}
	return true
}

func TrieFromString(str string) SuffixTrie {
	trie := SuffixTrie{}
	trie.PopulateSuffixTrieFrom(str)
	return trie
}

func (s *TestSuite) TestCase1(t *TestCase) {
	trie := TrieFromString("babc")
	expected := SuffixTrie{
		'c': {'*': nil},
		'b': {
			'c': {'*': nil},
			'a': {'b': {'c': {'*': nil}}},
		},
		'a': {'b': {'c': {'*': nil}}},
	}
	require.True(t, trie.Equals(expected))
	require.True(t, trie.Contains("abc"))
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type SuffixTrie map[byte]SuffixTrie

func NewSuffixTrie() SuffixTrie {
	trie := SuffixTrie{}
	return trie
}

// O(n^2) time | O(n^2) space
func (trie SuffixTrie) PopulateSuffixTrieFrom(str string) {
	for i := range str {
		node := trie
		for j := i; j < len(str); j++ {
			letter := str[j]
			if _, found := node[letter]; !found {
				node[letter] = NewSuffixTrie()
			}
			node = node[letter]
		}
		node['*'] = nil
	}
}

// O(m) time | O(1) space
func (trie SuffixTrie) Contains(str string) bool {
	node := trie
	for i := 0; i < len(str); i++ {
		letter := str[i]
		if _, found := node[letter]; !found {
			return false
		}
		node = node[letter]
	}
	_, found := node['*']
	return found
}

```
### Unit Tests 1 (go)
```go
package main

import "github.com/stretchr/testify/require"

func (trie SuffixTrie) Equals(other SuffixTrie) bool {
	if len(trie) != len(other) {
		return false
	}
	for key, child := range trie {
		otherchild, found := other[key]
		if !found {
			return false
		} else if child != nil && !child.Equals(otherchild) {
			return false
		}
	}
	return true
}

func TrieFromString(str string) SuffixTrie {
	trie := SuffixTrie{}
	trie.PopulateSuffixTrieFrom(str)
	return trie
}

func (s *TestSuite) TestCase1(t *TestCase) {
	trie := TrieFromString("babc")
	expected := SuffixTrie{
		'c': {'*': nil},
		'b': {
			'c': {'*': nil},
			'a': {'b': {'c': {'*': nil}}},
		},
		'a': {'b': {'c': {'*': nil}}},
	}
	require.True(t, trie.Equals(expected))
	require.True(t, trie.Contains("abc"))
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
    var trie = new Program.SuffixTrie("babc");
    Utils.assertTrue(trie.contains("abc"));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  static class TrieNode {
    Map<Character, TrieNode> children = new HashMap<Character, TrieNode>();
  }

  static class SuffixTrie {
    TrieNode root = new TrieNode();
    char endSymbol = '*';

    public SuffixTrie(String str) {
      populateSuffixTrieFrom(str);
    }

    // O(n^2) time | O(n^2) space
    public void populateSuffixTrieFrom(String str) {
      for (int i = 0; i < str.length(); i++) {
        insertSubstringStartingAt(i, str);
      }
    }

    public void insertSubstringStartingAt(int i, String str) {
      TrieNode node = root;
      for (int j = i; j < str.length(); j++) {
        char letter = str.charAt(j);
        if (!node.children.containsKey(letter)) {
          TrieNode newNode = new TrieNode();
          node.children.put(letter, newNode);
        }
        node = node.children.get(letter);
      }
      node.children.put(endSymbol, null);
    }

    // O(m) time | O(1) space
    public boolean contains(String str) {
      TrieNode node = root;
      for (int i = 0; i < str.length(); i++) {
        char letter = str.charAt(i);
        if (!node.children.containsKey(letter)) {
          return false;
        }
        node = node.children.get(letter);
      }
      return node.children.containsKey(endSymbol);
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
    var trie = new Program.SuffixTrie("babc");
    Utils.assertTrue(trie.contains("abc"));
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
  const trie = new program.SuffixTrie('babc');
  const expected = {
    c: {'*': true},
    b: {
      c: {'*': true},
      a: {b: {c: {'*': true}}},
    },
    a: {b: {c: {'*': true}}},
  };
  chai.expect(trie.root).to.deep.equal(expected);
  chai.expect(trie.contains('abc')).to.deep.equal(true);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class SuffixTrie {
  constructor(string) {
    this.root = {};
    this.endSymbol = '*';
    this.populateSuffixTrieFrom(string);
  }

  // O(n^2) time | O(n^2) space
  populateSuffixTrieFrom(string) {
    for (let i = 0; i < string.length; i++) {
      this.insertSubstringStartingAt(i, string);
    }
  }

  insertSubstringStartingAt(i, string) {
    let node = this.root;
    for (let j = i; j < string.length; j++) {
      const letter = string[j];
      if (!(letter in node)) node[letter] = {};
      node = node[letter];
    }
    node[this.endSymbol] = true;
  }

  // O(m) time | O(1) space
  contains(string) {
    let node = this.root;
    for (const letter of string) {
      if (!(letter in node)) return false;
      node = node[letter];
    }
    return this.endSymbol in node;
  }
}

exports.SuffixTrie = SuffixTrie;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const trie = new program.SuffixTrie('babc');
  const expected = {
    c: {'*': true},
    b: {
      c: {'*': true},
      a: {b: {c: {'*': true}}},
    },
    a: {b: {c: {'*': true}}},
  };
  chai.expect(trie.root).to.deep.equal(expected);
  chai.expect(trie.contains('abc')).to.deep.equal(true);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.SuffixTrie

class ProgramTest {
    @Test
    fun TestCase1() {
        val trie = SuffixTrie("babc")
        assert(trie.contains("abc"))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

data class TrieNode(
    val children: MutableMap<Char, TrieNode> = mutableMapOf<Char, TrieNode>()
)

class SuffixTrie(str: String) {
    val endSymbol = '*'
    var root = TrieNode()

    init { populate(str) }

    // O(n^2) time | O(n^2) space
    fun populate(str: String) {
        for (i in 0 until str.length) {
            insertSubstringStartingAt(i, str)
        }
    }

    // O(m) time | O(1) space
    fun contains(str: String): Boolean {
        var node = this.root
        for (letter in str) {
            val child = node.children[letter]
            if (child == null) return false
            node = child
        }
        return node.children.containsKey(endSymbol)
    }

    fun insertSubstringStartingAt(i: Int, str: String) {
        var node = root
        for (j in i until str.length) {
            val letter = str[j]
            val child = node.children[letter]
            if (child == null) {
                val newNode = TrieNode()
                node.children[letter] = newNode
            }
            node = node.children[letter]!!
        }
        node.children[endSymbol] = TrieNode()
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.SuffixTrie

class ProgramTest {
    @Test
    fun TestCase1() {
        val trie = SuffixTrie("babc")
        assert(trie.contains("abc"))
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
      let trie = Program.SuffixTrie(string: "babc")
      try assert(trie.contains(string: "abc"))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  class TrieNode {
    var children: [String: Any] = [:]
  }

  class SuffixTrie {
    var root = TrieNode()
    let endSymbol = "*"

    init(string: String) {
      populateSuffixTrieFrom(string: string)
    }

    // O(n^2) time | O(n^2) space
    func populateSuffixTrieFrom(string: String) {
      for i in 0 ..< string.count {
        insertSubstringStartingAt(index: i, string: string, root: root)
      }
    }

    func insertSubstringStartingAt(index: Int, string: String, root: TrieNode) {
      var node = root

      for j in index ..< string.count {
        let jStringIndex = string.index(string.startIndex, offsetBy: j)
        let jthCharacter = String(string[jStringIndex])

        if !node.children.keys.contains(jthCharacter) {
          node.children[jthCharacter] = TrieNode()
        }

        let nextNode = node.children[jthCharacter] as! TrieNode
        node = nextNode
      }

      node.children[endSymbol] = true
    }

    // O(m) time | O(1) space
    func contains(string: String) -> Bool {
      var node = root

      for character in string {
        let stringifiedCharacter = String(character)

        if !node.children.keys.contains(stringifiedCharacter) {
          return false
        }

        let nextNode = node.children[stringifiedCharacter] as! TrieNode
        node = nextNode
      }

      let reachedTheEnd = node.children[endSymbol] != nil
      return reachedTheEnd
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
      let trie = Program.SuffixTrie(string: "babc")
      try assert(trie.contains(string: "abc"))
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
        trie = program.SuffixTrie("babc")
        expected = {
            "c": {"*": True},
            "b": {"c": {"*": True}, "a": {"b": {"c": {"*": True}}}},
            "a": {"b": {"c": {"*": True}}},
        }
        self.assertEqual(trie.root, expected)
        self.assertTrue(trie.contains("abc"))

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class SuffixTrie:
    def __init__(self, string):
        self.root = {}
        self.endSymbol = "*"
        self.populateSuffixTrieFrom(string)

    # O(n^2) time | O(n^2) space
    def populateSuffixTrieFrom(self, string):
        for i in range(len(string)):
            self.insertSubstringStartingAt(i, string)

    def insertSubstringStartingAt(self, i, string):
        node = self.root
        for j in range(i, len(string)):
            letter = string[j]
            if letter not in node:
                node[letter] = {}
            node = node[letter]
        node[self.endSymbol] = True

    # O(m) time | O(1) space
    def contains(self, string):
        node = self.root
        for letter in string:
            if letter not in node:
                return False
            node = node[letter]
        return self.endSymbol in node

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        trie = program.SuffixTrie("babc")
        expected = {
            "c": {"*": True},
            "b": {"c": {"*": True}, "a": {"b": {"c": {"*": True}}}},
            "a": {"b": {"c": {"*": True}}},
        }
        self.assertEqual(trie.root, expected)
        self.assertTrue(trie.contains("abc"))

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const trie = new program.SuffixTrie('babc');
  const expected = {
    c: {'*': true},
    b: {
      c: {'*': true},
      a: {b: {c: {'*': true}}},
    },
    a: {b: {c: {'*': true}}},
  };
  chai.expect(trie.root).to.deep.equal(expected);
  chai.expect(trie.contains('abc')).to.deep.equal(true);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

interface TrieNode {
  [key: string]: TrieNode | boolean;
}

export class SuffixTrie {
  root: TrieNode;
  endSymbol: string;

  constructor(string: string) {
    this.root = {};
    this.endSymbol = '*';
    this.populateSuffixTrieFrom(string);
  }

  // O(n^2) time | O(n^2) space
  populateSuffixTrieFrom(string: string) {
    for (let i = 0; i < string.length; i++) {
      this.insertSubstringStartingAt(i, string);
    }
  }

  insertSubstringStartingAt(i: number, string: string) {
    let node = this.root;
    for (let j = i; j < string.length; j++) {
      const letter = string[j];
      if (!(letter in node)) node[letter] = {};
      node = node[letter] as TrieNode;
    }
    node[this.endSymbol] = true;
  }

  // O(m) time | O(1) space
  contains(string: string) {
    let node = this.root;
    for (const letter of string) {
      if (!(letter in node)) return false;
      node = node[letter] as TrieNode;
    }
    return this.endSymbol in node;
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const trie = new program.SuffixTrie('babc');
  const expected = {
    c: {'*': true},
    b: {
      c: {'*': true},
      a: {b: {c: {'*': true}}},
    },
    a: {b: {c: {'*': true}}},
  };
  chai.expect(trie.root).to.deep.equal(expected);
  chai.expect(trie.contains('abc')).to.deep.equal(true);
});

```

