# Semordnilap
<div class="html">
<p>
  Write a function that takes in a list of unique strings and returns a list of
  semordnilap pairs.
</p>
<p>
  A semordnilap pair is defined as a set of different strings where the reverse
  of one word is the same as the forward version of the other. For example the
  words "diaper" and "repaid" are a semordnilap pair, as are the words
  "palindromes" and "semordnilap".
</p>
<p>
  The order of the returned pairs and the order of the strings within each pair
  does not matter.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">words</span> = ["diaper", "abc", "test", "cba", "repaid"]
</pre>
<h3>Sample Output</h3>
<pre>[["diaper", "repaid"], ["abc", "cba"]]</pre>
</div>

Hint 1
<p>
  It can be helpful to convert the input array into a set, so that you can
  check if a word exists in the list in constant time.
</p>


Hint 2

<p>
  After creating the set of words, try iterating through the original array. For
  each word, can you check if its semordnilap pair is in the word list?
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
      vector<string> input = {"desserts", "stressed", "hello"};
      vector<vector<string>> expected = {{"desserts", "stressed"}};
      auto actual = semordnilap(input);
      assert(expected == actual);
    });
  }
};


```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <unordered_set>
#include <algorithm>
using namespace std;

// O(n * m) time | O(n * m) space - where n is the number of words and
// m is the length of the longest word
vector<vector<string>> semordnilap(vector<string> words) {
  unordered_set<string> wordsSet(words.begin(), words.end());
  vector<vector<string>> semordnilapPairs;

  for (string word : words) {
    string reversedWord = word;
    reverse(reversedWord.begin(), reversedWord.end());
    if (wordsSet.find(reversedWord) != wordsSet.end() && reversedWord != word) {
      semordnilapPairs.push_back({word, reversedWord});
      wordsSet.erase(word);
      wordsSet.erase(reversedWord);
    }
  }

  return semordnilapPairs;
}


```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<string> input = {"desserts", "stressed", "hello"};
      vector<vector<string>> expected = {{"desserts", "stressed"}};
      auto actual = semordnilap(input);
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
		var input = new string[] {"desserts", "stressed", "hello"};
		List<List<string> > expected = new List<List<string> >();
		List<string> pair = new List<string> {
			"desserts", "stressed"
		};
		expected.Add(pair);
		var actual = new Program().Semordnilap(input);
		Utils.AssertTrue(expected.Count == actual.Count);
		for (var i = 0; i < expected.Count; i++) {
			Utils.AssertTrue(Enumerable.SequenceEqual(expected[i], actual[i]));
		}
	}
}


```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System.Text;
using System;


public class Program {
	// O(n * m) time | O(n * m) space - where n is the number of words and
	// m is the length of the longest word
	public List<List<string> > Semordnilap(string[] words) {
		HashSet<string> wordsSet = new HashSet<string>(words);
		List<List<string> > semordnilapPairs = new List<List<string> >();

		foreach (var word in words) {
			char[] chars = word.ToCharArray();
			Array.Reverse(chars);
			string reverse = new string(chars);
			if (wordsSet.Contains(reverse) && !reverse.Equals(word)) {
				List<string> semordnilapPair = new List<string> {
					word, reverse
				};
				semordnilapPairs.Add(semordnilapPair);
				wordsSet.Remove(word);
				wordsSet.Remove(reverse);
			}
		}

		return semordnilapPairs;
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
		var input = new string[] {"desserts", "stressed", "hello"};
		List<List<string> > expected = new List<List<string> >();
		List<string> pair = new List<string> {
			"desserts", "stressed"
		};
		expected.Add(pair);
		var actual = new Program().Semordnilap(input);
		Utils.AssertTrue(expected.Count == actual.Count);
		for (var i = 0; i < expected.Count; i++) {
			Utils.AssertTrue(Enumerable.SequenceEqual(expected[i], actual[i]));
		}
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
	input := []string{"desserts", "stressed", "hello"}
	expected := [][]string{{"desserts", "stressed"}}
	actual := Semordnilap(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n * m) time | O(n * m) space - where n is the number of words and
// m is the length of the longest word
func Semordnilap(words []string) [][]string {
	wordSet := map[string]bool{}
	for _, word := range words {
		wordSet[word] = true
	}

	semordnilapPairs := [][]string{}
	for _, word := range words {
		reverse := reverse(word)
		if _, reverseInSet := wordSet[reverse]; reverseInSet && reverse != word {
			semordnilapPairs = append(semordnilapPairs, []string{word, reverse})
			delete(wordSet, word)
			delete(wordSet, reverse)
		}
	}
	return semordnilapPairs
}

func reverse(s string) string {
	reversed := []byte{}
	for i := len(s) - 1; i >= 0; i-- {
		reversed = append(reversed, s[i])
	}
	return string(reversed)
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []string{"desserts", "stressed", "hello"}
	expected := [][]string{{"desserts", "stressed"}}
	actual := Semordnilap(input)
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
    var input = new String[] {"desserts", "stressed", "hello"};
    ArrayList<ArrayList<String>> expected = new ArrayList<ArrayList<String>>();
    ArrayList<String> pair = new ArrayList<String>();
    pair.add("desserts");
    pair.add("stressed");
    expected.add(pair);
    var actual = new Program().semordnilap(input);
    Utils.assertTrue(expected.equals(actual));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n * m) time | O(n * m) space - where n is the number of words and
  // m is the length of the longest word
  public ArrayList<ArrayList<String>> semordnilap(String[] words) {
    HashSet<String> wordsSet = new HashSet<String>(Arrays.asList(words));
    ArrayList<ArrayList<String>> semordnilapPairs = new ArrayList<ArrayList<String>>();

    for (String word : words) {
      String reverse = new StringBuilder(word).reverse().toString();
      if (wordsSet.contains(reverse) && !reverse.equals(word)) {
        ArrayList<String> semordnilapPair = new ArrayList<String>();
        semordnilapPair.add(word);
        semordnilapPair.add(reverse);
        semordnilapPairs.add(semordnilapPair);
        wordsSet.remove(word);
        wordsSet.remove(reverse);
      }
    }

    return semordnilapPairs;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    var input = new String[] {"desserts", "stressed", "hello"};
    ArrayList<ArrayList<String>> expected = new ArrayList<ArrayList<String>>();
    ArrayList<String> pair = new ArrayList<String>();
    pair.add("desserts");
    pair.add("stressed");
    expected.add(pair);
    var actual = new Program().semordnilap(input);
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
  const input = ['desserts', 'stressed', 'hello'];
  const expected = [['desserts', 'stressed']];
  const actual = program.semordnilap(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n * m) time | O(n * m) space - where n is the number of words and
// m is the length of the longest word
function semordnilap(words) {
  const wordsSet = new Set(words);
  const semordnilapPairs = [];

  for (const word of words) {
    const reverse = word.split('').reverse().join('');
    if (wordsSet.has(reverse) && reverse !== word) {
      semordnilapPairs.push([word, reverse]);
      wordsSet.delete(word);
      wordsSet.delete(reverse);
    }
  }

  return semordnilapPairs;
}

// Do not edit the line below.
exports.semordnilap = semordnilap;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = ['desserts', 'stressed', 'hello'];
  const expected = [['desserts', 'stressed']];
  const actual = program.semordnilap(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.semordnilap

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf("desserts", "stressed", "hello")
        val expected = listOf(listOf("desserts", "stressed"))
        val output = semordnilap(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n * m) time | O(n * m) space - where n is the number of words and
// m is the length of the longest word
fun semordnilap(words: List<String>): List<List<String>> {
    val wordsSet = words.toMutableSet()
    val semordnilapPairs = mutableListOf<List<String>>()

    for (word in words) {
        val reverse = word.reversed()
        if (wordsSet.contains(reverse) && reverse != word) {
            semordnilapPairs.add(listOf(word, reverse))
            wordsSet.remove(word)
            wordsSet.remove(reverse)
        }
    }

    return semordnilapPairs
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.semordnilap

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf("desserts", "stressed", "hello")
        val expected = listOf(listOf("desserts", "stressed"))
        val output = semordnilap(input)
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
      var input = ["desserts", "stressed", "hello"]
      var expected = [["desserts", "stressed"]]
      var actual = Program().semordnilap(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n * m) time | O(n * m) space - where n is the number of words and
  // m is the length of the longest word
  func semordnilap(_ words: [String]) -> [[String]] {
    var wordSet = Set<String>()
    for word in words {
      wordSet.insert(word)
    }

    var semordnilapPairs = [[String]]()
    for word in words {
      let reverse = String(word.reversed())
      if wordSet.contains(reverse) && reverse != word {
        semordnilapPairs.append([word, reverse])
        wordSet.remove(word)
        wordSet.remove(reverse)
      }
    }
    return semordnilapPairs
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws in
      var input = ["desserts", "stressed", "hello"]
      var expected = [["desserts", "stressed"]]
      var actual = Program().semordnilap(input)
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
        input = ["desserts", "stressed", "hello"]
        expected = [["desserts", "stressed"]]
        actual = program.semordnilap(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n * m) time | O(n * m) space - where n is the number of words and
# m is the length of the longest word
def semordnilap(words):
    wordsSet = set(words)
    semordnilapPairs = []

    for word in words:
        reverse = word[::-1]
        if reverse in wordsSet and reverse != word:
            semordnilapPairs.append([word, reverse])
            wordsSet.remove(word)
            wordsSet.remove(reverse)

    return semordnilapPairs

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = ["desserts", "stressed", "hello"]
        expected = [["desserts", "stressed"]]
        actual = program.semordnilap(input)
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
  const input = ['desserts', 'stressed', 'hello'];
  const expected = [['desserts', 'stressed']];
  const actual = program.semordnilap(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n * m) time | O(n * m) space - where n is the number of words and
// m is the length of the longest word
export function semordnilap(words: string[]) {
  const wordsSet = new Set(words);
  const semordnilapPairs: [string, string][] = [];

  for (const word of words) {
    const reverse = word.split('').reverse().join('');
    if (wordsSet.has(reverse) && reverse !== word) {
      semordnilapPairs.push([word, reverse]);
      wordsSet.delete(word);
      wordsSet.delete(reverse);
    }
  }

  return semordnilapPairs;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = ['desserts', 'stressed', 'hello'];
  const expected = [['desserts', 'stressed']];
  const actual = program.semordnilap(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

