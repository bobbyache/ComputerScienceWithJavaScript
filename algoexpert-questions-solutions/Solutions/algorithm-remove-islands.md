# Remove Islands
<div class="html">
<p>
  You're given a two-dimensional array (a matrix) of potentially unequal height
  and width containing only <span>0</span>s and <span>1</span>s. The matrix
  represents a two-toned image, where each <span>1</span> represents black and
  each <span>0</span> represents white. An island is defined as any number of
  <span>1</span>s that are horizontally or vertically adjacent (but not
  diagonally adjacent) and that don't touch the border of the image. In other
  words, a group of horizontally or vertically adjacent <span>1</span>s isn't an
  island if any of those <span>1</span>s are in the first row, last row, first
  column, or last column of the input matrix.
</p>
<p>
  Note that an island can twist. In other words, it doesn't have to be a
  straight vertical line or a straight horizontal line; it can be L-shaped, for
  example.
</p>
<p>
  You can think of islands as patches of black that don't touch the border of
  the two-toned image.
</p>
<p>
  Write a function that returns a modified version of the input matrix, where
  all of the islands are removed. You remove an island by replacing it with
  <span>0</span>s.
</p>
<p>Naturally, you're allowed to mutate the input matrix.</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">matrix</span> = 
[
  [1, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 1, 1],
  [0, 0, 1, 0, 1, 0],
  [1, 1, 0, 0, 1, 0],
  [1, 0, 1, 1, 0, 0],
  [1, 0, 0, 0, 0, 1],
]
</pre>
<h3>Sample Output</h3>
<pre>
[
  [1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1],
  [0, 0, 0, 0, 1, 0],
  [1, 1, 0, 0, 1, 0],
  [1, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 1],
] 
<span class="CodeEditor-promptComment">// The islands that were removed can be clearly seen here:</span>
<span class="CodeEditor-promptComment">// [</span>
<span class="CodeEditor-promptComment">//   [ ,  ,  ,  ,  , ],</span>
<span class="CodeEditor-promptComment">//   [ , 1,  ,  ,  , ],</span>
<span class="CodeEditor-promptComment">//   [ ,  , 1,  ,  , ],</span>
<span class="CodeEditor-promptComment">//   [ ,  ,  ,  ,  , ],</span>
<span class="CodeEditor-promptComment">//   [ ,  , 1, 1,  , ],</span>
<span class="CodeEditor-promptComment">//   [ ,  ,  ,  ,  , ], </span>
<span class="CodeEditor-promptComment">// ]</span>
</pre>
</div>

Hint 1
<p>
How would you solve this problem if you knew the positions of all the non-island 1s?
</p>


Hint 2

<p>
Find and store the positions of all the non-island 1s. You can do this by performing a graph traversal (depth-first search, for example) on all the 1s that are on the border of the image. Afterwards, you can easily identify and remove all the island 1s from the input matrix by relying on the data structure that you used to store the positions of non-island 1s.
</p>


Hint 3

<p>
You can also solve this problem without the use of a data structure that stores the positions of non-islands 1s. Simply loop through the border of the image, and perform a depth-first search on all positions with the value 1. During this depth-first search, find all the 1s that are connected to the original position on the border, and change them from 1 to 2. After changing all non-island 1s to 2s, you can simply remove all the remaining 1s, which are guaranteed to be islands, from the matrix (by replacing them with 0s), and you can then change all the 2s back to 1s, since these were previously determined to be non-islands.
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
          {1, 0, 0, 0, 0, 0}, {0, 1, 0, 1, 1, 1}, {0, 0, 1, 0, 1, 0},
          {1, 1, 0, 0, 1, 0}, {1, 0, 1, 1, 0, 0}, {1, 0, 0, 0, 0, 1},
      };
      vector<vector<int>> expected = {
          {1, 0, 0, 0, 0, 0}, {0, 0, 0, 1, 1, 1}, {0, 0, 0, 0, 1, 0},
          {1, 1, 0, 0, 1, 0}, {1, 0, 0, 0, 0, 0}, {1, 0, 0, 0, 0, 1},
      };
      auto actual = removeIslands(input);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

void findOnesConnectedToBorder(vector<vector<int>> &matrix, int startRow,
                               int startCol,
                               vector<vector<bool>> &onesConnectedToBorder);
vector<vector<int>> getNeighbors(vector<vector<int>> &matrix, int row, int col);

// O(wh) time | O(wh) space - where w and h
// are the width and height of the input matrix
vector<vector<int>> removeIslands(vector<vector<int>> matrix) {
  vector<vector<bool>> onesConnectedToBorder;
  for (int i = 0; i < matrix.size(); i++) {
    onesConnectedToBorder.push_back(vector<bool>(matrix[0].size(), false));
  }

  // Find all the 1s that are not islands
  for (int row = 0; row < matrix.size(); row++) {
    for (int col = 0; col < matrix[row].size(); col++) {
      bool rowIsBorder = row == 0 || row == matrix.size() - 1;
      bool colIsBorder = col == 0 || col == matrix[row].size() - 1;
      bool isBorder = rowIsBorder || colIsBorder;

      if (!isBorder) {
        continue;
      }

      if (matrix[row][col] != 1) {
        continue;
      }

      findOnesConnectedToBorder(matrix, row, col, onesConnectedToBorder);
    }
  }

  for (int row = 1; row < matrix.size() - 1; row++) {
    for (int col = 1; col < matrix[row].size() - 1; col++) {
      if (onesConnectedToBorder[row][col]) {
        continue;
      }
      matrix[row][col] = 0;
    }
  }

  return matrix;
}

void findOnesConnectedToBorder(vector<vector<int>> &matrix, int startRow,
                               int startCol,
                               vector<vector<bool>> &onesConnectedToBorder) {
  vector<vector<int>> stack = {{startRow, startCol}};

  while (stack.size() > 0) {
    auto currentPosition = stack[stack.size() - 1];
    stack.pop_back();
    int currentRow = currentPosition[0];
    int currentCol = currentPosition[1];

    bool alreadyVisited = onesConnectedToBorder[currentRow][currentCol];
    if (alreadyVisited) {
      continue;
    }

    onesConnectedToBorder[currentRow][currentCol] = true;

    auto neighbors = getNeighbors(matrix, currentRow, currentCol);
    for (auto neighbor : neighbors) {
      int row = neighbor[0];
      int col = neighbor[1];

      if (matrix[row][col] != 1) {
        continue;
      }
      stack.push_back(neighbor);
    }
  }
}

vector<vector<int>> getNeighbors(vector<vector<int>> &matrix, int row,
                                 int col) {
  vector<vector<int>> neighbors;
  int numRows = matrix.size();
  int numCols = matrix[row].size();

  if (row - 1 >= 0) {
    neighbors.push_back(vector<int>{row - 1, col}); // UP
  }
  if (row + 1 < numRows) {
    neighbors.push_back(vector<int>{row + 1, col}); // DOWN
  }
  if (col - 1 >= 0) {
    neighbors.push_back(vector<int>{row, col - 1}); // LEFT
  }
  if (col + 1 < numCols) {
    neighbors.push_back(vector<int>{row, col + 1}); // RIGHT
  }
  return neighbors;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

void changeOnesConnectedToBorderToTwos(vector<vector<int>> &matrix,
                                       int startRow, int startCol);
vector<vector<int>> getNeighbors(vector<vector<int>> &matrix, int row, int col);

// O(wh) time | O(wh) space - where w and h
// are the width and height of the input matrix
vector<vector<int>> removeIslands(vector<vector<int>> matrix) {
  for (int row = 0; row < matrix.size(); row++) {
    for (int col = 0; col < matrix[row].size(); col++) {
      bool rowIsBorder = row == 0 || row == matrix.size() - 1;
      bool colIsBorder = col == 0 || col == matrix[row].size() - 1;
      bool isBorder = rowIsBorder || colIsBorder;

      if (!isBorder) {
        continue;
      }

      if (matrix[row][col] != 1) {
        continue;
      }

      changeOnesConnectedToBorderToTwos(matrix, row, col);
    }
  }

  for (int row = 0; row < matrix.size(); row++) {
    for (int col = 0; col < matrix[row].size(); col++) {
      int color = matrix[row][col];
      if (color == 1) {
        matrix[row][col] = 0;
      } else if (color == 2) {
        matrix[row][col] = 1;
      }
    }
  }

  return matrix;
}

void changeOnesConnectedToBorderToTwos(vector<vector<int>> &matrix,
                                       int startRow, int startCol) {
  vector<vector<int>> stack = {{startRow, startCol}};

  while (stack.size() > 0) {
    auto currentPosition = stack[stack.size() - 1];
    stack.pop_back();
    int currentRow = currentPosition[0];
    int currentCol = currentPosition[1];

    matrix[currentRow][currentCol] = 2;

    auto neighbors = getNeighbors(matrix, currentRow, currentCol);
    for (auto neighbor : neighbors) {
      int row = neighbor[0];
      int col = neighbor[1];

      if (matrix[row][col] != 1) {
        continue;
      }
      stack.push_back(neighbor);
    }
  }
}

vector<vector<int>> getNeighbors(vector<vector<int>> &matrix, int row,
                                 int col) {
  vector<vector<int>> neighbors;
  int numRows = matrix.size();
  int numCols = matrix[row].size();

  if (row - 1 >= 0) {
    neighbors.push_back(vector<int>{row - 1, col}); // UP
  }
  if (row + 1 < numRows) {
    neighbors.push_back(vector<int>{row + 1, col}); // DOWN
  }
  if (col - 1 >= 0) {
    neighbors.push_back(vector<int>{row, col - 1}); // LEFT
  }
  if (col + 1 < numCols) {
    neighbors.push_back(vector<int>{row, col + 1}); // RIGHT
  }
  return neighbors;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> input = {
          {1, 0, 0, 0, 0, 0}, {0, 1, 0, 1, 1, 1}, {0, 0, 1, 0, 1, 0},
          {1, 1, 0, 0, 1, 0}, {1, 0, 1, 1, 0, 0}, {1, 0, 0, 0, 0, 1},
      };
      vector<vector<int>> expected = {
          {1, 0, 0, 0, 0, 0}, {0, 0, 0, 1, 1, 1}, {0, 0, 0, 0, 1, 0},
          {1, 1, 0, 0, 1, 0}, {1, 0, 0, 0, 0, 0}, {1, 0, 0, 0, 0, 1},
      };
      auto actual = removeIslands(input);
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
		int[][] input = new int[][] {
			new int[] {1, 0, 0, 0, 0, 0},
			new int[] {0, 1, 0, 1, 1, 1},
			new int[] {0, 0, 1, 0, 1, 0},
			new int[] {1, 1, 0, 0, 1, 0},
			new int[] {1, 0, 1, 1, 0, 0},
			new int[] {1, 0, 0, 0, 0, 1},
		};
		int[][] expected = new int[][] {
			new int[] {1, 0, 0, 0, 0, 0},
			new int[] {0, 0, 0, 1, 1, 1},
			new int[] {0, 0, 0, 0, 1, 0},
			new int[] {1, 1, 0, 0, 1, 0},
			new int[] {1, 0, 0, 0, 0, 0},
			new int[] {1, 0, 0, 0, 0, 1},
		};
		int[][] actual = new Program().RemoveIslands(input);
		for (int i=0; i<actual.Length; i++) {
			for (int j=0; j<actual[i].Length; j++) {
				Utils.AssertTrue(actual[i][j] == expected[i][j]);
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

	// O(wh) time | O(wh) space - where w and h
	// are the width and height of the input matrix
	public int[][] RemoveIslands(int[][] matrix) {
		bool[,] onesConnectedToBorder = new bool[matrix.Length,matrix[0].Length];
		for (int i = 0; i < matrix.Length; i++) {
			onesConnectedToBorder[i,matrix[0].Length-1] = false;
		}

		// Find all the 1s that are not islands
		for (int row = 0; row < matrix.Length; row++) {
			for (int col = 0; col < matrix[row].Length; col++) {
				bool rowIsBorder = row == 0 || row == matrix.Length - 1;
				bool colIsBorder = col == 0 || col == matrix[row].Length - 1;
				bool isBorder = rowIsBorder || colIsBorder;

				if (!isBorder) {
					continue;
				}

				if (matrix[row][col] != 1) {
					continue;
				}

				findOnesConnectedToBorder(matrix, row, col, onesConnectedToBorder);
			}
		}

		for (int row = 1; row < matrix.Length - 1; row++) {
			for (int col = 1; col < matrix[row].Length - 1; col++) {
				if (onesConnectedToBorder[row,col]) {
					continue;
				}
				matrix[row][col] = 0;
			}
		}

		return matrix;
	}

	public void findOnesConnectedToBorder(int[][] matrix, int startRow, int startCol, bool[,
	  ] onesConnectedToBorder) {
		Stack<Tuple<int, int> > stack = new Stack<Tuple<int, int> >();
		stack.Push(new Tuple<int, int>(startRow, startCol));

		while (stack.Count > 0) {
			var currentPosition = stack.Pop();
			int currentRow = currentPosition.Item1;
			int currentCol = currentPosition.Item2;

			bool alreadyVisited = onesConnectedToBorder[currentRow,currentCol];
			if (alreadyVisited) {
				continue;
			}

			onesConnectedToBorder[currentRow,currentCol] = true;

			var neighbors = getNeighbors(matrix, currentRow, currentCol);
			foreach (var neighbor in neighbors) {
				int row = neighbor.Item1;
				int col = neighbor.Item2;

				if (matrix[row][col] != 1) {
					continue;
				}
				stack.Push(neighbor);
			}
		}
	}

	public List<Tuple<int, int> > getNeighbors(int[][] matrix, int row, int col) {
		int numRows = matrix.Length;
		int numCols = matrix[row].Length;
		List<Tuple<int, int> > neighbors = new List<Tuple<int, int> >();

		if (row - 1 >= 0) {
			neighbors.Add(new Tuple<int, int>(row - 1, col)); // UP
		}
		if (row + 1 < numRows) {
			neighbors.Add(new Tuple<int, int>(row + 1, col)); // DOWN
		}
		if (col - 1 >= 0) {
			neighbors.Add(new Tuple<int, int>(row, col - 1)); // LEFT
		}
		if (col + 1 < numCols) {
			neighbors.Add(new Tuple<int, int>(row, col + 1)); // RIGHT
		}
		return neighbors;
	}
}
```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {

	// O(wh) time | O(wh) space - where w and h
	// are the width and height of the input matrix
	public int[][] RemoveIslands(int[][] matrix) {

		for (int row = 0; row < matrix.Length; row++) {
			for (int col = 0; col < matrix[row].Length; col++) {
				bool rowIsBorder = row == 0 || row == matrix.Length - 1;
				bool colIsBorder = col == 0 || col == matrix[row].Length - 1;
				bool isBorder = rowIsBorder || colIsBorder;

				if (!isBorder) {
					continue;
				}

				if (matrix[row][col] != 1) {
					continue;
				}

				changeOnesConnectedToBorderToTwos(matrix, row, col);
			}
		}

		for (int row = 0; row < matrix.Length; row++) {
			for (int col = 0; col < matrix[row].Length; col++) {
				int color = matrix[row][col];
				if (color == 1) {
					matrix[row][col] = 0;
				} else if (color == 2) {
					matrix[row][col] = 1;
				}
			}
		}

		return matrix;
	}

	public void changeOnesConnectedToBorderToTwos(int[][] matrix, int startRow, int startCol) {
		Stack<Tuple<int, int> > stack = new Stack<Tuple<int, int> >();
		stack.Push(new Tuple<int, int>(startRow, startCol));

		while (stack.Count > 0) {
			var currentPosition = stack.Pop();
			int currentRow = currentPosition.Item1;
			int currentCol = currentPosition.Item2;

			matrix[currentRow][currentCol] = 2;

			var neighbors = getNeighbors(matrix, currentRow, currentCol);
			foreach (var neighbor in neighbors) {
				int row = neighbor.Item1;
				int col = neighbor.Item2;

				if (matrix[row][col] != 1) {
					continue;
				}
				stack.Push(neighbor);
			}
		}
	}

	public List<Tuple<int, int> > getNeighbors(int[][] matrix, int row, int col) {
		int numRows = matrix.Length;
		int numCols = matrix[row].Length;
		List<Tuple<int, int> > neighbors = new List<Tuple<int, int> >();

		if (row - 1 >= 0) {
			neighbors.Add(new Tuple<int, int>(row - 1, col)); // UP
		}
		if (row + 1 < numRows) {
			neighbors.Add(new Tuple<int, int>(row + 1, col)); // DOWN
		}
		if (col - 1 >= 0) {
			neighbors.Add(new Tuple<int, int>(row, col - 1)); // LEFT
		}
		if (col + 1 < numCols) {
			neighbors.Add(new Tuple<int, int>(row, col + 1)); // RIGHT
		}
		return neighbors;
	}
}
```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[][] input = new int[][] {
			new int[] {1, 0, 0, 0, 0, 0},
			new int[] {0, 1, 0, 1, 1, 1},
			new int[] {0, 0, 1, 0, 1, 0},
			new int[] {1, 1, 0, 0, 1, 0},
			new int[] {1, 0, 1, 1, 0, 0},
			new int[] {1, 0, 0, 0, 0, 1},
		};
		int[][] expected = new int[][] {
			new int[] {1, 0, 0, 0, 0, 0},
			new int[] {0, 0, 0, 1, 1, 1},
			new int[] {0, 0, 0, 0, 1, 0},
			new int[] {1, 1, 0, 0, 1, 0},
			new int[] {1, 0, 0, 0, 0, 0},
			new int[] {1, 0, 0, 0, 0, 1},
		};
		int[][] actual = new Program().RemoveIslands(input);
		for (int i=0; i<actual.Length; i++) {
			for (int j=0; j<actual[i].Length; j++) {
				Utils.AssertTrue(actual[i][j] == expected[i][j]);
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
		{1, 0, 0, 0, 0, 0},
		{0, 1, 0, 1, 1, 1},
		{0, 0, 1, 0, 1, 0},
		{1, 1, 0, 0, 1, 0},
		{1, 0, 1, 1, 0, 0},
		{1, 0, 0, 0, 0, 1},
	}
	expected := [][]int{
		{1, 0, 0, 0, 0, 0},
		{0, 0, 0, 1, 1, 1},
		{0, 0, 0, 0, 1, 0},
		{1, 1, 0, 0, 1, 0},
		{1, 0, 0, 0, 0, 0},
		{1, 0, 0, 0, 0, 1},
	}
	actual := RemoveIslands(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(wh) time | O(wh) space - where w and h
// are the width and height of the input matrix
func RemoveIslands(matrix [][]int) [][]int {
	onesConnectedToBorder := make([][]bool, len(matrix))
	for i := range matrix {
		onesConnectedToBorder[i] = make([]bool, len(matrix[0]))
	}

	// Find all the 1s that are not islands
	for row := 0; row < len(matrix); row++ {
		for col := 0; col < len(matrix[row]); col++ {
			rowIsBorder := row == 0 || row == len(matrix)-1
			colIsBorder := col == 0 || col == len(matrix[row])-1
			isBorder := rowIsBorder || colIsBorder
			if !isBorder {
				continue
			}

			if matrix[row][col] != 1 {
				continue
			}

			findOnesConnectedToBorder(matrix, row, col, onesConnectedToBorder)
		}
	}

	for row := 0; row < len(matrix)-1; row++ {
		for col := 0; col < len(matrix[row])-1; col++ {
			if onesConnectedToBorder[row][col] {
				continue
			}
			matrix[row][col] = 0
		}
	}

	return matrix
}

func findOnesConnectedToBorder(matrix [][]int, startRow, startCol int, onesConnectedToBorder [][]bool) {
	stack := [][]int{{startRow, startCol}}

	var currentPosition []int
	for len(stack) > 0 {
		currentPosition, stack = stack[len(stack)-1], stack[:len(stack)-1]
		currentRow, currentCol := currentPosition[0], currentPosition[1]

		alreadyVisited := onesConnectedToBorder[currentRow][currentCol]
		if alreadyVisited {
			continue
		}

		onesConnectedToBorder[currentRow][currentCol] = true

		neighbors := getNeighbors(matrix, currentRow, currentCol)
		for _, neighbor := range neighbors {
			row, col := neighbor[0], neighbor[1]

			if matrix[row][col] != 1 {
				continue
			}
			stack = append(stack, neighbor)
		}
	}
}

func getNeighbors(matrix [][]int, row, col int) [][]int {
	neighbors := make([][]int, 0)
	numRows := len(matrix)
	numCols := len(matrix[row])

	if row-1 >= 0 {
		neighbors = append(neighbors, []int{row - 1, col}) // UP
	}
	if row+1 < numRows {
		neighbors = append(neighbors, []int{row + 1, col}) // DOWN
	}
	if col-1 >= 0 {
		neighbors = append(neighbors, []int{row, col - 1}) // LEFT
	}
	if col+1 < numCols {
		neighbors = append(neighbors, []int{row, col + 1}) // RIGHT
	}
	return neighbors
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(wh) time | O(wh) space - where w and h
// are the width and height of the input matrix
func RemoveIslands(matrix [][]int) [][]int {
	for row := 0; row < len(matrix); row++ {
		for col := 0; col < len(matrix[row]); col++ {
			rowIsBorder := row == 0 || row == len(matrix)-1
			colIsBorder := col == 0 || col == len(matrix[row])-1
			isBorder := rowIsBorder || colIsBorder
			if !isBorder {
				continue
			}

			if matrix[row][col] != 1 {
				continue
			}

			changeOnesConnectedToBorderToTwos(matrix, row, col)
		}
	}

	for row := 0; row < len(matrix); row++ {
		for col := 0; col < len(matrix[row]); col++ {
			color := matrix[row][col]
			if color == 1 {
				matrix[row][col] = 0
			} else if color == 2 {
				matrix[row][col] = 1
			}
		}
	}

	return matrix
}

func changeOnesConnectedToBorderToTwos(matrix [][]int, startRow, startCol int) {
	stack := [][]int{{startRow, startCol}}

	var currentPosition []int
	for len(stack) > 0 {
		currentPosition, stack = stack[len(stack)-1], stack[:len(stack)-1]
		currentRow, currentCol := currentPosition[0], currentPosition[1]

		matrix[currentRow][currentCol] = 2

		neighbors := getNeighbors(matrix, currentRow, currentCol)
		for _, neighbor := range neighbors {
			row, col := neighbor[0], neighbor[1]

			if matrix[row][col] != 1 {
				continue
			}
			stack = append(stack, neighbor)
		}
	}
}

func getNeighbors(matrix [][]int, row, col int) [][]int {
	neighbors := make([][]int, 0)
	numRows := len(matrix)
	numCols := len(matrix[row])

	if row-1 >= 0 {
		neighbors = append(neighbors, []int{row - 1, col}) // UP
	}
	if row+1 < numRows {
		neighbors = append(neighbors, []int{row + 1, col}) // DOWN
	}
	if col-1 >= 0 {
		neighbors = append(neighbors, []int{row, col - 1}) // LEFT
	}
	if col+1 < numCols {
		neighbors = append(neighbors, []int{row, col + 1}) // RIGHT
	}
	return neighbors
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
		{1, 0, 0, 0, 0, 0},
		{0, 1, 0, 1, 1, 1},
		{0, 0, 1, 0, 1, 0},
		{1, 1, 0, 0, 1, 0},
		{1, 0, 1, 1, 0, 0},
		{1, 0, 0, 0, 0, 1},
	}
	expected := [][]int{
		{1, 0, 0, 0, 0, 0},
		{0, 0, 0, 1, 1, 1},
		{0, 0, 0, 0, 1, 0},
		{1, 1, 0, 0, 1, 0},
		{1, 0, 0, 0, 0, 0},
		{1, 0, 0, 0, 0, 1},
	}
	actual := RemoveIslands(input)
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
    int[][] input =
        new int[][] {
          {1, 0, 0, 0, 0, 0},
          {0, 1, 0, 1, 1, 1},
          {0, 0, 1, 0, 1, 0},
          {1, 1, 0, 0, 1, 0},
          {1, 0, 1, 1, 0, 0},
          {1, 0, 0, 0, 0, 1},
        };
    int[][] expected =
        new int[][] {
          {1, 0, 0, 0, 0, 0},
          {0, 0, 0, 1, 1, 1},
          {0, 0, 0, 0, 1, 0},
          {1, 1, 0, 0, 1, 0},
          {1, 0, 0, 0, 0, 0},
          {1, 0, 0, 0, 0, 1},
        };
    int[][] actual = new Program().removeIslands(input);
    for (int i = 0; i < actual.length; i++) {
      for (int j = 0; j < actual[i].length; j++) {
        Utils.assertTrue(actual[i][j] == expected[i][j]);
      }
    }
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(wh) time | O(wh) space - where w and h
  // are the width and height of the input matrix
  int[][] removeIslands(int[][] matrix) {
    boolean[][] onesConnectedToBorder = new boolean[matrix.length][matrix[0].length];
    for (int i = 0; i < matrix.length; i++) {
      onesConnectedToBorder[i][matrix[0].length - 1] = false;
    }

    // Find all the 1s that are not islands
    for (int row = 0; row < matrix.length; row++) {
      for (int col = 0; col < matrix[row].length; col++) {
        boolean rowIsBorder = row == 0 || row == matrix.length - 1;
        boolean colIsBorder = col == 0 || col == matrix[row].length - 1;
        boolean isBorder = rowIsBorder || colIsBorder;

        if (!isBorder) {
          continue;
        }

        if (matrix[row][col] != 1) {
          continue;
        }

        findOnesConnectedToBorder(matrix, row, col, onesConnectedToBorder);
      }
    }

    for (int row = 1; row < matrix.length - 1; row++) {
      for (int col = 1; col < matrix[row].length - 1; col++) {
        if (onesConnectedToBorder[row][col]) {
          continue;
        }
        matrix[row][col] = 0;
      }
    }

    return matrix;
  }

  public void findOnesConnectedToBorder(
      int[][] matrix, int startRow, int startCol, boolean[][] onesConnectedToBorder) {
    Stack<int[]> stack = new Stack<int[]>();
    stack.push(new int[] {startRow, startCol});

    while (stack.size() > 0) {
      int[] currentPosition = stack.pop();
      int currentRow = currentPosition[0];
      int currentCol = currentPosition[1];

      boolean alreadyVisited = onesConnectedToBorder[currentRow][currentCol];
      if (alreadyVisited) {
        continue;
      }

      onesConnectedToBorder[currentRow][currentCol] = true;

      int[][] neighbors = getNeighbors(matrix, currentRow, currentCol);
      for (int[] neighbor : neighbors) {
        int row = neighbor[0];
        int col = neighbor[1];

        if (matrix[row][col] != 1) {
          continue;
        }
        stack.push(neighbor);
      }
    }
  }

  public int[][] getNeighbors(int[][] matrix, int row, int col) {
    int numRows = matrix.length;
    int numCols = matrix[row].length;
    ArrayList<int[]> temp = new ArrayList<int[]>();

    if (row - 1 >= 0) {
      temp.add(new int[] {row - 1, col}); // UP
    }
    if (row + 1 < numRows) {
      temp.add(new int[] {row + 1, col}); // DOWN
    }
    if (col - 1 >= 0) {
      temp.add(new int[] {row, col - 1}); // LEFT
    }
    if (col + 1 < numCols) {
      temp.add(new int[] {row, col + 1}); // RIGHT
    }

    int[][] neighbors = new int[temp.size()][2];
    for (int i = 0; i < temp.size(); i++) {
      neighbors[i] = temp.get(i);
    }
    return neighbors;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(wh) time | O(wh) space - where w and h
  // are the width and height of the input matrix
  int[][] removeIslands(int[][] matrix) {

    for (int row = 0; row < matrix.length; row++) {
      for (int col = 0; col < matrix[row].length; col++) {
        boolean rowIsBorder = row == 0 || row == matrix.length - 1;
        boolean colIsBorder = col == 0 || col == matrix[row].length - 1;
        boolean isBorder = rowIsBorder || colIsBorder;

        if (!isBorder) {
          continue;
        }

        if (matrix[row][col] != 1) {
          continue;
        }

        changeOnesConnectedToBorderToTwos(matrix, row, col);
      }
    }

    for (int row = 0; row < matrix.length; row++) {
      for (int col = 0; col < matrix[row].length; col++) {
        int color = matrix[row][col];
        if (color == 1) {
          matrix[row][col] = 0;
        } else if (color == 2) {
          matrix[row][col] = 1;
        }
      }
    }

    return matrix;
  }

  public void changeOnesConnectedToBorderToTwos(int[][] matrix, int startRow, int startCol) {
    Stack<int[]> stack = new Stack<int[]>();
    stack.push(new int[] {startRow, startCol});

    while (stack.size() > 0) {
      int[] currentPosition = stack.pop();
      int currentRow = currentPosition[0];
      int currentCol = currentPosition[1];

      matrix[currentRow][currentCol] = 2;

      int[][] neighbors = getNeighbors(matrix, currentRow, currentCol);
      for (int[] neighbor : neighbors) {
        int row = neighbor[0];
        int col = neighbor[1];

        if (matrix[row][col] != 1) {
          continue;
        }
        stack.push(neighbor);
      }
    }
  }

  public int[][] getNeighbors(int[][] matrix, int row, int col) {
    int numRows = matrix.length;
    int numCols = matrix[row].length;
    ArrayList<int[]> temp = new ArrayList<int[]>();

    if (row - 1 >= 0) {
      temp.add(new int[] {row - 1, col}); // UP
    }
    if (row + 1 < numRows) {
      temp.add(new int[] {row + 1, col}); // DOWN
    }
    if (col - 1 >= 0) {
      temp.add(new int[] {row, col - 1}); // LEFT
    }
    if (col + 1 < numCols) {
      temp.add(new int[] {row, col + 1}); // RIGHT
    }

    int[][] neighbors = new int[temp.size()][2];
    for (int i = 0; i < temp.size(); i++) {
      neighbors[i] = temp.get(i);
    }
    return neighbors;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[][] input =
        new int[][] {
          {1, 0, 0, 0, 0, 0},
          {0, 1, 0, 1, 1, 1},
          {0, 0, 1, 0, 1, 0},
          {1, 1, 0, 0, 1, 0},
          {1, 0, 1, 1, 0, 0},
          {1, 0, 0, 0, 0, 1},
        };
    int[][] expected =
        new int[][] {
          {1, 0, 0, 0, 0, 0},
          {0, 0, 0, 1, 1, 1},
          {0, 0, 0, 0, 1, 0},
          {1, 1, 0, 0, 1, 0},
          {1, 0, 0, 0, 0, 0},
          {1, 0, 0, 0, 0, 1},
        };
    int[][] actual = new Program().removeIslands(input);
    for (int i = 0; i < actual.length; i++) {
      for (int j = 0; j < actual[i].length; j++) {
        Utils.assertTrue(actual[i][j] == expected[i][j]);
      }
    }
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
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 1],
    [0, 0, 1, 0, 1, 0],
    [1, 1, 0, 0, 1, 0],
    [1, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1],
  ];
  const expected = [
    [1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1],
  ];
  const actual = program.removeIslands(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(wh) time | O(wh) space - where w and h
// are the width and height of the input matrix
function removeIslands(matrix) {
  const onesConnectedToBorder = [];
  for (let row = 0; row < matrix.length; row++) {
    onesConnectedToBorder.push([]);
    for (let col = 0; col < matrix[0].length; col++) {
      onesConnectedToBorder[row].push(false);
    }
  }

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const rowIsBorder = row === 0 || row === matrix.length - 1;
      const colIsBorder = col === 0 || col === matrix[row].length - 1;
      const isBorder = rowIsBorder || colIsBorder;
      if (!isBorder) continue;

      if (matrix[row][col] != 1) continue;

      findOnesConnectedToBorder(matrix, row, col, onesConnectedToBorder);
    }
  }

  for (let row = 1; row < matrix.length - 1; row++) {
    for (let col = 1; col < matrix[row].length - 1; col++) {
      if (onesConnectedToBorder[row][col]) continue;

      matrix[row][col] = 0;
    }
  }

  return matrix;
}

function findOnesConnectedToBorder(matrix, startRow, startCol, onesConnectedToBorder) {
  const stack = [[startRow, startCol]];

  while (stack.length > 0) {
    const currentPosition = stack.pop();
    const [currentRow, currentCol] = currentPosition;

    const alreadyVisited = onesConnectedToBorder[currentRow][currentCol];
    if (alreadyVisited) continue;

    onesConnectedToBorder[currentRow][currentCol] = true;

    const neighbors = getNeighbors(matrix, currentRow, currentCol);
    for (const neighbor of neighbors) {
      const [row, col] = neighbor;

      if (matrix[row][col] != 1) continue;

      stack.push(neighbor);
    }
  }
}

function getNeighbors(matrix, row, col) {
  const neighbors = [];

  const numRows = matrix.length;
  const numCols = matrix[row].length;

  if (row - 1 >= 0) neighbors.push([row - 1, col]); // UP
  if (row + 1 < numRows) neighbors.push([row + 1, col]); // DOWN
  if (col - 1 >= 0) neighbors.push([row, col - 1]); // LEFT
  if (col + 1 < numCols) neighbors.push([row, col + 1]); // RIGHT

  return neighbors;
}

// Do not edit the line below.
exports.removeIslands = removeIslands;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(wh) time | O(wh) space - where w and h
// are the width and height of the input matrix
function removeIslands(matrix) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const rowIsBorder = row === 0 || row === matrix.length - 1;
      const colIsBorder = col === 0 || col === matrix[row].length - 1;
      const isBorder = rowIsBorder || colIsBorder;
      if (!isBorder) continue;

      if (matrix[row][col] != 1) continue;

      changeOnesConnectedToBorderToTwos(matrix, row, col);
    }
  }

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const color = matrix[row][col];
      if (color === 1) {
        matrix[row][col] = 0;
      } else if (color === 2) {
        matrix[row][col] = 1;
      }
    }
  }

  return matrix;
}

function changeOnesConnectedToBorderToTwos(matrix, startRow, startCol) {
  const stack = [[startRow, startCol]];

  while (stack.length > 0) {
    const currentPosition = stack.pop();
    const [currentRow, currentCol] = currentPosition;

    matrix[currentRow][currentCol] = 2;

    const neighbors = getNeighbors(matrix, currentRow, currentCol);
    for (const neighbor of neighbors) {
      const [row, col] = neighbor;

      if (matrix[row][col] != 1) continue;

      stack.push(neighbor);
    }
  }
}

function getNeighbors(matrix, row, col) {
  const neighbors = [];

  const numRows = matrix.length;
  const numCols = matrix[row].length;

  if (row - 1 >= 0) neighbors.push([row - 1, col]); // UP
  if (row + 1 < numRows) neighbors.push([row + 1, col]); // DOWN
  if (col - 1 >= 0) neighbors.push([row, col - 1]); // LEFT
  if (col + 1 < numCols) neighbors.push([row, col + 1]); // RIGHT

  return neighbors;
}

// Do not edit the line below.
exports.removeIslands = removeIslands;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 1],
    [0, 0, 1, 0, 1, 0],
    [1, 1, 0, 0, 1, 0],
    [1, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1],
  ];
  const expected = [
    [1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1],
  ];
  const actual = program.removeIslands(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.removeIslands

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(
            mutableListOf(1, 0, 0, 0, 0, 0),
            mutableListOf(0, 1, 0, 1, 1, 1),
            mutableListOf(0, 0, 1, 0, 1, 0),
            mutableListOf(1, 1, 0, 0, 1, 0),
            mutableListOf(1, 0, 1, 1, 0, 0),
            mutableListOf(1, 0, 0, 0, 0, 1)
        )
        val expected = listOf(
            mutableListOf(1, 0, 0, 0, 0, 0),
            mutableListOf(0, 0, 0, 1, 1, 1),
            mutableListOf(0, 0, 0, 0, 1, 0),
            mutableListOf(1, 1, 0, 0, 1, 0),
            mutableListOf(1, 0, 0, 0, 0, 0),
            mutableListOf(1, 0, 0, 0, 0, 1)
        )
        val output = removeIslands(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(wh) time | O(wh) space - where w and h 
// are the width and height of the input matrix
fun removeIslands(matrix: List<MutableList<Int>>): List<MutableList<Int>> {
    val onesConnectedToBorder = List(matrix.size, { MutableList(matrix[0].size, { false }) })

    // Find all the 1s that are not islands
    for (row in 0 until matrix.size) {
        for (col in 0 until matrix[row].size) {
            val rowIsBorder = row == 0 || row == matrix.size - 1
            val colIsBorder = col == 0 || col == matrix[row].size - 1
            val isBorder = rowIsBorder || colIsBorder
            if (!isBorder) continue

            if (matrix[row][col] != 1) continue

            findOnesConnectedToBorder(matrix, row, col, onesConnectedToBorder)
        }
    }

    for (row in 1 until matrix.size - 1) {
        for (col in 1 until matrix[row].size - 1) {
            if (onesConnectedToBorder[row][col]) continue

            matrix[row][col] = 0
        }
    }

    return matrix
}

fun findOnesConnectedToBorder(matrix: List<MutableList<Int>>, startRow: Int, startCol: Int, onesConnectedToBorder: List<MutableList<Boolean>>) {
    val stack = mutableListOf(Pair(startRow, startCol))

    while (stack.size > 0) {
        val currentPosition = stack.removeAt(stack.size - 1)
        val (currentRow, currentCol) = currentPosition

        val alreadyVisited = onesConnectedToBorder[currentRow][currentCol]
        if (alreadyVisited) continue

        onesConnectedToBorder[currentRow][currentCol] = true

        val neighbors = getNeighbors(matrix, currentRow, currentCol)
        for (neighbor in neighbors) {
            val (row, col) = neighbor

            if (matrix[row][col] != 1) continue

            stack.add(neighbor)
        }
    }
}

fun getNeighbors(matrix: List<MutableList<Int>>, row: Int, col: Int): List<Pair<Int, Int>> {
    val neighbors = mutableListOf<Pair<Int, Int>>()

    val numRows = matrix.size
    val numCols = matrix[row].size

    if (row - 1 >= 0) neighbors.add(Pair(row - 1, col)) // UP
    if (row + 1 < numRows) neighbors.add(Pair(row + 1, col)) // DOWN
    if (col - 1 >= 0) neighbors.add(Pair(row, col - 1)) // LEFT
    if (col + 1 < numCols) neighbors.add(Pair(row, col + 1)) // RIGHT

    return neighbors
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(wh) time | O(wh) space - where w and h 
// are the width and height of the input matrix
fun removeIslands(matrix: List<MutableList<Int>>): List<MutableList<Int>> {
    for (row in 0 until matrix.size) {
        for (col in 0 until matrix[row].size) {
            val rowIsBorder = row == 0 || row == matrix.size - 1
            val colIsBorder = col == 0 || col == matrix[row].size - 1
            val isBorder = rowIsBorder || colIsBorder
            if (!isBorder) continue

            if (matrix[row][col] != 1) continue

            changeOnesConnectedToBorderToTwos(matrix, row, col)
        }
    }

    for (row in 0 until matrix.size) {
        for (col in 0 until matrix[row].size) {
            val color = matrix[row][col]
            if (color == 1) {
                matrix[row][col] = 0
            } else if (color == 2) {
                matrix[row][col] = 1
            }
        }
    }

    return matrix
}

fun changeOnesConnectedToBorderToTwos(matrix: List<MutableList<Int>>, startRow: Int, startCol: Int) {
    val stack = mutableListOf(Pair(startRow, startCol))

    while (stack.size > 0) {
        val currentPosition = stack.removeAt(stack.size - 1)
        val (currentRow, currentCol) = currentPosition

        matrix[currentRow][currentCol] = 2

        val neighbors = getNeighbors(matrix, currentRow, currentCol)
        for (neighbor in neighbors) {
            val (row, col) = neighbor

            if (matrix[row][col] != 1) continue

            stack.add(neighbor)
        }
    }
}

fun getNeighbors(matrix: List<MutableList<Int>>, row: Int, col: Int): List<Pair<Int, Int>> {
    val neighbors = mutableListOf<Pair<Int, Int>>()

    val numRows = matrix.size
    val numCols = matrix[row].size

    if (row - 1 >= 0) neighbors.add(Pair(row - 1, col)) // UP
    if (row + 1 < numRows) neighbors.add(Pair(row + 1, col)) // DOWN
    if (col - 1 >= 0) neighbors.add(Pair(row, col - 1)) // LEFT
    if (col + 1 < numCols) neighbors.add(Pair(row, col + 1)) // RIGHT

    return neighbors
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.removeIslands

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(
            mutableListOf(1, 0, 0, 0, 0, 0),
            mutableListOf(0, 1, 0, 1, 1, 1),
            mutableListOf(0, 0, 1, 0, 1, 0),
            mutableListOf(1, 1, 0, 0, 1, 0),
            mutableListOf(1, 0, 1, 1, 0, 0),
            mutableListOf(1, 0, 0, 0, 0, 1)
        )
        val expected = listOf(
            mutableListOf(1, 0, 0, 0, 0, 0),
            mutableListOf(0, 0, 0, 1, 1, 1),
            mutableListOf(0, 0, 0, 0, 1, 0),
            mutableListOf(1, 1, 0, 0, 1, 0),
            mutableListOf(1, 0, 0, 0, 0, 0),
            mutableListOf(1, 0, 0, 0, 0, 1)
        )
        val output = removeIslands(input)
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
        [1, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 1, 1],
        [0, 0, 1, 0, 1, 0],
        [1, 1, 0, 0, 1, 0],
        [1, 0, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 1],
      ]
      var expected = [
        [1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1],
        [0, 0, 0, 0, 1, 0],
        [1, 1, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 1],
      ]
      var actual = Program().removeIslands(&input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(wh) time | O(wh) space - where w and h
  // are the width and height of the input matrix
  func removeIslands(_ matrix: inout [[Int]]) -> [[Int]] {
    var onesConnectedToBorder = [[Bool]](repeating: [], count: matrix.count)
    for i in 0 ..< matrix.count {
      onesConnectedToBorder[i] = [Bool](repeating: false, count: matrix[0].count)
    }

    // Find all the 1s that are not islands
    for row in 0 ..< matrix.count {
      for col in 0 ..< matrix[0].count {
        let rowIsBorder = row == 0 || row == matrix.count - 1
        let colIsBorder = col == 0 || col == matrix[row].count - 1
        let isBorder = rowIsBorder || colIsBorder
        if !isBorder {
          continue
        }

        if matrix[row][col] != 1 {
          continue
        }

        findOnesConnectedToBorder(&matrix, row, col, &onesConnectedToBorder)
      }
    }

    for row in 0 ..< matrix.count - 1 {
      for col in 0 ..< matrix[0].count - 1 {
        if onesConnectedToBorder[row][col] {
          continue
        }
        matrix[row][col] = 0
      }
    }

    return matrix
  }

  func findOnesConnectedToBorder(_ matrix: inout [[Int]], _ startRow: Int, _ startCol: Int, _ onesConnectedToBorder: inout [[Bool]]) {
    var stack = [[startRow, startCol]]

    var currentPosition = [Int]()
    while stack.count > 0 {
      let currentPosition = stack.removeLast()
      let (currentRow, currentCol) = (currentPosition[0], currentPosition[1])

      let alreadyVisited = onesConnectedToBorder[currentRow][currentCol]
      if alreadyVisited {
        continue
      }

      onesConnectedToBorder[currentRow][currentCol] = true

      let neighbors = getNeighbors(&matrix, currentRow, currentCol)
      for neighbor in neighbors {
        let (row, col) = (neighbor[0], neighbor[1])
        if matrix[row][col] != 1 {
          continue
        }
        stack.append(neighbor)
      }
    }
  }

  func getNeighbors(_ matrix: inout [[Int]], _ row: Int, _ col: Int) -> [[Int]] {
    var neighbors = [[Int]]()
    let numRows = matrix.count
    let numCols = matrix[row].count

    if row - 1 >= 0 {
      neighbors.append([row - 1, col]) // UP
    }
    if row + 1 < numRows {
      neighbors.append([row + 1, col]) // DOWN
    }
    if col - 1 >= 0 {
      neighbors.append([row, col - 1]) // LEFT
    }
    if col + 1 < numCols {
      neighbors.append([row, col + 1]) // RIGHT
    }
    return neighbors
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(wh) time | O(wh) space - where w and h
  // are the width and height of the input matrix
  func removeIslands(_ matrix: inout [[Int]]) -> [[Int]] {
    // Find all the 1s that are not islands
    for row in 0 ..< matrix.count {
      for col in 0 ..< matrix[0].count {
        let rowIsBorder = row == 0 || row == matrix.count - 1
        let colIsBorder = col == 0 || col == matrix[row].count - 1
        let isBorder = rowIsBorder || colIsBorder
        if !isBorder {
          continue
        }

        if matrix[row][col] != 1 {
          continue
        }

        changeOnesConnectedToBorderToTwos(&matrix, row, col)
      }
    }

    for row in 0 ..< matrix.count {
      for col in 0 ..< matrix[0].count {
        let color = matrix[row][col]
        if color == 1 {
          matrix[row][col] = 0
        } else if color == 2 {
          matrix[row][col] = 1
        }
      }
    }

    return matrix
  }

  func changeOnesConnectedToBorderToTwos(_ matrix: inout [[Int]], _ startRow: Int, _ startCol: Int) {
    var stack = [[startRow, startCol]]

    var currentPosition = [Int]()
    while stack.count > 0 {
      let currentPosition = stack.removeLast()
      let (currentRow, currentCol) = (currentPosition[0], currentPosition[1])

      matrix[currentRow][currentCol] = 2

      let neighbors = getNeighbors(&matrix, currentRow, currentCol)
      for neighbor in neighbors {
        let (row, col) = (neighbor[0], neighbor[1])
        if matrix[row][col] != 1 {
          continue
        }
        stack.append(neighbor)
      }
    }
  }

  func getNeighbors(_ matrix: inout [[Int]], _ row: Int, _ col: Int) -> [[Int]] {
    var neighbors = [[Int]]()
    let numRows = matrix.count
    let numCols = matrix[row].count

    if row - 1 >= 0 {
      neighbors.append([row - 1, col]) // UP
    }
    if row + 1 < numRows {
      neighbors.append([row + 1, col]) // DOWN
    }
    if col - 1 >= 0 {
      neighbors.append([row, col - 1]) // LEFT
    }
    if col + 1 < numCols {
      neighbors.append([row, col + 1]) // RIGHT
    }
    return neighbors
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = [
        [1, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 1, 1],
        [0, 0, 1, 0, 1, 0],
        [1, 1, 0, 0, 1, 0],
        [1, 0, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 1],
      ]
      var expected = [
        [1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1],
        [0, 0, 0, 0, 1, 0],
        [1, 1, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 1],
      ]
      var actual = Program().removeIslands(&input)
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
            [1, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 1, 1],
            [0, 0, 1, 0, 1, 0],
            [1, 1, 0, 0, 1, 0],
            [1, 0, 1, 1, 0, 0],
            [1, 0, 0, 0, 0, 1],
        ]
        expected = [
            [1, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1],
            [0, 0, 0, 0, 1, 0],
            [1, 1, 0, 0, 1, 0],
            [1, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 1],
        ]
        actual = program.removeIslands(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(wh) time | O(wh) space - where w and h
# are the width and height of the input matrix
def removeIslands(matrix):
    onesConnectedToBorder = [[False for col in matrix[0]] for row in matrix]

    # Find all the 1s that are not islands
    for row in range(len(matrix)):
        for col in range(len(matrix[row])):
            rowIsBorder = row == 0 or row == len(matrix) - 1
            colIsBorder = col == 0 or col == len(matrix[row]) - 1
            isBorder = rowIsBorder or colIsBorder
            if not isBorder:
                continue

            if matrix[row][col] != 1:
                continue

            findOnesConnectedToBorder(matrix, row, col, onesConnectedToBorder)

    for row in range(1, len(matrix) - 1):
        for col in range(1, len(matrix[row]) - 1):
            if onesConnectedToBorder[row][col]:
                continue

            matrix[row][col] = 0

    return matrix


def findOnesConnectedToBorder(matrix, startRow, startCol, onesConnectedToBorder):
    stack = [(startRow, startCol)]

    while len(stack) > 0:
        currentPosition = stack.pop()
        currentRow, currentCol = currentPosition

        alreadyVisited = onesConnectedToBorder[currentRow][currentCol]
        if alreadyVisited:
            continue

        onesConnectedToBorder[currentRow][currentCol] = True

        neighbors = getNeighbors(matrix, currentRow, currentCol)
        for neighbor in neighbors:
            row, col = neighbor

            if matrix[row][col] != 1:
                continue

            stack.append(neighbor)


def getNeighbors(matrix, row, col):
    neighbors = []

    numRows = len(matrix)
    numCols = len(matrix[row])

    if row - 1 >= 0:  # UP
        neighbors.append((row - 1, col))
    if row + 1 < numRows:  # DOWN
        neighbors.append((row + 1, col))
    if col - 1 >= 0:  # LEFT
        neighbors.append((row, col - 1))
    if col + 1 < numCols:  # RIGHT
        neighbors.append((row, col + 1))

    return neighbors

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(wh) time | O(wh) space - where w and h
# are the width and height of the input matrix
def removeIslands(matrix):
    for row in range(len(matrix)):
        for col in range(len(matrix[row])):
            rowIsBorder = row == 0 or row == len(matrix) - 1
            colIsBorder = col == 0 or col == len(matrix[row]) - 1
            isBorder = rowIsBorder or colIsBorder
            if not isBorder:
                continue

            if matrix[row][col] != 1:
                continue

            changeOnesConnectedToBorderToTwos(matrix, row, col)

    for row in range(len(matrix)):
        for col in range(len(matrix[row])):
            color = matrix[row][col]
            if color == 1:
                matrix[row][col] = 0
            elif color == 2:
                matrix[row][col] = 1

    return matrix


def changeOnesConnectedToBorderToTwos(matrix, startRow, startCol):
    stack = [(startRow, startCol)]

    while len(stack) > 0:
        currentPosition = stack.pop()
        currentRow, currentCol = currentPosition

        matrix[currentRow][currentCol] = 2

        neighbors = getNeighbors(matrix, currentRow, currentCol)
        for neighbor in neighbors:
            row, col = neighbor

            if matrix[row][col] != 1:
                continue

            stack.append(neighbor)


def getNeighbors(matrix, row, col):
    neighbors = []

    numRows = len(matrix)
    numCols = len(matrix[row])

    if row - 1 >= 0:  # UP
        neighbors.append((row - 1, col))
    if row + 1 < numRows:  # DOWN
        neighbors.append((row + 1, col))
    if col - 1 >= 0:  # LEFT
        neighbors.append((row, col - 1))
    if col + 1 < numCols:  # RIGHT
        neighbors.append((row, col + 1))

    return neighbors

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [
            [1, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 1, 1],
            [0, 0, 1, 0, 1, 0],
            [1, 1, 0, 0, 1, 0],
            [1, 0, 1, 1, 0, 0],
            [1, 0, 0, 0, 0, 1],
        ]
        expected = [
            [1, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1],
            [0, 0, 0, 0, 1, 0],
            [1, 1, 0, 0, 1, 0],
            [1, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 1],
        ]
        actual = program.removeIslands(input)
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
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 1],
    [0, 0, 1, 0, 1, 0],
    [1, 1, 0, 0, 1, 0],
    [1, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1],
  ];
  const expected = [
    [1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1],
  ];
  const actual = program.removeIslands(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(wh) time | O(wh) space - where w and h
// are the width and height of the input matrix
export function removeIslands(matrix: number[][]) {
  const onesConnectedToBorder: boolean[][] = [];
  for (let row = 0; row < matrix.length; row++) {
    onesConnectedToBorder.push([]);
    for (let col = 0; col < matrix[0].length; col++) {
      onesConnectedToBorder[row].push(false);
    }
  }

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const rowIsBorder = row === 0 || row === matrix.length - 1;
      const colIsBorder = col === 0 || col === matrix[row].length - 1;
      const isBorder = rowIsBorder || colIsBorder;
      if (!isBorder) continue;

      if (matrix[row][col] != 1) continue;

      findOnesConnectedToBorder(matrix, row, col, onesConnectedToBorder);
    }
  }

  for (let row = 1; row < matrix.length - 1; row++) {
    for (let col = 1; col < matrix[row].length - 1; col++) {
      if (onesConnectedToBorder[row][col]) continue;

      matrix[row][col] = 0;
    }
  }

  return matrix;
}

function findOnesConnectedToBorder(
  matrix: number[][],
  startRow: number,
  startCol: number,
  onesConnectedToBorder: boolean[][],
) {
  const stack = [[startRow, startCol]];

  while (stack.length > 0) {
    const currentPosition = stack.pop()!;
    const [currentRow, currentCol] = currentPosition;

    const alreadyVisited = onesConnectedToBorder[currentRow][currentCol];
    if (alreadyVisited) continue;

    onesConnectedToBorder[currentRow][currentCol] = true;

    const neighbors = getNeighbors(matrix, currentRow, currentCol);
    for (const neighbor of neighbors) {
      const [row, col] = neighbor;

      if (matrix[row][col] != 1) continue;

      stack.push(neighbor);
    }
  }
}

function getNeighbors(matrix: number[][], row: number, col: number) {
  const neighbors: [number, number][] = [];

  const numRows = matrix.length;
  const numCols = matrix[row].length;

  if (row - 1 >= 0) neighbors.push([row - 1, col]); // UP
  if (row + 1 < numRows) neighbors.push([row + 1, col]); // DOWN
  if (col - 1 >= 0) neighbors.push([row, col - 1]); // LEFT
  if (col + 1 < numCols) neighbors.push([row, col + 1]); // RIGHT

  return neighbors;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(wh) time | O(wh) space - where w and h
// are the width and height of the input matrix
export function removeIslands(matrix: number[][]) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const rowIsBorder = row === 0 || row === matrix.length - 1;
      const colIsBorder = col === 0 || col === matrix[row].length - 1;
      const isBorder = rowIsBorder || colIsBorder;
      if (!isBorder) continue;

      if (matrix[row][col] != 1) continue;

      changeOnesConnectedToBorderToTwos(matrix, row, col);
    }
  }

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const color = matrix[row][col];
      if (color === 1) {
        matrix[row][col] = 0;
      } else if (color === 2) {
        matrix[row][col] = 1;
      }
    }
  }

  return matrix;
}

function changeOnesConnectedToBorderToTwos(matrix: number[][], startRow: number, startCol: number) {
  const stack = [[startRow, startCol]];

  while (stack.length > 0) {
    const currentPosition = stack.pop()!;
    const [currentRow, currentCol] = currentPosition;

    matrix[currentRow][currentCol] = 2;

    const neighbors = getNeighbors(matrix, currentRow, currentCol);
    for (const neighbor of neighbors) {
      const [row, col] = neighbor;

      if (matrix[row][col] != 1) continue;

      stack.push(neighbor);
    }
  }
}

function getNeighbors(matrix: number[][], row: number, col: number) {
  const neighbors: [number, number][] = [];

  const numRows = matrix.length;
  const numCols = matrix[row].length;

  if (row - 1 >= 0) neighbors.push([row - 1, col]); // UP
  if (row + 1 < numRows) neighbors.push([row + 1, col]); // DOWN
  if (col - 1 >= 0) neighbors.push([row, col - 1]); // LEFT
  if (col + 1 < numCols) neighbors.push([row, col + 1]); // RIGHT

  return neighbors;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 1],
    [0, 0, 1, 0, 1, 0],
    [1, 1, 0, 0, 1, 0],
    [1, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1],
  ];
  const expected = [
    [1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1],
    [0, 0, 0, 0, 1, 0],
    [1, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1],
  ];
  const actual = program.removeIslands(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

