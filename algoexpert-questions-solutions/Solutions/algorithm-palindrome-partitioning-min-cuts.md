# Palindrome Partitioning Min Cuts
<div class="html">
<p>
  Given a non-empty string, write a function that returns the minimum number of
  cuts needed to perform on the string such that each remaining substring is a
  palindrome.
</p>
<p>
  A palindrome is defined as a string that's written the same forward as
  backward. Note that single-character strings are palindromes.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">string</span> = "noonabbad"
</pre>
<h3>Sample Output</h3>
<pre>
2 <span class="CodeEditor-promptComment">// noon | abba | d"</span>
</pre>
</div>

Hint 1
<p>
Try building a two-dimensional array of the palindromicities of all substrings of the input string. Let the value stored at row i and at column j represent the palindromicity of the substring starting at index i and ending at index j.
</p>


Hint 2

<p>
Checking for palindromicity is typically an O(n) time operation. Can you eliminate this step and build the same two-dimensional array mentioned in Hint #1 a different way? Realize that the substring whose starting and ending indices are (i, j) is only a palindrome if string[i] is equal to string[j] and if the substring denoted by (i + 1, j - 1) is also a palindrome.
</p>


Hint 3

<p>
Build a one-dimensional array of the same length as the input string. At each index i in this array compute and store the minimum number of cuts needed for the substring whose starting and ending indices are (0, i). Use previously calculated values as well as the two-dimensional array mentioned in Hint #1 to find each value in this array.
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
            []() { assert(palindromePartitioningMinCuts("noonabbad") == 2); });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <climits>
using namespace std;

bool isPalindrome(string s);

// O(n^3) time | O(n^2) space
int palindromePartitioningMinCuts(string s) {
  vector<vector<bool>> palindromes(s.length(), vector<bool>(s.length(), false));
  for (int i = 0; i < s.length(); i++) {
    for (int j = i; j < s.length(); j++) {
      palindromes[i][j] = isPalindrome(s.substr(i, j + 1 - i));
    }
  }
  vector<int> cuts(s.length(), INT_MAX);
  for (int i = 0; i < s.length(); i++) {
    if (palindromes[0][i]) {
      cuts[i] = 0;
    } else {
      cuts[i] = cuts[i - 1] + 1;
      for (int j = 1; j < i; j++) {
        if (palindromes[j][i] && cuts[j - 1] + 1 < cuts[i]) {
          cuts[i] = cuts[j - 1] + 1;
        }
      }
    }
  }
  return cuts[s.length() - 1];
}

bool isPalindrome(string s) {
  int leftIdx = 0;
  int rightIdx = s.length() - 1;
  while (leftIdx < rightIdx) {
    if (s[leftIdx] != s[rightIdx]) {
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
#include <climits>
using namespace std;

// O(n^2) time | O(n^2) space
int palindromePartitioningMinCuts(string s) {
  vector<vector<bool>> palindromes(s.length(), vector<bool>(s.length(), false));
  for (int i = 0; i < s.length(); i++) {
    palindromes[i][i] = true;
  }
  for (int length = 2; length < s.length() + 1; length++) {
    for (int i = 0; i < s.length() - length + 1; i++) {
      int j = i + length - 1;
      if (length == 2) {
        palindromes[i][j] = (s[i] == s[j]);
      } else {
        palindromes[i][j] = (s[i] == s[j] && palindromes[i + 1][j - 1]);
      }
    }
  }
  vector<int> cuts(s.length(), INT_MAX);
  for (int i = 0; i < s.length(); i++) {
    if (palindromes[0][i]) {
      cuts[i] = 0;
    } else {
      cuts[i] = cuts[i - 1] + 1;
      for (int j = 1; j < i; j++) {
        if (palindromes[j][i] && cuts[j - 1] + 1 < cuts[i]) {
          cuts[i] = cuts[j - 1] + 1;
        }
      }
    }
  }
  return cuts[s.length() - 1];
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1",
            []() { assert(palindromePartitioningMinCuts("noonabbad") == 2); });
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
		Utils.AssertTrue(Program.PalindromePartitioningMinCuts("noonabbad") == 2);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;

public class Program {
	// O(n^3) time | O(n^2) space
	public static int PalindromePartitioningMinCuts(string str) {
		bool[,] palindromes = new bool[str.Length,str.Length];
		for (int i = 0; i < str.Length; i++) {
			for (int j = i; j < str.Length; j++) {
				palindromes[i,j] = IsPalindrome(str.Substring(i, j + 1 - i));
			}
		}
		int[] cuts = new int[str.Length];
		Array.Fill(cuts, Int32.MaxValue);
		for (int i = 0; i < str.Length; i++) {
			if (palindromes[0,i]) {
				cuts[i] = 0;
			} else {
				cuts[i] = cuts[i - 1] + 1;
				for (int j = 1; j < i; j++) {
					if (palindromes[j,i] && cuts[j - 1] + 1 < cuts[i]) {
						cuts[i] = cuts[j - 1] + 1;
					}
				}
			}
		}
		return cuts[str.Length - 1];
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

using System;

public class Program {
	// O(n^2) time | O(n^2) space
	public static int PalindromePartitioningMinCuts(string str) {
		bool[,] palindromes = new bool[str.Length,str.Length];
		for (int i = 0; i < str.Length; i++) {
			for (int j = 0; j < str.Length; j++) {
				if (i == j) {
					palindromes[i,j] = true;
				} else {
					palindromes[i,j] = false;
				}
			}
		}
		for (int length = 2; length < str.Length + 1; length++) {
			for (int i = 0; i < str.Length - length + 1; i++) {
				int j = i + length - 1;
				if (length == 2) {
					palindromes[i,j] = (str[i] == str[j]);
				} else {
					palindromes[i,
					  j] =
					  (str[i] == str[j] && palindromes[i + 1,j - 1]);
				}
			}
		}
		int[] cuts = new int[str.Length];
		Array.Fill(cuts, Int32.MaxValue);
		for (int i = 0; i < str.Length; i++) {
			if (palindromes[0,i]) {
				cuts[i] = 0;
			} else {
				cuts[i] = cuts[i - 1] + 1;
				for (int j = 1; j < i; j++) {
					if (palindromes[j,i] && cuts[j - 1] + 1 < cuts[i]) {
						cuts[i] = cuts[j - 1] + 1;
					}
				}
			}
		}
		return cuts[str.Length - 1];
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		Utils.AssertTrue(Program.PalindromePartitioningMinCuts("noonabbad") == 2);
	}
}

```
### Sandbox Code (go)
```go
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

package main

import "github.com/stretchr/testify/require"

func (s *TestSuite) TestCase1(t *TestCase) {
	output := PalindromePartitioningMinCuts("noonabbad")
	require.Equal(t, 2, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "math"

func PalindromePartitioningMinCuts(s string) int {
	palindromes := make([][]bool, len(s))
	for i := range palindromes {
		palindromes[i] = make([]bool, len(s))
	}
	for i := range s {
		for j := i; j < len(s); j++ {
			palindromes[i][j] = isPalindrome(s[i : j+1])
		}
	}
	cuts := make([]int, len(s))
	for i := range cuts {
		cuts[i] = math.MinInt32
	}
	for i := range s {
		if palindromes[0][i] {
			cuts[i] = 0
		} else {
			cuts[i] = cuts[i-1] + 1
			for j := 1; j < i; j++ {
				if palindromes[j][i] && cuts[j-1]+1 < cuts[i] {
					cuts[i] = cuts[j-1] + 1
				}
			}
		}
	}
	return cuts[len(s)-1]
}

func isPalindrome(s string) bool {
	for i := 0; i < len(s)/2; i++ {
		if s[i] != s[len(s)-i-1] {
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

import "math"

// O(n^2) time | O(n^2) space
func PalindromePartitioningMinCuts(str string) int {
	palindromes := make([][]bool, len(str))
	for i := range palindromes {
		palindromes[i] = make([]bool, len(str))
	}
	for i := range str {
		palindromes[i][i] = true
	}
	for length := 2; length < len(str)+1; length++ {
		for i := 0; i < len(str)-length+1; i++ {
			j := i + length - 1
			if length == 2 {
				palindromes[i][j] = (str[i] == str[j])
			} else {
				palindromes[i][j] = (str[i] == str[j] && palindromes[i+1][j-1])
			}
		}
	}
	cuts := make([]int, len(str))
	for i := range cuts {
		cuts[i] = math.MaxInt32
	}
	for i := range str {
		if palindromes[0][i] {
			cuts[i] = 0
		} else {
			cuts[i] = cuts[i-1] + 1
			for j := 1; j < i; j++ {
				if palindromes[j][i] && cuts[j-1]+1 < cuts[i] {
					cuts[i] = cuts[j-1] + 1
				}
			}
		}
	}
	return cuts[len(cuts)-1]
}

```
### Unit Tests 1 (go)
```go
package main

import "github.com/stretchr/testify/require"

func (s *TestSuite) TestCase1(t *TestCase) {
	output := PalindromePartitioningMinCuts("noonabbad")
	require.Equal(t, 2, output)
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
    Utils.assertTrue(Program.palindromePartitioningMinCuts("noonabbad") == 2);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.Arrays;

class Program {
  // O(n^3) time | O(n^2) space
  public static int palindromePartitioningMinCuts(String str) {
    boolean[][] palindromes = new boolean[str.length()][str.length()];
    for (int i = 0; i < str.length(); i++) {
      for (int j = i; j < str.length(); j++) {
        palindromes[i][j] = isPalindrome(str.substring(i, j + 1));
      }
    }
    int[] cuts = new int[str.length()];
    Arrays.fill(cuts, Integer.MAX_VALUE);
    for (int i = 0; i < str.length(); i++) {
      if (palindromes[0][i]) {
        cuts[i] = 0;
      } else {
        cuts[i] = cuts[i - 1] + 1;
        for (int j = 1; j < i; j++) {
          if (palindromes[j][i] && cuts[j - 1] + 1 < cuts[i]) {
            cuts[i] = cuts[j - 1] + 1;
          }
        }
      }
    }
    return cuts[str.length() - 1];
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

import java.util.Arrays;

class Program {
  // O(n^2) time | O(n^2) space
  public static int palindromePartitioningMinCuts(String str) {
    boolean[][] palindromes = new boolean[str.length()][str.length()];
    for (int i = 0; i < str.length(); i++) {
      for (int j = 0; j < str.length(); j++) {
        if (i == j) {
          palindromes[i][j] = true;
        } else {
          palindromes[i][j] = false;
        }
      }
    }
    for (int length = 2; length < str.length() + 1; length++) {
      for (int i = 0; i < str.length() - length + 1; i++) {
        int j = i + length - 1;
        if (length == 2) {
          palindromes[i][j] = (str.charAt(i) == str.charAt(j));
        } else {
          palindromes[i][j] = (str.charAt(i) == str.charAt(j) && palindromes[i + 1][j - 1]);
        }
      }
    }
    int[] cuts = new int[str.length()];
    Arrays.fill(cuts, Integer.MAX_VALUE);
    for (int i = 0; i < str.length(); i++) {
      if (palindromes[0][i]) {
        cuts[i] = 0;
      } else {
        cuts[i] = cuts[i - 1] + 1;
        for (int j = 1; j < i; j++) {
          if (palindromes[j][i] && cuts[j - 1] + 1 < cuts[i]) {
            cuts[i] = cuts[j - 1] + 1;
          }
        }
      }
    }
    return cuts[str.length() - 1];
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    Utils.assertTrue(Program.palindromePartitioningMinCuts("noonabbad") == 2);
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
  chai.expect(program.palindromePartitioningMinCuts('noonabbad')).to.deep.equal(2);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^3) time | O(n^2) space
function palindromePartitioningMinCuts(string) {
  const palindromes = new Array(string.length).fill(1).map(row => []);
  for (let i = 0; i < string.length; i++) {
    for (let j = i; j < string.length; j++) {
      palindromes[i][j] = isPalindrome(string.slice(i, j + 1));
    }
  }
  const cuts = new Array(string.length);
  cuts.fill(Infinity);
  for (let i = 0; i < string.length; i++) {
    if (palindromes[0][i]) {
      cuts[i] = 0;
    } else {
      cuts[i] = cuts[i - 1] + 1;
      for (let j = 1; j < i; j++) {
        if (palindromes[j][i] && cuts[j - 1] + 1 < cuts[i]) {
          cuts[i] = cuts[j - 1] + 1;
        }
      }
    }
  }
  return cuts[cuts.length - 1];
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

exports.palindromePartitioningMinCuts = palindromePartitioningMinCuts;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n^2) space
function palindromePartitioningMinCuts(string) {
  const palindromes = [];
  for (let i = 0; i < string.length; i++) {
    const row = [];
    for (let j = 0; j < string.length; j++) {
      if (i === j) {
        row.push(true);
      } else {
        row.push(false);
      }
    }
    palindromes.push(row);
  }
  for (let length = 2; length < string.length + 1; length++) {
    for (let i = 0; i < string.length - length + 1; i++) {
      const j = i + length - 1;
      if (length === 2) {
        palindromes[i][j] = string[i] === string[j];
      } else {
        palindromes[i][j] = string[i] === string[j] && palindromes[i + 1][j - 1];
      }
    }
  }
  const cuts = new Array(string.length);
  cuts.fill(Infinity);
  for (let i = 0; i < string.length; i++) {
    if (palindromes[0][i]) {
      cuts[i] = 0;
    } else {
      cuts[i] = cuts[i - 1] + 1;
      for (let j = 1; j < i; j++) {
        if (palindromes[j][i] && cuts[j - 1] + 1 < cuts[i]) {
          cuts[i] = cuts[j - 1] + 1;
        }
      }
    }
  }
  return cuts[cuts.length - 1];
}

exports.palindromePartitioningMinCuts = palindromePartitioningMinCuts;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.palindromePartitioningMinCuts('noonabbad')).to.deep.equal(2);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.palindromePartitioningMinCuts

class ProgramTest {
    @Test
    fun TestCase1() {
        assert(palindromePartitioningMinCuts("noonabbad") == 2)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^3) time | O(n^2) space
fun palindromePartitioningMinCuts(str: String): Int {
    val palindromes = Array(str.length) { Array(str.length) { false } }
    for (i in 0 until str.length) {
        for (j in i until str.length) {
            palindromes[i][j] = isPalindrome(str.substring(i, j + 1))
        }
    }

    val cuts = Array(str.length) { Int.MAX_VALUE }
    for (i in 0 until str.length) {
        if (palindromes[0][i]) {
            cuts[i] = 0
        } else {
            cuts[i] = cuts[i - 1] + 1
            for (j in 1 until i) {
                if (palindromes[j][i] && cuts[j - 1] + 1 < cuts[i]) {
                    cuts[i] = cuts[j - 1] + 1
                }
            }
        }
    }
    return cuts[str.length - 1]
}

fun isPalindrome(str: String): Boolean {
    var leftIdx = 0
    var rightIdx = str.length - 1
    while (leftIdx < rightIdx) {
        if (str[leftIdx] != str[rightIdx]) {
            return false
        }
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

// O(n^2) time | O(n^2) space
fun palindromePartitioningMinCuts(str: String): Int {
    val palindromes = Array(str.length) { Array(str.length) { false } }
    for (i in 0 until str.length) {
        for (j in i until str.length) {
            if (i == j) {
                palindromes[i][j] = true
            } else {
                palindromes[i][j] = false
            }
        }
    }

    for (length in 2 until str.length + 1) {
        for (i in 0 until str.length - length + 1) {
            val j = i + length - 1
            if (length == 2) {
                palindromes[i][j] = (str[i] == str[j])
            } else {
                palindromes[i][j] = (str[i] == str[j] && palindromes[i + 1][j - 1])
            }
        }
    }

    val cuts = Array(str.length) { Int.MAX_VALUE }
    for (i in 0 until str.length) {
        if (palindromes[0][i]) {
            cuts[i] = 0
        } else {
            cuts[i] = cuts[i - 1] + 1
            for (j in 1 until i) {
                if (palindromes[j][i] && cuts[j - 1] + 1 < cuts[i]) {
                    cuts[i] = cuts[j - 1] + 1
                }
            }
        }
    }
    return cuts[str.length - 1]
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.palindromePartitioningMinCuts

class ProgramTest {
    @Test
    fun TestCase1() {
        assert(palindromePartitioningMinCuts("noonabbad") == 2)
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
      try assertEqual(2, program.palindromePartitioningMinCuts("noonabbad"))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^3) time | O(n^2) space
  func palindromePartitioningMinCuts(_ string: String) -> Int {
    var palindromes = string.map { _ in Array(repeating: false, count: string.count) }

    for i in 0 ..< string.count {
      for j in i ..< string.count {
        let leftIndex = string.index(string.startIndex, offsetBy: i)
        let rightIndex = string.index(string.startIndex, offsetBy: j)
        let subString = String(string[leftIndex ... rightIndex])

        palindromes[i][j] = isPalindrome(subString)
      }
    }

    var cuts = Array(repeating: Int.max, count: string.count)

    for i in 0 ..< string.count {
      if palindromes[0][i] {
        cuts[i] = 0
      } else {
        cuts[i] = cuts[i - 1] + 1

        for j in 1 ..< i {
          if palindromes[j][i], cuts[j - 1] + 1 < cuts[i] {
            cuts[i] = cuts[j - 1] + 1
          }
        }
      }
    }

    return cuts[string.count - 1]
  }

  func isPalindrome(_ string: String) -> Bool {
    var leftIndex = 0
    var rightIndex = string.count - 1

    while leftIndex < rightIndex {
      let leftStringIndex = string.index(string.startIndex, offsetBy: leftIndex)
      let rightStringIndex = string.index(string.startIndex, offsetBy: rightIndex)

      if string[leftStringIndex] != string[rightStringIndex] {
        return false
      }

      leftIndex += 1
      rightIndex -= 1
    }

    return true
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(n^2) space
  func palindromePartitioningMinCuts(_ string: String) -> Int {
    var palindromes = string.map { _ in Array(repeating: false, count: string.count) }

    for i in 0 ..< string.count {
      palindromes[i][i] = true
    }

    for length in stride(from: 2, through: string.count, by: 1) {
      for i in stride(from: 0, through: string.count - length, by: 1) {
        let j = i + length - 1

        let iStringIndex = string.index(string.startIndex, offsetBy: i)
        let jStringIndex = string.index(string.startIndex, offsetBy: j)

        if length == 2, string[iStringIndex] == string[jStringIndex] {
          palindromes[i][j] = true
        } else if palindromes[i + 1][j - 1], string[iStringIndex] == string[jStringIndex] {
          palindromes[i][j] = true
        }
      }
    }

    var cuts = Array(repeating: Int.max, count: string.count)

    for i in 0 ..< string.count {
      if palindromes[0][i] {
        cuts[i] = 0
      } else {
        cuts[i] = cuts[i - 1] + 1

        for j in 1 ..< i {
          if palindromes[j][i], cuts[j - 1] + 1 < cuts[i] {
            cuts[i] = cuts[j - 1] + 1
          }
        }
      }
    }

    return cuts[string.count - 1]
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      try assertEqual(2, program.palindromePartitioningMinCuts("noonabbad"))
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
        self.assertEqual(program.palindromePartitioningMinCuts("noonabbad"), 2)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^3) time | O(n^2) space
def palindromePartitioningMinCuts(string):
    palindromes = [[False for i in string] for j in string]
    for i in range(len(string)):
        for j in range(i, len(string)):
            palindromes[i][j] = isPalindrome(string[i : j + 1])
    cuts = [float("inf") for i in string]
    for i in range(len(string)):
        if palindromes[0][i]:
            cuts[i] = 0
        else:
            cuts[i] = cuts[i - 1] + 1
            for j in range(1, i):
                if palindromes[j][i] and cuts[j - 1] + 1 < cuts[i]:
                    cuts[i] = cuts[j - 1] + 1
    return cuts[-1]


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

# O(n^2) time | O(n^2) space
def palindromePartitioningMinCuts(string):
    palindromes = [[False for i in string] for j in string]
    for i in range(len(string)):
        palindromes[i][i] = True
    for length in range(2, len(string) + 1):
        for i in range(0, len(string) - length + 1):
            j = i + length - 1
            if length == 2:
                palindromes[i][j] = string[i] == string[j]
            else:
                palindromes[i][j] = string[i] == string[j] and palindromes[i + 1][j - 1]
    cuts = [float("inf") for i in string]
    for i in range(len(string)):
        if palindromes[0][i]:
            cuts[i] = 0
        else:
            cuts[i] = cuts[i - 1] + 1
            for j in range(1, i):
                if palindromes[j][i] and cuts[j - 1] + 1 < cuts[i]:
                    cuts[i] = cuts[j - 1] + 1
    return cuts[-1]

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.palindromePartitioningMinCuts("noonabbad"), 2)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.palindromePartitioningMinCuts('noonabbad')).to.deep.equal(2);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^3) time | O(n^2) space
export function palindromePartitioningMinCuts(string: string) {
  const palindromes: boolean[][] = new Array(string.length).fill(1).map(row => []);
  for (let i = 0; i < string.length; i++) {
    for (let j = i; j < string.length; j++) {
      palindromes[i][j] = isPalindrome(string.slice(i, j + 1));
    }
  }
  const cuts: number[] = new Array(string.length);
  cuts.fill(Infinity);
  for (let i = 0; i < string.length; i++) {
    if (palindromes[0][i]) {
      cuts[i] = 0;
    } else {
      cuts[i] = cuts[i - 1] + 1;
      for (let j = 1; j < i; j++) {
        if (palindromes[j][i] && cuts[j - 1] + 1 < cuts[i]) {
          cuts[i] = cuts[j - 1] + 1;
        }
      }
    }
  }
  return cuts[cuts.length - 1];
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

// O(n^2) time | O(n^2) space
export function palindromePartitioningMinCuts(string: string) {
  const palindromes: boolean[][] = [];
  for (let i = 0; i < string.length; i++) {
    const row: boolean[] = [];
    for (let j = 0; j < string.length; j++) {
      if (i === j) {
        row.push(true);
      } else {
        row.push(false);
      }
    }
    palindromes.push(row);
  }
  for (let length = 2; length < string.length + 1; length++) {
    for (let i = 0; i < string.length - length + 1; i++) {
      const j = i + length - 1;
      if (length === 2) {
        palindromes[i][j] = string[i] === string[j];
      } else {
        palindromes[i][j] = string[i] === string[j] && palindromes[i + 1][j - 1];
      }
    }
  }
  const cuts: number[] = new Array(string.length);
  cuts.fill(Infinity);
  for (let i = 0; i < string.length; i++) {
    if (palindromes[0][i]) {
      cuts[i] = 0;
    } else {
      cuts[i] = cuts[i - 1] + 1;
      for (let j = 1; j < i; j++) {
        if (palindromes[j][i] && cuts[j - 1] + 1 < cuts[i]) {
          cuts[i] = cuts[j - 1] + 1;
        }
      }
    }
  }
  return cuts[cuts.length - 1];
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.palindromePartitioningMinCuts('noonabbad')).to.deep.equal(2);
});

```

