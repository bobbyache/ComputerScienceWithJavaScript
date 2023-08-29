# Valid Starting City
<div class="html">
<p>
  Imagine you have a set of cities that are laid out in a circle, connected by a
  circular road that runs clockwise. Each city has a gas station that provides
  gallons of fuel, and each city is some distance away from the next city.
</p>
<p>
  You have a car that can drive some number of miles per gallon of fuel, and
  your goal is to pick a starting city such that you can fill up your car with
  that city's fuel, drive to the next city, refill up your car with that city's
  fuel, drive to the next city, and so on and so forth until you return back to
  the starting city with 0 or more gallons of fuel left.
</p>
<p>
  This city is called a valid starting city, and it's guaranteed that there will
  always be exactly one valid starting city.
</p>
<p>
  For the actual problem, you'll be given an array of distances such that city
  <span>i</span> is <span>distances[i]</span> away from city <span>i + 1</span>.
  Since the cities are connected via a circular road, the last city is connected
  to the first city. In other words, the last distance in the
  <span>distances</span> array is equal to the distance from the last city to
  the first city. You'll also be given an array of fuel available at each city,
  where <span>fuel[i]</span> is equal to the fuel available at city
  <span>i</span>. The total amount of fuel available (from all cities combined)
  is exactly enough to travel to all cities. Your fuel tank always starts out
  empty, and you're given a positive integer value for the number of miles that
  your car can travel per gallon of fuel (miles per gallon, or MPG). You can
  assume that you will always be given at least two cities.
</p>
<p>Write a function that returns the index of the valid starting city.</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">distances</span> = [5, 25, 15, 10, 15]
<span class="CodeEditor-promptParameter">fuel</span> = [1, 2, 1, 0, 3]
<span class="CodeEditor-promptParameter">mpg</span> = 10
</pre>
<h3>Sample Output</h3>
<pre>
4
</pre>
</div>

Hint 1
<p>
  Try the brute-force approach to this problem by treating each city as the
  starting city and simulating traveling from it to all other cities.
</p>


Hint 2

<p>
  Start at each city, and see if you can return back to the city in question
  without running out of gas. If you find a city that you can return to after
  starting at it without running out of gas, then it must be the valid starting
  city, because there is always exactly one valid starting city.
</p>


Hint 3

<p>
  You can solve this problem in <span>O(n)</span> time. Try to use the fact that
  the amount of gas is exactly enough to travel around the road once to help
  you.
</p>


Hint 4

<p>
  Using the fact stated in Hint #3 and the knowledge that there is always
  exactly one valid starting city, you can solve this problem in a single pass
  of all cities. Keep track of how much gas you have as you enter a city (before
  you fill up at that city); you'll enter the first city with 0 gas. The city
  that you enter with the least amount of gas in your tank must be the valid
  starting city. This is because you'll never have less gas at another city than
  you do when you enter this city, no matter what city you start at. This means
  that that this is the valid starting city. See the Conceptual Overview section
  of this question's video explanation for a more in-depth explanation.
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
      vector<int> distances = {5, 25, 15, 10, 1};
      vector<int> fuel = {1, 2, 1, 0, 3};
      int mpg = 10;
      int expected = 4;
      auto actual = validStartingCity(distances, fuel, mpg);
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

// O(n^2) time | O(1) space - where n is the number of cities
int validStartingCity(vector<int> distances, vector<int> fuel, int mpg) {
  int numberOfCities = distances.size();

  for (int startCityIdx = 0; startCityIdx < numberOfCities; startCityIdx++) {
    int milesRemaining = 0;

    for (int currentCityIdx = startCityIdx;
         currentCityIdx < startCityIdx + numberOfCities; currentCityIdx++) {
      if (milesRemaining < 0)
        continue;

      int currentCityIdxRotated = currentCityIdx % numberOfCities;

      int fuelFromCurrentCity = fuel[currentCityIdxRotated];
      int distanceToNextCity = distances[currentCityIdxRotated];
      milesRemaining += fuelFromCurrentCity * mpg - distanceToNextCity;
    }

    if (milesRemaining >= 0)
      return startCityIdx;
  }

  // This line should never be reached if the inputs are correct.
  return -1;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

// O(n) time | O(1) space - where n is the number of cities
int validStartingCity(vector<int> distances, vector<int> fuel, int mpg) {
  int numberOfCities = distances.size();
  int milesRemaining = 0;

  int indexOfStartingCityCandidate = 0;
  int milesRemainingAtStartingCityCandidate = 0;

  for (int cityIdx = 1; cityIdx < numberOfCities; cityIdx++) {
    int distanceFromPreviousCity = distances[cityIdx - 1];
    int fuelFromPreviousCity = fuel[cityIdx - 1];
    milesRemaining += fuelFromPreviousCity * mpg - distanceFromPreviousCity;

    if (milesRemaining < milesRemainingAtStartingCityCandidate) {
      milesRemainingAtStartingCityCandidate = milesRemaining;
      indexOfStartingCityCandidate = cityIdx;
    }
  }

  return indexOfStartingCityCandidate;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> distances = {5, 25, 15, 10, 1};
      vector<int> fuel = {1, 2, 1, 0, 3};
      int mpg = 10;
      int expected = 4;
      auto actual = validStartingCity(distances, fuel, mpg);
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
		int[] distances = new int[] {5, 25, 15, 10, 15};
		int[] fuel = new int[] {1, 2, 1, 0, 3};
		int mpg = 10;
		int expected = 4;
		var actual = new Program().ValidStartingCity(distances, fuel, mpg);
		Utils.AssertTrue(expected == actual);
	}
}
```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	// O(n^2) time | O(1) space - where n is the number of cities
	public int ValidStartingCity(int[] distances, int[] fuel, int mpg) {
		int numberOfCities = distances.Length;

		for (int startCityIdx = 0; startCityIdx < numberOfCities; startCityIdx++) {
			int milesRemaining = 0;

			for (int currentCityIdx = startCityIdx;
			  currentCityIdx < startCityIdx + numberOfCities; currentCityIdx++) {
				if (milesRemaining < 0) {
					continue;
				}

				int currentCityIdxRotated = currentCityIdx % numberOfCities;

				int fuelFromCurrentCity = fuel[currentCityIdxRotated];
				int distanceToNextCity = distances[currentCityIdxRotated];
				milesRemaining += fuelFromCurrentCity * mpg - distanceToNextCity;
			}

			if (milesRemaining >= 0) {
				return startCityIdx;
			}
		}

		// This line should never be reached if the inputs are correct.
		return -1;
	}
}




```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {

	// O(n) time | O(1) space - where n is the number of cities
	public int ValidStartingCity(int[] distances, int[] fuel, int mpg) {
		int numberOfCities = distances.Length;
		int milesRemaining = 0;

		int indexOfStartingCityCandidate = 0;
		int milesRemainingAtStartingCityCandidate = 0;

		for (int cityIdx = 1; cityIdx < numberOfCities; cityIdx++) {
			int distanceFromPreviousCity = distances[cityIdx - 1];
			int fuelFromPreviousCity = fuel[cityIdx - 1];
			milesRemaining += fuelFromPreviousCity * mpg - distanceFromPreviousCity;

			if (milesRemaining < milesRemainingAtStartingCityCandidate) {
				milesRemainingAtStartingCityCandidate = milesRemaining;
				indexOfStartingCityCandidate = cityIdx;
			}
		}

		return indexOfStartingCityCandidate;
	}
}


```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] distances = new int[] {5, 25, 15, 10, 15};
		int[] fuel = new int[] {1, 2, 1, 0, 3};
		int mpg = 10;
		int expected = 4;
		var actual = new Program().ValidStartingCity(distances, fuel, mpg);
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
	distances := []int{5, 25, 15, 10, 15}
	fuel := []int{1, 2, 1, 0, 3}
	mpg := 10
	expected := 4
	actual := ValidStartingCity(distances, fuel, mpg)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n^2) time | O(1) space - where n is the number of cities
func ValidStartingCity(distances []int, fuel []int, mpg int) int {
	numberOfCities := len(distances)

	for startCityIdx := 0; startCityIdx < numberOfCities; startCityIdx++ {
		milesRemaining := 0

		for currentCityIdx := startCityIdx; currentCityIdx < startCityIdx+numberOfCities; currentCityIdx++ {
			if milesRemaining < 0 {
				continue
			}

			currentCityIdx := currentCityIdx % numberOfCities

			fuelFromCurrentCity := fuel[currentCityIdx]
			distanceToNextCity := distances[currentCityIdx]
			milesRemaining += fuelFromCurrentCity*mpg - distanceToNextCity
		}

		if milesRemaining >= 0 {
			return startCityIdx
		}
	}

	// This line should never be reached if the inputs are correct.
	return -1
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space - where n is the number of cities
func ValidStartingCity(distances []int, fuel []int, mpg int) int {
	numberOfCities := len(distances)
	milesRemaining := 0

	indexOfStartingCityCandidate := 0
	milesRemainingAtStartingCityCandidate := 0

	for cityIdx := 1; cityIdx < numberOfCities; cityIdx++ {
		distanceFromPreviousCity := distances[cityIdx-1]
		fuelFromPreviousCity := fuel[cityIdx-1]
		milesRemaining += fuelFromPreviousCity*mpg - distanceFromPreviousCity

		if milesRemaining < milesRemainingAtStartingCityCandidate {
			milesRemainingAtStartingCityCandidate = milesRemaining
			indexOfStartingCityCandidate = cityIdx
		}
	}

	return indexOfStartingCityCandidate
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	distances := []int{5, 25, 15, 10, 15}
	fuel := []int{1, 2, 1, 0, 3}
	mpg := 10
	expected := 4
	actual := ValidStartingCity(distances, fuel, mpg)
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
    int[] distances = new int[] {5, 25, 15, 10, 15};
    int[] fuel = new int[] {1, 2, 1, 0, 3};
    int mpg = 10;
    int expected = 4;
    var actual = new Program().validStartingCity(distances, fuel, mpg);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n^2) time | O(1) space - where n is the number of cities
  public int validStartingCity(int[] distances, int[] fuel, int mpg) {
    int numberOfCities = distances.length;

    for (int startCityIdx = 0; startCityIdx < numberOfCities; startCityIdx++) {
      int milesRemaining = 0;

      for (int currentCityIdx = startCityIdx;
          currentCityIdx < startCityIdx + numberOfCities;
          currentCityIdx++) {
        if (milesRemaining < 0) {
          continue;
        }

        int currentCityIdxRotated = currentCityIdx % numberOfCities;

        int fuelFromCurrentCity = fuel[currentCityIdxRotated];
        int distanceToNextCity = distances[currentCityIdxRotated];
        milesRemaining += fuelFromCurrentCity * mpg - distanceToNextCity;
      }

      if (milesRemaining >= 0) {
        return startCityIdx;
      }
    }

    // This line should never be reached if the inputs are correct.
    return -1;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n) time | O(1) space - where n is the number of cities
  public int validStartingCity(int[] distances, int[] fuel, int mpg) {
    int numberOfCities = distances.length;
    int milesRemaining = 0;

    int indexOfStartingCityCandidate = 0;
    int milesRemainingAtStartingCityCandidate = 0;

    for (int cityIdx = 1; cityIdx < numberOfCities; cityIdx++) {
      int distanceFromPreviousCity = distances[cityIdx - 1];
      int fuelFromPreviousCity = fuel[cityIdx - 1];
      milesRemaining += fuelFromPreviousCity * mpg - distanceFromPreviousCity;

      if (milesRemaining < milesRemainingAtStartingCityCandidate) {
        milesRemainingAtStartingCityCandidate = milesRemaining;
        indexOfStartingCityCandidate = cityIdx;
      }
    }

    return indexOfStartingCityCandidate;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[] distances = new int[] {5, 25, 15, 10, 15};
    int[] fuel = new int[] {1, 2, 1, 0, 3};
    int mpg = 10;
    int expected = 4;
    var actual = new Program().validStartingCity(distances, fuel, mpg);
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
  const distances = [5, 25, 15, 10, 15];
  const fuel = [1, 2, 1, 0, 3];
  const mpg = 10;
  const expected = 4;
  const actual = program.validStartingCity(distances, fuel, mpg);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(1) space - where n is the number of cities
function validStartingCity(distances, fuel, mpg) {
  const numberOfCities = distances.length;

  for (let startCityIdx = 0; startCityIdx < numberOfCities; startCityIdx++) {
    let milesRemaining = 0;

    for (let currentCityIdx = startCityIdx; currentCityIdx < startCityIdx + numberOfCities; currentCityIdx++) {
      if (milesRemaining < 0) continue;

      const currentCityIdxRotated = currentCityIdx % numberOfCities;

      const fuelFromCurrentCity = fuel[currentCityIdxRotated];
      const distanceToNextCity = distances[currentCityIdxRotated];
      milesRemaining += fuelFromCurrentCity * mpg - distanceToNextCity;
    }

    if (milesRemaining >= 0) return startCityIdx;
  }

  // This line should never be reached if the inputs are correct.
  return -1;
}

// Do not edit the line below.
exports.validStartingCity = validStartingCity;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the number of cities
function validStartingCity(distances, fuel, mpg) {
  const numberOfCities = distances.length;
  let milesRemaining = 0;

  let indexOfStartingCityCandidate = 0;
  let milesRemainingAtStartingCityCandidate = 0;

  for (let cityIdx = 1; cityIdx < numberOfCities; cityIdx++) {
    const distanceFromPreviousCity = distances[cityIdx - 1];
    const fuelFromPreviousCity = fuel[cityIdx - 1];
    milesRemaining += fuelFromPreviousCity * mpg - distanceFromPreviousCity;

    if (milesRemaining < milesRemainingAtStartingCityCandidate) {
      milesRemainingAtStartingCityCandidate = milesRemaining;
      indexOfStartingCityCandidate = cityIdx;
    }
  }

  return indexOfStartingCityCandidate;
}

// Do not edit the line below.
exports.validStartingCity = validStartingCity;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const distances = [5, 25, 15, 10, 15];
  const fuel = [1, 2, 1, 0, 3];
  const mpg = 10;
  const expected = 4;
  const actual = program.validStartingCity(distances, fuel, mpg);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.validStartingCity

class ProgramTest {
    @Test
    fun TestCase1() {
        val distances = listOf(5, 25, 15, 10, 15)
        val fuel = listOf(1, 2, 1, 0, 3)
        val mpg = 10
        val expected = 4
        val output = validStartingCity(distances, fuel, mpg)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^2) time | O(1) space - where n is the number of cities
fun validStartingCity(distances: List<Int>, fuel: List<Int>, mpg: Int): Int {
    val numberOfCities = distances.size

    for (startCityIdx in 0 until numberOfCities) {
        var milesRemaining = 0

        for (currentCityIdx in startCityIdx until startCityIdx + numberOfCities) {
            if (milesRemaining < 0) continue

            val currentCityIdx = currentCityIdx % numberOfCities

            val fuelFromCurrentCity = fuel[currentCityIdx]
            val distanceToNextCity = distances[currentCityIdx]
            milesRemaining += fuelFromCurrentCity * mpg - distanceToNextCity
        }

        if (milesRemaining >= 0) return startCityIdx
    }

    // This line should never be reached if the inputs are correct.
    return -1
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n) time | O(1) space - where n is the number of cities
fun validStartingCity(distances: List<Int>, fuel: List<Int>, mpg: Int): Int {
    val numberOfCities = distances.size
    var milesRemaining = 0

    var indexOfStartingCityCandidate = 0
    var milesRemainingAtStartingCityCandidate = 0

    for (cityIdx in 1 until numberOfCities) {
        val distanceFromPreviousCity = distances[cityIdx - 1]
        val fuelFromPreviousCity = fuel[cityIdx - 1]
        milesRemaining += fuelFromPreviousCity * mpg - distanceFromPreviousCity

        if (milesRemaining < milesRemainingAtStartingCityCandidate) {
            milesRemainingAtStartingCityCandidate = milesRemaining
            indexOfStartingCityCandidate = cityIdx
        }
    }

    return indexOfStartingCityCandidate
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.validStartingCity

class ProgramTest {
    @Test
    fun TestCase1() {
        val distances = listOf(5, 25, 15, 10, 15)
        val fuel = listOf(1, 2, 1, 0, 3)
        val mpg = 10
        val expected = 4
        val output = validStartingCity(distances, fuel, mpg)
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
      var distances = [5, 25, 15, 10, 15]
      var fuel = [1, 2, 1, 0, 3]
      var mpg = 10
      var expected = 4
      var actual = Program().validStartingCity(distances, fuel, mpg)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(1) space - where n is the number of cities
  func validStartingCity(_ distances: [Int], _ fuel: [Int], _ mpg: Int) -> Int {
    let numberOfCities = distances.count

    for startCityIdx in stride(from: 0, to: numberOfCities, by: 1) {
      var milesRemaining = 0

      for currentCityIdx in stride(from: startCityIdx, to: startCityIdx + numberOfCities, by: 1) {
        if milesRemaining < 0 {
          continue
        }

        let currentCityIdx = currentCityIdx % numberOfCities

        let fuelFromCurrentCity = fuel[currentCityIdx]
        let distanceToNextCity = distances[currentCityIdx]
        milesRemaining += fuelFromCurrentCity * mpg - distanceToNextCity
      }

      if milesRemaining >= 0 {
        return startCityIdx
      }
    }

    // This line should never be reached if the inputs are correct.
    return -1
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(1) space - where n is the number of cities
  func validStartingCity(_ distances: [Int], _ fuel: [Int], _ mpg: Int) -> Int {
    let numberOfCities = distances.count

    var milesRemaining = 0

    var indexOfStartingCityCandidate = 0
    var milesRemainingAtStartingCityCandidate = 0

    for cityIdx in stride(from: 1, to: numberOfCities, by: 1) {
      let distanceFromPreviousCity = distances[cityIdx - 1]
      let fuelFromPreviousCity = fuel[cityIdx - 1]
      milesRemaining += fuelFromPreviousCity * mpg - distanceFromPreviousCity

      if milesRemaining < milesRemainingAtStartingCityCandidate {
        milesRemainingAtStartingCityCandidate = milesRemaining
        indexOfStartingCityCandidate = cityIdx
      }
    }

    return indexOfStartingCityCandidate
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var distances = [5, 25, 15, 10, 15]
      var fuel = [1, 2, 1, 0, 3]
      var mpg = 10
      var expected = 4
      var actual = Program().validStartingCity(distances, fuel, mpg)
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
        distances = [5, 25, 15, 10, 15]
        fuel = [1, 2, 1, 0, 3]
        mpg = 10
        expected = 4
        actual = program.validStartingCity(distances, fuel, mpg)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(1) space - where n is the number of cities
def validStartingCity(distances, fuel, mpg):
    numberOfCities = len(distances)

    for startCityIdx in range(numberOfCities):
        milesRemaining = 0

        for currentCityIdx in range(startCityIdx, startCityIdx + numberOfCities):
            if milesRemaining < 0:
                continue

            currentCityIdx = currentCityIdx % numberOfCities

            fuelFromCurrentCity = fuel[currentCityIdx]
            distanceToNextCity = distances[currentCityIdx]
            milesRemaining += fuelFromCurrentCity * mpg - distanceToNextCity

        if milesRemaining >= 0:
            return startCityIdx

    # This line should never be reached if the inputs are correct.
    return -1

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space - where n is the number of cities
def validStartingCity(distances, fuel, mpg):
    numberOfCities = len(distances)
    milesRemaining = 0

    indexOfStartingCityCandidate = 0
    milesRemainingAtStartingCityCandidate = 0

    for cityIdx in range(1, numberOfCities):
        distanceFromPreviousCity = distances[cityIdx - 1]
        fuelFromPreviousCity = fuel[cityIdx - 1]
        milesRemaining += fuelFromPreviousCity * mpg - distanceFromPreviousCity

        if milesRemaining < milesRemainingAtStartingCityCandidate:
            milesRemainingAtStartingCityCandidate = milesRemaining
            indexOfStartingCityCandidate = cityIdx

    return indexOfStartingCityCandidate

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        distances = [5, 25, 15, 10, 15]
        fuel = [1, 2, 1, 0, 3]
        mpg = 10
        expected = 4
        actual = program.validStartingCity(distances, fuel, mpg)
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
  const distances = [5, 25, 15, 10, 15];
  const fuel = [1, 2, 1, 0, 3];
  const mpg = 10;
  const expected = 4;
  const actual = program.validStartingCity(distances, fuel, mpg);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(1) space - where n is the number of cities
export function validStartingCity(distances: number[], fuel: number[], mpg: number) {
  const numberOfCities = distances.length;

  for (let startCityIdx = 0; startCityIdx < numberOfCities; startCityIdx++) {
    let milesRemaining = 0;

    for (let currentCityIdx = startCityIdx; currentCityIdx < startCityIdx + numberOfCities; currentCityIdx++) {
      if (milesRemaining < 0) continue;

      const currentCityIdxRotated = currentCityIdx % numberOfCities;

      const fuelFromCurrentCity = fuel[currentCityIdxRotated];
      const distanceToNextCity = distances[currentCityIdxRotated];
      milesRemaining += fuelFromCurrentCity * mpg - distanceToNextCity;
    }

    if (milesRemaining >= 0) return startCityIdx;
  }

  // This line should never be reached if the inputs are correct.
  return -1;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the number of cities
export function validStartingCity(distances: number[], fuel: number[], mpg: number) {
  const numberOfCities = distances.length;
  let milesRemaining = 0;

  let indexOfStartingCityCandidate = 0;
  let milesRemainingAtStartingCityCandidate = 0;

  for (let cityIdx = 1; cityIdx < numberOfCities; cityIdx++) {
    const distanceFromPreviousCity = distances[cityIdx - 1];
    const fuelFromPreviousCity = fuel[cityIdx - 1];
    milesRemaining += fuelFromPreviousCity * mpg - distanceFromPreviousCity;

    if (milesRemaining < milesRemainingAtStartingCityCandidate) {
      milesRemainingAtStartingCityCandidate = milesRemaining;
      indexOfStartingCityCandidate = cityIdx;
    }
  }

  return indexOfStartingCityCandidate;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const distances = [5, 25, 15, 10, 15];
  const fuel = [1, 2, 1, 0, 3];
  const mpg = 10;
  const expected = 4;
  const actual = program.validStartingCity(distances, fuel, mpg);
  chai.expect(actual).to.deep.equal(expected);
});

```

