# Common Characters
<div class="html">
  <p>
    Write a function that takes in a non-empty list of non-empty strings and
    returns a list of characters that are common to all strings in the list,
    ignoring multiplicity.
  </p>

  <p>
    Note that the strings are not guaranteed to only contain alphanumeric characters. The list
    you return can be in any order.
  </p>

  <h3>Sample Input</h3>
  <pre>
<span class="CodeEditor-promptParameter">strings</span> = ["abc", "bcd", "cbaccd"]
</pre>
  <h3>Sample Output</h3>
  <pre>
["b", "c"] <span class="CodeEditor-promptComment">// The characters could be ordered differently.</span>
</pre>
</div>

Hint 1
<p>
  What data structure could be helpful to remember characters we've seen and
  how many strings contained those characters?
</p>


Hint 2

<p>
  We can use a map to keep track of the characters we have seen and how many strings
  we have seen them in. If a character is seen <span>len(strings)</span> times, then
  it must be in every string.
</p>


Hint 3

<p>
  Converting a string to a set can quickly get all of the unique characters from
  that string, which can be helpful since we are ignoring multiplicity in this
  problem.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

#include <algorithm>

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<string> input = {"abc", "bcd", "cbad"};
      vector<string> expected = {"b", "c"};
      auto actual = commonCharacters(input);
      sort(expected.begin(), expected.end());
      sort(actual.begin(), actual.end());
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <unordered_map>
#include <unordered_set>

using namespace std;

// O(n * m) time | O(c) space - where n is the number of strings, m is the
// length of the longest string, and c is the number of unique characters across
// all strings
vector<string> commonCharacters(vector<string> strings) {
  unordered_map<char, int> characterCounts;
  for (auto const &str : strings) {
    unordered_set<char> uniqueStringCharacters;
    for (int i = 0; i < str.length(); i++) {
      uniqueStringCharacters.insert(str[i]);
    }
    for (auto character : uniqueStringCharacters) {
      if (!characterCounts.count(character)) {
        characterCounts[character] = 0;
      }
      characterCounts[character]++;
    }
  }

  vector<char> finalCharacters;
  for (auto const &characterCount : characterCounts) {
    char character = characterCount.first;
    int count = characterCount.second;
    if (count == strings.size()) {
      finalCharacters.push_back(character);
    }
  }

  vector<string> finalCharactersArr;
  for (auto character : finalCharacters) {
    finalCharactersArr.push_back(string(1, character));
  }
  return finalCharactersArr;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <unordered_map>
#include <unordered_set>

using namespace std;

string getSmallestString(const vector<string> &strings);
void removeNonexistentCharacters(
    const string string, unordered_set<char> &potentialCommonCharacters);

// O(n * m) time | O(m) space - where n is the number of strings, and m is the
// length of the longest string
vector<string> commonCharacters(vector<string> strings) {
  string smallestString = getSmallestString(strings);
  unordered_set<char> potentialCommonCharacters;
  for (int i = 0; i < smallestString.length(); i++) {
    potentialCommonCharacters.insert(smallestString[i]);
  }

  for (auto const &string : strings) {
    removeNonexistentCharacters(string, potentialCommonCharacters);
  }

  vector<string> output;
  for (auto character : potentialCommonCharacters) {
    output.push_back(string(1, character));
  }

  return output;
}

string getSmallestString(const vector<string> &strings) {
  string smallestString = strings[0];
  for (auto const &string : strings) {
    if (string.length() < smallestString.length()) {
      smallestString = string;
    }
  }
  return smallestString;
}

void removeNonexistentCharacters(
    const string string, unordered_set<char> &potentialCommonCharacters) {
  unordered_set<char> uniqueStringCharacters;
  for (int i = 0; i < string.length(); i++) {
    uniqueStringCharacters.insert(string[i]);
  }

  unordered_set<char> charactersToRemove;
  for (auto character : potentialCommonCharacters) {
    if (!uniqueStringCharacters.count(character)) {
      charactersToRemove.insert(character);
    }
  }
  for (auto character : charactersToRemove) {
    potentialCommonCharacters.erase(character);
  }
}

```
### Unit Tests 1 (cpp)
```cpp
#include <algorithm>

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<string> input = {"abc", "bcd", "cbad"};
      vector<string> expected = {"b", "c"};
      auto actual = commonCharacters(input);
      sort(expected.begin(), expected.end());
      sort(actual.begin(), actual.end());
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


public class ProgramTest {
	[Test]
	public void TestCase1() {
		string[] input = new string[] {"abc", "bcd", "cbad"};
		string[] expected = new string[] {"b", "c"};
		string[] actual = new Program().CommonCharacters(input);
		Array.Sort(actual);
		Utils.AssertTrue(expected.Length == actual.Length);
		for (int i = 0; i < actual.Length; i++) {
			Utils.AssertTrue(expected[i].Equals(actual[i]));
		}
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {
	// O(n * m) time | O(c) space - where n is the number of strings, m is the
	// length of the longest string, and c is the number of unique characters across
	// all strings
	public string[] CommonCharacters(string[] strings) {
		Dictionary<char, int> characterCounts = new Dictionary<char, int>();
		foreach (var str in strings) {
			HashSet<char> uniqueStringChars = new HashSet<char>();
			for (int i = 0; i < str.Length; i++) {
				uniqueStringChars.Add(str[i]);
			}

			foreach (var character in uniqueStringChars) {
				if (!characterCounts.ContainsKey(character)) {
					characterCounts[character] = 0;
				}
				characterCounts[character] = characterCounts[character] + 1;
			}
		}

		List<char> finalChars = new List<char>();
		foreach (var characterCount in characterCounts) {
			char character = characterCount.Key;
			int count = characterCount.Value;
			if (count == strings.Length) {
				finalChars.Add(character);
			}
		}

		string[] finalCharsArr = new string[finalChars.Count];
		for (int i = 0; i < finalCharsArr.Length; i++) {
			finalCharsArr[i] = finalChars[i].ToString();
		}
		return finalCharsArr;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {
	// O(n * m) time | O(m) space - where n is the number of strings, and m is the
	// length of the longest string
	public string[] CommonCharacters(string[] strings) {
		string smallestString = getSmallestString(strings);
		HashSet<char> potentialCommonCharacters = new HashSet<char>();
		for (int i = 0; i < smallestString.Length; i++) {
			potentialCommonCharacters.Add(smallestString[i]);
		}

		foreach (var str in strings) {
			removeNonexistentCharacters(str, potentialCommonCharacters);
		}

		string[] output = new string[potentialCommonCharacters.Count];
		int j = 0;
		foreach (var character in potentialCommonCharacters) {
			output[j] = character.ToString();
			j++;
		}

		return output;
	}

	private string getSmallestString(string[] strings) {
		string smallestString = strings[0];
		foreach (var str in strings) {
			if (str.Length < smallestString.Length) {
				smallestString = str;
			}
		}
		return smallestString;
	}

	private void removeNonexistentCharacters(string str,
	  HashSet<char> potentialCommonCharacters) {
		HashSet<char> uniqueStringChars = new HashSet<char>();
		for (int i = 0; i < str.Length; i++) {
			uniqueStringChars.Add(str[i]);
		}

		HashSet<char> charactersToRemove = new HashSet<char>();
		foreach (var character in potentialCommonCharacters) {
			if (!uniqueStringChars.Contains(character)) {
				charactersToRemove.Add(character);
			}
		}
		foreach (var character in charactersToRemove) {
			potentialCommonCharacters.Remove(character);
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		string[] input = new string[] {"abc", "bcd", "cbad"};
		string[] expected = new string[] {"b", "c"};
		string[] actual = new Program().CommonCharacters(input);
		Array.Sort(actual);
		Utils.AssertTrue(expected.Length == actual.Length);
		for (int i = 0; i < actual.Length; i++) {
			Utils.AssertTrue(expected[i].Equals(actual[i]));
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
	"sort"

	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []string{"abc", "bcd", "cbad"}
	expected := []string{"b", "c"}
	actual := CommonCharacters(input)
	sort.Strings(actual)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n * m) time | O(c) space - where n is the number of strings, m is the
// length of the longest string, and c is the number of unique characters across
// all strings
func CommonCharacters(strings []string) []string {
	characterCounts := map[rune]int{}
	for _, str := range strings {
		uniqueStringCharacters := map[rune]bool{}
		for _, char := range str {
			uniqueStringCharacters[char] = true
		}

		for char := range uniqueStringCharacters {
			characterCounts[char] += 1
		}
	}

	finalCharacters := make([]string, 0)
	for char, count := range characterCounts {
		if count == len(strings) {
			finalCharacters = append(finalCharacters, string(char))
		}
	}
	return finalCharacters
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n * m) time | O(m) space - where n is the number of strings, and m is the
// length of the longest string
func CommonCharacters(strings []string) []string {
	smallestString := getSmallestString(strings)
	potentialCommonCharacters := map[rune]bool{}
	for _, char := range smallestString {
		potentialCommonCharacters[char] = true
	}

	for _, str := range strings {
		removeNonexistentCharacters(str, potentialCommonCharacters)
	}

	finalCharacters := make([]string, 0)
	for char := range potentialCommonCharacters {
		finalCharacters = append(finalCharacters, string(char))
	}
	return finalCharacters
}

func getSmallestString(strings []string) string {
	smallestString := strings[0]
	for _, str := range strings {
		if len(str) < len(smallestString) {
			smallestString = str
		}
	}
	return smallestString
}

func removeNonexistentCharacters(str string, potentialCommonCharacters map[rune]bool) {
	uniqueStringCharacters := map[rune]bool{}
	for _, char := range str {
		uniqueStringCharacters[char] = true
	}

	for char := range potentialCommonCharacters {
		if _, found := uniqueStringCharacters[char]; !found {
			delete(potentialCommonCharacters, char)
		}
	}
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
	input := []string{"abc", "bcd", "cbad"}
	expected := []string{"b", "c"}
	actual := CommonCharacters(input)
	sort.Strings(actual)
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
    String[] input = new String[] {"abc", "bcd", "cbad"};
    String[] expected = new String[] {"b", "c"};
    String[] actual = new Program().commonCharacters(input);
    Arrays.sort(actual);
    Utils.assertTrue(expected.length == actual.length);
    for (int i = 0; i < actual.length; i++) {
      Utils.assertTrue(expected[i].equals(actual[i]));
    }
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n * m) time | O(c) space - where n is the number of strings, m is the
  // length of the longest string, and c is the number of unique characters across
  // all strings
  public String[] commonCharacters(String[] strings) {
    HashMap<Character, Integer> characterCounts = new HashMap<Character, Integer>();
    for (String string : strings) {
      HashSet<Character> uniqueStringCharacters = new HashSet<Character>();
      for (int i = 0; i < string.length(); i++) {
        uniqueStringCharacters.add(string.charAt(i));
      }

      for (char character : uniqueStringCharacters) {
        if (!characterCounts.containsKey(character)) {
          characterCounts.put(character, 0);
        }
        characterCounts.put(character, characterCounts.get(character) + 1);
      }
    }

    ArrayList<Character> finalCharacters = new ArrayList<Character>();
    for (Map.Entry<Character, Integer> characterCount : characterCounts.entrySet()) {
      Character character = characterCount.getKey();
      Integer count = characterCount.getValue();
      if (count == strings.length) {
        finalCharacters.add(character);
      }
    }

    String[] finalCharactersArr = new String[finalCharacters.size()];
    for (int i = 0; i < finalCharactersArr.length; i++) {
      finalCharactersArr[i] = finalCharacters.get(i).toString();
    }
    return finalCharactersArr;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n * m) time | O(m) space - where n is the number of strings, and m is the
  // length of the longest string
  public String[] commonCharacters(String[] strings) {
    String smallestString = getSmallestString(strings);
    HashSet<Character> potentialCommonCharacters = new HashSet<Character>();
    for (int i = 0; i < smallestString.length(); i++) {
      potentialCommonCharacters.add(smallestString.charAt(i));
    }

    for (String string : strings) {
      removeNonexistentCharacters(string, potentialCommonCharacters);
    }

    String[] output = new String[potentialCommonCharacters.size()];
    int i = 0;
    for (Character character : potentialCommonCharacters) {
      output[i] = character.toString();
      i++;
    }

    return output;
  }

  private String getSmallestString(String[] strings) {
    String smallestString = strings[0];
    for (String string : strings) {
      if (string.length() < smallestString.length()) {
        smallestString = string;
      }
    }
    return smallestString;
  }

  private void removeNonexistentCharacters(
      String string, HashSet<Character> potentialCommonCharacters) {
    HashSet<Character> uniqueStringCharacters = new HashSet<Character>();
    for (int i = 0; i < string.length(); i++) {
      uniqueStringCharacters.add(string.charAt(i));
    }

    HashSet<Character> charactersToRemove = new HashSet<Character>();
    for (char character : potentialCommonCharacters) {
      if (!uniqueStringCharacters.contains(character)) {
        charactersToRemove.add(character);
      }
    }
    for (char character : charactersToRemove) {
      potentialCommonCharacters.remove(character);
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
    String[] input = new String[] {"abc", "bcd", "cbad"};
    String[] expected = new String[] {"b", "c"};
    String[] actual = new Program().commonCharacters(input);
    Arrays.sort(actual);
    Utils.assertTrue(expected.length == actual.length);
    for (int i = 0; i < actual.length; i++) {
      Utils.assertTrue(expected[i].equals(actual[i]));
    }
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
  const input = ['abc', 'bcd', 'cbad'];
  const expected = ['b', 'c'];
  const actual = program.commonCharacters(input);
  actual.sort();
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n * m) time | O(c) space - where n is the number of strings, m is the
// length of the longest string, and c is the number of unique characters across
// all strings
function commonCharacters(strings) {
  const characterCounts = {};
  for (const string of strings) {
    const uniqueStringCharacters = new Set(string);
    for (const character of uniqueStringCharacters) {
      if (!(character in characterCounts)) {
        characterCounts[character] = 0;
      }
      characterCounts[character]++;
    }
  }

  const finalCharacters = [];
  for (const [character, count] of Object.entries(characterCounts)) {
    if (count === strings.length) {
      finalCharacters.push(character);
    }
  }

  return finalCharacters;
}

// Do not edit the line below.
exports.commonCharacters = commonCharacters;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n * m) time | O(m) space - where n is the number of strings, and m is the
// length of the longest string
function commonCharacters(strings) {
  const smallestString = getSmallestString(strings);
  const potentialCommonCharacters = new Set(smallestString);

  for (const string of strings) {
    removeNonexistentCharacters(string, potentialCommonCharacters);
  }

  return Array.from(potentialCommonCharacters);
}

function getSmallestString(strings) {
  let smallestString = strings[0];
  for (const string of strings) {
    if (string.length < smallestString.length) {
      smallestString = string;
    }
  }

  return smallestString;
}

function removeNonexistentCharacters(string, potentialCommonCharacters) {
  const uniqueStringCharacters = new Set(string);

  for (const character of Array.from(potentialCommonCharacters)) {
    if (!uniqueStringCharacters.has(character)) {
      potentialCommonCharacters.delete(character);
    }
  }
}

// Do not edit the line below.
exports.commonCharacters = commonCharacters;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = ['abc', 'bcd', 'cbad'];
  const expected = ['b', 'c'];
  const actual = program.commonCharacters(input);
  actual.sort();
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.commonCharacters

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf("abc", "bcd", "cbad")
        val expected = mutableListOf("b", "c")
        val output = commonCharacters(input).toMutableList()
        output.sort()
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n * m) time | O(c) space - where n is the number of strings, m is the
// length of the longest string, and c is the number of unique characters across
// all strings
fun commonCharacters(strings: MutableList<String>): List<String> {
    val characterCounts = mutableMapOf<Char, Int>()
    for (string in strings) {
        val uniqueStringCharacters = string.toSet()
        for (character in uniqueStringCharacters) {
            if (!(character in characterCounts)) {
                characterCounts[character] = 0
            }
            characterCounts[character] = characterCounts[character]!! + 1
        }
    }

    val finalCharacters = mutableListOf<String>()
    for ((character, count) in characterCounts) {
        if (count == strings.size) {
            finalCharacters.add(character.toString())
        }
    }

    return finalCharacters
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n * m) time | O(m) space - where n is the number of strings, and m is the
// length of the longest string
fun commonCharacters(strings: MutableList<String>): List<String> {
    val smallestString = getSmallestString(strings)
    val potentialCommonCharacters = smallestString.toSet().toMutableSet()

    for (string in strings) {
        removeNonexistentCharacters(string, potentialCommonCharacters)
    }

    return potentialCommonCharacters.toList().map() { it -> it.toString() }
}

fun getSmallestString(strings: List<String>): String {
    var smallestString = strings[0]
    for (string in strings) {
        if (string.length < smallestString.length) {
            smallestString = string
        }
    }

    return smallestString
}

fun removeNonexistentCharacters(string: String, potentialCommonCharacters: MutableSet<Char>) {
    val uniqueStringCharacters = string.toSet()

    for (character in potentialCommonCharacters.toList()) {
        if (!uniqueStringCharacters.contains(character)) {
            potentialCommonCharacters.remove(character)
        }
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.commonCharacters

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf("abc", "bcd", "cbad")
        val expected = mutableListOf("b", "c")
        val output = commonCharacters(input).toMutableList()
        output.sort()
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
      let input = ["abc", "bcd", "cbad"]
      let expected = ["b", "c"]
      var actual = Program().commonCharacters(input)
      actual.sort()
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n * m) time | O(c) space - where n is the number of strings, m is the
  // length of the longest string, and c is the number of unique characters across
  // all strings
  func commonCharacters(_ strings: [String]) -> [String] {
    var characterCounts = [Character: Int]()
    for string in strings {
      var uniqueStringCharacters = Set<Character>()
      for character in string {
        uniqueStringCharacters.insert(character)
      }

      for character in uniqueStringCharacters {
        if !characterCounts.keys.contains(character) {
          characterCounts[character] = 0
        }
        characterCounts[character]! += 1
      }
    }

    var finalCharacters = [String]()
    for (character, count) in characterCounts {
      if count == strings.count {
        finalCharacters.append(String(character))
      }
    }
    return finalCharacters
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n * m) time | O(m) space - where n is the number of strings, and m is the
  // length of the longest string
  func commonCharacters(_ strings: [String]) -> [String] {
    let smallestString = getSmallestString(strings)
    var potentialCommonCharacters = Set<Character>()
    for character in smallestString {
      potentialCommonCharacters.insert(character)
    }

    for string in strings {
      removeNonexistentCharacters(string, &potentialCommonCharacters)
    }

    var finalCharacters = [String]()
    for character in potentialCommonCharacters {
      finalCharacters.append(String(character))
    }
    return finalCharacters
  }

  func getSmallestString(_ strings: [String]) -> String {
    var smallestString = strings[0]
    for string in strings {
      if string.count < smallestString.count {
        smallestString = string
      }
    }
    return smallestString
  }

  func removeNonexistentCharacters(_ string: String, _ potentialCommonCharacters: inout Set<Character>) {
    var uniqueStringCharacters = Set<Character>()
    for character in string {
      uniqueStringCharacters.insert(character)
    }

    for character in potentialCommonCharacters {
      if !uniqueStringCharacters.contains(character) {
        potentialCommonCharacters.remove(character)
      }
    }
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws in
      let input = ["abc", "bcd", "cbad"]
      let expected = ["b", "c"]
      var actual = Program().commonCharacters(input)
      actual.sort()
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
        input = ["abc", "bcd", "cbad"]
        expected = ["b", "c"]
        actual = program.commonCharacters(input)
        actual.sort()
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n * m) time | O(c) space - where n is the number of strings, m is the
# length of the longest string, and c is the number of unique characters across
# all strings
def commonCharacters(strings):
    characterCounts = {}
    for string in strings:
        uniqueStringCharacters = set(string)
        for character in uniqueStringCharacters:
            if character not in characterCounts:
                characterCounts[character] = 0
            characterCounts[character] += 1

    finalCharacters = []
    for character, count in characterCounts.items():
        if count == len(strings):
            finalCharacters.append(character)

    return finalCharacters

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n * m) time | O(m) space - where n is the number of strings, and m is the
# length of the longest string
def commonCharacters(strings):
    smallestString = getSmallestString(strings)
    potentialCommonCharacters = set(smallestString)

    for string in strings:
        removeNonexistentCharacters(string, potentialCommonCharacters)

    return list(potentialCommonCharacters)


def getSmallestString(strings):
    smallestString = strings[0]
    for string in strings:
        if len(string) < len(smallestString):
            smallestString = string

    return smallestString


def removeNonexistentCharacters(string, potentialCommonCharacters):
    uniqueStringCharacters = set(string)

    for character in list(potentialCommonCharacters):
        if character not in uniqueStringCharacters:
            potentialCommonCharacters.remove(character)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = ["abc", "bcd", "cbad"]
        expected = ["b", "c"]
        actual = program.commonCharacters(input)
        actual.sort()
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
  const input = ['abc', 'bcd', 'cbad'];
  const expected = ['b', 'c'];
  const actual = program.commonCharacters(input);
  actual.sort();
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n * m) time | O(c) space - where n is the number of strings, m is the
// length of the longest string, and c is the number of unique characters across
// all strings
export function commonCharacters(strings: string[]) {
  const characterCounts: {[character: string]: number} = {};
  for (const string of strings) {
    const uniqueStringCharacters = new Set(string);
    for (const character of uniqueStringCharacters) {
      if (!(character in characterCounts)) {
        characterCounts[character] = 0;
      }
      characterCounts[character]++;
    }
  }

  const finalCharacters: string[] = [];
  for (const [character, count] of Object.entries(characterCounts)) {
    if (count === strings.length) {
      finalCharacters.push(character);
    }
  }

  return finalCharacters;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n * m) time | O(m) space - where n is the number of strings, and m is the
// length of the longest string
export function commonCharacters(strings: string[]) {
  const smallestString = getSmallestString(strings);
  const potentialCommonCharacters = new Set(smallestString);

  for (const string of strings) {
    removeNonexistentCharacters(string, potentialCommonCharacters);
  }

  return Array.from(potentialCommonCharacters);
}

function getSmallestString(strings: string[]) {
  let smallestString = strings[0];
  for (const string of strings) {
    if (string.length < smallestString.length) {
      smallestString = string;
    }
  }

  return smallestString;
}

function removeNonexistentCharacters(string: string, potentialCommonCharacters: Set<string>) {
  const uniqueStringCharacters = new Set(string);

  for (const character of Array.from(potentialCommonCharacters)) {
    if (!uniqueStringCharacters.has(character)) {
      potentialCommonCharacters.delete(character);
    }
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = ['abc', 'bcd', 'cbad'];
  const expected = ['b', 'c'];
  const actual = program.commonCharacters(input);
  actual.sort();
  chai.expect(actual).to.deep.equal(expected);
});

```

