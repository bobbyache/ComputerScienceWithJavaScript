# Maximum Sum Submatrix
<div class="html">
<p>
  You're given a two-dimensional array (a matrix) of potentially unequal height
  and width that's filled with integers. You're also given a positive integer
  <span>size</span>. Write a function that returns the maximum sum that can be
  generated from a submatrix with dimensions <span>size * size</span>.
</p>
<p>For example, consider the following matrix:</p>
<pre>
[
  [2, 4],
  [5, 6],
  [-3, 2],
]
</pre>
<p>If <span>size = 2</span>, then the 2x2 submatrices to consider are:</p>
<pre>
[2, 4]
[5, 6]
------
[5, 6]
[-3, 2]
</pre>
<p>
  The sum of the elements in the first submatrix is <span>17</span>, and the sum
  of the elements in the second submatrix is <span>10</span>. In this example,
  your function should return <span>17</span>.
</p>
<p>
  Note: <span>size</span> will always be at least <span>1</span>, and the
  dimensions of the input <span>matrix</span> will always be at least
  <span>size * size</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">matrix</span> = 
[
  [5, 3, -1, 5],
  [-7, 3, 7, 4],
  [12, 8, 0, 0],
  [1, -8, -8, 2],
]
<span class="CodeEditor-promptParameter">size</span> = 2
</pre>
<h3>Sample Output</h3>
<pre>
18
<span class="CodeEditor-promptComment">// [</span>
<span class="CodeEditor-promptComment">//   [., ., ., .],</span>
<span class="CodeEditor-promptComment">//   [., 3, 7, .],</span>
<span class="CodeEditor-promptComment">//   [., 8, 0, .],</span>
<span class="CodeEditor-promptComment">//   [., ., ., .],</span>
<span class="CodeEditor-promptComment">// ]</span>
</pre>
</div>

Hint 1
<p>
  The brute-force approach to solve this problem involves simply considering all
  possible submatrices of size <span>size * size</span>, determining their sums,
  and finally returning the maximum sum. This approach is acceptable, but it
  isn't optimal. Why isn't it optimal?
</p>


Hint 2

<p>
  The approach stated in Hint #1 isn't optimal because it repeats some
  additions. When considering submatrices of any size larger than
  <span>1</span>, it's almost always the case that some these matrices will have
  overlapping elements, meaning that we'll repeatedly add up the same numbers.
  If we were to use the brute-force approach, we would get a time complexity of
  <span>O(width * height * size)</span>. To achieve a more optimal time
  complexity, we need to avoid readding elements that have already been added.
  Can you think of a way to solve this problem in
  <span>O(width * height)</span> time?
</p>


Hint 3

<p>
  To avoid doing repeated addition, we have to use auxiliary space. Ideally,
  this extra space will allow us to determine the sum of a submatrix of any size
  in constant time. Start by creating a matrix with the same dimensions as the
  input matrix (we call this matrix <span>sums</span>). The element at position
  <span>i, j</span> (where <span>i</span> is the row and <span>j</span> is the
  column) in this new matrix should be the sum of all the elements in the
  submatrix whose top left corner is at <span>0, 0</span> and whose bottom right
  corner is at <span>i, j</span>. How can you quickly fill up this new matrix,
  and how can you then use it to determine the sum of a submatrix of any size in
  constant time?
</p>


Hint 4

<p>
  The sum of a matrix whose bottom right corner is at <span>i, j</span> (where
  <span>size &lt;= i &lt;= j</span>) is simply
  <span>sums[i][j] - sums[i - size][j] - sums[i][j - size] + sums[i - size][j - size]</span>.
  See the Conceptual Overview section of this question's video explanation
  for a more in-depth explanation.
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
      vector<vector<int>> matrix = {
          {5, 3, -1, 5}, {-7, 3, 7, 4}, {12, 8, 0, 0}, {1, -8, -8, 2}};
      auto size = 2;
      auto expected = 18;
      auto actual = maximumSumSubmatrix(matrix, size);
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
#include <limits>
using namespace std;

vector<vector<int>> createSumMatrix(vector<vector<int>> matrix);

// O(w * h) time | O(w * h) space - where w is
// the width of the matrix and h is the height
int maximumSumSubmatrix(vector<vector<int>> matrix, int size) {
  vector<vector<int>> sums = createSumMatrix(matrix);
  int maxSubMatrixSum = numeric_limits<int>::min();

  for (int row = size - 1; row < matrix.size(); row++) {
    for (int col = size - 1; col < matrix[row].size(); col++) {
      int total = sums[row][col];

      int touchesTopBorder = row - size < 0;
      if (!touchesTopBorder)
        total -= sums[row - size][col];

      int touchesLeftBorder = col - size < 0;
      if (!touchesLeftBorder)
        total -= sums[row][col - size];

      int touchesTopOrLeftBorder = touchesTopBorder || touchesLeftBorder;
      if (!touchesTopOrLeftBorder)
        total += sums[row - size][col - size];

      maxSubMatrixSum = max(maxSubMatrixSum, total);
    }
  }

  return maxSubMatrixSum;
}

vector<vector<int>> createSumMatrix(vector<vector<int>> matrix) {
  vector<vector<int>> sums;
  for (int row = 0; row < matrix.size(); row++) {
    sums.push_back({});
    for (int col = 0; col < matrix[row].size(); col++) {
      sums[row].push_back(0);
    }
  }
  sums[0][0] = matrix[0][0];

  // Fill the first row.
  for (int idx = 1; idx < matrix[0].size(); idx++) {
    sums[0][idx] = sums[0][idx - 1] + matrix[0][idx];
  }

  // Fill the first column.
  for (int idx = 1; idx < matrix.size(); idx++) {
    sums[idx][0] = sums[idx - 1][0] + matrix[idx][0];
  }

  // Fill the rest of the matrix.
  for (int row = 1; row < matrix.size(); row++) {
    for (int col = 1; col < matrix[row].size(); col++) {
      sums[row][col] = sums[row - 1][col] + sums[row][col - 1] -
                       sums[row - 1][col - 1] + matrix[row][col];
    }
  }

  return sums;
}
```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> matrix = {
          {5, 3, -1, 5}, {-7, 3, 7, 4}, {12, 8, 0, 0}, {1, -8, -8, 2}};
      auto size = 2;
      auto expected = 18;
      auto actual = maximumSumSubmatrix(matrix, size);
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

using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[,] matrix = new int[,] {
			{ 5, 3, -1, 5 }, { -7, 3, 7, 4 }, { 12, 8, 0, 0 }, { 1, -8, -8, 2 }
		};
		int size = 2;
		int expected = 18;
		var actual = new Program().MaximumSumSubmatrix(matrix, size);
		Utils.AssertTrue(expected == actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	// O(w * h) time | O(w * h) space - where w is
	// the width of the matrix and h is the height
	public int MaximumSumSubmatrix(int[,] matrix, int size) {
		int[,] sums = createSumMatrix(matrix);
		int maxSubMatrixSum = Int32.MinValue;

		for (int row = size - 1; row < matrix.GetLength(0); row++) {
			for (int col = size - 1; col < matrix.GetLength(1); col++) {
				int total = sums[row,col];

				bool touchesTopBorder = (row - size < 0);
				if (!touchesTopBorder) {
					total -= sums[row - size,col];
				}

				bool touchesLeftBorder = (col - size < 0);
				if (!touchesLeftBorder) {
					total -= sums[row,col - size];
				}

				bool touchesTopOrLeftBorder =
				  (touchesTopBorder || touchesLeftBorder);
				if (!touchesTopOrLeftBorder) {
					total += sums[row - size,col - size];
				}

				maxSubMatrixSum = Math.Max(maxSubMatrixSum, total);
			}
		}

		return maxSubMatrixSum;
	}

	public int[,] createSumMatrix(int[,] matrix) {
		int[,] sums = new int[matrix.GetLength(0),matrix.GetLength(1)];
		sums[0,0] = matrix[0,0];

		// Fill the first row.
		for (int idx = 1; idx < matrix.GetLength(1); idx++) {
			sums[0,idx] = sums[0,idx - 1] + matrix[0,idx];
		}

		// Fill the first column.
		for (int idx = 1; idx < matrix.GetLength(0); idx++) {
			sums[idx,0] = sums[idx - 1,0] + matrix[idx,0];
		}

		// Fill in the rest of the matrix.
		for (int row = 1; row < matrix.GetLength(0); row++) {
			for (int col = 1; col < matrix.GetLength(1); col++) {
				sums[row,
				  col] =
				  sums[row - 1,
				    col] +
				  sums[row,col - 1] - sums[row - 1,col - 1] + matrix[row,col];
			}
		}

		return sums;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[,] matrix = new int[,] {
			{ 5, 3, -1, 5 }, { -7, 3, 7, 4 }, { 12, 8, 0, 0 }, { 1, -8, -8, 2 }
		};
		int size = 2;
		int expected = 18;
		var actual = new Program().MaximumSumSubmatrix(matrix, size);
		Utils.AssertTrue(expected == actual);
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
	matrix := [][]int{
		{5, 3, -1, 5},
		{-7, 3, 7, 4},
		{12, 8, 0, 0},
		{1, -8, -8, 2},
	}
	size := 2
	expected := 18
	actual := MaximumSumSubmatrix(matrix, size)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"math"
)

// O(w * h) time | O(w * h) space - where w is
// the width of the matrix and h is the height
func MaximumSumSubmatrix(matrix [][]int, size int) int {
	sums := createSumMatrix(matrix)
	maxSubMatrixSum := math.MinInt32

	for row := size - 1; row < len(matrix); row++ {
		for col := size - 1; col < len(matrix[row]); col++ {
			total := sums[row][col]

			touchesTopBorder := row-size < 0
			if !touchesTopBorder {
				total -= sums[row-size][col]
			}

			touchesLeftBorder := col-size < 0
			if !touchesLeftBorder {
				total -= sums[row][col-size]
			}

			touchesTopOrLeftBorder := touchesTopBorder || touchesLeftBorder
			if !touchesTopOrLeftBorder {
				total += sums[row-size][col-size]
			}

			maxSubMatrixSum = max(maxSubMatrixSum, total)
		}
	}

	return maxSubMatrixSum
}

func createSumMatrix(matrix [][]int) [][]int {
	sums := make([][]int, len(matrix))
	for i := range sums {
		sums[i] = make([]int, len(matrix[0]))
	}
	sums[0][0] = matrix[0][0]

	// Fill the first row.
	for idx := 1; idx < len(matrix[0]); idx++ {
		sums[0][idx] = sums[0][idx-1] + matrix[0][idx]
	}

	// Fill the first column.
	for idx := 1; idx < len(matrix); idx++ {
		sums[idx][0] = sums[idx-1][0] + matrix[idx][0]
	}

	// Fill the rest of the matrix.
	for row := 1; row < len(matrix); row++ {
		for col := 1; col < len(matrix[row]); col++ {
			sums[row][col] = sums[row-1][col] + sums[row][col-1] - sums[row-1][col-1] + matrix[row][col]
		}
	}
	return sums
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	matrix := [][]int{
		{5, 3, -1, 5},
		{-7, 3, 7, 4},
		{12, 8, 0, 0},
		{1, -8, -8, 2},
	}
	size := 2
	expected := 18
	actual := MaximumSumSubmatrix(matrix, size)
	require.Equal(t, expected, actual)
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
    int[][] matrix = new int[][] {{5, 3, -1, 5}, {-7, 3, 7, 4}, {12, 8, 0, 0}, {1, -8, -8, 2}};
    int size = 2;
    int expected = 18;
    var actual = new Program().maximumSumSubmatrix(matrix, size);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(w * h) time | O(w * h) space - where w is
  // the width of the matrix and h is the height
  public int maximumSumSubmatrix(int[][] matrix, int size) {
    int[][] sums = createSumMatrix(matrix);
    int maxSubMatrixSum = Integer.MIN_VALUE;

    for (int row = size - 1; row < matrix.length; row++) {
      for (int col = size - 1; col < matrix[row].length; col++) {
        int total = sums[row][col];

        boolean touchesTopBorder = (row - size < 0);
        if (!touchesTopBorder) {
          total -= sums[row - size][col];
        }

        boolean touchesLeftBorder = (col - size < 0);
        if (!touchesLeftBorder) {
          total -= sums[row][col - size];
        }

        boolean touchesTopOrLeftBorder = (touchesTopBorder || touchesLeftBorder);
        if (!touchesTopOrLeftBorder) {
          total += sums[row - size][col - size];
        }

        maxSubMatrixSum = Math.max(maxSubMatrixSum, total);
      }
    }

    return maxSubMatrixSum;
  }

  public int[][] createSumMatrix(int[][] matrix) {
    int[][] sums = new int[matrix.length][matrix[0].length];
    sums[0][0] = matrix[0][0];

    // Fill the first row.
    for (int idx = 1; idx < matrix[0].length; idx++) {
      sums[0][idx] = sums[0][idx - 1] + matrix[0][idx];
    }

    // Fill the first column.
    for (int idx = 1; idx < matrix.length; idx++) {
      sums[idx][0] = sums[idx - 1][0] + matrix[idx][0];
    }

    // Fill in the rest of the matrix.
    for (int row = 1; row < matrix.length; row++) {
      for (int col = 1; col < matrix[0].length; col++) {
        sums[row][col] =
            sums[row - 1][col] + sums[row][col - 1] - sums[row - 1][col - 1] + matrix[row][col];
      }
    }

    return sums;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[][] matrix = new int[][] {{5, 3, -1, 5}, {-7, 3, 7, 4}, {12, 8, 0, 0}, {1, -8, -8, 2}};
    int size = 2;
    int expected = 18;
    var actual = new Program().maximumSumSubmatrix(matrix, size);
    Utils.assertTrue(expected == actual);
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
    [5, 3, -1, 5],
    [-7, 3, 7, 4],
    [12, 8, 0, 0],
    [1, -8, -8, 2],
  ];
  const size = 2;
  const expected = 18;
  const actual = program.maximumSumSubmatrix(matrix, size);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(w * h) time | O(w * h) space - where w is
// the width of the matrix and h is the height
function maximumSumSubmatrix(matrix, size) {
  const sums = createSumMatrix(matrix);
  let maxSubMatrixSum = -Infinity;

  for (let row = size - 1; row < matrix.length; row++) {
    for (let col = size - 1; col < matrix[row].length; col++) {
      let total = sums[row][col];

      const touchesTopBorder = row - size < 0;
      if (!touchesTopBorder) total -= sums[row - size][col];

      const touchesLeftBorder = col - size < 0;
      if (!touchesLeftBorder) total -= sums[row][col - size];

      const touchesTopOrLeftBorder = touchesTopBorder || touchesLeftBorder;
      if (!touchesTopOrLeftBorder) total += sums[row - size][col - size];

      maxSubMatrixSum = Math.max(maxSubMatrixSum, total);
    }
  }

  return maxSubMatrixSum;
}

function createSumMatrix(matrix) {
  const sums = [];
  for (let row = 0; row < matrix.length; row++) {
    sums.push([]);
    for (let col = 0; col < matrix[row].length; col++) {
      sums[row].push(0);
    }
  }
  sums[0][0] = matrix[0][0];

  // Fill the first row.
  for (let idx = 1; idx < matrix[0].length; idx++) {
    sums[0][idx] = sums[0][idx - 1] + matrix[0][idx];
  }

  // Fill the first column.
  for (let idx = 1; idx < matrix.length; idx++) {
    sums[idx][0] = sums[idx - 1][0] + matrix[idx][0];
  }

  // Fill the rest of the matrix.
  for (let row = 1; row < matrix.length; row++) {
    for (let col = 1; col < matrix[row].length; col++) {
      sums[row][col] = sums[row - 1][col] + sums[row][col - 1] - sums[row - 1][col - 1] + matrix[row][col];
    }
  }

  return sums;
}

// Do not edit the line below.
exports.maximumSumSubmatrix = maximumSumSubmatrix;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const matrix = [
    [5, 3, -1, 5],
    [-7, 3, 7, 4],
    [12, 8, 0, 0],
    [1, -8, -8, 2],
  ];
  const size = 2;
  const expected = 18;
  const actual = program.maximumSumSubmatrix(matrix, size);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.maximumSumSubmatrix

class ProgramTest {
    @Test
    fun TestCase1() {
        val matrix = listOf(
            listOf(5, 3, -1, 5),
            listOf(-7, 3, 7, 4),
            listOf(12, 8, 0, 0),
            listOf(1, -8, -8, 2)
        )
        val size = 2
        val expected = 18
        val output = maximumSumSubmatrix(matrix, size)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(w * h) time | O(w * h) space - where w is
// the width of the matrix and h is the height
fun maximumSumSubmatrix(matrix: List<List<Int>>, size: Int): Int {
    val sums = createSumMatrix(matrix)
    var maxSubMatrixSum = Int.MIN_VALUE

    for (row in size - 1 until matrix.size) {
        for (col in size - 1 until matrix[row].size) {
            var total = sums[row][col]

            val touchesTopBorder = row - size < 0
            if (!touchesTopBorder) total -= sums[row - size][col]

            val touchesLeftBorder = col - size < 0
            if (!touchesLeftBorder) total -= sums[row][col - size]

            val touchesTopOrLeftBorder = touchesTopBorder || touchesLeftBorder
            if (!touchesTopOrLeftBorder) total += sums[row - size][col - size]

            maxSubMatrixSum = max(maxSubMatrixSum, total)
        }
    }

    return maxSubMatrixSum
}

fun createSumMatrix(matrix: List<List<Int>>): List<List<Int>> {
    val sums = List(matrix.size, { MutableList(matrix[0].size, { 0 }) })
    sums[0][0] = matrix[0][0]

    // Fill the first row.
    for (idx in 1 until matrix[0].size) {
        sums[0][idx] = sums[0][idx - 1] + matrix[0][idx]
    }

    // Fill the first column.
    for (idx in 1 until matrix.size) {
        sums[idx][0] = sums[idx - 1][0] + matrix[idx][0]
    }

    // Fill the rest of the matrix.
    for (row in 1 until matrix.size) {
        for (col in 1 until matrix[row].size) {
            sums[row][col] = sums[row - 1][col] + sums[row][col - 1] - sums[row - 1][col - 1] + matrix[row][col]
        }
    }

    return sums
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.maximumSumSubmatrix

class ProgramTest {
    @Test
    fun TestCase1() {
        val matrix = listOf(
            listOf(5, 3, -1, 5),
            listOf(-7, 3, 7, 4),
            listOf(12, 8, 0, 0),
            listOf(1, -8, -8, 2)
        )
        val size = 2
        val expected = 18
        val output = maximumSumSubmatrix(matrix, size)
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
      var matrix = [
        [5, 3, -1, 5],
        [-7, 3, 7, 4],
        [12, 8, 0, 0],
        [1, -8, -8, 2],
      ]
      var size = 2
      var expected = 18
      var actual = Program().maximumSumSubmatrix(matrix, size)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(w * h) time | O(w * h) space - where w is
  // the width of the matrix and h is the height
  func maximumSumSubmatrix(_ matrix: [[Int]], _ size: Int) -> Int {
    var sums = createSumMatrix(matrix)
    var maxSubMatrixSum = Int.min

    for row in stride(from: size - 1, to: matrix.count, by: 1) {
      for col in stride(from: size - 1, to: matrix[row].count, by: 1) {
        var total = sums[row][col]

        let touchesTopBorder = row - size < 0
        if !touchesTopBorder {
          total -= sums[row - size][col]
        }

        let touchesLeftBorder = col - size < 0
        if !touchesLeftBorder {
          total -= sums[row][col - size]
        }

        let touchesTopOrLeftBorder = touchesTopBorder || touchesLeftBorder
        if !touchesTopOrLeftBorder {
          total += sums[row - size][col - size]
        }

        maxSubMatrixSum = max(maxSubMatrixSum, total)
      }
    }

    return maxSubMatrixSum
  }

  func createSumMatrix(_ matrix: [[Int]]) -> [[Int]] {
    var sums = Array(repeating: Array(repeating: 0, count: matrix[0].count), count: matrix.count)
    sums[0][0] = matrix[0][0]

    // Fill the first row.
    for idx in stride(from: 1, to: matrix[0].count, by: 1) {
      sums[0][idx] = sums[0][idx - 1] + matrix[0][idx]
    }

    // Fill the first column.
    for idx in stride(from: 1, to: matrix.count, by: 1) {
      sums[idx][0] = sums[idx - 1][0] + matrix[idx][0]
    }

    // Fill the rest of the matrix.
    for row in stride(from: 1, to: matrix.count, by: 1) {
      for col in stride(from: 1, to: matrix[row].count, by: 1) {
        sums[row][col] = sums[row - 1][col] + sums[row][col - 1] - sums[row - 1][col - 1] + matrix[row][col]
      }
    }
    return sums
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var matrix = [
        [5, 3, -1, 5],
        [-7, 3, 7, 4],
        [12, 8, 0, 0],
        [1, -8, -8, 2],
      ]
      var size = 2
      var expected = 18
      var actual = Program().maximumSumSubmatrix(matrix, size)
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
        matrix = [[5, 3, -1, 5], [-7, 3, 7, 4], [12, 8, 0, 0], [1, -8, -8, 2]]
        size = 2
        expected = 18
        actual = program.maximumSumSubmatrix(matrix, size)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(w * h) time | O(w * h) space - where w is
# the width of the matrix and h is the height
def maximumSumSubmatrix(matrix, size):
    sums = createSumMatrix(matrix)
    maxSubMatrixSum = float("-inf")

    for row in range(size - 1, len(matrix)):
        for col in range(size - 1, len(matrix[row])):
            total = sums[row][col]

            touchesTopBorder = row - size < 0
            if not touchesTopBorder:
                total -= sums[row - size][col]

            touchesLeftBorder = col - size < 0
            if not touchesLeftBorder:
                total -= sums[row][col - size]

            touchesTopOrLeftBorder = touchesTopBorder or touchesLeftBorder
            if not touchesTopOrLeftBorder:
                total += sums[row - size][col - size]

            maxSubMatrixSum = max(maxSubMatrixSum, total)

    return maxSubMatrixSum


def createSumMatrix(matrix):
    sums = [[0 for _ in range(len(matrix[row]))] for row in range(len(matrix))]
    sums[0][0] = matrix[0][0]

    # Fill the first row.
    for idx in range(1, len(matrix[0])):
        sums[0][idx] = sums[0][idx - 1] + matrix[0][idx]

    # Fill the first column.
    for idx in range(1, len(matrix)):
        sums[idx][0] = sums[idx - 1][0] + matrix[idx][0]

    # Fill the rest of the matrix.
    for row in range(1, len(matrix)):
        for col in range(1, len(matrix[row])):
            sums[row][col] = sums[row - 1][col] + sums[row][col - 1] - sums[row - 1][col - 1] + matrix[row][col]

    return sums

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        matrix = [[5, 3, -1, 5], [-7, 3, 7, 4], [12, 8, 0, 0], [1, -8, -8, 2]]
        size = 2
        expected = 18
        actual = program.maximumSumSubmatrix(matrix, size)
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
  const matrix = [
    [5, 3, -1, 5],
    [-7, 3, 7, 4],
    [12, 8, 0, 0],
    [1, -8, -8, 2],
  ];
  const size = 2;
  const expected = 18;
  const actual = program.maximumSumSubmatrix(matrix, size);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(w * h) time | O(w * h) space - where w is
// the width of the matrix and h is the height
export function maximumSumSubmatrix(matrix: number[][], size: number) {
  const sums = createSumMatrix(matrix);
  let maxSubMatrixSum = -Infinity;

  for (let row = size - 1; row < matrix.length; row++) {
    for (let col = size - 1; col < matrix[row].length; col++) {
      let total = sums[row][col];

      const touchesTopBorder = row - size < 0;
      if (!touchesTopBorder) total -= sums[row - size][col];

      const touchesLeftBorder = col - size < 0;
      if (!touchesLeftBorder) total -= sums[row][col - size];

      const touchesTopOrLeftBorder = touchesTopBorder || touchesLeftBorder;
      if (!touchesTopOrLeftBorder) total += sums[row - size][col - size];

      maxSubMatrixSum = Math.max(maxSubMatrixSum, total);
    }
  }

  return maxSubMatrixSum;
}

function createSumMatrix(matrix: number[][]) {
  const sums: number[][] = [];
  for (let row = 0; row < matrix.length; row++) {
    sums.push([]);
    for (let col = 0; col < matrix[row].length; col++) {
      sums[row].push(0);
    }
  }
  sums[0][0] = matrix[0][0];

  // Fill the first row.
  for (let idx = 1; idx < matrix[0].length; idx++) {
    sums[0][idx] = sums[0][idx - 1] + matrix[0][idx];
  }

  // Fill the first column.
  for (let idx = 1; idx < matrix.length; idx++) {
    sums[idx][0] = sums[idx - 1][0] + matrix[idx][0];
  }

  // Fill the rest of the matrix.
  for (let row = 1; row < matrix.length; row++) {
    for (let col = 1; col < matrix[row].length; col++) {
      sums[row][col] = sums[row - 1][col] + sums[row][col - 1] - sums[row - 1][col - 1] + matrix[row][col];
    }
  }

  return sums;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const matrix = [
    [5, 3, -1, 5],
    [-7, 3, 7, 4],
    [12, 8, 0, 0],
    [1, -8, -8, 2],
  ];
  const size = 2;
  const expected = 18;
  const actual = program.maximumSumSubmatrix(matrix, size);
  chai.expect(actual).to.deep.equal(expected);
});

```

