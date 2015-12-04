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
 * Generates the delta between the specified data and now, in the specified format.
 * @param {Date} date - The date to compare to now
 * @param {string} format - The format in which to display the time delta
 * @returns {string} The date delta
 */
function generateDateDelta(date, format) {
	if(date == null || !(date instanceof Date) || format == null || !(typeof format === "string"))
		return "";
	
	var now = Date.now();
	var delta = date - now;
	
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
	
	return fill(format, replacements);
}