# Index Equals Value
<div class="html">
<p>
  Write a function that takes in a sorted array of distinct integers and returns
  the first index in the array that is equal to the value at that index. In
  other words, your function should return the minimum index where
  <span>index == array[index]</span>.
</p>
<p>If there is no such index, your function should return <span>-1</span>.</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [-5, -3, 0, 3, 4, 5, 9]
</pre>
<h3>Sample Output</h3>
<pre>
3 <span class="CodeEditor-promptComment">// 3 == array[3]</span>
</pre>
</div>

Hint 1
<p>
First think about a simple brute-force approach to solve this problem. What is the time complexity of this approach and what improvements could be made to this time complexity?
</p>


Hint 2

<p>
If the brute force solution runs in linear time complexity, then a better solution would have to run in O(log(n)) time. Which algorithm has an O(log(n)) time complexity?
</p>


Hint 3

<p>
Implement a variation of binary search to solve this problem. Think about what conditions or checks must be added to search for the desired index-value pair.
</p>


Hint 4

<p>
As you perform a variation of binary search on the input array, if the value that you're looking at is smaller than its index, cut the left half of the array from the search space, because all values to the left will be smaller than their corresponding indices; this is guaranteed to be true, since left indices will naturally decrement by 1 each and left values will decrement by at least 1 each due to the array being sorted. Similar logic applies to the right side of the array when the value that you're looking at is greater than its index.
</p>


Hint 5

<p>
When you encounter a value that's equal to its index, you'll have to perform some additional logic to make sure that you're not potentially missing other values in the array that are equal to their index and that come before the value that you're looking at.
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
      vector<int> input = {-5, -3, 0, 3, 4, 5, 9};
      int expected = 3;
      int actual = indexEqualsValue(input);
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

// O(n) time | O(1) space - where n is the length of the input array
int indexEqualsValue(vector<int> array) {
  for (int i = 0; i < array.size(); i++) {
    if (i == array[i]) {
      return i;
    }
  }
  return -1;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

int indexEqualsValueHelper(vector<int> &, int leftIndex, int rightIndex);

// O(log(n)) time | O(log(n)) space - where n is the length of the input array
int indexEqualsValue(vector<int> array) {
  return indexEqualsValueHelper(array, 0, array.size() - 1);
}

int indexEqualsValueHelper(vector<int> &array, int leftIndex, int rightIndex) {
  if (leftIndex > rightIndex) {
    return -1;
  }

  int middleIndex = leftIndex + (rightIndex - leftIndex) / 2;
  int middleValue = array[middleIndex];
  if (middleValue < middleIndex) {
    return indexEqualsValueHelper(array, middleIndex + 1, rightIndex);
  } else if (middleValue == middleIndex && middleIndex == 0) {
    return middleIndex;
  } else if (middleValue == middleIndex &&
             array[middleIndex - 1] < middleIndex - 1) {
    return middleIndex;
  } else {
    return indexEqualsValueHelper(array, leftIndex, middleIndex - 1);
  }
}

```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

// O(log(n)) time | O(1) space - where n is the length of the input array
int indexEqualsValue(vector<int> array) {
  int leftIndex = 0;
  int rightIndex = array.size() - 1;

  while (leftIndex <= rightIndex) {
    int middleIndex = leftIndex + (rightIndex - leftIndex) / 2;
    int middleValue = array[middleIndex];

    if (middleValue < middleIndex) {
      leftIndex = middleIndex + 1;
    } else if (middleValue == middleIndex && middleIndex == 0) {
      return middleIndex;
    } else if (middleValue == middleIndex &&
               array[middleIndex - 1] < middleIndex - 1) {
      return middleIndex;
    } else {
      rightIndex = middleIndex - 1;
    }
  }
  return -1;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> input = {-5, -3, 0, 3, 4, 5, 9};
      int expected = 3;
      int actual = indexEqualsValue(input);
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
		Utils.AssertTrue(
			new Program().IndexEqualsValue(new int[] {-5, -3, 0, 3, 4, 5, 9}) == 3);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	// O(n) time | O(1) space - where n is the length of the input array
	public int IndexEqualsValue(int[] array) {
		for (int index = 0; index < array.Length; index++) {
			int value = array[index];
			if (index == value) {
				return index;
			}
		}

		return -1;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	// O(log(n)) time | O(log(n)) space - where n is the length of the input array
	public int IndexEqualsValue(int[] array) {
		return indexEqualsValueHelper(array, 0, array.Length - 1);
	}

	public int indexEqualsValueHelper(int[] array, int leftIndex, int rightIndex) {
		if (leftIndex > rightIndex) {
			return -1;
		}

		int middleIndex = leftIndex + (rightIndex - leftIndex) / 2;
		int middleValue = array[middleIndex];

		if (middleValue < middleIndex) {
			return indexEqualsValueHelper(array, middleIndex + 1, rightIndex);
		} else if ((middleValue == middleIndex) && (middleIndex == 0)) {
			return middleIndex;
		} else if ((middleValue == middleIndex) &&
		  (array[middleIndex - 1] < (middleIndex - 1))) {
			return middleIndex;
		} else {
			return indexEqualsValueHelper(array, leftIndex, middleIndex - 1);
		}
	}
}

```
### Solution 3 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	// O(log(n)) time | O(1) space - where n is the length of the input array
	public int IndexEqualsValue(int[] array) {
		int leftIndex = 0;
		int rightIndex = array.Length - 1;

		while (leftIndex <= rightIndex) {
			int middleIndex = rightIndex + (leftIndex - rightIndex) / 2;
			int middleValue = array[middleIndex];

			if (middleValue < middleIndex) {
				leftIndex = middleIndex + 1;
			} else if ((middleValue == middleIndex) && (middleIndex == 0)) {
				return middleIndex;
			} else if ((middleValue == middleIndex) &&
			  (array[middleIndex - 1] < (middleIndex - 1))) {
				return middleIndex;
			} else {
				rightIndex = middleIndex - 1;
			}
		}

		return -1;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		Utils.AssertTrue(
			new Program().IndexEqualsValue(new int[] {-5, -3, 0, 3, 4, 5, 9}) == 3);
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
	input := []int{-5, -3, 0, 3, 4, 5, 9}
	expected := 3
	actual := IndexEqualsValue(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space - where n is the length of the input array
func IndexEqualsValue(array []int) int {
	for index, value := range array {
		if index == value {
			return index
		}
	}
	return -1
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(log(n)) time | O(log(n)) space - where n is the length of the input array
func IndexEqualsValue(array []int) int {
	return indexEqualsValueHelper(array, 0, len(array)-1)
}

func indexEqualsValueHelper(array []int, leftIndex int, rightIndex int) int {
	if leftIndex > rightIndex {
		return -1
	}

	middleIndex := leftIndex + (rightIndex-leftIndex)/2
	middleValue := array[middleIndex]
	if middleValue < middleIndex {
		return indexEqualsValueHelper(array, middleIndex+1, rightIndex)
	} else if middleValue == middleIndex && middleIndex == 0 {
		return middleIndex
	} else if middleValue == middleIndex && array[middleIndex-1] < middleIndex-1 {
		return middleIndex
	} else {
		return indexEqualsValueHelper(array, leftIndex, middleIndex-1)
	}
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(log(n)) time | O(1) space - where n is the length of the input array
func IndexEqualsValue(array []int) int {
	leftIndex := 0
	rightIndex := len(array) - 1

	for leftIndex <= rightIndex {
		middleIndex := leftIndex + (rightIndex-leftIndex)/2
		middleValue := array[middleIndex]

		if middleValue < middleIndex {
			leftIndex = middleIndex + 1
		} else if middleValue == middleIndex && middleIndex == 0 {
			return middleIndex
		} else if middleValue == middleIndex && array[middleIndex-1] < middleIndex-1 {
			return middleIndex
		} else {
			rightIndex = middleIndex - 1
		}
	}
	return -1
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []int{-5, -3, 0, 3, 4, 5, 9}
	expected := 3
	actual := IndexEqualsValue(input)
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
    Utils.assertTrue(new Program().indexEqualsValue(new int[] {-5, -3, 0, 3, 4, 5, 9}) == 3);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n) time | O(1) space - where n is the length of the input array
  public int indexEqualsValue(int[] array) {
    for (int index = 0; index < array.length; index++) {
      int value = array[index];
      if (index == value) {
        return index;
      }
    }

    return -1;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(log(n)) time | O(log(n)) space - where n is the length of the input array
  public int indexEqualsValue(int[] array) {
    return indexEqualsValueHelper(array, 0, array.length - 1);
  }

  public int indexEqualsValueHelper(int[] array, int leftIndex, int rightIndex) {
    if (leftIndex > rightIndex) {
      return -1;
    }

    int middleIndex = leftIndex + (rightIndex - leftIndex) / 2;
    int middleValue = array[middleIndex];

    if (middleValue < middleIndex) {
      return indexEqualsValueHelper(array, middleIndex + 1, rightIndex);
    } else if ((middleValue == middleIndex) && (middleIndex == 0)) {
      return middleIndex;
    } else if ((middleValue == middleIndex) && (array[middleIndex - 1] < (middleIndex - 1))) {
      return middleIndex;
    } else {
      return indexEqualsValueHelper(array, leftIndex, middleIndex - 1);
    }
  }
}

```
### Solution 3 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(log(n)) time | O(1) space - where n is the length of the input array
  public int indexEqualsValue(int[] array) {
    int leftIndex = 0;
    int rightIndex = array.length - 1;

    while (leftIndex <= rightIndex) {
      int middleIndex = rightIndex + (leftIndex - rightIndex) / 2;
      int middleValue = array[middleIndex];

      if (middleValue < middleIndex) {
        leftIndex = middleIndex + 1;
      } else if ((middleValue == middleIndex) && (middleIndex == 0)) {
        return middleIndex;
      } else if ((middleValue == middleIndex) && (array[middleIndex - 1] < (middleIndex - 1))) {
        return middleIndex;
      } else {
        rightIndex = middleIndex - 1;
      }
    }

    return -1;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    Utils.assertTrue(new Program().indexEqualsValue(new int[] {-5, -3, 0, 3, 4, 5, 9}) == 3);
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
  const array = [-5, -3, 0, 3, 4, 5, 9];
  const expected = 3;
  const actual = program.indexEqualsValue(array);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the input array
function indexEqualsValue(array) {
  for (let index = 0; index < array.length; index++) {
    const value = array[index];
    if (index === value) {
      return index;
    }
  }

  return -1;
}

exports.indexEqualsValue = indexEqualsValue;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(log(n)) time | O(log(n)) space - where n is the length of the input array
function indexEqualsValue(array) {
  return indexEqualsValueHelper(array, 0, array.length - 1);
}

function indexEqualsValueHelper(array, leftIndex, rightIndex) {
  if (leftIndex > rightIndex) return -1;

  const middleIndex = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
  const middleValue = array[middleIndex];

  if (middleValue < middleIndex) {
    return indexEqualsValueHelper(array, middleIndex + 1, rightIndex);
  } else if (middleValue === middleIndex && middleIndex === 0) {
    return middleIndex;
  } else if (middleValue === middleIndex && array[middleIndex - 1] < middleIndex - 1) {
    return middleIndex;
  } else {
    return indexEqualsValueHelper(array, leftIndex, middleIndex - 1);
  }
}

exports.indexEqualsValue = indexEqualsValue;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(log(n)) time | O(1) space - where n is the length of the input array
function indexEqualsValue(array) {
  let leftIndex = 0;
  let rightIndex = array.length - 1;

  while (leftIndex <= rightIndex) {
    const middleIndex = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
    const middleValue = array[middleIndex];

    if (middleValue < middleIndex) {
      leftIndex = middleIndex + 1;
    } else if (middleValue === middleIndex && middleIndex === 0) {
      return middleIndex;
    } else if (middleValue === middleIndex && array[middleIndex - 1] < middleIndex - 1) {
      return middleIndex;
    } else {
      rightIndex = middleIndex - 1;
    }
  }

  return -1;
}

exports.indexEqualsValue = indexEqualsValue;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const array = [-5, -3, 0, 3, 4, 5, 9];
  const expected = 3;
  const actual = program.indexEqualsValue(array);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.indexEqualsValue

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(-5, -3, 0, 3, 4, 5, 9)
        val expected = 3
        val output = indexEqualsValue(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(1) space - where n is the length of the input array
fun indexEqualsValue(array: List<Int>): Int {
    for (index in 0 until array.size) {
        val value = array[index]
        if (index == value) return index
    }
    return -1
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(log(n)) time | O(log(n)) space - where n is the length of the input array
fun indexEqualsValue(array: List<Int>): Int {
    return indexEqualsValueHelper(array, 0, array.size - 1)
}

fun indexEqualsValueHelper(array: List<Int>, leftIndex: Int, rightIndex: Int): Int {
	if (leftIndex > rightIndex) return -1

	val middleIndex = leftIndex + (rightIndex - leftIndex) / 2
	val middleValue = array[middleIndex]

	if (middleValue < middleIndex) {
		return indexEqualsValueHelper(array, middleIndex + 1, rightIndex)
    } else if (middleValue == middleIndex && middleIndex == 0) {
		return middleIndex
    } else if (middleValue == middleIndex && array[middleIndex - 1] < middleIndex - 1) {
		return middleIndex
    } else {
		return indexEqualsValueHelper(array, leftIndex, middleIndex - 1)
    }
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(log(n)) time | O(1) space - where n is the length of the input array
fun indexEqualsValue(array: List<Int>): Int {
    var leftIndex = 0
    var rightIndex = array.size - 1

    while (leftIndex <= rightIndex) {
        val middleIndex = leftIndex + (rightIndex - leftIndex) / 2
        val middleValue = array[middleIndex]

        if (middleValue < middleIndex) {
            leftIndex = middleIndex + 1
        } else if (middleValue == middleIndex && middleIndex == 0) {
            return middleIndex
        } else if (middleValue == middleIndex && array[middleIndex - 1] < middleIndex - 1) {
            return middleIndex
        } else {
            rightIndex = middleIndex - 1
        }
    }

    return -1
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.indexEqualsValue

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(-5, -3, 0, 3, 4, 5, 9)
        val expected = 3
        val output = indexEqualsValue(input)
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
      var input = [-5, -3, 0, 3, 4, 5, 9]
      var expected = 3
      var actual = Program().indexEqualsValue(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the length of the input array
  func indexEqualsValue(_ array: [Int]) -> Int {
    for (index, value) in array.enumerated() {
      if index == value {
        return index
      }
    }
    return -1
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(log(n)) time | O(log(n)) space - where n is the length of the input array
  func indexEqualsValue(_ array: [Int]) -> Int {
    return indexEqualsValueHelper(array, 0, array.count - 1)
  }

  func indexEqualsValueHelper(_ array: [Int], _ leftIndex: Int, _ rightIndex: Int) -> Int {
    if leftIndex > rightIndex {
      return -1
    }

    var middleIndex = leftIndex + (rightIndex - leftIndex) / 2
    var middleValue = array[middleIndex]
    if middleValue < middleIndex {
      return indexEqualsValueHelper(array, middleIndex + 1, rightIndex)
    } else if middleValue == middleIndex, middleIndex == 0 {
      return middleIndex
    } else if middleValue == middleIndex, array[middleIndex - 1] < middleIndex - 1 {
      return middleIndex
    } else {
      return indexEqualsValueHelper(array, leftIndex, middleIndex - 1)
    }
  }
}

```
### Solution 3 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(log(n)) time | O(1) space - where n is the length of the input array
  func indexEqualsValue(_ array: [Int]) -> Int {
    var leftIndex = 0
    var rightIndex = array.count - 1

    while leftIndex <= rightIndex {
      var middleIndex = leftIndex + (rightIndex - leftIndex) / 2
      var middleValue = array[middleIndex]

      if middleValue < middleIndex {
        leftIndex = middleIndex + 1
      } else if middleValue == middleIndex, middleIndex == 0 {
        return middleIndex
      } else if middleValue == middleIndex, array[middleIndex - 1] < middleIndex - 1 {
        return middleIndex
      } else {
        rightIndex = middleIndex - 1
      }
    }
    return -1
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = [-5, -3, 0, 3, 4, 5, 9]
      var expected = 3
      var actual = Program().indexEqualsValue(input)
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
        array = [-5, -3, 0, 3, 4, 5, 9]
        expected = 3
        actual = program.indexEqualsValue(array)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space - where n is the length of the input array
def indexEqualsValue(array):
    for index in range(len(array)):
        value = array[index]
        if index == value:
            return index

    return -1

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(log(n)) time | O(log(n)) space - where n is the length of the input array
def indexEqualsValue(array):
    return indexEqualsValueHelper(array, 0, len(array) - 1)


def indexEqualsValueHelper(array, leftIndex, rightIndex):
    if leftIndex > rightIndex:
        return -1

    middleIndex = leftIndex + (rightIndex - leftIndex) // 2
    middleValue = array[middleIndex]

    if middleValue < middleIndex:
        return indexEqualsValueHelper(array, middleIndex + 1, rightIndex)
    elif middleValue == middleIndex and middleIndex == 0:
        return middleIndex
    elif middleValue == middleIndex and array[middleIndex - 1] < middleIndex - 1:
        return middleIndex
    else:
        return indexEqualsValueHelper(array, leftIndex, middleIndex - 1)

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(log(n)) time | O(1) space - where n is the length of the input array
def indexEqualsValue(array):
    leftIndex = 0
    rightIndex = len(array) - 1

    while leftIndex <= rightIndex:
        middleIndex = leftIndex + (rightIndex - leftIndex) // 2
        middleValue = array[middleIndex]

        if middleValue < middleIndex:
            leftIndex = middleIndex + 1
        elif middleValue == middleIndex and middleIndex == 0:
            return middleIndex
        elif middleValue == middleIndex and array[middleIndex - 1] < middleIndex - 1:
            return middleIndex
        else:
            rightIndex = middleIndex - 1

    return -1

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        array = [-5, -3, 0, 3, 4, 5, 9]
        expected = 3
        actual = program.indexEqualsValue(array)
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
  const array = [-5, -3, 0, 3, 4, 5, 9];
  const expected = 3;
  const actual = program.indexEqualsValue(array);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the input array
export function indexEqualsValue(array: number[]) {
  for (let index = 0; index < array.length; index++) {
    const value = array[index];
    if (index === value) {
      return index;
    }
  }

  return -1;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(log(n)) time | O(log(n)) space - where n is the length of the input array
export function indexEqualsValue(array: number[]) {
  return indexEqualsValueHelper(array, 0, array.length - 1);
}

function indexEqualsValueHelper(array: number[], leftIndex: number, rightIndex: number): number {
  if (leftIndex > rightIndex) return -1;

  const middleIndex = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
  const middleValue = array[middleIndex];

  if (middleValue < middleIndex) {
    return indexEqualsValueHelper(array, middleIndex + 1, rightIndex);
  } else if (middleValue === middleIndex && middleIndex === 0) {
    return middleIndex;
  } else if (middleValue === middleIndex && array[middleIndex - 1] < middleIndex - 1) {
    return middleIndex;
  } else {
    return indexEqualsValueHelper(array, leftIndex, middleIndex - 1);
  }
}

```
### Solution 3 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(log(n)) time | O(1) space - where n is the length of the input array
export function indexEqualsValue(array: number[]) {
  let leftIndex = 0;
  let rightIndex = array.length - 1;

  while (leftIndex <= rightIndex) {
    const middleIndex = leftIndex + Math.floor((rightIndex - leftIndex) / 2);
    const middleValue = array[middleIndex];

    if (middleValue < middleIndex) {
      leftIndex = middleIndex + 1;
    } else if (middleValue === middleIndex && middleIndex === 0) {
      return middleIndex;
    } else if (middleValue === middleIndex && array[middleIndex - 1] < middleIndex - 1) {
      return middleIndex;
    } else {
      rightIndex = middleIndex - 1;
    }
  }

  return -1;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const array = [-5, -3, 0, 3, 4, 5, 9];
  const expected = 3;
  const actual = program.indexEqualsValue(array);
  chai.expect(actual).to.deep.equal(expected);
});

```

