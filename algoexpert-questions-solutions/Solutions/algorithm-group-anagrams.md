# Group Anagrams
<div class="html">
<p>
  Write a function that takes in an array of strings and groups anagrams together.
</p>
<p>
  Anagrams are strings made up of exactly the same letters, where order doesn't
  matter. For example, <span>"cinema"</span> and <span>"iceman"</span> are
  anagrams; similarly, <span>"foo"</span> and <span>"ofo"</span> are anagrams.
</p>
<p>
  Your function should return a list of anagram groups in no particular order.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">words</span> = ["yo", "act", "flop", "tac", "foo", "cat", "oy", "olfp"]
</pre>
<h3>Sample Output</h3>
<pre>
[["yo", "oy"], ["flop", "olfp"], ["act", "tac", "cat"], ["foo"]]
</pre>
</div>

Hint 1
<p>
Try rearranging every input string such that each string's letters are ordered in alphabetical order. What can you do with the resulting strings?
</p>


Hint 2

<p>
For any two of the resulting strings mentioned in Hint #1 that are equal to each other, their original strings (with their letters in normal order) must be anagrams. Realizing this, you could bucket all of these resulting strings together, all the while keeping track of their original strings, to find the groups of anagrams.
</p>


Hint 3

<p>
Can you simply store the resulting strings mentioned in Hint #1 in a hash table and find the groups of anagrams using this hash table?
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

bool compare(vector<vector<string>> expected, vector<vector<string>> output);

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<string> words = {"yo",  "act", "flop", "tac",
                              "foo", "cat", "oy",   "olfp"};
      vector<vector<string>> expected = {
          {"yo", "oy"}, {"flop", "olfp"}, {"act", "tac", "cat"}, {"foo"}};
      vector<vector<string>> output = groupAnagrams(words);
      for (auto &el : output) {
        sort(el.begin(), el.end());
      }
      assert(compare(expected, output));
    });
  }
};

bool compare(vector<vector<string>> expected, vector<vector<string>> output) {
  if (expected.size() != output.size()) {
    return false;
  }

  for (auto group : expected) {
    sort(group.begin(), group.end());
    if (find(output.begin(), output.end(), group) == output.end()) {
      return false;
    }
  }
  return true;
}

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <numeric>
#include <algorithm>

using namespace std;

// O(w * n * log(n) + n * w * log(w)) time | O(wn) space - where w is the number
// of words and n is the length of the longest word
vector<vector<string>> groupAnagrams(vector<string> words) {
  if (words.size() == 0)
    return {};

  vector<string> sortedWords = {};
  for (auto word : words) {
    sort(word.begin(), word.end());
    sortedWords.push_back(word);
  }

  vector<int> indices(words.size());
  iota(indices.begin(), indices.end(), 0);
  sort(indices.begin(), indices.end(), [sortedWords](int a, int b) -> bool {
    return sortedWords[a] < sortedWords[b];
  });

  vector<vector<string>> result = {};
  vector<string> currentAnagramGroup = {};
  string currentAnagram = sortedWords[indices[0]];
  for (auto index : indices) {
    string word = words[index];
    string sortedWord = sortedWords[index];

    if (sortedWord == currentAnagram) {
      currentAnagramGroup.push_back(word);
      continue;
    }

    result.push_back(currentAnagramGroup);
    currentAnagramGroup = vector<string>{word};
    currentAnagram = sortedWord;
  }

  result.push_back(currentAnagramGroup);

  return result;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <algorithm>
#include <unordered_map>
using namespace std;

// O(w * n * log(n)) time | O(wn) space - where w is the number of words and n
// is the length of the longest word
vector<vector<string>> groupAnagrams(vector<string> words) {
  unordered_map<string, vector<string>> anagrams;

  for (auto word : words) {
    string sortedWord = word;
    sort(sortedWord.begin(), sortedWord.end());

    if (anagrams.find(sortedWord) != anagrams.end()) {
      anagrams[sortedWord].push_back(word);
    } else {
      anagrams[sortedWord] = vector<string>{word};
    }
  }

  vector<vector<string>> output = {};
  for (auto it : anagrams) {
    output.push_back(it.second);
  }
  return output;
}

```
### Unit Tests 1 (cpp)
```cpp
bool compare(vector<vector<string>> expected, vector<vector<string>> output);

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<string> words = {"yo",  "act", "flop", "tac",
                              "foo", "cat", "oy",   "olfp"};
      vector<vector<string>> expected = {
          {"yo", "oy"}, {"flop", "olfp"}, {"act", "tac", "cat"}, {"foo"}};
      vector<vector<string>> output = groupAnagrams(words);
      for (auto &el : output) {
        sort(el.begin(), el.end());
      }
      assert(compare(expected, output));
    });
  }
};

bool compare(vector<vector<string>> expected, vector<vector<string>> output) {
  if (expected.size() != output.size()) {
    return false;
  }

  for (auto group : expected) {
    sort(group.begin(), group.end());
    if (find(output.begin(), output.end(), group) == output.end()) {
      return false;
    }
  }
  return true;
}

```
### Sandbox Code (csharp)
```csharp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

using System;
using System.Linq;
using System.Collections;
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		List<string> words = new List<string>(){
			"yo", "act", "flop", "tac", "foo", "cat", "oy", "olfp"
		};
		List<List<string> > expected = new List<List<string> >();
		expected.Add(new List<string>(){
			"yo", "oy"
		});
		expected.Add(new List<string>(){
			"flop", "olfp"
		});
		expected.Add(new List<string>(){
			"act", "tac", "cat"
		});
		expected.Add(new List<string>(){
			"foo"
		});
		List<List<string> > output = Program.groupAnagrams(words);
		foreach (List<string> innerList in output) {
			innerList.Sort();
		}
		Utils.AssertTrue(compare(expected, output));
	}

	public bool compare(List<List<string> > expected, List<List<string> > output) {
		if (expected.Count != output.Count) return false;
		foreach (List<string> e in expected) {
			e.Sort();
			var found = false;
			foreach (List<string> o in output) {
				if (e.SequenceEqual(o)) {
					found = true;
				}
			}

			if (!found) return false;
		}

		return true;
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Linq;
using System.Collections.Generic;

public class Program {
	// O(w * n * log(n) + n * w * log(w)) time | O(wn) space - where w is the number of words and
	// n is the length of the longest word
	public static List<List<string> > groupAnagrams(List<string> words) {
		if (words.Count == 0) return new List<List<string> >();

		List<string> sortedWords = new List<string>();
		foreach (string word in words) {
			char[] charArray = word.ToCharArray();
			Array.Sort(charArray);
			string sortedWord = new String(charArray);
			sortedWords.Add(sortedWord);
		}

		List<int> indices = Enumerable.Range(0, words.Count).ToList();
		indices.Sort((a, b) => sortedWords[a].CompareTo(sortedWords[b]));

		List<List<string> > result = new List<List<string> >();
		List<string> currentAnagramGroup = new List<string>();
		string currentAnagram = sortedWords[indices[0]];
		foreach (int index in indices) {
			string word = words[index];
			string sortedWord = sortedWords[index];

			if (sortedWord.Equals(currentAnagram)) {
				currentAnagramGroup.Add(word);
				continue;
			}

			result.Add(currentAnagramGroup);
			currentAnagramGroup = new List<string>(){
				word
			};
			currentAnagram = sortedWord;
		}

		result.Add(currentAnagramGroup);

		return result;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Linq;
using System.Collections.Generic;

public class Program {
	// O(w * n * log(n)) time | O(wn) space - where w is the number of words and n is the length of the longest word
	public static List<List<string> > groupAnagrams(List<string> words) {
		Dictionary<string,
		  List<string> > anagrams = new Dictionary<string, List<string> >();

		foreach (string word in words) {
			char[] charArray = word.ToCharArray();
			Array.Sort(charArray);
			string sortedWord = new String(charArray);

			if (anagrams.ContainsKey(sortedWord)) {
				anagrams[sortedWord].Add(word);
			} else {
				anagrams[sortedWord] = new List<string>(){
					word
				};
			}
		}
		return anagrams.Values.ToList();
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;
using System.Linq;
using System.Collections;
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		List<string> words = new List<string>(){
			"yo", "act", "flop", "tac", "foo", "cat", "oy", "olfp"
		};
		List<List<string> > expected = new List<List<string> >();
		expected.Add(new List<string>(){
			"yo", "oy"
		});
		expected.Add(new List<string>(){
			"flop", "olfp"
		});
		expected.Add(new List<string>(){
			"act", "tac", "cat"
		});
		expected.Add(new List<string>(){
			"foo"
		});
		List<List<string> > output = Program.groupAnagrams(words);
		foreach (List<string> innerList in output) {
			innerList.Sort();
		}
		Utils.AssertTrue(compare(expected, output));
	}

	public bool compare(List<List<string> > expected, List<List<string> > output) {
		if (expected.Count != output.Count) return false;
		foreach (List<string> e in expected) {
			e.Sort();
			var found = false;
			foreach (List<string> o in output) {
				if (e.SequenceEqual(o)) {
					found = true;
				}
			}

			if (!found) return false;
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
	"sort"

	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	words := []string{"yo", "act", "flop", "tac", "foo", "cat", "oy", "olfp"}
	expected := [][]string{{"yo", "oy"}, {"flop", "olfp"}, {"act", "tac", "cat"}, {"foo"}}
	output := GroupAnagrams(words)
	compare(t, expected, output)
}

func compare(t *TestCase, expected, output [][]string) {
	t.Helper()
	for _, group := range output {
		sort.Strings(group)
	}

	for _, group := range expected {
		sort.Strings(group)
	}
	require.ElementsMatch(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"sort"
)

// O(w * n * log(n) + n * w * log(w)) time | O(wn) space - where w is the number of words and
// n is the length of the longest word
func GroupAnagrams(words []string) [][]string {
	if len(words) == 0 {
		return [][]string{}
	}

	sortedWords := []string{}
	indices := []int{}
	for i, word := range words {
		sortedWords = append(sortedWords, sortWord(word))
		indices = append(indices, i)
	}
	sort.Slice(indices, func(i, j int) bool {
		return sortedWords[indices[i]] < sortedWords[indices[j]]
	})

	result := [][]string{}
	currentAnagramGroup := []string{}
	currentAnagram := sortedWords[indices[0]]
	for _, index := range indices {
		word := words[index]
		sortedWord := sortedWords[index]
		if len(currentAnagramGroup) == 0 {
			currentAnagramGroup = append(currentAnagramGroup, word)
			currentAnagram = sortedWord
			continue
		}

		if sortedWord == currentAnagram {
			currentAnagramGroup = append(currentAnagramGroup, word)
			continue
		}

		result = append(result, currentAnagramGroup)
		currentAnagramGroup = []string{word}
		currentAnagram = sortedWord
	}

	result = append(result, currentAnagramGroup)

	return result
}

func sortWord(word string) string {
	wordBytes := []byte(word)
	sort.Slice(wordBytes, func(i, j int) bool {
		return wordBytes[i] < wordBytes[j]
	})
	return string(wordBytes)
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "sort"

// O(w * n * log(n)) time | O(wn) space - where w is the number of words and
// n is the length of the longest word
func GroupAnagrams(words []string) [][]string {
	anagrams := map[string][]string{}

	for _, word := range words {
		sortedWord := sortWord(word)
		anagrams[sortedWord] = append(anagrams[sortedWord], word)
	}

	result := [][]string{}
	for _, group := range anagrams {
		result = append(result, group)
	}
	return result
}

func sortWord(word string) string {
	wordBytes := []byte(word)
	sort.Slice(wordBytes, func(i, j int) bool {
		return wordBytes[i] < wordBytes[j]
	})
	return string(wordBytes)
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"sort"

	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	words := []string{"yo", "act", "flop", "tac", "foo", "cat", "oy", "olfp"}
	expected := [][]string{{"yo", "oy"}, {"flop", "olfp"}, {"act", "tac", "cat"}, {"foo"}}
	output := GroupAnagrams(words)
	compare(t, expected, output)
}

func compare(t *TestCase, expected, output [][]string) {
	t.Helper()
	for _, group := range output {
		sort.Strings(group)
	}

	for _, group := range expected {
		sort.Strings(group)
	}
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
    List<String> words =
        new ArrayList<String>(
            Arrays.asList("yo", "act", "flop", "tac", "foo", "cat", "oy", "olfp"));
    List<List<String>> expected = new ArrayList<List<String>>();
    expected.add(new ArrayList<String>(Arrays.asList("yo", "oy")));
    expected.add(new ArrayList<String>(Arrays.asList("flop", "olfp")));
    expected.add(new ArrayList<String>(Arrays.asList("act", "tac", "cat")));
    expected.add(new ArrayList<String>(Arrays.asList("foo")));
    List<List<String>> output = Program.groupAnagrams(words);
    for (List<String> innerList : output) {
      Collections.sort(innerList);
    }
    Utils.assertTrue(compare(expected, output));
  }

  public boolean compare(List<List<String>> expected, List<List<String>> output) {
    if (expected.size() != output.size()) return false;

    for (List<String> group : expected) {
      Collections.sort(group);
      if (!output.contains(group)) return false;
    }

    return true;
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;
import java.util.stream.*;

class Program {
  // O(w * n * log(n) + n * w * log(w)) time | O(wn) space - where w is the number of words and
  // n is the length of the longest word
  public static List<List<String>> groupAnagrams(List<String> words) {
    if (words.size() == 0) return new ArrayList<List<String>>();

    List<String> sortedWords = new ArrayList<String>();
    for (String word : words) {
      char[] charArray = word.toCharArray();
      Arrays.sort(charArray);
      String sortedWord = new String(charArray);
      sortedWords.add(sortedWord);
    }

    List<Integer> indices = IntStream.range(0, words.size()).boxed().collect(Collectors.toList());
    indices.sort((a, b) -> sortedWords.get(a).compareTo(sortedWords.get(b)));

    List<List<String>> result = new ArrayList<List<String>>();
    List<String> currentAnagramGroup = new ArrayList<String>();
    String currentAnagram = sortedWords.get(indices.get(0));
    for (Integer index : indices) {
      String word = words.get(index);
      String sortedWord = sortedWords.get(index);

      if (sortedWord.equals(currentAnagram)) {
        currentAnagramGroup.add(word);
        continue;
      }

      result.add(currentAnagramGroup);
      currentAnagramGroup = new ArrayList<String>(Arrays.asList(word));
      currentAnagram = sortedWord;
    }

    result.add(currentAnagramGroup);

    return result;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;
import java.util.stream.*;

class Program {
  // O(w * n * log(n)) time | O(wn) space - where w is the number of words and n is the length of
  // the longest word
  public static List<List<String>> groupAnagrams(List<String> words) {
    Map<String, List<String>> anagrams = new HashMap<String, List<String>>();

    for (String word : words) {
      char[] charArray = word.toCharArray();
      Arrays.sort(charArray);
      String sortedWord = new String(charArray);

      if (anagrams.containsKey(sortedWord)) {
        anagrams.get(sortedWord).add(word);
      } else {
        anagrams.put(sortedWord, new ArrayList<String>(Arrays.asList(word)));
      }
    }
    return new ArrayList<>(anagrams.values());
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    List<String> words =
        new ArrayList<String>(
            Arrays.asList("yo", "act", "flop", "tac", "foo", "cat", "oy", "olfp"));
    List<List<String>> expected = new ArrayList<List<String>>();
    expected.add(new ArrayList<String>(Arrays.asList("yo", "oy")));
    expected.add(new ArrayList<String>(Arrays.asList("flop", "olfp")));
    expected.add(new ArrayList<String>(Arrays.asList("act", "tac", "cat")));
    expected.add(new ArrayList<String>(Arrays.asList("foo")));
    List<List<String>> output = Program.groupAnagrams(words);
    for (List<String> innerList : output) {
      Collections.sort(innerList);
    }
    Utils.assertTrue(compare(expected, output));
  }

  public boolean compare(List<List<String>> expected, List<List<String>> output) {
    if (expected.size() != output.size()) return false;

    for (List<String> group : expected) {
      Collections.sort(group);
      if (!output.contains(group)) return false;
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
  const words = ['yo', 'act', 'flop', 'tac', 'foo', 'cat', 'oy', 'olfp'];
  const expected = [['yo', 'oy'], ['flop', 'olfp'], ['act', 'tac', 'cat'], ['foo']];
  const output = program.groupAnagrams(words).map(anagramGroup => anagramGroup.sort());

  compare(expected, output);
});

function compare(expected, output) {
  chai.expect(output.length).to.deep.equal(expected.length);
  for (const group of expected) {
    chai.expect(output).to.deep.include(group.sort());
  }
}

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(w * n * log(n) + n * w * log(w)) time | O(wn) space - where w is the number of words and
// n is the length of the longest word
function groupAnagrams(words) {
  if (words.length === 0) return [];

  const sortedWords = words.map(word => word.split('').sort().join(''));
  const indices = [...Array(words.length).keys()];
  indices.sort((a, b) => {
    if (sortedWords[a] < sortedWords[b]) return -1;
    if (sortedWords[a] > sortedWords[b]) return 1;
    return 0;
  });

  const result = [];
  let currentAnagramGroup = [];
  let currentAnagram = sortedWords[indices[0]];
  for (const index of indices) {
    const word = words[index];
    const sortedWord = sortedWords[index];

    if (sortedWord === currentAnagram) {
      currentAnagramGroup.push(word);
      continue;
    }

    result.push(currentAnagramGroup);
    currentAnagramGroup = [word];
    currentAnagram = sortedWord;
  }

  result.push(currentAnagramGroup);

  return result;
}

exports.groupAnagrams = groupAnagrams;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(w * n * log(n)) time | O(wn) space - where w is the number of words and n is the length of the longest word
function groupAnagrams(words) {
  const anagrams = {};
  for (const word of words) {
    const sortedWord = word.split('').sort().join('');
    if (sortedWord in anagrams) {
      anagrams[sortedWord].push(word);
    } else {
      anagrams[sortedWord] = [word];
    }
  }
  return Object.values(anagrams);
}

exports.groupAnagrams = groupAnagrams;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const words = ['yo', 'act', 'flop', 'tac', 'foo', 'cat', 'oy', 'olfp'];
  const expected = [['yo', 'oy'], ['flop', 'olfp'], ['act', 'tac', 'cat'], ['foo']];
  const output = program.groupAnagrams(words).map(anagramGroup => anagramGroup.sort());

  compare(expected, output);
});

function compare(expected, output) {
  chai.expect(output.length).to.deep.equal(expected.length);
  for (const group of expected) {
    chai.expect(output).to.deep.include(group.sort());
  }
}

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.groupAnagrams as groupAnagrams

class ProgramTest {
    @Test
    fun TestCase1() {
        val words = listOf("yo", "act", "flop", "tac", "foo", "cat", "oy", "olfp")
        val expected = listOf(
            listOf("yo", "oy"),
            listOf("flop", "olfp"),
            listOf("act", "tac", "cat"),
            listOf("foo")
        )
        val output = groupAnagrams(words)
        assert(compare(expected, output))
    }
}

fun compare(expected: List<List<String>>, output: List<List<String>>): Boolean {
    if (expected.size != output.size) return false
    for (eGroup in expected) {
        eGroup.toMutableList().sort()
        var found = false
        for (oGroup in output) {
            oGroup.toMutableList().sort()
            if (oGroup.equals(eGroup)) {
                found = true
                break
            }
        }
        if (!found) return false
    }
    return true
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(w * n * log(n) + n * w * log(w)) time | O(wn) space - where w is the number of words and
// n is the length of the longest word
fun groupAnagrams(words: List<String>): List<List<String>> {
    if (words.size == 0) return listOf()

    var sortedWords = mutableListOf<String>()
    for (word in words) {
        sortedWords.add(word.split("").sorted().joinToString(""))
    }
    var indices = List(words.size) { it }
    indices = indices.sortedWith(
        Comparator { a: Int, b: Int ->
            when {
                (sortedWords[a] > sortedWords[b]) -> 1
                (sortedWords[a] < sortedWords[b]) -> -1
                else -> 0
            }
        }
    )

    val result = mutableListOf<List<String>>()
    var currentAnagramGroup = mutableListOf<String>()
    var currentAnagram = sortedWords[indices[0]]
    for (index in indices) {
        val word = words[index]
        val sortedWord = sortedWords[index]

        if (sortedWord == currentAnagram) {
            currentAnagramGroup.add(word)
            continue
        }

        result.add(currentAnagramGroup)
        currentAnagramGroup = mutableListOf(word)
        currentAnagram = sortedWord
    }

    result.add(currentAnagramGroup)

    return result
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(w * n * log(n)) time | O(wn) space - where w is the number of words and n is the length of the longest word
fun groupAnagrams(words: List<String>): List<List<String>> {
    val anagrams = mutableMapOf<String, MutableList<String>>()
    for (word in words) {
        val wordChars = word.toCharArray()
        wordChars.sort()
        val sortedWord = wordChars.joinToString("")
        if (sortedWord in anagrams) {
            anagrams[sortedWord]!!.add(word)
        } else {
            anagrams[sortedWord] = mutableListOf(word)
        }
    }
    return anagrams.values.toList()
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.groupAnagrams as groupAnagrams

class ProgramTest {
    @Test
    fun TestCase1() {
        val words = listOf("yo", "act", "flop", "tac", "foo", "cat", "oy", "olfp")
        val expected = listOf(
            listOf("yo", "oy"),
            listOf("flop", "olfp"),
            listOf("act", "tac", "cat"),
            listOf("foo")
        )
        val output = groupAnagrams(words)
        assert(compare(expected, output))
    }
}

fun compare(expected: List<List<String>>, output: List<List<String>>): Boolean {
    if (expected.size != output.size) return false
    for (eGroup in expected) {
        eGroup.toMutableList().sort()
        var found = false
        for (oGroup in output) {
            oGroup.toMutableList().sort()
            if (oGroup.equals(eGroup)) {
                found = true
                break
            }
        }
        if (!found) return false
    }
    return true
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
      let words = ["yo", "act", "flop", "tac", "foo", "cat", "oy", "olfp"]
      let expected = [["yo", "oy"], ["flop", "olfp"], ["act", "tac", "cat"], ["foo"]]
      var output = program.groupAnagrams(words)
      try compare(expected, output)
    }
  }

  func compare(_ expected: [[String]], _ output: [[String]]) throws {
    try assertEqual(output.count, expected.count)

    var outputs = [String: Bool]()
    for group in output {
      outputs[group.sorted().joined(separator: ",")] = true
    }

    for group in expected {
      try assert(outputs[group.sorted().joined(separator: ",")] != nil)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(w * n * log(n) + n * w * log(w)) time | O(wn) space - where w is the number of words and
  // n is the length of the longest word
  func groupAnagrams(_ words: [String]) -> [[String]] {
    if words.count == 0 {
      return [[String]]()
    }

    var sortedWords = [String]()
    var indices = [Int]()
    for i in 0 ..< words.count {
      sortedWords.append(sortWord(words[i]))
      indices.append(i)
    }
    indices = indices.sorted {
      return sortedWords[$0] < sortedWords[$1]
    }

    var result = [[String]]()
    var currentAnagramGroup = [String]()
    var currentAnagram = sortedWords[indices[0]]
    for index in indices {
      let word = words[index]
      let sortedWord = sortedWords[index]
      if currentAnagramGroup.count == 0 {
        currentAnagramGroup.append(word)
        currentAnagram = sortedWord
        continue
      }

      if sortedWord == currentAnagram {
        currentAnagramGroup.append(word)
        continue
      }

      result.append(currentAnagramGroup)
      currentAnagramGroup = [word]
      currentAnagram = sortedWord
    }

    result.append(currentAnagramGroup)
    return result
  }

  func sortWord(_ word: String) -> String {
    return String(word.sorted())
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(w * n * log(n)) time | O(wn) space - where w is the number of words and
  // n is the length of the longest word
  func groupAnagrams(_ words: [String]) -> [[String]] {
    var anagrams = [String: [String]]()

    for word in words {
      let sortedWord = String(word.sorted())
      if var arr = anagrams[sortedWord] {
        arr.append(word)
        anagrams[sortedWord] = arr
        continue
      }
      anagrams[sortedWord] = [word]
    }

    var result = [[String]]()
    for group in anagrams {
      result.append(group.value)
    }
    return result
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let words = ["yo", "act", "flop", "tac", "foo", "cat", "oy", "olfp"]
      let expected = [["yo", "oy"], ["flop", "olfp"], ["act", "tac", "cat"], ["foo"]]
      var output = program.groupAnagrams(words)
      try compare(expected, output)
    }
  }

  func compare(_ expected: [[String]], _ output: [[String]]) throws {
    try assertEqual(output.count, expected.count)

    var outputs = [String: Bool]()
    for group in output {
      outputs[group.sorted().joined(separator: ",")] = true
    }

    for group in expected {
      try assert(outputs[group.sorted().joined(separator: ",")] != nil)
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
        words = ["yo", "act", "flop", "tac", "foo", "cat", "oy", "olfp"]
        expected = [["yo", "oy"], ["flop", "olfp"], ["act", "tac", "cat"], ["foo"]]
        output = list(map(lambda x: sorted(x), program.groupAnagrams(words)))

        self.compare(expected, output)

    def compare(self, expected, output):
        if len(expected) == 0:
            self.assertEqual(output, expected)
            return
        self.assertEqual(len(expected), len(output))
        for group in expected:
            self.assertTrue(sorted(group) in output)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(w * n * log(n) + n * w * log(w)) time | O(wn) space - where w is the number of words and
# n is the length of the longest word
def groupAnagrams(words):
    if len(words) == 0:
        return []

    sortedWords = ["".join(sorted(w)) for w in words]
    indices = [i for i in range(len(words))]
    indices.sort(key=lambda x: sortedWords[x])

    result = []
    currentAnagramGroup = []
    currentAnagram = sortedWords[indices[0]]
    for index in indices:
        word = words[index]
        sortedWord = sortedWords[index]

        if sortedWord == currentAnagram:
            currentAnagramGroup.append(word)
            continue

        result.append(currentAnagramGroup)
        currentAnagramGroup = [word]
        currentAnagram = sortedWord

    result.append(currentAnagramGroup)

    return result

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(w * n * log(n)) time | O(wn) space - where w is the number of words and
# n is the length of the longest word
def groupAnagrams(words):
    anagrams = {}
    for word in words:
        sortedWord = "".join(sorted(word))
        if sortedWord in anagrams:
            anagrams[sortedWord].append(word)
        else:
            anagrams[sortedWord] = [word]
    return list(anagrams.values())

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        words = ["yo", "act", "flop", "tac", "foo", "cat", "oy", "olfp"]
        expected = [["yo", "oy"], ["flop", "olfp"], ["act", "tac", "cat"], ["foo"]]
        output = list(map(lambda x: sorted(x), program.groupAnagrams(words)))

        self.compare(expected, output)

    def compare(self, expected, output):
        if len(expected) == 0:
            self.assertEqual(output, expected)
            return
        self.assertEqual(len(expected), len(output))
        for group in expected:
            self.assertTrue(sorted(group) in output)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const words = ['yo', 'act', 'flop', 'tac', 'foo', 'cat', 'oy', 'olfp'];
  const expected = [['yo', 'oy'], ['flop', 'olfp'], ['act', 'tac', 'cat'], ['foo']];
  const output = program.groupAnagrams(words).map(anagramGroup => anagramGroup.sort());

  compare(expected, output);
});

function compare(expected: string[][], output: string[][]) {
  chai.expect(output.length).to.deep.equal(expected.length);
  for (const group of expected) {
    chai.expect(output).to.deep.include(group.sort());
  }
}

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(w * n * log(n) + n * w * log(w)) time | O(wn) space - where w is the number of words and
// n is the length of the longest word
export function groupAnagrams(words: string[]) {
  if (words.length === 0) return [];

  const sortedWords = words.map(word => word.split('').sort().join(''));
  const indices = [...Array(words.length).keys()];
  indices.sort((a, b) => {
    if (sortedWords[a] < sortedWords[b]) return -1;
    if (sortedWords[a] > sortedWords[b]) return 1;
    return 0;
  });

  const result: string[][] = [];
  let currentAnagramGroup: string[] = [];
  let currentAnagram = sortedWords[indices[0]];
  for (const index of indices) {
    const word = words[index];
    const sortedWord = sortedWords[index];

    if (sortedWord === currentAnagram) {
      currentAnagramGroup.push(word);
      continue;
    }

    result.push(currentAnagramGroup);
    currentAnagramGroup = [word];
    currentAnagram = sortedWord;
  }

  result.push(currentAnagramGroup);

  return result;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(w * n * log(n)) time | O(wn) space - where w is the number of words and n is the length of the longest word
export function groupAnagrams(words: string[]) {
  const anagrams: {[key: string]: string[]} = {};
  for (const word of words) {
    const sortedWord = word.split('').sort().join('');
    if (sortedWord in anagrams) {
      anagrams[sortedWord].push(word);
    } else {
      anagrams[sortedWord] = [word];
    }
  }
  return Object.values(anagrams);
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const words = ['yo', 'act', 'flop', 'tac', 'foo', 'cat', 'oy', 'olfp'];
  const expected = [['yo', 'oy'], ['flop', 'olfp'], ['act', 'tac', 'cat'], ['foo']];
  const output = program.groupAnagrams(words).map(anagramGroup => anagramGroup.sort());

  compare(expected, output);
});

function compare(expected: string[][], output: string[][]) {
  chai.expect(output.length).to.deep.equal(expected.length);
  for (const group of expected) {
    chai.expect(output).to.deep.include(group.sort());
  }
}

```

