# Palindrome Check
<div class="html">
<p>
  Write a function that takes in a non-empty string and that returns a boolean
  representing whether the string is a palindrome.
</p>
<p>
  A palindrome is defined as a string that's written the same forward and
  backward. Note that single-character strings are palindromes.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">string</span> = "abcdcba"
</pre>
<h3>Sample Output</h3>
<pre>
true <span class="CodeEditor-promptComment">// it's written the same forward and backward</span>
</pre>
</div>

Hint 1
<p>
Start by building the input string in reverse order and comparing this newly built string to the input string. Can you do this without using string concatenations?
</p>


Hint 2

<p>
Can you optimize your algorithm by using recursion? What are the implications of recursion on an algorithm's space-time complexity analysis?
</p>


Hint 3

<p>
Go back to an iterative solution and try using pointers to solve this problem: start with a pointer at the first index of the string and a pointer at the final index of the string. What can you do from there?
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
    RunTest("Test Case 1", []() { assert(isPalindrome("abcdcba")); });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// O(n^2) time | O(n) space
bool isPalindrome(string str) {
  string reversedString = "";
  for (int i = str.length() - 1; i >= 0; i--) {
    reversedString += str[i];
  }
  return str == reversedString;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <numeric>
using namespace std;

// O(n) time | O(n) space
bool isPalindrome(string str) {
  vector<char> reversedChars;
  for (int i = str.length() - 1; i >= 0; i--) {
    reversedChars.push_back(str[i]);
  }
  return str == string(reversedChars.begin(), reversedChars.end());
}

```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

bool helper(string str, int i);

// O(n) time | O(n) space
bool isPalindrome(string str) { return helper(str, 0); }

bool helper(string str, int i) {
  int j = str.length() - 1 - i;
  return i >= j ? true : str[i] == str[j] && helper(str, i + 1);
}

```
### Solution 4 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// O(n) time | O(1) space
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
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() { assert(isPalindrome("abcdcba")); });
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
		Utils.AssertTrue(Program.IsPalindrome("abcdcba"));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(n^2) time | O(n) space
	public static bool IsPalindrome(string str) {
		string reversedstring = "";
		for (int i = str.Length - 1; i >= 0; i--) {
			reversedstring += str[i];
		}
		return str.Equals(reversedstring);
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Text;

public class Program {
	// O(n) time | O(n) space
	public static bool IsPalindrome(string str) {
		StringBuilder reversedstring = new StringBuilder();
		for (int i = str.Length - 1; i >= 0; i--) {
			reversedstring.Append(str[i]);
		}
		return str.Equals(reversedstring.ToString());
	}
}

```
### Solution 3 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(n) time | O(n) space
	public static bool IsPalindrome(string str) {
		return IsPalindrome(str, 0);
	}

	public static bool IsPalindrome(string str, int i) {
		int j = str.Length - 1 - i;
		return i >= j ? true : str[i] == str[j] && IsPalindrome(str, i + 1);
	}
}

```
### Solution 4 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(n) time | O(1) space
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
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		Utils.AssertTrue(Program.IsPalindrome("abcdcba"));
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
	expected := true
	output := IsPalindrome("abcdcba")
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n^2) time | O(n) space
func IsPalindrome(str string) bool {
	reversed := ""
	for i := len(str) - 1; i >= 0; i-- {
		reversed += string(str[i])
	}
	for i := range str {
		if reversed[i] != str[i] {
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

// O(n) time | O(n) space
func IsPalindrome(str string) bool {
	result := []byte{}
	for i := len(str) - 1; i >= 0; i-- {
		result = append(result, str[i])
	}
	return str == string(result)
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space
func IsPalindrome(str string) bool {
	return helper(str, 0)
}

func helper(str string, i int) bool {
	j := len(str) - 1 - i
	if i >= j {
		return true
	}
	if str[i] != str[j] {
		return false
	}
	return helper(str, i+1)
}

```
### Solution 4 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space
func IsPalindrome(str string) bool {
	for i := 0; i < len(str); i++ {
		j := len(str) - i - 1
		if str[i] != str[j] {
			return false
		}
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
	expected := true
	output := IsPalindrome("abcdcba")
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
    Utils.assertTrue(Program.isPalindrome("abcdcba"));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(n) space
  public static boolean isPalindrome(String str) {
    String reversedString = "";
    for (int i = str.length() - 1; i >= 0; i--) {
      reversedString += str.charAt(i);
    }
    return str.equals(reversedString);
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space
  public static boolean isPalindrome(String str) {
    StringBuilder reversedString = new StringBuilder();
    for (int i = str.length() - 1; i >= 0; i--) {
      reversedString.append(str.charAt(i));
    }
    return str.equals(reversedString.toString());
  }
}

```
### Solution 3 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space
  public static boolean isPalindrome(String str) {
    return isPalindrome(str, 0);
  }

  public static boolean isPalindrome(String str, int i) {
    int j = str.length() - 1 - i;
    return i >= j ? true : str.charAt(i) == str.charAt(j) && isPalindrome(str, i + 1);
  }
}

```
### Solution 4 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space
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
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    Utils.assertTrue(Program.isPalindrome("abcdcba"));
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
  chai.expect(program.isPalindrome('abcdcba')).to.deep.equal(true);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space
function isPalindrome(string) {
  let reversedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i];
  }
  return string === reversedString;
}

exports.isPalindrome = isPalindrome;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space
function isPalindrome(string) {
  const reversedChars = [];
  for (let i = string.length - 1; i >= 0; i--) {
    reversedChars.push(string[i]);
  }
  return string === reversedChars.join('');
}

exports.isPalindrome = isPalindrome;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space
function isPalindrome(string, i = 0) {
  const j = string.length - 1 - i;
  return i >= j ? true : string[i] === string[j] && isPalindrome(string, i + 1);
}

exports.isPalindrome = isPalindrome;

```
### Solution 4 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space
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

exports.isPalindrome = isPalindrome;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.isPalindrome('abcdcba')).to.deep.equal(true);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.isPalindrome as isPalindrome

class ProgramTest {
    @Test
    fun TestCase1() {
        assert(isPalindrome("abcdcba"))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^2) time | O(n) space
fun isPalindrome(string: String): Boolean {
    var reversedString = ""
    for (i in string.length - 1 downTo 0) {
        reversedString += string[i]
    }
    return string == reversedString
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(n) space
fun isPalindrome(string: String): Boolean {
    val reversedChars = mutableListOf<Char>()
    for (i in string.length - 1 downTo 0) {
        reversedChars.add(string[i])
    }
    return string == reversedChars.joinToString("")
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(n) space
fun isPalindrome(string: String = "", i: Int = 0): Boolean {
    val j = string.length - 1 - i
    return if (i >= j) true else string[i] == string[j] && isPalindrome(string, i + 1)
}

```
### Solution 4 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(1) space
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
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.isPalindrome as isPalindrome

class ProgramTest {
    @Test
    fun TestCase1() {
        assert(isPalindrome("abcdcba"))
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
      try assertEqual(true, program.isPalindrome(string: "abcdcba"))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(n) space
  func isPalindrome(string: String) -> Bool {
    var reversedString = ""

    for i in (0 ..< string.count).reversed() {
      let startIndex = string.index(string.startIndex, offsetBy: i)

      let currentChar = string[startIndex]
      reversedString.append(currentChar)
    }

    return string == reversedString
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space
  func isPalindrome(string: String) -> Bool {
    var reversedChars = [Character]()

    for i in (0 ..< string.count).reversed() {
      let startIndex = string.index(string.startIndex, offsetBy: i)

      let currentChar = string[startIndex]
      reversedChars.append(currentChar)
    }

    let reversedString = String(reversedChars)

    return string == reversedString
  }
}

```
### Solution 3 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space
  func isPalindrome(string: String, firstIndex: Int = 0) -> Bool {
    let lastIndex = string.count - 1 - firstIndex

    if firstIndex >= lastIndex {
      return true
    }

    let startIndex = string.index(string.startIndex, offsetBy: firstIndex)
    let endIndex = string.index(string.startIndex, offsetBy: lastIndex)

    let firstAndLastAreEqual = string[startIndex] == string[endIndex]
    let palindromeCheck = isPalindrome(string: string, firstIndex: firstIndex + 1)

    return firstAndLastAreEqual && palindromeCheck
  }
}

```
### Solution 4 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space
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
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      try assertEqual(true, program.isPalindrome(string: "abcdcba"))
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
        self.assertEqual(program.isPalindrome("abcdcba"), True)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n) space
def isPalindrome(string):
    reversedString = ""
    for i in reversed(range(len(string))):
        reversedString += string[i]
    return string == reversedString

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space
def isPalindrome(string):
    reversedChars = []
    for i in reversed(range(len(string))):
        reversedChars.append(string[i])
    return string == "".join(reversedChars)

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space
def isPalindrome(string, i=0):
    j = len(string) - 1 - i
    return True if i >= j else string[i] == string[j] and isPalindrome(string, i + 1)

```
### Solution 4 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space
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
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.isPalindrome("abcdcba"), True)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.isPalindrome('abcdcba')).to.deep.equal(true);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space
export function isPalindrome(string: string) {
  let reversedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i];
  }
  return string === reversedString;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space
export function isPalindrome(string: string) {
  const reversedChars: string[] = [];
  for (let i = string.length - 1; i >= 0; i--) {
    reversedChars.push(string[i]);
  }
  return string === reversedChars.join('');
}

```
### Solution 3 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space
export function isPalindrome(string: string, i = 0): boolean {
  const j = string.length - 1 - i;
  return i >= j ? true : string[i] === string[j] && isPalindrome(string, i + 1);
}

```
### Solution 4 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space
export function isPalindrome(string: string) {
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
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.isPalindrome('abcdcba')).to.deep.equal(true);
});

```

