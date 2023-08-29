# Youngest Common Ancestor
<div class="html">
<p>
  You're given three inputs, all of which are instances of an
  <span>AncestralTree</span> class that have an <span>ancestor</span> property
  pointing to their youngest ancestor. The first input is the top ancestor in an
  ancestral tree (i.e., the only instance that has no ancestor--its
  <span>ancestor</span> property points to <span>None</span> /
  <span>null</span>), and the other two inputs are descendants in the ancestral
  tree.
</p>
<p>
  Write a function that returns the youngest common ancestor to the two
  descendants.
</p>
<p>
  Note that a descendant is considered its own ancestor. So in the simple
  ancestral tree below, the youngest common ancestor to nodes A and B is node A.
</p>
<pre>
<span class="CodeEditor-promptComment">// The youngest common ancestor to nodes A and B is node A.</span>
  A
 /
B
</pre>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptComment">// The nodes are from the ancestral tree below.</span>
<span class="CodeEditor-promptParameter">topAncestor</span> = node A
<span class="CodeEditor-promptParameter">descendantOne</span> = node E
<span class="CodeEditor-promptParameter">descendantTwo</span> = node I
          A
       /     \
      B       C
    /   \   /   \
   D     E F     G
 /   \
H     I
</pre>
<h3>Sample Output</h3>
<pre>
node B
</pre>
</div>

Hint 1
<p>
You could try to simultaneously iterate through the ancestors of both input descendants until you find a common ancestor; however, if one of the descendants has more ancestors than the other (i.e., is lower in the ancestral tree), you won't find the youngest common ancestor. How can you get around this problem?
</p>


Hint 2

<p>
Start by finding the two input descendants' depths in the ancestral tree. If one of them is deeper, iterate up through its ancestors until you reach the depth of the higher descendant. Then, iterate through both descendants' ancestors in tandem until you find the first common ancestor. Note that at this point, one of the descendants will be the ancestor of the lower descendant that is at the same level as the higher descendant.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

#include <unordered_map>

void AncestralTree::addAsAncestor(vector<AncestralTree *> descendants) {
  for (AncestralTree *descendant : descendants) {
    descendant->ancestor = this;
  }
}

unordered_map<char, AncestralTree *> getAncestralTrees() {
  unordered_map<char, AncestralTree *> trees;
  string alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (char a : alphabet) {
    trees.insert({a, new AncestralTree(a)});
  }
  return trees;
}

class ProgramTest : public TestSuite {
public:
  void Run() {

    RunTest("Test Case 1", []() {
      auto trees = getAncestralTrees();
      trees.at('A')->addAsAncestor({trees.at('B'), trees.at('C')});
      trees.at('B')->addAsAncestor({trees.at('D'), trees.at('E')});
      trees.at('D')->addAsAncestor({trees.at('H'), trees.at('I')});
      trees.at('C')->addAsAncestor({trees.at('F'), trees.at('G')});

      AncestralTree *yca = getYoungestCommonAncestor(
          trees.at('A'), trees.at('E'), trees.at('I'));
      assert(yca == trees.at('B'));
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

class AncestralTree {
public:
  char name;
  AncestralTree *ancestor;

  AncestralTree(char name) {
    this->name = name;
    this->ancestor = nullptr;
  }

  void addAsAncestor(vector<AncestralTree *> descendants);
};

int getDescendantDepth(AncestralTree *descendant, AncestralTree *topAncestor);
AncestralTree *backtrackAncestralTree(AncestralTree *lowerDescendant,
                                      AncestralTree *higherDescendant,
                                      int diff);

// O(d) time | O(1) space - where d is the depth (height) of the ancestral tree
AncestralTree *getYoungestCommonAncestor(AncestralTree *topAncestor,
                                         AncestralTree *descendantOne,
                                         AncestralTree *descendantTwo) {
  int depthOne = getDescendantDepth(descendantOne, topAncestor);
  int depthTwo = getDescendantDepth(descendantTwo, topAncestor);
  if (depthOne > depthTwo) {
    return backtrackAncestralTree(descendantOne, descendantTwo,
                                  depthOne - depthTwo);
  } else {
    return backtrackAncestralTree(descendantTwo, descendantOne,
                                  depthTwo - depthOne);
  }
}

int getDescendantDepth(AncestralTree *descendant, AncestralTree *topAncestor) {
  int depth = 0;
  while (descendant != topAncestor) {
    depth++;
    descendant = descendant->ancestor;
  }
  return depth;
}

AncestralTree *backtrackAncestralTree(AncestralTree *lowerDescendant,
                                      AncestralTree *higherDescendant,
                                      int diff) {
  while (diff > 0) {
    lowerDescendant = lowerDescendant->ancestor;
    diff--;
  }
  while (lowerDescendant != higherDescendant) {
    lowerDescendant = lowerDescendant->ancestor;
    higherDescendant = higherDescendant->ancestor;
  }
  return lowerDescendant;
}

```
### Unit Tests 1 (cpp)
```cpp
#include <unordered_map>

void AncestralTree::addAsAncestor(vector<AncestralTree *> descendants) {
  for (AncestralTree *descendant : descendants) {
    descendant->ancestor = this;
  }
}

unordered_map<char, AncestralTree *> getAncestralTrees() {
  unordered_map<char, AncestralTree *> trees;
  string alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (char a : alphabet) {
    trees.insert({a, new AncestralTree(a)});
  }
  return trees;
}

class ProgramTest : public TestSuite {
public:
  void Run() {

    RunTest("Test Case 1", []() {
      auto trees = getAncestralTrees();
      trees.at('A')->addAsAncestor({trees.at('B'), trees.at('C')});
      trees.at('B')->addAsAncestor({trees.at('D'), trees.at('E')});
      trees.at('D')->addAsAncestor({trees.at('H'), trees.at('I')});
      trees.at('C')->addAsAncestor({trees.at('F'), trees.at('G')});

      AncestralTree *yca = getYoungestCommonAncestor(
          trees.at('A'), trees.at('E'), trees.at('I'));
      assert(yca == trees.at('B'));
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
	public Dictionary<char, Program.AncestralTree> getNewTrees() {
		var trees = new Dictionary<char, Program.AncestralTree>();
		var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		foreach (char a in alphabet) {
			trees.Add(a, new Program.AncestralTree(a));
		}

		trees['A'].AddAsAncestor(new Program.AncestralTree[] {
			trees['B'],
			trees['C'],
			trees['D'],
			trees['E'],
			trees['F']
		});
		return trees;
	}

	[Test]
	public void TestCase1() {
		var trees = getNewTrees();
		trees['A'].AddAsAncestor(new Program.AncestralTree[] {trees['B'], trees['C']});
		trees['B'].AddAsAncestor(new Program.AncestralTree[] {trees['D'], trees['E']});
		trees['D'].AddAsAncestor(new Program.AncestralTree[] {trees['H'], trees['I']});
		trees['C'].AddAsAncestor(new Program.AncestralTree[] {trees['F'], trees['G']});

		Program.AncestralTree yca = Program.GetYoungestCommonAncestor(trees['A'],
		    trees['E'],
		    trees['I']);
		Utils.AssertTrue(yca == trees['B']);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(d) time | O(1) space - where d is the depth (height) of the ancestral tree
	public static AncestralTree GetYoungestCommonAncestor(
		AncestralTree topAncestor,
		AncestralTree descendantOne,
		AncestralTree descendantTwo
		) {
		int depthOne = getDescendantDepth(descendantOne, topAncestor);
		int depthTwo = getDescendantDepth(descendantTwo, topAncestor);
		if (depthOne > depthTwo) {
			return backtrackAncestralTree(descendantOne, descendantTwo,
			         depthOne - depthTwo);
		} else {
			return backtrackAncestralTree(descendantTwo, descendantOne,
			         depthTwo - depthOne);
		}
	}

	public static int getDescendantDepth(AncestralTree descendant, AncestralTree topAncestor) {
		int depth = 0;
		while (descendant != topAncestor) {
			depth++;
			descendant = descendant.ancestor;
		}
		return depth;
	}

	public static AncestralTree backtrackAncestralTree(
		AncestralTree lowerDescendant,
		AncestralTree higherDescendant,
		int diff
		) {
		while (diff > 0) {
			lowerDescendant = lowerDescendant.ancestor;
			diff--;
		}
		while (lowerDescendant != higherDescendant) {
			lowerDescendant = lowerDescendant.ancestor;
			higherDescendant = higherDescendant.ancestor;
		}
		return lowerDescendant;
	}

	public class AncestralTree {
		public char name;
		public AncestralTree ancestor;

		public AncestralTree(char name) {
			this.name = name;
			this.ancestor = null;
		}

		// This method is for testing only.
		public void AddAsAncestor(AncestralTree[] descendants) {
			foreach (AncestralTree descendant in descendants) {
				descendant.ancestor = this;
			}
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;

public class ProgramTest {
	public Dictionary<char, Program.AncestralTree> getNewTrees() {
		var trees = new Dictionary<char, Program.AncestralTree>();
		var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		foreach (char a in alphabet) {
			trees.Add(a, new Program.AncestralTree(a));
		}

		trees['A'].AddAsAncestor(new Program.AncestralTree[] {
			trees['B'],
			trees['C'],
			trees['D'],
			trees['E'],
			trees['F']
		});
		return trees;
	}

	[Test]
	public void TestCase1() {
		var trees = getNewTrees();
		trees['A'].AddAsAncestor(new Program.AncestralTree[] {trees['B'], trees['C']});
		trees['B'].AddAsAncestor(new Program.AncestralTree[] {trees['D'], trees['E']});
		trees['D'].AddAsAncestor(new Program.AncestralTree[] {trees['H'], trees['I']});
		trees['C'].AddAsAncestor(new Program.AncestralTree[] {trees['F'], trees['G']});

		Program.AncestralTree yca = Program.GetYoungestCommonAncestor(trees['A'],
		    trees['E'],
		    trees['I']);
		Utils.AssertTrue(yca == trees['B']);
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

func (tree *AncestralTree) addAsAncestor(descendants ...*AncestralTree) {
	for _, descendant := range descendants {
		descendant.Ancestor = tree
	}
}

func getTrees() map[rune]*AncestralTree {
	trees := map[rune]*AncestralTree{}
	for _, r := range "ABCDEFGHIJKLMNOPQRSTUVWXYZ" {
		trees[r] = &AncestralTree{Name: string(r)}
	}
	return trees
}

func (s *TestSuite) TestCase1(t *TestCase) {
	trees := getTrees()
	trees['A'].addAsAncestor(trees['B'], trees['C'])
	trees['B'].addAsAncestor(trees['D'], trees['E'])
	trees['D'].addAsAncestor(trees['H'], trees['I'])
	trees['C'].addAsAncestor(trees['F'], trees['G'])
	yca := GetYoungestCommonAncestor(trees['A'], trees['E'], trees['I'])
	require.Equal(t, trees['B'], yca)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type AncestralTree struct {
	Name     string
	Ancestor *AncestralTree
}

// O(d) time | O(1) space - where d is the depth (height) of the ancestral tree
func GetYoungestCommonAncestor(topAncestor, descendantOne, descendantTwo *AncestralTree) *AncestralTree {
	depthOne := getDescendantDepth(descendantOne, topAncestor)
	depthTwo := getDescendantDepth(descendantTwo, topAncestor)
	if depthOne > depthTwo {
		return backtrackAncestralTree(descendantOne, descendantTwo, depthOne-depthTwo)
	}
	return backtrackAncestralTree(descendantTwo, descendantOne, depthTwo-depthOne)
}

func getDescendantDepth(descendant, topAncestor *AncestralTree) int {
	depth := 0
	for descendant != topAncestor {
		depth++
		descendant = descendant.Ancestor
	}
	return depth
}

func backtrackAncestralTree(lowerDescendant, higherDescendant *AncestralTree, diff int) *AncestralTree {
	for diff > 0 {
		lowerDescendant = lowerDescendant.Ancestor
		diff--
	}
	for lowerDescendant != higherDescendant {
		lowerDescendant = lowerDescendant.Ancestor
		higherDescendant = higherDescendant.Ancestor
	}
	return lowerDescendant
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (tree *AncestralTree) addAsAncestor(descendants ...*AncestralTree) {
	for _, descendant := range descendants {
		descendant.Ancestor = tree
	}
}

func getTrees() map[rune]*AncestralTree {
	trees := map[rune]*AncestralTree{}
	for _, r := range "ABCDEFGHIJKLMNOPQRSTUVWXYZ" {
		trees[r] = &AncestralTree{Name: string(r)}
	}
	return trees
}

func (s *TestSuite) TestCase1(t *TestCase) {
	trees := getTrees()
	trees['A'].addAsAncestor(trees['B'], trees['C'])
	trees['B'].addAsAncestor(trees['D'], trees['E'])
	trees['D'].addAsAncestor(trees['H'], trees['I'])
	trees['C'].addAsAncestor(trees['F'], trees['G'])
	yca := GetYoungestCommonAncestor(trees['A'], trees['E'], trees['I'])
	require.Equal(t, trees['B'], yca)
}

```
### Sandbox Code (java)
```java
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import java.util.*;

class ProgramTest {
  public HashMap<Character, Program.AncestralTree> getTrees() {
    var trees = new HashMap<Character, Program.AncestralTree>();
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (char a : alphabet.toCharArray()) {
      trees.put(a, new Program.AncestralTree(a));
    }

    trees
        .get('A')
        .addAsAncestor(
            new Program.AncestralTree[] {
              trees.get('B'), trees.get('C'), trees.get('D'), trees.get('E'), trees.get('F')
            });
    return trees;
  }

  @Test
  public void TestCase1() {
    var trees = getTrees();
    trees.get('A').addAsAncestor(new Program.AncestralTree[] {trees.get('B'), trees.get('C')});
    trees.get('B').addAsAncestor(new Program.AncestralTree[] {trees.get('D'), trees.get('E')});
    trees.get('D').addAsAncestor(new Program.AncestralTree[] {trees.get('H'), trees.get('I')});
    trees.get('C').addAsAncestor(new Program.AncestralTree[] {trees.get('F'), trees.get('G')});

    var yca = Program.getYoungestCommonAncestor(trees.get('A'), trees.get('E'), trees.get('I'));
    Utils.assertTrue(yca == trees.get('B'));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(d) time | O(1) space - where d is the depth (height) of the ancestral tree
  public static AncestralTree getYoungestCommonAncestor(
      AncestralTree topAncestor, AncestralTree descendantOne, AncestralTree descendantTwo) {
    int depthOne = getDescendantDepth(descendantOne, topAncestor);
    int depthTwo = getDescendantDepth(descendantTwo, topAncestor);
    if (depthOne > depthTwo) {
      return backtrackAncestralTree(descendantOne, descendantTwo, depthOne - depthTwo);
    } else {
      return backtrackAncestralTree(descendantTwo, descendantOne, depthTwo - depthOne);
    }
  }

  public static int getDescendantDepth(AncestralTree descendant, AncestralTree topAncestor) {
    int depth = 0;
    while (descendant != topAncestor) {
      depth++;
      descendant = descendant.ancestor;
    }
    return depth;
  }

  public static AncestralTree backtrackAncestralTree(
      AncestralTree lowerDescendant, AncestralTree higherDescendant, int diff) {
    while (diff > 0) {
      lowerDescendant = lowerDescendant.ancestor;
      diff--;
    }
    while (lowerDescendant != higherDescendant) {
      lowerDescendant = lowerDescendant.ancestor;
      higherDescendant = higherDescendant.ancestor;
    }
    return lowerDescendant;
  }

  static class AncestralTree {
    public char name;
    public AncestralTree ancestor;

    AncestralTree(char name) {
      this.name = name;
      this.ancestor = null;
    }

    // This method is for testing only.
    void addAsAncestor(AncestralTree[] descendants) {
      for (AncestralTree descendant : descendants) {
        descendant.ancestor = this;
      }
    }
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  public HashMap<Character, Program.AncestralTree> getTrees() {
    var trees = new HashMap<Character, Program.AncestralTree>();
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (char a : alphabet.toCharArray()) {
      trees.put(a, new Program.AncestralTree(a));
    }

    trees
        .get('A')
        .addAsAncestor(
            new Program.AncestralTree[] {
              trees.get('B'), trees.get('C'), trees.get('D'), trees.get('E'), trees.get('F')
            });
    return trees;
  }

  @Test
  public void TestCase1() {
    var trees = getTrees();
    trees.get('A').addAsAncestor(new Program.AncestralTree[] {trees.get('B'), trees.get('C')});
    trees.get('B').addAsAncestor(new Program.AncestralTree[] {trees.get('D'), trees.get('E')});
    trees.get('D').addAsAncestor(new Program.AncestralTree[] {trees.get('H'), trees.get('I')});
    trees.get('C').addAsAncestor(new Program.AncestralTree[] {trees.get('F'), trees.get('G')});

    var yca = Program.getYoungestCommonAncestor(trees.get('A'), trees.get('E'), trees.get('I'));
    Utils.assertTrue(yca == trees.get('B'));
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

class AncestralTree extends program.AncestralTree {
  constructor(name) {
    super(name);
  }

  addAsAncestor(descendants) {
    for (const descendant of descendants) {
      descendant.ancestor = this;
    }
  }
}

function getTrees() {
  const trees = {};
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (const letter of ALPHABET) {
    trees[letter] = new AncestralTree(letter);
  }
  return trees;
}

it('Test Case #1', function () {
  const trees = getTrees();
  trees['A'].addAsAncestor([trees['B'], trees['C']]);
  trees['B'].addAsAncestor([trees['D'], trees['E']]);
  trees['D'].addAsAncestor([trees['H'], trees['I']]);
  trees['C'].addAsAncestor([trees['F'], trees['G']]);

  const yca = program.getYoungestCommonAncestor(trees.A, trees.E, trees.I);
  chai.expect(yca).to.deep.equal(trees.B);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class AncestralTree {
  constructor(name) {
    this.name = name;
    this.ancestor = null;
  }
}

// O(d) time | O(1) space - where d is the depth (height) of the ancestral tree
function getYoungestCommonAncestor(topAncestor, descendantOne, descendantTwo) {
  const depthOne = getDescendantDepth(descendantOne, topAncestor);
  const depthTwo = getDescendantDepth(descendantTwo, topAncestor);
  if (depthOne > depthTwo) {
    return backtrackAncestralTree(descendantOne, descendantTwo, depthOne - depthTwo);
  } else {
    return backtrackAncestralTree(descendantTwo, descendantOne, depthTwo - depthOne);
  }
}

function getDescendantDepth(descendant, topAncestor) {
  let depth = 0;
  while (descendant !== topAncestor) {
    depth++;
    descendant = descendant.ancestor;
  }
  return depth;
}

function backtrackAncestralTree(lowerDescendant, higherDescendant, diff) {
  while (diff > 0) {
    lowerDescendant = lowerDescendant.ancestor;
    diff--;
  }
  while (lowerDescendant !== higherDescendant) {
    lowerDescendant = lowerDescendant.ancestor;
    higherDescendant = higherDescendant.ancestor;
  }
  return lowerDescendant;
}

exports.AncestralTree = AncestralTree;
exports.getYoungestCommonAncestor = getYoungestCommonAncestor;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

class AncestralTree extends program.AncestralTree {
  constructor(name) {
    super(name);
  }

  addAsAncestor(descendants) {
    for (const descendant of descendants) {
      descendant.ancestor = this;
    }
  }
}

function getTrees() {
  const trees = {};
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (const letter of ALPHABET) {
    trees[letter] = new AncestralTree(letter);
  }
  return trees;
}

it('Test Case #1', function () {
  const trees = getTrees();
  trees['A'].addAsAncestor([trees['B'], trees['C']]);
  trees['B'].addAsAncestor([trees['D'], trees['E']]);
  trees['D'].addAsAncestor([trees['H'], trees['I']]);
  trees['C'].addAsAncestor([trees['F'], trees['G']]);

  const yca = program.getYoungestCommonAncestor(trees.A, trees.E, trees.I);
  chai.expect(yca).to.deep.equal(trees.B);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.AncestralTree
import com.algoexpert.program.getYoungestCommonAncestor

class ProgramTest {
    fun getAncestralTrees(): Map<Char, AncestralTree> {
        val trees = mutableMapOf<Char, AncestralTree>()
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        for (a in alphabet) {
            trees[a] = AncestralTree(a)
        }

        trees['B']!!.ancestor = trees['A']
        trees['C']!!.ancestor = trees['A']
        trees['D']!!.ancestor = trees['A']
        trees['E']!!.ancestor = trees['A']
        trees['F']!!.ancestor = trees['A']
        return trees
    }

    @Test
    fun TestCase1() {
        var trees = getAncestralTrees()

        trees['B']!!.ancestor = trees['A']
        trees['C']!!.ancestor = trees['A']

        trees['D']!!.ancestor = trees['B']
        trees['E']!!.ancestor = trees['B']

        trees['H']!!.ancestor = trees['D']
        trees['I']!!.ancestor = trees['D']

        trees['F']!!.ancestor = trees['C']
        trees['G']!!.ancestor = trees['C']

        val yca = getYoungestCommonAncestor(trees['A']!!, trees['E']!!, trees['I']!!)
        assert(yca == trees['B']!!)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

class AncestralTree(name: Char) {
    val name = name
    var ancestor: AncestralTree? = null
}

// O(d) time | O(1) space - where d is the depth (height) of the ancestral tree
fun getYoungestCommonAncestor(topAncestor: AncestralTree, descendantOne: AncestralTree, descendantTwo: AncestralTree): AncestralTree? {
    val depthOne = getDescendantDepth(descendantOne, topAncestor)
    val depthTwo = getDescendantDepth(descendantTwo, topAncestor)
    if (depthOne > depthTwo) {
        return backtrackAncestralTree(descendantOne, descendantTwo, depthOne - depthTwo)
    } else {
        return backtrackAncestralTree(descendantTwo, descendantOne, depthTwo - depthOne)
    }
}

fun getDescendantDepth(start: AncestralTree, topAncestor: AncestralTree): Int {
    var descendant: AncestralTree? = start
    var depth = 0
    while (descendant != topAncestor) {
        depth++
        descendant = descendant!!.ancestor
    }
    return depth
}

fun backtrackAncestralTree(lowerDescendant: AncestralTree, higherDescendant: AncestralTree, diffStart: Int): AncestralTree? {
    var lower: AncestralTree? = lowerDescendant
    var higher: AncestralTree? = higherDescendant
    var diff = diffStart
    while (diff > 0) {
        lower = lower!!.ancestor
        diff--
    }
    while (lower != higher) {
        lower = lower!!.ancestor
        higher = higher!!.ancestor
    }
    return lower
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.AncestralTree
import com.algoexpert.program.getYoungestCommonAncestor

class ProgramTest {
    fun getAncestralTrees(): Map<Char, AncestralTree> {
        val trees = mutableMapOf<Char, AncestralTree>()
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        for (a in alphabet) {
            trees[a] = AncestralTree(a)
        }

        trees['B']!!.ancestor = trees['A']
        trees['C']!!.ancestor = trees['A']
        trees['D']!!.ancestor = trees['A']
        trees['E']!!.ancestor = trees['A']
        trees['F']!!.ancestor = trees['A']
        return trees
    }

    @Test
    fun TestCase1() {
        var trees = getAncestralTrees()

        trees['B']!!.ancestor = trees['A']
        trees['C']!!.ancestor = trees['A']

        trees['D']!!.ancestor = trees['B']
        trees['E']!!.ancestor = trees['B']

        trees['H']!!.ancestor = trees['D']
        trees['I']!!.ancestor = trees['D']

        trees['F']!!.ancestor = trees['C']
        trees['G']!!.ancestor = trees['C']

        val yca = getYoungestCommonAncestor(trees['A']!!, trees['E']!!, trees['I']!!)
        assert(yca == trees['B']!!)
    }
}

```
### Sandbox Code (swift)
```swift
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

class ProgramTest: TestSuite {
  func getTrees() -> [String: Program.AncestralTree] {
    var trees = [String: Program.AncestralTree]()
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    for letter in alphabet {
      let stringifiedLetter = String(letter)
      trees[stringifiedLetter] = Program.AncestralTree(name: stringifiedLetter)
    }
    return trees
  }

  func test() {
    let program = Program()

    runTest("Test Case 1") { () throws -> Void in
      var trees = getTrees()
      addAsAncestor(trees["A"]!, [trees["B"]!, trees["C"]!])
      addAsAncestor(trees["B"]!, [trees["D"]!, trees["E"]!])
      addAsAncestor(trees["D"]!, [trees["H"]!, trees["I"]!])
      addAsAncestor(trees["C"]!, [trees["F"]!, trees["G"]!])

      var e = trees["E"]
      var i = trees["I"]
      let yca = program.getYoungestCommonAncestor(trees["A"], &e, &i)
      try assert(yca === trees["B"])
    }
  }
}

func addAsAncestor(_ ancestor: Program.AncestralTree, _ descendants: [Program.AncestralTree]) {
  for descendant in descendants {
    descendant.ancestor = ancestor
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  class AncestralTree {
    var name = String()
    var ancestor: AncestralTree?

    init(name: String) {
      self.name = name
      ancestor = nil
    }
  }

  // O(d) time | O(1) space
  func getYoungestCommonAncestor(_ topAncestor: AncestralTree?, _ descendantOne: inout AncestralTree?, _ descendantTwo: inout AncestralTree?) -> AncestralTree {
    var firstDescendant = descendantOne
    var secondDescendant = descendantTwo

    let depthOne = getDescendantDepth(&descendantOne, topAncestor)
    let depthTwo = getDescendantDepth(&descendantTwo, topAncestor)

    if depthOne > depthTwo {
      var difference = depthOne - depthTwo
      return backTrackAncestralTree(&firstDescendant, &secondDescendant, &difference)
    } else {
      var difference = depthTwo - depthOne
      return backTrackAncestralTree(&secondDescendant, &firstDescendant, &difference)
    }
  }

  func getDescendantDepth(_ descendant: inout AncestralTree?, _ topAncestor: AncestralTree?) -> Int {
    var depth = 0

    while descendant !== topAncestor {
      depth += 1
      descendant = descendant?.ancestor
    }

    return depth
  }

  func backTrackAncestralTree(_ lowerDescendant: inout AncestralTree?, _ higherDescendant: inout AncestralTree?, _ difference: inout Int) -> AncestralTree {
    while difference > 0 {
      difference -= 1
      lowerDescendant = lowerDescendant?.ancestor
    }

    while lowerDescendant !== higherDescendant {
      lowerDescendant = lowerDescendant?.ancestor
      higherDescendant = higherDescendant?.ancestor
    }

    return lowerDescendant!
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func getTrees() -> [String: Program.AncestralTree] {
    var trees = [String: Program.AncestralTree]()
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    for letter in alphabet {
      let stringifiedLetter = String(letter)
      trees[stringifiedLetter] = Program.AncestralTree(name: stringifiedLetter)
    }
    return trees
  }

  func test() {
    let program = Program()

    runTest("Test Case 1") { () throws -> Void in
      var trees = getTrees()
      addAsAncestor(trees["A"]!, [trees["B"]!, trees["C"]!])
      addAsAncestor(trees["B"]!, [trees["D"]!, trees["E"]!])
      addAsAncestor(trees["D"]!, [trees["H"]!, trees["I"]!])
      addAsAncestor(trees["C"]!, [trees["F"]!, trees["G"]!])

      var e = trees["E"]
      var i = trees["I"]
      let yca = program.getYoungestCommonAncestor(trees["A"], &e, &i)
      try assert(yca === trees["B"])
    }
  }
}

func addAsAncestor(_ ancestor: Program.AncestralTree, _ descendants: [Program.AncestralTree]) {
  for descendant in descendants {
    descendant.ancestor = ancestor
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


class AncestralTree(program.AncestralTree):
    def addDescendants(self, *descendants):
        for descendant in descendants:
            descendant.ancestor = self


def new_trees():
    ancestralTrees = {}
    for letter in list("ABCDEFGHIJKLMNOPQRSTUVWXYZ"):
        ancestralTrees[letter] = AncestralTree(letter)
    return ancestralTrees


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        trees = new_trees()
        trees["A"].addDescendants(trees["B"], trees["C"])
        trees["B"].addDescendants(trees["D"], trees["E"])
        trees["D"].addDescendants(trees["H"], trees["I"])
        trees["C"].addDescendants(trees["F"], trees["G"])

        yca = program.getYoungestCommonAncestor(trees["A"], trees["E"], trees["I"])
        self.assertTrue(yca == trees["B"])

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class AncestralTree:
    def __init__(self, name):
        self.name = name
        self.ancestor = None


# O(d) time | O(1) space - where d is the depth (height) of the ancestral tree
def getYoungestCommonAncestor(topAncestor, descendantOne, descendantTwo):
    depthOne = getDescendantDepth(descendantOne, topAncestor)
    depthTwo = getDescendantDepth(descendantTwo, topAncestor)
    if depthOne > depthTwo:
        return backtrackAncestralTree(descendantOne, descendantTwo, depthOne - depthTwo)
    else:
        return backtrackAncestralTree(descendantTwo, descendantOne, depthTwo - depthOne)


def getDescendantDepth(descendant, topAncestor):
    depth = 0
    while descendant != topAncestor:
        depth += 1
        descendant = descendant.ancestor
    return depth


def backtrackAncestralTree(lowerDescendant, higherDescendant, diff):
    while diff > 0:
        lowerDescendant = lowerDescendant.ancestor
        diff -= 1
    while lowerDescendant != higherDescendant:
        lowerDescendant = lowerDescendant.ancestor
        higherDescendant = higherDescendant.ancestor
    return lowerDescendant

```
### Unit Tests 1 (python)
```python
import program
import unittest


class AncestralTree(program.AncestralTree):
    def addDescendants(self, *descendants):
        for descendant in descendants:
            descendant.ancestor = self


def new_trees():
    ancestralTrees = {}
    for letter in list("ABCDEFGHIJKLMNOPQRSTUVWXYZ"):
        ancestralTrees[letter] = AncestralTree(letter)
    return ancestralTrees


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        trees = new_trees()
        trees["A"].addDescendants(trees["B"], trees["C"])
        trees["B"].addDescendants(trees["D"], trees["E"])
        trees["D"].addDescendants(trees["H"], trees["I"])
        trees["C"].addDescendants(trees["F"], trees["G"])

        yca = program.getYoungestCommonAncestor(trees["A"], trees["E"], trees["I"])
        self.assertTrue(yca == trees["B"])

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

class AncestralTree {
  name: string;
  ancestor: AncestralTree | null;

  constructor(name: string) {
    this.name = name;
    this.ancestor = null;
  }

  addAsAncestor(descendants: AncestralTree[]) {
    for (const descendant of descendants) {
      descendant.ancestor = this;
    }
  }
}

function getTrees() {
  const trees: {[key: string]: AncestralTree} = {};
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (const letter of ALPHABET) {
    trees[letter] = new AncestralTree(letter);
  }
  return trees;
}

it('Test Case #1', function () {
  const trees = getTrees();
  trees['A'].addAsAncestor([trees['B'], trees['C']]);
  trees['B'].addAsAncestor([trees['D'], trees['E']]);
  trees['D'].addAsAncestor([trees['H'], trees['I']]);
  trees['C'].addAsAncestor([trees['F'], trees['G']]);

  const yca = program.getYoungestCommonAncestor(trees.A, trees.E, trees.I);
  chai.expect(yca).to.deep.equal(trees.B);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class AncestralTree {
  name: string;
  ancestor: AncestralTree | null;

  constructor(name: string) {
    this.name = name;
    this.ancestor = null;
  }
}

// O(d) time | O(1) space - where d is the depth (height) of the ancestral tree
export function getYoungestCommonAncestor(
  topAncestor: AncestralTree,
  descendantOne: AncestralTree,
  descendantTwo: AncestralTree,
) {
  const depthOne = getDescendantDepth(descendantOne, topAncestor);
  const depthTwo = getDescendantDepth(descendantTwo, topAncestor);
  if (depthOne > depthTwo) {
    return backtrackAncestralTree(descendantOne, descendantTwo, depthOne - depthTwo);
  } else {
    return backtrackAncestralTree(descendantTwo, descendantOne, depthTwo - depthOne);
  }
}

function getDescendantDepth(descendant: AncestralTree, topAncestor: AncestralTree) {
  let depth = 0;
  while (descendant !== topAncestor) {
    depth++;
    descendant = descendant.ancestor!;
  }
  return depth;
}

function backtrackAncestralTree(lowerDescendant: AncestralTree, higherDescendant: AncestralTree, diff: number) {
  while (diff > 0) {
    lowerDescendant = lowerDescendant.ancestor!;
    diff--;
  }
  while (lowerDescendant !== higherDescendant) {
    lowerDescendant = lowerDescendant.ancestor!;
    higherDescendant = higherDescendant.ancestor!;
  }
  return lowerDescendant;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

class AncestralTree {
  name: string;
  ancestor: AncestralTree | null;

  constructor(name: string) {
    this.name = name;
    this.ancestor = null;
  }

  addAsAncestor(descendants: AncestralTree[]) {
    for (const descendant of descendants) {
      descendant.ancestor = this;
    }
  }
}

function getTrees() {
  const trees: {[key: string]: AncestralTree} = {};
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (const letter of ALPHABET) {
    trees[letter] = new AncestralTree(letter);
  }
  return trees;
}

it('Test Case #1', function () {
  const trees = getTrees();
  trees['A'].addAsAncestor([trees['B'], trees['C']]);
  trees['B'].addAsAncestor([trees['D'], trees['E']]);
  trees['D'].addAsAncestor([trees['H'], trees['I']]);
  trees['C'].addAsAncestor([trees['F'], trees['G']]);

  const yca = program.getYoungestCommonAncestor(trees.A, trees.E, trees.I);
  chai.expect(yca).to.deep.equal(trees.B);
});

```

