# Product Sum
<div class="html">
<p>
  Write a function that takes in a "special" array and returns its product sum.
</p>
<p>
  A "special" array is a non-empty array that contains either integers or other
  "special" arrays. The product sum of a "special" array is the sum of its
  elements, where "special" arrays inside it are summed themselves and then
  multiplied by their level of depth.
</p>
<p>
  The depth of a "special" array is how far nested it is. For instance, the
  depth of <span>[]</span> is <span>1</span>; the depth of the inner array in
  <span>[[]]</span> is <span>2</span>; the depth of the innermost array in
  <span>[[[]]]</span> is <span>3</span>.
</p>
<p>
  Therefore, the product sum of <span>[x, y]</span> is <span>x + y</span>; the
  product sum of <span>[x, [y, z]]</span> is <span>x + 2 * (y + z)</span>; the
  product sum of <span>[x, [y, [z]]]</span> is <span>x + 2 * (y + 3z)</span>.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [5, 2, [7, -1], 3, [6, [-13, 8], 4]]
</pre>
<h3>Sample Output</h3>
<pre>
12 <span class="CodeEditor-promptComment">// calculated as: 5 + 2 + 2 * (7 - 1) + 3 + 2 * (6 + 3 * (-13 + 8) + 4)</span>
</pre>
</div>

Hint 1
<p>
Try using recursion to solve this problem.
</p>


Hint 2

<p>
Initialize the product sum of the "special" array to 0. Then, iterate through all of the array's elements; if you come across a number, add it to the product sum; if you come across another "special" array, recursively call the productSum function on it and add the returned value to the product sum. How will you handle multiplying the product sums at a given level of depth?
</p>


Hint 3

<p>
Have the productSum function take in a second parameter: the multiplier, initialized to 1. Whenever you recursively call the productSum function, pass in the multiplier incremented by 1.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

#include <any>
#include <vector>

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<any> test = {5, 2, vector<any>{7, -1}, 3,
                          vector<any>{6, vector<any>{-13, 8}, 4}};
      assert(productSum(test) == 12);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <any>
#include <vector>

using namespace std;

// O(n) time | O(d) space - where n is the total number of elements in the
// array, including sub-elements, and d is the greatest depth of "special"
// arrays in the array
int productSum(vector<any> array, int multiplier = 1) {
  int sum = 0;
  for (auto el : array) {
    if (el.type() == typeid(vector<any>)) {
      sum += productSum(any_cast<vector<any>>(el), multiplier + 1);
    } else {
      sum += any_cast<int>(el);
    }
  }
  return sum * multiplier;
}

```
### Unit Tests 1 (cpp)
```cpp
#include <any>
#include <vector>

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<any> test = {5, 2, vector<any>{7, -1}, 3,
                          vector<any>{6, vector<any>{-13, 8}, 4}};
      assert(productSum(test) == 12);
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
		List<object> test = new List<object>(){
			5,
			2,
			new List<object>(){
				7, -1
			},
			3,
			new List<object>(){
				6,
				new List<object>(){
					-13, 8
				},
				4,
			},
		};
		Utils.AssertTrue(Program.ProductSum(test) == 12);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n) time | O(d) space - where n is the total number of elements in the array,
	// including sub-elements, and d is the greatest depth of "special" arrays in the array
	public static int ProductSum(List<object> array) {
		return productSumHelper(array, 1);
	}

	public static int productSumHelper(List<object> array, int multiplier) {
		int sum = 0;
		foreach (object el in array) {
			if (el is IList<object>) {
				sum += productSumHelper((List<object>)el, multiplier + 1);
			} else {
				sum += (int)el;
			}
		}
		return sum * multiplier;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		List<object> test = new List<object>(){
			5,
			2,
			new List<object>(){
				7, -1
			},
			3,
			new List<object>(){
				6,
				new List<object>(){
					-13, 8
				},
				4,
			},
		};
		Utils.AssertTrue(Program.ProductSum(test) == 12);
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
	input := SpecialArray{
		5, 2,
		SpecialArray{7, -1},
		3,
		SpecialArray{
			6,
			SpecialArray{
				-13, 8,
			},
			4,
		},
	}
	output := ProductSum(input)
	expected := 12
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type SpecialArray []interface{}

// O(n) time | O(d) space - where n is the total number of elements in the array,
// including sub-elements, and d is the greatest depth of "special" arrays in the array
func ProductSum(array SpecialArray) int {
	return helper(array, 1)
}

func helper(array SpecialArray, multiplier int) int {
	sum := 0
	for _, el := range array {
		if cast, ok := el.(SpecialArray); ok {
			sum += helper(cast, multiplier+1)
		} else if cast, ok := el.(int); ok {
			sum += cast
		}
	}
	return sum * multiplier
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := SpecialArray{
		5, 2,
		SpecialArray{7, -1},
		3,
		SpecialArray{
			6,
			SpecialArray{
				-13, 8,
			},
			4,
		},
	}
	output := ProductSum(input)
	expected := 12
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
    List<Object> test =
        new ArrayList<Object>(
            Arrays.asList(
                5,
                2,
                new ArrayList<Object>(Arrays.asList(7, -1)),
                3,
                new ArrayList<Object>(
                    Arrays.asList(6, new ArrayList<Object>(Arrays.asList(-13, 8)), 4))));
    Utils.assertTrue(Program.productSum(test) == 12);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(d) space - where n is the total number of elements in the array,
  // including sub-elements, and d is the greatest depth of "special" arrays in the array
  public static int productSum(List<Object> array) {
    return productSumHelper(array, 1);
  }

  public static int productSumHelper(List<Object> array, int multiplier) {
    int sum = 0;
    for (Object el : array) {
      if (el instanceof ArrayList) {
        @SuppressWarnings("unchecked")
        ArrayList<Object> ls = (ArrayList<Object>) el;
        sum += productSumHelper(ls, multiplier + 1);
      } else {
        sum += (int) el;
      }
    }
    return sum * multiplier;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    List<Object> test =
        new ArrayList<Object>(
            Arrays.asList(
                5,
                2,
                new ArrayList<Object>(Arrays.asList(7, -1)),
                3,
                new ArrayList<Object>(
                    Arrays.asList(6, new ArrayList<Object>(Arrays.asList(-13, 8)), 4))));
    Utils.assertTrue(Program.productSum(test) == 12);
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
  const test = [5, 2, [7, -1], 3, [6, [-13, 8], 4]];
  chai.expect(program.productSum(test)).to.deep.equal(12);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(d) space - where n is the total number of elements in the array,
// including sub-elements, and d is the greatest depth of "special" arrays in the array
function productSum(array, multiplier = 1) {
  let sum = 0;
  for (const element of array) {
    if (Array.isArray(element)) {
      sum += productSum(element, multiplier + 1);
    } else {
      sum += element;
    }
  }
  return sum * multiplier;
}

exports.productSum = productSum;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const test = [5, 2, [7, -1], 3, [6, [-13, 8], 4]];
  chai.expect(program.productSum(test)).to.deep.equal(12);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.productSum

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf<Any>(
            5, 2, listOf(7, -1), 3,
            listOf(
                6, listOf(-13, 8), 4
            )
        )
        val output = productSum(input)
        assert(output == 12)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(d) space - where n is the total number of elements in the array,
// including sub-elements, and d is the greatest depth of "special" arrays in the array
fun productSum(array: List<*>): Int {
    return productSumHelper(array, 1)
}

fun productSumHelper(array: List<*>, multiplier: Int): Int {
    var sum = 0
    for (el in array) {
        if (el is List<*>) {
            sum += productSumHelper(el, multiplier + 1)
        } else {
            sum += el as Int
        }
    }
    return sum * multiplier
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.productSum

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf<Any>(
            5, 2, listOf(7, -1), 3,
            listOf(
                6, listOf(-13, 8), 4
            )
        )
        val output = productSum(input)
        assert(output == 12)
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
      let sixthTest: [Any] = [5, 2, [7, -1], 3, [6, [-13, 8], 4]]
      try assertEqual(12, program.productSum(sixthTest))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(d) space
  func productSum(_ array: [Any], _ multiplier: Int = 1) -> Int {
    var sum = 0

    for element in array {
      if let elementAsArray = element as? [Any] {
        sum += productSum(elementAsArray, multiplier + 1)
      } else if let elementAsInt = element as? Int {
        sum += elementAsInt
      }
    }

    return sum * multiplier
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let sixthTest: [Any] = [5, 2, [7, -1], 3, [6, [-13, 8], 4]]
      try assertEqual(12, program.productSum(sixthTest))
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
        test = [5, 2, [7, -1], 3, [6, [-13, 8], 4]]
        self.assertEqual(program.productSum(test), 12)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(d) space - where n is the total number of elements in the array,
# including sub-elements, and d is the greatest depth of "special" arrays in the array
def productSum(array, multiplier=1):
    sum = 0
    for element in array:
        if type(element) is list:
            sum += productSum(element, multiplier + 1)
        else:
            sum += element
    return sum * multiplier

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        test = [5, 2, [7, -1], 3, [6, [-13, 8], 4]]
        self.assertEqual(program.productSum(test), 12)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

type SpecialArray = Array<number | SpecialArray>;

it('Test Case #1', function () {
  const test: SpecialArray = [5, 2, [7, -1], 3, [6, [-13, 8], 4]];
  chai.expect(program.productSum(test)).to.deep.equal(12);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

type SpecialArray = Array<number | SpecialArray>;

// O(n) time | O(d) space - where n is the total number of elements in the array,
// including sub-elements, and d is the greatest depth of "special" arrays in the array
export function productSum(array: SpecialArray, multiplier = 1) {
  let sum = 0;
  for (const element of array) {
    if (Array.isArray(element)) {
      sum += productSum(element, multiplier + 1);
    } else {
      sum += element;
    }
  }
  return sum * multiplier;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

type SpecialArray = Array<number | SpecialArray>;

it('Test Case #1', function () {
  const test: SpecialArray = [5, 2, [7, -1], 3, [6, [-13, 8], 4]];
  chai.expect(program.productSum(test)).to.deep.equal(12);
});

```

