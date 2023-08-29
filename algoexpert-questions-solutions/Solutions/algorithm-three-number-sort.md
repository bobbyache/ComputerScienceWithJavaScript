# Three Number Sort
<div class="html">
<p>
  You're given an array of integers and another array of three distinct
  integers. The first array is guaranteed to only contain integers that are in
  the second array, and the second array represents a desired order for the
  integers in the first array. For example, a second array of
  <span>[x, y, z]</span> represents a desired order of
  <span>[x, x, ..., x, y, y, ..., y, z, z, ..., z]</span> in the first array.
</p>
<p>
  Write a function that sorts the first array according to the desired order in
  the second array.
</p>
<p>
  The function should perform this in place (i.e., it should mutate the input
  array), and it shouldn't use any auxiliary space (i.e., it should run with
  constant space: <span>O(1)</span> space).
</p>
<p>
  Note that the desired order won't necessarily be ascending or descending and
  that the first array won't necessarily contain all three integers found in the
  second array—it might only contain one or two.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [1, 0, 0, -1, -1, 0, 1, 1]
<span class="CodeEditor-promptParameter">order</span> = [0, 1, -1]
</pre>
<h3>Sample Output</h3>
<pre>
[0, 0, 0, 1, 1, 1, -1, -1]
</pre>
</div>

Hint 1
<p>
What advantage does knowing the three values contained in the array give you, and how can you use that to solve this problem in linear time?
</p>


Hint 2

<p>
Try counting how many times each of the three values appears in the input array. Once you have these counts, you can repopulate the input array as need be.
</p>


Hint 3

<p>
Putting aside the first two hints, try conceptually splitting the original array into three subarrays and moving elements of each unique value into the correct subarray. You'll need to keep track of the respective starting indices of these subarrays.
</p>


Hint 4

<p>
Going off of Hint #3, you can solve this problem either with two passes through the input array or with a single pass. If you do two passes through the array, you'll specifically be positioning the first ordered element during the first pass and the third ordered element during the second pass. You'll be swapping elements from the left side of the array whenever you encounter the first element, and you'll be swapping elements from the right side of the array whenever you encounter the third element. You'll have to keep track of where you last placed a first element or a third element. With a single pass through the array, you'll have to implement both of these strategies and a little more all at once.
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
      vector<int> array = {1, 0, 0, -1, -1, 0, 1, 1};
      vector<int> order = {0, 1, -1};
      vector<int> expected = {0, 0, 0, 1, 1, 1, -1, -1};
      vector<int> actual = threeNumberSort(array, order);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <numeric>
using namespace std;

// O(n) time | O(1) space - where n is the length of the array
vector<int> threeNumberSort(vector<int> array, vector<int> order) {
  vector<int> valueCounts = {0, 0, 0};

  for (int element : array) {
    vector<int>::iterator it = find(order.begin(), order.end(), element);
    int orderIdx = distance(order.begin(), it);
    valueCounts[orderIdx] += 1;
  }

  for (int i = 0; i < 3; i++) {
    int value = order[i];
    int count = valueCounts[i];

    int numElementsBefore =
        accumulate(valueCounts.begin(), valueCounts.begin() + i, 0);
    for (int n = 0; n < count; n++) {
      int currentIdx = numElementsBefore + n;
      array[currentIdx] = value;
    }
  }

  return array;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <algorithm>
using namespace std;

// O(n) time | O(1) space - where n is the length of the array
vector<int> threeNumberSort(vector<int> array, vector<int> order) {
  int firstValue = order[0];
  int thirdValue = order[2];

  int firstIdx = 0;
  for (int i = 0; i < array.size(); i++) {
    if (array[i] == firstValue) {
      swap(array[firstIdx], array[i]);
      firstIdx += 1;
    }
  }

  int thirdIdx = array.size() - 1;
  for (int i = array.size() - 1; i >= 0; i--) {
    if (array[i] == thirdValue) {
      swap(array[thirdIdx], array[i]);
      thirdIdx -= 1;
    }
  }

  return array;
}

```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <algorithm>
using namespace std;

// O(n) time | O(1) space - where n is the length of the array
vector<int> threeNumberSort(vector<int> array, vector<int> order) {
  int firstValue = order[0];
  int secondValue = order[1];

  int firstIdx = 0;
  int secondIdx = 0;
  int thirdIdx = array.size() - 1;

  while (secondIdx <= thirdIdx) {
    int value = array[secondIdx];

    if (value == firstValue) {
      swap(array[firstIdx], array[secondIdx]);
      firstIdx += 1;
      secondIdx += 1;
    } else if (value == secondValue) {
      secondIdx += 1;
    } else {
      swap(array[secondIdx], array[thirdIdx]);
      thirdIdx -= 1;
    }
  }

  return array;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> array = {1, 0, 0, -1, -1, 0, 1, 1};
      vector<int> order = {0, 1, -1};
      vector<int> expected = {0, 0, 0, 1, 1, 1, -1, -1};
      vector<int> actual = threeNumberSort(array, order);
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
		var array = new int[] {1, 0, 0, -1, -1, 0, 1, 1};
		var order = new int[] {0, 1, -1};
		var expected = new int[] {0, 0, 0, 1, 1, 1, -1, -1};
		var actual = new Program().ThreeNumberSort(array, order);
		Utils.AssertTrue(expected.Length == actual.Length);
		for (int i=0; i<expected.Length; i++) {
			Utils.AssertTrue(expected[i] == actual[i]);
		}
	}
}


```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {
	// O(n) time | O(1) space - where n is the length of the array
	public int[] ThreeNumberSort(int[] array, int[] order) {
		int[] valueCounts = new int[] {0, 0, 0};

		foreach (var element in array) {
			int orderIdx = getIndex(order, element);
			valueCounts[orderIdx] += 1;
		}

		for (int i=0; i<3; i++) {
			int value = order[i];
			int count = valueCounts[i];

			int numElementsBefore = getSum(valueCounts, i);
			for (int n=0; n<count; n++) {
				int currentIdx = numElementsBefore + n;
				array[currentIdx] = value;
			}
		}

		return array;
	}

	public int getIndex(int[] array, int element) {
		for (int i=0; i<array.Length; i++) {
			if (array[i] == element) {
				return i;
			}
		}
		return -1;
	}

	public int getSum(int[] array, int end) {
		int sum = 0;
		for (int i=0; i<end; i++) sum += array[i];
		return sum;
	}
}
```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {
	// O(n) time | O(1) space - where n is the length of the array
	public int[] ThreeNumberSort(int[] array, int[] order) {
		int firstValue = order[0];
		int thirdValue = order[2];

		int firstIdx = 0;
		for (int idx=0; idx<array.Length; idx++) {
			if (array[idx] == firstValue) {
				swap(firstIdx, idx, array);
				firstIdx += 1;
			}
		}

		int thirdIdx = array.Length - 1;
		for (int idx=array.Length-1; idx>=0; idx--) {
			if (array[idx] == thirdValue) {
				swap(thirdIdx, idx, array);
				thirdIdx -= 1;
			}
		}

		return array;
	}

	public void swap(int i, int j, int[] array) {
		int temp = array[j];
		array[j] = array[i];
		array[i] = temp;
	}
}
```
### Solution 3 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {
	// O(n) time | O(1) space - where n is the length of the array
	public int[] ThreeNumberSort(int[] array, int[] order) {
		int firstValue = order[0];
		int secondValue = order[1];

		// Keep track of the indices where the values are stored
		int firstIdx = 0;
		int secondIdx = 0;
		int thirdIdx = array.Length - 1;

		while (secondIdx <= thirdIdx) {
			int value = array[secondIdx];

			if (value == firstValue) {
				swap(firstIdx, secondIdx, array);
				firstIdx += 1;
				secondIdx += 1;
			} else if (value == secondValue) {
				secondIdx += 1;
			} else {
				swap(secondIdx, thirdIdx, array);
				thirdIdx -= 1;
			}
		}

		return array;
	}

	public void swap(int i, int j, int[] array) {
		int temp = array[j];
		array[j] = array[i];
		array[i] = temp;
	}
}
```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		var array = new int[] {1, 0, 0, -1, -1, 0, 1, 1};
		var order = new int[] {0, 1, -1};
		var expected = new int[] {0, 0, 0, 1, 1, 1, -1, -1};
		var actual = new Program().ThreeNumberSort(array, order);
		Utils.AssertTrue(expected.Length == actual.Length);
		for (int i=0; i<expected.Length; i++) {
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
	array := []int{1, 0, 0, -1, -1, 0, 1, 1}
	order := []int{0, 1, -1}
	expected := []int{0, 0, 0, 1, 1, 1, -1, -1}
	actual := ThreeNumberSort(array, order)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space - where n is the length of the array
func ThreeNumberSort(array []int, order []int) []int {
	valueCounts := []int{0, 0, 0}

	for _, element := range array {
		orderIdx := indexOf(order, element)
		valueCounts[orderIdx] += 1
	}

	for i := 0; i < 3; i++ {
		value := order[i]
		count := valueCounts[i]

		numElementsBefore := sumSublist(valueCounts, i)
		for n := 0; n < count; n++ {
			currentIdx := numElementsBefore + n
			array[currentIdx] = value
		}
	}
	return array
}

func indexOf(order []int, element int) int {
	for i, item := range order {
		if item == element {
			return i
		}
	}
	return -1
}

func sumSublist(list []int, endIndex int) int {
	sum := 0
	for i, value := range list {
		if i >= endIndex {
			return sum
		}
		sum += value
	}
	return sum
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space - where n is the length of the array
func ThreeNumberSort(array []int, order []int) []int {
	firstValue, thirdValue := order[0], order[2]

	firstIdx := 0
	for idx := range array {
		if array[idx] == firstValue {
			array[firstIdx], array[idx] = array[idx], array[firstIdx]
			firstIdx += 1
		}
	}

	thirdIdx := len(array) - 1
	for idx := len(array) - 1; idx >= 0; idx-- {
		if array[idx] == thirdValue {
			array[thirdIdx], array[idx] = array[idx], array[thirdIdx]
			thirdIdx -= 1
		}
	}

	return array
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space - where n is the length of the array
func ThreeNumberSort(array []int, order []int) []int {
	firstValue, secondValue := order[0], order[1]

	firstIdx, secondIdx, thirdIdx := 0, 0, len(array)-1

	for secondIdx <= thirdIdx {
		value := array[secondIdx]

		if value == firstValue {
			array[firstIdx], array[secondIdx] = array[secondIdx], array[firstIdx]
			firstIdx += 1
			secondIdx += 1
		} else if value == secondValue {
			secondIdx += 1
		} else {
			array[secondIdx], array[thirdIdx] = array[thirdIdx], array[secondIdx]
			thirdIdx -= 1
		}
	}
	return array
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	array := []int{1, 0, 0, -1, -1, 0, 1, 1}
	order := []int{0, 1, -1}
	expected := []int{0, 0, 0, 1, 1, 1, -1, -1}
	actual := ThreeNumberSort(array, order)
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
    var array = new int[] {1, 0, 0, -1, -1, 0, 1, 1};
    var order = new int[] {0, 1, -1};
    var expected = new int[] {0, 0, 0, 1, 1, 1, -1, -1};
    var actual = new Program().threeNumberSort(array, order);
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
  // O(n) time | O(1) space - where n is the length of the array
  public int[] threeNumberSort(int[] array, int[] order) {
    int[] valueCounts = new int[] {0, 0, 0};

    for (int element : array) {
      int orderIdx = getIndex(order, element);
      valueCounts[orderIdx] += 1;
    }

    for (int i = 0; i < 3; i++) {
      int value = order[i];
      int count = valueCounts[i];

      int numElementsBefore = getSum(valueCounts, i);
      for (int n = 0; n < count; n++) {
        int currentIdx = numElementsBefore + n;
        array[currentIdx] = value;
      }
    }

    return array;
  }

  public int getIndex(int[] array, int element) {
    for (int i = 0; i < array.length; i++) {
      if (array[i] == element) {
        return i;
      }
    }
    return -1;
  }

  public int getSum(int[] array, int end) {
    int sum = 0;
    for (int i = 0; i < end; i++) sum += array[i];
    return sum;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(1) space - where n is the length of the array
  public int[] threeNumberSort(int[] array, int[] order) {
    int firstValue = order[0];
    int thirdValue = order[2];

    int firstIdx = 0;
    for (int idx = 0; idx < array.length; idx++) {
      if (array[idx] == firstValue) {
        swap(firstIdx, idx, array);
        firstIdx += 1;
      }
    }

    int thirdIdx = array.length - 1;
    for (int idx = array.length - 1; idx >= 0; idx--) {
      if (array[idx] == thirdValue) {
        swap(thirdIdx, idx, array);
        thirdIdx -= 1;
      }
    }

    return array;
  }

  public void swap(int i, int j, int[] array) {
    int temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
}

```
### Solution 3 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(1) space - where n is the length of the array
  public int[] threeNumberSort(int[] array, int[] order) {
    int firstValue = order[0];
    int secondValue = order[1];

    // Keep track of the indices where the values are stored
    int firstIdx = 0;
    int secondIdx = 0;
    int thirdIdx = array.length - 1;

    while (secondIdx <= thirdIdx) {
      int value = array[secondIdx];

      if (value == firstValue) {
        swap(firstIdx, secondIdx, array);
        firstIdx += 1;
        secondIdx += 1;
      } else if (value == secondValue) {
        secondIdx += 1;
      } else {
        swap(secondIdx, thirdIdx, array);
        thirdIdx -= 1;
      }
    }

    return array;
  }

  public void swap(int i, int j, int[] array) {
    int temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    var array = new int[] {1, 0, 0, -1, -1, 0, 1, 1};
    var order = new int[] {0, 1, -1};
    var expected = new int[] {0, 0, 0, 1, 1, 1, -1, -1};
    var actual = new Program().threeNumberSort(array, order);
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
  const array = [1, 0, 0, -1, -1, 0, 1, 1];
  const order = [0, 1, -1];
  const expected = [0, 0, 0, 1, 1, 1, -1, -1];
  const actual = program.threeNumberSort(array, order);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the array
function threeNumberSort(array, order) {
  const valueCounts = [0, 0, 0];

  for (const element of array) {
    const orderIdx = order.indexOf(element);
    valueCounts[orderIdx]++;
  }

  for (let idx = 0; idx < 3; idx++) {
    const value = order[idx];
    const count = valueCounts[idx];

    const numElementsBefore = valueCounts.slice(0, idx).reduce((a, b) => a + b, 0);
    for (let n = 0; n < count; n++) {
      const currentIdx = numElementsBefore + n;
      array[currentIdx] = value;
    }
  }

  return array;
}

// Do not edit the line below.
exports.threeNumberSort = threeNumberSort;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the array
function threeNumberSort(array, order) {
  const firstValue = order[0];
  const thirdValue = order[2];

  let firstIdx = 0;
  for (let idx = 0; idx < array.length; idx++) {
    if (array[idx] === firstValue) {
      swap(firstIdx, idx, array);
      firstIdx++;
    }
  }

  let thirdIdx = array.length - 1;
  for (let idx = array.length - 1; idx > -1; idx--) {
    if (array[idx] === thirdValue) {
      swap(thirdIdx, idx, array);
      thirdIdx--;
    }
  }

  return array;
}

function swap(i, j, array) {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

// Do not edit the line below.
exports.threeNumberSort = threeNumberSort;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the array
function threeNumberSort(array, order) {
  const firstValue = order[0];
  const secondValue = order[1];

  // Keep track of the indices where the values are stored
  let firstIdx = 0;
  let secondIdx = 0;
  let thirdIdx = array.length - 1;

  while (secondIdx <= thirdIdx) {
    const value = array[secondIdx];

    if (value === firstValue) {
      swap(firstIdx, secondIdx, array);
      firstIdx++;
      secondIdx++;
    } else if (value === secondValue) {
      secondIdx++;
    } else {
      swap(secondIdx, thirdIdx, array);
      thirdIdx -= 1;
    }
  }

  return array;
}

function swap(i, j, array) {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

// Do not edit the line below.
exports.threeNumberSort = threeNumberSort;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const array = [1, 0, 0, -1, -1, 0, 1, 1];
  const order = [0, 1, -1];
  const expected = [0, 0, 0, 1, 1, 1, -1, -1];
  const actual = program.threeNumberSort(array, order);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.threeNumberSort

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = mutableListOf(1, 0, 0, -1, -1, 0, 1, 1)
        val order = mutableListOf(0, 1, -1)
        val expected = mutableListOf(0, 0, 0, 1, 1, 1, -1, -1)
        val output = threeNumberSort(array, order)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(1) space - where n is the length of the array
fun threeNumberSort(array: MutableList<Int>, order: List<Int>): List<Int> {
    val valueCounts = mutableListOf(0, 0, 0)

    for (element in array) {
        val orderIdx = order.indexOf(element)
        valueCounts[orderIdx] += 1
    }

    for (i in 0 until 3) {
        val value = order[i]
        val count = valueCounts[i]

        val numElementsBefore = valueCounts.subList(0, i).sum()
        for (n in 0 until count) {
            val currentIdx = numElementsBefore + n
            array[currentIdx] = value
        }
    }

    return array
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(1) space - where n is the length of the array
fun threeNumberSort(array: MutableList<Int>, order: List<Int>): List<Int> {
    val firstValue = order[0]
    val thirdValue = order[2]

    var firstIdx = 0
    for (idx in 0 until array.size) {
        if (array[idx] == firstValue) {
            swap(firstIdx, idx, array)
            firstIdx += 1
        }
    }

    var thirdIdx = array.size - 1
    for (idx in array.size - 1 downTo 0) {
        if (array[idx] == thirdValue) {
            swap(thirdIdx, idx, array)
            thirdIdx -= 1
        }
    }

    return array
}

fun swap(i: Int, j: Int, array: MutableList<Int>) {
    val temp = array[j]
    array[j] = array[i]
    array[i] = temp
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(1) space - where n is the length of the array
fun threeNumberSort(array: MutableList<Int>, order: List<Int>): List<Int> {
    val firstValue = order[0]
    val secondValue = order[1]

    // Keep track of the indices where the values are stored
    var firstIdx = 0
    var secondIdx = 0
    var thirdIdx = array.size - 1

    while (secondIdx <= thirdIdx) {
        val value = array[secondIdx]

        if (value == firstValue) {
            swap(firstIdx, secondIdx, array)
            firstIdx += 1
            secondIdx += 1
        } else if (value == secondValue) {
            secondIdx += 1
        } else {
            swap(secondIdx, thirdIdx, array)
            thirdIdx -= 1
        }
    }

    return array
}

fun swap(i: Int, j: Int, array: MutableList<Int>) {
    val temp = array[j]
    array[j] = array[i]
    array[i] = temp
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.threeNumberSort

class ProgramTest {
    @Test
    fun TestCase1() {
        val array = mutableListOf(1, 0, 0, -1, -1, 0, 1, 1)
        val order = mutableListOf(0, 1, -1)
        val expected = mutableListOf(0, 0, 0, 1, 1, 1, -1, -1)
        val output = threeNumberSort(array, order)
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
      var array = [1, 0, 0, -1, -1, 0, 1, 1]
      var order = [0, 1, -1]
      var expected = [0, 0, 0, 1, 1, 1, -1, -1]
      var actual = Program().threeNumberSort(&array, order)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the length of the array
  func threeNumberSort(_ array: inout [Int], _ order: [Int]) -> [Int] {
    var valueCounts = [0, 0, 0]

    for element in array {
      let orderIdx = order.firstIndex(of: element)
      valueCounts[orderIdx!] += 1
    }

    for i in 0 ..< 3 {
      let value = order[i]
      let count = valueCounts[i]

      let numElementsBefore = valueCounts[0 ..< i].reduce(0, +)
      for n in 0 ..< count {
        let currentIdx = numElementsBefore + n
        array[currentIdx] = value
      }
    }
    return array
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the length of the array
  func threeNumberSort(_ array: inout [Int], _ order: [Int]) -> [Int] {
    var (firstValue, thirdValue) = (order[0], order[2])

    var firstIdx = 0
    for idx in 0 ..< array.count {
      if array[idx] == firstValue {
        (array[firstIdx], array[idx]) = (array[idx], array[firstIdx])
        firstIdx += 1
      }
    }

    var thirdIdx = array.count - 1
    for idx in stride(from: array.count - 1, through: 0, by: -1) {
      if array[idx] == thirdValue {
        (array[thirdIdx], array[idx]) = (array[idx], array[thirdIdx])
        thirdIdx -= 1
      }
    }
    return array
  }
}

```
### Solution 3 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the length of the array
  func threeNumberSort(_ array: inout [Int], _ order: [Int]) -> [Int] {
    var (firstValue, secondValue) = (order[0], order[1])

    var (firstIdx, secondIdx, thirdIdx) = (0, 0, array.count - 1)

    while secondIdx <= thirdIdx {
      let value = array[secondIdx]

      if value == firstValue {
        (array[firstIdx], array[secondIdx]) = (array[secondIdx], array[firstIdx])
        firstIdx += 1
        secondIdx += 1
      } else if value == secondValue {
        secondIdx += 1
      } else {
        (array[secondIdx], array[thirdIdx]) = (array[thirdIdx], array[secondIdx])
        thirdIdx -= 1
      }
    }
    return array
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var array = [1, 0, 0, -1, -1, 0, 1, 1]
      var order = [0, 1, -1]
      var expected = [0, 0, 0, 1, 1, 1, -1, -1]
      var actual = Program().threeNumberSort(&array, order)
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
        array = [1, 0, 0, -1, -1, 0, 1, 1]
        order = [0, 1, -1]
        expected = [0, 0, 0, 1, 1, 1, -1, -1]
        actual = program.threeNumberSort(array, order)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space - where n is the length of the array
def threeNumberSort(array, order):
    valueCounts = [0, 0, 0]

    for element in array:
        orderIdx = order.index(element)
        valueCounts[orderIdx] += 1

    for i in range(3):
        value = order[i]
        count = valueCounts[i]

        numElementsBefore = sum(valueCounts[:i])
        for n in range(count):
            currentIdx = numElementsBefore + n
            array[currentIdx] = value

    return array

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space - where n is the length of the array
def threeNumberSort(array, order):
    firstValue = order[0]
    thirdValue = order[2]

    firstIdx = 0
    for idx in range(len(array)):
        if array[idx] == firstValue:
            array[firstIdx], array[idx] = array[idx], array[firstIdx]
            firstIdx += 1

    thirdIdx = len(array) - 1
    for idx in range(len(array) - 1, -1, -1):
        if array[idx] == thirdValue:
            array[thirdIdx], array[idx] = array[idx], array[thirdIdx]
            thirdIdx -= 1

    return array

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space - where n is the length of the array
def threeNumberSort(array, order):
    firstValue = order[0]
    secondValue = order[1]

    # Keep track of the indices where the values are stored
    firstIdx, secondIdx, thirdIdx = 0, 0, len(array) - 1

    while secondIdx <= thirdIdx:
        value = array[secondIdx]

        if value == firstValue:
            array[secondIdx], array[firstIdx] = array[firstIdx], array[secondIdx]
            firstIdx += 1
            secondIdx += 1
        elif value == secondValue:
            secondIdx += 1
        else:
            array[secondIdx], array[thirdIdx] = array[thirdIdx], array[secondIdx]
            thirdIdx -= 1

    return array

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        array = [1, 0, 0, -1, -1, 0, 1, 1]
        order = [0, 1, -1]
        expected = [0, 0, 0, 1, 1, 1, -1, -1]
        actual = program.threeNumberSort(array, order)
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
  const array = [1, 0, 0, -1, -1, 0, 1, 1];
  const order = [0, 1, -1];
  const expected = [0, 0, 0, 1, 1, 1, -1, -1];
  const actual = program.threeNumberSort(array, order);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the array
export function threeNumberSort(array: number[], order: number[]) {
  const valueCounts = [0, 0, 0];

  for (const element of array) {
    const orderIdx = order.indexOf(element);
    valueCounts[orderIdx]++;
  }

  for (let idx = 0; idx < 3; idx++) {
    const value = order[idx];
    const count = valueCounts[idx];

    const numElementsBefore = valueCounts.slice(0, idx).reduce((a, b) => a + b, 0);
    for (let n = 0; n < count; n++) {
      const currentIdx = numElementsBefore + n;
      array[currentIdx] = value;
    }
  }

  return array;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the array
export function threeNumberSort(array: number[], order: number[]) {
  const firstValue = order[0];
  const thirdValue = order[2];

  let firstIdx = 0;
  for (let idx = 0; idx < array.length; idx++) {
    if (array[idx] === firstValue) {
      swap(firstIdx, idx, array);
      firstIdx++;
    }
  }

  let thirdIdx = array.length - 1;
  for (let idx = array.length - 1; idx > -1; idx--) {
    if (array[idx] === thirdValue) {
      swap(thirdIdx, idx, array);
      thirdIdx--;
    }
  }

  return array;
}

function swap(i: number, j: number, array: number[]) {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

```
### Solution 3 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the array
export function threeNumberSort(array: number[], order: number[]) {
  const firstValue = order[0];
  const secondValue = order[1];

  // Keep track of the indices where the values are stored
  let firstIdx = 0;
  let secondIdx = 0;
  let thirdIdx = array.length - 1;

  while (secondIdx <= thirdIdx) {
    const value = array[secondIdx];

    if (value === firstValue) {
      swap(firstIdx, secondIdx, array);
      firstIdx++;
      secondIdx++;
    } else if (value === secondValue) {
      secondIdx++;
    } else {
      swap(secondIdx, thirdIdx, array);
      thirdIdx -= 1;
    }
  }

  return array;
}

function swap(i: number, j: number, array: number[]) {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const array = [1, 0, 0, -1, -1, 0, 1, 1];
  const order = [0, 1, -1];
  const expected = [0, 0, 0, 1, 1, 1, -1, -1];
  const actual = program.threeNumberSort(array, order);
  chai.expect(actual).to.deep.equal(expected);
});

```

