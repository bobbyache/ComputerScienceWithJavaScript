# Apartment Hunting
<div class="html">
<p>
  You're looking to move into a new apartment on specific street, and you're
  given a list of contiguous blocks on that street where each block contains an
  apartment that you could move into.
</p>
<p>
  You also have a list of requirements: a list of buildings that are important
  to you. For instance, you might value having a school and a gym near your
  apartment. The list of blocks that you have contains information at every
  block about all of the buildings that are present and absent at the block in
  question. For instance, for every block, you might know whether a school, a
  pool, an office, and a gym are present.
</p>
<p>
  In order to optimize your life, you want to pick an apartment block such that
  you minimize the farthest distance you'd have to walk from your apartment to
  reach any of your required buildings.
</p>
<p>
  Write a function that takes in a list of contiguous blocks on a specific
  street and a list of your required buildings and that returns the location
  (the index) of the block that's most optimal for you.
</p>
<p>
  If there are multiple most optimal blocks, your function can return the index
  of any one of them.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">blocks</span> = [
  {
    "gym": false,
    "school": true,
    "store": false,
  },
  {
    "gym": true,
    "school": false,
    "store": false,
  },
  {
    "gym": true,
    "school": true,
    "store": false,
  },
  {
    "gym": false,
    "school": true,
    "store": false,
  },
  {
    "gym": false,
    "school": true,
    "store": true,
  },
]
<span class="CodeEditor-promptParameter">reqs</span> = ["gym", "school", "store"]
</pre>
<h3>Sample Output</h3>
<pre>
3 <span class="CodeEditor-promptComment">// at index 3, the farthest you'd have to walk to reach a gym, a school, or a store is 1 block; at any other index, you'd have to walk farther</span>
</pre>
</div>

Hint 1
<p>
For every block, you want to go through every requirement, and for every requirement, you want to find the closest other block with that requirement (or rather, the smallest distance to another block with that requirement). Once you've done that for every requirement and for every block, you want to pick, for every block, the distance of the farthest requirement. You can do this with three nested "for" loops.
</p>


Hint 2

<p>
Is there a way to optimize on the solution mentioned in Hint #1 (that uses three nested "for" loops) by precomputing the smallest distances of every requirement from every block?
</p>


Hint 3

<p>
For every requirement, you should be able to precompute its smallest distances from every block by doing two simple passes though the array of blocks: one pass from left to right and one pass from right to left. Once you have these precomputed values, you can iterate through all of the blocks and pick the biggest of all the precomputed distances at that block.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

#include <algorithm>

class ProgramTest : public TestSuite {
public:
  void Run() {

    RunTest("Test Case 1", []() {
      vector<unordered_map<string, bool>> blocks(5);

      blocks[0].insert({"gym", false});
      blocks[0].insert({"school", true});
      blocks[0].insert({"store", false});

      blocks[1].insert({"gym", true});
      blocks[1].insert({"school", false});
      blocks[1].insert({"store", false});

      blocks[2].insert({"gym", true});
      blocks[2].insert({"school", true});
      blocks[2].insert({"store", false});

      blocks[3].insert({"gym", false});
      blocks[3].insert({"school", true});
      blocks[3].insert({"store", false});

      blocks[4].insert({"gym", false});
      blocks[4].insert({"school", true});
      blocks[4].insert({"store", true});

      vector<string> reqs = {"gym", "school", "store"};
      assert(apartmentHunting(blocks, reqs) == 3);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <unordered_map>
#include <climits>
#include <algorithm>
#include <cmath>

using namespace std;

int getIdxAtMinValue(vector<int> array);
int distanceBetween(int a, int b);

// O(b^2*r) time | O(b) space - where b is the number of blocks and r is the
// number of requirements
int apartmentHunting(vector<unordered_map<string, bool>> blocks,
                     vector<string> reqs) {
  vector<int> maxDistancesAtBlocks(blocks.size(), INT_MIN);
  for (int i = 0; i < blocks.size(); i++) {
    for (string req : reqs) {
      int closestReqDistance = INT_MAX;
      for (int j = 0; j < blocks.size(); j++) {
        if (blocks[j][req]) {
          closestReqDistance = min(closestReqDistance, distanceBetween(i, j));
        }
      }
      maxDistancesAtBlocks[i] =
          max(maxDistancesAtBlocks[i], closestReqDistance);
    }
  }
  return getIdxAtMinValue(maxDistancesAtBlocks);
}

int getIdxAtMinValue(vector<int> array) {
  int idxAtMinValue = 0;
  int minValue = INT_MAX;
  for (int i = 0; i < array.size(); i++) {
    int currentValue = array[i];
    if (currentValue < minValue) {
      minValue = currentValue;
      idxAtMinValue = i;
    }
  }
  return idxAtMinValue;
}

int distanceBetween(int a, int b) { return abs(a - b); }

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.


#include <vector>
#include <unordered_map>
#include <climits>
#include <algorithm>
#include <cmath>

using namespace std;

vector<int> getMinDistances(vector<unordered_map<string, bool>> blocks,
                            string req);
vector<int> getMaxDistancesAtBlocks(vector<unordered_map<string, bool>> blocks,
                                    vector<vector<int>> minDistancesFromBlocks);
int getIdxAtMinValue(vector<int> array);
int distanceBetween(int a, int b);

// O(br) time | O(br) space - where b is the number of blocks and r is the
// number of requirements
int apartmentHunting(vector<unordered_map<string, bool>> blocks,
                     vector<string> reqs) {
  vector<vector<int>> minDistancesFromBlocks;
  for (string req : reqs) {
    minDistancesFromBlocks.push_back(getMinDistances(blocks, req));
  }
  vector<int> maxDistancesAtBlocks =
      getMaxDistancesAtBlocks(blocks, minDistancesFromBlocks);
  return getIdxAtMinValue(maxDistancesAtBlocks);
}

vector<int> getMinDistances(vector<unordered_map<string, bool>> blocks,
                            string req) {
  vector<int> minDistances(blocks.size());
  int closestReqIdx = INT_MAX;
  for (int i = 0; i < blocks.size(); i++) {
    if (blocks[i][req])
      closestReqIdx = i;
    minDistances[i] = distanceBetween(i, closestReqIdx);
  }
  for (int i = blocks.size() - 1; i >= 0; i--) {
    if (blocks[i][req])
      closestReqIdx = i;
    minDistances[i] = min(minDistances[i], distanceBetween(i, closestReqIdx));
  }
  return minDistances;
}

vector<int>
getMaxDistancesAtBlocks(vector<unordered_map<string, bool>> blocks,
                        vector<vector<int>> minDistancesFromBlocks) {
  vector<int> maxDistancesAtBlocks(blocks.size());
  for (int i = 0; i < blocks.size(); i++) {
    vector<int> minDistancesAtBlock;
    for (vector<int> distances : minDistancesFromBlocks) {
      minDistancesAtBlock.push_back(distances[i]);
    }
    maxDistancesAtBlocks[i] =
        *max_element(minDistancesAtBlock.begin(), minDistancesAtBlock.end());
  }
  return maxDistancesAtBlocks;
}

int getIdxAtMinValue(vector<int> array) {
  int idxAtMinValue = 0;
  int minValue = INT_MAX;
  for (int i = 0; i < array.size(); i++) {
    int currentValue = array[i];
    if (currentValue < minValue) {
      minValue = currentValue;
      idxAtMinValue = i;
    }
  }
  return idxAtMinValue;
}

int distanceBetween(int a, int b) { return abs(a - b); }

```
### Unit Tests 1 (cpp)
```cpp
#include <algorithm>

class ProgramTest : public TestSuite {
public:
  void Run() {

    RunTest("Test Case 1", []() {
      vector<unordered_map<string, bool>> blocks(5);

      blocks[0].insert({"gym", false});
      blocks[0].insert({"school", true});
      blocks[0].insert({"store", false});

      blocks[1].insert({"gym", true});
      blocks[1].insert({"school", false});
      blocks[1].insert({"store", false});

      blocks[2].insert({"gym", true});
      blocks[2].insert({"school", true});
      blocks[2].insert({"store", false});

      blocks[3].insert({"gym", false});
      blocks[3].insert({"school", true});
      blocks[3].insert({"store", false});

      blocks[4].insert({"gym", false});
      blocks[4].insert({"school", true});
      blocks[4].insert({"store", true});

      vector<string> reqs = {"gym", "school", "store"};
      assert(apartmentHunting(blocks, reqs) == 3);
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

public class ProgramTest {
	[Test]
	public void TestCase1() {
		List<Dictionary<string, bool> > blocks = new List<Dictionary<string, bool> >();

		blocks.Insert(0, new Dictionary<string, bool>());
		blocks[0]["gym"] = false;
		blocks[0]["school"] = true;
		blocks[0]["store"] = false;

		blocks.Insert(1, new Dictionary<string, bool>());
		blocks[1]["gym"] = true;
		blocks[1]["school"] = false;
		blocks[1]["store"] = false;

		blocks.Insert(2, new Dictionary<string, bool>());
		blocks[2]["gym"] = true;
		blocks[2]["school"] = true;
		blocks[2]["store"] = false;

		blocks.Insert(3, new Dictionary<string, bool>());
		blocks[3]["gym"] = false;
		blocks[3]["school"] = true;
		blocks[3]["store"] = false;

		blocks.Insert(4, new Dictionary<string, bool>());
		blocks[4]["gym"] = false;
		blocks[4]["school"] = true;
		blocks[4]["store"] = true;

		string[] reqs = new string[] {"gym", "school", "store"};
		Utils.AssertTrue(Program.ApartmentHunting(blocks, reqs) == 3);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;

public class Program {
	// O(b^2*r) time | O(b) space - where b is the number of blocks and r is the number of requirements
	public static int ApartmentHunting(List<Dictionary<string, bool> > blocks, string[] reqs) {
		int[] maxDistancesAtBlocks = new int[blocks.Count];
		Array.Fill(maxDistancesAtBlocks, Int32.MinValue);

		for (int i = 0; i < blocks.Count; i++) {
			foreach (string req in reqs) {
				int closestReqDistance = Int32.MaxValue;
				for (int j = 0; j < blocks.Count; j++) {
					if (blocks[j][req]) {
						closestReqDistance = Math.Min(closestReqDistance, distanceBetween(
							    i,
							    j));
					}
				}
				maxDistancesAtBlocks[i] = Math.Max(maxDistancesAtBlocks[i],
				    closestReqDistance);
			}
		}
		return getIdxAtMinValue(maxDistancesAtBlocks);
	}

	public static int getIdxAtMinValue(int[] array) {
		int idxAtMinValue = 0;
		int minValue = Int32.MaxValue;
		for (int i = 0; i < array.Length; i++) {
			int currentValue = array[i];
			if (currentValue < minValue) {
				minValue = currentValue;
				idxAtMinValue = i;
			}
		}
		return idxAtMinValue;
	}

	public static int distanceBetween(int a, int b) {
		return Math.Abs(a - b);
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;


public class Program {
	// O(br) time | O(br) space - where b is the number of blocks and r is the number of requirements
	public static int ApartmentHunting(List<Dictionary<string, bool> > blocks, string[] reqs) {
		int[][] minDistancesFromBlocks = new int[reqs.Length][];
		for (int i = 0; i < reqs.Length; i++) {
			minDistancesFromBlocks[i] = getMinDistances(blocks, reqs[i]);
		}
		int[] maxDistancesAtBlocks =
		  getMaxDistancesAtBlocks(blocks, minDistancesFromBlocks);
		return getIdxAtMinValue(maxDistancesAtBlocks);
	}

	public static int[] getMinDistances(List<Dictionary<string, bool> > blocks, string req) {
		int[] minDistances = new int[blocks.Count];
		int closestReqIdx = Int32.MaxValue;
		for (int i = 0; i < blocks.Count; i++) {
			if (blocks[i][req]) closestReqIdx = i;
			minDistances[i] = distanceBetween(i, closestReqIdx);
		}
		for (int i = blocks.Count - 1; i >= 0; i--) {
			if (blocks[i][req]) closestReqIdx = i;
			minDistances[i] = Math.Min(minDistances[i], distanceBetween(i,
			    closestReqIdx));
		}
		return minDistances;
	}

	public static int[] getMaxDistancesAtBlocks(List<Dictionary<string, bool> > blocks,
	  int[][] minDistancesFromBlocks) {
		int[] maxDistancesAtBlocks = new int[blocks.Count];
		for (int i = 0; i < blocks.Count; i++) {
			int[] minDistancesAtBlock = new int[minDistancesFromBlocks.Length];
			for (int j = 0; j < minDistancesFromBlocks.Length; j++) {
				minDistancesAtBlock[j] = minDistancesFromBlocks[j][i];
			}
			maxDistancesAtBlocks[i] = arrayMax(minDistancesAtBlock);
		}
		return maxDistancesAtBlocks;
	}

	public static int getIdxAtMinValue(int[] array) {
		int idxAtMinValue = 0;
		int minValue = Int32.MaxValue;
		for (int i = 0; i < array.Length; i++) {
			int currentValue = array[i];
			if (currentValue < minValue) {
				minValue = currentValue;
				idxAtMinValue = i;
			}
		}
		return idxAtMinValue;
	}

	public static int distanceBetween(int a, int b) {
		return Math.Abs(a - b);
	}

	public static int arrayMax(int[] array) {
		int max = array[0];
		foreach (int a in array) {
			if (a > max) {
				max = a;
			}
		}
		return max;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		List<Dictionary<string, bool> > blocks = new List<Dictionary<string, bool> >();

		blocks.Insert(0, new Dictionary<string, bool>());
		blocks[0]["gym"] = false;
		blocks[0]["school"] = true;
		blocks[0]["store"] = false;

		blocks.Insert(1, new Dictionary<string, bool>());
		blocks[1]["gym"] = true;
		blocks[1]["school"] = false;
		blocks[1]["store"] = false;

		blocks.Insert(2, new Dictionary<string, bool>());
		blocks[2]["gym"] = true;
		blocks[2]["school"] = true;
		blocks[2]["store"] = false;

		blocks.Insert(3, new Dictionary<string, bool>());
		blocks[3]["gym"] = false;
		blocks[3]["school"] = true;
		blocks[3]["store"] = false;

		blocks.Insert(4, new Dictionary<string, bool>());
		blocks[4]["gym"] = false;
		blocks[4]["school"] = true;
		blocks[4]["store"] = true;

		string[] reqs = new string[] {"gym", "school", "store"};
		Utils.AssertTrue(Program.ApartmentHunting(blocks, reqs) == 3);
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
	blocks := []Block{
		{
			"gym":    false,
			"school": true,
			"store":  false,
		},
		{
			"gym":    true,
			"school": false,
			"store":  false,
		},
		{
			"gym":    true,
			"school": true,
			"store":  false,
		},
		{
			"gym":    false,
			"school": true,
			"store":  false,
		},
		{
			"gym":    false,
			"school": true,
			"store":  true,
		},
	}
	reqs := []string{"gym", "school", "store"}
	output := ApartmentHunting(blocks, reqs)
	require.Equal(t, output, 3)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "math"

type Block map[string]bool

// O(b^2*r) time | O(b) space - where b is the number of blocks
// and r is the number of requirements.
func ApartmentHunting(blocks []Block, reqs []string) int {
	maxDistancesAtBlocks := make([]int, len(blocks))
	for i := range blocks {
		maxDistancesAtBlocks[i] = -1
		for _, req := range reqs {
			closestReqDistance := math.MaxInt32
			for j := range blocks {
				if blocks[j][req] {
					closestReqDistance = min(closestReqDistance, distanceBetween(i, j))
				}
			}
			maxDistancesAtBlocks[i] = max(maxDistancesAtBlocks[i], closestReqDistance)
		}
	}

	var optimalBlockIdx int
	smallestMaxDistance := math.MaxInt32
	for i, currentDistance := range maxDistancesAtBlocks {
		if currentDistance < smallestMaxDistance {
			smallestMaxDistance = currentDistance
			optimalBlockIdx = i
		}
	}
	return optimalBlockIdx
}

func distanceBetween(a, b int) int {
	if a > b {
		return a - b
	}
	return b - a
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "math"

type Block map[string]bool

// O(br) time | O(br) space - where b is the number of blocks
// and r is the number of requirements.
func ApartmentHunting(blocks []Block, reqs []string) int {
	minDistancesFromBlocks := [][]int{}
	for _, req := range reqs {
		minDistancesFromBlocks = append(minDistancesFromBlocks,
			getMinDistances(blocks, req))
	}
	maxDistancesAtBlocks := getMaxDistancesAtBlocks(blocks, minDistancesFromBlocks)

	var optimalBlockIdx int
	smallestMaxDistance := math.MaxInt32
	for i, currentDistance := range maxDistancesAtBlocks {
		if currentDistance < smallestMaxDistance {
			smallestMaxDistance = currentDistance
			optimalBlockIdx = i
		}
	}
	return optimalBlockIdx
}

func getMinDistances(blocks []Block, req string) []int {
	minDistances := make([]int, len(blocks))
	closestReq := math.MaxInt32
	for i := range blocks {
		if val, found := blocks[i][req]; found && val {
			closestReq = i
		}
		minDistances[i] = distanceBetween(i, closestReq)
	}

	for i := len(blocks) - 1; i >= 0; i-- {
		if val, found := blocks[i][req]; found && val {
			closestReq = i
		}
		minDistances[i] = min(minDistances[i], distanceBetween(i, closestReq))
	}
	return minDistances
}

func getMaxDistancesAtBlocks(blocks []Block, minDistancesFromBlocks [][]int) []int {
	maxDistancesAtBlocks := make([]int, len(blocks))
	for i := range blocks {
		minDistancesAtBlock := []int{}
		for _, distances := range minDistancesFromBlocks {
			minDistancesAtBlock = append(minDistancesAtBlock, distances[i])
		}
		maxDistancesAtBlocks[i] = max(minDistancesAtBlock)
	}
	return maxDistancesAtBlocks
}

func distanceBetween(a, b int) int {
	if a > b {
		return a - b
	}
	return b - a
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func max(array []int) int {
	if len(array) == 0 {
		return 0
	}

	max := array[0]
	for i := 1; i < len(array); i++ {
		if array[i] > max {
			max = array[i]
		}
	}
	return max
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	blocks := []Block{
		{
			"gym":    false,
			"school": true,
			"store":  false,
		},
		{
			"gym":    true,
			"school": false,
			"store":  false,
		},
		{
			"gym":    true,
			"school": true,
			"store":  false,
		},
		{
			"gym":    false,
			"school": true,
			"store":  false,
		},
		{
			"gym":    false,
			"school": true,
			"store":  true,
		},
	}
	reqs := []string{"gym", "school", "store"}
	output := ApartmentHunting(blocks, reqs)
	require.Equal(t, output, 3)
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
    List<Map<String, Boolean>> blocks = new ArrayList<Map<String, Boolean>>();

    blocks.add(0, new HashMap<String, Boolean>());
    blocks.get(0).put("gym", false);
    blocks.get(0).put("school", true);
    blocks.get(0).put("store", false);

    blocks.add(1, new HashMap<String, Boolean>());
    blocks.get(1).put("gym", true);
    blocks.get(1).put("school", false);
    blocks.get(1).put("store", false);

    blocks.add(2, new HashMap<String, Boolean>());
    blocks.get(2).put("gym", true);
    blocks.get(2).put("school", true);
    blocks.get(2).put("store", false);

    blocks.add(3, new HashMap<String, Boolean>());
    blocks.get(3).put("gym", false);
    blocks.get(3).put("school", true);
    blocks.get(3).put("store", false);

    blocks.add(4, new HashMap<String, Boolean>());
    blocks.get(4).put("gym", false);
    blocks.get(4).put("school", true);
    blocks.get(4).put("store", true);

    String[] reqs = new String[] {"gym", "school", "store"};
    Utils.assertTrue(Program.apartmentHunting(blocks, reqs) == 3);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(b^2*r) time | O(b) space - where b is the number of blocks and r is the number of
  // requirements
  public static int apartmentHunting(List<Map<String, Boolean>> blocks, String[] reqs) {
    int[] maxDistancesAtBlocks = new int[blocks.size()];
    Arrays.fill(maxDistancesAtBlocks, Integer.MIN_VALUE);

    for (int i = 0; i < blocks.size(); i++) {
      for (String req : reqs) {
        int closestReqDistance = Integer.MAX_VALUE;
        for (int j = 0; j < blocks.size(); j++) {
          if (blocks.get(j).get(req)) {
            closestReqDistance = Math.min(closestReqDistance, distanceBetween(i, j));
          }
        }
        maxDistancesAtBlocks[i] = Math.max(maxDistancesAtBlocks[i], closestReqDistance);
      }
    }
    return getIdxAtMinValue(maxDistancesAtBlocks);
  }

  public static int getIdxAtMinValue(int[] array) {
    int idxAtMinValue = 0;
    int minValue = Integer.MAX_VALUE;
    for (int i = 0; i < array.length; i++) {
      int currentValue = array[i];
      if (currentValue < minValue) {
        minValue = currentValue;
        idxAtMinValue = i;
      }
    }
    return idxAtMinValue;
  }

  public static int distanceBetween(int a, int b) {
    return Math.abs(a - b);
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(br) time | O(br) space - where b is the number of blocks and r is the number of
  // requirements
  public static int apartmentHunting(List<Map<String, Boolean>> blocks, String[] reqs) {
    int[][] minDistancesFromBlocks = new int[reqs.length][];
    for (int i = 0; i < reqs.length; i++) {
      minDistancesFromBlocks[i] = getMinDistances(blocks, reqs[i]);
    }
    int[] maxDistancesAtBlocks = getMaxDistancesAtBlocks(blocks, minDistancesFromBlocks);
    return getIdxAtMinValue(maxDistancesAtBlocks);
  }

  public static int[] getMinDistances(List<Map<String, Boolean>> blocks, String req) {
    int[] minDistances = new int[blocks.size()];
    int closestReqIdx = Integer.MAX_VALUE;
    for (int i = 0; i < blocks.size(); i++) {
      if (blocks.get(i).get(req)) closestReqIdx = i;
      minDistances[i] = distanceBetween(i, closestReqIdx);
    }
    for (int i = blocks.size() - 1; i >= 0; i--) {
      if (blocks.get(i).get(req)) closestReqIdx = i;
      minDistances[i] = Math.min(minDistances[i], distanceBetween(i, closestReqIdx));
    }
    return minDistances;
  }

  public static int[] getMaxDistancesAtBlocks(
      List<Map<String, Boolean>> blocks, int[][] minDistancesFromBlocks) {
    int[] maxDistancesAtBlocks = new int[blocks.size()];
    for (int i = 0; i < blocks.size(); i++) {
      int[] minDistancesAtBlock = new int[minDistancesFromBlocks.length];
      for (int j = 0; j < minDistancesFromBlocks.length; j++) {
        minDistancesAtBlock[j] = minDistancesFromBlocks[j][i];
      }
      maxDistancesAtBlocks[i] = arrayMax(minDistancesAtBlock);
    }
    return maxDistancesAtBlocks;
  }

  public static int getIdxAtMinValue(int[] array) {
    int idxAtMinValue = 0;
    int minValue = Integer.MAX_VALUE;
    for (int i = 0; i < array.length; i++) {
      int currentValue = array[i];
      if (currentValue < minValue) {
        minValue = currentValue;
        idxAtMinValue = i;
      }
    }
    return idxAtMinValue;
  }

  public static int distanceBetween(int a, int b) {
    return Math.abs(a - b);
  }

  public static int arrayMax(int[] array) {
    int max = array[0];
    for (int a : array) {
      if (a > max) {
        max = a;
      }
    }
    return max;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    List<Map<String, Boolean>> blocks = new ArrayList<Map<String, Boolean>>();

    blocks.add(0, new HashMap<String, Boolean>());
    blocks.get(0).put("gym", false);
    blocks.get(0).put("school", true);
    blocks.get(0).put("store", false);

    blocks.add(1, new HashMap<String, Boolean>());
    blocks.get(1).put("gym", true);
    blocks.get(1).put("school", false);
    blocks.get(1).put("store", false);

    blocks.add(2, new HashMap<String, Boolean>());
    blocks.get(2).put("gym", true);
    blocks.get(2).put("school", true);
    blocks.get(2).put("store", false);

    blocks.add(3, new HashMap<String, Boolean>());
    blocks.get(3).put("gym", false);
    blocks.get(3).put("school", true);
    blocks.get(3).put("store", false);

    blocks.add(4, new HashMap<String, Boolean>());
    blocks.get(4).put("gym", false);
    blocks.get(4).put("school", true);
    blocks.get(4).put("store", true);

    String[] reqs = new String[] {"gym", "school", "store"};
    Utils.assertTrue(Program.apartmentHunting(blocks, reqs) == 3);
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
  const blocks = [
    {
      gym: false,
      school: true,
      store: false,
    },
    {
      gym: true,
      school: false,
      store: false,
    },
    {
      gym: true,
      school: true,
      store: false,
    },
    {
      gym: false,
      school: true,
      store: false,
    },
    {
      gym: false,
      school: true,
      store: true,
    },
  ];
  const reqs = ['gym', 'school', 'store'];
  chai.expect(program.apartmentHunting(blocks, reqs)).to.deep.equal(3);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(b^2*r) time | O(b) space - where b is the number of blocks and r is the number of requirements
function apartmentHunting(blocks, reqs) {
  const maxDistancesAtBlocks = new Array(blocks.length).fill(-Infinity);
  for (let i = 0; i < blocks.length; i++) {
    for (const req of reqs) {
      let closestReqDistance = Infinity;
      for (let j = 0; j < blocks.length; j++) {
        if (blocks[j][req]) {
          closestReqDistance = Math.min(closestReqDistance, distanceBetween(i, j));
        }
      }
      maxDistancesAtBlocks[i] = Math.max(maxDistancesAtBlocks[i], closestReqDistance);
    }
  }
  return getIdxAtMinValue(maxDistancesAtBlocks);
}

function getIdxAtMinValue(array) {
  let idxAtMinValue = 0;
  let minValue = Infinity;
  for (let i = 0; i < array.length; i++) {
    const currentValue = array[i];
    if (currentValue < minValue) {
      minValue = currentValue;
      idxAtMinValue = i;
    }
  }
  return idxAtMinValue;
}

function distanceBetween(a, b) {
  return Math.abs(a - b);
}

exports.apartmentHunting = apartmentHunting;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(br) time | O(br) space - where b is the number of blocks and r is the number of requirements
function apartmentHunting(blocks, reqs) {
  const minDistancesFromBlocks = reqs.map(req => getMinDistances(blocks, req));
  const maxDistancesAtBlocks = getMaxDistancesAtBlocks(blocks, minDistancesFromBlocks);
  return getIdxAtMinValue(maxDistancesAtBlocks);
}

function getMinDistances(blocks, req) {
  const minDistances = new Array(blocks.length);
  let closestReqIdx = Infinity;
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i][req]) closestReqIdx = i;
    minDistances[i] = distanceBetween(i, closestReqIdx);
  }
  for (let i = blocks.length - 1; i >= 0; i--) {
    if (blocks[i][req]) closestReqIdx = i;
    minDistances[i] = Math.min(minDistances[i], distanceBetween(i, closestReqIdx));
  }
  return minDistances;
}

function getMaxDistancesAtBlocks(blocks, minDistancesFromBlocks) {
  const maxDistancesAtBlocks = new Array(blocks.length);
  for (let i = 0; i < blocks.length; i++) {
    const minDistancesAtBlock = minDistancesFromBlocks.map(distances => distances[i]);
    maxDistancesAtBlocks[i] = Math.max(...minDistancesAtBlock);
  }
  return maxDistancesAtBlocks;
}

function getIdxAtMinValue(array) {
  let idxAtMinValue = 0;
  let minValue = Infinity;
  for (let i = 0; i < array.length; i++) {
    const currentValue = array[i];
    if (currentValue < minValue) {
      minValue = currentValue;
      idxAtMinValue = i;
    }
  }
  return idxAtMinValue;
}

function distanceBetween(a, b) {
  return Math.abs(a - b);
}

exports.apartmentHunting = apartmentHunting;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const blocks = [
    {
      gym: false,
      school: true,
      store: false,
    },
    {
      gym: true,
      school: false,
      store: false,
    },
    {
      gym: true,
      school: true,
      store: false,
    },
    {
      gym: false,
      school: true,
      store: false,
    },
    {
      gym: false,
      school: true,
      store: true,
    },
  ];
  const reqs = ['gym', 'school', 'store'];
  chai.expect(program.apartmentHunting(blocks, reqs)).to.deep.equal(3);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.apartmentHunting as apartmentHunting

class ProgramTest {
    @Test
    fun TestCase1() {
        val blocks = listOf<Map<String, Boolean>>(
            mapOf("gym" to false, "school" to true, "store" to false),
            mapOf("gym" to true, "school" to false, "store" to false),
            mapOf("gym" to true, "school" to true, "store" to false),
            mapOf("gym" to false, "school" to true, "store" to false),
            mapOf("gym" to false, "school" to true, "store" to true)
        )
        val reqs = listOf("gym", "school", "store")
        println(apartmentHunting(blocks, reqs))
        assert(apartmentHunting(blocks, reqs) == 3)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.abs
import kotlin.math.max
import kotlin.math.min

// O(b^2*r) time | O(b) space - where b is the number of blocks and r is the number of requirements
fun apartmentHunting(blocks: List<Map<String, Boolean>>, reqs: List<String>): Int {
    val maxDistancesAtBlocks = MutableList(blocks.size) { Int.MIN_VALUE }
    for (i in 0 until blocks.size) {
        for (req in reqs) {
            var closestReqDistance = Int.MAX_VALUE
            for (j in 0 until blocks.size) {
                if (blocks[j].containsKey(req) && blocks[j][req]!!) {
                    closestReqDistance = min(closestReqDistance, distanceBetween(i, j))
                }
            }
            maxDistancesAtBlocks[i] = max(maxDistancesAtBlocks[i], closestReqDistance)
        }
    }
    return getIdxAtMinValue(maxDistancesAtBlocks)
}

fun getIdxAtMinValue(array: MutableList<Int>): Int {
    var idxAtMinValue = 0
    var minValue = Int.MAX_VALUE
    for (i in 0 until array.size) {
        val currentValue = array[i]
        if (currentValue < minValue) {
            minValue = currentValue
            idxAtMinValue = i
        }
    }
    return idxAtMinValue
}

fun distanceBetween(a: Int, b: Int): Int {
    return abs(a - b)
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.abs
import kotlin.math.min

// O(br) time | O(br) space - where b is the number of blocks and r is the number of requirements
fun apartmentHunting(blocks: List<Map<String, Boolean>>, reqs: List<String>): Int {
    val minDistancesFromBlocks = reqs.map { req -> getMinDistances(blocks, req) }
    val maxDistancesAtBlocks = getMaxDistancesAtBlocks(blocks, minDistancesFromBlocks)
    return getIdxAtMinValue(maxDistancesAtBlocks)
}

fun getMinDistances(blocks: List<Map<String, Boolean>>, req: String): List<Int> {
    val minDistances = MutableList<Int>(blocks.size) { 0 }
    var closestReqIdx = Int.MAX_VALUE
    for (i in 0 until blocks.size) {
        if (blocks[i].containsKey(req) && blocks[i][req]!!) closestReqIdx = i
        minDistances[i] = distanceBetween(i, closestReqIdx)
    }
    for (i in blocks.size - 1 downTo 0) {
        if (blocks[i].containsKey(req) && blocks[i][req]!!) closestReqIdx = i
        minDistances[i] = min(minDistances[i], distanceBetween(i, closestReqIdx))
    }
    return minDistances
}

fun getMaxDistancesAtBlocks(blocks: List<Map<String, Boolean>>, minDistancesFromBlocks: List<List<Int>>): List<Int> {
    val maxDistancesAtBlocks = MutableList<Int>(blocks.size) { 0 }
    for (i in 0 until blocks.size) {
        val minDistancesAtBlock = minDistancesFromBlocks.map { distances -> distances[i] }
        maxDistancesAtBlocks[i] = minDistancesAtBlock.max()!!
    }
    return maxDistancesAtBlocks
}

fun getIdxAtMinValue(array: List<Int>): Int {
    var idxAtMinValue = 0
    var minValue = Int.MAX_VALUE
    for (i in 0 until array.size) {
        val currentValue = array[i]
        if (currentValue < minValue) {
            minValue = currentValue
            idxAtMinValue = i
        }
    }
    return idxAtMinValue
}

fun distanceBetween(a: Int, b: Int): Int {
    return abs(a - b)
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.apartmentHunting as apartmentHunting

class ProgramTest {
    @Test
    fun TestCase1() {
        val blocks = listOf<Map<String, Boolean>>(
            mapOf("gym" to false, "school" to true, "store" to false),
            mapOf("gym" to true, "school" to false, "store" to false),
            mapOf("gym" to true, "school" to true, "store" to false),
            mapOf("gym" to false, "school" to true, "store" to false),
            mapOf("gym" to false, "school" to true, "store" to true)
        )
        val reqs = listOf("gym", "school", "store")
        println(apartmentHunting(blocks, reqs))
        assert(apartmentHunting(blocks, reqs) == 3)
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
      let requirements = ["gym", "school", "store"]
      let blocks = [
        [
          "gym": false,
          "school": true,
          "store": false,
        ],
        [
          "gym": true,
          "school": false,
          "store": false,
        ],
        [
          "gym": true,
          "school": true,
          "store": false,
        ],
        [
          "gym": false,
          "school": true,
          "store": false,
        ],
        [
          "gym": false,
          "school": true,
          "store": true,
        ],
      ]

      try assertEqual(3, program.apartmentHunting(blocks, requirements))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(b^2 * r) time | O(b) space
  func apartmentHunting(_ blocks: [[String: Bool]], _ requirements: [String]) -> Int {
    var maxDistancesAtBlocks = Array(repeating: -Int.max, count: blocks.count)
    for i in 0 ..< blocks.count {
      for requirement in requirements {
        var closestReqDistance = Int.max

        for j in 0 ..< blocks.count {
          if let requirementAvailable = blocks[j][requirement], requirementAvailable {
            closestReqDistance = min(closestReqDistance, distanceBetween(i, j))
          }
        }

        maxDistancesAtBlocks[i] = max(maxDistancesAtBlocks[i], closestReqDistance)
      }
    }

    return getIndexAtMinValue(maxDistancesAtBlocks)
  }

  func getIndexAtMinValue(_ array: [Int]) -> Int {
    var indexAtMinValue = 0
    var minValue = Int.max

    for i in 0 ..< array.count {
      let currentValue = array[i]

      if currentValue < minValue {
        minValue = currentValue
        indexAtMinValue = i
      }
    }

    return indexAtMinValue
  }

  func distanceBetween(_ a: Int, _ b: Int) -> Int {
    return abs(a - b)
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(br) time | O(br) space - where b is the number of blocks and r is the number of requirements
  func apartmentHunting(_ blocks: [[String: Bool]], _ requirements: [String]) -> Int {
    let minDistancesFromBlocks = requirements.map { getMinDistances(blocks, $0) }
    let maxDistancesAtBlocks = getMaxDistancesAtBlocks(blocks, minDistancesFromBlocks)

    return getIndexAtMinValue(maxDistancesAtBlocks)
  }

  func getMinDistances(_ blocks: [[String: Bool]], _ requirement: String) -> [Int] {
    var minDistances = Array(repeating: -1, count: blocks.count)
    var closestRequirementIndex = Int.max

    for i in 0 ..< blocks.count {
      if let requirementAvailable = blocks[i][requirement], requirementAvailable {
        closestRequirementIndex = i
      }

      minDistances[i] = distanceBetween(i, closestRequirementIndex)
    }

    for i in (0 ..< blocks.count).reversed() {
      if let requirementAvailable = blocks[i][requirement], requirementAvailable {
        closestRequirementIndex = i
      }

      minDistances[i] = min(minDistances[i], distanceBetween(i, closestRequirementIndex))
    }

    return minDistances
  }

  func getMaxDistancesAtBlocks(_ blocks: [[String: Bool]], _ minDistancesFromBlocks: [[Int]]) -> [Int] {
    var maxDistancesAtBlocks = Array(repeating: -1, count: blocks.count)

    for i in 0 ..< blocks.count {
      let minDistancesAtBlock = minDistancesFromBlocks.map { $0[i] }

      if let max = minDistancesAtBlock.max() {
        maxDistancesAtBlocks[i] = max
      }
    }

    return maxDistancesAtBlocks
  }

  func getIndexAtMinValue(_ array: [Int]) -> Int {
    var indexAtMinValue = 0
    var minValue = Int.max

    for i in 0 ..< array.count {
      let currentValue = array[i]

      if currentValue < minValue {
        minValue = currentValue
        indexAtMinValue = i
      }
    }

    return indexAtMinValue
  }

  func distanceBetween(_ a: Int, _ b: Int) -> Int {
    return abs(a - b)
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let requirements = ["gym", "school", "store"]
      let blocks = [
        [
          "gym": false,
          "school": true,
          "store": false,
        ],
        [
          "gym": true,
          "school": false,
          "store": false,
        ],
        [
          "gym": true,
          "school": true,
          "store": false,
        ],
        [
          "gym": false,
          "school": true,
          "store": false,
        ],
        [
          "gym": false,
          "school": true,
          "store": true,
        ],
      ]

      try assertEqual(3, program.apartmentHunting(blocks, requirements))
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
        blocks = [
            {"gym": False, "school": True, "store": False},
            {"gym": True, "school": False, "store": False},
            {"gym": True, "school": True, "store": False},
            {"gym": False, "school": True, "store": False},
            {"gym": False, "school": True, "store": True},
        ]
        reqs = ["gym", "school", "store"]
        self.assertEqual(program.apartmentHunting(blocks, reqs), 3)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(b^2*r) time | O(b) space - where b is the number of blocks and r is the number of requirements
def apartmentHunting(blocks, reqs):
    maxDistancesAtBlocks = [float("-inf") for block in blocks]
    for i in range(len(blocks)):
        for req in reqs:
            closestReqDistance = float("inf")
            for j in range(len(blocks)):
                if blocks[j][req]:
                    closestReqDistance = min(closestReqDistance, distanceBetween(i, j))
            maxDistancesAtBlocks[i] = max(maxDistancesAtBlocks[i], closestReqDistance)
    return getIdxAtMinValue(maxDistancesAtBlocks)


def getIdxAtMinValue(array):
    idxAtMinValue = 0
    minValue = float("inf")
    for i in range(len(array)):
        currentValue = array[i]
        if currentValue < minValue:
            minValue = currentValue
            idxAtMinValue = i
    return idxAtMinValue


def distanceBetween(a, b):
    return abs(a - b)

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(br) time | O(br) space - where b is the number of blocks and r is the number of requirements
def apartmentHunting(blocks, reqs):
    minDistancesFromBlocks = list(map(lambda req: getMinDistances(blocks, req), reqs))
    maxDistancesAtBlocks = getMaxDistancesAtBlocks(blocks, minDistancesFromBlocks)
    return getIdxAtMinValue(maxDistancesAtBlocks)


def getMinDistances(blocks, req):
    minDistances = [0 for block in blocks]
    closestReqIdx = float("inf")
    for i in range(len(blocks)):
        if blocks[i][req]:
            closestReqIdx = i
        minDistances[i] = distanceBetween(i, closestReqIdx)
    for i in reversed(range(len(blocks))):
        if blocks[i][req]:
            closestReqIdx = i
        minDistances[i] = min(minDistances[i], distanceBetween(i, closestReqIdx))
    return minDistances


def getMaxDistancesAtBlocks(blocks, minDistancesFromBlocks):
    maxDistancesAtBlocks = [0 for block in blocks]
    for i in range(len(blocks)):
        minDistancesAtBlock = list(map(lambda distances: distances[i], minDistancesFromBlocks))
        maxDistancesAtBlocks[i] = max(minDistancesAtBlock)
    return maxDistancesAtBlocks


def getIdxAtMinValue(array):
    idxAtMinValue = 0
    minValue = float("inf")
    for i in range(len(array)):
        currentValue = array[i]
        if currentValue < minValue:
            minValue = currentValue
            idxAtMinValue = i
    return idxAtMinValue


def distanceBetween(a, b):
    return abs(a - b)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        blocks = [
            {"gym": False, "school": True, "store": False},
            {"gym": True, "school": False, "store": False},
            {"gym": True, "school": True, "store": False},
            {"gym": False, "school": True, "store": False},
            {"gym": False, "school": True, "store": True},
        ]
        reqs = ["gym", "school", "store"]
        self.assertEqual(program.apartmentHunting(blocks, reqs), 3)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const blocks = [
    {
      gym: false,
      school: true,
      store: false,
    },
    {
      gym: true,
      school: false,
      store: false,
    },
    {
      gym: true,
      school: true,
      store: false,
    },
    {
      gym: false,
      school: true,
      store: false,
    },
    {
      gym: false,
      school: true,
      store: true,
    },
  ];
  const reqs = ['gym', 'school', 'store'];
  chai.expect(program.apartmentHunting(blocks, reqs)).to.deep.equal(3);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

interface Block {
  [key: string]: boolean;
}

// O(b^2*r) time | O(b) space - where b is the number of blocks and r is the number of requirements
export function apartmentHunting(blocks: Block[], reqs: string[]) {
  const maxDistancesAtBlocks = new Array(blocks.length).fill(-Infinity);
  for (let i = 0; i < blocks.length; i++) {
    for (const req of reqs) {
      let closestReqDistance = Infinity;
      for (let j = 0; j < blocks.length; j++) {
        if (blocks[j][req]) {
          closestReqDistance = Math.min(closestReqDistance, distanceBetween(i, j));
        }
      }
      maxDistancesAtBlocks[i] = Math.max(maxDistancesAtBlocks[i], closestReqDistance);
    }
  }
  return getIdxAtMinValue(maxDistancesAtBlocks);
}

function getIdxAtMinValue(array: number[]) {
  let idxAtMinValue = 0;
  let minValue = Infinity;
  for (let i = 0; i < array.length; i++) {
    const currentValue = array[i];
    if (currentValue < minValue) {
      minValue = currentValue;
      idxAtMinValue = i;
    }
  }
  return idxAtMinValue;
}

function distanceBetween(a: number, b: number) {
  return Math.abs(a - b);
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

interface Block {
  [key: string]: boolean;
}

// O(br) time | O(br) space - where b is the number of blocks and r is the number of requirements
export function apartmentHunting(blocks: Block[], reqs: string[]) {
  const minDistancesFromBlocks = reqs.map(req => getMinDistances(blocks, req));
  const maxDistancesAtBlocks = getMaxDistancesAtBlocks(blocks, minDistancesFromBlocks);
  return getIdxAtMinValue(maxDistancesAtBlocks);
}

function getMinDistances(blocks: Block[], req: string) {
  const minDistances: number[] = new Array(blocks.length);
  let closestReqIdx = Infinity;
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i][req]) closestReqIdx = i;
    minDistances[i] = distanceBetween(i, closestReqIdx);
  }
  for (let i = blocks.length - 1; i >= 0; i--) {
    if (blocks[i][req]) closestReqIdx = i;
    minDistances[i] = Math.min(minDistances[i], distanceBetween(i, closestReqIdx));
  }
  return minDistances;
}

function getMaxDistancesAtBlocks(blocks: Block[], minDistancesFromBlocks: number[][]) {
  const maxDistancesAtBlocks: number[] = new Array(blocks.length);
  for (let i = 0; i < blocks.length; i++) {
    const minDistancesAtBlock = minDistancesFromBlocks.map(distances => distances[i]);
    maxDistancesAtBlocks[i] = Math.max(...minDistancesAtBlock);
  }
  return maxDistancesAtBlocks;
}

function getIdxAtMinValue(array: number[]) {
  let idxAtMinValue = 0;
  let minValue = Infinity;
  for (let i = 0; i < array.length; i++) {
    const currentValue = array[i];
    if (currentValue < minValue) {
      minValue = currentValue;
      idxAtMinValue = i;
    }
  }
  return idxAtMinValue;
}

function distanceBetween(a: number, b: number) {
  return Math.abs(a - b);
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const blocks = [
    {
      gym: false,
      school: true,
      store: false,
    },
    {
      gym: true,
      school: false,
      store: false,
    },
    {
      gym: true,
      school: true,
      store: false,
    },
    {
      gym: false,
      school: true,
      store: false,
    },
    {
      gym: false,
      school: true,
      store: true,
    },
  ];
  const reqs = ['gym', 'school', 'store'];
  chai.expect(program.apartmentHunting(blocks, reqs)).to.deep.equal(3);
});

```

