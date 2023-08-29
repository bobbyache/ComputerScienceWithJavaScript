# Detect Arbitrage
<div class="html">
<p>
  You're given a two-dimensional array (a matrix) of equal height and width that
  represents the exchange rates of arbitrary currencies. The length of the array
  is the number of currencies, and every currency can be converted to every
  other currency. Each currency is represented by a row in the array, where
  values in that row are the floating-point exchange rates between the row's
  currency and all other currencies, as in the example below.
</p>
<pre>
         0:USD 1:CAD  2:GBP 
  0:USD [  1.0, 1.27, 0.718] 
  1:CAD [ 0.74,  1.0,  0.56] 
  2:GBP [ 1.39, 1.77,   1.0]
</pre>
<p>
  In the matrix above, you can see that row <span>0</span> represents USD, which
  means that row <span>0</span> contains the exchange rates for
  <span>1</span> USD to all other currencies. Since row
  <span>1</span> represents CAD, index <span>1</span> in the USD row contains
  the exchange for <span>1</span> USD to CAD. The currency labels are listed
  above to help you visualize the problem, but they won't actually be included
  in any inputs and aren't relevant to solving this problem.
</p>
<p>
  Write a function that returns a boolean representing whether an arbitrage
  opportunity exists with the given exchange rates. An arbitrage occurs if you
  can start with <span>C</span> units of one currency and execute a series of
  exchanges that lead you to having more than <span>C</span> units of the same
  currency you started with.
</p>
<p>
  Note: currency exchange rates won't represent real-world exchange rates, and
  there might be multiple ways to generate an arbitrage.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">exchangeRates</span> = [
  [   1.0, 0.8631, 0.5903],
  [1.1586,    1.0, 0.6849],
  [1.6939,   1.46,    1.0],
]
</pre>
<h3>Sample Output</h3>
<pre>
true 
</pre>
</div>

Hint 1
<p>
  Try treating this problem like a graph problem, where the currencies are the
  vertices and the exchange rates are the edges. Think about what properties of
  this graph would determine if there's an arbitrage opportunity.
</p>


Hint 2

<p>
  If you're able to find a cycle in the graph whose edges multiply to more than
  <span>1</span>, then you've found an arbitrage. If a cycle that fits this
  criteria exists, there must be an arbitrage, because it means that you can
  start at a certain currency in the cycle and return back to that original
  currency with more units than you started with.
</p>


Hint 3

<p>
  Finding a cycle whose edges multiply to more than <span>1</span> isn't a very
  common problem in Computer Science. However, finding a cycle whose edges add
  up to a negative value (a negative weight cycle) is much more common. Is there
  a way that you can mutate the edge weights in your graph such that finding a
  negative weight cycle in this mutated graph indicates an arbitrage? Hint:
  think about logarithms and how <span>log(a * b) = log(a) + log(b)</span>.
</p>


Hint 4

<p>
  Change all of the edge weights in the graph to be their negative logarithm. In
  other words, create a new matrix of exchange rates, where every value is the
  negative logarithm of the original exchange rate. Once this is done, you can
  use the Bellman-Ford algorithm to detect the presence of a negative weight
  cycle in the graph. If you detect a negative weight cycle, then an arbitrage
  exists. See the Conceptual Overview section of this question's video
  explanation for a more in-depth explanation.
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
      vector<vector<double>> input = {
          {1.0, 0.8631, 0.5903},
          {1.1586, 1.0, 0.6849},
          {1.6939, 1.46, 1.0},
      };
      auto expected = true;
      auto actual = detectArbitrage(input);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <limits>
#include <cmath>
using namespace std;

bool foundNegativeWeightCycle(vector<vector<double>> graph, int start);
bool relaxEdgesAndUpdateDistances(vector<vector<double>> &graph,
                                  vector<double> &distances);
vector<vector<double>> convertToLogMatrix(vector<vector<double>> matrix);

// O(n^3) time | O(n^2) space - where n is the number of currencies
bool detectArbitrage(vector<vector<double>> exchangeRates) {
  // To use exchange rates as edge weights, we must be able to add them.
  // Since log(a*b) = log(a) + log(b), we can convert all rates to
  // -log10(rate) to use them as edge weights.
  vector<vector<double>> logExchangeRates = convertToLogMatrix(exchangeRates);

  // A negative weight cycle indicates an arbitrage.
  return foundNegativeWeightCycle(logExchangeRates, 0);
}

// Runs the Bellman–Ford Algorithm to detect any negative-weight cycles.
bool foundNegativeWeightCycle(vector<vector<double>> graph, int start) {
  vector<double> distancesFromStart(graph.size(),
                                    numeric_limits<double>::max());
  distancesFromStart[start] = 0;

  for (int unused = 0; unused < graph.size(); unused++) {
    // If no update occurs, that means there's no negative cycle.
    if (!relaxEdgesAndUpdateDistances(graph, distancesFromStart)) {
      return false;
    }
  }

  return relaxEdgesAndUpdateDistances(graph, distancesFromStart);
}

// Returns `true` if any distance was updated
bool relaxEdgesAndUpdateDistances(vector<vector<double>> &graph,
                                  vector<double> &distances) {
  bool updated = false;

  for (int sourceIdx = 0; sourceIdx < graph.size(); sourceIdx++) {
    vector<double> edges = graph[sourceIdx];
    for (int destinationIdx = 0; destinationIdx < edges.size();
         destinationIdx++) {
      double edgeWeight = edges[destinationIdx];
      double newDistanceToDestination = distances[sourceIdx] + edgeWeight;
      if (newDistanceToDestination < distances[destinationIdx]) {
        updated = true;
        distances[destinationIdx] = newDistanceToDestination;
      }
    }
  }

  return updated;
}

vector<vector<double>> convertToLogMatrix(vector<vector<double>> matrix) {
  vector<vector<double>> newMatrix;

  for (int row = 0; row < matrix.size(); row++) {
    vector<double> rates = matrix[row];
    newMatrix.push_back(vector<double>{});
    for (auto rate : rates) {
      newMatrix[row].push_back(-log10(rate));
    }
  }

  return newMatrix;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<double>> input = {
          {1.0, 0.8631, 0.5903},
          {1.1586, 1.0, 0.6849},
          {1.6939, 1.46, 1.0},
      };
      auto expected = true;
      auto actual = detectArbitrage(input);
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
		List<List<Double> > input = new List<List<Double> >();
		input.Add(new List<double> {
			1.0, 0.8631, 0.5903
		});
		input.Add(new List<double> {
			1.1586, 1.0, 0.6849
		});
		input.Add(new List<double> {
			1.6939, 1.46, 1.0
		});
		bool expected = true;
		var actual = new Program().DetectArbitrage(input);
		Utils.AssertTrue(expected == actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System.Linq;
using System;


public class Program {

	// O(n^3) time | O(n^2) space - where n is the number of currencies
	public bool DetectArbitrage(List<List<Double> > exchangeRates) {
		// To use exchange rates as edge weights, we must be able to add them.
		// Since log(a*b) = log(a) + log(b), we can convert all rates to
		// -log10(rate) to use them as edge weights.
		List<List<Double> > logExchangeRates = convertToLogMatrix(exchangeRates);

		// A negative weight cycle indicates an arbitrage.
		return foundNegativeWeightCycle(logExchangeRates, 0);
	}

	// Runs the Bellman–Ford Algorithm to detect any negative-weight cycles.
	public bool foundNegativeWeightCycle(List<List<Double> > graph, int start) {
		double[] distancesFromStart = new double[graph.Count];
		Array.Fill(distancesFromStart, Double.MaxValue);
		distancesFromStart[start] = 0;

		for (int unused = 0; unused < graph.Count; unused++) {
			// If no update occurs, that means there's no negative cycle.
			if (!relaxEdgesAndUpdateDistances(graph, distancesFromStart)) {
				return false;
			}
		}

		return relaxEdgesAndUpdateDistances(graph, distancesFromStart);
	}

	// Returns `true` if any distance was updated
	public bool relaxEdgesAndUpdateDistances(List<List<Double> > graph, double[] distances) {
		bool updated = false;

		for (int sourceIdx = 0; sourceIdx < graph.Count; sourceIdx++) {
			List<Double> edges = graph[sourceIdx];
			for (int destinationIdx = 0; destinationIdx < edges.Count;
			  destinationIdx++) {
				double edgeWeight = edges[destinationIdx];
				double newDistanceToDestination = distances[sourceIdx] + edgeWeight;
				if (newDistanceToDestination < distances[destinationIdx]) {
					updated = true;
					distances[destinationIdx] = newDistanceToDestination;
				}
			}
		}

		return updated;
	}

	public List<List<Double> > convertToLogMatrix(List<List<Double> > matrix) {
		List<List<Double> > newMatrix = new List<List<Double> >();

		for (int row = 0; row < matrix.Count; row++) {
			List<Double> rates = matrix[row];
			newMatrix.Add(new List<Double>());
			foreach (var rate in rates) {
				newMatrix[row].Add(-Math.Log10(rate));
			}
		}

		return newMatrix;
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
		List<List<Double> > input = new List<List<Double> >();
		input.Add(new List<double> {
			1.0, 0.8631, 0.5903
		});
		input.Add(new List<double> {
			1.1586, 1.0, 0.6849
		});
		input.Add(new List<double> {
			1.6939, 1.46, 1.0
		});
		bool expected = true;
		var actual = new Program().DetectArbitrage(input);
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
	input := [][]float64{
		{1.0, 0.8631, 0.5903},
		{1.1586, 1.0, 0.6849},
		{1.6939, 1.46, 1.0},
	}
	expected := true
	actual := DetectArbitrage(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"math"
)

// O(n^3) time | O(n^2) space - where n is the number of currencies
func DetectArbitrage(exchangeRates [][]float64) bool {
	// To use exchange rates as edge weights, we must be able to add them.
	// Since log(a*b) = log(a) + log(b), we can convert all rates to
	// -log10(rate) to use them as edge weights.
	logExchangeRates := convertToLogMatrix(exchangeRates)

	// A negative weight cycle indicates an arbitrage.
	return foundNegativeWeightCycle(logExchangeRates, 0)
}

// Runs the Bellman–Ford Algorithm to detect any negative-weight cycles.
func foundNegativeWeightCycle(graph [][]float64, start int) bool {
	distancesFromStart := make([]float64, len(graph))
	for i := range distancesFromStart {
		distancesFromStart[i] = math.MaxFloat64
	}
	distancesFromStart[start] = 0.0

	for unused := 0; unused < len(graph)-1; unused++ {
		// If no update occurs, that means there's no negative cycle.
		if !relaxEdgesAndUpdateDistances(graph, distancesFromStart) {
			return false
		}
	}

	return relaxEdgesAndUpdateDistances(graph, distancesFromStart)
}

// Returns `true` if any distance was updated.
func relaxEdgesAndUpdateDistances(graph [][]float64, distances []float64) bool {
	var updated = false
	for sourceIdx := range graph {
		edges := graph[sourceIdx]
		for destinationIdx := range edges {
			edgeWeight := edges[destinationIdx]
			newDistanceToDestination := distances[sourceIdx] + edgeWeight
			if newDistanceToDestination < distances[destinationIdx] {
				updated = true
				distances[destinationIdx] = newDistanceToDestination
			}
		}

	}

	return updated
}

func convertToLogMatrix(matrix [][]float64) [][]float64 {
	newMatrix := make([][]float64, len(matrix))
	for row, rates := range matrix {
		for _, rate := range rates {
			newMatrix[row] = append(newMatrix[row], -math.Log10(rate))
		}
	}

	return newMatrix
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := [][]float64{
		{1.0, 0.8631, 0.5903},
		{1.1586, 1.0, 0.6849},
		{1.6939, 1.46, 1.0},
	}
	expected := true
	actual := DetectArbitrage(input)
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
    ArrayList<ArrayList<Double>> input = new ArrayList<ArrayList<Double>>();
    input.add(new ArrayList<Double>(Arrays.asList(1.0, 0.8631, 0.5903)));
    input.add(new ArrayList<Double>(Arrays.asList(1.1586, 1.0, 0.6849)));
    input.add(new ArrayList<Double>(Arrays.asList(1.6939, 1.46, 1.0)));
    boolean expected = true;
    var actual = new Program().detectArbitrage(input);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n^3) time | O(n^2) space - where n is the number of currencies
  public boolean detectArbitrage(ArrayList<ArrayList<Double>> exchangeRates) {
    // To use exchange rates as edge weights, we must be able to add them.
    // Since log(a*b) = log(a) + log(b), we can convert all rates to
    // -log10(rate) to use them as edge weights.
    ArrayList<ArrayList<Double>> logExchangeRates = convertToLogMatrix(exchangeRates);

    // A negative weight cycle indicates an arbitrage.
    return foundNegativeWeightCycle(logExchangeRates, 0);
  }

  // Runs the Bellman–Ford Algorithm to detect any negative-weight cycles.
  public boolean foundNegativeWeightCycle(ArrayList<ArrayList<Double>> graph, int start) {
    double[] distancesFromStart = new double[graph.size()];
    Arrays.fill(distancesFromStart, Double.MAX_VALUE);
    distancesFromStart[start] = 0;

    for (int unused = 0; unused < graph.size(); unused++) {
      // If no update occurs, that means there's no negative cycle.
      if (!relaxEdgesAndUpdateDistances(graph, distancesFromStart)) {
        return false;
      }
    }

    return relaxEdgesAndUpdateDistances(graph, distancesFromStart);
  }

  // Returns `true` if any distance was updated
  public boolean relaxEdgesAndUpdateDistances(
      ArrayList<ArrayList<Double>> graph, double[] distances) {
    boolean updated = false;

    for (int sourceIdx = 0; sourceIdx < graph.size(); sourceIdx++) {
      ArrayList<Double> edges = graph.get(sourceIdx);
      for (int destinationIdx = 0; destinationIdx < edges.size(); destinationIdx++) {
        double edgeWeight = edges.get(destinationIdx);
        double newDistanceToDestination = distances[sourceIdx] + edgeWeight;
        if (newDistanceToDestination < distances[destinationIdx]) {
          updated = true;
          distances[destinationIdx] = newDistanceToDestination;
        }
      }
    }

    return updated;
  }

  public ArrayList<ArrayList<Double>> convertToLogMatrix(ArrayList<ArrayList<Double>> matrix) {
    ArrayList<ArrayList<Double>> newMatrix = new ArrayList<ArrayList<Double>>();

    for (int row = 0; row < matrix.size(); row++) {
      ArrayList<Double> rates = matrix.get(row);
      newMatrix.add(new ArrayList<Double>());
      for (Double rate : rates) {
        newMatrix.get(row).add(-Math.log10(rate));
      }
    }

    return newMatrix;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    ArrayList<ArrayList<Double>> input = new ArrayList<ArrayList<Double>>();
    input.add(new ArrayList<Double>(Arrays.asList(1.0, 0.8631, 0.5903)));
    input.add(new ArrayList<Double>(Arrays.asList(1.1586, 1.0, 0.6849)));
    input.add(new ArrayList<Double>(Arrays.asList(1.6939, 1.46, 1.0)));
    boolean expected = true;
    var actual = new Program().detectArbitrage(input);
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
  const input = [
    [1.0, 0.8631, 0.5903],
    [1.1586, 1.0, 0.6849],
    [1.6939, 1.46, 1.0],
  ];
  const expected = true;
  const actual = program.detectArbitrage(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^3) time | O(n^2) space - where n is the number of currencies
function detectArbitrage(exchangeRates) {
  // To use exchange rates as edge weights, we must be able to add them.
  // Since log(a*b) = log(a) + log(b), we can convert all rates to
  // -log10(rate) to use them as edge weights.
  const logExchangeRates = convertToLogMatrix(exchangeRates);

  // A negative weight cycle indicates an arbitrage.
  return foundNegativeWeightCycle(logExchangeRates, 0);
}

// Runs the Bellman–Ford Algorithm to detect any negative-weight cycles.
function foundNegativeWeightCycle(graph, start) {
  const distancesFromStart = new Array(graph.length).fill(Infinity);
  distancesFromStart[start] = 0;

  for (let idx = 0; idx < graph.length - 1; idx++) {
    // If no update occurs, that means there's no negative cycle.
    if (!relaxEdgesAndUpdateDistances(graph, distancesFromStart)) return false;
  }

  return relaxEdgesAndUpdateDistances(graph, distancesFromStart);
}

// Returns `true` if any distance was updated
function relaxEdgesAndUpdateDistances(graph, distances) {
  let updated = false;
  for (let sourceIdx = 0; sourceIdx < graph.length; sourceIdx++) {
    const edges = graph[sourceIdx];
    for (let destinationIdx = 0; destinationIdx < edges.length; destinationIdx++) {
      const edgeWeight = edges[destinationIdx];
      const newDistanceToDestination = distances[sourceIdx] + edgeWeight;
      if (newDistanceToDestination < distances[destinationIdx]) {
        updated = true;
        distances[destinationIdx] = newDistanceToDestination;
      }
    }
  }

  return updated;
}

function convertToLogMatrix(matrix) {
  const newMatrix = [];
  for (let row = 0; row < matrix.length; row++) {
    const rates = matrix[row];
    newMatrix.push([]);
    for (const rate of rates) {
      newMatrix[row].push(-Math.log10(rate));
    }
  }
  return newMatrix;
}

// Do not edit the line below.
exports.detectArbitrage = detectArbitrage;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const input = [
    [1.0, 0.8631, 0.5903],
    [1.1586, 1.0, 0.6849],
    [1.6939, 1.46, 1.0],
  ];
  const expected = true;
  const actual = program.detectArbitrage(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.detectArbitrage

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(
            listOf(1.0, 0.8631, 0.5903),
            listOf(1.1586, 1.0, 0.6849),
            listOf(1.6939, 1.46, 1.0)
        )
        val expected = true
        val output = detectArbitrage(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.log10

// O(n^3) time | O(n^2) space - where n is the number of currencies
fun detectArbitrage(exchangeRates: List<List<Double>>): Boolean {
    // To use exchange rates as edge weights, we must be able to add them.
    // Since log(a*b) = log(a) + log(b), we can convert all rates to 
    // -log10(rate) to use them as edge weights.
    val logExchangeRates = convertToLogMatrix(exchangeRates)

    // A negative weight cycle indicates an arbitrage.
    return foundNegativeWeightCycle(logExchangeRates, 0)
}

// Runs the Bellman–Ford Algorithm to detect any negative-weight cycles.
fun foundNegativeWeightCycle(graph: List<List<Double>>, start: Int): Boolean {
    val distancesFromStart = MutableList(graph.size) { Double.MAX_VALUE }
    distancesFromStart[start] = 0.0

    for (unused in 0 until graph.size - 1) {
        // If no update occurs, that means there's no negative cycle.
        if (!relaxEdgesAndUpdateDistances(graph, distancesFromStart)) return false
    }

    return relaxEdgesAndUpdateDistances(graph, distancesFromStart)
}

// Returns `true` if any distance was updated.
fun relaxEdgesAndUpdateDistances(graph: List<List<Double>>, distances: MutableList<Double>): Boolean {
    var updated = false
    for (sourceIdx in 0 until graph.size) {
        val edges = graph[sourceIdx]
        for (destinationIdx in 0 until edges.size) {
            val edgeWeight = edges[destinationIdx]
            val newDistanceToDestination = distances[sourceIdx] + edgeWeight
            if (newDistanceToDestination < distances[destinationIdx]) {
                updated = true
                distances[destinationIdx] = newDistanceToDestination
            }
        }
    }

    return updated
}

fun convertToLogMatrix(matrix: List<List<Double>>): List<List<Double>> {
    val newMatrix = mutableListOf<MutableList<Double>>()
    for (row in 0 until matrix.size) {
        val rates = matrix[row]
        newMatrix.add(mutableListOf<Double>())
        for (rate in rates) {
            newMatrix[row].add(-log10(rate))
        }
    }

    return newMatrix
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.detectArbitrage

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = listOf(
            listOf(1.0, 0.8631, 0.5903),
            listOf(1.1586, 1.0, 0.6849),
            listOf(1.6939, 1.46, 1.0)
        )
        val expected = true
        val output = detectArbitrage(input)
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
      let input = [
        [1.0, 0.8631, 0.5903],
        [1.1586, 1.0, 0.6849],
        [1.6939, 1.46, 1.0],
      ]
      let expected = true
      var actual = Program().detectArbitrage(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import Foundation

class Program {
  // O(n^3) time | O(n^2) space - where n is the number of currencies
  func detectArbitrage(_ exchangeRates: [[Double]]) -> Bool {
    // To use exchange rates as edge weights, we must be able to add them.
    // Since log(a*b) = log(a) + log(b), we can convert all rates to
    // -log10(rate) to use them as edge weights.
    let logExchangeRates = convertToLogMatrix(exchangeRates)

    // A negative weight cycle indicates an arbitrage.
    return foundNegativeWeightCycle(logExchangeRates, 0)
  }

  // Runs the Bellman–Ford Algorithm to detect any negative-weight cycles.
  func foundNegativeWeightCycle(_ graph: [[Double]], _ start: Int) -> Bool {
    var distancesFromStart = Array(repeating: Double.greatestFiniteMagnitude, count: graph.count)
    distancesFromStart[start] = 0.0

    for unused in stride(from: 0, to: graph.count - 1, by: 1) {
      // If no update occurs, that means there's no negative cycle.
      if !relaxEdgesAndUpdateDistances(graph, &distancesFromStart) {
        return false
      }
    }

    return relaxEdgesAndUpdateDistances(graph, &distancesFromStart)
  }

  // Returns `true` if any distance was updated.
  func relaxEdgesAndUpdateDistances(_ graph: [[Double]], _ distances: inout [Double]) -> Bool {
    var updated = false
    for sourceIdx in stride(from: 0, to: graph.count, by: 1) {
      let edges = graph[sourceIdx]
      for destinationIdx in stride(from: 0, to: edges.count, by: 1) {
        let edgeWeight = edges[destinationIdx]
        let newDistanceToDestination = distances[sourceIdx] + edgeWeight
        if newDistanceToDestination < distances[destinationIdx] {
          updated = true
          distances[destinationIdx] = newDistanceToDestination
        }
      }
    }

    return updated
  }

  func convertToLogMatrix(_ matrix: [[Double]]) -> [[Double]] {
    var newMatrix = [[Double]]()
    for rates in matrix {
      var newRow = [Double]()
      for rate in rates {
        newRow.append(-log10(rate))
      }
      newMatrix.append(newRow)
    }

    return newMatrix
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let input = [
        [1.0, 0.8631, 0.5903],
        [1.1586, 1.0, 0.6849],
        [1.6939, 1.46, 1.0],
      ]
      let expected = true
      var actual = Program().detectArbitrage(input)
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
        input = [[1.0, 0.8631, 0.5903], [1.1586, 1.0, 0.6849], [1.6939, 1.46, 1.0]]
        expected = True
        actual = program.detectArbitrage(input)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

import math

# O(n^3) time | O(n^2) space - where n is the number of currencies
def detectArbitrage(exchangeRates):
    # To use exchange rates as edge weights, we must be able to add them.
    # Since log(a*b) = log(a) + log(b), we can convert all rates to
    # -log10(rate) to use them as edge weights.
    logExchangeRates = convertToLogMatrix(exchangeRates)

    # A negative weight cycle indicates an arbitrage.
    return foundNegativeWeightCycle(logExchangeRates, 0)


# Runs the Bellman–Ford Algorithm to detect any negative-weight cycles.
def foundNegativeWeightCycle(graph, start):
    distancesFromStart = [float("inf") for _ in range(len(graph))]
    distancesFromStart[start] = 0

    for _ in range(len(graph) - 1):
        # If no update occurs, that means there's no negative cycle.
        if not relaxEdgesAndUpdateDistances(graph, distancesFromStart):
            return False

    return relaxEdgesAndUpdateDistances(graph, distancesFromStart)


# Returns `True` if any distance was updated
def relaxEdgesAndUpdateDistances(graph, distances):
    updated = False
    for sourceIdx, edges in enumerate(graph):
        for destinationIdx, edgeWeight in enumerate(edges):
            newDistanceToDestination = distances[sourceIdx] + edgeWeight
            if newDistanceToDestination < distances[destinationIdx]:
                updated = True
                distances[destinationIdx] = newDistanceToDestination

    return updated


def convertToLogMatrix(matrix):
    newMatrix = []
    for row, rates in enumerate(matrix):
        newMatrix.append([])
        for rate in rates:
            newMatrix[row].append(-math.log10(rate))

    return newMatrix

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        input = [[1.0, 0.8631, 0.5903], [1.1586, 1.0, 0.6849], [1.6939, 1.46, 1.0]]
        expected = True
        actual = program.detectArbitrage(input)
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
  const input = [
    [1.0, 0.8631, 0.5903],
    [1.1586, 1.0, 0.6849],
    [1.6939, 1.46, 1.0],
  ];
  const expected = true;
  const actual = program.detectArbitrage(input);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^3) time | O(n^2) space - where n is the number of currencies
export function detectArbitrage(exchangeRates: number[][]) {
  // To use exchange rates as edge weights, we must be able to add them.
  // Since log(a*b) = log(a) + log(b), we can convert all rates to
  // -log10(rate) to use them as edge weights.
  const logExchangeRates = convertToLogMatrix(exchangeRates);

  // A negative weight cycle indicates an arbitrage.
  return foundNegativeWeightCycle(logExchangeRates, 0);
}

// Runs the Bellman–Ford Algorithm to detect any negative-weight cycles.
function foundNegativeWeightCycle(graph: number[][], start: number) {
  const distancesFromStart = new Array(graph.length).fill(Infinity);
  distancesFromStart[start] = 0;

  for (let idx = 0; idx < graph.length - 1; idx++) {
    // If no update occurs, that means there's no negative cycle.
    if (!relaxEdgesAndUpdateDistances(graph, distancesFromStart)) return false;
  }

  return relaxEdgesAndUpdateDistances(graph, distancesFromStart);
}

// Returns `true` if any distance was updated
function relaxEdgesAndUpdateDistances(graph: number[][], distances: number[]) {
  let updated = false;
  for (let sourceIdx = 0; sourceIdx < graph.length; sourceIdx++) {
    const edges = graph[sourceIdx];
    for (let destinationIdx = 0; destinationIdx < edges.length; destinationIdx++) {
      const edgeWeight = edges[destinationIdx];
      const newDistanceToDestination = distances[sourceIdx] + edgeWeight;
      if (newDistanceToDestination < distances[destinationIdx]) {
        updated = true;
        distances[destinationIdx] = newDistanceToDestination;
      }
    }
  }

  return updated;
}

function convertToLogMatrix(matrix: number[][]) {
  const newMatrix: number[][] = [];
  for (let row = 0; row < matrix.length; row++) {
    const rates = matrix[row];
    newMatrix.push([]);
    for (const rate of rates) {
      newMatrix[row].push(-Math.log10(rate));
    }
  }
  return newMatrix;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const input = [
    [1.0, 0.8631, 0.5903],
    [1.1586, 1.0, 0.6849],
    [1.6939, 1.46, 1.0],
  ];
  const expected = true;
  const actual = program.detectArbitrage(input);
  chai.expect(actual).to.deep.equal(expected);
});

```

