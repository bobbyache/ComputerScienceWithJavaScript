# Phone Number Mnemonics
<div class="html">
<p>If you open the keypad of your mobile phone, it'll likely look like this:</p>
<pre>
   ----- ----- -----
  |     |     |     |
  |  1  |  2  |  3  |
  |     | abc | def |
   ----- ----- -----
  |     |     |     |
  |  4  |  5  |  6  |
  | ghi | jkl | mno |
   ----- ----- -----
  |     |     |     |
  |  7  |  8  |  9  |
  | pqrs| tuv | wxyz|
   ----- ----- -----
        |     |
        |  0  |
        |     |
         -----
</pre>
<p>
  Almost every digit is associated with some letters in the alphabet; this
  allows certain phone numbers to spell out actual words. For example, the phone
  number <span>8464747328</span> can be written as <span>timisgreat</span>;
  similarly, the phone number <span>2686463</span> can be written as
  <span>antoine</span> or as <span>ant6463</span>.
</p>
<p>
  It's important to note that a phone number doesn't represent a single sequence
  of letters, but rather multiple combinations of letters. For instance, the
  digit <span>2</span> can represent three different letters (a, b, and c).
</p>
<p>
  A mnemonic is defined as a pattern of letters, ideas, or associations that
  assist in remembering something. Companies oftentimes use a mnemonic for their
  phone number to make it easier to remember.
</p>
<p>
  Given a stringified phone number of any non-zero length, write a function that
  returns all mnemonics for this phone number, in any order.
</p>
<p>
  For this problem, a valid mnemonic may only contain letters and the digits
  <span>0</span> and <span>1</span>. In other words, if a digit is able to be
  represented by a letter, then it must be. Digits <span>0</span> and
  <span>1</span> are the only two digits that don't have letter representations
  on the keypad.
</p>
<p>
  Note that you should rely on the keypad illustrated above for digit-letter
  associations.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">phoneNumber</span> = "1905"
</pre>
<h3>Sample Output</h3>
<pre>
[
  "1w0j",
  "1w0k",
  "1w0l",
  "1x0j",
  "1x0k",
  "1x0l",
  "1y0j",
  "1y0k",
  "1y0l",
  "1z0j",
  "1z0k",
  "1z0l",
]
<span class="CodeEditor-promptComment">// The mnemonics could be ordered differently.</span>
</pre>
</div>

Hint 1
<p>
The first thing you'll need to do is create a mapping from digits to letters. You can do this by creating a hash table mapping all string digits to lists of their respective characters.
</p>


Hint 2

<p>
This problem can be solved fairly easily using recursion. Try generating all characters for the first digit in the phone number one at a time, and for each character, recursively performing the same action on the the next digit, and then on the digit after that, and so on and so forth until you've done so for all digits in the phone number.
</p>


Hint 3

<p>
You can recursively generate characters one digit at a time and store the intermediate results in a array. Once you've reached the last digit in the phone number, you can add the currently generated mnemonic (stored in the previously mentioned array) to a final array that stores all the results.
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
      string phoneNumber = "1905";
      vector<string> expected = {"1w0j", "1w0k", "1w0l", "1x0j",
                                 "1x0k", "1x0l", "1y0j", "1y0k",
                                 "1y0l", "1z0j", "1z0k", "1z0l"};
      auto actual = phoneNumberMnemonics(phoneNumber);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <numeric>
#include <unordered_map>
using namespace std;

void phoneNumberMnemonicsHelper(int idx, string phoneNumber,
                                vector<char> &currentMnemonic,
                                vector<string> &mnemonicsFound);
unordered_map<int, vector<char>> DIGIT_LETTERS{
    {0, {'0'}},           {1, {'1'}},
    {2, {'a', 'b', 'c'}}, {3, {'d', 'e', 'f'}},
    {4, {'g', 'h', 'i'}}, {5, {'j', 'k', 'l'}},
    {6, {'m', 'n', 'o'}}, {7, {'p', 'q', 'r', 's'}},
    {8, {'t', 'u', 'v'}}, {9, {'w', 'x', 'y', 'z'}}};

// O(4^n * n) time | O(4^n * n) space - where
// n is the length of the phone number
vector<string> phoneNumberMnemonics(string phoneNumber) {
  vector<char> currentMnemonic(phoneNumber.size(), '0');
  vector<string> mnemonicsFound;
  cout << (int)'4' << endl;
  phoneNumberMnemonicsHelper(0, phoneNumber, currentMnemonic, mnemonicsFound);
  return mnemonicsFound;
}

void phoneNumberMnemonicsHelper(int idx, string phoneNumber,
                                vector<char> &currentMnemonic,
                                vector<string> &mnemonicsFound) {
  if (idx == phoneNumber.size()) {
    string mnemonic =
        accumulate(currentMnemonic.begin(), currentMnemonic.end(), string{});
    mnemonicsFound.push_back(mnemonic);
  } else {
    int digit = phoneNumber[idx] - '0';
    vector<char> letters = DIGIT_LETTERS[digit];
    for (auto letter : letters) {
      currentMnemonic[idx] = letter;
      phoneNumberMnemonicsHelper(idx + 1, phoneNumber, currentMnemonic,
                                 mnemonicsFound);
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
      string phoneNumber = "1905";
      vector<string> expected = {"1w0j", "1w0k", "1w0l", "1x0j",
                                 "1x0k", "1x0l", "1y0j", "1y0k",
                                 "1y0l", "1z0j", "1z0k", "1z0l"};
      auto actual = phoneNumberMnemonics(phoneNumber);
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
		string phoneNumber = "1905";
		string[] expectedValues = new string[] {
			"1w0j",
			"1w0k",
			"1w0l",
			"1x0j",
			"1x0k",
			"1x0l",
			"1y0j",
			"1y0k",
			"1y0l",
			"1z0j",
			"1z0k",
			"1z0l"
		};
		List<string> expected = new List<string>();
		for (int i = 0; i < expectedValues.Length; i++) {
			expected.Add(expectedValues[i]);
		}
		var actual = new Program().PhoneNumberMnemonics(phoneNumber);
		Utils.AssertTrue(Enumerable.SequenceEqual(expected, actual));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {

	public static Dictionary<char, string[]> DIGIT_LETTERS = new Dictionary<char, string[]> {
		{'0', new string[] {"0"}},
		{'1', new string[] {"1"}},
		{'2', new string[] {"a", "b", "c"}},
		{'3', new string[] {"d", "e", "f"}},
		{'4', new string[] {"g", "h", "i"}},
		{'5', new string[] {"j", "k", "l"}},
		{'6', new string[] {"m", "n", "o"}},
		{'7', new string[] {"p", "q", "r", "s"}},
		{'8', new string[] {"t", "u", "v"}},
		{'9', new string[] {"w", "x", "y", "z"}}
	};

	// O(4^n * n) time | O(4^n * n) space - where
	// n is the length of the phone number
	public List<string> PhoneNumberMnemonics(string phoneNumber) {

		string[] currentMnemonic = new string[phoneNumber.Length];
		Array.Fill(currentMnemonic, "0");

		List<string> mnemonicsFound = new List<string>();
		PhoneNumberMnemonicsHelper(0, phoneNumber, currentMnemonic, mnemonicsFound);
		return mnemonicsFound;
	}

	public void PhoneNumberMnemonicsHelper(int idx, string phoneNumber,
	  string[] currentMnemonic,
	  List<string> mnemonicsFound) {
		if (idx == phoneNumber.Length) {
			string mnemonic = String.Join("", currentMnemonic);
			mnemonicsFound.Add(mnemonic);
		} else {
			char digit = phoneNumber[idx];
			string[] letters = DIGIT_LETTERS[digit];
			foreach (var letter in letters) {
				currentMnemonic[idx] = letter;
				PhoneNumberMnemonicsHelper(idx + 1, phoneNumber, currentMnemonic,
				  mnemonicsFound);
			}
		}
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
		string phoneNumber = "1905";
		string[] expectedValues = new string[] {
			"1w0j",
			"1w0k",
			"1w0l",
			"1x0j",
			"1x0k",
			"1x0l",
			"1y0j",
			"1y0k",
			"1y0l",
			"1z0j",
			"1z0k",
			"1z0l"
		};
		List<string> expected = new List<string>();
		for (int i = 0; i < expectedValues.Length; i++) {
			expected.Add(expectedValues[i]);
		}
		var actual = new Program().PhoneNumberMnemonics(phoneNumber);
		Utils.AssertTrue(Enumerable.SequenceEqual(expected, actual));
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
	phoneNumber := "1905"
	expected := []string{
		"1w0j",
		"1w0k",
		"1w0l",
		"1x0j",
		"1x0k",
		"1x0l",
		"1y0j",
		"1y0k",
		"1y0l",
		"1z0j",
		"1z0k",
		"1z0l",
	}
	actual := PhoneNumberMnemonics(phoneNumber)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(4^n * n) time | O(4^n * n) space - where
// n is the length of the phone number
func PhoneNumberMnemonics(phoneNumber string) []string {
	currentMnemonic := make([]byte, len(phoneNumber))
	for i := range currentMnemonic {
		currentMnemonic[i] = '0'
	}
	mnemonicsFound := make([]string, 0)

	phoneNumberMnemonicsHelper(0, phoneNumber, currentMnemonic, &mnemonicsFound)
	return mnemonicsFound
}

func phoneNumberMnemonicsHelper(idx int, phoneNumber string, currentMnemonic []byte, mnemonicsFound *[]string) {
	if idx == len(phoneNumber) {
		mnemonic := string(currentMnemonic)
		*mnemonicsFound = append(*mnemonicsFound, mnemonic)
	} else {
		digit := phoneNumber[idx]
		letters := DigitLetters[digit]
		for _, letter := range letters {
			currentMnemonic[idx] = letter
			phoneNumberMnemonicsHelper(idx+1, phoneNumber, currentMnemonic, mnemonicsFound)
		}
	}
}

var DigitLetters = map[byte][]byte{
	'0': {'0'},
	'1': {'1'},
	'2': {'a', 'b', 'c'},
	'3': {'d', 'e', 'f'},
	'4': {'g', 'h', 'i'},
	'5': {'j', 'k', 'l'},
	'6': {'m', 'n', 'o'},
	'7': {'p', 'q', 'r', 's'},
	'8': {'t', 'u', 'v'},
	'9': {'w', 'x', 'y', 'z'},
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	phoneNumber := "1905"
	expected := []string{
		"1w0j",
		"1w0k",
		"1w0l",
		"1x0j",
		"1x0k",
		"1x0l",
		"1y0j",
		"1y0k",
		"1y0l",
		"1z0j",
		"1z0k",
		"1z0l",
	}
	actual := PhoneNumberMnemonics(phoneNumber)
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
    String phoneNumber = "1905";
    String[] expectedValues =
        new String[] {
          "1w0j", "1w0k", "1w0l", "1x0j", "1x0k", "1x0l", "1y0j", "1y0k", "1y0l", "1z0j", "1z0k",
          "1z0l"
        };
    ArrayList<String> expected = new ArrayList<String>();
    for (int i = 0; i < expectedValues.length; i++) {
      expected.add(expectedValues[i]);
    }
    var actual = new Program().phoneNumberMnemonics(phoneNumber);
    Utils.assertTrue(expected.equals(actual));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  public static Map<Character, String[]> DIGIT_LETTERS = new HashMap<Character, String[]>();

  static {
    DIGIT_LETTERS.put('0', new String[] {"0"});
    DIGIT_LETTERS.put('1', new String[] {"1"});
    DIGIT_LETTERS.put('2', new String[] {"a", "b", "c"});
    DIGIT_LETTERS.put('3', new String[] {"d", "e", "f"});
    DIGIT_LETTERS.put('4', new String[] {"g", "h", "i"});
    DIGIT_LETTERS.put('5', new String[] {"j", "k", "l"});
    DIGIT_LETTERS.put('6', new String[] {"m", "n", "o"});
    DIGIT_LETTERS.put('7', new String[] {"p", "q", "r", "s"});
    DIGIT_LETTERS.put('8', new String[] {"t", "u", "v"});
    DIGIT_LETTERS.put('9', new String[] {"w", "x", "y", "z"});
  }

  // O(4^n * n) time | O(4^n * n) space - where
  // n is the length of the phone number
  public ArrayList<String> phoneNumberMnemonics(String phoneNumber) {

    String[] currentMnemonic = new String[phoneNumber.length()];
    Arrays.fill(currentMnemonic, "0");

    ArrayList<String> mnemonicsFound = new ArrayList<String>();
    phoneNumberMnemonicsHelper(0, phoneNumber, currentMnemonic, mnemonicsFound);
    return mnemonicsFound;
  }

  public void phoneNumberMnemonicsHelper(
      int idx, String phoneNumber, String[] currentMnemonic, ArrayList<String> mnemonicsFound) {
    if (idx == phoneNumber.length()) {
      String mnemonic = String.join("", currentMnemonic);
      mnemonicsFound.add(mnemonic);
    } else {
      char digit = phoneNumber.charAt(idx);
      String[] letters = DIGIT_LETTERS.get(digit);
      for (String letter : letters) {
        currentMnemonic[idx] = letter;
        phoneNumberMnemonicsHelper(idx + 1, phoneNumber, currentMnemonic, mnemonicsFound);
      }
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
    String phoneNumber = "1905";
    String[] expectedValues =
        new String[] {
          "1w0j", "1w0k", "1w0l", "1x0j", "1x0k", "1x0l", "1y0j", "1y0k", "1y0l", "1z0j", "1z0k",
          "1z0l"
        };
    ArrayList<String> expected = new ArrayList<String>();
    for (int i = 0; i < expectedValues.length; i++) {
      expected.add(expectedValues[i]);
    }
    var actual = new Program().phoneNumberMnemonics(phoneNumber);
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
  const phoneNumber = '1905';
  const expected = ['1w0j', '1w0k', '1w0l', '1x0j', '1x0k', '1x0l', '1y0j', '1y0k', '1y0l', '1z0j', '1z0k', '1z0l'];
  const actual = program.phoneNumberMnemonics(phoneNumber);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(4^n * n) time | O(4^n * n) space - where
// n is the length of the phone number
function phoneNumberMnemonics(phoneNumber) {
  const currentMnemonic = new Array(phoneNumber.length).fill('0');
  const mnemonicsFound = [];

  phoneNumberMnemonicsHelper(0, phoneNumber, currentMnemonic, mnemonicsFound);
  return mnemonicsFound;
}

function phoneNumberMnemonicsHelper(idx, phoneNumber, currentMnemonic, mnemonicsFound) {
  if (idx === phoneNumber.length) {
    const mnemonic = currentMnemonic.join('');
    mnemonicsFound.push(mnemonic);
  } else {
    const digit = phoneNumber[idx];
    const letters = DIGIT_LETTERS[digit];
    for (const letter of letters) {
      currentMnemonic[idx] = letter;
      phoneNumberMnemonicsHelper(idx + 1, phoneNumber, currentMnemonic, mnemonicsFound);
    }
  }
}

const DIGIT_LETTERS = {
  0: ['0'],
  1: ['1'],
  2: ['a', 'b', 'c'],
  3: ['d', 'e', 'f'],
  4: ['g', 'h', 'i'],
  5: ['j', 'k', 'l'],
  6: ['m', 'n', 'o'],
  7: ['p', 'q', 'r', 's'],
  8: ['t', 'u', 'v'],
  9: ['w', 'x', 'y', 'z'],
};

// Do not edit the line below.
exports.phoneNumberMnemonics = phoneNumberMnemonics;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const phoneNumber = '1905';
  const expected = ['1w0j', '1w0k', '1w0l', '1x0j', '1x0k', '1x0l', '1y0j', '1y0k', '1y0l', '1z0j', '1z0k', '1z0l'];
  const actual = program.phoneNumberMnemonics(phoneNumber);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.phoneNumberMnemonics

class ProgramTest {
    @Test
    fun TestCase1() {
        val phoneNumber = "1905"
        val expected = listOf(
            "1w0j",
            "1w0k",
            "1w0l",
            "1x0j",
            "1x0k",
            "1x0l",
            "1y0j",
            "1y0k",
            "1y0l",
            "1z0j",
            "1z0k",
            "1z0l"
        )
        val output = phoneNumberMnemonics(phoneNumber)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(4^n * n) time | O(4^n * n) space - where
// n is the length of the phone number
fun phoneNumberMnemonics(phoneNumber: String): List<String> {
    val currentMnemonic = MutableList(phoneNumber.length) { '0' }
    val mnemonicsFound = mutableListOf<String>()

    phoneNumberMnemonicsHelper(0, phoneNumber, currentMnemonic, mnemonicsFound)
    return mnemonicsFound
}

fun phoneNumberMnemonicsHelper(idx: Int, phoneNumber: String, currentMnemonic: MutableList<Char>, mnemonicsFound: MutableList<String>) {
    if (idx == phoneNumber.length) {
        val mnemonic = currentMnemonic.joinToString("")
        mnemonicsFound.add(mnemonic)
    } else {
        val digit = phoneNumber[idx]
        val letters = DIGIT_LETTERS[digit]!!
        for (letter in letters) {
            currentMnemonic[idx] = letter
            phoneNumberMnemonicsHelper(idx + 1, phoneNumber, currentMnemonic, mnemonicsFound)
        }
    }
}

val DIGIT_LETTERS = mutableMapOf(
    '0' to listOf('0'),
    '1' to listOf('1'),
    '2' to listOf('a', 'b', 'c'),
    '3' to listOf('d', 'e', 'f'),
    '4' to listOf('g', 'h', 'i'),
    '5' to listOf('j', 'k', 'l'),
    '6' to listOf('m', 'n', 'o'),
    '7' to listOf('p', 'q', 'r', 's'),
    '8' to listOf('t', 'u', 'v'),
    '9' to listOf('w', 'x', 'y', 'z')
)

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.phoneNumberMnemonics

class ProgramTest {
    @Test
    fun TestCase1() {
        val phoneNumber = "1905"
        val expected = listOf(
            "1w0j",
            "1w0k",
            "1w0l",
            "1x0j",
            "1x0k",
            "1x0l",
            "1y0j",
            "1y0k",
            "1y0l",
            "1z0j",
            "1z0k",
            "1z0l"
        )
        val output = phoneNumberMnemonics(phoneNumber)
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
      let phoneNumber = "1905"
      let expected = [
        "1w0j",
        "1w0k",
        "1w0l",
        "1x0j",
        "1x0k",
        "1x0l",
        "1y0j",
        "1y0k",
        "1y0l",
        "1z0j",
        "1z0k",
        "1z0l",
      ]
      var actual = Program().phoneNumberMnemonics(phoneNumber)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(4^n * n) time | O(4^n * n) space - where
  // n is the length of the phone number
  func phoneNumberMnemonics(_ phoneNumber: String) -> [String] {
    var currentMnemonic = Array(repeating: Character("0"), count: phoneNumber.count)
    var mnemonicsFound = [String]()
    var indexedPhoneNumber = Array(phoneNumber)

    phoneNumberMnemonicsHelper(0, &indexedPhoneNumber, &currentMnemonic, &mnemonicsFound)
    return mnemonicsFound
  }

  func phoneNumberMnemonicsHelper(_ idx: Int, _ phoneNumber: inout [Character], _ currentMnemonic: inout [Character],
                                  _ mnemonicsFound: inout [String])
  {
    if idx == phoneNumber.count {
      let mnemonic = String(currentMnemonic)
      mnemonicsFound.append(mnemonic)
    } else {
      let digit = phoneNumber[idx]
      let letters = DigitLetters[digit]!
      for letter in letters {
        currentMnemonic[idx] = letter
        phoneNumberMnemonicsHelper(idx + 1, &phoneNumber, &currentMnemonic, &mnemonicsFound)
      }
    }
  }

  let DigitLetters: [Character: [Character]] = [
    "0": ["0"],
    "1": ["1"],
    "2": ["a", "b", "c"],
    "3": ["d", "e", "f"],
    "4": ["g", "h", "i"],
    "5": ["j", "k", "l"],
    "6": ["m", "n", "o"],
    "7": ["p", "q", "r", "s"],
    "8": ["t", "u", "v"],
    "9": ["w", "x", "y", "z"],
  ]
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let phoneNumber = "1905"
      let expected = [
        "1w0j",
        "1w0k",
        "1w0l",
        "1x0j",
        "1x0k",
        "1x0l",
        "1y0j",
        "1y0k",
        "1y0l",
        "1z0j",
        "1z0k",
        "1z0l",
      ]
      var actual = Program().phoneNumberMnemonics(phoneNumber)
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
        phoneNumber = "1905"
        expected = ["1w0j", "1w0k", "1w0l", "1x0j", "1x0k", "1x0l", "1y0j", "1y0k", "1y0l", "1z0j", "1z0k", "1z0l"]
        actual = program.phoneNumberMnemonics(phoneNumber)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(4^n * n) time | O(4^n * n) space - where
# n is the length of the phone number
def phoneNumberMnemonics(phoneNumber):
    currentMnemonic = ["0"] * len(phoneNumber)
    mnemonicsFound = []

    phoneNumberMnemonicsHelper(0, phoneNumber, currentMnemonic, mnemonicsFound)
    return mnemonicsFound


def phoneNumberMnemonicsHelper(idx, phoneNumber, currentMnemonic, mnemonicsFound):
    if idx == len(phoneNumber):
        mnemonic = "".join(currentMnemonic)
        mnemonicsFound.append(mnemonic)
    else:
        digit = phoneNumber[idx]
        letters = DIGIT_LETTERS[digit]
        for letter in letters:
            currentMnemonic[idx] = letter
            phoneNumberMnemonicsHelper(idx + 1, phoneNumber, currentMnemonic, mnemonicsFound)


DIGIT_LETTERS = {
    "0": ["0"],
    "1": ["1"],
    "2": ["a", "b", "c"],
    "3": ["d", "e", "f"],
    "4": ["g", "h", "i"],
    "5": ["j", "k", "l"],
    "6": ["m", "n", "o"],
    "7": ["p", "q", "r", "s"],
    "8": ["t", "u", "v"],
    "9": ["w", "x", "y", "z"],
}

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        phoneNumber = "1905"
        expected = ["1w0j", "1w0k", "1w0l", "1x0j", "1x0k", "1x0l", "1y0j", "1y0k", "1y0l", "1z0j", "1z0k", "1z0l"]
        actual = program.phoneNumberMnemonics(phoneNumber)
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
  const phoneNumber = '1905';
  const expected = ['1w0j', '1w0k', '1w0l', '1x0j', '1x0k', '1x0l', '1y0j', '1y0k', '1y0l', '1z0j', '1z0k', '1z0l'];
  const actual = program.phoneNumberMnemonics(phoneNumber);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(4^n * n) time | O(4^n * n) space - where
// n is the length of the phone number
export function phoneNumberMnemonics(phoneNumber: string) {
  const currentMnemonic = new Array(phoneNumber.length).fill('0');
  const mnemonicsFound: string[] = [];

  phoneNumberMnemonicsHelper(0, phoneNumber, currentMnemonic, mnemonicsFound);
  return mnemonicsFound;
}

function phoneNumberMnemonicsHelper(
  idx: number,
  phoneNumber: string,
  currentMnemonic: string[],
  mnemonicsFound: string[],
) {
  if (idx === phoneNumber.length) {
    const mnemonic = currentMnemonic.join('');
    mnemonicsFound.push(mnemonic);
  } else {
    const digit = phoneNumber[idx];
    const letters = DIGIT_LETTERS[digit];
    for (const letter of letters) {
      currentMnemonic[idx] = letter;
      phoneNumberMnemonicsHelper(idx + 1, phoneNumber, currentMnemonic, mnemonicsFound);
    }
  }
}

const DIGIT_LETTERS: {[digit: string]: string[]} = {
  0: ['0'],
  1: ['1'],
  2: ['a', 'b', 'c'],
  3: ['d', 'e', 'f'],
  4: ['g', 'h', 'i'],
  5: ['j', 'k', 'l'],
  6: ['m', 'n', 'o'],
  7: ['p', 'q', 'r', 's'],
  8: ['t', 'u', 'v'],
  9: ['w', 'x', 'y', 'z'],
};

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const phoneNumber = '1905';
  const expected = ['1w0j', '1w0k', '1w0l', '1x0j', '1x0k', '1x0l', '1y0j', '1y0k', '1y0l', '1z0j', '1z0k', '1z0l'];
  const actual = program.phoneNumberMnemonics(phoneNumber);
  chai.expect(actual).to.deep.equal(expected);
});

```

