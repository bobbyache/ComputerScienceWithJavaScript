# Same BSTs
<div class="html">
<p>
  An array of integers is said to represent the Binary Search Tree (BST)
  obtained by inserting each integer in the array, from left to right, into the
  BST.
</p>
<p>
  Write a function that takes in two arrays of integers and determines whether
  these arrays represent the same BST. Note that you're <i>not</i> allowed to
  construct any BSTs in your code.
</p>
<p>
  A BST is a Binary Tree that consists only of <span>BST</span> nodes. A node is said to be a
  valid <span>BST</span> node if and only if it satisfies the BST property: its value is
  strictly greater than the values of every node to its left; its value is less
  than or equal to the values of every node to its right; and its children nodes
  are either valid <span>BST</span> nodes themselves or <span>None</span> /
  <span>null</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">arrayOne</span> = [10, 15, 8, 12, 94, 81, 5, 2, 11]
<span class="CodeEditor-promptParameter">arrayTwo</span> = [10, 8, 5, 15, 2, 12, 11, 94, 81]
</pre>
<h3>Sample Output</h3>
<pre>
true <span class="CodeEditor-promptComment">// both arrays represent the BST below</span>
<span class="CodeEditor-promptComment">         10
       /     \
      8      15
    /       /   \
   5      12    94
 /       /     /
2       11    81
</span>
</pre>
</div>

Hint 1
<p>
You can immediately conclude that the input arrays don't represent the same BST if their first values aren't equal to each other, since their first values represent the root of the BST. Similarly, you can conclude this if their lengths are different. If their first values are equal to each other and their lengths are the same, what should your next step be?
</p>


Hint 2

<p>
Given an array of integers, all of the values in the array that are smaller than the first value in the array are located in the left subtree of the BST that the array represents, and all of the values in the array that are greater than or equal to the first value in the array are located in the right subtree of the BST that the array represents. Use this fact and Hint #1 to recursively determine whether all subtrees in the BSTs represented by the arrays are equal to each other.
</p>


Hint 3

<p>
Write a recursive function that takes in two arrays of integers. If the first values of the arrays aren't equal to each other or if the arrays don't have the same length, the arrays don't represent the same BST. If the first values and lengths are equal to each other, respectively, perform the following actions on both arrays: gather all integers that are smaller than the first integer; these form a new array that represents the left subtree of the relevant BST; gather all integers that are greater than or equal to the first integer; these form a new array that represents the right subtree of the relevant BST. Call the recursive function twice: once with the two left-subtree arrays and once with the two right-subtree arrays.
</p>


Hint 4

<p>
Do you actually need to create all of the auxiliary arrays mentioned in Hint #3?
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
      vector<int> arrayOne = {10, 15, 8, 12, 94, 81, 5, 2, 11};
      vector<int> arrayTwo = {10, 8, 5, 15, 2, 12, 11, 94, 81};
      assert(sameBsts(arrayOne, arrayTwo) == true);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>

using namespace std;

vector<int> getSmaller(vector<int>);
vector<int> getBiggerOrEqual(vector<int> array);

// O(n^2) time | O(n^2) space - where n is the number of
// nodes in each array, respectively
bool sameBsts(vector<int> arrayOne, vector<int> arrayTwo) {
  if (arrayOne.size() != arrayTwo.size())
    return false;

  if (arrayOne.size() == 0 && arrayTwo.size() == 0)
    return true;

  if (arrayOne[0] != arrayTwo[0])
    return false;

  vector<int> leftOne = getSmaller(arrayOne);
  vector<int> leftTwo = getSmaller(arrayTwo);
  vector<int> rightOne = getBiggerOrEqual(arrayOne);
  vector<int> rightTwo = getBiggerOrEqual(arrayTwo);

  return sameBsts(leftOne, leftTwo) && sameBsts(rightOne, rightTwo);
}

vector<int> getSmaller(vector<int> array) {
  vector<int> smaller = {};
  for (int i = 1; i < array.size(); i++) {
    if (array[i] < array[0])
      smaller.push_back(array[i]);
  }
  return smaller;
}

vector<int> getBiggerOrEqual(vector<int> array) {
  vector<int> biggerOrEqual = {};
  for (int i = 1; i < array.size(); i++) {
    if (array[i] >= array[0])
      biggerOrEqual.push_back(array[i]);
  }
  return biggerOrEqual;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>

using namespace std;

bool areSameBsts(vector<int> arrayOne, vector<int> arrayTwo, int rootIdxOne,
                 int rootIdxTwo, int minVal, int maxVal);
int getIdxOfFirstSmaller(vector<int> array, int startingIdx, int minVal);
int getIdxOfFirstBiggerOrEqual(vector<int> array, int startingIdx, int maxVal);

// O(n^2) time | O(d) space - where n is the number of
// nodes in each array, respectively, and d is the depth
// of the BST that they represent
bool sameBsts(vector<int> arrayOne, vector<int> arrayTwo) {
  return areSameBsts(arrayOne, arrayTwo, 0, 0, INT_MIN, INT_MAX);
}

bool areSameBsts(vector<int> arrayOne, vector<int> arrayTwo, int rootIdxOne,
                 int rootIdxTwo, int minVal, int maxVal) {
  if (rootIdxOne == -1 || rootIdxTwo == -1)
    return rootIdxOne == rootIdxTwo;

  if (arrayOne[rootIdxOne] != arrayTwo[rootIdxTwo])
    return false;

  int leftRootIdxOne = getIdxOfFirstSmaller(arrayOne, rootIdxOne, minVal);
  int leftRootIdxTwo = getIdxOfFirstSmaller(arrayTwo, rootIdxTwo, minVal);
  int rightRootIdxOne =
      getIdxOfFirstBiggerOrEqual(arrayOne, rootIdxOne, maxVal);
  int rightRootIdxTwo =
      getIdxOfFirstBiggerOrEqual(arrayTwo, rootIdxTwo, maxVal);

  int currentValue = arrayOne[rootIdxOne];
  bool leftAreSame = areSameBsts(arrayOne, arrayTwo, leftRootIdxOne,
                                 leftRootIdxTwo, minVal, currentValue);
  bool rightAreSame = areSameBsts(arrayOne, arrayTwo, rightRootIdxOne,
                                  rightRootIdxTwo, currentValue, maxVal);

  return leftAreSame && rightAreSame;
}

int getIdxOfFirstSmaller(vector<int> array, int startingIdx, int minVal) {
  // Find the index of the first smaller value after the startingIdx.
  // Make sure that this value is greater than or equal to the minVal,
  // which is the value of the previous parent node in the BST. If it
  // isn't, then that value is located in the left subtree of the
  // previous parent node.
  for (int i = startingIdx + 1; i < array.size(); i++) {
    if (array[i] < array[startingIdx] && array[i] >= minVal)
      return i;
  }
  return -1;
}

int getIdxOfFirstBiggerOrEqual(vector<int> array, int startingIdx, int maxVal) {
  // Find the index of the first bigger/equal value after the startingIdx.
  // Make sure that this value is smaller than maxVal, which is the value
  // of the previous parent node in the BST. If it isn't, then that value
  // is located in the right subtree of the previous parent node.
  for (int i = startingIdx + 1; i < array.size(); i++) {
    if (array[i] >= array[startingIdx] && array[i] < maxVal)
      return i;
  }
  return -1;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> arrayOne = {10, 15, 8, 12, 94, 81, 5, 2, 11};
      vector<int> arrayTwo = {10, 8, 5, 15, 2, 12, 11, 94, 81};
      assert(sameBsts(arrayOne, arrayTwo) == true);
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
		List<int> arrayOne = new List<int>(){
			10, 15, 8, 12, 94, 81, 5, 2, 11
		};
		List<int> arrayTwo = new List<int>(){
			10, 8, 5, 15, 2, 12, 11, 94, 81
		};
		Utils.AssertTrue(Program.SameBsts(arrayOne, arrayTwo) == true);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n^2) time | O(n^2) space - where n is the number of
	// nodes in each array, respectively
	public static bool SameBsts(List<int> arrayOne, List<int> arrayTwo) {
		if (arrayOne.Count != arrayTwo.Count) return false;

		if (arrayOne.Count == 0 && arrayTwo.Count == 0) return true;

		if (arrayOne[0] != arrayTwo[0]) return false;

		List<int> leftOne = getSmaller(arrayOne);
		List<int> leftTwo = getSmaller(arrayTwo);
		List<int> rightOne = getBiggerOrEqual(arrayOne);
		List<int> rightTwo = getBiggerOrEqual(arrayTwo);

		return SameBsts(leftOne, leftTwo) && SameBsts(rightOne, rightTwo);
	}

	public static List<int> getSmaller(List<int> array) {
		List<int> smaller = new List<int>();
		for (int i = 1; i < array.Count; i++) {
			if (array[i] < array[0]) smaller.Add(array[i]);
		}
		return smaller;
	}

	public static List<int> getBiggerOrEqual(List<int> array) {
		List<int> biggerOrEqual = new List<int>();
		for (int i = 1; i < array.Count; i++) {
			if (array[i] >= array[0]) biggerOrEqual.Add(array[i]);
		}
		return biggerOrEqual;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;

public class Program {
	// O(n^2) time | O(d) space - where n is the number of
	// nodes in each array, respectively, and d is the depth
	// of the BST that they represent
	public static bool SameBsts(List<int> arrayOne, List<int> arrayTwo) {
		return areSameBsts(arrayOne, arrayTwo, 0, 0, Int32.MinValue, Int32.MaxValue);
	}

	public static bool areSameBsts(List<int> arrayOne, List<int> arrayTwo, int rootIdxOne,
	  int rootIdxTwo, int minVal, int maxVal) {
		if (rootIdxOne == -1 || rootIdxTwo == -1) return rootIdxOne == rootIdxTwo;

		if (arrayOne[rootIdxOne] != arrayTwo[rootIdxTwo]) return false;

		int leftRootIdxOne = getIdxOfFirstSmaller(arrayOne, rootIdxOne, minVal);
		int leftRootIdxTwo = getIdxOfFirstSmaller(arrayTwo, rootIdxTwo, minVal);
		int rightRootIdxOne = getIdxOfFirstBiggerOrEqual(arrayOne, rootIdxOne, maxVal);
		int rightRootIdxTwo = getIdxOfFirstBiggerOrEqual(arrayTwo, rootIdxTwo, maxVal);

		int currentValue = arrayOne[rootIdxOne];
		bool leftAreSame = areSameBsts(arrayOne, arrayTwo, leftRootIdxOne, leftRootIdxTwo,
		    minVal, currentValue);
		bool rightAreSame = areSameBsts(arrayOne, arrayTwo, rightRootIdxOne,
		    rightRootIdxTwo, currentValue, maxVal);

		return leftAreSame && rightAreSame;
	}

	public static int getIdxOfFirstSmaller(List<int> array, int startingIdx, int minVal) {
		// Find the index of the first smaller value after the startingIdx.
		// Make sure that this value is greater than or equal to the minVal,
		// which is the value of the previous parent node in the BST. If it
		// isn't, then that value is located in the left subtree of the
		// previous parent node.
		for (int i = startingIdx + 1; i < array.Count; i++) {
			if (array[i] < array[startingIdx] && array[i] >= minVal) return i;
		}
		return -1;
	}

	public static int getIdxOfFirstBiggerOrEqual(List<int> array, int startingIdx, int maxVal) {
		// Find the index of the first bigger/equal value after the startingIdx.
		// Make sure that this value is smaller than maxVal, which is the value
		// of the previous parent node in the BST. If it isn't, then that value
		// is located in the right subtree of the previous parent node.
		for (int i = startingIdx + 1; i < array.Count; i++) {
			if (array[i] >= array[startingIdx] && array[i] < maxVal) return i;
		}
		return -1;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		List<int> arrayOne = new List<int>(){
			10, 15, 8, 12, 94, 81, 5, 2, 11
		};
		List<int> arrayTwo = new List<int>(){
			10, 8, 5, 15, 2, 12, 11, 94, 81
		};
		Utils.AssertTrue(Program.SameBsts(arrayOne, arrayTwo) == true);
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
	arrayOne := []int{10, 15, 8, 12, 94, 81, 5, 2, 11}
	arrayTwo := []int{10, 8, 5, 15, 2, 12, 11, 94, 81}
	require.Equal(t, SameBsts(arrayOne, arrayTwo), true)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n^2) time | O(n^2) space - where n is the number of
// nodes in each array, respectively
func SameBsts(arrayOne, arrayTwo []int) bool {
	if len(arrayOne) != len(arrayTwo) {
		return false
	}
	if len(arrayOne) == 0 && len(arrayTwo) == 0 {
		return true
	}

	if arrayOne[0] != arrayTwo[0] {
		return false
	}

	leftOne := getSmaller(arrayOne)
	leftTwo := getSmaller(arrayTwo)
	rightOne := getBiggerOrEqual(arrayOne)
	rightTwo := getBiggerOrEqual(arrayTwo)
	return SameBsts(leftOne, leftTwo) && SameBsts(rightOne, rightTwo)
}

func getSmaller(array []int) []int {
	smaller := []int{}
	for i := 1; i < len(array); i++ {
		if array[i] < array[0] {
			smaller = append(smaller, array[i])
		}
	}
	return smaller
}

func getBiggerOrEqual(array []int) []int {
	biggerOrEqual := []int{}
	for i := 1; i < len(array); i++ {
		if array[i] >= array[0] {
			biggerOrEqual = append(biggerOrEqual, array[i])
		}
	}
	return biggerOrEqual
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "math"

// O(n^2) time | O(d) space - where n is the number of
// nodes in each array, respectively, and d is the depth
// of the BST that they represent
func SameBsts(arrayOne, arrayTwo []int) bool {
	return areSameBsts(arrayOne, arrayTwo, 0, 0, math.MinInt32, math.MaxInt32)
}

func areSameBsts(arrayOne, arrayTwo []int, rootIdxOne, rootIdxTwo int, minVal, maxVal int) bool {
	if rootIdxOne == -1 || rootIdxTwo == -1 {
		return rootIdxOne == rootIdxTwo
	}

	if arrayOne[rootIdxOne] != arrayTwo[rootIdxTwo] {
		return false
	}

	leftRootIdxOne := getIdxOfFirstSmaller(arrayOne, rootIdxOne, minVal)
	leftRootIdxTwo := getIdxOfFirstSmaller(arrayTwo, rootIdxTwo, minVal)
	rightRootIdxOne := getIdxOfFirstBiggerOrEqual(arrayOne, rootIdxOne, maxVal)
	rightRootIdxTwo := getIdxOfFirstBiggerOrEqual(arrayTwo, rootIdxTwo, maxVal)

	currentValue := arrayOne[rootIdxOne]
	leftAreSame := areSameBsts(arrayOne, arrayTwo, leftRootIdxOne, leftRootIdxTwo, minVal, currentValue)
	rightAreSame := areSameBsts(arrayOne, arrayTwo, rightRootIdxOne, rightRootIdxTwo, currentValue, maxVal)

	return leftAreSame && rightAreSame
}

func getIdxOfFirstSmaller(array []int, startingIdx, minVal int) int {
	// Find the index of the first smaller value after the startingIdx.
	// Make sure that this value is greater than or equal to the minVal,
	// which is the value of the previous parent node in the BST. If it
	// isn't, then that value is located in the left subtree of the
	// previous parent node.
	for i := startingIdx + 1; i < len(array); i++ {
		if array[i] < array[startingIdx] && array[i] >= minVal {
			return i
		}
	}
	return -1
}

func getIdxOfFirstBiggerOrEqual(array []int, startingIdx, maxVal int) int {
	// Find the index of the first bigger/equal value after the startingIdx.
	// Make sure that this value is smaller than maxVal, which is the value
	// of the previous parent node in the BST. If it isn't, then that value
	// is located in the right subtree of the previous parent node.
	for i := startingIdx + 1; i < len(array); i++ {
		if array[i] >= array[startingIdx] && array[i] < maxVal {
			return i
		}
	}
	return -1
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	arrayOne := []int{10, 15, 8, 12, 94, 81, 5, 2, 11}
	arrayTwo := []int{10, 8, 5, 15, 2, 12, 11, 94, 81}
	require.Equal(t, SameBsts(arrayOne, arrayTwo), true)
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
    List<Integer> arrayOne = new ArrayList<Integer>(Arrays.asList(10, 15, 8, 12, 94, 81, 5, 2, 11));
    List<Integer> arrayTwo = new ArrayList<Integer>(Arrays.asList(10, 8, 5, 15, 2, 12, 11, 94, 81));
    Utils.assertTrue(Program.sameBsts(arrayOne, arrayTwo) == true);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n^2) time | O(n^2) space - where n is the number of
  // nodes in each array, respectively
  public static boolean sameBsts(List<Integer> arrayOne, List<Integer> arrayTwo) {
    if (arrayOne.size() != arrayTwo.size()) return false;

    if (arrayOne.size() == 0 && arrayTwo.size() == 0) return true;

    if (arrayOne.get(0).intValue() != arrayTwo.get(0).intValue()) return false;

    List<Integer> leftOne = getSmaller(arrayOne);
    List<Integer> leftTwo = getSmaller(arrayTwo);
    List<Integer> rightOne = getBiggerOrEqual(arrayOne);
    List<Integer> rightTwo = getBiggerOrEqual(arrayTwo);

    return sameBsts(leftOne, leftTwo) && sameBsts(rightOne, rightTwo);
  }

  public static List<Integer> getSmaller(List<Integer> array) {
    List<Integer> smaller = new ArrayList<Integer>();
    for (int i = 1; i < array.size(); i++) {
      if (array.get(i).intValue() < array.get(0).intValue()) smaller.add(array.get(i));
    }
    return smaller;
  }

  public static List<Integer> getBiggerOrEqual(List<Integer> array) {
    List<Integer> biggerOrEqual = new ArrayList<Integer>();
    for (int i = 1; i < array.size(); i++) {
      if (array.get(i).intValue() >= array.get(0).intValue()) biggerOrEqual.add(array.get(i));
    }
    return biggerOrEqual;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n^2) time | O(d) space - where n is the number of
  // nodes in each array, respectively, and d is the depth
  // of the BST that they represent
  public static boolean sameBsts(List<Integer> arrayOne, List<Integer> arrayTwo) {
    return areSameBsts(arrayOne, arrayTwo, 0, 0, Integer.MIN_VALUE, Integer.MAX_VALUE);
  }

  public static boolean areSameBsts(
      List<Integer> arrayOne,
      List<Integer> arrayTwo,
      int rootIdxOne,
      int rootIdxTwo,
      int minVal,
      int maxVal) {
    if (rootIdxOne == -1 || rootIdxTwo == -1) return rootIdxOne == rootIdxTwo;

    if (arrayOne.get(rootIdxOne).intValue() != arrayTwo.get(rootIdxTwo).intValue()) return false;

    int leftRootIdxOne = getIdxOfFirstSmaller(arrayOne, rootIdxOne, minVal);
    int leftRootIdxTwo = getIdxOfFirstSmaller(arrayTwo, rootIdxTwo, minVal);
    int rightRootIdxOne = getIdxOfFirstBiggerOrEqual(arrayOne, rootIdxOne, maxVal);
    int rightRootIdxTwo = getIdxOfFirstBiggerOrEqual(arrayTwo, rootIdxTwo, maxVal);

    int currentValue = arrayOne.get(rootIdxOne);
    boolean leftAreSame =
        areSameBsts(arrayOne, arrayTwo, leftRootIdxOne, leftRootIdxTwo, minVal, currentValue);
    boolean rightAreSame =
        areSameBsts(arrayOne, arrayTwo, rightRootIdxOne, rightRootIdxTwo, currentValue, maxVal);

    return leftAreSame && rightAreSame;
  }

  public static int getIdxOfFirstSmaller(List<Integer> array, int startingIdx, int minVal) {
    // Find the index of the first smaller value after the startingIdx.
    // Make sure that this value is greater than or equal to the minVal,
    // which is the value of the previous parent node in the BST. If it
    // isn't, then that value is located in the left subtree of the
    // previous parent node.
    for (int i = startingIdx + 1; i < array.size(); i++) {
      if (array.get(i).intValue() < array.get(startingIdx).intValue()
          && array.get(i).intValue() >= minVal) return i;
    }
    return -1;
  }

  public static int getIdxOfFirstBiggerOrEqual(List<Integer> array, int startingIdx, int maxVal) {
    // Find the index of the first bigger/equal value after the startingIdx.
    // Make sure that this value is smaller than maxVal, which is the value
    // of the previous parent node in the BST. If it isn't, then that value
    // is located in the right subtree of the previous parent node.
    for (int i = startingIdx + 1; i < array.size(); i++) {
      if (array.get(i).intValue() >= array.get(startingIdx).intValue()
          && array.get(i).intValue() < maxVal) return i;
    }
    return -1;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    List<Integer> arrayOne = new ArrayList<Integer>(Arrays.asList(10, 15, 8, 12, 94, 81, 5, 2, 11));
    List<Integer> arrayTwo = new ArrayList<Integer>(Arrays.asList(10, 8, 5, 15, 2, 12, 11, 94, 81));
    Utils.assertTrue(Program.sameBsts(arrayOne, arrayTwo) == true);
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
  const arrayOne = [10, 15, 8, 12, 94, 81, 5, 2, 11];
  const arrayTwo = [10, 8, 5, 15, 2, 12, 11, 94, 81];
  chai.expect(program.sameBsts(arrayOne, arrayTwo)).to.deep.equal(true);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n^2) space - where n is the number of
// nodes in each array, respectively
function sameBsts(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;

  if (arrayOne.length === 0 && arrayTwo.length === 0) return true;

  if (arrayOne[0] !== arrayTwo[0]) return false;

  const leftOne = getSmaller(arrayOne);
  const leftTwo = getSmaller(arrayTwo);
  const rightOne = getBiggerOrEqual(arrayOne);
  const rightTwo = getBiggerOrEqual(arrayTwo);

  return sameBsts(leftOne, leftTwo) && sameBsts(rightOne, rightTwo);
}

function getSmaller(array) {
  const smaller = [];
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[0]) smaller.push(array[i]);
  }
  return smaller;
}

function getBiggerOrEqual(array) {
  const biggerOrEqual = [];
  for (let i = 1; i < array.length; i++) {
    if (array[i] >= array[0]) biggerOrEqual.push(array[i]);
  }
  return biggerOrEqual;
}

exports.sameBsts = sameBsts;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(d) space - where n is the number of
// nodes in each array, respectively, and d is the depth
// of the BST that they represent
function sameBsts(arrayOne, arrayTwo) {
  return areSameBsts(arrayOne, arrayTwo, 0, 0, -Infinity, Infinity);
}

function areSameBsts(arrayOne, arrayTwo, rootIdxOne, rootIdxTwo, minVal, maxVal) {
  if (rootIdxOne === -1 || rootIdxTwo === -1) return rootIdxOne === rootIdxTwo;

  if (arrayOne[rootIdxOne] !== arrayTwo[rootIdxTwo]) return false;

  const leftRootIdxOne = getIdxOfFirstSmaller(arrayOne, rootIdxOne, minVal);
  const leftRootIdxTwo = getIdxOfFirstSmaller(arrayTwo, rootIdxTwo, minVal);
  const rightRootIdxOne = getIdxOfFirstBiggerOrEqual(arrayOne, rootIdxOne, maxVal);
  const rightRootIdxTwo = getIdxOfFirstBiggerOrEqual(arrayTwo, rootIdxTwo, maxVal);

  const currentValue = arrayOne[rootIdxOne];
  const leftAreSame = areSameBsts(arrayOne, arrayTwo, leftRootIdxOne, leftRootIdxTwo, minVal, currentValue);
  const rightAreSame = areSameBsts(arrayOne, arrayTwo, rightRootIdxOne, rightRootIdxTwo, currentValue, maxVal);

  return leftAreSame && rightAreSame;
}

function getIdxOfFirstSmaller(array, startingIdx, minVal) {
  // Find the index of the first smaller value after the startingIdx.
  // Make sure that this value is greater than or equal to the minVal,
  // which is the value of the previous parent node in the BST. If it
  // isn't, then that value is located in the left subtree of the
  // previous parent node.
  for (let i = startingIdx + 1; i < array.length; i++) {
    if (array[i] < array[startingIdx] && array[i] >= minVal) return i;
  }
  return -1;
}

function getIdxOfFirstBiggerOrEqual(array, startingIdx, maxVal) {
  // Find the index of the first bigger/equal value after the startingIdx.
  // Make sure that this value is smaller than maxVal, which is the value
  // of the previous parent node in the BST. If it isn't, then that value
  // is located in the right subtree of the previous parent node.
  for (let i = startingIdx + 1; i < array.length; i++) {
    if (array[i] >= array[startingIdx] && array[i] < maxVal) return i;
  }
  return -1;
}

exports.sameBsts = sameBsts;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const arrayOne = [10, 15, 8, 12, 94, 81, 5, 2, 11];
  const arrayTwo = [10, 8, 5, 15, 2, 12, 11, 94, 81];
  chai.expect(program.sameBsts(arrayOne, arrayTwo)).to.deep.equal(true);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.sameBsts as sameBsts

class ProgramTest {
    @Test
    fun TestCase1() {
        var arrayOne = listOf(10, 15, 8, 12, 94, 81, 5, 2, 11)
        var arrayTwo = listOf(10, 8, 5, 15, 2, 12, 11, 94, 81)
        assert(sameBsts(arrayOne, arrayTwo))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^2) time | O(n^2) space - where n is the number of
// nodes in each array, respectively
fun sameBsts(arrayOne: List<Int>, arrayTwo: List<Int>): Boolean {
    if (arrayOne.size != arrayTwo.size) return false

    if (arrayOne.size == 0 && arrayTwo.size == 0) return true

    if (arrayOne[0] != arrayTwo[0]) return false

    val leftOne = getSmaller(arrayOne)
    val leftTwo = getSmaller(arrayTwo)
    val rightOne = getBiggerOrEqual(arrayOne)
    val rightTwo = getBiggerOrEqual(arrayTwo)

    return sameBsts(leftOne, leftTwo) && sameBsts(rightOne, rightTwo)
}

fun getSmaller(array: List<Int>): List<Int> {
    val smaller = mutableListOf<Int>()
    for (i in 1 until array.size) {
        if (array[i] < array[0]) smaller.add(array[i])
    }
    return smaller
}

fun getBiggerOrEqual(array: List<Int>): List<Int> {
    val biggerOrEqual = mutableListOf<Int>()
    for (i in 1 until array.size) {
        if (array[i] >= array[0]) biggerOrEqual.add(array[i])
    }
    return biggerOrEqual
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^2) time | O(d) space - where n is the number of
// nodes in each array, respectively, and d is the depth
// of the BST that they represent
fun sameBsts(arrayOne: List<Int>, arrayTwo: List<Int>): Boolean {
    return areSameBsts(arrayOne, arrayTwo, 0, 0, Integer.MIN_VALUE, Integer.MAX_VALUE)
}

fun areSameBsts(arrayOne: List<Int>, arrayTwo: List<Int>, rootIdxOne: Int, rootIdxTwo: Int, minVal: Int, maxVal: Int): Boolean {
    if (rootIdxOne == -1 || rootIdxTwo == -1) return rootIdxOne == rootIdxTwo

    if (arrayOne[rootIdxOne] != arrayTwo[rootIdxTwo]) return false

    val leftRootIdxOne = getIdxOfFirstSmaller(arrayOne, rootIdxOne, minVal)
    val leftRootIdxTwo = getIdxOfFirstSmaller(arrayTwo, rootIdxTwo, minVal)
    val rightRootIdxOne = getIdxOfFirstBiggerOrEqual(arrayOne, rootIdxOne, maxVal)
    val rightRootIdxTwo = getIdxOfFirstBiggerOrEqual(arrayTwo, rootIdxTwo, maxVal)

    val currentValue = arrayOne[rootIdxOne]
    val leftAreSame = areSameBsts(arrayOne, arrayTwo, leftRootIdxOne, leftRootIdxTwo, minVal, currentValue)
    val rightAreSame = areSameBsts(arrayOne, arrayTwo, rightRootIdxOne, rightRootIdxTwo, currentValue, maxVal)

    return leftAreSame && rightAreSame
}

fun getIdxOfFirstSmaller(array: List<Int>, startingIdx: Int, minVal: Int): Int {
    // Find the index of the first smaller value after the startingIdx.
    // Make sure that this value is greater than or equal to the minVal,
    // which is the value of the previous parent node in the BST. If it
    // isn't, then that value is located in the left subtree of the
    // previous parent node.
    for (i in startingIdx + 1 until array.size) {
        if (array[i] < array[startingIdx] && array[i] >= minVal) return i
    }
    return -1
}

fun getIdxOfFirstBiggerOrEqual(array: List<Int>, startingIdx: Int, maxVal: Int): Int {
    // Find the index of the first bigger/equal value after the startingIdx.
    // Make sure that this value is smaller than maxVal, which is the value
    // of the previous parent node in the BST. If it isn't, then that value
    // is located in the right subtree of the previous parent node.
    for (i in startingIdx + 1 until array.size) {
        if (array[i] >= array[startingIdx] && array[i] < maxVal) return i
    }
    return -1
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.sameBsts as sameBsts

class ProgramTest {
    @Test
    fun TestCase1() {
        var arrayOne = listOf(10, 15, 8, 12, 94, 81, 5, 2, 11)
        var arrayTwo = listOf(10, 8, 5, 15, 2, 12, 11, 94, 81)
        assert(sameBsts(arrayOne, arrayTwo))
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
      let arrayOne = [10, 15, 8, 12, 94, 81, 5, 2, 11]
      let arrayTwo = [10, 8, 5, 15, 2, 12, 11, 94, 81]
      let expected = true
      try assertEqual(program.sameBsts(arrayOne, arrayTwo), expected)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(n^2) space - where n is the number of
  // nodes in each array, respectively
  func sameBsts(_ arrayOne: [Int], _ arrayTwo: [Int]) -> Bool {
    if arrayOne.count != arrayTwo.count {
      return false
    } else if arrayOne.count == 0, arrayTwo.count == 0 {
      return true
    }

    if arrayOne[0] != arrayTwo[0] {
      return false
    }

    let leftOne = getSmaller(arrayOne)
    let leftTwo = getSmaller(arrayTwo)
    let rightOne = getBiggerOrEqual(arrayOne)
    let rightTwo = getBiggerOrEqual(arrayTwo)
    return sameBsts(leftOne, leftTwo) && sameBsts(rightOne, rightTwo)
  }

  func getSmaller(_ array: [Int]) -> [Int] {
    var smaller = [Int]()
    for i in 1 ..< array.count {
      if array[i] < array[0] {
        smaller.append(array[i])
      }
    }
    return smaller
  }

  func getBiggerOrEqual(_ array: [Int]) -> [Int] {
    var biggerOrEqual = [Int]()
    for i in 1 ..< array.count {
      if array[i] >= array[0] {
        biggerOrEqual.append(array[i])
      }
    }
    return biggerOrEqual
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(d) space - where n is the number of
  // nodes in each array, respectively, and d is the depth
  // of the BST that they represent
  func sameBsts(_ arrayOne: [Int], _ arrayTwo: [Int]) -> Bool {
    return areSameBsts(arrayOne, arrayTwo, 0, 0, Int.min, Int.max)
  }

  func areSameBsts(_ arrayOne: [Int], _ arrayTwo: [Int], _ rootIdxOne: Int, _ rootIdxTwo: Int, _ minVal: Int, _ maxVal: Int) -> Bool {
    if rootIdxOne == -1 || rootIdxTwo == -1 {
      return rootIdxOne == rootIdxTwo
    }

    if arrayOne[rootIdxOne] != arrayTwo[rootIdxTwo] {
      return false
    }

    let leftRootIdxOne = getIdxOfFirstSmaller(arrayOne, rootIdxOne, minVal)
    let leftRootIdxTwo = getIdxOfFirstSmaller(arrayTwo, rootIdxTwo, minVal)
    let rightRootIdxOne = getIdxOfFirstBiggerOrEqual(arrayOne, rootIdxOne, maxVal)
    let rightRootIdxTwo = getIdxOfFirstBiggerOrEqual(arrayTwo, rootIdxTwo, maxVal)

    let currentValue = arrayOne[rootIdxOne]
    let leftAreSame = areSameBsts(arrayOne, arrayTwo, leftRootIdxOne, leftRootIdxTwo, minVal, currentValue)
    let rightAreSame = areSameBsts(arrayOne, arrayTwo, rightRootIdxOne, rightRootIdxTwo, currentValue, maxVal)

    return leftAreSame && rightAreSame
  }

  func getIdxOfFirstSmaller(_ array: [Int], _ startingIdx: Int, _ minVal: Int) -> Int {
    // Find the index of the first smaller value after the startingIdx.
    // Make sure that this value is greater than or equal to the minVal,
    // which is the value of the previous parent node in the BST. If it
    // isn't, then that value is located in the left subtree of the
    // previous parent node.
    for i in (startingIdx + 1) ..< array.count {
      if array[i] < array[startingIdx], array[i] >= minVal {
        return i
      }
    }
    return -1
  }

  func getIdxOfFirstBiggerOrEqual(_ array: [Int], _ startingIdx: Int, _ maxVal: Int) -> Int {
    // Find the index of the first bigger/equal value after the startingIdx.
    // Make sure that this value is smaller than maxVal, which is the value
    // of the previous parent node in the BST. If it isn't, then that value
    // is located in the right subtree of the previous parent node.
    for i in (startingIdx + 1) ..< array.count {
      if array[i] >= array[startingIdx], array[i] < maxVal {
        return i
      }
    }
    return -1
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let arrayOne = [10, 15, 8, 12, 94, 81, 5, 2, 11]
      let arrayTwo = [10, 8, 5, 15, 2, 12, 11, 94, 81]
      let expected = true
      try assertEqual(program.sameBsts(arrayOne, arrayTwo), expected)
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
        arrayOne = [10, 15, 8, 12, 94, 81, 5, 2, 11]
        arrayTwo = [10, 8, 5, 15, 2, 12, 11, 94, 81]
        self.assertEqual(program.sameBsts(arrayOne, arrayTwo), True)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n^2) space - where n is the number of
# nodes in each array, respectively
def sameBsts(arrayOne, arrayTwo):
    if len(arrayOne) != len(arrayTwo):
        return False

    if len(arrayOne) == 0 and len(arrayTwo) == 0:
        return True

    if arrayOne[0] != arrayTwo[0]:
        return False

    leftOne = getSmaller(arrayOne)
    leftTwo = getSmaller(arrayTwo)
    rightOne = getBiggerOrEqual(arrayOne)
    rightTwo = getBiggerOrEqual(arrayTwo)

    return sameBsts(leftOne, leftTwo) and sameBsts(rightOne, rightTwo)


def getSmaller(array):
    smaller = []
    for i in range(1, len(array)):
        if array[i] < array[0]:
            smaller.append(array[i])
    return smaller


def getBiggerOrEqual(array):
    biggerOrEqual = []
    for i in range(1, len(array)):
        if array[i] >= array[0]:
            biggerOrEqual.append(array[i])
    return biggerOrEqual

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(d) space - where n is the number of
# nodes in each array, respectively, and d is the depth
# of the BST that they represent
def sameBsts(arrayOne, arrayTwo):
    return areSameBsts(arrayOne, arrayTwo, 0, 0, float("-inf"), float("inf"))


def areSameBsts(arrayOne, arrayTwo, rootIdxOne, rootIdxTwo, minVal, maxVal):
    if rootIdxOne == -1 or rootIdxTwo == -1:
        return rootIdxOne == rootIdxTwo

    if arrayOne[rootIdxOne] != arrayTwo[rootIdxTwo]:
        return False

    leftRootIdxOne = getIdxOfFirstSmaller(arrayOne, rootIdxOne, minVal)
    leftRootIdxTwo = getIdxOfFirstSmaller(arrayTwo, rootIdxTwo, minVal)
    rightRootIdxOne = getIdxOfFirstBiggerOrEqual(arrayOne, rootIdxOne, maxVal)
    rightRootIdxTwo = getIdxOfFirstBiggerOrEqual(arrayTwo, rootIdxTwo, maxVal)

    currentValue = arrayOne[rootIdxOne]
    leftAreSame = areSameBsts(arrayOne, arrayTwo, leftRootIdxOne, leftRootIdxTwo, minVal, currentValue)
    rightAreSame = areSameBsts(arrayOne, arrayTwo, rightRootIdxOne, rightRootIdxTwo, currentValue, maxVal)

    return leftAreSame and rightAreSame


def getIdxOfFirstSmaller(array, startingIdx, minVal):
    # Find the index of the first smaller value after the startingIdx.
    # Make sure that this value is greater than or equal to the minVal,
    # which is the value of the previous parent node in the BST. If it
    # isn't, then that value is located in the left subtree of the
    # previous parent node.
    for i in range(startingIdx + 1, len(array)):
        if array[i] < array[startingIdx] and array[i] >= minVal:
            return i
    return -1


def getIdxOfFirstBiggerOrEqual(array, startingIdx, maxVal):
    # Find the index of the first bigger/equal value after the startingIdx.
    # Make sure that this value is smaller than maxVal, which is the value
    # of the previous parent node in the BST. If it isn't, then that value
    # is located in the right subtree of the previous parent node.
    for i in range(startingIdx + 1, len(array)):
        if array[i] >= array[startingIdx] and array[i] < maxVal:
            return i
    return -1

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        arrayOne = [10, 15, 8, 12, 94, 81, 5, 2, 11]
        arrayTwo = [10, 8, 5, 15, 2, 12, 11, 94, 81]
        self.assertEqual(program.sameBsts(arrayOne, arrayTwo), True)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const arrayOne = [10, 15, 8, 12, 94, 81, 5, 2, 11];
  const arrayTwo = [10, 8, 5, 15, 2, 12, 11, 94, 81];
  chai.expect(program.sameBsts(arrayOne, arrayTwo)).to.deep.equal(true);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n^2) space - where n is the number of
// nodes in each array, respectively
export function sameBsts(arrayOne: number[], arrayTwo: number[]): boolean {
  if (arrayOne.length !== arrayTwo.length) return false;

  if (arrayOne.length === 0 && arrayTwo.length === 0) return true;

  if (arrayOne[0] !== arrayTwo[0]) return false;

  const leftOne = getSmaller(arrayOne);
  const leftTwo = getSmaller(arrayTwo);
  const rightOne = getBiggerOrEqual(arrayOne);
  const rightTwo = getBiggerOrEqual(arrayTwo);

  return sameBsts(leftOne, leftTwo) && sameBsts(rightOne, rightTwo);
}

function getSmaller(array: number[]) {
  const smaller: number[] = [];
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[0]) smaller.push(array[i]);
  }
  return smaller;
}

function getBiggerOrEqual(array: number[]) {
  const biggerOrEqual: number[] = [];
  for (let i = 1; i < array.length; i++) {
    if (array[i] >= array[0]) biggerOrEqual.push(array[i]);
  }
  return biggerOrEqual;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(d) space - where n is the number of
// nodes in each array, respectively, and d is the depth
// of the BST that they represent
export function sameBsts(arrayOne: number[], arrayTwo: number[]) {
  return areSameBsts(arrayOne, arrayTwo, 0, 0, -Infinity, Infinity);
}

function areSameBsts(
  arrayOne: number[],
  arrayTwo: number[],
  rootIdxOne: number,
  rootIdxTwo: number,
  minVal: number,
  maxVal: number,
): boolean {
  if (rootIdxOne === -1 || rootIdxTwo === -1) return rootIdxOne === rootIdxTwo;

  if (arrayOne[rootIdxOne] !== arrayTwo[rootIdxTwo]) return false;

  const leftRootIdxOne = getIdxOfFirstSmaller(arrayOne, rootIdxOne, minVal);
  const leftRootIdxTwo = getIdxOfFirstSmaller(arrayTwo, rootIdxTwo, minVal);
  const rightRootIdxOne = getIdxOfFirstBiggerOrEqual(arrayOne, rootIdxOne, maxVal);
  const rightRootIdxTwo = getIdxOfFirstBiggerOrEqual(arrayTwo, rootIdxTwo, maxVal);

  const currentValue = arrayOne[rootIdxOne];
  const leftAreSame = areSameBsts(arrayOne, arrayTwo, leftRootIdxOne, leftRootIdxTwo, minVal, currentValue);
  const rightAreSame = areSameBsts(arrayOne, arrayTwo, rightRootIdxOne, rightRootIdxTwo, currentValue, maxVal);

  return leftAreSame && rightAreSame;
}

function getIdxOfFirstSmaller(array: number[], startingIdx: number, minVal: number) {
  // Find the index of the first smaller value after the startingIdx.
  // Make sure that this value is greater than or equal to the minVal,
  // which is the value of the previous parent node in the BST. If it
  // isn't, then that value is located in the left subtree of the
  // previous parent node.
  for (let i = startingIdx + 1; i < array.length; i++) {
    if (array[i] < array[startingIdx] && array[i] >= minVal) return i;
  }
  return -1;
}

function getIdxOfFirstBiggerOrEqual(array: number[], startingIdx: number, maxVal: number) {
  // Find the index of the first bigger/equal value after the startingIdx.
  // Make sure that this value is smaller than maxVal, which is the value
  // of the previous parent node in the BST. If it isn't, then that value
  // is located in the right subtree of the previous parent node.
  for (let i = startingIdx + 1; i < array.length; i++) {
    if (array[i] >= array[startingIdx] && array[i] < maxVal) return i;
  }
  return -1;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const arrayOne = [10, 15, 8, 12, 94, 81, 5, 2, 11];
  const arrayTwo = [10, 8, 5, 15, 2, 12, 11, 94, 81];
  chai.expect(program.sameBsts(arrayOne, arrayTwo)).to.deep.equal(true);
});

```

