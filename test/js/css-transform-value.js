suite('CSSTransformValue', function() {
  test('CSSTransformValue is a CSSTransformValue and CSSStyleValue', function() {
    var transform = new CSSTransformValue([new CSSScale(2, -1)]);
    assert.instanceOf(transform, CSSTransformValue,
        'A new CSSTransformValue should be an instance of CSSTransformValue');
    assert.instanceOf(transform, CSSStyleValue,
        'A new CSSTransformValue should be an instance of CSSStyleValue');
  });

  test('CSSTransformValue constructor throws exception for invalid types',
      function() {
    assert.throws(function() {new CSSTransformValue(null)});
    assert.throws(function() {new CSSTransformValue({})});
    assert.throws(function() {new CSSTransformValue(['1', '2'])});
    assert.throws(function() {new CSSTransformValue([null])});
    assert.throws(function() {new CSSTransformValue([new CSSNumberValue(5)])});
  });

  test('CSSTransformValue empty constructor creates an object with ' + 
    'the following properties: cssString contains an empty string, asMatrix ' +
    'returns the 2D identity matrix', function() {
    var transform = new CSSTransformValue();
    assert.isTrue(transform.is2D());
    assert.isTrue(transform.cssString == "");
    assert.deepEqual(transform.asMatrix(), new CSSMatrix(1, 0, 0, 1, 0, 0));
  });

  test('CSSTransformValue constructor works with 1 component', function() {
    var transform;
    var scale = new CSSScale(2, -1);
    var values = [scale];
    assert.doesNotThrow(function() {transform = new CSSTransformValue(values)});
    assert.isTrue(transform.is2D());
    assert.strictEqual(transform.cssString, scale.cssString);
    assert.deepEqual(transform.asMatrix(), scale.asMatrix());
  });

  test('CSSTransformValue constructor works with duplicate component types',
        function() {
    var transform;
    var scale = new CSSScale(2, -1);
    var values = [scale, scale];
    assert.doesNotThrow(function() {transform = new CSSTransformValue(values)});
    assert.isTrue(transform.is2D());
    assert.strictEqual(transform.cssString,
        scale.cssString + ' ' + scale.cssString);

    var expectedMatrix = scale.asMatrix().multiply(scale.asMatrix());
    var transformMatrix = transform.asMatrix();
    assert.strictEqual(transformMatrix.cssString, expectedMatrix.cssString);
    assert.deepEqual(transformMatrix, expectedMatrix);
  });

  test('CSSTransformValue constructor works with multiple 2D components',
        function() {
    var transform;
    var matrix = new CSSMatrix(1, 2, 3, 4, 5, 6);
    var scale = new CSSScale(2, -1);
    var values = [matrix, scale];
    assert.doesNotThrow(function() {transform = new CSSTransformValue(values)});
    assert.isTrue(transform.is2D());
    assert.strictEqual(transform.cssString,
        values[0].cssString + ' ' + values[1].cssString);

    var expectedMatrix = values[0].asMatrix().multiply(values[1].asMatrix());
    var transformMatrix = transform.asMatrix();
    assert.strictEqual(transformMatrix.cssString, expectedMatrix.cssString);
    assert.deepEqual(transformMatrix, expectedMatrix);
  });

  test('CSSTransformValue constructor works with multiple 3D components',
        function() {
    var transform;
    var matrix = new CSSMatrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6);
    var scale = new CSSScale(3, 2, 0.5);
    var values = [matrix, scale];
    assert.doesNotThrow(function() {transform = new CSSTransformValue(values)});
    assert.isFalse(transform.is2D());
    assert.strictEqual(transform.cssString,
        values[0].cssString + ' ' + values[1].cssString);

    var expectedMatrix = values[0].asMatrix().multiply(values[1].asMatrix());
    var transformMatrix = transform.asMatrix();
    assert.strictEqual(transformMatrix.cssString, expectedMatrix.cssString);
    assert.deepEqual(transformMatrix, expectedMatrix);
  });

  test('CSSTransformValue constructor works with multiple 2D and 3D components',
        function() {
    var transform;
    var matrix2d = new CSSMatrix(1, 2, 3, 4, 5, 6);
    var matrix3d = new CSSMatrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6);
    var skew = new CSSSkew(30, 60);
    var scale2d = new CSSScale(2, -1);
    var scale3d = new CSSScale(3, 2, 0.5);
    var values = [matrix2d, scale3d, matrix2d, skew, matrix3d, scale2d];
    assert.doesNotThrow(function() {transform = new CSSTransformValue(values)});
    assert.isFalse(transform.is2D());
    assert.strictEqual(transform.cssString,
        values.map(function(value) {return value.cssString}).join(' '));

    var expectedMatrix = values[0].asMatrix();
    for (var i = 1; i < values.length; ++i) {
      expectedMatrix = expectedMatrix.multiply(values[i].asMatrix());
    }

    var transformMatrix = transform.asMatrix();
    assert.strictEqual(transformMatrix.cssString, expectedMatrix.cssString);
    assert.deepEqual(transformMatrix, expectedMatrix);
  });
});
