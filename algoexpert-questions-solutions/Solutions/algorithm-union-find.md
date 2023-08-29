# Union Find
<div class="html">
<p>
  Write a <span>UnionFind</span> class that implements the union-find (also
  called a disjoint set) data structure. This class should support three methods:
</p>

<p>
  The union-find data structure is similar to a traditional set data structure
  in that it contains a collection of unique values. However, these values are
  spread out amongst a variety of distinct disjoint sets, meaning that no set
  can have duplicate values, and no two sets can contain the same value.
</p>

<ul>
  <li>
    <span>createSet(value)</span>: Adds a given value in a new set containing
    only that value.
  </li>
  <li>
    <span>union(valueOne, valueTwo)</span>: Takes in two values and determines
    which sets they are in. If they are in different sets, the sets are combined
    into a single set. If either value is not in a set or they are in the same
    set, the function should have no effect.
  </li>
  <li>
    <span>find(value)</span>: Returns the "representative" value of the set for
    which a value belongs to. This can be any value in the set, but it should
    always be the same value, regardless of which value in the set
    <span>find</span> is passed. If the value is not in a set, the function
    should return <span>null</span> / <span>None</span>. Note that after a set
    is part of a union, its representative can potentially change.
  </li>
<p>
  You can assume <span>createSet</span> will never be called with the same
  value twice.
</p>

<p>
  If you're unfamiliar with Union Find, we recommend watching the Conceptual
  Overview section of this question's video explanation before starting to code.
</p>

<h3>Sample Usage</h3>
<pre>
<span class="CodeEditor-promptParameter">createSet</span>(5): null
<span class="CodeEditor-promptParameter">createSet</span>(10): null
<span class="CodeEditor-promptParameter">find</span>(5): 5
<span class="CodeEditor-promptParameter">find</span>(10): 10
<span class="CodeEditor-promptParameter">union</span>(5, 10): null
<span class="CodeEditor-promptParameter">find</span>(5): 5
<span class="CodeEditor-promptParameter">find</span>(10): 5
<span class="CodeEditor-promptParameter">createSet</span>(20): null
<span class="CodeEditor-promptParameter">find</span>(20): 20
<span class="CodeEditor-promptParameter">union</span>(20, 10): null
<span class="CodeEditor-promptParameter">find</span>(5): 5
<span class="CodeEditor-promptParameter">find</span>(10): 5
<span class="CodeEditor-promptParameter">find</span>(20): 5
</pre>
</div>

Hint 1
<p>
  Disjoint sets traditionally use a tree-like data structure for each set, with
  the root node being the "representative" node returned by <span>find</span>.
</p>


Hint 2

<p>
  When combining two trees with <span>union</span>, make sure to keep the height
  of the combined tree as small as possible in order to keep a logarithmic
  time complexity.
</p>


Hint 3

<p>
  The larger the tree is, the slower the time complexity will be. This can
  be improved by making all nodes in the trees point directly to the root,
  keeping a minimal height. A good time to make these updates is while running
  the <span>find</span> method. This is known as path compression.
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
      auto unionFind = new UnionFind();
      auto findResult = unionFind->find(1);
      assert(!findResult);

      unionFind->createSet(1);
      findResult = unionFind->find(1);
      assert(findResult && *findResult == 1);

      unionFind->createSet(5);
      findResult = unionFind->find(1);
      assert(findResult && *findResult == 1);

      findResult = unionFind->find(5);
      assert(findResult && *findResult == 5);

      unionFind->createUnion(5, 1);
      findResult = unionFind->find(5);
      auto findResult2 = unionFind->find(1);
      assert(findResult && findResult2 && *findResult == *findResult2);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <unordered_map>
#include <optional>
using namespace std;

class UnionFind {
public:
  unordered_map<int, int> parents;
  
  // O(1) time | O(1) space
  void createSet(int value) {
    parents[value] = value;
  }

  // O(n) time | O(1) space - where n is the total number of values
  optional<int> find(int value) {
    if (parents.find(value) == parents.end()) {
      return nullopt;
    }

    int currentParent = value;
    while (currentParent != parents[currentParent]) {
      currentParent = parents[currentParent];
    }

    return currentParent;
  }

  // O(n) time | O(1) space - where n is the total number of values
  // This function is renamed to `createUnion` because `union` is a reserved keyword in C++.
  void createUnion(int valueOne, int valueTwo) {
    if (parents.find(valueOne) == parents.end() || 
        parents.find(valueTwo) == parents.end()) {
      return;
    }

    int valueOneRoot = *find(valueOne);
    int valueTwoRoot = *find(valueTwo);
    parents[valueTwoRoot] = valueOneRoot;
  }
};

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <unordered_map>
#include <optional>
using namespace std;

class UnionFind {
public:
  unordered_map<int, int> parents;
  unordered_map<int, int> ranks;
  
  // O(1) time | O(1) space
  void createSet(int value) {
    parents[value] = value;
    ranks[value] = 0;
  }

  // O(log(n)) time | O(1) space - where n is the total number of values
  optional<int> find(int value) {
    if (parents.find(value) == parents.end()) {
      return nullopt;
    }

    int currentParent = value;
    while (currentParent != parents[currentParent]) {
      currentParent = parents[currentParent];
    }

    return currentParent;
  }

  // O(log(n)) time | O(1) space - where n is the total number of values
  // This function is renamed to `createUnion` because `union` is a reserved keyword in C++.
  void createUnion(int valueOne, int valueTwo) {
    if (parents.find(valueOne) == parents.end() || 
        parents.find(valueTwo) == parents.end()) {
      return;
    }

    int valueOneRoot = *find(valueOne);
    int valueTwoRoot = *find(valueTwo);
    if (ranks[valueOneRoot] < ranks[valueTwoRoot]) {
      parents[valueOneRoot] = valueTwoRoot;
    } else if (ranks[valueOneRoot] > ranks[valueTwoRoot]) {
      parents[valueTwoRoot] = valueOneRoot;
    } else {
      parents[valueTwoRoot] = valueOneRoot;
      ranks[valueOneRoot] = ranks[valueOneRoot] + 1;
    }
  }
};

```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <unordered_map>
#include <optional>
using namespace std;

class UnionFind {
public:
  unordered_map<int, int> parents;
  unordered_map<int, int> ranks;
  
  // O(1) time | O(1) space
  void createSet(int value) {
    parents[value] = value;
    ranks[value] = 0;
  }

  // O(α(n)), approximately O(1) time | O(α(n)), approximately O(1) space - where n is the total number of values
  optional<int> find(int value) {
    if (parents.find(value) == parents.end()) {
      return nullopt;
    }

    if (value != parents[value]) {
      parents[value] = *find(parents[value]);
    }

    return parents[value];
  }

  // O(α(n)), approximately O(1) time | O(α(n)), approximately O(1) space - where n is the total number of values
  // This function is renamed to `createUnion` because `union` is a reserved keyword in C++.
  void createUnion(int valueOne, int valueTwo) {
    if (parents.find(valueOne) == parents.end() || 
        parents.find(valueTwo) == parents.end()) {
      return;
    }

    int valueOneRoot = *find(valueOne);
    int valueTwoRoot = *find(valueTwo);
    if (ranks[valueOneRoot] < ranks[valueTwoRoot]) {
      parents[valueOneRoot] = valueTwoRoot;
    } else if (ranks[valueOneRoot] > ranks[valueTwoRoot]) {
      parents[valueTwoRoot] = valueOneRoot;
    } else {
      parents[valueTwoRoot] = valueOneRoot;
      ranks[valueOneRoot] = ranks[valueOneRoot] + 1;
    }
  }
};

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      auto unionFind = new UnionFind();
      auto findResult = unionFind->find(1);
      assert(!findResult);

      unionFind->createSet(1);
      findResult = unionFind->find(1);
      assert(findResult && *findResult == 1);

      unionFind->createSet(5);
      findResult = unionFind->find(1);
      assert(findResult && *findResult == 1);

      findResult = unionFind->find(5);
      assert(findResult && *findResult == 5);

      unionFind->createUnion(5, 1);
      findResult = unionFind->find(5);
      auto findResult2 = unionFind->find(1);
      assert(findResult && findResult2 && *findResult == *findResult2);
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
		var unionFind = new Program.UnionFind();
		Utils.AssertTrue(unionFind.Find(1) == null);
		unionFind.CreateSet(1);
		Utils.AssertTrue(unionFind.Find(1) == 1);
		unionFind.CreateSet(5);
		Utils.AssertTrue(unionFind.Find(1) == 1);
		Utils.AssertTrue(unionFind.Find(5) == 5);
		unionFind.Union(5, 1);
		Utils.AssertTrue(unionFind.Find(5) == unionFind.Find(1));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {
	public class UnionFind {
		private Dictionary<int, int> parents = new Dictionary<int, int>();

		// O(1) time | O(1) space
		public void CreateSet(int value) {
			parents[value] = value;
		}

		// O(n) time | O(1) space - where n is the total number of values
		public int? Find(int value) {
			if (!parents.ContainsKey(value)) {
				return null;
			}

			int currentParent = value;
			while (currentParent != parents[currentParent]) {
				currentParent = parents[currentParent];
			}
			return currentParent;
		}

		// O(n) time | O(1) space - where n is the total number of values
		public void Union(int valueOne, int valueTwo) {
			if (!parents.ContainsKey(valueOne) || !parents.ContainsKey(valueTwo)) {
				return;
			}

			int valueOneRoot = (int) Find(valueOne);
			int valueTwoRoot = (int) Find(valueTwo);
			parents[valueTwoRoot] = valueOneRoot;
		}

	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {
	public class UnionFind {
		private Dictionary<int, int> parents = new Dictionary<int, int>();
		private Dictionary<int, int> ranks = new Dictionary<int, int>();

		// O(1) time | O(1) space
		public void CreateSet(int value) {
			parents[value] = value;
			ranks[value] = 0;
		}

		// O(log(n)) time | O(1) space - where n is the total number of values
		public int? Find(int value) {
			if (!parents.ContainsKey(value)) {
				return null;
			}

			int currentParent = value;
			while (currentParent != parents[currentParent]) {
				currentParent = parents[currentParent];
			}
			return currentParent;
		}

		// O(log(n)) time | O(1) space - where n is the total number of values
		public void Union(int valueOne, int valueTwo) {
			if (!parents.ContainsKey(valueOne) || !parents.ContainsKey(valueTwo)) {
				return;
			}

			int valueOneRoot = (int) Find(valueOne);
			int valueTwoRoot = (int) Find(valueTwo);
			if (ranks[valueOneRoot] < ranks[valueTwoRoot]) {
				parents[valueOneRoot] = valueTwoRoot;
			} else if (ranks[valueOneRoot] > ranks[valueTwoRoot]) {
				parents[valueTwoRoot] = valueOneRoot;
			} else {
				parents[valueTwoRoot] = valueOneRoot;
				ranks[valueOneRoot] = ranks[valueOneRoot] + 1;
			}
		}
	}
}

```
### Solution 3 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;
using System;


public class Program {
	public class UnionFind {
		private Dictionary<int, int> parents = new Dictionary<int, int>();
		private Dictionary<int, int> ranks = new Dictionary<int, int>();

		// O(1) time | O(1) space
		public void CreateSet(int value) {
			parents[value] = value;
			ranks[value] = 0;
		}

		// O(α(n)), approximately O(1) time | O(α(n)), approximately O(1) space - where n is the total number of values
		public int? Find(int value) {
			if (!parents.ContainsKey(value)) {
				return null;
			}

			if (value != parents[value]) {
				parents[value] = (int) Find(parents[value]);
			}

			return parents[value];
		}

		// O(α(n)), approximately O(1) time | O(α(n)), approximately O(1) space - where n is the total number of values
		public void Union(int valueOne, int valueTwo) {
			if (!parents.ContainsKey(valueOne) || !parents.ContainsKey(valueTwo)) {
				return;
			}

			int valueOneRoot = (int) Find(valueOne);
			int valueTwoRoot = (int) Find(valueTwo);
			if (ranks[valueOneRoot] < ranks[valueTwoRoot]) {
				parents[valueOneRoot] = valueTwoRoot;
			} else if (ranks[valueOneRoot] > ranks[valueTwoRoot]) {
				parents[valueTwoRoot] = valueOneRoot;
			} else {
				parents[valueTwoRoot] = valueOneRoot;
				ranks[valueOneRoot] = ranks[valueOneRoot] + 1;
			}
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
		var unionFind = new Program.UnionFind();
		Utils.AssertTrue(unionFind.Find(1) == null);
		unionFind.CreateSet(1);
		Utils.AssertTrue(unionFind.Find(1) == 1);
		unionFind.CreateSet(5);
		Utils.AssertTrue(unionFind.Find(1) == 1);
		Utils.AssertTrue(unionFind.Find(5) == 5);
		unionFind.Union(5, 1);
		Utils.AssertTrue(unionFind.Find(5) == unionFind.Find(1));
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
	unionFind := NewUnionFind()
	require.Nil(t, unionFind.Find(1))
	unionFind.CreateSet(1)
	require.Equal(t, 1, *unionFind.Find(1))
	unionFind.CreateSet(5)
	require.Equal(t, 1, *unionFind.Find(1))
	require.Equal(t, 5, *unionFind.Find(5))
	unionFind.Union(5, 1)
	require.Equal(t, *unionFind.Find(5), *unionFind.Find(1))
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type UnionFind struct {
	parents map[int]int
}

func NewUnionFind() *UnionFind {
	return &UnionFind{
		parents: map[int]int{},
	}
}

// O(1) time | O(1) space
func (union *UnionFind) CreateSet(value int) {
	union.parents[value] = value
}

// O(n) time | O(1) space - where n is the total number of values
func (union *UnionFind) Find(value int) *int {
	if _, found := union.parents[value]; !found {
		return nil
	}

	currentParent := value
	for currentParent != union.parents[currentParent] {
		currentParent = union.parents[currentParent]
	}
	return &currentParent
}

// O(n) time | O(1) space - where n is the total number of values
func (union *UnionFind) Union(valueOne, valueTwo int) {
	_, parentsContainOne := union.parents[valueOne]
	_, parentsContainTwo := union.parents[valueTwo]
	if !parentsContainOne || !parentsContainTwo {
		return
	}

	valueOneRoot := *union.Find(valueOne)
	valueTwoRoot := *union.Find(valueTwo)
	union.parents[valueTwoRoot] = valueOneRoot
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type UnionFind struct {
	parents map[int]int
	ranks   map[int]int
}

func NewUnionFind() *UnionFind {
	return &UnionFind{
		parents: map[int]int{},
		ranks:   map[int]int{},
	}
}

// O(1) time | O(1) space
func (union *UnionFind) CreateSet(value int) {
	union.parents[value] = value
	union.ranks[value] = 0
}

// O(log(n)) time | O(1) space - where n is the total number of values
func (union *UnionFind) Find(value int) *int {
	if _, found := union.parents[value]; !found {
		return nil
	}

	currentParent := value
	for currentParent != union.parents[currentParent] {
		currentParent = union.parents[currentParent]
	}
	return &currentParent
}

// O(log(n)) time | O(1) space - where n is the total number of values
func (union *UnionFind) Union(valueOne, valueTwo int) {
	_, parentsContainOne := union.parents[valueOne]
	_, parentsContainTwo := union.parents[valueTwo]
	if !parentsContainOne || !parentsContainTwo {
		return
	}

	valueOneRoot := *union.Find(valueOne)
	valueTwoRoot := *union.Find(valueTwo)

	if union.ranks[valueOneRoot] < union.ranks[valueTwoRoot] {
		union.parents[valueOneRoot] = valueTwoRoot
	} else if union.ranks[valueOneRoot] > union.ranks[valueTwoRoot] {
		union.parents[valueTwoRoot] = valueOneRoot
	} else {
		union.parents[valueTwoRoot] = valueOneRoot
		union.ranks[valueOneRoot] = union.ranks[valueOneRoot] + 1
	}
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type UnionFind struct {
	parents map[int]int
	ranks   map[int]int
}

func NewUnionFind() *UnionFind {
	return &UnionFind{
		parents: map[int]int{},
		ranks:   map[int]int{},
	}
}

// O(1) time | O(1) space
func (union *UnionFind) CreateSet(value int) {
	union.parents[value] = value
	union.ranks[value] = 0
}

// O(α(n)), approximately O(1) time | O(α(n)), approximately O(1) space - where n is the total number of values
func (union *UnionFind) Find(value int) *int {
	if _, found := union.parents[value]; !found {
		return nil
	}

	if value != union.parents[value] {
		parentsValue := union.Find(union.parents[value])
		union.parents[value] = *parentsValue
	}
	result := union.parents[value]
	return &result
}

// O(α(n)), approximately O(1) time | O(α(n)), approximately O(1) space - where n is the total number of values
func (union *UnionFind) Union(valueOne, valueTwo int) {
	_, parentsContainOne := union.parents[valueOne]
	_, parentsContainTwo := union.parents[valueTwo]
	if !parentsContainOne || !parentsContainTwo {
		return
	}

	valueOneRoot := *union.Find(valueOne)
	valueTwoRoot := *union.Find(valueTwo)

	if union.ranks[valueOneRoot] < union.ranks[valueTwoRoot] {
		union.parents[valueOneRoot] = valueTwoRoot
	} else if union.ranks[valueOneRoot] > union.ranks[valueTwoRoot] {
		union.parents[valueTwoRoot] = valueOneRoot
	} else {
		union.parents[valueTwoRoot] = valueOneRoot
		union.ranks[valueOneRoot] = union.ranks[valueOneRoot] + 1
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
	unionFind := NewUnionFind()
	require.Nil(t, unionFind.Find(1))
	unionFind.CreateSet(1)
	require.Equal(t, 1, *unionFind.Find(1))
	unionFind.CreateSet(5)
	require.Equal(t, 1, *unionFind.Find(1))
	require.Equal(t, 5, *unionFind.Find(5))
	unionFind.Union(5, 1)
	require.Equal(t, *unionFind.Find(5), *unionFind.Find(1))
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
    var unionFind = new Program.UnionFind();
    Utils.assertTrue(unionFind.find(1) == null);
    unionFind.createSet(1);
    Utils.assertTrue(unionFind.find(1) == 1);
    unionFind.createSet(5);
    Utils.assertTrue(unionFind.find(1) == 1);
    Utils.assertTrue(unionFind.find(5) == 5);
    unionFind.union(5, 1);
    Utils.assertTrue(unionFind.find(5) == unionFind.find(1));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  static class UnionFind {
    private HashMap<Integer, Integer> parents = new HashMap<Integer, Integer>();

    // O(1) time | O(1) space
    public void createSet(int value) {
      parents.put(value, value);
    }

    // O(n) time | O(1) space - where n is the total number of values
    public Integer find(int value) {
      if (!parents.containsKey(value)) {
        return null;
      }

      int currentParent = value;
      while (currentParent != parents.get(currentParent)) {
        currentParent = parents.get(currentParent);
      }
      return currentParent;
    }

    // O(n) time | O(1) space - where n is the total number of values
    public void union(int valueOne, int valueTwo) {
      if (!parents.containsKey(valueOne) || !parents.containsKey(valueTwo)) {
        return;
      }

      int valueOneRoot = find(valueOne);
      int valueTwoRoot = find(valueTwo);
      parents.put(valueTwoRoot, valueOneRoot);
    }
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  static class UnionFind {
    private HashMap<Integer, Integer> parents = new HashMap<Integer, Integer>();
    private HashMap<Integer, Integer> ranks = new HashMap<Integer, Integer>();

    // O(1) time | O(1) space
    public void createSet(int value) {
      parents.put(value, value);
      ranks.put(value, 0);
    }

    // O(log(n)) time | O(1) space - where n is the total number of values
    public Integer find(int value) {
      if (!parents.containsKey(value)) {
        return null;
      }

      int currentParent = value;
      while (currentParent != parents.get(currentParent)) {
        currentParent = parents.get(currentParent);
      }
      return currentParent;
    }

    // O(log(n)) time | O(1) space - where n is the total number of values
    public void union(int valueOne, int valueTwo) {
      if (!parents.containsKey(valueOne) || !parents.containsKey(valueTwo)) {
        return;
      }

      int valueOneRoot = find(valueOne);
      int valueTwoRoot = find(valueTwo);
      if (ranks.get(valueOneRoot) < ranks.get(valueTwoRoot)) {
        parents.put(valueOneRoot, valueTwoRoot);
      } else if (ranks.get(valueOneRoot) > ranks.get(valueTwoRoot)) {
        parents.put(valueTwoRoot, valueOneRoot);
      } else {
        parents.put(valueTwoRoot, valueOneRoot);
        ranks.put(valueOneRoot, ranks.get(valueOneRoot) + 1);
      }
    }
  }
}

```
### Solution 3 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  static class UnionFind {
    private HashMap<Integer, Integer> parents = new HashMap<Integer, Integer>();
    private HashMap<Integer, Integer> ranks = new HashMap<Integer, Integer>();

    // O(1) time | O(1) space
    public void createSet(int value) {
      parents.put(value, value);
      ranks.put(value, 0);
    }

    // O(α(n)), approximately O(1) time | O(α(n)), approximately O(1) space - where n is the total
    // number of values
    public Integer find(int value) {
      if (!parents.containsKey(value)) {
        return null;
      }

      if (value != parents.get(value)) {
        parents.put(value, find(parents.get(value)));
      }

      return parents.get(value);
    }

    // O(α(n)), approximately O(1) time | O(α(n)), approximately O(1) space - where n is the total
    // number of values
    public void union(int valueOne, int valueTwo) {
      if (!parents.containsKey(valueOne) || !parents.containsKey(valueTwo)) {
        return;
      }

      int valueOneRoot = find(valueOne);
      int valueTwoRoot = find(valueTwo);
      if (ranks.get(valueOneRoot) < ranks.get(valueTwoRoot)) {
        parents.put(valueOneRoot, valueTwoRoot);
      } else if (ranks.get(valueOneRoot) > ranks.get(valueTwoRoot)) {
        parents.put(valueTwoRoot, valueOneRoot);
      } else {
        parents.put(valueTwoRoot, valueOneRoot);
        ranks.put(valueOneRoot, ranks.get(valueOneRoot) + 1);
      }
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
    var unionFind = new Program.UnionFind();
    Utils.assertTrue(unionFind.find(1) == null);
    unionFind.createSet(1);
    Utils.assertTrue(unionFind.find(1) == 1);
    unionFind.createSet(5);
    Utils.assertTrue(unionFind.find(1) == 1);
    Utils.assertTrue(unionFind.find(5) == 5);
    unionFind.union(5, 1);
    Utils.assertTrue(unionFind.find(5) == unionFind.find(1));
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
  const unionFind = new program.UnionFind();
  chai.expect(unionFind.find(1)).to.deep.equal(null);
  unionFind.createSet(1);
  chai.expect(unionFind.find(1)).to.deep.equal(1);
  unionFind.createSet(5);
  chai.expect(unionFind.find(1)).to.deep.equal(1);
  chai.expect(unionFind.find(5)).to.deep.equal(5);
  unionFind.union(5, 1);
  chai.expect(unionFind.find(5)).to.deep.equal(unionFind.find(1));
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class UnionFind {
  constructor() {
    this.parents = {};
  }

  // O(1) time | O(1) space
  createSet(value) {
    this.parents[value] = value;
  }

  // O(n) time | O(1) space - where n is the total number of values
  find(value) {
    if (!(value in this.parents)) return null;

    let currentParent = value;
    while (currentParent !== this.parents[currentParent]) {
      currentParent = this.parents[currentParent];
    }
    return currentParent;
  }

  // O(n) time | O(1) space - where n is the total number of values
  union(valueOne, valueTwo) {
    if (!(valueOne in this.parents) || !(valueTwo in this.parents)) return;

    const valueOneRoot = this.find(valueOne);
    const valueTwoRoot = this.find(valueTwo);
    this.parents[valueTwoRoot] = valueOneRoot;
  }
}

exports.UnionFind = UnionFind;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class UnionFind {
  constructor() {
    this.parents = {};
    this.ranks = {};
  }

  // O(1) time | O(1) space
  createSet(value) {
    this.parents[value] = value;
    this.ranks[value] = 0;
  }

  // O(log(n)) time | O(1) space - where n is the total number of values
  find(value) {
    if (!(value in this.parents)) return null;

    let currentParent = value;
    while (currentParent !== this.parents[currentParent]) {
      currentParent = this.parents[currentParent];
    }
    return currentParent;
  }

  // O(log(n)) time | O(1) space - where n is the total number of values
  union(valueOne, valueTwo) {
    if (!(valueOne in this.parents) || !(valueTwo in this.parents)) return;

    const valueOneRoot = this.find(valueOne);
    const valueTwoRoot = this.find(valueTwo);
    if (this.ranks[valueOneRoot] < this.ranks[valueTwoRoot]) {
      this.parents[valueOneRoot] = valueTwoRoot;
    } else if (this.ranks[valueOneRoot] > this.ranks[valueTwoRoot]) {
      this.parents[valueTwoRoot] = valueOneRoot;
    } else {
      this.parents[valueTwoRoot] = valueOneRoot;
      this.ranks[valueOneRoot] += 1;
    }
  }
}

exports.UnionFind = UnionFind;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class UnionFind {
  constructor() {
    this.parents = {};
    this.ranks = {};
  }

  // O(1) time | O(1) space
  createSet(value) {
    this.parents[value] = value;
    this.ranks[value] = 0;
  }

  // O(α(n)), approximately O(1) time | O(α(n)), approximately O(1) space - where n is the total number of values
  find(value) {
    if (!(value in this.parents)) return null;

    if (value !== this.parents[value]) {
      this.parents[value] = this.find(this.parents[value]);
    }

    return this.parents[value];
  }

  // O(α(n)), approximately O(1) time | O(α(n)), approximately O(1) space - where n is the total number of values
  union(valueOne, valueTwo) {
    if (!(valueOne in this.parents) || !(valueTwo in this.parents)) return;

    const valueOneRoot = this.find(valueOne);
    const valueTwoRoot = this.find(valueTwo);
    if (this.ranks[valueOneRoot] < this.ranks[valueTwoRoot]) {
      this.parents[valueOneRoot] = valueTwoRoot;
    } else if (this.ranks[valueOneRoot] > this.ranks[valueTwoRoot]) {
      this.parents[valueTwoRoot] = valueOneRoot;
    } else {
      this.parents[valueTwoRoot] = valueOneRoot;
      this.ranks[valueOneRoot] += 1;
    }
  }
}

exports.UnionFind = UnionFind;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const unionFind = new program.UnionFind();
  chai.expect(unionFind.find(1)).to.deep.equal(null);
  unionFind.createSet(1);
  chai.expect(unionFind.find(1)).to.deep.equal(1);
  unionFind.createSet(5);
  chai.expect(unionFind.find(1)).to.deep.equal(1);
  chai.expect(unionFind.find(5)).to.deep.equal(5);
  unionFind.union(5, 1);
  chai.expect(unionFind.find(5)).to.deep.equal(unionFind.find(1));
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.UnionFind as UnionFind

class ProgramTest {
    @Test
    fun TestCase1() {
        val unionFind = UnionFind()
        assert(unionFind.find(1) == null)
        unionFind.createSet(1)
        assert(unionFind.find(1) == 1)
        unionFind.createSet(5)
        assert(unionFind.find(1) == 1)
        assert(unionFind.find(5) == 5)
        unionFind.union(5, 1)
        assert(unionFind.find(5) == unionFind.find(1))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

open class UnionFind() {
    val parents = mutableMapOf<Int, Int>()

    // O(1) time | O(1) space
    fun createSet(value: Int) {
        this.parents[value] = value
    }

    // O(n) time | O(1) space - where n is the total number of values
    fun find(value: Int): Int? {
        if (!(value in this.parents)) return null

        var currentParent = value
        while (currentParent != this.parents[currentParent]) {
            currentParent = this.parents[currentParent]!!
        }
        return currentParent
    }

    // O(n) time | O(1) space - where n is the total number of values
    fun union(valueOne: Int, valueTwo: Int) {
        if (!(valueOne in this.parents) || !(valueTwo in this.parents)) return

        val valueOneRoot = this.find(valueOne)!!
        val valueTwoRoot = this.find(valueTwo)!!
        this.parents[valueTwoRoot] = valueOneRoot
    }
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

open class UnionFind() {
    val parents = mutableMapOf<Int, Int>()
    val ranks = mutableMapOf<Int, Int>()

    // O(1) time | O(1) space
    fun createSet(value: Int) {
        this.parents[value] = value
        this.ranks[value] = 0
    }

    // O(log(n)) time | O(1) space - where n is the total number of values
    fun find(value: Int): Int? {
        if (!(value in this.parents)) return null

        var currentParent = value
        while (currentParent != this.parents[currentParent]) {
            currentParent = this.parents[currentParent]!!
        }
        return currentParent
    }

    // O(log(n)) time | O(1) space - where n is the total number of values
    fun union(valueOne: Int, valueTwo: Int) {
        if (!(valueOne in this.parents) || !(valueTwo in this.parents)) return

        val valueOneRoot = this.find(valueOne)!!
        val valueTwoRoot = this.find(valueTwo)!!
        if (this.ranks[valueOneRoot]!! < this.ranks[valueTwoRoot]!!) {
            this.parents[valueOneRoot] = valueTwoRoot
        } else if (this.ranks[valueOneRoot]!! > this.ranks[valueTwoRoot]!!) {
            this.parents[valueTwoRoot] = valueOneRoot
        } else {
            this.parents[valueTwoRoot] = valueOneRoot
            this.ranks[valueOneRoot] = this.ranks[valueOneRoot]!! + 1
        }
    }
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

open class UnionFind() {
    val parents = mutableMapOf<Int, Int>()
    val ranks = mutableMapOf<Int, Int>()

    // O(1) time | O(1) space
    fun createSet(value: Int) {
        this.parents[value] = value
        this.ranks[value] = 0
    }

    // O(α(n)), approximately O(1) time | O(α(n)), approximately O(1) space - where n is the total number of values
    fun find(value: Int): Int? {
        if (!(value in this.parents)) return null

        if (value != this.parents[value]) {
            this.parents[value] = this.find(this.parents[value]!!)!!
        }

        return this.parents[value]
    }

    // O(α(n)), approximately O(1) time | O(α(n)), approximately O(1) space - where n is the total number of values
    fun union(valueOne: Int, valueTwo: Int) {
        if (!(valueOne in this.parents) || !(valueTwo in this.parents)) return

        val valueOneRoot = this.find(valueOne)!!
        val valueTwoRoot = this.find(valueTwo)!!
        if (this.ranks[valueOneRoot]!! < this.ranks[valueTwoRoot]!!) {
            this.parents[valueOneRoot] = valueTwoRoot
        } else if (this.ranks[valueOneRoot]!! > this.ranks[valueTwoRoot]!!) {
            this.parents[valueTwoRoot] = valueOneRoot
        } else {
            this.parents[valueTwoRoot] = valueOneRoot
            this.ranks[valueOneRoot] = this.ranks[valueOneRoot]!! + 1
        }
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.UnionFind as UnionFind

class ProgramTest {
    @Test
    fun TestCase1() {
        val unionFind = UnionFind()
        assert(unionFind.find(1) == null)
        unionFind.createSet(1)
        assert(unionFind.find(1) == 1)
        unionFind.createSet(5)
        assert(unionFind.find(1) == 1)
        assert(unionFind.find(5) == 5)
        unionFind.union(5, 1)
        assert(unionFind.find(5) == unionFind.find(1))
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
      var unionFind = Program.UnionFind()
      try assertEqual(nil, unionFind.find(1))
      unionFind.createSet(1)
      try assertEqual(1, unionFind.find(1))
      unionFind.createSet(5)
      try assertEqual(1, unionFind.find(1))
      try assertEqual(5, unionFind.find(5))
      unionFind.union(5, 1)
      try assertEqual(unionFind.find(1), unionFind.find(5))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  class UnionFind {
    var parents = [Int: Int]()

    // O(1) time | O(1) space
    func createSet(_ value: Int) {
      parents[value] = value
    }

    // O(n) time | O(1) space - where n is the total number of values
    func find(_ value: Int) -> Int? {
      if parents[value] == nil {
        return nil
      }

      var currentParent = value
      while currentParent != parents[currentParent] {
        currentParent = parents[currentParent]!
      }
      return currentParent
    }

    // O(n) time | O(1) space - where n is the total number of values
    func union(_ valueOne: Int, _ valueTwo: Int) {
      if let valueOneRoot = find(valueOne), let valueTwoRoot = find(valueTwo) {
        parents[valueTwoRoot] = valueOneRoot
      }
    }
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  class UnionFind {
    var parents = [Int: Int]()
    var ranks = [Int: Int]()

    // O(1) time | O(1) space
    func createSet(_ value: Int) {
      parents[value] = value
      ranks[value] = 0
    }

    // O(log(n)) time | O(1) space - where n is the total number of values
    func find(_ value: Int) -> Int? {
      if parents[value] == nil {
        return nil
      }

      var currentParent = value
      while currentParent != parents[currentParent] {
        currentParent = parents[currentParent]!
      }
      return currentParent
    }

    // O(log(n)) time | O(1) space - where n is the total number of values
    func union(_ valueOne: Int, _ valueTwo: Int) {
      if parents[valueOne] == nil || parents[valueTwo] == nil {
        return
      }

      let valueOneRoot = find(valueOne)!
      let valueTwoRoot = find(valueTwo)!

      if ranks[valueOneRoot]! < ranks[valueTwoRoot]! {
        parents[valueOneRoot] = valueTwoRoot
      } else if ranks[valueOneRoot]! > ranks[valueTwoRoot]! {
        parents[valueTwoRoot] = valueOneRoot
      } else {
        parents[valueTwoRoot] = valueOneRoot
        ranks[valueOneRoot] = ranks[valueOneRoot]! + 1
      }
    }
  }
}

```
### Solution 3 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  class UnionFind {
    var parents = [Int: Int]()
    var ranks = [Int: Int]()

    // O(1) time | O(1) space
    func createSet(_ value: Int) {
      parents[value] = value
      ranks[value] = 0
    }

    // O(α(n)), approximately O(1) time | O(α(n)), approximately O(1) space - where n is the total number of values
    func find(_ value: Int) -> Int? {
      if parents[value] == nil {
        return nil
      }

      if value != parents[value]! {
        parents[value] = find(parents[value]!)!
      }
      return parents[value]
    }

    // O(α(n)), approximately O(1) time | O(α(n)), approximately O(1) space - where n is the total number of values
    func union(_ valueOne: Int, _ valueTwo: Int) {
      if parents[valueOne] == nil || parents[valueTwo] == nil {
        return
      }

      let valueOneRoot = find(valueOne)!
      let valueTwoRoot = find(valueTwo)!

      if ranks[valueOneRoot]! < ranks[valueTwoRoot]! {
        parents[valueOneRoot] = valueTwoRoot
      } else if ranks[valueOneRoot]! > ranks[valueTwoRoot]! {
        parents[valueTwoRoot] = valueOneRoot
      } else {
        parents[valueTwoRoot] = valueOneRoot
        ranks[valueOneRoot] = ranks[valueOneRoot]! + 1
      }
    }
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws in
      var unionFind = Program.UnionFind()
      try assertEqual(nil, unionFind.find(1))
      unionFind.createSet(1)
      try assertEqual(1, unionFind.find(1))
      unionFind.createSet(5)
      try assertEqual(1, unionFind.find(1))
      try assertEqual(5, unionFind.find(5))
      unionFind.union(5, 1)
      try assertEqual(unionFind.find(1), unionFind.find(5))
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


UnionFind = program.UnionFind


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        unionFind = UnionFind()
        self.assertTrue(unionFind.find(1) == None)
        unionFind.createSet(1)
        self.assertTrue(unionFind.find(1) == 1)
        unionFind.createSet(5)
        self.assertTrue(unionFind.find(1) == 1)
        self.assertTrue(unionFind.find(5) == 5)
        unionFind.union(5, 1)
        self.assertTrue(unionFind.find(5) == unionFind.find(1))

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class UnionFind:
    def __init__(self):
        self.parents = {}

    # O(1) time | O(1) space
    def createSet(self, value):
        self.parents[value] = value

    # O(n) time | O(1) space - where n is the total number of values
    def find(self, value):
        if value not in self.parents:
            return None

        currentParent = value
        while currentParent != self.parents[currentParent]:
            currentParent = self.parents[currentParent]
        return currentParent

    # O(n) time | O(1) space - where n is the total number of values
    def union(self, valueOne, valueTwo):
        if valueOne not in self.parents or valueTwo not in self.parents:
            return

        valueOneRoot = self.find(valueOne)
        valueTwoRoot = self.find(valueTwo)
        self.parents[valueTwoRoot] = valueOneRoot

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class UnionFind:
    def __init__(self):
        self.parents = {}
        self.ranks = {}

    # O(1) time | O(1) space
    def createSet(self, value):
        self.parents[value] = value
        self.ranks[value] = 0

    # O(log(n)) time | O(1) space - where n is the total number of values
    def find(self, value):
        if value not in self.parents:
            return None

        currentParent = value
        while currentParent != self.parents[currentParent]:
            currentParent = self.parents[currentParent]
        return currentParent

    # O(log(n)) time | O(1) space - where n is the total number of values
    def union(self, valueOne, valueTwo):
        if valueOne not in self.parents or valueTwo not in self.parents:
            return

        valueOneRoot = self.find(valueOne)
        valueTwoRoot = self.find(valueTwo)
        if self.ranks[valueOneRoot] < self.ranks[valueTwoRoot]:
            self.parents[valueOneRoot] = valueTwoRoot
        elif self.ranks[valueOneRoot] > self.ranks[valueTwoRoot]:
            self.parents[valueTwoRoot] = valueOneRoot
        else:
            self.parents[valueTwoRoot] = valueOneRoot
            self.ranks[valueOneRoot] += 1

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class UnionFind:
    def __init__(self):
        self.parents = {}
        self.ranks = {}

    # O(1) time | O(1) space
    def createSet(self, value):
        self.parents[value] = value
        self.ranks[value] = 0

    # O(α(n)), approximately O(1) time | O(α(n)), approximately O(1) space - where n is the total number of values
    def find(self, value):
        if value not in self.parents:
            return None

        if value != self.parents[value]:
            self.parents[value] = self.find(self.parents[value])

        return self.parents[value]

    # O(α(n)), approximately O(1) time | O(α(n)), approximately O(1) space - where n is the total number of values
    def union(self, valueOne, valueTwo):
        if valueOne not in self.parents or valueTwo not in self.parents:
            return

        valueOneRoot = self.find(valueOne)
        valueTwoRoot = self.find(valueTwo)
        if self.ranks[valueOneRoot] < self.ranks[valueTwoRoot]:
            self.parents[valueOneRoot] = valueTwoRoot
        elif self.ranks[valueOneRoot] > self.ranks[valueTwoRoot]:
            self.parents[valueTwoRoot] = valueOneRoot
        else:
            self.parents[valueTwoRoot] = valueOneRoot
            self.ranks[valueOneRoot] += 1

```
### Unit Tests 1 (python)
```python
import program
import unittest


UnionFind = program.UnionFind


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        unionFind = UnionFind()
        self.assertTrue(unionFind.find(1) == None)
        unionFind.createSet(1)
        self.assertTrue(unionFind.find(1) == 1)
        unionFind.createSet(5)
        self.assertTrue(unionFind.find(1) == 1)
        self.assertTrue(unionFind.find(5) == 5)
        unionFind.union(5, 1)
        self.assertTrue(unionFind.find(5) == unionFind.find(1))

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const unionFind = new program.UnionFind();
  chai.expect(unionFind.find(1)).to.deep.equal(null);
  unionFind.createSet(1);
  chai.expect(unionFind.find(1)).to.deep.equal(1);
  unionFind.createSet(5);
  chai.expect(unionFind.find(1)).to.deep.equal(1);
  chai.expect(unionFind.find(5)).to.deep.equal(5);
  unionFind.union(5, 1);
  chai.expect(unionFind.find(5)).to.deep.equal(unionFind.find(1));
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

export class UnionFind {
  parents: Record<number, number>;

  constructor() {
    this.parents = {};
  }

  // O(1) time | O(1) space
  createSet(value: number) {
    this.parents[value] = value;
  }

  // O(n) time | O(1) space - where n is the total number of values
  find(value: number) {
    if (!(value in this.parents)) return null;

    let currentParent = value;
    while (currentParent !== this.parents[currentParent]) {
      currentParent = this.parents[currentParent];
    }
    return currentParent;
  }

  // O(n) time | O(1) space - where n is the total number of values
  union(valueOne: number, valueTwo: number) {
    if (!(valueOne in this.parents) || !(valueTwo in this.parents)) return;

    const valueOneRoot = this.find(valueOne)!;
    const valueTwoRoot = this.find(valueTwo)!;
    this.parents[valueTwoRoot] = valueOneRoot;
  }
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

export class UnionFind {
  parents: Record<number, number>;
  ranks: Record<number, number>;

  constructor() {
    this.parents = {};
    this.ranks = {};
  }

  // O(1) time | O(1) space
  createSet(value: number) {
    this.parents[value] = value;
    this.ranks[value] = 0;
  }

  // O(log(n)) time | O(1) space - where n is the total number of values
  find(value: number) {
    if (!(value in this.parents)) return null;

    let currentParent = value;
    while (currentParent !== this.parents[currentParent]) {
      currentParent = this.parents[currentParent];
    }
    return currentParent;
  }

  // O(log(n)) time | O(1) space - where n is the total number of values
  union(valueOne: number, valueTwo: number) {
    if (!(valueOne in this.parents) || !(valueTwo in this.parents)) return;

    const valueOneRoot = this.find(valueOne)!;
    const valueTwoRoot = this.find(valueTwo)!;
    if (this.ranks[valueOneRoot] < this.ranks[valueTwoRoot]) {
      this.parents[valueOneRoot] = valueTwoRoot;
    } else if (this.ranks[valueOneRoot] > this.ranks[valueTwoRoot]) {
      this.parents[valueTwoRoot] = valueOneRoot;
    } else {
      this.parents[valueTwoRoot] = valueOneRoot;
      this.ranks[valueOneRoot] += 1;
    }
  }
}

```
### Solution 3 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

export class UnionFind {
  parents: Record<number, number>;
  ranks: Record<number, number>;

  constructor() {
    this.parents = {};
    this.ranks = {};
  }

  // O(1) time | O(1) space
  createSet(value: number) {
    this.parents[value] = value;
    this.ranks[value] = 0;
  }

  // O(α(n)), approximately O(1) time | O(α(n)), approximately O(1) space - where n is the total number of values
  find(value: number) {
    if (!(value in this.parents)) return null;

    if (value !== this.parents[value]) {
      this.parents[value] = this.find(this.parents[value])!;
    }

    return this.parents[value];
  }

  // O(α(n)), approximately O(1) time | O(α(n)), approximately O(1) space - where n is the total number of values
  union(valueOne: number, valueTwo: number) {
    if (!(valueOne in this.parents) || !(valueTwo in this.parents)) return;

    const valueOneRoot = this.find(valueOne)!;
    const valueTwoRoot = this.find(valueTwo)!;
    if (this.ranks[valueOneRoot] < this.ranks[valueTwoRoot]) {
      this.parents[valueOneRoot] = valueTwoRoot;
    } else if (this.ranks[valueOneRoot] > this.ranks[valueTwoRoot]) {
      this.parents[valueTwoRoot] = valueOneRoot;
    } else {
      this.parents[valueTwoRoot] = valueOneRoot;
      this.ranks[valueOneRoot] += 1;
    }
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const unionFind = new program.UnionFind();
  chai.expect(unionFind.find(1)).to.deep.equal(null);
  unionFind.createSet(1);
  chai.expect(unionFind.find(1)).to.deep.equal(1);
  unionFind.createSet(5);
  chai.expect(unionFind.find(1)).to.deep.equal(1);
  chai.expect(unionFind.find(5)).to.deep.equal(5);
  unionFind.union(5, 1);
  chai.expect(unionFind.find(5)).to.deep.equal(unionFind.find(1));
});

```

