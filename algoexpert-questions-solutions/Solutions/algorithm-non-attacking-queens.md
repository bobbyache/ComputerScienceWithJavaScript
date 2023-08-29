# Non-Attacking Queens
<div class="html">
<p>
  Write a function that takes in a positive integer <span>n</span> and returns
  the number of non-attacking placements of <span>n</span> queens on an
  <span>n x n</span> chessboard.
</p>
<p>
  A non-attacking placement is one where no queen can attack another queen in a
  single turn. In other words, it's a placement where no queen can move to the
  same position as another queen in a single turn.
</p>
<p>
  In chess, queens can move any number of squares horizontally, vertically, or
  diagonally in a single turn.
</p>
<pre>
+--+--+--+--+  
|  |Q |  |  |
+--+--+--+--+
|  |  |  |Q |
+--+--+--+--+
|Q |  |  |  |
+--+--+--+--+
|  |  |Q |  |
+--+--+--+--+
</pre>
<p>
  The chessboard above is an example of a non-attacking placement of 4 queens on
  a 4x4 chessboard. For reference, there are only 2 non-attacking placements of
  4 queens on a 4x4 chessboard.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">n</span> = 4
</pre>
<h3>Sample Output</h3>
<pre>
2
</pre>
</div>

Hint 1
<p>
  As soon as the input gets relatively large, this problem can no longer be
  solved with a brute-force approach. For example, there are
  <span>16,777,216</span> possible placements of 8 queens on an 8x8 chessboard.
  To consider all of these placements and to check if they're non-attacking
  isn't viable. Can you come up with an approach that limits the number of
  placements to consider?
</p>


Hint 2

<p>
  In order to generate a placement of <span>n</span> queens, you naturally have
  to place queens one at a time. Try only placing queens such that they're in a
  non-attacking position, given where you've previously placed queens. This
  should drastically limit the total number of placements that you consider. For
  example, if you place the first queen in the first row and in the first
  column, then don't consider a placement where any other queen is in the first
  row, in the first column, or in the down diagonal that starts at the first
  queen.
</p>


Hint 3

<p>
  When placing a queen in order to generate a full placement of
  <span>n</span> queens, you'll have to check if the position that you're
  considering is non-attacking. This can be done in linear time or in constant
  time, depending on if and how you store what columns and diagonals are blocked
  by previously placed queens. See the Conceptual Overview section of this
  question's video explanation for a more in-depth explanation.
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
      auto input = 4;
      auto expected = 2;
      auto actual = nonAttackingQueens(input);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <cmath>
using namespace std;

int getNumberOfNonAttackingQueenPlacements(int row,
                                           vector<int> &columnPlacements,
                                           int boardSize);
bool isNonAttackingPlacement(int row, int col, vector<int> columnPlacements);

// Lower Bound: O(n!) time | O(n) space - where n is the input number
int nonAttackingQueens(int n) {
  // Each index of `columnPlacements` represents a row of the chessboard,
  // and the value at each index is the column (on the relevant row) where
  // a queen is currently placed.
  vector<int> columnPlacements(n, 0);
  return getNumberOfNonAttackingQueenPlacements(0, columnPlacements, n);
}

int getNumberOfNonAttackingQueenPlacements(int row,
                                           vector<int> &columnPlacements,
                                           int boardSize) {
  if (row == boardSize)
    return 1;

  int validPlacements = 0;
  for (int col = 0; col < boardSize; col++) {
    if (isNonAttackingPlacement(row, col, columnPlacements)) {
      columnPlacements[row] = col;
      validPlacements += getNumberOfNonAttackingQueenPlacements(
          row + 1, columnPlacements, boardSize);
    }
  }

  return validPlacements;
}

// As `row` tends to `n`, this becomes an O(n)-time operation.
bool isNonAttackingPlacement(int row, int col, vector<int> columnPlacements) {
  for (int previousRow = 0; previousRow < row; previousRow++) {
    int columnToCheck = columnPlacements[previousRow];
    bool sameColumn = columnToCheck == col;
    bool onDiagonal = abs(columnToCheck - col) == row - previousRow;
    if (sameColumn || onDiagonal)
      return false;
  }

  return true;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <unordered_set>
using namespace std;

int getNumberOfNonAttackingQueenPlacements(
    int row, unordered_set<int> &blockedColumns,
    unordered_set<int> &blockedUpDiagonals,
    unordered_set<int> &blockedDownDiagonals, int boardSize);
bool isNonAttackingPlacement(int row, int col,
                             unordered_set<int> &blockedColumns,
                             unordered_set<int> &blockedUpDiagonals,
                             unordered_set<int> &blockedDownDiagonals);
void placeQueen(int row, int col, unordered_set<int> &blockedColumns,
                unordered_set<int> &blockedUpDiagonals,
                unordered_set<int> &blockedDownDiagonals);
void removeQueen(int row, int col, unordered_set<int> &blockedColumns,
                 unordered_set<int> &blockedUpDiagonals,
                 unordered_set<int> &blockedDownDiagonals);

// Upper Bound: O(n!) time | O(n) space - where n is the input number
int nonAttackingQueens(int n) {
  unordered_set<int> blockedColumns;
  unordered_set<int> blockedUpDiagonals;
  unordered_set<int> blockedDownDiagonals;
  return getNumberOfNonAttackingQueenPlacements(
      0, blockedColumns, blockedUpDiagonals, blockedDownDiagonals, n);
}

int getNumberOfNonAttackingQueenPlacements(
    int row, unordered_set<int> &blockedColumns,
    unordered_set<int> &blockedUpDiagonals,
    unordered_set<int> &blockedDownDiagonals, int boardSize) {
  if (row == boardSize)
    return 1;

  int validPlacements = 0;
  for (int col = 0; col < boardSize; col++) {
    if (isNonAttackingPlacement(row, col, blockedColumns, blockedUpDiagonals,
                                blockedDownDiagonals)) {
      placeQueen(row, col, blockedColumns, blockedUpDiagonals,
                 blockedDownDiagonals);
      validPlacements += getNumberOfNonAttackingQueenPlacements(
          row + 1, blockedColumns, blockedUpDiagonals, blockedDownDiagonals,
          boardSize);
      removeQueen(row, col, blockedColumns, blockedUpDiagonals,
                  blockedDownDiagonals);
    }
  }

  return validPlacements;
}

// This is always an O(1)-time operation.
bool isNonAttackingPlacement(int row, int col,
                             unordered_set<int> &blockedColumns,
                             unordered_set<int> &blockedUpDiagonals,
                             unordered_set<int> &blockedDownDiagonals) {
  if (blockedColumns.find(col) != blockedColumns.end())
    return false;
  if (blockedUpDiagonals.find(row + col) != blockedUpDiagonals.end())
    return false;
  if (blockedDownDiagonals.find(row - col) != blockedDownDiagonals.end())
    return false;

  return true;
}

void placeQueen(int row, int col, unordered_set<int> &blockedColumns,
                unordered_set<int> &blockedUpDiagonals,
                unordered_set<int> &blockedDownDiagonals) {
  blockedColumns.insert(col);
  blockedUpDiagonals.insert(row + col);
  blockedDownDiagonals.insert(row - col);
}

void removeQueen(int row, int col, unordered_set<int> &blockedColumns,
                 unordered_set<int> &blockedUpDiagonals,
                 unordered_set<int> &blockedDownDiagonals) {
  blockedColumns.erase(col);
  blockedUpDiagonals.erase(row + col);
  blockedDownDiagonals.erase(row - col);
}
```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      auto input = 4;
      auto expected = 2;
      auto actual = nonAttackingQueens(input);
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
		var input = 4;
		var expected = 2;
		var actual = new Program().NonAttackingQueens(input);
		Utils.AssertTrue(expected == actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	// Lower Bound: O(n!) time | O(n) space - where n is the input number
	public int NonAttackingQueens(int n) {
		// Each index of `columnPlacements` represents a row of the chessboard,
		// and the value at each index is the column (on the relevant row) where
		// a queen is currently placed.
		int[] columnPlacements = new int[n];
		return getNumberOfNonAttackingQueenPlacements(0, columnPlacements, n);
	}

	public int getNumberOfNonAttackingQueenPlacements(int row, int[] columnPlacements,
	  int boardSize) {
		if (row == boardSize) return 1;

		int validPlacements = 0;
		for (int col = 0; col < boardSize; col++) {
			if (isNonAttackingPlacement(row, col, columnPlacements)) {
				columnPlacements[row] = col;
				validPlacements += getNumberOfNonAttackingQueenPlacements(row + 1,
				    columnPlacements,
				    boardSize);
			}
		}

		return validPlacements;
	}

	// As `row` tends to `n`, this becomes an O(n)-time operation.
	public bool isNonAttackingPlacement(int row, int col, int[] columnPlacements) {
		for (int previousRow = 0; previousRow < row; previousRow++) {
			int columnToCheck = columnPlacements[previousRow];
			bool sameColumn = (columnToCheck == col);
			bool onDiagonal = Math.Abs(columnToCheck - col) == (row - previousRow);
			if (sameColumn || onDiagonal) {
				return false;
			}

		}

		return true;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Linq;
using System.Collections.Generic;


public class Program {

	// Upper Bound: O(n!) time | O(n) space - where n is the input number
	public int NonAttackingQueens(int n) {
		HashSet<int> blockedColumns = new HashSet<int>();
		HashSet<int> blockedUpDiagonals = new HashSet<int>();
		HashSet<int> blockedDownDiagonals = new HashSet<int>();
		return getNumberOfNonAttackingQueenPlacements(0, blockedColumns, blockedUpDiagonals,
		         blockedDownDiagonals, n);
	}

	public int getNumberOfNonAttackingQueenPlacements(int row, HashSet<int> blockedColumns,
	  HashSet<int> blockedUpDiagonals,
	  HashSet<int> blockedDownDiagonals,
	  int boardSize) {
		if (row == boardSize) return 1;

		int validPlacements = 0;
		for (int col = 0; col < boardSize; col++) {
			if (isNonAttackingPlacement(row, col, blockedColumns, blockedUpDiagonals,
			  blockedDownDiagonals)) {
				placeQueen(row, col, blockedColumns, blockedUpDiagonals,
				  blockedDownDiagonals);
				validPlacements += getNumberOfNonAttackingQueenPlacements(row + 1,
				    blockedColumns, blockedUpDiagonals, blockedDownDiagonals,
				    boardSize);
				removeQueen(row, col, blockedColumns, blockedUpDiagonals,
				  blockedDownDiagonals);
			}
		}

		return validPlacements;
	}

	// This is always an O(1)-time operation.
	public bool isNonAttackingPlacement(int row, int col, HashSet<int> blockedColumns,
	  HashSet<int> blockedUpDiagonals,
	  HashSet<int> blockedDownDiagonals) {
		if (blockedColumns.Contains(col)) {
			return false;
		} else if (blockedUpDiagonals.Contains(row + col)) {
			return false;
		} else if (blockedDownDiagonals.Contains(row - col)) {
			return false;
		}

		return true;
	}

	public void placeQueen(int row, int col, HashSet<int> blockedColumns,
	  HashSet<int> blockedUpDiagonals, HashSet<int> blockedDownDiagonals) {
		blockedColumns.Add(col);
		blockedUpDiagonals.Add(row + col);
		blockedDownDiagonals.Add(row - col);
	}

	public void removeQueen(int row, int col, HashSet<int> blockedColumns,
	  HashSet<int> blockedUpDiagonals,
	  HashSet<int> blockedDownDiagonals) {
		blockedColumns.Remove(col);
		blockedUpDiagonals.Remove(row + col);
		blockedDownDiagonals.Remove(row - col);
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		var input = 4;
		var expected = 2;
		var actual = new Program().NonAttackingQueens(input);
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
	input := 4
	expected := 2
	actual := NonAttackingQueens(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// Lower Bound: O(n!) time | O(n) space - where n is the input number
func NonAttackingQueens(n int) int {
	// Each index of `columnPlacements` represents a row of the chessboard,
	// and the value at each index is the column (on the relevant row) where
	// a queen is currently placed.
	columnPlacements := make([]int, n)
	return getNumberOfNonAttackingQueenPlacements(0, columnPlacements, n)
}

func getNumberOfNonAttackingQueenPlacements(
	row int, columnPlacements []int, boardSize int) int {
	if row == boardSize {
		return 1
	}

	validPlacements := 0
	for col := 0; col < boardSize; col++ {
		if isNonAttackingPlacement(row, col, columnPlacements) {
			columnPlacements[row] = col
			validPlacements += getNumberOfNonAttackingQueenPlacements(row+1,
				columnPlacements, boardSize)
		}
	}
	return validPlacements
}

// As `row` tends to `n`, this becomes an O(n)-time operation.
func isNonAttackingPlacement(row, col int, columnPlacements []int) bool {
	for previousRow := 0; previousRow < row; previousRow++ {
		columnToCheck := columnPlacements[previousRow]
		sameColumn := columnToCheck == col
		onDiagonal := abs(columnToCheck-col) == row-previousRow
		if sameColumn || onDiagonal {
			return false
		}
	}
	return true
}

func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// Upper Bound: O(n!) time | O(n) space - where n is the input number
func NonAttackingQueens(n int) int {
	blockedColumns := map[int]bool{}
	blockedUpDiagonals := map[int]bool{}
	blockedDownDiagonals := map[int]bool{}
	return getNumberOfNonAttackingQueenPlacements(0, blockedColumns,
		blockedUpDiagonals, blockedDownDiagonals, n)
}

func getNumberOfNonAttackingQueenPlacements(
	row int,
	blockedColumns map[int]bool,
	blockedUpDiagonals map[int]bool,
	blockedDownDiagonals map[int]bool,
	boardSize int,
) int {
	if row == boardSize {
		return 1
	}

	validPlacements := 0
	for col := 0; col < boardSize; col++ {
		if isNonAttackingPlacement(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals) {
			placeQueen(row, col, blockedColumns, blockedUpDiagonals,
				blockedDownDiagonals)
			validPlacements += getNumberOfNonAttackingQueenPlacements(row+1,
				blockedColumns, blockedUpDiagonals, blockedDownDiagonals, boardSize)
			removeQueen(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals)
		}
	}
	return validPlacements
}

// This is always an O(1)-time operation.
func isNonAttackingPlacement(row, col int,
	blockedColumns map[int]bool,
	blockedUpDiagonals map[int]bool,
	blockedDownDiagonals map[int]bool,
) bool {
	if blockedColumns[col] {
		return false
	}
	if blockedUpDiagonals[row+col] {
		return false
	}
	if blockedDownDiagonals[row-col] {
		return false
	}
	return true
}

func placeQueen(row, col int,
	blockedColumns map[int]bool,
	blockedUpDiagonals map[int]bool,
	blockedDownDiagonals map[int]bool,
) {
	blockedColumns[col] = true
	blockedUpDiagonals[row+col] = true
	blockedDownDiagonals[row-col] = true
}

func removeQueen(row, col int,
	blockedColumns map[int]bool,
	blockedUpDiagonals map[int]bool,
	blockedDownDiagonals map[int]bool,
) {
	blockedColumns[col] = false
	blockedUpDiagonals[row+col] = false
	blockedDownDiagonals[row-col] = false
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := 4
	expected := 2
	actual := NonAttackingQueens(input)
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
    var input = 4;
    var expected = 2;
    var actual = new Program().nonAttackingQueens(input);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // Lower Bound: O(n!) time | O(n) space - where n is the input number
  public int nonAttackingQueens(int n) {
    // Each index of `columnPlacements` represents a row of the chessboard,
    // and the value at each index is the column (on the relevant row) where
    // a queen is currently placed.
    int[] columnPlacements = new int[n];
    return getNumberOfNonAttackingQueenPlacements(0, columnPlacements, n);
  }

  public int getNumberOfNonAttackingQueenPlacements(
      int row, int[] columnPlacements, int boardSize) {
    if (row == boardSize) return 1;

    int validPlacements = 0;
    for (int col = 0; col < boardSize; col++) {
      if (isNonAttackingPlacement(row, col, columnPlacements)) {
        columnPlacements[row] = col;
        validPlacements +=
            getNumberOfNonAttackingQueenPlacements(row + 1, columnPlacements, boardSize);
      }
    }

    return validPlacements;
  }

  // As `row` tends to `n`, this becomes an O(n)-time operation.
  public boolean isNonAttackingPlacement(int row, int col, int[] columnPlacements) {
    for (int previousRow = 0; previousRow < row; previousRow++) {
      int columnToCheck = columnPlacements[previousRow];
      boolean sameColumn = (columnToCheck == col);
      boolean onDiagonal = Math.abs(columnToCheck - col) == (row - previousRow);
      if (sameColumn || onDiagonal) {
        return false;
      }
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

  // Upper Bound: O(n!) time | O(n) space - where n is the input number
  public int nonAttackingQueens(int n) {
    HashSet<Integer> blockedColumns = new HashSet<Integer>();
    HashSet<Integer> blockedUpDiagonals = new HashSet<Integer>();
    HashSet<Integer> blockedDownDiagonals = new HashSet<Integer>();
    return getNumberOfNonAttackingQueenPlacements(
        0, blockedColumns, blockedUpDiagonals, blockedDownDiagonals, n);
  }

  public int getNumberOfNonAttackingQueenPlacements(
      int row,
      HashSet<Integer> blockedColumns,
      HashSet<Integer> blockedUpDiagonals,
      HashSet<Integer> blockedDownDiagonals,
      int boardSize) {
    if (row == boardSize) return 1;

    int validPlacements = 0;
    for (int col = 0; col < boardSize; col++) {
      if (isNonAttackingPlacement(
          row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals)) {
        placeQueen(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals);
        validPlacements +=
            getNumberOfNonAttackingQueenPlacements(
                row + 1, blockedColumns, blockedUpDiagonals, blockedDownDiagonals, boardSize);
        removeQueen(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals);
      }
    }

    return validPlacements;
  }

  // This is always an O(1)-time operation.
  public boolean isNonAttackingPlacement(
      int row,
      int col,
      HashSet<Integer> blockedColumns,
      HashSet<Integer> blockedUpDiagonals,
      HashSet<Integer> blockedDownDiagonals) {
    if (blockedColumns.contains(col)) {
      return false;
    } else if (blockedUpDiagonals.contains(row + col)) {
      return false;
    } else if (blockedDownDiagonals.contains(row - col)) {
      return false;
    }

    return true;
  }

  public void placeQueen(
      int row,
      int col,
      HashSet<Integer> blockedColumns,
      HashSet<Integer> blockedUpDiagonals,
      HashSet<Integer> blockedDownDiagonals) {
    blockedColumns.add(col);
    blockedUpDiagonals.add(row + col);
    blockedDownDiagonals.add(row - col);
  }

  public void removeQueen(
      int row,
      int col,
      HashSet<Integer> blockedColumns,
      HashSet<Integer> blockedUpDiagonals,
      HashSet<Integer> blockedDownDiagonals) {
    blockedColumns.remove(col);
    blockedUpDiagonals.remove(row + col);
    blockedDownDiagonals.remove(row - col);
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    var input = 4;
    var expected = 2;
    var actual = new Program().nonAttackingQueens(input);
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
  const input = 4;
  const expected = 2;
  const actual = program.nonAttackingQueens(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Lower Bound: O(n!) time | O(n) space - where n is the input number
function nonAttackingQueens(n) {
  // Each index of `columnPlacements` represents a row of the chessboard,
  // and the value at each index is the column (on the relevant row) where
  // a queen is currently placed.
  const columnPlacements = new Array(n).fill(0);
  return getNumberOfNonAttackingQueenPlacements(0, columnPlacements, n);
}

function getNumberOfNonAttackingQueenPlacements(row, columnPlacements, boardSize) {
  if (row === boardSize) return 1;

  let validPlacements = 0;
  for (let col = 0; col < boardSize; col++) {
    if (isNonAttackingPlacement(row, col, columnPlacements)) {
      columnPlacements[row] = col;
      validPlacements += getNumberOfNonAttackingQueenPlacements(row + 1, columnPlacements, boardSize);
    }
  }

  return validPlacements;
}

// As `row` tends to `n`, this becomes an O(n)-time operation.
function isNonAttackingPlacement(row, col, columnPlacements) {
  for (let previousRow = 0; previousRow < row; previousRow++) {
    const columnToCheck = columnPlacements[previousRow];
    const sameColumn = columnToCheck === col;
    const onDiagonal = Math.abs(columnToCheck - col) === row - previousRow;
    if (sameColumn || onDiagonal) return false;
  }

  return true;
}

// Do not edit the line below.
exports.nonAttackingQueens = nonAttackingQueens;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Upper Bound: O(n!) time | O(n) space - where n is the input number
function nonAttackingQueens(n) {
  const blockedColumns = new Set();
  const blockedUpDiagonals = new Set();
  const blockedDownDiagonals = new Set();
  return getNumberOfNonAttackingQueenPlacements(0, blockedColumns, blockedUpDiagonals, blockedDownDiagonals, n);
}

function getNumberOfNonAttackingQueenPlacements(
  row,
  blockedColumns,
  blockedUpDiagonals,
  blockedDownDiagonals,
  boardSize,
) {
  if (row === boardSize) return 1;

  let validPlacements = 0;
  for (let col = 0; col < boardSize; col++) {
    if (isNonAttackingPlacement(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals)) {
      placeQueen(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals);
      validPlacements += getNumberOfNonAttackingQueenPlacements(
        row + 1,
        blockedColumns,
        blockedUpDiagonals,
        blockedDownDiagonals,
        boardSize,
      );
      removeQueen(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals);
    }
  }

  return validPlacements;
}

// This is always an O(1)-time operation.
function isNonAttackingPlacement(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals) {
  if (blockedColumns.has(col)) return false;
  if (blockedUpDiagonals.has(row + col)) return false;
  if (blockedDownDiagonals.has(row - col)) return false;

  return true;
}

function placeQueen(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals) {
  blockedColumns.add(col);
  blockedUpDiagonals.add(row + col);
  blockedDownDiagonals.add(row - col);
}

function removeQueen(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals) {
  blockedColumns.delete(col);
  blockedUpDiagonals.delete(row + col);
  blockedDownDiagonals.delete(row - col);
}

// Do not edit the line below.
exports.nonAttackingQueens = nonAttackingQueens;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = 4;
  const expected = 2;
  const actual = program.nonAttackingQueens(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.nonAttackingQueens

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = 4
        val expected = 2
        val output = nonAttackingQueens(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.abs

// Lower Bound: O(n!) time | O(n) space - where n is the input number
fun nonAttackingQueens(n: Int): Int {
    // Each index of `columnPlacements` represents a row of the chessboard,
    // and the value at each index is the column (on the relevant row) where
    // a queen is currently placed.
    val columnPlacements = MutableList(n) { 0 }
    return getNumberOfNonAttackingQueenPlacements(0, columnPlacements, n)
}

fun getNumberOfNonAttackingQueenPlacements(row: Int, columnPlacements: MutableList<Int>, boardSize: Int): Int {
    if (row == boardSize) return 1

    var validPlacements = 0
    for (col in 0 until boardSize) {
        if (isNonAttackingPlacement(row, col, columnPlacements)) {
            columnPlacements[row] = col
            validPlacements += getNumberOfNonAttackingQueenPlacements(row + 1, columnPlacements, boardSize)
        }
    }

    return validPlacements
}

// As `row` tends to `n`, this becomes an O(n)-time operation.
fun isNonAttackingPlacement(row: Int, col: Int, columnPlacements: List<Int>): Boolean {
    for (previousRow in 0 until row) {
        val columnToCheck = columnPlacements[previousRow]
        val sameColumn = columnToCheck == col
        val onDiagonal = abs(columnToCheck - col) == row - previousRow
        if (sameColumn || onDiagonal) return false
    }

    return true
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// Upper Bound: O(n!) time | O(n) space - where n is the input number
fun nonAttackingQueens(n: Int): Int {
    val blockedColumns = mutableSetOf<Int>()
    val blockedUpDiagonals = mutableSetOf<Int>()
    val blockedDownDiagonals = mutableSetOf<Int>()
    return getNumberOfNonAttackingQueenPlacements(0, blockedColumns, blockedUpDiagonals, blockedDownDiagonals, n)
}

fun getNumberOfNonAttackingQueenPlacements(row: Int, blockedColumns: MutableSet<Int>, blockedUpDiagonals: MutableSet<Int>, blockedDownDiagonals: MutableSet<Int>, boardSize: Int): Int {
    if (row == boardSize) return 1

    var validPlacements = 0
    for (col in 0 until boardSize) {
        if (isNonAttackingPlacement(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals)) {
            placeQueen(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals)
            validPlacements += getNumberOfNonAttackingQueenPlacements(row + 1, blockedColumns, blockedUpDiagonals, blockedDownDiagonals, boardSize)
            removeQueen(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals)
        }
    }

    return validPlacements
}

// This is always an O(1)-time operation.
fun isNonAttackingPlacement(row: Int, col: Int, blockedColumns: MutableSet<Int>, blockedUpDiagonals: MutableSet<Int>, blockedDownDiagonals: MutableSet<Int>): Boolean {
    if (col in blockedColumns) return false
    if (row + col in blockedUpDiagonals) return false
    if (row - col in blockedDownDiagonals) return false

    return true
}

fun placeQueen(row: Int, col: Int, blockedColumns: MutableSet<Int>, blockedUpDiagonals: MutableSet<Int>, blockedDownDiagonals: MutableSet<Int>) {
    blockedColumns.add(col)
    blockedUpDiagonals.add(row + col)
    blockedDownDiagonals.add(row - col)
}

fun removeQueen(row: Int, col: Int, blockedColumns: MutableSet<Int>, blockedUpDiagonals: MutableSet<Int>, blockedDownDiagonals: MutableSet<Int>) {
    blockedColumns.remove(col)
    blockedUpDiagonals.remove(row + col)
    blockedDownDiagonals.remove(row - col)
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.nonAttackingQueens

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = 4
        val expected = 2
        val output = nonAttackingQueens(input)
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
      var input = 4
      var expected = 2
      var actual = Program().nonAttackingQueens(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // Lower Bound: O(n!) time | O(n) space - where n is the input number
  func nonAttackingQueens(_ n: Int) -> Int {
    // Each index of `columnPlacements` represents a row of the chessboard,
    // and the value at each index is the column (on the relevant row) where
    // a queen is currently placed.
    var columnPlacements = Array(repeating: 0, count: n)
    return getNumberOfNonAttackingQueenPlacements(0, &columnPlacements, n)
  }

  func getNumberOfNonAttackingQueenPlacements(
    _ row: Int, _ columnPlacements: inout [Int],
    _ boardSize: Int
  ) -> Int {
    if row == boardSize {
      return 1
    }

    var validPlacements = 0
    for col in stride(from: 0, to: boardSize, by: 1) {
      if isNonAttackingPlacement(row, col, columnPlacements) {
        columnPlacements[row] = col
        validPlacements += getNumberOfNonAttackingQueenPlacements(row + 1,
                                                                  &columnPlacements, boardSize)
      }
    }
    return validPlacements
  }

  // As `row` tends to `n`, this becomes an O(n)-time operation.
  func isNonAttackingPlacement(
    _ row: Int, _ col: Int,
    _ columnPlacements: [Int]
  ) -> Bool {
    for previousRow in stride(from: 0, to: row, by: 1) {
      let columnToCheck = columnPlacements[previousRow]
      let sameColumn = columnToCheck == col
      let onDiagonal = abs(columnToCheck - col) == row - previousRow
      if sameColumn || onDiagonal {
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
  // Upper Bound: O(n!) time | O(n) space - where n is the input number
  func nonAttackingQueens(_ n: Int) -> Int {
    var blockedColumns: Set<Int> = []
    var blockedUpDiagonals: Set<Int> = []
    var blockedDownDiagonals: Set<Int> = []
    return getNumberOfNonAttackingQueenPlacements(0, &blockedColumns,
                                                  &blockedUpDiagonals, &blockedDownDiagonals, n)
  }

  func getNumberOfNonAttackingQueenPlacements(
    _ row: Int,
    _ blockedColumns: inout Set<Int>,
    _ blockedUpDiagonals: inout Set<Int>,
    _ blockedDownDiagonals: inout Set<Int>,
    _ boardSize: Int
  ) -> Int {
    if row == boardSize {
      return 1
    }

    var validPlacements = 0
    for col in stride(from: 0, to: boardSize, by: 1) {
      if isNonAttackingPlacement(row, col, &blockedColumns, &blockedUpDiagonals, &blockedDownDiagonals) {
        placeQueen(row, col, &blockedColumns, &blockedUpDiagonals,
                   &blockedDownDiagonals)
        validPlacements += getNumberOfNonAttackingQueenPlacements(row + 1,
                                                                  &blockedColumns, &blockedUpDiagonals, &blockedDownDiagonals, boardSize)
        removeQueen(row, col, &blockedColumns, &blockedUpDiagonals, &blockedDownDiagonals)
      }
    }
    return validPlacements
  }

  // This is always an O(1)-time operation.
  func isNonAttackingPlacement(
    _ row: Int, _ col: Int,
    _ blockedColumns: inout Set<Int>,
    _ blockedUpDiagonals: inout Set<Int>,
    _ blockedDownDiagonals: inout Set<Int>
  ) -> Bool {
    if blockedColumns.contains(col) {
      return false
    }
    if blockedUpDiagonals.contains(row + col) {
      return false
    }
    if blockedDownDiagonals.contains(row - col) {
      return false
    }
    return true
  }

  func placeQueen(
    _ row: Int, _ col: Int,
    _ blockedColumns: inout Set<Int>,
    _ blockedUpDiagonals: inout Set<Int>,
    _ blockedDownDiagonals: inout Set<Int>
  ) {
    blockedColumns.insert(col)
    blockedUpDiagonals.insert(row + col)
    blockedDownDiagonals.insert(row - col)
  }

  func removeQueen(
    _ row: Int, _ col: Int,
    _ blockedColumns: inout Set<Int>,
    _ blockedUpDiagonals: inout Set<Int>,
    _ blockedDownDiagonals: inout Set<Int>
  ) {
    blockedColumns.remove(col)
    blockedUpDiagonals.remove(row + col)
    blockedDownDiagonals.remove(row - col)
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = 4
      var expected = 2
      var actual = Program().nonAttackingQueens(input)
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
        input = 4
        expected = 2
        actual = program.nonAttackingQueens(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Lower Bound: O(n!) time | O(n) space - where n is the input number
def nonAttackingQueens(n):
    # Each index of `columnPlacements` represents a row of the chessboard,
    # and the value at each index is the column (on the relevant row) where
    # a queen is currently placed.
    columnPlacements = [0] * n
    return getNumberOfNonAttackingQueenPlacements(0, columnPlacements, n)


def getNumberOfNonAttackingQueenPlacements(row, columnPlacements, boardSize):
    if row == boardSize:
        return 1

    validPlacements = 0
    for col in range(boardSize):
        if isNonAttackingPlacement(row, col, columnPlacements):
            columnPlacements[row] = col
            validPlacements += getNumberOfNonAttackingQueenPlacements(row + 1, columnPlacements, boardSize)

    return validPlacements


# As `row` tends to `n`, this becomes an O(n)-time operation.
def isNonAttackingPlacement(row, col, columnPlacements):
    for previousRow in range(row):
        columnToCheck = columnPlacements[previousRow]
        sameColumn = columnToCheck == col
        onDiagonal = abs(columnToCheck - col) == row - previousRow
        if sameColumn or onDiagonal:
            return False

    return True

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# Upper Bound: O(n!) time | O(n) space - where n is the input number
def nonAttackingQueens(n):
    blockedColumns = set()
    blockedUpDiagonals = set()
    blockedDownDiagonals = set()
    return getNumberOfNonAttackingQueenPlacements(0, blockedColumns, blockedUpDiagonals, blockedDownDiagonals, n)


def getNumberOfNonAttackingQueenPlacements(row, blockedColumns, blockedUpDiagonals, blockedDownDiagonals, boardSize):
    if row == boardSize:
        return 1

    validPlacements = 0
    for col in range(boardSize):
        if isNonAttackingPlacement(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals):
            placeQueen(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals)
            validPlacements += getNumberOfNonAttackingQueenPlacements(
                row + 1, blockedColumns, blockedUpDiagonals, blockedDownDiagonals, boardSize
            )
            removeQueen(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals)

    return validPlacements


# This is always an O(1)-time operation.
def isNonAttackingPlacement(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals):
    if col in blockedColumns:
        return False
    if row + col in blockedUpDiagonals:
        return False
    if row - col in blockedDownDiagonals:
        return False

    return True


def placeQueen(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals):
    blockedColumns.add(col)
    blockedUpDiagonals.add(row + col)
    blockedDownDiagonals.add(row - col)


def removeQueen(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals):
    blockedColumns.remove(col)
    blockedUpDiagonals.remove(row + col)
    blockedDownDiagonals.remove(row - col)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = 4
        expected = 2
        actual = program.nonAttackingQueens(input)
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
  const input = 4;
  const expected = 2;
  const actual = program.nonAttackingQueens(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Lower Bound: O(n!) time | O(n) space - where n is the input number
export function nonAttackingQueens(n: number) {
  // Each index of `columnPlacements` represents a row of the chessboard,
  // and the value at each index is the column (on the relevant row) where
  // a queen is currently placed.
  const columnPlacements = new Array(n).fill(0);
  return getNumberOfNonAttackingQueenPlacements(0, columnPlacements, n);
}

function getNumberOfNonAttackingQueenPlacements(row: number, columnPlacements: number[], boardSize: number) {
  if (row === boardSize) return 1;

  let validPlacements = 0;
  for (let col = 0; col < boardSize; col++) {
    if (isNonAttackingPlacement(row, col, columnPlacements)) {
      columnPlacements[row] = col;
      validPlacements += getNumberOfNonAttackingQueenPlacements(row + 1, columnPlacements, boardSize);
    }
  }

  return validPlacements;
}

// As `row` tends to `n`, this becomes an O(n)-time operation.
function isNonAttackingPlacement(row: number, col: number, columnPlacements: number[]) {
  for (let previousRow = 0; previousRow < row; previousRow++) {
    const columnToCheck = columnPlacements[previousRow];
    const sameColumn = columnToCheck === col;
    const onDiagonal = Math.abs(columnToCheck - col) === row - previousRow;
    if (sameColumn || onDiagonal) return false;
  }

  return true;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// Upper Bound: O(n!) time | O(n) space - where n is the input number
export function nonAttackingQueens(n: number) {
  const blockedColumns = new Set<number>();
  const blockedUpDiagonals = new Set<number>();
  const blockedDownDiagonals = new Set<number>();
  return getNumberOfNonAttackingQueenPlacements(0, blockedColumns, blockedUpDiagonals, blockedDownDiagonals, n);
}

function getNumberOfNonAttackingQueenPlacements(
  row: number,
  blockedColumns: Set<number>,
  blockedUpDiagonals: Set<number>,
  blockedDownDiagonals: Set<number>,
  boardSize: number,
) {
  if (row === boardSize) return 1;

  let validPlacements = 0;
  for (let col = 0; col < boardSize; col++) {
    if (isNonAttackingPlacement(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals)) {
      placeQueen(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals);
      validPlacements += getNumberOfNonAttackingQueenPlacements(
        row + 1,
        blockedColumns,
        blockedUpDiagonals,
        blockedDownDiagonals,
        boardSize,
      );
      removeQueen(row, col, blockedColumns, blockedUpDiagonals, blockedDownDiagonals);
    }
  }

  return validPlacements;
}

// This is always an O(1)-time operation.
function isNonAttackingPlacement(
  row: number,
  col: number,
  blockedColumns: Set<number>,
  blockedUpDiagonals: Set<number>,
  blockedDownDiagonals: Set<number>,
) {
  if (blockedColumns.has(col)) return false;
  if (blockedUpDiagonals.has(row + col)) return false;
  if (blockedDownDiagonals.has(row - col)) return false;

  return true;
}

function placeQueen(
  row: number,
  col: number,
  blockedColumns: Set<number>,
  blockedUpDiagonals: Set<number>,
  blockedDownDiagonals: Set<number>,
) {
  blockedColumns.add(col);
  blockedUpDiagonals.add(row + col);
  blockedDownDiagonals.add(row - col);
}

function removeQueen(
  row: number,
  col: number,
  blockedColumns: Set<number>,
  blockedUpDiagonals: Set<number>,
  blockedDownDiagonals: Set<number>,
) {
  blockedColumns.delete(col);
  blockedUpDiagonals.delete(row + col);
  blockedDownDiagonals.delete(row - col);
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = 4;
  const expected = 2;
  const actual = program.nonAttackingQueens(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

