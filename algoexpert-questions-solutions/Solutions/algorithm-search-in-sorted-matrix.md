# Search In Sorted Matrix
<div class="html">
<p>
  You're given a two-dimensional array (a matrix) of distinct integers and a
  target integer. Each row in the matrix is sorted, and each column is also sorted; the
  matrix doesn't necessarily have the same height and width.
</p>
<p>
  Write a function that returns an array of the row and column indices of the
  target integer if it's contained in the matrix, otherwise
  <span>[-1, -1]</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">matrix</span> = [
  [1, 4, 7, 12, 15, 1000],
  [2, 5, 19, 31, 32, 1001],
  [3, 8, 24, 33, 35, 1002],
  [40, 41, 42, 44, 45, 1003],
  [99, 100, 103, 106, 128, 1004],
]
<span class="CodeEditor-promptParameter">target</span> = 44
</pre>
<h3>Sample Output</h3>
<pre>
[3, 3]
</pre>
</div>

Hint 1
<p>
Pick any number in the matrix and compare it to the target number. If this number is bigger than the target number, what does that tell you about all of the other numbers in this number's row and this number's column? What about if this number is smaller than the target number?
</p>


Hint 2

<p>
Try starting at the top right corner of the matrix, comparing the number there to the target number, and using whatever you gathered from Hint #1 to figure out what number to compare next if the top right number isn't equal to the target number. Continue until you find the target number or until you get past the extremities of the matrix.
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
      vector<vector<int>> matrix{
          {1, 4, 7, 12, 15, 1000},        {2, 5, 19, 31, 32, 1001},
          {3, 8, 24, 33, 35, 1002},       {40, 41, 42, 44, 45, 1003},
          {99, 100, 103, 106, 128, 1004},
      };
      vector<int> expected{3, 3};
      assert(searchInSortedMatrix(matrix, 44) == expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

// O(n + m) time | O(1) space
vector<int> searchInSortedMatrix(vector<vector<int>> matrix, int target) {
  int row = 0;
  int col = matrix[0].size() - 1;
  while (row < matrix.size() && col >= 0) {
    if (matrix[row][col] > target) {
      col--;
    } else if (matrix[row][col] < target) {
      row++;
    } else {
      return {row, col};
    }
  }
  return {-1, -1};
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> matrix{
          {1, 4, 7, 12, 15, 1000},        {2, 5, 19, 31, 32, 1001},
          {3, 8, 24, 33, 35, 1002},       {40, 41, 42, 44, 45, 1003},
          {99, 100, 103, 106, 128, 1004},
      };
      vector<int> expected{3, 3};
      assert(searchInSortedMatrix(matrix, 44) == expected);
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
		int[,] matrix = {
			{1, 4, 7, 12, 15, 1000},
			{2, 5, 19, 31, 32, 1001},
			{3, 8, 24, 33, 35, 1002},
			{40, 41, 42, 44, 45, 1003},
			{99, 100, 103, 106, 128, 1004},
		};
		int[] expected = {3, 3};
		int[] output = Program.SearchInSortedMatrix(matrix, 44);
		Utils.AssertTrue(compare(output, expected));
	}

	public bool compare(int[] arr1, int[] arr2) {
		if (arr1.Length != arr2.Length) {
			return false;
		}
		for (int i = 0; i < arr1.Length; i++) {
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

public class Program {
	// O(n + m) time | O(1) space
	public static int[] SearchInSortedMatrix(int[,] matrix, int target) {
		int row = 0;
		int col = matrix.GetLength(1) - 1;
		while (row < matrix.GetLength(0) && col >= 0) {
			if (matrix[row,col] > target) {
				col--;
			} else if (matrix[row,col] < target) {
				row++;
			} else {
				return new int[] {row, col};
			}
		}
		return new int[] {-1, -1};
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[,] matrix = {
			{1, 4, 7, 12, 15, 1000},
			{2, 5, 19, 31, 32, 1001},
			{3, 8, 24, 33, 35, 1002},
			{40, 41, 42, 44, 45, 1003},
			{99, 100, 103, 106, 128, 1004},
		};
		int[] expected = {3, 3};
		int[] output = Program.SearchInSortedMatrix(matrix, 44);
		Utils.AssertTrue(compare(output, expected));
	}

	public bool compare(int[] arr1, int[] arr2) {
		if (arr1.Length != arr2.Length) {
			return false;
		}
		for (int i = 0; i < arr1.Length; i++) {
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
	var matrix = [][]int{
		{1, 4, 7, 12, 15, 1000},
		{2, 5, 19, 31, 32, 1001},
		{3, 8, 24, 33, 35, 1002},
		{40, 41, 42, 44, 45, 1003},
		{99, 100, 103, 106, 128, 1004},
	}
	expected := []int{3, 3}
	output := SearchInSortedMatrix(matrix, 44)
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n + m) time | O(1) space
func SearchInSortedMatrix(matrix [][]int, target int) []int {
	row, col := 0, len(matrix[0])-1
	for row < len(matrix) && col >= 0 {
		if matrix[row][col] > target {
			col -= 1
		} else if matrix[row][col] < target {
			row += 1
		} else {
			return []int{row, col}
		}
	}
	return []int{-1, -1}
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	var matrix = [][]int{
		{1, 4, 7, 12, 15, 1000},
		{2, 5, 19, 31, 32, 1001},
		{3, 8, 24, 33, 35, 1002},
		{40, 41, 42, 44, 45, 1003},
		{99, 100, 103, 106, 128, 1004},
	}
	expected := []int{3, 3}
	output := SearchInSortedMatrix(matrix, 44)
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
    int[][] matrix = {
      {1, 4, 7, 12, 15, 1000},
      {2, 5, 19, 31, 32, 1001},
      {3, 8, 24, 33, 35, 1002},
      {40, 41, 42, 44, 45, 1003},
      {99, 100, 103, 106, 128, 1004},
    };
    int[] expected = {3, 3};
    int[] output = Program.searchInSortedMatrix(matrix, 44);
    Utils.assertTrue(compare(output, expected));
  }

  public boolean compare(int[] arr1, int[] arr2) {
    if (arr1.length != arr2.length) {
      return false;
    }
    for (int i = 0; i < arr1.length; i++) {
      if (arr1[i] != arr2[i]) {
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

class Program {
  // O(n + m) time | O(1) space
  public static int[] searchInSortedMatrix(int[][] matrix, int target) {
    int row = 0;
    int col = matrix[0].length - 1;
    while (row < matrix.length && col >= 0) {
      if (matrix[row][col] > target) {
        col--;
      } else if (matrix[row][col] < target) {
        row++;
      } else {
        return new int[] {row, col};
      }
    }
    return new int[] {-1, -1};
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    int[][] matrix = {
      {1, 4, 7, 12, 15, 1000},
      {2, 5, 19, 31, 32, 1001},
      {3, 8, 24, 33, 35, 1002},
      {40, 41, 42, 44, 45, 1003},
      {99, 100, 103, 106, 128, 1004},
    };
    int[] expected = {3, 3};
    int[] output = Program.searchInSortedMatrix(matrix, 44);
    Utils.assertTrue(compare(output, expected));
  }

  public boolean compare(int[] arr1, int[] arr2) {
    if (arr1.length != arr2.length) {
      return false;
    }
    for (int i = 0; i < arr1.length; i++) {
      if (arr1[i] != arr2[i]) {
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

it('Test Case #1', function () {
  const matrix = [
    [1, 4, 7, 12, 15, 1000],
    [2, 5, 19, 31, 32, 1001],
    [3, 8, 24, 33, 35, 1002],
    [40, 41, 42, 44, 45, 1003],
    [99, 100, 103, 106, 128, 1004],
  ];
  chai.expect(program.searchInSortedMatrix(matrix, 44)).to.deep.equal([3, 3]);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n + m) time | O(1) space
function searchInSortedMatrix(matrix, target) {
  let row = 0;
  let col = matrix[0].length - 1;
  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] > target) {
      col--;
    } else if (matrix[row][col] < target) {
      row++;
    } else {
      return [row, col];
    }
  }
  return [-1, -1];
}

exports.searchInSortedMatrix = searchInSortedMatrix;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const matrix = [
    [1, 4, 7, 12, 15, 1000],
    [2, 5, 19, 31, 32, 1001],
    [3, 8, 24, 33, 35, 1002],
    [40, 41, 42, 44, 45, 1003],
    [99, 100, 103, 106, 128, 1004],
  ];
  chai.expect(program.searchInSortedMatrix(matrix, 44)).to.deep.equal([3, 3]);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.searchInSortedMatrix

class ProgramTest {
    @Test
    fun TestCase1() {
        val matrix = listOf(
            listOf(1, 4, 7, 12, 15, 1000),
            listOf(2, 5, 19, 31, 32, 1001),
            listOf(3, 8, 24, 33, 35, 1002),
            listOf(40, 41, 42, 44, 45, 1003),
            listOf(99, 100, 103, 106, 128, 1004)
        )
        val expected = Pair(3, 3)
        val output = searchInSortedMatrix(matrix, 44)
        assert(expected.equals(output))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n + m) time | O(1) space
fun searchInSortedMatrix(matrix: List<List<Int>>, target: Int): Pair<Int, Int> {
    var row = 0
    var col = matrix[0].size - 1
    while (row < matrix.size && col >= 0) {
        if (matrix[row][col] > target) {
            col--
        } else if (matrix[row][col] < target) {
            row++
        } else {
            return Pair(row, col)
        }
    }
    return Pair(-1, -1)
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.searchInSortedMatrix

class ProgramTest {
    @Test
    fun TestCase1() {
        val matrix = listOf(
            listOf(1, 4, 7, 12, 15, 1000),
            listOf(2, 5, 19, 31, 32, 1001),
            listOf(3, 8, 24, 33, 35, 1002),
            listOf(40, 41, 42, 44, 45, 1003),
            listOf(99, 100, 103, 106, 128, 1004)
        )
        val expected = Pair(3, 3)
        val output = searchInSortedMatrix(matrix, 44)
        assert(expected.equals(output))
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
      var matrix =
        [
          [1, 4, 7, 12, 15, 1000],
          [2, 5, 19, 31, 32, 1001],
          [3, 8, 24, 33, 35, 1002],
          [40, 41, 42, 44, 45, 1003],
          [99, 100, 103, 106, 128, 1004],
        ]
      try assertEqual([3, 3], program.searchInSortedMatrix(matrix: matrix, target: 44))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n + m) time | O(1) space
  func searchInSortedMatrix(matrix: [[Int]], target: Int) -> [Int] {
    var row = 0
    var column = matrix[0].count - 1

    while row < matrix.count, column >= 0 {
      if matrix[row][column] > target {
        column = column - 1
      } else if matrix[row][column] < target {
        row = row + 1
      } else {
        return [row, column]
      }
    }

    return [-1, -1]
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      var matrix =
        [
          [1, 4, 7, 12, 15, 1000],
          [2, 5, 19, 31, 32, 1001],
          [3, 8, 24, 33, 35, 1002],
          [40, 41, 42, 44, 45, 1003],
          [99, 100, 103, 106, 128, 1004],
        ]
      try assertEqual([3, 3], program.searchInSortedMatrix(matrix: matrix, target: 44))
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
        matrix = [
            [1, 4, 7, 12, 15, 1000],
            [2, 5, 19, 31, 32, 1001],
            [3, 8, 24, 33, 35, 1002],
            [40, 41, 42, 44, 45, 1003],
            [99, 100, 103, 106, 128, 1004],
        ]
        actual = program.searchInSortedMatrix(matrix, 44)
        self.assertEqual(actual, [3, 3])

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n + m) time | O(1) space
def searchInSortedMatrix(matrix, target):
    row = 0
    col = len(matrix[0]) - 1
    while row < len(matrix) and col >= 0:
        if matrix[row][col] > target:
            col -= 1
        elif matrix[row][col] < target:
            row += 1
        else:
            return [row, col]
    return [-1, -1]

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        matrix = [
            [1, 4, 7, 12, 15, 1000],
            [2, 5, 19, 31, 32, 1001],
            [3, 8, 24, 33, 35, 1002],
            [40, 41, 42, 44, 45, 1003],
            [99, 100, 103, 106, 128, 1004],
        ]
        actual = program.searchInSortedMatrix(matrix, 44)
        self.assertEqual(actual, [3, 3])

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const matrix = [
    [1, 4, 7, 12, 15, 1000],
    [2, 5, 19, 31, 32, 1001],
    [3, 8, 24, 33, 35, 1002],
    [40, 41, 42, 44, 45, 1003],
    [99, 100, 103, 106, 128, 1004],
  ];
  chai.expect(program.searchInSortedMatrix(matrix, 44)).to.deep.equal([3, 3]);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

type Range = [number, number];

// O(n + m) time | O(1) space
export function searchInSortedMatrix(matrix: number[][], target: number): Range {
  let row = 0;
  let col = matrix[0].length - 1;
  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] > target) {
      col--;
    } else if (matrix[row][col] < target) {
      row++;
    } else {
      return [row, col];
    }
  }
  return [-1, -1];
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const matrix = [
    [1, 4, 7, 12, 15, 1000],
    [2, 5, 19, 31, 32, 1001],
    [3, 8, 24, 33, 35, 1002],
    [40, 41, 42, 44, 45, 1003],
    [99, 100, 103, 106, 128, 1004],
  ];
  chai.expect(program.searchInSortedMatrix(matrix, 44)).to.deep.equal([3, 3]);
});

```

