# Minimum Characters For Words
<div class="html">
<p>
  Write a function that takes in an array of words and returns the smallest
  array of characters needed to form all of the words. The characters don't need
  to be in any particular order.
</p>
<p>
  For example, the characters <span>["y", "r", "o", "u"]</span> are needed to
  form the words <span>["your", "you", "or", "yo"]</span>.
</p>
<p>
  Note: the input words won't contain any spaces; however, they might contain
  punctuation and/or special characters.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">words</span> = ["this", "that", "did", "deed", "them!", "a"]
</pre>
<h3>Sample Output</h3>
<pre>
["t", "t", "h", "i", "s", "a", "d", "d", "e", "e", "m", "!"]
<span class="CodeEditor-promptComment">// The characters could be ordered differently.</span>
</pre>
</div>

Hint 1
<p>
  There are a few different ways to solve this problem, but all of them use the
  same general approach. You'll need to determine not only all of the unique
  characters required to form the input words, but also their required
  frequencies. What determines the required frequencies of characters to form
  multiple words?
</p>


Hint 2

<p>
  The word that contains the highest frequency of any character dictates how
  many of those characters are required. For example, given
  <span>words = ["A", "AAAA"]</span> you need 4 <span>A</span>s, because the
  word that contains the most of amount of <span>A</span>s has 4.
</p>


Hint 3

<p>
  Use a hash table to keep track of the maximum frequencies of all unique
  characters that occur across all words. Count the frequency of each character
  in each word, and use those per-word frequencies to update your
  maximum-character-frequency hash table. Once you've determined the maximum
  frequency of each character across all words, you can use the built-up hash
  table to generate your output array.
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
      vector<string> input = {"this", "that", "did", "deed", "them!", "a"};
      vector<char> expected = {'t', 't', 'h', 'i', 's', 'a',
                               'd', 'd', 'e', 'e', 'm', '!'};
      auto actual = minimumCharactersForWords(input);
      sort(actual.begin(), actual.end());
      sort(expected.begin(), expected.end());
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

unordered_map<char, int> countCharacterFrequencies(const string &string);
void updateMaximumFrequencies(const unordered_map<char, int> &frequencies,
                              unordered_map<char, int> &maximumFrequencies);
vector<char> makeArrayFromCharacterFrequencies(
    const unordered_map<char, int> &characterFrequencies);

// O(n * l) time | O(c) space - where n is the number of words,
// l is the length of the longest word, and c is the number of
// unique characters across all words
// See notes under video explanation for details about the space complexity.
vector<char> minimumCharactersForWords(vector<string> words) {
  unordered_map<char, int> maximumCharacterFrequencies;

  for (auto const &word : words) {
    auto characterFrequencies = countCharacterFrequencies(word);
    updateMaximumFrequencies(characterFrequencies, maximumCharacterFrequencies);
  }

  return makeArrayFromCharacterFrequencies(maximumCharacterFrequencies);
}

unordered_map<char, int> countCharacterFrequencies(const string &string) {
  unordered_map<char, int> characterFrequencies;

  for (auto character : string) {
    if (characterFrequencies.find(character) == characterFrequencies.end()) {
      characterFrequencies[character] = 0;
    }

    characterFrequencies[character] += 1;
  }

  return characterFrequencies;
}

void updateMaximumFrequencies(const unordered_map<char, int> &frequencies,
                              unordered_map<char, int> &maximumFrequencies) {
  for (const auto &[character, frequency] : frequencies) {
    if (maximumFrequencies.find(character) != maximumFrequencies.end()) {
      maximumFrequencies[character] =
          max(frequency, maximumFrequencies[character]);
    } else {
      maximumFrequencies[character] = frequency;
    }
  }
}

vector<char> makeArrayFromCharacterFrequencies(
    const unordered_map<char, int> &characterFrequencies) {
  vector<char> characters;

  for (const auto &[character, frequency] : characterFrequencies) {
    for (int idx = 0; idx < frequency; idx++) {
      characters.push_back(character);
    }
  }

  return characters;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<string> input = {"this", "that", "did", "deed", "them!", "a"};
      vector<char> expected = {'t', 't', 'h', 'i', 's', 'a',
                               'd', 'd', 'e', 'e', 'm', '!'};
      auto actual = minimumCharactersForWords(input);
      sort(actual.begin(), actual.end());
      sort(expected.begin(), expected.end());
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

using System;
using System.Linq;


public class ProgramTest {

	[Test]
	public void TestCase1() {
		string[] words = new string[] { "this", "that", "did", "deed", "them!", "a" };
		char[] expected =
		  new char[] { 't', 't', 'h', 'i', 's', 'a', 'd', 'd', 'e', 'e', 'm', '!' };
		var actual = new Program().MinimumCharactersForWords(words);
		Utils.AssertTrue(expected.SequenceEqual(actual));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {

	// O(n * l) time | O(c) space - where n is the number of words,
	// l is the length of the longest word, and c is the number of
	// unique characters across all words
	// See notes under video explanation for details about the space complexity.
	public char[] MinimumCharactersForWords(string[] words) {
		Dictionary<char, int> maximumCharFrequencies = new Dictionary<char, int>();

		foreach (var word in words) {
			Dictionary<char, int> characterFrequencies = countCharFrequencies(word);
			updateMaximumFrequencies(characterFrequencies, maximumCharFrequencies);
		}

		return makeArrayFromCharFrequencies(maximumCharFrequencies);
	}

	public Dictionary<char, int> countCharFrequencies(string str) {
		Dictionary<char, int> characterFrequencies = new Dictionary<char, int>();

		foreach (var character in str.ToCharArray()) {
			characterFrequencies[character] = characterFrequencies.GetValueOrDefault(
				character, 0) + 1;
		}

		return characterFrequencies;
	}

	public void updateMaximumFrequencies(Dictionary<char, int> frequencies,
	  Dictionary<char, int> maximumFrequencies) {

		foreach (var frequency in frequencies) {
			char character = frequency.Key;
			int characterFrequency = frequency.Value;

			if (maximumFrequencies.ContainsKey(character)) {
				maximumFrequencies[character] = Math.Max(characterFrequency,
				    maximumFrequencies[
					    character]);
			} else {
				maximumFrequencies[character] = characterFrequency;
			}
		}

	}

	public char[] makeArrayFromCharFrequencies(Dictionary<char, int> characterFrequencies) {
		List<char> characters = new List<char>();

		foreach (var frequency in characterFrequencies) {
			char character = frequency.Key;
			int characterFrequency = frequency.Value;

			for (int idx = 0; idx < characterFrequency; idx++) {
				characters.Add(character);
			}
		}

		char[] charactersArray = new char[characters.Count];
		for (int idx = 0; idx < characters.Count; idx++) {
			charactersArray[idx] = characters[idx];
		}

		return charactersArray;
	}

}

```
### Unit Tests 1 (csharp)
```csharp
using System;
using System.Linq;


public class ProgramTest {

	[Test]
	public void TestCase1() {
		string[] words = new string[] { "this", "that", "did", "deed", "them!", "a" };
		char[] expected =
		  new char[] { 't', 't', 'h', 'i', 's', 'a', 'd', 'd', 'e', 'e', 'm', '!' };
		var actual = new Program().MinimumCharactersForWords(words);
		Utils.AssertTrue(expected.SequenceEqual(actual));
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
	input := []string{"this", "that", "did", "deed", "them!", "a"}
	expected := []string{"t", "t", "h", "i", "s", "a", "d", "d", "e", "e", "m", "!"}
	actual := MinimumCharactersForWords(input)
	sort.Strings(actual)
	sort.Strings(expected)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n * l) time | O(c) space - where n is the number of words,
// l is the length of the longest word, and c is the number of
// unique characters across all words
// See notes under video explanation for details about the space complexity.
func MinimumCharactersForWords(words []string) []string {
	maximumCharacterFrequencies := map[rune]int{}

	for _, word := range words {
		characterFrequencies := countCharacterFrequencies(word)
		updateMaximumFrequencies(characterFrequencies, maximumCharacterFrequencies)
	}

	return makeArrayFromCharacterFrequencies(maximumCharacterFrequencies)
}

func countCharacterFrequencies(str string) map[rune]int {
	characterFrequencies := map[rune]int{}
	for _, character := range str {
		characterFrequencies[character] += 1
	}
	return characterFrequencies
}

func updateMaximumFrequencies(frequencies map[rune]int, maximumFrequencies map[rune]int) {
	for character, frequency := range frequencies {
		if maxFrequency, found := maximumFrequencies[character]; found {
			maximumFrequencies[character] = max(frequency, maxFrequency)
		} else {
			maximumFrequencies[character] = frequency
		}
	}
}

func makeArrayFromCharacterFrequencies(characterFrequencies map[rune]int) []string {
	characters := make([]string, 0)
	for character, frequency := range characterFrequencies {
		for i := 0; i < frequency; i++ {
			characters = append(characters, string(character))
		}
	}
	return characters
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
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
	input := []string{"this", "that", "did", "deed", "them!", "a"}
	expected := []string{"t", "t", "h", "i", "s", "a", "d", "d", "e", "e", "m", "!"}
	actual := MinimumCharactersForWords(input)
	sort.Strings(actual)
	sort.Strings(expected)
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
    String[] words = new String[] {"this", "that", "did", "deed", "them!", "a"};
    char[] expected = new char[] {'t', 't', 'h', 'i', 's', 'a', 'd', 'd', 'e', 'e', 'm', '!'};
    var actual = new Program().minimumCharactersForWords(words);
    assert (expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n * l) time | O(c) space - where n is the number of words,
  // l is the length of the longest word, and c is the number of
  // unique characters across all words
  // See notes under video explanation for details about the space complexity.
  public char[] minimumCharactersForWords(String[] words) {
    HashMap<Character, Integer> maximumCharacterFrequencies = new HashMap<Character, Integer>();

    for (String word : words) {
      HashMap<Character, Integer> characterFrequencies = countCharacterFrequencies(word);
      updateMaximumFrequencies(characterFrequencies, maximumCharacterFrequencies);
    }

    return makeArrayFromCharacterFrequencies(maximumCharacterFrequencies);
  }

  public HashMap<Character, Integer> countCharacterFrequencies(String string) {
    HashMap<Character, Integer> characterFrequencies = new HashMap<Character, Integer>();

    for (char character : string.toCharArray()) {
      characterFrequencies.put(character, characterFrequencies.getOrDefault(character, 0) + 1);
    }

    return characterFrequencies;
  }

  public void updateMaximumFrequencies(
      HashMap<Character, Integer> frequencies, HashMap<Character, Integer> maximumFrequencies) {

    for (Map.Entry<Character, Integer> frequency : frequencies.entrySet()) {
      char character = frequency.getKey();
      int characterFrequency = frequency.getValue();

      if (maximumFrequencies.containsKey(character)) {
        maximumFrequencies.put(
            character, Math.max(characterFrequency, maximumFrequencies.get(character)));
      } else {
        maximumFrequencies.put(character, characterFrequency);
      }
    }
  }

  public char[] makeArrayFromCharacterFrequencies(
      HashMap<Character, Integer> characterFrequencies) {
    ArrayList<Character> characters = new ArrayList<Character>();

    for (Map.Entry<Character, Integer> frequency : characterFrequencies.entrySet()) {
      char character = frequency.getKey();
      int characterFrequency = frequency.getValue();

      for (int idx = 0; idx < characterFrequency; idx++) {
        characters.add(character);
      }
    }

    char[] charactersArray = new char[characters.size()];
    for (int idx = 0; idx < characters.size(); idx++) {
      charactersArray[idx] = characters.get(idx);
    }

    return charactersArray;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {

  @Test
  public void TestCase1() {
    String[] words = new String[] {"this", "that", "did", "deed", "them!", "a"};
    char[] expected = new char[] {'t', 't', 'h', 'i', 's', 'a', 'd', 'd', 'e', 'e', 'm', '!'};
    var actual = new Program().minimumCharactersForWords(words);
    assert (expected == actual);
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
  const input = ['this', 'that', 'did', 'deed', 'them!', 'a'];
  const expected = ['t', 't', 'h', 'i', 's', 'a', 'd', 'd', 'e', 'e', 'm', '!'];
  const actual = program.minimumCharactersForWords(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n * l) time | O(c) space - where n is the number of words,
// l is the length of the longest word, and c is the number of
// unique characters across all words
// See notes under video explanation for details about the space complexity.
function minimumCharactersForWords(words) {
  const maximumCharacterFrequencies = {};

  for (const word of words) {
    const characterFrequencies = countCharacterFrequencies(word);
    updateMaximumFrequencies(characterFrequencies, maximumCharacterFrequencies);
  }

  return makeArrayFromCharacterFrequencies(maximumCharacterFrequencies);
}

function countCharacterFrequencies(string) {
  const characterFrequencies = {};

  for (const character of string) {
    if (!(character in characterFrequencies)) {
      characterFrequencies[character] = 0;
    }

    characterFrequencies[character] += 1;
  }

  return characterFrequencies;
}

function updateMaximumFrequencies(frequencies, maximumFrequencies) {
  for (const character in frequencies) {
    const frequency = frequencies[character];

    if (character in maximumFrequencies) {
      maximumFrequencies[character] = Math.max(frequency, maximumFrequencies[character]);
    } else {
      maximumFrequencies[character] = frequency;
    }
  }
}

function makeArrayFromCharacterFrequencies(characterFrequencies) {
  const characters = [];

  for (const character in characterFrequencies) {
    const frequency = characterFrequencies[character];

    for (let idx = 0; idx < frequency; idx++) {
      characters.push(character);
    }
  }

  return characters;
}

// Do not edit the line below.
exports.minimumCharactersForWords = minimumCharactersForWords;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = ['this', 'that', 'did', 'deed', 'them!', 'a'];
  const expected = ['t', 't', 'h', 'i', 's', 'a', 'd', 'd', 'e', 'e', 'm', '!'];
  const actual = program.minimumCharactersForWords(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.minimumCharactersForWords

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf("this", "that", "did", "deed", "them!", "a")
        val expected = listOf('t', 't', 'h', 'i', 's', 'a', 'd', 'd', 'e', 'e', 'm', '!')
        val output = minimumCharactersForWords(input)
        assert(expected.sorted() == output.sorted())
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(n * l) time | O(c) space - where n is the number of words, 
// l is the length of the longest word, and c is the number of 
// unique characters across all words
// See notes under video explanation for details about the space complexity.
fun minimumCharactersForWords(words: List<String>): List<Char> {
    val maximumCharacterFrequencies = mutableMapOf<Char, Int>()

    for (word in words) {
        val characterFrequencies = countCharacterFrequencies(word)
        updateMaximumFrequencies(characterFrequencies, maximumCharacterFrequencies)
    }

    return makeArrayFromCharacterFrequencies(maximumCharacterFrequencies)
}

fun countCharacterFrequencies(string: String): Map<Char, Int> {
    val characterFrequencies = mutableMapOf<Char, Int>()
    for (character in string) {
        characterFrequencies[character] = characterFrequencies.getOrDefault(character, 0) + 1
    }

    return characterFrequencies
}

fun updateMaximumFrequencies(frequencies: Map<Char, Int>, maximumFrequencies: MutableMap<Char, Int>) {
    for ((character, frequency) in frequencies) {
        if (character in maximumFrequencies) {
            maximumFrequencies[character] = max(frequency, maximumFrequencies[character]!!)
        } else {
            maximumFrequencies[character] = frequency
        }
    }
}

fun makeArrayFromCharacterFrequencies(characterFrequencies: Map<Char, Int>): List<Char> {
    val characters = mutableListOf<Char>()

    for ((character, frequency) in characterFrequencies) {
        for (i in 0 until frequency) {
            characters.add(character)
        }
    }

    return characters
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.minimumCharactersForWords

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf("this", "that", "did", "deed", "them!", "a")
        val expected = listOf('t', 't', 'h', 'i', 's', 'a', 'd', 'd', 'e', 'e', 'm', '!')
        val output = minimumCharactersForWords(input)
        assert(expected.sorted() == output.sorted())
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
    runTest("Test Case 1") { () throws -> Void in
      var input = ["this", "that", "did", "deed", "them!", "a"]
      var expected = ["t", "t", "h", "i", "s", "a", "d", "d", "e", "e", "m", "!"]
      var actual = Program().minimumCharactersForWords(input)
      try assertEqual(expected.sorted(), actual.sorted())
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n * l) time | O(c) space - where n is the number of words,
  // l is the length of the longest word, and c is the number of
  // unique characters across all words
  // See notes under video explanation for details about the space complexity.
  func minimumCharactersForWords(_ words: [String]) -> [String] {
    var maximumCharacterFrequencies = [Character: Int]()

    for word in words {
      let characterFrequencies = countCharacterFrequencies(word)
      updateMaximumFrequencies(characterFrequencies, &maximumCharacterFrequencies)
    }

    return makeArrayFromCharacterFrequencies(maximumCharacterFrequencies)
  }

  func countCharacterFrequencies(_ str: String) -> [Character: Int] {
    var characterFrequencies = [Character: Int]()
    for character in str {
      if characterFrequencies[character] == nil {
        characterFrequencies[character] = 0
      }
      characterFrequencies[character]! += 1
    }
    return characterFrequencies
  }

  func updateMaximumFrequencies(_ frequencies: [Character: Int], _ maximumFrequencies: inout [Character: Int]) {
    for (character, frequency) in frequencies {
      if maximumFrequencies[character] != nil {
        maximumFrequencies[character] = max(frequency, maximumFrequencies[character]!)
      } else {
        maximumFrequencies[character] = frequency
      }
    }
  }

  func makeArrayFromCharacterFrequencies(_ characterFrequencies: [Character: Int]) -> [String] {
    var characters = [String]()
    for (character, frequency) in characterFrequencies {
      for i in stride(from: 0, to: frequency, by: 1) {
        characters.append(String(character))
      }
    }
    return characters
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = ["this", "that", "did", "deed", "them!", "a"]
      var expected = ["t", "t", "h", "i", "s", "a", "d", "d", "e", "e", "m", "!"]
      var actual = Program().minimumCharactersForWords(input)
      try assertEqual(expected.sorted(), actual.sorted())
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
        input = ["this", "that", "did", "deed", "them!", "a"]
        expected = ["t", "t", "h", "i", "s", "a", "d", "d", "e", "e", "m", "!"]
        actual = program.minimumCharactersForWords(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n * l) time | O(c) space - where n is the number of words,
# l is the length of the longest word, and c is the number of
# unique characters across all words
# See notes under video explanation for details about the space complexity.
def minimumCharactersForWords(words):
    maximumCharacterFrequencies = {}

    for word in words:
        characterFrequencies = countCharacterFrequencies(word)
        updateMaximumFrequencies(characterFrequencies, maximumCharacterFrequencies)

    return makeArrayFromCharacterFrequencies(maximumCharacterFrequencies)


def countCharacterFrequencies(string):
    characterFrequencies = {}

    for character in string:
        if character not in characterFrequencies:
            characterFrequencies[character] = 0

        characterFrequencies[character] += 1

    return characterFrequencies


def updateMaximumFrequencies(frequencies, maximumFrequencies):
    for character in frequencies:
        frequency = frequencies[character]

        if character in maximumFrequencies:
            maximumFrequencies[character] = max(frequency, maximumFrequencies[character])
        else:
            maximumFrequencies[character] = frequency


def makeArrayFromCharacterFrequencies(characterFrequencies):
    characters = []

    for character in characterFrequencies:
        frequency = characterFrequencies[character]

        for _ in range(frequency):
            characters.append(character)

    return characters

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = ["this", "that", "did", "deed", "them!", "a"]
        expected = ["t", "t", "h", "i", "s", "a", "d", "d", "e", "e", "m", "!"]
        actual = program.minimumCharactersForWords(input)
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
  const input = ['this', 'that', 'did', 'deed', 'them!', 'a'];
  const expected = ['t', 't', 'h', 'i', 's', 'a', 'd', 'd', 'e', 'e', 'm', '!'];
  const actual = program.minimumCharactersForWords(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

interface CharacterFrequencies {
  [character: string]: number;
}

// O(n * l) time | O(c) space - where n is the number of words,
// l is the length of the longest word, and c is the number of
// unique characters across all words
// See notes under video explanation for details about the space complexity.
export function minimumCharactersForWords(words: string[]) {
  const maximumCharacterFrequencies: CharacterFrequencies = {};

  for (const word of words) {
    const characterFrequencies = countCharacterFrequencies(word);
    updateMaximumFrequencies(characterFrequencies, maximumCharacterFrequencies);
  }

  return makeArrayFromCharacterFrequencies(maximumCharacterFrequencies);
}

function countCharacterFrequencies(string: string) {
  const characterFrequencies: CharacterFrequencies = {};

  for (const character of string) {
    if (!(character in characterFrequencies)) {
      characterFrequencies[character] = 0;
    }

    characterFrequencies[character] += 1;
  }

  return characterFrequencies;
}

function updateMaximumFrequencies(frequencies: CharacterFrequencies, maximumFrequencies: CharacterFrequencies) {
  for (const character in frequencies) {
    const frequency = frequencies[character];

    if (character in maximumFrequencies) {
      maximumFrequencies[character] = Math.max(frequency, maximumFrequencies[character]);
    } else {
      maximumFrequencies[character] = frequency;
    }
  }
}

function makeArrayFromCharacterFrequencies(characterFrequencies: CharacterFrequencies) {
  const characters: string[] = [];

  for (const character in characterFrequencies) {
    const frequency = characterFrequencies[character];

    for (let idx = 0; idx < frequency; idx++) {
      characters.push(character);
    }
  }

  return characters;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = ['this', 'that', 'did', 'deed', 'them!', 'a'];
  const expected = ['t', 't', 'h', 'i', 's', 'a', 'd', 'd', 'e', 'e', 'm', '!'];
  const actual = program.minimumCharactersForWords(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

