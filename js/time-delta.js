/**
 * Displays the delta between the specified data and now, in the specified format, as the innerHTML of the specified element.
 * @param {Element} element - The element in which to display the time delta
 * @param {Date} date - The date to compare to now
 * @param {number} offset - The offset (in hours) from UTC in which the date is set
 * @param {string} formatBefore - The format in which to display the time delta
 * @param {string} formatAfter - Optional: a different format to use after the date has passed
 */
function display(elementId, date, offset, formatBefore, formatAfter) {
	
	// Make sure the element, date and formatBefore are present
	if(elementId == null || document.getElementById(elementId) == null || date == null || formatBefore == null)
		return;
	
	// Display the appropriately formatted time delta in the element
	var element = document.getElementById(elementId);
	if(date - Date.now() > 0)
		element.innerHTML = generateDateDelta(date, offset, formatBefore);
	else
		(formatAfter == null) ? 
			element.innerHTML = generateDateDelta(date, offset, formatBefore) : 
			element.innerHTML = generateDateDelta(date, offset, formatAfter);
		
	setTimeout( function() {
		display(elementId, date, offset, formatBefore, formatAfter);
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
 */
function filter(string) {
	if(string == null || !(typeof string === "string"))
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
			if(conditional.length === 2 && eval(conditional[0]))
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
 * @param {number} offset - The offset (in hours) from UTC in which the date is set
 * @param {string} format - The format in which to display the time delta
 * @returns {string} The date delta
 */
function generateDateDelta(date, offset, format) {
	if(date == null || !(date instanceof Date) || format == null || !(typeof format === "string"))
		return "";
	
	var timezoneCorrectionMs = (offset * 60 * 60 * 1000) + (new Date().getTimezoneOffset() * 60 * 1000);
	var now = Date.now() + timezoneCorrectionMs;
	var delta = Math.abs(date - now);
	
	
	// Calculate complete milliseconds, seconds, minutes, hours, days, weeks
	var milC = delta;
	var secC = Math.floor(delta / (1000));
	var minC = Math.floor(delta / (1000 * 60));
	var hrC = Math.floor(delta / (1000 * 60 * 60));
	var dayC = Math.floor(delta / (1000 * 60 * 60 * 24));
	var wkC = Math.floor(delta / (1000 * 60 * 60 * 24 * 7));
	
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