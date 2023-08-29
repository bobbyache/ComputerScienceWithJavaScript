# Airport Connections
<div class="html">
<p>
  <i
    >For the purpose of this question, the phrases "airport route" and "airport
    connection" are used interchangeably.</i
  >
</p>
<p>
  You're given a list of airports (three-letter codes like <span>"JFK"</span>),
  a list of routes (one-way flights from one airport to another like
  <span>["JFK", "SFO"]</span>), and a starting airport.
</p>
<p>
  Write a function that returns the minimum number of airport connections
  (one-way flights) that need to be added in order for someone to be able to
  reach any airport in the list, starting at the starting airport.
</p>
<p>
  Note that routes only allow you to fly in one direction; for instance,
  the route
  <span>["JFK", "SFO"]</span> only allows you to fly from <span>"JFK"</span> to
  <span>"SFO"</span>.
</p>
<p>
  Also note that the connections don't have to be direct; it's okay if an
  airport can only be reached from the starting airport by stopping at other
  airports first.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">airports</span> = [
  "BGI", "CDG", "DEL", "DOH", "DSM", "EWR", "EYW", "HND", "ICN",
  "JFK", "LGA", "LHR", "ORD", "SAN", "SFO", "SIN", "TLV", "BUD",
]
<span class="CodeEditor-promptParameter">routes</span> = [
  ["DSM", "ORD"],
  ["ORD", "BGI"],
  ["BGI", "LGA"],
  ["SIN", "CDG"],
  ["CDG", "SIN"],
  ["CDG", "BUD"],
  ["DEL", "DOH"],
  ["DEL", "CDG"],
  ["TLV", "DEL"],
  ["EWR", "HND"],
  ["HND", "ICN"],
  ["HND", "JFK"],
  ["ICN", "JFK"],
  ["JFK", "LGA"],
  ["EYW", "LHR"],
  ["LHR", "SFO"],
  ["SFO", "SAN"],
  ["SFO", "DSM"],
  ["SAN", "EYW"],
]
<span class="CodeEditor-promptParameter">startingAirport</span> = "LGA"
</pre>
<h3>Sample Output</h3>
<pre>
3 <span class="CodeEditor-promptComment">// ["LGA", "TLV"], ["LGA", "SFO"], and ["LGA", "EWR"]</span>
</pre>
</div>

Hint 1
<p>
Start by creating a graph out of the inputs. Each airport should be a vertex in the graph, and each route should be an edge. The graph should be directed with potential cycles, since it's possible for there to be round-trip flights between airports or for some series of flights to eventually lead back to an arbitrary starting point. How can this graph be useful?
</p>


Hint 2

<p>
Using the graph mentioned in Hint #1, try getting all of the airports that are unreachable from the starting airport. This can be done using depth-first search. Is the number of unreachable airports the answer? If not, what extra information do you need to get to the answer?
</p>


Hint 3

<p>
A single unreachable airport could have connections to a bunch of other unreachable airports, potentially making it more "valuable", since adding one connection to it would make many other airports reachable.
</p>


Hint 4

<p>
Calculate the number of unreachable airports that are reachable from each unreachable airport (this can be done using depth-first search), sort them in descending order according to this number, and count the minimum number of connections that need to be added by iterating through this sorted list of unreachable airports, removing every unreachable airport's unreachable connections as you go through the list.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

vector<string> AIRPORTS = {
    "BGI", "CDG", "DEL", "DOH", "DSM", "EWR", "EYW", "HND", "ICN",
    "JFK", "LGA", "LHR", "ORD", "SAN", "SFO", "SIN", "TLV", "BUD",
};

string STARTING_AIRPORT = "LGA";

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<string>> routes = {
          {"DSM", "ORD"}, {"ORD", "BGI"}, {"BGI", "LGA"}, {"SIN", "CDG"},
          {"CDG", "SIN"}, {"CDG", "BUD"}, {"DEL", "DOH"}, {"DEL", "CDG"},
          {"TLV", "DEL"}, {"EWR", "HND"}, {"HND", "ICN"}, {"HND", "JFK"},
          {"ICN", "JFK"}, {"JFK", "LGA"}, {"EYW", "LHR"}, {"LHR", "SFO"},
          {"SFO", "SAN"}, {"SFO", "DSM"}, {"SAN", "EYW"}};
      assert(airportConnections(AIRPORTS, routes, STARTING_AIRPORT) == 3);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

class AirportNode {
public:
  string airport;
  vector<string> connections;
  bool isReachable;
  vector<string> unreachableConnections;

  AirportNode(string airport) {
    this->airport = airport;
    connections = {};
    isReachable = true;
    unreachableConnections = {};
  }
};

unordered_map<string, AirportNode *>
createAirportGraph(vector<string> airports, vector<vector<string>> routes);
vector<AirportNode *>
getUnreachableAirportNodes(unordered_map<string, AirportNode *> airportGraph,
                           vector<string> airports, string startingAirport);
void depthFirstTraverseAirports(
    unordered_map<string, AirportNode *> airportGraph, string airport,
    unordered_map<string, bool> *visitedAirports);
void markUnreachableConnections(
    unordered_map<string, AirportNode *> airportGraph,
    vector<AirportNode *> unreachableAirportNodes);
void depthFirstAddUnreachableConnections(
    unordered_map<string, AirportNode *> airportGraph, string airport,
    vector<string> *unreachableConnections,
    unordered_map<string, bool> *visitedAirports);
int getMinNumberOfNewConnections(
    unordered_map<string, AirportNode *> airportGraph,
    vector<AirportNode *> unreachableAirportNodes);

// O(a * (a + r) + a + r + alog(a)) time | O(a + r) space - where a is the
// number of airports and r is the number of routes
int airportConnections(vector<string> airports, vector<vector<string>> routes,
                       string startingAirport) {
  unordered_map<string, AirportNode *> airportGraph =
      createAirportGraph(airports, routes);
  vector<AirportNode *> unreachableAirportNodes =
      getUnreachableAirportNodes(airportGraph, airports, startingAirport);
  markUnreachableConnections(airportGraph, unreachableAirportNodes);
  return getMinNumberOfNewConnections(airportGraph, unreachableAirportNodes);
}

// O(a + r) time | O(a + r) space
unordered_map<string, AirportNode *>
createAirportGraph(vector<string> airports, vector<vector<string>> routes) {
  unordered_map<string, AirportNode *> airportGraph = {};
  for (string airport : airports) {
    airportGraph[airport] = new AirportNode(airport);
  }
  for (vector<string> route : routes) {
    string airport = route[0];
    string connection = route[1];
    airportGraph[airport]->connections.push_back(connection);
  }
  return airportGraph;
}

// O(a + r) time | O(a) space
vector<AirportNode *>
getUnreachableAirportNodes(unordered_map<string, AirportNode *> airportGraph,
                           vector<string> airports, string startingAirport) {
  unordered_map<string, bool> visitedAirports = {};
  depthFirstTraverseAirports(airportGraph, startingAirport, &visitedAirports);

  vector<AirportNode *> unreachableAirportNodes = {};
  for (string airport : airports) {
    if (visitedAirports.find(airport) != visitedAirports.end())
      continue;
    AirportNode *airportNode = airportGraph[airport];
    airportNode->isReachable = false;
    unreachableAirportNodes.push_back(airportNode);
  }
  return unreachableAirportNodes;
}

void depthFirstTraverseAirports(
    unordered_map<string, AirportNode *> airportGraph, string airport,
    unordered_map<string, bool> *visitedAirports) {
  if (visitedAirports->find(airport) != visitedAirports->end())
    return;
  visitedAirports->insert({airport, true});
  vector<string> connections = airportGraph[airport]->connections;
  for (string connection : connections) {
    depthFirstTraverseAirports(airportGraph, connection, visitedAirports);
  }
}

// O(a * (a + r)) time | O(a) space
void markUnreachableConnections(
    unordered_map<string, AirportNode *> airportGraph,
    vector<AirportNode *> unreachableAirportNodes) {
  for (AirportNode *airportNode : unreachableAirportNodes) {
    string airport = airportNode->airport;
    vector<string> unreachableConnections = {};
    unordered_map<string, bool> visitedAirports = {};
    depthFirstAddUnreachableConnections(
        airportGraph, airport, &unreachableConnections, &visitedAirports);
    airportNode->unreachableConnections = unreachableConnections;
  }
}

void depthFirstAddUnreachableConnections(
    unordered_map<string, AirportNode *> airportGraph, string airport,
    vector<string> *unreachableConnections,
    unordered_map<string, bool> *visitedAirports) {
  if (airportGraph[airport]->isReachable)
    return;
  if (visitedAirports->find(airport) != visitedAirports->end())
    return;
  visitedAirports->insert({airport, true});
  unreachableConnections->push_back(airport);
  vector<string> connections = airportGraph[airport]->connections;
  for (string connection : connections) {
    depthFirstAddUnreachableConnections(
        airportGraph, connection, unreachableConnections, visitedAirports);
  }
}

// O(alog(a) + a + r) time | O(1) space
int getMinNumberOfNewConnections(
    unordered_map<string, AirportNode *> airportGraph,
    vector<AirportNode *> unreachableAirportNodes) {
  sort(unreachableAirportNodes.begin(), unreachableAirportNodes.end(),
       [](AirportNode *a1, AirportNode *a2) -> bool {
         return a2->unreachableConnections.size() <
                a1->unreachableConnections.size();
       });

  int numberOfNewConnections = 0;
  for (AirportNode *airportNode : unreachableAirportNodes) {
    if (airportNode->isReachable)
      continue;
    numberOfNewConnections++;
    for (string connection : airportNode->unreachableConnections) {
      airportGraph[connection]->isReachable = true;
    }
  }
  return numberOfNewConnections;
}

```
### Unit Tests 1 (cpp)
```cpp
vector<string> AIRPORTS = {
    "BGI", "CDG", "DEL", "DOH", "DSM", "EWR", "EYW", "HND", "ICN",
    "JFK", "LGA", "LHR", "ORD", "SAN", "SFO", "SIN", "TLV", "BUD",
};

string STARTING_AIRPORT = "LGA";

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<vector<string>> routes = {
          {"DSM", "ORD"}, {"ORD", "BGI"}, {"BGI", "LGA"}, {"SIN", "CDG"},
          {"CDG", "SIN"}, {"CDG", "BUD"}, {"DEL", "DOH"}, {"DEL", "CDG"},
          {"TLV", "DEL"}, {"EWR", "HND"}, {"HND", "ICN"}, {"HND", "JFK"},
          {"ICN", "JFK"}, {"JFK", "LGA"}, {"EYW", "LHR"}, {"LHR", "SFO"},
          {"SFO", "SAN"}, {"SFO", "DSM"}, {"SAN", "EYW"}};
      assert(airportConnections(AIRPORTS, routes, STARTING_AIRPORT) == 3);
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

public class ProgramTest {

	List<string> AIRPORTS = new List<string>(){
		"BGI",
		"CDG",
		"DEL",
		"DOH",
		"DSM",
		"EWR",
		"EYW",
		"HND",
		"ICN",
		"JFK",
		"LGA",
		"LHR",
		"ORD",
		"SAN",
		"SFO",
		"SIN",
		"TLV",
		"BUD"
	};

	string STARTING_AIRPORT = "LGA";

	[Test]
	public void TestCase1() {
		List<List<string> > routes = new List<List<string> >();
		routes.Add(new List<string>(){
			"DSM", "ORD"
		});
		routes.Add(new List<string>(){
			"ORD", "BGI"
		});
		routes.Add(new List<string>(){
			"BGI", "LGA"
		});
		routes.Add(new List<string>(){
			"SIN", "CDG"
		});
		routes.Add(new List<string>(){
			"CDG", "SIN"
		});
		routes.Add(new List<string>(){
			"CDG", "BUD"
		});
		routes.Add(new List<string>(){
			"DEL", "DOH"
		});
		routes.Add(new List<string>(){
			"DEL", "CDG"
		});
		routes.Add(new List<string>(){
			"TLV", "DEL"
		});
		routes.Add(new List<string>(){
			"EWR", "HND"
		});
		routes.Add(new List<string>(){
			"HND", "ICN"
		});
		routes.Add(new List<string>(){
			"HND", "JFK"
		});
		routes.Add(new List<string>(){
			"ICN", "JFK"
		});
		routes.Add(new List<string>(){
			"JFK", "LGA"
		});
		routes.Add(new List<string>(){
			"EYW", "LHR"
		});
		routes.Add(new List<string>(){
			"LHR", "SFO"
		});
		routes.Add(new List<string>(){
			"SFO", "SAN"
		});
		routes.Add(new List<string>(){
			"SFO", "DSM"
		});
		routes.Add(new List<string>(){
			"SAN", "EYW"
		});
		Utils.AssertTrue(Program.AirportConnections(AIRPORTS, routes,
		  STARTING_AIRPORT) == 3);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;

public class Program {

	// O(a * (a + r) + a + r + alog(a)) time | O(a + r) space - where a is the number of airports and r is the number of routes
	public static int AirportConnections(
		List<string> airports,
		List<List<string> > routes,
		string startingAirport
		) {
		Dictionary<string, AirportNode> airportGraph = createAirportGraph(airports, routes);
		List<AirportNode> unreachableAirportNodes = getUnreachableAirportNodes(airportGraph,
		    airports,
		    startingAirport);
		markUnreachableConnections(airportGraph, unreachableAirportNodes);
		return getMinNumberOfNewConnections(airportGraph, unreachableAirportNodes);
	}

	// O(a + r) time | O(a + r) space
	public static Dictionary<string, AirportNode> createAirportGraph(
		List<string> airports,
		List<List<string> > routes
		) {
		Dictionary<string,
		  AirportNode> airportGraph = new Dictionary<string, AirportNode>();
		foreach (string airport in airports) {
			airportGraph.Add(airport, new AirportNode(airport));
		}
		foreach (List<string> route in routes) {
			string airport = route[0];
			string connection = route[1];
			airportGraph[airport].connections.Add(connection);
		}
		return airportGraph;
	}

	// O(a + r) time | O(a) space
	public static List<AirportNode> getUnreachableAirportNodes(
		Dictionary<string, AirportNode> airportGraph,
		List<string> airports,
		string startingAirport
		) {
		HashSet<string> visitedAirports = new HashSet<string>();
		depthFirstTraverseAirports(airportGraph, startingAirport, visitedAirports);

		List<AirportNode> unreachableAirportNodes = new List<AirportNode>();
		foreach (string airport in airports) {
			if (visitedAirports.Contains(airport)) continue;
			AirportNode airportNode = airportGraph[airport];
			airportNode.isReachable = false;
			unreachableAirportNodes.Add(airportNode);
		}
		return unreachableAirportNodes;
	}

	public static void depthFirstTraverseAirports(
		Dictionary<string, AirportNode> airportGraph,
		string airport,
		HashSet<string> visitedAirports
		) {
		if (visitedAirports.Contains(airport)) return;
		visitedAirports.Add(airport);
		List<string> connections = airportGraph[airport].connections;
		foreach (string connection in connections) {
			depthFirstTraverseAirports(airportGraph, connection, visitedAirports);
		}
	}

	// O(a * (a + r)) time | O(a) space
	public static void markUnreachableConnections(
		Dictionary<string, AirportNode> airportGraph,
		List<AirportNode> unreachableAirportNodes
		) {
		foreach (AirportNode airportNode in unreachableAirportNodes) {
			string airport = airportNode.airport;
			List<string> unreachableConnections = new List<string>();
			HashSet<string> visitedAirports = new HashSet<string>();
			depthFirstAddUnreachableConnections(airportGraph, airport,
			  unreachableConnections,
			  visitedAirports);
			airportNode.unreachableConnections = unreachableConnections;
		}
	}

	public static void depthFirstAddUnreachableConnections(
		Dictionary<string, AirportNode> airportGraph,
		string airport,
		List<string> unreachableConnections,
		HashSet<string> visitedAirports
		) {
		if (airportGraph[airport].isReachable) return;
		if (visitedAirports.Contains(airport)) return;
		visitedAirports.Add(airport);
		unreachableConnections.Add(airport);
		List<string> connections = airportGraph[airport].connections;
		foreach (string connection in connections) {
			depthFirstAddUnreachableConnections(airportGraph, connection,
			  unreachableConnections,
			  visitedAirports);
		}
	}

	// O(alog(a) + a + r) time | O(1) space
	public static int getMinNumberOfNewConnections(
		Dictionary<string, AirportNode> airportGraph,
		List<AirportNode> unreachableAirportNodes
		) {
		unreachableAirportNodes.Sort((a1,
		  a2) => a2.unreachableConnections.Count -
		  a1.unreachableConnections.Count);
		int numberOfNewConnections = 0;
		foreach (AirportNode airportNode in unreachableAirportNodes) {
			if (airportNode.isReachable) continue;
			numberOfNewConnections++;
			foreach (string connection in airportNode.unreachableConnections) {
				airportGraph[connection].isReachable = true;
			}
		}
		return numberOfNewConnections;
	}

	public class AirportNode {
		public string airport;
		public List<string> connections;
		public bool isReachable;
		public List<string> unreachableConnections;

		public AirportNode(string airport) {
			this.airport = airport;
			connections = new List<string>();
			isReachable = true;
			unreachableConnections = new List<string>();
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;

public class ProgramTest {

	List<string> AIRPORTS = new List<string>(){
		"BGI",
		"CDG",
		"DEL",
		"DOH",
		"DSM",
		"EWR",
		"EYW",
		"HND",
		"ICN",
		"JFK",
		"LGA",
		"LHR",
		"ORD",
		"SAN",
		"SFO",
		"SIN",
		"TLV",
		"BUD"
	};

	string STARTING_AIRPORT = "LGA";

	[Test]
	public void TestCase1() {
		List<List<string> > routes = new List<List<string> >();
		routes.Add(new List<string>(){
			"DSM", "ORD"
		});
		routes.Add(new List<string>(){
			"ORD", "BGI"
		});
		routes.Add(new List<string>(){
			"BGI", "LGA"
		});
		routes.Add(new List<string>(){
			"SIN", "CDG"
		});
		routes.Add(new List<string>(){
			"CDG", "SIN"
		});
		routes.Add(new List<string>(){
			"CDG", "BUD"
		});
		routes.Add(new List<string>(){
			"DEL", "DOH"
		});
		routes.Add(new List<string>(){
			"DEL", "CDG"
		});
		routes.Add(new List<string>(){
			"TLV", "DEL"
		});
		routes.Add(new List<string>(){
			"EWR", "HND"
		});
		routes.Add(new List<string>(){
			"HND", "ICN"
		});
		routes.Add(new List<string>(){
			"HND", "JFK"
		});
		routes.Add(new List<string>(){
			"ICN", "JFK"
		});
		routes.Add(new List<string>(){
			"JFK", "LGA"
		});
		routes.Add(new List<string>(){
			"EYW", "LHR"
		});
		routes.Add(new List<string>(){
			"LHR", "SFO"
		});
		routes.Add(new List<string>(){
			"SFO", "SAN"
		});
		routes.Add(new List<string>(){
			"SFO", "DSM"
		});
		routes.Add(new List<string>(){
			"SAN", "EYW"
		});
		Utils.AssertTrue(Program.AirportConnections(AIRPORTS, routes,
		  STARTING_AIRPORT) == 3);
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

var Airports = []string{
	"BGI",
	"CDG",
	"DEL",
	"DOH",
	"DSM",
	"EWR",
	"EYW",
	"HND",
	"ICN",
	"JFK",
	"LGA",
	"LHR",
	"ORD",
	"SAN",
	"SFO",
	"SIN",
	"TLV",
	"BUD",
}

var StartingAirport = "LGA"

func (s *TestSuite) TestCase1(t *TestCase) {
	routes := [][]string{
		{"DSM", "ORD"},
		{"ORD", "BGI"},
		{"BGI", "LGA"},
		{"SIN", "CDG"},
		{"CDG", "SIN"},
		{"CDG", "BUD"},
		{"DEL", "DOH"},
		{"DEL", "CDG"},
		{"TLV", "DEL"},
		{"EWR", "HND"},
		{"HND", "ICN"},
		{"HND", "JFK"},
		{"ICN", "JFK"},
		{"JFK", "LGA"},
		{"EYW", "LHR"},
		{"LHR", "SFO"},
		{"SFO", "SAN"},
		{"SFO", "DSM"},
		{"SAN", "EYW"},
	}
	output := AirportConnections(Airports, routes, StartingAirport)
	expected := 3
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import "sort"

type AirportNode struct {
	Airport                string
	Connections            []string
	IsReachable            bool
	UnreachableConnections []string
}

func NewAirportNode(airport string) *AirportNode {
	return &AirportNode{
		Airport:                airport,
		Connections:            []string{},
		IsReachable:            true,
		UnreachableConnections: []string{},
	}
}

// O(a * (a + r) + a + r + alog(a)) time | O(a + r) space - where a is the number of airports and r is the number of routes
func AirportConnections(airports []string, routes [][]string, startingAirport string) int {
	airportGraph := createAirportGraph(airports, routes)
	unreachableAirportNodes := getUnreachableAirportNodes(airportGraph, airports, startingAirport)
	markUnreachableConnections(airportGraph, unreachableAirportNodes)
	return getMinNumberOfNewConnections(airportGraph, unreachableAirportNodes)
}

// O(a + r) time | O(a + r) space
func createAirportGraph(airports []string, routes [][]string) map[string]*AirportNode {
	airportGraph := map[string]*AirportNode{}
	for _, airport := range airports {
		airportGraph[airport] = NewAirportNode(airport)
	}
	for _, route := range routes {
		airport, connection := route[0], route[1]
		airportGraph[airport].Connections = append(airportGraph[airport].Connections, connection)
	}
	return airportGraph
}

// O(a + r) time | O(a) space
func getUnreachableAirportNodes(
	airportGraph map[string]*AirportNode, airports []string, startingAirport string,
) []*AirportNode {
	visitedAirports := map[string]bool{}
	depthFirstTraverseAirports(airportGraph, startingAirport, visitedAirports)

	unreachableAirportNodes := []*AirportNode{}
	for _, airport := range airports {
		if _, found := visitedAirports[airport]; found {
			continue
		}
		airportNode := airportGraph[airport]
		airportNode.IsReachable = false
		unreachableAirportNodes = append(unreachableAirportNodes, airportNode)
	}
	return unreachableAirportNodes
}

func depthFirstTraverseAirports(
	airportGraph map[string]*AirportNode, airport string, visitedAirports map[string]bool,
) {
	if _, found := visitedAirports[airport]; found {
		return
	}
	visitedAirports[airport] = true
	connections := airportGraph[airport].Connections
	for _, connection := range connections {
		depthFirstTraverseAirports(airportGraph, connection, visitedAirports)
	}
}

// O(a * (a + r)) time | O(a) space
func markUnreachableConnections(
	airportGraph map[string]*AirportNode, unreachableAirportNodes []*AirportNode,
) {
	for _, airportNode := range unreachableAirportNodes {
		airport := airportNode.Airport
		unreachableConnections := []string{}
		visitedAirports := map[string]bool{}
		depthFirstAddUnreachableConnections(airportGraph, airport, &unreachableConnections, visitedAirports)
		airportNode.UnreachableConnections = unreachableConnections
	}
	return
}

func depthFirstAddUnreachableConnections(
	airportGraph map[string]*AirportNode, airport string,
	unreachableConnections *[]string, visitedAirports map[string]bool,
) {
	if airportGraph[airport].IsReachable {
		return
	} else if _, found := visitedAirports[airport]; found {
		return
	}
	visitedAirports[airport] = true
	*unreachableConnections = append(*unreachableConnections, airport)
	connections := airportGraph[airport].Connections
	for _, connection := range connections {
		depthFirstAddUnreachableConnections(airportGraph, connection, unreachableConnections, visitedAirports)
	}
}

// O(alog(a) + a + r) time | O(1) space
func getMinNumberOfNewConnections(
	airportGraph map[string]*AirportNode, unreachableAirportNodes []*AirportNode,
) int {
	sort.SliceStable(unreachableAirportNodes, func(i, j int) bool {
		a1, a2 := unreachableAirportNodes[i], unreachableAirportNodes[j]
		return len(a1.UnreachableConnections) > len(a2.UnreachableConnections)
	})
	numberOfNewConnections := 0
	for _, node := range unreachableAirportNodes {
		if node.IsReachable {
			continue
		}
		numberOfNewConnections++
		for _, connection := range node.UnreachableConnections {
			airportGraph[connection].IsReachable = true
		}
	}
	return numberOfNewConnections
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

var Airports = []string{
	"BGI",
	"CDG",
	"DEL",
	"DOH",
	"DSM",
	"EWR",
	"EYW",
	"HND",
	"ICN",
	"JFK",
	"LGA",
	"LHR",
	"ORD",
	"SAN",
	"SFO",
	"SIN",
	"TLV",
	"BUD",
}

var StartingAirport = "LGA"

func (s *TestSuite) TestCase1(t *TestCase) {
	routes := [][]string{
		{"DSM", "ORD"},
		{"ORD", "BGI"},
		{"BGI", "LGA"},
		{"SIN", "CDG"},
		{"CDG", "SIN"},
		{"CDG", "BUD"},
		{"DEL", "DOH"},
		{"DEL", "CDG"},
		{"TLV", "DEL"},
		{"EWR", "HND"},
		{"HND", "ICN"},
		{"HND", "JFK"},
		{"ICN", "JFK"},
		{"JFK", "LGA"},
		{"EYW", "LHR"},
		{"LHR", "SFO"},
		{"SFO", "SAN"},
		{"SFO", "DSM"},
		{"SAN", "EYW"},
	}
	output := AirportConnections(Airports, routes, StartingAirport)
	expected := 3
	require.Equal(t, expected, output)
}

```
### Sandbox Code (java)
```java
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import java.util.*;

class ProgramTest {

  List<String> AIRPORTS =
      new ArrayList<String>(
          Arrays.asList(
              "BGI", "CDG", "DEL", "DOH", "DSM", "EWR", "EYW", "HND", "ICN", "JFK", "LGA", "LHR",
              "ORD", "SAN", "SFO", "SIN", "TLV", "BUD"));

  String STARTING_AIRPORT = "LGA";

  @Test
  public void TestCase1() {
    List<List<String>> routes = new ArrayList<List<String>>();
    routes.add(new ArrayList<String>(Arrays.asList("DSM", "ORD")));
    routes.add(new ArrayList<String>(Arrays.asList("ORD", "BGI")));
    routes.add(new ArrayList<String>(Arrays.asList("BGI", "LGA")));
    routes.add(new ArrayList<String>(Arrays.asList("SIN", "CDG")));
    routes.add(new ArrayList<String>(Arrays.asList("CDG", "SIN")));
    routes.add(new ArrayList<String>(Arrays.asList("CDG", "BUD")));
    routes.add(new ArrayList<String>(Arrays.asList("DEL", "DOH")));
    routes.add(new ArrayList<String>(Arrays.asList("DEL", "CDG")));
    routes.add(new ArrayList<String>(Arrays.asList("TLV", "DEL")));
    routes.add(new ArrayList<String>(Arrays.asList("EWR", "HND")));
    routes.add(new ArrayList<String>(Arrays.asList("HND", "ICN")));
    routes.add(new ArrayList<String>(Arrays.asList("HND", "JFK")));
    routes.add(new ArrayList<String>(Arrays.asList("ICN", "JFK")));
    routes.add(new ArrayList<String>(Arrays.asList("JFK", "LGA")));
    routes.add(new ArrayList<String>(Arrays.asList("EYW", "LHR")));
    routes.add(new ArrayList<String>(Arrays.asList("LHR", "SFO")));
    routes.add(new ArrayList<String>(Arrays.asList("SFO", "SAN")));
    routes.add(new ArrayList<String>(Arrays.asList("SFO", "DSM")));
    routes.add(new ArrayList<String>(Arrays.asList("SAN", "EYW")));
    Utils.assertTrue(Program.airportConnections(AIRPORTS, routes, STARTING_AIRPORT) == 3);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {

  // O(a * (a + r) + a + r + alog(a)) time | O(a + r) space - where a is the number of airports and
  // r is the number of routes
  public static int airportConnections(
      List<String> airports, List<List<String>> routes, String startingAirport) {
    Map<String, AirportNode> airportGraph = createAirportGraph(airports, routes);
    List<AirportNode> unreachableAirportNodes =
        getUnreachableAirportNodes(airportGraph, airports, startingAirport);
    markUnreachableConnections(airportGraph, unreachableAirportNodes);
    return getMinNumberOfNewConnections(airportGraph, unreachableAirportNodes);
  }

  // O(a + r) time | O(a + r) space
  public static Map<String, AirportNode> createAirportGraph(
      List<String> airports, List<List<String>> routes) {
    Map<String, AirportNode> airportGraph = new HashMap<String, AirportNode>();
    for (String airport : airports) {
      airportGraph.put(airport, new AirportNode(airport));
    }
    for (List<String> route : routes) {
      String airport = route.get(0);
      String connection = route.get(1);
      airportGraph.get(airport).connections.add(connection);
    }
    return airportGraph;
  }

  // O(a + r) time | O(a) space
  public static List<AirportNode> getUnreachableAirportNodes(
      Map<String, AirportNode> airportGraph, List<String> airports, String startingAirport) {
    Set<String> visitedAirports = new HashSet<String>();
    depthFirstTraverseAirports(airportGraph, startingAirport, visitedAirports);

    List<AirportNode> unreachableAirportNodes = new ArrayList<AirportNode>();
    for (String airport : airports) {
      if (visitedAirports.contains(airport)) continue;
      AirportNode airportNode = airportGraph.get(airport);
      airportNode.isReachable = false;
      unreachableAirportNodes.add(airportNode);
    }
    return unreachableAirportNodes;
  }

  public static void depthFirstTraverseAirports(
      Map<String, AirportNode> airportGraph, String airport, Set<String> visitedAirports) {
    if (visitedAirports.contains(airport)) return;
    visitedAirports.add(airport);
    List<String> connections = airportGraph.get(airport).connections;
    for (String connection : connections) {
      depthFirstTraverseAirports(airportGraph, connection, visitedAirports);
    }
  }

  // O(a * (a + r)) time | O(a) space
  public static void markUnreachableConnections(
      Map<String, AirportNode> airportGraph, List<AirportNode> unreachableAirportNodes) {
    for (AirportNode airportNode : unreachableAirportNodes) {
      String airport = airportNode.airport;
      List<String> unreachableConnections = new ArrayList<String>();
      Set<String> visitedAirports = new HashSet<String>();
      depthFirstAddUnreachableConnections(
          airportGraph, airport, unreachableConnections, visitedAirports);
      airportNode.unreachableConnections = unreachableConnections;
    }
  }

  public static void depthFirstAddUnreachableConnections(
      Map<String, AirportNode> airportGraph,
      String airport,
      List<String> unreachableConnections,
      Set<String> visitedAirports) {
    if (airportGraph.get(airport).isReachable) return;
    if (visitedAirports.contains(airport)) return;
    visitedAirports.add(airport);
    unreachableConnections.add(airport);
    List<String> connections = airportGraph.get(airport).connections;
    for (String connection : connections) {
      depthFirstAddUnreachableConnections(
          airportGraph, connection, unreachableConnections, visitedAirports);
    }
  }

  // O(alog(a) + a + r) time | O(1) space
  public static int getMinNumberOfNewConnections(
      Map<String, AirportNode> airportGraph, List<AirportNode> unreachableAirportNodes) {
    unreachableAirportNodes.sort(
        (a1, a2) -> a2.unreachableConnections.size() - a1.unreachableConnections.size());
    int numberOfNewConnections = 0;
    for (AirportNode airportNode : unreachableAirportNodes) {
      if (airportNode.isReachable) continue;
      numberOfNewConnections++;
      for (String connection : airportNode.unreachableConnections) {
        airportGraph.get(connection).isReachable = true;
      }
    }
    return numberOfNewConnections;
  }

  static class AirportNode {
    String airport;
    List<String> connections;
    boolean isReachable;
    List<String> unreachableConnections;

    public AirportNode(String airport) {
      this.airport = airport;
      connections = new ArrayList<String>();
      isReachable = true;
      unreachableConnections = new ArrayList<String>();
    }
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {

  List<String> AIRPORTS =
      new ArrayList<String>(
          Arrays.asList(
              "BGI", "CDG", "DEL", "DOH", "DSM", "EWR", "EYW", "HND", "ICN", "JFK", "LGA", "LHR",
              "ORD", "SAN", "SFO", "SIN", "TLV", "BUD"));

  String STARTING_AIRPORT = "LGA";

  @Test
  public void TestCase1() {
    List<List<String>> routes = new ArrayList<List<String>>();
    routes.add(new ArrayList<String>(Arrays.asList("DSM", "ORD")));
    routes.add(new ArrayList<String>(Arrays.asList("ORD", "BGI")));
    routes.add(new ArrayList<String>(Arrays.asList("BGI", "LGA")));
    routes.add(new ArrayList<String>(Arrays.asList("SIN", "CDG")));
    routes.add(new ArrayList<String>(Arrays.asList("CDG", "SIN")));
    routes.add(new ArrayList<String>(Arrays.asList("CDG", "BUD")));
    routes.add(new ArrayList<String>(Arrays.asList("DEL", "DOH")));
    routes.add(new ArrayList<String>(Arrays.asList("DEL", "CDG")));
    routes.add(new ArrayList<String>(Arrays.asList("TLV", "DEL")));
    routes.add(new ArrayList<String>(Arrays.asList("EWR", "HND")));
    routes.add(new ArrayList<String>(Arrays.asList("HND", "ICN")));
    routes.add(new ArrayList<String>(Arrays.asList("HND", "JFK")));
    routes.add(new ArrayList<String>(Arrays.asList("ICN", "JFK")));
    routes.add(new ArrayList<String>(Arrays.asList("JFK", "LGA")));
    routes.add(new ArrayList<String>(Arrays.asList("EYW", "LHR")));
    routes.add(new ArrayList<String>(Arrays.asList("LHR", "SFO")));
    routes.add(new ArrayList<String>(Arrays.asList("SFO", "SAN")));
    routes.add(new ArrayList<String>(Arrays.asList("SFO", "DSM")));
    routes.add(new ArrayList<String>(Arrays.asList("SAN", "EYW")));
    Utils.assertTrue(Program.airportConnections(AIRPORTS, routes, STARTING_AIRPORT) == 3);
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

const AIRPORTS = [
  'BGI',
  'CDG',
  'DEL',
  'DOH',
  'DSM',
  'EWR',
  'EYW',
  'HND',
  'ICN',
  'JFK',
  'LGA',
  'LHR',
  'ORD',
  'SAN',
  'SFO',
  'SIN',
  'TLV',
  'BUD',
];

const STARTING_AIRPORT = 'LGA';

it('Test Case #1', function () {
  const routes = [
    ['DSM', 'ORD'],
    ['ORD', 'BGI'],
    ['BGI', 'LGA'],
    ['SIN', 'CDG'],
    ['CDG', 'SIN'],
    ['CDG', 'BUD'],
    ['DEL', 'DOH'],
    ['DEL', 'CDG'],
    ['TLV', 'DEL'],
    ['EWR', 'HND'],
    ['HND', 'ICN'],
    ['HND', 'JFK'],
    ['ICN', 'JFK'],
    ['JFK', 'LGA'],
    ['EYW', 'LHR'],
    ['LHR', 'SFO'],
    ['SFO', 'SAN'],
    ['SFO', 'DSM'],
    ['SAN', 'EYW'],
  ];
  chai.expect(program.airportConnections(AIRPORTS, routes, STARTING_AIRPORT)).to.deep.equal(3);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(a * (a + r) + a + r + alog(a)) time | O(a + r) space - where a is the number of airports and r is the number of routes
function airportConnections(airports, routes, startingAirport) {
  const airportGraph = createAirportGraph(airports, routes);
  const unreachableAirportNodes = getUnreachableAirportNodes(airportGraph, airports, startingAirport);
  markUnreachableConnections(airportGraph, unreachableAirportNodes);
  return getMinNumberOfNewConnections(airportGraph, unreachableAirportNodes);
}

// O(a + r) time | O(a + r) space
function createAirportGraph(airports, routes) {
  const airportGraph = {};
  for (const airport of airports) {
    airportGraph[airport] = new AirportNode(airport);
  }
  for (const route of routes) {
    const [airport, connection] = route;
    airportGraph[airport].connections.push(connection);
  }
  return airportGraph;
}

// O(a + r) time | O(a) space
function getUnreachableAirportNodes(airportGraph, airports, startingAirport) {
  const visitedAirports = {};
  depthFirstTraverseAirports(airportGraph, startingAirport, visitedAirports);

  const unreachableAirportNodes = [];
  for (const airport of airports) {
    if (airport in visitedAirports) continue;
    const airportNode = airportGraph[airport];
    airportNode.isReachable = false;
    unreachableAirportNodes.push(airportNode);
  }
  return unreachableAirportNodes;
}

function depthFirstTraverseAirports(airportGraph, airport, visitedAirports) {
  if (airport in visitedAirports) return;
  visitedAirports[airport] = true;
  const {connections} = airportGraph[airport];
  for (const connection of connections) {
    depthFirstTraverseAirports(airportGraph, connection, visitedAirports);
  }
}

// O(a * (a + r)) time | O(a) space
function markUnreachableConnections(airportGraph, unreachableAirportNodes) {
  for (const airportNode of unreachableAirportNodes) {
    const {airport} = airportNode;
    const unreachableConnections = [];
    depthFirstAddUnreachableConnections(airportGraph, airport, unreachableConnections, {});
    airportNode.unreachableConnections = unreachableConnections;
  }
}

function depthFirstAddUnreachableConnections(airportGraph, airport, unreachableConnections, visitedAirports) {
  if (airportGraph[airport].isReachable) return;
  if (airport in visitedAirports) return;
  visitedAirports[airport] = true;
  unreachableConnections.push(airport);
  const {connections} = airportGraph[airport];
  for (const connection of connections) {
    depthFirstAddUnreachableConnections(airportGraph, connection, unreachableConnections, visitedAirports);
  }
}

// O(alog(a) + a + r) time | O(1) space
function getMinNumberOfNewConnections(airportGraph, unreachableAirportNodes) {
  unreachableAirportNodes.sort((a1, a2) => a2.unreachableConnections.length - a1.unreachableConnections.length);

  let numberOfNewConnections = 0;
  for (const airportNode of unreachableAirportNodes) {
    if (airportNode.isReachable) continue;
    numberOfNewConnections++;
    for (const connection of airportNode.unreachableConnections) {
      airportGraph[connection].isReachable = true;
    }
  }
  return numberOfNewConnections;
}

class AirportNode {
  constructor(airport) {
    this.airport = airport;
    this.connections = [];
    this.isReachable = true;
    this.unreachableConnections = [];
  }
}

exports.airportConnections = airportConnections;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

const AIRPORTS = [
  'BGI',
  'CDG',
  'DEL',
  'DOH',
  'DSM',
  'EWR',
  'EYW',
  'HND',
  'ICN',
  'JFK',
  'LGA',
  'LHR',
  'ORD',
  'SAN',
  'SFO',
  'SIN',
  'TLV',
  'BUD',
];

const STARTING_AIRPORT = 'LGA';

it('Test Case #1', function () {
  const routes = [
    ['DSM', 'ORD'],
    ['ORD', 'BGI'],
    ['BGI', 'LGA'],
    ['SIN', 'CDG'],
    ['CDG', 'SIN'],
    ['CDG', 'BUD'],
    ['DEL', 'DOH'],
    ['DEL', 'CDG'],
    ['TLV', 'DEL'],
    ['EWR', 'HND'],
    ['HND', 'ICN'],
    ['HND', 'JFK'],
    ['ICN', 'JFK'],
    ['JFK', 'LGA'],
    ['EYW', 'LHR'],
    ['LHR', 'SFO'],
    ['SFO', 'SAN'],
    ['SFO', 'DSM'],
    ['SAN', 'EYW'],
  ];
  chai.expect(program.airportConnections(AIRPORTS, routes, STARTING_AIRPORT)).to.deep.equal(3);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.airportConnections

class ProgramTest {

    val AIRPORTS = listOf(
        "BGI", "CDG", "DEL", "DOH", "DSM", "EWR", "EYW",
        "HND", "ICN", "JFK", "LGA", "LHR", "ORD", "SAN", "SFO", "SIN", "TLV", "BUD"
    )

    @Test
    fun TestCase1() {
        val routes = listOf(
            Pair("DSM", "ORD"),
            Pair("ORD", "BGI"),
            Pair("BGI", "LGA"),
            Pair("SIN", "CDG"),
            Pair("CDG", "SIN"),
            Pair("CDG", "BUD"),
            Pair("DEL", "DOH"),
            Pair("DEL", "CDG"),
            Pair("TLV", "DEL"),
            Pair("EWR", "HND"),
            Pair("HND", "ICN"),
            Pair("HND", "JFK"),
            Pair("ICN", "JFK"),
            Pair("JFK", "LGA"),
            Pair("EYW", "LHR"),
            Pair("LHR", "SFO"),
            Pair("SFO", "SAN"),
            Pair("SFO", "DSM"),
            Pair("SAN", "EYW")
        )
        val start = "LGA"
        val output = airportConnections(AIRPORTS, routes, start)
        assert(output == 3)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

data class AirportNode(
    val airport: String,
    var connections: MutableList<String> = mutableListOf<String>(),
    var unreachableConnections: MutableList<String> = mutableListOf<String>(),
    var isReachable: Boolean = true
)

// O(a * (a + r) + a + r + alog(a)) time | O(a + r) space - where a is the number of airports and
// r is the number of routes
fun airportConnections(airports: List<String>, routes: List<Pair<String, String>>, startingAirport: String): Int {
    val airportGraph = createAirportGraph(airports, routes)
    val unreachableAirportNodes = getUnreachableAirportNodes(airportGraph, airports, startingAirport)
    markUnreachableConnections(airportGraph, unreachableAirportNodes)
    return getMinNumberOfNewConnections(airportGraph, unreachableAirportNodes)
}

// O(a + r) time | O(a + r) space
fun createAirportGraph(airports: List<String>, routes: List<Pair<String, String>>): Map<String, AirportNode> {
    val airportGraph = mutableMapOf<String, AirportNode>()
    for (airport in airports) {
        airportGraph[airport] = AirportNode(airport)
    }
    for (route in routes) {
        val airport = route.first
        val connection = route.second
        airportGraph[airport]!!.connections.add(connection)
    }
    return airportGraph
}

// O(a + r) time | O(a) space
fun getUnreachableAirportNodes(airportGraph: Map<String, AirportNode>, airports: List<String>, startingAirport: String): MutableList<AirportNode> {
    val visitedAirports = mutableSetOf<String>()
    depthFirstTraverseAirports(airportGraph, startingAirport, visitedAirports)

    val unreachableAirportNodes = mutableListOf<AirportNode>()
    for (airport in airports) {
        if (visitedAirports.contains(airport)) continue
        val airportNode = airportGraph[airport]!!
        airportNode.isReachable = false
        unreachableAirportNodes.add(airportNode)
    }
    return unreachableAirportNodes
}

fun depthFirstTraverseAirports(airportGraph: Map<String, AirportNode>, airport: String, visitedAirports: MutableSet<String>) {
    if (visitedAirports.contains(airport)) return
    visitedAirports.add(airport)
    val connections = airportGraph[airport]!!.connections
    for (connection in connections) {
        depthFirstTraverseAirports(airportGraph, connection, visitedAirports)
    }
}

// O(a * (a + r)) time | O(a) space
fun markUnreachableConnections(airportGraph: Map<String, AirportNode>, unreachableAirportNodes: List<AirportNode>) {
    for (airportNode in unreachableAirportNodes) {
        val airport = airportNode.airport
        val unreachableConnections = mutableListOf<String>()
        val visitedAirports = mutableSetOf<String>()
        depthFirstAddUnreachableConnections(
            airportGraph, airport, unreachableConnections, visitedAirports
        )
        airportNode.unreachableConnections = unreachableConnections
    }
}

fun depthFirstAddUnreachableConnections(
    airportGraph: Map<String, AirportNode>,
    airport: String,
    unreachableConnections: MutableList<String>,
    visitedAirports: MutableSet<String>
) {
    if (airportGraph[airport]!!.isReachable) return
    if (visitedAirports.contains(airport)) return
    visitedAirports.add(airport)
    unreachableConnections.add(airport)
    val connections = airportGraph[airport]!!.connections
    for (connection in connections) {
        depthFirstAddUnreachableConnections(
            airportGraph, connection, unreachableConnections, visitedAirports
        )
    }
}

// O(alog(a) + a + r) time | O(1) space
fun getMinNumberOfNewConnections(airportGraph: Map<String, AirportNode>, unreachableAirportNodes: MutableList<AirportNode>): Int {
    var unreachable = unreachableAirportNodes.sortedWith(
        Comparator<AirportNode> { a1, a2 ->
            a2.unreachableConnections.size - a1.unreachableConnections.size
        }
    )
    var numberOfNewConnections = 0
    for (airportNode in unreachable) {
        if (airportNode.isReachable) continue
        numberOfNewConnections++
        for (connection in airportNode.unreachableConnections) {
            airportGraph[connection]!!.isReachable = true
        }
    }
    return numberOfNewConnections
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.airportConnections

class ProgramTest {

    val AIRPORTS = listOf(
        "BGI", "CDG", "DEL", "DOH", "DSM", "EWR", "EYW",
        "HND", "ICN", "JFK", "LGA", "LHR", "ORD", "SAN", "SFO", "SIN", "TLV", "BUD"
    )

    @Test
    fun TestCase1() {
        val routes = listOf(
            Pair("DSM", "ORD"),
            Pair("ORD", "BGI"),
            Pair("BGI", "LGA"),
            Pair("SIN", "CDG"),
            Pair("CDG", "SIN"),
            Pair("CDG", "BUD"),
            Pair("DEL", "DOH"),
            Pair("DEL", "CDG"),
            Pair("TLV", "DEL"),
            Pair("EWR", "HND"),
            Pair("HND", "ICN"),
            Pair("HND", "JFK"),
            Pair("ICN", "JFK"),
            Pair("JFK", "LGA"),
            Pair("EYW", "LHR"),
            Pair("LHR", "SFO"),
            Pair("SFO", "SAN"),
            Pair("SFO", "DSM"),
            Pair("SAN", "EYW")
        )
        val start = "LGA"
        val output = airportConnections(AIRPORTS, routes, start)
        assert(output == 3)
    }
}

```
### Sandbox Code (swift)
```swift
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

let STARTING_AIRPORT = "LGA"

let AIRPORTS = [
  "BGI",
  "CDG",
  "DEL",
  "DOH",
  "DSM",
  "EWR",
  "EYW",
  "HND",
  "ICN",
  "JFK",
  "LGA",
  "LHR",
  "ORD",
  "SAN",
  "SFO",
  "SIN",
  "TLV",
  "BUD",
]

class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let fifteenthRoutes = [
        ["DSM", "ORD"],
        ["ORD", "BGI"],
        ["BGI", "LGA"],
        ["SIN", "CDG"],
        ["CDG", "SIN"],
        ["CDG", "BUD"],
        ["DEL", "DOH"],
        ["DEL", "CDG"],
        ["TLV", "DEL"],
        ["EWR", "HND"],
        ["HND", "ICN"],
        ["HND", "JFK"],
        ["ICN", "JFK"],
        ["JFK", "LGA"],
        ["EYW", "LHR"],
        ["LHR", "SFO"],
        ["SFO", "SAN"],
        ["SFO", "DSM"],
        ["SAN", "EYW"],
      ]
      let result = program.airportConnections(AIRPORTS, fifteenthRoutes, STARTING_AIRPORT)
      try assertEqual(3, result)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(a * (a + r) + (a + r) + alog(a)) time | O(a + r) space
  func airportConnections(_ airports: [String], _ routes: [[String]], _ startingAirport: String) -> Int {
    var airportGraph = createAirportGraph(airports, routes)
    var unreachableAirportNodes = getUnreachableAirportNodes(airports, &airportGraph, startingAirport)
    addChildrenToUnreachableAirportNodes(airportGraph, unreachableAirportNodes)

    return getMinimumNumberOfNewConnections(&airportGraph, &unreachableAirportNodes)
  }

  // O(a + r) time | O(a + r) space
  func createAirportGraph(_ airports: [String], _ routes: [[String]]) -> [String: AirportNode] {
    var airportGraph = [String: AirportNode]()

    for airportCode in airports {
      airportGraph[airportCode] = AirportNode(airportCode)
    }

    for route in routes {
      let origin = route[0]
      let destination = route[1]

      if let airportNode = airportGraph[origin] {
        airportNode.directConnections.append(destination)
        airportGraph[origin] = airportNode
      }
    }

    return airportGraph
  }

  // O(a + r) time | O(a) space
  func getUnreachableAirportNodes(_ airports: [String], _ airportsGraph: inout [String: AirportNode], _ startingAirport: String) -> [AirportNode] {
    var visitedAirports = [String: Bool]()
    depthFirstTraverseAirports(airportsGraph, startingAirport, &visitedAirports)

    var unreachableAirportNodes = [AirportNode]()
    for airportCode in airports {
      if visitedAirports.keys.contains(airportCode) {
        continue
      }

      if let airportNode = airportsGraph[airportCode] {
        airportNode.isReachable = false
        airportsGraph[airportCode] = airportNode
        unreachableAirportNodes.append(airportNode)
      }
    }

    return unreachableAirportNodes
  }

  func depthFirstTraverseAirports(_ airportsGraph: [String: AirportNode], _ airport: String, _ visitedAirports: inout [String: Bool]) {
    if visitedAirports.keys.contains(airport) {
      return
    }

    visitedAirports[airport] = true

    if let airportNode = airportsGraph[airport] {
      let directConnections = airportNode.directConnections

      for connection in directConnections {
        depthFirstTraverseAirports(airportsGraph, connection, &visitedAirports)
      }
    }
  }

  // O(a * (a + r)) time | O(a) space
  func addChildrenToUnreachableAirportNodes(_ airportsGraph: [String: AirportNode], _ unreachableAirportNodes: [AirportNode]) {
    for airportNode in unreachableAirportNodes {
      var visitedAirports = [String: Bool]()
      var childConnections = [String]()
      let airportCode = airportNode.airportCode

      depthFirstAddChildConnections(airportCode, airportsGraph, &visitedAirports, &childConnections)
      airportNode.allChildConnections = childConnections
    }
  }

  func depthFirstAddChildConnections(_ airportCode: String, _ airportsGraph: [String: AirportNode], _ visitedAirports: inout [String: Bool], _ childConnections: inout [String]) {
    if visitedAirports.keys.contains(airportCode) {
      return
    }

    if let airportNode = airportsGraph[airportCode], airportNode.isReachable {
      return
    }

    visitedAirports[airportCode] = true
    childConnections.append(airportCode)

    if let airportNode = airportsGraph[airportCode] {
      let directConnections = airportNode.directConnections

      for connection in directConnections {
        depthFirstAddChildConnections(connection, airportsGraph, &visitedAirports, &childConnections)
      }
    }
  }

  // O(alog(a) + a + r) time | O(1) space
  func getMinimumNumberOfNewConnections(_ airportGraph: inout [String: AirportNode], _ unreachableAirportNodes: inout [AirportNode]) -> Int {
    var numberOfNewConnections = 0
    unreachableAirportNodes = unreachableAirportNodes.sorted(by: { $0.allChildConnections.count > $1.allChildConnections.count })

    for airportNode in unreachableAirportNodes {
      if airportNode.isReachable {
        continue
      }

      numberOfNewConnections += 1

      for child in airportNode.allChildConnections {
        if let airportNode = airportGraph[child] {
          airportNode.isReachable = true
          airportGraph[child] = airportNode
        }
      }
    }

    return numberOfNewConnections
  }

  class AirportNode {
    let airportCode: String
    var isReachable = true
    var directConnections = [String]()
    var allChildConnections = [String]()

    init(_ airportCode: String) {
      self.airportCode = airportCode
    }
  }
}

```
### Unit Tests 1 (swift)
```swift
let STARTING_AIRPORT = "LGA"

let AIRPORTS = [
  "BGI",
  "CDG",
  "DEL",
  "DOH",
  "DSM",
  "EWR",
  "EYW",
  "HND",
  "ICN",
  "JFK",
  "LGA",
  "LHR",
  "ORD",
  "SAN",
  "SFO",
  "SIN",
  "TLV",
  "BUD",
]

class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let fifteenthRoutes = [
        ["DSM", "ORD"],
        ["ORD", "BGI"],
        ["BGI", "LGA"],
        ["SIN", "CDG"],
        ["CDG", "SIN"],
        ["CDG", "BUD"],
        ["DEL", "DOH"],
        ["DEL", "CDG"],
        ["TLV", "DEL"],
        ["EWR", "HND"],
        ["HND", "ICN"],
        ["HND", "JFK"],
        ["ICN", "JFK"],
        ["JFK", "LGA"],
        ["EYW", "LHR"],
        ["LHR", "SFO"],
        ["SFO", "SAN"],
        ["SFO", "DSM"],
        ["SAN", "EYW"],
      ]
      let result = program.airportConnections(AIRPORTS, fifteenthRoutes, STARTING_AIRPORT)
      try assertEqual(3, result)
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


AIRPORTS = [
    "BGI",
    "CDG",
    "DEL",
    "DOH",
    "DSM",
    "EWR",
    "EYW",
    "HND",
    "ICN",
    "JFK",
    "LGA",
    "LHR",
    "ORD",
    "SAN",
    "SFO",
    "SIN",
    "TLV",
    "BUD",
]

STARTING_AIRPORT = "LGA"


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        routes = [
            ["DSM", "ORD"],
            ["ORD", "BGI"],
            ["BGI", "LGA"],
            ["SIN", "CDG"],
            ["CDG", "SIN"],
            ["CDG", "BUD"],
            ["DEL", "DOH"],
            ["DEL", "CDG"],
            ["TLV", "DEL"],
            ["EWR", "HND"],
            ["HND", "ICN"],
            ["HND", "JFK"],
            ["ICN", "JFK"],
            ["JFK", "LGA"],
            ["EYW", "LHR"],
            ["LHR", "SFO"],
            ["SFO", "SAN"],
            ["SFO", "DSM"],
            ["SAN", "EYW"],
        ]
        self.assertTrue(program.airportConnections(AIRPORTS, routes, STARTING_AIRPORT) == 3)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(a * (a + r) + a + r + alog(a)) time | O(a + r) space - where a is the number of airports and r is the number of routes
def airportConnections(airports, routes, startingAirport):
    airportGraph = createAirportGraph(airports, routes)
    unreachableAirportNodes = getUnreachableAirportNodes(airportGraph, airports, startingAirport)
    markUnreachableConnections(airportGraph, unreachableAirportNodes)
    return getMinNumberOfNewConnections(airportGraph, unreachableAirportNodes)


# O(a + r) time | O(a + r) space
def createAirportGraph(airports, routes):
    airportGraph = {}
    for airport in airports:
        airportGraph[airport] = AirportNode(airport)
    for route in routes:
        airport, connection = route
        airportGraph[airport].connections.append(connection)
    return airportGraph


# O(a + r) time | O(a) space
def getUnreachableAirportNodes(airportGraph, airports, startingAirport):
    visitedAirports = {}
    depthFirstTraverseAirports(airportGraph, startingAirport, visitedAirports)

    unreachableAirportNodes = []
    for airport in airports:
        if airport in visitedAirports:
            continue
        airportNode = airportGraph[airport]
        airportNode.isReachable = False
        unreachableAirportNodes.append(airportNode)
    return unreachableAirportNodes


def depthFirstTraverseAirports(airportGraph, airport, visitedAirports):
    if airport in visitedAirports:
        return
    visitedAirports[airport] = True
    connections = airportGraph[airport].connections
    for connection in connections:
        depthFirstTraverseAirports(airportGraph, connection, visitedAirports)


# O(a * (a + r)) time | O(a) space
def markUnreachableConnections(airportGraph, unreachableAirportNodes):
    for airportNode in unreachableAirportNodes:
        airport = airportNode.airport
        unreachableConnections = []
        depthFirstAddUnreachableConnections(airportGraph, airport, unreachableConnections, {})
        airportNode.unreachableConnections = unreachableConnections


def depthFirstAddUnreachableConnections(airportGraph, airport, unreachableConnections, visitedAirports):
    if airportGraph[airport].isReachable:
        return
    if airport in visitedAirports:
        return
    visitedAirports[airport] = True
    unreachableConnections.append(airport)
    connections = airportGraph[airport].connections
    for connection in connections:
        depthFirstAddUnreachableConnections(airportGraph, connection, unreachableConnections, visitedAirports)


# O(alog(a) + a + r) time | O(1) space
def getMinNumberOfNewConnections(airportGraph, unreachableAirportNodes):
    unreachableAirportNodes.sort(key=lambda airport: len(airport.unreachableConnections), reverse=True)

    numberOfNewConnections = 0
    for airportNode in unreachableAirportNodes:
        if airportNode.isReachable:
            continue
        numberOfNewConnections += 1
        for connection in airportNode.unreachableConnections:
            airportGraph[connection].isReachable = True
    return numberOfNewConnections


class AirportNode:
    def __init__(self, airport):
        self.airport = airport
        self.connections = []
        self.isReachable = True
        self.unreachableConnections = []

```
### Unit Tests 1 (python)
```python
import program
import unittest


AIRPORTS = [
    "BGI",
    "CDG",
    "DEL",
    "DOH",
    "DSM",
    "EWR",
    "EYW",
    "HND",
    "ICN",
    "JFK",
    "LGA",
    "LHR",
    "ORD",
    "SAN",
    "SFO",
    "SIN",
    "TLV",
    "BUD",
]

STARTING_AIRPORT = "LGA"


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        routes = [
            ["DSM", "ORD"],
            ["ORD", "BGI"],
            ["BGI", "LGA"],
            ["SIN", "CDG"],
            ["CDG", "SIN"],
            ["CDG", "BUD"],
            ["DEL", "DOH"],
            ["DEL", "CDG"],
            ["TLV", "DEL"],
            ["EWR", "HND"],
            ["HND", "ICN"],
            ["HND", "JFK"],
            ["ICN", "JFK"],
            ["JFK", "LGA"],
            ["EYW", "LHR"],
            ["LHR", "SFO"],
            ["SFO", "SAN"],
            ["SFO", "DSM"],
            ["SAN", "EYW"],
        ]
        self.assertTrue(program.airportConnections(AIRPORTS, routes, STARTING_AIRPORT) == 3)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

const AIRPORTS = [
  'BGI',
  'CDG',
  'DEL',
  'DOH',
  'DSM',
  'EWR',
  'EYW',
  'HND',
  'ICN',
  'JFK',
  'LGA',
  'LHR',
  'ORD',
  'SAN',
  'SFO',
  'SIN',
  'TLV',
  'BUD',
];

const STARTING_AIRPORT = 'LGA';

it('Test Case #1', function () {
  const routes: [string, string][] = [
    ['DSM', 'ORD'],
    ['ORD', 'BGI'],
    ['BGI', 'LGA'],
    ['SIN', 'CDG'],
    ['CDG', 'SIN'],
    ['CDG', 'BUD'],
    ['DEL', 'DOH'],
    ['DEL', 'CDG'],
    ['TLV', 'DEL'],
    ['EWR', 'HND'],
    ['HND', 'ICN'],
    ['HND', 'JFK'],
    ['ICN', 'JFK'],
    ['JFK', 'LGA'],
    ['EYW', 'LHR'],
    ['LHR', 'SFO'],
    ['SFO', 'SAN'],
    ['SFO', 'DSM'],
    ['SAN', 'EYW'],
  ];
  chai.expect(program.airportConnections(AIRPORTS, routes, STARTING_AIRPORT)).to.deep.equal(3);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

interface AirportGraph {
  [key: string]: AirportNode;
}

interface VisitedAirports {
  [key: string]: boolean;
}

// O(a * (a + r) + a + r + alog(a)) time | O(a + r) space - where a is the number of airports and r is the number of routes
export function airportConnections(airports: string[], routes: [string, string][], startingAirport: string): number {
  const airportGraph = createAirportGraph(airports, routes);
  const unreachableAirportNodes = getUnreachableAirportNodes(airportGraph, airports, startingAirport);
  markUnreachableConnections(airportGraph, unreachableAirportNodes);
  return getMinNumberOfNewConnections(airportGraph, unreachableAirportNodes);
}

// O(a + r) time | O(a + r) space
function createAirportGraph(airports: string[], routes: [string, string][]) {
  const airportGraph: AirportGraph = {};
  for (const airport of airports) {
    airportGraph[airport] = new AirportNode(airport);
  }
  for (const route of routes) {
    const [airport, connection] = route;
    airportGraph[airport].connections.push(connection);
  }
  return airportGraph;
}

// O(a + r) time | O(a) space
function getUnreachableAirportNodes(airportGraph: AirportGraph, airports: string[], startingAirport: string) {
  const visitedAirports: VisitedAirports = {};
  depthFirstTraverseAirports(airportGraph, startingAirport, visitedAirports);

  const unreachableAirportNodes: AirportNode[] = [];
  for (const airport of airports) {
    if (airport in visitedAirports) continue;
    const airportNode = airportGraph[airport];
    airportNode.isReachable = false;
    unreachableAirportNodes.push(airportNode);
  }
  return unreachableAirportNodes;
}

function depthFirstTraverseAirports(airportGraph: AirportGraph, airport: string, visitedAirports: VisitedAirports) {
  if (airport in visitedAirports) return;
  visitedAirports[airport] = true;
  const {connections} = airportGraph[airport];
  for (const connection of connections) {
    depthFirstTraverseAirports(airportGraph, connection, visitedAirports);
  }
}

// O(a * (a + r)) time | O(a) space
function markUnreachableConnections(airportGraph: AirportGraph, unreachableAirportNodes: AirportNode[]) {
  for (const airportNode of unreachableAirportNodes) {
    const {airport} = airportNode;
    const unreachableConnections: string[] = [];
    depthFirstAddUnreachableConnections(airportGraph, airport, unreachableConnections, {});
    airportNode.unreachableConnections = unreachableConnections;
  }
}

function depthFirstAddUnreachableConnections(
  airportGraph: AirportGraph,
  airport: string,
  unreachableConnections: string[],
  visitedAirports: VisitedAirports,
) {
  if (airportGraph[airport].isReachable) return;
  if (airport in visitedAirports) return;
  visitedAirports[airport] = true;
  unreachableConnections.push(airport);
  const {connections} = airportGraph[airport];
  for (const connection of connections) {
    depthFirstAddUnreachableConnections(airportGraph, connection, unreachableConnections, visitedAirports);
  }
}

// O(alog(a) + a + r) time | O(1) space
function getMinNumberOfNewConnections(airportGraph: AirportGraph, unreachableAirportNodes: AirportNode[]) {
  unreachableAirportNodes.sort((a1, a2) => a2.unreachableConnections.length - a1.unreachableConnections.length);

  let numberOfNewConnections = 0;
  for (const airportNode of unreachableAirportNodes) {
    if (airportNode.isReachable) continue;
    numberOfNewConnections++;
    for (const connection of airportNode.unreachableConnections) {
      airportGraph[connection].isReachable = true;
    }
  }
  return numberOfNewConnections;
}

class AirportNode {
  airport: string;
  connections: string[];
  isReachable: boolean;
  unreachableConnections: string[];

  constructor(airport: string) {
    this.airport = airport;
    this.connections = [];
    this.isReachable = true;
    this.unreachableConnections = [];
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

const AIRPORTS = [
  'BGI',
  'CDG',
  'DEL',
  'DOH',
  'DSM',
  'EWR',
  'EYW',
  'HND',
  'ICN',
  'JFK',
  'LGA',
  'LHR',
  'ORD',
  'SAN',
  'SFO',
  'SIN',
  'TLV',
  'BUD',
];

const STARTING_AIRPORT = 'LGA';

it('Test Case #1', function () {
  const routes: [string, string][] = [
    ['DSM', 'ORD'],
    ['ORD', 'BGI'],
    ['BGI', 'LGA'],
    ['SIN', 'CDG'],
    ['CDG', 'SIN'],
    ['CDG', 'BUD'],
    ['DEL', 'DOH'],
    ['DEL', 'CDG'],
    ['TLV', 'DEL'],
    ['EWR', 'HND'],
    ['HND', 'ICN'],
    ['HND', 'JFK'],
    ['ICN', 'JFK'],
    ['JFK', 'LGA'],
    ['EYW', 'LHR'],
    ['LHR', 'SFO'],
    ['SFO', 'SAN'],
    ['SFO', 'DSM'],
    ['SAN', 'EYW'],
  ];
  chai.expect(program.airportConnections(AIRPORTS, routes, STARTING_AIRPORT)).to.deep.equal(3);
});

```

