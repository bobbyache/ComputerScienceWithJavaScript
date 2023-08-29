# Minimum Passes Of Matrix
<div class="html">
<p>
  Write a function that takes in an integer matrix of potentially unequal height
  and width and returns the minimum number of passes required to convert all
  negative integers in the matrix to positive integers.
</p>
<p>
  A negative integer in the matrix can only be converted to a positive integer
  if one or more of its adjacent elements is positive. An adjacent element is an
  element that is to the left, to the right, above, or below the current element
  in the matrix. Converting a negative to a positive simply involves multiplying
  it by <span>-1</span>.
</p>
<p>
  Note that the <span>0</span> value is neither positive nor negative, meaning
  that a <span>0</span> can't convert an adjacent negative to a positive.
</p>
<p>
  A single pass through the matrix involves converting all the negative integers
  that <i>can</i> be converted at a particular point in time. For example,
  consider the following input matrix:
</p>
<pre>
[ 
  [0, -2, -1], 
  [-5, 2, 0], 
  [-6, -2, 0],
]
</pre>
<p>After a first pass, only 3 values can be converted to positives:</p>
<pre>
[ 
  [0, 2, -1], 
  [5, 2, 0], 
  [-6, 2, 0],
]
</pre>
<p>
  After a second pass, the remaining negative values can all be converted to
  positives:
</p>
<pre>
[ 
  [0, 2, 1], 
  [5, 2, 0], 
  [6, 2, 0],
]
</pre>
<p>
  Note that the input matrix will always contain at least one element. If the
  negative integers in the input matrix can't all be converted to positives,
  regardless of how many passes are run, your function should return
  <span>-1</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">matrix</span> = [
  [0, -1, -3, 2, 0],
  [1, -2, -5, -1, -3],
  [3, 0, 0, -4, -1],
]
</pre>
<h3>Sample Output</h3>
<pre>
3
</pre>
</div>

Hint 1
<p>
  The brute-force approach to solving this problem is to simply iterate through
  the entire matrix, find all positive values, and change their negative
  neighbors to positive. You then repeat this process until no more negative
  neighbors exist. This approach works, but it doesn't run in an optimal time
  complexity; can you think of a another way to solve this?
</p>


Hint 2

<p>
  The approach discussed in Hint #1 has you look at the same elements in the
  matrix multiple times. How can you ensure that you never process the same
  element more than once?
</p>


Hint 3

<p>
  Once a positive value has been found and you change its neighbors to
  positives, this positive value can no longer lead to the conversion of any
  more negative values. Instead, its neighbors (that you just changed to
  positives) have the possibility of changing their own neighbors to positives.
  After you change a negative value to positive, you should store its position
  so that you can check if it can flip any of its neighbors in the next pass of
  the matrix. Can something similar to a breadth-first search help you do this?
</p>


Hint 4

<p>
  You can solve this problem in <span>O(w * h)</span> time, where
  <span>w</span> and <span>h</span> are the width and height of the matrix, by
  implementing a breadth-first search, starting from all the positive-value
  positions in the array. Initialize a queue that stores the positions of all
  positive values, iterate through the queue, dequeue elements out, and consider
  all of their neighbors. If any of their neighbors are negative, change them to
  positive, and store their positions in a secondary queue. Once the first queue
  is empty, increment your number of passes, and iterate through the second
  queue you created (the one with the positions of negatives that were changed
  to positives). Repeat this process until no values are converted during a
  pass.
</p>


Hint 5

<p>
  The approach discussed in Hint #4 can work using either one or two queues. If
  you decide to use only one queue, you'll need to differentiate the values that
  were already positive when the current pass started from the values that were
  changed to positive during the current pass. See the Conceptual Overview
  section of this question's video explanation for a more in-depth explanation.
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
          {0, -1, -3, 2, 0}, {1, -2, -5, -1, -3}, {3, 0, 0, -4, -1}};
      ;
      auto expected = 3;
      auto actual = minimumPassesOfMatrix(input);
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

int convertNegatives(vector<vector<int>> &matrix);
vector<vector<int>> getAllPositivePositions(const vector<vector<int>> &matrix);
vector<vector<int>> getAdjacentPositions(int row, int col,
                                         const vector<vector<int>> &matrix);
bool containsNegative(const vector<vector<int>> &matrix);

// O(w * h) time | O(w * h) space - where w is the
// width of the matrix and h is the height
int minimumPassesOfMatrix(vector<vector<int>> matrix) {
  int passes = convertNegatives(matrix);
  return !containsNegative(matrix) ? passes - 1 : -1;
}

int convertNegatives(vector<vector<int>> &matrix) {
  vector<vector<int>> nextPassQueue = getAllPositivePositions(matrix);

  int passes = 0;

  while (nextPassQueue.size() > 0) {
    vector<vector<int>> currentPassQueue = nextPassQueue;
    nextPassQueue = {};

    while (currentPassQueue.size() > 0) {
      // In C++, removing elements from the start of a vector is an O(n)-time
      // operation. To make this an O(1)-time operation, we could use a more
      // legitimate queue structure. For our time complexity analysis, we'll
      // assume this runs in O(1) time. Also, for this particular solution
      // (Solution #1), we could actually just turn this queue into a stack and
      // replace `.erase()` with the constant-time `.pop_back()` operation.
      auto currentPosition = currentPassQueue.front();
      currentPassQueue.erase(currentPassQueue.begin());
      int currentRow = currentPosition[0];
      int currentCol = currentPosition[1];

      vector<vector<int>> adjacentPositions =
          getAdjacentPositions(currentRow, currentCol, matrix);
      for (const auto &position : adjacentPositions) {
        int row = position[0];
        int col = position[1];

        int value = matrix[row][col];
        if (value < 0) {
          matrix[row][col] *= -1;
          nextPassQueue.push_back({row, col});
        }
      }
    }

    passes++;
  }

  return passes;
}

vector<vector<int>> getAllPositivePositions(const vector<vector<int>> &matrix) {
  vector<vector<int>> positivePositions;

  for (int row = 0; row < matrix.size(); row++) {
    for (int col = 0; col < matrix[row].size(); col++) {
      int value = matrix[row][col];
      if (value > 0)
        positivePositions.push_back({row, col});
    }
  }

  return positivePositions;
}

vector<vector<int>> getAdjacentPositions(int row, int col,
                                         const vector<vector<int>> &matrix) {
  vector<vector<int>> adjacentPositions;

  if (row > 0)
    adjacentPositions.push_back({row - 1, col});
  if (row < matrix.size() - 1)
    adjacentPositions.push_back({row + 1, col});
  if (col > 0)
    adjacentPositions.push_back({row, col - 1});
  if (col < matrix[0].size() - 1)
    adjacentPositions.push_back({row, col + 1});

  return adjacentPositions;
}

bool containsNegative(const vector<vector<int>> &matrix) {
  for (const auto &row : matrix) {
    for (const auto &value : row) {
      if (value < 0)
        return true;
    }
  }

  return false;
}
```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

int convertNegatives(vector<vector<int>> &matrix);
vector<vector<int>> getAllPositivePositions(const vector<vector<int>> &matrix);
vector<vector<int>> getAdjacentPositions(int row, int col,
                                         const vector<vector<int>> &matrix);
bool containsNegative(const vector<vector<int>> &matrix);

// O(w * h) time | O(w * h) space - where w is the
// width of the matrix and h is the height
int minimumPassesOfMatrix(vector<vector<int>> matrix) {
  int passes = convertNegatives(matrix);
  return !containsNegative(matrix) ? passes - 1 : -1;
}

int convertNegatives(vector<vector<int>> &matrix) {
  vector<vector<int>> queue = getAllPositivePositions(matrix);

  int passes = 0;

  while (queue.size() > 0) {
    int currentSize = queue.size();

    while (currentSize > 0) {
      // In C++, removing elements from the start of a vector is an O(n)-time
      // operation. To make this an O(1)-time operation, we could use a more
      // legitimate queue structure. For our time complexity analysis, we'll
      // assume this runs in O(1) time.
      auto currentPosition = queue.front();
      queue.erase(queue.begin());
      int currentRow = currentPosition[0];
      int currentCol = currentPosition[1];

      vector<vector<int>> adjacentPositions =
          getAdjacentPositions(currentRow, currentCol, matrix);
      for (const auto &position : adjacentPositions) {
        int row = position[0];
        int col = position[1];

        int value = matrix[row][col];
        if (value < 0) {
          matrix[row][col] *= -1;
          queue.push_back({row, col});
        }
      }

      currentSize--;
    }

    passes++;
  }

  return passes;
}

vector<vector<int>> getAllPositivePositions(const vector<vector<int>> &matrix) {
  vector<vector<int>> positivePositions;

  for (int row = 0; row < matrix.size(); row++) {
    for (int col = 0; col < matrix[row].size(); col++) {
      int value = matrix[row][col];
      if (value > 0)
        positivePositions.push_back({row, col});
    }
  }

  return positivePositions;
}

vector<vector<int>> getAdjacentPositions(int row, int col,
                                         const vector<vector<int>> &matrix) {
  vector<vector<int>> adjacentPositions;

  if (row > 0)
    adjacentPositions.push_back({row - 1, col});
  if (row < matrix.size() - 1)
    adjacentPositions.push_back({row + 1, col});
  if (col > 0)
    adjacentPositions.push_back({row, col - 1});
  if (col < matrix[0].size() - 1)
    adjacentPositions.push_back({row, col + 1});

  return adjacentPositions;
}

bool containsNegative(const vector<vector<int>> &matrix) {
  for (const auto &row : matrix) {
    for (const auto &value : row) {
      if (value < 0)
        return true;
    }
  }

  return false;
}
```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> input = {
          {0, -1, -3, 2, 0}, {1, -2, -5, -1, -3}, {3, 0, 0, -4, -1}};
      ;
      auto expected = 3;
      auto actual = minimumPassesOfMatrix(input);
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


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[][] matrix = new int[][] {
			new int[] { 0, -1, -3, 2, 0 },
			new int[] { 1, -2, -5, -1, -3 },
			new int[] { 3, 0, 0, -4, -1 },
		};
		int expected = 3;
		int actual = new Program().MinimumPassesOfMatrix(matrix);
		Utils.AssertTrue(expected == actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {
	// O(w * h) time | O(w * h) space - where w is the
	// width of the matrix and h is the height
	public int MinimumPassesOfMatrix(int[][] matrix) {
		int passes = convertNegatives(matrix);
		return (!containsNegative(matrix)) ? passes - 1 : -1;
	}

	public int convertNegatives(int[][] matrix) {

		List<int[]> nextPassQueue = getAllPositivePositions(matrix);

		int passes = 0;

		while (nextPassQueue.Count > 0) {
			List<int[]> currentPassQueue = nextPassQueue;
			nextPassQueue = new List<int[]>();

			while (currentPassQueue.Count > 0) {
				// In C#, removing elements from the start of a list is an O(n)-time operation.
				// To make this an O(1)-time operation, we could use a more legitimate queue structure.
				// For our time complexity analysis, we'll assume this runs in O(1) time.
				// Also, for this particular solution (Solution #1), we could actually
				// just turn this queue into a stack and replace `.RemoveAt(0)` with the
				// constant-time `Pop()` operation.
				int[] vals = currentPassQueue[0];
				currentPassQueue.RemoveAt(0);
				int currentRow = vals[0];
				int currentCol = vals[1];

				List<int[]> adjacentPositions = getAdjacentPositions(currentRow,
				    currentCol,
				    matrix);
				foreach (var position in adjacentPositions) {
					int row = position[0];
					int col = position[1];

					int value = matrix[row][col];
					if (value < 0) {
						matrix[row][col] *= -1;
						nextPassQueue.Add(new int[] { row, col });
					}
				}
			}

			passes += 1;
		}

		return passes;

	}

	public List<int[]> getAllPositivePositions(int[][] matrix) {
		List<int[]> positivePositions = new List<int[]>();

		for (int row = 0; row < matrix.Length; row++) {
			for (int col = 0; col < matrix[row].Length; col++) {
				int value = matrix[row][col];
				if (value > 0) {
					positivePositions.Add(new int[] { row, col });
				}
			}
		}

		return positivePositions;
	}

	public List<int[]> getAdjacentPositions(int row, int col, int[][] matrix) {
		List<int[]> adjacentPositions = new List<int[]>();

		if (row > 0) {
			adjacentPositions.Add(new int[] { row - 1, col });
		}
		if (row < matrix.Length - 1) {
			adjacentPositions.Add(new int[] { row + 1, col });
		}
		if (col > 0) {
			adjacentPositions.Add(new int[] { row, col - 1 });
		}
		if (col < (matrix[0].Length - 1)) {
			adjacentPositions.Add(new int[] { row, col + 1 });
		}

		return adjacentPositions;
	}

	public bool containsNegative(int[][] matrix) {
		foreach (var row in matrix) {
			foreach (var value in row) {
				if (value < 0) {
					return true;
				}
			}
		}

		return false;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {
	// O(w * h) time | O(w * h) space - where w is the
	// width of the matrix and h is the height
	public int MinimumPassesOfMatrix(int[][] matrix) {
		int passes = convertNegatives(matrix);
		return (!containsNegative(matrix)) ? passes - 1 : -1;
	}

	public int convertNegatives(int[][] matrix) {

		List<int[]> queue = getAllPositivePositions(matrix);

		int passes = 0;

		while (queue.Count > 0) {
			int currentSize = queue.Count;

			while (currentSize > 0) {
				// In C#, removing elements from the start of a list is an O(n)-time operation.
				// To make this an O(1)-time operation, we could use a more legitimate queue structure.
				// For our time complexity analysis, we'll assume this runs in O(1) time.
				int[] vals = queue[0];
				queue.RemoveAt(0);
				int currentRow = vals[0];
				int currentCol = vals[1];

				List<int[]> adjacentPositions = getAdjacentPositions(currentRow,
				    currentCol,
				    matrix);
				foreach (var position in adjacentPositions) {
					int row = position[0];
					int col = position[1];

					int value = matrix[row][col];
					if (value < 0) {
						matrix[row][col] *= -1;
						queue.Add(new int[] { row, col });
					}
				}

				currentSize -= 1;
			}

			passes += 1;
		}

		return passes;

	}

	public List<int[]> getAllPositivePositions(int[][] matrix) {
		List<int[]> positivePositions = new List<int[]>();

		for (int row = 0; row < matrix.Length; row++) {
			for (int col = 0; col < matrix[row].Length; col++) {
				int value = matrix[row][col];
				if (value > 0) {
					positivePositions.Add(new int[] { row, col });
				}
			}
		}

		return positivePositions;
	}

	public List<int[]> getAdjacentPositions(int row, int col, int[][] matrix) {
		List<int[]> adjacentPositions = new List<int[]>();

		if (row > 0) {
			adjacentPositions.Add(new int[] { row - 1, col });
		}
		if (row < matrix.Length - 1) {
			adjacentPositions.Add(new int[] { row + 1, col });
		}
		if (col > 0) {
			adjacentPositions.Add(new int[] { row, col - 1 });
		}
		if (col < (matrix[0].Length - 1)) {
			adjacentPositions.Add(new int[] { row, col + 1 });
		}

		return adjacentPositions;
	}

	public bool containsNegative(int[][] matrix) {
		foreach (var row in matrix) {
			foreach (var value in row) {
				if (value < 0) {
					return true;
				}
			}
		}

		return false;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;
using System.Linq;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[][] matrix = new int[][] {
			new int[] { 0, -1, -3, 2, 0 },
			new int[] { 1, -2, -5, -1, -3 },
			new int[] { 3, 0, 0, -4, -1 },
		};
		int expected = 3;
		int actual = new Program().MinimumPassesOfMatrix(matrix);
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
	input := [][]int{
		{0, -1, -3, 2, 0},
		{1, -2, -5, -1, -3},
		{3, 0, 0, -4, -1},
	}
	expected := 3
	actual := MinimumPassesOfMatrix(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type IntPair struct {
	First, Second int
}

// O(w * h) time | O(w * h) space - where w is the
// width of the matrix and h is the height
func MinimumPassesOfMatrix(matrix [][]int) int {
	passes := convertNegatives(matrix)
	if !containsNegative(matrix) {
		return passes - 1
	} else {
		return -1
	}
}

func convertNegatives(matrix [][]int) int {
	nextPassQueue := getAllPositivePositions(matrix)

	var passes = 0

	for len(nextPassQueue) > 0 {
		currentPassQueue := nextPassQueue
		nextPassQueue = make([]IntPair, 0)

		for len(currentPassQueue) > 0 {
			// In Go, removing elements from the start of a list is an O(n)-time operation.
			// To make this an O(1)-time operation, we could use a more legitimate queue structure.
			// For our time complexity analysis, we'll assume this runs in O(1) time.
			// Also, for this particular solution (Solution #1), we could actually
			// just turn this queue into a stack and replace the removal of the first element
			// with the removal of the last element.
			firstElement := currentPassQueue[0]
			currentPassQueue = currentPassQueue[1:]
			currentRow, currentCol := firstElement.First, firstElement.Second

			adjacentPositions := getAdjacentPositions(currentRow, currentCol, matrix)
			for _, position := range adjacentPositions {
				row, col := position.First, position.Second

				value := matrix[row][col]
				if value < 0 {
					matrix[row][col] *= -1
					nextPassQueue = append(nextPassQueue, IntPair{row, col})
				}
			}
		}

		passes += 1
	}

	return passes
}

func getAllPositivePositions(matrix [][]int) []IntPair {
	positivePositions := make([]IntPair, 0)
	for row := range matrix {
		for col := range matrix[row] {
			value := matrix[row][col]
			if value > 0 {
				positivePositions = append(positivePositions, IntPair{row, col})
			}
		}
	}
	return positivePositions
}

func getAdjacentPositions(row int, col int, matrix [][]int) []IntPair {
	adjacentPositions := make([]IntPair, 0)

	if row > 0 {
		adjacentPositions = append(adjacentPositions, IntPair{row - 1, col})
	}
	if row < len(matrix)-1 {
		adjacentPositions = append(adjacentPositions, IntPair{row + 1, col})
	}
	if col > 0 {
		adjacentPositions = append(adjacentPositions, IntPair{row, col - 1})
	}
	if col < len(matrix[0])-1 {
		adjacentPositions = append(adjacentPositions, IntPair{row, col + 1})
	}

	return adjacentPositions
}

func containsNegative(matrix [][]int) bool {
	for _, row := range matrix {
		for _, value := range row {
			if value < 0 {
				return true
			}
		}
	}
	return false
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type IntPair struct {
	First, Second int
}

// O(w * h) time | O(w * h) space - where w is the
// width of the matrix and h is the height
func MinimumPassesOfMatrix(matrix [][]int) int {
	passes := convertNegatives(matrix)
	if !containsNegative(matrix) {
		return passes - 1
	} else {
		return -1
	}
}

func convertNegatives(matrix [][]int) int {
	queue := getAllPositivePositions(matrix)

	var passes = 0
	for len(queue) > 0 {
		var currentSize = len(queue)

		for currentSize > 0 {
			// In Go, removing elements from the start of a list is an O(n)-time operation.
			// To make this an O(1)-time operation, we could use a more legitimate queue structure.
			// For our time complexity analysis, we'll assume this runs in O(1) time.
			nextElement := queue[0]
			queue = queue[1:]
			currentRow, currentCol := nextElement.First, nextElement.Second

			adjacentPositions := getAdjacentPositions(currentRow, currentCol, matrix)
			for _, position := range adjacentPositions {
				row, col := position.First, position.Second

				value := matrix[row][col]
				if value < 0 {
					matrix[row][col] *= -1
					queue = append(queue, IntPair{row, col})
				}
			}

			currentSize -= 1
		}

		passes += 1
	}

	return passes
}

func getAllPositivePositions(matrix [][]int) []IntPair {
	positivePositions := make([]IntPair, 0)
	for row := range matrix {
		for col := range matrix[row] {
			value := matrix[row][col]
			if value > 0 {
				positivePositions = append(positivePositions, IntPair{row, col})
			}
		}
	}
	return positivePositions
}

func getAdjacentPositions(row int, col int, matrix [][]int) []IntPair {
	adjacentPositions := make([]IntPair, 0)

	if row > 0 {
		adjacentPositions = append(adjacentPositions, IntPair{row - 1, col})
	}
	if row < len(matrix)-1 {
		adjacentPositions = append(adjacentPositions, IntPair{row + 1, col})
	}
	if col > 0 {
		adjacentPositions = append(adjacentPositions, IntPair{row, col - 1})
	}
	if col < len(matrix[0])-1 {
		adjacentPositions = append(adjacentPositions, IntPair{row, col + 1})
	}

	return adjacentPositions
}

func containsNegative(matrix [][]int) bool {
	for _, row := range matrix {
		for _, value := range row {
			if value < 0 {
				return true
			}
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
		{0, -1, -3, 2, 0},
		{1, -2, -5, -1, -3},
		{3, 0, 0, -4, -1},
	}
	expected := 3
	actual := MinimumPassesOfMatrix(input)
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
    int[][] matrix = new int[][] {{0, -1, -3, 2, 0}, {1, -2, -5, -1, -3}, {3, 0, 0, -4, -1}};
    int expected = 3;
    int actual = new Program().minimumPassesOfMatrix(matrix);
    assert (expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(w * h) time | O(w * h) space - where w is the
  // width of the matrix and h is the height
  public int minimumPassesOfMatrix(int[][] matrix) {
    int passes = convertNegatives(matrix);
    return (!containsNegative(matrix)) ? passes - 1 : -1;
  }

  public int convertNegatives(int[][] matrix) {

    ArrayList<int[]> nextPassQueue = getAllPositivePositions(matrix);

    int passes = 0;

    while (nextPassQueue.size() > 0) {
      ArrayList<int[]> currentPassQueue = nextPassQueue;
      nextPassQueue = new ArrayList<int[]>();

      while (currentPassQueue.size() > 0) {
        // In Java, removing elements from the start of a list is an O(n)-time operation.
        // To make this an O(1)-time operation, we could use a more legitimate queue structure.
        // For our time complexity analysis, we'll assume this runs in O(1) time.
        // Also, for this particular solution (Solution #1), we could actually
        // just turn this queue into a stack and replace `.remove(0)` with the
        // constant-time `pop()` operation.
        int[] vals = currentPassQueue.remove(0);
        int currentRow = vals[0];
        int currentCol = vals[1];

        ArrayList<int[]> adjacentPositions = getAdjacentPositions(currentRow, currentCol, matrix);
        for (int[] position : adjacentPositions) {
          int row = position[0];
          int col = position[1];

          int value = matrix[row][col];
          if (value < 0) {
            matrix[row][col] *= -1;
            nextPassQueue.add(new int[] {row, col});
          }
        }
      }

      passes += 1;
    }

    return passes;
  }

  public ArrayList<int[]> getAllPositivePositions(int[][] matrix) {
    ArrayList<int[]> positivePositions = new ArrayList<int[]>();

    for (int row = 0; row < matrix.length; row++) {
      for (int col = 0; col < matrix[row].length; col++) {
        int value = matrix[row][col];
        if (value > 0) {
          positivePositions.add(new int[] {row, col});
        }
      }
    }

    return positivePositions;
  }

  public ArrayList<int[]> getAdjacentPositions(int row, int col, int[][] matrix) {
    ArrayList<int[]> adjacentPositions = new ArrayList<int[]>();

    if (row > 0) {
      adjacentPositions.add(new int[] {row - 1, col});
    }
    if (row < matrix.length - 1) {
      adjacentPositions.add(new int[] {row + 1, col});
    }
    if (col > 0) {
      adjacentPositions.add(new int[] {row, col - 1});
    }
    if (col < (matrix[0].length - 1)) {
      adjacentPositions.add(new int[] {row, col + 1});
    }

    return adjacentPositions;
  }

  public boolean containsNegative(int[][] matrix) {
    for (int[] row : matrix) {
      for (int value : row) {
        if (value < 0) {
          return true;
        }
      }
    }

    return false;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(w * h) time | O(w * h) space - where w is the
  // width of the matrix and h is the height
  public int minimumPassesOfMatrix(int[][] matrix) {
    int passes = convertNegatives(matrix);
    return (!containsNegative(matrix)) ? passes - 1 : -1;
  }

  public int convertNegatives(int[][] matrix) {

    ArrayList<int[]> queue = getAllPositivePositions(matrix);

    int passes = 0;

    while (queue.size() > 0) {
      int currentSize = queue.size();

      while (currentSize > 0) {
        // In Java, removing elements from the start of a list is an O(n)-time operation.
        // To make this an O(1)-time operation, we could use a more legitimate queue structure.
        // For our time complexity analysis, we'll assume this runs in O(1) time.
        int[] vals = queue.remove(0);
        int currentRow = vals[0];
        int currentCol = vals[1];

        ArrayList<int[]> adjacentPositions = getAdjacentPositions(currentRow, currentCol, matrix);
        for (int[] position : adjacentPositions) {
          int row = position[0];
          int col = position[1];

          int value = matrix[row][col];
          if (value < 0) {
            matrix[row][col] *= -1;
            queue.add(new int[] {row, col});
          }
        }

        currentSize -= 1;
      }

      passes += 1;
    }

    return passes;
  }

  public ArrayList<int[]> getAllPositivePositions(int[][] matrix) {
    ArrayList<int[]> positivePositions = new ArrayList<int[]>();

    for (int row = 0; row < matrix.length; row++) {
      for (int col = 0; col < matrix[row].length; col++) {
        int value = matrix[row][col];
        if (value > 0) {
          positivePositions.add(new int[] {row, col});
        }
      }
    }

    return positivePositions;
  }

  public ArrayList<int[]> getAdjacentPositions(int row, int col, int[][] matrix) {
    ArrayList<int[]> adjacentPositions = new ArrayList<int[]>();

    if (row > 0) {
      adjacentPositions.add(new int[] {row - 1, col});
    }
    if (row < matrix.length - 1) {
      adjacentPositions.add(new int[] {row + 1, col});
    }
    if (col > 0) {
      adjacentPositions.add(new int[] {row, col - 1});
    }
    if (col < (matrix[0].length - 1)) {
      adjacentPositions.add(new int[] {row, col + 1});
    }

    return adjacentPositions;
  }

  public boolean containsNegative(int[][] matrix) {
    for (int[] row : matrix) {
      for (int value : row) {
        if (value < 0) {
          return true;
        }
      }
    }

    return false;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[][] matrix = new int[][] {{0, -1, -3, 2, 0}, {1, -2, -5, -1, -3}, {3, 0, 0, -4, -1}};
    int expected = 3;
    int actual = new Program().minimumPassesOfMatrix(matrix);
    assert (expected == actual);
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
    [0, -1, -3, 2, 0],
    [1, -2, -5, -1, -3],
    [3, 0, 0, -4, -1],
  ];
  const expected = 3;
  const actual = program.minimumPassesOfMatrix(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(w * h) time | O(w * h) space - where w is the
// width of the matrix and h is the height
function minimumPassesOfMatrix(matrix) {
  const passes = convertNegatives(matrix);
  return !containsNegative(matrix) ? passes - 1 : -1;
}

function convertNegatives(matrix) {
  let nextPassQueue = getAllPositivePositions(matrix);

  let passes = 0;

  while (nextPassQueue.length > 0) {
    const currentPassQueue = nextPassQueue;
    nextPassQueue = [];

    while (currentPassQueue.length > 0) {
      // In JavaScript, shifting elements from the start of an array is an O(n)-time operation.
      // To make this an O(1)-time operation, we could use a more legitimate queue structure.
      // For our time complexity analysis, we'll assume this runs in O(1) time.
      // Also, for this particular solution (Solution #1), we could actually
      // just turn this queue into a stack and replace `.shift()` with the
      // constant-time `.pop()` operation.
      const [currentRow, currentCol] = currentPassQueue.shift();

      const adjacentPositions = getAdjacentPositions(currentRow, currentCol, matrix);
      for (const position of adjacentPositions) {
        const [row, col] = position;

        const value = matrix[row][col];
        if (value < 0) {
          matrix[row][col] *= -1;
          nextPassQueue.push([row, col]);
        }
      }
    }

    passes++;
  }

  return passes;
}

function getAllPositivePositions(matrix) {
  const positivePositions = [];

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const value = matrix[row][col];
      if (value > 0) positivePositions.push([row, col]);
    }
  }

  return positivePositions;
}

function getAdjacentPositions(row, col, matrix) {
  const adjacentPositions = [];

  if (row > 0) adjacentPositions.push([row - 1, col]);
  if (row < matrix.length - 1) adjacentPositions.push([row + 1, col]);
  if (col > 0) adjacentPositions.push([row, col - 1]);
  if (col < matrix[0].length - 1) adjacentPositions.push([row, col + 1]);

  return adjacentPositions;
}

function containsNegative(matrix) {
  for (const row of matrix) {
    for (const value of row) {
      if (value < 0) return true;
    }
  }

  return false;
}

// Do not edit the line below.
exports.minimumPassesOfMatrix = minimumPassesOfMatrix;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(w * h) time | O(w * h) space - where w is the
// width of the matrix and h is the height
function minimumPassesOfMatrix(matrix) {
  const passes = convertNegatives(matrix);
  return !containsNegative(matrix) ? passes - 1 : -1;
}

function convertNegatives(matrix) {
  const queue = getAllPositivePositions(matrix);

  let passes = 0;

  while (queue.length > 0) {
    let currentSize = queue.length;

    while (currentSize > 0) {
      // In JavaScript, shifting elements from the start of an array is an O(n)-time operation.
      // To make this an O(1)-time operation, we could use a more legitimate queue structure.
      // For our time complexity analysis, we'll assume this runs in O(1) time.
      const [currentRow, currentCol] = queue.shift();

      const adjacentPositions = getAdjacentPositions(currentRow, currentCol, matrix);
      for (const position of adjacentPositions) {
        const [row, col] = position;

        const value = matrix[row][col];
        if (value < 0) {
          matrix[row][col] *= -1;
          queue.push([row, col]);
        }
      }

      currentSize--;
    }

    passes++;
  }

  return passes;
}

function getAllPositivePositions(matrix) {
  const positivePositions = [];

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const value = matrix[row][col];
      if (value > 0) positivePositions.push([row, col]);
    }
  }

  return positivePositions;
}

function getAdjacentPositions(row, col, matrix) {
  const adjacentPositions = [];

  if (row > 0) adjacentPositions.push([row - 1, col]);
  if (row < matrix.length - 1) adjacentPositions.push([row + 1, col]);
  if (col > 0) adjacentPositions.push([row, col - 1]);
  if (col < matrix[0].length - 1) adjacentPositions.push([row, col + 1]);

  return adjacentPositions;
}

function containsNegative(matrix) {
  for (const row of matrix) {
    for (const value of row) {
      if (value < 0) return true;
    }
  }

  return false;
}

// Do not edit the line below.
exports.minimumPassesOfMatrix = minimumPassesOfMatrix;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [
    [0, -1, -3, 2, 0],
    [1, -2, -5, -1, -3],
    [3, 0, 0, -4, -1],
  ];
  const expected = 3;
  const actual = program.minimumPassesOfMatrix(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.minimumPassesOfMatrix

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(
            mutableListOf(0, -1, -3, 2, 0),
            mutableListOf(1, -2, -5, -1, -3),
            mutableListOf(3, 0, 0, -4, -1)
        )
        val expected = 3
        val output = minimumPassesOfMatrix(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(w * h) time | O(w * h) space - where w is the
// width of the matrix and h is the height
fun minimumPassesOfMatrix(matrix: MutableList<MutableList<Int>>): Int {
    val passes = convertNegatives(matrix)
    return if (!containsNegative(matrix)) passes - 1 else -1
}

fun convertNegatives(matrix: MutableList<MutableList<Int>>): Int {
    var nextPassQueue = getAllPositivePositions(matrix)

    var passes = 0

    while (nextPassQueue.size > 0) {
        val currentPassQueue = nextPassQueue
        nextPassQueue = mutableListOf<Pair<Int, Int>>()

        while (currentPassQueue.size > 0) {
            // In Kotlin, removing elements from the start of a list is an O(n)-time operation.
            // To make this an O(1)-time operation, we could use a more legitimate queue structure.
            // For our time complexity analysis, we'll assume this runs in O(1) time.
            // Also, for this particular solution (Solution #1), we could actually
            // just turn this queue into a stack and replace `.removeAt(0)` with the
            // constant-time `.removeAt(currentPassQueue.size - 1)` operation.
            val (currentRow, currentCol) = currentPassQueue.removeAt(0)

            val adjacentPositions = getAdjacentPositions(
                currentRow,
                currentCol,
                matrix
            )
            for (position in adjacentPositions) {
                val (row, col) = position

                val value = matrix[row][col]
                if (value < 0) {
                    matrix[row][col] *= -1
                    nextPassQueue.add(Pair(row, col))
                }
            }
        }

        passes += 1
    }

    return passes
}

fun getAllPositivePositions(matrix: MutableList<MutableList<Int>>): MutableList<Pair<Int, Int>> {
    val positivePositions = mutableListOf<Pair<Int, Int>>()

    for (row in 0 until matrix.size) {
        for (col in 0 until matrix[row].size) {
            val value = matrix[row][col]
            if (value > 0) positivePositions.add(Pair(row, col))
        }
    }

    return positivePositions
}

fun getAdjacentPositions(row: Int, col: Int, matrix: MutableList<MutableList<Int>>): List<Pair<Int, Int>> {
    val adjacentPositions = mutableListOf<Pair<Int, Int>>()

    if (row > 0) adjacentPositions.add(Pair(row - 1, col))
    if (row < matrix.size - 1) adjacentPositions.add(Pair(row + 1, col))
    if (col > 0) adjacentPositions.add(Pair(row, col - 1))
    if (col < matrix[0].size - 1) adjacentPositions.add(Pair(row, col + 1))

    return adjacentPositions
}

fun containsNegative(matrix: MutableList<MutableList<Int>>): Boolean {
    for (row in matrix) {
        for (value in row) {
            if (value < 0) return true
        }
    }

    return false
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(w * h) time | O(w * h) space - where w is the
// width of the matrix and h is the height
fun minimumPassesOfMatrix(matrix: MutableList<MutableList<Int>>): Int {
    val passes = convertNegatives(matrix)
    return if (!containsNegative(matrix)) passes - 1 else -1
}

fun convertNegatives(matrix: MutableList<MutableList<Int>>): Int {
    val queue = getAllPositivePositions(matrix)

    var passes = 0

    while (queue.size > 0) {
        var currentSize = queue.size

        while (currentSize > 0) {
            // In Kotlin, removing elements from the start of a list is an O(n)-time operation.
            // To make this an O(1)-time operation, we could use a more legitimate queue structure.
            // For our time complexity analysis, we'll assume this runs in O(1) time.
            val (currentRow, currentCol) = queue.removeAt(0)

            val adjacentPositions = getAdjacentPositions(
                currentRow,
                currentCol,
                matrix
            )
            for (position in adjacentPositions) {
                val (row, col) = position

                val value = matrix[row][col]
                if (value < 0) {
                    matrix[row][col] *= -1
                    queue.add(Pair(row, col))
                }
            }

            currentSize -= 1
        }

        passes += 1
    }

    return passes
}

fun getAllPositivePositions(matrix: MutableList<MutableList<Int>>): MutableList<Pair<Int, Int>> {
    val positivePositions = mutableListOf<Pair<Int, Int>>()

    for (row in 0 until matrix.size) {
        for (col in 0 until matrix[row].size) {
            val value = matrix[row][col]
            if (value > 0) positivePositions.add(Pair(row, col))
        }
    }

    return positivePositions
}

fun getAdjacentPositions(row: Int, col: Int, matrix: MutableList<MutableList<Int>>): List<Pair<Int, Int>> {
    val adjacentPositions = mutableListOf<Pair<Int, Int>>()

    if (row > 0) adjacentPositions.add(Pair(row - 1, col))
    if (row < matrix.size - 1) adjacentPositions.add(Pair(row + 1, col))
    if (col > 0) adjacentPositions.add(Pair(row, col - 1))
    if (col < matrix[0].size - 1) adjacentPositions.add(Pair(row, col + 1))

    return adjacentPositions
}

fun containsNegative(matrix: MutableList<MutableList<Int>>): Boolean {
    for (row in matrix) {
        for (value in row) {
            if (value < 0) return true
        }
    }

    return false
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.minimumPassesOfMatrix

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(
            mutableListOf(0, -1, -3, 2, 0),
            mutableListOf(1, -2, -5, -1, -3),
            mutableListOf(3, 0, 0, -4, -1)
        )
        val expected = 3
        val output = minimumPassesOfMatrix(input)
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
        [0, -1, -3, 2, 0],
        [1, -2, -5, -1, -3],
        [3, 0, 0, -4, -1],
      ]
      var expected = 3
      var actual = Program().minimumPassesOfMatrix(&input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(w * h) time | O(w * h) space - where w is the
  // width of the matrix and h is the height
  func minimumPassesOfMatrix(_ matrix: inout [[Int]]) -> Int {
    let passes = convertNegatives(&matrix)
    if !containsNegative(&matrix) {
      return passes - 1
    } else {
      return -1
    }
  }

  func convertNegatives(_ matrix: inout [[Int]]) -> Int {
    var nextPassQueue = getAllPositivePositions(&matrix)

    var passes = 0

    while nextPassQueue.count > 0 {
      var currentPassQueue = nextPassQueue
      nextPassQueue = [(Int, Int)]()

      while currentPassQueue.count > 0 {
        // In Swift, removing elements from the start of a list is an O(n)-time operation.
        // To make this an O(1)-time operation, we could use a more legitimate queue structure.
        // For our time complexity analysis, we'll assume this runs in O(1) time.
        // Also, for this particular solution (Solution #1), we could actually
        // just turn this queue into a stack and replace `.removeFirst()` with the
        // constant-time `removeLast()` operation.
        let firstElement = currentPassQueue[0]
        currentPassQueue.removeFirst()
        let (currentRow, currentCol) = (firstElement.0, firstElement.1)

        let adjacentPositions = getAdjacentPositions(currentRow, currentCol, &matrix)
        for position in adjacentPositions {
          let (row, col) = (position.0, position.1)

          let value = matrix[row][col]
          if value < 0 {
            matrix[row][col] *= -1
            nextPassQueue.append((row, col))
          }
        }
      }

      passes += 1
    }

    return passes
  }

  func getAllPositivePositions(_ matrix: inout [[Int]]) -> [(Int, Int)] {
    var positivePositions = [(Int, Int)]()
    for row in 0 ..< matrix.count {
      for col in 0 ..< matrix[row].count {
        let value = matrix[row][col]
        if value > 0 {
          positivePositions.append((row, col))
        }
      }
    }
    return positivePositions
  }

  func getAdjacentPositions(_ row: Int, _ col: Int, _ matrix: inout [[Int]]) -> [(Int, Int)] {
    var adjacentPositions = [(Int, Int)]()

    if row > 0 {
      adjacentPositions.append((row - 1, col))
    }
    if row < matrix.count - 1 {
      adjacentPositions.append((row + 1, col))
    }
    if col > 0 {
      adjacentPositions.append((row, col - 1))
    }
    if col < matrix[0].count - 1 {
      adjacentPositions.append((row, col + 1))
    }

    return adjacentPositions
  }

  func containsNegative(_ matrix: inout [[Int]]) -> Bool {
    for row in matrix {
      for value in row {
        if value < 0 {
          return true
        }
      }
    }
    return false
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(w * h) time | O(w * h) space - where w is the
  // width of the matrix and h is the height
  func minimumPassesOfMatrix(_ matrix: inout [[Int]]) -> Int {
    let passes = convertNegatives(&matrix)
    if !containsNegative(&matrix) {
      return passes - 1
    } else {
      return -1
    }
  }

  func convertNegatives(_ matrix: inout [[Int]]) -> Int {
    var queue = getAllPositivePositions(&matrix)

    var passes = 0

    while queue.count > 0 {
      var currentSize = queue.count

      while currentSize > 0 {
        // In Swift, removing elements from the start of a list is an O(n)-time operation.
        // To make this an O(1)-time operation, we could use a more legitimate queue structure.
        // For our time complexity analysis, we'll assume this runs in O(1) time.
        let firstElement = queue[0]
        queue.removeFirst()
        let (currentRow, currentCol) = (firstElement.0, firstElement.1)

        let adjacentPositions = getAdjacentPositions(currentRow, currentCol, &matrix)
        for position in adjacentPositions {
          let (row, col) = (position.0, position.1)

          let value = matrix[row][col]
          if value < 0 {
            matrix[row][col] *= -1
            queue.append((row, col))
          }
        }

        currentSize -= 1
      }

      passes += 1
    }

    return passes
  }

  func getAllPositivePositions(_ matrix: inout [[Int]]) -> [(Int, Int)] {
    var positivePositions = [(Int, Int)]()
    for row in 0 ..< matrix.count {
      for col in 0 ..< matrix[row].count {
        let value = matrix[row][col]
        if value > 0 {
          positivePositions.append((row, col))
        }
      }
    }
    return positivePositions
  }

  func getAdjacentPositions(_ row: Int, _ col: Int, _ matrix: inout [[Int]]) -> [(Int, Int)] {
    var adjacentPositions = [(Int, Int)]()

    if row > 0 {
      adjacentPositions.append((row - 1, col))
    }
    if row < matrix.count - 1 {
      adjacentPositions.append((row + 1, col))
    }
    if col > 0 {
      adjacentPositions.append((row, col - 1))
    }
    if col < matrix[0].count - 1 {
      adjacentPositions.append((row, col + 1))
    }

    return adjacentPositions
  }

  func containsNegative(_ matrix: inout [[Int]]) -> Bool {
    for row in matrix {
      for value in row {
        if value < 0 {
          return true
        }
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
        [0, -1, -3, 2, 0],
        [1, -2, -5, -1, -3],
        [3, 0, 0, -4, -1],
      ]
      var expected = 3
      var actual = Program().minimumPassesOfMatrix(&input)
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
            [0, -1, -3, 2, 0],
            [1, -2, -5, -1, -3],
            [3, 0, 0, -4, -1],
        ]
        expected = 3
        actual = program.minimumPassesOfMatrix(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(w * h) time | O(w * h) space - where w is the
# width of the matrix and h is the height
def minimumPassesOfMatrix(matrix):
    passes = convertNegatives(matrix)
    return passes - 1 if not containsNegative(matrix) else -1


def convertNegatives(matrix):
    nextPassQueue = getAllPositivePositions(matrix)

    passes = 0

    while len(nextPassQueue) > 0:
        currentPassQueue = nextPassQueue
        nextPassQueue = []

        while len(currentPassQueue) > 0:
            # In Python, popping elements from the start of a list is an O(n)-time operation.
            # To make this an O(1)-time operation, we could use the `deque` object.
            # For our time complexity analysis, we'll assume this runs in O(1) time.
            # Also, for this particular solution (Solution #1), we could actually
            # just turn this queue into a stack and replace `.pop(0)` with the
            # constant-time `.pop()` operation.
            currentRow, currentCol = currentPassQueue.pop(0)

            adjacentPositions = getAdjacentPositions(currentRow, currentCol, matrix)
            for position in adjacentPositions:
                row, col = position

                value = matrix[row][col]
                if value < 0:
                    matrix[row][col] *= -1
                    nextPassQueue.append([row, col])

        passes += 1

    return passes


def getAllPositivePositions(matrix):
    positivePositions = []

    for row in range(len(matrix)):
        for col in range(len(matrix[row])):
            value = matrix[row][col]
            if value > 0:
                positivePositions.append([row, col])

    return positivePositions


def getAdjacentPositions(row, col, matrix):
    adjacentPositions = []

    if row > 0:
        adjacentPositions.append([row - 1, col])
    if row < len(matrix) - 1:
        adjacentPositions.append([row + 1, col])
    if col > 0:
        adjacentPositions.append([row, col - 1])
    if col < len(matrix[0]) - 1:
        adjacentPositions.append([row, col + 1])

    return adjacentPositions


def containsNegative(matrix):
    for row in matrix:
        for value in row:
            if value < 0:
                return True

    return False

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(w * h) time | O(w * h) space - where w is the
# width of the matrix and h is the height
def minimumPassesOfMatrix(matrix):
    passes = convertNegatives(matrix)
    return passes - 1 if not containsNegative(matrix) else -1


def convertNegatives(matrix):
    queue = getAllPositivePositions(matrix)

    passes = 0

    while len(queue) > 0:
        currentSize = len(queue)

        while currentSize > 0:
            # In Python, popping elements from the start of a list is an O(n)-time operation.
            # To make this an O(1)-time operation, we could use the `deque` object.
            # For our time complexity analysis, we'll assume this runs in O(1) time.
            currentRow, currentCol = queue.pop(0)

            adjacentPositions = getAdjacentPositions(currentRow, currentCol, matrix)
            for position in adjacentPositions:
                row, col = position

                value = matrix[row][col]
                if value < 0:
                    matrix[row][col] *= -1
                    queue.append([row, col])

            currentSize -= 1

        passes += 1

    return passes


def getAllPositivePositions(matrix):
    positivePositions = []

    for row in range(len(matrix)):
        for col in range(len(matrix[row])):
            value = matrix[row][col]
            if value > 0:
                positivePositions.append([row, col])

    return positivePositions


def getAdjacentPositions(row, col, matrix):
    adjacentPositions = []

    if row > 0:
        adjacentPositions.append([row - 1, col])
    if row < len(matrix) - 1:
        adjacentPositions.append([row + 1, col])
    if col > 0:
        adjacentPositions.append([row, col - 1])
    if col < len(matrix[0]) - 1:
        adjacentPositions.append([row, col + 1])

    return adjacentPositions


def containsNegative(matrix):
    for row in matrix:
        for value in row:
            if value < 0:
                return True

    return False

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [
            [0, -1, -3, 2, 0],
            [1, -2, -5, -1, -3],
            [3, 0, 0, -4, -1],
        ]
        expected = 3
        actual = program.minimumPassesOfMatrix(input)
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
    [0, -1, -3, 2, 0],
    [1, -2, -5, -1, -3],
    [3, 0, 0, -4, -1],
  ];
  const expected = 3;
  const actual = program.minimumPassesOfMatrix(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(w * h) time | O(w * h) space - where w is the
// width of the matrix and h is the height
export function minimumPassesOfMatrix(matrix: number[][]) {
  const passes = convertNegatives(matrix);
  return !containsNegative(matrix) ? passes - 1 : -1;
}

function convertNegatives(matrix: number[][]) {
  let nextPassQueue = getAllPositivePositions(matrix);

  let passes = 0;

  while (nextPassQueue.length > 0) {
    const currentPassQueue = nextPassQueue;
    nextPassQueue = [];

    while (currentPassQueue.length > 0) {
      // In JavaScript, shifting elements from the start of an array is an O(n)-time operation.
      // To make this an O(1)-time operation, we could use a more legitimate queue structure.
      // For our time complexity analysis, we'll assume this runs in O(1) time.
      // Also, for this particular solution (Solution #1), we could actually
      // just turn this queue into a stack and replace `.shift()` with the
      // constant-time `.pop()` operation.
      const [currentRow, currentCol] = currentPassQueue.shift()!;

      const adjacentPositions = getAdjacentPositions(currentRow, currentCol, matrix);
      for (const position of adjacentPositions) {
        const [row, col] = position;

        const value = matrix[row][col];
        if (value < 0) {
          matrix[row][col] *= -1;
          nextPassQueue.push([row, col]);
        }
      }
    }

    passes++;
  }

  return passes;
}

function getAllPositivePositions(matrix: number[][]) {
  const positivePositions: [number, number][] = [];

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const value = matrix[row][col];
      if (value > 0) positivePositions.push([row, col]);
    }
  }

  return positivePositions;
}

function getAdjacentPositions(row: number, col: number, matrix: number[][]) {
  const adjacentPositions: [number, number][] = [];

  if (row > 0) adjacentPositions.push([row - 1, col]);
  if (row < matrix.length - 1) adjacentPositions.push([row + 1, col]);
  if (col > 0) adjacentPositions.push([row, col - 1]);
  if (col < matrix[0].length - 1) adjacentPositions.push([row, col + 1]);

  return adjacentPositions;
}

function containsNegative(matrix: number[][]) {
  for (const row of matrix) {
    for (const value of row) {
      if (value < 0) return true;
    }
  }

  return false;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(w * h) time | O(w * h) space - where w is the
// width of the matrix and h is the height
export function minimumPassesOfMatrix(matrix: number[][]) {
  const passes = convertNegatives(matrix);
  return !containsNegative(matrix) ? passes - 1 : -1;
}

function convertNegatives(matrix: number[][]) {
  const queue = getAllPositivePositions(matrix);

  let passes = 0;

  while (queue.length > 0) {
    let currentSize = queue.length;

    while (currentSize > 0) {
      // In JavaScript, shifting elements from the start of an array is an O(n)-time operation.
      // To make this an O(1)-time operation, we could use a more legitimate queue structure.
      // For our time complexity analysis, we'll assume this runs in O(1) time.
      const [currentRow, currentCol] = queue.shift()!;

      const adjacentPositions = getAdjacentPositions(currentRow, currentCol, matrix);
      for (const position of adjacentPositions) {
        const [row, col] = position;

        const value = matrix[row][col];
        if (value < 0) {
          matrix[row][col] *= -1;
          queue.push([row, col]);
        }
      }

      currentSize--;
    }

    passes++;
  }

  return passes;
}

function getAllPositivePositions(matrix: number[][]) {
  const positivePositions: [number, number][] = [];

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const value = matrix[row][col];
      if (value > 0) positivePositions.push([row, col]);
    }
  }

  return positivePositions;
}

function getAdjacentPositions(row: number, col: number, matrix: number[][]) {
  const adjacentPositions: [number, number][] = [];

  if (row > 0) adjacentPositions.push([row - 1, col]);
  if (row < matrix.length - 1) adjacentPositions.push([row + 1, col]);
  if (col > 0) adjacentPositions.push([row, col - 1]);
  if (col < matrix[0].length - 1) adjacentPositions.push([row, col + 1]);

  return adjacentPositions;
}

function containsNegative(matrix: number[][]) {
  for (const row of matrix) {
    for (const value of row) {
      if (value < 0) return true;
    }
  }

  return false;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [
    [0, -1, -3, 2, 0],
    [1, -2, -5, -1, -3],
    [3, 0, 0, -4, -1],
  ];
  const expected = 3;
  const actual = program.minimumPassesOfMatrix(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

