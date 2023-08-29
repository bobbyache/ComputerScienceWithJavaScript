# Levenshtein Distance
<div class="html">
<p>
  Write a function that takes in two strings and returns the minimum number of
  edit operations that need to be performed on the first string to obtain the
  second string.
</p>
<p>
  There are three edit operations: insertion of a character, deletion of a
  character, and substitution of a character for another.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">str1</span> = "abc"
<span class="CodeEditor-promptParameter">str2</span> = "yabd"
</pre>
<h3>Sample Output</h3>
<pre>
2 <span class="CodeEditor-promptComment">// insert "y"; substitute "c" for "d"</span>
</pre>
</div>

Hint 1
<p>
Try building a two-dimensional array of the minimum numbers of edits for pairs of substrings of the input strings. Let the rows of the array represent substrings of the second input string str2. Let the first row represent the empty string. Let each row i thereafter represent the substrings of str2 from 0 to i, with i excluded. Let the columns similarly represent the first input string str1.
</p>


Hint 2

<p>
Build up the array mentioned in Hint #1 one row at a time. In other words, find the minimum numbers of edits between all the substrings of str1 represented by the columns and the empty string represented by the first row, then between all the substrings of str1 represented by the columns and the first letter of str2 represented by the second row, etc., until you compare both full strings. Find a formula that relates the minimum number of edits at any given point to previous numbers.
</p>


Hint 3

<p>
At any position (i, j) in the two-dimensional array, if str2[i] is equal to str1[j], then the edit distance at position (i, j) is equal to the one at position (i - 1, j - 1), since adding str2[i] and str1[j] to the substrings represented at position (i - 1, j - 1) does not require any additional edit operation. If str2[i] is not equal to str1[j] however, then the edit distance at position (i, j) is equal to 1 + the minimum of the edit distances at positions (i - 1, j), (i, j - 1), and (i - 1, j - 1). Why is that the case?
</p>


Hint 4

<p>
Do you really need to store the entire two-dimensional array mentioned in Hint #1? Identify what stored values you actually use throughout the process of building the array and come up with a way of storing only what you need and nothing more.
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
            []() { assert(levenshteinDistance("abc", "yabd") == 2); });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

// O(nm) time | O(nm) space
int levenshteinDistance(string str1, string str2) {
  vector<vector<int>> edits(str2.length() + 1,
                            vector<int>(str1.length() + 1, 0));
  for (int i = 0; i < str2.length() + 1; i++) {
    for (int j = 0; j < str1.length() + 1; j++) {
      edits[i][j] = j;
    }
    edits[i][0] = i;
  }
  for (int i = 1; i < str2.length() + 1; i++) {
    for (int j = 1; j < str1.length() + 1; j++) {
      if (str2[i - 1] == str1[j - 1]) {
        edits[i][j] = edits[i - 1][j - 1];
      } else {
        edits[i][j] =
            1 + min(edits[i - 1][j - 1], min(edits[i - 1][j], edits[i][j - 1]));
      }
    }
  }
  return edits[str2.length()][str1.length()];
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// O(nm) time | O(min(n, m)) space
int levenshteinDistance(string str1, string str2) {
  string small = str1.length() < str2.length() ? str1 : str2;
  string big = str1.length() >= str2.length() ? str1 : str2;
  vector<int> evenEdits(small.length() + 1);
  vector<int> oddEdits(small.length() + 1);
  for (int j = 0; j < small.length() + 1; j++) {
    evenEdits[j] = j;
  }

  vector<int> *currentEdits;
  vector<int> *previousEdits;
  for (int i = 1; i < big.length() + 1; i++) {
    if (i % 2 == 1) {
      currentEdits = &oddEdits;
      previousEdits = &evenEdits;
    } else {
      currentEdits = &evenEdits;
      previousEdits = &oddEdits;
    }

    (*currentEdits)[0] = i;
    for (int j = 1; j < small.length() + 1; j++) {
      if (big[i - 1] == small[j - 1]) {
        (*currentEdits)[j] = previousEdits->at(j - 1);
      } else {
        (*currentEdits)[j] =
            1 + min(previousEdits->at(j - 1),
                    min(previousEdits->at(j), currentEdits->at(j - 1)));
      }
    }
  }
  return big.length() % 2 == 0 ? evenEdits[small.length()]
                               : oddEdits[small.length()];
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1",
            []() { assert(levenshteinDistance("abc", "yabd") == 2); });
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
		Utils.AssertTrue(Program.LevenshteinDistance("abc", "yabd") == 2);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// O(nm) time | O(nm) space
	public static int LevenshteinDistance(string str1, string str2) {
		int[,] edits = new int[str2.Length + 1,str1.Length + 1];
		for (int i = 0; i < str2.Length + 1; i++) {
			for (int j = 0; j < str1.Length + 1; j++) {
				edits[i,j] = j;
			}
			edits[i,0] = i;
		}
		for (int i = 1; i < str2.Length + 1; i++) {
			for (int j = 1; j < str1.Length + 1; j++) {
				if (str2[i  -1] == str1[j - 1]) {
					edits[i,j] = edits[i - 1,j - 1];
				} else {
					edits[i,
					  j] = 1 +
					  Math.Min(edits[i - 1,j - 1],
					    Math.Min(edits[i - 1,j],
					    edits[i,j - 1]));
				}
			}
		}
		return edits[str2.Length,str1.Length];
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// O(nm) time | O(min(n, m)) space
	public static int LevenshteinDistance(string str1, string str2) {
		string small = str1.Length < str2.Length ? str1 : str2;
		string big = str1.Length >= str2.Length ? str1 : str2;
		int[] evenEdits = new int[small.Length + 1];
		int[] oddEdits = new int[small.Length + 1];
		for (int j = 0; j < small.Length + 1; j++) {
			evenEdits[j] = j;
		}
		int[] currentEdits;
		int[] previousEdits;
		for (int i = 1; i < big.Length + 1; i++) {
			if (i % 2 == 1) {
				currentEdits = oddEdits;
				previousEdits = evenEdits;
			} else {
				currentEdits = evenEdits;
				previousEdits = oddEdits;
			}
			currentEdits[0] = i;
			for (int j = 1; j < small.Length + 1; j++) {
				if (big[i - 1] == small[j - 1]) {
					currentEdits[j] = previousEdits[j - 1];
				} else {
					currentEdits[j] = 1 + Math.Min(previousEdits[j - 1], Math.Min(
						    previousEdits[j],
						    currentEdits[j -
						    1]));
				}
			}
		}
		return big.Length % 2 == 0 ? evenEdits[small.Length] : oddEdits[small.Length];
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		Utils.AssertTrue(Program.LevenshteinDistance("abc", "yabd") == 2);
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
	require.Equal(t, LevenshteinDistance("abc", "yabd"), 2)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(nm) time | O(nm) space
func LevenshteinDistance(a, b string) int {
	edits := make([][]int, len(b)+1)
	for y := range edits {
		edits[y] = make([]int, len(a)+1)
		for x := range edits[y] {
			edits[y][x] = x
		}
	}
	for i := 1; i < len(b)+1; i++ {
		edits[i][0] = edits[i-1][0] + 1
	}

	for i := 1; i < len(b)+1; i++ {
		for j := 1; j < len(a)+1; j++ {
			if b[i-1] == a[j-1] {
				edits[i][j] = edits[i-1][j-1]
			} else {
				edits[i][j] = 1 + min(edits[i-1][j-1], edits[i-1][j], edits[i][j-1])
			}
		}
	}
	return edits[len(b)][len(a)]
}

func min(args ...int) int {
	curr := args[0]
	for _, num := range args {
		if curr > num {
			curr = num
		}
	}
	return curr
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "math"

// O(nm) time | O(min(n, m)) space
func LevenshteinDistance(a, b string) int {
	small, big := a, b
	if len(a) > len(b) {
		big, small = small, big
	}
	evenEdits := make([]int, len(small)+1)
	oddEdits := make([]int, len(small)+1)
	var previousEdits, currentEdits []int
	for i := range evenEdits {
		evenEdits[i] = i
		oddEdits[i] = math.MinInt32
	}
	for i := 1; i < len(big)+1; i++ {
		if i%2 == 1 {
			currentEdits, previousEdits = oddEdits, evenEdits
		} else {
			currentEdits, previousEdits = evenEdits, oddEdits
		}
		currentEdits[0] = i
		for j := 1; j < len(small)+1; j++ {
			if big[i-1] == small[j-1] {
				currentEdits[j] = previousEdits[j-1]
			} else {
				currentEdits[j] = 1 + min(previousEdits[j-1], previousEdits[j], currentEdits[j-1])
			}
		}
	}
	if len(big)%2 == 0 {
		return evenEdits[len(small)]
	}
	return oddEdits[len(small)]
}

func min(args ...int) int {
	curr := args[0]
	for _, num := range args {
		if curr > num {
			curr = num
		}
	}
	return curr
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	require.Equal(t, LevenshteinDistance("abc", "yabd"), 2)
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
    Utils.assertTrue(Program.levenshteinDistance("abc", "yabd") == 2);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nm) time | O(nm) space
  public static int levenshteinDistance(String str1, String str2) {
    int[][] edits = new int[str2.length() + 1][str1.length() + 1];
    for (int i = 0; i < str2.length() + 1; i++) {
      for (int j = 0; j < str1.length() + 1; j++) {
        edits[i][j] = j;
      }
      edits[i][0] = i;
    }
    for (int i = 1; i < str2.length() + 1; i++) {
      for (int j = 1; j < str1.length() + 1; j++) {
        if (str2.charAt(i - 1) == str1.charAt(j - 1)) {
          edits[i][j] = edits[i - 1][j - 1];
        } else {
          edits[i][j] =
              1 + Math.min(edits[i - 1][j - 1], Math.min(edits[i - 1][j], edits[i][j - 1]));
        }
      }
    }
    return edits[str2.length()][str1.length()];
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nm) time | O(min(n, m)) space
  public static int levenshteinDistance(String str1, String str2) {
    String small = str1.length() < str2.length() ? str1 : str2;
    String big = str1.length() >= str2.length() ? str1 : str2;
    int[] evenEdits = new int[small.length() + 1];
    int[] oddEdits = new int[small.length() + 1];
    for (int j = 0; j < small.length() + 1; j++) {
      evenEdits[j] = j;
    }

    int[] currentEdits;
    int[] previousEdits;
    for (int i = 1; i < big.length() + 1; i++) {
      if (i % 2 == 1) {
        currentEdits = oddEdits;
        previousEdits = evenEdits;
      } else {
        currentEdits = evenEdits;
        previousEdits = oddEdits;
      }
      currentEdits[0] = i;
      for (int j = 1; j < small.length() + 1; j++) {
        if (big.charAt(i - 1) == small.charAt(j - 1)) {
          currentEdits[j] = previousEdits[j - 1];
        } else {
          currentEdits[j] =
              1 + Math.min(previousEdits[j - 1], Math.min(previousEdits[j], currentEdits[j - 1]));
        }
      }
    }
    return big.length() % 2 == 0 ? evenEdits[small.length()] : oddEdits[small.length()];
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    Utils.assertTrue(Program.levenshteinDistance("abc", "yabd") == 2);
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
  chai.expect(program.levenshteinDistance('abc', 'yabd')).to.deep.equal(2);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nm) time | O(nm) space
function levenshteinDistance(str1, str2) {
  const edits = [];
  for (let i = 0; i < str2.length + 1; i++) {
    const row = [];
    for (let j = 0; j < str1.length + 1; j++) {
      row.push(j);
    }
    row[0] = i;
    edits.push(row);
  }
  for (let i = 1; i < str2.length + 1; i++) {
    for (let j = 1; j < str1.length + 1; j++) {
      if (str2[i - 1] === str1[j - 1]) {
        edits[i][j] = edits[i - 1][j - 1];
      } else {
        edits[i][j] = 1 + Math.min(edits[i - 1][j - 1], edits[i - 1][j], edits[i][j - 1]);
      }
    }
  }
  return edits[str2.length][str1.length];
}

exports.levenshteinDistance = levenshteinDistance;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nm) time | O(min(n, m)) space
function levenshteinDistance(str1, str2) {
  const small = str1.length < str2.length ? str1 : str2;
  const big = str1.length >= str2.length ? str1 : str2;
  const evenEdits = [];
  const oddEdits = new Array(small.length + 1);
  for (let j = 0; j < small.length + 1; j++) {
    evenEdits.push(j);
  }
  for (let i = 1; i < big.length + 1; i++) {
    let currentEdits, previousEdits;
    if (i % 2 === 1) {
      currentEdits = oddEdits;
      previousEdits = evenEdits;
    } else {
      currentEdits = evenEdits;
      previousEdits = oddEdits;
    }
    currentEdits[0] = i;
    for (let j = 1; j < small.length + 1; j++) {
      if (big[i - 1] === small[j - 1]) {
        currentEdits[j] = previousEdits[j - 1];
      } else {
        currentEdits[j] = 1 + Math.min(previousEdits[j - 1], previousEdits[j], currentEdits[j - 1]);
      }
    }
  }
  return big.length % 2 === 0 ? evenEdits[small.length] : oddEdits[small.length];
}

exports.levenshteinDistance = levenshteinDistance;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.levenshteinDistance('abc', 'yabd')).to.deep.equal(2);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.levenshteinDistance

class ProgramTest {
    @Test
    fun TestCase1() {
        val output = levenshteinDistance("abc", "yabd")
        val expected = 2
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.min

// O(nm) time | O(nm) space
fun levenshteinDistance(str1: String, str2: String): Int {
    val edits = List(str2.length + 1) { MutableList(str1.length + 1) { j -> j } }
    for (i in 0 until str2.length + 1) {
        for (j in 0 until str1.length + 1) {
            edits[i][j] = j
        }
        edits[i][0] = i
    }

    for (i in 1 until str2.length + 1) {
        for (j in 1 until str1.length + 1) {
            if (str2[i - 1] == str1[j - 1]) {
                edits[i][j] = edits[i - 1][j - 1]
            } else {
                edits[i][j] = 1 + min(edits[i - 1][j - 1], min(edits[i - 1][j], edits[i][j - 1]))
            }
        }
    }
    return edits[str2.length][str1.length]
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.min

// O(nm) time | O(min(n, m)) space
fun levenshteinDistance(str1: String, str2: String): Int {
    var small = if (str1.length < str2.length) str1 else str2
    var big = if (str1.length >= str2.length) str1 else str2
    val evenEdits = MutableList(small.length + 1) { j -> j }
    val oddEdits = MutableList(small.length + 1) { j -> j }

    var currentEdits: MutableList<Int>
    var previousEdits: MutableList<Int>
    for (i in 1 until big.length + 1) {
        if (i % 2 == 1) {
            currentEdits = oddEdits
            previousEdits = evenEdits
        } else {
            currentEdits = evenEdits
            previousEdits = oddEdits
        }

        currentEdits[0] = i
        for (j in 1 until small.length + 1) {
            if (big[i - 1] == small[j - 1]) {
                currentEdits[j] = previousEdits[j - 1]
            } else {
                currentEdits[j] = 1 + min(previousEdits[j - 1], min(previousEdits[j], currentEdits[j - 1]))
            }
        }
    }
    return if (big.length % 2 == 0) evenEdits[small.length] else oddEdits[small.length]
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.levenshteinDistance

class ProgramTest {
    @Test
    fun TestCase1() {
        val output = levenshteinDistance("abc", "yabd")
        val expected = 2
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
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let output = program.levenshteinDistance(firstString: "abc", secondString: "yabd")
      try assertEqual(2, output)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nd) time | O(nm) space)
  func levenshteinDistance(firstString: String, secondString: String) -> Int {
    var edits = [[Int]]()

    for i in 0 ..< firstString.count + 1 {
      var row = [Int]()

      for j in 0 ..< secondString.count + 1 {
        row.append(j)
      }

      row[0] = i
      edits.append(row)
    }

    for i in 1 ..< firstString.count + 1 {
      for j in 1 ..< secondString.count + 1 {
        let firstIndex = firstString.index(firstString.startIndex, offsetBy: i - 1)
        let secondIndex = secondString.index(secondString.startIndex, offsetBy: j - 1)

        if firstString[firstIndex] == secondString[secondIndex] {
          edits[i][j] = edits[i - 1][j - 1]
        } else {
          edits[i][j] = 1 + min(edits[i - 1][j - 1], min(edits[i][j - 1], edits[i - 1][j]))
        }
      }
    }

    return edits[firstString.count][secondString.count]
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nd) time | O(min(n, m) space)
  func levenshteinDistance(firstString: String, secondString: String) -> Int {
    let small = firstString.count < secondString.count ? firstString : secondString
    let big = firstString.count >= secondString.count ? firstString : secondString

    var evenEdits = [Int]()
    var oddEdits = Array(repeating: 0, count: small.count + 1)

    for i in 0 ..< small.count + 1 {
      evenEdits.append(i)
    }

    for i in 1 ..< big.count + 1 {
      if i % 2 == 1 {
        optimizedLevenshteinHelper(bigIndex: i, smallString: small, bigString: big, currentEdits: &oddEdits, previousEdits: &evenEdits)
      } else {
        optimizedLevenshteinHelper(bigIndex: i, smallString: small, bigString: big, currentEdits: &evenEdits, previousEdits: &oddEdits)
      }
    }

    return big.count % 2 == 0 ? evenEdits[small.count] : oddEdits[small.count]
  }

  func optimizedLevenshteinHelper(bigIndex: Int, smallString: String, bigString: String, currentEdits: inout [Int], previousEdits: inout [Int]) {
    currentEdits[0] = bigIndex

    for j in 1 ..< smallString.count + 1 {
      let firstIndex = bigString.index(bigString.startIndex, offsetBy: bigIndex - 1)
      let secondIndex = smallString.index(smallString.startIndex, offsetBy: j - 1)

      if bigString[firstIndex] == smallString[secondIndex] {
        currentEdits[j] = previousEdits[j - 1]
      } else {
        currentEdits[j] = 1 + min(previousEdits[j], min(previousEdits[j - 1], currentEdits[j - 1]))
      }
    }
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let output = program.levenshteinDistance(firstString: "abc", secondString: "yabd")
      try assertEqual(2, output)
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
        self.assertEqual(program.levenshteinDistance("abc", "yabd"), 2)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nm) time | O(nm) space
def levenshteinDistance(str1, str2):
    edits = [[x for x in range(len(str1) + 1)] for y in range(len(str2) + 1)]
    for i in range(1, len(str2) + 1):
        edits[i][0] = edits[i - 1][0] + 1
    for i in range(1, len(str2) + 1):
        for j in range(1, len(str1) + 1):
            if str2[i - 1] == str1[j - 1]:
                edits[i][j] = edits[i - 1][j - 1]
            else:
                edits[i][j] = 1 + min(edits[i - 1][j - 1], edits[i - 1][j], edits[i][j - 1])
    return edits[-1][-1]

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nm) time | O(min(n, m)) space
def levenshteinDistance(str1, str2):
    small = str1 if len(str1) < len(str2) else str2
    big = str1 if len(str1) >= len(str2) else str2
    evenEdits = [x for x in range(len(small) + 1)]
    oddEdits = [None for x in range(len(small) + 1)]
    for i in range(1, len(big) + 1):
        if i % 2 == 1:
            currentEdits = oddEdits
            previousEdits = evenEdits
        else:
            currentEdits = evenEdits
            previousEdits = oddEdits
        currentEdits[0] = i
        for j in range(1, len(small) + 1):
            if big[i - 1] == small[j - 1]:
                currentEdits[j] = previousEdits[j - 1]
            else:
                currentEdits[j] = 1 + min(previousEdits[j - 1], previousEdits[j], currentEdits[j - 1])
    return evenEdits[-1] if len(big) % 2 == 0 else oddEdits[-1]

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.levenshteinDistance("abc", "yabd"), 2)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.levenshteinDistance('abc', 'yabd')).to.deep.equal(2);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nm) time | O(nm) space
export function levenshteinDistance(str1: string, str2: string) {
  const edits: number[][] = [];
  for (let i = 0; i < str2.length + 1; i++) {
    const row: number[] = [];
    for (let j = 0; j < str1.length + 1; j++) {
      row.push(j);
    }
    row[0] = i;
    edits.push(row);
  }
  for (let i = 1; i < str2.length + 1; i++) {
    for (let j = 1; j < str1.length + 1; j++) {
      if (str2[i - 1] === str1[j - 1]) {
        edits[i][j] = edits[i - 1][j - 1];
      } else {
        edits[i][j] = 1 + Math.min(edits[i - 1][j - 1], edits[i - 1][j], edits[i][j - 1]);
      }
    }
  }
  return edits[str2.length][str1.length];
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nm) time | O(min(n, m)) space
export function levenshteinDistance(str1: string, str2: string) {
  const small = str1.length < str2.length ? str1 : str2;
  const big = str1.length >= str2.length ? str1 : str2;
  const evenEdits: number[] = [];
  const oddEdits: number[] = new Array(small.length + 1);
  for (let j = 0; j < small.length + 1; j++) {
    evenEdits.push(j);
  }
  for (let i = 1; i < big.length + 1; i++) {
    let currentEdits, previousEdits;
    if (i % 2 === 1) {
      currentEdits = oddEdits;
      previousEdits = evenEdits;
    } else {
      currentEdits = evenEdits;
      previousEdits = oddEdits;
    }
    currentEdits[0] = i;
    for (let j = 1; j < small.length + 1; j++) {
      if (big[i - 1] === small[j - 1]) {
        currentEdits[j] = previousEdits[j - 1];
      } else {
        currentEdits[j] = 1 + Math.min(previousEdits[j - 1], previousEdits[j], currentEdits[j - 1]);
      }
    }
  }
  return big.length % 2 === 0 ? evenEdits[small.length] : oddEdits[small.length];
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.levenshteinDistance('abc', 'yabd')).to.deep.equal(2);
});

```

