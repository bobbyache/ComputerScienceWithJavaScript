# Square of Zeroes
<div class="html">
<p>
  Write a function that takes in a square-shaped n x n two-dimensional array of
  only 1s and 0s and returns a boolean representing whether the input matrix
  contains a square whose borders are made up of only 0s.
</p>
<p>
  Note that a 1 x 1 square doesn't count as a valid square for the purpose of
  this question. In other words, a singular <span>0</span> in the input matrix
  doesn't constitute a square whose borders are made up of only 0s; a square of
  zeroes has to be at least 2 x 2.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">matrix</span> = [
  [1, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 1],
  [0, 1, 1, 1, 0, 1],
  [0, 0, 0, 1, 0, 1],
  [0, 1, 1, 1, 0, 1],
  [0, 0, 0, 0, 0, 1],
]
</pre>
<h3>Sample Output</h3>
<pre>
true
<span class="CodeEditor-promptComment">[</span>
<span class="CodeEditor-promptComment">  [ ,  ,  ,  ,  ,  ],</span>
<span class="CodeEditor-promptComment">  [0, 0, 0, 0, 0,  ],</span>
<span class="CodeEditor-promptComment">  [0,  ,  ,  , 0,  ],</span>
<span class="CodeEditor-promptComment">  [0,  ,  ,  , 0,  ],</span>
<span class="CodeEditor-promptComment">  [0,  ,  ,  , 0,  ],</span>
<span class="CodeEditor-promptComment">  [0, 0, 0, 0, 0,  ],</span>
<span class="CodeEditor-promptComment">]</span>
</pre>
</div>

Hint 1
<p>
For the purpose of this question, a square is defined by its topmost and bottommost rows and by its leftmost and rightmost columns. Given a pair of rows and a pair of columns that form a valid square, you can easily determine if the relevant square is a square of zeroes with two for loops.
</p>


Hint 2

<p>
You can apply the logic described in Hint #1 on every valid square in the input matrix in order to solve this problem. To find every valid square, you can either traverse the matrix iteratively with three nested loops, or you can start out at the outtermost square and recursively go inwards in the matrix, checking the squares obtained by moving each corner of a square inwards. If you go with this recursive approach, you'll need to use a cache to avoid doing many duplicate computations.
</p>


Hint 3

<p>
The operation described in Hint #1 is a computationally expensive one to have to repeat for every single square in the matrix. Can you precompute certain values to make this operation a constant-time operation?
</p>


Hint 4

<p>
You can make the operation described in Hint #1 a constant-time operation by precomputing some values in the matrix. Specifically, you can precompute two values for every element in the matrix: the number of 0s to the right of each element (including the element itself) and the number of 0s below each element (including the element itself). You can compute these values by iterating through the matrix starting at the bottom right corner and moving your way up by traversing each row from right to left; applying some simple dynamic programming techniques will allow you to build up these values trivially. Once you have these values precomputed, you can perform the operation described in Hint #1 in constant time just by looking at the number of 0s below any square's two top corners and the number of 0s to the right of the same square's two left corners.
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
          {1, 1, 1, 0, 1, 0}, {0, 0, 0, 0, 0, 1}, {0, 1, 1, 1, 0, 1},
          {0, 0, 0, 1, 0, 1}, {0, 1, 1, 1, 0, 1}, {0, 0, 0, 0, 0, 1},
      };
      assert(squareOfZeroes(input));
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

bool hasSquareOfZeroes(vector<vector<int>> &matrix, int r1, int c1, int r2,
                       int c2, unordered_map<string, bool> &cache);
bool isSquareOfZeroes(vector<vector<int>> &matrix, int r1, int c1, int r2,
                      int c2);

// O(n^4) time | O(n^3) space - where n is the height and width of the matrix
bool squareOfZeroes(vector<vector<int>> matrix) {
  int lastIdx = matrix.size() - 1;
  unordered_map<string, bool> cache;
  return hasSquareOfZeroes(matrix, 0, 0, lastIdx, lastIdx, cache);
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
bool hasSquareOfZeroes(vector<vector<int>> &matrix, int r1, int c1, int r2,
                       int c2, unordered_map<string, bool> &cache) {
  if (r1 >= r2 || c1 >= c2)
    return false;

  string key = to_string(r1) + '-' + to_string(c1) + '-' + to_string(r2) + '-' +
               to_string(c2);
  if (cache.find(key) != cache.end())
    return cache[key];

  cache[key] =
      isSquareOfZeroes(matrix, r1, c1, r2, c2) ||
      hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2 - 1, c2 - 1, cache) ||
      hasSquareOfZeroes(matrix, r1, c1 + 1, r2 - 1, c2, cache) ||
      hasSquareOfZeroes(matrix, r1 + 1, c1, r2, c2 - 1, cache) ||
      hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2, c2, cache) ||
      hasSquareOfZeroes(matrix, r1, c1, r2 - 1, c2 - 1, cache);

  return cache[key];
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
bool isSquareOfZeroes(vector<vector<int>> &matrix, int r1, int c1, int r2,
                      int c2) {
  for (int row = r1; row < r2 + 1; row++) {
    if (matrix[row][c1] != 0 || matrix[row][c2] != 0)
      return false;
  }
  for (int col = c1; col < c2 + 1; col++) {
    if (matrix[r1][col] != 0 || matrix[r2][col] != 0)
      return false;
  }
  return true;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

bool isSquareOfZeroes(vector<vector<int>> matrix, int r1, int c1, int r2,
                      int c2);

// O(n^4) time | O(1) space - where n is the height and width of the matrix
bool squareOfZeroes(vector<vector<int>> matrix) {
  int n = matrix.size();
  for (int topRow = 0; topRow < n; topRow++) {
    for (int leftCol = 0; leftCol < n; leftCol++) {
      int squareLength = 2;
      while (squareLength <= n - leftCol && squareLength <= n - topRow) {
        int bottomRow = topRow + squareLength - 1;
        int rightCol = leftCol + squareLength - 1;
        if (isSquareOfZeroes(matrix, topRow, leftCol, bottomRow, rightCol))
          return true;
        squareLength++;
      }
    }
  }
  return false;
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
bool isSquareOfZeroes(vector<vector<int>> matrix, int r1, int c1, int r2,
                      int c2) {
  for (int row = r1; row < r2 + 1; row++) {
    if (matrix[row][c1] != 0 || matrix[row][c2] != 0)
      return false;
  }
  for (int col = c1; col < c2 + 1; col++) {
    if (matrix[r1][col] != 0 || matrix[r2][col] != 0)
      return false;
  }
  return true;
}

```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

struct InfoMatrixItem {
  int numZeroesBelow;
  int numZeroesRight;
};

bool hasSquareOfZeroes(vector<vector<InfoMatrixItem>> &infoMatrix, int r1,
                       int c1, int r2, int c2,
                       unordered_map<string, bool> &cache);
bool isSquareOfZeroes(vector<vector<InfoMatrixItem>> &infoMatrix, int r1,
                      int c1, int r2, int c2);
vector<vector<InfoMatrixItem>>
preComputedNumOfZeroes(vector<vector<int>> matrix);

// O(n^3) time | O(n^3) space - where n is the height and width of the matrix
bool squareOfZeroes(vector<vector<int>> matrix) {
  vector<vector<InfoMatrixItem>> infoMatrix = preComputedNumOfZeroes(matrix);
  int lastIdx = matrix.size() - 1;
  unordered_map<string, bool> cache;
  return hasSquareOfZeroes(infoMatrix, 0, 0, lastIdx, lastIdx, cache);
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
bool hasSquareOfZeroes(vector<vector<InfoMatrixItem>> &infoMatrix, int r1,
                       int c1, int r2, int c2,
                       unordered_map<string, bool> &cache) {
  if (r1 >= r2 || c1 >= c2)
    return false;

  string key = to_string(r1) + '-' + to_string(c1) + '-' + to_string(r2) + '-' +
               to_string(c2);
  if (cache.find(key) != cache.end())
    return cache[key];

  cache[key] =
      isSquareOfZeroes(infoMatrix, r1, c1, r2, c2) ||
      hasSquareOfZeroes(infoMatrix, r1 + 1, c1 + 1, r2 - 1, c2 - 1, cache) ||
      hasSquareOfZeroes(infoMatrix, r1, c1 + 1, r2 - 1, c2, cache) ||
      hasSquareOfZeroes(infoMatrix, r1 + 1, c1, r2, c2 - 1, cache) ||
      hasSquareOfZeroes(infoMatrix, r1 + 1, c1 + 1, r2, c2, cache) ||
      hasSquareOfZeroes(infoMatrix, r1, c1, r2 - 1, c2 - 1, cache);

  return cache[key];
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
bool isSquareOfZeroes(vector<vector<InfoMatrixItem>> &infoMatrix, int r1,
                      int c1, int r2, int c2) {
  int squareLength = c2 - c1 + 1;
  bool hasTopBorder = infoMatrix[r1][c1].numZeroesRight >= squareLength;
  bool hasLeftBorder = infoMatrix[r1][c1].numZeroesBelow >= squareLength;
  bool hasBottomBorder = infoMatrix[r2][c1].numZeroesRight >= squareLength;
  bool hasRightBorder = infoMatrix[r1][c2].numZeroesBelow >= squareLength;
  return hasTopBorder && hasLeftBorder && hasBottomBorder && hasRightBorder;
}

vector<vector<InfoMatrixItem>>
preComputedNumOfZeroes(vector<vector<int>> matrix) {
  vector<vector<InfoMatrixItem>> infoMatrix;
  for (int i = 0; i < matrix.size(); i++) {
    vector<InfoMatrixItem> inner;
    for (int j = 0; j < matrix[i].size(); j++) {
      int numZeroes = matrix[i][j] == 0 ? 1 : 0;
      inner.push_back(InfoMatrixItem{numZeroes, numZeroes});
    }
    infoMatrix.push_back(inner);
  }

  int lastIdx = matrix.size() - 1;
  for (int row = lastIdx; row >= 0; row--) {
    for (int col = lastIdx; col >= 0; col--) {
      if (matrix[row][col] == 1)
        continue;
      if (row < lastIdx) {
        infoMatrix[row][col].numZeroesBelow +=
            infoMatrix[row + 1][col].numZeroesBelow;
      }
      if (col < lastIdx) {
        infoMatrix[row][col].numZeroesRight +=
            infoMatrix[row][col + 1].numZeroesRight;
      }
    }
  }

  return infoMatrix;
}

```
### Solution 4 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

struct InfoMatrixItem {
  int numZeroesBelow;
  int numZeroesRight;
};

bool isSquareOfZeroes(vector<vector<InfoMatrixItem>> infoMatrix, int r1, int c1,
                      int r2, int c2);
vector<vector<InfoMatrixItem>>
preComputedNumOfZeroes(vector<vector<int>> matrix);

// O(n^3) time | O(n^2) space - where n is the height and width of the matrix
bool squareOfZeroes(vector<vector<int>> matrix) {
  vector<vector<InfoMatrixItem>> infoMatrix = preComputedNumOfZeroes(matrix);
  int n = matrix.size();
  for (int topRow = 0; topRow < n; topRow++) {
    for (int leftCol = 0; leftCol < n; leftCol++) {
      int squareLength = 2;
      while (squareLength <= n - leftCol && squareLength <= n - topRow) {
        int bottomRow = topRow + squareLength - 1;
        int rightCol = leftCol + squareLength - 1;
        if (isSquareOfZeroes(infoMatrix, topRow, leftCol, bottomRow, rightCol))
          return true;
        squareLength++;
      }
    }
  }
  return false;
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
bool isSquareOfZeroes(vector<vector<InfoMatrixItem>> infoMatrix, int r1, int c1,
                      int r2, int c2) {
  int squareLength = c2 - c1 + 1;
  bool hasTopBorder = infoMatrix[r1][c1].numZeroesRight >= squareLength;
  bool hasLeftBorder = infoMatrix[r1][c1].numZeroesBelow >= squareLength;
  bool hasBottomBorder = infoMatrix[r2][c1].numZeroesRight >= squareLength;
  bool hasRightBorder = infoMatrix[r1][c2].numZeroesBelow >= squareLength;
  return hasTopBorder && hasLeftBorder && hasBottomBorder && hasRightBorder;
}

vector<vector<InfoMatrixItem>>
preComputedNumOfZeroes(vector<vector<int>> matrix) {
  vector<vector<InfoMatrixItem>> infoMatrix;
  for (int i = 0; i < matrix.size(); i++) {
    vector<InfoMatrixItem> inner;
    for (int j = 0; j < matrix[i].size(); j++) {
      int numZeroes = matrix[i][j] == 0 ? 1 : 0;
      inner.push_back(InfoMatrixItem{numZeroes, numZeroes});
    }
    infoMatrix.push_back(inner);
  }

  int lastIdx = matrix.size() - 1;
  for (int row = lastIdx; row >= 0; row--) {
    for (int col = lastIdx; col >= 0; col--) {
      if (matrix[row][col] == 1)
        continue;
      if (row < lastIdx) {
        infoMatrix[row][col].numZeroesBelow +=
            infoMatrix[row + 1][col].numZeroesBelow;
      }
      if (col < lastIdx) {
        infoMatrix[row][col].numZeroesRight +=
            infoMatrix[row][col + 1].numZeroesRight;
      }
    }
  }

  return infoMatrix;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> input = {
          {1, 1, 1, 0, 1, 0}, {0, 0, 0, 0, 0, 1}, {0, 1, 1, 1, 0, 1},
          {0, 0, 0, 1, 0, 1}, {0, 1, 1, 1, 0, 1}, {0, 0, 0, 0, 0, 1},
      };
      assert(squareOfZeroes(input));
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
		List<List<int> > test = new List<List<int> >();
		test.Add(new List<int>(){
			1, 1, 1, 0, 1, 0
		});
		test.Add(new List<int>(){
			0, 0, 0, 0, 0, 1
		});
		test.Add(new List<int>(){
			0, 1, 1, 1, 0, 1
		});
		test.Add(new List<int>(){
			0, 0, 0, 1, 0, 1
		});
		test.Add(new List<int>(){
			0, 1, 1, 1, 0, 1
		});
		test.Add(new List<int>(){
			0, 0, 0, 0, 0, 1
		});
		Utils.AssertTrue(Program.SquareOfZeroes(test));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n^4) time | O(n^3) space - where n is the height and width of the matrix
	public static bool SquareOfZeroes(List<List<int> > matrix) {
		int lastIdx = matrix.Count - 1;
		Dictionary<string, bool> cache = new Dictionary<string, bool>();
		return hasSquareOfZeroes(matrix, 0, 0, lastIdx, lastIdx, cache);
	}

	// r1 is the top row, c1 is the left column
	// r2 is the bottom row, c2 is the right column
	public static bool hasSquareOfZeroes(
		List<List<int> > matrix,
		int r1,
		int c1,
		int r2,
		int c2,
		Dictionary<string, bool> cache
		) {
		if (r1 >= r2 || c1 >= c2) return false;

		string key = r1.ToString() + '-' + c1.ToString() + '-' + r2.ToString() + '-' +
		  c2.ToString();
		if (cache.ContainsKey(key)) return cache[key];

		cache[key] = isSquareOfZeroes(matrix, r1, c1, r2, c2) ||
		  hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2 - 1, c2 - 1, cache) ||
		  hasSquareOfZeroes(matrix, r1, c1 + 1, r2 - 1, c2, cache) ||
		  hasSquareOfZeroes(matrix, r1 + 1, c1, r2, c2 - 1, cache) ||
		  hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2, c2, cache) ||
		  hasSquareOfZeroes(matrix, r1, c1, r2 - 1, c2 - 1, cache);

		return cache[key];
	}

	// r1 is the top row, c1 is the left column
	// r2 is the bottom row, c2 is the right column
	public static bool isSquareOfZeroes(List<List<int> > matrix,
	  int r1,
	  int c1,
	  int r2,
	  int c2
	  ) {
		for (int row = r1; row < r2 + 1; row++) {
			if (matrix[row][c1] != 0 || matrix[row][c2] != 0) return false;
		}
		for (int col = c1; col < c2 + 1; col++) {
			if (matrix[r1][col] != 0 || matrix[r2][col] != 0) return false;
		}
		return true;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n^4) time | O(1) space - where n is the height and width of the matrix
	public static bool SquareOfZeroes(List<List<int> > matrix) {
		int n = matrix.Count;
		for (int topRow = 0; topRow < n; topRow++) {
			for (int leftCol = 0; leftCol < n; leftCol++) {
				int squareLength = 2;
				while (squareLength <= n - leftCol && squareLength <= n - topRow) {
					int bottomRow = topRow + squareLength - 1;
					int rightCol = leftCol + squareLength - 1;
					if (isSquareOfZeroes(matrix, topRow, leftCol, bottomRow,
					  rightCol)) return true;
					squareLength++;
				}
			}
		}
		return false;
	}

	// r1 is the top row, c1 is the left column
	// r2 is the bottom row, c2 is the right column
	public static bool isSquareOfZeroes(List<List<int> > matrix,
	  int r1,
	  int c1,
	  int r2,
	  int c2
	  ) {
		for (int row = r1; row < r2 + 1; row++) {
			if (matrix[row][c1] != 0 || matrix[row][c2] != 0) return false;
		}
		for (int col = c1; col < c2 + 1; col++) {
			if (matrix[r1][col] != 0 || matrix[r2][col] != 0) return false;
		}
		return true;
	}
}

```
### Solution 3 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n^3) time | O(n^3) space - where n is the height and width of the matrix
	public static bool SquareOfZeroes(List<List<int> > matrix) {
		List<List<InfoMatrixItem> > infoMatrix = preComputedNumOfZeroes(matrix);
		int lastIdx = matrix.Count - 1;
		Dictionary<string, bool> cache = new Dictionary<string, bool>();
		return hasSquareOfZeroes(infoMatrix, 0, 0, lastIdx, lastIdx, cache);
	}

	// r1 is the top row, c1 is the left column
	// r2 is the bottom row, c2 is the right column
	public static bool hasSquareOfZeroes(
		List<List<InfoMatrixItem> > matrix,
		int r1,
		int c1,
		int r2,
		int c2,
		Dictionary<string, bool> cache
		) {
		if (r1 >= r2 || c1 >= c2) return false;

		string key = r1.ToString() + '-' + c1.ToString() + '-' + r2.ToString() + '-' +
		  c2.ToString();
		if (cache.ContainsKey(key)) return cache[key];

		cache[key] = isSquareOfZeroes(matrix, r1, c1, r2, c2) ||
		  hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2 - 1, c2 - 1, cache) ||
		  hasSquareOfZeroes(matrix, r1, c1 + 1, r2 - 1, c2, cache) ||
		  hasSquareOfZeroes(matrix, r1 + 1, c1, r2, c2 - 1, cache) ||
		  hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2, c2, cache) ||
		  hasSquareOfZeroes(matrix, r1, c1, r2 - 1, c2 - 1, cache);
		return cache[key];
	}

	// r1 is the top row, c1 is the left column
	// r2 is the bottom row, c2 is the right column
	public static bool isSquareOfZeroes(List<List<InfoMatrixItem> > infoMatrix,
	  int r1,
	  int c1,
	  int r2,
	  int c2
	  ) {
		int squareLength = c2 - c1 + 1;
		bool hasTopBorder = infoMatrix[r1][c1].numZeroesRight >= squareLength;
		bool hasLeftBorder = infoMatrix[r1][c1].numZeroesBelow >= squareLength;
		bool hasBottomBorder = infoMatrix[r2][c1].numZeroesRight >= squareLength;
		bool hasRightBorder = infoMatrix[r1][c2].numZeroesBelow >= squareLength;
		return hasTopBorder && hasLeftBorder && hasBottomBorder && hasRightBorder;
	}

	public static List<List<InfoMatrixItem> > preComputedNumOfZeroes(List<List<int> > matrix) {
		List<List<InfoMatrixItem> > infoMatrix = new List<List<InfoMatrixItem> >();
		for (int i = 0; i < matrix.Count; i++) {
			List<InfoMatrixItem> inner = new List<InfoMatrixItem>();
			for (int j = 0; j < matrix[i].Count; j++) {
				int numZeroes = matrix[i][j] == 0 ? 1 : 0;
				inner.Add(new InfoMatrixItem(numZeroes, numZeroes));
			}
			infoMatrix.Add(inner);
		}

		int lastIdx = matrix.Count - 1;
		for (int row = lastIdx; row >= 0; row--) {
			for (int col = lastIdx; col >= 0; col--) {
				if (matrix[row][col] == 1) continue;
				if (row < lastIdx) {
					infoMatrix[row][col].numZeroesBelow +=
					  infoMatrix[row + 1][col].numZeroesBelow;
				}
				if (col < lastIdx) {
					infoMatrix[row][col].numZeroesRight +=
					  infoMatrix[row][col + 1].numZeroesRight;
				}
			}
		}

		return infoMatrix;
	}

	public class InfoMatrixItem {
		public int numZeroesBelow;
		public int numZeroesRight;

		public InfoMatrixItem(int numZeroesBelow, int numZeroesRight) {
			this.numZeroesBelow = numZeroesBelow;
			this.numZeroesRight = numZeroesRight;
		}
	}
}

```
### Solution 4 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n^3) time | O(n^2) space - where n is the height and width of the matrix
	public static bool SquareOfZeroes(List<List<int> > matrix) {
		List<List<InfoMatrixItem> > infoMatrix = preComputedNumOfZeroes(matrix);
		int n = matrix.Count;
		for (int topRow = 0; topRow < n; topRow++) {
			for (int leftCol = 0; leftCol < n; leftCol++) {
				int squareLength = 2;
				while (squareLength <= n - leftCol && squareLength <= n - topRow) {
					int bottomRow = topRow + squareLength - 1;
					int rightCol = leftCol + squareLength - 1;
					if (isSquareOfZeroes(infoMatrix, topRow, leftCol, bottomRow,
					  rightCol)) return true;
					squareLength++;
				}
			}
		}
		return false;
	}

	// r1 is the top row, c1 is the left column
	// r2 is the bottom row, c2 is the right column
	public static bool isSquareOfZeroes(List<List<InfoMatrixItem> > infoMatrix,
	  int r1,
	  int c1,
	  int r2,
	  int c2
	  ) {
		int squareLength = c2 - c1 + 1;
		bool hasTopBorder = infoMatrix[r1][c1].numZeroesRight >= squareLength;
		bool hasLeftBorder = infoMatrix[r1][c1].numZeroesBelow >= squareLength;
		bool hasBottomBorder = infoMatrix[r2][c1].numZeroesRight >= squareLength;
		bool hasRightBorder = infoMatrix[r1][c2].numZeroesBelow >= squareLength;
		return hasTopBorder && hasLeftBorder && hasBottomBorder && hasRightBorder;
	}

	public static List<List<InfoMatrixItem> > preComputedNumOfZeroes(List<List<int> > matrix) {
		List<List<InfoMatrixItem> > infoMatrix = new List<List<InfoMatrixItem> >();
		for (int i = 0; i < matrix.Count; i++) {
			List<InfoMatrixItem> inner = new List<InfoMatrixItem>();
			for (int j = 0; j < matrix[i].Count; j++) {
				int numZeroes = matrix[i][j] == 0 ? 1 : 0;
				inner.Add(new InfoMatrixItem(numZeroes, numZeroes));
			}
			infoMatrix.Add(inner);
		}

		int lastIdx = matrix.Count - 1;
		for (int row = lastIdx; row >= 0; row--) {
			for (int col = lastIdx; col >= 0; col--) {
				if (matrix[row][col] == 1) continue;
				if (row < lastIdx) {
					infoMatrix[row][col].numZeroesBelow +=
					  infoMatrix[row + 1][col].numZeroesBelow;
				}
				if (col < lastIdx) {
					infoMatrix[row][col].numZeroesRight +=
					  infoMatrix[row][col + 1].numZeroesRight;
				}
			}
		}

		return infoMatrix;
	}

	public class InfoMatrixItem {
		public int numZeroesBelow;
		public int numZeroesRight;

		public InfoMatrixItem(int numZeroesBelow, int numZeroesRight) {
			this.numZeroesBelow = numZeroesBelow;
			this.numZeroesRight = numZeroesRight;
		}
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
		List<List<int> > test = new List<List<int> >();
		test.Add(new List<int>(){
			1, 1, 1, 0, 1, 0
		});
		test.Add(new List<int>(){
			0, 0, 0, 0, 0, 1
		});
		test.Add(new List<int>(){
			0, 1, 1, 1, 0, 1
		});
		test.Add(new List<int>(){
			0, 0, 0, 1, 0, 1
		});
		test.Add(new List<int>(){
			0, 1, 1, 1, 0, 1
		});
		test.Add(new List<int>(){
			0, 0, 0, 0, 0, 1
		});
		Utils.AssertTrue(Program.SquareOfZeroes(test));
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

func TestCase1(t *TestCase) {
	input := [][]int{
		{1, 1, 1, 0, 1, 0},
		{0, 0, 0, 0, 0, 1},
		{0, 1, 1, 1, 0, 1},
		{0, 0, 0, 1, 0, 1},
		{0, 1, 1, 1, 0, 1},
		{0, 0, 0, 0, 0, 1},
	}
	require.True(t, SquareOfZeroes(input))
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "fmt"

// O(n^4) time | O(n^3) space - where n is the height and width of the matrix
func SquareOfZeroes(matrix [][]int) bool {
	lastIdx := len(matrix) - 1
	return hasSquareOfZeroes(matrix, 0, 0, lastIdx, lastIdx, map[string]bool{})
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
func hasSquareOfZeroes(matrix [][]int, r1, c1, r2, c2 int, cache map[string]bool) bool {
	if r1 >= r2 || c1 >= c2 {
		return false
	}

	key := fmt.Sprintf("%d-%d-%d-%d", r1, c1, r2, c2)
	if out, found := cache[key]; found {
		return out
	}

	cache[key] =
		isSquareOfZeroes(matrix, r1, c1, r2, c2) ||
			hasSquareOfZeroes(matrix, r1+1, c1+1, r2-1, c2-1, cache) ||
			hasSquareOfZeroes(matrix, r1, c1+1, r2-1, c2, cache) ||
			hasSquareOfZeroes(matrix, r1+1, c1, r2, c2-1, cache) ||
			hasSquareOfZeroes(matrix, r1+1, c1+1, r2, c2, cache) ||
			hasSquareOfZeroes(matrix, r1, c1, r2-1, c2-1, cache)

	return cache[key]
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
func isSquareOfZeroes(matrix [][]int, r1, c1, r2, c2 int) bool {
	for row := r1; row < r2+1; row++ {
		if matrix[row][c1] != 0 || matrix[row][c2] != 0 {
			return false
		}
	}

	for col := c1; col < c2+1; col++ {
		if matrix[r1][col] != 0 || matrix[r2][col] != 0 {
			return false
		}
	}
	return true
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n^4) time | O(1) space - where n is the height and width of the matrix
func SquareOfZeroes(matrix [][]int) bool {
	n := len(matrix)
	for topRow := 0; topRow < n; topRow++ {
		for leftCol := 0; leftCol < n; leftCol++ {
			squareLength := 2
			for squareLength <= n-leftCol && squareLength <= n-topRow {
				bottomRow := topRow + squareLength - 1
				rightCol := leftCol + squareLength - 1
				if isSquareOfZeroes(matrix, topRow, leftCol, bottomRow, rightCol) {
					return true
				}
				squareLength += 1
			}
		}
	}
	return false
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
func isSquareOfZeroes(matrix [][]int, r1, c1, r2, c2 int) bool {
	for row := r1; row < r2+1; row++ {
		if matrix[row][c1] != 0 || matrix[row][c2] != 0 {
			return false
		}
	}

	for col := c1; col < c2+1; col++ {
		if matrix[r1][col] != 0 || matrix[r2][col] != 0 {
			return false
		}
	}
	return true
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "fmt"

// O(n^3) time | O(n^3) space - where n is the height and width of the matrix
func SquareOfZeroes(matrix [][]int) bool {
	infoMatrix := preComputeNumOfZeroes(matrix)
	lastIdx := len(matrix) - 1
	return hasSquareOfZeroes(infoMatrix, 0, 0, lastIdx, lastIdx, map[string]bool{})
}

type InfoEntry struct {
	NumZeroesRight int
	NumZeroesBelow int
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
func hasSquareOfZeroes(infoMatrix [][]InfoEntry, r1, c1, r2, c2 int, cache map[string]bool) bool {
	if r1 >= r2 || c1 >= c2 {
		return false
	}

	key := fmt.Sprintf("%d-%d-%d-%d", r1, c1, r2, c2)
	if out, found := cache[key]; found {
		return out
	}

	cache[key] =
		isSquareOfZeroes(infoMatrix, r1, c1, r2, c2) ||
			hasSquareOfZeroes(infoMatrix, r1+1, c1+1, r2-1, c2-1, cache) ||
			hasSquareOfZeroes(infoMatrix, r1, c1+1, r2-1, c2, cache) ||
			hasSquareOfZeroes(infoMatrix, r1+1, c1, r2, c2-1, cache) ||
			hasSquareOfZeroes(infoMatrix, r1+1, c1+1, r2, c2, cache) ||
			hasSquareOfZeroes(infoMatrix, r1, c1, r2-1, c2-1, cache)

	return cache[key]
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
func isSquareOfZeroes(infoMatrix [][]InfoEntry, r1, c1, r2, c2 int) bool {
	squareLength := c2 - c1 + 1
	hasTopBorder := infoMatrix[r1][c1].NumZeroesRight >= squareLength
	hasLeftBorder := infoMatrix[r1][c1].NumZeroesBelow >= squareLength
	hasBottomBorder := infoMatrix[r2][c1].NumZeroesRight >= squareLength
	hasRightBorder := infoMatrix[r1][c2].NumZeroesBelow >= squareLength
	return hasTopBorder && hasLeftBorder && hasBottomBorder && hasRightBorder
}

func preComputeNumOfZeroes(matrix [][]int) [][]InfoEntry {
	infoMatrix := make([][]InfoEntry, len(matrix))
	for i, row := range matrix {
		infoMatrix[i] = make([]InfoEntry, len(row))
	}

	n := len(matrix)
	for row := 0; row < n; row++ {
		for col := 0; col < n; col++ {
			numZeroes := 0
			if matrix[row][col] == 0 {
				numZeroes = 1
			}
			infoMatrix[row][col] = InfoEntry{
				NumZeroesBelow: numZeroes,
				NumZeroesRight: numZeroes,
			}
		}
	}

	lastIdx := len(matrix) - 1
	for row := n - 1; row >= 0; row-- {
		for col := n - 1; col >= 0; col-- {
			if matrix[row][col] == 1 {
				continue
			}

			if row < lastIdx {
				infoMatrix[row][col].NumZeroesBelow += infoMatrix[row+1][col].NumZeroesBelow
			}

			if col < lastIdx {
				infoMatrix[row][col].NumZeroesRight += infoMatrix[row][col+1].NumZeroesRight
			}
		}
	}
	return infoMatrix
}

```
### Solution 4 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n^3) time | O(n^2) space - where n is the height and width of the matrix
func SquareOfZeroes(matrix [][]int) bool {
	infoMatrix := preComputeNumOfZeroes(matrix)
	n := len(matrix)
	for topRow := 0; topRow < n; topRow++ {
		for leftCol := 0; leftCol < n; leftCol++ {
			squareLength := 2
			for squareLength <= n-leftCol && squareLength <= n-topRow {
				bottomRow := topRow + squareLength - 1
				rightCol := leftCol + squareLength - 1
				if isSquareOfZeroes(infoMatrix, topRow, leftCol, bottomRow, rightCol) {
					return true
				}
				squareLength += 1
			}
		}
	}
	return false
}

type InfoEntry struct {
	NumZeroesRight int
	NumZeroesBelow int
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
func isSquareOfZeroes(infoMatrix [][]InfoEntry, r1, c1, r2, c2 int) bool {
	squareLength := c2 - c1 + 1
	hasTopBorder := infoMatrix[r1][c1].NumZeroesRight >= squareLength
	hasLeftBorder := infoMatrix[r1][c1].NumZeroesBelow >= squareLength
	hasBottomBorder := infoMatrix[r2][c1].NumZeroesRight >= squareLength
	hasRightBorder := infoMatrix[r1][c2].NumZeroesBelow >= squareLength
	return hasTopBorder && hasLeftBorder && hasBottomBorder && hasRightBorder
}

func preComputeNumOfZeroes(matrix [][]int) [][]InfoEntry {
	infoMatrix := make([][]InfoEntry, len(matrix))
	for i, row := range matrix {
		infoMatrix[i] = make([]InfoEntry, len(row))
	}

	n := len(matrix)
	for row := 0; row < n; row++ {
		for col := 0; col < n; col++ {
			numZeroes := 0
			if matrix[row][col] == 0 {
				numZeroes = 1
			}
			infoMatrix[row][col] = InfoEntry{
				NumZeroesBelow: numZeroes,
				NumZeroesRight: numZeroes,
			}
		}
	}

	lastIdx := len(matrix) - 1
	for row := n - 1; row >= 0; row-- {
		for col := n - 1; col >= 0; col-- {
			if matrix[row][col] == 1 {
				continue
			}

			if row < lastIdx {
				infoMatrix[row][col].NumZeroesBelow += infoMatrix[row+1][col].NumZeroesBelow
			}

			if col < lastIdx {
				infoMatrix[row][col].NumZeroesRight += infoMatrix[row][col+1].NumZeroesRight
			}
		}
	}
	return infoMatrix
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func TestCase1(t *TestCase) {
	input := [][]int{
		{1, 1, 1, 0, 1, 0},
		{0, 0, 0, 0, 0, 1},
		{0, 1, 1, 1, 0, 1},
		{0, 0, 0, 1, 0, 1},
		{0, 1, 1, 1, 0, 1},
		{0, 0, 0, 0, 0, 1},
	}
	require.True(t, SquareOfZeroes(input))
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
    List<List<Integer>> test = new ArrayList<List<Integer>>();
    test.add(new ArrayList<Integer>(Arrays.asList(new Integer[] {1, 1, 1, 0, 1, 0})));
    test.add(new ArrayList<Integer>(Arrays.asList(new Integer[] {0, 0, 0, 0, 0, 1})));
    test.add(new ArrayList<Integer>(Arrays.asList(new Integer[] {0, 1, 1, 1, 0, 1})));
    test.add(new ArrayList<Integer>(Arrays.asList(new Integer[] {0, 0, 0, 1, 0, 1})));
    test.add(new ArrayList<Integer>(Arrays.asList(new Integer[] {0, 1, 1, 1, 0, 1})));
    test.add(new ArrayList<Integer>(Arrays.asList(new Integer[] {0, 0, 0, 0, 0, 1})));
    Utils.assertTrue(Program.squareOfZeroes(test));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n^4) time | O(n^3) space - where n is the height and width of the matrix
  public static boolean squareOfZeroes(List<List<Integer>> matrix) {
    int lastIdx = matrix.size() - 1;
    Map<String, Boolean> cache = new HashMap<String, Boolean>();
    return hasSquareOfZeroes(matrix, 0, 0, lastIdx, lastIdx, cache);
  }

  // r1 is the top row, c1 is the left column
  // r2 is the bottom row, c2 is the right column
  public static boolean hasSquareOfZeroes(
      List<List<Integer>> matrix, int r1, int c1, int r2, int c2, Map<String, Boolean> cache) {
    if (r1 >= r2 || c1 >= c2) return false;

    String key =
        String.valueOf(r1)
            + '-'
            + String.valueOf(c1)
            + '-'
            + String.valueOf(r2)
            + '-'
            + String.valueOf(c2);
    if (cache.containsKey(key)) return cache.get(key);

    cache.put(
        key,
        isSquareOfZeroes(matrix, r1, c1, r2, c2)
            || hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2 - 1, c2 - 1, cache)
            || hasSquareOfZeroes(matrix, r1, c1 + 1, r2 - 1, c2, cache)
            || hasSquareOfZeroes(matrix, r1 + 1, c1, r2, c2 - 1, cache)
            || hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2, c2, cache)
            || hasSquareOfZeroes(matrix, r1, c1, r2 - 1, c2 - 1, cache));

    return cache.get(key);
  }

  // r1 is the top row, c1 is the left column
  // r2 is the bottom row, c2 is the right column
  public static boolean isSquareOfZeroes(
      List<List<Integer>> matrix, int r1, int c1, int r2, int c2) {
    for (int row = r1; row < r2 + 1; row++) {
      if (matrix.get(row).get(c1) != 0 || matrix.get(row).get(c2) != 0) return false;
    }
    for (int col = c1; col < c2 + 1; col++) {
      if (matrix.get(r1).get(col) != 0 || matrix.get(r2).get(col) != 0) return false;
    }
    return true;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n^4) time | O(1) space - where n is the height and width of the matrix
  public static boolean squareOfZeroes(List<List<Integer>> matrix) {
    int n = matrix.size();
    for (int topRow = 0; topRow < n; topRow++) {
      for (int leftCol = 0; leftCol < n; leftCol++) {
        int squareLength = 2;
        while (squareLength <= n - leftCol && squareLength <= n - topRow) {
          int bottomRow = topRow + squareLength - 1;
          int rightCol = leftCol + squareLength - 1;
          if (isSquareOfZeroes(matrix, topRow, leftCol, bottomRow, rightCol)) return true;
          squareLength++;
        }
      }
    }
    return false;
  }

  // r1 is the top row, c1 is the left column
  // r2 is the bottom row, c2 is the right column
  public static boolean isSquareOfZeroes(
      List<List<Integer>> matrix, int r1, int c1, int r2, int c2) {
    for (int row = r1; row < r2 + 1; row++) {
      if (matrix.get(row).get(c1) != 0 || matrix.get(row).get(c2) != 0) return false;
    }
    for (int col = c1; col < c2 + 1; col++) {
      if (matrix.get(r1).get(col) != 0 || matrix.get(r2).get(col) != 0) return false;
    }
    return true;
  }
}

```
### Solution 3 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n^3) time | O(n^3) space - where n is the height and width of the matrix
  public static boolean squareOfZeroes(List<List<Integer>> matrix) {
    List<List<InfoMatrixItem>> infoMatrix = preComputedNumOfZeroes(matrix);
    int lastIdx = matrix.size() - 1;
    Map<String, Boolean> cache = new HashMap<String, Boolean>();
    return hasSquareOfZeroes(infoMatrix, 0, 0, lastIdx, lastIdx, cache);
  }

  // r1 is the top row, c1 is the left column
  // r2 is the bottom row, c2 is the right column
  public static boolean hasSquareOfZeroes(
      List<List<InfoMatrixItem>> matrix,
      int r1,
      int c1,
      int r2,
      int c2,
      Map<String, Boolean> cache) {
    if (r1 >= r2 || c1 >= c2) return false;

    String key =
        String.valueOf(r1)
            + '-'
            + String.valueOf(c1)
            + '-'
            + String.valueOf(r2)
            + '-'
            + String.valueOf(c2);
    if (cache.containsKey(key)) return cache.get(key);

    cache.put(
        key,
        isSquareOfZeroes(matrix, r1, c1, r2, c2)
            || hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2 - 1, c2 - 1, cache)
            || hasSquareOfZeroes(matrix, r1, c1 + 1, r2 - 1, c2, cache)
            || hasSquareOfZeroes(matrix, r1 + 1, c1, r2, c2 - 1, cache)
            || hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2, c2, cache)
            || hasSquareOfZeroes(matrix, r1, c1, r2 - 1, c2 - 1, cache));

    return cache.get(key);
  }

  // r1 is the top row, c1 is the left column
  // r2 is the bottom row, c2 is the right column
  public static boolean isSquareOfZeroes(
      List<List<InfoMatrixItem>> infoMatrix, int r1, int c1, int r2, int c2) {
    int squareLength = c2 - c1 + 1;
    boolean hasTopBorder = infoMatrix.get(r1).get(c1).numZeroesRight >= squareLength;
    boolean hasLeftBorder = infoMatrix.get(r1).get(c1).numZeroesBelow >= squareLength;
    boolean hasBottomBorder = infoMatrix.get(r2).get(c1).numZeroesRight >= squareLength;
    boolean hasRightBorder = infoMatrix.get(r1).get(c2).numZeroesBelow >= squareLength;
    return hasTopBorder && hasLeftBorder && hasBottomBorder && hasRightBorder;
  }

  public static List<List<InfoMatrixItem>> preComputedNumOfZeroes(List<List<Integer>> matrix) {
    List<List<InfoMatrixItem>> infoMatrix = new ArrayList<List<InfoMatrixItem>>();
    for (int i = 0; i < matrix.size(); i++) {
      List<InfoMatrixItem> inner = new ArrayList<InfoMatrixItem>();
      for (int j = 0; j < matrix.get(i).size(); j++) {
        int numZeroes = matrix.get(i).get(j) == 0 ? 1 : 0;
        inner.add(new InfoMatrixItem(numZeroes, numZeroes));
      }
      infoMatrix.add(inner);
    }

    int lastIdx = matrix.size() - 1;
    for (int row = lastIdx; row >= 0; row--) {
      for (int col = lastIdx; col >= 0; col--) {
        if (matrix.get(row).get(col) == 1) continue;
        if (row < lastIdx) {
          infoMatrix.get(row).get(col).numZeroesBelow +=
              infoMatrix.get(row + 1).get(col).numZeroesBelow;
        }
        if (col < lastIdx) {
          infoMatrix.get(row).get(col).numZeroesRight +=
              infoMatrix.get(row).get(col + 1).numZeroesRight;
        }
      }
    }

    return infoMatrix;
  }

  static class InfoMatrixItem {
    public int numZeroesBelow;
    public int numZeroesRight;

    public InfoMatrixItem(int numZeroesBelow, int numZeroesRight) {
      this.numZeroesBelow = numZeroesBelow;
      this.numZeroesRight = numZeroesRight;
    }
  }
}

```
### Solution 4 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n^3) time | O(n^2) space - where n is the height and width of the matrix
  public static boolean squareOfZeroes(List<List<Integer>> matrix) {
    List<List<InfoMatrixItem>> infoMatrix = preComputedNumOfZeroes(matrix);
    int n = matrix.size();
    for (int topRow = 0; topRow < n; topRow++) {
      for (int leftCol = 0; leftCol < n; leftCol++) {
        int squareLength = 2;
        while (squareLength <= n - leftCol && squareLength <= n - topRow) {
          int bottomRow = topRow + squareLength - 1;
          int rightCol = leftCol + squareLength - 1;
          if (isSquareOfZeroes(infoMatrix, topRow, leftCol, bottomRow, rightCol)) return true;
          squareLength++;
        }
      }
    }
    return false;
  }

  // r1 is the top row, c1 is the left column
  // r2 is the bottom row, c2 is the right column
  public static boolean isSquareOfZeroes(
      List<List<InfoMatrixItem>> infoMatrix, int r1, int c1, int r2, int c2) {
    int squareLength = c2 - c1 + 1;
    boolean hasTopBorder = infoMatrix.get(r1).get(c1).numZeroesRight >= squareLength;
    boolean hasLeftBorder = infoMatrix.get(r1).get(c1).numZeroesBelow >= squareLength;
    boolean hasBottomBorder = infoMatrix.get(r2).get(c1).numZeroesRight >= squareLength;
    boolean hasRightBorder = infoMatrix.get(r1).get(c2).numZeroesBelow >= squareLength;
    return hasTopBorder && hasLeftBorder && hasBottomBorder && hasRightBorder;
  }

  public static List<List<InfoMatrixItem>> preComputedNumOfZeroes(List<List<Integer>> matrix) {
    List<List<InfoMatrixItem>> infoMatrix = new ArrayList<List<InfoMatrixItem>>();
    for (int i = 0; i < matrix.size(); i++) {
      List<InfoMatrixItem> inner = new ArrayList<InfoMatrixItem>();
      for (int j = 0; j < matrix.get(i).size(); j++) {
        int numZeroes = matrix.get(i).get(j) == 0 ? 1 : 0;
        inner.add(new InfoMatrixItem(numZeroes, numZeroes));
      }
      infoMatrix.add(inner);
    }

    int lastIdx = matrix.size() - 1;
    for (int row = lastIdx; row >= 0; row--) {
      for (int col = lastIdx; col >= 0; col--) {
        if (matrix.get(row).get(col) == 1) continue;
        if (row < lastIdx) {
          infoMatrix.get(row).get(col).numZeroesBelow +=
              infoMatrix.get(row + 1).get(col).numZeroesBelow;
        }
        if (col < lastIdx) {
          infoMatrix.get(row).get(col).numZeroesRight +=
              infoMatrix.get(row).get(col + 1).numZeroesRight;
        }
      }
    }

    return infoMatrix;
  }

  static class InfoMatrixItem {
    public int numZeroesBelow;
    public int numZeroesRight;

    public InfoMatrixItem(int numZeroesBelow, int numZeroesRight) {
      this.numZeroesBelow = numZeroesBelow;
      this.numZeroesRight = numZeroesRight;
    }
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    List<List<Integer>> test = new ArrayList<List<Integer>>();
    test.add(new ArrayList<Integer>(Arrays.asList(new Integer[] {1, 1, 1, 0, 1, 0})));
    test.add(new ArrayList<Integer>(Arrays.asList(new Integer[] {0, 0, 0, 0, 0, 1})));
    test.add(new ArrayList<Integer>(Arrays.asList(new Integer[] {0, 1, 1, 1, 0, 1})));
    test.add(new ArrayList<Integer>(Arrays.asList(new Integer[] {0, 0, 0, 1, 0, 1})));
    test.add(new ArrayList<Integer>(Arrays.asList(new Integer[] {0, 1, 1, 1, 0, 1})));
    test.add(new ArrayList<Integer>(Arrays.asList(new Integer[] {0, 0, 0, 0, 0, 1})));
    Utils.assertTrue(Program.squareOfZeroes(test));
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
    [1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0, 1],
    [0, 0, 0, 1, 0, 1],
    [0, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 1],
  ];
  chai.expect(program.squareOfZeroes(matrix)).to.deep.equal(true);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^4) time | O(n^3) space - where n is the height and width of the matrix
function squareOfZeroes(matrix) {
  const lastIdx = matrix.length - 1;
  return hasSquareOfZeroes(matrix, 0, 0, lastIdx, lastIdx, {});
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
function hasSquareOfZeroes(matrix, r1, c1, r2, c2, cache) {
  if (r1 >= r2 || c1 >= c2) return false;

  const key = r1.toString() + '-' + c1.toString() + '-' + r2.toString() + '-' + c2.toString();
  if (key in cache) return cache[key];

  cache[key] =
    isSquareOfZeroes(matrix, r1, c1, r2, c2) ||
    hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2 - 1, c2 - 1, cache) ||
    hasSquareOfZeroes(matrix, r1, c1 + 1, r2 - 1, c2, cache) ||
    hasSquareOfZeroes(matrix, r1 + 1, c1, r2, c2 - 1, cache) ||
    hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2, c2, cache) ||
    hasSquareOfZeroes(matrix, r1, c1, r2 - 1, c2 - 1, cache);

  return cache[key];
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
function isSquareOfZeroes(matrix, r1, c1, r2, c2) {
  for (let row = r1; row < r2 + 1; row++) {
    if (matrix[row][c1] !== 0 || matrix[row][c2] !== 0) return false;
  }
  for (let col = c1; col < c2 + 1; col++) {
    if (matrix[r1][col] !== 0 || matrix[r2][col] !== 0) return false;
  }
  return true;
}

exports.squareOfZeroes = squareOfZeroes;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^4) time | O(1) space - where n is the height and width of the matrix
function squareOfZeroes(matrix) {
  const n = matrix.length;
  for (let topRow = 0; topRow < n; topRow++) {
    for (let leftCol = 0; leftCol < n; leftCol++) {
      let squareLength = 2;
      while (squareLength <= n - leftCol && squareLength <= n - topRow) {
        const bottomRow = topRow + squareLength - 1;
        const rightCol = leftCol + squareLength - 1;
        if (isSquareOfZeroes(matrix, topRow, leftCol, bottomRow, rightCol)) return true;
        squareLength++;
      }
    }
  }
  return false;
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
function isSquareOfZeroes(matrix, r1, c1, r2, c2) {
  for (let row = r1; row < r2 + 1; row++) {
    if (matrix[row][c1] !== 0 || matrix[row][c2] !== 0) return false;
  }
  for (let col = c1; col < c2 + 1; col++) {
    if (matrix[r1][col] !== 0 || matrix[r2][col] !== 0) return false;
  }
  return true;
}

exports.squareOfZeroes = squareOfZeroes;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^3) time | O(n^3) space - where n is the height and width of the matrix
function squareOfZeroes(matrix) {
  const infoMatrix = preComputeNumOfZeroes(matrix);
  const lastIdx = matrix.length - 1;
  return hasSquareOfZeroes(infoMatrix, 0, 0, lastIdx, lastIdx, {});
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
function hasSquareOfZeroes(infoMatrix, r1, c1, r2, c2, cache) {
  if (r1 >= r2 || c1 >= c2) return false;

  const key = r1.toString() + '-' + c1.toString() + '-' + r2.toString() + '-' + c2.toString();
  if (key in cache) return cache[key];

  cache[key] =
    isSquareOfZeroes(infoMatrix, r1, c1, r2, c2) ||
    hasSquareOfZeroes(infoMatrix, r1 + 1, c1 + 1, r2 - 1, c2 - 1, cache) ||
    hasSquareOfZeroes(infoMatrix, r1, c1 + 1, r2 - 1, c2, cache) ||
    hasSquareOfZeroes(infoMatrix, r1 + 1, c1, r2, c2 - 1, cache) ||
    hasSquareOfZeroes(infoMatrix, r1 + 1, c1 + 1, r2, c2, cache) ||
    hasSquareOfZeroes(infoMatrix, r1, c1, r2 - 1, c2 - 1, cache);

  return cache[key];
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
function isSquareOfZeroes(infoMatrix, r1, c1, r2, c2) {
  const squareLength = c2 - c1 + 1;
  const hasTopBorder = infoMatrix[r1][c1].numZeroesRight >= squareLength;
  const hasLeftBorder = infoMatrix[r1][c1].numZeroesBelow >= squareLength;
  const hasBottomBorder = infoMatrix[r2][c1].numZeroesRight >= squareLength;
  const hasRightBorder = infoMatrix[r1][c2].numZeroesBelow >= squareLength;
  return hasTopBorder && hasLeftBorder && hasBottomBorder && hasRightBorder;
}

function preComputeNumOfZeroes(matrix) {
  const infoMatrix = matrix.map(row =>
    row.map(value => {
      const numZeroes = value === 0 ? 1 : 0;
      return {numZeroesBelow: numZeroes, numZeroesRight: numZeroes};
    }),
  );

  const lastIdx = matrix.length - 1;
  for (let row = lastIdx; row >= 0; row--) {
    for (let col = lastIdx; col >= 0; col--) {
      if (matrix[row][col] === 1) continue;
      if (row < lastIdx) {
        infoMatrix[row][col].numZeroesBelow += infoMatrix[row + 1][col].numZeroesBelow;
      }
      if (col < lastIdx) {
        infoMatrix[row][col].numZeroesRight += infoMatrix[row][col + 1].numZeroesRight;
      }
    }
  }

  return infoMatrix;
}

exports.squareOfZeroes = squareOfZeroes;

```
### Solution 4 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^3) time | O(n^2) space - where n is the height and width of the matrix
function squareOfZeroes(matrix) {
  const infoMatrix = preComputeNumOfZeroes(matrix);
  const n = matrix.length;
  for (let topRow = 0; topRow < n; topRow++) {
    for (let leftCol = 0; leftCol < n; leftCol++) {
      let squareLength = 2;
      while (squareLength <= n - leftCol && squareLength <= n - topRow) {
        const bottomRow = topRow + squareLength - 1;
        const rightCol = leftCol + squareLength - 1;
        if (isSquareOfZeroes(infoMatrix, topRow, leftCol, bottomRow, rightCol)) return true;
        squareLength++;
      }
    }
  }
  return false;
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
function isSquareOfZeroes(infoMatrix, r1, c1, r2, c2) {
  const squareLength = c2 - c1 + 1;
  const hasTopBorder = infoMatrix[r1][c1].numZeroesRight >= squareLength;
  const hasLeftBorder = infoMatrix[r1][c1].numZeroesBelow >= squareLength;
  const hasBottomBorder = infoMatrix[r2][c1].numZeroesRight >= squareLength;
  const hasRightBorder = infoMatrix[r1][c2].numZeroesBelow >= squareLength;
  return hasTopBorder && hasLeftBorder && hasBottomBorder && hasRightBorder;
}

function preComputeNumOfZeroes(matrix) {
  const infoMatrix = matrix.map(row =>
    row.map(value => {
      const numZeroes = value === 0 ? 1 : 0;
      return {numZeroesBelow: numZeroes, numZeroesRight: numZeroes};
    }),
  );

  const lastIdx = matrix.length - 1;
  for (let row = lastIdx; row >= 0; row--) {
    for (let col = lastIdx; col >= 0; col--) {
      if (matrix[row][col] === 1) continue;
      if (row < lastIdx) {
        infoMatrix[row][col].numZeroesBelow += infoMatrix[row + 1][col].numZeroesBelow;
      }
      if (col < lastIdx) {
        infoMatrix[row][col].numZeroesRight += infoMatrix[row][col + 1].numZeroesRight;
      }
    }
  }

  return infoMatrix;
}

exports.squareOfZeroes = squareOfZeroes;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const matrix = [
    [1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0, 1],
    [0, 0, 0, 1, 0, 1],
    [0, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 1],
  ];
  chai.expect(program.squareOfZeroes(matrix)).to.deep.equal(true);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.squareOfZeroes as squareOfZeroes

class ProgramTest {
    @Test
    fun TestCase1() {
        val matrix = listOf(
            listOf(1, 1, 1, 0, 1, 0),
            listOf(0, 0, 0, 0, 0, 1),
            listOf(0, 1, 1, 1, 0, 1),
            listOf(0, 0, 0, 1, 0, 1),
            listOf(0, 1, 1, 1, 0, 1),
            listOf(0, 0, 0, 0, 0, 1)
        )
        assert(squareOfZeroes(matrix))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^4) time | O(n^3) space - where n is the height and width of the matrix
fun squareOfZeroes(matrix: List<List<Int>>): Boolean {
    val lastIdx = matrix.size - 1
    var cache = HashMap<String, Boolean>()
    return hasSquareOfZeroes(matrix, 0, 0, lastIdx, lastIdx, cache)
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
fun hasSquareOfZeroes(
    matrix: List<List<Int>>,
    r1: Int,
    c1: Int,
    r2: Int,
    c2: Int,
    cache: MutableMap<String, Boolean>
): Boolean {
    if (r1 >= r2 || c1 >= c2) return false

    val key = r1.toString() + "-" + c1.toString() + "-" + r2.toString() + "-" + c2.toString()
    if (cache.containsKey(key)) return cache.get(key)!!

    cache[key] = isSquareOfZeroes(matrix, r1, c1, r2, c2) ||
        hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2 - 1, c2 - 1, cache) ||
        hasSquareOfZeroes(matrix, r1, c1 + 1, r2 - 1, c2, cache) ||
        hasSquareOfZeroes(matrix, r1 + 1, c1, r2, c2 - 1, cache) ||
        hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2, c2, cache) ||
        hasSquareOfZeroes(matrix, r1, c1, r2 - 1, c2 - 1, cache)

    return cache.get(key)!!
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
fun isSquareOfZeroes(
    matrix: List<List<Int>>,
    r1: Int,
    c1: Int,
    r2: Int,
    c2: Int
): Boolean {
    for (row in r1 until r2 + 1) {
        if (matrix[row][c1] != 0 || matrix[row][c2] != 0) return false
    }
    for (col in c1 until c2 + 1) {
        if (matrix[r1][col] != 0 || matrix[r2][col] != 0) return false
    }
    return true
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^4) time | O(1) space - where n is the height and width of the matrix
fun squareOfZeroes(matrix: List<List<Int>>): Boolean {
    val n = matrix.size
    for (topRow in 0 until n) {
        for (leftCol in 0 until n) {
            var squareLength = 2
            while (squareLength <= n - leftCol && squareLength <= n - topRow) {
                val bottomRow = topRow + squareLength - 1
                val rightCol = leftCol + squareLength - 1
                if (isSquareOfZeroes(matrix, topRow, leftCol, bottomRow, rightCol)) return true
                squareLength++
            }
        }
    }
    return false
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
fun isSquareOfZeroes(
    matrix: List<List<Int>>,
    r1: Int,
    c1: Int,
    r2: Int,
    c2: Int
): Boolean {
    for (row in r1 until r2 + 1) {
        if (matrix[row][c1] != 0 || matrix[row][c2] != 0) return false
    }
    for (col in c1 until c2 + 1) {
        if (matrix[r1][col] != 0 || matrix[r2][col] != 0) return false
    }
    return true
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^3) time | O(n^3) space - where n is the height and width of the matrix
fun squareOfZeroes(matrix: List<List<Int>>): Boolean {
    val infoMatrix = preComputedNumOfZeroes(matrix)
    val lastIdx = matrix.size - 1
    var cache = HashMap<String, Boolean>()
    return hasSquareOfZeroes(infoMatrix, 0, 0, lastIdx, lastIdx, cache)
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
fun hasSquareOfZeroes(
    matrix: List<List<InfoMatrixItem>>,
    r1: Int,
    c1: Int,
    r2: Int,
    c2: Int,
    cache: MutableMap<String, Boolean>
): Boolean {
    if (r1 >= r2 || c1 >= c2) return false

    val key = r1.toString() + "-" + c1.toString() + "-" + r2.toString() + "-" + c2.toString()
    if (cache.containsKey(key)) return cache.get(key)!!

    cache[key] = isSquareOfZeroes(matrix, r1, c1, r2, c2) ||
        hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2 - 1, c2 - 1, cache) ||
        hasSquareOfZeroes(matrix, r1, c1 + 1, r2 - 1, c2, cache) ||
        hasSquareOfZeroes(matrix, r1 + 1, c1, r2, c2 - 1, cache) ||
        hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2, c2, cache) ||
        hasSquareOfZeroes(matrix, r1, c1, r2 - 1, c2 - 1, cache)

    return cache.get(key)!!
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
fun isSquareOfZeroes(
    infoMatrix: List<List<InfoMatrixItem>>,
    r1: Int,
    c1: Int,
    r2: Int,
    c2: Int
): Boolean {
    val squareLength = c2 - c1 + 1
    val hasTopBorder = infoMatrix[r1][c1].numZeroesRight >= squareLength
    val hasLeftBorder = infoMatrix[r1][c1].numZeroesBelow >= squareLength
    val hasBottomBorder = infoMatrix[r2][c1].numZeroesRight >= squareLength
    val hasRightBorder = infoMatrix[r1][c2].numZeroesBelow >= squareLength
    return hasTopBorder && hasLeftBorder && hasBottomBorder && hasRightBorder
}

fun preComputedNumOfZeroes(matrix: List<List<Int>>): List<List<InfoMatrixItem>> {
    var infoMatrix = mutableListOf<List<InfoMatrixItem>>()
    for (i in 0 until matrix.size) {
        var inner = ArrayList<InfoMatrixItem>()
        for (j in 0 until matrix[i].size) {
            val numZeroes = if (matrix[i][j] == 0) 1 else 0
            inner.add(InfoMatrixItem(numZeroes, numZeroes))
        }
        infoMatrix.add(inner)
    }

    var lastIdx = matrix.size - 1
    for (row in lastIdx downTo 0) {
        for (col in lastIdx downTo 0) {
            if (matrix[row][col] == 1) continue
            if (row < lastIdx) {
                infoMatrix[row][col].numZeroesBelow += infoMatrix[row + 1][col].numZeroesBelow
            }
            if (col < lastIdx) {
                infoMatrix[row][col].numZeroesRight += infoMatrix[row][col + 1].numZeroesRight
            }
        }
    }

    return infoMatrix
}

data class InfoMatrixItem(var numZeroesBelow: Int, var numZeroesRight: Int)

```
### Solution 4 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^3) time | O(n^2) space - where n is the height and width of the matrix
fun squareOfZeroes(matrix: List<List<Int>>): Boolean {
    val infoMatrix = preComputedNumOfZeroes(matrix)
    val n = matrix.size
    for (topRow in 0 until n) {
        for (leftCol in 0 until n) {
            var squareLength = 2
            while (squareLength <= n - leftCol && squareLength <= n - topRow) {
                val bottomRow = topRow + squareLength - 1
                val rightCol = leftCol + squareLength - 1
                if (isSquareOfZeroes(infoMatrix, topRow, leftCol, bottomRow, rightCol)) return true
                squareLength++
            }
        }
    }
    return false
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
fun isSquareOfZeroes(
    infoMatrix: List<List<InfoMatrixItem>>,
    r1: Int,
    c1: Int,
    r2: Int,
    c2: Int
): Boolean {
    val squareLength = c2 - c1 + 1
    val hasTopBorder = infoMatrix[r1][c1].numZeroesRight >= squareLength
    val hasLeftBorder = infoMatrix[r1][c1].numZeroesBelow >= squareLength
    val hasBottomBorder = infoMatrix[r2][c1].numZeroesRight >= squareLength
    val hasRightBorder = infoMatrix[r1][c2].numZeroesBelow >= squareLength
    return hasTopBorder && hasLeftBorder && hasBottomBorder && hasRightBorder
}

fun preComputedNumOfZeroes(matrix: List<List<Int>>): List<List<InfoMatrixItem>> {
    var infoMatrix = mutableListOf<List<InfoMatrixItem>>()
    for (i in 0 until matrix.size) {
        var inner = ArrayList<InfoMatrixItem>()
        for (j in 0 until matrix[i].size) {
            val numZeroes = if (matrix[i][j] == 0) 1 else 0
            inner.add(InfoMatrixItem(numZeroes, numZeroes))
        }
        infoMatrix.add(inner)
    }

    var lastIdx = matrix.size - 1
    for (row in lastIdx downTo 0) {
        for (col in lastIdx downTo 0) {
            if (matrix[row][col] == 1) continue
            if (row < lastIdx) {
                infoMatrix[row][col].numZeroesBelow += infoMatrix[row + 1][col].numZeroesBelow
            }
            if (col < lastIdx) {
                infoMatrix[row][col].numZeroesRight += infoMatrix[row][col + 1].numZeroesRight
            }
        }
    }

    return infoMatrix
}

data class InfoMatrixItem(var numZeroesBelow: Int, var numZeroesRight: Int)

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.squareOfZeroes as squareOfZeroes

class ProgramTest {
    @Test
    fun TestCase1() {
        val matrix = listOf(
            listOf(1, 1, 1, 0, 1, 0),
            listOf(0, 0, 0, 0, 0, 1),
            listOf(0, 1, 1, 1, 0, 1),
            listOf(0, 0, 0, 1, 0, 1),
            listOf(0, 1, 1, 1, 0, 1),
            listOf(0, 0, 0, 0, 0, 1)
        )
        assert(squareOfZeroes(matrix))
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
      let input = [
        [1, 1, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 0, 1],
        [0, 0, 0, 1, 0, 1],
        [0, 1, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 1],
      ]
      try assertEqual(true, Program.squareOfZeroes(input))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^4) time | O(n^3) space - where n is the height and width of the matrix
  static func squareOfZeroes(_ matrix: [[Int]]) -> Bool {
    var lastIdx = matrix.count - 1
    var mat = matrix
    var cache = [String: Bool]()
    return hasSquareOfZeroes(&mat, 0, 0, lastIdx, lastIdx, &cache)
  }

  // r1 is the top row, c1 is the left column
  // r2 is the bottom row, c2 is the right column
  static func hasSquareOfZeroes(_ matrix: inout [[Int]], _ r1: Int, _ c1: Int,
                                _ r2: Int, _ c2: Int, _ cache: inout [String: Bool]) -> Bool
  {
    if r1 >= r2 || c1 >= c2 {
      return false
    }

    let key = String(r1) + "-" + String(c1) + "-" + String(r2) + "-" + String(c2)
    if let out = cache[key] {
      return out
    }

    let out = isSquareOfZeroes(&matrix, r1, c1, r2, c2) ||
      hasSquareOfZeroes(&matrix, r1 + 1, c1 + 1, r2 - 1, c2 - 1, &cache) ||
      hasSquareOfZeroes(&matrix, r1, c1 + 1, r2 - 1, c2, &cache) ||
      hasSquareOfZeroes(&matrix, r1 + 1, c1, r2, c2 - 1, &cache) ||
      hasSquareOfZeroes(&matrix, r1 + 1, c1 + 1, r2, c2, &cache) ||
      hasSquareOfZeroes(&matrix, r1, c1, r2 - 1, c2 - 1, &cache)
    cache[key] = out
    return out
  }

  // r1 is the top row, c1 is the left column
  // r2 is the bottom row, c2 is the right column
  static func isSquareOfZeroes(_ matrix: inout [[Int]], _ r1: Int, _ c1: Int, _ r2: Int, _ c2: Int) -> Bool {
    for row in r1 ..< r2 + 1 {
      if matrix[row][c1] != 0 || matrix[row][c2] != 0 {
        return false
      }
    }

    for col in c1 ..< c2 + 1 {
      if matrix[r1][col] != 0 || matrix[r2][col] != 0 {
        return false
      }
    }
    return true
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^4) time | O(1) space - where n is the height and width of the matrix
  static func squareOfZeroes(_ matrix: [[Int]]) -> Bool {
    var mat = matrix
    let n = matrix.count
    for topRow in 0 ..< n {
      for leftCol in 0 ..< n {
        var squareLength = 2
        while squareLength <= n - leftCol, squareLength <= n - topRow {
          let bottomRow = topRow + squareLength - 1
          let rightCol = leftCol + squareLength - 1
          if isSquareOfZeroes(&mat, topRow, leftCol, bottomRow, rightCol) {
            return true
          }
          squareLength += 1
        }
      }
    }
    return false
  }

  // r1 is the top row, c1 is the left column
  // r2 is the bottom row, c2 is the right column
  static func isSquareOfZeroes(_ matrix: inout [[Int]], _ r1: Int, _ c1: Int, _ r2: Int, _ c2: Int) -> Bool {
    for row in r1 ..< r2 + 1 {
      if matrix[row][c1] != 0 || matrix[row][c2] != 0 {
        return false
      }
    }

    for col in c1 ..< c2 + 1 {
      if matrix[r1][col] != 0 || matrix[r2][col] != 0 {
        return false
      }
    }
    return true
  }
}

```
### Solution 3 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^3) time | O(n^3) space - where n is the height and width of the matrix
  static func squareOfZeroes(_ matrix: [[Int]]) -> Bool {
    var infoMatrix = preComputeNumOfZeroes(matrix)
    var lastIdx = matrix.count - 1
    var cache = [String: Bool]()
    return hasSquareOfZeroes(&infoMatrix, 0, 0, lastIdx, lastIdx, &cache)
  }

  struct InfoEntry {
    var numZeroesRight: Int
    var numZeroesBelow: Int
  }

  // r1 is the top row, c1 is the left column
  // r2 is the bottom row, c2 is the right column
  static func hasSquareOfZeroes(_ infoMatrix: inout [[InfoEntry]], _ r1: Int, _ c1: Int,
                                _ r2: Int, _ c2: Int, _ cache: inout [String: Bool]) -> Bool
  {
    if r1 >= r2 || c1 >= c2 {
      return false
    }

    let key = String(r1) + "-" + String(c1) + "-" + String(r2) + "-" + String(c2)
    if let out = cache[key] {
      return out
    }

    let out = isSquareOfZeroes(&infoMatrix, r1, c1, r2, c2) ||
      hasSquareOfZeroes(&infoMatrix, r1 + 1, c1 + 1, r2 - 1, c2 - 1, &cache) ||
      hasSquareOfZeroes(&infoMatrix, r1, c1 + 1, r2 - 1, c2, &cache) ||
      hasSquareOfZeroes(&infoMatrix, r1 + 1, c1, r2, c2 - 1, &cache) ||
      hasSquareOfZeroes(&infoMatrix, r1 + 1, c1 + 1, r2, c2, &cache) ||
      hasSquareOfZeroes(&infoMatrix, r1, c1, r2 - 1, c2 - 1, &cache)
    cache[key] = out
    return out
  }

  // r1 is the top row, c1 is the left column
  // r2 is the bottom row, c2 is the right column
  static func isSquareOfZeroes(_ infoMatrix: inout [[InfoEntry]], _ r1: Int,
                               _ c1: Int, _ r2: Int, _ c2: Int) -> Bool
  {
    let squareLength = c2 - c1 + 1
    let hasTopBorder = infoMatrix[r1][c1].numZeroesRight >= squareLength
    let hasLeftBorder = infoMatrix[r1][c1].numZeroesBelow >= squareLength
    let hasBottomBorder = infoMatrix[r2][c1].numZeroesRight >= squareLength
    let hasRightBorder = infoMatrix[r1][c2].numZeroesBelow >= squareLength
    return hasTopBorder && hasLeftBorder && hasBottomBorder && hasRightBorder
  }

  static func preComputeNumOfZeroes(_ matrix: [[Int]]) -> [[InfoEntry]] {
    var infoMatrix = [[InfoEntry]]()
    let n = matrix.count
    for i in 0 ..< n {
      infoMatrix.append([InfoEntry]())
      for j in 0 ..< n {
        var numZeroes = 0
        if matrix[i][j] == 0 {
          numZeroes = 1
        }
        let entry = InfoEntry(numZeroesRight: numZeroes, numZeroesBelow: numZeroes)
        infoMatrix[i].append(entry)
      }
    }

    let lastIdx = matrix.count - 1
    for row in (0 ..< n).reversed() {
      for col in (0 ..< n).reversed() {
        if matrix[row][col] == 1 {
          continue
        }
        if row < lastIdx {
          infoMatrix[row][col].numZeroesBelow += infoMatrix[row + 1][col].numZeroesBelow
        }

        if col < lastIdx {
          infoMatrix[row][col].numZeroesRight += infoMatrix[row][col + 1].numZeroesRight
        }
      }
    }
    return infoMatrix
  }
}

```
### Solution 4 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^3) time | O(n^2) space - where n is the height and width of the matrix
  static func squareOfZeroes(_ matrix: [[Int]]) -> Bool {
    var infoMatrix = preComputeNumOfZeroes(matrix)
    let n = matrix.count
    for topRow in 0 ..< n {
      for leftCol in 0 ..< n {
        var squareLength = 2
        while squareLength <= n - leftCol, squareLength <= n - topRow {
          let bottomRow = topRow + squareLength - 1
          let rightCol = leftCol + squareLength - 1
          if isSquareOfZeroes(&infoMatrix, topRow, leftCol, bottomRow, rightCol) {
            return true
          }
          squareLength += 1
        }
      }
    }
    return false
  }

  struct InfoEntry {
    var numZeroesRight: Int
    var numZeroesBelow: Int
  }

  // r1 is the top row, c1 is the left column
  // r2 is the bottom row, c2 is the right column
  static func isSquareOfZeroes(_ infoMatrix: inout [[InfoEntry]], _ r1: Int,
                               _ c1: Int, _ r2: Int, _ c2: Int) -> Bool
  {
    let squareLength = c2 - c1 + 1
    let hasTopBorder = infoMatrix[r1][c1].numZeroesRight >= squareLength
    let hasLeftBorder = infoMatrix[r1][c1].numZeroesBelow >= squareLength
    let hasBottomBorder = infoMatrix[r2][c1].numZeroesRight >= squareLength
    let hasRightBorder = infoMatrix[r1][c2].numZeroesBelow >= squareLength
    return hasTopBorder && hasLeftBorder && hasBottomBorder && hasRightBorder
  }

  static func preComputeNumOfZeroes(_ matrix: [[Int]]) -> [[InfoEntry]] {
    var infoMatrix = [[InfoEntry]]()
    let n = matrix.count
    for i in 0 ..< n {
      infoMatrix.append([InfoEntry]())
      for j in 0 ..< n {
        var numZeroes = 0
        if matrix[i][j] == 0 {
          numZeroes = 1
        }
        let entry = InfoEntry(numZeroesRight: numZeroes, numZeroesBelow: numZeroes)
        infoMatrix[i].append(entry)
      }
    }

    let lastIdx = matrix.count - 1
    for row in (0 ..< n).reversed() {
      for col in (0 ..< n).reversed() {
        if matrix[row][col] == 1 {
          continue
        }
        if row < lastIdx {
          infoMatrix[row][col].numZeroesBelow += infoMatrix[row + 1][col].numZeroesBelow
        }

        if col < lastIdx {
          infoMatrix[row][col].numZeroesRight += infoMatrix[row][col + 1].numZeroesRight
        }
      }
    }
    return infoMatrix
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let input = [
        [1, 1, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 1],
        [0, 1, 1, 1, 0, 1],
        [0, 0, 0, 1, 0, 1],
        [0, 1, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 1],
      ]
      try assertEqual(true, Program.squareOfZeroes(input))
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
            [1, 1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 1],
            [0, 1, 1, 1, 0, 1],
            [0, 0, 0, 1, 0, 1],
            [0, 1, 1, 1, 0, 1],
            [0, 0, 0, 0, 0, 1],
        ]
        self.assertEqual(program.squareOfZeroes(matrix), True)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^4) time | O(n^3) space - where n is the height and width of the matrix
def squareOfZeroes(matrix):
    lastIdx = len(matrix) - 1
    return hasSquareOfZeroes(matrix, 0, 0, lastIdx, lastIdx, {})


# r1 is the top row, c1 is the left column
# r2 is the bottom row, c2 is the right column
def hasSquareOfZeroes(matrix, r1, c1, r2, c2, cache):
    if r1 >= r2 or c1 >= c2:
        return False

    key = str(r1) + "-" + str(c1) + "-" + str(r2) + "-" + str(c2)
    if key in cache:
        return cache[key]

    cache[key] = (
        isSquareOfZeroes(matrix, r1, c1, r2, c2)
        or hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2 - 1, c2 - 1, cache)
        or hasSquareOfZeroes(matrix, r1, c1 + 1, r2 - 1, c2, cache)
        or hasSquareOfZeroes(matrix, r1 + 1, c1, r2, c2 - 1, cache)
        or hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2, c2, cache)
        or hasSquareOfZeroes(matrix, r1, c1, r2 - 1, c2 - 1, cache)
    )

    return cache[key]


# r1 is the top row, c1 is the left column
# r2 is the bottom row, c2 is the right column
def isSquareOfZeroes(matrix, r1, c1, r2, c2):
    for row in range(r1, r2 + 1):
        if matrix[row][c1] != 0 or matrix[row][c2] != 0:
            return False
    for col in range(c1, c2 + 1):
        if matrix[r1][col] != 0 or matrix[r2][col] != 0:
            return False
    return True

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^4) time | O(1) space - where n is the height and width of the matrix
def squareOfZeroes(matrix):
    n = len(matrix)
    for topRow in range(n):
        for leftCol in range(n):
            squareLength = 2
            while squareLength <= n - leftCol and squareLength <= n - topRow:
                bottomRow = topRow + squareLength - 1
                rightCol = leftCol + squareLength - 1
                if isSquareOfZeroes(matrix, topRow, leftCol, bottomRow, rightCol):
                    return True
                squareLength += 1
    return False


# r1 is the top row, c1 is the left column
# r2 is the bottom row, c2 is the right column
def isSquareOfZeroes(matrix, r1, c1, r2, c2):
    for row in range(r1, r2 + 1):
        if matrix[row][c1] != 0 or matrix[row][c2] != 0:
            return False
    for col in range(c1, c2 + 1):
        if matrix[r1][col] != 0 or matrix[r2][col] != 0:
            return False
    return True

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^3) time | O(n^3) space - where n is the height and width of the matrix
def squareOfZeroes(matrix):
    infoMatrix = preComputeNumOfZeroes(matrix)
    lastIdx = len(matrix) - 1
    return hasSquareOfZeroes(infoMatrix, 0, 0, lastIdx, lastIdx, {})


# r1 is the top row, c1 is the left column
# r2 is the bottom row, c2 is the right column
def hasSquareOfZeroes(infoMatrix, r1, c1, r2, c2, cache):
    if r1 >= r2 or c1 >= c2:
        return False

    key = str(r1) + "-" + str(c1) + "-" + str(r2) + "-" + str(c2)
    if key in cache:
        return cache[key]

    cache[key] = (
        isSquareOfZeroes(infoMatrix, r1, c1, r2, c2)
        or hasSquareOfZeroes(infoMatrix, r1 + 1, c1 + 1, r2 - 1, c2 - 1, cache)
        or hasSquareOfZeroes(infoMatrix, r1, c1 + 1, r2 - 1, c2, cache)
        or hasSquareOfZeroes(infoMatrix, r1 + 1, c1, r2, c2 - 1, cache)
        or hasSquareOfZeroes(infoMatrix, r1 + 1, c1 + 1, r2, c2, cache)
        or hasSquareOfZeroes(infoMatrix, r1, c1, r2 - 1, c2 - 1, cache)
    )

    return cache[key]


# r1 is the top row, c1 is the left column
# r2 is the bottom row, c2 is the right column
def isSquareOfZeroes(infoMatrix, r1, c1, r2, c2):
    squareLength = c2 - c1 + 1
    hasTopBorder = infoMatrix[r1][c1]["numZeroesRight"] >= squareLength
    hasLeftBorder = infoMatrix[r1][c1]["numZeroesBelow"] >= squareLength
    hasBottomBorder = infoMatrix[r2][c1]["numZeroesRight"] >= squareLength
    hasRightBorder = infoMatrix[r1][c2]["numZeroesBelow"] >= squareLength
    return hasTopBorder and hasLeftBorder and hasBottomBorder and hasRightBorder


def preComputeNumOfZeroes(matrix):
    infoMatrix = [[x for x in row] for row in matrix]

    n = len(matrix)
    for row in range(n):
        for col in range(n):
            numZeroes = 1 if matrix[row][col] == 0 else 0
            infoMatrix[row][col] = {
                "numZeroesBelow": numZeroes,
                "numZeroesRight": numZeroes,
            }

    lastIdx = len(matrix) - 1
    for row in reversed(range(n)):
        for col in reversed(range(n)):
            if matrix[row][col] == 1:
                continue
            if row < lastIdx:
                infoMatrix[row][col]["numZeroesBelow"] += infoMatrix[row + 1][col]["numZeroesBelow"]
            if col < lastIdx:
                infoMatrix[row][col]["numZeroesRight"] += infoMatrix[row][col + 1]["numZeroesRight"]

    return infoMatrix

```
### Solution 4 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^3) time | O(n^2) space - where n is the height and width of the matrix
def squareOfZeroes(matrix):
    infoMatrix = preComputeNumOfZeroes(matrix)
    n = len(matrix)
    for topRow in range(n):
        for leftCol in range(n):
            squareLength = 2
            while squareLength <= n - leftCol and squareLength <= n - topRow:
                bottomRow = topRow + squareLength - 1
                rightCol = leftCol + squareLength - 1
                if isSquareOfZeroes(infoMatrix, topRow, leftCol, bottomRow, rightCol):
                    return True
                squareLength += 1
    return False


# r1 is the top row, c1 is the left column
# r2 is the bottom row, c2 is the right column
def isSquareOfZeroes(infoMatrix, r1, c1, r2, c2):
    squareLength = c2 - c1 + 1
    hasTopBorder = infoMatrix[r1][c1]["numZeroesRight"] >= squareLength
    hasLeftBorder = infoMatrix[r1][c1]["numZeroesBelow"] >= squareLength
    hasBottomBorder = infoMatrix[r2][c1]["numZeroesRight"] >= squareLength
    hasRightBorder = infoMatrix[r1][c2]["numZeroesBelow"] >= squareLength
    return hasTopBorder and hasLeftBorder and hasBottomBorder and hasRightBorder


def preComputeNumOfZeroes(matrix):
    infoMatrix = [[x for x in row] for row in matrix]

    n = len(matrix)
    for row in range(n):
        for col in range(n):
            numZeroes = 1 if matrix[row][col] == 0 else 0
            infoMatrix[row][col] = {
                "numZeroesBelow": numZeroes,
                "numZeroesRight": numZeroes,
            }

    lastIdx = len(matrix) - 1
    for row in reversed(range(n)):
        for col in reversed(range(n)):
            if matrix[row][col] == 1:
                continue
            if row < lastIdx:
                infoMatrix[row][col]["numZeroesBelow"] += infoMatrix[row + 1][col]["numZeroesBelow"]
            if col < lastIdx:
                infoMatrix[row][col]["numZeroesRight"] += infoMatrix[row][col + 1]["numZeroesRight"]

    return infoMatrix

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        matrix = [
            [1, 1, 1, 0, 1, 0],
            [0, 0, 0, 0, 0, 1],
            [0, 1, 1, 1, 0, 1],
            [0, 0, 0, 1, 0, 1],
            [0, 1, 1, 1, 0, 1],
            [0, 0, 0, 0, 0, 1],
        ]
        self.assertEqual(program.squareOfZeroes(matrix), True)

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
    [1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0, 1],
    [0, 0, 0, 1, 0, 1],
    [0, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 1],
  ];
  chai.expect(program.squareOfZeroes(matrix)).to.deep.equal(true);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

interface Cache {
  [key: string]: boolean;
}

// O(n^4) time | O(n^3) space - where n is the height and width of the matrix
export function squareOfZeroes(matrix: number[][]) {
  const lastIdx = matrix.length - 1;
  return hasSquareOfZeroes(matrix, 0, 0, lastIdx, lastIdx, {});
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
function hasSquareOfZeroes(matrix: number[][], r1: number, c1: number, r2: number, c2: number, cache: Cache) {
  if (r1 >= r2 || c1 >= c2) return false;

  const key = r1.toString() + '-' + c1.toString() + '-' + r2.toString() + '-' + c2.toString();
  if (key in cache) return cache[key];

  cache[key] =
    isSquareOfZeroes(matrix, r1, c1, r2, c2) ||
    hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2 - 1, c2 - 1, cache) ||
    hasSquareOfZeroes(matrix, r1, c1 + 1, r2 - 1, c2, cache) ||
    hasSquareOfZeroes(matrix, r1 + 1, c1, r2, c2 - 1, cache) ||
    hasSquareOfZeroes(matrix, r1 + 1, c1 + 1, r2, c2, cache) ||
    hasSquareOfZeroes(matrix, r1, c1, r2 - 1, c2 - 1, cache);

  return cache[key];
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
function isSquareOfZeroes(matrix: number[][], r1: number, c1: number, r2: number, c2: number) {
  for (let row = r1; row < r2 + 1; row++) {
    if (matrix[row][c1] !== 0 || matrix[row][c2] !== 0) return false;
  }
  for (let col = c1; col < c2 + 1; col++) {
    if (matrix[r1][col] !== 0 || matrix[r2][col] !== 0) return false;
  }
  return true;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^4) time | O(1) space - where n is the height and width of the matrix
export function squareOfZeroes(matrix: number[][]) {
  const n = matrix.length;
  for (let topRow = 0; topRow < n; topRow++) {
    for (let leftCol = 0; leftCol < n; leftCol++) {
      let squareLength = 2;
      while (squareLength <= n - leftCol && squareLength <= n - topRow) {
        const bottomRow = topRow + squareLength - 1;
        const rightCol = leftCol + squareLength - 1;
        if (isSquareOfZeroes(matrix, topRow, leftCol, bottomRow, rightCol)) return true;
        squareLength++;
      }
    }
  }
  return false;
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
function isSquareOfZeroes(matrix: number[][], r1: number, c1: number, r2: number, c2: number) {
  for (let row = r1; row < r2 + 1; row++) {
    if (matrix[row][c1] !== 0 || matrix[row][c2] !== 0) return false;
  }
  for (let col = c1; col < c2 + 1; col++) {
    if (matrix[r1][col] !== 0 || matrix[r2][col] !== 0) return false;
  }
  return true;
}

```
### Solution 3 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

interface Cache {
  [key: string]: boolean;
}

type InfoMatrix = {numZeroesBelow: number; numZeroesRight: number}[][];

// O(n^3) time | O(n^3) space - where n is the height and width of the matrix
export function squareOfZeroes(matrix: number[][]) {
  const infoMatrix = preComputeNumOfZeroes(matrix);
  const lastIdx = matrix.length - 1;
  return hasSquareOfZeroes(infoMatrix, 0, 0, lastIdx, lastIdx, {});
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
function hasSquareOfZeroes(infoMatrix: InfoMatrix, r1: number, c1: number, r2: number, c2: number, cache: Cache) {
  if (r1 >= r2 || c1 >= c2) return false;

  const key = r1.toString() + '-' + c1.toString() + '-' + r2.toString() + '-' + c2.toString();
  if (key in cache) return cache[key];

  cache[key] =
    isSquareOfZeroes(infoMatrix, r1, c1, r2, c2) ||
    hasSquareOfZeroes(infoMatrix, r1 + 1, c1 + 1, r2 - 1, c2 - 1, cache) ||
    hasSquareOfZeroes(infoMatrix, r1, c1 + 1, r2 - 1, c2, cache) ||
    hasSquareOfZeroes(infoMatrix, r1 + 1, c1, r2, c2 - 1, cache) ||
    hasSquareOfZeroes(infoMatrix, r1 + 1, c1 + 1, r2, c2, cache) ||
    hasSquareOfZeroes(infoMatrix, r1, c1, r2 - 1, c2 - 1, cache);

  return cache[key];
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
function isSquareOfZeroes(infoMatrix: InfoMatrix, r1: number, c1: number, r2: number, c2: number) {
  const squareLength = c2 - c1 + 1;
  const hasTopBorder = infoMatrix[r1][c1].numZeroesRight >= squareLength;
  const hasLeftBorder = infoMatrix[r1][c1].numZeroesBelow >= squareLength;
  const hasBottomBorder = infoMatrix[r2][c1].numZeroesRight >= squareLength;
  const hasRightBorder = infoMatrix[r1][c2].numZeroesBelow >= squareLength;
  return hasTopBorder && hasLeftBorder && hasBottomBorder && hasRightBorder;
}

function preComputeNumOfZeroes(matrix: number[][]) {
  const infoMatrix: InfoMatrix = matrix.map(row =>
    row.map(value => {
      const numZeroes = value === 0 ? 1 : 0;
      return {numZeroesBelow: numZeroes, numZeroesRight: numZeroes};
    }),
  );

  const lastIdx = matrix.length - 1;
  for (let row = lastIdx; row >= 0; row--) {
    for (let col = lastIdx; col >= 0; col--) {
      if (matrix[row][col] === 1) continue;
      if (row < lastIdx) {
        infoMatrix[row][col].numZeroesBelow += infoMatrix[row + 1][col].numZeroesBelow;
      }
      if (col < lastIdx) {
        infoMatrix[row][col].numZeroesRight += infoMatrix[row][col + 1].numZeroesRight;
      }
    }
  }

  return infoMatrix;
}

```
### Solution 4 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

type InfoMatrix = {numZeroesBelow: number; numZeroesRight: number}[][];

// O(n^3) time | O(n^2) space - where n is the height and width of the matrix
export function squareOfZeroes(matrix: number[][]) {
  const infoMatrix = preComputeNumOfZeroes(matrix);
  const n = matrix.length;
  for (let topRow = 0; topRow < n; topRow++) {
    for (let leftCol = 0; leftCol < n; leftCol++) {
      let squareLength = 2;
      while (squareLength <= n - leftCol && squareLength <= n - topRow) {
        const bottomRow = topRow + squareLength - 1;
        const rightCol = leftCol + squareLength - 1;
        if (isSquareOfZeroes(infoMatrix, topRow, leftCol, bottomRow, rightCol)) return true;
        squareLength++;
      }
    }
  }
  return false;
}

// r1 is the top row, c1 is the left column
// r2 is the bottom row, c2 is the right column
function isSquareOfZeroes(infoMatrix: InfoMatrix, r1: number, c1: number, r2: number, c2: number) {
  const squareLength = c2 - c1 + 1;
  const hasTopBorder = infoMatrix[r1][c1].numZeroesRight >= squareLength;
  const hasLeftBorder = infoMatrix[r1][c1].numZeroesBelow >= squareLength;
  const hasBottomBorder = infoMatrix[r2][c1].numZeroesRight >= squareLength;
  const hasRightBorder = infoMatrix[r1][c2].numZeroesBelow >= squareLength;
  return hasTopBorder && hasLeftBorder && hasBottomBorder && hasRightBorder;
}

function preComputeNumOfZeroes(matrix: number[][]) {
  const infoMatrix: InfoMatrix = matrix.map(row =>
    row.map(value => {
      const numZeroes = value === 0 ? 1 : 0;
      return {numZeroesBelow: numZeroes, numZeroesRight: numZeroes};
    }),
  );

  const lastIdx = matrix.length - 1;
  for (let row = lastIdx; row >= 0; row--) {
    for (let col = lastIdx; col >= 0; col--) {
      if (matrix[row][col] === 1) continue;
      if (row < lastIdx) {
        infoMatrix[row][col].numZeroesBelow += infoMatrix[row + 1][col].numZeroesBelow;
      }
      if (col < lastIdx) {
        infoMatrix[row][col].numZeroesRight += infoMatrix[row][col + 1].numZeroesRight;
      }
    }
  }

  return infoMatrix;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const matrix = [
    [1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0, 1],
    [0, 0, 0, 1, 0, 1],
    [0, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 1],
  ];
  chai.expect(program.squareOfZeroes(matrix)).to.deep.equal(true);
});

```

