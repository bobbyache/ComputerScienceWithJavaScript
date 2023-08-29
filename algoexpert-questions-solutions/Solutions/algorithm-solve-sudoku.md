# Solve Sudoku
<div class="html">
<p>
  You're given a two-dimensional array that represents a 9x9 partially filled
  Sudoku board. Write a function that returns the solved Sudoku board.
</p>
<p>
  Sudoku is a famous number-placement puzzle in which you need to fill a 9x9
  grid with integers in the range of <span>1-9</span>. Each 9x9 Sudoku board is
  split into 9 3x3 subgrids, as seen in the illustration below, and starts out
  partially filled.
</p>
<pre>
- - 3 | - 2 - | 6 - - 
9 - - | 3 - 5 | - - 1 
- - 1 | 8 - 6 | 4 - -
- - - - - - - - - - - 
- - 8 | 1 - 2 | 9 - -
7 - - | - - - | - - 8 
- - 6 | 7 - 8 | 2 - -
- - - - - - - - - - -
- - 2 | 6 - 9 | 5 - - 
8 - - | 2 - 3 | - - 9
- - 5 | - 1 - | 3 - -
</pre>
<p>
  The objective is to fill the grid such that each row, column, and 3x3 subgrid
  contains the numbers <span>1-9</span> exactly once. In other words, no row may
  contain the same digit more than once, no column may contain the same digit
  more than once, and none of the 9 3x3 subgrids may contain the same digit more
  than once.
</p>
<p>
  Your input for this problem will always be a partially filled 9x9
  two-dimensional array that represents a solvable Sudoku puzzle. Every element
  in the array will be an integer in the range of <span>0-9</span>, where a
  <span>0</span> represents an empty square that must be filled by your
  algorithm.
</p>
<p>
  Note that you may modify the input array and that there will always be exactly
  one solution to each input Sudoku board.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">board</span> = 
[
  [7, 8, 0, 4, 0, 0, 1, 2, 0],
  [6, 0, 0, 0, 7, 5, 0, 0, 9],
  [0, 0, 0, 6, 0, 1, 0, 7, 8],
  [0, 0, 7, 0, 4, 0, 2, 6, 0],
  [0, 0, 1, 0, 5, 0, 9, 3, 0],
  [9, 0, 4, 0, 6, 0, 0, 0, 5],
  [0, 7, 0, 3, 0, 0, 0, 1, 2],
  [1, 2, 0, 0, 0, 7, 4, 0, 0],
  [0, 4, 9, 2, 0, 6, 0, 0, 7],
]
</pre>
<h3>Sample Output</h3>
<pre>
[
  [7, 8, 5, 4, 3, 9, 1, 2, 6],
  [6, 1, 2, 8, 7, 5, 3, 4, 9],
  [4, 9, 3, 6, 2, 1, 5, 7, 8],
  [8, 5, 7, 9, 4, 3, 2, 6, 1],
  [2, 6, 1, 7, 5, 8, 9, 3, 4],
  [9, 3, 4, 1, 6, 2, 7, 8, 5],
  [5, 7, 8, 3, 9, 4, 6, 1, 2],
  [1, 2, 6, 5, 8, 7, 4, 9, 3],
  [3, 4, 9, 2, 1, 6, 8, 5, 7],
]
</pre>
</div>

Hint 1
<p>
  The brute-force approach to this problem is to generate every possible Sudoku
  board and to check each one until you find one that's valid. The issue with
  this approach is that there are <span>9^81</span> possible 9x9 Sudoku boards.
  This is an extremely large number, which makes it practically impossible to
  take this approach. How can you avoid generating every possible Sudoku board?
</p>


Hint 2

<p>
  Keep in mind that a Sudoku board doesn't need to be entirely filled to figure
  out if it's invalid and won't lead to a solution. Try generating partially
  filled Sudoku boards until they become invalid, thereby abandoning solutions
  that will never lead to a properly solved board.
</p>


Hint 3

<p>
  The method described in Hint #2 is more formally known as backtracking. This
  involves attempting to place digits into empty positions in the Sudoku board
  and checking at each insertion if that newly inserted digit makes the Sudoku
  board invalid. If it does, then you try to insert another digit until you find
  one that doesn't invalidate the board. If it doesn't invalidate the board, you
  temporarily place that digit and continue to try to solve the rest of the
  board. If you ever reach a position where there are no valid digits to be
  inserted (every digit placed in that position leads to an invalid board), that
  means that one of the previously inserted digits is incorrect. Thus, you must
  backtrack and change previously placed digits. For more details on this
  approach, refer to the Conceptual Overview section of this question's video
  explanation.
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
      vector<vector<int>> input = {
          {7, 8, 0, 4, 0, 0, 1, 2, 0}, {6, 0, 0, 0, 7, 5, 0, 0, 9},
          {0, 0, 0, 6, 0, 1, 0, 7, 8}, {0, 0, 7, 0, 4, 0, 2, 6, 0},
          {0, 0, 1, 0, 5, 0, 9, 3, 0}, {9, 0, 4, 0, 6, 0, 0, 0, 5},
          {0, 7, 0, 3, 0, 0, 0, 1, 2}, {1, 2, 0, 0, 0, 7, 4, 0, 0},
          {0, 4, 9, 2, 0, 6, 0, 0, 7},
      };
      vector<vector<int>> expected = {
          {7, 8, 5, 4, 3, 9, 1, 2, 6}, {6, 1, 2, 8, 7, 5, 3, 4, 9},
          {4, 9, 3, 6, 2, 1, 5, 7, 8}, {8, 5, 7, 9, 4, 3, 2, 6, 1},
          {2, 6, 1, 7, 5, 8, 9, 3, 4}, {9, 3, 4, 1, 6, 2, 7, 8, 5},
          {5, 7, 8, 3, 9, 4, 6, 1, 2}, {1, 2, 6, 5, 8, 7, 4, 9, 3},
          {3, 4, 9, 2, 1, 6, 8, 5, 7},
      };
      auto actual = solveSudoku(input);
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
using namespace std;

bool solvePartialSudoku(int row, int col, vector<vector<int>> &board);
bool tryDigitsAtPosition(int row, int col, vector<vector<int>> &board);
bool isValidAtPosition(int value, int row, int col, vector<vector<int>> &board);

// O(1) time | O(1) space - assuming a 9x9 input board
vector<vector<int>> solveSudoku(vector<vector<int>> board) {
  solvePartialSudoku(0, 0, board);
  return board;
}

bool solvePartialSudoku(int row, int col, vector<vector<int>> &board) {
  int currentRow = row;
  int currentCol = col;

  if (currentCol == board[currentRow].size()) {
    currentRow++;
    currentCol = 0;
    if (currentRow == board.size())
      return true;
  }

  if (board[currentRow][currentCol] == 0) {
    return tryDigitsAtPosition(currentRow, currentCol, board);
  }

  return solvePartialSudoku(currentRow, currentCol + 1, board);
}

bool tryDigitsAtPosition(int row, int col, vector<vector<int>> &board) {
  for (int digit = 1; digit < 10; digit++) {
    if (isValidAtPosition(digit, row, col, board)) {
      board[row][col] = digit;
      if (solvePartialSudoku(row, col + 1, board))
        return true;
    }
  }

  board[row][col] = 0;
  return false;
}

bool isValidAtPosition(int value, int row, int col,
                       vector<vector<int>> &board) {
  bool rowIsValid =
      find(board[row].begin(), board[row].end(), value) == board[row].end();
  bool colIsValid = true;
  for (auto arr : board) {
    if (arr[col] == value) {
      colIsValid = false;
      break;
    }
  }

  if (!rowIsValid || !colIsValid)
    return false;

  // Check subgrid constraint.
  int subgridRowStart = row / 3 * 3;
  int subgridColStart = col / 3 * 3;
  for (int rowIdx = 0; rowIdx < 3; rowIdx++) {
    for (int colIdx = 0; colIdx < 3; colIdx++) {
      int rowToCheck = subgridRowStart + rowIdx;
      int colToCheck = subgridColStart + colIdx;
      int existingValue = board[rowToCheck][colToCheck];

      if (existingValue == value)
        return false;
    }
  }

  return true;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> input = {
          {7, 8, 0, 4, 0, 0, 1, 2, 0}, {6, 0, 0, 0, 7, 5, 0, 0, 9},
          {0, 0, 0, 6, 0, 1, 0, 7, 8}, {0, 0, 7, 0, 4, 0, 2, 6, 0},
          {0, 0, 1, 0, 5, 0, 9, 3, 0}, {9, 0, 4, 0, 6, 0, 0, 0, 5},
          {0, 7, 0, 3, 0, 0, 0, 1, 2}, {1, 2, 0, 0, 0, 7, 4, 0, 0},
          {0, 4, 9, 2, 0, 6, 0, 0, 7},
      };
      vector<vector<int>> expected = {
          {7, 8, 5, 4, 3, 9, 1, 2, 6}, {6, 1, 2, 8, 7, 5, 3, 4, 9},
          {4, 9, 3, 6, 2, 1, 5, 7, 8}, {8, 5, 7, 9, 4, 3, 2, 6, 1},
          {2, 6, 1, 7, 5, 8, 9, 3, 4}, {9, 3, 4, 1, 6, 2, 7, 8, 5},
          {5, 7, 8, 3, 9, 4, 6, 1, 2}, {1, 2, 6, 5, 8, 7, 4, 9, 3},
          {3, 4, 9, 2, 1, 6, 8, 5, 7},
      };
      auto actual = solveSudoku(input);
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
		int[][] inputValues =
		  new int[][] {
			new int[] {7, 8, 0, 4, 0, 0, 1, 2, 0},
			new int[] {6, 0, 0, 0, 7, 5, 0, 0, 9},
			new int[] {0, 0, 0, 6, 0, 1, 0, 7, 8},
			new int[] {0, 0, 7, 0, 4, 0, 2, 6, 0},
			new int[] {0, 0, 1, 0, 5, 0, 9, 3, 0},
			new int[] {9, 0, 4, 0, 6, 0, 0, 0, 5},
			new int[] {0, 7, 0, 3, 0, 0, 0, 1, 2},
			new int[] {1, 2, 0, 0, 0, 7, 4, 0, 0},
			new int[] {0, 4, 9, 2, 0, 6, 0, 0, 7}
		};
		int[][] expectedValues =
		  new int[][] {
			new int[] {7, 8, 5, 4, 3, 9, 1, 2, 6},
			new int[] {6, 1, 2, 8, 7, 5, 3, 4, 9},
			new int[] {4, 9, 3, 6, 2, 1, 5, 7, 8},
			new int[] {8, 5, 7, 9, 4, 3, 2, 6, 1},
			new int[] {2, 6, 1, 7, 5, 8, 9, 3, 4},
			new int[] {9, 3, 4, 1, 6, 2, 7, 8, 5},
			new int[] {5, 7, 8, 3, 9, 4, 6, 1, 2},
			new int[] {1, 2, 6, 5, 8, 7, 4, 9, 3},
			new int[] {3, 4, 9, 2, 1, 6, 8, 5, 7}
		};

		var input = new List<List<int> >();
		for (int i = 0; i < inputValues.Length; i++) {
			List<int> row = new List<int>();
			for (int j = 0; j < inputValues[i].Length; j++) {
				row.Add(inputValues[i][j]);
			}
			input.Add(row);
		}

		var actual = new Program().SolveSudoku(input);
		for (int i = 0; i < expectedValues.Length; i++) {
			for (int j = 0; j < expectedValues[i].Length; j++) {
				Utils.AssertEquals(actual[i][j], expectedValues[i][j]);
			}
		}
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {

	// O(1) time | O(1) space - assuming a 9x9 input board
	public List<List<int> > SolveSudoku(List<List<int> > board) {
		solvePartialSudoku(0, 0, board);
		return board;
	}

	public bool solvePartialSudoku(int row, int col, List<List<int> > board) {
		int currentRow = row;
		int currentCol = col;

		if (currentCol == board[currentRow].Count) {
			currentRow += 1;
			currentCol = 0;
			if (currentRow == board.Count) {
				return true; // board is completed
			}
		}

		if (board[currentRow][currentCol] == 0) {
			return tryDigitsAtPosition(currentRow, currentCol, board);
		}

		return solvePartialSudoku(currentRow, currentCol + 1, board);
	}

	public bool tryDigitsAtPosition(int row, int col, List<List<int> > board) {

		for (int digit = 1; digit < 10; digit++) {
			if (isValidAtPosition(digit, row, col, board)) {
				board[row][col] = digit;
				if (solvePartialSudoku(row, col + 1, board)) {
					return true;
				}
			}
		}

		board[row][col] = 0;
		return false;
	}

	public bool isValidAtPosition(
		int value, int row, int col, List<List<int> > board) {
		bool rowIsValid = !board[row].Contains(value);
		bool columnIsValid = true;

		for (int r = 0; r < board.Count; r++) {
			if (board[r][col] == value) columnIsValid = false;
		}

		if (!rowIsValid || !columnIsValid) {
			return false;
		}

		// Check subgrid constraints
		int subgridRowStart = (row / 3) * 3;
		int subgridColStart = (col / 3) * 3;

		for (int rowIdx = 0; rowIdx < 3; rowIdx++) {
			for (int colIdx = 0; colIdx < 3; colIdx++) {
				int rowToCheck = subgridRowStart + rowIdx;
				int colToCheck = subgridColStart + colIdx;
				int existingValue = board[rowToCheck][colToCheck];

				if (existingValue == value) {
					return false;
				}
			}
		}

		return true;
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
		int[][] inputValues =
		  new int[][] {
			new int[] {7, 8, 0, 4, 0, 0, 1, 2, 0},
			new int[] {6, 0, 0, 0, 7, 5, 0, 0, 9},
			new int[] {0, 0, 0, 6, 0, 1, 0, 7, 8},
			new int[] {0, 0, 7, 0, 4, 0, 2, 6, 0},
			new int[] {0, 0, 1, 0, 5, 0, 9, 3, 0},
			new int[] {9, 0, 4, 0, 6, 0, 0, 0, 5},
			new int[] {0, 7, 0, 3, 0, 0, 0, 1, 2},
			new int[] {1, 2, 0, 0, 0, 7, 4, 0, 0},
			new int[] {0, 4, 9, 2, 0, 6, 0, 0, 7}
		};
		int[][] expectedValues =
		  new int[][] {
			new int[] {7, 8, 5, 4, 3, 9, 1, 2, 6},
			new int[] {6, 1, 2, 8, 7, 5, 3, 4, 9},
			new int[] {4, 9, 3, 6, 2, 1, 5, 7, 8},
			new int[] {8, 5, 7, 9, 4, 3, 2, 6, 1},
			new int[] {2, 6, 1, 7, 5, 8, 9, 3, 4},
			new int[] {9, 3, 4, 1, 6, 2, 7, 8, 5},
			new int[] {5, 7, 8, 3, 9, 4, 6, 1, 2},
			new int[] {1, 2, 6, 5, 8, 7, 4, 9, 3},
			new int[] {3, 4, 9, 2, 1, 6, 8, 5, 7}
		};

		var input = new List<List<int> >();
		for (int i = 0; i < inputValues.Length; i++) {
			List<int> row = new List<int>();
			for (int j = 0; j < inputValues[i].Length; j++) {
				row.Add(inputValues[i][j]);
			}
			input.Add(row);
		}

		var actual = new Program().SolveSudoku(input);
		for (int i = 0; i < expectedValues.Length; i++) {
			for (int j = 0; j < expectedValues[i].Length; j++) {
				Utils.AssertEquals(actual[i][j], expectedValues[i][j]);
			}
		}
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
	input := [][]int{
		{7, 8, 0, 4, 0, 0, 1, 2, 0},
		{6, 0, 0, 0, 7, 5, 0, 0, 9},
		{0, 0, 0, 6, 0, 1, 0, 7, 8},
		{0, 0, 7, 0, 4, 0, 2, 6, 0},
		{0, 0, 1, 0, 5, 0, 9, 3, 0},
		{9, 0, 4, 0, 6, 0, 0, 0, 5},
		{0, 7, 0, 3, 0, 0, 0, 1, 2},
		{1, 2, 0, 0, 0, 7, 4, 0, 0},
		{0, 4, 9, 2, 0, 6, 0, 0, 7},
	}
	expected := [][]int{
		{7, 8, 5, 4, 3, 9, 1, 2, 6},
		{6, 1, 2, 8, 7, 5, 3, 4, 9},
		{4, 9, 3, 6, 2, 1, 5, 7, 8},
		{8, 5, 7, 9, 4, 3, 2, 6, 1},
		{2, 6, 1, 7, 5, 8, 9, 3, 4},
		{9, 3, 4, 1, 6, 2, 7, 8, 5},
		{5, 7, 8, 3, 9, 4, 6, 1, 2},
		{1, 2, 6, 5, 8, 7, 4, 9, 3},
		{3, 4, 9, 2, 1, 6, 8, 5, 7},
	}
	actual := SolveSudoku(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(1) time | O(1) space - assuming a 9x9 input board
func SolveSudoku(board [][]int) [][]int {
	solvePartialSudoku(0, 0, board)
	return board
}

func solvePartialSudoku(row int, col int, board [][]int) bool {
	var currentRow = row
	var currentCol = col

	if currentCol == len(board[currentRow]) {
		currentRow += 1
		currentCol = 0
		if currentRow == len(board) {
			return true // board is completed
		}
	}

	if board[currentRow][currentCol] == 0 {
		return tryDigitsAtPosition(currentRow, currentCol, board)
	}

	return solvePartialSudoku(currentRow, currentCol+1, board)
}

func tryDigitsAtPosition(row int, col int, board [][]int) bool {
	for digit := 1; digit < 10; digit++ {
		if isValidAtPosition(digit, row, col, board) {
			board[row][col] = digit
			if solvePartialSudoku(row, col+1, board) {
				return true
			}
		}
	}

	board[row][col] = 0
	return false
}

func isValidAtPosition(value int, row int, col int, board [][]int) bool {
	rowIsValid := !rowContains(board, row, value)
	columnIsValid := !columnContains(board, col, value)

	if !rowIsValid || !columnIsValid {
		return false
	}

	// Check subgrid constraint.
	subgridRowStart := (row / 3) * 3
	subgridColStart := (col / 3) * 3
	for rowIdx := 0; rowIdx < 3; rowIdx++ {
		for colIdx := 0; colIdx < 3; colIdx++ {
			rowToCheck := subgridRowStart + rowIdx
			colToCheck := subgridColStart + colIdx
			existingValue := board[rowToCheck][colToCheck]

			if existingValue == value {
				return false
			}
		}
	}

	return true
}

func rowContains(board [][]int, row int, value int) bool {
	for _, element := range board[row] {
		if value == element {
			return true
		}
	}
	return false
}

func columnContains(board [][]int, col int, value int) bool {
	for _, row := range board {
		if row[col] == value {
			return true
		}
	}
	return false
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := [][]int{
		{7, 8, 0, 4, 0, 0, 1, 2, 0},
		{6, 0, 0, 0, 7, 5, 0, 0, 9},
		{0, 0, 0, 6, 0, 1, 0, 7, 8},
		{0, 0, 7, 0, 4, 0, 2, 6, 0},
		{0, 0, 1, 0, 5, 0, 9, 3, 0},
		{9, 0, 4, 0, 6, 0, 0, 0, 5},
		{0, 7, 0, 3, 0, 0, 0, 1, 2},
		{1, 2, 0, 0, 0, 7, 4, 0, 0},
		{0, 4, 9, 2, 0, 6, 0, 0, 7},
	}
	expected := [][]int{
		{7, 8, 5, 4, 3, 9, 1, 2, 6},
		{6, 1, 2, 8, 7, 5, 3, 4, 9},
		{4, 9, 3, 6, 2, 1, 5, 7, 8},
		{8, 5, 7, 9, 4, 3, 2, 6, 1},
		{2, 6, 1, 7, 5, 8, 9, 3, 4},
		{9, 3, 4, 1, 6, 2, 7, 8, 5},
		{5, 7, 8, 3, 9, 4, 6, 1, 2},
		{1, 2, 6, 5, 8, 7, 4, 9, 3},
		{3, 4, 9, 2, 1, 6, 8, 5, 7},
	}
	actual := SolveSudoku(input)
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
    int[][] inputValues =
        new int[][] {
          {7, 8, 0, 4, 0, 0, 1, 2, 0},
          {6, 0, 0, 0, 7, 5, 0, 0, 9},
          {0, 0, 0, 6, 0, 1, 0, 7, 8},
          {0, 0, 7, 0, 4, 0, 2, 6, 0},
          {0, 0, 1, 0, 5, 0, 9, 3, 0},
          {9, 0, 4, 0, 6, 0, 0, 0, 5},
          {0, 7, 0, 3, 0, 0, 0, 1, 2},
          {1, 2, 0, 0, 0, 7, 4, 0, 0},
          {0, 4, 9, 2, 0, 6, 0, 0, 7}
        };
    int[][] expectedValues =
        new int[][] {
          {7, 8, 5, 4, 3, 9, 1, 2, 6},
          {6, 1, 2, 8, 7, 5, 3, 4, 9},
          {4, 9, 3, 6, 2, 1, 5, 7, 8},
          {8, 5, 7, 9, 4, 3, 2, 6, 1},
          {2, 6, 1, 7, 5, 8, 9, 3, 4},
          {9, 3, 4, 1, 6, 2, 7, 8, 5},
          {5, 7, 8, 3, 9, 4, 6, 1, 2},
          {1, 2, 6, 5, 8, 7, 4, 9, 3},
          {3, 4, 9, 2, 1, 6, 8, 5, 7}
        };

    var input = new ArrayList<ArrayList<Integer>>();
    for (int i = 0; i < inputValues.length; i++) {
      ArrayList<Integer> row = new ArrayList<Integer>();
      for (int j = 0; j < inputValues[i].length; j++) {
        row.add(inputValues[i][j]);
      }
      input.add(row);
    }

    var expected = new ArrayList<ArrayList<Integer>>();
    for (int i = 0; i < expectedValues.length; i++) {
      ArrayList<Integer> row = new ArrayList<Integer>();
      for (int j = 0; j < expectedValues[i].length; j++) {
        row.add(expectedValues[i][j]);
      }
      expected.add(row);
    }

    var actual = new Program().solveSudoku(input);
    Utils.assertTrue(expected.equals(actual));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(1) time | O(1) space - assuming a 9x9 input board
  public ArrayList<ArrayList<Integer>> solveSudoku(ArrayList<ArrayList<Integer>> board) {
    solvePartialSudoku(0, 0, board);
    return board;
  }

  public boolean solvePartialSudoku(int row, int col, ArrayList<ArrayList<Integer>> board) {
    int currentRow = row;
    int currentCol = col;

    if (currentCol == board.get(currentRow).size()) {
      currentRow += 1;
      currentCol = 0;
      if (currentRow == board.size()) {
        return true; // board is completed
      }
    }

    if (board.get(currentRow).get(currentCol) == 0) {
      return tryDigitsAtPosition(currentRow, currentCol, board);
    }

    return solvePartialSudoku(currentRow, currentCol + 1, board);
  }

  public boolean tryDigitsAtPosition(int row, int col, ArrayList<ArrayList<Integer>> board) {

    for (int digit = 1; digit < 10; digit++) {
      if (isValidAtPosition(digit, row, col, board)) {
        board.get(row).set(col, digit);
        if (solvePartialSudoku(row, col + 1, board)) {
          return true;
        }
      }
    }

    board.get(row).set(col, 0);
    return false;
  }

  public boolean isValidAtPosition(
      int value, int row, int col, ArrayList<ArrayList<Integer>> board) {
    boolean rowIsValid = !board.get(row).contains(value);
    boolean columnIsValid = true;

    for (int r = 0; r < board.size(); r++) {
      if (board.get(r).get(col) == value) columnIsValid = false;
    }

    if (!rowIsValid || !columnIsValid) {
      return false;
    }

    // Check subgrid constraints
    int subgridRowStart = (row / 3) * 3;
    int subgridColStart = (col / 3) * 3;

    for (int rowIdx = 0; rowIdx < 3; rowIdx++) {
      for (int colIdx = 0; colIdx < 3; colIdx++) {
        int rowToCheck = subgridRowStart + rowIdx;
        int colToCheck = subgridColStart + colIdx;
        int existingValue = board.get(rowToCheck).get(colToCheck);

        if (existingValue == value) {
          return false;
        }
      }
    }

    return true;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[][] inputValues =
        new int[][] {
          {7, 8, 0, 4, 0, 0, 1, 2, 0},
          {6, 0, 0, 0, 7, 5, 0, 0, 9},
          {0, 0, 0, 6, 0, 1, 0, 7, 8},
          {0, 0, 7, 0, 4, 0, 2, 6, 0},
          {0, 0, 1, 0, 5, 0, 9, 3, 0},
          {9, 0, 4, 0, 6, 0, 0, 0, 5},
          {0, 7, 0, 3, 0, 0, 0, 1, 2},
          {1, 2, 0, 0, 0, 7, 4, 0, 0},
          {0, 4, 9, 2, 0, 6, 0, 0, 7}
        };
    int[][] expectedValues =
        new int[][] {
          {7, 8, 5, 4, 3, 9, 1, 2, 6},
          {6, 1, 2, 8, 7, 5, 3, 4, 9},
          {4, 9, 3, 6, 2, 1, 5, 7, 8},
          {8, 5, 7, 9, 4, 3, 2, 6, 1},
          {2, 6, 1, 7, 5, 8, 9, 3, 4},
          {9, 3, 4, 1, 6, 2, 7, 8, 5},
          {5, 7, 8, 3, 9, 4, 6, 1, 2},
          {1, 2, 6, 5, 8, 7, 4, 9, 3},
          {3, 4, 9, 2, 1, 6, 8, 5, 7}
        };

    var input = new ArrayList<ArrayList<Integer>>();
    for (int i = 0; i < inputValues.length; i++) {
      ArrayList<Integer> row = new ArrayList<Integer>();
      for (int j = 0; j < inputValues[i].length; j++) {
        row.add(inputValues[i][j]);
      }
      input.add(row);
    }

    var expected = new ArrayList<ArrayList<Integer>>();
    for (int i = 0; i < expectedValues.length; i++) {
      ArrayList<Integer> row = new ArrayList<Integer>();
      for (int j = 0; j < expectedValues[i].length; j++) {
        row.add(expectedValues[i][j]);
      }
      expected.add(row);
    }

    var actual = new Program().solveSudoku(input);
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
  const input = [
    [7, 8, 0, 4, 0, 0, 1, 2, 0],
    [6, 0, 0, 0, 7, 5, 0, 0, 9],
    [0, 0, 0, 6, 0, 1, 0, 7, 8],
    [0, 0, 7, 0, 4, 0, 2, 6, 0],
    [0, 0, 1, 0, 5, 0, 9, 3, 0],
    [9, 0, 4, 0, 6, 0, 0, 0, 5],
    [0, 7, 0, 3, 0, 0, 0, 1, 2],
    [1, 2, 0, 0, 0, 7, 4, 0, 0],
    [0, 4, 9, 2, 0, 6, 0, 0, 7],
  ];
  const expected = [
    [7, 8, 5, 4, 3, 9, 1, 2, 6],
    [6, 1, 2, 8, 7, 5, 3, 4, 9],
    [4, 9, 3, 6, 2, 1, 5, 7, 8],
    [8, 5, 7, 9, 4, 3, 2, 6, 1],
    [2, 6, 1, 7, 5, 8, 9, 3, 4],
    [9, 3, 4, 1, 6, 2, 7, 8, 5],
    [5, 7, 8, 3, 9, 4, 6, 1, 2],
    [1, 2, 6, 5, 8, 7, 4, 9, 3],
    [3, 4, 9, 2, 1, 6, 8, 5, 7],
  ];
  const actual = program.solveSudoku(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(1) time | O(1) space - assuming a 9x9 input board
function solveSudoku(board) {
  solvePartialSudoku(0, 0, board);
  return board;
}

function solvePartialSudoku(row, col, board) {
  let currentRow = row;
  let currentCol = col;

  if (currentCol === board[currentRow].length) {
    currentRow++;
    currentCol = 0;
    if (currentRow === board.length) return true;
  }

  if (board[currentRow][currentCol] === 0) {
    return tryDigitsAtPosition(currentRow, currentCol, board);
  }

  return solvePartialSudoku(currentRow, currentCol + 1, board);
}

function tryDigitsAtPosition(row, col, board) {
  for (let digit = 1; digit < 10; digit++) {
    if (isValidAtPosition(digit, row, col, board)) {
      board[row][col] = digit;
      if (solvePartialSudoku(row, col + 1, board)) return true;
    }
  }

  board[row][col] = 0;
  return false;
}

function isValidAtPosition(value, row, col, board) {
  const rowIsValid = !board[row].includes(value);
  const colIsValid = !board.map(r => r[col]).includes(value);

  if (!rowIsValid || !colIsValid) return false;

  // Check subgrid constraint.
  const subgridRowStart = Math.floor(row / 3) * 3;
  const subgridColStart = Math.floor(col / 3) * 3;
  for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
    for (let colIdx = 0; colIdx < 3; colIdx++) {
      const rowToCheck = subgridRowStart + rowIdx;
      const colToCheck = subgridColStart + colIdx;
      const existingValue = board[rowToCheck][colToCheck];

      if (existingValue === value) return false;
    }
  }

  return true;
}

// Do not edit the line below.
exports.solveSudoku = solveSudoku;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [
    [7, 8, 0, 4, 0, 0, 1, 2, 0],
    [6, 0, 0, 0, 7, 5, 0, 0, 9],
    [0, 0, 0, 6, 0, 1, 0, 7, 8],
    [0, 0, 7, 0, 4, 0, 2, 6, 0],
    [0, 0, 1, 0, 5, 0, 9, 3, 0],
    [9, 0, 4, 0, 6, 0, 0, 0, 5],
    [0, 7, 0, 3, 0, 0, 0, 1, 2],
    [1, 2, 0, 0, 0, 7, 4, 0, 0],
    [0, 4, 9, 2, 0, 6, 0, 0, 7],
  ];
  const expected = [
    [7, 8, 5, 4, 3, 9, 1, 2, 6],
    [6, 1, 2, 8, 7, 5, 3, 4, 9],
    [4, 9, 3, 6, 2, 1, 5, 7, 8],
    [8, 5, 7, 9, 4, 3, 2, 6, 1],
    [2, 6, 1, 7, 5, 8, 9, 3, 4],
    [9, 3, 4, 1, 6, 2, 7, 8, 5],
    [5, 7, 8, 3, 9, 4, 6, 1, 2],
    [1, 2, 6, 5, 8, 7, 4, 9, 3],
    [3, 4, 9, 2, 1, 6, 8, 5, 7],
  ];
  const actual = program.solveSudoku(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.solveSudoku

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(
            mutableListOf(7, 8, 0, 4, 0, 0, 1, 2, 0),
            mutableListOf(6, 0, 0, 0, 7, 5, 0, 0, 9),
            mutableListOf(0, 0, 0, 6, 0, 1, 0, 7, 8),
            mutableListOf(0, 0, 7, 0, 4, 0, 2, 6, 0),
            mutableListOf(0, 0, 1, 0, 5, 0, 9, 3, 0),
            mutableListOf(9, 0, 4, 0, 6, 0, 0, 0, 5),
            mutableListOf(0, 7, 0, 3, 0, 0, 0, 1, 2),
            mutableListOf(1, 2, 0, 0, 0, 7, 4, 0, 0),
            mutableListOf(0, 4, 9, 2, 0, 6, 0, 0, 7)
        )
        val expected = mutableListOf(
            mutableListOf(7, 8, 5, 4, 3, 9, 1, 2, 6),
            mutableListOf(6, 1, 2, 8, 7, 5, 3, 4, 9),
            mutableListOf(4, 9, 3, 6, 2, 1, 5, 7, 8),
            mutableListOf(8, 5, 7, 9, 4, 3, 2, 6, 1),
            mutableListOf(2, 6, 1, 7, 5, 8, 9, 3, 4),
            mutableListOf(9, 3, 4, 1, 6, 2, 7, 8, 5),
            mutableListOf(5, 7, 8, 3, 9, 4, 6, 1, 2),
            mutableListOf(1, 2, 6, 5, 8, 7, 4, 9, 3),
            mutableListOf(3, 4, 9, 2, 1, 6, 8, 5, 7)
        )
        val output = solveSudoku(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(1) time | O(1) space - assuming a 9x9 input board
fun solveSudoku(board: MutableList<MutableList<Int>>): MutableList<MutableList<Int>> {
    solvePartialSudoku(0, 0, board)
    return board
}

fun solvePartialSudoku(row: Int, col: Int, board: MutableList<MutableList<Int>>): Boolean {
    var currentRow = row
    var currentCol = col

    if (currentCol == board[currentRow].size) {
        currentRow += 1
        currentCol = 0
        if (currentRow == board.size) return true // board is completed
    }

    if (board[currentRow][currentCol] == 0) {
        return tryDigitsAtPosition(currentRow, currentCol, board)
    }

    return solvePartialSudoku(currentRow, currentCol + 1, board)
}

fun tryDigitsAtPosition(row: Int, col: Int, board: MutableList<MutableList<Int>>): Boolean {
    for (digit in 1 until 10) {
        if (isValidAtPosition(digit, row, col, board)) {
            board[row][col] = digit
            if (solvePartialSudoku(row, col + 1, board)) return true
        }
    }

    board[row][col] = 0
    return false
}

fun isValidAtPosition(value: Int, row: Int, col: Int, board: MutableList<MutableList<Int>>): Boolean {
    val rowIsValid = !board[row].contains(value)
    val columnIsValid = !board.map() { r -> r[col] }.contains(value)

    if (!rowIsValid || !columnIsValid) return false

    // Check subgrid constraint.
    val subgridRowStart = (row / 3) * 3
    val subgridColStart = (col / 3) * 3
    for (rowIdx in 0 until 3) {
        for (colIdx in 0 until 3) {
            val rowToCheck = subgridRowStart + rowIdx
            val colToCheck = subgridColStart + colIdx
            val existingValue = board[rowToCheck][colToCheck]

            if (existingValue == value) return false
        }
    }

    return true
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.solveSudoku

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(
            mutableListOf(7, 8, 0, 4, 0, 0, 1, 2, 0),
            mutableListOf(6, 0, 0, 0, 7, 5, 0, 0, 9),
            mutableListOf(0, 0, 0, 6, 0, 1, 0, 7, 8),
            mutableListOf(0, 0, 7, 0, 4, 0, 2, 6, 0),
            mutableListOf(0, 0, 1, 0, 5, 0, 9, 3, 0),
            mutableListOf(9, 0, 4, 0, 6, 0, 0, 0, 5),
            mutableListOf(0, 7, 0, 3, 0, 0, 0, 1, 2),
            mutableListOf(1, 2, 0, 0, 0, 7, 4, 0, 0),
            mutableListOf(0, 4, 9, 2, 0, 6, 0, 0, 7)
        )
        val expected = mutableListOf(
            mutableListOf(7, 8, 5, 4, 3, 9, 1, 2, 6),
            mutableListOf(6, 1, 2, 8, 7, 5, 3, 4, 9),
            mutableListOf(4, 9, 3, 6, 2, 1, 5, 7, 8),
            mutableListOf(8, 5, 7, 9, 4, 3, 2, 6, 1),
            mutableListOf(2, 6, 1, 7, 5, 8, 9, 3, 4),
            mutableListOf(9, 3, 4, 1, 6, 2, 7, 8, 5),
            mutableListOf(5, 7, 8, 3, 9, 4, 6, 1, 2),
            mutableListOf(1, 2, 6, 5, 8, 7, 4, 9, 3),
            mutableListOf(3, 4, 9, 2, 1, 6, 8, 5, 7)
        )
        val output = solveSudoku(input)
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
      var input = [
        [7, 8, 0, 4, 0, 0, 1, 2, 0],
        [6, 0, 0, 0, 7, 5, 0, 0, 9],
        [0, 0, 0, 6, 0, 1, 0, 7, 8],
        [0, 0, 7, 0, 4, 0, 2, 6, 0],
        [0, 0, 1, 0, 5, 0, 9, 3, 0],
        [9, 0, 4, 0, 6, 0, 0, 0, 5],
        [0, 7, 0, 3, 0, 0, 0, 1, 2],
        [1, 2, 0, 0, 0, 7, 4, 0, 0],
        [0, 4, 9, 2, 0, 6, 0, 0, 7],
      ]
      var expected = [
        [7, 8, 5, 4, 3, 9, 1, 2, 6],
        [6, 1, 2, 8, 7, 5, 3, 4, 9],
        [4, 9, 3, 6, 2, 1, 5, 7, 8],
        [8, 5, 7, 9, 4, 3, 2, 6, 1],
        [2, 6, 1, 7, 5, 8, 9, 3, 4],
        [9, 3, 4, 1, 6, 2, 7, 8, 5],
        [5, 7, 8, 3, 9, 4, 6, 1, 2],
        [1, 2, 6, 5, 8, 7, 4, 9, 3],
        [3, 4, 9, 2, 1, 6, 8, 5, 7],
      ]
      var actual = Program().solveSudoku(&input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(1) time | O(1) space - assuming a 9x9 input board
  func solveSudoku(_ board: inout [[Int]]) -> [[Int]] {
    solvePartialSudoku(0, 0, &board)
    return board
  }

  func solvePartialSudoku(_ row: Int, _ col: Int, _ board: inout [[Int]]) -> Bool {
    var currentRow = row
    var currentCol = col

    if currentCol == board[currentRow].count {
      currentRow += 1
      currentCol = 0
      if currentRow == board.count {
        return true // board is completed
      }
    }

    if board[currentRow][currentCol] == 0 {
      return tryDigitsAtPosition(currentRow, currentCol, &board)
    }

    return solvePartialSudoku(currentRow, currentCol + 1, &board)
  }

  func tryDigitsAtPosition(_ row: Int, _ col: Int, _ board: inout [[Int]]) -> Bool {
    for digit in stride(from: 1, to: 10, by: 1) {
      if isValidAtPosition(digit, row, col, board) {
        board[row][col] = digit
        if solvePartialSudoku(row, col + 1, &board) {
          return true
        }
      }
    }

    board[row][col] = 0
    return false
  }

  func isValidAtPosition(_ value: Int, _ row: Int, _ col: Int, _ board: [[Int]]) -> Bool {
    let rowIsValid = !rowContains(board, row, value)
    let columnIsValid = !columnContains(board, col, value)

    if !rowIsValid || !columnIsValid {
      return false
    }

    // Check subgrid constraint.
    let subgridRowStart = (row / 3) * 3
    let subgridColStart = (col / 3) * 3
    for rowIdx in [0, 1, 2] {
      for colIdx in [0, 1, 2] {
        let rowToCheck = subgridRowStart + rowIdx
        let colToCheck = subgridColStart + colIdx
        let existingValue = board[rowToCheck][colToCheck]

        if existingValue == value {
          return false
        }
      }
    }

    return true
  }

  func rowContains(_ board: [[Int]], _ row: Int, _ value: Int) -> Bool {
    for element in board[row] {
      if value == element {
        return true
      }
    }
    return false
  }

  func columnContains(_ board: [[Int]], _ col: Int, _ value: Int) -> Bool {
    for row in board {
      if row[col] == value {
        return true
      }
    }
    return false
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = [
        [7, 8, 0, 4, 0, 0, 1, 2, 0],
        [6, 0, 0, 0, 7, 5, 0, 0, 9],
        [0, 0, 0, 6, 0, 1, 0, 7, 8],
        [0, 0, 7, 0, 4, 0, 2, 6, 0],
        [0, 0, 1, 0, 5, 0, 9, 3, 0],
        [9, 0, 4, 0, 6, 0, 0, 0, 5],
        [0, 7, 0, 3, 0, 0, 0, 1, 2],
        [1, 2, 0, 0, 0, 7, 4, 0, 0],
        [0, 4, 9, 2, 0, 6, 0, 0, 7],
      ]
      var expected = [
        [7, 8, 5, 4, 3, 9, 1, 2, 6],
        [6, 1, 2, 8, 7, 5, 3, 4, 9],
        [4, 9, 3, 6, 2, 1, 5, 7, 8],
        [8, 5, 7, 9, 4, 3, 2, 6, 1],
        [2, 6, 1, 7, 5, 8, 9, 3, 4],
        [9, 3, 4, 1, 6, 2, 7, 8, 5],
        [5, 7, 8, 3, 9, 4, 6, 1, 2],
        [1, 2, 6, 5, 8, 7, 4, 9, 3],
        [3, 4, 9, 2, 1, 6, 8, 5, 7],
      ]
      var actual = Program().solveSudoku(&input)
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
        input = [
            [7, 8, 0, 4, 0, 0, 1, 2, 0],
            [6, 0, 0, 0, 7, 5, 0, 0, 9],
            [0, 0, 0, 6, 0, 1, 0, 7, 8],
            [0, 0, 7, 0, 4, 0, 2, 6, 0],
            [0, 0, 1, 0, 5, 0, 9, 3, 0],
            [9, 0, 4, 0, 6, 0, 0, 0, 5],
            [0, 7, 0, 3, 0, 0, 0, 1, 2],
            [1, 2, 0, 0, 0, 7, 4, 0, 0],
            [0, 4, 9, 2, 0, 6, 0, 0, 7],
        ]
        expected = [
            [7, 8, 5, 4, 3, 9, 1, 2, 6],
            [6, 1, 2, 8, 7, 5, 3, 4, 9],
            [4, 9, 3, 6, 2, 1, 5, 7, 8],
            [8, 5, 7, 9, 4, 3, 2, 6, 1],
            [2, 6, 1, 7, 5, 8, 9, 3, 4],
            [9, 3, 4, 1, 6, 2, 7, 8, 5],
            [5, 7, 8, 3, 9, 4, 6, 1, 2],
            [1, 2, 6, 5, 8, 7, 4, 9, 3],
            [3, 4, 9, 2, 1, 6, 8, 5, 7],
        ]
        actual = program.solveSudoku(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(1) time | O(1) space - assuming a 9x9 input board
def solveSudoku(board):
    solvePartialSudoku(0, 0, board)
    return board


def solvePartialSudoku(row, col, board):
    currentRow = row
    currentCol = col

    if currentCol == len(board[currentRow]):
        currentRow += 1
        currentCol = 0
        if currentRow == len(board):
            return True  # board is completed

    if board[currentRow][currentCol] == 0:
        return tryDigitsAtPosition(currentRow, currentCol, board)

    return solvePartialSudoku(currentRow, currentCol + 1, board)


def tryDigitsAtPosition(row, col, board):
    for digit in range(1, 10):
        if isValidAtPosition(digit, row, col, board):
            board[row][col] = digit
            if solvePartialSudoku(row, col + 1, board):
                return True

    board[row][col] = 0
    return False


def isValidAtPosition(value, row, col, board):
    rowIsValid = value not in board[row]
    columnIsValid = value not in map(lambda r: r[col], board)

    if not rowIsValid or not columnIsValid:
        return False

    # Check subgrid constraint.
    subgridRowStart = (row // 3) * 3
    subgridColStart = (col // 3) * 3
    for rowIdx in range(3):
        for colIdx in range(3):
            rowToCheck = subgridRowStart + rowIdx
            colToCheck = subgridColStart + colIdx
            existingValue = board[rowToCheck][colToCheck]

            if existingValue == value:
                return False

    return True

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [
            [7, 8, 0, 4, 0, 0, 1, 2, 0],
            [6, 0, 0, 0, 7, 5, 0, 0, 9],
            [0, 0, 0, 6, 0, 1, 0, 7, 8],
            [0, 0, 7, 0, 4, 0, 2, 6, 0],
            [0, 0, 1, 0, 5, 0, 9, 3, 0],
            [9, 0, 4, 0, 6, 0, 0, 0, 5],
            [0, 7, 0, 3, 0, 0, 0, 1, 2],
            [1, 2, 0, 0, 0, 7, 4, 0, 0],
            [0, 4, 9, 2, 0, 6, 0, 0, 7],
        ]
        expected = [
            [7, 8, 5, 4, 3, 9, 1, 2, 6],
            [6, 1, 2, 8, 7, 5, 3, 4, 9],
            [4, 9, 3, 6, 2, 1, 5, 7, 8],
            [8, 5, 7, 9, 4, 3, 2, 6, 1],
            [2, 6, 1, 7, 5, 8, 9, 3, 4],
            [9, 3, 4, 1, 6, 2, 7, 8, 5],
            [5, 7, 8, 3, 9, 4, 6, 1, 2],
            [1, 2, 6, 5, 8, 7, 4, 9, 3],
            [3, 4, 9, 2, 1, 6, 8, 5, 7],
        ]
        actual = program.solveSudoku(input)
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
  const input = [
    [7, 8, 0, 4, 0, 0, 1, 2, 0],
    [6, 0, 0, 0, 7, 5, 0, 0, 9],
    [0, 0, 0, 6, 0, 1, 0, 7, 8],
    [0, 0, 7, 0, 4, 0, 2, 6, 0],
    [0, 0, 1, 0, 5, 0, 9, 3, 0],
    [9, 0, 4, 0, 6, 0, 0, 0, 5],
    [0, 7, 0, 3, 0, 0, 0, 1, 2],
    [1, 2, 0, 0, 0, 7, 4, 0, 0],
    [0, 4, 9, 2, 0, 6, 0, 0, 7],
  ];
  const expected = [
    [7, 8, 5, 4, 3, 9, 1, 2, 6],
    [6, 1, 2, 8, 7, 5, 3, 4, 9],
    [4, 9, 3, 6, 2, 1, 5, 7, 8],
    [8, 5, 7, 9, 4, 3, 2, 6, 1],
    [2, 6, 1, 7, 5, 8, 9, 3, 4],
    [9, 3, 4, 1, 6, 2, 7, 8, 5],
    [5, 7, 8, 3, 9, 4, 6, 1, 2],
    [1, 2, 6, 5, 8, 7, 4, 9, 3],
    [3, 4, 9, 2, 1, 6, 8, 5, 7],
  ];
  const actual = program.solveSudoku(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(1) time | O(1) space - assuming a 9x9 input board
export function solveSudoku(board: number[][]) {
  solvePartialSudoku(0, 0, board);
  return board;
}

function solvePartialSudoku(row: number, col: number, board: number[][]): boolean {
  let currentRow = row;
  let currentCol = col;

  if (currentCol === board[currentRow].length) {
    currentRow++;
    currentCol = 0;
    if (currentRow === board.length) return true;
  }

  if (board[currentRow][currentCol] === 0) {
    return tryDigitsAtPosition(currentRow, currentCol, board);
  }

  return solvePartialSudoku(currentRow, currentCol + 1, board);
}

function tryDigitsAtPosition(row: number, col: number, board: number[][]) {
  for (let digit = 1; digit < 10; digit++) {
    if (isValidAtPosition(digit, row, col, board)) {
      board[row][col] = digit;
      if (solvePartialSudoku(row, col + 1, board)) return true;
    }
  }

  board[row][col] = 0;
  return false;
}

function isValidAtPosition(value: number, row: number, col: number, board: number[][]) {
  const rowIsValid = !board[row].includes(value);
  const colIsValid = !board.map(r => r[col]).includes(value);

  if (!rowIsValid || !colIsValid) return false;

  // Check subgrid constraint.
  const subgridRowStart = Math.floor(row / 3) * 3;
  const subgridColStart = Math.floor(col / 3) * 3;
  for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
    for (let colIdx = 0; colIdx < 3; colIdx++) {
      const rowToCheck = subgridRowStart + rowIdx;
      const colToCheck = subgridColStart + colIdx;
      const existingValue = board[rowToCheck][colToCheck];

      if (existingValue === value) return false;
    }
  }

  return true;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [
    [7, 8, 0, 4, 0, 0, 1, 2, 0],
    [6, 0, 0, 0, 7, 5, 0, 0, 9],
    [0, 0, 0, 6, 0, 1, 0, 7, 8],
    [0, 0, 7, 0, 4, 0, 2, 6, 0],
    [0, 0, 1, 0, 5, 0, 9, 3, 0],
    [9, 0, 4, 0, 6, 0, 0, 0, 5],
    [0, 7, 0, 3, 0, 0, 0, 1, 2],
    [1, 2, 0, 0, 0, 7, 4, 0, 0],
    [0, 4, 9, 2, 0, 6, 0, 0, 7],
  ];
  const expected = [
    [7, 8, 5, 4, 3, 9, 1, 2, 6],
    [6, 1, 2, 8, 7, 5, 3, 4, 9],
    [4, 9, 3, 6, 2, 1, 5, 7, 8],
    [8, 5, 7, 9, 4, 3, 2, 6, 1],
    [2, 6, 1, 7, 5, 8, 9, 3, 4],
    [9, 3, 4, 1, 6, 2, 7, 8, 5],
    [5, 7, 8, 3, 9, 4, 6, 1, 2],
    [1, 2, 6, 5, 8, 7, 4, 9, 3],
    [3, 4, 9, 2, 1, 6, 8, 5, 7],
  ];
  const actual = program.solveSudoku(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

