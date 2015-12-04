/**
 * Test the fill() function
 */
QUnit.test("Test the fill() function", function (assert) {
  
  // No params
  assert.strictEqual(fill(), null, "No params");
  
  // Empty string param
  assert.strictEqual(fill(""), "", "Empty string param");
  
  // String param
  assert.strictEqual(fill("Test"), "Test", "String param");
  
  // String param and non-object replacements param
  assert.strictEqual(
    fill("Test", 3),
    "Test",
    "String param and non-object replacements param");
    
  // String param (no keys) and a replacements param
  assert.strictEqual(
    fill("Test", { "test": "filled" }),
    "Test",
    "String param with no keys and a replacements param");
  
  // String param (with a key) and a replacements param
  assert.strictEqual(
    fill(
      "I am {age} years old",
      {
        "age": "eighteen"
      }),
    "I am eighteen years old",
    "String param (with a key) and a replacements param");
    
  // String param (with a wrong key) and a replacements param
  assert.strictEqual(
    fill(
      "I am {age} years old.",
      {
        "agee": "eighteen"
      }),
    "I am  years old.",
    "String param (with a wrong key) and a replacements param");
  
  // String param (with a key) and a replacements param with a non-string value
  assert.strictEqual(
    fill(
      "I am {age} years old.",
      {
        "age": 18
      }),
    "I am 18 years old.",
    "String param (with a wrong key) and a replacements param");
  
  // String param (with a key) and a replacements param with the key multiple times
  assert.strictEqual(
    fill(
      "I am {age} years old, so I have lived for {age} years.",
      {
        "age": "eighteen"
      }),
    "I am eighteen years old, so I have lived for eighteen years.",
    "String param (with a key) and a replacements param with the key multiple times");
    
  // String param (with multiple keys) and a replacements param with multiple keys
  assert.strictEqual(
    fill(
      "I am {age} years old, and my favorite TV show is {show}.",
      {
        "age": "eighteen",
        "show": "Sherlock"
      }),
    "I am eighteen years old, and my favorite TV show is Sherlock.",
    "String param (with multiple keys) and a replacements param with multiple keys");
});

/**
 * Test the generateDateDelta() function
 */
QUnit.test("Test the generateDateDelta() function", function (assert) {
  
  // No params
  assert.strictEqual(generateDateDelta(), "", "No params");
  
  // None-date first param, no second param
  assert.strictEqual(generateDateDelta("2015-12-04"), "", "None-date first param, no second param");
  
  // Date first param, no second param
  assert.strictEqual(generateDateDelta(new Date("2015-12-04")), "", "Date first param, no second param");
  
  // Date first param, non-string second param
  assert.strictEqual(generateDateDelta(new Date("2015-12-04"), 2015), "", "Date first param, non-string second param");

  // Date first param, string second param (no keys)
  assert.strictEqual(generateDateDelta(
    new Date("2015-12-18"), "Input"), 
    "Input", 
    "Date first param, string second param");
});