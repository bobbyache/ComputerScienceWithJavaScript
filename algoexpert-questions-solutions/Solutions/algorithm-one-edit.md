# One Edit
<div class="html">
  <p>
    You're given two strings <span>stringOne</span> and <span>stringTwo</span>.
    Write a function that determines if these two strings can be made equal
    using only one edit.
  </p>

  <p>
    There are 3 possible edits:
    <ul>
      <li>
        <b>Replace</b>: One character in one string is swapped for a different
        character.
      </li>
      <li>
        <b>Add</b>: One character is added at any index in one string.
      </li>
      <li>
        <b>Remove</b>: One character is removed at any index in one string.
      </li>
    </ul>
  </p>

  <p>
    Note that both strings will contain at least one character. If the strings
    are the same, your function should return true.
  </p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">stringOne</span> = "hello"
<span class="CodeEditor-promptParameter">stringTwo</span> = "hollo"
</pre>
<h3>Sample Output</h3>
<pre>
True <span class="CodeEditor-promptComment">// A single replace at index 1 of either string can make the strings equal</span>
</pre>
</div>

Hint 1
<p>
  If the difference in lengths of the strings is greater than 1, then there
  is no way to make them equal with a single edit.
</p>


Hint 2

<p>
  If the lengths of the strings are the same, then the only possible edit is a
  replace, because adding or removing a character would make the strings different
  lengths.
</p>


Hint 3

<p>
  If the strings are different lengths, the only possible moves are adding
  and removing a character. These are essentially the same operation, because
  they represent the case where one string has a character that another does
  not.
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
      auto stringOne = "hello";
      auto stringTwo = "helo";
      auto expected = true;
      auto actual = oneEdit(stringOne, stringTwo);
      assert(expected == actual);
    });
  }
};


```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <cmath>
#include <algorithm> 
using namespace std;

// O(n + m) time | O(n + m) space - where n is the length of stringOne, and
// m is the length of stringTwo
bool oneEdit(string stringOne, string stringTwo) {
  int lengthOne = stringOne.length();
  int lengthTwo = stringTwo.length();

  if (abs(lengthOne - lengthTwo) > 1) {
    return false;
  }

  for (int i = 0; i < min(lengthOne, lengthTwo); i++) {
    if (stringOne[i] != stringTwo[i]) {
      if (lengthOne > lengthTwo) {
        return stringOne.substr(i + 1) == stringTwo.substr(i);
      } else if (lengthTwo > lengthOne) {
        return stringOne.substr(i) == stringTwo.substr(i + 1);
      } else {
        return stringOne.substr(i + 1) == stringTwo.substr(i + 1);
      }
    }
  }

  return true;
}


```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <cmath>
#include <algorithm> 
using namespace std;

// O(n) time | O(1) space - where n is the length of the shorter string
bool oneEdit(string stringOne, string stringTwo) {
  int lengthOne = stringOne.length();
  int lengthTwo = stringTwo.length();

  if (abs(lengthOne - lengthTwo) > 1) {
    return false;
  }

  bool madeEdit = false;
  int indexOne = 0;
  int indexTwo = 0;

  while (indexOne < lengthOne && indexTwo < lengthTwo) {
    if (stringOne[indexOne] != stringTwo[indexTwo]) {
      if (madeEdit) {
        return false;
      }
      madeEdit = true;

      if (lengthOne > lengthTwo) {
        indexOne++;
      } else if (lengthTwo > lengthOne) {
        indexTwo++;
      } else {
        indexOne++;
        indexTwo++;
      }
    } else {
      indexOne++;
      indexTwo++;
    }
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
      auto stringOne = "hello";
      auto stringTwo = "helo";
      auto expected = true;
      auto actual = oneEdit(stringOne, stringTwo);
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
		var stringOne = "hello";
		var stringTwo = "helo";
		var expected = true;
		var actual = new Program().OneEdit(stringOne, stringTwo);
		Utils.AssertTrue(expected == actual);
	}
}


```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {
	// O(n + m) time | O(n + m) space - where n is the length of stringOne, and
	// m is the length of stringTwo
	public bool OneEdit(string stringOne, string stringTwo) {
		int lengthOne = stringOne.Length;
		int lengthTwo = stringTwo.Length;
		if (Math.Abs(lengthOne - lengthTwo) > 1) {
			return false;
		}

		for (int i = 0; i < Math.Min(lengthOne, lengthTwo); i++) {
			if (stringOne[i] != stringTwo[i]) {
				if (lengthOne > lengthTwo) {
					return stringOne.Substring(i + 1).Equals(stringTwo.Substring(
							 i));
				} else if (lengthTwo > lengthOne) {
					return stringOne.Substring(i).Equals(stringTwo.Substring(i +
					         1));
				} else {
					return stringOne.Substring(i + 1).Equals(stringTwo.Substring(
							 i + 1));
				}
			}
		}
		return true;
	}
}


```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {
	// O(n) time | O(1) space - where n is the length of the shorter string
	public bool OneEdit(string stringOne, string stringTwo) {
		int lengthOne = stringOne.Length;
		int lengthTwo = stringTwo.Length;
		if (Math.Abs(lengthOne - lengthTwo) > 1) {
			return false;
		}

		bool madeEdit = false;
		int indexOne = 0;
		int indexTwo = 0;

		while (indexOne < lengthOne && indexTwo < lengthTwo) {
			if (stringOne[indexOne] != stringTwo[indexTwo]) {
				if (madeEdit) {
					return false;
				}
				madeEdit = true;

				if (lengthOne > lengthTwo) {
					indexOne++;
				} else if (lengthTwo > lengthOne) {
					indexTwo++;
				} else {
					indexOne++;
					indexTwo++;
				}
			} else {
				indexOne++;
				indexTwo++;
			}
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
		var stringOne = "hello";
		var stringTwo = "helo";
		var expected = true;
		var actual = new Program().OneEdit(stringOne, stringTwo);
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
	stringOne := "hello"
	stringTwo := "helo"
	expected := true
	actual := OneEdit(stringOne, stringTwo)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n + m) time | O(n + m) space - where n is the length of stringOne, and
// m is the length of stringTwo
func OneEdit(stringOne string, stringTwo string) bool {
	lengthOne := len(stringOne)
	lengthTwo := len(stringTwo)

	if abs(lengthOne-lengthTwo) > 1 {
		return false
	}

	for i := 0; i < min(lengthOne, lengthTwo); i++ {
		if stringOne[i] != stringTwo[i] {
			if lengthOne > lengthTwo {
				return stringOne[i+1:] == stringTwo[i:]
			} else if lengthTwo > lengthOne {
				return stringOne[i:] == stringTwo[i+1:]
			} else {
				return stringOne[i+1:] == stringTwo[i+1:]
			}
		}
	}
	return true
}

func abs(i int) int {
	if i < 0 {
		return -i
	}
	return i
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space - where n is the length of the shorter string
func OneEdit(stringOne string, stringTwo string) bool {
	lengthOne := len(stringOne)
	lengthTwo := len(stringTwo)

	if abs(lengthOne-lengthTwo) > 1 {
		return false
	}

	madeEdit := false
	indexOne, indexTwo := 0, 0
	for indexOne < lengthOne && indexTwo < lengthTwo {
		if stringOne[indexOne] != stringTwo[indexTwo] {
			if madeEdit {
				return false
			}
			madeEdit = true

			if lengthOne > lengthTwo {
				indexOne += 1
			} else if lengthTwo > lengthOne {
				indexTwo += 1
			} else {
				indexOne += 1
				indexTwo += 1
			}
		} else {
			indexOne += 1
			indexTwo += 1
		}
	}
	return true
}

func abs(i int) int {
	if i < 0 {
		return -i
	}
	return i
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	stringOne := "hello"
	stringTwo := "helo"
	expected := true
	actual := OneEdit(stringOne, stringTwo)
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
    var stringOne = "hello";
    var stringTwo = "helo";
    var expected = true;
    var actual = new Program().oneEdit(stringOne, stringTwo);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n + m) time | O(n + m) space - where n is the length of stringOne, and
  // m is the length of stringTwo
  public boolean oneEdit(String stringOne, String stringTwo) {
    int lengthOne = stringOne.length();
    int lengthTwo = stringTwo.length();
    if (Math.abs(lengthOne - lengthTwo) > 1) {
      return false;
    }

    for (int i = 0; i < Math.min(lengthOne, lengthTwo); i++) {
      if (stringOne.charAt(i) != stringTwo.charAt(i)) {
        if (lengthOne > lengthTwo) {
          return stringOne.substring(i + 1).equals(stringTwo.substring(i));
        } else if (lengthTwo > lengthOne) {
          return stringOne.substring(i).equals(stringTwo.substring(i + 1));
        } else {
          return stringOne.substring(i + 1).equals(stringTwo.substring(i + 1));
        }
      }
    }
    return true;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(1) space - where n is the length of the shorter string
  public boolean oneEdit(String stringOne, String stringTwo) {
    int lengthOne = stringOne.length();
    int lengthTwo = stringTwo.length();
    if (Math.abs(lengthOne - lengthTwo) > 1) {
      return false;
    }

    boolean madeEdit = false;
    int indexOne = 0;
    int indexTwo = 0;

    while (indexOne < lengthOne && indexTwo < lengthTwo) {
      if (stringOne.charAt(indexOne) != stringTwo.charAt(indexTwo)) {
        if (madeEdit) {
          return false;
        }
        madeEdit = true;

        if (lengthOne > lengthTwo) {
          indexOne++;
        } else if (lengthTwo > lengthOne) {
          indexTwo++;
        } else {
          indexOne++;
          indexTwo++;
        }
      } else {
        indexOne++;
        indexTwo++;
      }
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
    var stringOne = "hello";
    var stringTwo = "helo";
    var expected = true;
    var actual = new Program().oneEdit(stringOne, stringTwo);
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
  const stringOne = 'hello';
  const stringTwo = 'helo';
  const expected = true;
  const actual = program.oneEdit(stringOne, stringTwo);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n + m) time | O(n + m) space - where n is the length of stringOne, and
// m is the length of stringTwo
function oneEdit(stringOne, stringTwo) {
  const lengthOne = stringOne.length;
  const lengthTwo = stringTwo.length;
  if (Math.abs(lengthOne - lengthTwo) > 1) return false;

  for (let i = 0; i < Math.min(lengthOne, lengthTwo); i++) {
    if (stringOne[i] !== stringTwo[i]) {
      if (lengthOne > lengthTwo) {
        return stringOne.slice(i + 1) === stringTwo.slice(i);
      } else if (lengthTwo > lengthOne) {
        return stringOne.slice(i) === stringTwo.slice(i + 1);
      } else {
        return stringOne.slice(i + 1) === stringTwo.slice(i + 1);
      }
    }
  }

  return true;
}

// Do not edit the line below.
exports.oneEdit = oneEdit;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the shorter string
function oneEdit(stringOne, stringTwo) {
  const lengthOne = stringOne.length;
  const lengthTwo = stringTwo.length;
  if (Math.abs(lengthOne - lengthTwo) > 1) return false;

  let madeEdit = false;
  let indexOne = 0;
  let indexTwo = 0;

  while (indexOne < lengthOne && indexTwo < lengthTwo) {
    if (stringOne[indexOne] !== stringTwo[indexTwo]) {
      if (madeEdit) return false;
      madeEdit = true;

      if (lengthOne > lengthTwo) {
        indexOne++;
      } else if (lengthTwo > lengthOne) {
        indexTwo++;
      } else {
        indexOne++;
        indexTwo++;
      }
    } else {
      indexOne++;
      indexTwo++;
    }
  }

  return true;
}

// Do not edit the line below.
exports.oneEdit = oneEdit;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const stringOne = 'hello';
  const stringTwo = 'helo';
  const expected = true;
  const actual = program.oneEdit(stringOne, stringTwo);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.oneEdit

class ProgramTest {
    @Test
    fun TestCase1() {
        val stringOne = "hello"
        val stringTwo = "helo"
        val expected = true
        val output = oneEdit(stringOne, stringTwo)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.min

// O(n + m) time | O(n + m) space - where n is the length of stringOne, and
// m is the length of stringTwo
fun oneEdit(stringOne: String, stringTwo: String): Boolean {
    val lengthOne = stringOne.length
    val lengthTwo = stringTwo.length

    for (i in 0 until min(lengthOne, lengthTwo)) {
        if (stringOne[i] != stringTwo[i]) {
            if (lengthOne > lengthTwo) {
                return stringOne.substring(i + 1) == stringTwo.substring(i)
            } else if (lengthTwo > lengthOne) {
                return stringOne.substring(i) == stringTwo.substring(i + 1)
            } else {
                return stringOne.substring(i + 1) == stringTwo.substring(i + 1)
            }
        }
    }

    return true
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.abs

// O(n) time | O(1) space - where n is the length of the shorter string
fun oneEdit(stringOne: String, stringTwo: String): Boolean {
    val lengthOne = stringOne.length
    val lengthTwo = stringTwo.length
    if (abs(lengthOne - lengthTwo) > 1) return false

    var madeEdit = false
    var indexOne = 0
    var indexTwo = 0

    while (indexOne < lengthOne && indexTwo < lengthTwo) {
        if (stringOne[indexOne] != stringTwo[indexTwo]) {
            if (madeEdit) return false
            madeEdit = true

            if (lengthOne > lengthTwo) {
                indexOne += 1
            } else if (lengthTwo > lengthOne) {
                indexTwo += 1
            } else {
                indexOne += 1
                indexTwo += 1
            }
        } else {
            indexOne += 1
            indexTwo += 1
        }
    }

    return true
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.oneEdit

class ProgramTest {
    @Test
    fun TestCase1() {
        val stringOne = "hello"
        val stringTwo = "helo"
        val expected = true
        val output = oneEdit(stringOne, stringTwo)
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
      var stringOne = "hello"
      var stringTwo = "helo"
      var expected = true
      var actual = Program().oneEdit(stringOne, stringTwo)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n + m) time | O(n + m) space - where n is the length of stringOne, and
  // m is the length of stringTwo
  func oneEdit(_ stringOne: String, _ stringTwo: String) -> Bool {
    let lengthOne = stringOne.count
    let lengthTwo = stringTwo.count

    if abs(lengthOne - lengthTwo) > 1 {
      return false
    }

    for i in 0 ..< min(lengthOne, lengthTwo) {
      let charOne = stringOne.index(stringOne.startIndex, offsetBy: i)
      let charTwo = stringTwo.index(stringTwo.startIndex, offsetBy: i)
      if stringOne[charOne] != stringTwo[charTwo] {
        if lengthOne > lengthTwo {
          return stringOne.suffix(stringOne.count - (i + 1)) == stringTwo.suffix(stringTwo.count - i)
        } else if lengthTwo > lengthOne {
          return stringOne.suffix(stringOne.count - i) == stringTwo.suffix(stringTwo.count - (i + 1))
        } else {
          return stringOne.suffix(stringOne.count - (i + 1)) == stringTwo.suffix(stringTwo.count - (i + 1))
        }
      }
    }
    return true
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the length of the shorter string
  func oneEdit(_ stringOne: String, _ stringTwo: String) -> Bool {
    let lengthOne = stringOne.count
    let lengthTwo = stringTwo.count

    if abs(lengthOne - lengthTwo) > 1 {
      return false
    }

    var madeEdit = false
    var indexOne = 0
    var indexTwo = 0
    while indexOne < lengthOne && indexTwo < lengthTwo {
      let charOne = stringOne.index(stringOne.startIndex, offsetBy: indexOne)
      let charTwo = stringTwo.index(stringTwo.startIndex, offsetBy: indexTwo)
      if stringOne[charOne] != stringTwo[charTwo] {
        if madeEdit {
          return false
        }
        madeEdit = true

        if lengthOne > lengthTwo {
          indexOne += 1
        } else if lengthTwo > lengthOne {
          indexTwo += 1
        } else {
          indexOne += 1
          indexTwo += 1
        }
      } else {
        indexOne += 1
        indexTwo += 1
      }
    }
    return true
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws in
      var stringOne = "hello"
      var stringTwo = "helo"
      var expected = true
      var actual = Program().oneEdit(stringOne, stringTwo)
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
        stringOne = "hello"
        stringTwo = "helo"
        expected = True
        actual = program.oneEdit(stringOne, stringTwo)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n + m) time | O(n + m) space - where n is the length of stringOne, and
# m is the length of stringTwo
def oneEdit(stringOne, stringTwo):
    lengthOne, lengthTwo = len(stringOne), len(stringTwo)
    if abs(lengthOne - lengthTwo) > 1:
        return False

    for i in range(min(lengthOne, lengthTwo)):
        if stringOne[i] != stringTwo[i]:
            if lengthOne > lengthTwo:
                return stringOne[i + 1 :] == stringTwo[i:]
            elif lengthTwo > lengthOne:
                return stringOne[i:] == stringTwo[i + 1 :]
            else:
                return stringOne[i + 1 :] == stringTwo[i + 1 :]

    return True

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space - where n is the length of the shorter string
def oneEdit(stringOne, stringTwo):
    lengthOne, lengthTwo = len(stringOne), len(stringTwo)
    if abs(lengthOne - lengthTwo) > 1:
        return False

    madeEdit = False
    indexOne = 0
    indexTwo = 0

    while indexOne < lengthOne and indexTwo < lengthTwo:
        if stringOne[indexOne] != stringTwo[indexTwo]:
            if madeEdit:
                return False
            madeEdit = True

            if lengthOne > lengthTwo:
                indexOne += 1
            elif lengthTwo > lengthOne:
                indexTwo += 1
            else:
                indexOne += 1
                indexTwo += 1
        else:
            indexOne += 1
            indexTwo += 1

    return True

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        stringOne = "hello"
        stringTwo = "helo"
        expected = True
        actual = program.oneEdit(stringOne, stringTwo)
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
  const stringOne = 'hello';
  const stringTwo = 'helo';
  const expected = true;
  const actual = program.oneEdit(stringOne, stringTwo);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n + m) time | O(n + m) space - where n is the length of stringOne, and
// m is the length of stringTwo
export function oneEdit(stringOne: string, stringTwo: string) {
  const lengthOne = stringOne.length;
  const lengthTwo = stringTwo.length;
  if (Math.abs(lengthOne - lengthTwo) > 1) return false;

  for (let i = 0; i < Math.min(lengthOne, lengthTwo); i++) {
    if (stringOne[i] !== stringTwo[i]) {
      if (lengthOne > lengthTwo) {
        return stringOne.slice(i + 1) === stringTwo.slice(i);
      } else if (lengthTwo > lengthOne) {
        return stringOne.slice(i) === stringTwo.slice(i + 1);
      } else {
        return stringOne.slice(i + 1) === stringTwo.slice(i + 1);
      }
    }
  }

  return true;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the shorter string
export function oneEdit(stringOne: string, stringTwo: string) {
  const lengthOne = stringOne.length;
  const lengthTwo = stringTwo.length;
  if (Math.abs(lengthOne - lengthTwo) > 1) return false;

  let madeEdit = false;
  let indexOne = 0;
  let indexTwo = 0;

  while (indexOne < lengthOne && indexTwo < lengthTwo) {
    if (stringOne[indexOne] !== stringTwo[indexTwo]) {
      if (madeEdit) return false;
      madeEdit = true;

      if (lengthOne > lengthTwo) {
        indexOne++;
      } else if (lengthTwo > lengthOne) {
        indexTwo++;
      } else {
        indexOne++;
        indexTwo++;
      }
    } else {
      indexOne++;
      indexTwo++;
    }
  }

  return true;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const stringOne = 'hello';
  const stringTwo = 'helo';
  const expected = true;
  const actual = program.oneEdit(stringOne, stringTwo);
  chai.expect(actual).to.deep.equal(expected);
});

```

