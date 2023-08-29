# Spiral Traverse
<div class="html">
<p>
  Write a function that takes in an n x m two-dimensional array (that can be
  square-shaped when n == m) and returns a one-dimensional array of all the
  array's elements in spiral order.
</p>
<p>
  Spiral order starts at the top left corner of the two-dimensional array, goes
  to the right, and proceeds in a spiral pattern all the way until every element
  has been visited.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [
  [1,   2,  3, 4],
  [12, 13, 14, 5],
  [11, 16, 15, 6],
  [10,  9,  8, 7],
]
</pre>
<h3>Sample Output</h3>
<pre>
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
</pre>
</div>

Hint 1
<p>
You can think of the spiral that you have to traverse as a set of rectangle perimeters that progressively get smaller (i.e., that progressively move inwards in the two-dimensional array).
</p>


Hint 2

<p>
Going off of Hint #1, declare four variables: a starting row, a starting column, an ending row, and an ending column. These four variables represent the bounds of the first rectangle perimeter in the spiral that you have to traverse. Traverse that perimeter using those bounds, and then move the bounds inwards. End your algorithm once the starting row passes the ending row or the starting column passes the ending column.
</p>


Hint 3

<p>
You can solve this problem both iteratively and recursively following very similar logic.
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
    RunTest("Test Case 4", []() {
      vector<vector<int>> input = {
          {1, 2, 3, 4},
          {12, 13, 14, 5},
          {11, 16, 15, 6},
          {10, 9, 8, 7},
      };
      vector<int> expected = {1, 2,  3,  4,  5,  6,  7,  8,
                              9, 10, 11, 12, 13, 14, 15, 16};
      vector<int> actual = spiralTraverse(input);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// O(n) time | O(n) space - where n is the total number of elements in the array
vector<int> spiralTraverse(vector<vector<int>> array) {
  if (array.size() == 0)
    return {};

  vector<int> result = {};
  int startRow = 0;
  int endRow = array.size() - 1;
  int startCol = 0;
  int endCol = array[0].size() - 1;

  while (startRow <= endRow && startCol <= endCol) {
    for (int col = startCol; col <= endCol; col++) {
      result.push_back(array[startRow][col]);
    }

    for (int row = startRow + 1; row <= endRow; row++) {
      result.push_back(array[row][endCol]);
    }

    for (int col = endCol - 1; col >= startCol; col--) {
      // Handle the edge case when there's a single row
      // in the middle of the matrix. In this case, we don't
      // want to double-count the values in this row, which
      // we've already counted in the first for loop above.
      // See Test Case 8 for an example of this edge case.
      if (startRow == endRow)
        break;
      result.push_back(array[endRow][col]);
    }

    for (int row = endRow - 1; row > startRow; row--) {
      // Handle the edge case when there's a single column
      // in the middle of the matrix. In this case, we don't
      // want to double-count the values in this column, which
      // we've already counted in the second for loop above.
      // See Test Case 9 for an example of this edge case.
      if (startCol == endCol)
        break;
      result.push_back(array[row][startCol]);
    }

    startRow++;
    endRow--;
    startCol++;
    endCol--;
  }
  return result;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// O(n) time | O(n) space - where n is the total number of elements in the array
void spiralFill(vector<vector<int>> &array, int startRow, int endRow,
                int startCol, int endCol, vector<int> &result) {
  if (startRow > endRow || startCol > endCol) {
    return;
  }

  for (int col = startCol; col <= endCol; col++) {
    result.push_back(array[startRow][col]);
  }

  for (int row = startRow + 1; row <= endRow; row++) {
    result.push_back(array[row][endCol]);
  }

  for (int col = endCol - 1; col >= startCol; col--) {
    // Handle the edge case when there's a single row
    // in the middle of the matrix. In this case, we don't
    // want to double-count the values in this row, which
    // we've already counted in the first for loop above.
    // See Test Case 8 for an example of this edge case.
    if (startRow == endRow)
      break;
    result.push_back(array[endRow][col]);
  }

  for (int row = endRow - 1; row >= startRow + 1; row--) {
    // Handle the edge case when there's a single column
    // in the middle of the matrix. In this case, we don't
    // want to double-count the values in this column, which
    // we've already counted in the second for loop above.
    // See Test Case 9 for an example of this edge case.
    if (startCol == endCol)
      break;
    result.push_back(array[row][startCol]);
  }

  spiralFill(array, startRow + 1, endRow - 1, startCol + 1, endCol - 1, result);
}

vector<int> spiralTraverse(vector<vector<int>> array) {
  if (array.size() == 0)
    return {};

  vector<int> result = {};
  spiralFill(array, 0, array.size() - 1, 0, array[0].size() - 1, result);
  return result;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 4", []() {
      vector<vector<int>> input = {
          {1, 2, 3, 4},
          {12, 13, 14, 5},
          {11, 16, 15, 6},
          {10, 9, 8, 7},
      };
      vector<int> expected = {1, 2,  3,  4,  5,  6,  7,  8,
                              9, 10, 11, 12, 13, 14, 15, 16};
      vector<int> actual = spiralTraverse(input);
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
using System.Linq;
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[,] input = {
			{1, 2, 3, 4},
			{12, 13, 14, 5},
			{11, 16, 15, 6},
			{10, 9, 8, 7},
		};
		var expected = new List<int> {
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
		};
		var actual = Program.SpiralTraverse(input);
		Utils.AssertTrue(expected.SequenceEqual(actual));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n) time | O(n) space - where n is the total number of elements in the array
	public static List<int> SpiralTraverse(int[,] array) {
		if (array.GetLength(0) == 0) return new List<int>();

		var result = new List<int>();
		var startRow = 0;
		var endRow = array.GetLength(0) - 1;
		var startCol = 0;
		var endCol = array.GetLength(1) - 1;

		while (startRow <= endRow && startCol <= endCol) {
			for (int col = startCol; col <= endCol; col++) {
				result.Add(array[startRow,col]);
			}

			for (int row = startRow + 1; row <= endRow; row++) {
				result.Add(array[row,endCol]);
			}

			for (int col = endCol - 1; col >= startCol; col--) {
				// Handle the edge case when there's a single row
				// in the middle of the matrix. In this case, we don't
				// want to double-count the values in this row, which
				// we've already counted in the first for loop above.
				// See Test Case 8 for an example of this edge case.
				if (startRow == endRow) break;
				result.Add(array[endRow,col]);
			}

			for (int row = endRow - 1; row > startRow; row--) {
				// Handle the edge case when there's a single column
				// in the middle of the matrix. In this case, we don't
				// want to double-count the values in this column, which
				// we've already counted in the second for loop above.
				// See Test Case 9 for an example of this edge case.
				if (startCol == endCol) break;
				result.Add(array[row,startCol]);
			}

			startRow++;
			endRow--;
			startCol++;
			endCol--;
		}
		return result;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n) time | O(n) space - where n is the total number of elements in the array
	public static List<int> SpiralTraverse(int[,] array) {
		if (array.Length == 0) return new List<int>();

		var result = new List<int>();
		spiralFill(array, 0, array.GetLength(0) - 1, 0, array.GetLength(1) - 1, result);
		return result;
	}

	public static void spiralFill(
		int[,] array,
		int startRow,
		int endRow,
		int startCol,
		int endCol,
		List<int> result) {
		if (startRow > endRow || startCol > endCol) {
			return;
		}

		for (int col = startCol; col <= endCol; col++) {
			result.Add(array[startRow,col]);
		}

		for (int row = startRow + 1; row <= endRow; row++) {
			result.Add(array[row,endCol]);
		}

		for (int col = endCol - 1; col >= startCol; col--) {
			// Handle the edge case when there's a single row
			// in the middle of the matrix. In this case, we don't
			// want to double-count the values in this row, which
			// we've already counted in the first for loop above.
			// See Test Case 8 for an example of this edge case.
			if (startRow == endRow) break;
			result.Add(array[endRow,col]);
		}

		for (int row = endRow - 1; row >= startRow + 1; row--) {
			// Handle the edge case when there's a single column
			// in the middle of the matrix. In this case, we don't
			// want to double-count the values in this column, which
			// we've already counted in the second for loop above.
			// See Test Case 9 for an example of this edge case.
			if (startCol == endCol) break;
			result.Add(array[row,startCol]);
		}
		spiralFill(array, startRow + 1, endRow - 1, startCol + 1, endCol - 1, result);
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
		int[,] input = {
			{1, 2, 3, 4},
			{12, 13, 14, 5},
			{11, 16, 15, 6},
			{10, 9, 8, 7},
		};
		var expected = new List<int> {
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
		};
		var actual = Program.SpiralTraverse(input);
		Utils.AssertTrue(expected.SequenceEqual(actual));
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
		{1, 2, 3, 4},
		{12, 13, 14, 5},
		{11, 16, 15, 6},
		{10, 9, 8, 7},
	}
	expected := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16}
	actual := SpiralTraverse(matrix)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space - where n is the total number of elements in the array
func SpiralTraverse(array [][]int) []int {
	if len(array) == 0 {
		return []int{}
	}

	result := []int{}
	startRow, endRow := 0, len(array)-1
	startCol, endCol := 0, len(array[0])-1

	for startRow <= endRow && startCol <= endCol {
		for col := startCol; col <= endCol; col++ {
			result = append(result, array[startRow][col])
		}

		for row := startRow + 1; row <= endRow; row++ {
			result = append(result, array[row][endCol])
		}

		for col := endCol - 1; col >= startCol; col-- {
			// Handle the edge case when there's a single row
			// in the middle of the matrix. In this case, we don't
			// want to double-count the values in this row, which
			// we've already counted in the first for loop above.
			// See Test Case 8 for an example of this edge case.
			if startRow == endRow {
				break
			}
			result = append(result, array[endRow][col])
		}

		for row := endRow - 1; row > startRow; row-- {
			// Handle the edge case when there's a single column
			// in the middle of the matrix. In this case, we don't
			// want to double-count the values in this column, which
			// we've already counted in the second for loop above.
			// See Test Case 9 for an example of this edge case.
			if startCol == endCol {
				break
			}
			result = append(result, array[row][startCol])
		}

		startRow++
		endRow--
		startCol++
		endCol--
	}
	return result
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space - where n is the total number of elements in the array
func SpiralTraverse(array [][]int) []int {
	if len(array) == 0 {
		return []int{}
	}
	result := []int{}
	spiralFill(array, 0, len(array)-1, 0,
		len(array[0])-1, &result)
	return result
}

func spiralFill(array [][]int, startRow, endRow, startCol, endCol int, result *[]int) {
	if startRow > endRow || startCol > endCol {
		return
	}

	for col := startCol; col <= endCol; col++ {
		*result = append(*result, array[startRow][col])
	}

	for row := startRow + 1; row <= endRow; row++ {
		*result = append(*result, array[row][endCol])
	}

	for col := endCol - 1; col >= startCol; col-- {
		// Handle the edge case when there's a single row
		// in the middle of the matrix. In this case, we don't
		// want to double-count the values in this row, which
		// we've already counted in the first for loop above.
		// See Test Case 8 for an example of this edge case.
		if startRow == endRow {
			break
		}
		*result = append(*result, array[endRow][col])
	}

	for row := endRow - 1; row >= startRow+1; row-- {
		// Handle the edge case when there's a single column
		// in the middle of the matrix. In this case, we don't
		// want to double-count the values in this column, which
		// we've already counted in the second for loop above.
		// See Test Case 9 for an example of this edge case.
		if startCol == endCol {
			break
		}
		*result = append(*result, array[row][startCol])
	}

	spiralFill(array, startRow+1, endRow-1,
		startCol+1, endCol-1, result)
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
		{1, 2, 3, 4},
		{12, 13, 14, 5},
		{11, 16, 15, 6},
		{10, 9, 8, 7},
	}
	expected := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16}
	actual := SpiralTraverse(matrix)
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
    var input =
        new int[][] {
          {1, 2, 3, 4},
          {12, 13, 14, 5},
          {11, 16, 15, 6},
          {10, 9, 8, 7},
        };
    var expected = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    var actual = Program.spiralTraverse(input);
    Utils.assertTrue(expected.equals(actual));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(n) space - where n is the total number of elements in the array
  public static List<Integer> spiralTraverse(int[][] array) {
    if (array.length == 0) return new ArrayList<Integer>();

    var result = new ArrayList<Integer>();
    var startRow = 0;
    var endRow = array.length - 1;
    var startCol = 0;
    var endCol = array[0].length - 1;

    while (startRow <= endRow && startCol <= endCol) {
      for (int col = startCol; col <= endCol; col++) {
        result.add(array[startRow][col]);
      }

      for (int row = startRow + 1; row <= endRow; row++) {
        result.add(array[row][endCol]);
      }

      for (int col = endCol - 1; col >= startCol; col--) {
        // Handle the edge case when there's a single row
        // in the middle of the matrix. In this case, we don't
        // want to double-count the values in this row, which
        // we've already counted in the first for loop above.
        // See Test Case 8 for an example of this edge case.
        if (startRow == endRow) break;
        result.add(array[endRow][col]);
      }

      for (int row = endRow - 1; row > startRow; row--) {
        // Handle the edge case when there's a single column
        // in the middle of the matrix. In this case, we don't
        // want to double-count the values in this column, which
        // we've already counted in the second for loop above.
        // See Test Case 9 for an example of this edge case.
        if (startCol == endCol) break;
        result.add(array[row][startCol]);
      }

      startRow++;
      endRow--;
      startCol++;
      endCol--;
    }
    return result;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(n) space - where n is the total number of elements in the array
  public static List<Integer> spiralTraverse(int[][] array) {
    if (array.length == 0) return new ArrayList<Integer>();

    var result = new ArrayList<Integer>();
    spiralFill(array, 0, array.length - 1, 0, array[0].length - 1, result);
    return result;
  }

  public static void spiralFill(
      int[][] array,
      int startRow,
      int endRow,
      int startCol,
      int endCol,
      ArrayList<Integer> result) {
    if (startRow > endRow || startCol > endCol) {
      return;
    }

    for (int col = startCol; col <= endCol; col++) {
      result.add(array[startRow][col]);
    }

    for (int row = startRow + 1; row <= endRow; row++) {
      result.add(array[row][endCol]);
    }

    for (int col = endCol - 1; col >= startCol; col--) {
      // Handle the edge case when there's a single row
      // in the middle of the matrix. In this case, we don't
      // want to double-count the values in this row, which
      // we've already counted in the first for loop above.
      // See Test Case 8 for an example of this edge case.
      if (startRow == endRow) break;
      result.add(array[endRow][col]);
    }

    for (int row = endRow - 1; row >= startRow + 1; row--) {
      // Handle the edge case when there's a single column
      // in the middle of the matrix. In this case, we don't
      // want to double-count the values in this column, which
      // we've already counted in the second for loop above.
      // See Test Case 9 for an example of this edge case.
      if (startCol == endCol) break;
      result.add(array[row][startCol]);
    }
    spiralFill(array, startRow + 1, endRow - 1, startCol + 1, endCol - 1, result);
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    var input =
        new int[][] {
          {1, 2, 3, 4},
          {12, 13, 14, 5},
          {11, 16, 15, 6},
          {10, 9, 8, 7},
        };
    var expected = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    var actual = Program.spiralTraverse(input);
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
  const matrix = [
    [1, 2, 3, 4],
    [12, 13, 14, 5],
    [11, 16, 15, 6],
    [10, 9, 8, 7],
  ];
  const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  chai.expect(program.spiralTraverse(matrix)).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the total number of elements in the array
function spiralTraverse(array) {
  const result = [];
  let startRow = 0,
    endRow = array.length - 1;
  let startCol = 0,
    endCol = array[0].length - 1;

  while (startRow <= endRow && startCol <= endCol) {
    for (let col = startCol; col <= endCol; col++) {
      result.push(array[startRow][col]);
    }

    for (let row = startRow + 1; row <= endRow; row++) {
      result.push(array[row][endCol]);
    }

    for (let col = endCol - 1; col >= startCol; col--) {
      // Handle the edge case when there's a single row
      // in the middle of the matrix. In this case, we don't
      // want to double-count the values in this row, which
      // we've already counted in the first for loop above.
      // See Test Case 8 for an example of this edge case.
      if (startRow === endRow) break;
      result.push(array[endRow][col]);
    }

    for (let row = endRow - 1; row > startRow; row--) {
      // Handle the edge case when there's a single column
      // in the middle of the matrix. In this case, we don't
      // want to double-count the values in this column, which
      // we've already counted in the second for loop above.
      // See Test Case 9 for an example of this edge case.
      if (startCol === endCol) break;
      result.push(array[row][startCol]);
    }

    startRow++;
    endRow--;
    startCol++;
    endCol--;
  }

  return result;
}

exports.spiralTraverse = spiralTraverse;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the total number of elements in the array
function spiralTraverse(array) {
  const result = [];
  spiralFill(array, 0, array.length - 1, 0, array[0].length - 1, result);
  return result;
}

function spiralFill(array, startRow, endRow, startCol, endCol, result) {
  if (startRow > endRow || startCol > endCol) return;

  for (let col = startCol; col <= endCol; col++) {
    result.push(array[startRow][col]);
  }

  for (let row = startRow + 1; row <= endRow; row++) {
    result.push(array[row][endCol]);
  }

  for (let col = endCol - 1; col >= startCol; col--) {
    // Handle the edge case when there's a single row
    // in the middle of the matrix. In this case, we don't
    // want to double-count the values in this row, which
    // we've already counted in the first for loop above.
    // See Test Case 8 for an example of this edge case.
    if (startRow === endRow) break;
    result.push(array[endRow][col]);
  }

  for (let row = endRow - 1; row >= startRow + 1; row--) {
    // Handle the edge case when there's a single column
    // in the middle of the matrix. In this case, we don't
    // want to double-count the values in this column, which
    // we've already counted in the second for loop above.
    // See Test Case 9 for an example of this edge case.
    if (startCol === endCol) break;
    result.push(array[row][startCol]);
  }

  spiralFill(array, startRow + 1, endRow - 1, startCol + 1, endCol - 1, result);
}

exports.spiralTraverse = spiralTraverse;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const matrix = [
    [1, 2, 3, 4],
    [12, 13, 14, 5],
    [11, 16, 15, 6],
    [10, 9, 8, 7],
  ];
  const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  chai.expect(program.spiralTraverse(matrix)).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!


import com.algoexpert.program.spiralTraverse as spiralTraverse

class ProgramTest {
    @Test
    fun TestCase1() {
        val matrix = listOf(
            listOf(1, 2, 3, 4),
            listOf(12, 13, 14, 5),
            listOf(11, 16, 15, 6),
            listOf(10, 9, 8, 7)
        )
        val expected = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
        val output = spiralTraverse(matrix)
        assert(output.equals(expected))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(n) space - where n is the total number of elements in the array
fun spiralTraverse(array: List<List<Int>>): List<Int> {
    val result = mutableListOf<Int>()
    var startRow = 0
    var endRow = array.size - 1
    var startCol = 0
    var endCol = array[0].size - 1

    while (startRow <= endRow && startCol <= endCol) {
        for (col in startCol..endCol) {
            result.add(array[startRow][col])
        }

        for (row in startRow + 1..endRow) {
            result.add(array[row][endCol])
        }

        for (col in endCol - 1 downTo startCol) {
            // Handle the edge case when there's a single row
            // in the middle of the matrix. In this case, we don't
            // want to double-count the values in this row, which
            // we've already counted in the first for loop above.
            // See Test Case 8 for an example of this edge case.
            if (startRow == endRow) break
            result.add(array[endRow][col])
        }

        for (row in endRow - 1 downTo startRow + 1) {
            // Handle the edge case when there's a single column
            // in the middle of the matrix. In this case, we don't
            // want to double-count the values in this column, which
            // we've already counted in the second for loop above.
            // See Test Case 9 for an example of this edge case.
            if (startCol == endCol) break
            result.add(array[row][startCol])
        }

        startRow++
        endRow--
        startCol++
        endCol--
    }
    return result
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(n) space - where n is the total number of elements in the array
fun spiralTraverse(array: List<List<Int>>): List<Int> {
    val result = mutableListOf<Int>()
    spiralFill(array, 0, array.size - 1, 0, array[0].size - 1, result)
    return result
}

fun spiralFill(array: List<List<Int>>, startRow: Int, endRow: Int, startCol: Int, endCol: Int, result: MutableList<Int>) {
    if (startRow > endRow || startCol > endCol) return

    for (col in startCol..endCol) {
        result.add(array[startRow][col])
    }

    for (row in startRow + 1..endRow) {
        result.add(array[row][endCol])
    }

    for (col in endCol - 1 downTo startCol) {
        // Handle the edge case when there's a single row
        // in the middle of the matrix. In this case, we don't
        // want to double-count the values in this row, which
        // we've already counted in the first for loop above.
        // See Test Case 8 for an example of this edge case.
        if (startRow == endRow) break
        result.add(array[endRow][col])
    }

    for (row in endRow - 1 downTo startRow + 1) {
        // Handle the edge case when there's a single column
        // in the middle of the matrix. In this case, we don't
        // want to double-count the values in this column, which
        // we've already counted in the second for loop above.
        // See Test Case 9 for an example of this edge case.
        if (startCol == endCol) break
        result.add(array[row][startCol])
    }

    spiralFill(array, startRow + 1, endRow - 1, startCol + 1, endCol - 1, result)
}

```
### Unit Tests 1 (kotlin)
```kotlin

import com.algoexpert.program.spiralTraverse as spiralTraverse

class ProgramTest {
    @Test
    fun TestCase1() {
        val matrix = listOf(
            listOf(1, 2, 3, 4),
            listOf(12, 13, 14, 5),
            listOf(11, 16, 15, 6),
            listOf(10, 9, 8, 7)
        )
        val expected = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
        val output = spiralTraverse(matrix)
        assert(output.equals(expected))
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
      let input = [[1, 2, 3, 4], [12, 13, 14, 5], [11, 16, 15, 6], [10, 9, 8, 7]]
      let expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
      let actual = program.spiralTraverse(array: input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the total number of elements in the array
  func spiralTraverse(array: [[Int]]) -> [Int] {
    if array.count == 0 {
      return []
    }

    var result = [Int]()
    var startRow = 0
    var endRow = array.count - 1
    var startCol = 0
    var endCol = array[0].count - 1

    while startRow <= endRow, startCol <= endCol {
      for col in stride(from: startCol, through: endCol, by: 1) {
        result.append(array[startRow][col])
      }

      for row in stride(from: startRow + 1, through: endRow, by: 1) {
        result.append(array[row][endCol])
      }

      for col in stride(from: endCol - 1, through: startCol, by: -1) {
        // Handle the edge case when there's a single row
        // in the middle of the matrix. In this case, we don't
        // want to double-count the values in this row, which
        // we've already counted in the first for loop above.
        // See Test Case 8 for an example of this edge case.
        if startRow == endRow {
          break
        }
        result.append(array[endRow][col])
      }

      for row in stride(from: endRow - 1, through: startRow + 1, by: -1) {
        // Handle the edge case when there's a single column
        // in the middle of the matrix. In this case, we don't
        // want to double-count the values in this column, which
        // we've already counted in the second for loop above.
        // See Test Case 9 for an example of this edge case.
        if startCol == endCol {
          break
        }
        result.append(array[row][startCol])
      }

      startRow += 1
      endRow -= 1
      startCol += 1
      endCol -= 1
    }
    return result
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the total number of elements in the array
  func spiralTraverse(array: [[Int]]) -> [Int] {
    var result = [Int]()
    spiralFill(array, 0, array.count - 1, 0, array[0].count - 1, &result)
    return result
  }

  func spiralFill(_ array: [[Int]], _ startRow: Int, _ endRow: Int, _ startCol: Int, _ endCol: Int, _ result: inout [Int]) {
    if startRow > endRow || startCol > endCol {
      return
    }

    for col in stride(from: startCol, through: endCol, by: 1) {
      result.append(array[startRow][col])
    }

    for row in stride(from: startRow + 1, through: endRow, by: 1) {
      result.append(array[row][endCol])
    }

    for col in stride(from: endCol - 1, through: startCol, by: -1) {
      // Handle the edge case when there's a single row
      // in the middle of the matrix. In this case, we don't
      // want to double-count the values in this row, which
      // we've already counted in the first for loop above.
      // See Test Case 8 for an example of this edge case.
      if startRow == endRow {
        break
      }
      result.append(array[endRow][col])
    }

    for row in stride(from: endRow - 1, through: startRow + 1, by: -1) {
      // Handle the edge case when there's a single column
      // in the middle of the matrix. In this case, we don't
      // want to double-count the values in this column, which
      // we've already counted in the second for loop above.
      // See Test Case 9 for an example of this edge case.
      if startCol == endCol {
        break
      }
      result.append(array[row][startCol])
    }

    spiralFill(array, startRow + 1, endRow - 1,
               startCol + 1, endCol - 1, &result)
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let input = [[1, 2, 3, 4], [12, 13, 14, 5], [11, 16, 15, 6], [10, 9, 8, 7]]
      let expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
      let actual = program.spiralTraverse(array: input)
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
        matrix = [[1, 2, 3, 4], [12, 13, 14, 5], [11, 16, 15, 6], [10, 9, 8, 7]]
        expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
        self.assertEqual(program.spiralTraverse(matrix), expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the total number of elements in the array
def spiralTraverse(array):
    result = []
    startRow, endRow = 0, len(array) - 1
    startCol, endCol = 0, len(array[0]) - 1

    while startRow <= endRow and startCol <= endCol:
        for col in range(startCol, endCol + 1):
            result.append(array[startRow][col])

        for row in range(startRow + 1, endRow + 1):
            result.append(array[row][endCol])

        for col in reversed(range(startCol, endCol)):
            # Handle the edge case when there's a single row
            # in the middle of the matrix. In this case, we don't
            # want to double-count the values in this row, which
            # we've already counted in the first for loop above.
            # See Test Case 8 for an example of this edge case.
            if startRow == endRow:
                break
            result.append(array[endRow][col])

        for row in reversed(range(startRow + 1, endRow)):
            # Handle the edge case when there's a single column
            # in the middle of the matrix. In this case, we don't
            # want to double-count the values in this column, which
            # we've already counted in the second for loop above.
            # See Test Case 9 for an example of this edge case.
            if startCol == endCol:
                break
            result.append(array[row][startCol])

        startRow += 1
        endRow -= 1
        startCol += 1
        endCol -= 1

    return result

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the total number of elements in the array
def spiralTraverse(array):
    result = []
    spiralFill(array, 0, len(array) - 1, 0, len(array[0]) - 1, result)
    return result


def spiralFill(array, startRow, endRow, startCol, endCol, result):
    if startRow > endRow or startCol > endCol:
        return

    for col in range(startCol, endCol + 1):
        result.append(array[startRow][col])

    for row in range(startRow + 1, endRow + 1):
        result.append(array[row][endCol])

    for col in reversed(range(startCol, endCol)):
        # Handle the edge case when there's a single row
        # in the middle of the matrix. In this case, we don't
        # want to double-count the values in this row, which
        # we've already counted in the first for loop above.
        # See Test Case 8 for an example of this edge case.
        if startRow == endRow:
            break
        result.append(array[endRow][col])

    for row in reversed(range(startRow + 1, endRow)):
        # Handle the edge case when there's a single column
        # in the middle of the matrix. In this case, we don't
        # want to double-count the values in this column, which
        # we've already counted in the second for loop above.
        # See Test Case 9 for an example of this edge case.
        if startCol == endCol:
            break
        result.append(array[row][startCol])

    spiralFill(array, startRow + 1, endRow - 1, startCol + 1, endCol - 1, result)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        matrix = [[1, 2, 3, 4], [12, 13, 14, 5], [11, 16, 15, 6], [10, 9, 8, 7]]
        expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
        self.assertEqual(program.spiralTraverse(matrix), expected)

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
    [1, 2, 3, 4],
    [12, 13, 14, 5],
    [11, 16, 15, 6],
    [10, 9, 8, 7],
  ];
  const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  chai.expect(program.spiralTraverse(matrix)).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the total number of elements in the array
export function spiralTraverse(array: number[][]) {
  const result: number[] = [];
  let startRow = 0,
    endRow = array.length - 1;
  let startCol = 0,
    endCol = array[0].length - 1;

  while (startRow <= endRow && startCol <= endCol) {
    for (let col = startCol; col <= endCol; col++) {
      result.push(array[startRow][col]);
    }

    for (let row = startRow + 1; row <= endRow; row++) {
      result.push(array[row][endCol]);
    }

    for (let col = endCol - 1; col >= startCol; col--) {
      // Handle the edge case when there's a single row
      // in the middle of the matrix. In this case, we don't
      // want to double-count the values in this row, which
      // we've already counted in the first for loop above.
      // See Test Case 8 for an example of this edge case.
      if (startRow === endRow) break;
      result.push(array[endRow][col]);
    }

    for (let row = endRow - 1; row > startRow; row--) {
      // Handle the edge case when there's a single column
      // in the middle of the matrix. In this case, we don't
      // want to double-count the values in this column, which
      // we've already counted in the second for loop above.
      // See Test Case 9 for an example of this edge case.
      if (startCol === endCol) break;
      result.push(array[row][startCol]);
    }

    startRow++;
    endRow--;
    startCol++;
    endCol--;
  }

  return result;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the total number of elements in the array
export function spiralTraverse(array: number[][]) {
  const result: number[] = [];
  spiralFill(array, 0, array.length - 1, 0, array[0].length - 1, result);
  return result;
}

export function spiralFill(
  array: number[][],
  startRow: number,
  endRow: number,
  startCol: number,
  endCol: number,
  result: number[],
) {
  if (startRow > endRow || startCol > endCol) return;

  for (let col = startCol; col <= endCol; col++) {
    result.push(array[startRow][col]);
  }

  for (let row = startRow + 1; row <= endRow; row++) {
    result.push(array[row][endCol]);
  }

  for (let col = endCol - 1; col >= startCol; col--) {
    // Handle the edge case when there's a single row
    // in the middle of the matrix. In this case, we don't
    // want to double-count the values in this row, which
    // we've already counted in the first for loop above.
    // See Test Case 8 for an example of this edge case.
    if (startRow === endRow) break;
    result.push(array[endRow][col]);
  }

  for (let row = endRow - 1; row >= startRow + 1; row--) {
    // Handle the edge case when there's a single column
    // in the middle of the matrix. In this case, we don't
    // want to double-count the values in this column, which
    // we've already counted in the second for loop above.
    // See Test Case 9 for an example of this edge case.
    if (startCol === endCol) break;
    result.push(array[row][startCol]);
  }

  spiralFill(array, startRow + 1, endRow - 1, startCol + 1, endCol - 1, result);
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const matrix = [
    [1, 2, 3, 4],
    [12, 13, 14, 5],
    [11, 16, 15, 6],
    [10, 9, 8, 7],
  ];
  const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  chai.expect(program.spiralTraverse(matrix)).to.deep.equal(expected);
});

```

