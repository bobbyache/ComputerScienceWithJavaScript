# Longest Palindromic Substring
<div class="html">
<p>
  Write a function that, given a string, returns its longest palindromic
  substring.
</p>
<p>
  A palindrome is defined as a string that's written the same forward and
  backward. Note that single-character strings are palindromes.
</p>
<p>You can assume that there will only be one longest palindromic substring.</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">string</span> = "abaxyzzyxf"
</pre>
<h3>Sample Output</h3>
<pre>
"xyzzyx"
</pre>
</div>

Hint 1
<p>
Try generating all possible substrings of the input string and checking for their palindromicity. What is the runtime of the isPalindrome check? What is the total runtime of this approach?
</p>


Hint 2

<p>
Recognize that a palindrome is a string that is symmetrical with respect to its center, which can either be a character (in the case of odd-length palindromes) or an empty string (in the case of even-length palindromes). Thus, you can check the palindromicity of a string by simply expanding from its center and making sure that characters on both sides are indeed mirrored.
</p>


Hint 3

<p>
Traverse the input string, and at each index, apply the logic mentioned in Hint #2. What does this accomplish? Is the runtime of this approach better?
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
      assert(longestPalindromicSubstring("abaxyzzyxf") == "xyzzyx");
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

bool isPalindrome(string str);

// O(n^3) time | O(n) space
string longestPalindromicSubstring(string str) {
  string longest = "";
  for (int i = 0; i < str.length(); i++) {
    for (int j = i; j < str.length(); j++) {
      string substring = str.substr(i, j + 1 - i);
      if (substring.length() > longest.length() && isPalindrome(substring)) {
        longest = substring;
      }
    }
  }
  return longest;
}

bool isPalindrome(string str) {
  int leftIdx = 0;
  int rightIdx = str.length() - 1;
  while (leftIdx < rightIdx) {
    if (str[leftIdx] != str[rightIdx]) {
      return false;
    }
    leftIdx++;
    rightIdx--;
  }
  return true;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

vector<int> getLongestPalindromeFrom(string str, int leftIdx, int rightIdx);

// O(n^2) time | O(n) space
string longestPalindromicSubstring(string str) {
  vector<int> currentLongest{0, 1};
  for (int i = 1; i < str.length(); i++) {
    vector<int> odd = getLongestPalindromeFrom(str, i - 1, i + 1);
    vector<int> even = getLongestPalindromeFrom(str, i - 1, i);
    vector<int> longest = odd[1] - odd[0] > even[1] - even[0] ? odd : even;
    currentLongest =
        currentLongest[1] - currentLongest[0] > longest[1] - longest[0]
            ? currentLongest
            : longest;
  }
  return str.substr(currentLongest[0], currentLongest[1] - currentLongest[0]);
}

vector<int> getLongestPalindromeFrom(string str, int leftIdx, int rightIdx) {
  while (leftIdx >= 0 && rightIdx < str.length()) {
    if (str[leftIdx] != str[rightIdx]) {
      break;
    }
    leftIdx--;
    rightIdx++;
  }
  return vector<int>{leftIdx + 1, rightIdx};
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      assert(longestPalindromicSubstring("abaxyzzyxf") == "xyzzyx");
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
		Utils.AssertTrue(Program.LongestPalindromicSubstring("abaxyzzyxf").Equals("xyzzyx"));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(n^3) time | O(n) space
	public static string LongestPalindromicSubstring(string str) {
		string longest = "";
		for (int i = 0; i < str.Length; i++) {
			for (int j = i; j < str.Length; j++) {
				string substring = str.Substring(i, j + 1 - i);
				if (substring.Length > longest.Length && IsPalindrome(substring)) {
					longest = substring;
				}
			}
		}
		return longest;
	}

	public static bool IsPalindrome(string str) {
		int leftIdx = 0;
		int rightIdx = str.Length - 1;
		while (leftIdx < rightIdx) {
			if (str[leftIdx] != str[rightIdx]) {
				return false;
			}
			leftIdx++;
			rightIdx--;
		}
		return true;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(n^2) time | O(n) space
	public static string LongestPalindromicSubstring(string str) {
		int[] currentLongest = {0, 1};
		for (int i = 1; i < str.Length; i++) {
			int[] odd = getLongestPalindromeFrom(str, i - 1, i + 1);
			int[] even = getLongestPalindromeFrom(str, i - 1, i);
			int[] longest = odd[1] - odd[0] > even[1] - even[0] ? odd : even;
			currentLongest = currentLongest[1] - currentLongest[0] >
			  longest[1] - longest[0] ? currentLongest : longest;
		}
		return str.Substring(currentLongest[0], currentLongest[1] - currentLongest[0]);
	}

	public static int[] getLongestPalindromeFrom(string str, int leftIdx, int rightIdx) {
		while (leftIdx >= 0 && rightIdx < str.Length) {
			if (str[leftIdx] != str[rightIdx]) {
				break;
			}
			leftIdx--;
			rightIdx++;
		}
		return new int[] {leftIdx + 1, rightIdx};
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		Utils.AssertTrue(Program.LongestPalindromicSubstring("abaxyzzyxf").Equals("xyzzyx"));
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
	expected := "xyzzyx"
	output := LongestPalindromicSubstring("abaxyzzyxf")
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n^3) time | O(n) space
func LongestPalindromicSubstring(str string) string {
	longest := ""
	for i := range str {
		for j := i; j < len(str); j++ {
			substring := str[i : j+1]
			if len(substring) > len(longest) && isPalindrome(substring) {
				longest = substring
			}
		}
	}
	return longest
}

func isPalindrome(str string) bool {
	for i := range str {
		j := len(str) - i - 1
		if str[i] != str[j] {
			return false
		}
	}
	return true
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type substring struct {
	left  int
	right int
}

func (ss substring) length() int {
	return ss.right - ss.left
}

// O(n^2) time | O(n) space
func LongestPalindromicSubstring(str string) string {
	result := substring{0, 1}
	for i := 1; i < len(str); i++ {
		odd := getLongestPalindromeFrom(str, i-1, i+1)
		even := getLongestPalindromeFrom(str, i-1, i)
		longest := even
		if odd.length() > even.length() {
			longest = odd
		}
		if longest.length() > result.length() {
			result = longest
		}
	}
	return str[result.left:result.right]
}

func getLongestPalindromeFrom(str string, leftIndex, rightIndex int) substring {
	for leftIndex >= 0 && rightIndex < len(str) {
		if str[leftIndex] != str[rightIndex] {
			break
		}
		leftIndex -= 1
		rightIndex += 1
	}
	return substring{leftIndex + 1, rightIndex}
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := "xyzzyx"
	output := LongestPalindromicSubstring("abaxyzzyxf")
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
    Utils.assertTrue(Program.longestPalindromicSubstring("abaxyzzyxf").equals("xyzzyx"));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^3) time | O(n) space
  public static String longestPalindromicSubstring(String str) {
    String longest = "";
    for (int i = 0; i < str.length(); i++) {
      for (int j = i; j < str.length(); j++) {
        String substring = str.substring(i, j + 1);
        if (substring.length() > longest.length() && isPalindrome(substring)) {
          longest = substring;
        }
      }
    }
    return longest;
  }

  public static boolean isPalindrome(String str) {
    int leftIdx = 0;
    int rightIdx = str.length() - 1;
    while (leftIdx < rightIdx) {
      if (str.charAt(leftIdx) != str.charAt(rightIdx)) {
        return false;
      }
      leftIdx++;
      rightIdx--;
    }
    return true;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(n) space
  public static String longestPalindromicSubstring(String str) {
    int[] currentLongest = {0, 1};
    for (int i = 1; i < str.length(); i++) {
      int[] odd = getLongestPalindromeFrom(str, i - 1, i + 1);
      int[] even = getLongestPalindromeFrom(str, i - 1, i);
      int[] longest = odd[1] - odd[0] > even[1] - even[0] ? odd : even;
      currentLongest =
          currentLongest[1] - currentLongest[0] > longest[1] - longest[0]
              ? currentLongest
              : longest;
    }
    return str.substring(currentLongest[0], currentLongest[1]);
  }

  public static int[] getLongestPalindromeFrom(String str, int leftIdx, int rightIdx) {
    while (leftIdx >= 0 && rightIdx < str.length()) {
      if (str.charAt(leftIdx) != str.charAt(rightIdx)) {
        break;
      }
      leftIdx--;
      rightIdx++;
    }
    return new int[] {leftIdx + 1, rightIdx};
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    Utils.assertTrue(Program.longestPalindromicSubstring("abaxyzzyxf").equals("xyzzyx"));
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
  chai.expect(program.longestPalindromicSubstring('abaxyzzyxf')).to.deep.equal('xyzzyx');
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^3) time | O(n) space
function longestPalindromicSubstring(string) {
  let longest = '';
  for (let i = 0; i < string.length; i++) {
    for (let j = i; j < string.length; j++) {
      const substring = string.slice(i, j + 1);
      if (substring.length > longest.length && isPalindrome(substring)) {
        longest = substring;
      }
    }
  }
  return longest;
}

function isPalindrome(string) {
  let leftIdx = 0;
  let rightIdx = string.length - 1;
  while (leftIdx < rightIdx) {
    if (string[leftIdx] !== string[rightIdx]) return false;
    leftIdx++;
    rightIdx--;
  }
  return true;
}

exports.longestPalindromicSubstring = longestPalindromicSubstring;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space
function longestPalindromicSubstring(string) {
  let currentLongest = [0, 1];
  for (let i = 1; i < string.length; i++) {
    const odd = getLongestPalindromeFrom(string, i - 1, i + 1);
    const even = getLongestPalindromeFrom(string, i - 1, i);
    const longest = odd[1] - odd[0] > even[1] - even[0] ? odd : even;
    currentLongest = currentLongest[1] - currentLongest[0] > longest[1] - longest[0] ? currentLongest : longest;
  }
  return string.slice(currentLongest[0], currentLongest[1]);
}

function getLongestPalindromeFrom(string, leftIdx, rightIdx) {
  while (leftIdx >= 0 && rightIdx < string.length) {
    if (string[leftIdx] !== string[rightIdx]) break;
    leftIdx--;
    rightIdx++;
  }
  return [leftIdx + 1, rightIdx];
}

exports.longestPalindromicSubstring = longestPalindromicSubstring;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.longestPalindromicSubstring('abaxyzzyxf')).to.deep.equal('xyzzyx');
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.longestPalindromicSubstring as longestPalindromicSubstring

class ProgramTest {
    @Test
    fun TestCase1() {
        assert(longestPalindromicSubstring("abaxyzzyxf") == "xyzzyx")
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^3) time | O(n) space
fun longestPalindromicSubstring(string: String): String {
    var longest = ""
    for (i in 0 until string.length) {
        for (j in i until string.length) {
            val substring = string.substring(i, j + 1)
            if (substring.length > longest.length && isPalindrome(substring)) {
                longest = substring
            }
        }
    }
    return longest
}

fun isPalindrome(string: String): Boolean {
    var leftIdx = 0
    var rightIdx = string.length - 1
    while (leftIdx < rightIdx) {
        if (string[leftIdx] != string[rightIdx]) return false
        leftIdx++
        rightIdx--
    }
    return true
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^2) time | O(n) space
fun longestPalindromicSubstring(string: String): String {
    var currentLongest = Pair(0, 1)
    for (i in 1 until string.length) {
        val odd = getLongestPalindromeFrom(string, i - 1, i + 1)
        val even = getLongestPalindromeFrom(string, i - 1, i)
        val longest = if (odd.second - odd.first > even.second - even.first) odd else even
        currentLongest = if (currentLongest.second - currentLongest.first > longest.second - longest.first) currentLongest else longest
    }
    return string.substring(currentLongest.first, currentLongest.second)
}

fun getLongestPalindromeFrom(string: String, leftIdx: Int, rightIdx: Int): Pair<Int, Int> {
    var newLeftIdx = leftIdx
    var newRightIdx = rightIdx
    while (newLeftIdx >= 0 && newRightIdx < string.length) {
        if (string[newLeftIdx] !== string[newRightIdx]) break
        newLeftIdx--
        newRightIdx++
    }
    return Pair(newLeftIdx + 1, newRightIdx)
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.longestPalindromicSubstring as longestPalindromicSubstring

class ProgramTest {
    @Test
    fun TestCase1() {
        assert(longestPalindromicSubstring("abaxyzzyxf") == "xyzzyx")
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
      try assertEqual("xyzzyx", program.longestPalindromicSubstring(string: "abaxyzzyxf"))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^3) time | O(n) space
  func longestPalindromicSubstring(string: String) -> String {
    var longest = ""

    for i in 0 ..< string.count {
      for j in i ..< string.count {
        let leftIndex = string.index(string.startIndex, offsetBy: i)
        let rightIndex = string.index(string.startIndex, offsetBy: j + 1)
        let substring = String(string[leftIndex ..< rightIndex])

        if substring.count > longest.count, isPalindrome(string: substring) {
          longest = substring
        }
      }
    }

    return longest
  }

  func isPalindrome(string: String) -> Bool {
    var leftPointer = 0
    var rightPointer = string.count - 1
    var leftIndex = string.index(string.startIndex, offsetBy: leftPointer)
    var rightIndex = string.index(string.startIndex, offsetBy: rightPointer)

    while leftIndex < rightIndex {
      if string[leftIndex] != string[rightIndex] {
        return false
      }

      leftPointer = leftPointer + 1
      rightPointer = rightPointer - 1
      leftIndex = string.index(string.startIndex, offsetBy: leftPointer)
      rightIndex = string.index(string.startIndex, offsetBy: rightPointer)
    }

    return true
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(n) space
  func longestPalindromicSubstring(string: String) -> String {
    var currentLongest = [0, 1]

    for i in 1 ..< string.count {
      var oddLeftIndex = i - 1
      var oddRightIndex = i + 1
      let odd = getLongestPalindromeFrom(string: string, leftIndex: &oddLeftIndex, rightIndex: &oddRightIndex)

      var evenLeftIndex = i - 1
      var evenRightIndex = i
      let even = getLongestPalindromeFrom(string: string, leftIndex: &evenLeftIndex, rightIndex: &evenRightIndex)

      var temporaryLongest = [Int]()

      if let oddFirst = odd.first, let oddLast = odd.last, let evenFirst = even.first, let evenLast = even.last {
        if oddLast - oddFirst > evenLast - evenFirst {
          temporaryLongest = odd
        } else {
          temporaryLongest = even
        }
      }

      if let temporaryFirst = temporaryLongest.first, let temporaryLast = temporaryLongest.last, let currentFirst = currentLongest.first, let currentLast = currentLongest.last {
        if temporaryLast - temporaryFirst > currentLast - currentFirst {
          currentLongest = temporaryLongest
        }
      }
    }

    let firstIndex = string.index(string.startIndex, offsetBy: currentLongest.first!)
    let lastIndex = string.index(string.startIndex, offsetBy: currentLongest.last!)
    let result = String(string[firstIndex ..< lastIndex])

    return result
  }

  func getLongestPalindromeFrom(string: String, leftIndex: inout Int, rightIndex: inout Int) -> [Int] {
    while leftIndex >= 0, rightIndex < string.count {
      let leftStringIndex = string.index(string.startIndex, offsetBy: leftIndex)
      let rightStringIndex = string.index(string.startIndex, offsetBy: rightIndex)

      if string[leftStringIndex] != string[rightStringIndex] {
        break
      }

      leftIndex -= 1
      rightIndex += 1
    }

    return [leftIndex + 1, rightIndex]
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      try assertEqual("xyzzyx", program.longestPalindromicSubstring(string: "abaxyzzyxf"))
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
        self.assertEqual(program.longestPalindromicSubstring("abaxyzzyxf"), "xyzzyx")

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^3) time | O(n) space
def longestPalindromicSubstring(string):
    longest = ""
    for i in range(len(string)):
        for j in range(i, len(string)):
            substring = string[i : j + 1]
            if len(substring) > len(longest) and isPalindrome(substring):
                longest = substring
    return longest


def isPalindrome(string):
    leftIdx = 0
    rightIdx = len(string) - 1
    while leftIdx < rightIdx:
        if string[leftIdx] != string[rightIdx]:
            return False
        leftIdx += 1
        rightIdx -= 1
    return True

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n) space
def longestPalindromicSubstring(string):
    currentLongest = [0, 1]
    for i in range(1, len(string)):
        odd = getLongestPalindromeFrom(string, i - 1, i + 1)
        even = getLongestPalindromeFrom(string, i - 1, i)
        longest = max(odd, even, key=lambda x: x[1] - x[0])
        currentLongest = max(longest, currentLongest, key=lambda x: x[1] - x[0])
    return string[currentLongest[0] : currentLongest[1]]


def getLongestPalindromeFrom(string, leftIdx, rightIdx):
    while leftIdx >= 0 and rightIdx < len(string):
        if string[leftIdx] != string[rightIdx]:
            break
        leftIdx -= 1
        rightIdx += 1
    return [leftIdx + 1, rightIdx]

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.longestPalindromicSubstring("abaxyzzyxf"), "xyzzyx")

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.longestPalindromicSubstring('abaxyzzyxf')).to.deep.equal('xyzzyx');
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^3) time | O(n) space
export function longestPalindromicSubstring(string: string) {
  let longest = '';
  for (let i = 0; i < string.length; i++) {
    for (let j = i; j < string.length; j++) {
      const substring = string.slice(i, j + 1);
      if (substring.length > longest.length && isPalindrome(substring)) {
        longest = substring;
      }
    }
  }
  return longest;
}

function isPalindrome(string: string) {
  let leftIdx = 0;
  let rightIdx = string.length - 1;
  while (leftIdx < rightIdx) {
    if (string[leftIdx] !== string[rightIdx]) return false;
    leftIdx++;
    rightIdx--;
  }
  return true;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space
export function longestPalindromicSubstring(string: string) {
  let currentLongest = [0, 1];
  for (let i = 1; i < string.length; i++) {
    const odd = getLongestPalindromeFrom(string, i - 1, i + 1);
    const even = getLongestPalindromeFrom(string, i - 1, i);
    const longest = odd[1] - odd[0] > even[1] - even[0] ? odd : even;
    currentLongest = currentLongest[1] - currentLongest[0] > longest[1] - longest[0] ? currentLongest : longest;
  }
  return string.slice(currentLongest[0], currentLongest[1]);
}

function getLongestPalindromeFrom(string: string, leftIdx: number, rightIdx: number) {
  while (leftIdx >= 0 && rightIdx < string.length) {
    if (string[leftIdx] !== string[rightIdx]) break;
    leftIdx--;
    rightIdx++;
  }
  return [leftIdx + 1, rightIdx];
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.longestPalindromicSubstring('abaxyzzyxf')).to.deep.equal('xyzzyx');
});

```

