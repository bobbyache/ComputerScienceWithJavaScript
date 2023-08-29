# Generate Document
<div class="html">
<p>
  You're given a string of available characters and a string representing a
  document that you need to generate. Write a function that determines if you
  can generate the document using the available characters. If you can generate
  the document, your function should return <span>true</span>; otherwise, it
  should return <span>false</span>.
</p>
<p>
  You're only able to generate the document if the frequency of unique
  characters in the characters string is greater than or equal to the frequency
  of unique characters in the document string. For example, if you're given
  <span>characters = "abcabc"</span> and <span>document = "aabbccc"</span> you
  <b>cannot</b> generate the document because you're missing one <span>c</span>.
</p>
<p>
  The document that you need to create may contain any characters, including
  special characters, capital letters, numbers, and spaces.
</p>
<p>Note: you can always generate the empty string (<span>""</span>).</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">characters</span> = "Bste!hetsi ogEAxpelrt x "
<span class="CodeEditor-promptParameter">document</span> = "AlgoExpert is the Best!"
</pre>
<h3>Sample Output</h3>
<pre>
true
</pre>
</div>

Hint 1
<p>
  There are multiple ways to the solve this problem, but not all approaches have
  an optimal time complexity. Is there any way to solve this problem in better
  than <span>O(m * (n + m))</span> or <span>O(n * (n + m))</span> time, where
  <span>n</span> is the length of the <span>characters</span> string and
  <span>m</span> is the length of the <span>document</span> string?
</p>


Hint 2

<p>
  One of the simplest ways to solve this problem is to loop through the
  <span>document</span> string, one character at a time. At every character, you
  can count how many times it occurs in the <span>document</span> string and in
  the <span>characters</span> string. If it occurs more times in the
  <span>document</span> string than in the <span>characters</span> string, then
  you cannot generate the document. What is the time complexity of this
  approach?
</p>


Hint 3

<p>
  The approach discussed in Hint #2 runs in <span>O(m * (n + m))</span> time.
  Can you use some external space to optimize this time complexity?
</p>


Hint 4

<p>
  You can solve this problem in <span>O(n + m)</span> time. To do so, you need
  to use a hash table. Start by counting all of the characters in the
  <span>characters</span> string and storing these counts in a hash table. Then,
  loop through the <span>document</span> string, and check if each character is
  in the hash table and has a value greater than zero. If a character isn't in
  the hash table or doesn't have a value greater than zero, then you cannot
  generate the document. If a character is in the hash table and has a value
  greater than zero, then decrement its value in the hash table to indicate that
  you've "used" one of these available characters. If you make it through the
  entire <span>document</span> string without returning <span>false</span>, then
  you can generate the document.
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
      auto characters = "Bste!hetsi ogEAxpelrt x ";
      auto document = "AlgoExpert is the Best!";
      auto expected = true;
      auto actual = generateDocument(characters, document);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

int countCharacterFrequency(char character, string target);

// O(m * (n + m)) time | O(1) space - where n is the number
// of characters and m is the length of the document
bool generateDocument(string characters, string document) {
  for (auto character : document) {
    auto documentFrequency = countCharacterFrequency(character, document);
    auto charactersFrequency = countCharacterFrequency(character, characters);
    if (documentFrequency > charactersFrequency)
      return false;
  }

  return true;
}

int countCharacterFrequency(char character, string target) {
  int frequency = 0;
  for (auto c : target) {
    if (c == character)
      frequency++;
  }

  return frequency;
}
```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <unordered_set>
using namespace std;

int countCharacterFrequency(char character, string target);

// O(c * (n + m)) time | O(c) space - where n is the number of characters, m is
// the length of the document, and c is the number of unique characters in the
// document
bool generateDocument(string characters, string document) {
  unordered_set<char> alreadyCounted;

  for (auto character : document) {
    if (alreadyCounted.find(character) != alreadyCounted.end())
      continue;

    auto documentFrequency = countCharacterFrequency(character, document);
    auto charactersFrequency = countCharacterFrequency(character, characters);
    if (documentFrequency > charactersFrequency)
      return false;

    alreadyCounted.insert(character);
  }

  return true;
}

int countCharacterFrequency(char character, string target) {
  int frequency = 0;
  for (auto c : target) {
    if (c == character)
      frequency++;
  }

  return frequency;
}
```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <unordered_map>
using namespace std;

// O(n + m) time | O(c) space - where n is the number of characters, m is
// the length of the document, and c is the number of unique characters in the
// characters string
bool generateDocument(string characters, string document) {
  unordered_map<char, int> characterCounts;

  for (auto character : characters) {
    if (characterCounts.find(character) == characterCounts.end())
      characterCounts[character] = 0;

    characterCounts[character]++;
  }

  for (auto character : document) {
    if (characterCounts.find(character) == characterCounts.end() ||
        characterCounts[character] == 0)
      return false;

    characterCounts[character]--;
  }

  return true;
}
```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      auto characters = "Bste!hetsi ogEAxpelrt x ";
      auto document = "AlgoExpert is the Best!";
      auto expected = true;
      auto actual = generateDocument(characters, document);
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
		string characters = "Bste!hetsi ogEAxpelrt x ";
		string document = "AlgoExpert is the Best!";
		bool expected = true;
		var actual = new Program().GenerateDocument(characters, document);
		Utils.AssertTrue(expected == actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	// O(m * (n + m)) time | O(1) space - where n is the number
	// of characters and m is the length of the document
	public bool GenerateDocument(string characters, string document) {
		for (int idx = 0; idx < document.Length; idx++) {
			char character = document[idx];
			int documentFrequency = countcharFrequency(character, document);
			int charactersFrequency = countcharFrequency(character, characters);
			if (documentFrequency > charactersFrequency) {
				return false;
			}
		}

		return true;
	}

	public int countcharFrequency(char character, string target) {
		int frequency = 0;
		for (int idx = 0; idx < target.Length; idx++) {
			char c = target[idx];
			if (c == character) {
				frequency += 1;
			}
		}

		return frequency;
	}
}
```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;


public class Program {

	// O(c * (n + m)) time | O(c) space - where n is the number of characters, m is
	// the length of the document, and c is the number of unique characters in the
	// document
	public bool GenerateDocument(string characters, string document) {
		HashSet<char> alreadyCounted = new HashSet<char>();

		for (int idx = 0; idx < document.Length; idx++) {
			char character = document[idx];
			if (alreadyCounted.Contains(character)) {
				continue;
			}

			int documentFrequency = countcharFrequency(character, document);
			int charactersFrequency = countcharFrequency(character, characters);
			if (documentFrequency > charactersFrequency) {
				return false;
			}

			alreadyCounted.Add(character);
		}

		return true;
	}

	public int countcharFrequency(char character, string target) {
		int frequency = 0;
		for (int idx = 0; idx < target.Length; idx++) {
			char c = target[idx];
			if (c == character) {
				frequency += 1;
			}
		}

		return frequency;
	}
}
```
### Solution 3 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {

	// O(n + m) time | O(c) space - where n is the number of characters, m is
	// the length of the document, and c is the number of unique characters in the
	// characters string
	public bool GenerateDocument(string characters, string document) {
		Dictionary<char, int> characterCounts = new Dictionary<char, int>();

		for (int idx = 0; idx < characters.Length; idx++) {
			char character = characters[idx];
			characterCounts[character] =
			  characterCounts.GetValueOrDefault(character, 0) + 1;
		}

		for (int idx = 0; idx < document.Length; idx++) {
			char character = document[idx];
			if (!characterCounts.ContainsKey(character) ||
			  characterCounts[character] == 0) {
				return false;
			}

			characterCounts[character] = characterCounts[character] - 1;
		}

		return true;
	}
}
```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		string characters = "Bste!hetsi ogEAxpelrt x ";
		string document = "AlgoExpert is the Best!";
		bool expected = true;
		var actual = new Program().GenerateDocument(characters, document);
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
	characters := "Bste!hetsi ogEAxpelrt x "
	document := "AlgoExpert is the Best!"
	expected := true
	actual := GenerateDocument(characters, document)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(m * (n + m)) time | O(1) space - where n is the number
// of characters and m is the length of the document
func GenerateDocument(characters string, document string) bool {
	for _, character := range document {
		documentFrequency := countCharacterFrequency(character, document)
		charactersFrequency := countCharacterFrequency(character, characters)
		if documentFrequency > charactersFrequency {
			return false
		}
	}

	return true
}

func countCharacterFrequency(character rune, target string) int {
	var frequency = 0
	for _, char := range target {
		if char == character {
			frequency += 1
		}
	}

	return frequency
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(c * (n + m)) time | O(c) space - where n is the number of characters, m is
// the length of the document, and c is the number of unique characters in the document
func GenerateDocument(characters string, document string) bool {
	alreadyCounted := map[rune]bool{}

	for _, character := range document {
		if alreadyCounted[character] {
			continue
		}

		documentFrequency := countCharacterFrequency(character, document)
		charactersFrequency := countCharacterFrequency(character, characters)
		if documentFrequency > charactersFrequency {
			return false
		}

		alreadyCounted[character] = true
	}

	return true
}

func countCharacterFrequency(character rune, target string) int {
	var frequency = 0
	for _, char := range target {
		if char == character {
			frequency += 1
		}
	}

	return frequency
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n + m) time | O(c) space - where n is the number of characters, m is
// the length of the document, and c is the number of unique characters in the characters string
func GenerateDocument(characters string, document string) bool {
	characterCounts := map[rune]int{}

	for _, character := range characters {
		characterCounts[character] = characterCounts[character] + 1
	}

	for _, character := range document {
		if characterCounts[character] == 0 {
			return false
		}

		characterCounts[character] = characterCounts[character] - 1
	}

	return true
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	characters := "Bste!hetsi ogEAxpelrt x "
	document := "AlgoExpert is the Best!"
	expected := true
	actual := GenerateDocument(characters, document)
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
    String characters = "Bste!hetsi ogEAxpelrt x ";
    String document = "AlgoExpert is the Best!";
    boolean expected = true;
    var actual = new Program().generateDocument(characters, document);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(m * (n + m)) time | O(1) space - where n is the number
  // of characters and m is the length of the document
  public boolean generateDocument(String characters, String document) {
    for (int idx = 0; idx < document.length(); idx++) {
      char character = document.charAt(idx);
      int documentFrequency = countCharacterFrequency(character, document);
      int charactersFrequency = countCharacterFrequency(character, characters);
      if (documentFrequency > charactersFrequency) {
        return false;
      }
    }

    return true;
  }

  public int countCharacterFrequency(char character, String target) {
    int frequency = 0;
    for (int idx = 0; idx < target.length(); idx++) {
      char c = target.charAt(idx);
      if (c == character) {
        frequency += 1;
      }
    }

    return frequency;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(c * (n + m)) time | O(c) space - where n is the number of characters, m is
  // the length of the document, and c is the number of unique characters in the
  // document
  public boolean generateDocument(String characters, String document) {
    Set<Character> alreadyCounted = new HashSet<Character>();

    for (int idx = 0; idx < document.length(); idx++) {
      char character = document.charAt(idx);
      if (alreadyCounted.contains(character)) {
        continue;
      }

      int documentFrequency = countCharacterFrequency(character, document);
      int charactersFrequency = countCharacterFrequency(character, characters);
      if (documentFrequency > charactersFrequency) {
        return false;
      }

      alreadyCounted.add(character);
    }

    return true;
  }

  public int countCharacterFrequency(char character, String target) {
    int frequency = 0;
    for (int idx = 0; idx < target.length(); idx++) {
      char c = target.charAt(idx);
      if (c == character) {
        frequency += 1;
      }
    }

    return frequency;
  }
}

```
### Solution 3 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n + m) time | O(c) space - where n is the number of characters, m is
  // the length of the document, and c is the number of unique characters in the
  // characters string
  public boolean generateDocument(String characters, String document) {
    HashMap<Character, Integer> characterCounts = new HashMap<Character, Integer>();

    for (int idx = 0; idx < characters.length(); idx++) {
      char character = characters.charAt(idx);
      characterCounts.put(character, characterCounts.getOrDefault(character, 0) + 1);
    }

    for (int idx = 0; idx < document.length(); idx++) {
      char character = document.charAt(idx);
      if (!characterCounts.containsKey(character) || characterCounts.get(character) == 0) {
        return false;
      }

      characterCounts.put(character, characterCounts.get(character) - 1);
    }

    return true;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    String characters = "Bste!hetsi ogEAxpelrt x ";
    String document = "AlgoExpert is the Best!";
    boolean expected = true;
    var actual = new Program().generateDocument(characters, document);
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
  const characters = 'Bste!hetsi ogEAxpelrt x ';
  const document = 'AlgoExpert is the Best!';
  const expected = true;
  const actual = program.generateDocument(characters, document);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(m * (n + m)) time | O(1) space - where n is the number
// of characters and m is the length of the document
function generateDocument(characters, document) {
  for (const character of document) {
    const documentFrequency = countCharacterFrequency(character, document);
    const charactersFrequency = countCharacterFrequency(character, characters);
    if (documentFrequency > charactersFrequency) return false;
  }

  return true;
}

function countCharacterFrequency(character, target) {
  let frequency = 0;
  for (const char of target) {
    if (char === character) frequency++;
  }

  return frequency;
}

// Do not edit the line below.
exports.generateDocument = generateDocument;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(c * (n + m)) time | O(c) space - where n is the number of characters, m is
// the length of the document, and c is the number of unique characters in the document
function generateDocument(characters, document) {
  const alreadyCounted = new Set();

  for (const character of document) {
    if (character in alreadyCounted) continue;

    const documentFrequency = countCharacterFrequency(character, document);
    const charactersFrequency = countCharacterFrequency(character, characters);
    if (documentFrequency > charactersFrequency) return false;

    alreadyCounted.add(character);
  }

  return true;
}

function countCharacterFrequency(character, target) {
  let frequency = 0;
  for (const char of target) {
    if (char === character) frequency++;
  }

  return frequency;
}

// Do not edit the line below.
exports.generateDocument = generateDocument;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n + m) time | O(c) space - where n is the number of characters, m is
// the length of the document, and c is the number of unique characters in the characters string
function generateDocument(characters, document) {
  const characterCounts = {};

  for (const character of characters) {
    if (!(character in characterCounts)) characterCounts[character] = 0;

    characterCounts[character]++;
  }

  for (const character of document) {
    if (!(character in characterCounts) || characterCounts[character] === 0) return false;

    characterCounts[character]--;
  }

  return true;
}

// Do not edit the line below.
exports.generateDocument = generateDocument;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const characters = 'Bste!hetsi ogEAxpelrt x ';
  const document = 'AlgoExpert is the Best!';
  const expected = true;
  const actual = program.generateDocument(characters, document);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.generateDocument

class ProgramTest {
    @Test
    fun TestCase1() {
        val characters = "Bste!hetsi ogEAxpelrt x "
        val document = "AlgoExpert is the Best!"
        val expected = true
        val output = generateDocument(characters, document)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(m * (n + m)) time | O(1) space - where n is the number
// of characters and m is the length of the document
fun generateDocument(characters: String, document: String): Boolean {
    for (character in document) {
        val documentFrequency = countCharacterFrequency(character, document)
        val charactersFrequency = countCharacterFrequency(character, characters)
        if (documentFrequency > charactersFrequency) return false
    }

    return true
}

fun countCharacterFrequency(character: Char, target: String): Int {
    var frequency = 0
    for (char in target) {
        if (char == character) frequency += 1
    }

    return frequency
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(c * (n + m)) time | O(c) space - where n is the number of characters, m is
// the length of the document, and c is the number of unique characters in the document
fun generateDocument(characters: String, document: String): Boolean {
    val alreadyCounted = mutableSetOf<Char>()

    for (character in document) {
        if (character in alreadyCounted) continue

        val documentFrequency = countCharacterFrequency(character, document)
        val charactersFrequency = countCharacterFrequency(character, characters)
        if (documentFrequency > charactersFrequency) return false

        alreadyCounted.add(character)
    }

    return true
}

fun countCharacterFrequency(character: Char, target: String): Int {
    var frequency = 0
    for (char in target) {
        if (char == character) frequency += 1
    }

    return frequency
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n + m) time | O(c) space - where n is the number of characters, m is
// the length of the document, and c is the number of unique characters in the characters string
fun generateDocument(characters: String, document: String): Boolean {
    val characterCounts = mutableMapOf<Char, Int>()

    for (character in characters) {
        if (!(character in characterCounts)) characterCounts[character] = 0

        characterCounts[character] = characterCounts[character]!! + 1
    }

    for (character in document) {
        if (!(character in characterCounts) || characterCounts[character] == 0) return false

        characterCounts[character] = characterCounts[character]!! - 1
    }

    return true
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.generateDocument

class ProgramTest {
    @Test
    fun TestCase1() {
        val characters = "Bste!hetsi ogEAxpelrt x "
        val document = "AlgoExpert is the Best!"
        val expected = true
        val output = generateDocument(characters, document)
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
    runTest("Test Case 1") { () throws -> Void in
      let characters = "Bste!hetsi ogEAxpelrt x "
      let document = "AlgoExpert is the Best!"
      let expected = true
      var actual = Program().generateDocument(characters, document)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(m * (n + m)) time | O(1) space - where n is the number
  // of characters and m is the length of the document
  func generateDocument(_ characters: String, _ document: String) -> Bool {
    for character in document {
      let documentFrequency = countCharacterFrequency(character, document)
      let charactersFrequency = countCharacterFrequency(character, characters)
      if documentFrequency > charactersFrequency {
        return false
      }
    }
    return true
  }

  func countCharacterFrequency(_ character: Character, _ target: String) -> Int {
    var frequency = 0
    for char in target {
      if char == character {
        frequency += 1
      }
    }
    return frequency
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(c * (n + m)) time | O(c) space - where n is the number of characters, m is
  // the length of the document, and c is the number of unique characters in the document
  func generateDocument(_ characters: String, _ document: String) -> Bool {
    var alreadyCounted: Set<Character> = []

    for character in document {
      if alreadyCounted.contains(character) {
        continue
      }

      let documentFrequency = countCharacterFrequency(character, document)
      let charactersFrequency = countCharacterFrequency(character, characters)
      if documentFrequency > charactersFrequency {
        return false
      }

      alreadyCounted.insert(character)
    }

    return true
  }

  func countCharacterFrequency(_ character: Character, _ target: String) -> Int {
    var frequency = 0
    for char in target {
      if char == character {
        frequency += 1
      }
    }
    return frequency
  }
}

```
### Solution 3 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n + m) time | O(c) space - where n is the number of characters, m is
  // the length of the document, and c is the number of unique characters in the characters string
  func generateDocument(_ characters: String, _ document: String) -> Bool {
    var characterCounts = [Character: Int]()

    for character in characters {
      if characterCounts[character] == nil {
        characterCounts[character] = 0
      }
      characterCounts[character] = characterCounts[character]! + 1
    }

    for character in document {
      if characterCounts[character] == nil || characterCounts[character] == 0 {
        return false
      }
      characterCounts[character] = characterCounts[character]! - 1
    }

    return true
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let characters = "Bste!hetsi ogEAxpelrt x "
      let document = "AlgoExpert is the Best!"
      let expected = true
      var actual = Program().generateDocument(characters, document)
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
        characters = "Bste!hetsi ogEAxpelrt x "
        document = "AlgoExpert is the Best!"
        expected = True
        actual = program.generateDocument(characters, document)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(m * (n + m)) time | O(1) space - where n is the number
# of characters and m is the length of the document
def generateDocument(characters, document):
    for character in document:
        documentFrequency = countCharacterFrequency(character, document)
        charactersFrequency = countCharacterFrequency(character, characters)
        if documentFrequency > charactersFrequency:
            return False

    return True


def countCharacterFrequency(character, target):
    frequency = 0
    for char in target:
        if char == character:
            frequency += 1

    return frequency

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(c * (n + m)) time | O(c) space - where n is the number of characters, m is
# the length of the document, and c is the number of unique characters in the document
def generateDocument(characters, document):
    alreadyCounted = set()

    for character in document:
        if character in alreadyCounted:
            continue

        documentFrequency = countCharacterFrequency(character, document)
        charactersFrequency = countCharacterFrequency(character, characters)
        if documentFrequency > charactersFrequency:
            return False

        alreadyCounted.add(character)

    return True


def countCharacterFrequency(character, target):
    frequency = 0
    for char in target:
        if char == character:
            frequency += 1

    return frequency

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n + m) time | O(c) space - where n is the number of characters, m is
# the length of the document, and c is the number of unique characters in the characters string
def generateDocument(characters, document):
    characterCounts = {}

    for character in characters:
        if character not in characterCounts:
            characterCounts[character] = 0

        characterCounts[character] += 1

    for character in document:
        if character not in characterCounts or characterCounts[character] == 0:
            return False

        characterCounts[character] -= 1

    return True

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        characters = "Bste!hetsi ogEAxpelrt x "
        document = "AlgoExpert is the Best!"
        expected = True
        actual = program.generateDocument(characters, document)
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
  const characters = 'Bste!hetsi ogEAxpelrt x ';
  const document = 'AlgoExpert is the Best!';
  const expected = true;
  const actual = program.generateDocument(characters, document);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(m * (n + m)) time | O(1) space - where n is the number
// of characters and m is the length of the document
export function generateDocument(characters: string, document: string) {
  for (const character of document) {
    const documentFrequency = countCharacterFrequency(character, document);
    const charactersFrequency = countCharacterFrequency(character, characters);
    if (documentFrequency > charactersFrequency) return false;
  }

  return true;
}

function countCharacterFrequency(character: string, target: string) {
  let frequency = 0;
  for (const char of target) {
    if (char === character) frequency++;
  }

  return frequency;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(c * (n + m)) time | O(c) space - where n is the number of characters, m is
// the length of the document, and c is the number of unique characters in the document
export function generateDocument(characters: string, document: string) {
  const alreadyCounted: Set<string> = new Set();

  for (const character of document) {
    if (character in alreadyCounted) continue;

    const documentFrequency = countCharacterFrequency(character, document);
    const charactersFrequency = countCharacterFrequency(character, characters);
    if (documentFrequency > charactersFrequency) return false;

    alreadyCounted.add(character);
  }

  return true;
}

function countCharacterFrequency(character: string, target: string) {
  let frequency = 0;
  for (const char of target) {
    if (char === character) frequency++;
  }

  return frequency;
}

```
### Solution 3 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n + m) time | O(c) space - where n is the number of characters, m is
// the length of the document, and c is the number of unique characters in the characters string
export function generateDocument(characters: string, document: string) {
  const characterCounts: {[character: string]: number} = {};

  for (const character of characters) {
    if (!(character in characterCounts)) characterCounts[character] = 0;

    characterCounts[character]++;
  }

  for (const character of document) {
    if (!(character in characterCounts) || characterCounts[character] === 0) return false;

    characterCounts[character]--;
  }

  return true;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const characters = 'Bste!hetsi ogEAxpelrt x ';
  const document = 'AlgoExpert is the Best!';
  const expected = true;
  const actual = program.generateDocument(characters, document);
  chai.expect(actual).to.deep.equal(expected);
});

```

