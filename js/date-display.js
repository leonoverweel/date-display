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
	return("to do");
}