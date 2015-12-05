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

/**
 * Test the filter() function
 */
QUnit.test("Test the filter() function", function (assert) {
  
  // No params
  assert.strictEqual(generateDateDelta(), "", "No params");
  
  // Greater than, actually greater than
  assert.strictEqual(
    filter(
      "Only 2 day[day>1:s] until Monday!",
      {
        "day": 2
      }
    ),
    "Only 2 days until Monday!",
    "Greater than, actually greater than");
    
  // Greater than, not actually greater than
  assert.strictEqual(
    filter(
      "Only 1 day[day>1:s] until Monday!",
      {
        "day": 1
      }
    ),
    "Only 1 day until Monday!",
    "Greater than, not actually greater than");
    
  // Less than, actually less than
  assert.strictEqual(
    filter(
      "4 days until Christmas.[day<5: That's less than 5 days!]",
      {
        "day": 4
      }
    ),
    "4 days until Christmas. That's less than 5 days!",
    "Less than, actually less than");

  // Less than, not actually less than
  assert.strictEqual(
    filter(
      "4 days until Christmas.[day<5: That's less than 5 days!]",
      {
        "day": 5
      }
    ),
    "4 days until Christmas.",
    "Less than, not actually less than");
    
  // Equal to than, actually equal to
  assert.strictEqual(
    filter(
      "7 days until New Years.[day=7: Exactly one week!]",
      {
        "day": 7
      }
    ),
    "7 days until New Years. Exactly one week!",
    "Equal to than, actually equal to");

});

/**
 * Test the applyComparator() function
 */
QUnit.test("Test the applyComparator() function", function (assert) {
  
  // Test ideal valid inputs
  assert.strictEqual(applyComparator("2>1"), true, "2>1 === true");
  assert.strictEqual(applyComparator("1>2"), false, "1>2 === false");
  
  assert.strictEqual(applyComparator("2<1"), false, "2<1 === false");
  assert.strictEqual(applyComparator("1<2"), true, "1<2 === true");
  
  assert.strictEqual(applyComparator("2=1"), false, "2=1 === false");
  assert.strictEqual(applyComparator("2=2"), true, "2=2 === true");
  
  assert.strictEqual(applyComparator("2>=1"), true, "2>=1 === true");
  assert.strictEqual(applyComparator("1>=2"), false, "1>=2 === false");
  assert.strictEqual(applyComparator("2>=2"), true, "2>=2 === true");
  
  assert.strictEqual(applyComparator("2<=1"), false, "2<=1 === false");
  assert.strictEqual(applyComparator("1<=2"), true, "1<=2 === true");
  assert.strictEqual(applyComparator("2<=2"), true, "2<=2 === true");
  
  assert.strictEqual(applyComparator("2!=1"), true, "2!=1 === true");
  assert.strictEqual(applyComparator("2!=2"), false, "2!=2 === false");
  
  // Test variables
  assert.strictEqual(applyComparator("num>1", {"num":2}), true, "num>1 === true (num=2)");
  assert.strictEqual(applyComparator("2>num", {"num":1}), true, "2>num === true (num=1)");
  assert.strictEqual(applyComparator("num<1", {"num":2}), false, "num<1 === false (num=2)");
  assert.strictEqual(applyComparator("2<num", {"num":1}), false, "2<num === false (num=1)");
  assert.strictEqual(applyComparator("num=num", {"num":1}), true, "2<num === false (num=1)");
  
  // Test unideal valid inputs
  assert.strictEqual(applyComparator("2 > 1"), true, "2 > 1 === true");
  assert.strictEqual(applyComparator(" num > 1", {"num":2}), true, " num > 1 === true (num=2)");
  assert.strictEqual(applyComparator(" num =   num ", {"num":2}), true, " num =   num  === true (num=2)");
  
});