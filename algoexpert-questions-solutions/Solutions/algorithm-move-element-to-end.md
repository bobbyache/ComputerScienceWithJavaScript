# Move Element To End
<div class="html">
<p>
  You're given an array of integers and an integer. Write a function that moves
  all instances of that integer in the array to the end of the array and returns
  the array.
</p>
<p>
  The function should perform this in place (i.e., it should mutate the input
  array) and doesn't need to maintain the order of the other integers.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [2, 1, 2, 2, 2, 3, 4, 2]
<span class="CodeEditor-promptParameter">toMove</span> = 2
</pre>
<h3>Sample Output</h3>
<pre>
[1, 3, 4, 2, 2, 2, 2, 2] <span class="CodeEditor-promptComment">// the numbers 1, 3, and 4 could be ordered differently</span>
</pre>
</div>

Hint 1
<p>
You can solve this problem in linear time.
</p>


Hint 2

<p>
In view of Hint #1, you can solve this problem without sorting the input array. Try setting two pointers at the start and end of the array, respectively, and progressively moving them inwards.
</p>


Hint 3

<p>
Following Hint #2, set two pointers at the start and end of the array, respectively. Move the right pointer inwards so long as it points to the integer to move, and move the left pointer inwards so long as it doesn't point to the integer to move. When both pointers aren't moving, swap their values in place. Repeat this process until the pointers pass each other.
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
      vector<int> array = {2, 1, 2, 2, 2, 3, 4, 2};
      int toMove = 2;
      vector<int> expectedStart = {1, 3, 4};
      vector<int> expectedEnd = {2, 2, 2, 2, 2};
      vector<int> output = moveElementToEnd(array, toMove);
      assert(output.size() == array.size());
      vector<int> outputStart = vector<int>(output.begin(), output.begin() + 3);
      sort(outputStart.begin(), outputStart.end());
      vector<int> outputEnd = vector<int>(output.begin() + 3, output.end());
      assert(outputStart == expectedStart);
      assert(outputEnd == expectedEnd);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>

using namespace std;

// O(n) time | O(1) space - where n is the length of the array
vector<int> moveElementToEnd(vector<int> &array, int toMove) {
  int i = 0;
  int j = array.size() - 1;
  while (i < j) {
    while (i < j && array[j] == toMove)
      j--;
    if (array[i] == toMove)
      swap(array[i], array[j]);
    i++;
  }
  return array;
}

```
### Unit Tests 1 (cpp)
```cpp
#include <algorithm>

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> array = {2, 1, 2, 2, 2, 3, 4, 2};
      int toMove = 2;
      vector<int> expectedStart = {1, 3, 4};
      vector<int> expectedEnd = {2, 2, 2, 2, 2};
      vector<int> output = moveElementToEnd(array, toMove);
      assert(output.size() == array.size());
      vector<int> outputStart = vector<int>(output.begin(), output.begin() + 3);
      sort(outputStart.begin(), outputStart.end());
      vector<int> outputEnd = vector<int>(output.begin() + 3, output.end());
      assert(outputStart == expectedStart);
      assert(outputEnd == expectedEnd);
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
		List<int> array = new List<int>(){
			2, 1, 2, 2, 2, 3, 4, 2
		};
		int toMove = 2;
		List<int> expectedStart = new List<int>(){
			1, 3, 4
		};
		List<int> expectedEnd = new List<int>(){
			2, 2, 2, 2, 2
		};
		List<int> output = Program.MoveElementToEnd(array, toMove);
		List<int> outputStart = output.GetRange(0, 3);
		outputStart.Sort();
		List<int> outputEnd = output.GetRange(3, output.Count-3);
		Utils.AssertTrue(outputStart.SequenceEqual(expectedStart));
		Utils.AssertTrue(outputEnd.SequenceEqual(expectedEnd));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n) time | O(1) space - where n is the length of the array
	public static List<int> MoveElementToEnd(List<int> array, int toMove) {
		int i = 0;
		int j = array.Count - 1;
		while (i < j) {
			while (i < j && array[j] == toMove) j--;
			if (array[i] == toMove) Swap(i, j, array);
			i++;
		}
		return array;
	}

	public static void Swap(int i, int j, List<int> array) {
		int temp = array[j];
		array[j] =  array[i];
		array[i] =  temp;
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
		List<int> array = new List<int>(){
			2, 1, 2, 2, 2, 3, 4, 2
		};
		int toMove = 2;
		List<int> expectedStart = new List<int>(){
			1, 3, 4
		};
		List<int> expectedEnd = new List<int>(){
			2, 2, 2, 2, 2
		};
		List<int> output = Program.MoveElementToEnd(array, toMove);
		List<int> outputStart = output.GetRange(0, 3);
		outputStart.Sort();
		List<int> outputEnd = output.GetRange(3, output.Count-3);
		Utils.AssertTrue(outputStart.SequenceEqual(expectedStart));
		Utils.AssertTrue(outputEnd.SequenceEqual(expectedEnd));
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
	"sort"

	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	array := []int{2, 1, 2, 2, 2, 3, 4, 2}
	toMove := 2
	expected := []int{1, 3, 4, 2, 2, 2, 2, 2}
	output := MoveElementToEnd(array, toMove)
	sort.Ints(output[0:3])
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space - where n is the length of the array
func MoveElementToEnd(array []int, toMove int) []int {
	i, j := 0, len(array)-1
	for i < j {
		for i < j && array[j] == toMove {
			j--
		}
		if array[i] == toMove {
			array[i], array[j] = array[j], array[i]
		}
		i++
	}
	return array
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"sort"

	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	array := []int{2, 1, 2, 2, 2, 3, 4, 2}
	toMove := 2
	expected := []int{1, 3, 4, 2, 2, 2, 2, 2}
	output := MoveElementToEnd(array, toMove)
	sort.Ints(output[0:3])
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
    List<Integer> array = new ArrayList<Integer>(Arrays.asList(2, 1, 2, 2, 2, 3, 4, 2));
    int toMove = 2;
    List<Integer> expectedStart = new ArrayList<Integer>(Arrays.asList(1, 3, 4));
    List<Integer> expectedEnd = new ArrayList<Integer>(Arrays.asList(2, 2, 2, 2, 2));
    List<Integer> output = Program.moveElementToEnd(array, toMove);
    List<Integer> outputStart = output.subList(0, 3);
    outputStart.sort(Comparator.naturalOrder());
    List<Integer> outputEnd = output.subList(3, output.size());
    Utils.assertTrue(outputStart.equals(expectedStart));
    Utils.assertTrue(outputEnd.equals(expectedEnd));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(1) space - where n is the length of the array
  public static List<Integer> moveElementToEnd(List<Integer> array, int toMove) {
    int i = 0;
    int j = array.size() - 1;
    while (i < j) {
      while (i < j && array.get(j) == toMove) j--;
      if (array.get(i) == toMove) swap(i, j, array);
      i++;
    }
    return array;
  }

  public static void swap(int i, int j, List<Integer> array) {
    int temp = array.get(j);
    array.set(j, array.get(i));
    array.set(i, temp);
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    List<Integer> array = new ArrayList<Integer>(Arrays.asList(2, 1, 2, 2, 2, 3, 4, 2));
    int toMove = 2;
    List<Integer> expectedStart = new ArrayList<Integer>(Arrays.asList(1, 3, 4));
    List<Integer> expectedEnd = new ArrayList<Integer>(Arrays.asList(2, 2, 2, 2, 2));
    List<Integer> output = Program.moveElementToEnd(array, toMove);
    List<Integer> outputStart = output.subList(0, 3);
    outputStart.sort(Comparator.naturalOrder());
    List<Integer> outputEnd = output.subList(3, output.size());
    Utils.assertTrue(outputStart.equals(expectedStart));
    Utils.assertTrue(outputEnd.equals(expectedEnd));
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
  const array = [2, 1, 2, 2, 2, 3, 4, 2];
  const toMove = 2;
  const expectedStart = [1, 3, 4];
  const expectedEnd = [2, 2, 2, 2, 2];
  const output = program.moveElementToEnd(array, toMove);
  const outputStart = sorted(output.slice(0, 3));
  const outputEnd = output.slice(3);
  chai.expect(outputStart).to.deep.equal(expectedStart);
  chai.expect(outputEnd).to.deep.equal(expectedEnd);
});

const sorted = array => array.sort((a, b) => a - b);

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the array
function moveElementToEnd(array, toMove) {
  let i = 0;
  let j = array.length - 1;
  while (i < j) {
    while (i < j && array[j] === toMove) j--;
    if (array[i] === toMove) swap(i, j, array);
    i++;
  }
  return array;
}

function swap(i, j, array) {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

exports.moveElementToEnd = moveElementToEnd;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const array = [2, 1, 2, 2, 2, 3, 4, 2];
  const toMove = 2;
  const expectedStart = [1, 3, 4];
  const expectedEnd = [2, 2, 2, 2, 2];
  const output = program.moveElementToEnd(array, toMove);
  const outputStart = sorted(output.slice(0, 3));
  const outputEnd = output.slice(3);
  chai.expect(outputStart).to.deep.equal(expectedStart);
  chai.expect(outputEnd).to.deep.equal(expectedEnd);
});

const sorted = array => array.sort((a, b) => a - b);

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.moveElementToEnd as moveElementToEnd

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = mutableListOf(2, 1, 2, 2, 2, 3, 4, 2)
        val toMove = 2
        val expectedStart = listOf(1, 3, 4)
        val expectedEnd = listOf(2, 2, 2, 2, 2)
        val output = moveElementToEnd(array, toMove)
        val outputStart = output.slice(0..2).toMutableList()
        outputStart.sort()
        val outputEnd = output.slice(3..output.size - 1)
        assert(outputStart.equals(expectedStart))
        assert(outputEnd.equals(expectedEnd))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(1) space - where n is the length of the array
fun moveElementToEnd(array: MutableList<Int>, toMove: Int): List<Int> {
    var i = 0
    var j = array.size - 1
    while (i < j) {
        while (i < j && array[j] == toMove) j--
        if (array[i] == toMove) swap(i, j, array)
        i++
    }
    return array
}

fun swap(i: Int, j: Int, array: MutableList<Int>) {
    val temp = array[j]
    array[j] = array[i]
    array[i] = temp
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.moveElementToEnd as moveElementToEnd

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = mutableListOf(2, 1, 2, 2, 2, 3, 4, 2)
        val toMove = 2
        val expectedStart = listOf(1, 3, 4)
        val expectedEnd = listOf(2, 2, 2, 2, 2)
        val output = moveElementToEnd(array, toMove)
        val outputStart = output.slice(0..2).toMutableList()
        outputStart.sort()
        val outputEnd = output.slice(3..output.size - 1)
        assert(outputStart.equals(expectedStart))
        assert(outputEnd.equals(expectedEnd))
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
      var array = [2, 1, 2, 2, 2, 3, 4, 2]
      let toMove = 2
      let expected = [1, 3, 4, 2, 2, 2, 2, 2]
      var output = program.moveElementToEnd(&array, toMove)
      var outputStart = output.prefix(3)
      outputStart.sort()
      var outputEnd = output.suffix(expected.count - 3)
      try assertEqual(Array(outputStart + outputEnd), expected)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the length of the array
  func moveElementToEnd(_ array: inout [Int], _ toMove: Int) -> [Int] {
    var i = 0
    var j = array.count - 1
    while i < j {
      while i < j, array[j] == toMove {
        j -= 1
      }
      if array[i] == toMove {
        (array[i], array[j]) = (array[j], array[i])
      }
      i += 1
    }
    return array
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      var array = [2, 1, 2, 2, 2, 3, 4, 2]
      let toMove = 2
      let expected = [1, 3, 4, 2, 2, 2, 2, 2]
      var output = program.moveElementToEnd(&array, toMove)
      var outputStart = output.prefix(3)
      outputStart.sort()
      var outputEnd = output.suffix(expected.count - 3)
      try assertEqual(Array(outputStart + outputEnd), expected)
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
        array = [2, 1, 2, 2, 2, 3, 4, 2]
        toMove = 2
        expectedStart = [1, 3, 4]
        expectedEnd = [2, 2, 2, 2, 2]
        output = program.moveElementToEnd(array, toMove)
        outputStart = sorted(output[0:3])
        outputEnd = output[3:]
        self.assertEqual(outputStart, expectedStart)
        self.assertEqual(outputEnd, expectedEnd)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space - where n is the length of the array
def moveElementToEnd(array, toMove):
    i = 0
    j = len(array) - 1
    while i < j:
        while i < j and array[j] == toMove:
            j -= 1
        if array[i] == toMove:
            array[i], array[j] = array[j], array[i]
        i += 1
    return array

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        array = [2, 1, 2, 2, 2, 3, 4, 2]
        toMove = 2
        expectedStart = [1, 3, 4]
        expectedEnd = [2, 2, 2, 2, 2]
        output = program.moveElementToEnd(array, toMove)
        outputStart = sorted(output[0:3])
        outputEnd = output[3:]
        self.assertEqual(outputStart, expectedStart)
        self.assertEqual(outputEnd, expectedEnd)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const array = [2, 1, 2, 2, 2, 3, 4, 2];
  const toMove = 2;
  const expectedStart = [1, 3, 4];
  const expectedEnd = [2, 2, 2, 2, 2];
  const output = program.moveElementToEnd(array, toMove);
  const outputStart = sorted(output.slice(0, 3));
  const outputEnd = output.slice(3);
  chai.expect(outputStart).to.deep.equal(expectedStart);
  chai.expect(outputEnd).to.deep.equal(expectedEnd);
});

const sorted = (array: number[]) => array.sort((a, b) => a - b);

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the array
export function moveElementToEnd(array: number[], toMove: number) {
  let i = 0;
  let j = array.length - 1;
  while (i < j) {
    while (i < j && array[j] === toMove) j--;
    if (array[i] === toMove) swap(i, j, array);
    i++;
  }
  return array;
}

function swap(i: number, j: number, array: number[]) {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const array = [2, 1, 2, 2, 2, 3, 4, 2];
  const toMove = 2;
  const expectedStart = [1, 3, 4];
  const expectedEnd = [2, 2, 2, 2, 2];
  const output = program.moveElementToEnd(array, toMove);
  const outputStart = sorted(output.slice(0, 3));
  const outputEnd = output.slice(3);
  chai.expect(outputStart).to.deep.equal(expectedStart);
  chai.expect(outputEnd).to.deep.equal(expectedEnd);
});

const sorted = (array: number[]) => array.sort((a, b) => a - b);

```

