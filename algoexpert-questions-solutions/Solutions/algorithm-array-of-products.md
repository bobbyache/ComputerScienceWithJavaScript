# Array Of Products
<div class="html">
<p>
  Write a function that takes in a non-empty array of integers and returns an
  array of the same length, where each element in the output array is equal to
  the product of every other number in the input array.
</p>
<p>
  In other words, the value at <span>output[i]</span> is equal to the product of
  every number in the input array other than <span>input[i]</span>.
</p>
<p>Note that you're expected to solve this problem without using division.</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [5, 1, 4, 2]
</pre>
<h3>Sample Output</h3>
<pre>
[8, 40, 10, 20]
<span class="CodeEditor-promptComment">// 8 is equal to 1 x 4 x 2</span>
<span class="CodeEditor-promptComment">// 40 is equal to 5 x 4 x 2</span>
<span class="CodeEditor-promptComment">// 10 is equal to 5 x 1 x 2</span>
<span class="CodeEditor-promptComment">// 20 is equal to 5 x 1 x 4</span>
</pre>
</div>

Hint 1
<p>
Think about the most naive approach to solving this problem. How can we do exactly what the problem wants us to do without focusing at all on time and space complexity?
</p>


Hint 2

<p>
Understand how output[i] is being calculated. How can we calculate the product of every element other than the one at the current index? Can we do this with just one loop through the input array, or do we have to do multiple loops?
</p>


Hint 3

<p>
For each index in the input array, try calculating the product of every element to the left and the product of every element to the right. You can do this with two loops through the array: one from left to right and one from right to left. How can these products help us?
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
      vector<int> input = {5, 1, 4, 2};
      vector<int> expected = {8, 40, 10, 20};
      vector<int> actual = arrayOfProducts(input);
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

// O(n^2) time | O(n) space - where n is the length of the input array
vector<int> arrayOfProducts(vector<int> array) {
  vector<int> products(array.size());

  for (int i = 0; i < array.size(); i++) {
    int runningProduct = 1;
    for (int j = 0; j < array.size(); j++) {
      if (i != j) {
        runningProduct *= array[j];
      }
    }
    products[i] = runningProduct;
  }
  return products;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>

using namespace std;

// O(n) time | O(n) space - where n is the number of elements in the input array
vector<int> arrayOfProducts(vector<int> array) {
  vector<int> products(array.size(), 1);
  vector<int> leftProducts(array.size(), 1);
  vector<int> rightProducts(array.size(), 1);

  int leftRunningProduct = 1;
  for (int i = 0; i < array.size(); i++) {
    leftProducts[i] = leftRunningProduct;
    leftRunningProduct *= array[i];
  }

  int rightRunningProduct = 1;
  for (int i = array.size() - 1; i >= 0; i--) {
    rightProducts[i] = rightRunningProduct;
    rightRunningProduct *= array[i];
  }

  for (int i = 0; i < array.size(); i++) {
    products[i] = leftProducts[i] * rightProducts[i];
  }

  return products;
}

```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>

using namespace std;

// O(n) time | O(n) space - where n is the number of elements in the input array
vector<int> arrayOfProducts(vector<int> array) {
  vector<int> products(array.size(), 1);

  int leftRunningProduct = 1;
  for (int i = 0; i < array.size(); i++) {
    products[i] = leftRunningProduct;
    leftRunningProduct *= array[i];
  }

  int rightRunningProduct = 1;
  for (int i = array.size() - 1; i >= 0; i--) {
    products[i] *= rightRunningProduct;
    rightRunningProduct *= array[i];
  }

  return products;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> input = {5, 1, 4, 2};
      vector<int> expected = {8, 40, 10, 20};
      vector<int> actual = arrayOfProducts(input);
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
		var input = new int[] {5, 1, 4, 2};
		var expected = new int[] {8, 40, 10, 20};
		int[] actual = new Program().ArrayOfProducts(input);
		Utils.AssertTrue(expected.Length == actual.Length);
		for (int i=0; i<actual.Length; i++) {
			Utils.AssertTrue(actual[i] == expected[i]);
		}
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {
	// O(n^2) time | O(n) space - where n is the length of the input array
	public int[] ArrayOfProducts(int[] array) {
		int[] products = new int[array.Length];

		for (int i=0; i<array.Length; i++) {
			int runningProduct = 1;
			for (int j=0; j<array.Length; j++) {
				if (i != j) {
					runningProduct *= array[j];
				}
				products[i] = runningProduct;
			}
		}

		return products;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {
	// O(n) time | O(n) space - where n is the length of the input array
	public int[] ArrayOfProducts(int[] array) {
		int[] products = new int[array.Length];
		int[] leftProducts = new int[array.Length];
		int[] rightProducts = new int[array.Length];

		int leftRunningProduct = 1;
		for (int i=0; i<array.Length; i++) {
			leftProducts[i] = leftRunningProduct;
			leftRunningProduct *= array[i];
		}

		int rightRunningProduct = 1;
		for (int i=array.Length-1; i>=0; i--) {
			rightProducts[i] = rightRunningProduct;
			rightRunningProduct *= array[i];
		}

		for (int i=0; i<array.Length; i++) {
			products[i] = leftProducts[i] * rightProducts[i];
		}

		return products;
	}
}

```
### Solution 3 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {
	// O(n) time | O(n) space - where n is the length of the input array
	public int[] ArrayOfProducts(int[] array) {
		int[] products = new int[array.Length];

		int leftRunningProduct = 1;
		for (int i=0; i<array.Length; i++) {
			products[i] = leftRunningProduct;
			leftRunningProduct *= array[i];
		}

		int rightRunningProduct = 1;
		for (int i=array.Length-1; i>=0; i--) {
			products[i] *= rightRunningProduct;
			rightRunningProduct *= array[i];
		}

		return products;
	}
}
```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		var input = new int[] {5, 1, 4, 2};
		var expected = new int[] {8, 40, 10, 20};
		int[] actual = new Program().ArrayOfProducts(input);
		Utils.AssertTrue(expected.Length == actual.Length);
		for (int i=0; i<actual.Length; i++) {
			Utils.AssertTrue(actual[i] == expected[i]);
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
	input := []int{5, 1, 4, 2}
	expected := []int{8, 40, 10, 20}
	actual := ArrayOfProducts(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n^2) time | O(n) space - where n is the number of elements in the input array
func ArrayOfProducts(array []int) []int {
	products := make([]int, len(array))

	for i := range array {
		runningProduct := 1
		for j := range array {
			if i != j {
				runningProduct *= array[j]
			}
		}
		products[i] = runningProduct
	}
	return products
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space - where n is the number of elements in the input array
func ArrayOfProducts(array []int) []int {
	products := make([]int, len(array))
	leftProducts := make([]int, len(array))
	rightProducts := make([]int, len(array))
	for i := range array {
		products[i] = 1
		leftProducts[i] = 1
		rightProducts[i] = 1
	}

	leftRunningProduct := 1
	for i := range array {
		leftProducts[i] = leftRunningProduct
		leftRunningProduct *= array[i]
	}

	rightRunningProduct := 1
	for i := len(array) - 1; i >= 0; i-- {
		rightProducts[i] = rightRunningProduct
		rightRunningProduct *= array[i]
	}

	for i := range array {
		products[i] = leftProducts[i] * rightProducts[i]
	}
	return products
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space - where n is the number of elements in the input array
func ArrayOfProducts(array []int) []int {
	products := make([]int, len(array))
	for i := range array {
		products[i] = 1
	}

	leftRunningProduct := 1
	for i := range array {
		products[i] = leftRunningProduct
		leftRunningProduct *= array[i]
	}

	rightRunningProduct := 1
	for i := len(array) - 1; i >= 0; i-- {
		products[i] *= rightRunningProduct
		rightRunningProduct *= array[i]
	}
	return products
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []int{5, 1, 4, 2}
	expected := []int{8, 40, 10, 20}
	actual := ArrayOfProducts(input)
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
    var input = new int[] {5, 1, 4, 2};
    var expected = new int[] {8, 40, 10, 20};
    int[] actual = new Program().arrayOfProducts(input);
    Utils.assertTrue(expected.length == actual.length);
    for (int i = 0; i < actual.length; i++) {
      Utils.assertTrue(actual[i] == expected[i]);
    }
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n^2) time | O(n) space - where n is the length of the input array
  public int[] arrayOfProducts(int[] array) {
    int[] products = new int[array.length];

    for (int i = 0; i < array.length; i++) {
      int runningProduct = 1;
      for (int j = 0; j < array.length; j++) {
        if (i != j) {
          runningProduct *= array[j];
        }
        products[i] = runningProduct;
      }
    }

    return products;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(n) space - where n is the length of the input array
  public int[] arrayOfProducts(int[] array) {
    int[] products = new int[array.length];
    int[] leftProducts = new int[array.length];
    int[] rightProducts = new int[array.length];

    int leftRunningProduct = 1;
    for (int i = 0; i < array.length; i++) {
      leftProducts[i] = leftRunningProduct;
      leftRunningProduct *= array[i];
    }

    int rightRunningProduct = 1;
    for (int i = array.length - 1; i >= 0; i--) {
      rightProducts[i] = rightRunningProduct;
      rightRunningProduct *= array[i];
    }

    for (int i = 0; i < array.length; i++) {
      products[i] = leftProducts[i] * rightProducts[i];
    }

    return products;
  }
}

```
### Solution 3 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(n) space - where n is the length of the input array
  public int[] arrayOfProducts(int[] array) {
    int[] products = new int[array.length];

    int leftRunningProduct = 1;
    for (int i = 0; i < array.length; i++) {
      products[i] = leftRunningProduct;
      leftRunningProduct *= array[i];
    }

    int rightRunningProduct = 1;
    for (int i = array.length - 1; i >= 0; i--) {
      products[i] *= rightRunningProduct;
      rightRunningProduct *= array[i];
    }

    return products;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    var input = new int[] {5, 1, 4, 2};
    var expected = new int[] {8, 40, 10, 20};
    int[] actual = new Program().arrayOfProducts(input);
    Utils.assertTrue(expected.length == actual.length);
    for (int i = 0; i < actual.length; i++) {
      Utils.assertTrue(actual[i] == expected[i]);
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
  const array = [5, 1, 4, 2];
  const expected = [8, 40, 10, 20];
  const actual = program.arrayOfProducts(array);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space - where n is the length of the input array
function arrayOfProducts(array) {
  const products = [];

  for (let i = 0; i < array.length; i++) {
    let runningProduct = 1;
    for (let j = 0; j < array.length; j++) {
      if (i !== j) {
        runningProduct *= array[j];
      }
      products[i] = runningProduct;
    }
  }

  return products;
}

exports.arrayOfProducts = arrayOfProducts;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input array
function arrayOfProducts(array) {
  const products = new Array(array.length).fill(1);
  const leftProducts = new Array(array.length).fill(1);
  const rightProducts = new Array(array.length).fill(1);

  let leftRunningProduct = 1;
  for (let i = 0; i < array.length; i++) {
    leftProducts[i] = leftRunningProduct;
    leftRunningProduct *= array[i];
  }

  let rightRunningProduct = 1;
  for (let i = array.length - 1; i > -1; i--) {
    rightProducts[i] = rightRunningProduct;
    rightRunningProduct *= array[i];
  }

  for (let i = 0; i < array.length; i++) {
    products[i] = leftProducts[i] * rightProducts[i];
  }

  return products;
}

exports.arrayOfProducts = arrayOfProducts;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input array
function arrayOfProducts(array) {
  const products = new Array(array.length).fill(1);

  let leftRunningProduct = 1;
  for (let i = 0; i < array.length; i++) {
    products[i] = leftRunningProduct;
    leftRunningProduct *= array[i];
  }

  let rightRunningProduct = 1;
  for (let i = array.length - 1; i > -1; i--) {
    products[i] *= rightRunningProduct;
    rightRunningProduct *= array[i];
  }

  return products;
}

exports.arrayOfProducts = arrayOfProducts;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const array = [5, 1, 4, 2];
  const expected = [8, 40, 10, 20];
  const actual = program.arrayOfProducts(array);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.arrayOfProducts

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(5, 1, 4, 2)
        val expected = listOf(8, 40, 10, 20)
        val output = arrayOfProducts(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^2) time | O(n) space - where n is the number of elements in the input array
fun arrayOfProducts(array: List<Int>): List<Int> {
    val products = MutableList(array.size) { 1 }

    for (i in 0 until array.size) {
        var runningProduct = 1
        for (j in 0 until array.size) {
            if (i != j) runningProduct *= array[j]
        }
        products[i] = runningProduct
    }

    return products
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(n) space - where n is the number of elements in the input array
fun arrayOfProducts(array: List<Int>): List<Int> {
    val products = MutableList(array.size) { 1 }
    val leftProducts = MutableList(array.size) { 1 }
    val rightProducts = MutableList(array.size) { 1 }

    var leftRunningProduct = 1
    for (i in 0 until array.size) {
        leftProducts[i] = leftRunningProduct
        leftRunningProduct *= array[i]
    }

    var rightRunningProduct = 1
    for (i in array.size - 1 downTo 0) {
        rightProducts[i] = rightRunningProduct
        rightRunningProduct *= array[i]
    }

    for (i in 0 until array.size) {
        products[i] = leftProducts[i] * rightProducts[i]
    }

    return products
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(n) space - where n is the number of elements in the input array
fun arrayOfProducts(array: List<Int>): List<Int> {
    val products = MutableList(array.size) { 1 }

    var leftRunningProduct = 1
    for (i in 0 until array.size) {
        products[i] = leftRunningProduct
        leftRunningProduct *= array[i]
    }

    var rightRunningProduct = 1
    for (i in array.size - 1 downTo 0) {
        products[i] *= rightRunningProduct
        rightRunningProduct *= array[i]
    }

    return products
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.arrayOfProducts

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(5, 1, 4, 2)
        val expected = listOf(8, 40, 10, 20)
        val output = arrayOfProducts(input)
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
      var input = [5, 1, 4, 2]
      var expected = [8, 40, 10, 20]
      var actual = Program().arrayOfProducts(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(n) space - where n is the number of elements in the input array
  func arrayOfProducts(_ array: [Int]) -> [Int] {
    var products = [Int](repeating: 0, count: array.count)

    for i in 0 ..< array.count {
      var runningProduct = 1
      for j in 0 ..< array.count {
        if i != j {
          runningProduct *= array[j]
        }
      }
      products[i] = runningProduct
    }
    return products
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the number of elements in the input array
  func arrayOfProducts(_ array: [Int]) -> [Int] {
    var products = [Int](repeating: 1, count: array.count)
    var leftProducts = [Int](repeating: 1, count: array.count)
    var rightProducts = [Int](repeating: 1, count: array.count)

    var leftRunningProduct = 1
    for i in 0 ..< array.count {
      leftProducts[i] = leftRunningProduct
      leftRunningProduct *= array[i]
    }

    var rightRunningProduct = 1
    for i in stride(from: array.count - 1, through: 0, by: -1) {
      rightProducts[i] = rightRunningProduct
      rightRunningProduct *= array[i]
    }

    for i in 0 ..< array.count {
      products[i] = leftProducts[i] * rightProducts[i]
    }
    return products
  }
}

```
### Solution 3 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the number of elements in the input array
  func arrayOfProducts(_ array: [Int]) -> [Int] {
    var products = [Int](repeating: 1, count: array.count)

    var leftRunningProduct = 1
    for i in 0 ..< array.count {
      products[i] = leftRunningProduct
      leftRunningProduct *= array[i]
    }

    var rightRunningProduct = 1
    for i in stride(from: array.count - 1, through: 0, by: -1) {
      products[i] *= rightRunningProduct
      rightRunningProduct *= array[i]
    }
    return products
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = [5, 1, 4, 2]
      var expected = [8, 40, 10, 20]
      var actual = Program().arrayOfProducts(input)
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
        array = [5, 1, 4, 2]
        expected = [8, 40, 10, 20]
        actual = program.arrayOfProducts(array)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n) space - where n is the length of the input array
def arrayOfProducts(array):
    products = [1 for _ in range(len(array))]

    for i in range(len(array)):
        runningProduct = 1
        for j in range(len(array)):
            if i != j:
                runningProduct *= array[j]
        products[i] = runningProduct

    return products

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the length of the input array
def arrayOfProducts(array):
    products = [1 for _ in range(len(array))]
    leftProducts = [1 for _ in range(len(array))]
    rightProducts = [1 for _ in range(len(array))]

    leftRunningProduct = 1
    for i in range(len(array)):
        leftProducts[i] = leftRunningProduct
        leftRunningProduct *= array[i]

    rightRunningProduct = 1
    for i in reversed(range(len(array))):
        rightProducts[i] = rightRunningProduct
        rightRunningProduct *= array[i]

    for i in range(len(array)):
        products[i] = leftProducts[i] * rightProducts[i]

    return products

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the length of the input array
def arrayOfProducts(array):
    products = [1 for _ in range(len(array))]

    leftRunningProduct = 1
    for i in range(len(array)):
        products[i] = leftRunningProduct
        leftRunningProduct *= array[i]

    rightRunningProduct = 1
    for i in reversed(range(len(array))):
        products[i] *= rightRunningProduct
        rightRunningProduct *= array[i]

    return products

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        array = [5, 1, 4, 2]
        expected = [8, 40, 10, 20]
        actual = program.arrayOfProducts(array)
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
  const array = [5, 1, 4, 2];
  const expected = [8, 40, 10, 20];
  const actual = program.arrayOfProducts(array);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space - where n is the length of the input array
export function arrayOfProducts(array: number[]) {
  const products: number[] = [];

  for (let i = 0; i < array.length; i++) {
    let runningProduct = 1;
    for (let j = 0; j < array.length; j++) {
      if (i !== j) {
        runningProduct *= array[j];
      }
      products[i] = runningProduct;
    }
  }

  return products;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input array
export function arrayOfProducts(array: number[]) {
  const products: number[] = new Array(array.length).fill(1);
  const leftProducts: number[] = new Array(array.length).fill(1);
  const rightProducts: number[] = new Array(array.length).fill(1);

  let leftRunningProduct = 1;
  for (let i = 0; i < array.length; i++) {
    leftProducts[i] = leftRunningProduct;
    leftRunningProduct *= array[i];
  }

  let rightRunningProduct = 1;
  for (let i = array.length - 1; i > -1; i--) {
    rightProducts[i] = rightRunningProduct;
    rightRunningProduct *= array[i];
  }

  for (let i = 0; i < array.length; i++) {
    products[i] = leftProducts[i] * rightProducts[i];
  }

  return products;
}

```
### Solution 3 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input array
export function arrayOfProducts(array: number[]) {
  const products: number[] = new Array(array.length).fill(1);

  let leftRunningProduct = 1;
  for (let i = 0; i < array.length; i++) {
    products[i] = leftRunningProduct;
    leftRunningProduct *= array[i];
  }

  let rightRunningProduct = 1;
  for (let i = array.length - 1; i > -1; i--) {
    products[i] *= rightRunningProduct;
    rightRunningProduct *= array[i];
  }

  return products;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const array = [5, 1, 4, 2];
  const expected = [8, 40, 10, 20];
  const actual = program.arrayOfProducts(array);
  chai.expect(actual).to.deep.equal(expected);
});

```

