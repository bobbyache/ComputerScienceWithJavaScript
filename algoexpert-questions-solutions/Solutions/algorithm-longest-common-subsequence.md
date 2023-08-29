# Longest Common Subsequence
<div class="html">
<p>
  Write a function that takes in two strings and returns their longest common
  subsequence.
</p>
<p>
  A subsequence of a string is a set of characters that aren't necessarily
  adjacent in the string but that are in the same order as they appear in the
  string. For instance, the characters <span>["a", "c", "d"]</span> form a
  subsequence of the string <span>"abcd"</span>, and so do the characters
  <span>["b", "d"]</span>. Note that a single character in a string and the
  string itself are both valid subsequences of the string.
</p>
<p>
  You can assume that there will only be one longest common subsequence.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">str1</span> = "ZXVVYZW"
<span class="CodeEditor-promptParameter">str2</span> = "XKYKZPW"
</pre>
<h3>Sample Output</h3>
<pre>
["X", "Y", "Z", "W"]
</pre>
</div>

Hint 1
<p>
Try building a two-dimensional array of the longest common subsequences of substring pairs of the input strings. Let the rows of the array represent substrings of the second input string str2. Let the first row represent the empty string. Let each row i thereafter represent the substrings of str2 from 0 to i, with i excluded. Let the columns similarly represent the first input string str1.
</p>


Hint 2

<p>
Build up the array mentioned in Hint #1 one row at a time. In other words, find the longest common subsequences for all the substrings of str1 represented by the columns and the empty string represented by the first row, then for all the substrings of str1 represented by the columns and the first letter of str2 represented by the second row, etc., until you compare both full strings. Find a formula that relates the longest common subsequence at any given point to previous subsequences.
</p>


Hint 3

<p>
Do you really need to build and store subsequences at each point in the two-dimensional array mentioned in Hint #1? Try storing booleans to determine whether or not a letter at a given point in the two-dimensional array is part of the longest common subsequence as well as pointers to determine what should come before this letter in the final subsequence. Use these pointers to backtrack your way through the array and to build up the longest common subsequence at the end of your algorithm.
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
      vector<char> expected{'X', 'Y', 'Z', 'W'};
      assert(longestCommonSubsequence("ZXVVYZW", "XKYKZPW") == expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

// O(nm*min(n, m)) time | O(nm*min(n, m)) space
vector<char> longestCommonSubsequence(string str1, string str2) {
  vector<vector<vector<char>>> lcs;
  for (int i = 0; i < str2.length() + 1; i++) {
    lcs.push_back(vector<vector<char>>());
    for (int j = 0; j < str1.length() + 1; j++) {
      lcs[i].push_back(vector<char>());
    }
  }
  for (int i = 1; i < str2.length() + 1; i++) {
    for (int j = 1; j < str1.length() + 1; j++) {
      if (str2[i - 1] == str1[j - 1]) {
        vector<char> copy = lcs[i - 1][j - 1];
        copy.push_back(str2[i - 1]);
        lcs[i][j] = copy;
      } else {
        lcs[i][j] = lcs[i - 1][j].size() > lcs[i][j - 1].size() ? lcs[i - 1][j]
                                                                : lcs[i][j - 1];
      }
    }
  }
  return lcs[str2.length()][str1.length()];
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

// O(nm*min(n, m)) time | O((min(n, m))^2) space
vector<char> longestCommonSubsequence(string str1, string str2) {
  string small = str1.length() < str2.length() ? str1 : str2;
  string big = str1.length() >= str2.length() ? str1 : str2;
  vector<vector<char>> evenLcs;
  vector<vector<char>> oddLcs;
  for (int i = 0; i < small.length() + 1; i++) {
    evenLcs.push_back(vector<char>());
  }
  for (int i = 0; i < small.length() + 1; i++) {
    oddLcs.push_back(vector<char>());
  }
  for (int i = 1; i < big.length() + 1; i++) {
    vector<vector<char>> *currentLcs;
    vector<vector<char>> *previousLcs;
    if (i % 2 == 1) {
      currentLcs = &oddLcs;
      previousLcs = &evenLcs;
    } else {
      currentLcs = &evenLcs;
      previousLcs = &oddLcs;
    }
    for (int j = 1; j < small.length() + 1; j++) {
      if (big[i - 1] == small[j - 1]) {
        vector<char> copy = previousLcs->at(j - 1);
        copy.push_back(big[i - 1]);
        currentLcs->at(j) = copy;
      } else {
        currentLcs->at(j) =
            previousLcs->at(j).size() > currentLcs->at(j - 1).size()
                ? previousLcs->at(j)
                : currentLcs->at(j - 1);
      }
    }
  }
  return big.length() % 2 == 0 ? evenLcs[small.length()]
                               : oddLcs[small.length()];
}

```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

vector<char> buildSequence(vector<vector<vector<int>>> lcs);

// O(nm) time | O(nm) space
vector<char> longestCommonSubsequence(string str1, string str2) {
  vector<vector<vector<int>>> lcs(
      str2.length() + 1,
      vector<vector<int>>(str1.length() + 1, vector<int>(4, 0)));
  for (int i = 1; i < str2.length() + 1; i++) {
    for (int j = 1; j < str1.length() + 1; j++) {
      if (str2[i - 1] == str1[j - 1]) {
        lcs[i][j] = {str2[i - 1], lcs[i - 1][j - 1][1] + 1, i - 1, j - 1};
      } else {
        if (lcs[i - 1][j][1] > lcs[i][j - 1][1]) {
          lcs[i][j] = {-1, lcs[i - 1][j][1], i - 1, j};
        } else {
          lcs[i][j] = {-1, lcs[i][j - 1][1], i, j - 1};
        }
      }
    }
  }
  return buildSequence(lcs);
}

vector<char> buildSequence(vector<vector<vector<int>>> lcs) {
  vector<char> sequence;
  int i = lcs.size() - 1;
  int j = lcs[0].size() - 1;
  while (i != 0 && j != 0) {
    vector<int> currentEntry = lcs[i][j];
    if (currentEntry[0] != -1) {
      sequence.insert(sequence.begin(), currentEntry[0]);
    }
    i = currentEntry[2];
    j = currentEntry[3];
  }
  return sequence;
}

```
### Solution 4 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

vector<char> buildSequence(vector<vector<int>> lengths, string str);

// O(nm) time | O(nm) space
vector<char> longestCommonSubsequence(string str1, string str2) {
  vector<vector<int>> lengths(str2.length() + 1,
                              vector<int>(str1.length() + 1, 0));
  for (int i = 1; i < str2.length() + 1; i++) {
    for (int j = 1; j < str1.length() + 1; j++) {
      if (str2[i - 1] == str1[j - 1]) {
        lengths[i][j] = lengths[i - 1][j - 1] + 1;
      } else {
        lengths[i][j] = max(lengths[i - 1][j], lengths[i][j - 1]);
      }
    }
  }
  return buildSequence(lengths, str1);
}

vector<char> buildSequence(vector<vector<int>> lengths, string str) {
  vector<char> sequence;
  int i = lengths.size() - 1;
  int j = lengths[0].size() - 1;
  while (i != 0 && j != 0) {
    if (lengths[i][j] == lengths[i - 1][j]) {
      i--;
    } else if (lengths[i][j] == lengths[i][j - 1]) {
      j--;
    } else {
      sequence.insert(sequence.begin(), str[j - 1]);
      i--;
      j--;
    }
  }
  return sequence;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<char> expected{'X', 'Y', 'Z', 'W'};
      assert(longestCommonSubsequence("ZXVVYZW", "XKYKZPW") == expected);
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
	[Test]
	public void TestCase1() {
		char[] expected = {'X', 'Y', 'Z', 'W'};
		Utils.AssertTrue(compare(Program.LongestCommonSubsequence("ZXVVYZW", "XKYKZPW"),
		  expected));
	}

	private static bool compare(List<char> arr1, char[] arr2) {
		if (arr1.Count != arr2.Length) {
			return false;
		}
		for (int i = 0; i < arr1.Count; i++) {
			if (arr1[i] != arr2[i]) {
				return false;
			}
		}
		return true;
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(nm*min(n, m)) time | O(nm*min(n, m)) space
	public static List<char> LongestCommonSubsequence(string str1, string str2) {
		List<List<List<char> > > lcs = new List<List<List<char> > >();
		for (int i = 0; i < str2.Length + 1; i++) {
			lcs.Add(new List<List<char> >());
			for (int j = 0; j < str1.Length + 1; j++) {
				lcs[i].Add(new List<char>());
			}
		}
		for (int i = 1; i < str2.Length + 1; i++) {
			for (int j = 1; j < str1.Length + 1; j++) {
				if (str2[i - 1] == str1[j - 1]) {
					List<char> copy = new List<char>(lcs[i - 1][j - 1]);
					lcs[i][j] =  copy;
					lcs[i][j].Add(str2[i - 1]);
				} else {
					if (lcs[i - 1][j].Count > lcs[i][j - 1].Count) {
						lcs[i][j] =  lcs[i - 1][j];
					} else {
						lcs[i][j] =  lcs[i][j - 1];
					}
				}
			}
		}
		return lcs[str2.Length][str1.Length];
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(nm*min(n, m)) time | O((min(n, m))^2) space
	public static List<char> LongestCommonSubsequence(string str1, string str2) {
		string small = str1.Length < str2.Length ? str1 : str2;
		string big = str1.Length >= str2.Length ? str1 : str2;
		List<List<char> > evenLcs = new List<List<char> >();
		List<List<char> > oddLcs = new List<List<char> >();
		for (int i = 0; i < small.Length + 1; i++) {
			evenLcs.Add(new List<char>());
		}
		for (int i = 0; i < small.Length + 1; i++) {
			oddLcs.Add(new List<char>());
		}
		for (int i = 1; i < big.Length + 1; i++) {
			List<List<char> > currentLcs;
			List<List<char> > previousLcs;
			if (i % 2 == 1) {
				currentLcs = oddLcs;
				previousLcs = evenLcs;
			} else {
				currentLcs = evenLcs;
				previousLcs = oddLcs;
			}
			for (int j = 1; j < small.Length + 1; j++) {
				if (big[i - 1] == small[j - 1]) {
					List<char> copy = new List<char>(previousLcs[j - 1]);
					currentLcs[j] =  copy;
					currentLcs[j].Add(big[i - 1]);
				} else {
					if (previousLcs[j].Count > currentLcs[j - 1].Count) {
						currentLcs[j] =  previousLcs[j];
					} else {
						currentLcs[j] =  currentLcs[j - 1];
					}
				}
			}
		}
		return big.Length % 2 == 0 ? evenLcs[small.Length] : oddLcs[small.Length];
	}
}

```
### Solution 3 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	// O(nm) time | O(nm) space
	public static List<char> LongestCommonSubsequence(string str1, string str2) {
		int[,][] lcs = new int[str2.Length + 1,str1.Length + 1][];
		for (int i = 0; i < str2.Length + 1; i++) {
			for (int j = 0; j < str1.Length + 1; j++) {
				lcs[i,j] = new int[] {0, 0, 0, 0};
			}
		}
		for (int i = 1; i < str2.Length + 1; i++) {
			for (int j = 1; j < str1.Length + 1; j++) {
				if (str2[i - 1] == str1[j - 1]) {
					int[] newEntry =
					{(int)str2[i - 1], lcs[i - 1,j - 1][1] + 1, i - 1, j - 1};
					lcs[i,j] = newEntry;
				} else {
					if (lcs[i - 1,j][1] > lcs[i,j - 1][1]) {
						int[] newEntry = {-1, lcs[i - 1,j][1], i - 1, j};
						lcs[i,j] = newEntry;
					} else {
						int[] newEntry = {-1, lcs[i,j - 1][1], i, j - 1};
						lcs[i,j] = newEntry;
					}
				}
			}
		}
		return buildSequence(lcs);
	}

	public static List<char> buildSequence(int[,][] lcs) {
		List<char> sequence = new List<char>();
		int i = lcs.GetLength(0) - 1;
		int j = lcs.GetLength(1) - 1;
		while (i != 0 && j != 0) {
			int[] currentEntry = lcs[i,j];
			if (currentEntry[0] != -1) {
				sequence.Insert(0, (char)currentEntry[0]);
			}
			i = currentEntry[2];
			j = currentEntry[3];
		}
		return sequence;
	}
}

```
### Solution 4 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;

public class Program {
	// O(nm) time | O(nm) space
	public static List<char> LongestCommonSubsequence(string str1, string str2) {
		int[,] lengths = new int[str2.Length + 1,str1.Length + 1];
		for (int i = 1; i < str2.Length + 1; i++) {
			for (int j = 1; j < str1.Length + 1; j++) {
				if (str2[i - 1] == str1[j - 1]) {
					lengths[i,j] = lengths[i - 1,j - 1] + 1;
				} else {
					lengths[i,j] = Math.Max(lengths[i - 1,j], lengths[i,j - 1]);
				}
			}
		}
		return buildSequence(lengths, str1);
	}

	public static List<char> buildSequence(int[,] lengths, string str) {
		List<char> sequence = new List<char>();
		int i = lengths.GetLength(0) - 1;
		int j = lengths.GetLength(1) - 1;
		while (i != 0 && j != 0) {
			if (lengths[i,j] == lengths[i - 1,j]) {
				i--;
			} else if (lengths[i,j] == lengths[i,j - 1]) {
				j--;
			} else {
				sequence.Insert(0, str[j - 1]);
				i--;
				j--;
			}
		}
		return sequence;
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		char[] expected = {'X', 'Y', 'Z', 'W'};
		Utils.AssertTrue(compare(Program.LongestCommonSubsequence("ZXVVYZW", "XKYKZPW"),
		  expected));
	}

	private static bool compare(List<char> arr1, char[] arr2) {
		if (arr1.Count != arr2.Length) {
			return false;
		}
		for (int i = 0; i < arr1.Count; i++) {
			if (arr1[i] != arr2[i]) {
				return false;
			}
		}
		return true;
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
	expected := []byte("XYZW")
	output := LongestCommonSubsequence("ZXVVYZW", "XKYKZPW")
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(nm*min(n, m)) time | O(nm*min(n, m)) space
func LongestCommonSubsequence(s1 string, s2 string) []byte {
	lcs := make([][][]byte, len(s2)+1)
	for i := range lcs {
		lcs[i] = make([][]byte, len(s1)+1)
	}
	for i := 1; i < len(lcs); i++ {
		for j := 1; j < len(lcs[i]); j++ {
			if s2[i-1] == s1[j-1] {
				tmp := make([]byte, len(lcs[i-1][j-1]))
				copy(tmp, lcs[i-1][j-1])
				lcs[i][j] = append(tmp, s2[i-1])
			} else {
				if len(lcs[i-1][j]) < len(lcs[i][j-1]) {
					lcs[i][j] = lcs[i][j-1]
				} else {
					lcs[i][j] = lcs[i-1][j]
				}
			}
		}
	}
	return lcs[len(s2)][len(s1)]
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(nm*min(n, m)) time | O((min(n, m))^2) space
func LongestCommonSubsequence(s1 string, s2 string) []byte {
	small, big := s1, s2
	if len(s1) > len(s2) {
		small, big = big, small
	}
	evenlcs := make([][]byte, len(small)+1)
	oddlcs := make([][]byte, len(small)+1)
	currentlcs, previouslcs := evenlcs, oddlcs
	for i := 1; i < len(big)+1; i++ {
		if i%2 == 1 {
			currentlcs, previouslcs = oddlcs, evenlcs
		} else {
			currentlcs, previouslcs = evenlcs, oddlcs
		}
		for j := 1; j < len(small)+1; j++ {
			if big[i-1] == small[j-1] {
				tmp := make([]byte, len(previouslcs[j-1]))
				copy(tmp, previouslcs[j-1])
				currentlcs[j] = append(tmp, big[i-1])
			} else {
				if len(previouslcs[j]) > len(currentlcs[j-1]) {
					currentlcs[j] = previouslcs[j]
				} else {
					currentlcs[j] = currentlcs[j-1]
				}
			}
		}
	}

	if len(big)%2 == 0 {
		return evenlcs[len(small)]
	} else {
		return oddlcs[len(small)]
	}
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type entry struct {
	letter byte
	length int
	previ  int
	prevj  int
}

// O(nm) time | O(nm) space
func LongestCommonSubsequence(str1 string, str2 string) []byte {
	lcs := make([][]entry, len(str2)+1)
	for i := range lcs {
		lcs[i] = make([]entry, len(str1)+1)
		for j := range lcs[i] {
			lcs[i][j].letter = 0
			lcs[i][j].length = 0
			lcs[i][j].previ = -1
			lcs[i][j].prevj = -1
		}
	}

	for i := 1; i < len(str2)+1; i++ {
		for j := 1; j < len(str1)+1; j++ {
			if str2[i-1] == str1[j-1] {
				lcs[i][j] = entry{str2[i-1], lcs[i-1][j-1].length + 1, i - 1, j - 1}
			} else {
				if lcs[i-1][j].length > lcs[i][j-1].length {
					lcs[i][j] = entry{0, lcs[i-1][j].length, i - 1, j}
				} else {
					lcs[i][j] = entry{0, lcs[i][j-1].length, i, j - 1}
				}
			}
		}
	}
	return buildSequence(lcs)
}

func buildSequence(lcs [][]entry) []byte {
	sequence := make([]byte, 0)
	i := len(lcs) - 1
	j := len(lcs[0]) - 1
	for i != 0 && j != 0 {
		current := lcs[i][j]
		if current.letter != 0 {
			sequence = append(sequence, current.letter)
		}
		i = current.previ
		j = current.prevj
	}
	return reverse(sequence)
}

func reverse(arr []byte) []byte {
	for i, j := 0, len(arr)-1; i < j; i, j = i+1, j-1 {
		arr[i], arr[j] = arr[j], arr[i]
	}
	return arr
}

```
### Solution 4 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(nm) time | O(nm) space
func LongestCommonSubsequence(str1 string, str2 string) []byte {
	lengths := make([][]int, len(str2)+1)
	for i := range lengths {
		lengths[i] = make([]int, len(str1)+1)
	}
	for i := 1; i < len(str2)+1; i++ {
		for j := 1; j < len(str1)+1; j++ {
			if str2[i-1] == str1[j-1] {
				lengths[i][j] = lengths[i-1][j-1] + 1
			} else {
				lengths[i][j] = max(lengths[i-1][j], lengths[i][j-1])
			}
		}
	}

	return buildSequence(lengths, str1)
}

func buildSequence(lengths [][]int, str1 string) []byte {
	sequence := make([]byte, 0)
	i := len(lengths) - 1
	j := len(lengths[0]) - 1
	for i != 0 && j != 0 {
		if lengths[i][j] == lengths[i-1][j] {
			i -= 1
		} else if lengths[i][j] == lengths[i][j-1] {
			j -= 1
		} else {
			sequence = append(sequence, str1[j-1])
			i -= 1
			j -= 1
		}
	}
	return reverse(sequence)
}

func reverse(arr []byte) []byte {
	for i, j := 0, len(arr)-1; i < j; i, j = i+1, j-1 {
		arr[i], arr[j] = arr[j], arr[i]
	}
	return arr
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
	expected := []byte("XYZW")
	output := LongestCommonSubsequence("ZXVVYZW", "XKYKZPW")
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
  @Test
  public void TestCase1() {
    char[] expected = {'X', 'Y', 'Z', 'W'};
    Utils.assertTrue(compare(Program.longestCommonSubsequence("ZXVVYZW", "XKYKZPW"), expected));
  }

  private static boolean compare(List<Character> arr1, char[] arr2) {
    if (arr1.size() != arr2.length) {
      return false;
    }
    for (int i = 0; i < arr1.size(); i++) {
      if (arr1.get(i) != arr2[i]) {
        return false;
      }
    }
    return true;
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(nm*min(n, m)) time | O(nm*min(n, m)) space
  public static List<Character> longestCommonSubsequence(String str1, String str2) {
    List<List<List<Character>>> lcs = new ArrayList<List<List<Character>>>();
    for (int i = 0; i < str2.length() + 1; i++) {
      lcs.add(new ArrayList<List<Character>>());
      for (int j = 0; j < str1.length() + 1; j++) {
        lcs.get(i).add(new ArrayList<Character>());
      }
    }
    for (int i = 1; i < str2.length() + 1; i++) {
      for (int j = 1; j < str1.length() + 1; j++) {
        if (str2.charAt(i - 1) == str1.charAt(j - 1)) {
          List<Character> copy = new ArrayList<Character>(lcs.get(i - 1).get(j - 1));
          lcs.get(i).set(j, copy);
          lcs.get(i).get(j).add(str2.charAt(i - 1));
        } else {
          if (lcs.get(i - 1).get(j).size() > lcs.get(i).get(j - 1).size()) {
            lcs.get(i).set(j, lcs.get(i - 1).get(j));
          } else {
            lcs.get(i).set(j, lcs.get(i).get(j - 1));
          }
        }
      }
    }
    return lcs.get(str2.length()).get(str1.length());
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(nm*min(n, m)) time | O((min(n, m))^2) space
  public static List<Character> longestCommonSubsequence(String str1, String str2) {
    String small = str1.length() < str2.length() ? str1 : str2;
    String big = str1.length() >= str2.length() ? str1 : str2;
    List<List<Character>> evenLcs = new ArrayList<List<Character>>();
    List<List<Character>> oddLcs = new ArrayList<List<Character>>();
    for (int i = 0; i < small.length() + 1; i++) {
      evenLcs.add(new ArrayList<Character>());
    }
    for (int i = 0; i < small.length() + 1; i++) {
      oddLcs.add(new ArrayList<Character>());
    }
    for (int i = 1; i < big.length() + 1; i++) {
      List<List<Character>> currentLcs;
      List<List<Character>> previousLcs;
      if (i % 2 == 1) {
        currentLcs = oddLcs;
        previousLcs = evenLcs;
      } else {
        currentLcs = evenLcs;
        previousLcs = oddLcs;
      }
      for (int j = 1; j < small.length() + 1; j++) {
        if (big.charAt(i - 1) == small.charAt(j - 1)) {
          List<Character> copy = new ArrayList<Character>(previousLcs.get(j - 1));
          currentLcs.set(j, copy);
          currentLcs.get(j).add(big.charAt(i - 1));
        } else {
          if (previousLcs.get(j).size() > currentLcs.get(j - 1).size()) {
            currentLcs.set(j, previousLcs.get(j));
          } else {
            currentLcs.set(j, currentLcs.get(j - 1));
          }
        }
      }
    }
    return big.length() % 2 == 0 ? evenLcs.get(small.length()) : oddLcs.get(small.length());
  }
}

```
### Solution 3 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(nm) time | O(nm) space
  public static List<Character> longestCommonSubsequence(String str1, String str2) {
    int[][][] lcs = new int[str2.length() + 1][str1.length() + 1][];
    for (int i = 0; i < str2.length() + 1; i++) {
      for (int j = 0; j < str1.length() + 1; j++) {
        lcs[i][j] = new int[] {0, 0, 0, 0};
      }
    }
    for (int i = 1; i < str2.length() + 1; i++) {
      for (int j = 1; j < str1.length() + 1; j++) {
        if (str2.charAt(i - 1) == str1.charAt(j - 1)) {
          int[] newEntry = {(int) str2.charAt(i - 1), lcs[i - 1][j - 1][1] + 1, i - 1, j - 1};
          lcs[i][j] = newEntry;
        } else {
          if (lcs[i - 1][j][1] > lcs[i][j - 1][1]) {
            int[] newEntry = {-1, lcs[i - 1][j][1], i - 1, j};
            lcs[i][j] = newEntry;
          } else {
            int[] newEntry = {-1, lcs[i][j - 1][1], i, j - 1};
            lcs[i][j] = newEntry;
          }
        }
      }
    }
    return buildSequence(lcs);
  }

  public static List<Character> buildSequence(int[][][] lcs) {
    List<Character> sequence = new ArrayList<Character>();
    int i = lcs.length - 1;
    int j = lcs[0].length - 1;
    while (i != 0 && j != 0) {
      int[] currentEntry = lcs[i][j];
      if (currentEntry[0] != -1) {
        sequence.add(0, (char) currentEntry[0]);
      }
      i = currentEntry[2];
      j = currentEntry[3];
    }
    return sequence;
  }
}

```
### Solution 4 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(nm) time | O(nm) space
  public static List<Character> longestCommonSubsequence(String str1, String str2) {
    int[][] lengths = new int[str2.length() + 1][str1.length() + 1];
    for (int i = 1; i < str2.length() + 1; i++) {
      for (int j = 1; j < str1.length() + 1; j++) {
        if (str2.charAt(i - 1) == str1.charAt(j - 1)) {
          lengths[i][j] = lengths[i - 1][j - 1] + 1;
        } else {
          lengths[i][j] = Math.max(lengths[i - 1][j], lengths[i][j - 1]);
        }
      }
    }
    return buildSequence(lengths, str1);
  }

  public static List<Character> buildSequence(int[][] lengths, String str) {
    List<Character> sequence = new ArrayList<Character>();
    int i = lengths.length - 1;
    int j = lengths[0].length - 1;
    while (i != 0 && j != 0) {
      if (lengths[i][j] == lengths[i - 1][j]) {
        i--;
      } else if (lengths[i][j] == lengths[i][j - 1]) {
        j--;
      } else {
        sequence.add(0, str.charAt(j - 1));
        i--;
        j--;
      }
    }
    return sequence;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    char[] expected = {'X', 'Y', 'Z', 'W'};
    Utils.assertTrue(compare(Program.longestCommonSubsequence("ZXVVYZW", "XKYKZPW"), expected));
  }

  private static boolean compare(List<Character> arr1, char[] arr2) {
    if (arr1.size() != arr2.length) {
      return false;
    }
    for (int i = 0; i < arr1.size(); i++) {
      if (arr1.get(i) != arr2[i]) {
        return false;
      }
    }
    return true;
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
  chai.expect(program.longestCommonSubsequence('ZXVVYZW', 'XKYKZPW')).to.deep.equal(['X', 'Y', 'Z', 'W']);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nm*min(n, m)) time | O(nm*min(n, m)) space
function longestCommonSubsequence(str1, str2) {
  const lcs = [];
  for (let i = 0; i < str2.length + 1; i++) {
    const row = new Array(str1.length + 1).fill([]);
    lcs.push(row);
  }
  for (let i = 1; i < str2.length + 1; i++) {
    for (let j = 1; j < str1.length + 1; j++) {
      if (str2[i - 1] === str1[j - 1]) {
        lcs[i][j] = lcs[i - 1][j - 1].concat(str2[i - 1]);
      } else {
        lcs[i][j] = lcs[i - 1][j].length > lcs[i][j - 1].length ? lcs[i - 1][j] : lcs[i][j - 1];
      }
    }
  }
  return lcs[str2.length][str1.length];
}

exports.longestCommonSubsequence = longestCommonSubsequence;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nm*min(n, m)) time | O((min(n, m))^2) space
function longestCommonSubsequence(str1, str2) {
  const small = str1.length < str2.length ? str1 : str2;
  const big = str1.length >= str2.length ? str1 : str2;
  const evenLcs = new Array(small.length + 1).fill([]);
  const oddLcs = new Array(small.length + 1).fill([]);
  for (let i = 1; i < big.length + 1; i++) {
    let currentLcs, previousLcs;
    if (i % 2 === 1) {
      currentLcs = oddLcs;
      previousLcs = evenLcs;
    } else {
      currentLcs = evenLcs;
      previousLcs = oddLcs;
    }
    for (let j = 1; j < small.length + 1; j++) {
      if (big[i - 1] === small[j - 1]) {
        currentLcs[j] = previousLcs[j - 1].concat(big[i - 1]);
      } else {
        currentLcs[j] = previousLcs[j].length > currentLcs[j - 1].length ? previousLcs[j] : currentLcs[j - 1];
      }
    }
  }
  return big.length % 2 === 0 ? evenLcs[small.length] : oddLcs[small.length];
}

exports.longestCommonSubsequence = longestCommonSubsequence;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nm) time | O(nm) space
function longestCommonSubsequence(str1, str2) {
  const lcs = [];
  for (let i = 0; i < str2.length + 1; i++) {
    const row = [];
    for (let j = 0; j < str1.length + 1; j++) {
      const entry = new Array(4);
      entry[1] = 0;
      row.push(entry);
    }
    lcs.push(row);
  }
  for (let i = 1; i < str2.length + 1; i++) {
    for (let j = 1; j < str1.length + 1; j++) {
      if (str2[i - 1] === str1[j - 1]) {
        lcs[i][j] = [str2[i - 1], lcs[i - 1][j - 1][1] + 1, i - 1, j - 1];
      } else {
        if (lcs[i - 1][j][1] > lcs[i][j - 1][1]) {
          lcs[i][j] = [null, lcs[i - 1][j][1], i - 1, j];
        } else {
          lcs[i][j] = [null, lcs[i][j - 1][1], i, j - 1];
        }
      }
    }
  }
  return buildSequence(lcs);
}

function buildSequence(lcs) {
  const sequence = [];
  let i = lcs.length - 1;
  let j = lcs[0].length - 1;
  while (i !== 0 && j !== 0) {
    let currentEntry = lcs[i][j];
    if (currentEntry[0]) {
      sequence.unshift(currentEntry[0]);
    }
    i = currentEntry[2];
    j = currentEntry[3];
  }
  return sequence;
}

exports.longestCommonSubsequence = longestCommonSubsequence;

```
### Solution 4 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nm) time | O(nm) space
function longestCommonSubsequence(str1, str2) {
  const lengths = [];
  for (let i = 0; i < str2.length + 1; i++) {
    lengths.push(new Array(str1.length + 1).fill(0));
  }
  for (let i = 1; i < str2.length + 1; i++) {
    for (let j = 1; j < str1.length + 1; j++) {
      if (str2[i - 1] === str1[j - 1]) {
        lengths[i][j] = lengths[i - 1][j - 1] + 1;
      } else {
        lengths[i][j] = Math.max(lengths[i - 1][j], lengths[i][j - 1]);
      }
    }
  }
  return buildSequence(lengths, str1);
}

function buildSequence(lengths, string) {
  const sequence = [];
  let i = lengths.length - 1;
  let j = lengths[0].length - 1;
  while (i !== 0 && j !== 0) {
    if (lengths[i][j] === lengths[i - 1][j]) {
      i--;
    } else if (lengths[i][j] === lengths[i][j - 1]) {
      j--;
    } else {
      sequence.unshift(string[j - 1]);
      i--;
      j--;
    }
  }
  return sequence;
}

exports.longestCommonSubsequence = longestCommonSubsequence;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.longestCommonSubsequence('ZXVVYZW', 'XKYKZPW')).to.deep.equal(['X', 'Y', 'Z', 'W']);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.longestCommonSubsequence

class ProgramTest {
    @Test
    fun TestCase1() {
        val expected = listOf('X', 'Y', 'Z', 'W')
        val output = longestCommonSubsequence("ZXVVYZW", "XKYKZPW")
        assert(output == expected)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(nm*min(n, m)) time | O(nm*min(n, m)) space
fun longestCommonSubsequence(str1: String, str2: String): List<Char> {
    val lcs = List(str2.length + 1) { MutableList(str1.length + 1) { mutableListOf<Char>() } }
    for (i in 1 until str2.length + 1) {
        for (j in 1 until str1.length + 1) {
            if (str2[i - 1] == str1[j - 1]) {
                lcs[i][j] = lcs[i - 1][j - 1].toMutableList()
                lcs[i][j].add(str2[i - 1])
            } else {
                if (lcs[i - 1][j].size > lcs[i][j - 1].size) {
                    lcs[i][j] = lcs[i - 1][j]
                } else {
                    lcs[i][j] = lcs[i][j - 1]
                }
            }
        }
    }
    return lcs[str2.length][str1.length]
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(nm*min(n, m)) time | O((min(n, m))^2) space
fun longestCommonSubsequence(str1: String, str2: String): List<Char> {
    val small = if (str1.length < str2.length) str1 else str2
    val big = if (str1.length >= str2.length) str1 else str2

    val evenLcs = MutableList(small.length + 1) { mutableListOf<Char>() }
    val oddLcs = MutableList(small.length + 1) { mutableListOf<Char>() }

    for (i in 1 until big.length + 1) {
        val currentLcs = if (i % 2 == 1) oddLcs else evenLcs
        val previousLcs = if (i % 2 == 0) oddLcs else evenLcs
        for (j in 1 until small.length + 1) {
            if (big[i - 1] == small[j - 1]) {
                currentLcs[j] = previousLcs[j - 1].toMutableList()
                currentLcs[j].add(big[i - 1])
            } else {
                if (previousLcs[j].size > currentLcs[j - 1].size) {
                    currentLcs[j] = previousLcs[j]
                } else {
                    currentLcs[j] = currentLcs[j - 1]
                }
            }
        }
    }
    return if (big.length % 2 == 0) evenLcs[small.length] else oddLcs[small.length]
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(nm) time | O(nm) space
fun longestCommonSubsequence(str1: String, str2: String): List<Char> {
    val lcs = List(str2.length + 1) { MutableList(str1.length + 1) { mutableListOf(0, 0, 0, 0) } }

    for (i in 1 until str2.length + 1) {
        for (j in 1 until str1.length + 1) {
            if (str2[i - 1] == str1[j - 1]) {
                lcs[i][j] = mutableListOf(str2[i - 1].toInt(), lcs[i - 1][j - 1][1] + 1, i - 1, j - 1)
            } else {
                if (lcs[i - 1][j][1] > lcs[i][j - 1][1]) {
                    lcs[i][j] = mutableListOf(-1, lcs[i - 1][j][1], i - 1, j)
                } else {
                    lcs[i][j] = mutableListOf(-1, lcs[i][j - 1][1], i, j - 1)
                }
            }
        }
    }
    return buildSequence(lcs)
}

fun buildSequence(lcs: List<List<List<Int>>>): List<Char> {
    val sequence = mutableListOf<Char>()
    var i = lcs.size - 1
    var j = lcs[0].size - 1
    while (i != 0 && j != 0) {
        val currentEntry = lcs[i][j]
        if (currentEntry[0] != -1) {
            sequence.add(0, currentEntry[0].toChar())
        }
        i = currentEntry[2]
        j = currentEntry[3]
    }
    return sequence
}

```
### Solution 4 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(nm) time | O(nm) space
fun longestCommonSubsequence(str1: String, str2: String): List<Char> {
    val lengths = List(str2.length + 1) { MutableList(str1.length + 1) { 0 } }

    for (i in 1 until str2.length + 1) {
        for (j in 1 until str1.length + 1) {
            if (str2[i - 1] == str1[j - 1]) {
                lengths[i][j] = lengths[i - 1][j - 1] + 1
            } else {
                lengths[i][j] = max(lengths[i - 1][j], lengths[i][j - 1])
            }
        }
    }
    return buildSequence(lengths, str1)
}

fun buildSequence(lengths: List<MutableList<Int>>, str: String): List<Char> {
    val sequence = mutableListOf<Char>()
    var i = lengths.size - 1
    var j = lengths[0].size - 1
    while (i != 0 && j != 0) {
        if (lengths[i][j] == lengths[i - 1][j]) {
            i--
        } else if (lengths[i][j] == lengths[i][j - 1]) {
            j--
        } else {
            sequence.add(0, str[j - 1])
            i--
            j--
        }
    }
    return sequence
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.longestCommonSubsequence

class ProgramTest {
    @Test
    fun TestCase1() {
        val expected = listOf('X', 'Y', 'Z', 'W')
        val output = longestCommonSubsequence("ZXVVYZW", "XKYKZPW")
        assert(output == expected)
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
      let output = program.longestCommonSubsequence(firstString: "ZXVVYZW", secondString: "XKYKZPW")
      try assertEqual(["X", "Y", "Z", "W"], output)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nm * min(n, m)) time | O(nm * min(n, m)) space
  func longestCommonSubsequence(firstString: String, secondString: String) -> [String] {
    var lcs = [[[String]]]()

    for _ in 0 ..< firstString.count + 1 {
      let row = Array(repeating: [String](), count: secondString.count + 1)
      lcs.append(row)
    }

    for i in stride(from: 1, to: firstString.count + 1, by: 1) {
      for j in stride(from: 1, to: secondString.count + 1, by: 1) {
        let firstIndex = firstString.index(firstString.startIndex, offsetBy: i - 1)
        let secondIndex = secondString.index(secondString.startIndex, offsetBy: j - 1)

        if firstString[firstIndex] == secondString[secondIndex] {
          var diagonal = lcs[i - 1][j - 1]
          let char = String(firstString[firstIndex])
          diagonal.append(char)

          lcs[i][j] = diagonal
        } else {
          let left = lcs[i][j - 1]
          let top = lcs[i - 1][j]

          lcs[i][j] = left.count > top.count ? left : top
        }
      }
    }

    return lcs[firstString.count][secondString.count]
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nm * min(n, m)) time | O(min(n, m)^2) space
  func longestCommonSubsequence(firstString: String, secondString: String) -> [String] {
    let smallestString = firstString.count < secondString.count ? firstString : secondString
    let biggestString = firstString.count >= secondString.count ? firstString : secondString

    var evenLCS = Array(repeating: [String](), count: smallestString.count + 1)
    var oddLCS = Array(repeating: [String](), count: smallestString.count + 1)

    for i in stride(from: 1, to: biggestString.count + 1, by: 1) {
      if i % 2 == 0 {
        secondSolutionHelper(i, biggestString, smallestString, currentLCS: &evenLCS, previousLCS: &oddLCS)
      } else {
        secondSolutionHelper(i, biggestString, smallestString, currentLCS: &oddLCS, previousLCS: &evenLCS)
      }
    }

    return biggestString.count % 2 == 0 ? evenLCS[smallestString.count] : oddLCS[smallestString.count]
  }

  func secondSolutionHelper(_ i: Int, _ biggestString: String, _ smallestString: String, currentLCS: inout [[String]], previousLCS: inout [[String]]) {
    for j in stride(from: 1, to: smallestString.count + 1, by: 1) {
      let firstIndex = biggestString.index(biggestString.startIndex, offsetBy: i - 1)
      let secondIndex = smallestString.index(smallestString.startIndex, offsetBy: j - 1)

      if biggestString[firstIndex] == smallestString[secondIndex] {
        var diagonal = previousLCS[j - 1]
        let char = String(smallestString[secondIndex])
        diagonal.append(char)

        currentLCS[j] = diagonal
      } else {
        let top = previousLCS[j]
        let left = currentLCS[j - 1]

        if top.count > left.count {
          currentLCS[j] = top
        } else {
          currentLCS[j] = left
        }
      }
    }
  }
}

```
### Solution 3 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nm) time | O(nm) space
  func longestCommonSubsequence(firstString: String, secondString: String) -> [String] {
    var lcs = [[(String, Int, Int, Int)]]()

    for _ in stride(from: 0, to: firstString.count + 1, by: 1) {
      var row = [(String, Int, Int, Int)]()

      for _ in stride(from: 0, to: secondString.count + 1, by: 1) {
        let tuple = ("", 0, 0, 0)
        row.append(tuple)
      }

      lcs.append(row)
    }

    for i in stride(from: 1, to: firstString.count + 1, by: 1) {
      for j in stride(from: 1, to: secondString.count + 1, by: 1) {
        let firstIndex = firstString.index(firstString.startIndex, offsetBy: i - 1)
        let secondIndex = secondString.index(secondString.startIndex, offsetBy: j - 1)

        if firstString[firstIndex] == secondString[secondIndex] {
          let char = String(firstString[firstIndex])
          lcs[i][j] = (char, lcs[i - 1][j - 1].1 + 1, i - 1, j - 1)
        } else {
          if lcs[i - 1][j].1 > lcs[i][j - 1].1 {
            lcs[i][j] = ("", lcs[i - 1][j].1, i - 1, j)
          } else {
            lcs[i][j] = ("", lcs[i][j - 1].1, i, j - 1)
          }
        }
      }
    }

    return buildSequence(lcs: lcs)
  }

  func buildSequence(lcs: [[(String, Int, Int, Int)]]) -> [String] {
    var sequence = [String]()

    var i = lcs.count - 1
    var j = lcs[0].count - 1

    while i != 0, j != 0 {
      let currentEntry = lcs[i][j]

      if currentEntry.0 != "" {
        sequence.insert(currentEntry.0, at: 0)
      }

      i = currentEntry.2
      j = currentEntry.3
    }

    return sequence
  }
}

```
### Solution 4 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(nm) time | O(nm) space
  func longestCommonSubsequence(firstString: String, secondString: String) -> [String] {
    var lengths = [[Int]]()

    for _ in stride(from: 0, to: firstString.count + 1, by: 1) {
      let row = Array(repeating: 0, count: secondString.count + 1)
      lengths.append(row)
    }

    for i in stride(from: 1, to: firstString.count + 1, by: 1) {
      for j in stride(from: 1, to: secondString.count + 1, by: 1) {
        let firstIndex = firstString.index(firstString.startIndex, offsetBy: i - 1)
        let secondIndex = secondString.index(secondString.startIndex, offsetBy: j - 1)

        if firstString[firstIndex] == secondString[secondIndex] {
          lengths[i][j] = lengths[i - 1][j - 1] + 1
        } else {
          lengths[i][j] = max(lengths[i - 1][j], lengths[i][j - 1])
        }
      }
    }

    return buildSequence(lengths: lengths, string: secondString)
  }

  // Build lcs from lengths array and initial string
  func buildSequence(lengths: [[Int]], string: String) -> [String] {
    var sequence = [String]()

    var i = lengths.count - 1
    var j = lengths[0].count - 1

    while i != 0, j != 0 {
      if lengths[i][j] == lengths[i - 1][j] {
        i -= 1
      } else if lengths[i][j] == lengths[i][j - 1] {
        j -= 1
      } else {
        let index = string.index(string.startIndex, offsetBy: j - 1)
        let char = String(string[index])

        sequence.insert(char, at: 0)
        i -= 1
        j -= 1
      }
    }

    return sequence
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let output = program.longestCommonSubsequence(firstString: "ZXVVYZW", secondString: "XKYKZPW")
      try assertEqual(["X", "Y", "Z", "W"], output)
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
        output = program.longestCommonSubsequence("ZXVVYZW", "XKYKZPW")
        self.assertEqual(output, ["X", "Y", "Z", "W"])

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nm*min(n, m)) time | O(nm*min(n, m)) space
def longestCommonSubsequence(str1, str2):
    lcs = [[[] for x in range(len(str1) + 1)] for y in range(len(str2) + 1)]
    for i in range(1, len(str2) + 1):
        for j in range(1, len(str1) + 1):
            if str2[i - 1] == str1[j - 1]:
                lcs[i][j] = lcs[i - 1][j - 1] + [str2[i - 1]]
            else:
                lcs[i][j] = max(lcs[i - 1][j], lcs[i][j - 1], key=len)
    return lcs[-1][-1]

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nm*min(n, m)) time | O((min(n, m))^2) space
def longestCommonSubsequence(str1, str2):
    small = str1 if len(str1) < len(str2) else str2
    big = str1 if len(str1) >= len(str2) else str2
    evenLcs = [[] for x in range(len(small) + 1)]
    oddLcs = [[] for x in range(len(small) + 1)]
    for i in range(1, len(big) + 1):
        if i % 2 == 1:
            currentLcs = oddLcs
            previousLcs = evenLcs
        else:
            currentLcs = evenLcs
            previousLcs = oddLcs
        for j in range(1, len(small) + 1):
            if big[i - 1] == small[j - 1]:
                currentLcs[j] = previousLcs[j - 1] + [big[i - 1]]
            else:
                currentLcs[j] = max(previousLcs[j], currentLcs[j - 1], key=len)
    return evenLcs[-1] if len(big) % 2 == 0 else oddLcs[-1]

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nm) time | O(nm) space
def longestCommonSubsequence(str1, str2):
    lcs = [[[None, 0, None, None] for x in range(len(str1) + 1)] for y in range(len(str2) + 1)]
    for i in range(1, len(str2) + 1):
        for j in range(1, len(str1) + 1):
            if str2[i - 1] == str1[j - 1]:
                lcs[i][j] = [str2[i - 1], lcs[i - 1][j - 1][1] + 1, i - 1, j - 1]
            else:
                if lcs[i - 1][j][1] > lcs[i][j - 1][1]:
                    lcs[i][j] = [None, lcs[i - 1][j][1], i - 1, j]
                else:
                    lcs[i][j] = [None, lcs[i][j - 1][1], i, j - 1]
    return buildSequence(lcs)


def buildSequence(lcs):
    sequence = []
    i = len(lcs) - 1
    j = len(lcs[0]) - 1
    while i != 0 and j != 0:
        currentEntry = lcs[i][j]
        if currentEntry[0] is not None:
            sequence.append(currentEntry[0])
        i = currentEntry[2]
        j = currentEntry[3]
    return list(reversed(sequence))

```
### Solution 4 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(nm) time | O(nm) space
def longestCommonSubsequence(str1, str2):
    lengths = [[0 for x in range(len(str1) + 1)] for y in range(len(str2) + 1)]
    for i in range(1, len(str2) + 1):
        for j in range(1, len(str1) + 1):
            if str2[i - 1] == str1[j - 1]:
                lengths[i][j] = lengths[i - 1][j - 1] + 1
            else:
                lengths[i][j] = max(lengths[i - 1][j], lengths[i][j - 1])
    return buildSequence(lengths, str1)


def buildSequence(lengths, string):
    sequence = []
    i = len(lengths) - 1
    j = len(lengths[0]) - 1
    while i != 0 and j != 0:
        if lengths[i][j] == lengths[i - 1][j]:
            i -= 1
        elif lengths[i][j] == lengths[i][j - 1]:
            j -= 1
        else:
            sequence.append(string[j - 1])
            i -= 1
            j -= 1
    return list(reversed(sequence))

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        output = program.longestCommonSubsequence("ZXVVYZW", "XKYKZPW")
        self.assertEqual(output, ["X", "Y", "Z", "W"])

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.longestCommonSubsequence('ZXVVYZW', 'XKYKZPW')).to.deep.equal(['X', 'Y', 'Z', 'W']);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nm*min(n, m)) time | O(nm*min(n, m)) space
export function longestCommonSubsequence(str1: string, str2: string) {
  const lcs: string[][][] = [];
  for (let i = 0; i < str2.length + 1; i++) {
    const row = new Array(str1.length + 1).fill([]);
    lcs.push(row);
  }
  for (let i = 1; i < str2.length + 1; i++) {
    for (let j = 1; j < str1.length + 1; j++) {
      if (str2[i - 1] === str1[j - 1]) {
        lcs[i][j] = lcs[i - 1][j - 1].concat(str2[i - 1]);
      } else {
        lcs[i][j] = lcs[i - 1][j].length > lcs[i][j - 1].length ? lcs[i - 1][j] : lcs[i][j - 1];
      }
    }
  }
  return lcs[str2.length][str1.length];
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nm*min(n, m)) time | O((min(n, m))^2) space
export function longestCommonSubsequence(str1: string, str2: string) {
  const small = str1.length < str2.length ? str1 : str2;
  const big = str1.length >= str2.length ? str1 : str2;
  const evenLcs: string[][] = new Array(small.length + 1).fill([]);
  const oddLcs: string[][] = new Array(small.length + 1).fill([]);
  for (let i = 1; i < big.length + 1; i++) {
    let currentLcs, previousLcs;
    if (i % 2 === 1) {
      currentLcs = oddLcs;
      previousLcs = evenLcs;
    } else {
      currentLcs = evenLcs;
      previousLcs = oddLcs;
    }
    for (let j = 1; j < small.length + 1; j++) {
      if (big[i - 1] === small[j - 1]) {
        currentLcs[j] = previousLcs[j - 1].concat(big[i - 1]);
      } else {
        currentLcs[j] = previousLcs[j].length > currentLcs[j - 1].length ? previousLcs[j] : currentLcs[j - 1];
      }
    }
  }
  return big.length % 2 === 0 ? evenLcs[small.length] : oddLcs[small.length];
}

```
### Solution 3 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nm) time | O(nm) space
export function longestCommonSubsequence(str1: string, str2: string) {
  const lcs: any[][][] = [];
  for (let i = 0; i < str2.length + 1; i++) {
    const row = [];
    for (let j = 0; j < str1.length + 1; j++) {
      const entry = new Array(4);
      entry[1] = 0;
      row.push(entry);
    }
    lcs.push(row);
  }
  for (let i = 1; i < str2.length + 1; i++) {
    for (let j = 1; j < str1.length + 1; j++) {
      if (str2[i - 1] === str1[j - 1]) {
        lcs[i][j] = [str2[i - 1], lcs[i - 1][j - 1][1] + 1, i - 1, j - 1];
      } else {
        if (lcs[i - 1][j][1] > lcs[i][j - 1][1]) {
          lcs[i][j] = [null, lcs[i - 1][j][1], i - 1, j];
        } else {
          lcs[i][j] = [null, lcs[i][j - 1][1], i, j - 1];
        }
      }
    }
  }
  return buildSequence(lcs);
}

function buildSequence(lcs: any[][][]) {
  const sequence: string[] = [];
  let i = lcs.length - 1;
  let j = lcs[0].length - 1;
  while (i !== 0 && j !== 0) {
    let currentEntry = lcs[i][j];
    if (currentEntry[0]) {
      sequence.unshift(currentEntry[0]);
    }
    i = currentEntry[2];
    j = currentEntry[3];
  }
  return sequence;
}

```
### Solution 4 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(nm) time | O(nm) space
export function longestCommonSubsequence(str1: string, str2: string) {
  const lengths: number[][] = [];
  for (let i = 0; i < str2.length + 1; i++) {
    lengths.push(new Array(str1.length + 1).fill(0));
  }
  for (let i = 1; i < str2.length + 1; i++) {
    for (let j = 1; j < str1.length + 1; j++) {
      if (str2[i - 1] === str1[j - 1]) {
        lengths[i][j] = lengths[i - 1][j - 1] + 1;
      } else {
        lengths[i][j] = Math.max(lengths[i - 1][j], lengths[i][j - 1]);
      }
    }
  }
  return buildSequence(lengths, str1);
}

function buildSequence(lengths: number[][], string: string) {
  const sequence: string[] = [];
  let i = lengths.length - 1;
  let j = lengths[0].length - 1;
  while (i !== 0 && j !== 0) {
    if (lengths[i][j] === lengths[i - 1][j]) {
      i--;
    } else if (lengths[i][j] === lengths[i][j - 1]) {
      j--;
    } else {
      sequence.unshift(string[j - 1]);
      i--;
      j--;
    }
  }
  return sequence;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.longestCommonSubsequence('ZXVVYZW', 'XKYKZPW')).to.deep.equal(['X', 'Y', 'Z', 'W']);
});

```

