suite('CSSPerspective', function() {
  test('CSSPerspective is a CSSPerspective and CSSTransformComponent', function() {
    var perspective = new CSSPerspective(new CSSSimpleLength(10, 'px'));
    assert.instanceOf(perspective, CSSPerspective,
        'A new CSSPerspective should be an instance of CSSPerspective');
    assert.instanceOf(perspective, CSSTransformComponent,
        'A new CSSPerspective should be an instance of CSSTransformComponent');
  });

  test('CSSPerspective constructor throws exception for invalid types',
        function() {
    assert.throws(function() {new CSSPerspective()});
    assert.throws(function() {new CSSPerspective({})});
    assert.throws(function() {new CSSPerspective(null)});
    assert.throws(function() {new CSSPerspective(1)});
    assert.throws(function() {new CSSPerspective('1px')});
  });

  test('CSSPerspective constructor throws exception for invalid CSSLengthValues',
        function() {
    // CSSPerspective length must be a CSSSimpleLength with type 'px'.
    assert.throws(function() {new CSSPerspective(new CSSSimpleLength(-10, 'em'))});
    assert.throws(function() {new CSSPerspective(new CSSCalcLength({px: 10}))});

    // CSSPerspective length must be strictly positive.
    assert.throws(function() {new CSSPerspective(new CSSSimpleLength(0, 'px'))});
    assert.throws(function() {new CSSPerspective(new CSSSimpleLength(-10, 'px'))});
  });

  test('CSSPerspective constructor works correctly for valid length', function() {
    var perspective;
    var length = new CSSSimpleLength(10, 'px');
    assert.doesNotThrow(function() {perspective = new CSSPerspective(length)});
    assert.strictEqual(perspective.cssString,
        'perspective(' + length.cssString + ')');
    assert.strictEqual(perspective.length.value, 10);
    assert.deepEqual(perspective.length, length);
    assert.isFalse(perspective.is2DComponent());

    var expectedMatrix = new CSSMatrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -0.1, 0, 0,
        0, 1);
    assert.strictEqual(perspective.asMatrix().cssString,
        expectedMatrix.cssString);
    assert.deepEqual(perspective.asMatrix(), expectedMatrix);
  });
});
