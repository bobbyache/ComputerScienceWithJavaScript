# Task Assignment
<div class="html">
<p>
  You're given an integer <span>k</span> representing a number of workers and an
  array of positive integers representing durations of tasks that must be
  completed by the workers. Specifically, each worker must complete two unique
  tasks and can only work on one task at a time. The number of tasks will always
  be equal to <span>2k</span> such that each worker always has exactly two tasks
  to complete. All tasks are independent of one another and can be completed in
  any order. Workers will complete their assigned tasks in parallel, and the
  time taken to complete all tasks will be equal to the time taken to complete
  the longest pair of tasks (see the sample output for an explanation).
</p>
<p>
  Write a function that returns the optimal assignment of tasks to each worker
  such that the tasks are completed as fast as possible. Your function should
  return a list of pairs, where each pair stores the indices of the tasks that
  should be completed by one worker. The pairs should be in the following
  format: <span>[task1, task2]</span>, where the order of <span>task1</span> and
  <span>task2</span> doesn't matter. Your function can return the pairs in any
  order. If multiple optimal assignments exist, any correct answer will be
  accepted.
</p>
<p>
  Note: you'll always be given at least one worker (i.e., <span>k</span> will
  always be greater than <b>0</b>).
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">k</span> = 3
<span class="CodeEditor-promptParameter">tasks</span> = [1, 3, 5, 3, 1, 4]
</pre>
<h3>Sample Output</h3>
<pre>
[
  [0, 2], <span class="CodeEditor-promptComment">// tasks[0] = 1, tasks[2] = 5 | 1 + 5 = 6</span>
  [4, 5], <span class="CodeEditor-promptComment">// tasks[4] = 1, tasks[5] = 4 | 1 + 4 = 5</span>
  [1, 3], <span class="CodeEditor-promptComment">// tasks[1] = 3, tasks[3] = 3 | 3 + 3 = 6</span>
] <span class="CodeEditor-promptComment">// The fastest time to complete all tasks is 6.</span>

<span class="CodeEditor-promptComment">// Note: there are multiple correct answers for this sample input.</span>
<span class="CodeEditor-promptComment">// The following is an example of another correct answer:</span>
<span class="CodeEditor-promptComment">// [</span>
<span class="CodeEditor-promptComment">//   [2, 4],</span>
<span class="CodeEditor-promptComment">//   [0, 5],</span>
<span class="CodeEditor-promptComment">//   [1, 3]</span>
<span class="CodeEditor-promptComment">// [</span>
</pre>
</div>

Hint 1
<p>
Start by considering which pairs of tasks will lead to the <b>longest</b> possible time to complete all tasks. 
</p>


Hint 2

<p>
The amount of time it'll take to complete all tasks will be dictated by the pair of tasks that has the longest total duration. This means that you'll want to avoid pairing long tasks together.
</p>


Hint 3

<p>
Since the pair of tasks with the longest total duration is the time it takes for us to finish all tasks, we want to minimize this pair's duration. To do this, we can simply pair the shortest-duration task with the longest-duration task and repeat the process with all other tasks.
</p>


Hint 4

<p>
Start by sorting the tasks array in ascending order. Then, pair the shortest-duration task with the longest-duration task, and add that pair to some output array. Repeat this process until you've paired all tasks. This will lead to an optimal pairing, because your pair of tasks with the longest duration will have the shortest duration that it can possibly have.
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
      int k = 3;
      vector<int> tasks = {1, 3, 5, 3, 1, 4};
      vector<vector<int>> expected = {{4, 2}, {0, 5}, {3, 1}};
      auto actual = taskAssignment(k, tasks);
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
#include <unordered_map>
using namespace std;

unordered_map<int, vector<int>> getTaskDurationsToIndices(vector<int> tasks);

// O(nlog(n)) time | O(n) space - where n is the number of tasks
vector<vector<int>> taskAssignment(int k, vector<int> tasks) {
  vector<vector<int>> pairedTasks;
  auto taskDurationToIndices = getTaskDurationsToIndices(tasks);

  vector<int> sortedTasks(tasks);
  sort(sortedTasks.begin(), sortedTasks.end());

  for (int idx = 0; idx < k; idx++) {
    auto task1Duration = sortedTasks[idx];
    auto indicesWithTask1Duration = &taskDurationToIndices[task1Duration];
    auto task1Index = indicesWithTask1Duration->back();
    indicesWithTask1Duration->pop_back();

    auto task2SortedIndex = tasks.size() - 1 - idx;
    auto task2Duration = sortedTasks[task2SortedIndex];
    auto indicesWithTask2Duration = &taskDurationToIndices[task2Duration];
    auto task2Index = indicesWithTask2Duration->back();
    indicesWithTask2Duration->pop_back();

    pairedTasks.push_back(vector<int>{task1Index, task2Index});
  }

  return pairedTasks;
}

unordered_map<int, vector<int>> getTaskDurationsToIndices(vector<int> tasks) {
  unordered_map<int, vector<int>> taskDurationToIndices;

  for (int idx = 0; idx < tasks.size(); idx++) {
    auto taskDuration = tasks[idx];
    if (taskDurationToIndices.find(taskDuration) !=
        taskDurationToIndices.end()) {
      taskDurationToIndices[taskDuration].push_back(idx);
    } else {
      taskDurationToIndices[taskDuration] = vector<int>{idx};
    }
  }

  return taskDurationToIndices;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      int k = 3;
      vector<int> tasks = {1, 3, 5, 3, 1, 4};
      vector<vector<int>> expected = {{4, 2}, {0, 5}, {3, 1}};
      auto actual = taskAssignment(k, tasks);
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
using System.Linq;
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		var k = 3;
		var tasks = new List<int> {
			1, 3, 5, 3, 1, 4
		};
		var expected = new List<List<int> >();
		List<int> subarr = new List<int> {
			4, 2
		};
		List<int> subarr2 = new List<int> {
			0, 5
		};
		List<int> subarr3 = new List<int> {
			3, 1
		};
		expected.Add(subarr);
		expected.Add(subarr2);
		expected.Add(subarr3);
		var actual = new Program().TaskAssignment(k, tasks);
		for (var i = 0; i < expected.Count; i++) {
			Utils.AssertTrue(Enumerable.SequenceEqual(expected[i], actual[i]));
		}
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

	//O(nlog(n)) time | O(n) space - where n is the number of tasks
	public List<List<int> > TaskAssignment(int k, List<int> tasks) {
		List<List<int> > pairedTasks = new List<List<int> >();
		Dictionary<int,
		  List<int> > taskDurationsToIndices = getTaskDurationsToIndices(tasks);

		List<int> sortedTasks = tasks;
		sortedTasks.Sort();

		for (int idx=0; idx<k; idx++) {
			int task1Duration = sortedTasks[idx];
			List<int> indicesWithTask1Duration = taskDurationsToIndices[task1Duration];
			int task1Index =
			  indicesWithTask1Duration[indicesWithTask1Duration.Count - 1];
			indicesWithTask1Duration.RemoveAt(indicesWithTask1Duration.Count - 1);

			int task2SortedIndex = tasks.Count - 1 - idx;
			int task2Duration = sortedTasks[task2SortedIndex];
			List<int> indicesWithTask2Duration = taskDurationsToIndices[task2Duration];
			int task2Index =
			  indicesWithTask2Duration[indicesWithTask2Duration.Count - 1];
			indicesWithTask2Duration.RemoveAt(indicesWithTask2Duration.Count - 1);

			List<int> pairedTask = new List<int>();
			pairedTask.Add(task1Index);
			pairedTask.Add(task2Index);
			pairedTasks.Add(pairedTask);
		}

		return pairedTasks;
	}

	public Dictionary<int, List<int> > getTaskDurationsToIndices(List<int> tasks) {
		Dictionary<int,
		  List<int> > taskDurationsToIndices = new Dictionary<int, List<int> > ();

		for (int idx=0; idx<tasks.Count; idx++) {
			int taskDuration = tasks[idx];
			if (taskDurationsToIndices.ContainsKey(taskDuration)) {
				taskDurationsToIndices[taskDuration].Add(idx);
			} else {
				List<int> temp = new List<int>();
				temp.Add(idx);
				taskDurationsToIndices[taskDuration] = temp;
			}
		}

		return taskDurationsToIndices;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;
using System.Linq;
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		var k = 3;
		var tasks = new List<int> {
			1, 3, 5, 3, 1, 4
		};
		var expected = new List<List<int> >();
		List<int> subarr = new List<int> {
			4, 2
		};
		List<int> subarr2 = new List<int> {
			0, 5
		};
		List<int> subarr3 = new List<int> {
			3, 1
		};
		expected.Add(subarr);
		expected.Add(subarr2);
		expected.Add(subarr3);
		var actual = new Program().TaskAssignment(k, tasks);
		for (var i = 0; i < expected.Count; i++) {
			Utils.AssertTrue(Enumerable.SequenceEqual(expected[i], actual[i]));
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
	k := 3
	tasks := []int{1, 3, 5, 3, 1, 4}
	expected := [][]int{{4, 2}, {0, 5}, {3, 1}}
	actual := TaskAssignment(k, tasks)
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

// O(nlog(n)) time | O(n) space - where n is the number of tasks
func TaskAssignment(k int, tasks []int) [][]int {
	pairedTasks := make([][]int, 0)
	taskDurationsToIndices := getTaskDurationsToIndices(tasks)

	sort.Slice(tasks, func(i, j int) bool {
		return tasks[i] < tasks[j]
	})

	var task1Index, task2Index int
	for idx := 0; idx < k; idx++ {
		task1Duration := tasks[idx]
		indicesWithTask1Duration := taskDurationsToIndices[task1Duration]
		task1Index, taskDurationsToIndices[task1Duration] =
			indicesWithTask1Duration[len(indicesWithTask1Duration)-1],
			indicesWithTask1Duration[:len(indicesWithTask1Duration)-1]

		task2SortedIndex := len(tasks) - 1 - idx
		task2Duration := tasks[task2SortedIndex]
		indicesWithTask2Duration := taskDurationsToIndices[task2Duration]
		task2Index, taskDurationsToIndices[task2Duration] =
			indicesWithTask2Duration[len(indicesWithTask2Duration)-1],
			indicesWithTask2Duration[:len(indicesWithTask2Duration)-1]

		pairedTasks = append(pairedTasks, []int{task1Index, task2Index})
	}
	return pairedTasks
}

func getTaskDurationsToIndices(tasks []int) map[int][]int {
	taskDurationsToIndices := map[int][]int{}

	for idx := range tasks {
		taskDuration := tasks[idx]
		taskDurationsToIndices[taskDuration] = append(taskDurationsToIndices[taskDuration], idx)
	}

	return taskDurationsToIndices
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	k := 3
	tasks := []int{1, 3, 5, 3, 1, 4}
	expected := [][]int{{4, 2}, {0, 5}, {3, 1}}
	actual := TaskAssignment(k, tasks)
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
    var k = 3;
    var tasks = new ArrayList<Integer>(Arrays.asList(1, 3, 5, 3, 1, 4));
    var expected = new ArrayList<ArrayList<Integer>>();
    ArrayList<Integer> subarr = new ArrayList<Integer>(Arrays.asList(4, 2));
    ArrayList<Integer> subarr2 = new ArrayList<Integer>(Arrays.asList(0, 5));
    ArrayList<Integer> subarr3 = new ArrayList<Integer>(Arrays.asList(3, 1));
    expected.add(subarr);
    expected.add(subarr2);
    expected.add(subarr3);
    var actual = new Program().taskAssignment(k, tasks);
    Utils.assertTrue(expected.equals(actual));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(nlog(n)) time | O(n) space - where n is the number of tasks
  public ArrayList<ArrayList<Integer>> taskAssignment(int k, ArrayList<Integer> tasks) {
    ArrayList<ArrayList<Integer>> pairedTasks = new ArrayList<ArrayList<Integer>>();
    HashMap<Integer, ArrayList<Integer>> taskDurationsToIndices = getTaskDurationsToIndices(tasks);

    ArrayList<Integer> sortedTasks = tasks;
    Collections.sort(sortedTasks);

    for (int idx = 0; idx < k; idx++) {
      int task1Duration = sortedTasks.get(idx);
      ArrayList<Integer> indicesWithTask1Duration = taskDurationsToIndices.get(task1Duration);
      int task1Index = indicesWithTask1Duration.remove(indicesWithTask1Duration.size() - 1);

      int task2SortedIndex = tasks.size() - 1 - idx;
      int task2Duration = sortedTasks.get(task2SortedIndex);
      ArrayList<Integer> indicesWithTask2Duration = taskDurationsToIndices.get(task2Duration);
      int task2Index = indicesWithTask2Duration.remove(indicesWithTask2Duration.size() - 1);

      ArrayList<Integer> pairedTask = new ArrayList<Integer>();
      pairedTask.add(task1Index);
      pairedTask.add(task2Index);
      pairedTasks.add(pairedTask);
    }

    return pairedTasks;
  }

  public HashMap<Integer, ArrayList<Integer>> getTaskDurationsToIndices(ArrayList<Integer> tasks) {
    HashMap<Integer, ArrayList<Integer>> taskDurationsToIndices =
        new HashMap<Integer, ArrayList<Integer>>();

    for (int idx = 0; idx < tasks.size(); idx++) {
      int taskDuration = tasks.get(idx);
      if (taskDurationsToIndices.containsKey(taskDuration)) {
        taskDurationsToIndices.get(taskDuration).add(idx);
      } else {
        ArrayList<Integer> temp = new ArrayList<Integer>();
        temp.add(idx);
        taskDurationsToIndices.put(taskDuration, temp);
      }
    }

    return taskDurationsToIndices;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    var k = 3;
    var tasks = new ArrayList<Integer>(Arrays.asList(1, 3, 5, 3, 1, 4));
    var expected = new ArrayList<ArrayList<Integer>>();
    ArrayList<Integer> subarr = new ArrayList<Integer>(Arrays.asList(4, 2));
    ArrayList<Integer> subarr2 = new ArrayList<Integer>(Arrays.asList(0, 5));
    ArrayList<Integer> subarr3 = new ArrayList<Integer>(Arrays.asList(3, 1));
    expected.add(subarr);
    expected.add(subarr2);
    expected.add(subarr3);
    var actual = new Program().taskAssignment(k, tasks);
    Utils.assertTrue(expected.equals(actual));
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
  const k = 3;
  const tasks = [1, 3, 5, 3, 1, 4];
  const expected = [
    [4, 2],
    [0, 5],
    [3, 1],
  ];
  const actual = program.taskAssignment(k, tasks);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlog(n)) time | O(n) space - where n is the number of tasks
function taskAssignment(k, tasks) {
  const pairedTasks = [];
  const taskDurationToIndices = getTaskDurationToIndices(tasks);

  const sortedTasks = [...tasks].sort((a, b) => a - b);
  for (let idx = 0; idx < k; idx++) {
    const task1Duration = sortedTasks[idx];
    const indicesWithTask1Duration = taskDurationToIndices[task1Duration];
    const task1Index = indicesWithTask1Duration.pop();

    const task2SortedIndex = tasks.length - 1 - idx;
    const task2Duration = sortedTasks[task2SortedIndex];
    const indicesWithTask2Duration = taskDurationToIndices[task2Duration];
    const task2Index = indicesWithTask2Duration.pop();

    pairedTasks.push([task1Index, task2Index]);
  }

  return pairedTasks;
}

function getTaskDurationToIndices(tasks) {
  const taskDurationToIndices = {};

  for (let idx = 0; idx < tasks.length; idx++) {
    const taskDuration = tasks[idx];
    if (taskDuration in taskDurationToIndices) {
      taskDurationToIndices[taskDuration].push(idx);
    } else {
      taskDurationToIndices[taskDuration] = [idx];
    }
  }

  return taskDurationToIndices;
}

// Do not edit the line below.
exports.taskAssignment = taskAssignment;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const k = 3;
  const tasks = [1, 3, 5, 3, 1, 4];
  const expected = [
    [4, 2],
    [0, 5],
    [3, 1],
  ];
  const actual = program.taskAssignment(k, tasks);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.taskAssignment

class ProgramTest {
    @Test
    fun TestCase1() {
        val k = 3
        val tasks = listOf(1, 3, 5, 3, 1, 4)
        val expected = listOf(
            listOf(4, 2),
            listOf(0, 5),
            listOf(3, 1)
        )
        val output = taskAssignment(k, tasks)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(nlog(n)) time | O(n) space - where n is the number of tasks
fun taskAssignment(k: Int, tasks: List<Int>): List<List<Int>> {
    val pairedTasks = mutableListOf<List<Int>>()
    val taskDurationsToIndices = getTaskDurationsToIndices(tasks)

    val sortedTasks = tasks.sorted()
    for (idx in 0 until k) {
        val task1Duration = sortedTasks[idx]
        val indicesWithTask1Duration = taskDurationsToIndices[task1Duration]!!
        val task1Index = indicesWithTask1Duration.removeAt(indicesWithTask1Duration.size - 1)

        val task2SortedIndex = tasks.size - 1 - idx
        val task2Duration = sortedTasks[task2SortedIndex]
        val indicesWithTask2Duration = taskDurationsToIndices[task2Duration]!!
        val task2Index = indicesWithTask2Duration.removeAt(indicesWithTask2Duration.size - 1)

        pairedTasks.add(listOf(task1Index, task2Index))
    }

    return pairedTasks
}

fun getTaskDurationsToIndices(tasks: List<Int>): MutableMap<Int, MutableList<Int>> {
    val taskDurationsToIndices = mutableMapOf<Int, MutableList<Int>>()

    for (idx in 0 until tasks.size) {
        val taskDuration = tasks[idx]
        if (taskDuration in taskDurationsToIndices) {
            taskDurationsToIndices[taskDuration]!!.add(idx)
        } else {
            taskDurationsToIndices[taskDuration] = mutableListOf(idx)
        }
    }

    return taskDurationsToIndices
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.taskAssignment

class ProgramTest {
    @Test
    fun TestCase1() {
        val k = 3
        val tasks = listOf(1, 3, 5, 3, 1, 4)
        val expected = listOf(
            listOf(4, 2),
            listOf(0, 5),
            listOf(3, 1)
        )
        val output = taskAssignment(k, tasks)
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
      var k = 3
      var tasks = [1, 3, 5, 3, 1, 4]
      var expected = [[4, 2], [0, 5], [3, 1]]
      var actual = Program().taskAssignment(k, tasks)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nlog(n)) time | O(n) space - where n is the number of tasks
  func taskAssignment(_ k: Int, _ tasks: [Int]) -> [[Int]] {
    var pairedTasks = [[Int]]()
    var taskDurationsToIndices = getTaskDurationsToIndices(tasks)

    let sortedTasks = tasks.sorted()

    for idx in 0 ..< k {
      let task1Duration = sortedTasks[idx]
      var indicesWithTask1Duration = taskDurationsToIndices[task1Duration]!
      let task1Index = indicesWithTask1Duration.popLast()!
      taskDurationsToIndices[task1Duration] = indicesWithTask1Duration

      let task2SortedIndex = tasks.count - 1 - idx
      let task2Duration = sortedTasks[task2SortedIndex]
      var indicesWithTask2Duration = taskDurationsToIndices[task2Duration]!
      let task2Index = indicesWithTask2Duration.popLast()!
      taskDurationsToIndices[task2Duration] = indicesWithTask2Duration

      pairedTasks.append([task1Index, task2Index])
    }
    return pairedTasks
  }

  func getTaskDurationsToIndices(_ tasks: [Int]) -> [Int: [Int]] {
    var taskDurationsToIndices = [Int: [Int]]()

    for idx in 0 ..< tasks.count {
      let taskDuration = tasks[idx]
      if taskDurationsToIndices[taskDuration] == nil {
        taskDurationsToIndices[taskDuration] = [Int]()
      }
      taskDurationsToIndices[taskDuration]!.append(idx)
    }
    return taskDurationsToIndices
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var k = 3
      var tasks = [1, 3, 5, 3, 1, 4]
      var expected = [[4, 2], [0, 5], [3, 1]]
      var actual = Program().taskAssignment(k, tasks)
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
        k = 3
        tasks = [1, 3, 5, 3, 1, 4]
        expected = [[4, 2], [0, 5], [3, 1]]
        actual = program.taskAssignment(k, tasks)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nlog(n)) time | O(n) space - where n is the number of tasks
def taskAssignment(k, tasks):
    pairedTasks = []
    taskDurationsToIndices = getTaskDurationsToIndices(tasks)

    sortedTasks = sorted(tasks)
    for idx in range(k):
        task1Duration = sortedTasks[idx]
        indicesWithTask1Duration = taskDurationsToIndices[task1Duration]
        task1Index = indicesWithTask1Duration.pop()

        task2SortedIndex = len(tasks) - 1 - idx
        task2Duration = sortedTasks[task2SortedIndex]
        indicesWithTask2Duration = taskDurationsToIndices[task2Duration]
        task2Index = indicesWithTask2Duration.pop()

        pairedTasks.append([task1Index, task2Index])

    return pairedTasks


def getTaskDurationsToIndices(tasks):
    taskDurationsToIndices = {}

    for idx, taskDuration in enumerate(tasks):
        if taskDuration in taskDurationsToIndices:
            taskDurationsToIndices[taskDuration].append(idx)
        else:
            taskDurationsToIndices[taskDuration] = [idx]

    return taskDurationsToIndices

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        k = 3
        tasks = [1, 3, 5, 3, 1, 4]
        expected = [[4, 2], [0, 5], [3, 1]]
        actual = program.taskAssignment(k, tasks)
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
  const k = 3;
  const tasks = [1, 3, 5, 3, 1, 4];
  const expected = [
    [4, 2],
    [0, 5],
    [3, 1],
  ];
  const actual = program.taskAssignment(k, tasks);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nlog(n)) time | O(n) space - where n is the number of tasks
export function taskAssignment(k: number, tasks: number[]) {
  const pairedTasks: [number, number][] = [];
  const taskDurationToIndices = getTaskDurationToIndices(tasks);

  const sortedTasks = [...tasks].sort((a, b) => a - b);
  for (let idx = 0; idx < k; idx++) {
    const task1Duration = sortedTasks[idx];
    const indicesWithTask1Duration = taskDurationToIndices[task1Duration];
    const task1Index = indicesWithTask1Duration.pop()!;

    const task2SortedIndex = tasks.length - 1 - idx;
    const task2Duration = sortedTasks[task2SortedIndex];
    const indicesWithTask2Duration = taskDurationToIndices[task2Duration];
    const task2Index = indicesWithTask2Duration.pop()!;

    pairedTasks.push([task1Index, task2Index]);
  }

  return pairedTasks;
}

function getTaskDurationToIndices(tasks: number[]) {
  const taskDurationToIndices: {[task: number]: number[]} = {};

  for (let idx = 0; idx < tasks.length; idx++) {
    const taskDuration = tasks[idx];
    if (taskDuration in taskDurationToIndices) {
      taskDurationToIndices[taskDuration].push(idx);
    } else {
      taskDurationToIndices[taskDuration] = [idx];
    }
  }

  return taskDurationToIndices;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const k = 3;
  const tasks = [1, 3, 5, 3, 1, 4];
  const expected = [
    [4, 2],
    [0, 5],
    [3, 1],
  ];
  const actual = program.taskAssignment(k, tasks);
  chai.expect(actual).to.deep.equal(expected);
});

```

