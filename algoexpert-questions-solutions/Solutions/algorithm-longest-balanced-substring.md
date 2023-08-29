# Longest Balanced Substring
<div class="html">
<p>
  Write a function that takes in a string made up of parentheses (<span>(</span>
  and <span>)</span>). The function should return an integer representing the
  length of the longest balanced substring with regards to parentheses.
</p>
<p>
  A string is said to be balanced if it has as many opening parentheses as it
  has closing parentheses and if no parenthesis is unmatched. Note that an
  opening parenthesis can't match a closing parenthesis that comes before it,
  and similarly, a closing parenthesis can't match an opening parenthesis that
  comes after it.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">string</span> = "(()))("
</pre>
<h3>Sample Output</h3>
<pre>
4 <span class="CodeEditor-promptComment">// The longest balanced substring is "(())".</span>
</pre>
</div>

Hint 1
<p>
With a brute-force style approach, you can iterate through all substrings of the input string, check if they're balanced, and keep track of the longest balanced one. This approach will require using an auxiliary method to check whether a substring is balanced.
</p>


Hint 2

<p>
A more efficient approach to solving this problem is to iterate through the input string only once, using a stack to track the indices of all unmatched opening parentheses. Whenever a closing parenthesis is encountered, you check if the stack has a corresponding opening-parenthesis index, and you pop that index off the stack if it does. If the stack doesn't have a corresponding opening-parenthesis index, then the closing parenthesis is unmatched, and its own index in the input string denotes the start of a new, potentially balanced substring. With this approach, you'll have to figure out a way to keep track of how long a balanced substring is.
</p>


Hint 3

<p>
The most efficient way to solve this problem is to use only two variables to keep track of the numbers of opening and closing parentheses, respectively, as you traverse the string. Think about how you can use these two pieces of information alone to find the longest balanced substring. Specifically, how do these two pieces of information help you figure out if a substring is balanced, and how can you use them to calculate the length of such a substring?
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
      auto input = "(()))(";
      auto expected = 4;
      auto actual = longestBalancedSubstring(input);
      assert(expected == actual);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <algorithm>
#include <vector>

using namespace std;

bool isBalanced(string str);

// O(n^3) time | O(n) space - where n is the length of the input string
int longestBalancedSubstring(string str) {
  int maxLength = 0;

  for (int i = 0; i < str.size(); i++) {
    for (int j = i + 2; j < str.size() + 1; j++) {
      if (isBalanced(str.substr(i, j - i))) {
        int currentLength = j - i;
        maxLength = max(maxLength, currentLength);
      }
    }
  }
  return maxLength;
}

bool isBalanced(string str) {
  vector<char> openParensStack;

  for (char c : str) {
    if (c == '(') {
      openParensStack.push_back('(');
    } else if (openParensStack.size() > 0) {
      openParensStack.pop_back();
    } else {
      return false;
    }
  }

  return openParensStack.size() == 0;
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <algorithm>
#include <vector>

using namespace std;

// O(n) time | O(n) space - where n is the length of the input string
int longestBalancedSubstring(string str) {
  int maxLength = 0;
  vector<int> idxStack = {-1};

  for (int i = 0; i < str.size(); i++) {
    if (str[i] == '(') {
      idxStack.push_back(i);
    } else {
      idxStack.pop_back();
      if (idxStack.size() == 0) {
        idxStack.push_back(i);
      } else {
        int balancedSubstringStartIdx = idxStack[idxStack.size() - 1];
        int currentLength = i - balancedSubstringStartIdx;
        maxLength = max(maxLength, currentLength);
      }
    }
  }
  return maxLength;
}

```
### Solution 3 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <algorithm>

using namespace std;

// O(n) time | O(1) space - where n is the length of the input string
int longestBalancedSubstring(string str) {
  int maxLength = 0;

  int openingCount = 0;
  int closingCount = 0;

  for (char c : str) {
    if (c == '(') {
      openingCount++;
    } else {
      closingCount++;
    }

    if (openingCount == closingCount) {
      maxLength = max(maxLength, closingCount * 2);
    } else if (closingCount > openingCount) {
      openingCount = 0;
      closingCount = 0;
    }
  }

  openingCount = 0;
  closingCount = 0;

  for (int i = str.length() - 1; i >= 0; i--) {
    char c = str[i];

    if (c == '(') {
      openingCount++;
    } else {
      closingCount++;
    }

    if (openingCount == closingCount) {
      maxLength = max(maxLength, openingCount * 2);
    } else if (openingCount > closingCount) {
      openingCount = 0;
      closingCount = 0;
    }
  }

  return maxLength;
}

```
### Solution 4 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <algorithm>

using namespace std;

int getLongestBalancedInDirection(string str, bool leftToRight);

// O(n) time | O(1) space - where n is the length of the input string
int longestBalancedSubstring(string str) {
  return max(getLongestBalancedInDirection(str, true),
             getLongestBalancedInDirection(str, false));
}

int getLongestBalancedInDirection(string str, bool leftToRight) {
  char openingParens = leftToRight ? '(' : ')';
  int startIdx = leftToRight ? 0 : str.length() - 1;
  int step = leftToRight ? 1 : -1;

  int maxLength = 0;

  int openingCount = 0;
  int closingCount = 0;

  int idx = startIdx;
  while (idx >= 0 && idx < str.length()) {
    char c = str[idx];

    if (c == openingParens) {
      openingCount++;
    } else {
      closingCount++;
    }

    if (openingCount == closingCount) {
      maxLength = max(maxLength, closingCount * 2);
    } else if (closingCount > openingCount) {
      openingCount = 0;
      closingCount = 0;
    }

    idx += step;
  }

  return maxLength;
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      auto input = "(()))(";
      auto expected = 4;
      auto actual = longestBalancedSubstring(input);
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
		var input = "(()))(";
		var expected = 4;
		var actual = new Program().LongestBalancedSubstring(input);
		Utils.AssertTrue(expected == actual);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;


public class Program {
	// O(n^3) time | O(n) space - where n is the length of the input string
	public int LongestBalancedSubstring(string str) {
		int maxLength = 0;

		for (int i=0; i<str.Length; i++) {
			for (int j=i+2; j<str.Length + 1; j+=2) {
				if (isBalanced(str.Substring(i, j-i))) {
					int currentLength = j - i;
					maxLength = Math.Max(maxLength, currentLength);
				}
			}
		}

		return maxLength;
	}

	public bool isBalanced(string str) {
		Stack<char> openParensStack = new Stack<char>();

		for (int i=0; i<str.Length; i++) {
			char c = str[i];
			if (c == '(') {
				openParensStack.Push('(');
			} else if (openParensStack.Count > 0) {
				openParensStack.Pop();
			} else {
				return false;
			}
		}

		return openParensStack.Count == 0;
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;


public class Program {
	// O(n) time | O(n) space - where n is the length of the input string
	public int LongestBalancedSubstring(string str) {
		int maxLength = 0;
		Stack<int> idxStack = new Stack<int>();
		idxStack.Push(-1);

		for (int i=0; i<str.Length; i++) {
			if (str[i] == '(') {
				idxStack.Push(i);
			} else {
				idxStack.Pop();
				if (idxStack.Count == 0) {
					idxStack.Push(i);
				} else {
					int balancedSubstringStartIdx = idxStack.Peek();
					int currentLength = i - balancedSubstringStartIdx;
					maxLength = Math.Max(maxLength, currentLength);
				}
			}
		}

		return maxLength;
	}
}

```
### Solution 3 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {
	// O(n) time | O(1) space - where n is the length of the input string
	public int LongestBalancedSubstring(string str) {
		int maxLength = 0;

		int openingCount = 0;
		int closingCount = 0;

		for (int i=0; i<str.Length; i++) {
			char c = str[i];

			if (c == '(') {
				openingCount += 1;
			} else {
				closingCount += 1;
			}

			if (openingCount == closingCount) {
				maxLength = Math.Max(maxLength, closingCount * 2);
			} else if (closingCount > openingCount) {
				openingCount = 0;
				closingCount = 0;
			}
		}

		openingCount = 0;
		closingCount = 0;

		for (int i=str.Length - 1; i >=0; i--) {
			char c = str[i];

			if (c == '(') {
				openingCount += 1;
			} else {
				closingCount += 1;
			}

			if (openingCount == closingCount) {
				maxLength = Math.Max(maxLength, openingCount * 2);
			} else if (openingCount > closingCount) {
				openingCount = 0;
				closingCount = 0;
			}
		}

		return maxLength;
	}
}
```
### Solution 4 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;


public class Program {
	// O(n) time | O(1) space - where n is the length of the input string
	public int LongestBalancedSubstring(string str) {
		return Math.Max(
			GetLongestBalancedInDirection(str, true),
			GetLongestBalancedInDirection(str, false)
			);
	}

	public int GetLongestBalancedInDirection(string str, bool leftToRight) {
		char openingParens = leftToRight ? '(' : ')';
		int startIdx = leftToRight ? 0 : str.Length - 1;
		int step = leftToRight ? 1 : -1;

		int maxLength = 0;

		int openingCount = 0;
		int closingCount = 0;

		int idx = startIdx;
		while (idx >=0 && idx <str.Length) {
			char c = str[idx];

			if (c == openingParens) {
				openingCount += 1;
			} else {
				closingCount += 1;
			}

			if (openingCount == closingCount) {
				maxLength = Math.Max(maxLength, closingCount * 2);
			} else if (closingCount > openingCount) {
				openingCount = 0;
				closingCount = 0;
			}

			idx += step;
		}

		return maxLength;
	}
}
```
### Unit Tests 1 (csharp)
```csharp
using System;


public class ProgramTest {
	[Test]
	public void TestCase1() {
		var input = "(()))(";
		var expected = 4;
		var actual = new Program().LongestBalancedSubstring(input);
		Utils.AssertTrue(expected == actual);
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
	input := "(()))("
	expected := 4
	actual := LongestBalancedSubstring(input)
	require.Equal(t, expected, actual)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n^3) time | O(n) space - where n is the length of the input string
func LongestBalancedSubstring(str string) int {
	maxLength := 0

	for i := range str {
		for j := i + 2; j < len(str)+1; j++ {
			if isBalanced(str[i:j]) {
				currentLength := j - i
				maxLength = max(maxLength, currentLength)
			}
		}
	}
	return maxLength
}

func isBalanced(str string) bool {
	openParensStack := []rune{}
	for _, char := range str {
		if char == '(' {
			openParensStack = append(openParensStack, char)
		} else if len(openParensStack) > 0 {
			openParensStack = openParensStack[:len(openParensStack)-1]
		} else {
			return false
		}
	}
	return len(openParensStack) == 0
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(n) space - where n is the length of the input string
func LongestBalancedSubstring(str string) int {
	maxLength := 0
	idxStack := []int{-1}

	for i := range str {
		if str[i] == '(' {
			idxStack = append(idxStack, i)
		} else {
			idxStack = idxStack[:len(idxStack)-1]
			if len(idxStack) == 0 {
				idxStack = append(idxStack, i)
			} else {
				balancedSubstringStartIdx := idxStack[len(idxStack)-1]
				currentLength := i - balancedSubstringStartIdx
				maxLength = max(maxLength, currentLength)
			}
		}
	}

	return maxLength
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

```
### Solution 3 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space - where n is the length of the input string
func LongestBalancedSubstring(str string) int {
	maxLength := 0

	openingCount := 0
	closingCount := 0

	for _, char := range str {
		if char == '(' {
			openingCount++
		} else {
			closingCount++
		}

		if openingCount == closingCount {
			maxLength = max(maxLength, closingCount*2)
		} else if closingCount > openingCount {
			openingCount = 0
			closingCount = 0
		}
	}

	openingCount = 0
	closingCount = 0

	for i := len(str) - 1; i >= 0; i-- {
		char := str[i]

		if char == '(' {
			openingCount++
		} else {
			closingCount++
		}

		if openingCount == closingCount {
			maxLength = max(maxLength, openingCount*2)
		} else if openingCount > closingCount {
			openingCount = 0
			closingCount = 0
		}
	}

	return maxLength
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

```
### Solution 4 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(n) time | O(1) space - where n is the length of the input string
func LongestBalancedSubstring(str string) int {
	return max(
		getLongestBalancedInDirection(str, true),
		getLongestBalancedInDirection(str, false),
	)
}

func getLongestBalancedInDirection(str string, leftToRight bool) int {
	openingParens := '('
	startIdx := 0
	step := 1
	if !leftToRight {
		openingParens = ')'
		startIdx = len(str) - 1
		step = -1
	}

	maxLength := 0

	openingCount := 0
	closingCount := 0

	idx := startIdx
	for idx >= 0 && idx < len(str) {
		char := str[idx]

		if rune(char) == openingParens {
			openingCount++
		} else {
			closingCount++
		}

		if openingCount == closingCount {
			maxLength = max(maxLength, closingCount*2)
		} else if closingCount > openingCount {
			openingCount = 0
			closingCount = 0
		}

		idx += step
	}

	return maxLength
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	input := "(()))("
	expected := 4
	actual := LongestBalancedSubstring(input)
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
    var input = "(()))(";
    var expected = 4;
    var actual = new Program().longestBalancedSubstring(input);
    Utils.assertTrue(expected == actual);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n^3) time | O(n) space - where n is the length of the input string
  public int longestBalancedSubstring(String string) {
    int maxLength = 0;

    for (int i = 0; i < string.length(); i++) {
      for (int j = i + 2; j < string.length() + 1; j += 2) {
        if (isBalanced(string.substring(i, j))) {
          int currentLength = j - i;
          maxLength = Math.max(maxLength, currentLength);
        }
      }
    }

    return maxLength;
  }

  public boolean isBalanced(String string) {
    Stack<Character> openParensStack = new Stack();

    for (int i = 0; i < string.length(); i++) {
      char c = string.charAt(i);
      if (c == '(') {
        openParensStack.push('(');
      } else if (openParensStack.size() > 0) {
        openParensStack.pop();
      } else {
        return false;
      }
    }

    return openParensStack.size() == 0;
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(n) space - where n is the length of the input string
  public int longestBalancedSubstring(String string) {
    int maxLength = 0;
    Stack<Integer> idxStack = new Stack();
    idxStack.push(-1);

    for (int i = 0; i < string.length(); i++) {
      if (string.charAt(i) == '(') {
        idxStack.push(i);
      } else {
        idxStack.pop();
        if (idxStack.size() == 0) {
          idxStack.push(i);
        } else {
          int balancedSubstringStartIdx = idxStack.peek();
          int currentLength = i - balancedSubstringStartIdx;
          maxLength = Math.max(maxLength, currentLength);
        }
      }
    }

    return maxLength;
  }
}

```
### Solution 3 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(1) space - where n is the length of the input string
  public int longestBalancedSubstring(String string) {
    int maxLength = 0;

    int openingCount = 0;
    int closingCount = 0;

    for (int i = 0; i < string.length(); i++) {
      char c = string.charAt(i);

      if (c == '(') {
        openingCount += 1;
      } else {
        closingCount += 1;
      }

      if (openingCount == closingCount) {
        maxLength = Math.max(maxLength, closingCount * 2);
      } else if (closingCount > openingCount) {
        openingCount = 0;
        closingCount = 0;
      }
    }

    openingCount = 0;
    closingCount = 0;

    for (int i = string.length() - 1; i >= 0; i--) {
      char c = string.charAt(i);

      if (c == '(') {
        openingCount += 1;
      } else {
        closingCount += 1;
      }

      if (openingCount == closingCount) {
        maxLength = Math.max(maxLength, openingCount * 2);
      } else if (openingCount > closingCount) {
        openingCount = 0;
        closingCount = 0;
      }
    }

    return maxLength;
  }
}

```
### Solution 4 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(n) time | O(1) space - where n is the length of the input string
  public int longestBalancedSubstring(String string) {
    return Math.max(
        getLongestBalancedInDirection(string, true), getLongestBalancedInDirection(string, false));
  }

  public int getLongestBalancedInDirection(String string, Boolean leftToRight) {
    char openingParens = leftToRight ? '(' : ')';
    int startIdx = leftToRight ? 0 : string.length() - 1;
    int step = leftToRight ? 1 : -1;

    int maxLength = 0;

    int openingCount = 0;
    int closingCount = 0;

    int idx = startIdx;
    while (idx >= 0 && idx < string.length()) {
      char c = string.charAt(idx);

      if (c == openingParens) {
        openingCount += 1;
      } else {
        closingCount += 1;
      }

      if (openingCount == closingCount) {
        maxLength = Math.max(maxLength, closingCount * 2);
      } else if (closingCount > openingCount) {
        openingCount = 0;
        closingCount = 0;
      }

      idx += step;
    }

    return maxLength;
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {
  @Test
  public void TestCase1() {
    var input = "(()))(";
    var expected = 4;
    var actual = new Program().longestBalancedSubstring(input);
    Utils.assertTrue(expected == actual);
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
  const string = '(()))(';
  const expected = 4;
  const actual = program.longestBalancedSubstring(string);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^3) time | O(n) space - where n is the length of the input string
function longestBalancedSubstring(string) {
  let maxLength = 0;

  for (let i = 0; i < string.length; i++) {
    for (let j = i + 2; j < string.length + 1; j += 2) {
      if (isBalanced(string.slice(i, j))) {
        const currentLength = j - i;
        maxLength = Math.max(maxLength, currentLength);
      }
    }
  }

  return maxLength;
}

function isBalanced(string) {
  const openParensStack = [];

  for (const char of string) {
    if (char === '(') {
      openParensStack.push('(');
    } else if (openParensStack.length > 0) {
      openParensStack.pop();
    } else {
      return false;
    }
  }

  return openParensStack.length === 0;
}

exports.longestBalancedSubstring = longestBalancedSubstring;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input string
function longestBalancedSubstring(string) {
  let maxLength = 0;
  const idxStack = [];
  idxStack.push(-1);

  for (let i = 0; i < string.length; i++) {
    if (string[i] === '(') {
      idxStack.push(i);
    } else {
      idxStack.pop();
      if (idxStack.length === 0) {
        idxStack.push(i);
      } else {
        const balancedSubstringStartIdx = idxStack[idxStack.length - 1];
        const currentLength = i - balancedSubstringStartIdx;
        maxLength = Math.max(maxLength, currentLength);
      }
    }
  }

  return maxLength;
}

exports.longestBalancedSubstring = longestBalancedSubstring;

```
### Solution 3 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the input string
function longestBalancedSubstring(string) {
  let maxLength = 0;

  let openingCount = 0;
  let closingCount = 0;

  for (const char of string) {
    if (char === '(') {
      openingCount++;
    } else {
      closingCount++;
    }

    if (openingCount === closingCount) {
      maxLength = Math.max(maxLength, closingCount * 2);
    } else if (closingCount > openingCount) {
      openingCount = 0;
      closingCount = 0;
    }
  }

  openingCount = 0;
  closingCount = 0;

  for (let i = string.length - 1; i >= 0; i--) {
    const char = string[i];

    if (char === '(') {
      openingCount++;
    } else {
      closingCount++;
    }

    if (openingCount === closingCount) {
      maxLength = Math.max(maxLength, openingCount * 2);
    } else if (openingCount > closingCount) {
      openingCount = 0;
      closingCount = 0;
    }
  }

  return maxLength;
}

exports.longestBalancedSubstring = longestBalancedSubstring;

```
### Solution 4 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the input string
function longestBalancedSubstring(string) {
  return Math.max(getLongestBalancedInDirection(string, true), getLongestBalancedInDirection(string, false));
}

function getLongestBalancedInDirection(string, leftToRight) {
  const openingParens = leftToRight ? '(' : ')';
  const startIdx = leftToRight ? 0 : string.length - 1;
  const step = leftToRight ? 1 : -1;

  let maxLength = 0;

  let openingCount = 0;
  let closingCount = 0;

  let idx = startIdx;
  while (idx >= 0 && idx < string.length) {
    const char = string[idx];

    if (char === openingParens) {
      openingCount++;
    } else {
      closingCount++;
    }

    if (openingCount === closingCount) {
      maxLength = Math.max(maxLength, closingCount * 2);
    } else if (closingCount > openingCount) {
      openingCount = 0;
      closingCount = 0;
    }

    idx += step;
  }

  return maxLength;
}

exports.longestBalancedSubstring = longestBalancedSubstring;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const string = '(()))(';
  const expected = 4;
  const actual = program.longestBalancedSubstring(string);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.longestBalancedSubstring

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = "(()))("
        val expected = 4
        val output = longestBalancedSubstring(input)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import java.util.Stack
import kotlin.math.max

// O(n^3) time | O(n) space - where n is the length of the input string
fun longestBalancedSubstring(string: String): Int {
    var maxLength = 0

    for (i in 0 until string.length) {
        for (j in i + 2 until string.length + 1 step 2) {
            if (isBalanced(string.substring(i, j))) {
                val currentLength = j - i
                maxLength = max(maxLength, currentLength)
            }
        }
    }

    return maxLength
}

fun isBalanced(string: String): Boolean {
    val openParensStack = Stack<Char>()

    for (char in string) {
        if (char == '(') {
            openParensStack.add(char)
        } else if (openParensStack.size > 0) {
            openParensStack.pop()
        } else {
            return false
        }
    }

    return openParensStack.size == 0
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import java.util.Stack
import kotlin.math.max

// O(n) time | O(n) space - where n is the length of the input string
fun longestBalancedSubstring(string: String): Int {
    var maxLength = 0
    val idxStack = Stack<Int>()
    idxStack.add(-1)

    for (i in 0 until string.length) {
        if (string[i] == '(') {
            idxStack.add(i)
        } else {
            idxStack.pop()
            if (idxStack.size == 0) {
                idxStack.add(i)
            } else {
                val balancedSubstringStartIdx = idxStack[idxStack.size - 1]
                val currentLength = i - balancedSubstringStartIdx
                maxLength = max(maxLength, currentLength)
            }
        }
    }

    return maxLength
}

```
### Solution 3 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(n) time | O(1) space - where n is the length of the input string
fun longestBalancedSubstring(string: String): Int {
    var maxLength = 0

    var openingCount = 0
    var closingCount = 0

    for (char in string) {
        if (char == '(') {
            openingCount++
        } else {
            closingCount++
        }

        if (openingCount == closingCount) {
            maxLength = max(maxLength, closingCount * 2)
        } else if (closingCount > openingCount) {
            openingCount = 0
            closingCount = 0
        }
    }

    openingCount = 0
    closingCount = 0

    for (i in string.length - 1 downTo 0) {
        val char = string[i]

        if (char == '(') {
            openingCount++
        } else {
            closingCount++
        }

        if (openingCount == closingCount) {
            maxLength = max(maxLength, openingCount * 2)
        } else if (openingCount > closingCount) {
            openingCount = 0
            closingCount = 0
        }
    }

    return maxLength
}

```
### Solution 4 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(n) time | O(1) space - where n is the length of the input string
fun longestBalancedSubstring(string: String): Int {
    return max(
        getLongestBalancedInDirection(string, true),
        getLongestBalancedInDirection(string, false)
    )
}

fun getLongestBalancedInDirection(string: String, leftToRight: Boolean): Int {
    val openingParens = if (leftToRight) '(' else ')'
    val startIdx = if (leftToRight) 0 else string.length - 1
    val step = if (leftToRight) 1 else -1

    var maxLength = 0

    var openingCount = 0
    var closingCount = 0

    var idx = startIdx
    while (idx >= 0 && idx < string.length) {
        val char = string[idx]

        if (char == openingParens) {
            openingCount++
        } else {
            closingCount++
        }

        if (openingCount == closingCount) {
            maxLength = max(maxLength, closingCount * 2)
        } else if (closingCount > openingCount) {
            openingCount = 0
            closingCount = 0
        }

        idx += step
    }

    return maxLength
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.longestBalancedSubstring

class ProgramTest {
    @Test
    fun TestCase1() {
        val input = "(()))("
        val expected = 4
        val output = longestBalancedSubstring(input)
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
      var input = "(()))("
      var expected = 4
      var actual = Program().longestBalancedSubstring(input)
      try assertEqual(expected, actual)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n^3) time | O(n) space - where n is the length of the input string
  func longestBalancedSubstring(_ string: String) -> Int {
    var maxLength = 0

    for i in 0 ..< string.count {
      for j in stride(from: i + 2, through: string.count, by: 1) {
        let start = string.index(string.startIndex, offsetBy: i)
        let end = string.index(string.startIndex, offsetBy: j)
        let substring = string[start ..< end]
        if isBalanced(String(substring)) {
          let currentLength = j - i
          maxLength = max(maxLength, currentLength)
        }
      }
    }
    return maxLength
  }

  func isBalanced(_ string: String) -> Bool {
    var openParensStack = [Character]()
    for char in string {
      if char == "(" {
        openParensStack.append(char)
      } else if openParensStack.count > 0 {
        openParensStack.removeLast()
      } else {
        return false
      }
    }
    return openParensStack.count == 0
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the length of the input string
  func longestBalancedSubstring(_ string: String) -> Int {
    var maxLength = 0
    var idxStack = [-1]

    let indexedString = Array(string)
    for i in 0 ..< string.count {
      if indexedString[i] == "(" {
        idxStack.append(i)
      } else {
        idxStack.removeLast()
        if idxStack.count == 0 {
          idxStack.append(i)
        } else {
          let balancedSubstringStartIdx = idxStack[idxStack.count - 1]
          let currentLength = i - balancedSubstringStartIdx
          maxLength = max(maxLength, currentLength)
        }
      }
    }
    return maxLength
  }
}

```
### Solution 3 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the length of the input string
  func longestBalancedSubstring(_ string: String) -> Int {
    var maxLength = 0

    var openingCount = 0
    var closingCount = 0

    for char in string {
      if char == "(" {
        openingCount += 1
      } else {
        closingCount += 1
      }

      if openingCount == closingCount {
        maxLength = max(maxLength, closingCount * 2)
      } else if closingCount > openingCount {
        openingCount = 0
        closingCount = 0
      }
    }

    openingCount = 0
    closingCount = 0

    let indexedString = Array(string)
    for idx in stride(from: string.count - 1, through: 0, by: -1) {
      let char = indexedString[idx]

      if char == "(" {
        openingCount += 1
      } else {
        closingCount += 1
      }

      if openingCount == closingCount {
        maxLength = max(maxLength, openingCount * 2)
      } else if openingCount > closingCount {
        openingCount = 0
        closingCount = 0
      }
    }

    return maxLength
  }
}

```
### Solution 4 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(n) time | O(n) space - where n is the length of the input string
  func longestBalancedSubstring(_ string: String) -> Int {
    max(
      getLongestBalancedInDirection(string, true),
      getLongestBalancedInDirection(string, false)
    )
  }

  func getLongestBalancedInDirection(_ string: String, _ leftToRight: Bool) -> Int {
    var openingParens = "("
    var startIdx = 0
    var step = 1
    if !leftToRight {
      openingParens = ")"
      startIdx = string.count - 1
      step = -1
    }
    let openingParensIdx = openingParens.index(string.startIndex, offsetBy: 0)
    let openingParensChar = openingParens[openingParensIdx]

    var maxLength = 0

    var openingCount = 0
    var closingCount = 0

    var idx = startIdx
    let indexedString = Array(string)
    while idx >= 0, idx < string.count {
      let char = indexedString[idx]

      if char == openingParensChar {
        openingCount += 1
      } else {
        closingCount += 1
      }

      if openingCount == closingCount {
        maxLength = max(maxLength, closingCount * 2)
      } else if closingCount > openingCount {
        openingCount = 0
        closingCount = 0
      }

      idx += step
    }

    return maxLength
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      var input = "(()))("
      var expected = 4
      var actual = Program().longestBalancedSubstring(input)
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
        string = "(()))("
        expected = 4
        actual = program.longestBalancedSubstring(string)
        self.assertEqual(actual, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n^3) time | O(n) space - where n is the length of the input string
def longestBalancedSubstring(string):
    maxLength = 0

    for i in range(len(string)):
        for j in range(i + 2, len(string) + 1, 2):
            if isBalanced(string[i:j]):
                currentLength = j - i
                maxLength = max(maxLength, currentLength)

    return maxLength


def isBalanced(string):
    openParensStack = []

    for char in string:
        if char == "(":
            openParensStack.append("(")
        elif len(openParensStack) > 0:
            openParensStack.pop()
        else:
            return False

    return len(openParensStack) == 0

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(n) space - where n is the length of the input string
def longestBalancedSubstring(string):
    maxLength = 0
    idxStack = []
    idxStack.append(-1)

    for i in range(len(string)):
        if string[i] == "(":
            idxStack.append(i)
        else:
            idxStack.pop()
            if len(idxStack) == 0:
                idxStack.append(i)
            else:
                balancedSubstringStartIdx = idxStack[len(idxStack) - 1]
                currentLength = i - balancedSubstringStartIdx
                maxLength = max(maxLength, currentLength)

    return maxLength

```
### Solution 3 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space - where n is the length of the input string
def longestBalancedSubstring(string):
    maxLength = 0

    openingCount = 0
    closingCount = 0

    for char in string:
        if char == "(":
            openingCount += 1
        else:
            closingCount += 1

        if openingCount == closingCount:
            maxLength = max(maxLength, closingCount * 2)
        elif closingCount > openingCount:
            openingCount = 0
            closingCount = 0

    openingCount = 0
    closingCount = 0

    for i in reversed(range(len(string))):
        char = string[i]

        if char == "(":
            openingCount += 1
        else:
            closingCount += 1

        if openingCount == closingCount:
            maxLength = max(maxLength, openingCount * 2)
        elif openingCount > closingCount:
            openingCount = 0
            closingCount = 0

    return maxLength

```
### Solution 4 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(n) time | O(1) space - where n is the length of the input string
def longestBalancedSubstring(string):
    return max(
        getLongestBalancedInDirection(string, True),
        getLongestBalancedInDirection(string, False),
    )


def getLongestBalancedInDirection(string, leftToRight):
    openingParens = "(" if leftToRight else ")"
    startIdx = 0 if leftToRight else len(string) - 1
    step = 1 if leftToRight else -1

    maxLength = 0

    openingCount = 0
    closingCount = 0

    idx = startIdx
    while idx >= 0 and idx < len(string):
        char = string[idx]

        if char == openingParens:
            openingCount += 1
        else:
            closingCount += 1

        if openingCount == closingCount:
            maxLength = max(maxLength, closingCount * 2)
        elif closingCount > openingCount:
            openingCount = 0
            closingCount = 0

        idx += step

    return maxLength

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        string = "(()))("
        expected = 4
        actual = program.longestBalancedSubstring(string)
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
  const string = '(()))(';
  const expected = 4;
  const actual = program.longestBalancedSubstring(string);
  chai.expect(actual).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n^3) time | O(n) space - where n is the length of the input string
export function longestBalancedSubstring(string: string) {
  let maxLength = 0;

  for (let i = 0; i < string.length; i++) {
    for (let j = i + 2; j < string.length + 1; j += 2) {
      if (isBalanced(string.slice(i, j))) {
        const currentLength = j - i;
        maxLength = Math.max(maxLength, currentLength);
      }
    }
  }

  return maxLength;
}

function isBalanced(string: string) {
  const openParensStack: string[] = [];

  for (const char of string) {
    if (char === '(') {
      openParensStack.push('(');
    } else if (openParensStack.length > 0) {
      openParensStack.pop();
    } else {
      return false;
    }
  }

  return openParensStack.length === 0;
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(n) space - where n is the length of the input string
export function longestBalancedSubstring(string: string) {
  let maxLength = 0;
  const idxStack: number[] = [];
  idxStack.push(-1);

  for (let i = 0; i < string.length; i++) {
    if (string[i] === '(') {
      idxStack.push(i);
    } else {
      idxStack.pop();
      if (idxStack.length === 0) {
        idxStack.push(i);
      } else {
        const balancedSubstringStartIdx = idxStack[idxStack.length - 1];
        const currentLength = i - balancedSubstringStartIdx;
        maxLength = Math.max(maxLength, currentLength);
      }
    }
  }

  return maxLength;
}

```
### Solution 3 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the input string
export function longestBalancedSubstring(string: string) {
  let maxLength = 0;

  let openingCount = 0;
  let closingCount = 0;

  for (const char of string) {
    if (char === '(') {
      openingCount++;
    } else {
      closingCount++;
    }

    if (openingCount === closingCount) {
      maxLength = Math.max(maxLength, closingCount * 2);
    } else if (closingCount > openingCount) {
      openingCount = 0;
      closingCount = 0;
    }
  }

  openingCount = 0;
  closingCount = 0;

  for (let i = string.length - 1; i >= 0; i--) {
    const char = string[i];

    if (char === '(') {
      openingCount++;
    } else {
      closingCount++;
    }

    if (openingCount === closingCount) {
      maxLength = Math.max(maxLength, openingCount * 2);
    } else if (openingCount > closingCount) {
      openingCount = 0;
      closingCount = 0;
    }
  }

  return maxLength;
}

```
### Solution 4 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(n) time | O(1) space - where n is the length of the input string
export function longestBalancedSubstring(string: string) {
  return Math.max(getLongestBalancedInDirection(string, true), getLongestBalancedInDirection(string, false));
}

function getLongestBalancedInDirection(string: string, leftToRight: boolean) {
  const openingParens = leftToRight ? '(' : ')';
  const startIdx = leftToRight ? 0 : string.length - 1;
  const step = leftToRight ? 1 : -1;

  let maxLength = 0;

  let openingCount = 0;
  let closingCount = 0;

  let idx = startIdx;
  while (idx >= 0 && idx < string.length) {
    const char = string[idx];

    if (char === openingParens) {
      openingCount++;
    } else {
      closingCount++;
    }

    if (openingCount === closingCount) {
      maxLength = Math.max(maxLength, closingCount * 2);
    } else if (closingCount > openingCount) {
      openingCount = 0;
      closingCount = 0;
    }

    idx += step;
  }

  return maxLength;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const string = '(()))(';
  const expected = 4;
  const actual = program.longestBalancedSubstring(string);
  chai.expect(actual).to.deep.equal(expected);
});

```

