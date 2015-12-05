/**
 * Apply a comparator to three strings containing a number, a comparator, and a number
 * @param {string} input - The string to parse
 * @param {object} variables - Object containing variable names (keys) to replace with their values before evaluating 
 * @returns {boolean} The result of the comparison
 */
function applyComparator(input, variables) {
	
	// Get the location of the start of the comparator
	var index = input.search(/=|<|>|!/);
	
	// Make sure input works
	if(input.length < 2 || index < 1 || index + 1 === input.length)
		return false;
	
	// Grab left side of comparator
	var left = input.substring(0, index).trim();
	if(variables !== null && typeof variables === "object" && left in variables)
		left = Number(variables[left]);
	else
		left = Number(left);
	
	// Grab comparator
	var right = input.substring(index+1).trim();
	var comparator = input[index];
	if(right[0] === "=") {
		comparator += "=";
		right = right.substring(1);
	}
	
	// Grab right side of comparator
	if(variables !== null && typeof variables === "object" && right in variables)
		right = Number(variables[right]);
	else
		right = Number(right);
	
	// Apply comparator and return result
	switch(comparator) {
		case ">": return left > right;
		case "<": return left < right;
		case "=": return left === right;			
		case ">=": return left >= right;
		case "<=": return left <= right;
		case "!=": return left != right;
		default: return false;
	}
}

/**
 * Displays the delta between the specified data and now, in the specified format, as the innerText of the specified element.
 * @param {Element} element - The element in which to display the time delta
 * @param {Date} date - The date to compare to now
 * @param {string} formatBefore - The format in which to display the time delta
 * @param {string} formatAfter - Optional: a different format to use after the date has passed
 */
function display(elementId, date, formatBefore, formatAfter) {
	
	// Make sure the element, date and formatBefore are present
	if(elementId == null || document.getElementById(elementId) == null || date == null || formatBefore == null)
		return;
	
	// Display the appropriately formatted time delta in the element
	var element = document.getElementById(elementId);
	if(date - Date.now() > 0)
		element.innerText = generateDateDelta(date, formatBefore);
	else
		(formatAfter == null) ? 
			element.innerText = generateDateDelta(date, formatBefore) : 
			element.innerText = generateDateDelta(date, formatAfter);
		
	setTimeout( function() {
		display(elementId, date, formatBefore, formatAfter);
	}, 1000);
}

/**
 * Replaces all the {key}s in the input string with values from the replacements object
 * @param {string} string - The string with {key}s to fill
 * @param {object} replacements - The key-value pairs to fill the string with
 * @returns {string} The original string with all {key}s replaced with appropriate values
 */
function fill(string, replacements) {
	
	// Return null if there's no string to fill
	if(string == null)
		return null;
	
	// Return the string if there are no replacements to be made
	if(replacements == null || Object.keys(replacements).length == 0)
		return string;
	
	var result = "";
	var current = "";
	
	// Loop through the string
	for(var i = 0; i < string.length; i++) {
		
		// Append non-key characters to the result
		if(string[i] != "{")
			result += string[i];
			
		else {
			
			// Get the current key
			for(var j = i + 1; j < string.length && string[j] != "}"; j++) {
				current += string[j];
			}
			
			// Add the current key's value to the result
			if(string[j] == "}" && current in replacements) {
				result += replacements[current].toString();
			}
			
			// Continue going through the string
			current = "";
			i = j;
		}
	}
	
	// Return
	return result;
}

/**
 * Removes parts of the string depending on whether the conditions for that part are satisfied
 * @param {string} string - The string to filter
 * @param {object} conditions - The current conditions to compare the string to
 */
function filter(string, conditions) {
	if(string == null || !(typeof string === "string") || conditions == null)
		return string;
		
	var result = "";
	var current = "";
	
	// Loop through the string
	for(var i = 0; i < string.length; i++) {
		
		// Append non-key characters to the result
		if(string[i] != "[")
			result += string[i];
			
		else {
			
			// Get the current key
			for(var j = i + 1; j < string.length && string[j] != "]"; j++) {
				current += string[j];
			}
			
			// Add the conditional if the condition is evaluated as true
			var conditional = current.split(":");
			if(conditional.length === 2 && applyComparator(conditional[0], conditions))
				result += conditional[1];
							
			// Continue going through the string
			current = "";
			i = j;
		}
	}
	
	return result;
}

/**
 * Generates the delta between the specified data and now, in the specified format.
 * @param {Date} date - The date to compare to now
 * @param {string} format - The format in which to display the time delta
 * @returns {string} The date delta
 */
function generateDateDelta(date, format) {
	if(date == null || !(date instanceof Date) || format == null || !(typeof format === "string"))
		return "";
	
	var now = Date.now();
	var delta = Math.abs(date - now);
	
	// Calculate complete milliseconds, seconds, minutes, hours, days, weeks
	var milC = delta;
	var secC = Math.floor(delta / 1000);
	var minC = Math.floor(delta / 60000);
	var hrC = Math.floor(delta / 360000);
	var dayC = Math.floor(delta / 86400000);
	var wkC = Math.floor(delta / 604800000);
	
	// Create replacements object
	var replacements = {
		"mil-c": milC.toLocaleString(),
		"sec-c": secC.toLocaleString(),
		"min-c": minC.toLocaleString(),
		"hr-c": hrC.toLocaleString(),
		"day-c": dayC.toLocaleString(),
		"wk-c": wkC.toLocaleString(),
		
		"mil": milC.toLocaleString(),
		"sec": (secC % 60).toLocaleString(),
		"min": (minC % 60).toLocaleString(),
		"hr": (hrC % 24).toLocaleString(),
		"day": (dayC % 7).toLocaleString(),
		"wk": wkC.toLocaleString()
	};
	
	var result = fill(format, replacements);
	result = filter(result, replacements);
	
	return result;
}