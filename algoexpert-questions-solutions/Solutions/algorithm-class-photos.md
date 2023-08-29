# Class Photos
<div class="html">
<p>
  It's photo day at the local school, and you're the photographer assigned to
  take class photos. The class that you'll be photographing has an even number
  of students, and all these students are wearing red or blue shirts. In fact,
  exactly half of the class is wearing red shirts, and the other half is wearing
  blue shirts. You're responsible for arranging the students in two rows before
  taking the photo. Each row should contain the same number of the students and
  should adhere to the following guidelines:
</p>
<ul>
  <li>All students wearing red shirts must be in the same row.</li>
  <li>All students wearing blue shirts must be in the same row.</li>
  <li>
    Each student in the back row must be strictly taller than the student
    directly in front of them in the front row.
  </li>
</ul>
<p>
  You're given two input arrays: one containing the heights of all the students
  with red shirts and another one containing the heights of all the students
  with blue shirts. These arrays will always have the same length, and each
  height will be a positive integer. Write a function that returns whether or
  not a class photo that follows the stated guidelines can be taken.
</p>
<p>Note: you can assume that each class has at least 2 students.</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">redShirtHeights</span> = [5, 8, 1, 3, 4]
<span class="CodeEditor-promptParameter">blueShirtHeights</span> = [6, 9, 2, 4, 5]
</pre>
<h3>Sample Output</h3>
<pre>
true <span class="CodeEditor-promptComment">// Place all students with blue shirts in the back row.</span>
</pre>
</div>

Hint 1
<p>
  Start by determining which row will have the students wearing blue shirts and
  which row will have the students wearing red shirts. Once you know this, how
  can you determine if it's possible to take the photo?
</p>


Hint 2

<p>
  The shirt color of the tallest student will determine which students need to
  be placed in the back row. The tallest student can't be placed in the front
  row because there's no student taller than them who can be placed behind them.
</p>


Hint 3

<p>
  Once you know which students should be placed in each row, you can simply
  check if each student in the back row can be paired with a student in the
  front row who is shorter than them. If you can't find a satisfactory pairing
  for every student in the back row, then you can't take the photo.
</p>


Hint 4

<p>
  Sort each input array in descending order, then determine which students will
  be in the front and back rows following Hint #2. After this, simply loop
  through your sorted input arrays, and check if the current tallest student in
  the back row is taller than the current tallest student in the front row. If
  you find that the current tallest student (one that has yet to be placed) in
  the back row isn't taller than the current tallest student in the front row,
  then the photo can't be taken.
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
      vector<int> redShirtHeights = {5, 8, 1, 3, 4};
      vector<int> blueShirtHeights = {6, 9, 2, 4, 5};
      bool expected = true;
      auto actual = classPhotos(redShirtHeights, blueShirtHeights);
      assert(expected == actual);
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

// O(nlog(n)) time | O(1) space - where n is the number of students
bool classPhotos(vector<int> redShirtHeights, vector<int> blueShirtHeights) {
  sort(redShirtHeights.begin(), redShirtHeights.end());
  sort(blueShirtHeights.begin(), blueShirtHeights.end());

  string shirtColorInFirstRow =
      redShirtHeights[0] < blueShirtHeights[0] ? "RED" : "BLUE";
  for (int idx = 0; idx < redShirtHeights.size(); idx++) {
    int redShirtHeight = redShirtHeights[idx];
    int blueShirtHeight = blueShirtHeights[idx];

    if (shirtColorInFirstRow == "RED") {
      if (redShirtHeight >= blueShirtHeight)
        return false;
    } else if (blueShirtHeight >= redShirtHeight)
      return false;
  }

  return true;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> redShirtHeights = {5, 8, 1, 3, 4};
      vector<int> blueShirtHeights = {6, 9, 2, 4, 5};
      bool expected = true;
      auto actual = classPhotos(redShirtHeights, blueShirtHeights);
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

using System.Collections.Generic;
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		List<int> redShirtHeights = new List<int> {
			5, 8, 1, 3, 4
		};
		List<int> blueShirtHeights = new List<int> {
			6, 9, 2, 4, 5
		};
		bool expected = true;
		bool actual = new Program().ClassPhotos(redShirtHeights, blueShirtHeights);
		Utils.AssertTrue(expected == actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {

	// O(nlog(n)) time | O(1) space - where n is the number of students
	public bool ClassPhotos(List<int> redShirtHeights, List<int> blueShirtHeights) {
		redShirtHeights.Sort((a, b) => b.CompareTo(a));
		blueShirtHeights.Sort((a, b) => b.CompareTo(a));

		string shirtColorInFirstRow =
		  (redShirtHeights[0] < blueShirtHeights[0]) ? "RED" : "BLUE";
		for (int idx = 0; idx < redShirtHeights.Count; idx++) {
			int redShirtHeight = redShirtHeights[idx];
			int blueShirtHeight = blueShirtHeights[idx];

			if (shirtColorInFirstRow == "RED") {
				if (redShirtHeight >= blueShirtHeight) {
					return false;
				}
			} else {
				if (blueShirtHeight >= redShirtHeight) {
					return false;
				}
			}
		}

		return true;
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
		List<int> redShirtHeights = new List<int> {
			5, 8, 1, 3, 4
		};
		List<int> blueShirtHeights = new List<int> {
			6, 9, 2, 4, 5
		};
		bool expected = true;
		bool actual = new Program().ClassPhotos(redShirtHeights, blueShirtHeights);
		Utils.AssertTrue(expected == actual);
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
	redShirtHeights := []int{5, 8, 1, 3, 4}
	blueShirtHeights := []int{6, 9, 2, 4, 5}
	expected := true
	actual := ClassPhotos(redShirtHeights, blueShirtHeights)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"sort"
)

// O(nlog(n)) time | O(1) space - where n is the number of students
func ClassPhotos(redShirtHeights []int, blueShirtHeights []int) bool {
	sort.Slice(redShirtHeights, func(i, j int) bool {
		return redShirtHeights[i] > redShirtHeights[j]
	})
	sort.Slice(blueShirtHeights, func(i, j int) bool {
		return blueShirtHeights[i] > blueShirtHeights[j]
	})

	shirtColorInFirstRow := "BLUE"
	if redShirtHeights[0] < blueShirtHeights[0] {
		shirtColorInFirstRow = "RED"
	}

	for idx := range redShirtHeights {
		redShirtHeight := redShirtHeights[idx]
		blueShirtHeight := blueShirtHeights[idx]

		if shirtColorInFirstRow == "RED" {
			if redShirtHeight >= blueShirtHeight {
				return false
			}
		} else {
			if blueShirtHeight >= redShirtHeight {
				return false
			}
		}
	}

	return true
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	redShirtHeights := []int{5, 8, 1, 3, 4}
	blueShirtHeights := []int{6, 9, 2, 4, 5}
	expected := true
	actual := ClassPhotos(redShirtHeights, blueShirtHeights)
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
    ArrayList<Integer> redShirtHeights = new ArrayList<Integer>(Arrays.asList(5, 8, 1, 3, 4));
    ArrayList<Integer> blueShirtHeights = new ArrayList<Integer>(Arrays.asList(6, 9, 2, 4, 5));
    boolean expected = true;
    boolean actual = new Program().classPhotos(redShirtHeights, blueShirtHeights);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(nlog(n)) time | O(1) space - where n is the number of students
  public boolean classPhotos(
      ArrayList<Integer> redShirtHeights, ArrayList<Integer> blueShirtHeights) {
    Collections.sort(redShirtHeights, Collections.reverseOrder());
    Collections.sort(blueShirtHeights, Collections.reverseOrder());

    String shirtColorInFirstRow =
        (redShirtHeights.get(0) < blueShirtHeights.get(0)) ? "RED" : "BLUE";
    for (int idx = 0; idx < redShirtHeights.size(); idx++) {
      int redShirtHeight = redShirtHeights.get(idx);
      int blueShirtHeight = blueShirtHeights.get(idx);

      if (shirtColorInFirstRow == "RED") {
        if (redShirtHeight >= blueShirtHeight) {
          return false;
        }
      } else {
        if (blueShirtHeight >= redShirtHeight) {
          return false;
        }
      }
    }

    return true;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    ArrayList<Integer> redShirtHeights = new ArrayList<Integer>(Arrays.asList(5, 8, 1, 3, 4));
    ArrayList<Integer> blueShirtHeights = new ArrayList<Integer>(Arrays.asList(6, 9, 2, 4, 5));
    boolean expected = true;
    boolean actual = new Program().classPhotos(redShirtHeights, blueShirtHeights);
    Utils.assertTrue(expected == actual);
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
  const redShirtHeights = [5, 8, 1, 3, 4];
  const blueShirtHeights = [6, 9, 2, 4, 5];
  const expected = true;
  const actual = program.classPhotos(redShirtHeights, blueShirtHeights);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlog(n)) time | O(1) space - where n is the number of students
function classPhotos(redShirtHeights, blueShirtHeights) {
  redShirtHeights.sort((a, b) => b - a);
  blueShirtHeights.sort((a, b) => b - a);

  const shirtColorInFirstRow = redShirtHeights[0] < blueShirtHeights[0] ? 'RED' : 'BLUE';
  for (let idx = 0; idx < redShirtHeights.length; idx++) {
    const redShirtHeight = redShirtHeights[idx];
    const blueShirtHeight = blueShirtHeights[idx];

    if (shirtColorInFirstRow === 'RED') {
      if (redShirtHeight >= blueShirtHeight) return false;
    } else if (blueShirtHeight >= redShirtHeight) return false;
  }

  return true;
}

// Do not edit the line below.
exports.classPhotos = classPhotos;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const redShirtHeights = [5, 8, 1, 3, 4];
  const blueShirtHeights = [6, 9, 2, 4, 5];
  const expected = true;
  const actual = program.classPhotos(redShirtHeights, blueShirtHeights);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.classPhotos

class ProgramTest {
    @Test
    fun TestCase1() {
        val redShirtHeights = mutableListOf(5, 8, 1, 3, 4)
        val blueShirtHeights = mutableListOf(6, 9, 2, 4, 5)
        val expected = true
        val output = classPhotos(redShirtHeights, blueShirtHeights)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(nlog(n)) time | O(1) space - where n is the number of students
fun classPhotos(redShirtHeights: MutableList<Int>, blueShirtHeights: MutableList<Int>): Boolean {
    redShirtHeights.sortDescending()
    blueShirtHeights.sortDescending()

    val shirtColorInFirstRow = if (redShirtHeights[0] < blueShirtHeights[0]) "RED" else "BLUE"
    for (idx in 0 until redShirtHeights.size) {
        val redShirtHeight = redShirtHeights[idx]
        val blueShirtHeight = blueShirtHeights[idx]

        if (shirtColorInFirstRow == "RED") {
            if (redShirtHeight >= blueShirtHeight) return false
        } else {
            if (blueShirtHeight >= redShirtHeight) return false
        }
    }

    return true
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.classPhotos

class ProgramTest {
    @Test
    fun TestCase1() {
        val redShirtHeights = mutableListOf(5, 8, 1, 3, 4)
        val blueShirtHeights = mutableListOf(6, 9, 2, 4, 5)
        val expected = true
        val output = classPhotos(redShirtHeights, blueShirtHeights)
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
      var redShirtHeights = [5, 8, 1, 3, 4]
      var blueShirtHeights = [6, 9, 2, 4, 5]
      var expected = true
      var actual = Program().classPhotos(&redShirtHeights, &blueShirtHeights)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nlog(n)) time | O(1) space - where n is the number of students
  func classPhotos(_ redShirtHeights: inout [Int], _ blueShirtHeights: inout [Int]) -> Bool {
    redShirtHeights.sort { $0 > $1 }
    blueShirtHeights.sort { $0 > $1 }

    var shirtColorInFirstRow = "BLUE"
    if redShirtHeights[0] < blueShirtHeights[0] {
      shirtColorInFirstRow = "RED"
    }

    for idx in 0 ..< redShirtHeights.count {
      let redShirtHeight = redShirtHeights[idx]
      let blueShirtHeight = blueShirtHeights[idx]

      if shirtColorInFirstRow == "RED" {
        if redShirtHeight >= blueShirtHeight {
          return false
        }
      } else {
        if blueShirtHeight >= redShirtHeight {
          return false
        }
      }
    }

    return true
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var redShirtHeights = [5, 8, 1, 3, 4]
      var blueShirtHeights = [6, 9, 2, 4, 5]
      var expected = true
      var actual = Program().classPhotos(&redShirtHeights, &blueShirtHeights)
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
        redShirtHeights = [5, 8, 1, 3, 4]
        blueShirtHeights = [6, 9, 2, 4, 5]
        expected = True
        actual = program.classPhotos(redShirtHeights, blueShirtHeights)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nlog(n)) time | O(1) space - where n is the number of students
def classPhotos(redShirtHeights, blueShirtHeights):
    redShirtHeights.sort(reverse=True)
    blueShirtHeights.sort(reverse=True)

    shirtColorInFirstRow = "RED" if redShirtHeights[0] < blueShirtHeights[0] else "BLUE"
    for idx in range(len(redShirtHeights)):
        redShirtHeight = redShirtHeights[idx]
        blueShirtHeight = blueShirtHeights[idx]

        if shirtColorInFirstRow == "RED":
            if redShirtHeight >= blueShirtHeight:
                return False
        else:
            if blueShirtHeight >= redShirtHeight:
                return False

    return True

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        redShirtHeights = [5, 8, 1, 3, 4]
        blueShirtHeights = [6, 9, 2, 4, 5]
        expected = True
        actual = program.classPhotos(redShirtHeights, blueShirtHeights)
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
  const redShirtHeights = [5, 8, 1, 3, 4];
  const blueShirtHeights = [6, 9, 2, 4, 5];
  const expected = true;
  const actual = program.classPhotos(redShirtHeights, blueShirtHeights);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlog(n)) time | O(1) space - where n is the number of students
export function classPhotos(redShirtHeights: number[], blueShirtHeights: number[]) {
  redShirtHeights.sort((a, b) => b - a);
  blueShirtHeights.sort((a, b) => b - a);

  const shirtColorInFirstRow = redShirtHeights[0] < blueShirtHeights[0] ? 'RED' : 'BLUE';
  for (let idx = 0; idx < redShirtHeights.length; idx++) {
    const redShirtHeight = redShirtHeights[idx];
    const blueShirtHeight = blueShirtHeights[idx];

    if (shirtColorInFirstRow === 'RED') {
      if (redShirtHeight >= blueShirtHeight) return false;
    } else if (blueShirtHeight >= redShirtHeight) return false;
  }

  return true;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const redShirtHeights = [5, 8, 1, 3, 4];
  const blueShirtHeights = [6, 9, 2, 4, 5];
  const expected = true;
  const actual = program.classPhotos(redShirtHeights, blueShirtHeights);
  chai.expect(actual).to.deep.equal(expected);
});

```

