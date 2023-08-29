# A* Algorithm
<div class="html">
<p>
  You're given a two-dimensional array containing <span>0</span>s and
  <span>1</span>s, where each <span>0</span> represents a free space and each
  <span>1</span> represents an obstacle (a space that cannot be passed through).
  You can think of this array as a grid-shaped graph. You're also given four
  integers <span>startRow</span>, <span>startCol</span>, <span>endRow</span>,
  and <span>endCol</span>, representing the positions of a start node and an end
  node in the graph.
</p>
<p>
  Write a function that finds the shortest path between the start node and the
  end node using the A* search algorithm and returns it.
</p>
<p>
  The shortest path should be returned as an array of node positions, where each
  node position is an array of two elements: the <span>[row, col]</span> of the
  respective node in the graph. The output array should contain the start node's
  position, the end node's position, and all of the positions of the remaining
  nodes in the shortest path, and these node positions should be ordered from
  start node to end node.
</p>
<p>
  If there is no path from the start node to the end node, your function should
  return an empty array.
</p>
<p>Note that:</p>
<ul>
  <li>
    From each node in the graph, you can only travel in four directions: up,
    left, down and right; you can't travel diagonally.
  </li>
  <li>
    The distance between all neighboring nodes in the graph is the same; you
    can treat it as a distance of 1.
  </li>
  <li>
    The start node and end node are guaranteed to be located in empty spaces
    (cells containing <span>0</span>).
  </li>
  <li>
    The start node and end node will never be out of bounds and will never
    overlap.
  </li>
  <li>
    There will be at most one shortest path from the start node to the end
    node.
  </li>
</ul>
<p>
  If you're unfamiliar with A*, we recommend watching the Conceptual Overview
  section of this question's video explanation before starting to code.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">startRow</span> = 0
<span class="CodeEditor-promptParameter">startCol</span> = 1
<span class="CodeEditor-promptParameter">endRow</span> = 4
<span class="CodeEditor-promptParameter">endCol</span> = 3
<span class="CodeEditor-promptParameter">graph</span> = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [1, 0, 1, 1, 1],
  [0, 0, 0, 0, 0],
]
</pre>
<h3>Sample Output</h3>
<pre>
[[0, 1], [0, 0], [1, 0], [2, 0], [2, 1], [3, 1], [4, 1], [4, 2], [4, 3]]

<span class="CodeEditor-promptComment">// The shortest path can be clearly seen here:</span>
<span class="CodeEditor-promptComment">// [</span>
<span class="CodeEditor-promptComment">//   [., ., 0, 0, 0],</span>
<span class="CodeEditor-promptComment">//   [., 1, 1, 1, 0],</span>
<span class="CodeEditor-promptComment">//   [., ., 0, 0, 0],</span>
<span class="CodeEditor-promptComment">//   [1, ., 1, 1, 1],</span>
<span class="CodeEditor-promptComment">//   [0, ., ., ., 0],</span>
<span class="CodeEditor-promptComment">// ]</span>
</pre>
</div>

Hint 1
<p>
A* works by visiting nodes in the graph, one by one, all the while keeping track of their shortest estimated distance to the end node and continuously updating these distances. More specifically, the algorithm keeps track of unvisited nodes and visits the unvisited node with the shortest estimated distance to the end node at any point in time, naturally starting with the start node. Whenever the algorithm visits an unvisited node, it looks at all of its neighboring nodes and tries to update their shortest estimated distance to the end node, using the current shortest distance to the current node as a base and using a special heuristic to estimate the remaining distance to the end node. In a grid-shaped graph, the heuristic used is often the Manhattan Distance (i.e., the number of naive vertical and horizontal steps between the current node and the end node). Once the algorithm has reached the end node, it is guaranteed to have found the shortest path to it. How can you implement this algorithm?
</p>


Hint 2

<p>
The most challenging part of A* is determining how to efficiently find the node with the current shortest estimated distance to the end. Can you think of a data structure that could be used to keep track of the distances and to efficiently retrieve the node with the current shortest estimated distance to the end at each step?
</p>


Hint 3

<p>
Create a min-heap that will hold all of the unvisited nodes and their current shortest estimated distance to the end node. Initialize all nodes except for the start node as having a shortest estimated distance to the end node of infinity and also a shortest distance from the start node to themselves of infinity; the start node will have a distance to itself of 0 and an estimated distance to the end node of its Manhattan Distance to the end node. Next, write a while loop that will run until the min-heap is empty or until the end node is reached. At every iteration in the loop, remove the node from the top of the heap (the node with the shortest estimated distance to the end node), loop through all of its neighboring nodes, and for each neighbor, update its two distances if reaching the neighbor from the current node yields a shorter distance than whatever's already stored on the neighbor. Once you reach the end node, you'll have found the shortest path to it from the start node. Note that you'll have to keep track of which node each node came from whenever you update node distances; this is so that you can reconstruct the shortest path once you reach the end node.
</p>

---
## Solutions
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <limits>
#include <vector>
#include <cmath>
#include <algorithm>
#include <string>

using namespace std;

class Node {
public:
  string id;
  int row;
  int col;
  int value;
  int distanceFromStart;
  int estimatedDistanceToEnd;
  Node *cameFrom;

  Node(int row, int col, int value) {
    this->id = to_string(row) + '-' + to_string(col);
    this->row = row;
    this->col = col;
    this->value = value;
    this->distanceFromStart = numeric_limits<int>::max();
    this->estimatedDistanceToEnd = numeric_limits<int>::max();
    this->cameFrom = nullptr;
  }
};

class MinHeap {
public:
  vector<Node *> heap;
  unordered_map<string, int> nodePositionsInHeap;

  MinHeap(vector<Node *> array) {
    for (int i = 0; i < array.size(); i++) {
      auto node = array[i];
      nodePositionsInHeap[node->id] = i;
    }
    heap = buildHeap(array);
  }

  // O(n) time | O(1) space
  vector<Node *> buildHeap(vector<Node *> &array) {
    int firstParentIdx = (array.size() - 2) / 2;
    for (int currentIdx = firstParentIdx + 1; currentIdx >= 0; currentIdx--) {
      siftDown(currentIdx, array.size() - 1, array);
    }
    return array;
  }

  bool isEmpty() { return heap.size() == 0; }

  // O(log(n)) time | O(1) space
  void siftDown(int currentIdx, int endIdx, vector<Node *> &array) {
    int childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      int childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      int idxToSwap;
      if (childTwoIdx != -1 && array[childTwoIdx]->estimatedDistanceToEnd <
                                   heap[childOneIdx]->estimatedDistanceToEnd) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }
      if (array[idxToSwap]->estimatedDistanceToEnd <
          array[currentIdx]->estimatedDistanceToEnd) {
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
    while (currentIdx > 0 && heap[currentIdx]->estimatedDistanceToEnd <
                                 heap[parentIdx]->estimatedDistanceToEnd) {
      swap(currentIdx, parentIdx);
      currentIdx = parentIdx;
      parentIdx = (currentIdx - 1) / 2;
    }
  }

  Node *remove() {
    if (isEmpty()) {
      return nullptr;
    }

    swap(0, heap.size() - 1);
    auto node = heap.back();
    heap.pop_back();
    nodePositionsInHeap.erase(node->id);
    siftDown(0, heap.size() - 1, heap);
    return node;
  }

  void insert(Node *node) {
    heap.push_back(node);
    nodePositionsInHeap[node->id] = heap.size() - 1;
    siftUp(heap.size() - 1);
  }

  void swap(int i, int j) {
    nodePositionsInHeap[heap[i]->id] = j;
    nodePositionsInHeap[heap[j]->id] = i;
    auto temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
  }

  bool containsNode(Node *node) {
    return nodePositionsInHeap.find(node->id) != nodePositionsInHeap.end();
  }

  void update(Node *node) { siftUp(nodePositionsInHeap[node->id]); }
};

vector<vector<int>> reconstructPath(Node *endNode);
vector<Node *> getNeightboringNodes(Node *node, vector<vector<Node *>> &nodes);
int calculateManhattanDistance(Node *currentNode, Node *endNode);
vector<vector<Node *>> initializeNodes(vector<vector<int>> graph);

// O(w * h * log(w * h)) time | O(w * h) space - where
// w is the width of the graph and h is the height
vector<vector<int>> aStarAlgorithm(int startRow, int startCol, int endRow,
                                   int endCol, vector<vector<int>> graph) {
  auto nodes = initializeNodes(graph);
  auto startNode = nodes[startRow][startCol];
  auto endNode = nodes[endRow][endCol];

  startNode->distanceFromStart = 0;
  startNode->estimatedDistanceToEnd =
      calculateManhattanDistance(startNode, endNode);

  MinHeap nodesToVisit(vector<Node *>{startNode});

  while (!nodesToVisit.isEmpty()) {
    auto currentMinDistanceNode = nodesToVisit.remove();

    if (currentMinDistanceNode == endNode) {
      break;
    }

    auto neighbors = getNeightboringNodes(currentMinDistanceNode, nodes);

    for (auto neighbor : neighbors) {
      if (neighbor->value == 1) {
        continue;
      }

      int tentativeDistanceToNeighbor =
          currentMinDistanceNode->distanceFromStart + 1;

      if (tentativeDistanceToNeighbor >= neighbor->distanceFromStart) {
        continue;
      }

      neighbor->cameFrom = currentMinDistanceNode;
      neighbor->distanceFromStart = tentativeDistanceToNeighbor;
      neighbor->estimatedDistanceToEnd =
          tentativeDistanceToNeighbor +
          calculateManhattanDistance(neighbor, endNode);

      if (!nodesToVisit.containsNode(neighbor)) {
        nodesToVisit.insert(neighbor);
      } else {
        nodesToVisit.update(neighbor);
      }
    }
  }

  return reconstructPath(endNode);
}

vector<vector<Node *>> initializeNodes(vector<vector<int>> graph) {
  vector<vector<Node *>> nodes;

  for (int i = 0; i < graph.size(); i++) {
    nodes.push_back(vector<Node *>{});
    for (int j = 0; j < graph[i].size(); j++) {
      nodes[i].push_back(new Node(i, j, graph[i][j]));
    }
  }

  return nodes;
}

int calculateManhattanDistance(Node *currentNode, Node *endNode) {
  int currentRow = currentNode->row;
  int currentCol = currentNode->col;
  int endRow = endNode->row;
  int endCol = endNode->col;

  return abs(currentRow - endRow) + abs(currentCol - endCol);
}

vector<Node *> getNeightboringNodes(Node *node, vector<vector<Node *>> &nodes) {
  vector<Node *> neighbors;

  int numRows = nodes.size();
  int numCols = nodes[0].size();

  int row = node->row;
  int col = node->col;

  if (row < numRows - 1) { // DOWN
    neighbors.push_back(nodes[row + 1][col]);
  }

  if (row > 0) { // UP
    neighbors.push_back(nodes[row - 1][col]);
  }

  if (col < numCols - 1) { // RIGHT
    neighbors.push_back(nodes[row][col + 1]);
  }

  if (col > 0) { // LEFT
    neighbors.push_back(nodes[row][col - 1]);
  }

  return neighbors;
}

vector<vector<int>> reconstructPath(Node *endNode) {
  if (endNode->cameFrom == nullptr) {
    return vector<vector<int>>{};
  }

  Node *currentNode = endNode;
  vector<vector<int>> path;

  while (currentNode != nullptr) {
    path.push_back(vector<int>{currentNode->row, currentNode->col});
    currentNode = currentNode->cameFrom;
  }

  reverse(path.begin(), path.end());
  return path;
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {

	// O(w * h * log(w * h)) time | O(w * h) space - where
	// w is the width of the graph and h is the height
	public int[][] AStarAlgorithm(int startRow, int startCol, int endRow, int endCol,
	  int[][] graph) {
		List<List<Node> > nodes = initializeNodes(graph);
		Node startNode = nodes[startRow][startCol];
		Node endNode = nodes[endRow][endCol];

		startNode.distanceFromStart = 0;
		startNode.estimatedDistanceToEnd = calculateManhattanDistance(startNode, endNode);

		List<Node> nodesToVisitList = new List<Node>();
		nodesToVisitList.Add(startNode);
		MinHeap nodesToVisit = new MinHeap(nodesToVisitList);

		while (!nodesToVisit.isEmpty()) {
			Node currentMinDistanceNode = nodesToVisit.Remove();
			if (currentMinDistanceNode == endNode) {
				break;
			}

			List<Node> neighbors = getNeightboringNodes(currentMinDistanceNode, nodes);
			foreach (var neighbor in neighbors) {
				if (neighbor.value == 1) {
					continue;
				}

				int tentativeDistanceToNeighbor =
				  currentMinDistanceNode.distanceFromStart + 1;
				if (tentativeDistanceToNeighbor >= neighbor.distanceFromStart) {
					continue;
				}

				neighbor.cameFrom = currentMinDistanceNode;
				neighbor.distanceFromStart = tentativeDistanceToNeighbor;
				neighbor.estimatedDistanceToEnd = tentativeDistanceToNeighbor +
				  calculateManhattanDistance(neighbor, endNode);

				if (!nodesToVisit.ContainsNode(neighbor)) {
					nodesToVisit.Insert(neighbor);
				} else {
					nodesToVisit.Update(neighbor);
				}
			}
		}

		return reconstructPath(endNode);
	}

	List<List<Node> > initializeNodes(int[][] graph) {
		List<List<Node> > nodes = new List<List<Node> >();

		for (int i = 0; i < graph.Length; i++) {
			List<Node> nodeList = new List<Node>();
			nodes.Add(nodeList);
			for (int j = 0; j < graph[i].Length; j++) {
				nodes[i].Add(new Node(i, j, graph[i][j]));
			}
		}

		return nodes;
	}

	int calculateManhattanDistance(Node currentNode, Node endNode) {
		int currentRow = currentNode.row;
		int currentCol = currentNode.col;
		int endRow = endNode.row;
		int endCol = endNode.col;

		return Math.Abs(currentRow - endRow) + Math.Abs(currentCol - endCol);
	}

	List<Node> getNeightboringNodes(Node node, List<List<Node> > nodes) {
		List<Node> neighbors = new List<Node>();

		int numRows = nodes.Count;
		int numCols = nodes[0].Count;

		int row = node.row;
		int col = node.col;

		if (row < numRows - 1) { // DOWN
			neighbors.Add(nodes[row + 1][col]);
		}

		if (row > 0) { // UP
			neighbors.Add(nodes[row - 1][col]);
		}

		if (col < numCols - 1) { // RIGHT
			neighbors.Add(nodes[row][col + 1]);
		}

		if (col > 0) { // LEFT
			neighbors.Add(nodes[row][col - 1]);
		}

		return neighbors;
	}

	int[][] reconstructPath(Node endNode) {
		if (endNode.cameFrom == null) {
			return new int[][] {};
		}

		Node currentNode = endNode;
		List<List<int> > path = new List<List<int> >();

		while (currentNode != null) {
			List<int> nodeData = new List<int>();
			nodeData.Add(currentNode.row);
			nodeData.Add(currentNode.col);
			path.Add(nodeData);
			currentNode = currentNode.cameFrom;
		}

		// convert path to return type int[][] and reverse
		int[][] res = new int[path.Count][];
		for (int i=0; i<res.Length; i++) {
			res[i] = path[res.Length-1-i].ToArray();
		}

		return res;
	}

	public class Node {
		public string id;
		public int row;
		public int col;
		public int value;
		public int distanceFromStart;
		public int estimatedDistanceToEnd;
		public Node cameFrom;

		public Node(int row, int col, int value) {
			this.id = row.ToString() + '-' + col.ToString();
			this.row = row;
			this.col = col;
			this.value = value;
			this.distanceFromStart = Int32.MaxValue;
			this.estimatedDistanceToEnd = Int32.MaxValue;
			this.cameFrom = null;
		}
	};

	public class MinHeap {
		List<Node> heap = new List<Node>();
		Dictionary<string, int> nodePositionsInHeap = new Dictionary<string, int>();

		public MinHeap(List<Node> array) {
			for (int i = 0; i < array.Count; i++) {
				Node node = array[i];
				nodePositionsInHeap[node.id] = i;
			}
			heap = buildHeap(array);
		}

		// O(n) time | O(1) space
		List<Node> buildHeap(List<Node> array) {
			int firstParentIdx = (array.Count - 2) / 2;
			for (int currentIdx = firstParentIdx + 1; currentIdx >= 0; currentIdx--) {
				siftDown(currentIdx, array.Count - 1, array);
			}
			return array;
		}

		public bool isEmpty() {
			return heap.Count == 0;
		}

		// O(log(n)) time | O(1) space
		void siftDown(int currentIdx, int endIdx, List<Node> array) {
			int childOneIdx = currentIdx * 2 + 1;
			while (childOneIdx <= endIdx) {
				int childTwoIdx = currentIdx * 2 + 2 <=
				  endIdx ? currentIdx * 2 + 2 : -1;
				int idxToSwap;
				if (childTwoIdx != -1 &&
				  array[childTwoIdx].estimatedDistanceToEnd <
				  heap[childOneIdx].estimatedDistanceToEnd) {
					idxToSwap = childTwoIdx;
				} else {
					idxToSwap = childOneIdx;
				}
				if (array[idxToSwap].estimatedDistanceToEnd <
				  array[currentIdx].estimatedDistanceToEnd) {
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
			  heap[currentIdx].estimatedDistanceToEnd <
			  heap[parentIdx].estimatedDistanceToEnd) {
				swap(currentIdx, parentIdx);
				currentIdx = parentIdx;
				parentIdx = (currentIdx - 1) / 2;
			}
		}

		public Node Remove() {
			if (isEmpty()) {
				return null;
			}

			swap(0, heap.Count - 1);
			Node node = heap[heap.Count - 1];
			heap.RemoveAt(heap.Count - 1);
			nodePositionsInHeap.Remove(node.id);
			siftDown(0, heap.Count - 1, heap);
			return node;
		}

		public void Insert(Node node) {
			heap.Add(node);
			nodePositionsInHeap[node.id] = heap.Count - 1;
			siftUp(heap.Count - 1);
		}

		public void Update(Node node) {
			siftUp(nodePositionsInHeap[node.id]);
		}

		public bool ContainsNode(Node node) {
			return nodePositionsInHeap.ContainsKey(node.id);
		}

		void swap(int i, int j) {
			nodePositionsInHeap[heap[i].id] = j;
			nodePositionsInHeap[heap[j].id] = i;
			Node temp = heap[i];
			heap[i] = heap[j];
			heap[j] = temp;
		}
	};
}


```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"fmt"
	"math"
)

// O(w * h * log(w * h)) time | O(w * h) space - where
// w is the width of the graph and h is the height
func AStarAlgorithm(startRow int, startCol int, endRow int, endCol int, graph [][]int) [][]int {
	nodes := initializeNodes(graph)

	startNode := nodes[startRow][startCol]
	endNode := nodes[endRow][endCol]

	startNode.distanceFromStart = 0
	startNode.estimatedDistanceToEnd = calculateManhattanDistance(startNode, endNode)

	nodesToVisit := newMinHeap([]*Node{startNode})

	for !nodesToVisit.IsEmpty() {
		currentMinDistanceNode := nodesToVisit.Remove()
		if currentMinDistanceNode == endNode {
			break
		}

		neighbors := getNeighboringNodes(currentMinDistanceNode, nodes)
		for _, neighbor := range neighbors {
			if neighbor.value == 1 {
				continue
			}

			tentativeDistanceToNeighbor := currentMinDistanceNode.distanceFromStart + 1
			if tentativeDistanceToNeighbor >= neighbor.distanceFromStart {
				continue
			}

			neighbor.cameFrom = currentMinDistanceNode
			neighbor.distanceFromStart = tentativeDistanceToNeighbor
			neighbor.estimatedDistanceToEnd = tentativeDistanceToNeighbor +
				calculateManhattanDistance(neighbor, endNode)

			if !nodesToVisit.containsNode(neighbor) {
				nodesToVisit.Insert(neighbor)
			} else {
				nodesToVisit.Update(neighbor)
			}
		}
	}

	return reconstructPath(endNode)
}

type Node struct {
	id                     string
	row                    int
	col                    int
	value                  int
	distanceFromStart      int
	estimatedDistanceToEnd int
	cameFrom               *Node
}

func newNode(row, col, value int) *Node {
	return &Node{
		id:                     fmt.Sprintf("%d-%d", row, col),
		row:                    row,
		col:                    col,
		value:                  value,
		distanceFromStart:      math.MaxInt32,
		estimatedDistanceToEnd: math.MaxInt32,
		cameFrom:               nil,
	}
}

func initializeNodes(graph [][]int) [][]*Node {
	nodes := make([][]*Node, 0)
	for row := range graph {
		newRow := make([]*Node, 0)
		for col := range graph[0] {
			value := graph[row][col]
			newRow = append(newRow, newNode(row, col, value))
		}
		nodes = append(nodes, newRow)
	}
	return nodes
}

func calculateManhattanDistance(currentNode *Node, endNode *Node) int {
	return abs(currentNode.col-endNode.col) + abs(currentNode.row-endNode.row)
}

func getNeighboringNodes(node *Node, nodes [][]*Node) []*Node {
	neighbors := make([]*Node, 0)
	numRows := len(nodes)
	numCols := len(nodes[0])

	row := node.row
	col := node.col

	if row < numRows-1 {
		neighbors = append(neighbors, nodes[row+1][col])
	} // DOWN
	if row > 0 {
		neighbors = append(neighbors, nodes[row-1][col])
	} // UP
	if col < numCols-1 {
		neighbors = append(neighbors, nodes[row][col+1])
	} // RIGHT
	if col > 0 {
		neighbors = append(neighbors, nodes[row][col-1])
	} // LEFT

	return neighbors
}

func reconstructPath(endNode *Node) [][]int {
	if endNode.cameFrom == nil {
		return [][]int{}
	}

	currentNode := endNode
	path := make([][]int, 0)
	for currentNode != nil {
		path = append(path, []int{currentNode.row, currentNode.col})
		currentNode = currentNode.cameFrom
	}
	return reversePath(path)
}

func reversePath(path [][]int) [][]int {
	newPath := make([][]int, len(path))
	for i := range path {
		j := len(path) - i - 1
		newPath[i] = path[j]
	}
	return newPath
}

func abs(a int) int {
	if a > 0 {
		return a
	}
	return -a
}

type MinHeap struct {
	array               []*Node
	nodePositionsInHeap map[string]int
}

func newMinHeap(array []*Node) *MinHeap {
	nodePositionsInHeap := map[string]int{}
	for i, node := range array {
		nodePositionsInHeap[node.id] = i
	}
	heap := &MinHeap{array: array, nodePositionsInHeap: nodePositionsInHeap}
	heap.buildHeap()
	return heap
}

func (h *MinHeap) IsEmpty() bool { return len(h.array) == 0 }

// O(log(n)) time | O(1) space
func (h *MinHeap) Remove() *Node {
	if h.IsEmpty() {
		return nil
	}

	h.swap(0, len(h.array)-1)

	peeked := h.array[len(h.array)-1]
	h.array = h.array[0 : len(h.array)-1]

	delete(h.nodePositionsInHeap, peeked.id)
	h.siftDown(0, len(h.array)-1)
	return peeked
}

// O(log(n)) time | O(1) space
func (h *MinHeap) Update(node *Node) {
	h.siftUp(h.nodePositionsInHeap[node.id])
}

// O(log(n)) time | O(1) space
func (h *MinHeap) Insert(node *Node) {
	h.array = append(h.array, node)
	h.nodePositionsInHeap[node.id] = len(h.array) - 1
	h.siftUp(len(h.array) - 1)
}

func (h *MinHeap) containsNode(node *Node) bool {
	_, found := h.nodePositionsInHeap[node.id]
	return found
}

func (h MinHeap) swap(i, j int) {
	h.nodePositionsInHeap[h.array[i].id] = j
	h.nodePositionsInHeap[h.array[j].id] = i
	h.array[i], h.array[j] = h.array[j], h.array[i]
}

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
		c1Distance := h.array[childOneIdx].estimatedDistanceToEnd
		if childTwoIdx > -1 && h.array[childTwoIdx].estimatedDistanceToEnd < c1Distance {
			indexToSwap = childTwoIdx
		}

		if h.array[indexToSwap].estimatedDistanceToEnd < h.array[currentIdx].estimatedDistanceToEnd {
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
	for currentIdx > 0 && h.array[currentIdx].estimatedDistanceToEnd < h.array[parentIdx].estimatedDistanceToEnd {
		h.swap(currentIdx, parentIdx)
		currentIdx = parentIdx
		parentIdx = (currentIdx - 1) / 2
	}
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  class Node {
    String id;
    int row;
    int col;
    int value;
    int distanceFromStart;
    int estimatedDistanceToEnd;
    Node cameFrom;

    Node(int row, int col, int value) {
      this.id = String.valueOf(row) + '-' + String.valueOf(col);
      this.row = row;
      this.col = col;
      this.value = value;
      this.distanceFromStart = Integer.MAX_VALUE;
      this.estimatedDistanceToEnd = Integer.MAX_VALUE;
      this.cameFrom = null;
    }
  };

  class MinHeap {
    List<Node> heap = new ArrayList<Node>();
    Map<String, Integer> nodePositionsInHeap = new HashMap<String, Integer>();

    public MinHeap(List<Node> array) {
      for (int i = 0; i < array.size(); i++) {
        Node node = array.get(i);
        nodePositionsInHeap.put(node.id, i);
      }
      heap = buildHeap(array);
    }

    // O(n) time | O(1) space
    List<Node> buildHeap(List<Node> array) {
      int firstParentIdx = (array.size() - 2) / 2;
      for (int currentIdx = firstParentIdx + 1; currentIdx >= 0; currentIdx--) {
        siftDown(currentIdx, array.size() - 1, array);
      }
      return array;
    }

    boolean isEmpty() {
      return heap.size() == 0;
    }

    // O(log(n)) time | O(1) space
    void siftDown(int currentIdx, int endIdx, List<Node> array) {
      int childOneIdx = currentIdx * 2 + 1;
      while (childOneIdx <= endIdx) {
        int childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
        int idxToSwap;
        if (childTwoIdx != -1
            && array.get(childTwoIdx).estimatedDistanceToEnd
                < heap.get(childOneIdx).estimatedDistanceToEnd) {
          idxToSwap = childTwoIdx;
        } else {
          idxToSwap = childOneIdx;
        }
        if (array.get(idxToSwap).estimatedDistanceToEnd
            < array.get(currentIdx).estimatedDistanceToEnd) {
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
      while (currentIdx > 0
          && heap.get(currentIdx).estimatedDistanceToEnd
              < heap.get(parentIdx).estimatedDistanceToEnd) {
        swap(currentIdx, parentIdx);
        currentIdx = parentIdx;
        parentIdx = (currentIdx - 1) / 2;
      }
    }

    Node remove() {
      if (isEmpty()) {
        return null;
      }

      swap(0, heap.size() - 1);
      Node node = heap.get(heap.size() - 1);
      heap.remove(heap.size() - 1);
      nodePositionsInHeap.remove(node.id);
      siftDown(0, heap.size() - 1, heap);
      return node;
    }

    void insert(Node node) {
      heap.add(node);
      nodePositionsInHeap.put(node.id, heap.size() - 1);
      siftUp(heap.size() - 1);
    }

    void swap(int i, int j) {
      nodePositionsInHeap.put(heap.get(i).id, j);
      nodePositionsInHeap.put(heap.get(j).id, i);
      Node temp = heap.get(i);
      heap.set(i, heap.get(j));
      heap.set(j, temp);
    }

    boolean containsNode(Node node) {
      return nodePositionsInHeap.containsKey(node.id);
    }

    void update(Node node) {
      siftUp(nodePositionsInHeap.get(node.id));
    }
  };

  // O(w * h * log(w * h)) time | O(w * h) space - where
  // w is the width of the graph and h is the height
  public int[][] aStarAlgorithm(int startRow, int startCol, int endRow, int endCol, int[][] graph) {
    List<List<Node>> nodes = initializeNodes(graph);
    Node startNode = nodes.get(startRow).get(startCol);
    Node endNode = nodes.get(endRow).get(endCol);

    startNode.distanceFromStart = 0;
    startNode.estimatedDistanceToEnd = calculateManhattanDistance(startNode, endNode);

    List<Node> nodesToVisitList = new ArrayList<Node>();
    nodesToVisitList.add(startNode);
    MinHeap nodesToVisit = new MinHeap(nodesToVisitList);

    while (!nodesToVisit.isEmpty()) {
      Node currentMinDistanceNode = nodesToVisit.remove();

      if (currentMinDistanceNode == endNode) {
        break;
      }

      List<Node> neighbors = getNeightboringNodes(currentMinDistanceNode, nodes);

      for (Node neighbor : neighbors) {
        if (neighbor.value == 1) {
          continue;
        }

        int tentativeDistanceToNeighbor = currentMinDistanceNode.distanceFromStart + 1;

        if (tentativeDistanceToNeighbor >= neighbor.distanceFromStart) {
          continue;
        }

        neighbor.cameFrom = currentMinDistanceNode;
        neighbor.distanceFromStart = tentativeDistanceToNeighbor;
        neighbor.estimatedDistanceToEnd =
            tentativeDistanceToNeighbor + calculateManhattanDistance(neighbor, endNode);

        if (!nodesToVisit.containsNode(neighbor)) {
          nodesToVisit.insert(neighbor);
        } else {
          nodesToVisit.update(neighbor);
        }
      }
    }

    return reconstructPath(endNode);
  }

  List<List<Node>> initializeNodes(int[][] graph) {
    List<List<Node>> nodes = new ArrayList<List<Node>>();

    for (int i = 0; i < graph.length; i++) {
      List<Node> nodeList = new ArrayList<Node>();
      nodes.add(nodeList);
      for (int j = 0; j < graph[i].length; j++) {
        nodes.get(i).add(new Node(i, j, graph[i][j]));
      }
    }

    return nodes;
  }

  int calculateManhattanDistance(Node currentNode, Node endNode) {
    int currentRow = currentNode.row;
    int currentCol = currentNode.col;
    int endRow = endNode.row;
    int endCol = endNode.col;

    return Math.abs(currentRow - endRow) + Math.abs(currentCol - endCol);
  }

  List<Node> getNeightboringNodes(Node node, List<List<Node>> nodes) {
    List<Node> neighbors = new ArrayList<Node>();

    int numRows = nodes.size();
    int numCols = nodes.get(0).size();

    int row = node.row;
    int col = node.col;

    if (row < numRows - 1) { // DOWN
      neighbors.add(nodes.get(row + 1).get(col));
    }

    if (row > 0) { // UP
      neighbors.add(nodes.get(row - 1).get(col));
    }

    if (col < numCols - 1) { // RIGHT
      neighbors.add(nodes.get(row).get(col + 1));
    }

    if (col > 0) { // LEFT
      neighbors.add(nodes.get(row).get(col - 1));
    }

    return neighbors;
  }

  int[][] reconstructPath(Node endNode) {
    if (endNode.cameFrom == null) {
      return new int[][] {};
    }

    Node currentNode = endNode;
    List<List<Integer>> path = new ArrayList<List<Integer>>();

    while (currentNode != null) {
      List<Integer> nodeData = new ArrayList<Integer>();
      nodeData.add(currentNode.row);
      nodeData.add(currentNode.col);
      path.add(nodeData);
      currentNode = currentNode.cameFrom;
    }

    // convert path to return type int[][] and reverse
    int[][] res = new int[path.size()][2];
    for (int i = 0; i < res.length; i++) {
      res[i][0] = path.get(res.length - 1 - i).get(0);
      res[i][1] = path.get(res.length - 1 - i).get(1);
    }

    return res;
  }
}

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Node {
  constructor(row, col, value) {
    this.id = row.toString() + '-' + col.toString();
    this.row = row;
    this.col = col;
    this.value = value;
    this.distanceFromStart = Infinity;
    this.estimatedDistanceToEnd = Infinity;
    this.cameFrom = null;
  }
}

// O(w * h * log(w * h)) time | O(w * h) space - where
// w is the width of the graph and h is the height
function aStarAlgorithm(startRow, startCol, endRow, endCol, graph) {
  const nodes = initializeNodes(graph);

  const startNode = nodes[startRow][startCol];
  const endNode = nodes[endRow][endCol];

  startNode.distanceFromStart = 0;
  startNode.estimatedDistanceToEnd = calculateManhattanDistance(startNode, endNode);

  const nodesToVisit = new MinHeap([startNode]);

  while (!nodesToVisit.isEmpty()) {
    const currentMinDistanceNode = nodesToVisit.remove();

    if (currentMinDistanceNode === endNode) break;

    const neighbors = getNeighboringNodes(currentMinDistanceNode, nodes);
    for (const neighbor of neighbors) {
      if (neighbor.value == 1) continue;

      const tentativeDistanceToNeighbor = currentMinDistanceNode.distanceFromStart + 1;

      if (tentativeDistanceToNeighbor >= neighbor.distanceFromStart) continue;

      neighbor.cameFrom = currentMinDistanceNode;
      neighbor.distanceFromStart = tentativeDistanceToNeighbor;
      neighbor.estimatedDistanceToEnd = tentativeDistanceToNeighbor + calculateManhattanDistance(neighbor, endNode);

      if (!nodesToVisit.containsNode(neighbor)) {
        nodesToVisit.insert(neighbor);
      } else {
        nodesToVisit.update(neighbor);
      }
    }
  }

  return reconstructPath(endNode);
}

function initializeNodes(graph) {
  const nodes = [];

  for (const [i, row] of graph.entries()) {
    nodes.push([]);
    for (const [j, value] of row.entries()) {
      const node = new Node(i, j, value);
      nodes[i].push(node);
    }
  }

  return nodes;
}

function calculateManhattanDistance(currentNode, endNode) {
  const currentRow = currentNode.row;
  const currentCol = currentNode.col;
  const endRow = endNode.row;
  const endCol = endNode.col;

  return Math.abs(currentRow - endRow) + Math.abs(currentCol - endCol);
}

function getNeighboringNodes(node, nodes) {
  const neighbors = [];

  const numRows = nodes.length;
  const numCols = nodes[0].length;

  const row = node.row;
  const col = node.col;

  if (row < numRows - 1) {
    // DOWN
    neighbors.push(nodes[row + 1][col]);
  }

  if (row > 0) {
    // UP
    neighbors.push(nodes[row - 1][col]);
  }

  if (col < numCols - 1) {
    // RIGHT
    neighbors.push(nodes[row][col + 1]);
  }

  if (col > 0) {
    // LEFT
    neighbors.push(nodes[row][col - 1]);
  }

  return neighbors;
}

function reconstructPath(endNode) {
  if (endNode.cameFrom == null) {
    return [];
  }

  let currentNode = endNode;
  const path = [];

  while (currentNode != null) {
    path.push([currentNode.row, currentNode.col]);
    currentNode = currentNode.cameFrom;
  }

  path.reverse(); // reverse path so it goes from start to end

  return path;
}

class MinHeap {
  constructor(array) {
    // Holds the position in the heap that each node is at
    this.nodePositionsInHeap = array.reduce((obj, node, i) => {
      obj[node.id] = i;
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
      if (childTwoIdx !== -1 && heap[childTwoIdx].estimatedDistanceToEnd < heap[childOneIdx].estimatedDistanceToEnd) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }
      if (heap[idxToSwap].estimatedDistanceToEnd < heap[currentIdx].estimatedDistanceToEnd) {
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
    while (currentIdx > 0 && heap[currentIdx].estimatedDistanceToEnd < heap[parentIdx].estimatedDistanceToEnd) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  // O(log(n)) time | O(1) space
  remove() {
    if (this.isEmpty()) return;

    this.swap(0, this.heap.length - 1, this.heap);
    const node = this.heap.pop();
    delete this.nodePositionsInHeap[node.id];
    this.siftDown(0, this.heap.length - 1, this.heap);
    return node;
  }

  // O(log(n)) time | O(1) space
  insert(node) {
    this.heap.push(node);
    this.nodePositionsInHeap[node.id] = this.heap.length - 1;
    this.siftUp(this.heap.length - 1, this.heap);
  }

  swap(i, j, heap) {
    this.nodePositionsInHeap[this.heap[i].id] = j;
    this.nodePositionsInHeap[this.heap[j].id] = i;
    const temp = heap[j];
    heap[j] = heap[i];
    heap[i] = temp;
  }

  containsNode(node) {
    return node.id in this.nodePositionsInHeap;
  }

  update(node) {
    this.siftUp(this.nodePositionsInHeap[node.id], this.heap);
  }
}

// Do not edit the line below.
exports.aStarAlgorithm = aStarAlgorithm;

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.abs

class Node(row: Int, col: Int, value: Int) {
    val id = row.toString() + "-" + col.toString()
    val row = row
    val col = col
    val value = value
    var distanceFromStart = Int.MAX_VALUE
    var estimatedDistanceToEnd = Int.MAX_VALUE
    var cameFrom: Node? = null
}

// O(w * h * log(w * h)) time | O(w * h) space - where
// w is the width of the graph and h is the height
fun aStarAlgorithm(startRow: Int, startCol: Int, endRow: Int, endCol: Int, graph: List<List<Int>>): List<List<Int>> {
    val nodes = initializeNodes(graph)

    val startNode = nodes[startRow][startCol]
    val endNode = nodes[endRow][endCol]

    startNode.distanceFromStart = 0
    startNode.estimatedDistanceToEnd = calculateManhattanDistance(startNode, endNode)

    val nodesToVisit = MinHeap(mutableListOf(startNode))

    while (!nodesToVisit.isEmpty()) {
        val currentMinDistanceNode = nodesToVisit.remove()!!

        if (currentMinDistanceNode == endNode) break

        val neighbors = getNeighboringNodes(currentMinDistanceNode, nodes)
        for (neighbor in neighbors) {
            if (neighbor.value == 1) continue

            val tentativeDistanceToNeighbor = currentMinDistanceNode.distanceFromStart + 1

            if (tentativeDistanceToNeighbor >= neighbor.distanceFromStart) continue

            neighbor.cameFrom = currentMinDistanceNode
            neighbor.distanceFromStart = tentativeDistanceToNeighbor
            neighbor.estimatedDistanceToEnd = tentativeDistanceToNeighbor + calculateManhattanDistance(neighbor, endNode)

            if (!nodesToVisit.containsNode(neighbor)) {
                nodesToVisit.insert(neighbor)
            } else {
                nodesToVisit.update(neighbor)
            }
        }
    }

    return reconstructPath(endNode)
}

fun initializeNodes(graph: List<List<Int>>): List<List<Node>> {
    val nodes = mutableListOf<MutableList<Node>>()
    for (row in 0 until graph.size) {
        val newRow = mutableListOf<Node>()
        for (col in 0 until graph[0].size) {
            val value = graph[row][col]
            newRow.add(Node(row, col, value))
        }
        nodes.add(newRow)
    }
    return nodes
}

fun calculateManhattanDistance(currentNode: Node, endNode: Node): Int {
    val currentRow = currentNode.row
    val currentCol = currentNode.col
    val endRow = endNode.row
    val endCol = endNode.col

    return abs(currentCol - endCol) + abs(currentRow - endRow)
}

fun getNeighboringNodes(node: Node, nodes: List<List<Node>>): List<Node> {
    val neighbors = mutableListOf<Node>()

    val numRows = nodes.size
    val numCols = nodes[0].size

    val row = node.row
    val col = node.col

    if (row < numRows - 1) neighbors.add(nodes[row + 1][col]) // DOWN
    if (row > 0) neighbors.add(nodes[row - 1][col]) // UP
    if (col < numCols - 1) neighbors.add(nodes[row][col + 1]) // RIGHT
    if (col > 0) neighbors.add(nodes[row][col - 1]) // LEFT

    return neighbors
}

fun reconstructPath(endNode: Node): List<List<Int>> {
    if (endNode.cameFrom == null) return listOf()

    var currentNode: Node? = endNode
    val path = mutableListOf<List<Int>>()

    while (currentNode != null) {
        path.add(listOf(currentNode.row, currentNode.col))
        currentNode = currentNode.cameFrom
    }

    path.reverse()
    return path
}

open class MinHeap(array: MutableList<Node>) {
    // Holds the position in the heap that each node is at
    val nodePositionsInHeap = array.mapIndexed() { i, node -> Pair(i, node) }.associate({ it.second.id to it.first }).toMutableMap()
    val heap = this.buildHeap(array)

    // O(n) time | O(1) space
    fun buildHeap(array: MutableList<Node>): MutableList<Node> {
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
    fun siftDown(currentIdx: Int, endIdx: Int, heap: MutableList<Node>) {
        var newCurrentIdx = currentIdx
        var childOneIdx = currentIdx * 2 + 1
        while (childOneIdx <= endIdx) {
            var childTwoIdx = if (newCurrentIdx * 2 + 2 <= endIdx) newCurrentIdx * 2 + 2 else -1
            var idxToSwap: Int
            if (childTwoIdx != -1 && heap[childTwoIdx].estimatedDistanceToEnd < heap[childOneIdx].estimatedDistanceToEnd) {
                idxToSwap = childTwoIdx
            } else {
                idxToSwap = childOneIdx
            }
            if (heap[idxToSwap].estimatedDistanceToEnd < heap[newCurrentIdx].estimatedDistanceToEnd) {
                this.swap(newCurrentIdx, idxToSwap, heap)
                newCurrentIdx = idxToSwap
                childOneIdx = newCurrentIdx * 2 + 1
            } else {
                return
            }
        }
    }

    // O(log(n)) time | O(1) space
    fun siftUp(currentIdx: Int, heap: MutableList<Node>) {
        var newCurrentIdx = currentIdx
        var parentIdx = (currentIdx - 1) / 2
        while (newCurrentIdx > 0 && heap[newCurrentIdx].estimatedDistanceToEnd < heap[parentIdx].estimatedDistanceToEnd) {
            this.swap(newCurrentIdx, parentIdx, heap)
            newCurrentIdx = parentIdx
            parentIdx = (newCurrentIdx - 1) / 2
        }
    }

    // O(log(n)) time | O(1) space
    fun remove(): Node? {
        if (this.isEmpty()) return null

        this.swap(0, this.heap.size - 1, this.heap)
        val node = this.heap.removeAt(this.heap.size - 1)
        this.nodePositionsInHeap.remove(node.id)
        this.siftDown(0, this.heap.size - 1, this.heap)
        return node
    }

    // O(log(n)) time | O(1) space
    fun insert(node: Node) {
        this.heap.add(node)
        this.nodePositionsInHeap[node.id] = this.heap.size - 1
        this.siftUp(this.heap.size - 1, this.heap)
    }

    fun swap(i: Int, j: Int, heap: MutableList<Node>) {
        this.nodePositionsInHeap[heap[i].id] = j
        this.nodePositionsInHeap[heap[j].id] = i
        val temp = heap[j]
        heap[j] = heap[i]
        heap[i] = temp
    }

    fun containsNode(node: Node): Boolean {
        return node.id in this.nodePositionsInHeap
    }

    fun update(node: Node) {
        this.siftUp(this.nodePositionsInHeap[node.id]!!, this.heap)
    }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(w * h * log(w * h)) time | O(w * h) space - where
  // w is the width of the graph and h is the height
  func aStarAlgorithm(_ startRow: Int, _ startCol: Int, _ endRow: Int, _ endCol: Int, _ graph: [[Int]]) -> [[Int]] {
    var nodes = initializeNodes(graph)

    let startNode = nodes[startRow][startCol]
    let endNode = nodes[endRow][endCol]

    startNode.distanceFromStart = 0
    startNode.estimatedDistanceToEnd = calculateManhattanDistance(startNode, endNode)

    var startNodes = [startNode]
    let nodesToVisit = MinHeap(&startNodes)

    while !nodesToVisit.isEmpty() {
      let currentMinDistanceNode = nodesToVisit.remove()!
      if currentMinDistanceNode == endNode {
        break
      }

      let neighbors = getNeighboringNodes(currentMinDistanceNode, nodes)
      for neighbor in neighbors {
        if neighbor.value == 1 {
          continue
        }

        let tentativeDistanceToNeighbor = currentMinDistanceNode.distanceFromStart + 1
        if tentativeDistanceToNeighbor >= neighbor.distanceFromStart {
          continue
        }

        neighbor.cameFrom = currentMinDistanceNode
        neighbor.distanceFromStart = tentativeDistanceToNeighbor
        neighbor.estimatedDistanceToEnd = tentativeDistanceToNeighbor +
          calculateManhattanDistance(neighbor, endNode)

        if !nodesToVisit.containsNode(neighbor) {
          nodesToVisit.insert(neighbor)
        } else {
          nodesToVisit.update(neighbor)
        }
      }
    }
    return reconstructPath(endNode)
  }

  class Node {
    let id: String
    let row: Int
    let col: Int
    let value: Int
    var distanceFromStart: Int
    var estimatedDistanceToEnd: Int
    var cameFrom: Node?

    init(_ row: Int, _ col: Int, _ value: Int) {
      id = String(row) + "-" + String(col)
      self.row = row
      self.col = col
      self.value = value
      distanceFromStart = Int.max
      estimatedDistanceToEnd = Int.max
      cameFrom = nil
    }

    static func == (lhs: Node, rhs: Node) -> Bool {
      return lhs.id == rhs.id
    }
  }

  func initializeNodes(_ graph: [[Int]]) -> [[Node]] {
    var nodes = [[Node]]()
    for row in 0 ..< graph.count {
      var newRow = [Node]()
      for col in 0 ..< graph[0].count {
        let value = graph[row][col]
        newRow.append(Node(row, col, value))
      }
      nodes.append(newRow)
    }
    return nodes
  }

  func calculateManhattanDistance(_ currentNode: Node, _ endNode: Node) -> Int {
    return abs(currentNode.col - endNode.col) + abs(currentNode.row - endNode.row)
  }

  func getNeighboringNodes(_ node: Node, _ nodes: [[Node]]) -> [Node] {
    var neighbors = [Node]()
    let numRows = nodes.count
    let numCols = nodes[0].count

    let row = node.row
    let col = node.col

    if row < numRows - 1 {
      neighbors.append(nodes[row + 1][col])
    } // DOWN
    if row > 0 {
      neighbors.append(nodes[row - 1][col])
    } // UP
    if col < numCols - 1 {
      neighbors.append(nodes[row][col + 1])
    } // RIGHT
    if col > 0 {
      neighbors.append(nodes[row][col - 1])
    } // LEFT

    return neighbors
  }

  func reconstructPath(_ endNode: Node) -> [[Int]] {
    if endNode.cameFrom == nil {
      return [[Int]]()
    }

    var currentNode: Node? = endNode
    var path = [[Int]]()
    while currentNode != nil {
      path.append([currentNode!.row, currentNode!.col])
      currentNode = currentNode!.cameFrom
    }
    return reversePath(path)
  }

  func reversePath(_ path: [[Int]]) -> [[Int]] {
    var newPath = [[Int]]()
    for i in 0 ..< path.count {
      let j = path.count - i - 1
      newPath.append(path[j])
    }
    return newPath
  }

  class MinHeap {
    var heap = [Node]()
    var nodePositionsInHeap = [String: Int]()

    init(_ array: inout [Node]) {
      for (i, node) in array.enumerated() {
        nodePositionsInHeap[node.id] = i
      }
      heap = array
      buildHeap(array: &array)
    }

    // O(n) time | O(1) space
    func buildHeap(array: inout [Node]) {
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
        if childTwoIndex > -1, heap[childTwoIndex].estimatedDistanceToEnd < heap[childOneIndex].estimatedDistanceToEnd {
          indexToSwap = childTwoIndex
        }

        if heap[indexToSwap].estimatedDistanceToEnd < heap[current].estimatedDistanceToEnd {
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

      while currentIndex > 0, heap[currentIndex].estimatedDistanceToEnd < heap[parentIndex].estimatedDistanceToEnd {
        swap(currentIndex, parentIndex)
        currentIndex = parentIndex
        parentIndex = (currentIndex - 1) / 2
      }
    }

    // O(log(n)) time | O(1) space
    func remove() -> Node? {
      if isEmpty() {
        return nil
      }

      let l = heap.count
      swap(0, l - 1)
      let peeked = heap[l - 1]
      heap.removeLast()
      nodePositionsInHeap.removeValue(forKey: peeked.id)
      siftDown(0, l - 2)
      return peeked
    }

    // O(log(n)) time | O(1) space
    func update(_ node: Node) {
      siftUp(nodePositionsInHeap[node.id]!)
    }

    // O(log(n)) time | O(1) space
    func insert(_ node: Node) {
      heap.append(node)
      nodePositionsInHeap[node.id] = heap.count - 1
      siftUp(heap.count - 1)
    }

    func swap(_ i: Int, _ j: Int) {
      nodePositionsInHeap[heap[i].id] = j
      nodePositionsInHeap[heap[j].id] = i

      let temp = heap[i]
      heap[i] = heap[j]
      heap[j] = temp
    }

    func isEmpty() -> Bool {
      return heap.count == 0
    }

    func containsNode(_ node: Node) -> Bool {
      return nodePositionsInHeap[node.id] != nil
    }
  }
}

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Node:
    def __init__(self, row, col, value):
        self.id = str(row) + "-" + str(col)
        self.row = row
        self.col = col
        self.value = value
        self.distanceFromStart = float("inf")
        self.estimatedDistanceToEnd = float("inf")
        self.cameFrom = None


# O(w * h * log(w * h)) time | O(w * h) space - where
# w is the width of the graph and h is the height
def aStarAlgorithm(startRow, startCol, endRow, endCol, graph):
    nodes = initializeNodes(graph)

    startNode = nodes[startRow][startCol]
    endNode = nodes[endRow][endCol]

    startNode.distanceFromStart = 0
    startNode.estimatedDistanceToEnd = calculateManhattanDistance(startNode, endNode)

    nodesToVisit = MinHeap([startNode])

    while not nodesToVisit.isEmpty():
        currentMinDistanceNode = nodesToVisit.remove()

        if currentMinDistanceNode == endNode:
            break

        neighbors = getNeighboringNodes(currentMinDistanceNode, nodes)
        for neighbor in neighbors:
            if neighbor.value == 1:
                continue

            tentativeDistanceToNeighbor = currentMinDistanceNode.distanceFromStart + 1

            if tentativeDistanceToNeighbor >= neighbor.distanceFromStart:
                continue

            neighbor.cameFrom = currentMinDistanceNode
            neighbor.distanceFromStart = tentativeDistanceToNeighbor
            neighbor.estimatedDistanceToEnd = tentativeDistanceToNeighbor + calculateManhattanDistance(
                neighbor, endNode
            )

            if not nodesToVisit.containsNode(neighbor):
                nodesToVisit.insert(neighbor)
            else:
                nodesToVisit.update(neighbor)

    return reconstructPath(endNode)


def initializeNodes(graph):
    nodes = []

    for i, row in enumerate(graph):
        nodes.append([])
        for j, value in enumerate(row):
            nodes[i].append(Node(i, j, value))

    return nodes


def calculateManhattanDistance(currentNode, endNode):
    currentRow = currentNode.row
    currentCol = currentNode.col
    endRow = endNode.row
    endCol = endNode.col

    return abs(currentRow - endRow) + abs(currentCol - endCol)


def getNeighboringNodes(node, nodes):
    neighbors = []

    numRows = len(nodes)
    numCols = len(nodes[0])

    row = node.row
    col = node.col

    if row < numRows - 1:  # DOWN
        neighbors.append(nodes[row + 1][col])

    if row > 0:  # UP
        neighbors.append(nodes[row - 1][col])

    if col < numCols - 1:  # RIGHT
        neighbors.append(nodes[row][col + 1])

    if col > 0:  # LEFT
        neighbors.append(nodes[row][col - 1])

    return neighbors


def reconstructPath(endNode):
    if not endNode.cameFrom:
        return []

    currentNode = endNode
    path = []

    while currentNode is not None:
        path.append([currentNode.row, currentNode.col])
        currentNode = currentNode.cameFrom

    return path[::-1]  # reverse path so it goes from start to end


class MinHeap:
    def __init__(self, array):
        # Holds the position in the heap that each node is at
        self.nodePositionsInHeap = {node.id: idx for idx, node in enumerate(array)}
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
            if (
                childTwoIdx != -1
                and heap[childTwoIdx].estimatedDistanceToEnd < heap[childOneIdx].estimatedDistanceToEnd
            ):
                idxToSwap = childTwoIdx
            else:
                idxToSwap = childOneIdx
            if heap[idxToSwap].estimatedDistanceToEnd < heap[currentIdx].estimatedDistanceToEnd:
                self.swap(currentIdx, idxToSwap, heap)
                currentIdx = idxToSwap
                childOneIdx = currentIdx * 2 + 1
            else:
                return

    # O(log(n)) time | O(1) space
    def siftUp(self, currentIdx, heap):
        parentIdx = (currentIdx - 1) // 2
        while currentIdx > 0 and heap[currentIdx].estimatedDistanceToEnd < heap[parentIdx].estimatedDistanceToEnd:
            self.swap(currentIdx, parentIdx, heap)
            currentIdx = parentIdx
            parentIdx = (currentIdx - 1) // 2

    # O(log(n)) time | O(1) space
    def remove(self):
        if self.isEmpty():
            return

        self.swap(0, len(self.heap) - 1, self.heap)
        node = self.heap.pop()
        del self.nodePositionsInHeap[node.id]
        self.siftDown(0, len(self.heap) - 1, self.heap)
        return node

    # O(log(n)) time | O(1) space
    def insert(self, node):
        self.heap.append(node)
        self.nodePositionsInHeap[node.id] = len(self.heap) - 1
        self.siftUp(len(self.heap) - 1, self.heap)

    def swap(self, i, j, heap):
        self.nodePositionsInHeap[heap[i].id] = j
        self.nodePositionsInHeap[heap[j].id] = i
        heap[i], heap[j] = heap[j], heap[i]

    def containsNode(self, node):
        return node.id in self.nodePositionsInHeap

    def update(self, node):
        self.siftUp(self.nodePositionsInHeap[node.id], self.heap)

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Node {
  id: string;
  row: number;
  col: number;
  value: number;
  distanceFromStart: number;
  estimatedDistanceToEnd: number;
  cameFrom: Node | null;

  constructor(row: number, col: number, value: number) {
    this.id = row.toString() + '-' + col.toString();
    this.row = row;
    this.col = col;
    this.value = value;
    this.distanceFromStart = Infinity;
    this.estimatedDistanceToEnd = Infinity;
    this.cameFrom = null;
  }
}

// O(w * h * log(w * h)) time | O(w * h) space - where
// w is the width of the graph and h is the height
export function aStarAlgorithm(startRow: number, startCol: number, endRow: number, endCol: number, graph: number[][]) {
  const nodes = initializeNodes(graph);

  const startNode = nodes[startRow][startCol];
  const endNode = nodes[endRow][endCol];

  startNode.distanceFromStart = 0;
  startNode.estimatedDistanceToEnd = calculateManhattanDistance(startNode, endNode);

  const nodesToVisit = new MinHeap([startNode]);

  while (!nodesToVisit.isEmpty()) {
    const currentMinDistanceNode = nodesToVisit.remove()!;

    if (currentMinDistanceNode === endNode) break;

    const neighbors = getNeighboringNodes(currentMinDistanceNode, nodes);
    for (const neighbor of neighbors) {
      if (neighbor.value == 1) continue;

      const tentativeDistanceToNeighbor = currentMinDistanceNode.distanceFromStart + 1;

      if (tentativeDistanceToNeighbor >= neighbor.distanceFromStart) continue;

      neighbor.cameFrom = currentMinDistanceNode;
      neighbor.distanceFromStart = tentativeDistanceToNeighbor;
      neighbor.estimatedDistanceToEnd = tentativeDistanceToNeighbor + calculateManhattanDistance(neighbor, endNode);

      if (!nodesToVisit.containsNode(neighbor)) {
        nodesToVisit.insert(neighbor);
      } else {
        nodesToVisit.update(neighbor);
      }
    }
  }

  return reconstructPath(endNode);
}

function initializeNodes(graph: number[][]) {
  const nodes: Node[][] = [];

  for (const [i, row] of graph.entries()) {
    nodes.push([]);
    for (const [j, value] of row.entries()) {
      const node = new Node(i, j, value);
      nodes[i].push(node);
    }
  }

  return nodes;
}

function calculateManhattanDistance(currentNode: Node, endNode: Node) {
  const currentRow = currentNode.row;
  const currentCol = currentNode.col;
  const endRow = endNode.row;
  const endCol = endNode.col;

  return Math.abs(currentRow - endRow) + Math.abs(currentCol - endCol);
}

function getNeighboringNodes(node: Node, nodes: Node[][]) {
  const neighbors: Node[] = [];

  const numRows = nodes.length;
  const numCols = nodes[0].length;

  const row = node.row;
  const col = node.col;

  if (row < numRows - 1) {
    // DOWN
    neighbors.push(nodes[row + 1][col]);
  }

  if (row > 0) {
    // UP
    neighbors.push(nodes[row - 1][col]);
  }

  if (col < numCols - 1) {
    // RIGHT
    neighbors.push(nodes[row][col + 1]);
  }

  if (col > 0) {
    // LEFT
    neighbors.push(nodes[row][col - 1]);
  }

  return neighbors;
}

function reconstructPath(endNode: Node) {
  if (endNode.cameFrom == null) {
    return [];
  }

  let currentNode: Node | null = endNode;
  const path: number[][] = [];

  while (currentNode != null) {
    path.push([currentNode.row, currentNode.col]);
    currentNode = currentNode.cameFrom;
  }

  path.reverse(); // reverse path so it goes from start to end

  return path;
}

class MinHeap {
  nodePositionsInHeap: {[id: string]: number};
  heap: Node[];

  constructor(array: Node[]) {
    // Holds the position in the heap that each node is at
    this.nodePositionsInHeap = array.reduce((obj, node, i) => {
      obj[node.id] = i;
      return obj;
    }, {} as {[id: string]: number});
    this.heap = this.buildHeap(array);
  }

  isEmpty() {
    return this.heap.length == 0;
  }

  // O(n) time | O(1) space
  buildHeap(array: Node[]) {
    const firstParentIdx = Math.floor((array.length - 2) / 2);
    for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
      this.siftDown(currentIdx, array.length - 1, array);
    }
    return array;
  }

  // O(log(n)) time | O(1) space
  siftDown(currentIdx: number, endIdx: number, heap: Node[]) {
    let childOneIdx = currentIdx * 2 + 1;
    while (childOneIdx <= endIdx) {
      const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
      let idxToSwap;
      if (childTwoIdx !== -1 && heap[childTwoIdx].estimatedDistanceToEnd < heap[childOneIdx].estimatedDistanceToEnd) {
        idxToSwap = childTwoIdx;
      } else {
        idxToSwap = childOneIdx;
      }
      if (heap[idxToSwap].estimatedDistanceToEnd < heap[currentIdx].estimatedDistanceToEnd) {
        this.swap(currentIdx, idxToSwap, heap);
        currentIdx = idxToSwap;
        childOneIdx = currentIdx * 2 + 1;
      } else {
        return;
      }
    }
  }

  // O(log(n)) time | O(1) space
  siftUp(currentIdx: number, heap: Node[]) {
    let parentIdx = Math.floor((currentIdx - 1) / 2);
    while (currentIdx > 0 && heap[currentIdx].estimatedDistanceToEnd < heap[parentIdx].estimatedDistanceToEnd) {
      this.swap(currentIdx, parentIdx, heap);
      currentIdx = parentIdx;
      parentIdx = Math.floor((currentIdx - 1) / 2);
    }
  }

  // O(log(n)) time | O(1) space
  remove() {
    if (this.isEmpty()) return;

    this.swap(0, this.heap.length - 1, this.heap);
    const node = this.heap.pop()!;
    delete this.nodePositionsInHeap[node.id];
    this.siftDown(0, this.heap.length - 1, this.heap);
    return node;
  }

  // O(log(n)) time | O(1) space
  insert(node: Node) {
    this.heap.push(node);
    this.nodePositionsInHeap[node.id] = this.heap.length - 1;
    this.siftUp(this.heap.length - 1, this.heap);
  }

  swap(i: number, j: number, heap: Node[]) {
    this.nodePositionsInHeap[this.heap[i].id] = j;
    this.nodePositionsInHeap[this.heap[j].id] = i;
    const temp = heap[j];
    heap[j] = heap[i];
    heap[i] = temp;
  }

  containsNode(node: Node) {
    return node.id in this.nodePositionsInHeap;
  }

  update(node: Node) {
    this.siftUp(this.nodePositionsInHeap[node.id], this.heap);
  }
}

```

