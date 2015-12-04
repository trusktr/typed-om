suite('CalcLength', function() {
  test('CalcLength is a CalcLength, LengthValue and StyleValue', function() {
    var calcLength = new CalcLength({px: 10});
    assert.instanceOf(calcLength, CalcLength, 'A new CalcLength should be an instance of CalcLength');
    assert.instanceOf(calcLength, LengthValue, 'A new CalcLength should be an instance of LengthValue');
    assert.instanceOf(calcLength, StyleValue, 'A new CalcLength should be an instance of StyleValue');
  });

  test('CalcLength constructor throws exception for invalid types', function() {
    assert.throws(function() {new CalcLength({px: 'abc'})});
    assert.throws(function() {new CalcLength({px: {}})});
    assert.throws(function() {new CalcLength({})});
  });

  test('CalcLength empty constructor initializes other fields to null', function() {
    var calcLength;
    assert.doesNotThrow(function() {calcLength = new CalcLength({px: 10})});
    for (var index in LengthValue.LengthType) {
      var type = LengthValue.LengthType[index];
      if (type != 'px') {
        assert.isNull(calcLength[type], 'Each field in an empty instantiated CalcLength is null');
      }
    }
  });

  // Possible constructor: CalcLength(dictionary)
  test('CalcLength constructor works correctly for single and multi value CalcDictionaries', function() {
    var valueFromNumber;
    assert.doesNotThrow(function() {valueFromNumber = new CalcLength({px: 10})});
    assert.strictEqual(valueFromNumber.px, 10);

    var multiValue;
    assert.doesNotThrow(function() {multiValue = new CalcLength({px: 10, em: 3.2})});
    assert.strictEqual(multiValue.px, 10);
    assert.strictEqual(multiValue.em, 3.2);
  });

  test('CalcLength cssString is correct for single and multi value strings', function() {
    var singleValue;
    assert.doesNotThrow(function() {singleValue = new CalcLength({px: 10})});
    assert.strictEqual(singleValue.px, 10);
    assert.strictEqual(singleValue.cssString, 'calc(10px)');

    var multiValue;
    assert.doesNotThrow(function() {multiValue = new CalcLength({px: 10, em: 3.2})});
    assert.strictEqual(multiValue.px, 10);
    assert.strictEqual(multiValue.em, 3.2);
    assert.strictEqual(multiValue.cssString, 'calc(10px+3.2em)');

    var negativeValues;
    assert.doesNotThrow(function() {negativeValues = new CalcLength({px: -10, em: -3.2, pt: 0})});
    assert.strictEqual(negativeValues.px, -10);
    assert.strictEqual(negativeValues.em, -3.2);
    assert.strictEqual(negativeValues.pt, 0);
    assert.strictEqual(negativeValues.cssString, 'calc(-10px-3.2em+0pt)');

    var percentValue;
    assert.doesNotThrow(function() {percentValue = new CalcLength({percent: 10})});
    assert.strictEqual(percentValue.percent, 10);
    assert.strictEqual(percentValue.cssString, 'calc(10%)');
  });

  test('Multiplication of a CalcLength length produces a new CalcLength object', function() {
    var calcLength = new CalcLength({px: 10, em: 3.2});
    var multipliedCalcLength = calcLength.multiply(4);
    assert.strictEqual(multipliedCalcLength.cssString, 'calc(40px+12.8em)');
  });

  test('Multiplication of a decimal number produces expected result', function() {
    var calcLength = new CalcLength({px: 10, em: 3.2});
    var multipliedCalcLength = calcLength.multiply(0.5);
    assert.strictEqual(multipliedCalcLength.cssString, 'calc(5px+1.6em)');
  });

  test('Division of a CalcLength length produces a new CalcLength object', function() {
    var calcLength = new CalcLength({px: 10, em: 4.0});
    var dividedCalcLength = calcLength.divide(4);
    assert.strictEqual(dividedCalcLength.cssString, 'calc(2.5px+1em)');
  });

  test('Division of a decimal number produces expected result', function() {
    var calcLength = new CalcLength({px: 25, em: 3.2});
    var dividedCalcLength = calcLength.divide(2.5);
    assert.strictEqual(dividedCalcLength.cssString, 'calc(10px+1.28em)');
  });

  test('Adding two CalcLengths returns a new CalcLength with expected values in each value type', function() {
    var calcLength1 = new CalcLength({px: 15, em: 6});
    var calcLength2 = new CalcLength({px: 10, em: 3});
    var lengthAddition = calcLength1.add(calcLength2);
    var expectedlengthAddition = new CalcLength({px: 25, em: 9});

    assert.instanceOf(lengthAddition, CalcLength, 'two added CalcLength of same type should be an instance of CalcLength');
    assert.isTrue(expectedlengthAddition.equals(lengthAddition));
  });

    test('All values in added CalcLengths appear in the output', function() {
    var calcLength1 = new CalcLength({px: 15, em: 6, percent: 5});
    var calcLength2 = new CalcLength({px: 10, em: 3, ex: 6});
    var lengthAddition = calcLength1.add(calcLength2);
    var expectedlengthAddition = new CalcLength({px: 25, em: 9, percent: 5, ex: 6});

    assert.instanceOf(lengthAddition, CalcLength, 'two added CalcLength of same type should be an instance of CalcLength');
    assert.isTrue(expectedlengthAddition.equals(lengthAddition));
  });

  test('Subtracting two CalcLengths returns a new CalcLength with expected values in each value type', function() {
    var calcLength1 = new CalcLength({px: 15, em: 6});
    var calcLength2 = new CalcLength({px: 10, em: 3});
    var lengthSubtraction = calcLength1.subtract(calcLength2);
    var expectedlengthSubtraction = new CalcLength({px: 5, em: 3});

    assert.instanceOf(lengthSubtraction, CalcLength, 'two added CalcLength of same type should be an instance of CalcLength');
    assert.isTrue(expectedlengthSubtraction.equals(lengthSubtraction));
  });

  test('All values in subtracted CalcLengths appear in the output', function() {
    var calcLength1 = new CalcLength({px: 15, em: 6, percent: 5});
    var calcLength2 = new CalcLength({px: 10, em: 3, ex: 6});
    var lengthSubtraction = calcLength1.subtract(calcLength2);
    var expectedlengthSubtraction = new CalcLength({px: 5, em: 3, percent: 5, ex: -6});

    assert.instanceOf(lengthSubtraction, CalcLength, 'two added CalcLength of same type should be an instance of CalcLength');
    assert.isTrue(expectedlengthSubtraction.equals(lengthSubtraction));
  });

  test('convertToCalcLength method returns the object that called it if it is of type CalcLength', function() {
    var calcLength = new CalcLength({px: 25, em: 3.2});
    var convertedCalcLength = calcLength._asCalcLength();
    assert.strictEqual(calcLength, convertedCalcLength);
  });

  test('Test equals method of CalcLength such that it will return true if two CalcLength\'s are the same', function() {
  var calcLength1 = new CalcLength({px: 25, em: 3.2});
  var calcLength2 = new CalcLength({px: 25, em: 3.2});

  assert.isTrue(calcLength1.equals(calcLength2));
  });

  test('Equals method should return false when one CalcLength has additional length types with non null values'
    + 'even if all other types are equivalent', function() {
  var calcLength1 = new CalcLength({px: 25, em: 3.2, percent: 5});
  var calcLength2 = new CalcLength({px: 25, em: 3.2});

  assert.isFalse(calcLength1.equals(calcLength2));
  });

  test('Equals method should return true when one CalcLength has additional length types with null values', function() {
  var calcLength1 = new CalcLength({px: 25, em: 3.2, percent: null});
  var calcLength2 = new CalcLength({px: 25, em: 3.2});

  assert.isTrue(calcLength1.equals(calcLength2));
  });
});
