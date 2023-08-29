# Waterfall Streams
<div class="html">
<p>
  You're given a two-dimensional array that represents the structure of an
  indoor waterfall and a positive integer that represents the column that the
  waterfall's water source will start at. More specifically, the water source
  will start directly above the structure and will flow downwards.
</p>
<p>
  Each row in the array contains <span>0</span>s and <span>1</span>s, where a
  <span>0</span> represents a free space and a <span>1</span> represents a block
  that water can't pass through. You can imagine that the last row of the array
  contains buckets that the water will eventually flow into; thus, the last row
  of the array will always contain only <span>0</span>s. You can also imagine
  that there are walls on both sides of the structure, meaning that water will
  never leave the structure; it will either be trapped against a wall or flow
  into one of the buckets in the last row.
</p>
<p>
  As water flows downwards, if it hits a block, it splits evenly to the left and
  right-hand side of that block. In other words, 50% of the water flows left and
  50% of it flows right. If a water stream is unable to flow to the left or to
  the right (because of a block or a wall), the water stream in question becomes
  trapped and can no longer continue to flow in that direction; it effectively
  gets stuck in the structure and can no longer flow downwards, meaning that 50%
  of the previous water stream is forever lost.
</p>
<p>
  Lastly, the input array will always contain at least two rows and one column,
  and the space directly below the water source (in the first row of the array)
  will always be empty, allowing the water to start flowing downwards.
</p>
<p>
  Write a function that returns the percentage of water inside each of the
  bottom buckets after the water has flowed through the entire structure.
</p>
<p>
  You can refer to the first 4.5 minutes of this question's video explanation
  for a visual example.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [
  [0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0],
]
<span class="CodeEditor-promptParameter">source</span> = 3
</pre>
<h3>Sample Output</h3>
<pre>
[0, 0, 0, 25, 25, 0, 0]

<span class="CodeEditor-promptComment">// The water will flow as follows:</span>
<span class="CodeEditor-promptComment">// [</span>
<span class="CodeEditor-promptComment">//   [0, 0, 0, ., 0, 0, 0],</span>
<span class="CodeEditor-promptComment">//   [1, ., ., ., ., ., 0],</span>
<span class="CodeEditor-promptComment">//   [0, ., 1, 1, 1, ., 0],</span>
<span class="CodeEditor-promptComment">//   [., ., ., ., ., ., .],</span>
<span class="CodeEditor-promptComment">//   [1, 1, 1, ., ., 1, 0],</span>
<span class="CodeEditor-promptComment">//   [0, 0, 0, ., ., 0, 1],</span>
<span class="CodeEditor-promptComment">//   [0, 0, 0, ., ., 0, 0],</span>
<span class="CodeEditor-promptComment">// ]</span>
</pre>
</div>

Hint 1
<p>
Try not to overthink the solution to this problem. If you were to manually go through an example of water flowing downwards through the waterfall structure, what steps would you follow exactly? Can you simply transcribe these steps into code?
</p>


Hint 2

<p>
To start simple, consider how you would solve this problem if there were only two rows. How would you make water flow from the first row to the second row with your code? Can you make a slight modification to this approach in order to solve this problem for any number of rows?
</p>


Hint 3

<p>
You'll want to traverse through the input array, all the while keeping track of where and how much water flows. To do this, you'll need to represent water with some value (-1, for example, to distinguish it from the other values in the array). Iterate through the input array, row by row, column by column, specifically looking at each current row and the row above it. When you see water in the row above, you'll have to reiterate through both the row above and the current row to see where the water will flow to next (i.e., whether there are open spaces allowing the water to flow sideways and / or downwards), mutating these rows along the way whenever water does flow. You'll have the make sure to keep track of the percentage of water that's flowing whenever water gets split in half.
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
      vector<vector<double>> array = {
          {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
          {1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
          {0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0},
          {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
          {1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0},
          {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0},
          {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
      };
      auto source = 3;
      vector<double> expected = {0.0, 0.0, 0.0, 25.0, 25.0, 0.0, 0.0};
      vector<double> actual = waterfallStreams(array, source);
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

// O(w^2 * h) time | O(w) space - where w and h
// are the width and height of the input array
vector<double> waterfallStreams(vector<vector<double>> array, int source) {
  vector<double> rowAbove = array[0];
  // We'll use -1 to represent water, since 1 is used for a block.
  rowAbove[source] = -1;

  for (int row = 1; row < array.size(); row++) {
    vector<double> currentRow = array[row];
    for (int idx = 0; idx < rowAbove.size(); idx++) {
      double valueAbove = rowAbove[idx];

      bool hasWaterAbove = valueAbove < 0;
      bool hasBlock = currentRow[idx] == 1.0;

      if (!hasWaterAbove) {
        continue;
      }

      if (!hasBlock) {
        // If there is no block in the current column, move the water down.
        currentRow[idx] += valueAbove;
        continue;
      }

      double splitWater = valueAbove / 2;
      // Move water right.
      int rightIdx = idx;
      while (rightIdx + 1 < rowAbove.size()) {
        rightIdx += 1;
        if (rowAbove[rightIdx] == 1.0) { // if there is a block in the way
          break;
        }
        if (currentRow[rightIdx] != 1) { // if there is no block below us
          currentRow[rightIdx] += splitWater;
          break;
        }
      }

      // Move water left.
      int leftIdx = idx;
      while (leftIdx - 1 >= 0) {
        leftIdx -= 1;
        if (rowAbove[leftIdx] == 1.0) { // if there is a block in the way
          break;
        }
        if (currentRow[leftIdx] != 1.0) { // if there is no block below us
          currentRow[leftIdx] += splitWater;
          break;
        }
      }
    }

    rowAbove = currentRow;
  }

  vector<double> finalPercentages;
  for (double num : rowAbove) {
    if (num == 0) {
      finalPercentages.push_back(num);
    } else {
      finalPercentages.push_back(num * -100);
    }
  }
  return finalPercentages;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<double>> array = {
          {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
          {1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
          {0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0},
          {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
          {1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0},
          {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0},
          {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
      };
      auto source = 3;
      vector<double> expected = {0.0, 0.0, 0.0, 25.0, 25.0, 0.0, 0.0};
      vector<double> actual = waterfallStreams(array, source);
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
		double[][] array = new double[][] {
			new double[] {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
			new double[] {1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
			new double[] {0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0},
			new double[] {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
			new double[] {1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0},
			new double[] {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0},
			new double[] {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
		};
		var source = 3;
		double[] expected = {0.0, 0.0, 0.0, 25.0, 25.0, 0.0, 0.0};
		double[] actual = new Program().WaterfallStreams(array, source);
		Utils.AssertTrue(expected.Length == actual.Length);
		for (int i=0; i<expected.Length; i++) Utils.AssertTrue(expected[i] == actual[i]);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {
	// O(w^2 * h) time | O(w) space - where w and h
	// are the width and height of the input array
	public double[] WaterfallStreams(double[][] array, int source) {
		double[] rowAbove = array[0];
		// We'll use -1 to represent water, since 1 is used for a block.
		rowAbove[source] = -1;

		for (int row = 1; row < array.Length; row++) {
			double[] currentRow = array[row];
			for (int idx = 0; idx < rowAbove.Length; idx++) {
				double valueAbove = rowAbove[idx];

				bool hasWaterAbove = valueAbove < 0;
				bool hasBlock = currentRow[idx] == 1.0;

				if (!hasWaterAbove) {
					continue;
				}

				if (!hasBlock) {
					// If there is no block in the current column, move the water down.
					currentRow[idx] += valueAbove;
					continue;
				}

				double splitWater = valueAbove / 2;
				// Move water right.
				int rightIdx = idx;
				while (rightIdx + 1 < rowAbove.Length) {
					rightIdx += 1;
					if (rowAbove[rightIdx] == 1.0) { // if there is a block in the way
						break;
					}
					if (currentRow[rightIdx] != 1.0) { // if there is no block below us
						currentRow[rightIdx] += splitWater;
						break;
					}
				}

				// Move water left.
				int leftIdx = idx;
				while (leftIdx - 1 >= 0) {
					leftIdx -= 1;
					if (rowAbove[leftIdx] == 1.0) { // if there is a block in the way
						break;
					}
					if (currentRow[leftIdx] != 1.0) { // if there is no block below us
						currentRow[leftIdx] += splitWater;
						break;
					}
				}
			}

			rowAbove = currentRow;
		}

		double[] finalPercentages = new double[rowAbove.Length];
		for (int idx=0; idx<rowAbove.Length; idx++) {
			double num = rowAbove[idx];
			if (num == 0) {
				finalPercentages[idx] = num;
			} else {
				finalPercentages[idx] = (num * -100);
			}
		}
		return finalPercentages;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		double[][] array = new double[][] {
			new double[] {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
			new double[] {1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
			new double[] {0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0},
			new double[] {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
			new double[] {1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0},
			new double[] {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0},
			new double[] {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
		};
		var source = 3;
		double[] expected = {0.0, 0.0, 0.0, 25.0, 25.0, 0.0, 0.0};
		double[] actual = new Program().WaterfallStreams(array, source);
		Utils.AssertTrue(expected.Length == actual.Length);
		for (int i=0; i<expected.Length; i++) Utils.AssertTrue(expected[i] == actual[i]);
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
	array := [][]float64{
		{0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
		{1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
		{0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0},
		{0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
		{1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0},
		{0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0},
		{0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
	}
	source := 3
	expected := []float64{0.0, 0.0, 0.0, 25.0, 25.0, 0.0, 0.0}
	actual := WaterfallStreams(array, source)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(w^2 * h) time | O(w) space - where w and h
// are the width and height of the input array
func WaterfallStreams(array [][]float64, source int) []float64 {
	rowAbove := array[0]
	// We'll use -1 to represent water, since 1 is used for a block.
	rowAbove[source] = -1

	for row := 1; row < len(array); row++ {
		currentRow := array[row]
		for idx := range rowAbove {
			valueAbove := rowAbove[idx]

			hasWaterAbove := valueAbove < 0
			hasBlock := currentRow[idx] == 1

			if !hasWaterAbove {
				continue
			}

			if !hasBlock {
				// If there is no block in the current column, move the water down.
				currentRow[idx] += valueAbove
				continue
			}

			splitWater := valueAbove / 2
			// Move water right.
			var rightIdx = idx
			for rightIdx+1 < len(rowAbove) {
				rightIdx += 1
				if rowAbove[rightIdx] == 1.0 {
					break // if there is a block in the way
				}
				if currentRow[rightIdx] != 1.0 { // if there is no block below us
					currentRow[rightIdx] += splitWater
					break
				}
			}

			// Move water left.
			var leftIdx = idx
			for leftIdx-1 >= 0 {
				leftIdx -= 1
				if rowAbove[leftIdx] == 1.0 {
					break // if there is a block in the way
				}
				if currentRow[leftIdx] != 1.0 { // if there is no block below us
					currentRow[leftIdx] += splitWater
					break
				}
			}
		}

		rowAbove = currentRow
	}

	finalPercentages := make([]float64, 0, len(rowAbove))
	for _, num := range rowAbove {
		if num == 0 {
			finalPercentages = append(finalPercentages, num)
		} else {
			finalPercentages = append(finalPercentages, num*-100)
		}
	}
	return finalPercentages
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	array := [][]float64{
		{0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
		{1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
		{0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0},
		{0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
		{1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0},
		{0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0},
		{0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
	}
	source := 3
	expected := []float64{0.0, 0.0, 0.0, 25.0, 25.0, 0.0, 0.0}
	actual := WaterfallStreams(array, source)
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
    double[][] array =
        new double[][] {
          {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
          {1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
          {0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0},
          {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
          {1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0},
          {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0},
          {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
        };
    var source = 3;
    double[] expected = {0.0, 0.0, 0.0, 25.0, 25.0, 0.0, 0.0};
    double[] actual = new Program().waterfallStreams(array, source);
    Utils.assertTrue(expected.length == actual.length);
    for (int i = 0; i < expected.length; i++) Utils.assertTrue(expected[i] == actual[i]);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(w^2 * h) time | O(w) space - where w and h
  // are the width and height of the input array
  public double[] waterfallStreams(double[][] array, int source) {
    double[] rowAbove = array[0];
    // We'll use -1 to represent water, since 1 is used for a block.
    rowAbove[source] = -1;

    for (int row = 1; row < array.length; row++) {
      double[] currentRow = array[row];
      for (int idx = 0; idx < rowAbove.length; idx++) {
        double valueAbove = rowAbove[idx];

        boolean hasWaterAbove = valueAbove < 0;
        boolean hasBlock = currentRow[idx] == 1.0;

        if (!hasWaterAbove) {
          continue;
        }

        if (!hasBlock) {
          // If there is no block in the current column, move the water down.
          currentRow[idx] += valueAbove;
          continue;
        }

        double splitWater = valueAbove / 2;
        // Move water right.
        int rightIdx = idx;
        while (rightIdx + 1 < rowAbove.length) {
          rightIdx += 1;
          if (rowAbove[rightIdx] == 1.0) { // if there is a block in the way
            break;
          }
          if (currentRow[rightIdx] != 1) { // if there is no block below us
            currentRow[rightIdx] += splitWater;
            break;
          }
        }

        // Move water left.
        int leftIdx = idx;
        while (leftIdx - 1 >= 0) {
          leftIdx -= 1;
          if (rowAbove[leftIdx] == 1.0) { // if there is a block in the way
            break;
          }
          if (currentRow[leftIdx] != 1.0) { // if there is no block below us
            currentRow[leftIdx] += splitWater;
            break;
          }
        }
      }

      rowAbove = currentRow;
    }

    double[] finalPercentages = new double[rowAbove.length];
    for (int idx = 0; idx < rowAbove.length; idx++) {
      double num = rowAbove[idx];
      if (num == 0) {
        finalPercentages[idx] = num;
      } else {
        finalPercentages[idx] = (num * -100);
      }
    }
    return finalPercentages;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    double[][] array =
        new double[][] {
          {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
          {1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
          {0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0},
          {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
          {1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0},
          {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0},
          {0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0},
        };
    var source = 3;
    double[] expected = {0.0, 0.0, 0.0, 25.0, 25.0, 0.0, 0.0};
    double[] actual = new Program().waterfallStreams(array, source);
    Utils.assertTrue(expected.length == actual.length);
    for (int i = 0; i < expected.length; i++) Utils.assertTrue(expected[i] == actual[i]);
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
  const array = [
    [0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  const source = 3;
  const expected = [0, 0, 0, 25, 25, 0, 0];
  const actual = program.waterfallStreams(array, source);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(w^2 * h) time | O(w) space - where w and h
// are the width and height of the input array
function waterfallStreams(array, source) {
  let rowAbove = [...array[0]];
  // We'll use -1 to represent water, since 1 is used for a block.
  rowAbove[source] = -1;

  for (let row = 1; row < array.length; row++) {
    const currentRow = [...array[row]];

    for (let idx = 0; idx < rowAbove.length; idx++) {
      const valueAbove = rowAbove[idx];

      const hasWaterAbove = valueAbove < 0;
      const hasBlock = currentRow[idx] === 1;

      if (!hasWaterAbove) {
        continue;
      }

      if (!hasBlock) {
        // If there is no block in the current column, move the water down.
        currentRow[idx] += valueAbove;
        continue;
      }

      const splitWater = valueAbove / 2;

      // Move water right
      let rightIdx = idx;
      while (rightIdx + 1 < rowAbove.length) {
        rightIdx++;
        if (rowAbove[rightIdx] === 1) {
          // if there is a block in the way
          break;
        }
        if (currentRow[rightIdx] !== 1) {
          //if there is no block below us
          currentRow[rightIdx] += splitWater;
          break;
        }
      }

      // Move water left
      let leftIdx = idx;
      while (leftIdx - 1 >= 0) {
        leftIdx--;
        if (rowAbove[leftIdx] === 1) {
          // if there is a block in the way
          break;
        }
        if (currentRow[leftIdx] !== 1) {
          // if there is no block below us
          currentRow[leftIdx] += splitWater;
          break;
        }
      }
    }
    rowAbove = currentRow;
  }

  // Convert our negative values to positive percentages.
  const finalPercentages = rowAbove.map(num => (num < 0 ? num * -100 : num));

  return finalPercentages;
}

exports.waterfallStreams = waterfallStreams;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const array = [
    [0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  const source = 3;
  const expected = [0, 0, 0, 25, 25, 0, 0];
  const actual = program.waterfallStreams(array, source);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.waterfallStreams

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = listOf(
            listOf(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0),
            listOf(1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0),
            listOf(0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0),
            listOf(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0),
            listOf(1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0),
            listOf(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0),
            listOf(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)
        )
        val source = 3
        val expected = listOf(0.0, 0.0, 0.0, 25.0, 25.0, 0.0, 0.0)
        val output = waterfallStreams(array, source)
        println(output)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(w^2 * h) time | O(w) space - where w and h
// are the width and height of the input array
fun waterfallStreams(array: List<List<Double>>, source: Int): List<Double> {
    var rowAbove = array[0].toMutableList()
    // We'll use -1 to represent water, since 1 is used for a block.
    rowAbove[source] = -1.0

    for (row in 1 until array.size) {
        val currentRow = array[row].toMutableList()

        for (idx in 0 until rowAbove.size) {
            val valueAbove = rowAbove[idx]

            val hasWaterAbove = valueAbove < 0
            val hasBlock = currentRow[idx] == 1.0

            if (!hasWaterAbove) continue

            if (!hasBlock) {
                // If there is no block in the current column, move the water down.
                currentRow[idx] += valueAbove
                continue
            }

            val splitWater = valueAbove.toDouble() / 2

            // Move water right.
            var rightIdx = idx
            while (rightIdx + 1 < rowAbove.size) {
                rightIdx += 1
                if (rowAbove[rightIdx] == 1.0) break // if there is a block in the way
                if (currentRow[rightIdx] != 1.0) { // if there is no block below us
                    currentRow[rightIdx] += splitWater
                    break
                }
            }

            // Move water left.
            var leftIdx = idx
            while (leftIdx - 1 >= 0) {
                leftIdx -= 1
                if (rowAbove[leftIdx] == 1.0) break // if there is a block in the way
                if (currentRow[leftIdx] != 1.0) { // if there is no block below us
                    currentRow[leftIdx] += splitWater
                    break
                }
            }
        }

        rowAbove = currentRow
    }

    // Convert our negative values to positive percentages.
    val finalPercentages = rowAbove.map { num -> if (num == 0.0) 0.0 else num * -100 }

    return finalPercentages
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.waterfallStreams

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = listOf(
            listOf(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0),
            listOf(1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0),
            listOf(0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0),
            listOf(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0),
            listOf(1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0),
            listOf(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0),
            listOf(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)
        )
        val source = 3
        val expected = listOf(0.0, 0.0, 0.0, 25.0, 25.0, 0.0, 0.0)
        val output = waterfallStreams(array, source)
        println(output)
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
      var array = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      ]
      var source = 3
      var expected = [0.0, 0.0, 0.0, 25.0, 25.0, 0.0, 0.0]
      var actual = Program().waterfallStreams(array, source)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(w^2 * h) time | O(w) space - where w and h
  // are the width and height of the input array
  func waterfallStreams(_ array: [[Double]], _ source: Int) -> [Double] {
    var rowAbove = array[0]
    // We'll use -1 to represent water, since 1 is used for a block.
    rowAbove[source] = -1

    for row in stride(from: 1, to: array.count, by: 1) {
      var currentRow = array[row]
      for idx in 0 ..< rowAbove.count {
        var valueAbove = rowAbove[idx]

        var hasWaterAbove = valueAbove < 0
        var hasBlock = currentRow[idx] == 1

        if !hasWaterAbove {
          continue
        }

        if !hasBlock {
          // If there is no block in the current column, move the water down.
          currentRow[idx] += valueAbove
          continue
        }

        var splitWater = valueAbove / 2
        // Move water right.
        var rightIdx = idx
        while rightIdx + 1 < rowAbove.count {
          rightIdx += 1
          if rowAbove[rightIdx] == 1.0 {
            break // if there is a block in the way
          }
          if currentRow[rightIdx] != 1.0 { // if there is no block below us
            currentRow[rightIdx] += splitWater
            break
          }
        }

        // Move water left.
        var leftIdx = idx
        while leftIdx - 1 >= 0 {
          leftIdx -= 1
          if rowAbove[leftIdx] == 1.0 {
            break // if there is a block in the way
          }
          if currentRow[leftIdx] != 1.0 { // if there is no block below us
            currentRow[leftIdx] += splitWater
            break
          }
        }
      }

      rowAbove = currentRow
    }

    var finalPercentages = [Double]()
    for num in rowAbove {
      if num == 0 {
        finalPercentages.append(num)
      } else {
        finalPercentages.append(num * (-100))
      }
    }
    return finalPercentages
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var array = [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      ]
      var source = 3
      var expected = [0.0, 0.0, 0.0, 25.0, 25.0, 0.0, 0.0]
      var actual = Program().waterfallStreams(array, source)
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
        array = [
            [0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
        ]
        source = 3
        expected = [0, 0, 0, 25, 25, 0, 0]
        actual = program.waterfallStreams(array, source)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(w^2 * h) time | O(w) space - where w and h
# are the width and height of the input array
def waterfallStreams(array, source):
    rowAbove = array[0][:]
    # We'll use -1 to represent water, since 1 is used for a block.
    rowAbove[source] = -1

    for row in range(1, len(array)):
        currentRow = array[row][:]

        for idx in range(len(rowAbove)):
            valueAbove = rowAbove[idx]

            hasWaterAbove = valueAbove < 0
            hasBlock = currentRow[idx] == 1

            if not hasWaterAbove:
                continue

            if not hasBlock:
                # If there is no block in the current column, move the water down.
                currentRow[idx] += valueAbove
                continue

            splitWater = valueAbove / 2

            # Move water right.
            rightIdx = idx
            while rightIdx + 1 < len(rowAbove):
                rightIdx += 1
                if rowAbove[rightIdx] == 1:  # if there is a block in the way
                    break
                if currentRow[rightIdx] != 1:  # if there is no block below us
                    currentRow[rightIdx] += splitWater
                    break

            # Move water left.
            leftIdx = idx
            while leftIdx - 1 >= 0:
                leftIdx -= 1
                if rowAbove[leftIdx] == 1:  # if there is a block in the way
                    break
                if currentRow[leftIdx] != 1:  # if there is no block below us
                    currentRow[leftIdx] += splitWater
                    break

        rowAbove = currentRow

    # Convert our negative values to positive percentages.
    finalPercentages = list(map(lambda num: num * -100, rowAbove))

    return finalPercentages

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        array = [
            [0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0],
        ]
        source = 3
        expected = [0, 0, 0, 25, 25, 0, 0]
        actual = program.waterfallStreams(array, source)
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
  const array = [
    [0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  const source = 3;
  const expected = [0, 0, 0, 25, 25, 0, 0];
  const actual = program.waterfallStreams(array, source);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(w^2 * h) time | O(w) space - where w and h
// are the width and height of the input array
export function waterfallStreams(array: number[][], source: number) {
  let rowAbove = [...array[0]];
  // We'll use -1 to represent water, since 1 is used for a block.
  rowAbove[source] = -1;

  for (let row = 1; row < array.length; row++) {
    const currentRow = [...array[row]];

    for (let idx = 0; idx < rowAbove.length; idx++) {
      const valueAbove = rowAbove[idx];

      const hasWaterAbove = valueAbove < 0;
      const hasBlock = currentRow[idx] === 1;

      if (!hasWaterAbove) {
        continue;
      }

      if (!hasBlock) {
        // If there is no block in the current column, move the water down.
        currentRow[idx] += valueAbove;
        continue;
      }

      const splitWater = valueAbove / 2;

      // Move water right
      let rightIdx = idx;
      while (rightIdx + 1 < rowAbove.length) {
        rightIdx++;
        if (rowAbove[rightIdx] === 1) {
          // if there is a block in the way
          break;
        }
        if (currentRow[rightIdx] !== 1) {
          //if there is no block below us
          currentRow[rightIdx] += splitWater;
          break;
        }
      }

      // Move water left
      let leftIdx = idx;
      while (leftIdx - 1 >= 0) {
        leftIdx--;
        if (rowAbove[leftIdx] === 1) {
          // if there is a block in the way
          break;
        }
        if (currentRow[leftIdx] !== 1) {
          // if there is no block below us
          currentRow[leftIdx] += splitWater;
          break;
        }
      }
    }
    rowAbove = currentRow;
  }

  // Convert our negative values to positive percentages.
  const finalPercentages = rowAbove.map(num => (num < 0 ? num * -100 : num));

  return finalPercentages;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const array = [
    [0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0],
  ];
  const source = 3;
  const expected = [0, 0, 0, 25, 25, 0, 0];
  const actual = program.waterfallStreams(array, source);
  chai.expect(actual).to.deep.equal(expected);
});

```

