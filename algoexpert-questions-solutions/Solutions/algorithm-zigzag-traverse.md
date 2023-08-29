# Zigzag Traverse
<div class="html">
<p>
  Write a function that takes in an n x m two-dimensional array (that can be
  square-shaped when n == m) and returns a one-dimensional array of all the
  array's elements in zigzag order.
</p>
<p>
  Zigzag order starts at the top left corner of the two-dimensional array, goes
  down by one element, and proceeds in a zigzag pattern all the way to the
  bottom right corner.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [
  [1,  3,  4, 10],
  [2,  5,  9, 11],
  [6,  8, 12, 15],
  [7, 13, 14, 16],
]
</pre>
<h3>Sample Output</h3>
<pre>
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
</pre>
</div>

Hint 1
<p>
Don't overthink this question by trying to come up with a clever way of getting the zigzag order. Think about the simplest checks that need to be made to decide when and how to change direction throughout the zigzag traversal.
</p>


Hint 2

<p>
Starting at the top left corner, iterate through the two-dimensional array by keeping track of the direction that you're moving in (up or down). If you're moving up, you know that you need to move in an up-right pattern and that you need to handle the case where you hit the top or the right borders of the array. If you're moving down, you know that you need to move in a down-left pattern and that you need to handle the case where you hit the left or the bottom borders of the array.
</p>


Hint 3

<p>
When going up, if you hit the right border, you'll have to go down one element; if you hit the top border, you'll have to go right one element. Similarly, when going down, if you hit the left border, you'll have to go down one element; if you hit the bottom border, you'll have to go right one element.
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
      vector<vector<int>> test = {
          {1, 3, 4, 10}, {2, 5, 9, 11}, {6, 8, 12, 15}, {7, 13, 14, 16}};
      vector<int> expected = {1, 2,  3,  4,  5,  6,  7,  8,
                              9, 10, 11, 12, 13, 14, 15, 16};
      assert(zigzagTraverse(test) == expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>

using namespace std;

bool isOutOfBounds(int row, int col, int height, int width);

// O(n) time | O(n) space - where n is the total number of elements in the
// two-dimensional array
vector<int> zigzagTraverse(vector<vector<int>> array) {
  int height = array.size() - 1;
  int width = array[0].size() - 1;
  vector<int> result = {};
  int row = 0;
  int col = 0;
  bool goingDown = true;
  while (!isOutOfBounds(row, col, height, width)) {
    result.push_back(array[row][col]);
    if (goingDown) {
      if (col == 0 || row == height) {
        goingDown = false;
        if (row == height) {
          col++;
        } else {
          row++;
        }
      } else {
        row++;
        col--;
      }
    } else {
      if (row == 0 || col == width) {
        goingDown = true;
        if (col == width) {
          row++;
        } else {
          col++;
        }
      } else {
        row--;
        col++;
      }
    }
  }
  return result;
}

bool isOutOfBounds(int row, int col, int height, int width) {
  return row < 0 || row > height || col < 0 || col > width;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> test = {
          {1, 3, 4, 10}, {2, 5, 9, 11}, {6, 8, 12, 15}, {7, 13, 14, 16}};
      vector<int> expected = {1, 2,  3,  4,  5,  6,  7,  8,
                              9, 10, 11, 12, 13, 14, 15, 16};
      assert(zigzagTraverse(test) == expected);
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
		List<List<int> > test = new List<List<int> >();
		test.Add(new List<int>(){
			1, 3, 4, 10
		});
		test.Add(new List<int>(){
			2, 5, 9, 11
		});
		test.Add(new List<int>(){
			6, 8, 12, 15
		});
		test.Add(new List<int>(){
			7, 13, 14, 16
		});
		List<int> expected = new List<int>(){
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
		};
		Utils.AssertTrue(Program.ZigzagTraverse(test).SequenceEqual(expected));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

// O(n) time | O(n) space - where n is the total number of elements in the two-dimensional array
public class Program {
	public static List<int> ZigzagTraverse(List<List<int> > array) {
		int height = array.Count - 1;
		int width = array[0].Count - 1;
		List<int> result = new List<int>();
		int row = 0;
		int col = 0;
		bool goingDown = true;
		while (!isOutOfBounds(row, col, height, width)) {
			result.Add(array[row][col]);
			if (goingDown) {
				if (col == 0 || row == height) {
					goingDown = false;
					if (row == height) {
						col++;
					} else {
						row++;
					}
				} else {
					row++;
					col--;
				}
			} else {
				if (row == 0 || col == width) {
					goingDown = true;
					if (col == width) {
						row++;
					} else {
						col++;
					}
				} else {
					row--;
					col++;
				}
			}
		}
		return result;
	}

	public static bool isOutOfBounds(int row, int col, int height, int width) {
		return row < 0 || row > height || col < 0 || col > width;
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
		List<List<int> > test = new List<List<int> >();
		test.Add(new List<int>(){
			1, 3, 4, 10
		});
		test.Add(new List<int>(){
			2, 5, 9, 11
		});
		test.Add(new List<int>(){
			6, 8, 12, 15
		});
		test.Add(new List<int>(){
			7, 13, 14, 16
		});
		List<int> expected = new List<int>(){
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
		};
		Utils.AssertTrue(Program.ZigzagTraverse(test).SequenceEqual(expected));
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
		{1, 3, 4, 10},
		{2, 5, 9, 11},
		{6, 8, 12, 15},
		{7, 13, 14, 16},
	}
	expected := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16}
	output := ZigzagTraverse(input)
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space - where n is the total number of elements in the two-dimensional array
func ZigzagTraverse(array [][]int) []int {
	if len(array) == 0 {
		return []int{}
	}

	height := len(array) - 1
	width := len(array[0]) - 1
	result := []int{}
	row := 0
	col := 0
	goingDown := true
	for !isOutOfBounds(row, col, height, width) {
		result = append(result, array[row][col])
		if goingDown {
			if col == 0 || row == height {
				goingDown = false
				if row == height {
					col++
				} else {
					row++
				}
			} else {
				row++
				col--
			}
		} else {
			if row == 0 || col == width {
				goingDown = true
				if col == width {
					row++
				} else {
					col++
				}
			} else {
				row--
				col++
			}
		}
	}
	return result
}

func isOutOfBounds(row, col, height, width int) bool {
	return row < 0 || row > height || col < 0 || col > width
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
		{1, 3, 4, 10},
		{2, 5, 9, 11},
		{6, 8, 12, 15},
		{7, 13, 14, 16},
	}
	expected := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16}
	output := ZigzagTraverse(input)
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
    List<List<Integer>> test = new ArrayList<List<Integer>>();
    test.add(new ArrayList<Integer>(Arrays.asList(1, 3, 4, 10)));
    test.add(new ArrayList<Integer>(Arrays.asList(2, 5, 9, 11)));
    test.add(new ArrayList<Integer>(Arrays.asList(6, 8, 12, 15)));
    test.add(new ArrayList<Integer>(Arrays.asList(7, 13, 14, 16)));
    List<Integer> expected =
        new ArrayList<Integer>(
            Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16));
    Utils.assertTrue(Program.zigzagTraverse(test).equals(expected));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

// O(n) time | O(n) space - where n is the total number of elements in the two-dimensional array
class Program {
  public static List<Integer> zigzagTraverse(List<List<Integer>> array) {
    int height = array.size() - 1;
    int width = array.get(0).size() - 1;
    List<Integer> result = new ArrayList<Integer>();
    int row = 0;
    int col = 0;
    boolean goingDown = true;
    while (!isOutOfBounds(row, col, height, width)) {
      result.add(array.get(row).get(col));
      if (goingDown) {
        if (col == 0 || row == height) {
          goingDown = false;
          if (row == height) {
            col++;
          } else {
            row++;
          }
        } else {
          row++;
          col--;
        }
      } else {
        if (row == 0 || col == width) {
          goingDown = true;
          if (col == width) {
            row++;
          } else {
            col++;
          }
        } else {
          row--;
          col++;
        }
      }
    }
    return result;
  }

  public static boolean isOutOfBounds(int row, int col, int height, int width) {
    return row < 0 || row > height || col < 0 || col > width;
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
    test.add(new ArrayList<Integer>(Arrays.asList(1, 3, 4, 10)));
    test.add(new ArrayList<Integer>(Arrays.asList(2, 5, 9, 11)));
    test.add(new ArrayList<Integer>(Arrays.asList(6, 8, 12, 15)));
    test.add(new ArrayList<Integer>(Arrays.asList(7, 13, 14, 16)));
    List<Integer> expected =
        new ArrayList<Integer>(
            Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16));
    Utils.assertTrue(Program.zigzagTraverse(test).equals(expected));
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
  const test = [
    [1, 3, 4, 10],
    [2, 5, 9, 11],
    [6, 8, 12, 15],
    [7, 13, 14, 16],
  ];
  chai.expect(program.zigzagTraverse(test)).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the total number of elements in the two-dimensional array
function zigzagTraverse(array) {
  const height = array.length - 1;
  const width = array[0].length - 1;
  const result = [];
  let row = 0;
  let col = 0;
  let goingDown = true;
  while (!isOutOfBounds(row, col, height, width)) {
    result.push(array[row][col]);
    if (goingDown) {
      if (col === 0 || row === height) {
        goingDown = false;
        if (row === height) {
          col++;
        } else {
          row++;
        }
      } else {
        row++;
        col--;
      }
    } else {
      if (row === 0 || col === width) {
        goingDown = true;
        if (col === width) {
          row++;
        } else {
          col++;
        }
      } else {
        row--;
        col++;
      }
    }
  }
  return result;
}

function isOutOfBounds(row, col, height, width) {
  return row < 0 || row > height || col < 0 || col > width;
}

exports.zigzagTraverse = zigzagTraverse;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const test = [
    [1, 3, 4, 10],
    [2, 5, 9, 11],
    [6, 8, 12, 15],
    [7, 13, 14, 16],
  ];
  chai.expect(program.zigzagTraverse(test)).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.zigzagTraverse as zigzagTraverse

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = listOf(
            listOf(1, 3, 4, 10),
            listOf(2, 5, 9, 11),
            listOf(6, 8, 12, 15),
            listOf(7, 13, 14, 16)
        )
        val output = zigzagTraverse(array)
        val expected = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
        assert(output.equals(expected))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(n) space - where n is the total number of elements in the two-dimensional array
fun zigzagTraverse(array: List<List<Int>>): List<Int> {
    val height = array.size - 1
    val width = array[0].size - 1
    val result = mutableListOf<Int>()
    var row = 0
    var col = 0
    var goingDown = true
    while (!isOutOfBounds(row, col, height, width)) {
        result.add(array[row][col])
        if (goingDown) {
            if (col == 0 || row == height) {
                goingDown = false
                if (row == height) {
                    col++
                } else {
                    row++
                }
            } else {
                row++
                col--
            }
        } else {
            if (row == 0 || col == width) {
                goingDown = true
                if (col == width) {
                    row++
                } else {
                    col++
                }
            } else {
                row--
                col++
            }
        }
    }
    return result
}

fun isOutOfBounds(row: Int, col: Int, height: Int, width: Int): Boolean {
    return row < 0 || row > height || col < 0 || col > width
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.zigzagTraverse as zigzagTraverse

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = listOf(
            listOf(1, 3, 4, 10),
            listOf(2, 5, 9, 11),
            listOf(6, 8, 12, 15),
            listOf(7, 13, 14, 16)
        )
        val output = zigzagTraverse(array)
        val expected = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
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
      let test = [
        [1, 3, 4, 10],
        [2, 5, 9, 11],
        [6, 8, 12, 15],
        [7, 13, 14, 16],
      ]
      try assertEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], program.zigZagTraverse(array: test))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space
  func zigZagTraverse(array: [[Int]]) -> [Int] {
    var result = [Int]()

    var goingDown = true
    var currentRow = 0
    var currentColumn = 0

    while currentRow < array.count, currentColumn < array[0].count {
      result.append(array[currentRow][currentColumn])

      if goingDown {
        if currentColumn == 0 || currentRow == array.count - 1 {
          goingDown = false
          if currentRow == array.count - 1 {
            currentColumn += 1
          } else {
            currentRow += 1
          }
        } else {
          currentRow += 1
          currentColumn -= 1
        }
      } else {
        if currentRow == 0 || currentColumn == array[0].count - 1 {
          goingDown = true
          if currentColumn == array[0].count - 1 {
            currentRow += 1
          } else {
            currentColumn += 1
          }
        } else {
          currentRow -= 1
          currentColumn += 1
        }
      }
    }

    return result
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let test = [
        [1, 3, 4, 10],
        [2, 5, 9, 11],
        [6, 8, 12, 15],
        [7, 13, 14, 16],
      ]
      try assertEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], program.zigZagTraverse(array: test))
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
        test = [[1, 3, 4, 10], [2, 5, 9, 11], [6, 8, 12, 15], [7, 13, 14, 16]]
        self.assertEqual(program.zigzagTraverse(test), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the total number of elements in the two-dimensional array
def zigzagTraverse(array):
    height = len(array) - 1
    width = len(array[0]) - 1
    result = []
    row, col = 0, 0
    goingDown = True
    while not isOutOfBounds(row, col, height, width):
        result.append(array[row][col])
        if goingDown:
            if col == 0 or row == height:
                goingDown = False
                if row == height:
                    col += 1
                else:
                    row += 1
            else:
                row += 1
                col -= 1
        else:
            if row == 0 or col == width:
                goingDown = True
                if col == width:
                    row += 1
                else:
                    col += 1
            else:
                row -= 1
                col += 1
    return result


def isOutOfBounds(row, col, height, width):
    return row < 0 or row > height or col < 0 or col > width

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        test = [[1, 3, 4, 10], [2, 5, 9, 11], [6, 8, 12, 15], [7, 13, 14, 16]]
        self.assertEqual(program.zigzagTraverse(test), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const test = [
    [1, 3, 4, 10],
    [2, 5, 9, 11],
    [6, 8, 12, 15],
    [7, 13, 14, 16],
  ];
  chai.expect(program.zigzagTraverse(test)).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the total number of elements in the two-dimensional array
export function zigzagTraverse(array: number[][]) {
  const height = array.length - 1;
  const width = array[0].length - 1;
  const result = [];
  let row = 0;
  let col = 0;
  let goingDown = true;
  while (!isOutOfBounds(row, col, height, width)) {
    result.push(array[row][col]);
    if (goingDown) {
      if (col === 0 || row === height) {
        goingDown = false;
        if (row === height) {
          col++;
        } else {
          row++;
        }
      } else {
        row++;
        col--;
      }
    } else {
      if (row === 0 || col === width) {
        goingDown = true;
        if (col === width) {
          row++;
        } else {
          col++;
        }
      } else {
        row--;
        col++;
      }
    }
  }
  return result;
}

function isOutOfBounds(row: number, col: number, height: number, width: number) {
  return row < 0 || row > height || col < 0 || col > width;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const test = [
    [1, 3, 4, 10],
    [2, 5, 9, 11],
    [6, 8, 12, 15],
    [7, 13, 14, 16],
  ];
  chai.expect(program.zigzagTraverse(test)).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
});

```

