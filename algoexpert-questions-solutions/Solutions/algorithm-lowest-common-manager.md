# Lowest Common Manager
<div class="html">
<p>
  You're given three inputs, all of which are instances of an
  <span>OrgChart</span> class that have a <span>directReports</span> property
  pointing to their direct reports. The first input is the top manager in an
  organizational chart (i.e., the only instance that isn't anybody else's direct
  report), and the other two inputs are reports in the organizational chart. The
  two reports are guaranteed to be distinct.
</p>
<p>
  Write a function that returns the lowest common manager to the two reports.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptComment">// From the organizational chart below.</span>
<span class="CodeEditor-promptParameter">topManager</span> = Node A
<span class="CodeEditor-promptParameter">reportOne</span> = Node E
<span class="CodeEditor-promptParameter">reportTwo</span> = Node I
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
Node B
</pre>
</div>

Hint 1
<p>
Given a random subtree in the organizational chart, the manager at the root of that subtree is common to any two reports in the subtree.
</p>


Hint 2

<p>
Knowing Hint #1, the lowest common manager to two reports in an organizational chart is the root of the lowest subtree containing those two reports. Find that lowest subtree to find the lowest common manager.
</p>


Hint 3

<p>
To find the lowest subtree containing both of the input reports, try recursively traversing the organizational chart and keeping track of the number of those reports contained in each subtree as well as the lowest common manager in each subtree. Some subtrees might contain neither of the two reports, some might contain one of them, and others might contain both; the first to contain both should return the lowest common manager for all of the subtrees above it that contain it, including the entire organizational chart.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

#include <unordered_map>

void OrgChart::addDirectReports(vector<OrgChart *> directReports) {
  for (OrgChart *directReport : directReports) {
    this->directReports.push_back(directReport);
  }
}

unordered_map<char, OrgChart *> getOrgcharts() {
  unordered_map<char, OrgChart *> orgCharts;
  string alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (char a : alphabet) {
    orgCharts.insert({a, new OrgChart(a)});
  }
  orgCharts.at('X')->addDirectReports({
      orgCharts.at('Z'),
  });
  return orgCharts;
}

class ProgramTest : public TestSuite {
public:
  void Run() {

    RunTest("Test Case 1", []() {
      auto orgCharts = getOrgcharts();
      orgCharts.at('A')->addDirectReports(
          {orgCharts.at('B'), orgCharts.at('C')});
      orgCharts.at('B')->addDirectReports(
          {orgCharts.at('D'), orgCharts.at('E')});
      orgCharts.at('C')->addDirectReports(
          {orgCharts.at('F'), orgCharts.at('G')});
      orgCharts.at('D')->addDirectReports(
          {orgCharts.at('H'), orgCharts.at('I')});

      OrgChart *lcm = getLowestCommonManager(
          orgCharts.at('A'), orgCharts.at('E'), orgCharts.at('I'));
      assert(lcm == orgCharts.at('B'));
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using namespace std;

class OrgChart {
public:
  char name;
  vector<OrgChart *> directReports;

  OrgChart(char name) {
    this->name = name;
    this->directReports = {};
  }

  void addDirectReports(vector<OrgChart *> directReports);
};

struct OrgInfo {
  OrgChart *lowestCommonManager;
  int numImportantReports;
};

OrgInfo getOrgInfo(OrgChart *manager, OrgChart *reportOne, OrgChart *reportTwo);

// O(n) time | O(d) space - where n is the number of people
// in the org and d is the depth (height) of the org chart
OrgChart *getLowestCommonManager(OrgChart *topManager, OrgChart *reportOne,
                                 OrgChart *reportTwo) {
  return getOrgInfo(topManager, reportOne, reportTwo).lowestCommonManager;
}

OrgInfo getOrgInfo(OrgChart *manager, OrgChart *reportOne,
                   OrgChart *reportTwo) {
  int numImportantReports = 0;
  for (OrgChart *directReport : manager->directReports) {
    OrgInfo orgInfo = getOrgInfo(directReport, reportOne, reportTwo);
    if (orgInfo.lowestCommonManager != nullptr)
      return orgInfo;
    numImportantReports += orgInfo.numImportantReports;
  }
  if (manager == reportOne || manager == reportTwo)
    numImportantReports++;
  OrgChart *lowestCommonManager = numImportantReports == 2 ? manager : nullptr;
  OrgInfo newOrgInfo = {lowestCommonManager, numImportantReports};
  return newOrgInfo;
}

```
### Unit Tests 1 (cpp)
```cpp
#include <unordered_map>

void OrgChart::addDirectReports(vector<OrgChart *> directReports) {
  for (OrgChart *directReport : directReports) {
    this->directReports.push_back(directReport);
  }
}

unordered_map<char, OrgChart *> getOrgcharts() {
  unordered_map<char, OrgChart *> orgCharts;
  string alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (char a : alphabet) {
    orgCharts.insert({a, new OrgChart(a)});
  }
  orgCharts.at('X')->addDirectReports({
      orgCharts.at('Z'),
  });
  return orgCharts;
}

class ProgramTest : public TestSuite {
public:
  void Run() {

    RunTest("Test Case 1", []() {
      auto orgCharts = getOrgcharts();
      orgCharts.at('A')->addDirectReports(
          {orgCharts.at('B'), orgCharts.at('C')});
      orgCharts.at('B')->addDirectReports(
          {orgCharts.at('D'), orgCharts.at('E')});
      orgCharts.at('C')->addDirectReports(
          {orgCharts.at('F'), orgCharts.at('G')});
      orgCharts.at('D')->addDirectReports(
          {orgCharts.at('H'), orgCharts.at('I')});

      OrgChart *lcm = getLowestCommonManager(
          orgCharts.at('A'), orgCharts.at('E'), orgCharts.at('I'));
      assert(lcm == orgCharts.at('B'));
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
	public Dictionary<char, Program.OrgChart> getOrgCharts() {
		var orgCharts = new Dictionary<char, Program.OrgChart>();
		var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		foreach (char a in alphabet) {
			orgCharts.Add(a, new Program.OrgChart(a));
		}
		return orgCharts;
	}

	[Test]
	public void TestCase1() {
		var orgCharts = getOrgCharts();
		orgCharts['A'].addDirectReports(new Program.OrgChart[] {orgCharts['B'],
		                                                        orgCharts['C']});
		orgCharts['B'].addDirectReports(new Program.OrgChart[] {orgCharts['D'],
		                                                        orgCharts['E']});
		orgCharts['C'].addDirectReports(new Program.OrgChart[] {orgCharts['F'],
		                                                        orgCharts['G']});
		orgCharts['D'].addDirectReports(new Program.OrgChart[] {orgCharts['H'],
		                                                        orgCharts['I']});
		Program.OrgChart lcm = Program.GetLowestCommonManager(orgCharts['A'],
		    orgCharts['E'],
		    orgCharts['I']);
		Utils.AssertTrue(lcm == orgCharts['B']);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(n) time | O(d) space - where n is the number of people
	// in the org and d is the depth (height) of the org chart
	public static OrgChart GetLowestCommonManager(OrgChart topManager, OrgChart reportOne,
	  OrgChart reportTwo) {
		return getOrgInfo(topManager, reportOne, reportTwo).lowestCommonManager;
	}

	public static OrgInfo getOrgInfo(OrgChart manager, OrgChart reportOne, OrgChart reportTwo) {
		int numImportantReports = 0;
		foreach (OrgChart directReport in manager.directReports) {
			OrgInfo orgInfo = getOrgInfo(directReport, reportOne, reportTwo);
			if (orgInfo.lowestCommonManager != null) return orgInfo;
			numImportantReports += orgInfo.numImportantReports;
		}
		if (manager == reportOne || manager == reportTwo) numImportantReports++;
		OrgChart lowestCommonManager = numImportantReports == 2 ? manager : null;
		OrgInfo newOrgInfo = new OrgInfo(lowestCommonManager, numImportantReports);
		return newOrgInfo;
	}

	public class OrgChart {
		public char name;
		public List<OrgChart> directReports;

		public OrgChart(char name) {
			this.name = name;
			this.directReports = new List<OrgChart>();
		}

		// This method is for testing only.
		public void addDirectReports(OrgChart[] directReports) {
			foreach (OrgChart directReport in directReports) {
				this.directReports.Add(directReport);
			}
		}
	}

	public class OrgInfo {
		public OrgChart lowestCommonManager;
		public int numImportantReports;

		public OrgInfo(OrgChart lowestCommonManager, int numImportantReports) {
			this.lowestCommonManager = lowestCommonManager;
			this.numImportantReports = numImportantReports;
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;

public class ProgramTest {
	public Dictionary<char, Program.OrgChart> getOrgCharts() {
		var orgCharts = new Dictionary<char, Program.OrgChart>();
		var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		foreach (char a in alphabet) {
			orgCharts.Add(a, new Program.OrgChart(a));
		}
		return orgCharts;
	}

	[Test]
	public void TestCase1() {
		var orgCharts = getOrgCharts();
		orgCharts['A'].addDirectReports(new Program.OrgChart[] {orgCharts['B'],
		                                                        orgCharts['C']});
		orgCharts['B'].addDirectReports(new Program.OrgChart[] {orgCharts['D'],
		                                                        orgCharts['E']});
		orgCharts['C'].addDirectReports(new Program.OrgChart[] {orgCharts['F'],
		                                                        orgCharts['G']});
		orgCharts['D'].addDirectReports(new Program.OrgChart[] {orgCharts['H'],
		                                                        orgCharts['I']});
		Program.OrgChart lcm = Program.GetLowestCommonManager(orgCharts['A'],
		    orgCharts['E'],
		    orgCharts['I']);
		Utils.AssertTrue(lcm == orgCharts['B']);
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

func (chart *OrgChart) addDirectReports(reports ...*OrgChart) {
	chart.DirectReports = append(chart.DirectReports, reports...)
}

func getOrgCharts() map[rune]*OrgChart {
	orgCharts := map[rune]*OrgChart{}
	for _, r := range "ABCDEFGHIJKLMNOPQRSTUVWXYZ" {
		orgCharts[r] = &OrgChart{
			Name:          string(r),
			DirectReports: []*OrgChart{},
		}
	}
	return orgCharts
}

func (s *TestSuite) TestCase1(t *TestCase) {
	orgCharts := getOrgCharts()
	orgCharts['A'].addDirectReports(orgCharts['B'], orgCharts['C'])
	orgCharts['B'].addDirectReports(orgCharts['D'], orgCharts['E'])
	orgCharts['C'].addDirectReports(orgCharts['F'], orgCharts['G'])
	orgCharts['D'].addDirectReports(orgCharts['H'], orgCharts['I'])
	lcm := GetLowestCommonManager(orgCharts['A'], orgCharts['E'], orgCharts['I'])
	require.Equal(t, lcm, orgCharts['B'], lcm)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type OrgChart struct {
	Name          string
	DirectReports []*OrgChart
}

// O(n) time | O(d) space - where n is the number of people
// in the org and d is the depth (height) of the org chart
func GetLowestCommonManager(org, reportOne, reportTwo *OrgChart) *OrgChart {
	return getOrgInfo(org, reportOne, reportTwo).lowestCommonManager
}

type OrgInfo struct {
	lowestCommonManager *OrgChart
	numImportantReports int
}

func getOrgInfo(manager, reportOne, reportTwo *OrgChart) OrgInfo {
	numImportantReports := 0
	for _, directReport := range manager.DirectReports {
		orgInfo := getOrgInfo(directReport, reportOne, reportTwo)
		if orgInfo.lowestCommonManager != nil {
			return orgInfo
		}
		numImportantReports += orgInfo.numImportantReports
	}
	if manager == reportOne || manager == reportTwo {
		numImportantReports++
	}
	var lowestCommonManager *OrgChart
	if numImportantReports == 2 {
		lowestCommonManager = manager
	}
	return OrgInfo{
		lowestCommonManager: lowestCommonManager,
		numImportantReports: numImportantReports,
	}
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (chart *OrgChart) addDirectReports(reports ...*OrgChart) {
	chart.DirectReports = append(chart.DirectReports, reports...)
}

func getOrgCharts() map[rune]*OrgChart {
	orgCharts := map[rune]*OrgChart{}
	for _, r := range "ABCDEFGHIJKLMNOPQRSTUVWXYZ" {
		orgCharts[r] = &OrgChart{
			Name:          string(r),
			DirectReports: []*OrgChart{},
		}
	}
	return orgCharts
}

func (s *TestSuite) TestCase1(t *TestCase) {
	orgCharts := getOrgCharts()
	orgCharts['A'].addDirectReports(orgCharts['B'], orgCharts['C'])
	orgCharts['B'].addDirectReports(orgCharts['D'], orgCharts['E'])
	orgCharts['C'].addDirectReports(orgCharts['F'], orgCharts['G'])
	orgCharts['D'].addDirectReports(orgCharts['H'], orgCharts['I'])
	lcm := GetLowestCommonManager(orgCharts['A'], orgCharts['E'], orgCharts['I'])
	require.Equal(t, lcm, orgCharts['B'], lcm)
}

```
### Sandbox Code (java)
```java
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import java.util.*;

class ProgramTest {

  public HashMap<Character, Program.OrgChart> getOrgCharts() {
    var orgCharts = new HashMap<Character, Program.OrgChart>();
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (char a : alphabet.toCharArray()) {
      orgCharts.put(a, new Program.OrgChart(a));
    }
    orgCharts.get('X').addDirectReports(new Program.OrgChart[] {orgCharts.get('Z')});
    return orgCharts;
  }

  @Test
  public void TestCase1() {
    var orgCharts = getOrgCharts();
    orgCharts
        .get('A')
        .addDirectReports(new Program.OrgChart[] {orgCharts.get('B'), orgCharts.get('C')});
    orgCharts
        .get('B')
        .addDirectReports(new Program.OrgChart[] {orgCharts.get('D'), orgCharts.get('E')});
    orgCharts
        .get('C')
        .addDirectReports(new Program.OrgChart[] {orgCharts.get('F'), orgCharts.get('G')});
    orgCharts
        .get('D')
        .addDirectReports(new Program.OrgChart[] {orgCharts.get('H'), orgCharts.get('I')});

    Program.OrgChart lcm =
        Program.getLowestCommonManager(orgCharts.get('A'), orgCharts.get('E'), orgCharts.get('I'));
    Utils.assertTrue(lcm == orgCharts.get('B'));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(d) space - where n is the number of people
  // in the org and d is the depth (height) of the org chart
  public static OrgChart getLowestCommonManager(
      OrgChart topManager, OrgChart reportOne, OrgChart reportTwo) {
    return getOrgInfo(topManager, reportOne, reportTwo).lowestCommonManager;
  }

  public static OrgInfo getOrgInfo(OrgChart manager, OrgChart reportOne, OrgChart reportTwo) {
    int numImportantReports = 0;
    for (OrgChart directReport : manager.directReports) {
      OrgInfo orgInfo = getOrgInfo(directReport, reportOne, reportTwo);
      if (orgInfo.lowestCommonManager != null) return orgInfo;
      numImportantReports += orgInfo.numImportantReports;
    }
    if (manager == reportOne || manager == reportTwo) numImportantReports++;
    OrgChart lowestCommonManager = numImportantReports == 2 ? manager : null;
    OrgInfo newOrgInfo = new OrgInfo(lowestCommonManager, numImportantReports);
    return newOrgInfo;
  }

  static class OrgChart {
    public char name;
    public List<OrgChart> directReports;

    OrgChart(char name) {
      this.name = name;
      this.directReports = new ArrayList<OrgChart>();
    }

    // This method is for testing only.
    public void addDirectReports(OrgChart[] directReports) {
      for (OrgChart directReport : directReports) {
        this.directReports.add(directReport);
      }
    }
  }

  static class OrgInfo {
    public OrgChart lowestCommonManager;
    int numImportantReports;

    OrgInfo(OrgChart lowestCommonManager, int numImportantReports) {
      this.lowestCommonManager = lowestCommonManager;
      this.numImportantReports = numImportantReports;
    }
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {

  public HashMap<Character, Program.OrgChart> getOrgCharts() {
    var orgCharts = new HashMap<Character, Program.OrgChart>();
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (char a : alphabet.toCharArray()) {
      orgCharts.put(a, new Program.OrgChart(a));
    }
    orgCharts.get('X').addDirectReports(new Program.OrgChart[] {orgCharts.get('Z')});
    return orgCharts;
  }

  @Test
  public void TestCase1() {
    var orgCharts = getOrgCharts();
    orgCharts
        .get('A')
        .addDirectReports(new Program.OrgChart[] {orgCharts.get('B'), orgCharts.get('C')});
    orgCharts
        .get('B')
        .addDirectReports(new Program.OrgChart[] {orgCharts.get('D'), orgCharts.get('E')});
    orgCharts
        .get('C')
        .addDirectReports(new Program.OrgChart[] {orgCharts.get('F'), orgCharts.get('G')});
    orgCharts
        .get('D')
        .addDirectReports(new Program.OrgChart[] {orgCharts.get('H'), orgCharts.get('I')});

    Program.OrgChart lcm =
        Program.getLowestCommonManager(orgCharts.get('A'), orgCharts.get('E'), orgCharts.get('I'));
    Utils.assertTrue(lcm == orgCharts.get('B'));
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

class OrgChart {
  constructor(name) {
    this.name = name;
    this.directReports = [];
  }

  addDirectReports(directReports) {
    for (const directReport of directReports) {
      this.directReports.push(directReport);
    }
  }
}

function getOrgCharts() {
  const orgCharts = {};
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (const letter of ALPHABET) {
    orgCharts[letter] = new OrgChart(letter);
  }
  return orgCharts;
}

it('Test Case #1', function () {
  const orgCharts = getOrgCharts();
  orgCharts['A'].addDirectReports([orgCharts['B'], orgCharts['C']]);
  orgCharts['B'].addDirectReports([orgCharts['D'], orgCharts['E']]);
  orgCharts['C'].addDirectReports([orgCharts['F'], orgCharts['G']]);
  orgCharts['D'].addDirectReports([orgCharts['H'], orgCharts['I']]);

  const lcm = program.getLowestCommonManager(orgCharts.A, orgCharts.A, orgCharts.B);
  chai.expect(lcm).to.deep.equal(orgCharts.A);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(d) space - where n is the number of people
// in the org and d is the depth (height) of the org chart
function getLowestCommonManager(topManager, reportOne, reportTwo) {
  return getOrgInfo(topManager, reportOne, reportTwo).lowestCommonManager;
}

function getOrgInfo(manager, reportOne, reportTwo) {
  let numImportantReports = 0;
  for (const directReport of manager.directReports) {
    const orgInfo = getOrgInfo(directReport, reportOne, reportTwo);
    if (!!orgInfo.lowestCommonManager) return orgInfo;
    numImportantReports += orgInfo.numImportantReports;
  }
  if (manager === reportOne || manager === reportTwo) numImportantReports++;
  const lowestCommonManager = numImportantReports === 2 ? manager : null;
  return {lowestCommonManager, numImportantReports};
}

// This is the input class.
class OrgChart {
  constructor(name) {
    this.name = name;
    this.directReports = [];
  }
}

exports.getLowestCommonManager = getLowestCommonManager;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

class OrgChart {
  constructor(name) {
    this.name = name;
    this.directReports = [];
  }

  addDirectReports(directReports) {
    for (const directReport of directReports) {
      this.directReports.push(directReport);
    }
  }
}

function getOrgCharts() {
  const orgCharts = {};
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (const letter of ALPHABET) {
    orgCharts[letter] = new OrgChart(letter);
  }
  return orgCharts;
}

it('Test Case #1', function () {
  const orgCharts = getOrgCharts();
  orgCharts['A'].addDirectReports([orgCharts['B'], orgCharts['C']]);
  orgCharts['B'].addDirectReports([orgCharts['D'], orgCharts['E']]);
  orgCharts['C'].addDirectReports([orgCharts['F'], orgCharts['G']]);
  orgCharts['D'].addDirectReports([orgCharts['H'], orgCharts['I']]);

  const lcm = program.getLowestCommonManager(orgCharts.A, orgCharts.A, orgCharts.B);
  chai.expect(lcm).to.deep.equal(orgCharts.A);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.OrgChart
import com.algoexpert.program.getLowestCommonManager

class ProgramTest {
    fun getOrgCharts(): Map<Char, OrgChart> {
        val orgCharts = mutableMapOf<Char, OrgChart>()
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        for (a in alphabet) {
            orgCharts[a] = OrgChart(a)
        }

        orgCharts['X']!!.directReports.add(orgCharts['Z']!!)
        return orgCharts
    }

    @Test
    fun TestCase1() {
        var orgCharts = getOrgCharts()
        orgCharts['A']!!.directReports.addAll(listOf(orgCharts['B']!!, orgCharts['C']!!))
        orgCharts['B']!!.directReports.addAll(listOf(orgCharts['D']!!, orgCharts['E']!!))
        orgCharts['C']!!.directReports.addAll(listOf(orgCharts['F']!!, orgCharts['G']!!))
        orgCharts['D']!!.directReports.addAll(listOf(orgCharts['H']!!, orgCharts['I']!!))

        val lcm = getLowestCommonManager(orgCharts['A']!!, orgCharts['E']!!, orgCharts['I']!!)
        assert(lcm == orgCharts['B']!!)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

class OrgChart(name: Char) {
    val name = name
    val directReports = mutableListOf<OrgChart>()
}

data class OrgInfo(
    val lowestCommonManager: OrgChart?,
    val numImportantReports: Int
)

// O(n) time | O(d) space - where n is the number of people
// in the org and d is the depth (height) of the org chart
fun getLowestCommonManager(topManager: OrgChart, reportOne: OrgChart, reportTwo: OrgChart): OrgChart? {
    return getOrgInfo(topManager, reportOne, reportTwo).lowestCommonManager
}

fun getOrgInfo(manager: OrgChart, reportOne: OrgChart, reportTwo: OrgChart): OrgInfo {
    var numImportantReports = 0
    for (directReport in manager.directReports) {
        val orgInfo = getOrgInfo(directReport, reportOne, reportTwo)
        if (orgInfo.lowestCommonManager != null) return orgInfo
        numImportantReports += orgInfo.numImportantReports
    }
    if (manager == reportOne || manager == reportTwo) numImportantReports++
    val lowestCommonManager: OrgChart? = if (numImportantReports == 2) manager else null
    val newOrgInfo = OrgInfo(lowestCommonManager, numImportantReports)
    return newOrgInfo
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.OrgChart
import com.algoexpert.program.getLowestCommonManager

class ProgramTest {
    fun getOrgCharts(): Map<Char, OrgChart> {
        val orgCharts = mutableMapOf<Char, OrgChart>()
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        for (a in alphabet) {
            orgCharts[a] = OrgChart(a)
        }

        orgCharts['X']!!.directReports.add(orgCharts['Z']!!)
        return orgCharts
    }

    @Test
    fun TestCase1() {
        var orgCharts = getOrgCharts()
        orgCharts['A']!!.directReports.addAll(listOf(orgCharts['B']!!, orgCharts['C']!!))
        orgCharts['B']!!.directReports.addAll(listOf(orgCharts['D']!!, orgCharts['E']!!))
        orgCharts['C']!!.directReports.addAll(listOf(orgCharts['F']!!, orgCharts['G']!!))
        orgCharts['D']!!.directReports.addAll(listOf(orgCharts['H']!!, orgCharts['I']!!))

        val lcm = getLowestCommonManager(orgCharts['A']!!, orgCharts['E']!!, orgCharts['I']!!)
        assert(lcm == orgCharts['B']!!)
    }
}

```
### Sandbox Code (swift)
```swift
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

class ProgramTest: TestSuite {
  func getOrgChart() -> [Character: Program.OrganizationalEntity] {
    var alphabet = Array("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

    var orgChart = [Character: Program.OrganizationalEntity]()
    for letter in alphabet {
      orgChart[letter] = Program.OrganizationalEntity(name: String(letter))
    }
    return orgChart
  }

  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let orgCharts = getOrgChart()
      orgCharts["A"]?.addDirectReports([orgCharts["B"], orgCharts["C"]])
      orgCharts["B"]?.addDirectReports([orgCharts["D"], orgCharts["E"]])
      orgCharts["C"]?.addDirectReports([orgCharts["F"], orgCharts["G"]])
      orgCharts["D"]?.addDirectReports([orgCharts["H"], orgCharts["I"]])

      let lcm = program.getLowestCommonManager(orgCharts["A"]!, orgCharts["E"]!, orgCharts["I"]!)
      try assert(lcm === orgCharts["B"])
    }
  }
}

extension Program.OrganizationalEntity {
  func addDirectReports(_ directReports: [Program.OrganizationalEntity?]) {
    for directReport in directReports {
      if let report = directReport {
        self.directReports.append(report as Program.OrganizationalEntity)
      }
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  class OrganizationalEntity {
    let name: String
    var directReports = [OrganizationalEntity]()

    init(name: String) {
      self.name = name
    }
  }

  // O(n) time | O(d) space
  func getLowestCommonManager(_ topManager: OrganizationalEntity, _ reportOne: OrganizationalEntity, _ reportTwo: OrganizationalEntity) -> OrganizationalEntity? {
    return getOrganizationalInfo(topManager, reportOne, reportTwo).0
  }

  func getOrganizationalInfo(_ manager: OrganizationalEntity, _ reportOne: OrganizationalEntity, _ reportTwo: OrganizationalEntity) -> (OrganizationalEntity?, Int) {
    var numberOfImportantReports = 0

    for directReport in manager.directReports {
      let organizationalInfo = getOrganizationalInfo(directReport, reportOne, reportTwo)

      if organizationalInfo.0 != nil {
        return organizationalInfo
      }

      numberOfImportantReports += organizationalInfo.1
    }

    if manager === reportOne || manager === reportTwo {
      numberOfImportantReports += 1
    }

    let lowestCommonManager = numberOfImportantReports == 2 ? manager : nil
    return (lowestCommonManager, numberOfImportantReports)
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func getOrgChart() -> [Character: Program.OrganizationalEntity] {
    var alphabet = Array("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

    var orgChart = [Character: Program.OrganizationalEntity]()
    for letter in alphabet {
      orgChart[letter] = Program.OrganizationalEntity(name: String(letter))
    }
    return orgChart
  }

  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let orgCharts = getOrgChart()
      orgCharts["A"]?.addDirectReports([orgCharts["B"], orgCharts["C"]])
      orgCharts["B"]?.addDirectReports([orgCharts["D"], orgCharts["E"]])
      orgCharts["C"]?.addDirectReports([orgCharts["F"], orgCharts["G"]])
      orgCharts["D"]?.addDirectReports([orgCharts["H"], orgCharts["I"]])

      let lcm = program.getLowestCommonManager(orgCharts["A"]!, orgCharts["E"]!, orgCharts["I"]!)
      try assert(lcm === orgCharts["B"])
    }
  }
}

extension Program.OrganizationalEntity {
  func addDirectReports(_ directReports: [Program.OrganizationalEntity?]) {
    for directReport in directReports {
      if let report = directReport {
        self.directReports.append(report as Program.OrganizationalEntity)
      }
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


class OrgChart:
    def __init__(self, name):
        self.name = name
        self.directReports = []

    def addDirectReports(self, directReports):
        for directReport in directReports:
            self.directReports.append(directReport)


ALPHABET = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")


def getOrgCharts():
    orgCharts = {}
    for letter in ALPHABET:
        orgCharts[letter] = OrgChart(letter)
    return orgCharts


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        orgCharts = getOrgCharts()
        orgCharts["A"].addDirectReports([orgCharts["B"], orgCharts["C"]])
        orgCharts["B"].addDirectReports([orgCharts["D"], orgCharts["E"]])
        orgCharts["C"].addDirectReports([orgCharts["F"], orgCharts["G"]])
        orgCharts["D"].addDirectReports([orgCharts["H"], orgCharts["I"]])

        lcm = program.getLowestCommonManager(orgCharts["A"], orgCharts["E"], orgCharts["I"])
        self.assertEqual(lcm.name, "B")

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(d) space - where n is the number of people
# in the org and d is the depth (height) of the org chart
def getLowestCommonManager(topManager, reportOne, reportTwo):
    return getOrgInfo(topManager, reportOne, reportTwo).lowestCommonManager


def getOrgInfo(manager, reportOne, reportTwo):
    numImportantReports = 0
    for directReport in manager.directReports:
        orgInfo = getOrgInfo(directReport, reportOne, reportTwo)
        if orgInfo.lowestCommonManager is not None:
            return orgInfo
        numImportantReports += orgInfo.numImportantReports
    if manager == reportOne or manager == reportTwo:
        numImportantReports += 1
    lowestCommonManager = manager if numImportantReports == 2 else None
    return OrgInfo(lowestCommonManager, numImportantReports)


class OrgInfo:
    def __init__(self, lowestCommonManager, numImportantReports):
        self.lowestCommonManager = lowestCommonManager
        self.numImportantReports = numImportantReports


# This is the input class.
class OrgChart:
    def __init__(self, name):
        self.name = name
        self.directReports = []

```
### Unit Tests 1 (python)
```python
import program
import unittest


class OrgChart:
    def __init__(self, name):
        self.name = name
        self.directReports = []

    def addDirectReports(self, directReports):
        for directReport in directReports:
            self.directReports.append(directReport)


ALPHABET = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")


def getOrgCharts():
    orgCharts = {}
    for letter in ALPHABET:
        orgCharts[letter] = OrgChart(letter)
    return orgCharts


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        orgCharts = getOrgCharts()
        orgCharts["A"].addDirectReports([orgCharts["B"], orgCharts["C"]])
        orgCharts["B"].addDirectReports([orgCharts["D"], orgCharts["E"]])
        orgCharts["C"].addDirectReports([orgCharts["F"], orgCharts["G"]])
        orgCharts["D"].addDirectReports([orgCharts["H"], orgCharts["I"]])

        lcm = program.getLowestCommonManager(orgCharts["A"], orgCharts["E"], orgCharts["I"])
        self.assertEqual(lcm.name, "B")

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

class OrgChart {
  name: string;
  directReports: OrgChart[];

  constructor(name: string) {
    this.name = name;
    this.directReports = [];
  }

  addDirectReports(directReports: OrgChart[]) {
    for (const directReport of directReports) {
      this.directReports.push(directReport);
    }
  }
}

function getOrgCharts() {
  const orgCharts: {[key: string]: OrgChart} = {};
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (const letter of ALPHABET) {
    orgCharts[letter] = new OrgChart(letter);
  }
  return orgCharts;
}

it('Test Case #1', function () {
  const orgCharts = getOrgCharts();
  orgCharts['A'].addDirectReports([orgCharts['B'], orgCharts['C']]);
  orgCharts['B'].addDirectReports([orgCharts['D'], orgCharts['E']]);
  orgCharts['C'].addDirectReports([orgCharts['F'], orgCharts['G']]);
  orgCharts['D'].addDirectReports([orgCharts['H'], orgCharts['I']]);

  const lcm = program.getLowestCommonManager(orgCharts.A, orgCharts.A, orgCharts.B);
  chai.expect(lcm).to.deep.equal(orgCharts.A);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class OrgChart {
  name: string;
  directReports: OrgChart[];

  constructor(name: string) {
    this.name = name;
    this.directReports = [];
  }
}

interface OrgInfo {
  lowestCommonManager: OrgChart | null;
  numImportantReports: number;
}

// O(n) time | O(d) space - where n is the number of people
// in the org and d is the depth (height) of the org chart
export function getLowestCommonManager(topManager: OrgChart, reportOne: OrgChart, reportTwo: OrgChart) {
  return getOrgInfo(topManager, reportOne, reportTwo).lowestCommonManager;
}

function getOrgInfo(manager: OrgChart, reportOne: OrgChart, reportTwo: OrgChart): OrgInfo {
  let numImportantReports = 0;
  for (const directReport of manager.directReports) {
    const orgInfo = getOrgInfo(directReport, reportOne, reportTwo);
    if (!!orgInfo.lowestCommonManager) return orgInfo;
    numImportantReports += orgInfo.numImportantReports;
  }
  if (manager === reportOne || manager === reportTwo) numImportantReports++;
  const lowestCommonManager = numImportantReports === 2 ? manager : null;
  return {lowestCommonManager, numImportantReports};
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

class OrgChart {
  name: string;
  directReports: OrgChart[];

  constructor(name: string) {
    this.name = name;
    this.directReports = [];
  }

  addDirectReports(directReports: OrgChart[]) {
    for (const directReport of directReports) {
      this.directReports.push(directReport);
    }
  }
}

function getOrgCharts() {
  const orgCharts: {[key: string]: OrgChart} = {};
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (const letter of ALPHABET) {
    orgCharts[letter] = new OrgChart(letter);
  }
  return orgCharts;
}

it('Test Case #1', function () {
  const orgCharts = getOrgCharts();
  orgCharts['A'].addDirectReports([orgCharts['B'], orgCharts['C']]);
  orgCharts['B'].addDirectReports([orgCharts['D'], orgCharts['E']]);
  orgCharts['C'].addDirectReports([orgCharts['F'], orgCharts['G']]);
  orgCharts['D'].addDirectReports([orgCharts['H'], orgCharts['I']]);

  const lcm = program.getLowestCommonManager(orgCharts.A, orgCharts.A, orgCharts.B);
  chai.expect(lcm).to.deep.equal(orgCharts.A);
});

```

