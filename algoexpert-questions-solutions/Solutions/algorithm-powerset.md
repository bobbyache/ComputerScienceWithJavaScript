# Powerset
<div class="html">
<p>
  Write a function that takes in an array of unique integers and returns its
  powerset.
</p>
<p>
  The powerset <span>P(X)</span> of a set <span>X</span> is the set of all
  subsets of <span>X</span>. For example, the powerset of <span>[1,2]</span> is
  <span>[[], [1], [2], [1,2]]</span>.
</p>
<p>
  Note that the sets in the powerset do not need to be in any particular order.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [1, 2, 3]
</pre>
<h3>Sample Output</h3>
<pre>
[[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]
</pre>
</div>

Hint 1
<p>
Try thinking about the base cases. What is the powerset of the empty set? What is the powerset of sets of length 1?
</p>


Hint 2

<p>
If you were to take the input set X and add an element to it, how would the resulting powerset change?
</p>


Hint 3

<p>
Can you solve this problem recursively? Can you solve it iteratively? What are the advantages and disadvantages of using either approach?
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

#include <algorithm>

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> output = powerset({1, 2, 3});
      for (int i = 0; i < output.size(); i++) {
        sort(output[i].begin(), output[i].end());
      }
      assert(output.size() == 8);
      vector<vector<int>>::iterator it =
          find(output.begin(), output.end(), vector<int>{});
      assert(it != output.end());
      it = find(output.begin(), output.end(), vector<int>{1});
      assert(it != output.end());
      it = find(output.begin(), output.end(), vector<int>{2});
      assert(it != output.end());
      it = find(output.begin(), output.end(), vector<int>{3});
      assert(it != output.end());
      it = find(output.begin(), output.end(), vector<int>{1, 2});
      assert(it != output.end());
      it = find(output.begin(), output.end(), vector<int>{1, 3});
      assert(it != output.end());
      it = find(output.begin(), output.end(), vector<int>{2, 3});
      assert(it != output.end());
      it = find(output.begin(), output.end(), vector<int>{1, 2, 3});
      assert(it != output.end());
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

vector<vector<int>> powersetHelper(vector<int> &array, int idx);

// O(n*2^n) time | O(n*2^n) space
vector<vector<int>> powerset(vector<int> array) {
  return powersetHelper(array, array.size() - 1);
}

vector<vector<int>> powersetHelper(vector<int> &array, int idx) {
  if (idx < 0) {
    return vector<vector<int>>{{}};
  }
  int ele = array[idx];
  vector<vector<int>> subsets = powersetHelper(array, idx - 1);
  int length = subsets.size();
  for (int i = 0; i < length; i++) {
    vector<int> currentSubset = subsets[i];
    vector<int> newSubset = currentSubset;
    newSubset.push_back(ele);
    subsets.push_back(newSubset);
  }
  return subsets;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

// O(n*2^n) time | O(n*2^n) space
vector<vector<int>> powerset(vector<int> array) {
  vector<vector<int>> subsets = {{}};
  for (int ele : array) {
    int length = subsets.size();
    for (int i = 0; i < length; i++) {
      vector<int> currentSubset = subsets[i];
      currentSubset.push_back(ele);
      subsets.push_back(currentSubset);
    }
  }
  return subsets;
}

```
### Unit Tests 1 (cpp)
```cpp
#include <algorithm>

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> output = powerset({1, 2, 3});
      for (int i = 0; i < output.size(); i++) {
        sort(output[i].begin(), output[i].end());
      }
      assert(output.size() == 8);
      vector<vector<int>>::iterator it =
          find(output.begin(), output.end(), vector<int>{});
      assert(it != output.end());
      it = find(output.begin(), output.end(), vector<int>{1});
      assert(it != output.end());
      it = find(output.begin(), output.end(), vector<int>{2});
      assert(it != output.end());
      it = find(output.begin(), output.end(), vector<int>{3});
      assert(it != output.end());
      it = find(output.begin(), output.end(), vector<int>{1, 2});
      assert(it != output.end());
      it = find(output.begin(), output.end(), vector<int>{1, 3});
      assert(it != output.end());
      it = find(output.begin(), output.end(), vector<int>{2, 3});
      assert(it != output.end());
      it = find(output.begin(), output.end(), vector<int>{1, 2, 3});
      assert(it != output.end());
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

public class ProgramTest {
	[Test]
	public void TestCase1() {
		List<List<int> > output = Program.Powerset(new List<int>(){
			1, 2, 3
		});
		Utils.AssertTrue(output.Count == 8);
		Utils.AssertTrue(Contains(output, new int[] {}));
		Utils.AssertTrue(Contains(output, new int[] {1}));
		Utils.AssertTrue(Contains(output, new int[] {2}));
		Utils.AssertTrue(Contains(output, new int[] {1, 2}));
		Utils.AssertTrue(Contains(output, new int[] {3}));
		Utils.AssertTrue(Contains(output, new int[] {1, 3}));
		Utils.AssertTrue(Contains(output, new int[] {2, 3}));
		Utils.AssertTrue(Contains(output, new int[] {1, 2, 3}));
	}

	public bool Contains(List<List<int> > arr1, int[] arr2) {
		foreach (List<int> subArr in arr1) {
			subArr.Sort();
			if (compare(subArr, arr2)) {
				return true;
			}
		}
		return false;
	}

	public bool compare(List<int> arr1, int[] arr2) {
		if (arr1.Count != arr2.Length) {
			return false;
		}
		for (int i = 0; i < arr1.Count; i++) {
			if (arr1[i] != arr2[i]) {
				return false;
			}
		}
		return true;
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n*2^n) time | O(n*2^n) space
	public static List<List<int> > Powerset(List<int> array) {
		return Powerset(array, array.Count - 1);
	}

	public static List<List<int> > Powerset(List<int> array, int idx) {
		if (idx < 0) {
			List<List<int> > emptySet = new List<List<int> >();
			emptySet.Add(new List<int>());
			return emptySet;
		}
		int ele = array[idx];
		List<List<int> > subsets = Powerset(array, idx - 1);
		int length = subsets.Count;
		for (int i = 0; i < length; i++) {
			List<int> currentSubset = new List<int>(subsets[i]);
			currentSubset.Add(ele);
			subsets.Add(currentSubset);
		}
		return subsets;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n*2^n) time | O(n*2^n) space
	public static List<List<int> > Powerset(List<int> array) {
		List<List<int> > subsets = new List<List<int> >();
		subsets.Add(new List<int>());
		foreach (int ele in array) {
			int length = subsets.Count;
			for (int i = 0; i < length; i++) {
				List<int> currentSubset = new List<int>(subsets[i]);
				currentSubset.Add(ele);
				subsets.Add(currentSubset);
			}
		}
		return subsets;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		List<List<int> > output = Program.Powerset(new List<int>(){
			1, 2, 3
		});
		Utils.AssertTrue(output.Count == 8);
		Utils.AssertTrue(Contains(output, new int[] {}));
		Utils.AssertTrue(Contains(output, new int[] {1}));
		Utils.AssertTrue(Contains(output, new int[] {2}));
		Utils.AssertTrue(Contains(output, new int[] {1, 2}));
		Utils.AssertTrue(Contains(output, new int[] {3}));
		Utils.AssertTrue(Contains(output, new int[] {1, 3}));
		Utils.AssertTrue(Contains(output, new int[] {2, 3}));
		Utils.AssertTrue(Contains(output, new int[] {1, 2, 3}));
	}

	public bool Contains(List<List<int> > arr1, int[] arr2) {
		foreach (List<int> subArr in arr1) {
			subArr.Sort();
			if (compare(subArr, arr2)) {
				return true;
			}
		}
		return false;
	}

	public bool compare(List<int> arr1, int[] arr2) {
		if (arr1.Count != arr2.Length) {
			return false;
		}
		for (int i = 0; i < arr1.Count; i++) {
			if (arr1[i] != arr2[i]) {
				return false;
			}
		}
		return true;
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
	output := Powerset([]int{1, 2, 3})
	require.Contains(t, output, []int{})
	require.Contains(t, output, []int{1})
	require.Contains(t, output, []int{2})
	require.Contains(t, output, []int{1, 2})
	require.Contains(t, output, []int{3})
	require.Contains(t, output, []int{1, 3})
	require.Contains(t, output, []int{2, 3})
	require.Contains(t, output, []int{1, 2, 3})
	require.Len(t, output, 8)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n*2^n) time | O(n*2^n) space
func Powerset(array []int) [][]int {
	return powerset(array, len(array)-1)
}

func powerset(array []int, index int) [][]int {
	if index < 0 {
		return [][]int{{}}
	}
	subsets := powerset(array, index-1)
	ele := array[index]
	length := len(subsets)
	for i := 0; i < length; i++ {
		currentSubset := subsets[i]
		newsubset := append([]int{}, currentSubset...)
		newsubset = append(newsubset, ele)
		subsets = append(subsets, newsubset)
	}
	return subsets
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n*2^n) time | O(n*2^n) space
func Powerset(array []int) [][]int {
	subsets := [][]int{{}}
	for _, ele := range array {
		length := len(subsets)
		for i := 0; i < length; i++ {
			currentSubset := subsets[i]
			newsubset := append([]int{}, currentSubset...)
			newsubset = append(newsubset, ele)
			subsets = append(subsets, newsubset)
		}
	}
	return subsets
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	output := Powerset([]int{1, 2, 3})
	require.Contains(t, output, []int{})
	require.Contains(t, output, []int{1})
	require.Contains(t, output, []int{2})
	require.Contains(t, output, []int{1, 2})
	require.Contains(t, output, []int{3})
	require.Contains(t, output, []int{1, 3})
	require.Contains(t, output, []int{2, 3})
	require.Contains(t, output, []int{1, 2, 3})
	require.Len(t, output, 8)
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
    List<List<Integer>> output = Program.powerset(new ArrayList<Integer>(Arrays.asList(1, 2, 3)));
    Utils.assertTrue(output.size() == 8);
    Utils.assertTrue(contains(output, new int[] {}));
    Utils.assertTrue(contains(output, new int[] {1}));
    Utils.assertTrue(contains(output, new int[] {2}));
    Utils.assertTrue(contains(output, new int[] {1, 2}));
    Utils.assertTrue(contains(output, new int[] {3}));
    Utils.assertTrue(contains(output, new int[] {1, 3}));
    Utils.assertTrue(contains(output, new int[] {2, 3}));
    Utils.assertTrue(contains(output, new int[] {1, 2, 3}));
  }

  public boolean contains(List<List<Integer>> arr1, int[] arr2) {
    for (List<Integer> subArr : arr1) {
      Collections.sort(subArr);
      if (compare(subArr, arr2)) {
        return true;
      }
    }
    return false;
  }

  public boolean compare(List<Integer> arr1, int[] arr2) {
    if (arr1.size() != arr2.length) {
      return false;
    }
    for (int i = 0; i < arr1.size(); i++) {
      if (arr1.get(i) != arr2[i]) {
        return false;
      }
    }
    return true;
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n*2^n) time | O(n*2^n) space
  public static List<List<Integer>> powerset(List<Integer> array) {
    return powerset(array, array.size() - 1);
  }

  public static List<List<Integer>> powerset(List<Integer> array, int idx) {
    if (idx < 0) {
      List<List<Integer>> emptySet = new ArrayList<List<Integer>>();
      emptySet.add(new ArrayList<Integer>());
      return emptySet;
    }
    int ele = array.get(idx);
    List<List<Integer>> subsets = powerset(array, idx - 1);
    int length = subsets.size();
    for (int i = 0; i < length; i++) {
      List<Integer> currentSubset = new ArrayList<Integer>(subsets.get(i));
      currentSubset.add(ele);
      subsets.add(currentSubset);
    }
    return subsets;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n*2^n) time | O(n*2^n) space
  public static List<List<Integer>> powerset(List<Integer> array) {
    List<List<Integer>> subsets = new ArrayList<List<Integer>>();
    subsets.add(new ArrayList<Integer>());
    for (Integer ele : array) {
      int length = subsets.size();
      for (int i = 0; i < length; i++) {
        List<Integer> currentSubset = new ArrayList<Integer>(subsets.get(i));
        currentSubset.add(ele);
        subsets.add(currentSubset);
      }
    }
    return subsets;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    List<List<Integer>> output = Program.powerset(new ArrayList<Integer>(Arrays.asList(1, 2, 3)));
    Utils.assertTrue(output.size() == 8);
    Utils.assertTrue(contains(output, new int[] {}));
    Utils.assertTrue(contains(output, new int[] {1}));
    Utils.assertTrue(contains(output, new int[] {2}));
    Utils.assertTrue(contains(output, new int[] {1, 2}));
    Utils.assertTrue(contains(output, new int[] {3}));
    Utils.assertTrue(contains(output, new int[] {1, 3}));
    Utils.assertTrue(contains(output, new int[] {2, 3}));
    Utils.assertTrue(contains(output, new int[] {1, 2, 3}));
  }

  public boolean contains(List<List<Integer>> arr1, int[] arr2) {
    for (List<Integer> subArr : arr1) {
      Collections.sort(subArr);
      if (compare(subArr, arr2)) {
        return true;
      }
    }
    return false;
  }

  public boolean compare(List<Integer> arr1, int[] arr2) {
    if (arr1.size() != arr2.length) {
      return false;
    }
    for (int i = 0; i < arr1.size(); i++) {
      if (arr1.get(i) != arr2[i]) {
        return false;
      }
    }
    return true;
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
  const output = program.powerset([1, 2, 3]).map(sortAndStringify);
  chai.expect(output.length === 8).to.be.true;
  chai.expect(output).to.include('');
  chai.expect(output).to.include('1');
  chai.expect(output).to.include('2');
  chai.expect(output).to.include('1,2');
  chai.expect(output).to.include('3');
  chai.expect(output).to.include('1,3');
  chai.expect(output).to.include('2,3');
  chai.expect(output).to.include('1,2,3');
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n*2^n) time | O(n*2^n) space
function powerset(array, idx = null) {
  if (idx === null) {
    idx = array.length - 1;
  }
  if (idx < 0) {
    return [[]];
  }
  const ele = array[idx];
  const subsets = powerset(array, idx - 1);
  const length = subsets.length;
  for (let i = 0; i < length; i++) {
    const currentSubset = subsets[i];
    subsets.push(currentSubset.concat(ele));
  }
  return subsets;
}

exports.powerset = powerset;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n*2^n) time | O(n*2^n) space
function powerset(array) {
  const subsets = [[]];
  for (const ele of array) {
    const length = subsets.length;
    for (let i = 0; i < length; i++) {
      const currentSubset = subsets[i];
      subsets.push(currentSubset.concat(ele));
    }
  }
  return subsets;
}

exports.powerset = powerset;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

function sortAndStringify(array) {
  return array.sort((a, b) => a - b).join(',');
}

it('Test Case #1', function () {
  const output = program.powerset([1, 2, 3]).map(sortAndStringify);
  chai.expect(output.length === 8).to.be.true;
  chai.expect(output).to.include('');
  chai.expect(output).to.include('1');
  chai.expect(output).to.include('2');
  chai.expect(output).to.include('1,2');
  chai.expect(output).to.include('3');
  chai.expect(output).to.include('1,3');
  chai.expect(output).to.include('2,3');
  chai.expect(output).to.include('1,2,3');
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.powerset

class ProgramTest {
    @Test
    fun TestCase1() {
        val output = powerset(listOf(1, 2, 3))
        assert(output.size == 8)
        assert(output.contains(listOf<Int>()))
        assert(output.contains(listOf<Int>(1)))
        assert(output.contains(listOf<Int>(2)))
        assert(output.contains(listOf<Int>(3)))
        assert(output.contains(listOf<Int>(1, 2)))
        assert(output.contains(listOf<Int>(1, 3)))
        assert(output.contains(listOf<Int>(2, 3)))
        assert(output.contains(listOf<Int>(1, 2, 3)))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n*2^n) time | O(n*2^n) space
fun powerset(array: List<Int>): List<List<Int>> {
    return powerset(array, array.size - 1)
}

fun powerset(array: List<Int>, idx: Int): MutableList<List<Int>> {
    if (idx < 0) {
        val emptySet = listOf<Int>()
        return mutableListOf(emptySet)
    }
    val ele = array[idx]
    val subsets = powerset(array, idx - 1)
    val length = subsets.size
    for (i in 0 until length) {
        val currentSubset = subsets[i].toMutableList()
        currentSubset.add(ele)
        subsets.add(currentSubset)
    }
    return subsets
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n*2^n) time | O(n*2^n) space
fun powerset(array: List<Int>): List<List<Int>> {
    val subsets = mutableListOf(listOf<Int>())
    for (ele in array) {
        val length = subsets.size
        for (i in 0 until length) {
            val currentSubset = subsets[i].toMutableList()
            currentSubset.add(ele)
            subsets.add(currentSubset)
        }
    }
    return subsets
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.powerset

class ProgramTest {
    @Test
    fun TestCase1() {
        val output = powerset(listOf(1, 2, 3))
        assert(output.size == 8)
        assert(output.contains(listOf<Int>()))
        assert(output.contains(listOf<Int>(1)))
        assert(output.contains(listOf<Int>(2)))
        assert(output.contains(listOf<Int>(3)))
        assert(output.contains(listOf<Int>(1, 2)))
        assert(output.contains(listOf<Int>(1, 3)))
        assert(output.contains(listOf<Int>(2, 3)))
        assert(output.contains(listOf<Int>(1, 2, 3)))
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
      var fourthTest = program.powerset(array: [1, 2, 3])
      var fourthTestStringified = sortAndStringify(array: fourthTest)
      try assertEqual(8, fourthTestStringified.count)
      try assert(fourthTestStringified.contains(""))
      try assert(fourthTestStringified.contains("1"))
      try assert(fourthTestStringified.contains("2"))
      try assert(fourthTestStringified.contains("1, 2"))
      try assert(fourthTestStringified.contains("3"))
      try assert(fourthTestStringified.contains("1, 3"))
      try assert(fourthTestStringified.contains("2, 3"))
      try assert(fourthTestStringified.contains("1, 2, 3"))
    }
  }

  func sortAndStringify(array: [[Int]]) -> [String] {
    var result = [String]()

    for var set in array {
      set = set.sorted()

      var string = String()

      for item in set {
        string.append("\(item)")

        if item != set.last {
          string.append(", ")
        }
      }

      result.append(string)
    }

    return result
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n * 2^n) time | O(n * 2^n) space
  func powerset(array: [Int], index: Int? = nil) -> [[Int]] {
    var index = index

    if index == nil {
      index = array.count - 1
    }

    if index! < 0 {
      return [[]]
    }

    let element = array[index!]
    var subsets = powerset(array: array, index: index! - 1)
    let length = subsets.count

    for i in 0 ..< length {
      let currentSubset = subsets[i]
      subsets.append(currentSubset + [element])
    }

    return subsets
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n * 2^n) time | O(n * 2^n) space
  func powerset(array: [Int]) -> [[Int]] {
    var subsets: [[Int]] = [[]]

    for element in array {
      for subset in subsets {
        subsets.append(subset + [element])
      }
    }
    return subsets
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      var fourthTest = program.powerset(array: [1, 2, 3])
      var fourthTestStringified = sortAndStringify(array: fourthTest)
      try assertEqual(8, fourthTestStringified.count)
      try assert(fourthTestStringified.contains(""))
      try assert(fourthTestStringified.contains("1"))
      try assert(fourthTestStringified.contains("2"))
      try assert(fourthTestStringified.contains("1, 2"))
      try assert(fourthTestStringified.contains("3"))
      try assert(fourthTestStringified.contains("1, 3"))
      try assert(fourthTestStringified.contains("2, 3"))
      try assert(fourthTestStringified.contains("1, 2, 3"))
    }
  }

  func sortAndStringify(array: [[Int]]) -> [String] {
    var result = [String]()

    for var set in array {
      set = set.sorted()

      var string = String()

      for item in set {
        string.append("\(item)")

        if item != set.last {
          string.append(", ")
        }
      }

      result.append(string)
    }

    return result
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
        output = list(map(lambda x: set(x), program.powerset([1, 2, 3])))
        self.assertTrue(len(output) == 8)
        self.assertTrue(set([]) in output)
        self.assertTrue(set([1]) in output)
        self.assertTrue(set([2]) in output)
        self.assertTrue(set([1, 2]) in output)
        self.assertTrue(set([3]) in output)
        self.assertTrue(set([1, 3]) in output)
        self.assertTrue(set([2, 3]) in output)
        self.assertTrue(set([1, 2, 3]) in output)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n*2^n) time | O(n*2^n) space
def powerset(array, idx=None):
    if idx is None:
        idx = len(array) - 1
    if idx < 0:
        return [[]]
    ele = array[idx]
    subsets = powerset(array, idx - 1)
    for i in range(len(subsets)):
        currentSubset = subsets[i]
        subsets.append(currentSubset + [ele])
    return subsets

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n*2^n) time | O(n*2^n) space
def powerset(array):
    subsets = [[]]
    for ele in array:
        for i in range(len(subsets)):
            currentSubset = subsets[i]
            subsets.append(currentSubset + [ele])
    return subsets

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        output = list(map(lambda x: set(x), program.powerset([1, 2, 3])))
        self.assertTrue(len(output) == 8)
        self.assertTrue(set([]) in output)
        self.assertTrue(set([1]) in output)
        self.assertTrue(set([2]) in output)
        self.assertTrue(set([1, 2]) in output)
        self.assertTrue(set([3]) in output)
        self.assertTrue(set([1, 3]) in output)
        self.assertTrue(set([2, 3]) in output)
        self.assertTrue(set([1, 2, 3]) in output)

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
  const output = program.powerset([1, 2, 3]).map(sortAndStringify);
  chai.expect(output.length === 8).to.be.true;
  chai.expect(output).to.include('');
  chai.expect(output).to.include('1');
  chai.expect(output).to.include('2');
  chai.expect(output).to.include('1,2');
  chai.expect(output).to.include('3');
  chai.expect(output).to.include('1,3');
  chai.expect(output).to.include('2,3');
  chai.expect(output).to.include('1,2,3');
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n*2^n) time | O(n*2^n) space
export function powerset(array: number[], idx: number | null = null): number[][] {
  if (idx === null) {
    idx = array.length - 1;
  }
  if (idx < 0) {
    return [[]];
  }
  const ele = array[idx];
  const subsets = powerset(array, idx - 1);
  const length = subsets.length;
  for (let i = 0; i < length; i++) {
    const currentSubset = subsets[i];
    subsets.push(currentSubset.concat(ele));
  }
  return subsets;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n*2^n) time | O(n*2^n) space
export function powerset(array: number[]) {
  const subsets: number[][] = [[]];
  for (const ele of array) {
    const length = subsets.length;
    for (let i = 0; i < length; i++) {
      const currentSubset = subsets[i];
      subsets.push(currentSubset.concat(ele));
    }
  }
  return subsets;
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
  const output = program.powerset([1, 2, 3]).map(sortAndStringify);
  chai.expect(output.length === 8).to.be.true;
  chai.expect(output).to.include('');
  chai.expect(output).to.include('1');
  chai.expect(output).to.include('2');
  chai.expect(output).to.include('1,2');
  chai.expect(output).to.include('3');
  chai.expect(output).to.include('1,3');
  chai.expect(output).to.include('2,3');
  chai.expect(output).to.include('1,2,3');
});

```

