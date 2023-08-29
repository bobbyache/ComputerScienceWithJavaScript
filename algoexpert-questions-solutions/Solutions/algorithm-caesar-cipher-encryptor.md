# Caesar Cipher Encryptor
<div class="html">
<p>
  Given a non-empty string of lowercase letters and a non-negative integer
  representing a key, write a function that returns a new string obtained by
  shifting every letter in the input string by k positions in the alphabet,
  where k is the key.
</p>
<p>
  Note that letters should "wrap" around the alphabet; in other words, the
  letter <span>z</span> shifted by one returns the letter <span>a</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">string</span> = "xyz"
<span class="CodeEditor-promptParameter">key</span> = 2
</pre>
<h3>Sample Output</h3>
<pre>
"zab"
</pre>
</div>

Hint 1
<p>
Most languages have built-in functions that give you the Unicode value of a character as well as the character corresponding to a Unicode value. Consider using such functions to determine which letters the input string's letters should be mapped to.
</p>


Hint 2

<p>
Try creating your own mapping of letters to codes. In other words, try associating each letter in the alphabet with a specific number - its position in the alphabet, for instance - and using that to determine which letters the input string's letters should be mapped to.
</p>


Hint 3

<p>
How do you handle cases where a letter gets shifted to a position that requires wrapping around the alphabet? What about cases where the key is very large and causes multiple wrappings around the alphabet? The modulo operator should be your friend here.
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
    RunTest("Test Case 1",
            []() { assert(caesarCypherEncryptor("xyz", 2) == "zab"); });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <numeric>
using namespace std;

char getNewLetter(char letter, int key);

// O(n) time | O(n) space
string caesarCypherEncryptor(string str, int key) {
  vector<char> newLetters;
  int newKey = key % 26;
  for (int i = 0; i < str.length(); i++) {
    newLetters.push_back(getNewLetter(str[i], newKey));
  }
  return string(newLetters.begin(), newLetters.end());
}

char getNewLetter(char letter, int key) {
  int newLetterCode = letter + key;
  return newLetterCode <= 122 ? newLetterCode : 96 + newLetterCode % 122;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <numeric>
using namespace std;

char getNewLetter(char letter, int key, string alphabet);

// O(n) time | O(n) space
string caesarCypherEncryptor(string str, int key) {
  vector<char> newLetters;
  int newKey = key % 26;
  string alphabet = "abcdefghijklmnopqrstuvwxyz";
  for (int i = 0; i < str.length(); i++) {
    newLetters.push_back(getNewLetter(str[i], newKey, alphabet));
  }
  return string(newLetters.begin(), newLetters.end());
}

char getNewLetter(char letter, int key, string alphabet) {
  int newLetterCode = alphabet.find(letter) + key;
  return alphabet[newLetterCode % 26];
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1",
            []() { assert(caesarCypherEncryptor("xyz", 2) == "zab"); });
  }
};

```
### Sandbox Code (csharp)
```csharp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

public class ProgramTest {
	[Test]
	public void TestCase1() {
		Utils.AssertTrue(Program.CaesarCypherEncryptor("xyz", 2).Equals("zab"));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(n) time | O(n) space
	public static string CaesarCypherEncryptor(string str, int key) {
		char[] newLetters = new char[str.Length];
		int newKey = key % 26;
		for (int i = 0; i < str.Length; i++) {
			newLetters[i] = getNewLetter(str[i], newKey);
		}
		return new string(newLetters);
	}

	public static char getNewLetter(char letter, int key) {
		int newLetterCode = letter + key;
		return newLetterCode <=
		       122 ? (char)newLetterCode : (char)(96 + newLetterCode % 122);
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(n) time | O(n) space
	public static string CaesarCypherEncryptor(string str, int key) {
		char[] newLetters = new char[str.Length];
		int newKey = key % 26;
		string alphabet = "abcdefghijklmnopqrstuvwxyz";
		for (int i = 0; i < str.Length; i++) {
			newLetters[i] = getNewLetter(str[i], newKey, alphabet);
		}
		return new string(newLetters);
	}

	public static char getNewLetter(char letter, int key, string alphabet) {
		int newLetterCode = alphabet.IndexOf(letter) + key;
		return alphabet[newLetterCode % 26];
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		Utils.AssertTrue(Program.CaesarCypherEncryptor("xyz", 2).Equals("zab"));
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
	expected := "zab"
	output := CaesarCipherEncryptor("xyz", 2)
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space
func CaesarCipherEncryptor(str string, key int) string {
	shift, offset := rune(key%26), rune(26)
	runes := []rune(str)
	for i, char := range runes {
		if char >= 'a' && char+shift <= 'z' {
			char += shift
		} else {
			char += shift - offset
		}
		runes[i] = char
	}
	return string(runes)
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"strings"
)

// O(n) time | O(n) space
func CaesarCipherEncryptor(str string, key int) string {
	runes := []rune(str)
	alphabet := "abcdefghijklmnopqrstuvwxyz"
	for i, char := range runes {
		index := strings.Index(alphabet, string(char))
		if index == -1 {
			return "" // Bad input
		}
		newindex := (index + key) % 26
		runes[i] = rune(alphabet[newindex])
	}
	return string(runes)
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := "zab"
	output := CaesarCipherEncryptor("xyz", 2)
	require.Equal(t, expected, output)
}

```
### Sandbox Code (java)
```java
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

class ProgramTest {
  @Test
  public void TestCase1() {
    Utils.assertTrue(Program.caesarCypherEncryptor("xyz", 2).equals("zab"));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space
  public static String caesarCypherEncryptor(String str, int key) {
    char[] newLetters = new char[str.length()];
    int newKey = key % 26;
    for (int i = 0; i < str.length(); i++) {
      newLetters[i] = getNewLetter(str.charAt(i), newKey);
    }
    return new String(newLetters);
  }

  public static char getNewLetter(char letter, int key) {
    int newLetterCode = letter + key;
    return newLetterCode <= 122 ? (char) newLetterCode : (char) (96 + newLetterCode % 122);
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space
  public static String caesarCypherEncryptor(String str, int key) {
    char[] newLetters = new char[str.length()];
    int newKey = key % 26;
    String alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (int i = 0; i < str.length(); i++) {
      newLetters[i] = getNewLetter(str.charAt(i), newKey, alphabet);
    }
    return new String(newLetters);
  }

  public static char getNewLetter(char letter, int key, String alphabet) {
    int newLetterCode = alphabet.indexOf(letter) + key;
    return alphabet.charAt(newLetterCode % 26);
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    Utils.assertTrue(Program.caesarCypherEncryptor("xyz", 2).equals("zab"));
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
  chai.expect(program.caesarCipherEncryptor('xyz', 2)).to.deep.equal('zab');
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space
function caesarCipherEncryptor(string, key) {
  const newLetters = [];
  const newKey = key % 26;
  for (const letter of string) {
    newLetters.push(getNewLetter(letter, newKey));
  }
  return newLetters.join('');
}

function getNewLetter(letter, key) {
  const newLetterCode = letter.charCodeAt() + key;
  return newLetterCode <= 122 ? String.fromCharCode(newLetterCode) : String.fromCharCode(96 + (newLetterCode % 122));
}

exports.caesarCipherEncryptor = caesarCipherEncryptor;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space
function caesarCipherEncryptor(string, key) {
  const newLetters = [];
  const newKey = key % 26;
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  for (const letter of string) {
    newLetters.push(getNewLetter(letter, newKey, alphabet));
  }
  return newLetters.join('');
}

function getNewLetter(letter, key, alphabet) {
  const newLetterCode = alphabet.indexOf(letter) + key;
  return alphabet[newLetterCode % 26];
}

exports.caesarCipherEncryptor = caesarCipherEncryptor;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.caesarCipherEncryptor('xyz', 2)).to.deep.equal('zab');
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.caesarCipherEncryptor as caesarCipherEncryptor

class ProgramTest {
    @Test
    fun TestCase1() {
        assert(caesarCipherEncryptor("xyz", 2) == "zab")
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(n) space
fun caesarCipherEncryptor(string: String, key: Int): String {
    val newLetters = mutableListOf<Char>()
    val newKey = key % 26
    for (letter in string) {
        newLetters.add(getNewLetter(letter, newKey))
    }
    return newLetters.joinToString("")
}

fun getNewLetter(letter: Char, key: Int): Char {
    val newLetterCode = letter.toInt() + key
    return if (newLetterCode <= 122) newLetterCode.toChar() else (96 + newLetterCode % 122).toChar()
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(n) space
fun caesarCipherEncryptor(string: String, key: Int): String {
    val newLetters = mutableListOf<Char>()
    val newKey = key % 26
    val alphabet = "abcdefghijklmnopqrstuvwxyz".toCharArray()
    for (letter in string) {
        newLetters.add(getNewLetter(letter, newKey, alphabet))
    }
    return newLetters.joinToString("")
}

fun getNewLetter(letter: Char, key: Int, alphabet: CharArray): Char {
    val newLetterCode = alphabet.indexOf(letter) + key
    return alphabet[newLetterCode % 26]
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.caesarCipherEncryptor as caesarCipherEncryptor

class ProgramTest {
    @Test
    fun TestCase1() {
        assert(caesarCipherEncryptor("xyz", 2) == "zab")
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
      try assertEqual("zab", program.caesarCipherEncryptor(string: "xyz", key: 2))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space
  func caesarCipherEncryptor(string: String, key: UInt32) -> String {
    var newLetters = [Character]()
    let newKey = key % 26

    for letter in string {
      newLetters.append(getNewLetter(letter, newKey))
    }

    return String(newLetters)
  }

  func getNewLetter(_ letter: Character, _ key: UInt32) -> Character {
    let newLetterCode = letter.unicodeScalars.first!.value + key

    let code: UnicodeScalar?

    if newLetterCode <= 122 {
      code = UnicodeScalar(newLetterCode)
    } else {
      code = UnicodeScalar(96 + newLetterCode % 122)
    }

    return Character(code!)
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space
  func caesarCipherEncryptor(string: String, key: UInt32) -> String {
    var newLetters = [Character]()
    let newKey = key % 26

    let alphabet = Array("abcdefghijklmnopqrstuvwxyz")

    for letter in string {
      newLetters.append(getNewLetter(letter, newKey, alphabet))
    }

    return String(newLetters)
  }

  func getNewLetter(_ letter: Character, _ key: UInt32, _ alphabet: [Character]) -> Character {
    let newLetterCode = alphabet.firstIndex(of: letter)! + Int(key)
    return alphabet[newLetterCode % 26]
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      try assertEqual("zab", program.caesarCipherEncryptor(string: "xyz", key: 2))
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
        self.assertEqual(program.caesarCipherEncryptor("xyz", 2), "zab")

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space
def caesarCipherEncryptor(string, key):
    newLetters = []
    newKey = key % 26
    for letter in string:
        newLetters.append(getNewLetter(letter, newKey))
    return "".join(newLetters)


def getNewLetter(letter, key):
    newLetterCode = ord(letter) + key
    return chr(newLetterCode) if newLetterCode <= 122 else chr(96 + newLetterCode % 122)

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space
def caesarCipherEncryptor(string, key):
    newLetters = []
    newKey = key % 26
    alphabet = list("abcdefghijklmnopqrstuvwxyz")
    for letter in string:
        newLetters.append(getNewLetter(letter, newKey, alphabet))
    return "".join(newLetters)


def getNewLetter(letter, key, alphabet):
    newLetterCode = alphabet.index(letter) + key
    return alphabet[newLetterCode % 26]

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.caesarCipherEncryptor("xyz", 2), "zab")

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.caesarCipherEncryptor('xyz', 2)).to.deep.equal('zab');
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space
export function caesarCipherEncryptor(string: string, key: number) {
  const newLetters = [];
  const newKey = key % 26;
  for (const letter of string) {
    newLetters.push(getNewLetter(letter, newKey));
  }
  return newLetters.join('');
}

function getNewLetter(letter: string, key: number) {
  const newLetterCode = letter.charCodeAt(0) + key;
  return newLetterCode <= 122 ? String.fromCharCode(newLetterCode) : String.fromCharCode(96 + (newLetterCode % 122));
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space
export function caesarCipherEncryptor(string: string, key: number) {
  const newLetters = [];
  const newKey = key % 26;
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  for (const letter of string) {
    newLetters.push(getNewLetter(letter, newKey, alphabet));
  }
  return newLetters.join('');
}

function getNewLetter(letter: string, key: number, alphabet: string[]) {
  const newLetterCode = alphabet.indexOf(letter) + key;
  return alphabet[newLetterCode % 26];
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.caesarCipherEncryptor('xyz', 2)).to.deep.equal('zab');
});

```

