# Convert C++ to C#

### Question 1


Please convert the C++ code to C# and add it as a static public method in a partial class called Graphs for me. Here is the code markdown snippet:

```c++
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <tuple>

std::unordered_map<int, std::vector<int>> buildGraph(std::vector<std::tuple<int, int>> edges) {
  std::unordered_map<int, std::vector<int>> graph;
  
  for (auto [a, b] : edges) {
    graph[a].push_back(b);
  }
  
  return graph;
}

bool hasCycle(std::unordered_map<int, std::vector<int>> graph, std::unordered_set<int> &visiting, std::unordered_set<int> & visited, int node) {
  if (visiting.count(node) > 0) {
    return true;
  }
  
  if (visited.count(node) > 0) {
    return false;
  }
  
  visiting.insert(node);
  for (int neighbor : graph[node]) {
    if(hasCycle(graph, visiting, visited, neighbor)) {
      return true;
    }
  }
  
  visiting.erase(node);
  visited.insert(node);
  return false;
}


bool prereqsPossible(int numCourses, std::vector<std::tuple<int, int>> prereqs) {
  std::unordered_map<int, std::vector<int>> graph = buildGraph(prereqs);
  
  std::unordered_set<int> visiting;
  std::unordered_set<int> visited;
  
  for (int node = 0; node < numCourses; node += 1) {
    if (hasCycle(graph, visiting, visited, node)) {
      return false;
    }
  }
  
  return true;
}
```


