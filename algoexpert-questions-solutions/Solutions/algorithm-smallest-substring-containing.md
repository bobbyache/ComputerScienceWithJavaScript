# Smallest Substring Containing
<div class="html">
<p>
  You're given two non-empty strings: a big string and a small string. Write a
  function that returns the smallest substring in the big string that contains
  all of the small string's characters.
</p>
<p>
  Note that:
</p>
<ul>
  <li>
    The substring can contain other characters not found in the small string.
  </li>
  <li>
    The characters in the substring don't have to be in the same order as they
    appear in the small string.
  </li>
  <li>
    If the small string has duplicate characters, the substring has to contain
    those duplicate characters (it can also contain more, but not fewer).
  </li>
</ul>
<p>
  You can assume that there will only be one relevant smallest substring.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">bigString</span> = "abcd$ef$axb$c$"
<span class="CodeEditor-promptParameter">smallString</span> = "$$abf"
</pre>
<h3>Sample Output</h3>
<pre>
"f$axb$"
</pre>
</div>

Hint 1
<p>
Try storing all of the small string's character counts in a hash table where each character maps to the number of times that it appears in the small string.
</p>


Hint 2

<p>
Try using two pointers (a left pointer and a right pointer) to traverse through the big string. How can this help you find the relevant smallest substring?
</p>


Hint 3

<p>
With the two pointers mentioned in Hint #2, move the right pointer to the right in the big string, keeping track of all the characters you visit in a hash table identical to the one mentioned in Hint #1, until you've found all of the characters contained in the small string. At that point, move the left pointer to the right in the big string, keeping track of all the characters you "lose", and stop once you no longer have all of the small string's characters in between the left and right pointers. Then, repeat the process by moving the right pointer forward and implementing the same logic described in this Hint.
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
      string bigString = "abcd$ef$axb$c$";
      string smallString = "$$abf";
      string expected = "f$axb$";
      assert(smallestSubstringContaining(bigString, smallString) == expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <climits>
#include <unordered_map>
#include <vector>

using namespace std;

string smallestSubstringContaining(string bigString, string smallString);
unordered_map<char, int> getCharCounts(string str);
vector<int> getSubstringBounds(string str,
                               unordered_map<char, int> targetCharCounts);
vector<int> getCloserBounds(int idx1, int idx2, int idx3, int idx4);
string getStringFromBounds(string str, vector<int> bounds);
void increaseCharCount(char c, unordered_map<char, int> &charCounts);
void decreaseCharCount(char c, unordered_map<char, int> &charCounts);

// O(b + s) time | O(b + s) space - where b is the length of the big
// input string and s is the length of the small input string
string smallestSubstringContaining(string bigString, string smallString) {
  unordered_map<char, int> targetCharCounts = getCharCounts(smallString);
  vector<int> substringBounds = getSubstringBounds(bigString, targetCharCounts);
  return getStringFromBounds(bigString, substringBounds);
}

unordered_map<char, int> getCharCounts(string str) {
  unordered_map<char, int> charCounts;
  for (auto c : str) {
    increaseCharCount(c, charCounts);
  }
  return charCounts;
}

vector<int> getSubstringBounds(string str,
                               unordered_map<char, int> targetCharCounts) {
  vector<int> substringBounds = {0, INT_MAX};
  unordered_map<char, int> substringCharCounts;
  int numUniqueChars = targetCharCounts.size();
  int numUniqueCharsDone = 0;
  int leftIdx = 0;
  int rightIdx = 0;
  // Move the rightIdx to the right in the string until you've counted
  // all of the target characters enough times.
  while (rightIdx < str.size()) {
    char rightChar = str[rightIdx];
    if (targetCharCounts.find(rightChar) == targetCharCounts.end()) {
      rightIdx++;
      continue;
    }
    increaseCharCount(rightChar, substringCharCounts);
    if (substringCharCounts[rightChar] == targetCharCounts[rightChar]) {
      numUniqueCharsDone++;
    }
    // Move the leftIdx to the right in the string until you no longer
    // have enough of the target characters in between the leftIdx and
    // the rightIdx. Update the substringBounds accordingly.
    while (numUniqueCharsDone == numUniqueChars && leftIdx <= rightIdx) {
      substringBounds = getCloserBounds(leftIdx, rightIdx, substringBounds[0],
                                        substringBounds[1]);
      char leftChar = str[leftIdx];
      if (targetCharCounts.find(leftChar) == targetCharCounts.end()) {
        leftIdx++;
        continue;
      }
      if (substringCharCounts[leftChar] == targetCharCounts[leftChar]) {
        numUniqueCharsDone--;
      }
      decreaseCharCount(leftChar, substringCharCounts);
      leftIdx++;
    }
    rightIdx++;
  }
  return substringBounds;
}

vector<int> getCloserBounds(int idx1, int idx2, int idx3, int idx4) {
  return idx2 - idx1 < idx4 - idx3 ? vector<int>{idx1, idx2}
                                   : vector<int>{idx3, idx4};
}

string getStringFromBounds(string str, vector<int> bounds) {
  int start = bounds[0];
  int end = bounds[1];
  if (end == INT_MAX)
    return "";
  return str.substr(start, end - start + 1);
}

void increaseCharCount(char c, unordered_map<char, int> &charCounts) {
  if (charCounts.find(c) == charCounts.end()) {
    charCounts[c] = 1;
  } else {
    charCounts[c]++;
  }
}

void decreaseCharCount(char c, unordered_map<char, int> &charCounts) {
  charCounts[c]--;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      string bigString = "abcd$ef$axb$c$";
      string smallString = "$$abf";
      string expected = "f$axb$";
      assert(smallestSubstringContaining(bigString, smallString) == expected);
    });
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
		string bigstring = "abcd$ef$axb$c$";
		string smallstring = "$$abf";
		string expected = "f$axb$";
		Utils.AssertTrue(Program.SmallestSubstringContaining(bigstring,
		  smallstring).Equals(expected));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;

public class Program {
	// O(b + s) time | O(b + s) space - where b is the length of the big
	// input string and s is the length of the small input string
	public static string SmallestSubstringContaining(string bigstring, string smallstring) {
		Dictionary<char, int> targetCharCounts = getCharCounts(smallstring);
		List<int> substringBounds = getSubstringBounds(bigstring, targetCharCounts);
		return getstringFromBounds(bigstring, substringBounds);
	}

	public static Dictionary<char, int> getCharCounts(string str) {
		Dictionary<char, int> charCounts = new Dictionary<char, int>();
		for (int i = 0; i < str.Length; i++ ) {
			increaseCharCount(str[i], charCounts);
		}
		return charCounts;
	}

	public static List<int> getSubstringBounds(string str, Dictionary<char,
	  int> targetCharCounts) {
		List<int> substringBounds = new List<int>(){
			0, Int32.MaxValue
		};
		Dictionary<char, int> substringCharCounts = new Dictionary<char, int>();
		int numUniqueChars = targetCharCounts.Count;
		int numUniqueCharsDone = 0;
		int leftIdx = 0;
		int rightIdx = 0;
		// Move the rightIdx to the right in the string until you've counted
		// all of the target characters enough times.
		while (rightIdx < str.Length) {
			char rightChar = str[rightIdx];
			if (!targetCharCounts.ContainsKey(rightChar)) {
				rightIdx++;
				continue;
			}
			increaseCharCount(rightChar, substringCharCounts);
			if (substringCharCounts[rightChar] == targetCharCounts[rightChar]) {
				numUniqueCharsDone++;
			}
			// Move the leftIdx to the right in the string until you no longer
			// have enough of the target characters in between the leftIdx and
			// the rightIdx. Update the substringBounds accordingly.
			while (numUniqueCharsDone == numUniqueChars && leftIdx <= rightIdx) {
				substringBounds = getCloserBounds(leftIdx, rightIdx,
				    substringBounds[0],
				    substringBounds[1]);
				char leftChar = str[leftIdx];
				if (!targetCharCounts.ContainsKey(leftChar)) {
					leftIdx++;
					continue;
				}
				if (substringCharCounts[leftChar] == targetCharCounts[leftChar]) {
					numUniqueCharsDone--;
				}
				decreaseCharCount(leftChar, substringCharCounts);
				leftIdx++;
			}
			rightIdx++;
		}
		return substringBounds;
	}

	public static List<int> getCloserBounds(int idx1, int idx2, int idx3, int idx4) {
		return idx2 - idx1 < idx4 - idx3 ? new List<int>(){
			       idx1, idx2
		}
		       : new List<int>(){
			       idx3, idx4
		       };
	}

	public static string getstringFromBounds(string str, List<int> bounds) {
		int start = bounds[0];
		int end = bounds[1];
		if (end == Int32.MaxValue)
			return "";
		return str.Substring(start, end + 1 - start);
	}

	public static void increaseCharCount(char c, Dictionary<char, int> charCounts) {
		if (!charCounts.ContainsKey(c)) {
			charCounts[c] = 1;
		} else {
			charCounts[c] = charCounts[c] + 1;
		}
	}

	public static void decreaseCharCount(char c, Dictionary<char, int> charCounts) {
		charCounts[c]  = charCounts[c] - 1;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		string bigstring = "abcd$ef$axb$c$";
		string smallstring = "$$abf";
		string expected = "f$axb$";
		Utils.AssertTrue(Program.SmallestSubstringContaining(bigstring,
		  smallstring).Equals(expected));
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
	bigString := "abcd$ef$axb$c$"
	smallString := "$$abf"
	expected := "f$axb$"
	require.Equal(t,
		SmallestSubstringContaining(bigString, smallString), expected,
	)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "math"

// O(b + s) time | O(b + s) space - where b is the length of the big
// input string and s is the length of the small input string
func SmallestSubstringContaining(bigString, smallString string) string {
	targetCharCounts := getCharCounts(smallString)
	substringBounds := getSubstringBounds(bigString, targetCharCounts)
	return getStringFromBounds(bigString, substringBounds)
}

func getCharCounts(str string) map[byte]int {
	charCounts := map[byte]int{}
	for _, char := range str {
		increaseCharCount(byte(char), charCounts)
	}
	return charCounts
}

func getSubstringBounds(str string, targetCharCounts map[byte]int) []int {
	substringBounds := []int{0, math.MaxInt32}
	substringCharCounts := map[byte]int{}
	numUniqueChars := len(targetCharCounts)
	numUniqueCharsDone := 0
	leftIdx := 0
	rightIdx := 0

	// Move the rightIdx to the right in the string until you've counted
	// all of the target characters enough times.
	for rightIdx < len(str) {
		rightChar := str[rightIdx]
		if _, found := targetCharCounts[rightChar]; !found {
			rightIdx++
			continue
		}
		increaseCharCount(rightChar, substringCharCounts)
		if substringCharCounts[rightChar] == targetCharCounts[rightChar] {
			numUniqueCharsDone++
		}

		// Move the leftIdx to the right in the string until you no longer
		// have enough of the target characters in between the leftIdx and
		// the rightIdx. Update the substringBounds accordingly.
		for numUniqueCharsDone == numUniqueChars && leftIdx <= rightIdx {
			substringBounds = getCloserBounds(
				leftIdx, rightIdx, substringBounds[0], substringBounds[1],
			)
			leftChar := str[leftIdx]
			if _, found := targetCharCounts[leftChar]; !found {
				leftIdx++
				continue
			}
			if substringCharCounts[leftChar] == targetCharCounts[leftChar] {
				numUniqueCharsDone--
			}
			decreaseCharCount(leftChar, substringCharCounts)
			leftIdx++
		}
		rightIdx++
	}
	return substringBounds
}

func getCloserBounds(idx1, idx2, idx3, idx4 int) []int {
	if idx2-idx1 < idx4-idx3 {
		return []int{idx1, idx2}
	}
	return []int{idx3, idx4}
}

func getStringFromBounds(str string, bounds []int) string {
	start, end := bounds[0], bounds[1]
	if end == math.MaxInt32 {
		return ""
	}
	return str[start : end+1]
}

func increaseCharCount(char byte, charCounts map[byte]int) {
	charCounts[char]++
}

func decreaseCharCount(char byte, charCounts map[byte]int) {
	charCounts[char]--
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	bigString := "abcd$ef$axb$c$"
	smallString := "$$abf"
	expected := "f$axb$"
	require.Equal(t,
		SmallestSubstringContaining(bigString, smallString), expected,
	)
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
    String bigString = "abcd$ef$axb$c$";
    String smallString = "$$abf";
    String expected = "f$axb$";
    Utils.assertTrue(Program.smallestSubstringContaining(bigString, smallString).equals(expected));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(b + s) time | O(b + s) space - where b is the length of the big
  // input string and s is the length of the small input string
  public static String smallestSubstringContaining(String bigString, String smallString) {
    Map<Character, Integer> targetCharCounts = getCharCounts(smallString);
    List<Integer> substringBounds = getSubstringBounds(bigString, targetCharCounts);
    return getStringFromBounds(bigString, substringBounds);
  }

  public static Map<Character, Integer> getCharCounts(String string) {
    Map<Character, Integer> charCounts = new HashMap<Character, Integer>();
    for (int i = 0; i < string.length(); i++) {
      increaseCharCount(string.charAt(i), charCounts);
    }
    return charCounts;
  }

  public static List<Integer> getSubstringBounds(
      String string, Map<Character, Integer> targetCharCounts) {
    List<Integer> substringBounds = new ArrayList<Integer>(Arrays.asList(0, Integer.MAX_VALUE));
    Map<Character, Integer> substringCharCounts = new HashMap<Character, Integer>();
    int numUniqueChars = targetCharCounts.size();
    int numUniqueCharsDone = 0;
    int leftIdx = 0;
    int rightIdx = 0;
    // Move the rightIdx to the right in the string until you've counted
    // all of the target characters enough times.
    while (rightIdx < string.length()) {
      char rightChar = string.charAt(rightIdx);
      if (!targetCharCounts.containsKey(rightChar)) {
        rightIdx++;
        continue;
      }
      increaseCharCount(rightChar, substringCharCounts);
      if (substringCharCounts.get(rightChar).equals(targetCharCounts.get(rightChar))) {
        numUniqueCharsDone++;
      }
      // Move the leftIdx to the right in the string until you no longer
      // have enough of the target characters in between the leftIdx and
      // the rightIdx. Update the substringBounds accordingly.
      while (numUniqueCharsDone == numUniqueChars && leftIdx <= rightIdx) {
        substringBounds =
            getCloserBounds(leftIdx, rightIdx, substringBounds.get(0), substringBounds.get(1));
        char leftChar = string.charAt(leftIdx);
        if (!targetCharCounts.containsKey(leftChar)) {
          leftIdx++;
          continue;
        }
        if (substringCharCounts.get(leftChar).equals(targetCharCounts.get(leftChar))) {
          numUniqueCharsDone--;
        }
        decreaseCharCount(leftChar, substringCharCounts);
        leftIdx++;
      }
      rightIdx++;
    }
    return substringBounds;
  }

  public static List<Integer> getCloserBounds(int idx1, int idx2, int idx3, int idx4) {
    return idx2 - idx1 < idx4 - idx3
        ? new ArrayList<Integer>(Arrays.asList(idx1, idx2))
        : new ArrayList<Integer>(Arrays.asList(idx3, idx4));
  }

  public static String getStringFromBounds(String string, List<Integer> bounds) {
    int start = bounds.get(0);
    int end = bounds.get(1);
    if (end == Integer.MAX_VALUE) return "";
    return string.substring(start, end + 1);
  }

  public static void increaseCharCount(char c, Map<Character, Integer> charCounts) {
    if (!charCounts.containsKey(c)) {
      charCounts.put(c, 1);
    } else {
      charCounts.put(c, charCounts.get(c) + 1);
    }
  }

  public static void decreaseCharCount(char c, Map<Character, Integer> charCounts) {
    charCounts.put(c, charCounts.get(c) - 1);
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    String bigString = "abcd$ef$axb$c$";
    String smallString = "$$abf";
    String expected = "f$axb$";
    Utils.assertTrue(Program.smallestSubstringContaining(bigString, smallString).equals(expected));
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
  const bigString = 'abcd$ef$axb$c$';
  const smallString = '$$abf';
  const expected = 'f$axb$';
  chai.expect(program.smallestSubstringContaining(bigString, smallString)).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(b + s) time | O(b + s) space - where b is the length of the big
// input string and s is the length of the small input string
function smallestSubstringContaining(bigString, smallString) {
  const targetCharCounts = getCharCounts(smallString);
  const substringBounds = getSubstringBounds(bigString, targetCharCounts);
  return getStringFromBounds(bigString, substringBounds);
}

function getCharCounts(string) {
  const charCounts = {};
  for (const char of string) {
    increaseCharCount(char, charCounts);
  }
  return charCounts;
}

function getSubstringBounds(string, targetCharCounts) {
  let substringBounds = [0, Infinity];
  const substringCharCounts = {};
  const numUniqueChars = Object.keys(targetCharCounts).length;
  let numUniqueCharsDone = 0;
  let leftIdx = 0;
  let rightIdx = 0;
  // Move the rightIdx to the right in the string until you've counted
  // all of the target characters enough times.
  while (rightIdx < string.length) {
    const rightChar = string[rightIdx];
    if (!(rightChar in targetCharCounts)) {
      rightIdx++;
      continue;
    }
    increaseCharCount(rightChar, substringCharCounts);
    if (substringCharCounts[rightChar] === targetCharCounts[rightChar]) {
      numUniqueCharsDone++;
    }
    // Move the leftIdx to the right in the string until you no longer
    // have enough of the target characters in between the leftIdx and
    // the rightIdx. Update the substringBounds accordingly.
    while (numUniqueCharsDone === numUniqueChars && leftIdx <= rightIdx) {
      substringBounds = getCloserBounds(leftIdx, rightIdx, substringBounds[0], substringBounds[1]);
      const leftChar = string[leftIdx];
      if (!(leftChar in targetCharCounts)) {
        leftIdx++;
        continue;
      }
      if (substringCharCounts[leftChar] === targetCharCounts[leftChar]) {
        numUniqueCharsDone--;
      }
      decreaseCharCount(leftChar, substringCharCounts);
      leftIdx++;
    }
    rightIdx++;
  }
  return substringBounds;
}

function getCloserBounds(idx1, idx2, idx3, idx4) {
  return idx2 - idx1 < idx4 - idx3 ? [idx1, idx2] : [idx3, idx4];
}

function getStringFromBounds(string, bounds) {
  const [start, end] = bounds;
  if (end === Infinity) return '';
  return string.slice(start, end + 1);
}

function increaseCharCount(char, charCounts) {
  charCounts[char] = (charCounts[char] || 0) + 1;
}

function decreaseCharCount(char, charCounts) {
  charCounts[char]--;
}

exports.smallestSubstringContaining = smallestSubstringContaining;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const bigString = 'abcd$ef$axb$c$';
  const smallString = '$$abf';
  const expected = 'f$axb$';
  chai.expect(program.smallestSubstringContaining(bigString, smallString)).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.smallestSubstringContaining as smallestSubstringContaining

class ProgramTest {
    @Test
    fun TestCase1() {
        val bigString = "abcd\$ef\$axb\$c\$"
        val smallString = "\$\$abf"
        val expected = "f\$axb\$"
        assert(smallestSubstringContaining(bigString, smallString) == expected)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(b + s) time | O(b + s) space - where b is the length of the big
// input string and s is the length of the small input string
fun smallestSubstringContaining(bigString: String, smallString: String): String {
    val targetCharCounts = getCharCounts(smallString)
    val substringBounds = getSubstringBounds(bigString, targetCharCounts)
    return getStringFromBounds(bigString, substringBounds)
}

fun getCharCounts(string: String): MutableMap<Char, Int> {
    val charCounts = mutableMapOf<Char, Int>()
    for (char in string) {
        increaseCharCount(char, charCounts)
    }
    return charCounts
}

fun getSubstringBounds(string: String, targetCharCounts: MutableMap<Char, Int>): Pair<Int, Int> {
    var substringBounds = Pair(0, Int.MAX_VALUE)
    val substringCharCounts = mutableMapOf<Char, Int>()
    val numUniqueChars = targetCharCounts.count()
    var numUniqueCharsDone = 0
    var leftIdx = 0
    var rightIdx = 0
    // Move the rightIdx to the right in the string until you've counted
    // all of the target characters enough times.
    while (rightIdx < string.length) {
        val rightChar = string[rightIdx]
        if (!targetCharCounts.containsKey(rightChar)) {
            rightIdx++
            continue
        }
        increaseCharCount(rightChar, substringCharCounts)
        if (substringCharCounts[rightChar] == targetCharCounts[rightChar]) {
            numUniqueCharsDone++
        }
        // Move the leftIdx to the right in the string until you no longer
        // have enough of the target characters in between the leftIdx and
        // the rightIdx. Update the substringBounds accordingly.
        while (numUniqueCharsDone == numUniqueChars && leftIdx <= rightIdx) {
            substringBounds = getCloserBounds(leftIdx, rightIdx, substringBounds.first, substringBounds.second)
            val leftChar = string[leftIdx]
            if (!(leftChar in targetCharCounts)) {
                leftIdx++
                continue
            }
            if (substringCharCounts[leftChar] == targetCharCounts[leftChar]) {
                numUniqueCharsDone--
            }
            decreaseCharCount(leftChar, substringCharCounts)
            leftIdx++
        }
        rightIdx++
    }
    return substringBounds
}

fun getCloserBounds(idx1: Int, idx2: Int, idx3: Int, idx4: Int): Pair<Int, Int> {
    return if (idx2 - idx1 < idx4 - idx3) Pair(idx1, idx2) else Pair(idx3, idx4)
}

fun getStringFromBounds(string: String, bounds: Pair<Int, Int>): String {
    val (start, end) = bounds
    if (end == Int.MAX_VALUE) return ""
    return string.substring(start, end + 1)
}

fun increaseCharCount(char: Char, charCounts: MutableMap<Char, Int>) {
    charCounts[char] = charCounts.getOrDefault(char, 0) + 1
}

fun decreaseCharCount(char: Char, charCounts: MutableMap<Char, Int>) {
    charCounts[char] = charCounts.getOrDefault(char, 0) - 1
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.smallestSubstringContaining as smallestSubstringContaining

class ProgramTest {
    @Test
    fun TestCase1() {
        val bigString = "abcd\$ef\$axb\$c\$"
        val smallString = "\$\$abf"
        val expected = "f\$axb\$"
        assert(smallestSubstringContaining(bigString, smallString) == expected)
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
      let bigString = "abcd$ef$axb$c$"
      let smallString = "$$abf"
      let expected = "f$axb$"
      let output = program.smallestSubstringContaining(bigString, smallString)
      try assertEqual(output, expected)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(b + s) time | O(b + s) space - where b is the length of the big
  // input string and s is the length of the small input string
  func smallestSubstringContaining(_ bigString: String, _ smallString: String) -> String {
    let targetCharCounts = getCharCounts(smallString)
    let substringBounds = getSubstringBounds(bigString, targetCharCounts)
    return getStringFromBounds(bigString, substringBounds)
  }

  func getCharCounts(_ str: String) -> [Character: Int] {
    var charCounts = [Character: Int]()
    for char in str {
      changeCharCount(char, &charCounts, 1)
    }
    return charCounts
  }

  func changeCharCount(_ char: Character, _ charCounts: inout [Character: Int], _ change: Int) {
    if let count = charCounts[char] {
      charCounts.updateValue(count + change, forKey: char)
      return
    }
    charCounts[char] = change
  }

  func getSubstringBounds(_ str: String, _ targetCharCounts: [Character: Int]) -> [Int] {
    var substringBounds = [0, Int.max]
    var substringCharCounts = [Character: Int]()
    var numUniqueChars = targetCharCounts.count
    var numUniqueCharsDone = 0
    var leftIdx = 0
    var rightIdx = 0

    // Move the rightIdx to the right in the string until you've counted
    // all of the target characters enough times.
    while rightIdx < str.length {
      let rightStringIndex = str.index(str.startIndex, offsetBy: rightIdx)

      let rightChar = str[rightStringIndex]
      if targetCharCounts[rightChar] == nil {
        rightIdx += 1
        continue
      }
      changeCharCount(rightChar, &substringCharCounts, 1)
      if substringCharCounts[rightChar] == targetCharCounts[rightChar] {
        numUniqueCharsDone += 1
      }

      // Move the leftIdx to the right in the string until you no longer
      // have enough of the target characters in between the leftIdx and
      // the rightIdx. Update the substringBounds accordingly.
      while numUniqueCharsDone == numUniqueChars, leftIdx <= rightIdx {
        let leftStringIndex = str.index(str.startIndex, offsetBy: leftIdx)
        substringBounds = getCloserBounds(leftIdx, rightIdx,
                                          substringBounds[0], substringBounds[1])
        let leftChar = str[leftStringIndex]
        if substringCharCounts[leftChar] == nil {
          leftIdx += 1
          continue
        }
        if substringCharCounts[leftChar] == targetCharCounts[leftChar] {
          numUniqueCharsDone -= 1
        }
        changeCharCount(leftChar, &substringCharCounts, -1)
        leftIdx += 1
      }
      rightIdx += 1
    }

    return substringBounds
  }

  func getCloserBounds(_ idx1: Int, _ idx2: Int, _ idx3: Int, _ idx4: Int) -> [Int] {
    if idx2 - idx1 < idx4 - idx3 {
      return [idx1, idx2]
    }
    return [idx3, idx4]
  }

  func getStringFromBounds(_ str: String, _ bounds: [Int]) -> String {
    let start = bounds[0]
    let end = bounds[1]
    if end == Int.max {
      return ""
    }

    let startIdx = str.index(str.startIndex, offsetBy: start)
    let endIdx = str.index(str.startIndex, offsetBy: end + 1)
    let newStr = str[startIdx ..< endIdx]
    return String(newStr)
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let bigString = "abcd$ef$axb$c$"
      let smallString = "$$abf"
      let expected = "f$axb$"
      let output = program.smallestSubstringContaining(bigString, smallString)
      try assertEqual(output, expected)
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
        bigString = "abcd$ef$axb$c$"
        smallString = "$$abf"
        expected = "f$axb$"
        self.assertEqual(program.smallestSubstringContaining(bigString, smallString), expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(b + s) time | O(b + s) space - where b is the length of the big
# input string and s is the length of the small input string
def smallestSubstringContaining(bigString, smallString):
    targetCharCounts = getCharCounts(smallString)
    substringBounds = getSubstringBounds(bigString, targetCharCounts)
    return getStringFromBounds(bigString, substringBounds)


def getCharCounts(string):
    charCounts = {}
    for char in string:
        increaseCharCount(char, charCounts)
    return charCounts


def getSubstringBounds(string, targetCharCounts):
    substringBounds = [0, float("inf")]
    substringCharCounts = {}
    numUniqueChars = len(targetCharCounts.keys())
    numUniqueCharsDone = 0
    leftIdx = 0
    rightIdx = 0
    # Move the rightIdx to the right in the string until you've counted
    # all of the target characters enough times.
    while rightIdx < len(string):
        rightChar = string[rightIdx]
        if rightChar not in targetCharCounts:
            rightIdx += 1
            continue
        increaseCharCount(rightChar, substringCharCounts)
        if substringCharCounts[rightChar] == targetCharCounts[rightChar]:
            numUniqueCharsDone += 1
        # Move the leftIdx to the right in the string until you no longer
        # have enough of the target characters in between the leftIdx and
        # the rightIdx. Update the substringBounds accordingly.
        while numUniqueCharsDone == numUniqueChars and leftIdx <= rightIdx:
            substringBounds = getCloserBounds(leftIdx, rightIdx, substringBounds[0], substringBounds[1])
            leftChar = string[leftIdx]
            if leftChar not in targetCharCounts:
                leftIdx += 1
                continue
            if substringCharCounts[leftChar] == targetCharCounts[leftChar]:
                numUniqueCharsDone -= 1
            decreaseCharCount(leftChar, substringCharCounts)
            leftIdx += 1
        rightIdx += 1
    return substringBounds


def getCloserBounds(idx1, idx2, idx3, idx4):
    return [idx1, idx2] if idx2 - idx1 < idx4 - idx3 else [idx3, idx4]


def getStringFromBounds(string, bounds):
    start, end = bounds
    if end == float("inf"):
        return ""
    return string[start : end + 1]


def increaseCharCount(char, charCounts):
    if char not in charCounts:
        charCounts[char] = 0
    charCounts[char] += 1


def decreaseCharCount(char, charCounts):
    charCounts[char] -= 1

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        bigString = "abcd$ef$axb$c$"
        smallString = "$$abf"
        expected = "f$axb$"
        self.assertEqual(program.smallestSubstringContaining(bigString, smallString), expected)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const bigString = 'abcd$ef$axb$c$';
  const smallString = '$$abf';
  const expected = 'f$axb$';
  chai.expect(program.smallestSubstringContaining(bigString, smallString)).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

interface CharCounts {
  [key: string]: number;
}

type Bounds = [number, number];

// O(b + s) time | O(b + s) space - where b is the length of the big
// input string and s is the length of the small input string
export function smallestSubstringContaining(bigString: string, smallString: string) {
  const targetCharCounts = getCharCounts(smallString);
  const substringBounds = getSubstringBounds(bigString, targetCharCounts);
  return getStringFromBounds(bigString, substringBounds);
}

function getCharCounts(string: string) {
  const charCounts: CharCounts = {};
  for (const char of string) {
    increaseCharCount(char, charCounts);
  }
  return charCounts;
}

function getSubstringBounds(string: string, targetCharCounts: CharCounts) {
  let substringBounds: Bounds = [0, Infinity];
  const substringCharCounts: CharCounts = {};
  const numUniqueChars = Object.keys(targetCharCounts).length;
  let numUniqueCharsDone = 0;
  let leftIdx = 0;
  let rightIdx = 0;
  // Move the rightIdx to the right in the string until you've counted
  // all of the target characters enough times.
  while (rightIdx < string.length) {
    const rightChar = string[rightIdx];
    if (!(rightChar in targetCharCounts)) {
      rightIdx++;
      continue;
    }
    increaseCharCount(rightChar, substringCharCounts);
    if (substringCharCounts[rightChar] === targetCharCounts[rightChar]) {
      numUniqueCharsDone++;
    }
    // Move the leftIdx to the right in the string until you no longer
    // have enough of the target characters in between the leftIdx and
    // the rightIdx. Update the substringBounds accordingly.
    while (numUniqueCharsDone === numUniqueChars && leftIdx <= rightIdx) {
      substringBounds = getCloserBounds(leftIdx, rightIdx, substringBounds[0], substringBounds[1]);
      const leftChar = string[leftIdx];
      if (!(leftChar in targetCharCounts)) {
        leftIdx++;
        continue;
      }
      if (substringCharCounts[leftChar] === targetCharCounts[leftChar]) {
        numUniqueCharsDone--;
      }
      decreaseCharCount(leftChar, substringCharCounts);
      leftIdx++;
    }
    rightIdx++;
  }
  return substringBounds;
}

function getCloserBounds(idx1: number, idx2: number, idx3: number, idx4: number): Bounds {
  return idx2 - idx1 < idx4 - idx3 ? [idx1, idx2] : [idx3, idx4];
}

function getStringFromBounds(string: string, bounds: Bounds) {
  const [start, end] = bounds;
  if (end === Infinity) return '';
  return string.slice(start, end + 1);
}

function increaseCharCount(char: string, charCounts: CharCounts) {
  charCounts[char] = (charCounts[char] || 0) + 1;
}

function decreaseCharCount(char: string, charCounts: CharCounts) {
  charCounts[char]--;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const bigString = 'abcd$ef$axb$c$';
  const smallString = '$$abf';
  const expected = 'f$axb$';
  chai.expect(program.smallestSubstringContaining(bigString, smallString)).to.deep.equal(expected);
});

```

