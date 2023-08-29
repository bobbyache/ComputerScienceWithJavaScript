# Dijkstra's Algorithm
<div class="html">
<p>
  You're given an integer <span>start</span> and a list <span>edges</span> of
  pairs of integers.
</p>
<p>
  The list is what's called an adjacency list, and it represents a graph. The
  number of vertices in the graph is equal to the length of <span>edges</span>,
  where each index <span>i</span> in <span>edges</span> contains vertex
  <span>i</span>'s outbound edges, in no particular order. Each individual edge
  is represented by an pair of two numbers,
  <span>[destination, distance]</span>, where the destination is a positive
  integer denoting the destination vertex and the distance is a positive integer
  representing the length of the edge (the distance from vertex
  <span>i</span> to vertex <span>destination</span>). Note that these edges are
  directed, meaning that you can only travel from a particular vertex to its
  destination—not the other way around (unless the destination vertex itself has
  an outbound edge to the original vertex).
</p>
<p>
  Write a function that computes the lengths of the shortest paths between
  <span>start</span> and all of the other vertices in the graph using Dijkstra's
  algorithm and returns them in an array. Each index <span>i</span> in the
  output array should represent the length of the shortest path between
  <span>start</span> and vertex <span>i</span>. If no path is found from
  <span>start</span> to vertex <span>i</span>, then
  <span>output[i]</span> should be <span>-1</span>.
</p>
<p>
  Note that the graph represented by <span>edges</span> won't contain any
  self-loops (vertices that have an outbound edge to themselves) and will only
  have positively weighted edges (i.e., no negative distances).
</p>
<p>
  If you're unfamiliar with Dijkstra's algorithm, we recommend watching the
  Conceptual Overview section of this question's video explanation before
  starting to code.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">start</span> = 0
<span class="CodeEditor-promptParameter">edges</span> = [
  [[1, 7]],
  [[2, 6], [3, 20], [4, 3]],
  [[3, 14]],
  [[4, 2]],
  [],
  [],
]
</pre>
<h3>Sample Output</h3>
<pre>
[0, 7, 13, 27, 10, -1]
</pre>
</div>

Hint 1
<p>
Dijkstra's algorithm works by visiting vertices in the graph, one by one, all the while keeping track of the current shortest distances from the start vertex to all other vertices and continuously updating these shortest distances. More specifically, the algorithm keeps track of unvisited vertices and visits the unvisited vertex with the shortest distance at any point in time, naturally starting with the start vertex. Whenever the algorithm visits an unvisited vertex, it looks at all of its outbound edges and tries to update the shortest distances from the start to the destinations in the edges, using the current shortest distance to the current vertex as a base. Once the algorithm has visited all of the vertices and considered all of their edges, it is guaranteed to have found the shortest path to each vertex. How can you implement this algorithm?
</p>


Hint 2

<p>
The most challenging part of Dijkstra's algorithm is determining how to efficiently find the vertex with the current shortest distance. Can you think of a data structure that could be used to keep track of the distances and to efficiently retrieve the vertex with the current shortest distance at each step?
</p>


Hint 3

<p>
Create an array that can store the final shortest distances between the start vertex and all other vertices, as well as a min-heap that will hold all of the unvisited vertices and their current shortest distances. For both the final distances array and the min-heap, initialize all vertices except for the start node as having a distance of infinity; the start node will have a distance 0. Next, write a while loop that will run until the min-heap is empty. At every iteration in the loop, remove the vertex from the top of the heap (the vertex with the shortest distance), loop through all of its edges, and for each edge, update the shortest distance of the destination vertex to be the minimum of the destination's current shortest distance and the currently visited vertex's distance plus the current edge's weight. Once the heap is empty, all of the vertices will have been visited, and you'll have the shortest distances to all vertices stored in your distances array.
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
      auto start = 0;
      vector<vector<vector<int>>> edges = {
          {{1, 7}}, {{2, 6}, {3, 20}, {4, 3}}, {{3, 14}}, {{4, 2}}, {}, {}};
      vector<int> expected = {0, 7, 13, 27, 10, -1};
      auto actual = dijkstrasAlgorithm(start, edges);
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
#include <set>
using namespace std;

tuple<int, int> getVertexWithMinDistances(vector<int> minDistances,
                                          set<int> distances);

// O(v^2 + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the input graph
vector<int> dijkstrasAlgorithm(int start, vector<vector<vector<int>>> edges) {
  int numberOfVertices = edges.size();

  vector<int> minDistances(edges.size(), numeric_limits<int>::max());
  minDistances[start] = 0;

  set<int> visited;

  while (visited.size() != numberOfVertices) {
    auto [vertex, currentMinDistance] =
        getVertexWithMinDistances(minDistances, visited);
    if (currentMinDistance == numeric_limits<int>::max()) {
      break;
    }

    visited.insert(vertex);

    for (auto edge : edges[vertex]) {
      auto destination = edge[0];
      auto distanceToDestination = edge[1];

      if (visited.find(destination) != visited.end()) {
        continue;
      }

      auto newPathDistance = currentMinDistance + distanceToDestination;
      auto currentDestinationDistance = minDistances[destination];
      if (newPathDistance < currentDestinationDistance) {
        minDistances[destination] = newPathDistance;
      }
    }
  }

  vector<int> finalDistances;
  for (auto distance : minDistances) {
    if (distance == numeric_limits<int>::max()) {
      finalDistances.push_back(-1);
    } else {
      finalDistances.push_back(distance);
    }
  }
  return finalDistances;
}

tuple<int, int> getVertexWithMinDistances(vector<int> distances,
                                          set<int> visited) {
  int currentMinDistance = numeric_limits<int>::max();
  int vertex = -1;

  for (int vertexIdx = 0; vertexIdx < distances.size(); vertexIdx++) {
    int distance = distances[vertexIdx];

    if (visited.find(vertexIdx) != visited.end()) {
      continue;
    }

    if (distance <= currentMinDistance) {
      vertex = vertexIdx;
      currentMinDistance = distance;
    }
  }

  return {vertex, currentMinDistance};
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <limits>
using namespace std;

struct Item {
  int vertex, distance;
};

class MinHeap {
public:
  vector<Item> heap;
  unordered_map<int, int> vertexMap;

  MinHeap(vector<Item> array) {
    for (auto item : array) {
      vertexMap[item.vertex] = item.vertex;
    }
    heap = buildHeap(array);
  }

  // O(n) time | O(1) space
  vector<Item> buildHeap(vector<Item> &array) {
    int firstParentIdx = (array.size() - 2) / 2;
    for (int currentIdx = firstParentIdx + 1; currentIdx >= 0; currentIdx--) {
      siftDown(currentIdx, array.size() - 1, array);
    }
    return array;
  }

  bool isEmpty() { return heap.size() == 0; }

  // O(log(n)) time | O(1) space
  void siftDown(int currentIdx, int endIdx, vector<Item> &heap) {
    int childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      int childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      int idxToSwap;
      if (childTwoIdx != -1 &&
          heap[childTwoIdx].distance < heap[childOneIdx].distance) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }
      if (heap[idxToSwap].distance < heap[currentIdx].distance) {
        swap(currentIdx, idxToSwap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  // O(log(n)) time | O(1) space
  void siftUp(int currentIdx) {
    int parentIdx = (currentIdx - 1) / 2;
    while (currentIdx > 0 &&
           heap[currentIdx].distance < heap[parentIdx].distance) {
      swap(currentIdx, parentIdx);
      currentIdx = parentIdx;
      parentIdx = (currentIdx - 1) / 2;
    }
  }

  Item remove() {
    swap(0, heap.size() - 1);
    auto [vertex, distance] = heap.back();
    heap.pop_back();
    vertexMap.erase(vertex);
    siftDown(0, heap.size() - 1, heap);
    return Item{vertex, distance};
  }

  void update(int vertex, int value) {
    heap[vertexMap[vertex]] = Item{vertex, value};
    siftUp(vertexMap[vertex]);
  }

  void swap(int i, int j) {
    vertexMap[heap[i].vertex] = j;
    vertexMap[heap[j].vertex] = i;
    auto temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
  }
};

// O((v + e) * log(v)) time | O(v) space - where v is the number
// of vertices and e is the number of edges in the input graph
vector<int> dijkstrasAlgorithm(int start, vector<vector<vector<int>>> edges) {
  int numberOfVertices = edges.size();

  vector<int> minDistances(edges.size(), numeric_limits<int>::max());
  minDistances[start] = 0;

  vector<Item> minDistancesPairs;
  for (int i = 0; i < edges.size(); i++) {
    minDistancesPairs.push_back(Item{i, numeric_limits<int>::max()});
  }

  MinHeap minDistancesHeap(minDistancesPairs);
  minDistancesHeap.update(start, 0);

  while (!minDistancesHeap.isEmpty()) {
    auto [vertex, currentMinDistance] = minDistancesHeap.remove();

    if (currentMinDistance == numeric_limits<int>::max()) {
      break;
    }

    for (auto edge : edges[vertex]) {
      auto destination = edge[0];
      auto distanceToDestination = edge[1];
      auto newPathDistance = currentMinDistance + distanceToDestination;
      auto currentDestinationDistance = minDistances[destination];
      if (newPathDistance < currentDestinationDistance) {
        minDistances[destination] = newPathDistance;
        minDistancesHeap.update(destination, newPathDistance);
      }
    }
  }

  vector<int> finalDistances;
  for (auto distance : minDistances) {
    if (distance == numeric_limits<int>::max()) {
      finalDistances.push_back(-1);
    } else {
      finalDistances.push_back(distance);
    }
  }
  return finalDistances;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      auto start = 0;
      vector<vector<vector<int>>> edges = {
          {{1, 7}}, {{2, 6}, {3, 20}, {4, 3}}, {{3, 14}}, {{4, 2}}, {}, {}};
      vector<int> expected = {0, 7, 13, 27, 10, -1};
      auto actual = dijkstrasAlgorithm(start, edges);
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
		int start = 0;
		int[][][] edges = {
			new int[][] {new int[] {1, 7}},
			new int[][] {new int[] {2, 6}, new int[] {3, 20}, new int[] {4, 3}},
			new int[][] {new int[] {3, 14}},
			new int[][] {new int[] {4, 2}},
			new int[][] {},
			new int[][] {}
		};
		int[] expected = {0, 7, 13, 27, 10, -1};
		int[] actual = new Program().DijkstrasAlgorithm(start, edges);
		Utils.AssertTrue(expected.Length == actual.Length);
		for (int i=0; i<expected.Length; i++) {
			Utils.AssertTrue(expected[i] == actual[i]);
		}
	}
}


```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;


public class Program {
	// O(v^2 + e) time | O(v) space - where v is the number of
	// vertices and e is the number of edges in the input graph
	public int[] DijkstrasAlgorithm(int start, int[][][] edges) {
		int numberOfVertices = edges.Length;

		int[] minDistances = new int[edges.Length];
		Array.Fill(minDistances, Int32.MaxValue);
		minDistances[start] = 0;

		HashSet<int> visited = new HashSet<int>();

		while (visited.Count != numberOfVertices) {
			int[] getVertexData = getVertexWithMinDistances(minDistances, visited);
			int vertex = getVertexData[0];
			int currentMinDistance = getVertexData[1];

			if (currentMinDistance == Int32.MaxValue) {
				break;
			}

			visited.Add(vertex);

			foreach (var edge in edges[vertex]) {
				int destination = edge[0];
				int distanceToDestination = edge[1];

				if (visited.Contains(destination)) {
					continue;
				}

				int newPathDistance = currentMinDistance + distanceToDestination;
				int currentDestinationDistance = minDistances[destination];
				if (newPathDistance < currentDestinationDistance) {
					minDistances[destination] = newPathDistance;
				}
			}
		}

		int[] finalDistances = new int[minDistances.Length];
		for (int i=0; i<minDistances.Length; i++) {
			int distance = minDistances[i];
			if (distance == Int32.MaxValue) {
				finalDistances[i] = -1;
			} else {
				finalDistances[i] = distance;
			}
		}

		return finalDistances;
	}

	public int[] getVertexWithMinDistances(int[] distances, HashSet<int> visited) {
		int currentMinDistance = Int32.MaxValue;
		int vertex = -1;

		for (int vertexIdx = 0; vertexIdx < distances.Length; vertexIdx++) {
			int distance = distances[vertexIdx];

			if (visited.Contains(vertexIdx)) {
				continue;
			}

			if (distance <= currentMinDistance) {
				vertex = vertexIdx;
				currentMinDistance = distance;
			}
		}

		return new int[] { vertex, currentMinDistance };
	}
}


```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {
	// O((v + e) * log(v)) time | O(v) space - where v is the number
	// of vertices and e is the number of edges in the input graph
	public int[] DijkstrasAlgorithm(int start, int[][][] edges) {
		int numberOfVertices = edges.Length;

		int[] minDistances = new int[numberOfVertices];
		Array.Fill(minDistances, Int32.MaxValue);
		minDistances[start] = 0;

		List<Item> minDistancesPairs = new List<Item>();
		for (int i = 0; i < numberOfVertices; i++) {
			Item item = new Item(i, Int32.MaxValue);
			minDistancesPairs.Add(item);
		}

		MinHeap minDistancesHeap = new MinHeap(minDistancesPairs);
		minDistancesHeap.Update(start, 0);

		while (!minDistancesHeap.isEmpty()) {
			Item heapItem = minDistancesHeap.Remove();
			int vertex = heapItem.vertex;
			int currentMinDistance = heapItem.distance;

			if (currentMinDistance == Int32.MaxValue) {
				break;
			}

			foreach (var edge in edges[vertex]) {
				int destination = edge[0];
				int distanceToDestination = edge[1];
				int newPathDistance = currentMinDistance + distanceToDestination;
				int currentDestinationDistance = minDistances[destination];
				if (newPathDistance < currentDestinationDistance) {
					minDistances[destination] = newPathDistance;
					minDistancesHeap.Update(destination, newPathDistance);
				}
			}
		}

		int[] finalDistances = new int[minDistances.Length];
		for (int i=0; i<minDistances.Length; i++) {
			int distance = minDistances[i];
			if (distance == Int32.MaxValue) {
				finalDistances[i] = -1;
			} else {
				finalDistances[i] = distance;
			}
		}

		return finalDistances;
	}

	public class Item {
		public int vertex;
		public int distance;

		public Item(int vertex, int distance) {
			this.vertex = vertex;
			this.distance = distance;
		}
	};

	public class MinHeap {
		Dictionary<int, int> vertexDictionary = new Dictionary<int,int>();
		List<Item> heap = new List<Item>();

		public MinHeap(List<Item> array) {
			for (int i=0; i<array.Count; i++) {
				Item item = array[i];
				vertexDictionary[item.vertex] = item.vertex;
			}
			heap = buildHeap(array);
		}

		List<Item> buildHeap(List<Item> array) {
			int firstParentIdx = (array.Count - 2) / 2;
			for (int currentIdx = firstParentIdx + 1; currentIdx >= 0; currentIdx--) {
				siftDown(currentIdx, array.Count - 1, array);
			}
			return array;
		}

		public bool isEmpty() {
			return heap.Count == 0;
		}

		void siftDown(int currentIdx, int endIdx, List<Item> heap) {
			int childOneIdx = currentIdx * 2 + 1;
			while (childOneIdx <= endIdx) {
				int childTwoIdx = currentIdx * 2 + 2 <=
				  endIdx ? currentIdx * 2 + 2 : -1;
				int idxToSwap;
				if (childTwoIdx != -1 &&
				  heap[childTwoIdx].distance < heap[childOneIdx].distance) {
					idxToSwap = childTwoIdx;
				} else {
					idxToSwap = childOneIdx;
				}
				if (heap[idxToSwap].distance < heap[currentIdx].distance) {
					swap(currentIdx, idxToSwap);
					currentIdx = idxToSwap;
					childOneIdx = currentIdx * 2 + 1;
				} else {
					return;
				}
			}
		}

		void siftUp(int currentIdx) {
			int parentIdx = (currentIdx - 1) / 2;
			while (currentIdx > 0 &&
			  heap[currentIdx].distance < heap[parentIdx].distance) {
				swap(currentIdx, parentIdx);
				currentIdx = parentIdx;
				parentIdx = (currentIdx - 1) / 2;
			}
		}

		public Item Remove() {
			swap(0, heap.Count - 1);
			Item lastItem = heap[heap.Count-1];
			int vertex = lastItem.vertex;
			int distance = lastItem.distance;
			heap.RemoveAt(heap.Count-1);
			vertexDictionary.Remove(vertex);
			siftDown(0, heap.Count - 1, heap);
			return new Item(vertex, distance);
		}

		public void Update(int vertex, int value) {
			heap[vertexDictionary[vertex]] = new Item(vertex, value);
			siftUp(vertexDictionary[vertex]);
		}

		void swap(int i, int j) {
			vertexDictionary[heap[i].vertex] = j;
			vertexDictionary[heap[j].vertex] = i;
			Item temp = heap[i];
			heap[i] = heap[j];
			heap[j] = temp;
		}
	}
}


```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		int start = 0;
		int[][][] edges = {
			new int[][] {new int[] {1, 7}},
			new int[][] {new int[] {2, 6}, new int[] {3, 20}, new int[] {4, 3}},
			new int[][] {new int[] {3, 14}},
			new int[][] {new int[] {4, 2}},
			new int[][] {},
			new int[][] {}
		};
		int[] expected = {0, 7, 13, 27, 10, -1};
		int[] actual = new Program().DijkstrasAlgorithm(start, edges);
		Utils.AssertTrue(expected.Length == actual.Length);
		for (int i=0; i<expected.Length; i++) {
			Utils.AssertTrue(expected[i] == actual[i]);
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
	start := 0
	edges := [][][]int{
		{{1, 7}},
		{{2, 6}, {3, 20}, {4, 3}},
		{{3, 14}},
		{{4, 2}},
		{},
		{},
	}
	expected := []int{0, 7, 13, 27, 10, -1}
	actual := DijkstrasAlgorithm(start, edges)
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

// O(v^2 + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the input graph
func DijkstrasAlgorithm(start int, edges [][][]int) []int {
	numberOfVertices := len(edges)

	minDistances := make([]int, 0, len(edges))
	for range edges {
		minDistances = append(minDistances, math.MaxInt32)
	}
	minDistances[start] = 0

	visited := map[int]bool{}

	for len(visited) != numberOfVertices {
		vertex, currentMinDistance := getVertexWithMinDistance(minDistances, visited)
		if currentMinDistance == math.MaxInt32 {
			break
		}

		visited[vertex] = true

		for _, edge := range edges[vertex] {
			destination, distanceToDestination := edge[0], edge[1]

			if visited[destination] {
				continue
			}

			newPathDistance := currentMinDistance + distanceToDestination
			currentDestinationDistance := minDistances[destination]
			if newPathDistance < currentDestinationDistance {
				minDistances[destination] = newPathDistance
			}
		}
	}

	finalDistances := make([]int, 0, len(minDistances))
	for _, distance := range minDistances {
		if distance == math.MaxInt32 {
			finalDistances = append(finalDistances, -1)
		} else {
			finalDistances = append(finalDistances, distance)
		}
	}
	return finalDistances
}

func getVertexWithMinDistance(distances []int, visited map[int]bool) (int, int) {
	currentMinDistance := math.MaxInt32
	vertex := -1

	for vertexIdx, distance := range distances {
		if visited[vertexIdx] {
			continue
		}

		if distance <= currentMinDistance {
			vertex = vertexIdx
			currentMinDistance = distance
		}
	}

	return vertex, currentMinDistance
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"math"
)

// O((v + e) * log(v)) time | O(v) space - where v is the number
// of vertices and e is the number of edges in the input graph
func DijkstrasAlgorithm(start int, edges [][][]int) []int {
	numberOfVertices := len(edges)

	minDistances := make([]int, 0, numberOfVertices)
	for range edges {
		minDistances = append(minDistances, math.MaxInt32)
	}
	minDistances[start] = 0

	minDistancesPairs := make([]Item, 0, len(edges))
	for i := range edges {
		minDistancesPairs = append(minDistancesPairs, Item{i, math.MaxInt32})
	}
	minDistancesHeap := NewMinHeap(minDistancesPairs)
	minDistancesHeap.Update(start, 0)

	for !minDistancesHeap.IsEmpty() {
		vertex, currentMinDistance := minDistancesHeap.Remove()
		if currentMinDistance == math.MaxInt32 {
			break
		}

		for _, edge := range edges[vertex] {
			destination, distanceToDestination := edge[0], edge[1]

			newPathDistance := currentMinDistance + distanceToDestination
			currentDestinationDistance := minDistances[destination]
			if newPathDistance < currentDestinationDistance {
				minDistances[destination] = newPathDistance
				minDistancesHeap.Update(destination, newPathDistance)
			}
		}
	}

	finalDistances := make([]int, 0, len(minDistances))
	for _, distance := range minDistances {
		if distance == math.MaxInt32 {
			finalDistances = append(finalDistances, -1)
		} else {
			finalDistances = append(finalDistances, distance)
		}
	}
	return finalDistances
}

type Item struct {
	Vertex   int
	Distance int
}

type MinHeap struct {
	array     []Item
	vertexMap map[int]int
}

func NewMinHeap(array []Item) *MinHeap {
	vertexMap := map[int]int{}
	for _, item := range array {
		vertexMap[item.Vertex] = item.Vertex
	}
	heap := &MinHeap{array: array, vertexMap: vertexMap}
	heap.buildHeap()
	return heap
}

func (h *MinHeap) IsEmpty() bool { return h.length() == 0 }

// O(log(n)) time | O(1) space
func (h *MinHeap) Remove() (int, int) {
	l := h.length()
	h.swap(0, l-1)
	peeked := h.array[l-1]
	h.array = h.array[0 : l-1]
	delete(h.vertexMap, peeked.Vertex)
	h.siftDown(0, l-2)
	return peeked.Vertex, peeked.Distance
}

// O(log(n)) time | O(1) space
func (h *MinHeap) Update(vertex int, value int) {
	h.array[h.vertexMap[vertex]] = Item{vertex, value}
	h.siftUp(h.vertexMap[vertex])
}

func (h MinHeap) swap(i, j int) {
	h.vertexMap[h.array[i].Vertex] = j
	h.vertexMap[h.array[j].Vertex] = i
	h.array[i], h.array[j] = h.array[j], h.array[i]
}

func (h MinHeap) length() int { return len(h.array) }

// O(n) time | O(1) space
func (h *MinHeap) buildHeap() {
	first := (len(h.array) - 2) / 2
	for currentIdx := first + 1; currentIdx >= 0; currentIdx-- {
		h.siftDown(currentIdx, len(h.array)-1)
	}
}

// O(log(n)) time | O(1) space
func (h *MinHeap) siftDown(currentIdx, endIdx int) {
	childOneIdx := currentIdx*2 + 1
	for childOneIdx <= endIdx {
		childTwoIdx := -1
		if currentIdx*2+2 <= endIdx {
			childTwoIdx = currentIdx*2 + 2
		}
		indexToSwap := childOneIdx
		if childTwoIdx > -1 && h.array[childTwoIdx].Distance < h.array[childOneIdx].Distance {
			indexToSwap = childTwoIdx
		}

		if h.array[indexToSwap].Distance < h.array[currentIdx].Distance {
			h.swap(currentIdx, indexToSwap)
			currentIdx = indexToSwap
			childOneIdx = currentIdx*2 + 1
		} else {
			return
		}
	}
}

// O(log(n)) time | O(1) space
func (h *MinHeap) siftUp(currentIdx int) {
	parentIdx := (currentIdx - 1) / 2
	for currentIdx > 0 && h.array[currentIdx].Distance < h.array[parentIdx].Distance {
		h.swap(currentIdx, parentIdx)
		currentIdx = parentIdx
		parentIdx = (currentIdx - 1) / 2
	}
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	start := 0
	edges := [][][]int{
		{{1, 7}},
		{{2, 6}, {3, 20}, {4, 3}},
		{{3, 14}},
		{{4, 2}},
		{},
		{},
	}
	expected := []int{0, 7, 13, 27, 10, -1}
	actual := DijkstrasAlgorithm(start, edges)
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
    int start = 0;
    int[][][] edges = {
      {{1, 7}},
      {{2, 6}, {3, 20}, {4, 3}},
      {{3, 14}},
      {{4, 2}},
      {},
      {}
    };
    int[] expected = {0, 7, 13, 27, 10, -1};
    int[] actual = new Program().dijkstrasAlgorithm(start, edges);
    Utils.assertTrue(expected.length == actual.length);
    for (int i = 0; i < expected.length; i++) {
      Utils.assertTrue(expected[i] == actual[i]);
    }
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(v^2 + e) time | O(v) space - where v is the number of
  // vertices and e is the number of edges in the input graph
  public int[] dijkstrasAlgorithm(int start, int[][][] edges) {
    int numberOfVertices = edges.length;

    int[] minDistances = new int[edges.length];
    Arrays.fill(minDistances, Integer.MAX_VALUE);
    minDistances[start] = 0;

    Set<Integer> visited = new HashSet<Integer>();

    while (visited.size() != numberOfVertices) {
      int[] getVertexData = getVertexWithMinDistances(minDistances, visited);
      int vertex = getVertexData[0];
      int currentMinDistance = getVertexData[1];

      if (currentMinDistance == Integer.MAX_VALUE) {
        break;
      }

      visited.add(vertex);

      for (int[] edge : edges[vertex]) {
        int destination = edge[0];
        int distanceToDestination = edge[1];

        if (visited.contains(destination)) {
          continue;
        }

        int newPathDistance = currentMinDistance + distanceToDestination;
        int currentDestinationDistance = minDistances[destination];
        if (newPathDistance < currentDestinationDistance) {
          minDistances[destination] = newPathDistance;
        }
      }
    }

    int[] finalDistances = new int[minDistances.length];
    for (int i = 0; i < minDistances.length; i++) {
      int distance = minDistances[i];
      if (distance == Integer.MAX_VALUE) {
        finalDistances[i] = -1;
      } else {
        finalDistances[i] = distance;
      }
    }

    return finalDistances;
  }

  public int[] getVertexWithMinDistances(int[] distances, Set<Integer> visited) {
    int currentMinDistance = Integer.MAX_VALUE;
    int vertex = -1;

    for (int vertexIdx = 0; vertexIdx < distances.length; vertexIdx++) {
      int distance = distances[vertexIdx];

      if (visited.contains(vertexIdx)) {
        continue;
      }

      if (distance <= currentMinDistance) {
        vertex = vertexIdx;
        currentMinDistance = distance;
      }
    }

    return new int[] {vertex, currentMinDistance};
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O((v + e) * log(v)) time | O(v) space - where v is the number
  // of vertices and e is the number of edges in the input graph
  public int[] dijkstrasAlgorithm(int start, int[][][] edges) {
    int numberOfVertices = edges.length;

    int[] minDistances = new int[numberOfVertices];
    Arrays.fill(minDistances, Integer.MAX_VALUE);
    minDistances[start] = 0;

    List<Item> minDistancesPairs = new ArrayList<Item>();
    for (int i = 0; i < numberOfVertices; i++) {
      Item item = new Item(i, Integer.MAX_VALUE);
      minDistancesPairs.add(item);
    }

    MinHeap minDistancesHeap = new MinHeap(minDistancesPairs);
    minDistancesHeap.update(start, 0);

    while (!minDistancesHeap.isEmpty()) {
      Item heapItem = minDistancesHeap.remove();
      int vertex = heapItem.vertex;
      int currentMinDistance = heapItem.distance;

      if (currentMinDistance == Integer.MAX_VALUE) {
        break;
      }

      for (int[] edge : edges[vertex]) {
        int destination = edge[0];
        int distanceToDestination = edge[1];
        int newPathDistance = currentMinDistance + distanceToDestination;
        int currentDestinationDistance = minDistances[destination];
        if (newPathDistance < currentDestinationDistance) {
          minDistances[destination] = newPathDistance;
          minDistancesHeap.update(destination, newPathDistance);
        }
      }
    }

    int[] finalDistances = new int[minDistances.length];
    for (int i = 0; i < minDistances.length; i++) {
      int distance = minDistances[i];
      if (distance == Integer.MAX_VALUE) {
        finalDistances[i] = -1;
      } else {
        finalDistances[i] = distance;
      }
    }

    return finalDistances;
  }

  static class Item {
    int vertex;
    int distance;

    public Item(int vertex, int distance) {
      this.vertex = vertex;
      this.distance = distance;
    }
  };

  static class MinHeap {
    Map<Integer, Integer> vertexMap = new HashMap<Integer, Integer>();
    List<Item> heap = new ArrayList<Item>();

    public MinHeap(List<Item> array) {
      for (int i = 0; i < array.size(); i++) {
        Item item = array.get(i);
        vertexMap.put(item.vertex, item.vertex);
      }
      heap = buildHeap(array);
    }

    List<Item> buildHeap(List<Item> array) {
      int firstParentIdx = (array.size() - 2) / 2;
      for (int currentIdx = firstParentIdx + 1; currentIdx >= 0; currentIdx--) {
        siftDown(currentIdx, array.size() - 1, array);
      }
      return array;
    }

    boolean isEmpty() {
      return heap.size() == 0;
    }

    void siftDown(int currentIdx, int endIdx, List<Item> heap) {
      int childOneIdx = currentIdx * 2 + 1;
      while (childOneIdx <= endIdx) {
        int childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
        int idxToSwap;
        if (childTwoIdx != -1 && heap.get(childTwoIdx).distance < heap.get(childOneIdx).distance) {
          idxToSwap = childTwoIdx;
        } else {
          idxToSwap = childOneIdx;
        }
        if (heap.get(idxToSwap).distance < heap.get(currentIdx).distance) {
          swap(currentIdx, idxToSwap);
          currentIdx = idxToSwap;
          childOneIdx = currentIdx * 2 + 1;
        } else {
          return;
        }
      }
    }

    void siftUp(int currentIdx) {
      int parentIdx = (currentIdx - 1) / 2;
      while (currentIdx > 0 && heap.get(currentIdx).distance < heap.get(parentIdx).distance) {
        swap(currentIdx, parentIdx);
        currentIdx = parentIdx;
        parentIdx = (currentIdx - 1) / 2;
      }
    }

    Item remove() {
      if (isEmpty()) {
        return null;
      }

      swap(0, heap.size() - 1);
      Item lastItem = heap.get(heap.size() - 1);
      int vertex = lastItem.vertex;
      int distance = lastItem.distance;
      heap.remove(heap.size() - 1);
      vertexMap.remove(vertex);
      siftDown(0, heap.size() - 1, heap);
      return new Item(vertex, distance);
    }

    void update(int vertex, int value) {
      heap.set(vertexMap.get(vertex), new Item(vertex, value));
      siftUp(vertexMap.get(vertex));
    }

    void swap(int i, int j) {
      vertexMap.put(heap.get(i).vertex, j);
      vertexMap.put(heap.get(j).vertex, i);
      Item temp = heap.get(i);
      heap.set(i, heap.get(j));
      heap.set(j, temp);
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
    int start = 0;
    int[][][] edges = {
      {{1, 7}},
      {{2, 6}, {3, 20}, {4, 3}},
      {{3, 14}},
      {{4, 2}},
      {},
      {}
    };
    int[] expected = {0, 7, 13, 27, 10, -1};
    int[] actual = new Program().dijkstrasAlgorithm(start, edges);
    Utils.assertTrue(expected.length == actual.length);
    for (int i = 0; i < expected.length; i++) {
      Utils.assertTrue(expected[i] == actual[i]);
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
  const start = 0;
  const edges = [
    [[1, 7]],
    [
      [2, 6],
      [3, 20],
      [4, 3],
    ],
    [[3, 14]],
    [[4, 2]],
    [],
    [],
  ];
  const expected = [0, 7, 13, 27, 10, -1];
  const actual = program.dijkstrasAlgorithm(start, edges);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(v^2 + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the input graph
function dijkstrasAlgorithm(start, edges) {
  const numberOfVertices = edges.length;

  const minDistances = [];
  for (let i = 0; i < numberOfVertices; i++) {
    minDistances.push(Infinity);
  }
  minDistances[start] = 0;

  const visited = new Set();

  while (visited.size != numberOfVertices) {
    const [vertex, currentMinDistance] = getVertexWithMinDistance(minDistances, visited);

    if (currentMinDistance === Infinity) {
      break;
    }

    visited.add(vertex);

    for (const edge of edges[vertex]) {
      const [destination, distanceToDestination] = edge;

      if (visited.has(destination)) {
        continue;
      }

      const newPathDistance = currentMinDistance + distanceToDestination;
      const currentDestinationDistance = minDistances[destination];
      if (newPathDistance < currentDestinationDistance) {
        minDistances[destination] = newPathDistance;
      }
    }
  }

  return minDistances.map(x => (x === Infinity ? -1 : x));
}

function getVertexWithMinDistance(distances, visited) {
  let currentMinDistance = Infinity;
  let vertex = -1;

  for (const [vertexIdx, distance] of distances.entries()) {
    if (visited.has(vertexIdx)) {
      continue;
    }
    if (distance <= currentMinDistance) {
      vertex = vertexIdx;
      currentMinDistance = distance;
    }
  }

  return [vertex, currentMinDistance];
}

// Do not edit the line below.
exports.dijkstrasAlgorithm = dijkstrasAlgorithm;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O((v + e) * log(v)) time | O(v) space - where v is the number
// of vertices and e is the number of edges in the input graph
function dijkstrasAlgorithm(start, edges) {
  const numberOfVertices = edges.length;

  const minDistances = [];
  const initialDistances = [];
  for (let i = 0; i < numberOfVertices; i++) {
    minDistances.push(Infinity);
    initialDistances.push([i, Infinity]);
  }
  minDistances[start] = 0;

  const minDistancesHeap = new MinHeap(initialDistances);
  minDistancesHeap.update(start, 0);

  while (!minDistancesHeap.isEmpty()) {
    const [vertex, currentMinDistance] = minDistancesHeap.remove();

    if (currentMinDistance === Infinity) {
      break;
    }

    for (const edge of edges[vertex]) {
      const [destination, distanceToDestination] = edge;

      const newPathDistance = currentMinDistance + distanceToDestination;
      const currentDestinationDistance = minDistances[destination];
      if (newPathDistance < currentDestinationDistance) {
        minDistances[destination] = newPathDistance;
        minDistancesHeap.update(destination, newPathDistance);
      }
    }
  }

  return minDistances.map(x => (x === Infinity ? -1 : x));
}

class MinHeap {
  constructor(array) {
    // Holds the position in the heap that each vertex is at
    this.vertexMap = array.reduce((obj, _, i) => {
      obj[i] = i;
      return obj;
    }, {});
    this.heap = this.buildHeap(array);
  }

  isEmpty() {
    return this.heap.length == 0;
  }

  // O(n) time | O(1) space
  buildHeap(array) {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array.length - 1, array);
    }
    return array;
  }

  // O(log(n)) time | O(1) space
  siftDown(currentIdx, endIdx, heap) {
    let childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let idxToSwap;
      if (childTwoIdx !== -1 && heap[childTwoIdx][1] < heap[childOneIdx][1]) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }
      if (heap[idxToSwap][1] < heap[currentIdx][1]) {
        this.swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  // O(log(n)) time | O(1) space
  siftUp(currentIdx, heap) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (currentIdx > 0 && heap[currentIdx][1] < heap[parentIdx][1]) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  // O(log(n)) time | O(1) space
  remove() {
    if (this.isEmpty()) return;

    this.swap(0, this.heap.length - 1, this.heap);
    const [vertex, distance] = this.heap.pop();
    delete this.vertexMap[vertex];
    this.siftDown(0, this.heap.length - 1, this.heap);
    return [vertex, distance];
  }

  swap(i, j, heap) {
    this.vertexMap[heap[i][0]] = j;
    this.vertexMap[heap[j][0]] = i;
    const temp = heap[j];
    heap[j] = heap[i];
    heap[i] = temp;
  }

  update(vertex, value) {
    this.heap[this.vertexMap[vertex]] = [vertex, value];
    this.siftUp(this.vertexMap[vertex], this.heap);
  }
}

// Do not edit the line below.
exports.dijkstrasAlgorithm = dijkstrasAlgorithm;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const start = 0;
  const edges = [
    [[1, 7]],
    [
      [2, 6],
      [3, 20],
      [4, 3],
    ],
    [[3, 14]],
    [[4, 2]],
    [],
    [],
  ];
  const expected = [0, 7, 13, 27, 10, -1];
  const actual = program.dijkstrasAlgorithm(start, edges);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.dijkstrasAlgorithm

class ProgramTest {
    @Test
    fun TestCase1() {
        val start = 0
        val edges = listOf(
            listOf(listOf(1, 7)),
            listOf(listOf(2, 6), listOf(3, 20), listOf(4, 3)),
            listOf(listOf(3, 14)),
            listOf(listOf(4, 2)),
            listOf(),
            listOf()
        )
        val expected = listOf(0, 7, 13, 27, 10, -1)
        val output = dijkstrasAlgorithm(start, edges)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(v^2 + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the input graph
fun dijkstrasAlgorithm(start: Int, edges: List<List<List<Int>>>): List<Int> {
    val numberOfVertices = edges.size

    val minDistances = MutableList(edges.size) { Int.MAX_VALUE }
    minDistances[start] = 0

    val visited = mutableSetOf<Int>()

    while (visited.size != numberOfVertices) {
        val (vertex, currentMinDistance) = getVertexWithMinDistance(minDistances, visited)

        if (currentMinDistance == Int.MAX_VALUE) break

        visited.add(vertex)

        for (edge in edges[vertex]) {
            val (destination, distanceToDestination) = edge

            if (destination in visited) continue

            val newPathDistance = currentMinDistance + distanceToDestination
            val currentDestinationDistance = minDistances[destination]
            if (newPathDistance < currentDestinationDistance) {
                minDistances[destination] = newPathDistance
            }
        }
    }

    return minDistances.map() { x -> if (x == Int.MAX_VALUE) -1 else x }
}

fun getVertexWithMinDistance(distances: List<Int>, visited: Set<Int>): Pair<Int, Int> {
    var currentMinDistance = Int.MAX_VALUE
    var vertex = -1

    for (vertexIdx in 0 until distances.size) {
        val distance = distances[vertexIdx]
        if (vertexIdx in visited) continue
        if (distance <= currentMinDistance) {
            vertex = vertexIdx
            currentMinDistance = distance
        }
    }

    return Pair(vertex, currentMinDistance)
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O((v + e) * log(v)) time | O(v) space - where v is the number
// of vertices and e is the number of edges in the input graph
fun dijkstrasAlgorithm(start: Int, edges: List<List<List<Int>>>): List<Int> {
    val numberOfVertices = edges.size

    val minDistances = MutableList(edges.size) { Int.MAX_VALUE }
    minDistances[start] = 0

    val minDistancesPairs = mutableListOf<Pair<Int, Int>>()
    for (i in 0 until edges.size) {
        minDistancesPairs.add(Pair(i, Int.MAX_VALUE))
    }
    val minDistancesHeap = MinHeap(minDistancesPairs)
    minDistancesHeap.update(start, 0)

    while (!minDistancesHeap.isEmpty()) {
        val (vertex, currentMinDistance) = minDistancesHeap.remove()!!

        if (currentMinDistance == Int.MAX_VALUE) break

        for (edge in edges[vertex]) {
            val (destination, distanceToDestination) = edge

            val newPathDistance = currentMinDistance + distanceToDestination
            val currentDestinationDistance = minDistances[destination]
            if (newPathDistance < currentDestinationDistance) {
                minDistances[destination] = newPathDistance
                minDistancesHeap.update(destination, newPathDistance)
            }
        }
    }

    return minDistances.map() { x -> if (x == Int.MAX_VALUE) -1 else x }
}

open class MinHeap(array: MutableList<Pair<Int, Int>>) {
    // Holds the position in the heap that each vertex is at
    val vertexMap = array.associate({ it.first to it.first }).toMutableMap()
    val heap = this.buildHeap(array)

    // O(n) time | O(1) space
    fun buildHeap(array: MutableList<Pair<Int, Int>>): MutableList<Pair<Int, Int>> {
        val firstParentIdx = (array.size - 2) / 2
        for (currentIdx in firstParentIdx downTo 0) {
            this.siftDown(currentIdx, array.size - 1, array)
        }
        return array
    }

    fun isEmpty(): Boolean {
        return this.heap.size == 0
    }

    // O(log(n)) time | O(1) space
    fun siftDown(currentIdx: Int, endIdx: Int, heap: MutableList<Pair<Int, Int>>) {
        var newCurrentIdx = currentIdx
        var childOneIdx = currentIdx * 2 + 1
        while (childOneIdx <= endIdx) {
            var childTwoIdx = if (newCurrentIdx * 2 + 2 <= endIdx) newCurrentIdx * 2 + 2 else -1
            var idxToSwap: Int
            if (childTwoIdx != -1 && heap[childTwoIdx].second < heap[childOneIdx].second) {
                idxToSwap = childTwoIdx
            } else {
                idxToSwap = childOneIdx
            }
            if (heap[idxToSwap].second < heap[newCurrentIdx].second) {
                this.swap(newCurrentIdx, idxToSwap, heap)
                newCurrentIdx = idxToSwap
                childOneIdx = newCurrentIdx * 2 + 1
            } else {
                return
            }
        }
    }

    // O(log(n)) time | O(1) space
    fun siftUp(currentIdx: Int, heap: MutableList<Pair<Int, Int>>) {
        var newCurrentIdx = currentIdx
        var parentIdx = (currentIdx - 1) / 2
        while (newCurrentIdx > 0 && heap[newCurrentIdx].second < heap[parentIdx].second) {
            this.swap(newCurrentIdx, parentIdx, heap)
            newCurrentIdx = parentIdx
            parentIdx = (newCurrentIdx - 1) / 2
        }
    }

    // O(log(n)) time | O(1) space
    fun remove(): Pair<Int, Int>? {
        if (this.isEmpty()) return null

        this.swap(0, this.heap.size - 1, this.heap)
        val (vertex, distance) = this.heap.removeAt(this.heap.size - 1)
        this.vertexMap.remove(vertex)
        this.siftDown(0, this.heap.size - 1, this.heap)
        return Pair(vertex, distance)
    }

    fun swap(i: Int, j: Int, heap: MutableList<Pair<Int, Int>>) {
        this.vertexMap[heap[i].first] = j
        this.vertexMap[heap[j].first] = i
        val temp = heap[j]
        heap[j] = heap[i]
        heap[i] = temp
    }

    fun update(vertex: Int, value: Int) {
        this.heap[this.vertexMap[vertex]!!] = Pair(vertex, value)
        this.siftUp(this.vertexMap[vertex]!!, this.heap)
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.dijkstrasAlgorithm

class ProgramTest {
    @Test
    fun TestCase1() {
        val start = 0
        val edges = listOf(
            listOf(listOf(1, 7)),
            listOf(listOf(2, 6), listOf(3, 20), listOf(4, 3)),
            listOf(listOf(3, 14)),
            listOf(listOf(4, 2)),
            listOf(),
            listOf()
        )
        val expected = listOf(0, 7, 13, 27, 10, -1)
        val output = dijkstrasAlgorithm(start, edges)
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
      var start = 0
      var edges = [
        [[1, 7]],
        [[2, 6], [3, 20], [4, 3]],
        [[3, 14]],
        [[4, 2]],
        [],
        [],
      ]
      var expected = [0, 7, 13, 27, 10, -1]
      var actual = Program().dijkstrasAlgorithm(start, edges)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(v^2 + e) time | O(v) space - where v is the number of
  // vertices and e is the number of edges in the input graph
  func dijkstrasAlgorithm(_ start: Int, _ edges: [[[Int]]]) -> [Int] {
    let numOfVertices = edges.count

    var minDistances = Array(repeating: Int.max, count: numOfVertices)
    minDistances[start] = 0

    var visited = Set<Int>()

    while visited.count != numOfVertices {
      let (vertex, currentMinDistance) = getVertexWithMinDistance(&minDistances, &visited)
      if currentMinDistance == Int.max {
        break
      }

      visited.insert(vertex)

      for edge in edges[vertex] {
        var (destination, distanceToDestination) = (edge[0], edge[1])

        if visited.contains(destination) {
          continue
        }

        let newPathDistance = currentMinDistance + distanceToDestination
        let currentDestinationDistance = minDistances[destination]
        if newPathDistance < currentDestinationDistance {
          minDistances[destination] = newPathDistance
        }
      }
    }
    return minDistances.map {
      if $0 == Int.max {
        return -1
      }
      return $0
    }
  }

  func getVertexWithMinDistance(_ distances: inout [Int], _ visited: inout Set<Int>) -> (Int, Int) {
    var currentMinDistance = Int.max
    var vertex = -1

    for vertexIdx in 0 ..< distances.count {
      let distance = distances[vertexIdx]
      if visited.contains(vertexIdx) {
        continue
      }

      if distance <= currentMinDistance {
        vertex = vertexIdx
        currentMinDistance = distance
      }
    }
    return (vertex, currentMinDistance)
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O((v + e) * log(v)) time | O(v) space - where v is the number
  // of vertices and e is the number of edges in the input graph
  func dijkstrasAlgorithm(_ start: Int, _ edges: [[[Int]]]) -> [Int] {
    let numOfVertices = edges.count

    var minDistances = Array(repeating: Int.max, count: numOfVertices)
    minDistances[start] = 0

    var minDistancesPairs = [Item]()
    for i in 0 ..< edges.count {
      minDistancesPairs.append(Item(vertex: i, distance: Int.max))
    }

    let minDistancesHeap = MinHeap(&minDistancesPairs)
    minDistancesHeap.update(start, 0)

    while !minDistancesHeap.isEmpty() {
      let (vertex, currentMinDistance) = minDistancesHeap.remove()!

      if currentMinDistance == Int.max {
        break
      }

      for edge in edges[vertex] {
        let (destination, distanceToDestination) = (edge[0], edge[1])

        let newPathDistance = currentMinDistance + distanceToDestination
        let currentDestinationDistance = minDistances[destination]
        if newPathDistance < currentDestinationDistance {
          minDistances[destination] = newPathDistance
          minDistancesHeap.update(destination, newPathDistance)
        }
      }
    }

    return minDistances.map {
      if $0 == Int.max {
        return -1
      }
      return $0
    }
  }

  struct Item {
    var vertex: Int
    var distance: Int
  }

  class MinHeap {
    var heap = [Item]()
    var vertexMap = [Int: Int]()

    init(_ array: inout [Item]) {
      for item in array {
        vertexMap[item.vertex] = item.vertex
      }
      heap = array
      buildHeap(array: &array)
    }

    // O(n) time | O(1) space
    func buildHeap(array: inout [Item]) {
      var firstParentIndex = Double((array.count - 2) / 2)
      firstParentIndex = firstParentIndex.rounded(.down)

      for currentIndex in stride(from: Int(firstParentIndex), through: 0, by: -1) {
        let endIndex = array.count - 1
        siftDown(currentIndex, endIndex)
      }
    }

    // O(log(n)) time | O(1) space
    func siftDown(_ currentIndex: Int, _ endIndex: Int) {
      var childOneIndex = currentIndex * 2 + 1
      var current = currentIndex
      while childOneIndex <= endIndex {
        var childTwoIndex = -1
        if current * 2 + 2 <= endIndex {
          childTwoIndex = current * 2 + 2
        }
        var indexToSwap = childOneIndex
        if childTwoIndex > -1, heap[childTwoIndex].distance < heap[childOneIndex].distance {
          indexToSwap = childTwoIndex
        }

        if heap[indexToSwap].distance < heap[current].distance {
          swap(current, indexToSwap)
          current = indexToSwap
          childOneIndex = current * 2 + 1
        } else {
          return
        }
      }
    }

    // O(log(n)) time | O(1) space
    func siftUp(_ currentIndex: Int) {
      var currentIndex = currentIndex
      var parentIndex = (currentIndex - 1) / 2

      while currentIndex > 0, heap[currentIndex].distance < heap[parentIndex].distance {
        swap(currentIndex, parentIndex)
        currentIndex = parentIndex
        parentIndex = (currentIndex - 1) / 2
      }
    }

    // O(log(n)) time | O(1) space
    func remove() -> (Int, Int)? {
      if isEmpty() {
        return nil
      }

      let l = heap.count
      swap(0, l - 1)
      let peeked = heap[l - 1]
      heap.removeLast()
      vertexMap.removeValue(forKey: peeked.vertex)
      siftDown(0, l - 2)
      return (peeked.vertex, peeked.distance)
    }

    // O(log(n)) time | O(1) space
    func update(_ vertex: Int, _ value: Int) {
      heap[vertexMap[vertex]!] = Item(vertex: vertex, distance: value)
      siftUp(vertexMap[vertex]!)
    }

    func swap(_ i: Int, _ j: Int) {
      vertexMap[heap[i].vertex] = j
      vertexMap[heap[j].vertex] = i

      let temp = heap[i]
      heap[i] = heap[j]
      heap[j] = temp
    }

    func isEmpty() -> Bool {
      return heap.count == 0
    }
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var start = 0
      var edges = [
        [[1, 7]],
        [[2, 6], [3, 20], [4, 3]],
        [[3, 14]],
        [[4, 2]],
        [],
        [],
      ]
      var expected = [0, 7, 13, 27, 10, -1]
      var actual = Program().dijkstrasAlgorithm(start, edges)
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
        start = 0
        edges = [[[1, 7]], [[2, 6], [3, 20], [4, 3]], [[3, 14]], [[4, 2]], [], []]
        expected = [0, 7, 13, 27, 10, -1]
        actual = program.dijkstrasAlgorithm(start, edges)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(v^2 + e) time | O(v) space - where v is the number of
# vertices and e is the number of edges in the input graph
def dijkstrasAlgorithm(start, edges):
    numberOfVertices = len(edges)

    minDistances = [float("inf") for _ in range(numberOfVertices)]
    minDistances[start] = 0

    visited = set()

    while len(visited) != numberOfVertices:
        vertex, currentMinDistance = getVertexWithMinDistance(minDistances, visited)

        if currentMinDistance == float("inf"):
            break

        visited.add(vertex)

        for edge in edges[vertex]:
            destination, distanceToDestination = edge

            if destination in visited:
                continue

            newPathDistance = currentMinDistance + distanceToDestination
            currentDestinationDistance = minDistances[destination]
            if newPathDistance < currentDestinationDistance:
                minDistances[destination] = newPathDistance

    return list(map(lambda x: -1 if x == float("inf") else x, minDistances))


def getVertexWithMinDistance(distances, visited):
    currentMinDistance = float("inf")
    vertex = -1

    for vertexIdx, distance in enumerate(distances):
        if vertexIdx in visited:
            continue
        if distance <= currentMinDistance:
            vertex = vertexIdx
            currentMinDistance = distance

    return vertex, currentMinDistance

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O((v + e) * log(v)) time | O(v) space - where v is the number
# of vertices and e is the number of edges in the input graph
def dijkstrasAlgorithm(start, edges):
    numberOfVertices = len(edges)

    minDistances = [float("inf") for _ in range(numberOfVertices)]
    minDistances[start] = 0

    minDistancesHeap = MinHeap([(idx, float("inf")) for idx in range(numberOfVertices)])
    minDistancesHeap.update(start, 0)

    while not minDistancesHeap.isEmpty():
        vertex, currentMinDistance = minDistancesHeap.remove()

        if currentMinDistance == float("inf"):
            break

        for edge in edges[vertex]:
            destination, distanceToDestination = edge

            newPathDistance = currentMinDistance + distanceToDestination
            currentDestinationDistance = minDistances[destination]
            if newPathDistance < currentDestinationDistance:
                minDistances[destination] = newPathDistance
                minDistancesHeap.update(destination, newPathDistance)

    return list(map(lambda x: -1 if x == float("inf") else x, minDistances))


class MinHeap:
    def __init__(self, array):
        # Holds the position in the heap that each vertex is at
        self.vertexMap = {idx: idx for idx in range(len(array))}
        self.heap = self.buildHeap(array)

    def isEmpty(self):
        return len(self.heap) == 0

    # O(n) time | O(1) space
    def buildHeap(self, array):
        firstParentIdx = (len(array) - 2) // 2
        for currentIdx in reversed(range(firstParentIdx + 1)):
            self.siftDown(currentIdx, len(array) - 1, array)
        return array

    # O(log(n)) time | O(1) space
    def siftDown(self, currentIdx, endIdx, heap):
        childOneIdx = currentIdx * 2 + 1
        while childOneIdx <= endIdx:
            childTwoIdx = currentIdx * 2 + 2 if currentIdx * 2 + 2 <= endIdx else -1
            if childTwoIdx != -1 and heap[childTwoIdx][1] < heap[childOneIdx][1]:
                idxToSwap = childTwoIdx
            else:
                idxToSwap = childOneIdx
            if heap[idxToSwap][1] < heap[currentIdx][1]:
                self.swap(currentIdx, idxToSwap, heap)
                currentIdx = idxToSwap
                childOneIdx = currentIdx * 2 + 1
            else:
                return

    # O(log(n)) time | O(1) space
    def siftUp(self, currentIdx, heap):
        parentIdx = (currentIdx - 1) // 2
        while currentIdx > 0 and heap[currentIdx][1] < heap[parentIdx][1]:
            self.swap(currentIdx, parentIdx, heap)
            currentIdx = parentIdx
            parentIdx = (currentIdx - 1) // 2

    # O(log(n)) time | O(1) space
    def remove(self):
        if self.isEmpty():
            return

        self.swap(0, len(self.heap) - 1, self.heap)
        vertex, distance = self.heap.pop()
        self.vertexMap.pop(vertex)
        self.siftDown(0, len(self.heap) - 1, self.heap)
        return vertex, distance

    def swap(self, i, j, heap):
        self.vertexMap[heap[i][0]] = j
        self.vertexMap[heap[j][0]] = i
        heap[i], heap[j] = heap[j], heap[i]

    def update(self, vertex, value):
        self.heap[self.vertexMap[vertex]] = (vertex, value)
        self.siftUp(self.vertexMap[vertex], self.heap)

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        start = 0
        edges = [[[1, 7]], [[2, 6], [3, 20], [4, 3]], [[3, 14]], [[4, 2]], [], []]
        expected = [0, 7, 13, 27, 10, -1]
        actual = program.dijkstrasAlgorithm(start, edges)
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
  const start = 0;
  const edges = [
    [[1, 7]],
    [
      [2, 6],
      [3, 20],
      [4, 3],
    ],
    [[3, 14]],
    [[4, 2]],
    [],
    [],
  ];
  const expected = [0, 7, 13, 27, 10, -1];
  const actual = program.dijkstrasAlgorithm(start, edges);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(v^2 + e) time | O(v) space - where v is the number of
// vertices and e is the number of edges in the input graph
export function dijkstrasAlgorithm(start: number, edges: number[][][]) {
  const numberOfVertices = edges.length;

  const minDistances: number[] = [];
  for (let i = 0; i < numberOfVertices; i++) {
    minDistances.push(Infinity);
  }
  minDistances[start] = 0;

  const visited = new Set<number>();

  while (visited.size != numberOfVertices) {
    const [vertex, currentMinDistance] = getVertexWithMinDistance(minDistances, visited);

    if (currentMinDistance === Infinity) {
      break;
    }

    visited.add(vertex);

    for (const edge of edges[vertex]) {
      const [destination, distanceToDestination] = edge;

      if (visited.has(destination)) {
        continue;
      }

      const newPathDistance = currentMinDistance + distanceToDestination;
      const currentDestinationDistance = minDistances[destination];
      if (newPathDistance < currentDestinationDistance) {
        minDistances[destination] = newPathDistance;
      }
    }
  }

  return minDistances.map(x => (x === Infinity ? -1 : x));
}

function getVertexWithMinDistance(distances: number[], visited: Set<number>) {
  let currentMinDistance = Infinity;
  let vertex = -1;

  for (const [vertexIdx, distance] of distances.entries()) {
    if (visited.has(vertexIdx)) {
      continue;
    }
    if (distance <= currentMinDistance) {
      vertex = vertexIdx;
      currentMinDistance = distance;
    }
  }

  return [vertex, currentMinDistance];
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O((v + e) * log(v)) time | O(v) space - where v is the number
// of vertices and e is the number of edges in the input graph
export function dijkstrasAlgorithm(start: number, edges: number[][][]) {
  const numberOfVertices = edges.length;

  const minDistances: number[] = [];
  const initialDistances: [number, number][] = [];
  for (let i = 0; i < numberOfVertices; i++) {
    minDistances.push(Infinity);
    initialDistances.push([i, Infinity]);
  }
  minDistances[start] = 0;

  const minDistancesHeap = new MinHeap(initialDistances);
  minDistancesHeap.update(start, 0);

  while (!minDistancesHeap.isEmpty()) {
    const [vertex, currentMinDistance] = minDistancesHeap.remove()!;

    if (currentMinDistance === Infinity) {
      break;
    }

    for (const edge of edges[vertex]) {
      const [destination, distanceToDestination] = edge;

      const newPathDistance = currentMinDistance + distanceToDestination;
      const currentDestinationDistance = minDistances[destination];
      if (newPathDistance < currentDestinationDistance) {
        minDistances[destination] = newPathDistance;
        minDistancesHeap.update(destination, newPathDistance);
      }
    }
  }

  return minDistances.map(x => (x === Infinity ? -1 : x));
}

class MinHeap {
  vertexMap: {[vertex: number]: number};
  heap: [number, number][];

  constructor(array: [number, number][]) {
    // Holds the position in the heap that each vertex is at
    this.vertexMap = array.reduce((obj, _, i) => {
      obj[i] = i;
      return obj;
    }, {} as {[vertex: number]: number});
    this.heap = this.buildHeap(array);
  }

  isEmpty() {
    return this.heap.length == 0;
  }

  // O(n) time | O(1) space
  buildHeap(array: [number, number][]) {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array.length - 1, array);
    }
    return array;
  }

  // O(log(n)) time | O(1) space
  siftDown(currentIdx: number, endIdx: number, heap: [number, number][]) {
    let childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let idxToSwap;
      if (childTwoIdx !== -1 && heap[childTwoIdx][1] < heap[childOneIdx][1]) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }
      if (heap[idxToSwap][1] < heap[currentIdx][1]) {
        this.swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  // O(log(n)) time | O(1) space
  siftUp(currentIdx: number, heap: [number, number][]) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (currentIdx > 0 && heap[currentIdx][1] < heap[parentIdx][1]) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  // O(log(n)) time | O(1) space
  remove() {
    if (this.isEmpty()) return;

    this.swap(0, this.heap.length - 1, this.heap);
    const [vertex, distance] = this.heap.pop()!;
    delete this.vertexMap[vertex];
    this.siftDown(0, this.heap.length - 1, this.heap);
    return [vertex, distance];
  }

  swap(i: number, j: number, heap: [number, number][]) {
    this.vertexMap[heap[i][0]] = j;
    this.vertexMap[heap[j][0]] = i;
    const temp = heap[j];
    heap[j] = heap[i];
    heap[i] = temp;
  }

  update(vertex: number, value: number) {
    this.heap[this.vertexMap[vertex]] = [vertex, value];
    this.siftUp(this.vertexMap[vertex], this.heap);
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const start = 0;
  const edges = [
    [[1, 7]],
    [
      [2, 6],
      [3, 20],
      [4, 3],
    ],
    [[3, 14]],
    [[4, 2]],
    [],
    [],
  ];
  const expected = [0, 7, 13, 27, 10, -1];
  const actual = program.dijkstrasAlgorithm(start, edges);
  chai.expect(actual).to.deep.equal(expected);
});

```

