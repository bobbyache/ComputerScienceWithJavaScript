# Missing Numbers
<div class="html">
  <p>
    You're given an unordered list of unique integers <span>nums</span> in the
    range <span>[1, n]</span>, where <span>n</span> represents the length of
    <span>nums + 2</span>. This means that two numbers in this range are missing
    from the list.
  </p>

  <p>
    Write a function that takes in this list and returns a new list with the two
    missing numbers, sorted numerically.
  </p>

  <h3>Sample Input</h3>
  <pre><span class="CodeEditor-promptParameter">nums</span> = [1, 4, 3]</pre>
  <h3>Sample Output</h3>
  <pre>[2, 5] <span class="CodeEditor-promptComment"> // n is 5, meaning the completed list should be [1, 2, 3, 4, 5]</span>
</pre>
</div>

Hint 1
<p>
  How would you solve this problem if there was only one missing number? Can
  that solution be applied to this problem with two missing numbers?
</p>


Hint 2

<p>
  To efficiently find a single missing number, you can sum up all of the values
  in the array as well as sum up all of the values in the expected array (i.e.
  in the range [1, n]). The difference between these values is the missing
  number.
</p>


Hint 3

<p>
  Using the same logic as for a single missing number, you can find the total
  of the two missing numbers. How can you then find which numbers these are?
</p>


Hint 4

<p>
  If you take an average of the two missing numbers, one of the missing numbers
  must be less than that average, and one must be greater than the average.
</p>


Hint 5

<p>
  Since we know there is one missing number on each side of the average, we can
  treat each side of the list as its own problem to find one missing number in
  that list.
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
      vector<int> input = {4, 5, 1, 3};
      vector<int> expected = {2, 6};
      auto actual = missingNumbers(input);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <unordered_set>

using namespace std;

// O(n) time | O(n) space - where n is the length of the input array
vector<int> missingNumbers(vector<int> nums) {
  unordered_set<int> includedNums;
  for (auto num : nums) {
    includedNums.insert(num);
  }

  vector<int> solution = {-1, -1};
  for (int num = 1; num < nums.size() + 3; num++) {
    if (!includedNums.count(num)) {
      if (solution[0] == -1) {
        solution[0] = num;
      } else {
        solution[1] = num;
        break;
      }
    }
  }

  return solution;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

// O(n) time | O(1) space - where n is the length of the input array
vector<int> missingNumbers(vector<int> nums) {
  int total = 0;
  for (int i = 1; i < nums.size() + 3; i++) {
    total += i;
  }

  for (auto num : nums) {
    total -= num;
  }

  int averageMissingValue = total / 2;
  int foundFirstHalf = 0;
  int foundSecondHalf = 0;
  for (auto num : nums) {
    if (num <= averageMissingValue) {
      foundFirstHalf += num;
    } else {
      foundSecondHalf += num;
    }
  }

  int expectedFirstHalf = 0;
  for (int i = 1; i <= averageMissingValue; i++) {
    expectedFirstHalf += i;
  }

  int expectedSecondHalf = 0;
  for (int i = averageMissingValue + 1; i < nums.size() + 3; i++) {
    expectedSecondHalf += i;
  }

  return {expectedFirstHalf - foundFirstHalf,
          expectedSecondHalf - foundSecondHalf};
}

```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <algorithm>

using namespace std;

// O(n) time | O(1) space - where n is the length of the input array
vector<int> missingNumbers(vector<int> nums) {
  int solutionXOR = 0;
  for (int i = 0; i < nums.size() + 3; i++) {
    solutionXOR ^= i;
    if (i < nums.size()) {
      solutionXOR ^= nums[i];
    }
  }

  vector<int> solution(2, 0);
  int setBit = solutionXOR & -solutionXOR;
  for (int i = 0; i < nums.size() + 3; i++) {
    if ((i & setBit) == 0) {
      solution[0] ^= i;
    } else {
      solution[1] ^= i;
    }

    if (i < nums.size()) {
      if ((nums[i] & setBit) == 0) {
        solution[0] ^= nums[i];
      } else {
        solution[1] ^= nums[i];
      }
    }
  }

  sort(solution.begin(), solution.end());
  return solution;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> input = {4, 5, 1, 3};
      vector<int> expected = {2, 6};
      auto actual = missingNumbers(input);
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
		var input = new int[] {4, 5, 1, 3};
		var expected = new int[] {2, 6};
		var actual = new Program().MissingNumbers(input);
		Utils.AssertTrue(expected.Length == actual.Length);
		for (int i = 0; i < expected.Length; i++) {
			Utils.AssertTrue(expected[i] == actual[i]);
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
	// O(n) time | O(n) space - where n is the length of the input array
	public int[] MissingNumbers(int[] nums) {
		HashSet<int> includedNums = new HashSet<int>();
		foreach (var num in nums) {
			includedNums.Add(num);
		}

		int[] solution = new int[] {-1, -1};
		for (int num = 1; num < nums.Length + 3; num++) {
			if (!includedNums.Contains(num)) {
				if (solution[0] == -1) {
					solution[0] = num;
				} else {
					solution[1] = num;
				}
			}
		}

		return solution;
	}
}


```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {
	// O(n) time | O(1) space - where n is the length of the input array
	public int[] MissingNumbers(int[] nums) {
		int total = 0;
		for(int i = 1; i < nums.Length + 3; i++) {
			total += i;
		}

		foreach (var num in nums) {
			total -= num;
		}

		int averageMissingValue = total / 2;
		int foundFirstHalf = 0;
		int foundSecondHalf = 0;
		foreach (var num in nums) {
			if (num <= averageMissingValue) {
				foundFirstHalf += num;
			} else {
				foundSecondHalf += num;
			}
		}

		int expectedFirstHalf = 0;
		for(int i = 1; i <= averageMissingValue; i++) {
			expectedFirstHalf += i;
		}
		int expectedSecondHalf = 0;
		for(int i = averageMissingValue + 1; i < nums.Length + 3; i++) {
			expectedSecondHalf += i;
		}

		return new int[] {expectedFirstHalf - foundFirstHalf,
			          expectedSecondHalf - foundSecondHalf};
	}
}


```
### Solution 3 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {
	// O(n) time | O(1) space - where n is the length of the input array
	public int[] MissingNumbers(int[] nums) {
		int solutionXOR = 0;
		for (int i = 0; i < nums.Length + 3; i++) {
			solutionXOR ^= i;
			if (i < nums.Length) {
				solutionXOR ^= nums[i];
			}
		}

		int[] solution = new int[2];
		int setBit = solutionXOR & -solutionXOR;
		for (int i = 0; i < nums.Length + 3; i++) {
			if ((i & setBit) == 0) {
				solution[0] ^= i;
			} else {
				solution[1] ^= i;
			}

			if (i < nums.Length) {
				if ((nums[i] & setBit) == 0) {
					solution[0] ^= nums[i];
				} else {
					solution[1] ^= nums[i];
				}
			}
		}

		Array.Sort(solution);
		return solution;
	}
}


```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		var input = new int[] {4, 5, 1, 3};
		var expected = new int[] {2, 6};
		var actual = new Program().MissingNumbers(input);
		Utils.AssertTrue(expected.Length == actual.Length);
		for (int i = 0; i < expected.Length; i++) {
			Utils.AssertTrue(expected[i] == actual[i]);
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
	input := []int{4, 5, 1, 3}
	expected := []int{2, 6}
	actual := MissingNumbers(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space - where n is the length of the input array
func MissingNumbers(nums []int) []int {
	includedNums := map[int]bool{}
	for _, num := range nums {
		includedNums[num] = true
	}

	solution := make([]int, 0)
	for num := 1; num < len(nums)+3; num++ {
		if !includedNums[num] {
			solution = append(solution, num)
		}
	}

	return solution
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space - where n is the length of the input array
func MissingNumbers(nums []int) []int {
	total := sum(arrayFromAToB(1, len(nums)+3))

	for _, num := range nums {
		total -= num
	}

	averageMissingValue := total / 2
	foundFirstHalf := 0
	foundSecondHalf := 0
	for _, num := range nums {
		if num <= averageMissingValue {
			foundFirstHalf += num
		} else {
			foundSecondHalf += num
		}
	}

	expectedFirstHalf := sum(arrayFromAToB(1, averageMissingValue+1))
	expectedSecondHalf := sum(arrayFromAToB(averageMissingValue+1, len(nums)+3))

	return []int{expectedFirstHalf - foundFirstHalf, expectedSecondHalf - foundSecondHalf}
}

func arrayFromAToB(a, b int) []int {
	array := make([]int, 0)
	for num := a; num < b; num++ {
		array = append(array, num)
	}
	return array
}

func sum(array []int) int {
	total := 0
	for _, num := range array {
		total += num
	}
	return total
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space - where n is the length of the input array
func MissingNumbers(nums []int) []int {
	solutionXOR := 0
	for i := 0; i < len(nums)+3; i++ {
		solutionXOR ^= i
		if i < len(nums) {
			solutionXOR ^= nums[i]
		}
	}

	solution := []int{0, 0}
	setBit := solutionXOR & -solutionXOR
	for i := 0; i < len(nums)+3; i++ {
		if (i & setBit) == 0 {
			solution[0] ^= i
		} else {
			solution[1] ^= i
		}

		if i < len(nums) {
			if (nums[i] & setBit) == 0 {
				solution[0] ^= nums[i]
			} else {
				solution[1] ^= nums[i]
			}
		}
	}

	if solution[0] > solution[1] {
		solution[0], solution[1] = solution[1], solution[0]
	}
	return solution
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []int{4, 5, 1, 3}
	expected := []int{2, 6}
	actual := MissingNumbers(input)
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
    var input = new int[] {4, 5, 1, 3};
    var expected = new int[] {2, 6};
    var actual = new Program().missingNumbers(input);
    Utils.assertTrue(expected.length == actual.length);
    for (int i = 0; i < expected.length; i++) {
      Utils.assertTrue(expected[i] == actual[i]);
    }
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(n) space - where n is the length of the input array
  public int[] missingNumbers(int[] nums) {
    HashSet<Integer> includedNums = new HashSet<Integer>();
    for (int num : nums) {
      includedNums.add(num);
    }

    int[] solution = new int[] {-1, -1};
    for (int num = 1; num < nums.length + 3; num++) {
      if (!includedNums.contains(num)) {
        if (solution[0] == -1) {
          solution[0] = num;
        } else {
          solution[1] = num;
        }
      }
    }

    return solution;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(1) space - where n is the length of the input array
  public int[] missingNumbers(int[] nums) {
    int total = 0;
    for (int i = 1; i < nums.length + 3; i++) {
      total += i;
    }

    for (int num : nums) {
      total -= num;
    }

    int averageMissingValue = total / 2;
    int foundFirstHalf = 0;
    int foundSecondHalf = 0;
    for (int num : nums) {
      if (num <= averageMissingValue) {
        foundFirstHalf += num;
      } else {
        foundSecondHalf += num;
      }
    }

    int expectedFirstHalf = 0;
    for (int i = 1; i <= averageMissingValue; i++) {
      expectedFirstHalf += i;
    }
    int expectedSecondHalf = 0;
    for (int i = averageMissingValue + 1; i < nums.length + 3; i++) {
      expectedSecondHalf += i;
    }

    return new int[] {expectedFirstHalf - foundFirstHalf, expectedSecondHalf - foundSecondHalf};
  }
}

```
### Solution 3 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(1) space - where n is the length of the input array
  public int[] missingNumbers(int[] nums) {
    int solutionXOR = 0;
    for (int i = 0; i < nums.length + 3; i++) {
      solutionXOR ^= i;
      if (i < nums.length) {
        solutionXOR ^= nums[i];
      }
    }

    int[] solution = new int[2];
    int setBit = solutionXOR & -solutionXOR;
    for (int i = 0; i < nums.length + 3; i++) {
      if ((i & setBit) == 0) {
        solution[0] ^= i;
      } else {
        solution[1] ^= i;
      }

      if (i < nums.length) {
        if ((nums[i] & setBit) == 0) {
          solution[0] ^= nums[i];
        } else {
          solution[1] ^= nums[i];
        }
      }
    }

    Arrays.sort(solution);
    return solution;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    var input = new int[] {4, 5, 1, 3};
    var expected = new int[] {2, 6};
    var actual = new Program().missingNumbers(input);
    Utils.assertTrue(expected.length == actual.length);
    for (int i = 0; i < expected.length; i++) {
      Utils.assertTrue(expected[i] == actual[i]);
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
  const input = [4, 5, 1, 3];
  const expected = [2, 6];
  const actual = program.missingNumbers(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input array
function missingNumbers(nums) {
  const includedNums = new Set(nums);

  const solution = [];
  for (let num = 1; num < nums.length + 3; num++) {
    if (!includedNums.has(num)) {
      solution.push(num);
    }
  }

  return solution;
}

// Do not edit the line below.
exports.missingNumbers = missingNumbers;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the input array
function missingNumbers(nums) {
  let total = sum(arrayFromAToB(1, nums.length + 3));

  for (const num of nums) {
    total -= num;
  }

  const averageMissingValue = Math.floor(total / 2);
  let foundFirstHalf = 0;
  let foundSecondHalf = 0;
  for (const num of nums) {
    if (num <= averageMissingValue) {
      foundFirstHalf += num;
    } else {
      foundSecondHalf += num;
    }
  }

  const expectedFirstHalf = sum(arrayFromAToB(1, averageMissingValue + 1));
  const expectedSecondHalf = sum(arrayFromAToB(averageMissingValue + 1, nums.length + 3));

  return [expectedFirstHalf - foundFirstHalf, expectedSecondHalf - foundSecondHalf];
}

const arrayFromAToB = (a, b) => {
  const array = [];
  for (let num = a; num < b; num++) {
    array.push(num);
  }
  return array;
};

const sum = array => array.reduce((a, b) => a + b);

// Do not edit the line below.
exports.missingNumbers = missingNumbers;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the input array
function missingNumbers(nums) {
  let solutionXOR = 0;
  for (let i = 0; i < nums.length + 3; i++) {
    solutionXOR ^= i;
    if (i < nums.length) {
      solutionXOR ^= nums[i];
    }
  }

  const solution = [0, 0];
  const setBit = solutionXOR & -solutionXOR;
  for (let i = 0; i < nums.length + 3; i++) {
    if ((i & setBit) === 0) {
      solution[0] ^= i;
    } else {
      solution[1] ^= i;
    }

    if (i < nums.length) {
      if ((nums[i] & setBit) === 0) {
        solution[0] ^= nums[i];
      } else {
        solution[1] ^= nums[i];
      }
    }
  }

  solution.sort((a, b) => a - b);
  return solution;
}

// Do not edit the line below.
exports.missingNumbers = missingNumbers;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [4, 5, 1, 3];
  const expected = [2, 6];
  const actual = program.missingNumbers(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.missingNumbers

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(4, 5, 1, 3)
        val expected = listOf(2, 6)
        val output = missingNumbers(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(n) space - where n is the length of the input array
fun missingNumbers(nums: MutableList<Int>): List<Int> {
    val includedNums = nums.toSet()

    val solution = mutableListOf<Int>()
    for (num in 1 until nums.size + 3) {
        if (!includedNums.contains(num)) {
            solution.add(num)
        }
    }

    return solution
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(1) space - where n is the length of the input array
fun missingNumbers(nums: MutableList<Int>): List<Int> {
    var total = arrayFromAToB(1, nums.size + 3).sum()

    for (num in nums) {
        total -= num
    }

    val averageMissingValue = total / 2
    var foundFirstHalf = 0
    var foundSecondHalf = 0
    for (num in nums) {
        if (num <= averageMissingValue) {
            foundFirstHalf += num
        } else {
            foundSecondHalf += num
        }
    }

    val expectedFirstHalf = arrayFromAToB(1, averageMissingValue + 1).sum()
    val expectedSecondHalf = arrayFromAToB(averageMissingValue + 1, nums.size + 3).sum()

    return listOf(expectedFirstHalf - foundFirstHalf, expectedSecondHalf - foundSecondHalf)
}

fun arrayFromAToB(a: Int, b: Int): List<Int> {
    val array = mutableListOf<Int>()
    for (num in a until b) {
        array.add(num)
    }
    return array
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(1) space - where n is the length of the input array
fun missingNumbers(nums: MutableList<Int>): List<Int> {
    var solutionXOR = 0
    for (i in 0 until nums.size + 3) {
        solutionXOR = solutionXOR xor i
        if (i < nums.size) {
            solutionXOR = solutionXOR xor nums[i]
        }
    }

    val solution = mutableListOf(0, 0)
    val setBit = solutionXOR and -solutionXOR
    for (i in 0 until nums.size + 3) {
        if ((i and setBit) == 0) {
            solution[0] = solution[0] xor i
        } else {
            solution[1] = solution[1] xor i
        }

        if (i < nums.size) {
            if ((nums[i] and setBit) == 0) {
                solution[0] = solution[0] xor nums[i]
            } else {
                solution[1] = solution[1] xor nums[i]
            }
        }
    }

    solution.sort()
    return solution
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.missingNumbers

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = mutableListOf(4, 5, 1, 3)
        val expected = listOf(2, 6)
        val output = missingNumbers(input)
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
    runTest("Test Case 1") { () throws in
      var input = [4, 5, 1, 3]
      var expected = [2, 6]
      var actual = Program().missingNumbers(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the length of the input array
  func missingNumbers(_ nums: [Int]) -> [Int] {
    var includedNums = Set<Int>(nums)

    var solution = [Int]()
    for num in 1 ..< (nums.count + 3) {
      if !includedNums.contains(num) {
        solution.append(num)
      }
    }

    return solution
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the length of the input array
  func missingNumbers(_ nums: [Int]) -> [Int] {
    var total = sum(arrayFromAToB(1, nums.count + 3))

    for num in nums {
      total -= num
    }

    let averageMissingValue = total / 2
    var foundFirstHalf = 0
    var foundSecondHalf = 0
    for num in nums {
      if num <= averageMissingValue {
        foundFirstHalf += num
      } else {
        foundSecondHalf += num
      }
    }

    let expectedFirstHalf = sum(arrayFromAToB(1, averageMissingValue + 1))
    let expectedSecondHalf = sum(arrayFromAToB(averageMissingValue + 1, nums.count + 3))

    return [expectedFirstHalf - foundFirstHalf, expectedSecondHalf - foundSecondHalf]
  }

  func arrayFromAToB(_ a: Int, _ b: Int) -> [Int] {
    var array = [Int]()
    for num in a ..< b {
      array.append(num)
    }
    return array
  }

  func sum(_ array: [Int]) -> Int {
    return array.reduce(0, +)
  }
}

```
### Solution 3 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the length of the input array
  func missingNumbers(_ nums: [Int]) -> [Int] {
    var solutionXOR = 0
    for i in 0 ..< (nums.count + 3) {
      solutionXOR ^= i
      if i < nums.count {
        solutionXOR ^= nums[i]
      }
    }

    var solution = [0, 0]
    let setBit = solutionXOR & -solutionXOR
    for i in 0 ..< (nums.count + 3) {
      if (i & setBit) == 0 {
        solution[0] ^= i
      } else {
        solution[1] ^= i
      }

      if i < nums.count {
        if (nums[i] & setBit) == 0 {
          solution[0] ^= nums[i]
        } else {
          solution[1] ^= nums[i]
        }
      }
    }

    if solution[0] > solution[1] {
      solution = [solution[1], solution[0]]
    }
    return solution
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws in
      var input = [4, 5, 1, 3]
      var expected = [2, 6]
      var actual = Program().missingNumbers(input)
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
        input = [4, 5, 1, 3]
        expected = [2, 6]
        actual = program.missingNumbers(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the length of the input array
def missingNumbers(nums):
    includedNums = set(nums)

    solution = []
    for num in range(1, len(nums) + 3):
        if not num in includedNums:
            solution.append(num)

    return solution

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space - where n is the length of the input array
def missingNumbers(nums):
    total = sum(range(1, len(nums) + 3))
    for num in nums:
        total -= num

    averageMissingValue = total // 2
    foundFirstHalf = 0
    foundSecondHalf = 0
    for num in nums:
        if num <= averageMissingValue:
            foundFirstHalf += num
        else:
            foundSecondHalf += num

    expectedFirstHalf = sum(range(1, averageMissingValue + 1))
    expectedSecondHalf = sum(range(averageMissingValue + 1, len(nums) + 3))

    return [expectedFirstHalf - foundFirstHalf, expectedSecondHalf - foundSecondHalf]

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space - where n is the length of the input array
def missingNumbers(nums):
    solutionXOR = 0
    for i in range(0, len(nums) + 3):
        solutionXOR ^= i
        if i < len(nums):
            solutionXOR ^= nums[i]

    solution = [0, 0]
    setBit = solutionXOR & -solutionXOR
    for i in range(0, len(nums) + 3):
        if i & setBit == 0:
            solution[0] ^= i
        else:
            solution[1] ^= i

        if i < len(nums):
            if nums[i] & setBit == 0:
                solution[0] ^= nums[i]
            else:
                solution[1] ^= nums[i]

    return sorted(solution)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [4, 5, 1, 3]
        expected = [2, 6]
        actual = program.missingNumbers(input)
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
  const input = [4, 5, 1, 3];
  const expected = [2, 6];
  const actual = program.missingNumbers(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input array
export function missingNumbers(nums: number[]) {
  const includedNums = new Set(nums);

  const solution: number[] = [];
  for (let num = 1; num < nums.length + 3; num++) {
    if (!includedNums.has(num)) {
      solution.push(num);
    }
  }

  return solution;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the input array
export function missingNumbers(nums: number[]) {
  let total = sum(arrayFromAToB(1, nums.length + 3));

  for (const num of nums) {
    total -= num;
  }

  const averageMissingValue = Math.floor(total / 2);
  let foundFirstHalf = 0;
  let foundSecondHalf = 0;
  for (const num of nums) {
    if (num <= averageMissingValue) {
      foundFirstHalf += num;
    } else {
      foundSecondHalf += num;
    }
  }

  const expectedFirstHalf = sum(arrayFromAToB(1, averageMissingValue + 1));
  const expectedSecondHalf = sum(arrayFromAToB(averageMissingValue + 1, nums.length + 3));

  return [expectedFirstHalf - foundFirstHalf, expectedSecondHalf - foundSecondHalf];
}

const arrayFromAToB = (a: number, b: number) => {
  const array: number[] = [];
  for (let num = a; num < b; num++) {
    array.push(num);
  }
  return array;
};

const sum = (array: number[]) => array.reduce((a, b) => a + b);

```
### Solution 3 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the input array
export function missingNumbers(nums: number[]) {
  let solutionXOR = 0;
  for (let i = 0; i < nums.length + 3; i++) {
    solutionXOR ^= i;
    if (i < nums.length) {
      solutionXOR ^= nums[i];
    }
  }

  const solution = [0, 0];
  const setBit = solutionXOR & -solutionXOR;
  for (let i = 0; i < nums.length + 3; i++) {
    if ((i & setBit) === 0) {
      solution[0] ^= i;
    } else {
      solution[1] ^= i;
    }

    if (i < nums.length) {
      if ((nums[i] & setBit) === 0) {
        solution[0] ^= nums[i];
      } else {
        solution[1] ^= nums[i];
      }
    }
  }

  solution.sort((a, b) => a - b);
  return solution;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [4, 5, 1, 3];
  const expected = [2, 6];
  const actual = program.missingNumbers(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

