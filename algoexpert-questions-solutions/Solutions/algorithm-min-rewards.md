# Min Rewards
<div class="html">
<p>
  Imagine that you're a teacher who's just graded the final exam in a class. You
  have a list of student scores on the final exam in a particular order (not
  necessarily sorted), and you want to reward your students. You decide to do so
  fairly by giving them arbitrary rewards following two rules:
</p>
<ol>
  <li>All students must receive at least one reward.</li>
  <li>
    Any given student must receive strictly more rewards than an adjacent
    student (a student immediately to the left or to the right) with a lower
    score and must receive strictly fewer rewards than an adjacent student with
    a higher score.
  </li>
</ol>
<p>
  Write a function that takes in a list of scores and returns the minimum number
  of rewards that you must give out to students to satisfy the two rules.
</p>
<p>
  You can assume that all students have different scores; in other words, the
  scores are all unique.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">scores</span> = [8, 4, 2, 1, 3, 6, 7, 9, 5]
</pre>
<h3>Sample Output</h3>
<pre>25 <span class="CodeEditor-promptComment">// you would give out the following rewards: [4, 3, 2, 1, 2, 3, 4, 5, 1]</span></pre>
</div>

Hint 1
<p>
You could try iterating through the input list of scores and incrementing the number of rewards you give to each student if they have a greater score than the previous student's score. However, if you reach a student with a smaller score than the previous student's score, you'll have to backtrack through the array to fix previous reward assignments. During this backtrack, is it correct to simply increment the reward of a student whose score is greater than the next student's score?
</p>


Hint 2

<p>
Notice that there are local mins and local maxes in the input list of scores: scores that are smaller than both scores next to them and scores that are greater than both scores next to them. Find the local mins, and try expanding away from them until you reach local maxes, assigning (and incrementing) rewards as you go.
</p>


Hint 3

<p>
Do you actually need to find the local mins mentioned in Hint #2? Can you simply do two sweeps of the input list of scores, one from left to right, and one from right to left?
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
      assert(minRewards({8, 4, 2, 1, 3, 6, 7, 9, 5}) == 25);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <algorithm>
#include <vector>
#include <numeric>
using namespace std;

// O(n^2) time | O(n) space - where n is the length of the input array
int minRewards(vector<int> scores) {
  vector<int> rewards = vector<int>(scores.size(), 1);
  for (int i = 1; i < scores.size(); i++) {
    int j = i - 1;
    if (scores[i] > scores[j]) {
      rewards[i] = rewards[j] + 1;
    } else {
      while (j >= 0 && scores[j] > scores[j + 1]) {
        rewards[j] = max(rewards[j], rewards[j + 1] + 1);
        j--;
      }
    }
  }
  return accumulate(rewards.begin(), rewards.end(), 0);
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <algorithm>
#include <vector>
#include <numeric>
using namespace std;

vector<int> getLocalMinIdxs(vector<int> array);
void expandFromLocalMinIdx(int localMinIdx, vector<int> scores,
                           vector<int> *rewards);

// O(n) time | O(n) space - where n is the length of the input array
int minRewards(vector<int> scores) {
  vector<int> rewards = vector<int>(scores.size(), 1);
  vector<int> localMinIdxs = getLocalMinIdxs(scores);
  for (int localMinIdx : localMinIdxs) {
    expandFromLocalMinIdx(localMinIdx, scores, &rewards);
  }
  return accumulate(rewards.begin(), rewards.end(), 0);
}

vector<int> getLocalMinIdxs(vector<int> array) {
  if (array.size() == 1)
    return vector<int>{0};
  vector<int> localMinIdxs = {};
  for (int i = 0; i < array.size(); i++) {
    if (i == 0 && array[i] < array[i + 1])
      localMinIdxs.push_back(i);
    if (i == array.size() - 1 && array[i] < array[i - 1])
      localMinIdxs.push_back(i);
    if (i == 0 || i == array.size() - 1)
      continue;
    if (array[i] < array[i + 1] && array[i] < array[i - 1])
      localMinIdxs.push_back(i);
  }
  return localMinIdxs;
}

void expandFromLocalMinIdx(int localMinIdx, vector<int> scores,
                           vector<int> *rewards) {
  int leftIdx = localMinIdx - 1;
  while (leftIdx >= 0 && scores[leftIdx] > scores[leftIdx + 1]) {
    rewards->at(leftIdx) =
        max(rewards->at(leftIdx), rewards->at(leftIdx + 1) + 1);
    leftIdx--;
  }
  int rightIdx = localMinIdx + 1;
  while (rightIdx < scores.size() && scores[rightIdx] > scores[rightIdx - 1]) {
    rewards->at(rightIdx) = rewards->at(rightIdx - 1) + 1;
    rightIdx++;
  }
}

```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <algorithm>
#include <vector>
#include <numeric>
using namespace std;

// O(n) time | O(n) space - where n is the length of the input array
int minRewards(vector<int> scores) {
  vector<int> rewards = vector<int>(scores.size(), 1);
  for (int i = 1; i < scores.size(); i++) {
    if (scores[i] > scores[i - 1])
      rewards[i] = rewards[i - 1] + 1;
  }
  for (int i = scores.size() - 2; i >= 0; i--) {
    if (scores[i] > scores[i + 1]) {
      rewards[i] = max(rewards[i], rewards[i + 1] + 1);
    }
  }
  return accumulate(rewards.begin(), rewards.end(), 0);
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      assert(minRewards({8, 4, 2, 1, 3, 6, 7, 9, 5}) == 25);
    });
  }
};

```
### Sandbox Code (csharp)
```csharp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

public class ProgramTest {
	[Test]
	public void TestCase1() {
		var input = new int[] {8, 4, 2, 1, 3, 6, 7, 9, 5};
		var actual = Program.MinRewards(input);
		var expected = 25;
		Utils.AssertEquals(expected, actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Linq;

// O(n^2) time | O(n) space - where n is the length of the input array
public class Program {
	public static int MinRewards(int[] scores) {
		int[] rewards = new int[scores.Length];
		Array.Fill(rewards, 1);
		for (int i = 1; i < scores.Length; i++) {
			int j = i - 1;
			if (scores[i] > scores[j]) {
				rewards[i] = rewards[j] + 1;
			} else {
				while (j >= 0 && scores[j] > scores[j + 1]) {
					rewards[j] = Math.Max(rewards[j], rewards[j + 1] + 1);
					j--;
				}
			}
		}
		return rewards.Sum();
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Linq;
using System.Collections.Generic;

// O(n) time | O(n) space - where n is the length of the input array
public class Program {
	public static int MinRewards(int[] scores) {
		int[] rewards = new int[scores.Length];
		Array.Fill(rewards, 1);
		List<int> localMinIdxs = getLocalMinIdxs(scores);
		foreach (int localMinIdx in localMinIdxs) {
			expandFromLocalMinIdx(localMinIdx, scores, rewards);
		}
		return rewards.Sum();
	}

	public static List<int> getLocalMinIdxs(int[] array) {
		List<int> localMinIdxs = new List<int>();
		if (array.Length == 1) {
			localMinIdxs.Add(0);
			return localMinIdxs;
		}
		for (int i = 0; i < array.Length; i++) {
			if (i == 0 && array[i] < array[i + 1]) localMinIdxs.Add(i);
			if (i == array.Length - 1 && array[i] < array[i - 1]) localMinIdxs.Add(i);
			if (i == 0 || i == array.Length - 1) continue;
			if (array[i] < array[i + 1] && array[i] < array[i - 1]) localMinIdxs.Add(i);
		}
		return localMinIdxs;
	}

	public static void expandFromLocalMinIdx(int localMinIdx, int[] scores, int[] rewards) {
		int leftIdx = localMinIdx - 1;
		while (leftIdx >= 0 && scores[leftIdx] > scores[leftIdx + 1]) {
			rewards[leftIdx] = Math.Max(rewards[leftIdx], rewards[leftIdx + 1] + 1);
			leftIdx--;
		}
		int rightIdx = localMinIdx + 1;
		while (rightIdx < scores.Length && scores[rightIdx] > scores[rightIdx - 1]) {
			rewards[rightIdx] = rewards[rightIdx - 1] + 1;
			rightIdx++;
		}
	}
}

```
### Solution 3 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Linq;

// O(n) time | O(n) space - where n is the length of the input array
public class Program {
	public static int MinRewards(int[] scores) {
		int[] rewards = new int[scores.Length];
		Array.Fill(rewards, 1);
		for (int i = 1; i < scores.Length; i++) {
			if (scores[i] > scores[i - 1]) rewards[i] = rewards[i - 1] + 1;
		}
		for (int i = scores.Length - 2; i >= 0; i--) {
			if (scores[i] > scores[i + 1]) {
				rewards[i] = Math.Max(rewards[i], rewards[i + 1] + 1);
			}
		}
		return rewards.Sum();
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		var input = new int[] {8, 4, 2, 1, 3, 6, 7, 9, 5};
		var actual = Program.MinRewards(input);
		var expected = 25;
		Utils.AssertEquals(expected, actual);
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
	input := []int{8, 4, 2, 1, 3, 6, 7, 9, 5}
	output := MinRewards(input)
	expected := 25
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n^2) time | O(n) space - where n is the length of the input array
func MinRewards(scores []int) int {
	rewards := make([]int, len(scores))
	fill(rewards, 1)
	for i := 1; i < len(scores); i++ {
		j := i - 1
		if scores[i] > scores[j] {
			rewards[i] = rewards[j] + 1
			continue
		}
		for j >= 0 && scores[j] > scores[j+1] {
			rewards[j] = max(rewards[j], rewards[j+1]+1)
			j--
		}
	}
	return sum(rewards)
}

func fill(arr []int, val int) {
	for i := range arr {
		arr[i] = val
	}
}

func sum(arr []int) int {
	sum := 0
	for i := range arr {
		sum += arr[i]
	}
	return sum
}

func max(i, j int) int {
	if i > j {
		return i
	}
	return j
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space - where n is the length of the input array
func MinRewards(scores []int) int {
	rewards := make([]int, len(scores))
	fill(rewards, 1)
	localMinIdxs := getLocalMinIdxs(scores)
	for _, localMinIdx := range localMinIdxs {
		expandFromLocalMinIdx(localMinIdx, scores, rewards)
	}
	return sum(rewards)
}

func getLocalMinIdxs(arr []int) []int {
	localMinIdxs := []int{}
	if len(arr) == 1 {
		localMinIdxs = append(localMinIdxs, 0)
		return localMinIdxs
	}
	for i := 0; i < len(arr); i++ {
		if i == 0 && arr[i] < arr[i+1] {
			localMinIdxs = append(localMinIdxs, i)
		}
		if i == len(arr)-1 && arr[i] < arr[i-1] {
			localMinIdxs = append(localMinIdxs, i)
		}
		if i == 0 || i == len(arr)-1 {
			continue
		}
		if arr[i] < arr[i+1] && arr[i] < arr[i-1] {
			localMinIdxs = append(localMinIdxs, i)
		}
	}
	return localMinIdxs
}

func expandFromLocalMinIdx(localMinIdx int, scores, rewards []int) {
	leftIdx := localMinIdx - 1
	for leftIdx >= 0 && scores[leftIdx] > scores[leftIdx+1] {
		rewards[leftIdx] = max(rewards[leftIdx], rewards[leftIdx+1]+1)
		leftIdx--
	}
	rightIdx := localMinIdx + 1
	for rightIdx < len(scores) && scores[rightIdx] > scores[rightIdx-1] {
		rewards[rightIdx] = rewards[rightIdx-1] + 1
		rightIdx++
	}
}

func fill(arr []int, val int) {
	for i := range arr {
		arr[i] = val
	}
}

func sum(arr []int) int {
	sum := 0
	for i := range arr {
		sum += arr[i]
	}
	return sum
}

func max(i, j int) int {
	if i > j {
		return i
	}
	return j
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space - where n is the length of the input array
func MinRewards(scores []int) int {
	rewards := make([]int, len(scores))
	fill(rewards, 1)
	for i := 1; i < len(scores); i++ {
		if scores[i] > scores[i-1] {
			rewards[i] = rewards[i-1] + 1
		}
	}
	for i := len(scores) - 2; i >= 0; i-- {
		if scores[i] > scores[i+1] {
			rewards[i] = max(rewards[i], rewards[i+1]+1)
		}
	}
	return sum(rewards)
}

func fill(arr []int, val int) {
	for i := range arr {
		arr[i] = val
	}
}

func sum(arr []int) int {
	sum := 0
	for i := range arr {
		sum += arr[i]
	}
	return sum
}

func max(i, j int) int {
	if i > j {
		return i
	}
	return j
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := []int{8, 4, 2, 1, 3, 6, 7, 9, 5}
	output := MinRewards(input)
	expected := 25
	require.Equal(t, expected, output)
}

```
### Sandbox Code (java)
```java
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

class ProgramTest {
  @Test
  public void TestCase1() {
    Utils.assertTrue(Program.minRewards(new int[] {8, 4, 2, 1, 3, 6, 7, 9, 5}) == 25);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;
import java.util.stream.*;

// O(n^2) time | O(n) space - where n is the length of the input array
class Program {
  public static int minRewards(int[] scores) {
    int[] rewards = new int[scores.length];
    Arrays.fill(rewards, 1);
    for (int i = 1; i < scores.length; i++) {
      int j = i - 1;
      if (scores[i] > scores[j]) {
        rewards[i] = rewards[j] + 1;
      } else {
        while (j >= 0 && scores[j] > scores[j + 1]) {
          rewards[j] = Math.max(rewards[j], rewards[j + 1] + 1);
          j--;
        }
      }
    }
    return IntStream.of(rewards).sum();
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;
import java.util.stream.*;

// O(n) time | O(n) space - where n is the length of the input array
class Program {
  public static int minRewards(int[] scores) {
    int[] rewards = new int[scores.length];
    Arrays.fill(rewards, 1);
    List<Integer> localMinIdxs = getLocalMinIdxs(scores);
    for (Integer localMinIdx : localMinIdxs) {
      expandFromLocalMinIdx(localMinIdx, scores, rewards);
    }
    return IntStream.of(rewards).sum();
  }

  public static List<Integer> getLocalMinIdxs(int[] array) {
    List<Integer> localMinIdxs = new ArrayList<Integer>();
    if (array.length == 1) {
      localMinIdxs.add(0);
      return localMinIdxs;
    }
    for (int i = 0; i < array.length; i++) {
      if (i == 0 && array[i] < array[i + 1]) localMinIdxs.add(i);
      if (i == array.length - 1 && array[i] < array[i - 1]) localMinIdxs.add(i);
      if (i == 0 || i == array.length - 1) continue;
      if (array[i] < array[i + 1] && array[i] < array[i - 1]) localMinIdxs.add(i);
    }
    return localMinIdxs;
  }

  public static void expandFromLocalMinIdx(int localMinIdx, int[] scores, int[] rewards) {
    int leftIdx = localMinIdx - 1;
    while (leftIdx >= 0 && scores[leftIdx] > scores[leftIdx + 1]) {
      rewards[leftIdx] = Math.max(rewards[leftIdx], rewards[leftIdx + 1] + 1);
      leftIdx--;
    }
    int rightIdx = localMinIdx + 1;
    while (rightIdx < scores.length && scores[rightIdx] > scores[rightIdx - 1]) {
      rewards[rightIdx] = rewards[rightIdx - 1] + 1;
      rightIdx++;
    }
  }
}

```
### Solution 3 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;
import java.util.stream.*;

// O(n) time | O(n) space - where n is the length of the input array
class Program {
  public static int minRewards(int[] scores) {
    int[] rewards = new int[scores.length];
    Arrays.fill(rewards, 1);
    for (int i = 1; i < scores.length; i++) {
      if (scores[i] > scores[i - 1]) rewards[i] = rewards[i - 1] + 1;
    }
    for (int i = scores.length - 2; i >= 0; i--) {
      if (scores[i] > scores[i + 1]) {
        rewards[i] = Math.max(rewards[i], rewards[i + 1] + 1);
      }
    }
    return IntStream.of(rewards).sum();
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    Utils.assertTrue(Program.minRewards(new int[] {8, 4, 2, 1, 3, 6, 7, 9, 5}) == 25);
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
  chai.expect(program.minRewards([8, 4, 2, 1, 3, 6, 7, 9, 5])).to.deep.equal(25);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space - where n is the length of the input array
function minRewards(scores) {
  const rewards = scores.map(_ => 1);
  for (let i = 1; i < scores.length; i++) {
    let j = i - 1;
    if (scores[i] > scores[j]) {
      rewards[i] = rewards[j] + 1;
    } else {
      while (j >= 0 && scores[j] > scores[j + 1]) {
        rewards[j] = Math.max(rewards[j], rewards[j + 1] + 1);
        j--;
      }
    }
  }
  return rewards.reduce((a, b) => a + b);
}

exports.minRewards = minRewards;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input array
function minRewards(scores) {
  const rewards = scores.map(_ => 1);
  const localMinIdxs = getLocalMinIdxs(scores);
  for (const localMinIdx of localMinIdxs) {
    expandFromLocalMinIdx(localMinIdx, scores, rewards);
  }
  return rewards.reduce((a, b) => a + b);
}

function getLocalMinIdxs(array) {
  if (array.length === 1) return [0];
  const localMinIdxs = [];
  for (let i = 0; i < array.length; i++) {
    if (i === 0 && array[i] < array[i + 1]) localMinIdxs.push(i);
    if (i === array.length - 1 && array[i] < array[i - 1]) localMinIdxs.push(i);
    if (i === 0 || i === array.length - 1) continue;
    if (array[i] < array[i + 1] && array[i] < array[i - 1]) localMinIdxs.push(i);
  }
  return localMinIdxs;
}

function expandFromLocalMinIdx(localMinIdx, scores, rewards) {
  let leftIdx = localMinIdx - 1;
  while (leftIdx >= 0 && scores[leftIdx] > scores[leftIdx + 1]) {
    rewards[leftIdx] = Math.max(rewards[leftIdx], rewards[leftIdx + 1] + 1);
    leftIdx--;
  }
  let rightIdx = localMinIdx + 1;
  while (rightIdx < scores.length && scores[rightIdx] > scores[rightIdx - 1]) {
    rewards[rightIdx] = rewards[rightIdx - 1] + 1;
    rightIdx++;
  }
}

exports.minRewards = minRewards;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input array
function minRewards(scores) {
  const rewards = scores.map(_ => 1);
  for (let i = 1; i < scores.length; i++) {
    if (scores[i] > scores[i - 1]) rewards[i] = rewards[i - 1] + 1;
  }
  for (let i = scores.length - 2; i >= 0; i--) {
    if (scores[i] > scores[i + 1]) rewards[i] = Math.max(rewards[i], rewards[i + 1] + 1);
  }
  return rewards.reduce((a, b) => a + b);
}

exports.minRewards = minRewards;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.minRewards([8, 4, 2, 1, 3, 6, 7, 9, 5])).to.deep.equal(25);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.minRewards as minRewards

class ProgramTest {
    @Test
    fun TestCase1() {
        val scores = listOf<Int>(8, 4, 2, 1, 3, 6, 7, 9, 5)
        assert(minRewards(scores) == 25)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(n^2) time | O(n) space - where n is the length of the input array
fun minRewards(scores: List<Int>): Int {
    val rewards = MutableList(scores.size) { 1 }
    for (i in 1 until scores.size) {
        var j = i - 1
        if (scores[i] > scores[j]) {
            rewards[i] = rewards[j] + 1
        } else {
            while (j >= 0 && scores[j] > scores[j + 1]) {
                rewards[j] = max(rewards[j], rewards[j + 1] + 1)
                j--
            }
        }
    }
    return rewards.sum()
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(n) time | O(n) space - where n is the length of the input array
fun minRewards(scores: List<Int>): Int {
    val rewards = MutableList(scores.size) { 1 }
    val localMinIdxs = getLocalMinIdxs(scores)
    for (localMinIdx in localMinIdxs) {
        expandFromLocalMinIdx(localMinIdx, scores, rewards)
    }
    return rewards.sum()
}

fun getLocalMinIdxs(array: List<Int>): List<Int> {
    if (array.size == 1) return listOf<Int>(0)
    val localMinIdxs = mutableListOf<Int>()
    for (i in 0 until array.size) {
        if (i == 0 && array[i] < array[i + 1]) localMinIdxs.add(i)
        if (i == array.size - 1 && array[i] < array[i - 1]) localMinIdxs.add(i)
        if (i == 0 || i == array.size - 1) continue
        if (array[i] < array[i + 1] && array[i] < array[i - 1]) localMinIdxs.add(i)
    }
    return localMinIdxs
}

fun expandFromLocalMinIdx(localMinIdx: Int, scores: List<Int>, rewards: MutableList<Int>) {
    var leftIdx = localMinIdx - 1
    while (leftIdx >= 0 && scores[leftIdx] > scores[leftIdx + 1]) {
        rewards[leftIdx] = max(rewards[leftIdx], rewards[leftIdx + 1] + 1)
        leftIdx--
    }
    var rightIdx = localMinIdx + 1
    while (rightIdx < scores.size && scores[rightIdx] > scores[rightIdx - 1]) {
        rewards[rightIdx] = rewards[rightIdx - 1] + 1
        rightIdx++
    }
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(n) time | O(n) space - where n is the length of the input array
fun minRewards(scores: List<Int>): Int {
    val rewards = MutableList(scores.size) { 1 }
    for (i in 1 until scores.size) {
        if (scores[i] > scores[i - 1]) rewards[i] = rewards[i - 1] + 1
    }
    for (i in scores.size - 2 downTo 0) {
        if (scores[i] > scores[i + 1]) rewards[i] = max(rewards[i], rewards[i + 1] + 1)
    }
    return rewards.sum()
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.minRewards as minRewards

class ProgramTest {
    @Test
    fun TestCase1() {
        val scores = listOf<Int>(8, 4, 2, 1, 3, 6, 7, 9, 5)
        assert(minRewards(scores) == 25)
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
      try assertEqual(25, program.minRewards([8, 4, 2, 1, 3, 6, 7, 9, 5]))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^2) time | O(n) space
  func minRewards(_ scores: [Int]) -> Int {
    var rewards = Array(repeating: 1, count: scores.count)

    for i in 1 ..< scores.count {
      var j = i - 1

      if scores[i] > scores[j] {
        rewards[i] = rewards[j] + 1
      } else {
        while j >= 0, scores[j] > scores[j + 1] {
          rewards[j] = max(rewards[j], rewards[j + 1] + 1)
          j -= 1
        }
      }
    }

    return rewards.reduce(0) { $0 + $1 }
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space
  func minRewards(_ scores: [Int]) -> Int {
    var rewards = Array(repeating: 1, count: scores.count)
    let localMinIndices = getLocalMinIndices(scores)

    for localMinIndex in localMinIndices {
      expandFromLocalMinIndex(localMinIndex, scores, &rewards)
    }

    return rewards.reduce(0) { $0 + $1 }
  }

  func getLocalMinIndices(_ scores: [Int]) -> [Int] {
    if scores.count == 1 {
      return [0]
    }

    var localMinIndices = [Int]()

    for i in 0 ..< scores.count {
      if i == 0 && scores[i] < scores[i + 1] {
        localMinIndices.append(i)
      }

      if i == scores.count - 1 && scores[i] < scores[i - 1] {
        localMinIndices.append(i)
      }

      if i == 0 || i == scores.count - 1 {
        continue
      }

      if scores[i] < scores[i - 1], scores[i] < scores[i + 1] {
        localMinIndices.append(i)
      }
    }

    return localMinIndices
  }

  func expandFromLocalMinIndex(_ localMinIndex: Int, _ scores: [Int], _ rewards: inout [Int]) {
    var leftIndex = localMinIndex - 1

    while leftIndex >= 0, scores[leftIndex] > scores[leftIndex + 1] {
      rewards[leftIndex] = max(rewards[leftIndex], rewards[leftIndex + 1] + 1)
      leftIndex -= 1
    }

    var rightIndex = localMinIndex + 1

    while rightIndex < scores.count, scores[rightIndex] > scores[rightIndex - 1] {
      rewards[rightIndex] = rewards[rightIndex - 1] + 1
      rightIndex += 1
    }
  }
}

```
### Solution 3 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space
  func minRewards(_ scores: [Int]) -> Int {
    var rewards = Array(repeating: 1, count: scores.count)

    for i in stride(from: 1, to: scores.count, by: 1) {
      if scores[i] > scores[i - 1] {
        rewards[i] = rewards[i - 1] + 1
      }
    }

    for i in stride(from: scores.count - 2, through: 0, by: -1) {
      if scores[i] > scores[i + 1] {
        rewards[i] = max(rewards[i], rewards[i + 1] + 1)
      }
    }

    return rewards.reduce(0) { $0 + $1 }
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      try assertEqual(25, program.minRewards([8, 4, 2, 1, 3, 6, 7, 9, 5]))
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
        self.assertEqual(program.minRewards([8, 4, 2, 1, 3, 6, 7, 9, 5]), 25)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^2) time | O(n) space - where n is the length of the input array
def minRewards(scores):
    rewards = [1 for _ in scores]
    for i in range(1, len(scores)):
        j = i - 1
        if scores[i] > scores[j]:
            rewards[i] = rewards[j] + 1
        else:
            while j >= 0 and scores[j] > scores[j + 1]:
                rewards[j] = max(rewards[j], rewards[j + 1] + 1)
                j -= 1
    return sum(rewards)

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the length of the input array
def minRewards(scores):
    rewards = [1 for _ in scores]
    localMinIdxs = getLocalMinIdxs(scores)
    for localMinIdx in localMinIdxs:
        expandFromLocalMinIdx(localMinIdx, scores, rewards)
    return sum(rewards)


def getLocalMinIdxs(array):
    if len(array) == 1:
        return [0]
    localMinIdxs = []
    for i in range(len(array)):
        if i == 0 and array[i] < array[i + 1]:
            localMinIdxs.append(i)
        if i == len(array) - 1 and array[i] < array[i - 1]:
            localMinIdxs.append(i)
        if i == 0 or i == len(array) - 1:
            continue
        if array[i] < array[i + 1] and array[i] < array[i - 1]:
            localMinIdxs.append(i)
    return localMinIdxs


def expandFromLocalMinIdx(localMinIdx, scores, rewards):
    leftIdx = localMinIdx - 1
    while leftIdx >= 0 and scores[leftIdx] > scores[leftIdx + 1]:
        rewards[leftIdx] = max(rewards[leftIdx], rewards[leftIdx + 1] + 1)
        leftIdx -= 1
    rightIdx = localMinIdx + 1
    while rightIdx < len(scores) and scores[rightIdx] > scores[rightIdx - 1]:
        rewards[rightIdx] = rewards[rightIdx - 1] + 1
        rightIdx += 1

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the length of the input array
def minRewards(scores):
    rewards = [1 for _ in scores]
    for i in range(1, len(scores)):
        if scores[i] > scores[i - 1]:
            rewards[i] = rewards[i - 1] + 1
    for i in reversed((range(len(scores) - 1))):
        if scores[i] > scores[i + 1]:
            rewards[i] = max(rewards[i], rewards[i + 1] + 1)
    return sum(rewards)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.minRewards([8, 4, 2, 1, 3, 6, 7, 9, 5]), 25)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.minRewards([8, 4, 2, 1, 3, 6, 7, 9, 5])).to.deep.equal(25);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^2) time | O(n) space - where n is the length of the input array
export function minRewards(scores: number[]) {
  const rewards = scores.map(_ => 1);
  for (let i = 1; i < scores.length; i++) {
    let j = i - 1;
    if (scores[i] > scores[j]) {
      rewards[i] = rewards[j] + 1;
    } else {
      while (j >= 0 && scores[j] > scores[j + 1]) {
        rewards[j] = Math.max(rewards[j], rewards[j + 1] + 1);
        j--;
      }
    }
  }
  return rewards.reduce((a, b) => a + b);
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input array
export function minRewards(scores: number[]) {
  const rewards = scores.map(_ => 1);
  const localMinIdxs = getLocalMinIdxs(scores);
  for (const localMinIdx of localMinIdxs) {
    expandFromLocalMinIdx(localMinIdx, scores, rewards);
  }
  return rewards.reduce((a, b) => a + b);
}

function getLocalMinIdxs(array: number[]) {
  if (array.length === 1) return [0];
  const localMinIdxs: number[] = [];
  for (let i = 0; i < array.length; i++) {
    if (i === 0 && array[i] < array[i + 1]) localMinIdxs.push(i);
    if (i === array.length - 1 && array[i] < array[i - 1]) localMinIdxs.push(i);
    if (i === 0 || i === array.length - 1) continue;
    if (array[i] < array[i + 1] && array[i] < array[i - 1]) localMinIdxs.push(i);
  }
  return localMinIdxs;
}

function expandFromLocalMinIdx(localMinIdx: number, scores: number[], rewards: number[]) {
  let leftIdx = localMinIdx - 1;
  while (leftIdx >= 0 && scores[leftIdx] > scores[leftIdx + 1]) {
    rewards[leftIdx] = Math.max(rewards[leftIdx], rewards[leftIdx + 1] + 1);
    leftIdx--;
  }
  let rightIdx = localMinIdx + 1;
  while (rightIdx < scores.length && scores[rightIdx] > scores[rightIdx - 1]) {
    rewards[rightIdx] = rewards[rightIdx - 1] + 1;
    rightIdx++;
  }
}

```
### Solution 3 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input array
export function minRewards(scores: number[]) {
  const rewards = scores.map(_ => 1);
  for (let i = 1; i < scores.length; i++) {
    if (scores[i] > scores[i - 1]) rewards[i] = rewards[i - 1] + 1;
  }
  for (let i = scores.length - 2; i >= 0; i--) {
    if (scores[i] > scores[i + 1]) rewards[i] = Math.max(rewards[i], rewards[i + 1] + 1);
  }
  return rewards.reduce((a, b) => a + b);
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.minRewards([8, 4, 2, 1, 3, 6, 7, 9, 5])).to.deep.equal(25);
});

```

