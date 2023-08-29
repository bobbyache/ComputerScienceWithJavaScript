# Four Number Sum
<div class="html">
<p>
  Write a function that takes in a non-empty array of distinct integers and an
  integer representing a target sum. The function should find all quadruplets in
  the array that sum up to the target sum and return a two-dimensional array of
  all these quadruplets in no particular order.
</p>
<p>
  If no four numbers sum up to the target sum, the function should return an
  empty array.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [7, 6, 4, -1, 1, 2]
<span class="CodeEditor-promptParameter">targetSum</span> = 16
</pre>
<h3>Sample Output</h3>
<pre>
[[7, 6, 4, -1], [7, 6, 1, 2]] <span class="CodeEditor-promptComment">// the quadruplets could be ordered differently</span>
</pre>
</div>

Hint 1
<p>
Using four for loops to calculate the sums of all possible quadruplets in the array would generate an algorithm that runs in O(n^4) time, where n is the length of the input array. Can you come up with something faster using fewer for loops?
</p>


Hint 2

<p>
You can calculate the sums of every pair of numbers in the array in O(n^2) time using just two for loops. Then, assuming that you've stored all of these sums in a hash table, you can fairly easily find which two sums can be paired to add up to the target sum: the numbers summing up to these two sums constitute candidates for valid quadruplets; you just have to make sure that no number was used to generate both of the two sums.
</p>


Hint 3

<p>
You can do everything described in Hint #2 with just two sibling for loops nested inside a third for loop. Your goal is to create a hash table mapping the sums of every pair of numbers in the array to an array of arrays, with each subarray representing the indices of each pair summing up to that number. Loop through the input array with a simple for loop. Inside this loop, loop through the input array again, starting at the index of the first loop. At each iteration, calculate the difference between the target sum and the sum of the two numbers represented by the indices of the for loops. If that difference is in the hash table that you're building, then valid quadruplets can be formed by combining the current pair of numbers with each pair stored in the hash table at the difference just calculated. Following this nested for loop, loop through the array again, this time starting at index zero all the way to the index of the first for loop. At each iteration, calculate the sum of the two numbers represented by the indices of the for loops and add it to the hash table if it isn't already there; then add the pair of indices to the array that the sum in the hash table maps to.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

string sortAndStringify(vector<int> array) {
  sort(array.begin(), array.end());
  string s;
  for (int elem : array) {
    s += to_string(elem);
    s += ",";
  }
  return s;
}

bool isIncluded(vector<string> array, string str1) {
  for (string str2 : array) {
    if (str1 == str2) {
      return true;
    }
  }
  return false;
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> output = fourNumberSum({7, 6, 4, -1, 1, 2}, 16);
      vector<string> output2{};
      for (vector<int> arr : output) {
        output2.push_back(sortAndStringify(arr));
      }
      vector<vector<int>> quadruplets{
          {7, 6, 4, -1},
          {7, 6, 1, 2},
      };
      assert(output2.size() == 2);
      for (vector<int> quadruplet : quadruplets) {
        string str1 = sortAndStringify(quadruplet);
        bool included = isIncluded(output2, str1);
        assert(included == true);
      }
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

// Average: O(n^2) time | O(n^2) space
// Worst: O(n^3) time | O(n^2) space
vector<vector<int>> fourNumberSum(vector<int> array, int targetSum) {
  unordered_map<int, vector<vector<int>>> allPairSums;
  vector<vector<int>> quadruplets{};
  for (int i = 1; i < array.size() - 1; i++) {
    for (int j = i + 1; j < array.size(); j++) {
      int currentSum = array[i] + array[j];
      int difference = targetSum - currentSum;
      if (allPairSums.find(difference) != allPairSums.end()) {
        for (vector<int> pair : allPairSums[difference]) {
          pair.push_back(array[i]);
          pair.push_back(array[j]);
          quadruplets.push_back(pair);
        }
      }
    }
    for (int k = 0; k < i; k++) {
      int currentSum = array[i] + array[k];
      if (allPairSums.find(currentSum) == allPairSums.end()) {
        allPairSums[currentSum] = vector<vector<int>>{{array[k], array[i]}};
      } else {
        allPairSums[currentSum].push_back(vector<int>{array[k], array[i]});
      }
    }
  }
  return quadruplets;
}

```
### Unit Tests 1 (cpp)
```cpp
string sortAndStringify(vector<int> array) {
  sort(array.begin(), array.end());
  string s;
  for (int elem : array) {
    s += to_string(elem);
    s += ",";
  }
  return s;
}

bool isIncluded(vector<string> array, string str1) {
  for (string str2 : array) {
    if (str1 == str2) {
      return true;
    }
  }
  return false;
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> output = fourNumberSum({7, 6, 4, -1, 1, 2}, 16);
      vector<string> output2{};
      for (vector<int> arr : output) {
        output2.push_back(sortAndStringify(arr));
      }
      vector<vector<int>> quadruplets{
          {7, 6, 4, -1},
          {7, 6, 1, 2},
      };
      assert(output2.size() == 2);
      for (vector<int> quadruplet : quadruplets) {
        string str1 = sortAndStringify(quadruplet);
        bool included = isIncluded(output2, str1);
        assert(included == true);
      }
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
using System.Linq;
using System.Collections.Generic;

public class ProgramTest {
	private bool compare(List<int[]> quads1, List<int[]> quads2) {
		foreach (int[] quad in quads2) {
			Array.Sort(quad);
		}
		foreach (int[] quad in quads1) {
			Array.Sort(quad);
		}
		foreach (int[] quad2 in quads2) {
			bool found = false;
			foreach (int[] quad1 in quads1) {
				if (Enumerable.SequenceEqual(quad2, quad1)) {
					found = true;
					break;
				}
			}
			if (found == false) {
				return false;
			}
		}
		return true;
	}

	[Test]
	public void TestCase1() {
		List<int[]> output = Program.FourNumberSum(new int[] {7, 6, 4, -1, 1, 2}, 16);
		List<int[]> quadruplets = new List<int[]>();
		quadruplets.Add(new int[] {7, 6, 4, -1});
		quadruplets.Add(new int[] {7, 6, 1, 2});
		Utils.AssertTrue(quadruplets.Count == output.Count);
		Utils.AssertTrue(this.compare(quadruplets, output));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

// Average: O(n^2) time | O(n^2) space
// Worst: O(n^3) time | O(n^2) space
public class Program {
	public static List<int[]> FourNumberSum(int[] array, int targetSum) {
		Dictionary<int, List<int[]> > allPairSums = new Dictionary<int, List<int[]> >();
		List<int[]> quadruplets = new List<int[]>();
		for (int i = 1; i < array.Length - 1; i++) {
			for (int j = i + 1; j < array.Length; j++) {
				int currentSum = array[i] + array[j];
				int difference = targetSum - currentSum;
				if (allPairSums.ContainsKey(difference)) {
					foreach (int[] pair in allPairSums[difference]) {
						int[] newQuadruplet =
						{pair[0], pair[1], array[i], array[j]};
						quadruplets.Add(newQuadruplet);
					}
				}
			}
			for (int k = 0; k < i; k++) {
				int currentSum = array[i] + array[k];
				int[] pair = {array[k], array[i]};
				if (!allPairSums.ContainsKey(currentSum)) {
					List<int[]> pairGroup = new List<int[]>();
					pairGroup.Add(pair);
					allPairSums.Add(currentSum, pairGroup);
				} else {
					allPairSums[currentSum].Add(pair);
				}
			}
		}
		return quadruplets;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;
using System.Linq;
using System.Collections.Generic;

public class ProgramTest {
	private bool compare(List<int[]> quads1, List<int[]> quads2) {
		foreach (int[] quad in quads2) {
			Array.Sort(quad);
		}
		foreach (int[] quad in quads1) {
			Array.Sort(quad);
		}
		foreach (int[] quad2 in quads2) {
			bool found = false;
			foreach (int[] quad1 in quads1) {
				if (Enumerable.SequenceEqual(quad2, quad1)) {
					found = true;
					break;
				}
			}
			if (found == false) {
				return false;
			}
		}
		return true;
	}

	[Test]
	public void TestCase1() {
		List<int[]> output = Program.FourNumberSum(new int[] {7, 6, 4, -1, 1, 2}, 16);
		List<int[]> quadruplets = new List<int[]>();
		quadruplets.Add(new int[] {7, 6, 4, -1});
		quadruplets.Add(new int[] {7, 6, 1, 2});
		Utils.AssertTrue(quadruplets.Count == output.Count);
		Utils.AssertTrue(this.compare(quadruplets, output));
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
	"fmt"
	"sort"

	"github.com/stretchr/testify/require"
)

func doTest(t *TestCase, expected, output [][]int) {
	t.Helper()
	require.Len(t, output, len(expected))
	for _, quad := range expected {
		sort.Ints(quad)
		ourquad := fmt.Sprintf("%v", quad)
		found := false
		for _, theirquad := range output {
			sort.Ints(theirquad)
			if fmt.Sprintf("%v", theirquad) == ourquad {
				found = true
				break
			}
		}
		require.True(t, found)
	}
}

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := [][]int{{7, 6, 4, -1}, {7, 6, 1, 2}}
	output := FourNumberSum([]int{7, 6, 4, -1, 1, 2}, 16)
	doTest(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// Average: O(n^2) time | O(n^2) space
// Worst: O(n^3) time | O(n^2) space
func FourNumberSum(array []int, target int) [][]int {
	allPairSums := map[int][][]int{}
	quadruplets := [][]int{}
	for i := 1; i < len(array)-1; i++ {
		for j := i + 1; j < len(array); j++ {
			currentSum := array[i] + array[j]
			difference := target - currentSum
			if pairs, found := allPairSums[difference]; found {
				for _, pair := range pairs {
					newquad := append(pair, array[i], array[j])
					quadruplets = append(quadruplets, newquad)
				}
			}
		}
		for k := 0; k < i; k++ {
			currentSum := array[i] + array[k]
			allPairSums[currentSum] = append(allPairSums[currentSum], []int{array[k], array[i]})
		}
	}
	return quadruplets
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"fmt"
	"sort"

	"github.com/stretchr/testify/require"
)

func doTest(t *TestCase, expected, output [][]int) {
	t.Helper()
	require.Len(t, output, len(expected))
	for _, quad := range expected {
		sort.Ints(quad)
		ourquad := fmt.Sprintf("%v", quad)
		found := false
		for _, theirquad := range output {
			sort.Ints(theirquad)
			if fmt.Sprintf("%v", theirquad) == ourquad {
				found = true
				break
			}
		}
		require.True(t, found)
	}
}

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := [][]int{{7, 6, 4, -1}, {7, 6, 1, 2}}
	output := FourNumberSum([]int{7, 6, 4, -1, 1, 2}, 16)
	doTest(t, expected, output)
}

```
### Sandbox Code (java)
```java
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import java.util.*;

class ProgramTest {
  private boolean compare(List<Integer[]> quads1, List<Integer[]> quads2) {
    for (Integer[] quad : quads2) {
      Arrays.sort(quad);
    }
    for (Integer[] quad : quads1) {
      Arrays.sort(quad);
    }
    for (Integer[] quad2 : quads2) {
      boolean found = false;
      for (Integer[] quad1 : quads1) {
        if (Arrays.equals(quad2, quad1)) {
          found = true;
          break;
        }
      }
      if (found == false) {
        return false;
      }
    }
    return true;
  }

  @Test
  public void TestCase1() {
    List<Integer[]> output = Program.fourNumberSum(new int[] {7, 6, 4, -1, 1, 2}, 16);
    List<Integer[]> quadruplets = new ArrayList<Integer[]>();
    quadruplets.add(new Integer[] {7, 6, 4, -1});
    quadruplets.add(new Integer[] {7, 6, 1, 2});
    Utils.assertTrue(quadruplets.size() == output.size());
    Utils.assertTrue(this.compare(quadruplets, output));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

// Average: O(n^2) time | O(n^2) space
// Worst: O(n^3) time | O(n^2) space
class Program {
  public static List<Integer[]> fourNumberSum(int[] array, int targetSum) {
    Map<Integer, List<Integer[]>> allPairSums = new HashMap<>();
    List<Integer[]> quadruplets = new ArrayList<Integer[]>();
    for (int i = 1; i < array.length - 1; i++) {
      for (int j = i + 1; j < array.length; j++) {
        int currentSum = array[i] + array[j];
        int difference = targetSum - currentSum;
        if (allPairSums.containsKey(difference)) {
          for (Integer[] pair : allPairSums.get(difference)) {
            Integer[] newQuadruplet = {pair[0], pair[1], array[i], array[j]};
            quadruplets.add(newQuadruplet);
          }
        }
      }
      for (int k = 0; k < i; k++) {
        int currentSum = array[i] + array[k];
        Integer[] pair = {array[k], array[i]};
        if (!allPairSums.containsKey(currentSum)) {
          List<Integer[]> pairGroup = new ArrayList<Integer[]>();
          pairGroup.add(pair);
          allPairSums.put(currentSum, pairGroup);
        } else {
          allPairSums.get(currentSum).add(pair);
        }
      }
    }
    return quadruplets;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  private boolean compare(List<Integer[]> quads1, List<Integer[]> quads2) {
    for (Integer[] quad : quads2) {
      Arrays.sort(quad);
    }
    for (Integer[] quad : quads1) {
      Arrays.sort(quad);
    }
    for (Integer[] quad2 : quads2) {
      boolean found = false;
      for (Integer[] quad1 : quads1) {
        if (Arrays.equals(quad2, quad1)) {
          found = true;
          break;
        }
      }
      if (found == false) {
        return false;
      }
    }
    return true;
  }

  @Test
  public void TestCase1() {
    List<Integer[]> output = Program.fourNumberSum(new int[] {7, 6, 4, -1, 1, 2}, 16);
    List<Integer[]> quadruplets = new ArrayList<Integer[]>();
    quadruplets.add(new Integer[] {7, 6, 4, -1});
    quadruplets.add(new Integer[] {7, 6, 1, 2});
    Utils.assertTrue(quadruplets.size() == output.size());
    Utils.assertTrue(this.compare(quadruplets, output));
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

function sortAndStringify(array) {
  return array.sort((a, b) => a - b).join(',');
}

it('Test Case #1', function () {
  let output = program.fourNumberSum([7, 6, 4, -1, 1, 2], 16);
  output = output.map(sortAndStringify);
  const quadruplets = [
    [7, 6, 4, -1],
    [7, 6, 1, 2],
  ];
  chai.expect(output.length === 2).to.be.true;
  for (const quadruplet of quadruplets) {
    chai.expect(output).to.include(sortAndStringify(quadruplet));
  }
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Average: O(n^2) time | O(n^2) space
// Worst: O(n^3) time | O(n^2) space
function fourNumberSum(array, targetSum) {
  const allPairSums = {};
  const quadruplets = [];
  for (let i = 1; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      const currentSum = array[i] + array[j];
      const difference = targetSum - currentSum;
      if (difference in allPairSums) {
        for (const pair of allPairSums[difference]) {
          quadruplets.push(pair.concat([array[i], array[j]]));
        }
      }
    }
    for (let k = 0; k < i; k++) {
      const currentSum = array[i] + array[k];
      if (!(currentSum in allPairSums)) {
        allPairSums[currentSum] = [[array[k], array[i]]];
      } else {
        allPairSums[currentSum].push([array[k], array[i]]);
      }
    }
  }
  return quadruplets;
}

exports.fourNumberSum = fourNumberSum;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

function sortAndStringify(array) {
  return array.sort((a, b) => a - b).join(',');
}

it('Test Case #1', function () {
  let output = program.fourNumberSum([7, 6, 4, -1, 1, 2], 16);
  output = output.map(sortAndStringify);
  const quadruplets = [
    [7, 6, 4, -1],
    [7, 6, 1, 2],
  ];
  chai.expect(output.length === 2).to.be.true;
  for (const quadruplet of quadruplets) {
    chai.expect(output).to.include(sortAndStringify(quadruplet));
  }
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.fourNumberSum as fourNumberSum

fun sortAndStringify(array: MutableList<Int>): String {
    array.sort()
    return array.joinToString(",")
}

class ProgramTest {
    @Test
    fun TestCase1() {
        val output = fourNumberSum(mutableListOf<Int>(7, 6, 4, -1, 1, 2), 16)
        val stringOutput = output.map { arr -> sortAndStringify(arr.toMutableList()) }
        val quadruplets = listOf<MutableList<Int>>(
            mutableListOf<Int>(7, 6, 4, -1),
            mutableListOf<Int>(7, 6, 1, 2)
        )
        assert(stringOutput.size == 2)
        for (quadruplet in quadruplets) {
            assert(stringOutput.contains(sortAndStringify(quadruplet)))
        }
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// Average: O(n^2) time | O(n^2) space
// Worst: O(n^3) time | O(n^2) space
fun fourNumberSum(array: MutableList<Int>, targetSum: Int): List<List<Int>> {
    val allPairSums = mutableMapOf<Int, MutableList<MutableList<Int>>>()
    val quadruplets = mutableListOf<MutableList<Int>>()
    for (i in 1 until array.size - 1) {
        for (j in i + 1 until array.size) {
            val currentSum = array[i] + array[j]
            val difference = targetSum - currentSum
            if (allPairSums.containsKey(difference)) {
                for (pair in allPairSums[difference]!!) {
                    val p = pair.toMutableList<Int>()
                    p.add(array[i])
                    p.add(array[j])
                    quadruplets.add(p)
                }
            }
        }
        for (k in 0 until i) {
            val currentSum = array[i] + array[k]
            if (!allPairSums.containsKey(currentSum)) {
                allPairSums[currentSum] = mutableListOf<MutableList<Int>>()
                allPairSums[currentSum]!!.add(mutableListOf<Int>(array[k], array[i]))
            } else {
                allPairSums[currentSum]!!.add(mutableListOf<Int>(array[k], array[i]))
            }
        }
    }
    return quadruplets
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.fourNumberSum as fourNumberSum

fun sortAndStringify(array: MutableList<Int>): String {
    array.sort()
    return array.joinToString(",")
}

class ProgramTest {
    @Test
    fun TestCase1() {
        val output = fourNumberSum(mutableListOf<Int>(7, 6, 4, -1, 1, 2), 16)
        val stringOutput = output.map { arr -> sortAndStringify(arr.toMutableList()) }
        val quadruplets = listOf<MutableList<Int>>(
            mutableListOf<Int>(7, 6, 4, -1),
            mutableListOf<Int>(7, 6, 1, 2)
        )
        assert(stringOutput.size == 2)
        for (quadruplet in quadruplets) {
            assert(stringOutput.contains(sortAndStringify(quadruplet)))
        }
    }
}

```
### Sandbox Code (swift)
```swift
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

class ProgramTest: TestSuite {
  let program = Program()
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var count = 2
      var target = 16
      var numbers = [7, 6, 4, -1, 1, 2]
      var quadruplets =
        [
          [7, 6, 4, -1],
          [7, 6, 1, 2],
        ]

      try testFourNumberSum(count: count, target: target, numbers: numbers, quadruplets: quadruplets)
    }
  }

  func sortAndStringify(array: [Int]) -> String {
    let stringifiedArray = array.sorted(by: { $0 < $1 }).map { "\($0)" }.reduce("") { $0 + $1 }
    return stringifiedArray
  }

  func testFourNumberSum(count: Int, target: Int, numbers: [Int], quadruplets: [[Int]]) throws {
    let output = program.fourNumberSum(array: numbers, targetSum: target)

    let outputStringified = output.map {
      array -> String in

      sortAndStringify(array: array)
    }

    try assertEqual(count, output.count)

    for quadruplet in quadruplets {
      try assert(outputStringified.contains(sortAndStringify(array: quadruplet)))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // Average: O(n^2) time | O(n^2) space
  // Worst: O(n^3) time | O(n^2) space
  func fourNumberSum(array: [Int], targetSum: Int) -> [[Int]] {
    var allPairSums = [Int: [[Int]]]()

    var quadruplets = [[Int]]()

    for i in 1 ..< array.count - 1 {
      for j in i + 1 ..< array.count {
        let currentSum = array[i] + array[j]
        let difference = targetSum - currentSum

        if allPairSums.keys.contains(difference) {
          for pair in allPairSums[difference]! {
            quadruplets.append(pair + [array[i], array[j]])
          }
        }
      }

      for k in 0 ..< i {
        let currentSum = array[k] + array[i]

        if !allPairSums.keys.contains(currentSum) {
          allPairSums[currentSum] = [[array[k], array[i]]]
        } else {
          allPairSums[currentSum]!.append([array[k], array[i]])
        }
      }
    }

    return quadruplets
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  let program = Program()
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var count = 2
      var target = 16
      var numbers = [7, 6, 4, -1, 1, 2]
      var quadruplets =
        [
          [7, 6, 4, -1],
          [7, 6, 1, 2],
        ]

      try testFourNumberSum(count: count, target: target, numbers: numbers, quadruplets: quadruplets)
    }
  }

  func sortAndStringify(array: [Int]) -> String {
    let stringifiedArray = array.sorted(by: { $0 < $1 }).map { "\($0)" }.reduce("") { $0 + $1 }
    return stringifiedArray
  }

  func testFourNumberSum(count: Int, target: Int, numbers: [Int], quadruplets: [[Int]]) throws {
    let output = program.fourNumberSum(array: numbers, targetSum: target)

    let outputStringified = output.map {
      array -> String in

      sortAndStringify(array: array)
    }

    try assertEqual(count, output.count)

    for quadruplet in quadruplets {
      try assert(outputStringified.contains(sortAndStringify(array: quadruplet)))
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


def sortAndStringify(array):
    return ",".join(sorted(list(map(lambda x: str(x), array))))


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        output = program.fourNumberSum([7, 6, 4, -1, 1, 2], 16)
        output = list(map(sortAndStringify, output))
        quadruplets = [[7, 6, 4, -1], [7, 6, 1, 2]]
        self.assertTrue(len(output) == 2)
        for quadruplet in quadruplets:
            self.assertTrue(sortAndStringify(quadruplet) in output)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Average: O(n^2) time | O(n^2) space
# Worst: O(n^3) time | O(n^2) space
def fourNumberSum(array, targetSum):
    allPairSums = {}
    quadruplets = []
    for i in range(1, len(array) - 1):
        for j in range(i + 1, len(array)):
            currentSum = array[i] + array[j]
            difference = targetSum - currentSum
            if difference in allPairSums:
                for pair in allPairSums[difference]:
                    quadruplets.append(pair + [array[i], array[j]])
        for k in range(0, i):
            currentSum = array[i] + array[k]
            if currentSum not in allPairSums:
                allPairSums[currentSum] = [[array[k], array[i]]]
            else:
                allPairSums[currentSum].append([array[k], array[i]])
    return quadruplets

```
### Unit Tests 1 (python)
```python
import program
import unittest


def sortAndStringify(array):
    return ",".join(sorted(list(map(lambda x: str(x), array))))


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        output = program.fourNumberSum([7, 6, 4, -1, 1, 2], 16)
        output = list(map(sortAndStringify, output))
        quadruplets = [[7, 6, 4, -1], [7, 6, 1, 2]]
        self.assertTrue(len(output) == 2)
        for quadruplet in quadruplets:
            self.assertTrue(sortAndStringify(quadruplet) in output)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

function sortAndStringify(array: number[]) {
  return array.sort((a, b) => a - b).join(',');
}

it('Test Case #1', function () {
  const output = program.fourNumberSum([7, 6, 4, -1, 1, 2], 16);
  const stringOutput = output.map(sortAndStringify);
  const quadruplets = [
    [7, 6, 4, -1],
    [7, 6, 1, 2],
  ];
  chai.expect(stringOutput.length === 2).to.be.true;
  for (const quadruplet of quadruplets) {
    chai.expect(stringOutput).to.include(sortAndStringify(quadruplet));
  }
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

interface Pairs {
  [key: number]: [number, number][];
}

// Average: O(n^2) time | O(n^2) space
// Worst: O(n^3) time | O(n^2) space
export function fourNumberSum(array: number[], targetSum: number) {
  const allPairSums: Pairs = {};
  const quadruplets: number[][] = [];
  for (let i = 1; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      const currentSum = array[i] + array[j];
      const difference = targetSum - currentSum;
      if (difference in allPairSums) {
        for (const pair of allPairSums[difference]) {
          quadruplets.push(pair.concat([array[i], array[j]]));
        }
      }
    }
    for (let k = 0; k < i; k++) {
      const currentSum = array[i] + array[k];
      if (!(currentSum in allPairSums)) {
        allPairSums[currentSum] = [[array[k], array[i]]];
      } else {
        allPairSums[currentSum].push([array[k], array[i]]);
      }
    }
  }
  return quadruplets;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

function sortAndStringify(array: number[]) {
  return array.sort((a, b) => a - b).join(',');
}

it('Test Case #1', function () {
  const output = program.fourNumberSum([7, 6, 4, -1, 1, 2], 16);
  const stringOutput = output.map(sortAndStringify);
  const quadruplets = [
    [7, 6, 4, -1],
    [7, 6, 1, 2],
  ];
  chai.expect(stringOutput.length === 2).to.be.true;
  for (const quadruplet of quadruplets) {
    chai.expect(stringOutput).to.include(sortAndStringify(quadruplet));
  }
});

```

