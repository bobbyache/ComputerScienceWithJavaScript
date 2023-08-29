# Topological Sort
<div class="html">
<p>
  You're given a list of arbitrary jobs that need to be completed; these jobs
  are represented by distinct integers. You're also given a list of dependencies. A
  dependency is represented as a pair of jobs where the first job is a
  prerequisite of the second one. In other words, the second job depends on the
  first one; it can only be completed once the first job is completed.
</p>
<p>
  Write a function that takes in a list of jobs and a list of dependencies and
  returns a list containing a valid order in which the given jobs can be
  completed. If no such order exists, the function should return an empty array.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">jobs</span> = [1, 2, 3, 4]
<span class="CodeEditor-promptParameter">deps</span> = [[1, 2], [1, 3], [3, 2], [4, 2], [4, 3]]
</pre>
<h3>Sample Output</h3>
<pre>
[1, 4, 3, 2] or [4, 1, 3, 2]
</pre>
</div>

Hint 1
<p>
Try representing the jobs and dependencies as a graph, where each vertex is a job and each edge is a dependency. How can you traverse this graph to topologically sort the list of jobs?
</p>


Hint 2

<p>
One approach to solving this problem is to traverse the graph mentioned in Hint #1 using Depth-first Search. Starting at a random job, traverse its prerequisite jobs in Depth-first Search fashion until you reach a job with no prerequisites; such a job can safely be appended to the final order. Once you've traversed and added all prerequisites of a job to the final order, you can append the job in question to the order. This approach will have to track whether nodes have been traversed already, whether they're in the process of being traversed (which would indicate a cycle in the graph and therefore no valid topological order), or whether they're ready to be traversed.
</p>


Hint 3

<p>
Another approach to solving this problem is to traverse the graph mentioned in Hint #1 starting specifically with jobs that have no prerequisites. Keep track of all the jobs that have no prerequisites, traverse them one by one, and append them to the final order. For all of these jobs, remove their dependencies from the graph and update the number of prerequisites for each of these dependencies accordingly (these dependencies should now have one prerequisite less since one of their prerequisite job has just been added to the final order). As you update the number of prerequisites for these other jobs, keep track of the ones that no longer have prerequisites and that are ready to be traversed. You'll eventually go through all of the jobs if there are no cycles in the graph. If there is a cycle in the graph, there will still be jobs with prerequisites and you'll know that there is no valid topological order. This approach will involve keeping track of the number of prerequisites per job as well as all the actual dependencies of each job.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

#include <unordered_map>

bool isValidTopologicalOrder(vector<int> order, vector<int> jobs,
                             vector<vector<int>> deps);

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> jobs = {1, 2, 3, 4};
      vector<vector<int>> deps = {{1, 2}, {1, 3}, {3, 2}, {4, 2}, {4, 3}};
      vector<int> order = topologicalSort(jobs, deps);
      assert(isValidTopologicalOrder(order, jobs, deps) == true);
    });
  }
};

bool isValidTopologicalOrder(vector<int> order, vector<int> jobs,
                             vector<vector<int>> deps) {
  unordered_map<int, bool> visited;
  for (int candidate : order) {
    for (vector<int> dep : deps) {
      if (candidate == dep[0] && visited.find(dep[1]) != visited.end())
        return false;
    }
    visited[candidate] = true;
  }
  for (int job : jobs) {
    if (visited.find(job) == visited.end())
      return false;
  }
  return order.size() == jobs.size();
}

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <unordered_map>
using namespace std;

class JobNode {
public:
  int job;
  vector<JobNode *> prereqs;
  bool visited;
  bool visiting;

  JobNode(int job);
};

class JobGraph {
public:
  vector<JobNode *> nodes;
  unordered_map<int, JobNode *> graph;

  JobGraph(vector<int> jobs);
  void addPrereq(int job, int prereq);
  void addNode(int job);
  JobNode *getNode(int job);
};

JobGraph *createJobGraph(vector<int> jobs, vector<vector<int>> deps);
vector<int> getOrderedJobs(JobGraph *graph);
bool depthFirstTraverse(JobNode *node, vector<int> *orderedJobs);

// O(j + d) time | O(j + d) space
vector<int> topologicalSort(vector<int> jobs, vector<vector<int>> deps) {
  JobGraph *jobGraph = createJobGraph(jobs, deps);
  return getOrderedJobs(jobGraph);
}

JobGraph *createJobGraph(vector<int> jobs, vector<vector<int>> deps) {
  JobGraph *graph = new JobGraph(jobs);
  for (vector<int> dep : deps) {
    graph->addPrereq(dep[1], dep[0]);
  }
  return graph;
}

vector<int> getOrderedJobs(JobGraph *graph) {
  vector<int> orderedJobs = {};
  vector<JobNode *> nodes = graph->nodes;
  while (nodes.size()) {
    JobNode *node = nodes.back();
    nodes.pop_back();
    bool containsCycle = depthFirstTraverse(node, &orderedJobs);
    if (containsCycle)
      return {};
  }
  return orderedJobs;
}

bool depthFirstTraverse(JobNode *node, vector<int> *orderedJobs) {
  if (node->visited)
    return false;
  if (node->visiting)
    return true;
  node->visiting = true;
  for (JobNode *prereqNode : node->prereqs) {
    bool containsCycle = depthFirstTraverse(prereqNode, orderedJobs);
    if (containsCycle)
      return true;
  }
  node->visited = true;
  node->visiting = false;
  orderedJobs->push_back(node->job);
  return false;
}

JobGraph::JobGraph(vector<int> jobs) {
  nodes = {};
  for (int job : jobs) {
    addNode(job);
  }
}

void JobGraph::addPrereq(int job, int prereq) {
  JobNode *jobNode = getNode(job);
  JobNode *prereqNode = getNode(prereq);
  jobNode->prereqs.push_back(prereqNode);
}

void JobGraph::addNode(int job) {
  graph[job] = new JobNode(job);
  nodes.push_back(graph[job]);
}

JobNode *JobGraph::getNode(int job) {
  if (graph.find(job) == graph.end())
    addNode(job);
  return graph[job];
}

JobNode::JobNode(int job) {
  this->job = job;
  prereqs = {};
  visited = false;
  visiting = false;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

class JobNode {
public:
  int job;
  vector<JobNode *> deps;
  int numOfPrereqs;

  JobNode(int job);
};

class JobGraph {
public:
  vector<JobNode *> nodes;
  unordered_map<int, JobNode *> graph;

  JobGraph(vector<int> jobs);
  void addDep(int job, int dep);
  void addNode(int job);
  JobNode *getNode(int job);
};

JobGraph *createJobGraph(vector<int> jobs, vector<vector<int>> deps);
vector<int> getOrderedJobs(JobGraph *graph);
void removeDeps(JobNode *node, vector<JobNode *> *nodesWithNoPrereqs);

// O(j + d) time | O(j + d) space
vector<int> topologicalSort(vector<int> jobs, vector<vector<int>> deps) {
  JobGraph *jobGraph = createJobGraph(jobs, deps);
  return getOrderedJobs(jobGraph);
}

JobGraph *createJobGraph(vector<int> jobs, vector<vector<int>> deps) {
  JobGraph *graph = new JobGraph(jobs);
  for (vector<int> dep : deps) {
    graph->addDep(dep[0], dep[1]);
  }
  return graph;
}

vector<int> getOrderedJobs(JobGraph *graph) {
  vector<int> orderedJobs = {};
  vector<JobNode *> nodesWithNoPrereqs(graph->nodes.size());
  auto it = copy_if(graph->nodes.begin(), graph->nodes.end(),
                    nodesWithNoPrereqs.begin(),
                    [](JobNode *node) { return node->numOfPrereqs == 0; });
  nodesWithNoPrereqs.resize(distance(nodesWithNoPrereqs.begin(), it));
  while (nodesWithNoPrereqs.size()) {
    JobNode *node = nodesWithNoPrereqs.back();
    nodesWithNoPrereqs.pop_back();
    orderedJobs.push_back(node->job);
    removeDeps(node, &nodesWithNoPrereqs);
  }
  bool graphHasEdges = false;
  for (JobNode *node : graph->nodes) {
    if (node->numOfPrereqs) {
      graphHasEdges = true;
    }
  }
  return graphHasEdges ? vector<int>{} : orderedJobs;
}

void removeDeps(JobNode *node, vector<JobNode *> *nodesWithNoPrereqs) {
  while (node->deps.size()) {
    JobNode *dep = node->deps.back();
    node->deps.pop_back();
    dep->numOfPrereqs--;
    if (!dep->numOfPrereqs)
      nodesWithNoPrereqs->push_back(dep);
  }
}

JobGraph::JobGraph(vector<int> jobs) {
  nodes = {};
  for (int job : jobs) {
    addNode(job);
  }
}

void JobGraph::addDep(int job, int dep) {
  JobNode *jobNode = getNode(job);
  JobNode *depNode = getNode(dep);
  jobNode->deps.push_back(depNode);
  depNode->numOfPrereqs++;
}

void JobGraph::addNode(int job) {
  graph[job] = new JobNode(job);
  nodes.push_back(graph[job]);
}

JobNode *JobGraph::getNode(int job) {
  if (graph.find(job) == graph.end())
    addNode(job);
  return graph[job];
}

JobNode::JobNode(int job) {
  this->job = job;
  deps = {};
  numOfPrereqs = 0;
}

```
### Unit Tests 1 (cpp)
```cpp
#include <unordered_map>

bool isValidTopologicalOrder(vector<int> order, vector<int> jobs,
                             vector<vector<int>> deps);

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> jobs = {1, 2, 3, 4};
      vector<vector<int>> deps = {{1, 2}, {1, 3}, {3, 2}, {4, 2}, {4, 3}};
      vector<int> order = topologicalSort(jobs, deps);
      assert(isValidTopologicalOrder(order, jobs, deps) == true);
    });
  }
};

bool isValidTopologicalOrder(vector<int> order, vector<int> jobs,
                             vector<vector<int>> deps) {
  unordered_map<int, bool> visited;
  for (int candidate : order) {
    for (vector<int> dep : deps) {
      if (candidate == dep[0] && visited.find(dep[1]) != visited.end())
        return false;
    }
    visited[candidate] = true;
  }
  for (int job : jobs) {
    if (visited.find(job) == visited.end())
      return false;
  }
  return order.size() == jobs.size();
}

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
		List<int> jobs = new List<int>(){
			1, 2, 3, 4
		};
		int[,] depsArray = new int[,] {
			{1, 2}, {1, 3}, {3, 2}, {4, 2}, {4, 3}
		};
		List<int[]> deps = new List<int[]>();
		fillDeps(depsArray, deps);
		List<int> order = Program.TopologicalSort(jobs, deps);
		Utils.AssertTrue(isValidTopologicalOrder(order, jobs, deps) == true);
	}

	void fillDeps(int[,] depsArray, List<int[]> deps) {
		for (int x = 0; x < depsArray.GetLength(0); x++) {
			var arr = new int[depsArray.GetLength(1)];
			for (int y = 0; y < depsArray.GetLength(1); y++) {
				arr[y] = depsArray[x,y];
			}
			deps.Add(arr);
		}
	}

	bool isValidTopologicalOrder(List<int> order, List<int> jobs, List<int[]> deps) {
		Dictionary<int, bool> visited = new Dictionary<int, bool>();
		foreach (int candidate in order) {
			foreach (int[] dep in deps) {
				if (candidate == dep[0] &&
				  visited.ContainsKey(dep[1])) return false;
			}
			visited.Add(candidate, true);
		}
		foreach (int job in jobs) {
			if (!visited.ContainsKey(job)) return false;
		}
		return order.Count == jobs.Count;
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(j + d) time | O(j + d) space
	public static List<int> TopologicalSort(List<int> jobs, List<int[]> deps) {
		JobGraph jobGraph = createJobGraph(jobs, deps);
		return getOrderedJobs(jobGraph);
	}

	public static JobGraph createJobGraph(List<int> jobs, List<int[]> deps) {
		JobGraph graph = new JobGraph(jobs);
		foreach (int[] dep in deps) {
			graph.addPrereq(dep[1], dep[0]);
		}
		return graph;
	}

	public static List<int> getOrderedJobs(JobGraph graph) {
		List<int> orderedJobs = new List<int>();
		List<JobNode> nodes = new List<JobNode>(graph.nodes);
		while (nodes.Count > 0) {
			JobNode node = nodes[nodes.Count - 1];
			nodes.RemoveAt(nodes.Count - 1);
			bool ContainsCycle = depthFirstTraverse(node, orderedJobs);
			if (ContainsCycle) return new List<int>();
		}
		return orderedJobs;
	}

	public static bool depthFirstTraverse(JobNode node, List<int> orderedJobs) {
		if (node.visited) return false;
		if (node.visiting) return true;
		node.visiting = true;
		foreach (JobNode prereqNode in node.prereqs) {
			bool ContainsCycle = depthFirstTraverse(prereqNode, orderedJobs);
			if (ContainsCycle) return true;
		}
		node.visited = true;
		node.visiting = false;
		orderedJobs.Add(node.job);
		return false;
	}

	public class JobGraph {
		public List<JobNode> nodes;
		public Dictionary<int, JobNode> graph;

		public JobGraph(List<int> jobs) {
			nodes = new List<JobNode>();
			graph = new Dictionary<int, JobNode>();
			foreach (int job in jobs) {
				addNode(job);
			}
		}

		public void addPrereq(int job, int prereq) {
			JobNode jobNode = getNode(job);
			JobNode prereqNode = getNode(prereq);
			jobNode.prereqs.Add(prereqNode);
		}

		public void addNode(int job) {
			graph.Add(job, new JobNode(job));
			nodes.Add(graph[job]);
		}

		public JobNode getNode(int job) {
			if (!graph.ContainsKey(job)) addNode(job);
			return graph[job];
		}
	}

	public class JobNode {
		public int job;
		public List<JobNode> prereqs;
		public bool visited;
		public bool visiting;

		public JobNode(int job) {
			this.job = job;
			prereqs = new List<JobNode>();
			visited = false;
			visiting = false;
		}
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(j + d) time | O(j + d) space
	public static List<int> TopologicalSort(List<int> jobs, List<int[]> deps) {
		JobGraph jobGraph = createJobGraph(jobs, deps);
		return getOrderedJobs(jobGraph);
	}

	public static JobGraph createJobGraph(List<int> jobs, List<int[]> deps) {
		JobGraph graph = new JobGraph(jobs);
		foreach (int[] dep in deps) {
			graph.addDep(dep[0], dep[1]);
		}
		return graph;
	}

	public static List<int> getOrderedJobs(JobGraph graph) {
		List<int> orderedJobs = new List<int>();
		List<JobNode> nodesWithNoPrereqs = new List<JobNode>();
		foreach (JobNode node in graph.nodes) {
			if (node.numOfPrereqs == 0) {
				nodesWithNoPrereqs.Add(node);
			}
		}
		while (nodesWithNoPrereqs.Count > 0) {
			JobNode node = nodesWithNoPrereqs[nodesWithNoPrereqs.Count - 1];
			nodesWithNoPrereqs.RemoveAt(nodesWithNoPrereqs.Count - 1);
			orderedJobs.Add(node.job);
			removeDeps(node, nodesWithNoPrereqs);
		}
		bool graphHasEdges = false;
		foreach (JobNode node in graph.nodes) {
			if (node.numOfPrereqs > 0) {
				graphHasEdges = true;
			}
		}
		return graphHasEdges ? new List<int>() : orderedJobs;
	}

	public static void removeDeps(JobNode node, List<JobNode> nodesWithNoPrereqs) {
		while (node.deps.Count > 0) {
			JobNode dep = node.deps[node.deps.Count - 1];
			node.deps.RemoveAt(node.deps.Count - 1);
			dep.numOfPrereqs--;
			if (dep.numOfPrereqs == 0) nodesWithNoPrereqs.Add(dep);
		}
	}

	public class JobGraph {
		public List<JobNode> nodes;
		public Dictionary<int, JobNode> graph;

		public JobGraph(List<int> jobs) {
			nodes = new List<JobNode>();
			graph = new Dictionary<int, JobNode>();
			foreach (int job in jobs) {
				addNode(job);
			}
		}

		public void addDep(int job, int dep) {
			JobNode jobNode = getNode(job);
			JobNode depNode = getNode(dep);
			jobNode.deps.Add(depNode);
			depNode.numOfPrereqs++;
		}

		public void addNode(int job) {
			graph.Add(job, new JobNode(job));
			nodes.Add(graph[job]);
		}

		public JobNode getNode(int job) {
			if (!graph.ContainsKey(job)) addNode(job);
			return graph[job];
		}
	}

	public class JobNode {
		public int job;
		public List<JobNode> deps;
		public int numOfPrereqs;

		public JobNode(int job) {
			this.job = job;
			deps = new List<JobNode>();
			numOfPrereqs = 0;
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		List<int> jobs = new List<int>(){
			1, 2, 3, 4
		};
		int[,] depsArray = new int[,] {
			{1, 2}, {1, 3}, {3, 2}, {4, 2}, {4, 3}
		};
		List<int[]> deps = new List<int[]>();
		fillDeps(depsArray, deps);
		List<int> order = Program.TopologicalSort(jobs, deps);
		Utils.AssertTrue(isValidTopologicalOrder(order, jobs, deps) == true);
	}

	void fillDeps(int[,] depsArray, List<int[]> deps) {
		for (int x = 0; x < depsArray.GetLength(0); x++) {
			var arr = new int[depsArray.GetLength(1)];
			for (int y = 0; y < depsArray.GetLength(1); y++) {
				arr[y] = depsArray[x,y];
			}
			deps.Add(arr);
		}
	}

	bool isValidTopologicalOrder(List<int> order, List<int> jobs, List<int[]> deps) {
		Dictionary<int, bool> visited = new Dictionary<int, bool>();
		foreach (int candidate in order) {
			foreach (int[] dep in deps) {
				if (candidate == dep[0] &&
				  visited.ContainsKey(dep[1])) return false;
			}
			visited.Add(candidate, true);
		}
		foreach (int job in jobs) {
			if (!visited.ContainsKey(job)) return false;
		}
		return order.Count == jobs.Count;
	}
}

```
### Sandbox Code (go)
```go
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

package main

func (s *TestSuite) TestCase1(t *TestCase) {
	jobs := jobs(4)
	deps := []Dep{{1, 2}, {1, 3}, {3, 2}, {4, 2}, {4, 3}}
	order := TopologicalSort(jobs, deps)
	if !isValidTopologicalOrder(order, jobs, deps) {
		t.Fail()
	}
}

func jobs(n int) []int {
	out := []int{}
	for i := 1; i <= n; i++ {
		out = append(out, i)
	}
	return out
}

func isValidTopologicalOrder(order []int, jobs []int, deps []Dep) bool {
	visited := map[int]bool{}
	for _, candidate := range order {
		for _, dep := range deps {
			if _, found := visited[dep.Job]; found && candidate == dep.Prereq {
				return false
			}
		}
		visited[candidate] = true
	}
	for _, job := range jobs {
		if _, found := visited[job]; !found {
			return false
		}
	}
	return len(order) == len(jobs)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type Dep struct {
	Prereq int
	Job    int
}

// O(j + d) time | O(j + d) space
func TopologicalSort(jobs []int, deps []Dep) []int {
	jobGraph := createJobGraph(jobs, deps)
	return getOrderedJobs(jobGraph)
}

func createJobGraph(jobs []int, deps []Dep) *JobGraph {
	graph := NewJobGraph(jobs)
	for _, dep := range deps {
		graph.AddPrereq(dep.Job, dep.Prereq)
	}
	return graph
}

func getOrderedJobs(graph *JobGraph) []int {
	orderedJobs := []int{}
	nodes := graph.Nodes
	for len(nodes) != 0 {
		node := nodes[len(nodes)-1]
		nodes = nodes[:len(nodes)-1]
		containsCycle := depthFirstTraverse(node, &orderedJobs)
		if containsCycle {
			return []int{}
		}
	}
	return orderedJobs
}

func depthFirstTraverse(node *JobNode, orderedJobs *[]int) bool {
	if node.Visited {
		return false
	} else if node.Visiting {
		return true
	}
	node.Visiting = true
	for _, prereqNode := range node.Prereqs {
		containsCycle := depthFirstTraverse(prereqNode, orderedJobs)
		if containsCycle {
			return true
		}
	}
	node.Visited = true
	node.Visiting = false
	*orderedJobs = append(*orderedJobs, node.Job)
	return false
}

type JobGraph struct {
	Nodes []*JobNode
	Graph map[int]*JobNode
}

func NewJobGraph(jobs []int) *JobGraph {
	g := &JobGraph{
		Graph: map[int]*JobNode{},
	}
	for _, job := range jobs {
		g.AddNode(job)
	}
	return g
}

func (g *JobGraph) AddPrereq(job, prereq int) {
	jobNode := g.GetNode(job)
	prereqNode := g.GetNode(prereq)
	jobNode.Prereqs = append(jobNode.Prereqs, prereqNode)
}

func (g *JobGraph) AddNode(job int) {
	g.Graph[job] = &JobNode{Job: job}
	g.Nodes = append(g.Nodes, g.Graph[job])
}

func (g *JobGraph) GetNode(job int) *JobNode {
	if _, found := g.Graph[job]; !found {
		g.AddNode(job)
	}
	return g.Graph[job]
}

type JobNode struct {
	Job      int
	Prereqs  []*JobNode
	Visited  bool
	Visiting bool
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type Dep struct {
	Prereq int
	Job    int
}

// O(j + d) time | O(j + d) space
func TopologicalSort(jobs []int, deps []Dep) []int {
	jobGraph := createJobGraph(jobs, deps)
	return getOrderedJobs(jobGraph)
}

func createJobGraph(jobs []int, deps []Dep) *JobGraph {
	graph := NewJobGraph(jobs)
	for _, dep := range deps {
		graph.AddDep(dep.Prereq, dep.Job)
	}
	return graph
}

func getOrderedJobs(graph *JobGraph) []int {
	orderedJobs := []int{}
	nodesWithNoPrereqs := []*JobNode{}
	for _, node := range graph.Nodes {
		if node.NumOfPrereqs == 0 {
			nodesWithNoPrereqs = append(nodesWithNoPrereqs, node)
		}
	}
	for len(nodesWithNoPrereqs) > 0 {
		node := nodesWithNoPrereqs[len(nodesWithNoPrereqs)-1]
		nodesWithNoPrereqs = nodesWithNoPrereqs[:len(nodesWithNoPrereqs)-1]
		orderedJobs = append(orderedJobs, node.Job)
		removeDeps(node, &nodesWithNoPrereqs)
	}
	for _, node := range graph.Nodes {
		if node.NumOfPrereqs > 0 {
			return []int{}
		}
	}
	return orderedJobs
}

func removeDeps(node *JobNode, nodesWithNoPrereqs *[]*JobNode) {
	for len(node.Deps) > 0 {
		dep := node.Deps[len(node.Deps)-1]
		node.Deps = node.Deps[:len(node.Deps)-1]
		dep.NumOfPrereqs--
		if dep.NumOfPrereqs == 0 {
			*nodesWithNoPrereqs = append(*nodesWithNoPrereqs, dep)
		}
	}
}

type JobGraph struct {
	Nodes []*JobNode
	Graph map[int]*JobNode
}

func NewJobGraph(jobs []int) *JobGraph {
	g := &JobGraph{
		Graph: map[int]*JobNode{},
	}
	for _, job := range jobs {
		g.AddNode(job)
	}
	return g
}

func (g *JobGraph) AddDep(job, dep int) {
	jobNode, depNode := g.GetNode(job), g.GetNode(dep)
	jobNode.Deps = append(jobNode.Deps, depNode)
	depNode.NumOfPrereqs++
}

func (g *JobGraph) AddNode(job int) {
	g.Graph[job] = &JobNode{Job: job}
	g.Nodes = append(g.Nodes, g.Graph[job])
}

func (g *JobGraph) GetNode(job int) *JobNode {
	if _, found := g.Graph[job]; !found {
		g.AddNode(job)
	}
	return g.Graph[job]
}

type JobNode struct {
	Job          int
	Deps         []*JobNode
	NumOfPrereqs int
}

```
### Unit Tests 1 (go)
```go
package main

func (s *TestSuite) TestCase1(t *TestCase) {
	jobs := jobs(4)
	deps := []Dep{{1, 2}, {1, 3}, {3, 2}, {4, 2}, {4, 3}}
	order := TopologicalSort(jobs, deps)
	if !isValidTopologicalOrder(order, jobs, deps) {
		t.Fail()
	}
}

func jobs(n int) []int {
	out := []int{}
	for i := 1; i <= n; i++ {
		out = append(out, i)
	}
	return out
}

func isValidTopologicalOrder(order []int, jobs []int, deps []Dep) bool {
	visited := map[int]bool{}
	for _, candidate := range order {
		for _, dep := range deps {
			if _, found := visited[dep.Job]; found && candidate == dep.Prereq {
				return false
			}
		}
		visited[candidate] = true
	}
	for _, job := range jobs {
		if _, found := visited[job]; !found {
			return false
		}
	}
	return len(order) == len(jobs)
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
    List<Integer> jobs = new ArrayList<Integer>(Arrays.asList(1, 2, 3, 4));
    Integer[][] depsArray = new Integer[][] {{1, 2}, {1, 3}, {3, 2}, {4, 2}, {4, 3}};
    List<Integer[]> deps = new ArrayList<Integer[]>();
    fillDeps(depsArray, deps);
    List<Integer> order = Program.topologicalSort(jobs, deps);
    Utils.assertTrue(isValidTopologicalOrder(order, jobs, deps) == true);
  }

  void fillDeps(Integer[][] depsArray, List<Integer[]> deps) {
    for (Integer[] depArray : depsArray) {
      deps.add(depArray);
    }
  }

  boolean isValidTopologicalOrder(List<Integer> order, List<Integer> jobs, List<Integer[]> deps) {
    Map<Integer, Boolean> visited = new HashMap<Integer, Boolean>();
    for (Integer candidate : order) {
      for (Integer[] dep : deps) {
        if (candidate == dep[0] && visited.containsKey(dep[1])) return false;
      }
      visited.put(candidate, true);
    }
    for (Integer job : jobs) {
      if (!visited.containsKey(job)) return false;
    }
    return order.size() == jobs.size();
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(j + d) time | O(j + d) space
  public static List<Integer> topologicalSort(List<Integer> jobs, List<Integer[]> deps) {
    JobGraph jobGraph = createJobGraph(jobs, deps);
    return getOrderedJobs(jobGraph);
  }

  public static JobGraph createJobGraph(List<Integer> jobs, List<Integer[]> deps) {
    JobGraph graph = new JobGraph(jobs);
    for (Integer[] dep : deps) {
      graph.addPrereq(dep[1], dep[0]);
    }
    return graph;
  }

  public static List<Integer> getOrderedJobs(JobGraph graph) {
    List<Integer> orderedJobs = new ArrayList<Integer>();
    List<JobNode> nodes = new ArrayList<JobNode>(graph.nodes);
    while (nodes.size() > 0) {
      JobNode node = nodes.get(nodes.size() - 1);
      nodes.remove(nodes.size() - 1);
      boolean containsCycle = depthFirstTraverse(node, orderedJobs);
      if (containsCycle) return new ArrayList<Integer>();
    }
    return orderedJobs;
  }

  public static boolean depthFirstTraverse(JobNode node, List<Integer> orderedJobs) {
    if (node.visited) return false;
    if (node.visiting) return true;
    node.visiting = true;
    for (JobNode prereqNode : node.prereqs) {
      boolean containsCycle = depthFirstTraverse(prereqNode, orderedJobs);
      if (containsCycle) return true;
    }
    node.visited = true;
    node.visiting = false;
    orderedJobs.add(node.job);
    return false;
  }

  static class JobGraph {
    public List<JobNode> nodes;
    public Map<Integer, JobNode> graph;

    public JobGraph(List<Integer> jobs) {
      nodes = new ArrayList<JobNode>();
      graph = new HashMap<Integer, JobNode>();
      for (Integer job : jobs) {
        addNode(job);
      }
    }

    public void addPrereq(Integer job, Integer prereq) {
      JobNode jobNode = getNode(job);
      JobNode prereqNode = getNode(prereq);
      jobNode.prereqs.add(prereqNode);
    }

    public void addNode(Integer job) {
      graph.put(job, new JobNode(job));
      nodes.add(graph.get(job));
    }

    public JobNode getNode(Integer job) {
      if (!graph.containsKey(job)) addNode(job);
      return graph.get(job);
    }
  }

  static class JobNode {
    public Integer job;
    public List<JobNode> prereqs;
    public boolean visited;
    public boolean visiting;

    public JobNode(Integer job) {
      this.job = job;
      prereqs = new ArrayList<JobNode>();
      visited = false;
      visiting = false;
    }
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(j + d) time | O(j + d) space
  public static List<Integer> topologicalSort(List<Integer> jobs, List<Integer[]> deps) {
    JobGraph jobGraph = createJobGraph(jobs, deps);
    return getOrderedJobs(jobGraph);
  }

  public static JobGraph createJobGraph(List<Integer> jobs, List<Integer[]> deps) {
    JobGraph graph = new JobGraph(jobs);
    for (Integer[] dep : deps) {
      graph.addDep(dep[0], dep[1]);
    }
    return graph;
  }

  public static List<Integer> getOrderedJobs(JobGraph graph) {
    List<Integer> orderedJobs = new ArrayList<Integer>();
    List<JobNode> nodesWithNoPrereqs = new ArrayList<JobNode>();
    for (JobNode node : graph.nodes) {
      if (node.numOfPrereqs == 0) {
        nodesWithNoPrereqs.add(node);
      }
    }
    while (nodesWithNoPrereqs.size() > 0) {
      JobNode node = nodesWithNoPrereqs.get(nodesWithNoPrereqs.size() - 1);
      nodesWithNoPrereqs.remove(nodesWithNoPrereqs.size() - 1);
      orderedJobs.add(node.job);
      removeDeps(node, nodesWithNoPrereqs);
    }
    boolean graphHasEdges = false;
    for (JobNode node : graph.nodes) {
      if (node.numOfPrereqs > 0) {
        graphHasEdges = true;
      }
    }
    return graphHasEdges ? new ArrayList<Integer>() : orderedJobs;
  }

  public static void removeDeps(JobNode node, List<JobNode> nodesWithNoPrereqs) {
    while (node.deps.size() > 0) {
      JobNode dep = node.deps.get(node.deps.size() - 1);
      node.deps.remove(node.deps.size() - 1);
      dep.numOfPrereqs--;
      if (dep.numOfPrereqs == 0) nodesWithNoPrereqs.add(dep);
    }
  }

  static class JobGraph {
    public List<JobNode> nodes;
    public Map<Integer, JobNode> graph;

    public JobGraph(List<Integer> jobs) {
      nodes = new ArrayList<JobNode>();
      graph = new HashMap<Integer, JobNode>();
      for (Integer job : jobs) {
        addNode(job);
      }
    }

    public void addDep(Integer job, Integer dep) {
      JobNode jobNode = getNode(job);
      JobNode depNode = getNode(dep);
      jobNode.deps.add(depNode);
      depNode.numOfPrereqs++;
    }

    public void addNode(Integer job) {
      graph.put(job, new JobNode(job));
      nodes.add(graph.get(job));
    }

    public JobNode getNode(Integer job) {
      if (!graph.containsKey(job)) addNode(job);
      return graph.get(job);
    }
  }

  static class JobNode {
    public Integer job;
    public List<JobNode> deps;
    public Integer numOfPrereqs;

    public JobNode(Integer job) {
      this.job = job;
      deps = new ArrayList<JobNode>();
      numOfPrereqs = 0;
    }
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    List<Integer> jobs = new ArrayList<Integer>(Arrays.asList(1, 2, 3, 4));
    Integer[][] depsArray = new Integer[][] {{1, 2}, {1, 3}, {3, 2}, {4, 2}, {4, 3}};
    List<Integer[]> deps = new ArrayList<Integer[]>();
    fillDeps(depsArray, deps);
    List<Integer> order = Program.topologicalSort(jobs, deps);
    Utils.assertTrue(isValidTopologicalOrder(order, jobs, deps) == true);
  }

  void fillDeps(Integer[][] depsArray, List<Integer[]> deps) {
    for (Integer[] depArray : depsArray) {
      deps.add(depArray);
    }
  }

  boolean isValidTopologicalOrder(List<Integer> order, List<Integer> jobs, List<Integer[]> deps) {
    Map<Integer, Boolean> visited = new HashMap<Integer, Boolean>();
    for (Integer candidate : order) {
      for (Integer[] dep : deps) {
        if (candidate == dep[0] && visited.containsKey(dep[1])) return false;
      }
      visited.put(candidate, true);
    }
    for (Integer job : jobs) {
      if (!visited.containsKey(job)) return false;
    }
    return order.size() == jobs.size();
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
  const jobs = [1, 2, 3, 4];
  const deps = [
    [1, 2],
    [1, 3],
    [3, 2],
    [4, 2],
    [4, 3],
  ];
  const order = program.topologicalSort(jobs, deps);
  chai.expect(isValidTopologicalOrder(order, jobs, deps)).to.deep.equal(true);
});

function isValidTopologicalOrder(order, jobs, deps) {
  const visited = {};
  for (const candidate of order) {
    for (const [prereq, job] of deps) {
      if (candidate === prereq && job in visited) return false;
    }
    visited[candidate] = true;
  }
  for (const job of jobs) {
    if (!(job in visited)) return false;
  }
  return order.length === jobs.length;
}

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(j + d) time | O(j + d) space
function topologicalSort(jobs, deps) {
  const jobGraph = createJobGraph(jobs, deps);
  return getOrderedJobs(jobGraph);
}

function createJobGraph(jobs, deps) {
  const graph = new JobGraph(jobs);
  for (const [prereq, job] of deps) {
    graph.addPrereq(job, prereq);
  }
  return graph;
}

function getOrderedJobs(graph) {
  const orderedJobs = [];
  const {nodes} = graph;
  while (nodes.length) {
    const node = nodes.pop();
    const containsCycle = depthFirstTraverse(node, orderedJobs);
    if (containsCycle) return [];
  }
  return orderedJobs;
}

function depthFirstTraverse(node, orderedJobs) {
  if (node.visited) return false;
  if (node.visiting) return true;
  node.visiting = true;
  for (const prereqNode of node.prereqs) {
    const containsCycle = depthFirstTraverse(prereqNode, orderedJobs);
    if (containsCycle) return true;
  }
  node.visited = true;
  node.visiting = false;
  orderedJobs.push(node.job);
  return false;
}

class JobGraph {
  constructor(jobs) {
    this.nodes = [];
    this.graph = {};
    for (const job of jobs) {
      this.addNode(job);
    }
  }

  addPrereq(job, prereq) {
    const jobNode = this.getNode(job);
    const prereqNode = this.getNode(prereq);
    jobNode.prereqs.push(prereqNode);
  }

  addNode(job) {
    this.graph[job] = new JobNode(job);
    this.nodes.push(this.graph[job]);
  }

  getNode(job) {
    if (!(job in this.graph)) this.addNode(job);
    return this.graph[job];
  }
}

class JobNode {
  constructor(job) {
    this.job = job;
    this.prereqs = [];
    this.visited = false;
    this.visiting = false;
  }
}

exports.topologicalSort = topologicalSort;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(j + d) time | O(j + d) space
function topologicalSort(jobs, deps) {
  const jobGraph = createJobGraph(jobs, deps);
  return getOrderedJobs(jobGraph);
}

function createJobGraph(jobs, deps) {
  const graph = new JobGraph(jobs);
  for (const [job, dep] of deps) {
    graph.addDep(job, dep);
  }
  return graph;
}

function getOrderedJobs(graph) {
  const orderedJobs = [];
  const nodesWithNoPrereqs = graph.nodes.filter(node => !node.numOfPrereqs);
  while (nodesWithNoPrereqs.length) {
    const node = nodesWithNoPrereqs.pop();
    orderedJobs.push(node.job);
    removeDeps(node, nodesWithNoPrereqs);
  }
  const graphHasEdges = graph.nodes.some(node => node.numOfPrereqs);
  return graphHasEdges ? [] : orderedJobs;
}

function removeDeps(node, nodesWithNoPrereqs) {
  while (node.deps.length) {
    const dep = node.deps.pop();
    dep.numOfPrereqs--;
    if (!dep.numOfPrereqs) nodesWithNoPrereqs.push(dep);
  }
}

class JobGraph {
  constructor(jobs) {
    this.nodes = [];
    this.graph = {};
    for (const job of jobs) {
      this.addNode(job);
    }
  }

  addDep(job, dep) {
    const jobNode = this.getNode(job);
    const depNode = this.getNode(dep);
    jobNode.deps.push(depNode);
    depNode.numOfPrereqs++;
  }

  addNode(job) {
    this.graph[job] = new JobNode(job);
    this.nodes.push(this.graph[job]);
  }

  getNode(job) {
    if (!(job in this.graph)) this.addNode(job);
    return this.graph[job];
  }
}

class JobNode {
  constructor(job) {
    this.job = job;
    this.deps = [];
    this.numOfPrereqs = 0;
  }
}

exports.topologicalSort = topologicalSort;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const jobs = [1, 2, 3, 4];
  const deps = [
    [1, 2],
    [1, 3],
    [3, 2],
    [4, 2],
    [4, 3],
  ];
  const order = program.topologicalSort(jobs, deps);
  chai.expect(isValidTopologicalOrder(order, jobs, deps)).to.deep.equal(true);
});

function isValidTopologicalOrder(order, jobs, deps) {
  const visited = {};
  for (const candidate of order) {
    for (const [prereq, job] of deps) {
      if (candidate === prereq && job in visited) return false;
    }
    visited[candidate] = true;
  }
  for (const job of jobs) {
    if (!(job in visited)) return false;
  }
  return order.length === jobs.length;
}

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.topologicalSort as topologicalSort

class ProgramTest {
    @Test
    fun TestCase1() {
        val jobs = listOf(1, 2, 3, 4)
        val deps = listOf(
            listOf(1, 2),
            listOf(1, 3),
            listOf(3, 2),
            listOf(4, 2),
            listOf(4, 3)
        )
        val order = topologicalSort(jobs, deps)
        assert(isValidTopologicalOrder(order, jobs, deps))
    }

    fun isValidTopologicalOrder(order: List<Int>, jobs: List<Int>, deps: List<List<Int>>): Boolean {
        val visited = mutableMapOf<Int, Boolean>()
        for (candidate in order) {
            for (dep in deps) {
                if (candidate == dep[0] && visited.containsKey(dep[1])) return false
            }
            visited[candidate] = true
        }
        for (job in jobs) {
            if (!visited.containsKey(job)) return false
        }
        return order.size == jobs.size
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(j + d) time | O(j + d) space
fun topologicalSort(jobs: List<Int>, deps: List<List<Int>>): List<Int> {
    val jobGraph = createJobGraph(jobs, deps)
    return getOrderedJobs(jobGraph)
}

fun createJobGraph(jobs: List<Int>, deps: List<List<Int>>): JobGraph {
    val graph = JobGraph(jobs)
    for (dep in deps) {
        graph.addPrereq(dep[1], dep[0])
    }
    return graph
}

fun getOrderedJobs(graph: JobGraph): List<Int> {
    val orderedJobs = mutableListOf<Int>()
    val nodes = graph.nodes
    while (nodes.size > 0) {
        val node = nodes.removeAt(nodes.size - 1)
        val containsCycle = depthFirstTraverse(node, orderedJobs)
        if (containsCycle) return listOf()
    }
    return orderedJobs
}

fun depthFirstTraverse(node: JobNode, orderedJobs: MutableList<Int>): Boolean {
    if (node.visited) return false
    if (node.visiting) return true
    node.visiting = true
    for (prereqNode in node.prereqs) {
        val containsCycle = depthFirstTraverse(prereqNode, orderedJobs)
        if (containsCycle) return true
    }
    node.visited = true
    node.visiting = false
    orderedJobs.add(node.job)
    return false
}

class JobGraph(jobs: List<Int>) {
    val nodes = mutableListOf<JobNode>()
    val graph = mutableMapOf<Int, JobNode>()

    init {
        for (job in jobs) {
            addNode(job)
        }
    }

    fun addPrereq(job: Int, prereq: Int) {
        val jobNode = getNode(job)
        val prereqNode = getNode(prereq)
        jobNode.prereqs.add(prereqNode)
    }

    fun addNode(job: Int) {
        graph[job] = JobNode(job)
        nodes.add(graph[job]!!)
    }

    fun getNode(job: Int): JobNode {
        if (!graph.containsKey(job)) addNode(job)
        return graph[job]!!
    }
}

class JobNode(job: Int) {
    val job = job
    val prereqs = mutableListOf<JobNode>()
    var visited = false
    var visiting = false
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(j + d) time | O(j + d) space
fun topologicalSort(jobs: List<Int>, deps: List<List<Int>>): List<Int> {
    val jobGraph = createJobGraph(jobs, deps)
    return getOrderedJobs(jobGraph)
}

fun createJobGraph(jobs: List<Int>, deps: List<List<Int>>): JobGraph {
    val graph = JobGraph(jobs)
    for (dep in deps) {
        graph.addDep(dep[0], dep[1])
    }
    return graph
}

fun getOrderedJobs(graph: JobGraph): List<Int> {
    val orderedJobs = mutableListOf<Int>()
    val nodesWithNoPrereqs = graph.nodes.filter { node -> node.numOfPrereqs == 0 }.toMutableList()
    while (nodesWithNoPrereqs.size > 0) {
        val node = nodesWithNoPrereqs.removeAt(nodesWithNoPrereqs.size - 1)
        orderedJobs.add(node.job)
        removeDeps(node, nodesWithNoPrereqs)
    }
    for (node in graph.nodes) {
        if (node.numOfPrereqs > 0) return listOf()
    }
    return orderedJobs
}

fun removeDeps(node: JobNode, nodesWithNoPrereqs: MutableList<JobNode>) {
    while (node.deps.size > 0) {
        val dep = node.deps.removeAt(node.deps.size - 1)
        dep.numOfPrereqs--
        if (dep.numOfPrereqs == 0) nodesWithNoPrereqs.add(dep)
    }
}

class JobGraph(jobs: List<Int>) {
    val nodes = mutableListOf<JobNode>()
    val graph = mutableMapOf<Int, JobNode>()

    init {
        for (job in jobs) {
            addNode(job)
        }
    }

    fun addDep(job: Int, dep: Int) {
        val jobNode = getNode(job)
        val depNode = getNode(dep)
        jobNode.deps.add(depNode)
        depNode.numOfPrereqs++
    }

    fun addNode(job: Int) {
        graph[job] = JobNode(job)
        nodes.add(graph[job]!!)
    }

    fun getNode(job: Int): JobNode {
        if (!graph.containsKey(job)) addNode(job)
        return graph[job]!!
    }
}

class JobNode(job: Int) {
    val job = job
    val deps = mutableListOf<JobNode>()
    var numOfPrereqs = 0
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.topologicalSort as topologicalSort

class ProgramTest {
    @Test
    fun TestCase1() {
        val jobs = listOf(1, 2, 3, 4)
        val deps = listOf(
            listOf(1, 2),
            listOf(1, 3),
            listOf(3, 2),
            listOf(4, 2),
            listOf(4, 3)
        )
        val order = topologicalSort(jobs, deps)
        assert(isValidTopologicalOrder(order, jobs, deps))
    }

    fun isValidTopologicalOrder(order: List<Int>, jobs: List<Int>, deps: List<List<Int>>): Boolean {
        val visited = mutableMapOf<Int, Boolean>()
        for (candidate in order) {
            for (dep in deps) {
                if (candidate == dep[0] && visited.containsKey(dep[1])) return false
            }
            visited[candidate] = true
        }
        for (job in jobs) {
            if (!visited.containsKey(job)) return false
        }
        return order.size == jobs.size
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
      var jobs = [1, 2, 3, 4]
      var dependencies = [[1, 2], [1, 3], [3, 2], [4, 2], [4, 3]]
      var order = program.topologicalSort(jobs: jobs, dependencies: dependencies)
      var isValid = isValidTopologicalOrder(order: order, jobs: jobs, dependencies: dependencies)
      try assert(isValid)
    }
  }

  func isValidTopologicalOrder(order: [Int], jobs: [Int], dependencies: [[Int]]) -> Bool {
    var visited = [Int: Bool]()

    for candidate in order {
      for dependency in dependencies {
        let job = dependency[1]
        let prerequisite = dependency[0]

        if candidate == prerequisite, visited.keys.contains(job) {
          return false
        }
      }

      visited[candidate] = true
    }

    for job in jobs {
      if !visited.keys.contains(job) {
        return false
      }
    }

    return order.count == jobs.count
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  class JobNode {
    let job: Int
    var prerequisites: [JobNode]
    var visited: Bool
    var visiting: Bool

    init(job: Int) {
      self.job = job
      prerequisites = [JobNode]()
      visited = false
      visiting = false
    }
  }

  class JobGraph {
    var nodes: [JobNode]
    var graph: [Int: JobNode]

    init(jobs: [Int]) {
      nodes = [JobNode]()
      graph = [Int: JobNode]()
      for job in jobs {
        addNode(job: job)
      }
    }

    func addNode(job: Int) {
      let jobNode = JobNode(job: job)

      nodes.append(jobNode)
      graph[job] = jobNode
    }

    func addPrerequisiteToJob(job: Int, prerequisite: Int) {
      let jobNode = getNode(job: job)
      let prerequisiteNode = getNode(job: prerequisite)
      jobNode.prerequisites.append(prerequisiteNode)
    }

    func getNode(job: Int) -> JobNode {
      if let node = graph[job] {
        return node
      } else {
        graph[job] = JobNode(job: job)
        return graph[job]!
      }
    }
  }

  // O(j + d) time | O(j + d) space
  func topologicalSort(jobs: [Int], dependencies: [[Int]]) -> [Int] {
    let jobGraph = createJobGraph(jobs: jobs, dependencies: dependencies)
    return getOrderedJobs(jobGraph: jobGraph)
  }

  func createJobGraph(jobs: [Int], dependencies: [[Int]]) -> JobGraph {
    let jobGraph = JobGraph(jobs: jobs)

    for dependency in dependencies {
      let job = dependency[1]
      let prerequisite = dependency[0]
      jobGraph.addPrerequisiteToJob(job: job, prerequisite: prerequisite)
    }

    return jobGraph
  }

  func getOrderedJobs(jobGraph: JobGraph) -> [Int] {
    var orderedJobs = [Int]()
    var jobNodes = jobGraph.nodes

    while jobNodes.count > 0 {
      if let jobNode = jobNodes.popLast() {
        let containsCycle = depthFirstTraverse(jobNode: jobNode, orderedJobs: &orderedJobs)
        if containsCycle {
          return []
        }
      }
    }

    return orderedJobs
  }

  func depthFirstTraverse(jobNode: JobNode, orderedJobs: inout [Int]) -> Bool {
    if jobNode.visited {
      return false
    }

    if jobNode.visiting {
      return true
    }

    jobNode.visiting = true

    for prerequisite in jobNode.prerequisites {
      let containsCycle = depthFirstTraverse(jobNode: prerequisite, orderedJobs: &orderedJobs)

      if containsCycle {
        return true
      }
    }

    jobNode.visited = true
    jobNode.visiting = false

    orderedJobs.append(jobNode.job)

    return false
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  class JobNode {
    let job: Int
    var dependencies: [JobNode]
    var numberOfPrerequisites: Int

    init(job: Int) {
      self.job = job
      dependencies = [JobNode]()
      numberOfPrerequisites = 0
    }
  }

  class JobGraph {
    var nodes: [JobNode]
    var graph: [Int: JobNode]

    init(jobs: [Int]) {
      nodes = [JobNode]()
      graph = [Int: JobNode]()
      for job in jobs {
        addNode(job: job)
      }
    }

    func addNode(job: Int) {
      let jobNode = JobNode(job: job)

      nodes.append(jobNode)
      graph[job] = jobNode
    }

    func addDependencyToJob(job: Int, dependency: Int) {
      let jobNode = getNode(job: job)
      let dependencyNode = getNode(job: dependency)
      jobNode.dependencies.append(dependencyNode)
      dependencyNode.numberOfPrerequisites += 1
    }

    func getNode(job: Int) -> JobNode {
      if let node = graph[job] {
        return node
      } else {
        graph[job] = JobNode(job: job)
        return graph[job]!
      }
    }
  }

  // O(j + d) time | O(j + d) space
  func topologicalSort(jobs: [Int], dependencies: [[Int]]) -> [Int] {
    let jobGraph = createJobGraph(jobs: jobs, dependencies: dependencies)
    return getOrderedJobs(jobGraph: jobGraph)
  }

  func createJobGraph(jobs: [Int], dependencies: [[Int]]) -> JobGraph {
    let jobGraph = JobGraph(jobs: jobs)

    for dependency in dependencies {
      let job = dependency[0]
      let dep = dependency[1]
      jobGraph.addDependencyToJob(job: job, dependency: dep)
    }

    return jobGraph
  }

  func getOrderedJobs(jobGraph: JobGraph) -> [Int] {
    var orderedJobs = [Int]()
    var nodesWithNoPrerequisites = jobGraph.nodes.filter { $0.numberOfPrerequisites == 0 }

    while nodesWithNoPrerequisites.count > 0 {
      if let jobNode = nodesWithNoPrerequisites.popLast() {
        orderedJobs.append(jobNode.job)
        removeDependencies(jobNode: jobNode, nodesWithNoPrerequisites: &nodesWithNoPrerequisites)
      }
    }

    let graphHasEdges = jobGraph.nodes.filter { $0.numberOfPrerequisites > 0 }.count > 0

    return graphHasEdges ? [] : orderedJobs
  }

  func removeDependencies(jobNode: JobNode, nodesWithNoPrerequisites: inout [JobNode]) {
    while jobNode.dependencies.count > 0 {
      if let dependency = jobNode.dependencies.popLast() {
        dependency.numberOfPrerequisites -= 1

        if dependency.numberOfPrerequisites == 0 {
          nodesWithNoPrerequisites.append(dependency)
        }
      }
    }
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      var jobs = [1, 2, 3, 4]
      var dependencies = [[1, 2], [1, 3], [3, 2], [4, 2], [4, 3]]
      var order = program.topologicalSort(jobs: jobs, dependencies: dependencies)
      var isValid = isValidTopologicalOrder(order: order, jobs: jobs, dependencies: dependencies)
      try assert(isValid)
    }
  }

  func isValidTopologicalOrder(order: [Int], jobs: [Int], dependencies: [[Int]]) -> Bool {
    var visited = [Int: Bool]()

    for candidate in order {
      for dependency in dependencies {
        let job = dependency[1]
        let prerequisite = dependency[0]

        if candidate == prerequisite, visited.keys.contains(job) {
          return false
        }
      }

      visited[candidate] = true
    }

    for job in jobs {
      if !visited.keys.contains(job) {
        return false
      }
    }

    return order.count == jobs.count
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
        jobs = [1, 2, 3, 4]
        deps = [[1, 2], [1, 3], [3, 2], [4, 2], [4, 3]]
        order = program.topologicalSort(jobs, deps)
        self.assertEqual(isValidTopologicalOrder(order, jobs, deps), True)


def isValidTopologicalOrder(order, jobs, deps):
    visited = {}
    for candidate in order:
        for prereq, job in deps:
            if candidate == prereq and job in visited:
                return False
        visited[candidate] = True
    for job in jobs:
        if job not in visited:
            return False
    return len(order) == len(jobs)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(j + d) time | O(j + d) space
def topologicalSort(jobs, deps):
    jobGraph = createJobGraph(jobs, deps)
    return getOrderedJobs(jobGraph)


def createJobGraph(jobs, deps):
    graph = JobGraph(jobs)
    for prereq, job in deps:
        graph.addPrereq(job, prereq)
    return graph


def getOrderedJobs(graph):
    orderedJobs = []
    nodes = graph.nodes
    while len(nodes):
        node = nodes.pop()
        containsCycle = depthFirstTraverse(node, orderedJobs)
        if containsCycle:
            return []
    return orderedJobs


def depthFirstTraverse(node, orderedJobs):
    if node.visited:
        return False
    if node.visiting:
        return True
    node.visiting = True
    for prereqNode in node.prereqs:
        containsCycle = depthFirstTraverse(prereqNode, orderedJobs)
        if containsCycle:
            return True
    node.visited = True
    node.visiting = False
    orderedJobs.append(node.job)
    return False


class JobGraph:
    def __init__(self, jobs):
        self.nodes = []
        self.graph = {}
        for job in jobs:
            self.addNode(job)

    def addPrereq(self, job, prereq):
        jobNode = self.getNode(job)
        prereqNode = self.getNode(prereq)
        jobNode.prereqs.append(prereqNode)

    def addNode(self, job):
        self.graph[job] = JobNode(job)
        self.nodes.append(self.graph[job])

    def getNode(self, job):
        if job not in self.graph:
            self.addNode(job)
        return self.graph[job]


class JobNode:
    def __init__(self, job):
        self.job = job
        self.prereqs = []
        self.visited = False
        self.visiting = False

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(j + d) time | O(j + d) space
def topologicalSort(jobs, deps):
    jobGraph = createJobGraph(jobs, deps)
    return getOrderedJobs(jobGraph)


def createJobGraph(jobs, deps):
    graph = JobGraph(jobs)
    for job, dep in deps:
        graph.addDep(job, dep)
    return graph


def getOrderedJobs(graph):
    orderedJobs = []
    nodesWithNoPrereqs = list(filter(lambda node: node.numOfPrereqs == 0, graph.nodes))
    while len(nodesWithNoPrereqs):
        node = nodesWithNoPrereqs.pop()
        orderedJobs.append(node.job)
        removeDeps(node, nodesWithNoPrereqs)
    graphHasEdges = any(node.numOfPrereqs for node in graph.nodes)
    return [] if graphHasEdges else orderedJobs


def removeDeps(node, nodesWithNoPrereqs):
    while len(node.deps):
        dep = node.deps.pop()
        dep.numOfPrereqs -= 1
        if dep.numOfPrereqs == 0:
            nodesWithNoPrereqs.append(dep)


class JobGraph:
    def __init__(self, jobs):
        self.nodes = []
        self.graph = {}
        for job in jobs:
            self.addNode(job)

    def addDep(self, job, dep):
        jobNode = self.getNode(job)
        depNode = self.getNode(dep)
        jobNode.deps.append(depNode)
        depNode.numOfPrereqs += 1

    def addNode(self, job):
        self.graph[job] = JobNode(job)
        self.nodes.append(self.graph[job])

    def getNode(self, job):
        if job not in self.graph:
            self.addNode(job)
        return self.graph[job]


class JobNode:
    def __init__(self, job):
        self.job = job
        self.deps = []
        self.numOfPrereqs = 0

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        jobs = [1, 2, 3, 4]
        deps = [[1, 2], [1, 3], [3, 2], [4, 2], [4, 3]]
        order = program.topologicalSort(jobs, deps)
        self.assertEqual(isValidTopologicalOrder(order, jobs, deps), True)


def isValidTopologicalOrder(order, jobs, deps):
    visited = {}
    for candidate in order:
        for prereq, job in deps:
            if candidate == prereq and job in visited:
                return False
        visited[candidate] = True
    for job in jobs:
        if job not in visited:
            return False
    return len(order) == len(jobs)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

type Dependency = [number, number];

it('Test Case #1', function () {
  const jobs = [1, 2, 3, 4];
  const deps: Dependency[] = [
    [1, 2],
    [1, 3],
    [3, 2],
    [4, 2],
    [4, 3],
  ];
  const order = program.topologicalSort(jobs, deps);
  chai.expect(isValidTopologicalOrder(order, jobs, deps)).to.deep.equal(true);
});

function isValidTopologicalOrder(order: number[], jobs: number[], deps: Dependency[]) {
  const visited: {[key: string]: boolean} = {};
  for (const candidate of order) {
    for (const [prereq, job] of deps) {
      if (candidate === prereq && job in visited) return false;
    }
    visited[candidate] = true;
  }
  for (const job of jobs) {
    if (!(job in visited)) return false;
  }
  return order.length === jobs.length;
}

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

type Dependency = [number, number];

// O(j + d) time | O(j + d) space
export function topologicalSort(jobs: number[], deps: Dependency[]) {
  const jobGraph = createJobGraph(jobs, deps);
  return getOrderedJobs(jobGraph);
}

function createJobGraph(jobs: number[], deps: Dependency[]) {
  const graph = new JobGraph(jobs);
  for (const [prereq, job] of deps) {
    graph.addPrereq(job, prereq);
  }
  return graph;
}

function getOrderedJobs(graph: JobGraph) {
  const orderedJobs: number[] = [];
  const {nodes} = graph;
  while (nodes.length) {
    const node = nodes.pop()!;
    const containsCycle = depthFirstTraverse(node, orderedJobs);
    if (containsCycle) return [];
  }
  return orderedJobs;
}

function depthFirstTraverse(node: JobNode, orderedJobs: number[]) {
  if (node.visited) return false;
  if (node.visiting) return true;
  node.visiting = true;
  for (const prereqNode of node.prereqs) {
    const containsCycle = depthFirstTraverse(prereqNode, orderedJobs);
    if (containsCycle) return true;
  }
  node.visited = true;
  node.visiting = false;
  orderedJobs.push(node.job);
  return false;
}

class JobGraph {
  nodes: JobNode[];
  graph: {[key: number]: JobNode};

  constructor(jobs: number[]) {
    this.nodes = [];
    this.graph = {};
    for (const job of jobs) {
      this.addNode(job);
    }
  }

  addPrereq(job: number, prereq: number) {
    const jobNode = this.getNode(job);
    const prereqNode = this.getNode(prereq);
    jobNode.prereqs.push(prereqNode);
  }

  addNode(job: number) {
    this.graph[job] = new JobNode(job);
    this.nodes.push(this.graph[job]);
  }

  getNode(job: number) {
    if (!(job in this.graph)) this.addNode(job);
    return this.graph[job];
  }
}

class JobNode {
  job: number;
  prereqs: JobNode[];
  visited: boolean;
  visiting: boolean;

  constructor(job: number) {
    this.job = job;
    this.prereqs = [];
    this.visited = false;
    this.visiting = false;
  }
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

type Dependency = [number, number];

// O(j + d) time | O(j + d) space
export function topologicalSort(jobs: number[], deps: Dependency[]) {
  const jobGraph = createJobGraph(jobs, deps);
  return getOrderedJobs(jobGraph);
}

function createJobGraph(jobs: number[], deps: Dependency[]) {
  const graph = new JobGraph(jobs);
  for (const [job, dep] of deps) {
    graph.addDep(job, dep);
  }
  return graph;
}

function getOrderedJobs(graph: JobGraph) {
  const orderedJobs: number[] = [];
  const nodesWithNoPrereqs = graph.nodes.filter(node => !node.numOfPrereqs);
  while (nodesWithNoPrereqs.length) {
    const node = nodesWithNoPrereqs.pop()!;
    orderedJobs.push(node.job);
    removeDeps(node, nodesWithNoPrereqs);
  }
  const graphHasEdges = graph.nodes.some(node => node.numOfPrereqs);
  return graphHasEdges ? [] : orderedJobs;
}

function removeDeps(node: JobNode, nodesWithNoPrereqs: JobNode[]) {
  while (node.deps.length) {
    const dep = node.deps.pop()!;
    dep.numOfPrereqs--;
    if (!dep.numOfPrereqs) nodesWithNoPrereqs.push(dep);
  }
}

class JobGraph {
  nodes: JobNode[];
  graph: {[key: number]: JobNode};

  constructor(jobs: number[]) {
    this.nodes = [];
    this.graph = {};
    for (const job of jobs) {
      this.addNode(job);
    }
  }

  addDep(job: number, dep: number) {
    const jobNode = this.getNode(job);
    const depNode = this.getNode(dep);
    jobNode.deps.push(depNode);
    depNode.numOfPrereqs++;
  }

  addNode(job: number) {
    this.graph[job] = new JobNode(job);
    this.nodes.push(this.graph[job]);
  }

  getNode(job: number) {
    if (!(job in this.graph)) this.addNode(job);
    return this.graph[job];
  }
}

class JobNode {
  job: number;
  deps: JobNode[];
  numOfPrereqs: number;

  constructor(job: number) {
    this.job = job;
    this.deps = [];
    this.numOfPrereqs = 0;
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

type Dependency = [number, number];

it('Test Case #1', function () {
  const jobs = [1, 2, 3, 4];
  const deps: Dependency[] = [
    [1, 2],
    [1, 3],
    [3, 2],
    [4, 2],
    [4, 3],
  ];
  const order = program.topologicalSort(jobs, deps);
  chai.expect(isValidTopologicalOrder(order, jobs, deps)).to.deep.equal(true);
});

function isValidTopologicalOrder(order: number[], jobs: number[], deps: Dependency[]) {
  const visited: {[key: string]: boolean} = {};
  for (const candidate of order) {
    for (const [prereq, job] of deps) {
      if (candidate === prereq && job in visited) return false;
    }
    visited[candidate] = true;
  }
  for (const job of jobs) {
    if (!(job in visited)) return false;
  }
  return order.length === jobs.length;
}

```

