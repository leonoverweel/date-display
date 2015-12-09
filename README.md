# time-delta.js

You can use time-delta.js to display a live countdown to a time zone-specific date/ time. The project was made specifically with countdowns to events in mind, and allows you to display the time difference between the specified date/ time and now in a completely customizable way. 

## Getting Started

Here's a short example that shows a basic time-delta.js countdown on an HTML page:

```html
<script type="text/javascript" src="path/to/time-delta.js"></script>
<p>The concert starts <span id="time-delta-1">on April 18th, 2020, at 2 pm</span></p>
<script type="text/javascript">
display(
	"time-delta-1",
	new Date("2020-04-18T14:00:00"),
	1,
	"in {day-c} day[{day-c}!=1:s] and {hr} hour[{hr}!=1:s]",
	"{day-c} day[{day-c}!=1:s] and {hr} hour[{hr}!=1:s] ago"
);
</script>
```

Make sure you change `path/to/time-delta.js` to point to where `time-delta.js` is, relative to the HTML page.

See `demo/demo.html` for more advanced examples.

## Format string

Generally, the format string consists of a combination of text that will be displayed as-is and tags that time-delta.js replaces with the entities specified below. You can also use conditionals to change what is displayed depending on the value of different parts of the date delta.

In the most common use cases, your largest time unit should use a complete tag, and your other time units should use a partial tag.

### Partial tags

Partial tags display only their respective part of the time delta. 

The tags are: 
- `{mil}` - the milliseconds part of the time delta (0 - 999)
- `{sec}` - the seconds part of the time delta (0 - 59)
- `{min}` - the minutes part of the time delta (0 - 59)
- `{hr}` - the hours part of the time delta (0 - 23)
- `{day}` - the days part of the time delta (0 - 6)
- `{wk}` - the weeks part of the time delta (0 - infinity)

For a date that is 1 hour and 150 seconds away, for example, `{hr}` will be 1, `{min}` will be 2, and `{sec}` will be 30.

### Complete tags

Complete tags display the full time delta, precise to rounded-down full units of their respective type. They are formed by appending `-c` to the end of a partial tag.

The tags are:
- `{mil-c}` - the time delta in milliseconds (0 - infinity)
- `{sec-c}` - the time delta in seconds (0 - infinity)
- `{min-c}` - the time delta in minutes (0 - infinity)
- `{hr-c}` - the time delta in hours (0 - infinity)
- `{day-c}` - the time delta in days (0 - infinity)
- `{wk-c}` - the time delta in weeks (0 - infinity)

For a date that is 1 hour and 150 seconds away, for example, `{hr}` will be 1, `{min}` will be 62, and `{sec}` will be 3750.

### Conditionals

Conditionals allow you to change whether something is displayed depending on the values of different parts of the time delta. This allows you to, for example, automatically change names of time units to be singular if only that time unit is equal to 1.

The basic construction of conditionals is: `[condition:result]`, where the `condition` can use any of the variables from the partial and complete tags (such as `{day}` and `{hr-c}`) combined with constants and any one of the following comparators: `==`, `>`, `<`, `>=`, `<=`, `!=`. The result will only be shown if the condition is evaluated as true.

Examples:
- `{day} day[{day}!=1:s]` would display "2 days", "1 day" or "0 days" depending on the value of `{day}`
- `The number of days until my birthday is: {day-c}.[{day-c}<7: That's in less than one week!]` would display "The number of days until my birthday is: 20." or "The number of days until my birthday is: 4. That's in less than one week!"