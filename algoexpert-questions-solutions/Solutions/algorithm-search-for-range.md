# Search For Range
<div class="html">
<p>
  Write a function that takes in a sorted array of integers as well as a target
  integer. The function should use a variation of the Binary Search algorithm to
  find a range of indices in between which the target number is contained in the
  array and should return this range in the form of an array.
</p>
<p>
  The first number in the output array should represent the first index at which
  the target number is located, while the second number should represent the
  last index at which the target number is located. The function should return
  <span>[-1, -1]</span> if the integer isn't contained in the array.
</p>
<p>
  If you're unfamiliar with Binary Search, we recommend watching the Conceptual
  Overview section of the Binary Search question's video explanation before
  starting to code.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">array</span> = [0, 1, 21, 33, 45, 45, 45, 45, 45, 45, 61, 71, 73]
<span class="CodeEditor-promptParameter">target</span> = 45
</pre>
<h3>Sample Output</h3>
<pre>
[4, 9]
</pre>
</div>

Hint 1
<p>
The Binary Search algorithm involves a left pointer and a right pointer and using those pointers to find the middle number in an array in an effort to find a target number. Unlike with normal Binary Search however, here you cannot simply find the middle number of the array, compare it to the target, and stop once you find it because you are looking for a range rather than a single number. Instead, realize that whenever you find the middle number in the array, the following two scenarios are possible: either the middle number is not equal to the target number, in which case you must proceed with normal Binary Search, or the middle number is equal to the target number, in which case you must figure out if this middle number is an extremity of the range or not.
</p>


Hint 2

<p>
Try applying an altered version of Binary Search twice: once to find the left extremity of the range and once to find the right extremity of the range. How can you accomplish this? What are the time complexity implications of this approach?
</p>


Hint 3

<p>
Can you implement this algorithm iteratively? Are there any advantages to doing so?
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
      vector<int> expected{4, 9};
      assert(searchForRange({0, 1, 21, 33, 45, 45, 45, 45, 45, 45, 61, 71, 73},
                            45) == expected);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

vector<int> searchForRange(vector<int> array, int target);
void alteredBinarySearch(vector<int> array, int target, int left, int right,
                         vector<int> *finalRange, bool goLeft);

// O(log(n)) time | O(log(n)) space
vector<int> searchForRange(vector<int> array, int target) {
  vector<int> finalRange{-1, -1};
  alteredBinarySearch(array, target, 0, array.size() - 1, &finalRange, true);
  alteredBinarySearch(array, target, 0, array.size() - 1, &finalRange, false);
  return finalRange;
}

void alteredBinarySearch(vector<int> array, int target, int left, int right,
                         vector<int> *finalRange, bool goLeft) {
  if (left > right) {
    return;
  }
  int mid = (left + right) / 2;
  if (array[mid] < target) {
    alteredBinarySearch(array, target, mid + 1, right, finalRange, goLeft);
  } else if (array[mid] > target) {
    alteredBinarySearch(array, target, left, mid - 1, finalRange, goLeft);
  } else {
    if (goLeft) {
      if (mid == 0 || array[mid - 1] != target) {
        finalRange->at(0) = mid;
      } else {
        alteredBinarySearch(array, target, left, mid - 1, finalRange, goLeft);
      }
    } else {
      if (mid == array.size() - 1 || array[mid + 1] != target) {
        finalRange->at(1) = mid;
      } else {
        alteredBinarySearch(array, target, mid + 1, right, finalRange, goLeft);
      }
    }
  }
}

```
### Solution 2 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
using namespace std;

vector<int> searchForRange(vector<int> array, int target);
void alteredBinarySearch(vector<int> array, int target, int left, int right,
                         vector<int> *finalRange, bool goLeft);

// O(log(n)) time | O(1) space
vector<int> searchForRange(vector<int> array, int target) {
  vector<int> finalRange{-1, -1};
  alteredBinarySearch(array, target, 0, array.size() - 1, &finalRange, true);
  alteredBinarySearch(array, target, 0, array.size() - 1, &finalRange, false);
  return finalRange;
}

void alteredBinarySearch(vector<int> array, int target, int left, int right,
                         vector<int> *finalRange, bool goLeft) {
  while (left <= right) {
    int mid = (left + right) / 2;
    if (array[mid] < target) {
      left = mid + 1;
    } else if (array[mid] > target) {
      right = mid - 1;
    } else {
      if (goLeft) {
        if (mid == 0 || array[mid - 1] != target) {
          finalRange->at(0) = mid;
          return;
        } else {
          right = mid - 1;
        }
      } else {
        if (mid == array.size() - 1 || array[mid + 1] != target) {
          finalRange->at(1) = mid;
          return;
        } else {
          left = mid + 1;
        }
      }
    }
  }
}

```
### Unit Tests 1 (cpp)
```cpp
class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<int> expected{4, 9};
      assert(searchForRange({0, 1, 21, 33, 45, 45, 45, 45, 45, 45, 61, 71, 73},
                            45) == expected);
    });
  }
};

```
### Sandbox Code (csharp)
```csharp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] expected = {4, 9};
		int[] output = Program.SearchForRange(new int[] {0, 1, 21, 33, 45, 45, 45, 45, 45,
		                                                 45, 61, 71, 73}, 45);
		Utils.AssertTrue(compare(output, expected));
	}

	public bool compare(int[] arr1, int[] arr2) {
		if (arr1.Length != arr2.Length) {
			return false;
		}
		for (int i = 0; i < arr1.Length; i++) {
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

public class Program {
	// O(log(n)) time | O(log(n)) space
	public static int[] SearchForRange(int[] array, int target) {
		int[] finalRange = {-1, -1};
		alteredBinarySearch(array, target, 0, array.Length - 1, finalRange, true);
		alteredBinarySearch(array, target, 0, array.Length - 1, finalRange, false);
		return finalRange;
	}

	public static void alteredBinarySearch(int[] array, int target, int left, int right,
	  int[] finalRange, bool goLeft) {
		if (left > right) {
			return;
		}
		int mid = (left + right) / 2;
		if (array[mid] < target) {
			alteredBinarySearch(array, target, mid + 1, right, finalRange, goLeft);
		} else if (array[mid] > target) {
			alteredBinarySearch(array, target, left, mid - 1, finalRange, goLeft);
		} else {
			if (goLeft) {
				if (mid == 0 || array[mid - 1] != target) {
					finalRange[0] = mid;
				} else {
					alteredBinarySearch(array, target, left, mid - 1,
					  finalRange, goLeft);
				}
			} else {
				if (mid == array.Length - 1 || array[mid + 1] != target) {
					finalRange[1] = mid;
				} else {
					alteredBinarySearch(array, target, mid + 1, right,
					  finalRange, goLeft);
				}
			}
		}
	}
}

```
### Solution 2 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

public class Program {
	// O(log(n)) time | O(1) space
	public static int[] SearchForRange(int[] array, int target) {
		int[] finalRange = {-1, -1};
		alteredBinarySearch(array, target, 0, array.Length - 1, finalRange, true);
		alteredBinarySearch(array, target, 0, array.Length - 1, finalRange, false);
		return finalRange;
	}

	public static void alteredBinarySearch(int[] array, int target, int left, int right,
	  int[] finalRange, bool goLeft) {
		while (left <= right) {
			int mid = (left + right) / 2;
			if (array[mid] < target) {
				left = mid + 1;
			} else if (array[mid] > target) {
				right = mid - 1;
			} else {
				if (goLeft) {
					if (mid == 0 || array[mid - 1] != target) {
						finalRange[0] = mid;
						return;
					} else {
						right = mid - 1;
					}
				} else {
					if (mid == array.Length - 1 || array[mid + 1] != target) {
						finalRange[1] = mid;
						return;
					} else {
						left = mid + 1;
					}
				}
			}
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
public class ProgramTest {
	[Test]
	public void TestCase1() {
		int[] expected = {4, 9};
		int[] output = Program.SearchForRange(new int[] {0, 1, 21, 33, 45, 45, 45, 45, 45,
		                                                 45, 61, 71, 73}, 45);
		Utils.AssertTrue(compare(output, expected));
	}

	public bool compare(int[] arr1, int[] arr2) {
		if (arr1.Length != arr2.Length) {
			return false;
		}
		for (int i = 0; i < arr1.Length; i++) {
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
	expected := []int{4, 9}
	output := SearchForRange([]int{0, 1, 21, 33, 45, 45, 45, 45, 45, 45, 61, 71, 73}, 45)
	require.Equal(t, expected, output)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(log(n)) time | O(log(n)) space
func SearchForRange(array []int, target int) []int {
	finalRange := []int{-1, -1}
	alteredBinarySearch(array, target, 0, len(array)-1, finalRange, true)
	alteredBinarySearch(array, target, 0, len(array)-1, finalRange, false)
	return finalRange
}

func alteredBinarySearch(array []int, target, left, right int, finalRange []int, goLeft bool) {
	if left > right {
		return
	}
	mid := (left + right) / 2
	if array[mid] < target {
		alteredBinarySearch(array, target, mid+1, right, finalRange, goLeft)
	} else if array[mid] > target {
		alteredBinarySearch(array, target, left, mid-1, finalRange, goLeft)
	} else {
		if goLeft {
			if mid == 0 || array[mid-1] != target {
				finalRange[0] = mid
			} else {
				alteredBinarySearch(array, target, left, mid-1, finalRange, goLeft)
			}
		} else {
			if mid == len(array)-1 || array[mid+1] != target {
				finalRange[1] = mid
			} else {
				alteredBinarySearch(array, target, mid+1, right, finalRange, goLeft)
			}
		}
	}
}

```
### Solution 2 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

// O(log(n)) time | O(1) space
func SearchForRange(array []int, target int) []int {
	finalRange := []int{-1, -1}
	alteredBinarySearch(array, target, 0, len(array)-1, finalRange, true)
	alteredBinarySearch(array, target, 0, len(array)-1, finalRange, false)
	return finalRange
}

func alteredBinarySearch(array []int, target, left, right int, finalRange []int, goLeft bool) {
	for left <= right {
		mid := (left + right) / 2
		if array[mid] < target {
			left = mid + 1
		} else if array[mid] > target {
			right = mid - 1
		} else {
			if goLeft {
				if mid == 0 || array[mid-1] != target {
					finalRange[0] = mid
					return
				} else {
					right = mid - 1
				}
			} else {
				if mid == len(array)-1 || array[mid+1] != target {
					finalRange[1] = mid
					return
				} else {
					left = mid + 1
				}
			}
		}
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
	expected := []int{4, 9}
	output := SearchForRange([]int{0, 1, 21, 33, 45, 45, 45, 45, 45, 45, 61, 71, 73}, 45)
	require.Equal(t, expected, output)
}

```
### Sandbox Code (java)
```java
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

class ProgramTest {
  @Test
  public void TestCase1() {
    int[] expected = {4, 9};
    int[] output =
        Program.searchForRange(new int[] {0, 1, 21, 33, 45, 45, 45, 45, 45, 45, 61, 71, 73}, 45);
    Utils.assertTrue(compare(output, expected));
  }

  public boolean compare(int[] arr1, int[] arr2) {
    if (arr1.length != arr2.length) {
      return false;
    }
    for (int i = 0; i < arr1.length; i++) {
      if (arr1[i] != arr2[i]) {
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

class Program {
  // O(log(n)) time | O(log(n)) space
  public static int[] searchForRange(int[] array, int target) {
    int[] finalRange = {-1, -1};
    alteredBinarySearch(array, target, 0, array.length - 1, finalRange, true);
    alteredBinarySearch(array, target, 0, array.length - 1, finalRange, false);
    return finalRange;
  }

  public static void alteredBinarySearch(
      int[] array, int target, int left, int right, int[] finalRange, boolean goLeft) {
    if (left > right) {
      return;
    }
    int mid = (left + right) / 2;
    if (array[mid] < target) {
      alteredBinarySearch(array, target, mid + 1, right, finalRange, goLeft);
    } else if (array[mid] > target) {
      alteredBinarySearch(array, target, left, mid - 1, finalRange, goLeft);
    } else {
      if (goLeft) {
        if (mid == 0 || array[mid - 1] != target) {
          finalRange[0] = mid;
        } else {
          alteredBinarySearch(array, target, left, mid - 1, finalRange, goLeft);
        }
      } else {
        if (mid == array.length - 1 || array[mid + 1] != target) {
          finalRange[1] = mid;
        } else {
          alteredBinarySearch(array, target, mid + 1, right, finalRange, goLeft);
        }
      }
    }
  }
}

```
### Solution 2 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(log(n)) time | O(1) space
  public static int[] searchForRange(int[] array, int target) {
    int[] finalRange = {-1, -1};
    alteredBinarySearch(array, target, 0, array.length - 1, finalRange, true);
    alteredBinarySearch(array, target, 0, array.length - 1, finalRange, false);
    return finalRange;
  }

  public static void alteredBinarySearch(
      int[] array, int target, int left, int right, int[] finalRange, boolean goLeft) {
    while (left <= right) {
      int mid = (left + right) / 2;
      if (array[mid] < target) {
        left = mid + 1;
      } else if (array[mid] > target) {
        right = mid - 1;
      } else {
        if (goLeft) {
          if (mid == 0 || array[mid - 1] != target) {
            finalRange[0] = mid;
            return;
          } else {
            right = mid - 1;
          }
        } else {
          if (mid == array.length - 1 || array[mid + 1] != target) {
            finalRange[1] = mid;
            return;
          } else {
            left = mid + 1;
          }
        }
      }
    }
  }
}

```
### Unit Tests 1 (java)
```java
class ProgramTest {
  @Test
  public void TestCase1() {
    int[] expected = {4, 9};
    int[] output =
        Program.searchForRange(new int[] {0, 1, 21, 33, 45, 45, 45, 45, 45, 45, 61, 71, 73}, 45);
    Utils.assertTrue(compare(output, expected));
  }

  public boolean compare(int[] arr1, int[] arr2) {
    if (arr1.length != arr2.length) {
      return false;
    }
    for (int i = 0; i < arr1.length; i++) {
      if (arr1[i] != arr2[i]) {
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
  chai.expect(program.searchForRange([0, 1, 21, 33, 45, 45, 45, 45, 45, 45, 61, 71, 73], 45)).to.deep.equal([4, 9]);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(log(n)) time | O(log(n)) space
function searchForRange(array, target) {
  const finalRange = [-1, -1];
  alteredBinarySearch(array, target, 0, array.length - 1, finalRange, true);
  alteredBinarySearch(array, target, 0, array.length - 1, finalRange, false);
  return finalRange;
}

function alteredBinarySearch(array, target, left, right, finalRange, goLeft) {
  if (left > right) return;
  const mid = Math.floor((left + right) / 2);
  if (array[mid] < target) {
    alteredBinarySearch(array, target, mid + 1, right, finalRange, goLeft);
  } else if (array[mid] > target) {
    alteredBinarySearch(array, target, left, mid - 1, finalRange, goLeft);
  } else {
    if (goLeft) {
      if (mid === 0 || array[mid - 1] !== target) {
        finalRange[0] = mid;
      } else {
        alteredBinarySearch(array, target, left, mid - 1, finalRange, goLeft);
      }
    } else {
      if (mid === array.length - 1 || array[mid + 1] !== target) {
        finalRange[1] = mid;
      } else {
        alteredBinarySearch(array, target, mid + 1, right, finalRange, goLeft);
      }
    }
  }
}

exports.searchForRange = searchForRange;

```
### Solution 2 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(log(n)) time | O(1) space
function searchForRange(array, target) {
  const finalRange = [-1, -1];
  alteredBinarySearch(array, target, 0, array.length - 1, finalRange, true);
  alteredBinarySearch(array, target, 0, array.length - 1, finalRange, false);
  return finalRange;
}

function alteredBinarySearch(array, target, left, right, finalRange, goLeft) {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (array[mid] < target) {
      left = mid + 1;
    } else if (array[mid] > target) {
      right = mid - 1;
    } else {
      if (goLeft) {
        if (mid === 0 || array[mid - 1] !== target) {
          finalRange[0] = mid;
          return;
        } else {
          right = mid - 1;
        }
      } else {
        if (mid === array.length - 1 || array[mid + 1] !== target) {
          finalRange[1] = mid;
          return;
        } else {
          left = mid + 1;
        }
      }
    }
  }
}

exports.searchForRange = searchForRange;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  chai.expect(program.searchForRange([0, 1, 21, 33, 45, 45, 45, 45, 45, 45, 61, 71, 73], 45)).to.deep.equal([4, 9]);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.searchForRange

class ProgramTest {
    @Test
    fun TestCase1() {
        val expected = listOf(4, 9)
        val input = listOf(0, 1, 21, 33, 45, 45, 45, 45, 45, 45, 61, 71, 73)
        val output = searchForRange(input, 45)
        assert(expected == output)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(log(n)) time | O(log(n)) space
fun searchForRange(array: List<Int>, target: Int): List<Int> {
    val finalRange = mutableListOf(-1, -1)
    alteredBinarySearch(array, target, 0, array.size - 1, finalRange, true)
    alteredBinarySearch(array, target, 0, array.size - 1, finalRange, false)
    return finalRange
}

fun alteredBinarySearch(array: List<Int>, target: Int, left: Int, right: Int, finalRange: MutableList<Int>, goLeft: Boolean) {
    if (left > right) {
        return
    }
    val mid = (left + right) / 2
    if (array[mid] < target) {
        alteredBinarySearch(array, target, mid + 1, right, finalRange, goLeft)
    } else if (array[mid] > target) {
        alteredBinarySearch(array, target, left, mid - 1, finalRange, goLeft)
    } else {
        if (goLeft) {
            if (mid == 0 || array[mid - 1] != target) {
                finalRange[0] = mid
            } else {
                alteredBinarySearch(array, target, left, mid - 1, finalRange, goLeft)
            }
        } else {
            if (mid == array.size - 1 || array[mid + 1] != target) {
                finalRange[1] = mid
            } else {
                alteredBinarySearch(array, target, mid + 1, right, finalRange, goLeft)
            }
        }
    }
}

```
### Solution 2 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

// O(log(n)) time | O(1) space
fun searchForRange(array: List<Int>, target: Int): List<Int> {
    val finalRange = mutableListOf(-1, -1)
    alteredBinarySearch(array, target, 0, array.size - 1, finalRange, true)
    alteredBinarySearch(array, target, 0, array.size - 1, finalRange, false)
    return finalRange
}

fun alteredBinarySearch(array: List<Int>, target: Int, leftStart: Int, rightStart: Int, finalRange: MutableList<Int>, goLeft: Boolean) {
    var left = leftStart
    var right = rightStart
    while (left <= right) {
        val mid = (left + right) / 2
        if (array[mid] < target) {
            left = mid + 1
        } else if (array[mid] > target) {
            right = mid - 1
        } else {
            if (goLeft) {
                if (mid == 0 || array[mid - 1] != target) {
                    finalRange[0] = mid
                    return
                } else {
                    right = mid - 1
                }
            } else {
                if (mid == array.size - 1 || array[mid + 1] != target) {
                    finalRange[1] = mid
                    return
                } else {
                    left = mid + 1
                }
            }
        }
    }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.searchForRange

class ProgramTest {
    @Test
    fun TestCase1() {
        val expected = listOf(4, 9)
        val input = listOf(0, 1, 21, 33, 45, 45, 45, 45, 45, 45, 61, 71, 73)
        val output = searchForRange(input, 45)
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
    let program = Program()
    runTest("Test Case 8") { () throws -> Void in
      try assertEqual([4, 9], program.searchForRange([0, 1, 21, 33, 45, 45, 45, 45, 45, 45, 61, 71, 73], 45))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(log(n)) time | O(log(n)) space
  func searchForRange(_ array: [Int], _ target: Int) -> [Int] {
    var finalRange = [-1, -1]

    alteredBinarySearch(array, target, 0, array.count - 1, &finalRange, true)
    alteredBinarySearch(array, target, 0, array.count - 1, &finalRange, false)
    return finalRange
  }

  func alteredBinarySearch(_ array: [Int], _ target: Int, _ leftPointer: Int, _ rightPointer: Int, _ finalRange: inout [Int], _ goLeft: Bool) {
    if leftPointer > rightPointer {
      return
    }

    let middle = (leftPointer + rightPointer) / 2

    if array[middle] > target {
      alteredBinarySearch(array, target, leftPointer, middle - 1, &finalRange, goLeft)
    } else if array[middle] < target {
      alteredBinarySearch(array, target, middle + 1, rightPointer, &finalRange, goLeft)
    } else {
      if goLeft {
        if middle == 0 || array[middle] != array[middle - 1] {
          finalRange[0] = middle
        } else {
          alteredBinarySearch(array, target, leftPointer, middle - 1, &finalRange, goLeft)
        }
      } else {
        if middle == array.count - 1 || array[middle] != array[middle + 1] {
          finalRange[1] = middle
        } else {
          alteredBinarySearch(array, target, middle + 1, rightPointer, &finalRange, goLeft)
        }
      }
    }
  }
}

```
### Solution 2 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(log(n)) time | O(1) space
  func searchForRange(_ array: [Int], _ target: Int) -> [Int] {
    var finalRange = [-1, -1]

    var leftPointer = 0
    var rightPointer = array.count - 1

    alteredBinarySearch(array, target, &leftPointer, &rightPointer, &finalRange, true)

    leftPointer = 0
    rightPointer = array.count - 1
    alteredBinarySearch(array, target, &leftPointer, &rightPointer, &finalRange, false)
    return finalRange
  }

  func alteredBinarySearch(_ array: [Int], _ target: Int, _ leftPointer: inout Int, _ rightPointer: inout Int, _ finalRange: inout [Int], _ goLeft: Bool) {
    while leftPointer <= rightPointer {
      let middle = (leftPointer + rightPointer) / 2

      if array[middle] > target {
        rightPointer = middle - 1
      } else if array[middle] < target {
        leftPointer = middle + 1
      } else {
        if goLeft {
          if middle == 0 || array[middle] != array[middle - 1] {
            finalRange[0] = middle
            return
          } else {
            rightPointer = middle - 1
          }
        } else {
          if middle == array.count - 1 || array[middle] != array[middle + 1] {
            finalRange[1] = middle
            return
          } else {
            leftPointer = middle + 1
          }
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
    runTest("Test Case 8") { () throws -> Void in
      try assertEqual([4, 9], program.searchForRange([0, 1, 21, 33, 45, 45, 45, 45, 45, 45, 61, 71, 73], 45))
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
        self.assertEqual(program.searchForRange([0, 1, 21, 33, 45, 45, 45, 45, 45, 45, 61, 71, 73], 45), [4, 9])

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(log(n)) time | O(log(n)) space
def searchForRange(array, target):
    finalRange = [-1, -1]
    alteredBinarySearch(array, target, 0, len(array) - 1, finalRange, True)
    alteredBinarySearch(array, target, 0, len(array) - 1, finalRange, False)
    return finalRange


def alteredBinarySearch(array, target, left, right, finalRange, goLeft):
    if left > right:
        return
    mid = (left + right) // 2
    if array[mid] < target:
        alteredBinarySearch(array, target, mid + 1, right, finalRange, goLeft)
    elif array[mid] > target:
        alteredBinarySearch(array, target, left, mid - 1, finalRange, goLeft)
    else:
        if goLeft:
            if mid == 0 or array[mid - 1] != target:
                finalRange[0] = mid
            else:
                alteredBinarySearch(array, target, left, mid - 1, finalRange, goLeft)
        else:
            if mid == len(array) - 1 or array[mid + 1] != target:
                finalRange[1] = mid
            else:
                alteredBinarySearch(array, target, mid + 1, right, finalRange, goLeft)

```
### Solution 2 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(log(n)) time | O(1) space
def searchForRange(array, target):
    finalRange = [-1, -1]
    alteredBinarySearch(array, target, 0, len(array) - 1, finalRange, True)
    alteredBinarySearch(array, target, 0, len(array) - 1, finalRange, False)
    return finalRange


def alteredBinarySearch(array, target, left, right, finalRange, goLeft):
    while left <= right:
        mid = (left + right) // 2
        if array[mid] < target:
            left = mid + 1
        elif array[mid] > target:
            right = mid - 1
        else:
            if goLeft:
                if mid == 0 or array[mid - 1] != target:
                    finalRange[0] = mid
                    return
                else:
                    right = mid - 1
            else:
                if mid == len(array) - 1 or array[mid + 1] != target:
                    finalRange[1] = mid
                    return
                else:
                    left = mid + 1

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        self.assertEqual(program.searchForRange([0, 1, 21, 33, 45, 45, 45, 45, 45, 45, 61, 71, 73], 45), [4, 9])

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.searchForRange([0, 1, 21, 33, 45, 45, 45, 45, 45, 45, 61, 71, 73], 45)).to.deep.equal([4, 9]);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

type Range = [number, number];

// O(log(n)) time | O(log(n)) space
export function searchForRange(array: number[], target: number) {
  const finalRange: Range = [-1, -1];
  alteredBinarySearch(array, target, 0, array.length - 1, finalRange, true);
  alteredBinarySearch(array, target, 0, array.length - 1, finalRange, false);
  return finalRange;
}

function alteredBinarySearch(
  array: number[],
  target: number,
  left: number,
  right: number,
  finalRange: Range,
  goLeft: boolean,
) {
  if (left > right) return;
  const mid = Math.floor((left + right) / 2);
  if (array[mid] < target) {
    alteredBinarySearch(array, target, mid + 1, right, finalRange, goLeft);
  } else if (array[mid] > target) {
    alteredBinarySearch(array, target, left, mid - 1, finalRange, goLeft);
  } else {
    if (goLeft) {
      if (mid === 0 || array[mid - 1] !== target) {
        finalRange[0] = mid;
      } else {
        alteredBinarySearch(array, target, left, mid - 1, finalRange, goLeft);
      }
    } else {
      if (mid === array.length - 1 || array[mid + 1] !== target) {
        finalRange[1] = mid;
      } else {
        alteredBinarySearch(array, target, mid + 1, right, finalRange, goLeft);
      }
    }
  }
}

```
### Solution 2 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

type Range = [number, number];

// O(log(n)) time | O(1) space
export function searchForRange(array: number[], target: number) {
  const finalRange: Range = [-1, -1];
  alteredBinarySearch(array, target, 0, array.length - 1, finalRange, true);
  alteredBinarySearch(array, target, 0, array.length - 1, finalRange, false);
  return finalRange;
}

function alteredBinarySearch(
  array: number[],
  target: number,
  left: number,
  right: number,
  finalRange: Range,
  goLeft: boolean,
) {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (array[mid] < target) {
      left = mid + 1;
    } else if (array[mid] > target) {
      right = mid - 1;
    } else {
      if (goLeft) {
        if (mid === 0 || array[mid - 1] !== target) {
          finalRange[0] = mid;
          return;
        } else {
          right = mid - 1;
        }
      } else {
        if (mid === array.length - 1 || array[mid + 1] !== target) {
          finalRange[1] = mid;
          return;
        } else {
          left = mid + 1;
        }
      }
    }
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  chai.expect(program.searchForRange([0, 1, 21, 33, 45, 45, 45, 45, 45, 45, 61, 71, 73], 45)).to.deep.equal([4, 9]);
});

```

