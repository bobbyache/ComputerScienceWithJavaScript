# Valid IP Addresses
<div class="html">
<p>
  You're given a string of length 12 or smaller, containing only digits. Write a
  function that returns all the possible IP addresses that can be created by
  inserting three <span>.</span>s in the string.
</p>
<p>
  An IP address is a sequence of four positive integers that are separated by
  <span>.</span>s, where each individual integer is within the range
  <span>0 - 255</span>, inclusive.
</p>
<p>
  An IP address isn't valid if any of the individual integers contains leading
  <span>0</span>s. For example, <span>"192.168.0.1"</span> is a valid IP
  address, but <span>"192.168.00.1"</span> and
  <span>"192.168.0.01"</span> aren't, because they contain <span>"00"</span> and
  <span>01</span>, respectively. Another example of a valid IP address is
  <span>"99.1.1.10"</span>; conversely, <span>"991.1.1.0"</span> isn't valid,
  because <span>"991"</span> is greater than 255.
</p>
<p>
  Your function should return the IP addresses in string format and in no
  particular order. If no valid IP addresses can be created from the string,
  your function should return an empty list.
</p>
<p>
  Note: check out our Systems Design Fundamentals on SystemsExpert to learn more
  about IP addresses!
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">string</span> = "1921680"
</pre>
<h3>Sample Output</h3>
<pre>
[
  "1.9.216.80",
  "1.92.16.80",
  "1.92.168.0",
  "19.2.16.80",
  "19.2.168.0",
  "19.21.6.80",
  "19.21.68.0",
  "19.216.8.0",
  "192.1.6.80",
  "192.1.68.0",
  "192.16.8.0"
]
<span class="CodeEditor-promptComment">// The IP addresses could be ordered differently.</span>
</pre>
</div>

Hint 1
<p>
How can you split this problem into subproblems to make it easier?
</p>


Hint 2

<p>
Each IP address is comprised of four parts; try finding one valid part at a time and then combining sets of four valid parts to create one valid IP address.
</p>


Hint 3

<p>
Go through all possible combinations of valid IP-address parts. You'll do this by generating a valid first part, then generating all valid second parts given the first part, then finally all valid third and fourth parts given first and second parts. If you find a set of four valid parts, then simply combine them together and add that IP address to some final array. You can start by creating all the possible first parts of an IP address; these will be substrings of the main string that start at the first character and that have lengths 1, 2 and 3. Then you can repeat this process for the second part, where the substrings in this part will start where the first part ended. The same thing applies for the third and fourth parts. After going through all possible parts and storing valid IP addresses, you'll have found all of the IP addresses that can be formed from the input string.
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
      auto input = "1921680";
      vector<string> expected = {"1.9.216.80", "1.92.16.80", "1.92.168.0",
                                 "19.2.16.80", "19.2.168.0", "19.21.6.80",
                                 "19.21.68.0", "19.216.8.0", "192.1.6.80",
                                 "192.1.68.0", "192.16.8.0"};
      vector<string> actual = validIPAddresses(input);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <algorithm>
#include <string>

using namespace std;

bool isValidPart(string str);
string join(vector<string> strings);

// O(1) time | O(1) space
vector<string> validIPAddresses(string str) {
  vector<string> ipAddressesFound;

  for (int i = 1; i < min((int)str.length(), 4); i++) {
    vector<string> currentIPAddressParts = {"", "", "", ""};

    currentIPAddressParts[0] = str.substr(0, i);
    if (!isValidPart(currentIPAddressParts[0])) {
      continue;
    }

    for (int j = i + 1; j < i + min((int)str.length() - i, 4); j++) {
      currentIPAddressParts[1] = str.substr(i, j - i);
      if (!isValidPart(currentIPAddressParts[1])) {
        continue;
      }

      for (int k = j + 1; k < j + min((int)str.length() - j, 4); k++) {
        currentIPAddressParts[2] = str.substr(j, k - j);
        currentIPAddressParts[3] = str.substr(k);

        if (isValidPart(currentIPAddressParts[2]) &&
            isValidPart(currentIPAddressParts[3])) {
          ipAddressesFound.push_back(join(currentIPAddressParts));
        }
      }
    }
  }

  return ipAddressesFound;
}

bool isValidPart(string str) {
  int stringAsInt = stoi(str);

  if (stringAsInt > 255) {
    return false;
  }

  return str.length() == to_string(stringAsInt).length(); // check for leading 0
}

string join(vector<string> strings) {
  string s;
  for (int l = 0; l < strings.size(); l++) {
    s += strings[l];
    if (l < strings.size() - 1) {
      s += ".";
    }
  }
  return s;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      auto input = "1921680";
      vector<string> expected = {"1.9.216.80", "1.92.16.80", "1.92.168.0",
                                 "19.2.16.80", "19.2.168.0", "19.21.6.80",
                                 "19.21.68.0", "19.216.8.0", "192.1.6.80",
                                 "192.1.68.0", "192.16.8.0"};
      vector<string> actual = validIPAddresses(input);
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
		string input = "1921680";
		List<string> expected = new List<string>();
		expected.Add("1.9.216.80");
		expected.Add("1.92.16.80");
		expected.Add("1.92.168.0");
		expected.Add("19.2.16.80");
		expected.Add("19.2.168.0");
		expected.Add("19.21.6.80");
		expected.Add("19.21.68.0");
		expected.Add("19.216.8.0");
		expected.Add("192.1.6.80");
		expected.Add("192.1.68.0");
		expected.Add("192.16.8.0");
		var actual = new Program().ValidIPAddresses(input);
		Utils.AssertTrue(Enumerable.SequenceEqual(expected, actual));
	}
}


```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System.Text;
using System;


public class Program {

	// O(1) time | O(1) space
	public List<string> ValidIPAddresses(string str) {
		List<string> ipAddressesFound = new List<string>();

		for (int i = 1; i < Math.Min((int)str.Length, 4); i++) {
			string[] currentIPAddressParts = new string[] {"", "", "", ""};

			currentIPAddressParts[0] = str.Substring(0, i-0);
			if (!isValidPart(currentIPAddressParts[0])) {
				continue;
			}

			for (int j = i + 1; j < i + Math.Min((int)str.Length - i, 4); j++) {
				currentIPAddressParts[1] = str.Substring(i, j-i);
				if (!isValidPart(currentIPAddressParts[1])) {
					continue;
				}

				for (int k = j + 1; k < j + Math.Min((int)str.Length - j, 4); k++) {
					currentIPAddressParts[2] = str.Substring(j, k-j);
					currentIPAddressParts[3] = str.Substring(k);

					if (isValidPart(currentIPAddressParts[2]) &&
					  isValidPart(currentIPAddressParts[3])) {
						ipAddressesFound.Add(join(currentIPAddressParts));
					}
				}
			}
		}

		return ipAddressesFound;
	}

	public bool isValidPart(string str) {
		int stringAsInt = Int32.Parse(str);
		if (stringAsInt > 255) {
			return false;
		}

		return str.Length == stringAsInt.ToString().Length; // check for leading 0
	}

	public string join(string[] strings) {
		StringBuilder sb = new StringBuilder();
		for (int l = 0; l < strings.Length; l++) {
			sb.Append(strings[l]);
			if (l < strings.Length - 1) {
				sb.Append(".");
			}
		}
		return sb.ToString();
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
		string input = "1921680";
		List<string> expected = new List<string>();
		expected.Add("1.9.216.80");
		expected.Add("1.92.16.80");
		expected.Add("1.92.168.0");
		expected.Add("19.2.16.80");
		expected.Add("19.2.168.0");
		expected.Add("19.21.6.80");
		expected.Add("19.21.68.0");
		expected.Add("19.216.8.0");
		expected.Add("192.1.6.80");
		expected.Add("192.1.68.0");
		expected.Add("192.16.8.0");
		var actual = new Program().ValidIPAddresses(input);
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
	input := "1921680"
	expected := []string{
		"1.9.216.80",
		"1.92.16.80",
		"1.92.168.0",
		"19.2.16.80",
		"19.2.168.0",
		"19.21.6.80",
		"19.21.68.0",
		"19.216.8.0",
		"192.1.6.80",
		"192.1.68.0",
		"192.16.8.0",
	}
	actual := ValidIPAddresses(input)
	require.ElementsMatch(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"strconv"
	"strings"
)

// O(1) time | O(1) space
func ValidIPAddresses(str string) []string {
	ipAddressesFound := make([]string, 0)

	for i := 1; i < min(len(str), 4); i++ {
		currentIPAddressParts := []string{"", "", "", ""}

		currentIPAddressParts[0] = str[:i]
		if !isValidPart(currentIPAddressParts[0]) {
			continue
		}

		for j := i + 1; j < i+min(len(str)-i, 4); j++ {
			currentIPAddressParts[1] = str[i:j]
			if !isValidPart(currentIPAddressParts[1]) {
				continue
			}

			for k := j + 1; k < j+min(len(str)-j, 4); k++ {
				currentIPAddressParts[2] = str[j:k]
				currentIPAddressParts[3] = str[k:]

				if isValidPart(currentIPAddressParts[2]) && isValidPart(currentIPAddressParts[3]) {
					ipAddressesFound = append(ipAddressesFound, strings.Join(currentIPAddressParts, "."))
				}
			}
		}
	}
	return ipAddressesFound
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func isValidPart(str string) bool {
	i, err := strconv.Atoi(str)
	if err != nil {
		return false
	}

	if i > 255 {
		return false
	}
	return len(str) == len(strconv.Itoa(i))
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := "1921680"
	expected := []string{
		"1.9.216.80",
		"1.92.16.80",
		"1.92.168.0",
		"19.2.16.80",
		"19.2.168.0",
		"19.21.6.80",
		"19.21.68.0",
		"19.216.8.0",
		"192.1.6.80",
		"192.1.68.0",
		"192.16.8.0",
	}
	actual := ValidIPAddresses(input)
	require.ElementsMatch(t, expected, actual)
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
    String input = "1921680";
    ArrayList<String> expected = new ArrayList<String>();
    expected.add("1.9.216.80");
    expected.add("1.92.16.80");
    expected.add("1.92.168.0");
    expected.add("19.2.16.80");
    expected.add("19.2.168.0");
    expected.add("19.21.6.80");
    expected.add("19.21.68.0");
    expected.add("19.216.8.0");
    expected.add("192.1.6.80");
    expected.add("192.1.68.0");
    expected.add("192.16.8.0");
    var actual = new Program().validIPAddresses(input);
    Utils.assertTrue(expected.equals(actual));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(1) time | O(1) space
  public ArrayList<String> validIPAddresses(String string) {
    ArrayList<String> ipAddressesFound = new ArrayList<String>();

    for (int i = 1; i < Math.min((int) string.length(), 4); i++) {
      String[] currentIPAddressParts = new String[] {"", "", "", ""};

      currentIPAddressParts[0] = string.substring(0, i);
      if (!isValidPart(currentIPAddressParts[0])) {
        continue;
      }

      for (int j = i + 1; j < i + Math.min((int) string.length() - i, 4); j++) {
        currentIPAddressParts[1] = string.substring(i, j);
        if (!isValidPart(currentIPAddressParts[1])) {
          continue;
        }

        for (int k = j + 1; k < j + Math.min((int) string.length() - j, 4); k++) {
          currentIPAddressParts[2] = string.substring(j, k);
          currentIPAddressParts[3] = string.substring(k);

          if (isValidPart(currentIPAddressParts[2]) && isValidPart(currentIPAddressParts[3])) {
            ipAddressesFound.add(join(currentIPAddressParts));
          }
        }
      }
    }

    return ipAddressesFound;
  }

  public boolean isValidPart(String string) {
    int stringAsInt = Integer.parseInt(string);
    if (stringAsInt > 255) {
      return false;
    }

    return string.length() == Integer.toString(stringAsInt).length(); // check for leading 0
  }

  public String join(String[] strings) {
    StringBuilder sb = new StringBuilder();
    for (int l = 0; l < strings.length; l++) {
      sb.append(strings[l]);
      if (l < strings.length - 1) {
        sb.append(".");
      }
    }
    return sb.toString();
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    String input = "1921680";
    ArrayList<String> expected = new ArrayList<String>();
    expected.add("1.9.216.80");
    expected.add("1.92.16.80");
    expected.add("1.92.168.0");
    expected.add("19.2.16.80");
    expected.add("19.2.168.0");
    expected.add("19.21.6.80");
    expected.add("19.21.68.0");
    expected.add("19.216.8.0");
    expected.add("192.1.6.80");
    expected.add("192.1.68.0");
    expected.add("192.16.8.0");
    var actual = new Program().validIPAddresses(input);
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
  const input = '1921680';
  const expected = [
    '1.9.216.80',
    '1.92.16.80',
    '1.92.168.0',
    '19.2.16.80',
    '19.2.168.0',
    '19.21.6.80',
    '19.21.68.0',
    '19.216.8.0',
    '192.1.6.80',
    '192.1.68.0',
    '192.16.8.0',
  ];
  const actual = program.validIPAddresses(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(1) time | O(1) space
function validIPAddresses(string) {
  const ipAddressesFound = [];

  for (let i = 0; i < Math.min(string.length, 4); i++) {
    const currentIPAddressParts = ['', '', '', ''];

    currentIPAddressParts[0] = string.slice(0, i);
    if (!isValidPart(currentIPAddressParts[0])) continue;

    for (let j = i + 1; j < i + Math.min(string.length - i, 4); j++) {
      currentIPAddressParts[1] = string.slice(i, j);
      if (!isValidPart(currentIPAddressParts[1])) continue;

      for (let k = j + 1; k < j + Math.min(string.length - j, 4); k++) {
        currentIPAddressParts[2] = string.slice(j, k);
        currentIPAddressParts[3] = string.slice(k);

        if (isValidPart(currentIPAddressParts[2]) && isValidPart(currentIPAddressParts[3])) {
          ipAddressesFound.push(currentIPAddressParts.join('.'));
        }
      }
    }
  }

  return ipAddressesFound;
}

function isValidPart(string) {
  const stringAsInt = parseInt(string);
  if (stringAsInt > 255) return false;

  return string.length === stringAsInt.toString().length;
}

// Do not edit the line below.
exports.validIPAddresses = validIPAddresses;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = '1921680';
  const expected = [
    '1.9.216.80',
    '1.92.16.80',
    '1.92.168.0',
    '19.2.16.80',
    '19.2.168.0',
    '19.21.6.80',
    '19.21.68.0',
    '19.216.8.0',
    '192.1.6.80',
    '192.1.68.0',
    '192.16.8.0',
  ];
  const actual = program.validIPAddresses(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.validIPAddresses

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = "1921680"
        val expected = listOf(
            "1.9.216.80",
            "1.92.16.80",
            "1.92.168.0",
            "19.2.16.80",
            "19.2.168.0",
            "19.21.6.80",
            "19.21.68.0",
            "19.216.8.0",
            "192.1.6.80",
            "192.1.68.0",
            "192.16.8.0"
        )
        val output = validIPAddresses(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.min

// O(1) time | O(1) space
fun validIPAddresses(string: String): List<String> {
    val ipAddressesFound = mutableListOf<String>()

    for (i in 1 until min(string.length, 4)) {
        val currentIPAddressParts = mutableListOf("", "", "", "")

        currentIPAddressParts[0] = string.substring(0, i)
        if (!isValidPart(currentIPAddressParts[0])) continue

        for (j in i + 1 until i + min(string.length - i, 4)) {
            currentIPAddressParts[1] = string.substring(i, j)
            if (!isValidPart(currentIPAddressParts[1])) continue

            for (k in j + 1 until j + min(string.length - j, 4)) {
                currentIPAddressParts[2] = string.substring(j, k)
                currentIPAddressParts[3] = string.substring(k)

                if (isValidPart(currentIPAddressParts[2]) && isValidPart(currentIPAddressParts[3])) {
                    ipAddressesFound.add(currentIPAddressParts.joinToString("."))
                }
            }
        }
    }

    return ipAddressesFound
}

fun isValidPart(string: String): Boolean {
    val stringAsInt = string.toInt()
    if (stringAsInt > 255) return false

    return string.length == stringAsInt.toString().length
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.validIPAddresses

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = "1921680"
        val expected = listOf(
            "1.9.216.80",
            "1.92.16.80",
            "1.92.168.0",
            "19.2.16.80",
            "19.2.168.0",
            "19.21.6.80",
            "19.21.68.0",
            "19.216.8.0",
            "192.1.6.80",
            "192.1.68.0",
            "192.16.8.0"
        )
        val output = validIPAddresses(input)
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
      let input = "1921680"
      let expected = [
        "1.9.216.80",
        "1.92.16.80",
        "1.92.168.0",
        "19.2.16.80",
        "19.2.168.0",
        "19.21.6.80",
        "19.21.68.0",
        "19.216.8.0",
        "192.1.6.80",
        "192.1.68.0",
        "192.16.8.0",
      ]
      var actual = Program().validIPAddresses(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(1) time | O(n) space
  func validIPAddresses(_ string: String) -> [String] {
    let indexedString = Array(string)
    var ipAddressesFound = [String]()

    for i in 1 ..< min(string.count, 4) {
      var currentIPAddressParts: [[Character]] = [[], [], [], []]

      currentIPAddressParts[0] = Array(indexedString[..<i])
      if !isValidPart(currentIPAddressParts[0]) {
        continue
      }

      for j in i + 1 ..< i + min(string.count - i, 4) {
        currentIPAddressParts[1] = Array(indexedString[i ..< j])
        if !isValidPart(currentIPAddressParts[1]) {
          continue
        }

        for k in j + 1 ..< j + min(string.count - j, 4) {
          currentIPAddressParts[2] = Array(indexedString[j ..< k])
          currentIPAddressParts[3] = Array(indexedString[k...])

          if isValidPart(currentIPAddressParts[2]), isValidPart(currentIPAddressParts[3]) {
            ipAddressesFound.append(joinIp(currentIPAddressParts))
          }
        }
      }
    }
    return ipAddressesFound
  }

  func isValidPart(_ string: [Character]) -> Bool {
    let i = Int(String(string)) ?? 256
    if i > 255 {
      return false
    }
    return string.count == String(i).count
  }

  func joinIp(_ ip: [[Character]]) -> String {
    var segments = [String]()
    for segment in ip {
      segments.append(String(segment))
    }
    return segments.joined(separator: ".")
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let input = "1921680"
      let expected = [
        "1.9.216.80",
        "1.92.16.80",
        "1.92.168.0",
        "19.2.16.80",
        "19.2.168.0",
        "19.21.6.80",
        "19.21.68.0",
        "19.216.8.0",
        "192.1.6.80",
        "192.1.68.0",
        "192.16.8.0",
      ]
      var actual = Program().validIPAddresses(input)
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
        input = "1921680"
        expected = [
            "1.9.216.80",
            "1.92.16.80",
            "1.92.168.0",
            "19.2.16.80",
            "19.2.168.0",
            "19.21.6.80",
            "19.21.68.0",
            "19.216.8.0",
            "192.1.6.80",
            "192.1.68.0",
            "192.16.8.0",
        ]
        actual = program.validIPAddresses(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(1) time | O(1) space
def validIPAddresses(string):
    ipAddressesFound = []

    for i in range(1, min(len(string), 4)):
        currentIPAddressParts = ["", "", "", ""]

        currentIPAddressParts[0] = string[:i]
        if not isValidPart(currentIPAddressParts[0]):
            continue

        for j in range(i + 1, i + min(len(string) - i, 4)):
            currentIPAddressParts[1] = string[i:j]
            if not isValidPart(currentIPAddressParts[1]):
                continue

            for k in range(j + 1, j + min(len(string) - j, 4)):
                currentIPAddressParts[2] = string[j:k]
                currentIPAddressParts[3] = string[k:]

                if isValidPart(currentIPAddressParts[2]) and isValidPart(currentIPAddressParts[3]):
                    ipAddressesFound.append(".".join(currentIPAddressParts))

    return ipAddressesFound


def isValidPart(string):
    stringAsInt = int(string)
    if stringAsInt > 255:
        return False

    return len(string) == len(str(stringAsInt))  # check for leading 0

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = "1921680"
        expected = [
            "1.9.216.80",
            "1.92.16.80",
            "1.92.168.0",
            "19.2.16.80",
            "19.2.168.0",
            "19.21.6.80",
            "19.21.68.0",
            "19.216.8.0",
            "192.1.6.80",
            "192.1.68.0",
            "192.16.8.0",
        ]
        actual = program.validIPAddresses(input)
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
  const input = '1921680';
  const expected = [
    '1.9.216.80',
    '1.92.16.80',
    '1.92.168.0',
    '19.2.16.80',
    '19.2.168.0',
    '19.21.6.80',
    '19.21.68.0',
    '19.216.8.0',
    '192.1.6.80',
    '192.1.68.0',
    '192.16.8.0',
  ];
  const actual = program.validIPAddresses(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(1) time | O(1) space
export function validIPAddresses(string: string) {
  const ipAddressesFound: string[] = [];

  for (let i = 0; i < Math.min(string.length, 4); i++) {
    const currentIPAddressParts = ['', '', '', ''];

    currentIPAddressParts[0] = string.slice(0, i);
    if (!isValidPart(currentIPAddressParts[0])) continue;

    for (let j = i + 1; j < i + Math.min(string.length - i, 4); j++) {
      currentIPAddressParts[1] = string.slice(i, j);
      if (!isValidPart(currentIPAddressParts[1])) continue;

      for (let k = j + 1; k < j + Math.min(string.length - j, 4); k++) {
        currentIPAddressParts[2] = string.slice(j, k);
        currentIPAddressParts[3] = string.slice(k);

        if (isValidPart(currentIPAddressParts[2]) && isValidPart(currentIPAddressParts[3])) {
          ipAddressesFound.push(currentIPAddressParts.join('.'));
        }
      }
    }
  }

  return ipAddressesFound;
}

function isValidPart(string: string) {
  const stringAsInt = parseInt(string);
  if (stringAsInt > 255) return false;

  return string.length === stringAsInt.toString().length;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = '1921680';
  const expected = [
    '1.9.216.80',
    '1.92.16.80',
    '1.92.168.0',
    '19.2.16.80',
    '19.2.168.0',
    '19.21.6.80',
    '19.21.68.0',
    '19.216.8.0',
    '192.1.6.80',
    '192.1.68.0',
    '192.16.8.0',
  ];
  const actual = program.validIPAddresses(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

