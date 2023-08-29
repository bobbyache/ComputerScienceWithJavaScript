# Pattern Matcher
<div class="html">
<p>
  You're given two non-empty strings. The first one is a pattern consisting of
  only <span>"x"</span>s and / or <span>"y"</span>s; the other one is a normal
  string of alphanumeric characters. Write a function that checks whether the
  normal string matches the pattern.
</p>
<p>
  A string <span>S0</span> is said to match a pattern if replacing all
  <span>"x"</span>s in the pattern with some non-empty substring
  <span>S1</span> of <span>S0</span> and replacing all <span>"y"</span>s in the
  pattern with some non-empty substring <span>S2</span> of
  <span>S0</span> yields the same string <span>S0</span>.
</p>
<p>
  If the input string doesn't match the input pattern, the function should
  return an empty array; otherwise, it should return an array holding the
  strings <span>S1</span> and <span>S2</span> that represent
  <span>"x"</span> and <span>"y"</span> in the normal string, in that order. If
  the pattern doesn't contain any <span>"x"</span>s or <span>"y"</span>s, the
  respective letter should be represented by an empty string in the final array
  that you return.
</p>
<p>
  You can assume that there will never be more than one pair of strings
  <span>S1</span> and <span>S2</span> that appropriately represent
  <span>"x"</span> and <span>"y"</span> in the normal string.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">pattern</span> = "xxyxxy"
<span class="CodeEditor-promptParameter">string</span> = "gogopowerrangergogopowerranger"
</pre>
<h3>Sample Output</h3>
<pre>
["go", "powerranger"]
</pre>
</div>

Hint 1
<p>
Start by checking if the pattern starts with an "x". If it doesn't, consider generating a new pattern that swaps all "x"s for "y"s and vice versa; this might greatly simplify the rest of your algorithm. Make sure to keep track of whether or not you do this swap, as your final answer will be affected by it.
</p>


Hint 2

<p>
Use a hash table to store the number of "x"s and "y"s that appear in the pattern, and keep track of the position of the first "y". Knowing how many "x"s and "y"s appear in the pattern, paired with the length of the main string which you have access to, will allow you to quickly test out various possible lengths for "x" and "y". Knowing where the first "y" appears in the pattern will allow you to actually generate potential substrings.
</p>


Hint 3

<p>
Traverse the main string and try different combinations of substrings that could represent "x" and "y". For each potential combination, map the new pattern mentioned in Hint #1 and see if it matches the main string.
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
      vector<string> expected{"go", "powerranger"};
      assert(patternMatcher("xxyxxy", "gogopowerrangergogopowerranger") ==
             expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <numeric>
#include <algorithm>
#include <unordered_map>
#include <math.h>
using namespace std;

vector<char> getNewPattern(string pattern);
int getCountsAndFirstYPos(vector<char> pattern,
                          unordered_map<char, int> *counts);

// O(n^2 + m) time | O(n + m) space
vector<string> patternMatcher(string pattern, string str) {
  if (pattern.length() > str.length()) {
    return vector<string>{};
  }
  vector<char> newPattern = getNewPattern(pattern);
  bool didSwitch = newPattern[0] != pattern[0];
  unordered_map<char, int> counts({{'x', 0}, {'y', 0}});
  int firstYPos = getCountsAndFirstYPos(newPattern, &counts);
  if (counts['y'] != 0) {
    for (int lenOfX = 1; lenOfX < str.length(); lenOfX++) {
      double lenOfY =
          ((double)str.length() - (double)lenOfX * (double)counts['x']) /
          (double)counts['y'];
      if (lenOfY <= 0 || fmod(lenOfY, 1) != 0) {
        continue;
      }
      int yIdx = firstYPos * lenOfX;
      string x = str.substr(0, lenOfX);
      string y = str.substr(yIdx, lenOfY);
      vector<string> potentialMatch(newPattern.size(), "");
      transform(newPattern.begin(), newPattern.end(), potentialMatch.begin(),
                [x, y](char c) -> string { return c == 'x' ? x : y; });
      if (str == accumulate(potentialMatch.begin(), potentialMatch.end(),
                            string(""))) {
        return !didSwitch ? vector<string>{x, y} : vector<string>{y, x};
      }
    }
  } else {
    double lenOfX = str.length() / counts['x'];
    if (fmod(lenOfX, 1) == 0) {
      string x = str.substr(0, lenOfX);
      vector<string> potentialMatch(newPattern.size(), "");
      transform(newPattern.begin(), newPattern.end(), potentialMatch.begin(),
                [x](char c) -> string { return x; });
      if (str == accumulate(potentialMatch.begin(), potentialMatch.end(),
                            string(""))) {
        return !didSwitch ? vector<string>{x, ""} : vector<string>{"", x};
      }
    }
  }
  return vector<string>{};
}

vector<char> getNewPattern(string pattern) {
  vector<char> patternLetters(pattern.begin(), pattern.end());
  if (pattern[0] == 'x') {
    return patternLetters;
  } else {
    transform(patternLetters.begin(), patternLetters.end(),
              patternLetters.begin(),
              [](char c) -> char { return c == 'y' ? 'x' : 'y'; });
    return patternLetters;
  }
}

int getCountsAndFirstYPos(vector<char> pattern,
                          unordered_map<char, int> *counts) {
  int firstYPos = -1;
  for (int i = 0; i < pattern.size(); i++) {
    char c = pattern[i];
    counts->at(c)++;
    if (c == 'y' && firstYPos == -1) {
      firstYPos = i;
    }
  }
  return firstYPos;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<string> expected{"go", "powerranger"};
      assert(patternMatcher("xxyxxy", "gogopowerrangergogopowerranger") ==
             expected);
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
		string[] expected = {"go", "powerranger"};
		string inputPattern = "xxyxxy";
		string inputstring = "gogopowerrangergogopowerranger";
		Utils.AssertTrue(compare(Program.PatternMatcher(inputPattern,
		  inputstring), expected));
	}

	public bool compare(string[] arr1, string[] arr2) {
		if (arr1.Length != arr2.Length) {
			return false;
		}
		if (arr1.Length == 0 && arr2.Length == 0) {
			return true;
		}
		return arr1[0].Equals(arr2[0]) && arr1[1].Equals(arr2[1]);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Text;
using System.Collections.Generic;

public class Program {
	// O(n^2 + m) time | O(n + m) space
	public static string[] PatternMatcher(string pattern, string str) {
		if (pattern.Length > str.Length) {
			return new string[] {};
		}
		char[] newPattern = getNewPattern(pattern);
		bool didSwitch = newPattern[0] != pattern[0];
		Dictionary<char, int> counts = new Dictionary<char, int>();
		counts['x'] = 0;
		counts['y'] = 0;
		int firstYPos = getCountsAndFirstYPos(newPattern, counts);
		if (counts['y'] != 0) {
			for (int lenOfX = 1; lenOfX < str.Length; lenOfX++) {
				double lenOfY =
				  ((double)str.Length - (double)lenOfX *
				  (double)counts['x']) /
				  (double)counts['y'];
				if (lenOfY <= 0 || lenOfY % 1 != 0) {
					continue;
				}
				int yIdx = firstYPos * lenOfX;
				string x = str.Substring(0, lenOfX);
				string y = str.Substring(yIdx, (int)lenOfY);
				string potentialMatch = buildPotentialMatch(newPattern, x, y);
				if (str.Equals(potentialMatch)) {
					return didSwitch ? new string[] {y, x} : new string[] {x,
						                                               y};
				}
			}
		} else {
			double lenOfX = str.Length / counts['x'];
			if (lenOfX % 1 == 0) {
				string x = str.Substring(0, (int)lenOfX);
				string potentialMatch = buildPotentialMatch(newPattern, x, "");
				if (str.Equals(potentialMatch)) {
					return didSwitch ? new string[] {"", x} : new string[] {x,
						                                                ""};
				}
			}
		}
		return new string[] {};
	}

	public static char[] getNewPattern(string pattern) {
		char[] patternLetters = pattern.ToCharArray();
		if (pattern[0] == 'x') {
			return patternLetters;
		}
		for (int i = 0; i < patternLetters.Length; i++) {
			if (patternLetters[i] == 'x') {
				patternLetters[i] = 'y';
			} else {
				patternLetters[i] = 'x';
			}
		}
		return patternLetters;
	}

	public static int getCountsAndFirstYPos(char[] pattern, Dictionary<char, int> counts) {
		int firstYPos = -1;
		for (int i = 0; i < pattern.Length; i++) {
			char c = pattern[i];
			counts[c] = counts[c] + 1;
			if (c == 'y' && firstYPos == -1) {
				firstYPos = i;
			}
		}
		return firstYPos;
	}

	public static string buildPotentialMatch(char[] pattern, string x, string y) {
		StringBuilder potentialMatch = new StringBuilder();
		foreach (char c in pattern) {
			if (c == 'x') {
				potentialMatch.Append(x);
			} else {
				potentialMatch.Append(y);
			}
		}
		return potentialMatch.ToString();
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		string[] expected = {"go", "powerranger"};
		string inputPattern = "xxyxxy";
		string inputstring = "gogopowerrangergogopowerranger";
		Utils.AssertTrue(compare(Program.PatternMatcher(inputPattern,
		  inputstring), expected));
	}

	public bool compare(string[] arr1, string[] arr2) {
		if (arr1.Length != arr2.Length) {
			return false;
		}
		if (arr1.Length == 0 && arr2.Length == 0) {
			return true;
		}
		return arr1[0].Equals(arr2[0]) && arr1[1].Equals(arr2[1]);
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
	expected := []string{"go", "powerranger"}
	output := PatternMatcher("xxyxxy", "gogopowerrangergogopowerranger")
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "strings"

type counts struct {
	x int
	y int
}

// O(n^2 + m) time | O(n + m) space
func PatternMatcher(pattern string, str string) []string {
	if len(pattern) > len(str) {
		return []string{}
	}
	pattern, switched := getNewPattern(pattern)
	count, firstY := getCountsAndFirstYPos(pattern)
	if count.y != 0 {
		for lenx := 1; lenx < len(str); lenx++ {
			totalLeny := len(str) - lenx*count.x
			if len(str) <= lenx*count.x || totalLeny%count.y != 0 {
				continue
			}
			leny := totalLeny / count.y
			yindex := firstY * lenx
			x, y := str[:lenx], str[yindex:yindex+leny]
			potentialMatch := doReplace(pattern, x, y, count)
			if str == potentialMatch {
				if !switched {
					return []string{x, y}
				}
				return []string{y, x}
			}
		}
	} else {
		if len(str)%count.x == 0 {
			lenx := len(str) / count.x
			x := str[:lenx]
			potentialMatch := strings.Repeat(x, len(pattern))
			if str == potentialMatch {
				if !switched {
					return []string{x, ""}
				}
				return []string{"", x}
			}
		}
	}

	return []string{}
}

func doReplace(pattern, x, y string, count counts) string {
	result := make([]byte, 0)
	for _, r := range pattern {
		if r == 'x' {
			result = append(result, []byte(x)...)
		} else {
			result = append(result, []byte(y)...)
		}
	}
	return string(result)
}

func getNewPattern(pattern string) (string, bool) {
	if pattern[0] == 'x' {
		return pattern, false
	}
	runes := make([]rune, len(pattern))
	for i := range pattern {
		if pattern[i] == 'x' {
			runes[i] = 'y'
		} else {
			runes[i] = 'x'
		}
	}
	return string(runes), true
}

func getCountsAndFirstYPos(pattern string) (counts, int) {
	firstY := strings.Index(pattern, "y")
	count := counts{}
	for _, r := range pattern {
		if r == 'x' {
			count.x += 1
		} else {
			count.y += 1
		}
	}
	return count, firstY
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := []string{"go", "powerranger"}
	output := PatternMatcher("xxyxxy", "gogopowerrangergogopowerranger")
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
    String[] expected = {"go", "powerranger"};
    String inputPattern = "xxyxxy";
    String inputString = "gogopowerrangergogopowerranger";
    Utils.assertTrue(compare(Program.patternMatcher(inputPattern, inputString), expected));
  }

  public boolean compare(String[] arr1, String[] arr2) {
    if (arr1.length != arr2.length) {
      return false;
    }
    if (arr1.length == 0 && arr2.length == 0) {
      return true;
    }
    return arr1[0].equals(arr2[0]) && arr1[1].equals(arr2[1]);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n^2 + m) time | O(n + m) space
  public static String[] patternMatcher(String pattern, String str) {
    if (pattern.length() > str.length()) {
      return new String[] {};
    }
    char[] newPattern = getNewPattern(pattern);
    boolean didSwitch = newPattern[0] != pattern.charAt(0);
    Map<Character, Integer> counts = new HashMap<Character, Integer>();
    counts.put('x', 0);
    counts.put('y', 0);
    int firstYPos = getCountsAndFirstYPos(newPattern, counts);
    if (counts.get('y') != 0) {
      for (int lenOfX = 1; lenOfX < str.length(); lenOfX++) {
        double lenOfY =
            ((double) str.length() - (double) lenOfX * (double) counts.get('x'))
                / (double) counts.get('y');
        if (lenOfY <= 0 || lenOfY % 1 != 0) {
          continue;
        }
        int yIdx = firstYPos * lenOfX;
        String x = str.substring(0, lenOfX);
        String y = str.substring(yIdx, yIdx + (int) lenOfY);
        String potentialMatch = buildPotentialMatch(newPattern, x, y);
        if (str.equals(potentialMatch)) {
          return didSwitch ? new String[] {y, x} : new String[] {x, y};
        }
      }
    } else {
      double lenOfX = str.length() / counts.get('x');
      if (lenOfX % 1 == 0) {
        String x = str.substring(0, (int) lenOfX);
        String potentialMatch = buildPotentialMatch(newPattern, x, "");
        if (str.equals(potentialMatch)) {
          return didSwitch ? new String[] {"", x} : new String[] {x, ""};
        }
      }
    }
    return new String[] {};
  }

  public static char[] getNewPattern(String pattern) {
    char[] patternLetters = pattern.toCharArray();
    if (pattern.charAt(0) == 'x') {
      return patternLetters;
    }
    for (int i = 0; i < patternLetters.length; i++) {
      if (patternLetters[i] == 'x') {
        patternLetters[i] = 'y';
      } else {
        patternLetters[i] = 'x';
      }
    }
    return patternLetters;
  }

  public static int getCountsAndFirstYPos(char[] pattern, Map<Character, Integer> counts) {
    int firstYPos = -1;
    for (int i = 0; i < pattern.length; i++) {
      char c = pattern[i];
      counts.put(c, counts.get(c) + 1);
      if (c == 'y' && firstYPos == -1) {
        firstYPos = i;
      }
    }
    return firstYPos;
  }

  public static String buildPotentialMatch(char[] pattern, String x, String y) {
    StringBuilder potentialMatch = new StringBuilder();
    for (char c : pattern) {
      if (c == 'x') {
        potentialMatch.append(x);
      } else {
        potentialMatch.append(y);
      }
    }
    return potentialMatch.toString();
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    String[] expected = {"go", "powerranger"};
    String inputPattern = "xxyxxy";
    String inputString = "gogopowerrangergogopowerranger";
    Utils.assertTrue(compare(Program.patternMatcher(inputPattern, inputString), expected));
  }

  public boolean compare(String[] arr1, String[] arr2) {
    if (arr1.length != arr2.length) {
      return false;
    }
    if (arr1.length == 0 && arr2.length == 0) {
      return true;
    }
    return arr1[0].equals(arr2[0]) && arr1[1].equals(arr2[1]);
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
  chai.expect(program.patternMatcher('xxyxxy', 'gogopowerrangergogopowerranger')).to.deep.equal(['go', 'powerranger']);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2 + m) time | O(n + m) space
function patternMatcher(pattern, string) {
  if (pattern.length > string.length) return [];
  const newPattern = getNewPattern(pattern);
  const didSwitch = newPattern[0] !== pattern[0];
  const counts = {x: 0, y: 0};
  const firstYPos = getCountsAndFirstYPos(newPattern, counts);
  if (counts['y'] !== 0) {
    for (let lenOfX = 1; lenOfX < string.length; lenOfX++) {
      const lenOfY = (string.length - lenOfX * counts['x']) / counts['y'];
      if (lenOfY <= 0 || lenOfY % 1 !== 0) continue;
      const yIdx = firstYPos * lenOfX;
      const x = string.slice(0, lenOfX);
      const y = string.slice(yIdx, yIdx + lenOfY);
      const potentialMatch = newPattern.map(char => (char === 'x' ? x : y));
      if (string === potentialMatch.join('')) {
        return !didSwitch ? [x, y] : [y, x];
      }
    }
  } else {
    const lenOfX = string.length / counts['x'];
    if (lenOfX % 1 === 0) {
      const x = string.slice(0, lenOfX);
      const potentialMatch = newPattern.map(char => (char === 'x' ? x : ''));
      if (string === potentialMatch.join('')) {
        return !didSwitch ? [x, ''] : ['', x];
      }
    }
  }
  return [];
}

function getNewPattern(pattern) {
  const patternLetters = pattern.split('');
  if (pattern[0] === 'x') {
    return patternLetters;
  } else {
    return patternLetters.map(char => (char === 'y' ? 'x' : 'y'));
  }
}

function getCountsAndFirstYPos(pattern, counts) {
  let firstYPos = null;
  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    counts[char]++;
    if (char === 'y' && firstYPos === null) firstYPos = i;
  }
  return firstYPos;
}

exports.patternMatcher = patternMatcher;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.patternMatcher('xxyxxy', 'gogopowerrangergogopowerranger')).to.deep.equal(['go', 'powerranger']);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.patternMatcher as patternMatcher

class ProgramTest {
    @Test
    fun TestCase1() {
        assert(patternMatcher("xxyxxy", "gogopowerrangergogopowerranger") == listOf("go", "powerranger"))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

val charX = "x"[0]
val charY = "y"[0]

// O(n^2 + m) time | O(n + m) space
fun patternMatcher(pattern: String, string: String): List<String> {
    if (pattern.length > string.length) return listOf()
    val newPattern = getNewPattern(pattern)
    val didSwitch = newPattern[0] != pattern[0]
    val counts = mutableMapOf(charX to 0, charY to 0)
    val firstYPos = getCountsAndFirstYPos(newPattern, counts)
    if (counts[charY] != 0) {
        for (lenOfX in 1 until string.length) {
            val lenOfY = (string.length - lenOfX * counts[charX]!!) / counts[charY]!!
            if (lenOfY <= 0 || lenOfY % 1 != 0) continue
            val yIdx = firstYPos!! * lenOfX
            val x = string.substring(0, lenOfX)
            val y = string.substring(yIdx, yIdx + lenOfY)
            val potentialMatch = newPattern.map() { if (it == charX) x else y }
            if (string == potentialMatch.joinToString("")) {
                return if (!didSwitch) listOf(x, y) else listOf(y, x)
            }
        }
    } else {
        val lenOfX = string.length / counts[charX]!!
        if (lenOfX % 1 == 0) {
            val x = string.substring(0, lenOfX)
            val potentialMatch = newPattern.map() { if (it == charX) x else "" }
            if (string == potentialMatch.joinToString("")) {
                return if (!didSwitch) listOf(x, "") else listOf("", x)
            }
        }
    }
    return listOf()
}

fun getNewPattern(pattern: String): CharArray {
    val patternLetters = pattern.toCharArray()
    if (pattern[0] == charX) {
        return patternLetters
    } else {
        return patternLetters.map() { if (it == charY) charX else charY }.joinToString("").toCharArray()
    }
}

fun getCountsAndFirstYPos(pattern: CharArray, counts: MutableMap<Char, Int>): Int? {
    var firstYPos: Int? = null
    for (i in 0 until pattern.size) {
        val char = pattern[i]
        counts[char] = counts.getOrDefault(char, 0) + 1
        if (char == charY && firstYPos == null) firstYPos = i
    }
    return firstYPos
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.patternMatcher as patternMatcher

class ProgramTest {
    @Test
    fun TestCase1() {
        assert(patternMatcher("xxyxxy", "gogopowerrangergogopowerranger") == listOf("go", "powerranger"))
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
      try assertEqual(["go", "powerranger"], program.patternMatcher("xxyxxy", "gogopowerrangergogopowerranger"))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n ^ 2 + m) time | O(n + m) space
  func patternMatcher(_ pattern: String, _ string: String) -> [String] {
    if pattern.count > string.count {
      return []
    }

    let oldPattern = pattern.map { String($0) }
    let newPattern = generateNewPattern(pattern)
    let didSwitch = oldPattern[0] != newPattern[0]

    var counts = ["x": 0, "y": 0]
    let firstYPosition = populateCountsAndGetFirstYPosition(&counts, newPattern)

    if counts["y"] != 0 {
      for lengthOfX in 1 ..< string.count {
        if let countsOfX = counts["x"], let countsOfY = counts["y"] {
          let lengthOfY = Double(string.count - (lengthOfX * countsOfX)) / Double(countsOfY)

          if lengthOfY <= 0 || lengthOfY.truncatingRemainder(dividingBy: 1) != 0 {
            continue
          }

          let indexOfY = lengthOfX * firstYPosition

          let startX = string.index(string.startIndex, offsetBy: 0)
          let endX = string.index(string.startIndex, offsetBy: lengthOfX)
          let x = String(string[startX ..< endX])

          let startY = string.index(string.startIndex, offsetBy: indexOfY)
          let endY = string.index(string.startIndex, offsetBy: indexOfY + Int(lengthOfY))
          let y = String(string[startY ..< endY])

          let potentialMatch = newPattern.map { $0 == "x" ? x : y }.joined(separator: "")

          if string == potentialMatch {
            if didSwitch {
              return [y, x]
            } else {
              return [x, y]
            }
          }
        }
      }
    } else {
      if let countsOfX = counts["x"] {
        let lengthOfX = string.count / countsOfX
        let startX = string.index(string.startIndex, offsetBy: 0)
        let endX = string.index(string.startIndex, offsetBy: lengthOfX)
        let x = String(string[startX ..< endX])

        let potentialMatch = newPattern.map { $0 == "x" ? x : "" }.joined(separator: "")

        if string == potentialMatch {
          if didSwitch {
            return ["", x]
          } else {
            return [x, ""]
          }
        }
      }
    }

    return []
  }

  func generateNewPattern(_ pattern: String) -> [String] {
    let patternCharacters = Array(pattern)

    if patternCharacters[0] == "x" {
      return patternCharacters.map { String($0) }
    } else {
      return patternCharacters.map { $0 == "x" ? "y" : "x" }
    }
  }

  func populateCountsAndGetFirstYPosition(_ counts: inout [String: Int], _ newPattern: [String]) -> Int {
    var firstYPosition = -1

    for (index, currentPatternCharacter) in newPattern.enumerated() {
      if var countPerCharacter = counts[currentPatternCharacter] {
        countPerCharacter += 1
        counts[currentPatternCharacter] = countPerCharacter
      }

      if currentPatternCharacter == "y", firstYPosition == -1 {
        firstYPosition = index
      }
    }

    return firstYPosition
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      try assertEqual(["go", "powerranger"], program.patternMatcher("xxyxxy", "gogopowerrangergogopowerranger"))
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
        self.assertEqual(program.patternMatcher("xxyxxy", "gogopowerrangergogopowerranger"), ["go", "powerranger"])

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2 + m) time | O(n + m) space
def patternMatcher(pattern, string):
    if len(pattern) > len(string):
        return []
    newPattern = getNewPattern(pattern)
    didSwitch = newPattern[0] != pattern[0]
    counts = {"x": 0, "y": 0}
    firstYPos = getCountsAndFirstYPos(newPattern, counts)
    if counts["y"] != 0:
        for lenOfX in range(1, len(string)):
            lenOfY = (len(string) - lenOfX * counts["x"]) / counts["y"]
            if lenOfY <= 0 or lenOfY % 1 != 0:
                continue
            lenOfY = int(lenOfY)
            yIdx = firstYPos * lenOfX
            x = string[:lenOfX]
            y = string[yIdx : yIdx + lenOfY]
            potentialMatch = map(lambda char: x if char == "x" else y, newPattern)
            if string == "".join(potentialMatch):
                return [x, y] if not didSwitch else [y, x]
    else:
        lenOfX = len(string) / counts["x"]
        if lenOfX % 1 == 0:
            lenOfX = int(lenOfX)
            x = string[:lenOfX]
            potentialMatch = map(lambda char: x, newPattern)
            if string == "".join(potentialMatch):
                return [x, ""] if not didSwitch else ["", x]
    return []


def getNewPattern(pattern):
    patternLetters = list(pattern)
    if pattern[0] == "x":
        return patternLetters
    else:
        return list(map(lambda char: "x" if char == "y" else "y", patternLetters))


def getCountsAndFirstYPos(pattern, counts):
    firstYPos = None
    for i, char in enumerate(pattern):
        counts[char] += 1
        if char == "y" and firstYPos is None:
            firstYPos = i
    return firstYPos

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.patternMatcher("xxyxxy", "gogopowerrangergogopowerranger"), ["go", "powerranger"])

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.patternMatcher('xxyxxy', 'gogopowerrangergogopowerranger')).to.deep.equal(['go', 'powerranger']);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

interface Counts {
  [key: string]: number;
}

// O(n^2 + m) time | O(n + m) space
export function patternMatcher(pattern: string, string: string) {
  if (pattern.length > string.length) return [];
  const newPattern = getNewPattern(pattern);
  const didSwitch = newPattern[0] !== pattern[0];
  const counts: Counts = {x: 0, y: 0};
  const firstYPos = getCountsAndFirstYPos(newPattern, counts);
  if (counts['y'] !== 0) {
    for (let lenOfX = 1; lenOfX < string.length; lenOfX++) {
      const lenOfY = (string.length - lenOfX * counts['x']) / counts['y'];
      if (lenOfY <= 0 || lenOfY % 1 !== 0) continue;
      const yIdx = firstYPos! * lenOfX;
      const x = string.slice(0, lenOfX);
      const y = string.slice(yIdx, yIdx + lenOfY);
      const potentialMatch = newPattern.map(char => (char === 'x' ? x : y));
      if (string === potentialMatch.join('')) {
        return !didSwitch ? [x, y] : [y, x];
      }
    }
  } else {
    const lenOfX = string.length / counts['x'];
    if (lenOfX % 1 === 0) {
      const x = string.slice(0, lenOfX);
      const potentialMatch = newPattern.map(char => (char === 'x' ? x : ''));
      if (string === potentialMatch.join('')) {
        return !didSwitch ? [x, ''] : ['', x];
      }
    }
  }
  return [];
}

function getNewPattern(pattern: string) {
  const patternLetters = pattern.split('');
  if (pattern[0] === 'x') {
    return patternLetters;
  } else {
    return patternLetters.map(char => (char === 'y' ? 'x' : 'y'));
  }
}

function getCountsAndFirstYPos(pattern: string[], counts: Counts) {
  let firstYPos: number | null = null;
  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    counts[char]++;
    if (char === 'y' && firstYPos === null) firstYPos = i;
  }
  return firstYPos;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.patternMatcher('xxyxxy', 'gogopowerrangergogopowerranger')).to.deep.equal(['go', 'powerranger']);
});

```

