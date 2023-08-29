# Boggle Board
<div class="html">
<p>
  You're given a two-dimensional array (a matrix) of potentially unequal height
  and width containing letters; this matrix represents a boggle board. You're
  also given a list of words.
</p>
<p>
  Write a function that returns an array of all the words contained in the
  boggle board. The final words don't need to be in any particular order.
</p>
<p>
  A word is constructed in the boggle board by connecting adjacent
  (horizontally, vertically, or diagonally) letters, without using any single
  letter at a given position more than once; while a word can of course have
  repeated letters, those repeated letters must come from different positions in
  the boggle board in order for the word to be contained in the board. Note that
  two or more words are allowed to overlap and use the same letters in the
  boggle board.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">board</span> = [
  ["t", "h", "i", "s", "i", "s", "a"],
  ["s", "i", "m", "p", "l", "e", "x"],
  ["b", "x", "x", "x", "x", "e", "b"],
  ["x", "o", "g", "g", "l", "x", "o"],
  ["x", "x", "x", "D", "T", "r", "a"],
  ["R", "E", "P", "E", "A", "d", "x"],
  ["x", "x", "x", "x", "x", "x", "x"],
  ["N", "O", "T", "R", "E", "-", "P"],
  ["x", "x", "D", "E", "T", "A", "E"],
],
<span class="CodeEditor-promptParameter">words</span> = [
  "this", "is", "not", "a", "simple", "boggle",
  "board", "test", "REPEATED", "NOTRE-PEATED",
]
</pre>
<h3>Sample Output</h3>
<pre>
["this", "is", "a", "simple", "boggle", "board", "NOTRE-PEATED"]
<span class="CodeEditor-promptComment">// The words could be ordered differently.</span>
</pre>
</div>

Hint 1
<p>
You can divide this question into two separate problems: one part involves traversing the boggle board in such a way that allows you to construct strings letter by letter; the other part involves actually comparing the strings you construct in the board against the words in the list that you're given. For the second part, what data structure lends itself very well to matching characters to multiple strings at once?
</p>


Hint 2

<p>
Try creating a trie out of the input list of words. This will allow you to compare letters in the boggle board against all input words in constant time. How can you efficiently traverse the boggle board to construct all potentially valid strings, without counting letters twice in any string?
</p>


Hint 3

<p>
Treat the board as a graph, where each element in the board is a node with up to 8 neighboring nodes. Traverse it in a depth-first-search-like fashion, checking if letters are contained in the trie and traversing the trie simultaneously if it makes sense to do so. How can you keep track of letters that you've already visited in order to avoid erroneously counting some of them twice in a single string? Could you keep track of visited nodes in an auxiliary data structure?
</p>


Hint 4

<p>
Keeping in mind that you only want to mark nodes as visited in a single branch of the graph that you're traversing (i.e., you don't want the state of visited nodes in one branch of the graph to spill into the state of another branch of the graph), try marking any node you traverse as unvisited at the end of the recursive call that actually traverses it, after traversing through all of the node's neighbors and performing the same actions on them recursively.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

bool contains(vector<string> wordArray, string targetWord) {
  for (string word : wordArray) {
    if (targetWord == word) {
      return true;
    }
  }
  return false;
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<char>> board = {
          {'t', 'h', 'i', 's', 'i', 's', 'a'},
          {'s', 'i', 'm', 'p', 'l', 'e', 'x'},
          {'b', 'x', 'x', 'x', 'x', 'e', 'b'},
          {'x', 'o', 'g', 'g', 'l', 'x', 'o'},
          {'x', 'x', 'x', 'D', 'T', 'r', 'a'},
          {'R', 'E', 'P', 'E', 'A', 'd', 'x'},
          {'x', 'x', 'x', 'x', 'x', 'x', 'x'},
          {'N', 'O', 'T', 'R', 'E', '-', 'P'},
          {'x', 'x', 'D', 'E', 'T', 'A', 'E'},
      };
      vector<string> words = {"this",     "is",          "not",   "a",
                              "simple",   "boggle",      "board", "test",
                              "REPEATED", "NOTRE-PEATED"};
      vector<string> expected = {"this",   "is",    "a",           "simple",
                                 "boggle", "board", "NOTRE-PEATED"};
      vector<string> actual = boggleBoard(board, words);
      assert(actual.size() == expected.size());
      for (string word : actual) {
        assert(contains(expected, word));
      }
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <unordered_set>
#include <vector>
using namespace std;

class TrieNode {
public:
  unordered_map<char, TrieNode *> children;
  string word = "";
};

class Trie {
public:
  TrieNode *root;
  char endSymbol;

  Trie();
  void add(string str);
};

void explore(int i, int j, vector<vector<char>> board, TrieNode *trieNode,
             vector<vector<bool>> *visited, unordered_set<string> *finalWords);
vector<vector<int>> getNeighbors(int i, int j, vector<vector<char>> board);

// O(nm*8^s + ws) time | O(nm + ws) space
vector<string> boggleBoard(vector<vector<char>> board, vector<string> words) {
  Trie trie;
  for (string word : words) {
    trie.add(word);
  }
  unordered_set<string> finalWords;
  vector<vector<bool>> visited(board.size(),
                               vector<bool>(board[0].size(), false));
  for (int i = 0; i < board.size(); i++) {
    for (int j = 0; j < board[0].size(); j++) {
      explore(i, j, board, trie.root, &visited, &finalWords);
    }
  }
  vector<string> finalWordsArray;
  for (auto it : finalWords) {
    finalWordsArray.push_back(it);
  }
  return finalWordsArray;
}

void explore(int i, int j, vector<vector<char>> board, TrieNode *trieNode,
             vector<vector<bool>> *visited, unordered_set<string> *finalWords) {
  if (visited->at(i)[j]) {
    return;
  }
  char letter = board[i][j];
  if (trieNode->children.find(letter) == trieNode->children.end()) {
    return;
  }
  visited->at(i)[j] = true;
  trieNode = trieNode->children[letter];
  if (trieNode->children.find('*') != trieNode->children.end()) {
    finalWords->insert(trieNode->word);
  }
  vector<vector<int>> neighbors = getNeighbors(i, j, board);
  for (vector<int> neighbor : neighbors) {
    explore(neighbor[0], neighbor[1], board, trieNode, visited, finalWords);
  }
  visited->at(i)[j] = false;
}

vector<vector<int>> getNeighbors(int i, int j, vector<vector<char>> board) {
  vector<vector<int>> neighbors;
  if (i > 0 && j > 0) {
    neighbors.push_back({i - 1, j - 1});
  }
  if (i > 0 && j < board[0].size() - 1) {
    neighbors.push_back({i - 1, j + 1});
  }
  if (i < board.size() - 1 && j < board[0].size() - 1) {
    neighbors.push_back({i + 1, j + 1});
  }
  if (i < board.size() - 1 && j > 0) {
    neighbors.push_back({i + 1, j - 1});
  }
  if (i > 0) {
    neighbors.push_back({i - 1, j});
  }
  if (i < board.size() - 1) {
    neighbors.push_back({i + 1, j});
  }
  if (j > 0) {
    neighbors.push_back({i, j - 1});
  }
  if (j < board[0].size() - 1) {
    neighbors.push_back({i, j + 1});
  }
  return neighbors;
}

Trie::Trie() {
  this->root = new TrieNode();
  this->endSymbol = '*';
}

void Trie::add(string str) {
  TrieNode *node = this->root;
  for (char letter : str) {
    if (node->children.find(letter) == node->children.end()) {
      TrieNode *newNode = new TrieNode();
      node->children.insert({letter, newNode});
    }
    node = node->children[letter];
  }
  node->children.insert({this->endSymbol, nullptr});
  node->word = str;
}

```
### Unit Tests 1 (cpp)
```cpp
bool contains(vector<string> wordArray, string targetWord) {
  for (string word : wordArray) {
    if (targetWord == word) {
      return true;
    }
  }
  return false;
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<char>> board = {
          {'t', 'h', 'i', 's', 'i', 's', 'a'},
          {'s', 'i', 'm', 'p', 'l', 'e', 'x'},
          {'b', 'x', 'x', 'x', 'x', 'e', 'b'},
          {'x', 'o', 'g', 'g', 'l', 'x', 'o'},
          {'x', 'x', 'x', 'D', 'T', 'r', 'a'},
          {'R', 'E', 'P', 'E', 'A', 'd', 'x'},
          {'x', 'x', 'x', 'x', 'x', 'x', 'x'},
          {'N', 'O', 'T', 'R', 'E', '-', 'P'},
          {'x', 'x', 'D', 'E', 'T', 'A', 'E'},
      };
      vector<string> words = {"this",     "is",          "not",   "a",
                              "simple",   "boggle",      "board", "test",
                              "REPEATED", "NOTRE-PEATED"};
      vector<string> expected = {"this",   "is",    "a",           "simple",
                                 "boggle", "board", "NOTRE-PEATED"};
      vector<string> actual = boggleBoard(board, words);
      assert(actual.size() == expected.size());
      for (string word : actual) {
        assert(contains(expected, word));
      }
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
		char[,] board = {
			{'t', 'h', 'i', 's', 'i', 's', 'a'},
			{'s', 'i', 'm', 'p', 'l', 'e', 'x'},
			{'b', 'x', 'x', 'x', 'x', 'e', 'b'},
			{'x', 'o', 'g', 'g', 'l', 'x', 'o'},
			{'x', 'x', 'x', 'D', 'T', 'r', 'a'},
			{'R', 'E', 'P', 'E', 'A', 'd', 'x'},
			{'x', 'x', 'x', 'x', 'x', 'x', 'x'},
			{'N', 'O', 'T', 'R', 'E', '-', 'P'},
			{'x', 'x', 'D', 'E', 'T', 'A', 'E'},
		};
		string[] words =
		{"this", "is", "not", "a", "simple", "boggle", "board", "test", "REPEATED",
		 "NOTRE-PEATED"};
		string[] expected =
		{"this", "is", "a", "simple", "boggle", "board", "NOTRE-PEATED"};
		List<string> actual = Program.BoggleBoard(board, words);
		Utils.AssertTrue(actual.Count == expected.Length);
		foreach (string word in actual) {
			Utils.AssertTrue(Contains(expected, word));
		}
	}

	public static bool Contains(string[] wordArray, string targetWord) {
		foreach (string word in wordArray) {
			if (targetWord.Equals(word)) {
				return true;
			}
		}
		return false;
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;

public class Program {
	// O(nm*8^s + ws) time | O(nm + ws) space
	public static List<string> BoggleBoard(char[,] board, string[] words) {
		Trie trie = new Trie();
		foreach (string word in words) {
			trie.Add(word);
		}
		HashSet<string> finalWords = new HashSet<string>();
		bool[,] visited = new bool[board.GetLength(0),board.GetLength(1)];
		for (int i = 0; i < board.GetLength(0); i++) {
			for (int j = 0; j < board.GetLength(1); j++) {
				explore(i, j, board, trie.root, visited, finalWords);
			}
		}
		List<string> finalWordsArray = new List<string>();
		foreach (string key in finalWords) {
			finalWordsArray.Add(key);
		}
		return finalWordsArray;
	}

	public static void explore(int i, int j, char[,] board, TrieNode trieNode, bool[,] visited,
	  HashSet<string> finalWords) {
		if (visited[i,j]) {
			return;
		}
		char letter = board[i,j];
		if (!trieNode.children.ContainsKey(letter)) {
			return;
		}
		visited[i,j] = true;
		trieNode = trieNode.children[letter];
		if (trieNode.children.ContainsKey('*')) {
			finalWords.Add(trieNode.word);
		}
		List<int[]> neighbors = getNeighbors(i, j, board);
		foreach (int[] neighbor in neighbors) {
			explore(neighbor[0], neighbor[1], board, trieNode, visited, finalWords);
		}
		visited[i,j] = false;
	}

	public static List<int[]> getNeighbors(int i, int j, char[,] board) {
		List<int[]> neighbors = new List<int[]>();
		if (i > 0 && j > 0) {
			neighbors.Add(new int[] {i - 1, j - 1});
		}
		if (i > 0 && j < board.GetLength(1) - 1) {
			neighbors.Add(new int[] {i - 1, j + 1});
		}
		if (i < board.GetLength(0) - 1 && j < board.GetLength(1) - 1) {
			neighbors.Add(new int[] {i + 1, j + 1});
		}
		if (i < board.GetLength(0) - 1 && j > 0) {
			neighbors.Add(new int[] {i + 1, j - 1});
		}
		if (i > 0) {
			neighbors.Add(new int[] {i - 1, j});
		}
		if (i < board.GetLength(0) - 1) {
			neighbors.Add(new int[] {i + 1, j});
		}
		if (j > 0) {
			neighbors.Add(new int[] {i, j - 1});
		}
		if (j < board.GetLength(1) - 1) {
			neighbors.Add(new int[] {i, j + 1});
		}
		return neighbors;
	}

	public class TrieNode {
		public Dictionary<char, TrieNode> children = new Dictionary<char, TrieNode>();
		public string word = "";
	}

	public class Trie {
		public TrieNode root;
		public char endSymbol;

		public Trie() {
			this.root = new TrieNode();
			this.endSymbol = '*';
		}

		public void Add(string str) {
			TrieNode node = this.root;
			for (int i = 0; i < str.Length; i++) {
				char letter = str[i];
				if (!node.children.ContainsKey(letter)) {
					TrieNode newNode = new TrieNode();
					node.children.Add(letter, newNode);
				}
				node = node.children[letter];
			}
			node.children[this.endSymbol] = null;
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
		char[,] board = {
			{'t', 'h', 'i', 's', 'i', 's', 'a'},
			{'s', 'i', 'm', 'p', 'l', 'e', 'x'},
			{'b', 'x', 'x', 'x', 'x', 'e', 'b'},
			{'x', 'o', 'g', 'g', 'l', 'x', 'o'},
			{'x', 'x', 'x', 'D', 'T', 'r', 'a'},
			{'R', 'E', 'P', 'E', 'A', 'd', 'x'},
			{'x', 'x', 'x', 'x', 'x', 'x', 'x'},
			{'N', 'O', 'T', 'R', 'E', '-', 'P'},
			{'x', 'x', 'D', 'E', 'T', 'A', 'E'},
		};
		string[] words =
		{"this", "is", "not", "a", "simple", "boggle", "board", "test", "REPEATED",
		 "NOTRE-PEATED"};
		string[] expected =
		{"this", "is", "a", "simple", "boggle", "board", "NOTRE-PEATED"};
		List<string> actual = Program.BoggleBoard(board, words);
		Utils.AssertTrue(actual.Count == expected.Length);
		foreach (string word in actual) {
			Utils.AssertTrue(Contains(expected, word));
		}
	}

	public static bool Contains(string[] wordArray, string targetWord) {
		foreach (string word in wordArray) {
			if (targetWord.Equals(word)) {
				return true;
			}
		}
		return false;
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
	board := [][]rune{
		{'t', 'h', 'i', 's', 'i', 's', 'a'},
		{'s', 'i', 'm', 'p', 'l', 'e', 'x'},
		{'b', 'x', 'x', 'x', 'x', 'e', 'b'},
		{'x', 'o', 'g', 'g', 'l', 'x', 'o'},
		{'x', 'x', 'x', 'D', 'T', 'r', 'a'},
		{'R', 'E', 'P', 'E', 'A', 'd', 'x'},
		{'x', 'x', 'x', 'x', 'x', 'x', 'x'},
		{'N', 'O', 'T', 'R', 'E', '-', 'P'},
		{'x', 'x', 'D', 'E', 'T', 'A', 'E'},
	}
	words := []string{"this", "is", "not", "a", "simple", "boggle", "board", "test", "REPEATED", "NOTRE-PEATED"}
	expected := []string{"this", "is", "a", "simple", "boggle", "board", "NOTRE-PEATED"}
	output := BoggleBoard(board, words)
	require.ElementsMatch(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(nm*8^s + ws) time | O(nm + ws) space
func BoggleBoard(board [][]rune, words []string) []string {
	trie := Trie{children: map[rune]Trie{}}
	for _, word := range words {
		trie.Add(word)
	}

	visited := make([][]bool, len(board))
	for i := range visited {
		visited[i] = make([]bool, len(board[i]))
	}

	finalWords := map[string]bool{}
	for i := range board {
		for j := range board[i] {
			explore(i, j, board, trie, visited, finalWords)
		}
	}

	result := []string{}
	for word := range finalWords {
		result = append(result, word)
	}
	return result
}

func explore(i, j int, board [][]rune, trie Trie, visited [][]bool, finalWords map[string]bool) {
	if visited[i][j] {
		return
	}
	letter := board[i][j]
	if _, found := trie.children[letter]; !found {
		return
	}
	visited[i][j] = true
	trie = trie.children[letter]
	if end, found := trie.children['*']; found {
		finalWords[end.word] = true
	}
	neighbors := getNeighbors(i, j, board)
	for _, neighbor := range neighbors {
		explore(neighbor[0], neighbor[1], board, trie, visited, finalWords)
	}
	visited[i][j] = false
}

func getNeighbors(i, j int, board [][]rune) [][]int {
	neighbors := [][]int{}
	if i > 0 && j > 0 {
		neighbors = append(neighbors, []int{i - 1, j - 1})
	}
	if i > 0 && j < len(board[0])-1 {
		neighbors = append(neighbors, []int{i - 1, j + 1})
	}
	if i < len(board)-1 && j < len(board[0])-1 {
		neighbors = append(neighbors, []int{i + 1, j + 1})
	}
	if i < len(board)-1 && j > 0 {
		neighbors = append(neighbors, []int{i + 1, j - 1})
	}
	if i > 0 {
		neighbors = append(neighbors, []int{i - 1, j})
	}
	if i < len(board)-1 {
		neighbors = append(neighbors, []int{i + 1, j})
	}
	if j > 0 {
		neighbors = append(neighbors, []int{i, j - 1})
	}
	if j < len(board[0])-1 {
		neighbors = append(neighbors, []int{i, j + 1})
	}
	return neighbors

}

type Trie struct {
	children map[rune]Trie

	word string
}

func (t Trie) Add(word string) {
	current := t
	for _, letter := range word {
		if _, found := current.children[letter]; !found {
			current.children[letter] = Trie{
				children: map[rune]Trie{},
			}
		}
		current = current.children[letter]
	}
	current.children['*'] = Trie{
		children: map[rune]Trie{},
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
	board := [][]rune{
		{'t', 'h', 'i', 's', 'i', 's', 'a'},
		{'s', 'i', 'm', 'p', 'l', 'e', 'x'},
		{'b', 'x', 'x', 'x', 'x', 'e', 'b'},
		{'x', 'o', 'g', 'g', 'l', 'x', 'o'},
		{'x', 'x', 'x', 'D', 'T', 'r', 'a'},
		{'R', 'E', 'P', 'E', 'A', 'd', 'x'},
		{'x', 'x', 'x', 'x', 'x', 'x', 'x'},
		{'N', 'O', 'T', 'R', 'E', '-', 'P'},
		{'x', 'x', 'D', 'E', 'T', 'A', 'E'},
	}
	words := []string{"this", "is", "not", "a", "simple", "boggle", "board", "test", "REPEATED", "NOTRE-PEATED"}
	expected := []string{"this", "is", "a", "simple", "boggle", "board", "NOTRE-PEATED"}
	output := BoggleBoard(board, words)
	require.ElementsMatch(t, expected, output)
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
    char[][] board = {
      {'t', 'h', 'i', 's', 'i', 's', 'a'},
      {'s', 'i', 'm', 'p', 'l', 'e', 'x'},
      {'b', 'x', 'x', 'x', 'x', 'e', 'b'},
      {'x', 'o', 'g', 'g', 'l', 'x', 'o'},
      {'x', 'x', 'x', 'D', 'T', 'r', 'a'},
      {'R', 'E', 'P', 'E', 'A', 'd', 'x'},
      {'x', 'x', 'x', 'x', 'x', 'x', 'x'},
      {'N', 'O', 'T', 'R', 'E', '-', 'P'},
      {'x', 'x', 'D', 'E', 'T', 'A', 'E'},
    };
    String[] words = {
      "this", "is", "not", "a", "simple", "boggle", "board", "test", "REPEATED", "NOTRE-PEATED"
    };
    String[] expected = {"this", "is", "a", "simple", "boggle", "board", "NOTRE-PEATED"};
    List<String> actual = Program.boggleBoard(board, words);
    Utils.assertTrue(actual.size() == expected.length);
    for (String word : actual) {
      Utils.assertTrue(contains(expected, word));
    }
  }

  public static boolean contains(String[] wordArray, String targetWord) {
    for (String word : wordArray) {
      if (targetWord.equals(word)) {
        return true;
      }
    }
    return false;
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(nm*8^s + ws) time | O(nm + ws) space
  public static List<String> boggleBoard(char[][] board, String[] words) {
    Trie trie = new Trie();
    for (String word : words) {
      trie.add(word);
    }
    Set<String> finalWords = new HashSet<String>();
    boolean[][] visited = new boolean[board.length][board[0].length];
    for (int i = 0; i < board.length; i++) {
      for (int j = 0; j < board[0].length; j++) {
        explore(i, j, board, trie.root, visited, finalWords);
      }
    }
    List<String> finalWordsArray = new ArrayList<String>();
    finalWordsArray.addAll(finalWords);
    return finalWordsArray;
  }

  public static void explore(
      int i,
      int j,
      char[][] board,
      TrieNode trieNode,
      boolean[][] visited,
      Set<String> finalWords) {
    if (visited[i][j]) {
      return;
    }
    char letter = board[i][j];
    if (!trieNode.children.containsKey(letter)) {
      return;
    }
    visited[i][j] = true;
    trieNode = trieNode.children.get(letter);
    if (trieNode.children.containsKey('*')) {
      finalWords.add(trieNode.word);
    }
    List<Integer[]> neighbors = getNeighbors(i, j, board);
    for (Integer[] neighbor : neighbors) {
      explore(neighbor[0], neighbor[1], board, trieNode, visited, finalWords);
    }
    visited[i][j] = false;
  }

  public static List<Integer[]> getNeighbors(int i, int j, char[][] board) {
    List<Integer[]> neighbors = new ArrayList<Integer[]>();
    if (i > 0 && j > 0) {
      neighbors.add(new Integer[] {i - 1, j - 1});
    }
    if (i > 0 && j < board[0].length - 1) {
      neighbors.add(new Integer[] {i - 1, j + 1});
    }
    if (i < board.length - 1 && j < board[0].length - 1) {
      neighbors.add(new Integer[] {i + 1, j + 1});
    }
    if (i < board.length - 1 && j > 0) {
      neighbors.add(new Integer[] {i + 1, j - 1});
    }
    if (i > 0) {
      neighbors.add(new Integer[] {i - 1, j});
    }
    if (i < board.length - 1) {
      neighbors.add(new Integer[] {i + 1, j});
    }
    if (j > 0) {
      neighbors.add(new Integer[] {i, j - 1});
    }
    if (j < board[0].length - 1) {
      neighbors.add(new Integer[] {i, j + 1});
    }
    return neighbors;
  }

  static class TrieNode {
    Map<Character, TrieNode> children = new HashMap<Character, TrieNode>();
    String word = "";
  }

  static class Trie {
    TrieNode root;
    char endSymbol;

    public Trie() {
      this.root = new TrieNode();
      this.endSymbol = '*';
    }

    public void add(String str) {
      TrieNode node = this.root;
      for (int i = 0; i < str.length(); i++) {
        char letter = str.charAt(i);
        if (!node.children.containsKey(letter)) {
          TrieNode newNode = new TrieNode();
          node.children.put(letter, newNode);
        }
        node = node.children.get(letter);
      }
      node.children.put(this.endSymbol, null);
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
    char[][] board = {
      {'t', 'h', 'i', 's', 'i', 's', 'a'},
      {'s', 'i', 'm', 'p', 'l', 'e', 'x'},
      {'b', 'x', 'x', 'x', 'x', 'e', 'b'},
      {'x', 'o', 'g', 'g', 'l', 'x', 'o'},
      {'x', 'x', 'x', 'D', 'T', 'r', 'a'},
      {'R', 'E', 'P', 'E', 'A', 'd', 'x'},
      {'x', 'x', 'x', 'x', 'x', 'x', 'x'},
      {'N', 'O', 'T', 'R', 'E', '-', 'P'},
      {'x', 'x', 'D', 'E', 'T', 'A', 'E'},
    };
    String[] words = {
      "this", "is", "not", "a", "simple", "boggle", "board", "test", "REPEATED", "NOTRE-PEATED"
    };
    String[] expected = {"this", "is", "a", "simple", "boggle", "board", "NOTRE-PEATED"};
    List<String> actual = Program.boggleBoard(board, words);
    Utils.assertTrue(actual.size() == expected.length);
    for (String word : actual) {
      Utils.assertTrue(contains(expected, word));
    }
  }

  public static boolean contains(String[] wordArray, String targetWord) {
    for (String word : wordArray) {
      if (targetWord.equals(word)) {
        return true;
      }
    }
    return false;
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
  const board = [
    ['t', 'h', 'i', 's', 'i', 's', 'a'],
    ['s', 'i', 'm', 'p', 'l', 'e', 'x'],
    ['b', 'x', 'x', 'x', 'x', 'e', 'b'],
    ['x', 'o', 'g', 'g', 'l', 'x', 'o'],
    ['x', 'x', 'x', 'D', 'T', 'r', 'a'],
    ['R', 'E', 'P', 'E', 'A', 'd', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['N', 'O', 'T', 'R', 'E', '-', 'P'],
    ['x', 'x', 'D', 'E', 'T', 'A', 'E'],
  ];
  const words = ['this', 'is', 'not', 'a', 'simple', 'boggle', 'board', 'test', 'REPEATED', 'NOTRE-PEATED'];
  const expected = ['this', 'is', 'a', 'simple', 'boggle', 'board', 'NOTRE-PEATED'];
  const actual = program.boggleBoard(board, words);
  chai.expect(actual.length).to.deep.equal(expected.length);
  for (const word of actual) {
    chai.expect(actual.includes(word)).to.deep.equal(true);
  }
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nm*8^s + ws) time | O(nm + ws) space
function boggleBoard(board, words) {
  const trie = new Trie();
  for (const word of words) {
    trie.add(word);
  }
  const finalWords = {};
  const visited = board.map(row => row.map(letter => false));
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      explore(i, j, board, trie.root, visited, finalWords);
    }
  }
  return Object.keys(finalWords);
}

function explore(i, j, board, trieNode, visited, finalWords) {
  if (visited[i][j]) return;
  const letter = board[i][j];
  if (!(letter in trieNode)) return;
  visited[i][j] = true;
  trieNode = trieNode[letter];
  if ('*' in trieNode) finalWords[trieNode['*']] = true;
  const neighbors = getNeighbors(i, j, board);
  for (const neighbor of neighbors) {
    explore(neighbor[0], neighbor[1], board, trieNode, visited, finalWords);
  }
  visited[i][j] = false;
}

function getNeighbors(i, j, board) {
  const neighbors = [];
  if (i > 0 && j > 0) {
    neighbors.push([i - 1, j - 1]);
  }
  if (i > 0 && j < board[0].length - 1) {
    neighbors.push([i - 1, j + 1]);
  }
  if (i < board.length - 1 && j < board[0].length - 1) {
    neighbors.push([i + 1, j + 1]);
  }
  if (i < board.length - 1 && j > 0) {
    neighbors.push([i + 1, j - 1]);
  }
  if (i > 0) {
    neighbors.push([i - 1, j]);
  }
  if (i < board.length - 1) {
    neighbors.push([i + 1, j]);
  }
  if (j > 0) {
    neighbors.push([i, j - 1]);
  }
  if (j < board[0].length - 1) {
    neighbors.push([i, j + 1]);
  }
  return neighbors;
}

class Trie {
  constructor() {
    this.root = {};
    this.endSymbol = '*';
  }

  add(word) {
    let current = this.root;
    for (const letter of word) {
      if (!(letter in current)) current[letter] = {};
      current = current[letter];
    }
    current[this.endSymbol] = word;
  }
}

exports.boggleBoard = boggleBoard;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const board = [
    ['t', 'h', 'i', 's', 'i', 's', 'a'],
    ['s', 'i', 'm', 'p', 'l', 'e', 'x'],
    ['b', 'x', 'x', 'x', 'x', 'e', 'b'],
    ['x', 'o', 'g', 'g', 'l', 'x', 'o'],
    ['x', 'x', 'x', 'D', 'T', 'r', 'a'],
    ['R', 'E', 'P', 'E', 'A', 'd', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['N', 'O', 'T', 'R', 'E', '-', 'P'],
    ['x', 'x', 'D', 'E', 'T', 'A', 'E'],
  ];
  const words = ['this', 'is', 'not', 'a', 'simple', 'boggle', 'board', 'test', 'REPEATED', 'NOTRE-PEATED'];
  const expected = ['this', 'is', 'a', 'simple', 'boggle', 'board', 'NOTRE-PEATED'];
  const actual = program.boggleBoard(board, words);
  chai.expect(actual.length).to.deep.equal(expected.length);
  for (const word of actual) {
    chai.expect(actual.includes(word)).to.deep.equal(true);
  }
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.boggleBoard as boggleBoard

class ProgramTest {
    @Test
    fun TestCase1() {
        val board = listOf(
            listOf('t', 'h', 'i', 's', 'i', 's', 'a'),
            listOf('s', 'i', 'm', 'p', 'l', 'e', 'x'),
            listOf('b', 'x', 'x', 'x', 'x', 'e', 'b'),
            listOf('x', 'o', 'g', 'g', 'l', 'x', 'o'),
            listOf('x', 'x', 'x', 'D', 'T', 'r', 'a'),
            listOf('R', 'E', 'P', 'E', 'A', 'd', 'x'),
            listOf('x', 'x', 'x', 'x', 'x', 'x', 'x'),
            listOf('N', 'O', 'T', 'R', 'E', '-', 'P'),
            listOf('x', 'x', 'D', 'E', 'T', 'A', 'E')
        )
        val words = listOf("this", "is", "not", "a", "simple", "boggle", "board", "test", "REPEATED", "NOTRE-PEATED")
        val expected = listOf("this", "is", "a", "simple", "boggle", "board", "NOTRE-PEATED")
        val actual = boggleBoard(board, words)

        assert(actual.size == expected.size)
        for (word in actual) {
            assert(actual.contains(word))
        }
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

data class TrieNode(
    val children: MutableMap<Char, TrieNode?> = mutableMapOf<Char, TrieNode?>(),
    var word: String = ""
)

open class Trie() {
    val endSymbol = '*'
    var root = TrieNode()

    fun add(word: String) {
        var current = this.root
        for (letter in word) {
            if (!current.children.containsKey(letter)) {
                current.children[letter] = TrieNode()
            }
            current = current.children[letter]!!
        }
        current.children[this.endSymbol] = null
        current.word = word
    }
}

// O(nm*8^s + ws) time | O(nm + ws) space
fun boggleBoard(board: List<List<Char>>, words: List<String>): List<String> {
    val trie = Trie()
    for (word in words) {
        trie.add(word)
    }
    val finalWords = mutableMapOf<String, Boolean>()
    val visited = List(board.size, { MutableList(board[0].size, { false }) })
    for (i in 0 until board.size) {
        for (j in 0 until board[i].size) {
            explore(i, j, board, trie.root, visited, finalWords)
        }
    }
    return finalWords.keys.toList()
}

fun explore(i: Int, j: Int, board: List<List<Char>>, trieNode: TrieNode, visited: List<MutableList<Boolean>>, finalWords: MutableMap<String, Boolean>) {
    if (visited[i][j]) return
    val letter = board[i][j]
    if (!trieNode.children.containsKey(letter)) return
    visited[i][j] = true
    val nextTrieNode = trieNode.children[letter]!!
    if (nextTrieNode.children.containsKey('*')) finalWords[nextTrieNode.word] = true
    val neighbors = getNeighbors(i, j, board)
    for (neighbor in neighbors) {
        explore(neighbor.first, neighbor.second, board, nextTrieNode, visited, finalWords)
    }
    visited[i][j] = false
}

fun getNeighbors(i: Int, j: Int, board: List<List<Char>>): List<Pair<Int, Int>> {
    val neighbors = mutableListOf<Pair<Int, Int>>()
    if (i > 0 && j > 0) {
        neighbors.add(Pair(i - 1, j - 1))
    }
    if (i > 0 && j < board[0].size - 1) {
        neighbors.add(Pair(i - 1, j + 1))
    }
    if (i < board.size - 1 && j < board[0].size - 1) {
        neighbors.add(Pair(i + 1, j + 1))
    }
    if (i < board.size - 1 && j > 0) {
        neighbors.add(Pair(i + 1, j - 1))
    }
    if (i > 0) {
        neighbors.add(Pair(i - 1, j))
    }
    if (i < board.size - 1) {
        neighbors.add(Pair(i + 1, j))
    }
    if (j > 0) {
        neighbors.add(Pair(i, j - 1))
    }
    if (j < board[0].size - 1) {
        neighbors.add(Pair(i, j + 1))
    }
    return neighbors
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.boggleBoard as boggleBoard

class ProgramTest {
    @Test
    fun TestCase1() {
        val board = listOf(
            listOf('t', 'h', 'i', 's', 'i', 's', 'a'),
            listOf('s', 'i', 'm', 'p', 'l', 'e', 'x'),
            listOf('b', 'x', 'x', 'x', 'x', 'e', 'b'),
            listOf('x', 'o', 'g', 'g', 'l', 'x', 'o'),
            listOf('x', 'x', 'x', 'D', 'T', 'r', 'a'),
            listOf('R', 'E', 'P', 'E', 'A', 'd', 'x'),
            listOf('x', 'x', 'x', 'x', 'x', 'x', 'x'),
            listOf('N', 'O', 'T', 'R', 'E', '-', 'P'),
            listOf('x', 'x', 'D', 'E', 'T', 'A', 'E')
        )
        val words = listOf("this", "is", "not", "a", "simple", "boggle", "board", "test", "REPEATED", "NOTRE-PEATED")
        val expected = listOf("this", "is", "a", "simple", "boggle", "board", "NOTRE-PEATED")
        val actual = boggleBoard(board, words)

        assert(actual.size == expected.size)
        for (word in actual) {
            assert(actual.contains(word))
        }
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
      let board = [
        ["t", "h", "i", "s", "i", "s", "a"],
        ["s", "i", "m", "p", "l", "e", "x"],
        ["b", "x", "x", "x", "x", "e", "b"],
        ["x", "o", "g", "g", "l", "x", "o"],
        ["x", "x", "x", "D", "T", "r", "a"],
        ["R", "E", "P", "E", "A", "d", "x"],
        ["x", "x", "x", "x", "x", "x", "x"],
        ["N", "O", "T", "R", "E", "-", "P"],
        ["x", "x", "D", "E", "T", "A", "E"],
      ]
      let words = ["this", "is", "not", "a", "simple", "boggle", "board", "test", "REPEATED", "NOTRE-PEATED"]
      let expected = ["this", "is", "a", "simple", "boggle", "board", "NOTRE-PEATED"]
      let actual = program.boggleBoard(board: board, words: words)
      try assertEqual(expected.count, actual.count)

      for word in actual {
        try assert(expected.contains(word))
      }
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nm*8^s + ws) time | O(nm + ws) space
  func boggleBoard(board: [[String]], words: [String]) -> [String] {
    let trie = Trie()

    for word in words {
      trie.add(word)
    }

    var finalWords = [String: Bool]()

    var visited = board.map { row in row.map { _ in false } }

    for i in 0 ..< board.count {
      for j in 0 ..< board[i].count {
        explore(i, j, board, trie.root, &visited, &finalWords)
      }
    }

    let keys = Array(finalWords.keys)
    return keys
  }

  func explore(_ i: Int, _ j: Int, _ board: [[String]], _ trieNode: TrieNode, _ visited: inout [[Bool]], _ finalWords: inout [String: Bool]) {
    if visited[i][j] {
      return
    }

    let letter = board[i][j]

    if !trieNode.children.keys.contains(letter) {
      return
    }

    visited[i][j] = true

    let nextNode = trieNode.children[letter] as! TrieNode

    if nextNode.children.keys.contains("*") {
      if let word = nextNode.children["*"] as? String {
        finalWords[word] = true
      }
    }

    let neighbors = getNeighbors(i, j, board: board)

    for neighbor in neighbors {
      explore(neighbor[0], neighbor[1], board, nextNode, &visited, &finalWords)
    }

    visited[i][j] = false
  }

  func getNeighbors(_ i: Int, _ j: Int, board: [[String]]) -> [[Int]] {
    var neighbors = [[Int]]()

    if i > 0, j > 0 {
      neighbors.append([i - 1, j - 1])
    }

    if i > 0 {
      neighbors.append([i - 1, j])
    }

    if i > 0, j < board[i].count - 1 {
      neighbors.append([i - 1, j + 1])
    }

    if j < board[i].count - 1 {
      neighbors.append([i, j + 1])
    }

    if i < board.count - 1, j < board[i].count - 1 {
      neighbors.append([i + 1, j + 1])
    }

    if i < board.count - 1 {
      neighbors.append([i + 1, j])
    }

    if i < board.count - 1, j > 0 {
      neighbors.append([i + 1, j - 1])
    }

    if j > 0 {
      neighbors.append([i, j - 1])
    }

    return neighbors
  }

  class TrieNode {
    var children: [String: Any] = [:]
  }

  class Trie {
    var root: TrieNode
    let endSymbol: String = "*"

    init() {
      root = TrieNode()
    }

    func add(_ word: String) {
      var current = root

      for character in word {
        let stringifiedCharacter = String(character)

        if !current.children.keys.contains(stringifiedCharacter) {
          current.children[stringifiedCharacter] = TrieNode()
        }

        let nextNode = current.children[stringifiedCharacter] as! TrieNode
        current = nextNode
      }

      current.children[endSymbol] = word
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
      let board = [
        ["t", "h", "i", "s", "i", "s", "a"],
        ["s", "i", "m", "p", "l", "e", "x"],
        ["b", "x", "x", "x", "x", "e", "b"],
        ["x", "o", "g", "g", "l", "x", "o"],
        ["x", "x", "x", "D", "T", "r", "a"],
        ["R", "E", "P", "E", "A", "d", "x"],
        ["x", "x", "x", "x", "x", "x", "x"],
        ["N", "O", "T", "R", "E", "-", "P"],
        ["x", "x", "D", "E", "T", "A", "E"],
      ]
      let words = ["this", "is", "not", "a", "simple", "boggle", "board", "test", "REPEATED", "NOTRE-PEATED"]
      let expected = ["this", "is", "a", "simple", "boggle", "board", "NOTRE-PEATED"]
      let actual = program.boggleBoard(board: board, words: words)
      try assertEqual(expected.count, actual.count)

      for word in actual {
        try assert(expected.contains(word))
      }
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
        board = [
            ["t", "h", "i", "s", "i", "s", "a"],
            ["s", "i", "m", "p", "l", "e", "x"],
            ["b", "x", "x", "x", "x", "e", "b"],
            ["x", "o", "g", "g", "l", "x", "o"],
            ["x", "x", "x", "D", "T", "r", "a"],
            ["R", "E", "P", "E", "A", "d", "x"],
            ["x", "x", "x", "x", "x", "x", "x"],
            ["N", "O", "T", "R", "E", "-", "P"],
            ["x", "x", "D", "E", "T", "A", "E"],
        ]
        words = ["this", "is", "not", "a", "simple", "boggle", "board", "test", "REPEATED", "NOTRE-PEATED"]
        expected = ["this", "is", "a", "simple", "boggle", "board", "NOTRE-PEATED"]
        actual = program.boggleBoard(board, words)
        self.assertEqual(len(actual), len(expected))
        for word in actual:
            self.assertTrue(word in expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nm*8^s + ws) time | O(nm + ws) space
def boggleBoard(board, words):
    trie = Trie()
    for word in words:
        trie.add(word)
    finalWords = {}
    visited = [[False for letter in row] for row in board]
    for i in range(len(board)):
        for j in range(len(board[i])):
            explore(i, j, board, trie.root, visited, finalWords)
    return list(finalWords.keys())


def explore(i, j, board, trieNode, visited, finalWords):
    if visited[i][j]:
        return
    letter = board[i][j]
    if letter not in trieNode:
        return
    visited[i][j] = True
    trieNode = trieNode[letter]
    if "*" in trieNode:
        finalWords[trieNode["*"]] = True
    neighbors = getNeighbors(i, j, board)
    for neighbor in neighbors:
        explore(neighbor[0], neighbor[1], board, trieNode, visited, finalWords)
    visited[i][j] = False


def getNeighbors(i, j, board):
    neighbors = []
    if i > 0 and j > 0:
        neighbors.append([i - 1, j - 1])
    if i > 0 and j < len(board[0]) - 1:
        neighbors.append([i - 1, j + 1])
    if i < len(board) - 1 and j < len(board[0]) - 1:
        neighbors.append([i + 1, j + 1])
    if i < len(board) - 1 and j > 0:
        neighbors.append([i + 1, j - 1])
    if i > 0:
        neighbors.append([i - 1, j])
    if i < len(board) - 1:
        neighbors.append([i + 1, j])
    if j > 0:
        neighbors.append([i, j - 1])
    if j < len(board[0]) - 1:
        neighbors.append([i, j + 1])
    return neighbors


class Trie:
    def __init__(self):
        self.root = {}
        self.endSymbol = "*"

    def add(self, word):
        current = self.root
        for letter in word:
            if letter not in current:
                current[letter] = {}
            current = current[letter]
        current[self.endSymbol] = word

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        board = [
            ["t", "h", "i", "s", "i", "s", "a"],
            ["s", "i", "m", "p", "l", "e", "x"],
            ["b", "x", "x", "x", "x", "e", "b"],
            ["x", "o", "g", "g", "l", "x", "o"],
            ["x", "x", "x", "D", "T", "r", "a"],
            ["R", "E", "P", "E", "A", "d", "x"],
            ["x", "x", "x", "x", "x", "x", "x"],
            ["N", "O", "T", "R", "E", "-", "P"],
            ["x", "x", "D", "E", "T", "A", "E"],
        ]
        words = ["this", "is", "not", "a", "simple", "boggle", "board", "test", "REPEATED", "NOTRE-PEATED"]
        expected = ["this", "is", "a", "simple", "boggle", "board", "NOTRE-PEATED"]
        actual = program.boggleBoard(board, words)
        self.assertEqual(len(actual), len(expected))
        for word in actual:
            self.assertTrue(word in expected)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const board = [
    ['t', 'h', 'i', 's', 'i', 's', 'a'],
    ['s', 'i', 'm', 'p', 'l', 'e', 'x'],
    ['b', 'x', 'x', 'x', 'x', 'e', 'b'],
    ['x', 'o', 'g', 'g', 'l', 'x', 'o'],
    ['x', 'x', 'x', 'D', 'T', 'r', 'a'],
    ['R', 'E', 'P', 'E', 'A', 'd', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['N', 'O', 'T', 'R', 'E', '-', 'P'],
    ['x', 'x', 'D', 'E', 'T', 'A', 'E'],
  ];
  const words = ['this', 'is', 'not', 'a', 'simple', 'boggle', 'board', 'test', 'REPEATED', 'NOTRE-PEATED'];
  const expected = ['this', 'is', 'a', 'simple', 'boggle', 'board', 'NOTRE-PEATED'];
  const actual = program.boggleBoard(board, words);
  chai.expect(actual.length).to.deep.equal(expected.length);
  for (const word of actual) {
    chai.expect(actual.includes(word)).to.deep.equal(true);
  }
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

interface FinalWords {
  [key: string]: boolean;
}

// O(nm*8^s + ws) time | O(nm + ws) space
export function boggleBoard(board: string[][], words: string[]) {
  const trie = new Trie();
  for (const word of words) {
    trie.add(word);
  }
  const finalWords = {};
  const visited = board.map(row => row.map(letter => false));
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      explore(i, j, board, trie.root, visited, finalWords);
    }
  }
  return Object.keys(finalWords);
}

function explore(
  i: number,
  j: number,
  board: string[][],
  trieNode: TrieNode,
  visited: boolean[][],
  finalWords: FinalWords,
) {
  if (visited[i][j]) return;
  const letter = board[i][j];
  if (!(letter in trieNode)) return;
  visited[i][j] = true;
  trieNode = trieNode[letter] as TrieNode;
  if ('*' in trieNode) finalWords[trieNode['*'] as string] = true;
  const neighbors = getNeighbors(i, j, board);
  for (const neighbor of neighbors) {
    explore(neighbor[0], neighbor[1], board, trieNode, visited, finalWords);
  }
  visited[i][j] = false;
}

function getNeighbors(i: number, j: number, board: string[][]) {
  const neighbors: [number, number][] = [];
  if (i > 0 && j > 0) {
    neighbors.push([i - 1, j - 1]);
  }
  if (i > 0 && j < board[0].length - 1) {
    neighbors.push([i - 1, j + 1]);
  }
  if (i < board.length - 1 && j < board[0].length - 1) {
    neighbors.push([i + 1, j + 1]);
  }
  if (i < board.length - 1 && j > 0) {
    neighbors.push([i + 1, j - 1]);
  }
  if (i > 0) {
    neighbors.push([i - 1, j]);
  }
  if (i < board.length - 1) {
    neighbors.push([i + 1, j]);
  }
  if (j > 0) {
    neighbors.push([i, j - 1]);
  }
  if (j < board[0].length - 1) {
    neighbors.push([i, j + 1]);
  }
  return neighbors;
}

interface TrieNode {
  [key: string]: string | TrieNode;
}

class Trie {
  root: TrieNode;
  endSymbol: string;

  constructor() {
    this.root = {};
    this.endSymbol = '*';
  }

  add(word: string) {
    let current = this.root;
    for (const letter of word) {
      if (!(letter in current)) current[letter] = {};
      current = current[letter] as TrieNode;
    }
    current[this.endSymbol] = word;
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const board = [
    ['t', 'h', 'i', 's', 'i', 's', 'a'],
    ['s', 'i', 'm', 'p', 'l', 'e', 'x'],
    ['b', 'x', 'x', 'x', 'x', 'e', 'b'],
    ['x', 'o', 'g', 'g', 'l', 'x', 'o'],
    ['x', 'x', 'x', 'D', 'T', 'r', 'a'],
    ['R', 'E', 'P', 'E', 'A', 'd', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['N', 'O', 'T', 'R', 'E', '-', 'P'],
    ['x', 'x', 'D', 'E', 'T', 'A', 'E'],
  ];
  const words = ['this', 'is', 'not', 'a', 'simple', 'boggle', 'board', 'test', 'REPEATED', 'NOTRE-PEATED'];
  const expected = ['this', 'is', 'a', 'simple', 'boggle', 'board', 'NOTRE-PEATED'];
  const actual = program.boggleBoard(board, words);
  chai.expect(actual.length).to.deep.equal(expected.length);
  for (const word of actual) {
    chai.expect(actual.includes(word)).to.deep.equal(true);
  }
});

```

