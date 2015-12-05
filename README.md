# time-delta

You can use time-delta to display the time difference between a specified date (with a time) and now, in a variety of formats. The project was made specifically with countdowns until events in mind. 

See `demo/demo.html` for sample html code that shows how to add a time-delta to your site.

## Format string

Generally, the format string consists of a combination of text that will be displayed as-is and tags that time-delta replaces with the entities specified below. You can also use conditionals to change what is displayed depending on the value of different parts of the date delta.

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

The basic construction of conditionals is: `[condition:result]`, where the `condition` can use any of the variables from the partial and complete tags (such as `day` and `hr-c`) combined with any one of the following mathematical comparators: `=`, `>`, `<`, `>=`, `<=`, `!=`. The result will only be shown if the condition is evaluated as true.

Eexamples:
- `{day} day[day!=1:s]` would display "2 days", "1 day" or "0 days" depending on the value of `day`
- `The number of days until my birthday is: {day-c}.[day-c<7: That's in less than one week!]` would display "The number of days until my birthday is: 20." or "The number of days until my birthday is: 4. That's in less than one week!"

## Roadmap

Down the line, I'd like to add timezone support, format strings that can react to the contents of time units (think "1 days" becomes "1 day"), and more QUnit testing.