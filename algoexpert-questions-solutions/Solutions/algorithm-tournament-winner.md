# Tournament Winner
<div class="html">
<p>
  There's an algorithms tournament taking place in which teams of programmers
  compete against each other to solve algorithmic problems as fast as possible.
  Teams compete in a round robin, where each team faces off against all other
  teams. Only two teams compete against each other at a time, and for each
  competition, one team is designated the home team, while the other team is the
  away team. In each competition there's always one winner and one loser; there
  are no ties. A team receives 3 points if it wins and 0 points if it loses. The
  winner of the tournament is the team that receives the most amount of points.
</p>
<p>
  Given an array of pairs representing the teams that have competed against each
  other and an array containing the results of each competition, write a
  function that returns the winner of the tournament. The input arrays are named
  <span>competitions</span> and <span>results</span>, respectively. The
  <span>competitions</span> array has elements in the form of
  <span>[homeTeam, awayTeam]</span>, where each team is a string of at most 30
  characters representing the name of the team. The <span>results</span> array
  contains information about the winner of each corresponding competition in the
  <span>competitions</span> array. Specifically, <span>results[i]</span> denotes
  the winner of <span>competitions[i]</span>, where a <span>1</span> in the
  <span>results</span> array means that the home team in the corresponding
  competition won and a <span>0</span> means that the away team won.
</p>
<p>
  It's guaranteed that exactly one team will win the tournament and that each
  team will compete against all other teams exactly once. It's also guaranteed
  that the tournament will always have at least two teams.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">competitions</span> = [
  ["HTML", "C#"],
  ["C#", "Python"],
  ["Python", "HTML"],
]
<span class="CodeEditor-promptParameter">results</span> = [0, 0, 1]
</pre>
<h3>Sample Output</h3>
<pre>
"Python"
<span class="CodeEditor-promptComment">// C# beats HTML, Python Beats C#, and Python Beats HTML.</span>
<span class="CodeEditor-promptComment">// HTML - 0 points </span>
<span class="CodeEditor-promptComment">// C# -  3 points</span>
<span class="CodeEditor-promptComment">// Python -  6 points</span>
</pre>
</div>

Hint 1
<p>
  Don't overcomplicate this problem. How would you solve it by hand? Consider
  that approach, and try to translate it into code.
</p>


Hint 2

<p>
  Use a hash table to store the total points collected by each team, with the
  team names as keys in the hash table. Once you know how many points each team
  has, how can you determine which one is the winner?
</p>


Hint 3

<p>
  Loop through all of the competitions, and update the hash table at every
  iteration. For each competition, consider the name of the winning team; if the
  name already exists in the hash table, update that entry by adding 3 points to
  it. If the team name doesn't exist in the hash table, add a new entry in the
  hash table with the key as the team name and the value as 3 (since the team
  won its first competition). While looping through all of the competitions,
  keep track of the team with the highest score, and at the end of the
  algorithm, return the team with the highest score.
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
      vector<vector<string>> competitions = {
          {"HTML", "C#"}, {"C#", "Python"}, {"Python", "HTML"}};
      vector<int> results = {0, 0, 1};
      string expected = "Python";
      auto actual = tournamentWinner(competitions, results);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <unordered_map>
using namespace std;

const int HOME_TEAM_WON = 1;
void updateScores(string team, int points, unordered_map<string, int> &scores);

// O(n) time | O(k) space - where n is the number
// of competitions and k is the number of teams
string tournamentWinner(vector<vector<string>> competitions,
                        vector<int> results) {
  string currentBestTeam = "";
  unordered_map<string, int> scores = {{currentBestTeam, 0}};

  for (int idx = 0; idx < competitions.size(); idx++) {
    auto result = results[idx];
    auto competition = competitions[idx];
    auto homeTeam = competition[0];
    auto awayTeam = competition[1];
    auto winningTeam = result == HOME_TEAM_WON ? homeTeam : awayTeam;

    updateScores(winningTeam, 3, scores);

    if (scores[winningTeam] > scores[currentBestTeam]) {
      currentBestTeam = winningTeam;
    }
  }

  return currentBestTeam;
}

void updateScores(string team, int points, unordered_map<string, int> &scores) {
  if (scores.find(team) == scores.end())
    scores[team] = 0;

  scores[team] += points;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<string>> competitions = {
          {"HTML", "C#"}, {"C#", "Python"}, {"Python", "HTML"}};
      vector<int> results = {0, 0, 1};
      string expected = "Python";
      auto actual = tournamentWinner(competitions, results);
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
		List<List<string> > competitions = new List<List<string> >();
		List<string> competition1 = new List<string> {
			"HTML", "C#"
		};
		List<string> competition2 = new List<string> {
			"C#", "Python"
		};
		List<string> competition3 = new List<string> {
			"Python", "HTML"
		};
		competitions.Add(competition1);
		competitions.Add(competition2);
		competitions.Add(competition3);
		List<int> results = new List<int> {
			0, 0, 1
		};
		string expected = "Python";
		var actual = new Program().TournamentWinner(competitions, results);
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

	public int HOME_TEAM_WON = 1;

	// O(n) time | O(k) space - where n is the number
	// of competitions and k is the number of teams
	public string TournamentWinner(List<List<string> > competitions, List<int> results) {
		string currentBestTeam = "";
		Dictionary<string, int> scores = new Dictionary<string, int>();
		scores[currentBestTeam] = 0;

		for (int idx = 0; idx < competitions.Count; idx++) {
			List<string> competition = competitions[idx];
			int result = results[idx];

			string homeTeam = competition[0];
			string awayTeam = competition[1];

			string winningTeam = (result == HOME_TEAM_WON) ? homeTeam : awayTeam;

			updateScores(winningTeam, 3, scores);

			if (scores[winningTeam] > scores[currentBestTeam]) {
				currentBestTeam = winningTeam;
			}
		}

		return currentBestTeam;
	}

	public void updateScores(string team, int points, Dictionary<string, int> scores) {
		if (!scores.ContainsKey(team)) {
			scores[team] = 0;
		}

		scores[team] = scores[team] + points;
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
		List<List<string> > competitions = new List<List<string> >();
		List<string> competition1 = new List<string> {
			"HTML", "C#"
		};
		List<string> competition2 = new List<string> {
			"C#", "Python"
		};
		List<string> competition3 = new List<string> {
			"Python", "HTML"
		};
		competitions.Add(competition1);
		competitions.Add(competition2);
		competitions.Add(competition3);
		List<int> results = new List<int> {
			0, 0, 1
		};
		string expected = "Python";
		var actual = new Program().TournamentWinner(competitions, results);
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
	competitions := [][]string{
		{"HTML", "C#"},
		{"C#", "Python"},
		{"Python", "HTML"},
	}
	results := []int{0, 0, 1}
	expected := "Python"
	actual := TournamentWinner(competitions, results)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

const HOME_TEAM_WON = 1

// O(n) time | O(k) space - where n is the number
// of competitions and k is the number of teams
func TournamentWinner(competitions [][]string, results []int) string {
	currentBestTeam := ""
	scores := map[string]int{currentBestTeam: 0}

	for idx, competition := range competitions {
		result := results[idx]
		homeTeam, awayTeam := competition[0], competition[1]

		winningTeam := awayTeam
		if result == HOME_TEAM_WON {
			winningTeam = homeTeam
		}

		updateScores(winningTeam, 3, scores)

		if scores[winningTeam] > scores[currentBestTeam] {
			currentBestTeam = winningTeam
		}
	}

	return currentBestTeam
}

func updateScores(team string, points int, scores map[string]int) {
	scores[team] += points
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	competitions := [][]string{
		{"HTML", "C#"},
		{"C#", "Python"},
		{"Python", "HTML"},
	}
	results := []int{0, 0, 1}
	expected := "Python"
	actual := TournamentWinner(competitions, results)
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
    ArrayList<ArrayList<String>> competitions = new ArrayList<ArrayList<String>>();
    ArrayList<String> competition1 = new ArrayList<String>(Arrays.asList("HTML", "C#"));
    ArrayList<String> competition2 = new ArrayList<String>(Arrays.asList("C#", "Python"));
    ArrayList<String> competition3 = new ArrayList<String>(Arrays.asList("Python", "HTML"));
    competitions.add(competition1);
    competitions.add(competition2);
    competitions.add(competition3);
    ArrayList<Integer> results = new ArrayList<Integer>(Arrays.asList(0, 0, 1));
    String expected = "Python";
    var actual = new Program().tournamentWinner(competitions, results);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  public int HOME_TEAM_WON = 1;

  // O(n) time | O(k) space - where n is the number
  // of competitions and k is the number of teams
  public String tournamentWinner(
      ArrayList<ArrayList<String>> competitions, ArrayList<Integer> results) {
    String currentBestTeam = "";
    HashMap<String, Integer> scores = new HashMap<String, Integer>();
    scores.put(currentBestTeam, 0);

    for (int idx = 0; idx < competitions.size(); idx++) {
      ArrayList<String> competition = competitions.get(idx);
      int result = results.get(idx);

      String homeTeam = competition.get(0);
      String awayTeam = competition.get(1);

      String winningTeam = (result == HOME_TEAM_WON) ? homeTeam : awayTeam;

      updateScores(winningTeam, 3, scores);

      if (scores.get(winningTeam) > scores.get(currentBestTeam)) {
        currentBestTeam = winningTeam;
      }
    }

    return currentBestTeam;
  }

  public void updateScores(String team, int points, HashMap<String, Integer> scores) {
    if (!scores.containsKey(team)) {
      scores.put(team, 0);
    }

    scores.put(team, scores.get(team) + points);
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    ArrayList<ArrayList<String>> competitions = new ArrayList<ArrayList<String>>();
    ArrayList<String> competition1 = new ArrayList<String>(Arrays.asList("HTML", "C#"));
    ArrayList<String> competition2 = new ArrayList<String>(Arrays.asList("C#", "Python"));
    ArrayList<String> competition3 = new ArrayList<String>(Arrays.asList("Python", "HTML"));
    competitions.add(competition1);
    competitions.add(competition2);
    competitions.add(competition3);
    ArrayList<Integer> results = new ArrayList<Integer>(Arrays.asList(0, 0, 1));
    String expected = "Python";
    var actual = new Program().tournamentWinner(competitions, results);
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
  const competitions = [
    ['HTML', 'C#'],
    ['C#', 'Python'],
    ['Python', 'HTML'],
  ];
  const results = [0, 0, 1];
  const expected = 'Python';
  const actual = program.tournamentWinner(competitions, results);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

const HOME_TEAM_WON = 1;

// O(n) time | O(k) space - where n is the number
// of competitions and k is the number of teams
function tournamentWinner(competitions, results) {
  let currentBestTeam = '';
  const scores = {[currentBestTeam]: 0};

  for (let idx = 0; idx < competitions.length; idx++) {
    const result = results[idx];
    const [homeTeam, awayTeam] = competitions[idx];

    const winningTeam = result === HOME_TEAM_WON ? homeTeam : awayTeam;

    updateScores(winningTeam, 3, scores);

    if (scores[winningTeam] > scores[currentBestTeam]) {
      currentBestTeam = winningTeam;
    }
  }

  return currentBestTeam;
}

function updateScores(team, points, scores) {
  if (!(team in scores)) scores[team] = 0;

  scores[team] += points;
}

// Do not edit the line below.
exports.tournamentWinner = tournamentWinner;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const competitions = [
    ['HTML', 'C#'],
    ['C#', 'Python'],
    ['Python', 'HTML'],
  ];
  const results = [0, 0, 1];
  const expected = 'Python';
  const actual = program.tournamentWinner(competitions, results);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.tournamentWinner

class ProgramTest {
    @Test
    fun TestCase1() {
        val competitions = listOf(
            listOf("HTML", "C#"),
            listOf("C#", "Python"),
            listOf("Python", "HTML")
        )
        val results = listOf(0, 0, 1)
        val expected = "Python"
        val output = tournamentWinner(competitions, results)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

val HOME_TEAM_WON = 1

// O(n) time | O(k) space - where n is the number  
// of competitions and k is the number of teams
fun tournamentWinner(competitions: List<List<String>>, results: List<Int>): String {
    var currentBestTeam = ""
    val scores = mutableMapOf(currentBestTeam to 0)

    for (idx in 0 until competitions.size) {
        val competition = competitions[idx]
        val result = results[idx]
        val (homeTeam, awayTeam) = competition

        val winningTeam = if (result == HOME_TEAM_WON) homeTeam else awayTeam

        updateScores(winningTeam, 3, scores)

        if (scores[winningTeam]!! > scores[currentBestTeam]!!) currentBestTeam = winningTeam
    }

    return currentBestTeam
}

fun updateScores(team: String, points: Int, scores: MutableMap<String, Int>) {
    if (!(team in scores)) scores[team] = 0

    scores[team] = scores[team]!! + points
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.tournamentWinner

class ProgramTest {
    @Test
    fun TestCase1() {
        val competitions = listOf(
            listOf("HTML", "C#"),
            listOf("C#", "Python"),
            listOf("Python", "HTML")
        )
        val results = listOf(0, 0, 1)
        val expected = "Python"
        val output = tournamentWinner(competitions, results)
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
      let competitions = [
        ["HTML", "C#"],
        ["C#", "Python"],
        ["Python", "HTML"],
      ]
      let results = [0, 0, 1]
      let expected = "Python"
      var actual = Program().tournamentWinner(competitions, results)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  let HOME_TEAM_WON = 1

  // O(n) time | O(k) space - where n is the number
  // of competitions and k is the number of teams
  func tournamentWinner(_ competitions: [[String]], _ results: [Int]) -> String {
    var currentBestTeam = ""
    var scores = [String: Int]()
    scores[currentBestTeam] = 0
    for (idx, competition) in competitions.enumerated() {
      let result = results[idx]
      let (homeTeam, awayTeam) = (competition[0], competition[1])

      var winningTeam = awayTeam
      if result == HOME_TEAM_WON {
        winningTeam = homeTeam
      }

      updateScores(winningTeam, 3, &scores)

      if scores[winningTeam]! > scores[currentBestTeam]! {
        currentBestTeam = winningTeam
      }
    }
    return currentBestTeam
  }

  func updateScores(_ team: String, _ points: Int, _ scores: inout [String: Int]) {
    if scores[team] == nil {
      scores[team] = 0
    }
    scores[team] = scores[team]! + points
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let competitions = [
        ["HTML", "C#"],
        ["C#", "Python"],
        ["Python", "HTML"],
      ]
      let results = [0, 0, 1]
      let expected = "Python"
      var actual = Program().tournamentWinner(competitions, results)
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
        competitions = [["HTML", "C#"], ["C#", "Python"], ["Python", "HTML"]]
        results = [0, 0, 1]
        expected = "Python"
        actual = program.tournamentWinner(competitions, results)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

HOME_TEAM_WON = 1

# O(n) time | O(k) space - where n is the number
# of competitions and k is the number of teams
def tournamentWinner(competitions, results):
    currentBestTeam = ""
    scores = {currentBestTeam: 0}

    for idx, competition in enumerate(competitions):
        result = results[idx]
        homeTeam, awayTeam = competition

        winningTeam = homeTeam if result == HOME_TEAM_WON else awayTeam

        updateScores(winningTeam, 3, scores)

        if scores[winningTeam] > scores[currentBestTeam]:
            currentBestTeam = winningTeam

    return currentBestTeam


def updateScores(team, points, scores):
    if team not in scores:
        scores[team] = 0

    scores[team] += points

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        competitions = [["HTML", "C#"], ["C#", "Python"], ["Python", "HTML"]]
        results = [0, 0, 1]
        expected = "Python"
        actual = program.tournamentWinner(competitions, results)
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
  const competitions = [
    ['HTML', 'C#'],
    ['C#', 'Python'],
    ['Python', 'HTML'],
  ];
  const results = [0, 0, 1];
  const expected = 'Python';
  const actual = program.tournamentWinner(competitions, results);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

const HOME_TEAM_WON = 1;

// O(n) time | O(k) space - where n is the number
// of competitions and k is the number of teams
export function tournamentWinner(competitions: string[][], results: number[]) {
  let currentBestTeam = '';
  const scores = {[currentBestTeam]: 0};

  for (let idx = 0; idx < competitions.length; idx++) {
    const result = results[idx];
    const [homeTeam, awayTeam] = competitions[idx];

    const winningTeam = result === HOME_TEAM_WON ? homeTeam : awayTeam;

    updateScores(winningTeam, 3, scores);

    if (scores[winningTeam] > scores[currentBestTeam]) {
      currentBestTeam = winningTeam;
    }
  }

  return currentBestTeam;
}

function updateScores(team: string, points: number, scores: {[team: string]: number}) {
  if (!(team in scores)) scores[team] = 0;

  scores[team] += points;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const competitions = [
    ['HTML', 'C#'],
    ['C#', 'Python'],
    ['Python', 'HTML'],
  ];
  const results = [0, 0, 1];
  const expected = 'Python';
  const actual = program.tournamentWinner(competitions, results);
  chai.expect(actual).to.deep.equal(expected);
});

```

