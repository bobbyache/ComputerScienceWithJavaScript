# Calendar Matching
<div class="html">
<p>
  Imagine that you want to schedule a meeting of a certain duration with a
  co-worker. You have access to your calendar and your co-worker's calendar
  (both of which contain your respective meetings for the day, in the form of
  <span>[startTime, endTime]</span>), as well as both of your daily bounds
  (i.e., the earliest and latest times at which you're available for meetings
  every day, in the form of <span>[earliestTime, latestTime]</span>).
</p>
<p>
  Write a function that takes in your calendar, your daily bounds, your
  co-worker's calendar, your co-worker's daily bounds, and the duration of the
  meeting that you want to schedule, and that returns a list of all the time
  blocks (in the form of <span>[startTime, endTime]</span>) during which you
  could schedule the meeting, ordered from earliest time block to latest.
</p>
<p>
  Note that times will be given and should be returned in military time. For
  example: <span>8:30</span>, <span>9:01</span>, and <span>23:56</span>.
</p>
<p>
  Also note that the given calendar times will be sorted by start time in
  ascending order, as you would expect them to appear in a calendar application
  like Google Calendar.
</p>
<h3>Sample Input</h3>
<pre>
<span class="CodeEditor-promptParameter">calendar1</span> = [['9:00', '10:30'], ['12:00', '13:00'], ['16:00', '18:00']]
<span class="CodeEditor-promptParameter">dailyBounds1</span> = ['9:00', '20:00']
<span class="CodeEditor-promptParameter">calendar2</span> = [['10:00', '11:30'], ['12:30', '14:30'], ['14:30', '15:00'], ['16:00', '17:00']]
<span class="CodeEditor-promptParameter">dailyBounds2</span> = ['10:00', '18:30']
<span class="CodeEditor-promptParameter">meetingDuration</span> = 30
</pre>
<h3>Sample Output</h3>
<pre>
[['11:30', '12:00'], ['15:00', '16:00'], ['18:00', '18:30']]
</pre>
</div>

Hint 1
<p>
In order to find blocks of time during which you and your coworker can have a meeting, you have to first find all of the unavailabilities between the two of you. An unavailability is any block of time during which at least one of you is busy.
</p>


Hint 2

<p>
You'll have to start by taking into account the daily bounds; the daily bounds can be represented by two additional meetings in each of your calendars.
</p>


Hint 3

<p>
Once you've taken the daily bounds into account, you'll want to merge the two calendars into a single calendar of meetings and then flatten that calendar in order to eliminate overlapping and back-to-back meetings. This will give you a calendar of unavailabilities, from which you can pretty easily find the list of matching availabilities.
</p>

---
## Solutions
### Sandbox Code (cpp)
```cpp
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

bool compareCalendars(vector<StringMeeting> calendar1,
                      vector<StringMeeting> calendar2) {
  if (calendar1.size() != calendar2.size()) {
    return false;
  }
  for (int i = 0; i < calendar1.size(); i++) {
    if (calendar1[i].start != calendar2[i].start ||
        calendar1[i].end != calendar2[i].end)
      return false;
  }
  return true;
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<StringMeeting> calendar1 = {
          {"9:00", "10:30"}, {"12:00", "13:00"}, {"16:00", "18:00"}};
      StringMeeting dailyBounds1 = {"9:00", "20:00"};
      vector<StringMeeting> calendar2 = {{"10:00", "11:30"},
                                         {"12:30", "14:30"},
                                         {"14:30", "15:00"},
                                         {"16:00", "17:00"}};
      StringMeeting dailyBounds2 = {"10:00", "18:30"};
      int meetingDuration = 30;
      vector<StringMeeting> expected = {
          {"11:30", "12:00"}, {"15:00", "16:00"}, {"18:00", "18:30"}};
      vector<StringMeeting> actual = calendarMatching(
          calendar1, dailyBounds1, calendar2, dailyBounds2, meetingDuration);
      assert(compareCalendars(expected, actual));
    });
  }
};

```
### Solution 1 (cpp)
```cpp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

#include <cmath>
#include <vector>

using namespace std;

struct StringMeeting {
  string start;
  string end;
};

struct Meeting {
  int start;
  int end;
};

vector<Meeting> updateCalendar(vector<StringMeeting> calendar,
                               StringMeeting dailyBounds);
vector<Meeting> mergeCalendars(vector<Meeting> calendar1,
                               vector<Meeting> calendar2);
vector<Meeting> flattenCalendar(vector<Meeting> calendar);
vector<StringMeeting> getMatchingAvailabilities(vector<Meeting> calendar,
                                                int meetingDuration);
int timeToMinutes(string time);
string minutesToTime(int minutes);

// O(c1 + c2) time | O(c1 + c2) space - where c1 and c2 are the respective
// numbers of meetings in calendar1 and calendar2
vector<StringMeeting> calendarMatching(vector<StringMeeting> calendar1,
                                       StringMeeting dailyBounds1,
                                       vector<StringMeeting> calendar2,
                                       StringMeeting dailyBounds2,
                                       int meetingDuration) {
  vector<Meeting> updatedCalendar1 = updateCalendar(calendar1, dailyBounds1);
  vector<Meeting> updatedCalendar2 = updateCalendar(calendar2, dailyBounds2);
  vector<Meeting> mergedCalendar =
      mergeCalendars(updatedCalendar1, updatedCalendar2);
  vector<Meeting> flattenedCalendar = flattenCalendar(mergedCalendar);
  return getMatchingAvailabilities(flattenedCalendar, meetingDuration);
}

vector<Meeting> updateCalendar(vector<StringMeeting> calendar,
                               StringMeeting dailyBounds) {
  vector<StringMeeting> updatedCalendar;
  updatedCalendar.push_back({"0:00", dailyBounds.start});
  updatedCalendar.insert(updatedCalendar.end(), calendar.begin(),
                         calendar.end());
  updatedCalendar.push_back({dailyBounds.end, "23:59"});
  vector<Meeting> calendarInMinutes;
  for (int i = 0; i < updatedCalendar.size(); i++) {
    calendarInMinutes.push_back({timeToMinutes(updatedCalendar[i].start),
                                 timeToMinutes(updatedCalendar[i].end)});
  }
  return calendarInMinutes;
}

vector<Meeting> mergeCalendars(vector<Meeting> calendar1,
                               vector<Meeting> calendar2) {
  vector<Meeting> merged;
  int i = 0;
  int j = 0;
  while (i < calendar1.size() && j < calendar2.size()) {
    Meeting meeting1 = calendar1[i];
    Meeting meeting2 = calendar2[j];
    if (meeting1.start < meeting2.start) {
      merged.push_back(meeting1);
      i++;
    } else {
      merged.push_back(meeting2);
      j++;
    }
  }
  while (i < calendar1.size())
    merged.push_back(calendar1[i++]);
  while (j < calendar2.size())
    merged.push_back(calendar2[j++]);
  return merged;
}

vector<Meeting> flattenCalendar(vector<Meeting> calendar) {
  vector<Meeting> flattened = {calendar[0]};
  for (int i = 1; i < calendar.size(); i++) {
    Meeting currentMeeting = calendar[i];
    Meeting previousMeeting = flattened[flattened.size() - 1];
    if (previousMeeting.end >= currentMeeting.start) {
      Meeting newPreviousMeeting = {
          previousMeeting.start, max(previousMeeting.end, currentMeeting.end)};
      flattened[flattened.size() - 1] = newPreviousMeeting;
    } else {
      flattened.push_back(currentMeeting);
    }
  }
  return flattened;
}

vector<StringMeeting> getMatchingAvailabilities(vector<Meeting> calendar,
                                                int meetingDuration) {
  vector<Meeting> matchingAvailabilities;
  for (int i = 1; i < calendar.size(); i++) {
    int start = calendar[i - 1].end;
    int end = calendar[i].start;
    int availabilityDuration = end - start;
    if (availabilityDuration >= meetingDuration) {
      matchingAvailabilities.push_back({start, end});
    }
  }

  vector<StringMeeting> matchingAvailabilitiesInHours;
  for (int i = 0; i < matchingAvailabilities.size(); i++) {
    matchingAvailabilitiesInHours.push_back(
        {minutesToTime(matchingAvailabilities[i].start),
         minutesToTime(matchingAvailabilities[i].end)});
  }
  return matchingAvailabilitiesInHours;
}

int timeToMinutes(string time) {
  int delimiterPos = time.find(":");
  int hours = stoi(time.substr(0, delimiterPos));
  int minutes = stoi(time.substr(delimiterPos + 1, time.length()));
  return hours * 60 + minutes;
}

string minutesToTime(int minutes) {
  int hours = minutes / 60;
  int mins = minutes % 60;
  string hoursString = to_string(hours);
  string minutesString = mins < 10 ? "0" + to_string(mins) : to_string(mins);
  return hoursString + ":" + minutesString;
}

```
### Unit Tests 1 (cpp)
```cpp
bool compareCalendars(vector<StringMeeting> calendar1,
                      vector<StringMeeting> calendar2) {
  if (calendar1.size() != calendar2.size()) {
    return false;
  }
  for (int i = 0; i < calendar1.size(); i++) {
    if (calendar1[i].start != calendar2[i].start ||
        calendar1[i].end != calendar2[i].end)
      return false;
  }
  return true;
}

class ProgramTest : public TestSuite {
public:
  void Run() {
    RunTest("Test Case 1", []() {
      vector<StringMeeting> calendar1 = {
          {"9:00", "10:30"}, {"12:00", "13:00"}, {"16:00", "18:00"}};
      StringMeeting dailyBounds1 = {"9:00", "20:00"};
      vector<StringMeeting> calendar2 = {{"10:00", "11:30"},
                                         {"12:30", "14:30"},
                                         {"14:30", "15:00"},
                                         {"16:00", "17:00"}};
      StringMeeting dailyBounds2 = {"10:00", "18:30"};
      int meetingDuration = 30;
      vector<StringMeeting> expected = {
          {"11:30", "12:00"}, {"15:00", "16:00"}, {"18:00", "18:30"}};
      vector<StringMeeting> actual = calendarMatching(
          calendar1, dailyBounds1, calendar2, dailyBounds2, meetingDuration);
      assert(compareCalendars(expected, actual));
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

	public bool arraysEqual(List<Program.StringMeeting> arr1,
	  List<Program.StringMeeting> arr2) {
		if (arr1.Count != arr2.Count) return false;

		for (int i = 0; i < arr1.Count; i++) {
			if (
				!arr1[i].start.Equals(arr2[i].start) ||
				!arr1[i].end.Equals(arr2[i].end)
				) {
				return false;
			}
		}
		return true;
	}

	[Test]
	public void TestCase1() {
		List<Program.StringMeeting> calendar1 = new List<Program.StringMeeting>();
		calendar1.Add(new Program.StringMeeting("9:00", "10:30"));
		calendar1.Add(new Program.StringMeeting("12:00", "13:00"));
		calendar1.Add(new Program.StringMeeting("16:00", "18:00"));

		Program.StringMeeting dailyBounds1 = new Program.StringMeeting("9:00", "20:00");

		List<Program.StringMeeting> calendar2 = new List<Program.StringMeeting>();
		calendar2.Add(new Program.StringMeeting("10:00", "11:30"));
		calendar2.Add(new Program.StringMeeting("12:30", "14:30"));
		calendar2.Add(new Program.StringMeeting("14:30", "15:00"));
		calendar2.Add(new Program.StringMeeting("16:00", "17:00"));

		Program.StringMeeting dailyBounds2 = new Program.StringMeeting("10:00", "18:30");

		int meetingDuration = 30;

		List<Program.StringMeeting> expected = new List<Program.StringMeeting>();
		expected.Add(new Program.StringMeeting("11:30", "12:00"));
		expected.Add(new Program.StringMeeting("15:00", "16:00"));
		expected.Add(new Program.StringMeeting("18:00", "18:30"));

		List<Program.StringMeeting> actual = Program.CalendarMatching(calendar1,
		    dailyBounds1,
		    calendar2,
		    dailyBounds2,
		    meetingDuration);
		Utils.AssertTrue(arraysEqual(expected, actual));
	}
}

```
### Solution 1 (csharp)
```csharp
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

using System;
using System.Collections.Generic;

public class Program {
	// O(c1 + c2) time | O(c1 + c2) space - where c1 and c2 are the respective numbers of meetings in calendar1 and calendar2
	public static List<StringMeeting> CalendarMatching(
		List<StringMeeting> calendar1,
		StringMeeting dailyBounds1,
		List<StringMeeting> calendar2,
		StringMeeting dailyBounds2,
		int meetingDuration
		) {
		List<Meeting> updatedCalendar1 = updateCalendar(calendar1, dailyBounds1);
		List<Meeting> updatedCalendar2 = updateCalendar(calendar2, dailyBounds2);
		List<Meeting> mergedCalendar = mergeCalendars(updatedCalendar1, updatedCalendar2);
		List<Meeting> flattenedCalendar = flattenCalendar(mergedCalendar);
		return getMatchingAvailabilities(flattenedCalendar, meetingDuration);
	}

	public static List<Meeting> updateCalendar(
		List<StringMeeting> calendar,
		StringMeeting dailyBounds
		) {
		List<StringMeeting> updatedCalendar = new List<StringMeeting>();
		updatedCalendar.Add(new StringMeeting("0:00", dailyBounds.start));
		updatedCalendar.AddRange(calendar);
		updatedCalendar.Add(new StringMeeting(dailyBounds.end, "23:59"));
		List<Meeting> calendarInMinutes = new List<Meeting>();
		for (int i = 0; i < updatedCalendar.Count; i++) {
			calendarInMinutes.Add(new Meeting(
				  timeToMinutes(updatedCalendar[i].start),
				  timeToMinutes(updatedCalendar[i].end)
				  ));

		}
		return calendarInMinutes;
	}

	public static List<Meeting> mergeCalendars(
		List<Meeting> calendar1,
		List<Meeting> calendar2
		) {
		List<Meeting> merged = new List<Meeting>();
		int i = 0;
		int j = 0;
		while (i < calendar1.Count && j < calendar2.Count) {
			Meeting meeting1 = calendar1[i];
			Meeting meeting2 = calendar2[j];
			if (meeting1.start < meeting2.start) {
				merged.Add(meeting1);
				i++;
			} else {
				merged.Add(meeting2);
				j++;
			}
		}
		while (i < calendar1.Count) merged.Add(calendar1[i++]);
		while (j < calendar2.Count) merged.Add(calendar2[j++]);
		return merged;
	}

	public static List<Meeting> flattenCalendar(List<Meeting> calendar) {
		List<Meeting> flattened = new List<Meeting>();
		flattened.Add(calendar[0]);
		for (int i = 1; i < calendar.Count; i++) {
			Meeting currentMeeting = calendar[i];
			Meeting previousMeeting = flattened[flattened.Count - 1];
			if (previousMeeting.end >= currentMeeting.start) {
				Meeting newPreviousMeeting = new Meeting(
					previousMeeting.start,
					Math.Max(previousMeeting.end, currentMeeting.end)
					);
				flattened[flattened.Count - 1] = newPreviousMeeting;
			} else {
				flattened.Add(currentMeeting);
			}
		}
		return flattened;
	}

	public static List<StringMeeting> getMatchingAvailabilities(
		List<Meeting> calendar,
		int meetingDuration
		) {
		List<Meeting> matchingAvailabilities = new List<Meeting>();
		for (int i = 1; i < calendar.Count; i++) {
			int start = calendar[i - 1].end;
			int end = calendar[i].start;
			int availabilityDuration = end - start;
			if (availabilityDuration >= meetingDuration) {
				matchingAvailabilities.Add(new Meeting(start, end));
			}
		}
		List<StringMeeting> matchingAvailabilitiesInHours = new List<StringMeeting>();
		for (int i = 0; i < matchingAvailabilities.Count; i++) {
			matchingAvailabilitiesInHours.Add(new StringMeeting(
				  minutesToTime(
					  matchingAvailabilities[i].
					  start),
				  minutesToTime(
					  matchingAvailabilities[i].
					  end)
				  ));
		}
		return matchingAvailabilitiesInHours;
	}

	public static int timeToMinutes(string time) {
		int delimiterPos = time.IndexOf(":");
		int hours = Int32.Parse(time.Substring(0, delimiterPos));
		int minutes = Int32.Parse(time.Substring(delimiterPos + 1));
		return hours * 60 + minutes;
	}

	public static string minutesToTime(int minutes) {
		int hours = minutes / 60;
		int mins = minutes % 60;
		string hoursstring = hours.ToString();
		string minutesstring = mins < 10 ? "0" + mins.ToString() : mins.ToString();
		return hoursstring + ":" + minutesstring;
	}

	public class StringMeeting {
		public string start;
		public string end;

		public StringMeeting(string start, string end) {
			this.start = start;
			this.end = end;
		}
	}

	public class Meeting {
		public int start;
		public int end;

		public Meeting(int start, int end) {
			this.start = start;
			this.end = end;
		}
	}
}

```
### Unit Tests 1 (csharp)
```csharp
using System.Collections.Generic;

public class ProgramTest {

	public bool arraysEqual(List<Program.StringMeeting> arr1,
	  List<Program.StringMeeting> arr2) {
		if (arr1.Count != arr2.Count) return false;

		for (int i = 0; i < arr1.Count; i++) {
			if (
				!arr1[i].start.Equals(arr2[i].start) ||
				!arr1[i].end.Equals(arr2[i].end)
				) {
				return false;
			}
		}
		return true;
	}

	[Test]
	public void TestCase1() {
		List<Program.StringMeeting> calendar1 = new List<Program.StringMeeting>();
		calendar1.Add(new Program.StringMeeting("9:00", "10:30"));
		calendar1.Add(new Program.StringMeeting("12:00", "13:00"));
		calendar1.Add(new Program.StringMeeting("16:00", "18:00"));

		Program.StringMeeting dailyBounds1 = new Program.StringMeeting("9:00", "20:00");

		List<Program.StringMeeting> calendar2 = new List<Program.StringMeeting>();
		calendar2.Add(new Program.StringMeeting("10:00", "11:30"));
		calendar2.Add(new Program.StringMeeting("12:30", "14:30"));
		calendar2.Add(new Program.StringMeeting("14:30", "15:00"));
		calendar2.Add(new Program.StringMeeting("16:00", "17:00"));

		Program.StringMeeting dailyBounds2 = new Program.StringMeeting("10:00", "18:30");

		int meetingDuration = 30;

		List<Program.StringMeeting> expected = new List<Program.StringMeeting>();
		expected.Add(new Program.StringMeeting("11:30", "12:00"));
		expected.Add(new Program.StringMeeting("15:00", "16:00"));
		expected.Add(new Program.StringMeeting("18:00", "18:30"));

		List<Program.StringMeeting> actual = Program.CalendarMatching(calendar1,
		    dailyBounds1,
		    calendar2,
		    dailyBounds2,
		    meetingDuration);
		Utils.AssertTrue(arraysEqual(expected, actual));
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
	calendar1 := []StringMeeting{{"9:00", "10:30"}, {"12:00", "13:00"}, {"16:00", "18:00"}}
	dailyBounds1 := StringMeeting{"9:00", "20:00"}
	calendar2 := []StringMeeting{{"10:00", "11:30"}, {"12:30", "14:30"}, {"14:30", "15:00"}, {"16:00", "17:00"}}
	dailyBounds2 := StringMeeting{"10:00", "18:30"}
	meetingDuration := 30
	expected := []StringMeeting{{"11:30", "12:00"}, {"15:00", "16:00"}, {"18:00", "18:30"}}
	result := CalendarMatching(calendar1, dailyBounds1, calendar2, dailyBounds2, meetingDuration)
	require.Equal(t, result, expected)
}

```
### Solution 1 (go)
```go
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package main

import (
	"fmt"
	"strconv"
	"strings"
)

type StringMeeting struct {
	Start string
	End   string
}

type Meeting struct {
	Start int
	End   int
}

// O(c1 + c2) time | O(c1 + c2) space - where c1 and c2 are the respective
// numbers of meetings in calendar1 and calendar2.
func CalendarMatching(
	calendar1 []StringMeeting, dailyBounds1 StringMeeting,
	calendar2 []StringMeeting, dailyBounds2 StringMeeting,
	meetingDuration int,
) []StringMeeting {
	updatedCalendar1 := updateCalendar(calendar1, dailyBounds1)
	updatedCalendar2 := updateCalendar(calendar2, dailyBounds2)
	mergedCalendar := mergeCalendars(updatedCalendar1, updatedCalendar2)
	flattenedCalendar := flattenCalendar(mergedCalendar)
	return getMatchingAvailabilities(flattenedCalendar, meetingDuration)
}

func updateCalendar(calendar []StringMeeting, dailyBounds StringMeeting) []Meeting {
	updatedCalendar := append([]StringMeeting{
		{Start: "0:00", End: dailyBounds.Start},
	}, calendar...)
	updatedCalendar = append(updatedCalendar, StringMeeting{
		Start: dailyBounds.End, End: "23:59",
	})

	meetings := []Meeting{}
	for _, i := range updatedCalendar {
		meetings = append(meetings, Meeting{
			Start: timeToMinutes(i.Start),
			End:   timeToMinutes(i.End),
		})
	}
	return meetings
}

func mergeCalendars(calendar1, calendar2 []Meeting) []Meeting {
	merged := []Meeting{}
	i, j := 0, 0
	for i < len(calendar1) && j < len(calendar2) {
		meeting1, meeting2 := calendar1[i], calendar2[j]
		if meeting1.Start < meeting2.Start {
			merged = append(merged, meeting1)
			i++
		} else {
			merged = append(merged, meeting2)
			j++
		}
	}

	for i < len(calendar1) {
		merged = append(merged, calendar1[i])
		i++
	}
	for j < len(calendar2) {
		merged = append(merged, calendar2[j])
		j++
	}
	return merged
}

func flattenCalendar(calendar []Meeting) []Meeting {
	flattened := []Meeting{calendar[0]}
	for i := 1; i < len(calendar); i++ {
		currentMeeting := calendar[i]
		previousMeeting := flattened[len(flattened)-1]
		if previousMeeting.End >= currentMeeting.Start {
			newPreviousMeeting := Meeting{
				Start: previousMeeting.Start,
				End:   max(previousMeeting.End, currentMeeting.End),
			}
			flattened[len(flattened)-1] = newPreviousMeeting
		} else {
			flattened = append(flattened, currentMeeting)
		}
	}
	return flattened
}

func getMatchingAvailabilities(calendar []Meeting, meetingDuration int) []StringMeeting {
	matchingAvailabilities := []StringMeeting{}
	for i := 1; i < len(calendar); i++ {
		start := calendar[i-1].End
		end := calendar[i].Start
		availabilityDuration := end - start
		if availabilityDuration >= meetingDuration {
			matchingAvailabilities = append(matchingAvailabilities, StringMeeting{
				Start: minutesToTime(start),
				End:   minutesToTime(end),
			})
		}
	}
	return matchingAvailabilities
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func timeToMinutes(time string) int {
	split := strings.SplitN(time, ":", 2)
	hours, _ := strconv.Atoi(split[0])
	minutes, _ := strconv.Atoi(split[1])
	return hours*60 + minutes
}

func minutesToTime(minutes int) string {
	hours, minutes := minutes/60, minutes%60
	return fmt.Sprintf("%d:%02d", hours, minutes)
}

```
### Unit Tests 1 (go)
```go
package main

import (
	"github.com/stretchr/testify/require"
)

func (s *TestSuite) TestCase1(t *TestCase) {
	calendar1 := []StringMeeting{{"9:00", "10:30"}, {"12:00", "13:00"}, {"16:00", "18:00"}}
	dailyBounds1 := StringMeeting{"9:00", "20:00"}
	calendar2 := []StringMeeting{{"10:00", "11:30"}, {"12:30", "14:30"}, {"14:30", "15:00"}, {"16:00", "17:00"}}
	dailyBounds2 := StringMeeting{"10:00", "18:30"}
	meetingDuration := 30
	expected := []StringMeeting{{"11:30", "12:00"}, {"15:00", "16:00"}, {"18:00", "18:30"}}
	result := CalendarMatching(calendar1, dailyBounds1, calendar2, dailyBounds2, meetingDuration)
	require.Equal(t, result, expected)
}

```
### Sandbox Code (java)
```java
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import java.util.*;

class ProgramTest {

  public boolean arraysEqual(List<Program.StringMeeting> arr1, List<Program.StringMeeting> arr2) {
    if (arr1.size() != arr2.size()) return false;

    for (int i = 0; i < arr1.size(); i++) {
      if (!arr1.get(i).start.equals(arr2.get(i).start)
          || !arr1.get(i).end.equals(arr2.get(i).end)) {
        return false;
      }
    }
    return true;
  }

  @Test
  public void TestCase1() {
    List<Program.StringMeeting> calendar1 = new ArrayList<Program.StringMeeting>();
    calendar1.add(new Program.StringMeeting("9:00", "10:30"));
    calendar1.add(new Program.StringMeeting("12:00", "13:00"));
    calendar1.add(new Program.StringMeeting("16:00", "18:00"));

    Program.StringMeeting dailyBounds1 = new Program.StringMeeting("9:00", "20:00");

    List<Program.StringMeeting> calendar2 = new ArrayList<Program.StringMeeting>();
    calendar2.add(new Program.StringMeeting("10:00", "11:30"));
    calendar2.add(new Program.StringMeeting("12:30", "14:30"));
    calendar2.add(new Program.StringMeeting("14:30", "15:00"));
    calendar2.add(new Program.StringMeeting("16:00", "17:00"));

    Program.StringMeeting dailyBounds2 = new Program.StringMeeting("10:00", "18:30");

    int meetingDuration = 30;

    List<Program.StringMeeting> expected = new ArrayList<Program.StringMeeting>();
    expected.add(new Program.StringMeeting("11:30", "12:00"));
    expected.add(new Program.StringMeeting("15:00", "16:00"));
    expected.add(new Program.StringMeeting("18:00", "18:30"));

    List<Program.StringMeeting> actual =
        Program.calendarMatching(calendar1, dailyBounds1, calendar2, dailyBounds2, meetingDuration);
    Utils.assertTrue(arraysEqual(expected, actual));
  }
}

```
### Solution 1 (java)
```java
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

import java.util.*;

class Program {
  // O(c1 + c2) time | O(c1 + c2) space - where c1 and c2 are the respective numbers of meetings
  // in calendar1 and calendar2
  public static List<StringMeeting> calendarMatching(
      List<StringMeeting> calendar1,
      StringMeeting dailyBounds1,
      List<StringMeeting> calendar2,
      StringMeeting dailyBounds2,
      int meetingDuration) {
    List<Meeting> updatedCalendar1 = updateCalendar(calendar1, dailyBounds1);
    List<Meeting> updatedCalendar2 = updateCalendar(calendar2, dailyBounds2);
    List<Meeting> mergedCalendar = mergeCalendars(updatedCalendar1, updatedCalendar2);
    List<Meeting> flattenedCalendar = flattenCalendar(mergedCalendar);
    return getMatchingAvailabilities(flattenedCalendar, meetingDuration);
  }

  public static List<Meeting> updateCalendar(
      List<StringMeeting> calendar, StringMeeting dailyBounds) {
    List<StringMeeting> updatedCalendar = new ArrayList<StringMeeting>();
    updatedCalendar.add(new StringMeeting("0:00", dailyBounds.start));
    updatedCalendar.addAll(calendar);
    updatedCalendar.add(new StringMeeting(dailyBounds.end, "23:59"));
    List<Meeting> calendarInMinutes = new ArrayList<Meeting>();
    for (int i = 0; i < updatedCalendar.size(); i++) {
      calendarInMinutes.add(
          new Meeting(
              timeToMinutes(updatedCalendar.get(i).start),
              timeToMinutes(updatedCalendar.get(i).end)));
    }
    return calendarInMinutes;
  }

  public static List<Meeting> mergeCalendars(List<Meeting> calendar1, List<Meeting> calendar2) {
    List<Meeting> merged = new ArrayList<Meeting>();
    int i = 0;
    int j = 0;
    while (i < calendar1.size() && j < calendar2.size()) {
      Meeting meeting1 = calendar1.get(i);
      Meeting meeting2 = calendar2.get(j);
      if (meeting1.start < meeting2.start) {
        merged.add(meeting1);
        i++;
      } else {
        merged.add(meeting2);
        j++;
      }
    }
    while (i < calendar1.size()) merged.add(calendar1.get(i++));
    while (j < calendar2.size()) merged.add(calendar2.get(j++));
    return merged;
  }

  public static List<Meeting> flattenCalendar(List<Meeting> calendar) {
    List<Meeting> flattened = new ArrayList<Meeting>();
    flattened.add(calendar.get(0));
    for (int i = 1; i < calendar.size(); i++) {
      Meeting currentMeeting = calendar.get(i);
      Meeting previousMeeting = flattened.get(flattened.size() - 1);
      if (previousMeeting.end >= currentMeeting.start) {
        Meeting newPreviousMeeting =
            new Meeting(previousMeeting.start, Math.max(previousMeeting.end, currentMeeting.end));
        flattened.set(flattened.size() - 1, newPreviousMeeting);
      } else {
        flattened.add(currentMeeting);
      }
    }
    return flattened;
  }

  public static List<StringMeeting> getMatchingAvailabilities(
      List<Meeting> calendar, int meetingDuration) {
    List<Meeting> matchingAvailabilities = new ArrayList<Meeting>();
    for (int i = 1; i < calendar.size(); i++) {
      int start = calendar.get(i - 1).end;
      int end = calendar.get(i).start;
      int availabilityDuration = end - start;
      if (availabilityDuration >= meetingDuration) {
        matchingAvailabilities.add(new Meeting(start, end));
      }
    }
    List<StringMeeting> matchingAvailabilitiesInHours = new ArrayList<StringMeeting>();
    for (int i = 0; i < matchingAvailabilities.size(); i++) {
      matchingAvailabilitiesInHours.add(
          new StringMeeting(
              minutesToTime(matchingAvailabilities.get(i).start),
              minutesToTime(matchingAvailabilities.get(i).end)));
    }
    return matchingAvailabilitiesInHours;
  }

  public static int timeToMinutes(String time) {
    int delimiterPos = time.indexOf(":");
    int hours = Integer.parseInt(time.substring(0, delimiterPos));
    int minutes = Integer.parseInt(time.substring(delimiterPos + 1, time.length()));
    return hours * 60 + minutes;
  }

  public static String minutesToTime(int minutes) {
    int hours = minutes / 60;
    int mins = minutes % 60;
    String hoursString = Integer.toString(hours);
    String minutesString = mins < 10 ? "0" + Integer.toString(mins) : Integer.toString(mins);
    return hoursString + ":" + minutesString;
  }

  static class StringMeeting {
    public String start;
    public String end;

    public StringMeeting(String start, String end) {
      this.start = start;
      this.end = end;
    }
  }

  static class Meeting {
    public int start;
    public int end;

    public Meeting(int start, int end) {
      this.start = start;
      this.end = end;
    }
  }
}

```
### Unit Tests 1 (java)
```java
import java.util.*;

class ProgramTest {

  public boolean arraysEqual(List<Program.StringMeeting> arr1, List<Program.StringMeeting> arr2) {
    if (arr1.size() != arr2.size()) return false;

    for (int i = 0; i < arr1.size(); i++) {
      if (!arr1.get(i).start.equals(arr2.get(i).start)
          || !arr1.get(i).end.equals(arr2.get(i).end)) {
        return false;
      }
    }
    return true;
  }

  @Test
  public void TestCase1() {
    List<Program.StringMeeting> calendar1 = new ArrayList<Program.StringMeeting>();
    calendar1.add(new Program.StringMeeting("9:00", "10:30"));
    calendar1.add(new Program.StringMeeting("12:00", "13:00"));
    calendar1.add(new Program.StringMeeting("16:00", "18:00"));

    Program.StringMeeting dailyBounds1 = new Program.StringMeeting("9:00", "20:00");

    List<Program.StringMeeting> calendar2 = new ArrayList<Program.StringMeeting>();
    calendar2.add(new Program.StringMeeting("10:00", "11:30"));
    calendar2.add(new Program.StringMeeting("12:30", "14:30"));
    calendar2.add(new Program.StringMeeting("14:30", "15:00"));
    calendar2.add(new Program.StringMeeting("16:00", "17:00"));

    Program.StringMeeting dailyBounds2 = new Program.StringMeeting("10:00", "18:30");

    int meetingDuration = 30;

    List<Program.StringMeeting> expected = new ArrayList<Program.StringMeeting>();
    expected.add(new Program.StringMeeting("11:30", "12:00"));
    expected.add(new Program.StringMeeting("15:00", "16:00"));
    expected.add(new Program.StringMeeting("18:00", "18:30"));

    List<Program.StringMeeting> actual =
        Program.calendarMatching(calendar1, dailyBounds1, calendar2, dailyBounds2, meetingDuration);
    Utils.assertTrue(arraysEqual(expected, actual));
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
  const calendar1 = [
    ['9:00', '10:30'],
    ['12:00', '13:00'],
    ['16:00', '18:00'],
  ];
  const dailyBounds1 = ['9:00', '20:00'];
  const calendar2 = [
    ['10:00', '11:30'],
    ['12:30', '14:30'],
    ['14:30', '15:00'],
    ['16:00', '17:00'],
  ];
  const dailyBounds2 = ['10:00', '18:30'];
  const meetingDuration = 30;
  const expected = [
    ['11:30', '12:00'],
    ['15:00', '16:00'],
    ['18:00', '18:30'],
  ];
  const result = program.calendarMatching(calendar1, dailyBounds1, calendar2, dailyBounds2, meetingDuration);
  chai.expect(result).to.deep.equal(expected);
});

```
### Solution 1 (javascript)
```javascript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(c1 + c2) time | O(c1 + c2) space - where c1 and c2 are the respective numbers of meetings in calendar1 and calendar2
function calendarMatching(calendar1, dailyBounds1, calendar2, dailyBounds2, meetingDuration) {
  const updatedCalendar1 = updateCalendar(calendar1, dailyBounds1);
  const updatedCalendar2 = updateCalendar(calendar2, dailyBounds2);
  const mergedCalendar = mergeCalendars(updatedCalendar1, updatedCalendar2);
  const flattenedCalendar = flattenCalendar(mergedCalendar);
  return getMatchingAvailabilities(flattenedCalendar, meetingDuration);
}

function updateCalendar(calendar, dailyBounds) {
  const updatedCalendar = [['0:00', dailyBounds[0]], ...calendar, [dailyBounds[1], '23:59']];
  return updatedCalendar.map(meeting => meeting.map(timeToMinutes));
}

function mergeCalendars(calendar1, calendar2) {
  const merged = [];
  let i = 0;
  let j = 0;
  while (i < calendar1.length && j < calendar2.length) {
    const meeting1 = calendar1[i];
    const meeting2 = calendar2[j];
    if (meeting1[0] < meeting2[0]) {
      merged.push(meeting1);
      i++;
    } else {
      merged.push(meeting2);
      j++;
    }
  }
  while (i < calendar1.length) merged.push(calendar1[i++]);
  while (j < calendar2.length) merged.push(calendar2[j++]);
  return merged;
}

function flattenCalendar(calendar) {
  const flattened = [calendar[0].slice()];
  for (let i = 1; i < calendar.length; i++) {
    const currentMeeting = calendar[i];
    const previousMeeting = flattened[flattened.length - 1];
    const [currentStart, currentEnd] = currentMeeting;
    const [previousStart, previousEnd] = previousMeeting;
    if (previousEnd >= currentStart) {
      const newPreviousMeeting = [previousStart, Math.max(previousEnd, currentEnd)];
      flattened[flattened.length - 1] = newPreviousMeeting;
    } else {
      flattened.push(currentMeeting.slice());
    }
  }
  return flattened;
}

function getMatchingAvailabilities(calendar, meetingDuration) {
  const matchingAvailabilities = [];
  for (let i = 1; i < calendar.length; i++) {
    const start = calendar[i - 1][1];
    const end = calendar[i][0];
    const availabilityDuration = end - start;
    if (availabilityDuration >= meetingDuration) {
      matchingAvailabilities.push([start, end]);
    }
  }
  return matchingAvailabilities.map(meeting => meeting.map(minutesToTime));
}

function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(str => parseInt(str));
  return hours * 60 + minutes;
}

function minutesToTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const hoursString = hours.toString();
  const minutesString = mins < 10 ? '0' + mins.toString() : mins.toString();
  return hoursString + ':' + minutesString;
}

exports.calendarMatching = calendarMatching;

```
### Unit Tests 1 (javascript)
```javascript
const program = require('./program');
const chai = require('chai');

it('Test Case #1', function () {
  const calendar1 = [
    ['9:00', '10:30'],
    ['12:00', '13:00'],
    ['16:00', '18:00'],
  ];
  const dailyBounds1 = ['9:00', '20:00'];
  const calendar2 = [
    ['10:00', '11:30'],
    ['12:30', '14:30'],
    ['14:30', '15:00'],
    ['16:00', '17:00'],
  ];
  const dailyBounds2 = ['10:00', '18:30'];
  const meetingDuration = 30;
  const expected = [
    ['11:30', '12:00'],
    ['15:00', '16:00'],
    ['18:00', '18:30'],
  ];
  const result = program.calendarMatching(calendar1, dailyBounds1, calendar2, dailyBounds2, meetingDuration);
  chai.expect(result).to.deep.equal(expected);
});

```
### Sandbox Code (kotlin)
```kotlin
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import com.algoexpert.program.calendarMatching as calendarMatching

class ProgramTest {
    @Test
    fun TestCase1() {
        val calendar1 = listOf<List<String>>(
            listOf("9:00", "10:30"),
            listOf("12:00", "13:00"),
            listOf("16:00", "18:00")
        )
        val dailyBounds1 = listOf("9:00", "20:00")
        val calendar2 = listOf<List<String>>(
            listOf("10:00", "11:30"),
            listOf("12:30", "14:30"),
            listOf("14:30", "15:00"),
            listOf("16:00", "17:00")
        )
        val dailyBounds2 = listOf("10:00", "18:30")
        val meetingDuration = 30
        val expected = listOf<List<String>>(
            listOf("11:30", "12:00"),
            listOf("15:00", "16:00"),
            listOf("18:00", "18:30")
        )
        val output = calendarMatching(calendar1, dailyBounds1, calendar2, dailyBounds2, meetingDuration)
        assert(output.equals(expected))
    }
}

```
### Solution 1 (kotlin)
```kotlin
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

package com.algoexpert.program

import kotlin.math.max

// O(c1 + c2) time | O(c1 + c2) space - where c1 and c2 are the respective numbers of meetings in calendar1 and calendar2
fun calendarMatching(calendar1: List<List<String>>, dailyBounds1: List<String>, calendar2: List<List<String>>, dailyBounds2: List<String>, meetingDuration: Int): List<List<String>> {
    val updatedCalendar1 = updateCalendar(calendar1, dailyBounds1)
    val updatedCalendar2 = updateCalendar(calendar2, dailyBounds2)
    val mergedCalendar = mergeCalendars(updatedCalendar1, updatedCalendar2)
    val flattenedCalendar = flattenCalendar(mergedCalendar)
    return getMatchingAvailabilities(flattenedCalendar, meetingDuration)
}

fun updateCalendar(calendar: List<List<String>>, dailyBounds: List<String>): List<List<Int>> {
    val updatedCalendar =
        listOf<List<String>>(listOf<String>("0:00", dailyBounds[0])) +
            calendar +
            listOf<List<String>>(listOf<String>(dailyBounds[1], "23:59"))
    return updatedCalendar.map { meeting -> meeting.map { t -> timeToMinutes(t) } }
}

fun mergeCalendars(calendar1: List<List<Int>>, calendar2: List<List<Int>>): List<List<Int>> {
    val merged = mutableListOf<List<Int>>()
    var i = 0
    var j = 0
    while (i < calendar1.size && j < calendar2.size) {
        val meeting1 = calendar1[i]
        val meeting2 = calendar2[j]
        if (meeting1[0] < meeting2[0]) {
            merged.add(meeting1)
            i++
        } else {
            merged.add(meeting2)
            j++
        }
    }
    while (i < calendar1.size) merged.add(calendar1[i++])
    while (j < calendar2.size) merged.add(calendar2[j++])
    return merged
}

fun flattenCalendar(calendar: List<List<Int>>): List<List<Int>> {
    val flattened = mutableListOf<List<Int>>(listOf<Int>(calendar[0][0], calendar[0][1]))
    for (i in 0 until calendar.size) {
        val currentMeeting = calendar[i]
        val previousMeeting = flattened[flattened.size - 1]
        val (currentStart, currentEnd) = currentMeeting
        val (previousStart, previousEnd) = previousMeeting
        if (previousEnd >= currentStart) {
            val newPreviousMeeting = listOf<Int>(previousStart, max(previousEnd, currentEnd))
            flattened[flattened.size - 1] = newPreviousMeeting
        } else {
            flattened.add(listOf<Int>(currentMeeting[0], currentMeeting[1]))
        }
    }
    return flattened
}

fun getMatchingAvailabilities(calendar: List<List<Int>>, meetingDuration: Int): List<List<String>> {
    val matchingAvailabilities = mutableListOf<List<Int>>()
    for (i in 1 until calendar.size) {
        val start = calendar[i - 1][1]
        val end = calendar[i][0]
        val availabilityDuration = end - start
        if (availabilityDuration >= meetingDuration) {
            matchingAvailabilities.add(listOf<Int>(start, end))
        }
    }
    return matchingAvailabilities.map { meeting -> meeting.map { t -> minutesToTime(t) } }
}

fun timeToMinutes(time: String): Int {
    val (hours, minutes) = time.split(":").map { str -> str.toInt() }
    return hours * 60 + minutes
}

fun minutesToTime(minutes: Int): String {
    val hours = minutes / 60
    val mins = minutes % 60
    val hoursString = hours.toString()
    val minutesString = if (mins < 10) "0" + mins.toString() else mins.toString()
    return hoursString + ':' + minutesString
}

```
### Unit Tests 1 (kotlin)
```kotlin
import com.algoexpert.program.calendarMatching as calendarMatching

class ProgramTest {
    @Test
    fun TestCase1() {
        val calendar1 = listOf<List<String>>(
            listOf("9:00", "10:30"),
            listOf("12:00", "13:00"),
            listOf("16:00", "18:00")
        )
        val dailyBounds1 = listOf("9:00", "20:00")
        val calendar2 = listOf<List<String>>(
            listOf("10:00", "11:30"),
            listOf("12:30", "14:30"),
            listOf("14:30", "15:00"),
            listOf("16:00", "17:00")
        )
        val dailyBounds2 = listOf("10:00", "18:30")
        val meetingDuration = 30
        val expected = listOf<List<String>>(
            listOf("11:30", "12:00"),
            listOf("15:00", "16:00"),
            listOf("18:00", "18:30")
        )
        val output = calendarMatching(calendar1, dailyBounds1, calendar2, dailyBounds2, meetingDuration)
        assert(output.equals(expected))
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
      let calendar1 = [["9:00", "10:30"], ["12:00", "13:00"], ["16:00", "18:00"]]
      let dailyBounds1 = ["9:00", "20:00"]
      let calendar2 = [["10:00", "11:30"], ["12:30", "14:30"], ["14:30", "15:00"], ["16:00", "17:00"]]
      let dailyBounds2 = ["10:00", "18:30"]
      let meetingDuration = 30
      let expected = [["11:30", "12:00"], ["15:00", "16:00"], ["18:00", "18:30"]]
      let result = program.calendarMatching(calendar1, dailyBounds1, calendar2, dailyBounds2, meetingDuration)
      try assertEqual(expected, result)
    }
  }
}

```
### Solution 1 (swift)
```swift
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

class Program {
  // O(c1 + c2) time | O(c1 + c2) space
  func calendarMatching(_ calendar1: [[String]], _ dailyBounds1: [String], _ calendar2: [[String]], _ dailyBounds2: [String], _ meetingDuration: Int) -> [[String]] {
    let updatedCalendar1 = updateCalendar(calendar1, dailyBounds1)
    let updatedCalendar2 = updateCalendar(calendar2, dailyBounds2)

    let mergedCalendar = mergeCalendars(updatedCalendar1, updatedCalendar2)
    let flattenedCalendar = flattenCalendar(mergedCalendar)

    return getMatchingAvailabilities(flattenedCalendar, meetingDuration)
  }

  func updateCalendar(_ calendar: [[String]], _ dailyBounds: [String]) -> [[Int]] {
    let lowerBound = ["0:00", dailyBounds[0]]
    let upperBound = [dailyBounds[1], "23:59"]
    var updatedCalendar = [[String]]()

    updatedCalendar.append(lowerBound)
    updatedCalendar.append(contentsOf: calendar)
    updatedCalendar.append(upperBound)

    return updatedCalendar.map { $0.map { timeToMinutes($0) } }
  }

  func mergeCalendars(_ calendar1: [[Int]], _ calendar2: [[Int]]) -> [[Int]] {
    var i = 0
    var j = 0
    var merged = [[Int]]()

    while i < calendar1.count, j < calendar2.count {
      let meeting1 = calendar1[i]
      let meeting2 = calendar2[j]

      if meeting1[0] < meeting2[0] {
        merged.append(meeting1)
        i += 1
      } else {
        merged.append(meeting2)
        j += 1
      }
    }

    while i < calendar1.count {
      merged.append(calendar1[i])
      i += 1
    }

    while j < calendar2.count {
      merged.append(calendar2[j])
      j += 1
    }

    return merged
  }

  func flattenCalendar(_ calendar: [[Int]]) -> [[Int]] {
    let firstEntry = calendar[0]
    var flattened = [[Int]]()
    flattened.append(firstEntry)

    for currentMeeting in calendar {
      if let previousMeeting = flattened.last, let currentStart = currentMeeting.first, let currentEnd = currentMeeting.last, let previousStart = previousMeeting.first, let previousEnd = previousMeeting.last {
        if previousEnd >= currentStart {
          let newPreviousMeeting = [previousStart, max(previousEnd, currentEnd)]
          flattened[flattened.count - 1] = newPreviousMeeting
        } else {
          flattened.append(currentMeeting)
        }
      }
    }

    return flattened
  }

  func getMatchingAvailabilities(_ calendar: [[Int]], _ meetingDuration: Int) -> [[String]] {
    var matchingAvailabilities = [[Int]]()

    for i in 1 ..< calendar.count {
      let start = calendar[i - 1][1]
      let end = calendar[i][0]

      let availabilityDuration = end - start
      if availabilityDuration >= meetingDuration {
        matchingAvailabilities.append([start, end])
      }
    }

    return matchingAvailabilities.map { $0.map { minutesToTime($0) } }
  }

  func timeToMinutes(_ string: String) -> Int {
    let separatedComponents = string.split(separator: ":").map { Int($0) }

    if let hours = separatedComponents[0], let minutes = separatedComponents[1] {
      return (hours * 60) + minutes
    }

    return 0
  }

  func minutesToTime(_ minutes: Int) -> String {
    var hours = (Double(minutes) / 60)
    hours = hours.rounded(.down)

    let mins = minutes % 60

    let hoursString = "\(Int(hours))"
    let minsString = mins < 10 ? "0" + "\(mins)" : "\(mins)"

    return hoursString + ":" + minsString
  }
}

```
### Unit Tests 1 (swift)
```swift
class ProgramTest: TestSuite {
  func test() {
    let program = Program()
    runTest("Test Case 1") { () throws -> Void in
      let calendar1 = [["9:00", "10:30"], ["12:00", "13:00"], ["16:00", "18:00"]]
      let dailyBounds1 = ["9:00", "20:00"]
      let calendar2 = [["10:00", "11:30"], ["12:30", "14:30"], ["14:30", "15:00"], ["16:00", "17:00"]]
      let dailyBounds2 = ["10:00", "18:30"]
      let meetingDuration = 30
      let expected = [["11:30", "12:00"], ["15:00", "16:00"], ["18:00", "18:30"]]
      let result = program.calendarMatching(calendar1, dailyBounds1, calendar2, dailyBounds2, meetingDuration)
      try assertEqual(expected, result)
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
        calendar1 = [["9:00", "10:30"], ["12:00", "13:00"], ["16:00", "18:00"]]
        dailyBounds1 = ["9:00", "20:00"]
        calendar2 = [["10:00", "11:30"], ["12:30", "14:30"], ["14:30", "15:00"], ["16:00", "17:00"]]
        dailyBounds2 = ["10:00", "18:30"]
        meetingDuration = 30
        expected = [["11:30", "12:00"], ["15:00", "16:00"], ["18:00", "18:30"]]
        result = program.calendarMatching(calendar1, dailyBounds1, calendar2, dailyBounds2, meetingDuration)
        self.assertEqual(result, expected)

```
### Solution 1 (python)
```python
# Copyright © 2023 AlgoExpert LLC. All rights reserved.

# O(c1 + c2) time | O(c1 + c2) space - where c1 and c2 are the respective numbers of meetings in calendar1 and calendar2
def calendarMatching(calendar1, dailyBounds1, calendar2, dailyBounds2, meetingDuration):
    updatedCalendar1 = updateCalendar(calendar1, dailyBounds1)
    updatedCalendar2 = updateCalendar(calendar2, dailyBounds2)
    mergedCalendar = mergeCalendars(updatedCalendar1, updatedCalendar2)
    flattenedCalendar = flattenCalendar(mergedCalendar)
    return getMatchingAvailabilities(flattenedCalendar, meetingDuration)


def updateCalendar(calendar, dailyBounds):
    updatedCalendar = calendar[:]
    updatedCalendar.insert(0, ["0:00", dailyBounds[0]])
    updatedCalendar.append([dailyBounds[1], "23:59"])
    return list(map(lambda m: [timeToMinutes(m[0]), timeToMinutes(m[1])], updatedCalendar))


def mergeCalendars(calendar1, calendar2):
    merged = []
    i, j = 0, 0
    while i < len(calendar1) and j < len(calendar2):
        meeting1, meeting2 = calendar1[i], calendar2[j]
        if meeting1[0] < meeting2[0]:
            merged.append(meeting1)
            i += 1
        else:
            merged.append(meeting2)
            j += 1
    while i < len(calendar1):
        merged.append(calendar1[i])
        i += 1
    while j < len(calendar2):
        merged.append(calendar2[j])
        j += 1
    return merged


def flattenCalendar(calendar):
    flattened = [calendar[0][:]]
    for i in range(1, len(calendar)):
        currentMeeting = calendar[i]
        previousMeeting = flattened[-1]
        currentStart, currentEnd = currentMeeting
        previousStart, previousEnd = previousMeeting
        if previousEnd >= currentStart:
            newPreviousMeeting = [previousStart, max(previousEnd, currentEnd)]
            flattened[-1] = newPreviousMeeting
        else:
            flattened.append(currentMeeting[:])
    return flattened


def getMatchingAvailabilities(calendar, meetingDuration):
    matchingAvailabilities = []
    for i in range(1, len(calendar)):
        start = calendar[i - 1][1]
        end = calendar[i][0]
        availabilityDuration = end - start
        if availabilityDuration >= meetingDuration:
            matchingAvailabilities.append([start, end])
    return list(map(lambda m: [minutesToTime(m[0]), minutesToTime(m[1])], matchingAvailabilities))


def timeToMinutes(time):
    hours, minutes = list(map(int, time.split(":")))
    return hours * 60 + minutes


def minutesToTime(minutes):
    hours = minutes // 60
    mins = minutes % 60
    hoursString = str(hours)
    minutesString = "0" + str(mins) if mins < 10 else str(mins)
    return hoursString + ":" + minutesString

```
### Unit Tests 1 (python)
```python
import program
import unittest


class TestProgram(unittest.TestCase):
    def test_case_1(self):
        calendar1 = [["9:00", "10:30"], ["12:00", "13:00"], ["16:00", "18:00"]]
        dailyBounds1 = ["9:00", "20:00"]
        calendar2 = [["10:00", "11:30"], ["12:30", "14:30"], ["14:30", "15:00"], ["16:00", "17:00"]]
        dailyBounds2 = ["10:00", "18:30"]
        meetingDuration = 30
        expected = [["11:30", "12:00"], ["15:00", "16:00"], ["18:00", "18:30"]]
        result = program.calendarMatching(calendar1, dailyBounds1, calendar2, dailyBounds2, meetingDuration)
        self.assertEqual(result, expected)

```
### Sandbox Code (typescript)
```typescript
// This file is initialized with a code version of this
// question's sample test case. Feel free to add, edit,
// or remove test cases in this file as you see fit!

import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const calendar1 = [
    ['9:00', '10:30'],
    ['12:00', '13:00'],
    ['16:00', '18:00'],
  ];
  const dailyBounds1: [string, string] = ['9:00', '20:00'];
  const calendar2 = [
    ['10:00', '11:30'],
    ['12:30', '14:30'],
    ['14:30', '15:00'],
    ['16:00', '17:00'],
  ];
  const dailyBounds2: [string, string] = ['10:00', '18:30'];
  const meetingDuration = 30;
  const expected = [
    ['11:30', '12:00'],
    ['15:00', '16:00'],
    ['18:00', '18:30'],
  ];
  const result = program.calendarMatching(calendar1, dailyBounds1, calendar2, dailyBounds2, meetingDuration);
  chai.expect(result).to.deep.equal(expected);
});

```
### Solution 1 (typescript)
```typescript
// Copyright © 2023 AlgoExpert LLC. All rights reserved.

// O(c1 + c2) time | O(c1 + c2) space - where c1 and c2 are the respective numbers of meetings in calendar1 and calendar2
export function calendarMatching(
  calendar1: string[][],
  dailyBounds1: [string, string],
  calendar2: string[][],
  dailyBounds2: [string, string],
  meetingDuration: number,
) {
  const updatedCalendar1 = updateCalendar(calendar1, dailyBounds1);
  const updatedCalendar2 = updateCalendar(calendar2, dailyBounds2);
  const mergedCalendar = mergeCalendars(updatedCalendar1, updatedCalendar2);
  const flattenedCalendar = flattenCalendar(mergedCalendar);
  return getMatchingAvailabilities(flattenedCalendar, meetingDuration);
}

function updateCalendar(calendar: string[][], dailyBounds: [string, string]) {
  const updatedCalendar = [['0:00', dailyBounds[0]], ...calendar, [dailyBounds[1], '23:59']];
  return updatedCalendar.map(meeting => meeting.map(timeToMinutes));
}

function mergeCalendars(calendar1: number[][], calendar2: number[][]) {
  const merged: number[][] = [];
  let i = 0;
  let j = 0;
  while (i < calendar1.length && j < calendar2.length) {
    const meeting1 = calendar1[i];
    const meeting2 = calendar2[j];
    if (meeting1[0] < meeting2[0]) {
      merged.push(meeting1);
      i++;
    } else {
      merged.push(meeting2);
      j++;
    }
  }
  while (i < calendar1.length) merged.push(calendar1[i++]);
  while (j < calendar2.length) merged.push(calendar2[j++]);
  return merged;
}

function flattenCalendar(calendar: number[][]) {
  const flattened: number[][] = [calendar[0].slice()];
  for (let i = 1; i < calendar.length; i++) {
    const currentMeeting = calendar[i];
    const previousMeeting = flattened[flattened.length - 1];
    const [currentStart, currentEnd] = currentMeeting;
    const [previousStart, previousEnd] = previousMeeting;
    if (previousEnd >= currentStart) {
      const newPreviousMeeting = [previousStart, Math.max(previousEnd, currentEnd)];
      flattened[flattened.length - 1] = newPreviousMeeting;
    } else {
      flattened.push(currentMeeting.slice());
    }
  }
  return flattened;
}

function getMatchingAvailabilities(calendar: number[][], meetingDuration: number) {
  const matchingAvailabilities: number[][] = [];
  for (let i = 1; i < calendar.length; i++) {
    const start = calendar[i - 1][1];
    const end = calendar[i][0];
    const availabilityDuration = end - start;
    if (availabilityDuration >= meetingDuration) {
      matchingAvailabilities.push([start, end]);
    }
  }
  return matchingAvailabilities.map(meeting => meeting.map(minutesToTime));
}

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(str => parseInt(str));
  return hours * 60 + minutes;
}

function minutesToTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const hoursString = hours.toString();
  const minutesString = mins < 10 ? '0' + mins.toString() : mins.toString();
  return hoursString + ':' + minutesString;
}

```
### Unit Tests 1 (typescript)
```typescript
import * as program from './program';
import * as chai from 'chai';

it('Test Case #1', function () {
  const calendar1 = [
    ['9:00', '10:30'],
    ['12:00', '13:00'],
    ['16:00', '18:00'],
  ];
  const dailyBounds1: [string, string] = ['9:00', '20:00'];
  const calendar2 = [
    ['10:00', '11:30'],
    ['12:30', '14:30'],
    ['14:30', '15:00'],
    ['16:00', '17:00'],
  ];
  const dailyBounds2: [string, string] = ['10:00', '18:30'];
  const meetingDuration = 30;
  const expected = [
    ['11:30', '12:00'],
    ['15:00', '16:00'],
    ['18:00', '18:30'],
  ];
  const result = program.calendarMatching(calendar1, dailyBounds1, calendar2, dailyBounds2, meetingDuration);
  chai.expect(result).to.deep.equal(expected);
});

```

