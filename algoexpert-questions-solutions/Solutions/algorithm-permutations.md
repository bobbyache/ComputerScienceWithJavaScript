# Permutations
<div class="html">
<p>
  Write a function that takes in an array of unique integers and returns an
  array of all permutations of those integers in no particular order.
</p>
<p>If the input array is empty, the function should return an empty array.</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [1, 2, 3]
</pre>
<h3>Sample Output</h3>
<pre>
[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
</pre>
</div>

Hint 1
<p>
A permutation is defined as a way in which a set of things can be ordered. Thus, for the list [1, 2, 3], there exist some permutations starting with 1, some starting with 2, and some starting with 3. For the permutations starting with 1, there will be a permutation where 2 is the second number and one where 3 is the second number. For permutations starting with 3, there will be a permutation where 1 is the second number and one where 2 is the second number. The idea is that, in order to construct a permutation, we can pick a random number from our list to be the first number, then we can pick a random number from the remaining list (without the first number) to be the second number, then we can pick a random number from the remaining list (without the first and second numbers) to be the third number, and we can repeat the process until we exhaust all of our list of numbers. At that point, we will have constructed a valid permutation. How can we implement this construction algorithmically, without picking numbers at random?
</p>


Hint 2

<p>
Iterate through the list of numbers, and begin constructing new permutations starting with each number. For each permutation that you've begun constructing, remove the number already used (the first number of each permutation) from the list of numbers - you'll likely have to make copies of the original list. Repeat this process by recursively iterating through the mutated lists of numbers, appending numbers to the corresponding permutations you've already begun constructing and then removing those numbers from the respective mutated lists; repeat this until your mutated lists are empty, at which point your constructed permutations will be as big as the original list and will be valid permutations.
</p>


Hint 3

<p>
Do you have to create so many mutated lists of numbers? Can you come up with an alternative approach that would allow you to only rely on the original list of numbers, without ever copying it and without removing numbers from it?
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

bool contains(vector<vector<int>> array1, vector<int> array2) {
  for (vector<int> subArray : array1) {
    if (array2 == subArray) {
      return true;
    }
  }
  return false;
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> perms = getPermutations({1, 2, 3});
      assert(perms.size() == 6);
      assert(contains(perms, {1, 2, 3}));
      assert(contains(perms, {1, 3, 2}));
      assert(contains(perms, {2, 1, 3}));
      assert(contains(perms, {2, 3, 1}));
      assert(contains(perms, {3, 1, 2}));
      assert(contains(perms, {3, 2, 1}));
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

void permutationsHelper(vector<int> array, vector<int> currentPermutation,
                        vector<vector<int>> *permutations);

// Upper Bound: O(n^2*n!) time | O(n*n!) space
// Roughly: O(n*n!) time | O(n*n!) space
vector<vector<int>> getPermutations(vector<int> array) {
  vector<vector<int>> permutations;
  permutationsHelper(array, {}, &permutations);
  return permutations;
}

void permutationsHelper(vector<int> array, vector<int> currentPermutation,
                        vector<vector<int>> *permutations) {
  if (array.size() == 0 && currentPermutation.size() > 0) {
    permutations->push_back(currentPermutation);
  } else {
    for (int i = 0; i < array.size(); i++) {
      vector<int> newArray;
      newArray.insert(newArray.end(), array.begin(), array.begin() + i);
      newArray.insert(newArray.end(), array.begin() + i + 1, array.end());
      vector<int> newPermutation = currentPermutation;
      newPermutation.push_back(array[i]);
      permutationsHelper(newArray, newPermutation, permutations);
    }
  }
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

void permutationsHelper(int i, vector<int> &array,
                        vector<vector<int>> &permutations);

// O(n*n!) time | O(n*n!) space
vector<vector<int>> getPermutations(vector<int> array) {
  vector<vector<int>> permutations;
  permutationsHelper(0, array, permutations);
  return permutations;
}

void permutationsHelper(int i, vector<int> &array,
                        vector<vector<int>> &permutations) {
  if (i == array.size() - 1) {
    permutations.push_back(array);
  } else {
    for (int j = i; j < array.size(); j++) {
      swap(array[i], array[j]);
      permutationsHelper(i + 1, array, permutations);
      swap(array[i], array[j]);
    }
  }
}

```
### Unit Tests 1 (cpp)
```cpp
bool contains(vector<vector<int>> array1, vector<int> array2) {
  for (vector<int> subArray : array1) {
    if (array2 == subArray) {
      return true;
    }
  }
  return false;
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> perms = getPermutations({1, 2, 3});
      assert(perms.size() == 6);
      assert(contains(perms, {1, 2, 3}));
      assert(contains(perms, {1, 3, 2}));
      assert(contains(perms, {2, 1, 3}));
      assert(contains(perms, {2, 3, 1}));
      assert(contains(perms, {3, 1, 2}));
      assert(contains(perms, {3, 2, 1}));
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
	[Test]
	public void TestCase1() {
		List<int> input = new List<int>(){
			1, 2, 3
		};
		List<List<int> > perms = Program.GetPermutations(input);
		Utils.AssertTrue(perms.Count == 6);
		Utils.AssertTrue(Contains(perms, new List<int>(){
			1, 2, 3
		}));
		Utils.AssertTrue(Contains(perms, new List<int>(){
			1, 3, 2
		}));
		Utils.AssertTrue(Contains(perms, new List<int>(){
			2, 1, 3
		}));
		Utils.AssertTrue(Contains(perms, new List<int>(){
			2, 3, 1
		}));
		Utils.AssertTrue(Contains(perms, new List<int>(){
			3, 1, 2
		}));
		Utils.AssertTrue(Contains(perms, new List<int>(){
			3, 2, 1
		}));
	}

	public bool Contains(List<List<int> > arr1, List<int> arr2) {
		foreach (List<int> subArray in arr1) {
			if (subArray.SequenceEqual(arr2)) {
				return true;
			}
		}
		return false;
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;

public class Program {
	// Upper Bound: O(n^2*n!) time | O(n*n!) space
	// Roughly: O(n*n!) time | O(n*n!) space
	public static List<List<int> > GetPermutations(List<int> array) {
		List<List<int> > permutations = new List<List<int> >();
		GetPermutations(array, new List<int>(), permutations);
		return permutations;
	}

	public static void GetPermutations(List<int> array, List<int> currentPermutation,
	  List<List<int> > permutations) {
		if (array.Count == 0 && currentPermutation.Count > 0) {
			permutations.Add(currentPermutation);
		} else {
			for (int i = 0; i < array.Count; i++) {
				List<int> newArray = new List<int>(array);
				newArray.RemoveAt(i);
				List<int> newPermutation = new List<int>(currentPermutation);
				newPermutation.Add(array[i]);
				GetPermutations(newArray, newPermutation, permutations);
			}
		}
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n*n!) time | O(n*n!) space
	public static List<List<int> > GetPermutations(List<int> array) {
		List<List<int> > permutations = new List<List<int> >();
		GetPermutations(0, array, permutations);
		return permutations;
	}

	public static void GetPermutations(int i, List<int> array, List<List<int> > permutations) {
		if (i == array.Count - 1) {
			permutations.Add(new List<int>(array));
		} else {
			for (int j = i; j < array.Count; j++) {
				swap(array, i, j);
				GetPermutations(i + 1, array, permutations);
				swap(array, i, j);
			}
		}
	}

	public static void swap(List<int> array, int i, int j) {
		int tmp = array[i];
		array[i] =  array[j];
		array[j] =  tmp;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;
using System.Linq;
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		List<int> input = new List<int>(){
			1, 2, 3
		};
		List<List<int> > perms = Program.GetPermutations(input);
		Utils.AssertTrue(perms.Count == 6);
		Utils.AssertTrue(Contains(perms, new List<int>(){
			1, 2, 3
		}));
		Utils.AssertTrue(Contains(perms, new List<int>(){
			1, 3, 2
		}));
		Utils.AssertTrue(Contains(perms, new List<int>(){
			2, 1, 3
		}));
		Utils.AssertTrue(Contains(perms, new List<int>(){
			2, 3, 1
		}));
		Utils.AssertTrue(Contains(perms, new List<int>(){
			3, 1, 2
		}));
		Utils.AssertTrue(Contains(perms, new List<int>(){
			3, 2, 1
		}));
	}

	public bool Contains(List<List<int> > arr1, List<int> arr2) {
		foreach (List<int> subArray in arr1) {
			if (subArray.SequenceEqual(arr2)) {
				return true;
			}
		}
		return false;
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
	output := GetPermutations([]int{1, 2, 3})
	require.Contains(t, output, []int{1, 2, 3})
	require.Contains(t, output, []int{1, 3, 2})
	require.Contains(t, output, []int{2, 1, 3})
	require.Contains(t, output, []int{2, 3, 1})
	require.Contains(t, output, []int{3, 1, 2})
	require.Contains(t, output, []int{3, 2, 1})
	require.Len(t, output, 6)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// Upper Bound: O(n^2*n!) time | O(n*n!) space
// Roughly: O(n*n!) time | O(n*n!) space
func GetPermutations(array []int) [][]int {
	permutations := [][]int{}
	permutationsHelper(array, []int{}, &permutations)
	return permutations
}

func permutationsHelper(array []int, currentPermutation []int, permutations *[][]int) {
	if len(array) == 0 && len(currentPermutation) != 0 {
		*permutations = append(*permutations, currentPermutation)
		return
	}
	for i := range array {
		newArray := make([]int, i)
		copy(newArray, array[:i])
		newArray = append(newArray, array[i+1:]...)
		newPermutation := make([]int, len(currentPermutation))
		copy(newPermutation, currentPermutation)
		newPermutation = append(newPermutation, array[i])
		permutationsHelper(newArray, newPermutation, permutations)
	}
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n*n!) time | O(n*n!) space
func GetPermutations(array []int) [][]int {
	permutations := [][]int{}
	permutationsHelper(0, array, &permutations)
	return permutations
}

func permutationsHelper(i int, array []int, permutations *[][]int) {
	if i == len(array)-1 {
		newPerm := make([]int, len(array))
		copy(newPerm, array)
		*permutations = append(*permutations, newPerm)
		return
	}
	for j := i; j < len(array); j++ {
		swap(array, i, j)
		permutationsHelper(i+1, array, permutations)
		swap(array, i, j)
	}
}

func swap(array []int, i, j int) {
	array[i], array[j] = array[j], array[i]
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	output := GetPermutations([]int{1, 2, 3})
	require.Contains(t, output, []int{1, 2, 3})
	require.Contains(t, output, []int{1, 3, 2})
	require.Contains(t, output, []int{2, 1, 3})
	require.Contains(t, output, []int{2, 3, 1})
	require.Contains(t, output, []int{3, 1, 2})
	require.Contains(t, output, []int{3, 2, 1})
	require.Len(t, output, 6)
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
    List<Integer> input = new ArrayList<Integer>(Arrays.asList(1, 2, 3));
    List<List<Integer>> perms = Program.getPermutations(input);
    Utils.assertTrue(perms.size() == 6);
    Utils.assertTrue(contains(perms, new ArrayList<Integer>(Arrays.asList(1, 2, 3))));
    Utils.assertTrue(contains(perms, new ArrayList<Integer>(Arrays.asList(1, 3, 2))));
    Utils.assertTrue(contains(perms, new ArrayList<Integer>(Arrays.asList(2, 1, 3))));
    Utils.assertTrue(contains(perms, new ArrayList<Integer>(Arrays.asList(2, 3, 1))));
    Utils.assertTrue(contains(perms, new ArrayList<Integer>(Arrays.asList(3, 1, 2))));
    Utils.assertTrue(contains(perms, new ArrayList<Integer>(Arrays.asList(3, 2, 1))));
  }

  public boolean contains(List<List<Integer>> arr1, List<Integer> arr2) {
    for (List<Integer> subArray : arr1) {
      if (subArray.equals(arr2)) {
        return true;
      }
    }
    return false;
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // Upper Bound: O(n^2*n!) time | O(n*n!) space
  // Roughly: O(n*n!) time | O(n*n!) space
  public static List<List<Integer>> getPermutations(List<Integer> array) {
    List<List<Integer>> permutations = new ArrayList<List<Integer>>();
    getPermutations(array, new ArrayList<Integer>(), permutations);
    return permutations;
  }

  public static void getPermutations(
      List<Integer> array, List<Integer> currentPermutation, List<List<Integer>> permutations) {
    if (array.size() == 0 && currentPermutation.size() > 0) {
      permutations.add(currentPermutation);
    } else {
      for (int i = 0; i < array.size(); i++) {
        List<Integer> newArray = new ArrayList<Integer>(array);
        newArray.remove(i);
        List<Integer> newPermutation = new ArrayList<Integer>(currentPermutation);
        newPermutation.add(array.get(i));
        getPermutations(newArray, newPermutation, permutations);
      }
    }
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n*n!) time | O(n*n!) space
  public static List<List<Integer>> getPermutations(List<Integer> array) {
    List<List<Integer>> permutations = new ArrayList<List<Integer>>();
    getPermutations(0, array, permutations);
    return permutations;
  }

  public static void getPermutations(int i, List<Integer> array, List<List<Integer>> permutations) {
    if (i == array.size() - 1) {
      permutations.add(new ArrayList<Integer>(array));
    } else {
      for (int j = i; j < array.size(); j++) {
        swap(array, i, j);
        getPermutations(i + 1, array, permutations);
        swap(array, i, j);
      }
    }
  }

  public static void swap(List<Integer> array, int i, int j) {
    Integer tmp = array.get(i);
    array.set(i, array.get(j));
    array.set(j, tmp);
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    List<Integer> input = new ArrayList<Integer>(Arrays.asList(1, 2, 3));
    List<List<Integer>> perms = Program.getPermutations(input);
    Utils.assertTrue(perms.size() == 6);
    Utils.assertTrue(contains(perms, new ArrayList<Integer>(Arrays.asList(1, 2, 3))));
    Utils.assertTrue(contains(perms, new ArrayList<Integer>(Arrays.asList(1, 3, 2))));
    Utils.assertTrue(contains(perms, new ArrayList<Integer>(Arrays.asList(2, 1, 3))));
    Utils.assertTrue(contains(perms, new ArrayList<Integer>(Arrays.asList(2, 3, 1))));
    Utils.assertTrue(contains(perms, new ArrayList<Integer>(Arrays.asList(3, 1, 2))));
    Utils.assertTrue(contains(perms, new ArrayList<Integer>(Arrays.asList(3, 2, 1))));
  }

  public boolean contains(List<List<Integer>> arr1, List<Integer> arr2) {
    for (List<Integer> subArray : arr1) {
      if (subArray.equals(arr2)) {
        return true;
      }
    }
    return false;
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
  const perms = program.getPermutations([1, 2, 3]);
  chai.expect(perms.length).to.deep.equal(6);
  chai.expect(perms).to.deep.include([1, 2, 3]);
  chai.expect(perms).to.deep.include([1, 3, 2]);
  chai.expect(perms).to.deep.include([2, 1, 3]);
  chai.expect(perms).to.deep.include([2, 3, 1]);
  chai.expect(perms).to.deep.include([3, 1, 2]);
  chai.expect(perms).to.deep.include([3, 2, 1]);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Upper Bound: O(n^2*n!) time | O(n*n!) space
// Roughly: O(n*n!) time | O(n*n!) space
function getPermutations(array) {
  const permutations = [];
  permutationsHelper(array, [], permutations);
  return permutations;
}

function permutationsHelper(array, currentPermutation, permutations) {
  if (!array.length && currentPermutation.length) {
    permutations.push(currentPermutation);
  } else {
    for (let i = 0; i < array.length; i++) {
      const newArray = array.slice(0, i).concat(array.slice(i + 1));
      const newPermutation = currentPermutation.concat([array[i]]);
      permutationsHelper(newArray, newPermutation, permutations);
    }
  }
}

exports.getPermutations = getPermutations;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n*n!) time | O(n*n!) space
function getPermutations(array) {
  const permutations = [];
  permutationsHelper(0, array, permutations);
  return permutations;
}

function permutationsHelper(i, array, permutations) {
  if (i === array.length - 1) {
    permutations.push(array.slice());
  } else {
    for (let j = i; j < array.length; j++) {
      swap(i, j, array);
      permutationsHelper(i + 1, array, permutations);
      swap(i, j, array);
    }
  }
}

function swap(i, j, array) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

exports.getPermutations = getPermutations;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const perms = program.getPermutations([1, 2, 3]);
  chai.expect(perms.length).to.deep.equal(6);
  chai.expect(perms).to.deep.include([1, 2, 3]);
  chai.expect(perms).to.deep.include([1, 3, 2]);
  chai.expect(perms).to.deep.include([2, 1, 3]);
  chai.expect(perms).to.deep.include([2, 3, 1]);
  chai.expect(perms).to.deep.include([3, 1, 2]);
  chai.expect(perms).to.deep.include([3, 2, 1]);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.getPermutations

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(1, 2, 3)
        val output = getPermutations(input)
        assert(output.size == 6)
        assert(output.contains(listOf(1, 2, 3)))
        assert(output.contains(listOf(1, 3, 2)))
        assert(output.contains(listOf(2, 1, 3)))
        assert(output.contains(listOf(2, 3, 1)))
        assert(output.contains(listOf(3, 1, 2)))
        assert(output.contains(listOf(3, 2, 1)))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// Upper Bound: O(n^2*n!) time | O(n*n!) space
// Roughly: O(n*n!) time | O(n*n!) space
fun getPermutations(array: List<Int>): List<List<Int>> {
    val permutations = mutableListOf<List<Int>>()
    getPermutations(array, listOf<Int>(), permutations)
    return permutations
}

fun getPermutations(array: List<Int>, currentPermutation: List<Int>, permutations: MutableList<List<Int>>) {
    if (array.size == 0 && currentPermutation.size > 0) {
        permutations.add(currentPermutation)
        return
    }

    for (el in array) {
        val newArray = array.toMutableList()
        newArray.remove(el)
        val newPermutation = currentPermutation.toMutableList()
        newPermutation.add(el)
        getPermutations(newArray, newPermutation, permutations)
    }
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// Upper Bound: O(n^2*n!) time | O(n*n!) space
// Roughly: O(n*n!) time | O(n*n!) space
fun getPermutations(array: List<Int>): List<List<Int>> {
    val permutations = mutableListOf<List<Int>>()
    getPermutations(0, array.toMutableList(), permutations)
    return permutations
}

fun getPermutations(i: Int, array: MutableList<Int>, permutations: MutableList<List<Int>>) {
    if (i == array.size - 1) {
        permutations.add(array.toList())
        return
    }
    for (j in i until array.size) {
        swap(array, i, j)
        getPermutations(i + 1, array, permutations)
        swap(array, i, j)
    }
}

fun swap(array: MutableList<Int>, i: Int, j: Int) {
    val tmp = array[i]
    array[i] = array[j]
    array[j] = tmp
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.getPermutations

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(1, 2, 3)
        val output = getPermutations(input)
        assert(output.size == 6)
        assert(output.contains(listOf(1, 2, 3)))
        assert(output.contains(listOf(1, 3, 2)))
        assert(output.contains(listOf(2, 1, 3)))
        assert(output.contains(listOf(2, 3, 1)))
        assert(output.contains(listOf(3, 1, 2)))
        assert(output.contains(listOf(3, 2, 1)))
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
      var fourthTest: [Int] = [1, 2, 3]
      var fourthTestResults = program.permutations(array: &fourthTest)
      try assertEqual(6, fourthTestResults.count)
      try assert(fourthTestResults.contains([1, 2, 3]))
      try assert(fourthTestResults.contains([1, 3, 2]))
      try assert(fourthTestResults.contains([2, 1, 3]))
      try assert(fourthTestResults.contains([2, 3, 1]))
      try assert(fourthTestResults.contains([3, 1, 2]))
      try assert(fourthTestResults.contains([3, 2, 1]))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // Upper Bound: O(n^2 * n!) time | O(n * n!) space
  // Roughly: O(n * n!) time | O(n * n!) space
  func permutations(array: inout [Int]) -> [[Int]] {
    var permutations = [[Int]]()
    permutationsHelper(array: array, currentPermutation: [], permutations: &permutations)

    return permutations
  }

  func permutationsHelper(array: [Int], currentPermutation: [Int], permutations: inout [[Int]]) {
    if array.count == 0, currentPermutation.count > 0 {
      permutations.append(currentPermutation)
    } else {
      for i in 0 ..< array.count {
        let newArray = Array(array.prefix(upTo: i) + array.suffix(from: i + 1))
        let newPermutation = currentPermutation + [array[i]]

        permutationsHelper(array: newArray, currentPermutation: newPermutation, permutations: &permutations)
      }
    }
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n * n!) time | O(n * n!) space
  func permutations(array: inout [Int]) -> [[Int]] {
    var permutations = [[Int]]()
    permutationsHelper(firstIndex: 0, array: &array, permutations: &permutations)

    return permutations
  }

  func permutationsHelper(firstIndex: Int, array: inout [Int], permutations: inout [[Int]]) {
    if firstIndex == array.count - 1 {
      permutations.append(array)
    } else {
      for secondIndex in firstIndex ..< array.count {
        swap(firstIndex: firstIndex, secondIndex: secondIndex, array: &array)
        permutationsHelper(firstIndex: firstIndex + 1, array: &array, permutations: &permutations)
        swap(firstIndex: firstIndex, secondIndex: secondIndex, array: &array)
      }
    }
  }

  func swap(firstIndex: Int, secondIndex: Int, array: inout [Int]) {
    let temp = array[firstIndex]
    array[firstIndex] = array[secondIndex]
    array[secondIndex] = temp
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      var fourthTest: [Int] = [1, 2, 3]
      var fourthTestResults = program.permutations(array: &fourthTest)
      try assertEqual(6, fourthTestResults.count)
      try assert(fourthTestResults.contains([1, 2, 3]))
      try assert(fourthTestResults.contains([1, 3, 2]))
      try assert(fourthTestResults.contains([2, 1, 3]))
      try assert(fourthTestResults.contains([2, 3, 1]))
      try assert(fourthTestResults.contains([3, 1, 2]))
      try assert(fourthTestResults.contains([3, 2, 1]))
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
        perms = program.getPermutations([1, 2, 3])
        self.assertTrue(len(perms) == 6)
        self.assertTrue([1, 2, 3] in perms)
        self.assertTrue([1, 3, 2] in perms)
        self.assertTrue([2, 1, 3] in perms)
        self.assertTrue([2, 3, 1] in perms)
        self.assertTrue([3, 1, 2] in perms)
        self.assertTrue([3, 2, 1] in perms)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Upper Bound: O(n^2*n!) time | O(n*n!) space
# Roughly: O(n*n!) time | O(n*n!) space
def getPermutations(array):
    permutations = []
    permutationsHelper(array, [], permutations)
    return permutations


def permutationsHelper(array, currentPermutation, permutations):
    if not len(array) and len(currentPermutation):
        permutations.append(currentPermutation)
    else:
        for i in range(len(array)):
            newArray = array[:i] + array[i + 1 :]
            newPermutation = currentPermutation + [array[i]]
            permutationsHelper(newArray, newPermutation, permutations)

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n*n!) time | O(n*n!) space
def getPermutations(array):
    permutations = []
    permutationsHelper(0, array, permutations)
    return permutations


def permutationsHelper(i, array, permutations):
    if i == len(array) - 1:
        permutations.append(array[:])
    else:
        for j in range(i, len(array)):
            swap(array, i, j)
            permutationsHelper(i + 1, array, permutations)
            swap(array, i, j)


def swap(array, i, j):
    array[i], array[j] = array[j], array[i]

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        perms = program.getPermutations([1, 2, 3])
        self.assertTrue(len(perms) == 6)
        self.assertTrue([1, 2, 3] in perms)
        self.assertTrue([1, 3, 2] in perms)
        self.assertTrue([2, 1, 3] in perms)
        self.assertTrue([2, 3, 1] in perms)
        self.assertTrue([3, 1, 2] in perms)
        self.assertTrue([3, 2, 1] in perms)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #4', function () {
  const perms = program.getPermutations([1, 2, 3]);
  chai.expect(perms.length).to.deep.equal(6);
  chai.expect(perms).to.deep.include([1, 2, 3]);
  chai.expect(perms).to.deep.include([1, 3, 2]);
  chai.expect(perms).to.deep.include([2, 1, 3]);
  chai.expect(perms).to.deep.include([2, 3, 1]);
  chai.expect(perms).to.deep.include([3, 1, 2]);
  chai.expect(perms).to.deep.include([3, 2, 1]);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Upper Bound: O(n^2*n!) time | O(n*n!) space
// Roughly: O(n*n!) time | O(n*n!) space
export function getPermutations(array: number[]) {
  const permutations: number[][] = [];
  permutationsHelper(array, [], permutations);
  return permutations;
}

function permutationsHelper(array: number[], currentPermutation: number[], permutations: number[][]) {
  if (!array.length && currentPermutation.length) {
    permutations.push(currentPermutation);
  } else {
    for (let i = 0; i < array.length; i++) {
      const newArray = array.slice(0, i).concat(array.slice(i + 1));
      const newPermutation = currentPermutation.concat([array[i]]);
      permutationsHelper(newArray, newPermutation, permutations);
    }
  }
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n*n!) time | O(n*n!) space
export function getPermutations(array: number[]) {
  const permutations: number[][] = [];
  permutationsHelper(0, array, permutations);
  return permutations;
}

function permutationsHelper(i: number, array: number[], permutations: number[][]) {
  if (i === array.length - 1) {
    permutations.push(array.slice());
  } else {
    for (let j = i; j < array.length; j++) {
      swap(i, j, array);
      permutationsHelper(i + 1, array, permutations);
      swap(i, j, array);
    }
  }
}

function swap(i: number, j: number, array: number[]) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #4', function () {
  const perms = program.getPermutations([1, 2, 3]);
  chai.expect(perms.length).to.deep.equal(6);
  chai.expect(perms).to.deep.include([1, 2, 3]);
  chai.expect(perms).to.deep.include([1, 3, 2]);
  chai.expect(perms).to.deep.include([2, 1, 3]);
  chai.expect(perms).to.deep.include([2, 3, 1]);
  chai.expect(perms).to.deep.include([3, 1, 2]);
  chai.expect(perms).to.deep.include([3, 2, 1]);
});

```

