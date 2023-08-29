# Three Number Sum
<div class="html">
<p>
  Write a function that takes in a non-empty array of distinct integers and an
  integer representing a target sum. The function should find all triplets in
  the array that sum up to the target sum and return a two-dimensional array of
  all these triplets. The numbers in each triplet should be ordered in ascending
  order, and the triplets themselves should be ordered in ascending order with
  respect to the numbers they hold.
</p>
<p>
  If no three numbers sum up to the target sum, the function should return an
  empty array.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [12, 3, 1, 2, -6, 5, -8, 6]
<span class="CodeEditor-promptParameter">targetSum</span> = 0
</pre>
<h3>Sample Output</h3>
<pre>
[[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]]
</pre>
</div>

Hint 1
<p>
Using three for loops to calculate the sums of all possible triplets in the array would generate an algorithm that runs in O(n^3) time, where n is the length of the input array. Can you come up with something faster using only two for loops?
</p>


Hint 2

<p>
Try sorting the array and traversing it once. At each number, place a left pointer on the number immediately to the right of your current number and a right pointer on the final number in the array. Check if the current number, the left number, and the right number sum up to the target sum. How can you proceed from there, remembering the fact that you sorted the array?
</p>


Hint 3

<p>
Since the array is now sorted (see Hint #2), you know that moving the left pointer mentioned in Hint #2 one place to the right will lead to a greater left number and thus a greater sum. Similarly, you know that moving the right pointer one place to the left will lead to a smaller right number and thus a smaller sum. This means that, depending on the size of each triplet's (current number, left number, right number) sum relative to the target sum, you should either move the left pointer, the right pointer, or both to obtain a potentially valid triplet.
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
      vector<vector<int>> expected{{-8, 2, 6}, {-8, 3, 5}, {-6, 1, 5}};
      assert(threeNumberSum({12, 3, 1, 2, -6, 5, -8, 6}, 0) == expected);
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

// O(n^2) time | O(n) space
vector<vector<int>> threeNumberSum(vector<int> array, int targetSum) {
  sort(array.begin(), array.end());
  vector<vector<int>> triplets;
  for (int i = 0; i < array.size() - 2; i++) {
    int left = i + 1;
    int right = array.size() - 1;
    while (left < right) {
      int currentSum = array[i] + array[left] + array[right];
      if (currentSum == targetSum) {
        triplets.push_back({array[i], array[left], array[right]});
        left++;
        right--;
      } else if (currentSum < targetSum) {
        left++;
      } else if (currentSum > targetSum) {
        right--;
      }
    }
  }
  return triplets;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> expected{{-8, 2, 6}, {-8, 3, 5}, {-6, 1, 5}};
      assert(threeNumberSum({12, 3, 1, 2, -6, 5, -8, 6}, 0) == expected);
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
	private bool compare(List<int[]> triplets1, List<int[]> triplets2) {
		if (triplets1.Count != triplets2.Count) return false;
		for (int i = 0; i < triplets1.Count; i++) {
			if (!Enumerable.SequenceEqual(triplets1[i], triplets2[i])) {
				return false;
			}
		}
		return true;
	}

	[Test]
	public void TestCase1() {
		List<int[]> expected = new List<int[]>();
		expected.Add(new int[] {-8, 2, 6});
		expected.Add(new int[] {-8, 3, 5});
		expected.Add(new int[] {-6, 1, 5});
		List<int[]> output =
		  Program.ThreeNumberSum(new int[] {12, 3, 1, 2, -6, 5, -8, 6}, 0);
		Utils.AssertTrue(this.compare(output, expected));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;

public class Program {
	// O(n^2) time | O(n) space
	public static List<int[]> ThreeNumberSum(int[] array, int targetSum) {
		Array.Sort(array);
		List<int[]> triplets = new List<int[]>();
		for (int i = 0; i < array.Length - 2; i++) {
			int left = i + 1;
			int right = array.Length - 1;
			while (left < right) {
				int currentSum = array[i] + array[left] + array[right];
				if (currentSum == targetSum) {
					int[] newTriplet = {array[i], array[left], array[right]};
					triplets.Add(newTriplet);
					left++;
					right--;
				} else if (currentSum < targetSum) {
					left++;
				} else if (currentSum > targetSum) {
					right--;
				}
			}
		}
		return triplets;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Linq;
using System.Collections.Generic;

public class ProgramTest {
	private bool compare(List<int[]> triplets1, List<int[]> triplets2) {
		if (triplets1.Count != triplets2.Count) return false;
		for (int i = 0; i < triplets1.Count; i++) {
			if (!Enumerable.SequenceEqual(triplets1[i], triplets2[i])) {
				return false;
			}
		}
		return true;
	}

	[Test]
	public void TestCase1() {
		List<int[]> expected = new List<int[]>();
		expected.Add(new int[] {-8, 2, 6});
		expected.Add(new int[] {-8, 3, 5});
		expected.Add(new int[] {-6, 1, 5});
		List<int[]> output =
		  Program.ThreeNumberSum(new int[] {12, 3, 1, 2, -6, 5, -8, 6}, 0);
		Utils.AssertTrue(this.compare(output, expected));
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
	expected := [][]int{{-8, 2, 6}, {-8, 3, 5}, {-6, 1, 5}}
	output := ThreeNumberSum([]int{12, 3, 1, 2, -6, 5, -8, 6}, 0)
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "sort"

// O(n^2) time | O(n) space
func ThreeNumberSum(array []int, target int) [][]int {
	sort.Ints(array)
	triplets := [][]int{}
	for i := 0; i < len(array)-2; i++ {
		left, right := i+1, len(array)-1
		for left < right {
			currentSum := array[i] + array[left] + array[right]
			if currentSum == target {
				triplets = append(triplets, []int{array[i], array[left], array[right]})
				left += 1
				right -= 1
			} else if currentSum < target {
				left += 1
			} else if currentSum > target {
				right -= 1
			}
		}
	}
	return triplets
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	expected := [][]int{{-8, 2, 6}, {-8, 3, 5}, {-6, 1, 5}}
	output := ThreeNumberSum([]int{12, 3, 1, 2, -6, 5, -8, 6}, 0)
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
  private boolean compare(List<Integer[]> triplets1, List<Integer[]> triplets2) {
    if (triplets1.size() != triplets2.size()) return false;
    for (int i = 0; i < triplets1.size(); i++) {
      if (!Arrays.equals(triplets1.get(i), triplets2.get(i))) {
        return false;
      }
    }
    return true;
  }

  @Test
  public void TestCase1() {
    List<Integer[]> expected = new ArrayList<Integer[]>();
    expected.add(new Integer[] {-8, 2, 6});
    expected.add(new Integer[] {-8, 3, 5});
    expected.add(new Integer[] {-6, 1, 5});
    List<Integer[]> output = Program.threeNumberSum(new int[] {12, 3, 1, 2, -6, 5, -8, 6}, 0);
    Utils.assertTrue(this.compare(output, expected));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n^2) time | O(n) space
  public static List<Integer[]> threeNumberSum(int[] array, int targetSum) {
    Arrays.sort(array);
    List<Integer[]> triplets = new ArrayList<Integer[]>();
    for (int i = 0; i < array.length - 2; i++) {
      int left = i + 1;
      int right = array.length - 1;
      while (left < right) {
        int currentSum = array[i] + array[left] + array[right];
        if (currentSum == targetSum) {
          Integer[] newTriplet = {array[i], array[left], array[right]};
          triplets.add(newTriplet);
          left++;
          right--;
        } else if (currentSum < targetSum) {
          left++;
        } else if (currentSum > targetSum) {
          right--;
        }
      }
    }
    return triplets;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  private boolean compare(List<Integer[]> triplets1, List<Integer[]> triplets2) {
    if (triplets1.size() != triplets2.size()) return false;
    for (int i = 0; i < triplets1.size(); i++) {
      if (!Arrays.equals(triplets1.get(i), triplets2.get(i))) {
        return false;
      }
    }
    return true;
  }

  @Test
  public void TestCase1() {
    List<Integer[]> expected = new ArrayList<Integer[]>();
    expected.add(new Integer[] {-8, 2, 6});
    expected.add(new Integer[] {-8, 3, 5});
    expected.add(new Integer[] {-6, 1, 5});
    List<Integer[]> output = Program.threeNumberSum(new int[] {12, 3, 1, 2, -6, 5, -8, 6}, 0);
    Utils.assertTrue(this.compare(output, expected));
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
  chai.expect(program.threeNumberSum([12, 3, 1, 2, -6, 5, -8, 6], 0)).to.deep.equal([
    [-8, 2, 6],
    [-8, 3, 5],
    [-6, 1, 5],
  ]);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space
function threeNumberSum(array, targetSum) {
  array.sort((a, b) => a - b);
  const triplets = [];
  for (let i = 0; i < array.length - 2; i++) {
    let left = i + 1;
    let right = array.length - 1;
    while (left < right) {
      const currentSum = array[i] + array[left] + array[right];
      if (currentSum === targetSum) {
        triplets.push([array[i], array[left], array[right]]);
        left++;
        right--;
      } else if (currentSum < targetSum) {
        left++;
      } else if (currentSum > targetSum) {
        right--;
      }
    }
  }
  return triplets;
}

exports.threeNumberSum = threeNumberSum;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.threeNumberSum([12, 3, 1, 2, -6, 5, -8, 6], 0)).to.deep.equal([
    [-8, 2, 6],
    [-8, 3, 5],
    [-6, 1, 5],
  ]);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.threeNumberSum as threeNumberSum

class ProgramTest {
    @Test
    fun TestCase1() {
        val output = threeNumberSum(mutableListOf<Int>(12, 3, 1, 2, -6, 5, -8, 6), 0)
        val expected = listOf<List<Int>>(
            listOf<Int>(-8, 2, 6),
            listOf<Int>(-8, 3, 5),
            listOf<Int>(-6, 1, 5)
        )
        assert(expected.equals(output))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^2) time | O(n) space
fun threeNumberSum(array: MutableList<Int>, targetSum: Int): List<List<Int>> {
    array.sort()
    val triplets = mutableListOf<MutableList<Int>>()
    for (i in 0 until array.size - 2) {
        var left = i + 1
        var right = array.size - 1
        while (left < right) {
            val currentSum = array[i] + array[left] + array[right]
            if (currentSum == targetSum) {
                triplets.add(mutableListOf(array[i], array[left], array[right]))
                left++
                right--
            } else if (currentSum < targetSum) {
                left++
            } else if (currentSum > targetSum) {
                right--
            }
        }
    }
    return triplets
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.threeNumberSum as threeNumberSum

class ProgramTest {
    @Test
    fun TestCase1() {
        val output = threeNumberSum(mutableListOf<Int>(12, 3, 1, 2, -6, 5, -8, 6), 0)
        val expected = listOf<List<Int>>(
            listOf<Int>(-8, 2, 6),
            listOf<Int>(-8, 3, 5),
            listOf<Int>(-6, 1, 5)
        )
        assert(expected.equals(output))
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
      var array = [12, 3, 1, 2, -6, 5, -8, 6]
      let threeNumberSumResult = program.threeNumberSum(array: &array, targetSum: 0)
      try assertEqual([[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]], threeNumberSumResult)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(n) space
  func threeNumberSum(array: inout [Int], targetSum: Int) -> [[Int]] {
    array.sort()

    var triplets: [[Int]] = []

    for i in 0 ..< array.count - 2 {
      var left = i + 1
      var right = array.count - 1

      while left < right {
        let currentSum = array[i] + array[left] + array[right]

        if currentSum == targetSum {
          triplets.append([array[i], array[left], array[right]])

          left = left + 1
          right = right - 1
        } else if currentSum < targetSum {
          left = left + 1
        } else if currentSum > targetSum {
          right = right - 1
        }
      }
    }
    return triplets
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      var array = [12, 3, 1, 2, -6, 5, -8, 6]
      let threeNumberSumResult = program.threeNumberSum(array: &array, targetSum: 0)
      try assertEqual([[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]], threeNumberSumResult)
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
        self.assertEqual(program.threeNumberSum([12, 3, 1, 2, -6, 5, -8, 6], 0), [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]])

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n) space
def threeNumberSum(array, targetSum):
    array.sort()
    triplets = []
    for i in range(len(array) - 2):
        left = i + 1
        right = len(array) - 1
        while left < right:
            currentSum = array[i] + array[left] + array[right]
            if currentSum == targetSum:
                triplets.append([array[i], array[left], array[right]])
                left += 1
                right -= 1
            elif currentSum < targetSum:
                left += 1
            elif currentSum > targetSum:
                right -= 1
    return triplets

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.threeNumberSum([12, 3, 1, 2, -6, 5, -8, 6], 0), [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]])

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.threeNumberSum([12, 3, 1, 2, -6, 5, -8, 6], 0)).to.deep.equal([
    [-8, 2, 6],
    [-8, 3, 5],
    [-6, 1, 5],
  ]);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

type Triplet = [number, number, number];

// O(n^2) time | O(n) space
export function threeNumberSum(array: number[], targetSum: number) {
  array.sort((a, b) => a - b);
  const triplets: Triplet[] = [];
  for (let i = 0; i < array.length - 2; i++) {
    let left = i + 1;
    let right = array.length - 1;
    while (left < right) {
      const currentSum = array[i] + array[left] + array[right];
      if (currentSum === targetSum) {
        triplets.push([array[i], array[left], array[right]]);
        left++;
        right--;
      } else if (currentSum < targetSum) {
        left++;
      } else if (currentSum > targetSum) {
        right--;
      }
    }
  }
  return triplets;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.threeNumberSum([12, 3, 1, 2, -6, 5, -8, 6], 0)).to.deep.equal([
    [-8, 2, 6],
    [-8, 3, 5],
    [-6, 1, 5],
  ]);
});

```

