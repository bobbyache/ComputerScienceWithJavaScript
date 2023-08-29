# Stable internships
<div class="html">
<p>
  A company has hired N interns to each join one of N different teams. Each
  intern has ranked their preferences for which teams they wish to join, and
  each team has ranked their preferences for which interns they prefer.
</p>
<p>
  Given these preferences, assign 1 intern to each team. These assignments
  should be "stable," meaning that there is no unmatched pair of an intern and a
  team such that both that intern and that team would prefer they be matched
  with each other.
</p>
<p>
  In the case there are multiple valid stable matchings, the solution that is
  most optimal for the interns should be chosen (i.e. every intern should be
  matched with the best team possible for them).
</p>
<p>
  Your function should take in 2 2-dimensional lists, one for interns and
  one for teams. Each inner list represents a single intern or team's preferences,
  ranked from most preferable to least preferable. These lists will always be
  of length N, with integers as elements. Each of these integers corresponds
  to the index of the team/intern being ranked. Your function should return a
  2-dimensional list of matchings in no particular order. Each matching should
  be in the format [internIndex, teamIndex].
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">interns</span> = [
  [0, 1, 2],
  [1, 0, 2],
  [1, 2, 0]
]
</pre>
<pre>
<span class="CodeEditor-promptParameter">teams</span> = [
  [2, 1, 0],
  [1, 2, 0],
  [0, 2, 1]
]
</pre>
<h3>Sample Output</h3>
<pre>
<span class="CodeEditor-promptComment">// This is the most optimal solution for interns</span>
[
  [0, 0],
  [1, 1],
  [2, 2]
]
</pre>

<pre>
<span class="CodeEditor-promptComment">// This is also a stable matching, but it is suboptimal for the interns
// because interns 0 and 2 could have been given better team matchings</span>
[
  [2, 0],
  [1, 1],
  [0, 2]
]
</pre>
</div>

Hint 1
<p>
  Try starting out by solving the most basic version of this problem. What would
  you do if every intern had a unique first choice?
</p>


Hint 2

<p>
  If two interns had the same first choice, how can you decide which intern
  gets that team to keep the matchings stable?
</p>


Hint 3

<p>
  To optimize performance, it might be helpful to first convert the input into
  a different data structure.
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
      vector<vector<int>> interns = {{0, 1}, {1, 0}};
      vector<vector<int>> teams = {{1, 0}, {1, 0}};
      vector<vector<int>> expected = {{0, 0}, {1, 1}};
      auto actual = stableInternships(interns, teams);

      assert(expected.size() == actual.size());

      for (auto match : expected) {
        bool containsMatch = false;
        for (auto actualMatch : actual) {
          if (actualMatch[0] == match[0] && actualMatch[1] == match[1]) {
            containsMatch = true;
          }
        }
        assert(containsMatch);
      }
    });
  }
};


```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <unordered_map>
#include <stack>
using namespace std;

// O(n^2) time | O(n^2) space - where n is the number of interns and teams
vector<vector<int>> stableInternships(vector<vector<int>> interns, vector<vector<int>> teams) {
  unordered_map<int, int> chosenInterns;
  stack<int> freeInterns;
  for (int i = 0; i < interns.size(); i++) {
    freeInterns.push(i);
  }
  vector<int> currentInternChoices(interns.size(), 0);

  vector<unordered_map<int, int>> teamMaps;
  for (vector<int> team : teams) {
    unordered_map<int, int> rank;
    for (int i = 0; i < teams.size(); i++) {
      rank[team[i]] = i;
    }
    teamMaps.push_back(rank);
  }

  while (!freeInterns.empty()) {
    int internNum = freeInterns.top();
    freeInterns.pop();

    vector<int> intern = interns[internNum];
    int teamPreference = intern[currentInternChoices[internNum]];
    currentInternChoices[internNum]++;

    if (chosenInterns.find(teamPreference) == chosenInterns.end()) {
      chosenInterns[teamPreference] = internNum;
      continue;
    }

    int previousIntern = chosenInterns[teamPreference];
    int previousInternRank = teamMaps[teamPreference][previousIntern];
    int currentInternRank = teamMaps[teamPreference][internNum];

    if (currentInternRank < previousInternRank) {
      freeInterns.push(previousIntern);
      chosenInterns[teamPreference] = internNum;
    } else {
      freeInterns.push(internNum);
    }
  }

  vector<vector<int>> matches;
  for (auto chosenIntern : chosenInterns) {
    matches.push_back({chosenIntern.second, chosenIntern.first});
  }
  return matches;
}


```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<int>> interns = {{0, 1}, {1, 0}};
      vector<vector<int>> teams = {{1, 0}, {1, 0}};
      vector<vector<int>> expected = {{0, 0}, {1, 1}};
      auto actual = stableInternships(interns, teams);

      assert(expected.size() == actual.size());

      for (auto match : expected) {
        bool containsMatch = false;
        for (auto actualMatch : actual) {
          if (actualMatch[0] == match[0] && actualMatch[1] == match[1]) {
            containsMatch = true;
          }
        }
        assert(containsMatch);
      }
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
		int[][] interns = new int[][] {new int[] {0, 1}, new int[] {1, 0}};
		int[][] teams = new int[][] {new int[] {1, 0}, new int[] {1, 0}};
		int[][] expected = new int[][] {new int[] {0, 0}, new int[] {1, 1}};
		var actual = new Program().StableInternships(interns, teams);

		Utils.AssertTrue(expected.Length == actual.Length);

		foreach (var match in expected) {
			bool containsMatch = false;
			foreach (var actualMatch in actual) {
				if (actualMatch[0] == match[0] && actualMatch[1] == match[1]) {
					containsMatch = true;
				}
			}
			Utils.AssertTrue(containsMatch);
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

	// O(n^2) time | O(n^2) space - where n is the number of interns and teams
	public int[][] StableInternships(int[][] interns, int[][] teams) {
		Dictionary<int, int> chosenInterns = new Dictionary<int, int>();
		Stack<int> freeInterns = new Stack<int>();
		for (int i = 0; i < interns.Length; i++) {
			freeInterns.Push(i);
		}
		int[] currentInternChoices = new int[interns.Length];

		List<Dictionary<int, int> > teamDictionarys = new List<Dictionary<int, int> >();
		foreach (var team in teams) {
			Dictionary<int, int> rank = new Dictionary<int, int>();
			for (int i = 0; i < team.Length; i++) {
				rank[team[i]] = i;
			}
			teamDictionarys.Add(rank);
		}

		while (freeInterns.Count != 0) {
			int internNum = freeInterns.Pop();

			int[] intern = interns[internNum];
			int teamPreference = intern[currentInternChoices[internNum]];
			currentInternChoices[internNum]++;

			if (!chosenInterns.ContainsKey(teamPreference)) {
				chosenInterns[teamPreference] = internNum;
				continue;
			}

			int previousIntern = chosenInterns[teamPreference];
			int previousInternRank = teamDictionarys[teamPreference][previousIntern];
			int currentInternRank = teamDictionarys[teamPreference][internNum];

			if (currentInternRank < previousInternRank) {
				freeInterns.Push(previousIntern);
				chosenInterns[teamPreference] = internNum;
			} else {
				freeInterns.Push(internNum);
			}
		}

		int[][] matches = new int[interns.Length][];
		int index = 0;
		foreach (var chosenIntern in chosenInterns) {
			matches[index] = new int[] {chosenIntern.Value, chosenIntern.Key};
			index++;
		}
		return matches;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[][] interns = new int[][] {new int[] {0, 1}, new int[] {1, 0}};
		int[][] teams = new int[][] {new int[] {1, 0}, new int[] {1, 0}};
		int[][] expected = new int[][] {new int[] {0, 0}, new int[] {1, 1}};
		var actual = new Program().StableInternships(interns, teams);

		Utils.AssertTrue(expected.Length == actual.Length);

		foreach (var match in expected) {
			bool containsMatch = false;
			foreach (var actualMatch in actual) {
				if (actualMatch[0] == match[0] && actualMatch[1] == match[1]) {
					containsMatch = true;
				}
			}
			Utils.AssertTrue(containsMatch);
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
	"testing"

	"github.com/stretchr/testify/require"
)

func compareResults(t *testing.T, actual, expected [][]int) {
	t.Helper()

	require.Equal(t, len(actual), len(expected))
	for _, expectedItem := range expected {
		containsMatch := false
		for _, actualItem := range actual {
			if actualItem[0] == expectedItem[0] && actualItem[1] == expectedItem[1] {
				containsMatch = true
			}
		}
		require.True(t, containsMatch)
	}
}

func (s *TestSuite) TestCase1(t *TestCase) {
	interns := [][]int{{0, 1}, {1, 0}}
	teams := [][]int{{1, 0}, {1, 0}}
	expected := [][]int{{0, 0}, {1, 1}}
	actual := StableInternships(interns, teams)
	compareResults(t, actual, expected)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n^2) time | O(n^2) space - where n is the number of interns and teams
func StableInternships(interns [][]int, teams [][]int) [][]int {
	chosenInterns := map[int]int{}
	freeInterns := make([]int, len(interns))
	for i := range interns {
		freeInterns[i] = i
	}
	currentInternChoices := make([]int, len(interns))

	teamMaps := []map[int]int{}
	for _, team := range teams {
		rank := map[int]int{}
		for i, internNum := range team {
			rank[internNum] = i
		}
		teamMaps = append(teamMaps, rank)
	}

	for len(freeInterns) > 0 {
		var internNum int
		internNum, freeInterns = freeInterns[len(freeInterns)-1], freeInterns[:len(freeInterns)-1]

		intern := interns[internNum]
		teamPreference := intern[currentInternChoices[internNum]]
		currentInternChoices[internNum] += 1

		if _, found := chosenInterns[teamPreference]; !found {
			chosenInterns[teamPreference] = internNum
			continue
		}

		previousIntern := chosenInterns[teamPreference]
		previousInternRank := teamMaps[teamPreference][previousIntern]
		currentInternRank := teamMaps[teamPreference][internNum]

		if currentInternRank < previousInternRank {
			freeInterns = append(freeInterns, previousIntern)
			chosenInterns[teamPreference] = internNum
		} else {
			freeInterns = append(freeInterns, internNum)
		}
	}

	matches := [][]int{}
	for teamNum, internNum := range chosenInterns {
		matches = append(matches, []int{internNum, teamNum})
	}
	return matches
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func compareResults(t *testing.T, actual, expected [][]int) {
	t.Helper()

	require.Equal(t, len(actual), len(expected))
	for _, expectedItem := range expected {
		containsMatch := false
		for _, actualItem := range actual {
			if actualItem[0] == expectedItem[0] && actualItem[1] == expectedItem[1] {
				containsMatch = true
			}
		}
		require.True(t, containsMatch)
	}
}

func (s *TestSuite) TestCase1(t *TestCase) {
	interns := [][]int{{0, 1}, {1, 0}}
	teams := [][]int{{1, 0}, {1, 0}}
	expected := [][]int{{0, 0}, {1, 1}}
	actual := StableInternships(interns, teams)
	compareResults(t, actual, expected)
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
    int[][] interns = new int[][] {{0, 1}, {1, 0}};
    int[][] teams = new int[][] {{1, 0}, {1, 0}};
    int[][] expected = new int[][] {{0, 0}, {1, 1}};
    var actual = new Program().stableInternships(interns, teams);
    Utils.assertTrue(expected.length == actual.length);

    for (int[] match : expected) {
      boolean containsMatch = false;
      for (int[] actualMatch : actual) {
        if (actualMatch[0] == match[0] && actualMatch[1] == match[1]) {
          containsMatch = true;
        }
      }
      Utils.assertTrue(containsMatch);
    }
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(n^2) time | O(n^2) space - where n is the number of interns and teams
  public int[][] stableInternships(int[][] interns, int[][] teams) {
    HashMap<Integer, Integer> chosenInterns = new HashMap<Integer, Integer>();
    Stack<Integer> freeInterns = new Stack<Integer>();
    for (int i = 0; i < interns.length; i++) {
      freeInterns.push(i);
    }
    int[] currentInternChoices = new int[interns.length];

    List<HashMap<Integer, Integer>> teamMaps = new ArrayList<HashMap<Integer, Integer>>();
    for (int[] team : teams) {
      HashMap<Integer, Integer> rank = new HashMap<Integer, Integer>();
      for (int i = 0; i < team.length; i++) {
        rank.put(team[i], i);
      }
      teamMaps.add(rank);
    }

    while (!freeInterns.isEmpty()) {
      int internNum = freeInterns.pop();

      int[] intern = interns[internNum];
      int teamPreference = intern[currentInternChoices[internNum]];
      currentInternChoices[internNum]++;

      if (!chosenInterns.containsKey(teamPreference)) {
        chosenInterns.put(teamPreference, internNum);
        continue;
      }

      int previousIntern = chosenInterns.get(teamPreference);
      int previousInternRank = teamMaps.get(teamPreference).get(previousIntern);
      int currentInternRank = teamMaps.get(teamPreference).get(internNum);

      if (currentInternRank < previousInternRank) {
        freeInterns.push(previousIntern);
        chosenInterns.put(teamPreference, internNum);
      } else {
        freeInterns.push(internNum);
      }
    }

    int[][] matches = new int[interns.length][2];
    int index = 0;
    for (Map.Entry<Integer, Integer> chosenIntern : chosenInterns.entrySet()) {
      matches[index] = new int[] {chosenIntern.getValue(), chosenIntern.getKey()};
      index++;
    }
    return matches;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    int[][] interns = new int[][] {{0, 1}, {1, 0}};
    int[][] teams = new int[][] {{1, 0}, {1, 0}};
    int[][] expected = new int[][] {{0, 0}, {1, 1}};
    var actual = new Program().stableInternships(interns, teams);
    Utils.assertTrue(expected.length == actual.length);

    for (int[] match : expected) {
      boolean containsMatch = false;
      for (int[] actualMatch : actual) {
        if (actualMatch[0] == match[0] && actualMatch[1] == match[1]) {
          containsMatch = true;
        }
      }
      Utils.assertTrue(containsMatch);
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
  const interns = [
    [0, 1],
    [1, 0],
  ];
  const teams = [
    [1, 0],
    [1, 0],
  ];
  const expected = [
    [0, 0],
    [1, 1],
  ];
  const actual = program.stableInternships(interns, teams);
  chai.expect(actual.length).to.deep.equal(expected.length);

  for (const match of expected) {
    let containsMatch = false;
    for (const actualMatch of actual) {
      if (actualMatch[0] === match[0] && actualMatch[1] === match[1]) {
        containsMatch = true;
      }
    }
    chai.expect(containsMatch).to.deep.equal(true);
  }
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n^2) space - where n is the number of interns and teams
function stableInternships(interns, teams) {
  const chosenInterns = {};
  const freeInterns = interns.map((_, i) => i);
  const currentInternChoices = new Array(interns.length).fill(0);

  const teamMaps = [];
  for (const team of teams) {
    const rank = {};
    team.forEach((internNum, i) => {
      rank[internNum] = i;
    });
    teamMaps.push(rank);
  }

  while (freeInterns.length > 0) {
    const internNum = freeInterns.pop();

    const intern = interns[internNum];
    const teamPreference = intern[currentInternChoices[internNum]];
    currentInternChoices[internNum] += 1;

    if (!(teamPreference in chosenInterns)) {
      chosenInterns[teamPreference] = internNum;
      continue;
    }

    const previousIntern = chosenInterns[teamPreference];
    const previousInternRank = teamMaps[teamPreference][previousIntern];
    const currentInternRank = teamMaps[teamPreference][internNum];

    if (currentInternRank < previousInternRank) {
      freeInterns.push(previousIntern);
      chosenInterns[teamPreference] = internNum;
    } else {
      freeInterns.push(internNum);
    }
  }

  const matches = Object.entries(chosenInterns).map(([teamNum, internNum]) => [
    internNum,
    parseInt(teamNum),
  ]);
  return matches;
}

// Do not edit the line below.
exports.stableInternships = stableInternships;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const interns = [
    [0, 1],
    [1, 0],
  ];
  const teams = [
    [1, 0],
    [1, 0],
  ];
  const expected = [
    [0, 0],
    [1, 1],
  ];
  const actual = program.stableInternships(interns, teams);
  chai.expect(actual.length).to.deep.equal(expected.length);

  for (const match of expected) {
    let containsMatch = false;
    for (const actualMatch of actual) {
      if (actualMatch[0] === match[0] && actualMatch[1] === match[1]) {
        containsMatch = true;
      }
    }
    chai.expect(containsMatch).to.deep.equal(true);
  }
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.stableInternships

class ProgramTest {
    @Test
    fun TestCase1() {
        val interns = listOf(listOf(0, 1), listOf(1, 0))
        val teams = listOf(listOf(1, 0), listOf(1, 0))
        val expected = listOf(listOf(0, 0), listOf(1, 1))
        val actual = stableInternships(interns, teams)
        assert(actual.size == expected.size)

        for (match in expected) {
            var containsMatch = false
            for (actualMatch in actual) {
                if (actualMatch[0] === match[0] && actualMatch[1] === match[1]) {
                    containsMatch = true
                }
            }
            assert(containsMatch == true)
        }
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(n^2) time | O(n^2) space - where n is the number of interns and teams
fun stableInternships(interns: List<List<Int>>, teams: List<List<Int>>): List<List<Int>> {
    val chosenInterns = mutableMapOf<Int, Int>()
    val freeInterns = MutableList(interns.size) { it }
    val currentInternChoices = MutableList(interns.size) { 0 }

    val teamMaps = mutableListOf<MutableMap<Int, Int>>()
    for (team in teams) {
        val rank = mutableMapOf<Int, Int>()
        for (i in 0 until team.size) {
            val internNum = team[i]
            rank[internNum] = i
        }
        teamMaps.add(rank)
    }

    while (freeInterns.size > 0) {
        val internNum = freeInterns.removeAt(freeInterns.size - 1)!!

        val intern = interns[internNum]
        val teamPreference = intern[currentInternChoices[internNum]]
        currentInternChoices[internNum] += 1

        if (!(teamPreference in chosenInterns)) {
            chosenInterns[teamPreference] = internNum
            continue
        }

        val previousIntern = chosenInterns[teamPreference]!!
        val previousInternRank = teamMaps[teamPreference][previousIntern]!!
        val currentInternRank = teamMaps[teamPreference][internNum]!!

        if (currentInternRank < previousInternRank) {
            freeInterns.add(previousIntern)
            chosenInterns[teamPreference] = internNum
        } else {
            freeInterns.add(internNum)
        }
    }

    val matches = mutableListOf<List<Int>>()
    for ((teamNum, internNum) in chosenInterns) {
        matches.add(listOf(internNum, teamNum))
    }
    return matches
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.stableInternships

class ProgramTest {
    @Test
    fun TestCase1() {
        val interns = listOf(listOf(0, 1), listOf(1, 0))
        val teams = listOf(listOf(1, 0), listOf(1, 0))
        val expected = listOf(listOf(0, 0), listOf(1, 1))
        val actual = stableInternships(interns, teams)
        assert(actual.size == expected.size)

        for (match in expected) {
            var containsMatch = false
            for (actualMatch in actual) {
                if (actualMatch[0] === match[0] && actualMatch[1] === match[1]) {
                    containsMatch = true
                }
            }
            assert(containsMatch == true)
        }
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
      var interns = [[0, 1], [1, 0]]
      var teams = [[1, 0], [1, 0]]
      var expected = [[0, 0], [1, 1]]
      var actual = Program().stableInternships(interns, teams)

      try assertEqual(expected.count, actual.count)
      for expectedItem in expected {
        var containsMatch = false
        for actualItem in actual {
			    if actualItem[0] == expectedItem[0] && actualItem[1] == expectedItem[1] {
			    	containsMatch = true
			    }
        }
        try assertEqual(true, containsMatch)
      }
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(n^2) space - where n is the number of interns and teams
  func stableInternships(_ interns: [[Int]], _ teams: [[Int]]) -> [[Int]] {
    var chosenInterns = [Int: Int]()
    var freeInterns = [Int](repeating: 0, count: interns.count)
    for i in 0 ..< freeInterns.count {
      freeInterns[i] = i
    }
    var currentInternChoices = [Int](repeating: 0, count: interns.count)

    var teamMaps = [[Int: Int]]()
    for team in teams {
      var rank = [Int: Int]()
      for (index, internNum) in team.enumerated() {
        rank[internNum] = index
      }
      teamMaps.append(rank)
    }

    while freeInterns.count > 0 {
      let internNum = freeInterns.popLast()!

      let intern = interns[internNum]
      let teamPreference = intern[currentInternChoices[internNum]]
      currentInternChoices[internNum] += 1

      if chosenInterns[teamPreference] == nil {
        chosenInterns[teamPreference] = internNum
        continue
      }

      let previousIntern = chosenInterns[teamPreference]!
      let previousInternRank = teamMaps[teamPreference][previousIntern]!
      let currentInternRank = teamMaps[teamPreference][internNum]!

      if currentInternRank < previousInternRank {
        freeInterns.append(previousIntern)
        chosenInterns[teamPreference] = internNum
      } else {
        freeInterns.append(internNum)
      }
    }

    var matches = [[Int]]()
    for (teamNum, internNum) in chosenInterns {
      matches.append([internNum, teamNum])
    }
    return matches
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws in
      var interns = [[0, 1], [1, 0]]
      var teams = [[1, 0], [1, 0]]
      var expected = [[0, 0], [1, 1]]
      var actual = Program().stableInternships(interns, teams)

      try assertEqual(expected.count, actual.count)
      for expectedItem in expected {
        var containsMatch = false
        for actualItem in actual {
			    if actualItem[0] == expectedItem[0] && actualItem[1] == expectedItem[1] {
			    	containsMatch = true
			    }
        }
        try assertEqual(true, containsMatch)
      }
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
        interns = [[0, 1], [1, 0]]
        teams = [[1, 0], [1, 0]]
        expected = [[0, 0], [1, 1]]
        actual = program.stableInternships(interns, teams)
        self.assertTrue(len(actual) == len(expected))

        for match in expected:
            containsMatch = False
            for actualMatch in actual:
                if actualMatch[0] == match[0] and actualMatch[1] == match[1]:
                    containsMatch = True
            self.assertTrue(containsMatch)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n^2) space - where n is the number of interns and teams
def stableInternships(interns, teams):
    chosenInterns = {}
    freeInterns = list(range(len(interns)))
    currentInternChoices = [0] * len(interns)

    teamMaps = []
    for team in teams:
        rank = {}
        for i, internNum in enumerate(team):
            rank[internNum] = i
        teamMaps.append(rank)

    while len(freeInterns) > 0:
        internNum = freeInterns.pop()

        intern = interns[internNum]
        teamPreference = intern[currentInternChoices[internNum]]
        currentInternChoices[internNum] += 1

        if teamPreference not in chosenInterns:
            chosenInterns[teamPreference] = internNum
            continue

        previousIntern = chosenInterns[teamPreference]
        previousInternRank = teamMaps[teamPreference][previousIntern]
        currentInternRank = teamMaps[teamPreference][internNum]

        if currentInternRank < previousInternRank:
            freeInterns.append(previousIntern)
            chosenInterns[teamPreference] = internNum
        else:
            freeInterns.append(internNum)

    matches = [[internNum, teamNum] for teamNum, internNum in chosenInterns.items()]
    return matches

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        interns = [[0, 1], [1, 0]]
        teams = [[1, 0], [1, 0]]
        expected = [[0, 0], [1, 1]]
        actual = program.stableInternships(interns, teams)
        self.assertTrue(len(actual) == len(expected))

        for match in expected:
            containsMatch = False
            for actualMatch in actual:
                if actualMatch[0] == match[0] and actualMatch[1] == match[1]:
                    containsMatch = True
            self.assertTrue(containsMatch)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const interns = [
    [0, 1],
    [1, 0],
  ];
  const teams = [
    [1, 0],
    [1, 0],
  ];
  const expected = [
    [0, 0],
    [1, 1],
  ];
  const actual = program.stableInternships(interns, teams);
  chai.expect(actual.length).to.deep.equal(expected.length);

  for (const match of expected) {
    let containsMatch = false;
    for (const actualMatch of actual) {
      if (actualMatch[0] === match[0] && actualMatch[1] === match[1]) {
        containsMatch = true;
      }
    }
    chai.expect(containsMatch).to.deep.equal(true);
  }
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n^2) space - where n is the number of interns and teams
export function stableInternships(interns: number[][], teams: number[][]) {
  const chosenInterns: Record<number, number> = {};
  const freeInterns = interns.map((_, i) => i);
  const currentInternChoices = new Array(interns.length).fill(0);

  const teamMaps: Record<number, number>[] = [];
  for (const team of teams) {
    const rank: Record<number, number> = {};
    team.forEach((internNum, i) => {
      rank[internNum] = i;
    });
    teamMaps.push(rank);
  }

  while (freeInterns.length > 0) {
    const internNum = freeInterns.pop()!;

    const intern = interns[internNum];
    const teamPreference = intern[currentInternChoices[internNum]];
    currentInternChoices[internNum] += 1;

    if (!(teamPreference in chosenInterns)) {
      chosenInterns[teamPreference] = internNum;
      continue;
    }

    const previousIntern = chosenInterns[teamPreference];
    const previousInternRank = teamMaps[teamPreference][previousIntern];
    const currentInternRank = teamMaps[teamPreference][internNum];

    if (currentInternRank < previousInternRank) {
      freeInterns.push(previousIntern);
      chosenInterns[teamPreference] = internNum;
    } else {
      freeInterns.push(internNum);
    }
  }

  const matches = Object.entries(chosenInterns).map(([teamNum, internNum]) => [
    internNum,
    parseInt(teamNum),
  ]);
  return matches;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const interns = [
    [0, 1],
    [1, 0],
  ];
  const teams = [
    [1, 0],
    [1, 0],
  ];
  const expected = [
    [0, 0],
    [1, 1],
  ];
  const actual = program.stableInternships(interns, teams);
  chai.expect(actual.length).to.deep.equal(expected.length);

  for (const match of expected) {
    let containsMatch = false;
    for (const actualMatch of actual) {
      if (actualMatch[0] === match[0] && actualMatch[1] === match[1]) {
        containsMatch = true;
      }
    }
    chai.expect(containsMatch).to.deep.equal(true);
  }
});

```

