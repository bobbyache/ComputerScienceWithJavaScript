# Multi String Search
<div class="html">
<p>
  Write a function that takes in a big string and an array of small strings,
  all of which are smaller in length than the big string. The function should
  return an array of booleans, where each boolean represents whether the small
  string at that index in the array of small strings is contained in the big
  string.
</p>
<p>Note that you can't use language-built-in string-matching methods.</p>
<h3>Sample Input #1</h3>
<pre>
<span class="CodeEditor-promptParameter">bigString</span> = "this is a big string"
<span class="CodeEditor-promptParameter">smallStrings</span> = ["this", "yo", "is", "a", "bigger", "string", "kappa"]
</pre>
<h3>Sample Output #1</h3>
<pre>
[true, false, true, true, false, true, false]
</pre>
<h3>Sample Input #2</h3>
<pre>
<span class="CodeEditor-promptParameter">bigString</span> = "abcdefghijklmnopqrstuvwxyz"
<span class="CodeEditor-promptParameter">smallStrings</span> = ["abc", "mnopqr", "wyz", "no", "e", "tuuv"]
</pre>
<h3>Sample Output #2</h3>
<pre>
[true, true, false, true, true, false]
</pre>
</div>

Hint 1
<p>
A simple way to solve this problem is to iterate through all of the small strings, checking if each of them is contained in the big string by iterating through the big string's characters and comparing them to the given small string's characters with a couple of loops. Is this approach efficient from a time-complexity point of view?
</p>


Hint 2

<p>
Try building a suffix-trie-like data structure containing all of the big string's suffixes. Then, iterate through all of the small strings and check if each of them is contained in the data structure you've created. What are the time-complexity ramifications of this approach?
</p>


Hint 3

<p>
Try building a trie containing all of the small strings. Then, iterate through the big string's characters and check if any part of the big string is a string contained in the trie you've created. Is this approach better than the one described in Hint #2 from a time-complexity point of view?
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
      vector<bool> expected{true, false, true, true, false, true, false};
      assert(multiStringSearch("this is a big string",
                               {"this", "yo", "is", "a", "bigger", "string",
                                "kappa"}) == expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

bool isInBigString(string bigString, string smallString);
bool isInBigStringHelper(string bigString, string smallString, int startIdx);

// O(bns) time | O(n) space
vector<bool> multiStringSearch(string bigString, vector<string> smallStrings) {
  vector<bool> solution;
  for (string smallString : smallStrings) {
    solution.push_back(isInBigString(bigString, smallString));
  }
  return solution;
}

bool isInBigString(string bigString, string smallString) {
  for (int i = 0; i < bigString.length(); i++) {
    if (i + smallString.length() > bigString.length()) {
      break;
    }
    if (isInBigStringHelper(bigString, smallString, i)) {
      return true;
    }
  }
  return false;
}

bool isInBigStringHelper(string bigString, string smallString, int startIdx) {
  int leftBigIdx = startIdx;
  int rightBigIdx = startIdx + smallString.length() - 1;
  int leftSmallIdx = 0;
  int rightSmallIdx = smallString.length() - 1;
  while (leftBigIdx <= rightBigIdx) {
    if (bigString[leftBigIdx] != smallString[leftSmallIdx] ||
        bigString[rightBigIdx] != smallString[rightSmallIdx]) {
      return false;
    }
    leftBigIdx++;
    rightBigIdx--;
    leftSmallIdx++;
    rightSmallIdx--;
  }
  return true;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <unordered_map>
using namespace std;

class TrieNode {
public:
  unordered_map<char, TrieNode *> children;
};

class ModifiedSuffixTrie {
public:
  TrieNode *root;

  ModifiedSuffixTrie(string str) {
    this->root = new TrieNode();
    this->populateModifiedSuffixTrieFrom(str);
  }

  void populateModifiedSuffixTrieFrom(string str) {
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
  }

  bool contains(string str) {
    TrieNode *node = this->root;
    for (char letter : str) {
      if (node->children.find(letter) == node->children.end()) {
        return false;
      }
      node = node->children[letter];
    }
    return true;
  }
};

// O(b^2 + ns) time | O(b^2 + n) space
vector<bool> multiStringSearch(string bigString, vector<string> smallStrings) {
  ModifiedSuffixTrie modifiedSuffixTrie(bigString);
  vector<bool> solution;
  for (string smallString : smallStrings) {
    solution.push_back(modifiedSuffixTrie.contains(smallString));
  }
  return solution;
}

```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <unordered_map>
using namespace std;

class TrieNode {
public:
  unordered_map<char, TrieNode *> children;
  string word;
};

class Trie {
public:
  TrieNode *root;
  char endSymbol;

  Trie() {
    this->root = new TrieNode();
    this->endSymbol = '*';
  }

  void insert(string str) {
    TrieNode *current = this->root;
    for (int i = 0; i < str.length(); i++) {
      char letter = str[i];
      if (current->children.find(letter) == current->children.end()) {
        TrieNode *newNode = new TrieNode();
        current->children.insert({letter, newNode});
      }
      current = current->children[letter];
    }
    current->children.insert({this->endSymbol, nullptr});
    current->word = str;
  }
};

void findSmallStringsIn(string str, int startIdx, Trie *trie,
                        unordered_map<string, bool> *containedStrings);

// O(ns + bs) time | O(ns) space
vector<bool> multiStringSearch(string bigString, vector<string> smallStrings) {
  Trie *trie = new Trie();
  for (string smallString : smallStrings) {
    trie->insert(smallString);
  }
  unordered_map<string, bool> containedStrings;
  for (int i = 0; i < bigString.length(); i++) {
    findSmallStringsIn(bigString, i, trie, &containedStrings);
  }
  vector<bool> solution;
  for (string smallString : smallStrings) {
    solution.push_back(containedStrings.find(smallString) !=
                       containedStrings.end());
  }
  return solution;
}

void findSmallStringsIn(string str, int startIdx, Trie *trie,
                        unordered_map<string, bool> *containedStrings) {
  TrieNode *currentNode = trie->root;
  for (int i = startIdx; i < str.length(); i++) {
    if (currentNode->children.find(str[i]) == currentNode->children.end()) {
      break;
    }
    currentNode = currentNode->children[str[i]];
    if (currentNode->children.find(trie->endSymbol) !=
        currentNode->children.end()) {
      containedStrings->insert({currentNode->word, true});
    }
  }
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<bool> expected{true, false, true, true, false, true, false};
      assert(multiStringSearch("this is a big string",
                               {"this", "yo", "is", "a", "bigger", "string",
                                "kappa"}) == expected);
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
	[Test]
	public void TestCase1() {
		bool[] expected = {true, false, true, true, false, true, false};
		List<bool> output = Program.MultistringSearch("this is a big string",
		    new string[] {"this", "yo", "is", "a",
		                  "bigger", "string",
		                  "kappa"});
		Utils.AssertTrue(compare(output, expected));
	}

	public bool compare(List<bool> arr1, bool[] arr2) {
		if (arr1.Count != arr2.Length) {
			return false;
		}
		for (int i = 0; i < arr1.Count; i++) {
			if (arr1[i] != arr2[i]) {
				return false;
			}
		}
		return true;
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(bns) time | O(n) space
	public static List<bool> MultistringSearch(string bigstring, string[] smallstrings) {
		List<bool> solution = new List<bool>();
		foreach (string smallstring in smallstrings) {
			solution.Add(isInBigstring(bigstring, smallstring));
		}
		return solution;
	}

	public static bool isInBigstring(string bigstring, string smallstring) {
		for (int i = 0; i < bigstring.Length; i++) {
			if (i + smallstring.Length > bigstring.Length) {
				break;
			}
			if (isInBigstring(bigstring, smallstring, i)) {
				return true;
			}
		}
		return false;
	}

	public static bool isInBigstring(string bigstring, string smallstring, int startIdx) {
		int leftBigIdx = startIdx;
		int rightBigIdx = startIdx + smallstring.Length - 1;
		int leftSmallIdx = 0;
		int rightSmallIdx = smallstring.Length - 1;
		while (leftBigIdx <= rightBigIdx) {
			if (
				bigstring[leftBigIdx] != smallstring[leftSmallIdx] ||
				bigstring[rightBigIdx] != smallstring[rightSmallIdx]
				) {
				return false;
			}
			leftBigIdx++;
			rightBigIdx--;
			leftSmallIdx++;
			rightSmallIdx--;
		}
		return true;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(b^2 + ns) time | O(b^2 + n) space
	public static List<bool> MultistringSearch(string bigstring, string[] smallstrings) {
		ModifiedSuffixTrie modifiedSuffixTrie = new ModifiedSuffixTrie(bigstring);
		List<bool> solution = new List<bool>();
		foreach (string smallstring in smallstrings) {
			solution.Add(modifiedSuffixTrie.Contains(smallstring));
		}
		return solution;
	}

	public class TrieNode {
		public Dictionary<char, TrieNode> children = new Dictionary<char, TrieNode>();
	}

	public class ModifiedSuffixTrie {
		TrieNode root = new TrieNode();

		public ModifiedSuffixTrie(string str) {
			populateModifiedSuffixTrieFrom(str);
		}

		public void populateModifiedSuffixTrieFrom(string str) {
			for (int i = 0; i < str.Length; i++) {
				insertSubstringStartingAt(i, str);
			}
		}

		public void insertSubstringStartingAt(int i, string str) {
			TrieNode node = root;
			for (int j = i; j < str.Length; j++) {
				char letter = str[j];
				if (!node.children.ContainsKey(letter)) {
					TrieNode newNode = new TrieNode();
					node.children.Add(letter, newNode);
				}
				node = node.children[letter];
			}
		}

		public bool Contains(string str) {
			TrieNode node = root;
			for (int i = 0; i < str.Length; i++) {
				char letter = str[i];
				if (!node.children.ContainsKey(letter)) {
					return false;
				}
				node = node.children[letter];
			}
			return true;
		}
	}
}

```
### Solution 3 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(ns + bs) time | O(ns) space
	public static List<bool> MultistringSearch(string bigstring, string[] smallstrings) {
		Trie trie = new Trie();
		foreach (string smallstring in smallstrings) {
			trie.insert(smallstring);
		}
		HashSet<string> containedstrings = new HashSet<string>();
		for (int i = 0; i < bigstring.Length; i++) {
			findSmallstringsIn(bigstring, i, trie, containedstrings);
		}
		List<bool> solution = new List<bool>();
		foreach (string str in smallstrings) {
			solution.Add(containedstrings.Contains(str));
		}
		return solution;
	}

	public static void findSmallstringsIn(string str, int startIdx, Trie trie,
	  HashSet<string> containedstrings) {
		TrieNode currentNode = trie.root;
		for (int i = startIdx; i < str.Length; i++) {
			char currentChar = str[i];
			if (!currentNode.children.ContainsKey(currentChar)) {
				break;
			}
			currentNode = currentNode.children[currentChar];
			if (currentNode.children.ContainsKey(trie.endSymbol)) {
				containedstrings.Add(currentNode.word);
			}
		}
	}

	public class TrieNode {
		public Dictionary<char, TrieNode> children = new Dictionary<char, TrieNode>();
		public string word;
	}

	public class Trie {
		public TrieNode root = new TrieNode();
		public char endSymbol = '*';

		public void insert(string str) {
			TrieNode node = root;
			for (int i = 0; i < str.Length; i++) {
				char letter = str[i];
				if (!node.children.ContainsKey(letter)) {
					TrieNode newNode = new TrieNode();
					node.children.Add(letter, newNode);
				}
				node = node.children[letter];
			}
			node.children[endSymbol] = null;
			node.word = str;
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		bool[] expected = {true, false, true, true, false, true, false};
		List<bool> output = Program.MultistringSearch("this is a big string",
		    new string[] {"this", "yo", "is", "a",
		                  "bigger", "string",
		                  "kappa"});
		Utils.AssertTrue(compare(output, expected));
	}

	public bool compare(List<bool> arr1, bool[] arr2) {
		if (arr1.Count != arr2.Length) {
			return false;
		}
		for (int i = 0; i < arr1.Count; i++) {
			if (arr1[i] != arr2[i]) {
				return false;
			}
		}
		return true;
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
	expected := []bool{true, false, true, true, false, true, false}
	output := MultiStringSearch("this is a big string", []string{"this", "yo", "is", "a", "bigger", "string", "kappa"})
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(bns) time | O(n) space
func MultiStringSearch(bigString string, smallStrings []string) []bool {
	output := make([]bool, len(smallStrings))
	for i, smallString := range smallStrings {
		output[i] = isInBigString(bigString, smallString)
	}
	return output
}

func isInBigString(bigString, smallString string) bool {
	for i := range bigString {
		if i+len(smallString) > len(bigString) {
			break
		}
		if isInBigStringHelper(bigString, smallString, i) {
			return true
		}
	}
	return false
}

func isInBigStringHelper(bigString, smallString string, startIdx int) bool {
	leftBigIdx := startIdx
	rightBigIdx := startIdx + len(smallString) - 1
	leftSmallIdx := 0
	rightSmallIdx := len(smallString) - 1
	for leftBigIdx <= rightBigIdx {
		if bigString[leftBigIdx] != smallString[leftSmallIdx] ||
			bigString[rightBigIdx] != smallString[rightSmallIdx] {
			return false
		}
		leftBigIdx += 1
		rightBigIdx -= 1
		leftSmallIdx += 1
		rightSmallIdx -= 1
	}
	return true
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(b^2 + ns) time | O(b^2 + n) space
func MultiStringSearch(bigString string, smallStrings []string) []bool {
	trie := NewTrie(bigString)
	output := make([]bool, len(smallStrings))
	for i, smallString := range smallStrings {
		output[i] = trie.Contains(smallString)
	}
	return output
}

type ModifiedSuffixTrie map[byte]ModifiedSuffixTrie

func NewTrie(str string) ModifiedSuffixTrie {
	trie := ModifiedSuffixTrie{}
	for i := range str {
		trie.Add(str, i)
	}
	return trie
}

func (trie ModifiedSuffixTrie) Add(str string, startIndex int) {
	node := trie
	for j := startIndex; j < len(str); j++ {
		letter := str[j]
		if _, found := node[letter]; !found {
			node[letter] = ModifiedSuffixTrie{}
		}
		node = node[letter]
	}
}

func (trie ModifiedSuffixTrie) Contains(str string) bool {
	node := trie
	for i := range str {
		letter := str[i]
		if _, found := node[letter]; !found {
			return false
		}
		node = node[letter]
	}
	return true
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(ns + bs) time | O(ns) space
func MultiStringSearch(bigString string, smallStrings []string) []bool {
	trie := Trie{children: map[byte]Trie{}}
	for _, str := range smallStrings {
		trie.Add(str)
	}
	containedStrings := map[string]bool{}
	for i := range bigString {
		findSmallStringsIn(bigString, i, trie, containedStrings)
	}
	output := make([]bool, len(smallStrings))
	for i, str := range smallStrings {
		output[i] = containedStrings[str]
	}
	return output
}

func findSmallStringsIn(str string, startIdx int, trie Trie, containedStrings map[string]bool) {
	current := trie
	for i := startIdx; i < len(str); i++ {
		currentChar := str[i]
		if _, found := current.children[currentChar]; !found {
			break
		}
		current = current.children[currentChar]
		if end, found := current.children['*']; found {
			containedStrings[end.word] = true
		}
	}
}

type Trie struct {
	children map[byte]Trie

	word string
}

func (t Trie) Add(word string) {
	current := t
	for i := range word {
		letter := word[i]
		if _, found := current.children[letter]; !found {
			current.children[letter] = Trie{
				children: map[byte]Trie{},
			}
		}
		current = current.children[letter]
	}
	current.children['*'] = Trie{
		children: map[byte]Trie{},
		word:     word,
	}
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := []bool{true, false, true, true, false, true, false}
	output := MultiStringSearch("this is a big string", []string{"this", "yo", "is", "a", "bigger", "string", "kappa"})
	require.Equal(t, expected, output)
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
    boolean[] expected = {true, false, true, true, false, true, false};
    List<Boolean> output =
        Program.multiStringSearch(
            "this is a big string",
            new String[] {"this", "yo", "is", "a", "bigger", "string", "kappa"});
    Utils.assertTrue(compare(output, expected));
  }

  public boolean compare(List<Boolean> arr1, boolean[] arr2) {
    if (arr1.size() != arr2.length) {
      return false;
    }
    for (int i = 0; i < arr1.size(); i++) {
      if (arr1.get(i) != arr2[i]) {
        return false;
      }
    }
    return true;
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(bns) time | O(n) space
  public static List<Boolean> multiStringSearch(String bigString, String[] smallStrings) {
    List<Boolean> solution = new ArrayList<Boolean>();
    for (String smallString : smallStrings) {
      solution.add(isInBigString(bigString, smallString));
    }
    return solution;
  }

  public static boolean isInBigString(String bigString, String smallString) {
    for (int i = 0; i < bigString.length(); i++) {
      if (i + smallString.length() > bigString.length()) {
        break;
      }
      if (isInBigString(bigString, smallString, i)) {
        return true;
      }
    }
    return false;
  }

  public static boolean isInBigString(String bigString, String smallString, int startIdx) {
    int leftBigIdx = startIdx;
    int rightBigIdx = startIdx + smallString.length() - 1;
    int leftSmallIdx = 0;
    int rightSmallIdx = smallString.length() - 1;
    while (leftBigIdx <= rightBigIdx) {
      if (bigString.charAt(leftBigIdx) != smallString.charAt(leftSmallIdx)
          || bigString.charAt(rightBigIdx) != smallString.charAt(rightSmallIdx)) {
        return false;
      }
      leftBigIdx++;
      rightBigIdx--;
      leftSmallIdx++;
      rightSmallIdx--;
    }
    return true;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(b^2 + ns) time | O(b^2 + n) space
  public static List<Boolean> multiStringSearch(String bigString, String[] smallStrings) {
    ModifiedSuffixTrie modifiedSuffixTrie = new ModifiedSuffixTrie(bigString);
    List<Boolean> solution = new ArrayList<Boolean>();
    for (String smallString : smallStrings) {
      solution.add(modifiedSuffixTrie.contains(smallString));
    }
    return solution;
  }

  static class TrieNode {
    Map<Character, TrieNode> children = new HashMap<Character, TrieNode>();
  }

  static class ModifiedSuffixTrie {
    TrieNode root = new TrieNode();

    public ModifiedSuffixTrie(String str) {
      populateModifiedSuffixTrieFrom(str);
    }

    public void populateModifiedSuffixTrieFrom(String str) {
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
    }

    public boolean contains(String str) {
      TrieNode node = root;
      for (int i = 0; i < str.length(); i++) {
        char letter = str.charAt(i);
        if (!node.children.containsKey(letter)) {
          return false;
        }
        node = node.children.get(letter);
      }
      return true;
    }
  }
}

```
### Solution 3 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(ns + bs) time | O(ns) space
  public static List<Boolean> multiStringSearch(String bigString, String[] smallStrings) {
    Trie trie = new Trie();
    for (String smallString : smallStrings) {
      trie.insert(smallString);
    }
    Set<String> containedStrings = new HashSet<String>();
    for (int i = 0; i < bigString.length(); i++) {
      findSmallStringsIn(bigString, i, trie, containedStrings);
    }
    List<Boolean> solution = new ArrayList<Boolean>();
    for (String str : smallStrings) {
      solution.add(containedStrings.contains(str));
    }
    return solution;
  }

  public static void findSmallStringsIn(
      String str, int startIdx, Trie trie, Set<String> containedStrings) {
    TrieNode currentNode = trie.root;
    for (int i = startIdx; i < str.length(); i++) {
      char currentChar = str.charAt(i);
      if (!currentNode.children.containsKey(currentChar)) {
        break;
      }
      currentNode = currentNode.children.get(currentChar);
      if (currentNode.children.containsKey(trie.endSymbol)) {
        containedStrings.add(currentNode.word);
      }
    }
  }

  static class TrieNode {
    Map<Character, TrieNode> children = new HashMap<Character, TrieNode>();
    String word;
  }

  static class Trie {
    TrieNode root = new TrieNode();
    char endSymbol = '*';

    public void insert(String str) {
      TrieNode node = root;
      for (int i = 0; i < str.length(); i++) {
        char letter = str.charAt(i);
        if (!node.children.containsKey(letter)) {
          TrieNode newNode = new TrieNode();
          node.children.put(letter, newNode);
        }
        node = node.children.get(letter);
      }
      node.children.put(endSymbol, null);
      node.word = str;
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
    boolean[] expected = {true, false, true, true, false, true, false};
    List<Boolean> output =
        Program.multiStringSearch(
            "this is a big string",
            new String[] {"this", "yo", "is", "a", "bigger", "string", "kappa"});
    Utils.assertTrue(compare(output, expected));
  }

  public boolean compare(List<Boolean> arr1, boolean[] arr2) {
    if (arr1.size() != arr2.length) {
      return false;
    }
    for (int i = 0; i < arr1.size(); i++) {
      if (arr1.get(i) != arr2[i]) {
        return false;
      }
    }
    return true;
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
  chai
    .expect(program.multiStringSearch('this is a big string', ['this', 'yo', 'is', 'a', 'bigger', 'string', 'kappa']))
    .to.deep.equal([true, false, true, true, false, true, false]);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(bns) time | O(n) space
function multiStringSearch(bigString, smallStrings) {
  return smallStrings.map(smallString => isInBigString(bigString, smallString));
}

function isInBigString(bigString, smallString) {
  for (let i = 0; i < bigString.length; i++) {
    if (i + smallString.length > bigString.length) break;
    if (isInBigStringHelper(bigString, smallString, i)) return true;
  }
  return false;
}

function isInBigStringHelper(bigString, smallString, startIdx) {
  let leftBigIdx = startIdx;
  let rightBigIdx = startIdx + smallString.length - 1;
  let leftSmallIdx = 0;
  let rightSmallIdx = smallString.length - 1;
  while (leftBigIdx <= rightBigIdx) {
    if (bigString[leftBigIdx] != smallString[leftSmallIdx] || bigString[rightBigIdx] != smallString[rightSmallIdx]) {
      return false;
    }
    leftBigIdx++;
    rightBigIdx--;
    leftSmallIdx++;
    rightSmallIdx--;
  }
  return true;
}

exports.multiStringSearch = multiStringSearch;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(b^2 + ns) time | O(b^2 + n) space
function multiStringSearch(bigString, smallStrings) {
  const modifiedSuffixTrie = new ModifiedSuffixTrie(bigString);
  return smallStrings.map(string => modifiedSuffixTrie.contains(string));
}

class ModifiedSuffixTrie {
  constructor(string) {
    this.root = {};
    this.populateModifiedSuffixTrieFrom(string);
  }

  populateModifiedSuffixTrieFrom(string) {
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
  }

  contains(string) {
    let node = this.root;
    for (const letter of string) {
      if (!(letter in node)) return false;
      node = node[letter];
    }
    return true;
  }
}

exports.multiStringSearch = multiStringSearch;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(ns + bs) time | O(ns) space
function multiStringSearch(bigString, smallStrings) {
  const trie = new Trie();
  for (const string of smallStrings) {
    trie.insert(string);
  }
  const containedStrings = {};
  for (let i = 0; i < bigString.length; i++) {
    findSmallStringsIn(bigString, i, trie, containedStrings);
  }
  return smallStrings.map(string => string in containedStrings);
}

function findSmallStringsIn(string, startIdx, trie, containedStrings) {
  let currentNode = trie.root;
  for (let i = startIdx; i < string.length; i++) {
    const currentChar = string[i];
    if (!(currentChar in currentNode)) break;
    currentNode = currentNode[currentChar];
    if (trie.endSymbol in currentNode) containedStrings[currentNode[trie.endSymbol]] = true;
  }
}

class Trie {
  constructor() {
    this.root = {};
    this.endSymbol = '*';
  }

  insert(string) {
    let current = this.root;
    for (let i = 0; i < string.length; i++) {
      if (!(string[i] in current)) {
        current[string[i]] = {};
      }
      current = current[string[i]];
    }
    current[this.endSymbol] = string;
  }
}

exports.multiStringSearch = multiStringSearch;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai
    .expect(program.multiStringSearch('this is a big string', ['this', 'yo', 'is', 'a', 'bigger', 'string', 'kappa']))
    .to.deep.equal([true, false, true, true, false, true, false]);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.multiStringSearch as multiStringSearch

class ProgramTest {
    @Test
    fun TestCase1() {
        val bigString = "this is a big string"
        val smallStrings = listOf("this", "yo", "is", "a", "bigger", "string", "kappa")
        val expected = listOf(true, false, true, true, false, true, false)
        val output = multiStringSearch(bigString, smallStrings)
        assert(output.equals(expected))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(bns) time | O(n) space
fun multiStringSearch(bigString: String, smallStrings: List<String>): List<Boolean> {
    return smallStrings.map { smallString -> isInBigString(bigString, smallString) }
}

fun isInBigString(bigString: String, smallString: String): Boolean {
    for (i in 0 until bigString.length) {
        if (i + smallString.length > bigString.length) break
        if (isInBigStringHelper(bigString, smallString, i)) return true
    }
    return false
}

fun isInBigStringHelper(bigString: String, smallString: String, startIdx: Int): Boolean {
    var leftBigIdx = startIdx
    var rightBigIdx = startIdx + smallString.length - 1
    var leftSmallIdx = 0
    var rightSmallIdx = smallString.length - 1
    while (leftBigIdx <= rightBigIdx) {
        if (bigString[leftBigIdx] != smallString[leftSmallIdx] || bigString[rightBigIdx] != smallString[rightSmallIdx]) {
            return false
        }
        leftBigIdx++
        rightBigIdx--
        leftSmallIdx++
        rightSmallIdx--
    }
    return true
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(b^2 + ns) time | O(b^2 + n) space
fun multiStringSearch(bigString: String, smallStrings: List<String>): List<Boolean> {
    val modifiedSuffixTrie = ModifiedSuffixTrie(bigString)
    return smallStrings.map { string -> modifiedSuffixTrie.contains(string) }
}

data class TrieNode(
    val children: MutableMap<Char, TrieNode> = mutableMapOf()
)

class ModifiedSuffixTrie(string: String) {
    var root = TrieNode()

    init {
        populateModifiedSuffixTrieFrom(string)
    }

    fun populateModifiedSuffixTrieFrom(string: String) {
        for (i in 0 until string.length) {
            insertSubstringStartingAt(i, string)
        }
    }

    fun insertSubstringStartingAt(i: Int, string: String) {
        var node = root
        for (j in i until string.length) {
            val letter = string[j]
            if (!node.children.containsKey(letter)) node.children[letter] = TrieNode()
            node = node.children[letter]!!
        }
    }

    fun contains(string: String): Boolean {
        var node = root
        for (letter in string) {
            if (!node.children.containsKey(letter)) return false
            node = node.children[letter]!!
        }
        return true
    }
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(ns + bs) time | O(ns) space
fun multiStringSearch(bigString: String, smallStrings: List<String>): List<Boolean> {
    val trie = Trie()
    for (string in smallStrings) {
        trie.insert(string)
    }
    val containedStrings = mutableMapOf<String, Boolean>()
    for (i in 0 until bigString.length) {
        findSmallStringsIn(bigString, i, trie, containedStrings)
    }
    return smallStrings.map { string -> containedStrings.containsKey(string) }
}

fun findSmallStringsIn(string: String, startIdx: Int, trie: Trie, containedStrings: MutableMap<String, Boolean>) {
    var currentNode = trie.root
    for (i in startIdx until string.length) {
        val currentChar = string[i]
        if (!currentNode.children.containsKey(currentChar)) break
        currentNode = currentNode.children[currentChar]!!
        if (currentNode.children.containsKey(trie.endSymbol)) containedStrings[currentNode.word] = true
    }
}

data class TrieNode(
    val children: MutableMap<Char, TrieNode?> = mutableMapOf(),
    var word: String = ""
)

class Trie {
    val root = TrieNode()
    val endSymbol = '*'

    fun insert(string: String) {
        var current = root
        for (i in 0 until string.length) {
            if (!current.children.containsKey(string[i])) {
                current.children[string[i]] = TrieNode()
            }
            current = current.children[string[i]]!!
        }
        current.children[endSymbol] = null
        current.word = string
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.multiStringSearch as multiStringSearch

class ProgramTest {
    @Test
    fun TestCase1() {
        val bigString = "this is a big string"
        val smallStrings = listOf("this", "yo", "is", "a", "bigger", "string", "kappa")
        val expected = listOf(true, false, true, true, false, true, false)
        val output = multiStringSearch(bigString, smallStrings)
        assert(output.equals(expected))
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
      try assertEqual([true, false, true, true, false, true, false], program.multiStringSearch("this is a big string", ["this", "yo", "is", "a", "bigger", "string", "kappa"]))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(bns) time | O(n) space
  func multiStringSearch(_ bigString: String, _ smallStrings: [String]) -> [Bool] {
    return smallStrings.map { isInBigString($0, bigString) }
  }

  func isInBigString(_ smallString: String, _ bigString: String) -> Bool {
    for i in 0 ..< bigString.count {
      if i + smallString.count > bigString.count {
        break
      }

      if isInBigStringHelper(i, smallString, bigString) {
        return true
      }
    }

    return false
  }

  func isInBigStringHelper(_ startIndex: Int, _ smallString: String, _ bigString: String) -> Bool {
    var leftSmallIndex = 0
    var rightSmallIndex = smallString.count - 1

    var leftBigIndex = startIndex
    var rightBigIndex = startIndex + smallString.count - 1

    while leftBigIndex < rightBigIndex {
      let leftSmallStringIndex = smallString.index(smallString.startIndex, offsetBy: leftSmallIndex)
      let rightSmallStringIndex = smallString.index(smallString.startIndex, offsetBy: rightSmallIndex)

      let leftBigStringIndex = bigString.index(bigString.startIndex, offsetBy: leftBigIndex)
      let rightBigStringIndex = bigString.index(bigString.startIndex, offsetBy: rightBigIndex)

      if smallString[leftSmallStringIndex] != bigString[leftBigStringIndex] || smallString[rightSmallStringIndex] != bigString[rightBigStringIndex] {
        return false
      }

      leftSmallIndex += 1
      rightSmallIndex -= 1
      leftBigIndex += 1
      rightBigIndex -= 1
    }

    return true
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(b ^ 2 + ns) time | O(b ^ 2 + n) space
  func multiStringSearch(_ bigString: String, _ smallStrings: [String]) -> [Bool] {
    let modifiedSuffixTrie = ModifiedSuffixTrie(string: bigString)

    return smallStrings.map { modifiedSuffixTrie.contains($0) }
  }

  class TrieNode {
    var children: [String: Any] = [:]
  }

  class ModifiedSuffixTrie {
    var root = TrieNode()

    init(string: String) {
      populateModifiedSuffixTrieFrom(string)
    }

    func populateModifiedSuffixTrieFrom(_ string: String) {
      for i in 0 ..< string.count {
        insertSubstringStartingAt(i, string, root)
      }
    }

    func insertSubstringStartingAt(_ index: Int, _ string: String, _ root: TrieNode) {
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
    }

    func contains(_ string: String) -> Bool {
      var node = root

      for character in string {
        let stringifiedCharacter = String(character)

        if !node.children.keys.contains(stringifiedCharacter) {
          return false
        }

        let nextNode = node.children[stringifiedCharacter] as! TrieNode
        node = nextNode
      }

      return true
    }
  }
}

```
### Solution 3 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  class TrieNode {
    var children: [String: Any] = [:]
  }

  class Trie {
    var root = TrieNode()
    let endSymbol = "*"

    func insert(_ string: String) {
      var node = root

      for i in 0 ..< string.count {
        let iStringIndex = string.index(string.startIndex, offsetBy: i)
        let ithCharacter = String(string[iStringIndex])

        if !node.children.keys.contains(ithCharacter) {
          node.children[ithCharacter] = TrieNode()
        }

        let nextNode = node.children[ithCharacter] as! TrieNode
        node = nextNode
      }

      node.children[endSymbol] = string
    }
  }

  // O(ns + bs) time | O(ns) space
  func multiStringSearch(_ bigString: String, _ smallStrings: [String]) -> [Bool] {
    let trie = Trie()

    for string in smallStrings {
      trie.insert(string)
    }

    var containedStrings = [String: Bool]()

    for i in 0 ..< bigString.count {
      findSmallStringInBigString(bigString, i, trie, &containedStrings)
    }

    return smallStrings.map { containedStrings.keys.contains($0) }
  }

  func findSmallStringInBigString(_ string: String, _ startIndex: Int, _ trie: Trie, _ containedStrings: inout [String: Bool]) {
    var currentNode = trie.root

    for i in startIndex ..< string.count {
      let currentStringIndex = string.index(string.startIndex, offsetBy: i)
      let currentCharacter = String(string[currentStringIndex])

      if !currentNode.children.keys.contains(currentCharacter) {
        break
      }

      let nextNode = currentNode.children[currentCharacter] as! TrieNode
      currentNode = nextNode

      if currentNode.children.keys.contains(trie.endSymbol) {
        let resultString = currentNode.children[trie.endSymbol] as! String
        containedStrings[resultString] = true
      }
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
      try assertEqual([true, false, true, true, false, true, false], program.multiStringSearch("this is a big string", ["this", "yo", "is", "a", "bigger", "string", "kappa"]))
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
        self.assertEqual(
            program.multiStringSearch("this is a big string", ["this", "yo", "is", "a", "bigger", "string", "kappa"]),
            [True, False, True, True, False, True, False],
        )

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(bns) time | O(n) space
def multiStringSearch(bigString, smallStrings):
    return [isInBigString(bigString, smallString) for smallString in smallStrings]


def isInBigString(bigString, smallString):
    for i in range(len(bigString)):
        if i + len(smallString) > len(bigString):
            break
        if isInBigStringHelper(bigString, smallString, i):
            return True
    return False


def isInBigStringHelper(bigString, smallString, startIdx):
    leftBigIdx = startIdx
    rightBigIdx = startIdx + len(smallString) - 1
    leftSmallIdx = 0
    rightSmallIdx = len(smallString) - 1
    while leftBigIdx <= rightBigIdx:
        if bigString[leftBigIdx] != smallString[leftSmallIdx] or bigString[rightBigIdx] != smallString[rightSmallIdx]:
            return False
        leftBigIdx += 1
        rightBigIdx -= 1
        leftSmallIdx += 1
        rightSmallIdx -= 1
    return True

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(b^2 + ns) time | O(b^2 + n) space
def multiStringSearch(bigString, smallStrings):
    modifiedSuffixTrie = ModifiedSuffixTrie(bigString)
    return [modifiedSuffixTrie.contains(string) for string in smallStrings]


class ModifiedSuffixTrie:
    def __init__(self, string):
        self.root = {}
        self.populateModifiedSuffixTrieFrom(string)

    def populateModifiedSuffixTrieFrom(self, string):
        for i in range(len(string)):
            self.insertSubstringStartingAt(i, string)

    def insertSubstringStartingAt(self, i, string):
        node = self.root
        for j in range(i, len(string)):
            letter = string[j]
            if letter not in node:
                node[letter] = {}
            node = node[letter]

    def contains(self, string):
        node = self.root
        for letter in string:
            if letter not in node:
                return False
            node = node[letter]
        return True

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(ns + bs) time | O(ns) space
def multiStringSearch(bigString, smallStrings):
    trie = Trie()
    for string in smallStrings:
        trie.insert(string)
    containedStrings = {}
    for i in range(len(bigString)):
        findSmallStringsIn(bigString, i, trie, containedStrings)
    return [string in containedStrings for string in smallStrings]


def findSmallStringsIn(string, startIdx, trie, containedStrings):
    currentNode = trie.root
    for i in range(startIdx, len(string)):
        currentChar = string[i]
        if currentChar not in currentNode:
            break
        currentNode = currentNode[currentChar]
        if trie.endSymbol in currentNode:
            containedStrings[currentNode[trie.endSymbol]] = True


class Trie:
    def __init__(self):
        self.root = {}
        self.endSymbol = "*"

    def insert(self, string):
        current = self.root
        for i in range(len(string)):
            if string[i] not in current:
                current[string[i]] = {}
            current = current[string[i]]
        current[self.endSymbol] = string

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(
            program.multiStringSearch("this is a big string", ["this", "yo", "is", "a", "bigger", "string", "kappa"]),
            [True, False, True, True, False, True, False],
        )

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai
    .expect(program.multiStringSearch('this is a big string', ['this', 'yo', 'is', 'a', 'bigger', 'string', 'kappa']))
    .to.deep.equal([true, false, true, true, false, true, false]);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(bns) time | O(n) space
export function multiStringSearch(bigString: string, smallStrings: string[]) {
  return smallStrings.map(smallString => isInBigString(bigString, smallString));
}

function isInBigString(bigString: string, smallString: string) {
  for (let i = 0; i < bigString.length; i++) {
    if (i + smallString.length > bigString.length) break;
    if (isInBigStringHelper(bigString, smallString, i)) return true;
  }
  return false;
}

function isInBigStringHelper(bigString: string, smallString: string, startIdx: number) {
  let leftBigIdx = startIdx;
  let rightBigIdx = startIdx + smallString.length - 1;
  let leftSmallIdx = 0;
  let rightSmallIdx = smallString.length - 1;
  while (leftBigIdx <= rightBigIdx) {
    if (bigString[leftBigIdx] != smallString[leftSmallIdx] || bigString[rightBigIdx] != smallString[rightSmallIdx]) {
      return false;
    }
    leftBigIdx++;
    rightBigIdx--;
    leftSmallIdx++;
    rightSmallIdx--;
  }
  return true;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(b^2 + ns) time | O(b^2 + n) space
export function multiStringSearch(bigString: string, smallStrings: string[]) {
  const modifiedSuffixTrie = new ModifiedSuffixTrie(bigString);
  return smallStrings.map(string => modifiedSuffixTrie.contains(string));
}

interface TrieNode {
  [key: string]: TrieNode;
}

class ModifiedSuffixTrie {
  root: TrieNode;

  constructor(string: string) {
    this.root = {};
    this.populateModifiedSuffixTrieFrom(string);
  }

  populateModifiedSuffixTrieFrom(string: string) {
    for (let i = 0; i < string.length; i++) {
      this.insertSubstringStartingAt(i, string);
    }
  }

  insertSubstringStartingAt(i: number, string: string) {
    let node = this.root;
    for (let j = i; j < string.length; j++) {
      const letter = string[j];
      if (!(letter in node)) node[letter] = {};
      node = node[letter];
    }
  }

  contains(string: string) {
    let node = this.root;
    for (const letter of string) {
      if (!(letter in node)) return false;
      node = node[letter];
    }
    return true;
  }
}

```
### Solution 3 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

interface ContainedStrings {
  [key: string]: boolean;
}

// O(ns + bs) time | O(ns) space
export function multiStringSearch(bigString: string, smallStrings: string[]) {
  const trie = new Trie();
  for (const string of smallStrings) {
    trie.insert(string);
  }
  const containedStrings: ContainedStrings = {};
  for (let i = 0; i < bigString.length; i++) {
    findSmallStringsIn(bigString, i, trie, containedStrings);
  }
  return smallStrings.map(string => string in containedStrings);
}

function findSmallStringsIn(string: string, startIdx: number, trie: Trie, containedStrings: ContainedStrings) {
  let currentNode = trie.root;
  for (let i = startIdx; i < string.length; i++) {
    const currentChar = string[i];
    if (!(currentChar in currentNode)) break;
    currentNode = currentNode[currentChar] as TrieNode;
    if (trie.endSymbol in currentNode) containedStrings[currentNode[trie.endSymbol] as string] = true;
  }
}

interface TrieNode {
  [key: string]: TrieNode | string;
}

class Trie {
  root: TrieNode;
  endSymbol: string;

  constructor() {
    this.root = {};
    this.endSymbol = '*';
  }

  insert(string: string) {
    let current = this.root;
    for (let i = 0; i < string.length; i++) {
      if (!(string[i] in current)) {
        current[string[i]] = {};
      }
      current = current[string[i]] as TrieNode;
    }
    current[this.endSymbol] = string;
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai
    .expect(program.multiStringSearch('this is a big string', ['this', 'yo', 'is', 'a', 'bigger', 'string', 'kappa']))
    .to.deep.equal([true, false, true, true, false, true, false]);
});

```

