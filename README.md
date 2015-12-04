# time-display

## Format string

Generally, the format string consists of a combination of text that will be displayed as-is and tags that time-display replaces with the entities specified below.

### Partial tags

Partial tags display only their respective part of the date delta. 

The tags are: 
- `\{mil\}` - the milliseconds part of the date delta (0 - 999)
- `\{sec\}` - the seconds part of the date delta (0 - 59)
- `\{min\}` - the minutes part of the date delta (0 - 59)
- `\{hr\}` - the hours part of the date delta (0 - 23)
- `\{day\}` - the days part of the date delta (0 - 6)
- `\{wk\}` - the weeks part of the date delta (0 - infinity)

For a date that is one hour and 150 seconds away, for example, `\{hr\}` will be 1, `\{min\}` will be 2, and `\{sec\}` will be 30.

### Complete tags

Complete tags display the full date delta, precise to rounded-down full units of their respective type. They are formed by appending `-c` to the end of a partial tag.

The tags are:
- `\{mil-c\}` - the time delta in milliseconds (0 - infinity)
- `\{sec-c\}` - the time delta in seconds (0 - infinity)
- `\{min-c\}` - the time delta in minUtes (0 - infinity)
- `\{hr-c\}` - the time delta in hours (0 - infinity)
- `\{day-c\}` - the time delta in days (0 - infinity)
- `\{wk-c\}` - the time delta in weeks (0 - infinity)

For a date that is one hour and 150 seconds away, for example, `\{hr\}` will be 1, `\{min\}` will be 62, and `\{sec\}` will be 3750.