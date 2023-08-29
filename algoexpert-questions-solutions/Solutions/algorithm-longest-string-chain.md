# Longest String Chain
<div class="html">
<p>
  Given a list of strings, write a function that returns the longest string
  chain that can be built from those strings.
</p>
<p>
  A string chain is defined as follows: let string <span>A</span> be a string in
  the initial array; if removing any single character from string
  <span>A</span> yields a new string <span>B</span> that's contained in the
  initial array of strings, then strings <span>A</span> and <span>B</span> form
  a string chain of length 2. Similarly, if removing any single character from
  string <span>B</span> yields a new string <span>C</span> that's contained in
  the initial array of strings, then strings <span>A</span>, <span>B</span>, and
  <span>C</span> form a string chain of length 3.
</p>
<p>
  The function should return the string chain in descending order (i.e., from
  the longest string to the shortest one). Note that string chains of length 1
  don't exist; if the list of strings doesn't contain any string chain formed by
  two or more strings, the function should return an empty array.
</p>
<p>
  You can assume that there will only be one longest string chain.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">strings</span> = ["abde", "abc", "abd", "abcde", "ade", "ae", "1abde", "abcdef"]
</pre>
<h3>Sample Output</h3>
<pre>
["abcdef", "abcde", "abde", "ade", "ae"]
</pre>
</div>

Hint 1
<p>
For each string, you will have to remove every letter one at a time to see if the resulting strings are contained in the input list of strings. What data structure lends itself to quickly checking if these strings are located in the list of input strings?
</p>


Hint 2

<p>
Realize that every string in the input list of strings potentially has a string chain (and therefore a longest string chain) that starts with itself. Compute all of these string chains and store them so that you don't have to compute them more than once.
</p>


Hint 3

<p>
Sort the input list of strings (from shortest to longest string) in order to simplify the problem. Iterate through the list of sorted strings, and for each string, compute the longest string chain that starts with itself. To do so, try removing every letter from each string and seeing if the resulting strings are in the input list of strings; you can do so in constant time by dumping every string in a hash table. In the hash table, store the longest string chain of every string as you compute them. As you iterate through longer strings, whenever you find a shorter string for which you've already computed the longest string chain, you can very quickly append the longer string to that already-computed string chain. Do this for every string, and you'll eventually find the longest string chain that you're looking for.
</p>


Hint 4

<p>
Do you need to store every string's longest string chain mentioned in Hint #3, or can you store less information per string so as to take up less auxiliary space?
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
      vector<string> strings = {"abde", "abc", "abd",   "abcde",
                                "ade",  "ae",  "1abde", "abcdef"};
      vector<string> expected = {"abcdef", "abcde", "abde", "ade", "ae"};
      assert(longestStringChain(strings) == expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <algorithm>
#include <unordered_map>

using namespace std;

struct stringChain {
  string nextString;
  int maxChainLength;
};

void findLongestStringChain(string str,
                            unordered_map<string, stringChain> &stringChains);
string getSmallerString(string str, int index);
void tryUpdateLongestStringChain(
    string currentString, string smallerString,
    unordered_map<string, stringChain> &stringChains);
vector<string>
buildLongestStringChain(vector<string> strings,
                        unordered_map<string, stringChain> stringChains);

// O(n * m^2 + nlog(n)) time | O(nm) space - where n is the number of strings
// and m is the length of the longest string
vector<string> longestStringChain(vector<string> strings) {
  // For every string, imagine the longest string chain that starts with it.
  // Set up every string to point to the next string in its respective longest
  // string chain. Also keep track of the lengths of these longest string
  // chains.
  unordered_map<string, stringChain> stringChains = {};
  for (auto string : strings) {
    stringChains[string] = {"", 1};
  }

  // Sort the strings based on their length so that whenever we visit a
  // string (as we iterate through them from left to right), we can
  // already have computed the longest string chains of any smaller strings.
  vector<string> sortedStrings = strings;
  sort(sortedStrings.begin(), sortedStrings.end(),
       [](string a, string b) -> bool { return a.size() < b.size(); });

  for (auto string : sortedStrings) {
    findLongestStringChain(string, stringChains);
  }

  return buildLongestStringChain(strings, stringChains);
}

void findLongestStringChain(string str,
                            unordered_map<string, stringChain> &stringChains) {
  // Try removing every letter of the current string to see if the
  // remaining strings form a string chain.
  for (int i = 0; i < str.size(); i++) {
    string smallerString = getSmallerString(str, i);
    if (stringChains.find(smallerString) == stringChains.end())
      continue;
    tryUpdateLongestStringChain(str, smallerString, stringChains);
  }
}

string getSmallerString(string str, int index) {
  return str.substr(0, index) + str.substr(index + 1);
}

void tryUpdateLongestStringChain(
    string currentString, string smallerString,
    unordered_map<string, stringChain> &stringChains) {
  int smallerStringChainLength = stringChains[smallerString].maxChainLength;
  int currentStringChainLength = stringChains[currentString].maxChainLength;
  // Update the string chain of the current string only if the smaller string
  // leads to a longer string chain.
  if (smallerStringChainLength + 1 > currentStringChainLength) {
    stringChains[currentString].maxChainLength = smallerStringChainLength + 1;
    stringChains[currentString].nextString = smallerString;
  }
}

vector<string>
buildLongestStringChain(vector<string> strings,
                        unordered_map<string, stringChain> stringChains) {
  // Find the string that starts the longest string chain.
  int maxChainLength = 0;
  string chainStartingString = "";
  for (auto string : strings) {
    if (stringChains[string].maxChainLength > maxChainLength) {
      maxChainLength = stringChains[string].maxChainLength;
      chainStartingString = string;
    }
  }

  // Starting at the string found above, build the longest string chain.
  vector<string> ourLongestStringChain;
  string currentString = chainStartingString;
  while (currentString != "") {
    ourLongestStringChain.push_back(currentString);
    currentString = stringChains[currentString].nextString;
  }

  return ourLongestStringChain.size() == 1 ? vector<string>{}
                                           : ourLongestStringChain;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<string> strings = {"abde", "abc", "abd",   "abcde",
                                "ade",  "ae",  "1abde", "abcdef"};
      vector<string> expected = {"abcdef", "abcde", "abde", "ade", "ae"};
      assert(longestStringChain(strings) == expected);
    });
  }
};

```
### Sandbox Code (csharp)
```csharp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

using System.Linq;
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		List<string> strings = new List<string>(new [] {"abde", "abc", "abd",     "abcde",
		                                                "ade",    "ae",    "1abde",
		                                                "abcdef"});
		List<string> expected = new List<string>(){
			"abcdef", "abcde", "abde", "ade", "ae"
		};
		Utils.AssertTrue(Program.LongestStringChain(strings).SequenceEqual(expected));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {

	public class stringChain {
		public string nextstring;
		public int maxChainLength;

		public stringChain(string nextstring, int maxChainLength) {
			this.nextstring = nextstring;
			this.maxChainLength = maxChainLength;
		}
	}

	// O(n * m^2 + nlog(n)) time | O(nm) space - where n is the number of strings
	// and m is the length of the longest string
	public static List<string> LongestStringChain(List<string> strings) {
		// For every string, imagine the longest string chain that starts with it.
		// Set up every string to point to the next string in its respective longest
		// string chain. Also keep track of the lengths of these longest string
		// chains.
		Dictionary<string,
		  stringChain> stringChains = new Dictionary<string, stringChain>();
		foreach (string str in strings) {
			stringChains[str] = new stringChain("", 1);
		}

		// Sort the strings based on their length so that whenever we visit a
		// string (as we iterate through them from left to right), we can
		// already have computed the longest string chains of any smaller strings.
		List<string> sortedstrings = new List<string>(strings);
		sortedstrings.Sort((a, b) => a.Length - b.Length);

		foreach (string str in sortedstrings) {
			findLongeststringChain(str, stringChains);
		}

		return buildLongeststringChain(strings, stringChains);
	}

	public static void findLongeststringChain(string str, Dictionary<string,
	  stringChain> stringChains) {
		// Try removing every letter of the current string to see if the
		// remaining strings form a string chain.
		for (int i = 0; i < str.Length; i++) {
			string smallerstring = getSmallerstring(str, i);
			if (!stringChains.ContainsKey(smallerstring)) continue;
			tryUpdateLongeststringChain(str, smallerstring, stringChains);
		}
	}

	public static string getSmallerstring(string str, int index) {
		return str.Substring(0, index) + str.Substring(index + 1);
	}

	public static void tryUpdateLongeststringChain(
		string currentstring,
		string smallerstring,
		Dictionary<string, stringChain> stringChains
		) {
		int smallerstringChainLength = stringChains[smallerstring].maxChainLength;
		int currentstringChainLength = stringChains[currentstring].maxChainLength;
		// Update the string chain of the current string only if the smaller string
		// leads to a longer string chain.
		if (smallerstringChainLength + 1 > currentstringChainLength) {
			stringChains[currentstring].maxChainLength = smallerstringChainLength + 1;
			stringChains[currentstring].nextstring = smallerstring;
		}
	}

	public static List<string> buildLongeststringChain(List<string> strings, Dictionary<string,
	  stringChain> stringChains) {
		// Find the string that starts the longest string chain.
		int maxChainLength = 0;
		string chainStartingstring = "";
		foreach (string str in strings) {
			if (stringChains[str].maxChainLength > maxChainLength) {
				maxChainLength = stringChains[str].maxChainLength;
				chainStartingstring = str;
			}
		}

		// Starting at the string found above, build the longest string chain.
		List<string> ourLongeststringChain = new List<string>();
		string currentstring = chainStartingstring;
		while (currentstring != "") {
			ourLongeststringChain.Add(currentstring);
			currentstring = stringChains[currentstring].nextstring;
		}

		return ourLongeststringChain.Count ==
		       1 ? new List<string>() : ourLongeststringChain;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Linq;
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		List<string> strings = new List<string>(new [] {"abde", "abc", "abd",     "abcde",
		                                                "ade",    "ae",    "1abde",
		                                                "abcdef"});
		List<string> expected = new List<string>(){
			"abcdef", "abcde", "abde", "ade", "ae"
		};
		Utils.AssertTrue(Program.LongestStringChain(strings).SequenceEqual(expected));
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
	input := []string{"abde", "abc", "abd", "abcde", "ade", "ae", "1abde", "abcdef"}
	expected := []string{"abcdef", "abcde", "abde", "ade", "ae"}
	output := LongestStringChain(input)
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"sort"
)

type Chain struct {
	NextString     string
	MaxChainLength int
}

// O(n * m^2 + nlog(n)) time | O(nm) space - where n is the number of strings and
// m is the length of the longest string
func LongestStringChain(strings []string) []string {
	// For every string, imagine the longest string chain that starts with it.
	// Set up every string to point to the next string in its respective longest
	// string chain. Also keep track of the lengths of these longest string chains.
	stringChains := map[string]*Chain{}
	for _, str := range strings {
		stringChains[str] = &Chain{NextString: "", MaxChainLength: 1}
	}

	// Sort the strings based on their length so that whenever we visit a
	// string (as we iterate through them from left to right), we can
	// already have computed the longest string chains of any smaller strings.
	sort.Slice(strings, func(i, j int) bool {
		return len(strings[i]) < len(strings[j])
	})
	sortedStrings := strings

	for _, str := range sortedStrings {
		findLongestStringChain(str, stringChains)
	}
	return buildLongestStringChain(strings, stringChains)
}

func findLongestStringChain(str string, stringChains map[string]*Chain) {
	// Try removing every letter of the current string to see if the
	// remaining strings form a string chain.
	for i := range str {
		smallerString := getSmallerString(str, i)
		if _, found := stringChains[smallerString]; !found {
			continue
		}
		tryUpdateLongestStringChain(str, smallerString, stringChains)
	}
}

func getSmallerString(str string, index int) string {
	return str[:index] + str[index+1:]
}

func tryUpdateLongestStringChain(currentString, smallerString string, stringChains map[string]*Chain) {
	smallerStringChainLength := stringChains[smallerString].MaxChainLength
	currentStringChainLength := stringChains[currentString].MaxChainLength
	// Update the string chain of the current string only if the smaller string leads
	// to a longer string chain.
	if smallerStringChainLength+1 > currentStringChainLength {
		stringChains[currentString].MaxChainLength = smallerStringChainLength + 1
		stringChains[currentString].NextString = smallerString
	}
}

func buildLongestStringChain(strings []string, stringChains map[string]*Chain) []string {
	// Find the string that starts the longest string chain.
	maxChainLength := 0
	chainStartingString := ""
	for _, str := range strings {
		if stringChains[str].MaxChainLength > maxChainLength {
			maxChainLength = stringChains[str].MaxChainLength
			chainStartingString = str
		}
	}

	// Starting at the string found above, build the longest string chain.
	ourLongestStringChain := []string{}
	currentString := chainStartingString
	for currentString != "" {
		ourLongestStringChain = append(ourLongestStringChain, currentString)
		currentString = stringChains[currentString].NextString
	}
	if len(ourLongestStringChain) == 1 {
		return []string{}
	}
	return ourLongestStringChain
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []string{"abde", "abc", "abd", "abcde", "ade", "ae", "1abde", "abcdef"}
	expected := []string{"abcdef", "abcde", "abde", "ade", "ae"}
	output := LongestStringChain(input)
	require.Equal(t, expected, output)
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
    List<String> strings =
        new ArrayList<String>(
            Arrays.asList("abde", "abc", "abd", "abcde", "ade", "ae", "1abde", "abcdef"));
    List<String> expected =
        new ArrayList<String>(Arrays.asList("abcdef", "abcde", "abde", "ade", "ae"));
    Utils.assertTrue(Program.longestStringChain(strings).equals(expected));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  public static class stringChain {
    String nextString;
    Integer maxChainLength;

    public stringChain(String nextString, Integer maxChainLength) {
      this.nextString = nextString;
      this.maxChainLength = maxChainLength;
    }
  }

  // O(n * m^2 + nlog(n)) time | O(nm) space - where n is the number of strings
  // and m is the length of the longest string
  public static List<String> longestStringChain(List<String> strings) {
    // For every string, imagine the longest string chain that starts with it.
    // Set up every string to point to the next string in its respective longest
    // string chain. Also keep track of the lengths of these longest string
    // chains.
    Map<String, stringChain> stringChains = new HashMap<String, stringChain>();
    for (String string : strings) {
      stringChains.put(string, new stringChain("", 1));
    }

    // Sort the strings based on their length so that whenever we visit a
    // string (as we iterate through them from left to right), we can
    // already have computed the longest string chains of any smaller strings.
    List<String> sortedStrings = new ArrayList<String>(strings);
    sortedStrings.sort((a, b) -> a.length() - b.length());

    for (String string : sortedStrings) {
      findLongestStringChain(string, stringChains);
    }

    return buildLongestStringChain(strings, stringChains);
  }

  public static void findLongestStringChain(String string, Map<String, stringChain> stringChains) {
    // Try removing every letter of the current string to see if the
    // remaining strings form a string chain.
    for (int i = 0; i < string.length(); i++) {
      String smallerString = getSmallerString(string, i);
      if (!stringChains.containsKey(smallerString)) continue;
      tryUpdateLongestStringChain(string, smallerString, stringChains);
    }
  }

  public static String getSmallerString(String string, int index) {
    return string.substring(0, index) + string.substring(index + 1);
  }

  public static void tryUpdateLongestStringChain(
      String currentString, String smallerString, Map<String, stringChain> stringChains) {
    int smallerStringChainLength = stringChains.get(smallerString).maxChainLength;
    int currentStringChainLength = stringChains.get(currentString).maxChainLength;
    // Update the string chain of the current string only if the smaller string
    // leads to a longer string chain.
    if (smallerStringChainLength + 1 > currentStringChainLength) {
      stringChains.get(currentString).maxChainLength = smallerStringChainLength + 1;
      stringChains.get(currentString).nextString = smallerString;
    }
  }

  public static List<String> buildLongestStringChain(
      List<String> strings, Map<String, stringChain> stringChains) {
    // Find the string that starts the longest string chain.
    int maxChainLength = 0;
    String chainStartingString = "";
    for (String string : strings) {
      if (stringChains.get(string).maxChainLength > maxChainLength) {
        maxChainLength = stringChains.get(string).maxChainLength;
        chainStartingString = string;
      }
    }

    // Starting at the string found above, build the longest string chain.
    List<String> ourLongestStringChain = new ArrayList<String>();
    String currentString = chainStartingString;
    while (currentString != "") {
      ourLongestStringChain.add(currentString);
      currentString = stringChains.get(currentString).nextString;
    }

    return ourLongestStringChain.size() == 1 ? new ArrayList<String>() : ourLongestStringChain;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    List<String> strings =
        new ArrayList<String>(
            Arrays.asList("abde", "abc", "abd", "abcde", "ade", "ae", "1abde", "abcdef"));
    List<String> expected =
        new ArrayList<String>(Arrays.asList("abcdef", "abcde", "abde", "ade", "ae"));
    Utils.assertTrue(Program.longestStringChain(strings).equals(expected));
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
  const strings = ['abde', 'abc', 'abd', 'abcde', 'ade', 'ae', '1abde', 'abcdef'];
  const expected = ['abcdef', 'abcde', 'abde', 'ade', 'ae'];
  chai.expect(program.longestStringChain(strings)).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n * m^2 + nlog(n)) time | O(nm) space - where n is the number of strings and
// m is the length of the longest string
function longestStringChain(strings) {
  // For every string, imagine the longest string chain that starts with it.
  // Set up every string to point to the next string in its respective longest
  // string chain. Also keep track of the lengths of these longest string chains.
  const stringChains = {};
  for (const string of strings) {
    stringChains[string] = {nextString: '', maxChainLength: 1};
  }

  // Sort the strings based on their length so that whenever we visit a
  // string (as we iterate through them from left to right), we can
  // already have computed the longest string chains of any smaller strings.
  const sortedStrings = strings.sort((a, b) => a.length - b.length);
  for (const string of sortedStrings) {
    findLongestStringChain(string, stringChains);
  }

  return buildLongestStringChain(strings, stringChains);
}

function findLongestStringChain(string, stringChains) {
  // Try removing every letter of the current string to see if the
  // remaining strings form a string chain.
  for (let i = 0; i < string.length; i++) {
    const smallerString = getSmallerString(string, i);
    if (!(smallerString in stringChains)) continue;
    tryUpdateLongestStringChain(string, smallerString, stringChains);
  }
}

function getSmallerString(string, index) {
  return string.slice(0, index) + string.slice(index + 1);
}

function tryUpdateLongestStringChain(currentString, smallerString, stringChains) {
  const smallerStringChainLength = stringChains[smallerString].maxChainLength;
  const currentStringChainLength = stringChains[currentString].maxChainLength;
  // Update the string chain of the current string only if the smaller string leads
  // to a longer string chain.
  if (smallerStringChainLength + 1 > currentStringChainLength) {
    stringChains[currentString].maxChainLength = smallerStringChainLength + 1;
    stringChains[currentString].nextString = smallerString;
  }
}

function buildLongestStringChain(strings, stringChains) {
  // Find the string that starts the longest string chain.
  let maxChainLength = 0;
  let chainStartingString = '';
  for (const string of strings) {
    if (stringChains[string].maxChainLength > maxChainLength) {
      maxChainLength = stringChains[string].maxChainLength;
      chainStartingString = string;
    }
  }

  // Starting at the string found above, build the longest string chain.
  const ourLongestStringChain = [];
  let currentString = chainStartingString;
  while (currentString !== '') {
    ourLongestStringChain.push(currentString);
    currentString = stringChains[currentString].nextString;
  }

  return ourLongestStringChain.length === 1 ? [] : ourLongestStringChain;
}

exports.longestStringChain = longestStringChain;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const strings = ['abde', 'abc', 'abd', 'abcde', 'ade', 'ae', '1abde', 'abcdef'];
  const expected = ['abcdef', 'abcde', 'abde', 'ade', 'ae'];
  chai.expect(program.longestStringChain(strings)).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.longestStringChain

class ProgramTest {
    @Test
    fun TestCase1() {
        val strings = listOf("abde", "abc", "abd", "abcde", "ade", "ae", "1abde", "abcdef")
        val expected = listOf("abcdef", "abcde", "abde", "ade", "ae")
        assert(longestStringChain(strings).equals(expected))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

data class StringChain(var nextString: String, var maxChainLength: Int)

// O(n * m^2 + nlog(n)) time | O(nm) space - where n is the number of strings
// and m is the length of the longest string
fun longestStringChain(strings: List<String>): List<String> {
    // For every string, imagine the longest string chain that starts with it.
    // Set up every string to point to the next string in its respective longest
    // string chain. Also keep track of the lengths of these longest string
    // chains.
    val stringChains = mutableMapOf<String, StringChain>()
    for (string in strings) {
        stringChains[string] = StringChain("", 1)
    }

    // Sort the strings based on their length so that whenever we visit a
    // string (as we iterate through them from left to right), we can
    // already have computed the longest string chains of any smaller strings.
    val sortedStrings = strings.toMutableList().sortedWith(Comparator<String> { a, b -> a.length - b.length })

    for (string in sortedStrings) {
        findLongestStringChain(string, stringChains)
    }

    return buildLongestStringChain(strings, stringChains)
}

fun findLongestStringChain(string: String, stringChains: Map<String, StringChain>) {
    // Try removing every letter of the current string to see if the
    // remaining strings form a string chain.
    for (i in 0 until string.length) {
        val smallerString = getSmallerString(string, i)
        if (!stringChains.containsKey(smallerString)) continue
        tryUpdateLongestStringChain(string, smallerString, stringChains)
    }
}

fun getSmallerString(string: String, index: Int): String {
    return string.substring(0, index) + string.substring(index + 1)
}

fun tryUpdateLongestStringChain(currentString: String, smallerString: String, stringChains: Map<String, StringChain>) {
    val smallerStringChainLength = stringChains[smallerString]!!.maxChainLength
    val currentStringChainLength = stringChains[currentString]!!.maxChainLength
    // Update the string chain of the current string only if the smaller string
    // leads to a longer string chain.
    if (smallerStringChainLength + 1 > currentStringChainLength) {
        stringChains[currentString]!!.maxChainLength = smallerStringChainLength + 1
        stringChains[currentString]!!.nextString = smallerString
    }
}

fun buildLongestStringChain(strings: List<String>, stringChains: Map<String, StringChain>): List<String> {
    // Find the string that starts the longest string chain.
    var maxChainLength = 0
    var chainStartingString = ""
    for (string in strings) {
        if (stringChains[string]!!.maxChainLength > maxChainLength) {
            maxChainLength = stringChains[string]!!.maxChainLength
            chainStartingString = string
        }
    }

    // Starting at the string found above, build the longest string chain.
    val ourLongestStringChain = mutableListOf<String>()
    var currentString = chainStartingString
    while (currentString != "") {
        ourLongestStringChain.add(currentString)
        currentString = stringChains[currentString]!!.nextString
    }

    return if (ourLongestStringChain.size == 1) listOf() else ourLongestStringChain
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.longestStringChain

class ProgramTest {
    @Test
    fun TestCase1() {
        val strings = listOf("abde", "abc", "abd", "abcde", "ade", "ae", "1abde", "abcdef")
        val expected = listOf("abcdef", "abcde", "abde", "ade", "ae")
        assert(longestStringChain(strings).equals(expected))
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
      let input = ["abde", "abc", "abd", "abcde", "ade", "ae", "1abde", "abcdef"]
      let expected = ["abcdef", "abcde", "abde", "ade", "ae"]
      let output = program.longestStringChain(input)
      try assertEqual(output, expected)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  class Chain {
    var nextString: String
    var maxChainLength: Int

    init(_ nextString: String, _ maxChainLength: Int) {
      self.nextString = nextString
      self.maxChainLength = maxChainLength
    }
  }

  // O(n * m^2 + nlog(n)) time | O(nm) space - where n is the number of strings and
  // m is the length of the longest string
  func longestStringChain(_ strings: [String]) -> [String] {
    // For every string, imagine the longest string chain that starts with it.
    // Set up every string to point to the next string in its respective longest
    // string chain. Also keep track of the lengths of these longest string chains.
    var stringChains = [String: Chain]()
    for str in strings {
      stringChains[str] = Chain("", 1)
    }

    // Sort the strings based on their length so that whenever we visit a
    // string (as we iterate through them from left to right), we can
    // already have computed the longest string chains of any smaller strings.
    let sortedStrings = strings.sorted {
      $0.length < $1.length
    }

    for str in sortedStrings {
      findLongestStringChain(str, &stringChains)
    }
    return buildLongestStringChain(strings, &stringChains)
  }

  func findLongestStringChain(_ string: String, _ stringChains: inout [String: Chain]) {
    // Try removing every letter of the current string to see if the
    // remaining strings form a string chain.
    for i in 0 ..< string.length {
      let smallerString = getSmallerString(string, i)
      if let _ = stringChains[smallerString] {
        tryUpdateLongestStringChain(string, smallerString, &stringChains)
      }
    }
  }

  func getSmallerString(_ string: String, _ index: Int) -> String {
    var s = string
    let i = s.index(s.startIndex, offsetBy: index)
    s.remove(at: i)
    return s
  }

  func tryUpdateLongestStringChain(_ currentString: String, _ smallerString: String, _ stringChains: inout [String: Chain]) {
    let smallerStringChainLength = stringChains[smallerString]!.maxChainLength
    let currentStringChainLength = stringChains[currentString]!.maxChainLength
    // Update the string chain of the current string only if the smaller string leads
    // to a longer string chain.
    if smallerStringChainLength + 1 > currentStringChainLength {
      stringChains[currentString]!.maxChainLength = smallerStringChainLength + 1
      stringChains[currentString]!.nextString = smallerString
    }
  }

  func buildLongestStringChain(_ strings: [String], _ stringChains: inout [String: Chain]) -> [String] {
    // Find the string that starts the longest string chain.
    var maxChainLength = 0
    var chainStartingString = ""
    for str in strings {
      if stringChains[str]!.maxChainLength > maxChainLength {
        maxChainLength = stringChains[str]!.maxChainLength
        chainStartingString = str
      }
    }

    // Starting at the string found above, build the longest string chain.
    var ourLongestStringChain = [String]()
    var currentString = chainStartingString
    while currentString != "" {
      ourLongestStringChain.append(currentString)
      currentString = stringChains[currentString]!.nextString
    }

    if ourLongestStringChain.count == 1 {
      return [String]()
    }
    return ourLongestStringChain
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let input = ["abde", "abc", "abd", "abcde", "ade", "ae", "1abde", "abcdef"]
      let expected = ["abcdef", "abcde", "abde", "ade", "ae"]
      let output = program.longestStringChain(input)
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
        strings = ["abde", "abc", "abd", "abcde", "ade", "ae", "1abde", "abcdef"]
        expected = ["abcdef", "abcde", "abde", "ade", "ae"]
        self.assertEqual(program.longestStringChain(strings), expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n * m^2 + nlog(n)) time | O(nm) space - where n is the number of strings and
# m is the length of the longest string
def longestStringChain(strings):
    # For every string, imagine the longest string chain that starts with it.
    # Set up every string to point to the next string in its respective longest
    # string chain. Also keep track of the lengths of these longest string chains.
    stringChains = {}
    for string in strings:
        stringChains[string] = {"nextString": "", "maxChainLength": 1}

    # Sort the strings based on their length so that whenever we visit a
    # string (as we iterate through them from left to right), we can
    # already have computed the longest string chains of any smaller strings.
    sortedStrings = sorted(strings, key=len)
    for string in sortedStrings:
        findLongestStringChain(string, stringChains)

    return buildLongestStringChain(strings, stringChains)


def findLongestStringChain(string, stringChains):
    # Try removing every letter of the current string to see if the
    # remaining strings form a string chain.
    for i in range(len(string)):
        smallerString = getSmallerString(string, i)
        if smallerString not in stringChains:
            continue
        tryUpdateLongestStringChain(string, smallerString, stringChains)


def getSmallerString(string, index):
    return string[0:index] + string[index + 1 :]


def tryUpdateLongestStringChain(currentString, smallerString, stringChains):
    smallerStringChainLength = stringChains[smallerString]["maxChainLength"]
    currentStringChainLength = stringChains[currentString]["maxChainLength"]
    # Update the string chain of the current string only if the smaller string leads
    # to a longer string chain.
    if smallerStringChainLength + 1 > currentStringChainLength:
        stringChains[currentString]["maxChainLength"] = smallerStringChainLength + 1
        stringChains[currentString]["nextString"] = smallerString


def buildLongestStringChain(strings, stringChains):
    # Find the string that starts the longest string chain.
    maxChainLength = 0
    chainStartingString = ""
    for string in strings:
        if stringChains[string]["maxChainLength"] > maxChainLength:
            maxChainLength = stringChains[string]["maxChainLength"]
            chainStartingString = string

    # Starting at the string found above, build the longest string chain.
    ourLongestStringChain = []
    currentString = chainStartingString
    while currentString != "":
        ourLongestStringChain.append(currentString)
        currentString = stringChains[currentString]["nextString"]

    return [] if len(ourLongestStringChain) == 1 else ourLongestStringChain

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        strings = ["abde", "abc", "abd", "abcde", "ade", "ae", "1abde", "abcdef"]
        expected = ["abcdef", "abcde", "abde", "ade", "ae"]
        self.assertEqual(program.longestStringChain(strings), expected)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const strings = ['abde', 'abc', 'abd', 'abcde', 'ade', 'ae', '1abde', 'abcdef'];
  const expected = ['abcdef', 'abcde', 'abde', 'ade', 'ae'];
  chai.expect(program.longestStringChain(strings)).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

interface StringChains {
  [key: string]: {
    nextString: string;
    maxChainLength: number;
  };
}

// O(n * m^2 + nlog(n)) time | O(nm) space - where n is the number of strings and
// m is the length of the longest string
export function longestStringChain(strings: string[]) {
  // For every string, imagine the longest string chain that starts with it.
  // Set up every string to point to the next string in its respective longest
  // string chain. Also keep track of the lengths of these longest string chains.
  const stringChains: StringChains = {};
  for (const string of strings) {
    stringChains[string] = {nextString: '', maxChainLength: 1};
  }

  // Sort the strings based on their length so that whenever we visit a
  // string (as we iterate through them from left to right), we can
  // already have computed the longest string chains of any smaller strings.
  const sortedStrings = strings.sort((a, b) => a.length - b.length);
  for (const string of sortedStrings) {
    findLongestStringChain(string, stringChains);
  }

  return buildLongestStringChain(strings, stringChains);
}

function findLongestStringChain(string: string, stringChains: StringChains) {
  // Try removing every letter of the current string to see if the
  // remaining strings form a string chain.
  for (let i = 0; i < string.length; i++) {
    const smallerString = getSmallerString(string, i);
    if (!(smallerString in stringChains)) continue;
    tryUpdateLongestStringChain(string, smallerString, stringChains);
  }
}

function getSmallerString(string: string, index: number) {
  return string.slice(0, index) + string.slice(index + 1);
}

function tryUpdateLongestStringChain(currentString: string, smallerString: string, stringChains: StringChains) {
  const smallerStringChainLength = stringChains[smallerString].maxChainLength;
  const currentStringChainLength = stringChains[currentString].maxChainLength;
  // Update the string chain of the current string only if the smaller string leads
  // to a longer string chain.
  if (smallerStringChainLength + 1 > currentStringChainLength) {
    stringChains[currentString].maxChainLength = smallerStringChainLength + 1;
    stringChains[currentString].nextString = smallerString;
  }
}

function buildLongestStringChain(strings: string[], stringChains: StringChains) {
  // Find the string that starts the longest string chain.
  let maxChainLength = 0;
  let chainStartingString = '';
  for (const string of strings) {
    if (stringChains[string].maxChainLength > maxChainLength) {
      maxChainLength = stringChains[string].maxChainLength;
      chainStartingString = string;
    }
  }

  // Starting at the string found above, build the longest string chain.
  const ourLongestStringChain: string[] = [];
  let currentString = chainStartingString;
  while (currentString !== '') {
    ourLongestStringChain.push(currentString);
    currentString = stringChains[currentString].nextString;
  }

  return ourLongestStringChain.length === 1 ? [] : ourLongestStringChain;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const strings = ['abde', 'abc', 'abd', 'abcde', 'ade', 'ae', '1abde', 'abcdef'];
  const expected = ['abcdef', 'abcde', 'abde', 'ade', 'ae'];
  chai.expect(program.longestStringChain(strings)).to.deep.equal(expected);
});

```

