# LRU Cache
<div class="html">
<p>
  Implement an <span>LRUCache</span> class for a Least Recently Used (LRU)
  cache. The class should support:
</p>
<ul>
  <li>
    Inserting key-value pairs with the <span>insertKeyValuePair</span> method.
  </li>
  <li>
    Retrieving a key's value with the <span>getValueFromKey</span> method.
  </li>
  <li>
    Retrieving the most recently used (the most recently inserted or
    retrieved) key with the
    <span>getMostRecentKey</span> method.
  </li>
</ul>
<p>
  Each of these methods should run in constant time.
</p>
<p>
  Additionally, the <span>LRUCache</span> class should store a
  <span>maxSize</span> property set to the size of the cache, which is passed in
  as an argument during instantiation. This size represents the maximum number
  of key-value pairs that the cache can store at once. If a key-value pair is
  inserted in the cache when it has reached maximum capacity, the least recently
  used key-value pair should be evicted from the cache and no longer
  retrievable; the newly added key-value pair should effectively replace it.
</p>
<p>
  Note that inserting a key-value pair with an already existing key should
  simply replace the key's value in the cache with the new value and shouldn't
  evict a key-value pair if the cache is full. Lastly, attempting to retrieve a
  value from a key that isn't in the cache should return <span>None</span> /
  <span>null</span>.
</p>
<h3>Sample Usage</h3>
<pre>
<span class="CodeEditor-promptComment">// All operations below are performed sequentially.</span>
<span class="CodeEditor-promptParameter">LRUCache</span>(3): - <span class="CodeEditor-promptComment">// instantiate an LRUCache of size 3</span>
<span class="CodeEditor-promptParameter">insertKeyValuePair</span>("b", 2): -
<span class="CodeEditor-promptParameter">insertKeyValuePair</span>("a", 1): -
<span class="CodeEditor-promptParameter">insertKeyValuePair</span>("c", 3): -
<span class="CodeEditor-promptParameter">getMostRecentKey</span>(): "c" <span class="CodeEditor-promptComment">// "c" was the most recently inserted key</span>
<span class="CodeEditor-promptParameter">getValueFromKey</span>("a"): 1
<span class="CodeEditor-promptParameter">getMostRecentKey</span>(): "a" <span class="CodeEditor-promptComment">// "a" was the most recently retrieved key</span>
<span class="CodeEditor-promptParameter">insertKeyValuePair</span>("d", 4): - <span class="CodeEditor-promptComment">// the cache had 3 entries; the least recently used one is evicted</span>
<span class="CodeEditor-promptParameter">getValueFromKey</span>("b"): None <span class="CodeEditor-promptComment">// "b" was evicted in the previous operation</span>
<span class="CodeEditor-promptParameter">insertKeyValuePair</span>("a", 5): - <span class="CodeEditor-promptComment">// "a" already exists in the cache so its value just gets replaced</span>
<span class="CodeEditor-promptParameter">getValueFromKey</span>("a"): 5
</pre>
</div>

Hint 1
<p>
What data structure could allow you to insert, retrieve, and evict resources as fast as possible, all the while keeping track of the least recently accessed resource - essentially keeping track of the order of the resources? A hash table would allow you to insert and retrieve resources fast, but it wouldn't allow you to keep track of their order. An array would let you keep track of their order, but it wouldn't let you access elements fast; it also wouldn't allow you to move an element from one position to another in constant time, which you would need to do to make a newly-accessed key / value pair the most recent one upon retrieval of a key's value. A linked list would allow you to keep track of elements' order and to move them seamlessly (if you knew their position), but it wouldn't allow you to access them easily without knowing their position beforehand. Could a heap help? What about a BST or a trie? Would any other data structures work?
</p>


Hint 2

<p>
Could you use multiple data structures to make your LRU Cache's functionality fast and efficient? Could you store keys in one data structure, for instance, and values in an auxiliary data structure? What should these data structures be in order for all of the LRU Cache's methods to run in constant time?
</p>


Hint 3

<p>
Try storing keys in a hash table and mapping them to nodes in a doubly linked list containing the keys' corresponding values (perhaps the nodes would also have to store the keys themselves). With these two data structures, you could access any key / value pair very easily via the hash table, and you could also effortlessly move nodes in the linked list so as to keep track of the most recent and least recent key / value pairs. The linked list would also allow you to keep track of the entire order of the key / value pairs, thus allowing you to perpetually update the least recent key / value pairs after evictions.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

#include <unordered_map>

unordered_map<string, int> letterMaps{{"a", 0}, {"b", 1}, {"c", 2}, {"d", 3},
                                      {"e", 4}, {"f", 5}, {"g", 6}, {"h", 7},
                                      {"i", 8}, {"j", 9}};
vector<string> letters{"a", "b", "c", "d", "e", "f", "g", "h", "i", "j"};

#define testLruOfSize(lruSize)                                                 \
  {                                                                            \
    /* Instantiate cache and insert first key. */                              \
    LRUCache lru(lruSize);                                                     \
    assert(lru.getValueFromKey("a") == 0);                                     \
    lru.insertKeyValuePair("a", 99);                                           \
    assert(lru.getMostRecentKey() == "a");                                     \
    assert(*lru.getValueFromKey("a") == 99);                                   \
    /* Add existing key when cache isn't full. */                              \
    lru.insertKeyValuePair("a", 0);                                            \
    assert(lru.getMostRecentKey() == "a");                                     \
    assert(*lru.getValueFromKey("a") == 0);                                    \
    /* Add keys until cache reaches maximum capacity. */                       \
    for (int i = 1; i < lruSize; i++) {                                        \
      string mostRecentLetter = letters[i - 1];                                \
      assert(lru.getMostRecentKey() == mostRecentLetter);                      \
      /* Test key retrieval when cache isn't full. */                          \
      for (int j = 0; j < i; j++) {                                            \
        string letter = letters[j];                                            \
        assert(*lru.getValueFromKey(letter) == letterMaps[letter]);            \
        assert(lru.getMostRecentKey() == letter);                              \
      }                                                                        \
      string currentLetter = letters[i];                                       \
      assert(lru.getValueFromKey(currentLetter) == 0);                         \
      lru.insertKeyValuePair(currentLetter, letterMaps[currentLetter]);        \
      assert(lru.getMostRecentKey() == currentLetter);                         \
      assert(*lru.getValueFromKey(currentLetter) ==                            \
             letterMaps[currentLetter]);                                       \
    }                                                                          \
    /* Add keys now that cache is at maximum capacity. */                      \
    for (int i = lruSize; i < letters.size(); i++) {                           \
      string mostRecentLetter = letters[i - 1];                                \
      assert(lru.getMostRecentKey() == mostRecentLetter);                      \
      /* Test key retrieval when cache is full. */                             \
      for (int j = i - lruSize; j < i; j++) {                                  \
        string letter = letters[j];                                            \
        assert(*lru.getValueFromKey(letter) == letterMaps[letter]);            \
        assert(lru.getMostRecentKey() == letter);                              \
      }                                                                        \
      string leastRecentLetter = letters[i - lruSize];                         \
      string currentLetter = letters[i];                                       \
      assert(lru.getValueFromKey(currentLetter) == 0);                         \
      lru.insertKeyValuePair(currentLetter, letterMaps[currentLetter]);        \
      assert(lru.getMostRecentKey() == currentLetter);                         \
      assert(*lru.getValueFromKey(currentLetter) ==                            \
             letterMaps[currentLetter]);                                       \
      assert(lru.getValueFromKey(leastRecentLetter) == 0);                     \
    }                                                                          \
    /* Add existing keys. */                                                   \
    for (int i = letters.size() - lruSize; i < letters.size(); i++) {          \
      string currentLetter = letters[i];                                       \
      assert(*lru.getValueFromKey(currentLetter) ==                            \
             letterMaps[currentLetter]);                                       \
      lru.insertKeyValuePair(currentLetter,                                    \
                             (letterMaps[currentLetter] + 1) * 100);           \
      assert(*lru.getValueFromKey(currentLetter) ==                            \
             (letterMaps[currentLetter] + 1) * 100);                           \
    }                                                                          \
  }

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      LRUCache lruCache(3);
      lruCache.insertKeyValuePair("b", 2);
      lruCache.insertKeyValuePair("a", 1);
      lruCache.insertKeyValuePair("c", 3);
      assert(lruCache.getMostRecentKey() == "c");
      assert(*lruCache.getValueFromKey("a") == 1);
      assert(lruCache.getMostRecentKey() == "a");
      lruCache.insertKeyValuePair("d", 4);
      assert(lruCache.getValueFromKey("b") == 0);
      lruCache.insertKeyValuePair("a", 5);
      assert(*lruCache.getValueFromKey("a") == 5);
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <vector>
#include <unordered_map>
using namespace std;

class DoublyLinkedListNode {
public:
  string key;
  int value;
  DoublyLinkedListNode *prev;
  DoublyLinkedListNode *next;

  DoublyLinkedListNode(string key, int value) {
    this->key = key;
    this->value = value;
    this->prev = nullptr;
    this->next = nullptr;
  }

  void removeBindings() {
    if (this->prev != nullptr) {
      this->prev->next = this->next;
    }
    if (this->next != nullptr) {
      this->next->prev = this->prev;
    }
    this->prev = nullptr;
    this->next = nullptr;
  }
};

class DoublyLinkedList {
public:
  DoublyLinkedListNode *head;
  DoublyLinkedListNode *tail;

  DoublyLinkedList() {
    this->head = nullptr;
    this->tail = nullptr;
  }

  void setHeadTo(DoublyLinkedListNode *node) {
    if (this->head == node) {
      return;
    } else if (this->head == nullptr) {
      this->head = node;
      this->tail = node;
    } else if (this->head == this->tail) {
      this->tail->prev = node;
      this->head = node;
      this->head->next = this->tail;
    } else {
      if (this->tail == node) {
        this->removeTail();
      }
      node->removeBindings();
      this->head->prev = node;
      node->next = this->head;
      this->head = node;
    }
  }

  void removeTail() {
    if (this->tail == nullptr) {
      return;
    }
    if (this->tail == this->head) {
      this->head = nullptr;
      this->tail = nullptr;
      return;
    }
    this->tail = this->tail->prev;
    this->tail->next = nullptr;
  }
};

class LRUCache {
public:
  unordered_map<string, DoublyLinkedListNode *> cache;
  int maxSize;
  int currentSize;
  DoublyLinkedList listOfMostRecent;

  LRUCache(int maxSize) {
    this->maxSize = maxSize > 1 ? maxSize : 1;
    this->currentSize = 0;
    this->listOfMostRecent = DoublyLinkedList();
  }

  // O(1) time | O(1) space
  void insertKeyValuePair(string key, int value) {
    if (this->cache.find(key) == this->cache.end()) {
      if (this->currentSize == this->maxSize) {
        this->evictLeastRecent();
      } else {
        this->currentSize++;
      }
      this->cache[key] = new DoublyLinkedListNode(key, value);
    } else {
      this->replaceKey(key, value);
    }
    this->updateMostRecent(this->cache[key]);
  }

  // O(1) time | O(1) space
  int *getValueFromKey(string key) {
    if (this->cache.find(key) == this->cache.end()) {
      return nullptr;
    }
    this->updateMostRecent(this->cache[key]);
    return &this->cache[key]->value;
  }

  // O(1) time | O(1) space
  string getMostRecentKey() {
    if (this->listOfMostRecent.head == nullptr) {
      return "";
    }
    return this->listOfMostRecent.head->key;
  }

  void evictLeastRecent() {
    string keyToRemove = this->listOfMostRecent.tail->key;
    this->listOfMostRecent.removeTail();
    this->cache.erase(keyToRemove);
  }

  void updateMostRecent(DoublyLinkedListNode *node) {
    this->listOfMostRecent.setHeadTo(node);
  }

  void replaceKey(string key, int value) {
    if (this->cache.find(key) == this->cache.end()) {
      return;
    }
    this->cache[key]->value = value;
  }
};

```
### Unit Tests 1 (cpp)
```cpp
#include <unordered_map>

unordered_map<string, int> letterMaps{{"a", 0}, {"b", 1}, {"c", 2}, {"d", 3},
                                      {"e", 4}, {"f", 5}, {"g", 6}, {"h", 7},
                                      {"i", 8}, {"j", 9}};
vector<string> letters{"a", "b", "c", "d", "e", "f", "g", "h", "i", "j"};

#define testLruOfSize(lruSize)                                                 \
  {                                                                            \
    /* Instantiate cache and insert first key. */                              \
    LRUCache lru(lruSize);                                                     \
    assert(lru.getValueFromKey("a") == 0);                                     \
    lru.insertKeyValuePair("a", 99);                                           \
    assert(lru.getMostRecentKey() == "a");                                     \
    assert(*lru.getValueFromKey("a") == 99);                                   \
    /* Add existing key when cache isn't full. */                              \
    lru.insertKeyValuePair("a", 0);                                            \
    assert(lru.getMostRecentKey() == "a");                                     \
    assert(*lru.getValueFromKey("a") == 0);                                    \
    /* Add keys until cache reaches maximum capacity. */                       \
    for (int i = 1; i < lruSize; i++) {                                        \
      string mostRecentLetter = letters[i - 1];                                \
      assert(lru.getMostRecentKey() == mostRecentLetter);                      \
      /* Test key retrieval when cache isn't full. */                          \
      for (int j = 0; j < i; j++) {                                            \
        string letter = letters[j];                                            \
        assert(*lru.getValueFromKey(letter) == letterMaps[letter]);            \
        assert(lru.getMostRecentKey() == letter);                              \
      }                                                                        \
      string currentLetter = letters[i];                                       \
      assert(lru.getValueFromKey(currentLetter) == 0);                         \
      lru.insertKeyValuePair(currentLetter, letterMaps[currentLetter]);        \
      assert(lru.getMostRecentKey() == currentLetter);                         \
      assert(*lru.getValueFromKey(currentLetter) ==                            \
             letterMaps[currentLetter]);                                       \
    }                                                                          \
    /* Add keys now that cache is at maximum capacity. */                      \
    for (int i = lruSize; i < letters.size(); i++) {                           \
      string mostRecentLetter = letters[i - 1];                                \
      assert(lru.getMostRecentKey() == mostRecentLetter);                      \
      /* Test key retrieval when cache is full. */                             \
      for (int j = i - lruSize; j < i; j++) {                                  \
        string letter = letters[j];                                            \
        assert(*lru.getValueFromKey(letter) == letterMaps[letter]);            \
        assert(lru.getMostRecentKey() == letter);                              \
      }                                                                        \
      string leastRecentLetter = letters[i - lruSize];                         \
      string currentLetter = letters[i];                                       \
      assert(lru.getValueFromKey(currentLetter) == 0);                         \
      lru.insertKeyValuePair(currentLetter, letterMaps[currentLetter]);        \
      assert(lru.getMostRecentKey() == currentLetter);                         \
      assert(*lru.getValueFromKey(currentLetter) ==                            \
             letterMaps[currentLetter]);                                       \
      assert(lru.getValueFromKey(leastRecentLetter) == 0);                     \
    }                                                                          \
    /* Add existing keys. */                                                   \
    for (int i = letters.size() - lruSize; i < letters.size(); i++) {          \
      string currentLetter = letters[i];                                       \
      assert(*lru.getValueFromKey(currentLetter) ==                            \
             letterMaps[currentLetter]);                                       \
      lru.insertKeyValuePair(currentLetter,                                    \
                             (letterMaps[currentLetter] + 1) * 100);           \
      assert(*lru.getValueFromKey(currentLetter) ==                            \
             (letterMaps[currentLetter] + 1) * 100);                           \
    }                                                                          \
  }

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      LRUCache lruCache(3);
      lruCache.insertKeyValuePair("b", 2);
      lruCache.insertKeyValuePair("a", 1);
      lruCache.insertKeyValuePair("c", 3);
      assert(lruCache.getMostRecentKey() == "c");
      assert(*lruCache.getValueFromKey("a") == 1);
      assert(lruCache.getMostRecentKey() == "a");
      lruCache.insertKeyValuePair("d", 4);
      assert(lruCache.getValueFromKey("b") == 0);
      lruCache.insertKeyValuePair("a", 5);
      assert(*lruCache.getValueFromKey("a") == 5);
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
		Program.LRUCache lruCache = new Program.LRUCache(3);
		lruCache.InsertKeyValuePair("b", 2);
		lruCache.InsertKeyValuePair("a", 1);
		lruCache.InsertKeyValuePair("c", 3);
		Utils.AssertTrue(lruCache.GetMostRecentKey() == "c");
		Utils.AssertTrue(lruCache.GetValueFromKey("a").value == 1);
		Utils.AssertTrue(lruCache.GetMostRecentKey() == "a");
		lruCache.InsertKeyValuePair("d", 4);
		var evictedValue = lruCache.GetValueFromKey("b");
		Utils.AssertTrue(evictedValue == null || evictedValue.found == false);
		lruCache.InsertKeyValuePair("a", 5);
		Utils.AssertTrue(lruCache.GetValueFromKey("a").value == 5);
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System.Collections.Generic;

public class Program {
	public class LRUCache {
		public Dictionary<string, DoublyLinkedListNode> cache = new Dictionary<string,
		    DoublyLinkedListNode>();
		public int maxSize;
		public int currentSize = 0;
		public DoublyLinkedList listOfMostRecent = new DoublyLinkedList();

		public LRUCache(int maxSize) {
			this.maxSize = maxSize > 1 ? maxSize : 1;
		}

		// O(1) time | O(1) space
		public void InsertKeyValuePair(string key, int value) {
			if (!cache.ContainsKey(key)) {
				if (currentSize == maxSize) {
					evictLeastRecent();
				} else {
					currentSize++;
				}
				cache.Add(key, new DoublyLinkedListNode(key, value));
			} else {
				replaceKey(key, value);
			}
			updateMostRecent(cache[key]);
		}

		// O(1) time | O(1) space
		public LRUResult GetValueFromKey(string key) {
			if (!cache.ContainsKey(key)) {
				return new LRUResult(false, -1);
			}
			updateMostRecent(cache[key]);
			return new LRUResult(true, cache[key].value);
		}

		// O(1) time | O(1) space
		public string GetMostRecentKey() {
			if (listOfMostRecent.head == null) {
				return "";
			}
			return listOfMostRecent.head.key;
		}

		public void evictLeastRecent() {
			string keyToRemove = listOfMostRecent.tail.key;
			listOfMostRecent.removeTail();
			cache.Remove(keyToRemove);
		}

		public void updateMostRecent(DoublyLinkedListNode node) {
			listOfMostRecent.setHeadTo(node);
		}

		public void replaceKey(string key, int value) {
			if (!this.cache.ContainsKey(key)) {
				return;
			}
			cache[key].value = value;
		}
	}

	public class DoublyLinkedList {
		public DoublyLinkedListNode head = null;
		public DoublyLinkedListNode tail = null;

		public void setHeadTo(DoublyLinkedListNode node) {
			if (head == node) {
				return;
			} else if (head == null) {
				head = node;
				tail = node;
			} else if (head == tail) {
				tail.prev = node;
				head = node;
				head.next = tail;
			} else {
				if (tail == node) {
					removeTail();
				}
				node.removeBindings();
				head.prev = node;
				node.next = head;
				head = node;
			}
		}

		public void removeTail() {
			if (tail == null) {
				return;
			}
			if (tail == head) {
				head = null;
				tail = null;
				return;
			}
			tail = tail.prev;
			tail.next = null;
		}
	}

	public class DoublyLinkedListNode {
		public string key;
		public int value;
		public DoublyLinkedListNode prev = null;
		public DoublyLinkedListNode next = null;

		public DoublyLinkedListNode(string key, int value) {
			this.key = key;
			this.value = value;
		}

		public void removeBindings() {
			if (prev != null) {
				prev.next = next;
			}
			if (next != null) {
				next.prev = prev;
			}
			prev = null;
			next = null;
		}
	}

	public class LRUResult {
		public bool found;
		public int value;

		public LRUResult(bool found, int value) {
			this.found = found;
			this.value = value;
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;

public class ProgramTest {
	[Test]
	public void TestCase1() {
		Program.LRUCache lruCache = new Program.LRUCache(3);
		lruCache.InsertKeyValuePair("b", 2);
		lruCache.InsertKeyValuePair("a", 1);
		lruCache.InsertKeyValuePair("c", 3);
		Utils.AssertTrue(lruCache.GetMostRecentKey() == "c");
		Utils.AssertTrue(lruCache.GetValueFromKey("a").value == 1);
		Utils.AssertTrue(lruCache.GetMostRecentKey() == "a");
		lruCache.InsertKeyValuePair("d", 4);
		var evictedValue = lruCache.GetValueFromKey("b");
		Utils.AssertTrue(evictedValue == null || evictedValue.found == false);
		lruCache.InsertKeyValuePair("a", 5);
		Utils.AssertTrue(lruCache.GetValueFromKey("a").value == 5);
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
	lruCache := NewLRUCache(3)
	lruCache.InsertKeyValuePair("b", 2)
	lruCache.InsertKeyValuePair("a", 1)
	lruCache.InsertKeyValuePair("c", 3)
	key, _ := lruCache.GetMostRecentKey()
	require.True(t, key == "c")
	value, _ := lruCache.GetValueFromKey("a")
	require.True(t, value == 1)
	key, _ = lruCache.GetMostRecentKey()
	require.True(t, key == "a")
	lruCache.InsertKeyValuePair("d", 4)
	_, found := lruCache.GetValueFromKey("b")
	require.True(t, !found)
	lruCache.InsertKeyValuePair("a", 5)
	value, _ = lruCache.GetValueFromKey("a")
	require.True(t, value == 5)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

type LRUCache struct {
	index            map[string]*DoublyLinkedListNode
	maxSize          int
	currentSize      int
	listOfMostRecent *DoublyLinkedList
}

func NewLRUCache(size int) *LRUCache {
	lru := &LRUCache{
		index:            map[string]*DoublyLinkedListNode{},
		maxSize:          size,
		currentSize:      0,
		listOfMostRecent: &DoublyLinkedList{},
	}
	if lru.maxSize < 1 {
		lru.maxSize = 1
	}
	return lru
}

// O(1) time | O(1) space
func (cache *LRUCache) InsertKeyValuePair(key string, value int) {
	if _, found := cache.index[key]; !found {
		if cache.currentSize == cache.maxSize {
			cache.evictLeastRecent()
		} else {
			cache.currentSize += 1
		}
		cache.index[key] = &DoublyLinkedListNode{
			key:   key,
			value: value,
		}
	} else {
		cache.replaceKey(key, value)
	}
	cache.updateMostRecent(cache.index[key])
}

// O(1) time | O(1) space
func (cache *LRUCache) GetValueFromKey(key string) (int, bool) {
	if node, found := cache.index[key]; !found {
		return 0, false
	} else {
		cache.updateMostRecent(node)
		return node.value, true
	}
}

// O(1) time | O(1) space
func (cache *LRUCache) GetMostRecentKey() (string, bool) {
	if cache.listOfMostRecent.head == nil {
		return "", false
	}
	return cache.listOfMostRecent.head.key, true
}

func (cache *LRUCache) evictLeastRecent() {
	key := cache.listOfMostRecent.tail.key
	cache.listOfMostRecent.removeTail()
	delete(cache.index, key)
}

func (cache *LRUCache) updateMostRecent(node *DoublyLinkedListNode) {
	cache.listOfMostRecent.setHeadTo(node)
}

func (cache *LRUCache) replaceKey(key string, value int) {
	if node, found := cache.index[key]; !found {
		panic("The provided key isn't in the cache!")
	} else {
		node.value = value
	}
}

type DoublyLinkedList struct {
	head *DoublyLinkedListNode
	tail *DoublyLinkedListNode
}

func (list *DoublyLinkedList) setHeadTo(node *DoublyLinkedListNode) {
	if list.head == node {
		return
	}
	if list.head == nil {
		list.head, list.tail = node, node
		return
	}
	if list.head == list.tail {
		list.tail.prev = node
		list.head = node
		list.head.next = list.tail
		return
	}
	if list.tail == node {
		list.removeTail()
	}
	node.removeBindings()
	list.head.prev = node
	node.next = list.head
	list.head = node
}

func (list *DoublyLinkedList) removeTail() {
	if list.tail == nil {
		return
	}
	if list.tail == list.head {
		list.head, list.tail = nil, nil
		return
	}
	list.tail = list.tail.prev
	list.tail.next = nil
}

type DoublyLinkedListNode struct {
	key   string
	value int
	prev  *DoublyLinkedListNode
	next  *DoublyLinkedListNode
}

func (node *DoublyLinkedListNode) removeBindings() {
	if node.prev != nil {
		node.prev.next = node.next
	}
	if node.next != nil {
		node.next.prev = node.prev
	}
	node.prev, node.next = nil, nil
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	lruCache := NewLRUCache(3)
	lruCache.InsertKeyValuePair("b", 2)
	lruCache.InsertKeyValuePair("a", 1)
	lruCache.InsertKeyValuePair("c", 3)
	key, _ := lruCache.GetMostRecentKey()
	require.True(t, key == "c")
	value, _ := lruCache.GetValueFromKey("a")
	require.True(t, value == 1)
	key, _ = lruCache.GetMostRecentKey()
	require.True(t, key == "a")
	lruCache.InsertKeyValuePair("d", 4)
	_, found := lruCache.GetValueFromKey("b")
	require.True(t, !found)
	lruCache.InsertKeyValuePair("a", 5)
	value, _ = lruCache.GetValueFromKey("a")
	require.True(t, value == 5)
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
    Program.LRUCache lruCache = new Program.LRUCache(3);
    lruCache.insertKeyValuePair("b", 2);
    lruCache.insertKeyValuePair("a", 1);
    lruCache.insertKeyValuePair("c", 3);
    Utils.assertTrue(lruCache.getMostRecentKey() == "c");
    Utils.assertTrue(lruCache.getValueFromKey("a").value == 1);
    Utils.assertTrue(lruCache.getMostRecentKey() == "a");
    lruCache.insertKeyValuePair("d", 4);
    var evictedValue = lruCache.getValueFromKey("b");
    Utils.assertTrue(evictedValue == null || evictedValue.found == false);
    lruCache.insertKeyValuePair("a", 5);
    Utils.assertTrue(lruCache.getValueFromKey("a").value == 5);
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  static class LRUCache {
    Map<String, DoublyLinkedListNode> cache = new HashMap<String, DoublyLinkedListNode>();
    int maxSize;
    int currentSize = 0;
    DoublyLinkedList listOfMostRecent = new DoublyLinkedList();

    public LRUCache(int maxSize) {
      this.maxSize = maxSize > 1 ? maxSize : 1;
    }

    // O(1) time | O(1) space
    public void insertKeyValuePair(String key, int value) {
      if (!cache.containsKey(key)) {
        if (currentSize == maxSize) {
          evictLeastRecent();
        } else {
          currentSize++;
        }
        cache.put(key, new DoublyLinkedListNode(key, value));
      } else {
        replaceKey(key, value);
      }
      updateMostRecent(cache.get(key));
    }

    // O(1) time | O(1) space
    public LRUResult getValueFromKey(String key) {
      if (!cache.containsKey(key)) {
        return new LRUResult(false, -1);
      }
      updateMostRecent(cache.get(key));
      return new LRUResult(true, cache.get(key).value);
    }

    // O(1) time | O(1) space
    public String getMostRecentKey() {
      if (listOfMostRecent.head == null) {
        return "";
      }
      return listOfMostRecent.head.key;
    }

    public void evictLeastRecent() {
      String keyToRemove = listOfMostRecent.tail.key;
      listOfMostRecent.removeTail();
      cache.remove(keyToRemove);
    }

    public void updateMostRecent(DoublyLinkedListNode node) {
      listOfMostRecent.setHeadTo(node);
    }

    public void replaceKey(String key, int value) {
      if (!this.cache.containsKey(key)) {
        return;
      }
      cache.get(key).value = value;
    }
  }

  static class DoublyLinkedList {
    DoublyLinkedListNode head = null;
    DoublyLinkedListNode tail = null;

    public void setHeadTo(DoublyLinkedListNode node) {
      if (head == node) {
        return;
      } else if (head == null) {
        head = node;
        tail = node;
      } else if (head == tail) {
        tail.prev = node;
        head = node;
        head.next = tail;
      } else {
        if (tail == node) {
          removeTail();
        }
        node.removeBindings();
        head.prev = node;
        node.next = head;
        head = node;
      }
    }

    public void removeTail() {
      if (tail == null) {
        return;
      }
      if (tail == head) {
        head = null;
        tail = null;
        return;
      }
      tail = tail.prev;
      tail.next = null;
    }
  }

  static class DoublyLinkedListNode {
    String key;
    int value;
    DoublyLinkedListNode prev = null;
    DoublyLinkedListNode next = null;

    public DoublyLinkedListNode(String key, int value) {
      this.key = key;
      this.value = value;
    }

    public void removeBindings() {
      if (prev != null) {
        prev.next = next;
      }
      if (next != null) {
        next.prev = prev;
      }
      prev = null;
      next = null;
    }
  }

  static class LRUResult {
    boolean found;
    int value;

    public LRUResult(boolean found, int value) {
      this.found = found;
      this.value = value;
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
    Program.LRUCache lruCache = new Program.LRUCache(3);
    lruCache.insertKeyValuePair("b", 2);
    lruCache.insertKeyValuePair("a", 1);
    lruCache.insertKeyValuePair("c", 3);
    Utils.assertTrue(lruCache.getMostRecentKey() == "c");
    Utils.assertTrue(lruCache.getValueFromKey("a").value == 1);
    Utils.assertTrue(lruCache.getMostRecentKey() == "a");
    lruCache.insertKeyValuePair("d", 4);
    var evictedValue = lruCache.getValueFromKey("b");
    Utils.assertTrue(evictedValue == null || evictedValue.found == false);
    lruCache.insertKeyValuePair("a", 5);
    Utils.assertTrue(lruCache.getValueFromKey("a").value == 5);
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
  const lruCache = new program.LRUCache(3);
  lruCache.insertKeyValuePair('b', 2);
  lruCache.insertKeyValuePair('a', 1);
  lruCache.insertKeyValuePair('c', 3);
  chai.expect(lruCache.getMostRecentKey()).to.deep.equal('c');
  chai.expect(lruCache.getValueFromKey('a')).to.deep.equal(1);
  chai.expect(lruCache.getMostRecentKey()).to.deep.equal('a');
  lruCache.insertKeyValuePair('d', 4);
  chai.expect(lruCache.getValueFromKey('b')).to.deep.equal(null);
  lruCache.insertKeyValuePair('a', 5);
  chai.expect(lruCache.getValueFromKey('a')).to.deep.equal(5);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class LRUCache {
  constructor(maxSize) {
    this.cache = {};
    this.maxSize = maxSize || 1;
    this.currentSize = 0;
    this.listOfMostRecent = new DoublyLinkedList();
  }

  // O(1) time | O(1) space
  insertKeyValuePair(key, value) {
    if (!(key in this.cache)) {
      if (this.currentSize === this.maxSize) {
        this.evictLeastRecent();
      } else {
        this.currentSize++;
      }
      this.cache[key] = new DoublyLinkedListNode(key, value);
    } else {
      this.replaceKey(key, value);
    }
    this.updateMostRecent(this.cache[key]);
  }

  // O(1) time | O(1) space
  getValueFromKey(key) {
    if (!(key in this.cache)) return null;
    this.updateMostRecent(this.cache[key]);
    return this.cache[key].value;
  }

  // O(1) time | O(1) space
  getMostRecentKey() {
    if (!this.listOfMostRecent.head) return;
    return this.listOfMostRecent.head.key;
  }

  evictLeastRecent() {
    const keyToRemove = this.listOfMostRecent.tail.key;
    this.listOfMostRecent.removeTail();
    delete this.cache[keyToRemove];
  }

  updateMostRecent(node) {
    this.listOfMostRecent.setHeadTo(node);
  }

  replaceKey(key, value) {
    if (!(key in this.cache)) {
      throw new Error("The provided key isn't in the cache!");
    }
    this.cache[key].value = value;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  setHeadTo(node) {
    if (this.head === node) {
      return;
    } else if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else if (this.head === this.tail) {
      this.tail.prev = node;
      this.head = node;
      this.head.next = this.tail;
    } else {
      if (this.tail === node) this.removeTail();
      node.removeBindings();
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
  }

  removeTail() {
    if (this.tail === null) return;
    if (this.tail === this.head) {
      this.head = null;
      this.tail = null;
      return;
    }
    this.tail = this.tail.prev;
    this.tail.next = null;
  }
}

class DoublyLinkedListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }

  removeBindings() {
    if (this.prev !== null) {
      this.prev.next = this.next;
    }
    if (this.next !== null) {
      this.next.prev = this.prev;
    }
    this.prev = null;
    this.next = null;
  }
}

exports.LRUCache = LRUCache;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const lruCache = new program.LRUCache(3);
  lruCache.insertKeyValuePair('b', 2);
  lruCache.insertKeyValuePair('a', 1);
  lruCache.insertKeyValuePair('c', 3);
  chai.expect(lruCache.getMostRecentKey()).to.deep.equal('c');
  chai.expect(lruCache.getValueFromKey('a')).to.deep.equal(1);
  chai.expect(lruCache.getMostRecentKey()).to.deep.equal('a');
  lruCache.insertKeyValuePair('d', 4);
  chai.expect(lruCache.getValueFromKey('b')).to.deep.equal(null);
  lruCache.insertKeyValuePair('a', 5);
  chai.expect(lruCache.getValueFromKey('a')).to.deep.equal(5);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.LRUCache

class ProgramTest {
    @Test
    fun TestCase1() {
        val lruCache = LRUCache(3)

        lruCache.insertKeyValuePair("b", 2)
        lruCache.insertKeyValuePair("a", 1)
        lruCache.insertKeyValuePair("c", 3)

        assert(lruCache.getMostRecentKey() == "c")
        assert(lruCache.getValueFromKey("a") == 1)
        assert(lruCache.getMostRecentKey() == "a")

        lruCache.insertKeyValuePair("d", 4)
        val evictedValue = lruCache.getValueFromKey("b")
        assert(evictedValue == null)

        lruCache.insertKeyValuePair("a", 5)
        assert(lruCache.getValueFromKey("a") == 5)
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

class LRUCache(maxSize: Int) {
    val maxSize = maxSize
    var currentSize = 0
    var cache: MutableMap<String, Node> = mutableMapOf()
    var listOfMostRecent = DoublyLinkedList()

    // O(1) time | O(1) space
    fun insertKeyValuePair(key: String, value: Int) {
        if (!cache.containsKey(key)) {
            if (currentSize == maxSize) {
                evictLeastRecent()
            } else {
                currentSize++
            }
            cache[key] = Node(key, value)
        } else {
            replaceKey(key, value)
        }
        updateMostRecent(cache[key]!!)
    }

    // O(1) time | O(1) space
    fun getValueFromKey(key: String): Int? {
        val node = cache[key]
        if (node == null) return null
        updateMostRecent(node)
        return node.value
    }

    // O(1) time | O(1) space
    fun getMostRecentKey(): String? {
        val head = listOfMostRecent.getHead()
        if (head == null) return null
        return head.key
    }

    fun evictLeastRecent() {
        val tail = listOfMostRecent.getTail()
        if (tail == null) return
        val keyToRemove = tail.key
        listOfMostRecent.remove(tail)
        cache.remove(keyToRemove)
    }

    fun updateMostRecent(node: Node) {
        listOfMostRecent.setHead(node)
    }

    fun replaceKey(key: String, value: Int) {
        val node = cache[key]
        if (node == null) return
        node.value = value
    }
}

class Node(key: String, value: Int) {
    val key = key
    var value = value
    var prev: Node? = null
    var next: Node? = null
}

class DoublyLinkedList {
    private var head: Node? = null
    private var tail: Node? = null

    fun setHead(node: Node) {
        if (this.head == null) {
            this.head = node
            this.tail = node
            return
        }
        this.insertBefore(this.head!!, node)
    }

    fun setTail(node: Node) {
        if (this.tail == null) {
            setHead(node)
            return
        }
        insertAfter(this.tail!!, node)
    }

    fun insertBefore(node: Node, nodeToInsert: Node) {
        if (nodeToInsert == this.head && nodeToInsert == this.tail) return
        remove(nodeToInsert)
        nodeToInsert.prev = node.prev
        nodeToInsert.next = node
        if (node.prev == null) {
            this.head = nodeToInsert
        } else {
            node.prev!!.next = nodeToInsert
        }
        node.prev = nodeToInsert
    }

    fun insertAfter(node: Node, nodeToInsert: Node) {
        if (nodeToInsert == this.head && nodeToInsert == tail) return
        remove(nodeToInsert)
        nodeToInsert.prev = node
        nodeToInsert.next = node.next
        if (node.next == null) {
            this.tail = nodeToInsert
        } else {
            node.next!!.prev = nodeToInsert
        }
        node.next = nodeToInsert
    }

    fun remove(node: Node) {
        if (node == this.head) this.head = node.next
        if (node == this.tail) this.tail = node.prev
        removeNodeBindings(node)
    }

    fun removeNodeBindings(node: Node) {
        if (node.prev != null) node.prev!!.next = node.next
        if (node.next != null) node.next!!.prev = node.prev
        node.prev = null
        node.next = null
    }

    fun getHead(): Node? { return this.head }

    fun getTail(): Node? { return this.tail }
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.LRUCache

class ProgramTest {
    @Test
    fun TestCase1() {
        val lruCache = LRUCache(3)

        lruCache.insertKeyValuePair("b", 2)
        lruCache.insertKeyValuePair("a", 1)
        lruCache.insertKeyValuePair("c", 3)

        assert(lruCache.getMostRecentKey() == "c")
        assert(lruCache.getValueFromKey("a") == 1)
        assert(lruCache.getMostRecentKey() == "a")

        lruCache.insertKeyValuePair("d", 4)
        val evictedValue = lruCache.getValueFromKey("b")
        assert(evictedValue == null)

        lruCache.insertKeyValuePair("a", 5)
        assert(lruCache.getValueFromKey("a") == 5)
    }
}

```
### Sandbox Code (swift)
```swift
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

class ProgramTest: TestSuite {
  let program = Program()
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let lruCache = Program.LRUCache(maxSize: 3)
      lruCache.insertKeyValuePair("b", 2)
      lruCache.insertKeyValuePair("a", 1)
      lruCache.insertKeyValuePair("c", 3)
      try assertEqual("c", lruCache.getMostRecentKey())
      try assertEqual(1, lruCache.getValueFromKey("a"))
      try assertEqual("a", lruCache.getMostRecentKey())
      lruCache.insertKeyValuePair("d", 4)
      try assertEqual(nil, lruCache.getValueFromKey("b"))
      lruCache.insertKeyValuePair("a", 5)
      try assertEqual(5, lruCache.getValueFromKey("a"))
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  class LRUCache {
    var maxSize: Int
    var currentSize = 0
    var cache = [String: DoublyLinkedListNode]()
    var listOfMostRecent = DoublyLinkedList()

    init(maxSize: Int) {
      self.maxSize = maxSize
    }

    // O(1) time | O(1) space
    func insertKeyValuePair(_ key: String, _ value: Int) {
      if !cache.keys.contains(key) {
        if currentSize == maxSize {
          evictLeastRecent()
        } else {
          currentSize += 1
        }

        cache[key] = DoublyLinkedListNode(key, value)
      } else if let existingNode = cache[key] {
        existingNode.value = value
      }

      if let node = cache[key] {
        updateMostRecent(node)
      }
    }

    func evictLeastRecent() {
      if let key = listOfMostRecent.tail?.key {
        listOfMostRecent.removeTail()
        cache[key] = nil
      }
    }

    func updateMostRecent(_ node: DoublyLinkedListNode) {
      listOfMostRecent.setHeadTo(node)
    }

    // O(1) time | O(1) space
    func getValueFromKey(_ key: String) -> Int? {
      if let existingNode = cache[key] {
        updateMostRecent(existingNode)
        return existingNode.value
      } else {
        return nil
      }
    }

    // O(1) time | O(1) space
    func getMostRecentKey() -> String? {
      if listOfMostRecent.head === nil {
        return nil
      }
      return listOfMostRecent.head?.key
    }
  }

  class DoublyLinkedListNode {
    let key: String
    var value: Int
    var previous: DoublyLinkedListNode?
    var next: DoublyLinkedListNode?

    init(_ key: String, _ value: Int) {
      self.key = key
      self.value = value
      previous = nil
      next = nil
    }

    func removeBindings() {
      if let previous = previous {
        previous.next = next
      }

      if let next = next {
        next.previous = previous
      }

      previous = nil
      next = nil
    }
  }

  class DoublyLinkedList {
    var head: DoublyLinkedListNode?
    var tail: DoublyLinkedListNode?

    init() {
      head = nil
      tail = nil
    }

    func setHeadTo(_ node: DoublyLinkedListNode) {
      if head === node {
        return
      } else if head === nil {
        head = node
        tail = node
      } else if head === tail {
        tail?.previous = node
        head = node
        head?.next = tail
      } else {
        if tail === node {
          removeTail()
        }

        node.removeBindings()
        head?.previous = node
        node.next = head
        head = node
      }
    }

    func removeTail() {
      if tail === nil {
        return
      }

      if head === tail {
        head = nil
        tail = nil
        return
      }

      tail = tail?.previous
      tail?.next = nil
    }
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  let program = Program()
  func test() {
    runTest("Test Case 1") { () throws -> Void in
      let lruCache = Program.LRUCache(maxSize: 3)
      lruCache.insertKeyValuePair("b", 2)
      lruCache.insertKeyValuePair("a", 1)
      lruCache.insertKeyValuePair("c", 3)
      try assertEqual("c", lruCache.getMostRecentKey())
      try assertEqual(1, lruCache.getValueFromKey("a"))
      try assertEqual("a", lruCache.getMostRecentKey())
      lruCache.insertKeyValuePair("d", 4)
      try assertEqual(nil, lruCache.getValueFromKey("b"))
      lruCache.insertKeyValuePair("a", 5)
      try assertEqual(5, lruCache.getValueFromKey("a"))
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
        lruCache = program.LRUCache(3)
        lruCache.insertKeyValuePair("b", 2)
        lruCache.insertKeyValuePair("a", 1)
        lruCache.insertKeyValuePair("c", 3)
        self.assertEqual(lruCache.getMostRecentKey(), "c")
        self.assertEqual(lruCache.getValueFromKey("a"), 1)
        self.assertEqual(lruCache.getMostRecentKey(), "a")
        lruCache.insertKeyValuePair("d", 4)
        self.assertEqual(lruCache.getValueFromKey("b"), None)
        lruCache.insertKeyValuePair("a", 5)
        self.assertEqual(lruCache.getValueFromKey("a"), 5)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

class LRUCache:
    def __init__(self, maxSize):
        self.cache = {}
        self.maxSize = maxSize or 1
        self.currentSize = 0
        self.listOfMostRecent = DoublyLinkedList()

    # O(1) time | O(1) space
    def insertKeyValuePair(self, key, value):
        if key not in self.cache:
            if self.currentSize == self.maxSize:
                self.evictLeastRecent()
            else:
                self.currentSize += 1
            self.cache[key] = DoublyLinkedListNode(key, value)
        else:
            self.replaceKey(key, value)
        self.updateMostRecent(self.cache[key])

    # O(1) time | O(1) space
    def getValueFromKey(self, key):
        if key not in self.cache:
            return None
        self.updateMostRecent(self.cache[key])
        return self.cache[key].value

    # O(1) time | O(1) space
    def getMostRecentKey(self):
        if self.listOfMostRecent.head is None:
            return None
        return self.listOfMostRecent.head.key

    def evictLeastRecent(self):
        keyToRemove = self.listOfMostRecent.tail.key
        self.listOfMostRecent.removeTail()
        del self.cache[keyToRemove]

    def updateMostRecent(self, node):
        self.listOfMostRecent.setHeadTo(node)

    def replaceKey(self, key, value):
        if key not in self.cache:
            raise Exception("The provided key isn't in the cache!")
        self.cache[key].value = value


class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

    def setHeadTo(self, node):
        if self.head == node:
            return
        elif self.head is None:
            self.head = node
            self.tail = node
        elif self.head == self.tail:
            self.tail.prev = node
            self.head = node
            self.head.next = self.tail
        else:
            if self.tail == node:
                self.removeTail()
            node.removeBindings()
            self.head.prev = node
            node.next = self.head
            self.head = node

    def removeTail(self):
        if self.tail is None:
            return
        if self.tail == self.head:
            self.head = None
            self.tail = None
            return
        self.tail = self.tail.prev
        self.tail.next = None


class DoublyLinkedListNode:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

    def removeBindings(self):
        if self.prev is not None:
            self.prev.next = self.next
        if self.next is not None:
            self.next.prev = self.prev
        self.prev = None
        self.next = None

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        lruCache = program.LRUCache(3)
        lruCache.insertKeyValuePair("b", 2)
        lruCache.insertKeyValuePair("a", 1)
        lruCache.insertKeyValuePair("c", 3)
        self.assertEqual(lruCache.getMostRecentKey(), "c")
        self.assertEqual(lruCache.getValueFromKey("a"), 1)
        self.assertEqual(lruCache.getMostRecentKey(), "a")
        lruCache.insertKeyValuePair("d", 4)
        self.assertEqual(lruCache.getValueFromKey("b"), None)
        lruCache.insertKeyValuePair("a", 5)
        self.assertEqual(lruCache.getValueFromKey("a"), 5)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const lruCache = new program.LRUCache(3);
  lruCache.insertKeyValuePair('b', 2);
  lruCache.insertKeyValuePair('a', 1);
  lruCache.insertKeyValuePair('c', 3);
  chai.expect(lruCache.getMostRecentKey()).to.deep.equal('c');
  chai.expect(lruCache.getValueFromKey('a')).to.deep.equal(1);
  chai.expect(lruCache.getMostRecentKey()).to.deep.equal('a');
  lruCache.insertKeyValuePair('d', 4);
  chai.expect(lruCache.getValueFromKey('b')).to.deep.equal(null);
  lruCache.insertKeyValuePair('a', 5);
  chai.expect(lruCache.getValueFromKey('a')).to.deep.equal(5);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

export class LRUCache {
  cache: {[key: string]: DoublyLinkedListNode};
  maxSize: number;
  currentSize: number;
  listOfMostRecent: DoublyLinkedList;

  constructor(maxSize: number) {
    this.cache = {};
    this.maxSize = maxSize || 1;
    this.currentSize = 0;
    this.listOfMostRecent = new DoublyLinkedList();
  }

  // O(1) time | O(1) space
  insertKeyValuePair(key: string, value: number) {
    if (!(key in this.cache)) {
      if (this.currentSize === this.maxSize) {
        this.evictLeastRecent();
      } else {
        this.currentSize++;
      }
      this.cache[key] = new DoublyLinkedListNode(key, value);
    } else {
      this.replaceKey(key, value);
    }
    this.updateMostRecent(this.cache[key]);
  }

  // O(1) time | O(1) space
  getValueFromKey(key: string) {
    if (!(key in this.cache)) return null;
    this.updateMostRecent(this.cache[key]);
    return this.cache[key].value;
  }

  // O(1) time | O(1) space
  getMostRecentKey() {
    if (!this.listOfMostRecent.head) return null;
    return this.listOfMostRecent.head.key;
  }

  evictLeastRecent() {
    const keyToRemove = this.listOfMostRecent.tail!.key;
    this.listOfMostRecent.removeTail();
    delete this.cache[keyToRemove];
  }

  updateMostRecent(node: DoublyLinkedListNode) {
    this.listOfMostRecent.setHeadTo(node);
  }

  replaceKey(key: string, value: number) {
    if (!(key in this.cache)) {
      throw new Error("The provided key isn't in the cache!");
    }
    this.cache[key].value = value;
  }
}

class DoublyLinkedList {
  head: DoublyLinkedListNode | null;
  tail: DoublyLinkedListNode | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  setHeadTo(node: DoublyLinkedListNode) {
    if (this.head === node) {
      return;
    } else if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else if (this.head === this.tail) {
      this.tail.prev = node;
      this.head = node;
      this.head.next = this.tail;
    } else {
      if (this.tail === node) this.removeTail();
      node.removeBindings();
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
  }

  removeTail() {
    if (this.tail === null) return;
    if (this.tail === this.head) {
      this.head = null;
      this.tail = null;
      return;
    }
    this.tail = this.tail.prev!;
    this.tail.next = null;
  }
}

class DoublyLinkedListNode {
  key: string;
  value: number;
  prev: DoublyLinkedListNode | null;
  next: DoublyLinkedListNode | null;

  constructor(key: string, value: number) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }

  removeBindings() {
    if (this.prev !== null) {
      this.prev.next = this.next;
    }
    if (this.next !== null) {
      this.next.prev = this.prev;
    }
    this.prev = null;
    this.next = null;
  }
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const lruCache = new program.LRUCache(3);
  lruCache.insertKeyValuePair('b', 2);
  lruCache.insertKeyValuePair('a', 1);
  lruCache.insertKeyValuePair('c', 3);
  chai.expect(lruCache.getMostRecentKey()).to.deep.equal('c');
  chai.expect(lruCache.getValueFromKey('a')).to.deep.equal(1);
  chai.expect(lruCache.getMostRecentKey()).to.deep.equal('a');
  lruCache.insertKeyValuePair('d', 4);
  chai.expect(lruCache.getValueFromKey('b')).to.deep.equal(null);
  lruCache.insertKeyValuePair('a', 5);
  chai.expect(lruCache.getValueFromKey('a')).to.deep.equal(5);
});

```

