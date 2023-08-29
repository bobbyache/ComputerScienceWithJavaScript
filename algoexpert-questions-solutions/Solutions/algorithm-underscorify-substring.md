# Underscorify Substring
<div class="html">
<p>
  Write a function that takes in two strings: a main string and a potential
  substring of the main string. The function should return a version of the main
  string with every instance of the substring in it wrapped between underscores.
</p>
<p>
  If two or more instances of the substring in the main string overlap each
  other or sit side by side, the underscores relevant to these substrings should
  only appear on the far left of the leftmost substring and on the far right of
  the rightmost substring. If the main string doesn't contain the other string
  at all, the function should return the main string intact.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">string</span> = "testthis is a testtest to see if testestest it works"
<span class="CodeEditor-promptParameter">substring</span> = "test"
</pre>
<h3>Sample Output</h3>
<pre>
"_test_this is a _testtest_ to see if _testestest_ it works"
</pre>
</div>

Hint 1
<p>
The first thing you need to do to solve this question is to get the locations of all instances of the substring in the main string. Try traversing the main string one character at a time and calling whatever substring-matching function is built into the language you're working in. Store a 2D array of locations, where each subarray holds the starting and ending indices of a specific instance of the substring in the main string.
</p>


Hint 2

<p>
The second thing you need to do is to "collapse" the 2D array mentioned in Hint #1. In essence, you need to merge the locations of substrings that overlap each other or sit next to each other. Traverse the 2D array mentioned in Hint #1 and build a new 2D array that holds these "collapsed" locations.
</p>


Hint 3

<p>
Finally, you need to create a new string with underscores added in the correct positions. Construct this new string by traversing the main string and the 2D array mentioned in Hint #2 at the same time. You might have to keep track of when you are "in between" underscores in order to correctly traverse the 2D array.
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
      assert(
          underscorifySubstring(
              "testthis is a testtest to see if testestest it works", "test") ==
          "_test_this is a _testtest_ to see if _testestest_ it works");
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <numeric>
using namespace std;

vector<vector<int>> getLocations(string str, string subStr);
vector<vector<int>> collapse(vector<vector<int>> locations);
string underscorify(string str, vector<vector<int>> locations);

// Average case: O(n + m) | O(n) space - where n is the length
// of the main string and m is the length of the substring
string underscorifySubstring(string str, string subStr) {
  vector<vector<int>> locations = collapse(getLocations(str, subStr));
  return underscorify(str, locations);
}

vector<vector<int>> getLocations(string str, string subStr) {
  vector<vector<int>> locations{};
  int startIdx = 0;
  while (startIdx < str.length()) {
    int nextIdx = str.find(subStr, startIdx);
    if (nextIdx != string::npos) {
      locations.push_back(vector<int>{nextIdx, int(nextIdx + subStr.length())});
      startIdx = nextIdx + 1;
    } else {
      break;
    }
  }
  return locations;
}

vector<vector<int>> collapse(vector<vector<int>> locations) {
  if (locations.empty()) {
    return locations;
  }
  vector<vector<int>> newLocations{locations[0]};
  vector<int> *previous = &newLocations[0];
  for (int i = 1; i < locations.size(); i++) {
    vector<int> *current = &locations[i];
    if (current->at(0) <= previous->at(1)) {
      previous->at(1) = current->at(1);
    } else {
      newLocations.push_back(*current);
      previous = &newLocations[newLocations.size() - 1];
    }
  }
  return newLocations;
}

string underscorify(string str, vector<vector<int>> locations) {
  int locationsIdx = 0;
  int stringIdx = 0;
  bool inBetweenUnderscores = false;
  vector<string> finalChars{};
  int i = 0;
  while (stringIdx < str.length() && locationsIdx < locations.size()) {
    if (stringIdx == locations[locationsIdx][i]) {
      finalChars.push_back("_");
      inBetweenUnderscores = !inBetweenUnderscores;
      if (!inBetweenUnderscores) {
        locationsIdx++;
      }
      i = i == 1 ? 0 : 1;
    }
    string s(1, str[stringIdx]);
    finalChars.push_back(s);
    stringIdx++;
  }
  if (locationsIdx < locations.size()) {
    finalChars.push_back("_");
  } else if (stringIdx < str.length()) {
    finalChars.push_back(str.substr(stringIdx));
  }
  return accumulate(finalChars.begin(), finalChars.end(), string());
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      assert(
          underscorifySubstring(
              "testthis is a testtest to see if testestest it works", "test") ==
          "_test_this is a _testtest_ to see if _testestest_ it works");
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
		string expected = "_test_this is a _testtest_ to see if _testestest_ it works";
		string output = Program.UnderscorifySubstring(
			"testthis is a testtest to see if testestest it works", "test");
		Utils.AssertTrue(expected.Equals(output));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;

public class Program {
	// Average case: O(n + m) | O(n) space - where n is the length
	// of the main string and m is the length of the substring
	public static string UnderscorifySubstring(string str, string substring) {
		List<int[]> locations = collapse(getLocations(str, substring));
		return underscorify(str, locations);
	}

	public static List<int[]> getLocations(string str, string substring) {
		List<int[]> locations = new List<int[]>();
		int startIdx = 0;
		while (startIdx < str.Length) {
			int nextIdx = str.IndexOf(substring, startIdx);
			if (nextIdx != -1) {
				locations.Add(new int[] {nextIdx, nextIdx + substring.Length});
				startIdx = nextIdx + 1;
			} else {
				break;
			}
		}
		return locations;
	}

	public static List<int[]> collapse(List<int[]> locations) {
		if (locations.Count == 0) {
			return locations;
		}
		List<int[]> newLocations = new List<int[]>();
		newLocations.Add(locations[0]);
		int[] previous = newLocations[0];
		for (int i = 1; i < locations.Count; i++) {
			int[] current = locations[i];
			if (current[0] <= previous[1]) {
				previous[1] = current[1];
			} else {
				newLocations.Add(current);
				previous = current;
			}
		}
		return newLocations;
	}

	public static string underscorify(string str, List<int[]> locations) {
		int locationsIdx = 0;
		int stringIdx = 0;
		bool inBetweenUnderscores = false;
		List<string> finalChars = new List<string>();
		int i = 0;
		while (stringIdx < str.Length && locationsIdx < locations.Count) {
			if (stringIdx == locations[locationsIdx][i]) {
				finalChars.Add("_");
				inBetweenUnderscores = !inBetweenUnderscores;
				if (!inBetweenUnderscores) {
					locationsIdx++;
				}
				i = i == 1 ? 0 : 1;
			}
			finalChars.Add(str[stringIdx].ToString());
			stringIdx += 1;
		}
		if (locationsIdx < locations.Count) {
			finalChars.Add("_");
		} else if (stringIdx < str.Length) {
			finalChars.Add(str.Substring(stringIdx));
		}
		return String.Join("", finalChars);
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		string expected = "_test_this is a _testtest_ to see if _testestest_ it works";
		string output = Program.UnderscorifySubstring(
			"testthis is a testtest to see if testestest it works", "test");
		Utils.AssertTrue(expected.Equals(output));
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
	expected := "_test_this is a _testtest_ to see if _testestest_ it works"
	output := UnderscorifySubstring("testthis is a testtest to see if testestest it works", "test")
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "strings"

type intervals []*interval
type interval struct {
	left  int
	right int
}

// Average case: O(n + m) | O(n) space - where n is the length
// of the main string and m is the length of the substring
func UnderscorifySubstring(str string, substring string) string {
	locations := getLocations(str, substring)
	locations = locations.collapse()
	return underscorify(str, locations)
}

func getLocations(str, substring string) intervals {
	result := intervals{}
	for start := 0; start < len(str); {
		nextIndex := strings.Index(str[start:], substring)
		if nextIndex == -1 {
			break
		}
		nextIndex += start
		result = append(result, &interval{nextIndex, nextIndex + len(substring)})
		start = nextIndex + 1
	}
	return result
}

func (array intervals) collapse() intervals {
	// If the array is empty, nothing to do
	if len(array) == 0 {
		return array
	}

	result := intervals{array[0]}
	previous := array[0]
	for i := 1; i < len(array); i++ {
		current := array[i]
		if current.left <= previous.right {
			// Collapse the two intervals
			previous.right = current.right
		} else {
			result = append(result, current)
			previous = current
		}
	}
	return result
}

func underscorify(str string, locations intervals) string {
	if len(locations) == 0 {
		return str
	}

	// We know the resulting string will have an additional 2*len(intervals)
	// characters
	result := make([]rune, len(str)+2*len(locations))
	resultIndex := 0
	locationIndex := 0
	for i, r := range str {
		location := locations[locationIndex]
		if i == location.left {
			result[resultIndex] = '_'
			resultIndex += 1
		} else if i == location.right {
			result[resultIndex] = '_'
			resultIndex += 1
			if locationIndex+1 < len(locations) {
				locationIndex += 1
			}
		}
		result[resultIndex] = r
		resultIndex += 1
	}

	if locations[locationIndex].right == len(str) {
		result[len(result)-1] = '_'
	}
	return string(result)
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := "_test_this is a _testtest_ to see if _testestest_ it works"
	output := UnderscorifySubstring("testthis is a testtest to see if testestest it works", "test")
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
    String expected = "_test_this is a _testtest_ to see if _testestest_ it works";
    String output =
        Program.underscorifySubstring(
            "testthis is a testtest to see if testestest it works", "test");
    Utils.assertTrue(expected.equals(output));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // Average case: O(n + m) | O(n) space - where n is the length
  // of the main string and m is the length of the substring
  public static String underscorifySubstring(String str, String substring) {
    List<Integer[]> locations = collapse(getLocations(str, substring));
    return underscorify(str, locations);
  }

  public static List<Integer[]> getLocations(String str, String substring) {
    List<Integer[]> locations = new ArrayList<Integer[]>();
    int startIdx = 0;
    while (startIdx < str.length()) {
      int nextIdx = str.indexOf(substring, startIdx);
      if (nextIdx != -1) {
        locations.add(new Integer[] {nextIdx, nextIdx + substring.length()});
        startIdx = nextIdx + 1;
      } else {
        break;
      }
    }
    return locations;
  }

  public static List<Integer[]> collapse(List<Integer[]> locations) {
    if (locations.size() == 0) {
      return locations;
    }
    List<Integer[]> newLocations = new ArrayList<Integer[]>();
    newLocations.add(locations.get(0));
    Integer[] previous = newLocations.get(0);
    for (int i = 1; i < locations.size(); i++) {
      Integer[] current = locations.get(i);
      if (current[0] <= previous[1]) {
        previous[1] = current[1];
      } else {
        newLocations.add(current);
        previous = current;
      }
    }
    return newLocations;
  }

  public static String underscorify(String str, List<Integer[]> locations) {
    int locationsIdx = 0;
    int stringIdx = 0;
    boolean inBetweenUnderscores = false;
    List<String> finalChars = new ArrayList<String>();
    int i = 0;
    while (stringIdx < str.length() && locationsIdx < locations.size()) {
      if (stringIdx == locations.get(locationsIdx)[i]) {
        finalChars.add("_");
        inBetweenUnderscores = !inBetweenUnderscores;
        if (!inBetweenUnderscores) {
          locationsIdx++;
        }
        i = i == 1 ? 0 : 1;
      }
      finalChars.add(String.valueOf(str.charAt(stringIdx)));
      stringIdx += 1;
    }
    if (locationsIdx < locations.size()) {
      finalChars.add("_");
    } else if (stringIdx < str.length()) {
      finalChars.add(str.substring(stringIdx));
    }
    return String.join("", finalChars);
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    String expected = "_test_this is a _testtest_ to see if _testestest_ it works";
    String output =
        Program.underscorifySubstring(
            "testthis is a testtest to see if testestest it works", "test");
    Utils.assertTrue(expected.equals(output));
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
  chai
    .expect(program.underscorifySubstring('testthis is a testtest to see if testestest it works', 'test'))
    .to.deep.equal('_test_this is a _testtest_ to see if _testestest_ it works');
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average case: O(n + m) | O(n) space - where n is the length
// of the main string and m is the length of the substring
function underscorifySubstring(string, substring) {
  const locations = collapse(getLocations(string, substring));
  return underscorify(string, locations);
}

function getLocations(string, substring) {
  const locations = [];
  let startIdx = 0;
  while (startIdx < string.length) {
    const nextIdx = string.indexOf(substring, startIdx);
    if (nextIdx !== -1) {
      locations.push([nextIdx, nextIdx + substring.length]);
      startIdx = nextIdx + 1;
    } else {
      break;
    }
  }
  return locations;
}

function collapse(locations) {
  if (!locations.length) return locations;
  const newLocations = [locations[0]];
  let previous = newLocations[0];
  for (let i = 1; i < locations.length; i++) {
    const current = locations[i];
    if (current[0] <= previous[1]) {
      previous[1] = current[1];
    } else {
      newLocations.push(current);
      previous = current;
    }
  }
  return newLocations;
}

function underscorify(string, locations) {
  let locationsIdx = 0;
  let stringIdx = 0;
  let inBetweenUnderscores = false;
  const finalChars = [];
  let i = 0;
  while (stringIdx < string.length && locationsIdx < locations.length) {
    if (stringIdx === locations[locationsIdx][i]) {
      finalChars.push('_');
      inBetweenUnderscores = !inBetweenUnderscores;
      if (!inBetweenUnderscores) locationsIdx++;
      i = i === 1 ? 0 : 1;
    }
    finalChars.push(string[stringIdx]);
    stringIdx++;
  }
  if (locationsIdx < locations.length) {
    finalChars.push('_');
  } else if (stringIdx < string.length) {
    finalChars.push(string.slice(stringIdx));
  }
  return finalChars.join('');
}

exports.underscorifySubstring = underscorifySubstring;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai
    .expect(program.underscorifySubstring('testthis is a testtest to see if testestest it works', 'test'))
    .to.deep.equal('_test_this is a _testtest_ to see if _testestest_ it works');
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.underscorifySubstring as underscorifySubstring

class ProgramTest {
    @Test
    fun TestCase1() {
        assert(underscorifySubstring("testthis is a testtest to see if testestest it works", "test") == "_test_this is a _testtest_ to see if _testestest_ it works")
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// Average case: O(n + m) | O(n) space - where n is the length
// of the main string and m is the length of the substring
fun underscorifySubstring(string: String, substring: String): String {
    val locations = collapse(getLocations(string, substring))
    return underscorify(string, locations)
}

fun getLocations(string: String, substring: String): MutableList<MutableList<Int>> {
    val locations = mutableListOf<MutableList<Int>>()
    var startIdx = 0
    while (startIdx < string.length) {
        val nextIdx = string.indexOf(substring, startIdx)
        if (nextIdx != -1) {
            locations.add(mutableListOf(nextIdx, nextIdx + substring.length))
            startIdx = nextIdx + 1
        } else {
            break
        }
    }
    return locations
}

fun collapse(locations: MutableList<MutableList<Int>>): MutableList<MutableList<Int>> {
    if (locations.size == 0) return locations
    val newLocations = mutableListOf(locations[0])
    var previous = newLocations[0]
    for (i in 1 until locations.size) {
        val current = locations[i]
        if (current[0] <= previous[1]) {
            previous[1] = current[1]
        } else {
            newLocations.add(current)
            previous = current
        }
    }
    return newLocations
}

fun underscorify(string: String, locations: MutableList<MutableList<Int>>): String {
    var locationsIdx = 0
    var stringIdx = 0
    var inBetweenUnderscores = false
    val finalChars = mutableListOf<String>()
    var i = 0
    while (stringIdx < string.length && locationsIdx < locations.size) {
        if (stringIdx == locations[locationsIdx][i]) {
            finalChars.add("_")
            inBetweenUnderscores = !inBetweenUnderscores
            if (!inBetweenUnderscores) locationsIdx++
            i = if (i == 1) 0 else 1
        }
        finalChars.add(string[stringIdx].toString())
        stringIdx++
    }
    if (locationsIdx < locations.size) {
        finalChars.add("_")
    } else if (stringIdx < string.length) {
        finalChars.add(string.substring(stringIdx))
    }
    return finalChars.joinToString("")
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.underscorifySubstring as underscorifySubstring

class ProgramTest {
    @Test
    fun TestCase1() {
        assert(underscorifySubstring("testthis is a testtest to see if testestest it works", "test") == "_test_this is a _testtest_ to see if _testestest_ it works")
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
      try assertEqual("_test_this is a _testtest_ to see if _testestest_ it works", program.underscorifySubstring("testthis is a testtest to see if testestest it works", "test"))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // Average case: O(n + m) | O(n) space - where n is the length
  // of the main string and m is the length of the substring
  func underscorifySubstring(_ string: String, _ substring: String) -> String {
    let locations = getLocations(string, substring)
    let collapsedLocations = collapse(locations)

    return underscorify(string, collapsedLocations)
  }

  func getLocations(_ string: String, _ substring: String) -> [[String.Index]] {
    var locations = [[String.Index]]()

    var start = 0
    var startIndex = string.index(string.startIndex, offsetBy: start)

    while start < string.count {
      if let rangeOfSubstring = string.range(of: substring, options: [], range: startIndex ..< string.endIndex, locale: nil) {
        locations.append([rangeOfSubstring.lowerBound, rangeOfSubstring.upperBound])

        let startPos = string.distance(from: string.startIndex, to: rangeOfSubstring.lowerBound)
        start = startPos + 1
        startIndex = string.index(string.startIndex, offsetBy: start)
      } else {
        break
      }
    }

    return locations
  }

  func collapse(_ locations: [[String.Index]]) -> [[String.Index]] {
    if locations.count == 0 {
      return locations
    }

    var newLocations = [locations[0]]
    var previousLocationIndex = 0
    for i in 1 ..< locations.count {
      let currentLocation = locations[i]

      if currentLocation[0] <= newLocations[previousLocationIndex][1] {
        newLocations[previousLocationIndex][1] = currentLocation[1]
      } else {
        newLocations.append(currentLocation)
        previousLocationIndex += 1
      }
    }

    return newLocations
  }

  func underscorify(_ string: String, _ locations: [[String.Index]]) -> String {
    var subIndex = 0
    var stringIndex = 0
    var locationIndex = 0
    var isInBetweenUnderscres = false
    var currentIndex = string.index(string.startIndex, offsetBy: stringIndex)

    var finalCharacters = [Character]()

    while stringIndex < string.count, locationIndex < locations.count {
      currentIndex = string.index(string.startIndex, offsetBy: stringIndex)

      if currentIndex == locations[locationIndex][subIndex] {
        finalCharacters.append("_")

        isInBetweenUnderscres = !isInBetweenUnderscres

        if !isInBetweenUnderscres {
          locationIndex += 1
        }

        if subIndex == 0 {
          subIndex = 1
        } else {
          subIndex = 0
        }
      }

      finalCharacters.append(string[currentIndex])
      stringIndex += 1
    }

    if locationIndex < locations.count {
      finalCharacters.append("_")
    } else if stringIndex < string.count {
      currentIndex = string.index(string.startIndex, offsetBy: stringIndex)
      let restOfCharacters = Array(string[currentIndex ..< string.endIndex])
      finalCharacters.append(contentsOf: restOfCharacters)
    }

    let result = finalCharacters.compactMap { String($0) }.joined()
    return result
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      try assertEqual("_test_this is a _testtest_ to see if _testestest_ it works", program.underscorifySubstring("testthis is a testtest to see if testestest it works", "test"))
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
        self.assertEqual(
            program.underscorifySubstring("testthis is a testtest to see if testestest it works", "test"),
            "_test_this is a _testtest_ to see if _testestest_ it works",
        )

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Average case: O(n + m) | O(n) space - where n is the length
# of the main string and m is the length of the substring
def underscorifySubstring(string, substring):
    locations = collapse(getLocations(string, substring))
    return underscorify(string, locations)


def getLocations(string, substring):
    locations = []
    startIdx = 0
    while startIdx < len(string):
        nextIdx = string.find(substring, startIdx)
        if nextIdx != -1:
            locations.append([nextIdx, nextIdx + len(substring)])
            startIdx = nextIdx + 1
        else:
            break
    return locations


def collapse(locations):
    if not len(locations):
        return locations
    newLocations = [locations[0]]
    previous = newLocations[0]
    for i in range(1, len(locations)):
        current = locations[i]
        if current[0] <= previous[1]:
            previous[1] = current[1]
        else:
            newLocations.append(current)
            previous = current
    return newLocations


def underscorify(string, locations):
    locationsIdx = 0
    stringIdx = 0
    inBetweenUnderscores = False
    finalChars = []
    i = 0
    while stringIdx < len(string) and locationsIdx < len(locations):
        if stringIdx == locations[locationsIdx][i]:
            finalChars.append("_")
            inBetweenUnderscores = not inBetweenUnderscores
            if not inBetweenUnderscores:
                locationsIdx += 1
            i = 0 if i == 1 else 1
        finalChars.append(string[stringIdx])
        stringIdx += 1
    if locationsIdx < len(locations):
        finalChars.append("_")
    elif stringIdx < len(string):
        finalChars.append(string[stringIdx:])
    return "".join(finalChars)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(
            program.underscorifySubstring("testthis is a testtest to see if testestest it works", "test"),
            "_test_this is a _testtest_ to see if _testestest_ it works",
        )

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai
    .expect(program.underscorifySubstring('testthis is a testtest to see if testestest it works', 'test'))
    .to.deep.equal('_test_this is a _testtest_ to see if _testestest_ it works');
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average case: O(n + m) | O(n) space - where n is the length
// of the main string and m is the length of the substring
export function underscorifySubstring(string: string, substring: string) {
  const locations = collapse(getLocations(string, substring));
  return underscorify(string, locations);
}

function getLocations(string: string, substring: string) {
  const locations: number[][] = [];
  let startIdx = 0;
  while (startIdx < string.length) {
    const nextIdx = string.indexOf(substring, startIdx);
    if (nextIdx !== -1) {
      locations.push([nextIdx, nextIdx + substring.length]);
      startIdx = nextIdx + 1;
    } else {
      break;
    }
  }
  return locations;
}

function collapse(locations: number[][]) {
  if (!locations.length) return locations;
  const newLocations = [locations[0]];
  let previous = newLocations[0];
  for (let i = 1; i < locations.length; i++) {
    const current = locations[i];
    if (current[0] <= previous[1]) {
      previous[1] = current[1];
    } else {
      newLocations.push(current);
      previous = current;
    }
  }
  return newLocations;
}

function underscorify(string: string, locations: number[][]) {
  let locationsIdx = 0;
  let stringIdx = 0;
  let inBetweenUnderscores = false;
  const finalChars = [];
  let i = 0;
  while (stringIdx < string.length && locationsIdx < locations.length) {
    if (stringIdx === locations[locationsIdx][i]) {
      finalChars.push('_');
      inBetweenUnderscores = !inBetweenUnderscores;
      if (!inBetweenUnderscores) locationsIdx++;
      i = i === 1 ? 0 : 1;
    }
    finalChars.push(string[stringIdx]);
    stringIdx++;
  }
  if (locationsIdx < locations.length) {
    finalChars.push('_');
  } else if (stringIdx < string.length) {
    finalChars.push(string.slice(stringIdx));
  }
  return finalChars.join('');
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai
    .expect(program.underscorifySubstring('testthis is a testtest to see if testestest it works', 'test'))
    .to.deep.equal('_test_this is a _testtest_ to see if _testestest_ it works');
});

```

