QUnit.test("Test the fill() function", function( assert ) {
  // No parameters
  assert.strictEqual(fill(), null, "No parameters");
  
  // Empty string parameter
  assert.strictEqual(fill(""), "", "Empty string parameter");
  
  // String parameter
  assert.strictEqual(fill("Test"), "Test", "String parameter");
  
  // String parameter and non-object replacements parameter
  assert.strictEqual(
    fill("Test", 3),
    "Test",
    "String parameter and non-object replacements parameter");
    
  // String parameter (with no keys) and a replacements parameter
  assert.strictEqual(
    fill("Test", {"test": "filled"}),
    "Test",
    "String parameter with no keys and a replacements parameter");
  
  // String parameter (with a key) and a replacements parameter
  assert.strictEqual(
    fill(
      "I am {age} years old", 
      {
        "age": "eighteen"
      }), 
    "I am eighteen years old",
    "String parameter (with a key) and a replacements parameter");
    
  // String parameter (with a wrong key) and a replacements parameter
  assert.strictEqual(
    fill(
      "I am {age} years old.", 
      {
        "agee": "eighteen"
      }), 
    "I am  years old.",
    "String parameter (with a wrong key) and a replacements parameter");
  
  // String parameter (with a key) and a replacements parameter with a non-string value
  assert.strictEqual(
    fill(
      "I am {age} years old.", 
      {
        "age": 18
      }), 
    "I am 18 years old.",
    "String parameter (with a wrong key) and a replacements parameter");
  
  // String parameter (with a key) and a replacements parameter with the key multiple times
  assert.strictEqual(
    fill(
      "I am {age} years old, so I have lived for {age} years.", 
      {
        "age": "eighteen"
      }), 
    "I am eighteen years old, so I have lived for eighteen years.",
    "String parameter (with a key) and a replacements parameter with the key multiple times");
    
  // String parameter (with multiple keys) and a replacements parameter with multiple keys
  assert.strictEqual(
    fill(
      "I am {age} years old, and my favorite TV show is {show}.", 
      {
        "age": "eighteen",
        "show": "Sherlock"
      }), 
    "I am eighteen years old, and my favorite TV show is Sherlock.",
    "String parameter (with multiple keys) and a replacements parameter with multiple keys");
});