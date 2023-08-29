# Rectangle Mania
<div class="html">
<p>
  Write a function that takes in a list of Cartesian coordinates (i.e., (x, y)
  coordinates) and returns the number of rectangles formed by these coordinates.
</p>
<p>
  A rectangle must have its four corners amongst the coordinates in order to be
  counted, and we only care about rectangles with sides parallel to the x and y
  axes (i.e., with horizontal and vertical sides--no diagonal sides).
</p>
<p>
  You can also assume that no coordinate will be farther than 100 units from the
  origin.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">coords</span> = [
  [0, 0], [0, 1], [1, 1], [1, 0],
  [2, 1], [2, 0], [3, 1], [3, 0],
]
</pre>
<h3>Sample Output</h3>
<pre>
6
</pre>
</div>

Hint 1
<p>
Try treating every coordinate as the potential lower left corner of a rectangle. What conditions would need to be met in order to actually have a rectangle with any given coordinate as its lower left corner?
</p>


Hint 2

<p>
Following Hint #1, if you treat every coordinate as the potential lower left corner of a rectangle, you can move in a clockwise pattern (i.e., directly up, then directly right, then directly down, and finally directly left) to try to find a rectangle. There are a few ways to do this, one of which involves storing, for every coordinate, all other coordinates that are directly above it, directly to the right of it, directly below it, and directly to the left of it. With this information, you can iterate through all of the coordinates and then traverse through potential rectangles in an up-right-down-left pattern.
</p>


Hint 3

<p>
Following Hint #2, do you actually need to store all of the coordinates above, to the right, below, and to the left of every coordinate?
</p>


Hint 4

<p>
Another, perhaps more clever way of solving this problem is to realize that, for any coordinate to be a valid lower left corner of a rectangle, there must be a corresponding upper right corner of the same rectangle, which is just another coordinate located to the upper right of the first coordinate. If you have two such coordinates, you should be able to easily find whether corresponding upper left and lower right corners exist.
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
      vector<vector<int>> coords = {{0, 0}, {0, 1}, {1, 1},
                              {1, 0}, {2, 1}, {2, 0},
                              {3, 1}, {3, 0}};
      assert(rectangleMania(coords) == 6);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

string UP = "up";
string RIGHT = "right";
string DOWN = "down";
string LEFT = "left";

unordered_map<string, unordered_map<string, vector<vector<int>>>>
getCoordsTable(vector<vector<int>> coords);
string getCoordDirection(vector<int> coord1, vector<int> coord2);
int getRectangleCount(
    vector<vector<int>> coords,
    unordered_map<string, unordered_map<string, vector<vector<int>>>> coordsTable);
int clockwiseCountRectangles(
    vector<int> coord,
    unordered_map<string, unordered_map<string, vector<vector<int>>>> coordsTable,
    string direction, vector<int> origin);
string getNextClockwiseDirection(string direction);
string coordToString(vector<int> coord);

// O(n^2) time | O(n^2) space - where n is the number of coordinates
int rectangleMania(vector<vector<int>> coords) {
  unordered_map<string, unordered_map<string, vector<vector<int>>>> coordsTable =
      getCoordsTable(coords);
  return getRectangleCount(coords, coordsTable);
}

unordered_map<string, unordered_map<string, vector<vector<int>>>>
getCoordsTable(vector<vector<int>> coords) {
  unordered_map<string, unordered_map<string, vector<vector<int>>>> coordsTable;
  for (vector<int> coord1 : coords) {
    unordered_map<string, vector<vector<int>>> coord1Directions({
        {UP, vector<vector<int>>{}},
        {RIGHT, vector<vector<int>>{}},
        {DOWN, vector<vector<int>>{}},
        {LEFT, vector<vector<int>>{}},
    });
    for (vector<int> coord2 : coords) {
      string coord2Direction = getCoordDirection(coord1, coord2);
      if (coord1Directions.find(coord2Direction) != coord1Directions.end()) {
        coord1Directions[coord2Direction].push_back(coord2);
      }
    }
    string coord1String = coordToString(coord1);
    coordsTable.insert({coord1String, coord1Directions});
  }
  return coordsTable;
}

string getCoordDirection(vector<int> coord1, vector<int> coord2) {
  int x1 = coord1[0];
  int y1 = coord1[1];
  int x2 = coord2[0];
  int y2 = coord2[1];

  if (y2 == y1) {
    if (x2 > x1) {
      return RIGHT;
    } else if (x2 < x1) {
      return LEFT;
    }
  } else if (x2 == x1) {
    if (y2 > y1) {
      return UP;
    } else if (y2 < y1) {
      return DOWN;
    }
  }
  return "";
}

int getRectangleCount(
    vector<vector<int>> coords,
    unordered_map<string, unordered_map<string, vector<vector<int>>>> coordsTable) {
  int rectangleCount = 0;
  for (vector<int> coord : coords) {
    rectangleCount += clockwiseCountRectangles(coord, coordsTable, UP, coord);
  }
  return rectangleCount;
}

int clockwiseCountRectangles(
    vector<int> coord,
    unordered_map<string, unordered_map<string, vector<vector<int>>>> coordsTable,
    string direction, vector<int> origin) {
  string coordString = coordToString(coord);
  if (direction == LEFT) {
    bool rectangleFound = find(coordsTable[coordString][LEFT].begin(),
                               coordsTable[coordString][LEFT].end(),
                               origin) != coordsTable[coordString][LEFT].end();
    return rectangleFound ? 1 : 0;
  } else {
    int rectangleCount = 0;
    string nextDirection = getNextClockwiseDirection(direction);
    for (vector<int> nextCoord : coordsTable[coordString][direction]) {
      rectangleCount += clockwiseCountRectangles(nextCoord, coordsTable,
                                                 nextDirection, origin);
    }
    return rectangleCount;
  }
}

string getNextClockwiseDirection(string direction) {
  if (direction == UP)
    return RIGHT;
  if (direction == RIGHT)
    return DOWN;
  if (direction == DOWN)
    return LEFT;
  return "";
}

string coordToString(vector<int> coord) {
  return to_string(coord[0]) + "-" + to_string(coord[1]);
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <unordered_map>
using namespace std;

string UP = "up";
string RIGHT = "right";
string DOWN = "down";

unordered_map<string, unordered_map<int, vector<vector<int>>>>
getCoordsTable(vector<vector<int>> coords);
int getRectangleCount(
    vector<vector<int>> coords,
    unordered_map<string, unordered_map<int, vector<vector<int>>>> coordsTable);
int clockwiseCountRectangles(
    vector<int> coord1,
    unordered_map<string, unordered_map<int, vector<vector<int>>>> coordsTable,
    string direction, int lowerLeftY);

// O(n^2) time | O(n) space - where n is the number of coordinates
int rectangleMania(vector<vector<int>> coords) {
  unordered_map<string, unordered_map<int, vector<vector<int>>>> coordsTable =
      getCoordsTable(coords);
  return getRectangleCount(coords, coordsTable);
}

unordered_map<string, unordered_map<int, vector<vector<int>>>>
getCoordsTable(vector<vector<int>> coords) {
  unordered_map<string, unordered_map<int, vector<vector<int>>>> coordsTable;
  coordsTable.insert({"x", unordered_map<int, vector<vector<int>>>{}});
  coordsTable.insert({"y", unordered_map<int, vector<vector<int>>>{}});
  for (vector<int> coord : coords) {
    if (coordsTable["x"].find(coord[0]) == coordsTable["x"].end()) {
      coordsTable["x"].insert({coord[0], vector<vector<int>>{}});
    }
    if (coordsTable["y"].find(coord[1]) == coordsTable["y"].end()) {
      coordsTable["y"].insert({coord[1], vector<vector<int>>{}});
    }
    coordsTable["x"][coord[0]].push_back(coord);
    coordsTable["y"][coord[1]].push_back(coord);
  }
  return coordsTable;
}

int getRectangleCount(
    vector<vector<int>> coords,
    unordered_map<string, unordered_map<int, vector<vector<int>>>> coordsTable) {
  int rectangleCount = 0;
  for (vector<int> coord : coords) {
    int lowerLeftY = coord[1];
    rectangleCount +=
        clockwiseCountRectangles(coord, coordsTable, UP, lowerLeftY);
  }
  return rectangleCount;
}

int clockwiseCountRectangles(
    vector<int> coord1,
    unordered_map<string, unordered_map<int, vector<vector<int>>>> coordsTable,
    string direction, int lowerLeftY) {
  if (direction == DOWN) {
    vector<vector<int>> relevantCoords = coordsTable["x"][coord1[0]];
    for (vector<int> coord2 : relevantCoords) {
      int lowerRightY = coord2[1];
      if (lowerRightY == lowerLeftY)
        return 1;
    }
    return 0;
  } else {
    int rectangleCount = 0;
    if (direction == UP) {
      vector<vector<int>> relevantCoords = coordsTable["x"][coord1[0]];
      for (vector<int> coord2 : relevantCoords) {
        bool isAbove = coord2[1] > coord1[1];
        if (isAbove)
          rectangleCount +=
              clockwiseCountRectangles(coord2, coordsTable, RIGHT, lowerLeftY);
      }
    } else if (direction == RIGHT) {
      vector<vector<int>> relevantCoords = coordsTable["y"][coord1[1]];
      for (vector<int> coord2 : relevantCoords) {
        bool isRight = coord2[0] > coord1[0];
        if (isRight)
          rectangleCount +=
              clockwiseCountRectangles(coord2, coordsTable, DOWN, lowerLeftY);
      }
    }
    return rectangleCount;
  }
}

```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <unordered_map>
using namespace std;

unordered_map<string, bool> getCoordsTable(vector<vector<int>> coords);
int getRectangleCount(vector<vector<int>> coords,
                      unordered_map<string, bool> coordsTable);
bool isInUpperRight(vector<int> coord1, vector<int> coord2);
string coordToString(vector<int> coord);

// O(n^2) time | O(n) space - where n is the number of coordinates
int rectangleMania(vector<vector<int>> coords) {
  unordered_map<string, bool> coordsTable = getCoordsTable(coords);
  return getRectangleCount(coords, coordsTable);
}

unordered_map<string, bool> getCoordsTable(vector<vector<int>> coords) {
  unordered_map<string, bool> coordsTable;
  for (vector<int> coord : coords) {
    string coordString = coordToString(coord);
    coordsTable.insert({coordString, true});
  }
  return coordsTable;
}

int getRectangleCount(vector<vector<int>> coords,
                      unordered_map<string, bool> coordsTable) {
  int rectangleCount = 0;
  for (vector<int> coord1 : coords) {
    for (vector<int> coord2 : coords) {
      if (!isInUpperRight(coord1, coord2))
        continue;
      string upperCoordString = coordToString(vector<int>({coord1[0], coord2[1]}));
      string rightCoordString = coordToString(vector<int>({coord2[0], coord1[1]}));
      if (coordsTable.find(upperCoordString) != coordsTable.end() &&
          coordsTable.find(rightCoordString) != coordsTable.end())
        rectangleCount++;
    }
  }
  return rectangleCount;
}

bool isInUpperRight(vector<int> coord1, vector<int> coord2) {
  return coord2[0] > coord1[0] && coord2[1] > coord1[1];
}

string coordToString(vector<int> coord) {
  return to_string(coord[0]) + "-" + to_string(coord[1]);
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> coords = {{0, 0}, {0, 1}, {1, 1},
                              {1, 0}, {2, 1}, {2, 0},
                              {3, 1}, {3, 0}};
      assert(rectangleMania(coords) == 6);
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
using System;


public class ProgramTest {
  [Test]
  public void TestCase1() {
    List<int[]> coords =
        new List<int[]>{
          new int[]{0, 0},
          new int[]{0, 1},
          new int[]{1, 1},
          new int[]{1, 0},
          new int[]{2, 1},
          new int[]{2, 0},
          new int[]{3, 1},
          new int[]{3, 0}
        };
    Utils.AssertTrue(Program.RectangleMania(coords) == 6);
  }
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {
  static string UP = "up";
  static string RIGHT = "right";
  static string DOWN = "down";
  static string LEFT = "left";

  // O(n^2) time | O(n^2) space - where n is the number of coordinates
  public static int RectangleMania(List<int[]> coords) {
    Dictionary<string, Dictionary<string, List<int[]>>> coordsTable = getCoordsTable(coords);
    return getRectangleCount(coords, coordsTable);
  }

  public static Dictionary<string, Dictionary<string, List<int[]>>> getCoordsTable(List<int[]> coords) {
    Dictionary<string, Dictionary<string, List<int[]>>> coordsTable =
        new Dictionary<string, Dictionary<string, List<int[]>>>();
    foreach (var coord1 in coords) {
      Dictionary<string, List<int[]>> coord1Directions = new Dictionary<string, List<int[]>>();
      coord1Directions[UP] = new List<int[]>();
      coord1Directions[RIGHT] = new List<int[]>();
      coord1Directions[DOWN] = new List<int[]>();
      coord1Directions[LEFT] = new List<int[]>();
      foreach (var coord2 in coords) {
        string coord2Direction = getCoordDirection(coord1, coord2);
        if (coord1Directions.ContainsKey(coord2Direction))
          coord1Directions[coord2Direction].Add(coord2);
      }
      string coord1string = coordTostring(coord1);
      coordsTable[coord1string] = coord1Directions;
    }
    return coordsTable;
  }

  public static string getCoordDirection(int[] coord1, int[] coord2) {
    if (coord2[1] == coord1[1]) {
      if (coord2[0] > coord1[0]) {
        return RIGHT;
      } else if (coord2[0] < coord1[0]) {
        return LEFT;
      }
    } else if (coord2[0] == coord1[0]) {
      if (coord2[1] > coord1[1]) {
        return UP;
      } else if (coord2[1] < coord1[1]) {
        return DOWN;
      }
    }
    return "";
  }

  public static int getRectangleCount(
      List<int[]> coords, Dictionary<string, Dictionary<string, List<int[]>>> coordsTable) {
    int rectangleCount = 0;
    foreach (var coord in coords) {
      rectangleCount += clockwiseCountRectangles(coord, coordsTable, UP, coord);
    }
    return rectangleCount;
  }

  public static int clockwiseCountRectangles(
      int[] coord,
      Dictionary<string, Dictionary<string, List<int[]>>> coordsTable,
      string direction,
      int[] origin) {
    string coordstring = coordTostring(coord);
    if (direction == LEFT) {
      bool rectangleFound = coordsTable[coordstring][LEFT].Contains(origin);
      return rectangleFound ? 1 : 0;
    } else {
      int rectangleCount = 0;
      string nextDirection = getNextClockwiseDirection(direction);
      foreach (var nextCoord in coordsTable[coordstring][direction]) {
        rectangleCount += clockwiseCountRectangles(nextCoord, coordsTable, nextDirection, origin);
      }
      return rectangleCount;
    }
  }

  public static string getNextClockwiseDirection(string direction) {
    if (direction == UP) return RIGHT;
    if (direction == RIGHT) return DOWN;
    if (direction == DOWN) return LEFT;
    return "";
  }

  public static string coordTostring(int[] coord) {
    return coord[0].ToString() + "-" + coord[1].ToString();
  }
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	static string UP = "up";
	static string RIGHT = "right";
	static string DOWN = "down";


	// O(n^2) time | O(n) space - where n is the number of coordinates
	public static int RectangleMania(List<int[]> coords) {
		Dictionary<string, Dictionary<int, List<int[]> > > coordsTable = getCoordsTable(
			coords);
		return getRectangleCount(coords, coordsTable);
	}

	public static Dictionary<string, Dictionary<int, List<int[]> > > getCoordsTable(
		List<int[]> coords) {
		Dictionary<string, Dictionary<int,
		  List<int[]> > > coordsTable = new Dictionary<string,
		    Dictionary<int,
		    List<int[]> > >();
		coordsTable.Add("x", new Dictionary<int, List<int[]> >());
		coordsTable.Add("y", new Dictionary<int, List<int[]> >());
		foreach (int[] coord in coords) {
			if (!coordsTable["x"].ContainsKey(coord[0])) {
				coordsTable["x"].Add(coord[0], new List<int[]>());
			}
			if (!coordsTable["y"].ContainsKey(coord[1])) {
				coordsTable["y"].Add(coord[1], new List<int[]>());
			}
			coordsTable["x"][coord[0]].Add(coord);
			coordsTable["y"][coord[1]].Add(coord);
		}
		return coordsTable;
	}

	public static int getRectangleCount(List<int[]> coords, Dictionary<string, Dictionary<int,
	  List<int[]> > > coordsTable)
	{
		int rectangleCount = 0;
		foreach (int[] coord in coords) {
			int lowerLeftY = coord[1];
			rectangleCount += clockwiseCountRectangles(coord, coordsTable, UP,
			    lowerLeftY);
		}
		return rectangleCount;
	}

	public static int clockwiseCountRectangles(
		int[] coord1,
		Dictionary<string, Dictionary<int, List<int[]> > > coordsTable,
		string direction,
		int lowerLeftY
		) {
		if (direction == DOWN) {
			List<int[]> relevantCoords = coordsTable["x"][coord1[0]];
			foreach (int[] coord2 in relevantCoords) {
				int lowerRightY = coord2[1];
				if (lowerRightY == lowerLeftY) return 1;
			}
			return 0;
		} else {
			int rectangleCount = 0;
			if (direction == UP) {
				List<int[]> relevantCoords = coordsTable["x"][coord1[0]];
				foreach (int[] coord2 in relevantCoords) {
					bool isAbove = coord2[1] > coord1[1];
					if (isAbove) rectangleCount += clockwiseCountRectangles(
							coord2, coordsTable, RIGHT, lowerLeftY);
				}
			} else if (direction == RIGHT) {
				List<int[]> relevantCoords = coordsTable["y"][coord1[1]];
				foreach (int[] coord2 in relevantCoords) {
					bool isRight = coord2[0] > coord1[0];
					if (isRight) rectangleCount += clockwiseCountRectangles(
							coord2, coordsTable, DOWN, lowerLeftY);
				}
			}
			return rectangleCount;
		}
	}
}

```
### Solution 3 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System.Linq;
using System;


public class Program {
  // O(n^2) time | O(n) space - where n is the number of coordinates
  public static int RectangleMania(List<int[]> coords) {
    HashSet<string> coordsTable = getCoordsTable(coords);
    return getRectangleCount(coords, coordsTable);
  }

  public static HashSet<string> getCoordsTable(List<int[]> coords) {
    HashSet<string> coordsTable = new HashSet<string>();
    foreach (var coord in coords) {
      string coordstring = coordTostring(coord);
      coordsTable.Add(coordstring);
    }
    return coordsTable;
  }

  public static int getRectangleCount(List<int[]> coords, HashSet<string> coordsTable) {
    int rectangleCount = 0;
    foreach (var coord1 in coords) {
      foreach (var coord2 in coords) {
        if (!isInUpperRight(coord1, coord2)) continue;
        string upperCoordstring = coordTostring(new int[]{coord1[0], coord2[1]});
        string rightCoordstring = coordTostring(new int[]{coord2[0], coord1[1]});
        if (coordsTable.Contains(upperCoordstring) && coordsTable.Contains(rightCoordstring))
          rectangleCount++;
      }
    }
    return rectangleCount;
  }

  public static bool isInUpperRight(int[] coord1, int[] coord2) {
    return coord2[0] > coord1[0] && coord2[1] > coord1[1];
  }

  public static string coordTostring(int[] coord) {
    return coord[0].ToString() + "-" + coord[1].ToString();
  }
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;
using System;


public class ProgramTest {
  [Test]
  public void TestCase1() {
    List<int[]> coords =
        new List<int[]>{
          new int[]{0, 0},
          new int[]{0, 1},
          new int[]{1, 1},
          new int[]{1, 0},
          new int[]{2, 1},
          new int[]{2, 0},
          new int[]{3, 1},
          new int[]{3, 0}
        };
    Utils.AssertTrue(Program.RectangleMania(coords) == 6);
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
	coords := [][]int{{0, 0}, {0, 1}, {1, 1}, {1, 0}, {2, 1}, {2, 0}, {3, 1}, {3, 0}}
	require.Equal(t, RectangleMania(coords), 6)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "fmt"

type Direction int

const (
	None Direction = iota - 1
	Up
	Down
	Left
	Right
)

// O(n^2) time | O(n^2) space - where n is the number of coordinates
func RectangleMania(coords [][]int) int {
	coordsTable := getCoordsTable(coords)
	return getRectangleCount(coords, coordsTable)
}

type CoordsTable map[string]map[Direction][][]int

func getCoordsTable(coords [][]int) CoordsTable {
	table := CoordsTable{}
	for _, coord1 := range coords {
		directions := map[Direction][][]int{
			Up:    {},
			Right: {},
			Down:  {},
			Left:  {},
		}
		for _, coord2 := range coords {
			coord2Direction := getCoordDirection(coord1, coord2)
			if coord2Direction != None {
				directions[coord2Direction] = append(directions[coord2Direction], coord2)
			}
		}
		table[coordToString(coord1)] = directions
	}
	return table
}

func getCoordDirection(coord1, coord2 []int) Direction {
	if coord2[1] == coord1[1] {
		if coord2[0] > coord1[0] {
			return Right
		} else if coord2[0] < coord1[0] {
			return Left
		}
	} else if coord2[0] == coord1[0] {
		if coord2[1] > coord1[1] {
			return Up
		} else if coord2[1] < coord1[1] {
			return Down
		}
	}
	return None
}

func getRectangleCount(coords [][]int, coordsTable CoordsTable) int {
	count := 0
	for _, coord := range coords {
		count += clockwiseCountRectangles(coord, coordsTable, Up, coord)
	}
	return count
}

func clockwiseCountRectangles(coord []int, coordsTable CoordsTable, direction Direction, origin []int) int {
	if direction == Left {
		for _, element := range coordsTable[coordToString(coord)][Left] {
			if element[0] == origin[0] && element[1] == origin[1] {
				return 1
			}
		}
		return 0
	}
	rectangleCount := 0
	nextDirection := direction.NextClockwise()
	for _, nextCoord := range coordsTable[coordToString(coord)][direction] {
		rectangleCount += clockwiseCountRectangles(nextCoord, coordsTable, nextDirection, origin)
	}
	return rectangleCount
}

func (d Direction) NextClockwise() Direction {
	switch d {
	case Up:
		return Right
	case Right:
		return Down
	case Down:
		return Left
	case Left:
		return Up
	}
	return None
}

func coordToString(coord []int) string {
	return fmt.Sprintf("%d-%d", coord[0], coord[1])
}
```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type Direction int

const (
	None Direction = iota - 1
	Up
	Down
	Left
	Right
)

// O(n^2) time | O(n) space - where n is the number of coordinates
func RectangleMania(coords [][]int) int {
	coordsTable := getCoordsTable(coords)
	return getRectangleCount(coords, coordsTable)
}

type CoordsTable struct {
	Xs, Ys map[int][][]int
}

func getCoordsTable(coords [][]int) CoordsTable {
	table := CoordsTable{
		Xs: map[int][][]int{},
		Ys: map[int][][]int{},
	}
	for _, coord := range coords {
		x, y := coord[0], coord[1]
		table.Xs[x] = append(table.Xs[x], coord)
		table.Ys[y] = append(table.Ys[y], coord)
	}
	return table
}

func getRectangleCount(coords [][]int, coordsTable CoordsTable) int {
	count := 0
	for _, coord := range coords {
		lowerLeftY := coord[1]
		count += clockwiseCountRectangles(coord, coordsTable, Up, lowerLeftY)
	}
	return count
}

func clockwiseCountRectangles(coord []int, coordsTable CoordsTable, direction Direction, lowerLeftY int) int {
	if direction == Down {
		relevantCoords := coordsTable.Xs[coord[0]]
		for _, coord2 := range relevantCoords {
			lowerRightY := coord2[1]
			if lowerRightY == lowerLeftY {
				return 1
			}
		}
		return 0
	}

	if direction == Up {
		rectangleCount := 0
		relevantCoords := coordsTable.Xs[coord[0]]
		for _, coord2 := range relevantCoords {
			if coord2[1] > coord[1] {
				rectangleCount += clockwiseCountRectangles(coord2, coordsTable, Right, lowerLeftY)
			}
		}
		return rectangleCount
	}

	if direction == Right {
		rectangleCount := 0
		relevantCoords := coordsTable.Ys[coord[1]]
		for _, coord2 := range relevantCoords {
			if coord2[0] > coord[0] {
				rectangleCount += clockwiseCountRectangles(coord2, coordsTable, Down, lowerLeftY)
			}
		}
		return rectangleCount
	}
	return 0
}


```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "fmt"

type Direction int

const (
	None Direction = iota - 1
	Up
	Down
	Left
	Right
)

// O(n^2) time | O(n) space - where n is the number of coordinates
func RectangleMania(coords [][]int) int {
	coordsTable := getCoordsTable(coords)
	return getRectangleCount(coords, coordsTable)
}

type CoordsTable map[string]struct{}

func getCoordsTable(coords [][]int) CoordsTable {
	table := CoordsTable{}
	for _, coord := range coords {
		table[coordToString(coord)] = struct{}{}
	}
	return table
}

func getRectangleCount(coords [][]int, coordsTable CoordsTable) int {
	count := 0
	for _, coord1 := range coords {
		for _, coord2 := range coords {
			if !isInUpperRight(coord1, coord2) {
				continue
			}
			upperCoord := []int{coord1[0], coord2[1]}
			rightCoord := []int{coord2[0], coord1[1]}
			_, found1 := coordsTable[coordToString(upperCoord)]
			_, found2 := coordsTable[coordToString(rightCoord)]
			if found1 && found2 {
				count++
			}
		}
	}
	return count
}

func isInUpperRight(coord1, coord2 []int) bool {
	return coord2[0] > coord1[0] && coord2[1] > coord1[1]
}

func coordToString(coord []int) string {
	return fmt.Sprintf("%d-%d", coord[0], coord[1])
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	coords := [][]int{{0, 0}, {0, 1}, {1, 1}, {1, 0}, {2, 1}, {2, 0}, {3, 1}, {3, 0}}
	require.Equal(t, RectangleMania(coords), 6)
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
    List<Integer[]> coords =
        new ArrayList<Integer[]>(Arrays.asList(
          new Integer[]{0, 0},
          new Integer[]{0, 1},
          new Integer[]{1, 1},
          new Integer[]{1, 0},
          new Integer[]{2, 1},
          new Integer[]{2, 0},
          new Integer[]{3, 1},
          new Integer[]{3, 0}
        ));
    Utils.assertTrue(Program.rectangleMania(coords) == 6);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  static String UP = "up";
  static String RIGHT = "right";
  static String DOWN = "down";
  static String LEFT = "left";

  // O(n^2) time | O(n^2) space - where n is the number of coordinates
  public static int rectangleMania(List<Integer[]> coords) {
    Map<String, Map<String, List<Integer[]>>> coordsTable = getCoordsTable(coords);
    return getRectangleCount(coords, coordsTable);
  }

  public static Map<String, Map<String, List<Integer[]>>> getCoordsTable(List<Integer[]> coords) {
    Map<String, Map<String, List<Integer[]>>> coordsTable =
        new HashMap<String, Map<String, List<Integer[]>>>();
    for (Integer[] coord1 : coords) {
      Map<String, List<Integer[]>> coord1Directions = new HashMap<String, List<Integer[]>>();
      coord1Directions.put(UP, new ArrayList<Integer[]>());
      coord1Directions.put(RIGHT, new ArrayList<Integer[]>());
      coord1Directions.put(DOWN, new ArrayList<Integer[]>());
      coord1Directions.put(LEFT, new ArrayList<Integer[]>());
      for (Integer[] coord2 : coords) {
        String coord2Direction = getCoordDirection(coord1, coord2);
        if (coord1Directions.containsKey(coord2Direction))
          coord1Directions.get(coord2Direction).add(coord2);
      }
      String coord1String = coordToString(coord1);
      coordsTable.put(coord1String, coord1Directions);
    }
    return coordsTable;
  }

  public static String getCoordDirection(Integer[] coord1, Integer[] coord2) {
    if (coord2[1] == coord1[1]) {
      if (coord2[0] > coord1[0]) {
        return RIGHT;
      } else if (coord2[0] < coord1[0]) {
        return LEFT;
      }
    } else if (coord2[0] == coord1[0]) {
      if (coord2[1] > coord1[1]) {
        return UP;
      } else if (coord2[1] < coord1[1]) {
        return DOWN;
      }
    }
    return "";
  }

  public static int getRectangleCount(
      List<Integer[]> coords, Map<String, Map<String, List<Integer[]>>> coordsTable) {
    int rectangleCount = 0;
    for (Integer[] coord : coords) {
      rectangleCount += clockwiseCountRectangles(coord, coordsTable, UP, coord);
    }
    return rectangleCount;
  }

  public static int clockwiseCountRectangles(
      Integer[] coord,
      Map<String, Map<String, List<Integer[]>>> coordsTable,
      String direction,
      Integer[] origin) {
    String coordString = coordToString(coord);
    if (direction == LEFT) {
      boolean rectangleFound = coordsTable.get(coordString).get(LEFT).contains(origin);
      return rectangleFound ? 1 : 0;
    } else {
      int rectangleCount = 0;
      String nextDirection = getNextClockwiseDirection(direction);
      for (Integer[] nextCoord : coordsTable.get(coordString).get(direction)) {
        rectangleCount += clockwiseCountRectangles(nextCoord, coordsTable, nextDirection, origin);
      }
      return rectangleCount;
    }
  }

  public static String getNextClockwiseDirection(String direction) {
    if (direction == UP) return RIGHT;
    if (direction == RIGHT) return DOWN;
    if (direction == DOWN) return LEFT;
    return "";
  }

  public static String coordToString(Integer[] coord) {
    return Integer.toString(coord[0]) + "-" + Integer.toString(coord[1]);
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  static String UP = "up";
  static String RIGHT = "right";
  static String DOWN = "down";

  // O(n^2) time | O(n) space - where n is the number of coordinates
  public static int rectangleMania(List<Integer[]> coords) {
    Map<String, Map<Integer, List<Integer[]>>> coordsTable = getCoordsTable(coords);
    return getRectangleCount(coords, coordsTable);
  }

  public static Map<String, Map<Integer, List<Integer[]>>> getCoordsTable(List<Integer[]> coords) {
    Map<String, Map<Integer, List<Integer[]>>> coordsTable =
        new HashMap<String, Map<Integer, List<Integer[]>>>();
    coordsTable.put("x", new HashMap<Integer, List<Integer[]>>());
    coordsTable.put("y", new HashMap<Integer, List<Integer[]>>());
    for (Integer[] coord : coords) {
      if (!coordsTable.get("x").containsKey(coord[0])) {
        coordsTable.get("x").put(coord[0], new ArrayList<Integer[]>());
      }
      if (!coordsTable.get("y").containsKey(coord[1])) {
        coordsTable.get("y").put(coord[1], new ArrayList<Integer[]>());
      }
      coordsTable.get("x").get(coord[0]).add(coord);
      coordsTable.get("y").get(coord[1]).add(coord);
    }
    return coordsTable;
  }

  public static int getRectangleCount(
      List<Integer[]> coords, Map<String, Map<Integer, List<Integer[]>>> coordsTable) {
    int rectangleCount = 0;
    for (Integer[] coord : coords) {
      int lowerLeftY = coord[1];
      rectangleCount += clockwiseCountRectangles(coord, coordsTable, UP, lowerLeftY);
    }
    return rectangleCount;
  }

  public static int clockwiseCountRectangles(
      Integer[] coord1,
      Map<String, Map<Integer, List<Integer[]>>> coordsTable,
      String direction,
      int lowerLeftY) {
    if (direction == DOWN) {
      List<Integer[]> relevantCoords = coordsTable.get("x").get(coord1[0]);
      for (Integer[] coord2 : relevantCoords) {
        int lowerRightY = coord2[1];
        if (lowerRightY == lowerLeftY) return 1;
      }
      return 0;
    } else {
      int rectangleCount = 0;
      if (direction == UP) {
        List<Integer[]> relevantCoords = coordsTable.get("x").get(coord1[0]);
        for (Integer[] coord2 : relevantCoords) {
          boolean isAbove = coord2[1] > coord1[1];
          if (isAbove)
            rectangleCount += clockwiseCountRectangles(coord2, coordsTable, RIGHT, lowerLeftY);
        }
      } else if (direction == RIGHT) {
        List<Integer[]> relevantCoords = coordsTable.get("y").get(coord1[1]);
        for (Integer[] coord2 : relevantCoords) {
          boolean isRight = coord2[0] > coord1[0];
          if (isRight)
            rectangleCount += clockwiseCountRectangles(coord2, coordsTable, DOWN, lowerLeftY);
        }
      }
      return rectangleCount;
    }
  }
}

```
### Solution 3 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n^2) time | O(n) space - where n is the number of coordinates
  public static int rectangleMania(List<Integer[]> coords) {
    Set<String> coordsTable = getCoordsTable(coords);
    return getRectangleCount(coords, coordsTable);
  }

  public static Set<String> getCoordsTable(List<Integer[]> coords) {
    Set<String> coordsTable = new HashSet<String>();
    for (Integer[] coord : coords) {
      String coordString = coordToString(coord);
      coordsTable.add(coordString);
    }
    return coordsTable;
  }

  public static int getRectangleCount(List<Integer[]> coords, Set<String> coordsTable) {
    int rectangleCount = 0;
    for (Integer[] coord1 : coords) {
      for (Integer[] coord2 : coords) {
        if (!isInUpperRight(coord1, coord2)) continue;
        String upperCoordString = coordToString(new Integer[]{coord1[0], coord2[1]});
        String rightCoordString = coordToString(new Integer[]{coord2[0], coord1[1]});
        if (coordsTable.contains(upperCoordString) && coordsTable.contains(rightCoordString))
          rectangleCount++;
      }
    }
    return rectangleCount;
  }

  public static boolean isInUpperRight(Integer[] coord1, Integer[] coord2) {
    return coord2[0] > coord1[0] && coord2[1] > coord1[1];
  }

  public static String coordToString(Integer[] coord) {
    return Integer.toString(coord[0]) + "-" + Integer.toString(coord[1]);
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    List<Integer[]> coords =
        new ArrayList<Integer[]>(Arrays.asList(
          new Integer[]{0, 0},
          new Integer[]{0, 1},
          new Integer[]{1, 1},
          new Integer[]{1, 0},
          new Integer[]{2, 1},
          new Integer[]{2, 0},
          new Integer[]{3, 1},
          new Integer[]{3, 0}
        ));
    Utils.assertTrue(Program.rectangleMania(coords) == 6);
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
  const coords = [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0],
    [2, 1],
    [2, 0],
    [3, 1],
    [3, 0],
  ];
  chai.expect(program.rectangleMania(coords)).to.deep.equal(6);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n^2) space - where n is the number of coordinates
function rectangleMania(coords) {
  const coordsTable = getCoordsTable(coords);
  return getRectangleCount(coords, coordsTable);
}

function getCoordsTable(coords) {
  const coordsTable = {};
  for (const coord1 of coords) {
    const coord1Directions = {
      [UP]: [],
      [RIGHT]: [],
      [DOWN]: [],
      [LEFT]: [],
    };
    for (const coord2 of coords) {
      const coord2Direction = getCoordDirection(coord1, coord2);
      if (coord2Direction in coord1Directions) coord1Directions[coord2Direction].push(coord2);
    }
    const coord1String = coordToString(coord1);
    coordsTable[coord1String] = coord1Directions;
  }
  return coordsTable;
}

function getCoordDirection(coord1, coord2) {
  const [x1, y1] = coord1;
  const [x2, y2] = coord2;
  if (y2 === y1) {
    if (x2 > x1) {
      return RIGHT;
    } else if (x2 < x1) {
      return LEFT;
    }
  } else if (x2 === x1) {
    if (y2 > y1) {
      return UP;
    } else if (y2 < y1) {
      return DOWN;
    }
  }
  return '';
}

function getRectangleCount(coords, coordsTable) {
  let rectangleCount = 0;
  for (const coord of coords) {
    rectangleCount += clockwiseCountRectangles(coord, coordsTable, UP, coord);
  }
  return rectangleCount;
}

function clockwiseCountRectangles(coord, coordsTable, direction, origin) {
  const coordString = coordToString(coord);
  if (direction === LEFT) {
    const rectangleFound = coordsTable[coordString][LEFT].includes(origin);
    return rectangleFound ? 1 : 0;
  } else {
    let rectangleCount = 0;
    const nextDirection = getNextClockwiseDirection(direction);
    for (const nextCoord of coordsTable[coordString][direction]) {
      rectangleCount += clockwiseCountRectangles(nextCoord, coordsTable, nextDirection, origin);
    }
    return rectangleCount;
  }
}

function getNextClockwiseDirection(direction) {
  if (direction === UP) return RIGHT;
  if (direction === RIGHT) return DOWN;
  if (direction === DOWN) return LEFT;
  return '';
}

function coordToString(coord) {
  const [x, y] = coord;
  return `${x}-${y}`;
}

const UP = 'up';
const RIGHT = 'right';
const DOWN = 'down';
const LEFT = 'left';

exports.rectangleMania = rectangleMania;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space - where n is the number of coordinates
function rectangleMania(coords) {
  const coordsTable = getCoordsTable(coords);
  return getRectangleCount(coords, coordsTable);
}

function getCoordsTable(coords) {
  const coordsTable = {x: {}, y: {}};
  for (const coord of coords) {
    const [x, y] = coord;
    coordsTable.x[x] = coordsTable.x[x] || [];
    coordsTable.x[x].push(coord);
    coordsTable.y[y] = coordsTable.y[y] || [];
    coordsTable.y[y].push(coord);
  }
  return coordsTable;
}

function getRectangleCount(coords, coordsTable) {
  let rectangleCount = 0;
  for (const coord of coords) {
    const lowerLeftY = coord[1];
    rectangleCount += clockwiseCountRectangles(coord, coordsTable, UP, lowerLeftY);
  }
  return rectangleCount;
}

function clockwiseCountRectangles(coord1, coordsTable, direction, lowerLeftY) {
  const [x1, y1] = coord1;
  if (direction === DOWN) {
    const relevantCoords = coordsTable.x[x1];
    for (const coord2 of relevantCoords) {
      const lowerRightY = coord2[1];
      if (lowerRightY === lowerLeftY) return 1;
    }
    return 0;
  } else {
    let rectangleCount = 0;
    if (direction === UP) {
      const relevantCoords = coordsTable.x[x1];
      for (const coord2 of relevantCoords) {
        const y2 = coord2[1];
        const isAbove = y2 > y1;
        if (isAbove) rectangleCount += clockwiseCountRectangles(coord2, coordsTable, RIGHT, lowerLeftY);
      }
    } else if (direction === RIGHT) {
      const relevantCoords = coordsTable.y[y1];
      for (const coord2 of relevantCoords) {
        const x2 = coord2[0];
        const isRight = x2 > x1;
        if (isRight) rectangleCount += clockwiseCountRectangles(coord2, coordsTable, DOWN, lowerLeftY);
      }
    }
    return rectangleCount;
  }
}

const UP = 'up';
const RIGHT = 'right';
const DOWN = 'down';

exports.rectangleMania = rectangleMania;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space - where n is the number of coordinates
function rectangleMania(coords) {
  const coordsTable = getCoordsTable(coords);
  return getRectangleCount(coords, coordsTable);
}

function getCoordsTable(coords) {
  const coordsTable = {};
  for (const coord of coords) {
    const coordString = coordToString(coord);
    coordsTable[coordString] = true;
  }
  return coordsTable;
}

function getRectangleCount(coords, coordsTable) {
  let rectangleCount = 0;
  for (const [x1, y1] of coords) {
    for (const [x2, y2] of coords) {
      if (!isInUpperRight([x1, y1], [x2, y2])) continue;
      const upperCoordString = coordToString([x1, y2]);
      const rightCoordString = coordToString([x2, y1]);
      if (upperCoordString in coordsTable && rightCoordString in coordsTable) rectangleCount++;
    }
  }
  return rectangleCount;
}

function isInUpperRight(coord1, coord2) {
  const [x1, y1] = coord1;
  const [x2, y2] = coord2;
  return x2 > x1 && y2 > y1;
}

function coordToString(coord) {
  const [x, y] = coord;
  return `${x}-${y}`;
}

exports.rectangleMania = rectangleMania;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const coords = [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0],
    [2, 1],
    [2, 0],
    [3, 1],
    [3, 0],
  ];
  chai.expect(program.rectangleMania(coords)).to.deep.equal(6);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.rectangleMania

class ProgramTest {
    @Test
    fun TestCase1() {
        val coords = listOf(
            listOf(0, 0),
            listOf(0, 1),
            listOf(1, 1),
            listOf(1, 0),
            listOf(2, 1),
            listOf(2, 0),
            listOf(3, 1),
            listOf(3, 0)
        )
        val output = rectangleMania(coords)
        assert(output == 6)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

enum class Direction {
    UP, DOWN, LEFT, RIGHT, NONE
}

// O(n^2) time | O(n^2) space - where n is the number of coordinates
fun rectangleMania(coords: List<List<Int>>): Int {
    val coordsTable = getCoordsTable(coords)
    return getRectangleCount(coords, coordsTable)
}

fun getCoordsTable(coords: List<List<Int>>): Map<String, Map<Direction, List<List<Int>>>> {
    val coordsTable = mutableMapOf<String, Map<Direction, List<List<Int>>>>()
    for (coord1 in coords) {
        val coord1Directions = mutableMapOf<Direction, MutableList<List<Int>>>(
            Direction.UP to mutableListOf(),
            Direction.RIGHT to mutableListOf(),
            Direction.LEFT to mutableListOf(),
            Direction.DOWN to mutableListOf()
        )
        for (coord2 in coords) {
            val coord2Direction = getCoordDirection(coord1, coord2)
            if (coord1Directions.containsKey(coord2Direction)) {
                coord1Directions[coord2Direction]!!.add(coord2)
            }
        }
        val coord1String = coordToString(coord1)
        coordsTable[coord1String] = coord1Directions
    }
    return coordsTable
}

fun getCoordDirection(coord1: List<Int>, coord2: List<Int>): Direction {
    if (coord2[1] == coord1[1]) {
        if (coord2[0] > coord1[0]) {
            return Direction.RIGHT
        } else if (coord2[0] < coord1[0]) {
            return Direction.LEFT
        }
    } else if (coord2[0] == coord1[0]) {
        if (coord2[1] > coord1[1]) {
            return Direction.UP
        } else if (coord2[1] < coord1[1]) {
            return Direction.DOWN
        }
    }
    return Direction.NONE
}

fun getRectangleCount(coords: List<List<Int>>, coordsTable: Map<String, Map<Direction, List<List<Int>>>>): Int {
    var rectangleCount = 0
    for (coord in coords) {
        rectangleCount += clockwiseCountRectangles(coord, coordsTable, Direction.UP, coord)
    }
    return rectangleCount
}

fun clockwiseCountRectangles(
    coord: List<Int>,
    coordsTable: Map<String, Map<Direction, List<List<Int>>>>,
    direction: Direction,
    origin: List<Int>
): Int {
    val coordString = coordToString(coord)
    if (direction == Direction.LEFT) {
        val rectangleFound = coordsTable[coordString]!![direction]!!.contains(origin)
        return if (rectangleFound) 1 else 0
    }

    var rectangleCount = 0
    val nextDirection = getNextClockwiseDirection(direction)
    if (nextDirection == Direction.NONE) return 0

    val directions = coordsTable[coordString]!!
    if (!directions.containsKey(direction)) return 0

    for (nextCoord in directions[direction]!!) {
        rectangleCount += clockwiseCountRectangles(nextCoord, coordsTable, nextDirection, origin)
    }
    return rectangleCount
}

fun getNextClockwiseDirection(direction: Direction): Direction {
    if (direction == Direction.UP) return Direction.RIGHT
    if (direction == Direction.RIGHT) return Direction.DOWN
    if (direction == Direction.DOWN) return Direction.LEFT
    return Direction.NONE
}

fun coordToString(coord: List<Int>): String {
    return coord[0].toString() + "-" + coord[1].toString()
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

enum class Direction {
    UP, DOWN, LEFT, RIGHT, NONE
}

data class CoordsTable(
    val x: MutableMap<Int, MutableList<List<Int>>> = mutableMapOf(),
    val y: MutableMap<Int, MutableList<List<Int>>> = mutableMapOf()
)

// O(n^2) time | O(n) space - where n is the number of coordinates
fun rectangleMania(coords: List<List<Int>>): Int {
    val coordsTable = getCoordsTable(coords)
    return getRectangleCount(coords, coordsTable)
}

fun getCoordsTable(coords: List<List<Int>>): CoordsTable {
    val coordsTable = CoordsTable()
    for (coord in coords) {
        if (!coordsTable.x.containsKey(coord[0])) {
            coordsTable.x[coord[0]] = mutableListOf()
        }
        if (!coordsTable.y.containsKey(coord[1])) {
            coordsTable.y[coord[1]] = mutableListOf()
        }
        coordsTable.x[coord[0]]!!.add(coord)
        coordsTable.y[coord[1]]!!.add(coord)
    }
    return coordsTable
}

fun getRectangleCount(coords: List<List<Int>>, coordsTable: CoordsTable): Int {
    var rectangleCount = 0
    for (coord in coords) {
        val lowerLeftY = coord[1]
        rectangleCount += clockwiseCountRectangles(coord, coordsTable, Direction.UP, lowerLeftY)
    }
    return rectangleCount
}

fun clockwiseCountRectangles(
    coord1: List<Int>,
    coordsTable: CoordsTable,
    direction: Direction,
    lowerLeftY: Int
): Int {
    if (direction == Direction.DOWN) {
        val relevantCoords = coordsTable.x[coord1[0]]!!
        for (coord2 in relevantCoords) {
            val lowerRightY = coord2[1]
            if (lowerRightY == lowerLeftY) return 1
        }
        return 0
    }

    var rectangleCount = 0
    if (direction == Direction.UP) {
        val relevantCoords = coordsTable.x[coord1[0]]!!
        for (coord2 in relevantCoords) {
            val isAbove = coord2[1] > coord1[1]
            if (isAbove) {
                rectangleCount += clockwiseCountRectangles(coord2, coordsTable, Direction.RIGHT, lowerLeftY)
            }
        }
    } else if (direction == Direction.RIGHT) {
        val relevantCoords = coordsTable.y[coord1[1]]!!
        for (coord2 in relevantCoords) {
            val isRight = coord2[0] > coord1[0]
            if (isRight) {
                rectangleCount += clockwiseCountRectangles(coord2, coordsTable, Direction.DOWN, lowerLeftY)
            }
        }
    }
    return rectangleCount
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^2) time | O(n) space - where n is the number of coordinates
fun rectangleMania(coords: List<List<Int>>): Int {
    val coordsTable = getCoordsTable(coords)
    return getRectangleCount(coords, coordsTable)
}

fun getCoordsTable(coords: List<List<Int>>): Set<String> {
    val coordsTable = mutableSetOf<String>()
    for (coord in coords) {
        val coordString = coordToString(coord)
        coordsTable.add(coordString)
    }
    return coordsTable
}

fun getRectangleCount(coords: List<List<Int>>, coordsTable: Set<String>): Int {
    var rectangleCount = 0
    for (coord1 in coords) {
        for (coord2 in coords) {
            if (!isInUpperRight(coord1, coord2)) continue
            val upperCoordString = coordToString(listOf(coord1[0], coord2[1]))
            val rightCoordString = coordToString(listOf(coord2[0], coord1[1]))
            if (coordsTable.contains(upperCoordString) && coordsTable.contains(rightCoordString)) {
                rectangleCount++
            }
        }
    }
    return rectangleCount
}

fun isInUpperRight(coord1: List<Int>, coord2: List<Int>): Boolean {
    return coord2[0] > coord1[0] && coord2[1] > coord1[1]
}

fun coordToString(coord: List<Int>): String {
    return coord[0].toString() + "-" + coord[1].toString()
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.rectangleMania

class ProgramTest {
    @Test
    fun TestCase1() {
        val coords = listOf(
            listOf(0, 0),
            listOf(0, 1),
            listOf(1, 1),
            listOf(1, 0),
            listOf(2, 1),
            listOf(2, 0),
            listOf(3, 1),
            listOf(3, 0)
        )
        val output = rectangleMania(coords)
        assert(output == 6)
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
      let thirdCoords = [[0, 0], [0, 1], [1, 1], [1, 0], [2, 1], [2, 0], [3, 1], [3, 0]]
      try assertEqual(6, program.rectangleMania(thirdCoords))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  let UP = "up"
  let DOWN = "down"
  let LEFT = "left"
  let RIGHT = "right"

  func coordToString(_ coord: [Int]) -> String {
    let x = coord[0]
    let y = coord[1]

    return "\(x)-\(y)"
  }

  // O(n^2) time | O(n^2) space
  func rectangleMania(_ coords: [[Int]]) -> Int {
    let coordsTable = getCoordsTable(coords)
    return getRectangleCount(coords, coordsTable)
  }

  func getCoordsTable(_ coords: [[Int]]) -> [String: [String: [[Int]]]] {
    var coordsTable = [String: [String: [[Int]]]]()

    for coord1 in coords {
      var coord1Directions: [String: [[Int]]] = [UP: [], DOWN: [], LEFT: [], RIGHT: []]

      for coord2 in coords {
        let coord2Direction = getCoordDirection(coord1, coord2)

        if var coordinatesForDirection = coord1Directions[coord2Direction] {
          coordinatesForDirection.append(coord2)
          coord1Directions[coord2Direction] = coordinatesForDirection
        }
      }

      let coords1String = coordToString(coord1)
      coordsTable[coords1String] = coord1Directions
    }

    return coordsTable
  }

  func getCoordDirection(_ coord1: [Int], _ coord2: [Int]) -> String {
    let x1 = coord1[0]
    let y1 = coord1[1]

    let x2 = coord2[0]
    let y2 = coord2[1]

    if y1 == y2 {
      if x1 < x2 {
        return RIGHT
      } else {
        return LEFT
      }
    } else if x1 == x2 {
      if y1 < y2 {
        return UP
      } else {
        return DOWN
      }
    }

    return ""
  }

  func getRectangleCount(_ coords: [[Int]], _ coordsTable: [String: [String: [[Int]]]]) -> Int {
    var rectangleCount = 0

    for coord in coords {
      rectangleCount += clockwiseCountRectangles(coord, coordsTable, UP, coord)
    }

    return rectangleCount
  }

  func clockwiseCountRectangles(_ coord: [Int], _ coordsTable: [String: [String: [[Int]]]], _ direction: String, _ origin: [Int]) -> Int {
    let coordString = coordToString(coord)

    if direction == LEFT {
      if let directionsForCoordinate = coordsTable[coordString], let coordinatesForDirection = directionsForCoordinate[direction], coordinatesForDirection.contains(origin) {
        return 1
      } else {
        return 0
      }
    } else {
      var rectangleCount = 0
      let nextDirection = getNextClockwiseDirection(direction)

      if let directionsForCoordinate = coordsTable[coordString], let coordinatesForDirection = directionsForCoordinate[direction] {
        for nextCoord in coordinatesForDirection {
          rectangleCount += clockwiseCountRectangles(nextCoord, coordsTable, nextDirection, origin)
        }
      }

      return rectangleCount
    }
  }

  func getNextClockwiseDirection(_ direction: String) -> String {
    if direction == UP {
      return RIGHT
    }

    if direction == RIGHT {
      return DOWN
    }

    if direction == DOWN {
      return LEFT
    }

    return ""
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  let UP = "up"
  let DOWN = "down"
  let LEFT = "left"
  let RIGHT = "right"

  func coordToString(_ coord: [Int]) -> String {
    let x = coord[0]
    let y = coord[1]

    return "\(x)-\(y)"
  }

  // O(n^2) time | O(n) space
  func rectangleMania(_ coords: [[Int]]) -> Int {
    let coordsTable = getCoordsTable(coords)
    return getRectangleCount(coords, coordsTable)
  }

  func getCoordsTable(_ coords: [[Int]]) -> [String: [Int: [[Int]]]] {
    var coordsTable: [String: [Int: [[Int]]]] = ["x": [:], "y": [:]]

    for coord in coords {
      let x = coord[0]
      let y = coord[1]

      if var tableAtX = coordsTable["x"], var coordinatesForX = tableAtX[x] {
        coordinatesForX.append(coord)
        tableAtX[x] = coordinatesForX
        coordsTable["x"] = tableAtX
      } else if var tableAtX = coordsTable["x"] {
        tableAtX[x] = [coord]
        coordsTable["x"] = tableAtX
      }

      if var tableAtY = coordsTable["y"], var coordinatesForY = tableAtY[y] {
        coordinatesForY.append(coord)
        tableAtY[y] = coordinatesForY
        coordsTable["y"] = tableAtY
      } else if var tableAtY = coordsTable["y"] {
        tableAtY[y] = [coord]
        coordsTable["y"] = tableAtY
      }
    }

    return coordsTable
  }

  func getRectangleCount(_ coords: [[Int]], _ coordsTable: [String: [Int: [[Int]]]]) -> Int {
    var rectangleCount = 0

    for coord in coords {
      let lowerLeftY = coord[1]
      rectangleCount += clockwiseCountRectangles(coord, coordsTable, UP, lowerLeftY)
    }

    return rectangleCount
  }

  func clockwiseCountRectangles(_ coord: [Int], _ coordsTable: [String: [Int: [[Int]]]], _ direction: String, _ lowerLeftY: Int) -> Int {
    let x1 = coord[0]
    let y1 = coord[1]

    if direction == DOWN {
      if let tableAtX = coordsTable["x"], let relevantCoordinates = tableAtX[x1] {
        for coord2 in relevantCoordinates {
          let lowerRightY = coord2[1]
          if lowerLeftY == lowerRightY {
            return 1
          }
        }
      }

      return 0
    } else {
      var rectangleCount = 0

      if direction == UP {
        if let tableAtX = coordsTable["x"], let relevantCoordinates = tableAtX[x1] {
          for coord2 in relevantCoordinates {
            let y2 = coord2[1]

            let isAbove = y2 > y1

            if isAbove {
              rectangleCount += clockwiseCountRectangles(coord2, coordsTable, RIGHT, lowerLeftY)
            }
          }
        }
      } else if direction == RIGHT {
        if let tableAtY = coordsTable["y"], let relevantCoordinates = tableAtY[y1] {
          for coord2 in relevantCoordinates {
            let x2 = coord2[0]

            let isRight = x2 > x1

            if isRight {
              rectangleCount += clockwiseCountRectangles(coord2, coordsTable, DOWN, lowerLeftY)
            }
          }
        }
      }

      return rectangleCount
    }
  }
}

```
### Solution 3 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  let UP = "up"
  let DOWN = "down"
  let LEFT = "left"
  let RIGHT = "right"

  func coordToString(_ coord: [Int]) -> String {
    let x = coord[0]
    let y = coord[1]

    return "\(x)-\(y)"
  }

  // O(n^2) time | O(n) space
  func rectangleMania(_ coords: [[Int]]) -> Int {
    let coordsTable = getCoordsTable(coords)
    return getRectangleCount(coords, coordsTable)
  }

  func getCoordsTable(_ coords: [[Int]]) -> [String: Bool] {
    var coordsTable = [String: Bool]()

    for coord in coords {
      let coordString = coordToString(coord)
      coordsTable[coordString] = true
    }

    return coordsTable
  }

  func getRectangleCount(_ coords: [[Int]], _ coordsTable: [String: Bool]) -> Int {
    var rectangleCount = 0

    for coord1 in coords {
      let x1 = coord1[0]
      let y1 = coord1[1]

      for coord2 in coords {
        let x2 = coord2[0]
        let y2 = coord2[1]

        if !isInUpperRightCorner(coord1, coord2) {
          continue
        }

        let leftCoordString = coordToString([x1, y2])
        let bottomCoordString = coordToString([x2, y1])

        if coordsTable.keys.contains(leftCoordString), coordsTable.keys.contains(bottomCoordString) {
          rectangleCount += 1
        }
      }
    }

    return rectangleCount
  }

  func isInUpperRightCorner(_ coord1: [Int], _ coord2: [Int]) -> Bool {
    let x1 = coord1[0]
    let y1 = coord1[1]

    let x2 = coord2[0]
    let y2 = coord2[1]

    return x2 > x1 && y2 > y1
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let thirdCoords = [[0, 0], [0, 1], [1, 1], [1, 0], [2, 1], [2, 0], [3, 1], [3, 0]]
      try assertEqual(6, program.rectangleMania(thirdCoords))
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
        coords = [[0, 0], [0, 1], [1, 1], [1, 0], [2, 1], [2, 0], [3, 1], [3, 0]]
        self.assertEqual(program.rectangleMania(coords), 6)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n^2) space - where n is the number of coordinates
def rectangleMania(coords):
    coordsTable = getCoordsTable(coords)
    return getRectangleCount(coords, coordsTable)


def getCoordsTable(coords):
    coordsTable = {}
    for coord1 in coords:
        coord1Directions = {UP: [], RIGHT: [], DOWN: [], LEFT: []}
        for coord2 in coords:
            coord2Direction = getCoordDirection(coord1, coord2)
            if coord2Direction in coord1Directions:
                coord1Directions[coord2Direction].append(coord2)
        coord1String = coordToString(coord1)
        coordsTable[coord1String] = coord1Directions
    return coordsTable


def getCoordDirection(coord1, coord2):
    x1, y1 = coord1
    x2, y2 = coord2
    if y2 == y1:
        if x2 > x1:
            return RIGHT
        elif x2 < x1:
            return LEFT
    elif x2 == x1:
        if y2 > y1:
            return UP
        elif y2 < y1:
            return DOWN
    return ""


def getRectangleCount(coords, coordsTable):
    rectangleCount = 0
    for coord in coords:
        rectangleCount += clockwiseCountRectangles(coord, coordsTable, UP, coord)
    return rectangleCount


def clockwiseCountRectangles(coord, coordsTable, direction, origin):
    coordString = coordToString(coord)
    if direction == LEFT:
        rectangleFound = origin in coordsTable[coordString][LEFT]
        return 1 if rectangleFound else 0
    else:
        rectangleCount = 0
        nextDirection = getNextClockwiseDirection(direction)
        for nextCoord in coordsTable[coordString][direction]:
            rectangleCount += clockwiseCountRectangles(nextCoord, coordsTable, nextDirection, origin)
        return rectangleCount


def getNextClockwiseDirection(direction):
    if direction == UP:
        return RIGHT
    if direction == RIGHT:
        return DOWN
    if direction == DOWN:
        return LEFT
    return ""


def coordToString(coord):
    x, y = coord
    return str(x) + "-" + str(y)


UP = "up"
RIGHT = "right"
DOWN = "down"
LEFT = "left"

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n) space - where n is the number of coordinates
def rectangleMania(coords):
    coordsTable = getCoordsTable(coords)
    return getRectangleCount(coords, coordsTable)


def getCoordsTable(coords):
    coordsTable = {"x": {}, "y": {}}
    for coord in coords:
        x, y = coord
        if x not in coordsTable["x"]:
            coordsTable["x"][x] = []
        coordsTable["x"][x].append(coord)
        if y not in coordsTable["y"]:
            coordsTable["y"][y] = []
        coordsTable["y"][y].append(coord)
    return coordsTable


def getRectangleCount(coords, coordsTable):
    rectangleCount = 0
    for coord in coords:
        lowerLeftY = coord[1]
        rectangleCount += clockwiseCountRectangles(coord, coordsTable, UP, lowerLeftY)
    return rectangleCount


def clockwiseCountRectangles(coord1, coordsTable, direction, lowerLeftY):
    x1, y1 = coord1
    if direction == DOWN:
        relevantCoords = coordsTable["x"][x1]
        for coord2 in relevantCoords:
            lowerRightY = coord2[1]
            if lowerRightY == lowerLeftY:
                return 1
        return 0
    else:
        rectangleCount = 0
        if direction == UP:
            relevantCoords = coordsTable["x"][x1]
            for coord2 in relevantCoords:
                y2 = coord2[1]
                isAbove = y2 > y1
                if isAbove:
                    rectangleCount += clockwiseCountRectangles(coord2, coordsTable, RIGHT, lowerLeftY)
        elif direction == RIGHT:
            relevantCoords = coordsTable["y"][y1]
            for coord2 in relevantCoords:
                x2 = coord2[0]
                isRight = x2 > x1
                if isRight:
                    rectangleCount += clockwiseCountRectangles(coord2, coordsTable, DOWN, lowerLeftY)
        return rectangleCount


UP = "up"
RIGHT = "right"
DOWN = "down"

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n) space - where n is the number of coordinates
def rectangleMania(coords):
    coordsTable = getCoordsTable(coords)
    return getRectangleCount(coords, coordsTable)


def getCoordsTable(coords):
    coordsTable = {}
    for coord in coords:
        coordString = coordToString(coord)
        coordsTable[coordString] = True
    return coordsTable


def getRectangleCount(coords, coordsTable):
    rectangleCount = 0
    for x1, y1 in coords:
        for x2, y2 in coords:
            if not isInUpperRight([x1, y1], [x2, y2]):
                continue
            upperCoordString = coordToString([x1, y2])
            rightCoordString = coordToString([x2, y1])
            if upperCoordString in coordsTable and rightCoordString in coordsTable:
                rectangleCount += 1
    return rectangleCount


def isInUpperRight(coord1, coord2):
    x1, y1 = coord1
    x2, y2 = coord2
    return x2 > x1 and y2 > y1


def coordToString(coord):
    x, y = coord
    return str(x) + "-" + str(y)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        coords = [[0, 0], [0, 1], [1, 1], [1, 0], [2, 1], [2, 0], [3, 1], [3, 0]]
        self.assertEqual(program.rectangleMania(coords), 6)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

type Coord = [number, number];

it('Test Case #1', function () {
  const coords: Coord[] = [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0],
    [2, 1],
    [2, 0],
    [3, 1],
    [3, 0],
  ];
  chai.expect(program.rectangleMania(coords)).to.deep.equal(6);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

type Coord = [number, number];

enum Direction {
  Up,
  Right,
  Down,
  Left,
}

interface CoordDirection {
  [Direction.Up]: Coord[];
  [Direction.Right]: Coord[];
  [Direction.Down]: Coord[];
  [Direction.Left]: Coord[];
}

interface CoordsTable {
  [key: string]: CoordDirection;
}

// O(n^2) time | O(n^2) space - where n is the number of coordinates
export function rectangleMania(coords: Coord[]) {
  const coordsTable = getCoordsTable(coords);
  return getRectangleCount(coords, coordsTable);
}

function getCoordsTable(coords: Coord[]) {
  const coordsTable: CoordsTable = {};
  for (const coord1 of coords) {
    const coord1Directions: CoordDirection = {
      [Direction.Up]: [],
      [Direction.Right]: [],
      [Direction.Down]: [],
      [Direction.Left]: [],
    };
    for (const coord2 of coords) {
      const coord2Direction = getCoordDirection(coord1, coord2);
      if (coord2Direction !== null) coord1Directions[coord2Direction].push(coord2);
    }
    const coord1String = coordToString(coord1);
    coordsTable[coord1String] = coord1Directions;
  }
  return coordsTable;
}

function getCoordDirection(coord1: Coord, coord2: Coord) {
  const [x1, y1] = coord1;
  const [x2, y2] = coord2;
  if (y2 === y1) {
    if (x2 > x1) {
      return Direction.Right;
    } else if (x2 < x1) {
      return Direction.Left;
    }
  } else if (x2 === x1) {
    if (y2 > y1) {
      return Direction.Up;
    } else if (y2 < y1) {
      return Direction.Down;
    }
  }
  return null;
}

function getRectangleCount(coords: Coord[], coordsTable: CoordsTable) {
  let rectangleCount = 0;
  for (const coord of coords) {
    rectangleCount += clockwiseCountRectangles(coord, coordsTable, Direction.Up, coord);
  }
  return rectangleCount;
}

function clockwiseCountRectangles(coord: Coord, coordsTable: CoordsTable, direction: Direction | null, origin: Coord) {
  const coordString = coordToString(coord);
  if (direction === null) return 0;
  else if (direction === Direction.Left) {
    const rectangleFound = coordsTable[coordString][Direction.Left].includes(origin);
    return rectangleFound ? 1 : 0;
  } else {
    let rectangleCount = 0;
    const nextDirection = getNextClockwiseDirection(direction);
    for (const nextCoord of coordsTable[coordString][direction]) {
      rectangleCount += clockwiseCountRectangles(nextCoord, coordsTable, nextDirection, origin);
    }
    return rectangleCount;
  }
}

function getNextClockwiseDirection(direction: Direction | null) {
  if (direction === Direction.Up) return Direction.Right;
  if (direction === Direction.Right) return Direction.Down;
  if (direction === Direction.Down) return Direction.Left;
  return null;
}

function coordToString(coord: Coord) {
  const [x, y] = coord;
  return `${x}-${y}`;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

type Coord = [number, number];

enum Direction {
  Up,
  Right,
  Down,
}

interface CoordsTable {
  x: {
    [key: number]: Coord[];
  };
  y: {
    [key: number]: Coord[];
  };
}

// O(n^2) time | O(n) space - where n is the number of coordinates
export function rectangleMania(coords: Coord[]) {
  const coordsTable = getCoordsTable(coords);
  return getRectangleCount(coords, coordsTable);
}

function getCoordsTable(coords: Coord[]) {
  const coordsTable: CoordsTable = {x: {}, y: {}};
  for (const coord of coords) {
    const [x, y] = coord;
    coordsTable.x[x] = coordsTable.x[x] || [];
    coordsTable.x[x].push(coord);
    coordsTable.y[y] = coordsTable.y[y] || [];
    coordsTable.y[y].push(coord);
  }
  return coordsTable;
}

function getRectangleCount(coords: Coord[], coordsTable: CoordsTable) {
  let rectangleCount = 0;
  for (const coord of coords) {
    const lowerLeftY = coord[1];
    rectangleCount += clockwiseCountRectangles(coord, coordsTable, Direction.Up, lowerLeftY);
  }
  return rectangleCount;
}

function clockwiseCountRectangles(coord1: Coord, coordsTable: CoordsTable, direction: Direction, lowerLeftY: number) {
  const [x1, y1] = coord1;
  if (direction === Direction.Down) {
    const relevantCoords = coordsTable.x[x1];
    for (const coord2 of relevantCoords) {
      const lowerRightY = coord2[1];
      if (lowerRightY === lowerLeftY) return 1;
    }
    return 0;
  } else {
    let rectangleCount = 0;
    if (direction === Direction.Up) {
      const relevantCoords = coordsTable.x[x1];
      for (const coord2 of relevantCoords) {
        const y2 = coord2[1];
        const isAbove = y2 > y1;
        if (isAbove) rectangleCount += clockwiseCountRectangles(coord2, coordsTable, Direction.Right, lowerLeftY);
      }
    } else if (direction === Direction.Right) {
      const relevantCoords = coordsTable.y[y1];
      for (const coord2 of relevantCoords) {
        const x2 = coord2[0];
        const isRight = x2 > x1;
        if (isRight) rectangleCount += clockwiseCountRectangles(coord2, coordsTable, Direction.Down, lowerLeftY);
      }
    }
    return rectangleCount;
  }
}

```
### Solution 3 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

type Coord = [number, number];

interface CoordsTable {
  [key: string]: boolean;
}

// O(n^2) time | O(n) space - where n is the number of coordinates
export function rectangleMania(coords: Coord[]) {
  const coordsTable = getCoordsTable(coords);
  return getRectangleCount(coords, coordsTable);
}

function getCoordsTable(coords: Coord[]) {
  const coordsTable: CoordsTable = {};
  for (const coord of coords) {
    const coordString = coordToString(coord);
    coordsTable[coordString] = true;
  }
  return coordsTable;
}

function getRectangleCount(coords: Coord[], coordsTable: CoordsTable) {
  let rectangleCount = 0;
  for (const [x1, y1] of coords) {
    for (const [x2, y2] of coords) {
      if (!isInUpperRight([x1, y1], [x2, y2])) continue;
      const upperCoordString = coordToString([x1, y2]);
      const rightCoordString = coordToString([x2, y1]);
      if (upperCoordString in coordsTable && rightCoordString in coordsTable) rectangleCount++;
    }
  }
  return rectangleCount;
}

function isInUpperRight(coord1: Coord, coord2: Coord) {
  const [x1, y1] = coord1;
  const [x2, y2] = coord2;
  return x2 > x1 && y2 > y1;
}

function coordToString(coord: Coord) {
  const [x, y] = coord;
  return `${x}-${y}`;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

type Coord = [number, number];

it('Test Case #1', function () {
  const coords: Coord[] = [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0],
    [2, 1],
    [2, 0],
    [3, 1],
    [3, 0],
  ];
  chai.expect(program.rectangleMania(coords)).to.deep.equal(6);
});

```

